# `ConnectButton`

The main component. Renders a "Sign in With Farcaster" button that prompts the user to scan a QR code with their phone in a web browser or redirects on a mobile device. You can use the `onSuccess` callback prop or the `useUserData` hook to access the user's authentication status and profile information.

**Note:** Make sure you've wrapped your application in a [`ConnectKitProvider`](./connect-kit-provider.md) to use the `ConnectButton` component.

```tsx
import { ConnectButton } from '@farcaster/connect-kit';

export const Login = () => {
  return (
    <ConnectButton
      onSuccess={({ fid, username }) =>
        console.log(`Hello, ${username}! Your fid is ${fid}.`)
      }
    />
  );
};
```

## Props

| Prop               | Type       | Description                                                                         | Default               |
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
| `debug`            | `boolean`  | Render a debug panel displaying internal ConnectKit state.                          | `false`               |

## Examples

### Custom nonce

```tsx
import { ConnectButton } from '@farcaster/connect-kit';

export const Login = ({ nonce }: { nonce: string }) => {
  return (
    <ConnectButton
      nonce={nonce}
      onSuccess={({ fid, username }) =>
        console.log(`Hello, ${username}! Your fid is ${fid}.`)
      }
    />
  );
};
```
