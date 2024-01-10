# Auth client

The `@farcaster/auth` library provides a framework agnostic client for Farcaster Auth. If you're not using React, want greater customizability, or want to interact with the Connect relay directly, you can use the Auth client library to build your own Sign in With Farcaster flow.

## Getting Started

### Installation

Install the Auth client and its peer dependencies [viem](https://viem.sh/) and [ethers](https://docs.ethers.org/v6/).

```sh
npm install @farcaster/auth viem ethers
```

::: tip
Connect is a low level client library. If you're using React, take a look at [auth-kit](../introduction) instead.
:::

### Create a client

Set up a client with a Connect relay URL and Ethereum connector.

```tsx
import { createAppClient, viem } from '@farcaster/auth';

const appClient = createAppClient({
  relay: 'https://relay.farcaster.xyz',
  ethereum: viem(),
});
```

::: tip
Depending on the type of app you're building, you may use an `AppClient` or an `AuthClient`. If you're building a connected app and logging in users, use an _app client_. If you're building a Farcaster wallet app, use an _auth client_.
:::

### Consume actions

Now that your client is set up, you can use it to interact with Farcaster Auth actions.

```tsx
const { data: { channelToken } } = await appClient.connect({
    siweUri: "https://example.com/login",
    domain: "example.com";
});

const status = await appClient.watchStatus({
    channelToken,
});
```
