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
	#lastZ		= '';
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

		// 表示は「表ページ かつ ctn.visible かつ [trans] 焼き込み中でない」で判定。
		//	親（#fore/#back Container）の visible は [trans] 中に毎フレーム true/false される
		//	ので見てはいけない（TxtStage と同じ理由）
		const disp = ! this.#baking && c.visible && PlgLayer.#isFore(this) ? '' : 'none';
		if (disp !== this.#lastDisp) this.htm.style.display = this.#lastDisp = disp;
	};

	// リサイズ直後の 1 フレーム遅延を消すため即時に反映（差分ガードは #sync 側が持つ）
	override cvsResize() {this.#sync()}

	// === z 順 ========================================================================
	//	[lay index=]/float/dive は PIXI childIndex しか動かさないので、LayerMng が
	//	#fore における ctn の childIndex をここへ流し、htm の CSS z-index へ写す。
	//	canvas は z-index:0 固定（Main.ts）なので childIndex(1..) は必ず canvas の上。
	//	childIndex 0 は不透明な bg_color Graphics 専用なのでレイヤは来ない
	override setDomZ(z: number) {
		const s = String(z);
		if (s !== this.#lastZ) this.htm.style.zIndex = this.#lastZ = s;
	}

	override destroy() {
		super.destroy();
		PlgLayer.#appPixi.ticker.remove(this.#sync, this);
		this.htm.remove();
	}


	// === canvas → PIXI Texture 焼き（[snapshot] と [trans] で共用）====================
	//	プラグインが htm へ挿した canvas。未設定なら htm 直下の <canvas> を拾う
	//	（3d_layer/live2d_layer とも htm 直下に1枚 append しているので無改造で動く）
	protected	plgCvs: HTMLCanvasElement | undefined;
	get	#cvs(): HTMLCanvasElement | null {
		return this.plgCvs ?? this.htm.querySelector('canvas');
	}

	// canvas を Texture 化し、ctn ローカル座標の正しい位置・寸法へ置いた Sprite を
	//	ctn へ addChild して返す。
	//	・Texture.from() は canvas のバックバッファ実寸（devicePixelRatio 分だけ大きい）に
	//	  なるので、sp.width/height を CSS 実寸で上書きして 1:1 に戻す（旧 snapshotByCanvas は
	//	  これを怠っており Retina で 2 倍ズレていた）
	//	・htm 自身の transform（#sync が書く rotate/scale）を一旦外して測ると、残るのは
	//	  canvas 側の transform（translate(-50%,-50%)・scale()）だけになり rect が実描画矩形に
	//	  なる。ctn は既にレイヤ transform を持つのでスケール割り戻しは不要
	//	  （canvas 側が rotate している場合は外接矩形になる。許容）
	#bakeCvs2Sp(cvs: HTMLCanvasElement): Sprite {
		const tx = Texture.from(cvs);
		tx.baseTexture.update();	// 2 回目以降で前回の GPU 転送が残らないよう
		const sp = new Sprite(tx);

		const s = this.htm.style;
		const bkTf = s.transform;
		const bkDisp = s.display;
		s.transform = 'none';
		s.display = '';		// display:none だと rect が 0
		const rc = cvs.getBoundingClientRect();
		const rh = this.htm.getBoundingClientRect();
		s.transform = bkTf;
		s.display = bkDisp;

		sp.position.set(rc.left -rh.left, rc.top -rh.top);
		sp.width  = rc.width;
		sp.height = rc.height;

		this.ctn.addChild(sp);
		return sp;
	}

	// === [snapshot] 用ヘルパ =========================================================
	//	プラグイン側で override した snapshot(rnd, re) から
	//	`this.snapshotByCanvas(this.#canvas!, rnd, re)` と呼ぶ。canvas は
	//	preserveDrawingBuffer:true で確保しておくこと（rAF ループ外から読むため）。
	//	TxtStage.snapshot() が htm2tx で span を Texture 化して #cntTxt に一時 addChild するのと同型。
	#snapSp	: Sprite | undefined;
	snapshotByCanvas(cvs: HTMLCanvasElement, rnd: AbstractRenderer, re: ()=> void): void {
		this.#snapSp = this.#bakeCvs2Sp(cvs);
		rnd.render(this.ctn, {clear: false});
		re();
	}
	override snapshot_end(): void {
		if (! this.#snapSp) return;
		this.ctn.removeChild(this.#snapSp);
		this.#snapSp.destroy();
		this.#snapSp = undefined;
	}

	// === [trans] 参加 ================================================================
	//	LayerMng.#trans が time>0 パスの頭で全レイヤ fore/back へ transBake() を呼ぶ。
	//	現在のプラグインの絵を ctn に焼き込み htm は隠す → 以降 #fore/#back を
	//	RenderTexture へ焼く既存処理にプラグインの絵も乗り、クロスフェード／ルール画像
	//	トランジションが無改造で効く。comp() で transUnbake() して元へ戻す。
	//	trans 中（通常 0.5 秒程度）はプラグインの動きが静止するが許容
	#baking	= false;
	#bakedSp: Sprite | undefined;
	override transBake(): void {
		if (this.#baking) return;
		const cvs = this.#cvs;
		if (! cvs) return;	// canvas 未生成のプラグイン（[add_lay] 直後など）

		this.#bakedSp = this.#bakeCvs2Sp(cvs);
		this.#baking = true;
		this.#sync();		// htm を即 display:none に
	}
	override transUnbake(): void {
		this.#baking = false;
		if (this.#bakedSp) {
			this.ctn.removeChild(this.#bakedSp);
			this.#bakedSp.destroy();
			this.#bakedSp = undefined;
		}
		this.#sync();
	}
}
