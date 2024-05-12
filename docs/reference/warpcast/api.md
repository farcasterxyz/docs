# Warpcast API Reference

This page documents public APIs provided by Warpcast with information that is not available on the protocol.

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

> [!WARNING]
> The below Channel Endpoints require Authorization header, the Authorization is of type `Bearer` so you will need to obtain a Bearer token for the user from the frontend.

### Update Channel Display Name

Change the channel name programmatically.

```bash
curl --request PATCH 'https://client.warpcast.com/v2/channels-owned' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer [bearer_token]'
--data '{"key": "books", "name": "books_new"}' | jq
```

Body:

- `key` - The channel id
- `name` - The name you want the channel to have

Returns: 1 property:

```json
{
  "result": {
    "success": true
  }
}
```

Properties:

- `success` - Whether the channel name change operation was succesful or not

### Update Channel Description

Change the channel description programmatically.

```bash
curl --request PATCH 'https://client.warpcast.com/v2/channels-owned' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer [bearer_token]'
--data '{"key":"books", "description": "This is the books channel"}' | jq
```

Body:

- `key` - The channel id
- `description` - The description you want the channel to have

Returns: 1 property:

```json
{
  "result": {
    "success": true
  }
}
```

Properties:

- `success` - Whether the channel description change operation was succesful or not

### Update Channel Norms

Change the channel norms programmatically.

```bash
curl --request PATCH 'https://client.warpcast.com/v2/channels-owned' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer [bearer_token]'
--data '{"key":"books", "norms": "No movie talk allowed"}' | jq
```

Body:

- `key` - The channel id
- `norms` - The norms you want the channel to have

Returns: 1 property:

```json
{
  "result": {
    "success": true
  }
}
```

Properties:

- `success` - Whether the channel norms change operation was succesful or not

### Manage Channel Co-Host

Manage channel co-host programmatically.

```bash
curl --request PATCH 'https://client.warpcast.com/v2/channels-owned' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer [bearer_token]'
--data '{"key":"books", "hostUpdates": [{"hostFid": "3", "action": "remove"}]}' | jq
```

Body:

- `key` - The channel id
- `hostUpdates` - An array of objects, each object containing the following properties
  - `hostFid` - `fid` of the host you want to remove
  - `action` - `remove` for removing a co-host, `add` to add co-host

Returns: 1 property:

```json
{
  "result": {
    "success": true
  }
}
```

Properties:

- `success` - Whether the channel co-host removal or addition operation was succesful or not

### Manage Channel Pass Price

Manage channel pass price programmatically.

```bash
curl --request PATCH 'https://client.warpcast.com/v2/channels-owned' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer [bearer_token]'
--data '{"key":"books", "passPriceWarps": 100}' | jq
```

Body:

- `key` - The channel id
- `passPriceWarps` - The price of pass in warps. (-1 to disable passes)

Returns: 1 property:

```json
{
  "result": {
    "success": true
  }
}
```

Properties:

- `success` - Whether the channel pass price change operation was succesful or not

### Manage Channel's Trending Feed

Enable or Disable channel's trending feed programmatically.

```bash
curl --request PATCH 'https://client.warpcast.com/v2/channels-owned' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer [bearer_token]'
--data '{"key":"books", "trendingFeedEnabled": true}' | jq
```

Body:

- `key` - The channel id
- `trendingFeedEnabled`
  - `true` to enable trending feed
  - `false` to disable trending feed

Returns: 1 property:

```json
{
  "result": {
    "success": true
  }
}
```

Properties:

- `success` - Whether the trending feed enable or disable operation was succesful or not

### Pin A Cast On A Channel

Pin a cast in the channel programatically.

```bash
curl --request PUT 'https://client.warpcast.com/v2/boost-cast' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer [bearer_token]'
--data '{"castHash":"0x688b3d004555e179e89b982c13db2a94458d9c86", "isPinned": true}' | jq
```

Body:

- `castHash` - The full cast hash of the cast to be pinned
- `isPinned`
  - `true` to pin the cast

Returns: 1 property:

```json
{
  "result": {
    "success": true
  }
}
```

Properties:

- `success` - Whether the pinning the cast operation was succesful or not

### Unpin A Cast On A Channel

Pin a cast in the channel programatically.

```bash
curl --request DELETE 'https://client.warpcast.com/v2/boost-cast' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer [bearer_token]'
--data '{"castHash":"0x688b3d004555e179e89b982c13db2a94458d9c86"}' | jq
```

Body:

- `castHash` - The full cast hash of the cast to be pinned

Returns: 1 property:

```json
{
  "result": {
    "success": true
  }
}
```

Properties:

- `success` - Whether the unpinning the cast operation was succesful or not

### Hide Cast From Channel

Hide a cast from the channel programatically.

```bash
curl --request PUT 'https://client.warpcast.com/v2/debug-cast-embeds' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer [bearer_token]'
--data '{"castHash":"0x688b3d004555e179e89b982c13db2a94458d9c86", "downVote": true, "isWarning": false}' | jq
```

Body:

- `castHash` - The full cast hash of the cast to hide
- `downVote`
  - `true` to hide the cast
  - `false` to unhide the cast
- `isWarning`
  - `true` to warn and hide the cast
  - `false` to unhide the cast

Returns: 1 property:

```json
{
  "result": {
    "success": true
  }
}
```

Properties:

- `success` - Whether the hide cast operation was succesful or not

### Warn The User & Hide The Cast

Warn the user and hide the cast of the user programatically.

```bash
curl --request PUT 'https://client.warpcast.com/v2/debug-cast-embeds' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer [bearer_token]'
--data '{"castHash":"0x688b3d004555e179e89b982c13db2a94458d9c86", "downVote": true, "isWarning": true}' | jq
```

Body:

- `castHash` - The full cast hash of the cast to hide
- `downVote`
  - `true` to hide the cast
  - `false` to unhide the cast
- `isWarning`
  - `true` to warn and hide the cast
  - `false` to unwarn the cast

Returns: 1 property:

```json
{
  "result": {
    "success": true
  }
}
```

Properties:

- `success` - Whether the warn and hide cast operation was succesful or not

### Report A Cast

Report a cast in the channel programatically.

```bash
curl --request POST 'https://client.warpcast.com/v2/report-cast' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer [bearer_token]'
--data '{"castHash":"0x688b3d004555e179e89b982c13db2a94458d9c86"}' | jq
```

Body:

- `castHash` - The full cast hash of the cast to report

Returns: 1 property:

```json
{
  "result": {
    "success": true
  }
}
```

Properties:

- `success` - Whether the report cast operation was succesful or not

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
