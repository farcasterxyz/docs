---
sidebar_position: 1
slug: /fetch-casts
---

# Fetch Casts

In this tutorial, we’ll show you how to write a simple script that can fetch a Farcaster user’s [casts](https://www.farcaster.xyz/docs/cast) and verify their authenticity. All you need is a web browser to get started. The final code is available on [Replit](https://replit.com/@VarunSrinivasa3/Farcaster-Tutorial-1#index.js) and you can open it to see how it works if you’d like. If you prefer to learn by doing, we recommend following these steps which will walk you through creating the app from scratch.

### Step 1: Set up your Environment

Before writing code, you’ll need to set up a Node.js environment. You can use your local Node.js environment if you have one handy. If you don’t we recommend using [replit](http://replit.com), which is a browser based IDE for programming:

1. Sign up on replit for a free account, and complete onboarding
2. Click on Create on the top left
3. Choose Node.js when prompted  

You’ll also need an Ethereum node to talk to the Facaster Registry contract. We recommend using [Alchemy](https://www.alchemy.com/), which is free. The steps below may be slightly different if you’re signing up for the first time: 

1. Sign up on [Alchemy.com](http://www.alchemy.com), and complete onboarding
2. Click on ‘Create a New App’ from your dashboard
3. Choose Development as your Environment, Ethereum as your blockchain, and Rinkeby as your network. 
4. Click on View Details → View Key and find the HTTP Url, which should look like this [`https://eth-rinkeby.alchemyapi.io/v2/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`](https://eth-rinkeby.alchemyapi.io/v2/KlP-v1iT5ydz1WbbH5iyzCFwp0m9UP98)
5. Copy the `xxx..` part, which is your Alchemy Secret, which you will need later. Store it somewhere for now.

Switch back to Replit and go to the Shell tab in the right pane and run this code: 

```bash
npm install ethers got@11.8.2
```

This installs [ethers](https://github.com/ethers-io/ethers.js), a library for working with Ethereum and [got](https://github.com/sindresorhus/got), a library for making HTTP requests. You may see some warnings about a missing package.json, which you can ignore.  

### Step 2: Connect to an Ethereum Node

Switch to the index.js tab in the center pane in Replit, and copy past the code snippet below. Make sure to replace the `xxx...` with the Alchemy Secret you got earlier. 

```jsx
const { providers, Contract, utils } = require("ethers");
const got = require("got");

const doStuff = async () => {
  const ALCHEMY_SECRET = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // Replace with your secret
  const provider = new providers.AlchemyProvider('rinkeby', ALCHEMY_SECRET);

	const block = await provider.getBlockNumber();
  console.log("The latest Ethereum block is:", block);
}

doStuff();
```

When you hit run, you should see something like this if everything is working: 

```bash
The latest Ethereum block is: 10027943
```

The code we just wrote created an [Ethers Provider](https://docs.ethers.io/v5/api/providers/), which is an interface that we can call to interact with Ethereum. The provider connects to the blockchain via the Alchemy node. 

### Step 3: Connect to the Farcaster Registry

Copy the following code and add it at the bottom of the `doStuff` function, just below the last line  `console.log("The latest Ethereum block is:", block);`. All future snippets should be added to the bottom in the same way: 
 

```jsx

const REGISTRY_CONTRACT_ADDRESS = '0xe3Be01D99bAa8dB9905b33a3cA391238234B79D1'
const REGISTRY_ABI = [
  {
    name: 'getDirectoryUrl',
    inputs: [{ internalType: 'bytes32', name: 'username', type: 'bytes32' }],
    outputs: [{ internalType: 'string', name: '', type: 'string'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
  inputs: [{ internalType: 'address', name: '', type: 'address' }],
  name: 'addressToUsername',
  outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
  stateMutability: 'view',
  type: 'function',
  },
];

const registryContract = new Contract(REGISTRY_CONTRACT_ADDRESS, REGISTRY_ABI, provider);

const username = 'v';
const byte32Name = utils.formatBytes32String(username);
const directoryUrl = await registryContract.getDirectoryUrl(byte32Name); 
console.log(`${username}'s Host is located at: ${directoryUrl} \n`);
```

You should see something like this if everything is working: 

```bash
v's Host is located at: https://guardian.farcaster.xyz/origin/directory/0x012D3606bAe7aebF03a04F8802c561330eAce70A
```

There’s a lot we just wrote, so let’s unpack it. First, we define the registry contract’s address and [ABI](https://en.wikipedia.org/wiki/Application_binary_interface). The address tells ethers where to find the contract on the blockchain, and the ABI tells ethers what functions the contract has. The Registry contract has several methods, but our ABI only calls out two of them:

- `getDirectoryUrl` - returns the URL location of a username’s [Host Directory](https://www.farcaster.xyz/docs/host#host-directory).
- `addressToUsername` - returns the username registered to an address.

We don’t need to tell the contract about methods we aren’t calling, so we omit the rest of the ABI for simplicity. If you ever want to call the other methods, they can be found [here](https://www.farcaster.xyz/docs/registry#contract-interface).

Next, we initialize an [Ethers Contract](https://docs.ethers.io/v5/api/contract/contract/), and call the `getDirectoryUrl` function to the directory of a user called `v` .  Since the ABI indicates that the username must be `byte32 encoded`, we encode it first before invoking the contract call.  This gives us the URL of the users’ Directory, which we can use to find their messages. 

### Step 4: Fetch the User’s Directory

Add the following code to the bottom of `doStuff` just like you’ve been doing, and run it again: 

```jsx
const directoryResponse = await got(directoryUrl);
const directory = JSON.parse(directoryResponse.body);
console.log(`${username}'s Directory is: `);
console.log(directory, '\n');
```

You should see something like this if everything is working: 

```r
v's Directory is:
{
  body: {
    addressActivityUrl: 'https://guardian.farcaster.xyz/origin/address_activity/0x012D3606bAe7aebF03a04F8802c561330eAce70A',
    avatarUrl: 'https://lh3.googleusercontent.com/sYAr036bd0bRpj7OX6B-F-MqLGznVkK3--DSneL_BT5GX4NZJ3Zu91PgjpD9-xuVJtHq0qirJfPZeMKrahz8Us2Tj_X8qdNPYC-imqs',
    displayName: 'Varun Srinivasan',
    proofUrl: 'https://guardian.farcaster.xyz/origin/proof/0x012D3606bAe7aebF03a04F8802c561330eAce70A',
    timestamp: 1639029396497,
    version: 1
  },
  merkleRoot: '0xcccabedbe3267e21d80e959de72f2933a68c6cd4c29453aed81a78bc8d4d8521',
  signature: '0x3412be3e88bc49cd89a18890bcd8e116776ed649e270ac0a3955864bed1e2cd243407e2a478f66fa47cedb1668a8298c98e632d6607c0a6082b6589e8bf2a2501b'
}
```

The code now calls the URL from the smart contract, which asks the user’s Host for their Directory. The Directory is like a table of contents for the user, and the `addressActivityUrl` tells us where we can find their messages. The Directory is also a `Signed Blob` which means it can be verified, but we’ll show you how to do that later. For now, we want to get their latest message from the `addressActivity`.

### Step 5: Fetch the users’ most recent Cast from Address Activity

Add the following code to the bottom of `doStuff` just like you’ve been doing, and run it again: 

```jsx
const addressActivityUrl = directory.body.addressActivityUrl; 
const addressActivityResponse = await got(addressActivityUrl);
const addressActivity = JSON.parse(addressActivityResponse.body);
const cast = addressActivity[0];
console.log(`${username}'s most recent Cast was: `)
console.log(cast, '\n')
```

You should see something like this: 

```jsx
v's most recent Cast was: 
{
  body: {
    type: 'text-short',
    publishedAt: 1642720790424,
    sequence: 493,
    username: 'v',
    address: '0x012D3606bAe7aebF03a04F8802c561330eAce70A',
    data: {
      text: 'Is Maine meant to be an outlier? \n\nHard to tell without the legend',
      replyParentMerkleRoot: '0x647432bd51231b217f7c31f5d678e7acccf3d1b5f30ba72fc2cffa895927a5d1'
    },
    prevMerkleRoot: '0x21570c8e24879010978a08339eb344898b22b7d21cc56ce3a176abe118cc5f61'
  },
  merkleRoot: '0xa20c21aa020c2be7aa6f9577468a4bbf32701ae3d835e882d9a9fd25bdcb4e1e',
  signature: '0xca11e5d2e8e1b7259c1d7dd1a08f87275c16a0282e559eec7a77cfad2df1aa01234d01002637e096c208ebb491ed2de8229bbde5ccb2a4a71f194189820071161c'
}
```

The code we ran just fetched the addressActivity from the user’s Host, which is an array of all the messages they’ve ever published. The array is returned in reverse chronological order, so to get the most recent message we just need to select the first item. 

### Step 6: Verify the signature of the Cast

Let’s do the copy-paste code thing again: 

```jsx
const stringifiedCastBody = JSON.stringify(cast.body);
const calculatedHash = utils.keccak256(utils.toUtf8Bytes(stringifiedCastBody));
const expectedHash = cast.merkleRoot;

if (calculatedHash !== expectedHash) {
	console.log(`FAILED: the calculated hash ${calculatedHash} does not match the one in the cast: ${expectedHash}`);
} else {
  console.log(`PASSED: the calculated hash ${calculatedHash} matches the one in the cast`);
}

const recoveredAddress = utils.verifyMessage(cast.merkleRoot, cast.signature);
const expectedAddress = cast.body.address;

if (recoveredAddress !== expectedAddress) {
  console.log(
    `Failed: the recovered address ${recoveredAddress} does not match the address  provided in the cast ${expectedAddress}`
  );
} else {
  console.log(`PASSED: the recovered address ${recoveredAddress} matches the one in the cast`);
}
```

If the verification completes successfully, you should see something like this: 

```jsx
PASSED: the calculated hash 0xa20c21aa020c2be7aa6f9577468a4bbf32701ae3d835e882d9a9fd25bdcb4e1e matches the one in the cast
PASSED: the recovered address 0x012D3606bAe7aebF03a04F8802c561330eAce70A matches the one in the cast
```

The Cast that we got in the previous step claims to be from the user. But the Host could be lying to us, or someone might have broken into the Host and changed a user’s messages. We can prove that the message wasn’t tampered with because Farcaster gives us a way to verify any data on the network. 

Every Farcaster Cast is a [Signed Blob](https://www.farcaster.xyz/docs/signed-blob), so it’s body is hashed and signed. The hash is stored in the Cast as the `merkleRoot` and its signature is stored as `signature`. To verify the signature we: 

1. Hash the body with keccak256 and check that the value matches the merkleRoot.
2. Run ecRecover on the secp256k1 signature with the merkleRoot and check that it returns the address. 

If the data matches, then we know that the Cast has not been tampered with since it was created by the user `v` . 

### Step 7: Verify that the address in the Cast actually owns the username v

Finally, we need to go back to the blockchain and check that this address that performed the signatures is the same address that owns the username `v`. Copy and run the following code at the bottom of `doStuff`: 

```jsx
const encodedUsername = await registryContract.addressToUsername(expectedAddress);
const expectedUsername = utils.parseBytes32String(encodedUsername);
const castUsername = cast.body.username;

if (expectedUsername !== castUsername) {
  console.log(`FAILED: ${expectedAddress} does not own ${castUsername}, it owns ${expectedUsername}`);
} else {
  console.log(`PASSED: ${expectedAddress} owns ${castUsername}`);
}
```

If this completes successfully, you see a message like: 

```jsx
PASSED: 0x012D3606bAe7aebF03a04F8802c561330eAce70A owns v
```

Congratulations - you’ve built your first application on Farcaster that can read a user’s messages! You’ve also learned how to verify signatures so that you can receive messages securely from any users on the network.
