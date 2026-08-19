/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// EventMng.ts の#tgが張るTinyGesture（tap/longpress/panend/swipeleft/right/up/down）の
//	発火経路を検査する。TODO.md「tinygesture依存の削減」の置き換え作業に入る前の回帰確認用に
//	追加した（着手前は専用のテストが無く、置き換えの安全網が無かった）。
//	マウスのdown/move/upだけで模擬する（PlaywrightはCDP経由でネイティブイベントを発行するため、
//	TinyGestureのmousedown（要素）/mousemove・mouseup（document）リスナーがそのまま反応する）

import {test, type Page} from '@playwright/test';
import {gotoSn, waitMes, waitStop} from './snPage';

// 稼働中のキャンバス中心（ビューポート座標）。#skynovel_act は稼働中のみ存在する
//	（#skynovel は破棄時に差し戻すクローン。snPage.ts の clickNext() 参照）
async function cvsCenter(page: Page) {
	const box = await page.locator('#skynovel_act').boundingBox();
	if (! box) throw new Error('#skynovel_act が見つかりません');
	return {x: box.x + box.width / 2, y: box.y + box.height / 2};
}

// スワイプ判定の閾値（tinygesture既定の辺の15%／EventMng.tsのdisregardVelocityThreshold）は
//	ビューポート寸法に依存するので、余裕を持って動かせる大きさを確保する
test.use({viewport: {width: 1200, height: 900}});

test('tapでイベントが発火する', async ({page})=> {
	await gotoSn(page, 'gesture');
	const {x, y} = await cvsCenter(page);

	await page.mouse.click(x, y);
	await waitMes(page, 'OKtap');
});

test('longpressでイベントが発火し、直後のクリックもpanendで正しく効く', async ({page})=> {
	await gotoSn(page, 'gesture');
	const {x, y} = await cvsCenter(page);

	await page.mouse.move(x, y);
	await page.mouse.down();
	// tinygesture既定のlongPressTime（500ms）を超えるまで動かさず待つ
	await page.waitForTimeout(700);
	await page.mouse.up();
	await waitMes(page, 'OKlongpress');

	// panend検証：longpressで立つpressedフラグ（EventMng.ts）がpanendで正しく落ちないと
	//	直後のクリック（tap）が握り潰され、[p]から先へ進めない。
	//	ただし tinygesture の doubleTapTime（既定300ms）以内に連打すると、この2回目のクリックが
	//	'tap'ではなく'doubletap'（EventMng.tsは未使用）として扱われてしまい、pressedとは無関係に
	//	発火しなくなる。それを避けるためだけの間を空ける（本題のpanend検証とは別の待ち）
	await waitStop(page);
	await page.waitForTimeout(350);
	await page.mouse.click(x, y);
	await waitMes(page, 'つぎへ。');
});

for (const [dir, mes, dx, dy] of [
	['swipeleft',  'OKswipeleft',  -350, 0] as const,
	['swiperight', 'OKswiperight',  350, 0] as const,
	['swipeup',    'OKswipeup',    0, -350] as const,
	['swipedown',  'OKswipedown',  0,  350] as const,
]) {
	test(`${dir}でイベントが発火する`, async ({page})=> {
		await gotoSn(page, 'gesture');
		const {x, y} = await cvsCenter(page);

		await page.mouse.move(x, y);
		await page.mouse.down();
		await page.mouse.move(x + dx, y + dy, {steps: 10});
		await page.mouse.up();
		await waitMes(page, mes);
	});
}
