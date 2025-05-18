# 创建账户

::: info 前提条件

- 一个 OP 主网的以太坊钱包，且拥有足够的 ETH 支付 gas 费用。
- 一个 OP 主网的以太坊提供商 URL（可通过 [Alchemy](https://www.alchemy.com/)、[Infura](https://www.infura.io/) 或 [QuickNode](https://www.quicknode.com/) 获取）。

:::

您可以使用 Bundler 合约注册新用户。具体步骤如下：

1. 设置 [Viem](https://viem.sh/) 客户端和 [`@farcaster/hub-web`](https://www.npmjs.com/package/@farcaster/hub-web) 账户密钥。
2. 如果您的应用尚未拥有 [app FID](/zh/reference/contracts/faq#what-is-an-app-fid-how-do-i-get-one)，请先注册一个。
3. 从用户处收集 [`Register`](/zh/reference/contracts/reference/id-gateway#register-signature) 签名。
4. 为用户创建新的账户密钥对。
5. 使用您的应用账户创建 [Signed Key Request](/zh/reference/contracts/reference/signed-key-request-validator)。
6. 从用户处收集 [`Add`](/zh/reference/contracts/reference/key-gateway#add-signature) 签名。
7. 调用 [Bundler](https://docs.farcaster.xyz/reference/contracts/reference/bundler#register) 合约完成链上注册。

### 1. 设置客户端和账户密钥

首先设置 Viem 客户端和 `@farcaster/hub-web` 账户密钥。本示例使用 Viem 本地账户和密钥，但您也可以使用 `ViemWalletEip712Signer` 连接用户钱包而非本地账户。

```ts
import * as ed from '@noble/ed25519';
import {
  ID_GATEWAY_ADDRESS,
  ID_REGISTRY_ADDRESS,
  ViemLocalEip712Signer,
  idGatewayABI,
  idRegistryABI,
  NobleEd25519Signer,
  BUNDLER_ADDRESS,
  bundlerABI,
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

const deadline = BigInt(Math.floor(Date.now() / 1000) + 3600); // 设置签名有效期为当前时间1小时后

const WARPCAST_RECOVERY_PROXY = '0x00000000FcB080a4D6c39a9354dA9EB9bC104cd7';
```

### 2. 注册 app FID

如果尚未拥有 app FID，请先注册。注册 FID 需要从 ID Gateway 读取价格，然后调用 ID Gateway 并支付注册费用。您可以从 Id Registry 合约读取新 FID，或从 `Register` 事件解析。此处我们从注册表合约读取。

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

### 3. 收集用户的 `Register` 签名

从用户处收集 EIP-712 `Register` 签名。实际应用中，您可能在前端通过用户钱包收集此签名。前端环境中可使用 `ViemEip712WalletSigner` 连接浏览器钱包而非本地签名器。

```ts
let nonce = await publicClient.readContract({
  address: ID_REGISTRY_ADDRESS,
  abi: idRegistryABI,
  functionName: 'nonces',
  args: [alice.address],
});

const registerSignatureResult = await aliceAccountKey.signRegister({
  to: alice.address as `0x${string}`,
  recovery: WARPCAST_RECOVERY_PROXY,
  nonce,
  deadline,
});

let registerSignature;
if (registerSignatureResult.isOk()) {
  registerSignature = registerSignatureResult.value;
} else {
  throw new Error('生成注册签名失败');
}
```

### 4. 创建新账户密钥对

为用户创建新的 Ed25519 账户密钥对。实际应用中请确保妥善保管用户私钥。

```ts
const privateKeyBytes = ed.utils.randomPrivateKey();
const accountKey = new NobleEd25519Signer(privateKeyBytes);

let accountPubKey = new Uint8Array();
const accountKeyResult = await accountKey.getSignerKey();
```

### 5. 使用应用账户创建 Signed Key Request

由您的应用账户创建并签名 Signed Key Request。可使用 `getSignedKeyRequestMetadata` 辅助函数生成并签名。

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

### 6. 收集用户的 `Add` 签名

从用户处收集 EIP-712 `Add` 签名，授权将其账户密钥添加到 FID。

```ts
if (signedKeyRequestMetadata.isOk()) {
  const metadata = bytesToHex(signedKeyRequestMetadata.value);

  nonce = await publicClient.readContract({
    address: KEY_GATEWAY_ADDRESS,
    abi: keyGatewayABI,
    functionName: 'nonces',
    args: [alice.address],
  });

  const addSignatureResult = await aliceAccountKey.signAdd({
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

### 7. 调用 Bundler 合约完成链上注册

调用 Key Gateway 合约并提供用户签名以在链上添加密钥。

```ts
if (addSignatureResult.isOk()) {
  const addSignature = addSignatureResult.value;

  const price = await publicClient.readContract({
    address: BUNDLER_ADDRESS,
    abi: bundlerABI,
    functionName: 'price',
    args: [0n],
  });

  const { request } = await publicClient.simulateContract({
    account: app,
    address: BUNDLER_ADDRESS,
    abi: bundlerABI,
    functionName: 'register',
    args: [
      {
        to: alice.address,
        recovery: WARPCAST_RECOVERY_PROXY,
        sig: bytesToHex(registerSignature),
        deadline,
      },
      [
        {
          keyType: 1,
          key: bytesToHex(accountPubKey),
          metadataType: 1,
          metadata: metadata,
          sig: bytesToHex(addSignature.value),
          deadline,
        },
      ],
      0n,
    ],
    value: price,
  });
  await walletClient.writeContract(request);
}
```

### 完整代码示例

查看以下完整代码示例包含上述所有步骤。

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
  BUNDLER_ADDRESS,
  bundlerABI,
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
  transport: http('http://localhost:8545'),
});

const walletClient = createWalletClient({
  chain: optimism,
  transport: http('http://localhost:8545'),
});

const app = privateKeyToAccount(APP_PRIVATE_KEY);
const appAccountKey = new ViemLocalEip712Signer(app as any);

const alice = privateKeyToAccount(ALICE_PRIVATE_KEY);
const aliceAccountKey = new ViemLocalEip712Signer(alice as any);

const deadline = BigInt(Math.floor(Date.now() / 1000) + 3600); // 设置签名有效期为当前时间1小时后

const WARPCAST_RECOVERY_PROXY = '0x00000000FcB080a4D6c39a9354dA9EB9bC104cd7';

/*******************************************************************************
 * IdGateway - register - 注册 app FID
 *******************************************************************************/

/**
 *  获取当前注册价格。我们不注册额外存储，因此传入 0n 作为唯一参数
 */
const price = await publicClient.readContract({
  address: ID_GATEWAY_ADDRESS,
  abi: idGatewayABI,
  functionName: 'price',
  args: [0n],
});

/**
 *  调用 `register` 将 FID 注册到应用账户
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
 *  从 Id Registry 合约读取 app fid
 */
const APP_FID = await publicClient.readContract({
  address: ID_REGISTRY_ADDRESS,
  abi: idRegistryABI,
  functionName: 'idOf',
  args: [app.address],
});

/*******************************************************************************
 * 从 Alice 收集 Register 签名
 *******************************************************************************/

let nonce = await publicClient.readContract({
  address: KEY_GATEWAY_ADDRESS,
  abi: keyGatewayABI,
  functionName: 'nonces',
  args: [alice.address],
});

const registerSignatureResult = await aliceAccountKey.signRegister({
  to: alice.address as `0x${string}`,
  recovery: WARPCAST_RECOVERY_PROXY,
  nonce,
  deadline,
});

let registerSignature;
if (registerSignatureResult.isOk()) {
  registerSignature = registerSignatureResult.value;
} else {
  throw new Error('生成注册签名失败');
}

/*******************************************************************************
 * 从 Alice 收集 Add 签名
 *******************************************************************************/

/**
 *  1. 为 Alice 创建 Ed25519 账户密钥对并获取公钥
 */
const privateKeyBytes = ed.utils.randomPrivateKey();
const accountKey = new NobleEd25519Signer(privateKeyBytes);

let accountPubKey = new Uint8Array();
const accountKeyResult = await accountKey.getSignerKey();
if (accountKeyResult.isOk()) {
  accountPubKey = accountKeyResult.value;

  /**
   *  2. 从应用账户生成 Signed Key Request
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
     *  3. 从 Key Gateway 读取 Alice 的 nonce
     */
    nonce = await publicClient.readContract({
      address: KEY_GATEWAY_ADDRESS,
      abi: keyGatewayABI,
      functionName: 'nonces',
      args: [alice.address],
    });

    /**
     *  然后收集她的 `Add` 签名
     */
    const addSignatureResult = await aliceAccountKey.signAdd({
      owner: alice.address as `0x${string}`,
      keyType: 1,
      key: accountPubKey,
      metadataType: 1,
      metadata,
      nonce,
      deadline,
    });

    if (addSignatureResult.isOk()) {
      const addSignature = addSignatureResult.value;
      /**
       *  读取当前注册价格
       */
      const price = await publicClient.readContract({
        address: BUNDLER_ADDRESS,
        abi: bundlerABI,
        functionName: 'price',
        args: [0n],
      });

      /**
       *  使用 Alice 的签名、注册和密钥参数调用 `register`
       */
      const { request } = await publicClient.simulateContract({
        account: app,
        address: BUNDLER_ADDRESS,
        abi: bundlerABI,
        functionName: 'register',
        args: [
          {
            to: alice.address,
            recovery: WARPCAST_RECOVERY_PROXY,
            sig: bytesToHex(registerSignature),
            deadline,
          },
          [
            {
              keyType: 1,
              key: bytesToHex(accountPubKey),
              metadataType: 1,
              metadata: metadata,
              sig: bytesToHex(addSignature),
              deadline,
            },
          ],
          0n,
        ],
        value: price,
      });
      await walletClient.writeContract(request);
    }
  }
}
```

:::

更多详情请参阅 [Bundler](/zh/reference/contracts/reference/bundler#register) 参考文档。
