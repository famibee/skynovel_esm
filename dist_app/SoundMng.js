import { _ as e, l as t, s as n } from "./CmnLib.js";
import { n as r, t as i } from "./SndBuf.js";
//#region src/sn/SoundMng.ts
var a = class {
	val;
	#e = {};
	#t(e) {
		return this.#e[e];
	}
	constructor(t, n, r, a, o) {
		this.val = r, n.volume = (e) => this.#r(e), n.fadebgm = (e) => this.#s(e), n.fadeoutbgm = (e) => this.#a(e), n.fadeoutse = (e) => this.#o(e), n.fadese = (e) => this.#c(e), n.playbgm = (e) => this.#l(e), n.playse = (e) => this.#u(e), n.stop_allse = () => this.#f(), n.stopbgm = (e) => this.#p(e), n.stopse = (e) => this.#m(e), n.wb = (e) => this.#h(e), n.wf = (e) => this.#g(e), n.stopfadese = () => !1, n.wl = (e) => this.#_(e), n.ws = (e) => this.#v(e), n.xchgbuf = (e) => this.#y(e), r.setVal_Nochk("save", "const.sn.loopPlaying", "{}"), r.setVal_Nochk("tmp", "const.sn.sound.codecs", e.codecs()), i.init(t, r, a, o, (e) => this.#t(e));
	}
	#n;
	setEvtMng(e) {
		this.#n = e, i.setEvtMng(e);
	}
	setNoticeChgVolume(t, n) {
		this.val.defValTrg("sys:sn.sound.global_volume", (n, r) => {
			let i = Number(r);
			e.setGlobalVol(i), t(i);
		}), this.val.defValTrg("sys:sn.sound.movie_volume", (e, t) => n(Number(t))), this.val.setVal_Nochk("sys", "sn.sound.global_volume", this.val.getVal("sys:sn.sound.global_volume", 1)), this.val.setVal_Nochk("sys", "sn.sound.movie_volume", this.val.getVal("sys:sn.sound.movie_volume", 1));
	}
	#r(e) {
		let { buf: t = "SE" } = e, n = "const.sn.sound." + t + ".volume", r = this.#i(e, 1);
		return Number(this.val.getVal("sys:" + n)) !== r && (this.val.setVal_Nochk("sys", n, r), this.val.flush(), e.time = 0, e.volume = Number(this.val.getVal("save:" + n)), this.#c(e));
	}
	#i(e, n) {
		let r = t(e, "volume", n);
		return r < 0 ? 0 : r > 1 ? 1 : r;
	}
	#a(e) {
		return e.volume = 0, this.#s(e);
	}
	#o(e) {
		return e.volume = 0, this.#c(e);
	}
	#s(e) {
		return e.buf = "BGM", this.#c(e);
	}
	#c(e) {
		let { buf: t = "SE" } = e;
		return this.#e[t]?.fade(e), !1;
	}
	#l(e) {
		return e.buf = "BGM", e.canskip = !1, n(e, "loop", !0), this.#u(e);
	}
	#u(e) {
		let { buf: t = "SE" } = e;
		if (this.#m({ buf: t }), n(e, "canskip", !0) && this.#n.isSkipping) return !1;
		this.#d();
		let r = n(e, "join", !0);
		return this.#e[t] = i.generate(e, t, r), r;
	}
	#d = () => {
		e.setGlobalVol(Number(this.val.getVal("sys:sn.sound.global_volume", 1))), this.#d = () => {};
	};
	#f() {
		for (let e of Object.keys(this.#e)) this.#m({ buf: e });
		return this.#e = {}, !1;
	}
	#p(e) {
		return e.buf = "BGM", this.#m(e);
	}
	#m(e) {
		let { buf: t = "SE" } = e;
		return this.#e[t]?.stopse(), !1;
	}
	#h(e) {
		return e.buf = "BGM", this.#g(e);
	}
	#g(e) {
		let { buf: t = "SE" } = e;
		return this.#e[t]?.wf(e) ?? !1;
	}
	#_(e) {
		return e.buf = "BGM", this.#v(e);
	}
	#v(e) {
		let { buf: t = "SE" } = e;
		return this.#e[t]?.ws(e) ?? !1;
	}
	#y(e) {
		let { buf: t = "SE", buf2: n = "SE" } = e;
		if (t === n) return !1;
		let i = this.#e[t], a = this.#e[n];
		return i ? (this.#e[n] = i, i.buf = n) : delete this.#e[n], a ? (this.#e[t] = a, a.buf = t) : delete this.#e[t], r(e), !1;
	}
	playLoopFromSaveObj(e) {
		let t = String(this.val.getVal("save:const.sn.loopPlaying", "{}"));
		if (t === "{}") return this.#f(), [];
		let n = JSON.parse(t);
		if (e) this.#f();
		else for (let [e, t] of Object.entries(this.#e)) e in n || t.stopse();
		return Object.entries(n).map(([t, n]) => new Promise((r) => {
			let i = this.#e[t];
			if (!e && i && i.fn === n) {
				r();
				return;
			}
			let a = "save:const.sn.sound." + t + ".", o = {
				fn: n,
				buf: t,
				join: !1,
				loop: !0,
				volume: Number(this.val.getVal(a + "volume")),
				start_ms: Number(this.val.getVal(a + "start_ms")),
				end_ms: Number(this.val.getVal(a + "end_ms")),
				ret_ms: Number(this.val.getVal(a + "ret_ms")),
				fnc: r
			};
			o.buf === "BGM" ? this.#l(o) : this.#u(o);
		}));
	}
	destroy() {
		this.#f();
	}
};
//#endregion
export { a as SoundMng };

//# sourceMappingURL=SoundMng.js.map