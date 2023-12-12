# Transfer FID to another account

To transfer an FID to another account, you can call the `transfer` function on the ID registry contract with an EIP-712
signature from the receiving address.

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

const { request: transferRequest } = await walletClient.simulateContract({
  ...IdContract,
  functionName: "transfer",
  args: [account, deadline, signature], // to, deadline, signature
});

await walletClient.writeContract(transferRequest);
```

```ts [Viem]
import { ID_REGISTRY_EIP_712_TYPES, idRegistryABI, ID_GATEWAY_ADDRESS } from '@farcaster/hub-web';
import { walletClient, account } from './clients.ts';
import { readNonce, getDeadline } from './helpers.ts';

const nonce = await readNonce();
const deadline = getDeadline();
const IdContract = { abi: idRegistryABI, address: ID_GATEWAY_ADDRESS, chain: optimism };

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

See the [ID Registry](/reference/contracts/id-registry#transfer) section for more
details.