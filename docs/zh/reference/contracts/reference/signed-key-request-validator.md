---
outline: [2, 3]
---

# 签名密钥请求验证器

签名密钥请求验证器用于验证与密钥关联的签名元数据。密钥注册表在添加密钥前会调用该验证器，以检查提供的签名密钥请求是否有效。

如需构造或校验签名密钥请求，请使用签名密钥请求验证器。

::: info 什么是签名密钥请求？

当用户向账户（主 fid）添加密钥时，必须包含请求者（请求 fid）的签名。这使得任何人都能识别特定密钥的请求者。

通常情况下，主 fid 是终端用户，而请求 fid 是用户希望连接的应用程序。
:::

## 读取

### encodeMetadata

将 [`SignedKeyRequestMetadata`](#signedkeyrequestmetadata-结构体) 结构体转换为 `bytes`，以便传入 [add](/zh/reference/contracts/reference/key-gateway#add)、[register](/zh/reference/contracts/reference/bundler#register) 等合约函数。

| 参数     | 类型                       | 描述                                         |
| -------- | -------------------------- | -------------------------------------------- |
| metadata | `SignedKeyRequestMetadata` | 需要编码的 `SignedKeyRequestMetadata` 结构体 |

#### SignedKeyRequestMetadata 结构体

`SignedKeyRequestMetadata` 结构体包含验证签名密钥请求真实性所需的数据：请求 fid、请求 fid 所有者以及 EIP-712 [`SignedKeyRequest`](#signedkeyrequest-签名) 签名。

| 参数          | 类型      | 描述                                                                                  |
| ------------- | --------- | ------------------------------------------------------------------------------------- |
| requestFid    | `uint256` | 请求 fid                                                                              |
| requestSigner | `address` | 请求 fid 的所有者地址                                                                 |
| signature     | `bytes`   | 来自 `requestSigner` 地址的 EIP-712 [`SignedKeyRequest`](#signedkeyrequest-签名) 签名 |
| deadline      | `uint256` | 签名的过期时间戳                                                                      |

以下代码示例展示了两种生成编码 `SignedKeyRequestMetadata` 的方法——使用 `@farcaster/hub-web` 库一步完成签名和编码，或使用 Viem 分别进行签名和编码。

::: code-group

```ts [@farcaster/hub-web]
import { ViemLocalEip712Signer } from '@farcaster/hub-web';
import { privateKeyToAccount } from 'viem/accounts';
import { getDeadline } from './helpers.ts';
import { getPublicKey } from './signer.ts';

export const appAccount = privateKeyToAccount('0x...');

const key = getPublicKey();
const deadline = getDeadline();

// getSignedKeyRequestMetadata 辅助函数会生成 SignedKeyRequest
// 签名并返回 ABI 编码的 SignedKeyRequest 元数据结构体。
const eip712Signer = new ViemLocalEip712Signer(appAccount);
const encodedData = await eip712Signer.getSignedKeyRequestMetadata({
  requestFid: 9152n,
  key,
  deadline,
});
```

```ts [Viem]
import { bytesToHex, encodeAbiParameters } from 'viem';
import { signature } from './signature.ts';
import { getDeadline } from './helpers.ts';

const deadline = getDeadline();

// 分别收集签名和编码 SignedKeyRequest 元数据的示例。
const encodedData = encodeAbiParameters(
  [
    {
      components: [
        {
          name: 'requestFid',
          type: 'uint256',
        },
        {
          name: 'requestSigner',
          type: 'address',
        },
        {
          name: 'signature',
          type: 'bytes',
        },
        {
          name: 'deadline',
          type: 'uint256',
        },
      ],
      type: 'tuple',
    },
  ],
  [
    {
      requestFid: 9152n,
      requestSigner: '0x02ef790dd7993a35fd847c053eddae940d055596',
      bytesToHex(signature),
      deadline,
    },
  ]
);
```

```ts [signature.ts]
import { ViemLocalEip712Signer } from '@farcaster/hub-web';
import { privateKeyToAccount } from 'viem/accounts';
import { getDeadline } from './helpers.ts';
import { getPublicKey } from './signer.ts';

export const appAccount = privateKeyToAccount('0x...');

const key = getPublicKey();
const deadline = getDeadline();

const eip712Signer = new ViemLocalEip712Signer(appAccount);
const signature = await eip712Signer.signKeyRequest({
  requestFid: 9152n,
  key,
  deadline,
});
```

```ts [helpers.ts]
export const getDeadline = () => {
  const now = Math.floor(Date.now() / 1000);
  const oneHour = 60 * 60;
  return now + oneHour;
};
```

<<< @/examples/contracts/signer.ts

:::

### validate

验证编码后的 [`SignedKeyRequestMetadata`](#signedkeyrequestmetadata-结构体)。密钥注册表在用户添加密钥时会内部调用此函数来验证签名密钥请求。如果您代表用户创建密钥，可以自行调用此函数来验证应用程序创建的签名密钥请求。

| 参数 | 类型      | 描述                                                 |
| ---- | --------- | ---------------------------------------------------- |
| fid  | `uint256` | 将与密钥关联的主 fid                                 |
| key  | `bytes`   | 需要验证的公钥字节                                   |
| sig  | `bytes`   | 请求密钥的实体提供的 EIP-712 `SignedKeyRequest` 签名 |

#### SignedKeyRequest 签名

`SignedKeyRequest` 消息是由请求 fid 所有者按照以下格式签名的 EIP-712 类型签名：

`SignedKeyRequest(uint256 requestFid,bytes key,uint256 deadline)`

::: info 为什么要签名元数据？
`SignedKeyRequest` 签名证明请求 fid 要求主 fid 授权密钥对。例如，当应用程序要求用户添加新密钥时，应用程序会创建签名密钥请求以证明其发起了请求，密钥注册表会在链上事件中发出该请求。这使得任何人都能将签名者归因于特定的请求者，这对于从了解正在使用的应用程序到基于生成内容的应用程序过滤内容等各种用途都非常有用。
:::

| 参数       | 类型      | 描述             |
| ---------- | --------- | ---------------- |
| requestFid | `uint256` | 实体的 fid       |
| key        | `bytes`   | 公钥字节         |
| deadline   | `uint256` | 签名的过期时间戳 |

::: code-group

```ts [@farcaster/hub-web]
import { ViemLocalEip712Signer } from '@farcaster/hub-web';
import { privateKeyToAccount } from 'viem/accounts';
import { getDeadline } from './helpers.ts';
import { getPublicKey } from './signer.ts';

export const appAccount = privateKeyToAccount('0x...');

const key = getPublicKey();
const deadline = getDeadline();

const eip712Signer = new ViemLocalEip712Signer(appAccount);
const signature = await eip712Signer.signKeyRequest({
  requestFid: 9152n,
  key,
  deadline,
});
```

```ts [Viem]
import { SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_TYPES } from '@farcaster/hub-web';
import { bytesToHex, privateKeyToAccount } from 'viem/accounts';
import { getDeadline } from './helpers.ts';
import { getPublicKey } from './signer.ts';

export const appAccount = privateKeyToAccount('0x...');

const key = getPublicKey();
const deadline = getDeadline();

const signature = await appAccount.signTypedData({
  ...SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_TYPES,
  primaryType: 'SignedKeyRequest',
  message: {
    requestFid: 9152n,
    key: bytesToHex(key),
    deadline,
  },
});
```

```ts [helpers.ts]
export const getDeadline = () => {
  const now = Math.floor(Date.now() / 1000);
  const oneHour = 60 * 60;
  return now + oneHour;
};
```

<<< @/examples/contracts/signer.ts

:::

## 源代码

[`SignedKeyRequestValidator.sol`](https://github.com/farcasterxyz/contracts/blob/1aceebe916de446f69b98ba1745a42f071785730/src/validators/SignedKeyRequestValidator.sol)
