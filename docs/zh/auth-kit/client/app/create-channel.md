# `createChannel`

创建一个 Farcaster 认证中继通道。

返回一个标识通道的密钥令牌，以及一个可展示给终端用户作为链接或二维码的 URI。

```ts
const channel = await appClient.createChannel({
  siweUri: 'https://example.com/login',
  domain: 'example.com',
});
```

## 参数

| 参数             | 类型     | 描述                                          | 必填 | 示例                                   |
| ---------------- | -------- | --------------------------------------------- | ---- | -------------------------------------- |
| `siweUri`        | `string` | 应用程序的登录 URL。                          | 是   | `https://example.com/login`            |
| `domain`         | `string` | 应用程序的域名。                              | 是   | `example.com`                          |
| `nonce`          | `string` | 自定义随机数。必须至少包含 8 个字母数字字符。 | 否   | `ESsxs6MaFio7OvqWb`                    |
| `notBefore`      | `string` | 签名生效的开始时间。ISO 8601 格式的日期时间。 | 否   | `2023-12-20T23:21:24.917Z`             |
| `expirationTime` | `string` | 签名失效的过期时间。ISO 8601 格式的日期时间。 | 否   | `2023-12-20T23:21:24.917Z`             |
| `requestId`      | `string` | 应用程序可用于引用登录请求的系统特定 ID。     | 否   | `8d0494d9-e0cf-402b-ab0a-394ac7fe07a0` |

## 返回值

```ts
{
  response: Response;
  data: {
    channelToken: string;
    url: string;
    nonce: string;
  }
  isError: boolean;
  error: Error;
}
```

| 参数                | 描述                                                                          |
| ------------------- | ----------------------------------------------------------------------------- |
| `response`          | 来自 Connect 中继服务器的 HTTP 响应。                                         |
| `data.channelToken` | Connect 中继通道令牌 UUID。                                                   |
| `data.url`          | 展示给用户的 Sign in With Farcaster URL。在 v1 版本中链接到 Warpcast 客户端。 |
| `data.nonce`        | 包含在 Sign in With Farcaster 消息中的随机数。                                |
| `isError`           | 当发生错误时为 true。                                                         |
| `error`             | `Error` 实例。                                                                |
