# Create a bot to post messages to the hub

This example will showcase how to write data from the farcater network using the
official [hub-nodejs](https://github.com/farcasterxyz/hub-monorepo/tree/main/packages/hub-nodejs) in typescript.

First we will issue on chain transactions to register a new user, purchase storage and add a signer. Then we will
acquire an fname and set it as our username. Finally, we will post a cast.

## Pre-requisites

Since this example requires on-chain transactions, you will need to have an Ethereum wallet with about ~15$ USD of ETH
bridged to [Optimism](https://www.optimism.io/) and an ethereum provider URL for OP Mainnet (e.g.
via [Alchemy](https://www.alchemy.com/)
or [Infura](https://www.infura.io/)).

## Installation

Create an empty typescript project and install the hub-nodejs package and other required dependencies

```bash
yarn add @farcaster/hub-nodejs axios viem wagmi
```

## 1. Set up constants

```typescript
import {
  ID_GATEWAY_ADDRESS,
  idGatewayABI,
  KEY_GATEWAY_ADDRESS,
  keyGatewayABI,
  ID_REGISTRY_ADDRESS,
  idRegistryABI
} from '@farcaster/hub-web';

/**
 * Populate the following constants with your own values
 */
const MNEMONIC = "<REQUIRED>";
const OP_PROVIDER_URL = "<REQUIRED>"; // Alchemy or Infura url
const RECOVERY_ADDRESS = zeroAddress; // Optional, using the default value means the account will not be recoverable later if the mnemonic is lost
const SIGNER_PRIVATE_KEY: Hex = zeroAddress; // Optional, using the default means a new signer will be created each time

// Note: nemes is the Farcaster team's mainnet hub, which is password protected to prevent abuse. Use a 3rd party hub
// provider like https://neynar.com/ Or, run your own mainnet hub and broadcast to it permissionlessly.
const HUB_URL = "nemes.farcaster.xyz:2283"; // URL + Port of the Hub
const HUB_USERNAME = ""; // Username for auth, leave blank if not using TLS
const HUB_PASS = ""; // Password for auth, leave blank if not using TLS
const USE_SSL = false; // set to true if talking to a hub that uses SSL (3rd party hosted hubs or hubs that require auth)
const FC_NETWORK = FarcasterNetwork.MAINNET; // Network of the Hub

const CHAIN = optimism;

const IdGateway = { abi: idGatewayABI, address: ID_GATEWAY_ADDRESS, chain: CHAIN };
const IdContract = { abi: idRegistryABI, address: ID_REGISTRY_ADDRESS, chain: CHAIN };
const KeyContract = { abi: keyGatewayABI, address: KEY_GATEWAY_ADDRESS, chain: CHAIN };

```

## 2. Register and pay for storage

Create a function to register an FID and pay for storage. This function will check if the account already has an FID
and return early if so.

```typescript
const getOrRegisterFid = async (): Promise<number> => {
  const balance = await walletClient.getBalance({ address: account.address });
  // Check if we already have an fid
  const existingFid = (await walletClient.readContract({
    ...IdContract,
    functionName: "idOf",
    args: [account.address],
  })) as bigint;

  if (existingFid > 0n) {
    return parseInt(existingFid.toString());
  }

  const price = await walletClient.readContract({
    ...IdGateway,
    functionName: "price",
  });
  if (balance < price) {
    throw new Error(`Insufficient balance to rent storage, required: ${price}, balance: ${balance}`);
  }
  const { request: registerRequest } = await walletClient.simulateContract({
    ...IdGateway,
    functionName: "register",
    args: [RECOVERY_ADDRESS],
    value: price,
  });
  const registerTxHash = await walletClient.writeContract(registerRequest);
  const registerTxReceipt = await walletClient.waitForTransactionReceipt({ hash: registerTxHash });
  // Now extract the FID from the logs
  const registerLog = decodeEventLog({
    abi: idRegistryABI,
    data: registerTxReceipt.logs[0].data,
    topics: registerTxReceipt.logs[0].topics,
  });
  const fid = parseInt(registerLog.args["id"]);
  return fid;
};

const fid = await getOrRegisterFid();
```

## 3. Add a signer

Now, we will add a signer to the key registry. Every signer must have a signed metadata field from the fid of the app
requesting it.
In our case, we will use our own fid. Note, this requires you to sign a message with the private key of the address
holding the fid. If this is not possible, register a separate fid for the app fist and use that.

```typescript
const getOrRegisterSigner = async (fid: number) => {
  if (SIGNER_PRIVATE_KEY !== zeroAddress) {
    // If a private key is provided, we assume the signer is already in the key registry
    const privateKeyBytes = fromHex(SIGNER_PRIVATE_KEY, "bytes");
    const publicKeyBytes = ed25519.getPublicKey(privateKeyBytes);
    return privateKeyBytes;
  }

  const privateKey = ed25519.utils.randomPrivateKey();
  const publicKey = toHex(ed25519.getPublicKey(privateKey));

  const eip712signer = new ViemLocalEip712Signer(appAccount);
  // To add a key, we need to sign the metadata with the fid of the app we're adding the key on behalf of
  // Use your personal fid, or register a separate fid for the app
  const metadata = await eip712signer.getSignedKeyRequestMetadata({
    requestFid: APP_FID,
    key: APP_PRIVATE_KEY,
    deadline: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour from now
  });

  const { request: signerAddRequest } = await walletClient.simulateContract({
    ...KeyContract,
    functionName: "add",
    args: [1, publicKey, 1, metadata], // keyType, publicKey, metadataType, metadata
  });

  const signerAddTxHash = await walletClient.writeContract(signerAddRequest);
  await walletClient.waitForTransactionReceipt({ hash: signerAddTxHash });
  // Sleeping 30 seconds to allow hubs to pick up the signer tx
  await new Promise((resolve) => setTimeout(resolve, 30000));
  return privateKey;
};

const signerPrivateKey = await getOrRegisterSigner(fid);
```

## 4. Register an fname

Now that the on-chain actions are complete, let's register an fname using the farcater off-chain fname registry.
Registering an fname requires a signature from the custody address of the fid.

```typescript
const registerFname = async (fid: number) => {
  try {
    // First check if this fid already has an fname
    const response = await axios.get(`https://fnames.farcaster.xyz/transfers/current?fid=${fid}`);
    const fname = response.data.transfer.username;
    return fname;
  } catch (e) {
    // No username, ignore and continue with registering
  }

  const fname = `fid-${fid}`;
  const timestamp = Math.floor(Date.now() / 1000);
  const userNameProofSignature = await walletClient.signTypedData({
    domain: USERNAME_PROOF_DOMAIN,
    types: USERNAME_PROOF_TYPE,
    primaryType: "UserNameProof",
    message: {
      name: fname,
      timestamp: BigInt(timestamp),
      owner: account.address,
    },
  });

  const response = await axios.post("https://fnames.farcaster.xyz/transfers", {
    name: fname, // Name to register
    from: 0, // Fid to transfer from (0 for a new registration)
    to: fid, // Fid to transfer to (0 to unregister)
    fid: fid, // Fid making the request (must match from or to)
    owner: account.address, // Custody address of fid making the request
    timestamp: timestamp, // Current timestamp in seconds
    signature: userNameProofSignature, // EIP-712 signature signed by the current custody address of the fid
  });
  return fname;
};

const fname = await registerFname(fid);
```

## 5. Write to the hub

Finally, we're now ready to submit messages to the hub. First, we shall set the fname as our username. And then post a
cast.

```typescript
const submitMessage = async (resultPromise: HubAsyncResult<Message>) => {
  const result = await resultPromise;
  if (result.isErr()) {
    throw new Error(`Error creating message: ${result.error}`);
  }
  await hubClient.submitMessage(result.value);
};


const signer = new NobleEd25519Signer(signerPrivateKey);
const dataOptions = {
  fid: fid,
  network: FC_NETWORK,
};
const userDataUsernameBody = {
  type: UserDataType.USERNAME,
  value: fname,
};
// Set the username
await submitMessage(makeUserDataAdd(userDataUsernameBody, dataOptions, signer));

// Post a cast
await submitMessage(makeCastAdd(
  {
    text: "Hello World!",
  },
  dataOptions,
  signer,
));
```

## Full example

See the full
example [here](https://github.com/farcasterxyz/hub-monorepo/tree/main/packages/hub-nodejs/examples/write-data).
See [here](https://github.com/farcasterxyz/hub-monorepo/tree/main/packages/hub-nodejs/examples/make-cast)
for examples on how to construct different kinds of casts.

See [the Messages reference](/reference/hubble/datatypes/messages) for more information on the different types of data
that the hub supports.