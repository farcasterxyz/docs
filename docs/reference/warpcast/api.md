# Warpcast API Reference

This page documents public APIs provided by Warpcast with information that is not available on the protocol.

**Authentication**: All endpoints are unauthenticated.

**Pagination**: paginated endpoints return a `next.cursor` property next to the `result` object. This parameter should be sent
back to fetch the next page. An optional `limit` parameter can be used to specify the page size.

```json
{
  "result": {
    ...
  },
  "next": {
    "cursor": "eyJwYWdlIjoxLCJsaW1pdCI6MTAwfQ"
  }
}
```

## Channel APIs

Warpcast has the concept of channels which build upon FIP-2 (setting `parentUrl` on casts). You can read more
about channels in the [documentation](https://www.notion.so/warpcast/Channels-4f249d22575348a5a0488b5d86f0dd1c?pvs=4).

### Get All Channels

List all Warpcast channels. There are no parameters and no pagination.

```bash
curl https://api.warpcast.com/v2/all-channels | jq
```

Returns: an array of channel objects:

```json
{
  "result": {
    "channels": [
      {
        "id": "welcome",
        "url": "chain://eip155:7777777/erc721:0x8f0055447ffae257e9025b781643127ca604baaa",
        "name": "Welcome",
        "description": "A place to welcome new users to Farcaster! Share how you know each other, tag folks that should meet them, and add a photo or two!",
        "imageUrl": "https://ipfs.decentralized-content.com/ipfs/bafkreieraqfkny7bttxd7h7kmnz6zy76vutst3qbjgjxsjnvrw7z3i2n7i",
        "leadFid": 1593,
        "hostFids": [
          1593,
          187961
        ],
        "createdAt": 1691015606,
        "followerCount": 3622
      },
      ...
    ]
  }
}
```

Channel object properties:

- `id` - The unique channel id that cannot be changed (called 'Name' when creating a channel)
- `url` - The FIP-2 `parentUrl` used for main casts in the channel
- `name` - The friendly name displayed to users (called 'Display name' when editing a channel)
- `description` - The description of the channel, if present
- `imageUrl` - URL to the channel avatar
- `leadFid` - The fid of the user who created the channel, if present
- `hostFids` - the fids of the of the channel hosts, if present
- `createdAt` - UNIX time when channel was created, in seconds
- `followerCount` - number of users following the channel
  <br/>

### Get Channel

Get a single Warpcast channel.

```bash
curl 'https://api.warpcast.com/v1/channel?channelId=welcome' | jq
```

Parameters:

- `channelId`: the id of the channel

Returns: a single channel object, as documented in the "Get All Channels" endpoint above.

```json
{
  "result": {
    "channel": {
      "id": "welcome",
      "url": "chain://eip155:7777777/erc721:0x8f0055447ffae257e9025b781643127ca604baaa",
      "name": "Welcome",
      "description": "A place to welcome new users to Farcaster! Share how you know each other, tag folks that should meet them, and add a photo or two!",
      "imageUrl": "https://ipfs.decentralized-content.com/ipfs/bafkreieraqfkny7bttxd7h7kmnz6zy76vutst3qbjgjxsjnvrw7z3i2n7i",
      "leadFid": 1593,
      "hostFids": [1593, 187961],
      "createdAt": 1691015606,
      "followerCount": 3622
    }
  }
}
```

### Get Channel Followers

List the followers of a Warpcast channel. Ordered by the time when the channel was followed, descending. Paginated.

```bash
curl 'https://api.warpcast.com/v1/channel-followers?channelId=books' | jq
```

Parameters:

- `channelId`: the id of the channel

Returns: an array of fids:

```json
{
  "result": {
    "fids": [
      377075,
      446827,
      ...
    ]
  },
  "next": { "cursor": "..." }
}
```

### Get User Following Channels

List all Warpcast channels a user is following. Ordered by the time when the channel was followed, descending. Paginated.

```bash
curl 'https://api.warpcast.com/v1/user-following-channels?fid=3' | jq
```

Parameters:

- `fid`: the fid of the user

Returns: an array of channel objects, as documented in the "Get All Channels" endpoint above.

```json
{
  "result": {
    "channels": [
      {
        "id": "fc-updates",
        "url": "https://warpcast.com/~/channel/fc-updates",
        "name": "fc-updates",
        "description": "Important updates about things happening in Farcaster",
        "imageUrl": "https://i.imgur.com/YnnrPaH.png",
        "leadFid": 2,
        "hostFids": [
          2,
          3
        ],
        "createdAt": 1712162074,
        "followerCount": 8445
      },
      ...
    ]
  },
  "next": { "cursor": "..." }
}
```

### Get User Following Channel Status

Check whether a user is following a channel.

```bash
curl 'https://api.warpcast.com/v1/user-channel?fid=3&channelId=books' | jq
```

Parameters:

- `fid`: the fid of the user
- `channelId`: the id of the channel

Returns: a single boolean property `following`, indicating whether the channel is followed.

```json
{
  "result": {
    "following": true
  }
}
```

## Get All Power Badge Users

Warpcast grants power badges to users who are active, interesting to others and not spammy.
You can read more about power badges in the [documentation](https://warpcast.notion.site/Power-Badge-d81fea2e953e4dafae7c85295ffaf3ae).

This endpoint provides the list of all users who currently hold a power badge. The endpoint has no parameters and does not paginate.

```bash
curl https://api.warpcast.com/v2/power-badge-users | jq
```

Returns: a JSON array with fids of users who currently hold a power badge:

```json
{
  "result": {
    "fids": [
      1,
      2,
      ...
    ]
  }
}
```

Warpcast recalculates badge ownership once every week, on Tuesdays at 12:00:00 UTC.
