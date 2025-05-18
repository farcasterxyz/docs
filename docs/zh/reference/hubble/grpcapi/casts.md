# Casts API

用于检索有效的 casts 或已删除 casts 的墓碑记录

## API

| 方法名                  | 请求类型   | 响应类型         | 描述                                      |
| ----------------------- | ---------- | ---------------- | ----------------------------------------- |
| GetCast                 | CastId     | Message          | 返回指定的 Cast                           |
| GetCastsByFid           | FidRequest | MessagesResponse | 按时间倒序返回某个 Fid 的 CastAdds        |
| GetCastsByParent        | CastId     | MessagesResponse | 按时间倒序返回对指定 Cast 的 CastAdd 回复 |
| GetCastsByMention       | FidRequest | MessagesResponse | 按时间倒序返回提及某个 Fid 的 CastAdds    |
| GetAllCastMessagesByFid | FidRequest | MessagesResponse | 按时间倒序返回某个 Fid 的所有 Casts       |

## CastsByParentRequest

| 字段           | 类型              | 标签     | 描述 |
| -------------- | ----------------- | -------- | ---- |
| parent_cast_id | [CastId](#CastId) |          |      |
| parent_url     | [string](#string) |          |      |
| page_size      | [uint32](#uint32) | optional |      |
| page_token     | [bytes](#bytes)   | optional |      |
| reverse        | [bool](#bool)     | optional |      |
