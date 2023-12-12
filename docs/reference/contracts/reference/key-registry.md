---
outline: [2, 3]
---

# Key Registry

The Key Registry stores the public keys associated with each Farcaster account.

If you want to read information about a Farcaster account's keys or remove an existing key, use the Key Registry.

If you want to add a new key, use the [Key Gateway](/reference/contracts/reference/key-gateway.md) instead.

## Read

### totalKeys

Get the number of active keys (`uint256`) for an fid.

| Parameter | type                                 | Description                         |
| --------- | ------------------------------------ | ----------------------------------- |
| fid       | `uint256`                            | fid to look up                      |
| state     | `uint8` (1 for Added, 2 for Removed) | State of the key (added or removed) |

### keysOf

List all public keys (`bytes[]`) for an fid.

| Parameter | type                                 | Description                         |
| --------- | ------------------------------------ | ----------------------------------- |
| fid       | `uint256`                            | fid to look up                      |
| state     | `uint8` (1 for Added, 2 for Removed) | State of the key (added or removed) |
| startIdx  | `uint256` (optional)                 | Start index for pagination          |
| batchSize | `uint256` (optional)                 | Batch size for pagination           |

::: warning
Don't call this onchain! This function is very gas intensive. It's meant to be called by offchain tools, not by other contracts.
:::

### keyDataOf

Returns the state (`uint8`) and keyType (`uint32`) of particular key for an fid.

| Parameter | type      | Description         |
| --------- | --------- | ------------------- |
| fid       | `uint256` | fid to look up      |
| key       | `bytes`   | public key to check |

## Write

### add

Will revert if called directly. Must be called via the [Key Gateway](/reference/contracts/reference/key-gateway.md)

### remove

Removes a public key from the caller's fid and marks it as `Removed`.

| Parameter | type    | Description          |
| --------- | ------- | -------------------- |
| key       | `bytes` | public key to remove |

::: warning
Removing a key will delete all offchain messages associated with the key from Hubs.
:::

### removeFor

Remove a key on behalf of another fid by providing a signature. The fid owner must sign an EIP-712 `Remove` message approving the removal. Reverts if the key does not exist or is already removed.

| Parameter | type      | Description                           |
| --------- | --------- | ------------------------------------- |
| fidOwner  | `address` | fid owner address                     |
| key       | `bytes`   | public key to remove                  |
| deadline  | `uint256` | signature deadline                    |
| sig       | `bytes`   | EIP-712 signature from the `fidOwner` |

::: warning
Removing a key will delete all offchain messages associated with the key from Hubs.
:::

#### Remove signature

To remove a key on behalf of another account, you must provide an EIP-712 typed signature from the account in the following format:

`Remove(address owner,bytes key,uint256 nonce,uint256 deadline)`

| Parameter | type      | Description                                                                  |
| --------- | --------- | ---------------------------------------------------------------------------- |
| owner     | `address` | Address that owns the fid. The typed message must be signed by this address. |
| key       | `bytes`   | The public key to remove                                                     |
| nonce     | `uint256` | Current nonce of the `owner` address                                         |
| deadline  | `uint256` | Signature expiration timestamp                                               |

::: code-group

```ts [@farcaster/hub-web]
import { ViemWalletEip712Signer } from '@farcaster/hub-web';
import { walletClient, account } from './clients.ts';
import { getPublicKey } from './signer.ts';
import { readNonce, getDeadline } from './helpers.ts';

const publicKey = await getPublicKey();
const nonce = await readNonce();
const deadline = getDeadline();

const eip712Signer = new ViemWalletEip712Signer(walletClient);
const signature = await eip712signer.signRemove({
  owner: account,
  key: publicKey,
  nonce,
  deadline,
});
```

```ts [Viem]
import { KEY_REGISTRY_EIP_712_TYPES } from '@farcaster/hub-web';
import { bytesToHex } from 'viem';
import { walletClient, account } from './clients.ts';
import { getPublicKey } from './signer.ts';
import { readNonce, getDeadline } from './helpers.ts';

const publicKey = await getPublicKey();
const nonce = await readNonce();
const deadline = getDeadline();

const signature = await walletClient.signTypedData({
  account,
  ...KEY_REGISTRY_EIP_712_TYPES,
  primaryType: 'Remove',
  message: {
    owner: account,
    key: bytesToHex(publicKey),
    nonce,
    deadline,
  },
});
```

```ts [helpers.ts]
import { KEY_REGISTRY_ADDRESS, keyRegistryABI } from '@farcaster/hub-web';
import { publicClient, account } from './clients.ts';

export const getDeadline = () => {
  const now = Math.floor(Date.now() / 1000);
  const oneHour = 60 * 60;
  return now + oneHour;
};

export const readNonce = async () => {
  return await publicClient.readContract({
    address: KEY_REGISTRY_ADDRESS,
    abi: keyRegistryABI,
    functionName: 'nonce',
    args: [account],
  });
};
```

<<< @/examples/contracts/signer.ts

<<< @/examples/contracts/clients.ts

:::

## Errors

| Error            | Selector   | Description                                                                                                                                            |
| ---------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ExceedsMaximum   | `29264042` | Adding the key exceeds the maximum number of keys allowed per fid (currently 1000)                                                                     |
| InvalidSignature | `8baa579f` | The provided signature is invalid. It may be incorrectly formatted, or signed by the wrong address.                                                    |
| InvalidState     | `baf3f0f7` | The action violates state transition rules. (Adding a key that already exists, removing a key that does not exist, adding a key that has been removed) |
| SignatureExpired | `0819bdcd` | The provided signature has expired. Collect a new signature from the signer with a later deadline timestamp.                                           |

## Source

[`KeyRegistry.sol`](https://github.com/farcasterxyz/contracts/blob/1aceebe916de446f69b98ba1745a42f071785730/src/KeyRegistry.sol)
