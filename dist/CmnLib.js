//#region src/sn/CmnLib.ts
function e(e) {
	return parseInt(String(e), 10);
}
function t(e) {
	let t = parseInt(String(e), 10);
	return t < 0 ? -t : t;
}
function n(e = "/", t = " ", n = ":", r = "") {
	let i = /* @__PURE__ */ new Date();
	return String(i.getFullYear()) + e + String(100 + i.getMonth() + 1).slice(1, 3) + e + String(100 + i.getDate()).slice(1, 3) + t + String(100 + i.getHours()).slice(1, 3) + n + String(100 + i.getMinutes()).slice(1, 3) + (r === "" ? "" : r + String(i.getMilliseconds()));
}
var r = "/* SKYNovel */";
function i() {
	let e = document.getElementsByTagName("head")[0], t = e.children.length;
	for (let n = t - 1; n >= 0; --n) {
		let t = e.children[n];
		t instanceof HTMLStyleElement && t.innerText.startsWith(r) && e.removeChild(t);
	}
}
function a(e) {
	let t = document.createElement("style");
	t.innerHTML = r + e, document.getElementsByTagName("head")[0].appendChild(t);
}
var o = "pointerdown", s = "pointerdown", c = "keydown", l = "compChIn";
function u(e, t, n) {
	let r = e[t];
	if (!(t in e)) {
		if (isNaN(n)) throw `[${e[":タグ名"] ?? ""}]属性 ${t} は必須です`;
		return e[t] = n, n;
	}
	let i = String(r).startsWith("0x") ? parseInt(r) : parseFloat(r);
	if (isNaN(i)) throw `[${e[":タグ名"] ?? ""}]属性 ${t} の値【${String(r)}】が数値ではありません`;
	return e[t] = i, i;
}
function d(e, t, n) {
	if (!(t in e)) return e[t] = n, n;
	let r = e[t];
	if (r === null) return !1;
	let i = String(r);
	return e[t] = i !== "false" && !!i;
}
function f(e) {
	if (e.startsWith("#")) return parseInt(e.slice(1), 16);
	let t = Number(e);
	if (!isNaN(t)) return t;
	if (e === "black") return 0;
	v.cc4ColorName.fillStyle = e;
	let n = v.cc4ColorName.fillStyle;
	if (n === "#000000") throw `色名前 ${e} が異常です`;
	return parseInt(n.slice(1), 16);
}
function p(e, t, n) {
	let r = e[t];
	return r ? e[t] = f(String(r)) : (e[t] = n, n);
}
var m = /JSON at position (\d+)$/;
function h(e, t = "", n = "") {
	let r = (m.exec(n) ?? ["", ""])[1];
	return `[${e[":タグ名"] ?? ""}] ${t} 属性の解析エラー : ${n}
${String(e[t])}${r ? `
${"^".padStart(Number(r))}` : ""}`;
}
var g = /^[^/.]+$|[^/]+(?=\.)/;
function _(e) {
	return (g.exec(e) ?? [""])[0];
}
var v = class e {
	static init() {
		let e = globalThis.navigator.userAgent;
		this.platform = e, this.plat_desc = e, this.isSafari = /safari/i.test(e) && !/chrome|chromium|crios|edg|android|fxios/i.test(e), this.isFirefox = /firefox|fxios/i.test(e), this.isMac = /macintosh|mac os x/i.test(e) && !/iphone|ipad|ipod/i.test(e), this.isMobile = !/windows|macintosh|mac os x/i.test(e) || /iphone|ipad|ipod|android/i.test(e);
	}
	static stageW = 0;
	static stageH = 0;
	static debugLog = !1;
	static platform;
	static plat_desc;
	static isSafari;
	static isFirefox;
	static isMac;
	static isMobile;
	static hDip = {};
	static isDbg = !1;
	static isPackaged = !1;
	static needClick2Play() {
		return "AudioContext" in globalThis ? (e.#e = new globalThis.AudioContext(), e.needClick2Play = () => e.#e.state === "suspended") : e.needClick2Play = () => !1, e.needClick2Play();
	}
	static #e;
	static isDarkMode = !1;
	static cc4ColorName;
};
//#endregion
export { l as a, p as c, _ as d, i as f, t as g, f as h, c as i, u as l, h as m, o as n, a as o, e as p, s as r, d as s, v as t, n as u };

//# sourceMappingURL=CmnLib.js.map