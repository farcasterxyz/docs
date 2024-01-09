# Installation

Install ConnectKit and its peer dependencies [viem](https://viem.sh/) and [ethers](https://docs.ethers.org/v6/).

```sh
npm install @farcaster/connect-kit viem ethers
```

::: tip
ConnectKit is a [React](https://react.dev/) library. If you're using a different framework, take a look at the [client library](./client) instead.
:::

### Import

Import ConnectKit and CSS styles.

```tsx
import '@farcaster/connect-kit/styles.css';
import { ConnectKitProvider } from '@farcaster/connect-kit';
```

### Configure

Create a ConnectKit configuration. Provide an Optimism RPC URL, the domain of your application, and your app's login URL.

```tsx
const config = {
  rpcUrl: 'https://mainnet.optimism.io',
  domain: 'example.com',
  siweUri: 'https://example.com/login',
};
```

### Add Provider

Wrap your application in a `ConnectKitProvider`.

```tsx
const App = () => {
  return (
    <ConnectKitProvider config={config}>
      {/*   Your App   */}
    </ConnectKitProvider>
  );
};
```

## Add the connect button

In your app, import and render the `ConnectButton` component.

```tsx
import { ConnectButton } from '@farcaster/connect-kit';

export const Login = () => {
  return <ConnectButton />;
};
```

When the user clicks this button, they will be prompted to complete sign in using their Farcaster wallet application.

## Read information about the user

Use a hook to access the access the logged in user's status and Farcaster profile information.

```tsx
import { useUserData } from '@farcaster/connect-kit';

export const UserProfile = () => {
  const {
    isAuthenticated,
    userData: { username, fid },
  } = useUserData();
  return (
    <div>
      {isAuthenticated ? (
        <p>
          Hello, {username}! Your fid is: {fid}
        </p>
      ) : (
        <p>You're not signed in.</p>
      )}
    </div>
  );
};
```

## Further examples

You can find more official examples [here](https://github.com/farcasterxyz/connect-monorepo/tree/main/examples).
