/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2023-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, type IEvtMng, argChk_Boolean, argChk_Num} from './CmnLib';
import type {T_Variable, T_Main, T_PRequired} from './CmnInterface';
import {SEARCH_PATH_ARG_EXT} from './ConfigBase';
import type {Config} from './Config';
import type {SysBase} from './SysBase';
import type {TArg} from './Grammar';
import {Reading} from './Reading';

import {Howl, type HowlOptions} from 'howler';


export	const	BUF_BGM		= 'BGM';
export	const	BUF_SE		= 'SE';
		const	BUF_VOICE	= 'VOICE';

const	MAX_END_MS	= 999000;


let val		: T_Variable;
let errScript	: (mes: string, isThrow? :boolean)=> void;
let getSndBuf	: (buf: string)=> SndBuf | undefined;
let	evtMng	: IEvtMng;

let	hLP		: {[buf: string]: string}	= {};
let vol_mul_talking	= 1;

function	delLoopPlay(buf: string) {
	// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
	delete hLP[buf];
	const vn = 'const.sn.sound.'+ buf +'.';
	val.setVal_Nochk('save', vn +'fn', '');
	val.setVal_Nochk('save', 'const.sn.loopPlaying', JSON.stringify(hLP));
	val.flush();
}

function	getVol(hArg: TArg, def: number): number {
	const vol = argChk_Num(hArg, 'volume', def);
	if (vol < 0) return 0;
	if (vol > 1) return 1;
	return vol;
}

export	function xchgbuf({buf: buf1 = BUF_SE, buf2 = BUF_SE}: TArg) {
	if (buf1 === buf2) throw `[xchgbuf] buf:${buf1} が同じ値です`;

	const n1 = 'const.sn.sound.'+ buf1 +'.';
	const v1 = Number(val.getVal('save:'+ n1 +'volume'));
	const f1 = String(val.getVal('save:'+ n1 +'fn'));
	const n2 = 'const.sn.sound.'+ buf2 +'.';
	const v2 = Number(val.getVal('save:'+ n2 +'volume'));
	const f2 = String(val.getVal('save:'+ n2 +'fn'));
	val.setVal_Nochk('save', n1 +'volume', v2);
	val.setVal_Nochk('save', n2 +'volume', v1);
	val.setVal_Nochk('save', n1 +'fn', f2);
	val.setVal_Nochk('save', n2 +'fn', f1);

	// ループ再生中の記録も入れ替える。
	//	以前は「片方だけがループ中」の時しか更新しておらず、両方ループ中だと
	//	hLP が交換前のまま取り残されていた。[load]の BGM 復元はこれを読むので、
	//	しおりから戻すと音が入れ替わってしまう
	const in1 = buf1 in hLP;
	const in2 = buf2 in hLP;
	if (in1 || in2) {
		// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
		if (in2) hLP[buf1] = f2; else delete hLP[buf1];
		// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
		if (in1) hLP[buf2] = f1; else delete hLP[buf2];
		val.setVal_Nochk('save', 'const.sn.loopPlaying', JSON.stringify(hLP));
	}
	val.flush();
}


export class SndBuf {
	static	#cfg	: Config;
	static	#sys	: SysBase;
	static	init(cfg: Config, $val: T_Variable, main: T_Main, sys: SysBase, $getSndBuf: (buf: string)=> SndBuf | undefined) {
		hLP = {};
		SndBuf.#cfg	= cfg;
		val	= $val;
		errScript = (mes, isThrow)=> main.errScript(mes, isThrow);
		SndBuf.#sys	= sys;
		getSndBuf = $getSndBuf;
	}

	static	setEvtMng($evtMng: IEvtMng) {evtMng = $evtMng}


	static	readonly	generate
	= (hArg: TArg, buf: string, join: boolean)=> new SndBuf(
		hArg,
		buf,
		hArg.fn ?? '',
		Reading.procID,
		join,
		argChk_Num(hArg, 'start_ms', 0),
		argChk_Num(hArg, 'end_ms', MAX_END_MS),
		argChk_Num(hArg, 'ret_ms', 0),
		argChk_Boolean(hArg, 'loop', false),
		argChk_Num(hArg, 'pan', 0),
	);


	stt		: ISndState	= new StLoading(this);


	private	constructor(
			readonly	hArg	: TArg,
			readonly	buf		: string,
			readonly	fn		: string,
			readonly	procID	: string,
			readonly	join	: boolean,
	private	readonly	start_ms: number,
	private	readonly	end_ms	: number,
			readonly	ret_ms	: number,
			readonly	loop	: boolean,
	private	readonly	pan		: number,
	) {
		if (! fn) throw `fnは必須です buf:${buf}`;

		if (start_ms < 0) throw `[${hArg[':タグ名'] ?? ''}] start_ms:${String(start_ms)} が負の値です`;
		if (ret_ms < 0) throw `[${hArg[':タグ名'] ?? ''}] ret_ms:${String(ret_ms)} が負の値です`;
		if (0 < end_ms) {
			if (end_ms <= start_ms) throw `[${hArg[':タグ名'] ?? ''}] start_ms:${String(start_ms)} >= end_ms:${String(end_ms)} は異常値です`;
			if (end_ms <= ret_ms) throw `[${hArg[':タグ名'] ?? ''}] ret_ms:${String(ret_ms)} >= end_ms:${String(end_ms)} は異常値です`;
		}

		// 目標音量：save:const.an.sound.（バッファ名）.volume【[playse]系で指定】
		// 基準音量：sys:const.an.sound.（バッファ名）.volume【設定画面で設定】
		// この辺で属性を増減したら、loadFromSaveObj()にも反映する
		const vn = 'const.sn.sound.'+ buf +'.';
		val.setVal_Nochk('save', vn +'fn', fn);
		const savevol = getVol(hArg, 1);
		val.setVal_Nochk('save', vn +'volume', savevol);// 目標音量（save:）
		let volume = savevol * Number(val.getVal('sys:'+ vn +'volume', 1, true));
		switch (buf) {	// VOICE再生中はBGM音量を絞る
			case BUF_VOICE:{
				const v = vol_mul_talking = Number(val.getVal('sys:sn.sound.BGM.vol_mul_talking') ?? 1);	// 歴史的経緯で ??
				if (v === 1) break;

				const b = getSndBuf(BUF_BGM);
				const volnBGM = 'const.sn.sound.'+ BUF_BGM +'.volume';
				if (b) b.volume
					= Number(val.getVal('save:'+ volnBGM, 1))
					* Number(val.getVal('sys:'+ volnBGM, 1, true))
					* vol_mul_talking;
			}	break;

			case BUF_BGM:	volume *= vol_mul_talking;	break;
		}

		// セーブデータ系情報更新
		if (loop) {
			hLP[buf] = fn;
			val.setVal_Nochk('save', 'const.sn.loopPlaying', JSON.stringify(hLP));
		}
		else delLoopPlay(buf);
		val.setVal_Nochk('save', vn +'start_ms', start_ms);
		val.setVal_Nochk('save', vn +'end_ms', end_ms);
		val.setVal_Nochk('save', vn +'ret_ms', ret_ms);
		val.setVal_Nochk('tmp', vn +'playing', true);
		val.flush();


		let cmn_loaded = ()=> { /* empty */ };
		if (join) {
			const RPN_LOADED = procID +` loaded buf:${buf} fn:${fn}`;
			Reading.beginProc(RPN_LOADED);
			cmn_loaded = ()=> Reading.endProc(RPN_LOADED);
		}
		// ロード完了通知。成否や停止済みを問わず必ず一度は呼ぶ事。
		// [しおり読込]は此処で解決する Promise を allSettled()で待つので、
		// 呼ばないと解放漏れの代わりにスクリプトが再開しなくなる
		this.#notifyLoaded = ()=> {
			this.#notifyLoaded = ()=> { /* empty */ };	// 二重通知を防ぐ
			cmn_loaded();
			hArg.fnc?.();	// なにか使ってたっけ？
		};
		const src = SndBuf.#cfg.searchPath(fn, SEARCH_PATH_ARG_EXT.SOUND);
// console.log(`fn:SndBuf.ts constructor fn:${fn} src:${src}:`);
		const o: T_PRequired<HowlOptions, 'onload'> = {
			src,
			volume,
			html5	: false,	// Delay with html5:true and loop:true · Issue #1586 · goldfire/howler.js https://github.com/goldfire/howler.js/issues/1586
			loop,
			autoplay: true,
			rate	: argChk_Num(hArg, 'speed', 1),
			onload	: ()=> {	// 暗号化ファイルでも src 経由なので来る
				this.#notifyLoaded();
				const snd = this.#snd;
				if (! snd || this.#stopped) return;
					// ロード完了前に stopse された。StStop を上書きして
					// 復活・自動再生しないよう、ここで打ち切る

				this.stt = new StPlaying(this, snd);
			},
			onloaderror	: (_, e)=> {
				this.#notifyLoaded();
				if (this.#stopped) return;
					// 停止済み。howler は unload()で _sounds が空になると、
					// デコードが成功していても loaderror を出す（howler.js:2468）。
					// こちらが捨てた音なので、エラーとして見せてはいけない

				this.unload();	// Howler._howls に残り続けるので
				errScript(`SndBuf ロード失敗です fn:${fn} ${String(e)}`, false);
			},
		};
		// ループ時、ループ終了のたびに発火
		if (! loop) o.onend = ()=> this.stt.onend();

		// start_ms、end_ms、ret_ms まわりの処理
// console.log(`fn:SndBuf.ts s:${String(start_ms)} e:${String(end_ms)} r:${String(ret_ms)} loop:${String(loop)}`);
		if (start_ms > 0 || end_ms !== MAX_END_MS || ret_ms > 0) {
			o.autoplay = false;

			const {一周目, 二周目} = o.sprite = {	// オフセットと持続時間
				一周目: [start_ms, end_ms -start_ms],
				二周目: [ret_ms,   end_ms -ret_ms, true],
			};
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const old = o.onload!;
			o.onload = id=> {
				old(id);
				const snd = this.#snd;
				if (! snd || this.#stopped) return;

				const d_ms = snd.duration() *1000;
				if (d_ms <= start_ms) errScript(`[${hArg[':タグ名'] ?? ''}] 音声ファイル再生時間:${String(d_ms)} <= ret_ms:${String(ret_ms)} は異常値です`);
				// end_ms
				// 正の値は「冒頭から何ms目を終端とするか」
				// 負の値は「末尾から何ms手前を終端とするか」
				if (end_ms < 0) {	// あとで sprite 変えるバッドノウハウ
					一周目[1] = d_ms +end_ms -start_ms;
					二周目[1] = d_ms +end_ms -ret_ms;
				}
				else if (end_ms === MAX_END_MS) {
					一周目[1] = d_ms -start_ms;
					二周目[1] = d_ms -ret_ms;
				}

				const end = 一周目[1] +start_ms;
				if (end <= start_ms) errScript(`[${hArg[':タグ名'] ?? ''}] end_ms:${String(end_ms)}(${String(end)}) >= start_ms:${String(start_ms)} は異常値です`);
				if (end <= ret_ms) errScript(`[${hArg[':タグ名'] ?? ''}] end_ms:${String(end_ms)}(${String(end)}) <= ret_ms:${String(ret_ms)} は異常値です`);
				if (d_ms <= start_ms) errScript(`[${hArg[':タグ名'] ?? ''}] 音声ファイル再生時間:${String(d_ms)} <= start_ms:${String(start_ms)} は異常値です`);
				if (end_ms !== MAX_END_MS && d_ms <= end) errScript(`[${hArg[':タグ名'] ?? ''}] 音声ファイル再生時間:${String(d_ms)} <= end_ms:${String(end_ms)} は異常値です`);

				snd.play('一周目');
			}

			// 特殊な二周目にする場合の処理
			if (loop && ret_ms > 0) {
				delete o.loop;	// ret_ms 有効時は自作ループで（先頭に戻ってしまう）

				let onend = ()=> {	// もう一箇所の【o.onend =】と住み分けしてる
					onend = ()=> { /* empty */ };
					this.#snd?.play('二周目');
				};
				o.onend = ()=> onend();	// ループ時、ループ終了のたびに発火
			}
		}


		// play、その後 onload 発生
		if (! src.endsWith('.bin')) {this.#play(o); return}

		// fetch、play、その後 onload 発生
		void SndBuf.#sys.fetch(src).then(async res=> {
			if (! res.ok) errScript(`SndBuf ロード失敗です d1 fn:${fn} ${res.statusText}`, true)

			const abEnc = await res.arrayBuffer();
			const ab = <ArrayBuffer>await SndBuf.#sys.decAB(abEnc)
			.catch((e: unknown)=> errScript(`SndBuf ロード失敗です d2 fn:${fn} ${String(e)}`, false));

			const abView = new Uint8Array(ab);
			const blob = new Blob([abView], {type: 'music/mp3'});
			this.#oUrl = URL.createObjectURL(blob);
			o.src = this.#oUrl;
			o.format = 'mp3';
			o.onplay = ()=> this.#revokeOUrl();
			this.#play(o);
		})
		.catch((e: unknown)=> {
			this.#notifyLoaded();	// 例外時も通知しないと待ち続けてしまう
			errScript(`SndBuf ロード失敗です d3 fn:${fn} ${String(e)}`, false);
		});
	}
	#notifyLoaded	= ()=> { /* empty */ };

	// ロード中・fetch 待ちの間に stopse された事を示す。
	// これを見ないと、解放後に Howl が生成・再生されてしまう
	#stopped	= false;
	#oUrl		= '';
	#revokeOUrl() {
		if (! this.#oUrl) return;

		URL.revokeObjectURL(this.#oUrl);	// 未再生（自動再生ブロック・ロード
		this.#oUrl = '';					// 失敗）でも Blob を解放する為
	}
	#tidFakeEnd	: NodeJS.Timeout | undefined = undefined;

	// Howl を確実に解放する。Howler._howls は unload()でしか除去されず、
	// 放置すると解放されないまま蓄積するので、停止経路は必ずここを通す
	unload() {
		this.#stopped = true;
		if (this.#tidFakeEnd) {clearTimeout(this.#tidFakeEnd); this.#tidFakeEnd = undefined}
		this.#snd?.unload();
		this.#snd = undefined;
		this.#revokeOUrl();
	}

	#snd	: Howl | undefined = undefined;
	#play(o: HowlOptions) {
		if (this.#stopped) {	// fetch 完了前に stopse された。もう生成しない。
			this.#revokeOUrl();	// onload が来ないので此処で通知する
			this.#notifyLoaded();
			return;
		}

		const snd = this.#snd = new Howl(o);
		if (this.pan !== 0) snd.stereo(this.pan);

		// タブのミュート中や AudioContext.state === 'suspended' の場合は
		//	再生もされないので再生終了イベントも発生しないため、タイマーで擬似的に発生させる
		if (! this.loop && CmnLib.needClick2Play()) snd.once('load', ()=> {
			if (this.#stopped) return;
// console.log(`fn:SndBuf.ts needClick2Play d:${String(snd.duration())}`);

			// duration()はロード完了までは 0 を返すので、必ず 'load'後に読む事。
			// また秒と ms が混ざらないよう、すべて ms に揃えて計算する
			const d_ms = snd.duration() *1000;
			const end_ms
				= this.end_ms === MAX_END_MS
				? d_ms					// ありえない巨大定数 = 音声ファイルの末端
				: this.end_ms <= 0
				? d_ms +this.end_ms		// 負の値は「末尾から何ms手前を終端とするか」
				: this.end_ms;			// 正の値は「冒頭から何ms目を終端とするか」
			this.#tidFakeEnd = setTimeout(()=> {
				this.#tidFakeEnd = undefined;
				o.onend?.(0);
			}, Math.max(0, end_ms -this.start_ms));
		});
	}


	stopse() {this.stt.stopse()}
	readonly	ws	= (hArg: TArg)=> this.stt.ws(hArg);	// 戻り値必須
	readonly	fade= (hArg: TArg)=> this.stt.fade(hArg);
	readonly	wf	= (hArg: TArg)=> this.stt.wf(hArg);	// 戻り値必須

	get	volume() {return this.#snd?.volume() ?? 0}	// ロード完了前・解放後は
	set volume(v: number) {this.#snd?.volume(v)}	// #snd 未生成なので
}


// =================================================


type ISndState = {
	// type も class に implements できるらしい！ https://qiita.com/tkrkt/items/d01b96363e58a7df830e
	onend()		: void;
	onfade()	: void;
	stopse()	: void;
	ws(hArg: TArg)	: boolean;
	fade(hArg: TArg): void;
	wf(hArg: TArg)	: boolean;
}

// [playse系]（ロード未完了）
class StLoading implements ISndState {
	constructor(private readonly sb: SndBuf) {}
	onend()  {this.stopse()}	// ok
	onfade() { /* empty */ }	// ok
	stopse() {this.sb.stt = new StStop(this.sb)}	// ok
	ws =()=> false;				// ok
	fade()   { /* empty */ }	// ok
	wf =()=> false;				// ok
}

// [playse系]（ロード完了）
class StPlaying implements ISndState {
	constructor(private readonly sb: SndBuf, private readonly snd: Howl) {}
	onend()  {this.stopse()}	// ok
	onfade() { /* empty */ }	// ok
	stopse() {this.sb.stt = new StStop(this.sb)}	// ok
	ws(hArg: TArg) {			// ok
		const {sb} = this;
		if (sb.loop) return false;

		sb.stt = new StWaitingStop(sb);
		const canskip = argChk_Boolean(hArg, 'canskip', false);
		const fnc = argChk_Boolean(hArg, 'stop', true)
			? ()=> sb.stt.stopse()
			: ()=> { /* empty */ };
		if (canskip && evtMng.isSkipping) {fnc(); return false}

		Reading.beginProc(sb.procID +'ws', fnc, true, canskip ?fnc :undefined);
		return true;
	}
	fade(hArg: TArg) {			// ok
		const {buf = BUF_SE} = hArg;
		const vn = 'const.sn.sound.'+ buf +'.';
		const bnV = vn +'volume';
		const savevol = getVol(hArg, NaN);
		val.setVal_Nochk('save', bnV, savevol);	// 目標音量（save:）
		const vol = savevol * Number(val.getVal('sys:'+ bnV, 1));
		const stop = argChk_Boolean(hArg, 'stop', savevol === 0);
		if (stop) delLoopPlay(buf);	// fade中reloadなど、できるだけ早く情報更新か
// console.log(`fn:SndBuf.ts fade vol:${String(vol)} savevol:${String(savevol)} stop:${String(stop)}`);
		val.flush();

		const time = argChk_Num(hArg, 'time', NaN);
		const delay = argChk_Num(hArg, 'delay', 0);
		const {sb, snd} = this;
		if (time === 0 && delay === 0 || evtMng.isSkipping) {
			snd.volume(vol);
			if (stop) sb.stt = new StStop(sb);
			return;
		}

		snd.fade(snd.volume(), vol, time)
		.once('fade', ()=> {
			sb.stt.onfade();
			if (stop) sb.stt = new StStop(sb);
		});

		sb.stt = new StFade(sb, stop, snd);
	}
	wf =()=> false;				// ok
}

// [ws]
class StWaitingStop implements ISndState {
	constructor(private readonly sb: SndBuf) {}
	onend()  {this.stopse()}	// ok
	onfade() { /* empty */ }	// ok
	stopse() {					// ok
		this.sb.stt = new StStop(this.sb);
		Reading.notifyEndProc(this.sb.procID +'ws');
	}
	ws =()=> false;				// ok
	fade()   { /* empty */ }	// ok
	wf =()=> false;				// ok
}

// [fade系]
class StFade implements ISndState {
	constructor(private readonly sb: SndBuf, private readonly stopOnFade: boolean, private readonly snd: Howl) {}
	onend()  {this.stopse()}	// ok
	onfade() {					// ok
		if (this.stopOnFade) this.stopse();
		else this.sb.stt = new StPlaying(this.sb, this.snd);
	}
	stopse() {this.sb.stt = new StStop(this.sb)}
	ws =()=> false;				// ok
	fade()   { /* empty */ }	// ok
	wf(hArg: TArg) {			// ok
		const {sb} = this;
		sb.stt = new StWaitingFade(sb, this.stopOnFade, this.snd);
		const canskip = argChk_Boolean(hArg, 'canskip', false);
		if (canskip && evtMng.isSkipping) return false

		const fnc = ()=> { /* empty */ };
		Reading.beginProc(sb.procID +'wf', fnc, true, canskip ?fnc: undefined);
		return true;
	}
}

// [wf]
class StWaitingFade implements ISndState {
	constructor(private readonly sb: SndBuf, private readonly stopOnFade: boolean, private readonly snd: Howl) {}
	onend()  {this.stopse()}	// ok
	onfade() {					// ok
// console.log(`fn:SndBuf.ts StWaitingFade.onfade() :${String(this.stopOnFade)}`);
		if (this.stopOnFade) this.stopse();
		else this.sb.stt = new StPlaying(this.sb, this.snd);

		Reading.notifyEndProc(this.sb.procID +'wf');
	}
	stopse() {this.sb.stt = new StStop(this.sb)}	// ok

	ws =()=> false;				// ok
	fade()   { /* empty */ }	// ok
	wf =()=> false;				// ok
}

// [stopse]
class StStop implements ISndState {
	constructor(sb: SndBuf) {
		// セーブデータ系情報更新
		if (sb.loop) delLoopPlay(sb.buf);
		const vn = 'const.sn.sound.'+ sb.buf +'.';
		val.setVal_Nochk('tmp', vn +'playing', false);
		val.flush();

		sb.unload();	// ロード中・fetch 待ちでも確実に解放する為、
						// 引数の Howl ではなく SndBuf 側に任せる

		if (sb.buf !== BUF_VOICE) return;
		const b = getSndBuf(BUF_BGM);
		if (b) {
			b.volume
			= Number(val.getVal('save:'+ vn +'volume', 1, true))	// 目標音量
			* Number(val.getVal('sys:'+ vn +'volume', 1, true));	// 基準音量
		}
		vol_mul_talking = 1;
	}
	onend()  { /* empty */ }	// ok
	onfade() { /* empty */ }	// ok
	stopse() { /* empty */ }	// ok
	ws =()=> false;				// ok
	fade()   { /* empty */ }	// ok
	wf =()=> false;				// ok
}
