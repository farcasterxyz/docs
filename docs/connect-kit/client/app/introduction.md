# App Client

You can use an `AppClient` to create a Farcaster Connect relay channel, generate a deep link to request a signature from the user's Farcaster wallet app, and verify the returned signature.

```ts
import { createAppClient, viem } from '@farcaster/connect';

const appClient = createAppClient({
  relay: 'https://relay.farcaster.xyz',
  ethereum: viem(),
});
```

## Parameters

| Parameter  | Type       | Description                                                                                                                                                                                     | Required |
| ---------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `ethereum` | `Ethereum` | <p>An Ethereum connector, used to query the Farcaster contracts and verify smart contract wallet signatures.</p> <p>`@farcaster/connect` currently provides only the `viem` connector type.</p> | Yes      |
| `relay`    | `string`   | Relay server URL. Defaults to the public relay at `https://relay.farcaster.xyz`                                                                                                                 | No       |
| `version`  | `string`   | Farcaster Connect version. Defaults to `"v1"`                                                                                                                                                   | No       |
