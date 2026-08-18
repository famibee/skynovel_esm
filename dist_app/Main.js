import { _ as e, r as t, x as n, y as r } from "./pixi.js";
import { d as i, h as a, s as o, t as s } from "./CmnLib.js";
import { n as c } from "./ConfigBase.js";
import { t as l } from "./DebugMng.js";
import { t as u } from "./Config.js";
//#region src/sn/AnalyzeTagArg.ts
function d(e, t, n = 0, r = 0, i = 0) {
	let a = e.slice(0, t).split("\n"), o = a.length;
	return {
		ln: r + o - 1,
		ch: o < 2 ? i + 1 + n + t : a.at(-1)?.length ?? 0
	};
}
var f = class {
	#e = /;[^\n]*|(?<key>[^\s="'#|;]+)(?:\s|;[^\n]*\n)*=(?:\s|;[^\n]*\n)*(?:(?<val>[^\s"'#|;]+)|(["'#])(?<val2>.*?)\3)(?:\|(?:(?<def>[^\s"'#;]+)|(["'#])(?<def2>.*?)\6))?|(?<literal>[^\s;]+)/g;
	parse(e) {
		this.#t = {}, this.#n = !1;
		for (let { groups: t } of e.matchAll(this.#e)) {
			let { key: e, val: n, val2: r, def: i, def2: a, literal: o } = t;
			e ? this.#t[e] = {
				val: n ?? r ?? "",
				def: i ?? a
			} : o && (o === "*" ? this.#n = !0 : this.#t[o] = {
				val: "1",
				def: void 0
			});
		}
	}
	parseinDetail(e, t, n, r) {
		let i = {}, a = e.slice(1 + t, -1);
		for (let { groups: e, index: o, 0: s } of a.matchAll(this.#e)) {
			if (!o) continue;
			let { key: c, val: l, val2: u = "", literal: f } = e;
			if (f) {
				if (f.endsWith("=")) {
					let e = f.length - 1, { ch: s } = d(a, o + e, t, n, r);
					i[f.slice(0, -1)] = {
						k_ln: n,
						k_ch: s - e,
						v_ln: n,
						v_ch: s + 1,
						v_len: 0
					};
				}
				continue;
			}
			if (!c) continue;
			let { ln: p, ch: m } = d(a, o, t, n, r), { ln: h, ch: g } = d(a, o + s.lastIndexOf(l ?? u) - +!l, t, n, r);
			i[c] = {
				k_ln: p,
				k_ch: m,
				v_ln: h,
				v_ch: g,
				v_len: l ? l.length : u.length + 2
			};
		}
		return i;
	}
	#t = {};
	get hPrm() {
		return this.#t;
	}
	#n = !1;
	get isKomeParam() {
		return this.#n;
	}
}, p = /(?<name>[^\s;\]]+)/;
function m(e) {
	let t = p.exec(e.slice(1, -1))?.groups;
	if (!t) throw `タグ記述【${e}】異常です(タグ解析)`;
	let n = t.name;
	return [n, e.slice(1 + n.length, -1)];
}
function h(e) {
	let t = p.exec(e.slice(1))?.groups;
	if (!t) throw `タグ記述【${e}】異常です(タグ解析)`;
	return t.name;
}
function g(e) {
	let t = e.replaceAll("==", "＝").replaceAll("!=", "≠").split("="), n = t.length;
	if (n < 2 || n > 3) throw "「&計算」書式では「=」指定が一つか二つ必要です";
	let [r, i, a] = t;
	if (i.startsWith("&")) throw "「&計算」書式では「&」指定が不要です";
	return {
		name: r.replaceAll("＝", "==").replaceAll("≠", "!="),
		text: i.replaceAll("＝", "==").replaceAll("≠", "!="),
		...n === 3 ? { cast: a.trim() } : {}
	};
}
var _ = class {
	cfg;
	constructor(e) {
		this.cfg = e, this.setEscape("");
	}
	#e;
	setEscape(e) {
		if (this.#l && e in this.#l) throw "[エスケープ文字] char【" + e + "】が登録済みの括弧マクロまたは一文字マクロです";
		this.#e = RegExp((e ? `\\${e}\\S|` : "") + `\\n+|\\t+|\\[let_ml\\s+[^\\]]+\\].+?(?=\\[endlet_ml[\\]\\s])|\\[(?:[^"'#;\\]]+|(["'#]).*?\\1|;[^\\n]*)*?]|;[^\\n]*|&[^&\\n]+&|&&?(?:[^"'#;\\n&]+|(["'#]).*?\\2)+|^\\*[^\\s\\[&;\\\\]+|[^\\n\\t\\[;${e ? `\\${e}` : ""}]+`, "gs"), this.#t = RegExp(`[\\w\\s;[\\]*=&｜《》${e ? `\\${e}` : ""}]`), this.#u = RegExp(`[\\n\\t;\\[*&${e ? `\\${e}` : ""}]`);
	}
	bracket2macro(e, t, n, r) {
		let { name: i, text: a } = e;
		if (!i) throw "[bracket2macro] nameは必須です";
		if (!a) throw "[bracket2macro] textは必須です";
		let o = a.at(0);
		if (!o) throw "[bracket2macro] textは必須です";
		if (a.length !== 2) throw "[bracket2macro] textは括弧の前後を示す二文字を指定してください";
		if (!(i in t)) throw `[bracket2macro] 未定義のタグ又はマクロ[${i}]です`;
		this.#l ??= {};
		let s = a.charAt(1);
		if (o in this.#l) throw "[bracket2macro] text【" + o + "】が登録済みの括弧マクロまたは一文字マクロです";
		if (s in this.#l) throw "[bracket2macro] text【" + s + "】が登録済みの括弧マクロまたは一文字マクロです";
		if (this.#t.test(o)) throw "[bracket2macro] text【" + o + "】は括弧マクロに使用できない文字です";
		if (this.#t.test(s)) throw "[bracket2macro] text【" + s + "】は括弧マクロに使用できない文字です";
		this.#l[s] = "0", this.#l[o] = `[${i} text=`, this.addC2M(`\\${o}[^\\${s}]*\\${s}`, `\\${o}\\${s}`), this.#d(n, r);
	}
	char2macro(e, t, n, r) {
		let { char: i, name: a } = e;
		if (!i) throw "[char2macro] charは必須です";
		if (this.#l ??= {}, i in this.#l) throw "[char2macro] char【" + i + "】が登録済みの括弧マクロまたは一文字マクロです";
		if (this.#t.test(i)) throw "[char2macro] char【" + i + "】は一文字マクロに使用できない文字です";
		if (!a) throw "[char2macro] nameは必須です";
		if (!(a in t)) throw `[char2macro] 未定義のタグ又はマクロ[${a}]です`;
		this.#l[i] = `[${a}]`, this.addC2M(`\\${i}`, `\\${i}`), this.#d(n, r);
	}
	#t;
	#n = /* @__PURE__ */ RegExp("");
	#r = "";
	#i = "";
	addC2M(e, t) {
		this.#r += `${e}|`, this.#i += t, this.#n = RegExp(`(${this.#r}[^${this.#i}]+)`, "g");
	}
	resolveScript(e) {
		let t = e.replaceAll(/\r\n?/g, "\n").match(this.#e)?.flatMap((e) => {
			if (!this.testTagLetml(e)) return e;
			let t = /^([^\]]+?])(.*)$/s.exec(e);
			if (!t) return e;
			let [, n, r] = t;
			return [n, r];
		}) ?? [], n = {
			aToken: t,
			len: t.length,
			aLNum: []
		};
		return this.#d(n), this.#s(n), n;
	}
	#a = /^\[(call|loadplugin)\s/;
	#o = /\bfn\s*=\s*[^\s\]]+/;
	#s(e) {
		for (let t = e.len - 1; t >= 0; --t) {
			let n = e.aToken[t];
			if (!this.#a.test(n)) continue;
			let [r, a] = m(n);
			this.#c.parse(a);
			let o = this.#c.hPrm.fn;
			if (!o) continue;
			let { val: s } = o;
			if (!s.endsWith("*")) continue;
			e.aToken.splice(t, 1, "	", "; " + n), e.aLNum.splice(t, 1, NaN, NaN);
			let l = r === "loadplugin" ? c.CSS : c.SN, u = this.cfg.matchPath("^" + s.slice(0, -1) + ".*", l);
			for (let r of u) {
				let a = n.replace(this.#o, "fn=" + decodeURIComponent(i(r[l])));
				e.aToken.splice(t, 0, a), e.aLNum.splice(t, 0, NaN);
			}
		}
		e.len = e.aToken.length;
	}
	#c = new f();
	testTagLetml(e) {
		return /^\[let_ml\s/.test(e);
	}
	testTagEndLetml(e) {
		return /^\[endlet_ml\s*]/.test(e);
	}
	#l = void 0;
	#u;
	#d(e, t = 0) {
		if (this.#l) {
			for (let n = e.len - 1; n >= t; --n) {
				let t = e.aToken[n];
				if (this.testNoTxt(t.at(0) ?? "\n")) continue;
				let r = e.aLNum[n], i = t.match(this.#n);
				if (!i) continue;
				let a = 1;
				for (let t = i.length - 1; t >= 0; --t) {
					let o = i[t], s = this.#l[o.at(0) ?? " "];
					s && (o = s + (s.endsWith("]") ? "" : `'${o.slice(1, -1)}']`)), e.aToken.splice(n, a, o), e.aLNum.splice(n, a, r), a = 0;
				}
			}
			e.len = e.aToken.length;
		}
	}
	testNoTxt(e) {
		return this.#u.test(e);
	}
}, v = /* @__PURE__ */ n({ Main: () => b }), y = "skynovel", b = class n {
	sys;
	static async generate(e) {
		r();
		let t = new n(e);
		return await t.#a().catch((e) => console.error("Main.generate err e:%o", e)), t;
	}
	cvs;
	#e = Object.create(null);
	#t;
	#n;
	#r;
	#i = new DisposableStack();
	constructor(e) {
		this.sys = e;
	}
	async #a() {
		let n = await u.generate(this.sys);
		this.sys.setMain(this, n);
		let r = {
			width: n.oCfg.window.width,
			height: n.oCfg.window.height,
			backgroundColor: a(String(n.oCfg.init.bg_color)),
			resolution: globalThis.devicePixelRatio
		}, i = document.getElementById(y);
		if (i) {
			let e = i.cloneNode(!0);
			e.id = y, r.view = i;
			let t = i.parentNode;
			this.#i.defer(() => t.appendChild(e));
		} else {
			let e = document.createElement("canvas");
			e.id = y, r.view = e, document.body.appendChild(e), this.#i.defer(() => document.body.removeChild(e));
		}
		let o = new t(r);
		this.#i.defer(() => {
			e(), this.sys.destroy(), o.destroy(!1);
		}), this.cvs = o.view, this.cvs.id = "skynovel_act", i || document.body.appendChild(this.cvs);
		let c = document.createElement("canvas").getContext("2d");
		if (!c) throw "#init cc err";
		s.cc4ColorName = c;
		let [{ Variable: d }, { PropParser: f }, { SoundMng: p }, { ScriptIterator: m }, { LayerMng: h }, { EventMng: g }, { Button: _ }] = await Promise.all([
			import("./Variable.js"),
			import("./PropParser.js"),
			import("./SoundMng.js"),
			import("./ScriptIterator.js"),
			import("./LayerMng.js"),
			import("./EventMng.js"),
			import("./Button.js")
		]);
		_.init(n);
		let v = new d(this.sys, n, this.#e), b = new f(v, n.oCfg.init.escape);
		this.#o = (e, t, n, r) => v.setVal_Nochk(e, t, n, r), this.#l = (e) => b.getValAmpersand(e), this.#u = (e) => b.parse(e), await Promise.allSettled(this.sys.init(this.#e, o, v));
		let x = new p(n, this.#e, v, this, this.sys);
		this.#i.defer(() => x.destroy()), this.#t = new m(n, this.#e, this, v, b, x, this.sys), this.#i.defer(() => this.#t.destroy());
		let S = new l(this.sys, this.#e, this.#t);
		this.#i.defer(() => S.destroy()), this.errScript = (e, t) => {
			if (this.stop(), l.myTrace(e), s.debugLog && console.log("🍜 SKYNovel err!"), t) throw e;
		}, this.#n = new h(n, this.#e, o, v, this, this.#t, this.sys, x, b), this.#i.defer(() => this.#n.destroy()), this.#r = new g(n, this.#e, o, this, this.#n, v, x, this.#t, this.sys), this.#i.defer(() => this.#r.destroy()), this.#i.defer(() => {
			this.stop(), this.#s = !1;
			let e = () => !0;
			for (let t in this.#e) this.#e[t] = e;
		});
	}
	destroy() {
		this.resume = this.destroy = () => {}, this.cvs.parentElement?.removeChild(this.cvs), this.#i.dispose();
	}
	errScript = (e, t = !0) => {};
	resumeByJumpOrCall(e) {
		if (e.url) {
			this.#e.navigate_to(e), this.#t.jumpJustBefore();
			return;
		}
		if (this.#o("tmp", "sn.eventArg", String(e.arg ?? "")), this.#o("tmp", "sn.eventLabel", e.label ?? ""), o(e, "call", !1)) {
			if (this.#t.subIdxToken(), this.#e.call(e)) return;
		} else if (this.#e.clear_event({}), this.#e.jump(e)) return;
		this.resume();
	}
	#o = (e, t, n, r = !1) => {};
	resume() {
		this.#n.clearBreak(), this.#t.noticeBreak(!1), this.#r.hideHint(), queueMicrotask(() => {
			this.#c();
		});
	}
	stop = () => {
		this.#t.noticeBreak(!0);
	};
	setLoop(e, t = "") {
		(this.#s = e) ? this.resume() : this.stop(), this.sys.setTitleInfo(t ? ` -- ${t}中` : "");
	}
	#s = !0;
	async #c() {
		let e = "";
		try {
			for (; this.#s;) {
				let t = this.#t.nextToken();
				if (!t) return;
				let n = t.charCodeAt(0);
				if (n !== 9) {
					if (n === 10) {
						this.#t.addLineNum(t.length);
						continue;
					}
					if (n === 91) {
						if (e = "タグ開始", this.#t.isBreak(t)) return;
						let [n, r] = m(t);
						e = `[${n}]例外`;
						let i = (t.match(/\n/g) ?? []).length;
						if (i > 0 && this.#t.addLineNum(i), await this.#t.タグ解析(n, r)) {
							this.stop();
							return;
						}
						continue;
					}
					if (n === 38) {
						if (!t.endsWith("&")) {
							if (e = "変数計算", this.#t.isBreak(t)) return;
							let n = g(t.slice(1));
							n.name = this.#l(n.name), n.text = String(this.#u(n.text)), this.#e.let(n);
							continue;
						}
						if (e = "変数操作", t.charAt(1) === "&") throw Error("「&表示&」書式では「&」指定が不要です");
						t = String(this.#u(t.slice(1, -1)));
					} else if (n === 59) continue;
					else if (n === 42 && t.length > 1) continue;
					e = "文字表示", this.#n.setNormalChWait(), this.#n.currentTxtlayForeNeedErr.tagCh(t);
				}
			}
		} catch (t) {
			this.errScript(`${e} ${t instanceof Error ? `mes=${t.message}(${t.name})` : String(t)}`, !1);
		}
	}
	#l = (e) => "";
	#u;
};
//#endregion
export { b as Main, f as a, m as i, _ as n, h as r, v as t };

//# sourceMappingURL=Main.js.map