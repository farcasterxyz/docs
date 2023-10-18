# Architecture 

A decentralized social network has many requirements that are difficult to meet in a single system. Users must be able to create, own, and transfer accounts in a decentralized manner. Messages they create must propagate in near real-time and are often issued at high volumes. Meeting these goals is only possible using a hybrid architecture that mixes onchain and offchain systems.

Onchain contracts are used for infrequent actions where consistency and decentralization are important. Accounts, usernames, storage, and keys are managed using a series of Ethereum contracts. 

Offchain systems are used for frequent actions where performance is critical. Messages created by user accounts are stored and propagated on a p2p network of Farcaster hubs. Unlike blockchains, the network uses an eventually consistent model which allows fast message propagation in exchange for a weaker consistency model. 

![Architecture](../assets/architecture.png)

## Registry Contracts

Registry contracts on Optimism Mainnet manage account identities, signers, and storage. There are three primary contracts: 

- **Id Registry** - issues fids to create new accounts
- **Storage Registry** - tracks how much storage each account has
- **Key Registry** - lets accounts register message signers 

The contracts are designed to be simple, non-upgradeable, and have a limited lifespan. The contracts are deployed in a trusted mode where only Farcaster can register new accounts. After a testing period, they are made permissionless so that anyone can register an account. This change cannot be undone.

![Registry Contracts](../assets/registry-contracts.png)

### Id Registry

The Id Registry issues new Farcaster accounts to Ethereum addresses. A user can make a transaction to acquire a unique, numeric identifier for the address called a Farcaster ID or fid. An address can hold one fid at a time but can transfer them freely. Accounts may specify a recovery address, which can transfer the fid at any time.

### Storage Registry

The Storage Registry rents out storage units to accounts for a yearly fee. Accounts must have at least one storage unit to publish messages on Farcaster. Storage prices are set by the contract in USD but must be paid in ETH. A Chainlink oracle determines the exchange rate which is updated at most once in 24 hours. The price, exchange rate, available units and size of each unit are controlled by Farcaster and vary based on supply and demand. 

### Key Registry

The Key Registry lets accounts register a signer that can write messages on their behalf. Signers can be added or removed at any time, though they cannot be added back once removed. A signer can be added to multiple accounts. Signers are Ed25519 public keys and must come with a signature from the requestor, which is the account that requested the key. This can be the user's account or that of an app that wants to operate on the user's behalf. 

### Deployments

| Contract                  | Address                                                                                                                          |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| IdRegistry                | [0x00000000fcaf86937e41ba038b4fa40baa4b780a](https://optimistic.etherscan.io/address/0x00000000fcaf86937e41ba038b4fa40baa4b780a) |
| StorageRegistry           | [0x00000000fcce7f938e7ae6d3c335bd6a1a7c593d](https://optimistic.etherscan.io/address/0x00000000fcce7f938e7ae6d3c335bd6a1a7c593d) |
| KeyRegistry               | [0x00000000fc9e66f1c6d86d750b4af47ff0cc343d](https://optimistic.etherscan.io/address/0x00000000fc9e66f1c6d86d750b4af47ff0cc343d) |

For more details and documentation, please see the [contracts repository](https://github.com/farcasterxyz/contracts/).

## Hubs 

Hubs validate, store, and replicate account messages to other hubs. Apps run hubs to read and write to Farcaster in real-time. Hubs run on commodity hardware and are conceptually like low-level, high-performance data streams. Most apps should copy hub data into a database for easy indexing and querying. 

Each hub stores the entire global state, i.e. all messages created by every account on the network. The Storage Registry's max storage unit limit ensures that the size of the global state is bounded. Unlike Ethereum nodes, hubs are eventually consistent and may get messages out of order. This makes reading and writing very fast at the cost of more complexity when interpreting changes.

![Hub](../assets/hub.png)

### Validation

When a message is received, it is hashed, and its signature is compared against the Id Registry and Key Registry contracts. Messages also specify additional validation rules, which are checked by hubs before they are merged. 

### Storage

When a message is validated, it is stored in a message set. Each message type has a set which defines rules for merging messages and handling cases where the number of messages exceeds the user's limits. Typically, the earliest message ends up discarded. The rules designed so that messages added in any order will always produce the same set.

### Replication 

When a message is stored, it is sent to other hubs over a libp2p gossip mesh. Messages that do not arrive over gossip are fetched using diff sync, a periodic out-of-band process. Diff sync compares the merkle trie of messages ids between two hubs and fetches missing messages. Hubs monitor peers and score their behavior. If a peer doesn't accept valid messages, falls behind or gossips too much, it may be ignored by its peers.

### Implementations

- [Hubble](https://www.thehubble.xyz) - a Hub implementation in Typescript and Rust

## Usernames

Users can associate ENS names with their accounts making it easy for others to mention them in messages. Names must be less than 16 characters and only contain lowercase alphabets, numbers or hyphens to prevent homoglyph attacks. 

Farcaster supports two kinds of ENS names today:

- [**fnames**](./fnames.md), which are free and governed by farcaster.
- **.eth names**, which cost money and are user-controlled.

![Usernames](../assets/usernames.png)
