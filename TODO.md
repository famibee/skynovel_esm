#TODO 優先順位順

> このファイルは**これからやること**だけを持つ（＝いずれ空になるのが正しい）。
> **完了項目は `CHANGELOG.md` へは移さず、ここから消すだけ**。経緯はコミットメッセージが代替する
> （release-please が `CHANGELOG.md` を自動生成しているため、bluesnovel 方式の手動転記は行わない）。
> 冒頭から少しずつ進める。

## /simplify 全体スイープ（2026-09-03）― 完了

`src/sn/**`＋`src/*.ts` 全体を 5 パスで読了・第 1〜8 適用済み。実機確認も済（`renderGate`＝
`tsy.e2e.ts` の `[trans]`、`#defChStyle`/`#pctOrPx`/`#remakeBackColor`＝新設 `draw.e2e.ts`）。
経緯は各コミット、控えは [.claude/docs/refactor-candidates.md](.claude/docs/refactor-candidates.md)。

## modern-web-guidance パス（別イニシアチブ・着手は要判断）

- [ ] 本家 DOM 面へ modern-web-guidance を引く。/simplify スイープでは 4 観点のみ回した。
      modern-web-guidance は「UI/DOM 新規実装前のルックアップ」で、勧める類（Popover /
      anchor positioning / View Transitions 等）の導入は「挙動不変・新機能なし」の本スイープ憲章と
      衝突するため範囲外にした。候補（`.sn_hint` ツールチップの anchor positioning + Popover 化ほか）は
      [.claude/docs/refactor-candidates.md](.claude/docs/refactor-candidates.md) 末尾にメモ。挙動変更を伴う
