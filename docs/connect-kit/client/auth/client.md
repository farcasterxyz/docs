# Auth Client

If you're building a [wallet app](https://docs.farcaster.xyz/learn/what-is-farcaster/apps#wallet-apps) and receiving signature requests, use an `AuthClient`.

You can use an `AuthClient` to parse an incoming Sign In With Farcaster request URL, build a Sign In With Farcaster message to present to the user, and submit the signed message to a Farcaster Connect relay channel.

```ts
import { createAuthClient, viem } from '@farcaster/connect';

const authClient = createAuthClient({
  relay: 'https://relay.farcaster.xyz',
  ethereum: viem(),
});
```

## Parameters

| Parameter  | Type       | Description                                                                                                                                                                                                                                                 | Required |
| ---------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `ethereum` | `Ethereum` | <p>An Ethereum connector, used to query the Farcaster contracts and verify smart contract wallet signatures. `@farcaster/connect` currently provides only the `viem` connector type.</p> <p>To use a custom RPC, pass an RPC URL to the viem connector.</p> | Yes      |
| `relay`    | `string`   | Relay server URL. Defaults to the public relay at `https://relay.farcaster.xyz`                                                                                                                                                                             | No       |
| `version`  | `string`   | Farcaster Connect version. Defaults to `"v1"`                                                                                                                                                                                                               | No       |
