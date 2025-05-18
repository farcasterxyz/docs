# 解码密钥元数据

当用户向密钥注册表添加新密钥时，合约会在事件中发出[编码后的元数据](/zh/reference/contracts/reference/signed-key-request-validator#signedkeyrequestmetadata-struct)。您可以使用这些元数据来确定是谁请求了该密钥。

要解码密钥元数据，可以使用 Viem 的 `decodeAbiParameters` 函数：

::: code-group

```ts [Viem]
import { decodeAbiParameters } from 'viem';

const encodedMetadata =
  '0x' +
  '0000000000000000000000000000000000000000000000000000000000000020' +
  '00000000000000000000000000000000000000000000000000000000000023C0' +
  '00000000000000000000000002EF790DD7993A35FD847C053EDDAE940D055596' +
  '0000000000000000000000000000000000000000000000000000000000000080' +
  '00000000000000000000000000000000000000000000000000000000657C8AF5' +
  '0000000000000000000000000000000000000000000000000000000000000041' +
  'F18569F4364BB2455DB27A4E8464A83AD8555416B1AAB21FF26E8501168F471F' +
  '7EC17BB096EA4438E5BF82CE01224B2F67EF9042737B7B101C41A1A05CB469DC' +
  '1B00000000000000000000000000000000000000000000000000000000000000';

const decoded = decodeAbiParameters(
  [
    {
      components: [
        {
          name: 'requestFid',
          type: 'uint256',
        },
        {
          name: 'requestSigner',
          type: 'address',
        },
        {
          name: 'signature',
          type: 'bytes',
        },
        {
          name: 'deadline',
          type: 'uint256',
        },
      ],
      type: 'tuple',
    },
  ],
  encodedMetadata
);

console.log(decoded);
/*
[
  {
    requestFid: 9152n,
    requestSigner: '0x02ef790Dd7993A35fD847C053EDdAE940D055596',
    signature: '0xF185...69F4',
    deadline: 1702660853n
  }
]
*/
```

:::

更多详情请参阅[签名密钥请求验证器](/zh/reference/contracts/reference/signed-key-request-validator#signedkeyrequestmetadata-struct)参考文档。
