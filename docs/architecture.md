# ポートフォリオの構成方針

個人ポートフォリオを、軽量で更新しやすい静的サイトとして、独自ドメインで公開する。Next.jsの静的出力を、Cloudflare Workerから配信する。このページの読み手は、サイトの構成や公開手順を確認する開発者とAIエージェントを想定している。最初のリリース（MVP）で提供するのは、作品紹介、プロフィール、外部SNSへの導線である。

## 現在の構成

| 領域 | 現行の構成 | 次の候補 |
| --- | --- | --- |
| フロントエンド | Next.js / React / TypeScript、静的出力（トップページはキャンバス型） | 詳細ページを段階的に追加 |
| コンテンツ | 作品は `content/projects/*.md` | 詳細本文の拡充 |
| 画像・動画 | `public/` で管理 | 増えたらCloudflare R2を検討 |
| ホスティング | Cloudflare Workers Buildsが、静的出力をWorkerへ配信 | SSRが必要になったら再評価 |
| ドメイン・DNS | Cloudflare Registrar / DNS | 継続 |
| アクセス解析 | Cloudflare Web Analytics（Cookieバナーなしで閲覧状況を確認） | 継続 |
| ソース管理 | GitHub | 継続 |
| 管理画面・認証 | なし | 要件が明確になったら検討 |

次の方針で運用する。

- 画像とfaviconの正本は `public/` に置く
- DBと管理画面は、まだ導入しない
  - ブラウザからの編集、画像のアップロード、即時公開の需要が明確になった時点で判断する
- トップページの設計は、[キャンバス型ポートフォリオの設計](infinite-canvas.md)にまとめている
  - 作品情報は `content/projects/*.md` に書き、ビルド時に静的HTMLへ取り込む（書式は[コンテンツの書き方](content.md)）
- 旧版へ戻すときは、Gitの履歴か、Cloudflareの過去のdeploymentを使う

## 詳細ドキュメント

| 知りたいこと | ドキュメント |
| --- | --- |
| 公開の手順と、公開前後の確認 | [公開手順](deployment.md) |
| Cloudflare側の設定 | [Cloudflareの設定](cloudflare.md) |
| 画像・動画の扱い | [アセットの方針](assets.md) |
| MVPに含めないものと、今後の拡張 | [MVPの範囲と今後の拡張](roadmap.md) |
| トップページの画面と操作 | [キャンバス型ポートフォリオの設計](infinite-canvas.md) |
| コンテンツの書式 | [コンテンツの書き方](content.md) |
| キャンバスの実装構成 | [キャンバスの実装構成](canvas-implementation.md) |
