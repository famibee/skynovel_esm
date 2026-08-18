/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// リソースリークの回帰テスト（シナリオ：test/e2e/app/prj_leak/main.sn）。
//	見るのは常に「同じ操作を繰り返しても生存数が増えないこと」。
//	絶対値は PixiJS の Ticker 等で変わるので当てにしない。
//	計装の仕組みと限界は test/e2e/app/probe.ts の冒頭に書いてある。

import {expect, test} from '@playwright/test';
import {clickNext, countLsn, gotoSn, mesStr, sndLive, waitMes} from './snPage';

test.describe('SndBuf（SndBuf.live）', ()=> {
	// ロード完了前に停止が入る競合を確実に起こすため、音声の応答を遅らせる。
	//	即座にロードが終わると StPlaying から停止する経路になり、
	//	直す前のコードでも SndBuf が unload されてしまって差が出ない
	test.beforeEach(async ({page})=> {
		await page.route('**/*.wav', async route=> {
			await new Promise(re=> setTimeout(re, 400));
			await route.continue();
		});
	});

	test('ロード中に停止を繰り返しても SndBuf が残らない', async ({page})=> {
		await gotoSn(page);
		expect(await sndLive(page)).toBe(0);

		// [playse]×6 と [stopse]。すべてロード中に停止される
		await clickNext(page);
		await waitMes(page, 'おと。');

		// 遅延させた分のロードが片付くのを待つ。直っていなければ、
		// ここで6件が SndBuf.live に残ったままになる
		await expect.poll(()=> sndLive(page), {timeout: 10_000}).toBe(0);
	});
});


test.describe('EventMng（dom= イベント）', ()=> {
	test('登録と削除を繰り返してもリスナが積み上がらない', async ({page})=> {
		await gotoSn(page);
		const base = await countLsn(page, {sel: '#dom-a'});
		expect(base).toBe(0);

		await clickNext(page);
		await waitMes(page, 'おと。');
		await clickNext(page);
		await waitMes(page, 'どむ。');

		// [event]→[del]を3往復。直す前は #elc から外れず、click(pointerdown 相当の
		//	'click')と keydown が3組ずつ残っていた
		expect(await countLsn(page, {sel: '#dom-a'}, 'click')).toBe(0);

		// 残る2件は [event] が自動で行うフォーカス登録（EventMng#event → #fcs.add）の
		//	focus と keydown。[event del]では外れないが、#fcs.add は要素で重複を弾くので
		//	3往復しても1組のまま＝際限なく増えるリークではない
		expect(await countLsn(page, {sel: '#dom-a'})).toBe(2);
		expect(await countLsn(page, {sel: '#dom-a'}, 'focus')).toBe(1);
	});
});


test.describe('Main の破棄', ()=> {
	test('作り直しても document のリスナが増え続けない', async ({page})=> {
		await gotoSn(page);
		const base = await countLsn(page, {sel: 'document'});
		expect(base).toBeGreaterThan(0);

		for (let i = 0; i < 3; ++i) {
			await page.locator('#reload').click();
			await waitMes(page, 'はじめ。');
		}

		// EventMng/Reading/SysBase が #elc.clear() で外すので、作り直しても同数のはず
		expect(await countLsn(page, {sel: 'document'})).toBe(base);
		expect(await mesStr(page)).toBe('はじめ。');
	});
});
