---
title: Lightweight ETLs For Larger Than RAM Tables With Polars And ConnectorX
date: 2023-05-07
---

In my last blog post, I shared the latest tool that I have added to my arsenal - Apache Arrow (or the libraries based on it).
In this post, I will delve deeper into the topic and demonstrate some of the techniques I employed.

If you have not read it yet, I highly suggest you do so before this one.
I also shared a brief version of the journey I went through while creating the data platform that we currently use at my company : [How I Decreased ETL Cost by Leveraging the Apache Arrow Ecosystem](https://rcpassos.me/post/apache-arrow-future-of-data-engineering).

## ConnectorX, and what it does differently

The first thing you might notice when you check ConnectorX is that it is implemented in Rust.
However, this is not the only reason it is a good library.
The developers evaluated the existing solutions in Python and found weaknesses in them, specifically that they involved too much data copying.
Check out their awesome [paper about it](https://github.com/sfu-db/connector-x#citing-connectorx).

Being implemented in Rust helps a lot with resource efficiency and speed, but it is only one of its advantages.
One thing the developers found about other libraries is that they take a lot of time allocating and copying data in memory.
This leads to a lot of I/O and wasted CPU cycles.
ConnectorX follows the "zero-copy" principle, just like Apache Arrow, where the data is copied only once, directly from the source to the destination, even when parallelism is involved.

The last key to our success is that this library can write in the Apache Arrow format.
In the last post, we used Polars (and PyArrow), both of which use the Arrow memory format.
With ConnectorX, we can load the output from the `connectorx.read_sql` function directly into Polars without any need for serialization or reallocations.

## Reading with large tables

In my previous post, I demonstrated a basic script for extracting data using the libraries I mentioned earlier.
This script used a simple `select * from table` query and wrote the output to a Parquet file.
However, this method is only practical for handling small tables.

If you attempt to extract data from a large table in a small machine, you are likely to encounter an out-of-memory panic.
This occurs because the ConnectorX library collects all the query results before passing them to Polars in the Arrow format.
Thus, in order to use the same script, the dataset must be small enough to fit into memory.

One solution to this problem is vertical scaling, which involves providing additional resources such as Memory and CPU to the workload.
However, this approach can be expensive and has its limitations.
You should use it within a reasonable budget limit or while developing a better long-term solution.

## Partitioning

The solution to handling a large dataset is to partition it into smaller pieces, which is often referred to as partitioning.
This approach involves breaking down the table into more manageable pieces, which can be processed individually, thereby avoiding the challenges of dealing with the entire dataset at once.

To efficiently partition a table, you need a cursor column that you can use to sort the table.
This column enables you to read the table in an organized manner.
Date columns are commonly used, and some numeric values can be used for this too.
However, using a sequential number is the best option as it is predictable.
It allows for effortless partitioning of the dataset.

Partitioning by date may not result in uniformly-sized partitions if the table is not uniform.
For instance, if there are 2k rows in October and 200k in November, the extraction will require significantly more resources for the November partition.
To avoid this issue, using a sequential number as a cursor column is recommended as it ensures that each partition is of the same size, regardless of the data distribution.

In addition, it is important to index the cursor column.
Queries will use a statement such as `select * from the table where cursor >= ? and cursor < ?`, which means the database will sort by the cursor column.
Failing to index the cursor column will result in a slow and expensive table scan, which could affect the efficiency of your system.
Nonetheless, before creating a new index, it is recommended to test it first to ensure that it is necessary.
Creating a new column or index have their cost as well.

To implement this, you will need to decide how to partition your table.
In my case, I will use a sequential numeric id and will decide the number of partitions based on the reported size that Postgres gives me.

```python
query_min_max = f"""select min({PARTITION_COLUMN}) as min_id,
        max({PARTITION_COLUMN}) as max_id,
        pg_total_relation_size('{SCHEMA}.{TABLE}') as size
    from {SCHEMA}.{TABLE}"""

df_min_max = read_sql(query_min_max, conn).to_dicts()[0]

parts = math.ceil(df_min_max["size"] / 1000000000) # one GB per part
```

With the values from this query, you know how many lines you have (if the table is not sequential, you can run a count query), and the first and the last values of the `PARTITION_COLUMN`.

The next part is to run your queries in a loop and processes them one part at a time.

```python
start = df_min_max["min_id"]
stop = df_min_max["max_id"]
step = math.ceil((stop - start) / parts)
for i in range(0, parts):
    df = read_sql(
        f"""select sb.* from ({query}) sb
        where {PARTITION_COLUMN} >= {start + step * i}
        and {PARTITION_COLUMN} < {start + step * (i + 1)}""",
        conn,
    )
    # process your df here
```

My actual implementation is a bit fancier than this though.
I created a function that returns a generator.
What this means, is that the result of the function will look and behave like an Iterator, but each element will be processed only when it is called by the iteration process.

```python
def query_generator_ranges(conn, start, stop, parts) -> Iterator[pl.LazyFrame]:
step = math.ceil((stop - start) / parts)

query = f"select * from {SCHEMA}.{TABLE}"

return (
    (
        read_sql(
            f"""select sb.* from ({query}) sb
            where {PARTITION_COLUMN} >= {start + step * i}
            and {PARTITION_COLUMN} < {start + step * (i + 1)}""",
            conn,
            ).lazy()
    )
    for i in range(0, parts)
)
```

And I use it like this:

```python
dfs = query_generator_ranges(conn, start, stop, parts)
for df in dfs:
    # process your df here
```

## Doing Transformations in this data

I will keep this section short because it can be easier to do complex transformations later in the pipeline after we collect all the raw tables.
It can also be useful to have a copy of the data in the database in your datalake.
If I need to create a new dataset from aggregations, by joining two tables, I do it by scanning the datalake instead of the source.

So far our extraction return a dataframe for every part.
You can write it to the destination directly, or do a bit of row-wise processing there.
Just add the next bits of code to the for loop where I left a `# process your df here` comment.

One thing I usually do is add the date of extraction to the rows.
This can be useful when troubleshooting later.
If you have this kind of tracing, you can add ids and other metadata here.
But know that every row in this table will have them.
I also prefix added columns with an underscore to make them easy to spot.

```python
dt = datetime.now()
extraction_id = "xyz"
df = df.with_columns([
    pl.lit(dt).alias("_extraction_date"),
    pl.lit(extraction_id).alias("_extraction_id"),
])
```

A common use case of transformations in this step is the conversion of data types.
One I had to do, is date unit conversion.
The tool we use for querying the datalake in my company does not support dates in micro or nanoseconds precision.
The function below automatically detects date-time columns using the `dtype` attribute and casts them no mili-seconds.

```python
# This function will find all timestamps and cast them to the "ms" unit
def date_to_ms(df: pl.LazyFrame) -> pl.LazyFrame:
    for ix, col_type in enumerate(df.dtypes):
        if col_type == pl.Datetime:
            logging.info(f"Going to cast column {df.columns[ix]} from {col_type} to datetime[ms]")
            df = df.with_columns(
                [pl.col(df.columns[ix]).dt.cast_time_unit("ms").alias(df.columns[ix])]
            )
    return df
```

A cool trick I have not talked about in this post is the fact that these dataframes are actually `LazyFrames`.
This is commonly referred to as Lazy execution, instead of eager execution.
In practice, when you add `.lazy()` to a `DataFrame`, it becomes a `LazyFrame`, and most operations will be added to an execution plan.
Polars will try to optimize the plan and execute all operations only when they are needed.
In our case, this will be when calling the "write" call or the `.collect()` function.
Running `df = df.with_columns` with a single column in a loop will yield the same result as adding them all in the same function call.

## Two important things to note

1- If you read the documentation of ConnectorX, you will find a partition_on option.
However, it does not accomplish the same results as the partitioning approach I described earlier.
ConnectorX's partitioning is aimed at achieving faster data extraction through parallel queries.
This may be useful if you are scaling vertically and prioritizing speed over cost.
However, in my use cases, I found the approach I described to be more useful for cost optimization.

2- Apache Spark is also very good at partitioning workloads.
The way it does it is similar to what I presented, but its all implemented behind the scenes.
Spark distributes the job between the number of workers you make available to the workload.
This will attempt to execute the queries in parallel and can be a lot more expensive to run (also because it's written in Scala, and it is a lot less resource-efficient).
There are distributed frameworks in development for Apache Arrow, but I have yet to explore them.
Another thing to know about doing things distributed is that running operations that depend on values of multiple rows, like aggregations, might need to introduce a lot of communication between the workers.

## Conclusion

Creating a datalake with minimal modifications to the tables can get you a long way.
It will be easier to deal with schema changes coming from the applications, and in small teams, it will allow developers to contribute as well.

All other operations can be done directly in the data lake.
From simple aggregations and joins to hundreds of lines of SQL queries, you can accomplish anything using tools such as Polars and other Apache Arrow-based libraries.
If you prefer processing data with SQL, the DuckDB library is also a great option.
By performing these operations on top of Parquet files, you won't add any load to production databases, and you'll benefit from many optimizations that can improve analytical queries.

If you want a complete code example, check it out on [GitHub.com/auyer/polars-extraction](https://github.com/auyer/polars-extraction)!
