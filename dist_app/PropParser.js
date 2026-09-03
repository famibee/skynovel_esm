import { p as e } from "./CmnLib.js";
//#region src/sn/PropParser.ts
var t = /\[[^\]]+\]/g, n = /^0x[0-9a-fA-F]+/, r = /^(0|[1-9][0-9]*)\.[0-9]+/, i = /^(0|[1-9][0-9]*)/, a = /^(true|false)/, o = /^[A-Za-z_][A-Za-z0-9_]*/, s = (e) => Object.prototype.toString.call(e) === "[object String]", c = (e) => Object.prototype.toString.call(e) === "[object Number]", l = {
	"**": {
		bp: 13,
		right: !0
	},
	"*": { bp: 12 },
	"/": { bp: 12 },
	"¥": { bp: 12 },
	"%": { bp: 12 },
	"+": { bp: 11 },
	"-": { bp: 11 },
	">>>": { bp: 10 },
	"<<": { bp: 10 },
	">>": { bp: 10 },
	"<=": { bp: 9 },
	"<": { bp: 9 },
	">=": { bp: 9 },
	">": { bp: 9 },
	"===": { bp: 8 },
	"!==": { bp: 8 },
	"==": { bp: 8 },
	"!=": { bp: 8 },
	"&": { bp: 7 },
	"^": { bp: 6 },
	"|": { bp: 5 },
	"&&": { bp: 4 },
	"||": { bp: 3 },
	":": {
		bp: 2,
		right: !0
	},
	"?": {
		bp: 1,
		right: !0
	}
}, u = class u {
	val;
	#e;
	#t;
	#n = /^(?:(?:tmp|sys|save|mp):)?[^\s!-/:-@[-^`{-~]+(?:\.[^\s!-/:-@[-^`{-~]+|\[[^\]]+\])*/;
	constructor(e, t = "\\") {
		this.val = e, this.#e = t, this.#t = RegExp(`^(?:"(?:\\${t}["'#\\n]|[^"])*"|'(?:\\${t}["'#\\n]|[^'])*'|\\#(?:\\${t}["'#\\n]|[^#])*\\#)`);
	}
	#r(t) {
		let s = [], c = 0;
		for (; c < t.length;) {
			let l = t.charCodeAt(c);
			if (l === 32 || l === 9 || l === 10 || l === 13) {
				++c;
				continue;
			}
			let u = t.slice(c), d;
			if ((d = n.exec(u)) || (d = r.exec(u))) {
				s.push({
					t: "NUM",
					v: ["!num!", Number(d[0])]
				}), c += d[0].length;
				continue;
			}
			if (d = i.exec(u)) {
				s.push({
					t: "NUM",
					v: ["!num!", e(d[0])]
				}), c += d[0].length;
				continue;
			}
			if (u.startsWith("null")) {
				s.push({
					t: "NULL",
					v: ["!str!", null]
				}), c += 4;
				continue;
			}
			if (d = a.exec(u)) {
				s.push({
					t: "BOOL",
					v: ["!bool!", d[0] === "true"]
				}), c += d[0].length;
				continue;
			}
			if (d = this.#t.exec(u)) {
				s.push({
					t: "STR",
					v: ["!str!", d[0].slice(1, -1).replaceAll(this.#e, "")]
				}), c += d[0].length;
				continue;
			}
			let f = u.slice(0, 3);
			if (f === ">>>" || f === "===" || f === "!==") {
				s.push({ t: f }), c += 3;
				continue;
			}
			let p = u.slice(0, 2);
			if ([
				"**",
				"++",
				"--",
				">>",
				"<<",
				"<=",
				">=",
				"==",
				"!=",
				"&&",
				"||"
			].includes(p)) {
				s.push({ t: p }), c += 2;
				continue;
			}
			let m = u.charAt(0);
			if ("()!~*/%+-<>&^|:?¥".includes(m)) {
				s.push({ t: m }), ++c;
				continue;
			}
			let h = o.exec(u);
			if (h && u.charAt(h[0].length) === "(") {
				s.push({
					t: "FUNC",
					v: h[0]
				}), c += h[0].length;
				continue;
			}
			if (d = this.#n.exec(u)) {
				let e = d[0];
				u.slice(e.length, e.length + 4) === "@str" && (e += "@str"), s.push({
					t: "VAR",
					v: e
				}), c += e.length;
				continue;
			}
			throw Error(`(PropParser)不明な文字【${m}】です`);
		}
		return s;
	}
	#i(e) {
		let t = this.#r(e), n = 0, r = () => t[n], i = () => {
			let e = t[n++];
			if (!e) throw Error("(PropParser)式が終端しています");
			switch (e.t) {
				case "NUM":
				case "NULL":
				case "BOOL":
				case "STR": return e.v;
				case "VAR": return this.#a(e.v);
				case "FUNC": {
					if (r()?.t !== "(") throw Error("(PropParser)関数呼び出しには開き括弧「(」が要ります");
					++n;
					let t = s(0);
					if (r()?.t !== ")") throw Error("(PropParser)関数呼び出しの閉じ括弧「)」がありません");
					return ++n, [e.v, t];
				}
				case "(": {
					let e = s(0);
					if (r()?.t !== ")") throw Error("(PropParser)閉じ括弧「)」がありません");
					return ++n, e;
				}
				default: throw Error(`(PropParser)想定外のトークン【${e.t}】です`);
			}
		}, a = () => {
			let e = i();
			for (;;) {
				let t = r()?.t;
				if (t === "++") {
					++n, e = ["PostfixInc", e];
					continue;
				}
				if (t === "--") {
					++n, e = ["PostfixDec", e];
					continue;
				}
				break;
			}
			return e;
		}, o = () => {
			let e = r()?.t;
			return e === "!" ? (++n, ["!", o()]) : e === "~" ? (++n, ["~", o()]) : e === "++" ? (++n, ["PrefixInc", o()]) : e === "--" ? (++n, ["PrefixDec", o()]) : e === "-" ? (++n, ["UnaryNegate", o()]) : a();
		}, s = (e) => {
			let t = o();
			for (;;) {
				let i = r(), a = i && l[i.t];
				if (!a || a.bp < e) break;
				++n;
				let o = s(a.right ? a.bp : a.bp + 1);
				t = [
					i.t,
					t,
					o
				];
			}
			return t;
		}, c = s(0);
		if (n !== t.length) throw Error("(PropParser)余分なトークンが残っています");
		return c;
	}
	#a(e) {
		let n = e.replaceAll(t, (e) => "." + this.parse(e.slice(1, -1))), r = this.val.getVal(n);
		return r == null ? ["!str!", r] : typeof r == "boolean" ? ["!bool!", r] : s(r) ? ["!str!", String(r)] : ["!num!", Number(r)];
	}
	parse(e) {
		let t;
		try {
			t = this.#i(e);
		} catch {
			throw Error(`(PropParser)文法エラー【${e}】`);
		}
		return t[0] === "!str!" ? this.#d(t[1]) : this.#o(t);
	}
	#o(e) {
		let t = e.shift();
		if (t instanceof Array) return this.#o(t);
		let n = this.#c[t];
		return n ? n(e) : Object(null);
	}
	#s = (e) => (t) => e(Number(this.#o(t.shift())), Number(this.#o(t.shift())));
	#c = {
		"!num!": (e) => e.shift(),
		"!str!": (e) => this.#d(e.shift()),
		"!bool!": (e) => e.shift(),
		PostfixInc: (e) => {
			throw Error("(PropParser)後置インクリメントは未サポートです");
		},
		PostfixDec: (e) => {
			throw Error("(PropParser)後置デクリメントは未サポートです");
		},
		PrefixInc: (e) => {
			throw Error("(PropParser)前置インクリメントは未サポートです");
		},
		PrefixDec: (e) => {
			throw Error("(PropParser)前置デクリメントは未サポートです");
		},
		"!": (e) => !this.#c.Boolean(e),
		"~": (e) => ~Number(this.#o(e.shift())),
		UnaryNegate: (e) => -this.#c.Number(e),
		"**": this.#s((e, t) => e ** t),
		"*": this.#s((e, t) => e * t),
		"/": this.#s((e, t) => e / t),
		"¥": (e) => Math.floor(this.#c["/"](e)),
		"%": this.#s((e, t) => e % t),
		"+": (e) => {
			let t = this.#o(e.shift()), n = this.#o(e.shift());
			return s(t) || s(n) ? String(t) + String(n) : Number(t) + Number(n);
		},
		"-": this.#s((e, t) => e - t),
		int: (t) => e(this.#l(t.shift())),
		parseInt: (t) => e(this.#c.Number(t)),
		Number: (e) => {
			let t = this.#o(e.shift());
			return s(t) ? this.#l(this.#i(String(t))) : Number(t);
		},
		Boolean: (e) => {
			let t = e.shift();
			return t[0] === "!bool!" ? !!t[1] : !!this.#o(t);
		},
		ceil: (e) => Math.ceil(this.#l(e.shift())),
		floor: (e) => Math.floor(this.#l(e.shift())),
		round: (e) => Math.round(this.#l(e.shift())),
		isNaN: (e) => Number.isNaN(this.#l(e.shift())),
		"<<": this.#s((e, t) => e << t),
		">>": this.#s((e, t) => e >> t),
		">>>": this.#s((e, t) => e >>> t),
		"<": this.#s((e, t) => e < t),
		"<=": this.#s((e, t) => e <= t),
		">": this.#s((e, t) => e > t),
		">=": this.#s((e, t) => e >= t),
		"==": (e) => {
			let t = this.#o(e.shift()), n = this.#o(e.shift());
			return t == null && n == null ? t == n : String(t) === String(n);
		},
		"!=": (e) => !this.#c["=="](e),
		"===": (e) => {
			let t = this.#o(e.shift()), n = this.#o(e.shift());
			return Object.prototype.toString.call(t) == Object.prototype.toString.call(n) && String(t) === String(n);
		},
		"!==": (e) => !this.#c["==="](e),
		"&": this.#s((e, t) => e & t),
		"^": this.#s((e, t) => e ^ t),
		"|": this.#s((e, t) => e | t),
		"&&": (e) => String(this.#o(e.shift())) === "true" && String(this.#o(e.shift())) === "true",
		"||": (e) => String(this.#o(e.shift())) === "true" || String(this.#o(e.shift())) === "true",
		"?": (e) => {
			let t = this.#c.Boolean(e), n = e.shift();
			if (n[0] !== ":") throw Error("(PropParser)三項演算子の文法エラーです。: が見つかりません");
			return this.#o(n[t ? 1 : 2]);
		},
		":": () => {
			throw Error("(PropParser)三項演算子の文法エラーです。? が見つかりません");
		}
	};
	#l(e) {
		let t = this.#o(e);
		if (!c(t)) throw Error("(PropParser)引数【" + String(t) + "】が数値ではありません");
		return Number(t);
	}
	#u = /(\$((tmp|sys|save|mp):)?[^\s!--/:-@[-^`{-~]+|#\{[^}]+})/g;
	#d(e) {
		return e == null ? e : String(e).replaceAll(this.#u, (e) => String(e.startsWith("$") ? this.val.getVal(e.slice(1)) : this.parse(e.slice(2, -1))));
	}
	getValAmpersand = (e) => e.startsWith("&") ? String(this.parse(e.slice(1))) : e;
	static #f = /^((?<scope>\w+?):)?(?<name>[^\s :@]+)(?<at>@str)?$/;
	static getValName(e) {
		let t = this.#f.exec(e.trim())?.groups;
		if (!t) return null;
		let { scope: n = "tmp", name: r, at: i = "" } = t;
		if (!u.#p.includes(n)) throw `[変数に値セット] scopeが異常【${n}】です`;
		return {
			scope: n,
			name: u.#m(r),
			at: i
		};
	}
	static #p = [
		"tmp",
		"sys",
		"save",
		"mp"
	];
	static #m(e) {
		let t = 0, n = 0, r = e;
		for (;;) {
			if (t = r.indexOf("[\""), t < 0) {
				if (t = r.indexOf("['"), t < 0) break;
				n = r.indexOf("']", t + 2);
			} else n = r.indexOf("\"]", t + 2);
			if (n < 0) break;
			r = r.slice(0, t) + "." + r.slice(t + 2, n) + r.slice(n + 2), t = n - 2;
		}
		return r;
	}
};
//#endregion
export { u as PropParser };

//# sourceMappingURL=PropParser.js.map