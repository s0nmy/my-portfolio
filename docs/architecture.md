# ポートフォリオの構成方針

## 目的

個人ポートフォリオを、軽量で更新しやすく、独自ドメインで公開する。
MVPでは作品紹介・プロフィール・外部SNSへの導線を提供する。

## MVPの構成

```text
GitHub repository
  └─ push / pull request
      └─ Cloudflare Pages
          └─ Cloudflare DNS + 独自ドメイン
              └─ 訪問者
```

| 領域 | 採用するもの | 役割 |
| --- | --- | --- |
| ドメイン・DNS | Cloudflare Registrar / DNS | ドメインの取得と名前解決 |
| ホスティング | Cloudflare Pages | 静的サイトのビルド・配信・SSL |
| ソース管理 | GitHub | ソースコードと変更履歴の管理 |
| フロントエンド | HTML / CSS / JavaScript | サンプルを出発点にして実装 |
| アクセス解析 | Cloudflare Web Analytics | Cookieバナーなしで基本的な閲覧状況を確認 |

## ドメイン設計

- `example.com` を正規URLとする。
- `www.example.com` は `example.com` へリダイレクトする。
- Pagesプロジェクトには `example.com` と `www.example.com` を関連付ける。
- HTTPSはCloudflareで有効化し、常にHTTPSを利用する。

実際のドメイン名が決まるまでは、設定値やURLをリポジトリに固定で書かない。

## デプロイ運用

1. GitHubの`main`ブランチを本番ブランチにする。
2. Cloudflare PagesとGitHubリポジトリを接続する。
3. `main`へのpushを本番公開のトリガーにする。
4. 機能追加やデザイン変更はブランチを作成し、Pull Requestで確認する。
5. Pull RequestごとにCloudflare PagesのプレビューURLで実機確認する。
6. `main`へマージ後、本番URLで表示・リンク・モバイル表示を確認する。

## 初回デプロイ手順

以下は、静的なHTML / CSS / JavaScriptで実装する現在のMVPを前提とする。
フレームワークやビルド工程を追加した場合は、手順4のビルド設定だけをその構成に合わせて変更する。

### 事前準備

1. GitHubにリポジトリを作成し、少なくとも`main`ブランチを一度pushする。
2. Cloudflareアカウントを用意する。
3. 独自ドメインをCloudflare Registrarで取得する、または既存ドメインのネームサーバーをCloudflare指定のものへ変更して、Cloudflareのゾーンとして有効にする。
   ルートドメイン（`example.com`）をPagesに接続するには、当該ゾーンが同じCloudflareアカウントで管理されている必要がある。

### Cloudflare PagesとGitHubを接続する

1. Cloudflareダッシュボードで **Workers & Pages** を開き、**Create application** → **Pages** → **Connect to Git** を選ぶ。
2. GitHubを認可し、このリポジトリを選択する。
3. プロジェクト名を決める。最初の公開URLは`<project-name>.pages.dev`となる。
4. **Production branch** に`main`を指定する。
5. 現時点ではフレームワークを選ばず、次のビルド設定にする。

   | 設定項目 | 値 |
   | --- | --- |
   | Framework preset | None / 未選択 |
   | Build command | 空欄 |
   | Build output directory | `/`（リポジトリ直下） |
   | Root directory | 空欄（リポジトリ直下） |

   `index.html`がリポジトリ直下にある構成のため、ビルドは不要である。将来Viteなどを導入したら、出力先（例: `dist`）を指定し、ローカルでも同じビルドコマンドが成功することを確認する。
6. **Save and Deploy** を選び、完了後に`https://<project-name>.pages.dev`で初回公開を確認する。

Git連携を選んだPagesプロジェクトは、後からDirect Upload方式へ切り替えられない。通常の運用では問題ないため、このポートフォリオではGit連携を継続する。

### 独自ドメインとHTTPSを設定する

1. Pagesプロジェクトの **Custom domains** → **Set up a domain** から、まず`example.com`を追加する。
   CloudflareがDNSレコードを作成するまで待ち、ステータスが有効になったことを確認する。
2. 同じ画面から`www.example.com`もカスタムドメインとして追加する。
   DNSレコードを手動で先に作るのではなく、必ずPagesのドメイン追加フローを先に実行する。先にCNAMEだけを作ると名前解決できず、`522`になることがある。
3. **Bulk Redirects** で`www.example.com`から`https://example.com`へのリストとルールを作成する。
   設定は`301`、**Preserve query string**、**Subpath matching**、**Preserve path suffix**を有効にする。
4. **DNS** で`www`のプロキシ有効（オレンジ雲）のレコードを用意する。オリジンを持たないリダイレクト専用レコードには、Cloudflare公式の予約アドレス`192.0.2.1`をAレコードとして指定できる。
5. Cloudflareの **SSL/TLS** で証明書の発行完了を確認し、**Always Use HTTPS** を有効にする。
   証明書発行やDNS伝播には時間がかかる場合がある。既存のCAAレコードがある場合は、Cloudflareの証明書発行を許可しているかを確認する。

`_redirects`はパス単位のリダイレクトには利用できるが、ドメイン単位の`www → apex`リダイレクトには使わない。

### 日常の公開フロー

1. `main`から作業ブランチを作り、変更をcommitしてGitHubへpushする。
2. Pull Requestを作成する。Cloudflare Pagesはブランチ／PRごとにプレビューURLとGitHubのデプロイステータスを作成する。
3. プレビューURLで表示、リンク、スマートフォン幅のレイアウトを確認する。
4. Pull Requestを`main`へマージする。Pagesが本番デプロイを開始する。
5. Pagesの **Deployments** で対象commitが成功していることを確認し、`https://example.com`で公開確認を行う。

失敗時はPagesのデプロイ詳細にあるBuild logを最初に確認する。現在はビルドコマンドがないため、主な確認対象はリポジトリ直下に`index.html`があることと、参照するCSS・JavaScript・画像のパスである。

### 公開後の確認コマンド

実ドメインへ置き換えて、ローカル端末から次を実行する。

```sh
curl --head --location https://example.com/
curl --head --location https://www.example.com/
```

両方が最終的に`https://example.com/`を返すこと、`www`からの最初の応答が`301`であること、HTTPSのエラーがないことを確認する。

### Web Analyticsを有効にする

Pagesプロジェクトの **Metrics** で **Web Analytics** を有効にする。次回デプロイ時にCloudflareが計測用スニペットを自動追加するため、HTMLへ手作業でスニペットを貼り付ける必要はない。

## 運用上の注意

- APIキー、トークン、個人情報をリポジトリへcommitしない。将来ビルド時の設定値が必要になった場合は、Pagesの **Settings** → **Environment variables** で管理する。
- `main`以外へのpushも既定ではプレビューを発行する。公開したくない検証ブランチは、PagesのGit設定で自動デプロイ対象を見直す。
- 大きな画像・動画を追加する前に、ローカル表示とモバイル回線相当での読み込みを確認する。

## 情報の確認元

以下は2026-07-22に確認したCloudflare公式ドキュメントである。CloudflareのUIや設定項目は変わり得るため、実施時にもリンク先を参照する。

- [Cloudflare Pages: Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/)
- [Cloudflare Pages: Custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)
- [Cloudflare Pages: Redirecting www to domain apex](https://developers.cloudflare.com/pages/how-to/www-redirect/)
- [Cloudflare Pages: Redirects](https://developers.cloudflare.com/pages/configuration/redirects/)
- [Cloudflare Web Analytics: Get started](https://developers.cloudflare.com/web-analytics/get-started/)

## アセット方針

- MVPの画像・短い動画は、リポジトリ内で管理する。
- 画像は可能な限りWebPまたはAVIFに変換し、表示サイズに合わせて圧縮する。
- ヒーロー動画はモバイル回線を考慮して短く・軽くし、動画なしでも成立する背景色または静止画を用意する。
- 他者の写真・動画・SNS投稿を無断で転載・直リンクしない。自作物、利用許諾済み素材、またはライセンス条件を満たす素材を使う。

## MVPの対象外

以下はMVPに含めない。必要性が生じた段階で追加を検討する。

- お問い合わせフォーム
- Cloudflare Workers
- Turnstile
- データベース
- 会員機能・管理画面
- R2による画像・動画配信

## 将来拡張

### お問い合わせフォーム

フォームを追加する場合は、ブラウザからメール送信サービスへ直接接続しない。
`/api/contact`をCloudflare Workersで実装し、Turnstileをサーバー側で検証した後にメール送信サービスへ渡す。
APIキーはCloudflareのシークレットとして管理する。

### R2

作品画像や動画が増え、リポジトリ管理が重くなった場合はCloudflare R2を導入する。
公開先は`assets.example.com`のような独自サブドメインにし、開発用の`r2.dev` URLは本番配信に使わない。

## 公開前チェック

- [ ] 独自ドメインと`www`のリダイレクトが意図どおりである
- [ ] HTTPSで表示され、HTTPからHTTPSへ転送される
- [ ] PC・スマートフォンで主要画面を確認した
- [ ] 作品リンク・SNSリンク・OGP画像を確認した
- [ ] 画像・動画の利用権とクレジット表記を確認した
- [ ] 主要ページのタイトルとdescriptionを設定した
