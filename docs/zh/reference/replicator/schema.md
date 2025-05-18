# 数据表结构

以下表格创建于 Postgres 数据库中，用于存储来自 Hubs 的数据：

## chain_events（链上事件表）

存储从 hub 事件流接收的所有链上事件。这些事件代表任何链上操作，包括注册、转移、签名者添加/移除、存储租金等。事件永远不会被删除（即该表仅追加数据）。

| 列名              | 数据类型                   | 描述                                                                                  |
| ----------------- | -------------------------- | ------------------------------------------------------------------------------------- |
| id                | `uuid`                     | 该数据库特有的通用标识符（又称[代理键](https://en.wikipedia.org/wiki/Surrogate_key)） |
| created_at        | `timestamp with time zone` | 该行首次在数据库中创建的时间（与消息时间戳不同！）                                    |
| block_timestamp   | `timestamp with time zone` | 事件所在区块的时间戳（UTC）。                                                         |
| fid               | `bigint`                   | 签署消息的用户 FID。                                                                  |
| chain_id          | `bigint`                   | 链 ID。                                                                               |
| block_number      | `bigint`                   | 事件所在区块的区块号。                                                                |
| transaction_index | `smallint`                 | 交易在区块中的索引。                                                                  |
| log_index         | `smallint`                 | 日志事件在区块中的索引。                                                              |
| type              | `smallint`                 | 链事件类型。                                                                          |
| block_hash        | `bytea`                    | 事件所在区块的哈希值。                                                                |
| transaction_hash  | `bytea`                    | 触发该事件的交易哈希值。                                                              |
| body              | `json`                     | 链事件主体的 JSON 表示（根据 `type` 不同而变化）。                                    |
| raw               | `bytea`                    | 序列化 `OnChainEvent` [protobuf](https://protobuf.dev/) 的原始字节。                  |

## fids（FID 表）

存储 Farcaster 网络上所有已注册的 FID。

| 列名             | 数据类型                   | 描述                                             |
| ---------------- | -------------------------- | ------------------------------------------------ |
| fid              | `bigint`                   | 用户 FID（主键）                                 |
| created_at       | `timestamp with time zone` | 该行首次在数据库中创建的时间（与注册时间不同！） |
| updated_at       | `timestamp with time zone` | 该行最后更新时间。                               |
| registered_at    | `timestamp with time zone` | 用户注册所在区块的时间戳。                       |
| chain_event_id   | `uuid`                     | `chain_events` 表中对应此 FID 初始注册行的 ID。  |
| custody_address  | `bytea`                    | 拥有该 FID 的地址。                              |
| recovery_address | `bytea`                    | 可以为此 FID 发起恢复的地址。                    |

## signers（签名者表）

存储所有已注册的账户密钥（签名者）。

| 列名                  | 数据类型                   | 描述                                                                                  |
| --------------------- | -------------------------- | ------------------------------------------------------------------------------------- |
| id                    | `uuid`                     | 该数据库特有的通用标识符（又称[代理键](https://en.wikipedia.org/wiki/Surrogate_key)） |
| created_at            | `timestamp with time zone` | 该行首次在数据库中创建的时间（与密钥在网络上的创建时间不同！）                        |
| updated_at            | `timestamp with time zone` | 该行最后更新时间。                                                                    |
| added_at              | `timestamp with time zone` | 该签名者被添加的区块时间戳。                                                          |
| removed_at            | `timestamp with time zone` | 该签名者被移除的区块时间戳。                                                          |
| fid                   | `bigint`                   | 授权此签名者的用户 FID。                                                              |
| requester_fid         | `bigint`                   | 请求此签名者的用户/app 的 FID。                                                       |
| add_chain_event_id    | `uuid`                     | `chain_events` 表中对应此签名者添加事件的行的 ID。                                    |
| remove_chain_event_id | `uuid`                     | `chain_events` 表中对应此签名者移除事件的行的 ID。                                    |
| key_type              | `smallint`                 | 密钥类型。                                                                            |
| metadata_type         | `smallint`                 | 元数据类型。                                                                          |
| key                   | `bytea`                    | 公钥字节。                                                                            |
| metadata              | `bytea`                    | 区块链上存储的元数据字节。                                                            |

## username_proofs（用户名证明表）

存储所有已观察到的用户名证明。包括已失效的证明（通过 `deleted_at` 列软删除）。查询用户名时，建议直接查询 `fnames` 表而非此表。

| 列名       | 数据类型                   | 描述                                                                                  |
| ---------- | -------------------------- | ------------------------------------------------------------------------------------- |
| id         | `uuid`                     | 该数据库特有的通用标识符（又称[代理键](https://en.wikipedia.org/wiki/Surrogate_key)） |
| created_at | `timestamp with time zone` | 该行首次在数据库中创建的时间（与密钥在网络上的创建时间不同！）                        |
| updated_at | `timestamp with time zone` | 该行最后更新时间。                                                                    |
| timestamp  | `timestamp with time zone` | 证明消息的时间戳。                                                                    |
| deleted_at | `timestamp with time zone` | 此证明被撤销或失效的时间。                                                            |
| fid        | `bigint`                   | 证明中用户名所属的 FID。                                                              |
| type       | `smallint`                 | 证明类型（fname 或 ENS）。                                                            |
| username   | `text`                     | 用户名，例如 fname 为 `dwr`，ENS 名称为 `dwr.eth`。                                   |
| signature  | `bytea`                    | 证明签名。                                                                            |
| owner      | `bytea`                    | 拥有 ENS 名称的钱包地址，或提供证明签名的钱包地址。                                   |

## fnames（用户名表）

存储当前所有已注册的用户名。注意：当用户名被注销时，该行会被软删除（通过 `deleted_at` 列标记），直到为该 FID 注册新用户名。

| 列名          | 数据类型                   | 描述                                                                                  |
| ------------- | -------------------------- | ------------------------------------------------------------------------------------- |
| id            | `uuid`                     | 该数据库特有的通用标识符（又称[代理键](https://en.wikipedia.org/wiki/Surrogate_key)） |
| created_at    | `timestamp with time zone` | 该行首次在数据库中创建的时间（与密钥在网络上的创建时间不同！）                        |
| updated_at    | `timestamp with time zone` | 该行最后更新时间。                                                                    |
| registered_at | `timestamp with time zone` | 用户名证明消息的时间戳。                                                              |
| deleted_at    | `timestamp with time zone` | 证明被撤销或用户名从该用户注销的时间。                                                |
| fid           | `bigint`                   | 用户名所属的 FID。                                                                    |
| type          | `smallint`                 | 用户名类型（fname 或 ENS）。                                                          |
| username      | `text`                     | 用户名，例如 fname 为 `dwr`，ENS 名称为 `dwr.eth`。                                   |

## messages（消息表）

存储从 hub 获取的所有 Farcaster 消息。消息永远不会被删除，只会被软删除（即标记为删除但不会从数据库中实际移除）。

| 列名             | 数据类型                   | 描述                                                                                  |
| ---------------- | -------------------------- | ------------------------------------------------------------------------------------- |
| id               | `uuid`                     | 该数据库特有的通用标识符（又称[代理键](https://en.wikipedia.org/wiki/Surrogate_key)） |
| created_at       | `timestamp with time zone` | 该行首次在数据库中创建的时间（与消息时间戳不同！）                                    |
| updated_at       | `timestamp with time zone` | 该行最后更新时间。                                                                    |
| timestamp        | `timestamp with time zone` | 消息时间戳（UTC）。                                                                   |
| deleted_at       | `timestamp with time zone` | hub 删除消息的时间（例如响应 `CastRemove` 消息等）。                                  |
| pruned_at        | `timestamp with time zone` | hub 清理消息的时间。                                                                  |
| revoked_at       | `timestamp with time zone` | 由于签署消息的签名者被撤销，hub 撤销消息的时间。                                      |
| fid              | `bigint`                   | 签署消息的用户 FID。                                                                  |
| type             | `smallint`                 | 消息类型。                                                                            |
| hash_scheme      | `smallint`                 | 消息哈希方案。                                                                        |
| signature_scheme | `smallint`                 | 消息哈希方案。                                                                        |
| hash             | `bytea`                    | 消息哈希值。                                                                          |
| signature        | `bytea`                    | 消息签名。                                                                            |
| signer           | `bytea`                    | 用于签署此消息的签名者。                                                              |
| body             | `json`                     | 消息主体的 JSON 表示。                                                                |
| raw              | `bytea`                    | 序列化消息 [protobuf](https://protobuf.dev/) 的原始字节。                             |

## casts（Cast 表）

表示用户发布的 cast。

| 列名               | 数据类型                   | 描述                                                                                  |
| ------------------ | -------------------------- | ------------------------------------------------------------------------------------- |
| id                 | `uuid`                     | 该数据库特有的通用标识符（又称[代理键](https://en.wikipedia.org/wiki/Surrogate_key)） |
| created_at         | `timestamp with time zone` | 该行首次在数据库中创建的时间（与消息时间戳不同！）                                    |
| updated_at         | `timestamp with time zone` | 该行最后更新时间。                                                                    |
| timestamp          | `timestamp with time zone` | 消息时间戳（UTC）。                                                                   |
| deleted_at         | `timestamp with time zone` | cast 被 hub 视为删除/撤销/清理的时间（例如响应 `CastRemove` 消息等）。                |
| fid                | `bigint`                   | 签署消息的用户 FID。                                                                  |
| parent_fid         | `bigint`                   | 如果此 cast 是回复，则为父 cast 作者的 FID。否则为 `null`。                           |
| hash               | `bytea`                    | 消息哈希值。                                                                          |
| root_parent_hash   | `bytea`                    | 如果此 cast 是回复，则为回复链中原始 cast 的哈希值。否则为 `null`。                   |
| parent_hash        | `bytea`                    | 如果此 cast 是回复，则为父 cast 的哈希值。否则为 `null`。                             |
| root_parent_url    | `text`                     | 如果此 cast 是回复，则为回复链中原始 cast 所回复的 URL。                              |
| parent_url         | `text`                     | 如果此 cast 是回复 URL（例如 NFT、网页 URL 等），则为该 URL。否则为 `null`。          |
| text               | `text`                     | 移除了提及内容的 cast 原始文本。                                                      |
| embeds             | `json`                     | 与此 cast 一起嵌入的 URL 或 cast ID 数组。                                            |
| mentions           | `json`                     | cast 中提及的 FID 数组。                                                              |
| mentions_positions | `json`                     | cast 中提及的 FID 的 UTF8 字节偏移量。                                                |

## reactions（反应表）

表示用户对内容的反应（点赞或转发）。

| 列名             | 数据类型                   | 描述                                                                                  |
| ---------------- | -------------------------- | ------------------------------------------------------------------------------------- |
| id               | `uuid`                     | 该数据库特有的通用标识符（又称[代理键](https://en.wikipedia.org/wiki/Surrogate_key)） |
| created_at       | `timestamp with time zone` | 该行首次在数据库中创建的时间（与消息时间戳不同！）                                    |
| updated_at       | `timestamp with time zone` | 该行最后更新时间。                                                                    |
| timestamp        | `timestamp with time zone` | 消息时间戳（UTC）。                                                                   |
| deleted_at       | `timestamp with time zone` | 反应被 hub 视为删除的时间（例如响应 `ReactionRemove` 消息等）。                       |
| fid              | `bigint`                   | 签署消息的用户 FID。                                                                  |
| target_cast_fid  | `bigint`                   | 如果目标是 cast，则为 cast 作者的 FID。否则为 `null`。                                |
| type             | `smallint`                 | 反应类型。                                                                            |
| hash             | `bytea`                    | 消息哈希值。                                                                          |
| target_cast_hash | `bytea`                    | 如果目标是 cast，则为 cast 的哈希值。否则为 `null`。                                  |
| target_url       | `text`                     | 如果目标是 URL（例如 NFT、网页 URL 等），则为该 URL。否则为 `null`。                  |

## links（链接表）

表示两个 FID 之间的链接（例如关注、订阅等）。

| 列名              | 数据类型                   | 描述                                                                                  |
| ----------------- | -------------------------- | ------------------------------------------------------------------------------------- |
| id                | `uuid`                     | 该数据库特有的通用标识符（又称[代理键](https://en.wikipedia.org/wiki/Surrogate_key)） |
| created_at        | `timestamp with time zone` | 该行首次在数据库中创建的时间（非链接在网络上的创建时间！）                            |
| updated_at        | `timestamp with time zone` | 该行最后更新时间                                                                      |
| timestamp         | `timestamp with time zone` | 消息时间戳（UTC）。                                                                   |
| deleted_at        | `timestamp with time zone` | 链接被 hub 视为删除的时间（例如响应 `LinkRemoveMessage` 消息等）。                    |
| fid               | `bigint`                   | Farcaster ID（用户 ID）。                                                             |
| target_fid        | `bigint`                   | 目标用户的 Farcaster ID。                                                             |
| display_timestamp | `timestamp with time zone` | 该行最后更新时间。                                                                    |
| type              | `string`                   | 用户间连接类型，例如 `follow`。                                                       |
| hash              | `bytea`                    | 消息哈希值。                                                                          |

## verifications（验证表）

表示用户在网络上验证某些内容。目前唯一的验证是证明以太坊钱包地址的所有权。

| 列名           | 数据类型                   | 描述                                                                                  |
| -------------- | -------------------------- | ------------------------------------------------------------------------------------- |
| id             | `uuid`                     | 该数据库特有的通用标识符（又称[代理键](https://en.wikipedia.org/wiki/Surrogate_key)） |
| created_at     | `timestamp with time zone` | 该行首次在数据库中创建的时间（与消息时间戳不同！）                                    |
| updated_at     | `timestamp with time zone` | 该行最后更新时间。                                                                    |
| timestamp      | `timestamp with time zone` | 消息时间戳（UTC）。                                                                   |
| deleted_at     | `timestamp with time zone` | 验证被 hub 视为删除的时间（例如响应 `VerificationRemove` 消息等）。                   |
| fid            | `bigint`                   | 签署消息的用户 FID。                                                                  |
| hash           | `bytea`                    | 消息哈希值。                                                                          |
| signer_address | `bytea`                    | 被验证的钱包地址。                                                                    |
| block_hash     | `bytea`                    | 验证所有权时最新区块的区块哈希值。                                                    |
| signature      | `bytea`                    | 所有权证明签名。                                                                      |

## user_data（用户数据表）

表示与用户关联的数据（例如个人资料照片、简介、用户名等）。

| 列名       | 数据类型                   | 描述                                                                                  |
| ---------- | -------------------------- | ------------------------------------------------------------------------------------- |
| id         | `uuid`                     | 该数据库特有的通用标识符（又称[代理键](https://en.wikipedia.org/wiki/Surrogate_key)） |
| created_at | `timestamp with time zone` | 该行首次在数据库中创建的时间（与消息时间戳不同！）                                    |
| updated_at | `timestamp with time zone` | 该行最后更新时间。                                                                    |
| timestamp  | `timestamp with time zone` | 消息时间戳（UTC）。                                                                   |
| deleted_at | `timestamp with time zone` | 数据被 hub 视为删除的时间                                                             |
| fid        | `bigint`                   | 签署消息的用户 FID。                                                                  |
| type       | `smallint`                 | 用户数据类型（PFP、简介、用户名等）。                                                 |
| hash       | `bytea`                    | 消息哈希值。                                                                          |
| value      | `text`                     | 字段的字符串值。                                                                      |

## storage_allocations（存储分配表）

存储每个 FID 购买的存储单元数量及其过期时间。

| 列名           | 数据类型                   | 描述                                                                                  |
| -------------- | -------------------------- | ------------------------------------------------------------------------------------- |
| id             | `uuid`                     | 该数据库特有的通用标识符（又称[代理键](https://en.wikipedia.org/wiki/Surrogate_key)） |
| created_at     | `timestamp with time zone` | 该行首次在数据库中创建的时间                                                          |
| updated_at     | `timestamp with time zone` | 该行最后更新时间。                                                                    |
| rented_at      | `timestamp with time zone` | 消息时间戳（UTC）。                                                                   |
| expires_at     | `timestamp with time zone` | 此存储分配的过期时间。                                                                |
| chain_event_id | `uuid`                     | `chain_events` 表中表示存储分配的链上事件行的 ID。                                    |
| fid            | `bigint`                   | 拥有存储的 FID。                                                                      |
| units          | `smallint`                 | 分配的存储单元数量。                                                                  |
| payer          | `bytea`                    | 支付存储费用的钱包地址。                                                              |
