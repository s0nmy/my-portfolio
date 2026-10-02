# ADR 0003: Cloudflareのドメイン・DNSとアプリ実行基盤を分離する

- Status: Accepted
- Date: 2026-10-02
- Scope: ドメイン、DNS、ホスティング、Next.jsの実行方式

## Context

ドメインはCloudflare Registrarで取得している。GitHubにはCloudflare Workers Buildsによる`my-portfolio`のproduction build履歴があり、現在の公開先はCloudflare Workerである。DBや管理画面を導入すると、静的サイトだけでなくサーバー実行、API、認証、再検証が必要になる可能性がある。

ドメインを理由にホスティング先を固定すると、将来の選択肢が狭くなる。一方、ホスティングを変えるたびにドメインやDNSの構成を大きく変えると、停止や証明書エラーのリスクがある。

## Decision

1. Cloudflare Registrarでのドメイン契約とCloudflare DNSを基盤として維持する。
2. ドメインをアプリの実行基盤と同一視しない。
3. React化の初期公開先は既存のCloudflare Workerを継続する。GitHub連携とproduction branchを使ったWorkers Buildsを維持する。
4. 実行基盤を変更する場合も、まずプレビュー用ホスト名で動作確認し、その後に本番DNSまたはカスタムドメインを切り替える。
5. `www`から正規ホスト名へのリダイレクト、HTTPS、DNSレコード、メール用レコードをアプリ移行とは別の変更として扱う。

## Hosting options

| 選択肢 | 適する状態 | 注意点 |
| --- | --- | --- |
| Cloudflare Workers | 現在の公開経路を維持し、静的配信や必要なサーバー処理を行う | Next.js互換性、Workers固有の実行方式、運用を検証する |
| Cloudflare Pages静的出力 | 公開ページが静的サイトで完結し、Workers上の実行に制約がある | サーバー機能や即時再検証に制約がある |
| Vercel + Cloudflare DNS | Next.jsの機能と導入容易性を優先したい | ホスティングがCloudflare外になり、サービスが増える |

## Runtime decision criteria

次の条件で実行基盤を見直す。

### Workersを継続する

- 更新がGitのPull Requestで問題ない。
- DB更新後にビルドを起動する運用でよい。
- Next.jsの必要機能がWorkersの実行環境で動作する。
- 静的アセット配信またはWorkers上のサーバー機能が要件を満たす。

### Pagesへ切り替える

- 公開ページが静的HTMLで完結する。
- Workersで必要な機能の互換性または運用上の制約が解消できない。

### Vercelを選ぶ

- Next.jsのサーバー機能を優先したい。
- Cloudflare固有の実行環境対応を減らしたい。
- CloudflareはRegistrar / DNS / CDNの役割に集中させればよい。
- Vercelの利用料金、制限、ベンダーロックインを受け入れられる。

## Migration safety rules

- 本番ドメインのDNSを先に変更しない。
- 新環境はPreview URLまたは一時サブドメインで検証する。
- 変更前にDNSレコード、メール関連レコード、現在のWorker deploymentとbuild設定を記録する。
- 切り替え後にHTTP、HTTPS、正規URL、主要ページ、画像、外部リンクを確認する。
- 失敗時に旧Worker deploymentへ戻せる状態を維持する。
