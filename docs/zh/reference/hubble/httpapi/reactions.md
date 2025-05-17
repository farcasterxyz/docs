# 反应 API

Reactions API 的 `reaction_type` 字段接受以下值（可以是字符串表示或数值）。

| 字符串               | 数值 | 描述                         |
| -------------------- | ---- | ---------------------------- |
| REACTION_TYPE_LIKE   | 1    | 点赞目标 Cast                |
| REACTION_TYPE_RECAST | 2    | 将目标 Cast 分享给用户的受众 |

## reactionById

通过创建者 FID 和目标 Cast 获取反应。

**查询参数**
| 参数 | 描述 | 示例 |
| ---- | ---- | ---- |
| fid | 反应创建者的 FID | `fid=6833` |
| target_fid | Cast 创建者的 FID | `target_fid=2` |
| target_hash | Cast 的哈希值 | `target_hash=0xa48dd46161d8e57725f5e26e34ec19c13ff7f3b9` |
| reaction_type | 反应类型，可以是数值枚举值或字符串表示 | `reaction_type=1` 或 `reaction_type=REACTION_TYPE_LIKE` |

**示例**

```bash
curl http://127.0.0.1:2281/v1/reactionById?fid=2&reaction_type=1&target_fid=1795&target_hash=0x7363f449bfb0e7f01c5a1cc0054768ed5146abc0
```

**响应**

```json
{
  "data": {
    "type": "MESSAGE_TYPE_REACTION_ADD",
    "fid": 2,
    "timestamp": 72752656,
    "network": "FARCASTER_NETWORK_MAINNET",
    "reactionBody": {
      "type": "REACTION_TYPE_LIKE",
      "targetCastId": {
        "fid": 1795,
        "hash": "0x7363f449bfb0e7f01c5a1cc0054768ed5146abc0"
      }
    }
  },
  "hash": "0x9fc9c51f6ea3acb84184efa88ba4f02e7d161766",
  "hashScheme": "HASH_SCHEME_BLAKE3",
  "signature": "F2OzKsn6Wj...gtyORbyCQ==",
  "signatureScheme": "SIGNATURE_SCHEME_ED25519",
  "signer": "0x78ff9a7...647b6d62558c"
}
```

## reactionsByFid

获取指定 FID 的所有反应

**查询参数**
| 参数 | 描述 | 示例 |
| ---- | ---- | ---- |
| fid | 反应创建者的 FID | `fid=6833` |
| reaction_type | 反应类型，可以是数值枚举值或字符串表示 | `reaction_type=1` 或 `reaction_type=REACTION_TYPE_LIKE` |

**示例**

```bash
curl http://127.0.0.1:2281/v1/reactionsByFid?fid=2&reaction_type=1
```

**响应**

```json
{
  "messages": [
    {
      "data": {
        "type": "MESSAGE_TYPE_REACTION_ADD",
        "fid": 2,
        "timestamp": 72752656,
        "network": "FARCASTER_NETWORK_MAINNET",
        "reactionBody": {
          "type": "REACTION_TYPE_LIKE",
          "targetCastId": {
            "fid": 1795,
            "hash": "0x7363f449bfb0e7f01c5a1cc0054768ed5146abc0"
          }
        }
      },
      "hash": "0x9fc9c51f6ea3acb84184efa88ba4f02e7d161766",
      "hashScheme": "HASH_SCHEME_BLAKE3",
      "signature": "F2OzKsn6WjP8MTw...hqUbrAvp6mggtyORbyCQ==",
      "signatureScheme": "SIGNATURE_SCHEME_ED25519",
      "signer": "0x78ff9a768...62558c"
    }
  ],
  "nextPageToken": ""
}
```

## reactionsByCast

获取对某个 Cast 的所有反应

**查询参数**
| 参数 | 描述 | 示例 |
| ---- | ---- | ---- |
| target_fid | Cast 创建者的 FID | `fid=6833` |
| target_hash | Cast 的哈希值 | `target_hash=`0x7363f449bfb0e7f01c5a1cc0054768ed5146abc0`|
| reaction_type | 反应类型，可以是数值枚举值或字符串表示 |`reaction_type=1`或`reaction_type=REACTION_TYPE_LIKE` |

**示例**

```bash
curl http://127.0.0.1:2281/v1/reactionsByCast?target_fid=2&reaction_type=1&target_hash=0x7363f449bfb0e7f01c5a1cc0054768ed5146abc0
```

**响应**

```json
{
  "messages": [
    {
      "data": {
        "type": "MESSAGE_TYPE_REACTION_ADD",
        "fid": 426,
        "timestamp": 72750141,
        "network": "FARCASTER_NETWORK_MAINNET",
        "reactionBody": {
          "type": "REACTION_TYPE_LIKE",
          "targetCastId": {
            "fid": 1795,
            "hash": "0x7363f449bfb0e7f01c5a1cc0054768ed5146abc0"
          }
        }
      },
      "hash": "0x7662fba1be3166fc75acc0914a7b0e53468d5e7a",
      "hashScheme": "HASH_SCHEME_BLAKE3",
      "signature": "tmAUEYlt/+...R7IO3CA==",
      "signatureScheme": "SIGNATURE_SCHEME_ED25519",
      "signer": "0x13dd2...204e57bc2a"
    }
  ],
  "nextPageToken": ""
}
```

## reactionsByTarget

获取对 Cast 目标 URL 的所有反应

**查询参数**
| 参数 | 描述 | 示例 |
| ---- | ---- | ---- |
| url | 父 Cast 的 URL | url=chain://eip155:1/erc721:0x39d89b649ffa044383333d297e325d42d31329b2 |
| reaction_type | 反应类型，可以是数值枚举值或字符串表示 | `reaction_type=1` 或 `reaction_type=REACTION_TYPE_LIKE` |

**示例**

```bash
curl http://127.0.0.1:2281/v1/reactionsByTarget?url=chain://eip155:1/erc721:0x39d89b649ffa044383333d297e325d42d31329b2
```

**响应**

```json
{
  "messages": [
    {
      "data": {
        "type": "MESSAGE_TYPE_REACTION_ADD",
        "fid": 1134,
        "timestamp": 79752856,
        "network": "FARCASTER_NETWORK_MAINNET",
        "reactionBody": {
          "type": "REACTION_TYPE_LIKE",
          "targetUrl": "chain://eip155:1/erc721:0x39d89b649ffa044383333d297e325d42d31329b2"
        }
      },
      "hash": "0x94a0309cf11a07b95ace71c62837a8e61f17adfd",
      "hashScheme": "HASH_SCHEME_BLAKE3",
      "signature": "+f/+M...0Uqzd0Ag==",
      "signatureScheme": "SIGNATURE_SCHEME_ED25519",
      "signer": "0xf6...3769198d4c"
    }
  ],
  "nextPageToken": ""
}
```
