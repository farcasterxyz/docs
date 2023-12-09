# ID Registry

## idOf

Returns the fid (`uint256`) of an address, or zero if the address does not own an fid.

| Param Name | type      | Description                      |
| ---------- | --------- | -------------------------------- |
| owner      | `address` | The address to query the fid for |

## custodyOf

Returns the custody address (`address`) that owns an fid. Returns the zero address if the fid does not exist.

| Param Name | type      | Description                    |
| ---------- | --------- | ------------------------------ |
| fid        | `uint256` | The fid to query the owner for |

## recoveryOf

Returns the recovery address (`address`) of an fid. Returns the zero address if the fid does not exist.

| Param Name | type      | Description                               |
| ---------- | --------- | ----------------------------------------- |
| fid        | `uint256` | The fid to query the recovery address for |

## idCounter

Returns the current highest fid (`uint256`) that has been registered

## verifyFidSignature

Verify that a signature was produced by the custody address that currently owns an fid. Returns a `bool`.

| Param Name     | type      | Description                           |
| -------------- | --------- | ------------------------------------- |
| custodyAddress | `address` | The address to check the signature of |
| fid            | `uint256` | The fid to check the signature of     |
| digest         | `bytes32` | The hashed data that was signed       |
| sig            | `bytes`   | The provided signature                |

## nonces

Returns the next unused nonce for an address. Used for generating EIP-712 signatures.

| Param Name | type      | Description                        |
| ---------- | --------- | ---------------------------------- |
| owner      | `address` | The address to query the nonce for |

## register

Will revert if called directly, must be called via the [ID Gateway](/reference/contracts/id-gateway.md).

## changeRecoveryAddress

Changes the recovery address of `msg.sender` to a new address

| Param Name | type      | Description              |
| ---------- | --------- | ------------------------ |
| recovery   | `address` | The new recovery address |

## transfer

Transfer the fid of the caller to a new address. The receiving address must sign an EIP-712 `Transfer` message accepting the transfer. The `to` address must not already own an fid.

| Param Name | type      | Description                                        |
| ---------- | --------- | -------------------------------------------------- |
| to         | `address` | The address to transfer the fid to                 |
| deadline   | `uint256` | The deadline for the signature                     |
| sig        | `bytes`   | EIP-712 `Transfer` signature from the `to` address |

::: warning
Transferring an fid does not reset its recovery address. To transfer an fid and update its recovery address, call `transferAndChangeRecovery`. If you are receiving an fid from an untrusted sender, ensure its recovery address is cleared or changed on transfer.
:::

### Transfer signature

To transfer an fid to another account, you must provide an EIP-712 typed signature from the receiving address in the following format:

`Transfer(uint256 fid,address to,uint256 nonce,uint256 deadline)`

| Param Name | type      | Description                           |
| ---------- | --------- | ------------------------------------- |
| fid        | `uint256` | The fid being transferred             |
| to         | `address` | The address receiving the fid.        |
| nonce      | `uint256` | Current nonce of the signer address   |
| deadline   | `uint256` | Expiration timestamp of the signature |

::: code-group

```ts [@farcaster/hub-web]
import { ViemWalletEip712Signer } from '@farcaster/hub-web';
import { walletClient, account } from './clients.ts';
import { readNonce, getDeadline } from './helpers.ts';

const nonce = await readNonce();
const deadline = getDeadline();

const eip712Signer = new ViemWalletEip712Signer(walletClient);
const signature = await eip712signer.signTransfer({
  fid: 1n,
  to: account,
  nonce,
  deadline,
});
```

```ts [Viem]
import { ID_REGISTRY_EIP_712_TYPES } from '@farcaster/hub-web';
import { walletClient, account } from './clients.ts';
import { readNonce, getDeadline } from './helpers.ts';

const nonce = await readNonce();
const deadline = getDeadline();

const signature = await walletClient.signTypedData({
  account,
  ...ID_REGISTRY_EIP_712_TYPES,
  primaryType: 'Transfer',
  message: {
    fid: 1n,
    to: account,
    nonce,
    deadline,
  },
});
```

```ts [helpers.ts]
import { ID_REGISTRY_ADDRESS, idRegistryABI } from '@farcaster/hub-web';
import { publicClient, account } from './clients.ts';

export const getDeadline = () => {
  const now = Math.floor(Date.now() / 1000);
  const oneHour = 60 * 60;
  return now + oneHour;
};

export const readNonce = async () => {
  return await publicClient.readContract({
    address: ID_REGISTRY_ADDRESS,
    abi: idRegistryABI,
    functionName: 'nonce',
    args: [account],
  });
};
```

<<< @/examples/contracts/clients.ts

:::

## transferFor

Transfer the fid owned by the `from` address to the `to` address. The caller must provide two EIP-712 `Transfer` signatures: one from the `from` address authorizing the transfer out and one from the `to` address accepting the transfer in. These messages have the same format. The `to` address must not already own an fid.

| Param Name   | type      | Description                                           |
| ------------ | --------- | ----------------------------------------------------- |
| from         | `address` | The address to transfer the fid from                  |
| to           | `address` | The address to transfer the fid to                    |
| fromDeadline | `uint256` | The deadline for the signature                        |
| fromSig      | `bytes`   | EIP-712 `Transfer` signature from the `from` address  |
| toDeadline   | `uint256` | The deadline for the signature                        |
| toSig        | `bytes`   | EIP-712 ` Transfer`` signature from the  `to` address |

## transferAndChangeRecovery

Transfer the fid of the caller to a new address, and change the fid's recovery address. This can be used to safely receive an fid transfer from an untrusted address.

The receiving address must sign an EIP-712 `TransferAndChangeRecovery` message accepting the transfer. The `to` address must not already own an fid.

| Param Name | type      | Description                                                         |
| ---------- | --------- | ------------------------------------------------------------------- |
| to         | `address` | The address to transfer the fid to                                  |
| recovery   | `address` | The new recovery address                                            |
| deadline   | `uint256` | The deadline for the signature                                      |
| sig        | `bytes`   | EIP-712 `TransferAndChangeRecovery` signature from the `to` address |

### TransferAndChangeRecovery signature

To transfer an fid to another account and change recovery, you must provide an EIP-712 typed signature from the `to` address in the following format:

`TransferAndChangeRecovery(uint256 fid,address to,address recovery,uint256 nonce,uint256 deadline)`

| Param Name | type      | Description                           |
| ---------- | --------- | ------------------------------------- |
| fid        | `uint256` | The fid being transferred             |
| to         | `address` | The address receiving the fid         |
| recovery   | `address` | The new recovery address              |
| nonce      | `uint256` | Current nonce of the signer address   |
| deadline   | `uint256` | Expiration timestamp of the signature |

::: code-group

```ts [@farcaster/hub-web]
import { ViemWalletEip712Signer } from '@farcaster/hub-web';
import { walletClient, account } from './clients.ts';
import { readNonce, getDeadline } from './helpers.ts';

const nonce = await readNonce();
const deadline = getDeadline();

const eip712Signer = new ViemWalletEip712Signer(walletClient);
const signature = await eip712signer.signTransferAndChangeRecovery({
  fid: 1n,
  to: account,
  recovery: '0x00000000FcB080a4D6c39a9354dA9EB9bC104cd7',
  nonce,
  deadline,
});
```

```ts [Viem]
import { ID_REGISTRY_EIP_712_TYPES } from '@farcaster/hub-web';
import { walletClient, account } from './clients.ts';
import { readNonce, getDeadline } from './helpers.ts';

const nonce = await readNonce();
const deadline = getDeadline();

const signature = await walletClient.signTypedData({
  account,
  ...ID_REGISTRY_EIP_712_TYPES,
  primaryType: 'TransferAndChangeRecovery',
  message: {
    fid: 1n,
    to: account,
    recovery: '0x00000000FcB080a4D6c39a9354dA9EB9bC104cd7',
    nonce,
    deadline,
  },
});
```

```ts [helpers.ts]
import { ID_REGISTRY_ADDRESS, idGatewayABI } from '@farcaster/hub-web';
import { publicClient, account } from './clients.ts';

export const getDeadline = () => {
  const now = Math.floor(Date.now() / 1000);
  const oneHour = 60 * 60;
  return now + oneHour;
};

export const readNonce = async () => {
  return await publicClient.readContract({
    address: ID_REGISTRY_ADDRESS,
    abi: idRegistryABI,
    functionName: 'nonce',
    args: [account],
  });
};
```

<<< @/examples/contracts/clients.ts

:::

## transferAndChangeRecoveryFor

Transfer the fid owned by the `from` address to the `to` address, and change the fid's recovery address. This can be used to safely receive an fid transfer from an untrusted address.

The caller must provide two EIP-712 `TransferAndChangeRecovery` signatures: one from the `from` address authorizing the transfer out and one from the `to` address accepting the transfer in. These messages have the same format. The `to` address must not already own an fid.

| Param Name   | type      | Description                                                           |
| ------------ | --------- | --------------------------------------------------------------------- |
| from         | `address` | The address to transfer the fid from                                  |
| to           | `address` | The address to transfer the fid to                                    |
| fromDeadline | `uint256` | The deadline for the signature                                        |
| fromSig      | `bytes`   | EIP-712 `TransferAndChangeRecovery` signature from the `from` address |
| toDeadline   | `uint256` | The deadline for the signature                                        |
| toSig        | `bytes`   | EIP-712 `TransferAndChangeRecovery` signature from the `to` address   |

## recover

Transfer a fid to a new address if caller is the recovery address for that fid. The receiving address must sign an EIP-712 `Transfer` message accepting the transfer.

The `to` address must not already own an fid.

| Param Name | type      | Description                                        |
| ---------- | --------- | -------------------------------------------------- |
| from       | `address` | The address to transfer the fid from               |
| to         | `address` | The address to transfer the fid to                 |
| deadline   | `uint256` | The deadline for the signature                     |
| sig        | `bytes`   | EIP-712 `Transfer` signature from the `to` address |

## recoverFor

Transfer an fid to a new address with a signature from the fid's recovery address. The caller must provide two EIP-712 `Transfer` signatures: one from the recovery address authorizing the transfer out and one from the `to` address accepting the transfer in. These messages have the same format.

The `to` address must not already own an fid.

| Param Name       | type      | Description                                            |
| ---------------- | --------- | ------------------------------------------------------ |
| from             | `address` | The address to transfer the fid from                   |
| to               | `address` | The address to transfer the fid to                     |
| recoveryDeadline | `uint256` | The deadline for the recovery signature                |
| recoverySig      | `bytes`   | EIP-712 `Transfer` signature from the recovery address |
| toDeadline       | `uint256` | The deadline for the receiver signature                |
| toSig            | `bytes`   | EIP-712 ` Transfer`` signature from the  `to` address  |
