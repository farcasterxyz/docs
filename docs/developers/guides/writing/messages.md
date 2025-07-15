# Create messages

A message represents an action taken by a user (e.g. alice says "hello world")

There are many types of messages, and this tutorial will walk you through the most common ones. Other tutorials will cover the more advanced message types.

## Setup

You will need:

- Write access to a Snapchain node
- Private key of a signer registered to an fid
- `hub-nodejs` and helper functions imported and shown below

```ts
import {
  makeCastAdd,
  makeCastRemove,
  makeLinkAdd,
  makeLinkRemove,
  makeReactionAdd,
  makeReactionRemove,
  makeUserDataAdd,
  NobleEd25519Signer,
  FarcasterNetwork,
} from '@farcaster/hub-nodejs';

const ACCOUNT_PRIVATE_KEY: Hex = '0x...'; // Your account key's private key
const FID = -1; // Your fid
const ed25519Signer = new NobleEd25519Signer(ACCOUNT_PRIVATE_KEY);
const dataOptions = {
  fid: FID,
  network: FC_NETWORK,
};
const FC_NETWORK = FarcasterNetwork.MAINNET;
```

## Casts

Casts are public messages created by a user.

A cast is created by issuing a CastAdd message with the text of the cast and optional embeds, mentions, and emoji. The example below shows the creation of a simple cast.

```typescript
const cast = await makeCastAdd(
  {
    text: 'This is a cast!', // Text can be up to 320 bytes long
    embeds: [],
    embedsDeprecated: [],
    mentions: [],
    mentionsPositions: [],
  },
  dataOptions,
  ed25519Signer
);
```

A cast can be removed by issuing a CastRemove message with the hash of the CastAdd message and a later timestamp.

```typescript
const castRemove = await makeCastRemove(
  {
    targetHash: castReplyingToAUrl._unsafeUnwrap().hash,
  },
  dataOptions,
  ed25519Signer
);
```

To create casts with embeds, mentions, channels emoji, see the [casts](../writing/casts.md) tutorial.

## Reactions

Reactions are strongly typed relationships between a user and a cast (e.g. a like).

A user "likes" a cast by producing a ReactionAdd message with type set to `like` and the target set to the hash of the cast and the fid of its author.

```typescript
const reactionAdd = await makeReactionAdd(
  {
    type: ReactionType.LIKE,
    targetCastId: { fid: createdCast.data.fid, hash: createdCast.hash },
  },
  dataOptions,
  ed25519Signer
);
```

The like can be negated by broadcasting a ReactionRemove message with the information and a later timestamp.

```typescript
const reactionRemove = await makeReactionRemove(
  {
    type: ReactionType.LIKE,
    targetCastId: { fid: createdCast.data.fid, hash: createdCast.hash },
  },
  dataOptions, // Timestamp provided must be higher
  ed25519Signer
);
```

A user can "recast" with a very similar process.

```typescript
const recastAdd = await makeReactionAdd(
  {
    type: ReactionType.RECAST,
    targetCastId: { fid: createdCast.data.fid, hash: createdCast.hash },
  },
  dataOptions,
  ed25519Signer
);

const recastRemove = await makeReactionRemove(
  {
    type: ReactionType.RECAST,
    targetCastId: { fid: createdCast.data.fid, hash: createdCast.hash },
  },
  dataOptions,
  ed25519Signer
);
```

## User Data

UserData is a strongly typed set of messages that represent metadata about a user (e.g. bio, profile picture).

A `UserData` message has a type and a string value which can be set. The example below shows a user updating their bio.

```typescript
// Update user bio. Other fields are similar, just change the type. Value is always a string.
const bioUpdate = await makeUserDataAdd(
  {
    type: UserDataType.BIO,
    value: 'new bio',
  },
  dataOptions,
  ed25519Signer
);
```

## Links

Links are loosely typed relationships between users (e.g. alice follows bob).

A user creates a Link by issuing a LinkAdd message with a string type and the target user's fid. The most commonly supported link on all clients is 'follow'.

```typescript
const follow = await makeLinkAdd(
  {
    type: 'follow',
    targetFid: 1,
  },
  dataOptions,
  ed25519Signer
);

const unfollow = await makeLinkRemove(
  {
    type: 'unfollow',
    targetFid: 1,
  },
  dataOptions,
  ed25519Signer
);
```
