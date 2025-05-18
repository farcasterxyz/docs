---
outline: [2, 3]
---

# ID 注册表

ID 注册表记录了哪个 fid 与哪个以太坊地址相关联，并管理 fid 的转移和恢复。

如果您想读取 fid 的信息、转移或恢复 fid，或管理 fid 的恢复地址，请使用 ID 注册表。

如果您想注册一个新的 fid，请改用 [ID 网关](/zh/reference/contracts/reference/id-gateway.md)。

## 读取

### idOf

返回地址拥有的 fid (`uint256`)，如果该地址不拥有 fid 则返回零。

| 参数  | 类型      | 描述                      |
| ----- | --------- | ------------------------- |
| owner | `address` | 要检查是否拥有 fid 的地址 |

### custodyOf

返回拥有特定 fid 的托管地址 (`address`)。如果 fid 不存在，则返回零地址。

| 参数 | 类型      | 描述               |
| ---- | --------- | ------------------ |
| fid  | `uint256` | 要查找所有者的 fid |

### recoveryOf

返回 fid 的恢复地址 (`address`)。如果 fid 不存在，则返回零地址。

| 参数 | 类型      | 描述                 |
| ---- | --------- | -------------------- |
| fid  | `uint256` | 要查找恢复地址的 fid |

### idCounter

返回迄今为止注册的最高 fid (`uint256`)。

### verifyFidSignature

检查消息是否由 fid 的当前托管地址签名。返回一个 `bool`。

| 参数           | 类型      | 描述             |
| -------------- | --------- | ---------------- |
| custodyAddress | `address` | 要检查签名的地址 |
| fid            | `uint256` | 与签名关联的 fid |
| digest         | `bytes32` | 已签名的哈希数据 |
| sig            | `bytes`   | 要检查的签名     |

### nonces

返回地址的下一个未使用的 nonce (`uint256`)。用于生成 EIP-712 签名。

| 参数  | 类型      | 描述                |
| ----- | --------- | ------------------- |
| owner | `address` | 要获取 nonce 的地址 |

## 写入

### register

如果直接调用将回滚。必须通过 [ID 网关](/zh/reference/contracts/reference/id-gateway.md) 调用。

### changeRecoveryAddress

更改调用者 fid 的恢复地址。

| 参数     | 类型      | 描述         |
| -------- | --------- | ------------ |
| recovery | `address` | 新的恢复地址 |

### transfer

将调用者的 fid 转移到新地址。`to` 地址必须签署 EIP-712 [`Transfer`](#transfer-signature) 消息以接受转移。`to` 地址不能已拥有 fid。

| 参数     | 类型      | 描述                                                            |
| -------- | --------- | --------------------------------------------------------------- |
| to       | `address` | 要转移 fid 的地址                                               |
| deadline | `uint256` | 签名截止时间                                                    |
| sig      | `bytes`   | 来自 `to` 地址的 EIP-712 [`Transfer`](#transfer-signature) 签名 |

::: warning
转移 fid 不会重置其恢复地址。要转移 fid 并更新其恢复地址，请调用 [`transferAndChangeRecovery`](#transferandchangerecovery)。如果您从不信任的发送方接收 fid，请确保在转移时清除或更改其恢复地址。
:::

#### 转移签名

要将 fid 转移到另一个账户，调用者必须提供来自接收地址的 EIP-712 类型签名，格式如下：

`Transfer(uint256 fid,address to,uint256 nonce,uint256 deadline)`

| 参数     | 类型      | 描述                   |
| -------- | --------- | ---------------------- |
| fid      | `uint256` | 正在转移的 fid         |
| to       | `address` | 接收 fid 的地址        |
| nonce    | `uint256` | 签名者地址的当前 nonce |
| deadline | `uint256` | 签名过期时间戳         |

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
```

```ts [Viem]
import { ID_REGISTRY_EIP_712_TYPES } from '@farcaster/hub-web';
import { walletClient, account } from './clients.ts';
import { readNonce, getDeadline } from './helpers.ts';

const nonce = await readNonce();
const deadline = getDeadline();

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

### transferAndChangeRecovery

将调用者的 fid 转移到新地址 _并_ 更改 fid 的恢复地址。这可用于安全地从不信任的地址接收 fid 转移。

接收地址必须签署 EIP-712 [`TransferAndChangeRecovery`](#transferandchangerecovery-signature) 消息以接受转移。`to` 地址不能已拥有 fid。

| 参数     | 类型      | 描述                                                                                    |
| -------- | --------- | --------------------------------------------------------------------------------------- |
| to       | `address` | 要转移 fid 的地址                                                                       |
| recovery | `address` | 新的恢复地址                                                                            |
| deadline | `uint256` | 签名截止时间                                                                            |
| sig      | `bytes`   | 来自 `to` 地址的 EIP-712 [`TransferAndChangeRecovery`](#transferandchangerecovery) 签名 |

#### TransferAndChangeRecovery 签名

要将 fid 转移到另一个账户并更改恢复地址，您必须提供来自 `to` 地址的 EIP-712 类型签名，格式如下：

`TransferAndChangeRecovery(uint256 fid,address to,address recovery,uint256 nonce,uint256 deadline)`

| 参数     | 类型      | 描述                   |
| -------- | --------- | ---------------------- |
| fid      | `uint256` | 正在转移的 fid         |
| to       | `address` | 接收 fid 的地址        |
| recovery | `address` | 新的恢复地址           |
| nonce    | `uint256` | 签名者地址的当前 nonce |
| deadline | `uint256` | 签名过期时间戳         |

::: code-group

```ts [@farcaster/hub-web]
import { ViemWalletEip712Signer } from '@farcaster/hub-web';
import { walletClient, account } from './clients.ts';
import { readNonce, getDeadline } from './helpers.ts';

const nonce = await readNonce();
const deadline = getDeadline();

const eip712Signer = new ViemWalletEip712Signer(walletClient);
const signature = await eip712signer.signTransferAndChangeRecovery({
  fid: 1n,
  to: account,
  recovery: '0x00000000FcB080a4D6c39a9354dA9EB9bC104cd7',
  nonce,
  deadline,
});
```

```ts [Viem]
import { ID_REGISTRY_EIP_712_TYPES } from '@farcaster/hub-web';
import { walletClient, account } from './clients.ts';
import { readNonce, getDeadline } from './helpers.ts';

const nonce = await readNonce();
const deadline = getDeadline();

const signature = await walletClient.signTypedData({
  account,
  ...ID_REGISTRY_EIP_712_TYPES,
  primaryType: 'TransferAndChangeRecovery',
  message: {
    fid: 1n,
    to: account,
    recovery: '0x00000000FcB080a4D6c39a9354dA9EB9bC104cd7',
    nonce,
    deadline,
  },
});
```

```ts [helpers.ts]
import { ID_REGISTRY_ADDRESS, idGatewayABI } from '@farcaster/hub-web';
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

### recover

如果调用者是恢复地址，则将 fid 转移到新地址。`to` 地址必须签署 EIP-712 [`Transfer`](#transfer-signature) 消息以接受转移。

`to` 地址不能已拥有 fid。

| 参数     | 类型      | 描述                                                            |
| -------- | --------- | --------------------------------------------------------------- |
| from     | `address` | 要从中转移 fid 的地址                                           |
| to       | `address` | 要转移 fid 的地址                                               |
| deadline | `uint256` | 签名截止时间                                                    |
| sig      | `bytes`   | 来自 `to` 地址的 EIP-712 [`Transfer`](#transfer-signature) 签名 |

### changeRecoveryAddressFor

通过提供签名代表所有者更改 fid 的恢复地址。所有者必须签署 EIP-712 `ChangeRecoveryAddress` 签名以批准更改。

| 参数     | 类型      | 描述                                                                         |
| -------- | --------- | ---------------------------------------------------------------------------- |
| owner    | `address` | fid 所有者的地址                                                             |
| recovery | `address` | 新的恢复地址                                                                 |
| deadline | `uint256` | 签名截止时间                                                                 |
| sig      | `bytes`   | 来自 `to` 地址的 EIP-712 [`ChangeRecoveryAddress`](#transfer-signature) 签名 |

### ChangeRecoveryAddress 签名

要代表 fid 所有者更改恢复地址，调用者必须提供来自 `owner` 地址的 EIP-712 类型签名，格式如下：

`ChangeRecoveryAddress(uint256 fid,address from,address to,uint256 nonce,uint256 deadline)`

| 参数     | 类型      | 描述                   |
| -------- | --------- | ---------------------- |
| fid      | `uint256` | 所有者的 fid           |
| from     | `address` | 先前的恢复地址         |
| to       | `address` | 新的恢复地址           |
| nonce    | `uint256` | 签名者地址的当前 nonce |
| deadline | `uint256` | 签名过期时间戳         |

::: code-group

```ts [@farcaster/hub-web]
import { ViemWalletEip712Signer } from '@farcaster/hub-web';
import { walletClient, account } from './clients.ts';
import { readNonce, getDeadline } from './helpers.ts';

const nonce = await readNonce();
const deadline = getDeadline();

const eip712Signer = new ViemWalletEip712Signer(walletClient);
const signature = await eip712signer.signChangeRecoveryAddress({
  fid: 1n,
  from: '0x00000000FcB080a4D6c39a9354dA9EB9bC104cd7',
  to: '0xD7029BDEa1c17493893AAfE29AAD69EF892B8ff2',
  nonce,
  deadline,
});
```

```ts [Viem]
import { ID_REGISTRY_EIP_712_TYPES } from '@farcaster/hub-web';
import { walletClient, account } from './clients.ts';
import { readNonce, getDeadline } from './helpers.ts';

const nonce = await readNonce();
const deadline = getDeadline();

const signature = await walletClient.signTypedData({
  account,
  ...ID_REGISTRY_EIP_712_TYPES,
  primaryType: 'ChangeRecoveryAddress',
  message: {
    fid: 1n,
    from: '0x00000000FcB080a4D6c39a9354dA9EB9bC104cd7',
    to: '0xD7029BDEa1c17493893AAfE29AAD69EF892B8ff2',
    nonce,
    deadline,
  },
});
```

```ts [helpers.ts]
import { ID_REGISTRY_ADDRESS, idGatewayABI } from '@farcaster/hub-web';
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
    functionName: 'nonces',
    args: [account],
  });
};
```

<<< @/examples/contracts/clients.ts

:::

### transferFor

将 `from` 地址拥有的 fid 转移到 `to` 地址。调用者必须提供两个 EIP-712 [`Transfer`](#transfer-signature) 签名：一个来自 `from` 地址授权转出，一个来自 `to` 地址接受转入。这些消息具有 [相同格式](#transfer-signature)。`to` 地址不能已拥有 fid。

| 参数         | 类型      | 描述                                                              |
| ------------ | --------- | ----------------------------------------------------------------- |
| from         | `address` | 要从中转移 fid 的地址                                             |
| to           | `address` | 要转移 fid 的地址                                                 |
| fromDeadline | `uint256` | 签名截止时间                                                      |
| fromSig      | `bytes`   | 来自 `from` 地址的 EIP-712 [`Transfer`](#transfer-signature) 签名 |
| toDeadline   | `uint256` | 签名截止时间                                                      |
| toSig        | `bytes`   | 来自 `to` 地址的 EIP-712 [`Transfer`](#transfer-signature) 签名   |

### transferAndChangeRecoveryFor

将 `from` 地址拥有的 fid 转移到 `to` 地址，并更改 fid 的恢复地址。这可用于安全地从不信任的地址接收 fid 转移。

调用者必须提供两个 EIP-712 [`TransferAndChangeRecovery`](#transferandchangerecovery-signature) 签名：一个来自 `from` 地址授权转出，一个来自 `to` 地址接受转入。这些消息具有 [相同格式](#transferandchangerecovery-signature)。`to` 地址不能已拥有 fid。

| 参数         | 类型      | 描述                                                                                                |
| ------------ | --------- | --------------------------------------------------------------------------------------------------- |
| from         | `address` | 要从中转移 fid 的地址                                                                               |
| to           | `address` | 要转移 fid 的地址                                                                                   |
| recovery     | `address` | 新的恢复地址                                                                                        |
| fromDeadline | `uint256` | 签名截止时间                                                                                        |
| fromSig      | `bytes`   | 来自 `from` 地址的 EIP-712 [`TransferAndChangeRecovery`](#transferandchangerecovery-signature) 签名 |
| toDeadline   | `uint256` | 签名截止时间                                                                                        |
| toSig        | `bytes`   | 来自 `to` 地址的 EIP-712 [`TransferAndChangeRecovery`](#transferandchangerecovery-signature) 签名   |

### recoverFor

使用来自 fid 恢复地址的签名将 fid 转移到新地址。调用者必须提供两个 EIP-712 [`Transfer`](#transfer-signature) 签名：一个来自恢复地址授权转出，一个来自 `to` 地址接受转入。这些消息具有 [相同格式](#transfer-signature)。

`to` 地址不能已拥有 fid。

| 参数             | 类型      | 描述                                                            |
| ---------------- | --------- | --------------------------------------------------------------- |
| from             | `address` | 要从中转移 fid 的地址                                           |
| to               | `address` | 要转移 fid 的地址                                               |
| recoveryDeadline | `uint256` | 恢复签名的截止时间                                              |
| recoverySig      | `bytes`   | 来自恢复地址的 EIP-712 [`Transfer`](#transfer-signature) 签名   |
| toDeadline       | `uint256` | 接收者签名的截止时间                                            |
| toSig            | `bytes`   | 来自 `to` 地址的 EIP-712 [`Transfer`](#transfer-signature) 签名 |

## 错误

| 错误  | Selector   | 描述      |
| ----- | ---------- | --------- |
| HasId | `f90230a9` | `to` 地址 |
