# Channels

A channel is a public space for your community to have conversations around a topic.

Creating a channel starts a new feed for your community. People can join, cast and find other interesting people. It sparks conversations that wouldn’t otherwise happen on the home feed.

:::warning Experimental Feature
Channels are being prototyped in the Farcaster client and not fully supported by the Farcaster protocol. They may be ported to the protocol in the future if the feature is deemed successful or they may be removed entirely.
:::

## Hosting Channels

Anyone can create a channel host by paying a fee in the Farcaster client and choosing a channel name. The name must be under 16 characters and can only contain lowercase alphabets and numbers. A channel's creator is called a host and may invite other co-hosts to operate the channel. Hosts have special privileges like:

1. Defining “channel norms" which everyone must agree to when joining.
2. Pinning or hiding casts in a channel.
3. Blocking other users from casting in their channel.
4. Setting a channel picture, description and other metadata.

Channel metadata is not part of the protocol and stored in the Farcaster client while channels are in the experimental stage.

## Casting in Channels

Anyone can post into a channel by using the Farcaster client and selecting the channel when creating the cast. The client automatically sets the cast's `parentUrl` to `https://farcaster.xyz/~/channel/<name>`. A cast is considered "in a channel" if it's parentUrl is the channel URI or another cast which is "in a channel".

Channel casts are part of the protocol and stored on hubs. Using a replicator, you can fetch all casts in a channel by filtering the `parentUrl` field for the channel's FIP-2 URL.

## Following Channels

Anyone can follow a channel just like a user. A user will see casts from a followed channel in their home feed when using the Farcaster client.

Channel follows are not part of the protocol and are stored in the Farcaster client while channels are in the experimental stage.

## Cast Visibility

If a user casts in a channel, the Farcaster client will:

1. Always send the casts to the home feeds of any user who follows the channel.
2. Usually send the casts to the home feeds of any user who follows the author.

The determination for (2) is made based on the user's preferences, channel contents and other social graph data. This algorithm is still being fine tuned and will be documented once it is stable.

## Usage Policy

The Farcaster client may remove your channel and will NOT refund your warps if:

1. Your profile or channel impersonates someone.
2. You squat a channel without using it.
3. You violate the Farcaster client's terms and conditions or app store rules.

## FAQ

**Why are channel hosts allowed to hide and ban? Isn’t this censorship?**

Channels are not free-for-all public spaces, they are owned and moderated by their creators. You are always free to start your own channel at any time with its own rules.

**Why is there a fee for creating channels?**

The fee discourages people from squatting short names and not using the channels.

**What's the benefit of creating a channel?**

Starting a channel also helps grow your audience:

1. The Farcaster client will send your followers a notification about your channel.
2. Your channel will be promoted to users who follow similar channels.
3. Users who follow your channel will see channel casts in their home feed.

## Resources

### APIs

- [Farcaster Client Channel APIs](../../reference/client/api.md) - fetch a list of all known channels
