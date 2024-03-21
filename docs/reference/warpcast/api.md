# Warpcast API Reference

### Get All Channels

Warpcast has the concept of channels which build upon FIP-2 (setting parentUrl to casts).
You can read more about channels in the [documentation](https://www.notion.so/warpcast/Channels-4f249d22575348a5a0488b5d86f0dd1c?pvs=4).

This endpoint provides metadata around all the channels in Warpcast. The endpoint requires no authentication,
does not use any parameters and does not paginate.

```bash
curl https://api.warpcast.com/v2/all-channels | jq
```

The return object is a JSON array where each channel has the following shape:

```json
{
  "id": "lifehacks",
  "url": "https://warpcast.com/~/channel/lifehacks",
  "name": "lifehacks",
  "description": "Tips & tricks for a smoother life journey 🌟",
  "imageUrl": "https://i.imgur.com/Fe0Q1ZJ.png",
  "leadFid": 17672,
  "createdAt": 1702759296
},
```

Properties:

- `id` - The unique channel id that cannot be changed (called 'Name' when creating a channel)
- `url` - The FIP-2 `parentUrl` used for main casts in the channel
- `name` - The friendly name displayed to users (called 'Display name' when editing a channel)
- `description` - The description of the channel, if present
- `imageUrl` - URL to the channel avatar
- `loadFid` - The fid of the user who created the channel, if present (called 'Host' in Warpcast)
- `createdAt` - UNIX time when channel was created, in seconds

<br/>

### Get All Power Badge Users

Warpcast grants power badges to users who are active, interesting to others and not spammy. 
You can read more about power badges in the [documentation](https://warpcast.notion.site/Power-Badge-d81fea2e953e4dafae7c85295ffaf3ae).

This endpoint provides the list of all users who currently hold a power badge. The endpoint requires no authentication,
does not use any parameters and does not paginate.

```bash
curl https://api.warpcast.com/v2/power-badge-users | jq
```

The return object is a JSON array with fids of users who currently hold a power badge:

```json
{
  "fids": [1, 2, 3]
},
```

Warpcast recalculates badge ownership once every week, on Tuesdays at 12:00:00 UTC.
