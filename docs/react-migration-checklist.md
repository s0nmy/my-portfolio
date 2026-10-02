# React移行の確認記録

## 現行ソースの基準

- 比較対象: `src/index.html`、`src/style.css`、`src/script.js`（React移行前のまま保持）。
- セクション: ヒーロー、プロフィール、スキル、プロジェクト4件、活動5件とSNSリンク、フッター。
- 外部リンク: GitHubプロフィール、note、X、ChronoMe、すれック、Kuguri。フッターにはメールリンクもある。
- 画像: ChronoMe 3枚、すれック2枚、Kuguri 1枚、SparkDay 1枚。旧HTMLの `images/hackathon/02_hachathon.mp4` はリポジトリにないため移行先に登録しない。
- 画面幅、文章、リンク、画像の目視比較には現行本番のPCとスマートフォンのスクリーンショットが必要。現時点ではリポジトリ内のソースを比較基準とする。

## Cloudflareで本番切り替え前に記録する値

このリポジトリには現在のWorkers Builds設定やdeployment IDは保存されていない。Cloudflare管理画面で次を記録してから本番切り替えを行う。

1. `my-portfolio` の現在のproduction deployment IDと復旧操作に使うURL。
2. 現行のBuild command、Deploy command、Preview command、Root directory、Production branch、Preview builds設定。
3. Custom Domain、DNS、wwwリダイレクトの設定。

## ローカルで確認済み

- `npm run lint`、`npm run typecheck`、`npm run build` が成功した。
- `out/index.html` と `out/404.html` が生成され、作品画像7枚が `out/images` に存在する。
- 旧HTMLの可視テキスト・リンクと生成HTMLを照合し、ギャラリー枚数表示が3枚から2枚へ変わった点以外の欠落はなかった。これは存在しない動画を登録しないため。
- ローカルWrangler previewで `/` がHTTP 200、存在しないURLがHTTP 404を返した。

PC・スマートフォンの目視比較とキーボード操作の実機確認、Cloudflare上のPreview、本番URLの確認は未実施。

## 初回公開手順

1. ローカルで `npm ci`、`npm run lint`、`npm run typecheck`、`npm run build` を実行する。
2. Workers BuildsのBuild commandを `npm run build`、Deploy commandを `npx wrangler deploy`、Preview commandを `npx wrangler preview`、Production branchを `main` にする。Preview buildsを有効にし、Preview commandが本番deploymentを置き換えないことを設定画面で確認する。
3. 作業ブランチから `develop` へのPRでPreview URLを開き、`/` と存在しないURLの応答、全セクション、外部リンク、画像、PC幅とスマートフォン幅、キーボード操作、動きを減らす設定を確認する。
4. `develop` に統合した後、`develop → main` のPRを作成する。Previewと `quality-gate` を再確認してからマージする。
5. 本番でHTTPS、正規URL、wwwリダイレクト、画像と外部リンクを確認する。問題があれば記録した旧deploymentに戻す。

作品詳細ページ、作品ごとのメタデータ、canonicalは次回リリースで実装する。正規ドメインが確定するまでcanonicalの値を推測して埋めない。
