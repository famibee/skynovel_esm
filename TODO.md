#TODO 優先順位順

> このファイルは**これからやること**だけを持つ（＝いずれ空になるのが正しい）。
> **完了項目は `CHANGELOG.md` へは移さず、ここから消すだけ**。経緯はコミットメッセージが代替する
> （release-please が `CHANGELOG.md` を自動生成しているため、bluesnovel 方式の手動転記は行わない）。
> 冒頭から少しずつ進める。

- **`update_check` URL上書き機構の生成コマンド（`sn_extension`側）** … 配布済みアプリ側の
  読込・優先処理は `SysApp.ts` の `update_check`（`#resolveUpdUrl()`）に実装済み
  （`userData` 直下の `upd_url.json` を確認し、あれば `dec('json', tx)` で復号して優先使用、
  無ければ従来通りスクリプト内蔵の既定URLにフォールバック）。
  残作業：上書きファイルの生成をこのリポジトリとは別の `sn_extension` にCLI/コマンドとして
  追加すること（プロジェクトごとの `pass.json` の鍵で `Encryptor.enc()` した結果を
  `upd_url.json` として出力）。配布は作者のブログ等、既存の告知手段を想定（署名検証等の
  改竄対策は不要と判断——任意ファイル設置が可能な状況は既により重大な侵害のため）。

## 保留中（着手条件待ち・作業なし）

- **`.sn_hint` ツールチップの CSS anchor positioning 化** … modern-web-guidance を引いた結果、
  flip 後の矢印切り替えに必要な Anchor position container queries が Chrome 143+ のみ・
  Firefox / Safari 未対応で、JS フォールバック（現 `HintPos.ts`）必須ゆえコード増。
  anchor positioning が Baseline widely available になったら再評価。詳細は
  [.claude/docs/refactor-candidates.md](.claude/docs/refactor-candidates.md) 末尾。
