/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {SysNode} from './SysNode';
import {CmnLib, getDateStr, argChk_Boolean, argChk_Num, uint} from './CmnLib';
import type {IHTag, ITag} from './Grammar';
import type {IVariable, IData4Vari, IMain, T_SysBaseParams, T_SysBaseLoadedParams} from './CmnInterface';
import {Main} from './Main';
import {DebugMng} from './DebugMng';

import {Application} from 'pixi.js';
import type {HINFO, SAVE_WIN_INF, T_IpcEvents, T_IpcRendererEvent} from '../preload';
import type {IpcRendererEvent, MessageBoxOptions} from 'electron/renderer';
import {IpcListener, IpcEmitter} from '@electron-toolkit/typed-ipc/renderer'


// console.log はアプリのコンソールに出る
export class SysApp extends SysNode {
	// === vite-electron 用コード ===
	#em		= new IpcEmitter<T_IpcEvents>;
	#ipc	= new IpcListener<T_IpcRendererEvent>;

	constructor(...[hPlg = {}, arg = {cur: 'prj/', crypto: false, dip: ''}]: T_SysBaseParams) {	// DOMContentLoaded は呼び出し側でやる
		super(hPlg, arg);

		queueMicrotask(async ()=> this.loaded(hPlg, arg));
	}
	protected override async loaded(...[hPlg, arg]: T_SysBaseLoadedParams) {
		await super.loaded(hPlg, arg);

		this.#hInfo = await this.#em.invoke('getInfo');
		CmnLib.isPackaged = this.#hInfo.isPackaged;
		// this.arg = arg = {...arg, cur: this.#hInfo.getAppPath.replaceAll('\\', '/') + (CmnLib.isPackaged ?'/doc/' :'/')+ arg.cur};

		this.$path_downloads = this.#hInfo.downloads.replaceAll('\\', '/') +'/';

		this.#ipc.on('log', (_: IpcRendererEvent, arg: any)=> console.info(`main: %o`, arg));

		CmnLib.isDbg = Boolean(this.#hInfo.env['SKYNOVEL_DBG']) && ! CmnLib.isPackaged;	// 配布版では無効
		if (CmnLib.isDbg) this.extPort = uint(this.#hInfo.env['SKYNOVEL_PORT'] ?? '3776');

		await this.run();
	}
	#hInfo:  HINFO = {
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
	#fetch2web = (url: string)=> this.#em.invoke('fetch', url);
	#fetchAb2web = (url: string)=> this.#em.invoke('fetchAb', url);

	override	ensureFileSync	= (path: string)=> this.#em.invoke('ensureFileSync', path);
	// === vite-electron 用コード ===
	override	readFileSync	= (path: string, encoding: BufferEncoding = 'utf8')=> this.#em.invoke('readFileSync', path, encoding);
	protected override	writeFileSync	= (path: string, data: string | NodeJS.ArrayBufferView, o?: object)=> this.#em.invoke('writeFileSync', path, data, o);
	override	appendFile		= (path: string, data: string)=> this.#em.invoke('appendFile', path, data);
	override	outputFile		= (path: string, data: string)=> this.#em.invoke('outputFile', path, data);

	protected 	override $path_userdata		= '';
	protected	override $path_downloads	= '';

	override async	initVal(data: IData4Vari, hTmp: any, comp: (data: IData4Vari)=> void) {
		// システム情報
		hTmp['const.sn.isDebugger'] = false;
			// システムがデバッグ用の特別なバージョンか
			// AIRNovel の const.flash.system.Capabilities.isDebugger

		this.$path_userdata	= CmnLib.isDbg
			? this.#hInfo.getAppPath.slice(0, -3) +'.vscode/'	// /doc → /
			: this.#hInfo.userData.replaceAll('\\', '/') +'/';

		this.flushSub = ()=> {
			this.#em.invoke('flush', JSON.parse(JSON.stringify(this.data)));
		}	// 関数や undefined を無視してくれるので、structuredClone() よりいい動作
		this.#setStore()
		.then(async ()=> {
			const first = hTmp['const.sn.isFirstBoot']
			= await this.#em.invoke('Store_isEmpty');
			if (first) {
				// データがない（初回起動）場合の処理
				this.data.sys = data.sys;
				this.data.mark = data.mark;
				this.data.kidoku = data.kidoku;
				this.flush();	// 初期化なのでここのみ必要
			}
			else {
				// データがある場合の処理
				const store = await this.#em.invoke('Store_get', );
				this.data.sys = store.sys;
				this.data.mark = store.mark;
				this.data.kidoku = store.kidoku;
			}

			// ウインドウ位置
			const x = (this.data.sys as any)['const.sn.nativeWindow.x'] ?? 0;
			//const x = Number(this.val.getVal(	// ここではまだ使えない
			const y = (this.data.sys as any)['const.sn.nativeWindow.y'] ?? 0;
			const w = (this.data.sys as any)['const.sn.nativeWindow.w'] ?? CmnLib.stageW;
			const h = (this.data.sys as any)['const.sn.nativeWindow.h'] ?? CmnLib.stageH;
// console.log(`fn:SysApp.ts to_app.inited(${x},${y},${w},${h})`);
			this.#em.invoke('inited', this.cfg.oCfg, {c: first, x, y, w, h});

			this.#ipc.on('save_win_inf', (_e: IpcRendererEvent, {x, y, w, h, scrw, scrh}: SAVE_WIN_INF)=> {
// console.log(`fn:SysApp.ts save_win_inf (${x},${y},${w},${h}) scrw:${scrw} scrh:${scrh}`);
				this.val.setVal_Nochk('sys', 'const.sn.nativeWindow.x', x);
				this.val.setVal_Nochk('sys', 'const.sn.nativeWindow.y', y);
				this.val.setVal_Nochk('sys', 'const.sn.nativeWindow.w', w);
				this.val.setVal_Nochk('sys', 'const.sn.nativeWindow.h', h);
				this.flush();

				hTmp['const.sn.screenResolutionX'] = scrw;
					// 画面の最大水平解像度
				hTmp['const.sn.screenResolutionY'] = scrh;
					// 画面の最大垂直解像度
					// AIRNovel の const.flash.system.Capabilities.screenResolutionX、Y
					// 上のメニューバーは含んでいない（たぶん an も）。含むのは workAreaSize
			});

			comp(this.data);
		});
	}
	#setStore = ()=> this.#em.invoke('Store', {
		cwd	: this.$path_userdata +'storage',
		name: this.arg.crypto ?'data_' :'data',
		encryptionKey: this.arg.crypto ?this.stk() :undefined,
	});


	#main: Main;
	protected override async run() {
		if (this.#main) this.#main.destroy();
		this.#main = new Main(this);
	}


	override init(hTag: IHTag, appPixi: Application, val: IVariable, main: IMain): Promise<void>[] {
		const ret = super.init(hTag, appPixi, val, main);

		this.#ipc.on('shutdown', (_e: IpcRendererEvent)=> main.destroy());

		const ev = new Event('click');
		this.#ipc.on('fire', (_e: IpcRendererEvent, KEY: string)=> this.fire(KEY, ev));
		//this.#ipc.on('call', (_e: IpcRendererEvent, fn: string, label: string)=> main.resumeByJumpOrCall({fn, label}));	// 実験・保留コード。セキュリティ懸念

		return ret;
	}


	override cvsResize() {
		super.cvsResize();

		const cvs = this.main.cvs;
		const ps = cvs.parentElement!.style;
		const s = cvs.style;
		if (this.isFullScr) {
			ps.position = '';	// SysBaseを上書き
			ps.width = '';
			ps.height= '';

			s.position = 'fixed';
			s.left = `${this.ofsLeft4elm}px`;
			s.top  = `${this.ofsTop4elm}px`;
		}
		else {
			ps.position = 'relative';	// SysBaseを上書き
			ps.width = `${this.cvsWidth}px`;
			ps.height= `${this.cvsHeight}px`;

			s.position = 'relative';
			s.left = '';
			s.top  = '';
		}
	}


	override copyBMFolder	= async (from: number, to: number)=> {
		const path_from = `${this.$path_userdata}storage/${from}/`;
		const path_to = `${this.$path_userdata}storage/${to}/`;
		if (! await this.#em.invoke('existsSync', path_from)) return;	// 使ってない場合もある

		this.#em.invoke('copySync', path_from, path_to);
	};
	override eraseBMFolder	= async (place: number)=> {
		await this.#em.invoke('removeSync', `${this.$path_userdata}storage/${place}/`);
	};

	// アプリの終了
	protected override readonly	close = ()=> {this.#em.invoke('win_close', ); return false}

	// プレイデータをエクスポート
	protected override readonly	_export = ()=> {
		this.#em.invoke('zip', 
			this.$path_userdata +'storage/',
			this.$path_downloads + (this.arg.crypto ?'' :'no_crypto_')
			+ this.cfg.getNs() + getDateStr('-', '_', '') +'.spd',
		).then(()=> {
			if (CmnLib.debugLog) console.log('プレイデータをエクスポートしました');
			this.fire('sn:exported', new Event('click'));	// 末尾に処理
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

			const flush = this.flush;
			this.flush = ()=> {};
			this.#em.invoke('unzip', inp!, this.$path_userdata +'storage/');

			await this.#setStore();
			const o = await this.#em.invoke('Store_get', );
			this.data.sys = o.sys;
			this.data.mark = o.mark;
			this.data.kidoku = o.kidoku;
			this.flush = flush;
			this.flush();
			this.val.updateData(o);

			if (CmnLib.debugLog) console.log('プレイデータをインポートしました');
			this.fire('sn:imported', new Event('click'));
		})
		.catch(e=> console.log(`[import] err: ${e}`));

		return false;
	}

	// ＵＲＬを開く
	protected override readonly	navigate_to: ITag = hArg=> {
		const {url} = hArg;
		if (! url) throw '[navigate_to] urlは必須です';

		this.#em.invoke('navigate_to', url);

		return false;
	}
	// タイトル指定
	protected override titleSub(title: string) {this.#em.invoke('win_setTitle', title)}

	// 全画面状態切替
	protected override readonly	tglFlscr_sub = async ()=>
	this.#em.invoke('setSimpleFullScreen', 
		this.isFullScr = ! await this.#em.invoke('isSimpleFullScreen', )
	);

	// 更新チェック
	protected override readonly	update_check: ITag = hArg=> {
		const {url} = hArg;
		if (! url) throw '[update_check] urlは必須です';
		if (! url.endsWith('/')) throw '[update_check] urlの最後は/です';
		if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] url=${url}`, 'D');

		(async ()=> {
			let oIdx: any = {};
			let sYml = '';

			// バージョン更新チェック
			let netver = '';
			const o = await this.#fetch2web(url +'_index.json');
			if (o.ok) {
				if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] _index.jsonを取得しました`, 'D');
				oIdx = JSON.parse(o.txt);
				netver = oIdx.version;
			}
			else {
				const o = await this.#fetch2web(url +`latest${CmnLib.isMac ?'-mac' :''}.yml`);
				if (! o.ok) {
					if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] .ymlが見つかりません`);
					return;
				}
				if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] .ymlを取得しました`, 'D');
				sYml = o.txt;
				const mv = /version: (.+)/.exec(sYml);
				const mv2 = mv?.[1];
				if (! mv2) throw `[update_check] .yml に version が見つかりません`;
				netver = mv2;
			}

			const appver = this.#hInfo.getVersion;
			if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] 現在ver=${appver} 新規ver=${netver}`, 'D');
			if (netver === appver) {
				if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] バージョン更新なし`, 'I');
				return;
			}

			const mbo: MessageBoxOptions = {
				title	: 'アプリ更新',
				icon	: <any>(this.#hInfo.getAppPath +'/app/icon.png'),
				buttons	: ['OK', 'Cancel'],
				defaultId	: 0,
				cancelId	: 1,
				message	: `アプリ【${this.cfg.oCfg.book.title}】に更新があります。\nダウンロードしますか？`,
				detail	: `現在 NOW ver ${appver}\n新規 NEW ver ${netver}`,
			};
			const {response} = await this.#em.invoke('showMessageBox', mbo);
			if (response > 0) return;

			// アプリダウンロード
			if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] アプリダウンロード開始`, 'D');
			if (o.ok) {
				const key = this.#hInfo.platform +'_'+ this.#hInfo.arch;
			//	const key = this.#hInfo.platform +'_@'+ this.#hInfo.arch;
					// アーキテクチャがない場合の動作テスト
				const {cn, path} = oIdx[key];
				if (cn) await this.#dl_app(url, key +'-'+ cn, path);
				else {
					let d = '';
					const regOldSameKey = new RegExp('^'+ this.#hInfo.platform +'_');
					const a: (()=> Promise<void>)[] = Object.entries(<{[nm: string]: {
						path: string,
						cn	: string,
					}}>oIdx)
					.flatMap(([nm, {path, cn}])=> {
						if (! regOldSameKey.test(nm)) return [];
						d += '\n- '+ path;
						return ()=> this.#dl_app(url, nm +'-'+ cn, path);
					});

					mbo.message = `CPU = ${this.#hInfo.arch}\nに対応するファイルが見つかりません。同じOSのファイルをすべてダウンロードしますか？`;
					mbo.detail = a.length +' 個ファイルがあります'+ d;
					const {response} = await this.#em.invoke('showMessageBox', mbo);
					if (response > 0) return;

					await Promise.allSettled(a);
				}
			}
			else {
				const mp = /path: (.+)/.exec(sYml);
				if (! mp) throw `[update_check] path が見つかりません`;
				const [,path] = mp;
				if (! path) throw `[update_check] path が見つかりません.`;
				if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] path=${path}`, 'D');

				const mc = /sha512: (.+)/.exec(sYml);
				if (! mc) throw `[update_check] sha512 が見つかりません`;
				const [,sha] = mc;
				if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] sha=${sha}=`, 'D');

				// (id)-1.0.0-arm64.dmg
				const [,id, arch] = /(.+)(\.\w+)/.exec(path) ?? ['', '', ''];
				await this.#dl_app(url, id + '-' + this.#hInfo.arch + arch, path);
			}

			if (CmnLib.debugLog) DebugMng.myTrace(`アプリファイルを保存しました`, 'D');

			mbo.buttons!.pop();
			mbo.message = `アプリ【${this.cfg.oCfg.book.title}】の更新パッケージを\nダウンロードしました`;
//			mbo.message = `アプリ【${this.cfg.oCfg.book.title}】の更新パッケージを\nダウンロードしました`+ (isOk ?'' :'が、破損しています。\n開発元に連絡してください');
			this.#em.invoke('showMessageBox', mbo);
		})();

		return false;
	}
	async	#dl_app(url: string, urlApp: string, fn: string) {
		if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] アプリファイルDL試行... url=${url + urlApp}`, 'D');
		const o = await this.#fetchAb2web(url + urlApp);
		if (! o.ok) {
			if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] アプリファイルが見つかりません url=${url + fn}`);
			return;
		}

		const pathDL = this.#hInfo.downloads +'/'+ fn;
		if (CmnLib.debugLog) DebugMng.myTrace(`[update_check] pathDL=${pathDL}`, 'D');

		await this.writeFileSync(pathDL, new DataView(o.ab));
	}

	// アプリウインドウ設定
	protected override readonly	window: ITag = hArg=> {
		const x = argChk_Num(hArg, 'x', Number(this.val.getVal('sys:const.sn.nativeWindow.x', 0)));
		const y = argChk_Num(hArg, 'y', Number(this.val.getVal('sys:const.sn.nativeWindow.y', 0)));
		const w = argChk_Num(hArg, 'w', Number(this.val.getVal('sys:const.sn.nativeWindow.w', CmnLib.stageW)));
		const h = argChk_Num(hArg, 'h', Number(this.val.getVal('sys:const.sn.nativeWindow.h', CmnLib.stageH)));
		this.#em.invoke('window', argChk_Boolean(hArg, 'centering', false), x, y, CmnLib.stageW, CmnLib.stageH);
		this.val.setVal_Nochk('sys', 'const.sn.nativeWindow.x', x);
		this.val.setVal_Nochk('sys', 'const.sn.nativeWindow.y', y);
		this.val.setVal_Nochk('sys', 'const.sn.nativeWindow.w', w);
		this.val.setVal_Nochk('sys', 'const.sn.nativeWindow.h', h);
		this.flush();

		return false;
	}

	override capturePage(path: string, w: number, h: number, fnc: ()=> void) {
		this.#em.invoke('capturePage', path, w, h).then(()=> fnc());
	}

}
