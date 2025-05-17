# 用户数据 API

UserData API 的 `user_data_type` 字段接受以下值。

| 字符串                  | 数值 | 描述                  |
| ----------------------- | ---- | --------------------- |
| USER_DATA_TYPE_PFP      | 1    | 用户的个人资料图片    |
| USER_DATA_TYPE_DISPLAY  | 2    | 用户的显示名称        |
| USER_DATA_TYPE_BIO      | 3    | 用户的个人简介        |
| USER_DATA_TYPE_URL      | 5    | 用户的 URL 链接       |
| USER_DATA_TYPE_USERNAME | 6    | 用户的偏好名称        |
| USER_DATA_TYPE_LOCATION | 7    | 用户的地理位置        |
| USER_DATA_TYPE_TWITTER  | 8    | 用户的 Twitter 用户名 |
| USER_DATA_TYPE_GITHUB   | 9    | 用户的 GitHub 用户名  |

有关地理位置字段的更多信息，请参阅 [FIP-196](https://github.com/farcasterxyz/protocol/discussions/196)。  
有关 Twitter/X 和 Github 用户名的更多信息，请参阅 [FIP-19](https://github.com/farcasterxyz/protocol/discussions/199)。

## userDataByFid

获取指定 FID 的用户数据。

**查询参数**
| 参数 | 描述 | 示例 |
| -------------- | -------------------------------------------------------------------- | ---- |
| fid | 请求的 FID 编号 | `fid=6833` |
| user_data_type | 用户数据类型，可以是数值或类型字符串。如果省略，则返回该 FID 的所有用户数据 | `user_data_type=1` 或 `user_data_type=USER_DATA_TYPE_DISPLAY` |

**示例**

```bash
curl http://127.0.0.1:2281/v1/userDataByFid?fid=6833&user_data_type=1
```

**响应**

```json
{
  "data": {
    "type": "MESSAGE_TYPE_USER_DATA_ADD",
    "fid": 6833,
    "timestamp": 83433831,
    "network": "FARCASTER_NETWORK_MAINNET",
    "userDataBody": {
      "type": "USER_DATA_TYPE_PFP",
      "value": "https://i.imgur.com/HG54Hq6.png"
    }
  },
  "hash": "0x327b8f47218c369ae01cc453cc23efc79f10181f",
  "hashScheme": "HASH_SCHEME_BLAKE3",
  "signature": "XITQZD7q...LdAlJ9Cg==",
  "signatureScheme": "SIGNATURE_SCHEME_ED25519",
  "signer": "0x0852...6e999cdd"
}
```
