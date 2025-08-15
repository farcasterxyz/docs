# Register ENS Name

A user can set their Farcaster username to an ENS name they own.

### Requirements

- An ETH wallet that owns the account on OP Mainnet. No ETH is required.
- A valid ENS name that resolves to the custody address of the Farcaster account, or a verified eth address in the
  Farcaster account.

### Register ENS Name

First, ensure the ENS name resolves to the custody address of the farcaster account. Or the resolved address is a
verified eth address in the Farcaster account. See [here](/developers/guides/writing/verify-address.md) for how to
verify an ETH address.

Then, generate an EIP-712 signature for the ENS name proof claim and submit the message. For more details on how to
create messages, see [this guide](/developers/guides/writing/messages.md).

```js
import {
  makeUserNameProofClaim,
  EIP712Signer,
  makeUsernameProof,
  FarcasterNetwork,
  makeUserDataAdd,
  UserNameType,
  UserDataType,
} from '@farcaster/hub-nodejs';

const accountKey: EIP712Signer = undefined; // Account Key for the custody/verified address (use appropriate subclass from hub-nodejs for ethers or viem)
const accountEd25519Key = undefined; // Private key for the farcaster account signer

const claim = makeUserNameProofClaim({
  name: 'farcaster.eth', // ENS name to register
  owner: '0x...', // Must be the public key of accountKey, and name must resolve to this address
  timestamp: Math.floor(Date.now() / 1000),
});
const signature = (
  await accountKey.signUserNameProofClaim(claim)
)._unsafeUnwrap();

const dataOptions = {
  fid: 123, // FID make the request
  network: FarcasterNetwork.MAINNET,
};
const signer = new NobleEd25519Signer(accountEd25519Key);
const usernameProofMessage = makeUsernameProof(
  {
    name: claim.name,
    owner: claim.owner,
    timestamp: claim.timestamp,
    fid: dataOptions.fid,
    signature: signature,
    type: UserNameType.USERNAME_TYPE_ENS_L1,
  },
  dataOptions,
  signer
);

// Submit the message to the node. Note that this only registers the name proof to the account, it does not change the username yet.
// await client.submitMessage(usernameProofMessage);

// Once it's accepted, you can set the username to the ENS name

const usernameMessage = makeUserData(
  {
    type: UserDataType.USERNAME,
    value: claim.name,
  },
  dataOptions,
  signer
);

// Submit the username message to the node
// await client.submitMessage(usernameMessage);
```
