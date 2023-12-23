# Create a cast in a channel

::: info Pre-requisites

- Write access to a hubble instance
- Private key of an app key registered to an fid

:::

Channels are used to target casts to a specific audience. At the protocol level, they work by setting the `parent_url`
of a cast to a specific url. They were introduced to the protocol
in [FIP-2](https://github.com/farcasterxyz/protocol/discussions/71).

## Querying for a list of channels

Currently, the protocol does not provide a way to query for a list of channels. Any URI can be considered a valid
channel.
However, only certain channels are recognized by clients like Warpcast. To get a list of these channels, you can query
the `casts` table in the replicator database.

```sql
select parent_url,
       count(*) as count
from casts
where parent_url is not null
group by parent_url
order by count desc;
```

## Setup

First import the `makeCastAdd` function and set up constants

```ts
import { makeCastAdd, NobleEd25519Signer, FarcasterNetwork } from '@farcaster/hub-nodejs';

const APP_KEY_PRIVATE_KEY: Hex = '0x...'; // Your registered app key's private key
const FID = -1; // Your fid
const ed25519Signer = new NobleEd25519Signer(APP_KEY_PRIVATE_KEY);
const dataOptions = {
  fid: FID,
  network: FC_NETWORK,
};
const FC_NETWORK = FarcasterNetwork.MAINNET;
```

## Create a cast in a channel

```typescript
const channelCast = await makeCastAdd(
  {
    text: 'I love farcaster',
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
