import { m as e } from "./pixi.js";
import { i as t, l as n, r, s as i, t as a } from "./CmnLib.js";
import { t as o } from "./EventListenerCtn.js";
//#region node_modules/motion-utils/dist/es/array.mjs
function s(e, t) {
	e.indexOf(t) === -1 && e.push(t);
}
function c(e, t) {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}
//#endregion
//#region node_modules/motion-utils/dist/es/clamp.mjs
var l = (e, t, n) => n > t ? t : n < e ? e : n;
//#endregion
//#region node_modules/motion-utils/dist/es/format-error-message.mjs
function u(e, t) {
	return t ? `${e}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${t}` : e;
}
//#endregion
//#region node_modules/motion-utils/dist/es/errors.mjs
var d = () => {}, f = () => {};
typeof process < "u" && process.env.NODE_ENV !== "production" && (d = (e, t, n) => {
	!e && typeof console < "u" && console.warn(u(t, n));
}, f = (e, t, n) => {
	if (!e) throw Error(u(t, n));
});
//#endregion
//#region node_modules/motion-utils/dist/es/global-config.mjs
var p = {}, m = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e), h = (e) => typeof e == "object" && !!e, g = (e) => /^0[^.\s]+$/u.test(e);
//#endregion
//#region node_modules/motion-utils/dist/es/memo.mjs
/*#__NO_SIDE_EFFECTS__*/
function _(e) {
	let t;
	return () => (t === void 0 && (t = e()), t);
}
//#endregion
//#region node_modules/motion-utils/dist/es/noop.mjs
var v = /* @__NO_SIDE_EFFECTS__ */ (e) => e, y = (...e) => e.reduce((e, t) => (n) => t(e(n))), b = /* @__NO_SIDE_EFFECTS__ */ (e, t, n) => {
	let r = t - e;
	return r ? (n - e) / r : 1;
}, x = class {
	constructor() {
		this.subscriptions = [];
	}
	add(e) {
		return s(this.subscriptions, e), () => this.remove(e);
	}
	remove(e) {
		c(this.subscriptions, e);
	}
	notify(e, t, n) {
		let r = this.subscriptions.length;
		if (r) {
			if (r === 1) this.subscriptions[0](e, t, n);
			else for (let i = 0; i < r; i++) {
				let r = this.subscriptions[i];
				r && r(e, t, n);
			}
		}
	}
	getSize() {
		return this.subscriptions.length;
	}
	clear() {
		this.subscriptions.length = 0;
	}
}, S = /* @__NO_SIDE_EFFECTS__ */ (e) => e * 1e3, C = /* @__NO_SIDE_EFFECTS__ */ (e) => e / 1e3, w = /* @__NO_SIDE_EFFECTS__ */ (e, t) => t ? 1e3 / t * e : 0, ee = /* @__PURE__ */ new Set();
function te(e, t, n) {
	e || ee.has(t) || (console.warn(u(t, n)), ee.add(t));
}
//#endregion
//#region node_modules/motion-utils/dist/es/wrap.mjs
var ne = (e, t, n) => {
	let r = t - e;
	return ((n - e) % r + r) % r + e;
}, re = (e, t, n) => (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e, ie = 1e-7, ae = 12;
function oe(e, t, n, r, i) {
	let a, o, s = 0;
	do
		o = t + (n - t) / 2, a = re(o, r, i) - e, a > 0 ? n = o : t = o;
	while (Math.abs(a) > ie && ++s < ae);
	return o;
}
/*#__NO_SIDE_EFFECTS__*/
function se(e, t, n, r) {
	if (e === t && n === r) return v;
	let i = (t) => oe(t, 0, 1, e, n);
	return (e) => e === 0 || e === 1 ? e : re(i(e), t, r);
}
//#endregion
//#region node_modules/motion-utils/dist/es/easing/modifiers/mirror.mjs
var ce = /* @__NO_SIDE_EFFECTS__ */ (e) => (t) => t <= .5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2, le = /* @__NO_SIDE_EFFECTS__ */ (e) => (t) => 1 - e(1 - t), ue = /*@__PURE__*/ se(.33, 1.53, .69, .99), de = /*@__PURE__*/ le(ue), fe = /*@__PURE__*/ ce(de), pe = (e) => e >= 1 ? 1 : (e *= 2) < 1 ? .5 * de(e) : .5 * (2 - 2 ** (-10 * (e - 1))), me = (e) => 1 - Math.sin(Math.acos(e)), he = /* @__PURE__ */ le(me), ge = /* @__PURE__ */ ce(me), _e = /*@__PURE__*/ se(.42, 0, 1, 1), ve = /*@__PURE__*/ se(0, 0, .58, 1), ye = /*@__PURE__*/ se(.42, 0, .58, 1), be = /* @__NO_SIDE_EFFECTS__ */ (e) => Array.isArray(e) && typeof e[0] != "number";
//#endregion
//#region node_modules/motion-utils/dist/es/easing/utils/get-easing-for-segment.mjs
/*#__NO_SIDE_EFFECTS__*/
function xe(e, t) {
	return /* @__PURE__ */ be(e) ? e[ne(0, e.length, t)] : e;
}
//#endregion
//#region node_modules/motion-utils/dist/es/easing/utils/is-bezier-definition.mjs
var Se = /* @__NO_SIDE_EFFECTS__ */ (e) => Array.isArray(e) && typeof e[0] == "number", Ce = {
	linear: v,
	easeIn: _e,
	easeInOut: ye,
	easeOut: ve,
	circIn: me,
	circInOut: ge,
	circOut: he,
	backIn: de,
	backInOut: fe,
	backOut: ue,
	anticipate: pe
}, we = (e) => typeof e == "string", Te = (e) => {
	if (/* @__PURE__ */ Se(e)) {
		f(e.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
		let [t, n, r, i] = e;
		return /* @__PURE__ */ se(t, n, r, i);
	}
	return we(e) ? (f(Ce[e] !== void 0, `Invalid easing type '${e}'`, "invalid-easing-type"), Ce[e]) : e;
}, Ee = [
	"setup",
	"read",
	"resolveKeyframes",
	"preUpdate",
	"update",
	"preRender",
	"render",
	"postRender"
];
//#endregion
//#region node_modules/motion-dom/dist/es/frameloop/render-step.mjs
function De(e) {
	let t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set(), r = !1, i = !1, a = /* @__PURE__ */ new Set(), o = {
		delta: 0,
		timestamp: 0,
		isProcessing: !1
	};
	function s(t) {
		a.has(t) && (n.add(t), e()), t(o);
	}
	let c = {
		schedule: (e, i = !1, o = !1) => {
			let s = o && r ? t : n;
			return i && a.add(e), s.add(e), e;
		},
		cancel: (e) => {
			n.delete(e), a.delete(e);
		},
		process: (e) => {
			if (o = e, r) {
				i = !0;
				return;
			}
			r = !0;
			let a = t;
			t = n, n = a, t.forEach(s), t.clear(), r = !1, i && (i = !1, c.process(e));
		}
	};
	return c;
}
//#endregion
//#region node_modules/motion-dom/dist/es/frameloop/batcher.mjs
var Oe = 40;
function ke(e, t) {
	let n = !1, r = !0, i = {
		delta: 0,
		timestamp: 0,
		isProcessing: !1
	}, a = () => n = !0, o = Ee.reduce((e, t) => (e[t] = De(a), e), {}), { setup: s, read: c, resolveKeyframes: l, preUpdate: u, update: d, preRender: f, render: m, postRender: h } = o, g = () => {
		let a = p.useManualTiming, o = a ? i.timestamp : performance.now();
		n = !1, a || (i.delta = r ? 1e3 / 60 : Math.max(Math.min(o - i.timestamp, Oe), 1)), i.timestamp = o, i.isProcessing = !0, s.process(i), c.process(i), l.process(i), u.process(i), d.process(i), f.process(i), m.process(i), h.process(i), i.isProcessing = !1, n && t && (r = !1, e(g));
	}, _ = () => {
		n = !0, r = !0, i.isProcessing || e(g);
	};
	return {
		schedule: Ee.reduce((e, t) => {
			let r = o[t];
			return e[t] = (e, t = !1, i = !1) => (n || _(), r.schedule(e, t, i)), e;
		}, {}),
		cancel: (e) => {
			for (let t = 0; t < Ee.length; t++) o[Ee[t]].cancel(e);
		},
		state: i,
		steps: o
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/frameloop/frame.mjs
var { schedule: T, cancel: Ae, state: E, steps: je } = /* @__PURE__ */ ke(typeof requestAnimationFrame < "u" ? requestAnimationFrame : v, !0), Me;
function Ne() {
	Me = void 0;
}
var D = {
	now: () => (Me === void 0 && D.set(E.isProcessing || p.useManualTiming ? E.timestamp : performance.now()), Me),
	set: (e) => {
		Me = e, queueMicrotask(Ne);
	}
}, O = (e) => Math.round(e * 1e5) / 1e5, Pe = /*@__PURE__*/ ((e) => (t) => typeof t == "string" && t.startsWith(e))("var(--"), Fe = (e) => Pe(e) ? Ie.test(e.split("/*")[0].trim()) : !1, Ie = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function Le(e) {
	return typeof e == "string" && e.split("/*")[0].includes("var(--");
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/numbers/index.mjs
var k = {
	test: (e) => typeof e == "number",
	parse: parseFloat,
	transform: (e) => e
}, A = {
	...k,
	transform: (e) => l(0, 1, e)
}, Re = {
	...k,
	default: 1
}, ze = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/is-nullish.mjs
function Be(e) {
	return e == null;
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/single-color-regex.mjs
var Ve = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, He = (e, t) => (n) => !!(typeof n == "string" && Ve.test(n) && n.startsWith(e) || t && !Be(n) && Object.prototype.hasOwnProperty.call(n, t)), Ue = (e, t, n) => (r) => {
	if (typeof r != "string") return r;
	let [i, a, o, s] = r.match(ze);
	return {
		[e]: parseFloat(i),
		[t]: parseFloat(a),
		[n]: parseFloat(o),
		alpha: s === void 0 ? 1 : parseFloat(s)
	};
}, We = (e) => l(0, 255, e), Ge = {
	...k,
	transform: (e) => Math.round(We(e))
}, j = {
	test: /*@__PURE__*/ He("rgb", "red"),
	parse: /*@__PURE__*/ Ue("red", "green", "blue"),
	transform: ({ red: e, green: t, blue: n, alpha: r = 1 }) => "rgba(" + Ge.transform(e) + ", " + Ge.transform(t) + ", " + Ge.transform(n) + ", " + O(A.transform(r)) + ")"
};
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/color/hex.mjs
function Ke(e) {
	let t = "", n = "", r = "", i = "";
	return e.length > 5 ? (t = e.substring(1, 3), n = e.substring(3, 5), r = e.substring(5, 7), i = e.substring(7, 9)) : (t = e.substring(1, 2), n = e.substring(2, 3), r = e.substring(3, 4), i = e.substring(4, 5), t += t, n += n, r += r, i += i), {
		red: parseInt(t, 16),
		green: parseInt(n, 16),
		blue: parseInt(r, 16),
		alpha: i ? parseInt(i, 16) / 255 : 1
	};
}
var qe = {
	test: /*@__PURE__*/ He("#"),
	parse: Ke,
	transform: j.transform
}, M = /* @__NO_SIDE_EFFECTS__ */ (e) => ({
	test: (t) => typeof t == "string" && t.endsWith(e) && t.split(" ").length === 1,
	parse: parseFloat,
	transform: (t) => `${t}${e}`
}), N = /*@__PURE__*/ M("deg"), P = /*@__PURE__*/ M("%"), F = /*@__PURE__*/ M("px"), Je = /*@__PURE__*/ M("vh"), Ye = /*@__PURE__*/ M("vw"), Xe = {
	...P,
	parse: (e) => P.parse(e) / 100,
	transform: (e) => P.transform(e * 100)
}, I = {
	test: /*@__PURE__*/ He("hsl", "hue"),
	parse: /*@__PURE__*/ Ue("hue", "saturation", "lightness"),
	transform: ({ hue: e, saturation: t, lightness: n, alpha: r = 1 }) => "hsla(" + Math.round(e) + ", " + P.transform(O(t)) + ", " + P.transform(O(n)) + ", " + O(A.transform(r)) + ")"
}, L = {
	test: (e) => j.test(e) || qe.test(e) || I.test(e),
	parse: (e) => j.test(e) ? j.parse(e) : I.test(e) ? I.parse(e) : qe.parse(e),
	transform: (e) => typeof e == "string" ? e : e.hasOwnProperty("red") ? j.transform(e) : I.transform(e),
	getAnimatableNone: (e) => {
		let t = L.parse(e);
		return t.alpha = 0, L.transform(t);
	}
}, Ze = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu, Qe = /*@__PURE__*/ new RegExp(ze.source), $e = /*@__PURE__*/ new RegExp(Ze.source, "i");
function et(e) {
	return isNaN(e) && typeof e == "string" && (Qe.test(e) || $e.test(e));
}
var tt = "number", nt = "color", rt = "var", it = "var(", at = "${}", ot = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function st(e) {
	let t = e.toString();
	return Qe.test(t) || $e.test(t);
}
function R(e) {
	let t = e.toString(), n = [], r = {
		color: [],
		number: [],
		var: []
	}, i = [], a = 0;
	return {
		values: n,
		split: t.replace(ot, (e) => (L.test(e) ? (r.color.push(a), i.push(nt), n.push(L.parse(e))) : e.startsWith(it) ? (r.var.push(a), i.push(rt), n.push(e)) : (r.number.push(a), i.push(tt), n.push(parseFloat(e))), ++a, at)).split(at),
		indexes: r,
		types: i
	};
}
function ct(e) {
	return R(e).values;
}
function lt({ split: e, types: t }) {
	let n = e.length;
	return (r) => {
		let i = "";
		for (let a = 0; a < n; a++) if (i += e[a], r[a] !== void 0) {
			let e = t[a];
			i += e === tt ? O(r[a]) : e === nt ? L.transform(r[a]) : r[a];
		}
		return i;
	};
}
function ut(e) {
	return lt(R(e));
}
var dt = (e) => typeof e == "number" ? 0 : L.test(e) ? L.getAnimatableNone(e) : e, ft = (e, t) => typeof e == "number" ? t?.trim().endsWith("/") ? e : 0 : dt(e);
function pt(e) {
	let t = R(e);
	return lt(t)(t.values.map((e, n) => ft(e, t.split[n])));
}
var z = {
	test: et,
	parse: ct,
	createTransformer: ut,
	getAnimatableNone: pt
};
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/color/hsla-to-rgba.mjs
function mt(e, t, n) {
	return n < 0 && (n += 1), n > 1 && --n, n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function ht({ hue: e, saturation: t, lightness: n, alpha: r }) {
	e /= 360, t /= 100, n /= 100;
	let i = 0, a = 0, o = 0;
	if (!t) i = a = o = n;
	else {
		let r = n < .5 ? n * (1 + t) : n + t - n * t, s = 2 * n - r;
		i = mt(s, r, e + 1 / 3), a = mt(s, r, e), o = mt(s, r, e - 1 / 3);
	}
	return {
		red: Math.round(i * 255),
		green: Math.round(a * 255),
		blue: Math.round(o * 255),
		alpha: r
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/immediate.mjs
function gt(e, t) {
	return (n) => n > 0 ? t : e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/number.mjs
var B = (e, t, n) => e + (t - e) * n, _t = (e, t, n) => {
	let r = e * e, i = n * (t * t - r) + r;
	return i < 0 ? 0 : Math.sqrt(i);
}, vt = [
	qe,
	j,
	I
], yt = (e) => vt.find((t) => t.test(e));
function bt(e) {
	let t = yt(e);
	if (!t) return d(!1, `'${e}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !1;
	let n = t.parse(e);
	return t === I && (n = ht(n)), n;
}
var xt = (e, t) => {
	let n = bt(e), r = bt(t);
	if (!n || !r) return gt(e, t);
	let i = { ...n };
	return (e) => (i.red = _t(n.red, r.red, e), i.green = _t(n.green, r.green, e), i.blue = _t(n.blue, r.blue, e), i.alpha = B(n.alpha, r.alpha, e), j.transform(i));
}, St = /* @__PURE__ */ new Set(["none", "hidden"]);
function Ct(e, t) {
	return St.has(e) ? (n) => n <= 0 ? e : t : (n) => n >= 1 ? t : e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/complex.mjs
function wt(e, t) {
	return (n) => B(e, t, n);
}
function Tt(e) {
	return typeof e == "number" ? wt : typeof e == "string" ? Fe(e) ? gt : L.test(e) ? xt : kt : Array.isArray(e) ? Et : typeof e == "object" ? L.test(e) ? xt : Dt : gt;
}
function Et(e, t) {
	let n = [...e], r = n.length, i = e.map((e, n) => Tt(e)(e, t[n]));
	return (e) => {
		for (let t = 0; t < r; t++) n[t] = i[t](e);
		return n;
	};
}
function Dt(e, t) {
	let n = {
		...e,
		...t
	}, r = {};
	for (let i in n) e[i] !== void 0 && t[i] !== void 0 && (r[i] = Tt(e[i])(e[i], t[i]));
	return (e) => {
		for (let t in r) n[t] = r[t](e);
		return n;
	};
}
function Ot(e, t) {
	let n = [], r = {
		color: 0,
		var: 0,
		number: 0
	};
	for (let i = 0; i < t.values.length; i++) {
		let a = t.types[i], o = e.indexes[a][r[a]], s = e.values[o] ?? 0;
		n[i] = s, r[a]++;
	}
	return n;
}
var kt = (e, t) => {
	let n = z.createTransformer(t), r = R(e), i = R(t);
	return r.indexes.var.length === i.indexes.var.length && r.indexes.color.length === i.indexes.color.length && r.indexes.number.length >= i.indexes.number.length ? St.has(e) && !i.values.length || St.has(t) && !r.values.length ? Ct(e, t) : y(Et(Ot(r, i), i.values), n) : (d(!0, `Complex values '${e}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), gt(e, t));
}, At = /^(-?(?:\d+(?:\.\d*)?|\.\d+))([a-z%]*)$/iu;
function jt(e, t) {
	let n = At.exec(e);
	if (!n) return;
	let r = At.exec(t);
	if (!r || n[2] !== r[2]) return;
	let i = n[2], a = parseFloat(n[1]), o = parseFloat(r[1]);
	return (e) => O(B(a, o, e)) + i;
}
function Mt(e, t, n) {
	if (typeof e == "number" && typeof t == "number" && typeof n == "number") return B(e, t, n);
	if (typeof e == "string" && typeof t == "string") {
		let n = jt(e, t);
		if (n) return n;
	}
	return Tt(e)(e, t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/drivers/frame.mjs
var Nt = (e) => {
	let t = ({ timestamp: t }) => e(t);
	return {
		start: (e = !0) => T.update(t, e),
		stop: () => Ae(t),
		now: () => E.isProcessing ? E.timestamp : D.now()
	};
}, Pt = (e, t, n = 10) => {
	let r = "", i = Math.max(Math.round(t / n), 2);
	for (let t = 0; t < i; t++) r += Math.round(e(t / (i - 1)) * 1e4) / 1e4 + ", ";
	return `linear(${r.substring(0, r.length - 2)})`;
}, Ft = 2e4;
function It(e, t = 50, n = Ft, r) {
	let i = 0, a = e.next(i);
	for (r?.push(a.value); !a.done && i < n;) i += t, a = e.next(i), r?.push(a.value);
	return i >= n ? Infinity : i;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/utils/create-generator-easing.mjs
function Lt(e, t = 100, n) {
	let r = n({
		...e,
		keyframes: [0, t]
	}), i = Math.min(It(r), Ft);
	return {
		type: "keyframes",
		ease: (e) => r.next(i * e).value / t,
		duration: /* @__PURE__ */ C(i)
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/spring.mjs
var V = {
	stiffness: 100,
	damping: 10,
	mass: 1,
	velocity: 0,
	duration: 800,
	bounce: .3,
	visualDuration: .3,
	restSpeed: {
		granular: .01,
		default: 2
	},
	restDelta: {
		granular: .005,
		default: .5
	},
	minDuration: .01,
	maxDuration: 10,
	minDamping: .05,
	maxDamping: 1
};
function Rt(e, t) {
	return e * Math.sqrt(1 - t * t);
}
var zt = 12;
function Bt(e, t, n) {
	let r = n;
	for (let n = 1; n < zt; n++) r -= e(r) / t(r);
	return r;
}
var Vt = .001;
function Ht({ duration: e = V.duration, bounce: t = V.bounce, velocity: n = V.velocity, mass: r = V.mass }) {
	let i, a;
	d(e <= /* @__PURE__ */ S(V.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
	let o = 1 - t;
	o = l(V.minDamping, V.maxDamping, o), e = l(V.minDuration, V.maxDuration, /* @__PURE__ */ C(e)), o < 1 ? (i = (t) => {
		let r = t * o, i = r * e, a = r - n, s = Rt(t, o), c = Math.exp(-i);
		return Vt - a / s * c;
	}, a = (t) => {
		let r = t * o * e, a = r * n + n, s = o * o * t * t * e, c = Math.exp(-r), l = Rt(t * t, o);
		return (-i(t) + Vt > 0 ? -1 : 1) * ((a - s) * c) / l;
	}) : (i = (t) => -.001 + Math.exp(-t * e) * ((t - n) * e + 1), a = (t) => Math.exp(-t * e) * ((n - t) * (e * e)));
	let s = 5 / e, c = Bt(i, a, s);
	if (e = /* @__PURE__ */ S(e), isNaN(c)) return {
		stiffness: V.stiffness,
		damping: V.damping,
		duration: e
	};
	{
		let t = c * c * r;
		return {
			stiffness: t,
			damping: o * 2 * Math.sqrt(r * t),
			duration: e
		};
	}
}
var Ut = ["duration", "bounce"], Wt = [
	"stiffness",
	"damping",
	"mass"
];
function Gt(e, t) {
	return t.some((t) => e[t] !== void 0);
}
function Kt(e) {
	let t = {
		velocity: V.velocity,
		stiffness: V.stiffness,
		damping: V.damping,
		mass: V.mass,
		isResolvedFromDuration: !1,
		...e
	};
	if (!Gt(e, Wt) && Gt(e, Ut)) {
		if (t.velocity = 0, e.visualDuration) {
			let n = e.visualDuration, r = 2 * Math.PI / (n * 1.2), i = r * r, a = 2 * l(.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(i);
			t = {
				...t,
				mass: V.mass,
				stiffness: i,
				damping: a
			};
		} else {
			let n = Ht({
				...e,
				velocity: 0
			});
			t = {
				...t,
				...n,
				mass: V.mass
			}, t.isResolvedFromDuration = !0;
		}
	}
	return t;
}
function H(e = V.visualDuration, t = V.bounce) {
	let n = typeof e == "object" ? e : {
		visualDuration: e,
		keyframes: [0, 1],
		bounce: t
	}, r = n.keyframes[0], i = n.keyframes[n.keyframes.length - 1], a = {
		done: !1,
		value: r
	}, { stiffness: o, damping: s, mass: c, duration: l, velocity: u, isResolvedFromDuration: d } = Kt({
		...n,
		velocity: -/* @__PURE__ */ C(n.velocity || 0)
	}), f = s / (2 * Math.sqrt(o * c)), p = /* @__PURE__ */ C(Math.sqrt(o / c)), m = f * p, h = {
		target: i,
		delta: i - r,
		velocity: u || 0,
		restSpeed: 0,
		restDelta: 0
	}, g = () => {
		let e = Math.abs(h.delta) < 5;
		h.restSpeed = n.restSpeed || (e ? V.restSpeed.granular : V.restSpeed.default), h.restDelta = n.restDelta || (e ? V.restDelta.granular : V.restDelta.default);
	};
	g();
	let _, v, y;
	if (f < 1) {
		let e = Rt(p, f), t = {
			A: 0,
			sinC: 0,
			cosC: 0,
			t: -1,
			env: 0,
			sin: 0,
			cos: 0
		};
		y = () => {
			t.A = (h.velocity + m * h.delta) / e, t.sinC = m * t.A + h.delta * e, t.cosC = m * h.delta - t.A * e;
		};
		let n = (n) => {
			n !== t.t && (t.t = n, t.env = Math.exp(-m * n), t.sin = Math.sin(e * n), t.cos = Math.cos(e * n));
		};
		_ = (e) => (n(e), h.target - t.env * (t.A * t.sin + h.delta * t.cos)), v = (e) => (n(e), t.env * (t.sinC * t.sin + t.cosC * t.cos));
	} else if (f === 1) {
		_ = (e) => h.target - Math.exp(-p * e) * (h.delta + (h.velocity + p * h.delta) * e);
		let e = { C: 0 };
		y = () => {
			e.C = h.velocity + p * h.delta;
		}, v = (t) => Math.exp(-p * t) * (p * e.C * t - h.velocity);
	} else {
		let e = p * Math.sqrt(f * f - 1);
		_ = (t) => {
			let n = Math.exp(-m * t), r = Math.min(e * t, 300);
			return h.target - n * ((h.velocity + m * h.delta) * Math.sinh(r) + e * h.delta * Math.cosh(r)) / e;
		};
		let t = {
			P: 0,
			sinh: 0,
			cosh: 0
		};
		y = () => {
			t.P = (h.velocity + m * h.delta) / e, t.sinh = m * t.P - h.delta * e, t.cosh = m * h.delta - t.P * e;
		}, v = (n) => {
			let r = Math.exp(-m * n), i = Math.min(e * n, 300);
			return r * (t.sinh * Math.sinh(i) + t.cosh * Math.cosh(i));
		};
	}
	y();
	let b = !Gt(n, Wt) && Gt(n, Ut), x = d && l || null, w = {
		calculatedDuration: x,
		retarget: (e, t) => {
			h.target = e[e.length - 1], h.delta = h.target - e[0], h.velocity = b ? 0 : -/* @__PURE__ */ C(t), n.restSpeed && n.restDelta || g(), w.calculatedDuration = x, a.done = !1, y();
		},
		velocity: (e) => /* @__PURE__ */ S(v(e)),
		next: (e) => {
			let t = _(e);
			if (d) a.done = e >= l;
			else {
				let n = /* @__PURE__ */ S(v(e));
				a.done = Math.abs(n) <= h.restSpeed && Math.abs(h.target - t) <= h.restDelta;
			}
			return a.value = a.done ? h.target : t, a;
		},
		toString: () => {
			let e = Math.min(It(w), Ft), t = Pt((t) => w.next(e * t).value, e, 30);
			return e + "ms " + t;
		},
		toTransition: () => {}
	};
	return w;
}
H.applyToOptions = (e) => {
	let t = Lt(e, 100, H);
	return e.ease = t.ease, e.duration = /* @__PURE__ */ S(t.duration), e.type = "keyframes", e;
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/inertia.mjs
function qt({ keyframes: e, velocity: t = 0, power: n = .8, timeConstant: r = 325, bounceDamping: i = 10, bounceStiffness: a = 500, modifyTarget: o, min: s, max: c, restDelta: l = .5, restSpeed: u }) {
	let d = e[0], f = {
		done: !1,
		value: d
	}, p = (e) => e < s || e > c, m = (e) => s === void 0 ? c : c === void 0 || Math.abs(s - e) < Math.abs(c - e) ? s : c, h = n * t, g = d + h, _ = o === void 0 ? g : o(g);
	_ !== g && (h = _ - d);
	let v = (e) => -h * Math.exp(-e / r), y = (e) => {
		let t = v(e);
		f.done = Math.abs(t) <= l, f.value = f.done ? _ : _ + t;
	}, b, x, S = (e) => {
		p(f.value) && (b = e, x = H({
			keyframes: [f.value, m(f.value)],
			velocity: -v(e) / r * 1e3,
			damping: i,
			stiffness: a,
			restDelta: l,
			restSpeed: u
		}));
	};
	return S(0), {
		calculatedDuration: null,
		next: (e) => {
			let t = !1;
			return !x && b === void 0 && (t = !0, y(e), S(e)), b !== void 0 && e >= b ? x.next(e - b) : (!t && y(e), f);
		}
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/interpolate.mjs
function Jt(e, t, n) {
	let r = [], i = n || p.mix || Mt, a = e.length - 1;
	for (let n = 0; n < a; n++) {
		let a = i(e[n], e[n + 1]);
		t && (a = y(Array.isArray(t) ? t[n] || v : t, a)), r.push(a);
	}
	return r;
}
function Yt(e, t, { clamp: n = !0, ease: r, mixer: i } = {}) {
	let a = e.length;
	if (f(a === t.length, "Both input and output ranges must be the same length", "range-length"), a === 1) return () => t[0];
	if (a === 2 && t[0] === t[1]) return () => t[1];
	let o = e[0] === e[1];
	e[0] > e[a - 1] && (e = [...e].reverse(), t = [...t].reverse());
	let s = Jt(t, r, i), c = s.length, u = (n) => {
		if (o && n < e[0]) return t[0];
		let r = 0;
		if (c > 1) for (; r < e.length - 2 && !(n < e[r + 1]); r++);
		let i = /* @__PURE__ */ b(e[r], e[r + 1], n);
		return s[r](i);
	};
	return n ? (t) => u(l(e[0], e[a - 1], t)) : u;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/offsets/fill.mjs
function Xt(e, t) {
	let n = e[e.length - 1];
	for (let r = 1; r <= t; r++) {
		let i = /* @__PURE__ */ b(0, t, r);
		e.push(B(n, 1, i));
	}
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/offsets/default.mjs
function Zt(e) {
	let t = [0];
	return Xt(t, e.length - 1), t;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/offsets/time.mjs
function Qt(e, t) {
	return e.map((e) => e * t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/keyframes.mjs
function $t(e, t) {
	return e.map(() => t || ye).splice(0, e.length - 1);
}
function U({ duration: e = 300, keyframes: t, times: n, ease: r = "easeInOut" }) {
	let i = /* @__PURE__ */ be(r) ? r.map(Te) : Te(r), a = {
		done: !1,
		value: t[0]
	};
	if (t.length === 2 && !Array.isArray(i) && (!n || n.length !== 2 || n[0] === 0 && n[1] === 1)) {
		let [n, r] = t, o = n === r ? void 0 : (p.mix || Mt)(n, r);
		return {
			calculatedDuration: e,
			next: (t) => (a.value = o ? o(i(e > 0 ? l(0, 1, t / e) : 1)) : r, a.done = t >= e, a)
		};
	}
	let o = Yt(Qt(n && n.length === t.length ? n : Zt(t), e), t, { ease: Array.isArray(i) ? i : $t(t, i) });
	return {
		calculatedDuration: e,
		next: (t) => (a.value = o(t), a.done = t >= e, a)
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/utils/velocity.mjs
var en = 5;
function tn(e, t, n) {
	let r = Math.max(t - en, 0);
	return /* @__PURE__ */ w(n - e(r), t - r);
}
function nn(e, t, n = 0) {
	return t <= 0 ? n : e.velocity ? e.velocity(t) : tn((t) => e.next(t).value, t, e.next(t).value);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/get-final.mjs
var rn = (e) => e !== null;
function an(e, { repeat: t, repeatType: n = "loop" }, r, i = 1) {
	let a = e.filter(rn), o = i < 0 || t && n !== "loop" && t % 2 == 1 ? 0 : a.length - 1;
	return !o || r === void 0 ? a[o] : r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/replace-transition-type.mjs
var on = {
	decay: qt,
	inertia: qt,
	tween: U,
	keyframes: U,
	spring: H
};
function sn(e) {
	typeof e.type == "string" && (e.type = on[e.type]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/notify-inspector.mjs
function cn(e, t) {
	return {
		kind: e,
		animation: t,
		timestamp: D.now(),
		frameTimestamp: E.timestamp,
		frameIsProcessing: E.isProcessing
	};
}
function ln(e, t, n) {
	let r = globalThis.__MOTION_INSPECT__;
	if (r) try {
		r({
			...cn("animation-start", e),
			options: n ? {
				...t,
				...n
			} : t
		});
	} catch {}
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/WithPromise.mjs
var un = class {
	constructor() {
		this.isResolved = !1;
	}
	get finished() {
		return this._finished ||= this.isResolved ? Promise.resolve() : new Promise((e) => {
			this._resolve = e;
		}), this._finished;
	}
	updateFinished() {
		this._finished = this._resolve = void 0, this.isResolved = !1;
	}
	notifyFinished() {
		this.isResolved = !0, this._resolve?.();
	}
	then(e, t) {
		return this.finished.then(e, t);
	}
}, dn = (e) => e / 100, fn = class extends un {
	constructor(e) {
		super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
			done: !1,
			value: void 0
		}, this.stop = () => {
			let { motionValue: e } = this.options;
			e && e.updatedAt !== D.now() && this.tick(D.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
		}, this.options = e, this.initAnimation(), this.play(), e.autoplay === !1 && this.pause(), ln(this, this.options);
	}
	initAnimation() {
		let { options: e } = this;
		sn(e);
		let { type: t = U, repeat: n = 0, repeatDelay: r = 0, repeatType: i, velocity: a = 0 } = e, { keyframes: o } = e, s = t || U;
		process.env.NODE_ENV !== "production" && s !== U && f(o.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${o}`, "spring-two-frames"), s !== U && typeof o[0] != "number" && (this.mixKeyframes = y(dn, Mt(o[0], o[1])), o = [0, 100]);
		let c = s(o === e.keyframes ? e : {
			...e,
			keyframes: o
		});
		i === "mirror" && (this.mirroredGenerator = s({
			...e,
			keyframes: [...o].reverse(),
			velocity: -a
		})), c.calculatedDuration === null && (c.calculatedDuration = It(c));
		let { calculatedDuration: l } = c;
		this.calculatedDuration = l, this.resolvedDuration = l + r, this.totalDuration = this.resolvedDuration * (n + 1) - r, this.generator = c;
	}
	updateTime(e) {
		let t = Math.round(e - this.startTime) * this.playbackSpeed;
		this.currentTime = this.holdTime === null ? t : this.holdTime;
	}
	tick(e, t = !1) {
		let { generator: n, totalDuration: r, mixKeyframes: i, mirroredGenerator: a, resolvedDuration: o, calculatedDuration: s } = this;
		if (this.startTime === null) return n.next(0);
		let { delay: c = 0, keyframes: u, repeat: d, repeatType: f, repeatDelay: p, type: m, onUpdate: h, finalKeyframe: g } = this.options;
		this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - r / this.speed, this.startTime)), t ? this.currentTime = e : this.updateTime(e);
		let _ = this.currentTime - c * (this.playbackSpeed >= 0 ? 1 : -1), v = this.playbackSpeed >= 0 ? _ < 0 : _ > r;
		this.currentTime = Math.max(_, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = r);
		let y = this.currentTime, b = n;
		if (d) {
			let e = Math.min(this.currentTime, r) / o, t = Math.floor(e), n = e % 1;
			!n && e >= 1 && (n = 1), n === 1 && t--, t = Math.min(t, d + 1), t % 2 && (f === "reverse" ? (n = 1 - n, p && (n -= p / o)) : f === "mirror" && (b = a)), y = l(0, 1, n) * o;
		}
		let x;
		v ? (this.delayState.value = u[0], x = this.delayState) : x = b.next(y), i && !v && (x.value = i(x.value));
		let { done: S } = x;
		!v && s !== null && (S = this.playbackSpeed >= 0 ? this.currentTime >= r : this.currentTime <= 0);
		let C = this.holdTime === null && (this.state === "finished" || this.state === "running" && S);
		return C && m !== qt && (x.value = an(u, this.options, g, this.speed)), h && h(x.value), C && this.finish(), x;
	}
	then(e, t) {
		return this.finished.then(e, t);
	}
	get duration() {
		return /* @__PURE__ */ C(this.calculatedDuration);
	}
	get iterationDuration() {
		let { delay: e = 0 } = this.options || {};
		return this.duration + /* @__PURE__ */ C(e);
	}
	get time() {
		return /* @__PURE__ */ C(this.currentTime);
	}
	set time(e) {
		e = /* @__PURE__ */ S(e), this.currentTime = e, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = e : this.driver && (this.startTime = this.driver.now() - e / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = e, this.tick(e));
	}
	getGeneratorVelocity() {
		return nn(this.generator, this.currentTime, this.options.velocity);
	}
	get speed() {
		return this.playbackSpeed;
	}
	set speed(e) {
		let t = this.playbackSpeed !== e;
		t && this.driver && this.updateTime(D.now()), this.playbackSpeed = e, t && this.driver && (this.time = /* @__PURE__ */ C(this.currentTime));
	}
	play() {
		if (this.isStopped) return;
		let { driver: e = Nt, startTime: t } = this.options;
		this.driver ||= e((e) => this.tick(e)), this.options.onPlay?.();
		let n = this.driver.now();
		this.state === "finished" ? (this.updateFinished(), this.startTime = n) : this.holdTime === null ? this.startTime ||= t ?? n : this.startTime = n - this.holdTime, this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
	}
	pause() {
		this.state = "paused", this.updateTime(D.now()), this.holdTime = this.currentTime;
	}
	complete() {
		this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
	}
	finish() {
		this.notifyFinished(), this.teardown(), this.state = "finished", this.options.onComplete?.();
	}
	cancel() {
		this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), this.options.onCancel?.();
	}
	teardown() {
		this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
	}
	stopDriver() {
		this.driver &&= (this.driver.stop(), void 0);
	}
	sample(e) {
		return this.startTime = 0, this.tick(e, !0);
	}
	attachTimeline(e) {
		return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), this.driver?.stop(), e.observe(this);
	}
}, pn = /* @__PURE__ */ new Set([
	"brightness",
	"contrast",
	"saturate",
	"opacity"
]);
function mn(e) {
	let [t, n] = e.slice(0, -1).split("(");
	if (t === "drop-shadow") return e;
	let [r] = n.match(ze) || [];
	if (!r) return e;
	let i = n.replace(r, ""), a = +!!pn.has(t);
	return r !== n && (a *= 100), t + "(" + a + i + ")";
}
var hn = /\b([a-z-]*)\(.*?\)/gu, gn = {
	...z,
	getAnimatableNone: (e) => {
		let t = e.match(hn);
		return t ? t.map(mn).join(" ") : e;
	}
}, _n = {
	...z,
	getAnimatableNone: (e) => {
		let t = z.parse(e);
		return z.createTransformer(e)(t.map((e) => typeof e == "number" ? 0 : typeof e == "object" ? {
			...e,
			alpha: 1
		} : e));
	}
}, vn = {
	...k,
	transform: Math.round
}, yn = {
	rotate: N,
	pathRotation: N,
	rotateX: N,
	rotateY: N,
	rotateZ: N,
	scale: Re,
	scaleX: Re,
	scaleY: Re,
	scaleZ: Re,
	skew: N,
	skewX: N,
	skewY: N,
	distance: F,
	translateX: F,
	translateY: F,
	translateZ: F,
	x: F,
	y: F,
	z: F,
	perspective: F,
	transformPerspective: F,
	opacity: A,
	originX: Xe,
	originY: Xe,
	originZ: F
}, W = {
	borderWidth: F,
	borderTopWidth: F,
	borderRightWidth: F,
	borderBottomWidth: F,
	borderLeftWidth: F,
	borderRadius: F,
	borderTopLeftRadius: F,
	borderTopRightRadius: F,
	borderBottomRightRadius: F,
	borderBottomLeftRadius: F,
	width: F,
	maxWidth: F,
	height: F,
	maxHeight: F,
	top: F,
	right: F,
	bottom: F,
	left: F,
	inset: F,
	insetBlock: F,
	insetBlockStart: F,
	insetBlockEnd: F,
	insetInline: F,
	insetInlineStart: F,
	insetInlineEnd: F,
	padding: F,
	paddingTop: F,
	paddingRight: F,
	paddingBottom: F,
	paddingLeft: F,
	paddingBlock: F,
	paddingBlockStart: F,
	paddingBlockEnd: F,
	paddingInline: F,
	paddingInlineStart: F,
	paddingInlineEnd: F,
	margin: F,
	marginTop: F,
	marginRight: F,
	marginBottom: F,
	marginLeft: F,
	marginBlock: F,
	marginBlockStart: F,
	marginBlockEnd: F,
	marginInline: F,
	marginInlineStart: F,
	marginInlineEnd: F,
	fontSize: F,
	backgroundPositionX: F,
	backgroundPositionY: F,
	...yn,
	zIndex: vn,
	fillOpacity: A,
	strokeOpacity: A,
	numOctaves: vn
}, bn = {
	...W,
	color: L,
	backgroundColor: L,
	outlineColor: L,
	fill: L,
	stroke: L,
	borderColor: L,
	borderTopColor: L,
	borderRightColor: L,
	borderBottomColor: L,
	borderLeftColor: L,
	filter: gn,
	WebkitFilter: gn,
	mask: _n,
	WebkitMask: _n
}, xn = (e) => bn[e], Sn = /*@__PURE__*/ new Set([gn, _n]);
function Cn(e, t) {
	let n = xn(e);
	return Sn.has(n) || (n = z), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/fill-wildcards.mjs
function wn(e) {
	for (let t = 1; t < e.length; t++) e[t] ?? (e[t] = e[t - 1]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/parse-transform.mjs
var G = (e) => e * 180 / Math.PI, Tn = (e) => Dn(G(Math.atan2(e[1], e[0]))), En = {
	x: 4,
	y: 5,
	translateX: 4,
	translateY: 5,
	scaleX: 0,
	scaleY: 3,
	scale: (e) => (Math.abs(e[0]) + Math.abs(e[3])) / 2,
	rotate: Tn,
	rotateZ: Tn,
	skewX: (e) => G(Math.atan(e[1])),
	skewY: (e) => G(Math.atan(e[2])),
	skew: (e) => (Math.abs(e[1]) + Math.abs(e[2])) / 2
}, Dn = (e) => (e %= 360, e < 0 && (e += 360), e), On = Tn, kn = (e) => Math.sqrt(e[0] * e[0] + e[1] * e[1]), An = (e) => Math.sqrt(e[4] * e[4] + e[5] * e[5]), jn = {
	x: 12,
	y: 13,
	z: 14,
	translateX: 12,
	translateY: 13,
	translateZ: 14,
	scaleX: kn,
	scaleY: An,
	scale: (e) => (kn(e) + An(e)) / 2,
	rotateX: (e) => Dn(G(Math.atan2(e[6], e[5]))),
	rotateY: (e) => Dn(G(Math.atan2(-e[2], e[0]))),
	rotateZ: On,
	rotate: On,
	skewX: (e) => G(Math.atan(e[4])),
	skewY: (e) => G(Math.atan(e[1])),
	skew: (e) => (Math.abs(e[1]) + Math.abs(e[4])) / 2
};
function Mn(e) {
	return +!!e.includes("scale");
}
function Nn(e, t) {
	if (!e || e === "none") return Mn(t);
	let n = e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u), r, i;
	if (n) r = jn, i = n;
	else {
		let t = e.match(/^matrix\(([-\d.e\s,]+)\)$/u);
		r = En, i = t;
	}
	if (!i) return Mn(t);
	let a = r[t], o = i[1].split(",").map(Fn);
	return typeof a == "function" ? a(o) : o[a];
}
var Pn = (e, t) => {
	let { transform: n = "none" } = getComputedStyle(e);
	return Nn(n, t);
};
function Fn(e) {
	return parseFloat(e.trim());
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs
var K = [
	"transformPerspective",
	"x",
	"y",
	"z",
	"translateX",
	"translateY",
	"translateZ",
	"scale",
	"scaleX",
	"scaleY",
	"rotate",
	"rotateX",
	"rotateY",
	"rotateZ",
	"skew",
	"skewX",
	"skewY"
], In = /* @__PURE__ */ new Set([...K, "pathRotation"]), Ln = (e) => e === k || e === F, Rn = /* @__PURE__ */ new Set([
	"x",
	"y",
	"z"
]), zn = K.filter((e) => !Rn.has(e));
function Bn(e) {
	let t = [];
	return zn.forEach((n) => {
		let r = e.getValue(n);
		if (r !== void 0) {
			let e = r.get(), i = +!!n.startsWith("scale");
			if (e === i) return;
			t.push([n, e]), r.set(i);
		}
	}), t;
}
var Vn = /* @__PURE__ */ new Set(["bottom", "right"]);
function Hn(e, t, n, r, i, a) {
	let o = parseFloat(e);
	if (!isNaN(o)) return o;
	let { min: s, max: c } = t()[n], l = c - s;
	return a === "border-box" ? l : l - parseFloat(r) - parseFloat(i);
}
var q = {
	width: ({ width: e, paddingLeft: t = "0", paddingRight: n = "0", boxSizing: r }, i) => Hn(e, i, "x", t, n, r),
	height: ({ height: e, paddingTop: t = "0", paddingBottom: n = "0", boxSizing: r }, i) => Hn(e, i, "y", t, n, r),
	top: ({ top: e }) => parseFloat(e),
	left: ({ left: e }) => parseFloat(e),
	bottom: ({ top: e }, t) => {
		let { y: n } = t();
		return parseFloat(e) + (n.max - n.min);
	},
	right: ({ left: e }, t) => {
		let { x: n } = t();
		return parseFloat(e) + (n.max - n.min);
	},
	x: ({ transform: e }) => Nn(e, "x"),
	y: ({ transform: e }) => Nn(e, "y")
};
q.translateX = q.x, q.translateY = q.y;
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/KeyframesResolver.mjs
var J = /* @__PURE__ */ new Set(), Un = !1, Wn = !1, Gn = !1;
function Kn() {
	if (Wn) {
		let e = [], t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set();
		J.forEach((r) => {
			r.needsMeasurement && (e.push(r), t.add(r.element), Vn.has(r.name) && n.add(r.element));
		});
		let r = /* @__PURE__ */ new Map();
		n.forEach((e) => {
			let t = Bn(e);
			t.length && (r.set(e, t), e.render());
		}), e.forEach((e) => e.measureInitialState()), t.forEach((e) => {
			e.render();
			let t = r.get(e);
			t && t.forEach(([t, n]) => {
				e.getValue(t)?.set(n);
			});
		}), e.forEach((e) => e.measureEndState()), e.forEach((e) => {
			e.suspendedScrollY !== void 0 && window.scrollTo(0, e.suspendedScrollY);
		});
	}
	Wn = !1, Un = !1, J.forEach((e) => e.complete(Gn)), J.clear();
}
function qn() {
	J.forEach((e) => {
		e.readKeyframes(), e.needsMeasurement && (Wn = !0);
	});
}
function Jn() {
	Gn = !0, qn(), Kn(), Gn = !1;
}
function Yn(e, t, n) {
	if (typeof e == "string") {
		if (m(e) || g(e)) return parseFloat(e);
		if (!z.test(e) && z.test(n)) return Cn(t, n);
	}
	return e ?? void 0;
}
var Xn = class {
	constructor(e, t, n, r, i, a = !1) {
		this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...e], this.onComplete = t, this.name = n, this.motionValue = r, this.element = i, this.isAsync = a;
	}
	scheduleResolve() {
		this.state = "scheduled", this.isAsync ? (J.add(this), Un || (Un = !0, T.read(qn), T.resolveKeyframes(Kn))) : (this.readKeyframes(), this.complete());
	}
	readKeyframes() {
		let { unresolvedKeyframes: e, name: t, element: n, motionValue: r } = this;
		if (e[0] === null) {
			let i = r?.get(), a = e[e.length - 1];
			if (i !== void 0) e[0] = i;
			else if (n && t) {
				let r = Yn(n.readValue(t, a), t, a);
				r !== void 0 && (e[0] = r);
			}
			e[0] === void 0 && (e[0] = a), r && i === void 0 && r.set(e[0]);
		}
		wn(e);
	}
	setFinalKeyframe() {}
	measureInitialState() {}
	renderEndStyles() {}
	measureEndState() {}
	complete(e = !1) {
		this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e), J.delete(this);
	}
	cancel() {
		this.state === "scheduled" && (J.delete(this), this.state = "pending");
	}
	resume() {
		this.state === "pending" && this.scheduleResolve();
	}
}, Zn = (e) => e.startsWith("--");
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/style-set.mjs
function Qn(e, t, n) {
	Zn(t) ? e.style.setProperty(t, n) : e.style[t] = n;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/flags.mjs
var $n = {};
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/memo.mjs
function er(e, t) {
	let n = /* @__PURE__ */ _(e);
	return () => $n[t] ?? n();
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs
var tr = /* @__PURE__ */ er(() => window.ScrollTimeline !== void 0, "scrollTimeline"), nr = /*@__PURE__*/ er(() => {
	try {
		document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
	} catch {
		return !1;
	}
	return !0;
}, "linearEasing"), Y = ([e, t, n, r]) => `cubic-bezier(${e}, ${t}, ${n}, ${r})`, rr = {
	linear: "linear",
	ease: "ease",
	easeIn: "ease-in",
	easeOut: "ease-out",
	easeInOut: "ease-in-out",
	circIn: /*@__PURE__*/ Y([
		0,
		.65,
		.55,
		1
	]),
	circOut: /*@__PURE__*/ Y([
		.55,
		0,
		1,
		.45
	]),
	backIn: /*@__PURE__*/ Y([
		.31,
		.01,
		.66,
		-.59
	]),
	backOut: /*@__PURE__*/ Y([
		.33,
		1.53,
		.69,
		.99
	])
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/easing/map-easing.mjs
function ir(e, t) {
	if (e) return typeof e == "function" ? nr() ? Pt(e, t) : "ease-out" : /* @__PURE__ */ Se(e) ? Y(e) : Array.isArray(e) ? e.map((e) => ir(e, t) || rr.easeOut) : rr[e];
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/start-waapi-animation.mjs
function ar(e, t, n, { delay: r = 0, duration: i = 300, repeat: a = 0, repeatType: o = "loop", ease: s = "easeOut", times: c } = {}, l = void 0) {
	let u = { [t]: n };
	c && (u.offset = c);
	let d = ir(s, i);
	Array.isArray(d) && (u.easing = d);
	let f = {
		delay: r,
		duration: i,
		easing: Array.isArray(d) ? "linear" : d,
		fill: "both",
		iterations: a + 1,
		direction: o === "reverse" ? "alternate" : "normal"
	};
	return l && (f.pseudoElement = l), e.animate(u, f);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs
function or(e) {
	return typeof e == "function" && "applyToOptions" in e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/utils/apply-generator.mjs
function sr({ type: e, ...t }) {
	return or(e) && nr() ? e.applyToOptions(t) : (t.duration ??= 300, t.ease ??= "easeOut", t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/NativeAnimation.mjs
var cr = class extends un {
	constructor(e) {
		if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !e) return;
		let { element: t, name: n, keyframes: r, pseudoElement: i, allowFlatten: a = !1, finalKeyframe: o, onComplete: s } = e;
		this.isPseudoElement = !!i, this.allowFlatten = a, this.options = e, f(typeof e.type != "string", "Mini animate() doesn't support \"type\" as a string.", "mini-spring");
		let c = sr(e);
		this.animation = ar(t, n, r, c, i), c.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
			if (this.finishedTime = this.time, !i) {
				let e = an(r, this.options, o, this.speed);
				this.updateMotionValue && this.updateMotionValue(e), Qn(t, n, e), this.animation.cancel();
			}
			s?.(), this.notifyFinished();
		}, ln(this, e, c);
	}
	play() {
		this.isStopped || (this.manualStartTime = null, this.animation.play(), this.state === "finished" && this.updateFinished());
	}
	pause() {
		this.animation.pause();
	}
	complete() {
		this.animation.finish?.();
	}
	cancel() {
		try {
			this.animation.cancel();
		} catch {}
	}
	stop() {
		if (this.isStopped) return;
		this.isStopped = !0;
		let { state: e } = this;
		e !== "idle" && e !== "finished" && (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
	}
	commitStyles() {
		let e = this.options?.element;
		!this.isPseudoElement && e?.isConnected && this.animation.commitStyles?.();
	}
	get duration() {
		let e = this.animation.effect?.getComputedTiming?.().duration || 0;
		return /* @__PURE__ */ C(Number(e));
	}
	get iterationDuration() {
		let { delay: e = 0 } = this.options || {};
		return this.duration + /* @__PURE__ */ C(e);
	}
	get time() {
		return /* @__PURE__ */ C(Number(this.animation.currentTime) || 0);
	}
	set time(e) {
		let t = this.finishedTime !== null;
		this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ S(e), t && this.animation.pause();
	}
	get speed() {
		return this.animation.playbackRate;
	}
	set speed(e) {
		e < 0 && (this.finishedTime = null), this.animation.playbackRate = e;
	}
	get state() {
		return this.finishedTime === null ? this.animation.playState : "finished";
	}
	get startTime() {
		return this.manualStartTime ?? Number(this.animation.startTime);
	}
	set startTime(e) {
		this.manualStartTime = this.animation.startTime = e;
	}
	attachTimeline({ timeline: e, rangeStart: t, rangeEnd: n, observe: r }) {
		return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, e && tr() ? (this.animation.timeline = e, t && (this.animation.rangeStart = t), n && (this.animation.rangeEnd = n), v) : r(this);
	}
}, lr = {
	anticipate: pe,
	backInOut: fe,
	circInOut: ge
};
function ur(e) {
	return e in lr;
}
function dr(e) {
	typeof e.ease == "string" && ur(e.ease) && (e.ease = lr[e.ease]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/NativeAnimationExtended.mjs
var fr = 10, pr = class extends cr {
	constructor(e) {
		dr(e), sn(e), super(e), e.startTime !== void 0 && e.autoplay !== !1 && (this.startTime = e.startTime), this.options = e;
	}
	updateMotionValue(e) {
		let { motionValue: t, onUpdate: n, onComplete: r, element: i, ...a } = this.options;
		if (!t) return;
		if (e !== void 0) {
			t.set(e);
			return;
		}
		let o = new fn({
			...a,
			autoplay: !1
		}), s = Math.max(fr, D.now() - this.startTime), c = l(0, fr, s - fr), u = o.sample(s).value, { name: d } = this.options;
		i && d && Qn(i, d, u), t.setWithVelocity(o.sample(Math.max(0, s - c)).value, u, c), o.stop();
	}
}, mr = (e, t) => t !== "zIndex" && !!(typeof e == "number" || Array.isArray(e) || typeof e == "string" && (z.test(e) || e === "0") && !e.startsWith("url("));
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/can-animate.mjs
function hr(e) {
	let t = e[0];
	if (e.length === 1) return !0;
	for (let n = 0; n < e.length; n++) if (e[n] !== t) return !0;
}
function gr(e, t, n, r) {
	let i = e[0];
	if (i === null) return !1;
	if (t === "display" || t === "visibility") return !0;
	let a = e[e.length - 1], o = mr(i, t), s = mr(a, t);
	return !o || !s ? (o !== s && d(!1, `You are trying to animate ${t} from "${i}" to "${a}". "${o ? a : i}" is not an animatable value.`, "value-not-animatable"), !1) : hr(e) || (n === "spring" || or(n)) && r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/make-animation-instant.mjs
function _r(e) {
	e.duration = 0, e.type = "keyframes";
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/utils/accelerated-values.mjs
var vr = /* @__PURE__ */ new Set([
	"opacity",
	"clipPath",
	"filter",
	"transform",
	"backgroundColor"
]), yr = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function br(e) {
	for (let t = 0; t < e.length; t++) if (typeof e[t] == "string" && yr.test(e[t])) return !0;
	return !1;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/supports/waapi.mjs
var xr = /* @__PURE__ */ new Set([
	"color",
	"backgroundColor",
	"outlineColor",
	"fill",
	"stroke",
	"borderColor",
	"borderTopColor",
	"borderRightColor",
	"borderBottomColor",
	"borderLeftColor"
]), Sr = /*@__PURE__*/ _(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function Cr(e) {
	let { motionValue: t, name: n, repeatDelay: r, repeatType: i, damping: a, type: o, keyframes: s } = e;
	if (!n || !(vr.has(n) || xr.has(n))) return !1;
	let c = t?.owner?.current;
	if (!(c instanceof HTMLElement) && !(c instanceof SVGElement)) return !1;
	let { onUpdate: l, transformTemplate: u } = t.owner.getProps();
	return Sr() && (vr.has(n) || xr.has(n) && br(s)) && (n !== "transform" || !u) && !l && !r && i !== "mirror" && a !== 0 && o !== "inertia";
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/AsyncMotionValueAnimation.mjs
var wr = 40, Tr = class extends un {
	constructor(e) {
		super(), this.stop = () => {
			this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
		}, this.createdAt = D.now();
		let { keyframes: t, name: n, motionValue: r, element: i } = e, a = e;
		a.autoplay ??= !0, a.delay ??= 0, a.type ??= "keyframes", a.repeat ??= 0, a.repeatDelay ??= 0, a.repeatType ??= "loop";
		let o = i?.KeyframeResolver || Xn;
		this.keyframeResolver = new o(t, (e, t, n) => this.onKeyframesResolved(e, t, a, !n), n, r, i), this.keyframeResolver?.scheduleResolve();
	}
	onKeyframesResolved(e, t, n, r) {
		this.keyframeResolver = void 0;
		let { name: i, type: a, velocity: o, delay: s, isHandoff: c, onUpdate: l } = n;
		this.resolvedAt = D.now();
		let u = !0;
		gr(e, i, a, o) || (u = !1, (p.instantAnimations || !s) && l?.(an(e, n, t)), e[0] = e[e.length - 1], _r(n), n.repeat = 0);
		let d = r ? this.resolvedAt && this.resolvedAt - this.createdAt > wr ? this.resolvedAt : this.createdAt : void 0, { onComplete: f } = n;
		n.startTime ??= d, n.finalKeyframe = t, n.keyframes = e, n.onComplete = () => {
			f?.(), this.notifyFinished();
		};
		let m = u && !c && Cr(n), h;
		if (m) {
			n.element = n.motionValue?.owner?.current;
			try {
				h = new pr(n);
			} catch {
				h = new fn(n);
			}
		} else h = new fn(n);
		this.pendingTimeline &&= (this.stopTimeline = h.attachTimeline(this.pendingTimeline), void 0), this._animation = h;
	}
	get finished() {
		return this._animation ? this._animation.finished : super.finished;
	}
	then(e, t) {
		return this.finished.finally(e).then(() => {});
	}
	get animation() {
		return this._animation || (this.keyframeResolver?.resume(), Jn()), this._animation;
	}
	get duration() {
		return this.animation.duration;
	}
	get iterationDuration() {
		return this.animation.iterationDuration;
	}
	get time() {
		return this.animation.time;
	}
	set time(e) {
		this.animation.time = e;
	}
	get speed() {
		return this.animation.speed;
	}
	get state() {
		return this.animation.state;
	}
	set speed(e) {
		this.animation.speed = e;
	}
	get startTime() {
		return this.animation.startTime;
	}
	attachTimeline(e) {
		return this._animation ? this.stopTimeline = this.animation.attachTimeline(e) : this.pendingTimeline = e, () => this.stop();
	}
	play() {
		this.animation.play();
	}
	pause() {
		this.animation.pause();
	}
	complete() {
		this.animation.complete();
	}
	cancel() {
		this._animation && this.animation.cancel(), this.keyframeResolver?.cancel();
	}
}, Er = class {
	constructor(e) {
		this.stop = () => this.runAll("stop"), this.animations = e.filter(Boolean);
	}
	get finished() {
		return Promise.all(this.animations.map((e) => e.finished));
	}
	getAll(e) {
		return this.animations[0][e];
	}
	setAll(e, t) {
		for (let n = 0; n < this.animations.length; n++) this.animations[n][e] = t;
	}
	attachTimeline(e) {
		let t = this.animations.map((t) => t.attachTimeline(e));
		return () => {
			t.forEach((e, t) => {
				e && e(), this.animations[t].stop();
			});
		};
	}
	get time() {
		return this.getAll("time");
	}
	set time(e) {
		this.setAll("time", e);
	}
	get speed() {
		return this.getAll("speed");
	}
	set speed(e) {
		this.setAll("speed", e);
	}
	get state() {
		return this.getAll("state");
	}
	get startTime() {
		return this.getAll("startTime");
	}
	get duration() {
		return Dr(this.animations, "duration");
	}
	get iterationDuration() {
		return Dr(this.animations, "iterationDuration");
	}
	runAll(e) {
		this.animations.forEach((t) => t[e]());
	}
	play() {
		this.runAll("play");
	}
	pause() {
		this.runAll("pause");
	}
	cancel() {
		this.runAll("cancel");
	}
	complete() {
		this.runAll("complete");
	}
};
function Dr(e, t) {
	let n = 0;
	for (let r = 0; r < e.length; r++) {
		let i = e[r][t];
		i !== null && i > n && (n = i);
	}
	return n;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/GroupAnimationWithThen.mjs
var Or = class extends Er {
	then(e, t) {
		return this.finished.finally(e).then(() => {});
	}
}, kr = 30, Ar = (e) => !isNaN(parseFloat(e)), jr = { current: void 0 }, X = class {
	constructor(e, t = {}) {
		this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (e) => {
			let t = D.now();
			if (this.updatedAt !== t && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(e), this.current !== this.prev && (this.notifyChange(), this.dependents)) for (let e of this.dependents) e.dirty();
		}, this.hasAnimated = !1, this.setCurrent(e), this.owner = t.owner;
	}
	setCurrent(e) {
		this.current = e, this.updatedAt = D.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = Ar(this.current));
	}
	setPrevFrameValue(e = this.current) {
		this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt;
	}
	onChange(e) {
		return process.env.NODE_ENV !== "production" && te(!1, "value.onChange(callback) is deprecated. Switch to value.on(\"change\", callback)."), this.on("change", e);
	}
	on(e, t) {
		var n;
		return e === "change" ? this.onChangeSubscribe(t) : ((n = this.events)[e] || (n[e] = new x())).add(t);
	}
	onChangeSubscribe(e) {
		let { events: t } = this;
		return !t.change && !this.changeSubscriber ? this.changeSubscriber = e : (t.change || (t.change = new x(), t.change.add(this.changeSubscriber), this.changeSubscriber = void 0), t.change.add(e)), () => {
			this.changeSubscriber === e ? this.changeSubscriber = void 0 : t.change?.remove(e), this.stopIfUnobserved();
		};
	}
	stopIfUnobserved() {
		T.read(() => {
			!this.changeSubscriber && !this.events.change?.getSize() && this.stop();
		});
	}
	clearListeners() {
		this.changeSubscriber = void 0;
		for (let e in this.events) this.events[e].clear();
	}
	attach(e, t) {
		this.passiveEffect = e, this.stopPassiveEffect = t;
	}
	set(e) {
		this.passiveEffect ? this.passiveEffect(e, this.updateAndNotify) : this.updateAndNotify(e);
	}
	setWithVelocity(e, t, n) {
		this.set(t), this.prev = void 0, this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt - n;
	}
	jump(e, t = !0) {
		this.updateAndNotify(e), this.prev = e, this.prevUpdatedAt = this.prevFrameValue = void 0, t && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
	}
	dirty() {
		this.notifyChange();
	}
	notifyChange() {
		let { current: e, changeSubscriber: t } = this;
		t ? t(e) : this.events.change?.notify(e);
	}
	addDependent(e) {
		this.dependents ||= /* @__PURE__ */ new Set(), this.dependents.add(e);
	}
	removeDependent(e) {
		this.dependents && this.dependents.delete(e);
	}
	get() {
		return jr.current && jr.current.push(this), this.current;
	}
	getPrevious() {
		return this.prev;
	}
	getVelocity() {
		let e = D.now();
		if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > kr) return 0;
		let t = Math.min(this.updatedAt - this.prevUpdatedAt, kr);
		return /* @__PURE__ */ w(parseFloat(this.current) - parseFloat(this.prevFrameValue), t);
	}
	start(e) {
		return this.stop(), new Promise((t) => {
			this.hasAnimated = !0;
			let n = !1, r;
			r = e(() => {
				n = !0, this.events.animationComplete?.notify(), this.animation === r && this.clearAnimation(), t();
			}), n || (this.animation = r), this.events.animationStart?.notify();
		});
	}
	stop() {
		this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
	}
	isAnimating() {
		return !!this.animation;
	}
	clearAnimation() {
		this.animation = void 0;
	}
	destroy() {
		this.dependents?.clear(), this.events.destroy?.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
	}
};
function Mr(e, t) {
	return new X(e, t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/resolve-transition.mjs
function Nr(e, t) {
	if (e?.inherit && t) {
		let { inherit: n, ...r } = e;
		return {
			...t,
			...r
		};
	}
	return e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/get-value-transition.mjs
function Pr(e, t) {
	let n = e?.[t] ?? e?.default ?? e;
	return n === e ? n : Nr(n, e);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/default-transitions.mjs
var Fr = {
	type: "spring",
	stiffness: 500,
	damping: 25,
	restSpeed: 10
}, Ir = (e) => ({
	type: "spring",
	stiffness: 550,
	damping: e === 0 ? 2 * Math.sqrt(550) : 30,
	restSpeed: 10
}), Lr = {
	type: "keyframes",
	duration: .8
}, Rr = {
	type: "keyframes",
	ease: [
		.25,
		.1,
		.35,
		1
	],
	duration: .3
}, zr = (e, { keyframes: t }) => t.length > 2 ? Lr : In.has(e) ? e.startsWith("scale") ? Ir(t[1]) : Fr : Rr, Br = /* @__PURE__ */ new Set([
	"when",
	"delay",
	"delayChildren",
	"staggerChildren",
	"staggerDirection",
	"repeat",
	"repeatType",
	"repeatDelay",
	"from",
	"elapsed"
]);
function Vr(e) {
	for (let t in e) if (!Br.has(t)) return !0;
	return !1;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/interfaces/motion-value.mjs
var Hr = (e, t, n, r = {}, i, a) => (o) => {
	let s = Pr(r, e) || {}, c = s.delay || r.delay || 0, { elapsed: l = 0 } = r;
	l -= /* @__PURE__ */ S(c);
	let u = {
		keyframes: Array.isArray(n) ? n : [null, n],
		ease: "easeOut",
		velocity: t.getVelocity(),
		...s,
		delay: -l,
		onUpdate: (e) => {
			t.set(e), s.onUpdate && s.onUpdate(e);
		},
		onComplete: () => {
			o(), s.onComplete && s.onComplete();
		},
		name: e,
		motionValue: t,
		element: a ? void 0 : i
	};
	Vr(s) || Object.assign(u, zr(e, u)), u.duration &&= /* @__PURE__ */ S(u.duration), u.repeatDelay &&= /* @__PURE__ */ S(u.repeatDelay), u.from !== void 0 && (u.keyframes[0] = u.from);
	let d = !1;
	if ((u.type === !1 || u.duration === 0 && !u.repeatDelay) && (_r(u), u.delay === 0 && (d = !0)), (p.instantAnimations || p.skipAnimations || i?.shouldSkipAnimations || s.skipAnimations) && (d = !0, _r(u), u.delay = 0), u.allowFlatten = !s.type && !s.ease, d && !a && t.get() !== void 0) {
		let e = an(u.keyframes, s);
		if (e !== void 0) {
			T.update(() => {
				u.onUpdate(e), u.onComplete();
			});
			return;
		}
	}
	return s.isSync ? new fn(u) : new Tr(u);
}, Ur = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function Wr(e) {
	let t = Ur.exec(e);
	if (!t) return [,];
	let [, n, r, i] = t;
	return [`--${n ?? r}`, i];
}
var Gr = 4;
function Kr(e, t, n = 1) {
	f(n <= Gr, `Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
	let [r, i] = Wr(e);
	if (!r) return;
	let a = window.getComputedStyle(t).getPropertyValue(r);
	if (a) {
		let e = a.trim();
		return m(e) ? parseFloat(e) : e;
	}
	return Fe(i) ? Kr(i, t, n + 1) : i;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/keys-position.mjs
var qr = /* @__PURE__ */ new Set([
	"width",
	"height",
	"top",
	"left",
	"right",
	"bottom",
	...K
]), Jr = (e) => !!(e && e.getVelocity);
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/utils/camel-to-dash.mjs
function Yr(e) {
	return e.replace(/([A-Z])/g, (e) => `-${e.toLowerCase()}`);
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/auto.mjs
var Xr = {
	test: (e) => e === "auto",
	parse: (e) => e
}, Zr = (e) => (t) => t.test(e), Qr = [
	k,
	F,
	P,
	N,
	Ye,
	Je,
	Xr
], $r = (e) => Qr.find(Zr(e));
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/is-none.mjs
function ei(e) {
	return typeof e == "number" ? e === 0 : e === null || e === "none" || e === "0" || g(e);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/make-none-animatable.mjs
var ti = /* @__PURE__ */ new Set([
	"auto",
	"none",
	"0"
]);
function ni(e, t, n) {
	let r = 0, i;
	for (; r < e.length && !i;) {
		let t = e[r];
		typeof t == "string" && !ti.has(t) && st(t) && (i = e[r]), r++;
	}
	if (i && n) for (let r of t) e[r] !== i && (e[r] = Cn(n, i));
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/DOMKeyframesResolver.mjs
var ri = class extends Xn {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i, !0);
	}
	readKeyframes() {
		let { unresolvedKeyframes: e, element: t, name: n } = this;
		if (!t || !t.current) return;
		super.readKeyframes();
		for (let n = 0; n < e.length; n++) {
			let r = e[n];
			if (typeof r == "string" && (r = r.trim(), Fe(r))) {
				let i = Kr(r, t.current);
				i !== void 0 && (e[n] = i), n === e.length - 1 && (this.finalKeyframe = r);
			}
		}
		if (this.resolveNoneKeyframes(), !qr.has(n) || e.length !== 2) return;
		let [r, i] = e;
		if (typeof r == "number" && typeof i == "number") return;
		let a = $r(r), o = $r(i);
		if (Le(r) !== Le(i) && q[n]) {
			this.needsMeasurement = !0;
			return;
		}
		if (a !== o) {
			if (Ln(a) && Ln(o)) for (let t = 0; t < e.length; t++) {
				let n = e[t];
				typeof n == "string" && (e[t] = parseFloat(n));
			}
			else q[n] && (this.needsMeasurement = !0);
		}
	}
	resolveNoneKeyframes() {
		let { unresolvedKeyframes: e, name: t } = this, n = [];
		for (let t = 0; t < e.length; t++) (e[t] === null || ei(e[t])) && n.push(t);
		n.length && ni(e, n, t);
	}
	measure() {
		let { element: e, name: t } = this;
		return q[t](window.getComputedStyle(e.current), () => e.measureViewportBox());
	}
	measureInitialState() {
		let { element: e, unresolvedKeyframes: t, name: n } = this;
		if (!e || !e.current) return;
		n === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = this.measure(), t[0] = this.measuredOrigin;
		let r = t[t.length - 1];
		r !== void 0 && this.motionValue?.jump(r, !1);
	}
	measureEndState() {
		let { element: e, unresolvedKeyframes: t } = this;
		if (!e || !e.current) return;
		this.motionValue?.jump(this.measuredOrigin, !1);
		let n = t.length - 1, r = t[n];
		t[n] = this.measure(), r !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = r), this.removedTransforms?.length && this.removedTransforms.forEach(([t, n]) => {
			e.getValue(t).set(n);
		}), this.resolveNoneKeyframes();
	}
}, ii = [];
function ai(e) {
	f(typeof e.test == "function" && typeof e.read == "function", "Effects passed to animate.addEffect() need test() and read().", "effect-missing-test"), oi(e), ii.unshift(e);
}
function oi(e) {
	c(ii, e);
}
function si(e) {
	return ii.find((t) => t.test(e));
}
function ci(e, t, n = {}, r) {
	let i = [], { velocity: a } = n, o = n.reduceMotion ?? r?.shouldReduceMotion;
	for (let s in t) {
		if (s === "transition" || s === "transitionEnd") continue;
		let c = t[s];
		if (c === void 0) continue;
		let l = e(s), u = l.get();
		if (u !== void 0 && !l.isAnimating() && !Array.isArray(c) && c === u && !a) {
			T.update(() => l.set(c));
			continue;
		}
		l.start(Hr(s, l, c, o && qr.has(s) ? { type: !1 } : n, r)), l.animation && i.push(l.animation);
	}
	let { transitionEnd: s } = t;
	if (s) {
		let t = () => T.update(() => {
			for (let t in s) e(t).set(s[t]);
		});
		i.length ? Promise.all(i).then(t) : t();
	}
	return i;
}
function li(e, t, n, r, i) {
	return ci((r) => {
		let a = e.get(t, r);
		if (!a) {
			let o;
			if (!i) {
				let i = n[r];
				o = ui(i) ?? e.read(t, r, i), f(o !== void 0, `"${r}" can't be read from the animated subject. Provide [from, to] keyframes.`, "effect-unreadable-value");
			}
			a = Mr(o, { owner: i }), e(t, { [r]: a });
		}
		return a;
	}, n, r, i);
}
function ui(e) {
	let t = Array.isArray(e) ? e[0] : void 0;
	return t === null ? void 0 : t;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/is-html-element.mjs
function di(e) {
	return h(e) && "offsetHeight" in e && !("ownerSVGElement" in e);
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/is-svg-element.mjs
function fi(e) {
	return h(e) && "ownerSVGElement" in e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/get-as-type.mjs
var Z = (e, t) => t && typeof e == "number" ? t.transform(e) : e;
//#endregion
//#region node_modules/motion-dom/dist/es/utils/resolve-elements.mjs
function pi(e, t, n) {
	if (e == null) return [];
	if (e instanceof EventTarget) return [e];
	if (typeof e == "string") {
		let r = document;
		t && (r = t.current);
		let i = n?.[e] ?? r.querySelectorAll(e);
		return i ? Array.from(i) : [];
	}
	return Array.from(e).filter((e) => e != null);
}
//#endregion
//#region node_modules/motion-dom/dist/es/effects/MotionValueState.mjs
var mi = class {
	constructor(e = T.render) {
		this.step = e, this.values = /* @__PURE__ */ new Map(), this.pending = [], this.numPending = 0, this.flush = () => {
			let { pending: e, numPending: t } = this;
			this.numPending = 0;
			for (let n = 0; n < t; n++) e[n]();
		};
	}
	set(e, t, n, r) {
		if (this.values.get(e)?.onRemove(), r) for (let e of this.values.values()) e.value === r && (n = e.render);
		let i = () => n && this.schedule(n);
		t.get() !== void 0 && i();
		let a = t.on("change", i), o = () => {
			a(), n && !r && this.cancel(n), this.values.delete(e);
		};
		return this.values.set(e, {
			value: t,
			render: r ? void 0 : n,
			onRemove: o
		}), o;
	}
	get(e) {
		return this.values.get(e)?.value;
	}
	release() {
		let e = /* @__PURE__ */ new Map();
		return this.values.forEach((t, n) => {
			e.set(n, t.value), t.onRemove();
		}), this.transformKeys = this.transformValues = void 0, e;
	}
	schedule(e) {
		let { pending: t, numPending: n } = this;
		for (let r = 0; r < n; r++) if (t[r] === e) return;
		n || this.step(this.flush), t[this.numPending++] = e;
	}
	cancel(e) {
		let { pending: t } = this;
		for (let n = 0; n < this.numPending; n++) if (t[n] === e) {
			t[n] = t[--this.numPending];
			return;
		}
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/effects/utils/create-effect.mjs
function hi(e, { step: t, ...n } = {}) {
	let r = /* @__PURE__ */ new WeakMap();
	return Object.assign((n, i) => {
		let a = r.get(n) ?? new mi(t);
		r.set(n, a);
		let o = [];
		for (let t in i) {
			let r = i[t], s = e(n, a, t, r);
			o.push(s);
		}
		return () => {
			for (let e of o) e();
		};
	}, n, {
		get: (e, t) => r.get(e)?.get(t),
		flush: (e) => r.get(e)?.flush(),
		state: (e) => r.get(e)
	});
}
//#endregion
//#region node_modules/motion-dom/dist/es/effects/style/transform.mjs
var gi = {
	x: "translateX",
	y: "translateY",
	z: "translateZ",
	transformPerspective: "perspective"
}, _i = {};
function vi(e) {
	let t = "", { transformKeys: n = [], transformValues: r = {} } = e;
	for (let e = 0; e < n.length; e++) {
		let i = n[e], a = r[i].get();
		a !== void 0 && (typeof a == "number" ? a : parseFloat(a)) !== +!!i.startsWith("scale") && (t += (t && " ") + (_i[i] || (_i[i] = (gi[i] || i) + "(")) + Z(a, yn[i]) + ")");
	}
	let i = e.get("pathRotation")?.get();
	return i && (t += (t && " ") + "rotate(" + Z(i, yn.pathRotation) + ")"), t || "none";
}
//#endregion
//#region node_modules/motion-dom/dist/es/effects/style/index.mjs
var yi = /* @__PURE__ */ new Set([
	"originX",
	"originY",
	"originZ"
]), bi = (e, t) => Z(e.get(t)?.get(), W[t]), xi = (e, t, n, r) => {
	let i, a;
	if (In.has(n)) {
		if (n !== "pathRotation") {
			let e = t.transformKeys ??= [];
			(t.transformValues ??= {})[n] = r, e.includes(n) || (e.push(n), e.sort((e, t) => K.indexOf(e) - K.indexOf(t)));
		}
		t.get("transform") || (!di(e) && !t.get("transformBox") && xi(e, t, "transformBox", new X("fill-box")), t.set("transform", new X("none"), () => {
			e.style.transform = vi(t);
		})), a = t.get("transform");
	} else yi.has(n) ? (t.get("transformOrigin") || t.set("transformOrigin", new X(""), () => {
		let n = bi(t, "originX") ?? "50%", r = bi(t, "originY") ?? "50%", i = bi(t, "originZ") ?? 0;
		e.style.transformOrigin = `${n} ${r} ${i}`;
	}), a = t.get("transformOrigin")) : i = Zn(n) ? () => {
		e.style.setProperty(n, r.get());
	} : () => {
		e.style[n] = Z(r.get(), W[n]);
	};
	return t.set(n, r, i, a);
}, Si = (e) => di(e) || fi(e), Ci = (e, t) => {
	if (In.has(t)) return Pn(e, t);
	let n = getComputedStyle(e), r = Zn(t) ? n.getPropertyValue(t) : n[t];
	return typeof r == "string" && r.trim() || 0;
}, wi = /*@__PURE__*/ hi(xi, {
	test: Si,
	read: Ci
}), Ti = [
	"transform",
	"opacity",
	"offsetDistance",
	"offsetPath",
	"offsetRotate",
	"offsetAnchor"
];
//#endregion
//#region node_modules/motion-dom/dist/es/effects/attr/index.mjs
function Ei(e, t) {
	if (!(t in e)) return !1;
	let n = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(e), t) || Object.getOwnPropertyDescriptor(e, t);
	return n && typeof n.set == "function";
}
var Di = (e, t, n, r, i = n) => {
	let a = Ei(e, i);
	!a && (i.startsWith("data") || i.startsWith("aria")) && (i = Yr(i));
	let o = W[n] || W[i], s = a ? () => {
		e[i] = Z(r.get(), W[n]);
	} : () => {
		let t = Z(r.get(), o);
		t == null ? e.removeAttribute(i) : e.setAttribute(i, String(t));
	};
	return t.set(n, r, s);
};
//#endregion
//#region node_modules/motion-dom/dist/es/effects/svg/index.mjs
function Oi(e, t, n, r) {
	return T.render(() => e.setAttribute("pathLength", "1")), n === "pathOffset" ? t.set(n, r, () => {
		let t = r.get();
		e.setAttribute("stroke-dashoffset", `${-t}`);
	}) : (t.get("stroke-dasharray") || t.set("stroke-dasharray", new X("1 1"), () => {
		let n = t.get("pathLength")?.get() ?? 1, r = t.get("pathSpacing")?.get();
		e.setAttribute("stroke-dasharray", `${n} ${r ?? 1 - Number(n)}`);
	}), t.set(n, r, void 0, t.get("stroke-dasharray")));
}
var ki = /*@__PURE__*/ hi((e, t, n, r) => n.startsWith("path") ? Oi(e, t, n, r) : n.startsWith("attr") ? Di(e, t, n, r, Ai(n)) : (n in e.style ? xi : Di)(e, t, n, r), {
	test: fi,
	read: (e, t) => In.has(t) ? W[t]?.default || 0 : Ti.includes(t) ? Ci(e, t) : (t = Ai(t), e.getAttribute(Yr(t)) ?? e.getAttribute(t) ?? void 0)
});
function Ai(e) {
	return e.replace(/^attr([A-Z])/, (e, t) => t.toLowerCase());
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/geometry/conversion.mjs
function ji({ top: e, left: t, right: n, bottom: r }) {
	return {
		x: {
			min: t,
			max: n
		},
		y: {
			min: e,
			max: r
		}
	};
}
function Mi(e, t) {
	if (!t) return e;
	let n = t({
		x: e.left,
		y: e.top
	}), r = t({
		x: e.right,
		y: e.bottom
	});
	return {
		top: n.y,
		left: n.x,
		bottom: r.y,
		right: r.x
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/utils/measure.mjs
function Ni(e, t) {
	return ji(Mi(e.getBoundingClientRect(), t));
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/animate/element.mjs
var Pi = {}, Fi = (e) => fi(e) ? ki : wi, Ii = class {
	constructor(e, t) {
		this.effect = e, this.current = t, this.KeyframeResolver = ri;
	}
	getValue(e) {
		return this.effect.get(this.current, e);
	}
	readValue(e, t) {
		return this.effect.read(this.current, e, t);
	}
	render() {
		this.effect.flush(this.current);
	}
	measureViewportBox() {
		return Ni(this.current);
	}
	getProps() {
		return Pi;
	}
};
function Li(e, t, n, r) {
	if (r) return ci((e) => r.getValue(e, null), t, n, r);
	let i = Fi(e);
	return li(i, e, t, n, new Ii(i, e));
}
//#endregion
//#region node_modules/motion-dom/dist/es/effects/prop/index.mjs
var Ri = /*@__PURE__*/ hi((e, t, n, r) => t.set(n, r, () => {
	e[n] = r.get();
}), {
	test: (e) => h(e),
	read: (e, t) => {
		let n = e[t];
		return typeof n == "string" || typeof n == "number" ? n : void 0;
	}
}), zi = /* @__PURE__ */ new WeakMap();
//#endregion
//#region node_modules/motion-dom/dist/es/animation/animate/single-value.mjs
function Bi(e, t, n) {
	let r = Jr(e) ? e : Mr(e);
	return r.start(Hr("", r, t, n)), r.animation;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/utils/is-dom-keyframes.mjs
function Vi(e) {
	return typeof e == "object" && !Array.isArray(e);
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/resolve-subjects.mjs
function Hi(e, t, n, r) {
	return e == null ? [] : typeof e == "string" && Vi(t) ? pi(e, n, r) : e instanceof NodeList ? Array.from(e) : Array.isArray(e) ? e.filter((e) => e != null) : [e];
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/calc-repeat-duration.mjs
function Ui(e, t, n) {
	return e * (t + 1) + n * t;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/calc-time.mjs
function Wi(e, t, n, r) {
	return typeof t == "number" ? t : t.startsWith("-") || t.startsWith("+") ? Math.max(0, e + parseFloat(t)) : t === "<" ? n : t.startsWith("<") ? Math.max(0, n + parseFloat(t.slice(1))) : r.get(t) ?? e;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/edit.mjs
function Gi(e, t, n) {
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		i.at > t && i.at < n && (c(e, i), r--);
	}
}
function Ki(e, t, n, r, i, a) {
	Gi(e, i, a);
	for (let o = 0; o < t.length; o++) e.push({
		value: t[o],
		at: B(i, a, r[o]),
		easing: /* @__PURE__ */ xe(n, o)
	});
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/normalize-times.mjs
function qi(e, t, n = 0) {
	let r = t + 1 + t * n;
	for (let t = 0; t < e.length; t++) e[t] = e[t] / r;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/sort.mjs
function Ji(e, t) {
	return e.at === t.at ? e.value === null ? 1 : t.value === null ? -1 : 0 : e.at - t.at;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/create.mjs
var Yi = "easeInOut", Xi = 20;
function Zi(e, { defaultTransition: t = {}, ...n } = {}, r, i) {
	let a = t.duration || .3, o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), c = {}, l = /* @__PURE__ */ new Map(), u = 0, f = 0, p = 0;
	for (let n = 0; n < e.length; n++) {
		let o = e[n];
		if (typeof o == "string") {
			l.set(o, f);
			continue;
		}
		if (!Array.isArray(o)) {
			l.set(o.name, Wi(f, o.at, u, l));
			continue;
		}
		let [m, h, g = {}] = o;
		g.at !== void 0 && (f = Wi(f, g.at, u, l));
		let _ = 0, v = (e, n, r, o = 0, s = 0) => {
			let c = ea(e), { delay: l = 0, times: u = Zt(c), type: m = t.type || "keyframes", repeat: h, repeatType: g, repeatDelay: v = 0, ...y } = n, { ease: b = t.ease || "easeOut", duration: x } = n, C = typeof l == "function" ? l(o, s) : l, w = c.length, ee = or(m) ? m : i?.[m || "keyframes"];
			if (w <= 2 && ee) {
				let e = 100;
				if (w === 2 && ra(c)) {
					let t = c[1] - c[0];
					e = Math.abs(t);
				}
				let n = {
					...t,
					...y
				};
				x !== void 0 && (n.duration = /* @__PURE__ */ S(x));
				let r = Lt(n, e, ee);
				b = r.ease, x = r.duration;
			}
			x ??= a;
			let te = f + C;
			u.length === 1 && u[0] === 0 && (u[1] = 1);
			let ne = u.length - c.length;
			if (ne > 0 && Xt(u, ne), c.length === 1 && c.unshift(null), h && d(h < Xi, `Sequence segments can't repeat ${h} times — ignoring repeat option. Use a value below ${Xi} or apply repeat at the sequence level instead.`), h && h < Xi) {
				let e = x > 0 ? v / x : 0;
				x = Ui(x, h, v);
				let t = [...c], n = [...u];
				b = Array.isArray(b) ? [...b] : [b];
				let r = [...b], i = g === "reverse" || g === "mirror", a = t, o = r;
				i && (a = [...t].reverse(), g === "reverse" && (o = [...r].reverse().map((e) => typeof e == "function" ? /* @__PURE__ */ le(e) : e)));
				for (let s = 0; s < h; s++) {
					let l = i && s % 2 == 0, d = l ? a : t, f = l ? o : r, p = (s + 1) * (1 + e);
					e > 0 && (c.push(c[c.length - 1]), u.push(p), b.push("linear")), c.push(...d);
					for (let e = 0; e < d.length; e++) u.push(n[e] + p), b.push(e === 0 ? "linear" : /* @__PURE__ */ xe(f, e - 1));
				}
				qi(u, h, e);
			}
			let re = te + x;
			Ki(r, c, b, u, te, re), _ = Math.max(C + x, _), p = Math.max(re, p);
		};
		if (Jr(m)) {
			let e = Qi(m, s);
			v(h, g, $i("default", e));
		} else {
			let e = Hi(m, h, r, c), t = e.length;
			for (let n = 0; n < t; n++) {
				h = h, g = g;
				let r = e[n], i = Qi(r, s);
				for (let e in h) v(h[e], ta(g, e), $i(e, i), n, t);
			}
		}
		u = f, f += _;
	}
	return s.forEach((e, r) => {
		for (let i in e) {
			let a = e[i];
			a.sort(Ji);
			let s = [], c = [], l = [];
			for (let e = 0; e < a.length; e++) {
				let { at: t, value: n, easing: r } = a[e];
				s.push(n), c.push(/* @__PURE__ */ b(0, p, t)), l.push(r || "easeOut");
			}
			c[0] !== 0 && (c.unshift(0), s.unshift(s[0]), l.unshift(Yi)), c[c.length - 1] !== 1 && (c.push(1), s.push(null)), o.has(r) || o.set(r, {
				keyframes: {},
				transition: {}
			});
			let u = o.get(r);
			u.keyframes[i] = s;
			let { type: d, ...f } = t;
			u.transition[i] = {
				...f,
				duration: p,
				ease: l,
				times: c,
				...n
			};
		}
	}), o;
}
function Qi(e, t) {
	return !t.has(e) && t.set(e, {}), t.get(e);
}
function $i(e, t) {
	return t[e] || (t[e] = []), t[e];
}
function ea(e) {
	return Array.isArray(e) ? e : [e];
}
function ta(e, t) {
	return e && e[t] ? {
		...e,
		...e[t]
	} : { ...e };
}
var na = (e) => typeof e == "number", ra = (e) => e.every(na);
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/subject.mjs
function ia(e, t) {
	return Jr(e) || typeof e == "number" || typeof e == "string" && !Vi(t);
}
function aa(e, t, n, r) {
	let i = [];
	if (ia(e, t)) i.push(Bi(e, Vi(t) && t.default || t, n && (n.default || n)));
	else {
		if (e == null) return i;
		let a = Hi(e, t, r), o = a.length;
		f(!!o, "No valid elements provided.", "no-valid-elements");
		for (let e = 0; e < o; e++) {
			let r = a[e], s = { ...n };
			"delay" in s && typeof s.delay == "function" && (s.delay = s.delay(e, o)), r instanceof Element ? i.push(...Li(r, t, s, zi.get(r))) : i.push(...li(si(r) ?? Ri, r, t, s));
		}
	}
	return i;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/sequence.mjs
function oa(e, t, n) {
	let r = [];
	return Zi(e.map((e) => {
		if (Array.isArray(e) && typeof e[0] == "function") {
			let t = e[0], n = Mr(0);
			return n.on("change", t), e.length === 1 ? [n, [0, 1]] : e.length === 2 ? [
				n,
				[0, 1],
				e[1]
			] : [
				n,
				e[1],
				e[2]
			];
		}
		return e;
	}), t, n, { spring: H }).forEach(({ keyframes: e, transition: t }, n) => {
		r.push(...aa(n, e, t));
	}), r;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/index.mjs
function sa(e) {
	return Array.isArray(e) && e.some(Array.isArray);
}
function ca(e = {}) {
	let { scope: t, reduceMotion: n, skipAnimations: r } = e;
	function i(e, i, a) {
		let o = [], s, l = {};
		if (n !== void 0 && (l.reduceMotion = n), r !== void 0 && (l.skipAnimations = r), sa(e)) {
			let { onComplete: n, ...r } = i || {};
			typeof n == "function" && (s = n), o = oa(e, {
				...l,
				...r
			}, t);
		} else {
			let { onComplete: n, ...r } = a || {};
			typeof n == "function" && (s = n), o = aa(e, i, {
				...l,
				...r
			}, t);
		}
		let u = new Or(o);
		return s && u.finished.then(s), t && (t.animations.push(u), u.finished.then(() => {
			c(t.animations, u);
		})), u;
	}
	return i;
}
var la = Object.assign(ca(), {
	addEffect: ai,
	removeEffect: oi
}), ua = class {
	#e;
	#t = {};
	#n = 0;
	#r = 0;
	#i = (e) => e;
	#a = 0;
	#o = !1;
	#s;
	#c;
	#l;
	#u;
	#d = !1;
	constructor(e) {
		this.#e = e;
	}
	to(e, t) {
		return this.#t = e, this.#n = Math.max(t, 0) / 1e3, this;
	}
	onUpdate(e) {
		return this.#s = e, this;
	}
	onComplete(e) {
		return this.#c = e, this;
	}
	easing(e) {
		return this.#i = e, this;
	}
	delay(e) {
		return this.#r = e / 1e3, this;
	}
	repeat(e) {
		return this.#a = e, this;
	}
	yoyo(e) {
		return this.#o = e, this;
	}
	chain(e) {
		return this.#l = e, this;
	}
	start() {
		if (this.#u) return this;
		let e = {};
		for (let t of Object.keys(this.#t)) e[t] = this.#e[t];
		return this.#u = la(e, this.#t, {
			duration: this.#n,
			delay: this.#r,
			ease: this.#i,
			repeat: this.#a,
			...this.#o ? { repeatType: "reverse" } : {},
			reduceMotion: !1,
			onUpdate: () => {
				this.#d || (Object.assign(this.#e, e), this.#s?.(this.#e));
			},
			onComplete: () => this.#f()
		}), this;
	}
	#f() {
		this.#d || (Object.assign(this.#e, this.#t), this.#s?.(this.#e), this.#d = !0, this.#c?.(), this.#l?.start());
	}
	stop() {
		return this.#u?.stop(), this;
	}
	end() {
		if (this.#d) return this;
		let e = {}, t = this, n = this;
		for (; t;) Object.assign(e, t.#t), t.#u?.stop(), t.#d = !0, n = t, t = t.#l;
		return Object.assign(this.#e, e), this.#s?.(this.#e), n.#c?.(), this;
	}
	kill() {
		let e = this;
		for (; e;) e.#u?.stop(), e.#d = !0, e = e.#l;
	}
	pause() {
		return this.#u?.pause(), this;
	}
	resume() {
		return this.#u?.play(), this;
	}
	isPaused() {
		return this.#u?.state === "paused";
	}
}, da = "trans\n", fa = "tsy nm:", pa = class e {
	static #e = {};
	static #t;
	static init(t) {
		e.destroy(), e.#t = t;
	}
	static destroy() {
		e.stopAllTw();
	}
	static stopAllTw() {
		for (let t of Object.values(e.#e)) t.tw?.kill();
		e.#e = {};
	}
	static get liveCount() {
		return Object.keys(e.#e).length;
	}
	static setTwProp(e, t) {
		let r = n(t, "repeat", 1);
		return e.delay(n(t, "delay", 0)).easing(this.ease(t.ease)).repeat(r > 0 ? r - 1 : Infinity).yoyo(i(t, "yoyo", !1));
	}
	static #n(e) {
		return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375;
	}
	static #r = {
		"Back.In": (e) => e === 1 ? 1 : e * e * (2.70158 * e - 1.70158),
		"Back.InOut": (e) => {
			let t = 2.5949095;
			return (e *= 2) < 1 ? .5 * (e * e * (3.5949095 * e - t)) : .5 * ((e -= 2) * e * (3.5949095 * e + t) + 2);
		},
		"Back.Out": (e) => e === 0 ? 0 : --e * e * (2.70158 * e + 1.70158) + 1,
		"Bounce.In": (t) => 1 - e.#n(1 - t),
		"Bounce.InOut": (t) => t < .5 ? (1 - e.#n(1 - t * 2)) * .5 : e.#n(t * 2 - 1) * .5 + .5,
		"Bounce.Out": (t) => e.#n(t),
		"Circular.In": (e) => 1 - Math.sqrt(1 - e * e),
		"Circular.InOut": (e) => (e *= 2) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
		"Circular.Out": (e) => Math.sqrt(1 - --e * e),
		"Cubic.In": (e) => e * e * e,
		"Cubic.InOut": (e) => (e *= 2) < 1 ? .5 * e * e * e : .5 * ((e -= 2) * e * e + 2),
		"Cubic.Out": (e) => --e * e * e + 1,
		"Elastic.In": (e) => e === 0 ? 0 : e === 1 ? 1 : -(2 ** (10 * (e - 1))) * Math.sin((e - 1.1) * 5 * Math.PI),
		"Elastic.InOut": (e) => e === 0 ? 0 : e === 1 ? 1 : (e *= 2, e < 1 ? -.5 * 2 ** (10 * (e - 1)) * Math.sin((e - 1.1) * 5 * Math.PI) : .5 * 2 ** (-10 * (e - 1)) * Math.sin((e - 1.1) * 5 * Math.PI) + 1),
		"Elastic.Out": (e) => e === 0 ? 0 : e === 1 ? 1 : 2 ** (-10 * e) * Math.sin((e - .1) * 5 * Math.PI) + 1,
		"Exponential.In": (e) => e === 0 ? 0 : 1024 ** (e - 1),
		"Exponential.InOut": (e) => e === 0 ? 0 : e === 1 ? 1 : (e *= 2) < 1 ? .5 * 1024 ** (e - 1) : .5 * (-(2 ** (-10 * (e - 1))) + 2),
		"Exponential.Out": (e) => e === 1 ? 1 : 1 - 2 ** (-10 * e),
		"Linear.None": (e) => e,
		"Quadratic.In": (e) => e * e,
		"Quadratic.InOut": (e) => (e *= 2) < 1 ? .5 * e * e : -.5 * (--e * (e - 2) - 1),
		"Quadratic.Out": (e) => e * (2 - e),
		"Quartic.In": (e) => e * e * e * e,
		"Quartic.InOut": (e) => (e *= 2) < 1 ? .5 * e * e * e * e : -.5 * ((e -= 2) * e * e * e - 2),
		"Quartic.Out": (e) => 1 - --e * e * e * e,
		"Quintic.In": (e) => e * e * e * e * e,
		"Quintic.InOut": (e) => (e *= 2) < 1 ? .5 * e * e * e * e * e : .5 * ((e -= 2) * e * e * e * e + 2),
		"Quintic.Out": (e) => --e * e * e * e * e + 1,
		"Sinusoidal.In": (e) => 1 - Math.sin((1 - e) * Math.PI / 2),
		"Sinusoidal.InOut": (e) => .5 * (1 - Math.sin(Math.PI * (.5 - e))),
		"Sinusoidal.Out": (e) => Math.sin(e * Math.PI / 2)
	};
	static ease(e) {
		if (!e) return (e) => e;
		let t = this.#r[e];
		if (!t) throw "異常なease指定です";
		return t;
	}
	static aLayerPrpNm = [
		"alpha",
		"height",
		"rotation",
		"scale_x",
		"scale_y",
		"pivot_x",
		"pivot_y",
		"width",
		"x",
		"y"
	];
	static cnvTweenArg(t, n) {
		let r = {};
		for (let i of e.aLayerPrpNm) {
			let e = t[i];
			if (!e) continue;
			let a = String(e), o = a.startsWith("="), s = o ? a.slice(1) : a;
			if (!s) continue;
			let [c = "0", l] = s.split(","), u = r[i] = parseFloat(c);
			l && (r[i] += Math.round(Math.random() * (parseFloat(l) - u + 1))), o && (r[i] += parseFloat(n[i]));
		}
		return r;
	}
	static tween(e, t, r, i, o, s, c, l = !0, u = "") {
		let d = this.#t.isSkipping ? 0 : n(t, "time", NaN);
		this.#e[e]?.tw?.kill();
		let f = new ua(r).to(i, d).onUpdate((e) => o(e));
		this.setTwProp(f, t), this.#e[e] = {
			tw: f,
			onEnd: c,
			layer: u
		};
		let { path: p } = t, m = f;
		if (p) {
			a.debugLog && console.group(`🍝 [${t[":タグ名"] ?? ""}] path=${p}= start(${String(r.x)},${String(r.y)},${String(r.alpha)})`);
			for (let { groups: e } of p.matchAll(this.#i)) {
				let { x: n, x2: i, y: o, y2: s, o: c, o2: l, json: u } = e, f = {};
				if (u) try {
					f = JSON.parse(u);
				} catch (e) {
					console.error(`🍝 json=${u} ` + String(e));
					continue;
				}
				else {
					let e = n ?? i;
					e && (f.x = e);
					let t = o ?? s;
					t && (f.y = t);
					let r = c ?? l;
					r && (f.alpha = Number(r));
				}
				let p = this.cnvTweenArg(f, r);
				a.debugLog && console.info(`🍝 ${u ?? `{x:${String(n)} y:${String(o)} o:${String(c)}}`} => hTo:${JSON.stringify(p)}`);
				let h = new ua(r).to(p, d);
				this.setTwProp(h, t), m.chain(h), m = h;
			}
			a.debugLog && console.groupEnd();
		}
		m.onComplete(() => {
			let t = this.#e[e];
			t?.tw && (delete this.#e[e], t.tw = void 0, f.stop(), t.onEnd?.(), s(), $.notifyEndProc(fa + e));
		});
		let { chain: h } = t;
		if (h) {
			let e = this.#e[h];
			if (!e?.tw) throw `${h}は存在しない・または終了したトゥイーンです`;
			delete e.onEnd, e.tw.chain(f);
		} else l && f.start();
		return f;
	}
	static #i = /\(\s*(?:(?<x>[-=\d.]+)|(['"])(?<x2>.*?)\2)?(?:\s*,\s*(?:(?<y>[-=\d.]+)|(['"])(?<y2>.*?)\5)?(?:\s*,\s*(?:(?<o>[-=\d.]+)|(['"])(?<o2>.*?)\8))?)?|(?<json>\{[^{}]*})/g;
	static wt(e) {
		if (!this.#e["trans\n"]?.tw) return !1;
		let t = () => this.stopEndTrans();
		return $.beginProc(da, t, !0, i(e, "canskip", !0) ? t : void 0), !0;
	}
	static stopEndTrans() {
		this.#e[da]?.tw?.stop().end();
	}
	static stopTsyByLayer(e) {
		for (let [t, n] of Object.entries(this.#e)) n.layer && e.includes(n.layer) && (n.tw?.kill(), delete this.#e[t]);
	}
	static wait_tsy(e) {
		let t = this.#a(e), n = this.#e[t]?.tw;
		if (!n) return !1;
		let r = () => n.end();
		return $.beginProc(fa + t, r, !0, i(e, "canskip", !0) ? r : void 0), !0;
	}
	static #a(e) {
		let { layer: t = "", id: n, name: r } = e, i = n ? `frm\n${n}` : r ?? t;
		if (!i) throw "トゥイーンが指定されていません";
		return i;
	}
	static stop_tsy(e) {
		let t = this.#a(e);
		return this.#e[t]?.tw?.stop().end(), !1;
	}
	static pause_tsy(e) {
		let t = this.#a(e);
		return this.#e[t]?.tw?.pause(), !1;
	}
	static resume_tsy(e) {
		let t = this.#a(e);
		return this.#e[t]?.tw?.resume(), !1;
	}
}, Q = class t {
	static #e = /* @__PURE__ */ new Set();
	static #t;
	static get rs() {
		return this.#t;
	}
	constructor() {
		t.#t = this;
	}
	static #n = {};
	static #r = {};
	static setEvt2Fnc(e, t, n) {
		e ? this.#r[t] = n : this.#n[t] = n;
	}
	static getEvt2Fnc = (e) => this.#n[e] ?? this.#r[e];
	static clear_eventer(e, t, n) {
		if (!e.startsWith("dom=")) return;
		let r = t ? this.#r[n] : this.#n[n];
		r && this.getHtmlElmList(e).el.forEach((e) => e.removeEventListener("click", r)), t ? delete this.#r[n] : delete this.#n[n];
	}
	static popLocalEvts() {
		let e = this.#n;
		return this.#n = {}, e;
	}
	static pushLocalEvts(e) {
		this.#n = e;
	}
	static clear_event(e) {
		let t = i(e, "global", !1), n = t ? this.#r : this.#n;
		for (let [e, t] of Object.entries(n)) e.startsWith("dom=") && this.getHtmlElmList(e).el.forEach((e) => e.removeEventListener("click", t));
		return t ? this.#r = {} : this.#n = {}, !1;
	}
	static getHtmlElmList(e) {
		let t = e.indexOf(":"), n = "";
		if (t >= 0) {
			let r = e.slice(4, t), i = `const.sn.frm.${r}`;
			if (!$.val.getVal(`tmp:${i}`, 0)) throw `HTML【${r}】が読み込まれていません`;
			let a = document.getElementById(r);
			if (!a) throw `HTML【${r}】の要素(id=${r})がありません`;
			let o = a.contentWindow;
			return n = e.slice(t + 1), {
				el: o.document.querySelectorAll(n),
				id: r,
				sel: n
			};
		}
		return n = e.slice(4), {
			el: document.querySelectorAll(n),
			id: "",
			sel: n
		};
	}
	static waitRsvEvent(e, t) {
		$.val.saveKidoku(), t ? this.#n.click = this.#n.enter = this.#n.arrowdown = this.#n["wheel.y>0"] = () => t() : (delete this.#n.click, delete this.#n.enter, delete this.#n.arrowdown, delete this.#n["wheel.y>0"]), this.getEvt2Fnc = e ? (e) => this.#n[e] ?? this.#r[e] : (e) => this.#n[e], $.scrItr.noticeWait(), a.debugLog && console.log("🎍 wait event... %o", {
			local: Object.keys(this.#n),
			global: Object.keys(this.#r)
		});
	}
	static waitRsvEvent4Paging() {
		if (this.waitRsvEvent(!0), this.aKeysAtPaging.length === 0) {
			this.getEvt2Fnc = (e) => this.#n[e] ?? this.#r[e];
			return;
		}
		let e = {};
		for (let t of this.aKeysAtPaging) {
			let n = this.#r[t];
			n && (e[t] = n);
		}
		this.getEvt2Fnc = (t) => this.#n[t] ?? e[t];
	}
	fire(n, i) {
		let a = n.toLowerCase(), o = t.#i.exec(a)?.[0] ?? "";
		switch (o) {
			case "click":
			case "rightclick":
			case "middleclick":
			case "enter":
			case "arrowdown":
			case "btn":
				if ($.evtMng.isSkipping) break;
				if (!t.isFirstFire()) return;
		}
		if (o === "enter") {
			let t = $.fcs.getFocus();
			if (t instanceof e) {
				t.emit(r, new PointerEvent(r));
				return;
			}
		}
		let s = t.getEvt2Fnc(a);
		s && (i.stopImmediatePropagation?.(), (a.startsWith("dom=") || !$.layMng.clickTxtLay()) && s(i));
	}
	static #i = /btn|\w+$/;
	get skip_enabled() {
		return $.skip_enabled;
	}
	isWait = !1;
	static #a = !1;
	static isFirstFire() {
		return !t.#a && (t.#a = !0, !0);
	}
	static resetFired() {
		t.#a = !1;
	}
	static aPage;
	static lenPage = 0;
	static posPage = 0;
	static styPaging;
	static INI_STYPAGE = "color: yellow; text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;";
	static aKeysAtPaging = [];
	static recodePage(e = !1) {
		if (!$.val.getVal("save:sn.doRecLog")) return;
		let { fn: t, idx: n } = $.scrItr.nowScrIdx(), r = `${String(n - 1)}:` + t;
		if (this.aPage.findIndex((e) => e.key === r) > -1) return;
		a.debugLog && console.log(`📜 %crecodePage === week:${String(e)} lenPage:${String(this.lenPage)} len:${String(this.aPage.length)} POP:${String(this.aPage.at(-1)?.week)}`, "color:#3B0;"), this.aPage.at(-1)?.week && this.aPage.pop();
		let { max_len: i } = $.cfg.oCfg.log, o = $.scrItr.nowMark();
		o.hSave["const.sn.sLog"] = "[]", this.aPage.push({
			key: r,
			week: e,
			fn: $.val.getVal("save:const.sn.scriptFn", t),
			index: $.val.getVal("save:const.sn.scriptIdx", 0),
			mark: o
		}) > i && (this.aPage = this.aPage.slice(-i)), this.lenPage = this.aPage.length, a.debugLog && (console.log(`   %clenPage:${String(this.lenPage)} (base=${o.hPages.base.fore.sBkFn} 0=${o.hPages[0].fore.sBkFn} mes=${String(/color: \w+;/.exec((o.hPages.mes?.fore).txs.cssText))})%c mark:%o`, "color:#3B0;", "", o), console.table(this.aPage)), $.val.setVal_Nochk("sys", "const.sn.aPageLog", JSON.stringify(this.aPage));
	}
	static playbackPage(e, t) {
		this.aPage = JSON.parse(e), this.lenPage = this.aPage.length, this.posPage >= this.lenPage && (this.posPage = this.lenPage - 1), this.styPaging = t;
	}
	beginProc() {
		new ha();
	}
	endProc() {
		new ma();
	}
	l(e) {
		if (!$.tagL_enabled) return !1;
		if (t.recodePage(!0), $.auto_enabled) return e.time = Number($.val.getVal(`sys:sn.auto.msecLineWait${$.scrItr.isKidoku ? "_Kidoku" : ""}`)), this.wait(e);
		if ($.skip_enabled) {
			if (!$.skip_all && !$.scrItr.isNextKidoku) $.cancelAutoSkip();
			else if ("ps".includes(String($.val.getVal("sys:sn.skip.mode")))) return e.time = 50, this.wait(e);
		}
		return i(e, "visible", !0) && ($.layMng.breakLine(e), $.goTxt()), new ga(e), !0;
	}
	p(e) {
		if (t.recodePage(), $.auto_enabled) return e.time = Number($.val.getVal(`sys:sn.auto.msecPageWait${$.scrItr.isKidoku ? "_Kidoku" : ""}`)), this.wait(e);
		if ($.skip_enabled) {
			if (!$.skip_all && !$.scrItr.isNextKidoku) $.cancelAutoSkip();
			else if (String($.val.getVal("sys:sn.skip.mode")) === "s") return e.time = 50, this.wait(e);
		}
		return i(e, "visible", !0) && ($.layMng.breakPage(e), $.goTxt()), new ga(e), !0;
	}
	s(e) {
		return t.recodePage(), $.cancelAutoSkip(), new ga(e), !0;
	}
	wait(e) {
		let r = n(e, "time", NaN);
		if ($.skip_enabled) return !$.skip_all && !$.scrItr.isNextKidoku && $.cancelAutoSkip(), !1;
		let a = new ua({ v: 0 }), o = "wait", s = () => {
			a.stop(), $.notifyEndProc(o);
		};
		a.to({ v: 1 }, r).onComplete(s).start(), t.#e.add(a);
		let c = i(e, "canskip", !0);
		return $.beginProc(o, s, !0, c ? s : void 0), !0;
	}
	page(e) {
		if (!("clear" in e || "to" in e || "style" in e)) throw "clear,style,to いずれかは必須です";
		let { key: n, style: r } = e;
		return n && (t.aKeysAtPaging = n.split(",")), r ? (t.styPaging = r, $.val.setVal_Nochk("save", "const.sn.styPaging", r), !1) : i(e, "clear", !1) ? (t.aPage = [], t.lenPage = 0, t.posPage = 0, $.val.setVal_Nochk("sys", "const.sn.aPageLog", "[]"), $.val.setVal_Nochk("save", "const.sn.styPaging", t.INI_STYPAGE), !1) : !1;
	}
	static destroy() {
		for (let e of t.#e) e.kill();
		t.#e.clear(), this.#n = {}, this.#r = {}, this.aPage = [], this.lenPage = 0, this.posPage = 0;
	}
}, ma = class extends Q {
	constructor() {
		super(), a.debugLog && console.log("📖 => %cReadingState_go", "color:#3B0;"), $.main.resume();
	}
	fire(e, t) {}
}, ha = class extends Q {
	constructor() {
		super(), a.debugLog && console.log("📖 => %cReadingState_proc", "color:#3B0;");
	}
}, ga = class extends Q {
	constructor(e) {
		super(), a.debugLog && console.log("📖 => %cReadingState_wait", "color:#3B0;");
		let t = () => {}, n = i(e, "global", !0);
		switch (e[":タグ名"]) {
			case "wait": return;
			case "s":
				Q.waitRsvEvent(n);
				return;
			case "p":
				t = () => {
					i(e, "er", !1) && $.hTag.er(e), new ma();
				};
				break;
			default: t = () => new ma();
		}
		Q.waitRsvEvent(n, t);
	}
	isWait = !0;
	page(e) {
		let t = super.page(e), { to: n } = e;
		if (!n) return t;
		if (Q.lenPage < 2) return !1;
		switch (n) {
			case "oldest":
				e.to = "prev", Q.posPage = 1;
				break;
			case "newest":
			case "prev":
				e.to = "prev", Q.posPage = Q.lenPage - 1;
				break;
			default: return !1;
		}
		return _a.go(e);
	}
}, _a = class e extends Q {
	constructor() {
		super(), a.debugLog && console.log("📖 => %cReadingState_page", "color:#3B0;"), $.val.setVal_Nochk("tmp", "const.sn.isPaging", !0);
	}
	static go(t) {
		return new e().page(t);
	}
	#e = !0;
	get skip_enabled() {
		return this.#e;
	}
	isWait = !1;
	beginProc() {
		$.main.stop();
	}
	endProc() {
		$.main.resume();
	}
	l(e) {
		return this.#e ? Q.posPage === Q.lenPage - 1 ? (this.#t(), new ma().l(e)) : (i(e, "visible", !0) && $.layMng.breakLine(e), $.layMng.setAllStyle2TxtLay(Q.styPaging), $.goTxt(), Q.aPage[Q.posPage]?.week ? (Q.waitRsvEvent4Paging(), !0) : !1) : super.l(e);
	}
	p(e) {
		return this.#e ? Q.posPage === Q.lenPage - 1 ? (this.#t(), new ma().p(e)) : (i(e, "visible", !0) && $.layMng.breakPage(e), $.layMng.setAllStyle2TxtLay(Q.styPaging), $.goTxt(), Q.waitRsvEvent4Paging(), !0) : super.p(e);
	}
	s(e) {
		return new ga(e), !0;
	}
	wait() {
		return !1;
	}
	page(e) {
		let { to: t, style: n, clear: r } = e;
		if (n || r) return !1;
		switch (a.debugLog && console.log(`📜 %cpage() pos:${String(Q.posPage)}%c len:${String(Q.lenPage)} to:${String(t)}`, "color:#3B0;", ""), t) {
			case "oldest":
				if (Q.posPage === 0) return !1;
				Q.posPage = 0;
				break;
			case "prev":
				if (Q.posPage === 0) return !1;
				--Q.posPage;
				break;
			case "next":
				if (Q.posPage === Q.lenPage - 1) return !1;
				++Q.posPage;
				break;
			case "newest":
				if (Q.posPage === Q.lenPage - 1) return !1;
				Q.posPage = Q.lenPage - 1;
				break;
			case "exit":
				Q.posPage = Q.lenPage - 1;
				break;
			case "load":
				Q.lenPage = Q.posPage + 1, Q.aPage = Q.aPage.slice(0, Q.lenPage), this.#t();
				break;
			default: throw `属性to「${String(t)}」は異常です`;
		}
		Q.posPage === Q.lenPage - 1 && this.#t();
		let i = Q.aPage[Q.posPage];
		if (!i) throw `posPage異常:${String(Q.posPage)}`;
		let { fn: o, index: s, mark: c } = i;
		if (a.debugLog) {
			let e = $.scrItr.nowMark(), { week: t } = Q.aPage[Q.posPage] ?? { week: !1 };
			console.log(`   -- fn:${o} i:${String(s)} pos:${String(Q.posPage)} (base=%c${(e.hPages.base?.fore).sBkFn}%c 0=%c${(e.hPages[0]?.fore).sBkFn}%c mes=%c${String(/color: \w+;/.exec((e.hPages.mes?.fore).txs.cssText))}%c) week:${String(t)} A:${String(Q.posPage === Q.lenPage - 1)}\n   styPaging=%c${Q.styPaging}%c\n   mark:%o`, "background-color:#3B0; color:#000;", "", "background-color:#B4F; color:#000;", "", "color:#B68;", "", Q.styPaging, "", c);
		}
		return $.scrItr.loadFromMark({
			fn: o,
			index: s
		}, c);
	}
	#t() {
		$.val.setVal_Nochk("tmp", "const.sn.isPaging", !1), this.#e = !1;
	}
}, $ = class {
	static beginProc(e, n, i = !0, o) {
		if (a.debugLog && console.log(`📖.beginProc id:%c${e}%c onNotify:${String(n)} endProc:${String(i)} onClickSkip:${String(o)}`, "color:#3B0;", ""), this.#e(), this.#r = e, n) {
			let { promise: e, resolve: t } = Promise.withResolvers();
			e.then((e) => {
				a.debugLog && console.log(`📖.callBack id:%c${e}%c`, "color:#3B0;", ""), n(), i ? this.endProc(e) : this.#e();
			}), this.#n = t;
		}
		if (o) {
			let n = () => {
				this.cancelAutoSkip(), Q.isFirstFire(), o(), i && this.endProc(e);
			};
			this.#t.add(this.main.cvs, r, (e) => {
				e.stopPropagation(), n();
			}), this.#t.add(document, t, (e) => {
				e.isComposing || (e.stopPropagation(), n());
			}), this.procWheel4wle(this.#t, n);
		}
		Q.rs.beginProc();
	}
	static #e() {
		this.#r = "", this.#n = () => {}, this.#t.clear();
	}
	static #t = new o();
	static #n = () => {};
	static notifyEndProc(e) {
		a.debugLog && console.log(`📖.notifyEndProc id:%c${e}%c=${String(this.#r === e)}`, "color:#3B0;", ""), this.#r === e && this.#n(e);
	}
	static endProc(e) {
		a.debugLog && console.log(`📖.endProc id:%c${e}%c=${String(this.#r === e)}`, "color:#3B0;", ""), this.#r === e && (Q.rs.endProc(), this.#e());
	}
	static #r = "";
	static get procID() {
		return `RP_${this.scrItr.scriptFn}:${String(this.scrItr.idxToken)}_`;
	}
	static fire(e, t, n = !1) {
		n && this.cancelAutoSkip(), Q.rs.fire(e, t);
	}
	static get isSkipping() {
		return Q.rs.skip_enabled;
	}
	static get isWait() {
		return Q.rs.isWait;
	}
	static tagL_enabled = !0;
	static skip_all = !1;
	static skip_enabled = !1;
	static auto_enabled = !1;
	static cfg;
	static hTag;
	static main;
	static val;
	static scrItr;
	static layMng;
	static goTxt = () => {};
	static get needGoTxt() {
		return this.layMng.needGoTxt;
	}
	static evtMng;
	static sndMng;
	static procWheel4wle;
	static fcs;
	static init(e, t, n, r, i, a, o, s, c) {
		this.cfg = e, this.hTag = t, this.main = n, this.val = r, this.scrItr = i, this.layMng = a, this.goTxt = () => a.goTxt(), this.evtMng = o, this.sndMng = s, this.procWheel4wle = c, r.defTmp("sn.tagL.enabled", () => this.tagL_enabled), r.defValTrg("tmp:sn.tagL.enabled", (e, t) => {
			this.tagL_enabled = String(t) !== "false";
		}), r.defTmp("sn.skip.all", () => this.skip_all), r.defValTrg("tmp:sn.skip.all", (e, t) => {
			this.skip_all = String(t) !== "false";
		}), r.defTmp("sn.skip.enabled", () => this.skip_enabled), r.defValTrg("tmp:sn.skip.enabled", (e, t) => {
			this.skip_enabled = String(t) !== "false";
		}), r.defTmp("sn.auto.enabled", () => this.auto_enabled), r.defValTrg("tmp:sn.auto.enabled", (e, t) => {
			this.auto_enabled = String(t) !== "false";
		}), t.l = (e) => Q.rs.l(e), t.p = (e) => Q.rs.p(e), t.s = (e) => Q.rs.s(e), t.wait = (e) => Q.rs.wait(e), t.waitclick = (e) => Q.rs.s(e), t.page = (e) => Q.rs.page(e), new ha(), t.jump({ fn: "main" });
	}
	static setFcs(e) {
		this.fcs = e;
	}
	static destroy() {
		Q.destroy();
	}
	static cancelAutoSkip() {
		this.tagL_enabled || (this.tagL_enabled = !0, this.val.setVal_Nochk("tmp", "sn.tagL.enabled", !0)), this.skip_enabled && (this.skip_enabled = !1, this.val.setVal_Nochk("tmp", "sn.skip.enabled", !1)), this.auto_enabled && (this.auto_enabled = !1, this.val.setVal_Nochk("tmp", "sn.auto.enabled", !1));
	}
};
//#endregion
export { ua as a, da as i, Q as n, pa as r, $ as t };

//# sourceMappingURL=Reading.js.map