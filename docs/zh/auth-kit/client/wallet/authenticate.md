# `authenticate`（认证）

提交一个“使用 Farcaster 登录”消息、用户签名及个人资料数据至 Connect 中继服务器。

```ts
const params = await walletClient.authenticate({
  message: 'example.com 希望您使用以太坊账户登录…',
  signature: '0x9335c3055d47780411a3fdabad293c68c84ea350a11794cdc811fd5…',
  fid: 1,
  username: 'alice',
  bio: '我是一个没有填写个人简介的小茶壶',
  displayName: '爱丽丝茶壶',
  pfpUrl: 'https://images.example.com/profile.png',
});
```

## 参数

| 参数           | 类型     | 描述                                                                                | 必填 |
| -------------- | -------- | ----------------------------------------------------------------------------------- | ---- |
| `authKey`      | `string` | Farcaster 认证 API 密钥。Farcaster 认证 v1 限制仅 Warpcast 可调用 `/authenticate`。 | 是   |
| `channelToken` | `string` | Farcaster 认证频道令牌。                                                            | 是   |
| `message`      | `string` | 由您的钱包应用生成并由用户签名的“使用 Farcaster 登录”消息。                         | 是   |
| `signature`    | `Hex`    | 由钱包用户账户创建的 SIWE 签名。                                                    | 是   |
| `fid`          | `number` | 钱包用户的 fid。                                                                    | 是   |
| `username`     | `string` | 钱包用户的 Farcaster 用户名。                                                       | 是   |
| `bio`          | `string` | 钱包用户的个人简介。                                                                | 是   |
| `displayName`  | `string` | 钱包用户的显示名称。                                                                | 是   |
| `pfpUrl`       | `string` | 钱包用户的个人资料照片 URL。                                                        | 是   |

## 返回值

```ts
{
  response: Response
  data: {
      state: 'completed'
      nonce: string
      message?: string
      signature?: `Hex`
      fid?: number
      username?: string
      bio?: string
      displayName?: string
      pfpUrl?: string
  }
  isError: boolean
  error: Error
}
```

| 参数               | 描述                                                              |
| ------------------ | ----------------------------------------------------------------- |
| `response`         | 来自 Connect 中继服务器的 HTTP 响应。                             |
| `data.state`       | 登录请求的状态，为 `"pending"`（待处理）或 `"complete"`（完成）。 |
| `data.nonce`       | 用于 SIWE 消息的随机数。                                          |
| `data.message`     | 生成的 SIWE 消息。                                                |
| `data.signature`   | 由用户的 Warpcast 钱包生成的十六进制签名。                        |
| `data.fid`         | 用户的 Farcaster ID。                                             |
| `data.username`    | 用户的 Farcaster 用户名。                                         |
| `data.bio`         | 用户的 Farcaster 个人简介。                                       |
| `data.displayName` | 用户的 Farcaster 显示名称。                                       |
| `data.pfpUrl`      | 用户的 Farcaster 个人资料照片 URL。                               |
| `isError`          | 当发生错误时为 true。                                             |
| `error`            | `Error` 实例。                                                    |
