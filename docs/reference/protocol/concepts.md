# Concepts

There are five main building blocks in the protocol:

- **Accounts**, which represent users on the network
- **Usernames**, which point to accounts
- **Signers**, which post messages on an account's behalf
- **Messages**, which represent public updates by accounts
- **Storage**, which must be rented by accounts to publish messages

## Accounts

A Farcaster account represents a distinct entity on the network. Each account has a Farcaster ID or fid, a unique numeric identifier like `78213`. Identities are issued and managed onchain using an Ethereum contract called the IdRegistry.

Users make a transaction to the IdRegistry to get a new fid. The address that owns the fid is known as the user's custody address. The IdRegistry ensures that fids can be transferred between addresses and that no two addresses have the same fid.

## Usernames

A username can be used to identify or mention an account. Users can connect multiple names to an account, but only one can be active. Farcaster supports ENS names that are issued onchain or offchain.

Farcaster operates its own offchain namespace under `fcast.id`. Every Farcaster account can claim one free name. Users may also use names from other ENS namespaces like `.eth`. A signed proof must be submitted to the network to claim a username.

## Signers

A Signer is a cryptographic key pair used to sign messages. Each account can have multiple account keys, which is helpful if you want to share account ownership or use many apps simultaneously. Farcaster manages account keys onchain using a KeyRegistry contract.

Signers are [Ed25519 keys](https://en.wikipedia.org/wiki/EdDSA#Ed25519) that are generated offchain. An account registers a signer by making a transaction to the KeyRegistry with the signer's public key. The private key can then be used to sign and publish messages to the network.

## Messages

Messages are public updates to Farcaster. Updates can be making a post, following someone, or adding a profile picture. The network supports many message types, and each has its own properties, requirements, and semantics. Messages are stored entirely offchain on Farcaster Hubs.

A message is encoded as a [protobuf](https://protobuf.dev/) and must be hashed and signed by the account's signer. Users can publish messages to Hubs as long as they have sufficient storage. Hubs check the validity of each message's account keys before accepting them.

## Storage

Storage gives an account the right to publish messages to the network. It is rented by paying a yearly fee, similar to how space is rented on a web server. Storage is managed and tracked onchain by the StorageRegistry contract.

Storage is measured in units, and one unit grants an account the right to store a certain number of messages. Anyone can pay the StorageRegistry to rent a storage unit for an account. The price and size of each storage unit will vary according to supply and demand.
