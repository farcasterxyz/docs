# `watchStatus`

Poll for the current status of a Farcaster Connect request.

When the status changes to `'complete'` this action resolves with the final channel value, including the Sign In With Farcaster message, signature, and user profile information.

```ts
const status = await appClient.watchStatus({
  channelToken: '210f1718-427e-46a4-99e3-2207f21f83ec',
  timeout: 60_000,
  interval: 1_000,
  onResponse: ({ response, data }) => {
    console.log('Response code:', response.status);
    console.log('Status data:', data);
  },
});
```

## Parameters

| Parameter      | Type       | Description                                                                                                                                                                 | Required | Example                                |
| -------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------------------------------------- |
| `channelToken` | `string`   | Farcaster Connect channel token.                                                                                                                                            | Yes      | `8d0494d9-e0cf-402b-ab0a-394ac7fe07a0` |
| `timeout`      | `number`   | Polling timeout, in milliseconds. If the connect request is not completed before the timeout, `watchStatus` returns an error.                                               | No       | `300_000`                              |
| `interval`     | `number`   | Polling interval, in milliseconds. The client will check for updates at this frequency.                                                                                     | No       | `1_000`                                |
| `onResponse`   | `function` | Callback function invoked each time the client polls for an update and receives a response from the relay server. Receives the return value of the latest `status` request. | No       | `({ data }) => console.log(data.fid)`  |

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
