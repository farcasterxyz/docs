# Replicate Hubble data to Postgres

::: info Pre-requisites

- Hubble instance running locally (for better performance) or remotely

:::

While some applications can be written by directly querying hubble, most serious applications need to access the data
in a more structured way.

Hubble comes with a [replication app](https://github.com/farcasterxyz/hub-monorepo/tree/main/apps/replicator) that can
be used to mirror Hubble's data to a Postgres DB for convenient access to the underlying data.

## Installation

```bash
# Run the following script and answer the prompts
curl -sSL https://download.farcaster.xyz/bootstrap-replicator.sh | bash
```

Once the Docker images have finished downloading, you should start to see messages like:

```
[13:24:18.141] INFO (73940): Backfill 13.42% complete. Estimated time remaining: 46 minutes, 41 seconds
[13:24:23.228] INFO (73940): Backfill 13.52% complete. Estimated time remaining: 46 minutes, 50 seconds
[13:24:28.389] INFO (73940): Backfill 13.60% complete. Estimated time remaining: 47 minutes, 3 seconds
[13:24:33.502] INFO (73940): Backfill 13.71% complete. Estimated time remaining: 47 minutes, 10 seconds
```

First time sync can take a couple of hours to a day, depending on how powerful your machine is.

## Connecting to postgres

```bash
cd ~/replicator
# Via docker
docker compose exec postgres psql -U replicator replicator
# Or directly, using the default port for the replicator docker container
psql -U replicator -h localhost -p 6541 replicator
```

## Querying the data

Get the 10 most recents casts for a user

```sql
select timestamp, text, mentions, mentions_positions, embeds
from casts
where fid = 1
order by timestamp desc
limit 10;
```

## Schema

For more information on the schema, see the [replicator schema](/reference/replicator/schema).
