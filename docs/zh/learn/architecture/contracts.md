# 合约

Farcaster 账户通过链上合约进行管理和安全保护。本节提供高层次概述，省略部分实现细节。完整信息请参阅[合约代码库](https://github.com/farcasterxyz/contracts/)。

<br>

在 OP 主网上部署了三个主要合约：

- **ID 注册表** - 创建新账户
- **存储注册表** - 为账户租赁存储空间
- **密钥注册表** - 为账户添加或移除应用密钥

<br>

![注册表合约](/assets/registry-contracts.png)

合约部署地址如下：

| 合约            | 地址                                                                                                                             |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| IdRegistry      | [0x00000000fc6c5f01fc30151999387bb99a9f489b](https://optimistic.etherscan.io/address/0x00000000fc6c5f01fc30151999387bb99a9f489b) |
| StorageRegistry | [0x00000000fcce7f938e7ae6d3c335bd6a1a7c593d](https://optimistic.etherscan.io/address/0x00000000fcce7f938e7ae6d3c335bd6a1a7c593d) |
| KeyRegistry     | [0x00000000fc1237824fb747abde0ff18990e59b7e](https://optimistic.etherscan.io/address/0x00000000fc1237824fb747abde0ff18990e59b7e) |

### ID 注册表

ID 注册表允许用户注册、转移和恢复 Farcaster 账户。每个账户通过唯一的数字标识符（fid）识别，该标识符在注册时分配给一个以太坊地址。一个以太坊地址同一时间只能拥有一个账户，但可以自由将其转移给其他地址。账户还可设置恢复地址，该地址可随时转移账户所有权。

### 存储注册表

存储注册表允许账户通过支付 ETH 来租赁[存储空间](../what-is-farcaster/messages.md#storage)。存储价格由管理员以美元设定，并通过 Chainlink 预言机转换为 ETH。价格会根据供需关系动态调整。

### 密钥注册表

密钥注册表允许账户向应用颁发密钥，使其能够代表账户发布消息。密钥可随时添加或移除。添加密钥时，账户需提交 EdDSA 密钥对的公钥及请求者签名。请求者可以是账户本身，也可以是希望代表其操作的应用程序。
