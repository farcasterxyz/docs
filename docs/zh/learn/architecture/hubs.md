# Hubs（中心节点）

Hubs 是一个分布式服务器网络，用于存储和验证 Farcaster 数据。

计算机可以通过运行特定软件成为 Farcaster Hub。它会从以太坊区块链下载链上 Farcaster 数据，并从其他 Hubs 获取链下 Farcaster 数据。每个 Hub 都存储着所有 Farcaster 数据的副本，这些数据可以通过 API 访问。

Hubs 允许您读取和写入 Farcaster 数据，任何构建 Farcaster 应用的开发者都需要与 Hub 进行交互。任何人都可以在笔记本电脑或云服务器上运行 Hub。完整的 Hub 设置和运行指南可参见[此处](https://www.thehubble.xyz)。

## 设计架构

Hub 首先从 Optimism 区块链上的 Farcaster 合约同步数据。它会识别每个用户的账户及其账户密钥。

Farcaster 消息的生命周期如下：

1. Alice 创建一条新消息"Hello World!"。
2. Alice（或她的应用）使用账户密钥对消息进行签名。
3. Alice（或她的应用）将消息上传至 Hub。
4. Hub 检查消息的有效性。
5. Hub 通过 gossip 协议将消息发送给对等节点。

![Hub](/assets/hub.png)

### 验证机制

Alice 的消息会通过验证其是否包含有效的账户密钥签名。Hub 还会确保消息符合该消息类型的要求。例如，公开消息（或称"cast"）必须小于 320 字节。消息类型的详细要求参见[协议规范](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md)。

### 存储机制

在存储 Alice 的消息前，Hub 会检查是否存在冲突。冲突可能由多种原因导致：

1. Hub 已存在该消息的副本。
2. Hub 已收到 Alice 删除该消息的后续指令。
3. Alice 仅支付了存储 5000 条消息的费用，而这是她的第 5001 条消息。

系统使用 CRDTs（无冲突复制数据类型）以确定性和异步方式解决冲突。例如，如果 Alice 没有存储空间，系统将删除她最早的消息。

### 数据同步

Hubs 采用两阶段同步流程：gossip 和差异同步。当 Hub 接收并存储消息后，会立即通过 gossip 协议传播给对等节点。gossip 使用 libp2p 的 gossipsub 协议实现，可能存在丢包情况。随后 Hubs 会定期选择随机对等节点进行差异同步，以找回丢失的消息。差异同步过程通过比较消息哈希的默克尔树来高效定位丢失消息。

### 一致性保证

Hubs 具有强最终一致性。即使 Hub 断开连接，仍可接收写入操作，并在重新联网后安全恢复。这与区块链不同，区块链节点断开时无法确认交易。缺点是消息可能乱序到达，例如 Bob 对 Alice 的回复可能早于她的"Hello World!"消息出现。

### 节点评分

Hubs 会监控对等节点并评估其行为。如果节点拒绝有效消息、同步滞后或过度 gossip，可能会被其他节点忽略。

### 实现方案

- [Hubble](https://www.thehubble.xyz) - 基于 TypeScript 和 Rust 的 Hub 实现

## 常见问题

**1. 为什么需要运行 Hub？**

如果您正在开发需要读写 Farcaster 数据的应用，就需要运行 Hub。

**2. 运行 Hub 有奖励吗？**

Farcaster 不为运行 Hub 提供奖励，也没有相关计划。
