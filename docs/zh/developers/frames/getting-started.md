---
title: Frames 入门指南
---

# 快速开始

::: info 暂不准备构建？
如果您想在动手构建前了解更多关于 Frames 的信息，请直接跳转至 [Frames 规范文档](./spec)。
:::

让我们使用 Frog 在一分钟内从零到一。完成本指南后，您将拥有：

- 一个类型安全的基础 Frame 服务端
- 用于本地交互和调试 Frame 的工具
- 部署在公网上的服务

### 通过 CLI 快速搭建

首先，创建一个新项目：

::: code-group

```ts [npm]
npm init frog -t vercel
```

```ts [yarn]
yarn create frog -t vercel
```

```ts [bun]
bunx create-frog -t vercel
```

```ts [pnpm]
pnpm create frog -t vercel
```

完成提示操作并按照指引执行：

```
bun install // 安装依赖
bun run dev // 启动开发服务器
```

::: info
本指南使用 Frog + Vercel 组合，但 Frame 可以通过多种方式构建和部署。您可以在 [Frame 开发者资源](./resources) 页面查看流行替代方案如 [frame.js](https://framesjs.org/)。
:::

### 打开预览界面

现在您的 Frame 服务已运行，访问 `http://localhost:5174/api/dev` 即可通过 [开发工具](https://frog.fm/concepts/devtools) 预览界面与您的 Frame 交互。

您将看到一个显示 "Welcome!" 的 Frame，包含三个按钮：苹果、橙子和香蕉。点击任意按钮，Frame 会更新显示您选择的内容。

![Frog Frame 预览界面](./frog_frame_preview.png)

### 部署 Frame

::: info
本项目默认配置为使用 Vercel 部署，因其简单易用。如需其他部署方式，请查阅 [Frog 平台文档](https://frog.fm/platforms/bun)。
:::

要让您的 Frame 可被访问，需要将服务部署到公网。此步骤可暂缓进行。

::: code-group

```ts [npm]
npm run deploy
```

```ts [yarn]
yarn run deploy
```

.

```ts [bun]
bunx run deploy
```

```ts [pnpm]
pnpm run deploy
```

完成提示操作。部署完成后，您可以使用 [Warpcast Frame 验证工具](https://warpcast.com/~/developers/frames-legacy) 进行端到端测试。

::: info
请确保输入完整的 Frame URL。Vercel 项目的默认 Frame URL 为 `https://<domain>/api`。
:::

## 后续步骤

现在您已完成首个 Frames 项目的搭建和部署，以下是推荐步骤：

- 阅读 [Frog 概念文档](https://frog.fm/concepts/overview) 学习如何构建复杂的 [多步骤 Frame](https://frog.fm/concepts/routing)
- 尝试 [使用 frames.js 搭建项目](https://framesjs.org/guides/create-frame)，查看其丰富的 [指南](https://framesjs.org/guides/create-frame) 和 [示例](https://framesjs.org/examples/basic)
- 探索更多 [Frame 开发和学习资源](./resources)
- 阅读 [最佳实践](./best-practices) 了解如何打造优质 Frame 体验
