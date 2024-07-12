---
layout: home

hero:
  name: Farcaster
  text: For Developers
  tagline: Build and distribute applications on Farcaster
  actions:
    - theme: brand
      text: Build a frame
      link: /frames
    - theme: alt
      text: Explore social sign-in
      link: /auth-kit/
    - theme: alt
      text: Learn about the protocol
      link: /learn/

features:
  - title: Frames
    details: Build bite-sized social experiences that are distributed directly in social feeds
    link: /frames
    linkText: Build
  - title: Social Sign In
    details: Add Sign In with Farcaster your app and leverage the Farcaster social graph
    link: /auth-kit/
    linkText: Explore
  - title: Open Social Primitives
    details: Permissionlessly read from and write to the Farcaster network
    link: /learn/
    linkText: Learn
---

## Create a frame

Learn how to build frames, which are mini-apps that run inside a Farcaster feed.

- [Overview](/learn/what-is-farcaster/frames) - Understand what a frame is and how it works
- [Build your first frame](./developers/guides/frames/poll.md) - Make mini-apps that run inside Farcaster.
- [Frame Speedrun](https://www.youtube.com/watch?v=JAIr8kyBxxU&list=PL0eq1PLf6eUecQKFj0pUFfO0fwm0k4zE4&index=2) - Watch a frame get built and deployed in 5 minutes
- [Specification](/reference/frames/spec) - A formal specification for the Frame standard

## Add Sign in with Farcaster

Make it easy for users to sign in to your app with their Farcaster account.

- [Examples](/auth-kit/examples.md) - see Sign In with Farcaster (SIWF) in action
- [AuthKit](/auth-kit/installation.md) - a React toolkit to add SIWF to your app
- [FIP-11](https://github.com/farcasterxyz/protocol/discussions/110) - the formal standard for SWIF

## Analyze Farcaster data

Sync the Farcaster network to a local machine so you can run queries on the data.

- [Run a hub](/hubble/install.md) - get realtime access to Farcaster data on your machine.
- [Write your first hub query](/developers/guides/querying/fetch-casts.md) - get an account's casts from a hub.
- [Set up the replicator](/developers/guides/apps/replicate.md) - sync a hub to a postgres database to run advanced queries.
