# Create an account

::: info Pre-requisites

- An Ethereum wallet on OP Mainnet, with sufficient ETH for gas costs.
- An Ethereum provider URL for OP Mainnet (e.g. via [Alchemy](https://www.alchemy.com/), [Infura](https://www.infura.io/) or [QuickNode](https://www.quicknode.com/)).

:::

You can register a new user using the Bundler contract. To do so, you'll need to:

1. Set up [Viem](https://viem.sh/) clients and [`@farcaster/hub-web`](https://www.npmjs.com/package/@farcaster/hub-web) account keys.
2. Register an [app FID](/reference/contracts/faq#what-is-an-app-fid-how-do-i-get-one) if your app does not already have one.
3. Collect a [`Register`](/reference/contracts/reference/id-gateway#register-signature) signature from the user.
4. Create a new account key pair for the user.
5. Use your app account to create a [Signed Key Request](/reference/contracts/reference/signed-key-request-validator).
6. Collect an [`Add`](/reference/contracts/reference/key-gateway#add-signature) signature from the user.
7. Call the [Bundler](https://docs.farcaster.xyz/reference/contracts/reference/bundler#register) contract to register onchain.

### 1. Set up clients and account keys

First, set up Viem clients and `@farcaster/hub-web` account keys. In this example, we'll use Viem local accounts and account keys, but
you can also use `ViemWalletEip712Signer` to connect to a user's wallet rather than a local account.

```ts
import * as ed from '@noble/ed25519';
import {
  ID_GATEWAY_ADDRESS,
  ID_REGISTRY_ADDRESS,
  ViemLocalEip712Signer,
  idGatewayABI,
  idRegistryABI,
  NobleEd25519Signer,
  BUNDLER_ADDRESS,
  bundlerABI,
  KEY_GATEWAY_ADDRESS,
  keyGatewayABI,
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

const app = privateKeyToAccount(APP_PRIVATE_KEY);
const appAccountKey = new ViemLocalEip712Signer(app as any);

const alice = privateKeyToAccount(ALICE_PRIVATE_KEY);
const aliceAccountKey = new ViemLocalEip712Signer(alice as any);

const deadline = BigInt(Math.floor(Date.now() / 1000) + 3600); // Set the signatures' deadline to 1 hour from now

const FARCASTER_RECOVERY_PROXY = '0x00000000FcB080a4D6c39a9354dA9EB9bC104cd7';
```

### 2. Register an app FID

Register an app FID if you don't already have one. To register an FID, you'll need to read the price from the ID Gateway, then call the ID Gateway and pay the registration price. You can read back your new FID from the Id Registry contract, or parse it from a `Register` event. Here, we'll read it from the registry contract.

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
  args: [FARCASTER_RECOVERY_PROXY, 0n],
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

### 3. Collect a `Register` signature from the user.

Collect an EIP-712 `Register` signature from the user. In a real world app, you'll likely collect this signature on your frontend, from the user's wallet. In a frontend context, you can us a `ViemEip712WalletSigner` to connect to a browser wallet rather than a local signer.

```ts
let nonce = await publicClient.readContract({
  address: ID_REGISTRY_ADDRESS,
  abi: idRegistryABI,
  functionName: 'nonces',
  args: [alice.address],
});

const registerSignatureResult = await aliceAccountKey.signRegister({
  to: alice.address as `0x${string}`,
  recovery: FARCASTER_RECOVERY_PROXY,
  nonce,
  deadline,
});

let registerSignature;
if (registerSignatureResult.isOk()) {
  registerSignature = registerSignatureResult.value;
} else {
  throw new Error('Failed to generate register signature');
}
```

### 4. Create a new account keypair

Create a new Ed25519 account keypair for the user. In a real app, ensure you keep the user's private key secret.

```ts
const privateKeyBytes = ed.utils.randomPrivateKey();
const accountKey = new NobleEd25519Signer(privateKeyBytes);

let accountPubKey = new Uint8Array();
const accountKeyResult = await accountKey.getSignerKey();
```

### 5. Use your app account to create a Signed Key Request

Create a Signed Key Request, signed by your app account. To do so, you can use the `getSignedKeyRequestMetadata` helper,
which generates and signs the Signed Key Request.

```ts
if (accountKeyResult.isOk()) {
  accountPubKey = accountKeyResult.value;

  const signedKeyRequestMetadata =
    await appAccountKey.getSignedKeyRequestMetadata({
      requestFid: APP_FID,
      key: accountPubKey,
      deadline,
    });
}
```

### 6. Collect an `Add` signature from the user.

Collect an EIP-712 `Add` signature from the user to authorize adding an account key to their FID.

```ts
if (signedKeyRequestMetadata.isOk()) {
  const metadata = bytesToHex(signedKeyRequestMetadata.value);

  nonce = await publicClient.readContract({
    address: KEY_GATEWAY_ADDRESS,
    abi: keyGatewayABI,
    functionName: 'nonces',
    args: [alice.address],
  });

  const addSignatureResult = await aliceAccountKey.signAdd({
    owner: alice.address as `0x${string}`,
    keyType: 1,
    key: accountPubKey,
    metadataType: 1,
    metadata,
    nonce,
    deadline,
  });
}
```

### 7. Call the Bundler contract to register onchain.

Call the Key Gateway contract and provide the user's signature to add the key onchain.

```ts
if (addSignatureResult.isOk()) {
  const addSignature = addSignatureResult.value;

  const price = await publicClient.readContract({
    address: BUNDLER_ADDRESS,
    abi: bundlerABI,
    functionName: 'price',
    args: [0n],
  });

  const { request } = await publicClient.simulateContract({
    account: app,
    address: BUNDLER_ADDRESS,
    abi: bundlerABI,
    functionName: 'register',
    args: [
      {
        to: alice.address,
        recovery: FARCASTER_RECOVERY_PROXY,
        sig: bytesToHex(registerSignature),
        deadline,
      },
      [
        {
          keyType: 1,
          key: bytesToHex(accountPubKey),
          metadataType: 1,
          metadata: metadata,
          sig: bytesToHex(addSignature.value),
          deadline,
        },
      ],
      0n,
    ],
    value: price,
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
  idGatewayABI,
  idRegistryABI,
  NobleEd25519Signer,
  BUNDLER_ADDRESS,
  bundlerABI,
  KEY_GATEWAY_ADDRESS,
  keyGatewayABI,
} from '@farcaster/hub-nodejs';
import { bytesToHex, createPublicClient, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { optimism } from 'viem/chains';

const APP_PRIVATE_KEY = '0x00';
const ALICE_PRIVATE_KEY = '0x00';

const publicClient = createPublicClient({
  chain: optimism,
  transport: http('http://localhost:8545'),
});

const walletClient = createWalletClient({
  chain: optimism,
  transport: http('http://localhost:8545'),
});

const app = privateKeyToAccount(APP_PRIVATE_KEY);
const appAccountKey = new ViemLocalEip712Signer(app as any);

const alice = privateKeyToAccount(ALICE_PRIVATE_KEY);
const aliceAccountKey = new ViemLocalEip712Signer(alice as any);

const deadline = BigInt(Math.floor(Date.now() / 1000) + 3600); // Set the signatures' deadline to 1 hour from now

const FARCASTER_RECOVERY_PROXY = '0x00000000FcB080a4D6c39a9354dA9EB9bC104cd7';

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
  args: [FARCASTER_RECOVERY_PROXY, 0n],
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
 * Collect Register signature from Alice
 *******************************************************************************/

let nonce = await publicClient.readContract({
  address: KEY_GATEWAY_ADDRESS,
  abi: keyGatewayABI,
  functionName: 'nonces',
  args: [alice.address],
});

const registerSignatureResult = await aliceAccountKey.signRegister({
  to: alice.address as `0x${string}`,
  recovery: FARCASTER_RECOVERY_PROXY,
  nonce,
  deadline,
});

let registerSignature;
if (registerSignatureResult.isOk()) {
  registerSignature = registerSignatureResult.value;
} else {
  throw new Error('Failed to generate register signature');
}

/*******************************************************************************
 * Collect Add signature from Alice.
 *******************************************************************************/

/**
 *  1. Create an Ed25519 account keypair for Alice and get the public key.
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
  const signedKeyRequestMetadata =
    await appAccountKey.getSignedKeyRequestMetadata({
      requestFid: APP_FID,
      key: accountPubKey,
      deadline,
    });

  if (signedKeyRequestMetadata.isOk()) {
    const metadata = bytesToHex(signedKeyRequestMetadata.value);
    /**
     *  3. Read Alice's nonce from the Key Gateway.
     */
    nonce = await publicClient.readContract({
      address: KEY_GATEWAY_ADDRESS,
      abi: keyGatewayABI,
      functionName: 'nonces',
      args: [alice.address],
    });

    /**
     *  Then, collect her `Add` signature.
     */
    const addSignatureResult = await aliceAccountKey.signAdd({
      owner: alice.address as `0x${string}`,
      keyType: 1,
      key: accountPubKey,
      metadataType: 1,
      metadata,
      nonce,
      deadline,
    });

    if (addSignatureResult.isOk()) {
      const addSignature = addSignatureResult.value;
      /**
       *  Read the current registration price.
       */
      const price = await publicClient.readContract({
        address: BUNDLER_ADDRESS,
        abi: bundlerABI,
        functionName: 'price',
        args: [0n],
      });

      /**
       *  Call `register` with Alice's signatures, registration, and key parameters.
       */
      const { request } = await publicClient.simulateContract({
        account: app,
        address: BUNDLER_ADDRESS,
        abi: bundlerABI,
        functionName: 'register',
        args: [
          {
            to: alice.address,
            recovery: FARCASTER_RECOVERY_PROXY,
            sig: bytesToHex(registerSignature),
            deadline,
          },
          [
            {
              keyType: 1,
              key: bytesToHex(accountPubKey),
              metadataType: 1,
              metadata: metadata,
              sig: bytesToHex(addSignature),
              deadline,
            },
          ],
          0n,
        ],
        value: price,
      });
      await walletClient.writeContract(request);
    }
  }
}
```

:::

See the [Bundler](/reference/contracts/reference/bundler#register) reference for more
details.
