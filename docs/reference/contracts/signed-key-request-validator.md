---
outline: [2, 3]
---

# Signed Key Request Validator

## Read

### encodeMetadata

Helper function to encode a [`SignedKeyRequestMetadata`](#signedkeyrequestmetadata-struct) struct. Returns ABI-encoded `bytes` that may be passed as the `metadata` parameter in calls to [add](/reference/contracts/key-gateway.html#add), [register](/reference/contracts/bundler.html#register), and other contract functions that require signed metadata.

| Parameter | type                       | Description                                     |
| --------- | -------------------------- | ----------------------------------------------- |
| metadata  | `SignedKeyRequestMetadata` | The `SignedKeyRequestMetadata` struct to encode |

#### SignedKeyRequestMetadata struct

The `SignedKeyRequestMetadata` struct includes information about the requesting fid, the requesting fid owner, and an EIP-712 [`SignedKeyRequest`](#signedkeyrequest-signature) signature from the requesting fid owner account.

::: info Requesting fid vs primary fid
The **requesting fid** is the fid of the app or individual requesting to add a key to another user's account. The **primary fid** is the fid of the end user. For example, if a user creates an account in Warpcast, Warpcast's fid is the requesting fid, and the fid in the end user's Warpcast wallet is the primary fid. Requesting fids identify which entities are associated with specific signer keys.

In most cases, the requesting fid is owned by an application, and the primary fid is owned by an end user. However, it's possible to add a self managed key to the key registry, in which case the requesting fid and primary fid are the same.
:::

| Parameter     | type      | Description                                                                                          |
| ------------- | --------- | ---------------------------------------------------------------------------------------------------- |
| requestFid    | `uint256` | requesting fid                                                                                       |
| requestSigner | `address` | owner address of the requesting fid                                                                  |
| signature     | `bytes`   | EIP-712 [`SignedKeyRequest`](#signedkeyrequest-signature) signature from the `requestSigner` address |
| deadline      | `uint256` | Expiration timestamp of the signature                                                                |

See below for code examples that demonstrate two methods of generating encoded `SignedKeyRequestMetadata`: using the `@farcaster/hub-web` library to sign and encode in a single step, or using Viem to sign and encode separately.

::: code-group

```ts [@farcaster/hub-web]
import { ViemLocalEip712Signer } from '@farcaster/hub-web';
import { privateKeyToAccount } from 'viem/accounts';
import { getDeadline } from './helpers.ts';
import { getPublicKey } from './signer.ts';

export const appAccount = privateKeyToAccount('0x...');

const key = getPublicKey();
const deadline = getDeadline();

// The getSignedKeyRequestMetadata helper generates a SignedKeyRequest
// signature and returns an ABI-encoded SignedKeyRequest metadata struct.
const eip712Signer = new ViemLocalEip712Signer(appAccount);
const encodedData = await eip712signer.getSigneKeyRequestMetadata({
  requestFid: 9152n,
  key,
  deadline,
});
```

```ts [Viem]
import { bytesToHex, encodeAbiParameters } from 'viem';
import { signature } from './signature.ts';
import { getDeadline } from './helpers.ts';

const deadline = getDeadline();

// An example of collecting the signature and
// encoding the SignedKeyRequest metadata separately.
const encodedData = encodeAbiParameters(
  [
    {
      components: [
        {
          name: 'requestFid',
          type: 'uint256',
        },
        {
          name: 'requestSigner',
          type: 'address',
        },
        {
          name: 'signature',
          type: 'bytes',
        },
        {
          name: 'deadline',
          type: 'uint256',
        },
      ],
      type: 'tuple',
    },
  ],
  [
    {
      requestFid: 9152n,
      requestSigner: '0x02ef790dd7993a35fd847c053eddae940d055596',
      bytesToHex(signature),
      deadline,
    },
  ]
);
```

```ts [signature.ts]
import { ViemLocalEip712Signer } from '@farcaster/hub-web';
import { privateKeyToAccount } from 'viem/accounts';
import { getDeadline } from './helpers.ts';
import { getPublicKey } from './signer.ts';

export const appAccount = privateKeyToAccount('0x...');

const key = getPublicKey();
const deadline = getDeadline();

const eip712Signer = new ViemLocalEip712Signer(appAccount);
const signature = await eip712signer.signKeyrequest({
  requestFid: 9152n,
  key,
  deadline,
});
```

```ts [helpers.ts]
export const getDeadline = () => {
  const now = Math.floor(Date.now() / 1000);
  const oneHour = 60 * 60;
  return now + oneHour;
};
```

<<< @/examples/contracts/signer.ts

:::

### validate

Validate encoded [`SignedKeyRequestMetadata`](#signedkeyrequestmetadata-struct). The KeyRegistry calls this validation function before adding a public key and reverts if the provided metadata is malformed or incorrectly signed. Entities who create and add keys to the KeyRegistry can call this function to verify their signed key metadata before providing it to the user or using it in an onchain transaction.

| Parameter | type      | Description                                                             |
| --------- | --------- | ----------------------------------------------------------------------- |
| fid       | `uint256` | Primary fid that will be associated with the key                        |
| key       | `bytes`   | Bytes of the public key to validate                                     |
| sig       | `bytes`   | EIP-712 `SignedKeyRequest` signature from the entity requesting the key |

#### SignedKeyRequest signature

The `SignedKeyRequest` message is an EIP-712 typed signature signed by the requesting fid owner (i.e. the app or user that generated the delegate signer keypair) in the following format:

`SignedKeyRequest(uint256 requestFid,bytes key,uint256 deadline)`

::: info Why sign metadata?
The `SignedKeyRequest` signature proves that the requesting fid asked the primary fid to authorize a key pair. For example, when an application asks a user to authorize a new signer key by adding it to the KeyRegistry, the app signs a message proving that it made the request and includes it as key metadata emitted in a KeyRegistry event. This allows anyone to attribute a signer to the specific entity who requested it, which is useful for a wide range of things from knowing which apps are being used to filtering content based on the applications that generated them.
:::

| Parameter  | type      | Description                           |
| ---------- | --------- | ------------------------------------- |
| requestFid | `uint256` | fid of the entity                     |
| key        | `bytes`   | Bytes of the public key               |
| deadline   | `uint256` | Expiration timestamp of the signature |

::: code-group

```ts [@farcaster/hub-web]
import { ViemLocalEip712Signer } from '@farcaster/hub-web';
import { privateKeyToAccount } from 'viem/accounts';
import { getDeadline } from './helpers.ts';
import { getPublicKey } from './signer.ts';

export const appAccount = privateKeyToAccount('0x...');

const key = getPublicKey();
const deadline = getDeadline();

const eip712Signer = new ViemLocalEip712Signer(appAccount);
const signature = await eip712signer.signKeyRequest({
  requestFid: 9152n,
  key,
  deadline,
});
```

```ts [Viem]
import { SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_TYPES } from '@farcaster/hub-web';
import { bytesToHex, privateKeyToAccount } from 'viem/accounts';
import { getDeadline } from './helpers.ts';
import { getPublicKey } from './signer.ts';

export const appAccount = privateKeyToAccount('0x...');

const key = getPublicKey();
const deadline = getDeadline();

const signature = await appAccount.signTypedData({
  ...SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_TYPES,
  primaryType: 'SignedKeyRequest',
  message: {
    requestFid: 9152n,
    key: bytesToHex(key),
    deadline,
  },
});
```

```ts [helpers.ts]
export const getDeadline = () => {
  const now = Math.floor(Date.now() / 1000);
  const oneHour = 60 * 60;
  return now + oneHour;
};
```

<<< @/examples/contracts/signer.ts

:::
