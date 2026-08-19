/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, type IEvtMng, argChk_Boolean, addStyle, mesErrJSON, EVNM_BUTTON, EVNM_CLICK, EVNM_KEY} from './CmnLib';
import type {T_HTag, TArg} from './Grammar';
import type {T_Variable, T_Main} from './CmnInterface';
import type {LayerMng} from './LayerMng';
import type {ScriptIterator} from './ScriptIterator';
import {TxtLayer} from './TxtLayer';
import {EventListenerCtn} from './EventListenerCtn';
import {Button} from './Button';
import {FocusMng} from './FocusMng';
import type {SoundMng} from './SoundMng';
import {SndCtx} from './SndCtx';
import type {Config} from './Config';
import {SysBase} from './SysBase';
import {SEARCH_PATH_ARG_EXT} from './ConfigBase';
import {Reading, ReadingState} from './Reading';
import {GamepadMng} from './GamepadMng';

import {Container, type Application, utils} from 'pixi.js';
import {parseHintOpt, flipPlace, calcPos, clampPos, calcArrowOffset} from './HintPos';
import {detectSwipe} from './Swipe';


// tinygesture既定値の踏襲（tinygesture依存の削減、TODO.md）。tap/longpress判定の閾値
const PRESS_THRESHOLD = 8;	// これ未満の移動ならタップ扱い（tinygesture defaults.pressThreshold）
const LONGPRESS_TIME = 500;	// 押しっぱなしがこの時間続けば長押し発火（tinygesture defaults.longPressTime）


const enum eDownKeys {
	NO_PUSH = 0,
	ONE_PUSH,
	PUSH_REPEATING,
}


export class EventMng implements IEvtMng {
	readonly	#elc		= new EventListenerCtn;
	readonly	#fcs;
	readonly	#setBtnNM	= new Map<eDownKeys, string>([
		[0, ''],
		[1, 'middle'],
		// [2, 'right'],
	]);

	constructor(private readonly cfg: Config, private readonly hTag: T_HTag, readonly appPixi: Application, private readonly main: T_Main, private readonly layMng: LayerMng, private readonly val: T_Variable, sndMng: SoundMng, private readonly scrItr: ScriptIterator, private readonly sys: SysBase) {
		//	イベント
		hTag.clear_event	= o=> ReadingState.clear_event(o);// イベントを全消去
		// enable_event		// LayerMng.ts内で定義		//イベント有無の切替
		hTag.event			= o=> this.#event(o);	// イベントを予約
		//hTag.gesture_event（形式変更）			// ジェスチャイベントを予約
		// hTag.l			// Reading.ts内で定義		// 行末クリック待ち
		// hTag.p			// Reading.ts内で定義		// 改ページクリック待ち
		// hTag.s			// Reading.ts内で定義		// 停止する
		hTag.set_cancel_skip= ()=> false;			// (2023/05/27 廃止)スキップ中断予約
		hTag.set_focus		= o=> this.#set_focus(o);	// フォーカス移動
		// hTag.wait		// Reading.ts内で定義		// ウェイトを入れる
		// hTag.waitclick	// Reading.ts内で定義	// クリックを待つ

		// ラベル・ジャンプ
		// hTag.page		// Reading.ts内で定義		// ページ移動

		this.#fcs = new FocusMng(appPixi.view, sys);
		sndMng.setEvtMng(this);
		scrItr.setOtherObj(this, layMng);
		TxtLayer.setEvtMng(this, sys, scrItr);
		layMng.setEvtMng(this);
		Reading.setFcs(this.#fcs);
		sys.setFire((KEY, e)=> Reading.fire(KEY, e));

		if (CmnLib.isDbg) {
			const hHook	: {[type: string]: ()=> void}	= {
				pause	: ()=> {
//					this.#isDbgBreak = true;
					if (! Reading.isWait) return;

					const hArg: TArg = {};
					scrItr.recodeDesign(hArg);
					sys.callHook('_enterDesign', hArg);
					sys.send2Dbg('_enterDesign', hArg);
				},
//				stopOnBreakpoint		: ()=> this.#isDbgBreak = true,
//				stopOnDataBreakpoint	: ()=> this.#isDbgBreak = true,
//				continue				: ()=> this.#isDbgBreak = false,
//				disconnect				: ()=> this.#isDbgBreak = false,
			};
			hHook.attach =
			hHook.stopOnEntry =
			hHook.stopOnStep =
			hHook.stopOnStepIn =
			hHook.stopOnStepOut =
			hHook.stopOnBackstep = hHook.pause!;

			sys.addHook(type=> hHook[type]?.());
		}

		addStyle(`
.sn_hint {
	position: fixed;
	background-color: #3c3225;
	color: white;
	padding: 4px 8px;
	border-radius: 4px;
	font-size: 1.2em;
	z-index: 10000;
	pointer-events: none;
	user-select: none;
	max-width: 300px;
	word-break: break-word;
}

.sn_hint_ar,
.sn_hint_ar::before {
	position: absolute;
	width: 8px;
	height: 8px;
	background: inherit;
}
.sn_hint_ar {
	visibility: hidden;
}
.sn_hint_ar::before {
	visibility: visible;
	content: '';
	transform: rotate(45deg);
}

.sn_hint[data-hint-place='top']		> .sn_hint_ar {bottom: -4px;}
.sn_hint[data-hint-place='bottom']	> .sn_hint_ar {top: -4px;}
.sn_hint[data-hint-place='left']		> .sn_hint_ar {right: -4px;}
.sn_hint[data-hint-place='right']	> .sn_hint_ar {left: -4px;}
`);

		main.cvs.parentElement?.insertAdjacentHTML('beforeend', `
<div class="sn_hint" role="tooltip">
	<span>Dummy</span>
	<div class="sn_hint_ar"></div>
</div>`);
		this.#elmHint = document.querySelector('.sn_hint')!;
		this.#spanHint = this.#elmHint.querySelector('span')!;
		this.#elmArrow = this.#elmHint.querySelector('.sn_hint_ar')!;
		this.#elmHint.hidden = true;


		// マウスボタンやキーボードイベント登録
		appPixi.stage.interactive = true;
		// ブラウザの自動再生ポリシー対策。howlerの`autoUnlock`（既定true）が消えるので、
		//	初回のクリック・キー入力からこちらで明示的にAudioContextを起こす（見落とし注意）
		this.#elc.add(document, 'pointerdown', ()=> SndCtx.unlock(), {capture: true});
		this.#elc.add(document.body, EVNM_KEY, (e: KeyboardEvent)=> this.#ev_keydown(e));
		this.#elc.add(document.body, 'keyup', ()=> ReadingState.resetFired());
		// 右クリックは contextmenu で処理。resvFlameEvent と合わせる
		this.#elc.add(main.cvs, 'contextmenu', (e: MouseEvent)=> {
			const nmEvt = this.#modKey4MouseEvent(e) +'rightclick';
			Reading.fire(nmEvt, e, true);
			e.preventDefault();		// イベント未登録時、メニューが出てしまうので
		});
		// その他マウス（ポインターイベント）
		// this.#elc.add(main.cvs, EVNM_KEY, e=> {	// 通常のクリックイベント
		// tap/longpress/panend/swipeleft・right・up・down。tinygestureに代えてpointerdown〜
		//	pointermove〜pointerupの自作で判定する（tinygesture依存の削減、TODO.md）。
		//	PointerEventはtouch/mouse/penを統一的に扱うので、旧実装にあったTouchEvent分岐は不要になった
		let pressed = false;	// 長押しとクリックを排他的にする仕組み
		let gestureStart: {x: number, y: number} | null = null;
		let longPressTimer: ReturnType<typeof setTimeout> | undefined;

		this.#elc.add(main.cvs, 'pointerdown', (e: PointerEvent)=> {
			gestureStart = {x: e.clientX, y: e.clientY};
			longPressTimer = setTimeout(()=> {
				pressed = true;
				const nmEvt = this.#modKey4MouseEvent(e) +`${
					this.#setBtnNM.get(e.button) ?? ''}longpress`;
				Reading.fire(nmEvt, e, true);
			}, LONGPRESS_TIME);
		});
		// 押下中の移動がpressThresholdを超えたら長押し判定を打ち切る（tinygestureと同じ基準）
		this.#elc.add(document, 'pointermove', (e: PointerEvent)=> {
			if (! gestureStart) return;
			if (Math.max(Math.abs(e.clientX -gestureStart.x), Math.abs(e.clientY -gestureStart.y)) <= PRESS_THRESHOLD) return;

			clearTimeout(longPressTimer);
		});
		this.#elc.add(window, 'pointerout', ()=> ReadingState.resetFired());
			// ポインターが要素の外に出た：押してフレームが横入りした場合など
		// 押下の始まりで必ず落とす。キャンバス上で押した直後に[frame]が前面へ
		// 出ると 'tap' が発生せず resetFired()が走らないため、立ったままの
		// フラグが次の1クリックを丸ごと飲んでしまう。
		// ボタンとステージクリックの二重発生除けは押下〜tap 間で効けばよいので、
		// 押下前（capture）に落とす分には影響しない
		this.#elc.add(document, 'pointerdown', ()=> ReadingState.resetFired(), {capture: true});
		this.#elc.add(document, 'pointerup', (e: PointerEvent)=> {
			if (! gestureStart) return;
			clearTimeout(longPressTimer);

			const dx = e.clientX -gestureStart.x;
			const dy = e.clientY -gestureStart.y;
			gestureStart = null;

			const {width, height} = main.cvs.getBoundingClientRect();
			const dir = detectSwipe(dx, dy, width, height);
			if (dir) {
				Reading.fire(this.#modKey4MouseEvent(e) +dir, e, true);
			}
			else if (! pressed && Math.abs(dx) <= PRESS_THRESHOLD && Math.abs(dy) <= PRESS_THRESHOLD && e.button <= 1) {
				// タップ。右クリックは contextmenu で
				const nmEvt = this.#modKey4MouseEvent(e) +`${
					this.#setBtnNM.get(e.button) ?? ''}click`;
				Reading.fire(nmEvt, e, true);
				ReadingState.resetFired();
			}

			// panend相当：長押しで立てた排他フラグをここで下ろす。同期的に下ろすと
			//	このtap判定自体を巻き込んで握り潰してしまうため、次のtickまで遅らせる
			if (pressed) queueMicrotask(()=> {pressed = false});
		});


		// 言語切り替え通知
		const fncUpdNavLang = ()=> val.setVal_Nochk('tmp', 'const.sn.navigator.language', navigator.language);
		// アプリ版で[event key=sn:chgNavLang]が発生しない
// console.log(`fn:EventMng.ts lang:${navigator.language} ... ${JSON.stringify(navigator.languages)}`);
		this.#elc.add(globalThis, 'languagechange', (e: Event)=> {
// console.log(`fn:EventMng.ts languagechange lang:${navigator.language} ... ${JSON.stringify(navigator.languages)}`);
			fncUpdNavLang();
			Reading.fire('sn:chgNavLang', e);
			utils.clearTextureCache();
		});
		fncUpdNavLang();

		// ダークモード切り替え検知
		const fncMql = (mq: MediaQueryList | MediaQueryListEvent)=> {
			CmnLib.isDarkMode = mq.matches;
			val.setVal_Nochk('tmp', 'const.sn.isDarkMode', CmnLib.isDarkMode);
		};
		const mql = globalThis.matchMedia('(prefers-color-scheme: dark)');
		fncMql(mql);
		this.#elc.add(mql, 'change', (e: MediaQueryListEvent)=> {
			fncMql(e);
			Reading.fire('sn:chgDarkMode', e);
		});

		//: 縦回転ホイール
		let procWheel4wle = (_elc: EventListenerCtn, _onIntr: ()=> void)=> { /* empty */ };
		if ('WheelEvent' in globalThis) {
			this.#elc.add(main.cvs, 'wheel', (e: WheelEvent)=> this.#ev_wheel(e), {passive: true});
			this.#resvFlameEvent4Wheel = body=> this.#elc.add(body, 'wheel', (e: WheelEvent)=> this.#ev_wheel(e), {passive: true});

			procWheel4wle = (elc: EventListenerCtn, fnc: ()=> void)=> elc.add(main.cvs, 'wheel', (e: WheelEvent)=> {
				//if (! e.isTrusted) return;
				if (e.deltaY <= 0) return;

				e.stopPropagation();
				fnc();
			});
		}
		Reading.init(cfg, hTag, main, val, scrItr, layMng, this, sndMng, procWheel4wle);

		this.#gamepad = new GamepadMng(this.#fcs);
		this.#gamepad.start();

		this.#elc.add(document, 'keyup', (e: KeyboardEvent)=> {
			if (e.isComposing) return;	// サポートしてない環境でもいける書き方

			if (e.key in this.#hDownKeys) this.#hDownKeys[e.key] = eDownKeys.NO_PUSH;
		});
		val.defTmp('const.sn.key.alternate', ()=> this.#hDownKeys.Alt! > eDownKeys.NO_PUSH);
		val.defTmp('const.sn.key.command', ()=> this.#hDownKeys.Meta! > eDownKeys.NO_PUSH);
		val.defTmp('const.sn.key.control', ()=> this.#hDownKeys.Control! > eDownKeys.NO_PUSH);
		val.defTmp('const.sn.key.end', ()=> this.#hDownKeys.End! > eDownKeys.NO_PUSH);
		val.defTmp('const.sn.key.escape', ()=> this.#hDownKeys.Escape! > eDownKeys.NO_PUSH);
		val.defTmp('const.sn.key.back', ()=> this.#hDownKeys.GoBack! > eDownKeys.NO_PUSH);
	}

	resvFlameEvent(body: HTMLBodyElement) {
		this.#elc.add(body, EVNM_KEY, (e: KeyboardEvent)=> this.#ev_keydown(e));
		// 右クリックは contextmenu で処理。親と合わせる
		this.#elc.add(body, 'contextmenu', (e: MouseEvent)=> {
			Reading.fire(this.#modKey4MouseEvent(e) +'rightclick', e, true);
			e.preventDefault();		// イベント未登録時、メニューが出てしまうので
		});
		this.#resvFlameEvent4Wheel(body);
		this.#elc.add(body, EVNM_CLICK, (e: MouseEvent)=> {
			if (e instanceof TouchEvent) {Reading.fire('click', e, true); return}
			if (e.button > 1) return;	// 右クリックは contextmenu で

			const nmEvt = this.#modKey4MouseEvent(e) +`${
				this.#setBtnNM.get(e.button) ?? ''}click`;
// console.log(`fn:EventMng.ts -Flame tap- nmEvt:${nmEvt} e:%o`, e);
			Reading.fire(nmEvt, e, true);
		});
		this.#elc.add(body, 'pointerup', ()=> ReadingState.resetFired());
		this.#elc.add(body, 'pointerout', ()=> ReadingState.resetFired());
			// ポインターが要素の外に出た：押してフレームが横入りした場合など
	}
	#resvFlameEvent4Wheel = (_body: HTMLBodyElement)=> { /* empty */ };
	#ev_keydown(e: KeyboardEvent) {
		if (e.isComposing) return;	// サポートしてない環境でもいける書き方
		if (e.key in this.#hDownKeys) this.#hDownKeys[e.key] = e.repeat ?eDownKeys.PUSH_REPEATING :eDownKeys.ONE_PUSH;
		SndCtx.unlock();

		e.preventDefault();
		Reading.fire(SysBase.modKey(e) + e.key, e, true);
	}
		#modKey4MouseEvent(e: MouseEvent) {
			return (e.altKey ?'alt+' :'')
			+	(e.ctrlKey ?'ctrl+' :'')
			+	(e.metaKey ?'meta+' :'')
			+	(e.shiftKey ?'shift+' :'');
		}

	// 縦回転ホイール
	#ev_wheel(e: WheelEvent) {
		//if (! e.isTrusted) return;

		if (this.#wheeling) {this.#extend_wheel = true; return}
		this.#wheeling = true;
		this.#ev_wheel_waitstop();

		// 今のところ縦回転ホイールのみ想定
		const key = this.#modKey4MouseEvent(e)
		+ (e.deltaY > 0 ?'downwheel' :'upwheel');
		Reading.fire(key, e, true);
	}
	#wheeling = false;
	#extend_wheel = false;
	#ev_wheel_waitstop() {
		setTimeout(()=> {	// clearTimeout()不要と判断
			if (this.#extend_wheel) {
				this.#extend_wheel = false;
				this.#ev_wheel_waitstop();
				return;
			}
			this.#wheeling = false;
		}, 250);
	}

	// GamepadMng は内部で rAF ループを回し続けるので、
	// 止めないと Main を作り直すたびに多重に走る
	readonly	#gamepad: GamepadMng;

	destroy() {
		this.#gamepad.stop();

		for (const v of Array.from(document.getElementsByClassName('sn_hint'))) v.parentElement?.removeChild(v);	// ギャラリーリロード用初期化

		Reading.destroy();
		this.#fcs.destroy();
		this.#hOffDomEvt.clear();	// リスナ実体は #elc.clear()で外れる
		this.#elc.clear();
	}

	unButton(ctnBtn: Container) {this.#fcs.remove(ctnBtn)}

	button(hArg: TArg, ctnBtn: Container, normal: ()=> void, hover: ()=> boolean, clicked: ()=> void) {
		if (! hArg.fn && ! hArg.label && ! hArg.url) this.main.errScript('fnまたはlabelまたはurlは必須です');
		hArg.fn ??= this.scrItr.scriptFn;

		// クリックイベント予約
		ctnBtn.interactive = true;
		ctnBtn.cursor = 'pointer';
		const key = hArg.key?.toLowerCase() ?? ' ';
		const glb = argChk_Boolean(hArg, 'global', false);
		ReadingState.setEvt2Fnc(glb, key, ()=> this.main.resumeByJumpOrCall(hArg));
		// 直後にも pointer〜 があるのでダブリに見えるが、こちらが fire 用
		ctnBtn.on(EVNM_BUTTON, (e: TouchEvent | MouseEvent)=> {
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			e.preventDefault?.();	// ?. は必須
			Reading.fire(key, e, true);
		});

		// マウスイベント発生
		// マウスカーソルを載せるとヒントをツールチップス表示する
		const onHint = hArg.hint ?()=> this.#dispHint(hArg, ctnBtn) :()=> { /* empty */ };
		// マウスオーバーでの見た目変化
		const nr = ()=> {normal(); this.#elmHint.hidden = true};
		const hv = ()=> {onHint(); return hover()};
		ctnBtn.on('pointerover', hv);
		ctnBtn.on('pointerout', ()=> {if (this.#fcs.isFocus(ctnBtn)) hv(); else nr()});
		ctnBtn.on('pointerdown', ()=> {
			this.#elmHint.hidden = true;
			const f = this.#fcs.getFocus();
			clicked();
			if (f instanceof Button) f.normal();// 旧フォーカスボタンを通常状態に
		});
		ctnBtn.on('pointerup', CmnLib.isMobile
			? nr
			: ()=> {if (this.#fcs.isFocus(ctnBtn)) hv(); else nr()}
		);
		// フォーカス処理対象として登録
		this.#fcs.add(ctnBtn, hv, nr);

		// 音関係
		if (hArg.clickse) {	//	clickse	クリック時に効果音
			hArg.clicksebuf ??= 'SYS';
			this.cfg.searchPath(hArg.clickse, SEARCH_PATH_ARG_EXT.SOUND);// 存在チェック
			ctnBtn.on('pointerdown', ()=> this.hTag.playse({
				fn : hArg.clickse!,
				...hArg.clicksebuf	?{buf: hArg.clicksebuf}	:{},
				join: false,
			}));
		}
		if (hArg.enterse) {	//	enterse	ボタン上にマウスカーソルが載った時に効果音
			hArg.entersebuf ??= 'SYS';
			this.cfg.searchPath(hArg.enterse, SEARCH_PATH_ARG_EXT.SOUND);// 存在チェック
			ctnBtn.on('pointerover', ()=> this.hTag.playse({
				fn: hArg.enterse!,
				...hArg.entersebuf	?{buf: hArg.entersebuf}	:{},
				join: false,
			}));
		}
		if (hArg.leavese) {	//	leavese	ボタン上からマウスカーソルが外れた時に効果音
			hArg.leavesebuf ??= 'SYS';
			this.cfg.searchPath(hArg.leavese, SEARCH_PATH_ARG_EXT.SOUND);// 存在チェック
			ctnBtn.on('pointerout', ()=> this.hTag.playse({
				fn : hArg.leavese!,
				...hArg.leavesebuf	?{buf: hArg.leavesebuf}	:{},
				join: false,
			}));
		}

		if (hArg.onenter) {
			// マウス重なり（フォーカス取得）時、ラベルコール。必ず[return]で戻ること
			const k = key + hArg.onenter.toLowerCase();
			const o: TArg = {fn: hArg.fn, label: hArg.onenter, call: true, key: k};
			ReadingState.setEvt2Fnc(glb, k, ()=> this.main.resumeByJumpOrCall(o));
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			ctnBtn.on('pointerover', e=> Reading.fire(k, e));
		}
		if (hArg.onleave) {
			// マウス外れ（フォーカス外れ）時、ラベルコール。必ず[return]で戻ること
			const k = key + hArg.onleave.toLowerCase();
			const o: TArg = {fn: hArg.fn, label: hArg.onleave, call: true, key: k};
			ReadingState.setEvt2Fnc(glb, k, ()=> this.main.resumeByJumpOrCall(o));
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			ctnBtn.on('pointerout', e=> Reading.fire(k, e));
		}
	}
	readonly	#elmHint	: HTMLElement;
	readonly	#spanHint	: HTMLElement;
	readonly	#elmArrow	: HTMLElement;
	#dispHint(hArg: TArg, ctnBtn: Container) {
		const rctBtn = ctnBtn instanceof Button
			? ctnBtn.getBtnBounds()
			: ctnBtn.getBounds();
		const isLink = hArg[':タグ名'] === 'link';
		if (! isLink) {
			const cpp = ctnBtn.parent.parent;
			rctBtn.x += cpp.x;	// レイヤ位置を加算
			rctBtn.y += cpp.y;
		}
		if (! hArg.hint) {this.#elmHint.hidden = true; return}

		this.#elmHint.style.cssText = hArg.hint_style ?? '';
		this.#spanHint.style.cssText = '';
		this.#spanHint.textContent = hArg.hint ?? '';

		let opt;
		try {opt = parseHintOpt(hArg.hint_opt)}
		catch (e) {
			console.error(mesErrJSON(
				hArg,
				'hint_opt',
				`dispHint 引数 hint_opt エラー ${
					e instanceof SyntaxError ?e.message :''
				}`,
			));
			return;
		}

		const trg = {
			x: this.sys.ofsLeft4elm +rctBtn.x *this.sys.cvsScale,
			y: this.sys.ofsTop4elm  +rctBtn.y *this.sys.cvsScale,
			width: rctBtn.width, height: rctBtn.height,
		};

		// 表示してから測る（hidden=trueのまま＝display:noneでは大きさが0になり位置計算できない）
		this.#elmHint.hidden = false;
		const box = this.#elmHint.getBoundingClientRect();
		const vp = {width: globalThis.innerWidth, height: globalThis.innerHeight};

		const place = flipPlace(trg, box, opt.placement, opt.dist, vp);
		const pos = clampPos(calcPos(trg, box, place, opt.skid, opt.dist), box, vp);
		this.#elmHint.style.left = `${String(pos.left)}px`;
		this.#elmHint.style.top  = `${String(pos.top)}px`;
		this.#elmHint.dataset.hintPlace = place;

		const isX = place === 'top' || place === 'bottom';
		const arOfs = `${String(calcArrowOffset(trg, box, pos, place))}px`;
		this.#elmArrow.style.left = isX ?arOfs :'';
		this.#elmArrow.style.top  = isX ?'' :arOfs;
	}
	hideHint() {this.#elmHint.hidden = true}
	cvsResize() {this.hideHint()}


	// dom= イベントで張ったリスナの解除関数。del や再登録で外さないと
	// #elc に溜まり続け、対象の DOM 要素も掴んだままになる
	readonly	#hOffDomEvt	= new Map<string, (()=> void)[]>();
	#offDomEvt(rawKeY: string) {
		const aOff = this.#hOffDomEvt.get(rawKeY);
		if (! aOff) return;

		for (const off of aOff) off();
		this.#hOffDomEvt.delete(rawKeY);
	}

	#event(hArg: TArg): boolean {
		const rawKeY = hArg.key;
		if (! rawKeY) throw 'keyは必須です';
		const key = rawKeY.toLowerCase();

		const call = argChk_Boolean(hArg, 'call', false);
		const glb = argChk_Boolean(hArg, 'global', false);
		const {fn, label, url} = hArg;
		if (argChk_Boolean(hArg, 'del', false)) {
			if (fn || label || call || url) throw 'fn/label/callとdelは同時指定できません';

			this.#offDomEvt(rawKeY);
			ReadingState.clear_eventer(rawKeY, glb, key);

			// その他・キーボードイベント
			return false;
		}

		if (! fn && ! label && ! url) throw 'fn,label,url いずれかは必須です';
		hArg.fn ??= this.scrItr.scriptFn;

		// domイベント
		if (rawKeY.startsWith('dom=')) {
			const g = ReadingState.getHtmlElmList(rawKeY);
			if (g.el.length === 0) {
				if (argChk_Boolean(hArg, 'need_err', true)) throw `HTML内にセレクタ（${g.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
				return false;
			}

			let aEv = ['click', EVNM_KEY];	// ラジオボタンも
			const inp = <HTMLInputElement>g.el[0];
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			switch (inp.type ?? '') {
		//	switch (g.el[0].getAttribute('type') ?? '') { textareaで''になる
				case 'checkbox':	aEv = ['input'];	break;
				case 'range':		aEv = ['input'];	break;
				case 'text':
				case 'textarea':	aEv = ['input', 'change'];	break;
			}

			this.#offDomEvt(rawKeY);	// 同じキーの再登録で多重に張らない
			const aOff: (()=> void)[] = [];

			const len = aEv.length;
			for (let i=0; i<len; ++i) {
				const v = aEv[i]!;
				g.el.forEach(elm=> {
					aOff.push(this.#elc.add(elm, v, (e: KeyboardEvent)=> {
						if (! Reading.isWait || this.layMng.getFrmDisabled(g.id)) return;
						if (v === EVNM_KEY && e.key !== 'Enter') return;

						const d = elm.dataset;
						for (const [k, v] of Object.entries(d)) this.val.setVal_Nochk('tmp', `sn.event.domdata.${k}`, v);
						Reading.fire(rawKeY, e);
					}));

					// フォーカス処理対象として登録
					if (i === 0) this.#fcs.add(
						elm,
						()=> {
							if (! this.#canFocus(elm)) return false;
							elm.focus();
							return true;
						},
						()=> { /* empty */ },
					);
				});
			}
			this.#hOffDomEvt.set(rawKeY, aOff);

			// return;	// hGlobalEvt2Fnc(hLocalEvt2Fnc)登録もする
		}

		// その他・キーボードイベント
		ReadingState.setEvt2Fnc(glb, key, ()=> this.main.resumeByJumpOrCall(hArg));

		return false;
	}
	#canFocus(elm: HTMLElement | null): boolean {
		if (! elm) return false;
		if (elm.offsetParent === null) return false;

		let e: HTMLElement | null = elm;
		do {
			const style = getComputedStyle(e);
			if (style.display === 'none'
			|| e.dataset.focus === 'false'
		//	|| style.visibility !== 'visible'
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			|| (<HTMLInputElement>e)?.disabled
		//	|| parseFloat(style.opacity ?? '') <= 0.0
		//	|| parseInt(style.height ?? '', 10) <= 0
		//	|| parseInt(style.width ?? '', 10) <= 0
			) return false;
			e = e.parentElement;
		}
		while (e);

		return true;
	}

	// フォーカス移動
	#set_focus(hArg: TArg) {
		const {add, del, to} = hArg;
		if (add?.startsWith('dom=')) {
			const g = ReadingState.getHtmlElmList(add);
			if (g.el.length === 0 && argChk_Boolean(hArg, 'need_err', true)) throw `HTML内にセレクタ（${g.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;

			g.el.forEach(elm=> this.#fcs.add(
				elm,
				()=> {
					if (! this.#canFocus(elm)) return false;
					elm.focus();
					return true;
				},
				()=> { /* empty */ },
			));
			return false;
		}

		if (del?.startsWith('dom=')) {
			const g = ReadingState.getHtmlElmList(del);
			if (g.el.length === 0 && argChk_Boolean(hArg, 'need_err', true)) throw `HTML内にセレクタ（${g.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;

			g.el.forEach(elm=> this.#fcs.remove(elm));
			return false;
		}

		if (! to) throw '[set_focus] add か to は必須です';
		switch (to) {
			case 'null':	this.#fcs.blur();	break;
			case 'next':	this.#fcs.next();	break;
			case 'prev':	this.#fcs.prev();	break;
		}
		return false;
	}


	// キー押しっぱなしスキップ中か
	get	isSkipping(): boolean {
		if (Reading.isSkipping) return true;
		return Object.keys(this.#hDownKeys).some(k=> this.#hDownKeys[k] === eDownKeys.PUSH_REPEATING);
	}
	// 0:no push  1:one push  2:push repeating
	// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
	readonly #hDownKeys	: {[key: string]: eDownKeys}	= {
		'Alt'		: eDownKeys.NO_PUSH,
		'Meta'		: eDownKeys.NO_PUSH,	// COMMANDキー
		'Control'	: eDownKeys.NO_PUSH,
		'ArrowDown'	: eDownKeys.NO_PUSH,
		'End'		: eDownKeys.NO_PUSH,
		'Enter'		: eDownKeys.NO_PUSH,
		'Escape'	: eDownKeys.NO_PUSH,
		' '			: eDownKeys.NO_PUSH,
		'GoBack'	: eDownKeys.NO_PUSH,	// AndroidのBackキーだと思う
	} as const;

}
