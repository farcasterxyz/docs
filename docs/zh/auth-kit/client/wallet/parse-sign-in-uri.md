# `parseSignInURI`

解析由已连接应用用户提供的"使用 Farcaster 登录" URI。

返回解析后的参数。您的应用应使用这些参数来构造"使用 Farcaster 登录"消息。

如果 URI 无效则返回错误。

```ts
const params = walletClient.parseSignInURI({
  uri: 'farcaster://connect?channelToken=76be6229-bdf7-4ad2-930a-540fb2de1e08&nonce=ESsxs6MaFio7OvqWb&siweUri=https%3A%2F%2Fexample.com%2Flogin&domain=example.com',
});
```

## 参数

| 参数  | 类型     | 描述                      | 必填 |
| ----- | -------- | ------------------------- | ---- |
| `uri` | `string` | "使用 Farcaster 登录" URI | 是   |

## 返回值

```ts
{
  channelToken: string
  params: {
    domain: string
    uri: string
    nonce: string
    notBefore?: string
    expirationTime?: string
    requestId?: string
  }
  isError: boolean
  error: Error
}
```

| 参数                    | 描述                         |
| ----------------------- | ---------------------------- |
| `channelToken`          | 连接中继通道令牌 UUID        |
| `params.uri`            | 依赖连接应用的登录 URI       |
| `params.domain`         | 依赖应用的域名               |
| `params.nonce`          | 依赖应用提供的随机数(nonce)  |
| `params.notBefore`      | 该消息生效的时间             |
| `params.expirationTime` | 该消息过期的时间             |
| `params.requestId`      | 依赖应用提供的系统特定标识符 |
| `isError`               | 当发生错误时为 true          |
| `error`                 | `Error` 实例                 |
