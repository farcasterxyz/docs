# Auth client

The `@farcaster/auth-client` library provides a framework agnostic client for Farcaster Auth. If you're not using React, want greater customizability, or want to interact with the Farcaster Auth relay directly, you can use the Auth client library to build your own Sign in With Farcaster flow.

## Getting Started

### Installation

Install the Auth client and its peer dependency [viem](https://viem.sh/).

```sh
npm install @farcaster/auth-client viem
```

**Note:** This is a low level client library. If you're using React, take a look at [auth-kit](../introduction) instead.

### Create a client

Set up a client with a relay server URL and Ethereum connector.

```tsx
import { createAppClient, viemConnector } from '@farcaster/auth-client';

const appClient = createAppClient({
  relay: 'https://relay.farcaster.xyz',
  ethereum: viemConnector(),
});
```

Depending on the type of app you're building, you may use an `AppClient` or a `WalletClient`. If you're building a connected app and logging in users, use an _app client_. If you're building a Farcaster wallet app, use a _wallet client_.

### Consume actions

Now that your client is set up, you can use it to interact with Farcaster Auth actions.

```tsx
const { data: { channelToken } } = await appClient.createChannel({
    siweUri: "https://example.com/login",
    domain: "example.com";
});

const status = await appClient.watchStatus({
    channelToken,
});
```
