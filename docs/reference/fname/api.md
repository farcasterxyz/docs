# FName Registry Server API Reference

The [Fname registry](https://github.com/farcasterxyz/fname-registry) server is hosted at https://fnames.farcaster.xyz

It's a simple HTTP service that's responsible for issuing and tracking fnames. All Fname changes are recorded as a
transfer.
Registering an fname is a transfer from FID 0 to the user's fid. Transferring an fname is a transfer from the user's fid
to another fid. Unregistering an fname is a transfer from the user's fid to fid 0.

::: warning Registering an fname

Note, when registering a new fname, calling this api is not sufficient. This only reserves the name to your fid. You
must also submit a [UserDataAdd](/reference/hubble/datatypes/messages#_2-userdata) message to the hub
to set this name as your username.

:::

### Get Transfer History

To get a history of all transfers, make a GET request to `/transfers`

```bash
curl https://fnames.farcaster.xyz/transfers | jq
```

It also accepts the following query parameters:

- `from_id` - The transfer id to start from for pagination
- `name` - The fname to filter by
- `fid` - The fid (either from or to) to filter by
- `from_ts` - The timestamp (in seconds) to start from for pagination

### Get current fname or fid

To get the most recent transfer event for an fid or fname, make a GET request to `/transfers/current`

e.g. To determine the fid of `@farcaster`, make the following call and use the value from the `to` field in the return
value

```bash
curl https://fnames.farcaster.xyz/transfers?name=farcaster | jq
```

To determine the fname of fid `1`, make the following call and use the value from the `username` field in the return
value

```bash
curl https://fnames.farcaster.xyz/transfers?fid=1 | jq
```

Both will return the same transfers object:

```json
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

### Register or transfer an fname

To register a new fid, e.g. `hubble`, first make sure the fname is not already registered.

Then make a POST request to `/transfers` with the following body:

```yaml
{
  "name": "hubble", // Name to register
  "from": 0,  // Fid to transfer from (0 for a new registration)
  "to": 123, // Fid to transfer to (0 to unregister)
  "fid": 123, // Fid making the request (must match from or to)
  "owner": "0x...", // Custody address of fid making the request
  "timestamp": 1641234567,  // Current timestamp in seconds
  "signature": "0x..."  // EIP-712 signature signed by the custody address of the fid
}
```

To generate the EIP-712 signature, use the following code:

```js
import { makeUserNameProofClaim, EIP712Signer } from '@farcaster/hub-nodejs';

const accountKey: EIP712Signer = undefined; // Account key for the custody address (use appropriate subclass from hub-nodejs for ethers or viem)

const claim = makeUserNameProofClaim({
  name: 'hubble',
  owner: '0x...',
  timestamp: Math.floor(Date.now() / 1000),
});
const signature = (
  await accountKey.signUserNameProofClaim(claim)
)._unsafeUnwrap();
```

This is the exact same kind of signature used in the ENS UsernameProofs provided to hubs to prove ownership of an ENS
name.

e.g.

```bash
curl -X POST https://fnames.farcaster.xyz/transfers \
  -H "Content-Type: application/json" \
  -d \
'{"name": "hubble", "owner": "0x...", "signature": "0x...", "from": 0, "to": 1000, "timestamp": 1641234567, fid: 1000}'
```

Once a name is registered, it still needs a [UserData](/reference/hubble/datatypes/messages#_2-userdata) message
to be sent to the hub in order to actually
set the username for the user. See examples in
the [hub-nodejs](https://github.com/farcasterxyz/hub-monorepo/tree/main/packages/hub-nodejs/examples/hello-world) repo.
