# 链接 API

Link（链接）表示两个用户之间的关系（例如关注）

## API

| 方法名称                | 请求类型             | 响应类型         | 描述                                          |
| ----------------------- | -------------------- | ---------------- | --------------------------------------------- |
| GetLink                 | LinkRequest          | Message          | 返回特定的 Link                               |
| GetLinksByFid           | LinksByFidRequest    | MessagesResponse | 按时间倒序返回某个 fid 创建的所有 Link        |
| GetLinksByTarget        | LinksByTargetRequest | MessagesResponse | 按时间倒序返回指向某个目标的所有 LinkAdd 消息 |
| GetAllLinkMessagesByFid | FidRequest           | MessagesResponse | 按时间倒序返回某个 fid 创建的所有 Link        |

## Link 请求

| 字段       | 类型        | 标签 | 描述                            |
| ---------- | ----------- | ---- | ------------------------------- |
| fid        | [uint64](#) |      | 生成该 Link 的用户 Farcaster ID |
| link_type  | [string](#) |      | 请求的 Link 类型                |
| target_fid | [uint64](#) |      | 目标用户的 fid                  |

## LinksByFid 请求

| 字段       | 类型        | 标签 | 描述                            |
| ---------- | ----------- | ---- | ------------------------------- |
| fid        | [uint64](#) |      | 生成该 Link 的用户 Farcaster ID |
| link_type  | string      |      | 请求的 Link 类型                |
| page_size  | uint32      |      | (可选) 请求的 Link 类型         |
| page_token | bytes       |      | (可选) 请求的 Link 类型         |
| reverse    | boolean     |      | (可选) 控制返回结果的排序方式   |

## LinksByTarget 请求

| 字段       | 类型        | 标签 | 描述                            |
| ---------- | ----------- | ---- | ------------------------------- |
| target_fid | [uint64](#) |      | 生成该 Link 的用户 Farcaster ID |
| link_type  | string      |      | (可选) 请求的 Link 类型         |
| page_size  | uint32      |      | (可选) 请求的 Link 类型         |
| page_token | bytes       |      | (可选) 请求的 Link 类型         |
| reverse    | boolean     |      | (可选) 控制返回结果的排序方式   |
