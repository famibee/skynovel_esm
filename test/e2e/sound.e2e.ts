/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 音声まわり（シナリオ：test/e2e/app/prj_sound/main.sn）。
//	元はギャラリー <SKYNovel_gallery/public/prj/sound/> のボタン駆動の手動テスト。
//	耳で確かめていた項目を、機械が見られる値に置き換えている：
//		・組み込み変数（tmp:…playing / save:…fn / save:…volume / const.sn.loopPlaying）
//		・Howl の設定値（loop / rate / stereo / volume / duration / sprite）
//		・[ws]/[wf] が実際に待つかどうか（停止点に着くまでの経過時間）
//	**鳴っている音そのものは確かめられない**ので、そこは対象外とする。
//	音源は尺で区別できる： snd=4秒 / snd2=2秒 / f_*=1秒

import {expect, test} from '@playwright/test';
import {glbVolume, gotoSn, howlList, jump, val} from './snPage';

test.beforeEach(async ({page})=> {await gotoSn(page, 'sound')});

const playing = (page: Parameters<typeof val>[0], buf: string)=> val(page, `tmp:const.sn.sound.${buf}.playing`);
const loopPlaying = async (page: Parameters<typeof val>[0])=>
	JSON.parse(String(await val(page, 'save:const.sn.loopPlaying'))) as Record<string, string>;


test.describe('単発再生（非ループ）', ()=> {
	test('[playse]で鳴り、組み込み変数が立つ', async ({page})=> {
		await jump(page, '*play');

		const [h] = await howlList(page);
		expect(h?.src).toBe('snd.mp3');
		expect(h?.loop).toBe(false);
		expect(h?.playing).toBe(true);
		expect(h?.duration).toBe(4);
		expect(await playing(page, 'SE')).toBe(true);
		// 非ループは loopPlaying に載らない（[load]で鳴らし直す対象ではない）
		expect(await loopPlaying(page)).toEqual({});
	});

	test('[stopse]で止まり Howl も解放される', async ({page})=> {
		await jump(page, '*play_stop');

		expect(await howlList(page)).toEqual([]);
		expect(await playing(page, 'SE')).toBe(false);
	});
});


test.describe('連続再生（ループ）', ()=> {
	test('[playse loop=true]は loopPlaying に載る', async ({page})=> {
		await jump(page, '*loop');

		const [h] = await howlList(page);
		expect(h?.loop).toBe(true);
		expect(h?.playing).toBe(true);
		expect(await playing(page, 'SE')).toBe(true);
		expect(await val(page, 'save:const.sn.sound.SE.fn')).toBe('snd');
		expect(await loopPlaying(page)).toEqual({SE: 'snd'});
	});

	test('[stopse]で loopPlaying から消える', async ({page})=> {
		await jump(page, '*loop_stop');

		expect(await howlList(page)).toEqual([]);
		expect(await playing(page, 'SE')).toBe(false);
		expect(await loopPlaying(page)).toEqual({});
	});

	test('[stop_allse]は全バッファを止める', async ({page})=> {
		await jump(page, '*stop_allse');

		expect(await howlList(page)).toEqual([]);
		expect(await playing(page, 'SE')).toBe(false);
		expect(await playing(page, 'SE2')).toBe(false);
		expect(await loopPlaying(page)).toEqual({});
	});
});


test.describe('待ち（[ws]/[wf]）', ()=> {
	test('[ws]は再生が終わるまで待つ', async ({page})=> {
		const t0 = Date.now();
		await jump(page, '*ws');
		const ms = Date.now() - t0;

		// 4秒の音。待たなければ一瞬で着いてしまう
		expect(ms).toBeGreaterThan(3500);
		// 待ち切ったので鳴り終わって解放されている
		expect(await howlList(page)).toEqual([]);
		expect(await playing(page, 'SE')).toBe(false);
	});

	test('ループ再生に[ws]は効かない', async ({page})=> {
		const t0 = Date.now();
		await jump(page, '*ws_loop');

		expect(Date.now() - t0).toBeLessThan(2000);	// 素通りする
		expect((await howlList(page))[0]?.playing).toBe(true);
	});
});


test.describe('フェード', ()=> {
	test('[fadese]で目標音量まで下がり[wf]が待つ', async ({page})=> {
		await jump(page, '*fade');

		expect((await howlList(page))[0]?.volume).toBeCloseTo(0.2, 3);
		expect(await val(page, 'save:const.sn.sound.SE.volume')).toBe(0.2);
		expect(await playing(page, 'SE')).toBe(true);	// 0でないので鳴り続ける
	});

	test('[fadeoutse]は鳴り終わって停止まで行く', async ({page})=> {
		await jump(page, '*fadeout');

		// volume=0 は stop 扱い（SndBuf の fade は savevol===0 で stop 既定）
		expect(await howlList(page)).toEqual([]);
		expect(await playing(page, 'SE')).toBe(false);
		expect(await loopPlaying(page)).toEqual({});
	});

	test('time=0 は即時反映', async ({page})=> {
		await jump(page, '*fade_now');

		expect((await howlList(page))[0]?.volume).toBeCloseTo(0.5, 3);
	});
});


test.describe('音量', ()=> {
	test('[volume]は基準音量（sys:）を変え、実音量に掛かる', async ({page})=> {
		await jump(page, '*volume');

		// 実音量 = 目標音量(save:) × 基準音量(sys:)
		expect(await val(page, 'sys:const.sn.sound.SE.volume')).toBe(0.5);
		expect(await val(page, 'save:const.sn.sound.SE.volume')).toBe(1);
		expect((await howlList(page))[0]?.volume).toBeCloseTo(0.5, 3);
		// グローバル音量（Howler側）は別物なので動かない
		expect(await glbVolume(page)).toBe(1);
	});

	test('VOICE再生中はBGMが vol_mul_talking ぶん絞られる', async ({page})=> {
		await jump(page, '*downBGM');

		const a = await howlList(page);
		const bgm = a.find(h=> h.src === 'snd.mp3');
		const voice = a.find(h=> h.src === 'snd2.mp3');
		expect(bgm?.volume).toBeCloseTo(0.2, 3);	// 1 × 1 × 0.2
		expect(voice?.volume).toBeCloseTo(1, 3);	// VOICE 自身は絞らない
	});

	test('VOICEが終わるとBGMの音量が戻る', async ({page})=> {
		await jump(page, '*downBGM_end');

		expect((await howlList(page))[0]?.volume).toBeCloseTo(1, 3);
		expect(await playing(page, 'VOICE')).toBe(false);
		expect(await playing(page, 'BGM')).toBe(true);
	});
});


test.describe('バッファ操作', ()=> {
	test('[xchgbuf]は fn も loopPlaying も入れ替える', async ({page})=> {
		await jump(page, '*xchgbuf');

		expect(await val(page, 'save:const.sn.sound.SE.fn')).toBe('snd2');
		expect(await val(page, 'save:const.sn.sound.SE2.fn')).toBe('snd');
		// 直す前は「片方だけがループ中」の時しか hLP を更新しておらず、
		//	両方ループ中だと交換前のまま取り残されていた。[load]がこれを読むので
		//	しおりから戻すと音が入れ替わる
		expect(await loopPlaying(page)).toEqual({SE: 'snd2', SE2: 'snd'});
	});

	test('同じbufへ重ねて[playse]すると前のは止まる', async ({page})=> {
		await jump(page, '*playplay');

		const a = await howlList(page);
		expect(a).toHaveLength(1);			// 前の Howl は解放済み
		expect(a[0]?.src).toBe('snd2.mp3');
		expect(await loopPlaying(page)).toEqual({SE: 'snd2'});
	});
});


test.describe('再生パラメータ', ()=> {
	test('pan が Howl のステレオ位置になる', async ({page})=> {
		await jump(page, '*pan_l');
		expect((await howlList(page))[0]?.stereo).toBe(-1);

		await jump(page, '*pan_r');
		expect((await howlList(page))[0]?.stereo).toBe(1);
	});

	test('speed が再生レートになる', async ({page})=> {
		await jump(page, '*speed');
		expect((await howlList(page))[0]?.rate).toBe(2);
	});
});


// start_ms/end_ms/ret_ms は Howl の sprite（[開始ms, 継続ms]）に落ちる。
//	一周目＝最初の再生、二周目＝ret_ms を効かせたループ後の再生。
//	end_ms の負値は「末尾から何ms手前」、既定値(MAX)は「ファイル末端」
test.describe('start_ms / end_ms / ret_ms', ()=> {
	const sprite = async (page: Parameters<typeof howlList>[0])=> (await howlList(page))[0]?.sprite;

	test('start_ms のみ', async ({page})=> {
		await jump(page, '*s2L');
		expect(await sprite(page)).toEqual({一周目: [2000, 2000], 二周目: [0, 4000, true]});
	});

	test('end_ms が正の値（冒頭から何ms目）', async ({page})=> {
		await jump(page, '*e3L');
		expect(await sprite(page)).toEqual({一周目: [0, 3000], 二周目: [0, 3000, true]});
	});

	test('end_ms が負の値（末尾から何ms手前）', async ({page})=> {
		await jump(page, '*eM1L');
		expect(await sprite(page)).toEqual({一周目: [0, 2500], 二周目: [0, 2500, true]});
	});

	test('start_ms と end_ms', async ({page})=> {
		await jump(page, '*s1e3L');
		expect(await sprite(page)).toEqual({一周目: [1000, 2000], 二周目: [0, 3000, true]});
	});

	test('ret_ms のみ（二周目だけ開始位置が変わる）', async ({page})=> {
		await jump(page, '*r2L');
		expect(await sprite(page)).toEqual({一周目: [0, 4000], 二周目: [2000, 2000, true]});
	});

	test('start_ms と end_ms と ret_ms', async ({page})=> {
		await jump(page, '*s1e3r2L');
		expect(await sprite(page)).toEqual({一周目: [1000, 2000], 二周目: [2000, 1000, true]});
	});
});


// ギャラリーが形式ごとにボタンを置いていた項目。
//	Chromium が復号できるか＝ロードが通って再生に入れるかだけを見る
test.describe('音声形式', ()=> {
	for (const [nm, fn] of [
		['m4a', 'f_m4a.m4a'], ['ogg', 'f_ogg.ogg'], ['aac', 'f_aac.aac'],
		['flac', 'f_flac.flac'], ['wav', 'f_wav.wav'],
	] as const) {
		test(`${nm} が読める`, async ({page})=> {
			await jump(page, `*fmt_${nm}`);

			const [h] = await howlList(page);
			expect(h?.src).toBe(fn);
			expect(h?.playing).toBe(true);
			expect(h?.duration).toBeGreaterThan(0.9);	// 1秒の音源
		});
	}
});
