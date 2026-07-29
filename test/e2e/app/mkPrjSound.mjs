/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2026-2026 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// 音声テスト用フィクスチャ（test/e2e/app/prj_sound/）の音源を作り直す。
//	`node test/e2e/app/mkPrjSound.mjs`
//
//	ギャラリー <SKYNovel_gallery/public/prj/sound/> の手動テストを自動化するにあたり、
//	素材だけは自前生成にする（実素材を公開リポジトリに持ち込まないため）。
//	検証したいのは尺・形式・鳴っているかであって音色ではないので、正弦波でよい。
//
//	**尺を音源ごとに変える**のが要点。耳で確かめられない代わりに、
//	Howl.duration() で「今どの音が載っているか」を判別できる。

import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const DIR = fileURLToPath(new URL('./prj_sound/', import.meta.url));

// [論理名, 拡張子, 秒, Hz, ffmpegオプション]
//	ogg は libvorbis が無い環境向けに実験的 vorbis を使うが、そちらは 2ch しか
//	受け付けないのでチャンネル数も形式ごとに持たせる
const A_SND = [
	// 本体テスト用。start_ms/end_ms/ret_ms に 1000〜3500 を使うので 4 秒要る
	['snd',		'mp3',	4,	440,	['-ac', '1', '-c:a', 'libmp3lame', '-b:a', '64k']],
	// 2音め。尺で snd と区別できる（xchgbuf・重ね[playse]の確認用）
	['snd2',	'mp3',	2,	880,	['-ac', '1', '-c:a', 'libmp3lame', '-b:a', '64k']],
	// 形式別の読み込み確認。短くてよい
	['f_m4a',	'm4a',	1,	440,	['-ac', '1', '-c:a', 'aac', '-b:a', '64k']],
	['f_ogg',	'ogg',	1,	440,	['-ac', '2', '-c:a', 'vorbis', '-strict', '-2', '-b:a', '64k']],
	['f_aac',	'aac',	1,	440,	['-ac', '1', '-c:a', 'aac', '-b:a', '64k', '-f', 'adts']],
	['f_flac',	'flac',	1,	440,	['-ac', '1', '-c:a', 'flac']],
	['f_wav',	'wav',	1,	440,	['-ac', '1', '-c:a', 'pcm_s16le']],
];

fs.mkdirSync(DIR, {recursive: true});
for (const [nm, ext, sec, hz, aOpt] of A_SND) {
	execFileSync('ffmpeg', ['-y', '-loglevel', 'error',
		'-f', 'lavfi', '-i', `sine=frequency=${String(hz)}:sample_rate=22050:duration=${String(sec)}`,
		...aOpt, path.join(DIR, `${nm}.${ext}`)]);
}

const PRJ = {
	save_ns: 'skynovel_esm_e2e_sound',
	window: {width: 640, height: 480},
	book: {title: 'E2E sound', creator: 'famibee', cre_url: '', publisher: 'famibee',
		pub_url: '', detail: '音声まわりの自動テスト用', version: '1.0'},
	log: {max_len: 64},
	init: {bg_color: '#000000', tagch_msecwait: 0, auto_msecpagewait: 3500, escape: ''},
	debug: {devtool: false, dumpHtm: false, token: false, tag: false, putCh: false,
		debugLog: false, baseTx: false, masume: false, variable: false},
	code: {}, debuger_token: '',
};
const PATH = {main: {':cnt': 1, sn: 'main.sn'}};
for (const [nm, ext] of A_SND) PATH[nm] = {':cnt': 1, [ext]: `${nm}.${ext}`};

fs.writeFileSync(path.join(DIR, 'prj.json'), JSON.stringify(PRJ, null, '\t'));
fs.writeFileSync(path.join(DIR, 'path.json'), JSON.stringify(PATH, null, '\t'));

console.log('prj_sound/');
for (const [nm, ext, sec] of A_SND) {
	const fn = `${nm}.${ext}`;
	console.log(`  ${fn.padEnd(11)} ${String(sec)}s ${String(fs.statSync(path.join(DIR, fn)).size).padStart(7)} bytes`);
}
