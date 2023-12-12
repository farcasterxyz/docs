---
outline: [2, 3]
---

# Storage Registry

The Storage Registry allows Farcaster accounts to rent one or more "units" of storage on the network.

If you want to rent storage for a Farcaster account, use the Storage Registry.

## Read

### unitPrice

Get the price in wei (`uint256`) to register 1 unit of storage.

### price

Get the price in wei (`uint256`) to register a specific number of storage units.

| Param Name | type      | Description                         |
| ---------- | --------- | ----------------------------------- |
| units      | `uint256` | The number of storage units to rent |

## Write

### rent

Rent a specific number of storage units for a given fid. Excess ether will be returned to the caller. Rented units are valid for 1 year from the time of registration.

| Param Name  | type      | Description                            |
| ----------- | --------- | -------------------------------------- |
| `msg.value` | `wei`     | Payment amount                         |
| fid         | `uint256` | The fid to credit the storage units to |
| units       | `uint256` | The number of units of storage to rent |

### batchRent

Rent storage for multiple fids in one transaction. The caller must send enough ether to cover the total cost of all units. Like single-unit rental, extra ether is returned and units are valid for 1 year.

| Param Name  | type        | Description                                                             |
| ----------- | ----------- | ----------------------------------------------------------------------- |
| `msg.value` | `wei`       | Total payment amount                                                    |
| fids        | `uint256[]` | Array of fids                                                           |
| units       | `uint256[]` | Array of unit quantities, corresponding to each fid in the `fids` array |

## Errors

| Error             | Selector   | Description                                                                              |
| ----------------- | ---------- | ---------------------------------------------------------------------------------------- |
| InvalidPayment    | `3c6b4b28` | The caller didn't provide enough ether to pay for the number of storage units requested. |
| InvalidBatchInput | `0a514b99` | The caller provided mismatched arrays of `fids` and `units`.                             |

## Source

[`StorageRegistry.sol`](https://github.com/farcasterxyz/contracts/blob/1aceebe916de446f69b98ba1745a42f071785730/src/validators/StorageRegistry.sol)
