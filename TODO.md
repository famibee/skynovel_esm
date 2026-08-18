#TODO 優先順位順

> このファイルは**これからやること**だけを持つ（＝いずれ空になるのが正しい）。
> **完了項目は `CHANGELOG.md` へは移さず、ここから消すだけ**。経緯はコミットメッセージが代替する
> （release-please が `CHANGELOG.md` を自動生成しているため、bluesnovel 方式の手動転記は行わない）。
> 冒頭から少しずつ進める。

## 依存ライブラリの削減（bluesnovel方式へ）

姉妹プロジェクト `../bluesnovel` が既に同じ移行を済ませており、削除理由・移植元コードが
ソースコメントに記録されている（`本家 ○○.ts:行番号 の移植` の形）。以下は2026-08-18の
調査結果。

- [ ] **`devtools-detect` の削除** — `src/sn/SysWeb.ts:15-16` の import と `:154-159` の
  `devtoolschange` ハンドラを、bluesnovel `src/ts/DevToolsGuard.ts`（43行）方式へ。
  原理は同じ「window 外寸と内寸の差」ヒューリスティック（しきい値160px、500ms 間隔 + resize）。
  **本家は `this.main?.destroy()` まで行うので、警告オーバーレイのみに留める bluesnovel 版と違い
  既存の強制終了の挙動を維持する**（`cfg.oCfg.debug.devtool` が OFF のときのみ動くのも同じ）。
  削除理由: 2026-05-12 に作者がリポジトリをアーカイブ、README 冒頭に「多くの欠陥がある」と明記

- [ ] **`gamepad.js` の削除** — `src/sn/EventMng.ts:255-321` を、bluesnovel
  `src/ts/GamepadMng.ts`（120行）方式（`navigator.getGamepads()` を rAF でポーリング）へ。
  `src/sn/gamepad.js.d.ts` も削除。
  削除理由: 型を同梱しない。rAF ループ停止漏れ・window の `error` リスナ解除漏れ
  （`EventMng.ts:398,408-410` で呼び出し側が手当てしている穴）。
  **bluesnovel 版をそのままコピーせず、本家固有の挙動を残すこと**:
  - `cmp instanceof Container`（pixi Container 判定）での `globalThis`/`document.body` 振り分け（`:298`, `:312`）
  - スライダー（`type="range"`）への `InputEvent('input')` 再ディスパッチ（`:304`）
  - **奇数ボタンは `middleclick` のまま**（bluesnovel は `rightclick` へ意図的に変更しているが本家互換のため変えない）
  - `#destroyed` チェック（`:317`）と `destroy()`（`:405-411`）の後始末
  - ヒステリシス（ENTER `0.3` / EXIT `0.2`）は bluesnovel の改善なので取り込む

- [ ] **`parsimmon` の削除** — `src/sn/PropParser.ts` の parsimmon 使用は
  **コンストラクタの文法構築（`:29-175`）と `#parser.parse()`（`:180`, `:243`）に限定**され、
  評価テーブル `#hFnc`（`:201-321`）・`#procEmbedVar`・`getValAmpersand` は非依存。
  **この文法構築部分だけを差し替える**。
  移植元 bluesnovel `src/ts/ExprEval.ts`（390行）— 手書きトークナイザ `#tokenize()`(`:85-148`) +
  Pratt parser `#parseToAst()`(`:153-224`) + 優先順位表 `H_BINOP`(`:46-60`)。
  **このファイルは本家 `test/PropParser.test.ts` をテスト駆動で移植して作られた**ので戻すのは容易。
  戻す際の差分: `game:` 別名は不要／例外接頭辞を `(ExprEval)` → **`(PropParser)`** に戻す／
  `evalBool()` は bluesnovel 独自なので移植しない。
  検証: `bun test`（`test/PropParser.test.ts` 706行が合否判定そのもの）

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

- [ ] `@types/howler` / `@types/parsimmon` も同時に削除

### 積み残し

- [ ] `[tsy]`/`[trans]` 専用の E2E が無い（`prj_tsy` 新設か `prj_leak` へラベル追加）。
      motion 移行後は `CmnTween` 側の自己再帰 rAF ループが無くなるため、`rafPending`
      （`probe.ts:67-80`, `snPage.ts:118`）による `reloadMain` 前後の多重化検知は
      「CmnTween の追跡レジストリに登録漏れが残っていないか」（destroy()後もアニメが動き続けない
      か）を見る形に読み替える。pixi Ticker 分の rAF は引き続き乗るので閾値の取り方は要検討
- [ ] `leak_crypto.e2e.ts:30-47` の blob 件数は howler 除去で音声ぶん減るので実測して更新
