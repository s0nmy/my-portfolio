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
