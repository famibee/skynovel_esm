/* ***** BEGIN LICENSE BLOCK *****
Copyright (c) 2018-2026 Famibee (famibee.blog38.fc2.com)

This software is released under the MIT License.
http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {parseHintOpt, flipPlace, calcPos, clampPos, calcArrowOffset} from '../src/sn/HintPos';


it('parseHintOpt_undefined', ()=> {
	expect(parseHintOpt(undefined)).toEqual({placement: 'bottom', skid: 0, dist: 0});
});
it('parseHintOpt_placementOnly', ()=> {
	expect(parseHintOpt('{"placement":"left"}')).toEqual({placement: 'left', skid: 0, dist: 0});
});
it('parseHintOpt_placementVariation', ()=> {
	// 'bottom-start'のような修飾付きも本体だけ拾う
	expect(parseHintOpt('{"placement":"bottom-start"}')).toEqual({placement: 'bottom', skid: 0, dist: 0});
});
it('parseHintOpt_invalidPlacement', ()=> {
	expect(parseHintOpt('{"placement":"center"}')).toEqual({placement: 'bottom', skid: 0, dist: 0});
});
it('parseHintOpt_offset', ()=> {
	// ../tmp_esm_uc/doc/prj/script/sub.sn で実際に使われている形
	expect(parseHintOpt('{"placement":"left","modifiers":[{"name":"offset","options":{"offset":[0,30]}}]}'))
	.toEqual({placement: 'left', skid: 0, dist: 30});
});
it('parseHintOpt_offsetSkid', ()=> {
	expect(parseHintOpt('{"placement":"right","modifiers":[{"name":"offset","options":{"offset":[0,-90]}}]}'))
	.toEqual({placement: 'right', skid: 0, dist: -90});
});
it('parseHintOpt_invalidJson', ()=> {
	expect(()=> parseHintOpt('{')).toThrow(SyntaxError);
});


it('flipPlace_fits', ()=> {
	const trg = {x: 100, y: 100, width: 50, height: 20};
	const box = {width: 40, height: 30};
	const vp = {width: 800, height: 600};
	expect(flipPlace(trg, box, 'bottom', 0, vp)).toBe('bottom');
});
it('flipPlace_overflowBottom', ()=> {
	// 画面下端ギリギリのtargetにbottom配置→上に反転
	const trg = {x: 100, y: 580, width: 50, height: 20};
	const box = {width: 40, height: 30};
	const vp = {width: 800, height: 600};
	expect(flipPlace(trg, box, 'bottom', 0, vp)).toBe('top');
});
it('flipPlace_bothOverflow', ()=> {
	// 上下どちらもはみ出すなら元のまま
	const trg = {x: 100, y: 5, width: 50, height: 20};
	const box = {width: 40, height: 1000};
	const vp = {width: 800, height: 600};
	expect(flipPlace(trg, box, 'bottom', 0, vp)).toBe('bottom');
});


it('calcPos_bottom', ()=> {
	const trg = {x: 100, y: 100, width: 50, height: 20};
	const box = {width: 40, height: 30};
	expect(calcPos(trg, box, 'bottom', 0, 0)).toEqual({left: 105, top: 120});
});
it('calcPos_left_withDist', ()=> {
	const trg = {x: 100, y: 100, width: 50, height: 20};
	const box = {width: 40, height: 30};
	expect(calcPos(trg, box, 'left', 0, 10)).toEqual({left: 50, top: 95});
});
it('calcPos_skid', ()=> {
	const trg = {x: 100, y: 100, width: 50, height: 20};
	const box = {width: 40, height: 30};
	expect(calcPos(trg, box, 'bottom', 5, 0)).toEqual({left: 110, top: 120});
});


it('clampPos_within', ()=> {
	const vp = {width: 800, height: 600};
	expect(clampPos({left: 100, top: 100}, {width: 40, height: 30}, vp)).toEqual({left: 100, top: 100});
});
it('clampPos_negative', ()=> {
	const vp = {width: 800, height: 600};
	expect(clampPos({left: -10, top: -5}, {width: 40, height: 30}, vp)).toEqual({left: 0, top: 0});
});
it('clampPos_overflow', ()=> {
	const vp = {width: 800, height: 600};
	expect(clampPos({left: 790, top: 590}, {width: 40, height: 30}, vp)).toEqual({left: 760, top: 570});
});


it('calcArrowOffset_center', ()=> {
	// targetの中心(125)が箱(left=105,width=40)の中央に来る
	const trg = {x: 100, y: 100, width: 50, height: 20};
	const box = {width: 40, height: 30};
	const pos = {left: 105, top: 120};
	expect(calcArrowOffset(trg, box, pos, 'bottom')).toBe(16);
});
it('calcArrowOffset_clamp', ()=> {
	// targetが箱より大きくずれて外に出る場合は0〜(箱幅-矢印幅)にクランプ
	const trg = {x: 0, y: 0, width: 10, height: 10};
	const box = {width: 40, height: 30};
	const pos = {left: 100, top: 100};
	expect(calcArrowOffset(trg, box, pos, 'bottom')).toBe(0);
});
