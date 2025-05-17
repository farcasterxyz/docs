# Warpcast 嵌入功能参考文档

Warpcast 在渲染 URL 嵌入的富媒体预览时遵循 [Open Graph 协议](https://ogp.me)。

开发者可通过 https://warpcast.com/~/developers/embeds 重置 Warpcast 上现有的嵌入缓存。

#### 附加说明

- 重置嵌入缓存不会清除 Open Graph 图片缓存。若遇到 Open Graph 图片未更新的情况，请更改作为 `og:image` 提供的图片文件路径。
- 开发者需登录 Warpcast 账户才能访问该页面。
- 如需渲染 NFT 的富媒体预览，请遵循 [Farcaster 帧规范](/developers/frames/spec)。
