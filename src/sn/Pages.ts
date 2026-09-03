/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {TArg} from './Grammar';
import type {T_Variable} from './CmnInterface';
import type {Layer} from './Layer';
import type {SysBase} from './SysBase';
import {argChk_Boolean} from './CmnLib';

import type {Container} from 'pixi.js';


export class Pages {
	#pg: {fore: Layer, back: Layer};

	constructor(layname: string, readonly cls: string, fore: Container, back: Container, readonly hArg: TArg, readonly sys: SysBase, readonly val: T_Variable, readonly ret: {isWait: boolean}) {
		const fncF = sys.hFactoryCls[cls];
		if (! fncF) throw `属性 class【${cls}】が不正です`;

		const f = fncF();
		const b = fncF();
		f.layname =
		b.layname = layname;
		const nm = hArg[':id_tag'] = `layer:${layname} cls:${cls} page:`;
		f.ctn.name = f.name = nm +'A';
		b.ctn.name = b.name = nm +'B';
		fore.addChild(f.ctn);
		back.addChild(b.ctn);
		argChk_Boolean(hArg, 'visible', true);	// SKYNovelではデフォルトはtrueとする
		ret.isWait = f.lay(hArg) || b.lay(hArg);
		this.#pg = {fore: f, back: b};
		back.visible = false;

		// 組み込み変数 const.sn.lay.<層名>.<fore|back>.<属性>
		const valnm = `const.sn.lay.${layname}`;
		val.setVal_Nochk('tmp', valnm, true);
		const hGetter: {[prop: string]: (l: Layer)=> number | boolean} = {
			alpha:		l=> l.alpha,
			height:		l=> l.height,
			visible:	l=> l.ctn.visible,
			width:		l=> l.width,
			x:			l=> l.x,
			y:			l=> l.y,
		};
		for (const side of ['fore', 'back'] as const) {
			for (const [prop, get] of Object.entries(hGetter)) {
				val.defTmp(`${valnm}.${side}.${prop}`, ()=> get(this.#pg[side]));
			}
		}
	}
	destroy() {
		this.#pg.fore.destroy();
		this.#pg.back.destroy();
	}

	readonly lay = (hArg: TArg)=> this.getPage(hArg).lay(hArg);
	readonly getPage = (hArg: TArg)=>
		Pages.argChk_page(hArg, 'fore') !== 'back'
			? this.#pg.fore
			: this.#pg.back;
	static	argChk_page(hash: TArg, def: string): string {
		const v = hash.page ?? def;
		if (v === 'fore' || v === 'back') {hash.page = v; return v}

		throw Error('属性 page【'+ v +'】が不正です');
	}
	get fore(): Layer {return this.#pg.fore}
	get back(): Layer {return this.#pg.back}

	transPage(aPrm: Promise<void>[]): void {
		[this.#pg.back, this.#pg.fore] = [this.#pg.fore, this.#pg.back];
		this.#pg.back.copy(this.#pg.fore, aPrm);
	}

}
