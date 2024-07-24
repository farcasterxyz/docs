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
        // Deprecated in favor of moderatorFid
        "hostFids": [
          1593,
          187961
        ],
        "moderatorFid": 5448,
        "createdAt": 1691015606,
        "followerCount": 3622
      },
      ...
    ]
  }
}
```

**Note**: `hostFids` is
Channel object properties:

- `id` - unique channel id that cannot be changed (called 'Name' when creating a channel)
- `url` - FIP-2 `parentUrl` used for main casts in the channel
- `name` - friendly name displayed to users (called 'Display name' when editing a channel)
- `description` - description of the channel, if present
- `imageUrl` - URL to the channel avatar
- `leadFid` - fid of the user who created the channel, if present
- `hostFids` - **(Deprecated)** The fids of the channel hosts, if present. Starting on May 23, 2024, channels are moving away from
  hosts to a moderator, returned as `moderatorFid`. `hostFids` will be removed a few weeks later.
- `moderatorFid` - fid of the user who moderates the main channel feed, if present
- `createdAt` - UNIX time when channel was created, in seconds
- `followerCount` - number of users following the channel

### Get Channel

Get a single Warpcast channel.

```bash
curl 'https://api.warpcast.com/v1/channel?channelId=welcome' | jq
```

Parameters:

- `channelId` - the id of the channel

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
      "moderatorFid": 5448,
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

- `channelId` - the id of the channel

Returns: two arrays:

- `users` - objects with properties:
  - `fid` - the fid of the user
  - `followedAt` - UNIX time when channel was followed, in seconds
- (**DEPRECATED, will be removed soon**) `fids` - the fids of the users

```json
{
  "result": {
    "users": [
      {
        "fid": 466624,
        "followedAt": 1712685183
      },
      {
        "fid": 469283,
        "followedAt": 1712685067
      },
      ...
    ],
    "fids": [
      466624,
      469283,
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

- `fid` - the fid of the user

Returns: an array of objects:

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
        "moderatorFid": 5448,
        "createdAt": 1712162074,
        "followerCount": 17034,
        "followedAt": 1712162620
      },
      ...
    ]
  },
  "next": { "cursor": "..." }
}
```

Object properties:

- All properties documented in the "Get All Channels" endpoint above
- `followedAt` - UNIX time when channel was followed, in seconds

### Get User Following Channel Status

Check whether a user is following a channel.

```bash
curl 'https://api.warpcast.com/v1/user-channel?fid=3&channelId=books' | jq
```

Parameters:

- `fid` - the fid of the user
- `channelId` - the id of the channel

Returns: 2 properties:

```json
{
  "result": {
    "following": true,
    "followedAt": 1687943747
  }
}
```

Properties:

- `following` - indicates whether the channel is followed
- `followedAt` - UNIX time when channel was followed, in seconds (optional, only present when channel is followed)

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

## Get Farcaster actions

Retrieve a list of Farcaster actions. Paginated.

```bash
curl 'https://api.warpcast.com/v2/discover-actions?list=top&limit=10' | jq
```

Parameters:

- `list` - the list to retrieve. Must be `'top'`, a list ordered by total users.

Returns: An array of action objects:

```json
{
  "result": {
    "actions": [
      {
        "name": "Upthumb",
        "icon": "thumbsup",
        "description": "Give casts 'upthumbs' and see them on a leaderboard.",
        "aboutUrl": "https://github.com/horsefacts/upthumbs",
        "actionUrl": "https://upthumbs.app/api/upthumb",
        "action": {
          "actionType": "post",
          "postUrl": "https://upthumbs.app/api/upthumb"
        }
      }
    ]
  },
  "next": { "cursor": "..." }
}
```

Properties:

- `name` - action name
- `icon` - an [Octicon](https://primer.style/foundations/icons) identifying the action
- `description` - a short text description of the action
- `aboutUrl` - external link to a page with additional instructions or source code
- `actionUrl` - action metadata URL. Clients retrieve metadata with a GET to this URL.
- `action.actionType` - action type, only `'post'`
- `action.postUrl` - action POST URL. Clients POSt signed messages to this URL.

## Get Farcaster composer actions

Retrieve a list of Farcaster composer actions. Paginated.

```bash
curl 'https://api.warpcast.com/v2/discover-composer-actions?list=top&limit=10' | jq
```

Parameters:

- `list` - the list to retrieve. Must be one of:
  - `'top'`, a list ordered by total users.
  - `'featured'`, a list curated by Warpcast.

Returns: An array of composer action objects:

```json
{
  "result": {
    "actions": [
      {
        "name": "Poll",
        "icon": "list-unordered",
        "description": "Create a poll",
        "aboutUrl": "https://poll.example.com/",
        "imageUrl": "https://poll.example.com/images/logo.png",
        "actionUrl": "https://poll.example.com/api/action/",
        "action": {
          "actionType": "post",
          "postUrl": "https://poll.ecample.com/api/action/"
        }
      }
    ]
  },
  "next": { "cursor": "..." }
}
```

Properties:

- `name` - action name
- `icon` - an [Octicon](https://primer.style/foundations/icons) identifying the action
- `description` - a short text description of the action
- `aboutUrl` - external link to a page with additional instructions or source code
- `imageUrl` - external link to an action logo image.
- `actionUrl` - action metadata URL. Clients retrieve metadata with a GET to this URL.
- `action.actionType` - action type, only `'post'`
- `action.postUrl` - action POST URL. Clients POSt signed messages to this URL.
