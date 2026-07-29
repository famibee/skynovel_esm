/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// リソースリーク検査用の計装。**src/ には一切手を入れない**方針の中核。
//	ブラウザAPI側を包んで「生存数」を数え、テストは「同じ操作をN回繰り返しても
//	増えないこと」だけを見る。絶対値は PixiJS のTicker等で変わるので当てにしない。
//
//	【重要】このモジュールは src/ より先に評価されないと、モジュール読み込み時に
//	張られるリスナを取りこぼす。main.ts の import 順で保証している
//	（ESモジュールは import の記述順に評価される）。

// ---- addEventListener / removeEventListener -------------------------------
//	リークするのは「寿命の長い相手（document/window/フレーム内要素）に張りっぱなし」の物。
//	`once:true` は発火時にブラウザが内部で外すため removeEventListener を経由せず、
//	数えると際限なく増えて偽陽性になる。よって **once は最初から数えない**
//	（TxtStage の文字送りが1文字ごとに使うため、混ぜると信号が埋もれる）。
//	`signal` 付きは abort で内部削除されるので、abort を購読して減らす。

type T_LSN = EventListenerOrEventListenerObject;

const origAdd	= EventTarget.prototype.addEventListener;
const origRmv	= EventTarget.prototype.removeEventListener;

// 相手ごとに `${type}|${capture}` → リスナ集合。相手がGCされれば一緒に消えるよう WeakMap
const wmLsn = new WeakMap<EventTarget, Map<string, Set<T_LSN>>>();

const keyOf = (type: string, opt?: boolean | AddEventListenerOptions)=>
	`${type}|${String(typeof opt === 'object' ? Boolean(opt.capture) : Boolean(opt))}`;

function del(ed: EventTarget, k: string, fnc: T_LSN) {
	const m = wmLsn.get(ed);
	m?.get(k)?.delete(fnc);
}

EventTarget.prototype.addEventListener = function(
	type: string, fnc: T_LSN | null, opt?: boolean | AddEventListenerOptions,
) {
	if (fnc && ! (typeof opt === 'object' && opt.once)) {
		const k = keyOf(type, opt);
		let m = wmLsn.get(this);
		if (! m) {m = new Map(); wmLsn.set(this, m)}
		let s = m.get(k);
		if (! s) {s = new Set(); m.set(k, s)}
		s.add(fnc);	// Set なので、DOMと同じく同一(type,fnc,capture)の重複登録は1件

		// signal 付きは abort でブラウザが内部削除する。包んだ側を通らないので購読して合わせる
		//	（ここで包んだ addEventListener を使うと自己再帰するため orig を直に呼ぶ）
		const sig = typeof opt === 'object' ? opt.signal : undefined;
		if (sig) origAdd.call(sig, 'abort', ()=> {del(this, k, fnc)}, {once: true});
	}
	return origAdd.call(this, type, fnc, opt);
};

EventTarget.prototype.removeEventListener = function(
	type: string, fnc: T_LSN | null, opt?: boolean | EventListenerOptions,
) {
	if (fnc) del(this, keyOf(type, opt), fnc);
	return origRmv.call(this, type, fnc, opt);
};


// ---- requestAnimationFrame ------------------------------------------------
//	「予約済みで未発火」の数。自己再帰するループ（CmnTween）は常に1件を保つので、
//	Main を作り直しても増えなければ多重化していない、と言える

const origRaf = globalThis.requestAnimationFrame.bind(globalThis);
const origCaf = globalThis.cancelAnimationFrame.bind(globalThis);
const sRaf = new Set<number>();

globalThis.requestAnimationFrame = (cb: FrameRequestCallback)=> {
	const id = origRaf(t=> {sRaf.delete(id); cb(t)});
	sRaf.add(id);
	return id;
};
globalThis.cancelAnimationFrame = (id: number)=> {sRaf.delete(id); origCaf(id)};


// ---- URL.createObjectURL --------------------------------------------------
//	revoke されるまで Blob は解放されない。自動削除の仕組みが無いので、
//	こちらは相手を選ばず全体を数えられる（＝最も素直な指標）

const origCre = URL.createObjectURL.bind(URL);
const origRev = URL.revokeObjectURL.bind(URL);
const sBlob = new Set<string>();

URL.createObjectURL = (o: Blob | MediaSource)=> {
	const u = origCre(o);
	sBlob.add(u);
	return u;
};
URL.revokeObjectURL = (u: string)=> {sBlob.delete(u); origRev(u)};


// ---- 公開 ------------------------------------------------------------------

// 数える相手の指定。フレーム内も見られるようにする
export type T_TARGET = {
	sel		: 'document' | 'window' | 'body' | string;	// それ以外はCSSセレクタ
	frame?	: string;	// iframeのid。その文書の中を探す
};

function resolve({sel, frame}: T_TARGET): EventTarget | null {
	let doc: Document | null = document;
	if (frame) {
		const f = <HTMLIFrameElement | null>document.getElementById(frame);
		doc = f?.contentDocument ?? null;
		if (! doc) return null;
	}
	switch (sel) {
		case 'document':	return doc;
		case 'window':		return frame ?doc.defaultView :globalThis;
		case 'body':		return doc.body;
		default:			return doc.querySelector(sel);
	}
}

const probe = {
	// 対象に張られたままのリスナ数。type を渡すとその種類だけ
	countLsn(t: T_TARGET, type?: string): number {
		const ed = resolve(t);
		if (! ed) return -1;	// 相手が見つからない。0 と区別する

		const m = wmLsn.get(ed);
		if (! m) return 0;

		let n = 0;
		for (const [k, s] of m) if (! type || k.slice(0, k.lastIndexOf('|')) === type) n += s.size;
		return n;
	},
	rafPending	: ()=> sRaf.size,
	blobLive	: ()=> sBlob.size,
	blobList	: ()=> [...sBlob],
	// main.ts が howler を注入する（src/ と同一モジュール実体を掴むため）
	howls		: ()=> -1,
};

export type T_PROBE = typeof probe;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).__probe = probe;
