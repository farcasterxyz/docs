# Installation

Install auth-kit and its peer dependency [viem](https://viem.sh/).

```sh
npm install @farcaster/auth-kit viem
```

**Note:** auth-kit is a [React](https://react.dev/) library. If you're using a different framework, take a look at the [client library](./client/introduction.md) instead.

### 1. Import the libraries

Import auth-kit and CSS styles.

```tsx
import '@farcaster/auth-kit/styles.css';
import { AuthKitProvider } from '@farcaster/auth-kit';
import { SignInButton } from '@farcaster/auth-kit';
```

### 2. Configure your provider

Configure a provider with an Optimism RPC URL, your app's domain and login URL, and wrap your application in it.

```tsx
const config = {
  rpcUrl: 'https://mainnet.optimism.io',
  domain: 'example.com',
  siweUri: 'https://example.com/login',
};

const App = () => {
  return (
    <AuthKitProvider config={config}>{/*   Your App   */}</AuthKitProvider>
  );
};
```

### 3. Add a connect button

Render the `SignInButton` component. When the user clicks this button, they will be prompted to complete sign in using their Farcaster wallet application.

```tsx
export const Login = () => {
  return <SignInButton />;
};
```

### 4. Read user profile

Optionally, fetch details about the logged in user anywhere in your app with `useProfile`.

```tsx
import { useProfile } from '@farcaster/auth-kit';

export const UserProfile = () => {
  const {
    isAuthenticated,
    profile: { username, fid },
  } = useProfile();
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
