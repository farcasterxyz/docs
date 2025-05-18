# 签名者请求

如果您的应用程序希望代表用户向 Farcaster 写入数据，则必须让用户为其应用程序添加签名密钥。

## 指南

### 前提条件

- 已注册的 FID

### 1. 已认证用户在您的应用中点击"通过 Warpcast 连接"

当您的应用能够识别并认证用户后，您可以向他们展示"通过 Warpcast 连接"的选项。

### 2. 为用户生成新的 Ed25519 密钥对和 SignedKeyRequest 签名

您的应用应生成并与该用户关联的 Ed25519 密钥对，并安全存储。在后续步骤中，您将提示用户批准此密钥对代表他们签署 Farcaster 消息。

需注意以下几点：

- 私钥必须安全存储且永不暴露
- 当用户返回时，可以检索密钥对并用于签署消息

除了生成新的密钥对外，您的应用还必须使用其 FID 的托管地址生成 ECDSA 签名。这允许将密钥归属于应用，对于了解正在使用的应用或基于生成内容的应用程序过滤内容等广泛用途非常有用。

**示例代码：**

```ts
import * as ed from '@noble/ed25519';
import { mnemonicToAccount, signTypedData } from 'viem/accounts';

/*** EIP-712 辅助代码 ***/

const SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_DOMAIN = {
  name: 'Farcaster SignedKeyRequestValidator',
  version: '1',
  chainId: 10,
  verifyingContract: '0x00000000fc700472606ed4fa22623acf62c60553',
} as const;

const SIGNED_KEY_REQUEST_TYPE = [
  { name: 'requestFid', type: 'uint256' },
  { name: 'key', type: 'bytes' },
  { name: 'deadline', type: 'uint256' },
] as const;

/*** 生成密钥对 ***/

const privateKey = ed.utils.randomPrivateKey();
const publicKeyBytes = await ed.getPublicKey(privateKey);
const key = '0x' + Buffer.from(publicKeyBytes).toString('hex');

/*** 生成 Signed Key Request 签名 ***/

const appFid = process.env.APP_FID;
const account = mnemonicToAccount(process.env.APP_MNENOMIC);

const deadline = Math.floor(Date.now() / 1000) + 86400; // 签名有效期为1天
const signature = await account.signTypedData({
  domain: SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_DOMAIN,
  types: {
    SignedKeyRequest: SIGNED_KEY_REQUEST_TYPE,
  },
  primaryType: 'SignedKeyRequest',
  message: {
    requestFid: BigInt(appFid),
    key,
    deadline: BigInt(deadline),
  },
});
```

**截止时间**

此值控制 Signed Key Request 签名的有效期。它是一个以秒为单位的 Unix 时间戳（注意：JavaScript 使用毫秒）。我们建议将其设置为 24 小时。

### 3. 应用使用公钥 + SignedKeyRequest 签名通过 Warpcast API 发起 Signed Key Request

应用调用 Warpcast 后端，返回一个深度链接和一个可用于检查请求状态的会话令牌。

```ts
/*** 创建 Signed Key Request ***/

const warpcastApi = 'https://api.warpcast.com';
const { token, deeplinkUrl } = await axios
  .post(`${warpcastApi}/v2/signed-key-requests`, {
    key: publicKey,
    requestFid: fid,
    signature,
    deadline,
  })
  .then((response) => response.data.result.signedKeyRequest);

// deeplinkUrl 应展示给用户
// token 应用于轮询
```

**重定向 URL**

如果此请求是从可以打开深度链接的原生移动应用发出的，您可以包含一个 redirectUrl，用户在完成请求后应被带回该 URL。

注意：如果您的应用是 PWA 或 Web 应用，请不要包含此值，因为用户将被带回一个没有状态的会话。

**赞助**

您可以为用户赞助链上费用。请参阅下面的[赞助签名者](#sponsoring-a-signer)。

### 4. 应用向用户展示响应中的深度链接

应用展示深度链接，将提示用户打开 Warpcast 应用并授权签名者请求（底部有截图）。应用应引导用户在已安装 Warpcast 的移动设备上打开链接：

1. 在移动设备上时，直接触发深度链接
2. 在 Web 上时，将深度链接显示为可扫描的二维码

**示例代码**

```ts
import QRCode from 'react-qr-code';

const DeepLinkQRCode = (deepLinkUrl) => <QRCode value={deepLinkUrl} />;
```

### 5. 应用开始使用令牌轮询签名者请求端点

向用户展示深度链接后，应用必须等待用户完成签名者请求流程。应用可以轮询签名者请求资源，并查找表明用户已完成请求的数据：

````ts
const poll = async (token: string) => {
  while (true) {
    // 休眠1秒
    await new Promise((r) => setTimeout(r, 2000));

    console.log('轮询签名密钥请求');
    const signedKeyRequest = await axios
      .get(`${warpcastApi}/v2/signed-key-request`, {
        params: {
          token,
        },
      })
      .then((response) => response.data.result.signedKeyRequest);

    if (signedKeyRequest.state === 'completed') {
      console.log('签名密钥请求完成:', signedKeyRequest);

      /**
       * 此时签名者已在链上注册，您可以开始提交
       * 由其密钥签名的消息到 hubs：
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
````

### 6. 用户打开链接并在 Warpcast 中完成签名者请求流程

当用户在 Warpcast 中批准请求时，将进行链上交易，授予该签名者写入权限。完成后，您的应用应显示成功，并可以开始使用新添加的密钥写入消息。

### 参考实现

````ts
import * as ed from '@noble/ed25519';
import { Hex } from 'viem';
import { mnemonicToAccount } from 'viem/accounts';
import axios from 'axios';
import * as qrcode from 'qrcode-terminal';

/*** EIP-712 辅助代码 ***/

const SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_DOMAIN = {
  name: 'Farcaster SignedKeyRequestValidator',
  version: '1',
  chainId: 10,
  verifyingContract: '0x00000000fc700472606ed4fa22623acf62c60553',
} as const;

const SIGNED_KEY_REQUEST_TYPE = [
  { name: 'requestFid', type: 'uint256' },
  { name: 'key', type: 'bytes' },
  { name: 'deadline', type: 'uint256' },
] as const;

(async () => {
  /*** 生成密钥对 ***/

  const privateKey = ed.utils.randomPrivateKey();
  const publicKeyBytes = await ed.getPublicKey(privateKey);
  const key = '0x' + Buffer.from(publicKeyBytes).toString('hex');

  /*** 生成 Signed Key Request 签名 ***/

  const appFid = process.env.APP_FID;
  const account = mnemonicToAccount(process.env.APP_MNEMONIC);

  const deadline = Math.floor(Date.now() / 1000) + 86400; // 签名有效期为1天
  const signature = await account.signTypedData({
    domain: SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_DOMAIN,
    types: {
      SignedKeyRequest: SIGNED_KEY_REQUEST_TYPE,
    },
    primaryType: 'SignedKeyRequest',
    message: {
      requestFid: BigInt(appFid),
      key,
      deadline: BigInt(deadline),
    },
  });

  /*** 创建 Signed Key Request ***/

  const warpcastApi = 'https://api.warpcast.com';
  const { token, deeplinkUrl } = await axios
    .post(`${warpcastApi}/v2/signed-key-requests`, {
      key,
      requestFid: appFid,
      signature,
      deadline,
    })
    .then((response) => response.data.result.signedKeyRequest);

  qrcode.generate(deeplinkUrl, console.log);
  console.log('用手机扫描此二维码');
  console.log('深度链接:', deeplinkUrl);

  const poll = async (token: string) => {
    while (true) {
      // 休眠1秒
      await new Promise((r) => setTimeout(r, 2000));

      console.log('轮询签名密钥请求');
      const signedKeyRequest = await axios
        .get(`${warpcastApi}/v2/signed-key-request`, {
          params: {
            token,
          },
        })
        .then((response) => response.data.result.signedKeyRequest);

      if (signedKeyRequest.state === 'completed') {
        console.log('签名密钥请求完成:', signedKeyRequest);

        /**
         * 此时签名者已在链上注册，您可以开始提交
         * 由其密钥签名的消息到 hubs：
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
````

## API

### POST /v2/signed-key-request

创建签名密钥请求。

**请求体：**

- `key` - Ed25519 公钥的十六进制字符串
- `requestFid` - 请求应用的 fid
- `deadline` - 签名有效的 Unix 时间戳
- `signature` - 来自请求应用的 [SignedKeyRequest](https://docs.farcaster.xyz/reference/contracts/reference/signed-key-request-validator#signed-key-request-validator) 签名
- `redirectUrl` - 可选。批准签名者后应重定向到的 URL。注意：仅当从原生移动应用请求签名者时才应使用此值。
- `sponsorship` -

**示例响应：**

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

### GET /v2/signed-key-request

获取签名密钥请求的状态。

**查询参数：**

- `token` - 标识请求的令牌

**响应：**

- `token` - 标识请求的令牌
- `deeplinkUrl` - 用户可完成请求的 URL
- `key` - 请求添加的密钥
- `state` - 请求状态：`pending` - 用户未采取任何操作，`approved` - 用户已批准但链上交易未确认，`completed` - 链上交易已确认

**待处理状态的示例响应：**

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

**批准后但交易未确认的示例响应：**

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

**交易确认后的示例响应：**

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

## 赞助签名者

应用可以赞助签名者，这样用户无需支付费用。应用必须在 Warpcast 上注册并拥有 warps ≥ 100。

生成签名密钥请求时，应用可以通过在请求体中包含额外的 `sponsorship` 字段来表明应被赞助。

```ts
type SignedKeyRequestSponsorship = {
  sponsorFid: number;
  signature: string; // 由 sponsorFid 签署的赞助签名
};

type SignedKeyRequestBody = {
  key: string;
  requestFid: number;
  deadline: number;
  signature: string; // 由 requestFid 签署的密钥请求签名
  sponsorship?: SignedKeyRequestSponsorship;
};
```

创建 `SignedKeyRequestSponsorship`：

1. 创建密钥对并让请求 FID 生成签名
2. 从赞助 FID 创建第二个签名，使用步骤 1 中生成的签名作为 EIP-191 消息的原始输入

```ts
// sponsoringAccount 是赞助 FID 托管地址的 Viem 账户实例
// signedKeyRequestSignature 是由请求 FID 签署的 EIP-712 签名
const sponsorSignature = sponsoringAccount.signMessage({
  message: { raw: signedKeyRequestSignature },
});
```

当用户在 Warpcast 中打开签名密钥请求时，他们将看到链上费用已由您的应用赞助。
