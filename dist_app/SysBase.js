import { i as e, s as t, t as n } from "./CmnLib.js";
import { n as r } from "./CmnInterface.js";
import { t as i } from "./EventListenerCtn.js";
import { n as a } from "./ConfigBase.js";
//#region src/sn/SysBase.ts
var o = class o {
	hPlg;
	arg;
	elc = new i();
	hFactoryCls = {};
	constructor(e = {}, t) {
		this.hPlg = e, this.arg = t;
	}
	destroy() {
		this.elc.clear(), this.#e && (clearTimeout(this.#e), this.#e = void 0, this.#t && (this.#t = !1, this.flushSub())), this.#p = [];
	}
	async loaded(...[e]) {
		let t = e.snsys_pre;
		return delete e.snsys_pre, t?.init({
			getInfo: this.#n,
			addTag: () => {},
			addLayCls: () => {},
			searchPath: () => "",
			getVal: () => ({}),
			resume: () => {},
			render: () => {},
			setDec: (e) => {
				this.dec = e;
			},
			setDecAB: (e) => {
				this.#_ = e;
			},
			setEnc: (e) => {
				this.enc = e;
			},
			getStK: (e) => {
				this.stk = e;
			},
			getHash: (e) => {
				this.hash = e;
			}
		});
	}
	main = void 0;
	cfg;
	setMain(e, t) {
		this.main = e, this.cfg = t;
	}
	async run() {
		let [{ Main: e }, { TxtLayer: t }, { GrpLayer: n }] = await Promise.all([
			import("./Main.js").then((e) => e.t),
			import("./TxtLayer.js"),
			import("./GrpLayer.js")
		]);
		this.hFactoryCls = {
			grp: () => new n(),
			txt: () => new t()
		}, this.run = async () => {
			this.main?.destroy(), this.main = await e.generate(this);
		}, await this.run();
	}
	stop() {
		this.main?.destroy(), this.main = void 0;
	}
	fetch = (e, t) => fetch(e, t);
	data = {
		sys: r(),
		mark: {},
		kidoku: {}
	};
	async initVal(e, t) {}
	flush() {
		if (this.#e) {
			this.#t = !0;
			return;
		}
		this.flushSub(), this.#e = setTimeout(() => {
			this.#e = void 0, this.#t && (this.#t = !1, this.flush());
		}, 500);
	}
	#e = void 0;
	#t = !1;
	flushSub() {}
	val;
	init(e, t, r) {
		let i = [];
		this.val = r;
		let o = "";
		return i.push(r.init().then(() => {
			o = "sys", o += String(r.getVal("sys:TextLayer.Back.Alpha", 1)), o = "kidoku", r.saveKidoku();
		}).catch((e) => console.error(`セーブデータ（${o}）が壊れています。一度クリアする必要があります(b) %o`, e))), e.close = (e) => this.close(e), e.export = (e) => this._export(e), e.import = (e) => this._import(e), e.navigate_to = (e) => this.navigate_to(e), e.title = (e) => this.title(e), e.toggle_full_screen = (e) => this.#h(e), e.update_check = (e) => this.update_check(e), e.window = (e) => this.window(e), e.title({ text: this.cfg.oCfg.book.title || "SKYNovel" }), r.defTmp("const.sn.isApp", () => this.isApp), r.defTmp("const.sn.isDbg", () => n.isDbg), r.defTmp("const.sn.isPackaged", () => n.isPackaged), r.defTmp("const.sn.needClick2Play", () => n.needClick2Play()), r.defTmp("const.sn.displayState", () => this.isFullScr), r.setVal_Nochk("sys", "const.sn.cfg.ns", this.cfg.oCfg.save_ns), r.flush(), n.isDbg && this.attach_debug(this.main), [...i, ...Object.values(this.hPlg).map((n) => n.init({
			getInfo: this.#n,
			addTag: (t, n) => {
				if (t in e) throw `すでに定義済みのタグ[${t}]です`;
				e[t] = n;
			},
			addLayCls: (e, t) => {
				if (e in this.hFactoryCls) throw `すでに定義済みのレイヤcls【${e}】です`;
				this.hFactoryCls[e] = t;
			},
			searchPath: (e, t = a.DEFAULT) => this.cfg.searchPath(e, t),
			getVal: (e, t) => r.getVal(e, t),
			resume: () => this.main?.resume(),
			render: (e, n, r = !1) => t.renderer.render(e, {
				...n ? { renderTexture: n } : {},
				clear: r
			}),
			setDec: () => {},
			setDecAB: () => {},
			setEnc: () => {},
			getStK: () => {},
			getHash: () => {}
		}))];
	}
	#n = () => ({ window: {
		width: n.stageW,
		height: n.stageH
	} });
	#r = 0;
	#i = 0;
	#a = 1;
	#o = 0;
	#s = 0;
	#c = 0;
	#l = 0;
	get cvsWidth() {
		return this.#r;
	}
	get cvsHeight() {
		return this.#i;
	}
	get cvsScale() {
		return this.#a;
	}
	get ofsLeft4elm() {
		return this.#o;
	}
	get ofsTop4elm() {
		return this.#s;
	}
	get ofsPadLeft_Dom2PIXI() {
		return this.#c;
	}
	get ofsPadTop_Dom2PIXI() {
		return this.#l;
	}
	isFullScr = !1;
	cvsResize() {
		if (!this.main) return;
		let e = globalThis.innerWidth, r = globalThis.innerHeight, i = this.main.cvs, a = i.parentElement !== document.body;
		if (a) {
			let t = globalThis.getComputedStyle(i);
			e = parseFloat(t.width), r = parseFloat(t.height);
		}
		if (n.isMobile) {
			let t = screen.orientation.angle % 180 == 0;
			(t && e > r || !t && e < r) && ([e, r] = [r, e]);
		}
		let o = i.getBoundingClientRect();
		if (t(n.hDip, "expanding", !0) || a || n.stageW > e || n.stageH > r) {
			if (n.stageW / n.stageH <= e / r ? (this.#i = r, this.#r = n.stageW / n.stageH * r) : (this.#r = e, this.#i = n.stageH / n.stageW * e), this.#a = this.#r / n.stageW, a) this.#c = 0, this.#l = 0;
			else {
				let t = 1 - this.#a;
				n.isMobile ? (this.#c = (e - this.#r) / 2 * t, this.#l = (r - this.#i) / 2 * t) : (this.#c = o.left * t, this.#l = o.top * t);
			}
		} else this.#r = n.stageW, this.#i = n.stageH, this.#a = 1, this.#c = 0, this.#l = 0;
		let s = i.parentElement.style;
		a || (s.position = "relative", s.width = `${String(this.#r)}px`, s.height = `${String(this.#i)}px`);
		let c = i.style;
		c.width = s.width, c.height = s.height, a ? (this.#o = o.left, this.#s = o.top) : (this.#o = 0, this.#s = 0), this.isFullScr && (this.#o += (e - this.#r) / 2, this.#s += (r - this.#i) / 2);
	}
	use4ViteElectron(e, t, n, r) {
		return !1;
	}
	attach_debug(e) {
		this.attach_debug = () => {};
		let t = document.createElement("style");
		t.innerHTML = "/* SKYNovel Dbg */\n.sn_BounceInOut { animation: sn_kfBounceInOut linear 1.5s; }\n@keyframes sn_kfBounceInOut{\n0%	{opacity: 0;	transform: scaleX(0.30) scaleY(0.30);}\n10%	{opacity: 1;	transform: scaleX(1.10) scaleY(1.10);}\n20%	{				transform: scaleX(0.95) scaleY(0.95);}\n30%	{				transform: scaleX(1.00) scaleY(1.00);}\n70%	{opacity: 1;}\n100%{opacity: 0;}\n}\n.sn_BounceIn { animation: sn_kfBounceIn linear 0.3s; }\n@keyframes sn_kfBounceIn{\n0%	{opacity: 0;	transform: scaleX(0.30) scaleY(0.30);}\n50%	{opacity: 1;	transform: scaleX(1.10) scaleY(1.10);}\n100%{				transform: scaleX(0.95) scaleY(0.95);}\n}\n.sn_HopIn { animation: sn_kfHopIn linear 0.8s; }\n@keyframes sn_kfHopIn{\n0%	{transform:	translate(0px,   0px);}\n15% {transform:	translate(0px, -25px);}\n30% {transform:	translate(0px,   0px);}\n45% {transform:	translate(0px, -15px);}\n60% {transform:	translate(0px,   0px);}\n75% {transform:	translate(0px,  -5px);}\n100%{transform:	translate(0px,   0px);}\n}", document.getElementsByTagName("head")[0].appendChild(t), this.addHook((e, t) => this.#d[e]?.(t)), this.#u = new WebSocket(`ws://localhost:${String(this.extPort)}`), this.#u.onmessage = (e) => {
			let [t, n] = JSON.parse(String(e.data));
			this.callHook(t, n);
		}, this.#u.onclose = () => this.main?.setLoop(!0), this.callHook = (e, t) => {
			for (let n of this.#p) n(e, t);
		};
	}
	extPort = 3776;
	end() {
		this.#u?.close(), this.#u = void 0;
	}
	#u = void 0;
	#d = {
		auth: (e) => {
			if (e.t !== this.cfg.oCfg.debuger_token) {
				this.end();
				return;
			}
			this.toast("接続");
		},
		continue: () => this.toast("再生"),
		disconnect: () => this.toast("切断"),
		restart: (e) => {
			this.send2Dbg(e?.ri ?? "", {}), this.end(), this.run();
		},
		pause: () => this.toast("一時停止"),
		stopOnEntry: () => this.toast("一時停止"),
		stopOnDataBreakpoint: () => this.toast("注意"),
		stopOnBreakpoint: () => this.toast("注意"),
		stopOnStep: () => this.toast("一歩進む"),
		stopOnStepIn: () => this.toast("ステップイン"),
		stopOnStepOut: () => this.toast("ステップアウト"),
		stopOnBackstep: () => this.toast("一歩戻る"),
		_addPath: (e) => this.cfg.addPath(e.fn, e.o)
	};
	toast(e) {
		if (!this.main) return;
		let t = document.body;
		for (let e of [...Array.from(t.getElementsByClassName("sn_BounceIn")), ...Array.from(t.getElementsByClassName("sn_HopIn"))]) e.remove();
		let r = document.createElement("img"), i = o.#f[e];
		if (!i) throw Error(`toast 名ミス=${e}`);
		r.src = `data:image/svg+xml;base64,${i.dat}`;
		let a = Math.min(n.stageW, n.stageH) / 4 * this.#a;
		r.width = r.height = a, r.style.cssText = `position: absolute;
left: ${String((n.stageW - a) / 2 * this.#a + a * (i.dx ?? 0))}px;
top: ${String((n.stageH - a) / 2 * this.#a + a * (i.dy ?? 0))}px;`, r.classList.add("sn_toast", i.ease ?? "sn_BounceInOut"), i.ease || r.addEventListener("animationend", () => t.removeChild(r), {
			once: !0,
			passive: !0
		}), t.insertBefore(r, this.main.cvs);
	}
	static #f = {
		接続: {
			dx: -1,
			dat: "PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtNjQwIDMyMGMwIDE3Ni43My0xNDMuMjcgMzIwLTMyMCAzMjBzLTMyMC0xNDMuMjctMzIwLTMyMCAxNDMuMjctMzIwIDMyMC0zMjAgMzIwIDE0My4yNyAzMjAgMzIweiIvPjxwYXRoIGlkPSJiIiBkPSJtMCAyOTJ2NTUuODhoMTI3LjEzYzEyLjM3IDQ2IDU0LjEyIDc5Ljg3IDEwNCA3OS44N2g3Ny44N3YtMjE1LjYyYy00Ni43MyAwLTcyLjY4IDAtNzcuODggMC00OS43NCAwLTkxLjYyIDMzLjg3LTEwMy45OSA3OS44Ny0xNi45NSAwLTU5LjMzIDAtMTI3LjEzIDB6Ii8+PHBhdGggaWQ9ImMiIGQ9Im01MTIuODggMjkyYy0xMi4zOC00Ni01NC4xMy03OS44Ny0xMDQtNzkuODctNS4yMSAwLTMxLjIxIDAtNzggMHYyMTUuNzRoNzcuODdjNDkuODggMCA5MS43NS0zMy44NyAxMDQtNzkuODdoMTI3LjI1di01NmMtNzYuMjcgMC0xMTguNjUgMC0xMjcuMTIgMHoiLz48L2RlZnM+PHVzZSBmaWxsPSIjMmUyZTJlIiB4bGluazpocmVmPSIjYSIvPjx1c2UgZmlsbD0ibm9uZSIgeGxpbms6aHJlZj0iI2EiLz48dXNlIGZpbGw9IiMzYWFiZDIiIHhsaW5rOmhyZWY9IiNiIi8+PHVzZSBmaWxsPSJub25lIiB4bGluazpocmVmPSIjYiIvPjx1c2UgZmlsbD0iIzNhYWJkMiIgeGxpbms6aHJlZj0iI2MiLz48dXNlIGZpbGw9Im5vbmUiIHhsaW5rOmhyZWY9IiNjIi8+PC9zdmc+"
		},
		切断: { dat: "PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtNjQwIDMyMGMwIDE3Ni43My0xNDMuMjcgMzIwLTMyMCAzMjBzLTMyMC0xNDMuMjctMzIwLTMyMCAxNDMuMjctMzIwIDMyMC0zMjAgMzIwIDE0My4yNyAzMjAgMzIweiIvPjxwYXRoIGlkPSJiIiBkPSJtMTkxLjUzIDIyMS4yNGMtNDUuNjggMC04NC4wMSAzMS4wNC05NS4zIDczLjE2LTYuNDEgMC0zOC40OSAwLTk2LjIzIDB2NTEuMjFoOTYuMjNjMTEuMyA0Mi4xMSA0OS42MyA3My4xNiA5NS4zIDczLjE2aDcxLjMzdi00OC4yNGg1My43OHYtMTAxLjA1aC01My43OHYtNDguMjRjLTQyLjggMC02Ni41NyAwLTcxLjMzIDB6Ii8+PHBhdGggaWQ9ImMiIGQ9Im00NDguNDcgMjIxLjIzYy00Ljc2IDAtMjguNTMgMC03MS4zMyAwdjE5Ny41M2g3MS4zM2M0NS42OCAwIDgzLjk5LTMxLjA0IDk1LjI5LTczLjE1aDk2LjI0di01MS4yMWgtOTYuMjRjLTMzLjA4LTQ4Ljc4LTY0Ljg0LTczLjE3LTk1LjI5LTczLjE3eiIvPjwvZGVmcz48dXNlIGZpbGw9IiMyZTJlMmUiIHhsaW5rOmhyZWY9IiNhIi8+PHVzZSBmaWxsPSJub25lIiB4bGluazpocmVmPSIjYSIvPjx1c2UgZmlsbD0iI2RmNTY1NiIgeGxpbms6aHJlZj0iI2IiLz48dXNlIGZpbGw9Im5vbmUiIHhsaW5rOmhyZWY9IiNiIi8+PHVzZSBmaWxsPSIjZGY1NjU2IiB4bGluazpocmVmPSIjYyIvPjx1c2UgZmlsbD0ibm9uZSIgeGxpbms6aHJlZj0iI2MiLz48L3N2Zz4=" },
		再生: { dat: "PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMCAzMjBjMCAxNzYuNzIgMTQzLjI4IDMyMCAzMjAgMzIwczMyMC0xNDMuMjggMzIwLTMyMC0xNDMuMjgtMzIwLTMyMC0zMjAtMzIwIDE0My4yOC0zMjAgMzIwem0yNTguODMgMTExLjA1Yy0xLjI5Ljc5LTIuOTMuODMtNC4yNi4wNC0xLjI5LS43NC0yLjExLTIuMTItMi4xMS0zLjY3IDAtNy4xNiAwLTQyLjk3IDAtMTA3LjQzczAtMTAwLjI3IDAtMTA3LjQzYzAtMS41My44Mi0yLjkzIDIuMTEtMy42OCAxLjMzLS43NiAyLjk3LS43MiA0LjI2LjA0IDE4IDEwLjc1IDE2MiA5Ni43MSAxODAgMTA3LjQ2IDEuMjkuNzMgMi4wNSAyLjE0IDIuMDUgMy42MSAwIDEuNDktLjc2IDIuODgtMi4wNSAzLjYzLTM2IDIxLjQ5LTE2MiA5Ni42OS0xODAgMTA3LjQzeiIvPjwvZGVmcz48cGF0aCBkPSJtMTU0LjU3IDE3MC4xOWgzNDYuMTV2MzA3LjY5aC0zNDYuMTV6IiBmaWxsPSIjZmZmIi8+PHVzZSBmaWxsPSIjMmUyZTJlIiB4bGluazpocmVmPSIjYSIvPjx1c2UgZmlsbD0ibm9uZSIgeGxpbms6aHJlZj0iI2EiLz48L3N2Zz4=" },
		一時停止: { dat: "PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMCAzMjBjMCAxNzYuNzIgMTQzLjI4IDMyMCAzMjAgMzIwczMyMC0xNDMuMjggMzIwLTMyMC0xNDMuMjgtMzIwLTMyMC0zMjAtMzIwIDE0My4yOC0zMjAgMzIwem0yMDAgMTAwdi0yMDBoODB2MjAwem0xNjAgMHYtMjAwaDgwdjIwMHoiLz48L2RlZnM+PHBhdGggZD0ibTE0Ny40OSAxODAuNDFoMzUyLjR2MjgyLjY5aC0zNTIuNHoiIGZpbGw9IiNmZmYiLz48dXNlIGZpbGw9IiMyZTJlMmUiIHhsaW5rOmhyZWY9IiNhIi8+PHVzZSBmaWxsPSJub25lIiB4bGluazpocmVmPSIjYSIvPjwvc3ZnPg==" },
		注意: {
			ease: "sn_HopIn",
			dat: "PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMzQzLjM0IDI5LjJjLTEwLjM3LTE3Ljk3LTM2LjMxLTE3Ljk3LTQ2LjY5IDAtMjkuMyA1MC43NS0yNjMuNyA0NTYuNzQtMjkzIDUwNy40OS0xMC4zNyAxNy45NyAyLjU5IDQwLjQ0IDIzLjM0IDQwLjQ0aDU4Ni4wMWMyMC43NSAwIDMzLjcyLTIyLjQ2IDIzLjM1LTQwLjQ0LTU4LjYtMTAxLjUtMjYzLjctNDU2Ljc0LTI5My4wMS01MDcuNDl6bS0yMy4zNCA0ODIuODNjLTE0LjUyIDAtMjYuMjktMi43MS0yNi4yOS02LjA2IDAtNC4yMSAwLTM3Ljg2IDAtNDIuMDcgMC0zLjM1IDExLjc3LTYuMDcgMjYuMjktNi4wN3MyNi4yOSAyLjcyIDI2LjI5IDYuMDd2NDIuMDdjLTcuODQgNC4wNC0xNi42MSA2LjA2LTI2LjI5IDYuMDZ6bTIxLjk5LTEwMy44NGMwIDUuNDMtOS44NSA5LjgzLTIxLjk5IDkuODMtMTIuMTUgMC0yMS45OS00LjQtMjEuOTktOS44MyAwLS4xMy4wNy0uMjUuMDgtLjM4LTEuMzctMTcuNTYtMTIuMy0xNTguMDYtMTMuNjctMTc1LjYyIDAtNS40MyAxNS45My05Ljg0IDM1LjU4LTkuODRzMzUuNTggNC40MSAzNS41OCA5Ljg0Yy0uOTEgMTEuNy01LjQ3IDcwLjI1LTEzLjY3IDE3NS42Mi4wNi4xNi4wOC4yOS4wOC4zOHoiLz48L2RlZnM+PHBhdGggZD0ibTI0MS4yOSAxOTEuNDRoMTQ1LjQ5djM1MS42NmgtMTQ1LjQ5eiIgZmlsbD0iI2ZmZiIvPjx1c2UgZmlsbD0iI2QyYmYzYSIgeGxpbms6aHJlZj0iI2EiLz48dXNlIGZpbGw9Im5vbmUiIHhsaW5rOmhyZWY9IiNhIi8+PC9zdmc+"
		},
		一歩進む: {
			ease: "sn_BounceIn",
			dat: "PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMCAzMjBjMCAxNzYuNzIgMTQzLjI4IDMyMCAzMjAgMzIwczMyMC0xNDMuMjggMzIwLTMyMC0xNDMuMjgtMzIwLTMyMC0zMjAtMzIwIDE0My4yOC0zMjAgMzIwem0zNzYuOTMgOTEuOTdjMC01My41MSAwLTgzLjI0IDAtODkuMTktLjE1LjE0LS4yNS4zNC0uNDQuNDUtMTYuMTEgOS42Mi0xNDQuOTUgODYuNTQtMTYxLjA2IDk2LjE1LTEuMTUuNjktMi42Mi43My0zLjgxLjAyLTEuMTUtLjY0LTEuODktMS44OS0xLjg5LTMuMjggMC02LjQxIDAtMzguNDQgMC05Ni4xMSAwLTU3LjY5IDAtODkuNzQgMC05Ni4xNSAwLTEuMzUuNzQtMi42MiAxLjg5LTMuMjkgMS4xOS0uNjggMi42Ni0uNjQgMy44MS4wNCAxNi4xMSA5LjYyIDE0NC45NSA4Ni41NCAxNjEuMDYgOTYuMTYuMTkuMS4yOS4zMS40NC40NSAwLTYuMTMgMC0zNi43NyAwLTkxLjkyaDUzLjMydjE4Ni42N3oiLz48L2RlZnM+PHBhdGggZD0ibTE0Ny40OSAxNTQuMmgzNTIuNHYzMDguOWgtMzUyLjR6IiBmaWxsPSIjZmZmIi8+PHVzZSBmaWxsPSIjMmUyZTJlIiB4bGluazpocmVmPSIjYSIvPjx1c2UgZmlsbD0ibm9uZSIgeGxpbms6aHJlZj0iI2EiLz48L3N2Zz4="
		},
		一歩戻る: {
			ease: "sn_BounceIn",
			dat: "PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMCAzMjBjMCAxNzYuNzIgMTQzLjI4IDMyMCAzMjAgMzIwczMyMC0xNDMuMjggMzIwLTMyMC0xNDMuMjgtMzIwLTMyMC0zMjAtMzIwIDE0My4yOC0zMjAgMzIwem00MzAuMjcgOTYuMTRjMCAxLjM1LS43NCAyLjYyLTEuODkgMy4yOC0xLjE5LjY5LTIuNjYuNjUtMy44MS0uMDMtMTYuMTEtOS42Mi0xNDQuOTUtODYuNTQtMTYxLjA1LTk2LjE2LS4yLS4xLS4yOS0uMzEtLjQ1LS40NXY5MS45MmgtNTMuMzJ2LTE4Ni42N2g1My4zMnY4OS4xOWMuMTYtLjE0LjI1LS4zNC40NS0uNDUgMTYuMS05LjYyIDE0NC45NC04Ni41NCAxNjEuMDUtOTYuMTYgMS4xNS0uNjggMi42Mi0uNzIgMy44MS0uMDEgMS4xNS42NCAxLjg5IDEuODkgMS44OSAzLjI4djk2LjExeiIvPjwvZGVmcz48cGF0aCBkPSJtMTQ3LjQ5IDE1NC4yaDM1Mi40djMwOC45aC0zNTIuNHoiIGZpbGw9IiNmZmYiLz48dXNlIGZpbGw9IiMyZTJlMmUiIHhsaW5rOmhyZWY9IiNhIi8+PHVzZSBmaWxsPSJub25lIiB4bGluazpocmVmPSIjYSIvPjwvc3ZnPg=="
		},
		ステップイン: {
			ease: "sn_BounceIn",
			dat: "PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMCAzMTkuOTljMCAxNzYuNzQgMTQzLjI3IDMyMC4wMSAzMjAuMDEgMzIwLjAxIDE3Ni43MiAwIDMxOS45OS0xNDMuMjcgMzE5Ljk5LTMyMC4wMSAwLTE3Ni43Mi0xNDMuMjctMzE5Ljk5LTMxOS45OS0zMTkuOTktMTc2Ljc0IDAtMzIwLjAxIDE0My4yNy0zMjAuMDEgMzE5Ljk5em0xNTMuMDUtMjkuNzIgNTUuMTItNTUuMTMgMTExLjg0IDExMS44MiAxMTEuODItMTExLjgyIDU1LjEyIDU1LjEyLTE2Ni45NCAxNjYuOTd6Ii8+PC9kZWZzPjxwYXRoIGQ9Im0xNDcuNDkgMTU0LjJoMzUyLjR2MzA4LjloLTM1Mi40eiIgZmlsbD0iI2ZmZiIvPjx1c2UgZmlsbD0iIzJlMmUyZSIgeGxpbms6aHJlZj0iI2EiLz48dXNlIGZpbGw9Im5vbmUiIHhsaW5rOmhyZWY9IiNhIi8+PC9zdmc+"
		},
		ステップアウト: {
			ease: "sn_BounceIn",
			dat: "PHN2ZyBoZWlnaHQ9IjY0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIHdpZHRoPSI2NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJtMCAzMjAuMDFjMCAxNzYuNzIgMTQzLjI3IDMxOS45OSAzMTkuOTkgMzE5Ljk5IDE3Ni43NCAwIDMyMC4wMS0xNDMuMjcgMzIwLjAxLTMxOS45OSAwLTE3Ni43NC0xNDMuMjctMzIwLjAxLTMyMC4wMS0zMjAuMDEtMTc2LjcyIDAtMzE5Ljk5IDE0My4yNy0zMTkuOTkgMzIwLjAxem0zMTkuOTktMjYuOTgtMTExLjgyIDExMS44My01NS4xMi01NS4xMyAxNjYuOTQtMTY2Ljk2IDE2Ni45NiAxNjYuOTYtNTUuMTIgNTUuMTN6Ii8+PC9kZWZzPjxwYXRoIGQ9Im0xNDcuNDkgMTU0LjJoMzUyLjR2MzA4LjloLTM1Mi40eiIgZmlsbD0iI2ZmZiIvPjx1c2UgZmlsbD0iIzJlMmUyZSIgeGxpbms6aHJlZj0iI2EiLz48dXNlIGZpbGw9Im5vbmUiIHhsaW5rOmhyZWY9IiNhIi8+PC9zdmc+"
		}
	};
	pathBaseCnvSnPath4Dbg = "";
	fire;
	setFire(e) {
		this.fire = e;
	}
	#p = [];
	addHook(e) {
		this.#p.push(e);
	}
	callHook = (e, t) => {};
	send2Dbg = (e, t) => {
		this.#u?.readyState === WebSocket.OPEN && this.#u.send(JSON.stringify([e, t]));
	};
	copyBMFolder = (e, t) => {};
	eraseBMFolder = (e) => {};
	close = () => !1;
	_export = () => !1;
	_import = () => !1;
	navigate_to = () => !1;
	title = (e) => {
		let { text: t } = e;
		if (!t) throw "[title] textは必須です";
		return this.#m = t, this.titleSub(this.#m + this.#g), !1;
	};
	#m = "";
	titleSub(e) {}
	#h = (t) => {
		if (!t.key) return this.tglFlscr_sub().catch((e) => o.tglFlscr_HdrErr(e)), !1;
		let n = t.key.toLowerCase();
		return this.elc.add(document, e, (e) => {
			o.modKey(e) + e.key.toLowerCase() === n && (e.stopPropagation(), this.tglFlscr_sub().catch((e) => o.tglFlscr_HdrErr(e)));
		}, { passive: !0 }), !1;
	};
	static tglFlscr_HdrErr(e) {
		e instanceof TypeError && console.error("フルスクリーン化でエラーです。ブラウザ環境でキー入力きっかけでないと発生します"), console.error(`fn:SysBase.ts tglFlscr ${String(e)}`);
	}
	static modKey(e) {
		return (e.altKey ? e.key === "Alt" ? "" : "alt+" : "") + (e.ctrlKey ? e.key === "Control" ? "" : "ctrl+" : "") + (e.metaKey ? e.key === "Meta" ? "" : "meta+" : "") + (e.shiftKey ? e.key === "Shift" ? "" : "shift+" : "");
	}
	async tglFlscr_sub() {}
	update_check = () => !1;
	window = () => !1;
	#g = "";
	setTitleInfo(e) {
		this.#g = e, this.titleSub(this.#m + this.#g);
	}
	#_ = () => Promise.resolve({
		ext_num: 0,
		ab: /* @__PURE__ */ new ArrayBuffer(0)
	});
	dec = (e, t) => Promise.resolve(t);
	async decAB(e) {
		let { ext_num: t, ab: n } = await this.#_(e), r = this.#v[t];
		return r?.fnc ? await r.fnc(n) : n;
	}
	#v = {
		1: {
			ext: "jpeg",
			fnc: (e) => this.#y(e, "image/jpeg")
		},
		2: {
			ext: "png",
			fnc: (e) => this.#y(e, "image/png")
		},
		3: {
			ext: "svg",
			fnc: (e) => this.#y(e, "image/svg+xml")
		},
		4: {
			ext: "webp",
			fnc: (e) => this.#y(e, "image/webp")
		},
		20: {
			ext: "mp4",
			fnc: (e) => this.#b(e, "video/mp4")
		},
		21: {
			ext: "webm",
			fnc: (e) => this.#b(e, "video/webm")
		},
		22: {
			ext: "ogv",
			fnc: (e) => this.#b(e, "video/ogv")
		}
	};
	#y = (e, t) => new Promise((n, r) => {
		let i = new Blob([e], { type: t }), a = new Image();
		a.onload = () => n(a), a.onerror = (e) => r(Error(e instanceof Event ? e.type : e)), a.src = URL.createObjectURL(i);
	});
	#b = (e, t) => new Promise((n, r) => {
		let a = new Blob([e], { type: t }), o = document.createElement("video"), s = new i();
		s.add(o, "error", () => {
			s.clear(), r(Error(o.error?.message ?? ""));
		}), s.add(o, "canplay", () => {
			s.clear(), n(o);
		}), o.src = URL.createObjectURL(a);
	});
	enc = async (e) => e;
	stk = () => "";
	hash = (e) => "";
	isApp = !1;
	$path_downloads = "";
	get path_downloads() {
		return this.$path_downloads;
	}
	$path_userdata = "";
	get path_userdata() {
		return this.$path_userdata;
	}
	capturePage(e, t, n, r) {}
	async savePic(e, t) {}
	async ensureFile(e) {}
	async appendFile(e, t) {}
	async outputFile(e, t) {}
};
//#endregion
export { o as t };

//# sourceMappingURL=SysBase.js.map