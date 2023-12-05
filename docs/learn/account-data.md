# Account Data

Farcaster requires users to pay a yearly on-going fee to store their messages on the network. This fee is paid to the
Storage Registry contract. The contract keeps track of how many units of storage each account has. 1 unit of storage
currently costs 7$ and provides the user with

- 5000 Casts
- 2500 Reactions
- 2500 Follows
- and more

See [FIP-8](https://github.com/farcasterxyz/protocol/discussions/98)
for more details.

Hubs monitor the storage contract and store messages for accounts upto their storage limit. When an account hits the
storage limit for a message type, the old message is deleted to accomodate newer ones.

When storage expires for an account, the accounts have a 30 day grace period to renew their storage. After this time,
the messages will be deleted from the network.
