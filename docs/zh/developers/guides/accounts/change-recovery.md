# 更改恢复地址

账户可以配置一个恢复地址，以防止托管地址丢失。恢复地址将更改账户的托管地址。

### 要求

- 一个在 OP 主网上拥有 FID 的 ETH 钱包，并准备一些 ETH 用于支付 gas 费用。
- OP 主网的 ETH RPC URL（例如通过 [Alchemy](https://www.alchemy.com/)、[Infura](https://www.infura.io/) 或 [QuickNode](https://www.quicknode.com/) 获取）。

### 更改地址

调用 Id Registry 合约中的 `changeRecovery` 函数。

::: code-group

```ts [@farcaster/hub-web]
import { walletClient, account, IdContract } from './clients.ts';

const newRecoveryAddress = '0x...';

const { request: transferRequest } = await walletClient.simulateContract({
  ...IdContract,
  functionName: 'changeRecovery',
  args: [newRecoveryAddress], // 新的恢复地址
});

await walletClient.writeContract(transferRequest);
```

```ts [clients.ts]
import {
  ID_REGISTRY_EIP_712_TYPES,
  idRegistryABI,
  ID_GATEWAY_ADDRESS,
} from '@farcaster/hub-web';
import { walletClient, account } from './clients.ts';

const IdContract = {
  abi: idRegistryABI,
  address: ID_GATEWAY_ADDRESS,
  chain: optimism,
};

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

// JSON-RPC 账户
export const [account] = await walletClient.getAddresses();

// 本地账户
export const account = privateKeyToAccount('0x...');
```

:::

更多详情请参阅 [Id Registry](/zh/reference/contracts/reference/id-registry#transfer) 部分。
