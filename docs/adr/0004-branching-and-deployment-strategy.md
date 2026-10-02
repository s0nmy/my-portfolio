# ADR 0004: developを統合ブランチ、mainを本番デプロイブランチとする

- Status: Accepted
- Date: 2026-10-02
- Scope: Gitブランチ、Pull Request、Cloudflare Pagesのデプロイ

## Context

これまでは`main`を本番ブランチとして扱い、作業ブランチから`main`へPull Requestを作成する運用を想定していた。今後はReact化、Next.js化、将来のDB導入など、途中状態が長く続く変更が増える。

移行途中のコードを本番へ直接混ぜず、統合・確認を行う場所を明確にする必要がある。また、Cloudflare Pagesでは本番ブランチとプレビューブランチを分けられるため、Gitの流れとデプロイ環境を対応させる。

## Decision

ブランチの役割を次のように定める。

```text
feature/*, fix/*, docs/*
        │ Pull Request
        ▼
develop  ── 統合・検証用
        │ Pull Request（リリース単位）
        ▼
main     ── 本番専用
```

### `main`

- 本番公開されるブランチとする。
- 直接pushを禁止する。
- `develop`からのPull Requestをマージしたときだけ本番デプロイされる運用にする。
- GitHubのBranch protectionでPull Request、必須チェック、force push禁止、削除禁止を設定する。

### `develop`

- 次回リリースに含める変更を統合するブランチとする。
- GitHubリポジトリの通常のデフォルトブランチおよび通常のPull Requestのbaseブランチとする。
- `feature/*`などからPull Requestを作成する。
- 直接pushを原則禁止し、レビューとチェックを通してマージする。
- Cloudflare Pagesではプレビュー環境として確認する。

### 作業ブランチ

- 必ず`develop`から作成する。
- 命名は既存ルールに従い、`feat/*`、`fix/*`、`docs/*`、`chore/*`などを使用する。
- 作業ブランチから`main`へ直接Pull Requestは作成しない。

## Deployment behavior

Cloudflare Pagesの設定は次のようにする。

| 設定 | 方針 |
| --- | --- |
| Production branch | `main` |
| Production deployment | 有効 |
| Preview deployment | `develop`および作業ブランチで有効 |
| 本番ドメイン | `main`のデプロイだけに関連付ける |
| Preview URL | PRまたはブランチ単位で利用する |

`feature/* → develop`のPull RequestではPreview URLとチェックを確認する。`develop → main`のPull Requestをマージすると、`main`へのpushとして本番デプロイが開始される。

ただし、Cloudflare PagesのGit連携は本番ブランチへのコミットをトリガーにするため、GitHub側で`main`への直接pushを禁止することが前提になる。Cloudflare Pages側ではProduction branchを`main`に設定し、Preview branchの対象を設定する。

## Release flow

1. `develop`を最新化する。
2. `develop`から作業ブランチを作成する。
3. 作業ブランチで実装・確認する。
4. 作業ブランチから`develop`へPull Requestを作成する。
5. 必須チェックとPreview URLを確認して`develop`へマージする。
6. `develop`の統合状態を確認する。
7. リリース単位で`develop`から`main`へPull Requestを作成する。
8. `main`へマージし、本番デプロイを開始する。
9. 本番URL、正規URL、主要ページ、画像、外部リンクを確認する。

## Decision criteria

### developを経由する

- React化やNext.js化のように複数PRに分割する変更を安全に統合したい。
- 本番公開前にPreview URLで画面を確認したい。
- 本番デプロイの操作を`main`へのマージに限定したい。

### 直接mainへ入れる例外を作らない

緊急修正も原則として`fix/* → develop → main`を通す。どうしても緊急対応が必要な場合は、例外の理由と事後の`develop`への反映を記録する。

## Consequences

### Positive

- 本番と開発中の状態を分離できる。
- React移行中の未完成な変更を本番へ出しにくい。
- Preview URLを使ったレビューが標準になる。
- `main`へのマージをリリース操作として扱える。

### Negative

- `develop`から`main`へのリリースPull Requestが1つ増える。
- `develop`が壊れた場合、後続の作業も影響を受ける。
- GitHubのBranch protectionとCloudflare PagesのBranch controlを初回に設定する必要がある。

## Supersession

この運用を変更する場合は、新しいADRで、例えばTrunk Based DevelopmentやPreview環境の分離などの理由・移行手順・ロールバック方法を記録する。
