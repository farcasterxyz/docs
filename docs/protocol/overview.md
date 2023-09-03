# Overview

Farcaster is a [sufficiently decentralized](https://www.varunsrinivasan.com/2022/01/11/sufficient-decentralization-for-social-networks) protocol for building social apps. Sufficient decentralization means that two people who want to communicate can always do so. It also means developers have permissionless access to public data on the network. 


## Design Philosophy

There have been many attempts to decentralize social networks, making different tradeoffs for decentralization, scalability, and usability. ActivityPub chose federation, SecureScuttlebutt went the peer-to-peer route, and peepeth was blockchain-based. 

Farcaster borrows ideas from some of these projects but makes different tradeoffs. Its architecture is best understood as the product of three design decisions:

### Flexible namespaces

Users can have many usernames from different namespaces. Names may come from decentralized namespaces, which are censorship-resistant or centralized namespaces, which are free and easy to use. 

A user's account has a unique numeric identifier like `413241` which is mapped to the usernames that they own. Identifiers are tracked using an Ethereum contract that ensures that two users can always find each other and communicate. 

### Global State

Many decentralized networks are federated, but this breaks the guarantee of permissionless access to public data. It also complicates the developer experience by requiring them to crawl many unreliable servers.

Farcaster stores all user data on a server called a Hub. Anyone can run a Hub that connects to all other Hubs over a p2p network. When a user sends a new message to a Hub it is propagated to all other Hubs. Every Hub must store valid data from all users or it will be excluded from the network.   

### Storage Rent

Letting users store infinite amounts of data is detrimental to the network's health. Malicious users can create billions of spam messages, making it difficult for developers and users to use the network. It also makes it impossible to operate Hubs, which are designed for commodity hardware. 

Farcaster charges users rent to store data on the network. A yearly fee is paid to the protocol, which guarantees a certain amount of space on Hubs. This disincentives spam and encourages users to clean up less important data on the network.
