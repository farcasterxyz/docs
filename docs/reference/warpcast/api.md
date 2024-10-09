# Warpcast API Reference

This page documents public APIs provided by Warpcast with information that is not available on the protocol.

The hostname is always `https://api.warpcast.com`.

## Pagination

Paginated endpoints return a `next.cursor` property next to the `result` object. To fetch the
next page, send the value as a `cursor` query parameter. An optional `limit` query parameter can be used to
specify the page size.

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

## Authentication

Authenticated endpoints use a self-signed token, signed an an App Key for FID:

```tsx
import { NobleEd25519Signer } from "@farcaster/hub-nodejs";

// private / public keys of an App Key you are holding for an FID
const fid = 6841; //replace
const privateKey = 'secret'; // replace
const publicKey = 'pubkey'; // replace
const signer = new NobleEd25519Signer(privateKey);

const header = {
	fid,
	type: 'app_key',
	key: publicKey
};
const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');

const payload = { exp: Math.floor(Date.now() / 1000) + 300 }; // 5 minutes
const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');

const signatureResult = await signer.signMessageHash(Buffer.from(`${encodedHeader}.${encodedPayload}`, 'utf-8'));
const encodedSignature = Buffer.from(signatureResult.value).toString("base64url");

const authToken = encodedHeader + "." + encodedPayload "." + encodedSignature;

await got.post(
  "https://api.warpcast.com/fc/channel-follows",
  {
	  body: { channelKey: 'evm' }
	  headers: {
	    'Content-Type': 'application/json',
	    'Authorization': 'Bearer ' + authToken;
	  }
	}
)
```

## Concepts

- Channels: Warpcast has the concept of channels which build upon FIP-2 (setting `parentUrl` on casts). You can read more
  about channels in the [documentation](https://www.notion.so/warpcast/Channels-4f249d22575348a5a0488b5d86f0dd1c?pvs=4).

## Get All Channels

`GET /v2/all-channels`

List all channels. No parameters. Not paginated. Not authenticated.

Returns: a `channels` array with properties:

- `id` - unique channel id that cannot be changed (called 'Name' when creating a channel)
- `url` - FIP-2 `parentUrl` used for main casts in the channel
- `name` - friendly name displayed to users (called 'Display name' when editing a channel)
- `description` - description of the channel, if present
- `imageUrl` - URL to the channel avatar
- `leadFid` - fid of the user who created the channel, if present
- `moderatorFids` - fids of the moderators (under new channel membership scheme)
- `createdAt` - UNIX time when channel was created, in seconds
- `followerCount` - number of users following the channel
- `memberCount` - number of members of the channel, including the owner and moderators
- `pinnedCastHash` - hash of the cast pinned in the channel, if present
- `externalLink` - external link that appears in the header in Warpcast, if present, with 2 properties:
  - `title` - title shown in the channel header
  - `url` - url of the link

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
        "moderatorFids": [
          5448,
          3
        ],
        "createdAt": 1691015606,
        "followerCount": 3622,
        "memberCount": 123,
        "pinnedCastHash": "0x3349beda5fb6232ab50d7b0e4d49da3d56814771",
        "externalLink": {
          "title": "Join",
          "url": "https://www.some.com"
        }
      },
      ...
    ]
  }
}
```

Example:

```bash
curl 'https://api.warpcast.com/v2/all-channels'
```

## Get Channel

`GET /v1/channel`

Get a single channel. Not authenticated.

Query parameters:

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
      "moderatorFids": [5448, 3],
      "createdAt": 1691015606,
      "followerCount": 3622,
      "memberCount": 123,
      "pinnedCastHash": "0x3349beda5fb6232ab50d7b0e4d49da3d56814771",
      "externalLink": {
        "title": "Join",
        "url": "https://www.some.com"
      }
    }
  }
}
```

```bash
curl 'https://api.warpcast.com/v1/channel?channelId=welcome'
```

## Get Channel Followers

`GET /v1/channel-followers`

List the followers of a channel. Ordered by the time when the channel was followed, descending. Paginated. Not authenticated.

Query Parameters:

- `channelId` - the id of the channel

Returns: a `users` array with properties:

- `fid` - the fid of the user
- `followedAt` - UNIX time when channel was followed, in seconds

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
  },
  "next": { "cursor": "..." }
}
```

Example:

```bash
curl 'https://api.warpcast.com/v1/channel-followers?channelId=books'
```

## Get Channels a User is Following

`GET /v1/user-following-channels`

List all channels a user is following. Ordered by the time when the channel was followed, descending. Paginated. Not authenticated.

Parameters:

- `fid` - the fid of the user

Returns: a `channels` array with properties:

- All properties documented in the "Get All Channels" endpoint above
- `followedAt` - UNIX time when channel was followed, in seconds

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
        "moderatorFid": 5448,
        "moderatorFids": [
          5448,
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

Example:

```bash
curl 'https://api.warpcast.com/v1/user-following-channels?fid=3'
```

## Get User Following Channel Status

`GET /v1/user-channel`

Check whether a user is following a channel.

Query parameters:

- `fid` - the fid of the user
- `channelId` - the id of the channel

Returns: 2 properties:

- `following` - indicates whether the channel is followed
- `followedAt` - UNIX time when channel was followed, in seconds (optional, only present when channel is followed)

```json
{
  "result": {
    "following": true,
    "followedAt": 1687943747
  }
}
```

Example:

```bash
curl 'https://api.warpcast.com/v1/user-channel?fid=3&channelId=books'
```

## Get Channel Members

`GET /fc/channel-members`

List the members of a channel. Ordered by the time when the user became a member, descending. Paginated. Not authenticated.

Query parameters:

- `channelId` - the id of the channel
- `fid` - (optional) and fid of a user to filter by

Returns: a `members` array:

- `fid` - the fid of the member
- `memberAt` - UNIX time when user became a member, in seconds

```json
{
  "result": {
    "members": [
      {
        "fid": 466624,
        "memberAt": 1712685183
      },
      {
        "fid": 469283,
        "memberAt": 1712685067
      },
      ...
    ]
  },
  "next": { "cursor": "..." }
}
```

Example:

```bash
curl 'https://api.warpcast.com/fc/channel-members?channelId=memes'
```

## Get Channel Invites

`GET /fc/channel-invites`

List outstanding invites to channels. Ordered by the time when the user was invited, descending. Paginated. Not authenticated.

There is max one outstanding invite per user (`invitedFid`) and channel (`channelId`).

Query parameters:

- `channelId` - (optional) an id of a channel to filter by
- `fid` - (optional) an fid of a user to filter by

Returns: an `invites` array:

- `channelId` - the id of the channel to which the user was inviter
- `invitedFid` - the fid of the user being invited
- `invitedAt` - UNIX time when user was invited, in seconds
- `inviterFid` - the fid of the user who created the invite
- `role` - the role the user was invited to, `member` or `moderator`

```json
{
  "result": {
    "invites": [
      {
        "channelId": "coke-zero",
        "invitedFid": 194,
        "invitedAt": 1726879628,
        "inviterFid": 18949,
        "role": "member"
      },
      {
        "channelId": "brain-teasers",
        "invitedFid": 627785,
        "invitedAt": 1726874566,
        "inviterFid": 235128,
        "role": "member"
      },
      ...
    ]
  },
  "next": { "cursor": "..." }
}
```

Example:

```bash
curl 'https://api.warpcast.com/fc/channel-invites?channelId=memes'
```

## Get Cast Moderation Actions

`GET /fc/moderated-casts`

List moderation actions. Ordered by the time when the action was taken, descending. Paginated. Not authenticated.

Query parameters:

- `channelId` - (optional) an id of a channel to filter by

Returns: a `moderationActions` array:

- `castHash` - hash of the cast that was moderated (including `0x` prefix)
- `channelId` - id of the channel in which the cast resides
- `action` - `hide` or `unhide`
- `moderatedAt` - UNIX time when moderation took place, in seconds

```json
{
  "result": {
    "moderationActions": [
      {
        "castHash": "0x6b2253105ef8c1d1b984a5df87182b105a1f0b3a",
        "channelId": "welcome",
        "action": "hide",
        "moderatedAt": 1727767637
      },
      ...
    ]
  },
  "next": { "cursor": "..." }
}
```

Example:

```bash
curl 'https://api.warpcast.com/fc/moderated-casts?channelId=welcome'
```

## Get Channel Banned Users

`GET /fc/channel-banned-users`

Get users banned from channels (=members who access was revoked by a moderator). Such users are not able to join via an invite link. Ordered by the time when the user was banned, descending. Paginated. Not authenticated.

**Note:**

- Replies by banned users are still visible below the fold
- This endpoint returns only active bans. If a user was banned and subsequently added back as a member by a moderator, the ban entry from this endpoint will disappear.

Query parameters:

- `channelId` - (optional) channel id to filter by
- `fid` - (optional) user fid to filter by

Returns: a `bannedUsers` array:

- `fid` - the fid of the banned user
- `channelId` - the id of the channel the user is banned from
- `bannedAt` - UNIX time when the active ban started, in seconds

```json
{
  "result": {
    "bannedUsers": [
      {
        "fid": 1234,
        "channelId": "welcome",
        "bannedAt": 1727767637
      },
      ...
    ]
  },
  "next": { "cursor": "..." }
}
```

Example:

```bash
curl 'https://api.warpcast.com/fc/channel-banned-users?channelId=memes'
```

## Follow/Unfollow Channel

Allows following and unfollowing a channel. Authenticated.

- `POST /fc/channel-follows`
- `DELETE /fc/channel-follows`

Body parameters:

- `channelId` - id of channel to follow or unfollow

**Examples**

```bash
curl -X POST -H 'Content-Type: application/json' -H 'Authorization: Bearer <Auth Token>' -d '{ "channelId": "evm" }' https://api.warpcast.com/fc/channel-follows

curl -X DELETE -H 'Content-Type: application/json' -H 'Authorization: Bearer <Auth Token>' -d '{ "channelId": "evm" }' https://api.warpcast.com/fc/channel-follows
```

## Invite to Channel

`POST /fc/channel-invites`

Invites a user to be either a member or moderator of a channel. It is idempotent, i.e. if there is already an outstanding invite or the user already has the desired role, the API returns success. Authenticated.

The caller must own or moderate the channel.

**Note:** we can allowlist bots that are ok to be directly added as moderators to channels. Any channel owner can then add the bot as an active mod without the requirement that the bot is first a member or that it has to accept an invite. Let us know if you’d like your bot to be allowlisted.

Rate limit: 100 calls per caller per channel per hour

Body parameters:

- `channelId` - id of channel to invite user to
- `inviteFid` - fid of the user to invite
- `role` - either of:
  - `member`: invites the user to be a member. The user must already follow either the channel or the user calling the endpoint. The caller must be a channel moderator or the channel owner.
  - `moderator`: invites a user to be a moderator. The user must already be a channel member (i.e. has accepted a prior `member` invitation). The caller must be the channel owner. The number of active moderators + outstanding moderator invites cannot go above 10 (you’ll get an error).

Returns:

- `success: true`

Example:

```bash
curl -X POST \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <Auth Token>' \
  -d '{ "channelId": "evm", "inviteFid": 341234, "role": "member" }' \
  https://api.warpcast.com/fc/channel-invites
```

## Remove from Channel

`DELETE /fc/channel-invites`

Removes a user from a channel role, including revoking any outstanding unaccepted invite. It is idempotent, i.e. if the user does not have an invite for the role or does not have the role, the API returns success. Authenticated.

The caller must own or moderate the channel.

Rate limit: 100 calls per caller per channel per hour

Body parameters:

- `channelId` - id of channel to remove user from
- `removeFid` - fid of the user to remove
- `role` - either of:
  - `member`: removes user from member role or revokes an existing member invitation. If the user was removed, the user is blocked from becoming a member again via a link (i.e. to become a member again, they have to be invited by a moderator). If only an invitation was revoked, the user is not blocked from becoming a member via a link. The caller must be a channel moderator or the channel owner.
  - `moderator`: removes user from moderator role or revokes an existing moderator invitation. The caller must be the channel owner.

Returns:

- `success: true`

Example:

```bash
curl -X DELETE \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <Auth Token>' \
  -d '{ "channelId": "evm", "removeFid": 341234, "role": "member" }' \
  https://api.warpcast.com/fc/channel-invites
```

## Respond to Channel Invite

`PATCH /fc/channel-invites`

Accept or decline an outstanding member/moderator channel invite. Once an invite has been accepted or declined, the response cannot be changed. Authenticated.

The caller must have an active invite.

Body parameters:

- `channelId` - id of channel to which user was invited
- `role` - the role of the invite, either `member` or `moderator`
- `accept` - boolean, `true` or `false`, indicating accept/decline

Returns:

- `success: true`

Example:

```bash
curl -X PATCH \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <Auth Token>' \
  -d '{ "channelId": "evm", "role": "member", "accept": true }' \
  https://api.warpcast.com/fc/channel-invites
```

## Moderate Channel Cast

`POST /fc/moderated-casts`

Moderate (hide/unhide) a specific channel cast. Authenticated.

The cast must be in a channel the caller moderates or owns.

Body parameters:

- `castHash` - the hash of the cast (including `0x` prefix)
- `action` - either `hide` or `unhide`

Returns:

- `success: true`

Example:

```bash
curl -X POST \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <Auth Token>' \
  -d '{ "castHash": "0x2694aa649f3608bd11fe6621946782d1eb0ae3c4", "action": "hide" }' \
  https://api.warpcast.com/fc/moderate-cast
```

## Pin Channel Cast

`PUT /fc/pinned-casts`

Pin (and optionally announce) a cast to a channel, replacing any currently pinned cast. If the provided cast is already pinned, nothing changes (and success is returned).

Body parameters:

- `castHash` - the hash of the cast to pin (including `0x` prefix)
- `notifyChannelFollowers` - (optional) `true` / `false` whether to send an announcement notification to all channel followers about the pinned cast. Defaults to `false`

Returns:

- `success: true`

Example:

```bash
curl -X PUT \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <Auth Token>' \
  -d '{ "castHash": "0x2694aa649f3608bd11fe6621946782d1eb0ae3c4", "notifyChannelFollowers": true }' \
  https://api.warpcast.com/fc/pinned-casts
```

## Unpin Channel Cast

`DELETE /fc/pinned-casts`

Unpin a cast from a channel.

Body parameters (**provide only one of the two**):

- `castHash` - the hash of the cast to unpin (including `0x` prefix). Will unpin only if this exact cast is pinned.
- `channelId` - the id of the channel to unpin from. Will unpin any pinned cast from the channel.

Returns:

- `success: true`

Example:

```bash
curl -X DELETE \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <Auth Token>' \
  -d '{ "channelId": "welcome" }' \
  https://api.warpcast.com/fc/pinned-casts
```

## Get Farcaster actions

`GET /v2/discover-actions`

Retrieve a list of Farcaster actions. Paginated. Not authenticated.

Query parameters:

- `list` - the list to retrieve. Must be `'top'`, a list ordered by total users.

Returns: an array of `action` objects with properties:

- `name` - action name
- `icon` - an [Octicon](https://primer.style/foundations/icons) identifying the action
- `description` - a short text description of the action
- `aboutUrl` - external link to a page with additional instructions or source code
- `actionUrl` - action metadata URL. Clients retrieve metadata with a GET to this URL.
- `action.actionType` - action type, only `'post'`
- `action.postUrl` - action POST URL. Clients POSt signed messages to this URL.

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
      },
      ...
    ]
  },
  "next": { "cursor": "..." }
}
```

Example:

```bash
curl 'https://api.warpcast.com/v2/discover-actions?list=top&limit=10'
```

## Get Farcaster composer actions

`GET /v2/discover-composer-actions`

Retrieve a list of Farcaster composer actions. Paginated. Not authenticated.

Query parameters:

- `list` - the list to retrieve. Must be one of:
  - `'top'`, a list ordered by total users.
  - `'featured'`, a list curated by Warpcast.

Returns: an `actions` array with properties:

- `name` - action name
- `icon` - an [Octicon](https://primer.style/foundations/icons) identifying the action
- `description` - a short text description of the action
- `aboutUrl` - external link to a page with additional instructions or source code
- `imageUrl` - external link to an action logo image.
- `actionUrl` - action metadata URL. Clients retrieve metadata with a GET to this URL.
- `action.actionType` - action type, only `'post'`
- `action.postUrl` - action POST URL. Clients POSt signed messages to this URL.

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

Example:

```bash
curl 'https://api.warpcast.com/v2/discover-composer-actions?list=top&limit=10'
```

## Get Blocked Users

`GET /v1/blocked-users`

Warpcast allows users to block others from replying, quoting and mentioning them.

This endpoint provides access to all blocked users. Paginated, in reverse chronological order by block creation time. Not authenticated.

Query parameters:

- `blockerFid` (**optional**) - limit the response to only blocks by a specific user

Returns: a `blockedUsers` array with properties:

- `blockerFid` - the user who created the block
- `blockedFid` - the user who is blocked (cannot reply to, quote or mention the `blockerFid`)
- `createdAt` - UNIX time when channel was created, in seconds

```json
{
  "result": {
    "blockedUsers": [
      {
        "blockerFid": 5,
        "blockedFid": 10,
        "createdAt": 1724854521
      },
      ...
    ]
  },
  "next": { "cursor": "..." }
}
```

Example:

```bash
curl 'https://api.warpcast.com/v1/blocked-users'
```
