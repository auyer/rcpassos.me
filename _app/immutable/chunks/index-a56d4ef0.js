import {
  S as Ba,
  i as Ja,
  s as Ga,
  k as r,
  q as n,
  a as p,
  l as i,
  m as l,
  r as u,
  h as t,
  c as f,
  n as h,
  K as Ua,
  b as o,
  H as s,
  C as Ut
} from './index-0daa1a08.js'
const Xa = '' + new URL('../assets/ETL_diagram-8c98227f.svg', import.meta.url).href
function Ka(Ca) {
  let m,
    ue,
    Ze,
    de,
    v,
    W,
    Ne,
    ce,
    M,
    $e,
    me,
    R,
    et,
    we,
    H,
    tt,
    be,
    k,
    D,
    at,
    ye,
    A,
    O,
    Xt,
    ot,
    ve,
    B,
    st,
    ke,
    J,
    rt,
    Ae,
    G,
    it,
    Ee,
    U,
    lt,
    _e,
    w,
    nt,
    E,
    ut,
    pt,
    Te,
    X,
    ft,
    Ie,
    _,
    K,
    ht,
    Pe,
    F,
    dt,
    xe,
    Q,
    ct,
    qe,
    d,
    mt,
    T,
    wt,
    bt,
    I,
    yt,
    vt,
    Se,
    P,
    V,
    kt,
    ge,
    b,
    At,
    pe,
    Et,
    _t,
    Le,
    x,
    za = `<code class="language-undefined">import connectorx as cx

arrow_table = cx.read_sql(
    query=&quot;select * from table_x&quot;,
    conn=&quot;postgres://user:pass@host:port/database&quot;,
    return_type=&quot;arrow2&quot;,
    protocol=&quot;binary&quot;,
)
</code>`,
    Ce,
    y,
    Tt,
    q,
    It,
    Pt,
    ze,
    Y,
    xt,
    je,
    Z,
    fe,
    qt,
    We,
    S,
    ja = `<code class="language-undefined">import polars as pl
df = pl.from_arrow(arrow_table)</code>`,
    Me,
    N,
    St,
    Re,
    c,
    gt,
    g,
    Lt,
    Ct,
    he,
    zt,
    jt,
    He,
    L,
    Wa =
      '<code class="language-undefined">df.write_parquet(&quot;output.snappy.parquet&quot;, compression:&quot;snappy&quot;)</code>',
    De,
    $,
    Wt,
    Oe,
    C,
    Ma = `<code class="language-undefined">import pyarrow.parquet as pq

pq.write_table(
    df.to_arrow(),
    where=&quot;output.snappy.parquet&quot;,
    compression=&quot;snappy&quot;,
)</code>`,
    Be,
    ee,
    Mt,
    Je,
    te,
    z,
    Rt,
    Ge,
    j,
    ae,
    Ht,
    Ue,
    oe,
    Dt,
    Xe,
    se,
    Ot,
    Ke,
    re,
    Bt,
    Fe,
    ie,
    Jt
  return {
    c() {
      ;(m = r('blockquote')),
        (ue = r('p')),
        (Ze =
          n(`In the field of Data Engineering, the Apache Spark framework is one of the most known and powerful ways to extract and process data.
It is well-trusted, and it is also very simple to use once you get the infrastructure set up.
Understandably, most engineers will choose it for every task.
However, in a lot of ways, it can be overkill. And a very expensive one.`)),
        (de = p()),
        (v = r('h2')),
        (W = r('a')),
        (Ne = n('Our data platform journey')),
        (ce = p()),
        (M = r('p')),
        ($e =
          n(`In our stack, we manage several databases for different microservices that our team built.
We also have a few legacy databases for two platforms built by external companies.`)),
        (me = p()),
        (R = r('p')),
        (et =
          n(`To bring insights and enable data-driven decision-making for our directors, we needed a way to run analytical queries on all of them.
Enabling it requires we run ETLs (extract, transform, and load scripts) to get data from the databases into our Data Lake.`)),
        (we = p()),
        (H = r('p')),
        (tt =
          n(`At the time of writing this article, I am the professional responsible for most of the data integrations and extractions at my company.
And I was also the lead architect for our data platform and infrastructure, and I will explain how it evolved into what we have today.`)),
        (be = p()),
        (k = r('h3')),
        (D = r('a')),
        (at = n('Extraction Jobs: what an ETL looks like')),
        (ye = p()),
        (A = r('p')),
        (O = r('img')),
        (ot = n(`
ETL (Extract Transform Load) diagram`)),
        (ve = p()),
        (B = r('p')),
        (st = n(`The first iteration of our ETL system used the AWS Glue Jobs service.
It was easy to get started with since it is a serverless offering of Apache Spark (with some customizations on top).`)),
        (ke = p()),
        (J = r('p')),
        (rt =
          n(`These extractions would take all data from the databases and save all of it as Apache Parquet files in an S3 bucket, separating databases into folders, and their tables as subfolders.
We use AWS Athena (similar to the Open Source Presto/Trino project) to run SQL queries on all these files as if it was one big Data-Warehouse.`)),
        (Ae = p()),
        (G = r('p')),
        (it =
          n(`At the end of the stack, we have Metabase as our visualization tool, for making beautiful dashboards.
These last two are still part of our stack. We’ve tested different projects, like Dremio and Trino for running the queries, and also Apache Superset for the viz, but ended up sticking with our first choices.
What I changed the most is how we run the extraction scripts.`)),
        (Ee = p()),
        (U = r('p')),
        (lt =
          n(`The first change was to migrate a few ETLs to AWS EMR (Managed Apache Spark clusters).
These scripts had become too complex to run on Glue, and on EMR we can scale the cluster as we wish.
The cost of running them was also a good reason to migrate since AWS Glue can be a lot more expensive than the alternatives.`)),
        (_e = p()),
        (w = r('p')),
        (nt =
          n(`The second step was to relinquish Amazon’s help in managing these clusters and do it myself on Kubernetes.
I used Spark `)),
        (E = r('a')),
        (ut = n('spark-on-k8s-operator')),
        (pt = n(` to run our Spark Jobs.
It made them a lot faster (start-up times for EMR are painfully slow), cheaper, and easier to manage.
With this operator, jobs are submitted as Kubernetes custom resources, and the operator creates all necessary pods to run the scripts.`)),
        (Te = p()),
        (X = r('p')),
        (ft =
          n(`Up to this point, we’ve been writing Apache Spark scripts and only changing how and where we run them. The last step is different.
Using Apache Arrow and just simple containers, I made most of the old extractions obsolete.`)),
        (Ie = p()),
        (_ = r('h2')),
        (K = r('a')),
        (ht = n('Apache Spark vs Apache Arrow (not equivalent)')),
        (Pe = p()),
        (F = r('p')),
        (dt = n(`Apache Spark is made for distributed work.
For this, it is usually set up in a cluster with one or a few driver/master nodes, and at least a few executor nodes.
This is amazing when you need to work with large datasets, and they can’t fit into the memory of one reasonably priced machine.
But there is always a downside. Even when this is the case, distributing the processing will not always be perfect.
It could be necessary to share data between nodes, and this causes a lot of network traffic.
And some operations just need data to be in memory.`)),
        (xe = p()),
        (Q = r('p')),
        (ct =
          n(`In the other case, when the workload is not that large, distributing it will yield no real gain.
It will most likely hurt it due to various types of overhead like synchronization and transport.
You can run Apache Spark without a cluster, but it was not made for that.
For this reason, I decided to test some new projects that would do what I needed without being distributed.`)),
        (qe = p()),
        (d = r('p')),
        (mt = n('The tools I used to create our new extractions are ')),
        (T = r('a')),
        (wt = n('Polars')),
        (bt = n(' and ')),
        (I = r('a')),
        (yt = n('ConnectorX')),
        (vt = n(`.
Polars is a dataframe library, like pandas, but implemented in Rust with the Apache Arrow data model.
It is a columnar data model, and it was created to be implemented in any language.
But that’s not the impressive part: you can share data between totally different codebases, like Rust, Java, and Python, without serializing and even reallocating it.
If you can access the same space in memory, you can use it with the Arrow ecosystem.
When I said Spark shuffles cause a lot of traffic over the network, it also requires all this data to be serialized before sending and deserialized at the receiving end.
This wastes a lot of time and resources.`)),
        (Se = p()),
        (P = r('h2')),
        (V = r('a')),
        (kt = n('Code Time')),
        (ge = p()),
        (b = r('p')),
        (At = n('ConnectorX is integrated into Polars, and if both are installed, you can call ')),
        (pe = r('code')),
        (Et = n('polars.read_sql')),
        (_t = n(`.
I will use it direclty though:`)),
        (Le = p()),
        (x = r('pre')),
        (Ce = p()),
        (y = r('p')),
        (Tt = n(`My example uses Postgres, but ConnectorX supports several other databases.
The output of this function is an Apache Arrow Table.
Arrow2 means it uses the unofficial Rust implementation `)),
        (q = r('a')),
        (It = n('Arrow2')),
        (Pt = n(`.
There is also the official Apache Arrow implementation in Rust, and a C++ implementation used by PyArrow.`)),
        (ze = p()),
        (Y = r('p')),
        (xt = n(
          'This next call instructs Polars to read the arrow table memory space. And as the Docs say:'
        )),
        (je = p()),
        (Z = r('blockquote')),
        (fe = r('p')),
        (qt = n(`This operation will be zero copy for the most part.
Types that are not supported by Polars may be cast to the closest supported type.`)),
        (We = p()),
        (S = r('pre')),
        (Me = p()),
        (N = r('p')),
        (St = n(`Once you loaded it into Polars, you can manipulate this data at will.
There is an option to turn it into a lazy operation like it is done with Apache Spark.
This is very useful because it allows Polars to optimize the query plan when possible.
This also enables the use of streaming, for larger-than-memory operations.`)),
        (Re = p()),
        (c = r('p')),
        (gt = n(`In this sample, I will keep it simple and write it to a file directly.
This could be done to a local path, or almost any destination `)),
        (g = r('a')),
        (Lt = n('fsspec')),
        (Ct = n(` supports.
For example, one valid path could be `)),
        (he = r('code')),
        (zt = n('s3://bucket/database/folder/')),
        (jt = n(`.
If you do not specify the file name, it will generate a random one. If you want to keep a single file, or want to replace an existing one, make sure to specify the file name.`)),
        (He = p()),
        (L = r('pre')),
        (De = p()),
        ($ = r('p')),
        (Wt = n(`It is also possible to use PyArrow to do this.
As I said before, PyArrow uses the C++ implementation of Arrow.
But data can flow between them seamlessly without the need for serialization, or even memory copying.`)),
        (Oe = p()),
        (C = r('pre')),
        (Be = p()),
        (ee = r('p')),
        (Mt = n(
          'I created an example repository in GitHub that puts all of this together. Check it out!'
        )),
        (Je = p()),
        (te = r('p')),
        (z = r('a')),
        (Rt = n('github.com/auyer/polars-extraction')),
        (Ge = p()),
        (j = r('h2')),
        (ae = r('a')),
        (Ht = n('Conclusion')),
        (Ue = p()),
        (oe = r('p')),
        (Dt = n(`Apache Spark is an established framework for building complex ETLs.
But it carries a heavy JVM stack behind it.
As we discussed here, it is not a good choice for small datasets if you are worried about cost (you should be).`)),
        (Xe = p()),
        (se = r('p')),
        (Ot = n(`The Apache Arrow ecosystem is growing.
It can’t replace Spark just yet, but one day I bet it will.
But when doing what it is able to do now, it does it a lot faster and consumes fewer machine resources.
With new features being implemented into Polars almost every week, it will soon be the ubiquitous tool for data frames.`)),
        (Ke = p()),
        (re = r('p')),
        (Bt =
          n(`ConnectorX is an important piece for this success. It does not have all the features it needs to make Polars fully replace Spark for me, as it does not support all Postgres Types.
I implemented support for a few, like Enum and ltree, but others are still missing, like string arrays. It could receive more love from the community.`)),
        (Fe = p()),
        (ie = r('p')),
        (Jt = n('Hope this article was worth reading! Thanks!')),
        this.h()
    },
    l(e) {
      m = i(e, 'BLOCKQUOTE', {})
      var a = l(m)
      ue = i(a, 'P', {})
      var Kt = l(ue)
      ;(Ze = u(
        Kt,
        `In the field of Data Engineering, the Apache Spark framework is one of the most known and powerful ways to extract and process data.
It is well-trusted, and it is also very simple to use once you get the infrastructure set up.
Understandably, most engineers will choose it for every task.
However, in a lot of ways, it can be overkill. And a very expensive one.`
      )),
        Kt.forEach(t),
        a.forEach(t),
        (de = f(e)),
        (v = i(e, 'H2', { id: !0 }))
      var Ft = l(v)
      W = i(Ft, 'A', { href: !0 })
      var Qt = l(W)
      ;(Ne = u(Qt, 'Our data platform journey')),
        Qt.forEach(t),
        Ft.forEach(t),
        (ce = f(e)),
        (M = i(e, 'P', {}))
      var Vt = l(M)
      ;($e = u(
        Vt,
        `In our stack, we manage several databases for different microservices that our team built.
We also have a few legacy databases for two platforms built by external companies.`
      )),
        Vt.forEach(t),
        (me = f(e)),
        (R = i(e, 'P', {}))
      var Yt = l(R)
      ;(et = u(
        Yt,
        `To bring insights and enable data-driven decision-making for our directors, we needed a way to run analytical queries on all of them.
Enabling it requires we run ETLs (extract, transform, and load scripts) to get data from the databases into our Data Lake.`
      )),
        Yt.forEach(t),
        (we = f(e)),
        (H = i(e, 'P', {}))
      var Zt = l(H)
      ;(tt = u(
        Zt,
        `At the time of writing this article, I am the professional responsible for most of the data integrations and extractions at my company.
And I was also the lead architect for our data platform and infrastructure, and I will explain how it evolved into what we have today.`
      )),
        Zt.forEach(t),
        (be = f(e)),
        (k = i(e, 'H3', { id: !0 }))
      var Nt = l(k)
      D = i(Nt, 'A', { href: !0 })
      var $t = l(D)
      ;(at = u($t, 'Extraction Jobs: what an ETL looks like')),
        $t.forEach(t),
        Nt.forEach(t),
        (ye = f(e)),
        (A = i(e, 'P', {}))
      var Gt = l(A)
      ;(O = i(Gt, 'IMG', { src: !0, alt: !0 })),
        (ot = u(
          Gt,
          `
ETL (Extract Transform Load) diagram`
        )),
        Gt.forEach(t),
        (ve = f(e)),
        (B = i(e, 'P', {}))
      var ea = l(B)
      ;(st = u(
        ea,
        `The first iteration of our ETL system used the AWS Glue Jobs service.
It was easy to get started with since it is a serverless offering of Apache Spark (with some customizations on top).`
      )),
        ea.forEach(t),
        (ke = f(e)),
        (J = i(e, 'P', {}))
      var ta = l(J)
      ;(rt = u(
        ta,
        `These extractions would take all data from the databases and save all of it as Apache Parquet files in an S3 bucket, separating databases into folders, and their tables as subfolders.
We use AWS Athena (similar to the Open Source Presto/Trino project) to run SQL queries on all these files as if it was one big Data-Warehouse.`
      )),
        ta.forEach(t),
        (Ae = f(e)),
        (G = i(e, 'P', {}))
      var aa = l(G)
      ;(it = u(
        aa,
        `At the end of the stack, we have Metabase as our visualization tool, for making beautiful dashboards.
These last two are still part of our stack. We’ve tested different projects, like Dremio and Trino for running the queries, and also Apache Superset for the viz, but ended up sticking with our first choices.
What I changed the most is how we run the extraction scripts.`
      )),
        aa.forEach(t),
        (Ee = f(e)),
        (U = i(e, 'P', {}))
      var oa = l(U)
      ;(lt = u(
        oa,
        `The first change was to migrate a few ETLs to AWS EMR (Managed Apache Spark clusters).
These scripts had become too complex to run on Glue, and on EMR we can scale the cluster as we wish.
The cost of running them was also a good reason to migrate since AWS Glue can be a lot more expensive than the alternatives.`
      )),
        oa.forEach(t),
        (_e = f(e)),
        (w = i(e, 'P', {}))
      var Qe = l(w)
      ;(nt = u(
        Qe,
        `The second step was to relinquish Amazon’s help in managing these clusters and do it myself on Kubernetes.
I used Spark `
      )),
        (E = i(Qe, 'A', { href: !0, rel: !0 }))
      var sa = l(E)
      ;(ut = u(sa, 'spark-on-k8s-operator')),
        sa.forEach(t),
        (pt = u(
          Qe,
          ` to run our Spark Jobs.
It made them a lot faster (start-up times for EMR are painfully slow), cheaper, and easier to manage.
With this operator, jobs are submitted as Kubernetes custom resources, and the operator creates all necessary pods to run the scripts.`
        )),
        Qe.forEach(t),
        (Te = f(e)),
        (X = i(e, 'P', {}))
      var ra = l(X)
      ;(ft = u(
        ra,
        `Up to this point, we’ve been writing Apache Spark scripts and only changing how and where we run them. The last step is different.
Using Apache Arrow and just simple containers, I made most of the old extractions obsolete.`
      )),
        ra.forEach(t),
        (Ie = f(e)),
        (_ = i(e, 'H2', { id: !0 }))
      var ia = l(_)
      K = i(ia, 'A', { href: !0 })
      var la = l(K)
      ;(ht = u(la, 'Apache Spark vs Apache Arrow (not equivalent)')),
        la.forEach(t),
        ia.forEach(t),
        (Pe = f(e)),
        (F = i(e, 'P', {}))
      var na = l(F)
      ;(dt = u(
        na,
        `Apache Spark is made for distributed work.
For this, it is usually set up in a cluster with one or a few driver/master nodes, and at least a few executor nodes.
This is amazing when you need to work with large datasets, and they can’t fit into the memory of one reasonably priced machine.
But there is always a downside. Even when this is the case, distributing the processing will not always be perfect.
It could be necessary to share data between nodes, and this causes a lot of network traffic.
And some operations just need data to be in memory.`
      )),
        na.forEach(t),
        (xe = f(e)),
        (Q = i(e, 'P', {}))
      var ua = l(Q)
      ;(ct = u(
        ua,
        `In the other case, when the workload is not that large, distributing it will yield no real gain.
It will most likely hurt it due to various types of overhead like synchronization and transport.
You can run Apache Spark without a cluster, but it was not made for that.
For this reason, I decided to test some new projects that would do what I needed without being distributed.`
      )),
        ua.forEach(t),
        (qe = f(e)),
        (d = i(e, 'P', {}))
      var le = l(d)
      ;(mt = u(le, 'The tools I used to create our new extractions are ')),
        (T = i(le, 'A', { href: !0, rel: !0 }))
      var pa = l(T)
      ;(wt = u(pa, 'Polars')),
        pa.forEach(t),
        (bt = u(le, ' and ')),
        (I = i(le, 'A', { href: !0, rel: !0 }))
      var fa = l(I)
      ;(yt = u(fa, 'ConnectorX')),
        fa.forEach(t),
        (vt = u(
          le,
          `.
Polars is a dataframe library, like pandas, but implemented in Rust with the Apache Arrow data model.
It is a columnar data model, and it was created to be implemented in any language.
But that’s not the impressive part: you can share data between totally different codebases, like Rust, Java, and Python, without serializing and even reallocating it.
If you can access the same space in memory, you can use it with the Arrow ecosystem.
When I said Spark shuffles cause a lot of traffic over the network, it also requires all this data to be serialized before sending and deserialized at the receiving end.
This wastes a lot of time and resources.`
        )),
        le.forEach(t),
        (Se = f(e)),
        (P = i(e, 'H2', { id: !0 }))
      var ha = l(P)
      V = i(ha, 'A', { href: !0 })
      var da = l(V)
      ;(kt = u(da, 'Code Time')), da.forEach(t), ha.forEach(t), (ge = f(e)), (b = i(e, 'P', {}))
      var Ve = l(b)
      ;(At = u(
        Ve,
        'ConnectorX is integrated into Polars, and if both are installed, you can call '
      )),
        (pe = i(Ve, 'CODE', {}))
      var ca = l(pe)
      ;(Et = u(ca, 'polars.read_sql')),
        ca.forEach(t),
        (_t = u(
          Ve,
          `.
I will use it direclty though:`
        )),
        Ve.forEach(t),
        (Le = f(e)),
        (x = i(e, 'PRE', { class: !0 }))
      var Ra = l(x)
      Ra.forEach(t), (Ce = f(e)), (y = i(e, 'P', {}))
      var Ye = l(y)
      ;(Tt = u(
        Ye,
        `My example uses Postgres, but ConnectorX supports several other databases.
The output of this function is an Apache Arrow Table.
Arrow2 means it uses the unofficial Rust implementation `
      )),
        (q = i(Ye, 'A', { href: !0, rel: !0 }))
      var ma = l(q)
      ;(It = u(ma, 'Arrow2')),
        ma.forEach(t),
        (Pt = u(
          Ye,
          `.
There is also the official Apache Arrow implementation in Rust, and a C++ implementation used by PyArrow.`
        )),
        Ye.forEach(t),
        (ze = f(e)),
        (Y = i(e, 'P', {}))
      var wa = l(Y)
      ;(xt = u(
        wa,
        'This next call instructs Polars to read the arrow table memory space. And as the Docs say:'
      )),
        wa.forEach(t),
        (je = f(e)),
        (Z = i(e, 'BLOCKQUOTE', {}))
      var ba = l(Z)
      fe = i(ba, 'P', {})
      var ya = l(fe)
      ;(qt = u(
        ya,
        `This operation will be zero copy for the most part.
Types that are not supported by Polars may be cast to the closest supported type.`
      )),
        ya.forEach(t),
        ba.forEach(t),
        (We = f(e)),
        (S = i(e, 'PRE', { class: !0 }))
      var Ha = l(S)
      Ha.forEach(t), (Me = f(e)), (N = i(e, 'P', {}))
      var va = l(N)
      ;(St = u(
        va,
        `Once you loaded it into Polars, you can manipulate this data at will.
There is an option to turn it into a lazy operation like it is done with Apache Spark.
This is very useful because it allows Polars to optimize the query plan when possible.
This also enables the use of streaming, for larger-than-memory operations.`
      )),
        va.forEach(t),
        (Re = f(e)),
        (c = i(e, 'P', {}))
      var ne = l(c)
      ;(gt = u(
        ne,
        `In this sample, I will keep it simple and write it to a file directly.
This could be done to a local path, or almost any destination `
      )),
        (g = i(ne, 'A', { href: !0, rel: !0 }))
      var ka = l(g)
      ;(Lt = u(ka, 'fsspec')),
        ka.forEach(t),
        (Ct = u(
          ne,
          ` supports.
For example, one valid path could be `
        )),
        (he = i(ne, 'CODE', {}))
      var Aa = l(he)
      ;(zt = u(Aa, 's3://bucket/database/folder/')),
        Aa.forEach(t),
        (jt = u(
          ne,
          `.
If you do not specify the file name, it will generate a random one. If you want to keep a single file, or want to replace an existing one, make sure to specify the file name.`
        )),
        ne.forEach(t),
        (He = f(e)),
        (L = i(e, 'PRE', { class: !0 }))
      var Da = l(L)
      Da.forEach(t), (De = f(e)), ($ = i(e, 'P', {}))
      var Ea = l($)
      ;(Wt = u(
        Ea,
        `It is also possible to use PyArrow to do this.
As I said before, PyArrow uses the C++ implementation of Arrow.
But data can flow between them seamlessly without the need for serialization, or even memory copying.`
      )),
        Ea.forEach(t),
        (Oe = f(e)),
        (C = i(e, 'PRE', { class: !0 }))
      var Oa = l(C)
      Oa.forEach(t), (Be = f(e)), (ee = i(e, 'P', {}))
      var _a = l(ee)
      ;(Mt = u(
        _a,
        'I created an example repository in GitHub that puts all of this together. Check it out!'
      )),
        _a.forEach(t),
        (Je = f(e)),
        (te = i(e, 'P', {}))
      var Ta = l(te)
      z = i(Ta, 'A', { href: !0, rel: !0 })
      var Ia = l(z)
      ;(Rt = u(Ia, 'github.com/auyer/polars-extraction')),
        Ia.forEach(t),
        Ta.forEach(t),
        (Ge = f(e)),
        (j = i(e, 'H2', { id: !0 }))
      var Pa = l(j)
      ae = i(Pa, 'A', { href: !0 })
      var xa = l(ae)
      ;(Ht = u(xa, 'Conclusion')), xa.forEach(t), Pa.forEach(t), (Ue = f(e)), (oe = i(e, 'P', {}))
      var qa = l(oe)
      ;(Dt = u(
        qa,
        `Apache Spark is an established framework for building complex ETLs.
But it carries a heavy JVM stack behind it.
As we discussed here, it is not a good choice for small datasets if you are worried about cost (you should be).`
      )),
        qa.forEach(t),
        (Xe = f(e)),
        (se = i(e, 'P', {}))
      var Sa = l(se)
      ;(Ot = u(
        Sa,
        `The Apache Arrow ecosystem is growing.
It can’t replace Spark just yet, but one day I bet it will.
But when doing what it is able to do now, it does it a lot faster and consumes fewer machine resources.
With new features being implemented into Polars almost every week, it will soon be the ubiquitous tool for data frames.`
      )),
        Sa.forEach(t),
        (Ke = f(e)),
        (re = i(e, 'P', {}))
      var ga = l(re)
      ;(Bt = u(
        ga,
        `ConnectorX is an important piece for this success. It does not have all the features it needs to make Polars fully replace Spark for me, as it does not support all Postgres Types.
I implemented support for a few, like Enum and ltree, but others are still missing, like string arrays. It could receive more love from the community.`
      )),
        ga.forEach(t),
        (Fe = f(e)),
        (ie = i(e, 'P', {}))
      var La = l(ie)
      ;(Jt = u(La, 'Hope this article was worth reading! Thanks!')), La.forEach(t), this.h()
    },
    h() {
      h(W, 'href', '#our-data-platform-journey'),
        h(v, 'id', 'our-data-platform-journey'),
        h(D, 'href', '#extraction-jobs-what-an-etl-looks-like'),
        h(k, 'id', 'extraction-jobs-what-an-etl-looks-like'),
        Ua(O.src, (Xt = Xa)) || h(O, 'src', Xt),
        h(O, 'alt', 'ETL (Extract Transform Load) diagram'),
        h(E, 'href', 'https://github.com/GoogleCloudPlatform/spark-on-k8s-operator'),
        h(E, 'rel', 'nofollow'),
        h(K, 'href', '#apache-spark-vs-apache-arrow-not-equivalent'),
        h(_, 'id', 'apache-spark-vs-apache-arrow-not-equivalent'),
        h(T, 'href', 'https://www.pola.rs/'),
        h(T, 'rel', 'nofollow'),
        h(I, 'href', 'https://github.com/sfu-db/connector-x'),
        h(I, 'rel', 'nofollow'),
        h(V, 'href', '#code-time'),
        h(P, 'id', 'code-time'),
        h(x, 'class', 'language-undefined'),
        h(q, 'href', 'https://github.com/jorgecarleitao/arrow2'),
        h(q, 'rel', 'nofollow'),
        h(S, 'class', 'language-undefined'),
        h(g, 'href', 'https://filesystem-spec.readthedocs.io/en/latest/'),
        h(g, 'rel', 'nofollow'),
        h(L, 'class', 'language-undefined'),
        h(C, 'class', 'language-undefined'),
        h(z, 'href', 'https://github.com/auyer/polars-extraction'),
        h(z, 'rel', 'nofollow'),
        h(ae, 'href', '#conclusion'),
        h(j, 'id', 'conclusion')
    },
    m(e, a) {
      o(e, m, a),
        s(m, ue),
        s(ue, Ze),
        o(e, de, a),
        o(e, v, a),
        s(v, W),
        s(W, Ne),
        o(e, ce, a),
        o(e, M, a),
        s(M, $e),
        o(e, me, a),
        o(e, R, a),
        s(R, et),
        o(e, we, a),
        o(e, H, a),
        s(H, tt),
        o(e, be, a),
        o(e, k, a),
        s(k, D),
        s(D, at),
        o(e, ye, a),
        o(e, A, a),
        s(A, O),
        s(A, ot),
        o(e, ve, a),
        o(e, B, a),
        s(B, st),
        o(e, ke, a),
        o(e, J, a),
        s(J, rt),
        o(e, Ae, a),
        o(e, G, a),
        s(G, it),
        o(e, Ee, a),
        o(e, U, a),
        s(U, lt),
        o(e, _e, a),
        o(e, w, a),
        s(w, nt),
        s(w, E),
        s(E, ut),
        s(w, pt),
        o(e, Te, a),
        o(e, X, a),
        s(X, ft),
        o(e, Ie, a),
        o(e, _, a),
        s(_, K),
        s(K, ht),
        o(e, Pe, a),
        o(e, F, a),
        s(F, dt),
        o(e, xe, a),
        o(e, Q, a),
        s(Q, ct),
        o(e, qe, a),
        o(e, d, a),
        s(d, mt),
        s(d, T),
        s(T, wt),
        s(d, bt),
        s(d, I),
        s(I, yt),
        s(d, vt),
        o(e, Se, a),
        o(e, P, a),
        s(P, V),
        s(V, kt),
        o(e, ge, a),
        o(e, b, a),
        s(b, At),
        s(b, pe),
        s(pe, Et),
        s(b, _t),
        o(e, Le, a),
        o(e, x, a),
        (x.innerHTML = za),
        o(e, Ce, a),
        o(e, y, a),
        s(y, Tt),
        s(y, q),
        s(q, It),
        s(y, Pt),
        o(e, ze, a),
        o(e, Y, a),
        s(Y, xt),
        o(e, je, a),
        o(e, Z, a),
        s(Z, fe),
        s(fe, qt),
        o(e, We, a),
        o(e, S, a),
        (S.innerHTML = ja),
        o(e, Me, a),
        o(e, N, a),
        s(N, St),
        o(e, Re, a),
        o(e, c, a),
        s(c, gt),
        s(c, g),
        s(g, Lt),
        s(c, Ct),
        s(c, he),
        s(he, zt),
        s(c, jt),
        o(e, He, a),
        o(e, L, a),
        (L.innerHTML = Wa),
        o(e, De, a),
        o(e, $, a),
        s($, Wt),
        o(e, Oe, a),
        o(e, C, a),
        (C.innerHTML = Ma),
        o(e, Be, a),
        o(e, ee, a),
        s(ee, Mt),
        o(e, Je, a),
        o(e, te, a),
        s(te, z),
        s(z, Rt),
        o(e, Ge, a),
        o(e, j, a),
        s(j, ae),
        s(ae, Ht),
        o(e, Ue, a),
        o(e, oe, a),
        s(oe, Dt),
        o(e, Xe, a),
        o(e, se, a),
        s(se, Ot),
        o(e, Ke, a),
        o(e, re, a),
        s(re, Bt),
        o(e, Fe, a),
        o(e, ie, a),
        s(ie, Jt)
    },
    p: Ut,
    i: Ut,
    o: Ut,
    d(e) {
      e && t(m),
        e && t(de),
        e && t(v),
        e && t(ce),
        e && t(M),
        e && t(me),
        e && t(R),
        e && t(we),
        e && t(H),
        e && t(be),
        e && t(k),
        e && t(ye),
        e && t(A),
        e && t(ve),
        e && t(B),
        e && t(ke),
        e && t(J),
        e && t(Ae),
        e && t(G),
        e && t(Ee),
        e && t(U),
        e && t(_e),
        e && t(w),
        e && t(Te),
        e && t(X),
        e && t(Ie),
        e && t(_),
        e && t(Pe),
        e && t(F),
        e && t(xe),
        e && t(Q),
        e && t(qe),
        e && t(d),
        e && t(Se),
        e && t(P),
        e && t(ge),
        e && t(b),
        e && t(Le),
        e && t(x),
        e && t(Ce),
        e && t(y),
        e && t(ze),
        e && t(Y),
        e && t(je),
        e && t(Z),
        e && t(We),
        e && t(S),
        e && t(Me),
        e && t(N),
        e && t(Re),
        e && t(c),
        e && t(He),
        e && t(L),
        e && t(De),
        e && t($),
        e && t(Oe),
        e && t(C),
        e && t(Be),
        e && t(ee),
        e && t(Je),
        e && t(te),
        e && t(Ge),
        e && t(j),
        e && t(Ue),
        e && t(oe),
        e && t(Xe),
        e && t(se),
        e && t(Ke),
        e && t(re),
        e && t(Fe),
        e && t(ie)
    }
  }
}
const Qa = {
  title: 'How I Decreased ETL Cost by Leveraging the Apache Arrow Ecosystem',
  date: '2023-02-01T00:00:00.000Z',
  headings: [
    { depth: 2, value: 'Our data platform journey', id: 'our-data-platform-journey' },
    {
      depth: 3,
      value: 'Extraction Jobs: what an ETL looks like',
      id: 'extraction-jobs-what-an-etl-looks-like'
    },
    {
      depth: 2,
      value: 'Apache Spark vs Apache Arrow (not equivalent)',
      id: 'apache-spark-vs-apache-arrow-not-equivalent'
    },
    { depth: 2, value: 'Code Time', id: 'code-time' },
    { depth: 2, value: 'Conclusion', id: 'conclusion' }
  ]
}
class Va extends Ba {
  constructor(m) {
    super(), Ja(this, m, null, Ka, Ga, {})
  }
}
export { Va as default, Qa as metadata }
