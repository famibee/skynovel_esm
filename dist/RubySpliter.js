//#region src/sn/RubySpliter.ts
var e = /^\w+｜{"/, t = /^\*.?$/, n = class n {
	static #e = "ヽ";
	static setting(e) {
		e.sesame && (n.#e = e.sesame);
	}
	static getSesame() {
		return n.#e;
	}
	static destroy() {
		n.#e = "ヽ";
	}
	#t = () => {};
	init(e) {
		this.#t = e;
	}
	static #n;
	static setEscape(e) {
		n.#n = RegExp((e ? `(?<ce>\\${e}\\S)|` : "") + n.#r, "gs");
	}
	static #r = "｜(?<str>[^《\\n]+)《(?<ruby>[^》\\n]+)》|(?:(?<kan>[⺀-⿟々〇〻㐀-鿿豈-﫿]+[ぁ-ヿ]*|[^　｜《》\\n])《(?<kan_ruby>[^》\\n]+)》)|(?<txt>[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[^｜《》]+?|.)";
	putTxt(e) {
		for (let { groups: t } of e.matchAll(n.#n)) {
			let { ruby: e, kan_ruby: n, kan: r = "", ce: i, txt: a = "", str: o = "" } = t;
			if (e) {
				this.putTxtRb(decodeURIComponent(o), e);
				continue;
			}
			if (n) {
				this.putTxtRb(r, n);
				continue;
			}
			if (i) {
				this.#t(i.slice(1), "");
				continue;
			}
			for (let e of Array.from(a)) this.#t(e, "");
		}
	}
	putTxtRb(r, i) {
		if (e.test(i)) {
			this.#t(r, i);
			return;
		}
		let a = Array.from(r), o = a.length;
		if (t.test(i)) {
			let e = "center｜" + (i === "*" ? n.#e : i.charAt(1));
			for (let t of a) this.#t(t, e);
			return;
		}
		if (o === 1 || !i.includes(" ")) {
			this.#t(r, decodeURIComponent(i));
			return;
		}
		let s = i.split(" "), c = s.length, l = c > o ? c : o;
		for (let e = 0; e < l; ++e) this.#t(e < o ? a[e] : "", e < c ? decodeURIComponent(s[e]) : "");
	}
};
//#endregion
export { n as t };

//# sourceMappingURL=RubySpliter.js.map