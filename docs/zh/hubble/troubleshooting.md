# Hubble 故障排查

## 获取 Hubble 日志

在 hubble 目录下，通过以下命令获取日志：

```bash
$ ./hubble.sh logs
```

或者直接使用 docker-compose：

```bash
# 如果使用 hubble 脚本安装 hub，需要 sudo
# 根据你的 docker 配置，可能需要使用 `docker-compose` 而非 `docker compose`
$ sudo docker compose logs -f hubble
```

## 重启 Hubble

在 hubble 目录下，通过以下命令重启实例：

```bash
$ ./hubble.sh down
$ ./hubble.sh up
```

## 重置数据库

重置数据库的最佳方式是彻底删除 `.rocks` 目录，这会强制 hub 获取最新快照并重新同步。

```bash
$ ./hubble.sh down # 确保 hub 未运行
$ rm -rf .rocks # 确保当前位于 hub 目录
```

## 无对等节点或传入的 gossip 连接

如果看不到任何对等节点或传入的 gossip 连接，可能是网络问题阻碍了 hub 与其他 hub 的通信。

检查防火墙和 NAT 设置，确保 2282（gossip）和 2283（rpc，用于同步）端口可访问。

你也可以尝试通过向 `.env` 文件添加以下行，使用非默认对等节点引导 hub：

```dotenv
BOOTSTRAP_NODE=/dns/hoyt.farcaster.xyz/tcp/2282
```

## 我的 hub 是否同步？

使用 [grafana 仪表盘](/hubble/monitoring) 监控你的 hub。状态标签页会显示 hub 与对等节点的消息同步百分比。如果低于 100%，尝试重启 hub 并等待一段时间。如果问题持续，请在 [hub 代码库](https://github.com/farcasterxyz/hub-monorepo/issues/new?assignees=&labels=&projects=&template=bug_report.md&title=bug%20%28hubble%29%3A) 提交问题。

## 管理你的 Peer ID

Hubble 使用存储在 `.hub` 目录中的密钥对（`...._id.protobuf` 文件）来签名点对点消息。文件名包含公钥或 Peer ID，而文件内容包含私钥。
