/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// `@electron-toolkit/typed-ipc`（main側）の自前実装。実質1人メンテ（alex8088、
//	electron-toolkitモノレポ全体で213★）で該当パッケージのpushが約1年止まっているため
//	依存を切った（bluesnovelで先行実施済み、TODO.md参照）。ipcMain.on/handleをチャンネル名→
//	ペイロード型のマップでジェネリクスに包むだけの薄いラッパーなので、同パッケージの
//	dist/main.mjsをそのままTypeScript化した
import {ipcMain} from 'electron';
import type {IpcMainEvent, IpcMainInvokeEvent, WebContents} from 'electron/main';

type IpcListenEventMap = {[key: string]: unknown[]};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IpcHandleEventMap = {[key: string]: (...args: any[])=> any};
type IpcEventMap = IpcListenEventMap | IpcHandleEventMap;
type ExtractArgs<T> = T extends IpcListenEventMap ? T : never;
type ExtractHandler<T> = T extends IpcHandleEventMap ? T : never;

export class IpcListener<T extends IpcEventMap> {
	#listeners: string[] = [];
	#handlers: string[] = [];

	on<E extends keyof ExtractArgs<T>>(
		channel: Extract<E, string>,
		listener: (e: IpcMainEvent, ...args: ExtractArgs<T>[E])=> void | Promise<void>,
	) {
		this.#listeners.push(channel);
		ipcMain.on(channel, listener);
	}

	handle<E extends keyof ExtractHandler<T>>(
		channel: Extract<E, string>,
		listener: (e: IpcMainInvokeEvent, ...args: Parameters<ExtractHandler<T>[E]>)=>
			ReturnType<ExtractHandler<T>[E]> | Promise<ReturnType<ExtractHandler<T>[E]>>,
	) {
		this.#handlers.push(channel);
		ipcMain.handle(channel, listener);
	}

	// 元パッケージ同様、生成したハンドラ/リスナを一括解除する口だけ用意（本エンジンも主処理の
	//	BrowserWindowが1つだけで寿命もアプリと同じなので、今のところ呼び出し元は無い）
	dispose() {
		this.#listeners.forEach(c=> ipcMain.removeAllListeners(c));
		this.#listeners = [];
		this.#handlers.forEach(c=> ipcMain.removeHandler(c));
		this.#handlers = [];
	}
}

export class IpcEmitter<T extends IpcListenEventMap> {
	send<E extends keyof T>(sender: WebContents, channel: Extract<E, string>, ...args: T[E]) {
		sender.send(channel, ...args);
	}
}
