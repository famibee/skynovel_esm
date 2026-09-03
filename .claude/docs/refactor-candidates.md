# リファクタ候補（/simplify＋modern-web-guidance 全体スイープ 2026-09-03〜）

`src/sn/**`（約 16000 行・43 ファイル）＋ `src/*.ts` に `/simplify` をかけた際に挙がる
**構造リファクタ案・掃除項目**の控え。分家 bluesnovel が独自コードに 9 弾かけた
（`../bluesnovel/src/docs/refactor-candidates.md`）のと同じ運用を本家側でも回す。

- 掃除でなく「作り直し」の範疇は即着手せずここへ。
- いずれも**動作確認済みコードの書き換え**で既存テストは視覚・挙動の回帰を拾えない。
  着手するなら 1 項目ずつ、`../tmp_esm_uc` 実走で確認しながら。
- 適用は**本家として素直な範囲だけ**（新機能・新タグは足さない。挙動不変の整理に限る）。
- 終わった項目はここから消し、経緯はコミットメッセージへ。

## 進捗

- 第 1 パス（2026-09-03）… パースユーティリティ群（`CmnLib`/`AnalyzeTagArg`/`Grammar`/
  `PropParser`/`RubySpliter`/`Config`/`ConfigBase`）を読了。
- 第 1 適用（2026-09-03）… **`PropParser` / `Grammar` / `Config` / `RubySpliter` 済**
  （下記。単体 757 件・tsc 通過。挙動不変）。パース群で残るのは `CmnLib` の数値パース
  横断確認（下記・要 `Variable` 読解）と `ConfigBase` の小ヘルパ（低優先）のみ。
- 第 2 パス（2026-09-03）… 描画層を全ファイル読了（`Pages`/`GrpLayer`/`Layer`/`LayerMng`/
  `SpritesMng`/`TxtLayer`/`TxtStage`）。`SpritesMng` は pixi loader の GC/キャッシュ落とし穴
  コメントが多く**触らない**と判断。
- 第 3〜4 適用（2026-09-03）… `LayerMng`（`#eachTargetPage`・`renderGate`）＝`1b1e2da`、
  `TxtLayer`/`TxtStage`（`#defChStyle`・`#remakeBackColor`・`#pctOrPx`）＝`d93d55d`。
  分家 1771 件＋本家 777 件・tsc 通過。
- 第 3 パス（2026-09-03）… 実行エンジン読了（`ScriptIterator`/`Main`/`Variable`/`CallStack`/
  `Areas`）。`Areas` は「先頭カンマ」が互換性凍結、`Main.#main` の TokenTop 判定は既存コメントで
  可読性担保のため**触らない**。
- 第 5 適用（2026-09-03）… `Grammar.numLF()` 新設＝`ScriptIterator`(6)＋`Main`(1) の
  `(s.match(/\n/g)??[]).length` を集約、`Variable.#let_replace`/`#let_search` の RegExp 生成
  三項を `new RegExp(reg, flags || undefined)` へ。単体 777 件・分家 1771 件・tsc 通過。
- 第 4 パス（2026-09-03）… 音声・入力層読了（`SoundMng`/`SndBuf`/`SndCtx`/`EventMng`/
  `FocusMng`/`GamepadMng`/`Button`）。`SndBuf` の St* 状態機械は 2026-08 の howler 撤去で
  作り直したばかり＋各行 `// ok` 印で検証済みのため**触らない**。
- 第 6 適用（2026-09-03）… `SndBuf.getVol` を export して `SoundMng.#getVol`（完全重複）を廃止、
  `EventMng.button` の clickse/enterse/leavese 3 重複を `resvSe()` へ、`Button` の
  style/style_hover/style_clicked の JSON パース 3 重複を `#applyStyleJson()` へ。
  単体 777 件・分家 1771 件・tsc 通過。
- 第 2 適用（2026-09-03）… **`Pages` / `Layer`（`#scaledWH` 抽出＋`hBldFilter` の CMF 工場化）済**。
  工場化に伴い `test/Layer_filter.test.ts`（20 件）を新設＝ColorMatrixFilter 系 19 個が
  「工場経由」と「pixi 直呼び」で同じ `.matrix` を生むことを保証（分家からのテスト輸入でなく
  本家の pixi 実装向けに新規。機能追加ではない）。単体 777 件・tsc 通過。

## Simplification / Efficiency

### PropParser.ts — 済（2026-09-03）

- ~~**`#tokenize()` のループ内で正規表現リテラルを毎回生成**~~ … 済。
  `REG_TOK_HEX`/`FLOAT`/`INT`/`BOOL`/`IDENT` の 5 本をモジュール定数へ（`^` アンカー・
  非 global で lastIndex 問題なし）。式評価はセーブ判定・`&式`・埋め込み変数展開で
  高頻度に走るホットパス。分家「ホットパスの `new RegExp` キャッシュ」＝第1弾と同型。
- ~~**`#hFnc` の 2 項数値演算が ~16 個コピペ**~~ … 済。
  `#binNum(f: (x,y)=>any)` ファクトリへ。`** * / % - << >> >>> < <= > >= & ^ |` が
  `this.#binNum((x,y)=> x*y)` の 1 行ずつに。評価順（左辺→右辺）は元と同一。
  短絡が要る `&&`/`||`・文字列連結分岐のある `+` は対象外。`¥` は `Math.floor(#hFnc['/'])`
  のまま。**ついでに `<`〜`>=` 群と `==`〜`!==` 群で入れ替わっていたセクションコメント
  （「等値…」「小なり…」）も正しい位置へ**。
- ~~**`Object.prototype.toString.call(x) === '[object String]'`/`'[object Number]'` のベタ書き**~~
  … 済。モジュール helper `isStr`/`isNum` 2 個へ（`#resolveVar`・`+`・`Number`・`#fncSub_ChkNum`）。
  `===`/`!==` の「両辺のタグ同士を比較」する 1 箇所は別パターンなので据え置き。

### Grammar.ts — 済（2026-09-03）

- ~~**`testTagLetml`/`testTagEndLetml` が呼び出しごとに regex リテラル生成**~~ … 済。
  `resolveScript` 内の `/\r\n?/g`・`/^([^\]]+?])(.*)$/s` と合わせ `REG_CRLF`/`REG_LETML_SPLIT`/
  `REG_IS_LETML`/`REG_IS_ENDLETML` の 4 本をモジュール定数へ。効果は小（トークン化は
  起動時＋ジャンプ時のみ）だが 2 行で済むので同梱。

### Config.ts / RubySpliter.ts — 済（2026-09-03）

- ~~`Config.searchPath` の `fn.slice(11)` / `fn.slice(10)` マジックナンバー~~ … 済。
  `fn.slice(PROTOCOL_DL.length)` / `fn.slice(PROTOCOL_USERDATA.length)` へ。
- ~~`RubySpliter.putTxtRb` の `/^\w+｜{"/` / `/^\*.?$/` 毎回リテラル生成~~ … 済。
  `REG_RB_JSON` / `REG_RB_SESAME` モジュール定数へ（テキスト描画のルビ 1 件ごとに通る）。

### ConfigBase.ts — 低優先

- `searchPath` に `` `|${grp}|`.includes(`|${ext}|`) `` の「拡張子がパイプ区切り群に含まれるか」
  判定が 4 箇所。`#extInGroup(grp, ext)` の private helper へ寄せられるが、各所で
  `search_exts` を先に組んで使い回しており、単純置換だと逆に増える箇所もある。効果小。

### CmnLib.ts

- **数値属性パースが複数実装**（横断確認 → 統合は見送り）。`argChk_Num`（`CmnLib.ts:79`。
  hash 破壊的更新・`0x` 分岐・必須チェック）／`PropParser.#fncSub_ChkNum` ／
  `Variable.#castAuto`（`Variable.ts:609`。`/^-?[\d.]+$/` にマッチしたら `parseFloat`）が
  それぞれ「文字列→数値」を持つ。ただし用途が別物 ―― `argChk_Num` は属性の必須／型エラー、
  `#castAuto` は「`getVal` の戻り値をなるべく数値・真偽値に寄せる」ゆるい推測で、正規表現も
  `"1.2.3"` や `"."` を通す**互換性込みのゆるさ**。共通化すると `#castAuto` を厳しくする
  ことになり後方非互換。**触らない**。分家 `CmnLib.parseArgNum` への統合は分家側だけの話。
- **コメントアウトされた `console.log` / `t-r-a-c-e` の残骸**（`CmnLib.ts:111-118` の
  `argChk_Boolean` 内、`CmnLib.ts:255-257` の `PropParser` `UnaryNegate`/`Unaryplus`）。
  リファレンス目的の変換表コメント（`CmnLib.ts:100-109`）は残す。

## 描画層

### Pages.ts — 済（2026-09-03）

- ~~`argChk_Boolean(hArg, 'visible', true)` が連続 2 回~~ … 済（2 行目は no-op。コメントを残して 1 行に）。
- ~~組み込み変数 `const.sn.lay.<層名>.<fore|back>.<属性>` の `defTmp` が 12 行手書き~~ … 済。
  `{alpha,height,visible,width,x,y}` の getter テーブル × `['fore','back']` の二重ループへ
  （登録順が prop 交互→side 交互に変わるが独立定義なので無害）。

### Layer.ts

- ~~`setXY` と `setXYByPos` が「`ret` の拡縮率で見た `base` の表示サイズ」前処理を丸ごと重複~~
  … 済。`Layer.#scaledWH(base, ret)` へ抽出（5 行 ×2 → 1 行 ×2）。
- ~~`hBldFilter` の ColorMatrixFilter 系 19 個が `const f = new ColorMatrixFilter; f.xxx(...); return f`
  の 3 行ボイラープレート反復~~ … 済。`Layer.#cmf((f, h)=> f.xxx(...))` の 1 工場へ
  （各エントリ 1 行に。`multiply` の意味説明も 19 回 → 1 回）。`color_tone`（引数 5）も
  同じ工場に乗る。`color_matrix`（20 要素）・`blur`・`noise` は形が違うので据え置き。
  約 175 行 → 約 25 行。`test/Layer_filter.test.ts` で `.matrix` パリティを担保。
  なお sn_gallery `prj/filter/` の目視確認も可（工場化のリスクは行列一致テストでほぼ潰れている）。
- **候補（低優先）**：`setXY` の `if (v > -1 && v < 1) v *= CmnLib.stageW/H`（＝0..1 は画面比率）が
  x 4 分岐・y 4 分岐で 8 回。`norm(v, dim)` helper で短くはなるが、各分岐は続く相殺項
  （`b_width/2` 等）が違い、iPhone6 対策で順序注意コメント（`Layer.ts:570`）もあるため
  テーブル化は避け、helper 差し込みだけなら可。効果小。

### LayerMng.ts — 済（2026-09-03）

- ~~`[clear_lay]`/`[add_filter]`/`[clear_filter]`/`[enable_filter]` が
  「`#foreachLayers` → `page==='both'` なら fore/back 両方、でなければ `getPage(hArg)` 片面」を
  4 箇所コピペ~~ … 済。`#eachTargetPage(hArg, (l: Layer)=> void)` へ集約（分家 第1弾
  `eachTargetLay` 共通化と同型・同ロジック）。`#add_filter2` は消滅、4 メソッドが各 2〜4 行に。
- ~~「動きが無いレイヤは 1 回だけ焼く」自己書き換えラッパを `GrpLayer.renderStart` と
  `LayerMng.#trans`（back / fore）で 3 回手書き~~ … 済。`Layer.renderGate(body, animated)`
  へ集約（`let fnc = ...; if (! still) {const old = fnc; fnc = ()=> {fnc = noop; old()}}` の 4 行 → 1 行）。
  **render ホットパスで本家に unit なし**＝`tsy.e2e.ts`＋`[trans]` サンプルで要実機確認。

### SpritesMng.ts — 見送り（触らない）

- pixi の Loader/TextureCache 相互作用に関する回帰防止コメントが密（`#csv2Sprites` の
  「continue は厳禁、御法度」、`#dec2cachePicMov` の revokeObjectURL タイミング等）。
  `#sortAFrameName` の regex 1 本くらいしか機械的な整理対象が無く、リスク＞リターン。

### TxtLayer.ts / TxtStage.ts — 済（2026-09-03）

- ~~`TxtStage.ch_in_style` と `ch_out_style` が ~60 行ほぼ完全重複（違いは格納先 map と
  `join` 既定＝出現 true／消去 false だけ）~~ … 済。`#defChStyle(hArg, hStore, joinDef)` へ
  （分家 ChStyle 系の掃除と同型）。※ `gallery/?cur=ch_in_out` で目視確認可。
- ~~`TxtLayer.#drawBack`（b_color 分岐）と `chgBackAlpha` が「既存 #b_do 破棄 →
  今の TxtStage サイズで Graphics 矩形を作り直して最背面へ」を重複~~ … 済。
  `#remakeBackColor(alpha)` helper へ。
- ~~`#ch_in_style`/`#ch_out_style`（TxtLayer 側 static）の translate 量整形
  `x.startsWith('=') ? %  : px` の 2 行重複~~ … 済。`TxtLayer.#pctOrPx(raw, n)` へ。
- **触らなかったもの**：`#putCh` の巨大 switch（各 case が生成する span 文字列は 1 文字ずつが
  ブラウザ禁則・ルビレイアウトに直結。`grp`/`tcy` の構造類似はあるが差分が load-bearing）、
  `#mkStyle_r_align` vs `#mkStyle_r_align4ff`（Firefox は `ruby-align`、他は `text-align`/
  `padding`＝本質的に別物）、`#clearText` の GC タイミングコメント群。

### フィルタ工場化（`6e71575`）の追い直し — 済

- `6e71575` で `Layer.#cmf((f, h)=> ...)` としたら分家 `test/argdef_parity.test.ts` が落ちた
  （`upstreamDefaults()` が本家ソースを `argChk_*(hArg, '名前', ...)` 前提で走査するため、
  ラムダ仮引数を `h` にすると `b`/`scale`/`multiply` を見失う）。`(f, hArg)=> ...` へ戻して修復。
  **本家ソースで `argChk_*` の第1引数を `hArg` 以外にしない**こと（分家パリティテストの制約）。

## 実行エンジン

### ScriptIterator.ts / Main.ts — 済（2026-09-03）

- ~~`(s.match(/\n/g) ?? []).length`（トークン内の改行数）が `ScriptIterator` に 6 箇所・
  `Main` に 1 箇所。走査ループ内なので毎回リテラル生成~~ … 済。`Grammar.numLF(s)` へ集約。
- **触らなかったもの**：`#seekScript`（無名ラベル before/after・派生ファイルの空行埋めなど
  吉里吉里互換の塊）、`#if` の深度カウンタ＋行番号補正ループ（`zLn` 補正が load-bearing）、
  `#dump_stack` と `#aStack` のコールスタック走査類似（一方は console 整形・他方は
  デバッガ配列で консьюmer が別）、`Main.#main` の TokenTop 判定（`uc === 9/10/38/…` は
  各行のコメントで可読性担保、`const enum` 化しても得が薄い）。

### Variable.ts — 一部（2026-09-03）

- ~~`#let_replace` / `#let_search` の `! flags ? new RegExp(reg) : new RegExp(reg, flags)`~~
  … 済。`new RegExp(reg, flags || undefined)` へ（`undefined` はフラグ無し扱いで等価）。
- 候補（未適用・低優先）：`#let_abs`〜`#let_substr` の 8 メソッドが末尾で
  `hArg.text = …; this.#let(hArg); return false` を反復。`#letText(hArg, text)` helper に
  寄せられるが本家に unit なし（`tmp_esm_uc` の e2e 頼み）で効果も小。
- `#castAuto` の数値パースは CmnLib 横断確認済み → 上記「CmnLib.ts」参照（統合は非互換で見送り）。

### CallStack.ts / Areas.ts — 触らない

- `CallStack` は 41 行の素な値クラス。`Areas` は `toString` 先頭カンマが「互換性に問題あり凍結」
  と明記、`record`/`erase` の領域マージ分岐もテスト（`AreasTest.test.ts`）が張り付いており
  整理対象なし。

## 音声・入力層

### SoundMng.ts / SndBuf.ts — 一部（2026-09-03）

- ~~`SoundMng.#getVol` と `SndBuf.getVol`（module 関数）が完全重複~~ … 済。`SndBuf.getVol` を
  export して `SoundMng` から import、`SoundMng.#getVol` を削除。
- **触らなかったもの**：`SndBuf` の `St*` 状態機械（`StLoading`〜`StStop`）。2026-08 の howler
  撤去で作り直したばかりで、ファイル冒頭に修正済み不備の一覧、各メソッドに `// ok` 印。
  `onend/onfade/stopse/ws/fade/wf` の空実装反復は「状態ごとに意図的に無視」の明示なので
  基底クラス化しない。`'const.sn.sound.'+ buf +'.'` の prefix 生成が十数箇所あるが helper に
  すると各所の `vn +'xxx'` 連結がかえって読みにくく、効果小。

### SndCtx.ts / GamepadMng.ts — 触らない

- どちらも howler 撤去・`gamepad.js` 撤去に伴う新設で既に素直。音量クランプ
  `v < 0 ? 0 : v > 1 ? 1 : v` が `SndCtx.setGlobalVol` / `getVol` / `SndBuf` の pan で 3 種
  あるが、pan は範囲が `-1..1` で別物、`clamp01` helper 化の効果は薄い。

### EventMng.ts — 一部（2026-09-03）

- ~~`button()` の clickse / enterse / leavese が「fn 存在チェック → ポインターイベントで
  `[playse]`」の 3 重複~~ … 済。ローカル関数 `resvSe(se, sebuf, ev)` へ。
  旧実装の `hArg.Xsebuf ??= 'SYS'`（hArg 破壊）は `buf: sebuf ?? 'SYS'` に置換（呼び出し後に
  誰も読まない値なので破壊をやめた）。
- 候補（未適用）：`#modKey4MouseEvent` と `SysBase.modKey` は似ているが、後者は
  `e.key === 'Alt' ? '' : 'alt+'` の自己修飾キー除外があり `MouseEvent` には `e.key` が無い。
  型を偽ってまで統合する価値なし。

### FocusMng.ts — 候補（未適用）

- `prev()` と `next()` がほぼ同型（`#allOff` → len チェック → idx ラップ → 巡回ループ →
  `on()` で確定）。`#step(dir: 1 | -1)` へ寄せられるが、負数を含む剰余計算の書き換えは
  巡回方向のオフバイワンを踏みやすく、本家に FocusMng の unit なし（gamepad/キー操作の
  フォーカス送りは e2e 頼み）。効果に対しリスク高で見送り。

### Button.ts — 一部（2026-09-03）

- ~~`style` / `style_hover` / `style_clicked` の「`hArg[nm]` を JSON パースして `TextStyle` へ
  流し込む」処理が 3 重複~~ … 済。`static #applyStyleJson(style, hArg, nm)` へ。
  戻り値（マージ元オブジェクト or undefined）で「`style` は `#o` にも展開」「属性無しなら
  既定の見た目調整」の分岐を呼び元に残した。
- **触らなかったもの**：`#loaded_pic`（3 分割スプライトシートの Rectangle 切り出し）、
  `#loaded_b_pic` の `setTransform` 引数、`constructor` の `this.x = ...` を代入式の値として
  `#o` に畳み込むイディオム（pixi プロパティと dump 用 `#o` の同時初期化）。

## 未分析

- システム基盤（`SysBase` / `SysWeb` / `SysApp` / `CmnInterface`）＋ `src/*.ts`

## 見送り済み

（まだ無し）
