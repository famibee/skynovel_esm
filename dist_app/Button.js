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
	setText(e) {}
	getBtnBounds = () => this.#n;
	#n = new n();
	#r = new d();
	#i;
	constructor(t, n, i, a) {
		if (super(), this.hArg = t, this.evtMng = n, this.resolve = i, this.canFocus = a, this.#i = {
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
		}, this.getBtnBounds = () => (this.#n.x = this.#i.x, this.#n.y = this.#i.y, this.#n), this.#i.enabled && n.button(t, this, () => this.normal(), () => this.#o(), () => this.#s()), t.pic) {
			this.#i.type = "pic", this.#r = new d(t.pic, this, (e) => {
				this.#c(e), this.#n.width = e.width * this.#i.scale_x, this.#n.height = e.height * this.#i.scale_y;
			}, (e) => i());
			return;
		}
		if (!t.text) throw "textまたはpic属性は必須です";
		let p = s(t, "height", 30), m = new e({
			align: "center",
			dropShadow: !0,
			dropShadowAlpha: .7,
			dropShadowColor: "white",
			dropShadowBlur: 7,
			dropShadowDistance: 0,
			fill: this.#i.enabled ? "black" : "gray",
			fontFamily: f.fontFamily,
			fontSize: p,
			padding: 5
		});
		if (t.style) try {
			let e = JSON.parse(t.style);
			for (let [t, n] of Object.entries(e)) m[t] = n;
			this.#i = {
				...this.#i,
				...e
			};
		} catch (e) {
			throw e instanceof SyntaxError ? Error(c(t, "style", e.message)) : "fn:Button.ts style";
		}
		let h = new r(t.text ?? "", m);
		h.alpha = s(t, "alpha", h.alpha), h.width = s(t, "width", 100), h.height = t.height = p, this.setText = (e) => {
			h.text = e;
		}, this.#i = {
			...this.#i,
			type: "text",
			alpha: h.alpha,
			text: h.text,
			width: h.width,
			height: h.height
		};
		let g = !1;
		if (this.#i.width = this.width, this.#i.height = this.height, t.b_pic && (this.#i.b_pic = t.b_pic, this.#r = new d(t.b_pic, this, (e) => {
			this.#a(e, h), this.#i.width = this.width, this.#i.height = this.height;
		}, (e) => {
			u.setBlendmode(this, t), e && i();
		}), g = this.#r.ret), this.addChild(h), this.#n.width = h.width, this.#n.height = h.height, t.b_pic || u.setBlendmode(this, t), f.#e(this, h), !this.#i.enabled) {
			g || i();
			return;
		}
		let _ = m.clone();
		if (t.style_hover) try {
			let e = JSON.parse(t.style_hover);
			for (let [t, n] of Object.entries(e)) _[t] = n;
		} catch (e) {
			throw e instanceof SyntaxError ? Error(c(t, "style_hover", e.message)) : "fn:Button.ts style_hover";
		}
		else _.fill = "white";
		let v = _.clone();
		if (t.style_clicked) try {
			let e = JSON.parse(t.style_clicked);
			for (let [t, n] of Object.entries(e)) v[t] = n;
		} catch (e) {
			throw e instanceof SyntaxError ? Error(c(t, "style_clicked", e.message)) : "fn:Button.ts style_clicked";
		}
		else v.dropShadow = !1;
		this.normal = () => {
			h.style = m;
		}, this.#o = () => a() ? (h.style = _, !0) : !1, this.#s = () => {
			h.style = v;
		}, g || i();
	}
	destroy() {
		this.normal = () => {}, this.#o = () => !1, this.#s = () => {}, this.evtMng.unButton(this), this.#r.destroy(), super.destroy();
	}
	makeDesignCast(e) {}
	showDesignCast() {}
	cvsResize() {}
	#a(e, t) {
		this.setChildIndex(e, 0), e.alpha = t.alpha, e.setTransform(t.x, t.y, 1, 1, t.rotation, 0, 0, (e.width - t.width) / 2, (e.height - t.height) / 2), e.name = t.name;
	}
	normal = () => {};
	#o = () => !1;
	#s = () => {};
	#c(e) {
		this.#i.alpha = e.alpha = s(this.hArg, "alpha", e.alpha);
		let r = e.width / 3, i = this.#i.enabled ? r : e.width, a = e.height, c = e.texture.baseTexture, l = new t(c, new n(0, 0, r, a)), u = new t(c, new n(r, 0, r, a)), d = new t(c, new n(r * 2, 0, r, a)), p = () => {
			e.texture = l;
		};
		this.#i.enabled && p(), this.normal = p, this.#o = () => this.canFocus() ? (e.texture = d, !0) : !1, this.#s = () => {
			e.texture = u;
		}, "width" in this.hArg ? (this.#i.width = o(this.hArg.width), this.scale.x *= this.#i.width / i) : this.#i.width = i, "height" in this.hArg ? (this.#i.height = o(this.hArg.height), this.scale.y *= this.#i.height / a) : this.#i.height = a, f.#t(this, e, i, a);
	}
};
//#endregion
export { f as Button };

//# sourceMappingURL=Button.js.map