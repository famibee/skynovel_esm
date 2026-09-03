/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, int, argChk_Boolean, argChk_Num, uint} from './CmnLib';
import type {TArg} from './Grammar';
import type {IMakeDesignCast} from './LayerMng';

import type {DisplayObject, Container, AbstractRenderer, Filter} from 'pixi.js';
import {BLEND_MODES, Sprite, Texture, filters} from 'pixi.js';
const {BlurFilter, ColorMatrixFilter, NoiseFilter} = filters;


export type T_RecordPlayBack_lay = {
	name		: string;
	idx			: number;
	alpha		: number;
	blendMode	: BLEND_MODES;
	rotation	: number;
	scale_x		: number;
	scale_y		: number;
	pivot_x		: number;
	pivot_y		: number;
	x			: number;
	y			: number;
	visible		: boolean;
	aFltHArg?	: TArg[];
}


export class Layer {
				layname	= '';
	protected	name_	= '';
	set name(nm) {this.name_ = nm}
	get name() {return this.name_}
	readonly	ctn	= new Sprite(Texture.EMPTY);

	// tsy用
	get	alpha() {return this.ctn.alpha}
	set alpha(v) {this.ctn.alpha = v}
	get	height() {return this.ctn.height}
	get	rotation() {return this.ctn.angle}
	set rotation(v) {this.ctn.angle = v}
	get	scale_x() {return this.ctn.scale.x}
	set scale_x(v) {this.ctn.scale.x = v}
	get	scale_y() {return this.ctn.scale.y}
	set scale_y(v) {this.ctn.scale.y = v}
	get	width() {return this.ctn.width}
	get	x() {return this.ctn.x}
	set x(v) {this.procSetX(v); this.ctn.x = v}
		protected	procSetX(_x: number) { /* empty */ }	// set を override できないので
	get	y() {return this.ctn.y}
	set y(v) {this.procSetY(v); this.ctn.y = v}
		protected	procSetY(_y: number) { /* empty */ }	// set を override できないので

	destroy() { /* empty */ }

	lay(hArg: TArg): boolean {
		const c = this.ctn;
		if ('alpha' in hArg) c.alpha = argChk_Num(hArg, 'alpha', 1);

		Layer.setBlendmode(c, hArg);

		if ('pivot_x' in hArg || 'pivot_y' in hArg) c.pivot.set(
			argChk_Num(hArg, 'pivot_x', c.pivot.x),
			argChk_Num(hArg, 'pivot_y', c.pivot.y)
		);

		if ('rotation' in hArg) c.angle = argChk_Num(hArg, 'rotation', 0);
			// flash : rotation is in degrees.
			// pixijs: rotation is in radians, angle is in degrees.

		if ('scale_x' in hArg || 'scale_y' in hArg) c.scale.set(
			argChk_Num(hArg, 'scale_x', c.scale.x),
			argChk_Num(hArg, 'scale_y', c.scale.y)
		);

		if ('visible' in hArg) c.visible = argChk_Boolean(hArg, 'visible', true);

		if ('filter' in hArg) {
			c.filters = [Layer.bldFilters(hArg)];
			this.aFltHArg = [hArg];
		}

		return false;
	}
	aFltHArg: TArg[]	= [];

	/*
	* 現状未サポート
		* FXAAFilter		geeks3d.com のコードに基づいた基本的な FXAA (高速近似アンチエイリアシング) の実装ですが、WebGL でサポートされていないため、texture2DLod 要素が削除されたという変更が加えられています。
		* 	https://pixijs.download/v6.5.10/docs/PIXI.filters.FXAAFilter.html
		* DisplacementFilter	指定されたテクスチャ (ディスプレイスメント マップと呼ばれる) のピクセル値を使用して、オブジェクトのディスプレイスメントを実行します。
		* 	https://pixijs.download/v6.5.10/docs/PIXI.filters.DisplacementFilter.html
		* 		人形城のヒビキとかのやつ？
	*/
	// フィルター生成
	static	bldFilters(hArg: TArg): Filter {
		const {filter=''} = hArg;
		const fnc = Layer.hBldFilter[filter];
		if (! fnc) throw 'filter が異常です';

		const f = fnc(hArg);
		f.enabled = argChk_Boolean(hArg, 'enable_filter', true);
		const {blendmode} = hArg;	// フィルターのブレンドモード
		if (blendmode) f.blendMode = Layer.getBlendmodeNum(blendmode);
		return f;
	}
	// https://github.com/pixijs/filters
	static	readonly	hBldFilter: {[nm: string]: (hArg: TArg)=> Filter} = {
		// https://pixijs.download/v6.5.10/docs/PIXI.filters.BlurFilter.html
		blur: hArg=> {	// ガウスぼかし
			const f = new BlurFilter(
				argChk_Num(hArg, 'strength', 8),	// 強さ
				argChk_Num(hArg, 'quality', 4),		// 品質
				'resolution' in hArg ?argChk_Num(hArg, 'resolution', 0) :undefined,							// 解像度
				argChk_Num(hArg, 'kernel_size', 5),	// カーネルサイズ。値は 5、7、9、11、13、15。
			);
			f.blurX = uint(argChk_Num(hArg, 'blur_x', 2));	// X強度
			f.blurY = uint(argChk_Num(hArg, 'blur_y', 2));	// Y強度
	//略	f.quality = uint(argChk_Num(hArg, 'quality', 1));
				// ブラーのパス数。パス数が多いほど、ブラーの品質が高くなります。
			f.repeatEdgePixels = argChk_Boolean(hArg, 'repeat_edge_pixels', false);	// true に設定すると、ターゲットのエッジがクランプされます。
			return f;
		},

		// https://pixijs.download/v6.5.10/docs/PIXI.filters.NoiseFilter.html
		noise: hArg=> new NoiseFilter(	// ノイズエフェクト
			argChk_Num(hArg, 'noise', 0.5),
				// 適用するノイズの量。この値は (0, 1] の範囲内
			'seed' in hArg ?argChk_Num(hArg, 'seed', 0) :undefined,
				// ランダム ノイズの生成に適用するシード値。 Math.random() を使用するのが適切な値です。
		),

		// https://pixijs.download/v6.5.10/docs/PIXI.filters.ColorMatrixFilter.html
		color_matrix: hArg=> {	// カラーマトリックス
				// displayObject 上のすべてのピクセルの RGBA カラーとアルファ値に 5x4 マトリックス変換を適用して、新しい RGBA カラーとアルファ値のセットを含む結果を生成できます。 かなり強力ですよ！
			const f = new ColorMatrixFilter;
			f.alpha = uint(argChk_Num(hArg, 'alpha', 1));
			const {matrix=''} = hArg;
			if (matrix) {
				const m = matrix.split(',');
				const len = m.length;
				if (len !== 20) throw `matrix の個数（${String(len)}）が 20 ではありません`;
				for (let i=0; i<len; ++i) f.matrix[i] = uint(m[i]);
			}
			else {
				f.matrix[0] = uint(argChk_Num(hArg, 'rtor', 1));
				f.matrix[1] = uint(argChk_Num(hArg, 'gtor', 0));
				f.matrix[2] = uint(argChk_Num(hArg, 'btor', 0));
				f.matrix[3] = uint(argChk_Num(hArg, 'ator', 0));
				f.matrix[4] = uint(argChk_Num(hArg, 'pr', 0));
				f.matrix[5] = uint(argChk_Num(hArg, 'rtog', 0));
				f.matrix[6] = uint(argChk_Num(hArg, 'gtog', 1));
				f.matrix[7] = uint(argChk_Num(hArg, 'btog', 0));
				f.matrix[8] = uint(argChk_Num(hArg, 'atog', 0));
				f.matrix[9] = uint(argChk_Num(hArg, 'pg', 0));
				f.matrix[10] = uint(argChk_Num(hArg, 'rtob', 0));
				f.matrix[11] = uint(argChk_Num(hArg, 'gtob', 0));
				f.matrix[12] = uint(argChk_Num(hArg, 'btob', 1));
				f.matrix[13] = uint(argChk_Num(hArg, 'atob', 0));
				f.matrix[14] = uint(argChk_Num(hArg, 'pb', 0));
				f.matrix[15] = uint(argChk_Num(hArg, 'rtoa', 0));
				f.matrix[16] = uint(argChk_Num(hArg, 'gtoa', 0));
				f.matrix[17] = uint(argChk_Num(hArg, 'btoa', 0));
				f.matrix[18] = uint(argChk_Num(hArg, 'atoa', 1));
				f.matrix[19] = uint(argChk_Num(hArg, 'pa', 0));
			}
			return f;
		},
		// ColorMatrixFilter 系。各エントリは f へ効果を積むだけ（`multiply` は共通で
		//	「true なら現在の行列に乗算、false なら置き換え」＝pixi 既定の引数）
		black_and_white:	Layer.#cmf((f, hArg)=> f.blackAndWhite(argChk_Boolean(hArg, 'multiply', false))),	// 白黒
		brightness:			Layer.#cmf((f, hArg)=> f.brightness(argChk_Num(hArg, 'b', 0.5), argChk_Boolean(hArg, 'multiply', false))),	// 明るさ (b:0〜1、0 は黒)
		browni:				Layer.#cmf((f, hArg)=> f.browni(argChk_Boolean(hArg, 'multiply', true))),	// おいしいブラウニー
		color_tone:			Layer.#cmf((f, hArg)=> f.colorTone(argChk_Num(hArg, 'desaturation', 0.5), argChk_Num(hArg, 'toned', 0.5), argChk_Num(hArg, 'light_color', 0xFFE580), argChk_Num(hArg, 'dark_color', 0xFFE580), argChk_Boolean(hArg, 'multiply', false))),	// カラートーン（グラデーションマップ風）
		contrast:			Layer.#cmf((f, hArg)=> f.contrast(argChk_Num(hArg, 'amount', 0.5), argChk_Boolean(hArg, 'multiply', false))),	// コントラスト (amount:0〜1)
		grayscale:			Layer.#cmf((f, hArg)=> f.grayscale(argChk_Num(hArg, 'scale', 0.5), argChk_Boolean(hArg, 'multiply', false))),	// グレースケール (scale:0〜1、0 は黒)
		hue:				Layer.#cmf((f, hArg)=> f.hue(argChk_Num(hArg, 'f_rotation', 90), argChk_Boolean(hArg, 'multiply', false))),	// 色相（度単位。既定 90＝0 だと変化なしで分かりづらいので）
		kodachrome:			Layer.#cmf((f, hArg)=> f.kodachrome(argChk_Boolean(hArg, 'multiply', true))),	// コダクローム（1935 Eastman Kodak）
		lsd:				Layer.#cmf((f, hArg)=> f.lsd(argChk_Boolean(hArg, 'multiply', false))),	// LSD 効果
		negative:			Layer.#cmf((f, hArg)=> f.negative(argChk_Boolean(hArg, 'multiply', false))),	// ネガ（RGB マトリクスの逆）
		night:				Layer.#cmf((f, hArg)=> f.night(argChk_Num(hArg, 'intensity', 0.5), argChk_Boolean(hArg, 'multiply', false))),	// ナイト
		polaroid:			Layer.#cmf((f, hArg)=> f.polaroid(argChk_Boolean(hArg, 'multiply', false))),	// ポラロイド
		predator:			Layer.#cmf((f, hArg)=> f.predator(argChk_Num(hArg, 'amount', 0.5), argChk_Boolean(hArg, 'multiply', false))),	// 捕食者効果
		saturate:			Layer.#cmf((f, hArg)=> f.saturate(argChk_Num(hArg, 'amount', 0.5), argChk_Boolean(hArg, 'multiply', false))),	// 彩度 (amount:0〜1)
		sepia:				Layer.#cmf((f, hArg)=> f.sepia(argChk_Boolean(hArg, 'multiply', false))),	// セピア
		technicolor:		Layer.#cmf((f, hArg)=> f.technicolor(argChk_Boolean(hArg, 'multiply', true))),	// テクニカラー（1916）
		tint:				Layer.#cmf((f, hArg)=> f.tint(argChk_Num(hArg, 'f_color', 0x888888), argChk_Boolean(hArg, 'multiply', false))),	// 色合い（f_color は 16 進）
		to_bgr:				Layer.#cmf((f, hArg)=> f.toBGR(argChk_Boolean(hArg, 'multiply', false))),	// 赤↔青
		vintage:			Layer.#cmf((f, hArg)=> f.vintage(argChk_Boolean(hArg, 'multiply', true))),	// ビンテージ
	};
	// ColorMatrixFilter を生成し apply で効果を積んで返す共通形
	static	#cmf(apply: (f: InstanceType<typeof ColorMatrixFilter>, hArg: TArg)=> void): (hArg: TArg)=> Filter {
		return hArg=> {const f = new ColorMatrixFilter; apply(f, hArg); return f};
	}

	static	setBlendmode(cnt: Container, hArg: TArg) {
		const {blendmode} = hArg;
		if (! blendmode) return;	// 省略時になにもしない

		const bmn = Layer.getBlendmodeNum(blendmode);
		if (cnt instanceof Sprite) cnt.blendMode = bmn;
		for (const c of cnt.children) {
			if (c instanceof Sprite) c.blendMode = bmn;
		}
	}

	static getBlendmodeNum(bm_name: string): number {
		if (! bm_name) return BLEND_MODES.NORMAL;	// 省略時にデフォルトを返す

		const bmn = Layer.#hBlendmode[bm_name];
		if (bmn !== undefined) return bmn;
		throw `${bm_name} はサポートされない blendmode です`;
	}
	static	readonly	#hBlendmode: {[bm_name: string]: number} = {
		'normal'		: BLEND_MODES.NORMAL,
		'add'			: BLEND_MODES.ADD,
		'multiply'		: BLEND_MODES.MULTIPLY,
		'screen'		: BLEND_MODES.SCREEN,
/*
		'overlay'		: BLEND_MODES.OVERLAY,
		'darken'		: BLEND_MODES.DARKEN,
		'lighten'		: BLEND_MODES.LIGHTEN,
		'color_dodge'	: BLEND_MODES.COLOR_DODGE,
		'color_burn'	: BLEND_MODES.COLOR_BURN,
		'hard_light'	: BLEND_MODES.HARD_LIGHT,
		'soft_light'	: BLEND_MODES.SOFT_LIGHT,
		'difference'	: BLEND_MODES.DIFFERENCE,
		'exclusion'		: BLEND_MODES.EXCLUSION,
		'hue'			: BLEND_MODES.HUE,
		'saturation'	: BLEND_MODES.SATURATION,
		'color'			: BLEND_MODES.COLOR,
		'luminosity'	: BLEND_MODES.LUMINOSITY,

		'normal_npm'	: BLEND_MODES.NORMAL_NPM,
		'add_npm'		: BLEND_MODES.ADD_NPM,
		'screen_npm'	: BLEND_MODES.SCREEN_NPM,
		'none'			: BLEND_MODES.NONE,
		'src_in'		: BLEND_MODES.SRC_IN,
		'src_out'		: BLEND_MODES.SRC_OUT,
		'src_atop'		: BLEND_MODES.SRC_ATOP,
		'dst_over'		: BLEND_MODES.DST_OVER,
		'dst_in'		: BLEND_MODES.DST_IN,
		'dst_out'		: BLEND_MODES.DST_OUT,
		'dst_atop'		: BLEND_MODES.DST_ATOP,
		'subtract'		: BLEND_MODES.SUBTRACT,
		'src_over'		: BLEND_MODES.SRC_OVER,
		'erase'			: BLEND_MODES.ERASE,
		'xor'			: BLEND_MODES.XOR,
*/
	};
	static getNum2Blendmode(bmn: number): string {
		return Layer.#hNum2Blendmode[bmn] ?? 'normal';
	}
	static	readonly	#hNum2Blendmode: {[bmn: number]: string} = {
		0	/* NORMAL */		: 'normal',
		1	/* ADD */			: 'add',
		2	/* MULTIPLY */		: 'multiply',
		3	/* SCREEN */		: 'screen',
	}

	// アニメ・動画があるか
	// eslint-disable-next-line @typescript-eslint/class-literal-property-style
	get containMovement(): boolean {return false}

	renderStart(_isSkipping: boolean) { /* empty */ }
	renderEnd() { /* empty */ }

	// 呼ぶたび body を走らせるラッパを返すが、animated が false のときは初回だけ走って
	//	以降 no-op になる（[tsy render]・[trans] の「動きが無いレイヤは 1 回だけ焼く」共通形。
	//	GrpLayer.renderStart / LayerMng.#trans で 3 回同じ自己書き換えを書いていた）
	static	renderGate(body: ()=> void, animated: boolean): ()=> void {
		if (animated) return body;
		let f = ()=> {f = ()=> { /* empty */ }; body()};
		return ()=> f();
	}

	// DOM オーバーレイ（PlgLayer.htm / TxtStage）を持つレイヤ用。PIXI childIndex 由来の
	//	重なり順を CSS z-index へ写す。PIXI 描画に乗るレイヤは無関係なので no-op
	setDomZ(_z: number) { /* empty */ }

	// [trans] 中だけ、DOM オーバーレイの現在の絵を PIXI Texture 化して ctn に載せ替える。
	//	これで #fore/#back の RenderTexture 焼きにプラグインの絵も乗り、クロスフェード／
	//	ルール画像トランジションが無改造で効く。PIXI 描画に乗るレイヤは no-op
	transBake() { /* empty */ }
	transUnbake() { /* empty */ }

	clearLay(hArg: TArg): void {
		this.ctn.alpha = 1;
		this.ctn.blendMode = BLEND_MODES.NORMAL;
		// visibleは触らない
		this.ctn.pivot.set(0, 0);
		this.ctn.angle = 0;
		this.ctn.scale.set(1, 1);
		if (argChk_Boolean(hArg, 'clear_filter', false)) {
			this.ctn.filters = null;
			this.aFltHArg = [];
		}
		//transform.colorTransform = nulColTrfm;
	}
	copy(fromLayer: Layer, aPrm: Promise<void>[]): void {
		const org_name = this.name_;
		this.playback(fromLayer.record(), aPrm);
		this.name = org_name;
	}
	record() {return {
		name	: this.name_,
		idx		: this.ctn.parent.getChildIndex(this.ctn),
		alpha	: this.ctn.alpha,
		blendMode	: this.ctn.blendMode,
		rotation	: this.ctn.angle,
		scale_x	: this.ctn.scale.x,
		scale_y	: this.ctn.scale.y,
		pivot_x	: this.ctn.pivot.x,
		pivot_y	: this.ctn.pivot.y,
		x		: this.ctn.x,
		y		: this.ctn.y,
		visible	: this.ctn.visible,
		aFltHArg: this.aFltHArg,
	}}
	playback(hLay: T_RecordPlayBack_lay, _aPrm: Promise<void>[]): void {
		this.name = hLay.name;
		//idx	// コール順に意味があるので LayerMng でやる

		this.clearLay({clear_filter: true});
		this.ctn.alpha = hLay.alpha;
		this.ctn.blendMode = hLay.blendMode;
		this.ctn.angle = hLay.rotation;
		this.ctn.scale.set(hLay.scale_x, hLay.scale_y);
		this.ctn.pivot.set(hLay.pivot_x, hLay.pivot_y);
		this.ctn.position.set(hLay.x, hLay.y);
		this.ctn.visible = hLay.visible;

		this.aFltHArg = hLay.aFltHArg ?? [];
		this.ctn.filters = this.aFltHArg.length === 0
			? null
			: this.aFltHArg.map(f=> Layer.bldFilters(f));
	}

	snapshot(rnd: AbstractRenderer, re: ()=> void) {
		rnd.render(this.ctn, {clear: false});
		re();
	}
	snapshot_end() { /* empty */ }

	makeDesignCast(_gdc: IMakeDesignCast) { /* empty */ }
	makeDesignCastChildren(_gdc: IMakeDesignCast) { /* empty */ }

	showDesignCast() { /* empty */ }
	showDesignCastChildren() { /* empty */ }

	cvsResize() { /* empty */ }
	cvsResizeChildren() { /* empty */ }

	dump(): string {
		return ` "idx":${String(this.ctn.parent.getChildIndex(this.ctn))
		}, "visible":"${String(this.ctn.visible)
		}", "left":${String(this.ctn.x)}, "top":${String(this.ctn.y)
		}, "alpha":${String(this.ctn.alpha)
		}, "rotation":${String(this.ctn.angle)
//		}, "blendMode":${this.ctn.blendMode
		}, "name":"${this.name_}", "scale_x":${String(this.ctn.scale.x)
		}, "scale_y":${String(this.ctn.scale.y)
		}, "filters": [${this.aFltHArg.map(f=> `"${f.filter ?? ''}"`).join(',')}]`;
	}

	// base の bounds を ret の拡縮率（絶対値。等倍なら実測そのまま）で見た表示サイズ。
	//	setXY / setXYByPos 共通の前処理
	static	#scaledWH(base: DisplayObject, ret: DisplayObject): {b_width: number; b_height: number} {
		const rct_base = base.getBounds();
		const r_absclX = ret.scale.x < 0 ? -ret.scale.x : ret.scale.x;
		const r_absclY = ret.scale.y < 0 ? -ret.scale.y : ret.scale.y;
		return {
			b_width	: r_absclX === 1 ? rct_base.width  : rct_base.width  *r_absclX,
			b_height: r_absclY === 1 ? rct_base.height : rct_base.height *r_absclY,
		};
	}

	static	setXY(base: DisplayObject, hArg: TArg, ret: Container, isGrp = false, isButton = false): void {
		if (hArg.pos) {Layer.setXYByPos(base, hArg.pos, ret); return}

		const {b_width, b_height} = Layer.#scaledWH(base, ret);

		// an時代・瀬戸愛羅さんより https://famibee.blog.fc2.com/blog-entry-253.html
		// 横位置計算
		let x = ret.x;	// AIRNovelでは 0
		if ('left' in hArg) {
			x = argChk_Num(hArg, 'left', 0);
			if (x > -1 && x < 1) x *= CmnLib.stageW;
		}
		else if ('center' in hArg) {
			x = argChk_Num(hArg, 'center', 0);
			if (x > -1 && x < 1) x *= CmnLib.stageW;
			x -= (isButton ?b_width/3 :b_width)/2;
		}
		else if ('right' in hArg) {
			x = argChk_Num(hArg, 'right', 0);
			if (x > -1 && x < 1) x *= CmnLib.stageW;
			x -= isButton ?b_width/3 :b_width;
		}
		else if ('s_right' in hArg) {
			x = argChk_Num(hArg, 's_right', 0);
			if (x > -1 && x < 1) x *= CmnLib.stageW;
			x = CmnLib.stageW - x
				- (isButton ?b_width/3 :b_width);
		}
		ret.x = int( ret.scale.x < 0
			? x +(isButton ?b_width/3 :b_width)
			: x );

		// 縦位置計算
		let y = ret.y;	// AIRNovelでは 0
		if ('top' in hArg) {
			y = argChk_Num(hArg, 'top', 0);
			if (y > -1 && y < 1) y *= CmnLib.stageH;
		}
		else if ('middle' in hArg) {
			y = argChk_Num(hArg, 'middle', 0);
			if (y > -1 && y < 1) y *= CmnLib.stageH;
			y -= b_height/2;
		}
		else if ('bottom' in hArg) {
			y = argChk_Num(hArg, 'bottom', 0);
			if (y > -1 && y < 1) y *= CmnLib.stageH;
			y -= b_height;
		}
		else if ('s_bottom' in hArg) {
			y = argChk_Num(hArg, 's_bottom', 0);
			if (y > -1 && y < 1) y *= CmnLib.stageH;
			y = CmnLib.stageH - y - b_height;
		}
		ret.y = int( ret.scale.y < 0 ?y +b_height :y );

		if (isGrp) {	// これを上の方に持っていってはいけない。
						// iPhone6など中途半端な画面サイズの際に
						// 縦位置が異常になる（素材が画面外下に）
			if (! ('left' in hArg)
			&& ! ('center' in hArg)
			&& ! ('right' in hArg)
			&& ! ('s_right' in hArg)
			&& ! ('top' in hArg)
			&& ! ('middle' in hArg)
			&& ! ('bottom' in hArg)
			&& ! ('s_bottom' in hArg)) {
				Layer.setXYByPos(base, 'c', ret);
			}
		}
	}

	static	setXYByPos(base: DisplayObject, pos: string, ret: DisplayObject): void {
		if (pos === 'stay') return;

		const {b_width, b_height} = Layer.#scaledWH(base, ret);

		let c = 0;	// 忘れたけど、プルプルするからintなんだっけ
		if (! pos || pos === 'c') {c = CmnLib.stageW *0.5}
		else if (pos === 'r') {c = CmnLib.stageW - b_width *0.5}
		else if (pos === 'l') {c = b_width *0.5}
		else {c = int(pos)}

		ret.x = int(c -b_width *0.5);
		ret.y = CmnLib.stageH -b_height;

		if (ret.scale.x < 0) ret.x += b_width;
		if (ret.scale.y < 0) ret.y += b_height;
	}

	static	setXYCenter(dsp: DisplayObject): void {
		const rct = dsp.getBounds();
		dsp.x = (CmnLib.stageW - rct.width) *0.5;
		dsp.y = (CmnLib.stageH - rct.height) *0.5;
	}

}
