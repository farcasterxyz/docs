# Frame Specification

A frame is a set of `<meta>` tags returned within the header of an HTML page. If a page contains all required frame properties, Farcaster apps will render the page as a frame. The frame `<meta>` tags extend the [OpenGraph protocol](https://ogp.me/).

Frames can be linked together to create dynamic applications that can be rendered inside Farcaster applications.

## Lifecycle of a frame app

A frame app begins with an initial frame which is cached by apps and shown to users. The frame may have buttons, which when clicked load other frames or redirect the user to external websites.

![Frame App](/assets/frame_app.png)

### Initial Frames

A frame app lives at a URL (e.g. foo.com/app) on the frame server. The frame server:

- Must return a valid frame in the HTTP headers
- Should return a body, in case the user clicks through to the frame in a browser.

### Response Frames

When a user clicks a button on a frame, the app makes a POST request to the frame server with a [frame signature](#frame-signature) which proves that the request came from the user. The server must respond with a new frame that is sent back to the user.

When a frame server receives a POST request:

- It must respond within 5 seconds.
- It must respond with a 200 OK and another frame, on a `post` button click.
- It must respond with a 302 OK and a Location header, on a `post_redirect` button click.
- Any location header provided must contain a URL that starts with `http` or `https`.

### Best Practices

Follow these best practices to work around the limitations of frames:

- Start your initial frame with a load button if you must show dynamic content.
- Add timestamps or uuids to image urls on subsequent frames to bust caches.
- Return a frame with a "refresh" button if your response takes > 5 seconds.

### Rendering Frames

A frame enters Farcaster when a user creates a cast and embeds the frame URL in it. An app that wants to support frames must:

- Check all call cast embed URLS for valid frames.
- If the frame is valid, it must render the frame when the cast is viewed.
- If the frame is malformed, it falls back to treating it as an OpenGraph embed.

## Constructing a frame

### Properties

A frame property is a meta tag with a property and a content value. The properties are always prefixed with `fc:frame`.

```html
<!-- An example declaring a frame and supported version -->

<meta property="fc:frame" content="vNext" />
```

### Required Properties

| Key              | Type   | Description                                                                                                                                                                               |
| ---------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fc:frame`       | string | A valid frame version string. The string must be a release date (e.g. 2020-01-01) or vNext. Apps must ignore versions they do not understand. Currently, the only valid version is vNext. |
| `fc:frame:image` | string | An image which should have an aspect ratio of 1.91:1                                                                                                                                      |
| `og:image`       | string | An image which should have an aspect ratio of 1.91:1. Fallback for clients that do not support frames.                                                                                    |

### Optional Properties

| Key                           | Type   | Description                                                                                                                                                                                                                                                                          |
| ----------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `fc:frame:button:$idx`        | string | A 256-byte string which is the label of the button at position $idx. A page may contain 0 to 4 buttons. If more than 1 button is present, the idx values must be in sequence starting from 1 (e.g., 1, 2, 3). If a broken sequence is present (e.g., 1, 2, 4), the frame is invalid. |
| `fc:frame:post_url`           | string | A 256-byte string which contains a valid URL to send the Signature Packet to.                                                                                                                                                                                                        |
| `fc:frame:button:$idx:action` | string | Must be `post` or `post_redirect`. Defaults to `post` if no value was specified.                                                                                                                                                                                                     |
| `fc:frame:input:text`         | string | Adding this property enables the text field. The content is a 32-byte label that is shown to the user (e.g., Enter a message).                                                                                                                                                       |

### Images

There are a few rules for serving images in `fc:frame:image` tags:

- The size of the image must be < 10 MB.
- The type of image must be jpg, png or gif.
- The image must either be a URL with content headers or a data URI.

Clients may resize larger images or crop those that do not fit in their aspect ratio. SVG images are discouraged because they can contain scripts and extra work must be done by clients to sanitize them.

## Rendering frames

Farcaster apps are responsible for rendering frames to users and proxying their interactions back to the frame server on their behalf.

When a URL is encountered embedded in a cast:

1. Apps must scrape the headers to check if the URL is a frame.
2. If the frame tags are valid, apps must render the frame.
3. If the frame tags are invalid or absent, apps must fallback to OpenGraph tags.
4. If OG tags are also absent, apps must render a placeholder error message.

Apps may render frames any time they are showing a cast to a viewer. The following rules apply to the rendering of frames:

1. Buttons must be displayed in ascending index order below the image.
2. Buttons may be displayed in multiple rows if space is a constraint.
3. Button with `post_redirect` action must be visually marked to users.
4. Text inputs must be displayed above the buttons and below the image.
5. Text input labels must be shown above or inside the text input.

A user may click any of the buttons in the Frame. When this happens, apps must:

1. Construct a Frame Signature Packet.
2. POST the packet to the `post_url` if present, and the cast's embed URL otherwise.
3. Wait at least 5 seconds for a response from the frame server.

Applications will receive responses from frame servers after a POST request is submitted. The following rules apply to the handling of these responses:

1. If the button was a `post` button, treat all non-200 responses as errors.
2. If the button was a `post_redirect` button, treat all non-30X responses as errors.
3. If handling a 30X response, apps must redirect the user to the url location value.
4. If handling a 30X response, apps must ensure the url starts with `http` or `https`.
5. If handling a 30X response, warn the user before directing them to an untrusted site.

## Securing frames

Frames are highly sandboxed environments that do not allow direct access to Ethereum wallets. However, there are still some security concerns that must be addressed by both frame developers and apps that implement frames.

### Frame Developers

1. Sanitize all input received from the user via text inputs.

### App Developers

1. Proxy image requests to prevent frame servers from tracking users.
2. Sanitize redirect URLs to ensure they start with `http` or `https`.
3. Only accept data URIs if they are images.
4. Avoid rendering SVG's as they may contain executable code.
5. Validate signatures before using the data in a frame signature packet.

## Data Structures

### Frame Signature

A Frame signature proves that a user clicked a frame button. It is created by the Farcaster app, signed by the user's account and sent to the Frame server.

When a frame button is clicked, the Farcaster app must generate a `FrameAction` protobuf. A FrameAction is a new type of [Farcaster message](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#2-message-specifications). Like all FC messages, it must be signed with an active Ed25519 account key (aka signer) that belongs to the user.

```protobuf
message FrameActionBody {
  bytes frame_url = 1;    // The URL of the frame app
  bytes button_index = 2; // The index of the button that was clicked
  CastId cast_id = 3;     // The cast which contained the frame URĽ
  bytes input_text = 4;   // The text from the user input (if any)
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

### Frame Signature Packet

A signature packet is a JSON object sent to the Frame server when a button is clicked. It contains two objects:

1. **Signed Message** — an authenticated protobuf that represents the user action. must be unpacked by a farcaster hub to read the data inside.

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

The Signed Message can be validated by calling the `validateMessage` API on Hubs, as shown in the script below. See the [Hub HTTP API](https://docs.farcaster.xyz/reference/hubble/httpapi/submitmessage) for reference. The hub (assuming it’s fully in sync) will validate the following:

- the fid is a valid, registered farcaster fid
- the signer is currently active and associated with the fid
- the message hash is correct (contents match the hash)
- the signature for the message is valid, and came from the signer
- the FrameActionBody passes the above validations

## Improvement Proposals

The following ideas are being explored actively as extensions to the frame specification:

- A simpler redirect system to make it easy for frames to redirect users.
- A refresh period, to bust the cache for the original frame url.
- An idempotency key, to prevent duplicate requests.
- An authentication system, to let users log into other applications via frames.
- A transaction button, to allow frames to execute transactions for users.
- A square image, to allow for more flexibility in image sizes.
- A JSON response type, to allow for more flexibility in frame responses.
