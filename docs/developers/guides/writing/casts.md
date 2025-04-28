# Create casts

Creating simple casts is covered in the [messages](./messages.md) tutorial. This tutorial covers advanced topics like mentions, embeds, emojis, replies and channels.

## Setup

- See the setup instructions in [creating messages](./messages.md)

## Mentions

Users can be tagged in a cast with an @username mention (e.g. "Hello @bob!") which causes clients to send notifications.

A mention is not included in the text of the cast. The target fid and the position of the mention in the text are specified in the `mentions` and `mentionPositions` array, and are populated into the cast by clients at render-time.

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
    mentionsPositions: [0, 5, 22], // The position in bytes (not characters)
  },
  dataOptions,
  ed25519Signer
);
```

## Embeds

URLs can be embedded in the cast which instructs clients to render a preview.

A cast can have up to 2 embeds which can each be up to 256 bytes long. No other validation is performed on embeds.

```typescript
/**
 * A cast with a mention and an attachment
 *
 * "Hey @dwr, check this out!"
 */
const castWithMentionsAndAttachment = await makeCastAdd(
  {
    text: 'Hey, check this out!',
    embeds: [{ url: 'https://farcaster.xyz' }],
    embedsDeprecated: [],
    mentions: [3],
    mentionsPositions: [4],
  },
  dataOptions,
  ed25519Signer
);
```

## Emoji

Emojis can be included directly in the text of a cast and be rendered by clients.

Since an emoji character often takes up multiple bytes but renders as a single character, it has an impact on how mention positions and cast length should be calculated.

```typescript
/**
 * A cast with emojis and mentions
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

## Reply

A cast can be a reply to another cast, URL or NFT. A reply to another cast is treated as a thread, while a reply to a URL or NFT can be treated as a comment or a [channel](#channels).

The optional parentUrl property can be set to a URL or to an fid-hash value of the cast being replied to, as shown in the example below. See [FIP-2](https://github.com/farcasterxyz/protocol/discussions/71) for more details on reply types.

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

## Channels

A cast can be sent into a channel, which instructs clients that it is related to a specific topic. Clients may choose to use this metadata in different ways, like grouping channel casts together or recommending them to certain users.

A channel is simply a `parentURL` that is either a URL or NFT, which all clients recognize as a channel by loose consensus. There is no protocol level agreement on the list of channels yet, but the `casts` table in the replicator database can be used to get a list of commonly used channels.

```sql
/* Query for a list of channels */
select parent_url,
       count(*) as count
from casts
where parent_url is not null
group by parent_url
order by count desc;
```

```typescript
// Cast into the Farcaster channel
const channelCast = await makeCastAdd(
  {
    text: 'I love farcaster',
    embeds: [],
    embedsDeprecated: [],
    mentions: [],
    mentionsPositions: [],
    parentUrl: 'https://www.farcaster.xyz/', // This is illustrative, and is not an actual channel URL
  },
  dataOptions,
  ed25519Signer
);
```
