# Create an account key

An account can authorize account keys, which can create messages on its behalf.

The owner of the account can revoke an account key at any time. To add an account key, you'll need to follow six steps:

1. Set up [Viem](https://viem.sh/) clients and [`@farcaster/hub-web`](https://www.npmjs.com/package/@farcaster/hub-web) account key.
2. Register an [app fid](/reference/contracts/faq#what-is-an-app-fid-how-do-i-get-one) if your app does not already have one.
3. Create a new account key for the user.
4. Use your app account to create a [Signed Key Request](/reference/contracts/reference/signed-key-request-validator).
5. Collect an [`Add`](/reference/contracts/reference/key-gateway#add-signature) signature from the user.
6. Call the [Key Gateway](https://docs.farcaster.xyz/reference/contracts/reference/key-gateway#addFor) contract to add the key onchain.

### Requirements

- An ETH wallet on OP mainnet, with some ETH
- An ETH RPC URL for OP Mainnet (e.g. via [Alchemy](https://www.alchemy.com/) or [Infura](https://www.infura.io/)).

### 1. Set up clients and account key

First, set up Viem clients and `@farcaster/hub-web` account key. In this example, we'll use Viem local accounts and account key, but
you can also use `ViemWalletEip712Signer` to connect to a user's wallet rather than a local account.

```ts
import * as ed from '@noble/ed25519';
import {
  ID_GATEWAY_ADDRESS,
  ID_REGISTRY_ADDRESS,
  ViemLocalEip712Signer,
  ViemEip712Signer,
  idGatewayABI,
  idRegistryABI,
  NobleEd25519Signer,
  KEY_GATEWAY_ADDRESS,
  keyGatewayABI,
  KEY_REGISTRY_ADDRESS,
  keyRegistryABI,
} from '@farcaster/hub-nodejs';
import { bytesToHex, createPublicClient, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { optimism } from 'viem/chains';

const APP_PRIVATE_KEY = '0x00';
const ALICE_PRIVATE_KEY = '0x00';

const publicClient = createPublicClient({
  chain: optimism,
  transport: http(),
});

const walletClient = createWalletClient({
  chain: optimism,
  transport: http(),
});

const app = privateKeyToAccount(APP_PK);
const accountKey = new ViemLocalEip712Signer(app);

const alice = privateKeyToAccount(ALICE_PK);
const aliceAccountKey = new ViemLocalEip712Signer(alice);

const getDeadline = () => {
  const now = Math.floor(Date.now() / 1000);
  const oneHour = 60 * 60;
  return BigInt(now + oneHour);
};
```

### 2. Register an app fid

Register an app fid if you don't already have one. To register an fid, you'll need to read the price from the ID Gateway, then call the ID Gateway and pay the registration price. You can read back your new FID from the Id Registry contract, or parse it from a `Register` event. Here, we'll read it from the registry contract.

```ts
const price = await publicClient.readContract({
  address: ID_GATEWAY_ADDRESS,
  abi: idGatewayABI,
  functionName: 'price',
  args: [0n],
});

const { request } = await publicClient.simulateContract({
  account: app,
  address: ID_GATEWAY_ADDRESS,
  abi: idGatewayABI,
  functionName: 'register',
  args: [WARPCAST_RECOVERY_PROXY, 0n],
  value: price,
});
await walletClient.writeContract(request);

const APP_FID = await publicClient.readContract({
  address: ID_REGISTRY_ADDRESS,
  abi: idRegistryABI,
  functionName: 'idOf',
  args: [app.address],
});
```

### 3. Create a new account key

Create a new Ed25519 key pair for the user. In a real app, ensure you keep the private key secret.

```ts
const privateKeyBytes = ed.utils.randomPrivateKey();
const accountKey = new NobleEd25519Signer(privateKeyBytes);

let accountPubKey = new Uint8Array();
const accountKeyResult = await accountKey.getSignerKey();
```

### 4. Use your app account to create a Signed Key Request

Create a Signed Key Request, signed by your app account. To do so, you can use the `getSignedKeyRequestMetadata` helper,
which generates and signs the Signed Key Request.

```ts
if (accountKeyResult.isOk()) {
  accountPubKey = accountKeyResult.value;

  const signedKeyRequestMetadata = await accountKey.getSignedKeyRequestMetadata({
    requestFid: APP_FID,
    key: accountPubKey,
    deadline,
  });
}
```

### 5. Collect an `Add` signature from the user.

Collect an EIP-712 `Add` signature from the user to authorize adding an account key to their fid. In a real world app,
you'll likely collect this signature on your frontend, from the user's wallet. In a frontend context, you can us a `ViemEip712WalletSigner` to connect to a browser wallet rather than a local signer.

```ts
if (signedKeyRequestMetadata.isOk()) {
  const metadata = bytesToHex(signedKeyRequestMetadata.value);

  const aliceNonce = await publicClient.readContract({
    address: KEY_GATEWAY_ADDRESS,
    abi: keyGatewayABI,
    functionName: 'nonces',
    args: [alice.address],
  });

  const aliceSignature = await aliceAccountKey.signAdd({
    owner: alice.address,
    keyType: 1,
    key: accountPubKey,
    metadataType: 1,
    metadata,
    nonce,
    deadline,
  });
}
```

### 6. Call the Key Gateway contract to add the key onchain.

Call the Key Gateway contract and provide the user's signature to add the key onchain.

```ts
if (aliceSignature.isOk()) {
  const { request } = await publicClient.simulateContract({
    account: app,
    address: KEY_GATEWAY_ADDRESS,
    abi: keyGatewayABI,
    functionName: 'addFor',
    args: [alice.address, 1, bytesToHex(accountPubKey), 1, metadata, deadline, bytesToHex(aliceSignature.value)],
  });
  await walletClient.writeContract(request);
}
```

### Full code example

See the full code example below for all the steps above.

::: code-group

```ts [@farcaster/hub-web]
import * as ed from '@noble/ed25519';
import {
  ID_GATEWAY_ADDRESS,
  ID_REGISTRY_ADDRESS,
  ViemLocalEip712Signer,
  ViemEip712Signer,
  idGatewayABI,
  idRegistryABI,
  NobleEd25519Signer,
  KEY_GATEWAY_ADDRESS,
  keyGatewayABI,
  KEY_REGISTRY_ADDRESS,
  keyRegistryABI,
} from '@farcaster/hub-nodejs';
import { bytesToHex, createPublicClient, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { optimism } from 'viem/chains';

const APP_PRIVATE_KEY = '0x00';
const ALICE_PRIVATE_KEY = '0x00';

/*******************************************************************************
 * Setup - Create local accounts, Viem clients, helpers, and constants.
 *******************************************************************************/

/**
 * Create Viem public (read) and wallet (write) clients.
 */
const publicClient = createPublicClient({
  chain: optimism,
  transport: http(),
});

const walletClient = createWalletClient({
  chain: optimism,
  transport: http(),
});

/**
 * A local account representing your app. You'll
 * use this to sign key metadata and send
 * transactions on behalf of users.
 */
const app = privateKeyToAccount(APP_PK);
const accountKey = new ViemLocalEip712Signer(app);
console.log('App:', app.address);

/**
 * A local account representing Alice, a user.
 */
const alice = privateKeyToAccount(ALICE_PK);
const aliceAccountKey = new ViemLocalEip712Signer(alice);
console.log('Alice:', alice.address);

/**
 * A convenience function to generate a deadline timestamp one hour from now.
 * All Farcaster EIP-712 signatures include a deadline, a block timestamp
 * after which the signature is no longer valid.
 */
const getDeadline = () => {
  const now = Math.floor(Date.now() / 1000);
  const oneHour = 60 * 60;
  return BigInt(now + oneHour);
};

/*******************************************************************************
 * IdGateway - register - Register an app FID.
 *******************************************************************************/

/**
 *  Get the current price to register. We're not going to register any
 *  extra storage, so we pass 0n as the only argument.
 */
const price = await publicClient.readContract({
  address: ID_GATEWAY_ADDRESS,
  abi: idGatewayABI,
  functionName: 'price',
  args: [0n],
});

/**
 *  Call `register` to register an FID to the app account.
 */
const { request } = await publicClient.simulateContract({
  account: app,
  address: ID_GATEWAY_ADDRESS,
  abi: idGatewayABI,
  functionName: 'register',
  args: [WARPCAST_RECOVERY_PROXY, 0n],
  value: price,
});
await walletClient.writeContract(request);

/**
 *  Read the app fid from the Id Registry contract.
 */
const APP_FID = await publicClient.readContract({
  address: ID_REGISTRY_ADDRESS,
  abi: idRegistryABI,
  functionName: 'idOf',
  args: [app.address],
});

/*******************************************************************************
 * KeyGateway - addFor - Add an account key to Alice's fid.
 *******************************************************************************/

/**
 * To add an account key to Alice's fid, we need to follow four steps:
 *
 * 1. Create a new account key pair for Alice.
 * 2. Use our app account to create a Signed Key Request.
 * 3. Collect Alice's `Add` signature.
 * 4. Call the contract to add the key onchain.
 */

/**
 *  1. Create an Ed25519 account key pair for Alice and get the public key.
 */
const privateKeyBytes = ed.utils.randomPrivateKey();
const accountKey = new NobleEd25519Signer(privateKeyBytes);

let accountPubKey = new Uint8Array();
const accountKeyResult = await accountKey.getSignerKey();
if (accountKeyResult.isOk()) {
  accountPubKey = accountKeyResult.value;

  /**
   *  2. Generate a Signed Key Request from the app account.
   */
  const signedKeyRequestMetadata = await accountKey.getSignedKeyRequestMetadata({
    requestFid: APP_FID,
    key: accountPubKey,
    deadline,
  });

  if (signedKeyRequestMetadata.isOk()) {
    const metadata = bytesToHex(signedKeyRequestMetadata.value);
    /**
     *  3. Read Alice's nonce from the Key Gateway.
     */
    aliceNonce = await publicClient.readContract({
      address: KEY_GATEWAY_ADDRESS,
      abi: keyGatewayABI,
      functionName: 'nonces',
      args: [alice.address],
    });

    /**
     *  Then, collect her `Add` signature.
     */
    aliceSignature = await aliceAccountKey.signAdd({
      owner: alice.address,
      keyType: 1,
      key: accountPubKey,
      metadataType: 1,
      metadata,
      nonce,
      deadline,
    });

    if (aliceSignature.isOk()) {
      /**
       *  Call `addFor` with Alice's signature and the signed key request.
       */
      const { request } = await publicClient.simulateContract({
        account: app,
        address: KEY_GATEWAY_ADDRESS,
        abi: keyGatewayABI,
        functionName: 'addFor',
        args: [alice.address, 1, bytesToHex(accountPubKey), 1, metadata, deadline, bytesToHex(aliceSignature.value)],
      });
      await walletClient.writeContract(request);
    }
  }
}
```

:::

See the [Key Registry](/reference/contracts/reference/id-registry#add) reference for more
details.
