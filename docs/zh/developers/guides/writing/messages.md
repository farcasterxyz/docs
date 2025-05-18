# 创建消息

消息代表用户执行的操作（例如 Alice 发送了"hello world"）

消息有多种类型，本教程将介绍最常见的几种。其他教程会涵盖更高级的消息类型。

## 准备工作

你需要：

- 对 hubble 实例的写入权限
- 已注册到 fid 的签名者私钥
- 导入如下所示的 `hub-nodejs` 和辅助函数

```ts
import {
  makeCastAdd,
  makeCastRemove,
  makeLinkAdd,
  makeLinkRemove,
  makeReactionAdd,
  makeReactionRemove,
  makeUserDataAdd,
  NobleEd25519Signer,
  FarcasterNetwork,
} from '@farcaster/hub-nodejs';

const ACCOUNT_PRIVATE_KEY: Hex = '0x...'; // 你的账户私钥
const FID = -1; // 你的 fid
const ed25519Signer = new NobleEd25519Signer(ACCOUNT_PRIVATE_KEY);
const dataOptions = {
  fid: FID,
  network: FC_NETWORK,
};
const FC_NETWORK = FarcasterNetwork.MAINNET;
```

## Casts（广播消息）

Casts 是用户创建的公开消息。

通过发送包含文本内容及可选嵌入内容、提及和表情的 CastAdd 消息来创建 cast。以下示例展示了一个简单 cast 的创建过程。

```typescript
const cast = await makeCastAdd(
  {
    text: '这是一条广播消息！', // 文本最长可达 320 字节
    embeds: [],
    embedsDeprecated: [],
    mentions: [],
    mentionsPositions: [],
  },
  dataOptions,
  ed25519Signer
);
```

可以通过发送带有 CastAdd 消息哈希和更晚时间戳的 CastRemove 消息来删除 cast。

```typescript
const castRemove = await makeCastRemove(
  {
    targetHash: castReplyingToAUrl._unsafeUnwrap().hash,
  },
  dataOptions,
  ed25519Signer
);
```

要创建包含嵌入内容、提及、频道表情的 casts，请参阅 [casts](../writing/casts.md) 教程。

## 互动（Reactions）

互动是用户与 cast 之间的强类型关系（例如点赞）。

用户通过发送类型设为 `like` 且目标设为 cast 哈希及其作者 fid 的 ReactionAdd 消息来"点赞"一条 cast。

```typescript
const reactionAdd = await makeReactionAdd(
  {
    type: ReactionType.LIKE,
    targetCastId: { fid: createdCast.data.fid, hash: createdCast.hash },
  },
  dataOptions,
  ed25519Signer
);
```

可以通过广播带有相同信息和更晚时间戳的 ReactionRemove 消息来取消点赞。

```typescript
const reactionRemove = await makeReactionRemove(
  {
    type: ReactionType.LIKE,
    targetCastId: { fid: createdCast.data.fid, hash: createdCast.hash },
  },
  dataOptions, // 必须提供更高的时间戳
  ed25519Signer
);
```

用户可以通过非常相似的过程进行"转发"（recast）。

```typescript
const recastAdd = await makeReactionAdd(
  {
    type: ReactionType.RECAST,
    targetCastId: { fid: createdCast.data.fid, hash: createdCast.hash },
  },
  dataOptions,
  ed25519Signer
);

const recastRemove = await makeReactionRemove(
  {
    type: ReactionType.RECAST,
    targetCastId: { fid: createdCast.data.fid, hash: createdCast.hash },
  },
  dataOptions,
  ed25519Signer
);
```

## 用户数据（User Data）

UserData 是一组强类型消息，代表用户的元数据（例如个人简介、头像）。

`UserData` 消息包含一个类型和一个可设置的字符串值。以下示例展示了用户更新其个人简介。

```typescript
// 更新用户简介。其他字段类似，只需更改类型。值始终为字符串。
const bioUpdate = await makeUserDataAdd(
  {
    type: UserDataType.BIO,
    value: '新简介',
  },
  dataOptions,
  ed25519Signer
);
```

## 链接（Links）

链接是用户之间的松散类型关系（例如 Alice 关注 Bob）。

用户通过发送带有字符串类型和目标用户 fid 的 LinkAdd 消息来创建链接。所有客户端最常支持的链接类型是'follow'（关注）。

```typescript
const follow = await makeLinkAdd(
  {
    type: 'follow',
    targetFid: 1,
  },
  dataOptions,
  ed25519Signer
);

const unfollow = await makeLinkRemove(
  {
    type: 'unfollow',
    targetFid: 1,
  },
  dataOptions,
  ed25519Signer
);
```
