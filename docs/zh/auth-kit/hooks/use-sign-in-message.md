# `useSignInMessage`

用于读取用户认证所使用的"使用 Farcaster 登录"消息及签名的 Hook。

如需将消息和签名传递给后端 API，可以考虑使用此 Hook。

```tsx
import { useSignInMessage } from '@farcaster/auth-kit';

function App() {
  const { message, signature } = useSignInMessage();

  return (
    <div>
      <p>您签署的消息: {message}</p>
      <p>您的签名: {signature}</p>
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

| 参数        | 说明                                         |
| ----------- | -------------------------------------------- |
| `message`   | 用户签署的 SIWE (Sign-In with Ethereum) 消息 |
| `signature` | 用户 Farcaster 钱包生成的签名                |
