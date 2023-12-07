# Key Registry API

## keysOf

Returns an array of public keys (`bytes[]`) for an fid

| Param Name | type                                 | Description                         |
|------------|--------------------------------------|-------------------------------------|
| fid        | `uint256`                            | fid to query for                    |
| state      | `uint8` (1 for Added, 2 for Removed) | State of the key (added or removed) |
| startIdx   | `uint256` (optional)                 | Start index for pagination          |
| batchSize  | `uint256` (optional)                 | Batch size for pagination           |

## keys

Returns the state (`uint8`) and keyType (`utin32`) of particular key for an fid

| Param Name | type      | Description                       |
|------------|-----------|-----------------------------------|
| fid        | `uint256` | fid to query for                  |
| key        | `bytes`   | public key registered for the fid |

## add

Cannot be called directly, must be called via the [Key Gateway](/reference/contracts/key-gateway.md)

## remove

Removes a key for the `msg.sender`

| Param Name | type    | Description   |
|------------|---------|---------------|
| key        | `bytes` | key to remove |

## removeFor

Removes a key for any fid. Requires an EIP-712 signature from the fid owner (
typehash `keccak256("Remove(address owner,bytes key,uint256 nonce,uint256 deadline)")`)

| Param Name | type      | Description                                   |
|------------|-----------|-----------------------------------------------|
| fidOwner   | `address` | address that owns the fid                     |
| key        | `bytes`   | key to remove (must be owned by the fid)      |
| deadline   | `uint256` | deadline for the signature                    |
| sig        | `bytes`   | EIP-712 signature from the `fidOwner` address |
