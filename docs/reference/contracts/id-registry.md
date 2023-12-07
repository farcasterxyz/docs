# ID Registry API

## idOf

Returns the fid (`uint256`) of an address, if it exists

| Param Name | type      | Description                      |
|------------|-----------|----------------------------------|
| owner      | `address` | The address to query the fid for |

## custodyOf

Returns the owning address (`address`) of an fid, if it exists

| Param Name | type      | Description                    |
|------------|-----------|--------------------------------|
| fid        | `uint256` | The fid to query the owner for |

## idCounter

The current highest fid (`uint256`) that has been registered

## recoveryOf

Returns the recovery address (`address`) of an fid, if it exists

| Param Name | type      | Description                               |
|------------|-----------|-------------------------------------------|
| fid        | `uint256` | The fid to query the recovery address for |

## nonces

Returns the nonce of an address, if it exists. Used for generating EIP-712 signatures.

| Param Name | type      | Description                        |
|------------|-----------|------------------------------------|
| owner      | `address` | The address to query the nonce for |

## register

Will revert if called directly, must be called via the [ID Gateway](/reference/contracts/id-gateway.md)

## changeRecoveryAddress

Changes the recovery address of `msg.sender` to a new address

| Param Name | type      | Description              |
|------------|-----------|--------------------------|
| recovery   | `address` | The new recovery address |

## transfer

Transfer the ownership of the fid of `msg.sender` to a new address. The receiving address must sign an EIP-712
signature (
typehash `keccak256("Transfer(uint256 fid,address to,uint256 nonce,uint256 deadline)")`).

| Param Name | type      | Description                             |
|------------|-----------|-----------------------------------------|
| to         | `address` | The address to transfer the fid to      |
| deadline   | `uint256` | The deadline for the signature          |
| sig        | `bytes`   | EIP-712 signature from the `to` address |

## recover

Transfers a fid to a new address if `msg.sender` is the recovery address for that fid. The receiving address must sign
an EIP-712
signature (
typehash `keccak256("Transfer(uint256 fid,address to,uint256 nonce,uint256 deadline)")`).

| Param Name | type      | Description                             |
|------------|-----------|-----------------------------------------|
| from       | `address` | The address to transfer the fid from    |
| to         | `address` | The address to transfer the fid to      |
| deadline   | `uint256` | The deadline for the signature          |
| sig        | `bytes`   | EIP-712 signature from the `to` address |
