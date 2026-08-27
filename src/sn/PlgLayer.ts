/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 一般プラグイン（3D/Live2D系。sn_gallery の live2d_layer/3d_layer/emote_layer 等）が
//	継承するレイヤ基底クラス。プラグインは自前の WebGL canvas を「PIXI canvas の上へ
//	重ねた DOM 要素」として描画する。
//
//	本家の `Layer.ctn` は pixi.js の Sprite（空テクスチャ）であって DOM 要素ではないため、
//	`this.ctn.appendChild(canvas)` はできない。そこで **見た目を担う素の <div>（`htm`）を
//	別に持たせ**、位置・回転・拡縮・不透明度・表示切替は appPixi.ticker から毎フレーム
//	`ctn`（＝[lay]/[tsy]/[trans] が操作する台帳）を読んで `htm.style` へ写す。
//
//	この「PIXI canvas の親要素へ自前 DOM を挿し、cvsResize() 相当で PIXI 座標→CSS 座標へ
//	変換する」構造は TxtStage.ts と同じ（TxtStage は [tsy] で procSetX/Y 経由の x/y しか
//	DOM に伝わらない制約を抱えているが、こちらは毎フレーム同期なので alpha/rotation/scale/
//	visible も追従し、[trans] のページ交換にも自動で付いていく）。差分ガードで実コストはほぼ 0。
//
//	分家 bluesnovel は Layer.ctn 自体が素の div なので、あちらでは
//	`get htm(){return this.ctn}` を足すだけで sn_gallery のプラグインコードが両エンジンで
//	動くようにする想定。

import {Layer} from './Layer';
import {CmnLib} from './CmnLib';
import type {SysBase} from './SysBase';

import {Sprite, Texture, type AbstractRenderer, type Application} from 'pixi.js';


export class PlgLayer extends Layer {
	static	#appPixi: Application;
	static	#sys	: SysBase;
	static	#isFore	: (me: Layer)=> boolean	= ()=> true;
	// 名前が init だと sn_gallery プラグイン側の `static init()`（CubismFramework 起動等の
	//	ブートストラップ。plugin/*/index.ts が呼ぶ）と衝突するため setup とする
	static	setup(appPixi: Application, sys: SysBase, isFore: (me: Layer)=> boolean): void {
		PlgLayer.#appPixi = appPixi;
		PlgLayer.#sys = sys;
		PlgLayer.#isFore = isFore;
	}


	// プラグインが canvas 等を appendChild する先。中身の生成・破棄はプラグインの責務
	readonly	htm	= document.createElement('div');

	constructor() {
		super();

		const s = this.htm.style;
		s.position = 'absolute';
		s.left = s.top = '0';
		s.width  = `${String(CmnLib.stageW)}px`;
		s.height = `${String(CmnLib.stageH)}px`;
		s.pointerEvents = 'none';	// ゲーム側クリックを塞がない。要るプラグインは自分で戻す
		s.overflow = 'visible';
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		PlgLayer.#appPixi.view.parentElement!.appendChild(this.htm);

		PlgLayer.#appPixi.ticker.add(this.#sync, this);
	}

	// 直前に書いた値。変化が無ければ style へ触れない（毎フレーム呼ばれるため）
	#lastTf		= '';
	#lastLeft	= '';
	#lastTop	= '';
	#lastOrigin	= '';
	#lastOpacity= '';
	#lastDisp	= '';
	#sync = ()=> {
		const c = this.ctn;
		const {cvsScale, ofsLeft4elm, ofsTop4elm} = PlgLayer.#sys;

		const left = `${String(ofsLeft4elm +c.position.x *cvsScale)}px`;
		if (left !== this.#lastLeft) this.htm.style.left = this.#lastLeft = left;

		const top = `${String(ofsTop4elm +c.position.y *cvsScale)}px`;
		if (top !== this.#lastTop) this.htm.style.top = this.#lastTop = top;

		const tf = `rotate(${String(c.angle)}deg) scale(${
			String(c.scale.x *cvsScale)}, ${String(c.scale.y *cvsScale)})`;
		if (tf !== this.#lastTf) this.htm.style.transform = this.#lastTf = tf;

		const origin = `${String(c.pivot.x)}px ${String(c.pivot.y)}px`;
		if (origin !== this.#lastOrigin) this.htm.style.transformOrigin = this.#lastOrigin = origin;

		const opacity = String(c.alpha);
		if (opacity !== this.#lastOpacity) this.htm.style.opacity = this.#lastOpacity = opacity;

		// 表示は「表ページ かつ ctn.visible」で判定。親（#fore/#back Container）の visible は
		//	[trans] 中に毎フレーム true/false されるので見てはいけない（TxtStage と同じ理由）
		const disp = c.visible && PlgLayer.#isFore(this) ? '' : 'none';
		if (disp !== this.#lastDisp) this.htm.style.display = this.#lastDisp = disp;
	};

	// リサイズ直後の 1 フレーム遅延を消すため即時に反映（差分ガードは #sync 側が持つ）
	override cvsResize() {this.#sync()}

	override destroy() {
		super.destroy();
		PlgLayer.#appPixi.ticker.remove(this.#sync, this);
		this.htm.remove();
	}


	// === [snapshot] 用ヘルパ =========================================================
	//	プラグイン側で override した snapshot(rnd, re) から
	//	`this.snapshotByCanvas(this.#canvas!, rnd, re)` と呼ぶ。canvas は
	//	preserveDrawingBuffer:true で確保しておくこと（rAF ループ外から読むため）。
	//	TxtStage.snapshot() が htm2tx で span を Texture 化して #cntTxt に一時 addChild するのと同型。
	#snapSp	: Sprite | undefined;
	snapshotByCanvas(cvs: HTMLCanvasElement, rnd: AbstractRenderer, re: ()=> void): void {
		const tx = Texture.from(cvs);
		tx.baseTexture.update();	// 2 回目以降のスナップショットで前回の GPU 転送が残らないよう
		this.#snapSp = new Sprite(tx);
		this.ctn.addChild(this.#snapSp);
		rnd.render(this.ctn, {clear: false});
		re();
	}
	override snapshot_end(): void {
		if (! this.#snapSp) return;
		this.ctn.removeChild(this.#snapSp);
		this.#snapSp.destroy();
		this.#snapSp = undefined;
	}
}
