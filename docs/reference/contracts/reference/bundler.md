---
outline: [2, 3]
---

# Bundler

The Bundler makes first time sign up easier by allowing a user to register an fid, add a key and rent storage in one transaction.

If you want to create a new Farcaster account in a single transaction, use the Bundler.

## Read

### price

Get the price in wei to register an fid, including 1 storage unit. To add additional storage units to the calculation, use the `extraStorage` parameter.

| Parameter    | type      | Description                                   |
| ------------ | --------- | --------------------------------------------- |
| extraStorage | `uint256` | Number of extra units to include in the price |

## Write

### register

Register an fid, add one or more signers, and rent storage in a single step. For a detailed usage example, see the [signup demo app](https://farcaster-signup-demo.vercel.app/bundler).

| Parameter      | type                 | Description                                   |
| -------------- | -------------------- | --------------------------------------------- |
| `msg.value`    | `wei`                | Payment amount for registration               |
| registerParams | `RegistrationParams` | Registration related parameters and signature |
| signerParams   | `SignerParams[]`     | Key related parameters and signature          |
| extraStorage   | `uint256`            | Additional storage units to rent              |

**RegistrationParams struct**

The `RegistrationParams` struct includes registration parameters and an IdGateway [`Register`](/reference/contracts/reference/id-gateway#register-signature) signature from the fid recipient.

| Parameter | type      | Description                                                                                                    |
| --------- | --------- | -------------------------------------------------------------------------------------------------------------- |
| to        | `address` | Address to register the fid to                                                                                 |
| recovery  | `address` | Recovery address for the new fid                                                                               |
| deadline  | `uint256` | Signature expiration timestamp signature                                                                       |
| sig       | `bytes`   | EIP-712 [`Register`](/reference/contracts/reference/key-gateway#add-signature) signature from the `to` address |

**SignerParams struct**

The `SignerParams` struct includes signer key parameters and a KeyGateway [`Add`](/reference/contracts/reference/key-gateway#add-signature) signature from the fid recipient. Callers may provide multiple `SignerParams` structs to add multiple signers at registration time.

| Parameter    | type      | Description                                                                                                                       |
| ------------ | --------- | --------------------------------------------------------------------------------------------------------------------------------- |
| keyType      | `uint32`  | Must be set to `1`. This is currently the only supported `keyType`.                                                               |
| key          | `bytes`   | Public key to add                                                                                                                 |
| metadataType | `uint8`   | Must be set to `1`. This is currenlty the only supported `metadataType`.                                                          |
| metadata     | `bytes`   | Encoded [`SignedKeyRequestMetadata`](/reference/contracts/reference/signed-key-request-validator#signedkeyrequestmetadata-struct) |
| deadline     | `uint256` | Signature expiration timetamp                                                                                                     |
| sig          | `bytes`   | EIP-712 [`Add`](/reference/contracts/reference/key-gateway#add-signature) signature from `registrationParams.to` address          |

## Errors

| Error            | Selector   | Description                                                                                                  |
| ---------------- | ---------- | ------------------------------------------------------------------------------------------------------------ |
| InvalidPayment   | `3c6b4b28` | The caller provided insufficient payment.                                                                    |
| InvalidMetadata  | `bcecb64a` | The signed metadata provided with the key is invalid.                                                        |
| InvalidSignature | `8baa579f` | The provided signature is invalid. It may be incorrectly formatted, or signed by the wrong address.          |
| SignatureExpired | `0819bdcd` | The provided signature has expired. Collect a new signature from the signer with a later deadline timestamp. |

## Source

[`Bundler.sol`](https://github.com/farcasterxyz/contracts/blob/1aceebe916de446f69b98ba1745a42f071785730/src/Bundler.sol)
