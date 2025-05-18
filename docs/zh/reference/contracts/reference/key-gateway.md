---
outline: [2, 3]
---

# 密钥网关

密钥网关用于向[密钥注册表](/zh/reference/contracts/reference/key-registry.md)添加新密钥。

如需为 Farcaster 账户添加新的公钥，请使用密钥网关。

## 读取操作

### nonces

返回指定地址的下一个可用 nonce 值。用于在 [addFor](#addFor) 操作中生成 EIP-712 签名。

| 参数  | 类型      | 描述                    |
| ----- | --------- | ----------------------- |
| owner | `address` | 需要查询 nonce 值的地址 |

## 写入操作

### add

为调用者的 fid 添加新密钥，并将其状态设为 `Added`。如果密钥已注册则回滚操作。

| 参数         | 类型     | 描述                                                                                                                                  |
| ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| keyType      | `uint32` | 必须设为 `1`。这是当前唯一支持的 `keyType` 值。                                                                                       |
| key          | `bytes`  | 待添加的公钥                                                                                                                          |
| metadataType | `uint8`  | 必须设为 `1`。这是当前唯一支持的 `metadataType` 值。                                                                                  |
| metadata     | `bytes`  | 编码后的 [`SignedKeyRequestMetadata`](/zh/reference/contracts/reference/signed-key-request-validator#signedkeyrequestmetadata-struct) |

### addFor

通过提供签名代表其他 fid 添加密钥。所有者必须签署 EIP-712 `Add` 消息来批准该密钥。如果密钥已注册则回滚操作。

| 参数         | 类型      | 描述                                                                                                                                  |
| ------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| fidOwner     | `address` | fid 所有者的地址                                                                                                                      |
| keyType      | `uint32`  | 必须设为 `1`。这是当前唯一支持的 `keyType` 值。                                                                                       |
| key          | `bytes`   | 待添加的公钥                                                                                                                          |
| metadataType | `uint8`   | 必须设为 `1`。这是当前唯一支持的 `metadataType` 值。                                                                                  |
| metadata     | `bytes`   | 编码后的 [`SignedKeyRequestMetadata`](/zh/reference/contracts/reference/signed-key-request-validator#signedkeyrequestmetadata-struct) |
| deadline     | `uint256` | 签名过期时间戳                                                                                                                        |
| sig          | `bytes`   | 来自 `fidOwner` 的 EIP-712 [`Add`](/zh/reference/contracts/reference/key-gateway#add-signature) 签名                                  |

#### Add 签名

要代表其他账户添加密钥，必须提供符合以下格式的 EIP-712 类型签名：

`Add(address owner,uint32 keyType,bytes key,uint8 metadataType,bytes metadata,uint256 nonce,uint256 deadline)`

| 参数         | 类型      | 描述                                                                                                                                  |
| ------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| owner        | `address` | 拥有 fid 的地址。该类型化消息必须由此地址签名。                                                                                       |
| keyType      | `uint32`  | 必须设为 `1`。这是当前唯一支持的 `keyType` 值。                                                                                       |
| key          | `bytes`   | 待添加的公钥                                                                                                                          |
| metadataType | `uint8`   | 必须设为 `1`。这是当前唯一支持的 `metadataType` 值。                                                                                  |
| metadata     | `bytes`   | 编码后的 [`SignedKeyRequestMetadata`](/zh/reference/contracts/reference/signed-key-request-validator#signedkeyrequestmetadata-struct) |
| nonce        | `uint256` | `owner` 地址的当前 nonce 值                                                                                                           |
| deadline     | `uint256` | 签名过期时间戳                                                                                                                        |

::: code-group

```ts [@farcaster/hub-web]
import { ViemWalletEip712Signer } from '@farcaster/hub-web';
import { walletClient, account } from './clients.ts';
import { getPublicKey } from './signer.ts';
import { readNonce, getDeadline } from './helpers.ts';

const publicKey = await getPublicKey();
const metadata = await getMetadata();
const nonce = await readNonce();
const deadline = getDeadline();

const eip712Signer = new ViemWalletEip712Signer(walletClient);
const signature = await eip712signer.signAdd({
  owner: account,
  keyType: 1,
  key: publicKey,
  metadataType: 1,
  metadata,
  nonce,
  deadline,
});
```

```ts [Viem]
import { KEY_GATEWAY_EIP_712_TYPES } from '@farcaster/hub-web';
import { bytesToHex } from 'viem';
import { walletClient, account } from './clients.ts';
import { getPublicKey } from './signer.ts';
import { getMetadata } from './metadata.ts';
import { readNonce, getDeadline } from './helpers.ts';

const publicKey = await getPublicKey();
const metadata = await getMetadata();
const nonce = await readNonce();
const deadline = getDeadline();

const signature = await walletClient.signTypedData({
  account,
  ...KEY_GATEWAY_EIP_712_TYPES,
  primaryType: 'Add',
  message: {
    owner: account,
    keyType: 1,
    key: bytesToHex(publicKey),
    metadataType: 1,
    metadata,
    nonce,
    deadline,
  },
});
```

```ts [helpers.ts]
import { KEY_GATEWAY_ADDRESS, keyGatewayABI } from '@farcaster/hub-web';
import { publicClient, account } from './clients.ts';

export const getDeadline = () => {
  const now = Math.floor(Date.now() / 1000);
  const oneHour = 60 * 60;
  return now + oneHour;
};

export const readNonce = async () => {
  return await publicClient.readContract({
    address: KEY_GATEWAY_ADDRESS,
    abi: keyGatewayABI,
    functionName: 'nonces',
    args: [account],
  });
};
```

<<< @/examples/contracts/metadata.ts

<<< @/examples/contracts/signer.ts

<<< @/examples/contracts/clients.ts

:::

## 错误类型

| 错误类型         | 选择器     | 描述                                                         |
| ---------------- | ---------- | ------------------------------------------------------------ |
| InvalidMetadata  | `bcecb64a` | 提供的签名元数据无效。                                       |
| InvalidSignature | `8baa579f` | 提供的签名无效。可能是格式错误，或由错误的地址签署。         |
| SignatureExpired | `0819bdcd` | 提供的签名已过期。请向签署者获取带有更晚截止时间戳的新签名。 |

## 源代码

[`KeyGateway.sol`](https://github.com/farcasterxyz/contracts/blob/1aceebe916de446f69b98ba1745a42f071785730/src/KeyGateway.sol)
