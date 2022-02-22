---
sidebar_position: 3
slug: /signed-blob
---

# Signed Blob

All user data on a host is cryptographically signed so that it cannot be tampered with. Clients should structure user data as a JSON object, which is then converted into a string, hashed and signed. The structure that holds this data is called a Signed Blob, and it contains three properties: 

- `body` - the JSON object that the user wants to store
- `merkleRoot` - the hashed body
- `signature` - the signed hash

You can think of a signed blob as an interface that all data stored on the host must implement¹.  A data structure found on a host that is not composed as a signed blob will be discarded by clients. A simple signed blob might look like this: 

```json
{
    "body":  {
        "text": "Hello, world!"
    },
    "merkleRoot": "0xfoo",
    "signature": "0xbar"
}
```

## Construction

The process used to construct a blob must be:

- **deterministic -**  the same content results in the same blob across different clients
- **collision resistant** - the hashing function should be very likely to avoid collisions
- **secure** - the signature must be near impossible to spoof
- **easily verifiable** - clients like mobile devices must be able to easily verify a blob

The pseudocode to construct a signed blob on Farcaster looks like this today:  

1. Construct the JSON object with the properties in the exact order as specified.
2. Convert the object to a string to make it hashable². 
3. Hash the string using [keccak256](https://en.wikipedia.org/wiki/SHA-3) and store this value as the merkleRoot
4. Sign the merkleRoot with the user’s Ethereum wallet, creating a [recoverable ECDSA signature](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm#Public_key_recovery) and store this in the signature property. 

This creates a JSON object that cannot be spoofed, and can be easily verified by a Farcaster client.  In the future, we will move to alphabetical ordering of properties and define a formal function to convert an object into a string that can be implemented in any language. 

## Verification

The process used to verify a blob must also be deterministic and easy to perform on clients. The pseudocode to verify a blob looks like this: 

1. Convert the body to a string to make it hashable².
2. Hash the string using [keccak256](https://en.wikipedia.org/wiki/SHA-3) and check that it matches the merkle root
3. Perform an ecRecover on the signature with the merkle root to retrieve the address.
4. Check that the recovered address matches the expected address. 

The expected address may be defined explicitly in the body, or it may be implicitly obvious because it was linked to from the directory of a user. The [tutorial](./fetch-casts) covers the verification of a Cast from start to finish.  

## Known Issues

- Blobs should require an address property explicitly, to make verification easier
- Blobs should be flexible and allow the hashing and signing algorithm to be changed.
- Blobs should have a deterministic way to order properties to avoid conflicts between implementations.
- merkleRoot is a legacy property name that should be renamed to hash

## Footnotes

*[1] the one exception is the [address verification](./address-verification), though this will be resolved soon*

*[2] Currently, Javascript’s `JSON.stringify()` is used to convert objects into strings but this has major drawbacks. For instance, it is sensitive to the ordering of properties in the object. In the future, we will release a more deterministic algorithm which can be implemented in any language.*
