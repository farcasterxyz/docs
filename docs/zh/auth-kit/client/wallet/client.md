# 钱包客户端

如果您正在开发一个[钱包应用](https://docs.farcaster.xyz/learn/what-is-farcaster/apps#wallet-apps)并需要处理签名请求，可以使用`WalletClient`。

通过`WalletClient`，您可以解析收到的"使用 Farcaster 登录"请求 URL，构建"使用 Farcaster 登录"消息展示给用户，并将签名后的消息提交至 Farcaster 认证中继通道。

```ts
import { createWalletClient, viemConnector } from '@farcaster/auth-client';

const walletClient = createWalletClient({
  relay: 'https://relay.farcaster.xyz',
  ethereum: viemConnector(),
});
```

## 参数说明

| 参数       | 类型                | 描述                                                                                                                                                                                  | 必填 |
| ---------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| `ethereum` | `EthereumConnector` | <p>以太坊连接器，用于查询 Farcaster 合约并验证智能合约钱包签名。当前`@farcaster/auth-client`仅提供`viem`连接器类型。</p> <p>如需使用自定义 RPC，请将 RPC URL 传递给 viem 连接器。</p> | 是   |
| `relay`    | `string`            | 中继服务器 URL。默认为公共中继地址`https://relay.farcaster.xyz`                                                                                                                       | 否   |
| `version`  | `string`            | Farcaster 认证版本。默认为`"v1"`                                                                                                                                                      | 否   |
