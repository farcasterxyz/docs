# Architecture 

A decentralized social network has many requirements that are difficult to meet in a single system. Users must be able to create, own and transfer accounts in a decentralized manner. Messages they create must propagate in near real-time and are often issued at high volumes. Meeting these goals is only possible using a hybrid architecture that mixes onchain and offchain systems.

Onchain contracts are used for infrequent actions where consistency and decentralization are important. Accounts, usernames, storage and keys are managed using a series of contracts on Ethereum-based blockchains. 

Offchain systems are used for frequent actions where performance is critical. Messages created by user accounts are stored and propagated on a p2p network of Farcaster hubs. Unlike blockchains, the network uses an eventually consistent model which allows fast propagation of messages in exchange for a weaker consistency model. 

## Contracts

### Id Registry

The IdRegistry issues fids to addresses known as custody addresses. An fid is a unique numeric identifier  owned by an address. They are issued sequentially starting from 1. An address can only own one fid at a time, but fids can be transferred between addresses. Accounts can specify a recovery address which can transfer their fid at any time. This can be assigned to a user's primary wallet, a multi-sig or a recovery service.  

The contract is non-upgradeable and there is no way to revoke an fid once issued. There is a trusted period during which only the Farcaster team can register fids. Once this period has ends, registration is open to everyone permanently. 

### Storage Registry

The StorageRegistry manages the price of storage and tracks how much storage each account has. Accounts must pay the price to acquire a storage unit. The price is denominated in USD but must be paid in ETH. A Chainlink oracle is used to calculate the exchange rate which is updated at most once in 24 hours.

The protocol defines a maximum number of available storage units which is enforced by the contract. This ensures that the network does not grow so quickly that Hubs are unable to add storage. The value can be changed through governance as usage increases. 

The contract is non-upgradeable but is intended to only last a year, after which it is replaced by a newly deployed contract. Farcaster admins can set the exchange rate, price and modify the available units of storage at any time.

### Key Registry

The Key Registry lets accounts register cryptographic public keys for different purposes. An account can make a transaction to add or remove a key at any time. The registry checks that the key is valid and adds it to the account. Once removed, a key cannot be added back to the same account. There is no restriction on adding the same key to multiple accounts.

#### Signed Key

A signed key is an Ed25519 public key which is used as an account's message signer. The key must be signed by a requestor, which is the account that requested the key. This is usually the account of the app that the user is using, but might also be the user's own account if they are self-hosting.   

### Deployments

| Contract                  | Address                                                                                                                          |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| IdRegistry                | [0x00000000fcaf86937e41ba038b4fa40baa4b780a](https://optimistic.etherscan.io/address/0x00000000fcaf86937e41ba038b4fa40baa4b780a) |
| StorageRegistry           | [0x00000000fcce7f938e7ae6d3c335bd6a1a7c593d](https://optimistic.etherscan.io/address/0x00000000fcce7f938e7ae6d3c335bd6a1a7c593d) |
| KeyRegistry               | [0x00000000fc9e66f1c6d86d750b4af47ff0cc343d](https://optimistic.etherscan.io/address/0x00000000fc9e66f1c6d86d750b4af47ff0cc343d) |

For more details and documentation, please see the [contracts repository](https://github.com/farcasterxyz/contracts/).

## Hubs 

A Hub is a server that validates, stores and replicates messages to other hubs. It is conceptually similar to an Ethereum node, giving apps real-time access to read and write to the network. The hub is a low-level, high performance building block with a simple API. For most common use cases, app devs will need to proxy messages into database that can handle indexing and querying. 

Hubs can run on laptops or commodity cloud hardware. The protocol defines a minimum number of storage units which is specified in the Storage Registry. Hubs must store all valid messages created and paid for by users or they will be disconnected from the network. This limit can be changed periodically through governance.

Unlike cryptocurrency nodes, hubs are only eventually consistent which means that they do not receive messages in the exact order in which they were created. This makes it significantly faster and simple to transmit messages, which is important for a social network. The downside is that there is more complexity when interpreting received messages since they may arrive out of order.   

### Validation

Hubs keep track of the Key Registry and Id Registry contracts so that they know which signers correspond to which accounts. When a message is received, it is hashed and its signature is compared against the one provided. Some messages also have additional validation rules which are then applied, and any invalid messages are rejected immediately. 

### Storage

Hubs track the Storage Registry so that they know how much storage each account has. If adding a message would exceed an account's limit, the Hubs apply conflict resolution rules to determine which message must be discarded. Typically, this is the earliest message though each message type has its own rules. The rules of conflict resolution are designed such that each message's data set is a conflict-free replicated data type.

### Replication 

Messages added to a hub are immediately propagated to all other hubs over gossip. The network uses libp2p, a simple TCP-based gossip protocol. Since the network is eventually consistent and each message set is a delta-state crdt, messages can be sent and received individually without causing any conflicts. 

Hubs also have an out-of-band process called diff sync that runs periodically. Each hub maintains a merkle trie of all valid messages and compares its trie to that of a random peer. Any unknown messages are fetched from the peer and merged into the hub. Diff sync is used to recover from network failures or to help a newly provisioned hu catch up with the current state of the network. 

Hubs are not tolerant of peers that are dysfunctional or malicious. If a peer fails to accept valid messages, keeps falling behind the network or replicates messages at abnormal rates, its score is lowered and it is ignored for exponentially longer periods by its peers.

### Implementations

- [Hubble](https://www.thehubble.xyz) - a Hub implementation in Typescript and Rust