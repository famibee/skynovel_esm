/* eslint-disable no-irregular-whitespace */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {argChk_Boolean, argChk_Num} from './CmnLib';
import type {TArg} from './Grammar';

import type {Rectangle} from 'pixi.js';


export type IChRect = {
	ch		: string;
	rect	: Rectangle;
	elm		: HTMLElement;
}

export type T_RP_Hyphenation = {
	行頭禁則?		: string;
	行末禁則?		: string;
	分割禁止?		: string;
	ぶら下げ?		: string;
	break_fixed		: boolean;
	break_fixed_left: number;
	break_fixed_top	: number;
	bura			: boolean;
}


const def行頭禁則	= '、。，．）］｝〉」』】〕”〟ぁぃぅぇぉっゃゅょゎァィゥェォッャュョヮヵヶ！？!?‼⁉・ーゝゞヽヾ々';
const def行末禁則	= '［（｛〈「『【〔“〝';
const def分割禁止	= '─‥…';
const defぶら下げ	= def行頭禁則;

const defReg行頭禁則	= new RegExp(`[${def行頭禁則}]`);
const defReg行末禁則	= new RegExp(`[${def行末禁則}]`);
const defReg分割禁止	= new RegExp(`[${def分割禁止}]`);
const defRegぶら下げ	= defReg行頭禁則;


export class Hyphenation {
	#s行頭禁則		= def行頭禁則;
	#s行末禁則		= def行末禁則;
	#s分割禁止		= def分割禁止;
	#sぶら下げ		= defぶら下げ;
	get 行頭禁則() {return this.#s行頭禁則}
	get 行末禁則() {return this.#s行末禁則}
	get 分割禁止() {return this.#s分割禁止}
	get ぶら下げ() {return this.#sぶら下げ}

	#reg行頭禁則	= defReg行頭禁則;
	#reg行末禁則	= defReg行末禁則;
	#reg分割禁止	= defReg分割禁止;
	#regぶら下げ	= defRegぶら下げ;

	break_fixed		= false;
	break_fixed_left= 0;
	break_fixed_top	= 0;
	bura			= false;
	lay(hArg: TArg) {
		if (hArg.kinsoku_sol) {
			this.#s行頭禁則 = hArg.kinsoku_sol;
			this.#reg行頭禁則 = new RegExp(`[${this.#s行頭禁則}]`);
		}
		if (hArg.kinsoku_eol) {
			this.#s行末禁則 = hArg.kinsoku_eol;
			this.#chk禁則の競合_ぶら行末();
			this.#reg行末禁則 = new RegExp(`[${this.#s行末禁則}]`);
		}
		if (hArg.kinsoku_dns) {
			this.#s分割禁止 = hArg.kinsoku_dns;
			this.#chk禁則の競合_ぶら分禁();
			this.#reg分割禁止 = new RegExp(`[${this.#s分割禁止}]`);
		}
		if (hArg.kinsoku_bura) {
			this.#sぶら下げ = hArg.kinsoku_bura;
			this.#chk禁則の競合_ぶら行末();
			this.#chk禁則の競合_ぶら分禁();
			this.#regぶら下げ = new RegExp(`[${this.#sぶら下げ}]`);
		}
		if ('bura' in hArg) this.bura = argChk_Boolean(hArg, 'bura', false);

		this.break_fixed		= argChk_Boolean(hArg, 'break_fixed', this.break_fixed);
		this.break_fixed_left	= argChk_Num(hArg, 'break_fixed_left', this.break_fixed_left);
		this.break_fixed_top	= argChk_Num(hArg, 'break_fixed_top', this.break_fixed_top);
	}
		// 禁則の競合（ぶら下げ と 行末禁則 の両方に含まれる文字があってはならない）
		#chk禁則の競合_ぶら行末() {
			// 処理速度最適化で主従を変える。長い方をネイティブにやらせる
			const len行末禁則 = this.#s行末禁則.length;
			const lenぶら下げ = this.#sぶら下げ.length;
			if (len行末禁則 < lenぶら下げ) {
				for (let i=0; i<len行末禁則; ++i) {
					const c = this.#s行末禁則[i];
					if (this.#sぶら下げ.includes(c!)) throw `禁則の競合があります。文字 ${String(c)} がぶら下げ と 行末禁則 の両方に含まれます`;
				}
			}
			else {
				for (let i=0; i<lenぶら下げ; ++i) {
					const c = this.#sぶら下げ[i];
					if (this.#s行末禁則.includes(c!)) throw `禁則の競合があります。文字 ${String(c)} がぶら下げ と 行末禁則 の両方に含まれます`;
				}
			}
		}
		// 禁則の競合（ぶら下げ と 分割禁止 の両方に含まれる文字があってはならない）
		#chk禁則の競合_ぶら分禁() {
			// 処理速度最適化で主従を変える。長い方をネイティブにやらせる
			const len分割禁止 = this.#s分割禁止.length;
			const lenぶら下げ = this.#sぶら下げ.length;
			if (len分割禁止 < lenぶら下げ) {
				for (let i=0; i<len分割禁止; ++i) {
					const c = this.#s分割禁止[i];
					if (this.#sぶら下げ.includes(c!)) throw `禁則の競合があります。文字 ${String(c)} がぶら下げ と 分割禁止 の両方に含まれます`;
				}
			}
			else {
				for (let i=0; i<lenぶら下げ; ++i) {
					const c = this.#sぶら下げ[i];
					if (this.#s分割禁止.includes(c!)) throw `禁則の競合があります。文字 ${String(c)} がぶら下げ と 分割禁止 の両方に含まれます`;
				}
			}
		}

	reNew(to: Hyphenation) {
		to.#genKinsoku(this.#s行頭禁則, this.#s行末禁則, this.#s分割禁止, this.#sぶら下げ);

		to.break_fixed		= this.break_fixed;
		to.break_fixed_left	= this.break_fixed_left;
		to.break_fixed_top	= this.break_fixed_top;
		to.bura				= this.bura;
	}
		#genKinsoku(s行頭禁則: string, s行末禁則: string, s分割禁止: string, sぶら下げ: string) {
			if (this.#s行頭禁則	!== s行頭禁則) {
				this.#s行頭禁則	= s行頭禁則;
				this.#reg行頭禁則 = new RegExp(`[${s行頭禁則}]`);
			}
			if (this.#s行末禁則	!== s行末禁則) {
				this.#s行末禁則	= s行末禁則;
				this.#reg行末禁則 = new RegExp(`[${s行末禁則}]`);
			}
			if (this.#s分割禁止	!== s分割禁止) {
				this.#s分割禁止	= s分割禁止;
				this.#reg分割禁止 = new RegExp(`[${s分割禁止}]`);
			}
			if (this.#sぶら下げ	!== sぶら下げ) {
				this.#sぶら下げ	= sぶら下げ;
				this.#regぶら下げ = new RegExp(`[${sぶら下げ}]`);
			}
		}
	record() {
		const o: T_RP_Hyphenation = {
			break_fixed			: this.break_fixed,
			break_fixed_left	: this.break_fixed_left,
			break_fixed_top		: this.break_fixed_top,
			bura				: this.bura,
		};
		if (this.#s行頭禁則 === def行頭禁則) o.行頭禁則 = this.#s行頭禁則;
		if (this.#s行末禁則 === def行末禁則) o.行末禁則 = this.#s行末禁則;
		if (this.#s分割禁止 === def分割禁止) o.分割禁止 = this.#s分割禁止;
		if (this.#sぶら下げ === defぶら下げ) o.ぶら下げ = this.#sぶら下げ;
			// デフォルト値と同じならJSONで省略
		return o;
	}
	playback(hLay?: T_RP_Hyphenation) {
		if (! hLay) return;		// 途中追加なので

		this.#genKinsoku(
			hLay.行頭禁則 ?? def行頭禁則,
			hLay.行末禁則 ?? def行末禁則,
			hLay.分割禁止 ?? def分割禁止,
			hLay.ぶら下げ ?? defぶら下げ,
		);

		this.break_fixed		= hLay.break_fixed;
		this.break_fixed_left	= hLay.break_fixed_left;
		this.break_fixed_top	= hLay.break_fixed_top;
		this.bura				= hLay.bura;
	}

	hyph(htmTxt: HTMLSpanElement, cnvRect :(rng: Range, ch: string)=> Rectangle, tategaki: boolean, begin: number, bkHtm: string): [IChRect[], number] {
		let a: IChRect[];
		let len = 0;
		let i = 2;		// 本来 1 だがひと文字目の行頭禁則文字を無視したいので
		let fncFirstChk = (len: number)=> {
			fncFirstChk = ()=> false;

			if (begin === len) {	// 右クリック戻りなどで文字表示が崩れる件の対応
				if (begin > 0) htmTxt.innerHTML = bkHtm.replaceAll('class="sn_ch"', 'class="sn_ch sn_ch_in_default"');
				return true;
			}
			return len < 2;
		};
//console.log(`🎴禁則処理判定ループ begin:${begin}`);
		do {
			a = this.#getChRects(htmTxt, cnvRect);
			len = a.length;
			if (fncFirstChk(len)) break;

			// 禁則処理判定ループ
			let sl_xy = -Infinity;	// 前回のxy
//console.log(`- len:${len} a_ch:${a.map((v, i)=> v.elm.tagName === 'RT' ?[] :[i, v.ch])}:`);
			for (; i<len; ++i) {
				const {elm, rect, ch} = a[i]!;
				if (elm.tagName === 'RT') continue;	// ルビはスキップ

				const xy = tategaki ?rect.y :rect.x;
//if (sl_xy > 790)
//console.log(`🎴 sl_xy:${sl_xy.toFixed(2)} xy:${xy.toFixed(2)} i:${i} ch:${ch}: rect:(${rect.left.toFixed(2)}, ${rect.top.toFixed(2)}, ${rect.width.toFixed(2)}, ${rect.height.toFixed(2)})`);
				if (sl_xy <= xy	// 【 < 】では[tcy]二文字目を誤判定する
				// [r]による改行後は追い出し処理をしないように
				|| elm.previousElementSibling?.tagName === 'SPAN'
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
				&&	elm.previousElementSibling?.innerHTML.includes('<br>')
				// <span class="offrec"> 〜 </span> 外し
				|| elm.parentElement?.previousElementSibling?.tagName === 'SPAN'
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
				&&	elm.parentElement?.previousElementSibling?.innerHTML.includes('<br>')) {
					sl_xy = xy;
					if (! this.break_fixed) {
						this.break_fixed_left = rect.x;
						this.break_fixed_top = rect.y;
					}
					continue;
				}
/*
	// [r]などの改行はこう。TxtLayer.#tagCh_sub()により <span> に入れられる
	<span class=​"sn_ch" style=​"display:​ inline;​animation-delay:​ 10ms;​">
		<br>
	​</span>

	// 上記が下記に囲まれている場合もある。previousElementSibling 使用時は注意
	<span class="offrec"> 〜 </span>


	// 禁則処理による自動改行はこう
	<br>
*/

				const p_i = this.#i2pi(a, i);
				const {elm: p_elm, rect: p_rect, ch: p_ch} = a[p_i]!;
//console.log(`🎴 === 自動改行発生！ 前文字:${p_i}:${p_ch}:%o 今文字:${i}:${ch}:(${ch.charCodeAt(0).toString(16)})%o`, a[p_i].elm, a[i].elm);
				if (! this.break_fixed) {
					this.break_fixed_left = p_rect.x;
					this.break_fixed_top = p_rect.y;
					const sty = globalThis.getComputedStyle(p_elm);
					const rs = parseFloat(sty.fontSize);
					if (tategaki)	this.break_fixed_top += rs;
					else			this.break_fixed_left += rs;
				}

				sl_xy = -Infinity;	// 自動改行発生！
				const oldI = i;
				const {cont, ins} = this.bura
					? this.hyph_alg_bura(a, p_i, p_ch, i)
					: this.hyph_alg(a, p_i, p_ch, i, ch);
				i = ins;
//console.log(`🎴 === cont:${cont} ins:${i} :${a[i].ch}:%o の前に改行を挿入`, a[i].elm);
				if (cont) continue;

				// 改行挿入
				const elm2 = a[i]!.elm;
				const pal = elm2.parentElement!;
				const br = document.createElement('br');
				if (pal.classList.contains('sn_tx')) pal.insertBefore(br, elm2); else {
					const ppal = pal.parentElement!;
					if (ppal.classList.contains('sn_ch')) {
						ppal.parentElement!.insertBefore(br, ppal);
					}
					else ppal.insertBefore(br, pal);
				}

				i += 2;	// いま追加した<br>のぶんと、次へ行く +1
				if (i < oldI) i = oldI;	// 永久ループ防御
				len = -1;	// doループ先頭に戻る
				break;
			}
		} while (len < 0);

		return [a, len];
	}
		// 一つ前の要素を探す（ルビ対応）
		#i2pi(a: IChRect[], i: number): number {
			const p_i = i -1;
			const {elm} = a[p_i]!;
			if (elm.tagName !== 'RT') return p_i -(
				elm.style.textCombineUpright === 'all'
				? Array.from(elm.textContent).length -1
				: 0
			);

			return p_i -Array.from(elm.textContent).length;
				// サロゲートペア対策
		}

	#getChRects(elm: Node, cnvRect :(range: Range, ch: string)=> Rectangle): IChRect[] {	// 注意）再帰関数
		const ret: IChRect[] = [];
		if (elm.nodeType !== elm.TEXT_NODE) return Array.from(elm.childNodes).map(v=> this.#getChRects(v, cnvRect)).flat();

		const rng = elm.ownerDocument!.createRange();
		rng.selectNodeContents(elm);
		let pos = 0;
		const end = rng.endOffset;
		// できれば一文字ずつ「after-edge - baseline」を調べたいが、暫定手段を取る
		//const styles = globalThis.getComputedStyle(this.htmTxt);
		//console.log('lh:'+ styles.lineHeight +' fs:'+ styles.fontSize);
		while (pos < end) {
			rng.setStart(elm, pos);
			rng.setEnd(elm, ++pos);
			const ch = rng.toString();
			ret.push({
				ch,
				rect: cnvRect(rng, ch),
				elm	: rng.startContainer.parentElement!,
			});
		}
		rng.detach();

		return ret;
	}

	/**
	 * 抽象化した禁則処理アルゴリズム
	 * @method hyph_alg
	 * @param {IChRect[]} a - 文章の抽象化配列
	 * @param {number} p_i - 処理要素の一つ前の添字
	 * @param {string} p_ch - 処理要素の一つ前の文字
	 * @param {number} i - 処理要素の添字
	 * @param {string} ch - 処理要素の文字
	 * @return {Object} result 戻り値
	 * @return {boolean} result.cont - true: 呼び元で改行挿入せず continue
	 * @return {number} result.ins - 手前に改行を挿入すべき要素の添字
	 */
	hyph_alg(	// テスト用にpublic
		a	: IChRect[],
		p_i	: number,
		p_ch: string,
		ii	: number,	// i >= 2
		ch	: string,
	): {cont: boolean, ins: number} {
		// 追い出し走査
		let i = ii;
		if (this.#reg行末禁則.test(p_ch)) { /* empty */ }	// 一つ前
		else if (this.#reg行頭禁則.test(ch)) {	//（現在地 -> 前方走査）
			while ((i = this.#i2pi(a, i)) >= 0) {
				if (! this.#reg行頭禁則.test(a[i]!.ch)) break;// 行頭禁則はスキップ
			}
		}
		else if (p_ch === ch && this.#reg分割禁止.test(p_ch)) { /* empty */ }// 一つ前＆現在地
		else return {cont: true, ins: i +1};	// 追い出しなし

		// 追い出しによる新行末二次判定（一つ前 -> 前方走査）
		i = p_i;
		while ((i = this.#i2pi(a, i)) >= 0) {
			if (! this.#reg行末禁則.test(a[i]!.ch)) break;	// 行末禁則はスキップ
		}
		return {cont: false, ins: i +1};
	}

	/**
	 * 抽象化した禁則処理アルゴリズム
	 * @method hyph_alg
	 * @param {IChRect[]} a - 文章の抽象化配列
	 * @param {number} p_i - 処理要素の一つ前の添字
	 * @param {string} p_ch - 処理要素の一つ前の文字
	 * @param {number} i - 処理要素の添字
	 * @return {Object} result 戻り値
	 * @return {boolean} result.cont - true: 呼び元で改行挿入せず continue
	 * @return {number} result.ins - 手前に改行を挿入すべき要素の添字
	 */
	hyph_alg_bura(	// テスト用にpublic
		a	: IChRect[],
		p_i	: number,
		p_ch: string,
		i	: number,	// i >= 2
	): {cont: boolean, ins: number} {
		const pp_i = this.#i2pi(a, p_i);	// 改行後のルビで追い出し発生
		const {ch: pp_ch} = a[pp_i]!;
//console.log(`🎴 hyph_alg_bura pp:${pp_i}:${pp_ch}: p:${p_i}:${p_ch}: i:${i}:${a[i].ch}:`);
		// 改行前二個目に「ぶら下げ」がある
		if (this.#regぶら下げ.test(pp_ch) || this.#reg行頭禁則.test(pp_ch)) {
			let j = p_i;
			// 改行前にも「ぶら下げ」がある
			if (this.#regぶら下げ.test(p_ch) || this.#reg行頭禁則.test(p_ch)) ++j;

			// ぶら下げ後……追い出し走査
			const p_j = this.#i2pi(a, j);	// pp_i ではない
			const {ch: last_ch} = a[p_j]!;	// 行末
			const {ch: head_ch} = a[j]!;		// 行頭
			// 分割禁止
			if (last_ch === head_ch && this.#reg分割禁止.test(head_ch)) return {cont: false, ins: p_j};

			if (! this.#reg行末禁則.test(last_ch)) return {cont: false, ins: j};
			// 行末禁則
			j = p_j;
			do {
				if (! this.#reg行末禁則.test(a[j]!.ch)) break;	// 行禁はスキップ
			} while ((j = this.#i2pi(a, j)) >= 0);
			return {cont: false, ins: j +1};	// 行末禁則
		}

		// 改行前二個目に「ぶら下げ」がない
		const ppp_i = this.#i2pi(a, pp_i);
		if (i >= 3) {
			const {ch: ppp_ch} = a[ppp_i]!;
//console.log(`-- 改行前二個目に「ぶら下げ」がない ppp:${ppp_i}:${ppp_ch}: pp:${pp_i}:${pp_ch}: i:${i}`);
			// 改行前二個目に「分割禁止」
			if (this.#reg分割禁止.test(pp_ch)) {	// 分割禁止
//console.log(`   == 改行前二個目に「分割禁止」:${ppp_ch === pp_ch}`);
				if (ppp_ch === pp_ch) return {cont: false, ins: ppp_i};
			}
			// 改行前三個目に「行末禁則」
			if (this.#reg行末禁則.test(ppp_ch)) {	// 行末禁則
				let j = ppp_i;
//console.log(`   == 改行前三個目に「行末禁則」 j:${j}:${a[j].ch}:`);
				while ((j = this.#i2pi(a, j)) >= 0) {
//console.log(`      -- ch:${a[j].ch}`);
					if (! this.#reg行末禁則.test(a[j]!.ch)) break;// 行禁はスキップ
				}
//console.log(`   === j:${j +1}:${a[j +1].ch}: tn:${a[j +1].elm.parentElement?.tagName}`);
				return {cont: false, ins: j +1};	// 行末禁則
			}
		}

		return {cont: false, ins: pp_i};
	}

}
