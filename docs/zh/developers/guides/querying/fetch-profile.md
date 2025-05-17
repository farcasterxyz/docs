# 获取账户资料

::: info 前提条件

- 对 hubble 实例具有只读访问权限

:::

要获取资料详情，请使用以下命令：

```bash
$ curl http://localhost:2281/v1/userDataByFid\?fid\=1 | jq ".messages[].data.userDataBody"
{
  "type": "USER_DATA_TYPE_PFP",
  "value": "https://i.imgur.com/I2rEbPF.png"
}
{
  "type": "USER_DATA_TYPE_BIO",
  "value": "一个充分去中心化的社交网络。farcaster.xyz"
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

更多详情请参阅 [HTTP API 参考文档](/reference/hubble/httpapi/userdata)。

如果是从源代码安装的 hubble，可以使用内置的 `console` 工具。这将使用 gRPC API：

```bash
# 确保当前在 hubble 子目录下
$ cd apps/hubble
# 如果主机使用 TLS，请移除 `--insecure` 参数
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
    value: '一个充分去中心化的社交网络。farcaster.xyz'
  },
  { type: 2, value: 'Farcaster' },
  { type: 6, value: 'farcaster' }
]
```

关于 gRPC API 的更多详情，请参阅 [gRPC API 参考文档](/reference/hubble/grpcapi/grpcapi)。
