# Migrating to snapchain 
[Snapchain](https://github.com/farcasterxyz/snapchain) is a more scalable implementation of the Farcaster protocol. In order to interact with snapchain, you can operate your own read node or read directly from a node operated by the Farcaster team. 


## Reading from snapchain
Read APIs are fully backwards compatible with hubs so no migration is required. 

The Farcaster team runs some validator ndoes that are open for reads.

```bash
url: juno.farcaster.xyz
httpapi_port: 3381
grpc_port: 13383
```

Via http
```bash
curl juno.farcaster.xyz:3381/v1/info
```

Via grpc
```bash
git clone git@github.com:farcasterxyz/snapchain.git
cd snapchain
grpcurl -plaintext -proto src/proto/rpc.proto -import-path src/proto juno.farcaster.xyz:13383 HubService/GetInfo
```


## Writing to snapchain
In order to write to snapchain, you should run a read node and submit to your read node. 

```bash
git clone git@github.com:farcasterxyz/snapchain.git
cd snapchain
docker compose -f docker-compose.mainnet.yml up snap_read
```

Existing write APIs should all work. If you're not using the builders from the `hub-nodejs` library, you should make sure to populate `dataBytes` instead of `data` in every message. 

## Public instances

