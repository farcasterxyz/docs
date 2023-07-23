# Contracts

Farcaster implements three contracts on the Goerli Ethereum testnet to manage identities:

| Contract       | Address                                                                                                                      |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| IdRegistry     | [0xda107a1caf36d198b12c16c7b6a1d1c795978c42](https://goerli.etherscan.io/address/0xda107a1caf36d198b12c16c7b6a1d1c795978c42) |
| NameRegistry   | [0xe3be01d99baa8db9905b33a3ca391238234b79d1](https://goerli.etherscan.io/address/0xe3be01d99baa8db9905b33a3ca391238234b79d1) |
| BundleRegistry | [0xdb647193df79ce69b5d34549aae98d519223f682](https://goerli.etherscan.io/address/0xdb647193df79ce69b5d34549aae98d519223f682) |

The source code can be viewed [here](https://github.com/farcasterxyz/contracts). On testnet, registration is managed by a single address controlled by the Farcaster team. Registration will be open to everyone when the contracts launch on mainnet.

## Id Registry

The ID Registry contract issues Farcaster IDs or fids to users.

An fid is a number like `234324` which is owned by an Ethereum address. An address can only own a single fid at a time, but fids can be transferred between addresses. The address that currently owns an fid is known as the `custody address` and can sign messages on behalf of the fid.

Ownership of fids is fully decentralized and they never expire. The contract is non-upgradeable and there are no admin functions to revoke fids once issues.

## Name Registry

The Name Registry contract issues Farcaster names or fnames to users.

An fname is a username like `alice` which is owned by an Ethereum address. They are ERC-721 tokens that can be transferred between addresses. Fnames can be up to 16 characters including lowercase letters, numbers and hyphens. Fnames can be registered for one year at a time and must be renewed by paying a fee.

Fnames are optional, cosmetic identifiers for the Farcaster network to make fids easily addressable. Ownership is not fully decentralized and they are subject to a username policy.

## Bundle Registry

The Bundle Registry is a contract that allows registering an fid an fname in a single transaction to lower gas fees. It is a convenience contract that is designed for use on testnet where registration is managed by the Farcaster team.
