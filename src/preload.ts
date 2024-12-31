/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2021-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {T_CFG} from './sn/ConfigBase';

import {type MessageBoxOptions, type MessageBoxReturnValue} from 'electron';

export	type	TAG_WINDOW	= {
	c	: boolean;
	x	: number;
	y	: number;
	w	: number;
	h	: number;
};

export	type	SAVE_WIN_INF	= TAG_WINDOW & {
	scrw: number;
	scrh: number;
};


export	type	T_IpcEvents	= {
	openDevTools	: ()=> void;

	getInfo		: ()=> HINFO,
	inited		: (oCfg: T_CFG, tagW: TAG_WINDOW)=> void;

	existsSync	: (path: string)=> boolean;
	copySync	: (path_from: string, path_to: string)=> void;
	removeSync	: (path: string)=> void;
	ensureFileSync	: (path: string)=> void;
	readFileSync: (path: string)=> string;
	writeFileSync	: (path: string, data: string | NodeJS.ArrayBufferView, o?: object)=> void;
	appendFile		: (path: string, data: string)=> void;
	outputFile		: (path: string, data: string)=> void;

	window	: (centering: boolean, x: number, y: number, w: number, h: number)=> void;
	isSimpleFullScreen	: ()=> boolean;
	setSimpleFullScreen	: (b: boolean)=> void;
	win_close		: ()=> void;
	win_setTitle	: (title: string)=> void;

	showMessageBox	: (o: MessageBoxOptions)=> MessageBoxReturnValue;

	capturePage	: (fn: string, w: number, h: number)=> void;
	navigate_to	: (url: string)=> void;

	Store	: (o: object)=> void;
	flush	: (o: object)=> void;
	Store_isEmpty	: ()=> boolean;
	Store_get		: ()=> any;

	zip		: (inp: string, out: string)=> void;
	unzip	: (inp: string, out: string)=> void;
};

	export	type	HINFO	= {
		getAppPath	: string;
		isPackaged	: boolean;
		downloads	: string;
		userData	: string;
		getVersion	: string;
		env			: {[name: string]: any};
		platform	: string;
		arch		: string;
	}

//Renderer ipc events
export	type	T_IpcRendererEvent = {
	log: [any];

	save_win_inf: [SAVE_WIN_INF];
	shutdown	: [];
	fire		: [string];
}
