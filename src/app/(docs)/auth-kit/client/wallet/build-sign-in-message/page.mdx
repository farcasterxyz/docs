# `buildSignInMessage`

Build a Sign In With Farcaster message to present to the end user for signing.

Adds required Sign In With Farcaster message attributes to any provided parameters. You should parse most of these parameters from a provided protocol URI. Your wallet app must provide the user's custody address and fid.

Returns a `SiweMessage` object and the message as a string.

```ts
const { siweMessage, message } = walletClient.buildSignInMessage({
  address: '0x63C378DDC446DFf1d831B9B96F7d338FE6bd4231',
  fid: 1,
  uri: 'https://example.com/login',
  domain: 'example.com',
  nonce: 'ESsxs6MaFio7OvqWb',
});
```

## Parameters

| Parameter        | Type     | Description                                                                                                                                                                                                 | Required |
| ---------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `address`        | `Hex`    | Wallet user's custody address. This address must be the same account that signs the generated Sign In With Farcaster message. Your wallet app should provide the custody address of the authenticated user. | Yes      |
| `fid`            | `string` | Wallet user's fid. Your wallet app should provide the fid of the authenticated user.                                                                                                                        | Yes      |
| `uri`            | `string` | Login URL of the relying connected app. Parse this from the provided Sign In With Farcaster URI.                                                                                                            | Yes      |
| `domain`         | `string` | Domain of the relying connected app. Parse this from the provided Sign In With Farcaster URI.                                                                                                               | Yes      |
| `nonce`          | `string` | Random nonce to include in the Sign In With Farcaster message. Must be at least 8 alphanumeric characters. Parse this from the provided Sign In With Farcaster URI.                                         | Yes      |
| `notBefore`      | `string` | Start time at which the SIWE signature becomes valid. ISO 8601 datetime. Parse this from the provided Sign In With Farcaster URI.                                                                           | No       |
| `expirationTime` | `string` | Expiration time after which the SIWE signature becomes valid. ISO 8601 datetime. Parse this from the provided Sign In With Farcaster URI.                                                                   | No       |
| `requestId`      | `string` | A system specific ID provided by the relying app. Parse this from the provided Sign In With Farcaster URI.                                                                                                  | No       |

## Returns

```ts
{
  siweMessage: SiweMessage;
  message: string;
  isError: boolean;
  error: Error;
}
```

| Parameter     | Description                                       |
| ------------- | ------------------------------------------------- |
| `siweMessage` | Constructed Sign In With Ethereum message object. |
| `message`     | SIWE message serialized as a string.              |
| `isError`     | True when an error has occurred.                  |
| `error`       | `Error` instance.                                 |
