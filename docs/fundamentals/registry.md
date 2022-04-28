---
sidebar_position: 1
slug: /registry
---

# Registry

The Farcaster Registry is an Ethereum contract that lets you look up the Host URL of any username. It also lets you register a new username and set your Host URL. You can think of the registry as a lookup table that lets you to go from address → username → host url. It’s deployed at [0xe3Be01D99bAa8dB9905b33a3cA391238234B79D1](https://rinkeby.etherscan.io/address/0xe3Be01D99bAa8dB9905b33a3cA391238234B79D1#code) on the Rinkeby Testnet.  

<p align="center">
  <img width="512" height="300" align="center" src="/img/docs/registry-smart-contract.png" />
</p>

## Using the Registry

### Registering A Username

Farcaster usernames are like handles on forums or social networks — they’re a unique pointer to a specific entity, like `@alice`.  They must also be configured to point to a Host URL where a user’s messages are stored.

Names must be between 1 and 16 characters and can only be made of letters (a-z), numbers(0-9) and underscores (_). Any Ethereum address can claim a valid username and configure it to point to a URL on the Web. Usernames can be transferred between addresses at any time. The contract exposes the following functions that you can use to manage your username: 

- `register` - registers a valid and unclaimed username to the callers address, sets the host directory URL for the username and emits `RegisterName`
- `modify` - changes the caller’s host directory URL and emits `ModifyName`
- `transfer` - transfers the caller’s username to a new address and emits `TransferName`

During the beta period on Rinkeby, admins have the ability to revoke a registration. This may be done if a user is squatting a username, behaving maliciously or has become inactive. These permissions will be removed when the contract is deployed on mainnet, after which users will always own their usernames. See the Roadmap for more specifics. 

### Looking up A Host

Farcaster usernames can be used to discover the location of a users’ Host. The contract exposes two functions to help with this: 

- `addressToUsername` - returns the username owned by an address.
- `getDirectoryUrl` - returns the host directory URL for any valid username.

You can read the [tutorial](https://www.notion.so/Tutorial-Download-messages-a795104b8462475fbbb6c4f3b63f2aa6) for a step-by-step walkthrough on how to do this. 

### Proxy Upgrade Pattern

The Registry contract implements the [Proxy Upgrade Pattern](https://docs.openzeppelin.com/upgrades-plugins/1.x/proxies) which allows the contract logic to be changed by admins over time. This results in two contracts - the [proxy contract](https://rinkeby.etherscan.io/address/0xe3Be01D99bAa8dB9905b33a3cA391238234B79D1#code), which is the public interface and the [implementation contract](https://rinkeby.etherscan.io/address/0x1a211dfba6e76d765fbd8dd089d885a5c94a6acf#code), which contains the logic. When calling the smart contract, always remember to call the proxy contract. 

### OpenGSN

The Registry contract allows users to register and own a name without paying gas. This is possible by using [meta-transactions](https://docs.openzeppelin.com/learn/sending-gasless-transactions), which allow Farcaster to pay for the gas on behalf of the user. The Registry uses [OpenGSN](https://opengsn.org/), which is a meta-transaction relay network. The contract can always be called directly without a meta-transaction, but this requires the payment of gas fees. 

### Contract Interface

The important methods on the contract are listed below. The contract exposes more functions, which we have omitted because they are either not useful or slated for deprecation in the next release. 

```solidity
// Storage
struct UrlEntry {
  string url;
  bool initialized;
}

mapping(bytes32 => UrlEntry) public usernameToUrl;
mapping(address => bytes32) public addressToUsername;

// Contract Functions
function register(bytes32 username, string memory url) public
function modify(string memory url) public 
function transfer(address to) public 
function getDirectoryUrl(bytes32 username) public view returns (string memory)

// Events
event RegisterName(address indexed owner, bytes32 indexed username);
event ModifyName(bytes32 indexed username);
event TransferName(address indexed from, address indexed to, bytes32 indexed username);
```

The full contract interface can be found in the ABI below

<details>
<summary>Registry ABI</summary>

```json
[
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'previousAdmin',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'newAdmin',
        type: 'address',
      },
    ],
    name: 'AdminChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'beacon',
        type: 'address',
      },
    ],
    name: 'BeaconUpgraded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'ChangeTrustedForwarder',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'username',
        type: 'bytes32',
      },
    ],
    name: 'DeregisterName',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'username',
        type: 'bytes32',
      },
    ],
    name: 'ModifyName',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Paused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'username',
        type: 'bytes32',
      },
    ],
    name: 'RegisterName',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'previousAdminRole',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'newAdminRole',
        type: 'bytes32',
      },
    ],
    name: 'RoleAdminChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleGranted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleRevoked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'username',
        type: 'bytes32',
      },
    ],
    name: 'TransferName',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Unpaused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'implementation',
        type: 'address',
      },
    ],
    name: 'Upgraded',
    type: 'event',
  },
  {
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'addressToUsername',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'username',
        type: 'bytes32',
      },
    ],
    name: 'deregister',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'username',
        type: 'bytes32',
      },
    ],
    name: 'getDirectoryUrl',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
    ],
    name: 'getRoleAdmin',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'hasRole',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_forwarder',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'forwarder',
        type: 'address',
      },
    ],
    name: 'isTrustedForwarder',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'url',
        type: 'string',
      },
    ],
    name: 'modify',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'username',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'url',
        type: 'string',
      },
    ],
    name: 'register',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_forwarder',
        type: 'address',
      },
    ],
    name: 'setTrustedForwarder',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'transfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newImplementation',
        type: 'address',
      },
    ],
    name: 'upgradeTo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newImplementation',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'idx',
        type: 'uint8',
      },
    ],
    name: 'usernameAtIndex',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'usernameToUrl',
    outputs: [
      {
        internalType: 'string',
        name: 'url',
        type: 'string',
      },
      {
        internalType: 'bool',
        name: 'initialized',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'usernamesLength',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]
```
</details>


## Known Issues

- `usernameAtIndex` does not fetch users past the 256th user
- names can be front-run by mempool watchers