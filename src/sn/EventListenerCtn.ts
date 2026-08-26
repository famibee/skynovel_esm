/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {utils} from 'pixi.js';

type IEmitter = utils.EventEmitter | {
	addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
	removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}


export class EventListenerCtn {	// リソースリーク対策
	#sOffEvt	= new Set<()=> void>();

	// 戻り値は個別解除関数。add と remove が対になる用途では必ず呼ぶ事。
	// clear()を待つ作りだと、#sOffEvt が肥大し対象要素も掴んだままになる
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	add(ed: IEmitter, type: string, fnc: (e: any)=> void, ctx: AddEventListenerOptions = {}): ()=> void {
		let off: ()=> void;
		if (ed instanceof utils.EventEmitter) {
			ed.on(type, fnc, ctx);
			off = ()=> {ed.off(type, fnc, ctx)};
		}
		else {
			ed.addEventListener(type, fnc, ctx);
			off = ()=> {ed.removeEventListener(type, fnc, {capture: ctx.capture ?? false})};
		}
		this.#sOffEvt.add(off);

		return ()=> {
			if (! this.#sOffEvt.delete(off)) return;	// 二重解除・clear()済みを弾く

			off();
		};
	}

	clear(): void {
		for (const f of this.#sOffEvt) f();
		this.#sOffEvt.clear();
	}

	get	isEmpty() {return this.#sOffEvt.size === 0}

}
