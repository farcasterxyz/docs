# Farcaster Client Embeds Reference

The Farcaster client follows the [Open Graph protocol](https://ogp.me) when rendering rich previews for URL embeds.

Developers can reset existing embed caches on the Farcaster client at https://farcaster.xyz/~/developers/embeds.

This page is not for debugging [mini apps](https://miniapps.farcaster.xyz/docs/specification).

#### Additional details

- Resetting an embed cache, does not reset Open Graph image caches. If you are experiencing a stale image on your Open Graph, change the image file path served as the `og:image`.
- Developers have to be logged in to the Farcaster client to access this page.
