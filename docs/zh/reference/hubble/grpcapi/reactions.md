# 反应（Reactions）API

## API 接口

| 方法名称                    | 请求类型                 | 响应类型         | 描述                                          |
| --------------------------- | ------------------------ | ---------------- | --------------------------------------------- |
| GetReaction                 | ReactionRequest          | Message          | 返回指定的 Reaction                           |
| GetReactionsByFid           | ReactionsByFidRequest    | MessagesResponse | 按时间倒序返回某 Fid 用户创建的所有 Reactions |
| GetReactionsByCast          | ReactionsByCastRequest   | MessagesResponse | 按时间倒序返回某 Cast 收到的所有 ReactionAdds |
| GetReactionsByTarget        | ReactionsByTargetRequest | MessagesResponse | 按时间倒序返回某 Cast 收到的所有 ReactionAdds |
| GetAllReactionMessagesByFid | FidRequest               | MessagesResponse | 按时间倒序返回某 Fid 用户创建的所有 Reactions |

## Reaction 请求

用于获取有效或已撤销的 Reactions

| 字段           | 类型              | 标签 | 描述                                       |
| -------------- | ----------------- | ---- | ------------------------------------------ |
| fid            | [uint64](#)       |      | 生成该 Reaction 用户的 Farcaster ID        |
| reaction_type  | [ReactionType](#) |      | 请求的 Reaction 类型                       |
| target_cast_id | [CastId](#)       |      | (可选) 请求其 Reactions 的目标 Cast 标识符 |
| target_url     | [string](#)       |      | (可选) 请求其 Reactions 的目标 URL 标识符  |

## ReactionsByFid 请求

| 字段          | 类型              | 标签 | 描述                                |
| ------------- | ----------------- | ---- | ----------------------------------- |
| fid           | [uint64](#)       |      | 生成该 Reaction 用户的 Farcaster ID |
| reaction_type | [ReactionType](#) |      | 请求的 Reaction 类型                |
| page_size     | uint32            |      | (可选) 请求的链接类型               |
| page_token    | bytes             |      | (可选) 请求的链接类型               |
| reverse       | boolean           |      | (可选) 响应结果的排序方式           |

## ReactionsByCast 请求

| 字段          | 类型              | 标签 | 描述                                |
| ------------- | ----------------- | ---- | ----------------------------------- |
| cast_id       | [CastId](#)       |      | 请求其 Reactions 的目标 Cast 标识符 |
| reaction_type | [ReactionType](#) |      | 请求的 Reaction 类型                |
| page_size     | uint32            |      | (可选) 请求的链接类型               |
| page_token    | bytes             |      | (可选) 请求的链接类型               |
| reverse       | boolean           |      | (可选) 响应结果的排序方式           |

## ReactionsByTargetRequest 请求

| 字段           | 类型                          | 标签     | 描述 |
| -------------- | ----------------------------- | -------- | ---- |
| target_cast_id | [CastId](#CastId)             |          |      |
| target_url     | [string](#string)             |          |      |
| reaction_type  | [ReactionType](#ReactionType) | optional |      |
| page_size      | [uint32](#uint32)             | optional |      |
| page_token     | [bytes](#bytes)               | optional |      |
| reverse        | [bool](#bool)                 | optional |      |
