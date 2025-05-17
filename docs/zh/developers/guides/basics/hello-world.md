# 你好，世界

通过编程方式创建您的 Farcaster 账户并发布第一条 "Hello World" 消息。

本示例将展示如何：

- 通过链上交易创建账户
- 租赁存储单元以便发布消息
- 添加账户密钥用于消息签名
- 为账户获取 fname（用户名）
- 创建、签名并发布消息

完整功能代码库可在此处查看：[GitHub 仓库](https://github.com/farcasterxyz/hub-monorepo/tree/main/packages/hub-nodejs/examples/hello-world)

### 前提条件

- 对某个 hub 的写入权限（可以是自建或第三方 hub）
- 一个 ETH 钱包，其中至少有约 10 美元等值的 ETH 已桥接至 [Optimism](https://www.optimism.io/)
- OP 主网的 ETH RPC URL（可通过 [Alchemy](https://www.alchemy.com/)、[Infura](https://www.infura.io/) 或 [QuickNode](https://www.quicknode.com/) 获取）

## 1. 设置常量

```typescript
import {
  ID_GATEWAY_ADDRESS,
  idGatewayABI,
  KEY_GATEWAY_ADDRESS,
  keyGatewayABI,
  ID_REGISTRY_ADDRESS,
  idRegistryABI,
  FarcasterNetwork,
} from '@farcaster/hub-web';
import { zeroAddress } from 'viem';
import { optimism } from 'viem/chains';

/**
 * 请用实际值替换以下常量
 */
const MNEMONIC = '<必填>';
const OP_PROVIDER_URL = '<必填>'; // Alchemy 或 Infura 的 URL
const RECOVERY_ADDRESS = zeroAddress; // 可选，使用默认值表示若助记词丢失后将无法恢复账户
const ACCOUNT_KEY_PRIVATE_KEY: Hex = zeroAddress; // 可选，使用默认值表示每次都会创建新的账户密钥

// 注意：hoyt 是 Farcaster 团队的主网 hub，设有密码保护以防止滥用。请使用第三方 hub
// 服务商如 https://neynar.com/ 或自行运行主网 hub 进行无权限广播
const HUB_URL = 'hoyt.farcaster.xyz:2283'; // Hub 的 URL + 端口
const HUB_USERNAME = ''; // 认证用户名，如不使用 TLS 请留空
const HUB_PASS = ''; // 认证密码，如不使用 TLS 请留空
const USE_SSL = false; // 设为 true 表示连接到使用 SSL 的 hub（第三方托管 hub 或需要认证的 hub）
const FC_NETWORK = FarcasterNetwork.MAINNET; // Hub 所属网络

const CHAIN = optimism;

const IdGateway = {
  abi: idGatewayABI,
  address: ID_GATEWAY_ADDRESS,
  chain: CHAIN,
};
const IdContract = {
  abi: idRegistryABI,
  address: ID_REGISTRY_ADDRESS,
  chain: CHAIN,
};
const KeyContract = {
  abi: keyGatewayABI,
  address: KEY_GATEWAY_ADDRESS,
  chain: CHAIN,
};
```

## 2. 注册并支付存储费用

创建函数来注册 FID 并支付存储费用。该函数会检查账户是否已有 FID，若有则直接返回。

```typescript
const getOrRegisterFid = async (): Promise<number> => {
  const balance = await walletClient.getBalance({ address: account.address });
  // 检查是否已有 fid
  const existingFid = (await walletClient.readContract({
    ...IdContract,
    functionName: 'idOf',
    args: [account.address],
  })) as bigint;

  if (existingFid > 0n) {
    return parseInt(existingFid.toString());
  }

  const price = await walletClient.readContract({
    ...IdGateway,
    functionName: 'price',
  });
  if (balance < price) {
    throw new Error(`余额不足以租赁存储，需要: ${price}，当前余额: ${balance}`);
  }
  const { request: registerRequest } = await walletClient.simulateContract({
    ...IdGateway,
    functionName: 'register',
    args: [RECOVERY_ADDRESS],
    value: price,
  });
  const registerTxHash = await walletClient.writeContract(registerRequest);
  const registerTxReceipt = await walletClient.waitForTransactionReceipt({
    hash: registerTxHash,
  });
  // 从日志中提取 FID
  const registerLog = decodeEventLog({
    abi: idRegistryABI,
    data: registerTxReceipt.logs[0].data,
    topics: registerTxReceipt.logs[0].topics,
  });
  const fid = parseInt(registerLog.args['id']);
  return fid;
};

const fid = await getOrRegisterFid();
```

## 3. 添加账户密钥

现在我们将向密钥注册表添加账户密钥。每个账户密钥必须包含来自请求应用 fid 的签名元数据字段。本例中我们将使用自己的 fid。注意：这需要使用持有该 fid 的地址私钥对消息签名。若无法实现，请先为应用单独注册 fid 并使用该 fid。

```typescript
const getOrRegisterAccountKey = async (fid: number) => {
  if (ACCOUNT_KEY_PRIVATE_KEY !== zeroAddress) {
    // 若提供了私钥，则假定账户密钥已在密钥注册表中
    const privateKeyBytes = fromHex(ACCOUNT_KEY_PRIVATE_KEY, 'bytes');
    const publicKeyBytes = ed25519.getPublicKey(privateKeyBytes);
    return privateKeyBytes;
  }

  const privateKey = ed25519.utils.randomPrivateKey();
  const publicKey = toHex(ed25519.getPublicKey(privateKey));

  const eip712signer = new ViemLocalEip712Signer(appAccount);
  // 添加密钥需要代表应用的 fid 对元数据进行签名
  // 使用您的个人 fid 或为应用单独注册的 fid
  const metadata = await eip712signer.getSignedKeyRequestMetadata({
    requestFid: APP_FID,
    key: APP_PRIVATE_KEY,
    deadline: Math.floor(Date.now() / 1000) + 60 * 60, // 当前时间 1 小时后
  });

  const { request: signerAddRequest } = await walletClient.simulateContract({
    ...KeyContract,
    functionName: 'add',
    args: [1, publicKey, 1, metadata], // keyType, publicKey, metadataType, metadata
  });

  const accountKeyAddTxHash = await walletClient.writeContract(
    signerAddRequest
  );
  await walletClient.waitForTransactionReceipt({ hash: accountKeyAddTxHash });
  // 等待 30 秒让 hub 获取 accountKey 交易
  await new Promise((resolve) => setTimeout(resolve, 30000));
  return privateKey;
};

const accountPrivateKey = await getOrRegisterAccountKey(fid);
```

## 4. 注册 fname

完成链上操作后，现在使用 farcaster 链下 fname 注册表注册 fname。注册 fname 需要 fid 托管地址的签名。

```typescript
const registerFname = async (fid: number) => {
  try {
    // 首先检查该 fid 是否已有 fname
    const response = await axios.get(
      `https://fnames.farcaster.xyz/transfers/current?fid=${fid}`
    );
    const fname = response.data.transfer.username;
    return fname;
  } catch (e) {
    // 无用户名则忽略，继续注册流程
  }

  const fname = `fid-${fid}`;
  const timestamp = Math.floor(Date.now() / 1000);
  const userNameProofSignature = await walletClient.signTypedData({
    domain: USERNAME_PROOF_DOMAIN,
    types: USERNAME_PROOF_TYPE,
    primaryType: 'UserNameProof',
    message: {
      name: fname,
      timestamp: BigInt(timestamp),
      owner: account.address,
    },
  });

  const response = await axios.post('https://fnames.farcaster.xyz/transfers', {
    name: fname, // 要注册的名称
    from: 0, // 来源 fid（0 表示新注册）
    to: fid, // 目标 fid（0 表示注销）
    fid: fid, // 发起请求的 fid（必须匹配 from 或 to）
    owner: account.address, // 发起请求 fid 的托管地址
    timestamp: timestamp, // 当前时间戳（秒）
    signature: userNameProofSignature, // 由 fid 当前托管地址签名的 EIP-712 签名
  });
  return fname;
};

const fname = await registerFname(fid);
```

注意：这仅将名称与 fid 关联，我们仍需将其设置为用户名。

## 5. 写入 hub

最后，我们现在可以向 hub 提交消息了。首先设置 fname 作为用户名，然后发布一条 cast。

```typescript
const submitMessage = async (resultPromise: HubAsyncResult<Message>) => {
  const result = await resultPromise;
  if (result.isErr()) {
    throw new Error(`创建消息出错: ${result.error}`);
  }
  await hubClient.submitMessage(result.value);
};

const accountKey = new NobleEd25519Signer(accountPrivateKey);
const dataOptions = {
  fid: fid,
  network: FC_NETWORK,
};
const userDataUsernameBody = {
  type: UserDataType.USERNAME,
  value: fname,
};
// 设置用户名
await submitMessage(
  makeUserDataAdd(userDataUsernameBody, dataOptions, accountKey)
);

// 发布 cast
await submitMessage(
  makeCastAdd(
    {
      text: 'Hello World!',
    },
    dataOptions,
    accountKey
  )
);
```

现在，您可以在任何 farcaster 客户端查看个人资料。要在 Warpcast 上查看，请访问 `https://warpcast.com/@<fname>`
