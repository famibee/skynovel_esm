import { c as argChk_Color, g as uint, h as parseColor, l as argChk_Num, o as addStyle, s as argChk_Boolean, t as CmnLib, u as getDateStr } from "./CmnLib.js";
import { c as Loader, d as RenderTexture, f as Texture, l as LoaderResource, m as Container, o as Sprite, p as autoDetectRenderer, s as Graphics, u as Filter } from "./pixi.js";
import { t as EventListenerCtn } from "./EventListenerCtn.js";
import { n as SEARCH_PATH_ARG_EXT } from "./ConfigBase.js";
import "./DebugMng.js";
import { n as PROTOCOL_DL, r as PROTOCOL_USERDATA } from "./Config.js";
import { t as Layer } from "./Layer.js";
import { i as TW_NM_TRANS, r as CmnTween, t as Reading } from "./Reading.js";
import { t as SpritesMng } from "./SpritesMng.js";
import { Button } from "./Button.js";
import { t as RubySpliter } from "./RubySpliter.js";
import { TxtLayer, t as TxtStage } from "./TxtLayer.js";
import { GrpLayer, t as DesignCast } from "./GrpLayer.js";
var Pages = class e {
	#e;
	constructor(e, g, _, v, y, x, S, C) {
		this.cls = g, this.hArg = y, this.sys = x, this.val = S, this.ret = C;
		let w = x.hFactoryCls[g];
		if (!w) throw `属性 class【${g}】が不正です`;
		let T = w(), E = w();
		T.layname = E.layname = e;
		let D = y[":id_tag"] = `layer:${e} cls:${g} page:`;
		T.ctn.name = T.name = D + "A", E.ctn.name = E.name = D + "B", _.addChild(T.ctn), v.addChild(E.ctn), argChk_Boolean(y, "visible", !0), argChk_Boolean(y, "visible", !0), C.isWait = T.lay(y) || E.lay(y), this.#e = {
			fore: T,
			back: E
		}, v.visible = !1;
		let O = `const.sn.lay.${e}`;
		S.setVal_Nochk("tmp", O, !0), S.defTmp(O + ".fore.alpha", () => this.#e.fore.alpha), S.defTmp(O + ".back.alpha", () => this.#e.back.alpha), S.defTmp(O + ".fore.height", () => this.#e.fore.height), S.defTmp(O + ".back.height", () => this.#e.back.height), S.defTmp(O + ".fore.visible", () => this.#e.fore.ctn.visible), S.defTmp(O + ".back.visible", () => this.#e.back.ctn.visible), S.defTmp(O + ".fore.width", () => this.#e.fore.width), S.defTmp(O + ".back.width", () => this.#e.back.width), S.defTmp(O + ".fore.x", () => this.#e.fore.x), S.defTmp(O + ".back.x", () => this.#e.back.x), S.defTmp(O + ".fore.y", () => this.#e.fore.y), S.defTmp(O + ".back.y", () => this.#e.back.y);
	}
	destroy() {
		this.#e.fore.destroy(), this.#e.back.destroy();
	}
	lay = (e) => this.getPage(e).lay(e);
	getPage = (g) => e.argChk_page(g, "fore") === "back" ? this.#e.back : this.#e.fore;
	static argChk_page(e, g) {
		let _ = e.page ?? g;
		if (_ === "fore" || _ === "back") return e.page = _, _;
		throw Error("属性 page【" + _ + "】が不正です");
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
}, FrameMng = class e {
	static #e;
	static #t;
	static #n;
	static init(g, _, v) {
		e.#e = g, e.#t = _, e.#n = v;
	}
	constructor(e, g, _) {
		this.appPixi = g, this.val = _, e.add_frame = (e) => this.#o(e), e.let_frame = (e) => this.#f(e), e.set_frame = (e) => this.#p(e), e.frame = (e) => this.#h(e), e.tsy_frame = (e) => this.#g(e);
	}
	#r;
	setEvtMng(e) {
		this.#r = e;
	}
	#i = Object.create(null);
	destroy() {
		for (let e of Object.values(this.#i)) e.parentElement.removeChild(e);
		this.#i = Object.create(null);
	}
	hideAllFrame() {
		for (let [e, { style: g }] of Object.entries(this.#i)) this.#a[e] = g.display !== "none", g.display = "none";
	}
	#a = Object.create(null);
	restoreAllFrame() {
		for (let [e, g] of Object.entries(this.#a)) {
			let _ = this.#i[e];
			_ && (_.style.display = g ? "inline" : "none");
		}
		this.#a = Object.create(null);
	}
	#o(g) {
		let { id: _, src: v, alpha: y = 1, scale_x: x = 1, scale_y: S = 1, rotate: w = 0 } = g;
		if (!_) throw "idは必須です";
		if (!v) throw "srcは必須です";
		let T = "const.sn.frm." + _;
		if (this.val.getVal(`tmp:${T}`)) throw `frame【${_}】はすでにあります`;
		let D = argChk_Boolean(g, "visible", !0), O = g.b_color ? ` background-color: ${g.b_color};` : "", k = this.#c(g);
		e.#n.cvs.insertAdjacentHTML("beforebegin", `<iframe id="${_}" style="opacity: ${String(y)}; ${O} position: absolute; left:${String(e.#t.ofsLeft4elm + k.x * e.#t.cvsScale)}px; top: ${String(e.#t.ofsTop4elm + k.y * e.#t.cvsScale)}px; z-index: 1; border: 0px; overflow: hidden; display: ${D ? "inline" : "none"}; transform: scale(${String(x)}, ${String(S)}) rotate(${String(w)}deg);" width="${String(k.width * e.#t.cvsScale)}" height="${String(k.height * e.#t.cvsScale)}"></iframe>`);
		let A = Reading.procID + `add_frame id:${_}`;
		Reading.beginProc(A);
		let j = e.#e.searchPath(v, SEARCH_PATH_ARG_EXT.HTML), M = new Loader().add({
			name: v,
			url: j,
			xhrType: LoaderResource.XHR_RESPONSE_TYPE.TEXT
		});
		return e.#t.arg.crypto && M.use((g, _) => void e.#t.dec(g.extension, g.data).then((e) => {
			g.data = e, _();
		}).catch((v) => {
			e.#n.errScript(`[add_frame]Html ロード失敗です src:${g.name} ${String(v)}`, !1), _();
		})), M.load((g, b) => {
			let C = document.getElementById(_);
			this.#i[_] = C, this.#s[_] = !1;
			let E = j.lastIndexOf("/") + 1, O = j.slice(0, E), M = O.slice(0, E);
			C.srcdoc = String(b[v]?.data).replace("sn_repRes();", "").replaceAll(/\s(?:src|href)=(["'])(\S+?)\1/g, (e, g, _) => _.startsWith("../") ? M + e.slice(3) : e.replace("./", "").replace(g, g + O)), C.srcdoc.includes("true/*WEBP*/;") && (C.srcdoc = C.srcdoc.replaceAll(/data-src="(.+?\.)(?:jpe?g|png)/g, (e, g) => `data-src="${g}webp`)), C.onload = () => {
				Reading.endProc(A), this.val.setVal_Nochk("tmp", T, !0), this.val.setVal_Nochk("tmp", T + ".alpha", y), this.val.setVal_Nochk("tmp", T + ".x", k.x), this.val.setVal_Nochk("tmp", T + ".y", k.y), this.val.setVal_Nochk("tmp", T + ".scale_x", x), this.val.setVal_Nochk("tmp", T + ".scale_y", S), this.val.setVal_Nochk("tmp", T + ".rotate", w), this.val.setVal_Nochk("tmp", T + ".width", k.width), this.val.setVal_Nochk("tmp", T + ".height", k.height), this.val.setVal_Nochk("tmp", T + ".visible", D);
				let g = C.contentWindow;
				this.#r.resvFlameEvent(g.document.body), g.sn_repRes?.((g) => e.#l(g.dataset.src ?? "", g));
			};
		}), !0;
	}
	#s = {};
	getFrmDisabled(e) {
		return this.#s[e];
	}
	#c(e) {
		let g = { ...e };
		return new DOMRect(argChk_Num(g, "x", 0), argChk_Num(g, "y", 0), argChk_Num(g, "width", CmnLib.stageW), argChk_Num(g, "height", CmnLib.stageH));
	}
	static #l(g, _, v) {
		let y = this.#d[g];
		if (y) {
			_.src = y, v && (_.onload = () => v(_));
			return;
		}
		let b = this.#u[g];
		if (b) {
			b.push(_);
			return;
		}
		this.#u[g] = [_];
		let [x = "", S = ""] = g.split("?"), w = e.#e.searchPath(x, SEARCH_PATH_ARG_EXT.SP_GSM), T = new Loader().add({
			name: g,
			url: w,
			xhrType: LoaderResource.XHR_RESPONSE_TYPE.BUFFER
		});
		e.#t.use4ViteElectron(g, w, T, e.#n) || e.#t.arg.crypto && w.endsWith(".bin") && T.use((g, _) => {
			if (g.extension !== "bin") {
				_();
				return;
			}
			e.#t.decAB(g.data).then((e) => {
				g.data = e, e instanceof HTMLImageElement && (g.type = LoaderResource.TYPE.IMAGE), _();
			}).catch((v) => {
				e.#n.errScript(`FrameMng loadPic ロード失敗です fn:${g.name} ${String(v)}`, !1), _();
			});
		}), T.load((e, g) => {
			for (let [e, { data: { src: _ } }] of Object.entries(g)) {
				let g = this.#d[e] = _ + (_.startsWith("blob:") || _.startsWith("data:") ? "" : S ? "?" + S : ""), y = this.#u[e];
				if (y) for (let e of y) e.src = g, v && (e.onload = () => v(e));
				delete this.#u[e];
			}
		});
	}
	static #u = {};
	static #d = {};
	cvsResize() {
		for (let [g, _] of Object.entries(this.#i)) {
			let v = "const.sn.frm." + g, y = Number(this.val.getVal(v + ".x")), b = Number(this.val.getVal(v + ".y")), x = Number(this.val.getVal(v + ".width")), S = Number(this.val.getVal(v + ".height"));
			_.style.left = `${String(e.#t.ofsLeft4elm + y * e.#t.cvsScale)}px`, _.style.top = `${String(e.#t.ofsTop4elm + b * e.#t.cvsScale)}px`, _.width = String(x * e.#t.cvsScale), _.height = String(S * e.#t.cvsScale);
		}
	}
	#f(e) {
		let { id: g, var_name: _ } = e;
		if (!g) throw "idは必須です";
		let v = document.getElementById(g);
		if (!v) throw `id【${g}】はフレームではありません`;
		let y = "const.sn.frm." + g;
		if (!this.val.getVal(`tmp:${y}`)) throw `frame【${g}】が読み込まれていません`;
		if (!_) throw "var_nameは必須です";
		let x = v.contentWindow;
		if (!Object.hasOwn(x, _)) throw `frame【${g}】に変数/関数【${_}】がありません。変数は var付きにして下さい`;
		let S = x[_];
		return this.val.setVal_Nochk("tmp", y + "." + _, argChk_Boolean(e, "function", !1) ? S() : S), !1;
	}
	#p(e) {
		let { id: g, var_name: _, text: v } = e;
		if (!g) throw "idは必須です";
		let y = document.getElementById(g);
		if (!y) throw `id【${g}】はフレームではありません`;
		let b = "const.sn.frm." + g;
		if (!this.val.getVal(`tmp:${b}`)) throw `frame【${g}】が読み込まれていません`;
		if (!_) throw "var_nameは必須です";
		if (!v) throw "textは必須です";
		this.val.setVal_Nochk("tmp", b + "." + _, v);
		let x = y.contentWindow;
		return x[_] = v, !1;
	}
	#m = 1;
	#h(g) {
		let { id: _ } = g;
		if (!_) throw "idは必須です";
		let y = document.getElementById(_);
		if (!y) throw `id【${_}】はフレームではありません`;
		let x = "const.sn.frm." + _;
		if (!this.val.getVal("tmp:" + x)) throw `frame【${_}】が読み込まれていません`;
		let S = y.style;
		if (argChk_Boolean(g, "float", !1) ? S.zIndex = String(++this.#m) : "index" in g ? S.zIndex = String(argChk_Num(g, "index", 0)) : g.dive && (S.zIndex = String(-++this.#m)), "alpha" in g) {
			let e = S.opacity = String(g.alpha);
			this.val.setVal_Nochk("tmp", x + ".alpha", e);
		}
		let C = this.#c(g);
		if (("x" in g || "y" in g) && (S.left = `${String(e.#t.ofsLeft4elm + C.x * e.#t.cvsScale)}px`, S.top = `${String(e.#t.ofsTop4elm + C.y * e.#t.cvsScale)}px`, this.val.setVal_Nochk("tmp", x + ".x", C.x), this.val.setVal_Nochk("tmp", x + ".y", C.y)), "scale_x" in g || "scale_y" in g || "rotate" in g) {
			let e = argChk_Num(g, "scale_x", 1), _ = argChk_Num(g, "scale_y", 1), y = argChk_Num(g, "rotate", 0);
			S.transform = `scale(${String(e)}, ${String(_)}) rotate(${String(y)}deg)`, this.val.setVal_Nochk("tmp", x + ".scale_x", e), this.val.setVal_Nochk("tmp", x + ".scale_y", _), this.val.setVal_Nochk("tmp", x + ".rotate", y);
		}
		if ("width" in g && (y.width = String(C.width * e.#t.cvsScale), this.val.setVal_Nochk("tmp", x + ".width", C.width)), "height" in g && (y.height = String(C.height * e.#t.cvsScale), this.val.setVal_Nochk("tmp", x + ".height", C.height)), "visible" in g) {
			let e = argChk_Boolean(g, "visible", !0);
			S.display = e ? "inline" : "none", this.val.setVal_Nochk("tmp", x + ".visible", e);
		}
		if ("b_color" in g && (S.backgroundColor = g.b_color), "disabled" in g) {
			let e = this.#s[_] = argChk_Boolean(g, "disabled", !0), v = y.contentDocument.body;
			for (let g of [...Array.from(v.getElementsByTagName("input")), ...Array.from(v.getElementsByTagName("select"))]) g.disabled = e;
		}
		return !1;
	}
	#g(g) {
		let { id: _, alpha: y, x: b, y: x, scale_x: S, scale_y: C, rotate: w, width: T, height: E } = g;
		if (!_) throw "idは必須です";
		let D = document.getElementById(_);
		if (!D) throw `id【${_}】はフレームではありません`;
		let O = "const.sn.frm." + _;
		if (!this.val.getVal(`tmp:${O}`, 0)) throw `frame【${_}】が読み込まれていません`;
		let k = {};
		y && (k.a = Number(D.style.opacity)), (b || x || S || C || w) && (k.x = Number(this.val.getVal(`tmp:${O}.x`)), k.y = Number(this.val.getVal(`tmp:${O}.y`)), k.sx = Number(this.val.getVal(`tmp:${O}.scale_x`)), k.sy = Number(this.val.getVal(`tmp:${O}.scale_y`)), k.r = Number(this.val.getVal(`tmp:${O}.rotate`))), T && (k.w = Number(this.val.getVal(`tmp:${O}.width`))), E && (k.h = Number(this.val.getVal(`tmp:${O}.height`)));
		let A = CmnTween.cnvTweenArg(g, k), j = {}, M = (e) => {};
		y && (j.a = argChk_Num(A, "alpha", 0), M = (e) => {
			D.style.opacity = String(e.a), this.val.setVal_Nochk("tmp", "alpha", e.a);
		});
		let N = (e) => {}, P = this.#c(A);
		(b || x || S || C || w) && (j.x = P.x, j.y = P.y, j.sx = argChk_Num(A, "scale_x", 1), j.sy = argChk_Num(A, "scale_y", 1), j.r = argChk_Num(A, "rotate", 0), N = (g) => {
			D.style.left = `${String(e.#t.ofsLeft4elm + g.x * e.#t.cvsScale)} px`, D.style.top = `${String(e.#t.ofsTop4elm + g.y * e.#t.cvsScale)} px`, D.style.transform = `scale(${String(g.sx)}, ${String(g.sy)}) rotate(${String(g.r)}deg)`, this.val.setVal_Nochk("tmp", O + ".x", g.x), this.val.setVal_Nochk("tmp", O + ".y", g.y), this.val.setVal_Nochk("tmp", O + ".scale_x", g.sx), this.val.setVal_Nochk("tmp", O + ".scale_y", g.sy), this.val.setVal_Nochk("tmp", O + ".rotate", g.r);
		});
		let F = (e) => {};
		T && (j.w = P.width, F = (g) => {
			D.width = `${String(g.w * e.#t.cvsScale)} px`, this.val.setVal_Nochk("tmp", O + ".width", g.w);
		});
		let I = (e) => {};
		return E && (j.h = P.height, I = (g) => {
			D.height = `${String(g.h * e.#t.cvsScale)} px`, this.val.setVal_Nochk("tmp", O + ".height", g.h);
		}), this.appPixi.stage.interactive = !1, CmnTween.tween(`frm\n${_}`, g, k, CmnTween.cnvTweenArg(g, k), (e) => {
			M(e), N(e), F(e), I(e);
		}, () => {
			this.appPixi.stage.interactive = !0;
		}, () => {}), !1;
	}
}, Log = class {
	#e = { text: "" };
	#t = [];
	constructor(e, g, _) {
		this.oCfg = e, this.hTag = g, this.val = _, g.rec_ch = (e) => this.#n(e), g.rec_r = (e) => this.#r(e), g.reset_rec = (e) => this.#i(e), _.defTmp("const.sn.log.json", () => {
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
function cnvSArg(e) {
	return encodeURIComponent(JSON.stringify(e));
}
var LayerMng = class C {
	#e;
	#t = new Container();
	#n = new Container();
	#r;
	#i;
	#a;
	#o = new EventListenerCtn();
	constructor(e, g, v, y, b, S, C, w, T) {
		this.cfg = e, this.hTag = g, this.appPixi = v, this.val = y, this.main = b, this.scrItr = S, this.sys = C;
		let E = () => {
			if (C.cvsResize(), this.cvsResizeDesign(), this.#l) for (let e of this.#S) this.#x[e].fore.cvsResizeChildren();
			else for (let e of this.#S) this.#x[e].fore.cvsResize();
			this.#r.cvsResize(), this.#f.cvsResize();
		};
		if (CmnLib.isMobile) this.#o.add(globalThis, "orientationchange", E, { passive: !0 });
		else {
			let e;
			this.#o.add(globalThis, "resize", () => {
				e ||= setTimeout(() => {
					e = void 0, E();
				}, 1e3 / 60 * 10);
			}, { passive: !0 });
		}
		C.cvsResize(), this.#a = new Log(this.cfg.oCfg, g, y), TxtLayer.init(e, g, y, this.#a, (e) => this.#x[e.layname].fore === e, v), GrpLayer.init(b, e, v, C, w, y), FrameMng.init(e, C, b), this.#r = new FrameMng(g, v, y), g.loadplugin = (e) => this.#y(e), g.snapshot = (e) => this.#h(e), this.#g = this.sys.isApp ? (e, g, _, v, y) => this.#_(e, g, _, v, y) : (e, g, _, v, y) => this.#v(e, g, _, v, y), g.add_lay = (e) => this.#b(e), g.clear_lay = (e) => this.#D(e), g.finish_trans = () => !1, g.lay = (e) => this.#T(e), g.trans = (e) => this.#N(e), g.wt = (e) => CmnTween.wt(e), g.quake = (e) => this.#L(e), g.stop_quake = g.finish_trans, g.wq = g.wt, g.pause_tsy = (e) => CmnTween.pause_tsy(e), g.resume_tsy = (e) => CmnTween.resume_tsy(e), g.stop_tsy = (e) => CmnTween.stop_tsy(e), g.tsy = (e) => this.#R(e), g.wait_tsy = (e) => CmnTween.wait_tsy(e), g.add_filter = (e) => this.#z(e), g.clear_filter = (e) => this.#V(e), g.enable_filter = (e) => this.#H(e), g.ch = (e) => this.#W(e), g.clear_text = (e) => this.#Q(e), g.current = (e) => this.#q(e), g.endlink = (e) => this.#$(e), g.er = (e) => this.#ee(e), g.graph = (e) => this.#te(e), g.link = (e) => this.#ne(e), g.r = (e) => this.#re(e), g.ruby2 = (e) => this.#ie(e), g.span = (e) => this.#ae(e), g.tcy = (e) => this.#oe(e), g.add_face = (e) => SpritesMng.add_face(e), g.wv = (e) => SpritesMng.wv(e), g.dump_lay = (e) => this.#se(e), g.enable_event = (e) => this.#ce(e), g.button = (e) => this.#le(e), e.existsBreakline && (this.breakLine = (e) => {
			delete e.visible, e.id = "break", e.pic = "breakline", this.#m("grp｜" + cnvSArg(e));
		}), e.existsBreakpage && (this.breakPage = (e) => {
			delete e.visible, e.id = "break", e.pic = "breakpage", this.#m("grp｜" + cnvSArg(e));
		}), this.#i = parseColor(String(e.oCfg.init.bg_color));
		let D = new Graphics();
		D.beginFill(this.#i).lineStyle(0, this.#i).drawRect(0, 0, CmnLib.stageW, CmnLib.stageH).endFill(), this.#t.addChild(D.clone()), this.#n.addChild(D), this.#n.visible = !1, this.#t.name = "page:A", this.#n.name = "page:B", this.#e = v.stage, this.#e.addChild(this.#n), this.#e.addChild(this.#t), this.#e.addChild(this.#A), this.#e.addChild(this.#M), this.#e.name = "stage";
		let O = (e, g) => {
			this.#p(Number(g));
		};
		O("", y.getVal("sys:TextLayer.Back.Alpha", 1)), y.defValTrg("sys:TextLayer.Back.Alpha", O);
		let k = (e, g) => {
			Button.fontFamily = g;
		};
		k("", y.getVal("tmp:sn.button.fontFamily", Button.fontFamily)), y.defValTrg("tmp:sn.button.fontFamily", k), y.defTmp("const.sn.last_page_text", () => this.currentTxtlayFore?.pageText ?? ""), y.defTmp("const.sn.last_page_plain_text", () => this.currentTxtlayFore?.pagePlainText ?? ""), CmnLib.isDbg && (DesignCast.init(v, C, S, T, e, this.#x), this.cvsResizeDesign = () => DesignCast.cvsResizeDesign(), C.addHook((e, g) => {
			this.#s[e]?.(e, g) && delete this.#s[e];
		}));
	}
	cvsResizeDesign() {}
	#s = {
		attach: (e) => (DesignCast.leaveMode(), !1),
		continue: (e) => (DesignCast.leaveMode(), !1),
		disconnect: (e) => (DesignCast.leaveMode(), !1),
		_enterDesign: (e) => {
			DesignCast.enterMode();
			for (let e of this.#S) {
				let g = this.#x[e].fore;
				g.makeDesignCastChildren((e) => e.make()), g.makeDesignCast((e) => e.make());
			}
			return this.#u(this.#C), !1;
		},
		_replaceToken: (e, g) => (DesignCast.replaceToken(g), !1),
		_selectNode: (e, g) => (this.#u(g.node), !1)
	};
	#c = "";
	#l = "";
	#u(e) {
		[this.#c = "", this.#l = ""] = e.split("/");
		let g = this.#x[this.#c];
		g && (DesignCast.allHide(), this.#l ? g.fore.showDesignCastChildren() : g.fore.showDesignCast());
	}
	getFrmDisabled = (e) => this.#r.getFrmDisabled(e);
	#d = void 0;
	cover(e, g = 0) {
		this.#d &&= (this.#e.removeChild(this.#d), this.#d.destroy(), void 0), e && this.#e.addChild((this.#d = new Graphics()).beginFill(g).lineStyle(0, g).drawRect(0, 0, CmnLib.stageW, CmnLib.stageH).endFill());
	}
	#f;
	setEvtMng(e) {
		this.#f = e, this.#r.setEvtMng(e), SpritesMng.setEvtMng(e), CmnTween.init(e);
	}
	destroy() {
		for (let e of Object.values(this.#x)) e.destroy();
		this.#o.clear(), GrpLayer.destroy(), RubySpliter.destroy(), TxtStage.destroy(), TxtLayer.destroy(), this.#r.destroy(), CmnTween.destroy(), TxtLayer.msecChWait = 10;
	}
	#p(e) {
		for (let g of this.#S) {
			let { fore: _, back: v } = this.#x[g];
			_ instanceof TxtLayer && (_.chgBackAlpha(e), v.chgBackAlpha(e));
		}
	}
	#m = (e, g = this.currentTxtlayForeNeedErr, _ = !0) => g.tagCh("｜&emsp;《" + e + "》");
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
		return this.currentTxtlayFore ? this.#S.map((e) => this.#x[e].fore).some((e) => e instanceof TxtLayer && e.click()) : !1;
	}
	#h(e) {
		let g = getDateStr("-", "_", "", "_"), _ = e.fn ? e.fn.startsWith("userdata:/") ? e.fn : `${PROTOCOL_DL + e.fn + g}.png` : `${PROTOCOL_DL}snapshot${g}.png`, y = this.cfg.searchPath(_), b = argChk_Num(e, "width", CmnLib.stageW), C = argChk_Num(e, "height", CmnLib.stageH);
		return this.#g(e, y, b, C, `snapshot dt:${g}`);
	}
	#g = () => !1;
	#_({ layer: e }, g, _, v, y) {
		if (this.#r.hideAllFrame(), Reading.beginProc(y), !e) return this.sys.capturePage(g, _, v, () => {
			this.#r.restoreAllFrame(), Reading.endProc(y);
		}), !0;
		let b = this.#S.map((e) => {
			let { ctn: g } = this.#x[e].fore, _ = [g, g.visible];
			return g.visible = !1, _;
		});
		for (let g of this.#P(e)) this.#x[g].fore.ctn.visible = !0;
		return this.sys.capturePage(g, _, v, () => {
			for (let [e, g] of b) e.visible = g;
			this.#r.restoreAllFrame(), Reading.endProc(y);
		}), !0;
	}
	#v(g, _, v, y, x) {
		Reading.beginProc(x);
		let S = argChk_Color(g, "b_color", this.#i), C = autoDetectRenderer({
			width: v,
			height: y,
			backgroundAlpha: S > 16777216 && _.endsWith(".png") ? 0 : 1,
			antialias: argChk_Boolean(g, "smoothing", !1),
			preserveDrawingBuffer: !0,
			backgroundColor: S & 16777215,
			autoDensity: !0
		}), T = g.page === "back" ? "back" : "fore", { layer: E } = g;
		return Promise.allSettled(this.#P(E).map((e) => new Promise((g) => this.#x[e][T].snapshot(C, g)))).then(async () => {
			let e = RenderTexture.create({
				width: C.width,
				height: C.height
			});
			C.render(this.#e, { renderTexture: e }), await this.sys.savePic(_, C.plugins.extract.base64(e)), e.destroy();
			for (let e of this.#P(E)) this.#x[e][T].snapshot_end();
			C.destroy(!0), Reading.endProc(x);
		}), !0;
	}
	#y(e) {
		let { fn: g } = e;
		if (!g) throw "fnは必須です";
		if (!g.endsWith(".css")) throw "サポートされない拡張子です";
		let _ = argChk_Boolean(e, "join", !0), v = Reading.procID + `loadplugin fn:${g}`;
		return _ && Reading.beginProc(v), (async () => {
			let e = await fetch(g);
			if (!e.ok) throw Error("Network response was not ok.");
			addStyle(await e.text()), _ && Reading.endProc(v);
		})(), _;
	}
	#b(e) {
		let { layer: g, class: _ } = e;
		if (!g) throw "layerは必須です";
		if (g.includes(",")) throw "layer名に「,」は使えません";
		if (g in this.#x) throw `layer【${g}】はすでにあります`;
		if (!_) throw "clsは必須です";
		let v = { isWait: !1 };
		switch (this.#x[g] = new Pages(g, _, this.#t, this.#n, e, this.sys, this.val, v), this.#S.push(g), _) {
			case "txt":
				this.#C || (this.#X = () => {}, this.#G = (e) => this.#K(e), this.#q = (e) => this.#J(e), this.hTag.current({ layer: g }), this.goTxt = () => {
					this.#f.isSkipping ? TxtLayer.msecChWait = 0 : this.setNormalChWait();
					for (let e of this.#S) {
						let g = this.#x[e].fore;
						g instanceof TxtLayer && this.#m("gotxt｜", g, !1);
					}
				}), this.val.setVal_Nochk("save", "const.sn.layer." + g + ".enabled", !0);
				break;
			case "grp":
				if (this.#w) break;
				this.#w = g;
				break;
		}
		return this.scrItr.recodeDesign(e), v.isWait;
	}
	#x = {};
	#S = [];
	#C = "";
	#w = "";
	#T(e) {
		let g = this.#Z(e), _ = this.#x[g], y = _.back.ctn, x = _.fore.ctn;
		if (argChk_Boolean(e, "float", !1)) this.#n.setChildIndex(y, this.#n.children.length - 1), this.#t.setChildIndex(x, this.#t.children.length - 1), this.#E();
		else if (e.index) argChk_Num(e, "index", 0) && (this.#n.setChildIndex(y, e.index), this.#t.setChildIndex(x, e.index), this.#E());
		else if (e.dive) {
			let { dive: _ } = e, v = 0;
			if (g === _) throw "[lay] 属性 layerとdiveが同じ【" + _ + "】です";
			let b = this.#x[_];
			if (!b) throw "[lay] 属性 dive【" + _ + "】が不正です。レイヤーがありません";
			let S = b.back, C = b.fore, w = this.#n.getChildIndex(S.ctn), T = this.#t.getChildIndex(C.ctn);
			v = w < T ? w : T, v > this.#n.getChildIndex(y) && --v, this.#t.setChildIndex(x, v), this.#n.setChildIndex(y, v), this.#E();
		}
		return e[":id_tag"] = _.fore.name.slice(0, -7), this.scrItr.recodeDesign(e), _.lay(e);
	}
	#E() {
		this.#S = this.#I();
	}
	#D(e) {
		return this.#F(e, (g) => {
			let _ = this.#x[this.#Z({ layer: g })];
			if (e.page === "both") {
				_.fore.clearLay(e), _.back.clearLay(e);
				return;
			}
			_.getPage(e).clearLay(e);
		}), !1;
	}
	static #O = "\nprecision mediump float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform sampler2D rule;\nuniform float vague;\nuniform float tick;\n\nuniform vec4 inputPixel;\nuniform highp vec4 outputFrame;\nvec2 getUV(vec2 coord) {\n	return coord * inputPixel.xy / outputFrame.zw;\n}\n\nvoid main() {\n	vec4 fg = texture2D(uSampler, vTextureCoord);\n	vec4 ru = texture2D(rule, getUV(vTextureCoord));\n\n	float v = ru.r - tick;\n	gl_FragColor = abs(v) < vague\n		? vec4(fg.rgb, 1) *fg.a *(0.5 +v /vague *0.5)\n		: 0.0 <= v ? fg : vec4(0);\n}";
	#k = RenderTexture.create({
		width: CmnLib.stageW,
		height: CmnLib.stageH
	});
	#A = new Sprite(this.#k);
	#j = RenderTexture.create({
		width: CmnLib.stageW,
		height: CmnLib.stageH
	});
	#M = new Sprite(this.#j);
	#N(e) {
		let { layer: g } = e, _ = /* @__PURE__ */ new Set(), y = this.#P(g).map((e) => (_.add(e), this.#x[e].fore)), b = () => {
			[this.#t, this.#n] = [this.#n, this.#t];
			let e = [];
			for (let [g, v] of Object.entries(this.#x)) {
				if (_.has(g)) {
					v.transPage(e);
					continue;
				}
				let { fore: { ctn: y }, back: { ctn: b } } = v, x = this.#t.getChildIndex(b);
				this.#t.removeChild(b), this.#n.removeChild(y), this.#t.addChildAt(y, x), this.#n.addChildAt(b, x);
			}
			Promise.allSettled(e).then(() => {
				this.#t.visible = !0, this.#n.visible = !1, this.#A.visible = !1, this.#M.visible = !1, Reading.notifyEndProc(TW_NM_TRANS);
			});
		};
		if (this.#M.filters = [], this.#M.alpha = 1, argChk_Num(e, "time", 0) === 0 || this.#f.isSkipping) return b(), !1;
		let x = [], S = this.#S.map((e) => {
			let { fore: g, back: v } = this.#x[e], y = _.has(e) ? v : g;
			return y.ctn.visible && x.push(y.ctn), y;
		}), { ticker: w, renderer: E } = this.appPixi;
		E.render(this.#n, { renderTexture: this.#k });
		let D = () => {
			for (let e of x) E.render(e, {
				renderTexture: this.#k,
				clear: !1
			});
		};
		if (!S.some((e) => e.containMovement)) {
			let e = D;
			D = () => {
				D = () => {}, e();
			};
		}
		let O = () => E.render(this.#t, { renderTexture: this.#j });
		O();
		let k = () => {
			this.#t.visible = !0, O(), this.#t.visible = !1;
		};
		if (!y.some((e) => e.containMovement)) {
			let e = k;
			k = () => {
				k = () => {}, e();
			};
		}
		let A = () => {
			D(), this.#A.visible = !0, k(), this.#M.visible = !0;
		}, { glsl: M, rule: N } = e, P = () => {
			w.remove(A), b();
		};
		if (!M && !N) return CmnTween.tween(TW_NM_TRANS, e, this.#M, { alpha: 0 }, () => {}, P, () => {}), w.add(A), !1;
		let F = {
			rule: Texture.EMPTY,
			vague: argChk_Num(e, "vague", .04),
			tick: 0
		};
		this.#M.filters = [new Filter(void 0, M ?? C.#O, F)];
		let I = CmnTween.tween(TW_NM_TRANS, e, F, { tick: 1 }, () => {}, P, () => {}, !N);
		return N ? new SpritesMng(N, void 0, (e) => {
			F.rule = e.texture, e.destroy(), I.start(), w.add(A);
		}, (e) => {
			e && this.main.resume();
		}).ret : (w.add(A), !1);
	}
	#P(e = "") {
		return e ? e.split(",") : this.#S;
	}
	#F(e, g) {
		let _ = this.#P(e.layer);
		for (let e of _) {
			let _ = this.#x[e];
			if (!_) throw `存在しないlayer【${e}】です`;
			g(e, _);
		}
		return _;
	}
	#I(e = "") {
		return this.#P(e).sort((e, g) => {
			let _ = this.#t.getChildIndex(this.#x[e].fore.ctn), v = this.#t.getChildIndex(this.#x[g].fore.ctn);
			return _ < v ? -1 : _ > v ? 1 : 0;
		});
	}
	setAllStyle2TxtLay(e) {
		for (let g of this.#S) {
			let _ = this.#x[g].fore;
			_ instanceof TxtLayer && _.lay({ style: e });
		}
	}
	#L(e) {
		if (argChk_Num(e, "time", NaN) === 0) return !1;
		let _ = this.#P(e.layer).map((e) => this.#x[e].fore.ctn), { renderer: y, ticker: b } = this.appPixi;
		this.#j.resize(CmnLib.stageW, CmnLib.stageH);
		let S = () => {
			this.#t.visible = !0;
			for (let e of _) y.render(e, {
				renderTexture: this.#j,
				clear: !1
			});
			this.#t.visible = !1;
		};
		this.#M.visible = !0, this.#M.alpha = 1;
		let C = uint(argChk_Num(e, "hmax", 10)), w = uint(argChk_Num(e, "vmax", 10)), T = C === 0 ? () => {} : () => {
			this.#M.x = Math.round(Math.random() * C * 2) - C;
		}, E = w === 0 ? () => {} : () => {
			this.#M.y = Math.round(Math.random() * w * 2) - w;
		};
		return this.#M.filters = [], CmnTween.tween(TW_NM_TRANS, e, this.#M, {
			x: 0,
			y: 0
		}, () => {
			T(), E();
		}, () => {
			b.remove(S), this.#t.visible = !0, this.#M.visible = !1, this.#M.x = 0, this.#M.y = 0, Reading.notifyEndProc(TW_NM_TRANS);
		}, () => {}), b.add(S), !1;
	}
	#R(e) {
		let { layer: g, render: _, name: v } = e;
		if (!g) throw "layerは必須です";
		let y = this.#x[this.#Z(e)], x = y.fore, S = () => {};
		_ && (this.#f.isSkipping ? x.renderStart(!0) : (x.renderStart(!1), S = () => x.renderEnd()));
		let C = CmnTween.cnvTweenArg(e, x), w = argChk_Boolean(e, "arrive", !1), T = argChk_Boolean(e, "backlay", !1), E = y.back.ctn;
		return CmnTween.tween(v ?? g, e, x, CmnTween.cnvTweenArg(e, x), () => {}, S, () => {
			if (w && Object.assign(x, C), T) for (let e of CmnTween.aLayerPrpNm) E[e] = x[e];
		}), "filter" in e && (x.ctn.filters = [Layer.bldFilters(e)], x.aFltHArg = [e]), !1;
	}
	#z(e) {
		return this.#F(e, (g) => {
			let _ = this.#x[this.#Z({ layer: g })];
			if (e.page === "both") {
				this.#B(_.fore, e), this.#B(_.back, e);
				return;
			}
			let v = _.getPage(e);
			this.#B(v, e);
		}), !1;
	}
	#B(e, g) {
		let _ = e.ctn;
		_.filters ??= [], _.filters = [..._.filters, Layer.bldFilters(g)], e.aFltHArg.push(g);
	}
	#V(e) {
		return this.#F(e, (g) => {
			let _ = this.#x[this.#Z({ layer: g })];
			if (e.page === "both") {
				let e = _.fore, g = _.back;
				e.ctn.filters = null, g.ctn.filters = null, e.aFltHArg = [], g.aFltHArg = [];
				return;
			}
			let v = _.getPage(e);
			v.ctn.filters = null, v.aFltHArg = [];
		}), !1;
	}
	#H(e) {
		return this.#F(e, (g) => {
			let _ = this.#x[this.#Z({ layer: g })];
			if (e.page === "both") {
				this.#U(_.fore, e), this.#U(_.back, e);
				return;
			}
			let v = _.getPage(e);
			this.#U(v, e);
		}), !1;
	}
	#U(e, _) {
		let y = e.ctn;
		if (!y.filters) throw "フィルターがありません";
		let x = uint(argChk_Num(_, "index", 0)), S = y.filters.length;
		if (S <= x) throw `フィルターの個数（${String(S)}）を越えています`;
		e.aFltHArg[x].enabled = y.filters[x].enabled = argChk_Boolean(_, "enabled", !0);
	}
	#W(e) {
		let { text: g } = e;
		if (!g) throw "textは必須です";
		let _ = this.#G(e);
		delete e.text, this.setNormalChWait(), this.#f.isSkipping ? e.wait = 0 : "wait" in e && argChk_Num(e, "wait", NaN), this.#m("add｜" + cnvSArg(e), _);
		let y = argChk_Boolean(e, "record", !0), x = this.val.doRecLog();
		return y || this.val.setVal_Nochk("save", "sn.doRecLog", y), _.tagCh(g.replaceAll("[r]", "\n")), this.val.setVal_Nochk("save", "sn.doRecLog", x), this.#m("add_close｜", _), !1;
	}
	#G = (e) => {
		throw this.#X(), 0;
	};
	#K(e) {
		let g = this.#Z(e, this.#C), _ = this.#x[g].getPage(e);
		if (!(_ instanceof TxtLayer)) throw g + "はTxtLayerではありません";
		return _;
	}
	setNormalChWait() {
		TxtLayer.msecChWait = this.scrItr.normalWait;
	}
	#q = (e) => {
		throw this.#X(), 0;
	};
	#J(e) {
		let { layer: g } = e;
		if (!g) throw "[current] layerは必須です";
		let _ = this.#x[g];
		if (!_ || !(_.getPage(e) instanceof TxtLayer)) throw `${g}はTxtLayerではありません`;
		this.#Y = _, this.#a.pagebreak(), this.#C = g, this.val.setVal_Nochk("save", "const.sn.mesLayer", g);
		for (let e of this.#S) {
			let { fore: _, back: v } = this.#x[e];
			_ instanceof TxtLayer && (_.isCur = v.isCur = e === g);
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
	#Z(e, g = "") {
		let _ = e.layer ?? g;
		if (_.includes(",")) throw "layer名に「,」は使えません";
		if (!(_ in this.#x)) throw "属性 layer【" + _ + "】が不正です。レイヤーがありません";
		return e.layer = _, _;
	}
	recPagebreak() {
		this.#a.pagebreak();
	}
	#Q(e) {
		let g = this.#G(e);
		return e.layer === this.#C && e.page === "fore" && this.#a.pagebreak(), g.clearText(), !1;
	}
	#$(e) {
		return this.#m("endlink｜", this.#G(e)), !1;
	}
	#ee(e) {
		return argChk_Boolean(e, "rec_page_break", !0) && this.#a.pagebreak(), this.#Y && (this.#Y.fore.clearLay(e), this.#Y.back.clearLay(e)), !1;
	}
	#te(e) {
		if (!e.pic) throw "[graph] picは必須です";
		return this.#m("grp｜" + cnvSArg(e), this.#G(e)), !1;
	}
	#ne(e) {
		if (!e.fn && !e.label && !e.url) throw "fn,label,url いずれかは必須です";
		return e.fn ??= this.scrItr.scriptFn, e.style ??= "background-color: rgba(255,0,0,0.5);", e.style_hover ??= "background-color: rgba(255,0,0,0.9);", e.style_clicked ??= e.style, this.#m("link｜" + cnvSArg(e), this.#G(e)), !1;
	}
	#re(e) {
		return this.#W({
			...e,
			text: "\n"
		});
	}
	#ie(e) {
		let { t: g, r: _ } = e;
		if (!g) throw "[ruby2] tは必須です";
		if (!_) throw "[ruby2] rは必須です";
		return e.text = "｜" + encodeURIComponent(g) + "《" + encodeURIComponent(_) + "》", delete e.t, delete e.r, this.#W(e);
	}
	#ae(e) {
		return this.#m("span｜" + cnvSArg(e), this.#G(e)), !1;
	}
	#oe(e) {
		if (!e.t) throw "[tcy] tは必須です";
		return this.#m("tcy｜" + cnvSArg(e), this.#G(e)), !1;
	}
	#se({ layer: e }) {
		console.group("🥟 [dump_lay]");
		for (let g of this.#P(e)) {
			let { fore: e, back: _ } = this.#x[g];
			try {
				console.info(`%c${e.name.slice(0, -7)} %o`, `color:#${CmnLib.isDarkMode ? "49F" : "05A"};`, JSON.parse(`{"back":{${_.dump()}}, "fore":{${e.dump()}}}`));
			} catch (g) {
				console.error("dump_lay err:%o", g), console.error(`   back:${_.dump()}`), console.error(`   fore:${e.dump()}`);
			}
		}
		return console.groupEnd(), !1;
	}
	#ce(e) {
		let g = this.#Z(e, this.#C), _ = argChk_Boolean(e, "enabled", !0);
		return this.#G(e).enabled = _, this.val.setVal_Nochk("save", "const.sn.layer." + g + ".enabled", _), !1;
	}
	#le(e) {
		return Pages.argChk_page(e, "back"), e.fn ??= this.scrItr.scriptFn, this.#G(e).addButton(e), this.scrItr.recodeDesign(e), !1;
	}
	record() {
		let e = {};
		for (let g of this.#S) {
			let _ = this.#x[g];
			e[g] = {
				cls: _.cls,
				fore: _.fore.record(),
				back: _.back.record()
			};
		}
		return e;
	}
	playback(e) {
		this.#a.playback();
		let g = [], _ = [];
		for (let [v, { fore: y, fore: { idx: b }, back: x, cls: S }] of Object.entries(e)) {
			_.push({
				ln: v,
				idx: b
			});
			let e = this.#x[v] ??= new Pages(v, S, this.#t, this.#n, {}, this.sys, this.val, { isWait: !1 });
			e.fore.playback(y, g), e.back.playback(x, g);
		}
		let v = this.#t.children.length;
		return g.push(new Promise((e) => {
			for (let { ln: e, idx: g } of _.sort(({ idx: e }, { idx: g }) => e === g ? 0 : e < g ? -1 : 1)) {
				let _ = this.#x[e];
				if (!_) continue;
				let y = v > g ? g : v - 1, { fore: b, back: x } = _;
				this.#t.setChildIndex(b.ctn, y), this.#n.setChildIndex(x.ctn, y);
			}
			e();
		})), g;
	}
};
export { LayerMng };

//# sourceMappingURL=LayerMng.js.map