import { c as e, d as t, f as n, l as r, m as i, o as a, p as o, s, u as c } from "./pixi.js";
import { c as l, g as u, h as d, l as f, o as p, s as m, t as h, u as g } from "./CmnLib.js";
import { t as _ } from "./EventListenerCtn.js";
import { n as v } from "./ConfigBase.js";
import { t as y } from "./Layer.js";
import { i as b, r as x, t as S } from "./Reading.js";
import { t as C } from "./SpritesMng.js";
import { Button as w } from "./Button.js";
import { t as T } from "./RubySpliter.js";
import { TxtLayer as E, t as D } from "./TxtLayer.js";
import { GrpLayer as O, t as k } from "./GrpLayer.js";
import { o as A } from "./Main.js";
//#region src/sn/Pages.ts
var j = class e {
	cls;
	hArg;
	sys;
	val;
	ret;
	#e;
	constructor(e, t, n, r, i, a, o, s) {
		this.cls = t, this.hArg = i, this.sys = a, this.val = o, this.ret = s;
		let c = a.hFactoryCls[t];
		if (!c) throw `属性 class【${t}】が不正です`;
		let l = c(), u = c();
		l.layname = u.layname = e;
		let d = i[":id_tag"] = `layer:${e} cls:${t} page:`;
		l.ctn.name = l.name = d + "A", u.ctn.name = u.name = d + "B", n.addChild(l.ctn), r.addChild(u.ctn), m(i, "visible", !0), m(i, "visible", !0), s.isWait = l.lay(i) || u.lay(i), this.#e = {
			fore: l,
			back: u
		}, r.visible = !1;
		let f = `const.sn.lay.${e}`;
		o.setVal_Nochk("tmp", f, !0), o.defTmp(f + ".fore.alpha", () => this.#e.fore.alpha), o.defTmp(f + ".back.alpha", () => this.#e.back.alpha), o.defTmp(f + ".fore.height", () => this.#e.fore.height), o.defTmp(f + ".back.height", () => this.#e.back.height), o.defTmp(f + ".fore.visible", () => this.#e.fore.ctn.visible), o.defTmp(f + ".back.visible", () => this.#e.back.ctn.visible), o.defTmp(f + ".fore.width", () => this.#e.fore.width), o.defTmp(f + ".back.width", () => this.#e.back.width), o.defTmp(f + ".fore.x", () => this.#e.fore.x), o.defTmp(f + ".back.x", () => this.#e.back.x), o.defTmp(f + ".fore.y", () => this.#e.fore.y), o.defTmp(f + ".back.y", () => this.#e.back.y);
	}
	destroy() {
		this.#e.fore.destroy(), this.#e.back.destroy();
	}
	lay = (e) => this.getPage(e).lay(e);
	getPage = (t) => e.argChk_page(t, "fore") === "back" ? this.#e.back : this.#e.fore;
	static argChk_page(e, t) {
		let n = e.page ?? t;
		if (n === "fore" || n === "back") return e.page = n, n;
		throw Error("属性 page【" + n + "】が不正です");
	}
	get fore() {
		return this.#e.fore;
	}
	get back() {
		return this.#e.back;
	}
	transPage(e) {
		[this.#e.back, this.#e.fore] = [this.#e.fore, this.#e.back], this.#e.back.copy(this.#e.fore, e);
	}
}, M = class t {
	appPixi;
	val;
	static #e;
	static #t;
	static #n;
	static init(e, n, r) {
		t.#e = e, t.#t = n, t.#n = r;
	}
	constructor(e, t, n) {
		this.appPixi = t, this.val = n, e.add_frame = (e) => this.#o(e), e.let_frame = (e) => this.#f(e), e.set_frame = (e) => this.#p(e), e.frame = (e) => this.#h(e), e.tsy_frame = (e) => this.#g(e);
	}
	#r;
	setEvtMng(e) {
		this.#r = e;
	}
	#i = Object.create(null);
	destroy() {
		for (let e of Object.values(this.#i)) e.parentElement.removeChild(e);
		this.#i = Object.create(null);
		for (let e of Object.values(t.#d)) e.startsWith("blob:") && URL.revokeObjectURL(e);
		t.#d = {}, t.#u = {};
	}
	hideAllFrame() {
		for (let [e, { style: t }] of Object.entries(this.#i)) this.#a[e] = t.display !== "none", t.display = "none";
	}
	#a = Object.create(null);
	restoreAllFrame() {
		for (let [e, t] of Object.entries(this.#a)) {
			let n = this.#i[e];
			n && (n.style.display = t ? "inline" : "none");
		}
		this.#a = Object.create(null);
	}
	#o(n) {
		let { id: i, src: a, alpha: o = 1, scale_x: s = 1, scale_y: c = 1, rotate: l = 0 } = n;
		if (!i) throw "idは必須です";
		if (!a) throw "srcは必須です";
		let u = "const.sn.frm." + i;
		if (this.val.getVal(`tmp:${u}`)) throw `frame【${i}】はすでにあります`;
		let d = m(n, "visible", !0), f = n.b_color ? ` background-color: ${n.b_color};` : "", p = this.#c(n);
		t.#n.cvs.insertAdjacentHTML("beforebegin", `<iframe id="${i}" style="opacity: ${String(o)}; ${f} position: absolute; left:${String(t.#t.ofsLeft4elm + p.x * t.#t.cvsScale)}px; top: ${String(t.#t.ofsTop4elm + p.y * t.#t.cvsScale)}px; z-index: 1; border: 0px; overflow: hidden; display: ${d ? "inline" : "none"}; transform: scale(${String(s)}, ${String(c)}) rotate(${String(l)}deg);" width="${String(p.width * t.#t.cvsScale)}" height="${String(p.height * t.#t.cvsScale)}"></iframe>`);
		let h = S.procID + `add_frame id:${i}`;
		S.beginProc(h);
		let g = t.#e.searchPath(a, v.HTML), _ = new e().add({
			name: a,
			url: g,
			xhrType: r.XHR_RESPONSE_TYPE.TEXT
		});
		return t.#t.arg.crypto && _.use((e, n) => void t.#t.dec(e.extension, e.data).then((t) => {
			e.data = t, n();
		}).catch((r) => {
			t.#n.errScript(`[add_frame]Html ロード失敗です src:${e.name} ${String(r)}`, !1), n();
		})), _.load((e, n) => {
			let r = document.getElementById(i);
			this.#i[i] = r, this.#s[i] = !1;
			let f = g.lastIndexOf("/") + 1, m = g.slice(0, f), _ = m.slice(0, f);
			r.srcdoc = String(n[a]?.data).replace("sn_repRes();", "").replaceAll(/\s(?:src|href)=(["'])(\S+?)\1/g, (e, t, n) => n.startsWith("../") ? _ + e.slice(3) : e.replace("./", "").replace(t, t + m)), r.srcdoc.includes("true/*WEBP*/;") && (r.srcdoc = r.srcdoc.replaceAll(/data-src="(.+?\.)(?:jpe?g|png)/g, (e, t) => `data-src="${t}webp`)), r.onload = () => {
				S.endProc(h), this.val.setVal_Nochk("tmp", u, !0), this.val.setVal_Nochk("tmp", u + ".alpha", o), this.val.setVal_Nochk("tmp", u + ".x", p.x), this.val.setVal_Nochk("tmp", u + ".y", p.y), this.val.setVal_Nochk("tmp", u + ".scale_x", s), this.val.setVal_Nochk("tmp", u + ".scale_y", c), this.val.setVal_Nochk("tmp", u + ".rotate", l), this.val.setVal_Nochk("tmp", u + ".width", p.width), this.val.setVal_Nochk("tmp", u + ".height", p.height), this.val.setVal_Nochk("tmp", u + ".visible", d);
				let e = r.contentWindow;
				this.#r.resvFlameEvent(e.document.body), e.sn_repRes?.((e) => t.#l(e.dataset.src ?? "", e));
			};
		}), !0;
	}
	#s = {};
	getFrmDisabled(e) {
		return this.#s[e];
	}
	#c(e) {
		let t = { ...e };
		return new DOMRect(f(t, "x", 0), f(t, "y", 0), f(t, "width", h.stageW), f(t, "height", h.stageH));
	}
	static #l(n, i, a) {
		let o = this.#d[n];
		if (o) {
			i.src = o, a && (i.onload = () => a(i));
			return;
		}
		let s = this.#u[n];
		if (s) {
			s.push(i);
			return;
		}
		this.#u[n] = [i];
		let [c = "", l = ""] = n.split("?"), u = t.#e.searchPath(c, v.SP_GSM), d = new e().add({
			name: n,
			url: u,
			xhrType: r.XHR_RESPONSE_TYPE.BUFFER
		});
		t.#t.use4ViteElectron(n, u, d, t.#n) || t.#t.arg.crypto && u.endsWith(".bin") && d.use((e, n) => {
			if (e.extension !== "bin") {
				n();
				return;
			}
			t.#t.decAB(e.data).then((t) => {
				e.data = t, t instanceof HTMLImageElement && (e.type = r.TYPE.IMAGE), n();
			}).catch((r) => {
				t.#n.errScript(`FrameMng loadPic ロード失敗です fn:${e.name} ${String(r)}`, !1), n();
			});
		}), d.load((e, t) => {
			for (let [e, { data: { src: n } }] of Object.entries(t)) {
				let t = this.#d[e] = n + (n.startsWith("blob:") || n.startsWith("data:") ? "" : l ? "?" + l : ""), r = this.#u[e];
				if (r) for (let e of r) e.src = t, a && (e.onload = () => a(e));
				delete this.#u[e];
			}
		});
	}
	static #u = {};
	static #d = {};
	cvsResize() {
		for (let [e, n] of Object.entries(this.#i)) {
			let r = "const.sn.frm." + e, i = Number(this.val.getVal(r + ".x")), a = Number(this.val.getVal(r + ".y")), o = Number(this.val.getVal(r + ".width")), s = Number(this.val.getVal(r + ".height"));
			n.style.left = `${String(t.#t.ofsLeft4elm + i * t.#t.cvsScale)}px`, n.style.top = `${String(t.#t.ofsTop4elm + a * t.#t.cvsScale)}px`, n.width = String(o * t.#t.cvsScale), n.height = String(s * t.#t.cvsScale);
		}
	}
	#f(e) {
		let { id: t, var_name: n } = e;
		if (!t) throw "idは必須です";
		let r = document.getElementById(t);
		if (!r) throw `id【${t}】はフレームではありません`;
		let i = "const.sn.frm." + t;
		if (!this.val.getVal(`tmp:${i}`)) throw `frame【${t}】が読み込まれていません`;
		if (!n) throw "var_nameは必須です";
		let a = r.contentWindow;
		if (!Object.hasOwn(a, n)) throw `frame【${t}】に変数/関数【${n}】がありません。変数は var付きにして下さい`;
		let o = a[n];
		return this.val.setVal_Nochk("tmp", i + "." + n, m(e, "function", !1) ? o() : o), !1;
	}
	#p(e) {
		let { id: t, var_name: n, text: r } = e;
		if (!t) throw "idは必須です";
		let i = document.getElementById(t);
		if (!i) throw `id【${t}】はフレームではありません`;
		let a = "const.sn.frm." + t;
		if (!this.val.getVal(`tmp:${a}`)) throw `frame【${t}】が読み込まれていません`;
		if (!n) throw "var_nameは必須です";
		if (!r) throw "textは必須です";
		this.val.setVal_Nochk("tmp", a + "." + n, r);
		let o = i.contentWindow;
		return o[n] = r, !1;
	}
	#m = 1;
	#h(e) {
		let { id: n } = e;
		if (!n) throw "idは必須です";
		let r = document.getElementById(n);
		if (!r) throw `id【${n}】はフレームではありません`;
		let i = "const.sn.frm." + n;
		if (!this.val.getVal("tmp:" + i)) throw `frame【${n}】が読み込まれていません`;
		let a = r.style;
		if (m(e, "float", !1) ? a.zIndex = String(++this.#m) : "index" in e ? a.zIndex = String(f(e, "index", 0)) : e.dive && (a.zIndex = String(-++this.#m)), "alpha" in e) {
			let t = a.opacity = String(e.alpha);
			this.val.setVal_Nochk("tmp", i + ".alpha", t);
		}
		let o = this.#c(e);
		if (("x" in e || "y" in e) && (a.left = `${String(t.#t.ofsLeft4elm + o.x * t.#t.cvsScale)}px`, a.top = `${String(t.#t.ofsTop4elm + o.y * t.#t.cvsScale)}px`, this.val.setVal_Nochk("tmp", i + ".x", o.x), this.val.setVal_Nochk("tmp", i + ".y", o.y)), "scale_x" in e || "scale_y" in e || "rotate" in e) {
			let t = f(e, "scale_x", 1), n = f(e, "scale_y", 1), r = f(e, "rotate", 0);
			a.transform = `scale(${String(t)}, ${String(n)}) rotate(${String(r)}deg)`, this.val.setVal_Nochk("tmp", i + ".scale_x", t), this.val.setVal_Nochk("tmp", i + ".scale_y", n), this.val.setVal_Nochk("tmp", i + ".rotate", r);
		}
		if ("width" in e && (r.width = String(o.width * t.#t.cvsScale), this.val.setVal_Nochk("tmp", i + ".width", o.width)), "height" in e && (r.height = String(o.height * t.#t.cvsScale), this.val.setVal_Nochk("tmp", i + ".height", o.height)), "visible" in e) {
			let t = m(e, "visible", !0);
			a.display = t ? "inline" : "none", this.val.setVal_Nochk("tmp", i + ".visible", t);
		}
		if ("b_color" in e && (a.backgroundColor = e.b_color), "disabled" in e) {
			let t = this.#s[n] = m(e, "disabled", !0), i = r.contentDocument.body;
			for (let e of [
				...Array.from(i.getElementsByTagName("input")),
				...Array.from(i.getElementsByTagName("select")),
				...Array.from(i.getElementsByTagName("button"))
			]) e.disabled = t;
		}
		return !1;
	}
	#g(e) {
		let { id: n, alpha: r, x: i, y: a, scale_x: o, scale_y: s, rotate: c, width: l, height: u } = e;
		if (!n) throw "idは必須です";
		let d = document.getElementById(n);
		if (!d) throw `id【${n}】はフレームではありません`;
		let p = "const.sn.frm." + n;
		if (!this.val.getVal(`tmp:${p}`, 0)) throw `frame【${n}】が読み込まれていません`;
		let m = {};
		r && (m.a = Number(d.style.opacity)), (i || a || o || s || c) && (m.x = Number(this.val.getVal(`tmp:${p}.x`)), m.y = Number(this.val.getVal(`tmp:${p}.y`)), m.sx = Number(this.val.getVal(`tmp:${p}.scale_x`)), m.sy = Number(this.val.getVal(`tmp:${p}.scale_y`)), m.r = Number(this.val.getVal(`tmp:${p}.rotate`))), l && (m.w = Number(this.val.getVal(`tmp:${p}.width`))), u && (m.h = Number(this.val.getVal(`tmp:${p}.height`)));
		let h = x.cnvTweenArg(e, m), g = (e) => {};
		r && (f(h, "alpha", 0), g = (e) => {
			d.style.opacity = String(e.a), this.val.setVal_Nochk("tmp", "alpha", e.a);
		});
		let _ = (e) => {}, v = this.#c(h);
		(i || a || o || s || c) && (v.x, v.y, f(h, "scale_x", 1), f(h, "scale_y", 1), f(h, "rotate", 0), _ = (e) => {
			d.style.left = `${String(t.#t.ofsLeft4elm + e.x * t.#t.cvsScale)} px`, d.style.top = `${String(t.#t.ofsTop4elm + e.y * t.#t.cvsScale)} px`, d.style.transform = `scale(${String(e.sx)}, ${String(e.sy)}) rotate(${String(e.r)}deg)`, this.val.setVal_Nochk("tmp", p + ".x", e.x), this.val.setVal_Nochk("tmp", p + ".y", e.y), this.val.setVal_Nochk("tmp", p + ".scale_x", e.sx), this.val.setVal_Nochk("tmp", p + ".scale_y", e.sy), this.val.setVal_Nochk("tmp", p + ".rotate", e.r);
		});
		let y = (e) => {};
		l && (v.width, y = (e) => {
			d.width = `${String(e.w * t.#t.cvsScale)} px`, this.val.setVal_Nochk("tmp", p + ".width", e.w);
		});
		let b = (e) => {};
		return u && (v.height, b = (e) => {
			d.height = `${String(e.h * t.#t.cvsScale)} px`, this.val.setVal_Nochk("tmp", p + ".height", e.h);
		}), this.appPixi.stage.interactive = !1, x.tween(`frm\n${n}`, e, m, x.cnvTweenArg(e, m), (e) => {
			g(e), _(e), y(e), b(e);
		}, () => {
			this.appPixi.stage.interactive = !0;
		}, () => {}), !1;
	}
}, N = class {
	oCfg;
	hTag;
	val;
	#e = { text: "" };
	#t = [];
	constructor(e, t, n) {
		this.oCfg = e, this.hTag = t, this.val = n, t.rec_ch = (e) => this.#n(e), t.rec_r = (e) => this.#r(e), t.reset_rec = (e) => this.#i(e), n.defTmp("const.sn.log.json", () => {
			this.#e.text = this.#e.text.replaceAll("</span><span class='sn_ch'>", "");
			let e = [...this.#t, this.#e];
			return JSON.stringify(e);
		}), this.recText("");
	}
	recText(e) {
		this.#e.text = e, this.val.setVal_Nochk("save", "const.sn.sLog", String(this.val.getVal("const.sn.log.json")));
	}
	#n(e) {
		return this.#e = {
			...e,
			text: this.#e.text
		}, e.text ? (e.record = !0, e.style ??= "", e.style += "display: none;", e.wait = 0, this.hTag.ch(e)) : (this.val.setVal_Nochk("save", "const.sn.sLog", String(this.val.getVal("const.sn.log.json"))), !1);
	}
	#r(e) {
		return this.#n({
			...e,
			text: "[r]"
		});
	}
	#i(e) {
		return this.#t = [], e.text ??= "", this.#e = { text: e.text }, this.val.setVal_Nochk("save", "const.sn.sLog", JSON.stringify([this.#e])), !1;
	}
	pagebreak() {
		this.#e.text = this.#e.text.replaceAll("</span><span class='sn_ch'>", ""), this.#e.text && (this.#t.push(this.#e) > this.oCfg.log.max_len && (this.#t = this.#t.slice(-this.oCfg.log.max_len)), this.#e = { text: "" });
	}
	playback() {
		this.#t = JSON.parse(String(this.val.getVal("save:const.sn.sLog"))), this.#e = { text: "" };
	}
};
//#endregion
//#region src/sn/LayerMng.ts
function P(e) {
	return encodeURIComponent(JSON.stringify(e));
}
var F = class e {
	cfg;
	hTag;
	appPixi;
	val;
	main;
	scrItr;
	sys;
	#e;
	#t = new i();
	#n = new i();
	#r;
	#i;
	#a;
	#o = new _();
	constructor(e, t, n, r, i, a, o, c, l) {
		this.cfg = e, this.hTag = t, this.appPixi = n, this.val = r, this.main = i, this.scrItr = a, this.sys = o;
		let u = () => {
			if (o.cvsResize(), this.cvsResizeDesign(), this.#l) for (let e of this.#S) this.#x[e].fore.cvsResizeChildren();
			else for (let e of this.#S) this.#x[e].fore.cvsResize();
			this.#r.cvsResize(), this.#f.cvsResize();
		};
		if (h.isMobile) this.#o.add(globalThis, "orientationchange", u, { passive: !0 });
		else {
			let e;
			this.#o.add(globalThis, "resize", () => {
				e ||= setTimeout(() => {
					e = void 0, u();
				}, 1e3 / 60 * 10);
			}, { passive: !0 });
		}
		o.cvsResize(), this.#a = new N(this.cfg.oCfg, t, r), E.init(e, t, r, this.#a, (e) => this.#x[e.layname].fore === e, n), O.init(i, e, n, o, c, r), M.init(e, o, i), this.#r = new M(t, n, r), t.loadplugin = (e) => this.#y(e), t.snapshot = (e) => this.#h(e), this.#g = this.sys.isApp ? (e, t, n, r, i) => this.#_(e, t, n, r, i) : (e, t, n, r, i) => this.#v(e, t, n, r, i), t.add_lay = (e) => this.#b(e), t.clear_lay = (e) => this.#D(e), t.finish_trans = () => !1, t.lay = (e) => this.#T(e), t.trans = (e) => this.#N(e), t.wt = (e) => x.wt(e), t.quake = (e) => this.#L(e), t.stop_quake = t.finish_trans, t.wq = t.wt, t.pause_tsy = (e) => x.pause_tsy(e), t.resume_tsy = (e) => x.resume_tsy(e), t.stop_tsy = (e) => x.stop_tsy(e), t.tsy = (e) => this.#R(e), t.wait_tsy = (e) => x.wait_tsy(e), t.add_filter = (e) => this.#z(e), t.clear_filter = (e) => this.#V(e), t.enable_filter = (e) => this.#H(e), t.ch = (e) => this.#W(e), t.clear_text = (e) => this.#Q(e), t.current = (e) => this.#q(e), t.endlink = (e) => this.#$(e), t.er = (e) => this.#ee(e), t.graph = (e) => this.#te(e), t.link = (e) => this.#ne(e), t.r = (e) => this.#re(e), t.ruby2 = (e) => this.#ie(e), t.span = (e) => this.#ae(e), t.tcy = (e) => this.#oe(e), t.add_face = (e) => C.add_face(e), t.wv = (e) => C.wv(e), t.dump_lay = (e) => this.#se(e), t.enable_event = (e) => this.#ce(e), t.button = (e) => this.#le(e), e.existsBreakline && (this.breakLine = (e) => {
			delete e.visible, e.id = "break", e.pic = "breakline", this.#m("grp｜" + P(e));
		}), e.existsBreakpage && (this.breakPage = (e) => {
			delete e.visible, e.id = "break", e.pic = "breakpage", this.#m("grp｜" + P(e));
		}), this.#i = d(String(e.oCfg.init.bg_color));
		let f = new s();
		f.beginFill(this.#i).lineStyle(0, this.#i).drawRect(0, 0, h.stageW, h.stageH).endFill(), this.#t.addChild(f.clone()), this.#n.addChild(f), this.#n.visible = !1, this.#t.name = "page:A", this.#n.name = "page:B", this.#e = n.stage, this.#e.addChild(this.#n), this.#e.addChild(this.#t), this.#e.addChild(this.#A), this.#e.addChild(this.#M), this.#e.name = "stage";
		let p = (e, t) => {
			this.#p(Number(t));
		};
		p("", r.getVal("sys:TextLayer.Back.Alpha", 1)), r.defValTrg("sys:TextLayer.Back.Alpha", p);
		let m = (e, t) => {
			w.fontFamily = t;
		};
		m("", r.getVal("tmp:sn.button.fontFamily", w.fontFamily)), r.defValTrg("tmp:sn.button.fontFamily", m), r.defTmp("const.sn.last_page_text", () => this.currentTxtlayFore?.pageText ?? ""), r.defTmp("const.sn.last_page_plain_text", () => this.currentTxtlayFore?.pagePlainText ?? ""), h.isDbg && (k.init(n, o, a, l, e, this.#x), this.cvsResizeDesign = () => k.cvsResizeDesign(), o.addHook((e, t) => {
			this.#s[e]?.(e, t) && delete this.#s[e];
		}));
	}
	cvsResizeDesign() {}
	#s = {
		attach: (e) => (k.leaveMode(), !1),
		continue: (e) => (k.leaveMode(), !1),
		disconnect: (e) => (k.leaveMode(), !1),
		_enterDesign: (e) => {
			k.enterMode();
			for (let e of this.#S) {
				let t = this.#x[e].fore;
				t.makeDesignCastChildren((e) => e.make()), t.makeDesignCast((e) => e.make());
			}
			return this.#u(this.#C), !1;
		},
		_replaceToken: (e, t) => (k.replaceToken(t), !1),
		_selectNode: (e, t) => (this.#u(t.node), !1)
	};
	#c = "";
	#l = "";
	#u(e) {
		[this.#c = "", this.#l = ""] = e.split("/");
		let t = this.#x[this.#c];
		t && (k.allHide(), this.#l ? t.fore.showDesignCastChildren() : t.fore.showDesignCast());
	}
	getFrmDisabled = (e) => this.#r.getFrmDisabled(e);
	#d = void 0;
	cover(e, t = 0) {
		this.#d &&= (this.#e.removeChild(this.#d), this.#d.destroy(), void 0), e && this.#e.addChild((this.#d = new s()).beginFill(t).lineStyle(0, t).drawRect(0, 0, h.stageW, h.stageH).endFill());
	}
	#f;
	setEvtMng(e) {
		this.#f = e, this.#r.setEvtMng(e), C.setEvtMng(e), x.init(e);
	}
	destroy() {
		for (let e of Object.values(this.#x)) e.destroy();
		this.#o.clear(), O.destroy(), T.destroy(), D.destroy(), E.destroy(), this.#r.destroy(), x.destroy(), E.msecChWait = 10;
	}
	#p(e) {
		for (let t of this.#S) {
			let { fore: n, back: r } = this.#x[t];
			n instanceof E && (n.chgBackAlpha(e), r.chgBackAlpha(e));
		}
	}
	#m = (e, t = this.currentTxtlayForeNeedErr, n = !0) => t.tagCh("｜&emsp;《" + e + "》");
	goTxt = () => {};
	get needGoTxt() {
		return this.currentTxtlayFore?.needGoTxt ?? !1;
	}
	breakLine = (e) => {};
	breakPage = (e) => {};
	clearBreak() {
		this.currentTxtlayFore && (this.clearBreak = () => this.#m("del｜break"), this.clearBreak());
	}
	clickTxtLay() {
		return this.currentTxtlayFore ? this.#S.map((e) => this.#x[e].fore).some((e) => e instanceof E && e.click()) : !1;
	}
	#h(e) {
		let t = g("-", "_", "", "_"), n = e.fn ? e.fn.startsWith("userdata:/") ? e.fn : `${A + e.fn + t}.png` : `${A}snapshot${t}.png`, r = this.cfg.searchPath(n), i = f(e, "width", h.stageW), a = f(e, "height", h.stageH);
		return this.#g(e, r, i, a, `snapshot dt:${t}`);
	}
	#g = () => !1;
	#_({ layer: e }, t, n, r, i) {
		if (this.#r.hideAllFrame(), S.beginProc(i), !e) return this.sys.capturePage(t, n, r, () => {
			this.#r.restoreAllFrame(), S.endProc(i);
		}), !0;
		let a = this.#S.map((e) => {
			let { ctn: t } = this.#x[e].fore, n = [t, t.visible];
			return t.visible = !1, n;
		});
		for (let t of this.#P(e)) this.#x[t].fore.ctn.visible = !0;
		return this.sys.capturePage(t, n, r, () => {
			for (let [e, t] of a) e.visible = t;
			this.#r.restoreAllFrame(), S.endProc(i);
		}), !0;
	}
	#v(e, n, r, i, a) {
		S.beginProc(a);
		let s = l(e, "b_color", this.#i), c = o({
			width: r,
			height: i,
			backgroundAlpha: s > 16777216 && n.endsWith(".png") ? 0 : 1,
			antialias: m(e, "smoothing", !1),
			preserveDrawingBuffer: !0,
			backgroundColor: s & 16777215,
			autoDensity: !0
		}), u = e.page === "back" ? "back" : "fore", { layer: d } = e;
		return Promise.allSettled(this.#P(d).map((e) => new Promise((t) => this.#x[e][u].snapshot(c, t)))).then(async () => {
			let e = t.create({
				width: c.width,
				height: c.height
			});
			c.render(this.#e, { renderTexture: e }), await this.sys.savePic(n, c.plugins.extract.base64(e)), e.destroy();
			for (let e of this.#P(d)) this.#x[e][u].snapshot_end();
			c.destroy(!0), S.endProc(a);
		}), !0;
	}
	#y(e) {
		let { fn: t } = e;
		if (!t) throw "fnは必須です";
		if (!t.endsWith(".css")) throw "サポートされない拡張子です";
		let n = m(e, "join", !0), r = S.procID + `loadplugin fn:${t}`;
		return n && S.beginProc(r), (async () => {
			let e = await fetch(t);
			if (!e.ok) throw Error("Network response was not ok.");
			p(await e.text()), n && S.endProc(r);
		})(), n;
	}
	#b(e) {
		let { layer: t, class: n } = e;
		if (!t) throw "layerは必須です";
		if (t.includes(",")) throw "layer名に「,」は使えません";
		if (t in this.#x) throw `layer【${t}】はすでにあります`;
		if (!n) throw "clsは必須です";
		let r = { isWait: !1 };
		switch (this.#x[t] = new j(t, n, this.#t, this.#n, e, this.sys, this.val, r), this.#S.push(t), n) {
			case "txt":
				this.#C || (this.#X = () => {}, this.#G = (e) => this.#K(e), this.#q = (e) => this.#J(e), this.hTag.current({ layer: t }), this.goTxt = () => {
					this.#f.isSkipping ? E.msecChWait = 0 : this.setNormalChWait();
					for (let e of this.#S) {
						let t = this.#x[e].fore;
						t instanceof E && this.#m("gotxt｜", t, !1);
					}
				}), this.val.setVal_Nochk("save", "const.sn.layer." + t + ".enabled", !0);
				break;
			case "grp":
				if (this.#w) break;
				this.#w = t;
		}
		return this.scrItr.recodeDesign(e), r.isWait;
	}
	#x = {};
	#S = [];
	#C = "";
	#w = "";
	#T(e) {
		let t = this.#Z(e), n = this.#x[t], r = n.back.ctn, i = n.fore.ctn;
		if (m(e, "float", !1)) this.#n.setChildIndex(r, this.#n.children.length - 1), this.#t.setChildIndex(i, this.#t.children.length - 1), this.#E();
		else if (e.index) f(e, "index", 0) && (this.#n.setChildIndex(r, e.index), this.#t.setChildIndex(i, e.index), this.#E());
		else if (e.dive) {
			let { dive: n } = e, a = 0;
			if (t === n) throw "[lay] 属性 layerとdiveが同じ【" + n + "】です";
			let o = this.#x[n];
			if (!o) throw "[lay] 属性 dive【" + n + "】が不正です。レイヤーがありません";
			let s = o.back, c = o.fore, l = this.#n.getChildIndex(s.ctn), u = this.#t.getChildIndex(c.ctn);
			a = l < u ? l : u, a > this.#n.getChildIndex(r) && --a, this.#t.setChildIndex(i, a), this.#n.setChildIndex(r, a), this.#E();
		}
		return e[":id_tag"] = n.fore.name.slice(0, -7), this.scrItr.recodeDesign(e), n.lay(e);
	}
	#E() {
		this.#S = this.#I();
	}
	#D(e) {
		return this.#F(e, (t) => {
			let n = this.#x[this.#Z({ layer: t })];
			if (e.page === "both") {
				n.fore.clearLay(e), n.back.clearLay(e);
				return;
			}
			n.getPage(e).clearLay(e);
		}), !1;
	}
	static #O = "\nprecision mediump float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform sampler2D rule;\nuniform float vague;\nuniform float tick;\n\nuniform vec4 inputPixel;\nuniform highp vec4 outputFrame;\nvec2 getUV(vec2 coord) {\n	return coord * inputPixel.xy / outputFrame.zw;\n}\n\nvoid main() {\n	vec4 fg = texture2D(uSampler, vTextureCoord);\n	vec4 ru = texture2D(rule, getUV(vTextureCoord));\n\n	float v = ru.r - tick;\n	gl_FragColor = abs(v) < vague\n		? vec4(fg.rgb, 1) *fg.a *(0.5 +v /vague *0.5)\n		: 0.0 <= v ? fg : vec4(0);\n}";
	#k = t.create({
		width: h.stageW,
		height: h.stageH
	});
	#A = new a(this.#k);
	#j = t.create({
		width: h.stageW,
		height: h.stageH
	});
	#M = new a(this.#j);
	#N(t) {
		let { layer: r } = t, i = /* @__PURE__ */ new Set(), a = this.#P(r).map((e) => (i.add(e), this.#x[e].fore)), o = () => {
			[this.#t, this.#n] = [this.#n, this.#t];
			let e = [];
			for (let [t, n] of Object.entries(this.#x)) {
				if (i.has(t)) {
					n.transPage(e);
					continue;
				}
				let { fore: { ctn: r }, back: { ctn: a } } = n, o = this.#t.getChildIndex(a);
				this.#t.removeChild(a), this.#n.removeChild(r), this.#t.addChildAt(r, o), this.#n.addChildAt(a, o);
			}
			Promise.allSettled(e).then(() => {
				this.#t.visible = !0, this.#n.visible = !1, this.#A.visible = !1, this.#M.visible = !1, S.notifyEndProc(b);
			});
		};
		if (this.#M.filters = [], this.#M.alpha = 1, f(t, "time", 0) === 0 || this.#f.isSkipping) return o(), !1;
		let s = [], l = this.#S.map((e) => {
			let { fore: t, back: n } = this.#x[e], r = i.has(e) ? n : t;
			return r.ctn.visible && s.push(r.ctn), r;
		}), { ticker: u, renderer: d } = this.appPixi;
		d.render(this.#n, { renderTexture: this.#k });
		let p = () => {
			for (let e of s) d.render(e, {
				renderTexture: this.#k,
				clear: !1
			});
		};
		if (!l.some((e) => e.containMovement)) {
			let e = p;
			p = () => {
				p = () => {}, e();
			};
		}
		let m = () => d.render(this.#t, { renderTexture: this.#j });
		m();
		let h = () => {
			this.#t.visible = !0, m(), this.#t.visible = !1;
		};
		if (!a.some((e) => e.containMovement)) {
			let e = h;
			h = () => {
				h = () => {}, e();
			};
		}
		let g = () => {
			p(), this.#A.visible = !0, h(), this.#M.visible = !0;
		}, { glsl: _, rule: v } = t, y = () => {
			u.remove(g), o();
		};
		if (!_ && !v) return x.tween(b, t, this.#M, { alpha: 0 }, () => {}, y, () => {}), u.add(g), !1;
		let w = {
			rule: n.EMPTY,
			vague: f(t, "vague", .04),
			tick: 0
		};
		this.#M.filters = [new c(void 0, _ ?? e.#O, w)];
		let T = x.tween(b, t, w, { tick: 1 }, () => {}, y, () => {}, !v);
		return v ? new C(v, void 0, (e) => {
			w.rule = e.texture, e.destroy(), u.add(g), T.start();
		}, (e) => {
			e && this.main.resume();
		}).ret : (u.add(g), !1);
	}
	#P(e = "") {
		return e ? e.split(",") : this.#S;
	}
	#F(e, t) {
		let n = this.#P(e.layer);
		for (let e of n) {
			let n = this.#x[e];
			if (!n) throw `存在しないlayer【${e}】です`;
			t(e, n);
		}
		return n;
	}
	#I(e = "") {
		return this.#P(e).sort((e, t) => {
			let n = this.#t.getChildIndex(this.#x[e].fore.ctn), r = this.#t.getChildIndex(this.#x[t].fore.ctn);
			return n < r ? -1 : +(n > r);
		});
	}
	setAllStyle2TxtLay(e) {
		for (let t of this.#S) {
			let n = this.#x[t].fore;
			n instanceof E && n.lay({ style: e });
		}
	}
	#L(e) {
		if (f(e, "time", NaN) === 0) return !1;
		let t = this.#P(e.layer).map((e) => this.#x[e].fore.ctn), { renderer: n, ticker: r } = this.appPixi;
		this.#j.resize(h.stageW, h.stageH);
		let i = () => {
			this.#t.visible = !0;
			for (let e of t) n.render(e, {
				renderTexture: this.#j,
				clear: !1
			});
			this.#t.visible = !1;
		};
		this.#M.visible = !0, this.#M.alpha = 1;
		let a = u(f(e, "hmax", 10)), o = u(f(e, "vmax", 10)), s = a === 0 ? () => {} : () => {
			this.#M.x = Math.round(Math.random() * a * 2) - a;
		}, c = o === 0 ? () => {} : () => {
			this.#M.y = Math.round(Math.random() * o * 2) - o;
		};
		return this.#M.filters = [], x.tween(b, e, this.#M, {
			x: 0,
			y: 0
		}, () => {
			s(), c();
		}, () => {
			r.remove(i), this.#t.visible = !0, this.#M.visible = !1, this.#M.x = 0, this.#M.y = 0, S.notifyEndProc(b);
		}, () => {}), r.add(i), !1;
	}
	#R(e) {
		let { layer: t, render: n, name: r } = e;
		if (!t) throw "layerは必須です";
		let i = this.#x[this.#Z(e)], a = i.fore, o = () => {};
		n && (this.#f.isSkipping ? a.renderStart(!0) : (a.renderStart(!1), o = () => a.renderEnd()));
		let s = x.cnvTweenArg(e, a), c = m(e, "arrive", !1), l = m(e, "backlay", !1), u = i.back.ctn;
		return x.tween(r ?? t, e, a, x.cnvTweenArg(e, a), () => {}, o, () => {
			if (c && Object.assign(a, s), l) for (let e of x.aLayerPrpNm) u[e] = a[e];
		}), "filter" in e && (a.ctn.filters = [y.bldFilters(e)], a.aFltHArg = [e]), !1;
	}
	#z(e) {
		return this.#F(e, (t) => {
			let n = this.#x[this.#Z({ layer: t })];
			if (e.page === "both") {
				this.#B(n.fore, e), this.#B(n.back, e);
				return;
			}
			let r = n.getPage(e);
			this.#B(r, e);
		}), !1;
	}
	#B(e, t) {
		let n = e.ctn;
		n.filters ??= [], n.filters = [...n.filters, y.bldFilters(t)], e.aFltHArg.push(t);
	}
	#V(e) {
		return this.#F(e, (t) => {
			let n = this.#x[this.#Z({ layer: t })];
			if (e.page === "both") {
				let e = n.fore, t = n.back;
				e.ctn.filters = null, t.ctn.filters = null, e.aFltHArg = [], t.aFltHArg = [];
				return;
			}
			let r = n.getPage(e);
			r.ctn.filters = null, r.aFltHArg = [];
		}), !1;
	}
	#H(e) {
		return this.#F(e, (t) => {
			let n = this.#x[this.#Z({ layer: t })];
			if (e.page === "both") {
				this.#U(n.fore, e), this.#U(n.back, e);
				return;
			}
			let r = n.getPage(e);
			this.#U(r, e);
		}), !1;
	}
	#U(e, t) {
		let n = e.ctn;
		if (!n.filters) throw "フィルターがありません";
		let r = u(f(t, "index", 0)), i = n.filters.length;
		if (i <= r) throw `フィルターの個数（${String(i)}）を越えています`;
		e.aFltHArg[r].enabled = n.filters[r].enabled = m(t, "enabled", !0);
	}
	#W(e) {
		let { text: t } = e;
		if (!t) throw "textは必須です";
		let n = this.#G(e);
		delete e.text, this.setNormalChWait(), this.#f.isSkipping ? e.wait = 0 : "wait" in e && f(e, "wait", NaN), this.#m("add｜" + P(e), n);
		let r = m(e, "record", !0), i = this.val.doRecLog();
		return r || this.val.setVal_Nochk("save", "sn.doRecLog", r), n.tagCh(t.replaceAll("[r]", "\n")), this.val.setVal_Nochk("save", "sn.doRecLog", i), this.#m("add_close｜", n), !1;
	}
	#G = (e) => {
		throw this.#X(), 0;
	};
	#K(e) {
		let t = this.#Z(e, this.#C), n = this.#x[t].getPage(e);
		if (!(n instanceof E)) throw t + "はTxtLayerではありません";
		return n;
	}
	setNormalChWait() {
		E.msecChWait = this.scrItr.normalWait;
	}
	#q = (e) => {
		throw this.#X(), 0;
	};
	#J(e) {
		let { layer: t } = e;
		if (!t) throw "[current] layerは必須です";
		let n = this.#x[t];
		if (!n || !(n.getPage(e) instanceof E)) throw `${t}はTxtLayerではありません`;
		this.#Y = n, this.#a.pagebreak(), this.#C = t, this.val.setVal_Nochk("save", "const.sn.mesLayer", t);
		for (let e of this.#S) {
			let { fore: n, back: r } = this.#x[e];
			n instanceof E && (n.isCur = r.isCur = e === t);
		}
		return !1;
	}
	get currentTxtlayForeNeedErr() {
		return this.#X(), this.currentTxtlayFore;
	}
	get currentTxtlayFore() {
		return this.#Y ? this.#Y.fore : null;
	}
	#Y = void 0;
	#X = () => {
		throw "文字レイヤーがありません。文字表示や操作する前に、[add_lay layer=（レイヤ名） class=txt]で文字レイヤを追加して下さい";
	};
	#Z(e, t = "") {
		let n = e.layer ?? t;
		if (n.includes(",")) throw "layer名に「,」は使えません";
		if (!(n in this.#x)) throw "属性 layer【" + n + "】が不正です。レイヤーがありません";
		return e.layer = n, n;
	}
	recPagebreak() {
		this.#a.pagebreak();
	}
	#Q(e) {
		let t = this.#G(e);
		return e.layer === this.#C && e.page === "fore" && this.#a.pagebreak(), t.clearText(), !1;
	}
	#$(e) {
		return this.#m("endlink｜", this.#G(e)), !1;
	}
	#ee(e) {
		return m(e, "rec_page_break", !0) && this.#a.pagebreak(), this.#Y && (this.#Y.fore.clearLay(e), this.#Y.back.clearLay(e)), !1;
	}
	#te(e) {
		if (!e.pic) throw "[graph] picは必須です";
		return this.#m("grp｜" + P(e), this.#G(e)), !1;
	}
	#ne(e) {
		if (!e.fn && !e.label && !e.url) throw "fn,label,url いずれかは必須です";
		return e.fn ??= this.scrItr.scriptFn, e.style ??= "background-color: rgba(255,0,0,0.5);", e.style_hover ??= "background-color: rgba(255,0,0,0.9);", e.style_clicked ??= e.style, this.#m("link｜" + P(e), this.#G(e)), !1;
	}
	#re(e) {
		return this.#W({
			...e,
			text: "\n"
		});
	}
	#ie(e) {
		let { t, r: n } = e;
		if (!t) throw "[ruby2] tは必須です";
		if (!n) throw "[ruby2] rは必須です";
		return e.text = "｜" + encodeURIComponent(t) + "《" + encodeURIComponent(n) + "》", delete e.t, delete e.r, this.#W(e);
	}
	#ae(e) {
		return this.#m("span｜" + P(e), this.#G(e)), !1;
	}
	#oe(e) {
		if (!e.t) throw "[tcy] tは必須です";
		return this.#m("tcy｜" + P(e), this.#G(e)), !1;
	}
	#se({ layer: e }) {
		console.group("🥟 [dump_lay]");
		for (let t of this.#P(e)) {
			let { fore: e, back: n } = this.#x[t];
			try {
				console.info(`%c${e.name.slice(0, -7)} %o`, `color:#${h.isDarkMode ? "49F" : "05A"};`, JSON.parse(`{"back":{${n.dump()}}, "fore":{${e.dump()}}}`));
			} catch (t) {
				console.error("dump_lay err:%o", t), console.error(`   back:${n.dump()}`), console.error(`   fore:${e.dump()}`);
			}
		}
		return console.groupEnd(), !1;
	}
	#ce(e) {
		let t = this.#Z(e, this.#C), n = m(e, "enabled", !0);
		return this.#G(e).enabled = n, this.val.setVal_Nochk("save", "const.sn.layer." + t + ".enabled", n), !1;
	}
	#le(e) {
		return j.argChk_page(e, "back"), e.fn ??= this.scrItr.scriptFn, this.#G(e).addButton(e), this.scrItr.recodeDesign(e), !1;
	}
	record() {
		let e = {};
		for (let t of this.#S) {
			let n = this.#x[t];
			e[t] = {
				cls: n.cls,
				fore: n.fore.record(),
				back: n.back.record()
			};
		}
		return e;
	}
	playback(e) {
		this.#a.playback();
		let t = [], n = [];
		for (let [r, { fore: i, fore: { idx: a }, back: o, cls: s }] of Object.entries(e)) {
			n.push({
				ln: r,
				idx: a
			});
			let e = this.#x[r] ??= new j(r, s, this.#t, this.#n, {}, this.sys, this.val, { isWait: !1 });
			e.fore.playback(i, t), e.back.playback(o, t);
		}
		let r = this.#t.children.length;
		return t.push(new Promise((e) => {
			for (let { ln: e, idx: t } of n.sort(({ idx: e }, { idx: t }) => e === t ? 0 : e < t ? -1 : 1)) {
				let n = this.#x[e];
				if (!n) continue;
				let i = r > t ? t : r - 1, { fore: a, back: o } = n;
				this.#t.setChildIndex(a.ctn, i), this.#n.setChildIndex(o.ctn, i);
			}
			e();
		})), t;
	}
};
//#endregion
export { F as LayerMng };

//# sourceMappingURL=LayerMng.js.map