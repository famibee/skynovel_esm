# SKYNovel (skynovel_esm) — 開発メモ

ノベルゲームエンジン本体 `@famibee/skynovel_esm` のリポジトリ。

## 規約

- コメントとコミットメッセージは**日本語**。Co-Authored-By署名は不要。周囲のコメント密度に合わせる（このコードベースは特に本家との相違について厚く書く）。
- git add / git commit はユーザーが行う。作業完了時は最後にコミットメッセージ案を提示。
  - 実際のcommitは実行しない。ユーザーがそのまま使うか手直しするか判断。


## サンプルプロジェクト tmp_esm_uc

- READMEに載っている `tmp_esm_uc`（「桜の樹の下には」）は GitHub 上だけでなく、
  **`../tmp_esm_uc`（このリポジトリの1つ上の階層）にローカルでも存在する**。
  GitHub API を叩く前に、まずローカルを見ること。
- `package.json` の `dependencies` で `"@famibee/skynovel_esm": "file:../skynovel_esm"`
  として、このリポジトリを相対パス参照している。
- シナリオ本体は `../tmp_esm_uc/doc/prj/` 配下（`script/*.sn`, `theme/*.sn`,
  `frames/*.sn` など）。`src/prj_base/` は空（配布/雛形用で中身が無いことがある）。
- 起動: `../tmp_esm_uc` で `npm run web`（vite dev server）。
  vite が `@fs/.../skynovel_esm/dist/*.js` を直接参照するので、
  **このリポジトリの `dist/` をビルドし直すだけで tmp_esm_uc 側の再インストール無しに反映される**。
- **`src/sn/*.ts` を直したら必ず `bun run build`（= `bun src/build.ts`）**。
  tmp_esm_uc が読むのは `dist/`（Web版）と `dist_app/`（アプリ版）であって `src/` ではない。
  ビルドを忘れると「直したのに直らない」になる。`bun run watch` で監視も可。
  反映確認は `dist/` 側の minify 済みコードを grep する（例: `grep -o "capture[^,;)]*" dist/EventMng.js`）。
  minify で記号やスペースが変わるので、grep パターンは緩めにすること。
- 初回アクセス時、Vite の依存最適化（optimize deps）の再読み込みが挟まると
  シナリオの `.sn` 逐次ロードが一部止まって見えることがある（`ext_fg.sn` 等が
  リクエストされないまま stall する）。1〜2回 reload すると解消するので、
  発生してもエンジン側のバグと即断しない。
