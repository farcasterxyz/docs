# 类型转换 API

用于获取有效的类型转换（casts）或已删除转换的墓碑记录（tombstones）

## API 接口

| 方法名称                | 请求类型   | 响应类型         | 描述                                          |
| ----------------------- | ---------- | ---------------- | --------------------------------------------- |
| GetCast                 | CastId     | Message          | 返回指定的类型转换                            |
| GetCastsByFid           | FidRequest | MessagesResponse | 按时间倒序返回某 FID 的所有 CastAdd 记录      |
| GetCastsByParent        | CastId     | MessagesResponse | 按时间倒序返回针对某 Cast 的所有 CastAdd 回复 |
| GetCastsByMention       | FidRequest | MessagesResponse | 按时间倒序返回提及某 FID 的所有 CastAdd 记录  |
| GetAllCastMessagesByFid | FidRequest | MessagesResponse | 按时间倒序返回某 FID 的所有类型转换记录       |

## 按父级转换请求参数

| 字段           | 类型              | 标签 | 说明         |
| -------------- | ----------------- | ---- | ------------ |
| parent_cast_id | [CastId](#CastId) |      | 父级转换 ID  |
| parent_url     | [string](#string) |      | 父级链接     |
| page_size      | [uint32](#uint32) | 可选 | 分页大小     |
| page_token     | [bytes](#bytes)   | 可选 | 分页令牌     |
| reverse        | [bool](#bool)     | 可选 | 是否倒序排列 |
