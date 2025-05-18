# 常见问题解答

## 签名相关

### 如何生成 EIP-712 签名？

各 EIP-712 签名的文档说明请参阅合约参考文档，其中包含 TypeScript [代码示例](/zh/reference/contracts/reference/id-gateway#register-signature)。

若使用 TypeScript/JS，[`@farcaster/hub-web`](https://www.npmjs.com/package/@farcaster/hub-web) 包提供了生成和处理 EIP-712 签名的工具。为确保使用正确的地址和类型哈希，建议从 [合约模块](https://github.com/farcasterxyz/hub-monorepo/tree/main/packages/core/src/eth/contracts) 导入 ABI 和 EIP-712 类型，或使用提供的 [`Eip712Signer`](https://github.com/farcasterxyz/hub-monorepo/blob/main/packages/core/src/signers/eip712Signer.ts) 辅助工具。

参考 hub 单体仓库中的 [示例应用](https://github.com/farcasterxyz/hub-monorepo/tree/main/packages/hub-nodejs/examples/contract-signatures)"Working with EIP-712 signatures"，该示例演示了各类签名和合约调用。

### 如何调试无效的 EIP-712 签名？

为辅助调试 EIP-712 签名，所有使用 EIP-712 签名的合约都公开其 [域分隔符](https://optimistic.etherscan.io/address/0x00000000fc25870c6ed6b6c7e41fb078b7656f69#readContract#F3) 和类型哈希作为 [常量](https://optimistic.etherscan.io/address/0x00000000fc25870c6ed6b6c7e41fb078b7656f69#readContract#F1)，并提供 [hashTypedDataV4](https://optimistic.etherscan.io/address/0x00000000fc25870c6ed6b6c7e41fb078b7656f69#readContract#F6) 辅助视图。若使用 Solidity 或其他底层语言构建签名，可利用这些工具进行调试。

## 参考信息

### 完整的合约源代码在哪里？

合约仓库位于 GitHub [此处](https://github.com/farcasterxyz/contracts)。

### 如何获取合约 ABI？

合约 ABI 和部署地址见 [此处](/zh/reference/contracts/deployments#abis)。

### 审计报告在哪里查看？

历史审计报告链接见 [合约仓库](https://github.com/farcasterxyz/contracts/blob/1aceebe916de446f69b98ba1745a42f071785730/README.md#audits)。

### Farcaster 合约是否部署在测试网上？

否。建议使用 [网络分叉](https://book.getfoundry.sh/tutorials/forking-mainnet-with-cast-anvil) 来测试或针对 OP 主网合约进行开发。

## 数据查询

### 如何查找用户的托管地址？

调用 [IdRegistry](/zh/reference/contracts/reference/id-registry.md) 的 [`custodyOf`](https://optimistic.etherscan.io/address/0x00000000fc6c5f01fc30151999387bb99a9f489b#readContract#F5) 函数。

### 如何查找用户的恢复地址？

调用 [IdRegistry](/zh/reference/contracts/reference/id-registry.md) 的 [`recoveryOf`](https://optimistic.etherscan.io/address/0x00000000fc6c5f01fc30151999387bb99a9f489b#readContract#F23) 函数。

### 如何查找账户的 fid？

调用 [IdRegistry](/zh/reference/contracts/reference/id-registry.md) 的 [`idOf`](https://optimistic.etherscan.io/address/0x00000000fc6c5f01fc30151999387bb99a9f489b#readContract#F14) 函数。

### 如何查询我的 fid 对应的账户密钥？

调用 [KeyRegistry](/zh/reference/contracts/reference/key-registry.md) 的 [`keysOf`](https://optimistic.etherscan.io/address/0x00000000fc1237824fb747abde0ff18990e59b7e#readContract#F16) 函数。

## 其他问题

### 什么是 app fid？如何获取？

**什么是 FID？**

FID (Farcaster ID) 是用于区分应用程序和用户的唯一标识符。通过 FID 可识别和区分不同的应用与用户。

**为什么需要 FID？**

要在 Farcaster 平台上创建内容或发布信息，必须使用 FID 来标识您的应用或用户。

**如何获取？**

您可以通过 [Bundler](/zh/reference/contracts/reference/bundler.md) 或 [IdGateway](/zh/reference/contracts/reference/id-gateway.md) 直接注册 app fid，也可使用 Farcaster 客户端为您的应用注册账户。由于需要通过拥有 app fid 的钱包签署 [密钥请求元数据](/zh/reference/contracts/reference/signed-key-request-validator.md)，请妥善保管私钥。
