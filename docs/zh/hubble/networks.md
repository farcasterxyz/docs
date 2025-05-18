# 网络

Farcaster 账户必须选择将消息发布到哪个网络。任何在[合约](../learn/architecture/contracts.md)中注册的账户都可以向任何网络发布消息。但发布在某个网络中的消息在其他网络中不可见。

目前有两个主要网络：

- **Testnet** - 面向开发者的最新测试版本
- **Mainnet** - 供所有人使用的稳定版本

在[安装你的 hub](./install.md)时，需要选择要连接的网络。

## Testnet

Testnet 是开发者测试新功能的沙盒环境。系统每 10 秒会广播虚拟消息以模拟活动。

在 `apps/hubble` 目录下的 .env 文件中设置以下变量：

```sh
FC_NETWORK_ID=2
BOOTSTRAP_NODE=/dns/testnet1.farcaster.xyz/tcp/2282
```

如果从源代码运行，请将这些参数添加到 `yarn start` 命令中：

```sh
yarn start ... \
    -n 2 \
    -b /dns/testnet1.farcaster.xyz/tcp/2282
```

## Mainnet

Mainnet 是供所有人使用的生产环境。

在 `apps/hubble` 目录下的 .env 文件中设置以下变量：

```sh
FC_NETWORK_ID=1
BOOTSTRAP_NODE=/dns/hoyt.farcaster.xyz/tcp/2282
```

如果从源代码运行，请将这些参数添加到 `yarn start` 命令中：

```sh
yarn start ... \
    -n 1 \
    -b /dns/hoyt.farcaster.xyz/tcp/2282
```
