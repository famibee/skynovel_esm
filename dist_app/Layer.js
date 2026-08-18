import { b as e, f as t, o as n, t as r } from "./pixi.js";
import { g as i, l as a, p as o, s, t as c } from "./CmnLib.js";
//#region src/sn/Layer.ts
var { BlurFilter: l, ColorMatrixFilter: u, NoiseFilter: d } = r, f = class r {
	layname = "";
	name_ = "";
	set name(e) {
		this.name_ = e;
	}
	get name() {
		return this.name_;
	}
	ctn = new n(t.EMPTY);
	get alpha() {
		return this.ctn.alpha;
	}
	set alpha(e) {
		this.ctn.alpha = e;
	}
	get height() {
		return this.ctn.height;
	}
	get rotation() {
		return this.ctn.angle;
	}
	set rotation(e) {
		this.ctn.angle = e;
	}
	get scale_x() {
		return this.ctn.scale.x;
	}
	set scale_x(e) {
		this.ctn.scale.x = e;
	}
	get scale_y() {
		return this.ctn.scale.y;
	}
	set scale_y(e) {
		this.ctn.scale.y = e;
	}
	get width() {
		return this.ctn.width;
	}
	get x() {
		return this.ctn.x;
	}
	set x(e) {
		this.procSetX(e), this.ctn.x = e;
	}
	procSetX(e) {}
	get y() {
		return this.ctn.y;
	}
	set y(e) {
		this.procSetY(e), this.ctn.y = e;
	}
	procSetY(e) {}
	destroy() {}
	lay(e) {
		let t = this.ctn;
		return "alpha" in e && (t.alpha = a(e, "alpha", 1)), r.setBlendmode(t, e), ("pivot_x" in e || "pivot_y" in e) && t.pivot.set(a(e, "pivot_x", t.pivot.x), a(e, "pivot_y", t.pivot.y)), "rotation" in e && (t.angle = a(e, "rotation", 0)), ("scale_x" in e || "scale_y" in e) && t.scale.set(a(e, "scale_x", t.scale.x), a(e, "scale_y", t.scale.y)), "visible" in e && (t.visible = s(e, "visible", !0)), "filter" in e && (t.filters = [r.bldFilters(e)], this.aFltHArg = [e]), !1;
	}
	aFltHArg = [];
	static bldFilters(e) {
		let { filter: t = "" } = e, n = r.hBldFilter[t];
		if (!n) throw "filter が異常です";
		let i = n(e);
		i.enabled = s(e, "enable_filter", !0);
		let { blendmode: a } = e;
		return a && (i.blendMode = r.getBlendmodeNum(a)), i;
	}
	static hBldFilter = {
		blur: (e) => {
			let t = new l(a(e, "strength", 8), a(e, "quality", 4), "resolution" in e ? a(e, "resolution", 0) : void 0, a(e, "kernel_size", 5));
			return t.blurX = i(a(e, "blur_x", 2)), t.blurY = i(a(e, "blur_y", 2)), t.repeatEdgePixels = s(e, "repeat_edge_pixels", !1), t;
		},
		noise: (e) => new d(a(e, "noise", .5), "seed" in e ? a(e, "seed", 0) : void 0),
		color_matrix: (e) => {
			let t = new u();
			t.alpha = i(a(e, "alpha", 1));
			let { matrix: n = "" } = e;
			if (n) {
				let e = n.split(","), r = e.length;
				if (r !== 20) throw `matrix の個数（${String(r)}）が 20 ではありません`;
				for (let n = 0; n < r; ++n) t.matrix[n] = i(e[n]);
			} else t.matrix[0] = i(a(e, "rtor", 1)), t.matrix[1] = i(a(e, "gtor", 0)), t.matrix[2] = i(a(e, "btor", 0)), t.matrix[3] = i(a(e, "ator", 0)), t.matrix[4] = i(a(e, "pr", 0)), t.matrix[5] = i(a(e, "rtog", 0)), t.matrix[6] = i(a(e, "gtog", 1)), t.matrix[7] = i(a(e, "btog", 0)), t.matrix[8] = i(a(e, "atog", 0)), t.matrix[9] = i(a(e, "pg", 0)), t.matrix[10] = i(a(e, "rtob", 0)), t.matrix[11] = i(a(e, "gtob", 0)), t.matrix[12] = i(a(e, "btob", 1)), t.matrix[13] = i(a(e, "atob", 0)), t.matrix[14] = i(a(e, "pb", 0)), t.matrix[15] = i(a(e, "rtoa", 0)), t.matrix[16] = i(a(e, "gtoa", 0)), t.matrix[17] = i(a(e, "btoa", 0)), t.matrix[18] = i(a(e, "atoa", 1)), t.matrix[19] = i(a(e, "pa", 0));
			return t;
		},
		black_and_white: (e) => {
			let t = new u();
			return t.blackAndWhite(s(e, "multiply", !1)), t;
		},
		brightness: (e) => {
			let t = new u();
			return t.brightness(a(e, "b", .5), s(e, "multiply", !1)), t;
		},
		browni: (e) => {
			let t = new u();
			return t.browni(s(e, "multiply", !0)), t;
		},
		color_tone: (e) => {
			let t = new u();
			return t.colorTone(a(e, "desaturation", .5), a(e, "toned", .5), a(e, "light_color", 16770432), a(e, "dark_color", 16770432), s(e, "multiply", !1)), t;
		},
		contrast: (e) => {
			let t = new u();
			return t.contrast(a(e, "amount", .5), s(e, "multiply", !1)), t;
		},
		grayscale: (e) => {
			let t = new u();
			return t.grayscale(a(e, "scale", .5), s(e, "multiply", !1)), t;
		},
		hue: (e) => {
			let t = new u();
			return t.hue(a(e, "f_rotation", 90), s(e, "multiply", !1)), t;
		},
		kodachrome: (e) => {
			let t = new u();
			return t.kodachrome(s(e, "multiply", !0)), t;
		},
		lsd: (e) => {
			let t = new u();
			return t.lsd(s(e, "multiply", !1)), t;
		},
		negative: (e) => {
			let t = new u();
			return t.negative(s(e, "multiply", !1)), t;
		},
		night: (e) => {
			let t = new u();
			return t.night(a(e, "intensity", .5), s(e, "multiply", !1)), t;
		},
		polaroid: (e) => {
			let t = new u();
			return t.polaroid(s(e, "multiply", !1)), t;
		},
		predator: (e) => {
			let t = new u();
			return t.predator(a(e, "amount", .5), s(e, "multiply", !1)), t;
		},
		saturate: (e) => {
			let t = new u();
			return t.saturate(a(e, "amount", .5), s(e, "multiply", !1)), t;
		},
		sepia: (e) => {
			let t = new u();
			return t.sepia(s(e, "multiply", !1)), t;
		},
		technicolor: (e) => {
			let t = new u();
			return t.technicolor(s(e, "multiply", !0)), t;
		},
		tint: (e) => {
			let t = new u();
			return t.tint(a(e, "f_color", 8947848), s(e, "multiply", !1)), t;
		},
		to_bgr: (e) => {
			let t = new u();
			return t.toBGR(s(e, "multiply", !1)), t;
		},
		vintage: (e) => {
			let t = new u();
			return t.vintage(s(e, "multiply", !0)), t;
		}
	};
	static setBlendmode(e, t) {
		let { blendmode: i } = t;
		if (!i) return;
		let a = r.getBlendmodeNum(i);
		e instanceof n && (e.blendMode = a);
		for (let t of e.children) t instanceof n && (t.blendMode = a);
	}
	static getBlendmodeNum(t) {
		if (!t) return e.NORMAL;
		let n = r.#e[t];
		if (n !== void 0) return n;
		throw `${t} はサポートされない blendmode です`;
	}
	static #e = {
		normal: e.NORMAL,
		add: e.ADD,
		multiply: e.MULTIPLY,
		screen: e.SCREEN
	};
	static getNum2Blendmode(e) {
		return r.#t[e] ?? "normal";
	}
	static #t = {
		0: "normal",
		1: "add",
		2: "multiply",
		3: "screen"
	};
	get containMovement() {
		return !1;
	}
	renderStart(e) {}
	renderEnd() {}
	clearLay(t) {
		this.ctn.alpha = 1, this.ctn.blendMode = e.NORMAL, this.ctn.pivot.set(0, 0), this.ctn.angle = 0, this.ctn.scale.set(1, 1), s(t, "clear_filter", !1) && (this.ctn.filters = null, this.aFltHArg = []);
	}
	copy(e, t) {
		let n = this.name_;
		this.playback(e.record(), t), this.name = n;
	}
	record() {
		return {
			name: this.name_,
			idx: this.ctn.parent.getChildIndex(this.ctn),
			alpha: this.ctn.alpha,
			blendMode: this.ctn.blendMode,
			rotation: this.ctn.angle,
			scale_x: this.ctn.scale.x,
			scale_y: this.ctn.scale.y,
			pivot_x: this.ctn.pivot.x,
			pivot_y: this.ctn.pivot.y,
			x: this.ctn.x,
			y: this.ctn.y,
			visible: this.ctn.visible,
			aFltHArg: this.aFltHArg
		};
	}
	playback(e, t) {
		this.name = e.name, this.clearLay({ clear_filter: !0 }), this.ctn.alpha = e.alpha, this.ctn.blendMode = e.blendMode, this.ctn.angle = e.rotation, this.ctn.scale.set(e.scale_x, e.scale_y), this.ctn.pivot.set(e.pivot_x, e.pivot_y), this.ctn.position.set(e.x, e.y), this.ctn.visible = e.visible, this.aFltHArg = e.aFltHArg ?? [], this.ctn.filters = this.aFltHArg.length === 0 ? null : this.aFltHArg.map((e) => r.bldFilters(e));
	}
	snapshot(e, t) {
		e.render(this.ctn, { clear: !1 }), t();
	}
	snapshot_end() {}
	makeDesignCast(e) {}
	makeDesignCastChildren(e) {}
	showDesignCast() {}
	showDesignCastChildren() {}
	cvsResize() {}
	cvsResizeChildren() {}
	dump() {
		return ` "idx":${String(this.ctn.parent.getChildIndex(this.ctn))}, "visible":"${String(this.ctn.visible)}", "left":${String(this.ctn.x)}, "top":${String(this.ctn.y)}, "alpha":${String(this.ctn.alpha)}, "rotation":${String(this.ctn.angle)}, "name":"${this.name_}", "scale_x":${String(this.ctn.scale.x)}, "scale_y":${String(this.ctn.scale.y)}, "filters": [${this.aFltHArg.map((e) => `"${e.filter ?? ""}"`).join(",")}]`;
	}
	static setXY(e, t, n, i = !1, s = !1) {
		if (t.pos) {
			r.setXYByPos(e, t.pos, n);
			return;
		}
		let l = e.getBounds(), u = n.scale.x < 0 ? -n.scale.x : n.scale.x, d = u === 1 ? l.width : l.width * u, f = n.scale.y < 0 ? -n.scale.y : n.scale.y, p = f === 1 ? l.height : l.height * f, m = n.x;
		"left" in t ? (m = a(t, "left", 0), m > -1 && m < 1 && (m *= c.stageW)) : "center" in t ? (m = a(t, "center", 0), m > -1 && m < 1 && (m *= c.stageW), m -= (s ? d / 3 : d) / 2) : "right" in t ? (m = a(t, "right", 0), m > -1 && m < 1 && (m *= c.stageW), m -= s ? d / 3 : d) : "s_right" in t && (m = a(t, "s_right", 0), m > -1 && m < 1 && (m *= c.stageW), m = c.stageW - m - (s ? d / 3 : d)), n.x = o(n.scale.x < 0 ? m + (s ? d / 3 : d) : m);
		let h = n.y;
		"top" in t ? (h = a(t, "top", 0), h > -1 && h < 1 && (h *= c.stageH)) : "middle" in t ? (h = a(t, "middle", 0), h > -1 && h < 1 && (h *= c.stageH), h -= p / 2) : "bottom" in t ? (h = a(t, "bottom", 0), h > -1 && h < 1 && (h *= c.stageH), h -= p) : "s_bottom" in t && (h = a(t, "s_bottom", 0), h > -1 && h < 1 && (h *= c.stageH), h = c.stageH - h - p), n.y = o(n.scale.y < 0 ? h + p : h), i && !("left" in t) && !("center" in t) && !("right" in t) && !("s_right" in t) && !("top" in t) && !("middle" in t) && !("bottom" in t) && !("s_bottom" in t) && r.setXYByPos(e, "c", n);
	}
	static setXYByPos(e, t, n) {
		if (t === "stay") return;
		let r = e.getBounds(), i = n.scale.x < 0 ? -n.scale.x : n.scale.x, a = i === 1 ? r.width : r.width * i, s = n.scale.y < 0 ? -n.scale.y : n.scale.y, l = s === 1 ? r.height : r.height * s, u = 0;
		u = !t || t === "c" ? c.stageW * .5 : t === "r" ? c.stageW - a * .5 : t === "l" ? a * .5 : o(t), n.x = o(u - a * .5), n.y = c.stageH - l, n.scale.x < 0 && (n.x += a), n.scale.y < 0 && (n.y += l);
	}
	static setXYCenter(e) {
		let t = e.getBounds();
		e.x = (c.stageW - t.width) * .5, e.y = (c.stageH - t.height) * .5;
	}
};
//#endregion
export { f as t };

//# sourceMappingURL=Layer.js.map