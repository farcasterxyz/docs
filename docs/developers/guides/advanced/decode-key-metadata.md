# Decode key metadata

When users add a new key to the Key Registry, the contract emits [encoded metadata](/reference/contracts/reference/signed-key-request-validator.html#signedkeyrequestmetadata-struct) in an event. You can use this metadata to determine who requested the key.

To decode key metadata, you can use Viem's `decodeAbiParameters` function:

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
/* [
  {
    requestFid: 9152n,
    requestSigner: '0x02ef790Dd7993A35fD847C053EDdAE940D055596',
    signature: '0xF185...69F4',
    deadline: 1702660853n
  }
] */
```

:::

See the [Signed Key Request Validator](/reference/contracts/reference/signed-key-request-validator.html#signedkeyrequestmetadata-struct) reference for more
details.
