# 反应（Reactions）API

## API

| 方法名称                    | 请求类型                 | 响应类型         | 描述                                         |
| --------------------------- | ------------------------ | ---------------- | -------------------------------------------- |
| GetReaction                 | ReactionRequest          | Message          | 返回指定的反应（Reaction）                   |
| GetReactionsByFid           | ReactionsByFidRequest    | MessagesResponse | 按时间倒序返回某个 Fid 用户创建的所有反应    |
| GetReactionsByCast          | ReactionsByCastRequest   | MessagesResponse | 按时间倒序返回针对某个 Cast 的所有反应       |
| GetReactionsByTarget        | ReactionsByTargetRequest | MessagesResponse | 按时间倒序返回针对某个目标（Cast）的所有反应 |
| GetAllReactionMessagesByFid | FidRequest               | MessagesResponse | 按时间倒序返回某个 Fid 用户创建的所有反应    |

## 反应请求（Reaction Request）

用于获取有效或已撤销的反应

| 字段           | 类型              | 标签 | 描述                             |
| -------------- | ----------------- | ---- | -------------------------------- |
| fid            | [uint64](#)       |      | 生成该反应的用户的 Farcaster ID  |
| reaction_type  | [ReactionType](#) |      | 请求的反应类型                   |
| target_cast_id | [CastId](#)       |      | （可选）请求其反应的 Cast 标识符 |
| target_url     | [string](#)       |      | （可选）请求其反应的 URL 标识符  |

## 按 Fid 获取反应请求（ReactionsByFid Request）

| 字段          | 类型              | 标签 | 描述                            |
| ------------- | ----------------- | ---- | ------------------------------- |
| fid           | [uint64](#)       |      | 生成该反应的用户的 Farcaster ID |
| reaction_type | [ReactionType](#) |      | 请求的反应类型                  |
| page_size     | uint32            |      | （可选）请求的链接类型          |
| page_token    | bytes             |      | （可选）请求的链接类型          |
| reverse       | boolean           |      | （可选）响应结果的排序方式      |

## 按 Cast 获取反应请求（ReactionsByCast Request）

| 字段          | 类型              | 标签 | 描述                       |
| ------------- | ----------------- | ---- | -------------------------- |
| cast_id       | [CastId](#)       |      | 请求其反应的 Cast 标识符   |
| reaction_type | [ReactionType](#) |      | 请求的反应类型             |
| page_size     | uint32            |      | （可选）请求的链接类型     |
| page_token    | bytes             |      | （可选）请求的链接类型     |
| reverse       | boolean           |      | （可选）响应结果的排序方式 |

## 按目标获取反应请求（ReactionsByTargetRequest）

| 字段           | 类型                          | 标签     | 描述 |
| -------------- | ----------------------------- | -------- | ---- |
| target_cast_id | [CastId](#CastId)             |          |      |
| target_url     | [string](#string)             |          |      |
| reaction_type  | [ReactionType](#ReactionType) | optional |      |
| page_size      | [uint32](#uint32)             | optional |      |
| page_token     | [bytes](#bytes)               | optional |      |
| reverse        | [bool](#bool)                 | optional |      |
