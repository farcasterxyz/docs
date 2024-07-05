# FAQ

## Signatures

### How do I generate an EIP-712 signature?

See the contract reference docs for documentation on each EIP-712 signature, including Typescript [code examples](/reference/contracts/reference/id-gateway#register-signature).

If you're using Typescript/JS, the [`@farcaster/hub-web`](https://www.npmjs.com/package/@farcaster/hub-web) package includes tools for generating and working with EIP-712 signatures. To ensure you're using the correct addresses and typehashes, we recommend importing the ABIs and EIP-712 types from the [contracts module](https://github.com/farcasterxyz/hub-monorepo/tree/main/packages/core/src/eth/contracts) or using the provided [`Eip712Signer`](https://github.com/farcasterxyz/hub-monorepo/blob/main/packages/core/src/signers/eip712Signer.ts) helper.

See the "Working with EIP-712 signatures" [example app](https://github.com/farcasterxyz/hub-monorepo/tree/main/packages/hub-nodejs/examples/contract-signatures) in the hub monorepo for a reference that demonstrates each signature and contract call.

### How can I debug an invalid EIP-712 signature?

To help debug EIP-712 signing, every contract that uses EIP-712 signatures exposes its [domain separator](https://optimistic.etherscan.io/address/0x00000000fc25870c6ed6b6c7e41fb078b7656f69#readContract#F3) and typehashes as [constants](https://optimistic.etherscan.io/address/0x00000000fc25870c6ed6b6c7e41fb078b7656f69#readContract#F1) along with a [hashTypedDataV4](https://optimistic.etherscan.io/address/0x00000000fc25870c6ed6b6c7e41fb078b7656f69#readContract#F6) helper view. If you're constructing signatures in Solidity or another low level language, you can use these to help debug.

## Reference

### Where is the full contract source code?

The contracts repo is on Github [here](https://github.com/farcasterxyz/contracts).

### Where do I get contract ABIs?

Find contract ABIs and deployment addresses [here](/reference/contracts/deployments#abis).

### Where can I find audit reports?

Past audit reports are linked from the [contracts repo](https://github.com/farcasterxyz/contracts/blob/1aceebe916de446f69b98ba1745a42f071785730/README.md#audits).

### Are the Farcaster contracts deployed to a testnet?

No. Consider using [network forking](https://book.getfoundry.sh/tutorials/forking-mainnet-with-cast-anvil) to test or develop against the OP mainnet contracts.

## Data

### How do I find a user’s custody address?

Call the [`custodyOf`](https://optimistic.etherscan.io/address/0x00000000fc6c5f01fc30151999387bb99a9f489b#readContract#F5) function on the [IdRegistry](/reference/contracts/reference/id-registry.md).

### How do I find a user’s recovery address?

Call the [`recoveryOf`](https://optimistic.etherscan.io/address/0x00000000fc6c5f01fc30151999387bb99a9f489b#readContract#F23) function on the [IdRegistry](/reference/contracts/reference/id-registry.md).

### How do I find an account’s fid?

Call the [`idOf`](https://optimistic.etherscan.io/address/0x00000000fc6c5f01fc30151999387bb99a9f489b#readContract#F14) function on the [IdRegistry](/reference/contracts/reference/id-registry.md).

### How do I look up the account keys for my fid?

Call the [`keysOf`](https://optimistic.etherscan.io/address/0x00000000fc1237824fb747abde0ff18990e59b7e#readContract#F16) function on the [KeyRegistry](/reference/contracts/reference/key-registry.md).

## Other

### What is an app fid? How do I get one?

**What is an FID?**

An FID (Farcaster ID) is a unique identifier used to distinguish applications and users. With an FID, apps and users can be identified and differentiated.

**Why is an FID necessary?**

To create or post anything on the Farcaster platform, an FID is essential for identifying your app or user.

**How do I get one?**

You can register an app fid directly through the [Bundler](/reference/contracts/reference/bundler.md) or [IdGateway](/reference/contracts/reference/id-gateway.md), or use a Farcaster client to register an account for your app. Since you'll need to sign [key request metadata](/reference/contracts/reference/signed-key-request-validator.md) from the wallet that owns your app fid, keep the private key secure.
