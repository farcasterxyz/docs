# 消息

Farcaster 账户通过签名和发布消息进行交互。Alice 可以创建一条内容为"_你好 @bob_"的消息，并用她的密钥进行签名。

消息存储在一个点对点的节点网络中。Farcaster 网络中的节点称为 Hub，每个 Hub 都存储着整个网络的副本。用户可以向一个 Hub 发布消息，几秒钟内该消息就会传播至整个网络。Farcaster 紧凑的消息格式和最终一致性模型使得这种架构能够扩展到数百万用户。

账户可以生成一个[密钥](./accounts.md#adding-account-keys)并授权给应用程序使用该密钥签署消息。用户可以在同一账户下使用多个应用程序，每个应用程序都可以拥有自己的密钥。将签名密钥与所有权密钥分离有助于保障账户安全。

## 消息类型

账户可以向网络发布五种不同类型的消息：

| 类型          | 描述                         | 示例                       |
| ------------- | ---------------------------- | -------------------------- |
| Casts         | 任何人都能看到的公开消息。   | "你好世界！"               |
| Reactions     | 账户与 Cast 之间的互动关系。 | Alice 点赞了 Bob 的 Cast。 |
| Links         | 两个账户之间的关系。         | Alice 关注 Bob。           |
| Profile Data  | 账户的元数据信息。           | 头像、显示名称。           |
| Verifications | 所有权证明。                 | 以太坊地址。               |

## 存储机制

账户需要支付租金才能将其消息保留在 Farcaster 网络上。收取租金可防止用户对网络进行垃圾信息攻击。

账户可以通过向存储注册表（Storage Registry）发起链上交易来租用存储单元。当前一个存储单元的价格为 7 美元，有效期为一年，允许每个账户存储一定数量的各类消息。当前各类型的存储限制为：

- 5000 条 Casts
- 2500 条 Reactions
- 2500 条 Links
- 50 条 Profile Data
- 50 条 Verifications

如果账户超出某类消息的存储限制，系统将自动清理最早的消息以腾出空间存储新消息。用户无需购买更多存储空间即可继续使用网络，同时 Hub 也能有效控制存储负载。账户随时可以通过购买更多存储空间来提高限制。

存储单元过期的账户可能会丢失所有消息。存储单元过期后有 30 天的宽限期，账户必须在此期间续费，否则将丢失消息。

每个存储单元的价格和容量会定期重新计算，以平衡网络的增长和质量。详见 [FIP-6](https://github.com/farcasterxyz/protocol/discussions/98)。

## 消息删除

账户随时可以通过发布对应的删除消息来删除原始消息。删除消息会清除原始消息的内容，并在其位置留下一个墓碑标记。被删除的消息仍会占用账户的存储配额，直到被新消息挤出存储空间为止。

## 时间戳

消息的时间戳从 Farcaster 纪元（2021 年 1 月 1 日 00:00:00 UTC）开始以秒计数。使用近期纪元可以使时间戳和消息体积更小，这对网络至关重要。

时间戳未经验证，用户可以回溯日期（类似于博客文章）。但时间戳不能设置为未来 15 分钟以上，否则网络将拒绝此类消息。

## 相关资源

### 技术规范

- [消息规范](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#2-message-specifications) - Farcaster 的最小变更单元
- [CRDTs](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#31-crdts) - 保持网络消息同步的规则
- [存储注册表](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#13-storage-registry) - 获取存储单元的智能合约

### API 接口

- [获取 Casts](../../reference/hubble/httpapi/casts) - 从 Hub 获取账户的 Casts
- [获取 Reactions](../../reference/hubble/httpapi/reactions) - 从 Hub 获取账户的 Reactions
- [获取 Links](../../reference/hubble/httpapi/links) - 从 Hub 获取账户的 Links 或关注关系
- [获取 UserData](../../reference/hubble/httpapi/userdata) - 从 Hub 获取账户的 Profile Data
- [提交消息](../../reference/hubble/httpapi/message#submitmessage) - 向 Hub 网络广播消息
- [验证消息](../../reference/hubble/httpapi/message#validatemessage) - 通过 Hub 验证消息真实性
- [存储注册表](../../reference/contracts/reference/storage-registry) - 为账户获取或检查存储单元

### 教程指南

- [获取 Casts](../../developers/guides/querying/fetch-casts) - 从 Hub 获取账户的 Casts
- [获取个人资料](../../developers/guides/querying/fetch-profile) - 从 Hub 获取账户的个人资料
- [创建常见消息类型](../../developers/guides/writing/messages) - 创建 Casts、Links、Reactions 和 UserData
- [创建高级功能 Casts](../../developers/guides/writing/casts) - 创建带嵌入内容、表情和提及的 Casts
