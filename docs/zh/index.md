---
layout: home

hero:
  name: Farcaster 文档中心
  tagline: 自由构建与分发社交应用
  actions:
    - theme: brand
      text: 构建 mini app
      link: https://miniapps.farcaster.xyz/docs/getting-started
      target: _self
    - theme: alt
      text: 探索 Farcaster 登录
      link: /zh/developers/siwf/
    - theme: alt
      text: 了解协议规范
      link: /zh/learn/
---

### 构建 Mini App

学习如何构建运行在 Farcaster 信息流中的 Mini Apps（原 Frames v2）。

<!-- prettier-ignore -->
- [Mini App 介绍](https://miniapps.farcaster.xyz/){target="_self"} - 理解 mini app 的概念与运行机制
<!-- prettier-ignore -->
- [开发首个 Mini App](https://miniapps.farcaster.xyz/docs/getting-started){target="_self"} - 构建运行在 Farcaster 中的 mini apps

### 探索 Farcaster 登录

允许用户通过 Farcaster 登录，并在您的应用中利用社交数据。

- [功能简介](/zh/developers/siwf/) - 了解 Farcaster 登录机制
- [使用 AuthKit 集成登录](/zh/auth-kit/installation) - 通过 React 工具包快速实现登录功能
- [示例演示](/zh/auth-kit/examples) - 查看实际应用场景

### 分析 Farcaster 数据

将 Farcaster 网络同步至本地设备，实现数据查询功能。

- [编写首个 Hub 查询](/zh/developers/guides/querying/fetch-casts.md) - 从 Hub 获取账户的 Casts 数据
- [配置数据同步器](/zh/developers/guides/apps/replicate.md) - 将 Hub 数据同步至 PostgreSQL 数据库以执行高级查询
- [运行 Hub 节点](/zh/hubble/install.md) - 在本地设备实时获取 Farcaster 数据
