# App 客户端

如果您正在构建一个[关联应用](https://docs.farcaster.xyz/learn/what-is-farcaster/apps#connected-apps)并希望用户通过 Farcaster 登录，可以使用 `AppClient`。

通过 `AppClient`，您可以创建 Farcaster Auth 中继通道，生成深度链接以请求用户 Farcaster 钱包应用的签名，并验证返回的签名。

```ts
import { createAppClient, viemConnector } from '@farcaster/auth-client';

const appClient = createAppClient({
  relay: 'https://relay.farcaster.xyz',
  ethereum: viemConnector(),
});
```

## 参数

| 参数       | 类型                | 描述                                                                                                                                                                                      | 必填 |
| ---------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| `ethereum` | `EthereumConnector` | <p>以太坊连接器，用于查询 Farcaster 合约并验证智能合约钱包签名。当前 `@farcaster/auth-client` 仅提供 `viem` 连接器类型。</p> <p>如需使用自定义 RPC，请将 RPC URL 传递给 viem 连接器。</p> | 是   |
| `relay`    | `string`            | 中继服务器 URL。默认为公共中继地址 `https://relay.farcaster.xyz`                                                                                                                          | 否   |
| `version`  | `string`            | Farcaster Auth 版本号。默认为 `"v1"`                                                                                                                                                      | 否   |
