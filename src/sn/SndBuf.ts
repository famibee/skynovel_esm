/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2023-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// howler（Howl）を撤去し、Web Audio API を直接使う実装に置き換えてある（2026-08）。
//	ロード中/再生中/フェード中/終了待ち…の6状態を`sb.stt = new XXX(…)`という代入だけで
//	渡り歩く状態機械（StLoading〜StStop）と、Reading.beginProc/notifyEndProc連携（[ws]/[wf]）は
//	howler削除に関係なく温存した（bluesnovelは待ちをScriptMng側へ寄せた別設計にしているが、
//	そちらへ本家を作り替えるのは影響が過大なため）。
//
//	置き換えに伴い、以下の本家固有の不備も同時に直している：
//	・sprite（一周目/二周目）の力技 -> ネイティブの loopStart/loopEnd/start(0, off) へ
//	  （Web Audio APIならret_msの2周目以降の開始位置をそのまま渡せる。旧実装のsprite合成やbad
//	  knowhow［:239 あたり］は丸ごと不要）
//	・.bin暗号アセットのBlob URL経由読み込みを撤去（decodeAudioData()はArrayBufferを直接
//	  受け取れるので、createObjectURL/revokeObjectURLもonplayでのrevokeタイミング調整も不要）
//	・[xchgbuf]でbufが交換された後に自然終了すると、古いbuf名でtmp:playingを倒していた
//	  （buf を readonly から可変にし、交換元＝SoundMng.#xchgbuf() 側で書き換える）
//	・[wf]待機中に音が自然終了すると誰もnotifyEndProc('wf')を呼ばずスクリプトが永久停止していた
//	  （StWaitingFade.onend()をonfade()と同じ経路に統合）
//	・フェード停止時にStStopが2回構築されていた（sb.stt.onfade()の呼び出し元とコールバック側の
//	  両方でsb.stt = new StStop(sb)していた二重代入を解消）
//	・[fadese]のdelay属性が実装されておらず死んでいた（GainNodeのsetValueAtTimeで有効化。
//	  仕様変更として周知）
//	・自動再生ブロック中の擬似終了タイマー（#tidFakeEnd）がspeedを考慮しておらず、
//	  speed!==1のとき実際の再生完了より遅れて発火していた（/speedで補正）
//
//	AudioContext・マスタ音量・デコードキャッシュはSndCtx（モジュール単位のシングルトン）に
//	委譲し、こちらは「1バッファ＝1インスタンス」の状態機械と再生ノードの取り回しに専念する。

import {type IEvtMng, argChk_Boolean, argChk_Num} from './CmnLib';
import type {T_Variable, T_Main} from './CmnInterface';
import {SEARCH_PATH_ARG_EXT} from './ConfigBase';
import type {Config} from './Config';
import type {SysBase} from './SysBase';
import type {TArg} from './Grammar';
import {Reading} from './Reading';
import {SndCtx} from './SndCtx';


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

export	function	getVol(hArg: TArg, def: number): number {
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
		argChk_Num(hArg, 'speed', 1),
	);

	// 生きているSndBuf全部（E2E計装用。旧Howler._howls相当の観測点。
	//	デコード中＝StLoadingの間も含め、unload()で除去されるまで残る）
	static	readonly	live = new Set<SndBuf>();


	stt		: ISndState	= new StLoading(this);


	buf		: string;	// [xchgbuf]でSoundMng.#xchgbuf()が書き換える（可変。交換後に自然終了しても
							//	古いbuf名でtmp:playingを倒さないための対応。以前はreadonlyだった）
	private	constructor(
			readonly	hArg	: TArg,
			buf		: string,
			readonly	fn		: string,
			readonly	procID	: string,
			readonly	join	: boolean,
			readonly	start_ms: number,
	private	readonly	end_ms	: number,
			readonly	ret_ms	: number,
			readonly	loop	: boolean,
			readonly	pan		: number,
			readonly	speed	: number,
	) {
		this.buf = buf;
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
		// デコード完了通知。成否や停止済みを問わず必ず一度は呼ぶ事。
		// [しおり読込]は此処で解決する Promise を allSettled()で待つので、
		// 呼ばないと解放漏れの代わりにスクリプトが再開しなくなる
		this.#notifyLoaded = ()=> {
			this.#notifyLoaded = ()=> { /* empty */ };	// 二重通知を防ぐ
			cmn_loaded();
			hArg.fnc?.();	// なにか使ってたっけ？
		};

		const src = this.src = SndBuf.#cfg.searchPath(fn, SEARCH_PATH_ARG_EXT.SOUND);

		// 再生ノード構築：gn（自分の音量）-> [pn（パン）] -> SndCtx.master -> ctx.destination
		const ctx = SndCtx.ctx;
		const gn = this.gn = ctx.createGain();
		gn.gain.value = volume;
		this.#pan = pan < -1 ? -1 : pan > 1 ? 1 : pan;
		if (this.#pan !== 0 && typeof ctx.createStereoPanner === 'function') {
			const pn = ctx.createStereoPanner();
			pn.pan.value = this.#pan;
			gn.connect(pn);
			pn.connect(SndCtx.master);
		}
		else gn.connect(SndCtx.master);

		SndBuf.live.add(this);

		// .bin（暗号化アセット）だけ復号（decAB）を経由する。復号は本家に無くsnsys_preプラグインが
		//	供給する。decodeAudioData()はArrayBufferを直接受け取れるので、旧実装のようなBlob化は不要
		const isBin = src.endsWith('.bin');
		const fetchOk = ()=> SndBuf.#sys.fetch(src).then(r=> {
			if (! r.ok) throw `fetch失敗 ${String(r.status)} ${r.statusText}`;
			return r.arrayBuffer();
		});
		const fetchAB = isBin
			? ()=> fetchOk().then(ab=> SndBuf.#sys.decAB(ab)).then(ab=> <ArrayBuffer>ab)
			: fetchOk;

		SndCtx.decode(src, fetchAB).then(ab=> {
			this.#notifyLoaded();
			if (this.#stopped) return;	// デコード完了前にstopseされた

			this.#onDecoded(ab);
		})
		.catch((e: unknown)=> {
			this.#notifyLoaded();
			if (this.#stopped) return;	// 停止済み。こちらが捨てた音なのでエラーとして見せない

			errScript(`SndBuf 音声のデコードに失敗しました fn:${fn} ${String(e)}`, false);
			this.unload();
		});
	}
	#notifyLoaded	= ()=> { /* empty */ };

	readonly	src		: string;
	readonly	gn		: GainNode;	// フェード・音量のターゲット
	#pan	= 0;	// クランプ済みの実効パン値（this.panは属性の生値）

	// ロード中・fetch 待ちの間に stopse された事を示す。
	// これを見ないと、解放後に再生ノードが生成・再生されてしまう
	#stopped	= false;
	#ab			: AudioBuffer | undefined	= undefined;
	#srcNode	: AudioBufferSourceNode | undefined	= undefined;
	#endMsResolved	= 0;	// end_ms（MAX_END_MS/負値）を実尺で解決した値
	#tidFakeEnd	: ReturnType<typeof setTimeout> | undefined = undefined;
	#tidFade	: ReturnType<typeof setTimeout> | undefined = undefined;

	#onDecoded(ab: AudioBuffer) {
		this.#ab = ab;
		const durMs = ab.duration * 1000;
		let end_ms = this.end_ms;
		if (end_ms === MAX_END_MS) end_ms = durMs;
		else if (end_ms < 0) end_ms = durMs + end_ms;
		this.#endMsResolved = end_ms;

		const {hArg, start_ms, ret_ms, loop} = this;
		const tag = hArg[':タグ名'] ?? '';
		if (durMs <= start_ms) errScript(`[${tag}] 音声ファイル再生時間:${String(durMs)} <= start_ms:${String(start_ms)} は異常値です`);
		if (end_ms <= start_ms) errScript(`[${tag}] end_ms:${String(this.end_ms)}(${String(end_ms)}) <= start_ms:${String(start_ms)} は異常値です`);
		if (loop) {
			if (durMs <= ret_ms) errScript(`[${tag}] 音声ファイル再生時間:${String(durMs)} <= ret_ms:${String(ret_ms)} は異常値です`);
			if (end_ms <= ret_ms) errScript(`[${tag}] end_ms:${String(this.end_ms)}(${String(end_ms)}) <= ret_ms:${String(ret_ms)} は異常値です`);
		}
		if (this.end_ms !== MAX_END_MS && durMs <= end_ms) errScript(`[${tag}] 音声ファイル再生時間:${String(durMs)} <= end_ms:${String(this.end_ms)} は異常値です`);

		const ctx = SndCtx.ctx;
		const src = this.#srcNode = ctx.createBufferSource();
		src.buffer = ab;
		src.playbackRate.value = this.speed;
		src.loop = loop;
		if (loop) {
			// ネイティブのloopStart/loopEndで1周目start_ms〜end_ms、2周目以降ret_ms〜end_msを
			//	そのまま表現できる。旧実装はhowlerにこの機能が無く、sprite（一周目／二周目）＋
			//	自作onendで模した力技をしていた
			src.loopStart = ret_ms / 1000;
			src.loopEnd = Math.max(end_ms, ret_ms + 1) / 1000;
		}
		else src.onended = ()=> {
			this.#srcNode = undefined;	// stop()からの二重停止呼び出しを避ける
			this.stt.onend();
		};
		src.connect(this.gn);

		const off = start_ms / 1000;
		if (loop) src.start(0, off);
		else {
			src.start(0, off, Math.max(0, end_ms - start_ms) / 1000);

			// タブのミュート中や AudioContext.state === 'suspended' の場合は
			//	再生が進まず'ended'イベントも来ないため、タイマーで擬似的に発生させる。
			//	speedで割らないと、speed!==1のとき実際の再生完了より遅れて発火する（旧実装のバグ）
			if (SndCtx.needClick2Play()) this.#tidFakeEnd = setTimeout(()=> {
				this.#tidFakeEnd = undefined;
				this.#srcNode = undefined;
				this.stt.onend();
			}, Math.max(0, (end_ms - start_ms) / this.speed));
		}

		this.stt = new StPlaying(this);
	}

	// [fadese]。timeMs後にvolへ到達するようGainNodeを自動化し、完了時にonDoneを呼ぶ
	startFade(vol: number, timeMs: number, delayMs: number, onDone: ()=> void) {
		if (this.#tidFade) {clearTimeout(this.#tidFade); this.#tidFade = undefined}

		const now = SndCtx.ctx.currentTime;
		const from = this.gn.gain.value;
		this.gn.gain.cancelScheduledValues(now);
		this.gn.gain.setValueAtTime(from, now);
		const t0 = now + delayMs / 1000;
		this.gn.gain.setValueAtTime(from, t0);	// delayぶん保持してからランプ開始
		this.gn.gain.linearRampToValueAtTime(vol, t0 + timeMs / 1000);

		this.#tidFade = setTimeout(()=> {
			this.#tidFade = undefined;
			onDone();
		}, delayMs + timeMs);
	}

	// 再生ノード・GainNode・タイマーを確実に解放する。停止経路は必ずここを通す
	unload() {
		this.#stopped = true;
		SndBuf.live.delete(this);
		if (this.#tidFakeEnd) {clearTimeout(this.#tidFakeEnd); this.#tidFakeEnd = undefined}
		if (this.#tidFade) {clearTimeout(this.#tidFade); this.#tidFade = undefined}
		if (this.#srcNode) {
			try {this.#srcNode.stop()}
			catch {/* 既に停止済み等。ブラウザ差異に対する保険 */}
			this.#srcNode.disconnect();
			this.#srcNode = undefined;
		}
		this.gn.disconnect();
	}


	stopse() {this.stt.stopse()}
	readonly	ws	= (hArg: TArg)=> this.stt.ws(hArg);	// 戻り値必須
	readonly	fade= (hArg: TArg)=> this.stt.fade(hArg);
	readonly	wf	= (hArg: TArg)=> this.stt.wf(hArg);	// 戻り値必須

	get	volume() {return this.gn.gain.value}
	set volume(v: number) {	// フェード中の呼び出しは、進行中のランプを打ち切って即時反映する
		if (this.#tidFade) {clearTimeout(this.#tidFade); this.#tidFade = undefined}
		const now = SndCtx.ctx.currentTime;
		this.gn.gain.cancelScheduledValues(now);
		this.gn.gain.setValueAtTime(v, now);
	}

	// ---- E2E計装用の観測点（旧: Howlの私有プロパティ経由） -----------------------
	get duration()	{return this.#ab?.duration ?? 0}
	get playing()	{return this.#srcNode !== undefined}
	get effPan()	{return this.#pan}
	get startMs()	{return this.start_ms}
	get endMs()		{return this.#endMsResolved}
	get retMs()		{return this.ret_ms}
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
	constructor(private readonly sb: SndBuf) {}
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
		val.flush();

		const time = argChk_Num(hArg, 'time', NaN);
		const delay = argChk_Num(hArg, 'delay', 0);
		const {sb} = this;
		if (time === 0 && delay === 0 || evtMng.isSkipping) {
			sb.volume = vol;
			if (stop) sb.stt = new StStop(sb);
			return;
		}

		sb.stt = new StFade(sb, stop);
		sb.startFade(vol, time, delay, ()=> sb.stt.onfade());
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
	constructor(private readonly sb: SndBuf, private readonly stopOnFade: boolean) {}
	onend()  {this.stopse()}	// ok
	onfade() {					// ok
		if (this.stopOnFade) this.stopse();
		else this.sb.stt = new StPlaying(this.sb);
	}
	stopse() {this.sb.stt = new StStop(this.sb)}
	ws =()=> false;				// ok
	fade()   { /* empty */ }	// ok
	wf(hArg: TArg) {			// ok
		const {sb} = this;
		sb.stt = new StWaitingFade(sb, this.stopOnFade);
		const canskip = argChk_Boolean(hArg, 'canskip', false);
		if (canskip && evtMng.isSkipping) return false

		const fnc = ()=> { /* empty */ };
		Reading.beginProc(sb.procID +'wf', fnc, true, canskip ?fnc: undefined);
		return true;
	}
}

// [wf]
class StWaitingFade implements ISndState {
	constructor(private readonly sb: SndBuf, private readonly stopOnFade: boolean) {}
	// 直す前は stopse() のみを呼び notifyEndProc('wf') が発生せず、[wf]待機中に音が自然終了すると
	//	スクリプトが永久停止していた（既知バグ）。フェード完了時と同じ経路（onfade）に統合して解消
	onend()  {this.onfade()}
	onfade() {					// ok
		if (this.stopOnFade) this.stopse();
		else this.sb.stt = new StPlaying(this.sb);

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

		sb.unload();	// ロード中・fetch 待ちでも確実に解放する為

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
