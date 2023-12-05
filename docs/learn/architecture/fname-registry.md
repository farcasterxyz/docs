# FName Registry

Farcaster issues offchain ENS names under the `fcast.id`. A user can register `bob.fcast.id` and use it as `@bob` in
supported Farcaster apps. Registering a name requires a signed message from an account that does not own an fname.
Registrations are handled by the Fname Registry server and the Fname Resolver, implemented according
to [ENSIP-16](https://docs.ens.domains/ens-improvement-proposals/ensip-16-offchain-metadata)
and [ERC-3668](https://eips.ethereum.org/EIPS/eip-3668).

## Fname Policy

Fnames have a usage policy to prevent squatting and impersonation. Users who do not want to be subject to the policy can
register .eth names which are user controlled. The fname policy has two tenets:

- Names connected to public figures or entities may be reclaimed (e.g. @google)
- Names that haven't been used for 60+ days may be reclaimed

Decisions usually require human judgement and are made by the Farcaster core team. For instance, if a user registers
@elon and Elon Musk wants the name, we made the decision based on whether the user:

- Is active and creating quality content on Farcaster
- Has a reasonable claim, like being called elon or owning the handle elsewhere

The registry also imposes some restrictions to prevent abuse

- An fid can only have one fname at a time
- An fid can only change their fname once every 28 days

See the [FName API reference](/reference/fname/api) for more details on how to query and create fnames.