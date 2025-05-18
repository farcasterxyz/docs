# `AuthKitProvider`

使用 Farcaster Auth 时，请将您的应用程序包裹在 `AuthKitProvider` 中。该提供者组件存储了关于您应用的配置信息，并使其可供 auth-kit 组件和钩子使用。

**注意：** 您必须创建一个 `AuthKitProvider` 才能使用 Farcaster Connect。别忘了在应用的顶层创建该组件。

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

| 属性     | 类型            | 必填 | 描述                               |
| -------- | --------------- | ---- | ---------------------------------- |
| `config` | `AuthKitConfig` | 否   | 配置对象。请参阅下方表格中的选项。 |

`config` 对象选项：

| 参数      | 类型     | 必填 | 描述                          | 默认值                        |
| --------- | -------- | ---- | ----------------------------- | ----------------------------- |
| `domain`  | `string` | 否   | 您的应用程序域名。            | `window.location.host`        |
| `siweUri` | `string` | 否   | 您的应用程序登录 URL。        | `window.location.href`        |
| `relay`   | `string` | 否   | Farcaster Auth 中继服务器 URL | `https://relay.farcaster.xyz` |
| `rpcUrl`  | `string` | 否   | Optimism RPC 服务器 URL       | `https://mainnet.optimism.io` |
| `version` | `string` | 否   | Farcaster Auth 版本           | `v1`                          |
