# Overview

Farcaster contracts are deployed on Optimism, an Ethereum layer 2 network. There are three core contracts:
ID registry, Key Registry, and Storage Registry. Write access to the ID and Key registry is gated through the Gateway
contracts. There is also a Bundler helper contract to make it easy to register an fid, add a key and rent storage in one
transaction.

![contracts.png](/assets/contracts.png)

## ID Registry

The ID Registry contract is used to keep track of Farcaster IDs. It maps an fid to an owning Ethereum
address. The owner can also designate a "recovery address" which can be used to recover the fid if the owner loses
access to the registering address. Registering an fid for the first time must be done through
the [ID Gateway](#idgateway).

## Key Registry

The Key Registry associates a Farcaster id to zero or more ed2559 public keys. Only messages signed by a key registered
here are considered valid by the hubs. Registered keys can be revoked by the owner of the fid, but revoked keys can not
be added to that fid again. The same key may be registered to multiple fids. Adding a key must be done through the
[Key Gateway](#keygateway).

## Storage Registry

The Storage Registry allows an fid to rent one or more "units" of storage on the farcaster network. The current cost of
storage is 7$ USD per unit, for one year. This fee must be paid in ETH. The storage registry uses an ETH price oracle to
determine the current cost in ETH and exposes functions to query this price. Overpayments are refunded to the caller.

## IdGateway

The ID Gateway handles additional logic required for first time registration of an fid. To prevent spam, the
gateway also requires renting 1 unit of storage.

## KeyGateway

Similarly, the Key Gateway exists for the Key Registry. Adding a key to a fid must be done via the gateway.

## Bundler

The Bundler makes first time sign up easier by allowing a user to register an fid, add a key and rent storage in one
function call.

## Source code

The contracts source repo can be found [here](https://github.com/farcasterxyz/contracts), including more low level
documentation [here](https://github.com/farcasterxyz/contracts/blob/main/docs/docs.md).
