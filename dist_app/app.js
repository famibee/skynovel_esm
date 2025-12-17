import { g as uint, l as argChk_Num, s as argChk_Boolean, t as CmnLib, u as getDateStr } from "./CmnLib.js";
import { n as creSYS_DATA } from "./CmnInterface.js";
import "./pixi.js";
import "./EventListenerCtn.js";
import "./ConfigBase.js";
import { t as SysBase } from "./SysBase.js";
import { t as DebugMng } from "./DebugMng.js";
import { r as PROTOCOL_USERDATA } from "./Config.js";
import { t as Layer } from "./Layer.js";
var IpcEmitter = class {
	send(e, ...n) {
		window.electron.ipcRenderer.send(e, ...n);
	}
	invoke(e, ...n) {
		return window.electron.ipcRenderer.invoke(e, ...n);
	}
}, IpcListener = class {
	on(e, n) {
		return window.electron.ipcRenderer.on(e, n);
	}
	once(e, n) {
		return window.electron.ipcRenderer.once(e, n);
	}
}, FLD_CRYPT_DOC = "doc_crypto", SysApp = class extends SysBase {
	constructor(...[e = {}, n = {
		cur: "prj/",
		crypto: !1,
		dip: ""
	}]) {
		super(e, n), this.loaded(e, n);
	}
	async loaded(...[n, r]) {
		await super.loaded(n, r), this.#e = await this.#t.invoke("getInfo"), CmnLib.isPackaged = this.#e.isPackaged, this.#n.on("log", (e, n) => console.info("main: %o", n)), this.$path_downloads = this.#e.downloads.replaceAll("\\", "/") + "/", CmnLib.isDbg = !!this.#e.env.SKYNOVEL_DBG && !CmnLib.isPackaged, CmnLib.isDbg && (this.extPort = uint(this.#e.env.SKYNOVEL_PORT ?? "3776")), await this.run();
	}
	#e = {
		getAppPath: "",
		isPackaged: !1,
		downloads: "",
		userData: "",
		getVersion: "",
		env: {},
		platform: "",
		arch: ""
	};
	#t = new IpcEmitter();
	#n = new IpcListener();
	use4ViteElectron(e, n, r, i) {
		return e.startsWith("userdata:/") ? (r.use((e, r) => void this.readFile(n, "base64").then((r) => {
			let i = new Image();
			i.src = `data:image/${n.endsWith(".png") ? "png" : "jpeg"};base64,${r}`, e.data = i;
		}).catch((n) => i.errScript(`FrameMng use ロード失敗です fn:${e.name} ${String(n)}`, !1)).finally(() => r())), !0) : !1;
	}
	#r = (e) => this.#t.invoke("fetch", e);
	#i = (e) => this.#t.invoke("fetchAb", e);
	ensureFile = (e) => this.#t.invoke("ensureFile", e);
	async readFile(e, n) {
		return this.#t.invoke("readFile", e, n);
	}
	writeFile = (e, n, r) => this.#t.invoke("writeFile", e, n, r);
	appendFile = (e, n) => this.#t.invoke("appendFile", e, n);
	outputFile = (e, n) => this.#t.invoke("outputFile", e, n);
	isApp = !0;
	$path_userdata = "";
	$path_downloads = "";
	async initVal(e, r) {
		e["const.sn.isDebugger"] = !1, this.$path_userdata = CmnLib.isDbg ? this.#e.getAppPath.slice(0, -3) + ".vscode/" : this.#e.userData.replaceAll("\\", "/") + "/", this.flushSub = () => {
			this.#t.invoke("flush", JSON.parse(JSON.stringify(this.data)));
		}, await this.#a();
		let a = e["const.sn.isFirstBoot"] = await this.#t.invoke("Store_isEmpty");
		if (a) this.data.sys = creSYS_DATA(), this.data.mark = {}, this.data.kidoku = {};
		else {
			let e = await this.#t.invoke("Store_get");
			this.data.sys = e.sys, this.data.mark = e.mark, this.data.kidoku = e.kidoku;
		}
		let s = argChk_Num(this.data.sys, "const.sn.nativeWindow.x", 0), c = argChk_Num(this.data.sys, "const.sn.nativeWindow.y", 0), l = this.data.sys["const.sn.nativeWindow.w"] || CmnLib.stageW, u = this.data.sys["const.sn.nativeWindow.h"] || CmnLib.stageH;
		this.#n.on("save_win_inf", (n, { x: i, y: a, w: o, h: s }) => {
			this.data.sys["const.sn.nativeWindow.x"] = i, this.data.sys["const.sn.nativeWindow.y"] = a, this.data.sys["const.sn.nativeWindow.w"] = o, this.data.sys["const.sn.nativeWindow.h"] = s, e["const.sn.screenResolutionX"] = screen.availWidth, e["const.sn.screenResolutionY"] = screen.availHeight, r(this.data);
		}), await this.#t.invoke("inited", this.cfg.oCfg, {
			c: a,
			x: s,
			y: c,
			w: l,
			h: u
		});
	}
	#a = () => this.#t.invoke("Store", {
		cwd: this.$path_userdata + "storage",
		name: this.arg.crypto ? "data_" : "data",
		encryptionKey: this.arg.crypto ? this.stk() : void 0
	});
	init(e, n, r) {
		let i = super.init(e, n, r);
		document.body.style.backgroundColor = "#000", this.#n.on("shutdown", (e) => this.main?.destroy());
		let a = new MouseEvent("click");
		return this.#n.on("fire", (e, n) => this.fire(n, a)), i;
	}
	cvsResize() {
		if (super.cvsResize(), !this.main) return;
		let e = this.main.cvs, n = e.parentElement?.style;
		if (!n) return;
		let r = e.style;
		this.isFullScr ? (n.position = "", n.width = "", n.height = "", r.position = "fixed", r.left = `${String(this.ofsLeft4elm)}px`, r.top = `${String(this.ofsTop4elm)}px`) : (n.position = "relative", n.width = `${String(this.cvsWidth)}px`, n.height = `${String(this.cvsHeight)}px`, r.position = "relative", r.left = "", r.top = "");
	}
	copyBMFolder = (e, n) => {
		let r = `${this.$path_userdata}storage/${String(e)}/`, i = `${this.$path_userdata}storage/${String(n)}/`;
		this.#t.invoke("existsSync", r).then(async (e) => {
			e && await this.#t.invoke("copy", r, i);
		});
	};
	eraseBMFolder = (e) => {
		this.#t.invoke("remove", `${this.$path_userdata}storage/${String(e)}/`);
	};
	close = () => (this.#t.invoke("win_close"), !1);
	_export = () => (this.#t.invoke("zip", this.$path_userdata + "storage/", this.$path_downloads + (this.arg.crypto ? "" : "no_crypto_") + this.cfg.headNs + getDateStr("-", "_", "") + ".spd").then(() => {
		CmnLib.debugLog && console.log("プレイデータをエクスポートしました"), this.fire("sn:exported", new MouseEvent("click"));
	}), !1);
	_import = () => (this.#t.invoke("showOpenDialog", {
		title: "play data import",
		filters: [{
			name: "sn import",
			extensions: ["spd"]
		}],
		properties: ["openFile"]
	}).then(async ({ canceled: e, filePaths: [n] }) => {
		if (e) return;
		let r = () => this.flush();
		this.flush = () => {}, await this.#t.invoke("unzip", n, this.$path_userdata + "storage/"), await this.#a();
		let a = await this.#t.invoke("Store_get");
		this.data.sys = a.sys, this.data.mark = a.mark, this.data.kidoku = a.kidoku, this.flush = r, this.flush(), this.val.updateData(a), CmnLib.debugLog && console.log("プレイデータをインポートしました"), this.fire("sn:imported", new MouseEvent("click"));
	}).catch((e) => console.log(`[import] err: ${String(e)}`)), !1);
	navigate_to = (e) => {
		let { url: n } = e;
		if (!n) throw "[navigate_to] urlは必須です";
		return this.#t.invoke("navigate_to", n), !1;
	};
	titleSub(e) {
		this.#t.invoke("win_setTitle", e);
	}
	tglFlscr_sub = async () => this.#t.invoke("isSimpleFullScreen").then(async (e) => {
		this.isFullScr = !e, await this.#t.invoke("setSimpleFullScreen", this.isFullScr);
	});
	update_check = (e) => {
		let { url: n } = e;
		if (!n) throw "[update_check] urlは必須です";
		if (!n.endsWith("/")) throw "[update_check] urlの末尾は/にして下さい";
		return CmnLib.debugLog && DebugMng.myTrace(`[update_check] url=${n}`, "D"), this.#r(n + "_index.json").then(async (e) => {
			let r = {
				title: "アプリ更新",
				icon: this.#e.getAppPath + `/${this.arg.crypto ? FLD_CRYPT_DOC : "doc"}/icon.png`,
				buttons: ["OK", "Cancel"],
				defaultId: 0,
				cancelId: 1,
				message: `アプリ【${this.cfg.oCfg.book.title}】に更新があります。\nダウンロードしますか？`
			};
			e.ok ? await this.#o(e, n, r) : await this.#s(n, r);
		}).catch((e) => DebugMng.myTrace(String(e), "ET")), !1;
	};
	async #o(e, n, r) {
		CmnLib.debugLog && DebugMng.myTrace("[update_check] _index.jsonを取得しました", "D");
		let a = JSON.parse(e.txt);
		if (!await this.#c(a.version, r)) return;
		let o = this.#e.platform + "_" + this.#e.arch, s = a[o];
		if (s) {
			let { cn: e, path: i } = s;
			await this.#l(n, o + "-" + e, i), await this.#u(r);
			return;
		}
		let l = "", u = /* @__PURE__ */ RegExp("^" + this.#e.platform + "_"), d = Object.entries(a).flatMap(([e, { path: r, cn: i }]) => u.test(e) ? (l += "\n- " + r, this.#l(n, e + "-" + i, r)) : []);
		r.message = `CPU = ${this.#e.arch}\nに対応するファイルが見つかりません。同じOSのファイルをすべてダウンロードしますか？`, r.detail = `${String(d.length)} 個ファイルがあります` + l;
		let { response: f } = await this.#t.invoke("showMessageBox", r);
		f > 0 || (await Promise.allSettled(d), await this.#u(r));
	}
	async #s(e, n) {
		let r = await this.#r(e + `latest${CmnLib.isMac ? "-mac" : ""}.yml`);
		if (!r.ok) {
			if (CmnLib.debugLog) throw "[update_check] .ymlが見つかりません";
			return;
		}
		CmnLib.debugLog && DebugMng.myTrace("[update_check] .ymlを取得しました", "D");
		let a = r.txt, o = /version: (.+)/.exec(a)?.[1];
		if (!o) throw "[update_check] .yml に version が見つかりません";
		if (!await this.#c(o, n)) return;
		let s = /path: (.+)/.exec(a);
		if (!s) throw "[update_check] path が見つかりません";
		let [, l] = s;
		if (!l) throw "[update_check] path が見つかりません.";
		CmnLib.debugLog && DebugMng.myTrace(`[update_check] path=${l}`, "D");
		let u = /sha512: (.+)/.exec(a);
		if (!u) throw "[update_check] sha512 が見つかりません";
		let [, d] = u;
		CmnLib.debugLog && DebugMng.myTrace(`[update_check] sha=${d ?? ""}=`, "D");
		let [, f, p] = /(.+)(\.\w+)/.exec(l) ?? [
			"",
			"",
			""
		];
		await this.#l(e, f + "-" + this.#e.arch + p, l), await this.#u(n);
	}
	async #c(e, n) {
		let r = this.#e.getVersion;
		if (CmnLib.debugLog && DebugMng.myTrace(`[update_check] 現在ver=${r} 新規ver=${e}`, "D"), e === r) return CmnLib.debugLog && DebugMng.myTrace("[update_check] バージョン更新なし", "I"), !1;
		n.detail = `現在 NOW ver ${r}\n新規 NEW ver ${e}`;
		let { response: a } = await this.#t.invoke("showMessageBox", n);
		return a > 0 ? !1 : (CmnLib.debugLog && DebugMng.myTrace("[update_check] アプリダウンロード開始", "D"), !0);
	}
	async #l(e, n, r) {
		CmnLib.debugLog && DebugMng.myTrace(`[update_check] アプリファイルDL試行... url=${e + n}`, "D");
		let a = await this.#i(e + n);
		if (!a.ok) {
			CmnLib.debugLog && DebugMng.myTrace(`[update_check] アプリファイルが見つかりません url=${e + r}`);
			return;
		}
		let o = this.#e.downloads + "/" + r;
		CmnLib.debugLog && DebugMng.myTrace(`[update_check] pathDL=${o}`, "D"), await this.writeFile(o, new DataView(a.ab));
	}
	async #u(e) {
		CmnLib.debugLog && DebugMng.myTrace("アプリファイルを保存しました", "D"), e.buttons.pop(), e.message = `アプリ【${this.cfg.oCfg.book.title}】の更新パッケージを\nダウンロードしました`, await this.#t.invoke("showMessageBox", e);
	}
	window = (e) => {
		let a = argChk_Num(e, "x", Number(this.val.getVal("sys:const.sn.nativeWindow.x", 0))), o = argChk_Num(e, "y", Number(this.val.getVal("sys:const.sn.nativeWindow.y", 0))), s = argChk_Num(e, "w", Number(this.val.getVal("sys:const.sn.nativeWindow.w", CmnLib.stageW))), l = argChk_Num(e, "h", Number(this.val.getVal("sys:const.sn.nativeWindow.h", CmnLib.stageH)));
		return this.#t.invoke("window", argChk_Boolean(e, "centering", !1), a, o, CmnLib.stageW, CmnLib.stageH).catch((e) => DebugMng.myTrace(String(e), "ET")), this.val.setVal_Nochk("sys", "const.sn.nativeWindow.x", a), this.val.setVal_Nochk("sys", "const.sn.nativeWindow.y", o), this.val.setVal_Nochk("sys", "const.sn.nativeWindow.w", s), this.val.setVal_Nochk("sys", "const.sn.nativeWindow.h", l), this.flush(), !1;
	};
	capturePage(e, n, r, i) {
		this.#t.invoke("capturePage", e, n, r).then(() => i());
	}
	async savePic(e, n) {
		let r = n.slice(n.indexOf(",", 20) + 1);
		await this.ensureFile(e), await this.writeFile(e, r), CmnLib.debugLog && console.log(`画像ファイル ${e} を保存しました`);
	}
};
export { CmnLib, Layer, SysApp, argChk_Boolean, argChk_Num };

//# sourceMappingURL=app.js.map