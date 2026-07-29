import { v as e } from "./pixi.js";
//#region src/sn/EventListenerCtn.ts
var t = class {
	#e = /* @__PURE__ */ new Set();
	add(t, n, r, i = {}) {
		let a;
		return t instanceof e.default ? (t.on(n, r, i), a = () => {
			t.off(n, r, i);
		}) : (t.addEventListener(n, r, i), a = () => {
			t.removeEventListener(n, r, { capture: i.capture ?? !1 });
		}), this.#e.add(a), () => {
			this.#e.delete(a) && a();
		};
	}
	clear() {
		for (let e of this.#e) e();
		this.#e.clear();
	}
	get isEmpty() {
		return this.#e.size === 0;
	}
};
//#endregion
export { t };

//# sourceMappingURL=EventListenerCtn.js.map