# Get account messages

::: info Pre-requisites

- Read only access to a hubble instance

:::

See [hubble installation](/hubble/install) for more information on how to set up a local hubble instance.

To query all the casts for a particular FID, you can use the castsByFid HTTP endpoint:

```bash
# Default http port is 2281
$ curl http://localhost:2281/v1/castsByFid\?fid\=1 |  jq ".messages[].data.castAddBody.text | select( . != null)"
"testing"
"test"
"another test"
"another testy test"
```

This returns all the cast related messages for the fid. There are similar endpoints for reactions and follows. See
the [http api reference](/reference/hubble/httpapi/httpapi) for more details.

If you have the hubble installed from source, you can use the built in `console`. This will use the grpc APIs

```bash
# Ensure you are in the hubble sub directory
$ cd apps/hubble
# Remove `--insecure` if the host is using TLS
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

For more details on the GRPC API, see the [grpc api reference](/reference/hubble/grpcapi/grpcapi).
