:::tip 加入讨论
在 Farcaster 的 [/fc-devs](https://warpcast.com/~/channel/fc-devs) 频道中与其他开发者交流提问。
:::

## 创建 mini apps

学习如何构建在 Farcaster 信息流中运行的 mini apps（原称为 Frames）。

<!-- prettier-ignore -->
- [简介](https://miniapps.farcaster.xyz/){target="_self"} - 了解什么是 mini app 及其工作原理
<!-- prettier-ignore -->
- [快速开始](https://miniapps.farcaster.xyz/docs/getting-started){target="_self"} - 构建你的第一个 mini app

## 使用 Farcaster 登录

让用户能够轻松使用他们的 Farcaster 账户登录你的应用。

- [示例](/zh/auth-kit/examples.md) - 查看 Sign in with Farcaster (SIWF) 的实际应用
- [AuthKit](/zh/auth-kit/installation.md) - 用于集成 SIWF 的 React 工具包
- [FIP-11](https://github.com/farcasterxyz/protocol/discussions/110) - SIWF 的正式标准文档

## 分析 Farcaster 数据

将 Farcaster 网络同步到本地机器，以便对数据运行查询。

- [运行 hub](/zh/hubble/install.md) - 在本地机器上实时获取 Farcaster 数据
- [编写第一个 hub 查询](./guides/querying/fetch-casts.md) - 从 hub 获取账户的 casts
- [设置 replicator](./guides/apps/replicate.md) - 将 hub 同步到 postgres 数据库以运行高级查询

## 写入 Farcaster

- [Hello World](/zh/developers/guides/basics/hello-world) - 通过编程方式创建账户并发布 cast
