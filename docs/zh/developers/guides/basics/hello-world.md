# Hello World

通过编程方式创建您的 Farcaster 账户并发布第一条 "Hello World" 消息。

本示例将展示如何：

- 通过链上交易创建账户
- 租赁存储单元以便发布消息
- 添加账户密钥用于消息签名
- 为账户获取 fname
- 创建、签名并发布消息

完整可运行的代码仓库可在此处查看：[这里](https://github.com/farcasterxyz/hub-monorepo/tree/main/packages/hub-nodejs/examples/hello-world)

### 前提条件

- 对 hub 的写入权限（可以是自建或第三方 hub）
- 一个 ETH 钱包，其中包含约 10 美元等值的 ETH 并已桥接至 [Optimism](https://www.optimism.io/)
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
 * 用您自己的值填充以下常量
 */
const MNEMONIC = '<必填>';
const OP_PROVIDER_URL = '<必填>'; // Alchemy 或 Infura 的 URL
const RECOVERY_ADDRESS = zeroAddress; // 可选，使用默认值意味着如果助记词丢失，账户将无法恢复
const ACCOUNT_KEY_PRIVATE_KEY: Hex = zeroAddress; // 可选，使用默认值意味着每次都会创建新的账户密钥

// 注意：hoyt 是 Farcaster 团队的主网 hub，受密码保护以防止滥用。请使用第三方 hub
// 提供商如 https://neynar.com/ 或者运行您自己的主网 hub 并无许可地向其广播。
const HUB_URL = 'hoyt.farcaster.xyz:2283'; // Hub 的 URL + 端口
const HUB_USERNAME = ''; // 认证用户名，如果不使用 TLS 则留空
const HUB_PASS = ''; // 认证密码，如果不使用 TLS 则留空
const USE_SSL = false; // 如果连接到使用 SSL 的 hub（第三方托管的 hub 或需要认证的 hub）则设为 true
const FC_NETWORK = FarcasterNetwork.MAINNET; // Hub 的网络

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

创建一个函数来注册 FID 并支付存储费用。该函数会检查账户是否已有 FID，如果有则直接返回。

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
  // 现在从日志中提取 FID
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

现在，我们将向密钥注册表添加一个账户密钥。每个账户密钥都必须有来自请求它的应用的 fid 的签名元数据字段。
在本例中，我们将使用自己的 fid。注意，这需要使用持有 fid 的地址的私钥对消息进行签名。如果无法做到这一点，
请先为应用注册一个单独的 fid 并使用它。

```typescript
const getOrRegisterAccountKey = async (fid: number) => {
  if (ACCOUNT_KEY_PRIVATE_KEY !== zeroAddress) {
    // 如果提供了私钥，我们假设账户密钥已在密钥注册表中
    const privateKeyBytes = fromHex(ACCOUNT_KEY_PRIVATE_KEY, 'bytes');
    const publicKeyBytes = ed25519.getPublicKey(privateKeyBytes);
    return privateKeyBytes;
  }

  const privateKey = ed25519.utils.randomPrivateKey();
  const publicKey = toHex(ed25519.getPublicKey(privateKey));

  const eip712signer = new ViemLocalEip712Signer(appAccount);
  // 要添加密钥，我们需要用应用 fid 对元数据进行签名
  // 使用您的个人 fid，或为应用注册单独的 fid
  const metadata = await eip712signer.getSignedKeyRequestMetadata({
    requestFid: APP_FID,
    key: APP_PRIVATE_KEY,
    deadline: Math.floor(Date.now() / 1000) + 60 * 60, // 从现在起 1 小时
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
  // 等待 30 秒以便 hub 获取 accountKey 交易
  await new Promise((resolve) => setTimeout(resolve, 30000));
  return privateKey;
};

const accountPrivateKey = await getOrRegisterAccountKey(fid);
```

## 4. 注册 fname

现在链上操作已完成，让我们使用 farcaster 的链下 fname 注册表注册一个 fname。
注册 fname 需要 fid 的托管地址的签名。

```typescript
const registerFname = async (fid: number) => {
  try {
    // 首先检查此 fid 是否已有 fname
    const response = await axios.get(
      `https://fnames.farcaster.xyz/transfers/current?fid=${fid}`
    );
    const fname = response.data.transfer.username;
    return fname;
  } catch (e) {
    // 没有用户名，忽略并继续注册
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
    from: 0, // 转移来源的 Fid（0 表示新注册）
    to: fid, // 转移目标的 Fid（0 表示注销）
    fid: fid, // 发起请求的 Fid（必须与 from 或 to 匹配）
    owner: account.address, // 发起请求的 fid 的托管地址
    timestamp: timestamp, // 当前时间戳（秒）
    signature: userNameProofSignature, // 由 fid 当前托管地址签名的 EIP-712 签名
  });
  return fname;
};

const fname = await registerFname(fid);
```

注意，这只是将名称与我们的 fid 关联，我们仍需将其设置为用户名。

## 5. 写入 hub

最后，我们现在可以向 hub 提交消息了。首先，我们将 fname 设置为用户名，然后发布一条 cast。

```typescript
const submitMessage = async (resultPromise: HubAsyncResult<Message>) => {
  const result = await resultPromise;
  if (result.isErr()) {
    throw new Error(`创建消息时出错: ${result.error}`);
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

现在，您可以在任何 farcaster 客户端上查看您的个人资料。要在 Warpcast 上查看，请访问 `https://warpcast.com/@<fname>`
