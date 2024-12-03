---
title: Frames v2 Specification
---

# Frames v2 Specification

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

```tsx
type FrameEmbed = {
  // Frame spec version. Required.
  // Example: "next"
  version: 'next';

  // Frame image. Must be 3:2 aspect ratio. Must be less than 10 MB.
  // Example: "https://yoink.party/img/start.png"
  imageUrl: string;

  // Button attributes
  button: {
    // Button text. Required.
    // Example: "Yoink Flag"
    title: string;

    // Action attributes
    action: {
      // Action type. Must be "launch_frame".
      type: 'launch_frame';

      // App name.
      // Example: "Yoink!"
      name: string;

      // Frame launch URL.
      // Example: "https://yoink.party/"
      url: string;

      // 200x200px splash image URL. Must be less than 1MB.
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

```tsx
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

```tsx
{
  domain: string;
}
```

The domain in the signed object must match the domain the manifest is served from.

**Frame Config**

```tsx
type FrameConfig = {
  // Manifest version. Required.
  // Example: "0.0.0"
  version: string;

  // App name. Required.
  // Example: "Yoink!"
  name: string;

  // Default launch URL. Required
  // Example: "https://yoink.party/"
  homeUrl: string;

  // 200x200px frame application icon URL. Must be less than 1MB.
  // Example: "https://yoink.party/img/icon.png"
  iconUrl: string;

  // 200x200px splash image URL. Must be less than 1MB.
  // Example: "https://yoink.party/img/splash.png"
  splashImageUrl?: string;

  // Hex color code.
  // Example: "#eeeee4"
  splashBackgroundColor?: string;

  // URL to which clients will POST events.
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

```tsx
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

### context.location

Contains information about the context from which the frame was launched.

```tsx
type LaunchContext = CastEmbedLaunchContext | NotificationLaunchContext;
```

**Cast Embed**

```tsx
> sdk.context.location
{
  type: "embed",
  cast: {
    fid: 3621,
    hash: "0xa2fbef8c8e4d00d8f84ff45f9763b8bae2c5c544",
    text: "New Yoink just dropped:",
    embeds: ["https://yoink.party/frames"]
  }
}
```

```tsx
type Cast = {
  fid: number;
  hash: string;
  text: string;
  embeds: string[];
  mentions: Mention[];
};

type CastEmbedLaunchContext = {
  type: 'cast';
  cast: Cast;
};
```

**Notification**

```tsx
> sdk.context.location
{
  type: "notification",
  notification: {
    title: "Yoinked!",
    body: "horsefacts captured the flag from you.",
    id: "f7e9ebaf-92f0-43b9-a410-ad8c24f3333b"
  }
}
```

```tsx
type NotificationLaunchContext = {
  type: 'notification';
  notification: {
    title: string;
    body: string;
    id: string;
  };
};
```

### context.user

Details about the calling user which can be used to customize the interface. This should be considered untrusted since it is passed in by the application, and there is no guarantee that it was authorized by the user.

```tsx
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

```tsx
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
  custodyAddress: string;
  verifiedAddresses: {
    ethereum: string[];
    solana: string[];
  };
  connectedAccounts: {
    platform: string;
    username: string;
  }[];
};
```

### actions.ready

Indicates that the application is fully loaded and ready to displayed to users. Once this is called the loading screen will be hidden. Frame applications MUST call `ready()` to display their app.

```tsx
> await sdk.actions.ready();
```

```tsx
type Ready: () => Promise<void>;
```

### actions.openUrl

Request the client app to direct the user to an external URL via deep link or web browser.

```tsx
> await sdk.actions.openUrl({ url: "<https://yoink.today/>" });
```

```tsx
type OpenExternalUrl = (options: {
  url: string;
  close?: boolean;
}) => Promise<void>;
```

### actions.close

Close the app frame and display an optional toast.

```tsx
> await sdk.actions.close({ toast: {
    message: "You yoinked the flag from @deodad."
  }
});
```

```tsx
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

```tsx
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

Provide a trustworthy form of authentication similar to signed Frame Messages in Frames v1

### actions.requestAuthToken

Requests a JSON token that can make authenticated requests to a server on behalf of the user. This request is executed in the background and no UI is shown to the user. Tokens are self-verifying and can be authenticated by checking the signature against a hub API.

```tsx
> await sdk.actions.requestAuthToken();
"0xabcd...1234"
```

```tsx
type RequestAuthToken = (
  options: Partial<{
    /**
     * When this token should be considered invalid.
     * @default 15 minutes from now
     */
    exp?: number;
  }>
) => Promise<string>;
```

**TBD:**

- Token scheme and verification method

## Feature: Add frame

The user can add a frame to their Farcaster app, either through an SDK action or directly (from a deep link, catalog page, etc). The Farcaster app should make it easy to find this saved frame in their UI and accept notifications from the app developer and deliver them to the user. For example, a frame which monitors onchain prices could notify users when the price of something exceeds a certain threshold.

![https://github.com/user-attachments/assets/b3d7fd68-b763-4f28-897a-f3a24cfc01fe](https://github.com/user-attachments/assets/b3d7fd68-b763-4f28-897a-f3a24cfc01fe)

**Request add frame**

Asks the user to add the frame to the Farcaster app, which allows the user to invoke the frame from a cast, composer or other locations in the app. Also allows the app to send notifications to the user.

### actions.addFrame

Request the user to add the frame, which adds it to the user's favorites list and allows the frame server to send in-app notifications to the user. The Farcaster client is expected to prompt the user for confirmation. Per session, only a single prompt should be shown (repeated calls to `addFrame()` should immediately result in a. `rejected-by-user` error). When the client supports notifications, returns a `notificationDetails` object with a notification callback URL and token.

![https://github.com/user-attachments/assets/cdc36744-7a20-4666-996b-ad2003f0afb9](https://github.com/user-attachments/assets/cdc36744-7a20-4666-996b-ad2003f0afb9)

```tsx
> await sdk.actions.addFrame();
{
  "type": "success",
  "notificationDetails": {
    "url": "https://api.warpcast.com/v1/frame-notification",
    "token": "a05059ef2415c67b08ecceb539201cbc6"
  }
}
```

```tsx
type FrameNotificationDetails = {
  url: string;
  token: string;
};

export type AddFrameResult =
  | {
      type: 'success';
      notificationDetails?: FrameNotificationDetails;
    }
  | {
      type: 'error';
      errorReason: 'invalid-domain-manifest' | 'rejected-by-user';
    };

export type AddFrame = () => Promise<AddFrameResult>;
```

There are 2 expected failure conditions which the frame should gracefully handle:

- `invalid-domain-manifest`: The frame domain manifest is invalid. The frame developer should use the developer tools to validate and fix their manifest.
- `rejected-by-user`: Returned when the user rejects/dismisses the prompt asking them to add the frame, or the frame has triggered `addFrame()` more than once per session.

## Feature: Events

The Farcaster client server POSTs 4 types of events to the frame server at the `webhookUrl` specified in its frame manifest:

- `frame-added`
- `frame-removed`
- `notifications-enabled`
- `notifications-disabled`

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

### `frame-added`: frame added to a client

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

A user can remove a frame, which means that any notification tokens for that fid and client app (based on signer requester) should be considered invalid:

![Screenshot 2024-11-26 at 16 02 40](https://github.com/user-attachments/assets/079dfb74-77e4-47c8-b2e7-1b4628d1f162)

Webhook payload:

```
{
  "event": "frame-removed"
}
```

### `notifications-disabled`: user disabled notifications

A user can disable frame notifications from e.g. a settings panel in the client app. Any notification tokens for that fid and client app (based on signer requester) should be considered invalid:

![Screenshot 2024-11-26 at 16 03 04](https://github.com/user-attachments/assets/bcca0f58-3656-4a8c-bff8-8feda97bdc54)

Webhook payload:

```
{
  "event": "notifications-disabled"
}
```

### `notifications-enabled`: user enabled notifications

A user can enable frame notifications (e.g. after disabling them). The client backend again sends a `notificationUrl` and a `token`, with a backend-only flow:

![Screenshot 2024-11-26 at 16 02 48](https://github.com/user-attachments/assets/3ead1768-2efc-4785-9d4a-3a399f2dd0e6)

Webhook payload:

```
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

### Feature: Notifications API

A frame server can send notifications to one or more users who have enabled them.

The frame server is given an authentication token and a URL which they can use to push a notification to the specific Farcaster app that invoked the frame. This is private and must be done separately for each Farcaster app that a user may use.

![Screenshot 2024-11-27 at 16 50 36](https://github.com/user-attachments/assets/9b23ca16-a173-49a9-aa9f-7bc80c8abcf8)

The frame server calls the `notificationUrl` with:

- `notificationId`: a UUIDv4 identifier of the notification that will be passed back to the frame app via context.
- `title`: title of the notification
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

```tsx
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

```tsx
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

```tsx
> await sdk.actions.setPrimaryButton({ text: "Yoink!" });
```

```tsx
type SetPrimaryButton = (options: {
  text: string;
  enabled?: boolean;
  hidden?: boolean;
}) => Promise<void>;
```

An app frame should subscribe to the `primaryButtonClicked` event to respond to interactions.

### primaryButtonClick (Event)

Emitted when user clicks the Primary Button.

```tsx
> Farcaster.events.on("primaryButtonClick", () => {
    console.log("clicked!") }
);
```
