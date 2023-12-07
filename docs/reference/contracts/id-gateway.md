# ID Gateway

## price

Returns the price in wei to register requested units of storage

| Param Name   | type                 | Description                                                      |
|--------------|----------------------|------------------------------------------------------------------|
| extraStorage | `uint256` (optional) | The number of additional storage units to include in final price |

## nonces

Returns the nonce of an address, if it exists. Used for generating EIP-712 signatures in [registerFor](#registerfor).

| Param Name | type      | Description                        |
|------------|-----------|------------------------------------|
| owner      | `address` | The address to query the nonce for |

## register

Register a new fid to `msg.sender` and pay for one or more units of storage

| Param Name   | type                 | Description                                            |
|--------------|----------------------|--------------------------------------------------------|
|              | `ether` (payable)    | The payable amount to transfer to pay for registration |
| recovery     | `address`            | The recovery address for the newly registered fid      |
| extraStorage | `uint256` (optional) | The number of additional storage units to purchase     |

## registerFor

Register a new fid to a specific address and pay for one or more units of storage. The receiving
address must provide an EIP-712 signature
(typehash `keccak256("Register(address to,address recovery,uint256 nonce,uint256 deadline)")`) to prevent greifing
attacks.

| Param Name   | type                 | Description                                            |
|--------------|----------------------|--------------------------------------------------------|
|              | `ether` (payable)    | The payable amount to transfer to pay for registration |
| to           | `address`            | The address to register the fid to                     |
| recovery     | `address`            | The recovery address for the newly registered fid      |
| deadline     | `uint256`            | The deadline for the signature                         |
| sig          | `bytes`              | EIP-712 signature from the `to` address                |
| extraStorage | `uint256` (optional) | The number of additional storage units to purchase     |

