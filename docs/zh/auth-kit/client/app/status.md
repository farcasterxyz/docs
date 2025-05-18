# `status`

获取 Farcaster 认证请求的当前状态。

返回请求的当前状态：如果用户的 Farcaster 钱包应用尚未返回签名，则为 `'pending'`；一旦钱包应用返回响应，则为 `'completed'`。

在 `'completed'` 状态下，响应包含生成的 "Sign in With Farcaster" 消息、用户托管地址的签名、用户已验证的 fid 以及用户资料信息。

```ts
const status = await appClient.status({
  channelToken: '210f1718-427e-46a4-99e3-2207f21f83ec',
});
```

## 参数

| 参数           | 类型     | 描述                     | 必填 | 示例                                   |
| -------------- | -------- | ------------------------ | ---- | -------------------------------------- |
| `channelToken` | `string` | Farcaster 认证通道令牌。 | 是   | `8d0494d9-e0cf-402b-ab0a-394ac7fe07a0` |

## 返回值

```ts
{
    response: Response
    data: {
      state: "pending";
      nonce: string;
    } | {
      state: "completed";
      nonce: string;
      url: string;
      message: string;
      signature: `0x${string}`;
      fid: number;
      username?: string;
      bio?: string;
      displayName?: string;
      pfpUrl?: string;
      verifications?: Hex[];
      custody?: Hex;
    }
    isError: boolean
    error: Error
}
```

| 参数                 | 描述                                                                               |
| -------------------- | ---------------------------------------------------------------------------------- |
| `response`           | 来自 Connect 中继服务器的 HTTP 响应。                                              |
| `data.state`         | 登录请求的状态，`"pending"` 或 `"complete"` 之一                                   |
| `data.nonce`         | SIWE 消息中使用的随机 nonce。如果你没有向钩子提供自定义 nonce 参数，则应读取此值。 |
| `data.message`       | 生成的 SIWE 消息。                                                                 |
| `data.signature`     | 用户 Warpcast 钱包生成的十六进制签名。                                             |
| `data.fid`           | 用户的 Farcaster ID。                                                              |
| `data.username`      | 用户的 Farcaster 用户名。                                                          |
| `data.bio`           | 用户的 Farcaster 个人简介。                                                        |
| `data.displayName`   | 用户的 Farcaster 显示名称。                                                        |
| `data.pfpUrl`        | 用户的 Farcaster 头像 URL。                                                        |
| `data.custody`       | 用户的 FID 托管地址。                                                              |
| `data.verifications` | 用户已验证地址的列表。                                                             |
| `isError`            | 当发生错误时为 true。                                                              |
| `error`              | `Error` 实例。                                                                     |
