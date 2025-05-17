# 应用

使用 Farcaster 需要一个以太坊钱包来注册账户，以及一个浏览网络的用户界面。如果您是新手，我们建议从 [iOS](https://apps.apple.com/us/app/warpcast/id1600555445) 或 [Android](https://play.google.com/store/apps/details?id=com.farcaster.mobile&hl=en_US&gl=US) 上的 Warpcast 开始。

应用分为两种类型：

1. **钱包应用** - 允许注册、添加关联应用、发布和浏览消息。
2. **关联应用** - 仅允许发布和浏览消息。

## 钱包应用

用户必须安装一个钱包应用才能开始使用 Farcaster。它们可以执行链上和链下操作，如注册、添加关联应用、发布消息和用户。

钱包应用控制着拥有账户的以太坊地址。它对账户拥有控制权，可以代表您执行任何操作，因此请仅使用您信任的钱包应用。

### Warpcast

Warpcast 是由 Farcaster 团队开发的钱包应用。它提供网页和移动应用，但注册仅限移动端。

- 下载：[iOS](https://apps.apple.com/us/app/warpcast/id1600555445), [Android](https://play.google.com/store/apps/details?id=com.farcaster.mobile&hl=en_US&gl=US)

## 关联应用

关联应用只能在用户通过钱包应用注册后才能添加。它们可以在 Farcaster 上执行链下操作，如发布动态（casts）、关注账户和浏览。

关联应用控制着由钱包应用授予的应用密钥（app key）。用户可以向其账户添加多个关联应用，并随时移除它们。恶意的关联应用无法控制您的账户，其执行的任何操作都可以由您的钱包应用撤销。

一些流行的关联应用包括：

- [Supercast](https://supercast.xyz/)
- [Yup](https://yup.io/)
- [Farcord](https://farcord.com/)

**Farcaster 不会审核关联应用，使用它们需自行承担风险**

## 资源

### 工具

- [Hubble](../../hubble/hubble.md) - 用于读写消息的 Farcaster 中心（hub）。
- [Replicator](https://github.com/farcasterxyz/hub-monorepo/tree/main/apps/replicator) - 将中心同步到 PostgreSQL 数据库的工具。

### 教程

- [设置 hubble](../..//hubble/install#install-via-script) - 运行一个 Farcaster 中心。
- [设置 replicator](../../developers/guides/apps/replicate) - 将中心同步到 PostgreSQL 以便轻松查询。
- [复制模式](../../reference/replicator/schema) - replicator 的 PostgreSQL 表结构。

### 服务

- [Neynar](https://neynar.com/) - 用于构建 Farcaster 应用的基础设施和服务。
