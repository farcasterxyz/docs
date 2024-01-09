# `useSignIn`

Hook for signing in a user. Connects to the relay server, generates a QR code and sign in link to present to the user, and polls the relay server for the user's Farcaster wallet signature.

If you want to build your own sign in component with custom UI, use the `useSignIn` hook.

```tsx
import { useSignIn } from "@farcaster/connect-kit";

function App() {
  const {
    signIn,
    qrCodeUri,
    data: { username },
    onSuccess: ({ fid }) => console.log("Your fid:", fid);
  } = useSignIn();

  return (
    <div>
      <button onClick={signIn}>Sign In</button>
      {qrCodeUri && (
        <span>
          Scan this: <img src={qrCodeUri} />
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
| `onSuccess`        | `function` | Callback invoked when sign in is complete and the user is authenticated.            | None                  |
| `onStatusResponse` | `function` | Callback invoked when the component receives a status update from the relay server. | None                  |
| `onError`          | `function` | Error callback function.                                                            | None                  |

## Returns

```ts
  {
    signIn: () => void;
    reconnect: () => void;
    isSuccess: boolean;
    isPolling: boolean;
    isError: boolean;
    error: ConnectError;
    channelToken: string;
    connectUri: string;
    qrCodeUri: string;
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
    },
    validSignature: boolean;
  };
```

| Parameter          | Description                                                                                                                        |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `signIn`           | Call this function to connect to the relay and begin polling for a signature.                                                      |
| `reconnect`        | Reconnect to the relay and try again. Call this in the event of an error.                                                          |
| `isSuccess`        | True when the relay server returns a valid signature.                                                                              |
| `isPolling`        | True when the relay state is `"pending"` and the app is polling the relay server for a response.                                   |
| `isError`          | True when an error has occurred.                                                                                                   |
| `error`            | `ConnectError` instance.                                                                                                           |
| `channelToken`     | Connect relay channel token.                                                                                                       |
| `connectUri`       | Sign in With Farcaster URL to present to the user. Links to Warpcast in v1.                                                        |
| `qrcodeUri`        | QR code image data URL encoding `connectUri`.                                                                                      |
| `data.state`       | Status of the sign in request, either `"pending"` or `"complete"`                                                                  |
| `data.nonce`       | Random nonce used in the SIWE message. If you don't provide a custom nonce as an argument to the hook, you should read this value. |
| `data.message`     | The generated SIWE message.                                                                                                        |
| `data.signature`   | Hex signature produced by the user's Warpcast wallet.                                                                              |
| `data.fid`         | User's Farcaster ID.                                                                                                               |
| `data.username`    | User's Farcaster username.                                                                                                         |
| `data.bio`         | User's Farcaster bio.                                                                                                              |
| `data.displayName` | User's Farcaster display name.                                                                                                     |
| `data.pfpUrl`      | User's Farcaster profile picture URL.                                                                                              |
| `validSignature`   | True when the signature returned by the relay server is valid.                                                                     |
