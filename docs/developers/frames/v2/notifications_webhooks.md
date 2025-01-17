---
title: Frames v2 Notifications & Webhooks
---

# Frames v2 Notifications & Webhooks

Frames v2 allow developers to send notifications to users who have "added" the frame to their Farcaster client and enabled notifications.

In Warpcast, these are **in-app notifications** that trigger the red dot on the notifications tab. At this stage there is no support for push notifications.

The steps to successfully send a notification are:

1. Set up a valid domain manifest
2. Have a user add the frame to their Farcaster client. You can trigger a prompt via the `addFrame` action
3. Receive a notification `url` and `token` and save these to persistent storage
4. Send a notification by POSTing to the `url` using the `token`
5. Listen for webhooks that tell you when a user adds/removes the frame and enables/disables notifications

The [Frames V2 Demo frame](https://github.com/farcasterxyz/frames-v2-demo) has all of the above:

- [Handles webhooks](https://github.com/farcasterxyz/frames-v2-demo/blob/main/src/app/api/webhook/route.ts) leveraging the [`@farcaster/frame-node`](https://github.com/farcasterxyz/frames/tree/main/packages/frame-node) library that makes this very easy
- [Saves notification tokens to Redis](https://github.com/farcasterxyz/frames-v2-demo/blob/main/src/lib/kv.ts)
- [Sends notifications](https://github.com/farcasterxyz/frames-v2-demo/blob/main/src/lib/notifs.ts)

## Create a Farcaster Domain Manifest

A Farcaster domain manifest is required for a frame to be eligible to be added to Farcaster clients and send notifications. It looks like this:

```json
{
  "accountAssociation": {
    "header": "eyJmaWQiOjU0NDgsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHg2MWQwMEFENzYwNjhGOEQ0NzQwYzM1OEM4QzAzYUFFYjUxMGI1OTBEIn0",
    "payload": "eyJkb21haW4iOiJleGFtcGxlLmNvbSJ9",
    "signature": "MHg3NmRkOWVlMjE4OGEyMjliNzExZjUzOTkxYTc1NmEzMGZjNTA3NmE5OTU5OWJmOWFmYjYyMzAyZWQxMWQ2MWFmNTExYzlhYWVjNjQ3OWMzODcyMTI5MzA2YmJhYjdhMTE0MmRhMjA4MmNjNTM5MTJiY2MyMDRhMWFjZTY2NjE5OTFj"
  },
  "frame": {
    "version": "1",
    "name": "Example Frame",
    "iconUrl": "https://example.com/icon.png",
    "homeUrl": "https://example.com",
    "imageUrl": "https://example.com/image.png",
    "buttonTitle": "Check this out",
    "splashImageUrl": "https://example.com/splash.png",
    "splashBackgroundColor": "#eeccff",
    "webhookUrl": "https://example.com/api/webhook"
  }
}
```

For a real example, this is Yoink's manifest: https://yoink.party/.well-known/farcaster.json

To generate and validate a domain manifest:

1. Open the Warpcast mobile app and ensure you have developer mode enabled in Settings > Advanced > Developer Mode

2. Go to Settings > Developer > Domains, enter your domain name, and press "Generate domain manifest". Make sure that "Include frame definition" is checked. This creates a signature associating the domain with your Farcaster account and copies the manifest JSON.

3. Complete the frame details in the JSON and validate it by pasting it in the "Verify Domain Manifest" section. The `webhookUrl` is an endpoint on your side that Farcaster clients will use to POST events. It is required for your app to be able to send notifications.

4. Host the manifest at path `/.well-known/farcaster.json` on your server. Sub-paths are not supported: the `.well-known` directory needs to be at the root of the domain.

5. Once the manifest is live on your domain, use the "Check domain status" button in the domain developer tools to validate the manifest from your server.

## Have users add your frame to their Farcaster client

For a frame to send notifications, it needs to first be added by a user to their Farcaster client, and then notifications need to be enabled. Warpcast always enables notifications when a frame is added (and the manifest contains a `webhookUrl`) so a 2nd step is not needed.

When notifications are enabled, the Farcaster client generates a unique `token` for the user. This token is communicated to the frame together with a `url` that the frame must call. There are 3 ways to get these:

- The return value when calling `addFrame` (see below)
- Via a webhook, so that you can get the `token` and `url` also when the frame is not open, and when a user re-enables notification (see below)
- Via a frame event, when the user adds the frame while the frame is open

The `token` and `url` need to be saved to persistent storage.

## Prompt users to add your frame to their Farcaster client

You can use the `addFrame` action while a user is using your frame to prompt them to add it to their Farcaster client.

The return type is:

```ts
export type FrameNotificationDetails = {
  url: string;
  token: string;
};

export type AddFrameRejectedReason =
  | 'invalid_domain_manifest'
  | 'rejected_by_user';

export type AddFrameResult =
  | {
      added: true;
      notificationDetails?: FrameNotificationDetails;
    }
  | {
      added: false;
      reason: AddFrameRejectedReason;
    };
```

- When `added: true` is returned, the user just added your frame (approved) or the frame was already added before (user was not prompted). The optional `notificationDetails` object provides the `token` and `url`. Warpcast always provides these when a user first adds a frame, and on subsequent calls provided that the user has not disabled notifications. If you did not get `notificationDetails` when adding an app, ensure your domain manifest has a `webhookUrl`.
- When `added: false` is returned, the user either rejected the request or your domain manifest is invalid. You can only prompt a user once while a frame is open. Subsequent `addFrame` calls will directly resolve with `reason: "rejected_by_user"` without prompting the user.

## Send notifications

Once you have a `url` and `token`, you can send notifications by POSTing to the `url`. Note that you have to do separate POSTs for each Farcaster client (= unique `url`).

[Example code to send a notification](https://github.com/farcasterxyz/frames-v2-demo/blob/7905a24b7cd254a77a7e1a541288379b444bc23e/src/app/api/send-notification/route.ts#L25-L65)

Here are the types:

```ts
export const sendNotificationRequestSchema = z.object({
  notificationId: z.string().max(128),
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

- `notificationId`: a string (max size 128) that servers as an idempotency key and will be passed back to the frame via context. A Farcaster client should deliver only one notification per user per `notificationId`, even if called multiple times.
- `title`: title of the notification, max 32 characters
- `body`: body of the notification, max 128 characters
- `targetUrl`: the target frame URL to open when a user clicks the notification. It must match the domain for which the notification token was issued. Max 256 characters.
- `tokens`: an array of tokens (for that `url`) to send the notification to. Max 100 per call.

Note that client servers may impose rate limits per `token`. Warpcast enforces the following rate limits:

- 1 notification per 30 seconds per `token`
- 100 notifications per day per `token`

The response from the client server must be an HTTP 200 OK, with a `result` object that contains 3 arrays:

- `successfulTokens`: tokens for which the notification succeeded, including those for which the request is a duplicate (same `notificationId` used before)
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

Farcast clients will POST events to your `webhookUrl` informing you when a user:

- Adds the frame to the client (`frame_added`)
- Removes the frame from the client which disables notifications (`frame_removed`)
- Enabled notifications (`notifications_enabled`)
- Disables notifications (`notifications_disabled`)

Your endpoint should return a 200 response. It is up to Farcaster clients how often and for how long they retry in case of errors.

Events use the [JSON Farcaster Signature](https://github.com/farcasterxyz/protocol/discussions/208) format, signed with the app key of the user. The data you'll receive is:

```ts
{
  header: string;
  payload: string;
  signature: string;
}
```

All 3 values are `base64url` encoded. The payload and header can be decoded to JSON.

The `header` JSON has 3 properties:

- `fid`: the FID of the user triggering the event
- `type`: the type of signature, always `app_key`
- `key`: the app key (onchain signer) public key

The `payload` JSON differs per event, see below.

The [`@farcaster/frame-node`](https://github.com/farcasterxyz/frames/tree/main/packages/frame-node) library makes handling very easy. The only thing it requires is a method that validates that the app key belongs to the FID and returns the Farcaster client FID. An implementation that uses [Neynar](https://neynar.com) is provided. Check out the [README](https://github.com/farcasterxyz/frames/tree/main/packages/frame-node) and [see how it's used in the Frames V2 Demo frame](https://github.com/farcasterxyz/frames-v2-demo/blob/main/src/app/api/webhook/route.ts).

### `frame_added`: frame added to a client

Sent when the user adds the frame to their Farcaster client (whether or not this was triggered by an `addFrame()` prompt).

The optional `notificationDetails` object provides the `token` and `url` if the client equates adding to enabling notifications (Warpcast does this).

Webhook payload:

```json
{
  "event": "frame_added",
  "notificationDetails": {
    "url": "https://api.warpcast.com/v1/frame-notifications",
    "token": "a05059ef2415c67b08ecceb539201cbc6"
  }
}
```

```tsx
type EventFrameAddedPayload = {
  event: 'frame_added';
  notificationDetails?: FrameNotificationDetails;
};
```

### `frame_removed`: user removed frame from client

Sent when a user removes a frame, which means that any notification tokens for that fid and client app (based on signer requester) should be considered invalid:

Webhook payload:

```json
{
  "event": "frame_removed"
}
```

### `notifications_disabled`: user disabled notifications

Sent when a disables frame notifications from e.g. a settings panel in the client app. Any notification tokens for that fid and client app (based on signer requester) should be considered invalid:

Webhook payload:

```json
{
  "event": "notifications_disabled"
}
```

### `notifications_enabled`: user enabled notifications

Sent when a user enables frame notifications (e.g. after disabling them, or if this is a separate step from adding a frame to the client). The payload includes a new `token` and `url`:

Webhook payload:

```json
{
  "event": "notifications_enabled",
  "notificationDetails": {
    "url": "https://api.warpcast.com/v1/frame-notifications",
    "token": "a05059ef2415c67b08ecceb539201cbc6"
  }
}
```

```tsx
type EventNotificationsEnabledPayload = {
  event: 'notifications_enabled';
  notificationDetails: FrameNotificationDetails;
};
```

## Listen for frame events to get updates while the frame is open

Farcaster clients emit events to your frame, while it is open, to let you know of actions the user takes.

To listen to events, you have to use `sdk.on` to register callbacks ([see full example](https://github.com/farcasterxyz/frames-v2-demo/blob/20d454f5f6b1e4f30a6a49295cbd29ca7f30d44a/src/components/Demo.tsx#L92-L124)).

```ts
sdk.on('frameAdded', ({ notificationDetails }) => {
  setLastEvent(
    `frameAdded${!!notificationDetails ? ', notifications enabled' : ''}`
  );

  setAdded(true);
  if (notificationDetails) {
    setNotificationDetails(notificationDetails);
  }
});
```

Ensure that on unmount/close, all the listeners are removed via `sdk.removeAllListeners()`.

Here are the callback definitions:

```ts
export type EventMap = {
  frameAdded: ({
    notificationDetails,
  }: {
    notificationDetails?: FrameNotificationDetails;
  }) => void;
  frameAddRejected: ({ reason }: { reason: AddFrameRejectedReason }) => void;
  frameRemoved: () => void;
  notificationsEnabled: ({
    notificationDetails,
  }: {
    notificationDetails: FrameNotificationDetails;
  }) => void;
  notificationsDisabled: () => void;
};
```

The emitted events are:

- `frameAdded`, same as the `frame_added` webhook
- `frameAddRejected`, frontend-only, emitted when the frame has triggered the `addFrame` action and the frame was not added. Reason is the same as in the return value of `addFrame`.
- `frameRemoved`, same as the `frame_removed` webhook
- `notificationsEnabled`, same as the `notifications_enabled` webhook
- `notificationsDisabled`, same as the `notifications_disabled` webhook
