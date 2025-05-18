# `useSignInMessage`

用于读取用户认证时使用的"使用 Farcaster 登录"消息及签名的 Hook。

如果你需要将消息和签名传递给后端 API，可以考虑使用此 Hook。

```tsx
import { useSignInMessage } from '@farcaster/auth-kit';

function App() {
  const { message, signature } = useSignInMessage();

  return (
    <div>
      <p>你签名的消息: {message}</p>
      <p>你的签名: {signature}</p>
    </div>
  );
}
```

## 返回值

```ts
{
  message: string;
  signature: Hex;
}
```

| 参数        | 说明                            |
| ----------- | ------------------------------- |
| `message`   | 用户签名的 SIWE 消息            |
| `signature` | 由用户 Farcaster 钱包生成的签名 |
