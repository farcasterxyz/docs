---
title: Frames Patterns & Pitfalls / Farcaster
---

# Patterns & Pitfalls

::: info
These patterns assume a prior knowledge of Frames. If you're looking for
general information about building Frames check out these resources:

- [Getting Started](./getting-started)
- [Frames Specification](/reference/frames/spec)
- guides from [frames.js](https://framesjs.org/guides/create-frame) or [frog](https://framesjs.org/guides/create-frame)
  :::

## Patterns

#### Make the initial Frame image dynamic

When a Frame is shared in a cast the metadata for it will generally be scraped
and cached so that it can be rendered into user's feeds without additional
loading. This means whatever URL is set on the initial frame will always be
rendered.

In order to make the initial image dynamic you'll need to:

- serve a dynamic image at a static URL
- set an appropriate cache header

An example, imagine you want to build a frame where the initial frame shows the
current price of ETH. For the initial frame you'd set an a static image url
like `https://example.xyz/eth-price.png`. When a GET request is made to this endpoint:

- the server fetches the latest ETH price from a cache
- renders an image using a tool like [Vercel OG](https://vercel.com/docs/functions/og-image-generation) and returns it
- sets the following header: `Cache-Control: public, immutable, no-transform, max-age=60`

We recommend setting a non-zero `max-age` so that the image can get cached and
served from CDNs, otherwise users will see a gray image in their feed while the
dynamic image is generated and loads. The exact time depends on your
application but opt for the longest time that still keeps the image reasonably
fresh.

#### Perform long-running computations in the background {#long-running}

If your Frame needs to perform a long-running computation like interacting with
an LLM or sending an onchain transaction, it should be done in the "background"
by immediately respond with a frame that tells the user an action is being
taken and let's the user refresh to check the status.

::: tip Frog users
Use an [Image Handler](https://frog.fm/concepts/image-handler#image-handler) to serve dynamic images at static URLs.
:::

## Pitfalls

#### Missing content type on images

Must be one of: `image/jpg`, `image/png`, `image/gif`, `image/webp`, or `image/avif`. See [Specification - Images](/reference/frames/spec#images).

#### Images are too large

The size of the image must be < 10 MB. See [Specification - Images](/reference/frames/spec#images).

#### Frame and image URLs that are too big

If you are seeing an error about invalid metadata, check that your frame and image URLs are within the limits. See [Specification - Images](/reference/frames/spec#images).

#### State is too big

If you are seeing an error about invalid metadata, check that the data returning in `state` is <= 4096 bytes. See [Specification - Optional Properties](/reference/frames/spec#optional-properties).
