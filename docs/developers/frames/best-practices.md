---
title: Frame Best Practices / Farcaster
---

# Frame Best Practices

Learn best practices for building great Frame experiences.

::: info
These best practices assume a prior knowledge of Frames. If you're looking for
general information about building Frames check out these resources:

- [Getting Started](./getting-started)
- [Frames Specification](/reference/frames/spec)
- guides from [frames.js](https://framesjs.org/guides/create-frame) or [frog](https://frog.fm/concepts/overview)
  :::

## UI / UX

#### Follow the Frame Interface Guidelines (FIG)

The [FIG](https://github.com/paradigmxyz/Fig) provides comprehensive guidance that can help you design a great
experience for frames. It covers everything from [foundational
topics](https://github.com/paradigmxyz/Fig?tab=readme-ov-file#foundations) like
layout and typography to [best practices when working with
transactions.](https://github.com/paradigmxyz/Fig?tab=readme-ov-file#patterns)

#### Optimize performance

Make your frame respond to the user as fast as possible. Review and implement
the [performance best practices](#performance).

#### Use reusable styles and components

Building set of reusable styles and components can help you move fast and build
consistent interfaces.

[FrogUI](https://frog.fm/ui) is an extension of the Frog Framework that provides a theme-able
set of primitive components.

## Performance Best Practices

::: tip
Don't worry about these recommendations if you're just getting started or working on a prototype.

Remember, premature optimization is the root of all evil!
:::

#### Use cached images

Where possible, serve images at stable URLs with appropriate cache headers as
this can drastically reduce render time.

#### Respond to requests as quickly as possible

Don't perform long-running computations like interacting with an LLM while the
user is waiting for the next Frame to load. Instead, [perform long-running computations in the background](./patterns-pitfalls#long-running).

#### Use a local copy of Farcaster data {#local-farcaster-data}

If your frame needs to access Farcaster data, consider [using Shuttle to
replicate it to Postgres](/developers/guides/apps/replicate.md) so it can be fetched
locally.

::: warning Advanced
Maintaining a replicated database is a non-trivial amount of work. Consider
fetching data from a provider like Neynar, Pinata, or Airstack unless your
willing to pay this cost.
:::

#### Skip Frame message signature verification when appropriate {#skip-verification}

You may not need to verify the frame message if the data in the message does
result in any sensitive data being updated or exposed.

For example, if your frame returns public analytics data about a user's cast
history, relying on the untrusted data is likely sufficient.

::: info Note
For multi-step frames it might be the case that some interactions require
verification while others don't.
:::

::: warning Exercise caution
If your frame relies on the message to allow the user to take a privileged
action or expose sensitive data you must verify the message.
:::

#### Minimize latency from external dependencies like hubs

This is a generalization of tactics like [skipping
verification](#skip-verification) and [using a local copy of the Farcaster
data](#local-farcaster-data).

Find all the external dependencies for your frame server. For each of these
external dependencies ask the following:

- Can it be removed?
- Can the data be cached?
- Can it be co-located with my frame server?
