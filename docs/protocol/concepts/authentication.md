# Authentication

Users add their fid to each message and sign it with their key pair, making it tamper-proof and self-authenticating. Recipients can look up the key pair associated with the id in the contract and verify the message's authenticity. If the fid moves to a new key pair, all messages must be re-signed with the new key pair.

Users can also delegate the ability to sign messages to another key pair called a signer. Applications can generate new signers, and users approve them by signing a message with their public key. This gives applications the ability to create messages on behalf of users but does not give them the ability to control the user's identity.
