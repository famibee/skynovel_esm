/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// web版のDevTools検知。devtools-detect の代替自前実装（移植元 bluesnovel
// src/ts/DevToolsGuard.ts、原理は同じ）。
// 削除理由: 2026-05-12 に作者(sindresorhus)がリポジトリをアーカイブ、README冒頭に
// 「多くの欠陥がある」と作者自身が明記しているため。
// 原理は同ライブラリと同じ「window外寸と内寸の差」ヒューリスティック（しきい値160px、
// 500ms間隔 + resize。DevToolsをドッキング表示すると内寸だけ縮む。別ウインドウへの
// 切り離しやモバイルでは検知できない等、この方式自体の限界は変わらない）。
// 検知は debug.devtool の設定に関わらず常時稼働（devtools-detect も同様だった）。
// 呼び出し側（SysWeb）は devtools-detect の 'devtoolschange' イベント購読と同じ形で
// `elc.add(devToolsGuard, 'open', ..., {once: true, passive: true})` を使う
const THRESHOLD = 160;	// devtools-detectと同じ既定しきい値(px)
const CHECK_MSEC = 500;

export const devToolsGuard = new EventTarget();

let opened = false;
function check() {
	const isOpen = globalThis.outerWidth - globalThis.innerWidth > THRESHOLD
		|| globalThis.outerHeight - globalThis.innerHeight > THRESHOLD;
	if (isOpen === opened) return;

	opened = isOpen;
	if (isOpen) devToolsGuard.dispatchEvent(new Event('open'));
}
globalThis.addEventListener('resize', check, {passive: true});
setInterval(check, CHECK_MSEC);
