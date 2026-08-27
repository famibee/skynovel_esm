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
		e.position = "absolute", e.left = e.top = "0", e.width = `${String(n.stageW)}px`, e.height = `${String(n.stageH)}px`, e.pointerEvents = "none", e.overflow = "visible", i.#e.view.parentElement.appendChild(this.htm), i.#e.ticker.add(this.#l, this);
	}
	#r = "";
	#i = "";
	#a = "";
	#o = "";
	#s = "";
	#c = "";
	#l = () => {
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
		let u = e.visible && i.#n(this) ? "" : "none";
		u !== this.#c && (this.htm.style.display = this.#c = u);
	};
	cvsResize() {
		this.#l();
	}
	destroy() {
		super.destroy(), i.#e.ticker.remove(this.#l, this), this.htm.remove();
	}
	#u;
	snapshotByCanvas(n, r, i) {
		let a = e.from(n);
		a.baseTexture.update(), this.#u = new t(a), this.ctn.addChild(this.#u), r.render(this.ctn, { clear: !1 }), i();
	}
	snapshot_end() {
		this.#u &&= (this.ctn.removeChild(this.#u), this.#u.destroy(), void 0);
	}
};
//#endregion
export { i as t };

//# sourceMappingURL=PlgLayer.js.map