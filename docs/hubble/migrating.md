# Migrating to snapchain

[Snapchain](https://github.com/farcasterxyz/snapchain) is a more scalable implementation of the Farcaster protocol. In order to interact with snapchain, you can operate your own read node.

## Running a node

```bash
mkdir snapchain
wget https://raw.githubusercontent.com/farcasterxyz/snapchain/refs/heads/main/docker-compose.mainnet.yml -O docker-compose.yml
docker compose up # -d to run in the background
```

Note, the default http port is `3381`, the default gossip port is `3382` and the default grpc port is `3383`. You may need to open these ports.

## Reading from snapchain

Read APIs are fully backwards compatible with hubs so no migration is required. Refer to [existing docs](https://docs.farcaster.xyz/developers/guides/querying/fetch-casts) for reading data via the client library.

Via http once you have a node running

```bash
curl http://locaalhost:3381/v1/info
```

Via grpc

```bash
git clone git@github.com:farcasterxyz/snapchain.git
cd snapchain
grpcurl -plaintext -proto src/proto/rpc.proto -import-path src/proto localhost:3383 HubService/GetInfo
```

If you are using Shuttle, it will work the same as before. Just need to point it to the snapchain node.

## Writing to snapchain

The write APIs are also backwards compatible with hubs, with some caveats (see below).

In order to write to snapchain, you should run a node and submit directly to it. Refer to [existing docs](https://docs.farcaster.xyz/developers/guides/writing/submit-messages) for writing dia via the client library. Note, you **MUST** use version `0.16` or later of the `hub-nodejs` library.

### Gotchas

- If you're not using the builders from the `hub-nodejs` library, you should make sure to populate `dataBytes` instead of `data` in every message, like so:

  ```ts
  if (message.dataBytes === undefined) {
    message.dataBytes = protobufs.MessageData.encode(message.data).finish();
    message.data = undefined;
  }
  ```

- Some of the error messages returned from `submitMessage` are different in Snapchain than in Hubs.
- Snapchain submits are best-effort. It's possible that `submitMessage` succeeds but the message is not included into a block. Follow [this issue](https://github.com/farcasterxyz/snapchain/issues/353) on the plan for providing feedback to clients when a message accepted into the mempool is not able to be included in a block.

## Testnet

There is a testnet for snapchain, you can run a node against it by using this docker compose file:

```bash
mkdir snap_test
wget https://raw.githubusercontent.com/farcasterxyz/snapchain/refs/heads/main/docker-compose.testnet.yml -O docker-compose.yml
docker compose up # -d to run in the background
```

Note, testnet is unstable and will be reset from time to time.
