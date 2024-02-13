# `parseSignInURI`

Parse the Sign In With Farcaster URI provided by a connected app user.

Returns the parsed parameters. Your app should use these to construct a Sign In With Farcaster message.

Returns an error if URI is invalid.

```ts
const params = walletClient.parseSignInURI({
  uri: 'farcaster://connect?channelToken=76be6229-bdf7-4ad2-930a-540fb2de1e08&nonce=ESsxs6MaFio7OvqWb&siweUri=https%3A%2F%2Fexample.com%2Flogin&domain=example.com',
});
```

## Parameters

| Parameter | Type     | Description                 | Required |
| --------- | -------- | --------------------------- | -------- |
| `uri`     | `string` | Sign In With Farcaster URI. | Yes      |

## Returns

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

| Parameter               | Description                                                       |
| ----------------------- | ----------------------------------------------------------------- |
| `channelToken`          | Connect relay channel token UUID.                                 |
| `params.uri`            | Login URI of the relying connected app.                           |
| `params.domain`         | Domain of the relying app.                                        |
| `params.nonce`          | Random nonce provided by the relying app.                         |
| `params.notBefore`      | Time at which this message becomes valid.                         |
| `params.expirationTime` | Time at which this message expires.                               |
| `params.requestId`      | A system specific identifier provided by the relying application. |
| `isError`               | True when an error has occurred.                                  |
| `error`                 | `Error` instance.                                                 |
