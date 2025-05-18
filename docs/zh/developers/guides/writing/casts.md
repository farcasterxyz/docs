# 创建广播

[消息](./messages.md)教程中已涵盖创建简单广播的内容。本教程将介绍高级主题，如提及、嵌入内容、表情符号、回复和频道。

## 设置

- 参见[创建消息](./messages.md)中的设置说明

## 提及

用户可以通过@用户名提及（例如"你好 @bob！"）在广播中被标记，这会触发客户端发送通知。

提及不会直接包含在广播文本中。目标 fid 和提及在文本中的位置通过`mentions`和`mentionPositions`数组指定，客户端在渲染时会将它们填充到广播中。

```typescript
/**
 * "@dwr 和 @v 是 @farcaster 的忠实粉丝"
 */
const castWithMentions = await makeCastAdd(
  {
    text: ' 和  是  的忠实粉丝',
    embeds: [],
    embedsDeprecated: [],
    mentions: [3, 2, 1],
    mentionsPositions: [0, 5, 22], // 以字节为单位的位置（非字符）
  },
  dataOptions,
  ed25519Signer
);
```

## 嵌入内容

URL 可以被嵌入到广播中，指示客户端渲染预览。

一条广播最多可包含 2 个嵌入内容，每个最长 256 字节。嵌入内容不进行其他验证。

```typescript
/**
 * 包含提及和附件的广播
 *
 * "嘿 @dwr，看看这个！"
 */
const castWithMentionsAndAttachment = await makeCastAdd(
  {
    text: '嘿，看看这个！',
    embeds: [{ url: 'https://farcaster.xyz' }],
    embedsDeprecated: [],
    mentions: [3],
    mentionsPositions: [4],
  },
  dataOptions,
  ed25519Signer
);
```

## 表情符号

表情符号可以直接包含在广播文本中，并由客户端渲染。

由于一个表情符号字符通常占用多个字节但显示为单个字符，这会影响提及位置和广播长度的计算方式。

```typescript
/**
 * 包含表情符号和提及的广播
 *
 * "🤓@farcaster 可以在表情符号后立即提及"
 */
const castWithEmojiAndMentions = await makeCastAdd(
  {
    text: '🤓 可以在表情符号后立即提及',
    embeds: [],
    embedsDeprecated: [],
    mentions: [1],
    mentionsPositions: [4],
  },
  dataOptions,
  ed25519Signer
);
```

## 回复

广播可以是对另一条广播、URL 或 NFT 的回复。对另一条广播的回复被视为线程，而对 URL 或 NFT 的回复可被视为评论或[频道](#channels)。

可选的 parentUrl 属性可以设置为 URL 或所回复广播的 fid-hash 值，如下例所示。有关回复类型的更多详情，请参阅[FIP-2](https://github.com/farcasterxyz/protocol/discussions/71)。

```typescript
/**
 * 回复URL的广播
 *
 * "我认为这是个很棒的协议 🚀"
 */
const castReplyingToAUrl = await makeCastAdd(
  {
    text: '我认为这是个很棒的协议 🚀',
    embeds: [],
    embedsDeprecated: [],
    mentions: [],
    mentionsPositions: [],
    parentUrl: 'https://www.farcaster.xyz/',
  },
  dataOptions,
  ed25519Signer
);
```

## 频道

广播可以发送到频道中，这指示客户端它与特定主题相关。客户端可以选择以不同方式使用此元数据，例如将频道广播分组或向特定用户推荐。

频道本质上是一个`parentURL`，可以是 URL 或 NFT，所有客户端通过松散共识将其识别为频道。目前协议层面尚未就频道列表达成一致，但可以使用复制器数据库中的`casts`表获取常用频道列表。

```sql
/* 查询频道列表 */
select parent_url,
       count(*) as count
from casts
where parent_url is not null
group by parent_url
order by count desc;
```

```typescript
// 发送到Farcaster频道的广播
const channelCast = await makeCastAdd(
  {
    text: '我爱farcaster',
    embeds: [],
    embedsDeprecated: [],
    mentions: [],
    mentionsPositions: [],
    parentUrl: 'https://www.farcaster.xyz/', // 此为示例，并非实际频道URL
  },
  dataOptions,
  ed25519Signer
);
```
