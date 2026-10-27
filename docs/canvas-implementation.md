# キャンバスの実装構成

キャンバスの実装は `app/canvas/` にあり、変更理由ごとに分けたCustom Hookと、純粋関数で構成する。このページは、その分け方をまとめる。読み手は、キャンバスを変更する開発者とAIエージェントを想定している。画面と操作の仕様は[キャンバス型ポートフォリオの設計](infinite-canvas.md)を参照する。実装は `app/canvas/` にある。変更理由ごとにCustom Hookを分け、各Hookのファイル冒頭に次の7項目を書いている。

- Intent
- Boundary
- State modeling
- Update surface
- Hidden complexity
- Composition
- Test notes

位置や倍率の計算は、`camera.ts` と `cardLayout.ts` の純粋関数に置く。

| Hook | 役割 |
| --- | --- |
| `useCamera` | カメラの状態を持つ（倍率は、常に許容範囲へ丸めて保存する） |
| `usePinchZoom` | 2本指のズーム |
| `useCardLayout` | カードの位置とサイズを持つ（サイズは、範囲内に丸めてから保存する） |
| `useCardSelection` | 選択と最前面の順序（`useReducer`） |
| `useCardGestures` | パン、カードの移動、カードのサイズ変更（同時に有効なジェスチャーは1つ） |
| `usePaneResize` | LayersとInspectの幅 |
