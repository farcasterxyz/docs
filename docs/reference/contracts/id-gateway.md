# ID Gateway

## price

Returns the price in wei to register an fid. This includes the price of 1 storage unit. To include additional storage units,
in the calculation, provide an optional `extraStorage` parameter.

| Param Name   | type                 | Description                                                           |
| ------------ | -------------------- | --------------------------------------------------------------------- |
| extraStorage | `uint256` (optional) | The number of additional storage units to include in calculated price |

## nonces

Returns the next unused nonce for an address. Used for generating an EIP-712 `Register` signature for [registerFor](#registerfor).

| Param Name | type      | Description                        |
| ---------- | --------- | ---------------------------------- |
| owner      | `address` | The address to query the nonce for |

## register

Register a new fid to the caller and pay for one or more units of storage. The caller must not already own an fid.

| Param Name   | type                 | Description                                            |
| ------------ | -------------------- | ------------------------------------------------------ |
|              | `wei` (payable)      | The payable amount to transfer to pay for registration |
| recovery     | `address`            | The recovery address for the newly registered fid      |
| extraStorage | `uint256` (optional) | The number of additional storage units to rent         |

## registerFor

Register a new fid to a specific address and pay for one or more units of storage. The receiving
address must sign an EIP-712 `Register` message approving the registration. the receiver must not already own an fid.

| Param Name   | type                 | Description                                            |
| ------------ | -------------------- | ------------------------------------------------------ |
|              | `wei` (payable)      | The payable amount to transfer to pay for registration |
| to           | `address`            | The address to register the fid to                     |
| recovery     | `address`            | The recovery address for the newly registered fid      |
| deadline     | `uint256`            | Expiration timestamp of the signature                  |
| sig          | `bytes`              | EIP-712 `Register` signature from the `to` address     |
| extraStorage | `uint256` (optional) | The number of additional storage units to rent         |

### Register signature

To register an fid on behalf of another account, you must provide an EIP-712 typed signature from the receiving address in the following format:

`Register(address to,address recovery,uint256 nonce,uint256 deadline)`

| Param Name | type      | Description                                                                           |
| ---------- | --------- | ------------------------------------------------------------------------------------- |
| to         | `address` | The address to register the fid to. The typed message must be signed by this address. |
| recovery   | `address` | The recovery address for the newly registered fid                                     |
| nonce      | `uint256` | Current nonce of the `to` address                                                     |
| deadline   | `uint256` | Expiration timestamp of the signature                                                 |

::: code-group

```ts [@farcaster/hub-web]
import { ViemWalletEip712Signer } from '@farcaster/hub-web';
import { walletClient, account } from './clients.ts';
import { readNonce, getDeadline } from './helpers.ts';

const nonce = await readNonce();
const deadline = getDeadline();

const eip712Signer = new ViemWalletEip712Signer(walletClient);
const signature = await eip712signer.signRegister({
  to: account,
  recovery: '0x00000000FcB080a4D6c39a9354dA9EB9bC104cd7',
  nonce,
  deadline,
});
```

```ts [Viem]
import { ID_GATEWAY_EIP_712_TYPES } from '@farcaster/hub-web';
import { walletClient, account } from './clients.ts';
import { readNonce, getDeadline } from './helpers.ts';

const nonce = await readNonce();
const deadline = getDeadline();

const signature = await walletClient.signTypedData({
  account,
  ...ID_GATEWAY_EIP_712_TYPES,
  primaryType: 'Register',
  message: {
    to: account,
    recovery: '0x00000000FcB080a4D6c39a9354dA9EB9bC104cd7',
    nonce,
    deadline,
  },
});
```

```ts [helpers.ts]
import { ID_GATEWAY_ADDRESS, idGatewayABI } from '@farcaster/hub-web';
import { publicClient, account } from './clients.ts';

export const getDeadline = () => {
  const now = Math.floor(Date.now() / 1000);
  const oneHour = 60 * 60;
  return now + oneHour;
};

export const readNonce = async () => {
  return await publicClient.readContract({
    address: ID_GATEWAY_ADDRESS,
    abi: idGatewayABI,
    functionName: 'nonce',
    args: [account],
  });
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
