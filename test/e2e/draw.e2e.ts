/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 文字演出・バック単色（シナリオ：test/e2e/app/prj_draw/main.sn）。
//	/simplify 本家スイープ 第3〜4弾の実機確認：
//		・TxtStage.#defChStyle … [ch_in_style]/[ch_out_style] の共通化。格納先が別ハッシュか、
//		  join の既定（in=true / out=false）、重複名チェックが効くか
//		・TxtLayer.#pctOrPx … addStyle() で <head> へ注入される @keyframes の translate 量が
//		  「頭が '=' なら %、でなければ px」になっているか
//		・TxtLayer.#remakeBackColor … [lay b_color=] と Back.Alpha 変更でバック矩形を作り直す
//		  経路を通ってもシナリオが停止しない（pixi Graphics なので DOM では見えない＝進行で確認）

import {expect, test} from '@playwright/test';
import {chStyle, clickNext, gotoSn, headStyleText, mesStr, waitMes} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'draw')});


test.describe('[ch_in_style]/[ch_out_style]（#defChStyle）', ()=> {
	test('in と out は別ハッシュに入り、join の既定が in=true / out=false', async ({page})=> {
		const ci = await chStyle(page, 'in', 'e2e_in');
		expect(ci?.wait).toBe(400);
		expect(ci?.rotate).toBe(30);
		expect(ci?.join).toBe(true);		// in の既定
		expect(ci?.nx).toBe(1.5);

		const co = await chStyle(page, 'out', 'e2e_out');
		expect(co?.wait).toBe(350);
		expect(co?.join).toBe(false);		// out の既定

		const coj = await chStyle(page, 'out', 'e2e_out_join');
		expect(coj?.join).toBe(true);		// join=true を明示したぶん

		// 別ハッシュなので、in の名前で out を引いても出てこない（逆も）
		expect(await chStyle(page, 'out', 'e2e_in')).toBeFalsy();
		expect(await chStyle(page, 'in', 'e2e_out')).toBeFalsy();

		// 最初から定義済みの default も両方に居る
		expect((await chStyle(page, 'in', 'default'))?.join).toBe(true);
		expect((await chStyle(page, 'out', 'default'))?.join).toBe(false);
	});

	test('同名の再定義は #defChStyle の重複チェックで弾かれる', async ({page})=> {
		const errs: string[] = [];
		page.on('console', m=> {if (m.type() === 'error') errs.push(m.text())});

		await waitMes(page, 'ていぎ。');
		// *dup へ飛ぶと [ch_in_style name=e2e_in]（再定義）で例外→停止し、NGdup。には着かない
		await page.evaluate(()=> {(<any>globalThis).__sn.jump('*dup')});

		await expect.poll(()=> errs.join('\n'), {timeout: 5_000}).toContain('e2e_in');
		expect(await mesStr(page)).not.toContain('NGdup');
	});
});


test.describe('#pctOrPx（addStyle の @keyframes）', ()=> {
	test("x='=1.5' は 150%、y=-40 は -40px、未指定 y は 0%", async ({page})=> {
		const css = await headStyleText(page);

		// e2e_in: from に translate(150%, -40px)（'=' 付き→比率%、素の数値→px）
		expect(css).toMatch(/@keyframes sn_ch_in_e2e_in\s*\{[\s\S]*?translate\(150%, -40px\)/);
		// e2e_out: x=-25（px）, y 未指定→'=0'→0%
		expect(css).toMatch(/@keyframes go_ch_out_e2e_out\s*\{[\s\S]*?translate\(-25px, 0%\)/);
	});
});


test.describe('[lay b_color=]（#remakeBackColor）', ()=> {
	test('b_color → Back.Alpha 変更 → back_clear の経路を通ってもシナリオが止まらない', async ({page})=> {
		await waitMes(page, 'ていぎ。');

		await clickNext(page);	// [lay b_color=0xcc2244 b_alpha=1] → あか。[p]
		await waitMes(page, 'あか。');

		await clickNext(page);	// [let sys:TextLayer.Back.Alpha=0.3]（chgBackAlpha→#remakeBackColor）→ うすく。[p]
		await waitMes(page, 'うすく。');

		await clickNext(page);	// [lay back_clear=true] → けした。[s]
		await waitMes(page, 'けした。');
	});
});
