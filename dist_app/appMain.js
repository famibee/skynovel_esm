import { BrowserWindow as e, app as t, dialog as n, ipcMain as r, screen as i, shell as a } from "electron";
import { existsSync as o } from "node:fs";
import { appendFile as s, readFile as c, writeFile as l } from "node:fs/promises";
import { copy as u, ensureDir as d, ensureFile as f, outputFile as p, remove as m } from "fs-extra/esm";
import h from "electron-store";
import g from "adm-zip";
//#region src/appMain_cmn.ts
var _ = class e {
	bw;
	version;
	static init(t) {
		e.#e = t, h.initRenderer();
	}
	static #e;
	#t;
	#n = {
		getAppPath: t.getAppPath(),
		isPackaged: t.isPackaged,
		downloads: t.getPath("downloads"),
		userData: t.getPath("userData"),
		getVersion: "",
		homepage: "",
		env: { ...process.env },
		platform: process.platform,
		arch: process.arch
	};
	#r = 0;
	#i = 0;
	#a = 0;
	#o = 0;
	constructor(t, r, i = "") {
		this.bw = t, this.version = r;
		let _ = e.#e;
		this.#t = process.platform === "win32", t.webContents.on("devtools-opened", () => this.#l()), _.handle("openDevTools", () => t.webContents.openDevTools()), this.#n.getVersion = r, this.#n.homepage = i, _.handle("getInfo", () => this.#n), _.handle("inited", (e, t, n) => this.#s(t, n)), _.handle("fetch", async (e, t) => {
			let n = await fetch(t, { cache: "no-store" });
			return {
				ok: n.ok,
				txt: await n.text()
			};
		}), _.handle("fetchAb", async (e, t) => {
			let n = await fetch(t, { cache: "no-store" });
			return {
				ok: n.ok,
				ab: await n.arrayBuffer()
			};
		}), _.handle("existsSync", (e, t) => o(t)), _.handle("copy", (e, t, n) => u(t, n)), _.handle("remove", (e, t) => m(t)), _.handle("ensureFile", (e, t) => f(t)), _.handle("readFile", (e, t, n) => c(t, n)), _.handle("writeFile", (e, t, n, r) => l(t, n, r)), _.handle("appendFile", (e, t, n) => s(t, n).catch((e) => console.error(e))), _.handle("outputFile", (e, t, n) => p(t, n).catch((e) => console.error(e))), _.handle("win_close", () => t.close()), _.handle("win_setTitle", (e, n) => t.setTitle(n)), _.handle("showMessageBox", (e, r) => n.showMessageBox(t, r)), _.handle("showOpenDialog", (e, r) => n.showOpenDialog(t, r)), _.handle("capturePage", (e, n, r, i) => t.webContents.capturePage().then(async (e) => {
			await f(n);
			let t = e.resize({
				width: r,
				height: i,
				quality: "best"
			}), a = n.endsWith(".png") ? t.toPNG() : t.toJPEG(80);
			await l(n, a);
		})), _.handle("navigate_to", (e, t) => a.openExternal(t));
		let v;
		_.handle("Store", (e, t) => {
			v = new h(t);
		}), _.handle("flush", (e, t) => {
			v.store = t;
		}), _.handle("Store_isEmpty", () => v.size === 0), _.handle("Store_get", () => v.store), _.handle("zip", async (e, t, n) => {
			let r = new g();
			r.addLocalFolder(t), await r.writeZipPromise(n);
		}), _.handle("unzip", async (e, t, n) => {
			await m(n), await d(n), new g(t).extractAllTo(n, !0);
		}), _.handle("isSimpleFullScreen", () => t.simpleFullScreen), this.#t ? (_.handle("setSimpleFullScreen", (e, n) => {
			this.#p = () => {}, t.setSimpleFullScreen(n), n || (t.setPosition(this.#r, this.#i), t.setContentSize(this.#a, this.#o)), this.#p = () => this.#m();
		}), t.on("enter-full-screen", () => {
			this.#p = () => {}, t.setContentSize(this.#d.width, this.#d.height), this.#p = () => this.#m();
		}), t.on("leave-full-screen", () => {
			this.#g(!1, this.#r, this.#i, this.#a, this.#o);
		})) : _.handle("setSimpleFullScreen", (e, n) => {
			t.setSimpleFullScreen(n), !n && t.setContentSize(this.#a, this.#o);
		}), _.handle("window", (e, t, n, r, i, a) => this.#g(t, n, r, i, a)), t.on("move", () => this.#p()), t.on("resize", () => this.#p()), this.#u();
	}
	#s(e, t) {
		let { width: n, height: r } = e.window, { c: i, x: a, y: o, w: s } = t;
		this.#c = n / r;
		let c = s === n ? r : s / this.#c;
		if (this.#t || this.bw.setAspectRatio(this.#c), this.#g(i, a, o, s, c), this.bw.show(), this.#p = () => this.#m(), e.debug.devtool) {
			this.#l = () => {}, this.openDevTools = () => this.bw.webContents.openDevTools({ mode: "detach" }), this.openDevTools();
			return;
		}
		this.#l = () => {
			this.bw.webContents.closeDevTools(), this.bw.setTitle("DevToolは禁止されています。許可する場合は【プロジェクト設定】の【devtool】をONに。"), this.sendShutdown();
		};
	}
	#c = 0;
	#l = () => this.bw.webContents.closeDevTools();
	#u() {
		let e = i.getCursorScreenPoint(), t = i.getDisplayNearestPoint(e);
		this.#d = t.workAreaSize;
	}
	#d;
	#f(e, t, n, r) {
		return i.getAllDisplays().some(({ bounds: i }) => e >= i.x && t >= i.y && e + n <= i.x + i.width && t + r <= i.y + i.height);
	}
	#p = () => {};
	#m() {
		if (this.#h) return;
		this.#p = () => {};
		let [e, t] = this.bw.getPosition(), [n, r] = this.bw.getContentSize();
		this.#h = setTimeout(() => {
			this.#h = void 0;
			let [i = 0, a = 0] = this.bw.getPosition(), [o = 0, s = 0] = this.bw.getContentSize();
			if (e !== i || t !== a || n !== o || r !== s) {
				this.#m();
				return;
			}
			this.#p = () => this.#m();
			let c = o, l = s;
			this.#t && (n === o ? l = o / this.#c : c = s * this.#c), this.#g(!1, i, a, c, l);
		}, 1e3 / 60 * 10);
	}
	#h = void 0;
	#g(e, t, n, r, i) {
		if (this.bw.simpleFullScreen) return;
		!e && !this.#f(t, n, r, i) && (e = !0), this.#p = () => {};
		let a = this.#r = Math.round(e ? (this.#d.width - r) * .5 : t), o = this.#i = Math.round(e ? (this.#d.height - i) * .5 : n);
		this.bw.setPosition(a, o);
		let s = this.#a = Math.round(r), c = this.#o = Math.round(i);
		this.bw.setContentSize(s, c), e || this.#u(), this.sendSaveWinInf({
			x: a,
			y: o,
			w: s,
			h: c
		}), this.#p = () => this.#m();
	}
	sendShutdown() {}
	sendSaveWinInf(e) {}
	openDevTools = () => {};
}, v = class {
	#e = [];
	#t = [];
	on(e, t) {
		this.#e.push(e), r.on(e, t);
	}
	handle(e, t) {
		this.#t.push(e), r.handle(e, t);
	}
	dispose() {
		this.#e.forEach((e) => r.removeAllListeners(e)), this.#e = [], this.#t.forEach((e) => r.removeHandler(e)), this.#t = [];
	}
}, y = class {
	send(e, t, ...n) {
		e.send(t, ...n);
	}
}, b = class t extends _ {
	static initRenderer(n, r, i = "") {
		let a, o = () => {};
		try {
			_.init(new v()), a = new e({
				show: !1,
				minWidth: 300,
				minHeight: 300,
				acceptFirstMouse: !0,
				maximizable: !1,
				webPreferences: {
					preload: n,
					sandbox: !1
				}
			});
			let s = new t(a, r, i);
			o = () => s.openDevTools();
		} catch (e) {
			throw console.error(`early err:${String(e)}`), o(), "initRenderer error";
		}
		return a;
	}
	#e = new y();
	sendShutdown() {
		this.#e.send(this.bw.webContents, "shutdown");
	}
	sendSaveWinInf(e) {
		this.#e.send(this.bw.webContents, "save_win_inf", e);
	}
};
//#endregion
export { b as appMain };

//# sourceMappingURL=appMain.js.map