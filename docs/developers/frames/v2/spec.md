---
title: Frames v2 Specification
---

# Specification

A frame is full-screen application that renders inside a Farcaster app.

It can be embedded in feeds in a compact form which includes an image and a button which opens the frame. When the button is clicked the frame URL is rendered in an in-app browser. Developers can build anything that renders in a browser and can use a JavaScript SDK to trigger actions like saving the frame or requesting an onchain transaction.

<img width="1330" alt="Screenshot 2024-11-20 at 7 28 48 PM" src="https://github.com/user-attachments/assets/9d076056-f8df-46dd-8630-e8caf5b3def4">

Frames will have access to :

1. Context: information about the user's Farcaster account and where the frame was called from
2. Actions: APIs to request the parent app to do certain things on the frame's behalf
3. Wallet: an Ethereum provider to request transactions and signatures from the connected wallet

Here's an example of a frame using a wallet to complete a transaction:

![https://github.com/user-attachments/assets/140213e1-eec8-4a67-8238-b05ac5ad7423](https://github.com/user-attachments/assets/140213e1-eec8-4a67-8238-b05ac5ad7423)

## Frame URL Specifications

A URL is considered a valid frame if it includes an embed tag in its HTML `<head>` and a manifest file at a well known location at the root of the domain.

### Versioning

Frames will follow [semantic versioning](https://semver.org/) and frames must declare the version that they support. Apps will choose to render frames based on the versions they can support.

<a name="frame-embed-metatags"></a>

### Frame Embed Metatags

A frame URL must have a FrameEmbed in a serialized form in the `fc:frame` meta tag in the HTML `<head>`. When this URL is rendered in a cast, the image is displayed in a 3:2 ratio with a button underneath. Clicking the button will open an app frame to the provided action url and use the splash page to animate the transition.

```html
<meta name="fc:frame" content="<stringified FrameEmbed JSON>" />
```

```ts
type FrameEmbed = {
  // Frame spec version. Required.
  // Example: "next"
  version: 'next';

  // Frame image.
  // Max 512 characters.
  // Image must be 3:2 aspect ratio and less than 10 MB.
  // Example: "https://yoink.party/img/start.png"
  imageUrl: string;

  // Button attributes
  button: {
    // Button text.
    // Max length of 32 characters.
    // Example: "Yoink Flag"
    title: string;

    // Action attributes
    action: {
      // Action type. Must be "launch_frame".
      type: 'launch_frame';

      // App name
      // Max length of 32 characters.
      // Example: "Yoink!"
      name: string;

      // Frame launch URL.
      // Max 512 characters.
      // Example: "https://yoink.party/"
      url: string;

      // Splash image URL.
      // Max 512 characters.
      // Image must be 200x200px and less than 1MB.
      // Example: "https://yoink.party/img/splash.png"
      splashImageUrl: string;

      // Hex color code.
      // Example: "#eeeee4"
      splashBackgroundColor: string;
    };
  };
};
```

### Frame Manifest

The manifest file declares the metadata that is applied to the frame application served from this domain. It also defines triggers that indicate which actions it supports from trigger points like casts and the composer.

Frame servers must provide a JSON manifest file on their domain at the well known URI `/.well-known/farcaster.json`.

```ts
type FarcasterManifest = {
  // Metadata associating the domain with a Farcaster account
  accountAssociation: {
    // base64url encoded JFS header.
    // See FIP: JSON Farcaster Signatures for details on this format.
    header: string;

    // base64url encoded payload containing a single property `domain`
    payload: string;

    // base64url encoded signature bytes
    signature: string;
  };

  // Frame configuration
  frame: FrameConfig;

  // Trigger configuration
  triggers?: TriggerConfig[];
};
```

<a name="domain-account-association"></a>
**Domain Account Association**

The account association links the domain to a Farcaster account. The signature must be a signed [JSON Farcaster Signature](https://github.com/farcasterxyz/protocol/discussions/208) from the account's custody address with the following payload:

```ts
{
  domain: string;
}
```

The domain in the signed object must match the domain the manifest is served from.

**Frame Config**

```ts
type FrameConfig = {
  // Manifest version. Required.
  version: '1';

  // App name. Required.
  // Max length of 32 characters.
  // Example: "Yoink!"
  name: string;

  // Default launch URL. Required.
  // Max 512 characters.
  // Example: "https://yoink.party/"
  homeUrl: string;

  // Frame application icon URL.
  // Max 512 characters.
  // Image must be 200x200px and less than 1MB.
  // Example: "https://yoink.party/img/icon.png"
  iconUrl: string;

  // Default image to show when frame is rendered in a feed.
  // Max 512 characters.
  // Image must have a 3:2 ratio.
  // Example: "https://yoink.party/framesV2/opengraph-image"
  imageUrl: string;

  // Default button title to use when frame is rendered in a feed.
  // Max 32 characters.
  // Example: "🚩 Start"
  buttonTitle: string;

  // Splash image URL.
  // Max 512 characters.
  // Image must be 200x200px and less than 1MB.
  // Example: "https://yoink.party/img/splash.png"
  splashImageUrl?: string;

  // Hex color code.
  // Example: "#eeeee4"
  splashBackgroundColor?: string;

  // URL to which clients will POST events.
  // Max 512 characters.
  // Required if the frame application uses notifications.
  // Example: "https://yoink.party/webhook"
  webhookUrl?: string;
};
```

**Frame Invocation**

Frames may be invoked in the following ways. When invoked, the frame application may receive additional information about the context in which it was launched.

| Type         | Description                                                                                                                                           | Context                                                           |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| global       | Called when the app is invoked from the app launcher or any other unspecified context. Loads the `homeUrl` defined in the frame application manifest. | None                                                              |
| embed        | Called when the frame is invoked from an embed in a feed or direct cast. Loads the `url` specified in the FrameEmbed metadata.                        | Cast hash, embed URL, embed type (feed or direct cast), see below |
| notification | Called when a user taps/clicks a frame notification. Loads the `targetUrl` specified in the notification payload.                                     | Notification ID, see below                                        |

**Triggers**

Triggers allow a user to launch into your frame application from different places in a Farcaster client application. These will eventually replace "cast actions" and "composer actions." See [Feature: Triggers](#feature-triggers) in the Appendix for further details.

```ts
type TriggerConfig =
  | {
      // Type of trigger, either cast or composer. Required.
      type: 'cast';

      // Unique ID. Required. Reported to the frame.
      // Example: "yoink-score"
      id: string;

      // Handler URL. Required.
      // Example: "https://yoink.party/triggers/cast"
      url: string;

      // Name override. Optional, defaults to FrameConfig.name
      // Example: "View Yoink Score"
      name?: string;
    }
  | {
      type: 'composer';
      id: string;
      url: string;
      name?: string;
    };
```

The frame receives the trigger type and id as context data.

**Frame manifest caching**

Farcaster clients may cache the frame manifest when scraping embeds, but should provide a mechanism for refreshing the manifest file.

### Frame UI Specifications

![https://github.com/user-attachments/assets/66cba3ca-8337-4644-a3ac-ddc625358390](https://github.com/user-attachments/assets/66cba3ca-8337-4644-a3ac-ddc625358390)

**Header**

Clients should render a header above the frame that includes the name and author specified in the manifest. Clients should show the header whenever the app frame is launched.

**Splash Screen**

Clients should show a splash screen as soon as the app is launched. The icon and background must be specified in the frame manifest or embed meta tags. The frame can hide the splash screen once loading is complete.

**Size & Orientation**

A frame should be rendered in a vertical modal. Mobile frame sizes will be dictated by device dimensions while web frame sizes will be set to 424x695px.

## Client SDK API

Frame applications must include a frame SDK JavaScript package to communicate with the parent app. Frames may include it as a bundled package or using a `<script>` tag.

The frame SDK manages frame-client communication over a `window.postMessage` channel. Since the parent app cannot inject arbitrary JavaScript in a browser context, frame applications must include the SDK in their app to establish a communication channel.

The `sdk.context` variable provides information about the context within which the frame is running:

```ts
export type FrameContext = {
  user: {
    fid: number;
    username?: string;
    displayName?: string;
    pfpUrl?: string;
  };
  location?: FrameLocationContext;
  client: {
    clientFid: number;
    added: boolean;
    safeAreaInsets?: SafeAreaInsets;
    notificationDetails?: FrameNotificationDetails;
  };
};
```

### context.location

Contains information about the context from which the frame was launched.

```ts
export type CastEmbedLocationContext = {
  type: 'cast_embed';
  embed: string;
  cast: {
    fid: number;
    hash: string;
  };
};

export type NotificationLocationContext = {
  type: 'notification';
  notification: {
    notificationId: string;
    title: string;
    body: string;
  };
};

export type LauncherLocationContext = {
  type: 'launcher';
};

export type ChannelLocationContext = {
  type: 'channel';
  channel: {
    /**
     * Channel key identifier
     */
    key: string;

    /**
     * Channel name
     */
    name: string;

    /**
     * Channel profile image URL
     */
    imageUrl?: string;
  };
};

export type LocationContext =
  | CastEmbedLocationContext
  | NotificationLocationContext
  | LauncherLocationContext
  | ChannelLocationContext;
```

**Cast Embed**

Indicates that the frame was launched from a cast (where it is an embed).

```ts
> sdk.context.location
{
  type: "cast_embed",
  cast: {
    fid: 3621,
    hash: "0xa2fbef8c8e4d00d8f84ff45f9763b8bae2c5c544",
  }
}
```

**Notification**

Indicates that the frame was launched from a notification triggered by the frame.

```ts
> sdk.context.location
{
  type: "notification",
  notification: {
    notificationId: "f7e9ebaf-92f0-43b9-a410-ad8c24f3333b"
    title: "Yoinked!",
    body: "horsefacts captured the flag from you.",
  }
}
```

**Launcher**

Indicates that the frame was launched directly by the client app outside of a context, e.g. via some type of catalog or a notification triggered by the client.

```ts
> sdk.context.location
{
  type: "launcher"
}
```

### context.user

Details about the calling user which can be used to customize the interface. This should be considered untrusted since it is passed in by the application, and there is no guarantee that it was authorized by the user.

```ts
export type AccountLocation = {
  placeId: string;

  /**
   * Human-readable string describing the location
   */
  description: string;
};

export type UserContext = {
  fid: number;
  username?: string;
  displayName?: string;

  /**
   * Profile image URL
   */
  pfpUrl?: string;
  location?: AccountLocation;
};
```

```ts
> sdk.context.user
{
  "fid": 6841,
  "username": "deodad",
  "displayName": "Tony D'Addeo",
  "pfp": "https://i.imgur.com/dMoIan7.jpg",
  "bio": "Building @warpcast and @farcaster, new dad, like making food",
  "location": {
    "placeId": "ChIJLwPMoJm1RIYRetVp1EtGm10",
    "description": "Austin, TX, USA"
  }
}
```

```ts
type User = {
  fid: number;
  username?: string;
  displayName?: string;
  pfp?: string;
  bio?: string;
  location?: {
    placeId: string;
    description: string;
  };
};
```

### context.client

Details about the Farcaster client running the frame. This should be considered untrusted

- `clientFid`: the self-reported FID of the client (e.g. 9152 for Warpcast)
- `added`: whether the user has added the frame to the client
- `safeAreaInsets`: insets to avoid areas covered by navigation elements that obscure the view
- `notificationDetails`: in case the user has enabled notifications, includes the `url` and `token` for sending notifications

```ts
export type SafeAreaInsets = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export type ClientContext = {
  clientFid: number;
  added: boolean;
  notificationDetails?: FrameNotificationDetails;
  safeAreaInsets?: SafeAreaInsets;
};
```

```ts
> sdk.context.client
{
  clientFid: 9152,
  added: true,
  safeAreaInsets: {
    top: 0,
    bottom: 20,
    left: 0,
    right: 0,
  };
  notificationDetails: {
    url: "https://api.warpcast.com/v1/frame-notifications",
    token: "a05059ef2415c67b08ecceb539201cbc6"
  }
}
```

```ts
type FrameNotificationDetails = {
  url: string;
  token: string;
};

type SafeAreaInsets = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

type ClientContext = {
  clientFid: number;
  added: boolean;
  safeAreaInsets?: SafeAreaInsets;
  notificationDetails?: FrameNotificationDetails;
};
```

#### Using safeAreaInsets

Mobile devices render navigation elements that obscure the view of a frame. Use
the `safeAreaInsets` to render content in the safe area that won't be obstructed.

A basic usage would to wrap your view in a container that adds margin:

```
<div style={{
  marginTop: context.client.safeAreaInsets.top,
  marginBottom: context.client.safeAreaInsets.bottom,
  marginLeft: context.client.safeAreaInsets.left,
  marginRight: context.client.safeAreaInsets.right,
}}>
  ...your frame view
</div>
```

However, you may want to set these insets on specific elements: for example if
you have tab bar at the bottom of your frame with a different background, you'd
want to set the bottom inset as padding there so it looks attached to the
bottom of the view.

### actions.ready

Indicates that the application is fully loaded and ready to displayed to users. Once this is called the loading screen will be hidden. Frame applications MUST call `ready()` to display their app.

```ts
> await sdk.actions.ready();
```

```ts
type Ready = (
  options: Partial<{
    /**
     * Disable native gestures. Use this option if your frame uses gestures
     * that conflict with native gestures.
     */
    disableNativeGestures: boolean;
  }>
) => Promise<void>;
```

### actions.openUrl

Request the client app to direct the user to an external URL via deep link or web browser.

```ts
> await sdk.actions.openUrl({ url: "<https://yoink.today/>" });
```

```ts
type OpenExternalUrl = (options: {
  url: string;
  close?: boolean;
}) => Promise<void>;
```

### actions.close

Close the app frame and display an optional toast.

```ts
> await sdk.actions.close({ toast: {
    message: "You yoinked the flag from @deodad."
  }
});
```

```ts
type Close = (options: {
  toast?: {
    message: string;
  };
}) => Promise<void>;
```

### wallet.ethProvider

An [EIP-1193 Ethereum Provider](https://eips.ethereum.org/EIPS/eip-1193) for interacting with the user’s connected wallet. App Frames can interact with this provider using familiar tools like [wagmi](https://wagmi.sh/) to:

- get the user’s connected Ethereum addresses (`eth_requestAccounts`)
- request a transaction (`eth_sendTransaction`)
- request a wallet signature (`eth_signTypedData_v4`)

```ts
> await sdk.wallet.ethProvider.request({
  method: 'eth_requestAccounts'
});
["0xf17e02c56D8c86767c12332571C91BB29ae302f3"]
```

# Rationale

### FAQ

**What about older frame types / cast actions / composer actions / mini-apps?**

Older frame types will be fully supported for now until we develop a thorough transition plan. We will give developers at least 3 months notice before deprecating anything.

# Release Plan

## Schedule

- Nov 22nd: new draft of spec, mobile playground
- Nov 27th: v0.0.0 of frames on mobile
- Dec 6th+: v0.1.0 of frames on mobile and web (scope tbd, but likely includes auth, add frame, notifications)
- Jan/Feb: stable release of v1.0.0

## Changelog

| Date  | Version | Changes                         |
| ----- | ------- | ------------------------------- |
| Dec 2 | 0.0.1   | Copy edits, update release plan |

# Appendix

## Feature: Auth

Allow users to sign into frames using their Farcaster identity.

### actions.signIn

Initiates a Sign In with Farcaster flow for the user. The Frame host must set
the `domain` value of the SIWF message to the domain of the frame and the `uri`
value of the url of the Frame. When validating this message the `domain` must
be checked.

```ts
> await sdk.actions.signIn({ nonce });
{ message: "yoink.party wants you to sign in...", signature: "0xabcd..." }
```

```ts
export type SignInOptions = {
  /**
   * A random string used to prevent replay attacks.
   */
  nonce: string;

  /**
   * Start time at which the signature becomes valid.
   * ISO 8601 datetime.
   */
  notBefore?: string;

  /**
   * Expiration time at which the signature is no longer valid.
   * ISO 8601 datetime.
   */
  expirationTime?: string;
};

export type SignInResult = {
  signature: string;
  message: string;
};

export type SignIn = (options: SignInOptions) => Promise<SignInResult>;
```

## Feature: Add frame

The user can add a frame to their Farcaster app, either through an SDK action or directly (from a deep link, catalog page, etc). The Farcaster app should make it easy to find this saved frame in their UI and accept notifications from the app developer and deliver them to the user. For example, a frame which monitors onchain prices could notify users when the price of something exceeds a certain threshold.

![https://github.com/user-attachments/assets/b3d7fd68-b763-4f28-897a-f3a24cfc01fe](https://github.com/user-attachments/assets/b3d7fd68-b763-4f28-897a-f3a24cfc01fe)

**Request add frame**

Asks the user to add the frame to the Farcaster app, which allows the user to invoke the frame from a cast, composer or other locations in the app. Also allows the app to send notifications to the user.

### actions.addFrame

Request the user to add the frame, which adds it to the user's favorites list and allows the frame server to send in-app notifications to the user. The Farcaster client is expected to prompt the user for confirmation. Per session, only a single prompt should be shown (repeated calls to `addFrame()` should immediately result in a. `rejected_by_user` error). When the client supports notifications, returns a `notificationDetails` object with a notification callback URL and token.

![https://github.com/user-attachments/assets/cdc36744-7a20-4666-996b-ad2003f0afb9](https://github.com/user-attachments/assets/cdc36744-7a20-4666-996b-ad2003f0afb9)

```ts
> await sdk.actions.addFrame();
{
  "type": "success",
  "notificationDetails": {
    "url": "https://api.warpcast.com/v1/frame-notifications",
    "token": "a05059ef2415c67b08ecceb539201cbc6"
  }
}
```

```ts
type FrameNotificationDetails = {
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

export type AddFrame = () => Promise<AddFrameResult>;
```

There are 2 expected failure conditions which the frame should gracefully handle:

- `invalid_domain_manifest`: The frame domain manifest is invalid. The frame developer should use the developer tools to validate and fix their manifest.
- `rejected_by_user`: Returned when the user rejects/dismisses the prompt asking them to add the frame, or the frame has triggered `addFrame()` more than once per session.

## Feature: Social

### actions.viewProfile

Opens a native modal element with information about a Farcaster account.

```ts
> await sdk.actions.viewProfile({ fid });
```

```ts
export type ViewProfileOptions = {
  /**
   * FID of the account to view profile of
   */
  fid: string;
};
```

## Feature: Server Events

The Farcaster client server POSTs 4 types of events to the frame server at the `webhookUrl` specified in its frame manifest:

- `frame_added`
- `frame_removed`
- `notifications_enabled`
- `notifications_disabled`

The body looks like this:

Events use the [JSON Farcaster Signature](https://github.com/farcasterxyz/protocol/discussions/208) format and are signed with the app key of the user. The final format is:

```
{
  header: string;
  payload: string;
  signature: string;
}
```

All 3 values are `base64url` encoded. The payload and header can be decoded to JSON, where the payload is different per event.

### `frame_added`: frame added to a client

This event may happen when an open frame calls `actions.addFrame` to prompt the user to favorite it, or when the frame is closed and the user adds the frame elsewhere in the client application (e.g. from a catalog).

Adding a frame includes enabling notifications.

The Farcaster app server generates a unique `notificationToken` and sends it together with the `notificationUrl` that the frame must call, to both the Farcaster app client and the frame server. Client apps must generate unique tokens for each user.

The app client then resolves the `actions.addFrame` promise so the frame can react immediately (without having to check its server).

This is the flow for an open frame:

![Screenshot 2024-11-26 at 16 02 24](https://github.com/user-attachments/assets/00a79f2e-265b-4ec1-831f-28b3a2a6b6de)

This is the flow when the frame is not open; only the backend part runs:

![Screenshot 2024-11-26 at 16 02 35](https://github.com/user-attachments/assets/aae4d453-92f7-46c0-a44f-b0597e58fa43)

Webhook payload:

```
{
  "event": "frame-added",
  "notificationDetails": {
    "url": "https://api.warpcast.com/v1/frame-notifications",
    "token": "a05059ef2415c67b08ecceb539201cbc6"
  }
}
```

```ts
type EventFrameAddedPayload = {
  event: 'frame_added';
  notificationDetails?: FrameNotificationDetails;
};
```

### `frame_removed`: user removed frame from client

A user can remove a frame, which means that any notification tokens for that fid and client app (based on signer requester) should be considered invalid:

![Screenshot 2024-11-26 at 16 02 40](https://github.com/user-attachments/assets/079dfb74-77e4-47c8-b2e7-1b4628d1f162)

Webhook payload:

```
{
  "event": "frame-removed"
}
```

### `notifications_disabled`: user disabled notifications

A user can disable frame notifications from e.g. a settings panel in the client app. Any notification tokens for that fid and client app (based on signer requester) should be considered invalid:

![Screenshot 2024-11-26 at 16 03 04](https://github.com/user-attachments/assets/bcca0f58-3656-4a8c-bff8-8feda97bdc54)

Webhook payload:

```
{
  "event": "notifications_disabled"
}
```

### `notifications_enabled`: user enabled notifications

A user can enable frame notifications (e.g. after disabling them). The client backend again sends a `notificationUrl` and a `token`, with a backend-only flow:

![Screenshot 2024-11-26 at 16 02 48](https://github.com/user-attachments/assets/3ead1768-2efc-4785-9d4a-3a399f2dd0e6)

Webhook payload:

```
{
  "event": "notifications-enabled",
  "notificationDetails": {
    "url": "https://api.warpcast.com/v1/frame-notifications",
    "token": "a05059ef2415c67b08ecceb539201cbc6"
  }
}
```

```ts
type EventNotificationsEnabledPayload = {
  event: 'notifications_enabled';
  notificationDetails: FrameNotificationDetails;
};
```

## Feature: Frame Events

Farcaster clients emit events to your frame, while it is open, to let you know of actions the user takes.

To listen to events, you have to use `sdk.on` to register callbacks ([see full example](https://github.com/farcasterxyz/frames-v2-demo/blob/20d454f5f6b1e4f30a6a49295cbd29ca7f30d44a/src/components/Demo.ts#L92-L124)).

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

## Feature: Notifications API

A frame server can send notifications to one or more users who have enabled them.

The frame server is given an authentication token and a URL which they can use to push a notification to the specific Farcaster app that invoked the frame. This is private and must be done separately for each Farcaster app that a user may use.

![Screenshot 2024-11-27 at 16 50 36](https://github.com/user-attachments/assets/9b23ca16-a173-49a9-aa9f-7bc80c8abcf8)

The frame server calls the `notificationUrl` with:

- `notificationId`: a string (max size 128) that servers as an idempotency key and will be passed back to the frame via context. A Farcaster client should deliver only one notification per user per `notificationId`, even if called multiple times.
- `title`: title of the notification, max length of 32 characters
- `body`: body of the notification
- `targetUrl`: the target frame URL to open when a user clicks the notification. It must match the domain for which the notification token was issued.
- `tokens`: an array of tokens (for that `notificationUrl`) to send the notification to. Client servers may impose a limit here, e.g. max 10000 tokens.

Client servers may also impose a rate limit per `token`, e.g. 5 sends per 5 minutes.

The response from the client server must be an HTTP 200 OK, with the following 3 arrays:

- `successTokens`: tokens for which the notification succeeded
- `invalidTokens`: tokens which are no longer valid and should never be used again. This could happen if the user disabled notifications but for some reason the frame server has no record of it.
- `rateLimitedTokens`: tokens for which the rate limit was exceeded. Frame server can try later.

Once a user has been notified, when clicking the notification the client app will:

- Open `targetUrl`
- Set the context to the notification, see `NotificationLaunchContext`

Farcaster apps should:

1. Display a list of added frames somewhere in their UI, allowing the user to enable/disable notifications.
2. Show notifications from added frames along with other in-app notifications.

<a name="feature-triggers"></a>

## Feature: Triggers

### Contexts

A frame can be launched from different contexts like a cast or direct message. In each case, the frame app receives a context object that contains information about how the frame was triggered. The context may also define what SDK functions are available. For example, a "translate" frame launched from the `composer` context will have a method that allows it to update the cast being written, while one triggered from a `cast` context in the feed will only get the contents of the cast.

Contexts unify cast actions, composer actions, frames and mini-apps into a single standard, instead of having custom flows for each of these features.

A single frame may expose multiple cast and composer triggers via the TriggerConfig in its frame application manifest. When invoked, the context will include the ID of the trigger that was activated.

We intend to introduce additional triggers in the future, replacing "cast actions" and "composer actions" and introducing new launch contexts:

| Trigger  | Description                                                         | Context                                        |
| -------- | ------------------------------------------------------------------- | ---------------------------------------------- |
| cast     | Called when the app is invoked from a cast. (aka “cast action”)     | Cast hash, cast content, author ID, trigger ID |
| composer | Called when invoked from the cast composer. (aka “composer action”) | Cast parent, text, embeds, trigger ID          |
| channel  | Called when invoked from a channel profile                          | Channel key                                    |
| user     | Called when invoked from a user profile                             | User ID                                        |

**Context types**

```ts
type CastLaunchContext = {
  type: 'cast';
  triggerId: string; // comes from TriggerConfig
  cast: Cast;
};

type ComposerLaunchContext = {
  type: 'composer';
  triggerId: string; // comes from TriggerConfig
  cast: {
    parent?: string;
    text?: string;
    embeds?: string[];
  };
};

type ChannelLaunchContext = {
  type: 'channel';
  channel: {
    key: string;
    name: string;
    imageUrl: string;
  };
};

type UserLaunchContext = {
  type: 'user';
  profile: User;
};

type LinkLaunchContext = {
  type: 'link';
  url: string;
};

type DirectCastEmbedLaunchContext = {
  type: 'direct_cast_embed';
};
```

```ts
> sdk.context.location
{
  type: "cast_embed",
  cast: {
    fid: 3621,
    hash: "0xa2fbef8c8e4d00d8f84ff45f9763b8bae2c5c544",
    text: "New Yoink just dropped:",
    embeds: ["https://yoink.party/frames"]
  }
}
```

## Feature: Primary Button

### actions.setPrimaryButton

**Action Button**

A native action button may be rendered via an SDK call which provides a clear and consistent call to action for the user. The app frame can specify the text, color mode and callback function. This is optional and frames may choose to implement their own user interface using UI components inside the web view.

Set the Primary Button.

```ts
> await sdk.actions.setPrimaryButton({ text: "Yoink!" });
```

```ts
type SetPrimaryButton = (options: {
  text: string;
  enabled?: boolean;
  hidden?: boolean;
}) => Promise<void>;
```

An app frame should subscribe to the `primaryButtonClicked` event to respond to interactions.

### primaryButtonClick (Event)

Emitted when user clicks the Primary Button.

```ts
> Farcaster.events.on("primaryButtonClick", () => {
    console.log("clicked!") }
);
```
