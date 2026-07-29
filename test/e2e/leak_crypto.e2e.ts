/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 暗号化アセット（sys.arg.crypto）のリソース検査。
//	シナリオと資材は test/e2e/app/mkPrjCrypto.mjs が生成する（鍵はE2E専用の使い捨て）。
//	復号は本家に無く snsys_pre プラグインが供給するので、fixture 側に最小実装を置いている。
//
//	この経路でしか通らないもの＝復号結果の Blob URL。revoke されるまで解放されないので、
//	`__probe.blobLive()` がそのまま生存数になる。

import {expect, test} from '@playwright/test';
import {blobLive, clickNext, gotoSn, waitMes} from './snPage';

test('復号で作った Blob URL が Main の破棄で解放される', async ({page})=> {
	await gotoSn(page, 'crypto');
	expect(await blobLive(page)).toBe(0);

	// 画像：SpritesMng が Texture 化の直後に revoke する（SpritesMng.ts:248）ので増えない
	await clickNext(page);
	await waitMes(page, 'えいぞう。');
	await expect.poll(()=> blobLive(page)).toBe(0);

	// 動画：再生のため HTMLVideoElement が掴んでいる。ここは残るのが正しい
	await clickNext(page);
	await waitMes(page, 'どうが。');
	await expect.poll(()=> blobLive(page)).toBe(1);

	// 音声（.bin 経路）：[playbgm]→[stopbgm]。SndBuf.unload()が revoke するので増えない。
	//	直す前は onplay でしか revoke せず、停止や失敗で取り残されていた
	await clickNext(page);
	await waitMes(page, 'おと。');
	await expect.poll(()=> blobLive(page)).toBe(1);

	// フレーム内画像：FrameMng.#hEncImgOUrl に溜まる（画面遷移で再利用するキャッシュ）
	await clickNext(page);
	await waitMes(page, 'ふれーむ。');
	await expect.poll(()=> blobLive(page)).toBe(2);

	// Main の作り直し。SpritesMng.destroy()が動画を、FrameMng.destroy()がキャッシュを解放する。
	//	直す前はどちらも static のまま残り、作り直しても Blob が消えなかった
	await page.locator('#reload').click();
	await waitMes(page, 'はじめ。');
	await expect.poll(()=> blobLive(page), {timeout: 10_000}).toBe(0);
});
