# Change custody address

Accounts are owned by custody address which is an Ethereum address on OP Mainnet.

A user may want to change this address for security reasons or to transfer ownership of the entire account.

### Requirements

- An ETH wallet that owns the account on OP Mainnet, with some ETH.
- An Ethereum provider URL for OP Mainnet (e.g. via [Alchemy](https://www.alchemy.com/), [Infura](https://www.infura.io/) or [QuickNode](https://www.quicknode.com/)).

### Change Custody Address

Call the `transfer` function on the Id Registry contract. The receiving address must provide an EIP-712 signature accepting the transfer.

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

const { request: transferRequest } = await publicClient.simulateContract({
  ...IdContract,
  functionName: 'transfer',
  args: [account, deadline, signature], // to, deadline, signature
});

await walletClient.writeContract(transferRequest);
```

```ts [Viem]
import {
  ID_REGISTRY_EIP_712_TYPES,
  idRegistryABI,
  ID_GATEWAY_ADDRESS,
} from '@farcaster/hub-web';
import { walletClient, account } from './clients.ts';
import { readNonce, getDeadline } from './helpers.ts';

const nonce = await readNonce();
const deadline = getDeadline();
const IdContract = {
  abi: idRegistryABI,
  address: ID_GATEWAY_ADDRESS,
  chain: optimism,
};

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
    functionName: 'nonces',
    args: [account],
  });
};
```

<<< @/examples/contracts/clients.ts

:::

::: warning
Transferring a FID does not reset its recovery address. To transfer a FID and update its recovery address,
call [`transferAndChangeRecovery`](/reference/contracts/reference/id-registry#transferandchangerecovery).
:::

See the [Id Registry](/reference/contracts/reference/id-registry#transfer) section for more
details.
