# 消息 API

消息 API 允许您向 Hub 验证并提交已签名的 Farcaster 协议消息。请注意，消息必须作为 protobuf 的编码字节流（在 TypeScript 中为`Message.encode(msg).finish()`）通过 POST 数据发送到端点。

POST 数据的编码必须设置为`application/octet-stream`。如果消息成功提交或验证，端点将返回 JSON 格式的 Message 对象。

## submitMessage

向 Hub 提交已签名的 protobuf 序列化消息

**查询参数**
| 参数 | 描述 | 示例 |
| ---- | ----- | ---- |
| | 此端点不接受任何参数 | |

**示例**

```bash
curl -X POST "http://127.0.0.1:2281/v1/submitMessage" \
     -H "Content-Type: application/octet-stream" \
     --data-binary "@message.encoded.protobuf"

```

**响应**

```json
{
  "data": {
    "type": "MESSAGE_TYPE_CAST_ADD",
    "fid": 2,
    "timestamp": 48994466,
    "network": "FARCASTER_NETWORK_MAINNET",
    "castAddBody": {
      "embedsDeprecated": [],
      "mentions": [],
      "parentCastId": {
        "fid": 226,
        "hash": "0xa48dd46161d8e57725f5e26e34ec19c13ff7f3b9"
      },
      "text": "Cast Text",
      "mentionsPositions": [],
      "embeds": []
    }
  },
  "hash": "0xd2b1ddc6c88e865a33cb1a565e0058d757042974",
  "hashScheme": "HASH_SCHEME_BLAKE3",
  "signature": "3msLXzxB4eEYe...dHrY1vkxcPAA==",
  "signatureScheme": "SIGNATURE_SCHEME_ED25519",
  "signer": "0x78ff9a...58c"
}
```

### 认证

如果服务器启用了 RPC 认证（使用`--rpc-auth 用户名:密码`），在调用`submitMessage`时还需要通过 HTTP 基本认证传递用户名和密码。

**示例**

```bash
curl -X POST "http://127.0.0.1:2281/v1/submitMessage" \
     -u "用户名:密码" \
     -H "Content-Type: application/octet-stream" \
     --data-binary "@message.encoded.protobuf"
```

**JS 示例**

```Javascript
import axios from "axios";

const url = `http://127.0.0.1:2281/v1/submitMessage`;

const postConfig = {
  headers: { "Content-Type": "application/octet-stream" },
  auth: { username: "用户名", password: "密码" },
};

// 将消息编码为字节Buffer
const messageBytes = Buffer.from(Message.encode(castAdd).finish());

try {
  const response = await axios.post(url, messageBytes, postConfig);
} catch (e) {
  // 处理错误...
}
```

## validateMessage

通过 Hub 验证已签名的 protobuf 序列化消息。可用于确认 Hub 会认为该消息有效，或验证无法提交的消息（如 Frame 操作）。

::: details
Hub 对所有消息进行以下验证：

- FID 已注册
- 签名者活跃且已注册到该 FID
- 消息哈希正确
- 签名有效且与签名者对应
- 其他特定于消息的验证

对于 FrameAction 消息，请注意 Hub 不会验证 castId 是否真实存在，也不会验证 frame URL 是否与嵌入 cast 中的 URL 匹配。如果这对您的应用很重要，请自行检查。

:::

**查询参数**
| 参数 | 描述 | 示例 |
| ---- | ----- | ---- |
| | 此端点不接受任何参数 | |

**示例**

```bash
curl -X POST "http://127.0.0.1:2281/v1/validateMessage" \
     -H "Content-Type: application/octet-stream" \
     --data-binary "@message.encoded.protobuf"

```

**响应**

```json
{
  "valid": true,
  "message": {
    "data": {
      "type": "MESSAGE_TYPE_FRAME_ACTION",
      "fid": 2,
      "timestamp": 48994466,
      "network": "FARCASTER_NETWORK_MAINNET",
      "frameActionBody": {
        "url": "https://fcpolls.com/polls/1",
        "buttonIndex": 2,
        "inputText": "",
        "castId": {
          "fid": 226,
          "hash": "0xa48dd46161d8e57725f5e26e34ec19c13ff7f3b9"
        }
      }
    },
    "hash": "0xd2b1ddc6c88e865a33cb1a565e0058d757042974",
    "hashScheme": "HASH_SCHEME_BLAKE3",
    "signature": "3msLXzxB4eEYe...dHrY1vkxcPAA==",
    "signatureScheme": "SIGNATURE_SCHEME_ED25519",
    "signer": "0x78ff9a...58c"
  }
}
```

## 在 Rust、Go 或其他编程语言中使用

消息需要使用属于 FID 的 Ed25519 账户密钥签名。如果您使用的编程语言不是 TypeScript，可以手动构造`MessageData`对象并将其序列化到消息的`data_bytes`字段。然后使用`data_bytes`计算`hash`和`signature`。更多详情请参阅[`rust-submitmessage`示例](https://github.com/farcasterxyz/hub-monorepo/tree/main/packages/hub-web/examples)。

```rust
use ed25519_dalek::{SecretKey, Signer, SigningKey};
use hex::FromHex;
use reqwest::Client;

use message::{CastAddBody, FarcasterNetwork, MessageData};
use protobuf::Message;


#[tokio::main]
async fn main() {
    let fid = 6833; // 提交消息用户的FID
    let network = FarcasterNetwork::FARCASTER_NETWORK_MAINNET;

    // 构造cast add消息
    let mut cast_add = CastAddBody::new();
    cast_add.set_text("欢迎使用Rust!".to_string());

    // 构造cast add消息数据对象
    let mut msg_data = MessageData::new();
    msg_data.set_field_type(message::MessageType::MESSAGE_TYPE_CAST_ADD);
    msg_data.set_fid(fid);
    msg_data.set_timestamp(
        (std::time::SystemTime::now()
            .duration_since(FARCASTER_EPOCH)
            .unwrap()
            .as_secs()) as u32,
    );
    msg_data.set_network(network);
    msg_data.set_cast_add_body(cast_add);

    let msg_data_bytes = msg_data.write_to_bytes().unwrap();

    // 计算blake3哈希，截断为20字节
    let hash = blake3::hash(&msg_data_bytes).as_bytes()[0..20].to_vec();

    // 构造实际消息
    let mut msg = message::Message::new();
    msg.set_hash_scheme(message::HashScheme::HASH_SCHEME_BLAKE3);
    msg.set_hash(hash);

    // 签名消息。需要使用与您添加的FID对应的签名密钥。
    // 请替换为您自己的私钥
    let private_key = SigningKey::from_bytes(
        &SecretKey::from_hex("0x...").expect("请提供有效的私钥"),
    );
    let signature = private_key.sign(&msg_data_bytes).to_bytes();

    msg.set_signature_scheme(message::SignatureScheme::SIGNATURE_SCHEME_ED25519);
    msg.set_signature(signature.to_vec());
    msg.set_signer(private_key.verifying_key().to_bytes().to_vec());

    // 序列化消息
    msg.set_data_bytes(msg_data_bytes.to_vec());
    let msg_bytes = msg.write_to_bytes().unwrap();

    // 最后，将消息提交到网络

    // 创建reqwest客户端
    let client = Client::new();

    // 定义端点URL
    let url = "http://127.0.0.1:2281/v1/submitMessage";

    // 发送POST请求
    let res = client
        .post(url)
        .header("Content-Type", "application/octet-stream")
        .body(msg_bytes)
        .send()
        .await
        .unwrap();

    // 检查是否成功
    if res.status().is_success() {
        println!("消息发送成功。");
    } else {
        println!("消息发送失败。HTTP状态: {}", res.status());
    }
}

```
