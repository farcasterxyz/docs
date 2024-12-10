# Messages

Farcaster accounts interact by signing and publishing messages. Alice can create a message that says "_Hello @bob_" and sign it with her key.

Messages are stored on a peer-to-peer network of nodes. A node in the Farcaster network is called a Hub, and each Hub stores a copy of the entire network. A user can publish a message to one Hub and it will propagate to the entire network in a few seconds. Farcaster's compact message format and eventually consistent model lets this architecture scale to millions of users.

An account can generate a [key](./accounts.md#adding-account-keys) and give it to an app which can use it to sign messages. Users can use multiple apps with the same account, and each application can have its own key. Separating the signing keys from the ownership keys helps keep the account secure.

## Types

Accounts can publish five different kinds of messages to the network:

| Type          | Description                                   | Example                        |
| ------------- | --------------------------------------------- | ------------------------------ |
| Casts         | Public messages that can be seen by anyone.   | "Hello world!"                 |
| Reactions     | A relationship between an account and a cast. | Alice liked Bob's cast.        |
| Links         | A relationship between two accounts.          | Alice follows Bob.             |
| Profile Data  | Metadata about the account.                   | Profile picture, display name. |
| Verifications | A proof of ownership of something.            | An Ethereum address.           |

## Storage

An account must pay rent to keep their messages on the Farcaster network. Charging rent prevents users from spamming the network.

An account can rent a unit of storage by making an onchain transaction to the Storage Registry. A unit of storage costs $7 today, lasts for one year and lets each account store a certain number of messages of each type. The limits for each type today are:

- 5000 Casts
- 2500 Reactions
- 2500 Links
- 50 Profile Data
- 50 Verifications

If an account exceeds its limit for a message type, the oldest message is pruned to make space for the new one. The user can keep using the network without paying for more storage and Hubs can keep the storage load under control. An account can always purchase more storage to increase its limits.

An account that lets its storage expire may lose all its messages. There is a 30-day grace period after a storage unit expires during which an account must renew or lose its messages.

The price and size of each storage unit is re-calculated periodically to balance growth and quality of the network. See [FIP-6](https://github.com/farcasterxyz/protocol/discussions/98)
for more details.

## Deletion

An account can delete messages at any time by publishing a corresponding delete message. The delete message will remove the contents of the original message, leaving a tombstone in its place. A deleted message will still count towards the account's storage limit until it expires by being pushed out by a newer message.

## Timestamps

Messages have timestamps which count seconds from the Farcaster Epoch, which began on `Jan 1, 2021 00:00:00 UTC`. Using a recent epoch makes timestamps and messages much smaller, which is important for the network.

Timestamps are unverified and can be backdated by users, similar to a blog post. They cannot be more than 15 minutes into the future, as the network will reject such messages.

## Resources

### Specifications

- [Messages](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#2-message-specifications) - the atomic unit of change on Farcaster
- [CRDTs](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#31-crdts) - rules for keeping messages in sync on the network
- [Storage Registry](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#13-storage-registry) - contract to acquire storage units

### APIs

- [Get Casts](../../reference/hubble/httpapi/casts) - fetch an account's casts from a hub
- [Get Reactions](../../reference/hubble/httpapi/reactions) - fetch an account's reactions from a hub
- [Get Links](../../reference/hubble/httpapi/links) - fetch an account's links or follows from a hub
- [Get UserData](../../reference/hubble/httpapi/userdata) - fetch an account's profile data from a hub
- [Submit Message](../../reference/hubble/httpapi/message#submitmessage) - broadcast a message to the hub network
- [Validate Message](../../reference/hubble/httpapi/message#validatemessage) - verify a message's authenticity with a hub
- [Storage Registry](../../reference/contracts/reference/storage-registry) - Acquire or check storage units for an account

### Tutorials

- [Get casts](../../developers/guides/querying/fetch-casts) - Get an account's casts from a hub.
- [Get profile](../../developers/guides/querying/fetch-profile) - Get an account's profile from a hub.
- [Create common message types](../../developers/guides/writing/messages) - Create casts, links, reactions and userdata.
- [Create casts with advanced features](../../developers/guides/writing/casts) - Create casts with embeds, emojis and mentions.
