# Key Gateway

## nonces

Returns the nonce of an address, if it exists. Used for generating EIP-712 signatures in [registerFor](#registerfor).

| Param Name | type      | Description                        |
|------------|-----------|------------------------------------|
| owner      | `address` | The address to query the nonce for |

## add

Adds a key for the fid of `msg.sender`

| Param Name   | type         | Description                                              |
|--------------|--------------|----------------------------------------------------------|
| keyType      | `uint32` (1) | Must be set to 1, only key type supported currently      |
| key          | `bytes`      | public key to add                                        |
| metadataType | `uint8` (1)  | Must be set to 1, only metadata type supported currently |
| metadata     | `bytes`      | Signed metadata bytes                                    |

## addFor

Adds a key for an fid. The owner of the fid must provide an EIP-712 signature.

| Param Name   | type         | Description                                              |
|--------------|--------------|----------------------------------------------------------|
| fidOwner     | `address`    | The address that owns the fid to add the key to          |
| keyType      | `uint32` (1) | Must be set to 1, only key type supported currently      |
| key          | `bytes`      | public key to add                                        |
| metadataType | `uint8` (1)  | Must be set to 1, only metadata type supported currently |
| metadata     | `bytes`      | Signed metadata bytes                                    |
| deadline     | `uint256`    | Deadline for the `sig`                                   |
| sig          | `bytes`      | EIP-712 signature from `fidOwner`                        |


