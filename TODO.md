#TODO 優先順位順

> このファイルは**これからやること**だけを持つ（＝いずれ空になるのが正しい）。
> **完了項目は `CHANGELOG.md` へは移さず、ここから消すだけ**。経緯はコミットメッセージが代替する
> （release-please が `CHANGELOG.md` を自動生成しているため、bluesnovel 方式の手動転記は行わない）。
> 冒頭から少しずつ進める。

## 依存ライブラリの削減（bluesnovel方式へ）

姉妹プロジェクト `../bluesnovel` が既に同じ移行を済ませており、削除理由・移植元コードが
ソースコメントに記録されている（`本家 ○○.ts:行番号 の移植` の形）。

### 積み残し

- [ ] `[tsy]`/`[trans]` 専用の E2E が無い（`prj_tsy` 新設か `prj_leak` へラベル追加）。
      motion 移行後は `CmnTween` 側の自己再帰 rAF ループが無くなるため、`rafPending`
      （`probe.ts:67-80`, `snPage.ts:118`）による `reloadMain` 前後の多重化検知は
      「CmnTween の追跡レジストリに登録漏れが残っていないか」（destroy()後もアニメが動き続けない
      か）を見る形に読み替える。pixi Ticker 分の rAF は引き続き乗るので閾値の取り方は要検討
