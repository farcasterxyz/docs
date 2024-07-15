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
- It must respond with a 200 OK and another frame, on a `post` button click to indicate success.
- It must respond with a 302 OK and a Location header, on a `post_redirect` button click to indicate success.
- It may respond with 4XX status, `content-type: application/json` header, and JSON body containing a `message` property that is <= 90 characters to indicate an application-level error.
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

| Key                             | Description                                                                                                                                                                                                                                                                          |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `fc:frame:post_url`             | A 256-byte string which contains a valid URL to send the Signature Packet to.                                                                                                                                                                                                        |
| `fc:frame:button:$idx`          | A 256-byte string which is the label of the button at position $idx. A page may contain 0 to 4 buttons. If more than 1 button is present, the idx values must be in sequence starting from 1 (e.g., 1, 2, 3). If a broken sequence is present (e.g., 1, 2, 4), the frame is invalid. |
| `fc:frame:button:$idx:action`   | Must be `post`, `post_redirect`, `link`, `mint` or `tx`. Defaults to `post` if not specified. See [Button Actions](#button-actions) for details on each action.                                                                                                                      |
| `fc:frame:button:$idx:target`   | A 256-byte string which determines the target of the action.                                                                                                                                                                                                                         |
| `fc:frame:button:$idx:post_url` | A 256-byte string that defines a button-specific URL to send the Signature Packet to. If set, this overrides `fc:frame:post_url`.                                                                                                                                                    |
| `fc:frame:input:text`           | Adding this property enables the text field. The content is a 32-byte label that is shown to the user (e.g., Enter a message).                                                                                                                                                       |
| `fc:frame:image:aspect_ratio`   | Must be either `1.91:1` or `1:1`. Defaults to `1.91:1`                                                                                                                                                                                                                               |
| `fc:frame:state`                | A string containing serialized state (e.g. JSON) passed to the frame server. May be up to 4096 bytes.                                                                                                                                                                                |

## Button Actions

### `post`

```html
<meta name="fc:frame:post_url" content="https://frame.example.com/start" />
<meta name="fc:frame:button:1" content="Start" />
```

The `post` action sends an HTTP POST request to the frame or button `post_url`. This is the default button type.

The frame server receives a Signature Packet in the POST body, which includes information about which button was clicked, text input, and the cast context. The frame server must respond with a 200 OK and another frame.

### `post_redirect`

```html
<meta name="fc:frame:post_url" content="https://frame.example.com/redirect" />
<meta name="fc:frame:button:1" content="Redirect" />
<meta name="fc:frame:button:1:action" content="post_redirect" />
```

The `post_redirect` action sends an HTTP POST request to the frame or button `post_url`. You can use this action to redirect to a URL based on frame state or user input.

The frame server receives a Signature Packet in the POST body. The frame server must respond with a 302 Found and Location header that starts with `http://` or `https://`.

### `link`

```html
<meta name="fc:frame:button:1" content="Farcaster Docs" />
<meta name="fc:frame:button:1:action" content="link" />
<meta name="fc:frame:button:1:target" content="https://docs.farcaster.xyz" />
```

The `link` action redirects the user to an external URL. You can use this action to redirect to a URL without handling a POST request to the frame server.

Clients do not make a request to the frame server for `link` actions. Instead, they redirect the user to the `target` URL.

### `mint`

```html
<meta name="fc:frame:button:1" content="Mint" />
<meta name="fc:frame:button:1:action" content="mint" />
<meta
  name="fc:frame:button:1:target"
  content="eip155:8453:0xf5a3b6dee033ae5025e4332695931cadeb7f4d2b:1"
/>
```

The `mint` action allows the user to mint an NFT. Clients that support relaying or initiating onchain transactions may enhance the mint button by relaying a transaction or interacting with the user's wallet. Clients that do not fall back to linking to an external URL.

The `target` property must be a valid `CAIP-10` address, plus an optional token ID.

### `tx`

```html
<meta property="fc:frame:button:1" content="Transaction" />
<meta property="fc:frame:button:1:action" content="tx" />
<meta
  property="fc:frame:button:1:target"
  content="https://frame.example.com/get_tx_data"
/>
<meta
  property="fc:frame:button:1:post_url"
  content="https://frame.example.com/tx_callback"
/>
```

The `tx` action allows a frame to request the user takes an action in their connected wallet. Unlike other action types, `tx` actions have multiple steps.

First, the client makes a POST request to the `target` URL to fetch data about the wallet action. The frame server receives a Signature Packet in the POST body, including the address of the connected wallet. The frame server must respond with a 200 OK and a JSON response describing the wallet action:

```json
{
  method: "eth_sendTransaction",
  chainId: "eip155:10",
  params: {
    abi: [...], // JSON ABI of the function selector and any errors
    to: "0x00000000fcCe7f938e7aE6D3c335bD6a1a7c593D",
    data: "0x783a112b0000000000000000000000000000000000000000000000000000000000000e250000000000000000000000000000000000000000000000000000000000000001",
    value: "984316556204476",
  },
}
```

The client uses this data to request an action in the user's wallet. If the user completes the action, the client makes a POST request to the `post_url` with a Signature Packet that includes the transaction or signature hash in `transaction_id` and the address used in `address`. The frame server must respond with a 200 OK and another frame. The frame server may monitor the transaction hash to determine if the transaction succeeds, reverts, or times out.

#### Wallet Action Response Type

A wallet action response must be one of the following:

##### EthSendTransactionAction

- `chainId`: A CAIP-2 chain ID to identify the tx network (e.g. Ethereum mainnet)
- `method`: Must be `"eth_sendTransaction"`
- `attribution`: Optional. Return `false` to omit the [calldata attribution suffix](https://www.notion.so/Frame-Transactions-Public-9d9f9f4f527249519a41bd8d16165f73?pvs=21). If this value is `undefined` or `true`, clients will append the attribution suffix.
- `params`: 
    - `to`: transaction to address
    - `abi`: JSON ABI which **must** include encoded function type and **should** include potential error types. Can be empty.
    - `value`: value of ether to send with the transaction in wei. Optional.
    - `data`: transaction calldata. Optional.

```ts
type EthSendTransactionAction = {
  chainId: string;
  method: "eth_sendTransaction";
  attribution?: boolean; 
  params: {
    abi: Abi | [];
    to: string;
    value?: string;
    data?: string;
  }
}
```

##### EthSignTypedDataV4

See [EIP-712](https://eips.ethereum.org/EIPS/eip-712).

- `chainId`: A CAIP-2 chain ID to identify the tx network (e.g. Ethereum mainnet)
- `method`: Must be `"eth_signTypedData_v4"`
- `params`: 
    - `domain`: the typed domain
    - `types`: the type definitions for the typed data
    - `primaryType`: the primary type to extract from types and use in value.
    - `message`: typed message

```ts
type EthSignTypedDataV4Action = {
  chainId: string;
  method: "eth_signTypedData_v4";
  params: {
    domain: {
      name?: string;
      version?: string;
      chainId?: number;
      verifyingContract?: string;
    };
    types: Record<string, unknown>;
    primaryType: string;
    message: Record<string, unknown>;
  }
}
```

**Supported Chains**

| Network  | Chain ID           |
| -------- | ------------------ |
| Ethereum | `eip155:1`         |
| Arbitrum | `eip155:42161`     |
| Base     | `eip155:8453`      |
| Degen    | `eip155:666666666` |
| Gnosis   | `eip155:100`       |
| Optimism | `eip155:10`        |
| Zora     | `eip155:7777777`   |

| Testnet          | Chain ID          |
| ---------------- | ----------------- |
| Sepolia          | `eip155:11155111` |
| Arbitrum Sepolia | `eip155:421614`   |
| Base Sepolia     | `eip155:84532`    |
| Optimism Sepolia | `eip155:11155420` |

### Images

There are a few rules for serving images in `fc:frame:image` tags:

- The size of the image must be < 10 MB.
- The type of image must be jpg, png or gif.
- The image source must either be an external resource with content headers or a data URI.

Clients may resize larger images or crop those that do not fit in their aspect ratio. SVG images are not allowed because they can contain scripts and extra work must be done by clients to sanitize them.

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

If the button is a `mint` action:

1. Must validate that a [CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-10.md) URL is present in the `target` property.
2. Must display the item as an NFT, if all the properties are valid.

If the button is a `tx` action:

1. Must visually indicate that a `tx` button will request a wallet transaction.
2. Must display the button label provided by the frame.

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
6. If handling an application-level error response, display the `message` to end-user.

## Securing frames

There are important security concerns that must be addressed by both frame developers and apps that implement frames.

### Frame Developers

1. Sanitize all input received from the user via text inputs.
2. Verify the signature of a frame signature packet.
3. Validate the origin URL in the frame signature packet.
4. Load transaction calldata only from trusted origins.

### App Developers

1. Proxy image requests to prevent frame servers from tracking users.
2. Sanitize redirect URLs to ensure they start with `http://` or `https://`.
3. Only accept data URIs if they are images.
4. Avoid rendering SVGs as they may contain executable code.

Apps should consider the following mechanisms to protect users against malicious transactions:

1. Transaction simulation.
2. Domain allowlisting and banlisting to stop known attackers.
3. Social graph analysis to detect potential bad or untrusted actors.
4. Educating users about the potential dangerous of transactions and using a wallet with limited balances.

## Data Structures

### Frame Signature

A Frame signature proves that a user clicked a frame button. It is created by the Farcaster app, signed by the user's account and sent to the Frame server.

When a frame button is clicked, the Farcaster app must generate a `FrameAction` protobuf. A FrameAction is a new type of [Farcaster message](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#2-message-specifications). Like all FC messages, it must be signed with an active Ed25519 account key (aka signer) that belongs to the user.

```proto
message FrameActionBody {
  bytes frame_url = 1;      // The URL of the frame app
  bytes button_index = 2;   // The index of the button that was clicked
  CastId cast_id = 3;       // The cast which contained the frame URĽ
  bytes input_text = 4;     // The text from the user input (if any)
  bytes state = 5;          // Serialized frame state value
  bytes transaction_id = 6; // Transaction ID
  bytes address = 7;        // User's connected address
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
8. `m.data.body.transaction_id`  must be <= 256 bytes
9. `m.data.body.address`  must be <= 64 bytes

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
    "transactionId": "0x83afec0f72e32d2409ceb7443dc9e01443d0dec6d38ab454bf20918cf633a455",
    "address": "0xf6ea479f30a71cc8cb28dc28f9a94246e1edc492",
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

| Date    | Change                                                                                                                                                                                          |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 7/10/24 | Frames should include the address that took a wallet action when posting back to target.
| 7/10/24 | Frames can request [EIP-712 signatures](https://www.notion.so/warpcast/Frames-Wallet-Signatures-debe97a82e2643d094d4088f1badd791?pm=c).                                                     |
| 3/25/24 | Frames can surface [application-level errors](https://warpcast.notion.site/Frames-Errors-ddc965b097d44d9ea03ddf98498597c6?pvs=74) to users.                                                     |
| 3/8/24  | Frames can request [transactions](https://www.notion.so/warpcast/Frame-Transactions-Public-9d9f9f4f527249519a41bd8d16165f73#c1c3182208ce4ae4a7ffa72129b9795a) from the user's connected wallet. |
| 2/25/24 | Frames can pass [state](https://www.notion.so/warpcast/Frames-State-Public-f3de69c1d12944e583a37204c98d25d9) to the frame server.                                                               |
| 2/23/24 | Frames can use HTTP cache headers to refresh their initial image.                                                                                                                               |
| 2/8/24  | Frames can have [NFT mint buttons](https://warpcast.notion.site/Frames-Mint-action-Public-cea0d2249e3e41dbafb2e9ab23107275) and images with 1:1 aspect ratio.                                   |
| 2/6/24  | Frames can define [simple links to external pages](https://warpcast.notion.site/Frames-External-Links-Public-60c9900cffae4e2fb1b6aae3d4601c15?pvs=4).                                           |
| 2/2/24  | Frames can [accept text input](https://warpcast.notion.site/Frames-Text-Input-Public-27c9f0d61903486d89b6d932dd0d6a22).                                                                         |
| 1/30/24 | Frames [validator](https://warpcast.com/~/developers/frames) launched.                                                                                                                          |
| 1/29/24 | Frames support redirecting after the post action.                                                                                                                                               |
| 1/26/24 | Frames launched.                                                                                                                                                                                |

## vNext Proposed Changes

The following ideas are being explored actively as extensions to the frame specification:

- A refresh period, to bust the cache for the original frame url.
- An authentication system, to let users log into other applications via frames.
- A JSON response type, to allow for more flexibility in frame responses.
