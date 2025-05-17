# `AuthKitProvider`

将您的应用包裹在 `AuthKitProvider` 中即可使用 Farcaster 认证功能。该 Provider 组件会存储应用的配置信息，并使其对所有 auth-kit 组件和钩子可用。

**注意：** 使用 Farcaster Connect 必须创建 `AuthKitProvider`。请确保在应用顶层创建该组件。

```tsx
const config = {
  domain: 'example.com',
  siweUri: 'https://example.com/login',
  rpcUrl: process.env.OP_MAINNET_RPC_URL,
  relay: 'https://relay.farcaster.xyz',
};

const App = () => {
  return (
    <AuthKitProvider config={config}>{/*   您的应用   */}</AuthKitProvider>
  );
};
```

# 属性

| 属性     | 类型            | 必填 | 描述                             |
| -------- | --------------- | ---- | -------------------------------- |
| `config` | `AuthKitConfig` | 否   | 配置对象。具体选项参见下方表格。 |

`config` 对象选项：

| 参数      | 类型     | 必填 | 描述                         | 默认值                        |
| --------- | -------- | ---- | ---------------------------- | ----------------------------- |
| `domain`  | `string` | 否   | 应用域名                     | `window.location.host`        |
| `siweUri` | `string` | 否   | 应用登录地址                 | `window.location.href`        |
| `relay`   | `string` | 否   | Farcaster 认证中继服务器地址 | `https://relay.farcaster.xyz` |
| `rpcUrl`  | `string` | 否   | Optimism RPC 服务器地址      | `https://mainnet.optimism.io` |
| `version` | `string` | 否   | Farcaster 认证版本           | `v1`                          |
