# Hubble

Hubble is an implementation of the [Farcaster Hub Protocol](https://github.com/farcasterxyz/protocol), written
in [TypeScript](https://www.typescriptlang.org/) and [Rust](https://www.rust-lang.org/).

Hubble creates a private instance of Farcaster on your machine. It peers with other instances and downloads a copy of
the entire network. Messages uploaded to your Hubble instance will be broadcast to the network.

We recommend running Hubble if you are building an app, need access to the latest data or want to help decentralize the
network.

## Hosted Instances

Hubble instances can also be hosted for you by other service providers.

- [Hubs x Neynar](https://hubs.neynar.com/)

## Public Instances

The Farcaster team runs an instance of Hubble for use by the public. This isn't guaranteed to be stable, and is
read-only for now.

```bash
url: nemes.farcaster.xyz
httpapi_port: 2281
gossipsub_port: 2282
grpc_port: 2283
```
