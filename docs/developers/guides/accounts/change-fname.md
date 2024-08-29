# Change Farcaster name

A user can change their off-chain ENS name or Fname without affecting their account's history. This can be done at most once in 28 days.

::: warning

- Fnames may be revoked if you violate the [usage policy](/learn/architecture/ens-names#offchain-ens-names-fnames).
- Apps may lower your reputation if you change Fnames often.
  :::

### Requirements

- An ETH wallet that owns the account on OP Mainnet. No ETH is required.

### Change username

To transfer an Fname, e.g. `Hubble`, make a POST request to `/transfers` with the following body:

```yaml
{
  "name": "hubble", // Name to transfer
  "from": 123,  // FID to transfer from
  "to": 321, // FID to transfer to
  "fid": 123, // FID making the request (must match from)
  "owner": "0x...", // Custody address of FID making the request
  "timestamp": 1641234567,  // Current timestamp in seconds
  "signature": "0x..."  // EIP-712 signature signed by the custody address of the FID
}
```

To generate the EIP-712 signature, use the following code:

```js
import { makeUserNameProofClaim, EIP712Signer } from '@farcaster/hub-nodejs';

const accountKey: EIP712Signer = undefined; // Account Key for the custody address (use appropriate subclass from hub-nodejs for ethers or viem)

const claim = makeUserNameProofClaim({
  name: 'hubble',
  owner: '0x...',
  timestamp: Math.floor(Date.now() / 1000),
});
const signature = (
  await accountKey.signUserNameProofClaim(claim)
)._unsafeUnwrap();
```

Example request via curl:

```bash
curl -X POST https://fnames.farcaster.xyz/transfers \
  -H "Content-Type: application/json" \
  -d \
'{"name": "hubble", "owner": "0x...", "signature": "0x...", "from": 123, "to": 321, "timestamp": 1641234567, fid: 123}'
```

See [here](/reference/fname/api.md) for more details on the Fname registry API.
