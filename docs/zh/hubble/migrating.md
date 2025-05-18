# 迁移至 snapchain

[Snapchain](https://github.com/farcasterxyz/snapchain) 是 Farcaster 协议的一个更具扩展性的实现。要与 snapchain 交互，您可以运行自己的读取节点。

## 运行节点

```bash
mkdir snapchain
wget https://raw.githubusercontent.com/farcasterxyz/snapchain/refs/heads/main/docker-compose.mainnet.yml -O docker-compose.yml
docker compose up # -d 表示在后台运行
```

注意，默认的 HTTP 端口是 `3381`，默认的 gossip 端口是 `3382`，默认的 gRPC 端口是 `3383`。您可能需要开放这些端口。

## 从 snapchain 读取数据

读取 API 完全向后兼容 hubs，因此无需迁移。通过客户端库读取数据的操作请参考[现有文档](https://docs.farcaster.xyz/developers/guides/querying/fetch-casts)。

运行节点后，通过 HTTP 访问：

```bash
curl http://locaalhost:3381/v1/info
```

通过 gRPC 访问：

```bash
git clone git@github.com:farcasterxyz/snapchain.git
cd snapchain
grpcurl -plaintext -proto src/proto/rpc.proto -import-path src/proto localhost:3383 HubService/GetInfo
```

如果您使用 Shuttle，其操作方式与之前相同，只需将其指向 snapchain 节点即可。

## 向 snapchain 写入数据

写入 API 也向后兼容 hubs，但有一些注意事项（见下文）。

要向 snapchain 写入数据，您应该运行一个节点并直接向其提交。通过客户端库写入数据的操作请参考[现有文档](https://docs.farcaster.xyz/developers/guides/writing/submit-messages)。注意，您**必须**使用 `hub-nodejs` 库的 `0.16` 或更高版本。

### 注意事项

- 如果您没有使用 `hub-nodejs` 库中的构建器，请确保在每个消息中填充 `dataBytes` 而不是 `data`，如下所示：

  ```ts
  if (message.dataBytes === undefined) {
    message.dataBytes = protobufs.MessageData.encode(message.data).finish();
    message.data = undefined;
  }
  ```

- Snapchain 中 `submitMessage` 返回的部分错误信息与 Hubs 不同。
- Snapchain 的提交是尽力而为的。可能会出现 `submitMessage` 成功但消息未被包含进区块的情况。关于当消息被内存池接受但无法包含进区块时向客户端提供反馈的计划，请关注[此问题](https://github.com/farcasterxyz/snapchain/issues/353)。

## 测试网

snapchain 有一个测试网，您可以使用以下 docker compose 文件运行节点：

```bash
mkdir snap_test
wget https://raw.githubusercontent.com/farcasterxyz/snapchain/refs/heads/main/docker-compose.testnet.yml -O docker-compose.yml
docker compose up # -d 表示在后台运行
```

注意，测试网不稳定，会不时重置。
