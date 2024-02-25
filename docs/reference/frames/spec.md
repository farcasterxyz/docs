# Frame Specification

Frames are a standard for creating interactive and authenticated experiences on Farcaster, embeddable in any Farcaster client.

A frame is a set of `<meta>` tags returned within the `<head>` of an HTML page. If a page contains all required frame properties, Farcaster apps will render the page as a frame. The frame `<meta>` tags extend the [OpenGraph protocol](https://ogp.me/).

Frames can be linked together to create dynamic applications embedded inside casts.

## Lifecycle of a frame app

A frame app begins with an initial frame which is cached by apps and shown to users. A frame must have an image. It may have buttons, which when clicked load other frames or redirect the user to external websites.

![Frame App](/assets/frame_app.png)

### Initial Frames

A frame is an HTML web application that lives at a URL (e.g. foo.com/app) on a web server. We'll refer to this web server as the "frame server."

The frame server:

- Must return a valid frame in the HTML `<head>` section.
- Should return a valid HTML `<body>`, in case the user clicks through to the frame in a browser.
- Should not include dynamic content in the initial frame, since it is cached by Farcaster clients.
- Should not include an `fc:frame:state` tag.

### Response Frames

When a user clicks a button on a frame, the app makes a POST request to the frame server with a [frame signature](#frame-signature) which proves that the request came from the user. The server must respond with a new frame that is sent back to the user.

When a frame server receives a POST request:

- It must respond within 5 seconds.
- It must respond with a 200 OK and another frame, on a `post` button click.
- It must respond with a 302 OK and a Location header, on a `post_redirect` button click.
- Any Location header provided must contain a URL that starts with `http://` or `https://`.

### Best Practices

Follow these best practices to work around the limitations of frames:

- Start your initial frame with a load button if you must show dynamic content.
- Add timestamps or UUIDs to image urls on subsequent frames to bust caches.
- Return a frame with a "refresh" button if your response takes > 5 seconds.

### Rendering Frames

A frame enters Farcaster when a user creates a cast and embeds the frame URL in it. An app that wants to support frames must:

- Check all call cast embed URLs for valid frames.
- If the frame is valid, render the frame when the cast is viewed.
- If the frame is malformed, fall back to treating it as an OpenGraph embed.
- Follow the frame [security model](#securing-frames).

## Constructing a frame

A frame must include required properties and may contain optional properties. Frames can be validated using the [Frame Validator](https://warpcast.com/~/developers/frames) tool provided by Warpcast.

### Properties

A frame property is a meta tag with a property and a content value. The properties are always prefixed with `fc:frame`.

```html
<!-- An example declaring a frame and supported version -->

<meta property="fc:frame" content="vNext" />
```

### Required Properties

| Key              | Description                                                                                                                                                                               |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fc:frame`       | A valid frame version string. The string must be a release date (e.g. 2020-01-01) or vNext. Apps must ignore versions they do not understand. Currently, the only valid version is vNext. |
| `fc:frame:image` | An image which should have an aspect ratio of 1.91:1 or 1:1                                                                                                                               |
| `og:image`       | An image which should have an aspect ratio of 1.91:1. Fallback for clients that do not support frames.                                                                                    |

### Optional Properties

| Key                           | Description                                                                                                                                                                                                                                                                          |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `fc:frame:button:$idx`        | A 256-byte string which is the label of the button at position $idx. A page may contain 0 to 4 buttons. If more than 1 button is present, the idx values must be in sequence starting from 1 (e.g., 1, 2, 3). If a broken sequence is present (e.g., 1, 2, 4), the frame is invalid. |
| `fc:frame:post_url`           | A 256-byte string which contains a valid URL to send the Signature Packet to.                                                                                                                                                                                                        |
| `fc:frame:button:$idx:action` | Must be `post`, `post_redirect`, `mint` or `link`. Defaults to `post` if not specified.                                                                                                                                                                                              |
| `fc:frame:button:$idx:target` | A 256-byte string which determines the target of the action.                                                                                                                                                                                                                         |
| `fc:frame:input:text`         | Adding this property enables the text field. The content is a 32-byte label that is shown to the user (e.g., Enter a message).                                                                                                                                                       |
| `fc:frame:image:aspect_ratio` | Must be either `1.91:1` or `1:1`. Defaults to `1.91:1`                                                                                                                                                                                                                               |
| `fc:frame:state`              | A string containing serialized state (e.g. JSON) passed to the frame server. May be up to 4096 bytes.                                                                                                                                                                                |

### Images

There are a few rules for serving images in `fc:frame:image` tags:

- The size of the image must be < 10 MB.
- The type of image must be jpg, png or gif.
- The image source must either be an external resource with content headers or a data URI.

Clients may resize larger images or crop those that do not fit in their aspect ratio. SVG images are not because they can contain scripts and extra work must be done by clients to sanitize them.

Frame servers can use cache headers to refresh images and offer more dynamic first frame experiences:

- Frame servers can use the `max-age` directive in the HTTP `Cache-Control` header to ensure images in the initial frame refresh automatically. A lower `max-age` ensures images update regularly without user interactions.
- App developers should respect cache headers set by the original frame image, and their image proxy implementations should not interfere with durations.

## Displaying frames in a feed

Farcaster apps are responsible for rendering frames to users and proxying their interactions back to the frame server on their behalf.

### Parsing Frames

When a URL is encountered embedded in a cast:

1. Apps must scrape the headers to check if the URL is a frame.
2. If the frame tags are valid, apps must render the frame.
3. If the frame tags are invalid or absent, apps must fallback to OpenGraph tags.
4. If OG tags are also absent, apps must render a placeholder error message.

### Rendering Frames

Apps may render frames any time they are showing a cast to a viewer. The following rules apply to the rendering of frames:

1. Buttons must be displayed in ascending index order below the image.
2. Buttons may be displayed in multiple rows if space is a constraint.
3. Text inputs must be displayed above the buttons and below the image.
4. Text input labels must be shown above or inside the text input.
5. Apps must respect the aspect ratio set in the `fc:frame:image:aspect_ratio` property.

If the button is a `post_redirect` or `link` action:

1. It must be visually marked with a redirect symbol.
2. Users should be warned when leaving the app for untrusted sites.

If the button is a `mint` action, the following rules also apply:

1. Must validate that a [CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-10.md) URL is present in the `target` property.
2. Must display the item as an NFT, if all the properties are valid.

### Handling Clicks

If the button clicked is a `post` or `post_redirect`, apps must:

1. Construct a Frame Signature Packet.
2. POST the packet to `fc:frame:button:$idx:target` if present
3. POST the packet to `fc:frame:post_url` if target was not present.
4. POST the packet to or the frame's embed URL if neither target nor action were present.
5. Wait at least 5 seconds for a response from the frame server.

If the button clicked is a `mint`, apps should:

1. Allow the user to mint the NFT or open an external page that allows this functionality.

### Handling Responses

Applications will receive responses from frame servers after a POST request is submitted. The following rules apply to the handling of these responses:

1. If the button action was `post`, treat all non-200 responses as errors.
2. If the button action was `post_redirect`, treat all non-30X responses as errors.
3. If handling a 30X response, apps must redirect the user to the url location value.
4. If handling a 30X response, apps must ensure the url starts with `http://` or `https://`.
5. If handling a 30X response, warn the user before directing them to an untrusted site.

## Securing frames

Frames are highly sandboxed environments that do not allow direct access to Ethereum wallets. However, there are still some security concerns that must be addressed by both frame developers and apps that implement frames.

### Frame Developers

1. Sanitize all input received from the user via text inputs.
2. Verify the signature of a frame signature packet.
3. Validate the origin URL in the frame signature packet.

### App Developers

1. Proxy image requests to prevent frame servers from tracking users.
2. Sanitize redirect URLs to ensure they start with `http://` or `https://`.
3. Only accept data URIs if they are images.
4. Avoid rendering SVGs as they may contain executable code.

## Data Structures

### Frame Signature

A Frame signature proves that a user clicked a frame button. It is created by the Farcaster app, signed by the user's account and sent to the Frame server.

When a frame button is clicked, the Farcaster app must generate a `FrameAction` protobuf. A FrameAction is a new type of [Farcaster message](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#2-message-specifications). Like all FC messages, it must be signed with an active Ed25519 account key (aka signer) that belongs to the user.

```proto
message FrameActionBody {
  bytes frame_url = 1;    // The URL of the frame app
  bytes button_index = 2; // The index of the button that was clicked
  CastId cast_id = 3;     // The cast which contained the frame URĽ
  bytes input_text = 4;   // The text from the user input (if any)
  bytes state = 5;        // Serialized frame state value
}

// MessageType and MessageData are extended to support the FrameAction

enum MessageType {
  .....
  MESSAGE_TYPE_FRAME_ACTION = 13;
}

message MessageData {
  oneof body {
		...
		FrameActionBody frame_action_body = 16
  }
}
```

A FrameActionBody in a message `m` is valid only if it passes these validations:

1. `m.signature_scheme` must be `SIGNATURE_SCHEME_ED25519`.
2. `m.data.type` must be `MESSAGE_TYPE_FRAME_ACTION`
3. `m.data.body.type` must be a valid `UserDataType`
4. `m.data.body.url`  must be <= 256 bytes
5. `m.data.body.button_index` index must be ≥1 and ≤4.
6. `m.data.body.input_text`  must be <= 256 bytes
7. `m.data.body.state`  must be <= 4096 bytes

### Frame Signature Packet

A signature packet is a JSON object sent to the Frame server when a button is clicked. It contains two objects:

1. **Signed Message** — an authenticated protobuf that represents the user action. This message must be unpacked by a farcaster hub to read the data inside.

2. **Unsigned Message** — an unathenticated JSON object that represents the user action. can be read directly.

::: warning
Unsigned messages can be spoofed and should usually be ignored. It is only safe to use them if you are performing an unauthenticated request.

If you are unsure, always read the signed message by sending it into the `validateMessage` endpoint on hubs and only trust the data it returns.
:::

```json
{
  "untrustedData": {
    "fid": 2,
    "url": "https://fcpolls.com/polls/1",
    "messageHash": "0xd2b1ddc6c88e865a33cb1a565e0058d757042974",
    "timestamp": 1706243218,
    "network": 1,
    "buttonIndex": 2,
    "inputText": "hello world", // "" if requested and no input, undefined if input not requested
    "state": "%7B%22counter%22%3A1%7D",
    "castId": {
      "fid": 226,
      "hash": "0xa48dd46161d8e57725f5e26e34ec19c13ff7f3b9"
    }
  },
  "trustedData": {
    "messageBytes": "d2b1ddc6c88e865a33cb1a565e0058d757042974..."
  }
}
```

The Signed Message can be validated by calling the `validateMessage` API on Hubs, as shown in the script below. See the [Hub HTTP API](../../reference/hubble/httpapi/message#validatemessage) for reference. The hub (assuming it’s fully in sync) will validate the following:

- the fid is a valid, registered farcaster fid
- the signer is currently active and associated with the fid
- the message hash is correct (contents match the hash)
- the signature for the message is valid, and came from the signer
- the FrameActionBody passes the above validations

::: warning
Hubs perform important validations in addition to verifying a signature packet's Ed25519 signature.

Although it may be possible to validate an Ed25519 signature onchain, a valid signature is insufficient to fully authenticate a frame message packet. Applications must also check that the fid is valid, the signer key is active, and the message body is valid. Outside of OP mainnet, it is difficult to perform these validations onchain.
:::

## vNext Changelog

| Date    | Change                                                                                                                                                        |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2/8/24  | Frames can have [NFT mint buttons](https://warpcast.notion.site/Frames-Mint-action-Public-cea0d2249e3e41dbafb2e9ab23107275) and images with 1:1 aspect ratio. |
| 2/6/24  | Frames can define [simple links to external pages](https://warpcast.notion.site/Frames-External-Links-Public-60c9900cffae4e2fb1b6aae3d4601c15?pvs=4).         |
| 2/2/24  | Frames can [accept text input](https://warpcast.notion.site/Frames-Text-Input-Public-27c9f0d61903486d89b6d932dd0d6a22).                                       |
| 1/30/24 | Frames [validator](https://warpcast.com/~/developers/frames) launched.                                                                                        |
| 1/29/24 | Frames support redirecting after the post action.                                                                                                             |
| 1/26/24 | Frames launched.                                                                                                                                              |

## vNext Proposed Changes

The following ideas are being explored actively as extensions to the frame specification:

- A transaction button, to allow frames to execute transactions for users.
- A refresh period, to bust the cache for the original frame url.
- An idempotency key, to prevent duplicate requests.
- An authentication system, to let users log into other applications via frames.
- A JSON response type, to allow for more flexibility in frame responses.
