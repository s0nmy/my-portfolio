# コンテンツの書き方

キャンバスに表示する内容は、すべてリポジトリ内のMarkdownに書く。このページは、各ファイルの置き場所と書式をまとめる。読み手は、作品やプロフィールを更新する開発者とAIエージェントを想定している。ビルド時に読み込み、静的に出力する。DB、管理画面、サーバーAPIは追加しない。Markdownの先頭にある `key: value` 形式の設定部分を、Frontmatterと呼ぶ。複雑なYAML構文は使わず、1行に1つの値だけを書く。

| 内容 | ファイル | Frontmatter | 本文 |
| --- | --- | --- | --- |
| 作品 | `content/projects/*.md` | `slug`, `title`, `description`, `overview`, `technologies`, `image`, `imageAlt`, `href`, `x`, `y` | 将来の詳しい紹介用（Inspectには表示しない） |
| Skills | `content/skills.md` | `title`, `summary`, `x`, `y` | `##` 見出しが技術の分類、その下の1行が技術名 |
| Timeline | `content/timeline.md` | `title`, `summary`, `x`, `y` | `##` 見出しが時期、その下の1行目が活動名、残りが説明 |

作品のFrontmatterのうち、`description` はカード用のひとこと、`overview` はInspect用の説明である。`x` と `y` は、キャンバス上の初期位置を表す。
