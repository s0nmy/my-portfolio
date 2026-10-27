# Portfolio

Miyu Soneの個人ポートフォリオサイト。トップページは、作品やプロフィールのカードを自由に動かして探索できるキャンバス。Next.js / React / TypeScriptの静的出力を、Cloudflare Workerから配信する。

## ディレクトリ

```text
app/                 Next.js App Router
  canvas/            キャンバスの画面とジェスチャー
  lib/               Markdownの読み込み
  styles/            CSS
content/             作品・スキル・年表のMarkdown（内容の正本）
public/              画像とfavicon（公開アセットの正本）
docs/                設計と運用手順
```

## ローカルで確認する

```sh
npm ci            # 依存パッケージを入れる
npm run dev       # 開発サーバーを起動する
npm run lint
npm run typecheck
npm run build     # 公開用のファイルを out/ に生成する
```

## 公開する

`main` ブランチへのマージで、Cloudflare Workers Buildsが本番へ自動デプロイする。通常は `develop` でPreviewを確認してから、`develop` → `main` の順に公開する。

- Workerが配信するのは、`wrangler.jsonc` で指定した `out/`
- Cloudflare管理画面には、Build commandに `npm run build`、Deploy commandに `npx wrangler deploy` を設定する
- Preview commandの表示は、Worker Previewsへの切り替え状況で変わる
  - 現在の設定を確認する

## 設計ドキュメント

- [アーキテクチャ方針](docs/architecture.md)：構成と、各ドキュメントへの案内
- [公開手順](docs/deployment.md)：公開の流れと確認項目
- [Cloudflareの設定](docs/cloudflare.md)：ブランチ制御、ドメイン、解析
- [キャンバス型ポートフォリオの設計](docs/infinite-canvas.md)：画面と操作
- [コンテンツの書き方](docs/content.md)：作品・スキル・年表の書式
- [キャンバスの実装構成](docs/canvas-implementation.md)：Hookと純粋関数の分け方
- [アセットの方針](docs/assets.md)：画像・動画の扱い
- [MVPの範囲と今後の拡張](docs/roadmap.md)
