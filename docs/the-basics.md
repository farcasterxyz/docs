---
sidebar_position: 2
---

# The Basics 

The Farcaster protocol has two important pieces — an on-chain [registry](./registry), where users can claim a unique username, and off-chain [hosts](./host), where users store their social data. The registry also stores a user’s host URL and functions as a DNS-like system for the network. To read someone's messages, you ask the registry for their host URL and then ask the host for their messages. 

## Name Registry

The registry is a smart contract that makes it easy for Farcaster users to find each other, which is necessary because Farcaster’s architecture means that user data can live on different servers. Users must generate a new Ethereum address and claim a unique name like `@alice` by broadcasting a transaction to the registry. Usernames must also be associated with a valid host URL like `https://alice.com/host` where the user's data is stored. 
 

<p align="center">
  <img width="512" height="300" align="center" src="/img/docs/registry-smart-contract.png" />
</p>

The registry ensures that only the user can update the host URL, which is necessary for sufficient decentralization. Users can also secure messages by hashing and signing them with their address's private key. Recipients can check the message signature and verify that it came from the user's address which also owns their username.

## Distributed Host Architecture

Farcaster allows users to host their content on any web server as long as they sign everything with their private key. This is much more scalable than using a blockchain to store user data since we know how to build highly scalable architectures using web servers. There are two options for hosting: self-hosting and using a managed host. 

![Distributed Hosts](/img/docs/distributed-hosts.png)

### Self Hosting

Users can choose to self-host, which lets them use the Farcaster network without going through third parties¹. To self-host, you will need to know how to set up and operate a web server. You will also need to download and use a client application that can post messages to the server and fetch messages from other servers on the network². 

A fully self-hosted client will have a limited feature set, which includes reading messages from a single user and sending messages. Complex features like algorithmic feeds will require more  infrastructure and knowledge to configure. But the self-hosted approach ensures that users always have a way to send and receive messages without gatekeepers which is an important property of the network. If this were not possible, the network would fail the test of sufficient decentralization. 

### Managed Hosts

Farcaster’s architecture also lets developers build managed hosts³ as Gmail does for email and Github does for Git. A managed host can simplify uploading messages, crawl the network to provide a recommended feed and provide client apps to use the network. In short, they can do everything that a centralized social network can do. We expect that most users will use managed hosts and that the best user experiences will be found on them. 

You can use a managed host while keeping custody of your private key⁴. This gives you the freedom to change hosts at any time and protects you against losing your username if your host gets hacked. Users who would prefer to trust a host to manage their keys can always choose to do so, but give up the ability to use the network in a decentralized way. 

The most important property of Farcaster is that **users who use a managed host can communicate easily with those who self-host**. If you wanted to, you could build your own managed host or self-host client that talks to users using our managed host.  Here’s an example of a Farcaster setup where Alice and Charlie are self-hosting, but Bob is using a managed server: 

![Managed Hosts](/img/docs/managed-hosts.png)


### Footnotes

---

*[1]  There is a spectrum of decentralization within self-hosting, which ranges from using a major cloud provider like AWS all the way to running your own physical box under your desk.* 

*[2] We’re working on releasing a reference open-source client for self-hosting.*  

*[3] The Farcaster team is  operating a managed host which in beta and is invite-only for now.*

*[4] There is a similar decentralized spectrum for managed hosts, ranging from keeping your keys on your device and signing things locally to trusting the host with your keys.*