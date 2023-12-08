# Key Gateway

## nonces

Returns the next unused nonce for an address. Used for generating EIP-712 signatures in [addFor](#addFor).

| Param Name | type      | Description                        |
| ---------- | --------- | ---------------------------------- |
| owner      | `address` | The address to query the nonce for |

## add

Add a key for the caller's fid. Sets the key state to `ADDED`. Reverts if the key is already registered for the caller's fid.

| Param Name   | type         | Description                                              |
| ------------ | ------------ | -------------------------------------------------------- |
| keyType      | `uint32` (1) | Must be set to 1, only key type supported currently      |
| key          | `bytes`      | Bytes of the public key to add                           |
| metadataType | `uint8` (1)  | Must be set to 1, only metadata type supported currently |
| metadata     | `bytes`      | Signed key metadata                                      |

## addFor

Add a key on behalf of another fid owner by providing a signature. The owner of the fid must sign an EIP-712 `AddKey` message approving the key. Reverts if the key is already registered for the owner's fid.

| Param Name   | type         | Description                                              |
| ------------ | ------------ | -------------------------------------------------------- |
| fidOwner     | `address`    | The address that owns the fid to add the key to          |
| keyType      | `uint32` (1) | Must be set to 1, only key type supported currently      |
| key          | `bytes`      | Bytes of the public key to add                           |
| metadataType | `uint8` (1)  | Must be set to 1, only metadata type supported currently |
| metadata     | `bytes`      | Signed metadata bytes                                    |
| deadline     | `uint256`    | Expiration timestamp of the signature                    |
| sig          | `bytes`      | EIP-712 signature from `fidOwner`                        |

### Add signature

To add a key on behalf of another account, you must provide an EIP-712 typed signature from the account in the following format:

`Add(address owner,uint32 keyType,bytes key,uint8 metadataType,bytes metadata,uint256 nonce,uint256 deadline)`

| Param Name   | type         | Description                                                                                        |
| ------------ | ------------ | -------------------------------------------------------------------------------------------------- |
| owner        | `address`    | The address that owns the fid to add the key to. The typed message must be signed by this address. |
| keyType      | `uint32` (1) | Must be set to 1, only key type supported currently                                                |
| key          | `bytes`      | Bytes of the public key to add                                                                     |
| metadataType | `uint8` (1)  | Must be set to 1, only metadata type supported currently                                           |
| metadata     | `bytes`      | Signed metadata bytes                                                                              |
| nonce        | `uint256`    | Current nonce of the `owner` address                                                               |
| deadline     | `uint256`    | Expiration timestamp of the signature                                                              |

::: code-group

```ts [@farcaster/hub-web]
import { ViemWalletEip712Signer } from '@farcaster/hub-web';
import { walletClient, account } from './clients.ts';
import { getPublicKey } from './signer.ts';
import { readNonce, getDeadline } from './helpers.ts';

const publicKey = await getPublicKey();
const metadata = await getMetadata();
const nonce = await readNonce();
const deadline = getDeadline();

const eip712Signer = new ViemWalletEip712Signer(walletClient);
const signature = await eip712signer.signAdd({
  owner: account,
  keyType: 1,
  key: publicKey,
  metadataType: 1,
  metadata,
  nonce,
  deadline,
});
```

```ts [Viem]
import { KEY_GATEWAY_EIP_712_TYPES } from '@farcaster/hub-web';
import { bytesToHex } from 'viem';
import { walletClient, account } from './clients.ts';
import { getPublicKey } from './signer.ts';
import { getMetadata } from './metadata.ts';
import { readNonce, getDeadline } from './helpers.ts';

const publicKey = await getPublicKey();
const metadata = await getMetadata();
const nonce = await readNonce();
const deadline = getDeadline();

const signature = await walletClient.signTypedData({
  account,
  ...KEY_GATEWAY_EIP_712_TYPES,
  primaryType: 'Add',
  message: {
    owner: account,
    keyType: 1,
    key: bytesToHex(publicKey),
    metadataType: 1,
    metadata,
    nonce,
    deadline,
  },
});
```

```ts [metadata.ts]
import { ViemLocalEip712Signer } from '@farcaster/hub-web';
import { privateKeyToAccount } from 'viem/accounts';
import { account } from './clients.ts';
import { getDeadline } from './helpers.ts';
import { getPublicKey } from './signer.ts';

// App account
export const appAccount = privateKeyToAccount('0x...');

const deadline = getDeadline();
const publicKey = await getPublicKey();

const getMetadata = async () => {
  const metadata = await eip712signer.getSignedKeyRequestMetadata({
    requestFid: 9152n, // App fid
    key: publicKey,
    deadline,
  });
  if (metadata.isOk()) {
    return metadata.value;
  }
};
```

```ts [helpers.ts]
import { KEY_GATEWAY_ADDRESS, keyGatewayABI } from '@farcaster/hub-web';
import { publicClient, account } from './clients.ts';

export const getDeadline = () => {
  const now = Math.floor(Date.now() / 1000);
  const oneHour = 60 * 60;
  return now + oneHour;
};

export const readNonce = async () => {
  return await publicClient.readContract({
    address: KEY_GATEWAY_ADDRESS,
    abi: keyGatewayABI,
    functionName: 'nonce',
    args: [account],
  });
};
```

```ts [signer.ts]
import * as ed from '@noble/ed25519';
import { NobleEd25519Signer } from '@farcaster/hub-web';

const privateKeyBytes = ed.utils.randomPrivateKey();
export const signer = new NobleEd25519Signer(privateKeyBytes);

const getPublicKey = async () => {
  const signerKeyResult = await signer.getSignerKey();
  if (signerKeyResult.isOk()) {
    return signerKeyResult.value;
  }
};
```

```ts [clients.ts]
import { createWalletClient, createPublicClient, custom } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { optimism } from 'viem/chains';

export const publicClient = createPublicClient({
  chain: optimism,
  transport: http(),
});

export const walletClient = createWalletClient({
  chain: optimism,
  transport: custom(window.ethereum),
});

// JSON-RPC Account
export const [account] = await walletClient.getAddresses();

// Local Account
export const account = privateKeyToAccount('0x...');
```
