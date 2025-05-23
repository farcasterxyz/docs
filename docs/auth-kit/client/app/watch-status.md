# `watchStatus`

Poll for the current status of a Farcaster Auth request.

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
| `channelToken` | `string`   | Farcaster Auth channel token.                                                                                                                                               | Yes      | `8d0494d9-e0cf-402b-ab0a-394ac7fe07a0` |
| `timeout`      | `number`   | Polling timeout, in milliseconds. If the connect request is not completed before the timeout, `watchStatus` returns an error.                                               | No       | `300_000`                              |
| `interval`     | `number`   | Polling interval, in milliseconds. The client will check for updates at this frequency.                                                                                     | No       | `1_000`                                |
| `onResponse`   | `function` | Callback function invoked each time the client polls for an update and receives a response from the relay server. Receives the return value of the latest `status` request. | No       | `({ data }) => console.log(data.fid)`  |

## Returns

```ts
{
    response: Response
    data: {
      state: "pending";
      nonce: string;
      metadata: {
        ip: string;
        userAgent: string;
      };
      acceptAuthAddress: boolean;
    } | {
      state: "completed";
      nonce: string;
      url: string;
      message?: string;
      signature?: `0x${string}`;
      authMethod?: "custody" | "authAddress";
      fid?: number;
      username?: string;
      bio?: string;
      displayName?: string;
      pfpUrl?: string;
      verifications?: string[];
      custody?: Hex;
      signatureParams: {
        siweUri: string;
        domain: string;
        nonce?: string;
        notBefore?: string;
        expirationTime?: string;
        requestId?: string;
        redirectUrl?: string;
      };
      metadata: {
        ip: string;
        userAgent: string;
      };
      acceptAuthAddress: boolean;
    }
    isError: boolean
    error: Error
}
```

| Parameter                 | Description                                                                                                            |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `response`                | HTTP response from the Connect relay server.                                                                           |
| `data.state`              | Status of the sign in request, either `"pending"` or `"completed"`                                                     |
| `data.nonce`              | Random nonce used in the SIWE message. If you don't provide a custom nonce as an argument, you should read this value. |
| `data.url`                | URL of the application.                                                                                                |
| `data.message`            | The generated SIWE message.                                                                                            |
| `data.signature`          | Hex signature produced by the user's Warpcast wallet.                                                                  |
| `data.authMethod`         | Auth method used to sign the message. Either `"custody"` or `"authAddress"`.                                           |
| `data.fid`                | User's Farcaster ID.                                                                                                   |
| `data.username`           | User's Farcaster username.                                                                                             |
| `data.bio`                | User's Farcaster bio.                                                                                                  |
| `data.displayName`        | User's Farcaster display name.                                                                                         |
| `data.pfpUrl`             | User's Farcaster profile picture URL.                                                                                  |
| `data.custody`            | User's FID custody address.                                                                                            |
| `data.verifications`      | List of user's verified addresses.                                                                                     |
| `data.signatureParams`    | SIWF message parameters.                                                                                               |
| `data.metadata.ip`        | IP address of client request.                                                                                          |
| `data.metadata.userAgent` | User agent of client request.                                                                                          |
| `data.acceptAuthAddress`  | `true` if requesting application accepts auth address signatures.                                                      |
| `isError`                 | True when an error has occurred.                                                                                       |
| `error`                   | `Error` instance.                                                                                                      |
