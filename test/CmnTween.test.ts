/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {GlobalRegistrator} from '@happy-dom/global-registrator';
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (! globalThis.document) GlobalRegistrator.register();

import {CmnTween} from '../src/sn/CmnTween';
import type {IEvtMng} from '../src/sn/CmnLib';
import type {TArg} from '../src/sn/Grammar';
import {Easing} from '@tweenjs/tween.js';


// CmnTween.tween() は this.#evtMng.isSkipping を参照するため、
// LayerMng.init()/destroy() 相当のライフサイクルをテストごとに再現する。
let	isSkipping = false;
const	stubEvtMng	: IEvtMng = {
	button: ()=> { /* empty */ },
	unButton: ()=> { /* empty */ },
	get isSkipping() {return isSkipping},
	hideHint: ()=> { /* empty */ },
	cvsResize: ()=> { /* empty */ },
	resvFlameEvent: ()=> { /* empty */ },
};

beforeEach(()=> {
	isSkipping = false;
	CmnTween.init(stubEvtMng);
});
afterEach(()=> {
	CmnTween.destroy();	// rAFループを止める（テスト間の巻き添え防止）
});


// ==== ease() ====
it('ease_default_Linear', ()=> {
	const fnc = CmnTween.ease(undefined);
	expect(fnc(0.5)).toBe(Easing.Linear.None(0.5));
});
it('ease_named', ()=> {
	const fnc = CmnTween.ease('Cubic.In');
	expect(fnc(0.5)).toBe(Easing.Cubic.In(0.5));
});
it('ease_invalid_throw', ()=> {
	expect(()=> CmnTween.ease('NoSuchEase')).toThrow('異常なease指定です');
});


// ==== cnvTweenArg() ====
it('cnvTweenArg_absolute', ()=> {
	const hTo = CmnTween.cnvTweenArg(<TArg>{x: 500}, {x: 0});
	expect(hTo.x).toBe(500);
});
it('cnvTweenArg_relative_plus', ()=> {
	const hTo = CmnTween.cnvTweenArg(<TArg>{x: '=500'}, {x: 100});
	expect(hTo.x).toBe(600);
});
it('cnvTweenArg_relative_minus', ()=> {
	const hTo = CmnTween.cnvTweenArg(<TArg>{x: '=-500'}, {x: 1000});
	expect(hTo.x).toBe(500);
});
it('cnvTweenArg_no_arg_skipped', ()=> {
	const hTo = CmnTween.cnvTweenArg(<TArg>{}, {x: 0});
	expect('x' in hTo).toBe(false);
});
it('cnvTweenArg_empty_string_skipped', ()=> {
	const hTo = CmnTween.cnvTweenArg(<TArg>{x: ''}, {x: 0});
	expect('x' in hTo).toBe(false);
});
// 【気になる点】{x:'250,500'} のようなランダム範囲指定は
// Math.round(Math.random()*(max-min+1)) で計算されており、
// 本来のmax(500)を超えて501になる確率がごく僅かに存在する（丸め・+1由来）。
// 明確な不具合と断定はしないが、境界値を含む形でテストしておく。
it('cnvTweenArg_range_within_documented_bounds', ()=> {
	for (let i=0; i<50; ++i) {
		const hTo = CmnTween.cnvTweenArg(<TArg>{x: '250,500'}, {x: 0});
		expect(hTo.x).toBeGreaterThanOrEqual(250);
		expect(hTo.x).toBeLessThanOrEqual(501);	// 本来は500までのはずが+1側に寄る余地あり
	}
});
it('cnvTweenArg_range_relative_within_documented_bounds', ()=> {
	for (let i=0; i<50; ++i) {
		const hTo = CmnTween.cnvTweenArg(<TArg>{x: '=250,500'}, {x: 100});
		expect(hTo.x).toBeGreaterThanOrEqual(350);
		expect(hTo.x).toBeLessThanOrEqual(601);
	}
});


// ==== tween() のライフサイクル（onUpdate/onComplete/onEnd） ====
it('tween_onUpdate_onComplete_onEnd', ()=> {
	const hNow = {x: 0};
	let updated = false, completed = false, ended = false;
	const tw = CmnTween.tween('test_tw_1', <TArg>{time: 100}, hNow, {x: 100},
		d=> {updated = true; hNow.x = <number>d.x},
		()=> {completed = true},
		()=> {ended = true},
		false,	// 自前でstart/updateを呼ぶためstartさせない
	);
	tw.start(0);
	tw.update(50);
	expect(updated).toBe(true);
	expect(completed).toBe(false);

	tw.update(100);
	expect(completed).toBe(true);
	expect(ended).toBe(true);
	expect(hNow.x).toBe(100);
});

it('tween_chain_to_unknown_throw', ()=> {
	expect(()=> CmnTween.tween('test_tw_2', <TArg>{time: 100, chain: 'unknown_tw'}, {x: 0}, {x: 0},
		()=> { /* empty */ }, ()=> { /* empty */ }, ()=> { /* empty */ }))
	.toThrow('unknown_twは存在しない・または終了したトゥイーンです');
});


// ==== #tw_nm 優先順位（id > name > layer）と未指定時のエラー ====
it('tw_nm_priority_id_over_name_and_layer', ()=> {
	const tw = CmnTween.tween('frm\n123', <TArg>{time: 100}, {x: 0}, {x: 100},
		()=> { /* empty */ }, ()=> { /* empty */ }, ()=> { /* empty */ }, false);
	tw.start(0);

	CmnTween.pause_tsy(<TArg>{id: '123', name: 'other', layer: 'otherlay'});
	expect(tw.isPaused()).toBe(true);
});
it('tw_nm_priority_name_over_layer', ()=> {
	const tw = CmnTween.tween('nm_A', <TArg>{time: 100}, {x: 0}, {x: 100},
		()=> { /* empty */ }, ()=> { /* empty */ }, ()=> { /* empty */ }, false);
	tw.start(0);

	CmnTween.pause_tsy(<TArg>{name: 'nm_A', layer: 'otherlay'});
	expect(tw.isPaused()).toBe(true);
});
it('tw_nm_layer_fallback', ()=> {
	const tw = CmnTween.tween('lay_A', <TArg>{time: 100}, {x: 0}, {x: 100},
		()=> { /* empty */ }, ()=> { /* empty */ }, ()=> { /* empty */ }, false);
	tw.start(0);

	CmnTween.pause_tsy(<TArg>{layer: 'lay_A'});
	expect(tw.isPaused()).toBe(true);
});
it('tw_nm_none_throw', ()=> {
	expect(()=> CmnTween.pause_tsy(<TArg>{})).toThrow('トゥイーンが指定されていません');
});
it('stop_tsy_no_throw_when_not_found', ()=> {
	expect(CmnTween.stop_tsy(<TArg>{name: 'not_exist'})).toBe(false);
});
it('resume_tsy_targets_correct_tween', ()=> {
	const tw = CmnTween.tween('resume_A', <TArg>{time: 100}, {x: 0}, {x: 100},
		()=> { /* empty */ }, ()=> { /* empty */ }, ()=> { /* empty */ }, false);
	tw.start(0);
	tw.pause(0);
	expect(tw.isPaused()).toBe(true);

	CmnTween.resume_tsy(<TArg>{name: 'resume_A'});
	expect(tw.isPaused()).toBe(false);
});


// ==== stopAllTw() 不具合再発防止 ====
// CHANGELOG 2.0.1「ロード直後にトゥイーン管理情報までクリアしていた件」の対象。
// [load]系タグからは CmnTween.stopAllTw() が呼ばれる想定（ScriptIterator#loadFromMark）。
// - 管理テーブル(#hTwInf)はクリアされ、既存のトゥイーンは名前引きで操作できなくなる
// - しかし destroy() のようにループやグループ自体まで破棄されるわけではなく、
//   ロード後も新規トゥイーンは問題なく動作し続ける必要がある
it('stopAllTw_detaches_old_tween_from_registry', ()=> {
	const tw = CmnTween.tween('load_test', <TArg>{time: 1000}, {x: 0}, {x: 100},
		()=> { /* empty */ }, ()=> { /* empty */ }, ()=> { /* empty */ }, false);
	tw.start(0);

	CmnTween.stopAllTw();	// [load]系タグ相当の処理

	// 管理情報経由の操作はもう届かない（意図通り）
	CmnTween.pause_tsy(<TArg>{name: 'load_test'});
	expect(tw.isPaused()).toBe(false);
});
it('stopAllTw_does_not_kill_future_tweens (destroy()との違いの確認)', ()=> {
	CmnTween.stopAllTw();

	const hNow = {x: 0};
	let completed = false;
	const tw = CmnTween.tween('after_load_tw', <TArg>{time: 100}, hNow, {x: 100},
		()=> { /* empty */ }, ()=> {completed = true}, ()=> { /* empty */ }, false);
	tw.start(0);
	tw.update(100);

	expect(completed).toBe(true);
	expect(hNow.x).toBe(100);
});


// ==== rAFループのライフサイクル ====
//	E2E（test/e2e/leak.e2e.ts）でも Main の作り直しで確かめられるが、
//	多重化そのものは rAF を差し替えれば此処で完結するのでブラウザは要らない
describe('rAFループ', ()=> {
	// 予約されたコールバックを握れるよう rAF を差し替える
	function stubRaf() {
		const org = {req: globalThis.requestAnimationFrame, cancel: globalThis.cancelAnimationFrame};
		const hCb = new Map<number, FrameRequestCallback>();
		let id = 0;
		globalThis.requestAnimationFrame = cb=> {hCb.set(++id, cb); return id};
		globalThis.cancelAnimationFrame = i=> {hCb.delete(i)};
		return {
			hCb,
			restore: ()=> {
				globalThis.requestAnimationFrame = org.req;
				globalThis.cancelAnimationFrame = org.cancel;
			},
		};
	}

	it('init_schedules_one_loop', ()=> {
		const {hCb, restore} = stubRaf();
		try {
			CmnTween.destroy();		// beforeEach ぶんを畳んでから測る
			CmnTween.init(stubEvtMng);
			expect(hCb.size).toBe(1);
		}
		finally {restore()}
	});

	it('destroy_cancels_pending_raf', ()=> {
		const {hCb, restore} = stubRaf();
		try {
			CmnTween.destroy();
			CmnTween.init(stubEvtMng);
			CmnTween.destroy();
			expect(hCb.size).toBe(0);	// 予約を取り消さないと1件残る
		}
		finally {restore()}
	});

	it('destroy_init_does_not_multiply_loops', ()=> {
		const {hCb, restore} = stubRaf();
		try {
			CmnTween.destroy();
			CmnTween.init(stubEvtMng);

			// Main の作り直し（本家 SysBase.run()）に相当。
			//	destroy()が予約を取り消していないと、古い loop が残ったまま
			//	init()で #req が本物に戻り、発火時に自分を再スケジュールして倍々に増える
			for (let i=0; i<3; ++i) {
				CmnTween.destroy();
				CmnTween.init(stubEvtMng);
				expect(hCb.size).toBe(1);
			}
		}
		finally {restore()}
	});
});
