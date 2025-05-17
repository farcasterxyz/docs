---
title: 框架最佳实践
---

# 框架最佳实践

学习构建卓越 Frame 体验的最佳实践。

::: info
本文档假设您已具备 Frame 的基础知识。如需了解构建 Frame 的通用信息，请查阅以下资源：

- [入门指南](./getting-started)
- [Frame 规范](./spec)
- [frames.js](https://framesjs.org/guides/create-frame) 或 [frog](https://frog.fm/concepts/overview) 的指南
  :::

## 用户界面/用户体验

#### 遵循 Frame 界面设计规范 (FIG)

[FIG](https://github.com/paradigmxyz/Fig) 提供了全面的设计指南，可帮助您打造出色的 Frame 体验。内容涵盖从[基础原则](https://github.com/paradigmxyz/Fig?tab=readme-ov-file#foundations)（如布局与排版）到[交易处理最佳实践](https://github.com/paradigmxyz/Fig?tab=readme-ov-file#patterns)。

#### 优化性能

确保您的 Frame 能快速响应用户操作。请查阅并实施[性能优化建议](#performance)。

#### 使用可复用的样式和组件

建立一套可复用的样式和组件库，有助于快速构建风格统一的界面。

[FrogUI](https://frog.fm/ui) 作为 Frog 框架的扩展，提供了一套支持主题定制的原子化组件。

## 性能优化建议

::: tip
如果您是初学者或正在开发原型阶段，无需过度关注这些建议。

请记住，过早优化是万恶之源！
:::

#### 使用缓存图片

尽可能通过稳定 URL 提供图片并设置合理的缓存头，这能显著减少渲染时间。

#### 快速响应请求

避免在用户等待 Frame 加载时执行耗时操作（如调用大语言模型）。参见[后台执行耗时任务](#long-running)。

#### 后台执行耗时任务 {#long-running}

若 Frame 需执行耗时操作（如调用大语言模型或链上交易），应通过"后台"方式处理：立即返回提示操作状态的 Frame，允许用户刷新查看进度。

#### 使用本地存储的 Farcaster 数据副本 {#local-farcaster-data}

如需访问 Farcaster 数据，建议[通过 Shuttle 将其同步至 Postgres](/developers/guides/apps/replicate.md) 实现本地查询。

::: warning 高级提示
维护数据副本需要相当工作量。除非必要，建议优先使用 Neynar、Pinata 或 Airstack 等供应商提供的数据服务。
:::

#### 适时跳过 Frame 消息签名验证 {#skip-verification}

当消息数据不会导致敏感信息变更或暴露时，可跳过验证流程。

例如：若您的 Frame 仅展示用户 Cast 历史的公开分析数据，直接使用未经验证的数据通常足够安全。

::: info 注意
对于多步骤 Frame，某些交互可能需要验证，而其他步骤可能不需要。
:::

::: warning 谨慎操作
如果消息涉及特权操作或敏感数据暴露，则必须进行验证。
:::

#### 最小化外部依赖（如 Hubs）的延迟

这是[跳过验证](#skip-verification)和[使用本地数据副本](#local-farcaster-data)等策略的通用原则。

梳理 Frame 服务器的所有外部依赖，针对每个依赖思考：

- 能否移除该依赖？
- 数据能否缓存？
- 能否与 Frame 服务器同域部署？
