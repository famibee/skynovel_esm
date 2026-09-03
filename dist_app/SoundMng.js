import { _ as e, s as t } from "./CmnLib.js";
import { n, r, t as i } from "./SndBuf.js";
//#region src/sn/SoundMng.ts
var a = class {
	val;
	#e = {};
	#t(e) {
		return this.#e[e];
	}
	constructor(t, n, r, a, o) {
		this.val = r, n.volume = (e) => this.#r(e), n.fadebgm = (e) => this.#o(e), n.fadeoutbgm = (e) => this.#i(e), n.fadeoutse = (e) => this.#a(e), n.fadese = (e) => this.#s(e), n.playbgm = (e) => this.#c(e), n.playse = (e) => this.#l(e), n.stop_allse = () => this.#d(), n.stopbgm = (e) => this.#f(e), n.stopse = (e) => this.#p(e), n.wb = (e) => this.#m(e), n.wf = (e) => this.#h(e), n.stopfadese = () => !1, n.wl = (e) => this.#g(e), n.ws = (e) => this.#_(e), n.xchgbuf = (e) => this.#v(e), r.setVal_Nochk("save", "const.sn.loopPlaying", "{}"), r.setVal_Nochk("tmp", "const.sn.sound.codecs", e.codecs()), i.init(t, r, a, o, (e) => this.#t(e));
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
		let { buf: t = "SE" } = e, r = "const.sn.sound." + t + ".volume", i = n(e, 1);
		return Number(this.val.getVal("sys:" + r)) !== i && (this.val.setVal_Nochk("sys", r, i), this.val.flush(), e.time = 0, e.volume = Number(this.val.getVal("save:" + r)), this.#s(e));
	}
	#i(e) {
		return e.volume = 0, this.#o(e);
	}
	#a(e) {
		return e.volume = 0, this.#s(e);
	}
	#o(e) {
		return e.buf = "BGM", this.#s(e);
	}
	#s(e) {
		let { buf: t = "SE" } = e;
		return this.#e[t]?.fade(e), !1;
	}
	#c(e) {
		return e.buf = "BGM", e.canskip = !1, t(e, "loop", !0), this.#l(e);
	}
	#l(e) {
		let { buf: n = "SE" } = e;
		if (this.#p({ buf: n }), t(e, "canskip", !0) && this.#n.isSkipping) return !1;
		this.#u();
		let r = t(e, "join", !0);
		return this.#e[n] = i.generate(e, n, r), r;
	}
	#u = () => {
		e.setGlobalVol(Number(this.val.getVal("sys:sn.sound.global_volume", 1))), this.#u = () => {};
	};
	#d() {
		for (let e of Object.keys(this.#e)) this.#p({ buf: e });
		return this.#e = {}, !1;
	}
	#f(e) {
		return e.buf = "BGM", this.#p(e);
	}
	#p(e) {
		let { buf: t = "SE" } = e;
		return this.#e[t]?.stopse(), !1;
	}
	#m(e) {
		return e.buf = "BGM", this.#h(e);
	}
	#h(e) {
		let { buf: t = "SE" } = e;
		return this.#e[t]?.wf(e) ?? !1;
	}
	#g(e) {
		return e.buf = "BGM", this.#_(e);
	}
	#_(e) {
		let { buf: t = "SE" } = e;
		return this.#e[t]?.ws(e) ?? !1;
	}
	#v(e) {
		let { buf: t = "SE", buf2: n = "SE" } = e;
		if (t === n) return !1;
		let i = this.#e[t], a = this.#e[n];
		return i ? (this.#e[n] = i, i.buf = n) : delete this.#e[n], a ? (this.#e[t] = a, a.buf = t) : delete this.#e[t], r(e), !1;
	}
	playLoopFromSaveObj(e) {
		let t = String(this.val.getVal("save:const.sn.loopPlaying", "{}"));
		if (t === "{}") return this.#d(), [];
		let n = JSON.parse(t);
		if (e) this.#d();
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
			o.buf === "BGM" ? this.#c(o) : this.#l(o);
		}));
	}
	destroy() {
		this.#d();
	}
};
//#endregion
export { a as SoundMng };

//# sourceMappingURL=SoundMng.js.map