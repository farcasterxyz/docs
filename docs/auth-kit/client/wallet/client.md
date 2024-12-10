# Wallet Client

If you're building a [wallet app](https://docs.farcaster.xyz/learn/what-is-farcaster/apps#wallet-apps) and receiving signature requests, use a `WalletClient`.

You can use a `WalletClient` to parse an incoming Sign In With Farcaster request URL, build a Sign In With Farcaster message to present to the user, and submit the signed message to a Farcaster Auth relay channel.

```ts
import { createWalletClient, viemConnector } from '@farcaster/auth-client';

const walletClient = createWalletClient({
  relay: 'https://relay.farcaster.xyz',
  ethereum: viemConnector(),
});
```

## Parameters

| Parameter  | Type                | Description                                                                                                                                                                                                                                                     | Required |
| ---------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `ethereum` | `EthereumConnector` | <p>An Ethereum connector, used to query the Farcaster contracts and verify smart contract wallet signatures. `@farcaster/auth-client` currently provides only the `viem` connector type.</p> <p>To use a custom RPC, pass an RPC URL to the viem connector.</p> | Yes      |
| `relay`    | `string`            | Relay server URL. Defaults to the public relay at `https://relay.farcaster.xyz`                                                                                                                                                                                 | No       |
| `version`  | `string`            | Farcaster Auth version. Defaults to `"v1"`                                                                                                                                                                                                                      | No       |
