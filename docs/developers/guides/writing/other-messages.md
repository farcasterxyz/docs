# Create reactions, follows, profile updates, etc

::: info Pre-requisites

- Write access to a hubble instance
- Private key of a signer registered to an fid

:::

The hub-nodejs library provides helper functions to create different kinds of messages.

## Setup

First import the helper functions and set up constants

```ts
import {
  makeLinkAdd,
  makeLinkRemove,
  makeReactionAdd,
  makeUserDataAdd,
  NobleEd25519Signer,
  FarcasterNetwork,
} from '@farcaster/hub-nodejs';

const SIGNER_PRIVATE_KEY: Hex = '0x...'; // Your registered signer's private key
const FID = -1; // Your fid
const ed25519Signer = new NobleEd25519Signer(SIGNER_PRIVATE_KEY);
const dataOptions = {
  fid: FID,
  network: FC_NETWORK,
};
const FC_NETWORK = FarcasterNetwork.MAINNET;
```

## Like a cast

Likes are a type of reaction. To like a cast, you need to have the fid of the cast creator and the hash of the cast.

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

## Recast a cast

Recasts are also a type of reaction, so we'll use the same function as above. To recast a cast, you need to have the fid
of the cast creator and the hash of the cast.

```typescript
const recast = await makeReactionAdd(
  {
    type: ReactionType.RECAST,
    targetCastId: { fid: createdCast.data.fid, hash: createdCast.hash },
  },
  dataOptions,
  ed25519Signer
);
```

## Update user profile

User profile data is stored as `UserData` messages. To update your profile, you need to create a `UserData` message with
the corresponding type and provide a value. There are different types of `UserData` messages like `USERNAME`, `BIO`,
`PFP` etc. Only one of each type can exist, if multiple messages are submitted, the most recent wins.

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

## Follow a user

Follows are represented a Links, with type set to `follow`. To follow a user, you need to have the fid of the user you
wish to follow.

```typescript
const follow = await makeLinkAdd(
  {
    type: 'follow',
    targetFid: 1,
  },
  dataOptions,
  ed25519Signer
);
```

## Unfollow a user

To unfollow a user, you need to create a `LinkRemove` message with type set to `follow` and the fid of the user you wish
to unfollow.

```typescript
const unfollow = await makeLinkRemove(
  {
    type: 'unfollow',
    targetFid: 1,
  },
  dataOptions,
  ed25519Signer
);
```
