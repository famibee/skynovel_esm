/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import  type {T_HINFO} from '../appMain_cmn';
import {SysBase} from './SysBase';
import {CmnLib, getDateStr, argChk_Boolean, argChk_Num, uint} from './CmnLib';
import type {T_HTag, TTag} from './Grammar';
import type {T_Variable, T_Data4Vari, T_Main, T_SysBaseParams, T_SysBaseLoadedParams, T_H_TMP_DATA} from './CmnInterface';
import {creSYS_DATA} from './CmnInterface';
import type {SAVE_WIN_INF, T_FETCH, T_IpcEvents, T_IpcRendererEvent} from '../preload';
import {DebugMng} from './DebugMng';
import {PROTOCOL_USERDATA} from './Config';

import type {Application, Loader} from 'pixi.js';
import type {IpcRendererEvent, MessageBoxOptions} from 'electron/renderer';
import {IpcListener, IpcEmitter} from '@electron-toolkit/typed-ipc/renderer'
import type {readFile} from 'fs-extra';


type T_upd__index_json_pkg = {
	[pkg_name: string]: {
		path	: string;
		size	: number;
		sha512	: string;
		cn		: string;
	};
	// 'win32_x64': {
	// 	'path': 'xxx-1.0.0-x64.exe',
	// 	'size': 23892...,
	// 	'sha512': 'GVaqx...',
	// 	'cn': 'YTNm...'
	// }
}
type T_upd__index_json = T_upd__index_json_pkg & {
	version	: string;
	name	: string;
}


	// console.log はアプリのコンソールに出る
export class SysApp extends SysBase {
	constructor(...[hPlg = {}, arg = {cur: 'prj/', crypto: false, dip: ''}]: T_SysBaseParams) {	// DOMContentLoaded は呼び出し側でやる
		super(hPlg, arg);

		void this.loaded(hPlg, arg);
	}
	protected override async loaded(...[hPlg, arg]: T_SysBaseLoadedParams) {
		await super.loaded(hPlg, arg);

		this.#hInfo = await this.#em.invoke('getInfo');
		CmnLib.isPackaged = this.#hInfo.isPackaged;
		// this.arg = arg = {...arg, cur: this.#hInfo.getAppPath.replaceAll('\\', '/') + (CmnLib.isPackaged ?'/doc/' :'/')+ arg.cur};

		this.#ipc.on('log', (_: IpcRendererEvent, arg: unknown)=> console.info('main: %o', arg));

		this.$path_downloads = this.#hInfo.downloads.replaceAll('\\', '/') +'/';

		CmnLib.isDbg = Boolean(this.#hInfo.env.SKYNOVEL_DBG) && ! CmnLib.isPackaged;	// 配布版では無効
		if (CmnLib.isDbg) this.extPort = uint(this.#hInfo.env.SKYNOVEL_PORT ?? '3776');

		await this.run();
	}
	#hInfo:  T_HINFO = {
		getAppPath	: '',
		isPackaged	: false,
		downloads	: '',
		userData	: '',
		getVersion	: '',
		env			: {},
		platform	: '',
		arch		: '',
	};

	// === vite-electron 用コード ===
	#em		= new IpcEmitter<T_IpcEvents>;
	#ipc	= new IpcListener<T_IpcRendererEvent>;

	override use4ViteElectron(src: string, path: string, ld: Loader, main: T_Main) {
		if (! src.startsWith(PROTOCOL_USERDATA)) return false;

		ld.use((res, next)=> void this.readFile(path, <Parameters<typeof readFile>[1]><unknown>'base64')
		.then((base64 : string)=> {
			const img = new Image;
			img.src = `data:image/${path.endsWith('.png') ?'png' :'jpeg'};base64,${base64}`;
			res.data = img;
		})
		.catch((e: unknown)=> main.errScript(`FrameMng use ロード失敗です fn:${res.name} ${String(e)}`, false))
		.finally(()=> next()));

		return true;
	}
	#fetch2web = (url: string)=> this.#em.invoke('fetch', url);
	#fetchAb2web = (url: string)=> this.#em.invoke('fetchAb', url);

	override	ensureFile	= (path: string)=> this.#em.invoke('ensureFile', path);
	// === vite-electron 用コード ===
	protected	async readFile(path: string, encoding: Parameters<typeof readFile>[1]) {
		return this.#em.invoke('readFile', path, encoding);
	}
	protected	writeFile	= (path: string, data: string | NodeJS.ArrayBufferView, o?: object)=> this.#em.invoke('writeFile', path, data, o);
	override	appendFile	= (path: string, data: string)=> this.#em.invoke('appendFile', path, data);
	override	outputFile	= (path: string, data: string)=> this.#em.invoke('outputFile', path, data);

	override readonly	isApp = true;
	protected 	override $path_userdata		= '';
	protected	override $path_downloads	= '';

	override async	initVal(hTmp: T_H_TMP_DATA, comp: (data: T_Data4Vari)=> void) {
		// システム情報
		hTmp['const.sn.isDebugger'] = false;
			// システムがデバッグ用の特別なバージョンか
			// AIRNovel の const.flash.system.Capabilities.isDebugger

		this.$path_userdata	= CmnLib.isDbg
			? this.#hInfo.getAppPath.slice(0, -3) +'.vscode/'	// /doc → /
			: this.#hInfo.userData.replaceAll('\\', '/') +'/';

		this.flushSub = ()=> {
			void this.#em.invoke('flush', JSON.parse(JSON.stringify(this.data)));
		}	// 関数や undefined を無視してくれるので、structuredClone() よりいい動作
		await this.#setStore();
		const first = hTmp['const.sn.isFirstBoot']
		= await this.#em.invoke('Store_isEmpty');
		if (first) {
			// データがない（初回起動）場合の処理
			this.data.sys = creSYS_DATA();
			this.data.mark = {};
			this.data.kidoku = {};
		}
		else {
			// データがある場合の処理
			const o = <T_Data4Vari>await this.#em.invoke('Store_get');
			this.data.sys = o.sys;
			this.data.mark = o.mark;
			this.data.kidoku = o.kidoku;
		}

		// ウインドウ位置
		const x = argChk_Num(this.data.sys, 'const.sn.nativeWindow.x', 0);
		//const x = Number(this.val.getVal(	// ここではまだ使えない
		const y = argChk_Num(this.data.sys, 'const.sn.nativeWindow.y', 0);
		const w = this.data.sys['const.sn.nativeWindow.w'] || CmnLib.stageW;
		const h = this.data.sys['const.sn.nativeWindow.h'] || CmnLib.stageH;

		this.#ipc.on('save_win_inf', (_e: IpcRendererEvent, {x, y, w, h}: SAVE_WIN_INF)=> {
// console.log(`fn:SysApp.ts save_win_inf (${x},${y},${w},${h})`);
			this.data.sys['const.sn.nativeWindow.x'] = x;
			this.data.sys['const.sn.nativeWindow.y'] = y;
			this.data.sys['const.sn.nativeWindow.w'] = w;
			this.data.sys['const.sn.nativeWindow.h'] = h;

			// ・画面サイズ：screen.width ウインドウが表示されているディスプレイのサイズ
			//	※ macOSなら【設定】-【ディスプレイ】-【使用形態】のイメージボタンにホバーすると出る数字と同じ
// DebugMng.myTrace(`fn:SysApp.ts 画面サイズ(${String(screen.width)} x ${String(screen.height)}) 利用可能領域(${String(screen.availWidth)} x ${String(screen.availHeight)})`, 'W');
			hTmp['const.sn.screenResolutionX'] = screen.availWidth;	// 画面の最大水平解像度
			hTmp['const.sn.screenResolutionY'] = screen.availHeight;	// 画面の最大垂直解像度
				// AIRNovel の const.flash.system.Capabilities.screenResolutionX、Y
				// 上のメニューバーは含んでいない（たぶん an も）。含むのは workAreaSize

			comp(this.data);
		});

// console.log(`fn:SysApp.ts to_app.inited(${x},${y},${w},${h})`);
		await this.#em.invoke('inited', this.cfg.oCfg, {c: first, x, y, w, h});
	}
	#setStore = ()=> this.#em.invoke('Store', {
		cwd	: this.$path_userdata +'storage',
		name: this.arg.crypto ?'data_' :'data',
		encryptionKey: this.arg.crypto ?this.stk() :undefined,
	});


	override init(hTag: T_HTag, appPixi: Application, val: T_Variable) {
		const ret = super.init(hTag, appPixi, val);
		document.body.style.backgroundColor = '#000';

		this.#ipc.on('shutdown', (_e: IpcRendererEvent)=> this.main?.destroy());

		const ev = new MouseEvent('click');
		this.#ipc.on('fire', (_e: IpcRendererEvent, KEY: string)=> this.fire(KEY, ev));
		//this.#ipc.on('call', (_e: IpcRendererEvent, fn: string, label: string)=> main.resumeByJumpOrCall({fn, label}));	// 実験・保留コード。セキュリティ懸念

		return ret;
	}


	override cvsResize() {
		super.cvsResize();

		if (! this.main) return;
		const cvs = this.main.cvs;
		const ps = cvs.parentElement?.style;
		if (! ps) return;
		const s = cvs.style;
		if (this.isFullScr) {
			ps.position = '';	// SysBaseを上書き
			ps.width = '';
			ps.height= '';

			s.position = 'fixed';
			s.left = `${String(this.ofsLeft4elm)}px`;
			s.top  = `${String(this.ofsTop4elm)}px`;
		}
		else {
			ps.position = 'relative';	// SysBaseを上書き
			ps.width = `${String(this.cvsWidth)}px`;
			ps.height= `${String(this.cvsHeight)}px`;

			s.position = 'relative';
			s.left = '';
			s.top  = '';
		}
	}


	override copyBMFolder	= (from: number, to: number)=> {
		const path_from = `${this.$path_userdata}storage/${String(from)}/`;
		const path_to = `${this.$path_userdata}storage/${String(to)}/`;
		void this.#em.invoke('existsSync', path_from).then(async v=> {
			if (v)  await this.#em.invoke('copy', path_from, path_to);
		});
	};
	override eraseBMFolder	= (place: number)=> {
		void this.#em.invoke('remove', `${this.$path_userdata}storage/${String(place)}/`);
	};

	// アプリの終了
	protected override readonly	close = ()=> {void this.#em.invoke('win_close'); return false}

	// プレイデータをエクスポート
	protected override readonly	_export = ()=> {
		void this.#em.invoke('zip',
			this.$path_userdata +'storage/',
			this.$path_downloads + (this.arg.crypto ?'' :'no_crypto_')
			+ this.cfg.headNs + getDateStr('-', '_', '') +'.spd',
		).then(()=> {
			if (CmnLib.debugLog) console.log('プレイデータをエクスポートしました');
			this.fire('sn:exported', new MouseEvent('click'));	// 末尾に処理
		});

		return false;
	}

	// プレイデータをインポート
	protected override readonly	_import = ()=> {
		this.#em.invoke('showOpenDialog', {
			title	: 'play data import',
			filters	: [{name: 'sn import', extensions: ['spd']}],
			properties: [
				'openFile',	// - ファイルを選択するのを許可します。
				// openDirectory - ディレクトリを選択するのを許可します。
				// multiSelections - 複数のパスを選択するのを許可します。
			],
		}).then(async ({canceled, filePaths: [inp]})=> {
			if (canceled) return;

			const bkFlush = ()=> this.flush();
			this.flush = ()=> { /* empty */ };
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			await this.#em.invoke('unzip', inp!, this.$path_userdata +'storage/');

			await this.#setStore();
			const o = <T_Data4Vari>await this.#em.invoke('Store_get');
			this.data.sys = o.sys;
			this.data.mark = o.mark;
			this.data.kidoku = o.kidoku;
			this.flush = bkFlush;
			this.flush();
			this.val.updateData(o);

			if (CmnLib.debugLog) console.log('プレイデータをインポートしました');
			this.fire('sn:imported', new MouseEvent('click'));
		})
		.catch((e: unknown)=> console.log(`[import] err: ${String(e)}`));

		return false;
	}

	// ＵＲＬを開く
	protected override readonly	navigate_to: TTag = hArg=> {
		const {url} = hArg;
		if (! url) throw '[navigate_to] urlは必須です';

		void this.#em.invoke('navigate_to', url);

		return false;
	}
	// タイトル指定
	protected override titleSub(title: string) {void this.#em.invoke('win_setTitle', title)}

	// 全画面状態切替
	protected override readonly	tglFlscr_sub
	= async ()=> this.#em.invoke('isSimpleFullScreen').then(async isFS=> {
		this.isFullScr = ! isFS;
		await this.#em.invoke('setSimpleFullScreen', this.isFullScr);
	});


	// 更新チェック
	protected override readonly	update_check: TTag = hArg=> {
		const {url} = hArg;
		if (! url) throw '[update_check] urlは必須です';
		if (! url.endsWith('/')) throw '[update_check] urlの末尾は/にして下さい';
		if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] url=${url}`, 'D');

		void this.#fetch2web(url +'_index.json')
		.then(async o=> {
			const mbo: MessageBoxOptions = {
				title	: 'アプリ更新',
				icon	: this.#hInfo.getAppPath +'/app/icon.png',
				buttons	: ['OK', 'Cancel'],
				defaultId	: 0,
				cancelId	: 1,
				message	: `アプリ【${this.cfg.oCfg.book.title}】に更新があります。\nダウンロードしますか？`,
			};
			if (o.ok) await this.#idxjs_found(o, url, mbo);
			else await this.#idxjs_not_found(url, mbo);
		})
		.catch((e: unknown)=> DebugMng.myTrace(String(e), 'ET'));

		return false;
	}
	async #idxjs_found(o: T_FETCH, url: string, mbo: MessageBoxOptions) {
		if (CmnLib.debugLog) DebugMng.myTrace('[update_check] _index.jsonを取得しました', 'D');
		const oIdx = <T_upd__index_json>JSON.parse(o.txt);
		if (! await this.#dl_start(oIdx.version, mbo)) return;

		const key = this.#hInfo.platform +'_'+ this.#hInfo.arch;
	//	const key = this.#hInfo.platform +'_@'+ this.#hInfo.arch;
			// アーキテクチャがない場合の動作テスト
		const k = oIdx[key];
		if (k) {
			const {cn, path} = k;
			await this.#dl_app(url, key +'-'+ cn, path);
			await this.#dl_comp(mbo);
			return;
		}

		let d = '';
		const regOldSameKey = new RegExp('^'+ this.#hInfo.platform +'_');
		const a: Promise<void>[] = Object.entries(<{[nm: string]: {
			path: string,
			cn	: string,
		}}>oIdx)
		.flatMap(([nm, {path, cn}])=> {
			if (! regOldSameKey.test(nm)) return [];
			d += '\n- '+ path;
			return this.#dl_app(url, nm +'-'+ cn, path);
		});

		mbo.message = `CPU = ${this.#hInfo.arch}\nに対応するファイルが見つかりません。同じOSのファイルをすべてダウンロードしますか？`;
		mbo.detail = `${String(a.length)} 個ファイルがあります`+ d;
		const {response} = await this.#em.invoke('showMessageBox', mbo);
		if (response > 0) return;

		await Promise.allSettled(a);
		await this.#dl_comp(mbo);
	}
	async #idxjs_not_found(url: string, mbo: MessageBoxOptions) {
		const o = await this.#fetch2web(url +`latest${CmnLib.isMac ?'-mac' :''}.yml`);
		if (! o.ok) {
			if (CmnLib.debugLog) throw '[update_check] .ymlが見つかりません';
			return;
		}
		if (CmnLib.debugLog) DebugMng.myTrace('[update_check] .ymlを取得しました', 'D');
		const sYml = o.txt;
		const mv = /version: (.+)/.exec(sYml);
		const mv2 = mv?.[1];
		if (! mv2) throw '[update_check] .yml に version が見つかりません';

		if (! await this.#dl_start(mv2, mbo)) return;


		const mp = /path: (.+)/.exec(sYml);
		if (! mp) throw '[update_check] path が見つかりません';
		const [,path] = mp;
		if (! path) throw '[update_check] path が見つかりません.';
		if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] path=${path}`, 'D');

		const mc = /sha512: (.+)/.exec(sYml);
		if (! mc) throw '[update_check] sha512 が見つかりません';
		const [,sha] = mc;
		if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] sha=${sha ?? ''}=`, 'D');

		// (id)-1.0.0-arm64.dmg
		const [,id, arch] = /(.+)(\.\w+)/.exec(path) ?? ['', '', ''];
		await this.#dl_app(url, id + '-' + this.#hInfo.arch + arch, path);
		await this.#dl_comp(mbo);
	}

	async #dl_start(netver: string, mbo: MessageBoxOptions): Promise<boolean> {
		const appver = this.#hInfo.getVersion;
		if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] 現在ver=${appver} 新規ver=${netver}`, 'D');
		if (netver === appver) {
			if (CmnLib.debugLog) DebugMng.myTrace('[update_check] バージョン更新なし', 'I');
			return false;
		}

		mbo.detail = `現在 NOW ver ${appver}\n新規 NEW ver ${netver}`;
		const {response} = await this.#em.invoke('showMessageBox', mbo);
		if (response > 0) return false;

		// アプリダウンロード
		if (CmnLib.debugLog) DebugMng.myTrace('[update_check] アプリダウンロード開始', 'D');

		return true;
	}
	async #dl_app(url: string, urlApp: string, fn: string) {
		if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] アプリファイルDL試行... url=${url + urlApp}`, 'D');
		const o = await this.#fetchAb2web(url + urlApp);
		if (! o.ok) {
			if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] アプリファイルが見つかりません url=${url + fn}`);
			return;
		}

		const pathDL = this.#hInfo.downloads +'/'+ fn;
		if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] pathDL=${pathDL}`, 'D');

		await this.writeFile(pathDL, new DataView(o.ab));
	}
	async #dl_comp(mbo: MessageBoxOptions) {
		if (CmnLib.debugLog) DebugMng.myTrace('アプリファイルを保存しました', 'D');

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		mbo.buttons!.pop();
		mbo.message = `アプリ【${this.cfg.oCfg.book.title}】の更新パッケージを\nダウンロードしました`;
//			mbo.message = `アプリ【${this.cfg.oCfg.book.title}】の更新パッケージを\nダウンロードしました`+ (isOk ?'' :'が、破損しています。\n開発元に連絡してください');
		await this.#em.invoke('showMessageBox', mbo);
	}

	// アプリウインドウ設定
	protected override readonly	window: TTag = hArg=> {
		const x = argChk_Num(hArg, 'x', Number(this.val.getVal('sys:const.sn.nativeWindow.x', 0)));
		const y = argChk_Num(hArg, 'y', Number(this.val.getVal('sys:const.sn.nativeWindow.y', 0)));
		const w = argChk_Num(hArg, 'w', Number(this.val.getVal('sys:const.sn.nativeWindow.w', CmnLib.stageW)));
		const h = argChk_Num(hArg, 'h', Number(this.val.getVal('sys:const.sn.nativeWindow.h', CmnLib.stageH)));
		this.#em.invoke('window', argChk_Boolean(hArg, 'centering', false), x, y, CmnLib.stageW, CmnLib.stageH)
		.catch((e: unknown)=> DebugMng.myTrace(String(e), 'ET'));
		this.val.setVal_Nochk('sys', 'const.sn.nativeWindow.x', x);
		this.val.setVal_Nochk('sys', 'const.sn.nativeWindow.y', y);
		this.val.setVal_Nochk('sys', 'const.sn.nativeWindow.w', w);
		this.val.setVal_Nochk('sys', 'const.sn.nativeWindow.h', h);
		this.flush();

		return false;
	}

	override capturePage(path: string, w: number, h: number, fnc: ()=> void) {
		void this.#em.invoke('capturePage', path, w, h).then(()=> fnc());
	}

	override async savePic(path: string, data_url: string) {
		const bs64 = data_url.slice(data_url.indexOf(',', 20) +1);
		await this.ensureFile(path);
		await this.writeFile(path, bs64);
		if (CmnLib.debugLog) console.log(`画像ファイル ${path} を保存しました`);
	}

}
