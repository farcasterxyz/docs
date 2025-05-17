# 将 Hubble 数据复制到 Postgres

::: info 前提条件

- 本地或远程运行的 Hubble 实例（推荐本地运行以获得更佳性能）

:::

虽然部分应用可以直接通过查询 Hubble 来构建，但大多数正式应用需要以更结构化的方式访问数据。

[Shuttle](https://github.com/farcasterxyz/hub-monorepo/tree/main/packages/shuttle) 是一个工具包，可用于将 Hubble 的数据镜像到 Postgres 数据库，从而便捷地访问底层数据。

更多信息请查阅相关文档。
