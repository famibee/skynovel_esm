## [1.7.17](https://github.com/famibee/skynovel_esm/compare/v1.7.16...v1.7.17) (2025-11-27)


### Bug Fixes

* フォーカスを失った場合、ブラウザ版では globalThis（v1.7.14頃の動作）、アプリ版はメインCanvas にフォーカスを移動させるように ([abcce57](https://github.com/famibee/skynovel_esm/commit/abcce57b1c3e6088a5d9befb7db59d4d267368a9))

- fix: フォーカスを失った場合、ブラウザ版では globalThis（v1.7.14頃の動作）、アプリ版はメインCanvas にフォーカスを移動させるように


## [1.7.16](https://github.com/famibee/skynovel_esm/compare/v1.7.15...v1.7.16) (2025-11-26)


### Bug Fixes

* @typescript-eslint/restrict-template-expressions 無効化を使わないように ([ded25c2](https://github.com/famibee/skynovel_esm/commit/ded25c21de78a3046b37b6de1f5c378a732fc322))

- fix: @typescript-eslint/restrict-template-expressions 無効化を使わないように


## [1.7.15](https://github.com/famibee/skynovel_esm/compare/v1.7.14...v1.7.15) (2025-11-25)


### Bug Fixes

* **src/sn/FocusMng.ts:** フレームを非表示にした場合など、フォーカスを失った場合はメインキャンバスにフォーカスを移動させるように ([91a48f2](https://github.com/famibee/skynovel_esm/commit/91a48f2308af3acfc264698ac87ac3eba7b7c3be))

-fix(src/sn/FocusMng.ts): フレームを非表示にした場合など、フォーカスを失った場合はメインキャンバスにフォーカスを移動させるように


## [1.7.14](https://github.com/famibee/skynovel_esm/compare/v1.7.13...v1.7.14) (2025-11-24)


### Bug Fixes

* **src/sn/SndBuf.ts:** fade 系が機能していなかった件 ([ba7a0d7](https://github.com/famibee/skynovel_esm/commit/ba7a0d798eb1b90e12221ac370c3316d510e4916))

- fix(src/sn/SndBuf.ts): fade 系が機能していなかった件
- fix(src/sn/FrameMng.ts): [tsy_frame] を手直し


## [1.7.13](https://github.com/famibee/skynovel_esm/compare/v1.7.12...v1.7.13) (2025-11-22)


### Bug Fixes

* sys:const.sn.aPageLog が巨大になりすぎセーブデータを圧迫する件 ([dd6f5c0](https://github.com/famibee/skynovel_esm/commit/dd6f5c09cc88dc10059c145cd02f63d10b94e409))

- fix: sys:const.sn.aPageLog が巨大になりすぎセーブデータを圧迫する件
	- 内容は配列で、（一つの要素）.mark.hSave['const.sn.sLog'] が 5.9MB 程度のサイズになっていた。しかしページ移動処理・状態で無くてもいいモノだった。
		- 5.9MB x 64配列要素個だった。これを '[]'（4文字） x 配列要素個に。
	- たまにエラーが出ていた
		- Uncaught (in promise) QuotaExceededError: Failed to execute 'setItem' on 'Storage': Setting the value of ...


## [1.7.12](https://github.com/famibee/skynovel_esm/compare/v1.7.11...v1.7.12) (2025-11-21)


### Bug Fixes

* 特定のケースで音声再生終了イベントも発生しないため、タイマーで擬似的に発生させるように ([fdbd72c](https://github.com/famibee/skynovel_esm/commit/fdbd72cf4d75e5ff9b99b78363807e30fbd3b683))

- fix: 特定のケースで音声再生終了イベントも発生しないため、タイマーで擬似的に発生させるように
	- タブのミュート中や AudioContext.state === 'suspended' の場合は再生もされないので再生終了イベントも発生しない


## [1.7.11](https://github.com/famibee/skynovel_esm/compare/v1.7.10...v1.7.11) (2025-11-20)


### Bug Fixes

* **src/sn/SndBuf.ts:** 再生完了した際に、状態変化させていなかったケースがあった件 ([24b214e](https://github.com/famibee/skynovel_esm/commit/24b214edaf6a3d54d0a83eb08dd1b4b5c4c5f0c3))

- fix(src/sn/SndBuf.ts): 再生完了した際に、状態変化させていなかったケースがあった件


## [1.7.10](https://github.com/famibee/skynovel_esm/compare/v1.7.9...v1.7.10) (2025-11-16)


### Bug Fixes

* **src/sn/LayerMng.ts:** [quake] 後の [wq] で一度クリックしないと次へ進まない件 ([391e450](https://github.com/famibee/skynovel_esm/commit/391e45052c64f252d8ed6d3fc5dd13c7259b74ed))

- fix(src/sn/LayerMng.ts): [quake] 後の [wq] で一度クリックしないと次へ進まない件


## [1.7.9](https://github.com/famibee/skynovel_esm/compare/v1.7.8...v1.7.9) (2025-11-14)


### Bug Fixes

* **src/sn/Reading.ts:** 下キーなど押しっぱなしスキップが効かない件 ([48ad427](https://github.com/famibee/skynovel_esm/commit/48ad427f91ce45ff522b2015c2fc9ae1771ecd54))

- fix(src/sn/Reading.ts): 下キーなど押しっぱなしスキップが効かない件
	- v1.3.0 (2025-08-27)【SKYNovel cjs v1.62.0 相当更新】でのデグレード


## [1.7.8](https://github.com/famibee/skynovel_esm/compare/v1.7.7...v1.7.8) (2025-11-14)


### Bug Fixes

* **src/sn/ScriptIterator.ts:** Fスキップ時に処理の流れが狂う場合がある件 ([9a29406](https://github.com/famibee/skynovel_esm/commit/9a294065558618a3c080fa455799eeaa29631ace))

- fix(src/sn/ScriptIterator.ts): Fスキップ時に処理の流れが狂う場合がある件
	- スキップ時の [wt] で同期的にトランス終了させるよう
	- キー押しっぱなしスキップなどでの処理が動いていなかった
- fix(src/sn/Reading.ts): stopImmediatePropagation がないイベントへの対応
	- キーボードでボタン選択し、Enter 押下でエラーになっていた
- fix(src/sn/GrpLayer.ts, LayerMng.ts): pixi不具合対策
- fix(src/sn/SndBuf.ts): レア発生の不具合対応
- fix(src/sn/LayerMng.ts): [trans time=0] でのむやみな queueMicrotask などを削除
- fix: ESLint とにらめっこで型記述手直し
- docs: AIRNovel 時代からのコード、瀬戸愛羅さんの貢献（のごく一部）を明記


## [1.7.7](https://github.com/famibee/skynovel_esm/compare/v1.7.6...v1.7.7) (2025-11-08)


### Bug Fixes

* ESM版で [update_check] でアイコンが表示されなかった件を修正 ([b2c5874](https://github.com/famibee/skynovel_esm/commit/b2c58740f78ce6dca5ac20df096039670f67d8af))

- fix: ESM版で [update_check] でアイコンが表示されなかった件を修正
- fix: 手直し


## [1.7.6](https://github.com/famibee/skynovel_esm/compare/v1.7.5...v1.7.6) (2025-11-06)


### Bug Fixes

* アプリ版の「初回」ウインドウ初期値が 300x300 になる件 ([eb4b370](https://github.com/famibee/skynovel_esm/commit/eb4b370f182eedd6ff08d3b225d2984cf79090ee))

- fix: アプリ版の「初回」ウインドウ初期値が 300x300 になる件
- fix: アプリ版の「二回目」起動時にウインドウ位置が (0, 0) になる件
- fix: 初期化の流れをリファクタリング
	- 簡略化、不要変数削除、引数削除
	- ライブラリインポートの場所を集約増進
		- platform、CmnLib.init() に移動し Config.load() 内という初期で
		- Button も動的 import に
	- 型名を T_ 始まりに統一


## [1.7.5](https://github.com/famibee/skynovel_esm/compare/v1.7.4...v1.7.5) (2025-11-04)


### Bug Fixes

* 暗号化画像のロード処理が終了しない件 ([35518ff](https://github.com/famibee/skynovel_esm/commit/35518ff014c5325a508f58b3037f359880d0dd9a))

- fix: 暗号化画像のロード処理が終了しない件


## [1.7.4](https://github.com/famibee/skynovel_esm/compare/v1.7.3...v1.7.4) (2025-11-02)


### Bug Fixes

* 画像から生成するタイプの [button] を含む[trans]が終了しなくなる件 ([be4937d](https://github.com/famibee/skynovel_esm/commit/be4937d605712bca52cb96502b3aa2e9c9303e3c))

- fix: 画像から生成するタイプの [button] を含む[trans]が終了しなくなる件


## [1.7.3](https://github.com/famibee/skynovel_esm/compare/v1.7.2...v1.7.3) (2025-11-01)


### Bug Fixes

* semantic-release2 ([7f22f79](https://github.com/famibee/skynovel_esm/commit/7f22f79032d31f321708c3d439fb01b1728135bb))
* semantic-release3 ([1dd5f70](https://github.com/famibee/skynovel_esm/commit/1dd5f70d74cf6801f19991e23805f3e1f464528a))

## [1.7.2](https://github.com/famibee/skynovel_esm/compare/v1.7.1...v1.7.2) (2025-11-01)


### Bug Fixes

* semantic-release1 ([b339602](https://github.com/famibee/skynovel_esm/commit/b339602cf2224e8702d036a9102921c6a03d2d9b))

## [1.7.1](https://github.com/famibee/skynovel_esm/compare/v1.7.0...v1.7.1) (2025-11-01)


### Bug Fixes

* ライブラリ更新 ([9e6948d](https://github.com/famibee/skynovel_esm/commit/9e6948de7ad28831ad57042c1baad45cd2f15730))

# [1.7.0](https://github.com/famibee/skynovel_esm/compare/v1.6.10...v1.7.0) (2025-11-01)


### Features

* release.yml 手直し3、bun update 確認 ([38c9247](https://github.com/famibee/skynovel_esm/commit/38c9247ae27e4ed976afdefe09b0cf54c30ce9c1))

- feat: release.yml 手直し3、bun update 確認

：（試行錯誤中の過程に付き省略）


### Features

* release.yml 手直し2 ([29a2435](https://github.com/famibee/skynovel_esm/commit/29a2435c74e810a6f1edf768a74a24107d0826ac))

- feat: release.yml 手直し


## [1.5.20](https://github.com/famibee/skynovel_esm/compare/v1.5.19...v1.5.20) (2025-10-31)


：（試行錯誤中の過程に付き省略）


* npmjs でも bun publish できる？ ([d5b241d](https://github.com/famibee/skynovel_esm/commit/d5b241db779a13c38e285a80d66b7718b078dce1))

## [1.5.1](https://github.com/famibee/skynovel_esm/compare/v1.5.0...v1.5.1) (2025-10-31)


### Bug Fixes

* npmjs にも公開 ([3b6984b](https://github.com/famibee/skynovel_esm/commit/3b6984b47febf34abedd4d894c134bc4ab1af9b1))

- fix: npmjs にも公開


# [1.5.0](https://github.com/famibee/skynovel_esm/compare/v1.4.0...v1.5.0) (2025-10-31)


### Features

* release.yml 手直し ([119cfb2](https://github.com/famibee/skynovel_esm/commit/119cfb2784758f8f83ffb2a620f8411b1b7dff95))

- feat: release.yml 手直し
	- actions のバージョンアップ
	- npm Trusted Publishing で npm パッケージ公開に移行
	- secrets.NPM_TOKEN への依存削除
	- npmjs へのリリースが止まっていたのを回復（cjs版のみ）
	- GitHub ActionsのSHA Pinを行った
		- また、GitHubリポジトリの"Require actions to be pinned to a full-length commit SHA”を有効に
	- actions/setup-nodeで cache
	- node_modulesで cache
- fix: その他細かい手直し


# [1.4.0](https://github.com/famibee/skynovel_esm/compare/v1.3.4...v1.4.0) (2025-10-28)


### Features

* ESLint 導入、一部指摘無効化しつつも全ソースクリンナップ完了 ([bb27d26](https://github.com/famibee/skynovel_esm/commit/bb27d26173f07df73d1a4abe446ca05a3f21e73d))

- feat: ESLint 導入、一部指摘無効化しつつも全ソースクリンナップ完了
	- @eslint/js: configs.recommended
	- typescript-eslint: configs.strictTypeChecked
	- typescript-eslint: configs.stylisticTypeChecked
	- jest.configs['flat/recommended']
	- plgImport.flatConfigs.recommended
	- plgImport.flatConfigs.typescript
- fix: セーブデータ関連の処理を手直し。型宣言厳密化、修正
- fix: 使い回す定数オブジェクトはファクトリメソッドで
	- なんらかの理由で定数が変更されたりディープコピーに弱かったりするため
- fix: async / await 関連の手直し
- feat: 再生開始時に sys:const.sn.sound.【buf】.volume（サウンドバッファの目標音量）がなければデフォルト値 1 で追加するように
- fix: src/appMain.ts の csj/ESM 共通点を src/appMain_cmn.ts に抽出
- fix: 履歴関係の手直し、src/sn/Log.ts に抽出
- fix: その他細かい手直し
- test: ギャラリーで一通り動作確認


## [1.3.4](https://github.com/famibee/skynovel_esm/compare/v1.3.3...v1.3.4) (2025-09-20)


### Bug Fixes

* [wait_tsy] の chk_exist_tw 属性を廃止 ([e511cf1](https://github.com/famibee/skynovel_esm/commit/e511cf122e924e806befc6255d1e9b1fac4aaf83))

- fix: [wait_tsy] の chk_exist_tw 属性を廃止
	- [tsy]〜文字表示＆待ち＋[wait_tsy chk_exist_tw=true] という状況で、[tsy]のアニメが先に終り文字表示がゆっくり終了した場合、必ずエラーになってしまうため。


## [1.3.3](https://github.com/famibee/skynovel_esm/compare/v1.3.2...v1.3.3) (2025-09-13)


### Bug Fixes

* クラス import に影響が出ていた定数の記述を EventMng -> CmnLib に変更 ([168ddca](https://github.com/famibee/skynovel_esm/commit/168ddca11c364ee22f99d6c59d600303de5ea713))

- fix: クラス import に影響が出ていた定数の記述を EventMng -> CmnLib に変更
- fix: プラグイン初期化時に await が抜けていたのを修正


## [1.3.2](https://github.com/famibee/skynovel_esm/compare/v1.3.1...v1.3.2) (2025-08-31)


### Bug Fixes

* **src/sn/EventMng.ts:** 下矢印キーでの読み進めで一度しか効かず、読み進められない件 ([b9f0312](https://github.com/famibee/skynovel_esm/commit/b9f0312be97009402e5bbc2eb0ba2cf25e80283f))

- fix(src/sn/EventMng.ts): 下矢印キーでの読み進めで一度しか効かず、読み進められない件
	- イベントダブリ弾き機構のミス。
- fix(src/sn/EventMng.ts): 矢印キー押下時にページが移動するので preventDefault() を行うように
-fix: SKYNovel cjs v1.62.1 相当更新


## [1.3.1](https://github.com/famibee/skynovel_esm/compare/v1.3.0...v1.3.1) (2025-08-28)


### Bug Fixes

* ビルド ([6333c9d](https://github.com/famibee/skynovel_esm/commit/6333c9dc141ffd6c129102e54e7e0f60f2b4d78d))
* ビルド2 ([0b85893](https://github.com/famibee/skynovel_esm/commit/0b85893e410bf1bfa083da53f0df33b4a5621748))

# [1.3.0](https://github.com/famibee/skynovel_esm/compare/v1.2.4...v1.3.0) (2025-08-27)


### Features

* SKYNovel cjs v1.62.0 相当更新 ([ab85d58](https://github.com/famibee/skynovel_esm/commit/ab85d58335c26aa859af8b39bad46f2768b3b166))

-feat: SKYNovel cjs v1.62.0 相当更新


## [1.2.4](https://github.com/famibee/skynovel_esm/compare/v1.2.3...v1.2.4) (2025-07-20)


### Bug Fixes

* **src/sn/TxtLayer.ts:** 文字レイヤ背景の単色塗りに b_alpha が効かなかった件 ([7f12b82](https://github.com/famibee/skynovel_esm/commit/7f12b82931650d69e8082060f6126ce344201b3f))
* **src/sn/TxtLayer.ts:** 文字レイヤ背景の単色塗りに b_alpha が効かなかった件2 ([7590028](https://github.com/famibee/skynovel_esm/commit/75900288dd8f2d4fb5c9f15e605b30aaa25f3b3f))

-fix(src/sn/TxtLayer.ts): 文字レイヤ背景の単色塗りに b_alpha が効かなかった件


## [1.2.3](https://github.com/famibee/skynovel_esm/compare/v1.2.2...v1.2.3) (2025-07-14)


### Bug Fixes

* SKYNovel cjs v1.61.22 相当更新 ([30a3d3d](https://github.com/famibee/skynovel_esm/commit/30a3d3d7368c41f238e6b71c1abc3a50cf16e1dd))

-fix: SKYNovel cjs v1.61.22 相当更新
-fix(src/appMain.ts): win版でウインドウ右部分に空白ができてしまう件
-fix(src/appMain.ts): 終了→再度アプリ起動でウインドウ位置とサイズが復帰しない件
-fix(src/sn/CmnLib.ts, src/appMain.ts): mainプロセスで platform によるOS=windows判定が失敗するようになっていた件
-fix(src/appMain.ts): ウインドウイベント関係の初期化シーケンス処理を整理・修正
-fix(src/appMain.ts): Electron API 不具合の対処療法（後者はどうしようもない）
	- ウインドウ右辺をクリックするだけで nh が縦に短くなる件
	- ウインドウ下辺を変更しても、ContentSizeやSizeのhが変化しない件


## [1.2.2](https://github.com/famibee/skynovel_esm/compare/v1.2.1...v1.2.2) (2025-07-12)


### Bug Fixes

* [update_check] 前回修正でデータが main -> render 間で受け渡せてなかった件 ([c7372c7](https://github.com/famibee/skynovel_esm/commit/c7372c748226ff7b683d6b48a7453ced61d15dcf))

- fix: [update_check] 前回修正でデータが main -> render 間で受け渡せてなかった件


## [1.2.1](https://github.com/famibee/skynovel_esm/compare/v1.2.0...v1.2.1) (2025-07-12)


### Bug Fixes

* [update_check] で CSP(Content Security Policy) エラーになるため、この処理での fetch だけ Main process で行うように ([d79c5ef](https://github.com/famibee/skynovel_esm/commit/d79c5efae3b7cd29fb02aa06961b976bdfe1489f))
* [update_check] で CSP(その二) ([11dca8c](https://github.com/famibee/skynovel_esm/commit/11dca8c677878989021433b166f0730ceb371447))

- fix: [update_check] で CSP(Content Security Policy) エラーになるため、この処理での fetch だけ Main process で行うように
	- (非ESM ver 1.61.21 相当)


# [1.2.0](https://github.com/famibee/skynovel_esm/compare/v1.1.0...v1.2.0) (2025-07-02)


### Features

* ひとまずリリース ([881bd62](https://github.com/famibee/skynovel_esm/commit/881bd629e551867a72bbd7f6b6b0d866c85eb8f0))
* リファクタリング：forEach 削除（for や for of に変更） ([d906a5d](https://github.com/famibee/skynovel_esm/commit/d906a5d8eda7f5e3b245453342486db7b337c78b))
* 一文中の[l]後〜次の[l]でクリック待ちが表示されず、ワンクリックして表示される場合がある件 ([38f85cf](https://github.com/famibee/skynovel_esm/commit/38f85cf73c7d7cbf27415e4cc2c5c5c9828dddd5))
* 画像表示でキャッシュの掛かり方によって表示されなくなる件 ([07761b6](https://github.com/famibee/skynovel_esm/commit/07761b66bbfc9a9d7e536c88e70b1142d01060b9))


## v1.61.21
- fix: 画像表示でキャッシュの掛かり方によって表示されなくなる件
	- 立ち絵の差分が一部表示されない事がある件
	- 1.61.7 (2024-12-15) 付近でデグレード
## v1.61.20
- fix: 一文中の[l]後〜次の[l]でクリック待ちが表示されず、ワンクリックして表示される場合がある件
- fix: [ch_in_style][ch_out_style] に name属性に使えない文字を追加
	- 正規表現は /[{\s\.,*\{]/
- perf: 正規表現見直し
- perf: 文字表示時処理の見直し
- fix: ライブラリ更新
	- Electron 37.0.0 (Stable)
	- vite v7.0.0
## v1.61.19 動作確認（2025-06-20）
	- BGMが冒頭で鳴ってる
	- 本文へ行く
	- appMain に TODO が残ってる？
	- DevTools 対策
## v1.61.19 相当に更新（2025-05-11）
## v1.61.8 (2024-12-17)
- 全クラス含有し、web版でタイトル画面表示まで
	- BGMが冒頭で鳴らない？
	- （いつの間にか直った）ボタンクリックで妙な間？
	- 本文へ行かず停止、画面黒のまま。リロードしても同様
		- リロード -> ESC押しっぱなしでタイトルへ戻るので、暴走ではない
	- ぜんぶ @tweenjs/tween.js@25.0.0 のせいだった。 @23.1.3 に戻せば動いた。
	- 後々 useTween を使うようになるかもなのでこのままで。
- electron-store は v8.2.0 止まりで。v9.0.0・v10.0.0 で「window.」が含まれており、アプリ版でエラーになる。
	- v1.53.13 の頃にも
## v1.61.6 (2024-11-23)
- Initial commit
- 非 EMS SKYNovel 1.61.6 (2024-11-16) 版相当
