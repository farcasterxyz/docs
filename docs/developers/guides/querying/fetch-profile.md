# Get account profile

::: info Pre-requisites

- Read only access to a hubble instance

:::

To fetch profile details, use the

```bash
$ curl http://localhost:2281/v1/userDataByFid\?fid\=1 | jq ".messages[].data.userDataBody"
{
  "type": "USER_DATA_TYPE_PFP",
  "value": "https://i.imgur.com/I2rEbPF.png"
}
{
  "type": "USER_DATA_TYPE_BIO",
  "value": "A sufficiently decentralized social network. farcaster.xyz"
}
{
  "type": "USER_DATA_TYPE_DISPLAY",
  "value": "Farcaster"
}
{
  "type": "USER_DATA_TYPE_USERNAME",
  "value": "farcaster"
}
```

See the [http api reference](/reference/hubble/httpapi/userdata) for more details.

If you have the hubble installed from source, you can use the built in `console`. This will use the grpc APIs

```bash
# Ensure you are in the hubble sub directory
$ cd apps/hubble
# Remove `--insecure` if the host is using TLS
$ yarn console --insecure -s localhost:2283
> res = await rpcClient.getUserDataByFid({fid: 1})
Ok {
  value: {
    messages: [ [Object], [Object], [Object], [Object] ],
    nextPageToken: <Buffer >
  }
}
> res.value.messages.map(m => m.data.userDataBody)
[
  { type: 1, value: 'https://i.imgur.com/I2rEbPF.png' },
  {
    type: 3,
    value: 'A sufficiently decentralized social network. farcaster.xyz'
  },
  { type: 2, value: 'Farcaster' },
  { type: 6, value: 'farcaster' }
]
```

For more details on the GRPC API, see the [grpc api reference](/reference/hubble/grpcapi/grpcapi).
