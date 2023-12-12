---
outline: [2, 3]
---

# Storage Registry

## Read

### unitPrice

Returns the price in wei (`uint256`) to register 1 unit of storage.

### price

Returns the price in wei (`uint256`) to register the given number of units of storage.

| Param Name | type      | Description                 |
| ---------- | --------- | --------------------------- |
| units      | `uint256` | The number of storage units |

## Write

### rent

Rents the specified number of storage units for the given fid. Excess ether will be returned to the sender. The units are valid
for 1 year from the time of registration.

| Param Name  | type      | Description                                       |
| ----------- | --------- | ------------------------------------------------- |
| `msg.value` | `wei`     | The payable amount to transfer to pay for storage |
| fid         | `uint256` | The fid to credit the storage units to            |
| units       | `uint256` | The number of units of storage to purchase        |

### batchRent

Rent storage for multiple fids in a single call. The caller must provide at least price(units) wei of payment where units is the sum of storage units requested across all fids. Excess ether will be returned to the sender. The units are valid for 1 year from the time of registration.

| Param Name  | type        | Description                                                                               |
| ----------- | ----------- | ----------------------------------------------------------------------------------------- |
| `msg.value` | `wei`       | The payable amount to transfer to pay for storage                                         |
| fids        | `uint256[]` | Array of fids to credit the storage units to                                              |
| units       | `uint256[]` | Array of unit quantities, in the same order as `fids`. Must be the same length as `fids`. |

## Errors

| Error             | Selector   | Description                                                                         |
| ----------------- | ---------- | ----------------------------------------------------------------------------------- |
| InvalidPayment    | `3c6b4b28` | The caller provided insufficient payment for the requested number of storage units. |
| InvalidBatchInput | `0a514b99` | The caller attempted to `batchRent` with mismatched array lengths.                  |
