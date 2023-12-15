---
outline: [2, 3]
---

# Key Gateway

The Key Gateway adds new keys to the [Key Registry](/reference/contracts/reference/key-registry.md).

If you want to add a new public key to a Farcaster account, use the Key Gateway.

## Read

### nonces

Returns the next available nonce for an address. Used for generating EIP-712 signatures in [addFor](#addFor).

| Parameter | type      | Description                        |
| --------- | --------- | ---------------------------------- |
| owner     | `address` | The address to query the nonce for |

## Write

### add

Add a new key for the caller's fid and set its state to `Added`. Revert if the key is already registered.

| Parameter    | type     | Description                                                                                                                       |
| ------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| keyType      | `uint32` | Must be set to `1`. This is currently the only supported `keyType`.                                                               |
| key          | `bytes`  | The public key to add                                                                                                             |
| metadataType | `uint8`  | Must be set to `1`. This is currenlty the only supported `metadataType`.                                                          |
| metadata     | `bytes`  | Encoded [`SignedKeyRequestMetadata`](/reference/contracts/reference/signed-key-request-validator#signedkeyrequestmetadata-struct) |

### addFor

Add a key on behalf of another fid by providing a signature. The owner must sign an EIP-712 `Add` message approving the key. Reverts if the key is already registered.

| Parameter    | type      | Description                                                                                                                       |
| ------------ | --------- | --------------------------------------------------------------------------------------------------------------------------------- |
| fidOwner     | `address` | Address of the fid owner                                                                                                          |
| keyType      | `uint32`  | Must be set to `1`. This is currently the only supported `keyType`.                                                               |
| key          | `bytes`   | The public key to add                                                                                                             |
| metadataType | `uint8`   | Must be set to `1`. This is currenlty the only supported `metadataType`.                                                          |
| metadata     | `bytes`   | Encoded [`SignedKeyRequestMetadata`](/reference/contracts/reference/signed-key-request-validator#signedkeyrequestmetadata-struct) |
| deadline     | `uint256` | Signature expiration timestamp                                                                                                    |
| sig          | `bytes`   | EIP-712 [`Add`](/reference/contracts/reference/key-gateway#add-signature) signature from `fidOwner`                               |

#### Add signature

To add a key on behalf of another account, you must provide an EIP-712 typed signature from the account in the following format:

`Add(address owner,uint32 keyType,bytes key,uint8 metadataType,bytes metadata,uint256 nonce,uint256 deadline)`

| Parameter    | type      | Description                                                                                                                       |
| ------------ | --------- | --------------------------------------------------------------------------------------------------------------------------------- |
| owner        | `address` | Address that owns the fid. The typed message must be signed by this address.                                                      |
| keyType      | `uint32`  | Must be set to `1`. This is currently the only supported `keyType`.                                                               |
| key          | `bytes`   | The public key to add                                                                                                             |
| metadataType | `uint8`   | Must be set to `1`. This is currenlty the only supported `metadataType`.                                                          |
| metadata     | `bytes`   | Encoded [`SignedKeyRequestMetadata`](/reference/contracts/reference/signed-key-request-validator#signedkeyrequestmetadata-struct) |
| nonce        | `uint256` | Current nonce of the `owner` address                                                                                              |
| deadline     | `uint256` | Signature expiration timestamp                                                                                                    |

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
    functionName: 'nonces',
    args: [account],
  });
};
```

<<< @/examples/contracts/metadata.ts

<<< @/examples/contracts/signer.ts

<<< @/examples/contracts/clients.ts

:::

## Errors

| Error            | Selector   | Description                                                                                                  |
| ---------------- | ---------- | ------------------------------------------------------------------------------------------------------------ |
| InvalidMetadata  | `bcecb64a` | The signed metadata provided with the key is invalid.                                                        |
| InvalidSignature | `8baa579f` | The provided signature is invalid. It may be incorrectly formatted, or signed by the wrong address.          |
| SignatureExpired | `0819bdcd` | The provided signature has expired. Collect a new signature from the signer with a later deadline timestamp. |

## Source

[`KeyGateway.sol`](https://github.com/farcasterxyz/contracts/blob/1aceebe916de446f69b98ba1745a42f071785730/src/KeyGateway.sol)
