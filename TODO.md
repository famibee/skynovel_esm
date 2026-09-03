#TODO 優先順位順

> このファイルは**これからやること**だけを持つ（＝いずれ空になるのが正しい）。
> **完了項目は `CHANGELOG.md` へは移さず、ここから消すだけ**。経緯はコミットメッセージが代替する
> （release-please が `CHANGELOG.md` を自動生成しているため、bluesnovel 方式の手動転記は行わない）。
> 冒頭から少しずつ進める。

（空）

---

## 保留中（着手条件待ち・作業なし）

- **`.sn_hint` ツールチップの CSS anchor positioning 化** … modern-web-guidance を引いた結果、
  flip 後の矢印切り替えに必要な Anchor position container queries が Chrome 143+ のみ・
  Firefox / Safari 未対応で、JS フォールバック（現 `HintPos.ts`）必須ゆえコード増。
  anchor positioning が Baseline widely available になったら再評価。詳細は
  [.claude/docs/refactor-candidates.md](.claude/docs/refactor-candidates.md) 末尾。
