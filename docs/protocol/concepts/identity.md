# Identity

A user identity is a numeric identifier like `8930123` controlled by a key pair. Farcaster uses a smart contract registry on a Turing-complete blockchain to map identifiers to key pairs. Users can generate a new key pair or address and register an identity with the contract. The registry allows key rotation in case of exposure, and smart contract wallets can protect against key loss.

Identifiers, known as **Farcaster IDs** or **fids**, are numeric values that are cheap, meaningless, and in unlimited supply. Users can associate human-readable names from namespaces with their fids when using apps. Separating the identity and namespace layers allows identity to remain very decentralized. Problems of trust, like squatting and impersonation, are the domain of the namespace layer. Users are free to choose the namespace they prefer or even use many at once.
