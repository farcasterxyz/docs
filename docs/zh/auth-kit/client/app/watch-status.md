# `watchStatus`

轮询 Farcaster Auth 请求的当前状态。

当状态变为 `'complete'` 时，该操作将返回最终的通道值，包括 "Sign In With Farcaster" 消息、签名和用户资料信息。

```ts
const status = await appClient.watchStatus({
  channelToken: '210f1718-427e-46a4-99e3-2207f21f83ec',
  timeout: 60_000,
  interval: 1_000,
  onResponse: ({ response, data }) => {
    console.log('Response code:', response.status);
    console.log('Status data:', data);
  },
});
```

## 参数

| 参数           | 类型       | 描述                                                                                       | 必填 | 示例                                   |
| -------------- | ---------- | ------------------------------------------------------------------------------------------ | ---- | -------------------------------------- |
| `channelToken` | `string`   | Farcaster Auth 通道令牌。                                                                  | 是   | `8d0494d9-e0cf-402b-ab0a-394ac7fe07a0` |
| `timeout`      | `number`   | 轮询超时时间（毫秒）。如果在超时前连接请求未完成，`watchStatus` 将返回错误。               | 否   | `300_000`                              |
| `interval`     | `number`   | 轮询间隔时间（毫秒）。客户端将按此频率检查更新。                                           | 否   | `1_000`                                |
| `onResponse`   | `function` | 每次客户端轮询更新并从转发服务器收到响应时调用的回调函数。接收最新 `status` 请求的返回值。 | 否   | `({ data }) => console.log(data.fid)`  |

## 返回值

```ts
{
    response: Response
    data: {
        state: 'pending' | 'completed'
        nonce: string
        message?: string
        signature?: Hex
        fid?: number
        username?: string
        bio?: string
        displayName?: string
        pfpUrl?: string
        custody?: Hex;
        verifications?: Hex[];
    }
    isError: boolean
    error: Error
}
```

| 参数                 | 描述                                                                  |
| -------------------- | --------------------------------------------------------------------- |
| `response`           | 来自 Connect 转发服务器的 HTTP 响应。                                 |
| `data.state`         | 登录请求的状态，`"pending"`（待处理）或 `"complete"`（已完成）。      |
| `data.nonce`         | SIWE 消息中使用的随机数。如果未向钩子提供自定义随机数，则应读取此值。 |
| `data.message`       | 生成的 SIWE 消息。                                                    |
| `data.signature`     | 用户 Warpcast 钱包生成的十六进制签名。                                |
| `data.fid`           | 用户的 Farcaster ID。                                                 |
| `data.username`      | 用户的 Farcaster 用户名。                                             |
| `data.bio`           | 用户的 Farcaster 个人简介。                                           |
| `data.displayName`   | 用户的 Farcaster 显示名称。                                           |
| `data.pfpUrl`        | 用户的 Farcaster 头像 URL。                                           |
| `data.custody`       | 用户的 FID 托管地址。                                                 |
| `data.verifications` | 用户已验证地址的列表。                                                |
| `isError`            | 发生错误时为 true。                                                   |
| `error`              | `Error` 实例。                                                        |
