# 链接 API

Link（链接）表示两个用户之间的关系（例如关注）。

Links API 接受以下 `link_type` 字段值：

| 字符串 | 描述                           |
| ------ | ------------------------------ |
| follow | 从源 FID 到目标 FID 的关注关系 |

## linkById

通过源 FID 和目标 FID 获取链接。

**查询参数**
| 参数 | 描述 | 示例 |
| --------- | ----------- | ------- |
| fid | 链接发起者的 FID | `fid=6833` |
| target_fid | 链接目标的 FID | `target_fid=2` |
| link_type | 链接类型，字符串值 | `link_type=follow` |

**示例**

```bash
curl http://127.0.0.1:2281/v1/linkById?fid=6833&target_fid=2&link_type=follow
```

**响应**

```json
{
  "data": {
    "type": "MESSAGE_TYPE_LINK_ADD",
    "fid": 6833,
    "timestamp": 61144470,
    "network": "FARCASTER_NETWORK_MAINNET",
    "linkBody": {
      "type": "follow",
      "targetFid": 2
    }
  },
  "hash": "0x58c23eaf4f6e597bf3af44303a041afe9732971b",
  "hashScheme": "HASH_SCHEME_BLAKE3",
  "signature": "sMypYEMqSyY...nfCA==",
  "signatureScheme": "SIGNATURE_SCHEME_ED25519",
  "signer": "0x0852c07b56...06e999cdd"
}
```

## linksByFid

获取来自某个源 FID 的所有链接。

**查询参数**
| 参数 | 描述 | 示例 |
| --------- | ----------- | ------- |
| fid | 链接创建者的 FID | `fid=6833` |
| link_type | 链接类型，字符串值 | `link_type=follow` |

**示例**

```bash
curl http://127.0.0.1:2281/v1/linksByFid?fid=6833
```

**响应**

```json
{
  "messages": [
    {
      "data": {
        "type": "MESSAGE_TYPE_LINK_ADD",
        "fid": 6833,
        "timestamp": 61144470,
        "network": "FARCASTER_NETWORK_MAINNET",
        "linkBody": {
          "type": "follow",
          "targetFid": 83
        }
      },
      "hash": "0x094e35891519c0e04791a6ba4d2eb63d17462f02",
      "hashScheme": "HASH_SCHEME_BLAKE3",
      "signature": "qYsfX08mS...McYq6IYMl+ECw==",
      "signatureScheme": "SIGNATURE_SCHEME_ED25519",
      "signer": "0x0852c0...a06e999cdd"
    }
  ],
  "nextPageToken": ""
}
```

## linksByTargetFid

获取指向某个目标 FID 的所有链接。

**查询参数**
| 参数 | 描述 | 示例 |
| --------- | ----------- | ------- |
| target_fid | 链接目标的 FID | `fid=6833` |
| link_type | 链接类型，字符串值 | `link_type=follow` |

**示例**

```bash
curl http://127.0.0.1:2281/v1/linksByTargetFid?target_fid=6833
```

**响应**

```json
{
  "messages": [
    {
      "data": {
        "type": "MESSAGE_TYPE_LINK_ADD",
        "fid": 302,
        "timestamp": 61144668,
        "network": "FARCASTER_NETWORK_MAINNET",
        "linkBody": {
          "type": "follow",
          "targetFid": 6833
        }
      },
      "hash": "0x78c62531d96088f640ffe7e62088b49749efe286",
      "hashScheme": "HASH_SCHEME_BLAKE3",
      "signature": "frIZJGIizv...qQd9QJyCg==",
      "signatureScheme": "SIGNATURE_SCHEME_ED25519",
      "signer": "0x59a04...6860ddfab"
    }
  ],
  "nextPageToken": ""
}
```
