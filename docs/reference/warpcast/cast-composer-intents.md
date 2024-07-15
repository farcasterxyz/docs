---
title: Warpcast Intents URLs
---

# Intents URLs

## Cast Intent URLs

Warpcast intents enable builders to direct authenticated users to a pre-filled cast composer.

#### Compose with cast text

```
https://warpcast.com/~/compose?text=Hello%20world!
```

#### Compose with cast text and one embed

```
https://warpcast.com/~/compose?text=Hello%20world!&embeds[]=https://farcaster.xyz
```

#### Compose with cast text with mentions and two embeds

```
https://warpcast.com/~/compose?text=Hello%20@farcaster!&embeds[]=https://farcaster.xyz&embeds[]=https://github.com/farcasterxyz/protocol
```

#### Compose with cast text on a specific channel

```
https://warpcast.com/~/compose?text=Hello%20world!&channelKey=farcaster
```

#### Reply with cast text to a cast with hash

```
https://warpcast.com/~/compose?text=Looks%20good!&parentCastHash=0x09455067393562d3296bcbc2ec1c2d6bba8ac1f1
```

#### Additional details

- Embeds are any valid URLs
- URLs ending with `.png` `.jpg` or `.gif` will render as an image embed
- Embedding the URL to a Zora mint page will render the NFT with a mint link below it.
- You can check how embeds will be rendered in Warpcast at https://warpcast.com/~/developers/embeds

## Resource URLs

#### View profile by FID

```
https://warpcast.com/~/profiles/:fid
```

#### View cast by hash

```
https://warpcast.com/~/conversations/:hash
```
