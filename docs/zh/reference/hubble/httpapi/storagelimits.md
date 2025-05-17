# 存储 API

## storageLimitsByFid

获取指定 FID 的存储限制。

**查询参数**
| 参数 | 描述 | 示例 |
| --------- | ----------- | ------- |
| fid | 请求查询的 FID | `fid=6833` |

**示例**

```bash
curl http://127.0.0.1:2281/v1/storageLimitsByFid?fid=6833
```

**响应**

```json
{
  "limits": [
    {
      "storeType": "STORE_TYPE_CASTS",
      "limit": 10000
    },
    {
      "storeType": "STORE_TYPE_LINKS",
      "limit": 5000
    },
    {
      "storeType": "STORE_TYPE_REACTIONS",
      "limit": 5000
    },
    {
      "storeType": "STORE_TYPE_USER_DATA",
      "limit": 100
    },
    {
      "storeType": "STORE_TYPE_USERNAME_PROOFS",
      "limit": 10
    },
    {
      "storeType": "STORE_TYPE_VERIFICATIONS",
      "limit": 50
    }
  ]
}
```
