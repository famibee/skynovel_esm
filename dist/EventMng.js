import { _ as e, m as t } from "./pixi.js";
import { i as n, m as r, n as i, o as a, r as o, s, t as c } from "./CmnLib.js";
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
	add(e, r, i) {
		if (this.#e.findIndex((t) => t.btn === e) >= 0) return;
		let a = () => {
			for (let t = this.#e.length - 1; t >= 0; --t) if (this.#e[t].btn === e) {
				this.#t = t;
				return;
			}
			this.#t = -1;
		};
		if (e instanceof t) {
			e.on("pointerdown", a), this.#e.push({
				btn: e,
				on: r,
				off: i,
				offEvt: () => {
					e.off("pointerdown", a);
				}
			});
			return;
		}
		let o = this.#n.add(e, "focus", a), s = (e) => {}, c = e.localName === "button" || e.localName === "a" ? (e) => !e.isTrusted && e.key === "Enter" : (e) => e.key === "Enter", l = e;
		switch (l.type ?? "") {
			case "checkbox":
				s = () => {
					l.checked = !l.checked;
				};
				break;
			case "":
				e.querySelectorAll("input[type]").length > 0 && (s = (t) => this.#r(e, t.key), c = () => !1);
				break;
			case "range":
				s = (e) => {
					e.isTrusted || (e.key === "ArrowUp" ? l.stepUp() : l.stepDown());
				};
				break;
			case "text":
			case "textarea": s = (e) => {
				if (e.isTrusted) return;
				let t = (l.selectionStart ?? 0) + (e.key === "ArrowUp" ? -1 : 1);
				t < 0 && (t = 0), l.setSelectionRange(t, t);
			};
		}
		let u = this.#n.add(e, n, (t) => {
			if (t.key === "ArrowUp" || t.key === "ArrowDown" || t.key === "Enter") {
				if (t.stopImmediatePropagation(), c(t)) {
					e.dispatchEvent(new MouseEvent("click"));
					return;
				}
				s(t);
			}
		}, { passive: !0 });
		e.hasAttribute("tabindex") || (e.tabIndex = 0), this.#e.push({
			btn: e,
			on: r,
			off: i,
			offEvt: () => {
				o(), u();
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
	#i = c.debugLog ? (e) => console.log(`👾 <FocusMng idx:${String(e)} btn:%o`, this.#e[e].btn) : () => {};
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
		return e instanceof t ? !!e.parent : e.isConnected && !!e.ownerDocument.defaultView;
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
	#i(e) {
		let r = this.#n.get(e.index) ?? "", i = b(e.axes[0] ?? 0, e.axes[1] ?? 0, r ? y : v);
		if (i === r || (this.#n.set(e.index, i), !i)) return;
		let a = this.fcs.getFocus();
		(!a || a instanceof t ? globalThis : a).dispatchEvent(new KeyboardEvent(n, {
			key: i,
			bubbles: !0
		})), !(!a || a instanceof t) && (p.cancelAutoSkip(), a.getAttribute("type") === "range" && a.dispatchEvent(new InputEvent("input", { bubbles: !0 })));
	}
	#a(e) {
		let t = this.#r.get(e.index) ?? [], n = e.buttons.map((e) => e.pressed);
		this.#r.set(e.index, n);
		for (let e = 0; e < n.length; ++e) n[e] && !t[e] && this.#o(e);
	}
	#o(e) {
		if (e % 2 == 0) {
			p.cancelAutoSkip();
			let e = this.fcs.getFocus();
			(!e || e instanceof t ? document.body : e).dispatchEvent(new KeyboardEvent(n, {
				key: "Enter",
				bubbles: !0
			}));
			return;
		}
		p.fire("middleclick", new Event("gamepad:button"), !0);
	}
}, S = [
	"top",
	"bottom",
	"left",
	"right"
], C = {
	placement: "bottom",
	skid: 0,
	dist: 0
};
function w(e) {
	if (!e) return C;
	let t = JSON.parse(e), n = t.placement?.split("-")[0] ?? "", r = S.includes(n) ? n : C.placement, [i, a] = (t.modifiers?.find((e) => e.name === "offset"))?.options?.offset ?? [C.skid, C.dist];
	return {
		placement: r,
		skid: i,
		dist: a
	};
}
var T = {
	top: "bottom",
	bottom: "top",
	left: "right",
	right: "left"
};
function E(e, t, n, r, i) {
	let a = (n) => {
		switch (n) {
			case "top": return e.y - r - t.height >= 0;
			case "bottom": return e.y + e.height + r + t.height <= i.height;
			case "left": return e.x - r - t.width >= 0;
			case "right": return e.x + e.width + r + t.width <= i.width;
		}
	};
	if (a(n)) return n;
	let o = T[n];
	return a(o) ? o : n;
}
function D(e, t, n, r, i) {
	switch (n) {
		case "bottom": return {
			left: e.x + (e.width - t.width) / 2 + r,
			top: e.y + e.height + i
		};
		case "top": return {
			left: e.x + (e.width - t.width) / 2 + r,
			top: e.y - t.height - i
		};
		case "right": return {
			left: e.x + e.width + i,
			top: e.y + (e.height - t.height) / 2 + r
		};
		case "left": return {
			left: e.x - t.width - i,
			top: e.y + (e.height - t.height) / 2 + r
		};
	}
}
function O(e, t, n) {
	return {
		left: Math.min(Math.max(e.left, 0), Math.max(0, n.width - t.width)),
		top: Math.min(Math.max(e.top, 0), Math.max(0, n.height - t.height))
	};
}
function k(e, t, n, r, i = 8) {
	let a = r === "top" || r === "bottom", o = a ? e.x + e.width / 2 : e.y + e.height / 2, s = a ? n.left : n.top, c = a ? t.width : t.height;
	return Math.min(Math.max(o - s - i / 2, 0), Math.max(0, c - i));
}
//#endregion
//#region node_modules/tinygesture/dist/TinyGesture.js
var A = class e {
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
		}, this._onTouchStart = this.onTouchStart.bind(this), this._onTouchMove = this.onTouchMove.bind(this), this._onTouchEnd = this.onTouchEnd.bind(this), this.opts = Object.assign({}, e.defaults, n), this.element.addEventListener("touchstart", this._onTouchStart, j), this.element.addEventListener("touchmove", this._onTouchMove, j), this.element.addEventListener("touchend", this._onTouchEnd, j), this.opts.mouseSupport && !("ontouchstart" in window) && (this.element.addEventListener("mousedown", this._onTouchStart, j), document.addEventListener("mousemove", this._onTouchMove, j), document.addEventListener("mouseup", this._onTouchEnd, j));
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
A.defaults = {
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
var j = !1;
try {
	window.addEventListener("test", null, Object.defineProperty({}, "passive", { get: function() {
		j = { passive: !0 };
	} }));
} catch {}
//#endregion
//#region src/sn/EventMng.ts
var M = class {
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
	constructor(t, r, i, o, s, l, u, d, m) {
		if (this.cfg = t, this.hTag = r, this.appPixi = i, this.main = o, this.layMng = s, this.val = l, this.scrItr = d, this.sys = m, r.clear_event = (e) => f.clear_event(e), r.event = (e) => this.#v(e), r.set_cancel_skip = () => !1, r.set_focus = (e) => this.#b(e), this.#t = new g(i.view, m), u.setEvtMng(this), d.setOtherObj(this, s), h.setEvtMng(this, m, d), s.setEvtMng(this), p.setFcs(this.#t), m.setFire((e, t) => p.fire(e, t)), c.isDbg) {
			let e = { pause: () => {
				if (!p.isWait) return;
				let e = {};
				d.recodeDesign(e), m.callHook("_enterDesign", e), m.send2Dbg("_enterDesign", e);
			} };
			e.attach = e.stopOnEntry = e.stopOnStep = e.stopOnStepIn = e.stopOnStepOut = e.stopOnBackstep = e.pause, m.addHook((t) => e[t]?.());
		}
		a("\n.sn_hint {\n	position: fixed;\n	background-color: #3c3225;\n	color: white;\n	padding: 4px 8px;\n	border-radius: 4px;\n	font-size: 1.2em;\n	z-index: 10000;\n	pointer-events: none;\n	user-select: none;\n}\n\n.sn_hint_ar,\n.sn_hint_ar::before {\n	position: absolute;\n	width: 8px;\n	height: 8px;\n	background: inherit;\n}\n.sn_hint_ar {\n	visibility: hidden;\n}\n.sn_hint_ar::before {\n	visibility: visible;\n	content: '';\n	transform: rotate(45deg);\n}\n\n.sn_hint[data-hint-place='top']		> .sn_hint_ar {bottom: -4px;}\n.sn_hint[data-hint-place='bottom']	> .sn_hint_ar {top: -4px;}\n.sn_hint[data-hint-place='left']		> .sn_hint_ar {right: -4px;}\n.sn_hint[data-hint-place='right']	> .sn_hint_ar {left: -4px;}\n"), o.cvs.parentElement?.insertAdjacentHTML("beforeend", "\n<div class=\"sn_hint\" role=\"tooltip\">\n	<span>Dummy</span>\n	<div class=\"sn_hint_ar\"></div>\n</div>"), this.#f = document.querySelector(".sn_hint"), this.#p = this.#f.querySelector("span"), this.#m = this.#f.querySelector(".sn_hint_ar"), this.#f.hidden = !0, i.stage.interactive = !0, this.#e.add(document.body, n, (e) => this.#a(e)), this.#e.add(document.body, "keyup", () => f.resetFired()), this.#e.add(o.cvs, "contextmenu", (e) => {
			let t = this.#o(e) + "rightclick";
			p.fire(t, e, !0), e.preventDefault();
		});
		let { width: _, height: v } = t.oCfg.window, y = Math.floor(_ > v ? v / 3 : _ / 3);
		this.#n = new A(o.cvs, {
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
		this.#e.add(globalThis, "languagechange", (t) => {
			S(), p.fire("sn:chgNavLang", t), e();
		}), S();
		let C = (e) => {
			c.isDarkMode = e.matches, l.setVal_Nochk("tmp", "const.sn.isDarkMode", c.isDarkMode);
		}, w = globalThis.matchMedia("(prefers-color-scheme: dark)");
		C(w), this.#e.add(w, "change", (e) => {
			C(e), p.fire("sn:chgDarkMode", e);
		});
		let T = (e, t) => {};
		"WheelEvent" in globalThis && (this.#e.add(o.cvs, "wheel", (e) => this.#s(e), { passive: !0 }), this.#i = (e) => this.#e.add(e, "wheel", (e) => this.#s(e), { passive: !0 }), T = (e, t) => e.add(o.cvs, "wheel", (e) => {
			e.deltaY <= 0 || (e.stopPropagation(), t());
		})), p.init(t, r, o, l, d, s, this, u, T), this.#d = new x(this.#t), this.#d.start(), this.#e.add(document, "keyup", (e) => {
			e.isComposing || e.key in this.#x && (this.#x[e.key] = 0);
		}), l.defTmp("const.sn.key.alternate", () => this.#x.Alt > 0), l.defTmp("const.sn.key.command", () => this.#x.Meta > 0), l.defTmp("const.sn.key.control", () => this.#x.Control > 0), l.defTmp("const.sn.key.end", () => this.#x.End > 0), l.defTmp("const.sn.key.escape", () => this.#x.Escape > 0), l.defTmp("const.sn.key.back", () => this.#x.GoBack > 0);
	}
	resvFlameEvent(e) {
		this.#e.add(e, n, (e) => this.#a(e)), this.#e.add(e, "contextmenu", (e) => {
			p.fire(this.#o(e) + "rightclick", e, !0), e.preventDefault();
		}), this.#i(e), this.#e.add(e, o, (e) => {
			if (e instanceof TouchEvent) {
				p.fire("click", e, !0);
				return;
			}
			if (e.button > 1) return;
			let t = this.#o(e) + `${this.#r.get(e.button) ?? ""}click`;
			p.fire(t, e, !0);
		}), this.#e.add(e, "pointerup", () => f.resetFired()), this.#e.add(e, "pointerout", () => f.resetFired());
	}
	#i = (e) => {};
	#a(e) {
		e.isComposing || (e.key in this.#x && (this.#x[e.key] = e.repeat ? 2 : 1), e.preventDefault(), p.fire(d.modKey(e) + e.key, e, !0));
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
		this.#n.destroy(), p.destroy(), this.#t.destroy(), this.#g.clear(), this.#e.clear();
	}
	unButton(e) {
		this.#t.remove(e);
	}
	button(e, t, n, r, a) {
		!e.fn && !e.label && !e.url && this.main.errScript("fnまたはlabelまたはurlは必須です"), e.fn ??= this.scrItr.scriptFn, t.interactive = !0, t.cursor = "pointer";
		let o = e.key?.toLowerCase() ?? " ", l = s(e, "global", !1);
		f.setEvt2Fnc(l, o, () => this.main.resumeByJumpOrCall(e)), t.on(i, (e) => {
			e.preventDefault?.(), p.fire(o, e, !0);
		});
		let d = e.hint ? () => this.#h(e, t) : () => {}, h = () => {
			n(), this.#f.hidden = !0;
		}, g = () => (d(), r());
		if (t.on("pointerover", g), t.on("pointerout", () => {
			this.#t.isFocus(t) ? g() : h();
		}), t.on("pointerdown", () => {
			this.#f.hidden = !0;
			let e = this.#t.getFocus();
			a(), e instanceof m && e.normal();
		}), t.on("pointerup", c.isMobile ? h : () => {
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
			let n = o + e.onenter.toLowerCase(), r = {
				fn: e.fn,
				label: e.onenter,
				call: !0,
				key: n
			};
			f.setEvt2Fnc(l, n, () => this.main.resumeByJumpOrCall(r)), t.on("pointerover", (e) => p.fire(n, e));
		}
		if (e.onleave) {
			let n = o + e.onleave.toLowerCase(), r = {
				fn: e.fn,
				label: e.onleave,
				call: !0,
				key: n
			};
			f.setEvt2Fnc(l, n, () => this.main.resumeByJumpOrCall(r)), t.on("pointerout", (e) => p.fire(n, e));
		}
	}
	#f;
	#p;
	#m;
	#h(e, t) {
		let n = t instanceof m ? t.getBtnBounds() : t.getBounds();
		if (e[":タグ名"] !== "link") {
			let e = t.parent.parent;
			n.x += e.x, n.y += e.y;
		}
		if (!e.hint) {
			this.#f.hidden = !0;
			return;
		}
		this.#f.style.cssText = e.hint_style ?? "", this.#p.style.cssText = "", this.#p.textContent = e.hint ?? "";
		let i;
		try {
			i = w(e.hint_opt);
		} catch (t) {
			console.error(r(e, "hint_opt", `dispHint 引数 hint_opt エラー ${t instanceof SyntaxError ? t.message : ""}`));
			return;
		}
		let a = {
			x: this.sys.ofsLeft4elm + n.x * this.sys.cvsScale,
			y: this.sys.ofsTop4elm + n.y * this.sys.cvsScale,
			width: n.width,
			height: n.height
		};
		this.#f.hidden = !1;
		let o = this.#f.getBoundingClientRect(), s = {
			width: globalThis.innerWidth,
			height: globalThis.innerHeight
		}, c = E(a, o, i.placement, i.dist, s), l = O(D(a, o, c, i.skid, i.dist), o, s);
		this.#f.style.left = `${String(l.left)}px`, this.#f.style.top = `${String(l.top)}px`, this.#f.dataset.hintPlace = c;
		let u = c === "top" || c === "bottom", d = `${String(k(a, o, l, c))}px`;
		this.#m.style.left = u ? d : "", this.#m.style.top = u ? "" : d;
	}
	hideHint() {
		this.#f.hidden = !0;
	}
	cvsResize() {
		this.hideHint();
	}
	#g = /* @__PURE__ */ new Map();
	#_(e) {
		let t = this.#g.get(e);
		if (t) {
			for (let e of t) e();
			this.#g.delete(e);
		}
	}
	#v(e) {
		let t = e.key;
		if (!t) throw "keyは必須です";
		let r = t.toLowerCase(), i = s(e, "call", !1), a = s(e, "global", !1), { fn: o, label: c, url: l } = e;
		if (s(e, "del", !1)) {
			if (o || c || i || l) throw "fn/label/callとdelは同時指定できません";
			return this.#_(t), f.clear_eventer(t, a, r), !1;
		}
		if (!o && !c && !l) throw "fn,label,url いずれかは必須です";
		if (e.fn ??= this.scrItr.scriptFn, t.startsWith("dom=")) {
			let r = f.getHtmlElmList(t);
			if (r.el.length === 0) {
				if (s(e, "need_err", !0)) throw `HTML内にセレクタ（${r.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
				return !1;
			}
			let i = ["click", n];
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
			this.#_(t);
			let a = [], o = i.length;
			for (let e = 0; e < o; ++e) {
				let n = i[e];
				r.el.forEach((i) => {
					a.push(this.#e.add(i, n, (e) => {
						if (!p.isWait || this.layMng.getFrmDisabled(r.id) || n === "keydown" && e.key !== "Enter") return;
						let a = i.dataset;
						for (let [e, t] of Object.entries(a)) this.val.setVal_Nochk("tmp", `sn.event.domdata.${e}`, t);
						p.fire(t, e);
					})), e === 0 && this.#t.add(i, () => this.#y(i) ? (i.focus(), !0) : !1, () => {});
				});
			}
			this.#g.set(t, a);
		}
		return f.setEvt2Fnc(a, r, () => this.main.resumeByJumpOrCall(e)), !1;
	}
	#y(e) {
		if (!e || e.offsetParent === null) return !1;
		let t = e;
		do {
			if (getComputedStyle(t).display === "none" || t.dataset.focus === "false" || t?.disabled) return !1;
			t = t.parentElement;
		} while (t);
		return !0;
	}
	#b(e) {
		let { add: t, del: n, to: r } = e;
		if (t?.startsWith("dom=")) {
			let n = f.getHtmlElmList(t);
			if (n.el.length === 0 && s(e, "need_err", !0)) throw `HTML内にセレクタ（${n.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
			return n.el.forEach((e) => this.#t.add(e, () => this.#y(e) ? (e.focus(), !0) : !1, () => {})), !1;
		}
		if (n?.startsWith("dom=")) {
			let t = f.getHtmlElmList(n);
			if (t.el.length === 0 && s(e, "need_err", !0)) throw `HTML内にセレクタ（${t.sel}）に対応する要素が見つかりません。存在しない場合を許容するなら、need_err=false と指定してください`;
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
		return p.isSkipping ? !0 : Object.keys(this.#x).some((e) => this.#x[e] === 2);
	}
	#x = {
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
export { M as EventMng };

//# sourceMappingURL=EventMng.js.map