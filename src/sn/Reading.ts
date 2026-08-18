/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2025-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {TArg, T_HTag} from './Grammar';
import type {T_Evt2Fnc, T_HEvt2Fnc, T_Main, T_Mark, T_Variable} from './CmnInterface';
import {argChk_Boolean, argChk_Num, CmnLib, EVNM_CLICK, EVNM_KEY} from './CmnLib';
import type {Config} from './Config';
import type {ScriptIterator} from './ScriptIterator';
import type {LayerMng} from './LayerMng';
import type {EventMng} from './EventMng';
import type {FocusMng} from './FocusMng';
import type {SoundMng} from './SoundMng';
import {EventListenerCtn} from './EventListenerCtn';
import type {T_RP_layGrp} from './GrpLayer';
import type {T_RP_layTxt} from './TxtLayer';
import {Tw} from './CmnTween';

import {Container} from 'pixi.js';


type IPageLog = {
	key		: string;
	fn		: string;
	index	: number;
	mark	: T_Mark;
	week	: boolean;
}


export class ReadingState {
	static	readonly	#sTw = new Set<Tw>;	// [wait]タグのタイマー代わりトゥイーンの追跡

	static	#rs: ReadingState;
	static	get rs() {return this.#rs}
	constructor() {ReadingState.#rs = this}

	static	#hLocalEvt2Fnc	: T_HEvt2Fnc = {};
	static	#hGlobalEvt2Fnc	: T_HEvt2Fnc = {};
	static	setEvt2Fnc(glb: boolean, key: string, fnc: T_Evt2Fnc) {
		if (glb)
			this.#hGlobalEvt2Fnc[key] = fnc;
		else this.#hLocalEvt2Fnc[key] = fnc;
	}
	static	getEvt2Fnc = (key: string): T_Evt2Fnc | undefined => this.#hLocalEvt2Fnc[key] ?? this.#hGlobalEvt2Fnc[key];
	static	clear_eventer(rawKeY: string, glb: boolean, key: string) {
		if (! rawKeY.startsWith('dom=')) return;

		const e2f = glb ? this.#hGlobalEvt2Fnc[key] : this.#hLocalEvt2Fnc[key];
		if (e2f) this.getHtmlElmList(rawKeY).el.forEach(v=> v.removeEventListener('click', e2f));
		// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
		if (glb) delete this.#hGlobalEvt2Fnc[key];
		// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
		else	delete this.#hLocalEvt2Fnc[key];
	}

	static	popLocalEvts(): T_HEvt2Fnc {
		const ret = this.#hLocalEvt2Fnc;
		this.#hLocalEvt2Fnc = {};
		return ret;
	}
	static	pushLocalEvts(h: T_HEvt2Fnc) {this.#hLocalEvt2Fnc = h}

	static	clear_event(hArg: TArg): boolean {
		const glb = argChk_Boolean(hArg, 'global', false);
		const h = glb ?this.#hGlobalEvt2Fnc :this.#hLocalEvt2Fnc;
		for (const [KeY, e2f] of Object.entries(h)) {
			if (! KeY.startsWith('dom=')) continue;

			this.getHtmlElmList(KeY).el.forEach(v=> v.removeEventListener('click', e2f));
		}
		if (glb) this.#hGlobalEvt2Fnc = {}; else this.#hLocalEvt2Fnc = {};

		return false;
	}
		static	getHtmlElmList(KeY: string): {el: NodeListOf<HTMLElement>, id: string, sel: string} {
			const idx = KeY.indexOf(':');
			let sel = '';
			if (idx >= 0) {		// key='dom=config:#ctrl2val
				const id = KeY.slice(4, idx);
				const frmnm = `const.sn.frm.${id}`;
				if (! Reading.val.getVal(`tmp:${frmnm}`, 0)) throw `HTML【${id}】が読み込まれていません`;

				const ifrm = <HTMLIFrameElement | null>document.getElementById(id);
				if (! ifrm) throw `HTML【${id}】の要素(id=${id})がありません`;
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				const win = ifrm.contentWindow!;
				sel = KeY.slice(idx +1);
				return {el: win.document.querySelectorAll(sel), id, sel};
			}

			sel = KeY.slice(4);
			return {el: document.querySelectorAll(sel), id: '', sel};
		}

	// 予約イベントの発生待ち
	static	waitRsvEvent(glb: boolean, onUserAct?: ()=> void): void {
		Reading.val.saveKidoku();

		if (onUserAct) {
			//hTag.event({key:'click', breakout: fnc});
			//hTag.event({key:'middleclick', breakout: fnc});
			//	hTag.event()は内部で使わず、こうする
			this.#hLocalEvt2Fnc.click =
			this.#hLocalEvt2Fnc.enter =
			this.#hLocalEvt2Fnc.arrowdown =

			// hTag.event({key:'downwheel', breakout: fnc});
			this.#hLocalEvt2Fnc['wheel.y>0'] = ()=> onUserAct();
		}
		else {
			delete this.#hLocalEvt2Fnc.click;
			delete this.#hLocalEvt2Fnc.enter;
			delete this.#hLocalEvt2Fnc.arrowdown;
			delete this.#hLocalEvt2Fnc['wheel.y>0'];
		}
		this.getEvt2Fnc = glb
			? key=> this.#hLocalEvt2Fnc[key]
				?? this.#hGlobalEvt2Fnc[key]
			: key=> this.#hLocalEvt2Fnc[key];

		Reading.scrItr.noticeWait();
		if (CmnLib.debugLog) console.log('🎍 wait event... %o', {
			local	: Object.keys(this.#hLocalEvt2Fnc),
			global	: Object.keys(this.#hGlobalEvt2Fnc),
		});
	}

	static	waitRsvEvent4Paging() {
		this.waitRsvEvent(true);

		if (this.aKeysAtPaging.length === 0) {
			this.getEvt2Fnc = key=>
				this.#hLocalEvt2Fnc[key]
			?? this.#hGlobalEvt2Fnc[key];
			return;
		}

		const hGlb: T_HEvt2Fnc = {};
		for (const k of this.aKeysAtPaging) {
			const v = this.#hGlobalEvt2Fnc[k];
			if (v) hGlb[k] = v;
		}
		this.getEvt2Fnc = key=> this.#hLocalEvt2Fnc[key] ?? hGlb[key];
	}


	fire(rawKeY: string, e: Event) {
		//if (this.#isDbgBreak) return;

		// 予約実行
		// meta, ctrl, alt などを除いたキー名
		const key_name = ReadingState.#REG_KEY_NAME.exec(rawKeY)?.[0] ?? '';
		const key = rawKeY.toLowerCase();
// console.log(`👺 fire<(nm:\`${key_name}\` key:\`${key}\` type:${e.type})`);
		switch (key_name) {
			case 'click':
			case 'rightclick':	// 右クリックメニューに入って出られない
			case 'middleclick':	// 〃
			case 'enter':
			case 'arrowdown':
			case 'btn':
				if (Reading.evtMng.isSkipping) break;
				if (! ReadingState.isFirstFire()) return;
				break;
		}

		if (key_name === 'enter') {
			const em = Reading.fcs.getFocus();
			if (em instanceof Container) {
				em.emit(EVNM_CLICK, new PointerEvent(EVNM_CLICK));
				return;
			}
		}

		const ke = ReadingState.getEvt2Fnc(key);
		if (! ke) return;		// 予約されていないイベントなので無視

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		e.stopImmediatePropagation?.();
		if (! key.startsWith('dom=') && Reading.layMng.clickTxtLay()) return;

		ke(e);
		//this.hLocalEvt2Fnc = {};	// ここで消去禁止、Main.resumeByJumpOrCall()が担当
	}
	static	#REG_KEY_NAME = /btn|\w+$/;	// https://regex101.com/r/WEPkLH/1
	get	skip_enabled() {return Reading.skip_enabled}
	readonly	isWait: boolean	= false;
	// イベント複数発生回避（ボタンとステージクリックなど）
	static	#wasFired	= false;
	static	isFirstFire(): boolean {
		if (ReadingState.#wasFired) return false;
		ReadingState.#wasFired = true;
		return true;
	}
	static	resetFired() {ReadingState.#wasFired = false}


	static	aPage	: IPageLog[];
	static	lenPage = 0;
	static	posPage = 0;
	static	styPaging	: string;
	static	readonly	INI_STYPAGE = 'color: yellow; text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;';

	static	aKeysAtPaging: string[]	= [];

	static	recodePage(week = false) {
		if (! Reading.val.getVal('save:sn.doRecLog')) return;

		const {fn, idx} = Reading.scrItr.nowScrIdx();
		const key = `${String(idx -1)}:`+ fn;	// 検索時の都合で -1
		if (this.aPage.findIndex(p=> p.key === key) > -1) return;	// 保存済

		if (CmnLib.debugLog) console.log(`📜 %crecodePage === week:${String(week)} lenPage:${String(this.lenPage)} len:${String(this.aPage.length)} POP:${String(this.aPage.at(-1)?.week)}`, 'color:#3B0;');

		if (this.aPage.at(-1)?.week) this.aPage.pop();
		const {max_len} = Reading.cfg.oCfg.log;	// 一定数を保つ

		// 不必要ながら巨大になりがちな情報をダミー値にする
		//	mark はページ移動処理で ReadingState_page.page() での
		//	scrItr.loadFromMark() に渡す。問題ない範囲なら変数をオミットできる
		const mark = Reading.scrItr.nowMark();
		mark.hSave['const.sn.sLog'] = '[]';

		if (this.aPage.push({key, week,
			fn		: <string>Reading.val.getVal('save:const.sn.scriptFn', fn),
			index	: <number>Reading.val.getVal('save:const.sn.scriptIdx', 0),
			mark,
		}) > max_len) this.aPage = this.aPage.slice(-max_len);
		this.lenPage = this.aPage.length;

		if (CmnLib.debugLog) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			console.log(`   %clenPage:${String(this.lenPage)} (base=${(<T_RP_layGrp>mark.hPages.base!.fore).sBkFn} 0=${(<T_RP_layGrp>mark.hPages['0']!.fore).sBkFn} mes=${String(
				/color: \w+;/.exec((<T_RP_layTxt>mark.hPages.mes?.fore).txs.cssText)
			)})%c mark:%o`, 'color:#3B0;', '', mark);
			console.table(this.aPage);
		}

		Reading.val.setVal_Nochk('sys', 'const.sn.aPageLog', JSON.stringify(this.aPage));
	}
	static	playbackPage(saPageLog: string, $styPaging: string) {
		this.aPage = <IPageLog[]>JSON.parse(saPageLog);
		this.lenPage = this.aPage.length;
		if (this.posPage >= this.lenPage) this.posPage = this.lenPage -1;
		this.styPaging = $styPaging;
	}

	beginProc() {new ReadingState_proc}
	endProc() {new ReadingState_go}


	// タグ処理
	l(hArg: TArg): boolean {
// console.log(`fn:Reading.ts [l] isKidoku:${Reading.scrItr.isKidoku} isNextKidoku:${Reading.scrItr.isNextKidoku} A:${Reading.auto_enabled} B:${Reading.skip_enabled} C:${Reading.skip_all}`);
		if (! Reading.tagL_enabled) return false;

		ReadingState.recodePage(true);

		if (Reading.auto_enabled) {	// Aスキップ時
			hArg.time = Number(Reading.val.getVal(`sys:sn.auto.msecLineWait${Reading.scrItr.isKidoku ?'_Kidoku' :''}`));
			return this.wait(hArg);
		}
		if (Reading.skip_enabled) {	// Fスキップ時
			if (! Reading.skip_all && ! Reading.scrItr.isNextKidoku) {
				Reading.cancelAutoSkip();	// 未読で停止
			}
			else if ('ps'.includes(String(Reading.val.getVal('sys:sn.skip.mode')))) {
				hArg.time = 50;	// 改行待ち=しない	// 魔法数字、見えるぐらい少し待つ
				return this.wait(hArg);
			}
		}
		// クリック待ちを表示
		if (argChk_Boolean(hArg, 'visible', true)) {
			Reading.layMng.breakLine(hArg);
			Reading.goTxt();
		}

		new ReadingState_wait4Tag(hArg);
		return true;
	}
	p(hArg: TArg): boolean {
// console.log(`fn:Reading.ts [p] isKidoku:${Reading.scrItr.isKidoku} isNextKidoku:${Reading.scrItr.isNextKidoku} A:${Reading.auto_enabled} B:${Reading.skip_enabled} C:${Reading.skip_all}`);
		ReadingState.recodePage();

		if (Reading.auto_enabled) {	// Aスキップ時
			hArg.time = Number(Reading.val.getVal(`sys:sn.auto.msecPageWait${Reading.scrItr.isKidoku ?'_Kidoku' :''}`));
			return this.wait(hArg);
		}
		if (Reading.skip_enabled) {	// Fスキップ時
			if (! Reading.skip_all && ! Reading.scrItr.isNextKidoku) {
				Reading.cancelAutoSkip();	// 未読で停止
			}
			else if ('s' === String(Reading.val.getVal('sys:sn.skip.mode'))) {
				hArg.time = 50;	// 改行待ち=しない	// 魔法数字、見えるぐらい少し待つ
				return this.wait(hArg);
			}
		}
		// クリック待ちを表示
		if (argChk_Boolean(hArg, 'visible', true)) {
			Reading.layMng.breakPage(hArg);
			Reading.goTxt();
		}

		new ReadingState_wait4Tag(hArg);
		return true;
	}
	s(hArg: TArg): boolean {
		ReadingState.recodePage();

		Reading.cancelAutoSkip();
		new ReadingState_wait4Tag(hArg);
		return true;
	}
	wait(hArg: TArg): boolean {
		const time = argChk_Num(hArg, 'time', NaN);	// skip時もエラーは出したい
		if (Reading.skip_enabled) {		// Fスキップ時
			if (! Reading.skip_all && ! Reading.scrItr.isNextKidoku) Reading.cancelAutoSkip();	// 未読で停止
			return false;
		}

		const tw = new Tw({v: 0});	// アニメではなくタイマー代わりなので中身は問わない
		const RPN_WAIT = 'wait';
		const fnc = ()=> {
			tw.stop();
			Reading.notifyEndProc(RPN_WAIT);
		};
		tw.to({v: 1}, time)
		.onComplete(fnc)
		.start();
		ReadingState.#sTw.add(tw);

		const canskip = argChk_Boolean(hArg, 'canskip', true);
		Reading.beginProc(RPN_WAIT, fnc, true, canskip ?fnc :undefined);
		// new ReadingState_wait4Tag(hArg);	// ひとまずイベント待ちはしない方向で
		return true;
	}
	page(hArg: TArg): boolean {
		if (! ('clear' in hArg || 'to' in hArg || 'style' in hArg)) throw 'clear,style,to いずれかは必須です';

		// ページ移動状態中に有効にするグローバルイベントを限定
		const {key, style} = hArg;
		if (key) ReadingState.aKeysAtPaging = key.split(',');

		if (style) {
			ReadingState.styPaging = style;
			Reading.val.setVal_Nochk('save', 'const.sn.styPaging', style);
			return false;
		}

		if (argChk_Boolean(hArg, 'clear', false)) {
			ReadingState.aPage = [];
			ReadingState.lenPage = 0;
			ReadingState.posPage = 0;
			Reading.val.setVal_Nochk('sys', 'const.sn.aPageLog', '[]');
			Reading.val.setVal_Nochk('save', 'const.sn.styPaging', ReadingState.INI_STYPAGE);
			return false;
		}

		return false;
	}


	static	destroy() {
		for (const tw of ReadingState.#sTw) tw.kill();
		ReadingState.#sTw.clear();
		this.#hLocalEvt2Fnc = {};
		this.#hGlobalEvt2Fnc = {};
		this.aPage = [];
		this.lenPage = 0;
		this.posPage = 0;
	}

}

// go 状態
//	通常・タグなどを次々に処理
class ReadingState_go extends ReadingState {
	constructor() {
		super();
		if (CmnLib.debugLog) console.log('📖 => %cReadingState_go', 'color:#3B0;');

		Reading.main.resume();
	}
	override	fire(_KeY: string, _e: Event) { /* empty */ }	// システムボタンなど無効化
}

// proc 状態
//	スクリプト・画像・音声ロードなど
class ReadingState_proc extends ReadingState {
	constructor() {
		super();
		if (CmnLib.debugLog) console.log('📖 => %cReadingState_proc', 'color:#3B0;');
	}
	override	fire(_KeY: string, _e: Event) { /* empty */ }	// システムボタンなど無効化
}

// wait 状態
//	イベント待ちやクリック待ち
export class ReadingState_wait4Tag extends ReadingState {
	constructor(hArg: TArg) {
		super();
		if (CmnLib.debugLog) console.log('📖 => %cReadingState_wait', 'color:#3B0;');

		// Reading.scrItr.noticeBreak(true);

		let onUserAct = ()=> { /* empty */ };
		const glb = argChk_Boolean(hArg, 'global', true);
		switch (hArg[':タグ名']) {
			case 'wait':	return;	// 予約イベント待ち【しない】

			case 's':
				ReadingState.waitRsvEvent(glb);	// ユーザーイベントに反応しない
				return;

			case 'p':
				onUserAct = ()=> {
					if (argChk_Boolean(hArg, 'er', false)) Reading.hTag.er(hArg);

					//scrItr.turnPage();

					new ReadingState_go;
				};
				break;

			default:	// [wait] 以外は、予約イベント待ちを開始
				onUserAct = ()=> new ReadingState_go;
		}
// console.log(`fn:Reading.ts ${hArg[':タグ名']} 予約イベント待ちを開始`);
		ReadingState.waitRsvEvent(glb, onUserAct);
	}

	override	readonly	isWait	= true;

	override page(hArg: TArg): boolean {
		const ret = super.page(hArg);	// チェックも兼ねて
		const {to} = hArg;
		if (! to) return ret;
		if (ReadingState.lenPage < 2) return false;	// 履歴がたまってない

		switch (to) {
			case 'oldest':
				hArg.to = 'prev';
				ReadingState.posPage = 1;	break;

			case 'newest':
			case 'prev':
				hArg.to = 'prev';
				ReadingState.posPage = ReadingState.lenPage -1;	break;

			// case 'next':		// スルー
			default:	return false;	// ダイアログ確認などするとここを通る
		}

		return ReadingState_page.go(hArg);
	}

}

// page 状態
//	ページ移動中
class ReadingState_page extends ReadingState {
	private	constructor() {
		super();
		if (CmnLib.debugLog) console.log('📖 => %cReadingState_page', 'color:#3B0;');
		Reading.val.setVal_Nochk('tmp', 'const.sn.isPaging', true);
	}
	static	go(hArg: TArg) {return new ReadingState_page().page(hArg)}

	#isPaging	= true;
	override	get	skip_enabled() {return this.#isPaging}

	override	readonly	isWait	= false;

	override	beginProc() {Reading.main.stop()}
	override	endProc() {Reading.main.resume()}

	// タグ処理
	override	l(hArg: TArg): boolean {
// console.log(`fn:ReadState.ts [l] len:${ReadingState.lenPage} pos:${ReadingState.posPage} isSkipping:${this.#isPaging}`);
		if (! this.#isPaging) return super.l(hArg);	// 基底 ReadingState_go 化

		// ページ末尾ならページ移動終了
		if (ReadingState.posPage === ReadingState.lenPage -1) {
			this.#exit();
			return new ReadingState_go().l(hArg);
		}

		// クリック待ちを表示
		if (argChk_Boolean(hArg, 'visible', true)) Reading.layMng.breakLine(hArg);

		Reading.layMng.setAllStyle2TxtLay(ReadingState.styPaging);
		Reading.goTxt();
		if (! ReadingState.aPage[ReadingState.posPage]?.week) return false;

		ReadingState.waitRsvEvent4Paging();
		return true;
	}
	override	p(hArg: TArg): boolean {
// console.log(`fn:ReadState.ts [p] len:${ReadingState.lenPage} pos:${ReadingState.posPage}`);
		if (! this.#isPaging) return super.p(hArg);	// 基底 ReadingState_go 化

		// ページ末尾ならページ移動終了
		if (ReadingState.posPage === ReadingState.lenPage -1) {
			this.#exit();
			return new ReadingState_go().p(hArg);
		}

		// クリック待ちを表示
		if (argChk_Boolean(hArg, 'visible', true)) Reading.layMng.breakPage(hArg);

		Reading.layMng.setAllStyle2TxtLay(ReadingState.styPaging);
		Reading.goTxt();

		ReadingState.waitRsvEvent4Paging();
		return true;
	}
	override	s(hArg: TArg): boolean {
		new ReadingState_wait4Tag(hArg);
		return true;
	}
	override	wait() {return false}
	override	page(hArg: TArg): boolean {
		const {to, style, clear} = hArg;
		if (style || clear) return false;

		if (CmnLib.debugLog) console.log(`📜 %cpage() pos:${String(ReadingState.posPage)}%c len:${String(ReadingState.lenPage)} to:${String(to)}`, 'color:#3B0;', '');
		switch (to) {
			case 'oldest':
				if (ReadingState.posPage === 0) return false;
				ReadingState.posPage = 0;	break;

			case 'prev':
				if (ReadingState.posPage === 0) return false;
				--ReadingState.posPage;	break;

			case 'next':
				if (ReadingState.posPage === ReadingState.lenPage -1) return false;
				++ReadingState.posPage;	break;

			case 'newest':
				if (ReadingState.posPage === ReadingState.lenPage -1) return false;
				ReadingState.posPage = ReadingState.lenPage -1;	break;

			case 'exit':
				ReadingState.posPage = ReadingState.lenPage -1;	break;

			case 'load':
				ReadingState.lenPage = ReadingState.posPage +1;
				ReadingState.aPage = ReadingState.aPage.slice(0, ReadingState.lenPage);
				this.#exit();
				break;

			default:	throw `属性to「${String(to)}」は異常です`;
		}
		// ページ移動状態を抜ける
		if (ReadingState.posPage === ReadingState.lenPage -1) this.#exit();

		const p = ReadingState.aPage[ReadingState.posPage];
		if (! p) throw `posPage異常:${String(ReadingState.posPage)}`;
		const {fn, index, mark} = p;
		if (CmnLib.debugLog) {
			const m = Reading.scrItr.nowMark();
			const {week} = ReadingState.aPage[ReadingState.posPage] ?? {week: false};
			console.log(`   -- fn:${fn} i:${String(index)
			} pos:${String(ReadingState.posPage)
			} (base=%c${(<T_RP_layGrp>m.hPages.base?.fore).sBkFn
			}%c 0=%c${(<T_RP_layGrp>m.hPages['0']?.fore).sBkFn
			}%c mes=%c${String(
				/color: \w+;/.exec((<T_RP_layTxt>m.hPages.mes?.fore).txs.cssText)
			)}%c) week:${String(week)} A:${String(
				ReadingState.posPage === ReadingState.lenPage -1
			)}\n   styPaging=%c${ReadingState.styPaging}%c\n   mark:%o`, 'background-color:#3B0; color:#000;', '', 'background-color:#B4F; color:#000;', '', 'color:#B68;', '', ReadingState.styPaging, '', mark);
		}
		return Reading.scrItr.loadFromMark({fn, index}, mark);
	}

	#exit() {
		Reading.val.setVal_Nochk('tmp', 'const.sn.isPaging', false);
		this.#isPaging = false;
	}
}



// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Reading {
	static	beginProc(proc_id: string, onNotify?: ()=> void, endProc = true, onClickSkip?: ()=> void) {
		if (CmnLib.debugLog) console.log(`📖.beginProc id:%c${proc_id}%c onNotify:${String(onNotify)} endProc:${String(endProc)} onClickSkip:${String(onClickSkip)}`, 'color:#3B0;', '');
		this.#clearProc();
		this.#procID = proc_id;

		// 通知時コールバック型
		if (onNotify) {
			// notifyEndProc()を呼べば callBack & EndProc する機能
			// 使用者は、処理終了時に notifyEndProc()を呼ぶ義務がある
			const {promise, resolve} = Promise.withResolvers<string>();
			void promise.then((proc_id: string)=> {
				if (CmnLib.debugLog) console.log(`📖.callBack id:%c${proc_id}%c`, 'color:#3B0;', '');
				onNotify();
				if (endProc) this.endProc(proc_id); else this.#clearProc();
			});
			this.#rsNotify = resolve;
		}

		// クリックキャンセル機能
		if (onClickSkip) {
			const fnc = ()=> {
				this.cancelAutoSkip();
				onClickSkip();
				if (endProc) this.endProc(proc_id);
			};
			this.#elc.add(this.main.cvs, EVNM_CLICK, (e: PointerEvent)=> {
				e.stopPropagation();
				fnc();
			});
			this.#elc.add(document, EVNM_KEY, (e: KeyboardEvent)=> {
				if (e.isComposing) return; // サポートしてない環境でもいける書き方
				e.stopPropagation();
				fnc();
			});
			this.procWheel4wle(this.#elc, fnc);
		}

		ReadingState.rs.beginProc();
		// main.stop() は外の責任
	}
		static	#clearProc() {
			this.#procID = '';
			this.#rsNotify = ()=> { /* empty */ };
			this.#elc.clear();
		}
		static	readonly	#elc = new EventListenerCtn;

	static	#rsNotify	: (proc_id: string)=> void	= ()=> { /* empty */ };
	static	notifyEndProc(proc_id: string) {
		if (CmnLib.debugLog) console.log(`📖.notifyEndProc id:%c${proc_id}%c=${String(this.#procID === proc_id)}`, 'color:#3B0;', '');
		if (this.#procID !== proc_id) return;

		this.#rsNotify(proc_id);
	}

	static	endProc(proc_id: string) {
		if (CmnLib.debugLog) console.log(`📖.endProc id:%c${proc_id}%c=${String(this.#procID === proc_id)}`, 'color:#3B0;', '');
		if (this.#procID !== proc_id) return;

		ReadingState.rs.endProc();
		this.#clearProc();
	}
		static	#procID	= '';
		static	get procID() {return `RP_${this.scrItr.scriptFn}:${String(this.scrItr.idxToken)}_`}


	static	fire(KeY: string, e: Event, cancelAutoSkip = false) {
		if (cancelAutoSkip) this.cancelAutoSkip();
		ReadingState.rs.fire(KeY, e);
	}

	static	get	isSkipping() {return ReadingState.rs.skip_enabled}
	static	get	isWait() {return ReadingState.rs.isWait}	// 予約イベントの発生待ち中か


		static	tagL_enabled	= true;		// 頁末まで一気に読み進むか(l無視)
		static	skip_all		= false;	// falseなら既読のみをスキップ
		static	skip_enabled	= false;	// 次の選択肢(/未読)まで進むが有効か
		static	auto_enabled	= false;	// 自動読みすすみモードかどうか


	static	cfg		: Config;
	static	hTag	: T_HTag;
	static	main	: T_Main;
	static	val		: T_Variable;
	static	scrItr	: ScriptIterator;
	static	layMng	: LayerMng;
	static	goTxt = ()=> { /* empty */ };
	static	get needGoTxt() {return this.layMng.needGoTxt}
	static	evtMng	: EventMng;
	static	sndMng	: SoundMng;
	static	procWheel4wle	: (elc: EventListenerCtn, onIntr: ()=> void)=> void;

	static	fcs		: FocusMng;

	static	init(cfg: Config, hTag: T_HTag, main: T_Main, val: T_Variable, scrItr: ScriptIterator, layMng: LayerMng, evtMng: EventMng, sndMng: SoundMng, procWheel4wle: (elc: EventListenerCtn, onIntr: ()=> void)=> void) {
		this.cfg = cfg;
		this.hTag = hTag;
		this.main = main;
		this.val = val;
		this.scrItr = scrItr;
		this.layMng = layMng;
		this.goTxt = ()=> layMng.goTxt();
		this.evtMng = evtMng;
		this.sndMng = sndMng;
		this.procWheel4wle = procWheel4wle;

		val.defTmp('sn.tagL.enabled', ()=> this.tagL_enabled);
		val.defValTrg('tmp:sn.tagL.enabled', (_, v)=> {this.tagL_enabled = String(v) !== 'false'});
		val.defTmp('sn.skip.all', ()=> this.skip_all);
		val.defValTrg('tmp:sn.skip.all', (_, v)=> {this.skip_all = String(v) !== 'false'});
		val.defTmp('sn.skip.enabled', ()=> this.skip_enabled);
		val.defValTrg('tmp:sn.skip.enabled', (_, v)=> {this.skip_enabled = String(v) !== 'false'});
		val.defTmp('sn.auto.enabled', ()=> this.auto_enabled);
		val.defValTrg('tmp:sn.auto.enabled', (_, v)=> {this.auto_enabled = String(v) !== 'false'});

		hTag.l			= o=> ReadingState.rs.l(o);		// 行末クリック待ち
		hTag.p			= o=> ReadingState.rs.p(o);		// 改ページクリック待ち
		hTag.s			= o=> ReadingState.rs.s(o);		// 停止する
		hTag.wait		= o=> ReadingState.rs.wait(o);	// ウェイトを入れる
		hTag.waitclick	= o=> ReadingState.rs.s(o);		// クリックを待つ
		hTag.page		= o=> ReadingState.rs.page(o);	// ページ移動

		new ReadingState_proc;
		hTag.jump({fn: 'main'});
	}
	static	setFcs(fcs: FocusMng) {this.fcs = fcs}

	static	destroy() {ReadingState.destroy()}

	static	cancelAutoSkip() {
		if (! this.tagL_enabled) {	// 頁末まで一気に読み進むか(l無視)
			this.tagL_enabled = true;
			this.val.setVal_Nochk('tmp', 'sn.tagL.enabled', true);
		}

		if (this.skip_enabled) {		// 次の選択肢(/未読)まで進むが有効か
			this.skip_enabled = false;
			this.val.setVal_Nochk('tmp', 'sn.skip.enabled', false);
		}
		if (this.auto_enabled) {		// 自動読みすすみモードかどうか
			this.auto_enabled = false;
			this.val.setVal_Nochk('tmp', 'sn.auto.enabled', false);
		}
	}

}
