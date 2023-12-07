# Messages

Farcaster accounts interact by signing and publishing messages. Alice can create a message that says "*Hello @bob*" and sign it with her key. 

Messages are stored on a peer-to-peer network of nodes. A node in the Farcaster network is called a Hub, and each Hub stores a copy of the entire network. A user can publish a message to one Hub and it will propagate to the entire network in a few seconds. Farcaster's compact message format and eventually consistent model lets this architecture scale to millions of users.  

An account can generate a key and give it to an app which can use it to sign messages. Users can use multiple apps with the same account, and each application can have its own key. Separating the signing keys from the ownership keys helps keep the account secure. 

## Types
 
Accounts can publish five different kinds of messages to the network:

- **Casts**  - Public messages that can be seen by anyone. (e.g. "Hello world!")
- **Reactions** - A relationship between an account and a cast (e.g. alice liked bob's cast)
- **Links** - A relationship between two accounts (e.g. alice follows bob)
- **Profile Data** - Metadata about the account (e.g. profile picture, display name)  
- **Verifications** - A proof of ownership of something (e.g. an Ethereum address)

## Storage

An account must pay rent to keep their messages on the Farcaster network. Charging rent prevents users from spamming the network. 

An account can rent a unit of storage by making an onchain transaction to the Storage Registry. A unit of storage costs $7 today, lasts for one year and lets each account store a certain number of messages of each type. The limits for each type today are: 

- 5000 Casts
- 2500 Reactions
- 2500 Links
- 50 Profile Data
- 50 Verifications

If an account exceeds its limit for a message type, the oldest message is pruned to make space for the new one. User can keep using the network without paying for more storage and Hubs can keep the storage load under control. An account can always purchase more storage to increase its limits.  

An account that lets its storage expire may lose all its messages. There is a 30-day grace period after a storage unit expires during which an account must renew or lose its messages.

The price and size of each storage unit is calculated periodically to balance growth and quality of the network. See [FIP-8](https://github.com/farcasterxyz/protocol/discussions/98)
for more details.

## Deletion 

An account can delete any of its messages at any time by publishing a corresponding delete message. Wherever possible, the delete will preserve privacy by removing the contents of the message and leaving a tombstone in its place. A deleted message will still count towards the account's storage limit until it expires by being pushed out by a newer message.

## Timestamps

A message has a timestamp but it is not trustworthy because it is reported by the user. It cannot have a timestamp far in the future, but it can be backdated. The trust model is like that of a blog, where you have to trust the author 's view of the time. 