# App Client

If you're building a [connected app](https://docs.farcaster.xyz/learn/what-is-farcaster/apps#connected-apps) and want users to sign in with Farcaster, use an `AppClient`.

You can use an `AppClient` to create a Farcaster Auth relay channel, generate a deep link to request a signature from the user's Farcaster wallet app, and verify the returned signature.

```ts
import { createAppClient, viem } from '@farcaster/auth';

const appClient = createAppClient({
  relay: 'https://relay.farcaster.xyz',
  ethereum: viem(),
});
```

## Parameters

| Parameter  | Type       | Description                                                                                                                                                                                                                                              | Required |
| ---------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `ethereum` | `Ethereum` | <p>An Ethereum connector, used to query the Farcaster contracts and verify smart contract wallet signatures. `@farcaster/auth` currently provides only the `viem` connector type.</p> <p>To use a custom RPC, pass an RPC URL to the viem connector.</p> | Yes      |
| `relay`    | `string`   | Relay server URL. Defaults to the public relay at `https://relay.farcaster.xyz`                                                                                                                                                                          | No       |
| `version`  | `string`   | Farcaster Auth version. Defaults to `"v1"`                                                                                                                                                                                                               | No       |
