# Farcaster Client Embeds Reference

The Farcaster client follows the [Open Graph protocol](https://ogp.me) when rendering rich previews for URL embeds.

Developers can reset existing embed caches on the Farcaster client at https://farcaster.xyz/~/developers/embeds.

#### Additional details

- Resetting an embed cache, does not reset Open Graph image caches. If you are experiencing a stale image on your Open Graph, change the image file path served as the `og:image`.
- Developers have to be logged in to the Farcaster client to access this page.
- To render rich previews of NFTs, follow the [Farcaster Frames spec](/developers/frames/spec).
