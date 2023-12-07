# Storage Registry

## price

Returns the price in wei to register requested units of storage

| Param Name   | type                 | Description                                                      |
|--------------|----------------------|------------------------------------------------------------------|
| extraStorage | `uint256` (optional) | The number of additional storage units to include in final price |

# rent

Rents the specified units of storage for an fid. Excess ether will be returned to the sender. The units are valid
for 1 year from the time of registration.

| Param Name | type              | Description                                       |
|------------|-------------------|---------------------------------------------------|
|            | `ether` (payable) | The payable amount to transfer to pay for storage |
| fid        | `uint256`         | The fid to credit the storage units to            |
| units      | `uint256`         | The number of units of storage to purchase        |

