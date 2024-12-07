---
title: Frames v2 Notifications & Webhooks
---

# Frames v2 Notifications & Webhooks

Frames v2 allow developers to send notifications to users who have "added" the frame to their Farcaster client and enabled notifications.

The steps to successfully send a notification are:

1. Sets a valid domain manifest so that the frame is eligible to be added to a Farcaster client and use notifications.
2. Have a user add the frame to their Farcaster client. You can trigger a prompt via the `addFrame` action.
3. Receive a notification `url` and `token`, either as a result of the `addFrame` action or via a webhook. Save these to persistent storage.
4. Send a notification by POSTing to the `url` using the `token`
5. Optionally, listen for webhooks that tell you when a user adds/removes the frame and enables/disables notifications.

## Create a Farcaster Domain Manifest

A Farcaster domain manifest is required for a frame to be eligible to be added to a Farcaster clients and send notifications. It looks like this:

```json
{
  "accountAssociation": {
    "header": "eyJmaWQiOjU0NDgsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHg2MWQwMEFENzYwNjhGOEQ0NzQwYzM1OEM4QzAzYUFFYjUxMGI1OTBEIn0",
    "payload": "eyJkb21haW4iOiJ0ZXN0In0",
    "signature": "MHhlZWJkZjlhNDgwMWI2YTExNTc2MjdiZDg2OTM3YTAxN2ZlMzFhMzQ2Njk1YjMxZjFmZTFhOWYzZGUyNjY0MjEwNGJiMDRlMGJlNDdmZjg4YWE4NjIzOWUwZTg1MDc4MDQzNDdmNGUxNmUwMDAwOTUzY2VhMGQwMDdhNDEwMTBjZDFj"
  },
  "frame": {
    "name": "Example Frame",
    "version": "0.0.1",
    "iconUrl": "https://example.com/icon.png",
    "homeUrl": "https://example.com",
    "splashImageUrl": "https://example.com/splash.png",
    "splashBackgroundColor": "#eeccff",
    "webhookUrl": "https://example.com/webhook"
  }
}
```

For a real example, this is Yoink's manifest: https://yoink.party/.well-known/farcaster.json

To generate and validate a domain manifest:

1. Open the Warpcast mobile app and ensure you have developer mode enabled in Settings > Advanced > Developer Mode

2. Go to Settings > Developer > Domains, enter your domain name, and press "Generate domain manifest". Make sure that "Include frame definition" is checked. This creates a signature associating the domain with your Farcaster account and copies the manifest JSON.

3. Complete the frame details in the JSON and validate it by pasting it in the "Verify Domain Manifest" section. The `webhookUrl` is optional but highly recommended even if you are not immediately processing the events.

4. Host the manifest at path `/.well-known/farcaster.json` on your server. Sub-paths are not supported: the `.well-known` directory needs to be at the root of the domain.

5. Once the manifest is live on your domain, use the "Check domain status" button in the domain developer tools to validate the manifest from your server.

A domain manifest looks like:

## Have users add your frame to their Farcaster client

For a frame to send notifications, it needs to first be added by a user to their Farcaster client, and then notifications need to be enabled. Warpcast always enables notifications when a frame is added so a 2nd step is not needed.

When notifications are enabled, the Farcaster client generates a unique `token` for the user. This token is communicated to the frame together with a `url` that the frame must call. There are 2 channels:

- The return value of the `addFrame` call (see below)
- A webhook, so that you can get the `token` and `url` when the frame is added but not open, and when a user re-enables notification (see below)

The `token` and `url` need to be saved to persistent storage.

## Prompt users to add your frame to their Farcaster client

You can use the `addFrame` action while a user is using your frame to prompt them to add it to their Farcaster client.

The result type is:

```ts
export type FrameNotificationDetails = {
  url: string;
  token: string;
};

export type AddFrameResult =
  | {
      added: true;
      notificationDetails?: FrameNotificationDetails;
    }
  | {
      added: false;
      reason: 'invalid-domain-manifest' | 'rejected-by-user';
    };
```

- When `added: true` is returned, the user just added your frame (approved) or the frame was already added before (user was not prompted). The optional `notificationDetails` object provides the `token` and `url`. Warpcast always provides these when a user first adds a frame, and on subsequent calls provided that the user has not disabled notifications.
- When `added: false` is returned, the user either rejected the request or your domain manifest is invalid. You can only prompt a user once while a frame is open. Subsequent `addFrame` calls will directly resolve with `reason: "rejected-by-user"` without prompting the user.

## Send notifications

Once you have a `url` and `token`, you can send notifications by POSTing to the `url`. Note that you have to do separate POSTs for each Farcaster client (= unique `url`).

[Example code to send a notification](https://github.com/farcasterxyz/frames-v2-demo/blob/7905a24b7cd254a77a7e1a541288379b444bc23e/src/app/api/send-notification/route.ts#L25-L65)

Here are the types:

```ts
export const sendNotificationRequestSchema = z.object({
  notificationId: z.string().uuid(),
  title: z.string().max(32),
  body: z.string().max(128),
  targetUrl: z.string().max(256),
  tokens: z.string().array().max(100),
});
export type SendNotificationRequest = z.infer<
  typeof sendNotificationRequestSchema
>;

export const sendNotificationResponseSchema = z.object({
  result: z.object({
    successfulTokens: z.array(z.string()),
    invalidTokens: z.array(z.string()),
    rateLimitedTokens: z.array(z.string()),
  }),
});
export type SendNotificationResponse = z.infer<
  typeof sendNotificationResponseSchema
>;
```

The request is a JSON consisting of:

- `notificationId`: a UUIDv4 identifier that will be passed back to the frame via context
- `title`: title of the notification, max 32 characters
- `body`: body of the notification, max 128 characters
- `targetUrl`: the target frame URL to open when a user clicks the notification. It must match the domain for which the notification token was issued. Max 256 characters.
- `tokens`: an array of tokens (for that `url`) to send the notification to. Max 100 per call.

Note that client servers may impose a rate limit per `token`, e.g. 5 sends per 5 minutes.

The response from the client server must be an HTTP 200 OK, with a `result` object that contains 3 arrays:

- `successfulTokens`: tokens for which the notification succeeded
- `invalidTokens`: tokens which are no longer valid and should never be used again. This could happen if the user disabled notifications.
- `rateLimitedTokens`: tokens for which the rate limit was exceeded. Frame server can try later.

Once a user clicks the notification, the Farcaster client will:

- Open `targetUrl`
- Set the `context.location` to a `FrameLocationNotificationContext`

```ts
export type FrameLocationNotificationContext = {
  type: 'notification';
  notification: {
    notificationId: string;
    title: string;
    body: string;
  };
};
```

## Listen for webhooks to get updates

If the domain manifest includes a `webhookUrl`, the Farcaster client backend will POST events informing the frame when the user:

- Adds the frame to the client (`frame-added`)
- Removes the frame from the client which disables notifications (`frame-removed`)
- Enabled notifications (`notifications-enabled`)
- Disables notifications (`notifications-disabled`)

Events use the [JSON Farcaster Signature](https://github.com/farcasterxyz/protocol/discussions/208) format and are signed with the app key of the user. The data you'll receive is:

```ts
{
  header: string;
  payload: string;
  signature: string;
}
```

All 3 values are `base64url` encoded. The payload and header can be decoded to JSON, where the payload is different per event.

[Example code to process webhook events](https://github.com/farcasterxyz/frames-v2-demo/blob/7905a24b7cd254a77a7e1a541288379b444bc23e/src/app/api/webhook/route.ts)

### `frame-added`: frame added to a client

Sent when the user adds the frame to their Farcaster client (whether or not this was triggered by an `addFrame()` prompt).

The optional `notificationDetails` object provides the `token` and `url` if the client equates adding to enabling notifications (Warpcast does this).

Webhook payload:

```json
{
  "event": "frame-added",
  "notificationDetails": {
    "url": "https://api.warpcast.com/v1/frame-notification",
    "token": "a05059ef2415c67b08ecceb539201cbc6"
  }
}
```

```tsx
type EventFrameAddedPayload = {
  event: 'frame-added';
  notificationDetails?: FrameNotificationDetails;
};
```

### `frame-removed`: user removed frame from client

Sent when a user removes a frame, which means that any notification tokens for that fid and client app (based on signer requester) should be considered invalid:

Webhook payload:

```json
{
  "event": "frame-removed"
}
```

### `notifications-disabled`: user disabled notifications

Sent when a disables frame notifications from e.g. a settings panel in the client app. Any notification tokens for that fid and client app (based on signer requester) should be considered invalid:

Webhook payload:

```json
{
  "event": "notifications-disabled"
}
```

### `notifications-enabled`: user enabled notifications

Sent when a user enables frame notifications (e.g. after disabling them, or if this is a separate step from adding a frame to the client). The payload includes a new `token` and `url`:

Webhook payload:

```json
{
  "event": "notifications-enabled",
  "notificationDetails": {
    "url": "https://api.warpcast.com/v1/frame-notification",
    "token": "a05059ef2415c67b08ecceb539201cbc6"
  }
}
```

```tsx
type EventNotificationsEnabledPayload = {
  event: 'notifications-enabled';
  notificationDetails: FrameNotificationDetails;
};
```
