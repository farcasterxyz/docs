# 更改 Farcaster 用户名

用户可以更改其链下 ENS 名称或 Fname，而不会影响账户历史记录。此操作最多每 28 天可执行一次。

::: warning

- 若违反[使用政策](/zh/learn/architecture/ens-names#offchain-ens-names-fnames)，Fname 可能会被撤销。
- 频繁更改 Fname 可能导致应用降低您的信誉评级。
  :::

### 前提条件

- 在 OP Mainnet 上拥有该账户的 ETH 钱包（无需持有 ETH）。

### 更改用户名

要转移 Fname（例如 `Hubble`），请向 `/transfers` 发起 POST 请求，请求体如下：

```yaml
{
  "name": "hubble", // 待转移的名称
  "from": 123,  // 转出方 FID
  "to": 321, // 转入方 FID
  "fid": 123, // 发起请求的 FID（必须与 from 匹配）
  "owner": "0x...", // 发起请求 FID 的托管地址
  "timestamp": 1641234567,  // 当前时间戳（秒）
  "signature": "0x..."  // 由 FID 托管地址签名的 EIP-712 签名
}
```

生成 EIP-712 签名的代码示例：

```js
import { makeUserNameProofClaim, EIP712Signer } from '@farcaster/hub-nodejs';

const accountKey: EIP712Signer = undefined; // 托管地址的账户密钥（使用 hub-nodejs 中适用于 ethers 或 viem 的子类）

const claim = makeUserNameProofClaim({
  name: 'hubble',
  owner: '0x...',
  timestamp: Math.floor(Date.now() / 1000),
});
const signature = (
  await accountKey.signUserNameProofClaim(claim)
)._unsafeUnwrap();
```

通过 curl 的请求示例：

```bash
curl -X POST https://fnames.farcaster.xyz/transfers \
  -H "Content-Type: application/json" \
  -d \
'{"name": "hubble", "owner": "0x...", "signature": "0x...", "from": 123, "to": 321, "timestamp": 1641234567, fid: 123}'
```

更多关于 Fname 注册表 API 的细节，请参阅[此处](/zh/reference/fname/api.md)。
