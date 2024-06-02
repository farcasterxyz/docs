# コントラクト

Farcaster アカウントは、Farcaster コントラクトを使用してオンチェーンで管理および保護されます。このセクションでは、高レベルの概要を提供し、いくつかの実装の詳細を避けます。全体像については、[コントラクトリポジトリ](https://github.com/farcasterxyz/contracts/)を参照してください。

<br>

OP Mainnet にデプロイされた主なコントラクトは 3 つあります：

- **Id Registry** - 新しいアカウントを作成します
- **Storage Registry** - アカウントにストレージを貸し出します
- **Key Registry** - アカウントからアプリキーを追加および削除します

<br>

![レジストリコントラクト](/assets/registry-contracts.png)

コントラクトは以下のアドレスにデプロイされています：

| コントラクト    | アドレス                                                                                                                         |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| IdRegistry      | [0x00000000fc6c5f01fc30151999387bb99a9f489b](https://optimistic.etherscan.io/address/0x00000000fc6c5f01fc30151999387bb99a9f489b) |
| StorageRegistry | [0x00000000fcce7f938e7ae6d3c335bd6a1a7c593d](https://optimistic.etherscan.io/address/0x00000000fcce7f938e7ae6d3c335bd6a1a7c593d) |
| KeyRegistry     | [0x00000000fc1237824fb747abde0ff18990e59b7e](https://optimistic.etherscan.io/address/0x00000000fc1237824fb747abde0ff18990e59b7e) |

### Id Registry

IdRegistry は、ユーザーが Farcaster アカウントを登録、転送、および回復できるようにします。アカウントは、登録時に Ethereum アドレスに割り当てられる一意の番号（fid）によって識別されます。Ethereum アドレスは一度に 1 つのアカウントしか所有できませんが、他のアカウントに自由に転送できます。また、いつでもアカウントを転送できるリカバリアドレスを指定できます。

### Storage Registry

Storage Registry は、Ethereum で支払いを行うことでアカウントが[ストレージ](../what-is-farcaster/messages.md#storage)をレンタルできるようにします。ストレージ価格は USD で管理者によって設定され、Chainlink オラクルを使用して ETH に変換されます。価格は需要と供給に基づいて増減します。

### Key Registry

Key Registry は、アカウントがアプリにキーを発行できるようにし、それによってアプリがアカウントの代わりにメッセージを公開できるようにします。キーはいつでも追加または削除できます。キーを追加するには、アカウントは EdDSA キーペアの公開鍵とリクエスタ署名を提出する必要があります。リクエスタはアカウント自体またはその代わりに操作したいアプリである可能性があります。
