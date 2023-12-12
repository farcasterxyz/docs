# Setting up and Connecting to Hubble

See [hubble installation](/hubble/install.html) for more information on how to set up a local hubble instance.

Once the hub is running, verify that you can query it by querying the http api:

```bash
# Default http port is 2281
$ curl http://localhost:2281/v1/info
{"version":"1.8.0","isSyncing":false,"rootHash":"ae1c08c9bcadcae24fb4bad25ff7f74957959438",...}%
```

For more details on the HTTP API, see the [http api reference](/reference/hubble/httpapi/httpapi).

Or, if you have the hubble installed from source, you can use the built in `console`. This will use the grpc APIs

```bash
# Ensure you are in the hubble sub directory
$ cd apps/hubble
# Remove `--insecure` if the host is using TLS
$ yarn console --insecure -s localhost:2283
> res = await rpcClient.getInfo({dbStats: true})
Ok {
  value: {
    version: '1.8.0',
    isSyncing: false,
    rootHash: 'ae1c08c9bcadcae24fb4bad25ff7f74957959438',
    ...
  }
}
```

For more details on the GRPC API, see the [grpc api reference](/reference/hubble/grpcapi/grpcapi).
 