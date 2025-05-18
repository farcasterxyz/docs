# 同步 API

这些 API 用于 Hubs 之间同步状态。不适用于外部应用程序使用。

## API

| 方法名称                | 请求类型          | 响应类型                 | 描述                        |
| ----------------------- | ----------------- | ------------------------ | --------------------------- |
| GetInfo                 | HubInfoRequest    | HubInfoResponse          | 返回 Hub 状态的元数据。     |
| GetSyncStatus           | SyncStatusRequest | SyncStatusResponse       | 返回 Hub 的同步状态。       |
| GetAllSyncIdsByPrefix   | TrieNodePrefix    | SyncIds                  | 获取特定前缀下的所有 SyncId |
| GetAllMessagesBySyncIds | SyncIds           | MessagesResponse         | 根据同步 ID 获取所有消息    |
| GetSyncMetadataByPrefix | TrieNodePrefix    | TrieNodeMetadataResponse | 获取特定前缀的同步元数据    |
| GetSyncSnapshotByPrefix | TrieNodePrefix    | TrieNodeSnapshotResponse | 获取特定前缀的同步快照      |

## HubInfoRequest

| 字段     | 类型          | 标签 | 描述 |
| -------- | ------------- | ---- | ---- |
| db_stats | [bool](#bool) |      |      |

## HubInfoResponse

同步 RPC 方法的响应类型

| 字段       | 类型                | 标签 | 描述 |
| ---------- | ------------------- | ---- | ---- |
| version    | [string](#string)   |      |      |
| is_syncing | [bool](#bool)       |      |      |
| nickname   | [string](#string)   |      |      |
| root_hash  | [string](#string)   |      |      |
| db_stats   | [DbStats](#DbStats) |      |      |

## SyncStatusRequest

| 字段   | 类型              | 标签     | 描述 |
| ------ | ----------------- | -------- | ---- |
| peerId | [string](#string) | optional |      |

## SyncStatusResponse

| 字段        | 类型                      | 标签     | 描述 |
| ----------- | ------------------------- | -------- | ---- |
| is_syncing  | [bool](#bool)             |          |      |
| sync_status | [SyncStatus](#SyncStatus) | repeated |      |

## SyncStatus

| 字段                 | 类型              | 标签 | 描述 |
| -------------------- | ----------------- | ---- | ---- |
| peerId               | [string](#string) |      |      |
| inSync               | [string](#string) |      |      |
| shouldSync           | [bool](#bool)     |      |      |
| divergencePrefix     | [string](#string) |      |      |
| divergenceSecondsAgo | [int32](#int32)   |      |      |
| theirMessages        | [uint64](#uint64) |      |      |
| ourMessages          | [uint64](#uint64) |      |      |
| lastBadSync          | [int64](#int64)   |      |      |

## TrieNodePrefix

| 字段   | 类型            | 标签 | 描述 |
| ------ | --------------- | ---- | ---- |
| prefix | [bytes](#bytes) |      |      |

## SyncIds

| 字段     | 类型            | 标签     | 描述 |
| -------- | --------------- | -------- | ---- |
| sync_ids | [bytes](#bytes) | repeated |      |

## TrieNodeMetadataResponse

| 字段         | 类型                                                  | 标签     | 描述 |
| ------------ | ----------------------------------------------------- | -------- | ---- |
| prefix       | [bytes](#bytes)                                       |          |      |
| num_messages | [uint64](#uint64)                                     |          |      |
| hash         | [string](#string)                                     |          |      |
| children     | [TrieNodeMetadataResponse](#TrieNodeMetadataResponse) | repeated |      |

## TrieNodeSnapshotResponse

| 字段            | 类型              | 标签     | 描述 |
| --------------- | ----------------- | -------- | ---- |
| prefix          | [bytes](#bytes)   |          |      |
| excluded_hashes | [string](#string) | repeated |      |
| num_messages    | [uint64](#uint64) |          |      |
| root_hash       | [string](#string) |          |      |

## DbStats

| 字段             | 类型              | 标签 | 描述 |
| ---------------- | ----------------- | ---- | ---- |
| num_messages     | [uint64](#uint64) |      |      |
| num_fid_events   | [uint64](#uint64) |      |      |
| num_fname_events | [uint64](#uint64) |      |      |
