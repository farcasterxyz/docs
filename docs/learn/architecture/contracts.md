# Contracts

A Farcaster account is managed and secured onchain using the Farcaster contracts. This section provides a high level overview and avoids some implementation details. For the full picture, see the [contracts repository](https://github.com/farcasterxyz/contracts/).

<br>

There are three main contracts deployed on OP Mainnet:

- **Id Registry** - creates new accounts
- **Storage Registry** - rents storage to accounts
- **Key Registry** - adds and removes app keys from accounts

<br>

![Registry Contracts](/assets/registry-contracts.png)


The contracts are deployed at the following addresses:

| Contract        | Address                                                                                                                          |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| IdRegistry      | [0x00000000fc6c5f01fc30151999387bb99a9f489b](https://optimistic.etherscan.io/address/0x00000000fc6c5f01fc30151999387bb99a9f489b) |
| StorageRegistry | [0x00000000fcce7f938e7ae6d3c335bd6a1a7c593d](https://optimistic.etherscan.io/address/0x00000000fcce7f938e7ae6d3c335bd6a1a7c593d) |
| KeyRegistry     | [0x00000000fc1237824fb747abde0ff18990e59b7e](https://optimistic.etherscan.io/address/0x00000000fc1237824fb747abde0ff18990e59b7e) |





### Id Registry

The IdRegistry lets users register, transfer and recover Farcaster accounts. An account is identified by a unique number (the fid) which is assigned to an Ethereum address on registration. An Ethereum address may only own one account at a time, though it may transfer it freely to other accounts. It may also specify a recovery address which can transfer the account at any time.

### Storage Registry

The Storage Registry lets accounts rent [storage](../what-is-farcaster/messages.md#storage) by making a payment in Ethereum. The storage prices are set by admins in USD and converted to ETH using a Chainlink oracle. The price increases or decreases based on supply and demand.

### Key Registry

They Key Registry lets accounts issue keys to apps, so that they can publish messages on their behalf. Keys can be added or removed at any time. To add a key, an account must submit the public key of an EdDSA key pair along with a requestor signature. The requestor can be the account itself or an app that wants to operate on its behalf.
