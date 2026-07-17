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
		env: { ...process.env },
		platform: process.platform,
		arch: process.arch
	};
	#r = 0;
	#i = 0;
	#a = 0;
	#o = 0;
	constructor(t, r) {
		this.bw = t, this.version = r;
		let i = e.#e;
		this.#t = process.platform === "win32", t.webContents.on("devtools-opened", () => this.#l()), i.handle("openDevTools", () => t.webContents.openDevTools()), this.#n.getVersion = r, i.handle("getInfo", () => this.#n), i.handle("inited", (e, t, n) => this.#s(t, n)), i.handle("fetch", async (e, t) => {
			let n = await fetch(t, { cache: "no-store" });
			return {
				ok: n.ok,
				txt: await n.text()
			};
		}), i.handle("fetchAb", async (e, t) => {
			let n = await fetch(t, { cache: "no-store" });
			return {
				ok: n.ok,
				ab: await n.arrayBuffer()
			};
		}), i.handle("existsSync", (e, t) => o(t)), i.handle("copy", (e, t, n) => u(t, n)), i.handle("remove", (e, t) => m(t)), i.handle("ensureFile", (e, t) => f(t)), i.handle("readFile", (e, t, n) => c(t, n)), i.handle("writeFile", (e, t, n, r) => l(t, n, r)), i.handle("appendFile", (e, t, n) => s(t, n).catch((e) => console.error(e))), i.handle("outputFile", (e, t, n) => p(t, n).catch((e) => console.error(e))), i.handle("win_close", () => t.close()), i.handle("win_setTitle", (e, n) => t.setTitle(n)), i.handle("showMessageBox", (e, r) => n.showMessageBox(t, r)), i.handle("showOpenDialog", (e, r) => n.showOpenDialog(t, r)), i.handle("capturePage", (e, n, r, i) => t.webContents.capturePage().then(async (e) => {
			await f(n);
			let t = e.resize({
				width: r,
				height: i,
				quality: "best"
			});
			await l(n, n.endsWith(".png") ? t.toPNG() : t.toJPEG(80));
		})), i.handle("navigate_to", (e, t) => a.openExternal(t));
		let _;
		i.handle("Store", (e, t) => {
			_ = new h(t);
		}), i.handle("flush", (e, t) => {
			_.store = t;
		}), i.handle("Store_isEmpty", () => _.size === 0), i.handle("Store_get", () => _.store), i.handle("zip", async (e, t, n) => {
			let r = new g();
			r.addLocalFolder(t), await r.writeZipPromise(n);
		}), i.handle("unzip", async (e, t, n) => {
			await m(n), await d(n), new g(t).extractAllTo(n, !0);
		}), i.handle("isSimpleFullScreen", () => t.simpleFullScreen), this.#t ? (i.handle("setSimpleFullScreen", (e, n) => {
			this.#f = () => {}, t.setSimpleFullScreen(n), n || (t.setPosition(this.#r, this.#i), t.setContentSize(this.#a, this.#o)), this.#f = () => this.#p();
		}), t.on("enter-full-screen", () => {
			this.#f = () => {}, t.setContentSize(this.#d.width, this.#d.height), this.#f = () => this.#p();
		}), t.on("leave-full-screen", () => {
			this.#h(!1, this.#r, this.#i, this.#a, this.#o);
		})) : i.handle("setSimpleFullScreen", (e, n) => {
			t.setSimpleFullScreen(n), !n && t.setContentSize(this.#a, this.#o);
		}), i.handle("window", (e, t, n, r, i, a) => this.#h(t, n, r, i, a)), t.on("move", () => this.#f()), t.on("resize", () => this.#f()), this.#u();
	}
	#s(e, t) {
		let { width: n, height: r } = e.window, { c: i, x: a, y: o, w: s } = t;
		this.#c = n / r;
		let c = s === n ? r : s / this.#c;
		if (this.#t || this.bw.setAspectRatio(this.#c), this.#h(i, a, o, s, c), this.bw.show(), this.#f = () => this.#p(), e.debug.devtool) {
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
	#f = () => {};
	#p() {
		if (this.#m) return;
		this.#f = () => {};
		let [e, t] = this.bw.getPosition(), [n, r] = this.bw.getContentSize();
		this.#m = setTimeout(() => {
			this.#m = void 0;
			let [i = 0, a = 0] = this.bw.getPosition(), [o = 0, s = 0] = this.bw.getContentSize();
			if (e !== i || t !== a || n !== o || r !== s) {
				this.#p();
				return;
			}
			this.#f = () => this.#p();
			let c = o, l = s;
			this.#t && (n === o ? l = o / this.#c : c = s * this.#c), this.#h(!1, i, a, c, l);
		}, 1e3 / 60 * 10);
	}
	#m = void 0;
	#h(e, t, n, r, i) {
		if (this.bw.simpleFullScreen) return;
		this.#f = () => {};
		let a = this.#r = Math.round(e ? (this.#d.width - r) * .5 : t), o = this.#i = Math.round(e ? (this.#d.height - i) * .5 : n);
		this.bw.setPosition(a, o);
		let s = this.#a = Math.round(r), c = this.#o = Math.round(i);
		this.bw.setContentSize(s, c), e || this.#u(), this.sendSaveWinInf({
			x: a,
			y: o,
			w: s,
			h: c
		}), this.#f = () => this.#p();
	}
	sendShutdown() {}
	sendSaveWinInf(e) {}
	openDevTools = () => {};
}, v = class {
	constructor() {
		this.listeners = [], this.handlers = [];
	}
	on(e, t) {
		this.listeners.push(e), r.on(e, t);
	}
	handle(e, t) {
		this.handlers.push(e), r.handle(e, t);
	}
	dispose() {
		this.listeners.forEach((e) => r.removeAllListeners(e)), this.listeners = [], this.handlers.forEach((e) => r.removeHandler(e)), this.handlers = [];
	}
}, y = class {
	send(e, t, ...n) {
		e.send(t, ...n);
	}
}, b = class t extends _ {
	static initRenderer(n, r) {
		let i, a = () => {};
		try {
			_.init(new v()), i = new e({
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
			let o = new t(i, r);
			a = () => o.openDevTools();
		} catch (e) {
			throw console.error(`early err:${String(e)}`), a(), "initRenderer error";
		}
		return i;
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