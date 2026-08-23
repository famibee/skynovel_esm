import { _ as e, l as t, s as n } from "./CmnLib.js";
import { n as r } from "./ConfigBase.js";
import { t as i } from "./Reading.js";
var a = "VOICE", o = 999e3, s, c, l, u, d = {}, f = 1;
function p(e) {
	delete d[e];
	let t = "const.sn.sound." + e + ".";
	s.setVal_Nochk("save", t + "fn", ""), s.setVal_Nochk("save", "const.sn.loopPlaying", JSON.stringify(d)), s.flush();
}
function m(e, n) {
	let r = t(e, "volume", n);
	return r < 0 ? 0 : r > 1 ? 1 : r;
}
function h({ buf: e = "SE", buf2: t = "SE" }) {
	if (e === t) throw `[xchgbuf] buf:${e} が同じ値です`;
	let n = "const.sn.sound." + e + ".", r = Number(s.getVal("save:" + n + "volume")), i = String(s.getVal("save:" + n + "fn")), a = "const.sn.sound." + t + ".", o = Number(s.getVal("save:" + a + "volume")), c = String(s.getVal("save:" + a + "fn"));
	s.setVal_Nochk("save", n + "volume", o), s.setVal_Nochk("save", a + "volume", r), s.setVal_Nochk("save", n + "fn", c), s.setVal_Nochk("save", a + "fn", i);
	let l = e in d, u = t in d;
	(l || u) && (u ? d[e] = c : delete d[e], l ? d[t] = i : delete d[t], s.setVal_Nochk("save", "const.sn.loopPlaying", JSON.stringify(d))), s.flush();
}
var g = class h {
	hArg;
	fn;
	procID;
	join;
	start_ms;
	end_ms;
	ret_ms;
	loop;
	pan;
	speed;
	static #e;
	static #t;
	static init(e, t, n, r, i) {
		d = {}, h.#e = e, s = t, c = (e, t) => n.errScript(e, t), h.#t = r, l = i;
	}
	static setEvtMng(e) {
		u = e;
	}
	static generate = (e, r, a) => new h(e, r, e.fn ?? "", i.procID, a, t(e, "start_ms", 0), t(e, "end_ms", o), t(e, "ret_ms", 0), n(e, "loop", !1), t(e, "pan", 0), t(e, "speed", 1));
	static live = /* @__PURE__ */ new Set();
	stt = new _(this);
	buf;
	constructor(t, n, o, u, g, _, v, y, b, x, S) {
		if (this.hArg = t, this.fn = o, this.procID = u, this.join = g, this.start_ms = _, this.end_ms = v, this.ret_ms = y, this.loop = b, this.pan = x, this.speed = S, this.buf = n, !o) throw `fnは必須です buf:${n}`;
		if (_ < 0) throw `[${t[":タグ名"] ?? ""}] start_ms:${String(_)} が負の値です`;
		if (y < 0) throw `[${t[":タグ名"] ?? ""}] ret_ms:${String(y)} が負の値です`;
		if (0 < v) {
			if (v <= _) throw `[${t[":タグ名"] ?? ""}] start_ms:${String(_)} >= end_ms:${String(v)} は異常値です`;
			if (v <= y) throw `[${t[":タグ名"] ?? ""}] ret_ms:${String(y)} >= end_ms:${String(v)} は異常値です`;
		}
		let C = "const.sn.sound." + n + ".";
		s.setVal_Nochk("save", C + "fn", o);
		let w = m(t, 1);
		s.setVal_Nochk("save", C + "volume", w);
		let T = w * Number(s.getVal("sys:" + C + "volume", 1, !0));
		switch (n) {
			case a:
				{
					if ((f = Number(s.getVal("sys:sn.sound.BGM.vol_mul_talking") ?? 1)) === 1) break;
					let e = l("BGM"), t = "const.sn.sound.BGM.volume";
					e && (e.volume = Number(s.getVal("save:" + t, 1)) * Number(s.getVal("sys:" + t, 1, !0)) * f);
				}
				break;
			case "BGM": T *= f;
		}
		b ? (d[n] = o, s.setVal_Nochk("save", "const.sn.loopPlaying", JSON.stringify(d))) : p(n), s.setVal_Nochk("save", C + "start_ms", _), s.setVal_Nochk("save", C + "end_ms", v), s.setVal_Nochk("save", C + "ret_ms", y), s.setVal_Nochk("tmp", C + "playing", !0), s.flush();
		let E = () => {};
		if (g) {
			let e = u + ` loaded buf:${n} fn:${o}`;
			i.beginProc(e), E = () => i.endProc(e);
		}
		this.#n = () => {
			this.#n = () => {}, E(), t.fnc?.();
		};
		let D = this.src = h.#e.searchPath(o, r.SOUND), O = e.ctx, k = this.gn = O.createGain();
		if (k.gain.value = T, this.#r = x < -1 ? -1 : x > 1 ? 1 : x, this.#r !== 0 && typeof O.createStereoPanner == "function") {
			let t = O.createStereoPanner();
			t.pan.value = this.#r, k.connect(t), t.connect(e.master);
		} else k.connect(e.master);
		h.live.add(this);
		let A = D.endsWith(".bin"), j = () => h.#t.fetch(D).then((e) => {
			if (!e.ok) throw `fetch失敗 ${String(e.status)} ${e.statusText}`;
			return e.arrayBuffer();
		}), M = A ? () => j().then((e) => h.#t.decAB(e)).then((e) => e) : j;
		e.decode(D, M).then((e) => {
			this.#n(), !this.#i && this.#u(e);
		}).catch((e) => {
			this.#n(), !this.#i && (c(`SndBuf 音声のデコードに失敗しました fn:${o} ${String(e)}`, !1), this.unload());
		});
	}
	#n = () => {};
	src;
	gn;
	#r = 0;
	#i = !1;
	#a = void 0;
	#o = void 0;
	#s = 0;
	#c = void 0;
	#l = void 0;
	#u(t) {
		this.#a = t;
		let n = t.duration * 1e3, r = this.end_ms;
		r === o ? r = n : r < 0 && (r = n + r), this.#s = r;
		let { hArg: i, start_ms: a, ret_ms: s, loop: l } = this, u = i[":タグ名"] ?? "";
		n <= a && c(`[${u}] 音声ファイル再生時間:${String(n)} <= start_ms:${String(a)} は異常値です`), r <= a && c(`[${u}] end_ms:${String(this.end_ms)}(${String(r)}) <= start_ms:${String(a)} は異常値です`), l && (n <= s && c(`[${u}] 音声ファイル再生時間:${String(n)} <= ret_ms:${String(s)} は異常値です`), r <= s && c(`[${u}] end_ms:${String(this.end_ms)}(${String(r)}) <= ret_ms:${String(s)} は異常値です`)), this.end_ms !== o && n <= r && c(`[${u}] 音声ファイル再生時間:${String(n)} <= end_ms:${String(this.end_ms)} は異常値です`);
		let d = e.ctx, f = this.#o = d.createBufferSource();
		f.buffer = t, f.playbackRate.value = this.speed, f.loop = l, l ? (f.loopStart = s / 1e3, f.loopEnd = Math.max(r, s + 1) / 1e3) : f.onended = () => {
			this.#o = void 0, this.stt.onend();
		}, f.connect(this.gn);
		let p = a / 1e3;
		l ? f.start(0, p) : (f.start(0, p, Math.max(0, r - a) / 1e3), e.needClick2Play() && (this.#c = setTimeout(() => {
			this.#c = void 0, this.#o = void 0, this.stt.onend();
		}, Math.max(0, (r - a) / this.speed)))), this.stt = new v(this);
	}
	startFade(t, n, r, i) {
		this.#l &&= (clearTimeout(this.#l), void 0);
		let a = e.ctx.currentTime, o = this.gn.gain.value;
		this.gn.gain.cancelScheduledValues(a), this.gn.gain.setValueAtTime(o, a);
		let s = a + r / 1e3;
		this.gn.gain.setValueAtTime(o, s), this.gn.gain.linearRampToValueAtTime(t, s + n / 1e3), this.#l = setTimeout(() => {
			this.#l = void 0, i();
		}, r + n);
	}
	unload() {
		if (this.#i = !0, h.live.delete(this), this.#c &&= (clearTimeout(this.#c), void 0), this.#l &&= (clearTimeout(this.#l), void 0), this.#o) {
			try {
				this.#o.stop();
			} catch {}
			this.#o.disconnect(), this.#o = void 0;
		}
		this.gn.disconnect();
	}
	stopse() {
		this.stt.stopse();
	}
	ws = (e) => this.stt.ws(e);
	fade = (e) => this.stt.fade(e);
	wf = (e) => this.stt.wf(e);
	get volume() {
		return this.gn.gain.value;
	}
	set volume(t) {
		this.#l &&= (clearTimeout(this.#l), void 0);
		let n = e.ctx.currentTime;
		this.gn.gain.cancelScheduledValues(n), this.gn.gain.setValueAtTime(t, n);
	}
	get duration() {
		return this.#a?.duration ?? 0;
	}
	get playing() {
		return this.#o !== void 0;
	}
	get effPan() {
		return this.#r;
	}
	get startMs() {
		return this.start_ms;
	}
	get endMs() {
		return this.#s;
	}
	get retMs() {
		return this.ret_ms;
	}
}, _ = class {
	sb;
	constructor(e) {
		this.sb = e;
	}
	onend() {
		this.stopse();
	}
	onfade() {}
	stopse() {
		this.sb.stt = new S(this.sb);
	}
	ws = () => !1;
	fade() {}
	wf = () => !1;
}, v = class {
	sb;
	constructor(e) {
		this.sb = e;
	}
	onend() {
		this.stopse();
	}
	onfade() {}
	stopse() {
		this.sb.stt = new S(this.sb);
	}
	ws(e) {
		let { sb: t } = this;
		if (t.loop) return !1;
		t.stt = new y(t);
		let r = n(e, "canskip", !1), a = n(e, "stop", !0) ? () => t.stt.stopse() : () => {};
		return r && u.isSkipping ? (a(), !1) : (i.beginProc(t.procID + "ws", a, !0, r ? a : void 0), !0);
	}
	fade(e) {
		let { buf: r = "SE" } = e, i = "const.sn.sound." + r + ".volume", a = m(e, NaN);
		s.setVal_Nochk("save", i, a);
		let o = a * Number(s.getVal("sys:" + i, 1)), c = n(e, "stop", a === 0);
		c && p(r), s.flush();
		let l = t(e, "time", NaN), d = t(e, "delay", 0), { sb: f } = this;
		if (l === 0 && d === 0 || u.isSkipping) {
			f.volume = o, c && (f.stt = new S(f));
			return;
		}
		f.stt = new b(f, c), f.startFade(o, l, d, () => f.stt.onfade());
	}
	wf = () => !1;
}, y = class {
	sb;
	constructor(e) {
		this.sb = e;
	}
	onend() {
		this.stopse();
	}
	onfade() {}
	stopse() {
		this.sb.stt = new S(this.sb), i.notifyEndProc(this.sb.procID + "ws");
	}
	ws = () => !1;
	fade() {}
	wf = () => !1;
}, b = class {
	sb;
	stopOnFade;
	constructor(e, t) {
		this.sb = e, this.stopOnFade = t;
	}
	onend() {
		this.stopse();
	}
	onfade() {
		this.stopOnFade ? this.stopse() : this.sb.stt = new v(this.sb);
	}
	stopse() {
		this.sb.stt = new S(this.sb);
	}
	ws = () => !1;
	fade() {}
	wf(e) {
		let { sb: t } = this;
		t.stt = new x(t, this.stopOnFade);
		let r = n(e, "canskip", !1);
		if (r && u.isSkipping) return !1;
		let a = () => {};
		return i.beginProc(t.procID + "wf", a, !0, r ? a : void 0), !0;
	}
}, x = class {
	sb;
	stopOnFade;
	constructor(e, t) {
		this.sb = e, this.stopOnFade = t;
	}
	onend() {
		this.onfade();
	}
	onfade() {
		this.stopOnFade ? this.stopse() : this.sb.stt = new v(this.sb), i.notifyEndProc(this.sb.procID + "wf");
	}
	stopse() {
		this.sb.stt = new S(this.sb);
	}
	ws = () => !1;
	fade() {}
	wf = () => !1;
}, S = class {
	constructor(e) {
		e.loop && p(e.buf);
		let t = "const.sn.sound." + e.buf + ".";
		if (s.setVal_Nochk("tmp", t + "playing", !1), s.flush(), e.unload(), e.buf !== a) return;
		let n = l("BGM");
		n && (n.volume = Number(s.getVal("save:" + t + "volume", 1, !0)) * Number(s.getVal("sys:" + t + "volume", 1, !0))), f = 1;
	}
	onend() {}
	onfade() {}
	stopse() {}
	ws = () => !1;
	fade() {}
	wf = () => !1;
};
//#endregion
export { h as n, g as t };

//# sourceMappingURL=SndBuf.js.map