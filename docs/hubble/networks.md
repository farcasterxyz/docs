# Networks

A Farcaster account must choose which network it posts its messages to. Any account registered in the [contracts](../learn/architecture/contracts.md) can post to any network. But messages posted in one network are not visible in any other network. 

There are two main networks:

* **Mainnet** - the stable version that everyone uses 
* **Testnet**-  the latest beta release intended for developers 

When  [installing your hub](./install.md), you'll need to choose a network to connect to. 

## Testnet

Testnet is a sandbox environment for developers to test new features. Dummy messages are broadcast every 10 seconds to simulate activity.  


Set the following variables in your .env file in `apps/hubble`:

```sh

FC_NETWORK_ID=2
BOOTSTRAP_NODE=/dns/testnet1.farcaster.xyz/tcp/2282
```
## Mainnet

Mainnet is the production environment that everyone uses. 

Set the following variables in your .env file in `apps/hubble`:

```sh
FC_NETWORK_ID=1
BOOTSTRAP_NODE=/dns/nemes.farcaster.xyz/tcp/2282
```
