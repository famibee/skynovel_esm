/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {type IEvtMng, CmnLib, argChk_Boolean, argChk_Num} from './CmnLib';
import type {TArg} from './Grammar';
import type {Layer} from './Layer';
import {Reading} from './Reading';

import {animate, type AnimationPlaybackControls} from 'motion';


// @tweenjs/tween.js 相当の薄いラッパー。motionの import はこのファイルに閉じ込める。
// motionは対象オブジェクトへ直接値を書き込むが、複数プロパティ・複数区間（path）を
// 動かす際の要点は下記（詳細はTODO.md「@tweenjs/tween.js → motion」参照）：
//   - motionにカスタムdriverや外部update(time)駆動は無いため、内部rAFに任せる
//     （＝tween.js版にあった単一rAFループ・Groupは廃止し、各アニメが自走する）
//   - motionのonUpdateは動かすプロパティごとに個別発火し引数は値のみだが、
//     ここでは引数を無視して対象オブジェクト自体を渡すことで tween.js と同じ挙動にする
//     （同一フレーム内の重複発火は最後の1回が勝つだけなので実害なし）
//   - motionのcomplete()は同期的に効かない（次フレームまで反映が遅延）ため、
//     end()（同期的即時終了）は自前で「stop→最終値代入→onUpdate→onComplete」を行う
//   - path（区間アニメ）はmotionにtimeline相当が無いため、区間ごとにTwを作り
//     完了時に次を start() する形で連結する（chain=属性も同じ仕組みに乗る）
//   - motionはOSの「モーションを減らす」(prefers-reduced-motion)設定を、x/y/width/height/
//     transform系（motion-dom側のpositionalKeys）の属性だけ勝手に汲み取り、その属性を動かす
//     区間だけ瞬時完了（calculatedDuration=0）にする（対象がDOM要素かどうかは関係なく、
//     キー名だけで判定される）。alpha等の非positional属性はこの対象外なので影響を受けない。
//     [tsy]はUIの付随演出ではなく作者が明示的に指定する演出そのものなので、OSのアクセシビリティ
//     設定を暗黙に継承すべきではない → `reduceMotion: false`で明示的にOFFにする
//     （実機ログで確認・2026-08-24。bluesnovelのTw.tsも同日この対策済み）
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class Tw {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	readonly #target: any;
	#hTo		: {[k: string]: number}	= {};
	#durationSec= 0;
	#delaySec	= 0;
	#ease		: (k: number)=> number	= k=> k;
	#repeatN	= 0;
	#yoyo		= false;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	#onUpdateFn	: ((d: any)=> void) | undefined;
	#onCompleteFn: (()=> void) | undefined;
	#nextInChain: Tw | undefined;
	#ctrl		: AnimationPlaybackControls | undefined;
	#finished	= false;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(target: any) {this.#target = target}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	to(hTo: any, time_ms: number): this {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		this.#hTo = hTo;
		this.#durationSec = Math.max(time_ms, 0) /1000;
		return this;
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onUpdate(fn: (d: any)=> void): this {this.#onUpdateFn = fn; return this}
	onComplete(fn: ()=> void): this {this.#onCompleteFn = fn; return this}
	easing(fn: (k: number)=> number): this {this.#ease = fn; return this}
	delay(ms: number): this {this.#delaySec = ms /1000; return this}
	repeat(n: number): this {this.#repeatN = n; return this}
	yoyo(b: boolean): this {this.#yoyo = b; return this}
	chain(next: Tw): this {this.#nextInChain = next; return this}

	start(): this {
		if (this.#ctrl) return this;	// 二重start対策（tween.jsの_isPlayingガード相当）

		// targetへ直接animateさせない：motionのctrl.stop()は「動いている最中」だと
		// 同期的には止まらず、stop/end後もしばらく（時に長時間）targetへの書き込みが
		// 裏で続いてしまう（stop_tsy/[wait_tsy]中断のクリックで実測）。ダミー(proxy)を
		// 動かしてonUpdate側で#finishedを見るようにし、「以後targetへ触らせない」を
		// motionのstop()の信頼性に依らず保証する
		const proxy: {[k: string]: number} = {};
		for (const k of Object.keys(this.#hTo)) proxy[k] = <number>this.#target[k];

		this.#ctrl = animate(<any>proxy, this.#hTo, {
			duration	: this.#durationSec,
			delay		: this.#delaySec,
			ease		: this.#ease,
			repeat		: this.#repeatN,
			...this.#yoyo ?{repeatType: 'reverse' as const} :{},
			// 上のコメント参照：OSのreduce-motion設定でx/y/width/height/scale_*等が
			//	勝手に瞬時完了にされるのを防ぐ
			reduceMotion: false,
			onUpdate	: ()=> {
				if (this.#finished) return;
				Object.assign(this.#target, proxy);
				this.#onUpdateFn?.(this.#target);
			},
			onComplete	: ()=> this.#fireComplete(),
		});
		return this;
	}
	#fireComplete() {
		if (this.#finished) return;
		// motionのonCompleteは、proxyが正確に最終値へ到達したonUpdateの後に来るとは
		// 限らない（丸め誤差や順序のズレで僅かに届かないまま呼ばれることがある）ため、
		// #finishedを立てる前に目標値そのものを代入して確定させる
		Object.assign(this.#target, this.#hTo);
		this.#onUpdateFn?.(this.#target);
		this.#finished = true;
		this.#onCompleteFn?.();
		this.#nextInChain?.start();
	}
	stop(): this {this.#ctrl?.stop(); return this}
	// 同期的即時終了。自分から連なる残り区間（path）を畳み込んだ最終値を対象へ代入する
	end(): this {
		if (this.#finished) return this;

		const fin: {[k: string]: number} = {};
		let node: Tw | undefined = this;
		let last: Tw = this;
		while (node) {
			Object.assign(fin, node.#hTo);
			node.#ctrl?.stop();
			node.#finished = true;	// 以後そのnodeのonUpdateがproxyの続きを反映しないよう先に立てる
			last = node;
			node = node.#nextInChain;
		}
		Object.assign(this.#target, fin);
		this.#onUpdateFn?.(this.#target);

		last.#onCompleteFn?.();
		return this;
	}
	// destroy()/stopAllTw() 用。end()と違い、コールバックは一切発火しない黙った停止
	kill(): void {
		let node: Tw | undefined = this;
		while (node) {
			node.#ctrl?.stop();
			node.#finished = true;
			node = node.#nextInChain;
		}
	}
	pause(): this {this.#ctrl?.pause(); return this}
	resume(): this {this.#ctrl?.play(); return this}
	isPaused(): boolean {return this.#ctrl?.state === 'paused'}
}


type ITwInf = {
	tw		: Tw | undefined;
	onEnd?	: ()=> void;
	layer?	: string;	// [tsy]が動かしているレイヤ名。[er]/[clear_lay]でそのレイヤが
						// 片付くときトゥイーンも畳むための手掛かり（[trans]・[tsy_frame]は空）
}

export const TW_NM_TRANS = 'trans\n';	// 改行でスクリプトから絶対指定できない値に
const PID_HD_TW	= 'tsy nm:';


// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class CmnTween {
	static	#hTwInf	: {[tw_nm: string]: ITwInf}	= {};
	static	#evtMng	: IEvtMng;
	static	init(evtMng: IEvtMng) {
		CmnTween.destroy();	// 二重 init 対策
		CmnTween.#evtMng = evtMng;
	}

	static	destroy() {CmnTween.stopAllTw()}

	// トゥイーン全停止
	static	stopAllTw() {
		for (const ti of Object.values(CmnTween.#hTwInf)) ti.tw?.kill();
		CmnTween.#hTwInf = {};
	}

	// 実行中トゥイーンの登録数（[trans]も同じ#hTwInfに乗る）。
	//	E2E がリーク検査に使う観測用ゲッタ（SndBuf.live と同じ位置付け）。
	//	destroy()（＝stopAllTw()）が効いていれば、その直後は必ず0になる
	static get liveCount(): number {return Object.keys(CmnTween.#hTwInf).length}


	static	setTwProp(tw: Tw, hArg: TArg): Tw {
		const repeat = argChk_Num(hArg, 'repeat', 1);
		return tw.delay(argChk_Num(hArg, 'delay', 0))
		.easing(this.ease(hArg.ease))
		.repeat(repeat > 0 ?repeat -1 :Infinity)	// 一度リピート→計二回なので
		.yoyo(argChk_Boolean(hArg, 'yoyo', false));
	}
	// @tweenjs/tween.js の Easing 実装を移植（同ライブラリはMITなので式そのものは流用可）。
	// motion移行に伴い削除する依存の代わりに、31種の式を自前で持つ
	static	#bounceOut(k: number): number {
		if (k < 1 / 2.75) return 7.5625 * k * k;
		if (k < 2 / 2.75) return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
		if (k < 2.5 / 2.75) return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
		return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
	}
	static	readonly #hEase: {[name: string]: (k: number)=> number}	= {
		'Back.In'			: k=> {
			const s = 1.70158;
			return k === 1 ?1 :k*k*((s+1)*k -s);
		},
		'Back.InOut'		: k=> {
			const s = 1.70158 *1.525;
			if ((k *= 2) < 1) return 0.5 *(k*k*((s+1)*k -s));
			return 0.5 *((k -= 2) *k*((s+1)*k +s) +2);
		},
		'Back.Out'			: k=> {
			const s = 1.70158;
			return k === 0 ?0 :--k*k*((s+1)*k +s) +1;
		},
		'Bounce.In'			: k=> 1 -CmnTween.#bounceOut(1 -k),
		'Bounce.InOut'		: k=> k < 0.5
			?(1 -CmnTween.#bounceOut(1 -k*2)) *0.5
			:CmnTween.#bounceOut(k*2 -1) *0.5 +0.5,
		'Bounce.Out'		: k=> CmnTween.#bounceOut(k),
		'Circular.In'		: k=> 1 -Math.sqrt(1 -k*k),
		'Circular.InOut'	: k=> {
			if ((k *= 2) < 1) return -0.5 *(Math.sqrt(1 -k*k) -1);
			return 0.5 *(Math.sqrt(1 -(k -= 2) *k) +1);
		},
		'Circular.Out'		: k=> Math.sqrt(1 - --k * k),
		'Cubic.In'			: k=> k*k*k,
		'Cubic.InOut'		: k=> {
			if ((k *= 2) < 1) return 0.5 *k*k*k;
			return 0.5 *((k -= 2) *k*k +2);
		},
		'Cubic.Out'			: k=> --k*k*k +1,
		'Elastic.In'		: k=> {
			if (k === 0) return 0;
			if (k === 1) return 1;
			return -Math.pow(2, 10 *(k -1)) *Math.sin((k -1.1) *5 *Math.PI);
		},
		'Elastic.InOut'		: k=> {
			if (k === 0) return 0;
			if (k === 1) return 1;
			k *= 2;
			if (k < 1) return -0.5 *Math.pow(2, 10 *(k -1)) *Math.sin((k -1.1) *5 *Math.PI);
			return 0.5 *Math.pow(2, -10 *(k -1)) *Math.sin((k -1.1) *5 *Math.PI) +1;
		},
		'Elastic.Out'		: k=> {
			if (k === 0) return 0;
			if (k === 1) return 1;
			return Math.pow(2, -10 *k) *Math.sin((k -0.1) *5 *Math.PI) +1;
		},
		'Exponential.In'	: k=> k === 0 ?0 :Math.pow(1024, k -1),
		'Exponential.InOut'	: k=> {
			if (k === 0) return 0;
			if (k === 1) return 1;
			if ((k *= 2) < 1) return 0.5 *Math.pow(1024, k -1);
			return 0.5 *(-Math.pow(2, -10 *(k -1)) +2);
		},
		'Exponential.Out'	: k=> k === 1 ?1 :1 -Math.pow(2, -10 *k),
		'Linear.None'		: k=> k,
		'Quadratic.In'		: k=> k*k,
		'Quadratic.InOut'	: k=> {
			if ((k *= 2) < 1) return 0.5 *k*k;
			return -0.5 *(--k *(k -2) -1);
		},
		'Quadratic.Out'		: k=> k*(2 -k),
		'Quartic.In'		: k=> k*k*k*k,
		'Quartic.InOut'		: k=> {
			if ((k *= 2) < 1) return 0.5 *k*k*k*k;
			return -0.5 *((k -= 2) *k*k*k -2);
		},
		'Quartic.Out'		: k=> 1 - --k * k * k * k,
		'Quintic.In'		: k=> k*k*k*k*k,
		'Quintic.InOut'		: k=> {
			if ((k *= 2) < 1) return 0.5 *k*k*k*k*k;
			return 0.5 *((k -= 2) *k*k*k*k +2);
		},
		'Quintic.Out'		: k=> --k*k*k*k*k +1,
		'Sinusoidal.In'		: k=> 1 -Math.sin(((1.0 -k) *Math.PI) /2),
		'Sinusoidal.InOut'	: k=> 0.5 *(1 -Math.sin(Math.PI *(0.5 -k))),
		'Sinusoidal.Out'	: k=> Math.sin((k *Math.PI) /2),
	};
	static	ease(nm: string | undefined): (k: number)=> number {
		if (! nm) return k=> k;

		const es = this.#hEase[nm];
		if (! es) throw '異常なease指定です';
		return es;
	}

	static readonly aLayerPrpNm = <(keyof Layer)[]>[
		'alpha',
		'height',
		'rotation',	// rotationX〜Z、scaleZ、zは設定すると
		'scale_x',	// 三次元方向の拡大縮小ルーチンが働き画像がぼやけるので
		'scale_y',	// backlayで設定しない方針
		'pivot_x',
		'pivot_y',
		'width',
		'x',
		'y',
	];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static cnvTweenArg(hArg: TArg, lay: any): TArg {
		const hTo: {[val_name: string]: number} = {};
		for (const nm of CmnTween.aLayerPrpNm) {
			const arg = hArg[<keyof TArg>nm];
			if (! arg) continue;

			// {x:500}			X位置を500に
			// {x:'=500'}		現在のX位置に+500加算した位置
			// {x:'=-500'}		現在のX位置に-500加算した位置
			// {x:'250,500'}	+250から＋500までの間でランダムな値をX位置に
			// {x:'=250,500'}	+250から＋500までの間でランダムな値を現在のX位置に加算
			// eslint-disable-next-line @typescript-eslint/no-base-to-string
			const v = String(arg);
			const hdeq = v.startsWith('=');
			const vx = hdeq ?v.slice(1) :v;
			if (! vx) continue;

			const [v0='0', v1] = vx.split(',');
			const a0 = hTo[nm] = parseFloat(v0);

			if (v1) hTo[nm] += Math.round(
				Math.random() * (parseFloat(v1) -a0 +1)
			);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
			if (hdeq) hTo[nm] += parseFloat(lay[nm]);	// 相対に
		}
		return hTo;
	}


	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static	tween(tw_nm: string, hArg: TArg, hNow: any, hTo: any, onUpdate: (d: any)=> void, onComplete: ()=> void, onEnd: ()=> void, start = true, layer = ''): Tw {
		const time = this.#evtMng.isSkipping ?0 :argChk_Num(hArg, 'time', NaN);

		this.#hTwInf[tw_nm]?.tw?.kill();	// 同名トゥイーンの二重起動対策（bluesnovel ScriptMng.ts:764で先に直された不具合）

		const tw = new Tw(hNow)
		.to(hTo, time)
		.onUpdate(d=> onUpdate(d));
		this.setTwProp(tw, hArg);
		this.#hTwInf[tw_nm] = {tw, onEnd, layer};

		const {path} = hArg;
		let twLast = tw;
		if (path) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			if (CmnLib.debugLog) console.group(`🍝 [${hArg[':タグ名'] ?? ''}] path=${path}= start(${String(hNow.x)},${String(hNow.y)},${String(hNow.alpha)})`);
			for (const {groups} of path.matchAll(this.#REG_TSY_PATH)) {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				const {x, x2, y, y2, o, o2, json} = groups!;
				let hArg2: TArg = {};
				if (json) try {hArg2 = <TArg>JSON.parse(json)} catch (e) {
					console.error(`🍝 json=${json} `+ String(e));
					continue;
				}
				else {
					const xx = x ?? x2;
					if (xx) hArg2.x = xx;
					const yy = y ?? y2;
					if (yy) hArg2.y = yy;
					const oo = o ?? o2;
					if (oo) hArg2.alpha = Number(oo);
				}

				const hTo2 = this.cnvTweenArg(hArg2, hNow);
				if (CmnLib.debugLog) console.info(`🍝 ${
					json ?? `{x:${String(x)} y:${String(y)} o:${String(o)}}`
				} => hTo:${JSON.stringify(hTo2)}`);

				const twNew = new Tw(hNow)
				.to(hTo2, time);
				this.setTwProp(twNew, hArg);
				twLast.chain(twNew);

				twLast = twNew;
			}
			if (CmnLib.debugLog) console.groupEnd();
		}
		twLast.onComplete(()=> {
			const ti = this.#hTwInf[tw_nm];
			if (! ti?.tw) return;
			// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
			delete this.#hTwInf[tw_nm];

			ti.tw = undefined;
			tw.stop();
			ti.onEnd?.();

			onComplete();
			Reading.notifyEndProc(PID_HD_TW + tw_nm);	// ラストに
		});

		const {chain} = hArg;
		if (chain) {	// 指定レイヤのアニメ終了に、このトゥイーンを続ける
			const twFrom = this.#hTwInf[chain];
			if (! twFrom?.tw) throw `${chain}は存在しない・または終了したトゥイーンです`;
			delete twFrom.onEnd;
			twFrom.tw.chain(tw);
		}
		else if (start) tw.start();

		return tw;
	}
	// 11 match 301 step (0.1ms) PCRE2 https://regex101.com/r/reinpq/1
		// List ${x}${x2}/${y}${y2}/${o}${o2}=${json}\n
/*
\(\s*
(?:	(?<x>[-=\d\.]+)	|	(['"])	(?<x2>.*?)	\2	)?
(?:
	\s*,\s*
	(?:	(?<y>[-=\d\.]+)	|	(['"])	(?<y2>.*?)	\5	)?
	(?:
		\s*,\s*
		(?:	(?<o>[-=\d\.]+)	|	(['"])	(?<o2>.*?)	\8	)
	)?
)?
|
(?<json>\{[^{}]*})
*/
	static	readonly	#REG_TSY_PATH	= /\(\s*(?:(?<x>[-=\d.]+)|(['"])(?<x2>.*?)\2)?(?:\s*,\s*(?:(?<y>[-=\d.]+)|(['"])(?<y2>.*?)\5)?(?:\s*,\s*(?:(?<o>[-=\d.]+)|(['"])(?<o2>.*?)\8))?)?|(?<json>\{[^{}]*})/g;

	// トランス終了待ち
	static	wt(hArg: TArg) {
		const ti = this.#hTwInf[TW_NM_TRANS];
		if (! ti?.tw) return false;

		const fnc = ()=> this.stopEndTrans();
		Reading.beginProc(TW_NM_TRANS, fnc, true, argChk_Boolean(hArg, 'canskip', true) ?fnc: undefined);
		// new ReadingState_wait4Tag(hArg);	// ひとまずイベント待ちはしない方向で
		return true;
	}

	// レイヤのトランジションの停止
	static	stopEndTrans() {this.#hTwInf[TW_NM_TRANS]?.tw?.stop().end()}
		// stop()とend()は別

	// [er]/[clear_lay]で片付くレイヤを動かしている[tsy]のトゥイーンを畳む。
	//	Layer.clearLay()はctnのプロパティを既定へ戻すだけでこちらへ何も伝えないため、
	//	放っておくとクリア後もトゥイーンのonUpdateが初期化した見た目（alpha／angle／
	//	scale／pivot）を毎フレーム上書きし続ける。
	//	[stop_tsy]と違いend()は呼ばない——レイヤは既定へ戻される最中で、トゥイーンの
	//	最終値を入れ直すと打ち消し合う。arrive／backlayのonEndも同じ理由で発火させない
	//	（kill()はコールバックを黙らせたままchain先のpath区間も辿って道連れにする）。
	//	[wait_tsy]待機中はスクリプトが止まり[er]/[clear_lay]自体が来ないので待ち状態は触らない。
	//	→ 分家 bluesnovel では LayerMng.#stopTsyByLayer() 相当（clearLay／clearTxtLay に配線）。
	static	stopTsyByLayer(aLayNm: readonly string[]) {
		for (const [tw_nm, ti] of Object.entries(this.#hTwInf)) {
			if (! ti.layer) continue;	// [trans]・[tsy_frame]はレイヤに紐付かない
			if (! aLayNm.includes(ti.layer)) continue;

			ti.tw?.kill();
			// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
			delete this.#hTwInf[tw_nm];
		}
	}


	// トゥイーン終了待ち
	static	wait_tsy(hArg: TArg) {
		const tw_nm = this.#tw_nm(hArg);
		const tw = this.#hTwInf[tw_nm]?.tw
		if (! tw) return false;

		const fnc = ()=> tw.end();	// stop()とend()は別
		Reading.beginProc(PID_HD_TW + tw_nm, fnc, true, argChk_Boolean(hArg, 'canskip', true) ?fnc: undefined);
		// new ReadingState_wait4Tag(hArg);	// wt()/wait()と同じくbeginProcと二重の待ちになるため呼ばない。
		// 呼ぶと、ここで作られる待ち状態のdefaultケース（'p'/'s'以外）がクリック一発で
		// ReadingState_goへ遷移してしまい、[wait_tsy]の打ち切りとは別に、シナリオが
		// canskipの終了処理を待たずそのまま次の行まで進んでしまう（実際に観測した）
		return true;
	}
		static	#tw_nm(hArg: TArg) {
			const {layer='', id, name} = hArg;
			const tw_nm = id ?`frm\n${id}` :name ?? layer;
			if (! tw_nm) throw 'トゥイーンが指定されていません';

			return tw_nm;
		}

	// トゥイーン中断
	static	stop_tsy(hArg: TArg) {
		const tw_nm = this.#tw_nm(hArg);
		this.#hTwInf[tw_nm]?.tw?.stop().end();	// stop()とend()は別
		return false;
	}

	// 一時停止
	static	pause_tsy(hArg: TArg) {
		const tw_nm = this.#tw_nm(hArg);
		this.#hTwInf[tw_nm]?.tw?.pause();
		return false;
	}

	// 一時停止再開
	static	resume_tsy(hArg: TArg) {
		const tw_nm = this.#tw_nm(hArg);
		this.#hTwInf[tw_nm]?.tw?.resume();
		return false;
	}

}
