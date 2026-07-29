/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 暗号化アセット用フィクスチャ（test/e2e/app/prj_crypto/）を作り直す。
//	`node test/e2e/app/mkPrjCrypto.mjs`
//
//	【実プロジェクトの鍵と資材は絶対に持ち込まない】
//	tmp_esm_uc の pass.json と doc_crypto/ をそのまま置くと、公開リポジトリに
//	製品の復号鍵と実アセットを載せることになる。ここでは**使い捨ての鍵**を固定値で持ち、
//	アセットも自前生成（PNGはバイト列を直接、MP4はffmpegの黒画面1秒）にする。
//
//	.bin の構造（tmp_esm_uc の実ファイルで確認済。SKYNovel拡張機能が作る形式）：
//		[0,4)      uint32 LE = 暗号ブロック長 N
//		[4,4+N)    AES-GCM 暗号文 → 復号すると [0]=予備 [1]=ext_num [2..]=本体の先頭
//		[4+N, )    本体の残り（平文のまま）
//	復号側は本家 SysBase.decAB() と snsys_pre プラグイン。ext_num は SysBase.ts:527 の表

import {webcrypto as crypto} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const DIR = fileURLToPath(new URL('./prj_crypto/', import.meta.url));

// 使い捨ての鍵。E2E専用で、何の資産も守っていない
const hPass = {
	pass	: '00000000-0000-4000-8000-000000000000',
	salt	: 'a1'.repeat(64),
	iv		: 'b2'.repeat(64),
	keySize	: 16,
	ite		: 100,		// 実物は580。テストは速い方がよい
	stk		: 'c3'.repeat(64),
};

const hex2ab = h=> new Uint8Array(h.match(/../g).map(x=> parseInt(x, 16))).buffer;

async function mkKey() {
	const base = await crypto.subtle.importKey('raw',
		await crypto.subtle.digest('SHA-512', new TextEncoder().encode(hPass.pass)),
		'PBKDF2', false, ['deriveKey']);
	return crypto.subtle.deriveKey(
		{name: 'PBKDF2', hash: 'SHA-512', iterations: hPass.ite, salt: hex2ab(hPass.salt)},
		base, {name: 'AES-GCM', length: 256}, false, ['encrypt', 'decrypt']);
}

// 本体の先頭 headLen バイトだけを暗号化して .bin に組む
async function enc(key, buf, ext_num, headLen = 4096) {
	const head = buf.subarray(0, Math.min(headLen, buf.length));
	const tail = buf.subarray(head.length);
	const plain = Buffer.concat([Buffer.from([0, ext_num]), head]);
	const ct = Buffer.from(await crypto.subtle.encrypt(
		{name: 'AES-GCM', iv: hex2ab(hPass.iv)}, key, plain));
	const len = Buffer.alloc(4);
	len.writeUInt32LE(ct.length, 0);
	return Buffer.concat([len, ct, tail]);
}

// 最小のPNG（1x1・赤）。画像ライブラリを足さずに済ませる
function mkPng() {
	const crcTbl = [...Array(256)].map((_, n)=> {
		let c = n;
		for (let k=0; k<8; ++k) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
		return c >>> 0;
	});
	const crc = b=> {
		let c = 0xFFFFFFFF;
		for (const v of b) c = crcTbl[(c ^ v) & 0xFF] ^ (c >>> 8);
		return (c ^ 0xFFFFFFFF) >>> 0;
	};
	const chunk = (type, data)=> {
		const t = Buffer.from(type, 'ascii');
		const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
		const crcBuf = Buffer.alloc(4); crcBuf.writeUInt32BE(crc(Buffer.concat([t, data])), 0);
		return Buffer.concat([len, t, data, crcBuf]);
	};
	const ihdr = Buffer.alloc(13);
	ihdr.writeUInt32BE(1, 0); ihdr.writeUInt32BE(1, 4);
	ihdr[8] = 8; ihdr[9] = 2;	// 8bit truecolor
	const idat = Buffer.from([0x78, 0x01, 0x01, 0x04, 0x00, 0xFB, 0xFF,
		0x00, 0xFF, 0x00, 0x00, 0x01, 0x03, 0x00, 0xFF]);	// zlib(no compression) の 1画素
	return Buffer.concat([
		Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
		chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', Buffer.alloc(0)),
	]);
}

// 16bit PCM の短いWAV。8bitはChromeのdecodeAudioDataが復号できない
function mkWav() {
	const rate = 22050, ns = Math.floor(rate * 0.3), bytes = ns * 2;
	const b = Buffer.alloc(44 + bytes);
	b.write('RIFF', 0); b.writeUInt32LE(36 + bytes, 4); b.write('WAVE', 8);
	b.write('fmt ', 12); b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22);
	b.writeUInt32LE(rate, 24); b.writeUInt32LE(rate * 2, 28);
	b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34);
	b.write('data', 36); b.writeUInt32LE(bytes, 40);
	for (let i=0; i<ns; ++i) b.writeInt16LE(Math.round(Math.sin(i / rate * 440 * 2 * Math.PI) * 3000), 44 + i*2);
	return b;
}

// 黒画面1秒のMP4。自前生成が現実的でないのでffmpegに作らせる
function mkMp4() {
	const fn = path.join(DIR, '_tmp.mp4');
	execFileSync('ffmpeg', ['-y', '-loglevel', 'error',
		'-f', 'lavfi', '-i', 'color=c=black:s=32x32:d=1:r=10',
		'-pix_fmt', 'yuv420p', '-movflags', '+faststart', fn]);
	const b = fs.readFileSync(fn);
	fs.unlinkSync(fn);
	return b;
}


const key = await mkKey();
fs.mkdirSync(DIR, {recursive: true});

// --- アセット（暗号化済み。ファイル名は実物同様に伏せる必要が無いので分かる名前にする）
fs.writeFileSync(path.join(DIR, 'pic.bin'), await enc(key, mkPng(), 2));
fs.writeFileSync(path.join(DIR, 'mov.bin'), await enc(key, mkMp4(), 20));
// 音声は #hN2Ext（SysBase.ts:527）に無い番号なので decAB が ArrayBuffer のまま返し、
//	SndBuf が自分で Blob URL を作る（SndBuf.ts の .bin 経路）
fs.writeFileSync(path.join(DIR, 'snd.bin'), await enc(key, mkWav(), 15));

// --- シナリオとフレーム（.sn/.htm/.json は setDec() が本文まるごと復号する）
const encTx = async tx=> Buffer.from(await crypto.subtle.encrypt(
	{name: 'AES-GCM', iv: hex2ab(hPass.iv)}, key, new TextEncoder().encode(tx))
).toString('base64');

const SN = `; 暗号化アセットのリソース検査用（leak_crypto.e2e.ts が使用）
[add_lay layer=mes class=txt]
[add_lay layer=bg class=grp]
[current layer=mes]
はじめ。[p]

; 暗号化画像 → SysBase.#genImage が Blob URL を作る
[lay layer=bg fn=pic]
えいぞう。[p]

; 暗号化動画 → SysBase.#genVideo が Blob URL を作る
[lay layer=bg fn=mov]
どうが。[p]

; 暗号化音声 → SndBuf が自前で Blob URL を作る（.bin 経路）。
;	ループ再生を停止したら revoke されるはず
[playbgm fn=snd join=false]
[stopbgm]
おと。[p]

; 暗号化HTMLフレーム。中の data-src 画像は FrameMng.#loadPic2Img 経由で
;	復号され、#hEncImgOUrl に Blob URL が溜まる
[add_frame id=frm src=frm]
ふれーむ。[p]
おわり。[s]
`;
// フレーム側の画像差し替え規約（tmp_esm_uc の frames/*.htm を復号して確認）：
//	FrameMng が f.onload で win.sn_repRes(復号ローダ) を呼ぶので、フレームは
//	それを受け取っておき、各 <img data-src> に適用する。
//	`sn_repRes();` の一行は FrameMng が srcdoc 生成時に消すので、呼び出しは load 後に行なう
const HTM = `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>
<img id="p" data-src="pic.png" width="8" height="8">
<script>
	// 実物のフレームは DOMContentLoaded で適用するが、FrameMng が sn_repRes を
	// 呼ぶのは親側の f.onload（＝もっと後）なので、フィクスチャでは受け取った
	// その場で適用して順序を確定させる。暗号化前提なので素通しの分岐も置かない
	function sn_repRes(setImg) {
		Array.from(document.getElementsByTagName('img')).forEach(i=> setImg(i));
	}
</script>
</body></html>
`;
fs.writeFileSync(path.join(DIR, 'main.sn'), await encTx(SN));
fs.writeFileSync(path.join(DIR, 'frm.htm'), await encTx(HTM));

const PRJ = {
	save_ns: 'skynovel_esm_e2e_crypto',
	window: {width: 640, height: 480},
	book: {title: 'E2E crypto', creator: 'famibee', cre_url: '', publisher: 'famibee',
		pub_url: '', detail: '暗号化アセットのリソース検査用', version: '1.0'},
	log: {max_len: 64},
	init: {bg_color: '#000000', tagch_msecwait: 0, auto_msecpagewait: 3500, escape: ''},
	debug: {devtool: false, dumpHtm: false, token: false, tag: false, putCh: false,
		debugLog: false, baseTx: false, masume: false, variable: false},
	code: {}, debuger_token: '',
};
// 暗号化しても **キーは元の拡張子のまま**、値だけ .bin を指す。
//	searchPath() は拡張子で絞る（SP_GSM=png|jpg|…）ので、bin をキーにすると見つからない。
//	tmp_esm_uc の path.json を復号して確認した実際の形式：
//	"nc10889": {":cnt":1, "mp4": "frames/cc84f224-….bin"}
const PATH = {
	main: {':cnt': 1, sn: 'main.sn'},
	frm	: {':cnt': 1, htm: 'frm.htm'},
	pic	: {':cnt': 1, png: 'pic.bin'},
	mov	: {':cnt': 1, mp4: 'mov.bin'},
	snd	: {':cnt': 1, wav: 'snd.bin'},
};
fs.writeFileSync(path.join(DIR, 'prj.json'), await encTx(JSON.stringify(PRJ)));
fs.writeFileSync(path.join(DIR, 'path.json'), await encTx(JSON.stringify(PATH)));

// --- 使い捨ての鍵をフィクスチャ側プラグインへ書き出す
fs.writeFileSync(fileURLToPath(new URL('./snsys_pre.ts', import.meta.url)),
`/* このファイルは test/e2e/app/mkPrjCrypto.mjs が生成する。直接編集しない */
// 本家の復号は snsys_pre プラグインが供給する（SysBase.loaded の setDec/setDecAB）。
//	これはその最小実装で、鍵は**E2E専用の使い捨て**。実プロジェクトの鍵ではない
import type {T_PluginInitArg} from '../../../src/web';

const hPass = ${JSON.stringify(hPass, null, '\t')};

const hex2ab = (h: string)=> new Uint8Array(
	(h.match(/../g) ?? []).map(x=> parseInt(x, 16))
).buffer;
const b642ab = (s: string)=> Uint8Array.from(atob(s), c=> c.charCodeAt(0)).buffer;

export async function init(arg: T_PluginInitArg) {
	const {subtle} = crypto;
	const base = await subtle.importKey('raw',
		await subtle.digest('SHA-512', new TextEncoder().encode(hPass.pass)),
		'PBKDF2', false, ['deriveKey']);
	const key = await subtle.deriveKey(
		{name: 'PBKDF2', hash: 'SHA-512', iterations: hPass.ite, salt: hex2ab(hPass.salt)},
		base, {name: 'AES-GCM', length: 256}, false, ['encrypt', 'decrypt']);
	const alg = {name: 'AES-GCM', iv: hex2ab(hPass.iv)};

	// .sn/.json/.htm は本文まるごと（Base64）。
	//	setEnc を素通しにしている都合で、平文のセーブデータにも dec が来る。
	//	実物の snsys_pre は enc/dec が対になっているので起きないが、
	//	ここでは復号できなければそのまま返して起動を妨げないようにする
	const REG = /(^|\\.)(ss?n|json|html?)$/;
	arg.setDec(async (ext: string, tx: string)=> {
		if (! REG.test(ext)) return tx;
		try {return new TextDecoder().decode(await subtle.decrypt(alg, key, b642ab(tx)))}
		catch {return tx}
	});

	// .bin は「4byte長 + 暗号ブロック + 平文の残り」
	arg.setDecAB(async (ab: ArrayBuffer)=> {
		const n = new DataView(ab.slice(0, 4)).getUint32(0, true);
		const head = await subtle.decrypt(alg, key, ab.slice(4, 4 + n));
		return {
			ext_num	: new DataView(head.slice(1, 2)).getUint8(0),
			ab		: await new Blob([head.slice(2), ab.slice(4 + n)]).arrayBuffer(),
		};
	});

	arg.setEnc(async (tx: string)=> tx);
	arg.getStK(()=> hPass.stk);
	arg.getHash((s: string)=> s);
}
`);

console.log('prj_crypto/ を生成しました:', fs.readdirSync(DIR).join(' '));
