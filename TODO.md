#TODO 優先順位順

> このファイルは**これからやること**だけを持つ（＝いずれ空になるのが正しい）。
> **完了項目は `CHANGELOG.md` へは移さず、ここから消すだけ**。経緯はコミットメッセージが代替する
> （release-please が `CHANGELOG.md` を自動生成しているため、bluesnovel 方式の手動転記は行わない）。
> 冒頭から少しずつ進める。

## /simplify＋modern-web-guidance 全体スイープ（2026-09-03 開始）

分家 bluesnovel は独自コード（`src/ts/**`＋`src/components/**`＋`src/store/`）に `/simplify` を
9 弾かけて掃き出し済み。本家由来コードぶんは「分家で分析だけしても本家との再取り込み衝突が
増えるだけ」なので、**本家（このリポジトリ）側で回す**と決定（分家 `src/docs/refactor-candidates.md`）。

対象は `src/sn/**`（約 16000 行・43 ファイル）＋ `src/*.ts`。掃除でなく作り直しの範疇なので
**1 項目ずつ設計判断＋実機（`tmp_esm_uc` 実走）確認しながら適用**、経緯は消す際のコミットメッセージへ。
挙がった候補の控えは [.claude/docs/refactor-candidates.md](.claude/docs/refactor-candidates.md)。

- [ ] `src/sn/` パースユーティリティ群 … `PropParser`/`Grammar`/`Config`/`RubySpliter` は適用済み。
      残り：`CmnLib` の数値パース重複（`Variable.#castAuto` と横断確認してから）／
      `ConfigBase` の小ヘルパ（低優先）
- [ ] `src/sn/` 描画層 … 全ファイル適用済み or 見送り確定（`SpritesMng`・`#putCh` switch・
      `#mkStyle_r_align4ff` は触らない）。**実機確認の宿題**：`Layer.renderGate`＝`tsy.e2e.ts`＋
      `[trans]` サンプル、`#defChStyle`＝`gallery/?cur=ch_in_out`、`#remakeBackColor`＝`[lay b_color=]`
- [ ] `src/sn/` 実行エンジン（`ScriptIterator` / `Main` / `Variable` / `CallStack` / `Areas`）の分析
- [ ] `src/sn/` 音声・入力層（`SoundMng` / `SndBuf` / `SndCtx` / `EventMng` / `FocusMng` /
      `GamepadMng` / `Button`）の分析
- [ ] `src/sn/` システム基盤（`SysBase` / `SysWeb` / `SysApp` / `CmnInterface`）＋ `src/*.ts` の分析
