# Hubble

[Hubble](https://github.com/farcasterxyz/hub-monorepo) 是 [Farcaster Hub 协议](https://github.com/farcasterxyz/protocol) 的一个实现，采用 [TypeScript](https://www.typescriptlang.org/) 和 [Rust](https://www.rust-lang.org/) 编写。

Hubble 会在您的机器上创建一个私有的 Farcaster 实例。它会与其他实例建立对等连接，并下载整个网络的副本。上传到您 Hubble 实例的消息将被广播到整个网络。

如果您正在构建应用程序、需要访问最新数据或希望帮助网络去中心化，我们建议您运行 Hubble。

## 托管实例

Hubble 实例也可以由其他服务提供商为您托管。

- [Hubs x Neynar](https://hubs.neynar.com/)
- [Hubs x Pinata](https://pinata.cloud/pinata-hub)

## 公共实例

Farcaster 团队运行了一个供公众使用的 Hubble 实例。该实例不保证稳定性，目前为只读模式。

```bash
url: hoyt.farcaster.xyz
httpapi_port: 2281
gossipsub_port: 2282
grpc_port: 2283
```
