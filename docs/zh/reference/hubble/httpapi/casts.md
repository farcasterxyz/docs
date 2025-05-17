# Casts API

## castById

通过 FID 和哈希值获取指定 Cast。

**查询参数**
| 参数 | 描述 | 示例 |
| --------- | ----------- | ------- |
| fid | Cast 创建者的 FID | `fid=6833` |
| hash | Cast 的哈希值 | `hash=0xa48dd46161d8e57725f5e26e34ec19c13ff7f3b9` |

**示例**

```bash
curl http://127.0.0.1:2281/v1/castById?fid=2&hash=0xd2b1ddc6c88e865a33cb1a565e0058d757042974
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
      "text": "Cast内容",
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

## castsByFid

获取指定 FID 用户发布的所有 Casts。

**查询参数**
| 参数 | 描述 | 示例 |
| --------- | ----------- | ------- |
| fid | Cast 创建者的 FID | `fid=6833` |

**示例**

```bash
curl http://127.0.0.1:2281/v1/castsByFid?fid=2
```

**响应**

```json
{
  "messages": [
    {
      "data": {
        "type": "MESSAGE_TYPE_CAST_ADD",
        "fid": 2,
        "timestamp": 48994466,
        "network": "FARCASTER_NETWORK_MAINNET",
        "castAddBody": {... },
          "text": "Cast内容",
          "mentionsPositions": [],
          "embeds": []
        }
      },
      "hash": "0xd2b1ddc6c88e865a33cb1a565e0058d757042974",
      "hashScheme": "HASH_SCHEME_BLAKE3",
      "signature": "3msLXzxB4eEYeF0Le...dHrY1vkxcPAA==",
      "signatureScheme": "SIGNATURE_SCHEME_ED25519",
      "signer": "0x78ff9a768cf1...2eca647b6d62558c"
    }
  ]
  "nextPageToken": ""
}
```

## castsByParent

通过父级 Cast 的 FID 和哈希值或 URL 获取所有关联 Casts。

**查询参数**
| 参数 | 描述 | 示例 |
| --------- | ----------- | ------- |
| fid | 父级 Cast 的 FID | `fid=6833` |
| hash | 父级 Cast 的哈希值 | `hash=0xa48dd46161d8e57725f5e26e34ec19c13ff7f3b9` |
| url | 父级 Cast 的 URL | `url=chain://eip155:1/erc721:0x39d89b649ffa044383333d297e325d42d31329b2` |

**注意**
可以使用`?fid=...&hash=...`或`?url=...`两种方式查询此接口

**示例**

```bash
curl http://127.0.0.1:2281/v1/castsByParent?fid=226&hash=0xa48dd46161d8e57725f5e26e34ec19c13ff7f3b9
```

**响应**

```json
{
  "messages": [
    {
      "data": {
        "type": "MESSAGE_TYPE_CAST_ADD",
        "fid": 226,
        "timestamp": 48989255,
        "network": "FARCASTER_NETWORK_MAINNET",
        "castAddBody": {
          "embedsDeprecated": [],
          "mentions": [],
          "parentCastId": {
            "fid": 226,
            "hash": "0xa48dd46161d8e57725f5e26e34ec19c13ff7f3b9"
          },
          "text": "Cast内容",
          "mentionsPositions": [],
          "embeds": []
        }
      },
      "hash": "0x0e501b359f88dcbcddac50a8f189260a9d02ad34",
      "hashScheme": "HASH_SCHEME_BLAKE3",
      "signature": "MjKnOQCTW42K8+A...tRbJfia2JJBg==",
      "signatureScheme": "SIGNATURE_SCHEME_ED25519",
      "signer": "0x6f1e8758...7f04a3b500ba"
    }
  ],
  "nextPageToken": ""
}
```

## castsByMention

获取所有提及指定 FID 的 Casts。

**查询参数**
| 参数 | 描述 | 示例 |
| --------- | ----------- | ------- |
| fid | 被提及的 FID | `fid=6833` |

**注意**
使用`mentionsPositions`字段可以获取 FID 在 Cast 文本中的提及位置偏移量

**示例**

```bash
curl http://127.0.0.1:2281/v1/castsByMention?fid=6833
```

**响应**

```json
{
  "messages": [
    {
      "data": {
        "type": "MESSAGE_TYPE_CAST_ADD",
        "fid": 2,
        "timestamp": 62298143,
        "network": "FARCASTER_NETWORK_MAINNET",
        "castAddBody": {
          "embedsDeprecated": [],
          "mentions": [15, 6833],
          "parentCastId": {
            "fid": 2,
            "hash": "0xd5540928cd3daf2758e501a61663427e41dcc09a"
          },
          "text": "cc 和 ",
          "mentionsPositions": [3, 8],
          "embeds": []
        }
      },
      "hash": "0xc6d4607835197a8ee225e9218d41e38aafb12076",
      "hashScheme": "HASH_SCHEME_BLAKE3",
      "signature": "TOaWrSTmz+cyzPMFGvF...OeUznB0Ag==",
      "signatureScheme": "SIGNATURE_SCHEME_ED25519",
      "signer": "0x78ff9a768c...647b6d62558c"
    }
  ],
  "nextPageToken": ""
}
```
