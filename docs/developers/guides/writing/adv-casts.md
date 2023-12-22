# Create casts with embeds, mentions, etc

::: info Pre-requisites

- Write access to a hubble instance
- Private key of a signer registered to an fid

:::

The hub-nodejs library provides helper functions to create casts with embeds, mentions, emoji, etc. using
the `makeCastAdd` function.

## Setup

First import the `makeCastAdd` function and set up constants

```ts
import { makeCastAdd, NobleEd25519Signer, FarcasterNetwork } from '@farcaster/hub-nodejs';

const SIGNER_PRIVATE_KEY: Hex = '0x...'; // Your registered signer's private key
const FID = -1; // Your fid
const ed25519Signer = new NobleEd25519Signer(SIGNER_PRIVATE_KEY);
const dataOptions = {
  fid: FID,
  network: FC_NETWORK,
};
const FC_NETWORK = FarcasterNetwork.MAINNET;
```

## Simple cast

This is a simple cast with no embeds or mentions.

```typescript
const cast = await makeCastAdd(
  {
    text: 'This is a cast with no mentions',
    embeds: [],
    embedsDeprecated: [],
    mentions: [],
    mentionsPositions: [],
  },
  dataOptions,
  ed25519Signer
);
```

## Cast with mentions

Mentions are used to tag other users in a cast. They are represented by the FID of the user being mentioned and the
position of the mention within the cast

```typescript
/**
 * "@dwr and @v are big fans of @farcaster"
 */
const castWithMentions = await makeCastAdd(
    {
      text: ' and  are big fans of ',
      embeds: [],
      embedsDeprecated: [],
      mentions: [3, 2, 1],
      mentionsPositions: [0, 5, 22],
    },
    dataOptions,
    ed25519Signer
  );
```

## Cast with embeds

```typescript
/**
 * A cast with mentions and an attachment
 *
 * "Hey @dwr, check this out!"
 */
const castWithMentionsAndAttachment = await makeCastAdd(
    {
      text: 'Hey , check this out!',
      embeds: [{ url: 'https://farcaster.xyz' }],
      embedsDeprecated: [],
      mentions: [3],
      mentionsPositions: [4],
    },
    dataOptions,
    ed25519Signer
  );
```

## Cast with emoji

```typescript
/**
 * A cast with emoji and mentions
 *
 * "🤓@farcaster can mention immediately after emoji"
 */
const castWithEmojiAndMentions = await makeCastAdd(
    {
      text: '🤓 can mention immediately after emoji',
      embeds: [],
      embedsDeprecated: [],
      mentions: [1],
      mentionsPositions: [4],
    },
    dataOptions,
    ed25519Signer
  );
```

## Cast replying to a URL

```typescript
/**
 * A cast that replies to a URL
 *
 * "I think this is a great protocol 🚀"
 */
const castReplyingToAUrl = await makeCastAdd(
    {
      text: 'I think this is a great protocol 🚀',
      embeds: [],
      embedsDeprecated: [],
      mentions: [],
      mentionsPositions: [],
      parentUrl: 'https://www.farcaster.xyz/',
    },
    dataOptions,
    ed25519Signer
  );
```

## Removing a cast

To remove as cast, we need to have the hash of the cast to remove. With that, submit a castRemove message
using `makeCastRemove`.

```typescript
  const castRemove = await makeCastRemove(
  {
    targetHash: castReplyingToAUrl._unsafeUnwrap().hash,
  },
  dataOptions,
  ed25519Signer,
);
```
