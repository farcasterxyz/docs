# Hubs

Hubs validate, store, and replicate account messages to other hubs. Apps run hubs to read and write to Farcaster in
real-time. Hubs run on commodity hardware and are conceptually like low-level, high-performance data streams. Most apps
should copy hub data into a database for easy indexing and querying.

Each hub stores the entire global state, i.e. all messages created by every account on the network. The Storage
Registry's max storage unit limit ensures that the size of the global state is bounded. Unlike Ethereum nodes, hubs are
eventually consistent and may get messages out of order. This makes reading and writing very fast at the cost of more
complexity when interpreting changes.

![Hub](/assets/hub.png)

### Validation

When a message is received, it is hashed, and its signature is compared against the Id Registry and Key Registry
contracts. Messages also specify additional validation rules, which are checked by hubs before they are merged.

### Storage

When a message is validated, it is stored in a message set. Each message type has a set which defines rules for merging
messages and handling cases where the number of messages exceeds the user's limits. Typically, the earliest message ends
up discarded. The rules are designed so that messages added in any order will always produce the same set.

### Replication

When a message is stored, it is sent to other hubs over a libp2p gossip mesh. Messages that do not arrive over gossip
are fetched using diff sync, a periodic out-of-band process. Diff sync compares the merkle tree of message ids between
two hubs and fetches any missing messages. Hubs monitor peers and score their behavior. If a peer doesn't accept valid
messages, falls behind, or gossips too much it may be ignored by its peers.

### Implementations

- [Hubble](https://www.thehubble.xyz) - a Hub implementation in Typescript and Rust
