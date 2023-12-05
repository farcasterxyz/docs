# Accounts

A Farcaster account is a unique number (called fid) that's owned by an ethereum address. A smart contract called, the
Id Registry manages the mapping of fid to the address that owns it. The smart contract also allows the owner of the fid
to designate a separate address as the recovery address. The recovery address can transfer the fid to a new address in
case the owner loses access to the original address.

Each account also has one or more public keys (called signers) registered to it in order to submit messages to the hubs.
This is managed by the Key Registry smart contract. Only messages signed with a registered signer are considered valid
by hubs.
