---
outline: [2, 3]
---

# 捆绑器（Bundler）

捆绑器通过允许用户在一次交易中完成注册 fid、添加密钥和租赁存储空间的操作，使首次注册更加便捷。

如果您希望通过单笔交易创建新的 Farcaster 账户，请使用捆绑器。

## 读取

### 价格（price）

获取注册 fid（包含 1 个存储单元）所需支付的 wei 金额。如需在计算中包含额外的存储单元，请使用`extraStorage`参数。

| 参数         | 类型      | 描述                         |
| ------------ | --------- | ---------------------------- |
| extraStorage | `uint256` | 需计入总价的额外存储单元数量 |

## 写入

### 注册（register）

通过单步操作完成 fid 注册、添加一个或多个密钥以及租赁存储空间。具体使用示例请参阅[注册演示应用](https://farcaster-signup-demo.vercel.app/bundler)。

| 参数           | 类型                 | 描述                     |
| -------------- | -------------------- | ------------------------ |
| `msg.value`    | `wei`                | 注册支付的金额           |
| registerParams | `RegistrationParams` | 注册相关参数及签名       |
| signerParams   | `SignerParams[]`     | 密钥相关参数及签名       |
| extraStorage   | `uint256`            | 需额外租赁的存储单元数量 |

**RegistrationParams 结构体**

`RegistrationParams`结构体包含注册参数和来自 fid 接收者的 IdGateway[`Register`](/reference/contracts/reference/id-gateway#register-signature)签名。

| 参数     | 类型      | 描述                                                                                             |
| -------- | --------- | ------------------------------------------------------------------------------------------------ |
| to       | `address` | 注册 fid 的目标地址                                                                              |
| recovery | `address` | 新 fid 的恢复地址                                                                                |
| deadline | `uint256` | 签名过期时间戳                                                                                   |
| sig      | `bytes`   | 来自`to`地址的 EIP-712[`Register`](/reference/contracts/reference/key-gateway#add-signature)签名 |

**SignerParams 结构体**

`SignerParams`结构体包含签名者密钥参数和来自 fid 接收者的 KeyGateway[`Add`](/reference/contracts/reference/key-gateway#add-signature)签名。调用者可提供多个`SignerParams`结构体以在注册时添加多个密钥。

| 参数         | 类型      | 描述                                                                                                                              |
| ------------ | --------- | --------------------------------------------------------------------------------------------------------------------------------- |
| keyType      | `uint32`  | 必须设置为`1`，这是当前唯一支持的`keyType`                                                                                        |
| key          | `bytes`   | 待添加的公钥                                                                                                                      |
| metadataType | `uint8`   | 必须设置为`1`，这是当前唯一支持的`metadataType`                                                                                   |
| metadata     | `bytes`   | 编码后的[`SignedKeyRequestMetadata`](/reference/contracts/reference/signed-key-request-validator#signedkeyrequestmetadata-struct) |
| deadline     | `uint256` | 签名过期时间戳                                                                                                                    |
| sig          | `bytes`   | 来自`registrationParams.to`地址的 EIP-712[`Add`](/reference/contracts/reference/key-gateway#add-signature)签名                    |

## 错误

| 错误             | 选择器     | 描述                                                         |
| ---------------- | ---------- | ------------------------------------------------------------ |
| InvalidPayment   | `3c6b4b28` | 调用者提供的支付金额不足                                     |
| InvalidMetadata  | `bcecb64a` | 提供的密钥签名元数据无效                                     |
| InvalidSignature | `8baa579f` | 提供的签名无效，可能格式错误或由错误地址签署                 |
| SignatureExpired | `0819bdcd` | 提供的签名已过期，需从签名者处获取带有更晚截止时间戳的新签名 |

## 源代码

[`Bundler.sol`](https://github.com/farcasterxyz/contracts/blob/1aceebe916de446f69b98ba1745a42f071785730/src/Bundler.sol)
