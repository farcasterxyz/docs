# OnChainEvents API

用于检索链上事件（ID 注册、密钥、存储租金）

## API

| 方法名                             | 请求类型                        | 响应类型             | 描述                                                                      |
| ---------------------------------- | ------------------------------- | -------------------- | ------------------------------------------------------------------------- |
| GetOnChainSigner                   | SignerRequest                   | OnChainEvent         | 返回指定 Fid 的活跃签名者对应的链上事件                                   |
| GetOnChainSignersByFid             | FidRequest                      | OnChainEventResponse | 返回指定 Fid 所有活跃账户密钥（签名者）的添加事件                         |
| GetIdRegistryOnChainEvent          | FidRequest                      | OnChainEvent         | 返回指定 fid 最近一次的注册/转移链上事件                                  |
| GetIdRegistryOnChainEventByAddress | IdRegistryEventByAddressRequest | OnChainEvent         | 根据地址返回注册/转移事件（如果存在），可用于通过地址查找 fid             |
| GetOnChainEvents                   | OnChainEventRequest             | OnChainEventResponse | 返回指定 Fid 按类型过滤的所有链上事件（包括非活跃密钥和已过期的租金事件） |

## Signer Request

| 字段   | 类型        | 标签 | 描述                            |
| ------ | ----------- | ---- | ------------------------------- |
| fid    | [uint64](#) |      | 生成签名者的用户的 Farcaster ID |
| signer | [bytes](#)  |      | 签名者的公钥                    |

## Fid Request

| 字段       | 类型        | 标签 | 描述                   |
| ---------- | ----------- | ---- | ---------------------- |
| fid        | [uint64](#) |      | 用户的 Farcaster ID    |
| page_size  | uint32      |      | （可选）请求的链接类型 |
| page_token | bytes       |      | （可选）请求的链接类型 |
| reverse    | boolean     |      | （可选）响应排序方式   |

#### IdRegistryEventByAddressRequest

| 字段    | 类型            | 标签 | 描述 |
| ------- | --------------- | ---- | ---- |
| address | [bytes](#bytes) |      |      |

#### OnChainEventResponse

| 字段            | 类型                          | 标签     | 描述 |
| --------------- | ----------------------------- | -------- | ---- |
| events          | [OnChainEvent](#onchainevent) | repeated |      |
| next_page_token | [bytes](#bytes)               | optional |      |
