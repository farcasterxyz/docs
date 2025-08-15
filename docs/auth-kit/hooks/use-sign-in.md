# `useSignIn`

Hook for signing in a user. Connects to the relay server, generates a sign-in link to present to the user, and polls the relay server for the user's Farcaster wallet signature.

If you want to build your own sign-in component with a custom UI, use the `useSignIn` hook.

```tsx
import { useSignIn, QRCode } from '@farcaster/auth-kit';

function App() {
  const {
    signIn,
    url,
    data: { username },
  } = useSignIn({
    onSuccess: ({ fid }) => console.log('Your fid:', fid),
  });

  return (
    <div>
      <button onClick={signIn}>Sign In</button>
      {url && (
        <span>
          Scan this: <QRCode uri={url} />
        </span>
      )}
      {username && `Hello, ${username}!`}
    </div>
  );
}
```

## Parameters

| Parameter          | Type       | Description                                                                         | Default               |
| ------------------ | ---------- | ----------------------------------------------------------------------------------- | --------------------- |
| `timeout`          | `number`   | Return an error after polling for this long.                                        | `300_000` (5 minutes) |
| `interval`         | `number`   | Poll the relay server for updates at this interval.                                 | `1500` (1.5 seconds)  |
| `nonce`            | `string`   | A random nonce to include in the Sign In With Farcaster message.                    | None                  |
| `notBefore`        | `string`   | Time when the SIWF message becomes valid. ISO 8601 datetime string.                 | None                  |
| `expirationTime`   | `string`   | Time when the SIWF message expires. ISO 8601 datetime string.                       | None                  |
| `requestId`        | `string`   | An optional system-specific ID to include in the SIWF message.                      | None                  |
| `onSuccess`        | `function` | Callback invoked when sign-in is complete and the user is authenticated.            | None                  |
| `onStatusResponse` | `function` | Callback invoked when the component receives a status update from the relay server. | None                  |
| `onError`          | `function` | Error callback function.                                                            | None                  |

## Returns

```ts
  {
    signIn: () => void;
    signOut: () => void;
    connect: () => void;
    reconnect: () => void;
    isConnected: boolean;
    isSuccess: boolean;
    isPolling: boolean;
    isError: boolean;
    error: AuthClientError;
    channelToken: string;
    url: string;
    appClient: AppClient;
    data: {
        state: "pending" | "complete";
        nonce: string;
        message: string;
        signature: Hex;
        fid: number;
        username: string;
        bio: string;
        displayName: string;
        pfpUrl: string;
        custody?: Hex;
        verifications?: Hex[];
    },
    validSignature: boolean;
  };
```

| Parameter            | Description                                                                                                                        |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `signIn`             | Call this function following `connect` to begin polling for a signature.                                                           |
| `signOut`            | Call this function to clear the AuthKit state and sign out the user.                                                               |
| `connect`            | Connect to the auth relay and create a channel.                                                                                    |
| `reconnect`          | Reconnect to the relay and try again. Call this in the event of an error.                                                          |
| `isConnected`        | True if AuthKit is connected to the relay server and has an active channel.                                                        |
| `isSuccess`          | True when the relay server returns a valid signature.                                                                              |
| `isPolling`          | True when the relay state is `"pending"` and the app is polling the relay server for a response.                                   |
| `isError`            | True when an error has occurred.                                                                                                   |
| `error`              | `AuthClientError` instance.                                                                                                        |
| `channelToken`       | Connect relay channel token.                                                                                                       |
| `url`                | Sign in With Farcaster URL to present to the user. Links to the Farcaster client in v1.                                            |
| `appClient`          | Underlying `AppClient` instance.                                                                                                   |
| `data.state`         | Status of the sign in request, either `"pending"` or `"complete"`                                                                  |
| `data.nonce`         | Random nonce used in the SIWE message. If you don't provide a custom nonce as an argument to the hook, you should read this value. |
| `data.message`       | The generated SIWE message.                                                                                                        |
| `data.signature`     | Hex signature produced by the user's Farcaster client app wallet.                                                                  |
| `data.fid`           | User's Farcaster ID.                                                                                                               |
| `data.username`      | User's Farcaster username.                                                                                                         |
| `data.bio`           | User's Farcaster bio.                                                                                                              |
| `data.displayName`   | User's Farcaster display name.                                                                                                     |
| `data.pfpUrl`        | User's Farcaster profile picture URL.                                                                                              |
| `data.custody`       | User's FID custody address.                                                                                                        |
| `data.verifications` | List of user's verified addresses.                                                                                                 |
| `validSignature`     | True when the signature returned by the relay server is valid.                                                                     |
