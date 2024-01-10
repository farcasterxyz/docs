# `ConnectKitProvider`

Wrap your application in a `ConnectKitProvider` to use Farcaster Connect. This provider component stores configuration information about your app and makes it available to ConnectKit components and hooks.

**Note:** You must create a `ConnectKitProvider` to use Farcaster Connect.

```tsx
const config = {
  domain: 'example.com',
  siweUri: 'https://example.com/login',
  rpcUrl: process.env.OP_MAINNET_RPC_URL,
  relay: 'https://relay.farcaster.xyz',
};

const App = () => {
  return (
    <ConnectKitProvider config={config}>
      {/*   Your App   */}
    </ConnectKitProvider>
  );
};
```

# Props

| Prop     | Type               | Required | Description                                           |
| -------- | ------------------ | -------- | ----------------------------------------------------- |
| `config` | `ConnectKitConfig` | Yes      | Configuration object. See options in the table below. |

`config` object options:

| Parameter | Type     | Required | Description                        | Default                       |
| --------- | -------- | -------- | ---------------------------------- | ----------------------------- |
| `domain`  | `string` | Yes      | The domain of your application.    | None                          |
| `siweUri` | `string` | Yes      | The login URL of your application. | None                          |
| `relay`   | `string` | No       | Farcaster Connect relay server URL | `https://relay.farcaster.xyz` |
| `rpcUrl`  | `string` | No       | Optimism RPC server URL            | `https://mainnet.optimism.io` |
| `version` | `string` | No       | Farcaster Connect version          | `v1`                          |
