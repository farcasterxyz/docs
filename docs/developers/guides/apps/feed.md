# Generate a chronological feed for a user

This example will showcase how to read data from the Farcaster network using the
official [hub-nodejs](https://github.com/farcasterxyz/hub-monorepo/tree/main/packages/hub-nodejs) in typescript.

We will create a simple feed of casts from a list of FIDs and display them in reverse chronological order.

## Installation

Create an empty typescript project and install the hub-nodejs package

```bash
yarn add @farcaster/hub-nodejs
```

## 1. Create a client

First, let's set up some constants and create a client to connect to the hub.

```typescript
import { getSSLHubRpcClient } from '@farcaster/hub-nodejs';

/**
 * Populate the following constants with your own values
 */

const HUB_URL = 'hoyt.farcaster.xyz:2283'; // URL of the Hub
const FIDS = [2, 3]; // User IDs to fetch casts for

// const client = getInsecureHubRpcClient(HUB_URL); // Use this if you're not using SSL
const client = getSSLHubRpcClient(HUB_URL);
```

## 2. Cache the fnames for the FIDs

Query the UserData for the provided FIDs, so we can show friendly usernames. Cache them for later.

```typescript
// Create a mapping of fids to fnames, which we'll need later to display messages
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

## 3. Fetch top level casts

Query the hub for all casts for each FID, sorted in reverse chronological order and then filter to only the top level
casts.

```typescript
/**
 * Returns a user's casts which are not replies to any other casts in reverse chronological order.
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
  // Coerce Messages into Casts, should not actually filter out any messages
  const casts = result.value.messages.filter(isCastAddMessage);
  return ok(casts.filter((message) => !message.data.castAddBody.parentCastId));
};

// Fetch primary casts for each fid
const castResultPromises = FIDS.map((fid) => getPrimaryCastsByFid(fid, client));
const castsResult = Result.combine(await Promise.all(castResultPromises));

if (castsResult.isErr()) {
  console.error('Fetching casts failed');
  console.error(castsResult.error);
  return;
}
```

## 4. Function to pretty print a cast

The raw cast data is not very readable. We'll write a function to convert the timestamp to a human readable format, and
also resolve any mentions (only stored as fids and their location within the cast) to their fnames.

```typescript
const castToString = async (
  cast: CastAddMessage,
  nameMapping: Map<number, string>,
  client: HubRpcClient
) => {
  const fname = nameMapping.get(cast.data.fid) ?? `${cast.data.fid}!`; // if the user doesn't have a username set, use their FID

  // Convert the timestamp to a human readable string
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

  // Remove newlines from the message text
  const textNoLineBreaks = textWithMentions.replace(/(\r\n|\n|\r)/gm, ' ');

  return `${fname}: ${textNoLineBreaks}\n${dateString}\n`;
};
```

## 5. Sort and print the casts

Finally, we can sort the casts by timestamp again (so they are interleaved correctly) and print them out.

```typescript
/**
 * Compares two CastAddMessages by timestamp, in reverse chronological order.
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

const sortedCasts = castsResult.value.flat().sort(compareCasts); // sort casts by timestamp
const stringifiedCasts = await Promise.all(
  sortedCasts.map((c) => castToString(c, fidToFname, client))
); // convert casts to printable strings

for (const outputCast of stringifiedCasts) {
  console.log(outputCast);
}
```

## Full example

See full example [here](https://github.com/farcasterxyz/hub-monorepo/tree/main/packages/hub-nodejs/examples/chron-feed)
