# `status`

Get the current status of a Farcaster Auth request.

Returns the current state of the request, either `'pending'` if the user's Farcaster wallet app has not yet sent back a signature, or `'completed'` once the wallet app has returned a response.

In `'completed'` state, the response includes the generated Sign in With Farcaster message, a signature from the user's custody address, the user's verified fid, and user profile information.

```ts
const status = await appClient.status({
  channelToken: '23W59BKK',
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

| Parameter                 | Description                                                                                                                        |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `response`                | HTTP response from the Connect relay server.                                                                                       |
| `data.state`              | Status of the sign in request, either `"pending"` or `"completed"`                                                                 |
| `data.nonce`              | Random nonce used in the SIWE message. If you don't provide a custom nonce as an argument to the hook, you should read this value. |
| `data.url`                | URL of the application.                                                                                                            |
| `data.message`            | The generated SIWE message.                                                                                                        |
| `data.signature`          | Hex signature produced by the user's Farcaster client app wallet.                                                                  |
| `data.authMethod`         | Auth method used to sign the message. Either `"custody"` or `"authAddress"`.                                                       |
| `data.fid`                | User's Farcaster ID.                                                                                                               |
| `data.username`           | User's Farcaster username.                                                                                                         |
| `data.bio`                | User's Farcaster bio.                                                                                                              |
| `data.displayName`        | User's Farcaster display name.                                                                                                     |
| `data.pfpUrl`             | User's Farcaster profile picture URL.                                                                                              |
| `data.custody`            | User's FID custody address.                                                                                                        |
| `data.verifications`      | List of user's verified addresses.                                                                                                 |
| `data.signatureParams`    | SIWF message parameters.                                                                                                           |
| `data.metadata.ip`        | IP address of client request.                                                                                                      |
| `data.metadata.userAgent` | User agent of client request.                                                                                                      |
| `data.acceptAuthAddress`  | `true` if requesting application accepts auth address signatures.                                                                  |
| `isError`                 | True when an error has occurred.                                                                                                   |
| `error`                   | `Error` instance.                                                                                                                  |
