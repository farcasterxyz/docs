# アプリ

Farcaster を使用するには、アカウントを登録するための Ethereum ウォレットとネットワークを閲覧するための UI が必要です。初めての方には、[iOS](https://apps.apple.com/us/app/warpcast/id1600555445)または[Android](https://play.google.com/store/apps/details?id=com.farcaster.mobile&hl=en_US&gl=US)の Warpcast から始めることをお勧めします。

アプリには 2 種類あります：

1. **ウォレットアプリ** - サインアップ、接続アプリの追加、メッセージの投稿と閲覧が可能。
2. **接続アプリ** - メッセージの投稿と閲覧のみが可能。

## ウォレットアプリ

ユーザーは Farcaster を始めるためにウォレットアプリをインストールする必要があります。これにより、サインアップ、接続アプリの追加、メッセージの投稿などのオンチェーンおよびオフチェーンのアクションを実行できます。

ウォレットアプリはアカウントを所有する Ethereum アドレスを管理します。アカウントを管理し、ユーザーの代わりに任意のアクションを実行できるため、信頼できるウォレットアプリのみを使用してください。

### Warpcast

Warpcast は Farcaster チームによって開発されたウォレットアプリです。ウェブアプリとモバイルアプリがありますが、サインアップはモバイルでのみ可能です。

- ダウンロード: [iOS](https://apps.apple.com/us/app/warpcast/id1600555445), [Android](https://play.google.com/store/apps/details?id=com.farcaster.mobile&hl=en_US&gl=US)

## 接続アプリ

接続アプリは、ユーザーがウォレットアプリでサインアップした後にのみ追加できます。これにより、キャストの作成、アカウントのフォロー、閲覧などのオフチェーンアクションを Farcaster 上で実行できます。

接続アプリはウォレットアプリによって付与されたアプリキーを管理します。ユーザーはアカウントに多くの接続アプリを追加し、いつでも削除できます。悪意のある接続アプリはアカウントを制御できず、実行されたアクションはウォレットアプリによって取り消すことができます。

いくつかの人気のある接続アプリには以下が含まれます：

- [Supercast](https://supercast.xyz/)
- [Yup](https://yup.io/)
- [Farcord](https://farcord.com/)

**接続アプリは Farcaster によってレビューされていないため、自己責任で使用してください**

## リソース

### ツール

- [Replicator](https://github.com/farcasterxyz/hub-monorepo/tree/main/apps/replicator) - ハブを Postgres データベースに同期するためのツール。

### サービス

- [Neynar](https://neynar.com/) - Farcaster アプリを構築するためのインフラとサービス。
