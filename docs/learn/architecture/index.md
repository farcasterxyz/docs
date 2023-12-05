# Architecture

A decentralized social network has many requirements that are difficult to meet in a single system. Users must be able
to create, own, and transfer accounts in a decentralized manner. Messages they create must propagate in near real-time
and are often issued at high volumes. Meeting these goals is only possible using a hybrid architecture that mixes
onchain and offchain systems.

Onchain contracts are used for infrequent actions where consistency and decentralization are important. Accounts,
usernames, storage, and keys are managed using a series of Ethereum contracts.

Offchain systems are used for frequent actions where performance is critical. Messages created by user accounts are
stored and propagated on a p2p network of Farcaster hubs. Unlike blockchains, the network uses an eventually consistent
model which allows fast message propagation in exchange for a weaker consistency model.

![Architecture](/assets/architecture.png)

