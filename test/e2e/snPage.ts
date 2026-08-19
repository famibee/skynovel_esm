/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// E2E共通ヘルパ。
//	bluesnovel と違い skynovel_esm には「唯一の真実」となるストアが無く、状態は各クラスの
//	私有フィールドに散っている。そこで検証は
//		・文字：TxtStage が canvas と重ねて置く <span class="sn_tx">（本家 TxtStage.ts:130）
//		・リソース：fixture が仕込んだ計装 window.__probe（test/e2e/app/probe.ts）
//	の2つに寄せる。PixiJS が描くキャンバスの中身は見ない。

import {expect, type Page} from '@playwright/test';
import type {T_TARGET} from './app/probe';

export type T_PRJ = 'leak' | 'crypto' | 'sound' | 'tsy' | 'gesture';

// 文字レイヤ本体。TxtStage は canvas の親（＝body）へ直に足すので、位置ではなくクラスで拾う。
//	表裏ページぶん存在し、裏は空なので「中身のある物」を採る
const SEL_TX = 'span.sn_tx';


// テスト用ページを開き、起動が済むまで待つ
export async function gotoSn(page: Page, prj: T_PRJ = 'leak') {
	await page.goto(`/test/e2e/app/index.html?prj=${prj}`);
	// 計装は src/ より先に評価される。ここが出来ていなければ import 順が壊れている
	await page.waitForFunction(()=> Boolean((<any>globalThis).__probe), undefined, {timeout: 30_000});
	// 文字が出るまで＝Main の生成とシナリオの1停止点までが済むまで
	await page.waitForFunction(
		sel=> Array.from(document.querySelectorAll(sel)).some(e=> (e.textContent ?? '') !== ''),
		SEL_TX, {timeout: 30_000},
	);
	await waitStop(page);
}

// [l]/[p]の停止点に着くまで待つ。
//	演出中のクリックは「読み進め」ではなく「瞬時完了」として消費されるので
//	（本家 Reading）、クリックの前には必ずこれを挟む
export async function waitStop(page: Page) {
	await page.waitForFunction(
		()=> ((<any>globalThis).__sn?.isWait() as boolean | undefined) === true,
		undefined, {timeout: 30_000},
	);
	await raf2(page);
}

// Reactのような「描画が追いついたか」の指標が無いので、rAF2回ぶんで
//	PixiJS の Ticker とブラウザの描画を確実に跨ぐ
export async function raf2(page: Page) {
	await page.evaluate(()=> new Promise<void>(re=> {
		requestAnimationFrame(()=> requestAnimationFrame(()=> {re()}));
	}));
}

// 今表示されている本文（中身のある文字レイヤの textContent）
export async function mesStr(page: Page): Promise<string> {
	return page.evaluate(sel=> {
		for (const e of Array.from(document.querySelectorAll(sel))) {
			// 1文字＝1<span class="sn_ch">だが、ルビが無くても<ruby><rt>（中身はEM SPACE）が
			// 付き、末尾にも<span class="sn_ch_last">が入る。どちらも本文ではないので外す
			const c = <HTMLElement>e.cloneNode(true);
			c.querySelectorAll('rt, .sn_ch_last').forEach(v=> {v.remove()});
			const s = (c.textContent ?? '').trim();
			if (s) return s;
		}
		return '';
	}, SEL_TX);
}

// 本文に s が現れるまで待つ（＝そこまで進んだ事の確認）。
//	改ページしても直前のページの文字が同じ span に残るため、完全一致では見ない。
//	本文そのものの検証はこのE2Eの目的ではなく、進行の目印として使うだけ
export async function waitMes(page: Page, s: string) {
	await expect.poll(()=> mesStr(page), {timeout: 15_000}).toContain(s);
}

// 読み進め。キャンバスのクリックで次へ進む。
//	稼働中のキャンバスは #skynovel ではなく #skynovel_act（本家 Main.ts:88）。
//	#skynovel は破棄時に差し戻すクローンなので、動いている間は存在しない
export async function clickNext(page: Page) {
	await waitStop(page);
	await page.locator('#skynovel_act').click({position: {x: 10, y: 10}});
}

// waitStop()を挟まない生のクリック。[wait_tsy]/[wt]中は isWait() が立たないため
//	clickNext()は使えない。演出打ち切り（canskip）の検査専用
export async function clickDuring(page: Page) {
	await page.locator('#skynovel_act').click({position: {x: 10, y: 10}});
}

// Main を破棄して作り直す（SysBase.run）。index.html の [data-reload] が繋がれている。
//	CmnTween の rAF ループや gamepad が多重化しないかを見るための操作
export async function reloadMain(page: Page) {
	const before = await mesStr(page);
	await page.locator('#reload').click();
	// 作り直しが済んで初期表示に戻るまで待つ。元が初期表示のままなら
	// 「変わらない」ので、テキストではなく canvas の入れ替わりを見る
	await page.waitForFunction(
		([sel, prev])=> {
			const a = Array.from(document.querySelectorAll(sel!));
			return a.some(e=> (e.textContent ?? '') !== '') && a.length > 0 && prev !== null;
		},
		[SEL_TX, before] as const, {timeout: 30_000},
	);
	await raf2(page);
}


// ---- 計装（window.__probe）の読み出し ---------------------------------------

// 対象に張られたままのリスナ数。type を渡すとその種類だけ。
//	`once:true` は数えない（probe.ts 冒頭の注記を参照）
export async function countLsn(page: Page, t: T_TARGET, type?: string): Promise<number> {
	return page.evaluate(
		([t, type])=> (<any>globalThis).__probe.countLsn(t, type) as number,
		[t, type] as const,
	);
}

// 予約済みで未発火の requestAnimationFrame 件数。
//	自己再帰するループは常に1件を保つので、増えたら多重化している
export async function rafPending(page: Page): Promise<number> {
	return page.evaluate(()=> (<any>globalThis).__probe.rafPending() as number);
}

// revoke されていない Blob URL の件数
export async function blobLive(page: Page): Promise<number> {
	return page.evaluate(()=> (<any>globalThis).__probe.blobLive() as number);
}

// SndBuf.live の件数。unload()でしか減らないので、解放漏れがそのまま出る
export async function sndLive(page: Page): Promise<number> {
	return page.evaluate(()=> (<any>globalThis).__probe.sndLive() as number);
}

// CmnTween の実行中トゥイーン登録数（[tsy]/[trans]共通）。destroy()（＝Main作り直し）
//	後もこれが残っていれば、CmnTween側の登録漏れ
export async function tsyLive(page: Page): Promise<number> {
	return page.evaluate(()=> (<any>globalThis).__probe.tsyLive() as number);
}


// ---- レイヤ（[tsy]で動く属性）用 -----------------------------------------------

// [tsy]で動くレイヤ属性を1つ読む。組み込み変数 const.sn.lay.（レイヤ名）.（fore|back）.（prop）
//	（tmpスコープ、Pages.ts が defTmp で定義）を経由する。演出中の途中経過もそのまま読める
export async function layNum(
	page: Page, nm: string,
	prop: 'alpha' | 'width' | 'height' | 'x' | 'y',
	side: 'fore' | 'back' = 'fore',
): Promise<number | undefined> {
	return <number | undefined>await val(page, `tmp:const.sn.lay.${nm}.${side}.${prop}`);
}


// ---- 音声（prj_sound）用 -----------------------------------------------------

// 生きている SndBuf の設定値。src はファイル名だけ、startMs/endMs/retMsはミリ秒で実尺解決済み
export type T_SNDBUF = {
	src		: string;
	loop	: boolean;
	speed	: number;
	pan		: number;
	volume	: number;
	duration: number;
	playing	: boolean;
	startMs	: number;
	endMs	: number;
	retMs	: number;
};

// シナリオの任意ラベルへ飛び、そこが [s] で止まるまで待つ。
//	元のギャラリーがボタンで選ばせていた各項目を、テストから直接呼ぶための入口
export async function jump(page: Page, label: string) {
	await page.evaluate(l=> {(<any>globalThis).__sn.jump(l)}, label);
	await waitMes(page, `OK${label.slice(1)}`);	// 各項目は OK+ラベル名 を出して [s] で止まる
}

// ラベルへ飛び、**別の目印**が出るまで待つ。[load]のように「飛んだ先とは違う場所で
//	止まる」項目用（しおりは [record_place]した位置へ戻るので、保存側の目印が出る）
export async function jumpTo(page: Page, label: string, mark: string) {
	await page.evaluate(l=> {(<any>globalThis).__sn.jump(l)}, label);
	await waitMes(page, mark);
}

// 組み込み変数を読む（'save:const.sn.sound.SE.fn' のようにスコープ付きで）
export async function val(page: Page, nm: string): Promise<unknown> {
	return page.evaluate(n=> (<any>globalThis).__sn.val(n) as unknown, nm);
}

// 生きている SndBuf 一覧
export async function sndBufList(page: Page): Promise<T_SNDBUF[]> {
	return page.evaluate(()=> (<any>globalThis).__sn.sndBufs() as T_SNDBUF[]);
}

// SndCtxのグローバル音量（sys:sn.sound.global_volume が反映される）
export async function glbVolume(page: Page): Promise<number> {
	return page.evaluate(()=> (<any>globalThis).__sn.glbVolume() as number);
}
