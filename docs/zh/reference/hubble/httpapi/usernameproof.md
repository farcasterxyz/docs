# 用户名证明 API

## userNameProofByName

通过 Farcaster 用户名获取用户名证明

**查询参数**
| 参数 | 描述 | 示例 |
| ---- | ---- | ---- |
| name | Farcaster 用户名或 ENS 地址 | `name=adityapk` 或 `name=dwr.eth` |

**示例**

```bash
curl http://127.0.0.1:2281/v1/userNameProofByName?name=adityapk
```

**响应**

```json
{
  "timestamp": 1670603245,
  "name": "adityapk",
  "owner": "Oi7uUaECifDm+larm+rzl3qQhcM=",
  "signature": "fo5OhBP/ud...3IoJdhs=",
  "fid": 6833,
  "type": "USERNAME_TYPE_FNAME"
}
```

## userNameProofsByFid

获取由 FID 提供的一系列证明

**查询参数**
| 参数 | 描述 | 示例 |
| ---- | ---- | ---- |
| fid | 请求的 FID | `fid=2` |

**示例**

```bash
curl http://127.0.0.1:2281/v1/userNameProofsByFid?fid=2
```

**响应**

```json
{
  "proofs": [
    {
      "timestamp": 1623910393,
      "name": "v",
      "owner": "0x4114e33eb831858649ea3702e1c9a2db3f626446",
      "signature": "bANBae+Ub...kr3Bik4xs=",
      "fid": 2,
      "type": "USERNAME_TYPE_FNAME"
    },
    {
      "timestamp": 1690329118,
      "name": "varunsrin.eth",
      "owner": "0x182327170fc284caaa5b1bc3e3878233f529d741",
      "signature": "zCEszPt...zqxTiFqVBs=",
      "fid": 2,
      "type": "USERNAME_TYPE_ENS_L1"
    }
  ]
}
```
