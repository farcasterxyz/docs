# 架构

Hub 是一个单进程守护程序，负责接收来自客户端、其他 hub 和 farcaster 合约的数据。它包含四个主要组件：

- **存储引擎** - 校验消息有效性，将其持久化存储到磁盘并触发事件。
- **P2P 引擎** - 建立 gossipsub 网络以与其他 hub 交换消息。
- **同步引擎** - 处理当 gossip 未能传递消息时的边缘情况。
- **RPC 服务器** - 提供读写 hub 数据的 API 接口。

### 存储引擎

Hubble 接收到的消息会被转发至存储引擎，随后被分发到对应的 CRDT 集合。经过 CRDT 集合验证后，消息将被持久化存储至 [RocksDB](https://github.com/facebook/rocksdb)，同时向监听器发送事件通知。

CRDT 集合的实现严格遵循 Farcaster 协议规范。该引擎还会追踪 Farcaster 合约的状态，这对于验证 Signer CRDT 集合至关重要。

### P2P 引擎

Hubble 通过基于 [LibP2P](https://github.com/libp2p/libp2p) 构建的 GossipSub 网络与其他节点建立连接。被存储引擎合并的消息会立即通过 gossip 协议广播给所有对等节点。

在测试阶段，Hubble 仅与可信节点建立连接，并采用简单的网络拓扑结构。启动时必须预先配置已知实例才能建立对等连接。在后续版本中，网络拓扑将进行调整以更接近去信任的网状结构。

### 同步引擎

Hubble 会定期与其他节点执行 [差异同步](https://github.com/farcasterxyz/protocol#41-synchronization)，以发现可能在 gossip 过程中丢失的消息。该功能通过每个 Hub 实例暴露的 gRPC API 实现。

### RPC 服务器

Hubble 提供 gRPC 和 HTTP API 用于读写 hub 数据。向 farcaster 网络写入数据的主要方式是调用 hub 的 `submitMessage` 接口。hub 会验证消息的有效性，若符合协议规范，则将其存储到对应的 CRDT 集合并通过 gossip 协议传播给其他节点。hub 还提供其他 API 用于读取各集合的状态信息。
