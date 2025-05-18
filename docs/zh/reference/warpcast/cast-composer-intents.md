---
title: Warpcast 意图 URL
---

# 意图 URL

## 发布意图 URL

Warpcast 意图允许开发者将已认证用户引导至预填充的发布编辑器。

> [!IMPORTANT]
> 如果您正在构建 mini app 并希望提示用户撰写发布内容，请使用 [composeCast 操作](https://miniapps.farcaster.xyz/docs/sdk/actions/compose-cast)
> 来自 Mini App SDK。

#### 包含发布文本

```
https://warpcast.com/~/compose?text=Hello%20world!
```

#### 包含发布文本和一个嵌入内容

```
https://warpcast.com/~/compose?text=Hello%20world!&embeds[]=https://farcaster.xyz
```

#### 包含提及内容和两个嵌入内容的发布文本

```
https://warpcast.com/~/compose?text=Hello%20@farcaster!&embeds[]=https://farcaster.xyz&embeds[]=https://github.com/farcasterxyz/protocol
```

#### 在特定频道发布文本

```
https://warpcast.com/~/compose?text=Hello%20world!&channelKey=farcaster
```

#### 回复带有哈希值的发布内容

```
https://warpcast.com/~/compose?text=Looks%20good!&parentCastHash=0x09455067393562d3296bcbc2ec1c2d6bba8ac1f1
```

#### 附加说明

- 嵌入内容可以是任何有效的 URL
- 以 `.png`、`.jpg` 或 `.gif` 结尾的 URL 将呈现为图片嵌入
- 嵌入 Zora 铸造页面的 URL 将显示 NFT 并在下方附带铸造链接
- 您可以在 https://warpcast.com/~/developers/embeds 查看嵌入内容在 Warpcast 中的呈现效果

## 资源 URL

#### 通过 FID 查看个人资料

```
https://warpcast.com/~/profiles/:fid
```

#### 通过哈希值查看发布内容

```
https://warpcast.com/~/conversations/:hash
```
