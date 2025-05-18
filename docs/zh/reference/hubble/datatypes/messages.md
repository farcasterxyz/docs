# 消息

消息是 Farcaster 网络中的基础数据类型。

当账户执行诸如发布公开消息、更改个人资料或验证以太坊账户等操作时，都会生成新的消息。

## 1. 消息

消息是一个 protobuf 结构，包含数据、其哈希值以及作者的签名。

| 字段             | 类型                                | 标签 | 描述                                                                                                                                                                        |
| ---------------- | ----------------------------------- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data             | [MessageData](#MessageData)         |      | 消息内容。也可以使用 data_bytes 字段来序列化 `MessageData`                                                                                                                  |
| hash             | bytes                               |      | 数据的哈希摘要                                                                                                                                                              |
| hash_scheme      | [HashScheme](#HashScheme)           |      | 生成哈希摘要的哈希方案                                                                                                                                                      |
| signature        | bytes                               |      | 哈希摘要的签名                                                                                                                                                              |
| signature_scheme | [SignatureScheme](#SignatureScheme) |      | 生成签名的签名方案                                                                                                                                                          |
| signer           | bytes                               |      | 生成签名的密钥对的公钥或地址                                                                                                                                                |
| data_bytes       | bytes                               |      | 替代 "data" 字段。如果使用非 Typescript 的编程语言构造 [MessageData](#MessageData)，可以使用此字段序列化 `MessageData` 并基于这些字节计算 `hash` 和 `signature`。可选字段。 |

### 1.1 MessageData

MessageData 是一个通用信封，包含所有 Farcaster 消息中必须存在的类型、fid、时间戳和网络信息。它还包含一个 body，其类型由 MessageType 决定。

| 字段      | 类型                                                                                                                                                                                                                                                                                                                                    | 标签  | 描述                        |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | --------------------------- |
| type      | [MessageType](#MessageType)                                                                                                                                                                                                                                                                                                             |       | body 中包含的消息类型       |
| fid       | uint64                                                                                                                                                                                                                                                                                                                                  |       | 生成消息的用户 Farcaster ID |
| timestamp | uint32                                                                                                                                                                                                                                                                                                                                  |       | Farcaster 时间戳（秒）      |
| network   | [FarcasterNetwork](#FarcasterNetwork)                                                                                                                                                                                                                                                                                                   |       | 消息目标 Farcaster 网络     |
| body      | [CastAddBody](#CastAddBody), <br> [CastRemoveBody](#CastRemoveBody), <br> [ReactionBody](#ReactionBody), <br>[VerificationAddEthAddressBody](#VerificationAddEthAddressBody), <br>[VerificationRemoveBody](#VerificationRemoveBody), <br> [UserDataBody](#UserDataBody),<br> [LinkBody](#LinkBody),<br> [UserNameProof](#UserNameProof) | oneOf | 特定于 MessageType 的属性   |

### 1.2 HashScheme

用于生成 MessageData 摘要的哈希方案类型

| 名称               | 数值 | 描述                        |
| ------------------ | ---- | --------------------------- |
| HASH_SCHEME_NONE   | 0    |                             |
| HASH_SCHEME_BLAKE3 | 1    | 哈希 MessageData 的默认方案 |

### 1.3 签名方案

用于签名消息哈希的签名方案类型

| 名称                     | 数值 | 描述                           |
| ------------------------ | ---- | ------------------------------ |
| SIGNATURE_SCHEME_NONE    | 0    |                                |
| SIGNATURE_SCHEME_ED25519 | 1    | Ed25519 签名（默认）           |
| SIGNATURE_SCHEME_EIP712  | 2    | 使用 EIP-712 方案的 ECDSA 签名 |

### 1.4 消息类型

消息体的类型

| 名称                                      | 数值 | 描述                  |
| ----------------------------------------- | ---- | --------------------- |
| MESSAGE_TYPE_NONE                         | 0    | 无效默认值            |
| MESSAGE_TYPE_CAST_ADD                     | 1    | 添加新 Cast           |
| MESSAGE_TYPE_CAST_REMOVE                  | 2    | 移除现有 Cast         |
| MESSAGE_TYPE_REACTION_ADD                 | 3    | 向 Cast 添加 Reaction |
| MESSAGE_TYPE_REACTION_REMOVE              | 4    | 从 Cast 移除 Reaction |
| MESSAGE_TYPE_LINK_ADD                     | 5    | 向目标添加 Link       |
| MESSAGE_TYPE_LINK_REMOVE                  | 6    | 从目标移除 Link       |
| MESSAGE_TYPE_VERIFICATION_ADD_ETH_ADDRESS | 7    | 添加以太坊地址验证    |
| MESSAGE_TYPE_VERIFICATION_REMOVE          | 8    | 移除验证              |
| MESSAGE_TYPE_USER_DATA_ADD                | 11   | 添加用户元数据        |
| MESSAGE_TYPE_USERNAME_PROOF               | 12   | 添加或替换用户名证明  |

### 1.5 Farcaster 网络

消息目标 Farcaster 网络

| 名称                      | 数值 | 描述       |
| ------------------------- | ---- | ---------- |
| FARCASTER_NETWORK_NONE    | 0    |            |
| FARCASTER_NETWORK_MAINNET | 1    | 公共主网   |
| FARCASTER_NETWORK_TESTNET | 2    | 公共测试网 |
| FARCASTER_NETWORK_DEVNET  | 3    | 私有测试网 |

## 2. 用户数据

UserData 消息表示用户元数据（例如个人资料图片 URL）。

### 2.1 UserDataBody

UserData 消息体

| 字段  | 类型                          | 标签 | 描述       |
| ----- | ----------------------------- | ---- | ---------- |
| type  | [UserDataType](#UserDataType) |      | 元数据类型 |
| value | string                        |      | 元数据值   |

### 2.2 UserDataType

UserData 消息类型

| 名称                    | 数值 | 描述                    |
| ----------------------- | ---- | ----------------------- |
| USER_DATA_TYPE_NONE     | 0    | 无效默认值              |
| USER_DATA_TYPE_PFP      | 1    | 用户个人资料图片        |
| USER_DATA_TYPE_DISPLAY  | 2    | 用户显示名称            |
| USER_DATA_TYPE_BIO      | 3    | 用户简介                |
| USER_DATA_TYPE_URL      | 5    | 用户 URL                |
| USER_DATA_TYPE_USERNAME | 6    | 用户首选 Farcaster 名称 |
| USER_DATA_TYPE_LOCATION | 7    | 用户位置                |
| USER_DATA_TYPE_TWITTER  | 8    | 用户 Twitter 用户名     |
| USER_DATA_TYPE_GITHUB   | 9    | 用户 GitHub 用户名      |

有关位置的更多信息，请参阅 [FIP-196](https://github.com/farcasterxyz/protocol/discussions/196)。  
有关 Twitter/X 和 Github 用户名的更多信息，请参阅 [FIP-19](https://github.com/farcasterxyz/protocol/discussions/199)。

## 3. Cast

Cast 消息是用户的公开帖子。

### 3.1 CastAddBody

添加新 Cast 消息。

| 字段               | 类型              | 标签     | 描述                         |
| ------------------ | ----------------- | -------- | ---------------------------- |
| embeds_deprecated  | string            | repeated | 嵌入 Cast 的 URL             |
| mentions           | uint64            | repeated | Cast 中提及的 Fids           |
| parent_cast_id     | [CastId](#CastId) |          | Cast 的父 Cast               |
| parent_url         | string            |          | Cast 的父 URL                |
| text               | string            |          | Cast 文本                    |
| mentions_positions | uint32            | repeated | 文本中提及的位置             |
| embeds             | [Embed](#Embed)   | repeated | 嵌入 Cast 的 URL 或 cast ids |

#### Embed

| 字段    | 类型              | 标签 | 描述 |
| ------- | ----------------- | ---- | ---- |
| url     | [string](#string) |      |      |
| cast_id | [CastId](#CastId) |      |      |

### 3.2 CastRemoveBody

移除现有 Cast 消息。

| 字段        | 类型  | 标签 | 描述               |
| ----------- | ----- | ---- | ------------------ |
| target_hash | bytes |      | 要移除的 Cast 哈希 |

### 3.3 CastId

用于查找 Cast 的标识符

| 字段 | 类型   | 标签 | 描述                 |
| ---- | ------ | ---- | -------------------- |
| fid  | uint64 |      | 创建 Cast 的用户 Fid |
| hash | bytes  |      | Cast 哈希            |

## 4. Reaction

Reaction 消息在账户和 Cast 之间创建关系（例如点赞）。

### 4.1 ReactionBody

向 Cast 添加或移除 Reaction

| 字段           | 类型                          | 标签 | 描述                    |
| -------------- | ----------------------------- | ---- | ----------------------- |
| type           | [ReactionType](#ReactionType) |      | Reaction 类型           |
| target_cast_id | [CastId](#CastId)             |      | 要反应的 Cast 的 CastId |
| target_url     | [string](#string)             |      | 要反应的 URL            |

### 4.2 ReactionType

Reaction 类型

| 名称                 | 数值 | 描述                         |
| -------------------- | ---- | ---------------------------- |
| REACTION_TYPE_NONE   | 0    | 无效默认值                   |
| REACTION_TYPE_LIKE   | 1    | 点赞目标 Cast                |
| REACTION_TYPE_RECAST | 2    | 将目标 Cast 分享到用户的受众 |

## 5. Link

Link 消息在两个用户之间创建关系（例如关注）。

### 5.1 LinkBody

添加或移除 Link

| 字段             | 类型              | 标签     | 描述                                                                           |
| ---------------- | ----------------- | -------- | ------------------------------------------------------------------------------ |
| type             | [string](#string) |          | Link 类型，≤ 8 个字符                                                          |
| displayTimestamp | [uint32](#uint32) | optional | 用户定义的时间戳，当 message.data.timestamp 需要更新以进行压缩时保留原始时间戳 |
| target_fid       | [uint64](#uint64) |          | Link 关联的 fid                                                                |

## 6. 验证

Verification 消息是某物所有权证明。

### 6.1 VerificationAddEthAddressBody

添加双向签名，证明 fid 控制某个以太坊地址。

| 字段          | 类型  | 标签 | 描述                           |
| ------------- | ----- | ---- | ------------------------------ |
| address       | bytes |      | 被验证的以太坊地址             |
| eth_signature | bytes |      | 用户以太坊地址生成的签名       |
| block_hash    | bytes |      | 生成声明时的最新以太坊区块哈希 |

### 6.2 VerificationRemoveBody

移除任何类型的 Verification

| 字段    | 类型  | 标签 | 描述                       |
| ------- | ----- | ---- | -------------------------- |
| address | bytes |      | 要移除的 Verification 地址 |

## 7. Frame 操作

表示用户在 frame 上执行的操作。此消息不存储在 hubs 上且无法提交，仅用于验证。

### 7.1 FrameActionBody

用户在 frame 上的操作

| 字段         | 类型              | 标签 | 描述                              |
| ------------ | ----------------- | ---- | --------------------------------- |
| url          | bytes             |      | 嵌入 Cast 中的 frame 原始 URL     |
| button_index | uint32            |      | 按下的按钮索引（从 1 开始）       |
| cast_id      | [CastId](#CastId) |      | 托管 frame 的 cast id             |
| input_text   | bytes             |      | 用户作为操作一部分输入的任何文本  |
| state        | bytes             |      | 从 frame 传递到服务器的序列化状态 |
