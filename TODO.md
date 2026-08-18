#TODO 優先順位順

> このファイルは**これからやること**だけを持つ（＝いずれ空になるのが正しい）。
> **完了項目は `CHANGELOG.md` へは移さず、ここから消すだけ**。経緯はコミットメッセージが代替する
> （release-please が `CHANGELOG.md` を自動生成しているため、bluesnovel 方式の手動転記は行わない）。
> 冒頭から少しずつ進める。

## 依存ライブラリの削減（bluesnovel方式へ）

姉妹プロジェクト `../bluesnovel` が既に同じ移行を済ませており、削除理由・移植元コードが
ソースコメントに記録されている（`本家 ○○.ts:行番号 の移植` の形）。以下は2026-08-18の
調査結果。

- [ ] **`howler` の削除**（最も影響大）
  - 新規 `src/sn/SndCtx.ts`（bluesnovel `src/ts/SndMng.ts:38-88` 相当）— プロセスに1つだけの
    `AudioContext` + マスタ `GainNode`、`unlock()`、`codecs()`、`fn→Promise<AudioBuffer>` の
    デコードキャッシュ。**モジュール単位のシングルトン**に（`SoundMng` の寿命に縛ると
    `SysBase.run()` の Main 作り直しで ctx が増え Chrome の上限6件に当たる）
  - `src/sn/SndBuf.ts` — `Howl` を `AudioBufferSourceNode` + `GainNode` + `StereoPannerNode` へ。
    `:188-292` の `HowlOptions` 組み立てと `:319-349` の `#play()` を
    `fetch → decAB → decodeAudioData → start()` へ。
    **`:365-520` の6状態の状態機械と `Reading.beginProc/notifyEndProc` 連携は温存**
    （bluesnovel は待ちを ScriptMng へ寄せた別設計で、本家に持ち込むと影響が過大）
  - `src/sn/SoundMng.ts` — `:46` `Howler.codecs`、`:61`/`:133` `Howler.volume()`、
    `:142` `Howler.unload()`。**`Howler.unload()` の「ctx ごと閉じて作り直す」は iOS/Safari
    で suspended 固定になるため移植しない**
  - `src/sn/CmnLib.ts:197-207` の判定専用 AudioContext を毎回 new する実装を `SndCtx` へ委譲
  - **自動再生解除**: howler の `autoUnlock` が消えるので `EventMng` の初回入力から
    `SndCtx.unlock()` を呼ぶ（見落とし注意）
  - 本家固有の注意: sprite の力技（`:220-266`）→ `loopStart`/`loopEnd`/`start(0, off)`／
    `.bin` 暗号アセット（`:271-292`）は **Blob URL が不要になる**（`createObjectURL`/
    `revokeObjectURL` `:283`,`:300-305` と `#oUrl`/`o.format='mp3'`/`onplay` を削除）／
    `[xchgbuf]` の `buf` が `readonly`(`:116`) のため交換後に自然終了すると古い buf 名で
    `tmp:playing` を倒す（可変にする）／`#tidFakeEnd`(`:331-348`) に **`speed` で割る補正を追加**
    （現状バグ）／`codecs` に `m4b` 追加／`Howler.volume()` の 0〜1 クランプは自前で
  - **同時に直す既知バグ**（bluesnovel `SndBuf.ts:8-25` が指摘）: `:478`
    `StWaitingFade.onend` が `notifyEndProc('wf')` を呼ばず永久停止／`:429-430`
    フェード停止時に `StStop` が2回構築／`:419` の `delay` が `Howl.fade()` に渡らず死んでいる
    （有効化＝仕様変更として周知）
  - **E2E 計装**: `test/e2e/app/main.ts:18,24,67-77` と `test/e2e/snPage.ts:127-174` が
    `Howler._howls` を直接覗いている。src 側に `SndBuf.live: Set<SndBuf>` と各種ゲッタを用意して
    観測点を移す
  - `SndCtx.ts` と `SndBuf.ts` は**同一コミットで**（howler と ctx が二重に立つ中間状態を作らない）
  - 検証: `test/e2e/sound.e2e.ts` 28本。書き換え必須は `:201-236` の sprite 6本、`:186-197` の
    pan/rate、`:139` の `glbVolume`、`howlList()` 空判定（`:44,65,73,90,117,178,272`）。
    **それ以外（変数の帳簿・待ち時間・ダッキング・しおり復元）は無改変で通るべき＝これが合否判定**

- [ ] `@types/howler` も同時に削除

### 積み残し

- [ ] `[tsy]`/`[trans]` 専用の E2E が無い（`prj_tsy` 新設か `prj_leak` へラベル追加）。
      motion 移行後は `CmnTween` 側の自己再帰 rAF ループが無くなるため、`rafPending`
      （`probe.ts:67-80`, `snPage.ts:118`）による `reloadMain` 前後の多重化検知は
      「CmnTween の追跡レジストリに登録漏れが残っていないか」（destroy()後もアニメが動き続けない
      か）を見る形に読み替える。pixi Ticker 分の rAF は引き続き乗るので閾値の取り方は要検討
- [ ] `leak_crypto.e2e.ts:30-47` の blob 件数は howler 除去で音声ぶん減るので実測して更新
