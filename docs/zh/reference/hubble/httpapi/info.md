# 信息 API

## 信息接口

获取 Hub 的基本信息

**查询参数**
| 参数名 | 描述 | 示例 |
| --------- | ----------- | ------- |
| dbstats | 是否返回数据库统计信息 | `dbstats=1` |

**请求示例**

```bash
curl http://127.0.0.1:2281/v1/info?dbstats=1

```

**响应示例**

```json
{
  "version": "1.5.5",
  "isSyncing": false,
  "nickname": "Farcaster Hub",
  "rootHash": "fa349603a6c29d27041225261891bc9bc846bccb",
  "dbStats": {
    "numMessages": 4191203,
    "numFidEvents": 20287,
    "numFnameEvents": 20179
  },
  "peerId": "12D3KooWNr294AH1fviDQxRmQ4K79iFSGoRCWzGspVxPprJUKN47",
  "hubOperatorFid": 6833
}
```
