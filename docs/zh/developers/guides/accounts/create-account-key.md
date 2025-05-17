# 创建账户密钥

账户可以授权账户密钥，使其能够代表该账户创建消息。

账户所有者可以随时撤销账户密钥。要添加账户密钥，您需要遵循以下六个步骤：

1. 设置 [Viem](https://viem.sh/) 客户端和 [`@farcaster/hub-web`](https://www.npmjs.com/package/@farcaster/hub-web) 账户密钥。
2. 如果您的应用尚未拥有，请注册一个 [应用 FID](/reference/contracts/faq#what-is-an-app-fid-how-do-i-get-one)。
3. 为用户创建一个新的账户密钥。
4. 使用您的应用账户创建一个 [签名密钥请求](/reference/contracts/reference/signed-key-request-validator)。
5. 从用户处收集 [`Add`](/reference/contracts/reference/key-gateway#add-signature) 签名。
6. 调用 [密钥网关](https://docs.farcaster.xyz/reference/contracts/reference/key-gateway#addFor) 合约在链上添加密钥。

### 要求

- OP 主网上的 ETH 钱包，并拥有一些 ETH。
- OP 主网的 ETH RPC URL（例如通过 [Alchemy](https://www.alchemy.com/)、[Infura](https://www.infura.io/) 或 [QuickNode](https://www.quicknode.com/)）。

### 1. 设置客户端和账户密钥

首先，设置 Viem 客户端和 `@farcaster/hub-web` 账户密钥。在本示例中，我们将使用 Viem 本地账户和账户密钥，但您也可以使用 `ViemWalletEip712Signer` 连接到用户的钱包而非本地账户。

```ts
import * as ed from '@noble/ed25519';
import {
  ID_GATEWAY_ADDRESS,
  ID_REGISTRY_ADDRESS,
  ViemLocalEip712Signer,
  idGatewayABI,
  idRegistryABI,
  NobleEd25519Signer,
  KEY_GATEWAY_ADDRESS,
  keyGatewayABI,
} from '@farcaster/hub-nodejs';
import { bytesToHex, createPublicClient, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { optimism } from 'viem/chains';

const APP_PRIVATE_KEY = '0x00';
const ALICE_PRIVATE_KEY = '0x00';

const publicClient = createPublicClient({
  chain: optimism,
  transport: http(),
});

const walletClient = createWalletClient({
  chain: optimism,
  transport: http(),
});

const app = privateKeyToAccount(APP_PRIVATE_KEY);
const appAccountKey = new ViemLocalEip712Signer(app as any);

const alice = privateKeyToAccount(ALICE_PRIVATE_KEY);
const aliceAccountKey = new ViemLocalEip712Signer(alice as any);

const deadline = BigInt(Math.floor(Date.now() / 1000) + 3600); // 将签名的截止时间设置为从现在起 1 小时后

const WARPCAST_RECOVERY_PROXY = '0x00000000FcB080a4D6c39a9354dA9EB9bC104cd7';
```

### 2. 注册应用 FID

如果尚未拥有，请注册一个应用 FID。要注册 FID，您需要从 ID 网关读取价格，然后调用 ID 网关并支付注册费用。您可以从 ID 注册表合约中读取新的 FID，或从 `Register` 事件中解析。这里，我们将从注册表合约中读取。

```ts
const price = await publicClient.readContract({
  address: ID_GATEWAY_ADDRESS,
  abi: idGatewayABI,
  functionName: 'price',
  args: [0n],
});

const { request } = await publicClient.simulateContract({
  account: app,
  address: ID_GATEWAY_ADDRESS,
  abi: idGatewayABI,
  functionName: 'register',
  args: [WARPCAST_RECOVERY_PROXY, 0n],
  value: price,
});
await walletClient.writeContract(request);

const APP_FID = await publicClient.readContract({
  address: ID_REGISTRY_ADDRESS,
  abi: idRegistryABI,
  functionName: 'idOf',
  args: [app.address],
});
```

### 3. 创建新的账户密钥

为用户创建一个新的 Ed25519 密钥对。在实际应用中，请确保私钥保密。

```ts
const privateKeyBytes = ed.utils.randomPrivateKey();
const accountKey = new NobleEd25519Signer(privateKeyBytes);

let accountPubKey = new Uint8Array();
const accountKeyResult = await accountKey.getSignerKey();
```

### 4. 使用您的应用账户创建签名密钥请求

创建由您的应用账户签名的签名密钥请求。为此，您可以使用 `getSignedKeyRequestMetadata` 辅助函数，它会生成并签名密钥请求。

```ts
if (accountKeyResult.isOk()) {
  accountPubKey = accountKeyResult.value;

  const signedKeyRequestMetadata =
    await appAccountKey.getSignedKeyRequestMetadata({
      requestFid: APP_FID,
      key: accountPubKey,
      deadline,
    });
}
```

### 5. 从用户处收集 `Add` 签名

从用户处收集 EIP-712 `Add` 签名，以授权将账户密钥添加到其 FID。在实际应用中，您可能会在前端从用户的钱包中收集此签名。在前端环境中，您可以使用 `ViemEip712WalletSigner` 连接到浏览器钱包而非本地签名者。

```ts
if (signedKeyRequestMetadata.isOk()) {
  const metadata = bytesToHex(signedKeyRequestMetadata.value);

  const aliceNonce = await publicClient.readContract({
    address: KEY_GATEWAY_ADDRESS,
    abi: keyGatewayABI,
    functionName: 'nonces',
    args: [alice.address],
  });

  const aliceSignature = await aliceAccountKey.signAdd({
    owner: alice.address as `0x${string}`,
    keyType: 1,
    key: accountPubKey,
    metadataType: 1,
    metadata,
    nonce,
    deadline,
  });
}
```

### 6. 调用密钥网关合约在链上添加密钥

调用密钥网关合约并提供用户的签名以在链上添加密钥。

```ts
if (aliceSignature.isOk()) {
  const { request } = await publicClient.simulateContract({
    account: app,
    address: KEY_GATEWAY_ADDRESS,
    abi: keyGatewayABI,
    functionName: 'addFor',
    args: [
      alice.address,
      1,
      bytesToHex(accountPubKey),
      1,
      metadata,
      deadline,
      bytesToHex(aliceSignature.value),
    ],
  });
  await walletClient.writeContract(request);
}
```

### 完整代码示例

查看以下完整代码示例，包含上述所有步骤。

::: code-group

```ts [@farcaster/hub-web]
import * as ed from '@noble/ed25519';
import {
  ID_GATEWAY_ADDRESS,
  ID_REGISTRY_ADDRESS,
  ViemLocalEip712Signer,
  idGatewayABI,
  idRegistryABI,
  NobleEd25519Signer,
  KEY_GATEWAY_ADDRESS,
  keyGatewayABI,
} from '@farcaster/hub-nodejs';
import { bytesToHex, createPublicClient, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { optimism } from 'viem/chains';

const APP_PRIVATE_KEY = '0x00';
const ALICE_PRIVATE_KEY = '0x00';

/*******************************************************************************
 * 设置 - 创建本地账户、Viem 客户端、辅助函数和常量。
 *******************************************************************************/

/**
 * 创建 Viem 公共（读取）和钱包（写入）客户端。
 */
const publicClient = createPublicClient({
  chain: optimism,
  transport: http(),
});

const walletClient = createWalletClient({
  chain: optimism,
  transport: http(),
});

/**
 * 代表您的应用的本地账户。您将使用此账户签名密钥元数据并代表用户发送交易。
 */
const app = privateKeyToAccount(APP_PRIVATE_KEY);
const appAccountKey = new ViemLocalEip712Signer(app as any);
console.log('应用:', app.address);

/**
 * 代表用户 Alice 的本地账户。
 */
const alice = privateKeyToAccount(ALICE_PRIVATE_KEY);
const aliceAccountKey = new ViemLocalEip712Signer(alice as any);
console.log('Alice:', alice.address);

/**
 * 生成从现在起一小时的截止时间戳。
 * 所有 Farcaster EIP-712 签名都包含一个截止时间，即签名不再有效的区块时间戳。
 */
const deadline = BigInt(Math.floor(Date.now() / 1000) + 3600); // 将签名的截止时间设置为从现在起 1 小时后

const WARPCAST_RECOVERY_PROXY = '0x00000000FcB080a4D6c39a9354dA9EB9bC104cd7';

/*******************************************************************************
 * ID 网关 - register - 注册应用 FID。
 *******************************************************************************/

/**
 *  获取当前注册价格。我们不打算注册任何额外存储，因此将 0n 作为唯一参数传递。
 */
const price = await publicClient.readContract({
  address: ID_GATEWAY_ADDRESS,
  abi: idGatewayABI,
  functionName: 'price',
  args: [0n],
});

/**
 *  调用 `register` 将 FID 注册到应用账户。
 */
const { request } = await publicClient.simulateContract({
  account: app,
  address: ID_GATEWAY_ADDRESS,
  abi: idGatewayABI,
  functionName: 'register',
  args: [WARPCAST_RECOVERY_PROXY, 0n],
  value: price,
});
await walletClient.writeContract(request);

/**
 *  从 ID 注册表合约中读取应用 FID。
 */
const APP_FID = await publicClient.readContract({
  address: ID_REGISTRY_ADDRESS,
  abi: idRegistryABI,
  functionName: 'idOf',
  args: [app.address],
});

/*******************************************************************************
 * 密钥网关 - addFor - 将账户密钥添加到 Alice 的 FID。
 *******************************************************************************/

/**
 * 要将账户密钥添加到 Alice 的 FID，我们需要遵循四个步骤：
 *
 * 1. 为 Alice 创建新的账户密钥对。
 * 2. 使用我们的应用账户创建签名密钥请求。
 * 3. 收集 Alice 的 `Add` 签名。
 * 4. 调用合约在链上添加密钥。
 */

/**
 *  1. 为 Alice 创建 Ed25519 账户密钥对并获取公钥。
 */
const privateKeyBytes = ed.utils.randomPrivateKey();
const accountKey = new NobleEd25519Signer(privateKeyBytes);

let accountPubKey = new Uint8Array();
const accountKeyResult = await accountKey.getSignerKey();
if (accountKeyResult.isOk()) {
  accountPubKey = accountKeyResult.value;

  /**
   *  2. 从应用账户生成签名密钥请求。
   */
  const signedKeyRequestMetadata =
    await appAccountKey.getSignedKeyRequestMetadata({
      requestFid: APP_FID,
      key: accountPubKey,
      deadline,
    });

  if (signedKeyRequestMetadata.isOk()) {
    const metadata = bytesToHex(signedKeyRequestMetadata.value);
    /**
     *  3. 从密钥网关读取 Alice 的 nonce。
     */
    const aliceNonce = await publicClient.readContract({
      address: KEY_GATEWAY_ADDRESS,
      abi: keyGatewayABI,
      functionName: 'nonces',
      args: [alice.address],
    });

    /**
     *  然后，收集她的 `Add` 签名。
     */
    const aliceSignature = await aliceAccountKey.signAdd({
      owner: alice.address as `0x${string}`,
      keyType: 1,
      key: accountPubKey,
      metadataType: 1,
      metadata,
      nonce: aliceNonce,
      deadline,
    });

    if (aliceSignature.isOk()) {
      /**
       *  使用 Alice 的签名和签名密钥请求调用 `addFor`。
       */
      const { request } = await publicClient.simulateContract({
        account: app,
        address: KEY_GATEWAY_ADDRESS,
        abi: keyGatewayABI,
        functionName: 'addFor',
        args: [
          alice.address,
          1,
          bytesToHex(accountPubKey),
          1,
          metadata,
          deadline,
          bytesToHex(aliceSignature.value),
        ],
      });
      await walletClient.writeContract(request);
    }
  }
}
```

:::

有关更多详细信息，请参阅 [密钥注册表](/reference/contracts/reference/key-registry#add) 参考文档。
