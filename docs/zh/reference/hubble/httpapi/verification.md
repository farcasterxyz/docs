# 验证信息 API

## verificationsByFid

获取指定 FID 提供的验证信息列表

**查询参数**
| 参数 | 描述 | 示例 |
| --------- | ----------- | ------- |
| fid | 请求的 FID 编号 | `fid=2` |
| address | 可选的 ETH 地址过滤条件 | `address=0x91031dcfdea024b4d51e775486111d2b2a715871` |

**示例**

```bash
curl http://127.0.0.1:2281/v1/verificationsByFid?fid=2
```

**响应**

```json
{
  "messages": [
    {
      "data": {
        "type": "MESSAGE_TYPE_VERIFICATION_ADD_ETH_ADDRESS",
        "fid": 2,
        "timestamp": 73244540,
        "network": "FARCASTER_NETWORK_MAINNET",
        "verificationAddEthAddressBody": {
          "address": "0x91031dcfdea024b4d51e775486111d2b2a715871",
          "ethSignature": "tyxj1...x1cYzhyxw=",
          "blockHash": "0xd74860c4bbf574d5ad60f03a478a30f990e05ac723e138a5c860cdb3095f4296"
        }
      },
      "hash": "0xa505331746ec8c5110a94bdb098cd964e43a8f2b",
      "hashScheme": "HASH_SCHEME_BLAKE3",
      "signature": "bln1zIZM.../4riB9IVBQ==",
      "signatureScheme": "SIGNATURE_SCHEME_ED25519",
      "signer": "0x78ff9...b6d62558c"
    }
  ],
  "nextPageToken": ""
}
```
