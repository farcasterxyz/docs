# `verifySignInMessage`

验证一个 "使用 Farcaster 登录" 的消息。您的应用应在通过 Connect 通道读取用户 Farcaster 钱包提供的消息和签名后调用此函数，并检查验证是否成功。

返回解析后的 "使用 Farcaster 登录" 消息、用户的 fid 以及验证是否成功。

```ts
const { data, success, fid } = await appClient.verifySignInMessage({
  nonce: 'abcd1234',
  domain: 'example.com',
  message: 'example.com wants you to sign in with your Ethereum account…',
  signature: '0x9335c3055d47780411a3fdabad293c68c84ea350a11794cd11fd51b…',
});
```

## 参数

| 参数        | 类型                      | 描述                                                                                                                            | 必填 |
| ----------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ---- |
| `domain`    | `string`                  | 您的应用程序域名。必须与提供的 SIWF 消息中的域名匹配。                                                                          | 是   |
| `nonce`     | `string`                  | 自定义随机数。必须与提供的 SIWF 消息中的随机数匹配。                                                                            | 是   |
| `message`   | `string` 或 `SiweMessage` | 要验证的 "使用 Farcaster 登录" 消息。可以是字符串或已解析的 `SiweMessage` 对象。您的应用应在请求完成后从 Connect 通道读取此值。 | 是   |
| `signature` | `Hex`                     | 用户 Farcaster 钱包提供的签名。您的应用应在请求完成后从 Connect 通道读取此值。                                                  | 是   |

## 返回值

```ts
{
    data: SiweMessage,
    success: boolean,
    fid: number
    isError: boolean
    error: Error
}
```

| 参数      | 描述                                          |
| --------- | --------------------------------------------- |
| `data`    | 解析后的 SIWF 消息，作为 `SiweMessage` 对象。 |
| `success` | 如果提供的签名有效则为 true。                 |
| `fid`     | 用户的 FID。                                  |
| `isError` | 当发生错误时为 true。                         |
| `error`   | `Error` 实例。                                |
