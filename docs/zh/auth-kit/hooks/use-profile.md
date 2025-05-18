# `useProfile`

用于读取已认证用户信息的 Hook。

你可以使用此 Hook 从应用内的其他组件中读取已认证用户的个人资料信息。

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
          你好, {username}! 你的 fid 是: {fid}
        </p>
      ) : (
        <p>你尚未登录。</p>
      )}
    </div>
  );
}
```

## 返回值

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

| 参数                    | 描述                  |
| ----------------------- | --------------------- |
| `isAuthenticated`       | 用户登录时为 true。   |
| `profile.fid`           | 用户的 Farcaster ID。 |
| `profile.username`      | 用户名。              |
| `profile.bio`           | 用户简介文本。        |
| `profile.displayName`   | 用户显示名称。        |
| `profile.pfpUrl`        | 用户头像 URL。        |
| `profile.custody`       | 用户 FID 托管地址。   |
| `profile.verifications` | 用户已验证地址列表。  |
