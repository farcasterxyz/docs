# FName 注册服务器 API 参考文档

[Fname 注册服务](https://github.com/farcasterxyz/fname-registry) 部署在 https://fnames.farcaster.xyz

这是一个简单的 HTTP 服务，负责分配和追踪 fnames。所有 Fname 变更都以转移记录的形式保存。
注册 fname 是从 FID 0 转移到用户 fid 的过程。转移 fname 是从用户 fid 转移到另一个 fid 的过程。注销 fname 是从用户 fid 转移回 fid 0 的过程。

::: warning 注册 fname 注意事项

请注意，注册新 fname 时，仅调用此 API 并不足够。这只会将名称预留到你的 fid 下。你还需要向 hub 提交 [UserDataAdd](/zh/reference/hubble/datatypes/messages#_2-userdata) 消息才能将此名称设为你的用户名。

:::

### 获取转移历史记录

要获取所有转移记录，向 `/transfers` 发起 GET 请求：

```bash
curl https://fnames.farcaster.xyz/transfers | jq
```

支持以下查询参数：

- `from_id` - 分页起始的转移记录 ID
- `name` - 筛选特定 fname
- `fid` - 筛选涉及特定 fid（来源或目标）的记录
- `from_ts` - 分页起始时间戳（秒）

### 获取当前 fname 或 fid

要获取 fid 或 fname 的最新转移事件，向 `/transfers/current` 发起 GET 请求

例如：要查询 `@farcaster` 对应的 fid，执行以下调用并读取返回值中 `to` 字段：

```bash
curl https://fnames.farcaster.xyz/transfers?name=farcaster | jq
```

要查询 fid `1` 对应的 fname，执行以下调用并读取返回值中 `username` 字段：

```bash
curl https://fnames.farcaster.xyz/transfers?fid=1 | jq
```

两者都会返回相同的转移对象：

```json
{
  "transfers": [
    {
      "id": 1,
      "timestamp": 1628882891,
      "username": "farcaster",
      "owner": "0x8773442740c17c9d0f0b87022c722f9a136206ed",
      "from": 0,
      "to": 1,
      "user_signature": "0xa6fdd2a69deab5633636f32a30a54b21b27dff123e6481532746eadca18cd84048488a98ca4aaf90f4d29b7e181c4540b360ba0721b928e50ffcd495734ef8471b",
      "server_signature": "0xb7181760f14eda0028e0b647ff15f45235526ced3b4ae07fcce06141b73d32960d3253776e62f761363fb8137087192047763f4af838950a96f3885f3c2289c41b"
    }
  ]
}
```

### 注册或转移 fname

要注册新 fid（例如 `hubble`），首先确认该 fname 未被注册。

然后向 `/transfers` 发起 POST 请求，包含以下请求体：

```yaml
{
  "name": "hubble", // 待注册名称
  "from": 0,  // 来源 fid（新注册时为 0）
  "to": 123, // 目标 fid（注销时为 0）
  "fid": 123, // 发起请求的 fid（必须匹配 from 或 to）
  "owner": "0x...", // 发起请求 fid 的托管地址
  "timestamp": 1641234567,  // 当前时间戳（秒）
  "signature": "0x..."  // 由 fid 托管地址签名的 EIP-712 签名
}
```

生成 EIP-712 签名的代码示例：

```js
import { makeUserNameProofClaim, EIP712Signer } from '@farcaster/hub-nodejs';

const accountKey: EIP712Signer = undefined; // 托管地址的账户密钥（使用 hub-nodejs 中适用于 ethers 或 viem 的相应子类）

const claim = makeUserNameProofClaim({
  name: 'hubble',
  owner: '0x...',
  timestamp: Math.floor(Date.now() / 1000),
});
const signature = (
  await accountKey.signUserNameProofClaim(claim)
)._unsafeUnwrap();
```

这与向 hub 提供的 ENS UsernameProofs 中使用的签名类型完全相同。

调用示例：

```bash
curl -X POST https://fnames.farcaster.xyz/transfers \
  -H "Content-Type: application/json" \
  -d \
'{"name": "hubble", "owner": "0x...", "signature": "0x...", "from": 0, "to": 1000, "timestamp": 1641234567, fid: 1000}'
```

名称注册后，仍需向 hub 发送 [UserData](/zh/reference/hubble/datatypes/messages#_2-userdata) 消息才能实际设置用户名称。示例代码参见 [hub-nodejs](https://github.com/farcasterxyz/hub-monorepo/tree/main/packages/hub-nodejs/examples/hello-world) 仓库。
