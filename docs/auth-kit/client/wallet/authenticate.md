# `authenticate`

Submit a Sign In With Farcaster message, user signature, and profile data to the Connect relay server.

```ts
const params = await authClient.authenticate({
  message: 'example.com wants you to sign in with your Ethereum account…',
  signature: '0x9335c3055d47780411a3fdabad293c68c84ea350a11794cdc811fd5…',
  fid: 1,
  username: 'alice',
  bio: "I'm a little teapot who didn't fill out my bio",
  displayName: 'Alice Teapot',
  pfpUrl: 'https://images.example.com/profile.png',
});
```

## Parameters

| Parameter      | Type     | Description                                                                               | Required |
| -------------- | -------- | ----------------------------------------------------------------------------------------- | -------- |
| `authKey`      | `string` | Farcaster Auth API key. Farcaster Auth v1 restricts calls to `/authenticate` to Warpcast. | Yes      |
| `channelToken` | `string` | Farcaster Auth channel token.                                                             | Yes      |
| `message`      | `string` | The Sign in With Farcaster message produced by your wallet app and signed by the user.    | Yes      |
| `message`      | `string` | The Sign in With Farcaster message produced by your wallet app and signed by the user.    | Yes      |
| `signature`    | `Hex`    | SIWE signature created by the wallet user's account.                                      | Yes      |
| `fid`          | `number` | Wallet user's fid.                                                                        | Yes      |
| `username`     | `string` | Wallet user's Farcaster username.                                                         | Yes      |
| `bio`          | `string` | Wallet user's bio.                                                                        | Yes      |
| `displayName`  | `string` | Wallet user's display name.                                                               | Yes      |
| `pfpUrl`       | `string` | Wallet user's profile photo URL.                                                          | Yes      |

## Returns

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

| Parameter          | Description                                                       |
| ------------------ | ----------------------------------------------------------------- |
| `response`         | HTTP response from the Connect relay server.                      |
| `data.state`       | Status of the sign in request, either `"pending"` or `"complete"` |
| `data.nonce`       | Random nonce used in the SIWE message.                            |
| `data.message`     | The generated SIWE message.                                       |
| `data.signature`   | Hex signature produced by the user's Warpcast wallet.             |
| `data.fid`         | User's Farcaster ID.                                              |
| `data.username`    | User's Farcaster username.                                        |
| `data.bio`         | User's Farcaster bio.                                             |
| `data.displayName` | User's Farcaster display name.                                    |
| `data.pfpUrl`      | User's Farcaster profile picture URL.                             |
| `isError`          | True when an error has occurred.                                  |
| `error`            | `Error` instance.                                                 |
