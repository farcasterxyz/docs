# 用户数据 API

用于获取与用户关联的当前元数据

## API

| 方法名称                    | 请求类型        | 响应类型         | 描述                            |
| --------------------------- | --------------- | ---------------- | ------------------------------- |
| GetUserData                 | UserDataRequest | Message          | 返回指定 FID 对应的特定用户数据 |
| GetUserDataByFid            | FidRequest      | MessagesResponse | 返回指定 FID 对应的所有用户数据 |
| GetAllUserDataMessagesByFid | FidRequest      | MessagesResponse | 返回指定 FID 对应的所有用户数据 |

## 用户数据请求

| 字段           | 类型              | 标签 | 描述                                |
| -------------- | ----------------- | ---- | ----------------------------------- |
| fid            | [uint64](#)       |      | 生成该用户数据的用户的 Farcaster ID |
| user_data_type | [UserDataType](#) |      | 请求的用户数据类型                  |

## 消息响应

| 字段            | 类型            | 标签     | 描述           |
| --------------- | --------------- | -------- | -------------- |
| messages        | [Message](#)    | 重复字段 | Farcaster 消息 |
| next_page_token | [bytes](#bytes) | 可选字段 |                |
