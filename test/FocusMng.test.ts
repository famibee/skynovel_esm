/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {GlobalRegistrator} from '@happy-dom/global-registrator';
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (! globalThis.document) GlobalRegistrator.register();

import {FocusMng} from '../src/sn/FocusMng';
import type {SysBase} from '../src/sn/SysBase';


// add()/remove()が対になっているかを見る。実際のリスナ本数ではなく
//	「addした回数 − removeした回数」を数えれば、非対称はそのまま差として出る
function mkElm() {
	const el = document.createElement('input');
	el.type = 'checkbox';
	let n = 0;
	const oAdd = el.addEventListener.bind(el);
	const oRmv = el.removeEventListener.bind(el);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	el.addEventListener	= (...a: any[])=> {++n; (<any>oAdd)(...a)};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	el.removeEventListener	= (...a: any[])=> {--n; (<any>oRmv)(...a)};
	return {el, live: ()=> n};
}

function mkFcs() {
	return new FocusMng(
		document.createElement('canvas'),
		<SysBase>{isApp: false},	// #blurSub の分岐にしか使わない
	);
}

const on = ()=> true;
const off = ()=> { /* empty */ };


it('add_registers_focus_and_key', ()=> {
	const {el, live} = mkElm();
	const fcs = mkFcs();

	fcs.add(el, on, off);
	expect(live()).toBe(2);	// focus と keydown
});

it('remove_unregisters_listeners', ()=> {
	const {el, live} = mkElm();
	const fcs = mkFcs();

	fcs.add(el, on, off);
	fcs.remove(el);
	expect(live()).toBe(0);	// 外さないと #elc に溜まり、要素も掴んだままになる
});

it('add_remove_cycles_do_not_accumulate', ()=> {
	const {el, live} = mkElm();
	const fcs = mkFcs();

	// [set_focus add='dom=…']→[set_focus del='dom=…']の往復。
	//	重複チェックは #aBtn しか見ないので、remove()の後の add()は素通りする
	for (let i=0; i<5; ++i) {
		fcs.add(el, on, off);
		fcs.remove(el);
	}
	expect(live()).toBe(0);
});

it('destroy_unregisters_listeners', ()=> {
	const {el, live} = mkElm();
	const fcs = mkFcs();

	fcs.add(el, on, off);
	fcs.destroy();
	expect(live()).toBe(0);
});

it('allOff_drops_detached_element', ()=> {
	const {el, live} = mkElm();
	const fcs = mkFcs();

	document.body.appendChild(el);
	fcs.add(el, on, off);
	expect(fcs.getFocus()).toBe(null);	// #idx が -1 のうちは null

	fcs.next();	// #idx を進めて輪に入れる
	expect(fcs.getFocus()).toBe(el);

	// 文書から外れた要素は「破棄済み」として輪から間引かれる。
	//	pixi の Container を親なしで捨てる時と同じ扱い
	el.remove();
	expect(fcs.getFocus()).toBe(null);
	expect(live()).toBe(0);
});
