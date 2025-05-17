# 链接 API

链接（Link）表示两个用户之间的关系（例如关注）

## API

| 方法名                  | 请求类型             | 响应类型         | 描述                                        |
| ----------------------- | -------------------- | ---------------- | ------------------------------------------- |
| GetLink                 | LinkRequest          | Message          | 返回特定链接                                |
| GetLinksByFid           | LinksByFidRequest    | MessagesResponse | 按时间倒序返回某 fid 创建的所有链接         |
| GetLinksByTarget        | LinksByTargetRequest | MessagesResponse | 按时间倒序返回指向某目标的所有 LinkAdd 消息 |
| GetAllLinkMessagesByFid | FidRequest           | MessagesResponse | 按时间倒序返回某 fid 创建的所有链接         |

## 链接请求

| 字段       | 类型        | 标签 | 描述                        |
| ---------- | ----------- | ---- | --------------------------- |
| fid        | [uint64](#) |      | 生成链接的用户 Farcaster ID |
| link_type  | [string](#) |      | 请求的链接类型              |
| target_fid | [uint64](#) |      | 目标用户 fid                |

## LinksByFid 请求

| 字段       | 类型        | 标签 | 描述                        |
| ---------- | ----------- | ---- | --------------------------- |
| fid        | [uint64](#) |      | 生成链接的用户 Farcaster ID |
| link_type  | string      |      | 请求的链接类型              |
| page_size  | uint32      |      | (可选) 请求的链接类型       |
| page_token | bytes       |      | (可选) 请求的链接类型       |
| reverse    | boolean     |      | (可选) 响应排序方式         |

## LinksByTarget 请求

| 字段       | 类型        | 标签 | 描述                        |
| ---------- | ----------- | ---- | --------------------------- |
| target_fid | [uint64](#) |      | 生成链接的用户 Farcaster ID |
| link_type  | string      |      | (可选) 请求的链接类型       |
| page_size  | uint32      |      | (可选) 请求的链接类型       |
| page_token | bytes       |      | (可选) 请求的链接类型       |
| reverse    | boolean     |      | (可选) 响应排序方式         |
