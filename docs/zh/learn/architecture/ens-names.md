# ENS 名称

Farcaster 使用 ENS 名称作为账户的人类可读标识符。系统支持两种 ENS 名称：

- **链下 ENS 名称**：免费且由 Farcaster 管控（例如 @alice）
- **链上 ENS 名称**：需付费且由用户钱包控制（例如 @alice.eth）

ENS 名称在 Farcaster 上使用时必须满足：长度 ≤16 个字符，且仅包含小写字母、数字和连字符。

![用户名](/assets/usernames.png)

## 链上 ENS 名称

用户可在 Farcaster 上使用如 `@alice.eth` 的链上 ENS 名称。

链上 ENS 名称由 ENS 发行，以 .eth 结尾，必须在以太坊 L1 区块链上注册。任何人都可以通过 [ENS 应用](https://app.ens.domains/) 注册 ENS 名称。

注册链上 ENS 名称需要支付费用，但一经注册即由用户完全控制，不可被撤销。

## 链下 ENS 名称（Fnames）

用户可在 Farcaster 上使用如 `@alice` 的链下 ENS 名称。

链下 ENS 名称（又称 Farcaster 名称或 Fnames）符合 ENS 规范但采用链下注册。Fnames 免费使用，但需遵守防抢注和防冒充的使用政策，同时满足以下要求：

1. 每个账户同一时间只能拥有一个 Fname
2. 账户每 28 天可修改一次 Fname

### 使用政策

注册 Fname 免费，但需遵循以下政策：

1. 与公众人物或实体相关的名称可能被回收（例如 @google）
2. 超过 60 天未使用的名称可能被回收
3. 以转售为目的注册的名称可能被回收

具体判定由 Farcaster 团队执行，通常需要人工审核。若用户希望完全掌控某个名称，应使用链上 ENS 名称。

### 注册机制

Fnames 作为 `fcast.id` 子域下的链下名称发行。

用户 Bob 可注册链下 ENS 名称 `bob.fcast.id`，并在任何 Farcaster 应用中通过简称 `@bob` 使用。该名称需向 Fname 注册服务器发送签名请求进行注册。具体查询和创建 Fnames 的方法详见 [FName API 参考文档](/reference/fname/api)。

要深入了解 Fnames 工作原理，请参阅 [ENSIP-16](https://docs.ens.domains/ens-improvement-proposals/ensip-16-offchain-metadata) 和 [ERC-3668](https://eips.ethereum.org/EIPS/eip-3668)。
