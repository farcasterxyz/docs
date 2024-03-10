# `AuthKitProvider`

Wrap your application in an `AuthKitProvider` to use Farcaster Auth. This provider component stores configuration information about your app and makes it available to auth-kit components and hooks.

**Note:** You must create an `AuthKitProvider` to use Farcaster Connect. Don't forget to create one at the top level of your application.

```tsx
const config = {
  domain: 'example.com',
  siweUri: 'https://example.com/login',
  rpcUrl: process.env.OP_MAINNET_RPC_URL,
  relay: 'https://relay.farcaster.xyz',
};

const App = () => {
  return (
    <AuthKitProvider config={config}>
      {/*   Your App   */}
    </AuthKitProvider>
  );
};
```

# Props

| Prop     | Type            | Required | Description                                           |
| -------- | --------------- | -------- | ----------------------------------------------------- |
| `config` | `AuthKitConfig` | No       | Configuration object. See options in the table below. |

`config` object options:

| Parameter | Type     | Required | Description                        | Default                       |
| --------- | -------- | -------- | ---------------------------------- | ----------------------------- |
| `domain`  | `string` | No       | The domain of your application.    | `window.location.host`        |
| `siweUri` | `string` | No       | The login URL of your application. | `window.location.href`        |
| `relay`   | `string` | No       | Farcaster Auth relay server URL    | `https://relay.farcaster.xyz` |
| `rpcUrl`  | `string` | No       | Optimism RPC server URL            | `https://mainnet.optimism.io` |
| `version` | `string` | No       | Farcaster Auth version             | `v1`                          |
