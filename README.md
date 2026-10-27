# Portfolio

個人ポートフォリオサイトです。Next.js / React / TypeScript の静的出力で構成します。トップページは探索型キャンバスです。作品の正本は `content/projects/*.md` で、画像とfaviconは `public` のファイルを参照します。旧版への復旧には Git 履歴または Cloudflare の過去の deployment を使います。

## ディレクトリ

```text
app/                    Next.js App Router（canvas/ 画面とジェスチャー、lib/ Markdownローダー、styles/）
content/projects/        作品のMarkdownとFrontmatter
public/                 公開アセットの正本
docs/                   設計、ADR、運用記録
docs/workflows/         Codex / Claude Code 共通ワークフローの正本
```

## ローカル確認

```sh
npm ci
npm run lint
npm run typecheck
npm run build
npm run dev
```

`npm run build` は `out` を生成します。作品詳細ページは次のリリースで追加します。

## 公開

Cloudflare Workers BuildsでGitHubの`main`ブランチを本番デプロイします。Workerの静的アセットは `wrangler.jsonc` で `out` を指定しています。Cloudflare管理画面のBuild commandを `npm run build`、Deploy commandを `npx wrangler deploy` に設定し、Preview確認後に `develop → main` で公開します。Preview commandの項目はWorker Previewsへの切り替え状態によって表示が異なるため、現行の設定を確認します。

## 設計ドキュメント

- [アーキテクチャ方針](docs/architecture.md)
- [キャンバス型ポートフォリオの設計](docs/infinite-canvas.md)
- [ADR一覧](docs/adr/README.md)
