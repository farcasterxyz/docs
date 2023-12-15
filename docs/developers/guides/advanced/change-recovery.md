# Change your recovery address

::: info Pre-requisites

- An Ethereum wallet containing an fid on Optimism mainnet, with sufficient ETH for gas costs
- An ethereum provider URL for OP Mainnet (e.g. via [Alchemy](https://www.alchemy.com/)
  or [Infura](https://www.infura.io/)).

:::

To change the recovery address of an FID to another address, you can call the `changeRecovery` function on the ID
registry contract.

::: code-group

```ts [@farcaster/hub-web]
import { walletClient, account, IdContract } from './clients.ts';

const newRecoveryAddress = '0x...';

const { request: transferRequest } = await walletClient.simulateContract({
  ...IdContract,
  functionName: 'changeRecovery',
  args: [newRecoveryAddress], // new recovery address
});

await walletClient.writeContract(transferRequest);
```

```ts [clients.ts]
import { ID_REGISTRY_EIP_712_TYPES, idRegistryABI, ID_GATEWAY_ADDRESS } from '@farcaster/hub-web';
import { walletClient, account } from './clients.ts';

const IdContract = { abi: idRegistryABI, address: ID_GATEWAY_ADDRESS, chain: optimism };

import { createWalletClient, createPublicClient, custom, http } from 'viem';
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

:::

See the [ID Registry](/reference/contracts/reference/id-registry#transfer) section for more
details.
