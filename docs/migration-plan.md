# 技術構成の移行計画

> 実装順の更新（2026-10-02）: 初回公開は現行トップページの再現後に行う。下記の旧Phase 2・3にある作品詳細ページと作品ごとのSEOは次のリリースに分ける。静的出力を `out` から既存Workerで配信し、Previewで確認してから `develop → main` で公開する。現行のBuild／Preview設定と復旧用deployment IDはCloudflare管理画面で公開前に記録する。実際の切り替え手順は[React移行の確認記録](react-migration-checklist.md)を参照する。

## 目的

現在の静的なHTML / CSS / JavaScriptサイトを、Next.js / Reactを中心とした構成へ移行する。将来的には、プロジェクトや活動実績を管理画面から追加できる構成へ拡張する。

この計画では、ドメイン停止、既存デザインの意図しない破壊、不要なDB導入を避けながら段階的に移行する。

## Target architecture

```text
Cloudflare Registrar
  └─ Cloudflare DNS
       └─ 正規ドメイン
            └─ Cloudflare Worker (Workers Builds)
                 └─ Next.js application
                      ├─ 公開ページ
                      ├─ プロジェクト詳細
                      ├─ 将来の管理画面
                      └─ 将来のDB / Storage
```

初期のNext.jsアプリは既存のCloudflare Workerへデプロイする。Next.jsの出力・実行方式は移行時にPreviewで検証する。DBや管理画面を追加した後に別の実行基盤が必要になった場合は、[ADR 0003](adr/0003-cloudflare-domain-and-runtime.md)に従って再評価する。

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

## Phase 0.5: ブランチ・デプロイ基盤を確立する

Phase 1のReact化を始める前に、コード変更を安全に検証・公開できる流れを作る。

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

この段階を終えてからPhase 1のNext.js / React導入を開始する。判断の詳細は[ADR 0004](adr/0004-branching-and-deployment-strategy.md)に記録する。

## Phase 1: Next.js / Reactの土台を作る

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

## Phase 2: コンテンツと表示を分離する

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

## Phase 4: Cloudflare Workerへ移行後の公開確認

### 作業

- Next.jsの出力・実行方式をWorkerのPreview環境へデプロイする。
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

- React化中は現在の静的サイトを公開可能な状態で保持する。
- `develop`と`main`のBranch protectionを解除して緊急対応しない。例外時は理由と事後同期を記録する。
- 現在のWorker deploymentを削除しない。
- 本番DNSの変更は最後に行う。
- DB導入時は、導入前のTypeScript/JSONデータをリポジトリに残す。
- 実行基盤を移す場合は、旧環境を確認できる期間を設ける。
