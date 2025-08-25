# Architecture

Farcaster has a hybrid architecture that stores identity onchain and data offchain.

![Architecture](../../assets/architecture.png)

## Onchain

Farcaster's onchain systems are implemented as [contracts on OP Mainnet](./contracts.md). Actions are performed onchain only when security and consistency are critical. Use of onchain actions is kept at a minimum to reduce costs and improve performance.

Only a handful of actions are performed onchain, including:

- Creating an [account](../what-is-farcaster/accounts.md).
- Paying rent to [store data](../what-is-farcaster/messages.md#storage).
- Adding account keys for [connected apps](../what-is-farcaster/apps.md#connected-apps).

## Offchain

Farcaster's offchain system is a peer-to-peer network of servers called [Snapchain](https://snapchain.farcaster.xyz/) which store user data. The majority of user actions are performed offchain. These include:

- Posting a new public message.
- Following another user.
- Reacting to a post.
- Updating your profile picture.

Actions are performed offchain when performance and cost are critical. Use of offchain actions is typically preferred when consistency isn't a strict requirement. Offchain systems achieve security by relying on signatures from onchain systems.
