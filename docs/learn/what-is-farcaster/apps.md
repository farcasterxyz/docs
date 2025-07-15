# Apps

Using Farcaster requires an Ethereum wallet to register your account and UI to browse the network. If you are new, we recommend starting with the official Farcaster client on [iOS](https://apps.apple.com/us/app/warpcast/id1600555445) or [Android](https://play.google.com/store/apps/details?id=com.farcaster.mobile&hl=en_US&gl=US)

There are two kinds of apps:

1. **Wallet App** - allows signing up, adding connected apps, posting and browsing messages.
2. **Connected App** - allows posting and browsing messages only.

## Wallet Apps

Users must install a wallet app to get started with Farcaster. They can take onchain and offchain actions like signing up, adding connected apps, posting messages and users.

A wallet app controls the Ethereum address that owns the account. It has control over the account and can take any action on your behalf, so only use a wallet app that you trust.

### Farcaster client

The Farcaster client is a wallet app developed by the Farcaster team. It has a web and mobile app, though signing up is only available on mobile.

- Download: [iOS](https://apps.apple.com/us/app/warpcast/id1600555445), [Android](https://play.google.com/store/apps/details?id=com.farcaster.mobile&hl=en_US&gl=US)

## Connected Apps

Connected apps can only be added once a user signs up with a wallet app. They can take offchain actions on Farcaster like writing casts, following accounts and browsing.

A connected app controls an app key granted by the wallet app. Users can add many connected apps to their account and remove them at any time. A malicious connected app cannot take control of your account and any actions it takes can be reversed by your wallet app.

Some popular connected apps include:

- [Supercast](https://supercast.xyz/)
- [Yup](https://yup.io/)
- [Farcord](https://farcord.com/)

**Connected apps are not reviewed by Farcaster, use them at your own risk**

## Resources

### Tools

- [Snapchain](https://snapchain.farcaster.xyz/) - a node for reading and writing messages.
- [Replicator](https://github.com/farcasterxyz/hub-monorepo/tree/main/apps/replicator) - a tool to sync a hub to a postgres database.

### Tutorials

- [Set up snapchain](https://snapchain.farcaster.xyz/guides/running-a-node) - run a snapchain node.
- [Set up replicator](https://snapchain.farcaster.xyz/guides/syncing-to-db) - sync a hub to postgres for easy querying.
- [Schema for replication](../../reference/replicator/schema) - schema for a replicator's postgres tables.

### Services

- [Neynar](https://neynar.com/) - infrastructure and services for building farcaster apps.
