# Create an account

::: info Pre-requisites

- An Ethereum wallet on Optimism mainnet, with sufficient ETH for gas costs
- An ethereum provider URL for OP Mainnet (e.g. via [Alchemy](https://www.alchemy.com/)
  or [Infura](https://www.infura.io/)).

:::

You can register a new user using the Bundler contract. To do so, you'll need to:

1. Set up [Viem](https://viem.sh/) clients and [`@farcaster/hub-web`](https://www.npmjs.com/package/@farcaster/hub-web) signers.
2. Register an [app fid](/reference/contracts/faq#what-is-an-app-fid-how-do-i-get-one) if your app does not already have one.
3. Collect a [`Register`](/reference/contracts/reference/id-gateway#register-signature) signature from the user.
4. Create a new signer keypair for the user.
5. Use your app account to create a [Signed Key Request](/reference/contracts/reference/signed-key-request-validator).
6. Collect an [`Add`](/reference/contracts/reference/key-gateway#add-signature) signature from the user.
7. Call the [Bundler](https://docs.farcaster.xyz/reference/contracts/reference/bundler#register) contract to register onchain.

### 1. Set up clients and signers

First, set up Viem clients and `@farcaster/hub-web` signers. In this example, we'll use Viem local accounts and signers, but
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
  BUNDLER_ADDRESS,
  bundlerABI,
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
const appSigner = new ViemLocalEip712Signer(app);

const alice = privateKeyToAccount(ALICE_PK);
const aliceSigner = new ViemLocalEip712Signer(alice);

const getDeadline = () => {
  const now = Math.floor(Date.now() / 1000);
  const oneHour = 60 * 60;
  return BigInt(now + oneHour);
};

const WARPCAST_RECOVERY_PROXY = '0x00000000FcB080a4D6c39a9354dA9EB9bC104cd7';
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

### 3. Collect a `Register` signature from the user.

Collect an EIP-712 `Register` signature from the user. In a real world app, you'll likely collect this signature on your frontend, from the user's wallet. In a frontend context, you can us a `ViemEip712WalletSigner` to connect to a browser wallet rather than a local signer.

```ts
let nonce = await publicClient.readContract({
  address: KEY_GATEWAY_ADDRESS,
  abi: keyGatewayABI,
  functionName: 'nonces',
  args: [alice.address],
});

const registerSignature = await aliceSigner.signRegister({
  to: alice.address,
  recovery: WARPCAST_RECOVERY_PROXY,
  nonce,
  deadline,
});
```

### 4. Create a new signer keypair

Create a new Ed25519 signer keypair for the user. In a real app, ensure you keep the user's private key secret.

```ts
const privateKeyBytes = ed.utils.randomPrivateKey();
const signer = new NobleEd25519Signer(privateKeyBytes);

let signerPubKey = new Uint8Array();
const signerKeyResult = await signer.getSignerKey();
```

### 5. Use your app account to create a Signed Key Request

Create a Signed Key Request, signed by your app account. To do so, you can use the `getSignedKeyRequestMetadata` helper,
which generates and signs the Signed Key Request.

```ts
if (signerKeyResult.isOk()) {
  signerPubKey = signerKeyResult.value;

  const signedKeyRequestMetadata = await appSigner.getSignedKeyRequestMetadata({
    requestFid: APP_FID,
    key: signerPubKey,
    deadline,
  });
}
```

### 6. Collect an `Add` signature from the user.

Collect an EIP-712 `Add` signature from the user to authorize adding a signer key to their fid.

```ts
if (signedKeyRequestMetadata.isOk()) {
  const metadata = bytesToHex(signedKeyRequestMetadata.value);

  nonce = await publicClient.readContract({
    address: KEY_GATEWAY_ADDRESS,
    abi: keyGatewayABI,
    functionName: 'nonces',
    args: [alice.address],
  });

  const addSignature = await aliceSigner.signAdd({
    owner: alice.address,
    keyType: 1,
    key: signerPubKey,
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
if (aliceSignature.isOk()) {
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
        recovery: WARPCAST_RECOVERY_PROXY,
        sig: bytesTohex(registerSignature),
        deadline,
      },
      [
        {
          keyType: 1,
          key: bytesToHex(signerPubkey),
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
  BUNDLER_ADDRESS,
  bundlerABI,
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
const appSigner = new ViemLocalEip712Signer(app);

const alice = privateKeyToAccount(ALICE_PK);
const aliceSigner = new ViemLocalEip712Signer(alice);

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
 * Collect Register signature from Alice
 *******************************************************************************/

let nonce = await publicClient.readContract({
  address: KEY_GATEWAY_ADDRESS,
  abi: keyGatewayABI,
  functionName: 'nonces',
  args: [alice.address],
});

const registerSignature = await aliceSigner.signRegister({
  to: alice.address,
  recovery: WARPCAST_RECOVERY_PROXY,
  nonce,
  deadline,
});

/*******************************************************************************
 * Collect Add signature from alice.
 *******************************************************************************/

/**
 *  1. Create an Ed25519 signer keypair for Alice and get the public key.
 */
const privateKeyBytes = ed.utils.randomPrivateKey();
const signer = new NobleEd25519Signer(privateKeyBytes);

let signerPubKey = new Uint8Array();
const signerKeyResult = await signer.getSignerKey();
if (signerKeyResult.isOk()) {
  signerPubKey = signerKeyResult.value;

  /**
   *  2. Generate a Signed Key Request from the app account.
   */
  const signedKeyRequestMetadata = await appSigner.getSignedKeyRequestMetadata({
    requestFid: APP_FID,
    key: signerPubKey,
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
    const addSignature = await aliceSigner.signAdd({
      owner: alice.address,
      keyType: 1,
      key: signerPubKey,
      metadataType: 1,
      metadata,
      nonce,
      deadline,
    });

    if (aliceSignature.isOk()) {
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
            recovery: WARPCAST_RECOVERY_PROXY,
            sig: bytesTohex(registerSignature),
            deadline,
          },
          [
            {
              keyType: 1,
              key: bytesToHex(signerPubkey),
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
