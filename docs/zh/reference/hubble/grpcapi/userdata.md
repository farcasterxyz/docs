# UserData API

用于获取与用户关联的当前元数据

## API

| 方法名                      | 请求类型        | 响应类型         | 描述                         |
| --------------------------- | --------------- | ---------------- | ---------------------------- |
| GetUserData                 | UserDataRequest | Message          | 返回指定 Fid 的特定 UserData |
| GetUserDataByFid            | FidRequest      | MessagesResponse | 返回某个 Fid 的所有 UserData |
| GetAllUserDataMessagesByFid | FidRequest      | MessagesResponse | 返回某个 Fid 的所有 UserData |

## UserData 请求

| 字段           | 类型              | 标签 | 描述                              |
| -------------- | ----------------- | ---- | --------------------------------- |
| fid            | [uint64](#)       |      | 生成 UserData 用户的 Farcaster ID |
| user_data_type | [UserDataType](#) |      | 请求的 UserData 类型              |

## Messages 响应

| 字段            | 类型            | 标签     | 描述           |
| --------------- | --------------- | -------- | -------------- |
| messages        | [Message](#)    | repeated | Farcaster 消息 |
| next_page_token | [bytes](#bytes) | optional |                |
