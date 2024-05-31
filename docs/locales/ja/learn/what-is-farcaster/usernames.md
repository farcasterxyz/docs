# ユーザーネーム

Farcasterアカウントには、他のユーザーが見つけて言及できるようにするためのユーザーネームが必要です。Farcasterは[Ethereum Name Service](https://ens.domains/)を使用してユーザーネームを管理します。

ENSユーザーネームは、Farcasterアカウントと同様にEthereumアドレスによって所有されます。違いは、1つのアドレスが複数のENSネームを所有できるため、Farcasterアカウントは使用したい名前を指定する必要があることです。名前は17文字未満で、小文字のアルファベット、数字、またはハイフンのみを使用する必要があります。これは同形異義文字攻撃を防ぐためです。

## ユーザーネームの変更

Farcasterアカウントは、いつでも異なるユーザーネームに変更することができます。名前を変更しても、履歴やフォロワーには影響しません。

年に数回名前を変更するのは安全です。しかし、頻繁に名前を変更すると、ユーザーやアプリがアカウントを信頼しなくなる可能性があります。公開表示名を変更したい場合は、表示名を変更することを検討してください。

## オフチェーン vs オンチェーンネーム

アカウントは2種類のユーザーネームから選択できます：

- **オフチェーンENSネーム**: 無料でFarcasterによって管理されます。（例：@alice）
- **オンチェーンENSネーム**: 費用がかかり、ウォレットによって管理されます。（例：@alice.eth）

すぐに始めたい場合やオンチェーンENSネームを持っていない場合は、オフチェーンENSネームを選択してください。アカウントは後でいつでもオンチェーンネームにアップグレードできます。これを設定するには、Warpcastのようなアプリを使用することをお勧めします。

![Usernames](/assets/usernames.png)

### オフチェーンENSネーム

- オフチェーンENSネーム、またはfnameと呼ばれるものは無料でFarcasterによって発行されます。
- 任意のEthereumアカウントは[Fname Registry](/learn/architecture/ens-names)を呼び出すことで一意のfnameを取得できます。
- Fnameは無料ですが、Farcasterによっていつでも取り消される可能性があります。

### オンチェーンENS fname

- オンチェーンENSネーム、または.ethネームと呼ばれるものはオンチェーンであり、ENSによって発行されます。
- 任意のEthereumアカウントは[ENS Registry](https://docs.ens.domains/dapp-developer-guide/the-ens-registry)を呼び出すことでENSを取得できます。
- 名前は無料ではありませんが、Farcasterによって取り消されることはありません。

## リソース

### 仕様

- [Farcaster Name](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#5-fname-specifications) - Farcaster内で使用可能なENSIP-10オフチェーンENSネーム。
- [UserData: Username](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#23-user-data) - 現在のユーザーネームとして有効なUsername Proofを設定します。
- [Username Proof](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#17-username-proof) - オンチェーンまたはオフチェーンのユーザーネームの所有権を証明します。
- [Verifications](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#25-verifications) - オンチェーンのUsername Proofに必要なアドレスの所有権を証明します。