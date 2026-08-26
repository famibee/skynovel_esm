/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {argChk_Boolean, getFn, CmnLib, argChk_Num, RPN_COMP_CHIN} from './CmnLib';
import type {T_HTag, TArg, Script, TTag} from './Grammar';
import type {T_Main, T_Variable, T_Mark, T_PropParser, T_HEvt2Fnc} from './CmnInterface';
import {creSAVEDATA} from './CmnInterface';
import type {Config} from './Config';
import {CallStack, creCSArg, creMP, type ICallStackArg} from './CallStack';
import {Grammar, tagToken2Name_Args, tagToken2Name} from './Grammar';
import {AnalyzeTagArg} from './AnalyzeTagArg';
import {RubySpliter} from './RubySpliter';
import type {EventMng} from './EventMng';
import type {LayerMng} from './LayerMng';
import {DebugMng} from './DebugMng';
import type {SoundMng} from './SoundMng';
import type {SysBase} from './SysBase';
import {SEARCH_PATH_ARG_EXT} from './ConfigBase';
import {CmnTween} from './CmnTween';
import {Reading, ReadingState} from './Reading';
import {BUF_BGM} from './SndBuf';

import {Loader} from 'pixi.js';

type HScript = {
	[fn: string]: Script;
}

type ISeek = {
	idx		: number;
	ln		: number;
}


const enum BreakState {Running, Wait, Break, Breaking, Step, Stepping, StepOuting, StepOut}

const enum SndProcOnLoad {
	MINIMAL_STOP,
	NO_TOUCH,
	ALL_STOP_AND_PLAY,
}


export class ScriptIterator {
	#script		: Script	= {aToken: [''], len: 1, aLNum: [1]};

	#scriptFn	= '';
	get scriptFn() {return this.#scriptFn}
	#idxToken	= 0;
	get idxToken() {return this.#idxToken}
	subIdxToken() {--this.#idxToken}
	#lineNum	= 0;
	get lineNum() {return this.#lineNum}
	readonly addLineNum	= (len: number)=> {this.#lineNum += len};
	jumpJustBefore() {this.#jumpWork(this.#scriptFn, '', --this.#idxToken)}
		// 直前にジャンプ


	#aCallStk	: CallStack[]	= [];	// FILOバッファ（push/pop）

	readonly	#grm;
	readonly	#alzTagArg	= new AnalyzeTagArg;


	//MARK: コンストラクタ
	constructor(private readonly cfg: Config, private readonly hTag: T_HTag, private readonly main: T_Main, private readonly val: T_Variable, private readonly prpPrs: T_PropParser, private readonly sndMng: SoundMng, private readonly sys: SysBase) {
		// 変数操作
		hTag.let_ml		= o=> this.#let_ml(o);	// インラインテキスト代入
		hTag.endlet_ml	= ()=> false;			// インラインテキスト代入終端
			// [if]ブロック内で【未定義のタグ[endlet_ml]です】エラーが発生する対策

		// デバッグ・その他
		hTag.dump_stack	= ()=> this.#dump_stack();	// スタックのダンプ
		hTag.dump_script= o=> this.#dump_script(o);	// スクリプトのダンプ

		// 条件分岐
		hTag.else		=							// その他ifブロック開始
		hTag.elsif		=							// 別条件のifブロック開始
		hTag.endif		= ()=> this.#endif();		// ifブロックの終端
		hTag.if			= o=> this.#if(o);			// ifブロックの開始

		// ラベル・ジャンプ
		//hTag.button	// LayerMng.ts内で定義		// ボタンを表示
		hTag.call		= o=> this.#call(o);		// サブルーチンコール
		hTag.jump		= o=> this.#jump(o);		// シナリオジャンプ
		//hTag.page		= // ReadState が担当に		// ページ移動
		hTag.pop_stack	= o=> this.#pop_stack(o);	// コールスタック破棄
		hTag.return		= o=> this.#return(o);		// サブルーチンから戻る

		// マクロ
		hTag.bracket2macro	= o=> this.#bracket2macro(o);// 括弧マクロの定義
		hTag.char2macro		= o=> this.#char2macro(o);	// 一文字マクロの定義
		hTag.endmacro		= o=> this.#return(o);		// マクロ定義の終了
		hTag.macro			= o=> this.#macro(o);		// マクロ定義の開始

		// しおり
		//hTag.copybookmark		// Variable.ts内で定義	// しおりの複写
		//hTag.erasebookmark	// Variable.ts内で定義	// しおりの消去
		hTag.load			= o=> this.#load(o);			// しおりの読込
		hTag.reload_script	= o=> this.#reload_script(o);	// スクリプト再読込
		hTag.record_place	= ()=> this.#record_place();	// セーブポイント指定
		hTag.save			= o=> this.#save(o);			// しおりの保存


		if (cfg.oCfg.debug.token) this.#dbgToken = token=> {if (token.trim() !== '') console.log(`🌱 トークン ${this.#scriptFn}:${String(this.#lineNum)} (i:${String(this.#idxToken)} cs:${String(this.#aCallStk.length)}) %c【${token}】`, 'background-color:#350;')};
		if (cfg.oCfg.debug.tag) this.#procDebugtag = tag_name=> console.log(`🌲 タグ解析 ${this.#scriptFn}:${String(this.#lineNum)} (i:${String(this.#idxToken)} cs:${String(this.#aCallStk.length)}) %c[${tag_name} %o]`, 'background-color:#30B;', this.#alzTagArg.hPrm);

		val.defTmp('const.sn.aIfStk.length', ()=> this.#aIfStk.length);
		val.defTmp('const.sn.vctCallStk.length', ()=> this.#aCallStk.length);

		this.#grm = new Grammar(cfg);

		const ce = cfg.oCfg.init.escape;
		this.#grm.setEscape(ce);
		RubySpliter.setEscape(ce);

		if (CmnLib.isDbg) {
			// sys.addHook((type, o)=> (<[nm: string]: ((o: any)=> void)>this.#hHook)[type]?.(o));
			const _h = this.#hHook;
			// type t = keyof typeof this.#hHook;
			// sys.addHook((type: keyof typeof _h, o)=> this.#hHook[ type ]?.(o));	// x
			sys.addHook((type, o)=> this.#hHook[ <keyof typeof _h>type ]?.(o));
			// sys.addHook((type, o)=> this.#hHook[type]?.(o));
			this.isBreak = token=> this.#isBreak_base(token);

			const fnc = ()=> this.analyzeInit();
			this.analyzeInit = ()=> {
				this.analyzeInit = ()=> { /* empty */ };
				this.sys.send2Dbg('hi', {});
			};
			this.#hHook.auth = o=> {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				const hLineBP = o.hBreakpoint.hFn2hLineBP;
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				for (const [fn, v] of Object.entries(hLineBP)) this.#regBreakPoint(fn, <any>v);

				ScriptIterator.#hFuncBP = {};
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				for (const v of o.hBreakpoint.aFunc) {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
					ScriptIterator.#hFuncBP[v.name] = 1;
				}

				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				if (o.stopOnEntry) {
					let tkn;
					// eslint-disable-next-line no-cond-assign
					while (tkn = this.nextToken()) {
						// if (! tkn) break;	// 初期化前に終了した場合向け

						const uc = tkn.charCodeAt(0);	// TokenTopUnicode
						if (uc === 91) break;	// [ タグ開始
						if (uc === 38) break;	// & 変数操作・変数表示
						if (uc === 42 && tkn.length === 1) break;	// 単文字の *
						if (uc === 10) this.#lineNum += tkn.length;	// \n 改行
					}
					this.sys.callHook('stopOnEntry', {});
					this.analyzeInit = fnc;
					this.analyzeInit();
				}
				else {
					this.noticeWait = ()=> {
						this.noticeWait = ()=> { /* empty */ };
						this.sys.callHook('stopOnEntry', {});	// sn全体へ通知

//						this.sys.callHook('continue', {});	// sn全体へ通知
//						this.breakState = BreakState.breaking;
					};

					this.analyzeInit = fnc;
					this.analyzeInit();
				}
			}
		}
		else this.recodeDesign = ()=> { /* empty */ };
	}
	noticeWait = ()=> { /* empty */ };
	#regBreakPoint(fn: string, o: {[ln: number]: any}) {
		ScriptIterator.#hFn2hLineBP[this.#cnvSnPath4Dbg(fn)] = o;
	}

	destroy() {this.isBreak = this.#record_place = ()=> false}

	// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
	readonly #hHook	: {[nm: string]: (o: any)=> void;} = {
		auth: ()=> { /* empty */ }, // constructorでセット
		//launch:	// ここでは冒頭停止に間に合わないのでanalyzeInit()で
		disconnect: ()=> {
			ScriptIterator.#hFn2hLineBP = {};
			ScriptIterator.#hFuncBP = {};
			this.isBreak = ()=> false;

			this.#hHook.continue!({});
			this.#breakState = BreakState.Running;
		},
		restart: ()=> {this.isBreak = ()=> false},

		// ブレークポイント登録
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
		add_break: o=> this.#regBreakPoint(o.fn, o.o),
		data_break: o=> {
			if (this.#breakState !== BreakState.Running) return;

			this.#breakState = BreakState.Wait;
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			this.main.setLoop(false, `変数 ${String(o.dataId)}【${String(o.old_v)}】→【${String(o.new_v)}】データブレーク`);
			this.sys.callHook('stopOnDataBreakpoint', {});	// sn全体へ通知
			this.sys.send2Dbg('stopOnDataBreakpoint', {});
		},
		set_func_break: o=> {
			ScriptIterator.#hFuncBP = {};
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			for (const v of o.a) ScriptIterator.#hFuncBP[v.name] = 1;
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
			this.sys.send2Dbg(o.ri, {});
		},

		// 情報問い合わせ系
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
		stack: o=> this.sys.send2Dbg(o.ri, {a: this.#aStack()}),
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
		eval: o=> {this.sys.send2Dbg(o.ri, {v: this.prpPrs.parse(o.txt)})},

		// デバッガからの操作系
		continue: ()=> {
			if (this.#isIdxOverLast()) return;

			this.#idxToken -= this.#idxDx4Dbg;
			this.#breakState = BreakState.Breaking;
			this.main.setLoop(true);
			this.main.resume();	// jumpループ後などで停止している場合があるので
		},
		stepover: o=> this.#go_stepover(o),
		stepin: ()=> {
			if (this.#isIdxOverLast()) return;

			const tkn = this.#script.aToken[this.#idxToken -this.#idxDx4Dbg];
			this.sys.callHook(`stopOnStep${this.#REGSTEPIN.test(tkn ?? '') ?'In' :''}`, {});	// sn全体へ通知

			this.#idxToken -= this.#idxDx4Dbg;
			this.#breakState = this.#breakState === BreakState.Wait
				? BreakState.Step
				: BreakState.Stepping;
			this.main.setLoop(true);
			this.main.resume();	// jumpループ後などで停止している場合があるので
		},
		stepout: o=> {
			if (this.#isIdxOverLast()) return;

			if (this.#aCallStk.length > 0) this.#go_stepout(true);
			else this.#go_stepover(o);
		},
		pause: ()=> {
			this.#breakState = BreakState.Step;
			this.main.setLoop(false, '一時停止');
			this.sys.send2Dbg('stopOnStep', {});
		},
		stopOnEntry: ()=> {
			this.#breakState = BreakState.Step;
			this.main.setLoop(false, '一時停止');
			this.sys.send2Dbg('stopOnEntry', {});
		},
	} as const;
	readonly #cnvSnPath = (fn: string)=> this.cfg.searchPath(fn, SEARCH_PATH_ARG_EXT.SCRIPT);
	readonly #cnvSnPath4Dbg = (fn: string)=>
		this.sys.pathBaseCnvSnPath4Dbg + this.#cnvSnPath(fn);
	#go_stepover(o: any) {
		if (this.#isIdxOverLast()) return;

		const tkn = this.#script.aToken[this.#idxToken -this.#idxDx4Dbg];
		if (this.#REGSTEPIN.test(tkn ?? '')) this.#go_stepout(false);
		else {
			this.sys.callHook('stopOnStep', {});	// sn全体へ通知
			this.#hHook.stepin!(o);
		}
	}
	#go_stepout(out: boolean) {
		this.sys.callHook(`stopOnStep${out ?'Out' :''}`, {});	// sn全体へ通知
		this.#csDepth_macro_esc = this.#aCallStk.length -(out ?1 :0);
		this.#idxToken -= this.#idxDx4Dbg;
		this.#breakState = out ?BreakState.StepOut :BreakState.StepOuting;
		this.main.setLoop(true);
		this.main.resume();	// jumpループ後などで停止している場合があるので
	}
	#csDepth_macro_esc	= 0;
	get #idxDx4Dbg() {
		return this.#breakState === BreakState.Break
			|| this.#breakState === BreakState.Step ?1 :0
	}
	#isIdxOverLast(): boolean {
		if (this.#idxToken < this.#script.len) return false;
		this.sys.callHook('stopOnEntry', {});	// sn全体へ通知
		this.main.setLoop(false, 'スクリプト終端です isIdxOverLast');
		return true;
	}

	// reload 再生成 Main に受け渡すため static
	static	#hFn2hLineBP: {[fn: string]: {[ln: number]: any}} = {};
	static	#hFuncBP: {[tag_name: string]: 1} = {};
	#breakState	= BreakState.Running;
		// https://raw.githubusercontent.com/famibee/SKYNovel-vscode-extension/master/src/doc/BreakStateSMD.pu
	isBreak = (_token: string)=> false;
	#isBreak_base(token: string): boolean {
		switch (this.#breakState) {
			case BreakState.StepOuting:	this.#subHitCondition();
				this.#breakState = BreakState.StepOut;	break;
			case BreakState.StepOut:
				if (this.#aCallStk.length !== this.#csDepth_macro_esc) break;

				this.#breakState = BreakState.Step;
				this.main.setLoop(false, 'ステップ実行');
				this.sys.send2Dbg('stopOnStep', {});
				return true;	// タグを実行せず、直前停止

			case BreakState.Stepping:	this.#subHitCondition();
				this.#breakState = BreakState.Step;	break;
			case BreakState.Step:		this.#subHitCondition();
				this.main.setLoop(false, 'ステップ実行');
				this.sys.send2Dbg('stopOnStep', {});
				return true;	// タグを実行せず、直前停止

			case BreakState.Breaking:	this.#subHitCondition();
				this.#breakState = BreakState.Running;	break;

			default:
			{	// 関数ブレークポイント
				if (tagToken2Name(token) in ScriptIterator.#hFuncBP) {
					this.#breakState = BreakState.Break;
					this.main.setLoop(false, `関数 ${token} ブレーク`);
					this.sys.callHook('stopOnBreakpoint', {});	// sn全体へ通知
					this.sys.send2Dbg('stopOnBreakpoint', {});
					return true;	// タグを実行せず、直前停止
				}
			}
			{	// ブレークポイント
				const bp = ScriptIterator.#hFn2hLineBP[this.#cnvSnPath4Dbg(this.#scriptFn)];
				if (! bp) break;

				const o = bp[this.#lineNum];
				if (! o) break;

//console.log(`fn:ScriptIterator.ts line:145 👺 【bs:${this.#breakState} idx:${this.#idxToken} ln:${this.#lineNum} tkn:${this.#script.aToken[this.#idxToken -1]}:】 o:%o`, o);
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
				if (o.condition) {if (! this.prpPrs.parse(o.condition)) break}

				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				else if ('hitCondition' in o && --o.hitCondition > 0) break;
				const isBreak = this.#breakState === BreakState.Running;
				this.#breakState = BreakState.Break;
				this.main.setLoop(false, isBreak ?
					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
					(o.condition ? '条件' :'ヒットカウント') +'ブレーク'
					 :'ステップ実行');
				const type = isBreak ?'stopOnBreakpoint' :'stopOnStep';
				this.sys.callHook(type, {});	// sn全体へ通知
				this.sys.send2Dbg(type, {});
			}
				return true;	// タグを実行せず、直前停止
		}

		return false;	// no break、タグを実行
	}
	#subHitCondition() {	// step実行中でbreakしないがヒットカウントだけ減算
		const o = ScriptIterator.#hFn2hLineBP[getFn(this.#scriptFn)]?.[this.#lineNum];
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		if (o?.hitCondition) --o.hitCondition;
	}

	#aStack(): {fn: string, ln: number, col: number, nm: string, ma: string}[] {
		const idx_n = this.#breakState === BreakState.Breaking ?1 :0;
		const tkn0 = this.#script.aToken[this.#idxToken -1 +idx_n]!;

		const fn0 = this.#cnvSnPath4Dbg(this.#scriptFn);
		const tag_name0 = tagToken2Name(tkn0);
		const nm = tag_name0 ?`[${tag_name0}]` :tkn0;
//console.log(`fn:ScriptIterator.ts aStack breakState:${this.#breakState} idx:${this.#idxToken -1} idx_n:${idx_n} tkn0:${tkn0}: fn0:${fn0} nm:${nm} tkn02:${this.#script.aToken[this.#idxToken -1]}: +tkn02:${this.#script.aToken[this.#idxToken]}:`);
//console.log(`fn:ScriptIterator.ts     a:%o anum:%o`, this.script.aToken, this.script.aLNum);
		const ma = String(this.val.getVal('mp:const.sn.macro') ?? '{}');
		if (this.#idxToken === 0) return [{fn: fn0, ln: 1, col: 1, nm, ma}];

		const lc0 = this.#cnvIdx2lineCol(this.#script, this.#idxToken);// -1不要
//console.log(`fn:ScriptIterator.ts     ln:${lc0.ln} col:${lc0.col_s} col2:${this.#script.aLNum[this.#idxToken -1]}`);
		const a = [{fn: fn0, ln: lc0.ln, col: lc0.col_s +1, nm, ma}];
		const len = this.#aCallStk.length;
		if (len === 0) return a;

		for (let i=len -1; i>=0; --i) {
			const cs = this.#aCallStk[i]!;
			const st = this.#hScript[cs.fn];
			if (! st) continue;
			const tkn = st.aToken[cs.idx -1];
			if (! tkn) continue;
			const lc = this.#cnvIdx2lineCol(st, cs.idx);	// -1不要

			const tag_name = tagToken2Name(tkn);
			a.push({
				fn	: this.#cnvSnPath4Dbg(cs.fn),
				ln	: lc.ln,
				col	: lc.col_s +1,
				nm	: tag_name ?`[${tag_name}]` :tkn,
				ma	: cs.csArg[':hMp']['const.sn.macro'],
			});
		}

		return a;
	}

	// result = true : waitする  resume()で再開
	#procDebugtag	= (_tag_name: string)=> { /* empty */ };
	//MARK: タグ解析
	async	タグ解析(tag_name: string, args: string): Promise<boolean> {
		const tag_fnc = this.hTag[<keyof T_HTag>tag_name];
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (! tag_fnc) throw `未定義のタグ【${tag_name}】です`;

		this.#alzTagArg.parse(args);
		this.#procDebugtag(tag_name);

		const hPrm = this.#alzTagArg.hPrm;
		if (hPrm.cond) {
			const cond = hPrm.cond.val;
			if (! cond || cond.startsWith('&')) throw '属性condは「&」が不要です';
			const p = this.prpPrs.parse(cond);
			const ps = String(p);
			if (ps === 'null' || ps === 'undefined') return false;
			if (! p) return false;
		}

		let hArg: TArg = {};
		const csa: ICallStackArg = this.#aCallStk.at(-1)?.csArg ?? creCSArg();

		const len = this.#aCallStk.length;
		if (this.#alzTagArg.isKomeParam) {
			if (len === 0) throw '属性「*」はマクロのみ有効です';
			hArg = {...csa};
		}
		hArg[':タグ名'] = tag_name;
	// #region タグ位置のコールスタック情報を埋め込むコード（デバッグ用）
	/*	{
			const lc0 = this.#cnvIdx2lineCol(this.#script, this.#idxToken);
			let now = `存在位置 fn:${this.#scriptFn} line:${lc0.ln} col:${lc0.col_s +1}`;
			hArg[':path'] = now;
			const len = this.#aCallStk.length;
			if (len > 0) {
				for (let i=len -1; i>=0; --i) {
					const cs = this.#aCallStk[i];
					const hMp = cs.csArg[':hMp'];
					const from_macro_nm = hMp ?hMp[':タグ名'] :undefined;
					const call_nm = cs.csArg[':タグ名'] ?? '';
					const lc = this.#cnvIdx2lineCol(this.#hScript[cs.fn], cs.idx);
					now += ` <- (${len -i}) fn:${cs.fn} line:${lc.ln
						} col:${lc.col_s +1
						}`+ (from_macro_nm ?'（['+ from_macro_nm +']マクロ内）' :' ')+
						`で [${call_nm} ...]をコール`;
				}
			}
		}*/
	// #endregion
	// #region タグ位置情報を埋め込むコード（デバッグ用）
//		hArg[':path'] = this.#scriptFn;
//		hArg[':ln'] = this.#lineNum;
	// #endregion
		// valやdefの値について。null はありえない。'null'や'undefined' はありえる。
		// 省略時以外で undefined はない。a=undefined と書いても 'undefined' になる
		for (const [arg_nm, {val, def}] of Object.entries(hPrm)) {
			let v = val;
			if (val.startsWith('%')) {
				if (len === 0) throw '属性「%」はマクロ定義内でのみ使用できます（そのマクロの引数を示す簡略文法であるため）';

				const mac = (<{[nm: string]: any}>csa)[v.slice(1)];
				if (mac) {(<{[nm: string]: any}>hArg)[arg_nm] = mac; continue}

				if (def === undefined || def === 'null') continue;
					// defの'null'指定。%変数が無い場合、タグやマクロに属性を渡さない
				v = def;
			}

			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			v = this.prpPrs.getValAmpersand(v ?? '');
			if (v !== 'undefined') {(<{[nm: string]: any}>hArg)[arg_nm] = v; continue}

			if (def === undefined) continue;
			v = this.prpPrs.getValAmpersand(def);
			if (v !== 'undefined') (<{[nm: string]: any}>hArg)[arg_nm] = v;
				// 存在しない値の場合、属性を渡さない
		}

		// （一部タグの処理直前に）文字出現処理を終わらせる
		if (Reading.needGoTxt && this.#setTag2ChIn.has(tag_name)) {
			const {promise, resolve} = Promise.withResolvers();
			Reading.beginProc(RPN_COMP_CHIN, ()=> resolve(0), false, ()=> resolve(0));
			Reading.goTxt();
			this.val.saveKidoku();
			await promise;
		}
		// （一部タグの処理直前に）画面トランジションを止める
		if (this.#setTag2FinishTrans.has(tag_name)) {
			this.#evtMng.hideHint();
			CmnTween.stopEndTrans();
		}
		// キー押しっぱなしスキップで処理せずスルーする
		const fncBypass = this.#hTag2SkipBypass[tag_name];
		if (fncBypass
			&& argChk_Boolean(hArg, 'canskip', this.#hTag2CanSkip[tag_name] ?? true)
			&& this.#evtMng.isSkipping) return fncBypass(hArg);

		return tag_fnc(hArg);
	}
		// 文字出現演出を待つタグ
		//	ここで列挙せずタグ処理で文字表示を始めたい場合、goTxt()すること
		readonly	#setTag2ChIn = new Set([
		// 変数操作
			// 'clearsysvar',	// システム変数の全消去
			// 'clearvar',		// ゲーム変数の全消去
			// 'let_abs',		// 絶対値
			// 'let_char_at',	// 文字列から一字取りだし
			// 'let_index_of',	// 文字列で検索
			// 'let_length',	// 文字列の長さ
			// 'let_ml',		// インラインテキスト代入

			// 'let_replace',	// 正規表現で置換
			// 'let_round',		// 四捨五入
			// 'let_search',	// 正規表現で検索
			// 'let_substr',	// 文字列から抜きだし
			// 'let',			// 変数代入・演算

		// レイヤ共通
			// 'add_lay',		// レイヤを追加する
			// 'clear_lay',	// レイヤ設定の消去
			// 'finish_trans',	// トランス強制終了
			// 'lay',	// レイヤ設定
			'trans',	// ページ裏表を交換
			'wt',	// トランス終了待ち
			// 'add_filter',	// フィルター追加
			// 'clear_filter',	// フィルター全削除
			// 'enable_filter',// フィルター個別切替

		// トゥイーンアニメ
			// 'pause_tsy',	// 一時停止
			// 'resume_tsy',	// 一時停止再開
			// 'stop_tsy',	// トゥイーン中断
			// 'tsy',		// トゥイーン開始
			'wait_tsy',	// トゥイーン終了待ち

		// 文字・文字レイヤ
			// 'autowc',	// 文字ごとのウェイト
			// 'ch',		// 文字を追加する
			// 'ch_in_style',	// 文字出現演出定義
			// 'ch_out_style',	// 文字消去演出定義
			// 'clear_text',	// 文字消去
			// 'current',	// デフォルト文字レイヤ設定
			// 'endlet_ml',	// インラインテキスト代入の終端
			// 'endlink',	// ハイパーリンクの終了
			// 'er',		// ページ両面の文字消去
			// 'graph',		// インライン画像表示
			// 'link',		// ハイパーリンク
			// 'r',			// 改行
			// 'rec_ch',	// 履歴書き込み
			// 'rec_r',		// 履歴改行
			// 'reset_rec',	// 履歴リセット
			// 'ruby2',		// 文字列と複数ルビの追加
			// 'set_focus',	// フォーカス移動
			// 'span',		// インラインスタイル設定
			// 'tcy',		// 縦中横を表示する

		// 画像・画像レイヤ
			// 'add_face',	// 差分名称の定義
			'wv',		// 動画再生終了待ち

		// HTMLフレーム
			// 'add_frame',	// フレーム追加
			// 'frame',	// フレームに設定
			// 'let_frame',	// フレーム変数を取得
			// 'set_frame',	// フレーム変数に設定
			// 'tsy_frame',	// フレームをトゥイーン開始

		// イベント
			// 'clear_event',	// イベントを全消去
			// 'enable_event',	// イベント有無の切替
			// 'event',	// イベントを予約
			'l',	// 行末クリック待ち
			'p',	// 改ページクリック待ち
			's',	// 停止する
			// [set_cancel_skip] スキップ中断予約
			'wait',		// ウェイトを入れる
			'waitclick',	// クリックを待つ

		// ＢＧＭ・効果音
			// 'fadebgm',	// BGMのフェード
			// 'fadeoutbgm',// BGMのフェードアウト
			// 'fadeoutse',	// 効果音のフェードアウト
			// 'fadese',	// 効果音のフェード
			// 'playbgm',	// BGM の演奏
			// 'playse',	// 効果音の再生
			// 'stop_allse',// 全効果音再生の停止
			// 'stopbgm',	// BGM 演奏の停止
			// 'stopfadese',// 音声フェードの停止
			// 'stopse',	// 効果音再生の停止
			// 'volume',	// BGMや効果音の音量を指定
			'wb',	// BGM フェードの終了待ち
			'wf',	// 効果音フェードの終了待ち
			'wl',	// BGM 再生の終了待ち
			'ws',	// 効果音再生の終了待ち
			// 'xchgbuf',	// サウンドバッファの交換

		// 条件分岐
			// 'else',	// その他ifブロック開始
			// 'elsif',	// 別条件のifブロック開始
			// 'endif',	// ifブロックの終端
			// 'if',	// ifブロックの開始

		// ラベル・ジャンプ
			// 'button',	// ボタンを表示
			// 'call',		// サブルーチンコール
			// 'jump',		// シナリオジャンプ
			// 'page',		// ページ移動
			// 'pop_stack',	// コールスタック破棄
			// 'return',	// サブルーチンから戻る

		// マクロ
			// 'bracket2macro',	// 括弧マクロの定義
			// 'char2macro',	// 一文字マクロの定義
			// 'endmacro',	// マクロ定義の終了
			// 'macro',		// マクロ定義の開始

		// しおり
			// 'copybookmark',	// しおりの複写
			// 'erasebookmark',	// しおりの消去
			// 'load',			// しおりの読込
			// 'record_place',	// セーブポイント指定
			// 'reload_script',	// スクリプト再読込
			// 'save',			// しおりの保存

		// 画面揺らし
			'quake',		// 画面を揺らす
			// 'stop_quake',// 画面揺らし中断
			'wq',		// 画面揺らし終了待ち

		// システム
			// 'close',		// アプリの終了
			// 'export',	// プレイデータをエクスポート
			// 'import',	// プレイデータをインポート
			// 'loadplugin',	// プラグインの読み込み
			// 'navigate_to',	// ＵＲＬを開く
			// 'snapshot',		// スナップショット
			// 'title',		// タイトル指定
			// 'toggle_full_screen',	// 全画面状態切替
			// 'update_check',	// 更新チェック機能
			// 'window',	// アプリウインドウ設定

		// デバッグ・その他
			// 'dump_lay',		// レイヤのダンプ
			// 'dump_script',	// 外部へスクリプトを表示
			// 'dump_stack',	// スタックのダンプ
			// 'dump_val',		// 変数のダンプ
			// 'log',		// ログ出力
			// 'trace',		// デバッグ表示へ出力
		]);
		readonly	#setTag2FinishTrans = new Set([
			'finish_trans',	// トランス強制終了
			'trans',		// ページ裏表を交換
			'quake',		// 画面を揺らす
			'stop_quake',	// 画面揺らし中断
			'add_filter',	// フィルター追加
		]);
		// キー押しっぱなしスキップで処理せずスルーするタグ
		readonly	#hTag2SkipBypass: {[tag_name: string]: TTag} = {
			'wt'		: ()=> {CmnTween.stopEndTrans(); return false},
											// トランス終了待ち
			'wait_tsy'	: o=> this.hTag.stop_tsy(o),	// トゥイーン終了待ち
			// 'wv',		：タグ内部で処理	// 動画再生終了待ち
			'wait'			: ()=> false,	// ウェイトを入れる
			// 'playbgm',	：スルー不可		// BGM の演奏
			// 'playse',	：タグ内部で処理	// 効果音の再生
			'wb'	: ()=> this.hTag.stopfadese({buf: BUF_BGM}),
											// BGM フェードの終了待ち
			'wf'	: o=> this.hTag.stopfadese(o),	// 効果音フェードの終了待ち
			// 'ws'		：タグ内部で処理	// 効果音再生の終了待ち
			'wq'	: ()=> this.hTag.stop_quake({}),	// 画面揺らし終了待ち
			// fade系	：タグ内部で処理
			// 'ch'		：タグ内部で処理	// 文字を追加する
			// 'tsy'	：タグ内部で処理	// トゥイーン開始
			// 'trans'	：タグ内部で処理	// ページ裏表を交換
			'quake'		: ()=> false,		// 画面を揺らす
		};
		// タグ処理中にクリックなどで即終わらせられるタグ（canskip 属性がある）
		readonly	#hTag2CanSkip: {[tag_name: string]: boolean} = {
						// デフォルト値
			'wt'		: true ,	// [wt]トランス終了待ち
			'wait_tsy'	: true ,	// [wait_tsy]トゥイーン終了待ち
			'wv'		: true ,	// [wv]動画再生終了待ち
			'wait'		: true ,	// [wait]ウェイトを入れる
			'playbgm'	: false,	// [playbgm]BGM の演奏
			'playse'	: true ,	// [playse]効果音の再生
			'wb'		: false,	// [wb]BGM フェードの終了待ち
			'wf'		: false,	// [wf]効果音フェードの終了待ち
			'ws'		: false,	// [ws]効果音再生の終了待ち
			'wq'		: true ,	// [wq]画面揺らし終了待ち
		};


	#evtMng	: EventMng;
	#layMng	: LayerMng;
	setOtherObj(evtMng: EventMng, layMng: LayerMng): void {
		this.#evtMng = evtMng;
		this.#layMng = layMng;
	}


	//MARK: インラインテキスト代入
	#let_ml(hArg: TArg) {
		const {name} = hArg;
		if (! name) throw 'nameは必須です';

		let ml = '';
		const len = this.#script.len;
		for (; this.#idxToken<len; ++this.#idxToken) {
			ml = this.#script.aToken[this.#idxToken]!;
			if (ml !== '') break;
		}
		hArg.text = ml;
		hArg.cast = 'str';
		this.hTag.let(hArg);
		this.#idxToken += 2;
		this.#lineNum += (ml.match(/\n/g) ?? []).length;

		return false;
	}


	//MARK: スタックのダンプ
	#dump_stack() {
		if (this.#idxToken === 0) {
			console.group(`🥟 [dump_stack] スクリプト現在地 fn:${this.#scriptFn} line:1 col:0`);
			console.groupEnd();
			return false;
		}

		const lc0 = this.#cnvIdx2lineCol(this.#script, this.#idxToken);
		const now = `スクリプト現在地 fn:${this.#scriptFn} line:${String(lc0.ln)} col:${String(lc0.col_s +1)}`;
		console.group(`🥟 [dump_stack] ${now}`);
		const len = this.#aCallStk.length;
		if (len > 0) {
			console.info(now);
			for (let i=len -1; i>=0; --i) {
				const cs = this.#aCallStk[i]!;
				const hMp = cs.csArg[':hMp'];
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
				const from_macro_nm = hMp
					? <string>(<{[nm: string]: any}>hMp)[':タグ名']
					: undefined;
				const call_nm = cs.csArg[':タグ名'] ?? '';
				const lc = this.#cnvIdx2lineCol(this.#hScript[cs.fn], cs.idx);
				console.info(
					`${String(len -i)}つ前のコール元 fn:${cs.fn} line:${
						String(lc.ln)} col:${String(lc.col_s +1)
					}${
						from_macro_nm ?'（['+ from_macro_nm +']マクロ内）' :' '
					}で [${call_nm} ...]をコール`
				);
			}
		}
		console.groupEnd();

		return false;
	}
	#cnvIdx2lineCol(st: Script | undefined, idx: number): {ln: number, col_s: number, col_e: number} {
		const ret = {ln: 1, col_s: 0, col_e: 0};
		if (! st) return ret;

		let i = idx -1;
		const lN = ret.ln = st.aLNum[i]!;
		while (st.aLNum[i] === lN) {
			const tkn = st.aToken[i]!;
			if (! tkn.startsWith('\n')) {
				const len = tkn.length;
//console.log(`fn:ScriptIterator.ts line:586 cnvIdx2lineCol tkn:${st.aToken[i]} len:${len} s:${ret.col_s} e:${ret.col_e}`);
				if (ret.col_e > 0) ret.col_s += len;
				ret.col_e += len;
			}
			if (--i < 0) break;
		}

		return ret;
	}


	//MARK: 外部へスクリプトを表示
	#dump_script(hArg: TArg) {
		const {set_fnc, break_fnc} = hArg;
		if (! set_fnc) throw 'set_fncは必須です';	// スクリプトを返すコールバック

		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		this.#fncSet = (<any>globalThis)[set_fnc];
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (! this.#fncSet) {
			if (argChk_Boolean(hArg, 'need_err', true)) throw `HTML内に関数${set_fnc}が見つかりません`;
			this.#fncSet = ()=> { /* empty */ };
			return false;
		}

		this.noticeBreak = (goto: boolean)=> {
			if (this.#fnLastBreak !== this.#scriptFn) {
				this.#fnLastBreak = this.#scriptFn;
				this.#fncSet(
					this.#hScrCache4Dump[this.#scriptFn] ??= this.#script.aToken.join('')
				);
			}
			this.#fncBreak(this.#lineNum, goto);
		};
		this.noticeBreak(true);	// 一度目のthis.fncBreak()はスルー（まだ読んでないし）

		if (! break_fnc) return false;	// Break通知コールバック

		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		this.#fncBreak = (<any>globalThis)[break_fnc];
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (! this.#fncBreak) {
			if (argChk_Boolean(hArg, 'need_err', true)) throw `HTML内に関数${break_fnc}が見つかりません`;
			this.#fncBreak = ()=> { /* empty */ };
		}

		return false;
	}
	#fncSet: (txt: string)=> void = ()=> { /* empty */ };
	#fncBreak: (ln: number, goto: boolean)=> void = ()=> { /* empty */ };
	#fnLastBreak = '';
	#hScrCache4Dump: {[fn: string]: string;} = {};
	noticeBreak = (_goto: boolean)=> { /* empty */ };


	#dumpErrLine = 5;
	dumpErrForeLine() {
		if (this.#idxToken === 0) {
			console.group(`🥟 Error line (from 0 rows before) fn:${this.#scriptFn}`);
			console.groupEnd();
			return;
		}

		let s = '';
		for (let i=this.#idxToken -1; i>=0; --i) {
			s = String(this.#script.aToken[i]) + s;
			if ((s.match(/\n/g) ?? []).length >= this.#dumpErrLine) break;
		}
		const a = s.split('\n').slice(-this.#dumpErrLine);
		const len = a.length;
		console.group(`🥟 Error line (from ${String(len)} rows before) fn:${this.#scriptFn}`);
		const ln_txt_width = String(this.#lineNum).length;
		const lc = this.#cnvIdx2lineCol(this.#script, this.#idxToken);
		for (let i=0; i<len; ++i) {
			const ln = this.#lineNum -len +i +1;
			const mes = `${String(ln).padStart(ln_txt_width, ' ')}: %c`;
			const e = a[i]!;
			const line = e.length > 75 ?e.slice(0, 75) +'…' :e;	// 長い場合は後略
			if (i === len -1) console.info(
				mes + line.slice(0, lc.col_s) +'%c'+ line.slice(lc.col_s),
				'color: black; background-color: skyblue;', 'color: black; background-color: pink;'
			)
			else console.info(mes + line, 'color: black; background-color: skyblue;');
		}
		console.groupEnd();
		//console.log('Linkの出力   : %o', 'file:///Volumes/MacHD2/_Famibee/SKYNovel/prj/mat/main.sn');
	}


	#aIfStk	: number[]	= [-1];	// 先頭に積む FIFOバッファ（unshift / shift）
	//MARK: ifブロックの終端
	#endif() {
		const t = this.#aIfStk[0];
		if (! t) throw 'this.#aIfStk が異常です';
		if (t === -1) throw 'ifブロック内ではありません';

		this.#idxToken = t;
		this.#aIfStk.shift();	// 最初の要素を取り除く

		return false;
	}
	//MARK: ifブロックの開始
	#if(hArg: TArg) {
		//console.log('if idxToken:'+ this.#idxToken);
		const {exp} = hArg;
		if (! exp) throw 'expは必須です';
		if (exp.startsWith('&')) throw '属性expは「&」が不要です';

		let cntDepth = 0;		// if深度カウンター
		let	idxGo = this.prpPrs.parse(exp) ?this.#idxToken :-1;
		const lnIf = this.#script.aLNum[this.#idxToken];
		const zLn = this.#lineNum -((lnIf ?? 0) || 0);	// ??ではなく。NaN は falsy
		const len = this.#script.len;
		for (; this.#idxToken<len; ++this.#idxToken) {
			const ln = this.#script.aLNum[this.#idxToken];
			this.#script.aLNum[this.#idxToken] = ((ln ?? 0) || 0)+ zLn; // ??はNaN不可
			const tkn = this.#script.aToken[this.#idxToken];
			//console.log(`[if]トークン ${this.#scriptFn}:${this.#lineNum} idx:${this.#idxToken} realLn:${this.#script.aLNum[this.#idxToken]} idxGo:${idxGo} cntDepth:${cntDepth} token<${tkn}>`);
			if (! tkn) continue;

			const uc = tkn.charCodeAt(0);	// TokenTopUnicode
			if (uc === 10) {this.#lineNum += tkn.length; continue}	// \n 改行
			if (uc !== 91) continue;	// [ タグ開始以外

			const [tag_name, args] = tagToken2Name_Args(tkn);
			if (! (tag_name in this.hTag)) throw `未定義のタグ[${tag_name}]です`;
			this.#alzTagArg.parse(args);

			switch (tag_name) {
			case 'if':	++cntDepth; break;

			case 'elsif':{
				if (cntDepth > 0) break;
				if (idxGo > -1) break;

				const e = this.#alzTagArg.hPrm.exp?.val;
				if (! e) throw 'expは必須です';
				if (e.startsWith('&')) throw '属性expは「&」が不要です';
				if (this.prpPrs.parse(e)) idxGo = this.#idxToken +1;
			}	break;

			case 'else':
				if (cntDepth > 0) break;
				if (idxGo === -1) idxGo = this.#idxToken +1;
				break;

			case 'endif':
				if (cntDepth > 0) {--cntDepth; break}
				if (idxGo === -1) {
					++this.#idxToken;
					this.#script.aLNum[this.#idxToken]! += zLn;
				}
				else {
					this.#aIfStk.unshift(this.#idxToken +1);	// 先頭に要素追加
					this.#idxToken = idxGo;
					this.#lineNum = this.#script.aLNum[this.#idxToken]!;
						// +zLn 不要
				}
				return false;
			}
		}
		throw '[endif]がないままスクリプト終端です';
		//return false;
	}


	//MARK: サブルーチンコール
	#call(hArg: TArg) {
		if (! argChk_Boolean(hArg, 'count', false)) this.#eraseKidoku();

		const {fn} = hArg;
		if (fn) this.#cnvSnPath(fn);	// chk only
		this.#callSub({...hArg}, ReadingState.popLocalEvts());
			// ':hEvt1Time'の扱いだけは[macro]と異なる

		if (argChk_Boolean(hArg, 'clear_local_event', false)) this.hTag.clear_event({});
		return this.#jumpWork(fn, hArg.label);
	}
	#callSub(hArg: TArg, hEvt1Time?: T_HEvt2Fnc) {
		const csa: ICallStackArg = {
			...hArg,
			...hEvt1Time ?{':hEvt1Time': hEvt1Time} :{},
			':hMp'		: this.val.cloneMp(),
			':lenIfStk'	: this.#aIfStk.length,
		};
		this.#script.aLNum[this.#idxToken] = this.#lineNum;	// 戻ったときの行番号
		if (! this.#resvToken) {csa[':resvToken'] = ''; this.#clearResvToken()}
		this.#aCallStk.push(new CallStack(this.#scriptFn, this.#idxToken, csa));
		this.#aIfStk.unshift(-1);	// 最初に要素を追加
	}

	//MARK: シナリオジャンプ
	#jump(hArg: TArg) {
		if (! argChk_Boolean(hArg, 'count', true)) this.#eraseKidoku();

		this.#aIfStk[0] = -1;
		return this.#jumpWork(hArg.fn, hArg.label);
	}

	//MARK: コールスタック破棄
	#pop_stack(hArg: TArg) {
		if (argChk_Boolean(hArg, 'clear', false)) this.#aCallStk = [];
		else if (! this.#aCallStk.pop()) throw 'スタックが空です';
		this.#clearResvToken();
		this.#aIfStk = [-1];
		this.val.setMp(creMP());

		return false;
	}

	//MARK: サブルーチンから戻る
	#return(hArg: TArg) {
		const cs = this.#aCallStk.pop();
		if (! cs) throw 'スタックが空です';
		const csa = cs.csArg;
		this.#aIfStk = this.#aIfStk.slice(-csa[':lenIfStk']);	// 最初の要素を取り除く

		const hMp = csa[':hMp'];	// マクロからの復帰の場合にmp:値も復帰
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (hMp) this.val.setMp(hMp);
			// たぶん型チェック的に if (hMp) は不要だが、
			// あとからESLint対応なので安易に挙動を変えない方針で

		const after_token = csa[':resvToken'];
		if (after_token) this.nextToken = ()=> {
			this.#clearResvToken();
			return after_token;
		}
		else this.#clearResvToken();

		if (csa[':hEvt1Time']) ReadingState.pushLocalEvts(csa[':hEvt1Time']);

		const {fn, label} = hArg;
		if (fn || label) return this.#jumpWork(fn, label);

		if (cs.fn in this.#hScript) {this.#jump_light(cs); return false}
		return this.#jumpWork(cs.fn, '', cs.idx);	// 確実にスクリプトロードなので
	}

	#resvToken	= '';
	#clearResvToken() {
		this.#resvToken = '';
		this.nextToken = ()=> this.#nextToken_Proc();
	}


	#skipLabel = '';
	#jumpWork(fn = '', label = '', idx = 0): boolean {
		if (CmnLib.debugLog) console.log(`📜 %c1:jumpWork%c fn:${fn} lbl:${label} idx:${String(idx)}`, 'color:#3B0;', '');
		if (! fn && ! label) this.main.errScript('[jump系] fnまたはlabelは必須です');
		if (label) {
			if (! label.startsWith('*')) this.main.errScript('[jump系] labelは*で始まります');
			this.#skipLabel = label;
			if (! this.#skipLabel.startsWith('**')) this.#idxToken = idx;
		}
		else {
			this.#skipLabel = '';
			this.#idxToken = idx;
		}

		if (! fn) {this.analyzeInit(); return false}
		if (fn.includes('@')) throw '[jump系] fn には文字「@」は禁止です';

		const full_path = this.#cnvSnPath(fn);
		if (fn === this.#scriptFn) {this.analyzeInit(); return false}
		this.#scriptFn = fn;
		const st = this.#hScript[fn];
		if (st) {this.#script = st; this.analyzeInit(); return false}

		const RPN_JUMPWORK = `jumpWork fn:${fn}`;
		Reading.beginProc(RPN_JUMPWORK);
		let fp_diff = '';
		const ldr = new Loader;
		try {
			fp_diff = this.#cnvSnPath(fn +'@');
			// 派生ファイルが存在する場合
			ldr.add({name: fn +':base', url: full_path});
			ldr.add({name: fn, url: fp_diff});
		} catch {
			// 派生ファイルはない
			ldr.add({name: fn, url: full_path});
		}
		ldr.use((res, next)=> {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			this.sys.dec(res.extension, res.data).then(d=> {
				res.data = d;
				next();
			})
			.catch((e: unknown)=> {
				this.main.errScript(`[jump系]snロード失敗です fn:${res.name} ${String(e)}`, false);
				next();
			});
		})
		.load((_ldr, hRes)=> {
			Reading.endProc(RPN_JUMPWORK);
			if (fp_diff) {	// 派生ファイルが存在する場合
				const scrBase: string = hRes[fn +':base']!.data;
				const scrDiff: string = hRes[fn]!.data;
				const aBase: string[] = scrBase.split('\n');
				const aDiff: string[] = scrDiff.split('\n');
				const lenB = aBase.length;
				const lenD = aDiff.length;
				// 【派生スクリプト】の空行へ、【基底スクリプト】の同じ行の内容をコピー
				for (let i=0; i<lenD && i<lenB; ++i) aDiff[i] ||= aBase[i] ?? '';

				// 【接尾辞つきファイル】として扱う
				hRes[fn]!.data = aDiff.join('\n');
				// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
				delete hRes[fn +':base'];
			}

			// eslint-disable-next-line @typescript-eslint/unbound-method
			this.nextToken = this.#nextToken_Proc;
			this.#lineNum = 1;

			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			this.#resolveScript(hRes[fn]!.data);
			this.hTag.record_place({});
			this.analyzeInit();
		});

		return true;
	}
	private	analyzeInit(): void {
		if (CmnLib.debugLog) console.log(`📜 %c9:analyzeInit%c fn:${this.#scriptFn} lbl:${this.#skipLabel} idx:${String(this.#idxToken)}`, 'color:#3B0;', '');
		const o = this.#seekScript(this.#script, Boolean(this.val.getVal('mp:const.sn.macro.name')), this.#lineNum, this.#skipLabel, this.#idxToken);
		this.#idxToken	= o.idx;
		this.#lineNum	= o.ln;
	}

	// シナリオ解析処理ループ・冒頭処理
	nextToken = ()=> '';	// 初期化前に終了した場合向け
	#nextToken_Proc(): string {
		if (this.#errOverScr()) return '';

		this.#recordKidoku();

		// トークンの行番号更新
		this.#script.aLNum[this.#idxToken] ||= this.#lineNum;	// ??はNaN不可
		const token = this.#script.aToken[this.#idxToken]!;
		this.#dbgToken(token);
		++this.#idxToken;

		return token;
	}
	#dbgToken = (_token: string)=> { /* empty */ };
	#errOverScr(): boolean {
		if (this.#idxToken < this.#script.len) return false;
		this.main.errScript('スクリプト終端です errOverScr');
		return true;
	}


	readonly #REG_NONAME_LABEL		= /(\*{2,})([^|]*)/;
	readonly #REG_TOKEN_MACRO_BEGIN	= /^\[macro\s/;
	readonly #REG_TOKEN_MACRO_END	= /^\[endmacro[\s\]]/;
	#seekScript(st: Script, inMacro: boolean, iln: number, iskipLabel: string, idx: number): ISeek {
		//console.log(`seekScript (from)inMacro:${inMacro} (from)ln:${ln} (to)skipLabel:${skipLabel}: (to)idx:${idx}`);
		const len = st.aToken.length;
		let ln = iln, skipLabel = iskipLabel;
		if (! skipLabel) {	// ラベルジャンプ以外（先頭から開始）
			if (this.#errOverScr()) return {idx, ln};

			if (! st.aLNum[idx]) {	// NaN、undefined は falsy
				ln = 1;
				for (let j=0; j<idx; ++j) {
					// 走査ついでにトークンの行番号も更新
					st.aLNum[j] ||= ln;	// ??はNaN不可

					const tkn = st.aToken[j]!;
					if (tkn.startsWith('\n')) ln += tkn.length;	// \n 改行
					else ln += (tkn.match(/\n/g) ?? []).length;
				}
				st.aLNum[idx] = ln;
			}
			else ln = st.aLNum[idx];

			return {idx, ln};
		}

		// 無名ラベルジャンプ
		st.aLNum[0] = 1;
		const a_skipLabel = skipLabel.match(this.#REG_NONAME_LABEL);
		if (a_skipLabel) {
			skipLabel = a_skipLabel[1]!;
			let i = idx;
			switch (a_skipLabel[2]) {
			case 'before':
				while (st.aToken[--i] !== skipLabel) {
					if (i === 0) DebugMng.myTrace(`[jump系 無名ラベルbefore] 
						${String(ln)} 行目以前で ${inMacro ?'マクロ内に' :''} ラベル【 ${skipLabel} 】がありません`, 'ET');
					if (inMacro && st.aToken[i]!.search(this.#REG_TOKEN_MACRO_BEGIN) > -1) DebugMng.myTrace('[jump系 無名ラベルbefore] マクロ内にラベル【'+ skipLabel +'】がありません', 'ET');
				}
				return {idx: i +1, ln: st.aLNum[i]!};	//	break;

			case 'after':
				while (st.aToken[++i] !== skipLabel) {
					if (i === len) DebugMng.myTrace(`[jump系 無名ラベルafter] ${String(ln)} 行目以後でマクロ内にラベル【${skipLabel}】がありません`, 'ET');
					if (st.aToken[i]!.search(this.#REG_TOKEN_MACRO_END) > -1) DebugMng.myTrace(`[jump系 無名ラベルafter] ${String(ln)} 行目以後でマクロ内にラベル【 ${skipLabel} 】がありません`, 'ET');
				}
				return {idx: i +1, ln: st.aLNum[i]!};	//	break;

			default:
				DebugMng.myTrace('[jump系] 無名ラベル指定【label='+ skipLabel +'】が間違っています', 'ET');
			}
		}

		// ラベルジャンプ
		ln = 1;
		// (new RegExp("~")) の場合は、バックスラッシュは２つ必要
		const reLabel = new RegExp(
			'^'+ skipLabel.replaceAll('*', '\\*') +'(?=\\s|;|\\[|\\||$)');
		let in_let_ml = false;
		for (let i=0; i<len; ++i) {
			// 走査ついでにトークンの行番号も更新
			st.aLNum[i] ||= ln;	// ??はNaN不可

			const tkn = st.aToken[i]!;
			if (in_let_ml) {
				if (this.#grm.testTagEndLetml(tkn)) in_let_ml = false;
				else ln += (tkn.match(/\n/g) ?? []).length;
				continue;
			}

			const uc = tkn.charCodeAt(0);	// TokenTopUnicode
			if (uc === 10) {ln += tkn.length; continue}	// \n 改行
			if (uc === 42) {	// 42 = *
				if (tkn.search(reLabel) > -1) return {idx: i +1, ln};//	break;
				continue;
			}
			if (uc !== 91) continue;	// [ タグ開始

			ln += (tkn.match(/\n/g) ?? []).length;
			if (this.#grm.testTagLetml(tkn)) in_let_ml = true;
		}
		if (in_let_ml) throw '[let_ml]の終端・[endlet_ml]がありません';

		DebugMng.myTrace(`[jump系] ラベル【${skipLabel}】がありません`, 'ET');
		throw 'Dummy';
	}

	#hScript	: HScript	= Object.create(null);	//{} シナリオキャッシュ
	#resolveScript(txt: string) {
		let mes = '';
		try {
			mes = 'ScriptIterator.resolveScript';
			const scr = this.#grm.resolveScript(txt);
			mes = 'ScriptIterator.replaceScript_Wildcard';
			this.#replaceScript_Wildcard(scr);
			this.#hScript[this.#scriptFn] = this.#script = scr;
		}
		catch (e) {
			if (e instanceof Error) mes += `例外 mes=${e.message}(${e.name})`;
			else mes = String(e);
			this.main.errScript(mes, false);
		}
		this.val.touchAreaKidoku(this.#scriptFn);
	}

	#jump_light(cs: CallStack) {
		// jumpでは連続マクロでスタックオーバーフローになるので簡易版を
		// 主に[return]やマクロ終了でジャンプ先がチェック不要な場合用
		// analyzeInit()とかもジャンプ前にやってて不要だし
		this.#scriptFn	= cs.fn;
		this.#idxToken	= cs.idx;
		const st = this.#hScript[this.#scriptFn];
		if (st) this.#script = st;
		this.#lineNum = this.#script.aLNum[cs.idx]!;
//console.log(`fn:ScriptIterator.ts %cjump_light cs ${cs.fn}:${this.#lineNum} idx:${cs.idx}`, 'background-color:#a03b79;');
	}


	readonly #REG_WILDCARD	= /^\[(call|loadplugin)\s/;
	readonly #REG_WILDCARD2	= /\bfn\s*=\s*[^\s\]]+/;
	#replaceScript_Wildcard(scr: Script) {
		for (let i=scr.len -1; i>=0; --i) {
			const token = scr.aToken[i]!;
			if (! this.#REG_WILDCARD.test(token)) continue;

			const [tag_name, args] = tagToken2Name_Args(token);
			this.#alzTagArg.parse(args);

			const p_fn = this.#alzTagArg.hPrm.fn;
			if (! p_fn) continue;
			const {val: fn} = p_fn;
			if (! fn.endsWith('*')) continue;

			scr.aToken.splice(i, 1, '\t', '; '+ token);
			scr.aLNum.splice(i, 1, NaN, NaN);

			const ext = tag_name === 'loadplugin'
				? SEARCH_PATH_ARG_EXT.CSS
				: SEARCH_PATH_ARG_EXT.SN;
			const a = this.cfg.matchPath('^'+ fn.slice(0, -1) +'.*', ext);
			for (const v of a) {
				const nt = token.replace(
					this.#REG_WILDCARD2,
					'fn='+ decodeURIComponent(getFn(v[ext]!))
				);
				//console.log('\t='+ nt +'=');
				scr.aToken.splice(i, 0, nt);
				scr.aLNum.splice(i, 0, NaN);
			}
		}
		scr.len = scr.aToken.length;
	}


	#recordKidoku() {
		const ar = this.val.touchAreaKidoku(this.#scriptFn);

		// マクロ内やサブルーチンではisKidokuを変更させない
		if (this.#aCallStk.length > 0) {ar.record(this.#idxToken); return}

		this.#isKidoku = ar.search(this.#idxToken);
		this.val.setVal_Nochk('tmp', 'const.sn.isKidoku', this.#isKidoku);
		if (this.#isKidoku) return;

		ar.record(this.#idxToken);
		// saveKidoku()
			// 厳密にはここですべきだが、パフォーマンスに問題があるので
			// クリック待ちを期待できるwait、waitclick、s、l、pタグで
			// saveKidoku()をコール。
	}
	#isKidoku	= false;
	get isKidoku() {return this.#isKidoku}
	#eraseKidoku() {
		this.val.getAreaKidoku(this.#scriptFn)?.erase(this.#idxToken);
		this.#isKidoku = false;
	}
	get isNextKidoku(): boolean {
		let fn	= this.#scriptFn;
		let idx	= this.#idxToken;
		let len	= this.#script.len;
		if (this.#aCallStk.length > 0) {
			const cs = this.#aCallStk[0]!;
			fn  = cs.fn;
			idx = cs.idx;
			const st = this.#hScript[fn];
			if (st) len = st.len;
		}
		if (idx === len) return false;	// スクリプト終端

		const areas = this.val.getAreaKidoku(fn);
		return areas?.search(idx) ?? false;
	}


	get normalWait(): number {
		return this.#isKidoku
		?
			this.val.tagCh_doWait_Kidoku
			?	this.val.tagCh_msecWait_Kidoku
			:	0
		:
			this.val.tagCh_doWait
			?	this.val.tagCh_msecWait
			:	0
		;
	}


	//MARK: 括弧マクロの定義
	#bracket2macro(hArg: TArg) {
		this.#grm.bracket2macro(hArg, this.hTag, this.#script, this.#idxToken);

		return false;
	}

	//MARK: 一文字マクロの定義
	#char2macro(hArg: TArg) {
		this.#grm.char2macro(hArg, this.hTag, this.#script, this.#idxToken);

		return false;
	}

	//MARK: マクロ定義の開始
	// eslint-disable-next-line no-irregular-whitespace
	readonly	#REG_NG4MAC_NM = /["'#;\\\]　]+/;
	#macro(hArg: TArg) {
		const {name} = hArg;
		if (! name) throw 'nameは必須です';
		if (name in this.hTag) throw `[${name}]はタグかすでに定義済みのマクロです`;
		if (this.#REG_NG4MAC_NM.test(name)) throw `[${name}]はマクロ名として異常です`;

		const ln = this.#lineNum;
		const cs = new CallStack(this.#scriptFn, this.#idxToken);
		this.#strStepin += '|'+ name;
		// (new RegExp("~")) の場合は、バックスラッシュは２つ必要
		this.#REGSTEPIN = new RegExp(`\\[(${this.#strStepin})\\b`);
		this.hTag[<keyof T_HTag>name] = hArgM=> {
			// hArgM.design_unit = hArg.design_unit;
			this.#callSub(hArgM);

			// AIRNovelの仕様：親マクロが子マクロコール時、*がないのに値を引き継ぐ
			//for (const k of Object.keys(hArg)) this.val.setVal_Nochk('mp', k, hArg[k]);
			this.val.setMp({
				...hArgM,
				'const.sn.macro': JSON.stringify({name: hArg.name}),
					// ムダに大きいスクリプター用情報を削除、名前だけに
				'const.sn.me_call_scriptFn': this.#scriptFn,
			});
			this.val.setVal_Nochk('mp', 'const.sn.me_call_scriptFn', this.#scriptFn);

			this.#lineNum = ln;
			this.#jump_light(cs);

			return false;
		};

		for (; this.#idxToken < this.#script.len; ++this.#idxToken) {
			// トークンの行番号更新
			this.#script.aLNum[this.#idxToken] ||= this.#lineNum; // ??はNaN不可

			const token = this.#script.aToken[this.#idxToken]!;
			if (token.search(this.#REG_TOKEN_MACRO_END) > -1) {
				++this.#idxToken;
				return false;
			}

			const uc = token.charCodeAt(0);	// TokenTopUnicode
			if (uc === 10) this.#lineNum += token.length;	// \n 改行
			else if (uc === 91) this.#lineNum += (token.match(/\n/g) ?? []).length;	// [ タグ開始
		}
		throw `マクロ[${name}]定義の終端・[endmacro]がありません`;
	}
	#strStepin	= 'call';
	#REGSTEPIN	= /\[(call)\b/;	// https://regex101.com/r/Lk9ASK/1


	//MARK: しおりの読込
	#load(hArg: TArg) {
		if ('fn' in hArg !== 'label' in hArg) throw 'fnとlabelはセットで指定して下さい';

		const place = argChk_Num(hArg, 'place', 0);
		const mark = this.val.getMark(place);
		if (! mark) throw `place=${String(place)} は存在しません`

		return this.loadFromMark(hArg, mark, SndProcOnLoad.ALL_STOP_AND_PLAY);
	}
	loadFromMark(hArg: TArg, mark: T_Mark, snd: SndProcOnLoad = SndProcOnLoad.MINIMAL_STOP) {
		this.hTag.clear_event({});
		this.val.mark2save(mark);
		this.val.setMp(creMP());
		this.#layMng.recPagebreak();

		let ap: Promise<void>[] = [];
		if (snd !== SndProcOnLoad.NO_TOUCH) ap = this.sndMng
		.playLoopFromSaveObj(snd === SndProcOnLoad.ALL_STOP_AND_PLAY);

		if (argChk_Boolean(hArg, 'do_rec', true)) this.#mark = {
			hSave	: this.val.cloneSave(),
			hPages	: {...mark.hPages},
			aIfStk	: [...mark.aIfStk],
		}

		const o: TArg = {
			enabled	: Boolean(this.val.getVal('save:const.sn.autowc.enabled')),
			text	: String(this.val.getVal('save:const.sn.autowc.text')),
			time	: Number(this.val.getVal('save:const.sn.autowc.time')),
		};
		this.hTag.autowc(o);

		this.#aIfStk = [...this.#mark.aIfStk];
		this.#aCallStk = [];
		CmnTween.stopAllTw();

		const p = Promise.allSettled([...ap, ...this.#layMng.playback(this.#mark.hPages)])
		.then(()=> this.#layMng.cover(false));
		const {index, fn} = hArg;
		if (index) {	// ページ移動用
			if (CmnLib.debugLog) console.log(`📜 %cloadFromMark index:${String(index)} move!%c fn:${fn ?? ''}`, 'color:#3B0;', '');
			p.then(()=> {
				if (! this.#jumpWork(fn, '', index)) this.main.resume();
				// if (ret)		// 中で非同期で endProc() を呼ぶのでまかせる
				// if (! ret)	// 同期でなにもせずすぐ返る
			})
			.catch((e: unknown)=> console.error('loadFromMark e:%o', e));
			return true;
		}

		this.#layMng.cover(true);	// ページ移動では全画面黒で覆わない
		const fn2 = String(this.val.getVal('save:const.sn.scriptFn'));
		const idx = Number(this.val.getVal('save:const.sn.scriptIdx'));
		// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
		delete this.#hScript[fn2];	// 必ずスクリプトを再読込。吉里吉里に動作を合わせる
		const {label} = hArg;
		p.then(label ?()=> {
			this.#scriptFn = fn2;
			this.#idxToken = idx;
			if (! this.hTag.call({
				...fn ?{fn} :{},
				label,
			})) this.main.resume();
		}
		: ()=> {
			if (! this.#jumpWork(fn2, '', idx)) this.main.resume();
		})
		.catch((e: unknown)=> console.error('loadFromMark e:%o', e));

		return true;
	}

	//MARK: スクリプト再読込
	#reload_script(hArg: TArg) {	// 最後の[record_place]から再開
		const mark = this.val.getMark(0);
		if (! mark) return false;

		// 起動から再読込までの間に追加・変更・削除されたファイルがあるかも、に対応
		//	delete this.hScript[this.#scriptFn];	// これだと[reload_script]位置になる
		// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
		delete this.#hScript[getFn(mark.hSave['const.sn.scriptFn'])];

		// 派生ファイルを削除
		const h: HScript = {};
		for (const fn in this.#hScript) {
			try {this.#cnvSnPath(fn +'@')}
			catch {h[fn] = this.#hScript[fn]!}	// 派生ファイル以外を残す
		}
		this.#hScript = h;

		hArg.do_rec = false;
		return this.loadFromMark(hArg, mark, SndProcOnLoad.NO_TOUCH);
	}


	//MARK: セーブポイント指定
	#mark: T_Mark = {
		hSave	: creSAVEDATA(),
		hPages	: {},
		aIfStk	: [-1],
	};
	#record_place = ()=> {
		const {fn, idx} = this.nowScrIdx();
		this.val.setVal_Nochk('save', 'const.sn.scriptFn', fn);
		this.val.setVal_Nochk('save', 'const.sn.scriptIdx', idx);
		this.#mark = {
			hSave	: this.val.cloneSave(),
			hPages	: this.#layMng.record(),
			aIfStk	: this.#aIfStk.slice(this.#aCallStk.length),
		};

		return false;
	}
	nowScrIdx(): {fn: string, idx: number} {
		const len = this.#aCallStk.length;
		if (len === 0) return {
			fn	: this.#scriptFn,
			idx	: this.#idxToken,
		};

		const cs = this.#aCallStk[0]!;
		return {
			fn	: cs.fn,
			idx	: cs.idx,
		}
	}
	nowMark(): T_Mark {return {...this.#mark}}	// コピーはここでする

	//MARK: スクリプト停止位置（マクロなどなら最上位の呼び元）
	nowScrFnLn(): {fn: string, ln: number, col_s: number, col_e: number} {
		const {fn, idx} = this.nowScrIdx();
		const st = this.#hScript[fn]!;
		const o = this.#cnvIdx2lineCol(st, idx);	// -1不要
		return {fn, ...o};
	}

	//MARK: しおりの保存
	#save(hArg: TArg) {
		if (! ('place' in hArg)) throw 'placeは必須です';
		const place = hArg.place;

		delete hArg[':タグ名'];
		delete hArg.place;
		hArg.text = hArg.text ?? '';
		this.#mark.json = hArg;
		this.val.setMark(place, this.#mark);

		const now_sp = Number(this.val.getVal('sys:const.sn.save.place'));
		if (place === now_sp) this.val.setVal_Nochk('sys', 'const.sn.save.place', now_sp +1);

		return false;
	}


	recodeDesign(hArg: TArg) {
		let fn = '';
		let idx = 0;

		const len = this.#aCallStk.length;
		if (hArg.design_unit && len > 0) {
			// デザインモードでこのマクロへの引数変更とするか（内部をサーチさせない）
			const cs = this.#aCallStk[0]!;
			fn = cs.fn;
			idx = cs.idx;
		}
		else {
			fn = this.#scriptFn;
			idx = this.#idxToken;
		}
		hArg[':path']	= this.#cnvSnPath4Dbg(fn);
		const scr = this.#hScript[fn]!;
		const lc = this.#cnvIdx2lineCol(scr, idx);
		hArg[':ln']		= lc.ln;
		hArg[':col_s']	= lc.col_s;
		hArg[':col_e']	= lc.col_e;
		const idx_1 = idx -1;
		hArg[':idx_tkn']= idx_1;
		hArg[':token']	= scr.aToken[idx_1] ?? '';

		this.sys.send2Dbg('_recodeDesign', hArg);
	}
	replace(idx: number, val: string) {this.#script.aToken[idx] = val}

}
