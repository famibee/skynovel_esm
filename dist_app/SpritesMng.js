import { b as e, c as t, f as n, g as r, h as i, l as a, n as o, o as s } from "./pixi.js";
import { d as c, l, p as u, s as d } from "./CmnLib.js";
import { n as f } from "./ConfigBase.js";
import { t as p } from "./DebugMng.js";
import { t as m } from "./Layer.js";
import { t as h } from "./Reading.js";
//#region src/sn/SpritesMng.ts
var g = class g {
	csvFn;
	ctn;
	fncFirstComp;
	fncAllComp;
	static #e;
	static #t;
	static #n;
	static #r;
	static init(e, t, n, r, i) {
		g.#e = e, g.#t = t, g.#n = n, g.#r = r, n.arg.crypto && (g.#f = (e, t, n) => g.#m(e, t, n), g.#g = (e, t, n) => g.#_(e, t, n));
		let a = () => {
			let e = g.#a * g.#i;
			for (let t of Object.values(g.#y)) t.volume = e;
		};
		i.setNoticeChgVolume((e) => {
			g.#a = e, a();
		}, (e) => {
			g.#i = e, a();
		});
	}
	static #i = 1;
	static #a = 1;
	static #o;
	static setEvtMng(e) {
		g.#o = e;
	}
	constructor(e = "", t, n = () => {}, r = () => {}) {
		this.csvFn = e, this.ctn = t, this.fncFirstComp = n, this.fncAllComp = r, e && (this.#s = t ? (e) => {
			t.addChild(e), this.#c.push(e);
		} : () => {}, this.ret = g.#l(e, (e) => this.fncFirstComp(e), (e) => this.fncAllComp(e), (e) => this.#s(e)));
	}
	ret = !1;
	#s;
	#c = [];
	destroy() {
		this.fncFirstComp = () => {}, this.fncAllComp = () => {}, this.#s = (e) => e.destroy();
		for (let e of this.#c) g.stopVideo(e.name), e.parent?.removeChild(e), e.destroy();
		this.#c = [];
	}
	static destroy() {
		g.#u = {};
		for (let { aTex: e, own: t } of Object.values(g.#d)) if (t) for (let t of e) t.destroy();
		g.#d = {};
		for (let e of Object.values(g.#y)) {
			e.pause();
			let { src: t } = e;
			e.removeAttribute("src"), e.load(), t.startsWith("blob:") && URL.revokeObjectURL(t);
		}
		g.#y = {};
	}
	static #l(n, i, o, c) {
		if (!n) return !1;
		let l = !1;
		if (n.startsWith("data:")) {
			let e = () => {
				let e = s.from(n);
				c(e), i(e), o(l);
			};
			return n in r ? e() : (l = !0, new t().add(n, n).load(e)), l;
		}
		let u = [], d = new t();
		for (let i of n.split(",")) {
			if (!i) throw "face属性に空要素が含まれます";
			let { dx: n, dy: o, blendmode: s, fn: c } = g.#u[i] ?? {
				fn: i,
				dx: 0,
				dy: 0,
				blendmode: e.NORMAL
			};
			if (u.push({
				fn: c,
				fnc: (e) => {
					e.transform && (e.x = n, e.y = o, e.blendMode = s);
				}
			}), c in g.#d || c in r || c in t.shared.resources) continue;
			l = !0;
			let p = g.#e.searchPath(c, f.SP_GSM), m = this.#n.arg.crypto ? { xhrType: p.endsWith(".json") ? a.XHR_RESPONSE_TYPE.TEXT : a.XHR_RESPONSE_TYPE.BUFFER } : {};
			d.add({
				...m,
				name: c,
				url: p
			});
		}
		let p = u.at(0);
		p && (p.fnc = i);
		let m = (e, t) => {
			for (let { fn: e, fnc: n } of u) {
				let r = g.#v(e, t);
				r.name = e, c(r), n(r);
			}
			o(l);
		};
		return l ? d.use((e, t) => {
			try {
				if (e.extension === "json") {
					this.#n.dec("json", e.data).then((n) => g.#g(n, e, t));
					return;
				}
				this.#n.decAB(e.data).then((n) => g.#f(n, e, t));
			} catch (t) {
				let n = `画像/動画ロード失敗です fn:${e.name} ${String(t)}`;
				g.#o.isSkipping ? console.warn(n) : console.error("%c" + n, "color:#FF3300;");
			}
		}).load(m) : queueMicrotask(() => m(0, {})), l;
	}
	static #u = {};
	static #d = {};
	static #f = (e, { type: t, name: n, data: r }, i) => {
		switch (t) {
			case a.TYPE.VIDEO: {
				let e = r;
				e.volume = g.#a, g.#y[n] = g.#h(e);
			}
		}
		i();
	};
	static #p(e) {
		let t = /([^\d]+)\d+\.(\w+)/.exec(e[0] ?? "");
		if (!t) return [];
		let [, n = "", r = ""] = t, i = n.length, a = -r.length - 1;
		return e.sort((e, t) => u(e.slice(i, a)) > u(t.slice(i, a)) ? 1 : -1);
	}
	static #m(e, t, r) {
		if (t.data = e, t.extension !== "bin" && r(), e instanceof HTMLImageElement) {
			n.fromLoader(e, t.url, t.name).then((n) => {
				t.texture = n, t.type = a.TYPE.IMAGE, r(), URL.revokeObjectURL(e.src);
			});
			return;
		}
		e instanceof HTMLVideoElement && (e.volume = g.#a, g.#y[t.name] = g.#h(e), t.type = a.TYPE.VIDEO), r();
	}
	static #h(e) {
		return g.#t.getVal("const.sn.needClick2Play") && (p.trace_beforeNew(`[lay系] ${p.strPos()}未クリック状態で動画を自動再生します。音声はミュートされます`, "W"), e.muted = !0), e.setAttribute("playsinline", ""), e;
	}
	static #g = (e, { type: t, spritesheet: r, name: i, data: o }, s) => {
		switch (t) {
			case a.TYPE.JSON: {
				let e = r._frameKeys;
				g.#p(e), g.#d[i] = {
					aTex: e.map((e) => n.from(e)),
					meta: o.meta
				};
			}
		}
		s();
	};
	static #_(e, r, o) {
		let { meta: s, frames: l } = r.data = JSON.parse(e);
		if (r.type = a.TYPE.JSON, !s?.image) {
			o();
			return;
		}
		let u = c(s.image), d = g.#e.searchPath(u, f.SP_GSM);
		new t().use((e, t) => {
			this.#n.decAB(e.data).then((n) => {
				if (e.data = n, n instanceof HTMLImageElement) {
					e.type = a.TYPE.IMAGE, t(), URL.revokeObjectURL(n.src);
					return;
				}
				t();
			}).catch((t) => this.#r.errScript(`画像/動画ロード失敗です dec2res4Cripto fn:${e.name} ${String(t)}`, !1));
		}).add({
			name: u,
			url: d,
			xhrType: a.XHR_RESPONSE_TYPE.BUFFER
		}).load((e, t) => {
			for (let { data: t } of Object.values(e.resources)) {
				let { baseTexture: e } = n.from(t), a = Object.values(l);
				g.#d[r.name] = {
					aTex: a.map(({ frame: { x: t, y: r, w: a, h: o } }) => new n(e, new i(t, r, a, o))),
					meta: s,
					own: !0
				};
			}
			o();
		});
	}
	static #v(e, t) {
		let n = g.#d[e];
		if (n) {
			let e = new o(n.aTex);
			return e.animationSpeed = n.meta.animationSpeed ?? 1, e.play(), e;
		}
		if (e in r) return s.from(e);
		let i = g.#y[e];
		if (i) return s.from(i);
		let a = t[e];
		return a ? new s(a.texture) : new s();
	}
	static #y = {};
	static getHFn2VElm(e) {
		return g.#y[e];
	}
	static wv(e) {
		let { fn: t } = e;
		if (!t) throw "fnは必須です";
		let n = g.#y[t];
		if (!n || n.loop) return !1;
		if (g.#o.isSkipping || n.ended) return g.stopVideo(t), !1;
		let r = "wv fn:" + t, i = d(e, "stop", !0), a = () => {
			i && g.stopVideo(t);
		};
		return h.beginProc(r, a, !0, d(e, "canskip", !0) ? a : void 0), n.addEventListener("ended", () => h.notifyEndProc(r), {
			once: !0,
			passive: !0
		}), !0;
	}
	static stopVideo(e) {
		let t = g.#y[e];
		t && (delete g.#y[e], t.pause(), t.currentTime = t.duration);
	}
	static add_face(e) {
		let { name: t } = e;
		if (!t) throw "nameは必須です";
		if (t in g.#u) throw "一つのname（" + t + "）に対して同じ画像を複数割り当てられません";
		let { fn: n = t } = e;
		return g.#u[t] = {
			fn: n,
			dx: l(e, "dx", 0),
			dy: l(e, "dy", 0),
			blendmode: m.getBlendmodeNum(e.blendmode ?? "")
		}, !1;
	}
};
//#endregion
export { g as t };

//# sourceMappingURL=SpritesMng.js.map