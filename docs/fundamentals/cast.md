---
sidebar_position: 4
slug: /cast
---

# Cast

A cast is a public message sent by a Farcaster user to their audience. A user’s casts are stored on their host in a specific location indicated by their [directory](https://www.notion.so/Host-84cc5cd6f4ea487e88b203b34fca3ae9) using the `addressActivity` property. Casts contain text and include links to media, like pictures and videos.  

Casts are stored as JSON objects in a reverse-chronological array in a single file called a cast chain. The array of casts is a simple blockchain, where every cast is hashed and signed with a reference to the previous cast's hash. 

![Cast Chain](/img/docs/cast-chain.png)

The cast chain can be used to detect malicious users who edit their history silently. For example, user might get several likes on the *“my first post*” message and change the text to something truly evil, like *“it’s pronounced jif, not gif"*. They would then try to cover their tracks by re-calculating the hash and signature. Such actions can be detected in a cast chain because the second post now references a hash that doesn’t match the one in the first post. The only way to edit an old cast is to edit every cast that succeeds it. 

A determined, malicious user who hates the sound of `gif` might rewrite all their posts. The protocol doesn’t prevent this , but clients can do so by using the `sequence` value, which is a [logical clock](https://en.wikipedia.org/wiki/Logical_clock) that orders a user’s casts. It must start at zero and be incremented for each new message. If a client discovers two messages with the same sequence but different hashes or notes a missing sequence, they can mark the user as unreliable¹.

The cast object looks like this: 

```javascript
interface Cast {
  body: {
	  address: string;
	  username: string;
	  publishedAt: number; 
	  type: string;
	  data: unknown;	
	  sequence: number;
	  prevMerkleRoot: string;
  },
  merkleRoot: string;
  signature: string;
}
```

A cast is a [signed blob](https://www.notion.so/Signed-Blob-d6f35b95dd4946e0a208441996612ce4), so it follows the typical structure of having a `body`, `merkleRoot` and `signature`.  The body object contains a few new properties: 

- `address` - the Ethereum that signed the cast.
- `username` -  the user who generated  the cast.
- `publishedAt` - the unverified, user-reported unix timestamp of publication.
- `type` - the schema for message in the data object.
- `data`- the message that the user is broadcasting as defined by the type schema.
- `sequence` - the sequence number of this cast.
- `prevMerkleRoot` - the hash of the cast with the previous sequence number.

A simple, hello world message from the user `@v` might look like this:

```javascript
{
  body: {
    address: '0x6bFBF67473014Bfd814BCAF9259f5EB41A48380A',
    username: 'v',
    publishedAt: 1622579480955,
    type: 'text-short',
    data: {
      text: 'hello world!',
    },
    sequence: 0,
    prevMerkleRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
  },
  merkleRoot: '0x632c24885d7ef845cab18b3e4d3e2d610e2aea43777b76806839af3b34c3ef58',
  signature:
    '0xb489599913bd995a19e8b74bb6046a42a2e9907642e956dca439325f85189d4a0f7cb06a1c9658a9fc2677b3f37dd6a7fde55f1cc9a759f9873a575731b9c2bc1c',
 }
```

*Signatures and hashes not accurate, for illustration only.*

### Schemas

Farcaster defines the `text-short` schema which is used in its social network. It allows short simple text messages that can either stand alone, or be replies to other messages.  It defines the cast data as an object that contains two properties: 

```tsx
data: {
  text: string;
  replyParentMerkleRoot?: string;
}
```

- `text` - the message from the user, which may contain up to 280 unicode characters
- `replyParentMerkleRoot` - (optional) references the ancestor cast, if in a thread.

Schemas are enforced at the client level, and clients may truncate or reject messages entirely if they do not conform to the schema. Other schema types can be proposed as protocol improvments — for example, a poll schema to allow users to run quick polls and collect responses from their followers. 

### Making a text-short Cast

Farcaster clients must generate a JSON object to create a new text-short cast. The message is set in the `text` property, and  `publishedAt` , `address` and `username` are set with user input. Each new cast must have an incremented sequence number, which is used as a [logical clock](https://en.wikipedia.org/wiki/Logical_clock) to order a user’s messages. It must also reference the `merkleRoot` of the previous cast. 

The pseudocode for generating a new cast looks like this:

1. Retrieve the list of casts as a JSON array from the Directory’s addressActivity URL
2. Get the `sequence` from the cast at position 0 and increment it by 1 to get the new `sequence`
3. Get the `merkleRoot` from the cast at position 0 and set it as the `prevMerkleRoot`. If this is the first cast, set the `prevMerkleRoot` to the keccak256 of an empty string²
4. Populate `text` , `publishedAt`, `address` and `username` based on user input and system state.
5. Call `JSON.stringify` on the body and then use `keccak256` on the output to get the `merkleRoot` and set it.
6. Create an ECDSA signature using the `merkleRoot` with the address to get the `signature` value. 
7. Insert this new cast at position 0 in the array, nudging down all other casts by one position.
8. Save this array of casts back in the addressActivity URL

## Known Issues

There are several known issues with the current design, which are being resolved in the next schema upgrade: 

- Cast property `merkleRoot` is a misleading legacy name, and should be changed to `hash`.
- Directory property `addressActivity` is a misleading legacy name, and should be changed to `casts`.
- All casts are stored in a single file which makes reading messages inefficient when users have many casts.
- Cast JSON could be defined more succinctly to require fewer bytes for storage and transmission.
- The process to turn a JSON Cast object into a string before hashing is not specified in a way that can be implemented in any language. It requires you to use the javascript implementation of `JSON.stringify()`.

## Footnotes

*[1] this is not yet implemented in the farcaster client, but will be in a future version*

*[2] The keccak256 of an empty string is `0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470`*

