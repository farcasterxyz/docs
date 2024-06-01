# ユーザーネーム

Farcaster アカウントには、他のユーザーが見つけて言及できるようにするためのユーザーネームが必要です。Farcaster は[Ethereum Name Service](https://ens.domains/)を使用してユーザーネームを管理します。

ENS ユーザーネームは、Farcaster アカウントと同様に Ethereum アドレスによって所有されます。違いは、1 つのアドレスが複数の ENS ネームを所有できるため、Farcaster アカウントは使用したい名前を指定する必要があることです。名前は 17 文字未満で、小文字のアルファベット、数字、またはハイフンのみを使用する必要があります。これは同形異義文字攻撃を防ぐためです。

## ユーザーネームの変更

Farcaster アカウントは、いつでも異なるユーザーネームに変更することができます。名前を変更しても、履歴やフォロワーには影響しません。

年に数回名前を変更するのは安全です。しかし、頻繁に名前を変更すると、ユーザーやアプリがアカウントを信頼しなくなる可能性があります。公開表示名を変更したい場合は、表示名を変更することを検討してください。

## オフチェーン vs オンチェーンネーム

アカウントは 2 種類のユーザーネームから選択できます：

- **オフチェーン ENS ネーム**: 無料で Farcaster によって管理されます。（例：@alice）
- **オンチェーン ENS ネーム**: 費用がかかり、ウォレットによって管理されます。（例：@alice.eth）

すぐに始めたい場合やオンチェーン ENS ネームを持っていない場合は、オフチェーン ENS ネームを選択してください。アカウントは後でいつでもオンチェーンネームにアップグレードできます。これを設定するには、Warpcast のようなアプリを使用することをお勧めします。

![Usernames](/assets/usernames.png)

### オフチェーン ENS ネーム

- オフチェーン ENS ネーム、または fname と呼ばれるものは無料で Farcaster によって発行されます。
- 任意の Ethereum アカウントは[Fname Registry](./learn/architecture/ens-names)を呼び出すことで一意の fname を取得できます。
- Fname は無料ですが、Farcaster によっていつでも取り消される可能性があります。

### オンチェーン ENS fname

- オンチェーン ENS ネーム、または.eth ネームと呼ばれるものはオンチェーンであり、ENS によって発行されます。
- 任意の Ethereum アカウントは[ENS Registry](https://docs.ens.domains/dapp-developer-guide/the-ens-registry)を呼び出すことで ENS を取得できます。
- 名前は無料ではありませんが、Farcaster によって取り消されることはありません。

## リソース

### 仕様

- [Farcaster Name](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#5-fname-specifications) - Farcaster 内で使用可能な ENSIP-10 オフチェーン ENS ネーム。
- [UserData: Username](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#23-user-data) - 現在のユーザーネームとして有効な Username Proof を設定します。
- [Username Proof](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#17-username-proof) - オンチェーンまたはオフチェーンのユーザーネームの所有権を証明します。
- [Verifications](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#25-verifications) - オンチェーンの Username Proof に必要なアドレスの所有権を証明します。
