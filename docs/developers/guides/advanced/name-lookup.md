# Lookup account by name

::: info Pre-requisites

- Read access to a replicator database

:::

The hub itself does not directly index names to fids. So we need to use alternate methods to determine the fid for a
username. There are two ways to look up the fid of an account,

## Using the Fname registry

If the username is a farcaster username (does not end with .eth), then you can query the FName
registry like so:

```bash
curl https://fnames.farcaster.xyz/transfers/current?name=farcaster | jq
{
  "transfers": [
    {
      "id": 1,
      "timestamp": 1628882891,
      "username": "farcaster",
      "owner": "0x8773442740c17c9d0f0b87022c722f9a136206ed",
      "from": 0,
      "to": 1,
      "user_signature": "0xa6fdd2a69deab5633636f32a30a54b21b27dff123e6481532746eadca18cd84048488a98ca4aaf90f4d29b7e181c4540b360ba0721b928e50ffcd495734ef8471b",
      "server_signature": "0xb7181760f14eda0028e0b647ff15f45235526ced3b4ae07fcce06141b73d32960d3253776e62f761363fb8137087192047763f4af838950a96f3885f3c2289c41b"
    }
  ]
}
```

This will return the most recent transfer associated with the name if it is registered. The `to` field indicates the
current fid that owns the name.

See [here](/reference/fname/api#get-current-fname-or-fid) for more details on the Fname registry API.

## Using the replicator database

For ENS names, the easiest way to look up the fid is to query the `fnames` table in the replicator database. This is
also applicable to fnames.

```sql
SELECT username, fid
FROM fnames
WHERE username = 'farcaster.eth'
order by updated_at desc
limit 1;
```

See [here](/reference/replicator/schema#fnames) for more details on the table schema.


