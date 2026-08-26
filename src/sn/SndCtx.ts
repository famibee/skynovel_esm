/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 音声再生の基盤層（howler撤去に伴う新設）。プロセスに1つだけの AudioContext + マスタ GainNode
//	を持つ、CmnLib と同じ形の static 専用クラス＝モジュール単位のシングルトン。
//	SoundMng の寿命（SysBase.run() で Main ごと作り直される）に縛ると、作り直しのたびに
//	ctx が増えて Chrome の上限6件に当たるため、あえて SoundMng の外に置く
//	（[ws]/[wf]の待ち合わせや6状態の状態機械は持たない。SndBuf 側に残したまま、
//	こちらは「鳴らす土台」＝ctx・マスタ音量・デコードキャッシュだけに専念させる。
//	bluesnovel src/ts/SndMng.ts:38-88 相当）
//	[stop_allse]でも本家のように howler の Howler.unload() で ctx ごと作り直さない
//	（iOS/Safariでは新しい ctx が必ず suspended で始まり、次のタップまで無音になるリスクがある）

// 拡張子ごとの再生可否判定に使う MIME タイプ（本家の Howler.codecs() が内部で使う判定と同じ狙い。
//	howlerのソース同梱表を参考にしたおおまかな対応。tmp:const.sn.sound.codecsとして公開するだけの
//	情報用途で、現状どのテンプレも参照していないため厳密一致より「妥当な近似」を優先している）
const H_CODEC_MIME: {[ext: string]: string} = {
	mp3: 'audio/mpeg', mpeg: 'audio/mpeg', opus: 'audio/ogg; codecs="opus"',
	ogg: 'audio/ogg; codecs="vorbis"', oga: 'audio/ogg; codecs="vorbis"',
	wav: 'audio/wav; codecs="1"', aac: 'audio/aac', caf: 'audio/x-caf',
	m4a: 'audio/mp4; codecs="mp4a.40.2"', m4b: 'audio/mp4; codecs="mp4a.40.2"',
	mp4: 'audio/mp4; codecs="mp4a.40.2"',
	weba: 'audio/webm; codecs="vorbis"', webm: 'audio/webm; codecs="vorbis"',
	dolby: 'audio/mp4; codecs="ec-3"', flac: 'audio/flac',
};

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class SndCtx {
	static	#ctx?: AudioContext;
	static	#gn?: GainNode;
	// AudioContextは初回アクセス時に遅延生成する（constructor相当のタイミングでnewすると、
	//	ユーザー操作より前に生成された扱いになり、ブラウザによってはsuspended固定になりうる）
	static	#getCtx(): {ctx: AudioContext; gn: GainNode} {
		if (SndCtx.#ctx && SndCtx.#gn) return {ctx: SndCtx.#ctx, gn: SndCtx.#gn};

		const ctx = SndCtx.#ctx = new AudioContext();
		const gn = SndCtx.#gn = ctx.createGain();
		gn.connect(ctx.destination);
		return {ctx, gn};
	}
	static	get ctx(): AudioContext {return SndCtx.#getCtx().ctx}
	// 個々のSndBufが繋ぐ先（マスタ音量）
	static	get master(): GainNode {return SndCtx.#getCtx().gn}

	// ブラウザの自動再生ポリシー対策。初回のクリック・キー入力から呼ぶ（EventMng参照。
	//	howlerの`autoUnlock`（既定true）が消えるので、これに代わって明示的に呼ぶ必要がある）
	static	unlock() {
		if (! ('AudioContext' in globalThis)) return;

		const {ctx} = SndCtx.#getCtx();
		if (ctx.state === 'suspended') void ctx.resume();
	}
	static	needClick2Play(): boolean {
		if (! ('AudioContext' in globalThis)) return false;

		return SndCtx.#getCtx().ctx.state === 'suspended';
	}
	// Howler.volume()は内部で0〜1にクランプするので、置き換えるこちらも自前でクランプする
	static	setGlobalVol(v: number) {SndCtx.#getCtx().gn.gain.value = v < 0 ? 0 : v > 1 ? 1 : v}
	static	get globalVol(): number {return SndCtx.#gn?.gain.value ?? 1}

	static	codecs(): string {
		const a = document.createElement('audio');
		const h: {[ext: string]: boolean} = {};
		for (const [ext, mime] of Object.entries(H_CODEC_MIME)) h[ext] = a.canPlayType(mime) !== '';
		return JSON.stringify(h);
	}

	// src（検索解決済みURL）-> デコード済みAudioBufferのキャッシュ。同じ音声の連打で
	//	毎回fetch/decodeし直さない（本家に無い改善。AudioBufferは複数のAudioBufferSourceNode
	//	から同時参照して安全なので、キャッシュした1個を使い回せる）。
	//	デコード失敗時はキャッシュに残さず、次回また取りに行く
	static	readonly	#hAB = new Map<string, Promise<AudioBuffer>>();
	static	decode(src: string, fetchAB: ()=> Promise<ArrayBuffer>): Promise<AudioBuffer> {
		let p = SndCtx.#hAB.get(src);
		if (! p) {
			const {ctx} = SndCtx.#getCtx();
			p = fetchAB().then(ab=> ctx.decodeAudioData(ab));
			p.catch(()=> SndCtx.#hAB.delete(src));
			SndCtx.#hAB.set(src, p);
		}
		return p;
	}
}
