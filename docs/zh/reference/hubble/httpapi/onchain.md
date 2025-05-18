# 链上 API

## onChainSignersByFid

获取由 FID 提供的账户密钥（签名者）列表

**查询参数**
| 参数 | 描述 | 示例 |
| --------- | ----------- | ------- |
| fid | 请求的 FID | `fid=2` |
| signer | 可选的签名者密钥 | `signer=0x0852c07b5695ff94138b025e3f9b4788e06133f04e254f0ea0eb85a06e999cdd` |

**示例**

```bash
curl http://127.0.0.1:2281/v1/onChainSignersByFid?fid=6833
```

**响应**

```json
{
  "events": [
    {
      "type": "EVENT_TYPE_SIGNER",
      "chainId": 10,
      "blockNumber": 108875854,
      "blockHash": "0xceb1cdc21ee319b06f0455f1cedc0cd4669b471d283a5b2550b65aba0e0c1af0",
      "blockTimestamp": 1693350485,
      "transactionHash": "0x76e20cf2f7c3db4b78f00f6bb9a7b78b0acfb1eca4348c1f4b5819da66eb2bee",
      "logIndex": 2,
      "fid": 6833,
      "signerEventBody": {
        "key": "0x0852c07b5695ff94138b025e3f9b4788e06133f04e254f0ea0eb85a06e999cdd",
        "keyType": 1,
        "eventType": "SIGNER_EVENT_TYPE_ADD",
        "metadata": "AAAAAAAAAAAA...AAAAAAAA",
        "metadataType": 1
      },
      "txIndex": 0
    }
  ]
}
```

## onChainEventsByFid

获取由 FID 提供的账户密钥列表

**查询参数**
| 参数 | 描述 | 示例 |
| --------- | ----------- | ------- |
| fid | 请求的 FID | `fid=2` |
| event_type | 请求的事件类型的数值或字符串值。此参数为必填项 | `event_type=1` 或 `event_type=EVENT_TYPE_STORAGE_RENT` |

onChainEventsByFid API 接受以下 `event_type` 字段值：

| 字符串                     | 数值 |
| -------------------------- | ---- |
| EVENT_TYPE_SIGNER          | 1    |
| EVENT_TYPE_SIGNER_MIGRATED | 2    |
| EVENT_TYPE_ID_REGISTER     | 3    |
| EVENT_TYPE_STORAGE_RENT    | 4    |

**示例**

```bash
curl http://127.0.0.1:2281/v1/onChainEventsByFid?fid=3&event_type=1
```

**响应**

```json
{
  "events": [
    {
      "type": "EVENT_TYPE_SIGNER",
      "chainId": 10,
      "blockNumber": 108875456,
      "blockHash": "0x75fbbb8b2a4ede67ac350e1b0503c6a152c0091bd8e3ef4a6927d58e088eae28",
      "blockTimestamp": 1693349689,
      "transactionHash": "0x36ef79e6c460e6ae251908be13116ff0065960adb1ae032b4cc65a8352f28952",
      "logIndex": 2,
      "fid": 3,
      "signerEventBody": {
        "key": "0xc887f5bf385a4718eaee166481f1832198938cf33e98a82dc81a0b4b81ffe33d",
        "keyType": 1,
        "eventType": "SIGNER_EVENT_TYPE_ADD",
        "metadata": "AAAAAAAAA...AAAAA",
        "metadataType": 1
      },
      "txIndex": 0
    }
  ]
}
```

## onChainIdRegistryEventByAddress

获取给定地址的链上事件列表

**查询参数**
| 参数 | 描述 | 示例 |
| --------- | ----------- | ------- |
| address | 请求的 ETH 地址 | `address=0x74232bf61e994655592747e20bdf6fa9b9476f79` |

**示例**

```bash
curl http://127.0.0.1:2281/v1/onChainIdRegistryEventByAddress?address=0x74232bf61e994655592747e20bdf6fa9b9476f79
```

**响应**

```json
{
  "type": "EVENT_TYPE_ID_REGISTER",
  "chainId": 10,
  "blockNumber": 108874508,
  "blockHash": "0x20d83804a26247ad8c26d672f2212b28268d145b8c1cefaa4126f7768f46682e",
  "blockTimestamp": 1693347793,
  "transactionHash": "0xf3481fc32227fbd982b5f30a87be32a2de1fc5736293cae7c3f169da48c3e764",
  "logIndex": 7,
  "fid": 3,
  "idRegisterEventBody": {
    "to": "0x74232bf61e994655592747e20bdf6fa9b9476f79",
    "eventType": "ID_REGISTER_EVENT_TYPE_REGISTER",
    "from": "0x",
    "recoveryAddress": "0x00000000fcd5a8e45785c8a4b9a718c9348e4f18"
  },
  "txIndex": 0
}
```
