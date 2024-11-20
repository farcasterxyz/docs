# Replicate Hubble data to Postgres

::: info Pre-requisites

- Hubble instance running locally (for better performance) or remotely

:::

While some applications can be written by directly querying Hubble, most serious applications need to access the data
in a more structured way.

[Shuttle](https://github.com/farcasterxyz/hub-monorepo/tree/main/packages/shuttle) is a package
that can be used to mirror Hubble's data to a Postgres DB for convenient access to the underlying data.

Check out the documentation for more information.
