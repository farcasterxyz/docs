# `buildSignInMessage`

构建一个"使用 Farcaster 登录"消息，供最终用户签名。

该方法会为所有提供的参数添加必要的"使用 Farcaster 登录"消息属性。这些参数大多应从提供的协议 URI 中解析获取。钱包应用必须提供用户的托管地址和 fid。

返回一个 `SiweMessage` 对象及消息字符串。

```ts
const { siweMessage, message } = walletClient.buildSignInMessage({
  address: '0x63C378DDC446DFf1d831B9B96F7d338FE6bd4231',
  fid: 1,
  uri: 'https://example.com/login',
  domain: 'example.com',
  nonce: 'ESsxs6MaFio7OvqWb',
});
```

## 参数

| 参数名           | 类型     | 描述                                                                                                                       | 必填 |
| ---------------- | -------- | -------------------------------------------------------------------------------------------------------------------------- | ---- |
| `address`        | `Hex`    | 钱包用户的托管地址。该地址必须与签署生成的"使用 Farcaster 登录"消息的账户一致。钱包应用应提供已认证用户的托管地址。        | 是   |
| `fid`            | `string` | 钱包用户的 fid。钱包应用应提供已认证用户的 fid。                                                                           | 是   |
| `uri`            | `string` | 依赖连接的应用程序的登录 URL。从提供的"使用 Farcaster 登录" URI 中解析此参数。                                             | 是   |
| `domain`         | `string` | 依赖连接的应用程序的域名。从提供的"使用 Farcaster 登录" URI 中解析此参数。                                                 | 是   |
| `nonce`          | `string` | 包含在"使用 Farcaster 登录"消息中的随机数。必须至少包含 8 个字母数字字符。从提供的"使用 Farcaster 登录" URI 中解析此参数。 | 是   |
| `notBefore`      | `string` | SIWE 签名生效的开始时间。ISO 8601 格式的日期时间。从提供的"使用 Farcaster 登录" URI 中解析此参数。                         | 否   |
| `expirationTime` | `string` | SIWE 签名失效的过期时间。ISO 8601 格式的日期时间。从提供的"使用 Farcaster 登录" URI 中解析此参数。                         | 否   |
| `requestId`      | `string` | 依赖应用提供的系统特定 ID。从提供的"使用 Farcaster 登录" URI 中解析此参数。                                                | 否   |

## 返回值

```ts
{
  siweMessage: SiweMessage;
  message: string;
  isError: boolean;
  error: Error;
}
```

| 参数名        | 描述                                     |
| ------------- | ---------------------------------------- |
| `siweMessage` | 构建完成的"使用 Ethereum 登录"消息对象。 |
| `message`     | 序列化为字符串的 SIWE 消息。             |
| `isError`     | 当发生错误时为 true。                    |
| `error`       | `Error` 实例。                           |
