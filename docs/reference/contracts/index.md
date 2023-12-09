# Overview

Farcaster contracts are deployed on Optimism, and Ethereum layer 2 network. There are three core contracts,
ID registry, Key Registry and Storage Registry. Write access to the ID and Key registry is gated through the Gateway
contracts. There is also a Bundler helper contract to make it easy to register an fid, add a key and rent storage in one
transaction.

![contracts.png](/assets/contracts.png)

## ID Registry

The ID registry contract is used to keep track of Farcaster IDs. It maps a farcaster id to an owning ethereum
address. The owner can also designate a "recovery address" which can be used to recover the fid if the owner loses
access to the registering address. Registering an fid for the first time must be done through
the [IdGateway](#idgateway)

## Key Registry

The Key registry associates a farcaster id to zero or more ed2559 public keys. Only messages signed by a key registered
here are considered valid by the hubs. Registered keys can be revoked by the owner of the fid, but revoked keys can not
be added to that fid again. The same key may be registered to multiple fids. Adding a key must be done through the
[KeyGateway](#keygateway)

## Storage Registry

The Storage registry allows an fid to rent one or more "units" of storage on the farcaster network. The current cost of
storage is 7$ USD per unit, for one year. This fee must be paid in eth. The storage registry uses an eth price oracle to
determine the current cost in eth and exposes functions to query this price. Overpayments are refunded to the caller.

## IdGateway

The IdGateway handles additional logic required for first time registration of an fid. Currently, to prevent spam the
gateway also requires renting 1 unit of storage.

## KeyGateway

Similarly, the KeyGateway exists for the KeyRegistry. Adding a key to a fid must be done via the gateway.

## Bundler

The bundler makes first time sign up easier by allowing a user to register an fid, add a key and rent storage in one
function call.

## Deployment Addresses

| Contract         | Optimism Address                             | Etherscan Link                                                                             |
|------------------|----------------------------------------------|--------------------------------------------------------------------------------------------|
| Id Registry      | `0x00000000fc6c5f01fc30151999387bb99a9f489b` | [link](https://optimistic.etherscan.io/address/0x00000000fc6c5f01fc30151999387bb99a9f489b) |
| Key Registry     | `0x00000000Fc1237824fb747aBDE0FF18990E59b7e` | [link](https://optimistic.etherscan.io/address/0x00000000Fc1237824fb747aBDE0FF18990E59b7e) |
| Storage Registry | `0x00000000fcCe7f938e7aE6D3c335bD6a1a7c593D` | [link](https://optimistic.etherscan.io/address/0x00000000fcCe7f938e7aE6D3c335bD6a1a7c593D) |
| IdGateway        | `0x00000000fc25870c6ed6b6c7e41fb078b7656f69` | [link](https://optimistic.etherscan.io/address/0x00000000fc25870c6ed6b6c7e41fb078b7656f69) |
| KeyGateway       | `0x00000000fc56947c7e7183f8ca4b62398caadf0b` | [link](https://optimistic.etherscan.io/address/0x00000000fc56947c7e7183f8ca4b62398caadf0b) |
| Bundler          | `0x00000000fc04c910a0b5fea33b03e0447ad0b0aa` | [link](https://optimistic.etherscan.io/address/0x00000000fc04c910a0b5fea33b03e0447ad0b0aa) |

## ABIs

The ABIs for the contracts are available via etherscan links above, or in
the [hub-monorepo](https://github.com/farcasterxyz/hub-monorepo/tree/main/packages/core/src/eth/contracts/abis)

## Repo

The contracts repo can be found [here](https://github.com/farcasterxyz/contracts), including more low level
documentation [here](https://github.com/farcasterxyz/contracts/blob/main/docs/docs.md)