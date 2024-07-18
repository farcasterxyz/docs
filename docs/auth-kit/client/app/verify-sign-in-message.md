# `verifySignInMessage`

Verify a Sign In With Farcaster message. Your app should call this function and check that it succeeds after reading the message and signature provided by the user's Farcaster wallet over the Connect channel.

Returns the parsed Sign in With Farcaster message, the user's fid, and whether the verification succeeded.

```ts
const { data, success, fid } = await appClient.verifySignInMessage({
  nonce: 'abcd1234',
  domain: 'example.com',
  message: 'example.com wants you to sign in with your Ethereum account…',
  signature: '0x9335c3055d47780411a3fdabad293c68c84ea350a11794cd11fd51b…',
});
```

## Parameters

| Parameter   | Type                      | Description                                                                                                                                                                                  | Required |
| ----------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `domain`    | `string`                  | Domain of your application. Must match the domain in the provided SIWF message.                                                                                                              | Yes      |
| `nonce`     | `string`                  | A custom nonce. Must match the nonce in the provided SIWF message.                                                                                                                           | Yes      |
| `message`   | `string` or `SiweMessage` | The Sign in With Farcaster message to verify. This may be either a string or a parsed `SiweMessage`. Your app should read this value from the Connect channel once the request is completed. | Yes      |
| `signature` | `Hex`                     | Signature provided by the user's Farcaster wallet. Your app should read this from the Connect channel once the request is completed.                                                         | Yes      |

## Returns

```ts
{
    data: SiweMessage,
    success: boolean,
    fid: number
    isError: boolean
    error: Error
}
```

| Parameter | Description                                     |
| --------- | ----------------------------------------------- |
| `data`    | Parsed SIWF message, as a `SiweMessage` object. |
| `success` | True if the provided signature is valid.        |
| `fid`     | FID of the user.                                |
| `isError` | True when an error has occurred.                |
| `error`   | `Error` instance.                               |
