import { f as e, h as t, m as n, o as r, s as i } from "./pixi.js";
import { a, c as o, f as s, g as c, l, o as u, s as d, t as f } from "./CmnLib.js";
import { n as p } from "./ConfigBase.js";
import { t as m } from "./DebugMng.js";
import { t as h } from "./Layer.js";
import { a as g, r as _, t as v } from "./Reading.js";
import { t as y } from "./SpritesMng.js";
import { Button as b } from "./Button.js";
import { t as x } from "./RubySpliter.js";
//#region src/sn/Hyphenation.ts
var S = "、。，．）］｝〉」』】〕”〟ぁぃぅぇぉっゃゅょゎァィゥェォッャュョヮヵヶ！？!?‼⁉・ーゝゞヽヾ々", C = "［（｛〈「『【〔“〝", w = "─‥…", T = S, E = RegExp(`[${S}]`), D = RegExp(`[${C}]`), O = RegExp(`[${w}]`), k = E, A = class {
	#e = S;
	#t = C;
	#n = w;
	#r = T;
	get 行頭禁則() {
		return this.#e;
	}
	get 行末禁則() {
		return this.#t;
	}
	get 分割禁止() {
		return this.#n;
	}
	get ぶら下げ() {
		return this.#r;
	}
	#i = E;
	#a = D;
	#o = O;
	#s = k;
	break_fixed = !1;
	break_fixed_left = 0;
	break_fixed_top = 0;
	bura = !1;
	lay(e) {
		e.kinsoku_sol && (this.#e = e.kinsoku_sol, this.#i = RegExp(`[${this.#e}]`)), e.kinsoku_eol && (this.#t = e.kinsoku_eol, this.#c(), this.#a = RegExp(`[${this.#t}]`)), e.kinsoku_dns && (this.#n = e.kinsoku_dns, this.#l(), this.#o = RegExp(`[${this.#n}]`)), e.kinsoku_bura && (this.#r = e.kinsoku_bura, this.#c(), this.#l(), this.#s = RegExp(`[${this.#r}]`)), "bura" in e && (this.bura = d(e, "bura", !1)), this.break_fixed = d(e, "break_fixed", this.break_fixed), this.break_fixed_left = l(e, "break_fixed_left", this.break_fixed_left), this.break_fixed_top = l(e, "break_fixed_top", this.break_fixed_top);
	}
	#c() {
		let e = this.#t.length, t = this.#r.length;
		if (e < t) for (let t = 0; t < e; ++t) {
			let e = this.#t[t];
			if (this.#r.includes(e)) throw `禁則の競合があります。文字 ${String(e)} がぶら下げ と 行末禁則 の両方に含まれます`;
		}
		else for (let e = 0; e < t; ++e) {
			let t = this.#r[e];
			if (this.#t.includes(t)) throw `禁則の競合があります。文字 ${String(t)} がぶら下げ と 行末禁則 の両方に含まれます`;
		}
	}
	#l() {
		let e = this.#n.length, t = this.#r.length;
		if (e < t) for (let t = 0; t < e; ++t) {
			let e = this.#n[t];
			if (this.#r.includes(e)) throw `禁則の競合があります。文字 ${String(e)} がぶら下げ と 分割禁止 の両方に含まれます`;
		}
		else for (let e = 0; e < t; ++e) {
			let t = this.#r[e];
			if (this.#n.includes(t)) throw `禁則の競合があります。文字 ${String(t)} がぶら下げ と 分割禁止 の両方に含まれます`;
		}
	}
	reNew(e) {
		e.#u(this.#e, this.#t, this.#n, this.#r), e.break_fixed = this.break_fixed, e.break_fixed_left = this.break_fixed_left, e.break_fixed_top = this.break_fixed_top, e.bura = this.bura;
	}
	#u(e, t, n, r) {
		this.#e !== e && (this.#e = e, this.#i = RegExp(`[${e}]`)), this.#t !== t && (this.#t = t, this.#a = RegExp(`[${t}]`)), this.#n !== n && (this.#n = n, this.#o = RegExp(`[${n}]`)), this.#r !== r && (this.#r = r, this.#s = RegExp(`[${r}]`));
	}
	record() {
		let e = {
			break_fixed: this.break_fixed,
			break_fixed_left: this.break_fixed_left,
			break_fixed_top: this.break_fixed_top,
			bura: this.bura
		};
		return this.#e === S && (e.行頭禁則 = this.#e), this.#t === C && (e.行末禁則 = this.#t), this.#n === w && (e.分割禁止 = this.#n), this.#r === T && (e.ぶら下げ = this.#r), e;
	}
	playback(e) {
		e && (this.#u(e.行頭禁則 ?? S, e.行末禁則 ?? C, e.分割禁止 ?? w, e.ぶら下げ ?? T), this.break_fixed = e.break_fixed, this.break_fixed_left = e.break_fixed_left, this.break_fixed_top = e.break_fixed_top, this.bura = e.bura);
	}
	hyph(e, t, n, r, i) {
		let a, o = 0, s = 2, c = (t) => (c = () => !1, r === t ? (r > 0 && (e.innerHTML = i.replaceAll("class=\"sn_ch\"", "class=\"sn_ch sn_ch_in_default\"")), !0) : t < 2);
		do {
			if (a = this.#f(e, t), o = a.length, c(o)) break;
			let r = -Infinity;
			for (; s < o; ++s) {
				let { elm: e, rect: t, ch: i } = a[s];
				if (e.tagName === "RT") continue;
				let c = n ? t.y : t.x;
				if (r <= c || e.previousElementSibling?.tagName === "SPAN" && e.previousElementSibling?.innerHTML.includes("<br>") || e.parentElement?.previousElementSibling?.tagName === "SPAN" && e.parentElement?.previousElementSibling?.innerHTML.includes("<br>")) {
					r = c, this.break_fixed || (this.break_fixed_left = t.x, this.break_fixed_top = t.y);
					continue;
				}
				let l = this.#d(a, s), { elm: u, rect: d, ch: f } = a[l];
				if (!this.break_fixed) {
					this.break_fixed_left = d.x, this.break_fixed_top = d.y;
					let e = globalThis.getComputedStyle(u), t = parseFloat(e.fontSize);
					n ? this.break_fixed_top += t : this.break_fixed_left += t;
				}
				r = -Infinity;
				let p = s, { cont: m, ins: h } = this.bura ? this.hyph_alg_bura(a, l, f, s) : this.hyph_alg(a, l, f, s, i);
				if (s = h, m) continue;
				let g = a[s].elm, _ = g.parentElement, v = document.createElement("br");
				if (_.classList.contains("sn_tx")) _.insertBefore(v, g);
				else {
					let e = _.parentElement;
					e.classList.contains("sn_ch") ? e.parentElement.insertBefore(v, e) : e.insertBefore(v, _);
				}
				s += 2, s < p && (s = p), o = -1;
				break;
			}
		} while (o < 0);
		return [a, o];
	}
	#d(e, t) {
		let n = t - 1, { elm: r } = e[n];
		return r.tagName === "RT" ? n - Array.from(r.textContent).length : n - (r.style.textCombineUpright === "all" ? Array.from(r.textContent).length - 1 : 0);
	}
	#f(e, t) {
		let n = [];
		if (e.nodeType !== e.TEXT_NODE) return Array.from(e.childNodes).map((e) => this.#f(e, t)).flat();
		let r = e.ownerDocument.createRange();
		r.selectNodeContents(e);
		let i = 0, a = r.endOffset;
		for (; i < a;) {
			r.setStart(e, i), r.setEnd(e, ++i);
			let a = r.toString();
			n.push({
				ch: a,
				rect: t(r, a),
				elm: r.startContainer.parentElement
			});
		}
		return r.detach(), n;
	}
	hyph_alg(e, t, n, r, i) {
		let a = r;
		if (!this.#a.test(n)) {
			if (this.#i.test(i)) for (; (a = this.#d(e, a)) >= 0 && this.#i.test(e[a].ch););
			else if (!(n === i && this.#o.test(n))) return {
				cont: !0,
				ins: a + 1
			};
		}
		for (a = t; (a = this.#d(e, a)) >= 0 && this.#a.test(e[a].ch););
		return {
			cont: !1,
			ins: a + 1
		};
	}
	hyph_alg_bura(e, t, n, r) {
		let i = this.#d(e, t), { ch: a } = e[i];
		if (this.#s.test(a) || this.#i.test(a)) {
			let r = t;
			(this.#s.test(n) || this.#i.test(n)) && ++r;
			let i = this.#d(e, r), { ch: a } = e[i], { ch: o } = e[r];
			if (a === o && this.#o.test(o)) return {
				cont: !1,
				ins: i
			};
			if (!this.#a.test(a)) return {
				cont: !1,
				ins: r
			};
			r = i;
			do
				if (!this.#a.test(e[r].ch)) break;
			while ((r = this.#d(e, r)) >= 0);
			return {
				cont: !1,
				ins: r + 1
			};
		}
		let o = this.#d(e, i);
		if (r >= 3) {
			let { ch: t } = e[o];
			if (this.#o.test(a) && t === a) return {
				cont: !1,
				ins: o
			};
			if (this.#a.test(t)) {
				let t = o;
				for (; (t = this.#d(e, t)) >= 0 && this.#a.test(e[t].ch););
				return {
					cont: !1,
					ins: t + 1
				};
			}
		}
		return {
			cont: !1,
			ins: i
		};
	}
};
//#endregion
//#region src/sn/htm2tx.ts
function j(t, n, r, i, a, o = !0) {
	let s = {
		mimeType: (e) => {
			let t = f(e).toLowerCase();
			return c()[t] || "";
		},
		dataAsUrl: _,
		isDataUrl: p,
		resolveUrl: h,
		getAndEncode: g,
		asArray: (e) => {
			let t = [], n = e.length;
			for (let r = 0; r < n; ++r) t.push(e[r]);
			return t;
		}
	};
	function c() {
		let e = "application/font-woff", t = "image/jpeg";
		return {
			woff: e,
			woff2: e,
			ttf: "application/font-truetype",
			eot: "application/vnd.ms-fontobject",
			png: "image/png",
			jpg: t,
			jpeg: t,
			gif: "image/gif",
			tiff: "image/tiff",
			svg: "image/svg+xml"
		};
	}
	let l = v(), u = y();
	function d(e) {
		return u.resolveAll().then((t) => {
			let n = document.createElement("style");
			return e.appendChild(n), n.appendChild(document.createTextNode(t)), e;
		});
	}
	function f(e) {
		return /\.([^./]*?)$/g.exec(e)?.[1] ?? "";
	}
	function p(e) {
		return e.search(/^(data:)/) !== -1;
	}
	function h(e, t) {
		let n = document.implementation.createHTMLDocument(), r = n.createElement("base");
		n.head.appendChild(r);
		let i = n.createElement("a");
		return n.body.appendChild(i), r.href = t, i.href = e, i.href;
	}
	function g(e) {
		return new Promise(function(t) {
			let n = new XMLHttpRequest();
			n.onreadystatechange = r, n.ontimeout = i, n.responseType = "blob", n.timeout = 3e4, n.open("GET", e, !0), n.send();
			function r() {
				if (n.readyState !== 4) return;
				if (n.status !== 200) {
					a("cannot fetch resource: " + e + ", status: " + n.status);
					return;
				}
				let r = new FileReader();
				r.onloadend = function() {
					let e = r.result.toString().split(/,/)[1];
					t(e);
				}, r.readAsDataURL(n.response);
			}
			function i() {
				a("timeout of 30000ms occured while fetching resource: " + e);
			}
			function a(e) {
				console.error(e), t("");
			}
		});
	}
	function _(e, t) {
		return "data:" + t + ";base64," + e;
	}
	function v() {
		let e = /url\(['"]?([^'"]+?)['"]?\)/g;
		return {
			inlineAll: i,
			shouldProcess: t
		};
		function t(t) {
			return t.search(e) !== -1;
		}
		function n(t) {
			let n = [], r;
			for (; r = e.exec(t);) n.push(r[1]);
			return n.filter(function(e) {
				return !s.isDataUrl(e);
			});
		}
		function r(e, t, n, r) {
			return Promise.resolve(t).then((e) => n ? s.resolveUrl(e, n) : e).then(r || s.getAndEncode).then((e) => s.dataAsUrl(e, s.mimeType(t))).then((n) => e.replace(i(t), "$1" + n + "$3"));
			function i(e) {
				return RegExp("(url\\(['\"]?)(" + RegExp.escape(e) + ")(['\"]?\\))", "g");
			}
		}
		function i(e, i, a) {
			if (o()) return Promise.resolve(e);
			return Promise.resolve(e).then(n).then((t) => {
				let n = Promise.resolve(e);
				for (let e of t) n = n.then((t) => r(t, e, i, a));
				return n;
			});
			function o() {
				return !t(e);
			}
		}
	}
	function y() {
		return {
			resolveAll: e,
			impl: { readAll: t }
		};
		function e() {
			return t().then((e) => Promise.allSettled(e.map((e) => e.resolve()))).then((e) => e.join("\n"));
		}
		function t() {
			return Promise.resolve(s.asArray(document.styleSheets)).then(t).then(e).then((e) => e.map(n));
			function e(e) {
				return e.filter((e) => e.type === CSSRule.FONT_FACE_RULE).filter((e) => l.shouldProcess(e.style.getPropertyValue("src")));
			}
			function t(e) {
				let t = [];
				for (let n of e) try {
					if (n.href) continue;
					s.asArray(n.cssRules || []).forEach(t.push.bind(t));
				} catch (e) {
					console.error("Error while reading CSS rules from " + n.href, String(e));
				}
				return t;
			}
			function n(e) {
				return {
					resolve: function() {
						let t = (e.parentStyleSheet || {}).href;
						return l.inlineAll(e.cssText, t);
					},
					src() {
						return e.style.getPropertyValue("src");
					}
				};
			}
		}
	}
	Promise.resolve(n).then((e) => {
		let t = e.cloneNode(!0);
		return t.style.padding = "0px", t.style.paddingRight = i + "px", t.style.paddingTop = a + "px", t.style.left = "0px", t.style.top = "0px", t.style.width = r.$width - r.pad_left - r.pad_right + "px", t.style.height = r.$height - r.pad_top - r.pad_bottom + "px", n.hidden = o, t;
	}).then(d).then((e) => {
		e.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
		let t = new Image();
		return t.src = `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="${String(r.$width)}px" height="${String(r.$height)}px"><foreignObject x="0" y="0" width="100%" height="100%">${new XMLSerializer().serializeToString(e).replaceAll("#", "%23").replaceAll("\n", "%0A")}</foreignObject></svg>`, new Promise((e) => {
			t.onload = () => e(t);
		});
	}).then((e) => new Promise((t) => setTimeout(() => t(e), 100))).then((n) => {
		let i = document.createElement("canvas");
		i.width = r.$width, i.height = r.$height, i.getContext("2d").drawImage(n, 0, 0), t(e.from(i));
	}).catch((e) => m.myTrace(`goTxt() = ${String(e)}`));
}
//#endregion
//#region src/sn/TxtStage.ts
var M = class e extends n {
	ctn;
	canFocus;
	sys;
	static #e;
	static #t;
	static init(t, n) {
		e.#e = t, e.#t = n;
	}
	static #n = /* @__PURE__ */ new Set();
	static #r;
	static #i;
	static setEvtMng(t, n) {
		e.#r = t, e.#i = n;
	}
	static destroy() {
		for (let t of e.#n) t.kill();
		e.#n.clear(), e.#D = Object.create(null), e.#k = Object.create(null), e.delBreak();
	}
	#a = document.createElement("span");
	#o = new n();
	#s = new i();
	static #c = {
		"background-color": 0,
		"border-bottom-width": 0,
		"border-left-width": 0,
		"border-right-width": 0,
		"border-top-width": 0,
		"margin-bottom": 0,
		"margin-left": 0,
		"margin-right": 0,
		"margin-top": 0
	};
	#l = new A();
	noticeCompTxt = () => {};
	#u;
	constructor(t, n, r) {
		super(), this.ctn = t, this.canFocus = n, this.sys = r, this.#a.classList.add("sn_tx"), this.#a.style.position = "absolute", e.#t.view.parentElement.appendChild(this.#a), this.addChild(this.#o), this.addChild(this.#s), this.#s.name = "grpDbgMasume";
		let i = f.debugLog ? ({ ch: e, rect: { x: t, y: n, width: r, height: i } }) => console.log(`🍌 masume ch:${e} x:${String(t)} y:${String(n)} w:${String(r)} h:${String(i)}`) : () => {};
		this.#u = e.#e.oCfg.debug.masume ? (e) => {
			i(e);
			let { x: t, y: n, width: r, height: a } = e.rect;
			this.#s.beginFill(6737151, .5).lineStyle(2, 16724736, 1).drawRect(t, n, r, a).endFill();
		} : () => {}, this.noticeCompTxt = r.isApp && e.#e.oCfg.debug.dumpHtm ? () => {
			v.notifyEndProc(a);
			let n = this.#a.innerHTML;
			if (n === "") return;
			let { fn: i, ln: o } = e.#i.nowScrFnLn(), s = `dumpHtm ${t.name.slice(0, -7).replaceAll(":", "=")}(fn=${i} line=${String(o)})`;
			r.outputFile(r.path_downloads + s + ".htm", `<!doctype html><html><head><meta charset=utf-8><title>${s}</title>
<h1>${s}</h1>${n.replaceAll(/ class="sn_ch"|animation-delay: \d+ms; ?| data-add="{&quot;ch_in_style&quot;:&quot;default&quot;, &quot;ch_out_style&quot;:&quot;default&quot;}"/g, "").replaceAll(" style=\"\"", "").replaceAll(/(<\/?ruby>)/g, "\n$1\n").replaceAll(/<(br|\/span)>/g, "<$1>\n")}`);
		} : () => v.notifyEndProc(a);
	}
	#d = {
		fontsize: 24,
		$width: 0,
		$height: 0,
		pad_left: 0,
		pad_right: 0,
		pad_top: 0,
		pad_bottom: 0
	};
	lay(t) {
		let n = this.#a.style;
		if ("style" in t) {
			if (t.style) {
				let r = document.createElement("span");
				r.style.cssText = t.style;
				let i = r.style.length;
				for (let t = 0; t < i; ++t) {
					let i = r.style[t];
					if (i in e.#c) {
						m.myTrace(`${String(i)}は指定できません`, "W");
						continue;
					}
					n[i] = r.style[i];
				}
				!r.style.opacity && "alpha" in t && (n.opacity = String(this.ctn.alpha));
			} else this.#a.style.cssText = "";
		} else "alpha" in t && (n.opacity = String(this.ctn.alpha));
		if ("width" in t && (n.width = String(t.width ?? "0") + "px"), "height" in t && (n.height = String(t.height ?? "0") + "px"), "pl" in t && (n.paddingLeft = String(t.pl ?? "0") + "px"), "pr" in t && (n.paddingRight = String(t.pr ?? "0") + "px"), "pt" in t && (n.paddingTop = String(t.pt ?? "0") + "px"), "pb" in t && (n.paddingBottom = String(t.pb ?? "0") + "px"), this.#l.lay(t), this.#p(), this.#h = this.ctn.position.x, n.transformOrigin = `${String(this.ctn.pivot.x)}px ${String(this.ctn.pivot.y)}px`, this.cvsResize(), n.display = this.ctn.visible ? "inline" : "none", ":redraw" in t && this.#x > 0) {
			let e = [this.#a.innerHTML.replaceAll(/(animation-delay: )\d+ms/g, "$10ms"), "<span class='sn_ch' data-add='{\"ch_in_style\":\"default\"}'>&emsp;</span>"];
			this.#I(), this.goTxt(e, !0);
		}
	}
	#f = 0;
	#p() {
		let e = this.#a.style, t = parseFloat(e.fontSize || "0");
		this.#d.fontsize = t, this.#d.pad_left = parseFloat(e.paddingLeft || "0"), this.#d.pad_right = parseFloat(e.paddingRight || "0"), this.#d.pad_top = parseFloat(e.paddingTop || "0"), this.#d.pad_bottom = parseFloat(e.paddingBottom || "0"), this.#d.$width = parseFloat(e.width || "0"), this.#d.$height = parseFloat(e.height || "0"), this.position.set(this.#d.pad_left, this.#d.pad_top), this.#g = e.writingMode === "vertical-rl", this.#_ = 0, this.#v = 0;
		let n = e.lineHeight ?? "0";
		this.#f = this.#g ? 0 : (n.endsWith("px") ? parseFloat(n) : t * parseFloat(n) - t) / 2;
	}
	cvsResize() {
		let e = this.#a.style, t = this.sys.cvsScale;
		e.left = `${String(this.sys.ofsLeft4elm + this.#h * t)}px`, e.top = `${String(this.sys.ofsTop4elm + this.ctn.position.y * t)}px`, e.transform = `rotate(${String(this.ctn.angle)}deg) scale(${String(this.ctn.scale.x * t)}, ${String(this.ctn.scale.y * t)})`, this.#m && (e.zIndex = this.#m);
	}
	#m = "";
	setDomZ(e) {
		this.#m = String(e), this.#a.style.zIndex = this.#m;
	}
	#h = 0;
	#g = !1;
	get tategaki() {
		return this.#g;
	}
	#_ = 0;
	#v = 0;
	get infTL() {
		return this.#d;
	}
	get getWidth() {
		return this.#d.$width;
	}
	get getHeight() {
		return this.#d.$height;
	}
	setMySize(e, t) {
		this.#d.$width = e, this.#d.$height = t, this.#a.style.width = String(this.#d.$width) + "px", this.#a.style.height = String(this.#d.$height) + "px";
	}
	#y = [];
	goTxt(e, t) {
		let n = () => this.#C(e, t);
		this.#y.push(n) === 1 && n();
	}
	#b = [];
	#x = 0;
	static #S = "<span class='sn_ch sn_ch_last'>&emsp;</span>";
	#C(i, a) {
		e.#j.visible = !1;
		let o = this.#b.length, s = "";
		if (o === 0) {
			if (e.#e.oCfg.debug.masume && (f.debugLog && console.log(`🍌 masume ${this.name} v:${String(this.visible)} l:${String(this.x)} t:${String(this.y)} a:${String(this.alpha)} pl:${String(this.#d.pad_left)} pr:${String(this.#d.pad_right)} pt:${String(this.#d.pad_top)} pb:${String(this.#d.pad_bottom)} w:${String(this.#d.$width)} h:${String(this.#d.$height)}`), this.#s.clear().beginFill(3407616, .2).lineStyle(1, 3407616, 1).drawRect(-this.#d.pad_left, -this.#d.pad_top, this.#d.$width, this.#d.$height).endFill().beginFill(13311, .2).lineStyle(2, 13311, 1).drawRect(0, 0, this.#d.$width - this.#d.pad_left - this.#d.pad_right, this.#d.$height - this.#d.pad_top - this.#d.pad_bottom).endFill()), this.#a.innerHTML = [...i].join("").replaceAll(/[\n\t]/g, "") + e.#S, !this.#l.break_fixed) {
				let e = globalThis.getComputedStyle(this.#a), t = parseFloat(e.fontSize);
				this.#g ? (this.#l.break_fixed_left = (this.#d.$width - this.#d.pad_left - this.#d.pad_right - t * 1.5) * this.sys.cvsScale, this.#l.break_fixed_top = 0) : (this.#l.break_fixed_left = 0, this.#l.break_fixed_top = t / 2 * this.sys.cvsScale);
			}
		} else s = this.#a.innerHTML, --o, this.#a.getElementsByClassName("sn_ch_last").item(0)?.remove(), this.#a.querySelectorAll(":scope > br").forEach((e) => e.remove()), this.#a.insertAdjacentHTML("beforeend", i.slice(this.#x).join("").replaceAll(/[\n\t]/g, "") + e.#S);
		this.#a.querySelectorAll(".sn_ch:has(> ruby)").forEach((e) => {
			e.style.background = "";
		}), this.#x = i.length;
		let c = this.sys.cvsScale, l = this.#a.getBoundingClientRect(), u = l.left + this.#d.pad_left, p = l.top + this.#d.pad_top, m;
		if (c === 1) m = (e, n) => {
			let r = e.getBoundingClientRect();
			return new t(r.left - u, r.top - p, r.width, r.height + ("gjqy".includes(n) ? this.#f : 0));
		};
		else {
			let e = this.sys.ofsPadLeft_Dom2PIXI + l.left * (1 - c), n = this.sys.ofsPadTop_Dom2PIXI + l.top * (1 - c);
			m = (r, i) => {
				let a = r.getBoundingClientRect();
				return new t((a.left - e) / c - u, (a.top - n) / c - p, a.width / c, (a.height + ("gjqy".includes(i) ? this.#f : 0)) / c);
			};
		}
		let [h, g] = this.#l.hyph(this.#a, m, this.#g, o, s);
		this.#b = h;
		let v = _.ease(this.#N);
		for (let t = o; t < g; ++t) {
			let i = this.#b[t], { elm: { dataset: a, parentElement: o }, rect: s } = i, c = JSON.parse(a.arg ?? "{\"delay\": 0}"), l = JSON.parse(a.add ?? "{}"), u = e.#D[l.ch_in_style];
			if (this.#u(i), a.cmd === "grp") {
				let e = new n();
				this.#o.addChild(e), new y(c.pic, e, (t) => {
					this.#T(e, c, l, s, v, u ?? {}), e.parent || e.removeChild(t);
				});
			}
			if (a.lnk) {
				let n = o.closest("[data-arg]"), i = JSON.parse(n.dataset.arg ?? "{}");
				i.key = `lnk=[${String(t)}] ` + this.name;
				let a = new r();
				this.#T(a, i, l, s, v, u ?? {});
				let c = i.style ?? "", f = c + (i.style_hover ?? ""), p = c + (i.style_clicked ?? ""), m = i.r_style ?? "", h = m + (i.r_style_hover ?? ""), g = m + (i.r_style_clicked ?? ""), _ = Array.from(n.getElementsByTagName("rt"));
				for (let e of _) e.dataset.st_r_bk = e.style.cssText;
				let y = n.style.cssText, b = (e, t) => {
					n.style.cssText = y + e;
					for (let e of _) e.style.cssText = e.dataset.st_r_bk + t;
				};
				d(i, "enabled", !0) ? e.#r.button(i, a, () => b(c, m), () => this.canFocus() ? (b(f, h), !0) : !1, () => b(p, g)) : b(c + (i.style_disable ?? "color: gray;"), m + (i.r_style_disable ?? "color: gray;")), this.#o.addChild(a);
			}
		}
		let b = Array.from(this.#a.getElementsByClassName("sn_ch_yet"));
		this.#w = () => {
			this.#w = () => !1;
			for (let e of b) e.className = "sn_ch";
			e.#j.position.set(this.#l.break_fixed_left, this.#l.break_fixed_top), e.#j.visible = !0, this.noticeCompTxt();
			let t = this.#y.shift();
			return this.#y.length > 0 && t(), !0;
		};
		for (let e of b) e.className = e.className.replace("sn_ch_yet sn", "go");
		o > 0 && ++o;
		let x;
		for (let e = g - 2; e >= 0; --e) {
			let { elm: t } = this.#b[e];
			if (t.tagName === "SPAN") {
				x = t.parentElement?.tagName === "RUBY" ? t.parentElement.parentElement ?? t : t;
				break;
			}
		}
		if (!x || a || o === g) {
			this.#w();
			return;
		}
		let S = () => {
			x.removeEventListener("animationend", S), this.#w();
		};
		x.addEventListener("animationend", S, {
			once: !0,
			signal: this.#F.signal
		});
	}
	#w = () => !1;
	#T(t, n, r, i, a, o) {
		t.alpha = 0, n.x && (i.x = n.x.startsWith("=") ? i.x + parseInt(n.x.slice(1)) : parseInt(n.x)), n.y && (i.y = n.y.startsWith("=") ? i.y + parseInt(n.y.slice(1)) : parseInt(n.y)), n.width && (i.width = parseInt(n.width)), n.height && (i.height = parseInt(n.height)), n.wait && (o.wait = n.wait), t.width = i.width, t.height = i.height, o.x ? t.position.set(o.x.startsWith("=") ? i.x + t.width * o.nx : o.nx, o.y.startsWith("=") ? i.y + t.height * o.ny : o.ny) : t.position.set(i.x, i.y);
		let s = new g(t).to({
			alpha: 1,
			x: i.x,
			y: i.y,
			width: i.width,
			height: i.height,
			angle: 0
		}, o.wait ?? 0).easing(a).delay((r.wait ?? 0) + (n.delay ?? 0)).onComplete(() => {
			c.tw = void 0;
		}).start();
		e.#n.add(s);
		let c = {
			sp: t,
			tw: s
		};
		this.#E.push(c);
	}
	#E = [];
	skipChIn() {
		let e = this.#w();
		for (let t of this.#E) t.tw && (t.tw.stop().end(), e = !0);
		return this.#E = [], e;
	}
	static #D = Object.create(null);
	static #O = /[{\s.,*{]/;
	static initChStyle() {
		e.#D = Object.create(null), e.#k = Object.create(null);
	}
	static getChInStyle(t) {
		return e.#D[t];
	}
	static ch_in_style(t) {
		return e.#A(t, e.#D, !0);
	}
	static #k = Object.create(null);
	static getChOutStyle(t) {
		return e.#k[t];
	}
	static ch_out_style(t) {
		return e.#A(t, e.#k, !1);
	}
	static #A(t, n, r) {
		let { name: i } = t;
		if (!i) throw "nameは必須です";
		if (e.#O.test(i)) throw `name【${i}】に使えない文字が含まれます`;
		if (i in n) throw `name【${i}】はすでにあります`;
		let a = String(t.x ?? "=0"), o = String(t.y ?? "=0");
		return n[i] = {
			wait: l(t, "wait", 500),
			alpha: l(t, "alpha", 0),
			x: a,
			y: o,
			nx: parseFloat(a.at(0) === "=" ? a.slice(1) : a),
			ny: parseFloat(o.at(0) === "=" ? o.slice(1) : o),
			scale_x: l(t, "scale_x", 1),
			scale_y: l(t, "scale_y", 1),
			rotate: l(t, "rotate", 0),
			join: d(t, "join", r),
			ease: t.ease ?? "ease-out"
		};
	}
	static #j = new n();
	static #M = new y();
	dispBreak(t) {
		e.delBreak();
		let n = e.#j;
		n.visible = !1, this.addChild(n), e.#M.destroy(), e.#M = new y(t.pic, n, (e) => {
			n.parent ? (e.x = l(t, "x", 0), e.y = l(t, "y", 0), e.width = l(t, "width", this.#d.fontsize), e.height = l(t, "height", this.#d.fontsize)) : n.removeChild(e);
		});
	}
	static delBreak() {
		let t = e.#j;
		t.parent?.removeChild(t), e.#M.destroy();
	}
	#N = "Quadratic.Out";
	#P = "Quadratic.Out";
	#F = new AbortController();
	#I() {
		this.#s.clear(), this.#b = [], this.#x = 0, this.#y = [], this.#F.abort(), this.#F = new AbortController(), this.skipChIn();
		let t = document.createElement("span");
		t.style.cssText = this.#a.style.cssText, t.classList.value = this.#a.classList.value;
		let r = this.#a, i = Array.from(r.getElementsByClassName("sn_ch"));
		r.parentElement.insertBefore(t, r);
		let a = 0;
		i.forEach((t) => {
			let n = JSON.parse(t.dataset.add ?? t.children[0]?.getAttribute("data-add") ?? t.children[0]?.children[0]?.getAttribute("data-add") ?? "{}");
			if (!n.ch_out_style) return;
			let r = e.#k[n.ch_out_style];
			if (r) {
				if (r.wait === 0) {
					t.style.display = "none";
					return;
				}
				a += r.wait, r.join || (t.style.animationDelay = "0ms"), t.classList.add(`go_ch_out_${String(n.ch_out_style)}`);
			}
		});
		let o = () => {
			r.parentElement.removeChild(r);
			for (let t of this.#o.removeChildren()) t instanceof n && e.#r.unButton(t), t.destroy();
		};
		if (a === 0) this.#a.textContent = "", this.#a = document.createElement("span"), o();
		else {
			let e = r.lastElementChild;
			if (e) {
				let t = () => {
					e.removeEventListener("animationend", t), o();
				};
				e.addEventListener("animationend", t, {
					once: !0,
					signal: this.#F.signal
				});
			} else o();
		}
		this.#a = t;
	}
	reNew() {
		this.#I();
		let t = new e(this.ctn, this.canFocus, this.sys);
		return t.#d = this.#d, t.#a.style.cssText = this.#a.style.cssText, t.#h = this.#h, t.name = this.name, t.#p(), t.#L = this.#L, t.#N = this.#N, t.#P = this.#P, this.#l.reNew(t.#l), this.destroy(), t;
	}
	#L = void 0;
	record() {
		return {
			infTL: this.#d,
			cssText: this.#a.style.cssText,
			left: this.#h,
			ch_filter: this.#L,
			fi_easing: this.#N,
			fo_easing: this.#P,
			hyph: this.#l.record()
		};
	}
	playback(e) {
		this.#d = e.infTL, this.position.set(this.#d.pad_left, this.#d.pad_top), this.#a.style.cssText = e.cssText, this.#h = e.left, this.#p(), this.#L = e.ch_filter, this.#N = e.fi_easing, this.#P = e.fo_easing, this.#l.playback(e.hyph);
	}
	get cssText() {
		return this.#a.style.cssText;
	}
	set cssText(e) {
		this.#a.style.cssText = e;
	}
	#R = void 0;
	snapshot(e, n) {
		j((i) => {
			this.#R = r.from(i), this.#g && (this.#R.x += f.stageW - (this.#h + this.#d.$width)), this.#R.y -= this.#v, this.#R.texture.frame = new t(0, 0, Math.min(this.#R.width, this.#d.$width - this.#h), Math.min(this.#R.height, this.#d.$height)), this.#o.addChild(this.#R), e.render(this.#R, { clear: !1 }), n();
		}, this.#a, this.#d, this.#_, this.#v, !1);
	}
	snapshot_end() {
		this.#R &&= (this.#o.removeChild(this.#R), void 0);
	}
	makeDesignCast(e) {}
	showDesignCast() {}
	dump() {
		let e = [], t = this.#a.style, n = t.length;
		for (let r = 0; r < n; ++r) {
			let n = t[r];
			e.push(`"${String(n)}":"${t[n].replaceAll(/(["\\])/g, "\\$1")}"`);
		}
		return `"txt":"${this.#a.textContent.replaceAll(/(["\\])/g, "\\$1")}", "style":{${e.join(",")}}`;
	}
	destroy() {
		e.delBreak(), this.#a.parentElement.removeChild(this.#a), this.#a = document.createElement("span"), this.removeChild(this.#o), this.removeChild(this.#s), this.#s.clear(), this.#u = () => {}, this.#y = [], this.#b = [], this.#x = 0, this.#E = [], this.#F.abort(), this.#L = void 0, super.destroy();
	}
}, N = class e extends h {
	static #e;
	static #t;
	static #n;
	static #r;
	static init(e, t, n, r, i, a) {
		this.#e = e, M.init(e, a), this.#t = n, this.#r = r, this.#n = i, n.setDoRecProc((e) => this.chgDoRec(e)), t.autowc = (e) => this.#f(e), t.autowc({
			enabled: !1,
			text: "",
			time: 0
		}), t.ch_in_style = (e) => this.#a(e), t.ch_out_style = (e) => this.#o(e), M.initChStyle(), s(), u(e.matchPath(".+", p.FONT).flatMap((e) => Object.values(e).map((e) => `
@font-face {
	font-family: '${String(e)}';
	src: url('${this.#e.searchPath(String(e), p.FONT)}');
}
`)).join("") + "\n.sn_tx {\n	pointer-events: none;\n	user-select: none;\n	-webkit-touch-callout: none;\n	box-sizing: border-box;\n}\n.sn_ch {\n	position: relative;\n	display: inline-block;\n}\n"), this.#a({
			name: "default",
			wait: 500,
			alpha: 0,
			x: "=0.3",
			y: "=0",
			scale_x: 1,
			scale_y: 1,
			rotate: 0,
			join: !0,
			ease: "ease-out"
		}), this.#o({
			name: "default",
			wait: 0,
			alpha: 0,
			x: "=0",
			y: "=0",
			scale_x: 1,
			scale_y: 1,
			rotate: 0,
			join: !1,
			ease: "ease-out"
		});
	}
	static #i(e, t) {
		return e.startsWith("=") ? `${String(t * 100)}%` : `${String(t)}px`;
	}
	static #a(t) {
		let { x: n, y: r, nx: i, ny: a, alpha: o, wait: s, ease: c, rotate: l, scale_x: d, scale_y: f } = M.ch_in_style(t), p = e.#i(n, i), m = e.#i(r, a), { name: h = "" } = t;
		return u(`
.sn_ch_in_${h} {
	position: relative;
	display: inline-block;
}
.go_ch_in_${h} {
	opacity: ${String(o)};
	position: relative;
	display: inline-block;
	animation: sn_ch_in_${h} ${String(s)}ms ${c} 0s both;
}
@keyframes sn_ch_in_${h} {
	from {transform: rotate(${String(l)}deg) scale(${String(d)}, ${String(f)}) translate(${p}, ${m})}
	to {opacity: 1; transform: none;}
}
`), !1;
	}
	static #o(t) {
		let { x: n, y: r, nx: i, ny: a, alpha: o, wait: s, ease: c, rotate: l, scale_x: d, scale_y: f } = M.ch_out_style(t), p = e.#i(n, i), m = e.#i(r, a), { name: h = "" } = t;
		return u(`
.go_ch_out_${h} {
	position: relative;
	display: inline-block;
	animation: go_ch_out_${h} ${String(s)}ms ${c} 0s both;
}
@keyframes go_ch_out_${h} {
	to {
		opacity: ${String(o)};
		transform: rotate(${String(l)}deg) scale(${String(d)}, ${String(f)}) translate(${p}, ${m});
	}
`), !1;
	}
	static #s = 10;
	static set msecChWait(t) {
		e.#s = t;
	}
	static get msecChWait() {
		return e.#s;
	}
	static #c;
	static #l;
	static setEvtMng(e, t, n) {
		this.#c = e, this.#l = t, M.setEvtMng(e, n);
	}
	static #u = !1;
	static #d = {};
	static #f(e) {
		this.#u = d(e, "enabled", this.#u), this.#t.setVal_Nochk("save", "const.sn.autowc.enabled", this.#u);
		let { text: t } = e;
		if ("text" in e != "time" in e) throw "[autowc] textとtimeは同時指定必須です";
		if (this.#t.setVal_Nochk("save", "const.sn.autowc.text", t), !t) return this.#t.setVal_Nochk("save", "const.sn.autowc.time", ""), !1;
		let n = t.length;
		if (this.#u && n === 0) throw "[autowc] enabled === false かつ text === \"\" は許されません";
		let r = String(e.time).split(",");
		if (r.length !== n) throw "[autowc] text文字数とtimeに記述された待ち時間（コンマ区切り）は同数にして下さい";
		this.#d = {};
		for (let e = 0; e < n; ++e) this.#d[t[e]] = c(r[e]);
		return this.#t.setVal_Nochk("save", "const.sn.autowc.time", e.time), !1;
	}
	#p = 0;
	#m = 0;
	#h = !1;
	#g = void 0;
	#_ = "";
	#v = new M(this.ctn, () => this.canFocus(), e.#l);
	#y = new x();
	#b = document.createElement("span");
	static #x = {
		"text-align": 0,
		"text-align-last": 0,
		height: 0,
		width: 0,
		"padding-left": 0,
		"padding-right": 0,
		"padding-top": 0,
		"padding-bottom": 0
	};
	#S = new n();
	constructor() {
		super(), this.ctn.addChild(this.#v), this.#y.init(this.#H), this.ctn.addChild(this.#S), this.#S.name = "cntBtn", this.lay({
			style: `width: ${String(f.stageW)}px; height: ${String(f.stageH)}px; font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif; color: white; font-size: 24px; line-height: 1.5; padding: 16px;`,
			in_style: "default",
			out_style: "default",
			back_clear: "true"
		});
	}
	destroy() {
		this.#g &&= (this.ctn.removeChild(this.#g).destroy(), void 0), e.#r.pagebreak(), this.#v.destroy();
	}
	static destroy() {
		this.#u = !1, this.#d = {}, this.#I = (e) => e;
	}
	set name(e) {
		this.name_ = e, this.#v.name = e;
	}
	get name() {
		return this.name_;
	}
	cvsResize() {
		this.#v.cvsResize();
	}
	setDomZ(e) {
		this.#v.setDomZ(e);
	}
	cvsResizeChildren() {
		for (let e of this.#S.children) e.cvsResize();
	}
	procSetX(e) {
		this.#v.lay({ x: e });
	}
	procSetY(e) {
		this.#v.lay({ y: e });
	}
	lay(t) {
		if (super.lay(t), h.setXY(this.ctn, t, this.ctn), t[":id_tag"] = this.name_.slice(0, -7), x.setting(t), this.#j(t), this.#v.lay(t), "r_align" in t && (this.#z = t.r_align ?? ""), this.#L = f.isSafari ? this.#v.tategaki ? (e, t) => `text-align: start; height: ${String(t)}em; padding-top: ${e}; padding-bottom: ${e};` : (e, t) => `text-align: start; width: ${String(t)}em; padding-left: ${e}; padding-right: ${e};` : this.#v.tategaki ? (e) => `text-align: justify; text-align-last: justify; padding-top: ${e}; padding-bottom: ${e};` : (e) => `text-align: justify; text-align-last: justify; padding-left: ${e}; padding-right: ${e};`, f.isFirefox && (this.#R = this.#B), "r_style" in t) {
			if (t.r_style) {
				let n = document.createElement("span");
				n.style.cssText = t.r_style;
				let r = n.style.length, i = this.#b.style;
				for (let t = 0; t < r; ++t) {
					let r = n.style[t];
					if (r in e.#x) {
						m.myTrace(`${String(r)}は指定できません`, "W");
						continue;
					}
					let a = n.style[r];
					a && (i[r] = a);
				}
			} else this.#b.style.cssText = "";
		}
		if ("alpha" in t) for (let e of this.#S.children) e.alpha = this.ctn.alpha;
		this.#C(t), this.#E(t);
		let n = v.procID + `TxtLayer lay name:${this.name_}`, r = this.#k(t, (e) => {
			e && v.endProc(n);
		});
		return r && v.beginProc(n), r;
	}
	#C(e) {
		let { in_style: t } = e;
		if (!t) return;
		let n = M.getChInStyle(t);
		if (!n) throw `存在しないin_style【${t}】です`;
		this.#w = t, this.#T = n.join;
	}
	#w = "";
	#T = !0;
	get width() {
		return this.#v.getWidth;
	}
	get height() {
		return this.#v.getHeight;
	}
	#E(e) {
		let { out_style: t } = e;
		if (t) {
			if (!M.getChOutStyle(t)) throw `存在しないout_style【${t}】です`;
			this.#D = t;
		}
	}
	#D = "";
	#O = new y();
	#k(t, n) {
		if ("back_clear" in t) return d(t, "back_clear", !1) && (this.#p = 0, this.#m = 0, this.#h = !1, this.#_ = ""), n(!1), !1;
		this.#m = l(t, "b_alpha", this.#m), this.#h = d(t, "b_alpha_isfixed", this.#h);
		let r = (this.#h ? 1 : Number(e.#t.getVal("sys:TextLayer.Back.Alpha"))) * this.#m;
		if (t.b_pic) {
			if (this.#_ !== t.b_pic) return this.#_ = t.b_pic, this.#g && (this.ctn.removeChild(this.#g), this.#g.destroy()), this.#O = new y(this.#_, this.ctn, (e) => {
				this.#g = e, e.name = "back(pic)", e.visible = r > 0, e.alpha = r, this.#v.setMySize(e.width, e.height), this.ctn.setChildIndex(e, 0), n(!0);
			}), this.#O.ret;
		} else "b_color" in t && (this.#p = o(t, "b_color", 0), this.#_ = "", this.#A(r));
		return this.#g && (this.#g.visible = r > 0, this.#g.alpha = r), n(!1), !1;
	}
	#A(e) {
		this.#g && (this.ctn.removeChild(this.#g), this.#g.destroy()), this.ctn.addChildAt((this.#g = new i()).beginFill(this.#p, e).lineStyle(void 0).drawRect(0, 0, this.#v.getWidth, this.#v.getHeight).endFill(), 0), this.#g.name = "back(color)";
	}
	chgBackAlpha(e) {
		let t = this.#h ? this.#m : e * this.#m;
		this.#g instanceof i && this.#A(t), this.#g && (this.#g.visible = t > 0, this.#g.alpha = t);
	}
	#j(e) {
		"noffs" in e && (this.#P = e.noffs ?? "", this.#F = RegExp(`[　${this.#P}]`)), "ffs" in e && (this.#M ??= "", this.#N = this.#M === "" ? () => "" : (e) => this.#F.test(e) ? "" : ` font-feature-settings: ${this.#M};`);
	}
	#M = "";
	#N = (e) => "";
	#P = "";
	#F = /[　]/;
	static chgDoRec(e) {
		this.#I = e ? (e) => e : (e) => `<span class='offrec'>${e}</span>`;
	}
	static #I = (e) => e;
	isCur = !1;
	#L = () => "";
	#R = (e, t, n, r = "") => {
		if (!n) return ` style='${r}'`;
		let i = e.length * 2;
		if (i - t.length < 0) return ` style='text-align: ${n}; ${r}'`;
		let a = "";
		switch (n) {
			case "justify":
				a = this.#L("0", i);
				break;
			case "121":
				a = this.#L(`calc(${String((i - t.length) / (t.length * 2))}em)`, i);
				break;
			case "even":
				a = this.#L(`calc(${String((i - t.length) / (t.length + 1))}em)`, i);
				break;
			case "1ruby":
				a = this.#L("1em", i);
				break;
			default: a = `text-align: ${n};`;
		}
		return ` style='${a} ${r}'`;
	};
	#z = "";
	#B(e, t, n, r = "") {
		if (!n) return ` style='${r}'`;
		let i = e.length * 2;
		if (i - t.length < 0) return ` style='text-align: ${n}; ${r}'`;
		let a = "";
		switch (n) {
			case "left":
				a = "ruby-align: start;";
				break;
			case "center":
				a = "ruby-align: center;";
				break;
			case "right":
				a = "ruby-align: start;";
				break;
			case "justify":
				a = "ruby-align: space-between;";
				break;
			case "121":
				a = "ruby-align: space-around;";
				break;
			case "even":
				{
					let e = ` ${String((i - t.length) / (t.length + 1))}em;`;
					a = "ruby-align: space-between; " + (this.#v.tategaki ? `padding-top:${e} padding-bottom:${e}` : `padding-left:${e} padding-right:${e}`);
				}
				break;
			case "1ruby":
				a = "ruby-align: space-between; " + (this.#v.tategaki ? "padding-top: 1em; padding-bottom: 1em;" : "padding-left: 1em; padding-right: 1em;");
				break;
			default: a = `text-align: ${n};`;
		}
		return ` style='${a} ${r}'`;
	}
	tagCh(e) {
		this.#y.putTxt(e);
	}
	#V = !1;
	get needGoTxt() {
		return this.#V;
	}
	#H = (t, n) => {
		let r = n;
		e.#e.oCfg.debug.putCh && console.log(`🖊 文字表示 text:\`${t}\`(${t.charCodeAt(0).toString(16)}) ruby:\`${r}\` name:\`${this.name_}\``);
		let i = r.split("｜"), a = "", [o, ...s] = i, l = s.join("｜");
		switch (i.length) {
			case 1:
				if (this.#V = !0, t === "\n") {
					this.#K ? (this.#K = !1, a = "<ruby>&emsp;<rt>&emsp;</rt></ruby><br/>") : a = "<br/>";
					break;
				}
				this.#K && (this.#K = !1, r === "" && (r = "&emsp;")), a = this.#U(t, r, this.#z);
				break;
			default: switch (o) {
				case "start":
				case "left":
				case "center":
				case "right":
				case "justify":
				case "121":
				case "even":
				case "1ruby":
					this.#K = !1, this.#V = !0, a = this.#U(t, l, o);
					break;
				case "gotxt":
					this.#X(), this.#V ? (this.isCur && e.#r.recText(this.#q.join("").replace(/^<ruby>&emsp;<rt>&emsp;<\/rt><\/ruby>(<br\/>)+/, "").replaceAll(/style='(anim\S+ [^;]+;\s*)+/g, "style='").replaceAll(/( style=''| data-(add|arg|cmd)='[^']+'|\n+|\t+)/g, "").replaceAll(/class='sn_ch[^']+/g, "class='sn_ch").replaceAll("display: none;", "").replaceAll("class='offrec'", "style='display: none;'")), this.#v.goTxt(this.#q, this.#G === 0), this.#V = !1, this.#G = 0) : this.isCur && this.#v.noticeCompTxt();
					return;
				case "add":
					{
						let e = JSON.parse(l), { style: t = "", wait: n = null } = e, { cl: r, sty: i } = this.#W(!0, n ? c(n) : null);
						this.#q.push(`<span${r} style='${i} display: inline; ${t}'>`), delete e.style, this.#Y(e);
					}
					return;
				case "add_close":
					this.#q.push("</span>"), this.#X();
					return;
				case "grp":
					this.#V = !0;
					{
						let e = JSON.parse(l);
						if (e.id ??= String(this.#q.length), e.id === "break") {
							this.#v.dispBreak(e);
							return;
						}
						this.#K = !1, e.delay = this.#G, e.r ??= "", e.style ??= "", e.r_style ??= "";
						let { r: t, wait: n = null, r_style: r } = e, { cl: i, sty: o, lnk: s } = this.#W(!0, n ? c(n) : null);
						a = `<span${i} style='${o} ${e.style}'><ruby><span data-cmd='grp' data-arg='${JSON.stringify(e)}'${s} style='${o} display: inline;'>&emsp;</span><rt${s}${this.#R("　", t, this.#z, this.#b.style.cssText + (this.#J.at(-1)?.o.r_style ?? "") + r)}>${e.r}</rt></ruby></span>`;
					}
					break;
				case "tcy":
					this.#K = !1, this.#V = !0;
					{
						let { t: n = "", r: i = "", wait: o = null, style: s = "", r_style: u = "" } = JSON.parse(l);
						e.#t.doRecLog() && (this.#Q += t + (r ? `《${r}》` : ""), this.#$ += n);
						let d = f.isSafari ? i.replaceAll(/[A-Za-z0-9]/g, (e) => String.fromCharCode(e.charCodeAt(0) + 65248)) : i, { cl: p, sty: m, lnk: h } = this.#W(!0, o ? c(o) : null);
						a = `<span${p} style='${m}${this.#N(n)} ${s}'><ruby><span${h} style='${m} display: inline; text-combine-upright: all;'>${n}</span><rt${h}${this.#R(n, d, this.#z, this.#b.style.cssText + (this.#J.at(-1)?.o.r_style ?? "") + u)}>${d}</rt></ruby></span>`;
					}
					break;
				case "del":
					M.delBreak();
					return;
				case "span":
					this.#V = !0, this.#Z(JSON.parse(l));
					return;
				case "link":
					this.#V = !0;
					{
						let e = JSON.parse(l);
						e[":link"] = " data-lnk='@'";
						let { cl: t, sty: n, curpos: r } = this.#W(!1, e.wait ? c(e.wait) : null);
						this.#q.push(`<span${t} style='${n} display: inline; ${e.style ?? ""}' ${r} data-arg='${l}'>`), delete e.style, this.#Z(e);
					}
					return;
				case "endlink":
					this.#V = !0, this.#q.push("</span>"), this.#X();
					return;
				default: this.#V = !0, a = this.#U(t, r, this.#z);
			}
		}
		this.#q.push(e.#I(a));
	};
	#U(t, n, r) {
		let i = t === " " ? "&nbsp;" : t === "　" ? "&emsp;" : t;
		e.#t.doRecLog() && (this.#Q += i + (n ? `《${n}》` : ""), t !== " " && (this.#$ += t));
		let { cl: a, sty: o, lnk: s } = this.#W(!0, null, t);
		return n ? `<span${a} style='${o} ${this.#N(t)}'><ruby>${Array.from(t).map((e, n) => `<span${a}${s} style='${n > 0 ? this.#W(!0, null, t).sty : o} display: inline;'>${e === " " ? "&nbsp;" : e === "　" ? "&emsp;" : e}</span>`).join("")}<rt${s}${this.#R(t, n, r, this.#b.style.cssText + (this.#J.at(-1)?.o.r_style ?? ""))}>${n}</rt></ruby></span>` : `<span${a} style='${o} ${this.#N(t)}'${s}>${i}</span>`;
	}
	#W(t, n, r = "\n") {
		let i = this.#T ? n ?? this.#J.at(0)?.o.wait ?? (e.#u ? e.#d[r.at(0) ?? ""] ?? 0 : e.msecChWait) : 0;
		e.#c.isSkipping ? this.#G = 0 : t && this.#T && (this.#G += c(i));
		let a = `data-add='{"ch_in_style":"${this.#w}", "ch_out_style":"${this.#D}"}'`;
		return {
			cl: ` class='sn_ch sn_ch_yet sn_ch_in_${this.#w}'`,
			sty: `animation-delay: ${String(this.#G)}ms;${this.#J.at(-1)?.o.style ?? ""}`,
			lnk: (this.#J.at(0)?.o[":link"] ?? "") + " " + a,
			curpos: a
		};
	}
	#G = 0;
	#K = !0;
	#q = [];
	#J = [];
	#Y(e) {
		this.#J.push({
			o: e,
			r_align: this.#z,
			ch_in_style: this.#w,
			ch_out_style: this.#D
		}), e.r_align && (this.#z = e.r_align), this.#C(e), this.#E(e);
	}
	#X() {
		let e = this.#J.pop();
		e && (this.#z = e.r_align, this.#C({ in_style: e.ch_in_style }), this.#E({ out_style: e.ch_out_style }));
	}
	#Z(e) {
		let t = this.#J.at(-1);
		if (!t) {
			this.#Y(e);
			return;
		}
		t.o = {
			...t.o,
			...e
		}, !e.style && !e.r_style && (t.o.style = "", t.o.r_style = ""), e.r_align && (this.#z = e.r_align), this.#C(e), this.#E(e);
	}
	click = () => !this.ctn.interactiveChildren || !this.ctn.visible ? !1 : this.#v.skipChIn();
	clearText() {
		this.ctn.removeChild(this.#v), this.ctn.addChild(this.#v = this.#v.reNew()), this.#G = 0, this.#K = !0, this.#q = [], this.#Q = "", this.#$ = "", e.#r.pagebreak();
	}
	#Q = "";
	#$ = "";
	get pageText() {
		return this.#Q.replace("《&emsp;》", "");
	}
	get pagePlainText() {
		return this.#$;
	}
	get enabled() {
		return this.ctn.interactiveChildren;
	}
	set enabled(e) {
		this.ctn.interactiveChildren = e;
	}
	addButton = (t) => new Promise((n) => {
		t.key = `btn=[${String(this.#S.children.length)}] ` + this.name_, t[":id_tag"] = t.key.slice(0, -7), d(t, "hint_tate", this.#v.tategaki);
		let r = new b(t, e.#c, () => n(), () => this.canFocus());
		r.name = JSON.stringify(t).replaceAll("\"", "'"), this.#S.addChild(r);
	});
	canFocus() {
		return (this.ctn.interactiveChildren ?? !1) && this.ctn.visible && e.#n(this);
	}
	clearLay(e) {
		super.clearLay(e), this.clearText();
		for (let e of this.#S.removeChildren()) e.destroy();
	}
	record = () => ({
		...super.record(),
		enabled: this.enabled,
		r_cssText: this.#b.style.cssText,
		r_align: this.#z,
		b_do: this.#g === void 0 ? void 0 : this.#g instanceof r ? "Sprite" : "Graphics",
		b_pic: this.#_,
		b_color: this.#p,
		b_alpha: this.#m,
		b_alpha_isfixed: this.#h,
		ffs: this.#M,
		txs: this.#v.record(),
		strNoFFS: this.#P,
		btns: this.#S.children.map((e) => e.name)
	});
	playback(e, t) {
		super.playback(e, t), this.enabled = e.enabled, this.#b.style.cssText = e.r_cssText, this.#z = e.r_align, this.cvsResize(), this.#j(e), this.#v.playback(e.txs), this.#m = e.b_alpha, this.#h = e.b_alpha_isfixed, t.push(new Promise((t) => {
			let n = e.b_do ? e.b_do === "Sprite" ? { b_pic: e.b_pic } : { b_color: e.b_color } : { b_pic: "" };
			n.b_alpha = e.b_alpha, n.b_alpha_isfixed = e.b_alpha_isfixed, this.#k(n, (e) => {
				e && t();
			}) || t();
		}), ...e.btns.map((e) => this.addButton(JSON.parse(e.replaceAll("'", "\"")))).flat());
	}
	get cssText() {
		return this.#v.cssText;
	}
	set cssText(e) {
		this.#v.cssText = e;
	}
	snapshot(e, t) {
		e.render(this.ctn, { clear: !1 }), this.#v.snapshot(e, t);
	}
	snapshot_end() {
		this.#v.snapshot_end();
	}
	makeDesignCast(e) {
		this.ctn.visible && this.#v.makeDesignCast(e);
	}
	makeDesignCastChildren(e) {
		if (this.ctn.visible) for (let t of this.#S.children) t.makeDesignCast(e);
	}
	showDesignCast() {
		this.#v.showDesignCast();
	}
	showDesignCastChildren() {
		for (let e of this.#S.children) e.showDesignCast();
	}
	dump() {
		return this.#H("", "gotxt｜"), super.dump() + `, "enabled":"${String(this.enabled)}", ${this.#v.dump()}, "b_pic":"${this.#_}", "b_color":"${String(this.#p)}", "b_alpha":${String(this.#m)}, "b_alpha_isfixed":"${String(this.#h)}", "width":${String(this.#v.getWidth)}, "height":${String(this.#v.getHeight)}, "pixi_obj":[${this.ctn.children.map((e) => `{"class":"${e instanceof r ? "Sprite" : e instanceof i ? "Graphics" : e instanceof n ? "Container" : "?"}", "name":"${e.name}", "alpha":${String(e.alpha)}, "x":${String(e.x)}, "y":${String(e.y)}, "visible":"${String(e.visible)}"}`).join(",")}], "button":[${this.#S.children.map((e) => e.children[0]?.name ?? "{}").join(",")}]`;
	}
};
//#endregion
export { N as TxtLayer, M as t };

//# sourceMappingURL=TxtLayer.js.map