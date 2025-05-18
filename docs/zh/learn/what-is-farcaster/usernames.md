# 用户名

Farcaster 账户需要一个用户名，以便其他用户能够找到并提及它。Farcaster 使用 [Ethereum Name Service](https://ens.domains/) 来管理用户名。

ENS 用户名由以太坊地址拥有，就像 Farcaster 账户一样。区别在于一个地址可以拥有多个 ENS 名称，因此 Farcaster 账户必须指定它希望使用的名称。ENS 名称只有在长度不超过 16 个字符且仅包含小写字母、数字和连字符时才能在 Farcaster 上使用。

## 更改用户名

Farcaster 账户可以随时在不同用户名之间切换。更改名称不会影响您的历史记录或关注者。

每年更改几次名称是安全的。但更频繁地更改名称可能会导致用户或 mini app 对您的账户失去信任。如果您想更改公开标识，请考虑更改您的显示名称。

## 链下与链上名称

账户可以选择两种类型的用户名：

- **链下 ENS 名称**：免费且由 Farcaster 控制。（例如 @alice）
- **链上 ENS 名称**：需要付费且由您的钱包控制。（例如 @alice.eth）

如果您想快速开始且没有链上 ENS 名称，请选择链下 ENS 名称。账户以后随时可以升级为链上名称。建议使用像 Warpcast 这样的 mini app 来为您设置。

![用户名](/assets/usernames.png)

### 链下 ENS 名称

- 链下 ENS 名称（也称为 fnames）是免费的，由 Farcaster 发行。
- 任何以太坊账户都可以通过调用 [Fname Registry](/zh/learn/architecture/ens-names) 获得一个唯一的 fname。
- Fnames 是免费的，但 Farcaster 可以随时撤销它们。

### 链上 ENS 名称

- 链上 ENS 名称（也称为 .eth 名称）是链上的，由 ENS 发行。
- 任何以太坊账户都可以通过调用 [ENS Registry](https://docs.ens.domains/dapp-developer-guide/the-ens-registry) 获得一个 ENS 名称。
- 名称不是免费的，但 Farcaster 无法撤销它们。

## 资源

### 规范

- [Farcaster 名称](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#5-fname-specifications) - 一种 ENSIP-10 链下 ENS 名称，可在 Farcaster 内使用。
- [UserData: 用户名](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#23-user-data) - 将有效的用户名证明设置为当前用户名。
- [用户名证明](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#17-username-proof) - 证明链上或链下用户名的所有权。
- [验证](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#25-verifications) - 证明地址的所有权，链上用户名证明需要此验证。

### API

- [UserData API](../../reference/hubble/httpapi/userdata) - 获取用户当前用户名的 UserData。
- [用户名证明 API](../../reference/hubble/httpapi/usernameproof) - 从 hub 获取用户的名证明。
- [验证证明 API](../../reference/hubble/httpapi/verification) - 从 hub 获取用户的验证信息。
- [Fname Registry API](../../reference/fname/api.md) - 以编程方式注册和跟踪 fname 所有权。

### 教程

- [获取 UserData](../../developers/guides/querying/fetch-profile.md) - 从账户获取 UserData 消息。
- [创建 UserData](../../developers/guides/writing/messages#user-data) - 创建 UserData 消息以选择有效的用户名。
- [验证地址](../../developers/guides/writing/verify-address.md) - 验证以太坊账户的所有权。
- [按用户名查找账户](../../developers/guides/accounts/find-by-name.md) - 按用户名查找账户。
- [更改 Farcaster 名称](../../developers/guides/accounts/change-fname.md) - 更改 Farcaster 用户名。
