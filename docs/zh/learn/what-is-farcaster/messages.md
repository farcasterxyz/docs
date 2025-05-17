# 消息

Farcaster 账户通过签名和发布消息进行交互。Alice 可以创建一条内容为"_你好 @bob_"的消息，并用她的密钥进行签名。

消息存储在一个点对点的节点网络中。Farcaster 网络中的节点称为 Hub，每个 Hub 都存储着整个网络的完整副本。用户可以向一个 Hub 发布消息，几秒钟内该消息就会传播至整个网络。Farcaster 的紧凑消息格式和最终一致性模型使得这种架构能够扩展到数百万用户。

账户可以生成一个[密钥](./accounts.md#添加账户密钥)并授权给应用程序，应用程序可以用它来签署消息。用户可以在同一账户下使用多个应用，每个应用都可以拥有自己的密钥。将签名密钥与所有权密钥分离有助于保障账户安全。

## 消息类型

账户可以向网络发布五种不同类型的消息：

| 类型          | 描述                         | 示例                       |
| ------------- | ---------------------------- | -------------------------- |
| Casts         | 任何人都可以看到的公开消息。 | "你好世界！"               |
| Reactions     | 账户与 Cast 之间的互动关系。 | Alice 点赞了 Bob 的 Cast。 |
| Links         | 两个账户之间的关系。         | Alice 关注了 Bob。         |
| Profile Data  | 账户的元数据信息。           | 头像、显示名称等。         |
| Verifications | 所有权证明。                 | 以太坊地址验证。           |

## 存储机制

账户必须支付租金才能将其消息保留在 Farcaster 网络上。收取租金可以防止用户对网络进行垃圾信息攻击。

账户可以通过向存储注册表（Storage Registry）发起链上交易来租用存储单元。当前一个存储单元的价格为 7 美元，有效期为一年，允许每个账户存储特定数量的各类消息。当前各类型的存储上限为：

- 5000 条 Casts
- 2500 条 Reactions
- 2500 条 Links
- 50 条 Profile Data
- 50 条 Verifications

如果账户超出某类消息的存储上限，系统将自动清理最旧的消息以腾出空间。用户无需购买额外存储即可继续使用网络，同时 Hub 可以有效控制存储负载。账户随时可以通过购买更多存储来提升限额。

若账户的存储到期未续费，可能会丢失所有消息。存储单元到期后有 30 天的宽限期，在此期间账户必须续费，否则将永久丢失消息。

每个存储单元的价格和容量会定期重新计算，以平衡网络增长和质量。详见 [FIP-6](https://github.com/farcasterxyz/protocol/discussions/98)。

## 消息删除

账户可以随时通过发布对应的删除消息来删除内容。删除操作会清空原始消息内容，仅保留占位标识。在存储空间被新消息挤占前，已删除消息仍会占用账户的存储配额。

## 时间戳

消息时间戳从 Farcaster 纪元（2021 年 1 月 1 日 00:00:00 UTC）开始以秒计数。采用近期纪元可以显著减小时间戳和消息体积，这对网络性能至关重要。

时间戳未经验证，用户可以回溯日期（类似博客发布时间）。但网络会拒绝时间戳超过当前时间 15 分钟的消息。

## 相关资源

### 技术规范

- [消息规范](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#2-message-specifications) - Farcaster 的最小变更单元
- [CRDTs](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#31-crdts) - 保持网络消息同步的规则
- [存储注册表](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#13-storage-registry) - 获取存储单元的智能合约

### API 接口

- [获取 Casts](../../reference/hubble/httpapi/casts) - 从 Hub 获取账户的 Casts
- [获取 Reactions](../../reference/hubble/httpapi/reactions) - 从 Hub 获取账户的 Reactions
- [获取 Links](../../reference/hubble/httpapi/links) - 从 Hub 获取账户的关注关系
- [获取 UserData](../../reference/hubble/httpapi/userdata) - 从 Hub 获取账户资料数据
- [提交消息](../../reference/hubble/httpapi/message#submitmessage) - 向 Hub 网络广播消息
- [验证消息](../../reference/hubble/httpapi/message#validatemessage) - 通过 Hub 验证消息真实性
- [存储注册表](../../reference/contracts/reference/storage-registry) - 查询或购买账户存储单元

### 开发指南

- [获取 Casts](../../developers/guides/querying/fetch-casts) - 从 Hub 获取账户的 Casts
- [获取资料](../../developers/guides/querying/fetch-profile) - 从 Hub 获取账户资料
- [创建基础消息](../../developers/guides/writing/messages) - 创建 Casts、Links、Reactions 和 UserData
- [创建高级 Casts](../../developers/guides/writing/casts) - 创建含嵌入内容、表情和提及的 Casts
