/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2020-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, EVNM_KEY} from './CmnLib';
import {EventListenerCtn} from './EventListenerCtn';
import type {SysBase} from './SysBase';

import {Container} from 'pixi.js';

type IFocusBtn = {
	btn	: Container | HTMLElement;
	on	: ()=> boolean;
	off	: ()=> void;
	offEvt	: ()=> void;	// add()で張ったリスナの解除。remove()時に必須
}


export class FocusMng {
	#aBtn	: IFocusBtn[]	= [];
	#idx					= -1;
	readonly	#elc		= new EventListenerCtn;

	constructor(cvs: HTMLCanvasElement, sys: SysBase) {
		this.#blurSub = sys.isApp
		? ()=> cvs.focus()
		: ()=> globalThis.focus();
	}
	destroy() {this.#aBtn = []; this.#idx = -1; this.#elc.clear()}

	add(cmp: Container | HTMLElement, on: ()=> boolean, off: ()=> void) {
//console.log(`fn:FocusMng.ts line:62 ADD idx:${this.aBtn.length} local:${(cmp as HTMLElement).localName} type:${(cmp as HTMLInputElement).type} cmp:%o`, cmp);
		// 重複チェック
		if (this.#aBtn.findIndex(b=> b.btn === cmp) >= 0) return;
		const fncFocus = ()=> {
			for (let i=this.#aBtn.length -1; i>=0; --i) {
				if (this.#aBtn[i]!.btn === cmp) {this.#idx = i; return}
			}
			this.#idx = -1;
		};
		if (cmp instanceof Container) {
			// フレーム部品に【 if (btn instanceof HTMLElement) 】が上手く使えない
			cmp.on('pointerdown', fncFocus);

			this.#aBtn.push({btn: cmp, on, off,
				offEvt: ()=> {cmp.off('pointerdown', fncFocus)}});
			return;
		}

		const offFocus = this.#elc.add(cmp, 'focus', fncFocus);

		let fnc = (_: KeyboardEvent)=> { /* empty */ };
		let fnc4EnterSwitch: (e: KeyboardEvent)=> boolean
		= cmp.localName === 'button' || cmp.localName === 'a'
			? e=> ! e.isTrusted && e.key === 'Enter'
			: e=> e.key === 'Enter';
			// Enterで全画面スイッチは切り替わるが画面が全画面化しない対応
		const inp = <HTMLInputElement>cmp;
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		switch (inp.type ?? '') {
	//	switch (btn.getAttribute('type') ?? '') {	// textareaで''になる
			case 'checkbox':	fnc = ()=> {inp.checked = ! inp.checked};	break;
			case '':
				// ラジオボタン
				if (cmp.querySelectorAll('input[type]').length > 0) {
					fnc = e=> this.#radio_next(cmp, e.key);
					fnc4EnterSwitch = ()=> false;
				}
				break;
			case 'range':
				fnc = e=> {
					if (e.isTrusted) return;	// Gamepadのみ処理したい
					if (e.key === 'ArrowUp') inp.stepUp(); else inp.stepDown();
				};
				break;
			case 'text':
			case 'textarea':
				fnc = e=> {
					if (e.isTrusted) return;	// Gamepadのみ処理したい
					let cur = (inp.selectionStart ?? 0)
						+(e.key === 'ArrowUp' ?-1 :1);
					if (cur < 0) cur = 0;
					inp.setSelectionRange(cur, cur);
				};
				break;
		}
		const offKey = this.#elc.add(cmp, EVNM_KEY, (e: KeyboardEvent)=> {
			if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown'
			&& e.key !== 'Enter') return;

			e.stopImmediatePropagation();
			if (fnc4EnterSwitch(e)) {
				cmp.dispatchEvent(new MouseEvent('click'));
				return;
			}
			fnc(e);
		}, {passive: true});

		// spanなどでもフォーカスを持つように
		if (! cmp.hasAttribute('tabindex')) cmp.tabIndex = 0;

		this.#aBtn.push({btn: cmp, on, off,
			offEvt: ()=> {offFocus(); offKey()}});
	}
	remove(cmp: Container | HTMLElement) {
		const idx = this.#aBtn.findIndex(b=> b.btn === cmp);
		if (idx < 0) return;
		this.#aBtn[idx]!.offEvt();	// リスナも外さないと #elc に溜まり続ける
		this.#aBtn.splice(idx, 1);
		if (this.#aBtn.length === 0) this.#idx = -1;
		else if (idx <= this.#idx) --this.#idx;	// -1 でもOK
	}
	#radio_next(elm: HTMLElement, key: string) {
		const op = elm.querySelectorAll('input[type]');
		const len = op.length;
		for (let i=0; i<len; ++i) {
			if (! (<HTMLInputElement>op[i]!).checked) continue;

			(<HTMLInputElement>op[(i +len +(key === 'ArrowUp' ?-1 :1)) %len]!).checked = true;
			break;
		}
	}

	isFocus(cmp: Container | HTMLElement) {
		if (this.#idx < 0) return false;	//  || this.aBtn.length === 0 は略できる
		return this.#aBtn[this.#idx]!.btn === cmp;
	}

	prev() {
		this.#allOff();
		const len = this.#aBtn.length;
		if (len === 0) return;

		if (--this.#idx < 0) this.#idx = len -1;
		for (let i=len; i>=1; --i) {
			const j = (this.#idx +i) % len;
			if (this.#aBtn[j]!.on()) {this.#idx = j; this.#logFocus(j); return}
		}
		this.#idx = -1;
	}
	next() {
		this.#allOff();
		const len = this.#aBtn.length;
		if (len === 0) return;

		if (++this.#idx >= len) this.#idx = 0;
		for (let i=0; i<len; ++i) {
			const j = (this.#idx +i) % len;
			if (this.#aBtn[j]!.on()) {this.#idx = j; this.#logFocus(j); return}
		}
		this.#idx = -1;
	}
	readonly	#logFocus = CmnLib.debugLog
		? (i: number)=> console.log(`👾 <FocusMng idx:${String(i)} btn:%o`, this.#aBtn[i]!.btn)
		: ()=> { /* empty */ };
	getFocus(): Container | HTMLElement | null {
		if (this.#idx < 0) return null;

		this.#allOff();
		if (this.#aBtn.length === 0) {this.#idx = -1; return null}
			// #allOff()が破棄済みを間引くので、空になり得る

		if (this.#idx >= this.#aBtn.length) this.#idx = 0;
		const b = this.#aBtn[this.#idx]!;
		return b.on() ?b.btn : null;
	}

	blur() {this.#allOff(); this.#idx = -1; this.#blurSub()}
	readonly	#blurSub = ()=> { /* empty */ }
	#allOff() {
		for (let i=this.#aBtn.length -1; i>=0; --i) {
			const b = this.#aBtn[i]!;
			if (this.#isAlive(b.btn)) {b.off(); continue}

			b.offEvt();	// 破棄済み。リスナごと外さないと掴んだままになる
			this.#aBtn.splice(i, 1);
		}
	}
		// 表示ツリーから外れた（＝もう使われない）btn か判定する。
		// Container の親なし判定と同じ方針を HTMLElement にも適用する
		#isAlive(btn: Container | HTMLElement) {
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (btn instanceof Container) return Boolean(btn.parent);

			// フレーム内要素は、iframe が再読込されると isConnected が
			// true のままなので、文書が生きているかも併せて見る
			return btn.isConnected && Boolean(btn.ownerDocument.defaultView);
		}

}
