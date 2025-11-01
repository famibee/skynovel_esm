## [1.6.9](https://github.com/famibee/skynovel_esm/compare/v1.6.8...v1.6.9) (2025-11-01)


### Bug Fixes

* updateできない11-2c一本化の試み2 ([ba34cd7](https://github.com/famibee/skynovel_esm/commit/ba34cd78a692dc17aff5ab2efad6a9b5d3ad66e1))

## [1.6.8](https://github.com/famibee/skynovel_esm/compare/v1.6.7...v1.6.8) (2025-11-01)


### Bug Fixes

* updateできない11-2c一本化の試み1 ([523087f](https://github.com/famibee/skynovel_esm/commit/523087fe08a19066e87d3546cac658deeea83865))

## [1.6.7](https://github.com/famibee/skynovel_esm/compare/v1.6.6...v1.6.7) (2025-11-01)


### Bug Fixes

* updateできない11-2b ([d604f22](https://github.com/famibee/skynovel_esm/commit/d604f22ab2615b9303188ceebf67527a6c9a33e4))

## [1.6.6](https://github.com/famibee/skynovel_esm/compare/v1.6.5...v1.6.6) (2025-11-01)


### Bug Fixes

* updateできない11-2a ([facb9a1](https://github.com/famibee/skynovel_esm/commit/facb9a14d43256af461a311289680f04e992da99))

## [1.6.5](https://github.com/famibee/skynovel_esm/compare/v1.6.4...v1.6.5) (2025-11-01)


### Bug Fixes

* updateできない11-1 ([830401e](https://github.com/famibee/skynovel_esm/commit/830401e99370ebc38c0860216bda80f264563147))
* updateできない11-1b ([9d6ba09](https://github.com/famibee/skynovel_esm/commit/9d6ba09f92d437bcb235b2bb30f08c8ce1e16a2f))
* updateできない11-1c ([dcf17b0](https://github.com/famibee/skynovel_esm/commit/dcf17b07f982cdfa2ad337d36cb7f87ed0d82bec))
* updateできない11-1d ([2dd41e3](https://github.com/famibee/skynovel_esm/commit/2dd41e3030a59fad182b9fe738cfa8aa41285882))

## [1.6.4](https://github.com/famibee/skynovel_esm/compare/v1.6.3...v1.6.4) (2025-10-31)


### Bug Fixes

* updateできない5 ([c495750](https://github.com/famibee/skynovel_esm/commit/c4957509613ba06b626ab102ee6fe222839d25a2))

## [1.6.3](https://github.com/famibee/skynovel_esm/compare/v1.6.2...v1.6.3) (2025-10-31)


### Bug Fixes

* updateできない4 ([07d6dc0](https://github.com/famibee/skynovel_esm/commit/07d6dc038d610da810f9b2cc7a51765933787b7d))

## [1.6.2](https://github.com/famibee/skynovel_esm/compare/v1.6.1...v1.6.2) (2025-10-31)


### Bug Fixes

* updateできない3 ([87eed6b](https://github.com/famibee/skynovel_esm/commit/87eed6b4f9eadb2fceb52c889c50a6abb3ffaac0))

## [1.6.1](https://github.com/famibee/skynovel_esm/compare/v1.6.0...v1.6.1) (2025-10-31)


### Bug Fixes

* updateできない1 ([ae0eb9c](https://github.com/famibee/skynovel_esm/commit/ae0eb9c1d087f0daad6d9c6113ae94098d5ac085))
* updateできない2 ([2766b65](https://github.com/famibee/skynovel_esm/commit/2766b652b733f83be5eb8462de19e42119f78764))

# [1.6.0](https://github.com/famibee/skynovel_esm/compare/v1.5.20...v1.6.0) (2025-10-31)


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
