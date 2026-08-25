/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// トゥイーン（シナリオ：test/e2e/app/prj_tsy/main.sn）。
//	[tsy]/[wait_tsy]/[stop_tsy]/[trans]/[wt]が「実際に時間をかけて値を動かし、
//	その間シナリオを正しく止める／進める」ことを見る：
//		・[tsy]の途中経過が組み込み変数（const.sn.lay.*）へ反映されること
//		・相対指定（x='=100'）が現在値に足されること
//		・[stop_tsy]／[wait_tsy]中のクリックが、必ず終了状態へ送ること
//		・path=（経路）が区間を順に辿り、chain=が他トゥイーンの終了に繋がること
//	加えて、CmnTween の追跡レジストリ（#hTwInf）に登録漏れが残っていないかも見る：
//		・motion移行でCmnTween側の自己再帰rAFループが無くなった（各アニメが自走する）ため、
//		  rafPending による reloadMain 前後の多重化検知が使えなくなった。代わりに
//		  CmnTween.liveCount（[tsy]/[trans]共通の登録数）で「destroy()後もアニメが
//		  動き続けていないか」を見る。pixi Ticker分のrAFは引き続き乗るため rafPending
//		  そのものは使わない
//
//	[p]は改ページしないため本文は行を跨いで蓄積される。「進んだこと」の確認は
//	waitMes（toContain）を使い、「まだ進んでいないこと」は次の文言を含まないかで見る。
//
//	width/height は Layer に setter が無く[tsy]で動かせない（本家との相違）ため対象外。
//	詳細は test/e2e/app/prj_tsy/main.sn 冒頭のコメントを参照

import {expect, test, type Page} from '@playwright/test';
import {
	clickDuring, clickNext, gotoSn, layNum, mesStr, reloadMain, tsyLive, waitMes,
} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'tsy')});


// ---- シナリオを目的の停止点まで進める補助 -----------------------------------
//	一直線のシナリオなので、後段のテストほど手前の段を素通りする

async function toUgoita(page: Page) {
	await waitMes(page, 'はじめ。');
	await clickNext(page);	// [tsy time=1200 x=200] → [wait_tsy]
	await waitMes(page, 'うごいた。');
}
async function toSoutai(page: Page) {
	await toUgoita(page);
	await clickNext(page);	// [tsy time=300 x='=100'] → [wait_tsy]
	await waitMes(page, 'そうたい。');
}
async function toTometa(page: Page) {
	await toSoutai(page);
	await clickNext(page);	// [tsy name=tw1 time=9000 y=400] → [stop_tsy]
	await waitMes(page, 'とめた。');
}
async function toUchikiri(page: Page) {
	await toTometa(page);
	await clickNext(page);	// [tsy time=9000 alpha=0] → [wait_tsy]
	await expect.poll(()=> layNum(page, 'base', 'alpha'), {timeout: 5_000}).toBeLessThan(1);
	await clickDuring(page);	// 打ち切り
	await waitMes(page, 'うちきり。');
}
async function toKeiro(page: Page) {
	await toUchikiri(page);
	await clickNext(page);	// [lay y=50] → [tsy path='(,=100) (,=0)'] → [wait_tsy]
	await waitMes(page, 'けいろ。');
}
async function toTsunageta(page: Page) {
	await toKeiro(page);
	await clickNext(page);	// [tsy name=tw_a] と [tsy name=tw_b chain=tw_a] → [wait_tsy]
	await waitMes(page, 'つなげた。');
}


test.describe('[tsy] 基本動作', ()=> {
	test('時間をかけて値を動かし、[wait_tsy]がその間シナリオを止める', async ({page})=> {
		await waitMes(page, 'はじめ。');
		expect(await layNum(page, 'base', 'x')).toBe(0);

		await clickNext(page);	// [tsy time=1200 x=200] → [wait_tsy]

		// 途中経過が組み込み変数へ書き戻されている（motionのonUpdate→Layerへ代入）
		await expect.poll(()=> layNum(page, 'base', 'x'), {timeout: 5_000}).toBeGreaterThan(0);
		expect(await layNum(page, 'base', 'x')).toBeLessThan(200);
		expect(await mesStr(page)).not.toContain('うごいた。');	// [wait_tsy]中なので次の文へ進んでいない

		await waitMes(page, 'うごいた。');
		expect(await layNum(page, 'base', 'x')).toBe(200);
	});

	test('相対指定（=100）は現在値に足される', async ({page})=> {
		await toUgoita(page);
		expect(await layNum(page, 'base', 'x')).toBe(200);

		await clickNext(page);	// [tsy time=300 x='=100']
		await waitMes(page, 'そうたい。');
		expect(await layNum(page, 'base', 'x')).toBe(300);	// 200 + 100
	});
});


test.describe('[stop_tsy]', ()=> {
	test('即座に終了状態へ送る（9秒かける指定でも待たない）', async ({page})=> {
		await toSoutai(page);

		// [tsy name=tw1 time=9000 y=400]の直後に[stop_tsy]。9秒待たずに終了状態(400)になる
		const t0 = Date.now();
		await clickNext(page);
		await waitMes(page, 'とめた。');
		expect(await layNum(page, 'base', 'y')).toBe(400);
		expect(Date.now() - t0).toBeLessThan(5_000);
	});
});


test.describe('[wait_tsy]中のクリック', ()=> {
	test('打ち切れ、その場合も終了状態になる', async ({page})=> {
		await toTometa(page);

		// [tsy time=9000 alpha=0] → [wait_tsy]。9秒待たずにクリックで打ち切る
		const t0 = Date.now();
		await clickNext(page);
		await expect.poll(()=> layNum(page, 'base', 'alpha'), {timeout: 5_000}).toBeLessThan(1);
		expect(await mesStr(page)).not.toContain('うちきり。');	// まだ[wait_tsy]中

		await clickDuring(page);	// 打ち切り
		await waitMes(page, 'うちきり。');
		expect(await layNum(page, 'base', 'alpha')).toBe(0);	// 中途半端な値では止まらない
		expect(Date.now() - t0).toBeLessThan(9_000);
	});
});


test.describe('[tsy path=…]', ()=> {
	test('区間を順に辿り、相対値はどの区間も開始値が基準', async ({page})=> {
		await toUchikiri(page);
		expect(await layNum(page, 'base', 'y')).toBe(400);	// 前段の[stop_tsy]の終了状態のまま

		// path='(,=100) (,=0)'。400→500→400と辿るので、区間ごとの相対
		//	（＝tsy開始前の値からの相対）なら1区間目は400から500へ向かう
		await clickNext(page);
		await expect.poll(async ()=> {
			const v = await layNum(page, 'base', 'y') ?? 0;
			return v > 400 && v < 550;
		}, {timeout: 5_000}).toBe(true);

		await waitMes(page, 'けいろ。');
		expect(await layNum(page, 'base', 'y')).toBe(400);
	});
});


test.describe('[tsy chain=…]', ()=> {
	test('繋いだ元の終了まで動き出さない', async ({page})=> {
		await toKeiro(page);

		// tw_a（base.y → 300、400ms）の終了に tw_b（base2.x → 100）を繋いである
		await clickNext(page);
		await expect.poll(()=> layNum(page, 'base', 'y'), {timeout: 5_000}).toBeLessThan(400);
		expect(await layNum(page, 'base2', 'x')).toBe(0);	// 繋いだ側はまだ動かない

		// chain=はwait_tsy終了で自動的に次へ進む。追加のクリックは要らない
		await waitMes(page, 'つなげた。');
		expect(await layNum(page, 'base', 'y')).toBe(300);
		expect(await layNum(page, 'base2', 'x')).toBe(100);
	});
});


test.describe('[trans]/[wt]', ()=> {
	test('演出中は CmnTween に登録され、[wt]の終了後は外れる', async ({page})=> {
		await toTsunageta(page);

		await clickNext(page);	// [trans time=300] → [wt]
		// クロスフェード演出中は#hTwInf（trans用）に1件登録されている
		await expect.poll(()=> tsyLive(page), {timeout: 2_000}).toBeGreaterThan(0);

		await waitMes(page, 'とらんす。');
		expect(await tsyLive(page)).toBe(0);
	});
});


test.describe('[pause_tsy]/[resume_tsy]', ()=> {
	// SKYNovel_gallery tag_tsy と同じ構造（main.sn の *pause_test 以下）。
	//	[wait_tsy canskip=false]を連続させ、[tsy]実行中がほぼ常にproc状態になる状況で、
	//	globalボタン（[button ... call=true]）経由の[pause_tsy]/[resume_tsy]が効くかを見る。
	//	ボタンをピクセル位置クリックで狙うため、cvsScaleが1になるよう
	//	ビューポートをプロジェクトのwindowサイズ(640x480)に合わせる
	test.use({viewport: {width: 640, height: 480}});

	test('proc状態が続く間もグローバルボタンでの一時停止／再開が効く', async ({page})=> {
		await gotoSn(page, 'tsy');
		await page.evaluate(()=> {(<any>globalThis).__sn.jump('*pause_test')});

		// ループが動き出す（レイヤ登録＝アニメ開始）まで待つ
		await expect.poll(()=> layNum(page, 'ptest', 'x'), {timeout: 5_000}).toBeGreaterThanOrEqual(0);

		// 前提：pauseを押す前は値が動き続けている
		const before = await layNum(page, 'ptest', 'x');
		await page.waitForTimeout(300);
		expect(await layNum(page, 'ptest', 'x')).not.toBe(before);

		// [button left=10 top=440 page=fore label=*pt_pause]をクリック
		await page.locator('#skynovel_act').click({position: {x: 30, y: 450}});
		await page.waitForTimeout(50);
		const justPaused = await layNum(page, 'ptest', 'x');
		await page.waitForTimeout(400);
		expect(await layNum(page, 'ptest', 'x')).toBe(justPaused);	// 静止したまま

		// [button left=100 top=440 page=fore label=*pt_resume]をクリック
		await page.locator('#skynovel_act').click({position: {x: 120, y: 450}});
		await page.waitForTimeout(50);
		await expect.poll(()=> layNum(page, 'ptest', 'x'), {timeout: 2_000}).not.toBe(justPaused);	// 再び動き出す
	});
});


test.describe('Main の破棄', ()=> {
	test('[tsy]実行中に作り直しても CmnTween の登録が残らない', async ({page})=> {
		await waitMes(page, 'はじめ。');
		expect(await tsyLive(page)).toBe(0);

		for (let i = 0; i < 3; ++i) {
			await clickNext(page);	// [tsy time=1200 x=200]を開始（まだ終わっていない状態で壊す）
			await expect.poll(()=> tsyLive(page), {timeout: 2_000}).toBeGreaterThan(0);

			await reloadMain(page);
			// LayerMng.destroy()→CmnTween.destroy()（stopAllTw）で必ずクリアされるはず。
			//	残っていれば「destroy()後もアニメが動き続けている」登録漏れ
			expect(await tsyLive(page)).toBe(0);
		}
	});
});
