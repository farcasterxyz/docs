---
layout: home

hero:
  name: Farcaster 文档中心
  tagline: 自由构建与分发社交应用的开放协议
  actions:
    - theme: brand
      text: 构建迷你应用
      link: https://miniapps.farcaster.xyz/docs/getting-started
      target: _self
    - theme: alt
      text: 探索 Farcaster 登录
      link: /developers/siwf/
    - theme: alt
      text: 了解协议规范
      link: /learn/
---

### 构建迷你应用

学习如何开发运行在 Farcaster 信息流中的迷你应用（原 Frames v2 版本）。

<!-- prettier-ignore -->
- [迷你应用介绍](https://miniapps.farcaster.xyz/){target="_self"} - 理解迷你应用的概念与运行机制
<!-- prettier-ignore -->
- [开发首个迷你应用](https://miniapps.farcaster.xyz/docs/getting-started){target="_self"} - 构建运行在 Farcaster 内的迷你应用

### 探索 Farcaster 登录

让用户通过 Farcaster 账号登录，并在您的应用中利用社交图谱数据。

- [功能概述](/developers/siwf/) - 了解 Farcaster 登录机制
- [通过 AuthKit 集成登录](/auth-kit/installation) - 使用 React 工具包快速实现登录功能
- [示例演示](/auth-kit/examples) - 查看实际集成案例

### 分析 Farcaster 数据

将 Farcaster 网络数据同步至本地，执行自定义查询分析。

- [编写首个 Hub 查询](/developers/guides/querying/fetch-casts.md) - 从 Hub 获取指定账户的 Casts 数据
- [配置数据同步器](/developers/guides/apps/replicate.md) - 将 Hub 数据同步至 Postgres 数据库以执行高级查询
- [运行本地 Hub](/hubble/install.md) - 在本地设备实时访问 Farcaster 网络数据
