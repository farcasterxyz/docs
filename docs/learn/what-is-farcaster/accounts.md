# Accounts

A Farcaster account lets you set up a username, profile picture and publish short text messages known as casts. Any Ethereum address an register a Farcaster account by making an onchain transaction. 

## Creating an account

A Farcaster account is created by calling the IdGateway contract. It will assign a new Farcaster ID or fid to your Ethereum address.

You'll need to get a username, rent storage and add a key before you can use your account. These steps require many signatures and onchain transactions and it be can be tedious with a regular Ethereum wallet.

We recommend starting with [Warpcast](https://www.warpcast.com/), a special Farcaster wallet which will handle the entire flow for you. It also uses a separate Ethereum account to sign transactions, so you can keep your main Ethereum account secure.


## Recovering an account

Users often set up separate wallets for their social apps and it's easy to lose access. Farcaster lets any account specify a recovery address which can be used to recover the account. It can be configured when creating the account or anytime after. 

Users can set the recovery address to trusted services like Warpcast or they can manage it themselves using a regular Ethereum wallet.