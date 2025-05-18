# 监控 Hubble

Hubble 默认提供了 Grafana 配置，用于监控同步和性能指标。

如果使用了安装脚本，请在浏览器中打开 localhost:3000 查看仪表盘。如果是手动使用 docker 或从源码安装，可能需要自行设置。

如果在远程服务器上部署了 hubble，可通过 `ssh -L 3000:localhost:3000 xyz@1.1.1.1` 建立 SSH 隧道，然后在浏览器中打开 localhost:3000 查看仪表盘。

## 监控设置步骤

1. 启动 grafana 和 statsd

```bash
docker compose up statsd grafana
```

2. 在 Hub 的 `.env` 文件中启用监控

```bash
STATSD_METRICS_SERVER=statsd:8125
```

如果从源码运行 hubble，可通过命令行参数传递

```bash
yarn start --statsd-metrics-server 127.0.0.1:8125
```

3. 重启 hub

4. 在浏览器中访问 `127.0.0.1:3000` 打开 Grafana。默认用户名/密码为 `admin`/`admin`。首次登录需要修改密码

5. 进入 `Settings -> Datasource -> Add new data source`，选择 `Graphite`。将 URL 设置为 `http://statsd:80` 并点击 `Save & Test` 确保连接正常

6. 进入 `Settings -> Dashboard -> Add New -> Import`，在 `Import from Panel JSON` 中粘贴 [默认 Grafana 仪表盘](https://github.com/farcasterxyz/hub-monorepo/blob/main/apps/hubble/grafana/grafana-dashboard.json) 的内容
