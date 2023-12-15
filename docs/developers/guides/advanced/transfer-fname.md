# Change your farcaster name

::: info Pre-requisites

- An Ethereum wallet containing an fid on Optimism mainnet. No ETH is required.

:::

::: warning Fname policies
To prevent abuse, fnames can only be changed once in 28 days. See Fname
policies [here](/learn/architecture/ens-names.html#offchain-ens-names-fnames). ENS names do not have this restriction.
:::

To transfer an fname, e.g. `hubble`, make a POST request to `/transfers` with the following body:

```yaml
{
  "name": "hubble", // Name to transfer
  "from": 123,  // Fid to transfer from
  "to": 321, // Fid to transfer to
  "fid": 123, // Fid making the request (must match from)
  "owner": "0x...", // Custody address of fid making the request
  "timestamp": 1641234567,  // Current timestamp in seconds
  "signature": "0x..."  // EIP-712 signature signed by the custody address of the fid
}
```

To generate the EIP-712 signature, use the following code:

```js
import { makeUserNameProofClaim, EIP712Signer } from '@farcaster/hub-nodejs';

const signer: EIP712Signer = undefined; // Signer for the custody address (use appropriate subclass from hub-nodejs for ethers or viem)

const claim = makeUserNameProofClaim({
  name: 'hubble',
  owner: '0x...',
  timestamp: Math.floor(Date.now() / 1000),
});
const signature = (await signer.signUserNameProofClaim(claim))._unsafeUnwrap();
```

Example request via curl:

```bash
curl -X POST https://fnames.farcaster.xyz/transfers \
  -H "Content-Type: application/json" \
  -d \
'{"name": "hubble", "owner": "0x...", "signature": "0x...", "from": 123, "to": 321, "timestamp": 1641234567, fid: 123}'
```

See [here](/reference/fname/api.md) for more details on the Fname registry API.