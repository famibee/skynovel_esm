/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {TArg} from './Grammar';
import {SndCtx} from './SndCtx';

// =============== Global
export function int(o: unknown): number {return parseInt(String(o), 10)}
export function uint(o: unknown): number {
	const v = parseInt(String(o), 10);
	return v < 0 ? -v : v;
}

export function getDateStr(spl_dd = '/', spl_dt = ' ', spl_tt = ':', spl_ms = ''): string {
	const now = new Date;
	return String(now.getFullYear())
		+ spl_dd+ String(100 +now.getMonth() +1).slice(1, 3)
		+ spl_dd+ String(100 +now.getDate()).slice(1, 3)
		+ spl_dt+ String(100 +now.getHours()).slice(1, 3)
		+ spl_tt+ String(100 +now.getMinutes()).slice(1, 3)
		+ (spl_ms === '' ?'' :spl_ms+ String(now.getMilliseconds()));
}


const	css_key4del	= '/* SKYNovel */';
export function initStyle() {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const he = document.getElementsByTagName('head')[0]!;
	const len = he.children.length;
	for (let i=len -1; i>=0; --i) {
		const v = he.children[i];
		if (! (v instanceof HTMLStyleElement)) continue;
		if (! v.innerText.startsWith(css_key4del)) continue;
		he.removeChild(v);
	}
}
export function addStyle(style: string) {
	const gs = document.createElement('style');
	gs.innerHTML = css_key4del + style;
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	document.getElementsByTagName('head')[0]!.appendChild(gs);
}



// =============== EventMng
export const EVNM_BUTTON= 'pointerdown';
export const EVNM_CLICK	= 'pointerdown';
export const EVNM_KEY	= 'keydown';

import type {Container} from 'pixi.js';
export type IEvtMng = {
	button(hArg: TArg, ctnBtn: Container, normal: ()=> void, hover: ()=> boolean, clicked: ()=> void): void;
	unButton(em: Container): void;
	get	isSkipping(): boolean;
	hideHint(): void;
	cvsResize(): void;

	resvFlameEvent(body: HTMLBodyElement): void;
}



// =============== ScriptIterator
export	const	RPN_COMP_CHIN = 'compChIn';



type T_HASH_Arg = {
	':タグ名'?	: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[name: string]: any;
};

export	function argChk_Num(hash: T_HASH_Arg, name: string, def: number): number {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const v = hash[name];
	if (! (name in hash)) {
		if (isNaN(def)) throw `[${hash[':タグ名'] ?? ''}]属性 ${name} は必須です`;

		hash[name] = def;
		return def;
	}

	const n = String(v).startsWith('0x')
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		? parseInt(v)
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		: parseFloat(v);
	if (isNaN(n)) throw `[${hash[':タグ名'] ?? ''}]属性 ${name} の値【${String(v)}】が数値ではありません`;

	hash[name] = n;
	return n;
}

/*
	それぞれの型を Boolean 型に変換した場合の値は以下のようになります。

	Undefiend 	false
	Null 		false
	Boolean 	変換前のオブジェクトと同じ
	Number 		0 または NaN は false それ以外の値は true
	String 		空文字列は false  それ以外の値は true
	Object 		true
*/
export	function argChk_Boolean(hash: T_HASH_Arg, name: string, def: boolean): boolean {
	//	t-r-a-c-e(Boolean(null),Boolean(""),Boolean(undefined),Boolean("0"),Boolean("1"),Boolean("true"),Boolean("false"),Boolean("あい"));
	//	[exec] false false false true true true true true
	/*console.log('%o %o %o %o %o %o %o %o',
		Boolean(null), Boolean(""), Boolean(undefined), Boolean("0"), Boolean("1"),
		Boolean("true"), Boolean("false"), Boolean("あい"));
	*/

	//if (! hArg[name]) return hArg[name] = def;
	if (! (name in hash)) {hash[name] = def; return def;}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const v = hash[name];
	if (v === null) return false;

	const v2 = String(v);
	const ret = hash[name] = v2 === 'false'? false : Boolean(v2);
	return ret;
}


export function parseColor(v: string): number {
	if (v.startsWith('#')) return parseInt(v.slice(1), 16);
	const n = Number(v);
	if (! isNaN(n)) return n;	// 0, 0xffffff

	if (v === 'black') return 0;
	CmnLib.cc4ColorName.fillStyle = v;
	const cc = CmnLib.cc4ColorName.fillStyle;
	if (cc === '#000000') throw `色名前 ${v} が異常です`;

	return parseInt(cc.slice(1), 16);
}
export	function argChk_Color(hash: T_HASH_Arg, name: string, def: number): number {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const v = hash[name];
	if (! v) {hash[name] = def; return def;}

	const ret = hash[name] = parseColor(String(v));
	return ret;
}


const REG_ERRMES_JSON = /JSON at position (\d+)$/;
	// Unexpected number in JSON at position
export	function mesErrJSON(hArg: TArg, nm = '', mes = ''): string {
	const col = (REG_ERRMES_JSON.exec(mes) ?? ['',''])[1];
	return `[${hArg[':タグ名'] ?? ''}] ${nm} 属性の解析エラー : ${mes}
${
	// eslint-disable-next-line @typescript-eslint/no-base-to-string
	String(hArg[<keyof TArg>nm])
}${col ?`
${'^'.padStart(Number(col))}` :''}`;
}


const REG_FN	= /^[^/.]+$|[^/]+(?=\.)/;
	// https://regex101.com/r/8sltIm/1
export	function getFn(p: string) {return (REG_FN.exec(p) ?? [''])[0]}

export type T_DIP = {[name: string]: string};

//import {isMobile} from 'pixi.js';		// 使い物にならないことを確認済み
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class CmnLib {
	// 実行環境の判別。**本家は platform.js を読んでいたが、bestiejs/platform.js が
	// Public archive（更新停止）のため UA文字列からの正規表現判定へ切り替え**
	// （移植元 bluesnovel `src/sn/CmnLib.ts:167-184`）。
	// 組み込み変数 `const.sn.platform`（CmnInterface.ts）も本家のJSONではなく
	// UA文字列そのものになる（`const.sn.platform.os.family` のような使い方は元々無い）
	static	init() {
		const ua = globalThis.navigator.userAgent;
		this.platform	= ua;
		this.plat_desc	= ua;
		// Chrome系もUAに"Safari"を含むので、他ブラウザの名前が無いことまで見る
		this.isSafari	= /safari/i.test(ua) && ! /chrome|chromium|crios|edg|android|fxios/i.test(ua);
		this.isFirefox	= /firefox|fxios/i.test(ua);
		// 本家は os.family が'OS X'を含むか。iOSは別family（'iOS'）なのでMac扱いにしない
		this.isMac		= /macintosh|mac os x/i.test(ua) && ! /iphone|ipad|ipod/i.test(ua);
		// 本家は「WindowsでもOS Xでもない」＝携帯機扱い。同じ結果になる書き方にする
		this.isMobile	= ! /windows|macintosh|mac os x/i.test(ua) || /iphone|ipad|ipod|android/i.test(ua);
	}

	static	stageW		= 0;
	static	stageH		= 0;
	static	debugLog	= false;
	static	platform	: string;
	static	plat_desc	: string;
	static	isSafari	: boolean;
	static	isFirefox	: boolean;
	static	isMac		: boolean;
	static	isMobile	: boolean;
	static	hDip		: T_DIP	= {};
	static	isDbg		= false;
	static	isPackaged	= false;

	// 判定専用に別のAudioContextを持たず、実際の再生に使うSndCtxのctxをそのまま見る
	//	（howler撤去に伴い、以前ここに専用contextを1個newしていた実装をSndCtxへ委譲した）
	static	needClick2Play(): boolean {return SndCtx.needClick2Play()}

	static	isDarkMode	= false;

	static	cc4ColorName: CanvasRenderingContext2D;

}
