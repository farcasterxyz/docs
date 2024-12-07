# Direct Casts

This page documents public APIs provided by Warpcast for direct casts. Direct casts are currently not part of the protocol. There are plans to add direct casts to the protocol later this year.

#### Send / write API for direct casts

- [Send direct casts via API](https://www.notion.so/warpcast/Public-Programmable-DCs-v1-50d9d99e34ac4d10add55bd26a91804f)
- The above link also provides information on how to obtain direct cast API keys

#### Direct cast intents

Intents enable developers to direct authenticated users to a pre-filled direct cast composer via a URL.

```bash
https://warpcast.com/~/inbox/create/[fid]?text=[message]

https://warpcast.com/~/inbox/create/1?text=gm
```
