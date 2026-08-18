/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {int} from './CmnLib';
import type {T_PropParser, T_Variable, T_VAL_DATA, Scope} from './CmnInterface';

type IFncCalc = (a: any[]) => any
type IHFncCalc = { [key: string]: IFncCalc; }

export type T_RET_getValName = {
	scope?	: Scope;
	name	: string;
	at?		: string;
}

// 式トークン1件。NUM/NULL/BOOL/STRはvに評価済みのASTリーフ（['!num!', 値]等）を、
//	FUNCは関数名、VARは変数参照の生テキストを持つ。それ以外（演算子・括弧）はtだけで判別できる
type T_TOK = {t: string; v?: any[] | string};

// 変数参照 hA['args'] / hB[1 + 4] の添字部分（中身は未解決の生テキストのまま）
const REG_BRACKETS = /\[[^\]]+\]/g;

// 2項演算子の優先順位表（値が大きいほど強く結合）。演算子文字列がそのままASTのopcode
//	（#hFncのキー）になる。right:trueは右結合（例：2**3**2 は 2**(3**2)）
const H_BINOP: {[op: string]: {bp: number; right?: boolean}} = {
	'**':	{bp: 13, right: true},
	'*':	{bp: 12}, '/': {bp: 12}, '¥': {bp: 12}, '%': {bp: 12},
	'+':	{bp: 11}, '-': {bp: 11},
	'>>>':	{bp: 10}, '<<': {bp: 10}, '>>': {bp: 10},
	'<=':	{bp: 9}, '<': {bp: 9}, '>=': {bp: 9}, '>': {bp: 9},
	'===':	{bp: 8}, '!==': {bp: 8}, '==': {bp: 8}, '!=': {bp: 8},
	'&':	{bp: 7},
	'^':	{bp: 6},
	'|':	{bp: 5},
	'&&':	{bp: 4},
	'||':	{bp: 3},
	':':	{bp: 2, right: true},	// 三項演算子の一部。単独でも構文上は成立し、意味エラーは#hFncの':'が出す
	'?':	{bp: 1, right: true},
};


export class PropParser implements T_PropParser {
	readonly #ce: string;
	// 「"〜"」「'〜'」「#〜#」の三種。#〜#は引用符自体を書きたい場合に使う
	readonly #reStr: RegExp;
	// 変数名（名前空間以外は「空白・演算子記号以外の全て」を許す＝非ASCII文字はそのまま通す）。
	//	「.」区切り・「[...]」添字を繰り返せる
	readonly #reVar = /^(?:(?:tmp|sys|save|mp):)?[^\s!-/:-@[-^`{-~]+(?:\.[^\s!-/:-@[-^`{-~]+|\[[^\]]+\])*/;

	constructor(private readonly val: T_Variable, ce = '\\') {
		this.#ce = ce;
		// (new RegExp("~")) の場合は、バックスラッシュは２つ必要
		this.#reStr = new RegExp(`^(?:"(?:\\${ce}["'#\\n]|[^"])*"|'(?:\\${ce}["'#\\n]|[^'])*'|\\#(?:\\${ce}["'#\\n]|[^#])*\\#)`);
			// https://regex101.com/r/Fs5wL3/1
			// 15 matches (279 steps, 0.1ms) by PCRE2
	}

	// 文字列を左から走査してトークン列へ分解する。数値・null・true/false・文字列・関数呼び出し・
	//	変数参照・各演算子記号の順に、その場所で最初にマッチしたものを採る（旧parsimmon版の
	//	alt()の試行順をそのまま踏襲。例：数値を変数名より先に試すので "123abc" は数値"123"で
	//	止まり "abc" が余って構文エラーになる、等の挙動もそのまま）。認識できない文字が
	//	出てきたら例外（呼び出し元の#parseToAst()が構文エラーへ丸める）
	#tokenize(s: string): T_TOK[] {
		const aTok: T_TOK[] = [];
		let pos = 0;
		while (pos < s.length) {
			const c = s.charCodeAt(pos);
			if (c === 32 || c === 9 || c === 10 || c === 13) {++pos; continue}	// 空白類

			const rest = s.slice(pos);
			let m: RegExpExecArray | null;

			// 数値：16進 → 小数 → 整数の順。頭の符号はUnaryNegateが持つのでここでは見ない
			if ((m = /^0x[0-9a-fA-F]+/.exec(rest))
			 || (m = /^(0|[1-9][0-9]*)\.[0-9]+/.exec(rest))) {
				aTok.push({t: 'NUM', v: ['!num!', Number(m[0])]}); pos += m[0].length; continue;
			}
			if ((m = /^(0|[1-9][0-9]*)/.exec(rest))) {
				aTok.push({t: 'NUM', v: ['!num!', int(m[0])]}); pos += m[0].length; continue;
			}

			// null・true/false（単語境界のチェックは無い）
			if (rest.startsWith('null')) {aTok.push({t: 'NULL', v: ['!str!', null]}); pos += 4; continue}
			if ((m = /^(true|false)/.exec(rest))) {
				aTok.push({t: 'BOOL', v: ['!bool!', m[0] === 'true']}); pos += m[0].length; continue;
			}

			// 文字列リテラル
			if ((m = this.#reStr.exec(rest))) {
				aTok.push({t: 'STR', v: ['!str!', m[0].slice(1, -1).replaceAll(this.#ce, '')]});
				pos += m[0].length; continue;
			}

			// 演算子・括弧。3文字→2文字→1文字の順（最長一致）。
			//	**変数参照より先に見る**：'¥'（整数除算）は非ASCIIのため変数名の文字クラス
			//	（空白・ASCII記号以外は全部許す）にも該当してしまい、後回しにすると変数名として
			//	食われてしまう（"10 ¥ 4" が壊れる）
			const three = rest.slice(0, 3);
			if (three === '>>>' || three === '===' || three === '!==') {
				aTok.push({t: three}); pos += 3; continue;
			}
			const two = rest.slice(0, 2);
			if (['**', '++', '--', '>>', '<<', '<=', '>=', '==', '!=', '&&', '||'].includes(two)) {
				aTok.push({t: two}); pos += 2; continue;
			}
			const one = rest.charAt(0);
			if ('()!~*/%+-<>&^|:?¥'.includes(one)) {aTok.push({t: one}); ++pos; continue}

			// 関数呼び出し：ASCII識別子の直後（空白無し）に'('が来たときだけ
			const mFunc = /^[A-Za-z_][A-Za-z0-9_]*/.exec(rest);
			if (mFunc && rest.charAt(mFunc[0].length) === '(') {
				aTok.push({t: 'FUNC', v: mFunc[0]}); pos += mFunc[0].length; continue;
			}

			// 変数参照。末尾の@strはVarStore側の自動キャスト抑制フラグなのでそのまま含めて渡す
			if ((m = this.#reVar.exec(rest))) {
				let text = m[0];
				if (rest.slice(text.length, text.length + 4) === '@str') text += '@str';
				aTok.push({t: 'VAR', v: text}); pos += text.length; continue;
			}

			throw Error(`(PropParser)不明な文字【${one}】です`);
		}
		return aTok;
	}

	// トークン列をAST（[opcode, ...operand]の入れ子配列。リーフは['!num!'|'!str!'|'!bool!', 値]）へ。
	//	優先順位登坂法（Pratt parser）
	#parseToAst(s: string): any[] {
		const aTok = this.#tokenize(s);
		let i = 0;
		const peek = ()=> aTok[i];

		const parseAtom = (): any[]=> {
			const tok = aTok[i++];
			if (! tok) throw Error('(PropParser)式が終端しています');

			switch (tok.t) {
			case 'NUM': case 'NULL': case 'BOOL': case 'STR': return tok.v as any[];
			case 'VAR': return this.#resolveVar(tok.v as string);
			case 'FUNC': {
				if (peek()?.t !== '(') throw Error('(PropParser)関数呼び出しには開き括弧「(」が要ります');
				++i;
				const arg = parseExpr(0);
				if (peek()?.t !== ')') throw Error('(PropParser)関数呼び出しの閉じ括弧「)」がありません');
				++i;
				return [tok.v as string, arg];
			}
			case '(': {
				const inner = parseExpr(0);
				if (peek()?.t !== ')') throw Error('(PropParser)閉じ括弧「)」がありません');
				++i;
				return inner;
			}
			default: throw Error(`(PropParser)想定外のトークン【${tok.t}】です`);
			}
		};

		// 後置 ++ / --（構文としては受けるが#hFncが評価時に未サポート例外を出す）
		const parsePostfix = (): any[]=> {
			let node = parseAtom();
			for (;;) {
				const t = peek()?.t;
				if (t === '++') {++i; node = ['PostfixInc', node]; continue}
				if (t === '--') {++i; node = ['PostfixDec', node]; continue}
				break;
			}
			return node;
		};

		// 前置 ! ~ ++ -- -（UnaryNegate）。自分自身を再帰して連続した前置演算子を束ねる
		//	（例：「- - -4」）
		const parseUnary = (): any[]=> {
			const t = peek()?.t;
			if (t === '!') {++i; return ['!', parseUnary()]}
			if (t === '~') {++i; return ['~', parseUnary()]}
			if (t === '++') {++i; return ['PrefixInc', parseUnary()]}
			if (t === '--') {++i; return ['PrefixDec', parseUnary()]}
			if (t === '-') {++i; return ['UnaryNegate', parseUnary()]}
			return parsePostfix();
		};

		const parseExpr = (minBp: number): any[]=> {
			let left = parseUnary();
			for (;;) {
				const tok = peek();
				const info = tok && H_BINOP[tok.t];
				if (! info || info.bp < minBp) break;
				++i;
				const right = parseExpr(info.right ? info.bp : info.bp + 1);
				left = [tok!.t, left, right];
			}
			return left;
		};

		const result = parseExpr(0);
		if (i !== aTok.length) throw Error('(PropParser)余分なトークンが残っています');
		return result;
	}

	// 変数参照1件をASTリーフへ。[...]添字は中身を独立した式として先に評価し、
	//	「.」区切りの名前へ組み立て直してから引く
	#resolveVar(b: string): any[] {
		const s = b.replaceAll(REG_BRACKETS, v=> '.'+ this.parse(v.slice(1, -1)));
		const v = this.val.getVal(s);
		if (v === null || v === undefined) return ['!str!', v];	// v == null は eqeqeq違反
		if (typeof v === 'boolean') return ['!bool!', v];

		return Object.prototype.toString.call(v) === '[object String]'
			? ['!str!', String(v)]
			: ['!num!', Number(v)];
	}

	parse(s: string): T_VAL_DATA {
		let a: any[];
		try {a = this.#parseToAst(s)}
		catch {throw Error(`(PropParser)文法エラー【${s}】`)}

		if (a[0] === '!str!') return this.#procEmbedVar(a[1]);
		return this.#calc(a);
	}
	#calc(a: any[]): T_VAL_DATA {
		const elm = a.shift();
		if (elm instanceof Array) return this.#calc(elm);

		const fnc = this.#hFnc[elm];
		return fnc ?fnc(a) :Object(null);
	}
	#hFnc: IHFncCalc = {
		'!num!': a=> a.shift(),
		'!str!': a=> this.#procEmbedVar(a.shift()),
		'!bool!':a=> a.shift(),

		PostfixInc:	_=> {throw Error('(PropParser)後置インクリメントは未サポートです')},
		PostfixDec:	_=> {throw Error('(PropParser)後置デクリメントは未サポートです')},
		PrefixInc:	_=> {throw Error('(PropParser)前置インクリメントは未サポートです')},
		PrefixDec:	_=> {throw Error('(PropParser)前置デクリメントは未サポートです')},

		// 論理 NOT
		'!':	a=> ! this.#hFnc.Boolean!(a),
		// チルダ演算子（ビット反転）
		'~':	a=> ~ Number(this.#calc(a.shift())),

//		UnaryNegate:	a=> -Number(this.#calc(a.shift())),
		UnaryNegate:	a=> -this.#hFnc.Number!(a),
	//	Unaryplus:		a=> this.#hFnc['Number'](a),

		// 乗算、除算、剰余
		'**':	a=> Number(this.#calc(a.shift())) **
					Number(this.#calc(a.shift())),
		'*':	a=> Number(this.#calc(a.shift())) *
					Number(this.#calc(a.shift())),
		'/':	a=> Number(this.#calc(a.shift())) /
					Number(this.#calc(a.shift())),
		'¥':	a=> Math.floor( this.#hFnc['/']!(a) ),
		'%':	a=> Number(this.#calc(a.shift())) %
					Number(this.#calc(a.shift())),

		// 加算、減算、文字列の連結
		'+':	a=> {
			const b = this.#calc(a.shift());
			const c = this.#calc(a.shift());
			return Object.prototype.toString.call(b) === '[object String]'
				|| Object.prototype.toString.call(c) === '[object String]'
					? String(b) + String(c) : Number(b) + Number(c);
		},
		'-':	a=> Number(this.#calc(a.shift())) -
					Number(this.#calc(a.shift())),

		// 関数
		'int':		a=> int(this.#fncSub_ChkNum(a.shift())),
		'parseInt':	a=> int(this.#hFnc.Number!(a)),
		'Number':	a=> {
			const b = this.#calc(a.shift());
			return Object.prototype.toString.call(b) === '[object String]'
				? this.#fncSub_ChkNum(this.#parseToAst(String(b)))
				: Number(b);
		},
		'Boolean':	a=> {
			const b = a.shift();
			return b[0] === '!bool!'
				? Boolean( b[1] )
				: Boolean(this.#calc(b));
		},
		'ceil':		a=> Math.ceil( this.#fncSub_ChkNum(a.shift()) ),
		'floor':	a=> Math.floor( this.#fncSub_ChkNum(a.shift()) ),
		'round':	a=> Math.round( this.#fncSub_ChkNum(a.shift()) ),
		'isNaN':	a=> Number.isNaN( this.#fncSub_ChkNum(a.shift()) ),

		// ビットシフト
		'<<':	a=> Number(this.#calc(a.shift())) <<
					Number(this.#calc(a.shift())),
		'>>':	a=> Number(this.#calc(a.shift())) >>
					Number(this.#calc(a.shift())),
		'>>>':	a=> Number(this.#calc(a.shift())) >>>
					Number(this.#calc(a.shift())),

		// 等値、非等値、厳密等価、厳密非等価
		'<':	a=> Number(this.#calc(a.shift())) <
					Number(this.#calc(a.shift())),
		'<=':	a=> Number(this.#calc(a.shift())) <=
					Number(this.#calc(a.shift())),
		'>':	a=> Number(this.#calc(a.shift())) >
					Number(this.#calc(a.shift())),
		'>=':	a=> Number(this.#calc(a.shift())) >=
					Number(this.#calc(a.shift())),

		// 小なり、以下、大なり、以上
		'==':	a=> {
			const b = this.#calc(a.shift());
			const c = this.#calc(a.shift());
			// eslint-disable-next-line eqeqeq
			return b == null && c == null
				// eslint-disable-next-line eqeqeq
				? b == c : String(b) === String(c);
		},
		'!=':	a=> ! this.#hFnc['==']!(a),
		'===':	a=> {
			const b = this.#calc(a.shift());
			const c = this.#calc(a.shift());
			// eslint-disable-next-line eqeqeq
			return Object.prototype.toString.call(b) !=
					Object.prototype.toString.call(c)
					? false : String(b) === String(c);
		},
		'!==':	a=> ! this.#hFnc['===']!(a),

		// ビット演算子
		'&':	a=> Number(this.#calc(a.shift())) &
					Number(this.#calc(a.shift())),
		'^':	a=> Number(this.#calc(a.shift())) ^
					Number(this.#calc(a.shift())),
		'|':	a=> Number(this.#calc(a.shift())) |
					Number(this.#calc(a.shift())),

		// 論理 AND,OR
		'&&':	a=> String(this.#calc(a.shift())) === 'true' &&
					String(this.#calc(a.shift())) === 'true',
		'||':	a=> String(this.#calc(a.shift())) === 'true' ||
					String(this.#calc(a.shift())) === 'true',

		// 条件
		'?':	a=> {
			const cond = this.#hFnc.Boolean!(a);
			const elm2 = a.shift();
			if (elm2[0] !== ':') throw Error('(PropParser)三項演算子の文法エラーです。: が見つかりません');

			return this.#calc(elm2[cond ?1 :2]);
		},
		':':	()=> {throw Error('(PropParser)三項演算子の文法エラーです。? が見つかりません')},
	}
	#fncSub_ChkNum(v: any[]): number {
		const b = this.#calc(v);
		if (Object.prototype.toString.call(b) !== '[object Number]') throw Error('(PropParser)引数【'+ String(b) +'】が数値ではありません');
		return Number(b);
	}

	readonly #REG_EMBEDVAR
		= /(\$((tmp|sys|save|mp):)?[^\s!--/:-@[-^`{-~]+|#\{[^}]+})/g;
	#procEmbedVar(b: any): any {
		if (b === null || b === undefined) return b;
			// b == null は eqeqeq違反

		return String(b).replaceAll(
			this.#REG_EMBEDVAR,
			v=> String(v.startsWith('$')
				? this.val.getVal(v.slice(1))
				: this.parse(v.slice(2, -1)))
		);
	}


	getValAmpersand = (val: string)=> val.startsWith('&')
		? String(this.parse(val.slice(1)))
		: val;


	static	readonly	#REG_VAL
		= /^((?<scope>\w+?):)?(?<name>[^\s :@]+)(?<at>@str)?$/;
		// 522 match 18413 step(~10ms) https://regex101.com/r/tmCKuE/1
			// →これは改良しようがない。いい意味で改善の余地なし
	static	getValName(arg_name: string): T_RET_getValName | null {
		const e = this.#REG_VAL.exec(arg_name.trim());
		const g = e?.groups;
		if (! g) return null;

		const {scope='tmp', name, at=''} = <T_RET_getValName>g;
		if (! PropParser.#A_SCOPE.includes(scope)) throw `[変数に値セット] scopeが異常【${scope}】です`;
		return {
			scope,
			name	: PropParser.#getValName_B2D(name),
			at,
		};
	}
	static	readonly	#A_SCOPE = ['tmp', 'sys', 'save', 'mp'];

	static	#getValName_B2D(str: string): string {
		let i = 0, e = 0, s = str;
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		while (true) {
			i = s.indexOf('["');
			if (i < 0) {
				i = s.indexOf('[\'');
				if (i < 0) break;

				e = s.indexOf('\']', i+2);
			}
			else {
				e = s.indexOf('"]', i+2);
			}
			if (e < 0) break;

			s = s.slice(0, i) +'.'+ s.slice(i+2, e)
				+ s.slice(e+2);
			i = e-2;	// -3+1
		}

		return s;
	}

}
