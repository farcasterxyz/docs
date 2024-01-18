# Warpcast Cast Composer Intens

Warpcast intents enable builders to direct authenticated users to a pre-filled cast composer.

#### Compose with cast text

```bash
https://warpcast.com/~/compose?text=Hello%20world!
```

#### Compose with cast text and one embed

```bash
https://warpcast.com/~/compose?text=Hello%20world!&embeds[]=https://farcaster.xyz
```

#### Compose with cast text with mentions and two embeds

```bash
https://warpcast.com/~/compose?text=Hello%20@farcaster!&embeds[]=https://farcaster.xyz&embeds[]=https://github.com/farcasterxyz/protocol
```

#### Additional details

- Embeds are any valid URLs
- URLs ending with `.png` `.jpg` or `.gif` will render as an image embed
- Embedding the URL to a Zora mint page will render the NFT with a mint link below it.
- You can check how embeds will be rendered in Warpcast at https://warpcast.com/~/developers/embeds
