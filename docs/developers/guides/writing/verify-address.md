# Create an address verification

::: info Pre-requisites

- Write access to a hubble instance
- Private key of an account key registered to an fid
- An Ethereum provider URL for OP Mainnet (e.g. via [Alchemy](https://www.alchemy.com/),[Infura](https://www.infura.io/) or [QuickNode](https://www.quicknode.com/)).


:::

To create a [Verification](https://docs.farcaster.xyz/reference/hubble/datatypes/messages.html#_6-verification) proving ownership of an external Ethereum address, you can use an `Eip712Signer` to sign a verification message, and the `makeVerificationAddEthAddress` function to construct a message to send to a Hub.

First, set up clients and account keys:

```ts
import {
  NobleEd25519Signer,
  ViemLocalEip712Signer,
  FarcasterNetwork,
  makeVerificationAddEthAddress,
} from '@farcaster/hub-nodejs';
import { createPublicClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { optimism } from 'viem/chains';

const publicClient = createPublicClient({
  chain: optimism,
  transport: http(),
});

const alice = privateKeyToAccount('0xab..12');
const eip712Signer = new ViemLocalEip712Signer(alice);

const ed25519Signer = new NobleEd25519Signer('0xcd..34');
```

Then create a verification signature using an `Eip712Signer`. You'll need to query the latest blockhash on OP mainnet and include it in the signed message.

```ts
const latestBlock = await publicClient.getBlock();

const fid = 1n;
const network = FarcasterNetwork.MAINNET;
const address = alice.address;
const blockHash = latestBlock.blockhash;

const ethSignature = eip712Signer.signVerificationEthAddressClaim({
  fid,
  address,
  network,
  blockHash,
});
```

Finally, use `makeVerificationAddEthAddress` to construct a [`Verification`](https://docs.farcaster.xyz/reference/hubble/datatypes/messages.html#_6-verification) message you can send to a Hub.

```ts
if (ethSignature.isOk()) {
  const message = await makeVerificationAddEthAddress(
    {
      address,
      blockHash,
      ethSignature,
    },
    { fid, network },
    ed25519Signer
  );
}
```

### Full code example

::: code-group

```ts [@farcaster/hub-nodejs]
import {
  NobleEd25519Signer,
  ViemLocalEip712Signer,
  FarcasterNetwork,
  makeVerificationAddEthAddress,
} from '@farcaster/hub-nodejs';
import { createPublicClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { optimism } from 'viem/chains';

const publicClient = createPublicClient({
  chain: optimism,
  transport: http(),
});

const alice = privateKeyToAccount('0xab..12');
const eip712Signer = new ViemLocalEip712Signer(alice);

const ed25519Signer = new NobleEd25519Signer('0xcd..34');

const latestBlock = await publicClient.getBlock();

const fid = 1n;
const network = FarcasterNetwork.MAINNET;
const address = alice.address;
const blockHash = latestBlock.blockhash;

const ethSignature = eip712Signer.signVerificationEthAddressClaim({
  fid,
  address,
  network,
  blockHash,
});

if (ethSignature.isOk()) {
  const message = await makeVerificationAddEthAddress(
    {
      address,
      blockHash,
      ethSignature,
    },
    { fid, network },
    ed25519Signer
  );
}
```

:::
