# ARCHITECTURE.md

`CLAUDE.md` から分離した詳細版。`src/sn/` 配下（約16000行・43ファイル）の主要ファイルの役割と
起動〜シナリオ実行のデータフローをまとめる。タグ一覧・属性の既定値ルールは対象外
（`docs/tag.html`・`docs/dev.html` が実装状況の唯一の情報源）。

## データフロー

```
index.html (SysWeb/SysApp を生成)
   │  loaded() … dip/cur解釈、DevToolsGuard等
   ▼
SysBase#run() ── 動的import: Main, TxtLayer, GrpLayer
   ▼
Main.generate(sys)
   │  Config.generate(sys) → prj.json/path.json ロード(ConfigBase)
   │  sys.setMain(main, cfg)
   │  PixiJS Application 生成、Canvas準備
   ▼
Main#init()
   │  動的import: Variable, PropParser, SoundMng, ScriptIterator, LayerMng, EventMng, Button
   │  Variable 生成 → sys.init(hTag, app, val) でシステム系タグ登録・変数初期値ロード
   │  SoundMng / ScriptIterator / LayerMng / EventMng を順次生成し、
   │    各コンストラクタで hTag（T_HTag辞書）に自分の担当タグ関数を登録
   ▼
Main#resume() → queueMicrotask(#main())
   ▼
Main#main()  ── ループ
   │  ScriptIterator#nextToken() でトークン取得
   │    （Grammar#resolveScript() が事前にスクリプト文字列をトークン化）
   │  トークン種別で分岐:
   │    [ → tagToken2Name_Args() → ScriptIterator#タグ解析()
   │           → hTag[タグ名](hArg) （Variable/LayerMng/EventMng/SoundMng/SysBase等が実装）
   │    & → 変数計算/表示 → Variable経由でPropParser評価
   │    ; → コメント / * → ラベル / \n → 行数更新
   │    その他 → LayerMng（文字表示）
```

`[jump]`/`[call]` で `ScriptIterator#jumpWork` が未読み込みの `.sn` を PixiJS の `Loader` で
fetch → `sys.dec()` で復号 → 再トークン化して継続する。全体を貫く設計は `hTag`
（タグ名→処理関数の辞書）で、各 Mng クラスが自分の担当タグをコンストラクタで登録する
プラグイン的な構成になっている。

## エンジン中核

- **`Main.ts`** — メインループ本体。各 Mng クラスの生成順序を管理し、トークン種別ごとに
  ディスパッチする。破棄は `DisposableStack` で LIFO 管理。
- **`ScriptIterator.ts`**（最大ファイル、1598行）— トークン列を保持し、タグ解析実行・
  条件分岐（if/elsif/else/endif）・ラベルジャンプ・サブルーチンコール（call/return）・
  マクロ展開・しおり（save/load）・デバッガ連携（ブレークポイント/ステップ実行）を一手に
  担う実行エンジン。`#layMng`/`#evtMng` は後からセットされる循環的相互依存。ジャンプ先の
  読み込みは「派生ファイル（`fn+'@'`）」があれば基底スクリプトとマージするロジックを持つ
  （派生ファイルの空行に基底行を埋める）。
- **`SysBase.ts`** — プラットフォーム非依存の基盤クラス。プラグイン初期化、キャンバス
  リサイズ、フルスクリーン切替、デバッガ用 WebSocket、暗号化/デコードのフック登録を担う
  `SysWeb`/`SysApp` の親クラス。`destroy()` で「WebSocket は Main より長生きさせる（restart時に
  再利用）ので閉じない」「addHook() のクロージャは Main ごとに作り直すので畳まないと破棄済み
  callHook() が呼ばれ続ける」という明示的なライフサイクル注意がコードコメントにある。
- **`SysWeb.ts`** — ブラウザ向け実装。`data-prj`/`data-reload` 属性から起動、
  `localStore.ts`（localStorage）へのセーブデータ永続化、DevToolsGuard 連携。
- **`SysApp.ts`** — Electron（アプリ版）向け実装。IPC（`IpcEmitter`/`IpcListener`、
  `src/IpcMain.ts`/`src/IpcRenderer.ts` の自前実装）経由でメインプロセスとやり取りし、
  ファイルI/O・ウインドウ位置保存・アプリ自動更新を実装。
- **`Grammar.ts`** — スクリプト文字列を正規表現でトークン化する。`TArg`（全タグ共通属性の
  型）・`T_HTag`（実装済みタグ関数辞書のシグネチャ）もここで定義。括弧マクロ・一文字マクロの
  置換適用、`fn=xxx*` のワイルドカードパス展開も担当。
- **`Variable.ts`** — 変数ストア本体。`sys`/`save`/`tmp`/`mp`/`mark` の5スコープを保持し、
  `let` 系タグ、既読管理との連携、デバッガのデータブレークポイント通知を実装。文字列から
  `true`/`false`/`null`/数値へ自動変換する `#castAuto` を持つ。
- **`CallStack.ts`** — `call`/`macro` のコールスタック1件（呼び出し元ファイル名・トークン
  index・復帰用引数 `csArg`）を表す小さなクラス。`ScriptIterator` が配列で LIFO 管理。
- **`Areas.ts`** — 既読管理用の区間（開始〜終了インデックス）集合クラス。`toString()` の
  先頭カンマは「削除したいが互換性に問題があるため凍結」とコメントされている仕様凍結の例。
- **`Config.ts`/`ConfigBase.ts`** — `prj.json`/`path.json` のロードとパス解決
  （`searchPath`/`matchPath`）、暗号化時のファイル改竄チェックを担う。呼び出し順序は
  `Main.generate() → Config.generate() → Config.load()`。
- **`CmnInterface.ts`** — クロスモジュールの共通型定義集（`T_Main`/`T_SysBase`/`T_Variable`
  等）。実体を持たないが、ほぼ全ファイルから型として参照されるハブ。
- **`CmnLib.ts`** — 環境判定（UA文字列によるブラウザ/OS判定）、属性パース共通関数
  （`argChk_*`）などの雑多なユーティリティ。UA判定への切替は
  「本家は `platform.js`（bestiejs、Public archive済み）を使っていたが、移植元 bluesnovel
  `CmnLib.ts:167-184` に倣い正規表現判定へ」という経緯がコメントにある。

## 描画層

- **`LayerMng.ts`** — レイヤ管理の司令塔。`hTag` にレイヤ系・文字系タグを一括登録し、
  `#hPages: {[layerName]: Pages}` を保持してレイヤ名から `Pages` を引いて処理を委譲する。
  PixiJS の `Filter`+GLSLシェーダで `[trans]` のルール画像トランジションを実装。
- **`Layer.ts`** — 全レイヤ共通の基底クラス。PixiJS の `Sprite` を持ち、Transform操作・
  `lay()` タグの共通処理・しおり用シリアライズ・相対配置計算（`left`/`center`/`right`等）を
  提供。`GrpLayer`/`TxtLayer` が継承する。
- **`GrpLayer.ts`** — 画像レイヤ。`SpritesMng` 経由で `fn`/`face`（差分画像合成）をロードし、
  tsy（トゥイーン）中は `RenderTexture` へ事前焼き込みして高速化する。
- **`Pages.ts`** — 1レイヤ名につき `fore`/`back` の2インスタンスを管理する
  **レイヤページ**の実体。`Layer` 型のみに依存する疎結合設計で、`[trans]` タグ時に
  `transPage()` で表裏を入れ替える。
- **`TxtLayer.ts`/`TxtStage.ts`** — テキストレイヤ。`Layer` 継承の `TxtLayer` が文字列/ルビ/
  インライン画像/リンクを HTML スパン文字列に組み立て、`TxtStage` が DOM（`<span>`）へ流し
  込んでブラウザのレイアウトエンジンで文字組みさせ、`getBoundingClientRect` で矩形を取得して
  PixiJS 座標系へ変換する DOM/Pixi 橋渡しの中核。Safari/Firefox 分岐によるブラウザ依存の
  禁則・ルビレイアウトバグ回避コードが多い。
- **`SpritesMng.ts`** — 画像・動画・スプライトシートの読み込み管理。CSV形式の複数画像重ね
  合わせ、差分絵合成、暗号化デコードパイプラインを担う。`#csv2Sprites` 内に「continueは
  厳禁、御法度」という強い警告コメントがあり、同一画像の間断ないロードで表示が欠ける不具合の
  再発防止コードになっている。
- **`FrameMng.ts`** — `[add_frame]` で HTML(`iframe`) を PixiJS キャンバスに重ねて表示する。
  DOM 操作が主体で PixiJS 描画には乗らない唯一のレイヤ。
- **`CmnTween.ts`** — アニメーション層。`@tweenjs/tween.js` から `motion` ライブラリへ移行した
  薄いラッパー `Tw` クラス。`tween()` 内に「同名トゥイーンの二重起動対策は bluesnovel
  `ScriptMng.ts:764` で先に直された不具合の移植」という姉妹プロジェクトへの直接参照がある。
- **`HintPos.ts`** — `[button hint=]`/`[link hint=]` のツールチップ位置計算。`@popperjs/core`
  代替の自前実装で、実サンプル（`../tmp_esm_uc/doc/prj/script/sub.sn`）が popper 形式JSONを
  渡してくるため互換解釈するが「任意モディファイアの完全互換は狙わない」と明記されている。

### 「ページ」は2つの別物を指す（罠）

本家由来の語彙の罠。bluesnovel でも同型の構造が確認できる。

- **レイヤページ (fore/back)** — `Pages.ts` が実体を持つ。`[lay page=]`/`[trans]`/`[er]` が
  操作する。コード上は `hArg.page` 属性で表裏を選択。
- **テキストページ（改ページ・履歴ログの単位）** — `Log.pagebreak()`/`TxtLayer.pageText`/
  `LayerMng` の組込変数 `const.sn.last_page_text` が指す「現在表示中の文章ひとかたまり」。

両者は無関係だが、`#er` の `rec_page_break` 属性名や `#clear_lay` の `page=both` 実装コメント
「改ページ」など、fore/back 操作の文脈で「改ページ」という語が使われる箇所があり、読み手が
混同しうる構造が残っている。触るときはどちらを指しているか必ず明示すること。

## 音声・入力層

- **`SoundMng.ts`** — 音声タグ（`playbgm`/`playse`/`fadebgm`/`ws`/`wf`等）を `hTag` に登録する
  ファサード。`{[buf]: SndBuf}` のマップを保持し、状態機械は持たず `SndBuf` へ委譲する。
  `#stop_allse()` に「howler時代と違い ctx ごと閉じて作り直す事はしない（iOS/Safariで ctx が
  ずっと suspended のままになるのを避けるため）」という設計理由コメントがある。
- **`SndBuf.ts`**（howler撤去に伴う新設、541行）— 1バッファ＝1インスタンスの状態機械
  （`StLoading`→`StPlaying`/`StWaitingStop`/`StFade`/`StWaitingFade`→`StStop` の6状態）を持つ
  中核クラス。**停止＝破棄**が徹底されており、`stopse()` はどの状態からでも最終的に
  `StStop` へ遷移してノード/タイマーを解放する。待ち合わせ（`[ws]`/`[wf]`等）は `SndBuf`
  （各状態クラス）が持ち、`Reading.beginProc`/`notifyEndProc` と連携する。冒頭コメントに
  howler撤去時に直した不具合が列挙されている：`[xchgbuf]` 後の自然終了で古い buf 名を倒す
  バグ、`[wf]` 待機中の自然終了でスクリプトが永久停止するバグ、フェード停止時に `StStop` が
  二重構築されるバグ、`[fadese] delay` 属性が未実装で死んでいた点など。
- **`SndCtx.ts`**（新設）— プロセスに1つの `AudioContext` とマスタ `GainNode` を持つ static
  専用クラス。状態機械や待ち合わせは持たず「鳴らす土台」に専念する。`SoundMng` の寿命
  （Main ごと作り直し）に縛らない理由は「作り直しのたびに ctx が増えて Chrome の上限6件に
  当たるため」。`decode()` はデコード済み `AudioBuffer` の Promise キャッシュを持ち、複数の
  `AudioBufferSourceNode` から同時参照できる（本家に無い改善、とコメントされている）。
- **`EventMng.ts`** — マウス/タッチ（TinyGesture）、キーボード、ホイール、ダークモード・
  言語変更、DOM要素イベントなど UI 入力全般を `Reading.fire()` へ橋渡しするハブ。
  `FocusMng`・`GamepadMng` を生成・起動する初期化のハブでもある。
- **`EventListenerCtn.ts`** — DOM/PixiJS イベントリスナのリーク対策用ラッパー。`add()` が
  返す解除関数で個別解除でき、`clear()` で一括解除する。
- **`FocusMng.ts`** — フォーカス移動（Tab様のnext/prev）、キーボード操作、input type別の
  挙動を実装。表示ツリーから外れた要素を自動的に間引く `#isAlive()` を持つ。
- **`GamepadMng.ts`** — 素の Gamepad API を `requestAnimationFrame` でポーリングする自前実装
  （移植元 bluesnovel）。元は `gamepad.js` ライブラリだったが「型未同梱・rAFループ停止漏れ・
  window の 'error' リスナ解除漏れ」という落とし穴のため置換。ボタン割り当ては本家互換を
  優先し bluesnovel 側の変更は不採用（`TODO.md` 参照コメントあり）。
- **`Button.ts`** — 画像ボタン（3分割テクスチャで normal/hover/clicked 切替）とテキスト
  ボタンを実装。クリック/ホバー配線は `EventMng.button()` に委譲する。
- **`DebugMng.ts`/`DevToolsGuard.ts`** — `DebugMng` は `[log]`/`[trace]` タグとエラー表示を
  担う。`DevToolsGuard` は `devtools-detect` ライブラリの自前実装（移植元 bluesnovel）。
  削除理由は「作者(sindresorhus)自身が2026-05-12にリポジトリをアーカイブ、README冒頭に
  『多くの欠陥がある』と明記」。window の外寸-内寸差というヒューリスティックのため、
  別ウインドウ切り離し・モバイルでは検知できない限界も引き継いでいる。
- **`Hyphenation.ts`/`RubySpliter.ts`** — `Hyphenation` は行頭/行末禁則・分割禁止・ぶら下げの
  4文字集合を保持し、1文字ずつの矩形を見て自動改行位置を判定する。`RubySpliter` は独自ルビ
  記法（`｜文字《ルビ》`・傍点記法等）のパーサ。
- **`PropParser.ts`**（parsimmon撤去に伴い自前実装）— 独自の式言語（`&式`記法）のトークナイザ
  ＋ Pratt parser。トークン化の試行順は旧 parsimmon 版の `alt()` をそのまま踏襲しており
  （例：`"123abc"` は数値 `"123"` で止まり `abc` が余って構文エラーになる挙動も意図的に保持）、
  `¥`（整数除算）は変数名の文字クラスより先に判定する必要がある、といった移植時の注意点が
  コメントに残る。
- **`AnalyzeTagArg.ts`** — タグの属性文字列（`key=val|def` 形式）を正規表現1本でパースする。
  `PropParser` とは独立した別レイヤ（タグの属性トークン化 vs 式評価）。
- **`Log.ts`** — `[rec_ch]`/`[rec_r]` タグと既読ログ（バックログ）機能。
- **`htm2tx.ts`** — DOM（文字表示レイヤ）を canvas テクスチャへ変換するユーティリティ
  （`tsayen/dom-to-image` 由来のコードを TypeScript化）。
- **`localStore.ts`** — localStorage の薄いラッパー（`store.js` の代替。9年更新なし＋
  `json2.js` 内で `eval` 使用のため置換）。

## 姉妹プロジェクトとの関係

本リポジトリは「本家」（オリジナルのエンジン、PixiJS + クラスベース）で、
**`../bluesnovel`** はこれを React + zustand で書き直したフレームワーク。コード中に
`bluesnovel <file>:<line> の移植` という形のコメントが散在する箇所（`CmnTween.ts`・
`HintPos.ts`・`GamepadMng.ts`・`DevToolsGuard.ts`・`CmnLib.ts` 等）は、bluesnovel 側で
先に発見・修正された不具合や、bluesnovel 側で先に依存削減した実装をこちらへ移植した経緯を
示す。逆に本家側の設計判断（既読管理・howler撤去後の音声状態機械等）が bluesnovel の
`PITFALLS.md` に「2026-08 の skynovel_esm 調査で判明」として引用されている例もあり、
双方向に知見を融通し合っている。

## 参考資料

- **タグ仕様**: `docs/tag.html`（変数は `docs/dev.html`）。🟢実装済 / 🟡一部 / 🔴未実装の
  マークが「何が動くか」の唯一の情報源。
- **サンプルプロジェクト**: `../tmp_esm_uc/doc/prj/`（フルゲーム、本家形式）。詳細は
  [CLAUDE.md](../../CLAUDE.md) 参照。
