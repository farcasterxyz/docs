# 将 Hubble 数据复制到 Postgres

::: info 前提条件

- 本地或远程运行的 Hubble 实例（以获得更佳性能）

:::

虽然某些应用可以直接通过查询 Hubble 来编写，但大多数正式应用需要以更结构化的方式访问数据。

[Shuttle](https://github.com/farcasterxyz/hub-monorepo/tree/main/packages/shuttle) 是一个工具包，
可用于将 Hubble 的数据镜像到 Postgres 数据库，从而方便地访问底层数据。

查看文档以获取更多信息。
