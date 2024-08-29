# Find account by username

If you have a user's name and want to find their account, you'll need to use one of these methods depending on what type of username they have.

## Off-chain ENS Names (Fnames)

If the user has an off-chain ENS name like `@alice`, you'll need to call the [Fname Registry](/reference/fname/api#get-current-fname-or-fid).

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

This returns the most recent transfer associated with the name if it is registered. Note that the creation of an Fname is a transfer from the zero address to the custody address. The `to` field indicates the current FID that owns the name.

## On-chain ENS Names

If the user has an on-chain ENS name like `@alice.eth`, the easiest way to do it is with the Hubble [replicator](../apps/replicate.md). It indexes on-chain and off-chain data and lets you easily find what you're looking for.

Once you have it set up, query the `fnames` table in the replicator database for the account's FID:

```sql
SELECT username, fid
FROM fnames
WHERE username = 'farcaster.eth'
order by updated_at desc
limit 1;
```

See [here](/reference/replicator/schema#fnames) for more details on the replicator table schema.
