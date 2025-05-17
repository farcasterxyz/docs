# 连接至 Hubble

::: info 前提条件

- 对 Hubble 实例拥有只读访问权限

:::

关于如何设置本地 Hubble 实例的更多信息，请参阅 [Hubble 安装指南](/hubble/install)。

当 Hub 运行后，可以通过查询 HTTP API 来验证连接是否正常：

```bash
# 默认 HTTP 端口为 2281
$ curl http://localhost:2281/v1/castsByFid\?fid\=1 | jq ".messages[1]"
{
  "data": {
    "type": "MESSAGE_TYPE_CAST_ADD",
    "fid": 1,
    "timestamp": 62108253,
    "network": "FARCASTER_NETWORK_MAINNET",
    "castAddBody": {
      "embedsDeprecated": [],
      "mentions": [],
      "parentCastId": {
        "fid": 3,
        "hash": "0x2d8c167ac383d51328c0ffd785ccdbaf54be45e7"
      },
      "text": "test",
      "mentionsPositions": [],
      "embeds": []
    }
  },
  "hash": "0x0e38d339e175e4df88c553102ea7f4db43d39f1b",
  "hashScheme": "HASH_SCHEME_BLAKE3",
  "signature": "dVsNn061CoMhQbleRlPTOL8a/rn9wNCIJnwcXzJnHLXK9RyceVGVPkmxtP7vAnpb+2UYhUwncnHgDHaex/lqBw==",
  "signatureScheme": "SIGNATURE_SCHEME_ED25519",
  "signer": "0xb85cf7feef230f30925b101223fd3e3dc4e1120bacd677f5ad3523288f8f7102"
}
```

关于 HTTP API 的更多细节，请参阅 [HTTP API 参考文档](/reference/hubble/httpapi/httpapi)。

或者，如果您通过源码安装了 Hubble，可以使用内置的 `console` 工具，该工具将使用 gRPC API：

```bash
# 确保当前位于 hubble 子目录
$ cd apps/hubble
# 如果主机使用 TLS，请移除 `--insecure` 参数
$ yarn console --insecure -s localhost:2283
> res = await rpcClient.getCastsByFid({fid: 1})
Ok {
  value: {
    messages: [ [Object], [Object], [Object], [Object] ],
    nextPageToken: <Buffer >
  }
}
```

关于 gRPC API 的更多细节，请参阅 [gRPC API 参考文档](/reference/hubble/grpcapi/grpcapi)。
