/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// E2E（Playwright）専用の起動エントリ。src/ 配下には一切手を入れず、
//	ここだけでテスト用のフック（window.__probe / window.__sn）を生やす。
//	vite dev が src/ をそのままトランスパイルして配信するため、
//	src/ 側と同一モジュール実体を掴める（＝howler の Howler も本番と同じ物）。

// **この import は必ず先頭**。src/ より先に評価してブラウザAPIを包む必要がある
import './probe';

import {SysWeb} from '../../../src/web';
import {Reading} from '../../../src/sn/Reading';
import {Howler} from 'howler';

// Howler._howls は解放漏れの最も直接的な指標。unload()でしか除去されないので、
//	「再生と停止を繰り返しても増えない」が SndBuf の検査そのものになる。
//	型に無い私有プロパティなので any 経由で読む
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).__probe.howls = ()=> ((<any>Howler)._howls as unknown[]).length;

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
//	クリック前には必ずこれを見る（本文の表示だけでは判定できない）
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).__sn = {sys, isWait: ()=> Reading.isWait};
