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
- 第 2 パス（2026-09-03）… 描画層のうち `Pages` / `GrpLayer` / `Layer` を読了。
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

- **数値属性パースが複数実装**（要横断確認）。`argChk_Num`（`CmnLib.ts:79`。hash 破壊的更新・
  `0x` 分岐・必須チェック）／`PropParser.#fncSub_ChkNum` ／ `Variable.#castAuto`（未読）が
  それぞれ「文字列→数値」を持つ。分家は `CmnLib.parseArgNum(v, errHead)` へ非破壊部分を
  統合した（第2弾）。本家は本家シグネチャ（`argChk_*` は本家 API 再 export 対象）を壊さない
  範囲で内部の重複だけ寄せられるか要検討。
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

### 描画層 — 未分析

- `LayerMng`（39.9K・最大）/ `TxtLayer`（31.8K）/ `TxtStage`（33.3K）/ `SpritesMng`（14.8K）

## 未分析

- 実行エンジン（`ScriptIterator` / `Main` / `Variable`）
- 音声・入力層（`SoundMng` / `SndBuf` / `SndCtx` / `EventMng` / `FocusMng` / `GamepadMng` / `Button`）
- システム基盤（`SysBase` / `SysWeb` / `SysApp` / `CmnInterface`）＋ `src/*.ts`

## 見送り済み

（まだ無し）
