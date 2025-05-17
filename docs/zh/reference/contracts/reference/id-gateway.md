---
outline: [2, 3]
---

# ID 网关

ID 网关用于注册新的 Farcaster ID 并将其添加到 [ID 注册表](/reference/contracts/reference/id-registry.md)。

如需创建新的 Farcaster ID，请使用 ID 网关。

## 读取操作

### 价格查询

获取注册一个 fid 所需支付的 wei 金额。该价格包含 1 个存储单元的费用。使用 `extraStorage` 参数可计算包含额外存储单元的总费用。

| 参数         | 类型             | 描述                       |
| ------------ | ---------------- | -------------------------- |
| extraStorage | `uint256` (可选) | 需要增加的额外存储单元数量 |

### 查询 Nonce 值

获取指定地址的下一个未使用 nonce 值。用于为 [registerFor](#registerfor) 操作生成 EIP-712 [`注册`](#register-signature) 签名。

| 参数  | 类型      | 描述                  |
| ----- | --------- | --------------------- |
| owner | `address` | 需要查询 nonce 的地址 |

## 写入操作

### 注册

为调用者注册新 fid 并支付存储费用。调用者不得已拥有 fid。

| 参数         | 类型             | 描述                       |
| ------------ | ---------------- | -------------------------- |
| `msg.value`  | `wei`            | 注册支付金额               |
| recovery     | `address`        | 新 fid 的恢复地址          |
| extraStorage | `uint256` (可选) | 需要租赁的额外存储单元数量 |

### 代注册

为指定地址注册新 fid 并支付存储费用。接收地址必须签署 EIP-712 [`注册`](#register-signature) 消息以授权注册。接收者不得已拥有 fid。

| 参数         | 类型             | 描述                                |
| ------------ | ---------------- | ----------------------------------- |
| `msg.value`  | `wei`            | 注册支付金额                        |
| to           | `address`        | fid 的目标注册地址                  |
| recovery     | `address`        | 新 fid 的恢复地址                   |
| deadline     | `uint256`        | 签名过期时间戳                      |
| sig          | `bytes`          | 来自 `to` 地址的 EIP-712 `注册`签名 |
| extraStorage | `uint256` (可选) | 额外存储单元数量                    |

#### 注册签名

要代表其他账户注册 fid，必须提供接收地址的 EIP-712 结构化签名，格式如下：

`Register(address to,address recovery,uint256 nonce,uint256 deadline)`

| 参数     | 类型      | 描述                                               |
| -------- | --------- | -------------------------------------------------- |
| to       | `address` | fid 的目标注册地址。该结构化消息必须由此地址签名。 |
| recovery | `address` | 新 fid 的恢复地址                                  |
| nonce    | `uint256` | `to` 地址的当前 nonce 值                           |
| deadline | `uint256` | 签名过期时间戳                                     |

::: code-group

```ts [@farcaster/hub-web]
import { ViemWalletEip712Signer } from '@farcaster/hub-web';
import { walletClient, account } from './clients.ts';
import { readNonce, getDeadline } from './helpers.ts';

const nonce = await readNonce();
const deadline = getDeadline();

const eip712Signer = new ViemWalletEip712Signer(walletClient);
const signature = await eip712signer.signRegister({
  to: account,
  recovery: '0x00000000FcB080a4D6c39a9354dA9EB9bC104cd7',
  nonce,
  deadline,
});
```

```ts [Viem]
import { ID_GATEWAY_EIP_712_TYPES } from '@farcaster/hub-web';
import { walletClient, account } from './clients.ts';
import { readNonce, getDeadline } from './helpers.ts';

const nonce = await readNonce();
const deadline = getDeadline();

const signature = await walletClient.signTypedData({
  account,
  ...ID_GATEWAY_EIP_712_TYPES,
  primaryType: 'Register',
  message: {
    to: account,
    recovery: '0x00000000FcB080a4D6c39a9354dA9EB9bC104cd7',
    nonce,
    deadline,
  },
});
```

```ts [helpers.ts]
import { ID_GATEWAY_ADDRESS, idGatewayABI } from '@farcaster/hub-web';
import { publicClient, account } from './clients.ts';

export const getDeadline = () => {
  const now = Math.floor(Date.now() / 1000);
  const oneHour = 60 * 60;
  return now + oneHour;
};

export const readNonce = async () => {
  return await publicClient.readContract({
    address: ID_GATEWAY_ADDRESS,
    abi: idGatewayABI,
    functionName: 'nonces',
    args: [account],
  });
};
```

<<< @/examples/contracts/clients.ts

:::

## 错误类型

| 错误类型 | 选择器     | 描述                                                           |
| -------- | ---------- | -------------------------------------------------------------- |
| 无效签名 | `8baa579f` | 提供的签名无效。可能是格式错误或由错误地址签署。               |
| 签名过期 | `0819bdcd` | 提供的签名已过期。请从签署者处获取带有更晚截止时间戳的新签名。 |

## 源代码

[`IdGateway.sol`](https://github.com/farcasterxyz/contracts/blob/1aceebe916de446f69b98ba1745a42f071785730/src/IdGateway.sol)
