# Warpcast API Reference

### Get All Channels
Warpcast has the concept of channels which build upon FIP-2 (setting parentUrl to casts).
You can read more about channels in the [documentation](https://www.notion.so/warpcast/Channels-4f249d22575348a5a0488b5d86f0dd1c?pvs=4).

This endpoint provides metadata around all the channels in Warpcast. The endpoint requires no authentication,
does not use any parameters and does not pagination.

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
  "leadFid": 17672
}
```

Properties:
* `id` - The unique channel id that cannot be changed (called 'Name' when creating a channel)
* `url` - The FIP-2 `parentUrl` used for main casts in the channel
* `name` - The friendly name displayed to users (called 'Display name' when editing a channel)
* `description` - The description of the channel
* `imageUrl` - URL to the channel avatar
* `loadFid` - The fid of the user who created the channel (called 'Host' in Warpcast)