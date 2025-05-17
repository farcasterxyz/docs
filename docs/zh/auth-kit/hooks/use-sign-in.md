# `useSignIn`

用于用户登录的 Hook。该 Hook 会连接中继服务器，生成供用户扫描的登录链接，并轮询中继服务器以获取用户的 Farcaster 钱包签名。

如需构建自定义 UI 的登录组件，可使用 `useSignIn` Hook。

```tsx
import { useSignIn, QRCode } from '@farcaster/auth-kit';

function App() {
  const {
    signIn,
    url,
    data: { username },
  } = useSignIn({
    onSuccess: ({ fid }) => console.log('您的 fid:', fid),
  });

  return (
    <div>
      <button onClick={signIn}>登录</button>
      {url && (
        <span>
          请扫描: <QRCode uri={url} />
        </span>
      )}
      {username && `你好，${username}!`}
    </div>
  );
}
```

## 参数

| 参数               | 类型       | 说明                                               | 默认值             |
| ------------------ | ---------- | -------------------------------------------------- | ------------------ |
| `timeout`          | `number`   | 轮询超时时长，超时后将返回错误                     | `300_000` (5 分钟) |
| `interval`         | `number`   | 轮询中继服务器更新状态的间隔时间                   | `1500` (1.5 秒)    |
| `nonce`            | `string`   | 包含在 "Sign In With Farcaster" 消息中的随机 nonce | 无                 |
| `notBefore`        | `string`   | SIWF 消息生效时间（ISO 8601 日期时间字符串）       | 无                 |
| `expirationTime`   | `string`   | SIWF 消息过期时间（ISO 8601 日期时间字符串）       | 无                 |
| `requestId`        | `string`   | 可选的系统特定 ID，将包含在 SIWF 消息中            | 无                 |
| `onSuccess`        | `function` | 登录完成且用户通过认证时触发的回调函数             | 无                 |
| `onStatusResponse` | `function` | 组件收到中继服务器状态更新时触发的回调函数         | 无                 |
| `onError`          | `function` | 错误回调函数                                       | 无                 |

## 返回值

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

| 参数                 | 说明                                                                      |
| -------------------- | ------------------------------------------------------------------------- |
| `signIn`             | 调用此函数（在 `connect` 之后）开始轮询签名                               |
| `signOut`            | 调用此函数可清除 AuthKit 状态并注销用户                                   |
| `connect`            | 连接认证中继并创建通道                                                    |
| `reconnect`          | 重新连接中继并重试。出现错误时可调用此函数                                |
| `isConnected`        | 如果 AuthKit 已连接至中继服务器且拥有活跃通道，则为 true                  |
| `isSuccess`          | 当中继服务器返回有效签名时为 true                                         |
| `isPolling`          | 当中继状态为 `"pending"` 且应用正在轮询中继服务器响应时为 true            |
| `isError`            | 发生错误时为 true                                                         |
| `error`              | `AuthClientError` 实例                                                    |
| `channelToken`       | 中继通道令牌                                                              |
| `url`                | 展示给用户的 "Sign in With Farcaster" URL（v1 版本会链接至 Warpcast）     |
| `appClient`          | 底层的 `AppClient` 实例                                                   |
| `data.state`         | 登录请求状态，值为 `"pending"` 或 `"complete"`                            |
| `data.nonce`         | SIWE 消息中使用的随机 nonce。如果未向 Hook 提供自定义 nonce，则应读取此值 |
| `data.message`       | 生成的 SIWE 消息                                                          |
| `data.signature`     | 用户 Warpcast 钱包生成的十六进制签名                                      |
| `data.fid`           | 用户的 Farcaster ID                                                       |
| `data.username`      | 用户的 Farcaster 用户名                                                   |
| `data.bio`           | 用户的 Farcaster 个人简介                                                 |
| `data.displayName`   | 用户的 Farcaster 显示名称                                                 |
| `data.pfpUrl`        | 用户的 Farcaster 头像 URL                                                 |
| `data.custody`       | 用户的 FID 托管地址                                                       |
| `data.verifications` | 用户已验证的地址列表                                                      |
| `validSignature`     | 当中继服务器返回的签名有效时为 true                                       |
