# 获取频道中的 casts（广播消息）

::: info 前提条件

- 拥有 hubble 实例的读取权限

:::

要从频道获取 casts，Hubble 提供了 `getCastsByParent` API 调用。

例如，要查询所有发送到 `ethereum` 频道的 casts：

```bash
$ curl http://localhost:2281/v1/castsByParent\?fid\=1\&url\="https://ethereum.org" | jq " .messages | limit(10;.[]) | .data.castAddBody.text"
"cue "
"Commandeering this channel for the one true Ethereum, Ethereum classic."
"Pretty amazing that even during a bear market, the 30 day average burn gives us deflationary ETH. \n\nSource: Ultrasound.Money"
"So, Ethereum is frequently called the Base Layer or L1 when talking about scalability.\n\nBut how can you call the whole Ethereum + Ethereum L2s + L3s that commit to Ethereum L2s?\n\nWe’re building a unified multi-chain explorer for that, but we don’t know how to call it: https://ethereum.routescan.io"
"This, we're already doing.\n\nBut we call it, the Full-Index Ecosystem Explorer."
". By subdomains do you mean more specific namespaces, e.g. Farcaster fnames being name.farcaster.eth?\n\nMy guess is if the root .eth namespace is available it will command higher status and value.\n\nhttps://x.com/0xfoobar/status/1687209523239604230"
"what are the best examples of DAOs with independent core working groups/multisigs?"
"Anyone here use Rabby?\n\nhttps://x.com/0xfoobar/status/1687474090150416385"
"Who needs stablecoins when we have ETH"
"782,672 active + pending validators! 🤯 \n\n(also... I haven't proposed a block for a few months)"
```

使用 GRPC API 的示例：

```bash
> res = await rpcClient.getCastsByParent({parentUrl: "https://ethereum.org"})
> res.value.messages.slice(0, 10).map( m => m.data.castAddBody.text)
[
  'cue ',
  'Commandeering this channel for the one true Ethereum, Ethereum classic.',
  'Pretty amazing that even during a bear market, the 30 day average burn gives us deflationary ETH. \n' +
    '\n' +
    'Source: Ultrasound.Money',
  'So, Ethereum is frequently called the Base Layer or L1 when talking about scalability.\n' +
    '\n' +
    'But how can you call the whole Ethereum + Ethereum L2s + L3s that commit to Ethereum L2s?\n' +
    '\n' +
    'We’re building a unified multi-chain explorer for that, but we don’t know how to call it: https://ethereum.routescan.io',
  "This, we're already doing.\n" +
    '\n' +
    'But we call it, the Full-Index Ecosystem Explorer.',
  '. By subdomains do you mean more specific namespaces, e.g. Farcaster fnames being name.farcaster.eth?\n' +
    '\n' +
    'My guess is if the root .eth namespace is available it will command higher status and value.\n' +
    '\n' +
    'https://x.com/0xfoobar/status/1687209523239604230',
  'what are the best examples of DAOs with independent core working groups/multisigs?',
  'Anyone here use Rabby?\n' +
    '\n' +
    'https://x.com/0xfoobar/status/1687474090150416385',
  'Who needs stablecoins when we have ETH',
  '782,672 active + pending validators! 🤯 \n' +
    '\n' +
    "(also... I haven't proposed a block for a few months)"
]
```
