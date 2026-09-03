#TODO 優先順位順

> このファイルは**これからやること**だけを持つ（＝いずれ空になるのが正しい）。
> **完了項目は `CHANGELOG.md` へは移さず、ここから消すだけ**。経緯はコミットメッセージが代替する
> （release-please が `CHANGELOG.md` を自動生成しているため、bluesnovel 方式の手動転記は行わない）。
> 冒頭から少しずつ進める。

## /simplify＋modern-web-guidance 全体スイープ（2026-09-03）

`src/sn/**`＋`src/*.ts` 全体を 5 パスで読了・第 1〜7 適用済み（経緯は各コミット、控えは
[.claude/docs/refactor-candidates.md](.claude/docs/refactor-candidates.md)）。残りは以下だけ：

- [ ] 描画層 第 3〜4 適用（`Layer.renderGate` / `#defChStyle` / `#remakeBackColor`）の**実機確認**。
      本家に該当 e2e が無い：`renderGate`＝`tsy.e2e.ts`＋`[trans]` サンプル、
      `#defChStyle`＝`gallery/?cur=ch_in_out`、`#remakeBackColor`＝`[lay b_color=]`
- [ ] `ConfigBase.searchPath` の `#extInGroup(grp, ext)` helper 化（低優先・効果小）
