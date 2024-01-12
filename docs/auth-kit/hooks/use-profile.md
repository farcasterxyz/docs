# `useProfile`

Hook for reading information about the authenticated user.

You can use this hook to read the authenticated user's profile information from other components inside your app.

```tsx
import { useProfile } from '@farcaster/auth-kit';

function App {
  const {
    isAuthenticated,
    userData: { username, fid, bio, displayName, pfpUrl },
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
    userData?: {
        fid?: number;
        username?: string;
        bio?: string;
        displayName?: string;
        pfpUrl?: string;
    },
  };
```

| Parameter              | Description                      |
| ---------------------- | -------------------------------- |
| `isAuthenticated`      | True when the user is logged in. |
| `userData.fid`         | User's Farcaster ID.             |
| `userData.username`    | User's username.                 |
| `userData.bio`         | User's bio text.                 |
| `userData.displayName` | User's display name.             |
| `userData.pfpUrl`      | User's profile picture URL.      |
