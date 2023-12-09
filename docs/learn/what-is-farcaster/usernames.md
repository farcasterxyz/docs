# Usernames

A Farcaster account needs a username so it can be found and mentioned by other users. Farcaster uses the [Ethereum Name Service](https://ens.domains/) to manage usernames.

ENS usernames are owned by Ethereum addresses, just like Farcaster accounts. The difference is that an address can own multiple ENS names, so the Farcaster account must always specify the name it wishes to use. Names must be less than 17 characters with only lowercase alphabets, numbers or hyphens to prevent homoglyph attacks.

## Changing usernames

A Farcaster account can change between different usernames at any time. Changing names does not affect your history or your followers.

It's safe to change your name a few times a year. But changing your name more often may cause users or apps to lose trust in your account. If you want to change a public indicator, consider changing your display name instead.

## Offchain vs Onchain Names

An account can choose between two kinds of usernames:

- **Offchain ENS Names**: free and controlled by farcaster. (e.g. @alice)
- **Onchain ENS Names**: costs money and controlled by your wallet. (e.g. @alice.eth)

Choose an offchain ENS name if you want to get started quickly and don't have an onchain ENS name. An account can always upgrade to an onchain name later. It's recommended to use an app like Warpcast to set this up for you.

![Usernames](/assets/usernames.png)

### Offchain ENS Names

- Offchain ENS names, also called fnames, are free and issued by Farcaster.
- Any Ethereum account can get one unique fname by calling the [Fname Registry](/learn/architecture/ens-names).
- Fnames are free but they can be revoked by Farcaster at any time.

### Onchain ENS fnames

- Onchain ENS names, also called .eth names, are onchain and issued by ENS.
- Any Ethereum account can get an ENS by calling the [ENS Registry](https://docs.ens.domains/dapp-developer-guide/the-ens-registry).
- Names are not free but they cannot be revoked by Farcaster.
