# `status`

Get current status of a Farcaster Auth request.

Returns the current state of the request, either `'pending'` if the user's Farcaster wallet app has not yet sent back a signature, or `'completed'` once the wallet app has returned a response.

In `'completed'` state, the response includes the generated Sign in With Farcaster message, a signature from the user's custody address, the user's verified fid, and user profile information.

```ts
const status = await appClient.status({
  channelToken: '210f1718-427e-46a4-99e3-2207f21f83ec',
});
```

## Parameters

| Parameter      | Type     | Description                   | Required | Example                                |
| -------------- | -------- | ----------------------------- | -------- | -------------------------------------- |
| `channelToken` | `string` | Farcaster Auth channel token. | Yes      | `8d0494d9-e0cf-402b-ab0a-394ac7fe07a0` |

## Returns

```ts
{
    response: Response
    data: {
        state: 'pending' | 'completed'
        nonce: string
        message?: string
        signature?: `0x${string}`
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

| Parameter          | Description                                                                                                                        |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `response`         | HTTP response from the Connect relay server.                                                                                       |
| `data.state`       | Status of the sign in request, either `"pending"` or `"complete"`                                                                  |
| `data.nonce`       | Random nonce used in the SIWE message. If you don't provide a custom nonce as an argument to the hook, you should read this value. |
| `data.message`     | The generated SIWE message.                                                                                                        |
| `data.signature`   | Hex signature produced by the user's Warpcast wallet.                                                                              |
| `data.fid`         | User's Farcaster ID.                                                                                                               |
| `data.username`    | User's Farcaster username.                                                                                                         |
| `data.bio`         | User's Farcaster bio.                                                                                                              |
| `data.displayName` | User's Farcaster display name.                                                                                                     |
| `data.pfpUrl`      | User's Farcaster profile picture URL.                                                                                              |
| `isError`          | True when an error has occurred.                                                                                                   |
| `error`            | `Error` instance.                                                                                                                  |
