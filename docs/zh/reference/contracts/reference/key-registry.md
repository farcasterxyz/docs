---
outline: [2, 3]
---

# 密钥注册表

密钥注册表存储与每个 Farcaster 账户关联的公钥。

如需读取 Farcaster 账户密钥信息或移除现有密钥，请使用密钥注册表。

如需添加新密钥，请改用[密钥网关](/reference/contracts/reference/key-gateway.md)。

## 读取

### totalKeys

获取指定 fid 的活跃密钥数量（`uint256`）。

| 参数  | 类型                             | 说明                   |
| ----- | -------------------------------- | ---------------------- |
| fid   | `uint256`                        | 要查询的 fid           |
| state | `uint8` (1 表示添加，2 表示移除) | 密钥状态（添加或移除） |

### keysOf

列出指定 fid 的所有公钥（`bytes[]`）。

| 参数      | 类型                             | 说明                   |
| --------- | -------------------------------- | ---------------------- |
| fid       | `uint256`                        | 要查询的 fid           |
| state     | `uint8` (1 表示添加，2 表示移除) | 密钥状态（添加或移除） |
| startIdx  | `uint256` (可选)                 | 分页起始索引           |
| batchSize | `uint256` (可选)                 | 分页批量大小           |

::: warning
请勿在链上调用！此函数 gas 消耗极高，仅限链下工具调用，不适用于其他合约。
:::

### keyDataOf

返回指定 fid 中特定密钥的状态（`uint8`）和密钥类型（`uint32`）。

| 参数 | 类型      | 说明         |
| ---- | --------- | ------------ |
| fid  | `uint256` | 要查询的 fid |
| key  | `bytes`   | 要检查的公钥 |

## 写入

### add

直接调用将回滚。必须通过[密钥网关](/reference/contracts/reference/key-gateway.md)调用。

### remove

从调用者的 fid 中移除公钥并标记为`已移除`。

| 参数 | 类型    | 说明         |
| ---- | ------- | ------------ |
| key  | `bytes` | 要移除的公钥 |

::: warning
移除密钥将删除 Hubs 中与该密钥关联的所有链下消息。
:::

### removeFor

通过提供签名代表其他 fid 移除密钥。fid 所有者必须签署 EIP-712 `Remove`消息以授权移除。如果密钥不存在或已被移除，则回滚。

| 参数     | 类型      | 说明                          |
| -------- | --------- | ----------------------------- |
| fidOwner | `address` | fid 所有者地址                |
| key      | `bytes`   | 要移除的公钥                  |
| deadline | `uint256` | 签名截止时间                  |
| sig      | `bytes`   | 来自`fidOwner`的 EIP-712 签名 |

::: warning
移除密钥将删除 Hubs 中与该密钥关联的所有链下消息。
:::

#### 移除签名

要代表其他账户移除密钥，必须提供符合以下格式的 EIP-712 类型签名：

`Remove(address owner,bytes key,uint256 nonce,uint256 deadline)`

| 参数     | 类型      | 说明                                        |
| -------- | --------- | ------------------------------------------- |
| owner    | `address` | 拥有 fid 的地址。类型消息必须由此地址签名。 |
| key      | `bytes`   | 要移除的公钥                                |
| nonce    | `uint256` | `owner`地址的当前 nonce 值                  |
| deadline | `uint256` | 签名过期时间戳                              |

::: code-group

```ts [@farcaster/hub-web]
import { ViemWalletEip712Signer } from '@farcaster/hub-web';
import { walletClient, account } from './clients.ts';
import { getPublicKey } from './signer.ts';
import { readNonce, getDeadline } from './helpers.ts';

const publicKey = await getPublicKey();
const nonce = await readNonce();
const deadline = getDeadline();

const eip712Signer = new ViemWalletEip712Signer(walletClient);
const signature = await eip712signer.signRemove({
  owner: account,
  key: publicKey,
  nonce,
  deadline,
});
```

```ts [Viem]
import { KEY_REGISTRY_EIP_712_TYPES } from '@farcaster/hub-web';
import { bytesToHex } from 'viem';
import { walletClient, account } from './clients.ts';
import { getPublicKey } from './signer.ts';
import { readNonce, getDeadline } from './helpers.ts';

const publicKey = await getPublicKey();
const nonce = await readNonce();
const deadline = getDeadline();

const signature = await walletClient.signTypedData({
  account,
  ...KEY_REGISTRY_EIP_712_TYPES,
  primaryType: 'Remove',
  message: {
    owner: account,
    key: bytesToHex(publicKey),
    nonce,
    deadline,
  },
});
```

```ts [helpers.ts]
import { KEY_REGISTRY_ADDRESS, keyRegistryABI } from '@farcaster/hub-web';
import { publicClient, account } from './clients.ts';

export const getDeadline = () => {
  const now = Math.floor(Date.now() / 1000);
  const oneHour = 60 * 60;
  return now + oneHour;
};

export const readNonce = async () => {
  return await publicClient.readContract({
    address: KEY_REGISTRY_ADDRESS,
    abi: keyRegistryABI,
    functionName: 'nonces',
    args: [account],
  });
};
```

<<< @/examples/contracts/signer.ts

<<< @/examples/contracts/clients.ts

:::

## 错误

| 错误类型         | 选择器     | 说明                                                                           |
| ---------------- | ---------- | ------------------------------------------------------------------------------ |
| ExceedsMaximum   | `29264042` | 添加密钥超出每个 fid 允许的最大密钥数（当前为 1000）                           |
| InvalidSignature | `8baa579f` | 提供的签名无效。可能格式错误或由错误地址签名。                                 |
| InvalidState     | `baf3f0f7` | 操作违反状态转换规则（添加已存在的密钥、移除不存在的密钥、添加已被移除的密钥） |
| SignatureExpired | `0819bdcd` | 提供的签名已过期。请从签名者处获取带有更晚截止时间戳的新签名。                 |

## 源代码

[`KeyRegistry.sol`](https://github.com/farcasterxyz/contracts/blob/1aceebe916de446f69b98ba1745a42f071785730/src/KeyRegistry.sol)
