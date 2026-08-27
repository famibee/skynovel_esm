/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, getDateStr, uint, type IEvtMng, argChk_Boolean, argChk_Num, addStyle, argChk_Color, parseColor} from './CmnLib';
import {CmnTween, TW_NM_TRANS} from './CmnTween';
import type {T_HTag, TArg} from './Grammar';
import type {T_Variable, T_Main, T_HPage, T_GetFrm, T_PropParser} from './CmnInterface';
import {Pages} from './Pages';
import {Layer} from './Layer';
import {GrpLayer} from './GrpLayer';
import {PlgLayer} from './PlgLayer';
import {SpritesMng} from './SpritesMng';
import {type T_cmdTxt_JSON, TxtLayer} from './TxtLayer';
import {RubySpliter} from './RubySpliter';
import {TxtStage} from './TxtStage';
import {PROTOCOL_DL, PROTOCOL_USERDATA, type Config} from './Config';
import type {ScriptIterator} from './ScriptIterator';
import type {SysBase} from './SysBase';
import {FrameMng} from './FrameMng';
import {Button} from './Button';
import type {SoundMng} from './SoundMng';
import {DesignCast} from './DesignCast';
import {EventListenerCtn} from './EventListenerCtn';
import {Reading} from './Reading';
import {Log} from './Log';

import {Container, type Application, Graphics, Filter, RenderTexture, Sprite, autoDetectRenderer, Texture} from 'pixi.js';


export type IMakeDesignCast = (idc: DesignCast)=> void;

export type HPage = {[ln: string]: Pages};

function cnvSArg(o: T_cmdTxt_JSON) {
		// わざと使う側で <T_cmdTxt_JSON> させる。そっちで不具合を見つけてもらう
	return encodeURIComponent(JSON.stringify(o));
}


export class LayerMng implements T_GetFrm {
	readonly	#stage	: Container;
				#fore	= new Container;
				#back	= new Container;

	readonly	#frmMng		: FrameMng;
	readonly	#bg_color	: number;

	readonly	#log;

	readonly	#elc		= new EventListenerCtn;

	//MARK: コンストラクタ
	constructor(private readonly cfg: Config, private readonly hTag: T_HTag, private readonly appPixi: Application, private readonly val: T_Variable, private readonly main: T_Main, private readonly scrItr: ScriptIterator, private readonly sys: SysBase, sndMng: SoundMng, prpPrs: T_PropParser) {
		// レスポンシブや回転・全画面切り替え・DevTools 表示切り替えの対応
		const fncResizeLay = ()=> {
			sys.cvsResize();
			this.cvsResizeDesign();
			if (this.#modeLnSub) for (const ln of this.#aLayName) {
				this.#hPages[ln]!.fore.cvsResizeChildren();
			}
			else for (const ln of this.#aLayName) {
				this.#hPages[ln]!.fore.cvsResize();
			}

			this.#frmMng.cvsResize();
			this.#evtMng.cvsResize();
		};
		if (CmnLib.isMobile) {
			this.#elc.add(globalThis, 'orientationchange', fncResizeLay, {passive: true});
		}
		else {
			let tid: NodeJS.Timeout | undefined = undefined;
			this.#elc.add(globalThis, 'resize', ()=> {
				if (tid) return;
				tid = setTimeout(()=> {tid = undefined; fncResizeLay()}, 1000 /60 *10);	// clearTimeout()不要と判断
			}, {passive: true});
		}
		sys.cvsResize();

		this.#log = new Log(this.cfg.oCfg, hTag, val);
		TxtLayer.init(cfg, hTag, val, this.#log, me=> this.#hPages[me.layname]!.fore === me, appPixi);
		GrpLayer.init(main, cfg, appPixi, sys, sndMng, val);
		PlgLayer.setup(appPixi, sys, me=> this.#hPages[me.layname]?.fore === me);
		FrameMng.init(cfg, sys, main);

		this.#frmMng = new FrameMng(hTag, appPixi, val);

		//	システム
		hTag.loadplugin		= o=> this.#loadplugin(o);	// プラグインの読み込み
		//hTag.set_focus	// EventMng.tsで定義	 	// フォーカス移動
		hTag.snapshot		= o=> this.#snapshot(o);	// スナップショット
		this.#snapshot4proc = this.sys.isApp
			? (hArg, url, width, height, RPN_SNAPSHOT)=> this.#snapshot4app(hArg, url, width, height, RPN_SNAPSHOT)
			: (hArg, url, width, height, RPN_SNAPSHOT)=> this.#snapshot4web(hArg, url, width, height, RPN_SNAPSHOT);

		//	レイヤ共通
		hTag.add_lay		= o=> this.#add_lay(o);		// レイヤを追加する
		hTag.clear_lay		= o=> this.#clear_lay(o);	// レイヤ設定の消去
		hTag.finish_trans	= ()=> false;				// トランス強制終了
		hTag.lay			= o=> this.#lay(o);			// レイヤ設定
		hTag.trans			= o=> this.#trans(o);		// ページ裏表を交換
		hTag.wt				= o=> CmnTween.wt(o);		// トランス終了待ち

		hTag.quake			= o=> this.#quake(o);		// 画面を揺らす
		hTag.stop_quake		= hTag.finish_trans;		// 画面揺らし中断
		hTag.wq				= hTag.wt;					// 画面揺らし終了待ち

		hTag.pause_tsy		= o=> CmnTween.pause_tsy(o);	// 一時停止
		hTag.resume_tsy		= o=> CmnTween.resume_tsy(o);	// 一時停止再開
		hTag.stop_tsy		= o=> CmnTween.stop_tsy(o);	// トゥイーン中断
		hTag.tsy			= o=> this.#tsy(o);			// トゥイーン開始
		hTag.wait_tsy		= o=> CmnTween.wait_tsy(o);	// トゥイーン終了待ち

		hTag.add_filter		= o=> this.#add_filter(o);	// フィルター追加
		hTag.clear_filter	= o=> this.#clear_filter(o);// フィルター全削除
		hTag.enable_filter	= o=> this.#enable_filter(o);// フィルター個別切替

		//	文字・文字レイヤ
	//	hTag.auto_pager		= o=> this.auto_pager(o);	// 自動改ページの設定
		//hTag.autowc		// TxtLayer.ts で定義		// 文字ごとのウェイト
		hTag.ch				= o=> this.#ch(o);			// 文字を追加する
		//hTag.ch_in_style	// TxtLayer.ts で定義		// 文字出現文字出現演出
		//hTag.ch_out_style	// TxtLayer.ts で定義		// 文字消去文字出現演出
		hTag.clear_text		= o=> this.#clear_text(o);	// 文字消去
		hTag.current		= o=> this.#current(o);		// デフォルト文字レイヤ設定
		hTag.endlink		= o=> this.#endlink(o);		// ハイパーリンクの終了
		hTag.er				= o=> this.#er(o);			// ページ両面の文字消去
		hTag.graph			= o=> this.#graph(o);		// インライン画像表示
		hTag.link			= o=> this.#link(o);		// ハイパーリンク
		hTag.r				= o=> this.#r(o);			// 改行
		// hTag.rec_ch		// Log.ts で定義			// 履歴書き込み
		// hTag.rec_r		// Log.ts で定義			// 履歴改行
		// hTag.reset_rec	// Log.ts で定義			// 履歴リセット
		//hTag.ruby			= o=> this.ruby(o);			// 直前一文字のルビ（廃止
			// タグでは無く、「｜＠《》」というスクリプト書き換えで良い
		hTag.ruby2			= o=> this.#ruby2(o);		// 文字列と複数ルビの追加
		hTag.span			= o=> this.#span(o);		// インラインスタイル設定
		hTag.tcy			= o=> this.#tcy(o);			// 縦中横を表示する

		//	画像・画像レイヤ
		hTag.add_face		= o=> SpritesMng.add_face(o);	// 差分名称の定義

		//	ムービーレイヤ
		hTag.wv				= o=> SpritesMng.wv(o);		// ムービー再生終了待ち

		//	デバッグ・その他
		hTag.dump_lay		= o=> this.#dump_lay(o);	// レイヤのダンプ

		//	イベント
		hTag.enable_event	= o=> this.#enable_event(o);// イベント有無の切替

		//	ラベル・ジャンプ
		hTag.button			= o=> this.#button(o);		// ボタンを表示


		if (cfg.existsBreakline) this.breakLine = (hArg: TArg)=> {
			delete hArg.visible;
			hArg.id = 'break';
			hArg.pic= 'breakline';
			this.#cmdTxt('grp｜'+ cnvSArg(<T_cmdTxt_JSON><unknown>hArg));
		};
		if (cfg.existsBreakpage) this.breakPage = (hArg: TArg)=> {
			delete hArg.visible;
			hArg.id = 'break';
			hArg.pic= 'breakpage';
			this.#cmdTxt('grp｜'+ cnvSArg(<T_cmdTxt_JSON><unknown>hArg));
		};

		this.#bg_color = parseColor(String(cfg.oCfg.init.bg_color));
		const grp = new Graphics;
		grp
		.beginFill(this.#bg_color)	// イベントを受け取るためにも塗る
		.lineStyle(0, this.#bg_color)
		.drawRect(0, 0, CmnLib.stageW, CmnLib.stageH)
		.endFill();
		this.#fore.addChild(grp.clone());
		this.#back.addChild(grp);
		this.#back.visible = false;
		this.#fore.name = 'page:A';	// 4tst
		this.#back.name = 'page:B';	// 4tst

		this.#stage = appPixi.stage;
		this.#stage.addChild(this.#back);
		this.#stage.addChild(this.#fore);
		this.#stage.addChild(this.#spTransBack);
		this.#stage.addChild(this.#spTransFore);
		this.#stage.name = 'stage';	// 4tst
/*
		console.group('new DispMng info');
		console.info(appPixi.renderer);
		console.info('utils.isMobile():'+ utils.isMobile.any);
				// https://github.com/kaimallea/isMobile
		console.info('utils.isWebGLSupported():'+ utils.isWebGLSupported());
		console.info('w:%O: h:%O:', CmnLib.stageW, CmnLib.stageH);
		console.groupEnd();
*/
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const fncTxt_b_alpha = (_name: string, val: any)=> {
			this.#foreachRedrawTxtLayBack(Number(val))
		};
		fncTxt_b_alpha('', val.getVal('sys:TextLayer.Back.Alpha', 1));
		val.defValTrg('sys:TextLayer.Back.Alpha', fncTxt_b_alpha);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
		const fncBtnFont = (_name: string, val: any)=> {Button.fontFamily = val};
		fncBtnFont('', val.getVal('tmp:sn.button.fontFamily', Button.fontFamily));
		val.defValTrg('tmp:sn.button.fontFamily', fncBtnFont);

		val.defTmp('const.sn.last_page_text', ()=> this.currentTxtlayFore?.pageText ?? '');
		val.defTmp('const.sn.last_page_plain_text', ()=> this.currentTxtlayFore?.pagePlainText ?? '');
		if (CmnLib.isDbg) {
			DesignCast.init(appPixi, sys, scrItr, prpPrs, cfg, this.#hPages);
			this.cvsResizeDesign = ()=> DesignCast.cvsResizeDesign();
			sys.addHook((type, o)=> {
				if (! this.#hProcDbgRes[type]?.(type, o)) return;
				// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
				delete this.#hProcDbgRes[type];
			});
		}
	}
	private	cvsResizeDesign() { /* empty */ }


	readonly	#hProcDbgRes
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	: {[type: string]: (type: string, o: any)=> boolean}	= {
		attach		: _=> {DesignCast.leaveMode();	return false},
		continue	: _=> {DesignCast.leaveMode();	return false},
		disconnect	: _=> {DesignCast.leaveMode();	return false},
		_enterDesign: _=> {
			DesignCast.enterMode();
			for (const ln of this.#aLayName) {
				const lay = this.#hPages[ln]!.fore;
				lay.makeDesignCastChildren(gdc=> gdc.make());
				lay.makeDesignCast(gdc=> gdc.make());
			}

			this.#selectNode(this.#curTxtlay);	return false;
		//	this.selectNode('mes/ボタン');	return false;	// Test用
		//	this.selectNode(this.firstGrplay);	return false;
				// 制作中は普通画像レイヤをいじるのが主なので、これがいい
		},
		_replaceToken: (_, o)=> {DesignCast.replaceToken(o); return false},
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
		_selectNode	: (_, o)=> {this.#selectNode(o.node); return false},
	}
	#modeLn		= '';
	#modeLnSub	= '';
	#selectNode(node: string) {
		[this.#modeLn='', this.#modeLnSub=''] = node.split('/');
		const pages = this.#hPages[this.#modeLn];
		if (! pages) return;

		DesignCast.allHide();
		if (this.#modeLnSub) pages.fore.showDesignCastChildren();
		else pages.fore.showDesignCast();
	}

	getFrmDisabled = (id: string)=> this.#frmMng.getFrmDisabled(id);

	#grpCover : Graphics | undefined = undefined;
	cover(visible: boolean, bg_color = 0x0) {
		if (this.#grpCover) {
			this.#stage.removeChild(this.#grpCover);
			this.#grpCover.destroy();
			this.#grpCover = undefined;
		}
		if (visible) this.#stage.addChild(
			(this.#grpCover = new Graphics)
			.beginFill(bg_color)
			.lineStyle(0, bg_color)
			.drawRect(0, 0, CmnLib.stageW, CmnLib.stageH)
			.endFill()
		);
	}

	#evtMng	: IEvtMng;
	setEvtMng(evtMng: IEvtMng) {
		this.#evtMng = evtMng;
		this.#frmMng.setEvtMng(evtMng);
		SpritesMng.setEvtMng(evtMng);
		CmnTween.init(evtMng);
	}

	destroy() {
		for (const p of Object.values(this.#hPages)) p.destroy();

		this.#elc.clear();
		GrpLayer.destroy();
		RubySpliter.destroy();
		TxtStage.destroy();
		TxtLayer.destroy();

		this.#frmMng.destroy();

		CmnTween.destroy();
		TxtLayer.msecChWait = 10;
	}


	// 既存の全文字レイヤの実際のバック不透明度、を再計算
	#foreachRedrawTxtLayBack(g_alpha: number) {
		for (const ln of this.#aLayName) {
			const {fore, back} = this.#hPages[ln]!;
			if (! (fore instanceof TxtLayer)) continue;
			fore.chgBackAlpha(g_alpha);
			(<TxtLayer>back).chgBackAlpha(g_alpha);
		}
	}


	#cmdTxt = (cmd: string, tl = this.currentTxtlayForeNeedErr, _record = true)=> tl.tagCh('｜&emsp;《'+ cmd +'》');
	goTxt = ()=> { /* empty */ };
	get needGoTxt() {return this.currentTxtlayFore?.needGoTxt ?? false;}
	breakLine = (_hArg: TArg)=> { /* empty */ };
	breakPage = (_hArg: TArg)=> { /* empty */ };
	clearBreak() {
		if (! this.currentTxtlayFore) return;

		this.clearBreak = ()=> this.#cmdTxt('del｜break');
		this.clearBreak();
	}

	clickTxtLay(): boolean {	// true: 文字出現中だったので、停止する
		if (! this.currentTxtlayFore) return false;

		return this.#aLayName
		.map(ln=> this.#hPages[ln]!.fore)
		.some(f=> f instanceof TxtLayer && f.click());
	}


//	//	システム
	//MARK: スナップショット
	#snapshot(hArg: TArg) {
		const dt = getDateStr('-', '_', '', '_');
		const fn0 = hArg.fn
		? hArg.fn.startsWith(PROTOCOL_USERDATA)
			? hArg.fn
			: `${PROTOCOL_DL + hArg.fn + dt}.png`
		: `${PROTOCOL_DL}snapshot${dt}.png`;
		const url = this.cfg.searchPath(fn0);
		const width = argChk_Num(hArg, 'width', CmnLib.stageW);
		const height= argChk_Num(hArg, 'height', CmnLib.stageH);
		return this.#snapshot4proc(hArg, url, width, height, `snapshot dt:${dt}`);
	}
	#snapshot4proc :(hArg: TArg, url: string, width: number, height: number, RPN_SNAPSHOT: string)=> boolean = ()=> false;
	#snapshot4app({layer}: TArg, url: string, width: number, height: number, RPN_SNAPSHOT: string): boolean {
		this.#frmMng.hideAllFrame();
		Reading.beginProc(RPN_SNAPSHOT);
		if (! layer) {
			this.sys.capturePage(url, width, height, ()=> {
				this.#frmMng.restoreAllFrame();
				Reading.endProc(RPN_SNAPSHOT);
			});
			return true;
		}

		// 一時的に非表示にしてスナップショット
		const aBk = this.#aLayName
		.map(ln=> {
			const {ctn} = this.#hPages[ln]!.fore;
			const ret: [Sprite, boolean] = [ctn, ctn.visible];
			ctn.visible = false;
			return ret;
		});
		for (const ln of this.#getLayers(layer)) this.#hPages[ln]!.fore.ctn.visible = true;

		this.sys.capturePage(url, width, height, ()=> {
			for (const [sp, v] of aBk) sp.visible = v;
			this.#frmMng.restoreAllFrame();
			Reading.endProc(RPN_SNAPSHOT);
		});
		return true;
	}
	#snapshot4web(hArg: TArg, url: string, width: number, height: number, RPN_SNAPSHOT: string): boolean {
		Reading.beginProc(RPN_SNAPSHOT);
		const b_color = argChk_Color(hArg, 'b_color', this.#bg_color);
		const rnd = autoDetectRenderer({
			width,
			height,
			backgroundAlpha: b_color > 0x1000000 && url.endsWith('.png') ?0 :1,
			antialias: argChk_Boolean(hArg, 'smoothing', false),
			preserveDrawingBuffer: true,
			backgroundColor: b_color & 0xFFFFFF,
			autoDensity: true,
		});
		const pg = hArg.page !== 'back' ?'fore' :'back';
		const {layer} = hArg;
		void Promise.allSettled(
			this.#getLayers(layer).map(ln=> new Promise<void>(
				re=> this.#hPages[ln]![pg].snapshot(rnd, re)
			))
		).then(async ()=> {
			const renTx = RenderTexture.create({width: rnd.width, height: rnd.height});	// はみ出し対策
			rnd.render(this.#stage, {renderTexture: renTx});
			await this.sys.savePic(
				url,
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
				rnd.plugins.extract.base64(renTx),
			);
			renTx.destroy();

			for (const ln of this.#getLayers(layer)) this.#hPages[ln]![pg].snapshot_end();
			rnd.destroy(true);

			Reading.endProc(RPN_SNAPSHOT);
		});
		return true;
	}

	//MARK: プラグインの読み込み
	#loadplugin(hArg: TArg) {
		const {fn} = hArg;
		if (! fn) throw 'fnは必須です';
		if (! fn.endsWith('.css')) throw 'サポートされない拡張子です';

		const join = argChk_Boolean(hArg, 'join', true);
		const RPN_LOADPLUGIN = Reading.procID +`loadplugin fn:${fn}`;
		if (join) Reading.beginProc(RPN_LOADPLUGIN);
		(async ()=> {
			const res = await fetch(fn);
			if (! res.ok) throw new Error('Network response was not ok.');

			addStyle(await res.text());
			if (join) Reading.endProc(RPN_LOADPLUGIN);
		})();

		return join;
	}


//	//	レイヤ共通
	//MARK: レイヤを追加する
	#add_lay(hArg: TArg) {
		const {layer, class: cls} = hArg;
		if (! layer) throw 'layerは必須です';
		if (layer.includes(',')) throw 'layer名に「,」は使えません';
		if (layer in this.#hPages) throw `layer【${layer}】はすでにあります`;
		if (! cls) throw 'clsは必須です';

		const ret = {isWait: false}
		this.#hPages[layer] = new Pages(layer, cls, this.#fore, this.#back, hArg, this.sys, this.val, ret);
		this.#aLayName.push(layer);
		switch (cls) {
		case 'txt':
			if (! this.#curTxtlay) {
				this.#chkTxtLay = ()=> { /* empty */ };
				this.#getTxtLayer = o=> this.#$getTxtLayer(o);
				this.#current = o=> this.#$current(o);
				this.hTag.current({layer});	// hPages更新後でないと呼べない
				this.goTxt = ()=> {
					if (this.#evtMng.isSkipping) TxtLayer.msecChWait = 0;
					else this.setNormalChWait();
					for (const ln of this.#aLayName) {
						const f = this.#hPages[ln]!.fore;
						if (f instanceof TxtLayer) this.#cmdTxt('gotxt｜', f, false);
					}
				}
			}

			this.val.setVal_Nochk('save', 'const.sn.layer.'+ layer +'.enabled', true);
			break;

		case 'grp':
			if (this.#firstGrplay) break;
			this.#firstGrplay = layer;
			break;
		}

		this.scrItr.recodeDesign(hArg);	// hArg[':id_tag'] は new Pages 内で設定

		this.#syncDomZ();	// 追加分の childIndex を DOM オーバーレイへ反映

		return ret.isWait;
	}
	#hPages		: HPage		= { /* empty */ };	// しおりLoad時再読込
	#aLayName	: string[]	= [];	// 最適化用・重なり順つき全レイヤ名
	#curTxtlay		= '';
	#firstGrplay	= '';

	#lay(hArg: TArg): boolean {
		// Trans
		const ln = this.#argChk_layer(hArg);
		const pg = this.#hPages[ln]!;
		const back = pg.back.ctn;
		const fore = pg.fore.ctn;
		if (argChk_Boolean(hArg, 'float', false)) {
			this.#back.setChildIndex(back, this.#back.children.length -1);
			this.#fore.setChildIndex(fore, this.#fore.children.length -1);
			this.#rebuildLayerRankInfo();
		}
		else if (hArg.index) {
			if (argChk_Num(hArg, 'index', 0)) {
				this.#back.setChildIndex(back, hArg.index);
				this.#fore.setChildIndex(fore, hArg.index);
				this.#rebuildLayerRankInfo();
			}
		}
		else if (hArg.dive) {
			const {dive} = hArg;
			let idx_dive = 0;
			if (ln === dive) throw '[lay] 属性 layerとdiveが同じ【'+ dive +'】です';

			const pg_dive = this.#hPages[dive];
			if (! pg_dive) throw '[lay] 属性 dive【'+ dive +'】が不正です。レイヤーがありません';
			const back_dive = pg_dive.back;
			const fore_dive = pg_dive.fore;
			const idx_back_dive = this.#back.getChildIndex(back_dive.ctn);
			const idx_fore_dive = this.#fore.getChildIndex(fore_dive.ctn);
			idx_dive = idx_back_dive < idx_fore_dive ?idx_back_dive :idx_fore_dive;
			if (idx_dive > this.#back.getChildIndex(back)) --idx_dive;	//自分が無くなって下がる分下げる

			this.#fore.setChildIndex(fore, idx_dive);
			this.#back.setChildIndex(back, idx_dive);
			this.#rebuildLayerRankInfo();
		}

		hArg[':id_tag'] = pg.fore.name.slice(0, -7);
		this.scrItr.recodeDesign(hArg);	// 必ず[':id_tag'] を設定すること

		return pg.lay(hArg);
	}
	#rebuildLayerRankInfo() {this.#aLayName = this.#sortLayers(); this.#syncDomZ()}

	// DOM オーバーレイ（PlgLayer.htm / TxtStage）を持つレイヤへ、#fore における ctn の
	//	childIndex を z-index として流す。[lay index=]/float/dive は PIXI childIndex しか
	//	動かさないため、DOM 側の重なり順はこれで追従させる。
	//	#aLayName でなく #hPages を回すのは playback() が #aLayName を更新しないため。
	//	fore/back 同値にするのは [trans] で表に回る瞬間に前後がちらつかないよう
	#syncDomZ() {
		for (const {fore, back} of Object.values(this.#hPages)) {
			const z = this.#fore.getChildIndex(fore.ctn);
			fore.setDomZ(z);
			back.setDomZ(z);
		}
	}

	//MARK: レイヤ設定の消去
	#clear_lay(hArg: TArg) {
		const aLn = this.#foreachLayers(hArg, layer=> {
			//if (name === this.strTxtlay && hArg.page !== 'back') this.recText('', true);
				// 改ページ
			const pg = this.#hPages[this.#argChk_layer({layer})]!;
			// page=both で両面削除
			// an時代・瀬戸愛羅さんより https://famibee.blog.fc2.com/blog-entry-205.html
			if (hArg.page === 'both') {
				pg.fore.clearLay(hArg);
				pg.back.clearLay(hArg);
				return;
			}
			pg.getPage(hArg).clearLay(hArg);
		});
		CmnTween.stopTsyByLayer(aLn);	// 片付いたレイヤを動かしている[tsy]も畳む（clearLayは見た目を戻すだけ）

		return false;
	}

	//===================================================
	//MARK: WebGL フラグメントシェーダー GLSL
	static	readonly	#srcRuleTransFragment = /* glsl */`
precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform sampler2D rule;
uniform float vague;
uniform float tick;

uniform vec4 inputPixel;
uniform highp vec4 outputFrame;
vec2 getUV(vec2 coord) {
	return coord * inputPixel.xy / outputFrame.zw;
}

void main() {
	vec4 fg = texture2D(uSampler, vTextureCoord);
	vec4 ru = texture2D(rule, getUV(vTextureCoord));

	float v = ru.r - tick;
	gl_FragColor = abs(v) < vague
		? vec4(fg.rgb, 1) *fg.a *(0.5 +v /vague *0.5)
		: 0.0 <= v ? fg : vec4(0);
}`;
/*
	末尾が読みづらいが、以下のif文を消して三項演算子にしている。

	if (abs(v) < vague) {
		float f_a = fg.a *(0.5 +v /vague *0.5);
		gl_FragColor.rgb = fg.rgb *f_a;
		gl_FragColor.a = f_a;
		return;
	}
	gl_FragColor = v >= 0.0 ? fg : vec4(0);

		★GLSL : don't use "if"｜Nobu note.com/nobuhirosaijo/n/n606a3f5d8e89
			> if文はあまり使わない方がいいらしい (処理負荷が高い)
*/


	#rtTransBack = RenderTexture.create({
		width	: CmnLib.stageW,
		height	: CmnLib.stageH,
	});
	#spTransBack = new Sprite(this.#rtTransBack);

	#rtTransFore = RenderTexture.create({
		width	: CmnLib.stageW,
		height	: CmnLib.stageH,
	});
	#spTransFore = new Sprite(this.#rtTransFore);


	//MARK: ページ裏表を交換
	#trans(hArg: TArg) {
		const {layer} = hArg;
		const sDoTrans = new Set<string>;
		const aLayFore = this.#getLayers(layer).map(ln=> {
			sDoTrans.add(ln);
			return this.#hPages[ln]!.fore;
		});

		const comp = ()=> {
			[this.#fore, this.#back] = [this.#back, this.#fore];
			const aPrm: Promise<void>[] = [];
			for (const [ln, pg] of Object.entries(this.#hPages)) {
				if (sDoTrans.has(ln)) {pg.transPage(aPrm); continue}

				// transしないために交換する
				const {fore: {ctn: f}, back: {ctn: b}} = pg;
				const idx = this.#fore.getChildIndex(b);
				this.#fore.removeChild(b);
				this.#back.removeChild(f);
				this.#fore.addChildAt(f, idx);
				this.#back.addChildAt(b, idx);
			}
			void Promise.allSettled(aPrm).then(()=> {
				this.#fore.visible = true;
				this.#back.visible = false;	// 再び非表示の裏方に（直前までforeだった）
				this.#spTransBack.visible = false;
				this.#spTransFore.visible = false;

				// プラグイン htm の焼き込みを解除して DOM 描画へ戻す（time=0 パスからも
				//	呼ばれるが未焼きなら no-op）。z-index も swap 後の childIndex で振り直す
				for (const pg of Object.values(this.#hPages)) {
					pg.fore.transUnbake();
					pg.back.transUnbake();
				}
				this.#syncDomZ();

				Reading.notifyEndProc(TW_NM_TRANS);
			});
		};
		// hArg[':id'] = pg.fore.name.slice(0, -7);
		// this.scrItr.getDesignInfo(hArg);	// 必ず[':id'] を設定すること
		this.#spTransFore.filters = [];
		this.#spTransFore.alpha = 1;

		// 一瞬切り替え
		const time = argChk_Num(hArg, 'time', 0);
		if (time === 0 || this.#evtMng.isSkipping) {comp(); return false}

		// プラグイン htm の現在の絵を ctn へ焼き込み、htm は隠す。以降 #fore/#back を
		//	RenderTexture へ焼く処理にプラグインの絵も乗り、クロスフェード／ルール画像
		//	トランジションが無改造で効く。trans 対象外レイヤも焼く（焼かないと trans 中
		//	だけ htm が最前面へ浮くため）。comp() 内の transUnbake() で戻す
		for (const pg of Object.values(this.#hPages)) {
			pg.fore.transBake();
			pg.back.transBake();
		}

		const aBackTransAfter: Sprite[] = [];
		const aBack = this.#aLayName.map(ln=> {
			const {fore, back} = this.#hPages[ln]!;
			const lay = sDoTrans.has(ln) ?back :fore;
			if (lay.ctn.visible) aBackTransAfter.push(lay.ctn);
			return lay;
		});
		const {ticker, renderer} = this.appPixi;
		renderer.render(this.#back, {renderTexture: this.#rtTransBack});	// clear: true

		let fncRenderBack = ()=> {
			for (const ctn of aBackTransAfter) renderer.render(
				ctn,
				{renderTexture: this.#rtTransBack, clear: false}
			);
		};
		if (! aBack.some(lay=> lay.containMovement)) {
			const oldFnc = fncRenderBack;	// 動きがないなら最初に一度
			fncRenderBack = ()=> {fncRenderBack = ()=> { /* empty */ }; oldFnc()};
		}

		const render = ()=> renderer.render(this.#fore, {renderTexture: this.#rtTransFore});	// clear: true
		render();
		let fncRenderFore = ()=> {
			this.#fore.visible = true;
			render();
			this.#fore.visible = false;
		};
		if (! aLayFore.some(lay=> lay.containMovement)) {
			const oldFnc = fncRenderFore;	// 動きがないなら最初に一度
			fncRenderFore = ()=> {fncRenderFore = ()=> { /* empty */ }; oldFnc()};
		}
		const fncRender = ()=> {
			fncRenderBack();
			this.#spTransBack.visible = true;

			fncRenderFore();
			this.#spTransFore.visible = true;
		};


		// クロスフェード
		const {glsl, rule} = hArg;
		const comp2 = ()=> {ticker.remove(fncRender); comp()};
		if (! glsl && ! rule) {
			CmnTween.tween(TW_NM_TRANS, hArg, this.#spTransFore, {alpha: 0}, ()=> { /* empty */ }, comp2, ()=> { /* empty */ });
			ticker.add(fncRender);
			return false;
		}

		// Filter使用系（デフォルト値を glsl 属性で上書き可能）
		const uniforms = {
			rule	: Texture.EMPTY,
			vague	: argChk_Num(hArg, 'vague', 0.04),
			tick	: 0.0,
		};
		this.#spTransFore.filters = [new Filter(
			undefined,
			glsl ?? LayerMng.#srcRuleTransFragment,
			uniforms,
		)];
		const tw = CmnTween.tween(TW_NM_TRANS, hArg, uniforms, {tick: 1}, ()=> { /* empty */ }, comp2, ()=> { /* empty */ }, ! rule);
		if (! rule) {
			ticker.add(fncRender);
			return false;
		}

		// ルール画像あり
		const sm = new SpritesMng(rule, undefined, sp=> {
			uniforms.rule = sp.texture;
			sp.destroy();

			ticker.add(fncRender);
			tw.start();		// start = false にしたので必要
		}, isStop=> {if (isStop) this.main.resume()});
		return sm.ret;
	}

	#getLayers(layer = ''): string[] {return layer ?layer.split(',') :this.#aLayName}
	#foreachLayers(hArg: TArg, fnc: (ln: string, $pg: Pages)=> void): readonly string[] {
		const aLn = this.#getLayers(hArg.layer);
		for (const ln of aLn) {
			const pg = this.#hPages[ln];
			if (! pg) throw `存在しないlayer【${ln}】です`;

			fnc(ln, pg);
		}

		return aLn;
	}
	#sortLayers(layers = ''): string[] {
		return this.#getLayers(layers)
		.sort((a, b)=> {
			const ai = this.#fore.getChildIndex(this.#hPages[a]!.fore.ctn);
			const bi = this.#fore.getChildIndex(this.#hPages[b]!.fore.ctn);
			if (ai < bi) return -1;
			if (ai > bi) return 1;
			return 0;
		});
	}

	setAllStyle2TxtLay(style: string) {
		for (const ln of this.#aLayName) {
			const l = this.#hPages[ln]!.fore;
			if (l instanceof TxtLayer) l.lay({style});	// 必要最小限設定なので
			//	... l.cssText = style;
		}
	}

	//MARK: 画面を揺らす
	#quake(hArg: TArg) {
		if (argChk_Num(hArg, 'time', NaN) === 0) return false;

		const aLayCtn = this.#getLayers(hArg.layer)
		.map(ln=> this.#hPages[ln]!.fore.ctn);
		const {renderer, ticker} = this.appPixi;
		this.#rtTransFore.resize(CmnLib.stageW, CmnLib.stageH);
		const fncRender = ()=> {
			this.#fore.visible = true;
			for (const c of aLayCtn) renderer.render(
				c, {renderTexture: this.#rtTransFore, clear: false}
			);
			this.#fore.visible = false;
		};
		this.#spTransFore.visible = true;
		this.#spTransFore.alpha = 1;

		const h = uint(argChk_Num(hArg, 'hmax', 10));
		const v = uint(argChk_Num(hArg, 'vmax', 10));
		const fncH = h === 0
			? ()=> { /* empty */ }
			: ()=> {this.#spTransFore.x = Math.round(Math.random()* h*2) -h};
		const fncV = v === 0
			? ()=> { /* empty */ }
			: ()=> {this.#spTransFore.y = Math.round(Math.random()* v*2) -v};
		this.#spTransFore.filters = [];

		CmnTween.tween(TW_NM_TRANS, hArg, this.#spTransFore, {x: 0, y: 0}, ()=> {fncH(); fncV()}, ()=> {
			ticker.remove(fncRender);
				// transなしでもadd()してなくても走るが、構わないっぽい。
			this.#fore.visible = true;
			this.#spTransFore.visible = false;
			this.#spTransFore.x = 0;	// 必須、onUpdate は toの値にしてくれない
			this.#spTransFore.y = 0;

			Reading.notifyEndProc(TW_NM_TRANS);
		}, ()=> { /* empty */ });
		ticker.add(fncRender);

		return false;
	}


	//MARK: トゥイーン開始
	#tsy(hArg: TArg) {
		const {layer, render, name} = hArg;
		if (! layer) throw 'layerは必須です';

		const ln = this.#argChk_layer(hArg);
		const pg = this.#hPages[ln]!;
		const lay = pg.fore;

		let finishBlendLayer = ()=> { /* empty */ };
		if (render) {
			if (this.#evtMng.isSkipping) lay.renderStart(true);
			else {
				lay.renderStart(false);
				finishBlendLayer = ()=> lay.renderEnd();
			}
		}

		const hTo = CmnTween.cnvTweenArg(hArg, lay);
		const arrive = argChk_Boolean(hArg, 'arrive', false);
		const backlay = argChk_Boolean(hArg, 'backlay', false);
		const spBack = pg.back.ctn;	// fore, back が変わる恐れで外へ
		CmnTween.tween(name ?? layer, hArg, lay, CmnTween.cnvTweenArg(hArg, lay), ()=> { /* empty */ }, finishBlendLayer, ()=> {
			if (arrive) Object.assign(lay, hTo);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
			if (backlay) for (const nm of CmnTween.aLayerPrpNm) (<any>spBack)[nm] = lay[nm];
		}, true, ln);	// ln＝[er]/[clear_lay]でこのレイヤが片付くときトゥイーンを畳む手掛かり
		// hArg[':id'] = pg.fore.name.slice(0, -7);
		// this.scrItr.getDesignInfo(hArg);	// 必ず[':id'] を設定すること

		if ('filter' in hArg) {
			lay.ctn.filters = [Layer.bldFilters(hArg)];
			lay.aFltHArg = [hArg];
		}

		return false;
	}


	//MARK: フィルター追加
	#add_filter(hArg: TArg) {
		this.#foreachLayers(hArg, layer=> {
			const pg = this.#hPages[this.#argChk_layer({layer})]!;
			if (hArg.page === 'both') {	// page=both で両面に
				this.#add_filter2(pg.fore, hArg);
				this.#add_filter2(pg.back, hArg);
				return;
			}
			const l = pg.getPage(hArg);
			this.#add_filter2(l, hArg);
		});

		return false;
	}
	#add_filter2(l: Layer, hArg: TArg) {
		const s = l.ctn;
		s.filters ??= [];
		s.filters = [...s.filters, Layer.bldFilters(hArg)];
		l.aFltHArg.push(hArg);
	}

	//MARK: フィルター全削除
	#clear_filter(hArg: TArg) {
		this.#foreachLayers(hArg, layer=> {
			const pg = this.#hPages[this.#argChk_layer({layer})]!;
			if (hArg.page === 'both') {	// page=both で両面に
				const f = pg.fore;
				const b = pg.back;
				f.ctn.filters = null;
				b.ctn.filters = null;
				f.aFltHArg = [];
				b.aFltHArg = [];
				return;
			}
			const l = pg.getPage(hArg);
			l.ctn.filters = null;
			l.aFltHArg = [];
		});

		return false;
	}

	//MARK: フィルター個別切替
	#enable_filter(hArg: TArg) {
		this.#foreachLayers(hArg, layer=> {
			const pg = this.#hPages[this.#argChk_layer({layer})]!;
			if (hArg.page === 'both') {	// page=both で両面に
				this.#enable_filter2(pg.fore, hArg);
				this.#enable_filter2(pg.back, hArg);
				return;
			}
			const l = pg.getPage(hArg);
			this.#enable_filter2(l, hArg);
		});

		return false;
	}
	#enable_filter2(l: Layer, hArg: TArg) {
		const s = l.ctn;
		if (! s.filters) throw 'フィルターがありません';

		const i = uint(argChk_Num(hArg, 'index', 0));
		const len = s.filters.length;
		if (len <= i) throw `フィルターの個数（${String(len)}）を越えています`;

		l.aFltHArg[i]!.enabled =
		s.filters[i]!.enabled = argChk_Boolean(hArg, 'enabled', true);
	}


//	// 文字・文字レイヤ
	//MARK: 文字を追加する
	#ch(hArg: TArg) {
		const {text} = hArg;
		if (! text) throw 'textは必須です';

		const tl = this.#getTxtLayer(hArg);
		delete hArg.text;	// [graph]時、次行がルビ文法でトラブったので
		this.setNormalChWait();
		if (this.#evtMng.isSkipping) hArg.wait = 0;
		else if ('wait' in hArg) argChk_Num(hArg, 'wait', NaN);

		this.#cmdTxt('add｜'+ cnvSArg(<T_cmdTxt_JSON><unknown>hArg), tl);
			// [ch style]用

		const record = argChk_Boolean(hArg, 'record', true);
		const doRecLog = this.val.doRecLog();
		// [ch text=""]に改行を含められる方法
		// an時代・瀬戸愛羅さんより https://famibee.blog.fc2.com/blog-entry-275.html
		if (! record) this.val.setVal_Nochk('save', 'sn.doRecLog', record);
		tl.tagCh(text.replaceAll('[r]', '\n'));
		this.val.setVal_Nochk('save', 'sn.doRecLog', doRecLog);

		this.#cmdTxt('add_close｜', tl);	// [ch style]用

		return false;
	}

	#getTxtLayer = (_hArg: TArg): TxtLayer=> {this.#chkTxtLay(); throw 0};
	#$getTxtLayer(hArg: TArg): TxtLayer {
		const ln = this.#argChk_layer(hArg, this.#curTxtlay);
		const pg = this.#hPages[ln]!;
		const lay = pg.getPage(hArg);
		if (! (lay instanceof TxtLayer)) throw ln +'はTxtLayerではありません';

		return lay;
	}
	setNormalChWait(): void {TxtLayer.msecChWait = this.scrItr.normalWait}


	//MARK: 操作対象のメッセージレイヤの指定
	#current = (_hArg: TArg): boolean=> {this.#chkTxtLay(); throw 0};
	#$current(hArg: TArg) {
		const {layer} = hArg;
		if (! layer) throw '[current] layerは必須です';

		const lay = this.#hPages[layer];
		if (! lay || ! (lay.getPage(hArg) instanceof TxtLayer)) throw `${layer}はTxtLayerではありません`;
		this.#pgTxtlay = lay;

		this.#log.pagebreak();	// カレント変更前に現在の履歴を保存
		this.#curTxtlay = layer;
		this.val.setVal_Nochk('save', 'const.sn.mesLayer', layer);
		for (const ln of this.#aLayName) {
			const {fore, back} = this.#hPages[ln]!;
			if (! (fore instanceof TxtLayer)) continue;
			fore.isCur = (<TxtLayer>back).isCur = ln === layer;
		}

		return false;
	}
	get currentTxtlayForeNeedErr(): TxtLayer {
		this.#chkTxtLay();
		return this.currentTxtlayFore!;
	}
	get currentTxtlayFore(): TxtLayer | null {
		if (! this.#pgTxtlay) return null;

		return <TxtLayer>this.#pgTxtlay.fore;
	}
	#pgTxtlay	: Pages | undefined	= undefined;	// カレントテキストレイヤ
	#chkTxtLay	: ()=> void	= ()=> {throw '文字レイヤーがありません。文字表示や操作する前に、[add_lay layer=（レイヤ名） class=txt]で文字レイヤを追加して下さい'};

	#argChk_layer(hArg: TArg, def = ''): string {
		const ln = hArg.layer ?? def;
		if (ln.includes(',')) throw 'layer名に「,」は使えません';
		if (! (ln in this.#hPages)) throw '属性 layer【'+ ln +'】が不正です。レイヤーがありません';

		hArg.layer = ln;
		return ln;
	}


	recPagebreak() {this.#log.pagebreak()}


	//MARK: 文字消去
	#clear_text(hArg: TArg) {
		const tf = this.#getTxtLayer(hArg);
		if (hArg.layer === this.#curTxtlay && hArg.page === 'fore') this.#log.pagebreak();	// 改ページ、クリア前に
		tf.clearText();
		return false;
	}


	//MARK: ハイパーリンクの終了
	#endlink(hArg: TArg) {this.#cmdTxt('endlink｜', this.#getTxtLayer(hArg)); return false}

	//MARK: ページ両面の文字消去
	#er(hArg: TArg) {
		if (argChk_Boolean(hArg, 'rec_page_break', true)) this.#log.pagebreak();	// 改ページ、クリア前に

		if (this.#pgTxtlay) {
			this.#pgTxtlay.fore.clearLay(hArg);
			this.#pgTxtlay.back.clearLay(hArg);
			CmnTween.stopTsyByLayer([this.#pgTxtlay.fore.layname]);	// 文字レイヤを動かしている[tsy]も畳む
		}

		return false;
	}

	//MARK: インライン画像表示
	#graph(hArg: TArg) {
		if (! hArg.pic) throw '[graph] picは必須です';

		this.#cmdTxt('grp｜'+ cnvSArg(<T_cmdTxt_JSON><unknown>hArg), this.#getTxtLayer(hArg));
		return false;
	}

	//MARK: ハイパーリンク
	#link(hArg: TArg) {
		if (! hArg.fn && ! hArg.label && ! hArg.url) throw 'fn,label,url いずれかは必須です';
		hArg.fn ??= this.scrItr.scriptFn;	// ここで指定する必要がある

		hArg.style ??= 'background-color: rgba(255,0,0,0.5);';
		hArg.style_hover ??= 'background-color: rgba(255,0,0,0.9);';
		hArg.style_clicked ??= hArg.style;
		this.#cmdTxt('link｜'+ cnvSArg(<T_cmdTxt_JSON><unknown>hArg), this.#getTxtLayer(hArg));
		return false;
	}

	//MARK: 改行
	#r(hArg: TArg) {return this.#ch({...hArg, text: '\n'})}

	//MARK: 文字列と複数ルビの追加
	#ruby2(hArg: TArg) {
		const {t, r} = hArg;
		if (! t) throw '[ruby2] tは必須です';
		if (! r) throw '[ruby2] rは必須です';

		hArg.text = '｜'+ encodeURIComponent(t) +'《'+ encodeURIComponent(r) +'》';
		delete hArg.t;
		delete hArg.r;
		return this.#ch(hArg);
	}


	//MARK: インラインスタイル設定
	#span(hArg: TArg) {
		this.#cmdTxt('span｜'+ cnvSArg(<T_cmdTxt_JSON><unknown>hArg), this.#getTxtLayer(hArg));
		return false;
	}

	//MARK: tcy縦中横を表示する
	#tcy(hArg: TArg) {
		if (! hArg.t) throw '[tcy] tは必須です';

		this.#cmdTxt('tcy｜'+ cnvSArg(<T_cmdTxt_JSON><unknown>hArg), this.#getTxtLayer(hArg));
		return false;
	}


	//MARK: レイヤのダンプ
	#dump_lay({layer}: TArg) {
		console.group('🥟 [dump_lay]');
		for (const ln of this.#getLayers(layer)) {
			const {fore, back} = this.#hPages[ln]!;
			try {
				console.info(`%c${fore.name.slice(0, -7)} %o`, `color:#${CmnLib.isDarkMode ?'49F' :'05A'};`,
				JSON.parse(`{"back":{${back.dump()}}, "fore":{${fore.dump()}}}`));
			} catch (e) {
				console.error('dump_lay err:%o', e);
				console.error(`   back:${back.dump()}`);
				console.error(`   fore:${fore.dump()}`);
			}
		}
		console.groupEnd();

		return false;
	}


	//MARK: イベント有無の切替
	#enable_event(hArg: TArg) {
		const ln = this.#argChk_layer(hArg, this.#curTxtlay);
		const v = argChk_Boolean(hArg, 'enabled', true);
		this.#getTxtLayer(hArg).enabled = v;
		this.val.setVal_Nochk('save', 'const.sn.layer.'+ ln +'.enabled', v);

		return false;
	}


	//MARK: ボタンを表示
	#button(hArg: TArg) {
		Pages.argChk_page(hArg, 'back');	// チェックしたいというよりデフォルトをbackに
		hArg.fn ??= this.scrItr.scriptFn;	// ここで指定する必要がある
			// fn省略時、画像ボタンはロード後という後のタイミングで scrItr.scriptFn を
			// 参照してしまうので
		void this.#getTxtLayer(hArg).addButton(hArg);	// hArg[':id_tag'] も設定

		this.scrItr.recodeDesign(hArg);	// 必ず[':id_tag'] を設定すること

		return false;
	}


	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	record(): any {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const o: any = {};
		for (const ln of this.#aLayName) {
			const pg = this.#hPages[ln]!;
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			o[ln] = {
				cls: pg.cls,
				fore: pg.fore.record(),
				back: pg.back.record(),
			};
		}
		return o;
	}
	playback($hPages: T_HPage): Promise<void>[] {
		// これを先に。save:const.sn.sLog がクリアされてしまう
		this.#log.playback();

		const aPrm: Promise<void>[] = [];
		const aSort: {ln: string, idx: number}[] = [];
		for (const [ln, {fore, fore: {idx}, back, cls}] of Object.entries($hPages)) {	// 引数で言及の無いレイヤはそのまま。特に削除しない
			aSort.push({ln, idx});
			const ps = this.#hPages[ln] ??= new Pages(ln, cls, this.#fore, this.#back, {}, this.sys, this.val, {isWait: false});
			ps.fore.playback(fore, aPrm);
			ps.back.playback(back, aPrm);
		}

		const len = this.#fore.children.length;
		aPrm.push(new Promise(re=> {	// 若い順にsetChildIndex()
			for (const {ln, idx} of aSort.sort(({idx: a}, {idx: b})=> a === b ?0 :a < b ?-1 :1)) {
				const pg = this.#hPages[ln];
				if (! pg) continue;

				const i = len > idx ?idx :len -1;
				const {fore, back} = pg;
				this.#fore.setChildIndex(fore.ctn, i);
				this.#back.setChildIndex(back.ctn, i);
			}
			this.#syncDomZ();	// しおりLoad後の childIndex を DOM オーバーレイへ反映
			re();
		}));
		return aPrm;
	}

}
