# What is Farcaster?

Farcaster is a protocol for building decentralized social apps.

It is
a [sufficiently decentralized](https://www.varunsrinivasan.com/2022/01/11/sufficient-decentralization-for-social-networks)
protocol where users control their data, and developers can build apps permissionlessly on the network.

![High Level Overview](/assets/high-level.png)

## Identity layer

A farcaster account is a unique number (called fid) that's owned by an ethereum address. Each account must have one or
more public keys (called signers) registered to it in order to submit messages to the network. The idenity layer is
designed to be permission-less and censorship resistant. It's managed by smart contracts that live on Optimism.

## Data layer

All other data is stored on a publicly accessible p2p network of farcaster hubs. Hubs validate the messages conform to
the protocol and store them. Hubs use CRDTs to converge to the same state everywhere.
Hubs are permission-less and can be run by anyone.

## Application layer

Applications are built on top of hubs and determine how to interpret data from and submit data to the hubs.

## Users

Users interact with the network through one or more applications by grant them permissions to read, write and manage
their farcaster accounts. 