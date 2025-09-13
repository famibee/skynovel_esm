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
