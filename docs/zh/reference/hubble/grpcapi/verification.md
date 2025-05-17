# 验证 API

用于检索有效或已撤销的以太坊地址所有权证明。

## API

| 方法名称                        | 请求类型            | 响应类型         | 描述                                          |
| ------------------------------- | ------------------- | ---------------- | --------------------------------------------- |
| GetVerification                 | VerificationRequest | Message          | 返回指定以太坊地址的 VerificationAdd 记录     |
| GetVerificationsByFid           | FidRequest          | MessagesResponse | 返回指定 Fid 创建的所有 VerificationAdds 记录 |
| GetAllVerificationMessagesByFid | FidRequest          | MessagesResponse | 返回指定 Fid 创建的所有验证记录               |

## 验证请求

| 字段    | 类型        | 标签 | 描述                            |
| ------- | ----------- | ---- | ------------------------------- |
| fid     | [uint64](#) |      | 生成验证记录的用户 Farcaster ID |
| address | [bytes](#)  |      | 待验证的以太坊地址              |
