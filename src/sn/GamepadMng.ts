/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// ゲームパッド入力。`gamepad.js`ライブラリの代替自前実装（移植元 bluesnovel
// src/ts/GamepadMng.ts、原理は同じ）。
// 削除理由: `gamepad.js`は型を同梱せず、rAFループの停止漏れ・windowの'error'リスナ
// 解除漏れという落とし穴を EventMng.ts 側で手当てする必要があった（旧 #destroyed 判定と
// destroy() 内の removeEventListener('error', ...) がその跡）。
// 素の Gamepad API を requestAnimationFrame でポーリングする自前実装に切り替え、
// 上記の落とし穴自体を無くす（動的 import も不要になるため #destroyed 判定も不要）

import {EVNM_KEY} from './CmnLib';
import type {FocusMng} from './FocusMng';
import {Reading} from './Reading';
import {Container} from 'pixi.js';


// スティック軸の量子化→矢印キー名（本家の 3x3 表と同じ。斜めは無視）
const AXIS_KEY_TABLE: readonly string[] = [
	'',			'ArrowUp',	'',				// 左上・上・右上
	'ArrowLeft', '',		'ArrowRight',	// 左・中央・右
	'',			'ArrowDown', '',			// 左下・下・右下
];
const DEAD_ZONE = 0.3;	// 本家の gamepad.js 側 deadZone 設定と同じ値
// 一度方向が確定した後、ニュートラルへ戻ったと判定するしきい値（DEAD_ZONEより緩める）。
// アナログスティックの値はDEAD_ZONE境界ちょうどで微小に揺れることがあり、単一のしきい値だと
// その揺れのたびに矢印キーが連続で再送されてしまう。ENTER/EXITの2段しきい値でヒステリシスを
// 持たせて境界付近の揺れを吸収する（bluesnovel の改善を取り込み）
const EXIT_ZONE = 0.2;

function axisToKey(x: number, y: number, zone: number): string {
	const qx = Math.abs(x) < zone ? 0 : Math.sign(x);
	const qy = Math.abs(y) < zone ? 0 : Math.sign(y);
	return AXIS_KEY_TABLE[(qy +1) *3 + (qx +1)] ?? '';
}


export class GamepadMng {
	constructor(private readonly fcs: FocusMng) {}

	start() {
		if (this.#raf >= 0) return;
		this.#raf = requestAnimationFrame(this.#loop);
	}
	stop() {
		if (this.#raf < 0) return;

		cancelAnimationFrame(this.#raf);
		this.#raf = -1;
		this.#hAxisKey.clear();
		this.#hBtn.clear();
	}
	#raf = -1;

	readonly #loop = ()=> {
		this.#raf = requestAnimationFrame(this.#loop);
		if (! document.hasFocus()) return;

		for (const gp of navigator.getGamepads()) {
			if (! gp) continue;

			this.#pollAxis(gp);
			this.#pollButtons(gp);
		}
	};

	// パッドindexごとの直前の軸キー・ボタン押下状態（変化検出＝立ち上がりのみ発火するため）
	readonly #hAxisKey = new Map<number, string>();
	readonly #hBtn = new Map<number, boolean[]>();

	#pollAxis(gp: Gamepad) {
		const prev = this.#hAxisKey.get(gp.index) ?? '';
		const key = axisToKey(gp.axes[0] ?? 0, gp.axes[1] ?? 0, prev ?EXIT_ZONE :DEAD_ZONE);
		if (key === prev) return;

		this.#hAxisKey.set(gp.index, key);
		if (! key) return;

		const cmp = this.fcs.getFocus();
		(! cmp || cmp instanceof Container ?globalThis :cmp)
		.dispatchEvent(new KeyboardEvent(EVNM_KEY, {key, bubbles: true}));

		if (! cmp || cmp instanceof Container) return;

		Reading.cancelAutoSkip();	// ユーザーアクションなので停止
		if (cmp.getAttribute('type') === 'range') cmp.dispatchEvent(new InputEvent('input', {bubbles: true}));	// スライダー変更時、表示数字が変わらない対応
	}

	#pollButtons(gp: Gamepad) {
		const prev = this.#hBtn.get(gp.index) ?? [];
		const cur = gp.buttons.map(b=> b.pressed);
		this.#hBtn.set(gp.index, cur);

		for (let i = 0; i < cur.length; ++i) {
			if (cur[i] && ! prev[i]) this.#onButtonDown(i);
		}
	}
	// 偶数ボタン→Enter（OK）、奇数ボタン→middleclick（本家互換のため bluesnovel の
	// rightclickへの変更は取り込まない。TODO.md参照）
	#onButtonDown(i: number) {
		if (i % 2 === 0) {
			Reading.cancelAutoSkip();	// ユーザーアクションなので停止
			const cmp = this.fcs.getFocus();
			(! cmp || cmp instanceof Container ?document.body :cmp)
			.dispatchEvent(new KeyboardEvent(EVNM_KEY, {key: 'Enter', bubbles: true}));
			return;
		}
		Reading.fire('middleclick', new Event('gamepad:button'), true);
	}
}
