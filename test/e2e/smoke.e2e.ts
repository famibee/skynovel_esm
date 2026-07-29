/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 土台の疎通確認。fixture が起動し、計装（__probe）が効いている事だけを見る。
//	ここが落ちたら他のE2Eを疑う前にこちらを直す

import {expect, test} from '@playwright/test';
import {countLsn, gotoSn, howls, rafPending, waitMes} from './snPage';

test('シナリオが起動して1行目が表示される', async ({page})=> {
	await gotoSn(page);
	await waitMes(page, 'はじめ。');
});

test('計装（__probe）が生きている', async ({page})=> {
	await gotoSn(page);

	// PixiJS の Ticker が回っているので、必ず1件以上は予約されている
	expect(await rafPending(page)).toBeGreaterThan(0);
	// document には EventMng がキー操作を張っている
	expect(await countLsn(page, {sel: 'document'})).toBeGreaterThan(0);
	// howler は読み込まれているが、まだ何も再生していない
	expect(await howls(page)).toBe(0);
});
