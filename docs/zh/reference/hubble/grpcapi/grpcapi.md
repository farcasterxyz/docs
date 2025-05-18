# GRPC API

Hubble 默认在 2283 端口提供 gRPC API 服务。

## 使用 API

我们推荐使用 [hub-nodejs](https://github.com/farcasterxyz/hub-monorepo/tree/main/packages/hub-nodejs) 这类库来与 Hubble 的 gRPC API 交互。具体使用方法请参阅其[文档](https://github.com/farcasterxyz/hub-monorepo/tree/main/packages/hub-nodejs/docs)。

## 其他语言支持

gRPC API 的 protobuf 文件存放在 [hub-monorepo](https://github.com/farcasterxyz/hub-monorepo/tree/main/protobufs) 中，可用于生成其他编程语言客户端的绑定。请注意，默认情况下，Hub 依赖 javascript 的 [ts-proto](https://www.npmjs.com/package/ts-proto) 库的序列化字节顺序来验证消息哈希。如果使用其他客户端，在调用 `SubmitMessage` 时可能需要通过 `data_bytes` 字段传入原始序列化字节，才能使消息被视为有效。更多细节请参考 [SubmitMessage HTTP API 文档](/zh/reference/hubble/httpapi/message#using-with-rust-go-or-other-programing-languages)。
