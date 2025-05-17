# 账户

Farcaster 账户允许您设置用户名、个人资料图片，并发布称为"casts"的短文本消息。任何以太坊地址都可以通过链上交易注册 Farcaster 账户。

## 创建账户

通过调用 IdGateway 合约即可创建 Farcaster 账户。该合约会为您的以太坊地址分配一个新的 Farcaster ID（简称 fid）。

在使用账户前，您需要获取用户名、租赁存储空间并添加密钥。这些步骤需要多次签名和链上交易，使用常规以太坊钱包操作会较为繁琐。

我们推荐从 [Warpcast](https://www.warpcast.com/) 开始，这是一款专为 Farcaster 设计的客户端软件，能为您自动处理整个流程。它还会使用独立的以太坊账户进行交易签名，从而保障您的主账户安全。

## 添加账户密钥

账户可以签发密钥，允许应用程序代表其发布消息。用户通常会为他们使用的每个 Farcaster 应用签发一个密钥。

密钥由 KeyRegistry 合约管理。添加密钥时，您需要提交 EdDSA 密钥对的公钥以及请求者签名。请求者可以是账户本身，也可以是希望代表其操作的应用程序。

## 恢复账户

用户常为社交应用设置独立钱包，容易丢失访问权限。Farcaster 允许任何账户指定一个恢复地址用于账户恢复。该地址可在创建账户时或之后任意时间配置。

用户可将恢复地址设置为 Warpcast 等可信服务，也可以使用常规以太坊钱包自行管理。

## 资源

### 规范文档

- [合约规范](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#1-smart-contracts) - 管理 Farcaster 账户、账户密钥和恢复地址的链上合约。

### API 接口

- [IdRegistry](../../reference/contracts/reference/id-registry) - 链上查询账户数据
- [IdGateway](../../reference/contracts/reference/id-gateway) - 链上创建账户
- [KeyRegistry](../../reference/contracts/reference/key-registry) - 链上查询账户密钥数据
- [KeyGateway](../../reference/contracts/reference/key-gateway) - 链上创建账户密钥
- [获取 Farcaster ID 列表](../../reference/hubble/httpapi/fids) - 从 hub 获取所有已注册账户的 fid
- [获取账户密钥](../../reference/hubble/httpapi/onchain#onchainsignersbyfid) - 从 hub 获取账户的密钥（签名者）

### 教程指南

- [创建账户](../../developers/guides/accounts/create-account.md) - 在 Farcaster 上创建新账户
- [创建账户密钥](../../developers/guides/accounts/create-account-key.md) - 为账户创建新密钥
- [通过用户名查找账户](../../developers/guides/accounts/find-by-name.md) - 根据用户名查找账户
- [变更托管地址](../../developers/guides/accounts/change-custody.md) - 修改账户所属地址
- [变更恢复地址](../../developers/guides/accounts/change-recovery.md) - 修改账户恢复地址
- [查找密钥请求者](../../developers/guides/advanced/decode-key-metadata.md) - 查找用户授权的密钥对应应用
- [从 replicator 查询注册量](../../developers/guides/advanced/query-signups.md) - 查询 replicator 中的注册数量
