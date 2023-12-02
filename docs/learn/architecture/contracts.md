# Registry Contracts

Registry contracts on Optimism Mainnet manage account identities, signers, and storage. There are three primary
contracts:

- **Id Registry** - issues fids to create new accounts
- **Storage Registry** - tracks how much storage each account has
- **Key Registry** - lets accounts register message signers

The contracts are designed to be simple, non-upgradeable, and have a limited lifespan. The contracts are deployed in a
trusted mode where only Farcaster can register new accounts. After a testing period, they are made permissionless so
that anyone can register an account. This change cannot be undone.

![Registry Contracts](/assets/registry-contracts.png)

### Id Registry

The Id Registry issues new Farcaster accounts to Ethereum addresses. A user can make a transaction to acquire a unique,
numeric identifier for the address called a Farcaster ID or fid. An address can hold one fid at a time but can transfer
them freely. Accounts may specify a recovery address, which can transfer the fid at any time.

### Storage Registry

The Storage Registry rents out storage units to accounts for a yearly fee. Accounts must have at least one storage unit
to publish messages on Farcaster. Storage prices are set by the contract in USD but must be paid in ETH. A Chainlink
oracle determines the exchange rate which is updated at most once in 24 hours. The price, exchange rate, available units
and size of each unit are controlled by Farcaster and vary based on supply and demand.

### Key Registry

The Key Registry lets accounts register a signer that can write messages on their behalf. Signers can be added or
removed at any time, though they cannot be added back once removed. A signer can be added to multiple accounts. Signers
are Ed25519 public keys and must come with a signature from the requestor, which is the account that requested the key.
This can be the user's account or that of an app that wants to operate on the user's behalf.

### Deployments

| Contract        | Address                                                                                                                          |
|-----------------|----------------------------------------------------------------------------------------------------------------------------------|
| IdRegistry      | [0x00000000fcaf86937e41ba038b4fa40baa4b780a](https://optimistic.etherscan.io/address/0x00000000fcaf86937e41ba038b4fa40baa4b780a) |
| StorageRegistry | [0x00000000fcce7f938e7ae6d3c335bd6a1a7c593d](https://optimistic.etherscan.io/address/0x00000000fcce7f938e7ae6d3c335bd6a1a7c593d) |
| KeyRegistry     | [0x00000000fc9e66f1c6d86d750b4af47ff0cc343d](https://optimistic.etherscan.io/address/0x00000000fc9e66f1c6d86d750b4af47ff0cc343d) |

For more details and documentation, please see the [contracts repository](https://github.com/farcasterxyz/contracts/).
