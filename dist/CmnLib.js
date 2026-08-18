//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, n) => {
	let r = {};
	for (var i in e) t(r, i, {
		get: e[i],
		enumerable: !0
	});
	return n || t(r, Symbol.toStringTag, { value: "Module" }), r;
}, c = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, l = (n, r, o) => (o = n == null ? {} : e(i(n)), c(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n));
//#endregion
//#region src/sn/CmnLib.ts
function u(e) {
	return parseInt(String(e), 10);
}
function d(e) {
	let t = parseInt(String(e), 10);
	return t < 0 ? -t : t;
}
function f(e = "/", t = " ", n = ":", r = "") {
	let i = /* @__PURE__ */ new Date();
	return String(i.getFullYear()) + e + String(100 + i.getMonth() + 1).slice(1, 3) + e + String(100 + i.getDate()).slice(1, 3) + t + String(100 + i.getHours()).slice(1, 3) + n + String(100 + i.getMinutes()).slice(1, 3) + (r === "" ? "" : r + String(i.getMilliseconds()));
}
var p = "/* SKYNovel */";
function m() {
	let e = document.getElementsByTagName("head")[0], t = e.children.length;
	for (let n = t - 1; n >= 0; --n) {
		let t = e.children[n];
		t instanceof HTMLStyleElement && t.innerText.startsWith(p) && e.removeChild(t);
	}
}
function h(e) {
	let t = document.createElement("style");
	t.innerHTML = p + e, document.getElementsByTagName("head")[0].appendChild(t);
}
var g = "pointerdown", _ = "pointerdown", v = "keydown", y = "compChIn";
function b(e, t, n) {
	let r = e[t];
	if (!(t in e)) {
		if (isNaN(n)) throw `[${e[":タグ名"] ?? ""}]属性 ${t} は必須です`;
		return e[t] = n, n;
	}
	let i = String(r).startsWith("0x") ? parseInt(r) : parseFloat(r);
	if (isNaN(i)) throw `[${e[":タグ名"] ?? ""}]属性 ${t} の値【${String(r)}】が数値ではありません`;
	return e[t] = i, i;
}
function x(e, t, n) {
	if (!(t in e)) return e[t] = n, n;
	let r = e[t];
	if (r === null) return !1;
	let i = String(r);
	return e[t] = i !== "false" && !!i;
}
function S(e) {
	if (e.startsWith("#")) return parseInt(e.slice(1), 16);
	let t = Number(e);
	if (!isNaN(t)) return t;
	if (e === "black") return 0;
	O.cc4ColorName.fillStyle = e;
	let n = O.cc4ColorName.fillStyle;
	if (n === "#000000") throw `色名前 ${e} が異常です`;
	return parseInt(n.slice(1), 16);
}
function C(e, t, n) {
	let r = e[t];
	return r ? e[t] = S(String(r)) : (e[t] = n, n);
}
var w = /JSON at position (\d+)$/;
function T(e, t = "", n = "") {
	let r = (w.exec(n) ?? ["", ""])[1];
	return `[${e[":タグ名"] ?? ""}] ${t} 属性の解析エラー : ${n}
${String(e[t])}${r ? `
${"^".padStart(Number(r))}` : ""}`;
}
var E = /^[^/.]+$|[^/]+(?=\.)/;
function D(e) {
	return (E.exec(e) ?? [""])[0];
}
var O = class e {
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
export { o as _, y as a, C as c, D as d, m as f, d as g, S as h, v as i, b as l, T as m, g as n, h as o, u as p, _ as r, x as s, O as t, f as u, s as v, l as y };

//# sourceMappingURL=CmnLib.js.map