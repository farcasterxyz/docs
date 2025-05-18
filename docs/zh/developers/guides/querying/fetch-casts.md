# 获取账户消息

::: info 前提条件

- 对 hubble 实例拥有只读访问权限

:::

有关如何设置本地 hubble 实例的更多信息，请参阅 [hubble 安装指南](/zh/hubble/install)。

要查询特定 FID 的所有 casts（广播消息），可以使用 castsByFid HTTP 端点：

```bash
# 默认 http 端口为 2281
$ curl http://localhost:2281/v1/castsByFid\?fid\=1 |  jq ".messages[].data.castAddBody.text | select( . != null)"
"testing"
"test"
"
"another test"
"another testy test"
```

这将返回该 fid 所有与 cast 相关的消息。对于 reactions（反应）和 follows（关注）也有类似的端点。更多详情请参阅 [http api 参考文档](/zh/reference/hubble/httpapi/httpapi)。

如果是从源码安装的 hubble，可以使用内置的 `console` 工具。这将使用 grpc API：

```bash
# 确保当前在 hubble 子目录下
$ cd apps/hubble
# 如果主机使用 TLS 请移除 `--insecure` 参数
$ yarn console --insecure -s localhost:2283
> res = await rpcClient.getCastsByFid({fid: 1})
Ok {
  value: {
    messages: [ [Object], [Object], [Object], [Object] ],
    nextPageToken: <Buffer >
  }
}
> res.value.messages.map( m => m.data.castAddBody.text)
[ 'testing', 'test', 'another test', 'another testy test' ]
```

有关 GRPC API 的更多详情，请参阅 [grpc api 参考文档](/zh/reference/hubble/grpcapi/grpcapi)。
