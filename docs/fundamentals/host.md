---
sidebar_position: 2
slug: /host
---

# Host

A Farcaster host stores a user’s data as [signed blobs](./signed-blob) and makes it available on the web. It is a simple, static file store which updates the blobs when instructed by the user and makes them publicly available on the web at a fixed URL. An AWS S3 bucket, IPFS node or even a set of linked Github Gists can serve as a host. A host should not be confused with an application which is a higher-order construct that may include a host, client and other services.

To be a valid host for a user:

1. The [registry](./registry) entry for the user should map to a URL controlled by the host. 
2. The host should return a directory at that URL, which is a JSON object signed by the user.

## Host Directory

The host directory is a signed blob that acts as a table of contents for the user’s data. It is a top-level data structure that includes:

- **addressActivityUrl** - a pointer to a json file that contains a user’s [casts](./cast)
- **avatarUrl** - a url to an image file that will be used as the user’s profile picture
- **displayName** - a non-unique display name chosen by the user
- **proof** - a url to a json file that contains a user’s [address verification](./address-verification)
- **timestamp** - a user generated, unverified timestamp which can be used to resolve conflicts.
- **version** - indicates the version of the directory

<p align="center">
  <img width="768" height="300" align="center" src="/img/docs/host.png" />
</p>

The directory contains some metadata about the user, and links to other resources that may be stored on the host or anywhere on the web. A single host can host many users by having multiple directories at different urls. An example directory for the user Bob would look like this: 

```tsx
{
  body: {
    addressActivityUrl: 'http://www.host.xyz/bob/casts.json',
    avatarUrl: 'https://github.com/bob_the_builder.png',
    displayName: 'Bob',
    proofUrl: 'http://www.host.xyz/bob/proof.json',
    timestamp: 1624314341272,
    version: 1,
  },
  merkleRoot: '0x8e0410b0c7b9e8f916ff384fdd9c2879b7e9100546b7e66acb135547c58db7e8',
  signature:
    '0xeab08fce87caa2ab2c66804138bf0112e8e461f163ee1a184d645f7037ceb788354acbb799bd5f3f48644780a01277c22a8b9ef4d598c784eb9ce532ab2c6d4b1c',
}
```

## Changing Hosts

The on-chain registry and off-chain host architecture makes it easy to change hosts or self-host. Let’s say that Alice owns a Farcaster name and has been using a third party: 

1. Create a new addressActivity and proof JSON or copy it from the old host.
2. Create and sign a new directory and point it to the newly created files. 
3. Upload the directory to the new url  *`https://alice.s3.us-west-2.amazonaws.com/dir.json`*
4. Make a transaction to the Registry’s `modify` function with the new URL. 

Everyone following Alice would be listening for `modify` events on the smart contract. As soon as they received one, they would:  

1. Ask the smart contract for her new host directory URL.
2. Fetch the directory from the URL and find the addressActivityUrl
3. Fetch the addressActivityUrl, which contains all her messages as signed blobs.

## Security

Farcaster requires that every JSON object on a host be signed by a user's private key, which protects them from spoofing attacks. Malicious hosts and external attackers cannot pretend to be a user unless they are able to get access to the private key, which is not stored on the host. 

Users are still vulnerable to data loss if a malicious host or external attacker deletes their messages. It's easy to mitigate this by maintaining a backup copy, and since the data is public this can be a service performed by anyone. An application could continually scrape and backup all public data on the network and charge users a fee for recovery. 

## Known Issues

- `addressActivityUrl` is a legacy name that should be changed to `casts`
- `proof` is a legacy name that should be renamed to `connectedAddress`
- Strict versioning and deprecation rules are needed for directories or clients will have to support all versions.
- `avatarUrl` must have some strict definitions around what types of images are permitted on the network.
- the numeric versioning system should be replaced with a schema system
- the directory should include the address of the username to make verification easier