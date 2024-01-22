---
title: How I Decreased ETL Cost by Leveraging the Apache Arrow Ecosystem
date: 2023-02-14
---

> In the field of Data Engineering, the Apache Spark framework is one of the most known and powerful ways to extract and process data.
> It is well-trusted, and it is also very simple to use once you get the infrastructure set up.
> Understandably, most engineers will choose it for every task.
> However, in a lot of ways, it can be overkill. And a very expensive one.

## Our data platform journey

In our stack, we manage several databases for different microservices that our team built.
We also have a few legacy databases for two platforms built by external companies.

To bring insights and enable data-driven decision-making for our directors, we needed a way to run analytical queries on all of them.
Enabling it requires we run ETLs (extract, transform, and load scripts) to get data from the databases into our Data Lake.

At the time of writing this article, I am the professional responsible for most of the data integrations and extractions at my company.
And I was also the lead architect for our data platform and infrastructure, and I will explain how it evolved into what we have today.

### Extraction Jobs: what an ETL looks like

![ETL (Extract Transform Load) diagram](./ETL_diagram.svg)
ETL (Extract Transform Load) diagram

The first iteration of our ETL system used the AWS Glue Jobs service.
It was easy to get started with since it is a serverless offering of Apache Spark (with some customizations on top).

These extractions would take all data from the databases and save all of it as Apache Parquet files in an S3 bucket, separating databases into folders, and their tables as subfolders.
We use AWS Athena (similar to the Open Source Presto/Trino project) to run SQL queries on all these files as if it was one big Data-Warehouse.

At the end of the stack, we have Metabase as our visualization tool, for making beautiful dashboards.
These last two are still part of our stack. We've tested different projects, like Dremio and Trino for running the queries, and also Apache Superset for the viz, but ended up sticking with our first choices.
What I changed the most is how we run the extraction scripts.

The first change was to migrate a few ETLs to AWS EMR (Managed Apache Spark clusters).
These scripts had become too complex to run on Glue, and on EMR we can scale the cluster as we wish.
The cost of running them was also a good reason to migrate since AWS Glue can be a lot more expensive than the alternatives.

The second step was to relinquish Amazon's help in managing these clusters and do it myself on Kubernetes.
I used Spark [spark-on-k8s-operator](https://github.com/GoogleCloudPlatform/spark-on-k8s-operator) to run our Spark Jobs.
It made them a lot faster (start-up times for EMR are painfully slow), cheaper, and easier to manage.
With this operator, jobs are submitted as Kubernetes custom resources, and the operator creates all necessary pods to run the scripts.

Up to this point, we've been writing Apache Spark scripts and only changing how and where we run them. The last step is different.
Using Apache Arrow and just simple containers, I made most of the old extractions obsolete.

## Apache Spark vs Apache Arrow (not equivalent)

Apache Spark is made for distributed work.
For this, it is usually set up in a cluster with one or a few driver/master nodes, and at least a few executor nodes.
This is amazing when you need to work with large datasets, and they can't fit into the memory of one reasonably priced machine.
But there is always a downside. Even when this is the case, distributing the processing will not always be perfect.
It could be necessary to share data between nodes, and this causes a lot of network traffic.
And some operations just need data to be in memory.

In the other case, when the workload is not that large, distributing it will yield no real gain.
It will most likely hurt it due to various types of overhead like synchronization and transport.
You can run Apache Spark without a cluster, but it was not made for that.
For this reason, I decided to test some new projects that would do what I needed without being distributed.

The tools I used to create our new extractions are [Polars](https://www.pola.rs/) and [ConnectorX](https://github.com/sfu-db/connector-x).
Polars is a dataframe library, like pandas, but implemented in Rust with the Apache Arrow data model.
It is a columnar data model, and it was created to be implemented in any language.
But that's not the impressive part: you can share data between totally different codebases, like Rust, Java, and Python, without serializing and even reallocating it.
If you can access the same space in memory, you can use it with the Arrow ecosystem.
When I said Spark shuffles cause a lot of traffic over the network, it also requires all this data to be serialized before sending and deserialized at the receiving end.
This wastes a lot of time and resources.

## Code Time

ConnectorX is integrated into Polars, and if both are installed, you can call `polars.read_sql`.
I will use it directly though:

```python
import connectorx as cx

arrow_table = cx.read_sql(
    query="select * from table_x",
    conn="postgres://user:pass@host:port/database",
    return_type="arrow2",
    protocol="binary",
)

```

My example uses Postgres, but ConnectorX supports several other databases.
The output of this function is an Apache Arrow Table.
Arrow2 means it uses the unofficial Rust implementation [Arrow2](https://github.com/jorgecarleitao/arrow2).
There is also the official Apache Arrow implementation in Rust, and a C++ implementation used by PyArrow.

This next call instructs Polars to read the arrow table memory space. And as the Docs say:

> This operation will be zero copy for the most part.
> Types that are not supported by Polars may be cast to the closest supported type.

```python
import polars as pl
df = pl.from_arrow(arrow_table)
```

Once you loaded it into Polars, you can manipulate this data at will.
There is an option to turn it into a lazy operation like it is done with Apache Spark.
This is very useful because it allows Polars to optimize the query plan when possible.
This also enables the use of streaming, for larger-than-memory operations.

In this sample, I will keep it simple and write it to a file directly.
This could be done to a local path, or almost any destination [fsspec](https://filesystem-spec.readthedocs.io/en/latest/) supports.
For example, one valid path could be `s3://bucket/database/folder/`.
If you do not specify the file name, it will generate a random one. If you want to keep a single file, or want to replace an existing one, make sure to specify the file name.

```python
df.write_parquet("output.zstd.parquet", compression:"zstd")
```

It is also possible to use PyArrow to do this.
As I said before, PyArrow uses the C++ implementation of Arrow.
But data can flow between them seamlessly without the need for serialization, or even memory copying.

```python
import pyarrow.parquet as pq

pq.write_table(
    df.to_arrow(),
    where="output.zstd.parquet",
    compression="zstd",
)
```

I created an example repository in GitHub that puts all of this together. Check it out!

[github.com/auyer/polars-extraction](https://github.com/auyer/polars-extraction)

Update: I created a second post going deeper into other techniques. Check it out: [Lightweight Large Data Extractions with Polars and ConnectorX](https://rcpassos.me/post/lightweight-large-etls-with-polars-connectorx).

## Conclusion

Apache Spark is an established framework for building complex ETLs.
But it carries a heavy JVM stack behind it.
As we discussed here, it is not a good choice for small datasets if you are worried about cost (you should be).

The Apache Arrow ecosystem is growing.
It can't replace Spark just yet, but one day I bet it will.
But when doing what it is able to do now, it does it a lot faster and consumes fewer machine resources.
With new features being implemented into Polars almost every week, it will soon be the ubiquitous tool for data frames.

ConnectorX is an important piece for this success. It does not have all the features it needs to make Polars fully replace Spark for me, as it does not support all Postgres Types.
I implemented support for a few, like Enum and ltree, but others are still missing, like string arrays. It could receive more love from the community.

Hope this article was worth reading! Thanks!
