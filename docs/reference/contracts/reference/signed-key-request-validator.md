---
outline: [2, 3]
---

# Signed Key Request Validator

The Signed Key Request Validator validates the signed metadata associated with keys. The Key Registry calls the validator before adding a key, to check that the provided Signed Key Request is valid.

If you want to construct or check a Signed Key Request, use the Signed Key Request Validator.

::: info What is a Signed Key Request?

When a user adds a key to their account (the primary fid), it must include a signature from the person that requested it (the request fid). This enables anyone to identify who requested a specific key.

Typically, the primary fid is the end user and the requesting fid is an app the user wishes to connect to.
:::

## Read

### encodeMetadata

Convert a [`SignedKeyRequestMetadata`](#signedkeyrequestmetadata-struct) struct into `bytes` to pass into contract functions like [add](/reference/contracts/reference/key-gateway#add), [register](/reference/contracts/reference/bundler#register).

| Parameter | type                       | Description                                     |
| --------- | -------------------------- | ----------------------------------------------- |
| metadata  | `SignedKeyRequestMetadata` | The `SignedKeyRequestMetadata` struct to encode |

#### SignedKeyRequestMetadata struct

The `SignedKeyRequestMetadata` struct contains data to validate authenticity of a Signed Key Request: requesting fid, the requesting fid owner, and an EIP-712 [`SignedKeyRequest`](#signedkeyrequest-signature) signature.

| Parameter     | type      | Description                                                                                          |
| ------------- | --------- | ---------------------------------------------------------------------------------------------------- |
| requestFid    | `uint256` | requesting fid                                                                                       |
| requestSigner | `address` | owner address of the requesting fid                                                                  |
| signature     | `bytes`   | EIP-712 [`SignedKeyRequest`](#signedkeyrequest-signature) signature from the `requestSigner` address |
| deadline      | `uint256` | Expiration timestamp of the signature                                                                |

See below for code examples that demonstrate two methods of generating encoded `SignedKeyRequestMetadata` — using the `@farcaster/hub-web` library to sign and encode in a single step, or using Viem to sign and encode separately.

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

Validate an encoded [`SignedKeyRequestMetadata`](#signedkeyrequestmetadata-struct). The KeyRegistry calls this function internally when a user adds a key to validate the Signed Key Request. If you are creating keys on behalf of users, you can call this function yourself to validate the Signed Key Request created by your app.

| Parameter | type      | Description                                                             |
| --------- | --------- | ----------------------------------------------------------------------- |
| fid       | `uint256` | Primary fid that will be associated with the key                        |
| key       | `bytes`   | Bytes of the public key to validate                                     |
| sig       | `bytes`   | EIP-712 `SignedKeyRequest` signature from the entity requesting the key |

#### SignedKeyRequest signature

The `SignedKeyRequest` message is an EIP-712 typed signature signed by the requesting fid owner in the following format:

`SignedKeyRequest(uint256 requestFid,bytes key,uint256 deadline)`

::: info Why sign metadata?
The `SignedKeyRequest` signature proves that the requesting fid asked the primary fid to authorize a key pair. For example, when an app asks a user to add a new key, the app creates a Signed Key Request proving that it made the request and the KeyRegistry emits it in an onchain event. This allows anyone to attribute a signer to the specific person who requested it, which is useful for a wide range of things from knowing which apps are being used to filtering content based on the applications that generated them.
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

## Source

[`SignedKeyRequestValidator.sol`](https://github.com/farcasterxyz/contracts/blob/1aceebe916de446f69b98ba1745a42f071785730/src/validators/SignedKeyRequestValidator.sol)
