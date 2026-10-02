# ADR（Architecture Decision Record）

このディレクトリには、ポートフォリオの技術構成と移行方針に関する判断を記録する。

ADRは、現在の正解を固定するためではなく、判断時点の前提・選択肢・判断基準・影響を残すために使う。前提が変わった場合は既存ADRを書き換えず、新しいADRを追加して supersede（置き換え）関係を記録する。

## 一覧

| ADR | 内容 | 状態 |
| --- | --- | --- |
| [0001](0001-nextjs-react-migration.md) | Next.js / Reactへの移行 | Accepted |
| [0002](0002-content-management-and-database.md) | コンテンツ管理とDB導入時期 | Accepted |
| [0003](0003-cloudflare-domain-and-runtime.md) | Cloudflareドメイン、DNS、実行基盤の分離 | Accepted |
| [0004](0004-branching-and-deployment-strategy.md) | develop統合、main本番のブランチ戦略 | Accepted |

## 追加・更新のルール

1. 重要な構成変更の前にADRを作成する。
2. 「なぜそうしたか」を中心に書き、実装手順は移行計画へ書く。
3. 外部サービス、課金、公開範囲、認証、データ移行、ドメイン変更を伴う場合はADRの対象とする。
4. 判断を変更するときは、既存ADRの状態を変更し、新しいADRから参照する。
