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
		return s(this.subscriptions, e), () => c(this.subscriptions, e);
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
	let t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set(), r = !1, i = !1, a = /* @__PURE__ */ new WeakSet(), o = {
		delta: 0,
		timestamp: 0,
		isProcessing: !1
	};
	function s(t) {
		a.has(t) && (c.schedule(t), e()), t(o);
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
var { schedule: T, cancel: Ae, state: je, steps: Me } = /* @__PURE__ */ ke(typeof requestAnimationFrame < "u" ? requestAnimationFrame : v, !0), Ne;
function Pe() {
	Ne = void 0;
}
var E = {
	now: () => (Ne === void 0 && E.set(je.isProcessing || p.useManualTiming ? je.timestamp : performance.now()), Ne),
	set: (e) => {
		Ne = e, queueMicrotask(Pe);
	}
}, Fe = (e) => (t) => typeof t == "string" && t.startsWith(e), Ie = /*@__PURE__*/ Fe("--"), Le = /*@__PURE__*/ Fe("var(--"), Re = (e) => Le(e) ? ze.test(e.split("/*")[0].trim()) : !1, ze = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function Be(e) {
	return typeof e == "string" && e.split("/*")[0].includes("var(--");
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/numbers/index.mjs
var D = {
	test: (e) => typeof e == "number",
	parse: parseFloat,
	transform: (e) => e
}, O = {
	...D,
	transform: (e) => l(0, 1, e)
}, Ve = {
	...D,
	default: 1
}, k = (e) => Math.round(e * 1e5) / 1e5, He = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/is-nullish.mjs
function Ue(e) {
	return e == null;
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/single-color-regex.mjs
var We = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Ge = (e, t) => (n) => !!(typeof n == "string" && We.test(n) && n.startsWith(e) || t && !Ue(n) && Object.prototype.hasOwnProperty.call(n, t)), Ke = (e, t, n) => (r) => {
	if (typeof r != "string") return r;
	let [i, a, o, s] = r.match(He);
	return {
		[e]: parseFloat(i),
		[t]: parseFloat(a),
		[n]: parseFloat(o),
		alpha: s === void 0 ? 1 : parseFloat(s)
	};
}, qe = (e) => l(0, 255, e), Je = {
	...D,
	transform: (e) => Math.round(qe(e))
}, A = {
	test: /*@__PURE__*/ Ge("rgb", "red"),
	parse: /*@__PURE__*/ Ke("red", "green", "blue"),
	transform: ({ red: e, green: t, blue: n, alpha: r = 1 }) => "rgba(" + Je.transform(e) + ", " + Je.transform(t) + ", " + Je.transform(n) + ", " + k(O.transform(r)) + ")"
};
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/color/hex.mjs
function Ye(e) {
	let t = "", n = "", r = "", i = "";
	return e.length > 5 ? (t = e.substring(1, 3), n = e.substring(3, 5), r = e.substring(5, 7), i = e.substring(7, 9)) : (t = e.substring(1, 2), n = e.substring(2, 3), r = e.substring(3, 4), i = e.substring(4, 5), t += t, n += n, r += r, i += i), {
		red: parseInt(t, 16),
		green: parseInt(n, 16),
		blue: parseInt(r, 16),
		alpha: i ? parseInt(i, 16) / 255 : 1
	};
}
var Xe = {
	test: /*@__PURE__*/ Ge("#"),
	parse: Ye,
	transform: A.transform
}, j = /* @__NO_SIDE_EFFECTS__ */ (e) => ({
	test: (t) => typeof t == "string" && t.endsWith(e) && t.split(" ").length === 1,
	parse: parseFloat,
	transform: (t) => `${t}${e}`
}), M = /*@__PURE__*/ j("deg"), N = /*@__PURE__*/ j("%"), P = /*@__PURE__*/ j("px"), Ze = /*@__PURE__*/ j("vh"), Qe = /*@__PURE__*/ j("vw"), $e = {
	...N,
	parse: (e) => N.parse(e) / 100,
	transform: (e) => N.transform(e * 100)
}, F = {
	test: /*@__PURE__*/ Ge("hsl", "hue"),
	parse: /*@__PURE__*/ Ke("hue", "saturation", "lightness"),
	transform: ({ hue: e, saturation: t, lightness: n, alpha: r = 1 }) => "hsla(" + Math.round(e) + ", " + N.transform(k(t)) + ", " + N.transform(k(n)) + ", " + k(O.transform(r)) + ")"
}, I = {
	test: (e) => A.test(e) || Xe.test(e) || F.test(e),
	parse: (e) => A.test(e) ? A.parse(e) : F.test(e) ? F.parse(e) : Xe.parse(e),
	transform: (e) => typeof e == "string" ? e : e.hasOwnProperty("red") ? A.transform(e) : F.transform(e),
	getAnimatableNone: (e) => {
		let t = I.parse(e);
		return t.alpha = 0, I.transform(t);
	}
}, et = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/complex/index.mjs
function tt(e) {
	return isNaN(e) && typeof e == "string" && (e.match(He)?.length || 0) + (e.match(et)?.length || 0) > 0;
}
var nt = "number", rt = "color", it = "var", at = "var(", ot = "${}", st = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function L(e) {
	let t = e.toString(), n = [], r = {
		color: [],
		number: [],
		var: []
	}, i = [], a = 0;
	return {
		values: n,
		split: t.replace(st, (e) => (I.test(e) ? (r.color.push(a), i.push(rt), n.push(I.parse(e))) : e.startsWith(at) ? (r.var.push(a), i.push(it), n.push(e)) : (r.number.push(a), i.push(nt), n.push(parseFloat(e))), ++a, ot)).split(ot),
		indexes: r,
		types: i
	};
}
function ct(e) {
	return L(e).values;
}
function lt({ split: e, types: t }) {
	let n = e.length;
	return (r) => {
		let i = "";
		for (let a = 0; a < n; a++) if (i += e[a], r[a] !== void 0) {
			let e = t[a];
			i += e === nt ? k(r[a]) : e === rt ? I.transform(r[a]) : r[a];
		}
		return i;
	};
}
function ut(e) {
	return lt(L(e));
}
var dt = (e) => typeof e == "number" ? 0 : I.test(e) ? I.getAnimatableNone(e) : e, ft = (e, t) => typeof e == "number" ? t?.trim().endsWith("/") ? e : 0 : dt(e);
function pt(e) {
	let t = L(e);
	return lt(t)(t.values.map((e, n) => ft(e, t.split[n])));
}
var R = {
	test: tt,
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
var z = (e, t, n) => e + (t - e) * n, _t = (e, t, n) => {
	let r = e * e, i = n * (t * t - r) + r;
	return i < 0 ? 0 : Math.sqrt(i);
}, vt = [
	Xe,
	A,
	F
], yt = (e) => vt.find((t) => t.test(e));
function bt(e) {
	let t = yt(e);
	if (d(!!t, `'${e}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !t) return !1;
	let n = t.parse(e);
	return t === F && (n = ht(n)), n;
}
var xt = (e, t) => {
	let n = bt(e), r = bt(t);
	if (!n || !r) return gt(e, t);
	let i = { ...n };
	return (e) => (i.red = _t(n.red, r.red, e), i.green = _t(n.green, r.green, e), i.blue = _t(n.blue, r.blue, e), i.alpha = z(n.alpha, r.alpha, e), A.transform(i));
}, St = /* @__PURE__ */ new Set(["none", "hidden"]);
function Ct(e, t) {
	return St.has(e) ? (n) => n <= 0 ? e : t : (n) => n >= 1 ? t : e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/complex.mjs
function wt(e, t) {
	return (n) => z(e, t, n);
}
function Tt(e) {
	return typeof e == "number" ? wt : typeof e == "string" ? Re(e) ? gt : I.test(e) ? xt : kt : Array.isArray(e) ? Et : typeof e == "object" ? I.test(e) ? xt : Dt : gt;
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
	let n = R.createTransformer(t), r = L(e), i = L(t);
	return r.indexes.var.length === i.indexes.var.length && r.indexes.color.length === i.indexes.color.length && r.indexes.number.length >= i.indexes.number.length ? St.has(e) && !i.values.length || St.has(t) && !r.values.length ? Ct(e, t) : y(Et(Ot(r, i), i.values), n) : (d(!0, `Complex values '${e}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), gt(e, t));
};
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/index.mjs
function At(e, t, n) {
	return typeof e == "number" && typeof t == "number" && typeof n == "number" ? z(e, t, n) : Tt(e)(e, t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/drivers/frame.mjs
var jt = (e) => {
	let t = ({ timestamp: t }) => e(t);
	return {
		start: (e = !0) => T.update(t, e),
		stop: () => Ae(t),
		now: () => je.isProcessing ? je.timestamp : E.now()
	};
}, Mt = (e, t, n = 10) => {
	let r = "", i = Math.max(Math.round(t / n), 2);
	for (let t = 0; t < i; t++) r += Math.round(e(t / (i - 1)) * 1e4) / 1e4 + ", ";
	return `linear(${r.substring(0, r.length - 2)})`;
}, Nt = 2e4;
function Pt(e, t = 50, n = Nt, r) {
	let i = 0, a = e.next(i);
	for (r?.push(a.value); !a.done && i < n;) i += t, a = e.next(i), r?.push(a.value);
	return i >= n ? Infinity : i;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/utils/create-generator-easing.mjs
function Ft(e, t = 100, n) {
	let r = n({
		...e,
		keyframes: [0, t]
	}), i = Math.min(Pt(r), Nt);
	return {
		type: "keyframes",
		ease: (e) => r.next(i * e).value / t,
		duration: /* @__PURE__ */ C(i)
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/spring.mjs
var B = {
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
function It(e, t) {
	return e * Math.sqrt(1 - t * t);
}
var Lt = 12;
function Rt(e, t, n) {
	let r = n;
	for (let n = 1; n < Lt; n++) r -= e(r) / t(r);
	return r;
}
var zt = .001;
function Bt({ duration: e = B.duration, bounce: t = B.bounce, velocity: n = B.velocity, mass: r = B.mass }) {
	let i, a;
	d(e <= /* @__PURE__ */ S(B.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
	let o = 1 - t;
	o = l(B.minDamping, B.maxDamping, o), e = l(B.minDuration, B.maxDuration, /* @__PURE__ */ C(e)), o < 1 ? (i = (t) => {
		let r = t * o, i = r * e, a = r - n, s = It(t, o), c = Math.exp(-i);
		return zt - a / s * c;
	}, a = (t) => {
		let r = t * o * e, a = r * n + n, s = o * o * t * t * e, c = Math.exp(-r), l = It(t * t, o);
		return (-i(t) + zt > 0 ? -1 : 1) * ((a - s) * c) / l;
	}) : (i = (t) => -.001 + Math.exp(-t * e) * ((t - n) * e + 1), a = (t) => Math.exp(-t * e) * ((n - t) * (e * e)));
	let s = 5 / e, c = Rt(i, a, s);
	if (e = /* @__PURE__ */ S(e), isNaN(c)) return {
		stiffness: B.stiffness,
		damping: B.damping,
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
var Vt = ["duration", "bounce"], Ht = [
	"stiffness",
	"damping",
	"mass"
];
function Ut(e, t) {
	return t.some((t) => e[t] !== void 0);
}
function Wt(e) {
	let t = {
		velocity: B.velocity,
		stiffness: B.stiffness,
		damping: B.damping,
		mass: B.mass,
		isResolvedFromDuration: !1,
		...e
	};
	if (!Ut(e, Ht) && Ut(e, Vt)) {
		if (t.velocity = 0, e.visualDuration) {
			let n = e.visualDuration, r = 2 * Math.PI / (n * 1.2), i = r * r, a = 2 * l(.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(i);
			t = {
				...t,
				mass: B.mass,
				stiffness: i,
				damping: a
			};
		} else {
			let n = Bt({
				...e,
				velocity: 0
			});
			t = {
				...t,
				...n,
				mass: B.mass
			}, t.isResolvedFromDuration = !0;
		}
	}
	return t;
}
function V(e = B.visualDuration, t = B.bounce) {
	let n = typeof e == "object" ? e : {
		visualDuration: e,
		keyframes: [0, 1],
		bounce: t
	}, { restSpeed: r, restDelta: i } = n, a = n.keyframes[0], o = n.keyframes[n.keyframes.length - 1], s = {
		done: !1,
		value: a
	}, { stiffness: c, damping: l, mass: u, duration: d, velocity: f, isResolvedFromDuration: p } = Wt({
		...n,
		velocity: -/* @__PURE__ */ C(n.velocity || 0)
	}), m = f || 0, h = l / (2 * Math.sqrt(c * u)), g = o - a, _ = /* @__PURE__ */ C(Math.sqrt(c / u)), v = h * _, y = Math.abs(g) < 5;
	r ||= y ? B.restSpeed.granular : B.restSpeed.default, i ||= y ? B.restDelta.granular : B.restDelta.default;
	let b, x;
	if (h < 1) {
		let e = It(_, h), t = (m + v * g) / e, n = v * t + g * e, r = v * g - t * e, i = -1, a = 0, s = 0, c = (c) => {
			if (c !== i) {
				i = c;
				let l = Math.exp(-v * c), u = Math.sin(e * c), d = Math.cos(e * c);
				a = o - l * (t * u + g * d), s = l * (n * u + r * d);
			}
		};
		b = (e) => (c(e), a), x = (e) => (c(e), s);
	} else if (h === 1) {
		b = (e) => o - Math.exp(-_ * e) * (g + (m + _ * g) * e);
		let e = m + _ * g;
		x = (t) => Math.exp(-_ * t) * (_ * e * t - m);
	} else {
		let e = _ * Math.sqrt(h * h - 1);
		b = (t) => {
			let n = Math.exp(-v * t), r = Math.min(e * t, 300);
			return o - n * ((m + v * g) * Math.sinh(r) + e * g * Math.cosh(r)) / e;
		};
		let t = (m + v * g) / e, n = v * t - g * e, r = v * g - t * e;
		x = (t) => {
			let i = Math.exp(-v * t), a = Math.min(e * t, 300);
			return i * (n * Math.sinh(a) + r * Math.cosh(a));
		};
	}
	let w = {
		calculatedDuration: p && d || null,
		velocity: (e) => /* @__PURE__ */ S(x(e)),
		next: (e) => {
			let t = b(e);
			if (p) s.done = e >= d;
			else {
				let n = /* @__PURE__ */ S(x(e));
				s.done = Math.abs(n) <= r && Math.abs(o - t) <= i;
			}
			return s.value = s.done ? o : t, s;
		},
		toString: () => {
			let e = Math.min(Pt(w), Nt), t = Mt((t) => w.next(e * t).value, e, 30);
			return e + "ms " + t;
		},
		toTransition: () => {}
	};
	return w;
}
V.applyToOptions = (e) => {
	let t = Ft(e, 100, V);
	return e.ease = t.ease, e.duration = /* @__PURE__ */ S(t.duration), e.type = "keyframes", e;
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/inertia.mjs
function Gt({ keyframes: e, velocity: t = 0, power: n = .8, timeConstant: r = 325, bounceDamping: i = 10, bounceStiffness: a = 500, modifyTarget: o, min: s, max: c, restDelta: l = .5, restSpeed: u }) {
	let d = e[0], f = {
		done: !1,
		value: d
	}, p = (e) => e < s || e > c, m = (e) => s === void 0 ? c : c === void 0 || Math.abs(s - e) < Math.abs(c - e) ? s : c, h = n * t, g = d + h, _ = o === void 0 ? g : o(g);
	_ !== g && (h = _ - d);
	let v = (e) => -h * Math.exp(-e / r), y = (e) => {
		let t = v(e);
		f.done = Math.abs(t) <= l, f.value = f.done ? _ : _ + t;
	}, b, x, S = (e) => {
		p(f.value) && (b = e, x = V({
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
function Kt(e, t, n) {
	let r = [], i = n || p.mix || At, a = e.length - 1;
	for (let n = 0; n < a; n++) {
		let a = i(e[n], e[n + 1]);
		t && (a = y(Array.isArray(t) ? t[n] || v : t, a)), r.push(a);
	}
	return r;
}
function qt(e, t, { clamp: n = !0, ease: r, mixer: i } = {}) {
	let a = e.length;
	if (f(a === t.length, "Both input and output ranges must be the same length", "range-length"), a === 1) return () => t[0];
	if (a === 2 && t[0] === t[1]) return () => t[1];
	let o = e[0] === e[1];
	e[0] > e[a - 1] && (e = [...e].reverse(), t = [...t].reverse());
	let s = Kt(t, r, i), c = s.length, u = (n) => {
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
function Jt(e, t) {
	let n = e[e.length - 1];
	for (let r = 1; r <= t; r++) {
		let i = /* @__PURE__ */ b(0, t, r);
		e.push(z(n, 1, i));
	}
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/offsets/default.mjs
function Yt(e) {
	let t = [0];
	return Jt(t, e.length - 1), t;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/offsets/time.mjs
function Xt(e, t) {
	return e.map((e) => e * t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/keyframes.mjs
function Zt(e, t) {
	return e.map(() => t || ye).splice(0, e.length - 1);
}
function H({ duration: e = 300, keyframes: t, times: n, ease: r = "easeInOut" }) {
	let i = /* @__PURE__ */ be(r) ? r.map(Te) : Te(r), a = {
		done: !1,
		value: t[0]
	}, o = qt(Xt(n && n.length === t.length ? n : Yt(t), e), t, { ease: Array.isArray(i) ? i : Zt(t, i) });
	return {
		calculatedDuration: e,
		next: (t) => (a.value = o(t), a.done = t >= e, a)
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/utils/velocity.mjs
var Qt = 5;
function $t(e, t, n) {
	let r = Math.max(t - Qt, 0);
	return /* @__PURE__ */ w(n - e(r), t - r);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/get-final.mjs
var en = (e) => e !== null;
function tn(e, { repeat: t, repeatType: n = "loop" }, r, i = 1) {
	let a = e.filter(en), o = i < 0 || t && n !== "loop" && t % 2 == 1 ? 0 : a.length - 1;
	return !o || r === void 0 ? a[o] : r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/replace-transition-type.mjs
var nn = {
	decay: Gt,
	inertia: Gt,
	tween: H,
	keyframes: H,
	spring: V
};
function rn(e) {
	typeof e.type == "string" && (e.type = nn[e.type]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/WithPromise.mjs
var an = class {
	constructor() {
		this.updateFinished();
	}
	get finished() {
		return this._finished;
	}
	updateFinished() {
		this._finished = new Promise((e) => {
			this.resolve = e;
		});
	}
	notifyFinished() {
		this.resolve();
	}
	then(e, t) {
		return this.finished.then(e, t);
	}
}, on = (e) => e / 100, sn = class extends an {
	constructor(e) {
		super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
			done: !1,
			value: void 0
		}, this.stop = () => {
			let { motionValue: e } = this.options;
			e && e.updatedAt !== E.now() && this.tick(E.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
		}, this.options = e, this.initAnimation(), this.play(), e.autoplay === !1 && this.pause();
	}
	initAnimation() {
		let { options: e } = this;
		rn(e);
		let { type: t = H, repeat: n = 0, repeatDelay: r = 0, repeatType: i, velocity: a = 0 } = e, { keyframes: o } = e, s = t || H;
		process.env.NODE_ENV !== "production" && s !== H && f(o.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${o}`, "spring-two-frames"), s !== H && typeof o[0] != "number" && (this.mixKeyframes = y(on, At(o[0], o[1])), o = [0, 100]);
		let c = s({
			...e,
			keyframes: o
		});
		i === "mirror" && (this.mirroredGenerator = s({
			...e,
			keyframes: [...o].reverse(),
			velocity: -a
		})), c.calculatedDuration === null && (c.calculatedDuration = Pt(c));
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
		return C && m !== Gt && (x.value = tn(u, this.options, g, this.speed)), h && h(x.value), C && this.finish(), x;
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
		let e = this.currentTime;
		if (e <= 0) return this.options.velocity || 0;
		if (this.generator.velocity) return this.generator.velocity(e);
		let t = this.generator.next(e).value;
		return $t((e) => this.generator.next(e).value, e, t);
	}
	get speed() {
		return this.playbackSpeed;
	}
	set speed(e) {
		let t = this.playbackSpeed !== e;
		t && this.driver && this.updateTime(E.now()), this.playbackSpeed = e, t && this.driver && (this.time = /* @__PURE__ */ C(this.currentTime));
	}
	play() {
		if (this.isStopped) return;
		let { driver: e = jt, startTime: t } = this.options;
		this.driver ||= e((e) => this.tick(e)), this.options.onPlay?.();
		let n = this.driver.now();
		this.state === "finished" ? (this.updateFinished(), this.startTime = n) : this.holdTime === null ? this.startTime ||= t ?? n : this.startTime = n - this.holdTime, this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
	}
	pause() {
		this.state = "paused", this.updateTime(E.now()), this.holdTime = this.currentTime;
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
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/fill-wildcards.mjs
function cn(e) {
	for (let t = 1; t < e.length; t++) e[t] ?? (e[t] = e[t - 1]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/parse-transform.mjs
var U = (e) => e * 180 / Math.PI, ln = (e) => dn(U(Math.atan2(e[1], e[0]))), un = {
	x: 4,
	y: 5,
	translateX: 4,
	translateY: 5,
	scaleX: 0,
	scaleY: 3,
	scale: (e) => (Math.abs(e[0]) + Math.abs(e[3])) / 2,
	rotate: ln,
	rotateZ: ln,
	skewX: (e) => U(Math.atan(e[1])),
	skewY: (e) => U(Math.atan(e[2])),
	skew: (e) => (Math.abs(e[1]) + Math.abs(e[2])) / 2
}, dn = (e) => (e %= 360, e < 0 && (e += 360), e), fn = ln, pn = (e) => Math.sqrt(e[0] * e[0] + e[1] * e[1]), mn = (e) => Math.sqrt(e[4] * e[4] + e[5] * e[5]), hn = {
	x: 12,
	y: 13,
	z: 14,
	translateX: 12,
	translateY: 13,
	translateZ: 14,
	scaleX: pn,
	scaleY: mn,
	scale: (e) => (pn(e) + mn(e)) / 2,
	rotateX: (e) => dn(U(Math.atan2(e[6], e[5]))),
	rotateY: (e) => dn(U(Math.atan2(-e[2], e[0]))),
	rotateZ: fn,
	rotate: fn,
	skewX: (e) => U(Math.atan(e[4])),
	skewY: (e) => U(Math.atan(e[1])),
	skew: (e) => (Math.abs(e[1]) + Math.abs(e[4])) / 2
};
function gn(e) {
	return +!!e.includes("scale");
}
function _n(e, t) {
	if (!e || e === "none") return gn(t);
	let n = e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u), r, i;
	if (n) r = hn, i = n;
	else {
		let t = e.match(/^matrix\(([-\d.e\s,]+)\)$/u);
		r = un, i = t;
	}
	if (!i) return gn(t);
	let a = r[t], o = i[1].split(",").map(yn);
	return typeof a == "function" ? a(o) : o[a];
}
var vn = (e, t) => {
	let { transform: n = "none" } = getComputedStyle(e);
	return _n(n, t);
};
function yn(e) {
	return parseFloat(e.trim());
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs
var W = [
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
], G = /* @__PURE__ */ new Set([...W, "pathRotation"]), bn = (e) => e === D || e === P, xn = /* @__PURE__ */ new Set([
	"x",
	"y",
	"z"
]), Sn = W.filter((e) => !xn.has(e));
function Cn(e) {
	let t = [];
	return Sn.forEach((n) => {
		let r = e.getValue(n);
		r !== void 0 && (t.push([n, r.get()]), r.set(+!!n.startsWith("scale")));
	}), t;
}
var K = {
	width: ({ x: e }, { paddingLeft: t = "0", paddingRight: n = "0", boxSizing: r }) => {
		let i = e.max - e.min;
		return r === "border-box" ? i : i - parseFloat(t) - parseFloat(n);
	},
	height: ({ y: e }, { paddingTop: t = "0", paddingBottom: n = "0", boxSizing: r }) => {
		let i = e.max - e.min;
		return r === "border-box" ? i : i - parseFloat(t) - parseFloat(n);
	},
	top: (e, { top: t }) => parseFloat(t),
	left: (e, { left: t }) => parseFloat(t),
	bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
	right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
	x: (e, { transform: t }) => _n(t, "x"),
	y: (e, { transform: t }) => _n(t, "y")
};
K.translateX = K.x, K.translateY = K.y;
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/KeyframesResolver.mjs
var q = /* @__PURE__ */ new Set(), wn = !1, Tn = !1, En = !1;
function Dn() {
	if (Tn) {
		let e = Array.from(q).filter((e) => e.needsMeasurement), t = new Set(e.map((e) => e.element)), n = /* @__PURE__ */ new Map();
		t.forEach((e) => {
			let t = Cn(e);
			t.length && (n.set(e, t), e.render());
		}), e.forEach((e) => e.measureInitialState()), t.forEach((e) => {
			e.render();
			let t = n.get(e);
			t && t.forEach(([t, n]) => {
				e.getValue(t)?.set(n);
			});
		}), e.forEach((e) => e.measureEndState()), e.forEach((e) => {
			e.suspendedScrollY !== void 0 && window.scrollTo(0, e.suspendedScrollY);
		});
	}
	Tn = !1, wn = !1, q.forEach((e) => e.complete(En)), q.clear();
}
function On() {
	q.forEach((e) => {
		e.readKeyframes(), e.needsMeasurement && (Tn = !0);
	});
}
function kn() {
	En = !0, On(), Dn(), En = !1;
}
var An = class {
	constructor(e, t, n, r, i, a = !1) {
		this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...e], this.onComplete = t, this.name = n, this.motionValue = r, this.element = i, this.isAsync = a;
	}
	scheduleResolve() {
		this.state = "scheduled", this.isAsync ? (q.add(this), wn || (wn = !0, T.read(On), T.resolveKeyframes(Dn))) : (this.readKeyframes(), this.complete());
	}
	readKeyframes() {
		let { unresolvedKeyframes: e, name: t, element: n, motionValue: r } = this;
		if (e[0] === null) {
			let i = r?.get(), a = e[e.length - 1];
			if (i !== void 0) e[0] = i;
			else if (n && t) {
				let r = n.readValue(t, a);
				r != null && (e[0] = r);
			}
			e[0] === void 0 && (e[0] = a), r && i === void 0 && r.set(e[0]);
		}
		cn(e);
	}
	setFinalKeyframe() {}
	measureInitialState() {}
	renderEndStyles() {}
	measureEndState() {}
	complete(e = !1) {
		this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e), q.delete(this);
	}
	cancel() {
		this.state === "scheduled" && (q.delete(this), this.state = "pending");
	}
	resume() {
		this.state === "pending" && this.scheduleResolve();
	}
}, jn = (e) => e.startsWith("--");
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/style-set.mjs
function Mn(e, t, n) {
	jn(t) ? e.style.setProperty(t, n) : e.style[t] = n;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/flags.mjs
var Nn = {};
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/memo.mjs
function Pn(e, t) {
	let n = /* @__PURE__ */ _(e);
	return () => Nn[t] ?? n();
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs
var Fn = /* @__PURE__ */ Pn(() => window.ScrollTimeline !== void 0, "scrollTimeline"), In = /*@__PURE__*/ Pn(() => {
	try {
		document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
	} catch {
		return !1;
	}
	return !0;
}, "linearEasing"), J = ([e, t, n, r]) => `cubic-bezier(${e}, ${t}, ${n}, ${r})`, Ln = {
	linear: "linear",
	ease: "ease",
	easeIn: "ease-in",
	easeOut: "ease-out",
	easeInOut: "ease-in-out",
	circIn: /*@__PURE__*/ J([
		0,
		.65,
		.55,
		1
	]),
	circOut: /*@__PURE__*/ J([
		.55,
		0,
		1,
		.45
	]),
	backIn: /*@__PURE__*/ J([
		.31,
		.01,
		.66,
		-.59
	]),
	backOut: /*@__PURE__*/ J([
		.33,
		1.53,
		.69,
		.99
	])
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/easing/map-easing.mjs
function Rn(e, t) {
	if (e) return typeof e == "function" ? In() ? Mt(e, t) : "ease-out" : /* @__PURE__ */ Se(e) ? J(e) : Array.isArray(e) ? e.map((e) => Rn(e, t) || Ln.easeOut) : Ln[e];
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/start-waapi-animation.mjs
function zn(e, t, n, { delay: r = 0, duration: i = 300, repeat: a = 0, repeatType: o = "loop", ease: s = "easeOut", times: c } = {}, l = void 0) {
	let u = { [t]: n };
	c && (u.offset = c);
	let d = Rn(s, i);
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
function Bn(e) {
	return typeof e == "function" && "applyToOptions" in e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/utils/apply-generator.mjs
function Vn({ type: e, ...t }) {
	return Bn(e) && In() ? e.applyToOptions(t) : (t.duration ??= 300, t.ease ??= "easeOut", t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/NativeAnimation.mjs
var Hn = class extends an {
	constructor(e) {
		if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !e) return;
		let { element: t, name: n, keyframes: r, pseudoElement: i, allowFlatten: a = !1, finalKeyframe: o, onComplete: s } = e;
		this.isPseudoElement = !!i, this.allowFlatten = a, this.options = e, f(typeof e.type != "string", "Mini animate() doesn't support \"type\" as a string.", "mini-spring");
		let c = Vn(e);
		this.animation = zn(t, n, r, c, i), c.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
			if (this.finishedTime = this.time, !i) {
				let e = tn(r, this.options, o, this.speed);
				this.updateMotionValue && this.updateMotionValue(e), Mn(t, n, e), this.animation.cancel();
			}
			s?.(), this.notifyFinished();
		};
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
		return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, e && Fn() ? (this.animation.timeline = e, t && (this.animation.rangeStart = t), n && (this.animation.rangeEnd = n), v) : r(this);
	}
}, Un = {
	anticipate: pe,
	backInOut: fe,
	circInOut: ge
};
function Wn(e) {
	return e in Un;
}
function Gn(e) {
	typeof e.ease == "string" && Wn(e.ease) && (e.ease = Un[e.ease]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/NativeAnimationExtended.mjs
var Kn = 10, qn = class extends Hn {
	constructor(e) {
		Gn(e), rn(e), super(e), e.startTime !== void 0 && e.autoplay !== !1 && (this.startTime = e.startTime), this.options = e;
	}
	updateMotionValue(e) {
		let { motionValue: t, onUpdate: n, onComplete: r, element: i, ...a } = this.options;
		if (!t) return;
		if (e !== void 0) {
			t.set(e);
			return;
		}
		let o = new sn({
			...a,
			autoplay: !1
		}), s = Math.max(Kn, E.now() - this.startTime), c = l(0, Kn, s - Kn), u = o.sample(s).value, { name: d } = this.options;
		i && d && Mn(i, d, u), t.setWithVelocity(o.sample(Math.max(0, s - c)).value, u, c), o.stop();
	}
}, Jn = (e, t) => t !== "zIndex" && !!(typeof e == "number" || Array.isArray(e) || typeof e == "string" && (R.test(e) || e === "0") && !e.startsWith("url("));
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/can-animate.mjs
function Yn(e) {
	let t = e[0];
	if (e.length === 1) return !0;
	for (let n = 0; n < e.length; n++) if (e[n] !== t) return !0;
}
function Xn(e, t, n, r) {
	let i = e[0];
	if (i === null) return !1;
	if (t === "display" || t === "visibility") return !0;
	let a = e[e.length - 1], o = Jn(i, t), s = Jn(a, t);
	return d(o === s, `You are trying to animate ${t} from "${i}" to "${a}". "${o ? a : i}" is not an animatable value.`, "value-not-animatable"), !o || !s ? !1 : Yn(e) || (n === "spring" || Bn(n)) && r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/make-animation-instant.mjs
function Zn(e) {
	e.duration = 0, e.type = "keyframes";
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/utils/accelerated-values.mjs
var Qn = /* @__PURE__ */ new Set([
	"opacity",
	"clipPath",
	"filter",
	"transform",
	"backgroundColor"
]), $n = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function er(e) {
	for (let t = 0; t < e.length; t++) if (typeof e[t] == "string" && $n.test(e[t])) return !0;
	return !1;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/supports/waapi.mjs
var tr = /* @__PURE__ */ new Set([
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
]), nr = /*@__PURE__*/ _(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function rr(e) {
	let { motionValue: t, name: n, repeatDelay: r, repeatType: i, damping: a, type: o, keyframes: s } = e, c = t?.owner?.current;
	if (!(c instanceof HTMLElement) && !(c instanceof SVGElement)) return !1;
	let { onUpdate: l, transformTemplate: u } = t.owner.getProps();
	return nr() && n && (Qn.has(n) || tr.has(n) && er(s)) && (n !== "transform" || !u) && !l && !r && i !== "mirror" && a !== 0 && o !== "inertia";
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/AsyncMotionValueAnimation.mjs
var ir = 40, ar = class extends an {
	constructor({ autoplay: e = !0, delay: t = 0, type: n = "keyframes", repeat: r = 0, repeatDelay: i = 0, repeatType: a = "loop", keyframes: o, name: s, motionValue: c, element: l, ...u }) {
		super(), this.stop = () => {
			this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
		}, this.createdAt = E.now();
		let d = {
			autoplay: e,
			delay: t,
			type: n,
			repeat: r,
			repeatDelay: i,
			repeatType: a,
			name: s,
			motionValue: c,
			element: l,
			...u
		}, f = l?.KeyframeResolver || An;
		this.keyframeResolver = new f(o, (e, t, n) => this.onKeyframesResolved(e, t, d, !n), s, c, l), this.keyframeResolver?.scheduleResolve();
	}
	onKeyframesResolved(e, t, n, r) {
		this.keyframeResolver = void 0;
		let { name: i, type: a, velocity: o, delay: s, isHandoff: c, onUpdate: l } = n;
		this.resolvedAt = E.now();
		let u = !0;
		Xn(e, i, a, o) || (u = !1, (p.instantAnimations || !s) && l?.(tn(e, n, t)), e[0] = e[e.length - 1], Zn(n), n.repeat = 0);
		let d = {
			startTime: r ? this.resolvedAt && this.resolvedAt - this.createdAt > ir ? this.resolvedAt : this.createdAt : void 0,
			finalKeyframe: t,
			...n,
			keyframes: e
		}, f = u && !c && rr(d), m = d.motionValue?.owner?.current, h;
		if (f) try {
			h = new qn({
				...d,
				element: m
			});
		} catch {
			h = new sn(d);
		}
		else h = new sn(d);
		h.finished.then(() => {
			this.notifyFinished();
		}).catch(v), this.pendingTimeline &&= (this.stopTimeline = h.attachTimeline(this.pendingTimeline), void 0), this._animation = h;
	}
	get finished() {
		return this._animation ? this.animation.finished : this._finished;
	}
	then(e, t) {
		return this.finished.finally(e).then(() => {});
	}
	get animation() {
		return this._animation || (this.keyframeResolver?.resume(), kn()), this._animation;
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
}, or = class {
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
		return sr(this.animations, "duration");
	}
	get iterationDuration() {
		return sr(this.animations, "iterationDuration");
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
function sr(e, t) {
	let n = 0;
	for (let r = 0; r < e.length; r++) {
		let i = e[r][t];
		i !== null && i > n && (n = i);
	}
	return n;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/GroupAnimationWithThen.mjs
var cr = class extends or {
	then(e, t) {
		return this.finished.finally(e).then(() => {});
	}
}, lr = 30, ur = (e) => !isNaN(parseFloat(e)), dr = { current: void 0 }, fr = class {
	constructor(e, t = {}) {
		this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (e) => {
			let t = E.now();
			if (this.updatedAt !== t && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(e), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents)) for (let e of this.dependents) e.dirty();
		}, this.hasAnimated = !1, this.setCurrent(e), this.owner = t.owner;
	}
	setCurrent(e) {
		this.current = e, this.updatedAt = E.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = ur(this.current));
	}
	setPrevFrameValue(e = this.current) {
		this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt;
	}
	onChange(e) {
		return process.env.NODE_ENV !== "production" && te(!1, "value.onChange(callback) is deprecated. Switch to value.on(\"change\", callback)."), this.on("change", e);
	}
	on(e, t) {
		this.events[e] || (this.events[e] = new x());
		let n = this.events[e].add(t);
		return e === "change" ? () => {
			n(), T.read(() => {
				this.events.change.getSize() || this.stop();
			});
		} : n;
	}
	clearListeners() {
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
		this.events.change?.notify(this.current);
	}
	addDependent(e) {
		this.dependents ||= /* @__PURE__ */ new Set(), this.dependents.add(e);
	}
	removeDependent(e) {
		this.dependents && this.dependents.delete(e);
	}
	get() {
		return dr.current && dr.current.push(this), this.current;
	}
	getPrevious() {
		return this.prev;
	}
	getVelocity() {
		let e = E.now();
		if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > lr) return 0;
		let t = Math.min(this.updatedAt - this.prevUpdatedAt, lr);
		return /* @__PURE__ */ w(parseFloat(this.current) - parseFloat(this.prevFrameValue), t);
	}
	start(e) {
		return this.stop(), new Promise((t) => {
			this.hasAnimated = !0, this.animation = e(t), this.events.animationStart && this.events.animationStart.notify();
		}).then(() => {
			this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
		});
	}
	stop() {
		this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
	}
	isAnimating() {
		return !!this.animation;
	}
	clearAnimation() {
		delete this.animation;
	}
	destroy() {
		this.dependents?.clear(), this.events.destroy?.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
	}
};
function Y(e, t) {
	return new fr(e, t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/resolve-transition.mjs
function pr(e, t) {
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
function mr(e, t) {
	let n = e?.[t] ?? e?.default ?? e;
	return n === e ? n : pr(n, e);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/default-transitions.mjs
var hr = {
	type: "spring",
	stiffness: 500,
	damping: 25,
	restSpeed: 10
}, gr = (e) => ({
	type: "spring",
	stiffness: 550,
	damping: e === 0 ? 2 * Math.sqrt(550) : 30,
	restSpeed: 10
}), _r = {
	type: "keyframes",
	duration: .8
}, vr = {
	type: "keyframes",
	ease: [
		.25,
		.1,
		.35,
		1
	],
	duration: .3
}, yr = (e, { keyframes: t }) => t.length > 2 ? _r : G.has(e) ? e.startsWith("scale") ? gr(t[1]) : hr : vr, br = /* @__PURE__ */ new Set([
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
function xr(e) {
	for (let t in e) if (!br.has(t)) return !0;
	return !1;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/interfaces/motion-value.mjs
var Sr = (e, t, n, r = {}, i, a) => (o) => {
	let s = mr(r, e) || {}, c = s.delay || r.delay || 0, { elapsed: l = 0 } = r;
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
	xr(s) || Object.assign(u, yr(e, u)), u.duration &&= /* @__PURE__ */ S(u.duration), u.repeatDelay &&= /* @__PURE__ */ S(u.repeatDelay), u.from !== void 0 && (u.keyframes[0] = u.from);
	let d = !1;
	if ((u.type === !1 || u.duration === 0 && !u.repeatDelay) && (Zn(u), u.delay === 0 && (d = !0)), (p.instantAnimations || p.skipAnimations || i?.shouldSkipAnimations || s.skipAnimations) && (d = !0, Zn(u), u.delay = 0), u.allowFlatten = !s.type && !s.ease, d && !a && t.get() !== void 0) {
		let e = tn(u.keyframes, s);
		if (e !== void 0) {
			T.update(() => {
				u.onUpdate(e), u.onComplete();
			});
			return;
		}
	}
	return s.isSync ? new sn(u) : new ar(u);
}, Cr = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function wr(e) {
	let t = Cr.exec(e);
	if (!t) return [,];
	let [, n, r, i] = t;
	return [`--${n ?? r}`, i];
}
var Tr = 4;
function Er(e, t, n = 1) {
	f(n <= Tr, `Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
	let [r, i] = wr(e);
	if (!r) return;
	let a = window.getComputedStyle(t).getPropertyValue(r);
	if (a) {
		let e = a.trim();
		return m(e) ? parseFloat(e) : e;
	}
	return Re(i) ? Er(i, t, n + 1) : i;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/resolve-variants.mjs
function Dr(e) {
	let t = [{}, {}];
	return e?.values.forEach((e, n) => {
		t[0][n] = e.get(), t[1][n] = e.getVelocity();
	}), t;
}
function Or(e, t, n, r) {
	if (typeof t == "function") {
		let [i, a] = Dr(r);
		t = t(n === void 0 ? e.custom : n, i, a);
	}
	if (typeof t == "string" && (t = e.variants && e.variants[t]), typeof t == "function") {
		let [i, a] = Dr(r);
		t = t(n === void 0 ? e.custom : n, i, a);
	}
	return t;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/resolve-dynamic-variants.mjs
function kr(e, t, n) {
	let r = e.getProps();
	return Or(r, t, n === void 0 ? r.custom : n, e);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/keys-position.mjs
var Ar = /* @__PURE__ */ new Set([
	"width",
	"height",
	"top",
	"left",
	"right",
	"bottom",
	...W
]), jr = (e) => Array.isArray(e);
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/setters.mjs
function Mr(e, t, n) {
	e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, Y(n));
}
function Nr(e) {
	return jr(e) ? e[e.length - 1] || 0 : e;
}
function Pr(e, t) {
	let { transitionEnd: n = {}, transition: r = {}, ...i } = kr(e, t) || {};
	i = {
		...i,
		...n
	};
	for (let t in i) Mr(e, t, Nr(i[t]));
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs
var X = (e) => !!(e && e.getVelocity);
//#endregion
//#region node_modules/motion-dom/dist/es/value/will-change/is.mjs
function Fr(e) {
	return !!(X(e) && e.add);
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/will-change/add-will-change.mjs
function Ir(e, t) {
	let n = e.getValue("willChange");
	if (Fr(n)) return n.add(t);
	if (!n && p.WillChange) {
		let n = new p.WillChange("auto");
		e.addValue("willChange", n), n.add(t);
	}
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/utils/camel-to-dash.mjs
function Lr(e) {
	return e.replace(/([A-Z])/g, (e) => `-${e.toLowerCase()}`);
}
var Rr = "data-" + Lr("framerAppearId");
//#endregion
//#region node_modules/motion-dom/dist/es/animation/optimized-appear/get-appear-id.mjs
function zr(e) {
	return e.props[Rr];
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/interfaces/visual-element-target.mjs
var Br = typeof window < "u";
function Vr({ protectedKeys: e, needsAnimating: t }, n) {
	let r = e.hasOwnProperty(n) && t[n] !== !0;
	return t[n] = !1, r;
}
function Hr(e, t, { delay: n = 0, transitionOverride: r, type: i } = {}) {
	let { transition: a, transitionEnd: o, ...s } = t, c = e.getDefaultTransition();
	a = a ? pr(a, c) : c;
	let l = a?.reduceMotion, u = a?.skipAnimations;
	r && (a = r);
	let d = [], f = i && e.animationState && e.animationState.getState()[i], p = a?.path;
	p && p.animateVisualElement(e, s, a, n, d);
	for (let t in s) {
		let r = e.getValue(t, e.latestValues[t] ?? null), i = s[t];
		if (i === void 0 || f && Vr(f, t)) continue;
		let o = {
			delay: n,
			...mr(a || {}, t)
		};
		u && (o.skipAnimations = !0);
		let c = r.get();
		if (c !== void 0 && !r.isAnimating() && !Array.isArray(i) && i === c && !o.velocity) {
			T.update(() => r.set(i));
			continue;
		}
		let p = !1;
		if (Br && window.MotionHandoffAnimation) {
			let n = zr(e);
			if (n) {
				let e = window.MotionHandoffAnimation(n, t, T);
				e !== null && (o.startTime = e, p = !0);
			}
		}
		Ir(e, t);
		let m = l ?? e.shouldReduceMotion;
		r.start(Sr(t, r, i, m && Ar.has(t) ? { type: !1 } : o, e, p));
		let h = r.animation;
		h && d.push(h);
	}
	if (o) {
		let t = () => T.update(() => {
			o && Pr(e, o);
		});
		d.length ? Promise.all(d).then(t) : t();
	}
	return d;
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/auto.mjs
var Ur = {
	test: (e) => e === "auto",
	parse: (e) => e
}, Wr = (e) => (t) => t.test(e), Gr = [
	D,
	P,
	N,
	M,
	Qe,
	Ze,
	Ur
], Kr = (e) => Gr.find(Wr(e));
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/is-none.mjs
function qr(e) {
	return typeof e == "number" ? e === 0 : e === null || e === "none" || e === "0" || g(e);
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/complex/filter.mjs
var Jr = /* @__PURE__ */ new Set([
	"brightness",
	"contrast",
	"saturate",
	"opacity"
]);
function Yr(e) {
	let [t, n] = e.slice(0, -1).split("(");
	if (t === "drop-shadow") return e;
	let [r] = n.match(He) || [];
	if (!r) return e;
	let i = n.replace(r, ""), a = +!!Jr.has(t);
	return r !== n && (a *= 100), t + "(" + a + i + ")";
}
var Xr = /\b([a-z-]*)\(.*?\)/gu, Zr = {
	...R,
	getAnimatableNone: (e) => {
		let t = e.match(Xr);
		return t ? t.map(Yr).join(" ") : e;
	}
}, Qr = {
	...R,
	getAnimatableNone: (e) => {
		let t = R.parse(e);
		return R.createTransformer(e)(t.map((e) => typeof e == "number" ? 0 : typeof e == "object" ? {
			...e,
			alpha: 1
		} : e));
	}
}, $r = {
	...D,
	transform: Math.round
}, ei = {
	borderWidth: P,
	borderTopWidth: P,
	borderRightWidth: P,
	borderBottomWidth: P,
	borderLeftWidth: P,
	borderRadius: P,
	borderTopLeftRadius: P,
	borderTopRightRadius: P,
	borderBottomRightRadius: P,
	borderBottomLeftRadius: P,
	width: P,
	maxWidth: P,
	height: P,
	maxHeight: P,
	top: P,
	right: P,
	bottom: P,
	left: P,
	inset: P,
	insetBlock: P,
	insetBlockStart: P,
	insetBlockEnd: P,
	insetInline: P,
	insetInlineStart: P,
	insetInlineEnd: P,
	padding: P,
	paddingTop: P,
	paddingRight: P,
	paddingBottom: P,
	paddingLeft: P,
	paddingBlock: P,
	paddingBlockStart: P,
	paddingBlockEnd: P,
	paddingInline: P,
	paddingInlineStart: P,
	paddingInlineEnd: P,
	margin: P,
	marginTop: P,
	marginRight: P,
	marginBottom: P,
	marginLeft: P,
	marginBlock: P,
	marginBlockStart: P,
	marginBlockEnd: P,
	marginInline: P,
	marginInlineStart: P,
	marginInlineEnd: P,
	fontSize: P,
	backgroundPositionX: P,
	backgroundPositionY: P,
	rotate: M,
	pathRotation: M,
	rotateX: M,
	rotateY: M,
	rotateZ: M,
	scale: Ve,
	scaleX: Ve,
	scaleY: Ve,
	scaleZ: Ve,
	skew: M,
	skewX: M,
	skewY: M,
	distance: P,
	translateX: P,
	translateY: P,
	translateZ: P,
	x: P,
	y: P,
	z: P,
	perspective: P,
	transformPerspective: P,
	opacity: O,
	originX: $e,
	originY: $e,
	originZ: P,
	zIndex: $r,
	fillOpacity: O,
	strokeOpacity: O,
	numOctaves: $r
}, ti = {
	...ei,
	color: I,
	backgroundColor: I,
	outlineColor: I,
	fill: I,
	stroke: I,
	borderColor: I,
	borderTopColor: I,
	borderRightColor: I,
	borderBottomColor: I,
	borderLeftColor: I,
	filter: Zr,
	WebkitFilter: Zr,
	mask: Qr,
	WebkitMask: Qr
}, ni = (e) => ti[e], ri = /*@__PURE__*/ new Set([Zr, Qr]);
function ii(e, t) {
	let n = ni(e);
	return ri.has(n) || (n = R), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/make-none-animatable.mjs
var ai = /* @__PURE__ */ new Set([
	"auto",
	"none",
	"0"
]);
function oi(e, t, n) {
	let r = 0, i;
	for (; r < e.length && !i;) {
		let t = e[r];
		typeof t == "string" && !ai.has(t) && L(t).values.length && (i = e[r]), r++;
	}
	if (i && n) for (let r of t) e[r] = ii(n, i);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/DOMKeyframesResolver.mjs
var si = class extends An {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i, !0);
	}
	readKeyframes() {
		let { unresolvedKeyframes: e, element: t, name: n } = this;
		if (!t || !t.current) return;
		super.readKeyframes();
		for (let n = 0; n < e.length; n++) {
			let r = e[n];
			if (typeof r == "string" && (r = r.trim(), Re(r))) {
				let i = Er(r, t.current);
				i !== void 0 && (e[n] = i), n === e.length - 1 && (this.finalKeyframe = r);
			}
		}
		if (this.resolveNoneKeyframes(), !Ar.has(n) || e.length !== 2) return;
		let [r, i] = e, a = Kr(r), o = Kr(i);
		if (Be(r) !== Be(i) && K[n]) {
			this.needsMeasurement = !0;
			return;
		}
		if (a !== o) {
			if (bn(a) && bn(o)) for (let t = 0; t < e.length; t++) {
				let n = e[t];
				typeof n == "string" && (e[t] = parseFloat(n));
			}
			else K[n] && (this.needsMeasurement = !0);
		}
	}
	resolveNoneKeyframes() {
		let { unresolvedKeyframes: e, name: t } = this, n = [];
		for (let t = 0; t < e.length; t++) (e[t] === null || qr(e[t])) && n.push(t);
		n.length && oi(e, n, t);
	}
	measureInitialState() {
		let { element: e, unresolvedKeyframes: t, name: n } = this;
		if (!e || !e.current) return;
		n === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = K[n](e.measureViewportBox(), window.getComputedStyle(e.current)), t[0] = this.measuredOrigin;
		let r = t[t.length - 1];
		r !== void 0 && e.getValue(n, r).jump(r, !1);
	}
	measureEndState() {
		let { element: e, name: t, unresolvedKeyframes: n } = this;
		if (!e || !e.current) return;
		let r = e.getValue(t);
		r && r.jump(this.measuredOrigin, !1);
		let i = n.length - 1, a = n[i];
		n[i] = K[t](e.measureViewportBox(), window.getComputedStyle(e.current)), a !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = a), this.removedTransforms?.length && this.removedTransforms.forEach(([t, n]) => {
			e.getValue(t).set(n);
		}), this.resolveNoneKeyframes();
	}
}, ci = [
	"borderTopLeftRadius",
	"borderTopRightRadius",
	"borderBottomRightRadius",
	"borderBottomLeftRadius"
], li = [];
function ui(e) {
	f(typeof e.test == "function" && typeof e.read == "function", "Effects passed to animate.addEffect() need test() and read().", "effect-missing-test"), di(e), li.unshift(e);
}
function di(e) {
	c(li, e);
}
function fi(e) {
	return li.find((t) => t.test(e));
}
function pi(e, t, n, r = {}) {
	let i = [];
	for (let a in n) {
		let o = n[a], s = e.get(t, a);
		if (!s) {
			let n = e.read(t, a, o) ?? mi(o);
			f(n !== void 0, `"${a}" can't be read from the animated subject. Provide [from, to] keyframes.`, "effect-unreadable-value"), s = Y(n), e(t, { [a]: s });
		}
		s.start(Sr(a, s, o, mr(r, a))), s.animation && i.push(s.animation);
	}
	return i;
}
function mi(e) {
	let t = Array.isArray(e) ? e[0] : void 0;
	return t === null ? void 0 : t;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/resolve-elements.mjs
function hi(e, t, n) {
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
//#region node_modules/motion-dom/dist/es/value/types/utils/get-as-type.mjs
var gi = (e, t) => t && typeof e == "number" ? t.transform(e) : e, { schedule: _i, cancel: vi } = /* @__PURE__ */ ke(queueMicrotask, !1);
//#endregion
//#region node_modules/motion-dom/dist/es/utils/is-svg-element.mjs
function yi(e) {
	return h(e) && "ownerSVGElement" in e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/is-svg-svg-element.mjs
function bi(e) {
	return yi(e) && e.tagName === "svg";
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/find.mjs
var xi = [
	...Gr,
	I,
	R
], Si = (e) => xi.find(Wr(e)), Ci = () => ({
	min: 0,
	max: 0
}), wi = () => ({
	x: Ci(),
	y: Ci()
}), Z = /* @__PURE__ */ new WeakMap();
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/is-animation-controls.mjs
function Ti(e) {
	return typeof e == "object" && !!e && typeof e.start == "function";
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/is-variant-label.mjs
function Ei(e) {
	return typeof e == "string" || Array.isArray(e);
}
var Di = [
	"initial",
	"animate",
	"whileInView",
	"whileFocus",
	"whileHover",
	"whileTap",
	"whileDrag",
	"exit"
];
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/is-controlling-variants.mjs
function Oi(e) {
	return Ti(e.animate) || Di.some((t) => Ei(e[t]));
}
function ki(e) {
	return !!(Oi(e) || e.variants);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/motion-values.mjs
function Ai(e, t, n) {
	for (let r in t) {
		let i = t[r], a = n[r];
		if (X(i)) e.addValue(r, i);
		else if (X(a)) e.addValue(r, Y(i, { owner: e }));
		else if (a !== i) {
			if (e.hasValue(r)) {
				let t = e.getValue(r);
				t.liveStyle === !0 ? t.jump(i) : t.hasAnimated || t.set(i);
			} else {
				let t = e.getStaticValue(r);
				e.addValue(r, Y(t === void 0 ? i : t, { owner: e }));
			}
		}
	}
	for (let r in n) t[r] === void 0 && e.removeValue(r);
	return t;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/reduced-motion/state.mjs
var ji = { current: null }, Mi = { current: !1 }, Ni = typeof window < "u";
function Pi() {
	if (Mi.current = !0, Ni) {
		if (window.matchMedia) {
			let e = window.matchMedia("(prefers-reduced-motion)"), t = () => ji.current = e.matches;
			e.addEventListener("change", t), t();
		} else ji.current = !1;
	}
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/VisualElement.mjs
var Fi = [
	"AnimationStart",
	"AnimationComplete",
	"Update",
	"BeforeLayoutMeasure",
	"LayoutMeasure",
	"LayoutAnimationStart",
	"LayoutAnimationComplete"
], Ii = {}, Li = class {
	scrapeMotionValuesFromProps(e, t, n) {
		return {};
	}
	constructor({ parent: e, props: t, presenceContext: n, reducedMotionConfig: r, skipAnimations: i, blockInitialAnimation: a, visualState: o }, s = {}) {
		this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = An, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
			this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
		}, this.renderScheduledAt = 0, this.scheduleRender = () => {
			let e = E.now();
			this.renderScheduledAt < e && (this.renderScheduledAt = e, T.render(this.render, !1, !0));
		};
		let { latestValues: c, renderState: l } = o;
		this.latestValues = c, this.baseTarget = { ...c }, this.initialValues = t.initial ? { ...c } : {}, this.renderState = l, this.parent = e, this.props = t, this.presenceContext = n, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = r, this.skipAnimationsConfig = i, this.options = s, this.blockInitialAnimation = !!a, this.isControllingVariants = Oi(t), this.isVariantNode = ki(t), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
		let { willChange: u, ...d } = this.scrapeMotionValuesFromProps(t, {}, this);
		for (let e in d) {
			let t = d[e];
			c[e] !== void 0 && X(t) && t.set(c[e]);
		}
	}
	mount(e) {
		if (this.hasBeenMounted) for (let e in this.initialValues) this.values.get(e)?.jump(this.initialValues[e]), this.latestValues[e] = this.initialValues[e];
		this.current = e, Z.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((e, t) => this.bindToMotionValue(t, e)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (Mi.current || Pi(), this.shouldReduceMotion = ji.current), process.env.NODE_ENV !== "production" && te(this.shouldReduceMotion !== !0, "You have Reduced Motion enabled on your device. Animations may not appear as expected.", "reduced-motion-disabled"), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
	}
	unmount() {
		this.projection && this.projection.unmount(), Ae(this.notifyUpdate), Ae(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
		for (let e in this.events) this.events[e].clear();
		for (let e in this.features) {
			let t = this.features[e];
			t && (t.unmount(), t.isMounted = !1);
		}
		this.current = null;
	}
	addChild(e) {
		this.children.add(e), this.enteringChildren ??= /* @__PURE__ */ new Set(), this.enteringChildren.add(e);
	}
	removeChild(e) {
		this.children.delete(e), this.enteringChildren && this.enteringChildren.delete(e);
	}
	bindToMotionValue(e, t) {
		if (this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)(), t.accelerate && Qn.has(e) && this.current instanceof HTMLElement) {
			let { factory: n, keyframes: r, times: i, ease: a, duration: o } = t.accelerate, s = new Hn({
				element: this.current,
				name: e,
				keyframes: r,
				times: i,
				ease: a,
				duration: /* @__PURE__ */ S(o)
			}), c = n(s);
			this.valueSubscriptions.set(e, () => {
				c(), s.cancel();
			});
			return;
		}
		let n = G.has(e);
		n && this.onBindTransform && this.onBindTransform();
		let r = t.on("change", (t) => {
			this.latestValues[e] = t, this.props.onUpdate && T.preRender(this.notifyUpdate), n && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
		}), i;
		typeof window < "u" && window.MotionCheckAppearSync && (i = window.MotionCheckAppearSync(this, e, t)), this.valueSubscriptions.set(e, () => {
			r(), i && i();
		});
	}
	sortNodePosition(e) {
		return !this.current || !this.sortInstanceNodePosition || this.type !== e.type ? 0 : this.sortInstanceNodePosition(this.current, e.current);
	}
	updateFeatures() {
		let e = "animation";
		for (e in Ii) {
			let t = Ii[e];
			if (!t) continue;
			let { isEnabled: n, Feature: r } = t;
			if (!this.features[e] && r && n(this.props) && (this.features[e] = new r(this)), this.features[e]) {
				let t = this.features[e];
				t.isMounted ? t.update() : (t.mount(), t.isMounted = !0);
			}
		}
	}
	triggerBuild() {
		this.build(this.renderState, this.latestValues, this.props);
	}
	measureViewportBox() {
		return this.current ? this.measureInstanceViewportBox(this.current, this.props) : wi();
	}
	getStaticValue(e) {
		return this.latestValues[e];
	}
	setStaticValue(e, t) {
		this.latestValues[e] = t;
	}
	update(e, t) {
		(e.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = e, this.prevPresenceContext = this.presenceContext, this.presenceContext = t;
		for (let t = 0; t < Fi.length; t++) {
			let n = Fi[t];
			this.propEventSubscriptions[n] && (this.propEventSubscriptions[n](), delete this.propEventSubscriptions[n]);
			let r = e["on" + n];
			r && (this.propEventSubscriptions[n] = this.on(n, r));
		}
		this.prevMotionValues = Ai(this, this.scrapeMotionValuesFromProps(e, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
	}
	getProps() {
		return this.props;
	}
	getVariant(e) {
		return this.props.variants ? this.props.variants[e] : void 0;
	}
	getDefaultTransition() {
		return this.props.transition;
	}
	getTransformPagePoint() {
		return this.props.transformPagePoint;
	}
	getClosestVariantNode() {
		return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
	}
	addVariantChild(e) {
		let t = this.getClosestVariantNode();
		if (t) return t.variantChildren && t.variantChildren.add(e), () => t.variantChildren.delete(e);
	}
	addValue(e, t) {
		let n = this.values.get(e);
		t !== n && (n && this.removeValue(e), this.bindToMotionValue(e, t), this.values.set(e, t), this.latestValues[e] = t.get());
	}
	removeValue(e) {
		this.values.delete(e);
		let t = this.valueSubscriptions.get(e);
		t && (t(), this.valueSubscriptions.delete(e)), delete this.latestValues[e], this.removeValueFromRenderState(e, this.renderState);
	}
	hasValue(e) {
		return this.values.has(e);
	}
	getValue(e, t) {
		if (this.props.values && this.props.values[e]) return this.props.values[e];
		let n = this.values.get(e);
		return n === void 0 && t !== void 0 && (n = Y(t === null ? void 0 : t, { owner: this }), this.addValue(e, n)), n;
	}
	readValue(e, t) {
		let n = this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : this.getBaseTargetFromProps(this.props, e) ?? this.readValueFromInstance(this.current, e, this.options);
		return n != null && (typeof n == "string" && (m(n) || g(n)) ? n = parseFloat(n) : !Si(n) && R.test(t) && (n = ii(e, t)), this.setBaseTarget(e, X(n) ? n.get() : n)), X(n) ? n.get() : n;
	}
	setBaseTarget(e, t) {
		this.baseTarget[e] = t;
	}
	getBaseTarget(e) {
		let { initial: t } = this.props, n;
		if (typeof t == "string" || typeof t == "object") {
			let r = Or(this.props, t, this.presenceContext?.custom);
			r && (n = r[e]);
		}
		if (t && n !== void 0) return n;
		let r = this.getBaseTargetFromProps(this.props, e);
		return r !== void 0 && !X(r) ? r : this.initialValues[e] !== void 0 && n === void 0 ? void 0 : this.baseTarget[e];
	}
	on(e, t) {
		return this.events[e] || (this.events[e] = new x()), this.events[e].add(t);
	}
	notify(e, ...t) {
		this.events[e] && this.events[e].notify(...t);
	}
	scheduleRenderMicrotask() {
		_i.render(this.render);
	}
}, Ri = class extends Li {
	constructor() {
		super(...arguments), this.KeyframeResolver = si;
	}
	sortInstanceNodePosition(e, t) {
		return e.compareDocumentPosition(t) & 2 ? 1 : -1;
	}
	getBaseTargetFromProps(e, t) {
		let n = e.style;
		return n ? n[t] : void 0;
	}
	removeValueFromRenderState(e, { vars: t, style: n }) {
		delete t[e], delete n[e];
	}
	handleChildMotionValue() {
		this.childSubscription && (this.childSubscription(), delete this.childSubscription);
		let { children: e } = this.props;
		X(e) && (this.childSubscription = e.on("change", (e) => {
			this.current && (this.current.textContent = `${e}`);
		}));
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/projection/geometry/conversion.mjs
function zi({ top: e, left: t, right: n, bottom: r }) {
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
function Bi(e, t) {
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
function Vi(e, t) {
	return zi(Bi(e.getBoundingClientRect(), t));
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/utils/build-transform.mjs
var Hi = {
	x: "translateX",
	y: "translateY",
	z: "translateZ",
	transformPerspective: "perspective"
}, Ui = W.length;
function Wi(e, t, n) {
	let r = "", i = !0;
	for (let a = 0; a < Ui; a++) {
		let o = W[a], s = e[o];
		if (s === void 0) continue;
		let c = !0;
		if (typeof s == "number") c = s === +!!o.startsWith("scale");
		else {
			let e = parseFloat(s);
			c = o.startsWith("scale") ? e === 1 : e === 0;
		}
		if (!c || n) {
			let e = gi(s, ei[o]);
			if (!c) {
				i = !1;
				let t = Hi[o] || o;
				r += `${t}(${e}) `;
			}
			n && (t[o] = e);
		}
	}
	let a = e.pathRotation;
	return a && (i = !1, r += `rotate(${gi(a, ei.pathRotation)}) `), r = r.trim(), n ? r = n(t, i ? "" : r) : i && (r = "none"), r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/utils/build-styles.mjs
function Gi(e, t, n) {
	let { style: r, vars: i, transformOrigin: a } = e, o = !1, s = !1;
	for (let e in t) {
		let n = t[e];
		if (G.has(e)) {
			o = !0;
			continue;
		}
		if (Ie(e)) {
			i[e] = n;
			continue;
		}
		{
			let t = gi(n, ei[e]);
			e.startsWith("origin") ? (s = !0, a[e] = t) : r[e] = t;
		}
	}
	if (t.transform || (o || n ? r.transform = Wi(t, e.transform, n) : r.transform &&= "none"), s) {
		let { originX: e = "50%", originY: t = "50%", originZ: n = 0 } = a;
		r.transformOrigin = `${e} ${t} ${n}`;
	}
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/utils/render.mjs
function Ki(e, { style: t, vars: n }, r, i) {
	let a = e.style, o;
	for (o in t) a[o] = t[o];
	for (o in i?.applyProjectionStyles(a, r), n) a.setProperty(o, n[o]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/styles/scale-border-radius.mjs
function qi(e, t) {
	return t.max === t.min ? 0 : e / (t.max - t.min) * 100;
}
var Ji = { correct: (e, t) => {
	if (!t.target) return e;
	if (typeof e == "string") {
		if (P.test(e)) e = parseFloat(e);
		else return e;
	}
	return `${qi(e, t.target.x)}% ${qi(e, t.target.y)}%`;
} }, Yi = { correct: (e, { treeScale: t, projectionDelta: n }) => {
	let r = e, i = R.parse(e);
	if (i.length > 5) return r;
	let a = R.createTransformer(e), o = typeof i[0] == "number" ? 0 : 1, s = n.x.scale * t.x, c = n.y.scale * t.y;
	i[0 + o] /= s, i[1 + o] /= c;
	let l = z(s, c, .5);
	return typeof i[2 + o] == "number" && (i[2 + o] /= l), typeof i[3 + o] == "number" && (i[3 + o] /= l), a(i);
} }, Xi = {
	borderRadius: {
		...Ji,
		applyTo: [...ci]
	},
	borderTopLeftRadius: Ji,
	borderTopRightRadius: Ji,
	borderBottomLeftRadius: Ji,
	borderBottomRightRadius: Ji,
	boxShadow: Yi
};
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/is-forced-motion-value.mjs
function Zi(e, { layout: t, layoutId: n }) {
	return G.has(e) || e.startsWith("origin") || (t || n !== void 0) && (!!Xi[e] || e === "opacity");
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/utils/scrape-motion-values.mjs
function Qi(e, t, n) {
	let r = e.style, i = t?.style, a = {};
	if (!r) return a;
	for (let t in r) (X(r[t]) || i && X(i[t]) || Zi(t, e) || n?.getValue(t)?.liveStyle !== void 0) && (a[t] = r[t]);
	return a;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/HTMLVisualElement.mjs
function $i(e) {
	return window.getComputedStyle(e);
}
var ea = class extends Ri {
	constructor() {
		super(...arguments), this.type = "html", this.renderInstance = Ki;
	}
	mount(e) {
		f(!!e.style, "motion.create() components must forward their ref to a HTML or SVG element", "custom-component-ref"), super.mount(e);
	}
	readValueFromInstance(e, t) {
		if (G.has(t)) return this.projection?.isProjecting ? gn(t) : vn(e, t);
		{
			let n = $i(e), r = (Ie(t) ? n.getPropertyValue(t) : n[t]) || 0;
			return typeof r == "string" ? r.trim() : r;
		}
	}
	measureInstanceViewportBox(e, { transformPagePoint: t }) {
		return Vi(e, t);
	}
	build(e, t, n) {
		Gi(e, t, n.transformTemplate);
	}
	scrapeMotionValuesFromProps(e, t, n) {
		return Qi(e, t, n);
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/render/object/ObjectVisualElement.mjs
function ta(e, t) {
	return e in t;
}
var na = class extends Li {
	constructor() {
		super(...arguments), this.type = "object";
	}
	readValueFromInstance(e, t) {
		if (ta(t, e)) {
			let n = e[t];
			if (typeof n == "string" || typeof n == "number") return n;
		}
	}
	getBaseTargetFromProps() {}
	removeValueFromRenderState(e, t) {
		delete t.output[e];
	}
	measureInstanceViewportBox() {
		return wi();
	}
	build(e, t) {
		Object.assign(e.output, t);
	}
	renderInstance(e, { output: t }) {
		Object.assign(e, t);
	}
	sortInstanceNodePosition() {
		return 0;
	}
}, ra = {
	offset: "stroke-dashoffset",
	array: "stroke-dasharray"
}, ia = {
	offset: "strokeDashoffset",
	array: "strokeDasharray"
};
function aa(e, t, n = 1, r = 0, i = !0) {
	e.pathLength = 1;
	let a = i ? ra : ia;
	e[a.offset] = `${-r}`, e[a.array] = `${t} ${n}`;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/build-attrs.mjs
var oa = [
	"transform",
	"opacity",
	"offsetDistance",
	"offsetPath",
	"offsetRotate",
	"offsetAnchor"
];
function sa(e, { attrX: t, attrY: n, attrScale: r, pathLength: i, pathSpacing: a = 1, pathOffset: o = 0, ...s }, c, l, u) {
	if (Gi(e, s, l), c) {
		e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
		return;
	}
	e.attrs = e.style, e.style = {};
	let { attrs: d, style: f } = e;
	for (let e of oa) d[e] !== void 0 && (f[e] = d[e], delete d[e]);
	(f.transform || d.transformOrigin) && (f.transformOrigin = d.transformOrigin ?? "50% 50%", delete d.transformOrigin), f.transform && (f.transformBox = u?.transformBox ?? "fill-box", delete d.transformBox), t !== void 0 && (d.x = t), n !== void 0 && (d.y = n), r !== void 0 && (d.scale = r), i !== void 0 && aa(d, i, a, o, !1);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/camel-case-attrs.mjs
var ca = /* @__PURE__ */ new Set([
	"baseFrequency",
	"diffuseConstant",
	"kernelMatrix",
	"kernelUnitLength",
	"keySplines",
	"keyTimes",
	"limitingConeAngle",
	"markerHeight",
	"markerWidth",
	"numOctaves",
	"targetX",
	"targetY",
	"surfaceScale",
	"specularConstant",
	"specularExponent",
	"stdDeviation",
	"tableValues",
	"viewBox",
	"gradientTransform",
	"pathLength",
	"startOffset",
	"textLength",
	"lengthAdjust"
]), la = (e) => typeof e == "string" && e.toLowerCase() === "svg";
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/render.mjs
function ua(e, t, n, r) {
	Ki(e, t, void 0, r);
	for (let n in t.attrs) e.setAttribute(ca.has(n) ? n : Lr(n), t.attrs[n]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/scrape-motion-values.mjs
function da(e, t, n) {
	let r = Qi(e, t, n);
	for (let n in e) if (X(e[n]) || X(t[n])) {
		let t = W.indexOf(n) === -1 ? n : "attr" + n.charAt(0).toUpperCase() + n.substring(1);
		r[t] = e[n];
	}
	return r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/SVGVisualElement.mjs
var fa = class extends Ri {
	constructor() {
		super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = wi;
	}
	getBaseTargetFromProps(e, t) {
		return e[t];
	}
	readValueFromInstance(e, t) {
		if (G.has(t)) {
			let e = ni(t);
			return e && e.default || 0;
		}
		if (oa.includes(t)) {
			let n = getComputedStyle(e)[t];
			if (typeof n == "string" && n) return n.trim();
		}
		return t = ca.has(t) ? t : Lr(t), e.getAttribute(t);
	}
	scrapeMotionValuesFromProps(e, t, n) {
		return da(e, t, n);
	}
	build(e, t, n) {
		sa(e, t, this.isSVGTag, n.transformTemplate, n.style);
	}
	renderInstance(e, t, n, r) {
		ua(e, t, n, r);
	}
	mount(e) {
		this.isSVGTag = la(e.tagName), super.mount(e);
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/animate/single-value.mjs
function pa(e, t, n) {
	let r = X(e) ? e : Y(e);
	return r.start(Sr("", r, t, n)), r.animation;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/utils/is-dom-keyframes.mjs
function ma(e) {
	return typeof e == "object" && !Array.isArray(e);
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/resolve-subjects.mjs
function ha(e, t, n, r) {
	return e == null ? [] : typeof e == "string" && ma(t) ? hi(e, n, r) : e instanceof NodeList ? Array.from(e) : Array.isArray(e) ? e.filter((e) => e != null) : [e];
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/calc-repeat-duration.mjs
function ga(e, t, n) {
	return e * (t + 1) + n * t;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/calc-time.mjs
function _a(e, t, n, r) {
	return typeof t == "number" ? t : t.startsWith("-") || t.startsWith("+") ? Math.max(0, e + parseFloat(t)) : t === "<" ? n : t.startsWith("<") ? Math.max(0, n + parseFloat(t.slice(1))) : r.get(t) ?? e;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/edit.mjs
function va(e, t, n) {
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		i.at > t && i.at < n && (c(e, i), r--);
	}
}
function ya(e, t, n, r, i, a) {
	va(e, i, a);
	for (let o = 0; o < t.length; o++) e.push({
		value: t[o],
		at: z(i, a, r[o]),
		easing: /* @__PURE__ */ xe(n, o)
	});
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/normalize-times.mjs
function ba(e, t, n = 0) {
	let r = t + 1 + t * n;
	for (let t = 0; t < e.length; t++) e[t] = e[t] / r;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/sort.mjs
function xa(e, t) {
	return e.at === t.at ? e.value === null ? 1 : t.value === null ? -1 : 0 : e.at - t.at;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/create.mjs
var Sa = "easeInOut", Ca = 20;
function wa(e, { defaultTransition: t = {}, ...n } = {}, r, i) {
	let a = t.duration || .3, o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), c = {}, l = /* @__PURE__ */ new Map(), u = 0, f = 0, p = 0;
	for (let n = 0; n < e.length; n++) {
		let o = e[n];
		if (typeof o == "string") {
			l.set(o, f);
			continue;
		}
		if (!Array.isArray(o)) {
			l.set(o.name, _a(f, o.at, u, l));
			continue;
		}
		let [m, h, g = {}] = o;
		g.at !== void 0 && (f = _a(f, g.at, u, l));
		let _ = 0, v = (e, n, r, o = 0, s = 0) => {
			let c = Da(e), { delay: l = 0, times: u = Yt(c), type: m = t.type || "keyframes", repeat: h, repeatType: g, repeatDelay: v = 0, ...y } = n, { ease: b = t.ease || "easeOut", duration: x } = n, C = typeof l == "function" ? l(o, s) : l, w = c.length, ee = Bn(m) ? m : i?.[m || "keyframes"];
			if (w <= 2 && ee) {
				let e = 100;
				if (w === 2 && Aa(c)) {
					let t = c[1] - c[0];
					e = Math.abs(t);
				}
				let n = {
					...t,
					...y
				};
				x !== void 0 && (n.duration = /* @__PURE__ */ S(x));
				let r = Ft(n, e, ee);
				b = r.ease, x = r.duration;
			}
			x ??= a;
			let te = f + C;
			u.length === 1 && u[0] === 0 && (u[1] = 1);
			let ne = u.length - c.length;
			if (ne > 0 && Jt(u, ne), c.length === 1 && c.unshift(null), h && d(h < Ca, `Sequence segments can't repeat ${h} times — ignoring repeat option. Use a value below ${Ca} or apply repeat at the sequence level instead.`), h && h < Ca) {
				let e = x > 0 ? v / x : 0;
				x = ga(x, h, v);
				let t = [...c], n = [...u];
				b = Array.isArray(b) ? [...b] : [b];
				let r = [...b], i = g === "reverse" || g === "mirror", a = t, o = r;
				i && (a = [...t].reverse(), g === "reverse" && (o = [...r].reverse().map((e) => typeof e == "function" ? /* @__PURE__ */ le(e) : e)));
				for (let s = 0; s < h; s++) {
					let l = i && s % 2 == 0, d = l ? a : t, f = l ? o : r, p = (s + 1) * (1 + e);
					e > 0 && (c.push(c[c.length - 1]), u.push(p), b.push("linear")), c.push(...d);
					for (let e = 0; e < d.length; e++) u.push(n[e] + p), b.push(e === 0 ? "linear" : /* @__PURE__ */ xe(f, e - 1));
				}
				ba(u, h, e);
			}
			let re = te + x;
			ya(r, c, b, u, te, re), _ = Math.max(C + x, _), p = Math.max(re, p);
		};
		if (X(m)) {
			let e = Ta(m, s);
			v(h, g, Ea("default", e));
		} else {
			let e = ha(m, h, r, c), t = e.length;
			for (let n = 0; n < t; n++) {
				h = h, g = g;
				let r = e[n], i = Ta(r, s);
				for (let e in h) v(h[e], Oa(g, e), Ea(e, i), n, t);
			}
		}
		u = f, f += _;
	}
	return s.forEach((e, r) => {
		for (let i in e) {
			let a = e[i];
			a.sort(xa);
			let s = [], c = [], l = [];
			for (let e = 0; e < a.length; e++) {
				let { at: t, value: n, easing: r } = a[e];
				s.push(n), c.push(/* @__PURE__ */ b(0, p, t)), l.push(r || "easeOut");
			}
			c[0] !== 0 && (c.unshift(0), s.unshift(s[0]), l.unshift(Sa)), c[c.length - 1] !== 1 && (c.push(1), s.push(null)), o.has(r) || o.set(r, {
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
function Ta(e, t) {
	return !t.has(e) && t.set(e, {}), t.get(e);
}
function Ea(e, t) {
	return t[e] || (t[e] = []), t[e];
}
function Da(e) {
	return Array.isArray(e) ? e : [e];
}
function Oa(e, t) {
	return e && e[t] ? {
		...e,
		...e[t]
	} : { ...e };
}
var ka = (e) => typeof e == "number", Aa = (e) => e.every(ka);
//#endregion
//#region node_modules/framer-motion/dist/es/animation/utils/create-visual-element.mjs
function ja(e) {
	let t = {
		presenceContext: null,
		props: {},
		visualState: {
			renderState: {
				transform: {},
				transformOrigin: {},
				style: {},
				vars: {},
				attrs: {}
			},
			latestValues: {}
		}
	}, n = yi(e) && !bi(e) ? new fa(t) : new ea(t);
	n.mount(e), Z.set(e, n);
}
function Ma(e) {
	let t = new na({
		presenceContext: null,
		props: {},
		visualState: {
			renderState: { output: {} },
			latestValues: {}
		}
	});
	t.mount(e), Z.set(e, t);
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/subject.mjs
function Na(e, t) {
	return X(e) || typeof e == "number" || typeof e == "string" && !ma(t);
}
function Pa(e, t, n, r) {
	let i = [];
	if (Na(e, t)) i.push(pa(e, ma(t) && t.default || t, n && (n.default || n)));
	else {
		if (e == null) return i;
		let a = ha(e, t, r), o = a.length;
		f(!!o, "No valid elements provided.", "no-valid-elements");
		for (let e = 0; e < o; e++) {
			let r = a[e], s = { ...n };
			"delay" in s && typeof s.delay == "function" && (s.delay = s.delay(e, o));
			let c = r instanceof Element, l = c ? void 0 : fi(r);
			if (l) {
				i.push(...pi(l, r, t, s));
				continue;
			}
			let u = c ? ja : Ma;
			Z.has(r) || u(r);
			let d = Z.get(r);
			i.push(...Hr(d, {
				...t,
				transition: s
			}, {}));
		}
	}
	return i;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/sequence.mjs
function Fa(e, t, n) {
	let r = [];
	return wa(e.map((e) => {
		if (Array.isArray(e) && typeof e[0] == "function") {
			let t = e[0], n = Y(0);
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
	}), t, n, { spring: V }).forEach(({ keyframes: e, transition: t }, n) => {
		r.push(...Pa(n, e, t));
	}), r;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/index.mjs
function Ia(e) {
	return Array.isArray(e) && e.some(Array.isArray);
}
function La(e = {}) {
	let { scope: t, reduceMotion: n, skipAnimations: r } = e;
	function i(e, i, a) {
		let o = [], s, l = {};
		if (n !== void 0 && (l.reduceMotion = n), r !== void 0 && (l.skipAnimations = r), Ia(e)) {
			let { onComplete: n, ...r } = i || {};
			typeof n == "function" && (s = n), o = Fa(e, {
				...l,
				...r
			}, t);
		} else {
			let { onComplete: n, ...r } = a || {};
			typeof n == "function" && (s = n), o = Pa(e, i, {
				...l,
				...r
			}, t);
		}
		let u = new cr(o);
		return s && u.finished.then(s), t && (t.animations.push(u), u.finished.then(() => {
			c(t.animations, u);
		})), u;
	}
	return i;
}
var Ra = Object.assign(La(), {
	addEffect: ui,
	removeEffect: di
}), za = class {
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
		return this.#u = Ra(e, this.#t, {
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
}, Ba = "trans\n", Va = "tsy nm:", Ha = class e {
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
		let f = new za(r).to(i, d).onUpdate((e) => o(e));
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
				let h = new za(r).to(p, d);
				this.setTwProp(h, t), m.chain(h), m = h;
			}
			a.debugLog && console.groupEnd();
		}
		m.onComplete(() => {
			let t = this.#e[e];
			t?.tw && (delete this.#e[e], t.tw = void 0, f.stop(), t.onEnd?.(), s(), $.notifyEndProc(Va + e));
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
		return $.beginProc(Ba, t, !0, i(e, "canskip", !0) ? t : void 0), !0;
	}
	static stopEndTrans() {
		this.#e[Ba]?.tw?.stop().end();
	}
	static stopTsyByLayer(e) {
		for (let [t, n] of Object.entries(this.#e)) n.layer && e.includes(n.layer) && (n.tw?.kill(), delete this.#e[t]);
	}
	static wait_tsy(e) {
		let t = this.#a(e), n = this.#e[t]?.tw;
		if (!n) return !1;
		let r = () => n.end();
		return $.beginProc(Va + t, r, !0, i(e, "canskip", !0) ? r : void 0), !0;
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
		new Wa();
	}
	endProc() {
		new Ua();
	}
	l(e) {
		if (!$.tagL_enabled) return !1;
		if (t.recodePage(!0), $.auto_enabled) return e.time = Number($.val.getVal(`sys:sn.auto.msecLineWait${$.scrItr.isKidoku ? "_Kidoku" : ""}`)), this.wait(e);
		if ($.skip_enabled) {
			if (!$.skip_all && !$.scrItr.isNextKidoku) $.cancelAutoSkip();
			else if ("ps".includes(String($.val.getVal("sys:sn.skip.mode")))) return e.time = 50, this.wait(e);
		}
		return i(e, "visible", !0) && ($.layMng.breakLine(e), $.goTxt()), new Ga(e), !0;
	}
	p(e) {
		if (t.recodePage(), $.auto_enabled) return e.time = Number($.val.getVal(`sys:sn.auto.msecPageWait${$.scrItr.isKidoku ? "_Kidoku" : ""}`)), this.wait(e);
		if ($.skip_enabled) {
			if (!$.skip_all && !$.scrItr.isNextKidoku) $.cancelAutoSkip();
			else if (String($.val.getVal("sys:sn.skip.mode")) === "s") return e.time = 50, this.wait(e);
		}
		return i(e, "visible", !0) && ($.layMng.breakPage(e), $.goTxt()), new Ga(e), !0;
	}
	s(e) {
		return t.recodePage(), $.cancelAutoSkip(), new Ga(e), !0;
	}
	wait(e) {
		let r = n(e, "time", NaN);
		if ($.skip_enabled) return !$.skip_all && !$.scrItr.isNextKidoku && $.cancelAutoSkip(), !1;
		let a = new za({ v: 0 }), o = "wait", s = () => {
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
}, Ua = class extends Q {
	constructor() {
		super(), a.debugLog && console.log("📖 => %cReadingState_go", "color:#3B0;"), $.main.resume();
	}
	fire(e, t) {}
}, Wa = class extends Q {
	constructor() {
		super(), a.debugLog && console.log("📖 => %cReadingState_proc", "color:#3B0;");
	}
}, Ga = class extends Q {
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
					i(e, "er", !1) && $.hTag.er(e), new Ua();
				};
				break;
			default: t = () => new Ua();
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
		return Ka.go(e);
	}
}, Ka = class e extends Q {
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
		return this.#e ? Q.posPage === Q.lenPage - 1 ? (this.#t(), new Ua().l(e)) : (i(e, "visible", !0) && $.layMng.breakLine(e), $.layMng.setAllStyle2TxtLay(Q.styPaging), $.goTxt(), Q.aPage[Q.posPage]?.week ? (Q.waitRsvEvent4Paging(), !0) : !1) : super.l(e);
	}
	p(e) {
		return this.#e ? Q.posPage === Q.lenPage - 1 ? (this.#t(), new Ua().p(e)) : (i(e, "visible", !0) && $.layMng.breakPage(e), $.layMng.setAllStyle2TxtLay(Q.styPaging), $.goTxt(), Q.waitRsvEvent4Paging(), !0) : super.p(e);
	}
	s(e) {
		return new Ga(e), !0;
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
		}), t.l = (e) => Q.rs.l(e), t.p = (e) => Q.rs.p(e), t.s = (e) => Q.rs.s(e), t.wait = (e) => Q.rs.wait(e), t.waitclick = (e) => Q.rs.s(e), t.page = (e) => Q.rs.page(e), new Wa(), t.jump({ fn: "main" });
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
export { za as a, Ba as i, Q as n, Ha as r, $ as t };

//# sourceMappingURL=Reading.js.map