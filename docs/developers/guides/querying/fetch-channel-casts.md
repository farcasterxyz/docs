# Fetch casts from a channel

::: info Pre-requisites

- Read access to a hubble instance

:::

To fetch casts from a channel, Hubble provides a `getCastsByParent` api call.

For example, to query all casts to the `ethereum` channel:

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

Using the GRPC API:

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
