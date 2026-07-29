/* このファイルは test/e2e/app/mkPrjCrypto.mjs が生成する。直接編集しない */
// 本家の復号は snsys_pre プラグインが供給する（SysBase.loaded の setDec/setDecAB）。
//	これはその最小実装で、鍵は**E2E専用の使い捨て**。実プロジェクトの鍵ではない
import type {T_PluginInitArg} from '../../../src/web';

const hPass = {
	"pass": "00000000-0000-4000-8000-000000000000",
	"salt": "a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1",
	"iv": "b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2",
	"keySize": 16,
	"ite": 100,
	"stk": "c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3"
};

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
	const REG = /(^|\.)(ss?n|json|html?)$/;
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
