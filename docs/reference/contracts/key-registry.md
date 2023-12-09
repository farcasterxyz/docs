# Key Registry API

## totalKeys

Returns the number of active keys (`uint256`) for an fid.

| Param Name | type                                 | Description                         |
| ---------- | ------------------------------------ | ----------------------------------- |
| fid        | `uint256`                            | fid to query for                    |
| state      | `uint8` (1 for Added, 2 for Removed) | State of the key (added or removed) |

## keysOf

Returns an array of public keys (`bytes[]`) for an fid.

| Param Name | type                                 | Description                         |
| ---------- | ------------------------------------ | ----------------------------------- |
| fid        | `uint256`                            | fid to query for                    |
| state      | `uint8` (1 for Added, 2 for Removed) | State of the key (added or removed) |
| startIdx   | `uint256` (optional)                 | Start index for pagination          |
| batchSize  | `uint256` (optional)                 | Batch size for pagination           |

::: warning
Don't call this onchain! This function is very expensive for users with many keys, since it copies the entire key set to memory. It's meant to be called by offchain tools, not by other smart contracts.
:::

## keyDataOf

Returns the state (`uint8`) and keyType (`uint32`) of particular key for an fid.

| Param Name | type      | Description                       |
| ---------- | --------- | --------------------------------- |
| fid        | `uint256` | fid to query for                  |
| key        | `bytes`   | public key registered for the fid |

## add

Will revert if called directly, must be called via the [Key Gateway](/reference/contracts/key-gateway.md)

## remove

Removes a key from the caller's fid. Sets the key state to `Removed`.

| Param Name | type    | Description          |
| ---------- | ------- | -------------------- |
| key        | `bytes` | public key to remove |

::: warning
Removing a signer key will delete all offchain messages associated with the signer from Hubs.
:::

## removeFor

Remove a key on behalf of another fid owner by providing a signature. The owner of the fid must sign an EIP-712 `Remove` message approving the removal. Reverts if the key does not exist or is already removed for the owner's fid.

Removing a signer key will delete all messages associated with the signer.

| Param Name | type      | Description                                     |
| ---------- | --------- | ----------------------------------------------- |
| fidOwner   | `address` | address that owns the fid                       |
| key        | `bytes`   | public key to remove (must be owned by the fid) |
| deadline   | `uint256` | deadline for the signature                      |
| sig        | `bytes`   | EIP-712 signature from the `fidOwner` address   |

::: warning
Removing a signer key will delete all offchain messages associated with the signer from Hubs.
:::

### Remove signature

To remove a key on behalf of another account, you must provide an EIP-712 typed signature from the account in the following format:

`Remove(address owner,bytes key,uint256 nonce,uint256 deadline)`

| Param Name | type      | Description                                                                                             |
| ---------- | --------- | ------------------------------------------------------------------------------------------------------- |
| owner      | `address` | The address that owns the fid to remove the key from. The typed message must be signed by this address. |
| key        | `bytes`   | Bytes of the public key to remove                                                                       |
| nonce      | `uint256` | Current nonce of the `owner` address                                                                    |
| deadline   | `uint256` | Expiration timestamp of the signature                                                                   |

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

| Error            | Selector   | Description                                                                                                                                                                      |
| ---------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ExceedsMaximum   | `29264042` | Adding the key would exceed the maximum number of keys per fid (1000)                                                                                                            |
| InvalidSignature | `8baa579f` | The provided signature is invalid. It may be incorrectly formatted, or signed by the wrong address.                                                                              |
| InvalidState     | `baf3f0f7` | The call would violate the state transition rules of the KeyRegistry. (Adding a key that already exists, removing a key that does not exist, adding a key that has been removed) |
| SignatureExpired | `0819bdcd` | The provided signature has expired. Collect a new signature from the signer with a later deadline timestamp.                                                                     |
