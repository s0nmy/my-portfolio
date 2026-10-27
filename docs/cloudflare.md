# Cloudflareの設定

サイトは、Cloudflareのドメイン・DNSと、Workers Buildsによるデプロイで公開する。このページは、Cloudflare側で確認・維持する設定をまとめる。読み手は、公開設定を確認する開発者とAIエージェントを想定している。Workerの名前は `my-portfolio` である。GitHubの本番コミットには、Workers Buildsの成功チェックが付く。公開の手順は[公開手順](deployment.md)を参照する。

## Workers Buildsのブランチ制御

1. Cloudflareダッシュボードで、**Workers & Pages** → **my-portfolio** → **Settings** → **Build** → **Branch control** を開く
2. Production branchを、`main` に明示して設定する
   - GitHubのデフォルトブランチを `develop` に変えても、Production branchは変わらないことを確認する
3. Preview buildsを有効にし、`develop` と作業ブランチからPreviewを作れるようにする
4. 既存のBuild command、Deploy command、Preview commandを記録する
   - Previewが本番のdeploymentを置き換えないことを確認する
5. Worker Custom DomainとDNSレコードは、変更しない

Workers Buildsは、production branchへのpushで本番をbuildする。Preview buildsを有効にすると、ほかのブランチはPreviewとして扱われる。

## ドメイン

- `example.com` を正規URLにする
- `www.example.com` は `example.com` へリダイレクトする
- 公開ホスト名は、Cloudflare DNSとWorkerのCustom Domainで管理する
- HTTPSをCloudflareで有効にし、常にHTTPSで配信する

実際のドメイン名が決まるまで、設定値やURLをリポジトリに固定で書かない。

正規URLは、Workers Buildsのビルド変数 `SITE_URL` に設定する。

- 例：`SITE_URL=https://example.com`
- OGPやTwitterカードの画像URLは、この値をもとに絶対URLになる
- 未設定のときは `http://localhost:3000` になり、SNSのプレビューに画像が出ない

## Web Analytics

Cloudflare Web Analyticsは、Workersのデプロイ方式とは別に管理する。既存の設定を維持し、ホスティングを変えたときは、計測が続いていることを確認する。

## 情報の確認元

Cloudflareの設定項目は変わることがある。実施するときに、公式ドキュメントも確認する。

- [Cloudflare Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/)
- [Cloudflare Workers Builds：Build branches](https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/)
- [Cloudflare Workers Builds：Configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)
- [Cloudflare Workers：Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)
- [Cloudflare Web Analytics：Get started](https://developers.cloudflare.com/web-analytics/get-started/)
