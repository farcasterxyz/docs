# Usernames

A Farcaster account needs a username so it can be found and mentioned by other users. Farcaster uses the [Ethereum Name Service](https://ens.domains/) to manage usernames.

ENS usernames are owned by Ethereum addresses, just like Farcaster accounts. The difference is that an address can own multiple ENS names, so the Farcaster account must specify the name it wishes to use. Names must be less than 17 characters with only lowercase alphabets, numbers or hyphens to prevent homoglyph attacks.

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

## Resources

### Specifications

- [Farcaster Name](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#5-fname-specifications) - An ENSIP-10 offchain ENS name usable within Farcaster.
- [UserData: Username](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#23-user-data) - Sets a valid Username Proof as the current username.
- [Username Proof](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#17-username-proof) - Proves ownership of an onchain or offchain username.
- [Verifications](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#25-verifications) - Proves ownership of an address, required for onchain Username Proofs.

### APIs

- [UserData API](../../reference/hubble/httpapi/userdata) - Fetch the UserData for a user's current username.
- [Username Proofs API](../../reference/hubble/httpapi/usernameproof) - Fetch a user's Username Proofs from a hub.
- [Verification Proofs API](../../reference/hubble/httpapi/verification) - Fetch a user's Verifications from a hub.
- [Fname Registry API](../../reference/fname/api.md) - Register and track fname ownership programatically.

### Tutorials

- [Get UserData](../../developers/guides/querying/fetch-profile.md) - Get UserData messages from an account.
- [Create UserData](../../developers/guides/writing/messages#user-data) - Create a UserData message to select a valid username.
- [Verify an Address](../../developers/guides/writing/verify-address.md) - Verify ownership of an Ethereum account.
- [Find account by username](../../developers/guides/accounts/find-by-name.md) - Find an account by its username.
- [Change farcaster name](../../developers/guides/accounts/change-fname.md) - Change a farcaster username.
