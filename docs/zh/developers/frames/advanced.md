---
title: 框架高级主题
---

# 高级主题

构建复杂 Farcaster 框架的高级主题。

#### 使初始框架图像动态化

当框架在广播中被分享时，其元数据通常会被抓取并缓存，以便无需额外加载即可渲染到用户信息流中。这意味着初始框架设置的任何 URL 都将始终被渲染。

要使初始图像动态化，您需要：

- 在静态 URL 上提供动态图像
- 设置适当的缓存头

例如，假设您想构建一个框架，初始框架显示 ETH 的当前价格。对于初始框架，您需要设置一个静态图像 URL，如`https://example.xyz/eth-price.png`。当对此端点发出 GET 请求时：

- 服务器从缓存中获取最新的 ETH 价格
- 使用[Vercel OG](https://vercel.com/docs/functions/og-image-generation)等工具渲染图像并返回
- 设置以下头：`Cache-Control: public, immutable, no-transform, max-age=60`

我们建议设置非零的`max-age`，以便图像可以被缓存并从 CDN 提供服务，否则用户在动态图像生成和加载时会在信息流中看到灰色图像。具体时间取决于您的应用，但应选择在保持图像合理新鲜的前提下尽可能长的时间。

#### 在静态 URL 生成动态图像时避免缓存错误图像

如果您有一个生成动态图像的静态 URL，并且在无法生成图像时使用备用图像，您应在`Cache-Control`头中设置`max-age=0`，以免被缓存。

例如，假设您在`/img/eth-price`生成一个动态图像，显示 ETH 价格的 24 小时图表。通常您希望此图像缓存 5 分钟。但是，如果 ETH 价格数据不可用且您渲染了备用图像，您不希望请求被缓存，以便在后续请求中重试。

#### 数据持久化

[Vercel KV](https://vercel.com/docs/storage/vercel-kv)和[Cloudflare Workers KV](https://developers.cloudflare.com/kv/)是为框架服务器添加简单持久层的便捷选择。
