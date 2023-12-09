# Architecture

A Hub is a single-process daemon that receives data from clients, other hubs and farcaster contracts. It has four main
components:

- Storage Engine - checks message validity, persists them to disk and emits events.
- P2P Engine - establishes a gossipsub network to exchange messages with hubs.
- Sync Engine - handles edge cases when gossip fails to deliver messages.
- RPC Servers - provides APIs to read and write data to the hub

### Storage Engine

Messages received by Hubble are forwarded to the Storage engine which forwards them to the appropriate CRDT Set. Once
validated by the CRDT Set, messages are persisted to [RocksDB](https://github.com/facebook/rocksdb) and events are
emitted to listeners.

CRDT sets are implemented to meet the specification in the Farcaster protocol. The engine also tracks state of the
Farcaster contracts, which are necessary for validating the Signer CRDT Set.

### P2P Engine

Hubble connects to other peers over a GossipSub network established using [LibP2P](https://github.com/libp2p/libp2p).
Messages merged into the Storage Engine are immediately gossiped to all of is peers.

Hubble will only peer with trusted peers and employs a simple network topology during beta. It peers only with known
instances which must be configured at startup. In later releases, the network topology will be modified to operate
closer to a trustless mesh.

### Sync Engine

Hubble periodically performs a [diff sync](https://github.com/farcasterxyz/protocol#41-synchronization) with other peers
to discover messages that may have been dropped during gossip. This is performed using gRPC APIs exposed by each Hub
instance.

### RPC Servers

Hubble exposes a gRPC and HTTP API for reading and writing data to the hub. The primary way to write data to the
farcaster network is to call `submitMessage` on a hub. The hub will validate the message, and if it conforms to the
protocol, will store the message in the appropriate CRDT set and gossip it to other peers. The hub also exposes other
APIs to read the state of its sets.
