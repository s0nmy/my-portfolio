# Portfolio

個人ポートフォリオサイトです。Next.js / React / TypeScript の静的出力で構成します。トップページは探索型キャンバス、従来のページは `/classic` です。作品の新しい正本は `content/projects/*.md` で、画像とfaviconは `public` のファイルを参照します。移行前の HTML / CSS / JavaScript は比較用に `legacy/static-site` に保管しています。旧版への復旧には Git 履歴または Cloudflare の過去の deployment を使います。旧ソースを単独で配布する場合は `public/` のアセットも必要です。

## ディレクトリ

```text
app/                    Next.js App Router、画面コンポーネント、コンテンツ
content/projects/        作品のMarkdownとFrontmatter
public/                 公開アセットの正本
legacy/static-site/     移行前サイトの比較用ソース
docs/                   設計、ADR、移行・運用記録
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

Cloudflare Workers BuildsでGitHubの`main`ブランチを本番デプロイします。Workerの静的アセットは `wrangler.jsonc` で `out` を指定しています。Cloudflare管理画面のBuild commandを `npm run build`、Deploy commandを `npx wrangler deploy` に設定し、Preview確認後に `develop → main` で公開します。Preview commandの項目はWorker Previewsへの切り替え状態によって表示が異なるため、現行の設定を確認します。切り替え手順と未確認事項は[移行実装の確認記録](docs/react-migration-checklist.md)を参照してください。

## 設計・移行ドキュメント

- [アーキテクチャ方針](docs/architecture.md)
- [キャンバス型ポートフォリオの設計](docs/infinite-canvas.md)
- [移行計画](docs/migration-plan.md)
- [ADR一覧](docs/adr/README.md)
