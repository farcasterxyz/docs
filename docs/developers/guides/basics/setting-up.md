# Connecting to Hubble

::: info Pre-requisites

- Read only access to a hubble instance

:::

See [hubble installation](/hubble/install) for more information on how to set up a local hubble instance.

Once the hub is running, verify that you can query it by querying the http api:

```bash
# Default http port is 2281
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

For more details on the HTTP API, see the [http api reference](/reference/hubble/httpapi/httpapi).

Or, if you have the hubble installed from source, you can use the built in `console`. This will use the grpc APIs

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
```

For more details on the GRPC API, see the [grpc api reference](/reference/hubble/grpcapi/grpcapi).
