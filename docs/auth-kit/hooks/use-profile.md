# `useProfile`

Hook for reading information about the authenticated user.

You can use this hook to read the authenticated user's profile information from other components inside your app.

```tsx
import { useProfile } from '@farcaster/auth-kit';

function App() {
  const {
    isAuthenticated,
    profile: { username, fid, bio, displayName, pfpUrl },
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

## Returns

```ts
  {
    isAuthenticated: boolean;
    profile?: {
        fid?: number;
        username?: string;
        bio?: string;
        displayName?: string;
        pfpUrl?: string;
        custody?: Hex;
        verifications?: Hex[];
    },
  };
```

| Parameter               | Description                        |
| ----------------------- | ---------------------------------- |
| `isAuthenticated`       | True when the user is logged in.   |
| `profile.fid`           | User's Farcaster ID.               |
| `profile.username`      | User's username.                   |
| `profile.bio`           | User's bio text.                   |
| `profile.displayName`   | User's display name.               |
| `profile.pfpUrl`        | User's profile picture URL.        |
| `profile.custody`       | User's FID custody address.        |
| `profile.verifications` | List of user's verified addresses. |
