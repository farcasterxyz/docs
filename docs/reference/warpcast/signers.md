# Signers

If your application wants to write data to Farcaster on behalf of a user, the application must get the user to add a signing key for their application.

## Guide

#### Prerequisites
- a registered FID

#### 1. An authenciated user clicks "Connect with Warpcast" in your app

Your app should be able to identify and authenticate a user before presenting
them with the option to Connect with Warpcast.

#### 2. Generate a new Ed25519 key pair for the user and SignedKeyRequest signature

Your app should generate and securely store an Ed25519 associated with this
user. In the next steps, you will prompt the user to approve this keypair to
signer messages on their behalf.

Since this keypair can write to the protocol on behalf of the user it's
important that:

- the private key is stored securely and never exposed
- the key pair can be retrieved and used to sign messages when the user returns

In addition to generating a new key pair, your application must produce an
ECDSA signature using the custody address of its FID. This allows the key to be
attributed to the application which is useful for a wide range of things from
knowing which apps are being used to filtering content based on the
applications that generated them.

**Example code:**

```ts
import * as ed from "@noble/ed25519";
import { mnemonicToAccount, signTypedData } from "viem/accounts";

/*** EIP-712 helper code ***/

const SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_DOMAIN = {
  name: "Farcaster SignedKeyRequestValidator",
  version: "1",
  chainId: 10,
  verifyingContract: "0x00000000fc700472606ed4fa22623acf62c60553",
} as const;

const SIGNED_KEY_REQUEST_TYPE = [
  { name: "requestFid", type: "uint256" },
  { name: "key", type: "bytes" },
  { name: "deadline", type: "uint256" },
] as const;

/*** Generating a keypair ***/

const privateKey = ed.utils.randomPrivateKey();
const publicKeyBytes = await ed.getPublicKey(privateKey);
const key = "0x" + Buffer.from(publicKeyBytes).toString("hex");

/*** Generating a Signed Key Request signature ***/

const appFid = process.env.APP_FID;
const account = mnemonicToAccount(process.env.APP_MNENOMIC);

const deadline = Math.floor(Date.now() / 1000) + 86400; // signature is valid for 1 day
const signature = await account.signTypedData({
  domain: SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_DOMAIN,
  types: {
    SignedKeyRequest: SIGNED_KEY_REQUEST_TYPE,
  },
  primaryType: "SignedKeyRequest",
  message: {
    requestFid: BigInt(appFid),
    key,
    deadline: BigInt(deadline),
  },
});
```

**Deadline**

This value controls how long the Signed Key Request signature is valid for. It
is a Unix timestamp in second (note: JavaScript uses millisecond). We recommend
setting this to 24 hours.

#### 3. App uses the public key + SignedKeyRequest signature to initiate a Signed Key Request using the Warpcast API

The app calls the Warpcast backend which returns a deeplink  and a session token that can be used to check the status of the request.

```ts
/*** Creating a Signed Key Request ***/

const warpcastApi = "https://api.warpcast.com";
const { token, deeplinkUrl } = await axios
    .post(`${warpcastApi}/v2/signed-key-requests`, {
      key: publicKey,
      requestFid: fid,
      signature,
      deadline,
    })
    .then((response) => response.data.result.signedKeyRequest);

// deeplinkUrl should be presented to the user
// token should be used to poll
```

**Redirect URL**

If this request is being made from a native mobile application that can open
deeplinks, you can include a redirectUrl that the user should be brought back
to after they complete the request.

Note: if your app is PWA or web app do not include this value as the user will
brought to a session that has no state.

***Sponsorships**

You can sponsor the onchain fees for the user. See [Sponsoring a signer](#sponsoring-a-signer) below.

#### 4. Application presents the deep link from the response to the user 

The app presents the deeplink which will prompt the user to open the Warpcast
app and authorize the signer request (screenshots at the bottom). The app
should direct the user to open the link on their mobile device they have
Warpcast installed on:

1. when on mobile, trigger the deeplink directly
2. when on web, display the deeplink as a QR code to scan

**Example code**

```ts
import QRCode from "react-qr-code";

const DeepLinkQRCode = (deepLinkUrl) => <QRCode value={deepLinkUrl} />
```

#### 5. Application begins polling Signer Request endpoint using token

Once the user has been presented the deep link, the application must wait for
the user to complete the signer request flow. The application can poll the
signer request resource and look for the data that indicates the user has
completed the request:

```ts
const poll = async (token: string) => {
  while (true) {
    // sleep 1s
    await new Promise((r) => setTimeout(r, 2000));

    console.log("polling signed key request");
    const signedKeyRequest = await axios
      .get(`${warpcastApi}/v2/signed-key-request`, {
        params: {
          token,
        },
      })
      .then((response) => response.data.result);

    if (signedKeyRequest.state === "completed") {
      console.log("Signed Key Request completed:", signedKeyRequest);

      /**
       * At this point the signer has been registered onchain and you can start submitting
       * messages to hubs signed by its key:
       * ```
       * const signer = Ed25519Signer.fromPrivateKey(privateKey)._unsafeUnwrap();
       * const message = makeCastAdd(..., signer)
       * ```
       */
      break;
    }
  }
};

poll(token);
```

#### 6. User opens the link and completes Signer Request flow in Warpcast

When the user approves the request in Warpcast, an onchain transaction will be
made that grants write permissions to that signer. Once that completes your app 
should indicate success and can being writing messages using the newly added key.

#### Reference implementation

```ts
import * as ed from "@noble/ed25519";
import { Hex } from "viem";
import { mnemonicToAccount } from "viem/accounts";
import axios from "axios";
import * as qrcode from "qrcode-terminal";

/*** EIP-712 helper code ***/

const SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_DOMAIN = {
  name: "Farcaster SignedKeyRequestValidator",
  version: "1",
  chainId: 10,
  verifyingContract: "0x00000000fc700472606ed4fa22623acf62c60553",
} as const;

const SIGNED_KEY_REQUEST_TYPE = [
  { name: "requestFid", type: "uint256" },
  { name: "key", type: "bytes" },
  { name: "deadline", type: "uint256" },
] as const;

(async () => {
		/*** Generating a keypair ***/
		
		const privateKey = ed.utils.randomPrivateKey();
		const publicKeyBytes = await ed.getPublicKey(privateKey);
		const key = "0x" + Buffer.from(publicKeyBytes).toString("hex");
		
		/*** Generating a Signed Key Request signature ***/
		
		const appFid = process.env.APP_FID;
		const account = mnemonicToAccount(process.env.APP_MNEMONIC);
		
		const deadline = Math.floor(Date.now() / 1000) + 86400; // signature is valid for 1 day
		const signature = await account.signTypedData({
			domain: SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_DOMAIN,
			types: {
			  SignedKeyRequest: SIGNED_KEY_REQUEST_TYPE,
			},
			primaryType: "SignedKeyRequest",
			message: {
			  requestFid: BigInt(appFid),
			  key,
			  deadline: BigInt(deadline),
			},
		});
		
		/*** Creating a Signed Key Request ***/
		
		const warpcastApi = "https://api.warpcast.com";
		const { token, deeplinkUrl } = await axios
		  .post(`${warpcastApi}/v2/signed-key-requests`, {
		    key,
		    requestFid: appFid,
		    signature,
		    deadline,
		  })
		  .then((response) => response.data.result.signedKeyRequest);
		
  qrcode.generate(deeplinkUrl, console.log);
  console.log("scan this with your phone");
  console.log("deep link:", deeplinkUrl);

  const poll = async (token: string) => {
    while (true) {
      // sleep 1s
      await new Promise((r) => setTimeout(r, 2000));

      console.log("polling signed key request");
      const signedKeyRequest = await axios
        .get(`${warpcastApi}/v2/signed-key-request`, {
          params: {
            token,
          },
        })
        .then((response) => response.data.result);

      if (signedKeyRequest.state === "completed") {
        console.log("Signed Key Request completed:", signedKeyRequest);

        /**
         * At this point the signer has been registered onchain and you can start submitting
         * messages to hubs signed by its key:
         * ```
         * const signer = Ed25519Signer.fromPrivateKey(privateKey)._unsafeUnwrap();
         * const message = makeCastAdd(..., signer)
         * ```
         */
        break;
      }
    }
  };

  await poll(token);
})();

```

## API

#### POST /v2/signed-key-request

Create a signed key requests.

**Body:**

- `key` - hex string of the Ed25519 public key
- `requestFid` - fid of the requesting application
- `deadline` - Unix timestamp signature is valid until
- `signature` - [SignedKeyRequest](https://docs.farcaster.xyz/reference/contracts/reference/signed-key-request-validator#signed-key-request-validator) signature from the requesting application
- `redirectUrl` - Optional. Url to redirect to after the signer is approved. Note: this should only be used when requesting a signer from a native mobile application.
- `sponsorship` - 

**Sample response:**

```json
{
  "result": {
    "signedKeyRequest": {
      "token": "0xa241e6b1287a07f4d3f9c5bd",
	  "deeplinkUrl": "farcaster://signed-key-request?token=0xa241e6b1287a07f4d3f9c5bd"
      "key": "0x48b0c7a6deff69bad7673357df43274f3a08163a6440b7a7e3b3cb6b6623faa7",
      "state": "pending"
    }
  }
}
```

#### GET /v2/signed-key-request

Get the state of a signed key requests.

**Query parameters:**

- `token` - token identifying the request

**Response:**

- `token` - token identifying the request
- `deeplinkUrl` - URL where the user can complete the request
- `key` - requested key to add
- `state` - state of the request: `pending` - no action taken by user, `approved` - user has approved but onchain transaction is not confirmed, `completed` - onchain transaction is confirmed

**Sample response in pending state:**

```json
{
  "result": {
    "signedKeyRequest": {
      "token": "0xa241e6b1287a07f4d3f9c5bd",
	    "deeplinkUrl": "farcaster://signed-key-request?token=0xa241e6b1287a07f4d3f9c5bd"
      "key": "0x48b0c7a6deff69bad7673357df43274f3a08163a6440b7a7e3b3cb6b6623faa7",
			"state": "pending"
    }
  }
}
```


**Sample response after approval but before transaction is confirmed:**

```json
{
  "result": {
    "signedKeyRequest": {
      "token": "0xa241e6b1287a07f4d3f9c5bd",
      "deeplinkUrl": "farcaster://signed-key-request?token=0xa241e6b1287a07f4d3f9c5bd"
      "key": "0x48b0c7a6deff69bad7673357df43274f3a08163a6440b7a7e3b3cb6b6623faa7",
      "state": "approved",
      "userFid": 1,
    }
  }
}
```

**Sample response after after transaction is confirmed:**

```json
{
  "result": {
    "signedKeyRequest": {
      "token": "0xa241e6b1287a07f4d3f9c5bd",
	  "deeplinkUrl": "farcaster://signed-key-request?token=0xa241e6b1287a07f4d3f9c5bd"
      "key": "0x48b0c7a6deff69bad7673357df43274f3a08163a6440b7a7e3b3cb6b6623faa7",
	  "state": "completed",
	  "userFid": 1,
    }
  }
}
```

## Sponsoring a signer

An application can sponsor a signer so that the user doesn’t need to pay. The
application must be signed up on Warpcast and have a warps ≥ 100.

When generating a signed key request an application can indicate it should be
sponsored by including an additional `sponsorship` field in the request body.

```ts
type SignedKeyRequestSponsorship = {
  sponsorFid: number;
  signature: string; // sponsorship signature by sponsorFid
}

type SignedKeyRequestBody = {
  key: string;
  requestFid: number;
  deadline: number;
  signature: string; // key request signature by requestFid
  sponsorship?: SignedKeyRequestSponsorship;
}
```

To create a `SignedKeyRequestSponsorship`:

1. create the key pair and have the requesting FID generate a signature
2. create a second signature from the sponsoring FID using the signature generated in step 1 as the raw input to an EIP-191 message

```ts
// sponsoringAccount is Viem account instance for the sponsoring FID's custody address
// signedKeyRequestSignature is the EIP-712 signature signed by the requesting FID
const sponsorSignature = sponsoringAccount.signMessage({ message: { raw: signedKeyRequestSignature }});
```

When the user opens the signed key request in Warpcast they will the onchain fees have been sponsored by your application. 
