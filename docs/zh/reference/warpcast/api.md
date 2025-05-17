# Warpcast API 参考文档

本文档记录了 Warpcast 提供的公开 API，包含协议中未提供的信息。

主机名始终为 `https://api.warpcast.com`。

## 分页机制

支持分页的端点会在 `result` 对象旁返回 `next.cursor` 属性。要获取下一页数据，请将该值作为 `cursor` 查询参数发送。可选的 `limit` 查询参数可用于指定每页大小。

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

## 身份验证

需认证的端点使用自签名令牌，该令牌使用 FID 的应用密钥签名：

```tsx
import { NobleEd25519Signer } from "@farcaster/hub-nodejs";

// 为某个 FID 持有的应用密钥的私钥/公钥
const fid = 6841; //替换
const privateKey = 'secret'; // 替换
const publicKey = 'pubkey'; // 替换
const signer = new NobleEd25519Signer(new Uint8Array(Buffer.from(privateKey)));

const header = {
  fid,
  type: 'app_key',
  key: publicKey
};
const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');

const payload = { exp: Math.floor(Date.now() / 1000) + 300 }; // 5 分钟有效期
const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');

const signatureResult = await signer.signMessageHash(Buffer.from(`${encodedHeader}.${encodedPayload}`, 'utf-8'));
if (signatureResult.isErr()) {
  throw new Error("签名消息失败");
}

const encodedSignature = Buffer.from(signatureResult.value).toString("base64url");

const authToken = encodedHeader + "." + encodedPayload + "." + encodedSignature;

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

## 核心概念

- 频道（Channels）：Warpcast 的频道概念基于 FIP-2（在 casts 上设置 `parentUrl`）。您可以在[文档](https://www.notion.so/warpcast/Channels-4f249d22575348a5a0488b5d86f0dd1c?pvs=4)中了解更多关于频道的信息。

## 获取所有频道

`GET /v2/all-channels`

列出所有频道。无需参数。不支持分页。无需认证。

返回：包含以下属性的 `channels` 数组：

- `id` - 不可更改的唯一频道 ID（创建频道时称为 'Name'）
- `url` - 用于频道主 casts 的 FIP-2 `parentUrl`
- `name` - 显示给用户的友好名称（编辑频道时称为 'Display name'）
- `description` - 频道的描述（如有）
- `descriptionMentions` - 描述中提到的用户 fid 数组。多次提及会导致多个条目。
- `descriptionMentionsPositions` - 描述中被提及用户（来自 `descriptionMentions`）出现的索引位置。该数组始终与 `descriptionMentions` 大小相同。提及会插入到该索引处现有字符的左侧。
- `leadFid` - 创建频道的用户 fid（如有）
- `moderatorFids` - 频道管理员 fid 列表（新频道成员方案下）
- `createdAt` - 频道创建的 UNIX 时间（秒）
- `followerCount` - 关注频道的用户数
- `memberCount` - 频道成员数，包括所有者和管理员
- `pinnedCastHash` - 频道置顶 cast 的哈希值（如有）
- `publicCasting` - `true`/`false` 表示频道是否允许任何人发布内容，或仅限成员
- `externalLink` - 出现在 Warpcast 频道头部的外部链接（如有），包含 2 个属性：
  - `title` - 频道头部显示的标题
  - `url` - 链接地址

```json
{
  "result": {
    "channels": [
      {
        "id": "illustrations",
        "url": "https://warpcast.com/~/channel/illustrations",
        "name": "illustrations",
        "description": "分享你的作品、草图、艺术、发布、问候语、你喜爱或收藏的艺术品——所有与插画相关的内容，标记  加入 ⊹ ࣪ ˖ 封面由 ",
        "descriptionMentions": [
          367850,
          335503
        ],
        "descriptionMentionsPositions": [
          122,
          151
        ],
        "imageUrl": "https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/7721c951-b0ed-44ee-aa9c-c31507b69c00/original",
        "headerImageUrl": "https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/64efe955-c3ab-4aad-969d-1aed978a3e00/original",
        "leadFid": 367850,
        "moderatorFids": [
          367850
        ],
        "createdAt": 1709753166,
        "followerCount": 2361,
        "memberCount": 300,
        "pinnedCastHash": "0x3ef52987ccacd89af096a753c07efcd55a93e143",
        "publicCasting": false,
        "externalLink": {
          "title": "/creatorssupport",
          "url": "https://warpcast.com/~/channel/creators-support"
        }
      },
      ...
    ]
  }
}
```

示例：

```bash
curl 'https://api.warpcast.com/v2/all-channels'
```

## 获取单个频道

`GET /v1/channel`

获取单个频道。无需认证。

查询参数：

- `channelId` - 频道 ID

返回：单个频道对象，与"获取所有频道"端点文档相同。

```json
{
  "result": {
    "channel": {
      "id": "illustrations",
      "url": "https://warpcast.com/~/channel/illustrations",
      "name": "illustrations",
      "description": "分享你的作品、草图、艺术、发布、问候语、你喜爱或收藏的艺术品——所有与插画相关的内容，标记  加入 ⊹ ࣪ ˖ 封面由 ",
      "descriptionMentions": [367850, 335503],
      "descriptionMentionsPositions": [122, 151],
      "imageUrl": "https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/7721c951-b0ed-44ee-aa9c-c31507b69c00/original",
      "headerImageUrl": "https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/64efe955-c3ab-4aad-969d-1aed978a3e00/original",
      "leadFid": 367850,
      "moderatorFids": [367850],
      "createdAt": 1709753166,
      "followerCount": 2361,
      "memberCount": 300,
      "pinnedCastHash": "0x3ef52987ccacd89af096a753c07efcd55a93e143",
      "publicCasting": false,
      "externalLink": {
        "title": "/creatorssupport",
        "url": "https://warpcast.com/~/channel/creators-support"
      }
    }
  }
}
```

```bash
curl 'https://api.warpcast.com/v1/channel?channelId=illustrations'
```

## 获取频道关注者

`GET /v1/channel-followers`

列出频道的关注者。按关注时间降序排列。支持分页。无需认证。

查询参数：

- `channelId` - 频道 ID

返回：包含以下属性的 `users` 数组：

- `fid` - 用户 fid
- `followedAt` - 关注频道的 UNIX 时间（秒）

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

示例：

```bash
curl 'https://api.warpcast.com/v1/channel-followers?channelId=books'
```

## 获取用户关注的频道

`GET /v1/user-following-channels`

列出用户关注的所有频道。按关注时间降序排列。支持分页。无需认证。

参数：

- `fid` - 用户 fid

返回：包含以下属性的 `channels` 数组：

- 上述"获取所有频道"端点文档中的所有属性
- `followedAt` - 关注频道的 UNIX 时间（秒）

```json
{
  "result": {
    "channels": [
      {
        "id": "fc-updates",
        "url": "https://warpcast.com/~/channel/fc-updates",
        "name": "fc-updates",
        "description": "关于 Farcaster 重要事件的更新",
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

示例：

```bash
curl 'https://api.warpcast.com/v1/user-following-channels?fid=3'
```

## 获取用户关注频道状态

`GET /v1/user-channel`

检查用户是否关注某个频道。

查询参数：

- `fid` - 用户 fid
- `channelId` - 频道 ID

返回：2 个属性：

- `following` - 表示是否关注该频道
- `followedAt` - 关注频道的 UNIX 时间（秒）（可选，仅在已关注时出现）

```json
{
  "result": {
    "following": true,
    "followedAt": 1687943747
  }
}
```

示例：

```bash
curl 'https://api.warpcast.com/v1/user-channel?fid=3&channelId=books'
```

## 获取频道成员

`GET /fc/channel-members`

列出频道的成员。按成为成员的时间降序排列。支持分页。无需认证。

查询参数：

- `channelId` - 频道 ID
- `fid` - （可选）用于筛选的用户 fid

返回：`members` 数组：

- `fid` - 成员 fid
- `memberAt` - 成为成员的 UNIX 时间（秒）

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

示例：

```bash
curl 'https://api.warpcast.com/fc/channel-members?channelId=memes'
```

## 获取频道邀请

`GET /fc/channel-invites`

列出未处理的频道邀请。按邀请时间降序排列。支持分页。无需认证。

每个用户（`invitedFid`）和频道（`channelId`）最多有一个未处理的邀请。

查询参数：

- `channelId` - （可选）用于筛选的频道 ID
- `fid` - （可选）用于筛选的用户 fid

返回：`invites` 数组：

- `channelId` - 用户被邀请加入的频道 ID
- `invitedFid` - 被邀请用户的 fid
- `invitedAt` - 用户被邀请的 UNIX 时间（秒）
- `inviterFid` - 创建邀请的用户 fid
- `role` - 用户被邀请的角色，`member` 或 `moderator`

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

示例：

```bash
curl 'https://api.warpcast.com/fc/channel-invites?channelId=memes'
```

## 获取 Cast 管理操作

`GET /fc/moderated-casts`

列出管理操作。按操作时间降序排列。支持分页。无需认证。

查询参数：

- `channelId` - （可选）用于筛选的频道 ID

返回：`moderationActions` 数组：

- `castHash` - 被管理的 cast 哈希（包含 `0x` 前缀）
- `channelId` - cast 所在的频道 ID
- `action` - `hide` 或 `unhide`
- `moderatedAt` - 管理操作的 UNIX 时间（秒）

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

示例：

```bash
curl 'https://api.warpcast.com/fc/moderated-casts?channelId=welcome'
```

## 获取频道受限用户

`GET /fc/channel-restricted-users`

获取被限制通过邀请链接加入频道的用户（他们仍可被手动邀请）。用户在以下情况会自动进入此状态：被移除成员身份后，以及被解禁后。用户在以下情况会解除此状态：被邀请后（即使尚未接受/拒绝邀请），以及被禁言后。无法直接限制或解除限制用户。按限制时间降序排列。支持分页。无需认证。

**注意：**

- 受限用户的回复仍可在折叠下方查看
- 此端点仅返回当前受限的用户。如果用户曾被限制但随后被重新邀请或禁言，此端点将不再返回该条目。

查询参数：

- `channelId` - （可选）用于筛选的频道 ID
- `fid` - （可选）用于筛选的用户 fid

返回：`restrictedUsers` 数组：

- `fid` - 受限用户 fid
- `channelId` - 用户被限制加入的频道 ID
- `restrictedAt` - 限制开始的 UNIX 时间（秒）

```json
{
  "result": {
    "restrictedUsers": [
      {
        "fid": 1234,
        "channelId": "welcome",
        "restrictedAt": 1727767637
      },
      ...
    ]
  },
  "next": { "cursor": "..." }
}
```

示例：

```bash
curl 'https://api.warpcast.com/fc/channel-restricted-users?channelId=memes'
```

## 获取频道禁言用户

`GET /fc/channel-bans`

获取被频道禁言的用户。按禁言时间降序排列。支持分页。无需认证。

**注意：**

- 此端点仅返回当前有效的禁言。如果用户被解禁，此端点将不再返回该条目。

查询参数：

- `channelId` - （可选）用于筛选的频道 ID
- `fid` - （可选）用于筛选的用户 fid

返回：`bannedUsers` 数组：

- `fid` - 被禁言用户 fid
- `channelId` - 用户被禁言的频道 ID
- `bannedAt` - 禁言开始的 UNIX 时间（秒）

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

示例：

```bash
curl 'https://api.warpcast.com/fc/channel-bans?channelId=memes'
```

## 禁言频道用户

`POST /fc/channel-bans`

禁言频道用户。被禁言用户将无法回复频道 casts，其所有现有回复将被隐藏。需认证。

调用者必须是频道所有者或管理员。

请求体参数：

- `channelId` - 禁言用户的频道 ID
- `banFid` - 被禁言用户 fid

返回：

- `success: true`

示例：

```bash
curl -X POST \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <Auth Token>' \
  -d '{ "channelId": "memes", "banFid": 1234 }' \
  https://api.warpcast.com/fc/channel-bans
```

## 解禁频道用户

`DELETE /fc/channel-bans`

解禁频道用户。用户的所有现有回复将重新可见并可再次回复（显示在折叠下方）。用户将进入受限状态。需认证。

调用者必须是频道所有者或管理员。

请求体参数：

- `channelId` - 解禁用户的频道 ID
- `unbanFid` - 被
