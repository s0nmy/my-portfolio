# 技術構成の移行計画

> 実装状況（2026-10-02）: Next.js / React / TypeScriptでトップページを実装し、静的出力を`out`へ生成する。作品詳細ページと作品別SEOは次のリリースに分ける。ローカルのlint、型チェック、build、Wrangler previewは確認済み。Cloudflare上のPreview・本番確認と実機確認は未完了で、切り替え前にBuild／Preview設定と復旧用deployment IDを記録する。手順は[React移行の確認記録](react-migration-checklist.md)を参照する。

## 目的

Next.js / React / TypeScriptの静的サイトをCloudflare Workerから配信する。初回移行の実装は完了し、今後は作品詳細ページ、SEO、アクセシビリティ、コンテンツ管理の必要性を段階的に検討する。移行前のHTML / CSS / JavaScriptは`legacy/static-site/`に比較用として保管している。

この計画では、ドメイン停止、既存デザインの意図しない破壊、不要なDB導入を避けながら段階的に移行する。

## Target architecture

```text
Cloudflare Registrar
  └─ Cloudflare DNS
       └─ 正規ドメイン
            └─ Cloudflare Worker (Workers Builds)
                 └─ Next.js static export (`out/`)
                      ├─ 公開ページ
                      ├─ プロジェクト詳細
                      ├─ 将来の管理画面
                      └─ 将来のDB / Storage
```

Next.jsは静的出力を`out/`へ生成し、既存のCloudflare Workerから配信する構成にした。Cloudflare上のPreviewと本番での確認は未完了。SSRなど別の実行方式が必要になった場合は、[ADR 0003](adr/0003-cloudflare-domain-and-runtime.md)に従って再評価する。

## Phase 0: 現状固定と移行準備

### 作業

- 現在の主要画面をPC・スマートフォンで確認する。
- 既存のURL、外部リンク、画像、動画、SNSリンクを一覧化する。
- プロジェクト、スキル、活動実績をデータ項目として整理する。
- 既存の未コミット変更を確認し、React化の変更と混ぜない。
- 公開中のWorker deployment、Workers Buildsのコマンド・branch control、DNSレコードを記録する。
- `develop`を統合ブランチ、`main`を本番デプロイブランチとする運用を決める。

### 完了条件

- React化前の表示を比較できるスクリーンショットまたは確認項目がある。
- 既存コンテンツの欠落を検出できる一覧がある。
- 本番DNSを変更せずに作業できる。

## Phase 0.5: ブランチ・デプロイ基盤を確立する（一部確認待ち）

ブランチ戦略とGitHub Actionsのゲートはリポジトリに設定済み。Cloudflare Workers BuildsのPreviewと本番の実動作確認は未完了で、Phase 4で確認する。

### 作業

- GitHubに`develop`ブランチを作成し、今後の統合ブランチにする。
- GitHubのデフォルトブランチを`develop`に設定し、通常のPull Requestのbaseにする。
- `main`を本番ブランチ、`develop`を統合・検証ブランチとして定義する。
- 作業ブランチは必ず`develop`から作成する。
- 作業ブランチから`develop`へのPull Requestを標準にする。
- リリース時は`develop`から`main`へPull Requestを作成する。
- `main`と`develop`への直接pushを禁止し、必須チェックを設定する。
- `.github/workflows/branch-gate.yml`の`quality-gate`を両ブランチの必須チェックにし、`main`向けPRでは`release-source`も必須にする。
- Cloudflare Workers BuildsのProduction branchを`main`に固定し、Preview buildsを有効にする。
- 小さなドキュメント変更でPreview buildと`main`マージ後の本番buildを確認する。

### 完了条件

- `feature/* → develop → main`の流れがGitHub上で確認できる。
- 作業ブランチのPRでPreview URLを確認できる。
- `develop`へのマージでは本番ドメインが変わらない。
- `main`へのマージでProduction deploymentが開始される。
- `main`への直接pushが拒否される。
- `develop`以外から`main`へPRを作成してもrequired checkが失敗する。
- 既存Worker deploymentへ戻す手順が分かる。

ブランチ戦略の判断は[ADR 0004](adr/0004-branching-and-deployment-strategy.md)に記録する。

## Phase 1: Next.js / Reactの土台を作る（完了）

### 作業

- Next.js App RouterとTypeScriptを導入する。
- `app/layout.tsx`、`app/page.tsx`、共通コンポーネントを作る。
- 既存画像を`public/images`などへ移す。
- 既存CSSを再利用し、必要なグローバルCSSを整理する。
- `script.js`の処理を、静的CSS、Reactコンポーネント、Client Componentに分類する。

### 完了条件

- トップページがNext.jsで表示される。
- 主要セクションの内容・リンク・画像が欠落していない。
- スクロール演出、画像ギャラリー、動画の再生方針が確認できる。
- `npm run build`が成功する。

## Phase 2: コンテンツと表示を分離する（一部完了）

プロジェクト情報は`app/content/projects.ts`へ分離済み。スキルと活動実績は現在コンポーネント内にあり、データ編集の負担が生じた時点で追加分離する。

### 作業

- `ProjectCard`、`ProjectGallery`、`ActivityCard`などへ分割する。
- プロジェクト、スキル、活動実績をTypeScriptまたはJSONへ移す。
- `slug`、`sortOrder`、公開状態など、将来DBへ移す項目を先に定義する。
- 表示コンポーネントがデータの保存先に依存しないよう、`lib/content`に取得境界を置く。

### 完了条件

- データファイルに1件追加するだけで、プロジェクトカードが増える。
- HTMLのセクションを直接編集しなくてもコンテンツを変更できる。
- プロジェクトの型チェックが成功する。

## Phase 3: 詳細ページ・SEO・アクセシビリティ

### 作業

- `/projects/[slug]`を追加する。
- ページタイトル、description、OGP、canonical URLを設定する。
- 画像のalt、リンク名、キーボード操作、`prefers-reduced-motion`を確認する。
- 不存在のslugに対する404表示を追加する。

### 完了条件

- 各プロジェクトに直接アクセスできる。
- 共有時にプロジェクトごとのメタデータが使われる。
- キーボードのみでも主要な操作ができる。
- 主要なページで画像や外部リンクのエラーがない。

## Phase 4: Cloudflare Workerへの公開確認（未完了）

### 作業

- `out/`の静的出力をWorkerのPreview環境へデプロイする。
- 現在の独自ドメインは変更せず、WorkerのPreview URLで確認する。
- 本番切り替え前にビルド成果物、画像パス、404、モバイル表示を確認する。
- 本番切り替えは、既存Worker deploymentへ戻せる状態で行う。

### 完了条件

- Preview URLで主要画面が確認できる。
- 本番ドメインのDNS変更なしに受け入れ確認が完了する。
- 本番公開後にHTTP、HTTPS、正規URL、`www`リダイレクト、画像、外部リンクを確認する。

## Phase 5: DB導入の判断 checkpoint

次のいずれかが必要になったら、[ADR 0002](adr/0002-content-management-and-database.md)を再確認する。

- ブラウザからコンテンツを追加・編集したい。
- 画像をブラウザからアップロードしたい。
- GitHubへのpushなしで公開したい。
- 下書き、公開・非公開、表示順が必要になった。
- コンテンツ量が増え、データファイル編集が負担になった。

このcheckpointでは、DBだけでなく、認証、Storage、公開反映、バックアップ、運用費をまとめて判断する。

## Phase 6: DB・管理画面

### 初期候補

- Supabase Postgres: コンテンツDB
- Supabase Auth: 管理者認証
- Supabase Storage: 画像・動画
- Next.js `/admin`: 管理画面

Cloudflare中心の構成を優先する場合は、D1 / R2 / Workersを比較対象にする。採用前に、管理画面の認証、RLSまたは同等の権限、バックアップ、画像削除、データ移行を検証する。

### 完了条件

- 管理者だけが管理画面へ入れる。
- プロジェクトを作成・編集・非公開化できる。
- 画像のalt、表示順、削除を管理できる。
- 認証情報やサービスキーがブラウザへ漏れない。
- DB更新後の公開反映方法が明確である。
- exportまたはバックアップから復旧できる。

## Phase 7: 実行基盤の見直し

次の条件に該当した場合だけ、既存Workerの実行方式から別のWorkers構成またはVercelへの移行を検討する。

- DB更新を即時に公開したい。
- Server Actions、Route Handlers、SSR、ISRなどが必要になった。
- 管理画面と公開ページで安全なサーバー境界が必要になった。
- ビルドフックによる再ビルド運用が負担になった。

候補の比較は[ADR 0003](adr/0003-cloudflare-domain-and-runtime.md)に記録し、本番ドメインの変更前にPreviewまたは一時サブドメインで検証する。

## Validation checklist

- [ ] `npm run lint`が成功する
- [ ] `npm run build`が成功する
- [ ] PC幅で主要ページを確認する
- [ ] スマートフォン幅で主要ページを確認する
- [ ] キーボード操作を確認する
- [ ] `prefers-reduced-motion`を確認する
- [ ] 画像のaltと読み込み状態を確認する
- [ ] プロジェクト詳細のslugと404を確認する
- [ ] OGP、title、description、canonical URLを確認する
- [ ] 本番ドメインのDNSを変更せずPreviewを確認する
- [ ] 本番公開後に正規URLと`www`リダイレクトを確認する

## Rollback policy

- 移行前のソースは`legacy/static-site/`に比較用として保持し、画像とfaviconは`public/`のアセットを共有する。旧版への復旧にはGit履歴またはCloudflareの過去のdeploymentを使う。
- `develop`と`main`のBranch protectionを解除して緊急対応しない。例外時は理由と事後同期を記録する。
- 現在のWorker deploymentを削除しない。
- 本番DNSの変更は最後に行う。
- DB導入時は、導入前のTypeScript/JSONデータをリポジトリに残す。
- 実行基盤を移す場合は、旧環境を確認できる期間を設ける。
