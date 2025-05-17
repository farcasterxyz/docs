# 同步 API

这些 API 用于 Hubs 之间同步状态。不适用于外部应用程序调用。

## API 接口

| 方法名                  | 请求类型          | 响应类型                 | 描述                         |
| ----------------------- | ----------------- | ------------------------ | ---------------------------- |
| GetInfo                 | HubInfoRequest    | HubInfoResponse          | 返回 Hub 状态的元数据信息    |
| GetSyncStatus           | SyncStatusRequest | SyncStatusResponse       | 返回 Hub 的同步状态          |
| GetAllSyncIdsByPrefix   | TrieNodePrefix    | SyncIds                  | 获取指定前缀下的所有 SyncId  |
| GetAllMessagesBySyncIds | SyncIds           | MessagesResponse         | 根据同步 ID 获取所有对应消息 |
| GetSyncMetadataByPrefix | TrieNodePrefix    | TrieNodeMetadataResponse | 获取指定前缀的同步元数据     |
| GetSyncSnapshotByPrefix | TrieNodePrefix    | TrieNodeSnapshotResponse | 获取指定前缀的同步快照       |

## HubInfoRequest 请求

| 字段     | 类型          | 标签 | 描述 |
| -------- | ------------- | ---- | ---- |
| db_stats | [bool](#bool) |      |      |

## HubInfoResponse 响应

同步 RPC 方法的响应类型

| 字段       | 类型                | 标签 | 描述           |
| ---------- | ------------------- | ---- | -------------- |
| version    | [string](#string)   |      | 版本号         |
| is_syncing | [bool](#bool)       |      | 是否正在同步   |
| nickname   | [string](#string)   |      | 昵称           |
| root_hash  | [string](#string)   |      | 根哈希值       |
| db_stats   | [DbStats](#DbStats) |      | 数据库统计信息 |

## SyncStatusRequest 请求

| 字段   | 类型              | 标签     | 描述        |
| ------ | ----------------- | -------- | ----------- |
| peerId | [string](#string) | optional | 对等节点 ID |

## SyncStatusResponse 响应

| 字段        | 类型                      | 标签     | 描述         |
| ----------- | ------------------------- | -------- | ------------ |
| is_syncing  | [bool](#bool)             |          | 是否正在同步 |
| sync_status | [SyncStatus](#SyncStatus) | repeated | 同步状态列表 |

## SyncStatus 同步状态

| 字段                 | 类型              | 标签 | 描述               |
| -------------------- | ----------------- | ---- | ------------------ |
| peerId               | [string](#string) |      | 对等节点 ID        |
| inSync               | [string](#string) |      | 同步状态           |
| shouldSync           | [bool](#bool)     |      | 是否需要同步       |
| divergencePrefix     | [string](#string) |      | 差异前缀           |
| divergenceSecondsAgo | [int32](#int32)   |      | 差异发生时间（秒） |
| theirMessages        | [uint64](#uint64) |      | 对方消息数         |
| ourMessages          | [uint64](#uint64) |      | 己方消息数         |
| lastBadSync          | [int64](#int64)   |      | 上次同步失败时间   |

## TrieNodePrefix 前缀节点

| 字段   | 类型            | 标签 | 描述     |
| ------ | --------------- | ---- | -------- |
| prefix | [bytes](#bytes) |      | 前缀字节 |

## SyncIds 同步 ID 集合

| 字段     | 类型            | 标签     | 描述         |
| -------- | --------------- | -------- | ------------ |
| sync_ids | [bytes](#bytes) | repeated | 同步 ID 列表 |

## TrieNodeMetadataResponse 元数据响应

| 字段         | 类型                                                  | 标签     | 描述       |
| ------------ | ----------------------------------------------------- | -------- | ---------- |
| prefix       | [bytes](#bytes)                                       |          | 节点前缀   |
| num_messages | [uint64](#uint64)                                     |          | 消息数量   |
| hash         | [string](#string)                                     |          | 哈希值     |
| children     | [TrieNodeMetadataResponse](#TrieNodeMetadataResponse) | repeated | 子节点列表 |

## TrieNodeSnapshotResponse 快照响应

| 字段            | 类型              | 标签     | 描述           |
| --------------- | ----------------- | -------- | -------------- |
| prefix          | [bytes](#bytes)   |          | 节点前缀       |
| excluded_hashes | [string](#string) | repeated | 排除的哈希列表 |
| num_messages    | [uint64](#uint64) |          | 消息数量       |
| root_hash       | [string](#string) |          | 根哈希值       |

## DbStats 数据库统计

| 字段             | 类型              | 标签 | 描述         |
| ---------------- | ----------------- | ---- | ------------ |
| num_messages     | [uint64](#uint64) |      | 消息总数     |
| num_fid_events   | [uint64](#uint64) |      | FID 事件数   |
| num_fname_events | [uint64](#uint64) |      | FNAME 事件数 |
