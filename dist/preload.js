import { ipcRenderer as c } from "electron";
const n = console.error, r = {
  // console.log は【アプリ】のターミナルに出る
  getInfo: () => c.invoke("getInfo").catch(n),
  inited: (e, i) => c.invoke("inited", e, i).catch(n),
  existsSync: (e) => c.invoke("existsSync", e).catch(n),
  copySync: (e, i) => c.invoke("copySync", e, i).catch(n),
  removeSync: (e) => c.invoke("removeSync", e).catch(n),
  ensureFileSync: (e) => c.invoke("ensureFileSync", e).catch(n),
  readFileSync: (e) => c.invoke("readFileSync", e).catch(n),
  writeFileSync: (e, i, o) => c.invoke("writeFileSync", e, i, o).catch(n),
  appendFile: (e, i) => c.invoke("appendFile", e, i).catch(n),
  outputFile: (e, i) => c.invoke("outputFile", e, i).catch(n),
  win_close: () => c.invoke("win_close").catch(n),
  win_setTitle: (e) => c.invoke("win_setTitle", e).catch(n),
  showMessageBox: (e) => c.invoke("showMessageBox", e).catch(n),
  capturePage: (e, i, o) => c.invoke("capturePage", e, i, o).catch(n),
  navigate_to: (e) => c.invoke("navigate_to", e).catch(n),
  openDevTools: () => c.invoke("openDevTools").catch(n),
  Store: (e) => c.invoke("Store", e).catch(n),
  flush: (e) => c.invoke("flush", e).catch(n),
  Store_isEmpty: () => c.invoke("Store_isEmpty").catch(n),
  Store_get: () => c.invoke("Store_get").catch(n),
  zip: (e, i) => c.invoke("zip", e, i).catch(n),
  unzip: (e, i) => c.invoke("unzip", e, i).catch(n),
  isSimpleFullScreen: () => c.invoke("isSimpleFullScreen").catch(n),
  setSimpleFullScreen: (e) => c.invoke("setSimpleFullScreen", e).catch(n),
  window: (e, i, o, t, a) => c.invoke("window", e, i, o, t, a).catch(n),
  // メイン → レンダラー
  on: (e, i) => {
    switch (e) {
      case "log":
        c.on(e, (o, t) => i(o, t));
        break;
      case "shutdown":
        c.on(e, (o) => i(o));
        break;
      case "save_win_inf":
        c.on(e, (o, t) => i(o, t));
        break;
      case "fire":
        c.on(e, (o, t) => i(o, t));
        break;
    }
  }
};
export {
  r as to_app
};
//# sourceMappingURL=preload.js.map
