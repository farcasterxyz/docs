---
title: Warpcast 意图URL
---

# 意图 URL

## 发送 Cast 的意图 URL

Warpcast 意图允许开发者引导已认证用户跳转到预填充内容的 Cast 撰写界面。

> [!重要提示]
> 如果您正在开发 Mini App 并希望提示用户撰写 Cast，请使用[Mini App SDK 中的 composeCast 操作](https://miniapps.farcaster.xyz/docs/sdk/actions/compose-cast)。

#### 带文本内容的撰写

```
https://warpcast.com/~/compose?text=Hello%20world!
```

#### 带文本内容和单个嵌入的撰写

```
https://warpcast.com/~/compose?text=Hello%20world!&embeds[]=https://farcaster.xyz
```

#### 带提及文本和双嵌入的撰写

```
https://warpcast.com/~/compose?text=Hello%20@farcaster!&embeds[]=https://farcaster.xyz&embeds[]=https://github.com/farcasterxyz/protocol
```

#### 在指定频道撰写文本内容

```
https://warpcast.com/~/compose?text=Hello%20world!&channelKey=farcaster
```

#### 通过哈希值回复指定 Cast

```
https://warpcast.com/~/compose?text=Looks%20good!&parentCastHash=0x09455067393562d3296bcbc2ec1c2d6bba8ac1f1
```

#### 补充说明

- 嵌入内容可以是任何有效 URL
- 以`.png` `.jpg`或`.gif`结尾的 URL 将呈现为图片嵌入
- 嵌入 Zora 铸造页面 URL 将显示 NFT 及其下方铸造链接
- 您可以通过https://warpcast.com/~/developers/embeds查看嵌入内容在Warpcast中的实际渲染效果

## 资源 URL

#### 通过 FID 查看个人资料

```
https://warpcast.com/~/profiles/:fid
```

#### 通过哈希值查看 Cast

```
https://warpcast.com/~/conversations/:hash
```
