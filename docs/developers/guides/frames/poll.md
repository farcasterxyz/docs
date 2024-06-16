# Creating a poll frame

Frames can be used to create a poll that renders in a Farcaster feed.

![Frame Poll](/assets/frame_poll.png)

::: tip
A working example of a poll frame server can be found [here](https://github.com/farcasterxyz/fc-polls).
:::

### Creating the initial frame

A Frame is created with simple OpenGraph tags. To create the poll screen above, create a URL which returns the following metadata:

```html
<meta property="fc:frame" content="vNext" />
<meta property="fc:frame:image" content="http://...image-question.png" />
<meta property="fc:frame:button:1" content="Green" />
<meta property="fc:frame:button:2" content="Purple" />
<meta property="fc:frame:button:3" content="Red" />
<meta property="fc:frame:button:4" content="Blue" />
```

If you share the URL in a cast, it will show up as a frame. To test that the frame works without casting, try the Warpcast [Frame Tools](https://warpcast.com/~/developers/frames).

### Parsing button clicks

Warpcast sends a POST to the URL with the button id, user’s fid and other useful information when a button is clicked. The data is available in an unsigned form (untrustedData) and a signed form (trustedData).

Polls require data to be signed so that we know that the vote wasn’t spoofed. The trusted data must be unpacked using the `verifiedMessage` endpoint on a Hub, and only data returned from that endpoint must be used. The untrusted data should be discarded and never trusted. Some apps that do not care about signed data are free to skip verification and use untrusted data.

### Responding to button clicks with a new frame

After the response is verified and the vote is recorded, we need to send the poll results to the user. The server generates an image which shows the results of the poll with a tool like [satori](https://github.com/vercel/satori). It then responds to the POST with a 200 OK which includes a new frame with the results wrapped in an HTML object. Here’s how you would do this in a framework like Node.js

```javascript
res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
				<meta property="fc:frame" content="vNext" />
				<meta property="fc:frame:image" content="http://...image-result.png" />
      </head>
    </html>
`);
```
