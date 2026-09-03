import { a as e, f as t, h as n, i as r, m as i, s as a } from "./pixi.js";
import { g as o, l as s, m as c, s as l } from "./CmnLib.js";
import { t as u } from "./Layer.js";
import { t as d } from "./SpritesMng.js";
//#region src/sn/Button.ts
var f = class f extends i {
	hArg;
	evtMng;
	resolve;
	canFocus;
	static fontFamily = "'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif";
	static #e = (e, t) => {};
	static #t = (e, t, n, r) => {};
	static init(e) {
		e.oCfg.debug.masume && (f.#e = (e, t) => e.addChild(new a().beginFill(8926088, .2).lineStyle(1, 8926088, 1).drawRect(t.x, t.y, t.width, t.height).endFill()), f.#t = (e, t, n, r) => e.addChild(new a().beginFill(8926088, .2).lineStyle(1, 8926088, 1).drawRect(t.x, t.y, n, r).endFill()));
	}
	static #n(e, t, n) {
		let r = t[n];
		if (!r) return;
		let i;
		try {
			i = JSON.parse(r);
		} catch (e) {
			throw e instanceof SyntaxError ? Error(c(t, n, e.message)) : "fn:Button.ts " + n;
		}
		for (let [t, n] of Object.entries(i)) e[t] = n;
		return i;
	}
	setText(e) {}
	getBtnBounds = () => this.#r;
	#r = new n();
	#i = new d();
	#a;
	constructor(t, n, i, a) {
		if (super(), this.hArg = t, this.evtMng = n, this.resolve = i, this.canFocus = a, this.#a = {
			type: "pic",
			enabled: l(t, "enabled", !0),
			x: this.x = o(t.left ?? 0),
			y: this.y = o(t.top ?? 0),
			rotation: this.angle = s(t, "rotation", this.angle),
			pivot_x: this.pivot.x = s(t, "pivot_x", this.pivot.x),
			pivot_y: this.pivot.y = s(t, "pivot_y", this.pivot.y),
			scale_x: this.scale.x = s(t, "scale_x", this.scale.x),
			scale_y: this.scale.y = s(t, "scale_y", this.scale.y),
			alpha: 1,
			text: "",
			b_pic: "",
			width: 0,
			height: 0
		}, this.getBtnBounds = () => (this.#r.x = this.#a.x, this.#r.y = this.#a.y, this.#r), this.#a.enabled && n.button(t, this, () => this.normal(), () => this.#s(), () => this.#c()), t.pic) {
			this.#a.type = "pic", this.#i = new d(t.pic, this, (e) => {
				this.#l(e), this.#r.width = e.width * this.#a.scale_x, this.#r.height = e.height * this.#a.scale_y;
			}, (e) => i());
			return;
		}
		if (!t.text) throw "textまたはpic属性は必須です";
		let c = s(t, "height", 30), p = new e({
			align: "center",
			dropShadow: !0,
			dropShadowAlpha: .7,
			dropShadowColor: "white",
			dropShadowBlur: 7,
			dropShadowDistance: 0,
			fill: this.#a.enabled ? "black" : "gray",
			fontFamily: f.fontFamily,
			fontSize: c,
			padding: 5
		}), m = f.#n(p, t, "style");
		m && (this.#a = {
			...this.#a,
			...m
		});
		let h = new r(t.text ?? "", p);
		h.alpha = s(t, "alpha", h.alpha), h.width = s(t, "width", 100), h.height = t.height = c, this.setText = (e) => {
			h.text = e;
		}, this.#a = {
			...this.#a,
			type: "text",
			alpha: h.alpha,
			text: h.text,
			width: h.width,
			height: h.height
		};
		let g = !1;
		if (this.#a.width = this.width, this.#a.height = this.height, t.b_pic && (this.#a.b_pic = t.b_pic, this.#i = new d(t.b_pic, this, (e) => {
			this.#o(e, h), this.#a.width = this.width, this.#a.height = this.height;
		}, (e) => {
			u.setBlendmode(this, t), e && i();
		}), g = this.#i.ret), this.addChild(h), this.#r.width = h.width, this.#r.height = h.height, t.b_pic || u.setBlendmode(this, t), f.#e(this, h), !this.#a.enabled) {
			g || i();
			return;
		}
		let _ = p.clone();
		f.#n(_, t, "style_hover") || (_.fill = "white");
		let v = _.clone();
		f.#n(v, t, "style_clicked") || (v.dropShadow = !1), this.normal = () => {
			h.style = p;
		}, this.#s = () => a() ? (h.style = _, !0) : !1, this.#c = () => {
			h.style = v;
		}, g || i();
	}
	destroy() {
		this.normal = () => {}, this.#s = () => !1, this.#c = () => {}, this.evtMng.unButton(this), this.#i.destroy(), super.destroy();
	}
	makeDesignCast(e) {}
	showDesignCast() {}
	cvsResize() {}
	#o(e, t) {
		this.setChildIndex(e, 0), e.alpha = t.alpha, e.setTransform(t.x, t.y, 1, 1, t.rotation, 0, 0, (e.width - t.width) / 2, (e.height - t.height) / 2), e.name = t.name;
	}
	normal = () => {};
	#s = () => !1;
	#c = () => {};
	#l(e) {
		this.#a.alpha = e.alpha = s(this.hArg, "alpha", e.alpha);
		let r = e.width / 3, i = this.#a.enabled ? r : e.width, a = e.height, c = e.texture.baseTexture, l = new t(c, new n(0, 0, r, a)), u = new t(c, new n(r, 0, r, a)), d = new t(c, new n(r * 2, 0, r, a)), p = () => {
			e.texture = l;
		};
		this.#a.enabled && p(), this.normal = p, this.#s = () => this.canFocus() ? (e.texture = d, !0) : !1, this.#c = () => {
			e.texture = u;
		}, "width" in this.hArg ? (this.#a.width = o(this.hArg.width), this.scale.x *= this.#a.width / i) : this.#a.width = i, "height" in this.hArg ? (this.#a.height = o(this.hArg.height), this.scale.y *= this.#a.height / a) : this.#a.height = a, f.#t(this, e, i, a);
	}
};
//#endregion
export { f as Button };

//# sourceMappingURL=Button.js.map