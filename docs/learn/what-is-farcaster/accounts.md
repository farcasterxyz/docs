# Accounts

A Farcaster account lets you set up a username, profile picture and publish short text messages known as casts. Any Ethereum address can register a Farcaster account by making an onchain transaction.

## Creating an account

A Farcaster account is created by calling the IdGateway contract. It will assign a new Farcaster ID or fid to your Ethereum address.

You'll need to get a username, rent storage and add a key before you can use your account. These steps require many signatures and onchain transactions and can be tedious with a regular Ethereum wallet.

We recommend starting with the [official client](https://www.farcaster.xyz/), developed by the Farcaster team which will handle the entire flow for you. It also uses a separate Ethereum account to sign transactions, so you can keep your main Ethereum account secure.

## Adding account keys

Accounts can issue keys which let apps write messages on their behalf. Users will typically issue a key to each Farcaster app they use.

Keys are managed by the KeyRegistry contract. To add a key, you'll need to submit the public key of an EdDSA key pair along with a requestor signature. The requestor can be the account itself or an app that wants to operate on its behalf.

## Recovering an account

Users often set up separate wallets for their social apps and it's easy to lose access. Farcaster lets any account specify a recovery address which can be used to recover the account. It can be configured when creating the account or anytime after.

Users can set the recovery address to trusted services like the official Farcaster client or they can manage it themselves using a regular Ethereum wallet.

## Resources

### Specifications

- [Contract Specifications](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#1-smart-contracts) - The onchain contracts that manage Farcaster accounts, account keys and recovery addresses.

### APIs

- [IdRegistry](../../reference/contracts/reference/id-registry) - Lookup account data onchain.
- [IdGateway](../../reference/contracts/reference/id-gateway) - Create accounts onchain.
- [KeyRegistry](../../reference/contracts/reference/key-registry) - Lookup account key data onchain.
- [KeyGateway](../../reference/contracts/reference/key-gateway) - Create account keys onchain.
- [Get Farcaster Ids](https://snapchain.farcaster.xyz/reference/httpapi/fids) - Fetch a list of all registered account fids from a Snapchain node.
- [Get account keys](https://snapchain.farcaster.xyz/reference/httpapi/onchain#onchainsignersbyfid) - Fetch the account keys (signers) for an account from a Snapchain node.

### Tutorials

- [Create an account](../../developers/guides/accounts/create-account.md) - Create a new account on Farcaster.
- [Create an account key](../../developers/guides/accounts/create-account-key.md) - Create a new account key for your account.
- [Find account by username](../../developers/guides/accounts/find-by-name.md) - Find an account by its username.
- [Change custody address](../../developers/guides/accounts/change-custody.md) - Change the address that owns your account.
- [Change recovery address](../../developers/guides/accounts/change-recovery.md) - Change the address that recovers your account.
- [Find account key requestor](../../developers/guides/advanced/decode-key-metadata.md) - Find the app that the user granted an account key to.
- [Query signups from replicator](../../developers/guides/advanced/query-signups.md) - Query the number of signups from the replicator.
