---
outline: [2, 3]
---

# Bundler

## Read

### price

Returns the price in wei to register an fid. Registering an fid includes 1 storage unit. To include additional storage units
in the calculation, use the `extraStorage` parameter.

| Parameter    | type      | Description                                                           |
| ------------ | --------- | --------------------------------------------------------------------- |
| extraStorage | `uint256` | The number of additional storage units to include in calculated price |

## Write

### register

Register an fid, add one or more signers, and rent storage in a single transaction. For a detailed example of signup using the Bundler, see the [signup demo app](https://farcaster-signup-demo.vercel.app/bundler).

| Parameter      | type                 | Description                                            |
| -------------- | -------------------- | ------------------------------------------------------ |
| `msg.value`    | `wei`                | The payable amount to transfer to pay for registration |
| registerParams | `RegistrationParams` | Registration related parameters and signature          |
| signerParams   | `SignerParams[]`     | Key related parameters and signature                   |
| extraStorage   | `uint256`            | The number of additional units of storage to purchase  |

**RegistrationParams struct**

The `RegistrationParams` struct includes registration parameters and an IdGateway [`Register`](/reference/contracts/id-gateway.html#register-signature) signature from the fid recipient.

| Parameter | type      | Description                                                                                               |
| --------- | --------- | --------------------------------------------------------------------------------------------------------- |
| to        | `address` | The address to register the fid to                                                                        |
| recovery  | `address` | The recovery address for the newly registered fid                                                         |
| deadline  | `uint256` | Expiration timestamp of the `Register` signature                                                          |
| sig       | `bytes`   | EIP-712 [`Register`](/reference/contracts/key-gateway.html#add-signature) signature from the `to` address |

**SignerParams struct**

The `SignerParams` struct includes signer key parameters and a KeyGateway [`Add`](/reference/contracts/key-gateway.html#add-signature) signature from the fid recipient. Callers may provide multiple `SignerParams` structs to add multiple signers at registration time.

| Parameter    | type      | Description                                                                                                                  |
| ------------ | --------- | ---------------------------------------------------------------------------------------------------------------------------- |
| keyType      | `uint32`  | Must be set to `1`. This is currently the only supported `keyType`.                                                          |
| key          | `bytes`   | Bytes of the public key to add                                                                                               |
| metadataType | `uint8`   | Must be set to `1`. This is currenlty the only supported `metadataType`.                                                     |
| metadata     | `bytes`   | Encoded [`SignedKeyRequestMetadata`](/reference/contracts/signed-key-request-validator.html#signedkeyrequestmetadata-struct) |
| deadline     | `uint256` | Expiration timestamp of the signature                                                                                        |
| sig          | `bytes`   | EIP-712 [`Add`](/reference/contracts/key-gateway.html#add-signature) signature from `registrationParams.to` address          |

## Errors

| Error            | Selector   | Description                                                                                                  |
| ---------------- | ---------- | ------------------------------------------------------------------------------------------------------------ |
| InvalidPayment   | `3c6b4b28` | The caller provided insufficient payment.                                                                    |
| InvalidMetadata  | `bcecb64a` | The signed metadata provided with the key is invalid.                                                        |
| InvalidSignature | `8baa579f` | The provided signature is invalid. It may be incorrectly formatted, or signed by the wrong address.          |
| SignatureExpired | `0819bdcd` | The provided signature has expired. Collect a new signature from the signer with a later deadline timestamp. |
