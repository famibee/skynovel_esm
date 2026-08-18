/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// E2E（Playwright）専用の起動エントリ。src/ 配下には一切手を入れず、
//	ここだけでテスト用のフック（window.__probe / window.__sn）を生やす。
//	vite dev が src/ をそのままトランスパイルして配信するため、
//	src/ 側と同一モジュール実体を掴める（＝SndBuf.live も本番と同じ物）。

// **この import は必ず先頭**。src/ より先に評価してブラウザAPIを包む必要がある
import './probe';

import {SysWeb} from '../../../src/web';
import {Reading} from '../../../src/sn/Reading';
import {SndBuf} from '../../../src/sn/SndBuf';
import {SndCtx} from '../../../src/sn/SndCtx';

// SndBuf.live は解放漏れの最も直接的な指標。unload()でしか除去されないので、
//	「再生と停止を繰り返しても増えない」が SndBuf の検査そのものになる
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).__probe.sndLive = ()=> SndBuf.live.size;

// ?prj=leak でシナリオ（プロジェクトフォルダ）を切り替える。
//	読むのは常に main（path.json の "main"）なので、シナリオごとにフォルダを分ける
const prj = new URLSearchParams(location.search).get('prj') ?? 'leak';

// 暗号化アセットの検査用。復号は本家に無く snsys_pre プラグインが供給する
//	（SysBase.loaded の setDec/setDecAB）ので、そのときだけ読み込む。
//	鍵はE2E専用の使い捨て（test/e2e/app/mkPrjCrypto.mjs が生成）
const crypto = prj === 'crypto';
const hPlg = crypto ? {snsys_pre: await import('./snsys_pre')} : {};

const sys = new SysWeb(hPlg, {cur: `/test/e2e/app/prj_${prj}/`, crypto, dip: ''});

// index.html の [data-reload] ボタンが SysWeb 側で run() に繋がれる。
//	sys 自体も出しておく（Main を作り直す検査で使う）。
//	isWait は「[l]/[p]で本物の停止点に着いたか」。文字送り演出の最中にクリックすると
//	「読み進め」ではなく「瞬時完了」として消費されてしまい、進行が1回ぶん失われるため、
//	クリック前には必ずこれを見る（本文の表示だけでは判定できない）。
//
//	main/val は protected だが、**src/ に手を入れずに中を見るため**ここだけ any で覗く。
//	音声まわりは組み込み変数（const.sn.sound.*）と SndBuf の公開ゲッタが唯一の観測点で、
//	鳴っている音そのものはヘッドレスでは確かめようがない
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const anySys = <any>sys;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).__sn = {
	sys,
	isWait	: ()=> Reading.isWait,

	// シナリオの任意ラベルへ飛ぶ。元のギャラリーはボタンで選ばせていたが、
	//	E2Eではこれで直接その項目だけを走らせる（[event]の発火と同じ経路）
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	jump	: (label: string)=> anySys.main?.resumeByJumpOrCall({label}),

	// 組み込み変数（'save:const.sn.…' 等、スコープ付きで渡す）
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
	val		: (nm: string)=> anySys.val?.getVal(nm),

	// 生きている SndBuf の設定値。すべて公開ゲッタ経由（旧Howlの私有プロパティ覗きが不要になった）
	sndBufs	: ()=> [...SndBuf.live].map(sb=> ({
		src		: sb.src.split('/').pop(),
		loop	: sb.loop,
		speed	: sb.speed,
		pan		: sb.effPan,
		volume	: sb.volume,
		duration: sb.duration,
		playing	: sb.playing,
		startMs	: sb.startMs,
		endMs	: sb.endMs,
		retMs	: sb.retMs,
	})),
	glbVolume: ()=> SndCtx.globalVol,
};
