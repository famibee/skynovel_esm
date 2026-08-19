/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

export type T_SWIPE_DIR = 'swipeleft' | 'swiperight' | 'swipeup' | 'swipedown';

// bluesnovel ../bluesnovel/src/ts/Swipe.ts の移植（tinygesture依存の削減、TODO.md）。
//	判定式の由来（tinygesture既定のthreshold＝辺の15%・最小25pxによる距離のみの判定へ
//	整理した経緯）はそちらのコメント参照。w/hは呼び出し側でキャンバスの表示サイズ
//	（getBoundingClientRect()）を渡す想定
export function detectSwipe(dx: number, dy: number, w: number, h: number): T_SWIPE_DIR | undefined {
	const absX = Math.abs(dx);
	const absY = Math.abs(dy);
	const thX = Math.max(25, Math.floor(0.15 *w));
	const thY = Math.max(25, Math.floor(0.15 *h));

	if (absX > thX && absX >= absY) return dx < 0 ?'swipeleft' :'swiperight';
	if (absY > thY && absY > absX) return dy < 0 ?'swipeup' :'swipedown';
	return undefined;
}
