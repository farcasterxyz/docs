# 为用户生成按时间排序的内容流

本示例将展示如何使用官方 [hub-nodejs](https://github.com/farcasterxyz/hub-monorepo/tree/main/packages/hub-nodejs) 在 TypeScript 中从 Farcaster 网络读取数据。

我们将从一个 FID 列表中创建一个简单的 casts 内容流，并按时间倒序显示它们。

## 安装

创建一个空的 TypeScript 项目并安装 hub-nodejs 包

```bash
yarn add @farcaster/hub-nodejs
```

## 1. 创建客户端

首先，设置一些常量并创建一个客户端来连接到 hub。

```typescript
import { getSSLHubRpcClient } from '@farcaster/hub-nodejs';

/**
 * 用你自己的值填充以下常量
 */

const HUB_URL = 'hoyt.farcaster.xyz:2283'; // Hub 的 URL
const FIDS = [2, 3]; // 要获取 casts 的用户 ID

// const client = getInsecureHubRpcClient(HUB_URL); // 如果不使用 SSL，请使用这个
const client = getSSLHubRpcClient(HUB_URL);
```

## 2. 缓存 FID 对应的 fnames

查询提供的 FID 的 UserData，以便我们可以显示友好的用户名。将它们缓存起来以备后用。

```typescript
// 创建一个 fid 到 fname 的映射，稍后我们需要用它来显示消息
const fidToFname = new Map<number, string>();

const fnameResultPromises = FIDS.map((fid) =>
  client.getUserData({ fid, userDataType: UserDataType.USERNAME })
);
const fnameResults = await Promise.all(fnameResultPromises);

fnameResults.map((result) =>
  result.map((uData) => {
    if (isUserDataAddMessage(uData)) {
      const fid = uData.data.fid;
      const fname = uData.data.userDataBody.value;
      fidToFname.set(fid, fname);
    }
  })
);
```

## 3. 获取顶级 casts

向 hub 查询每个 FID 的所有 casts，按时间倒序排序，然后筛选出仅顶级 casts。

```typescript
/**
 * 返回用户未回复任何其他 casts 的 casts，按时间倒序排列。
 */
const getPrimaryCastsByFid = async (
  fid: number,
  client: HubRpcClient
): HubAsyncResult<CastAddMessage[]> => {
  const result = await client.getCastsByFid({
    fid: fid,
    pageSize: 10,
    reverse: true,
  });
  if (result.isErr()) {
    return err(result.error);
  }
  // 将 Messages 强制转换为 Casts，实际上不应过滤掉任何消息
  const casts = result.value.messages.filter(isCastAddMessage);
  return ok(casts.filter((message) => !message.data.castAddBody.parentCastId));
};

// 为每个 fid 获取主要 casts
const castResultPromises = FIDS.map((fid) => getPrimaryCastsByFid(fid, client));
const castsResult = Result.combine(await Promise.all(castResultPromises));

if (castsResult.isErr()) {
  console.error('获取 casts 失败');
  console.error(castsResult.error);
  return;
}
```

## 4. 美化输出 cast 的函数

原始 cast 数据不太易读。我们将编写一个函数将时间戳转换为人类可读的格式，并将任何提及（仅存储为 fids 及其在 cast 中的位置）解析为它们的 fnames。

```typescript
const castToString = async (
  cast: CastAddMessage,
  nameMapping: Map<number, string>,
  client: HubRpcClient
) => {
  const fname = nameMapping.get(cast.data.fid) ?? `${cast.data.fid}!`; // 如果用户没有设置用户名，使用他们的 FID

  // 将时间戳转换为人类可读的字符串
  const unixTime = fromFarcasterTime(cast.data.timestamp)._unsafeUnwrap();
  const dateString = timeAgo.format(new Date(unixTime));

  const { text, mentions, mentionsPositions } = cast.data.castAddBody;
  const bytes = new TextEncoder().encode(text);

  const decoder = new TextDecoder();
  let textWithMentions = '';
  let indexBytes = 0;
  for (let i = 0; i < mentions.length; i++) {
    textWithMentions += decoder.decode(
      bytes.slice(indexBytes, mentionsPositions[i])
    );
    const result = await getFnameFromFid(mentions[i], client);
    result.map((fname) => (textWithMentions += fname));
    indexBytes = mentionsPositions[i];
  }
  textWithMentions += decoder.decode(bytes.slice(indexBytes));

  // 从消息文本中移除换行符
  const textNoLineBreaks = textWithMentions.replace(/(\r\n|\n|\r)/gm, ' ');

  return `${fname}: ${textNoLineBreaks}\n${dateString}\n`;
};
```

## 5. 排序并打印 casts

最后，我们可以再次按时间戳对 casts 进行排序（以便它们正确交错）并打印出来。

```typescript
/**
 * 按时间戳比较两个 CastAddMessages，按时间倒序排列。
 */
const compareCasts = (a: CastAddMessage, b: CastAddMessage) => {
  if (a.data.timestamp < b.data.timestamp) {
    return 1;
  }
  if (a.data.timestamp > b.data.timestamp) {
    return -1;
  }
  return 0;
};

const sortedCasts = castsResult.value.flat().sort(compareCasts); // 按时间戳排序 casts
const stringifiedCasts = await Promise.all(
  sortedCasts.map((c) => castToString(c, fidToFname, client))
); // 将 casts 转换为可打印的字符串

for (const outputCast of stringifiedCasts) {
  console.log(outputCast);
}
```

## 完整示例

查看完整示例 [这里](https://github.com/farcasterxyz/hub-monorepo/tree/main/packages/hub-nodejs/examples/chron-feed)
