# Hubble 监控系统

Hubble 内置了默认的 Grafana 配置，用于监控同步状态和性能指标。

如果使用安装脚本部署，在浏览器中访问 localhost:3000 即可查看仪表盘。如果是手动通过 Docker 或源码安装，可能需要自行完成配置。

如果在远程服务器部署了 Hubble，可通过 SSH 隧道访问：执行 `ssh -L 3000:localhost:3000 xyz@1.1.1.1` 命令后，在浏览器中打开 localhost:3000 即可查看仪表盘。

## 监控配置指南

1. 启动 grafana 和 statsd 服务

```bash
docker compose up statsd grafana
```

2. 在 Hub 中启用监控功能，在 `.env` 文件中添加配置：

```bash
STATSD_METRICS_SERVER=statsd:8125
```

如果通过源码运行 hubble，可通过命令行参数传递：

```bash
yarn start --statsd-metrics-server 127.0.0.1:8125
```

3. 重启 Hub 服务

4. 在浏览器中访问 `127.0.0.1:3000` 打开 Grafana。默认用户名/密码为 `admin`/`admin`，首次登录需修改密码

5. 进入 `设置 -> 数据源 -> 添加数据源`，选择 `Graphite` 类型。将 URL 设置为 `http://statsd:80` 并点击 `保存并测试` 确保连接正常

6. 进入 `设置 -> 仪表盘 -> 新建 -> 导入`，在 `通过面板 JSON 导入` 中粘贴 [默认 Grafana 仪表盘](https://github.com/farcasterxyz/hub-monorepo/blob/main/apps/hubble/grafana/grafana-dashboard.json) 的内容
