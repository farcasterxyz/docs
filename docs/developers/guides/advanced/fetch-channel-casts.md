# Fetch casts from a channel

::: info Pre-requisites

- Read access to a hubble instance

:::

To fetch casts from a channel, Hubble provides a `getCastsByParent` api call.

Using the HTTP API:

```bash
$ curl http://localhost:2281/v1/castsByParent\?fid\=1\&url\="url"
```

Using the GRPC API:

```bash
> res = await rpcClient.getCastsByParent({fid: 1, parentUrl: "https:://www.farcaster.xyz"})
```