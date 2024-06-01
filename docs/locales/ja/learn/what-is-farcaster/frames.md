# フレーム

フレームを使用すると、任意のキャストをインタラクティブなアプリに変えることができます。

これは、Farcaster 上でインタラクティブで認証された体験を作成するための標準です。Warpcast や他の FC クライアント内で投票、ライブフィード、インタラクティブギャラリーを作成できます。

フレームは OpenGraph 標準を拡張し、静的な埋め込みをインタラクティブな体験に変えます。以下の図は、Warpcast 内の標準 OG とフレーム OG の違いを示しています。

![フレーム vs OG](/assets/frame_og.png)

フレームの作成は簡単です。表示する画像を選択し、ユーザーがクリックできるボタンを追加します。ボタンがクリックされると、コールバックを受け取り、さらにボタンを含む別の画像を送信できます。

## リソース

フレームの作成と管理に最も人気のあるユーティリティのコレクション。

### ツール

- [Vercel OG](https://vercel.com/docs/functions/og-image-generation) - satori と resvg-js を使用して HTML と CSS から PNG 画像を生成します。
- [Warpcast Frame Validator](https://warpcast.com/~/developers/frames) - Warpcast UI でフレームをテストするためのデバッガー。
- [Neynar](https://docs.neynar.com/docs/how-to-build-farcaster-frames-with-neynar) - フレームサーバーのためのインフラとツール。

### フレームワーク

- [onchainkit](https://github.com/coinbase/onchainkit) - フレームを作成するための React ツールキット。
- [frames.js](https://framesjs.org/) - フレームを構築およびデバッグするための Next.js テンプレート。
- [Simplest Frame](https://github.com/depatchedmode/simplest-frame) - ゼロフレームワークのフレームテンプレート。
- [frog](https://frog.fm) - フレームのためのフレームワーク。

### 例

- [Linktree](https://replit.com/@soren/Linktree-Frame?v=1) - 他の 4 つのページにリンクするシンプルなフレーム。
- [Onchain Cow](https://github.com/WillPapper/On-Chain-Cow-Farcaster-Frame) - 牛クリックゲームのようなゲーム。
- [FC Polls](https://github.com/farcasterxyz/fc-polls) - フレーム内で投票を作成および実行します。
- [Claim or Mint](https://github.com/horsefacts/base-mint-with-warps) - 特定の条件を満たすと NFT を請求できるようにします。

<br/>

より詳細なリソースリストは[awesome-frames](https://github.com/davidfurlong/awesome-frames)で見つけることができます。
