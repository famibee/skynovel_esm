import { f as e, o as t } from "./pixi.js";
import { t as n } from "./CmnLib.js";
import { t as r } from "./Layer.js";
//#region src/sn/PlgLayer.ts
var i = class i extends r {
	static #e;
	static #t;
	static #n = () => !0;
	static setup(e, t, n) {
		i.#e = e, i.#t = t, i.#n = n;
	}
	htm = document.createElement("div");
	constructor() {
		super();
		let e = this.htm.style;
		e.position = "absolute", e.left = e.top = "0", e.width = `${String(n.stageW)}px`, e.height = `${String(n.stageH)}px`, e.pointerEvents = "none", e.overflow = "visible", i.#e.view.parentElement.appendChild(this.htm), i.#e.ticker.add(this.#u, this);
	}
	#r = "";
	#i = "";
	#a = "";
	#o = "";
	#s = "";
	#c = "";
	#l = "";
	#u = () => {
		let e = this.ctn, { cvsScale: t, ofsLeft4elm: n, ofsTop4elm: r } = i.#t, a = `${String(n + e.position.x * t)}px`;
		a !== this.#i && (this.htm.style.left = this.#i = a);
		let o = `${String(r + e.position.y * t)}px`;
		o !== this.#a && (this.htm.style.top = this.#a = o);
		let s = `rotate(${String(e.angle)}deg) scale(${String(e.scale.x * t)}, ${String(e.scale.y * t)})`;
		s !== this.#r && (this.htm.style.transform = this.#r = s);
		let c = `${String(e.pivot.x)}px ${String(e.pivot.y)}px`;
		c !== this.#o && (this.htm.style.transformOrigin = this.#o = c);
		let l = String(e.alpha);
		l !== this.#s && (this.htm.style.opacity = this.#s = l);
		let u = !this.#m && e.visible && i.#n(this) ? "" : "none";
		u !== this.#c && (this.htm.style.display = this.#c = u);
	};
	cvsResize() {
		this.#u();
	}
	setDomZ(e) {
		let t = String(e);
		t !== this.#l && (this.htm.style.zIndex = this.#l = t);
	}
	destroy() {
		super.destroy(), i.#e.ticker.remove(this.#u, this), this.htm.remove();
	}
	plgCvs;
	get #d() {
		return this.plgCvs ?? this.htm.querySelector("canvas");
	}
	#f(n) {
		let r = e.from(n);
		r.baseTexture.update();
		let i = new t(r), a = this.htm.style, o = a.transform, s = a.display;
		a.transform = "none", a.display = "";
		let c = n.getBoundingClientRect(), l = this.htm.getBoundingClientRect();
		return a.transform = o, a.display = s, i.position.set(c.left - l.left, c.top - l.top), i.width = c.width, i.height = c.height, this.ctn.addChild(i), i;
	}
	#p;
	snapshotByCanvas(e, t, n) {
		this.#p = this.#f(e), t.render(this.ctn, { clear: !1 }), n();
	}
	snapshot_end() {
		this.#p &&= (this.ctn.removeChild(this.#p), this.#p.destroy(), void 0);
	}
	#m = !1;
	#h;
	transBake() {
		if (this.#m) return;
		let e = this.#d;
		e && (this.#h = this.#f(e), this.#m = !0, this.#u());
	}
	transUnbake() {
		this.#m = !1, this.#h &&= (this.ctn.removeChild(this.#h), this.#h.destroy(), void 0), this.#u();
	}
};
//#endregion
export { i as t };

//# sourceMappingURL=PlgLayer.js.map