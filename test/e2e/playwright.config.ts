/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// ブラウザUIテスト（E2E）設定。ユニットテスト（bun test）とは完全に分離する。
//	webServerオプションで vite dev サーバーの起動・待受・終了まで Playwright に任せるため、
//	開発者が事前にサーバーを起動しておく必要はない。

import {defineConfig, devices} from '@playwright/test';
import {fileURLToPath} from 'node:url';

// E2E専用ポート。viteの既定(5173)やその繰り上がりは他プロジェクトのdevサーバーが
//	居座っている事があり、そちらを掴むと「別のアプリを叩いて全部落ちる」ため意図的に離す。
//	bluesnovel が 5199 を使うので、同時に走らせても衝突しない番号にする
const PORT = 5198;
const BASE = `http://localhost:${String(PORT)}`;

// リポジトリルート。viteのルート（＝配信の基点）をここへ固定する
const ROOT = fileURLToPath(new URL('../../', import.meta.url));

export default defineConfig({
	testDir	: '.',	// この設定ファイルと同じ階層（test/e2e/）
	// bun test は *.test.ts を自動で拾ってしまうため、E2Eは *.e2e.ts 命名で棲み分ける
	testMatch	: '**/*.e2e.ts',
	// 失敗時のスクショ等の出力先。明示しないとカレント（＝リポジトリルート）が散らかる
	outputDir	: fileURLToPath(new URL('./test-results/', import.meta.url)),

	// リーク検査は「計装カウンタの増減」を見るため、1テスト＝1ページで完結させる。
	//	並列でも別コンテキストなので干渉しない
	fullyParallel	: true,
	forbidOnly		: Boolean(process.env.CI),
	retries			: process.env.CI ? 2 : 0,
	reporter		: process.env.CI ? 'github' : 'list',

	use	: {
		baseURL	: BASE,
		trace	: 'on-first-retry',
	},

	projects	: [{name: 'chromium', use: {...devices['Desktop Chrome']}}],

	webServer	: {
		// viteのルートはリポジトリルート、テストページは /test/e2e/app/index.html
		command				: `bunx vite --port ${String(PORT)} --strictPort`,
		cwd					: ROOT,
		url					: `${BASE}/test/e2e/app/index.html`,
		// 既存サーバーの再利用はしない：他プロジェクトのdevサーバーを掴む事故を防ぐ。
		//	ポートが塞がっていれば --strictPort が即エラーで知らせてくれる
		reuseExistingServer	: false,
		stdout				: 'pipe',
		stderr				: 'pipe',
		timeout				: 120_000,
	},
});
