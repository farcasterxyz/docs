# Hubs

A Hub is a node in the Farcaster network that stores a copy of all data.

Hubs accept messages from users and replicate them to each other in real-time in a peer-to-peer fashion. A Hub will store every active message on the network and can be used to submit new messages. Running a Hub is a great way to get permissionless access to data and to help with decentralizing the network.

## Running a Hub

A Hub is a specification that can be implemented in different ways, just like Ethereum or Bitcoin nodes. To run a Hub, you'll need to choose an implementation first. The available implementations are:

- [Hubble](https://github.com/farcasterxyz/hub-monorepo/tree/main/apps/hubble), a Typescript implementation

We recommend running Hubs on an always-on server so that it stays in sync even when you are not using your computer.

## Requirements

A Hub can be run on any machine that has:

- A public IP address
- 8 GB of RAM
- 2 CPU cores or vCPUs
- 20 GB of free storage
- Access to an Ethereum Goerli node via an RPC URL

The storage requirements will grow over time as more users join the network. At 10M daily active users we expect storage to approach 64TB.

:::info
These requirements are suggested and less RAM and storage may be functionally operational.
:::
