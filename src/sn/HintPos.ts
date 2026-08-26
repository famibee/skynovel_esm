/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// ツールチップ（[button hint=…]・[link hint=…]）の位置計算。@popperjs/core の代替自前実装。
// EventMng.ts が使っていたのは createPopper() の既定モディファイア（flip・offset・
// preventOverflow・arrow）のうち flip と offset だけを modifiers 指定で上書きする形だが、
// @popperjs/core の createPopper はこれらを内蔵しているため、明示的に import しなくても
// 名前指定だけで効いていた（＝ arrow・preventOverflow も常に有効）。
// 実サンプル（../tmp_esm_uc/doc/prj/script/sub.sn）で
//   hint_opt = '{"placement":"left","modifiers":[{"name":"offset","options":{"offset":[0,30]}}]}'
// のような popper 形式の JSON がそのまま渡ってくるため、popper と同じ形で解釈する
// （`modifiers`配列は「該当名のモディファイアの options を上書き」という popper の意味論を
// 汲み、名前ごとの最小限のオプション読み取りに留める。任意モディファイアの完全互換は狙わない）

export type T_PLACE = 'top' | 'bottom' | 'left' | 'right';
export type T_RECT = {x: number; y: number; width: number; height: number};
export type T_SIZE = {width: number; height: number};
export type T_POS  = {left: number; top: number};

const A_PLACE: readonly T_PLACE[] = ['top', 'bottom', 'left', 'right'];

export type T_HINT_OPT = {
	placement	: T_PLACE;
	skid		: number;	// 交差軸方向のずれ（popperのoffset[0]）
	dist		: number;	// 主軸方向の追加ギャップ（popperのoffset[1]）
};
const DEF_HINT_OPT: T_HINT_OPT = {placement: 'bottom', skid: 0, dist: 0};
	// placementの既定値'bottom'は本家 EventMng.ts の #oHintOpt と同じ。
	// offsetの既定値[0,0]はpopperの既定と同じ（＝箱と対象の間の隙間は0。矢印がCSSの
	// -4pxで箱からはみ出す形で対象に接する見た目になる）

// [button hint_opt=…]（popperのOptions JSON）から placement / offset を取り出す
export function parseHintOpt(json: string | undefined): T_HINT_OPT {
	if (! json) return DEF_HINT_OPT;

	const o = <{
		placement?: string;
		modifiers?: {name: string; options?: {offset?: [number, number]}}[];
	}>JSON.parse(json);

	// 'bottom-start'のような修飾付きも本体だけ拾う（popperのvariation指定は非対応）
	const p = <T_PLACE>(o.placement?.split('-')[0] ?? '');
	const placement = A_PLACE.includes(p) ? p : DEF_HINT_OPT.placement;

	const offMod = o.modifiers?.find(m=> m.name === 'offset');
	const [skid, dist] = offMod?.options?.offset ?? [DEF_HINT_OPT.skid, DEF_HINT_OPT.dist];

	return {placement, skid, dist};
}


const OPPOSITE: {readonly [K in T_PLACE]: T_PLACE} = {top: 'bottom', bottom: 'top', left: 'right', right: 'left'};

// 主軸（placement方向）にスペースが無ければ反対側へ切り替える（popperのflipモディファイア相当。
// 本家は fallbackPlacements にカスタム値['top','bottom']を指定していたが、hint_opt が
// modifiers を伴う（＝実運用は必ずこの形）と popper 側ではその指定ごと上書きされて既定の
// 「反対側」挙動に戻るため、常に反対側のみを試す単純化で実運用と一致する）
export function flipPlace(trg: T_RECT, box: T_SIZE, place: T_PLACE, dist: number, vp: T_SIZE): T_PLACE {
	const fits = (p: T_PLACE): boolean => {
		switch (p) {
			case 'top'   : return trg.y - dist - box.height >= 0;
			case 'bottom': return trg.y + trg.height + dist + box.height <= vp.height;
			case 'left'  : return trg.x - dist - box.width >= 0;
			case 'right' : return trg.x + trg.width + dist + box.width <= vp.width;
		}
	};
	if (fits(place)) return place;

	const opp = OPPOSITE[place];
	return fits(opp) ?opp :place;	// どちらもはみ出すなら元の向きのまま（clampPosが画面内に収める）
}

// 吹き出し本体の位置（主軸=dist、交差軸=skid）
export function calcPos(trg: T_RECT, box: T_SIZE, place: T_PLACE, skid: number, dist: number): T_POS {
	switch (place) {
		case 'bottom': return {left: trg.x + (trg.width -box.width) /2 +skid,	top: trg.y +trg.height +dist};
		case 'top'   : return {left: trg.x + (trg.width -box.width) /2 +skid,	top: trg.y -box.height -dist};
		case 'right' : return {left: trg.x +trg.width +dist,	top: trg.y + (trg.height -box.height) /2 +skid};
		case 'left'  : return {left: trg.x -box.width -dist,	top: trg.y + (trg.height -box.height) /2 +skid};
	}
}

// 画面内へ収める（popperのpreventOverflowモディファイア相当）
export function clampPos(pos: T_POS, box: T_SIZE, vp: T_SIZE): T_POS {
	return {
		left: Math.min(Math.max(pos.left, 0), Math.max(0, vp.width -box.width)),
		top : Math.min(Math.max(pos.top,  0), Math.max(0, vp.height -box.height)),
	};
}

// 矢印（.sn_hint_ar）の交差軸オフセット（popperのarrowモディファイア相当。paddingは既定の0のまま）。
// clampPos後の最終的な箱位置(boxPos)を渡すこと（popper同様、画面端でのクランプ後も
// 矢印は対象を指し続けるよう箱の内側で再計算される）
export function calcArrowOffset(trg: T_RECT, box: T_SIZE, boxPos: T_POS, place: T_PLACE, arrowSize = 8): number {
	const isX = place === 'top' || place === 'bottom';
	const trgCenter	= isX ?trg.x +trg.width /2 :trg.y +trg.height /2;
	const boxStart	= isX ?boxPos.left :boxPos.top;
	const boxLen	= isX ?box.width :box.height;

	return Math.min(Math.max(trgCenter -boxStart -arrowSize /2, 0), Math.max(0, boxLen -arrowSize));
}
