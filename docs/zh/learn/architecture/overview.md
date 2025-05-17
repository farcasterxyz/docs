# 架构

Farcaster 采用混合架构，将身份信息存储在链上，数据存储在链下。

![架构示意图](/assets/architecture.png)

## 链上部分

Farcaster 的链上系统以 [OP 主网智能合约](./contracts.md) 的形式实现。只有当安全性和一致性至关重要时，才会在链上执行操作。系统会尽量减少链上操作以降低成本并提升性能。

目前仅以下几类操作需要在链上执行：

- 创建 [账户](../what-is-farcaster/accounts.md)
- 支付租金以 [存储数据](../what-is-farcaster/messages.md#storage)
- 为 [连接的应用](../what-is-farcaster/apps.md#connected-apps) 添加账户密钥

## 链下部分

Farcaster 的链下系统是由称为 [枢纽（Hubs）](./hubs.md) 的服务器节点组成的点对点网络，用于存储用户数据。大多数用户操作都在链下执行，包括：

- 发布新的公开消息
- 关注其他用户
- 对帖子添加反应
- 更新个人资料图片

当性能和成本成为关键考量时，操作会在链下执行。在一致性要求不严格的场景下，通常优先采用链下操作。链下系统通过依赖链上系统的数字签名来保障安全性。
