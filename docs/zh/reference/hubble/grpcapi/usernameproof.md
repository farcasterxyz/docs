# 用户名证明 API

## API

| 方法名                 | 请求类型                                      | 响应类型                                          | 描述                    |
| ---------------------- | --------------------------------------------- | ------------------------------------------------- | ----------------------- |
| GetUsernameProof       | [UsernameProofRequest](#UsernameProofRequest) | [UserNameProof](#UserNameProof)                   | 获取用户名证明          |
| GetUserNameProofsByFid | [FidRequest](#FidRequest)                     | [UsernameProofsResponse](#UsernameProofsResponse) | 通过 FID 获取用户名证明 |

## UsernameProofRequest

| 字段 | 类型            | 标签 | 描述   |
| ---- | --------------- | ---- | ------ |
| name | [bytes](#bytes) |      | 用户名 |

## UsernameProofsResponse

| 字段   | 类型                            | 标签     | 描述           |
| ------ | ------------------------------- | -------- | -------------- |
| proofs | [UserNameProof](#UserNameProof) | repeated | 用户名证明列表 |

## UserNameProof

| 字段      | 类型                          | 标签 | 描述         |
| --------- | ----------------------------- | ---- | ------------ |
| timestamp | [uint64](#uint64)             |      | 时间戳       |
| name      | [bytes](#bytes)               |      | 用户名       |
| owner     | [bytes](#bytes)               |      | 所有者地址   |
| signature | [bytes](#bytes)               |      | 签名数据     |
| fid       | [uint64](#uint64)             |      | Farcaster ID |
| type      | [UserNameType](#UserNameType) |      | 用户名类型   |

## UserNameProof

| 字段      | 类型                          | 标签 | 描述         |
| --------- | ----------------------------- | ---- | ------------ |
| timestamp | [uint64](#uint64)             |      | 时间戳       |
| name      | [bytes](#bytes)               |      | 用户名       |
| owner     | [bytes](#bytes)               |      | 所有者地址   |
| signature | [bytes](#bytes)               |      | 签名数据     |
| fid       | [uint64](#uint64)             |      | Farcaster ID |
| type      | [UserNameType](#UserNameType) |      | 用户名类型   |
