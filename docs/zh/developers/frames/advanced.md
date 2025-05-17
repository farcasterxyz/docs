---
title: 高级主题：Frames
---

# 高级主题

构建复杂 Farcaster Frames 的高级技巧。

#### 实现初始 Frame 图片的动态化

当 Frame 在推文中被分享时，其元数据通常会被抓取并缓存，以便无需额外加载即可渲染到用户信息流中。这意味着初始 Frame 设置的任何 URL 都将被永久渲染。

若要使初始图片动态化，您需要：

- 在静态 URL 下提供动态图片
- 设置适当的缓存头

例如，假设您想构建一个初始 Frame 显示 ETH 当前价格的场景。初始 Frame 应设置静态图片 URL 如 `https://example.xyz/eth-price.png`。当向该端点发起 GET 请求时：

- 服务器从缓存中获取最新的 ETH 价格
- 使用 [Vercel OG](https://vercel.com/docs/functions/og-image-generation) 等工具渲染图片并返回
- 设置以下响应头：`Cache-Control: public, immutable, no-transform, max-age=60`

建议设置非零的 `max-age` 值以便图片能被 CDN 缓存，否则在动态图片生成和加载期间，用户将在信息流中看到灰色占位图。具体时间取决于应用场景，但应在保证图片相对新鲜的前提下选择最长的缓存时间。

#### 静态 URL 生成动态图片时避免缓存错误图片

如果您的静态 URL 会生成动态图片，并且在无法生成图片时使用了备用图片，则应设置 `Cache-Control` 头为 `max-age=0` 以防止错误图片被缓存。

举例说明，假设您在 `/img/eth-price` 生成显示 ETH 24 小时价格走势的动态图片。正常情况下您希望该图片缓存 5 分钟。但当 ETH 价格数据不可用并渲染备用图片时，您不希望该请求被缓存，以便后续请求可以重试。

#### 数据持久化

[Vercel KV](https://vercel.com/docs/storage/vercel-kv) 和 [Cloudflare Workers KV](https://developers.cloudflare.com/kv/) 是为 Frame 服务器添加简单持久层的便捷选择。
