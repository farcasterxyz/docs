# Messages

A message is a public update from an account. There are different kinds of messages like posts, reactions or follows. They are signed by an account and stored on Farcaster Hubs. A message is encoded as a [protobuf](https://developers.google.com/protocol-buffers), hashed with Blake3 and signed with an Ed25519 signature from the account's signer. 

### Limits

An account can only store message if it has storage units in the Storage Registry. One unit grants the right to store: 

| Category      | Limit           |
|---------------|-----------------|
| Casts         | 5,000           |
| Reactions     | 2,500           |
| Links         | 2,500           |
| Verifications | 50              |
| UserData      | 50              |

### Ordering

Messages contain a timestamp used for display and ordering. Timestamps are user reported and not trustworthy, similar to timestamps on a personal blog. When the limit is exceeded, the message with the oldest timestamp is discarded and the message hash is used to break ties.

## Casts

A cast is a short message visible to everyone on Farcaster. It can contain up to 320 bytes of text, two urls and five mentions. Casts handled on a first-in first-out basis when limits are exceeded.

#### Threads

A cast with another cast's id in its parent field is called a reply. A series of replies form a thread, which is displayed as such by apps. A cast with no parent is called a top-level cast. 

#### Channels

Channels can help organize casts by topic, similar to forums. A cast may specify a topic URI as its parent, which can be a webpage or an NFT that contains more details. This cast and any children are considered to be part of the channel. See [FIP-2](https://github.com/farcasterxyz/protocol/discussions/71) for more details.

## Reactions

A reaction is a relationship between an account and a target. Reactions can target a cast or a URL and can be one of two types: likes or recasts. Reactions handled on a first-in first-out when limits are exceeded. 

## Links

A link is a relationship between accounts. Links have only one type today: follows. Links are handled on a first-in first-out when limits are exceeded. They also contain a display timestamp which is useful when the link timestamp needs to be changed to ensure that it is not expired.

## Verifications 

A verification is a proof of ownership of an Ethereum address. It is signed by both the Ethereum address and the account's signer to prove that they are owned by the same person. The EIP-712 standard is used to request a signature from the address. Verifications are not unique and the same address can be verified by many accounts if the same person controls them.

## User Data 

A User Data message contains metadata about an account, typically displayed on the profile. UserData messages have types and there is only one message of each type. If multiple message of the same type are published, older ones are discarded. 

| Type      | Description                               |
|-----------|-------------------------------------------|
| pfp       | URL of a profile picture                  |
| display   | Display name for the account              |
| bio       | Short biography about the account         |
| url       | URL of the account's homepage             |
| username  | Active username of the account            |
