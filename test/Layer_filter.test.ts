/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2019-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {GlobalRegistrator} from '@happy-dom/global-registrator';
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (! globalThis.document) GlobalRegistrator.register();

import {Layer} from '../src/sn/Layer';
import type {TArg} from '../src/sn/Grammar';

import {filters} from 'pixi.js';
const {ColorMatrixFilter} = filters;

// ColorMatrixFilter 系フィルタの工場化（Layer.#cmf）が、直接 pixi のメソッドを
// 呼んだ場合と同じ行列・同じ既定値を生むことを保証する（/simplify 本家版・第2弾）

const mtxOf = (build: () => InstanceType<typeof ColorMatrixFilter>) =>
	Array.from(build().matrix);

it.each<[string, TArg, () => InstanceType<typeof ColorMatrixFilter>]>([
	['black_and_white', {}, ()=> {const f = new ColorMatrixFilter; f.blackAndWhite(false); return f}],
	['brightness', {}, ()=> {const f = new ColorMatrixFilter; f.brightness(0.5, false); return f}],
	['brightness', {b: '0.8', multiply: 'true'} as unknown as TArg, ()=> {const f = new ColorMatrixFilter; f.brightness(0.8, true); return f}],
	['browni', {}, ()=> {const f = new ColorMatrixFilter; f.browni(true); return f}],
	['color_tone', {}, ()=> {const f = new ColorMatrixFilter; f.colorTone(0.5, 0.5, 0xFFE580, 0xFFE580, false); return f}],
	['contrast', {}, ()=> {const f = new ColorMatrixFilter; f.contrast(0.5, false); return f}],
	['grayscale', {}, ()=> {const f = new ColorMatrixFilter; f.grayscale(0.5, false); return f}],
	['hue', {}, ()=> {const f = new ColorMatrixFilter; f.hue(90, false); return f}],
	['kodachrome', {}, ()=> {const f = new ColorMatrixFilter; f.kodachrome(true); return f}],
	['lsd', {}, ()=> {const f = new ColorMatrixFilter; f.lsd(false); return f}],
	['negative', {}, ()=> {const f = new ColorMatrixFilter; f.negative(false); return f}],
	['night', {}, ()=> {const f = new ColorMatrixFilter; f.night(0.5, false); return f}],
	['polaroid', {}, ()=> {const f = new ColorMatrixFilter; f.polaroid(false); return f}],
	['predator', {}, ()=> {const f = new ColorMatrixFilter; f.predator(0.5, false); return f}],
	['saturate', {}, ()=> {const f = new ColorMatrixFilter; f.saturate(0.5, false); return f}],
	['sepia', {}, ()=> {const f = new ColorMatrixFilter; f.sepia(false); return f}],
	['technicolor', {}, ()=> {const f = new ColorMatrixFilter; f.technicolor(true); return f}],
	['tint', {}, ()=> {const f = new ColorMatrixFilter; f.tint(0x888888, false); return f}],
	['to_bgr', {}, ()=> {const f = new ColorMatrixFilter; f.toBGR(false); return f}],
	['vintage', {}, ()=> {const f = new ColorMatrixFilter; f.vintage(true); return f}],
])('filter %s（工場化が直接呼びと一致）', (filter, extra, expected)=> {
	const f = Layer.bldFilters({filter, ...extra});
	expect(f).toBeInstanceOf(ColorMatrixFilter);
	expect(Array.from((f as InstanceType<typeof ColorMatrixFilter>).matrix))
		.toEqual(mtxOf(expected));
});
