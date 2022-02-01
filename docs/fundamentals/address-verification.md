---
sidebar_position: 5
slug: /address-verification
---

# Address Verification

An address verification proves that a Farcaster user owns another address on the blockchain. Farcaster users may use multiple addresses for security reasons, privacy reasons, or even to use other blockchains. Proving ownership of such addresses is useful because some Farcaster features require verified ownership of certain assets. For instance, we have a feature where you can restrict replies to a message to users who own a specific asset. 

The address verification links two addresses by generating an off-chain signed message. Doing the proof off-chain avoids gas fees and offers a more straightforward user experience. An address verification has the following properties: 

- `signerAddress` - the connected address that signs this message
- `farcasterAddress` - the address that owns the Farcaster user’s username
- `originalMessage` - the message linking both addresses
- `signedMessage` - the signed message

```tsx
{
  signedMessage: string,
  originalMessage: string,
  signerAddress: string,
  farcasterAddress: string,
};
```

## Construction

The address verification is a message that effectively says, “I *prove that I own address X and would like to associate it with address Y*”. This is done by creating a string that contains both address X and Y, expressing the intent, and creating a signature using the wallet that owns X. It is the only data structure on the host that is not currently a signed blob. 

The pseudo code to generate an address verification looks like this: 

1. Construct a string that contains both addresses like this: `Connected Address: ${walletAddress}\\n\\nFarcaster Address: ${checksumAddress}`
2. Store this as the `originalMessage`
3. Set the `signerAddress` to the address that the user is connecting
4. Set the `farcasterAddress` to the address that contains the Farcaster user’s username
5. Ask the wallet that contains `signerAddress` to sign the `originalMessage` with `ecPersonalSign` and store this as `signedMessage`

## Verification

The process for verifying an address verification is straighforward, and the pseudocode looks like this: 

1. Call [ecrecover](https://docs.soliditylang.org/en/latest/units-and-global-variables.html#mathematical-and-cryptographic-functions) on the `signedMessage` with the `originalMessage` 
2. Check that the recovered address matches `signerAddress` 

## Known Issues

- Only one connected address is supported, though this will be changed soon.
- Address verifications are only signed by the connected address and someone can 'force' proofs onto a farcaster user, impliying that they own more assets than they actually do.
- Attackers may trick users into connecting their address unwittingly by setting up a website and requesting this signature. 
- Connecting an address to prove ownership of an asset requires disclose of the entire address's history.