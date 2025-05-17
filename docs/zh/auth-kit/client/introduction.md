# 认证客户端

[![NPM 版本](https://img.shields.io/npm/v/@farcaster/auth-client)](https://www.npmjs.com/package/@farcaster/auth-client)

`@farcaster/auth-client` 库提供了一个与框架无关的 Farcaster 认证客户端。如果您不使用 React、需要更高的自定义性，或希望直接与 Farcaster 认证中继交互，可以使用此认证客户端库构建自己的「使用 Farcaster 登录」流程。

## 快速开始

### 安装

安装认证客户端及其对等依赖 [viem](https://viem.sh/)。

```sh
npm install @farcaster/auth-client viem
```

**注意：** 这是一个底层客户端库。如果您使用 React，请查看 [auth-kit](../) 替代方案。

### 创建客户端

通过中继服务器 URL 和以太坊连接器设置客户端。

```tsx
import { createAppClient, viemConnector } from '@farcaster/auth-client';

const appClient = createAppClient({
  relay: 'https://relay.farcaster.xyz',
  ethereum: viemConnector(),
});
```

根据您构建的应用类型，可以使用 `AppClient` 或 `WalletClient`。如果构建的是连接应用并需要用户登录，请使用**应用客户端**；如果构建的是 Farcaster 钱包应用，请使用**钱包客户端**。

### 执行操作

客户端设置完成后，即可通过它来执行 Farcaster 认证相关操作。

```tsx
const { data: { channelToken } } = await appClient.createChannel({
    siweUri: "https://example.com/login",
    domain: "example.com";
});

const status = await appClient.watchStatus({
    channelToken,
});
```
