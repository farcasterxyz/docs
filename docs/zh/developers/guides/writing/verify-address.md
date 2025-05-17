# 创建地址验证

::: info 前提条件

- 对 hubble 实例的写入权限
- 已注册到 fid 的账户私钥
- OP 主网的以太坊提供商 URL（例如通过 [Alchemy](https://www.alchemy.com/)、[Infura](https://www.infura.io/) 或 [QuickNode](https://www.quicknode.com/)）

:::

要创建证明外部以太坊地址所有权的[验证](https://docs.farcaster.xyz/reference/hubble/datatypes/messages.html#_6-verification)，可以使用 `Eip712Signer` 签署验证消息，并通过 `makeVerificationAddEthAddress` 函数构造发送至 Hub 的消息。

首先，设置客户端和账户密钥：

```ts
import {
  NobleEd25519Signer,
  ViemLocalEip712Signer,
  FarcasterNetwork,
  makeVerificationAddEthAddress,
} from '@farcaster/hub-nodejs';
import { createPublicClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { optimism } from 'viem/chains';

const publicClient = createPublicClient({
  chain: optimism,
  transport: http(),
});

const alice = privateKeyToAccount('0xab..12');
const eip712Signer = new ViemLocalEip712Signer(alice);

const ed25519Signer = new NobleEd25519Signer('0xcd..34');
```

然后使用 `Eip712Signer` 创建验证签名。需要查询 OP 主网的最新区块哈希并将其包含在签名消息中。

```ts
const latestBlock = await publicClient.getBlock();

const fid = 1n;
const network = FarcasterNetwork.MAINNET;
const address = alice.address;
const blockHash = latestBlock.blockhash;

const ethSignature = eip712Signer.signVerificationEthAddressClaim({
  fid,
  address,
  network,
  blockHash,
});
```

最后，使用 `makeVerificationAddEthAddress` 构造可发送至 Hub 的[`验证`](https://docs.farcaster.xyz/reference/hubble/datatypes/messages.html#_6-verification)消息。

```ts
if (ethSignature.isOk()) {
  const message = await makeVerificationAddEthAddress(
    {
      address,
      blockHash,
      ethSignature,
    },
    { fid, network },
    ed25519Signer
  );
}
```

### 完整代码示例

::: code-group

```ts [@farcaster/hub-nodejs]
import {
  NobleEd25519Signer,
  ViemLocalEip712Signer,
  FarcasterNetwork,
  makeVerificationAddEthAddress,
} from '@farcaster/hub-nodejs';
import { createPublicClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { optimism } from 'viem/chains';

const publicClient = createPublicClient({
  chain: optimism,
  transport: http(),
});

const alice = privateKeyToAccount('0xab..12');
const eip712Signer = new ViemLocalEip712Signer(alice);

const ed25519Signer = new NobleEd25519Signer('0xcd..34');

const latestBlock = await publicClient.getBlock();

const fid = 1n;
const network = FarcasterNetwork.MAINNET;
const address = alice.address;
const blockHash = latestBlock.blockhash;

const ethSignature = eip712Signer.signVerificationEthAddressClaim({
  fid,
  address,
  network,
  blockHash,
});

if (ethSignature.isOk()) {
  const message = await makeVerificationAddEthAddress(
    {
      address,
      blockHash,
      ethSignature,
    },
    { fid, network },
    ed25519Signer
  );
}
```

:::
