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
