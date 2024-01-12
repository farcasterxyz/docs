# `createChannel`

Create a Farcaster Auth relay channel.

Returns a secret token identifying the channel, and a URI to display to the end user as a link or QR code.

```ts
const channel = await appClient.createChannel({
  siweUri: 'https://example.com/login',
  domain: 'example.com',
});
```

## Parameters

| Parameter        | Type     | Description                                                                   | Required | Example                                |
| ---------------- | -------- | ----------------------------------------------------------------------------- | -------- | -------------------------------------- |
| `siweUri`        | `string` | Login URL for your application.                                               | Yes      | `https://example.com/login`            |
| `domain`         | `string` | Domain of your application.                                                   | Yes      | `example.com`                          |
| `nonce`          | `string` | A custom nonce. Must be at least 8 alphanumeric characters.                   | No       | `ESsxs6MaFio7OvqWb`                    |
| `notBefore`      | `string` | Start time at which the signature becomes valid. ISO 8601 datetime.           | No       | `2023-12-20T23:21:24.917Z`             |
| `expirationTime` | `string` | Expiration time at which the signature is no longer valid. ISO 8601 datetime. | No       | `2023-12-20T23:21:24.917Z`             |
| `requestId`      | `string` | A system specific ID your app can use to refer to the sign in request.        | No       | `8d0494d9-e0cf-402b-ab0a-394ac7fe07a0` |

## Returns

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

| Parameter           | Description                                                                        |
| ------------------- | ---------------------------------------------------------------------------------- |
| `response`          | HTTP response from the Connect relay server.                                       |
| `data.channelToken` | Connect relay channel token UUID.                                                  |
| `data.url`          | Sign in With Farcaster URL to present to the user. Links to Warpcast client in v1. |
| `data.nonce`        | Random nonce included in the Sign in With Farcaster message.                       |
| `isError`           | True when an error has occurred.                                                   |
| `error`             | `Error` instance.                                                                  |
