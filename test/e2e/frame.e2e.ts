/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// FrameMng.ts の#set_frame()：[frame disabled=]反映がinput/selectのみでbutton要素が
//	抜けていた不具合（bluesnovel側27034c0で先に発覚・修正）の回帰確認。
//	iframe内の実DOMを見る必要があるためブラウザでしか確かめられない

import {test, expect} from '@playwright/test';
import {gotoSn, waitMes, waitStop} from './snPage';

// clickNext()の既定クリック位置(10, 10)はiframe(#yesno)の直下に重なりpointer-eventsを
//	奪われるため、ここだけiframeの外（右下）を狙って進める
async function clickNextAway(page: import('@playwright/test').Page) {
	await waitStop(page);
	await page.locator('#skynovel_act').click({position: {x: 620, y: 460}});
}

test('[frame disabled=true]でフレーム内のbutton要素もdisabledになる', async ({page})=> {
	await gotoSn(page, 'frame');
	await waitMes(page, 'よみこんだ');

	const btnDisabled = ()=> page.frameLocator('#yesno').locator('#btn').isDisabled();
	expect(await btnDisabled()).toBe(false);

	await clickNextAway(page);
	await waitMes(page, 'むこうにした');
	expect(await btnDisabled()).toBe(true);

	await clickNextAway(page);
	await waitMes(page, 'もどした');
	expect(await btnDisabled()).toBe(false);
});

test('別フレームに前面から覆われている間、[frame disabled=]無しでも自動でフォーカスの輪から外れる', async ({page})=> {
	await gotoSn(page, 'frame');
	await waitMes(page, 'よみこんだ');

	const activeYesnoId = ()=> page.evaluate(
		()=> (document.getElementById('yesno') as HTMLIFrameElement)
			.contentDocument?.activeElement?.id || null);

	await clickNextAway(page);
	await waitMes(page, 'むこうにした');
	await clickNextAway(page);
	await waitMes(page, 'もどした');
	await clickNextAway(page);
	await waitMes(page, 'とれた');

	// 覆われる前：[set_focus to=next]でyesnoフレーム内のbtnへ届く
	expect(await activeYesnoId()).toBe('btn');

	await clickNextAway(page);
	await waitMes(page, 'おおった');	// coverフレームがyesnoの手前(float=true)に重なる
	await clickNextAway(page);
	await waitMes(page, 'かくれた');

	// 覆われている間：[set_focus to=next]してもyesno:#btnへは届かない（輪から外れる）
	expect(await activeYesnoId()).toBeNull();

	await clickNextAway(page);
	await waitMes(page, 'もどってきた');	// coverを隠すと再びyesno側へ届くようになる

	expect(await activeYesnoId()).toBe('btn');
});
