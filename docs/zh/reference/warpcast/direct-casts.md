# 直接私信（Direct Casts）

本文档记录了 Warpcast 为直接私信提供的公开 API。目前直接私信尚未纳入协议规范，计划将于今年晚些时候将其加入协议。

#### 发送/撰写直接私信的 API

- [通过 API 发送直接私信](https://www.notion.so/warpcast/Public-Programmable-DCs-v1-50d9d99e34ac4d10add55bd26a91804f)
- 上述链接同时提供了如何获取直接私信 API 密钥的信息

#### 直接私信意图（Intents）

通过意图功能，开发者可将认证用户引导至预填内容的直接私信撰写界面（通过 URL 实现）。

```bash
https://warpcast.com/~/inbox/create/[fid]?text=[消息内容]

https://warpcast.com/~/inbox/create/1?text=gm
```
