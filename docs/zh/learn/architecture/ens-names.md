# ENS 名称

Farcaster 使用 ENS 名称作为账户的人类可读标识符。支持两种类型的 ENS 名称：

- **链下 ENS 名称**：免费且由 Farcaster 控制（例如 @alice）
- **链上 ENS 名称**：需付费且由您的钱包控制（例如 @alice.eth）

ENS 名称在 Farcaster 上使用时必须满足以下条件：长度不超过 16 个字符，且仅包含小写字母、数字和连字符。

![用户名](/assets/usernames.png)

## 链上 ENS 名称

用户可以在 Farcaster 上使用如 `@alice.eth` 这样的链上 ENS 名称。

链上 ENS 名称由 ENS 发行，以 .eth 结尾，必须在以太坊 L1 区块链上注册。任何人都可以通过 [ENS 应用](https://app.ens.domains/) 注册 ENS 名称。

用户需要支付费用来注册链上 ENS 名称，但一旦注册成功，该名称将由用户控制且无法被撤销。

## 链下 ENS 名称（Fnames）

用户可以在 Farcaster 上使用如 `@alice` 这样的链下 ENS 名称。

链下 ENS 名称，也称为 Farcaster 名称或 Fnames，符合 ENS 标准但采用链下注册。Fnames 是免费的，但需遵守使用政策以防止抢注和冒充行为。同时还需满足以下要求：

1. 一个账户同一时间只能拥有一个 Fname。
2. 一个账户每 28 天只能更改一次 Fname。

### 使用政策

注册 Fname 是免费的，但需遵守以下政策：

1. 与公众人物或实体相关的名称可能会被回收（例如 @google）。
2. 超过 60 天未使用的名称可能会被回收。
3. 仅用于转售目的而注册的名称可能会被回收。

相关决定由 Farcaster 团队做出，通常需要人工判断。希望完全自主控制名称的用户应使用链上 ENS 名称。

### 注册机制

Fnames 作为链下名称在 `fcast.id` 子域下发行。

Bob 可以注册链下 ENS 名称 `bob.fcast.id`，并在任何 Farcaster 应用中以简称 `@bob` 使用。该名称可通过向 Fname 注册服务器发送签名请求来注册。有关查询和创建 Fnames 的详细信息，请参阅 [FName API 参考](/zh/reference/fname/api)。

要了解更多关于 Fnames 工作原理的信息，请参阅 [ENSIP-16](https://docs.ens.domains/ens-improvement-proposals/ensip-16-offchain-metadata) 和 [ERC-3668](https://eips.ethereum.org/EIPS/eip-3668)。
