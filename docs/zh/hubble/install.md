# 安装指南

我们推荐在已安装 [Docker](https://docs.docker.com/desktop/install/linux-install/) 的常驻服务器上运行 Hubble。

## 系统要求

Hubble 可在 30 分钟内完成部署。您需要准备以下配置的机器：

- 16 GB 内存
- 4 核 CPU 或 vCPU
- 1TB 可用存储空间
- 具备公网 IP 地址并开放 2281 - 2283 端口
- 以太坊和 Optimism 主网的 RPC 端点（可使用 [Alchemy](https://www.alchemy.com/)、[Infura](https://www.infura.io/)、[QuickNode](https://www.quicknode.com/)，或自行运行 [以太坊](https://geth.ethereum.org/docs/getting-started) 和 [Optimism](https://docs.optimism.io/builders/node-operators/tutorials/mainnet) 节点）

关于如何在云服务商部署 Hubble，请参阅 [教程指南](./tutorials)。

## 脚本安装

安装脚本是最简单的 Hubble 部署方式。

```bash
curl -sSL https://download.thehubble.xyz/bootstrap.sh | bash
```

_若使用 macOS 系统，需提前安装并运行 Docker。_

Hubble 将被安装到 `~/hubble` 目录，并通过 Docker 在后台运行，同时会启动 Grafana 和 Prometheus 用于 [监控](monitoring.md)。如遇脚本执行问题，可尝试 [Docker 安装方式](#install-via-docker)。

### 升级 Hubble

安装脚本会自动创建定时任务，每周执行一次升级。如需手动升级，请运行：

```bash
cd ~/hubble && ./hubble.sh upgrade
```

## Docker 安装

您也可以直接运行 Docker 镜像来部署 Hubble：

1. 本地克隆 [hub-monorepo](https://github.com/farcasterxyz/hub-monorepo) 仓库
2. 进入仓库根目录下的 `apps/hubble` 文件夹
3. 使用 docker compose 生成身份密钥对

```bash
docker compose run hubble yarn identity create
```

4. 在 `apps/hubble` 目录创建 .env 文件并配置以太坊 RPC 端点：

```bash
# 设置主网 ETH RPC URL
ETH_MAINNET_RPC_URL=您的-ETH-主网-RPC-URL

# 设置 Optimism L2 主网 RPC URL
OPTIMISM_L2_RPC_URL=您的-L2-optimism-RPC-URL

# 设置您的 Farcaster FID
HUB_OPERATOR_FID=您的-fid
```

5. 按照 [网络连接指南](./networks.md) 完成网络配置

6. 使用 docker compose 启动 Hubble（后台模式）：

```bash
docker compose up hubble -d
```

Docker compose 将启动 Hubble 容器，开放网络端口并将数据写入 `.hub` 和 `.rocks` 目录。Hubble 将开始与合约及其他节点同步，下载网络中的所有消息。

7. 查看同步状态和运行日志：

```bash
docker compose logs -f hubble
```

8. 参照 [监控指南](monitoring.md) 配置 Grafana 实时查看节点状态

### 升级 Hubble

进入 hub-monorepo 的 `apps/hubble` 目录运行：

```bash
git checkout main && git pull
docker compose stop && docker compose up -d --force-recreate --pull always
```

## 源码编译安装

您也可以通过源码直接编译运行 Hubble（无需 Docker）。

#### 环境依赖

首先确保系统已安装：

- [Node.js 18.7+](https://nodejs.org/en/download/releases)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install)
- [Foundry](https://book.getfoundry.sh/getting-started/installation#using-foundryup)
- [Rust](https://www.rust-lang.org/tools/install)

#### 编译步骤

- `git clone https://github.com/farcasterxyz/hub-monorepo.git` 克隆仓库
- `cd hub-monorepo` 进入目录
- `yarn install` 安装依赖
- `yarn build` 编译 Hubble 及其依赖
- `yarn test` 运行测试套件验证

#### 运行 Hubble

进入 Hubble 应用目录 (`cd apps/hubble`) 后执行 yarn 命令：

1. `yarn identity create` 创建身份 ID
2. 按照 [网络连接指南](./networks.md) 完成配置
3. `yarn start --eth-mainnet-rpc-url <您的-ETH-主网-RPC-URL> --l2-rpc-url <您的-Optimism-L2-RPC-URL> --hub-operator-fid <您的-FID>`

### 升级 Hubble

查找最新 [发布版本](https://github.com/farcasterxyz/hub-monorepo/releases)，检出对应版本后重新编译：

```bash
git fetch --tags # 获取最新标签
git checkout @farcaster/hubble@latest # 或指定版本号
yarn install && yarn build # 在根目录执行
```

## 常用命令

查看运行日志确保节点正常：

```bash
docker compose logs -f hubble
```

进入 Hubble 容器 shell：

```bash
docker compose exec hubble /bin/sh
```

## 故障排查

- 从非 Docker 环境升级时，请确保 `.hub` 和 `.rocks` 目录具有全局写入权限

- 从 1.3.3 或更早版本升级时：

  - Docker 用户需设置 `ETH_MAINNET_RPC_URL=您的-ETH-主网-RPC-URL`
  - 非 Docker 用户需添加 `--eth-mainnet-rpc-url` 参数

- 切换网络时需清空数据库：

```bash
docker compose stop && docker compose run --rm hubble yarn dbreset
```

- 手动拉取镜像：

```bash
# 获取最新镜像
docker pull farcasterxyz/hubble:latest

# 获取特定版本 (v1.4.0)
docker pull farcasterxyz/hubble@v1.4.0
```

- 设置 Hub 运营者 FID：
  - Docker/脚本用户：在 `.env` 文件设置 `HUB_OPERATOR_FID=您的-fid`
  - 源码用户：运行 `yarn start --hub-operator-fid <您的-fid>`
