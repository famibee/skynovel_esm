import { i as e, m as t, n, o as r, r as i, s as a, t as o } from "./CmnLib.js";
import { _ as s, m as c } from "./pixi.js";
import { t as l } from "./EventListenerCtn.js";
import { n as u } from "./ConfigBase.js";
import { t as d } from "./SysBase.js";
import { n as f, t as p } from "./Reading.js";
import { Button as m } from "./Button.js";
import { TxtLayer as h } from "./TxtLayer.js";
//#region src/sn/FocusMng.ts
var g = class {
	#e = [];
	#t = -1;
	#n = new l();
	constructor(e, t) {
		this.#a = t.isApp ? () => e.focus() : () => globalThis.focus();
	}
	destroy() {
		this.#e = [], this.#t = -1, this.#n.clear();
	}
	add(t, n, r) {
		if (this.#e.findIndex((e) => e.btn === t) >= 0) return;
		let i = () => {
			for (let e = this.#e.length - 1; e >= 0; --e) if (this.#e[e].btn === t) {
				this.#t = e;
				return;
			}
			this.#t = -1;
		};
		if (t instanceof c) {
			t.on("pointerdown", i), this.#e.push({
				btn: t,
				on: n,
				off: r,
				offEvt: () => {
					t.off("pointerdown", i);
				}
			});
			return;
		}
		let a = this.#n.add(t, "focus", i), o = (e) => {}, s = t.localName === "button" || t.localName === "a" ? (e) => !e.isTrusted && e.key === "Enter" : (e) => e.key === "Enter", l = t;
		switch (l.type ?? "") {
			case "checkbox":
				o = () => {
					l.checked = !l.checked;
				};
				break;
			case "":
				t.querySelectorAll("input[type]").length > 0 && (o = (e) => this.#r(t, e.key), s = () => !1);
				break;
			case "range":
				o = (e) => {
					e.isTrusted || (e.key === "ArrowUp" ? l.stepUp() : l.stepDown());
				};
				break;
			case "text":
			case "textarea": o = (e) => {
				if (e.isTrusted) return;
				let t = (l.selectionStart ?? 0) + (e.key === "ArrowUp" ? -1 : 1);
				t < 0 && (t = 0), l.setSelectionRange(t, t);
			};
		}
		let u = this.#n.add(t, e, (e) => {
			if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "Enter") {
				if (e.stopImmediatePropagation(), s(e)) {
					t.dispatchEvent(new MouseEvent("click"));
					return;
				}
				o(e);
			}
		}, { passive: !0 });
		t.hasAttribute("tabindex") || (t.tabIndex = 0), this.#e.push({
			btn: t,
			on: n,
			off: r,
			offEvt: () => {
				a(), u();
			}
		});
	}
	remove(e) {
		let t = this.#e.findIndex((t) => t.btn === e);
		t < 0 || (this.#e[t].offEvt(), this.#e.splice(t, 1), this.#e.length === 0 ? this.#t = -1 : t <= this.#t && --this.#t);
	}
	#r(e, t) {
		let n = e.querySelectorAll("input[type]"), r = n.length;
		for (let e = 0; e < r; ++e) if (n[e].checked) {
			n[(e + r + (t === "ArrowUp" ? -1 : 1)) % r].checked = !0;
			break;
		}
	}
	isFocus(e) {
		return this.#t < 0 ? !1 : this.#e[this.#t].btn === e;
	}
	prev() {
		this.#o();
		let e = this.#e.length;
		if (e !== 0) {
			--this.#t < 0 && (this.#t = e - 1);
			for (let t = e; t >= 1; --t) {
				let n = (this.#t + t) % e;
				if (this.#e[n].on()) {
					this.#t = n, this.#i(n);
					return;
				}
			}
			this.#t = -1;
		}
	}
	next() {
		this.#o();
		let e = this.#e.length;
		if (e !== 0) {
			++this.#t >= e && (this.#t = 0);
			for (let t = 0; t < e; ++t) {
				let n = (this.#t + t) % e;
				if (this.#e[n].on()) {
					this.#t = n, this.#i(n);
					return;
				}
			}
			this.#t = -1;
		}
	}
	#i = o.debugLog ? (e) => console.log(`👾 <FocusMng idx:${String(e)} btn:%o`, this.#e[e].btn) : () => {};
	getFocus() {
		if (this.#t < 0) return null;
		if (this.#o(), this.#e.length === 0) return this.#t = -1, null;
		this.#t >= this.#e.length && (this.#t = 0);
		let e = this.#e[this.#t];
		return e.on() ? e.btn : null;
	}
	blur() {
		this.#o(), this.#t = -1, this.#a();
	}
	#a = () => {};
	#o() {
		for (let e = this.#e.length - 1; e >= 0; --e) {
			let t = this.#e[e];
			if (this.#s(t.btn)) {
				t.off();
				continue;
			}
			t.offEvt(), this.#e.splice(e, 1);
		}
	}
	#s(e) {
		return e instanceof c ? !!e.parent : e.isConnected && !!e.ownerDocument.defaultView;
	}
}, _ = [
	"",
	"ArrowUp",
	"",
	"ArrowLeft",
	"",
	"ArrowRight",
	"",
	"ArrowDown",
	""
], v = .3, y = .2;
function b(e, t, n) {
	let r = Math.abs(e) < n ? 0 : Math.sign(e);
	return _[((Math.abs(t) < n ? 0 : Math.sign(t)) + 1) * 3 + (r + 1)] ?? "";
}
var x = class {
	fcs;
	constructor(e) {
		this.fcs = e;
	}
	start() {
		this.#e >= 0 || (this.#e = requestAnimationFrame(this.#t));
	}
	stop() {
		this.#e < 0 || (cancelAnimationFrame(this.#e), this.#e = -1, this.#n.clear(), this.#r.clear());
	}
	#e = -1;
	#t = () => {
		if (this.#e = requestAnimationFrame(this.#t), document.hasFocus()) for (let e of navigator.getGamepads()) e && (this.#i(e), this.#a(e));
	};
	#n = /* @__PURE__ */ new Map();
	#r = /* @__PURE__ */ new Map();
	#i(t) {
		let n = this.#n.get(t.index) ?? "", r = b(t.axes[0] ?? 0, t.axes[1] ?? 0, n ? y : v);
		if (r === n || (this.#n.set(t.index, r), !r)) return;
		let i = this.fcs.getFocus();
		(!i || i instanceof c ? globalThis : i).dispatchEvent(new KeyboardEvent(e, {
			key: r,
			bubbles: !0
		})), !(!i || i instanceof c) && (p.cancelAutoSkip(), i.getAttribute("type") === "range" && i.dispatchEvent(new InputEvent("input", { bubbles: !0 })));
	}
	#a(e) {
		let t = this.#r.get(e.index) ?? [], n = e.buttons.map((e) => e.pressed);
		this.#r.set(e.index, n);
		for (let e = 0; e < n.length; ++e) n[e] && !t[e] && this.#o(e);
	}
	#o(t) {
		if (t % 2 == 0) {
			p.cancelAutoSkip();
			let t = this.fcs.getFocus();
			(!t || t instanceof c ? document.body : t).dispatchEvent(new KeyboardEvent(e, {
				key: "Enter",
				bubbles: !0
			}));
			return;
		}
		p.fire("middleclick", new Event("gamepad:button"), !0);
	}
}, S = "bottom", C = "right", w = "left", T = "auto", E = [
	"top",
	S,
	C,
	w
], D = "start", O = "clippingParents", k = "viewport", A = "popper", j = "reference", M = /*#__PURE__*/ E.reduce(function(e, t) {
	return e.concat([t + "-" + D, t + "-end"]);
}, []), N = /*#__PURE__*/ [].concat(E, [T]).reduce(function(e, t) {
	return e.concat([
		t,
		t + "-" + D,
		t + "-end"
	]);
}, []), P = [
	"beforeRead",
	"read",
	"afterRead",
	"beforeMain",
	"main",
	"afterMain",
	"beforeWrite",
	"write",
	"afterWrite"
];
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function F(e) {
	return e ? (e.nodeName || "").toLowerCase() : null;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function I(e) {
	if (e == null) return window;
	if (e.toString() !== "[object Window]") {
		var t = e.ownerDocument;
		return t && t.defaultView || window;
	}
	return e;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function L(e) {
	return e instanceof I(e).Element || e instanceof Element;
}
function R(e) {
	return e instanceof I(e).HTMLElement || e instanceof HTMLElement;
}
function z(e) {
	return typeof ShadowRoot > "u" ? !1 : e instanceof I(e).ShadowRoot || e instanceof ShadowRoot;
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function ee(e) {
	var t = e.state;
	Object.keys(t.elements).forEach(function(e) {
		var n = t.styles[e] || {}, r = t.attributes[e] || {}, i = t.elements[e];
		!R(i) || !F(i) || (Object.assign(i.style, n), Object.keys(r).forEach(function(e) {
			var t = r[e];
			t === !1 ? i.removeAttribute(e) : i.setAttribute(e, t === !0 ? "" : t);
		}));
	});
}
function B(e) {
	var t = e.state, n = {
		popper: {
			position: t.options.strategy,
			left: "0",
			top: "0",
			margin: "0"
		},
		arrow: { position: "absolute" },
		reference: {}
	};
	return Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow), function() {
		Object.keys(t.elements).forEach(function(e) {
			var r = t.elements[e], i = t.attributes[e] || {}, a = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]).reduce(function(e, t) {
				return e[t] = "", e;
			}, {});
			!R(r) || !F(r) || (Object.assign(r.style, a), Object.keys(i).forEach(function(e) {
				r.removeAttribute(e);
			}));
		});
	};
}
var te = {
	name: "applyStyles",
	enabled: !0,
	phase: "write",
	fn: ee,
	effect: B,
	requires: ["computeStyles"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function V(e) {
	return e.split("-")[0];
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/math.js
var H = Math.max, ne = Math.min, U = Math.round;
//#endregion
//#region node_modules/@popperjs/core/lib/utils/userAgent.js
function re() {
	var e = navigator.userAgentData;
	return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(e) {
		return e.brand + "/" + e.version;
	}).join(" ") : navigator.userAgent;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js
function ie() {
	return !/^((?!chrome|android).)*safari/i.test(re());
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function W(e, t, n) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	var r = e.getBoundingClientRect(), i = 1, a = 1;
	t && R(e) && (i = e.offsetWidth > 0 && U(r.width) / e.offsetWidth || 1, a = e.offsetHeight > 0 && U(r.height) / e.offsetHeight || 1);
	var o = (L(e) ? I(e) : window).visualViewport, s = !ie() && n, c = (r.left + (s && o ? o.offsetLeft : 0)) / i, l = (r.top + (s && o ? o.offsetTop : 0)) / a, u = r.width / i, d = r.height / a;
	return {
		width: u,
		height: d,
		top: l,
		right: c + u,
		bottom: l + d,
		left: c,
		x: c,
		y: l
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function ae(e) {
	var t = W(e), n = e.offsetWidth, r = e.offsetHeight;
	return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
		x: e.offsetLeft,
		y: e.offsetTop,
		width: n,
		height: r
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/contains.js
function oe(e, t) {
	var n = t.getRootNode && t.getRootNode();
	if (e.contains(t)) return !0;
	if (n && z(n)) {
		var r = t;
		do {
			if (r && e.isSameNode(r)) return !0;
			r = r.parentNode || r.host;
		} while (r);
	}
	return !1;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function G(e) {
	return I(e).getComputedStyle(e);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function se(e) {
	return [
		"table",
		"td",
		"th"
	].indexOf(F(e)) >= 0;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function K(e) {
	return ((L(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function q(e) {
	return F(e) === "html" ? e : e.assignedSlot || e.parentNode || (z(e) ? e.host : null) || K(e);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function ce(e) {
	return !R(e) || G(e).position === "fixed" ? null : e.offsetParent;
}
function le(e) {
	var t = /firefox/i.test(re());
	if (/Trident/i.test(re()) && R(e) && G(e).position === "fixed") return null;
	var n = q(e);
	for (z(n) && (n = n.host); R(n) && ["html", "body"].indexOf(F(n)) < 0;) {
		var r = G(n);
		if (r.transform !== "none" || r.perspective !== "none" || r.contain === "paint" || ["transform", "perspective"].indexOf(r.willChange) !== -1 || t && r.willChange === "filter" || t && r.filter && r.filter !== "none") return n;
		n = n.parentNode;
	}
	return null;
}
function J(e) {
	for (var t = I(e), n = ce(e); n && se(n) && G(n).position === "static";) n = ce(n);
	return n && (F(n) === "html" || F(n) === "body" && G(n).position === "static") ? t : n || le(e) || t;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function ue(e) {
	return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/within.js
function Y(e, t, n) {
	return H(e, ne(t, n));
}
function de(e, t, n) {
	var r = Y(e, t, n);
	return r > n ? n : r;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function fe() {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function pe(e) {
	return Object.assign({}, fe(), e);
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function me(e, t) {
	return t.reduce(function(t, n) {
		return t[n] = e, t;
	}, {});
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/arrow.js
var he = function(e, t) {
	return e = typeof e == "function" ? e(Object.assign({}, t.rects, { placement: t.placement })) : e, pe(typeof e == "number" ? me(e, E) : e);
};
function X(e) {
	var t, n = e.state, r = e.name, i = e.options, a = n.elements.arrow, o = n.modifiersData.popperOffsets, s = V(n.placement), c = ue(s), l = ["left", "right"].indexOf(s) >= 0 ? "height" : "width";
	if (!(!a || !o)) {
		var u = he(i.padding, n), d = ae(a), f = c === "y" ? "top" : w, p = c === "y" ? S : C, m = n.rects.reference[l] + n.rects.reference[c] - o[c] - n.rects.popper[l], h = o[c] - n.rects.reference[c], g = J(a), _ = g ? c === "y" ? g.clientHeight || 0 : g.clientWidth || 0 : 0, v = m / 2 - h / 2, y = u[f], b = _ - d[l] - u[p], x = _ / 2 - d[l] / 2 + v, T = Y(y, x, b), E = c;
		n.modifiersData[r] = (t = {}, t[E] = T, t.centerOffset = T - x, t);
	}
}
function ge(e) {
	var t = e.state, n = e.options.element, r = n === void 0 ? "[data-popper-arrow]" : n;
	r != null && (typeof r == "string" && (r = t.elements.popper.querySelector(r), !r) || oe(t.elements.popper, r) && (t.elements.arrow = r));
}
var _e = {
	name: "arrow",
	enabled: !0,
	phase: "main",
	fn: X,
	effect: ge,
	requires: ["popperOffsets"],
	requiresIfExists: ["preventOverflow"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getVariation.js
function Z(e) {
	return e.split("-")[1];
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var ve = {
	top: "auto",
	right: "auto",
	bottom: "auto",
	left: "auto"
};
function ye(e, t) {
	var n = e.x, r = e.y, i = t.devicePixelRatio || 1;
	return {
		x: U(n * i) / i || 0,
		y: U(r * i) / i || 0
	};
}
function be(e) {
	var t, n = e.popper, r = e.popperRect, i = e.placement, a = e.variation, o = e.offsets, s = e.position, c = e.gpuAcceleration, l = e.adaptive, u = e.roundOffsets, d = e.isFixed, f = o.x, p = f === void 0 ? 0 : f, m = o.y, h = m === void 0 ? 0 : m, g = typeof u == "function" ? u({
		x: p,
		y: h
	}) : {
		x: p,
		y: h
	};
	p = g.x, h = g.y;
	var _ = o.hasOwnProperty("x"), v = o.hasOwnProperty("y"), y = w, b = "top", x = window;
	if (l) {
		var T = J(n), E = "clientHeight", D = "clientWidth";
		if (T === I(n) && (T = K(n), G(T).position !== "static" && s === "absolute" && (E = "scrollHeight", D = "scrollWidth")), T = T, i === "top" || (i === "left" || i === "right") && a === "end") {
			b = S;
			var O = d && T === x && x.visualViewport ? x.visualViewport.height : T[E];
			h -= O - r.height, h *= c ? 1 : -1;
		}
		if (i === "left" || (i === "top" || i === "bottom") && a === "end") {
			y = C;
			var k = d && T === x && x.visualViewport ? x.visualViewport.width : T[D];
			p -= k - r.width, p *= c ? 1 : -1;
		}
	}
	var A = Object.assign({ position: s }, l && ve), j = u === !0 ? ye({
		x: p,
		y: h
	}, I(n)) : {
		x: p,
		y: h
	};
	if (p = j.x, h = j.y, c) {
		var M;
		return Object.assign({}, A, (M = {}, M[b] = v ? "0" : "", M[y] = _ ? "0" : "", M.transform = (x.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + h + "px)" : "translate3d(" + p + "px, " + h + "px, 0)", M));
	}
	return Object.assign({}, A, (t = {}, t[b] = v ? h + "px" : "", t[y] = _ ? p + "px" : "", t.transform = "", t));
}
function xe(e) {
	var t = e.state, n = e.options, r = n.gpuAcceleration, i = r === void 0 || r, a = n.adaptive, o = a === void 0 || a, s = n.roundOffsets, c = s === void 0 || s, l = {
		placement: V(t.placement),
		variation: Z(t.placement),
		popper: t.elements.popper,
		popperRect: t.rects.popper,
		gpuAcceleration: i,
		isFixed: t.options.strategy === "fixed"
	};
	t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, be(Object.assign({}, l, {
		offsets: t.modifiersData.popperOffsets,
		position: t.options.strategy,
		adaptive: o,
		roundOffsets: c
	})))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, be(Object.assign({}, l, {
		offsets: t.modifiersData.arrow,
		position: "absolute",
		adaptive: !1,
		roundOffsets: c
	})))), t.attributes.popper = Object.assign({}, t.attributes.popper, { "data-popper-placement": t.placement });
}
var Se = {
	name: "computeStyles",
	enabled: !0,
	phase: "beforeWrite",
	fn: xe,
	data: {}
}, Q = { passive: !0 };
function Ce(e) {
	var t = e.state, n = e.instance, r = e.options, i = r.scroll, a = i === void 0 || i, o = r.resize, s = o === void 0 || o, c = I(t.elements.popper), l = [].concat(t.scrollParents.reference, t.scrollParents.popper);
	return a && l.forEach(function(e) {
		e.addEventListener("scroll", n.update, Q);
	}), s && c.addEventListener("resize", n.update, Q), function() {
		a && l.forEach(function(e) {
			e.removeEventListener("scroll", n.update, Q);
		}), s && c.removeEventListener("resize", n.update, Q);
	};
}
var we = {
	name: "eventListeners",
	enabled: !0,
	phase: "write",
	fn: function() {},
	effect: Ce,
	data: {}
}, Te = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function Ee(e) {
	return e.replace(/left|right|bottom|top/g, function(e) {
		return Te[e];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var De = {
	start: "end",
	end: "start"
};
function Oe(e) {
	return e.replace(/start|end/g, function(e) {
		return De[e];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function ke(e) {
	var t = I(e);
	return {
		scrollLeft: t.pageXOffset,
		scrollTop: t.pageYOffset
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function Ae(e) {
	return W(K(e)).left + ke(e).scrollLeft;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function je(e, t) {
	var n = I(e), r = K(e), i = n.visualViewport, a = r.clientWidth, o = r.clientHeight, s = 0, c = 0;
	if (i) {
		a = i.width, o = i.height;
		var l = ie();
		(l || !l && t === "fixed") && (s = i.offsetLeft, c = i.offsetTop);
	}
	return {
		width: a,
		height: o,
		x: s + Ae(e),
		y: c
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function Me(e) {
	var t = K(e), n = ke(e), r = e.ownerDocument?.body, i = H(t.scrollWidth, t.clientWidth, r ? r.scrollWidth : 0, r ? r.clientWidth : 0), a = H(t.scrollHeight, t.clientHeight, r ? r.scrollHeight : 0, r ? r.clientHeight : 0), o = -n.scrollLeft + Ae(e), s = -n.scrollTop;
	return G(r || t).direction === "rtl" && (o += H(t.clientWidth, r ? r.clientWidth : 0) - i), {
		width: i,
		height: a,
		x: o,
		y: s
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function Ne(e) {
	var t = G(e), n = t.overflow, r = t.overflowX, i = t.overflowY;
	return /auto|scroll|overlay|hidden/.test(n + i + r);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function Pe(e) {
	return [
		"html",
		"body",
		"#document"
	].indexOf(F(e)) >= 0 ? e.ownerDocument.body : R(e) && Ne(e) ? e : Pe(q(e));
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function Fe(e, t) {
	t === void 0 && (t = []);
	var n = Pe(e), r = n === e.ownerDocument?.body, i = I(n), a = r ? [i].concat(i.visualViewport || [], Ne(n) ? n : []) : n, o = t.concat(a);
	return r ? o : o.concat(Fe(q(a)));
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function Ie(e) {
	return Object.assign({}, e, {
		left: e.x,
		top: e.y,
		right: e.x + e.width,
		bottom: e.y + e.height
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function Le(e, t) {
	var n = W(e, !1, t === "fixed");
	return n.top += e.clientTop, n.left += e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function Re(e, t, n) {
	return t === "viewport" ? Ie(je(e, n)) : L(t) ? Le(t, n) : Ie(Me(K(e)));
}
function ze(e) {
	var t = Fe(q(e)), n = ["absolute", "fixed"].indexOf(G(e).position) >= 0 && R(e) ? J(e) : e;
	return L(n) ? t.filter(function(e) {
		return L(e) && oe(e, n) && F(e) !== "body";
	}) : [];
}
function Be(e, t, n, r) {
	var i = t === "clippingParents" ? ze(e) : [].concat(t), a = [].concat(i, [n]), o = a[0], s = a.reduce(function(t, n) {
		var i = Re(e, n, r);
		return t.top = H(i.top, t.top), t.right = ne(i.right, t.right), t.bottom = ne(i.bottom, t.bottom), t.left = H(i.left, t.left), t;
	}, Re(e, o, r));
	return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/computeOffsets.js
function Ve(e) {
	var t = e.reference, n = e.element, r = e.placement, i = r ? V(r) : null, a = r ? Z(r) : null, o = t.x + t.width / 2 - n.width / 2, s = t.y + t.height / 2 - n.height / 2, c;
	switch (i) {
		case "top":
			c = {
				x: o,
				y: t.y - n.height
			};
			break;
		case S:
			c = {
				x: o,
				y: t.y + t.height
			};
			break;
		case C:
			c = {
				x: t.x + t.width,
				y: s
			};
			break;
		case w:
			c = {
				x: t.x - n.width,
				y: s
			};
			break;
		default: c = {
			x: t.x,
			y: t.y
		};
	}
	var l = i ? ue(i) : null;
	if (l != null) {
		var u = l === "y" ? "height" : "width";
		switch (a) {
			case D:
				c[l] = c[l] - (t[u] / 2 - n[u] / 2);
				break;
			case "end": c[l] = c[l] + (t[u] / 2 - n[u] / 2);
		}
	}
	return c;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/detectOverflow.js
function He(e, t) {
	t === void 0 && (t = {});
	var n = t, r = n.placement, i = r === void 0 ? e.placement : r, a = n.strategy, o = a === void 0 ? e.strategy : a, s = n.boundary, c = s === void 0 ? O : s, l = n.rootBoundary, u = l === void 0 ? k : l, d = n.elementContext, f = d === void 0 ? A : d, p = n.altBoundary, m = p !== void 0 && p, h = n.padding, g = h === void 0 ? 0 : h, _ = pe(typeof g == "number" ? me(g, E) : g), v = f === "popper" ? j : A, y = e.rects.popper, b = e.elements[m ? v : f], x = Be(L(b) ? b : b.contextElement || K(e.elements.popper), c, u, o), S = W(e.elements.reference), C = Ve({
		reference: S,
		element: y,
		strategy: "absolute",
		placement: i
	}), w = Ie(Object.assign({}, y, C)), T = f === "popper" ? w : S, D = {
		top: x.top - T.top + _.top,
		bottom: T.bottom - x.bottom + _.bottom,
		left: x.left - T.left + _.left,
		right: T.right - x.right + _.right
	}, M = e.modifiersData.offset;
	if (f === "popper" && M) {
		var N = M[i];
		Object.keys(D).forEach(function(e) {
			var t = ["right", "bottom"].indexOf(e) >= 0 ? 1 : -1, n = ["top", "bottom"].indexOf(e) >= 0 ? "y" : "x";
			D[e] += N[n] * t;
		});
	}
	return D;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function Ue(e, t) {
	t === void 0 && (t = {});
	var n = t, r = n.placement, i = n.boundary, a = n.rootBoundary, o = n.padding, s = n.flipVariations, c = n.allowedAutoPlacements, l = c === void 0 ? N : c, u = Z(r), d = u ? s ? M : M.filter(function(e) {
		return Z(e) === u;
	}) : E, f = d.filter(function(e) {
		return l.indexOf(e) >= 0;
	});
	f.length === 0 && (f = d);
	var p = f.reduce(function(t, n) {
		return t[n] = He(e, {
			placement: n,
			boundary: i,
			rootBoundary: a,
			padding: o
		})[V(n)], t;
	}, {});
	return Object.keys(p).sort(function(e, t) {
		return p[e] - p[t];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/flip.js
function We(e) {
	if (V(e) === "auto") return [];
	var t = Ee(e);
	return [
		Oe(e),
		t,
		Oe(t)
	];
}
function Ge(e) {
	var t = e.state, n = e.options, r = e.name;
	if (!t.modifiersData[r]._skip) {
		for (var i = n.mainAxis, a = i === void 0 || i, o = n.altAxis, s = o === void 0 || o, c = n.fallbackPlacements, l = n.padding, u = n.boundary, d = n.rootBoundary, f = n.altBoundary, p = n.flipVariations, m = p === void 0 || p, h = n.allowedAutoPlacements, g = t.options.placement, _ = V(g) === g, v = c || (_ || !m ? [Ee(g)] : We(g)), y = [g].concat(v).reduce(function(e, n) {
			return e.concat(V(n) === "auto" ? Ue(t, {
				placement: n,
				boundary: u,
				rootBoundary: d,
				padding: l,
				flipVariations: m,
				allowedAutoPlacements: h
			}) : n);
		}, []), b = t.rects.reference, x = t.rects.popper, T = /* @__PURE__ */ new Map(), E = !0, O = y[0], k = 0; k < y.length; k++) {
			var A = y[k], j = V(A), M = Z(A) === D, N = ["top", S].indexOf(j) >= 0, P = N ? "width" : "height", F = He(t, {
				placement: A,
				boundary: u,
				rootBoundary: d,
				altBoundary: f,
				padding: l
			}), I = N ? M ? C : w : M ? S : "top";
			b[P] > x[P] && (I = Ee(I));
			var L = Ee(I), R = [];
			if (a && R.push(F[j] <= 0), s && R.push(F[I] <= 0, F[L] <= 0), R.every(function(e) {
				return e;
			})) {
				O = A, E = !1;
				break;
			}
			T.set(A, R);
		}
		if (E) for (var z = m ? 3 : 1, ee = function(e) {
			var t = y.find(function(t) {
				var n = T.get(t);
				if (n) return n.slice(0, e).every(function(e) {
					return e;
				});
			});
			if (t) return O = t, "break";
		}, B = z; B > 0 && ee(B) !== "break"; B--);
		t.placement !== O && (t.modifiersData[r]._skip = !0, t.placement = O, t.reset = !0);
	}
}
var Ke = {
	name: "flip",
	enabled: !0,
	phase: "main",
	fn: Ge,
	requiresIfExists: ["offset"],
	data: { _skip: !1 }
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/hide.js
function qe(e, t, n) {
	return n === void 0 && (n = {
		x: 0,
		y: 0
	}), {
		top: e.top - t.height - n.y,
		right: e.right - t.width + n.x,
		bottom: e.bottom - t.height + n.y,
		left: e.left - t.width - n.x
	};
}
function Je(e) {
	return [
		"top",
		C,
		S,
		w
	].some(function(t) {
		return e[t] >= 0;
	});
}
function Ye(e) {
	var t = e.state, n = e.name, r = t.rects.reference, i = t.rects.popper, a = t.modifiersData.preventOverflow, o = He(t, { elementContext: "reference" }), s = He(t, { altBoundary: !0 }), c = qe(o, r), l = qe(s, i, a), u = Je(c), d = Je(l);
	t.modifiersData[n] = {
		referenceClippingOffsets: c,
		popperEscapeOffsets: l,
		isReferenceHidden: u,
		hasPopperEscaped: d
	}, t.attributes.popper = Object.assign({}, t.attributes.popper, {
		"data-popper-reference-hidden": u,
		"data-popper-escaped": d
	});
}
var Xe = {
	name: "hide",
	enabled: !0,
	phase: "main",
	requiresIfExists: ["preventOverflow"],
	fn: Ye
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/offset.js
function Ze(e, t, n) {
	var r = V(e), i = ["left", "top"].indexOf(r) >= 0 ? -1 : 1, a = typeof n == "function" ? n(Object.assign({}, t, { placement: e })) : n, o = a[0], s = a[1];
	return o ||= 0, s = (s || 0) * i, ["left", "right"].indexOf(r) >= 0 ? {
		x: s,
		y: o
	} : {
		x: o,
		y: s
	};
}
function Qe(e) {
	var t = e.state, n = e.options, r = e.name, i = n.offset, a = i === void 0 ? [0, 0] : i, o = N.reduce(function(e, n) {
		return e[n] = Ze(n, t.rects, a), e;
	}, {}), s = o[t.placement], c = s.x, l = s.y;
	t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += l), t.modifiersData[r] = o;
}
var $e = {
	name: "offset",
	enabled: !0,
	phase: "main",
	requires: ["popperOffsets"],
	fn: Qe
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function et(e) {
	var t = e.state, n = e.name;
	t.modifiersData[n] = Ve({
		reference: t.rects.reference,
		element: t.rects.popper,
		strategy: "absolute",
		placement: t.placement
	});
}
var tt = {
	name: "popperOffsets",
	enabled: !0,
	phase: "read",
	fn: et,
	data: {}
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getAltAxis.js
function nt(e) {
	return e === "x" ? "y" : "x";
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function rt(e) {
	var t = e.state, n = e.options, r = e.name, i = n.mainAxis, a = i === void 0 || i, o = n.altAxis, s = o !== void 0 && o, c = n.boundary, l = n.rootBoundary, u = n.altBoundary, d = n.padding, f = n.tether, p = f === void 0 || f, m = n.tetherOffset, h = m === void 0 ? 0 : m, g = He(t, {
		boundary: c,
		rootBoundary: l,
		padding: d,
		altBoundary: u
	}), _ = V(t.placement), v = Z(t.placement), y = !v, b = ue(_), x = nt(b), T = t.modifiersData.popperOffsets, E = t.rects.reference, D = t.rects.popper, O = typeof h == "function" ? h(Object.assign({}, t.rects, { placement: t.placement })) : h, k = typeof O == "number" ? {
		mainAxis: O,
		altAxis: O
	} : Object.assign({
		mainAxis: 0,
		altAxis: 0
	}, O), A = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, j = {
		x: 0,
		y: 0
	};
	if (T) {
		if (a) {
			var M = b === "y" ? "top" : w, N = b === "y" ? S : C, P = b === "y" ? "height" : "width", F = T[b], I = F + g[M], L = F - g[N], R = p ? -D[P] / 2 : 0, z = v === "start" ? E[P] : D[P], ee = v === "start" ? -D[P] : -E[P], B = t.elements.arrow, te = p && B ? ae(B) : {
				width: 0,
				height: 0
			}, U = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : fe(), re = U[M], ie = U[N], W = Y(0, E[P], te[P]), oe = y ? E[P] / 2 - R - W - re - k.mainAxis : z - W - re - k.mainAxis, G = y ? -E[P] / 2 + R + W + ie + k.mainAxis : ee + W + ie + k.mainAxis, se = t.elements.arrow && J(t.elements.arrow), K = se ? b === "y" ? se.clientTop || 0 : se.clientLeft || 0 : 0, q = A?.[b] ?? 0, ce = F + oe - q - K, le = F + G - q, pe = Y(p ? ne(I, ce) : I, F, p ? H(L, le) : L);
			T[b] = pe, j[b] = pe - F;
		}
		if (s) {
			var me = b === "x" ? "top" : w, he = b === "x" ? S : C, X = T[x], ge = x === "y" ? "height" : "width", _e = X + g[me], ve = X - g[he], ye = ["top", w].indexOf(_) !== -1, be = A?.[x] ?? 0, xe = ye ? _e : X - E[ge] - D[ge] - be + k.altAxis, Se = ye ? X + E[ge] + D[ge] - be - k.altAxis : ve, Q = p && ye ? de(xe, X, Se) : Y(p ? xe : _e, X, p ? Se : ve);
			T[x] = Q, j[x] = Q - X;
		}
		t.modifiersData[r] = j;
	}
}
var it = {
	name: "preventOverflow",
	enabled: !0,
	phase: "main",
	fn: rt,
	requiresIfExists: ["offset"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function at(e) {
	return {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function ot(e) {
	return e === I(e) || !R(e) ? ke(e) : at(e);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function st(e) {
	var t = e.getBoundingClientRect(), n = U(t.width) / e.offsetWidth || 1, r = U(t.height) / e.offsetHeight || 1;
	return n !== 1 || r !== 1;
}
function ct(e, t, n) {
	n === void 0 && (n = !1);
	var r = R(t), i = R(t) && st(t), a = K(t), o = W(e, i, n), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = {
		x: 0,
		y: 0
	};
	return (r || !r && !n) && ((F(t) !== "body" || Ne(a)) && (s = ot(t)), R(t) ? (c = W(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : a && (c.x = Ae(a))), {
		x: o.left + s.scrollLeft - c.x,
		y: o.top + s.scrollTop - c.y,
		width: o.width,
		height: o.height
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/orderModifiers.js
function lt(e) {
	var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
	e.forEach(function(e) {
		t.set(e.name, e);
	});
	function i(e) {
		n.add(e.name), [].concat(e.requires || [], e.requiresIfExists || []).forEach(function(e) {
			if (!n.has(e)) {
				var r = t.get(e);
				r && i(r);
			}
		}), r.push(e);
	}
	return e.forEach(function(e) {
		n.has(e.name) || i(e);
	}), r;
}
function ut(e) {
	var t = lt(e);
	return P.reduce(function(e, n) {
		return e.concat(t.filter(function(e) {
			return e.phase === n;
		}));
	}, []);
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/debounce.js
function dt(e) {
	var t;
	return function() {
		return t ||= new Promise(function(n) {
			Promise.resolve().then(function() {
				t = void 0, n(e());
			});
		}), t;
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/mergeByName.js
function ft(e) {
	var t = e.reduce(function(e, t) {
		var n = e[t.name];
		return e[t.name] = n ? Object.assign({}, n, t, {
			options: Object.assign({}, n.options, t.options),
			data: Object.assign({}, n.data, t.data)
		}) : t, e;
	}, {});
	return Object.keys(t).map(function(e) {
		return t[e];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/createPopper.js
var pt = {
	placement: "bottom",
	modifiers: [],
	strategy: "absolute"
};
function mt() {
	return ![...arguments].some(function(e) {
		return !(e && typeof e.getBoundingClientRect == "function");
	});
}
function ht(e) {
	e === void 0 && (e = {});
	var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, i = t.defaultOptions, a = i === void 0 ? pt : i;
	return function(e, t, n) {
		n === void 0 && (n = a);
		var i = {
			placement: "bottom",
			orderedModifiers: [],
			options: Object.assign({}, pt, a),
			modifiersData: {},
			elements: {
				reference: e,
				popper: t
			},
			attributes: {},
			styles: {}
		}, o = [], s = !1, c = {
			state: i,
			setOptions: function(n) {
				var o = typeof n == "function" ? n(i.options) : n;
				u(), i.options = Object.assign({}, a, i.options, o), i.scrollParents = {
					reference: L(e) ? Fe(e) : e.contextElement ? Fe(e.contextElement) : [],
					popper: Fe(t)
				};
				var s = ut(ft([].concat(r, i.options.modifiers)));
				return i.orderedModifiers = s.filter(function(e) {
					return e.enabled;
				}), l(), c.update();
			},
			forceUpdate: function() {
				if (!s) {
					var e = i.elements, t = e.reference, n = e.popper;
					if (mt(t, n)) {
						i.rects = {
							reference: ct(t, J(n), i.options.strategy === "fixed"),
							popper: ae(n)
						}, i.reset = !1, i.placement = i.options.placement, i.orderedModifiers.forEach(function(e) {
							return i.modifiersData[e.name] = Object.assign({}, e.data);
						});
						for (var r = 0; r < i.orderedModifiers.length; r++) {
							if (i.reset === !0) {
								i.reset = !1, r = -1;
								continue;
							}
							var a = i.orderedModifiers[r], o = a.fn, l = a.options, u = l === void 0 ? {} : l, d = a.name;
							typeof o == "function" && (i = o({
								state: i,
								options: u,
								name: d,
								instance: c
							}) || i);
						}
					}
				}
			},
			update: dt(function() {
				return new Promise(function(e) {
					c.forceUpdate(), e(i);
				});
			}),
			destroy: function() {
				u(), s = !0;
			}
		};
		if (!mt(e, t)) return c;
		c.setOptions(n).then(function(e) {
			!s && n.onFirstUpdate && n.onFirstUpdate(e);
		});
		function l() {
			i.orderedModifiers.forEach(function(e) {
				var t = e.name, n = e.options, r = n === void 0 ? {} : n, a = e.effect;
				if (typeof a == "function") {
					var s = a({
						state: i,
						name: t,
						instance: c,
						options: r
					});
					o.push(s || function() {});
				}
			});
		}
		function u() {
			o.forEach(function(e) {
				return e();
			}), o = [];
		}
		return c;
	};
}
var gt = /*#__PURE__*/ ht({ defaultModifiers: [
	we,
	tt,
	Se,
	te,
	$e,
	Ke,
	it,
	_e,
	Xe
] }), _t = class e {
	constructor(t, n) {
		this.element = t, this.touch1 = null, this.touch2 = null, this.touchStartX = null, this.touchStartY = null, this.touchEndX = null, this.touchEndY = null, this.touchMove1 = null, this.touchMove2 = null, this.touchMoveX = null, this.touchMoveY = null, this.velocityX = null, this.velocityY = null, this.longPressTimer = null, this.doubleTapTimer = null, this.doubleTapWaiting = !1, this.thresholdX = 0, this.thresholdY = 0, this.disregardVelocityThresholdX = 0, this.disregardVelocityThresholdY = 0, this.swipingHorizontal = !1, this.swipingVertical = !1, this.swipingDirection = null, this.swipedHorizontal = !1, this.swipedVertical = !1, this.originalDistance = null, this.newDistance = null, this.scale = null, this.originalAngle = null, this.newAngle = null, this.rotation = null, this.handlers = {
			panstart: [],
			panmove: [],
			panend: [],
			swipeleft: [],
			swiperight: [],
			swipeup: [],
			swipedown: [],
			tap: [],
			doubletap: [],
			longpress: [],
			pinch: [],
			pinchend: [],
			rotate: [],
			rotateend: []
		}, this._onTouchStart = this.onTouchStart.bind(this), this._onTouchMove = this.onTouchMove.bind(this), this._onTouchEnd = this.onTouchEnd.bind(this), this.opts = Object.assign({}, e.defaults, n), this.element.addEventListener("touchstart", this._onTouchStart, $), this.element.addEventListener("touchmove", this._onTouchMove, $), this.element.addEventListener("touchend", this._onTouchEnd, $), this.opts.mouseSupport && !("ontouchstart" in window) && (this.element.addEventListener("mousedown", this._onTouchStart, $), document.addEventListener("mousemove", this._onTouchMove, $), document.addEventListener("mouseup", this._onTouchEnd, $));
	}
	destroy() {
		this.element.removeEventListener("touchstart", this._onTouchStart), this.element.removeEventListener("touchmove", this._onTouchMove), this.element.removeEventListener("touchend", this._onTouchEnd), this.element.removeEventListener("mousedown", this._onTouchStart), document.removeEventListener("mousemove", this._onTouchMove), document.removeEventListener("mouseup", this._onTouchEnd), clearTimeout(this.longPressTimer ?? void 0), clearTimeout(this.doubleTapTimer ?? void 0);
	}
	on(e, t) {
		if (this.handlers[e]) return this.handlers[e].push(t), {
			type: e,
			fn: t,
			cancel: () => this.off(e, t)
		};
	}
	off(e, t) {
		if (this.handlers[e]) {
			let n = this.handlers[e].indexOf(t);
			n !== -1 && this.handlers[e].splice(n, 1);
		}
	}
	fire(e, t) {
		for (let n = 0; n < this.handlers[e].length; n++) this.handlers[e][n](t);
	}
	onTouchStart(e) {
		let t = !1;
		if (e.type !== "mousedown") {
			if (this.touch1 || (this.touch1 = e.changedTouches[0], t = !0), (t && e.changedTouches.length > 1 || !t) && !this.touch2) {
				this.touch2 = [...e.changedTouches].find((e) => e.identifier !== this.touch1?.identifier) || null, this.originalDistance = Math.sqrt(((this.touch2?.screenX ?? 0) - (this.touchMove1?.screenX ?? this.touch1?.screenX ?? 0)) ** 2 + ((this.touch2?.screenY ?? 0) - (this.touchMove1?.screenY ?? this.touch1?.screenY ?? 0)) ** 2), this.originalAngle = Math.atan2((this.touch2?.screenY ?? 0) - (this.touchMove1?.screenY ?? this.touch1?.screenY ?? 0), (this.touch2?.screenX ?? 0) - (this.touchMove1?.screenX ?? this.touch1?.screenX ?? 0)) / (Math.PI / 180);
				return;
			}
			if (!t) return;
		}
		(t || e.type === "mousedown") && (this.thresholdX = this.opts.threshold("x", this), this.thresholdY = this.opts.threshold("y", this), this.disregardVelocityThresholdX = this.opts.disregardVelocityThreshold("x", this), this.disregardVelocityThresholdY = this.opts.disregardVelocityThreshold("y", this), this.touchStartX = e.type === "mousedown" ? e.screenX : this.touch1?.screenX || 0, this.touchStartY = e.type === "mousedown" ? e.screenY : this.touch1?.screenY || 0, this.touchMoveX = null, this.touchMoveY = null, this.touchEndX = null, this.touchEndY = null, this.swipingDirection = null, this.longPressTimer = setTimeout(() => this.fire("longpress", e), this.opts.longPressTime), this.scale = 1, this.rotation = 0, this.fire("panstart", e));
	}
	onTouchMove(e) {
		if (e.type === "mousemove" && (!this.touchStartX || this.touchEndX !== null)) return;
		let t, n;
		if (e.type !== "mousemove" && (t = [...e.changedTouches].find((e) => e.identifier === this.touch1?.identifier), this.touchMove1 = t || this.touchMove1, n = [...e.changedTouches].find((e) => e.identifier === this.touch2?.identifier), this.touchMove2 = n || this.touchMove2), e.type === "mousemove" || t) {
			let n = (e.type === "mousemove" ? e.screenX : t?.screenX ?? 0) - (this.touchStartX ?? 0);
			this.velocityX = n - (this.touchMoveX ?? 0), this.touchMoveX = n;
			let r = (e.type === "mousemove" ? e.screenY : t?.screenY ?? 0) - (this.touchStartY ?? 0);
			this.velocityY = r - (this.touchMoveY ?? 0), this.touchMoveY = r;
			let i = Math.abs(this.touchMoveX), a = Math.abs(this.touchMoveY);
			this.swipingHorizontal = i > this.thresholdX, this.swipingVertical = a > this.thresholdY, this.swipingDirection = i > a ? this.swipingHorizontal ? "horizontal" : "pre-horizontal" : this.swipingVertical ? "vertical" : "pre-vertical", Math.max(i, a) > this.opts.pressThreshold && clearTimeout(this.longPressTimer ?? void 0), this.fire("panmove", e);
		}
		e.type !== "mousemove" && this.touchMove1 != null && this.touchMove2 != null && (this.newDistance = Math.sqrt((this.touchMove2.screenX - this.touchMove1.screenX) ** 2 + (this.touchMove2.screenY - this.touchMove1.screenY) ** 2), this.scale = this.newDistance / (this.originalDistance ?? 0), this.fire("pinch", e), this.newAngle = Math.atan2((this.touchMove2.screenY ?? 0) - (this.touchMove1.screenY ?? 0), (this.touchMove2.screenX ?? 0) - (this.touchMove1.screenX ?? 0)) / (Math.PI / 180), this.rotation = this.newAngle - (this.originalAngle ?? 0), this.fire("rotate", e));
	}
	onTouchEnd(e) {
		let t;
		if (e.type !== "mouseup" && (t = [...e.changedTouches].find((e) => e.identifier === this.touch1?.identifier), [...e.touches].find((e) => e.identifier === this.touch1?.identifier) || (this.touch1 = null, this.touchMove1 = null), [...e.touches].find((e) => e.identifier === this.touch2?.identifier) || (this.touch2 = null, this.touchMove2 = null)), !(e.type === "mouseup" && (!this.touchStartX || this.touchEndX !== null))) {
			if (e.type === "mouseup" || t) {
				this.touchEndX = e.type === "mouseup" ? e.screenX : t?.screenX ?? 0, this.touchEndY = e.type === "mouseup" ? e.screenY : t?.screenY ?? 0, this.fire("panend", e), clearTimeout(this.longPressTimer ?? void 0);
				let n = this.touchEndX - (this.touchStartX ?? 0), r = Math.abs(n), i = this.touchEndY - (this.touchStartY ?? 0), a = Math.abs(i), o = Math.sqrt(n ** 2 + i ** 2), s = Math.abs(o), c = a / r;
				r > this.thresholdX || a > this.thresholdY || this.opts.diagonalSwipes && (s > this.thresholdX || s > this.thresholdY) ? (this.swipedHorizontal = r > this.thresholdX || this.opts.diagonalSwipes && s > this.thresholdX, this.swipedVertical = a > this.thresholdY || this.opts.diagonalSwipes && s > this.thresholdY, (!this.opts.diagonalSwipes || c < Math.tan((45 - this.opts.diagonalLimit) * Math.PI / 180) || c > Math.tan((45 + this.opts.diagonalLimit) * Math.PI / 180)) && (r >= a && (this.swipedVertical = !1), a > r && (this.swipedHorizontal = !1)), this.swipedHorizontal && (n < 0 ? ((this.velocityX ?? 0) < -this.opts.velocityThreshold || o > this.disregardVelocityThresholdX) && this.fire("swipeleft", e) : ((this.velocityX ?? 0) > this.opts.velocityThreshold || o > this.disregardVelocityThresholdX) && this.fire("swiperight", e)), this.swipedVertical && (i < 0 ? ((this.velocityY ?? 0) < -this.opts.velocityThreshold || o > this.disregardVelocityThresholdY) && this.fire("swipeup", e) : ((this.velocityY ?? 0) > this.opts.velocityThreshold || o > this.disregardVelocityThresholdY) && this.fire("swipedown", e))) : r < this.opts.pressThreshold && a < this.opts.pressThreshold && (this.doubleTapWaiting ? (this.doubleTapWaiting = !1, clearTimeout(this.doubleTapTimer ?? void 0), this.fire("doubletap", e)) : (this.doubleTapWaiting = !0, this.doubleTapTimer = setTimeout(() => this.doubleTapWaiting = !1, this.opts.doubleTapTime), this.fire("tap", e)));
			}
			!this.touch1 && !this.touch2 && (this.fire("pinchend", e), this.fire("rotateend", e), this.originalDistance = null, this.newDistance = null, this.scale = null, this.originalAngle = null, this.newAngle = null, this.rotation = null);
		}
	}
};
_t.defaults = {
	threshold: (e, t) => Math.max(25, Math.floor(.15 * (e === "x" ? window.innerWidth || document.body.clientWidth : window.innerHeight || document.body.clientHeight))),
	velocityThreshold: 10,
	disregardVelocityThreshold: (e, t) => Math.floor(.5 * (e === "x" ? t.element.clientWidth : t.element.clientHeight)),
	pressThreshold: 8,
	diagonalSwipes: !1,
	diagonalLimit: 15,
	longPressTime: 500,
	doubleTapTime: 300,
	mouseSupport: !0
};
var $ = !1;
try {
	window.addEventListener("test", null, Object.defineProperty({}, "passive", { get: function() {
		$ = { passive: !0 };
	} }));
} catch {}
//#endregion
//#region src/sn/EventMng.ts
var vt = class {
	cfg;
	hTag;
	appPixi;
	main;
	layMng;
	val;
	scrItr;
	sys;
	#e = new l();
	#t;
	#n;
	#r = /* @__PURE__ */ new Map([[0, ""], [1, "middle"]]);
	constructor(t, n, i, a, c, l, u, d, m) {
		if (this.cfg = t, this.hTag = n, this.appPixi = i, this.main = a, this.layMng = c, this.val = l, this.scrItr = d, this.sys = m, n.clear_event = (e) => f.clear_event(e), n.event = (e) => this.#b(e), n.set_cancel_skip = () => !1, n.set_focus = (e) => this.#S(e), this.#t = new g(i.view, m), u.setEvtMng(this), d.setOtherObj(this, c), h.setEvtMng(this, m, d), c.setEvtMng(this), p.setFcs(this.#t), m.setFire((e, t) => p.fire(e, t)), o.isDbg) {
			let e = { pause: () => {
				if (!p.isWait) return;
				let e = {};
				d.recodeDesign(e), m.callHook("_enterDesign", e), m.send2Dbg("_enterDesign", e);
			} };
			e.attach = e.stopOnEntry = e.stopOnStep = e.stopOnStepIn = e.stopOnStepOut = e.stopOnBackstep = e.pause, m.addHook((t) => e[t]?.());
		}
		r("\n.sn_hint {\n	background-color: #3c3225;\n	color: white;\n	padding: 4px 8px;\n	border-radius: 4px;\n	font-size: 1.2em;\n	z-index: 10000;\n	pointer-events: none;\n	user-select: none;\n}\n\n.sn_hint_ar,\n.sn_hint_ar::before {\n	position: absolute;\n	width: 8px;\n	height: 8px;\n	background: inherit;\n}\n.sn_hint_ar {\n	visibility: hidden;\n}\n.sn_hint_ar::before {\n	visibility: visible;\n	content: '';\n	transform: rotate(45deg);\n}\n\n.sn_hint[data-popper-placement^='top']		> .sn_hint_ar {bottom: -4px;}\n.sn_hint[data-popper-placement^='bottom']	> .sn_hint_ar {top: -4px;}\n.sn_hint[data-popper-placement^='left']		> .sn_hint_ar {right: -4px;}\n.sn_hint[data-popper-placement^='right']	> .sn_hint_ar {left: -4px;}\n"), a.cvs.parentElement?.insertAdjacentHTML("beforeend", "\n<div class=\"sn_hint\" role=\"tooltip\">\n	<span>Dummy</span>\n	<div class=\"sn_hint_ar\" data-popper-arrow></div>\n</div>"), this.#p = document.querySelector(".sn_hint"), this.#m = this.#p.querySelector("span"), this.#h = gt(this.#f, this.#p), this.#p.hidden = !0, i.stage.interactive = !0, this.#e.add(document.body, e, (e) => this.#a(e)), this.#e.add(document.body, "keyup", () => f.resetFired()), this.#e.add(a.cvs, "contextmenu", (e) => {
			let t = this.#o(e) + "rightclick";
			p.fire(t, e, !0), e.preventDefault();
		});
		let { width: _, height: v } = t.oCfg.window, y = Math.floor(_ > v ? v / 3 : _ / 3);
		this.#n = new _t(a.cvs, {
			velocityThreshold: 0,
			disregardVelocityThreshold: (e) => Math.floor(y * (e === "x" ? 1 : .5))
		});
		let b = !1;
		this.#n.on("tap", (e) => {
			if (b) return;
			if (e instanceof TouchEvent) {
				p.fire("click", e, !0), f.resetFired();
				return;
			}
			if (e.button > 1) return;
			let t = this.#o(e) + `${this.#r.get(e.button) ?? ""}click`;
			p.fire(t, e, !0), f.resetFired();
		}), this.#e.add(window, "pointerout", () => f.resetFired()), this.#e.add(document, "pointerdown", () => f.resetFired(), { capture: !0 }), this.#n.on("longpress", (e) => {
			if (b = !0, e instanceof TouchEvent) {
				p.fire("longpress", e, !0);
				return;
			}
			let t = this.#o(e) + `${this.#r.get(e.button) ?? ""}longpress`;
			p.fire(t, e, !0);
		}), this.#n.on("panend", () => {
			b && queueMicrotask(() => {
				b = !1;
			});
		}), [
			"swiperight",
			"swipeleft",
			"swipeup",
			"swipedown"
		].forEach((e) => {
			this.#n.on(e, (t) => {
				if (t instanceof TouchEvent) {
					p.fire(e, t, !0);
					return;
				}
				let n = this.#o(t) + e;
				p.fire(n, t, !0);
			});
		});
		let S = () => l.setVal_Nochk("tmp", "const.sn.navigator.language", navigator.language);
		this.#e.add(globalThis, "languagechange", (e) => {
			S(), p.fire("sn:chgNavLang", e), s();
		}), S();
		let C = (e) => {
			o.isDarkMode = e.matches, l.setVal_Nochk("tmp", "const.sn.isDarkMode", o.isDarkMode);
		}, w = globalThis.matchMedia("(prefers-color-scheme: dark)");
		C(w), this.#e.add(w, "change", (e) => {
			C(e), p.fire("sn:chgDarkMode", e);
		});
		let T = (e, t) => {};
		"WheelEvent" in globalThis && (this.#e.add(a.cvs, "wheel", (e) => this.#s(e), { passive: !0 }), this.#i = (e) => this.#e.add(e, "wheel", (e) => this.#s(e), { passive: !0 }), T = (e, t) => e.add(a.cvs, "wheel", (e) => {
			e.deltaY <= 0 || (e.stopPropagation(), t());
		})), p.init(t, n, a, l, d, c, this, u, T), this.#d = new x(this.#t), this.#d.start(), this.#e.add(document, "keyup", (e) => {
			e.isComposing || e.key in this.#C && (this.#C[e.key] = 0);
		}), l.defTmp("const.sn.key.alternate", () => this.#C.Alt > 0), l.defTmp("const.sn.key.command", () => this.#C.Meta > 0), l.defTmp("const.sn.key.control", () => this.#C.Control > 0), l.defTmp("const.sn.key.end", () => this.#C.End > 0), l.defTmp("const.sn.key.escape", () => this.#C.Escape > 0), l.defTmp("const.sn.key.back", () => this.#C.GoBack > 0);
	}
	resvFlameEvent(t) {
		this.#e.add(t, e, (e) => this.#a(e)), this.#e.add(t, "contextmenu", (e) => {
			p.fire(this.#o(e) + "rightclick", e, !0), e.preventDefault();
		}), this.#i(t), this.#e.add(t, i, (e) => {
			if (e instanceof TouchEvent) {
				p.fire("click", e, !0);
				return;
			}
			if (e.button > 1) return;
			let t = this.#o(e) + `${this.#r.get(e.button) ?? ""}click`;
			p.fire(t, e, !0);
		}), this.#e.add(t, "pointerup", () => f.resetFired()), this.#e.add(t, "pointerout", () => f.resetFired());
	}
	#i = (e) => {};
	#a(e) {
		e.isComposing || (e.key in this.#C && (this.#C[e.key] = e.repeat ? 2 : 1), e.preventDefault(), p.fire(d.modKey(e) + e.key, e, !0));
	}
	#o(e) {
		return (e.altKey ? "alt+" : "") + (e.ctrlKey ? "ctrl+" : "") + (e.metaKey ? "meta+" : "") + (e.shiftKey ? "shift+" : "");
	}
	#s(e) {
		if (this.#c) {
			this.#l = !0;
			return;
		}
		this.#c = !0, this.#u();
		let t = this.#o(e) + (e.deltaY > 0 ? "downwheel" : "upwheel");
		p.fire(t, e, !0);
	}
	#c = !1;
	#l = !1;
	#u() {
		setTimeout(() => {
			if (this.#l) {
				this.#l = !1, this.#u();
				return;
			}
			this.#c = !1;
		}, 250);
	}
	#d;
	destroy() {
		this.#d.stop();
		for (let e of Array.from(document.getElementsByClassName("sn_hint"))) e.parentElement?.removeChild(e);
		this.#n.destroy(), p.destroy(), this.#t.destroy(), this.#v.clear(), this.#e.clear();
	}
	unButton(e) {
		this.#t.remove(e);
	}
	button(e, t, r, i, s) {
		!e.fn && !e.label && !e.url && this.main.errScript("fnまたはlabelまたはurlは必須です"), e.fn ??= this.scrItr.scriptFn, t.interactive = !0, t.cursor = "pointer";
		let c = e.key?.toLowerCase() ?? " ", l = a(e, "global", !1);
		f.setEvt2Fnc(l, c, () => this.main.resumeByJumpOrCall(e)), t.on(n, (e) => {
			e.preventDefault?.(), p.fire(c, e, !0);
		});
		let d = e.hint ? () => this.#_(e, t) : () => {}, h = () => {
			r(), this.#p.hidden = !0;
		}, g = () => (d(), i());
		if (t.on("pointerover", g), t.on("pointerout", () => {
			this.#t.isFocus(t) ? g() : h();
		}), t.on("pointerdown", () => {
			this.#p.hidden = !0;
			let e = this.#t.getFocus();
			s(), e instanceof m && e.normal();
		}), t.on("pointerup", o.isMobile ? h : () => {
			this.#t.isFocus(t) ? g() : h();
		}), this.#t.add(t, g, h), e.clickse && (e.clicksebuf ??= "SYS", this.cfg.searchPath(e.clickse, u.SOUND), t.on("pointerdown", () => this.hTag.playse({
			fn: e.clickse,
			...e.clicksebuf ? { buf: e.clicksebuf } : {},
			join: !1
		}))), e.enterse && (e.entersebuf ??= "SYS", this.cfg.searchPath(e.enterse, u.SOUND), t.on("pointerover", () => this.hTag.playse({
			fn: e.enterse,
			...e.entersebuf ? { buf: e.entersebuf } : {},
			join: !1
		}))), e.leavese && (e.leavesebuf ??= "SYS", this.cfg.searchPath(e.leavese, u.SOUND), t.on("pointerout", () => this.hTag.playse({
			fn: e.leavese,
			...e.leavesebuf ? { buf: e.leavesebuf } : {},
			join: !1
		}))), e.onenter) {
			let n = c + e.onenter.toLowerCase(), r = {
				fn: e.fn,
				label: e.onenter,
				call: !0,
				key: n
			};
			f.setEvt2Fnc(l, n, () => this.main.resumeByJumpOrCall(r)), t.on("pointerover", (e) => p.fire(n, e));
		}
		if (e.onleave) {
			let n = c + e.onleave.toLowerCase(), r = {
				fn: e.fn,
				label: e.onleave,
				call: !0,
				key: n
			};
			f.setEvt2Fnc(l, n, () => this.main.resumeByJumpOrCall(r)), t.on("pointerout", (e) => p.fire(n, e));
		}
	}
	#f = { getBoundingClientRect: (e = 0, t = 0) => DOMRect.fromRect({
		x: e,
		y: t,
		width: 0,
		height: 0
	}) };
	#p;
	#m;
	#h;
	#g = {
		placement: "bottom",
		modifiers: [{
			name: "flip",
			options: { fallbackPlacements: ["top", "bottom"] }
		}]
	};
	#_(e, n) {
		let r = n instanceof m ? n.getBtnBounds() : n.getBounds();
		if (e[":タグ名"] !== "link") {
			let e = n.parent.parent;
			r.x += e.x, r.y += e.y;
		}
		if (!e.hint) {
			this.#p.hidden = !0;
			return;
		}
		this.#p.style.cssText = `position:${this.#p.style.position}; transform:${this.#p.style.transform};` + (e.hint_style ?? ""), this.#m.style.cssText = "", this.#m.textContent = e.hint ?? "", this.#f.getBoundingClientRect = () => DOMRect.fromRect({
			x: this.sys.ofsLeft4elm + r.x * this.sys.cvsScale,
			y: this.sys.ofsTop4elm + r.y * this.sys.cvsScale,
			width: r.width,
			height: r.height
		}), this.#h.setOptions(e.hint_opt ? {
			...this.#g,
			...JSON.parse(e.hint_opt)
		} : this.#g).then(async () => {
			await this.#h.update(), this.#p.hidden = !1;
		}).catch((n) => console.error(t(e, "hint_opt", `dispHint 引数 hint_opt エラー ${n instanceof SyntaxError ? n.message : ""}`)));
	}
	hideHint() {
		this.#p.hidden = !0;
	}
	cvsResize() {
		this.hideHint();
	}
	#v = /* @__PURE__ */ new Map();
	#y(e) {
		let t = this.#v.get(e);
		if (t) {
			for (let e of t) e();
			this.#v.delete(e);
		}
	}
	#b(t) {
		let n = t.key;
		if (!n) throw "keyは必須です";
		let r = n.toLowerCase(), i = a(t, "call", !1), o = a(t, "global", !1), { fn: s, label: c, url: l } = t;
		if (a(t, "del", !1)) {
			if (s || c || i || l) throw "fn/label/callとdelは同時指定できません";
			return this.#y(n), f.clear_eventer(n, o, r), !1;
		}
		if (!s && !c && !l) throw "fn,label,url いずれかは必須です";
		if (t.fn ??= this.scrItr.scriptFn, n.startsWith("dom=")) {
			let r = f.getHtmlElmList(n);
			if (r.el.length === 0) {
				if (a(t, "need_err", !0)) throw `HTML内にセレクタ（${r.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
				return !1;
			}
			let i = ["click", e];
			switch (r.el[0].type ?? "") {
				case "checkbox":
					i = ["input"];
					break;
				case "range":
					i = ["input"];
					break;
				case "text":
				case "textarea": i = ["input", "change"];
			}
			this.#y(n);
			let o = [], s = i.length;
			for (let e = 0; e < s; ++e) {
				let t = i[e];
				r.el.forEach((i) => {
					o.push(this.#e.add(i, t, (e) => {
						if (!p.isWait || this.layMng.getFrmDisabled(r.id) || t === "keydown" && e.key !== "Enter") return;
						let a = i.dataset;
						for (let [e, t] of Object.entries(a)) this.val.setVal_Nochk("tmp", `sn.event.domdata.${e}`, t);
						p.fire(n, e);
					})), e === 0 && this.#t.add(i, () => this.#x(i) ? (i.focus(), !0) : !1, () => {});
				});
			}
			this.#v.set(n, o);
		}
		return f.setEvt2Fnc(o, r, () => this.main.resumeByJumpOrCall(t)), !1;
	}
	#x(e) {
		if (!e || e.offsetParent === null) return !1;
		let t = e;
		do {
			if (getComputedStyle(t).display === "none" || t.dataset.focus === "false" || t?.disabled) return !1;
			t = t.parentElement;
		} while (t);
		return !0;
	}
	#S(e) {
		let { add: t, del: n, to: r } = e;
		if (t?.startsWith("dom=")) {
			let n = f.getHtmlElmList(t);
			if (n.el.length === 0 && a(e, "need_err", !0)) throw `HTML内にセレクタ（${n.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
			return n.el.forEach((e) => this.#t.add(e, () => this.#x(e) ? (e.focus(), !0) : !1, () => {})), !1;
		}
		if (n?.startsWith("dom=")) {
			let t = f.getHtmlElmList(n);
			if (t.el.length === 0 && a(e, "need_err", !0)) throw `HTML内にセレクタ（${t.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
			return t.el.forEach((e) => this.#t.remove(e)), !1;
		}
		if (!r) throw "[set_focus] add か to は必須です";
		switch (r) {
			case "null":
				this.#t.blur();
				break;
			case "next":
				this.#t.next();
				break;
			case "prev": this.#t.prev();
		}
		return !1;
	}
	get isSkipping() {
		return p.isSkipping ? !0 : Object.keys(this.#C).some((e) => this.#C[e] === 2);
	}
	#C = {
		Alt: 0,
		Meta: 0,
		Control: 0,
		ArrowDown: 0,
		End: 0,
		Enter: 0,
		Escape: 0,
		" ": 0,
		GoBack: 0
	};
};
//#endregion
export { vt as EventMng };

//# sourceMappingURL=EventMng.js.map