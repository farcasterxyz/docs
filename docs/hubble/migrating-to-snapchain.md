# Migrating to snapchain 
[Snapchain](https://github.com/farcasterxyz/snapchain) is a more scalable implementation of the Farcaster protocol. In order to interact with snapchain, you can operate your own read node. 


### Running a read node
```bash
git clone git@github.com:farcasterxyz/snapchain.git
cd snapchain
docker compose -f docker-compose.mainnet.yml up snap_read
```

## Reading from snapchain
Read APIs are fully backwards compatible with hubs so no migration is required. Refer to [existing docs](https://docs.farcaster.xyz/developers/guides/querying/fetch-casts) for reading data via the client library.

For now, the Farcaster team runs some validator ndoes that are open for reads.

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
In order to write to snapchain, you should run a read node and submit directly to it. Refer to [existing docs](https://docs.farcaster.xyz/developers/guides/writing/submit-messages) for writing dia via the client library. 

### Gotchas
- Existing write APIs should all work. If you're not using the builders from the `hub-nodejs` library, you should make sure to populate `dataBytes` instead of `data` in every message. 
- Some of the error messages returned from `submitMessage` are different in Snapchain than in Hubs. 
- Snapchain submits are best-effort. It's possible that `submitMessage` succeeds but the message is not sequenced into a block. 