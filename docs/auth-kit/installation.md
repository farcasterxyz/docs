# Installation

Install auth-kit and its peer dependencies [viem](https://viem.sh/) and [ethers](https://docs.ethers.org/v6/).

```sh
npm install @farcaster/auth-kit viem ethers
```

::: tip
auth-kit is a [React](https://react.dev/) library. If you're using a different framework, take a look at the [client library](./client/introduction.md) instead.
:::

### 1. Import the libraries

Import auth-kit and CSS styles.

```tsx
import '@farcaster/auth-kit/styles.css';
import { SignInProvider } from '@farcaster/auth-kit';
import { SignInButton } from '@farcaster/auth-kit';
```

### 2. Configure your provider

Configure a provider with an Optimism RPC URL, your app's domain and login URL and wrap your application in it.

```tsx
const config = {
  rpcUrl: 'https://mainnet.optimism.io',
  domain: 'example.com',
  siweUri: 'https://example.com/login',
};

const App = () => {
  return <SignInProvider config={config}>{/*   Your App   */}</SignInProvider>;
};
```

### 3. Add a connect button

Render the `SignInButton` component. When the user clicks this button, they will be prompted to complete sign in using their Farcaster wallet application.

```tsx
export const Login = () => {
  return <SignInButton />;
};
```

### 4. Read user details

Optionally, fetch details about the logged in user anywhere in your app with `useUserData`.

```tsx
import { useUserData } from '@farcaster/auth-kit';

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
