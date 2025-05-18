# 更改托管地址

账户由托管地址拥有，该地址是 OP 主网上的一个以太坊地址。

用户可能出于安全考虑或需要转移整个账户所有权而更改此地址。

### 要求

- 一个在 OP 主网上拥有该账户的 ETH 钱包，且钱包中有少量 ETH。
- 一个 OP 主网的以太坊提供商 URL（例如通过 [Alchemy](https://www.alchemy.com/)、[Infura](https://www.infura.io/) 或 [QuickNode](https://www.quicknode.com/)）。

### 更改托管地址

调用 Id Registry 合约的 `transfer` 函数。接收地址必须提供一个 EIP-712 签名以接受转移。

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
转移 FID 不会重置其恢复地址。如需转移 FID 并更新其恢复地址，
请调用 [`transferAndChangeRecovery`](/zh/reference/contracts/reference/id-registry#transferandchangerecovery)。
:::

更多详情请参阅 [Id Registry](/zh/reference/contracts/reference/id-registry#transfer) 部分。
