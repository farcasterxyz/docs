# 架构

Hub 是一个单进程守护程序，负责接收来自客户端、其他 Hub 节点以及 Farcaster 智能合约的数据。它包含四个核心组件：

- **存储引擎** - 校验消息有效性，将消息持久化存储至磁盘并触发事件。
- **P2P 引擎** - 建立 GossipSub 网络以实现 Hub 节点间的消息交换。
- **同步引擎** - 处理当 Gossip 传播未能成功投递消息时的边缘情况。
- **RPC 服务端** - 提供读写 Hub 数据的 API 接口。

### 存储引擎

Hubble 接收到的消息会被转发至存储引擎，随后由存储引擎分发给对应的 CRDT 集合（CRDT Set）。经过 CRDT 集合验证后，消息会被持久化存储至 [RocksDB](https://github.com/facebook/rocksdb) 数据库，同时向监听器发送事件通知。

CRDT 集合的实现严格遵循 Farcaster 协议规范。该引擎还会追踪 Farcaster 智能合约的状态，这对于验证签名者 CRDT 集合（Signer CRDT Set）至关重要。

### P2P 引擎

Hubble 通过基于 [LibP2P](https://github.com/libp2p/libp2p) 构建的 GossipSub 网络与其他节点建立连接。被存储引擎合并处理的消息会立即通过 Gossip 协议广播至所有对等节点。

在测试阶段，Hubble 仅与受信任节点建立连接，并采用简单的网络拓扑结构。启动时需预先配置已知节点列表作为可连接对象。在后续版本中，网络拓扑将逐步调整为更接近去信任化的网状结构。

### 同步引擎

Hubble 会定期与其他节点执行 [差异同步](https://github.com/farcasterxyz/protocol#41-synchronization)（diff sync），以发现可能因 Gossip 传播丢失的消息。该过程通过各 Hub 实例暴露的 gRPC API 实现。

### RPC 服务端

Hubble 提供 gRPC 和 HTTP 两种 API 接口用于读写 Hub 数据。向 Farcaster 网络写入数据的主要方式是调用 Hub 的 `submitMessage` 方法。Hub 会验证该消息，若符合协议规范，则将其存储至对应的 CRDT 集合并通过 Gossip 广播至其他节点。此外，Hub 还提供其他 API 用于读取各集合的状态信息。
