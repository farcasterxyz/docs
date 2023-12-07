# Architecture

Farcaster has a hybrid architecture that stores identity onchain and data offchain.


![Architecture](/assets/architecture.png)

## Onchain 

Farcaster's onchain systems are implemented as [contracts on OP Mainnet](./contracts.md). Only a handful of actions are performed onchain, including: 

- Creating an account. 
- Paying rent to store data on offchain systems. 
- Authorizing light apps for an account. 

Actions are performed onchain only when security and consistency are critical. Use of onchain actions is kept at a minimum to reduce costs and improve performance.

## Offchain 

Farcaster's offchain system is a peer-to-peer network of servers called [Hubs](./hubs.md) which store user data. The majority of user actions are performed offchain.  These include: 

- Posting a new public message.
- Following another user. 
- Reacting to a post. 
- Updating your profile picture. 

Actions are performed offchain when performance and cost are critical. Use of offchain actions is typically preferred when consistency isn't a strict requirement. Offchain systems achieve security by relying on signatures from onchain systems.

