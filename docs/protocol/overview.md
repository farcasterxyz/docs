# Overview

Social networks are usually run by a company that controls its users, their data, and their relationships. This model has created many successful products but inevitably tends to the same problems over time. Users and developers have restricted freedoms and become subject to unwelcome moderation and privacy violations.

A [sufficiently decentralized](https://www.varunsrinivasan.com/2022/01/11/sufficient-decentralization-for-social-networks) protocol might offer a better alternative. Developers can invest in building apps without worrying about getting kicked off the network. Users can invest in their identities knowing that they own their data and can switch apps. While harder to build in the short term, aligning incentives will lead to better long-term outcomes.

Prior attempts at decentralization have taken different paths with some limited success. ActivityPub chose federation, SecureScuttlebutt went the peer-to-peer route, and peepeth was blockchain-based. Farcaster borrows from these ideas and proposes a new design that uses blockchains and [conflict-free replicated data types](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type) to achieve the following:

1. Decentralized, secure, and recoverable identities for users.
2. Concurrent, permissionless, and inexpensive access to data for developers.
3. Near real-time propagation of updates across the network.

<br/>

The detailed protocol overview document lives [on Github](https://github.com/farcasterxyz/protocol/blob/main/docs/OVERVIEW.md).
