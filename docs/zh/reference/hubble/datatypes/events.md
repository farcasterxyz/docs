# 事件

事件代表状态变化，例如新消息或合约事件。

当 Hubble 观察到状态变化时就会发出事件。由于不同 hub 可能以不同顺序看到消息，事件的顺序对每个 hub 是特定的。客户端可以使用[事件 API](/zh/reference/hubble/grpcapi/events)订阅 hub，获取 hub 变更的实时流。

Hubble 会将事件保留 3 天，之后为节省空间会删除它们。要获取更早的数据，请使用[GRPC](../grpcapi/grpcapi.md)或[HTTP](../httpapi/httpapi.md) API。

## HubEvent

| 字段 | 类型                                                                                                                                                                                                                                        | 标签  | 描述 |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | ---- |
| type | [HubEventType](#HubEventType)                                                                                                                                                                                                               |       |      |
| id   | [uint64](#uint64)                                                                                                                                                                                                                           |       |      |
| body | [MergeMessageBody](#mergemessagebody), <br> [PruneMessageBody](#prunemessagebody), <br> [RevokeMessageBody](#revokemessagebody), <br>[MergeUserNameProofBody](#mergeusernameproofbody), <br>[MergeOnChainEventBody](#mergeonchaineventbody) | oneOf |      |

## HubEventType

| 名称                                | 数值 | 描述 |
| ----------------------------------- | ---- | ---- |
| HUB_EVENT_TYPE_NONE                 | 0    |      |
| HUB_EVENT_TYPE_MERGE_MESSAGE        | 1    |      |
| HUB_EVENT_TYPE_PRUNE_MESSAGE        | 2    |      |
| HUB_EVENT_TYPE_REVOKE_MESSAGE       | 3    |      |
| HUB_EVENT_TYPE_MERGE_USERNAME_PROOF | 6    |      |
| HUB_EVENT_TYPE_MERGE_ON_CHAIN_EVENT | 9    |      |

<a name="-MergeMessageBody"></a>

## MergeMessageBody

| 字段             | 类型                | 标签     | 描述 |
| ---------------- | ------------------- | -------- | ---- |
| message          | [Message](#Message) |          |      |
| deleted_messages | [Message](#Message) | repeated |      |

<a name="-MergeUserNameProofBody"></a>

## MergeUserNameProofBody

| 字段                           | 类型                            | 标签 | 描述 |
| ------------------------------ | ------------------------------- | ---- | ---- |
| username_proof                 | [UserNameProof](#UserNameProof) |      |      |
| deleted_username_proof         | [UserNameProof](#UserNameProof) |      |      |
| username_proof_message         | [Message](#Message)             |      |      |
| deleted_username_proof_message | [Message](#Message)             |      |      |

<a name="-PruneMessageBody"></a>

## PruneMessageBody

| 字段    | 类型                | 标签 | 描述 |
| ------- | ------------------- | ---- | ---- |
| message | [Message](#Message) |      |      |

<a name="-RevokeMessageBody"></a>

## RevokeMessageBody

| 字段    | 类型                | 标签 | 描述 |
| ------- | ------------------- | ---- | ---- |
| message | [Message](#Message) |      |      |

<a name="-MergeOnChainEventBody"></a>

## MergeOnChainEventBody

| 字段           | 类型                          | 标签 | 描述 |
| -------------- | ----------------------------- | ---- | ---- |
| on_chain_event | [OnChainEvent](#OnChainEvent) |      |      |

<a name="-HubEventType"></a>

## OnChainEvent

| 字段             | 类型                                                                                                                                                                                               | 标签  | 描述             |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | ---------------- |
| type             | [OnChainEventType](#OnChainEventType)                                                                                                                                                              |       | 链上事件的类型   |
| chain_id         | [uint32](#)                                                                                                                                                                                        |       | 事件的链 ID      |
| block_number     | [uint32](#)                                                                                                                                                                                        |       | 事件的区块号     |
| block_hash       | [bytes](#)                                                                                                                                                                                         |       | 事件的区块哈希   |
| block_timestamp  | [uint64](#)                                                                                                                                                                                        |       | 事件的区块时间戳 |
| transaction_hash | [bytes](#)                                                                                                                                                                                         |       | 事件的交易哈希   |
| log_index        | [uint32](#)                                                                                                                                                                                        |       | 事件的日志索引   |
| fid              | [uint64](#)                                                                                                                                                                                        |       | 事件关联的 fid   |
| body             | [SignerEventBody](#signereventbody), <br> [SignerMigratedEventBody](#signermigratedeventbody), <br> [IdRegisterEventBody](#idregistereventbody), <br>[StorageRentEventBody](#storagerenteventbody) | oneOf |                  |
| tx_index         | [uint32](#)                                                                                                                                                                                        |       | 事件的交易索引   |

<a name="-OnChainEventType"></a>

## OnChainEventType

| 名称                       | 数值 | 描述 |
| -------------------------- | ---- | ---- |
| EVENT_TYPE_NONE            | 0    |      |
| EVENT_TYPE_SIGNER          | 1    |      |
| EVENT_TYPE_SIGNER_MIGRATED | 2    |      |
| EVENT_TYPE_ID_REGISTER     | 3    |      |
| EVENT_TYPE_STORAGE_RENT    | 4    |      |

<a name="-SignerEventBody"></a>

## SignerEventBody

| 字段          | 类型                                | 标签 | 描述                         |
| ------------- | ----------------------------------- | ---- | ---------------------------- |
| key           | [bytes](#)                          |      | 签名者公钥的字节             |
| key_type      | [uint32](#)                         |      | 密钥类型（当前仅设置为 1）   |
| event_type    | [SignerEventType](#SignerEventType) |      | 签名者事件的类型             |
| metadata      | [bytes](#)                          |      | 与密钥关联的元数据           |
| metadata_type | [uint32](#)                         |      | 元数据类型（当前仅设置为 1） |

<a name="-SignerEventType"></a>

## SignerEventType

| 名称                          | 数值 | 描述 |
| ----------------------------- | ---- | ---- |
| SIGNER_EVENT_TYPE_NONE        | 0    |      |
| SIGNER_EVENT_TYPE_ADD         | 1    |      |
| SIGNER_EVENT_TYPE_REMOVE      | 2    |      |
| SIGNER_EVENT_TYPE_ADMIN_RESET | 3    |      |

<a name="-SignerMigratedEventBody"></a>

## SignerMigratedEventBody

| 字段        | 类型        | 标签 | 描述                       |
| ----------- | ----------- | ---- | -------------------------- |
| migrated_at | [uint32](#) |      | hub 迁移到 OP 主网的时间戳 |

<a name="-SignerEventBody"></a>

## SignerEventBody

| 字段            | 类型                                        | 标签 | 描述                  |
| --------------- | ------------------------------------------- | ---- | --------------------- |
| to              | [bytes](#)                                  |      | fid 注册/转移到的地址 |
| event_type      | [IdRegisterEventType](#IdRegisterEventType) |      | ID 注册事件的类型     |
| from            | [bytes](#)                                  |      | 转移发起地址          |
| recover_address | [bytes](#)                                  |      | fid 的恢复地址        |

<a name="-IdRegisterEventType"></a>

## IdRegisterEventType

| 名称                                   | 数值 | 描述 |
| -------------------------------------- | ---- | ---- |
| ID_REGISTER_EVENT_TYPE_NONE            | 0    |      |
| ID_REGISTER_EVENT_TYPE_REGISTER        | 0    |      |
| ID_REGISTER_EVENT_TYPE_TRANSFER        | 0    |      |
| ID_REGISTER_EVENT_TYPE_CHANGE_RECOVERY | 0    |      |

<a name="-StorageRentEventBody"></a>

## StorageRentEventBody

| 字段   | 类型        | 标签 | 描述                       |
| ------ | ----------- | ---- | -------------------------- |
| payer  | [bytes](#)  |      | 支付者地址                 |
| units  | [uint32](#) |      | 购买的存储单元数量         |
| expiry | [uint32](#) |      | 这些存储单元将到期的时间戳 |
