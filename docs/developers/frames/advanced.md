---
title: Frames Advanced Topics
---

# Advanced Topics

Advanced topics for building sophisticated Farcaster Frames.

#### Making the initial Frame image dynamic

When a Frame is shared in a cast the metadata for it will generally be scraped
and cached so that it can be rendered into users feeds without additional
loading. This means whatever URL is set on the initial frame will always be
rendered.

In order to make the initial image dynamic you'll need to:

- serve a dynamic image at a static URL
- set an appropriate cache header

An example, imagine you want to build a frame where the initial frame shows the
current price of ETH. For the initial frame you'd set a static image url
like `https://example.xyz/eth-price.png`. When a GET request is made to this endpoint:

- the server fetches the latest ETH price from a cache
- renders an image using a tool like [Vercel OG](https://vercel.com/docs/functions/og-image-generation) and returns it
- sets the following header: `Cache-Control: public, immutable, no-transform, max-age=60`

We recommend setting a non-zero `max-age` so that the image can get cached and
served from CDNs, otherwise users will see a gray image in their feed while the
dynamic image is generated and loads. The exact time depends on your
application but opt for the longest time that still keeps the image reasonably
fresh.

#### Avoid caching error images when generating dynamic images at static URLs

If you have a static URL that generates a dynamic image and you use a fallback
image for cases when you're unable to generate the image, you should set
`max-age=0` in the `Cache-Control` header so it does not get cached.

As an example, let's say you generate a dynamic image at `/img/eth-price` that
shows a 24hr chart for the price of ETH. Normally you want this image to be
cached for 5 minutes. However, if the ETH price data is unavailable and you
render a fallback image you don't want the request cached so that you can try
again in subsequent requests.

#### Data persistence

[Vercel KV](https://vercel.com/docs/storage/vercel-kv) and [Cloudflare Workers
KV](https://developers.cloudflare.com/kv/) are convenient options for adding a
simple persistence layer to your Frame server.
