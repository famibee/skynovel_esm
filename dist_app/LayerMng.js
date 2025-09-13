import { a as S, T as ot, L as Y, B as Rt, k as q, l as V, i as ut, n as z, D as M, o as Pt, R as L, A as _t, q as I, r as j, b as x, E as wt, d as R, s as K, C as D, G as J, u as G, t as St, m as lt, v as Tt, w as Ft, e as st, x as xt, P as gt, y as Ot, g as It, z as mt, F as Bt, H as Vt } from "./app2.js";
import { C as O, T as yt, b as X } from "./SndBuf.js";
import { a as F, T as jt } from "./Reading.js";
import { R as bt, a as ct } from "./ScriptIterator.js";
class Q {
  constructor(t, e, s, i, n, o, a, l) {
    this.cls = e, this.hArg = n, this.sys = o, this.val = a, this.ret = l;
    const d = o.hFactoryCls[e];
    if (!d) throw `属性 class【${e}】が不正です`;
    const p = d(), c = d();
    p.layname = c.layname = t;
    const m = n[":id_tag"] = `layer:${t} cls:${e} page:`;
    p.ctn.name = p.name = m + "A", c.ctn.name = c.name = m + "B", s.addChild(p.ctn), i.addChild(c.ctn), S(n, "visible", !0), S(n, "visible", !0), l.isWait = p.lay(n) || c.lay(n), this.#i = { fore: p, back: c }, i.visible = !1;
    const u = `const.sn.lay.${t}`;
    a.setVal_Nochk("tmp", u, !0), a.defTmp(u + ".fore.alpha", () => this.#i.fore.alpha), a.defTmp(u + ".back.alpha", () => this.#i.back.alpha), a.defTmp(u + ".fore.height", () => this.#i.fore.height), a.defTmp(u + ".back.height", () => this.#i.back.height), a.defTmp(u + ".fore.visible", () => this.#i.fore.ctn.visible), a.defTmp(u + ".back.visible", () => this.#i.back.ctn.visible), a.defTmp(u + ".fore.width", () => this.#i.fore.width), a.defTmp(u + ".back.width", () => this.#i.back.width), a.defTmp(u + ".fore.x", () => this.#i.fore.x), a.defTmp(u + ".back.x", () => this.#i.back.x), a.defTmp(u + ".fore.y", () => this.#i.fore.y), a.defTmp(u + ".back.y", () => this.#i.back.y);
  }
  #i;
  destroy() {
    this.#i.fore.destroy(), this.#i.back.destroy();
  }
  lay = (t) => this.getPage(t).lay(t);
  getPage = (t) => Q.argChk_page(t, "fore") !== "back" ? this.#i.fore : this.#i.back;
  static argChk_page(t, e) {
    const s = t.page ?? e;
    if (s === "fore" || s === "back") return t.page = s;
    throw Error("属性 page【" + s + "】が不正です");
  }
  get fore() {
    return this.#i.fore;
  }
  get back() {
    return this.#i.back;
  }
  transPage(t) {
    [this.#i.back, this.#i.fore] = [this.#i.fore, this.#i.back], this.#i.back.copy(this.#i.fore, t);
  }
}
class ht {
  //	static	readonly	#alzTagArg	= new AnalyzeTagArg;
  constructor(t, e = !1) {
    this.bg_col = t, this.isLay = e;
  }
  static init(t, e, s, i, n, o) {
  }
  static cvsResizeDesign() {
  }
  destroy() {
  }
  gethArg() {
    return this.hArg;
  }
  hArg = {};
  sethArg(t) {
    this.hArg = t;
  }
  setOther(t) {
  }
  adopt(t) {
  }
  static enterMode() {
  }
  static allHide() {
  }
  set visible(t) {
  }
  static leaveMode() {
  }
  cvsResize() {
  }
  make() {
  }
  static replaceToken(t) {
  }
}
class Dt extends ht {
  constructor(t, e) {
    super("#29e", !0);
  }
  setSp(t) {
  }
}
class y {
  constructor(t = "", e, s = () => {
  }, i = () => {
  }) {
    this.csvFn = t, this.ctn = e, this.fncFirstComp = s, this.fncAllComp = i, t && (this.#m = e ? (n) => {
      e.addChild(n), this.#r.push(n);
    } : () => {
    }, this.ret = y.#_(
      t,
      (n) => this.fncFirstComp(n),
      // 差し替え考慮
      (n) => this.fncAllComp(n),
      // 差し替え考慮
      (n) => this.#m(n)
      // 差し替え考慮
    ));
  }
  static #i;
  static #e;
  static #n;
  static #l;
  static init(t, e, s, i, n) {
    y.#i = t, y.#e = e, y.#n = s, y.#l = i, s.arg.crypto && (y.#u = y.#h, y.#o = y.#U);
    const o = () => {
      const a = y.#c * y.#t;
      for (const l of Object.values(y.#x)) l.volume = a;
    };
    n.setNoticeChgVolume(
      (a) => {
        y.#c = a, o();
      },
      (a) => {
        y.#t = a, o();
      }
    );
  }
  static #t = 1;
  static #c = 1;
  static #p;
  static setEvtMng(t) {
    y.#p = t;
  }
  ret = !1;
  #m;
  #r = [];
  destroy() {
    this.fncFirstComp = () => {
    }, this.fncAllComp = () => {
    }, this.#m = (t) => t.destroy();
    for (const t of this.#r)
      y.stopVideo(t.name), t.parent?.removeChild(t), t.destroy();
    this.#r = [];
  }
  static destroy() {
    y.#s = {}, y.#d = {}, y.#x = {};
  }
  //static #ldrHFn: {[fn: string]: 1} = {};
  static #_(t, e, s, i) {
    if (!t) return !1;
    let n = !1;
    if (t.startsWith("data:")) {
      const c = () => {
        const m = I.from(t);
        i(m), e(m), s(n);
      };
      return t in ot ? c() : (n = !0, new Y().add(t, t).load(c)), n;
    }
    const o = [], a = new Y(), l = t.split(","), d = l.length;
    for (let c = 0; c < d; ++c) {
      const m = l[c];
      if (!m) throw "face属性に空要素が含まれます";
      const { dx: u, dy: r, blendmode: h, fn: f } = y.#s[m] || {
        fn: m,
        dx: 0,
        dy: 0,
        blendmode: Rt.NORMAL
      }, b = c === 0 ? e : (C) => {
        C.transform !== null && (C.x = u, C.y = r, C.blendMode = h);
      };
      if (o.push({ fn: f, fnc: b }), f in y.#d || f in ot || f in Y.shared.resources) continue;
      n = !0;
      const v = y.#i.searchPath(f, q.SP_GSM), N = this.#n.arg.crypto ? { xhrType: v.slice(-5) === ".json" ? V.XHR_RESPONSE_TYPE.TEXT : V.XHR_RESPONSE_TYPE.BUFFER } : {};
      a.add({ ...N, name: f, url: v });
    }
    const p = (c, m) => {
      for (const { fn: u, fnc: r } of o) {
        const h = y.#v(u, m);
        h.name = u, i(h), r(h);
      }
      s(n);
    };
    return n ? a.use(async (c, m) => {
      try {
        if (c.extension === "json") {
          const r = await this.#n.dec("json", c.data);
          y.#o(r, c, m);
          return;
        }
        const u = await this.#n.decAB(c.data);
        y.#u(u, c, m);
      } catch (u) {
        const r = `画像/動画ロード失敗です fn:${c.name} ${u}`;
        y.#p.isSkipping ? console.warn(r) : console.error("%c" + r, "color:#FF3300;");
      }
    }).load(p) : queueMicrotask(() => p(0, {})), n;
  }
  static #s = {};
  static #d = {};
  static #u = (t, { type: e, name: s, data: i }, n) => {
    switch (e) {
      case V.TYPE.VIDEO:
        const o = i;
        o.volume = y.#c, y.#x[s] = y.#g(o);
    }
    n();
  };
  static #f(t) {
    const e = /([^\d]+)\d+\.(\w+)/.exec(t[0] ?? "");
    if (!e) return [];
    const s = e[1].length, i = -e[2].length - 1;
    return t.sort((n, o) => ut(n.slice(s, i)) > ut(o.slice(s, i)) ? 1 : -1);
  }
  static async #h(t, e, s) {
    e.data = t, e.extension !== "bin" && s(), t instanceof HTMLImageElement ? (e.texture = await z.fromLoader(t, e.url, e.name), e.type = V.TYPE.IMAGE) : t instanceof HTMLVideoElement && (t.volume = y.#c, y.#x[e.name] = y.#g(t), e.type = V.TYPE.VIDEO), s();
  }
  static #g(t) {
    return y.#e.getVal("const.sn.needClick2Play") && (M.trace_beforeNew(`[lay系] ${M.strPos()}未クリック状態で動画を自動再生します。音声はミュートされます`, "W"), t.muted = !0), t.setAttribute("playsinline", ""), t;
  }
  static #o = (t, { type: e, spritesheet: s, name: i, data: n }, o) => {
    switch (e) {
      case V.TYPE.JSON:
        const a = s._frameKeys;
        y.#f(a), y.#d[i] = {
          aTex: a.map((l) => z.from(l)),
          meta: n.meta
        };
    }
    o();
  };
  static #U(t, e, s) {
    const { meta: i, frames: n } = e.data = JSON.parse(t);
    if (e.type = V.TYPE.JSON, !i?.image) {
      s();
      return;
    }
    const o = Pt(i.image), a = y.#i.searchPath(o, q.SP_GSM);
    new Y().use((l, d) => {
      this.#n.decAB(l.data).then((p) => {
        l.data = p, p instanceof HTMLImageElement && (l.type = V.TYPE.IMAGE, URL.revokeObjectURL(p.src)), d();
      }).catch((p) => this.#l.errScript(`画像/動画ロード失敗です dec2res4Cripto fn:${l.name} ${p}`, !1));
    }).add({ name: o, url: a, xhrType: V.XHR_RESPONSE_TYPE.BUFFER }).load((l, d) => {
      for (const { data: p } of Object.values(l.resources)) {
        const { baseTexture: c } = z.from(p), m = Object.values(n);
        y.#d[e.name] = {
          aTex: m.map(({ frame: { x: u, y: r, w: h, h: f } }) => new z(
            c,
            new L(u, r, h, f)
          )),
          meta: i
        };
      }
      s();
    });
  }
  static #v(t, e) {
    const s = y.#d[t];
    if (s) {
      const o = new _t(s.aTex);
      return o.animationSpeed = s.meta.animationSpeed ?? 1, o.play(), o;
    }
    if (t in ot) return I.from(t);
    const i = y.#x[t];
    if (i) return I.from(i);
    const n = e[t];
    return n ? new I(n.texture) : new I();
  }
  static #x = {};
  static getHFn2VElm(t) {
    return y.#x[t];
  }
  static wv(t) {
    const { fn: e } = t;
    if (!e) throw "fnは必須です";
    const s = y.#x[e];
    if (!s || s.loop) return !1;
    if (y.#p.isSkipping || s.ended)
      return y.stopVideo(e), !1;
    const i = "wv fn:" + e, n = S(t, "stop", !0), o = () => {
      n && y.stopVideo(e);
    };
    return F.beginProc(i, o, !0, o), s.addEventListener("ended", () => F.notifyEndProc(i), { once: !0, passive: !0 }), !0;
  }
  static stopVideo(t) {
    const e = y.#x[t];
    e && (delete y.#x[t], e.pause(), e.currentTime = e.duration);
  }
  static add_face(t) {
    const { name: e } = t;
    if (!e) throw "nameは必須です";
    if (e in y.#s) throw "一つのname（" + e + "）に対して同じ画像を複数割り当てられません";
    const { fn: s = e } = t;
    return y.#s[e] = {
      fn: s,
      dx: x(t, "dx", 0),
      dy: x(t, "dy", 0),
      blendmode: j.getBlendmodeNum(t.blendmode || "")
    }, !1;
  }
  //	static	clearFace2Name(): void {SpritesMng.hFace = {}}
}
class H extends j {
  static #i = new wt();
  static #e;
  static init(t, e, s, i, n, o) {
    H.#e = s, y.init(e, o, i, t, n);
  }
  static destroy() {
    H.#i.clear(), y.destroy();
  }
  #n = new Dt(this.ctn, this);
  constructor() {
    super(), R.isDbg && (this.#l = (t) => this.#n.setSp(t), this.cvsResize = () => {
      super.cvsResize(), this.#n.cvsResize();
    });
  }
  #l = () => {
  };
  #t = "";
  #c = "";
  #p = "";
  lay = (t) => {
    const e = F.procID + `GrpLayer lay name:${this.name_}`, s = this.#m(t, (i) => {
      i && F.endProc(e);
    });
    return s && F.beginProc(e), s;
  };
  #m(t, e) {
    const { fn: s, face: i = "" } = t;
    if (this.#n.sethArg(t), !s)
      return super.lay(t), this.ctn.children.length > 0 && this.setPos(t), this.#c = "", this.#t = this.#p = i, e(!1), !1;
    const n = "fn" in t, o = "face" in t;
    return this.clearLay({ clear_filter: S(t, "clear_filter", !0) }), n && (this.#c = s), o && (this.#p = i), super.lay(t), t.dx = 0, t.dy = 0, this.#r.destroy(), this.#r = new y(
      this.#t = s + (i ? "," + i : ""),
      this.ctn,
      (a) => {
        ("width" in t || "height" in t) && (a.width = x(t, "width", 0), a.height = x(t, "height", 0)), this.#_ = a.width, this.#s = a.height, j.setXY(a, t, this.ctn, !0), j.setBlendmode(this.ctn, t), this.#l(a);
      },
      (a) => e(a)
    ), this.#r.ret;
  }
  #r = new y();
  #_ = 0;
  #s = 0;
  get width() {
    return this.#_;
  }
  get height() {
    return this.#s;
  }
  renderStart() {
    this.#u = new I(this.#d), this.#u.visible = !1, this.ctn.addChildAt(this.#u, 0), this.#u.position.set(-this.ctn.x, -this.ctn.y);
    let t = () => {
      const e = this.ctn.alpha;
      this.ctn.alpha = 1;
      for (const s of this.ctn.children) s.visible = !0;
      this.#u.visible = !1, H.#e.renderer.render(this.ctn, { renderTexture: this.#d }), this.ctn.alpha = e;
      for (const s of this.ctn.children) s.visible = !1;
    };
    if (!this.containMovement) {
      let e = t;
      t = () => {
        t = () => {
        }, e();
      };
    }
    this.#f = () => {
      t(), this.#u.visible = !0;
    }, H.#e.ticker.add(this.#f);
  }
  #d = K.create({
    width: R.stageW,
    height: R.stageH
  });
  #u = new I();
  #f = () => {
  };
  renderEnd() {
    H.#e.ticker.remove(this.#f), this.ctn.removeChild(this.#u);
    for (const t of this.ctn.children) t.visible = !0;
    this.#u.destroy(!0), this.#d = K.create({
      width: R.stageW,
      height: R.stageH
    });
  }
  setPos(t) {
    j.setXY(
      this.ctn.children[0] ?? this.ctn,
      t,
      this.ctn,
      !0
    );
  }
  // アニメ・動画を含むか
  get containMovement() {
    if (this.#t === "") return !1;
    const t = this.ctn.children;
    return this.#t.split(",").some(
      (e, s) => t[s] instanceof _t || y.getHFn2VElm(e)
    );
  }
  clearLay(t) {
    super.clearLay(t), this.#r.destroy(), this.#c = "", this.#p = "", this.#t = "";
  }
  record = () => ({
    ...super.record(),
    sBkFn: this.#c,
    sBkFace: this.#p
    //		idc_hArg	: this.#idc.gethArg(),
  });
  playback(t, e) {
    if (super.playback(t, e), t.sBkFn === "" && t.sBkFace === "") {
      this.#c = "", this.#p = "";
      return;
    }
    e.push(new Promise((s) => this.#m(
      { fn: t.sBkFn, face: t.sBkFace, left: t.x, top: t.y, alpha: t.alpha, blendmode: j.getNum2Blendmode(t.blendMode), rotation: t.rotation, scale_x: t.scale_x, scale_y: t.scale_y },
      (i) => {
        this.ctn.position.set(t.x, t.y), s();
      }
      // Layer.setXY()の後に再度移動
    )));
  }
  makeDesignCast(t) {
    this.ctn.visible && t(this.#n);
  }
  //makeDesignCastChildren(_gdc: IMakeDesignCast) {}
  cvsResize() {
    super.cvsResize();
  }
  showDesignCast() {
    this.#n.visible = !0;
  }
  //showDesignCastChildren() {}
  dump = () => super.dump() + `, "pic":"${this.#t}"`;
}
const Z = "、。，．）］｝〉」』】〕”〟ぁぃぅぇぉっゃゅょゎァィゥェォッャュョヮヵヶ！？!?‼⁉・ーゝゞヽヾ々", it = "［（｛〈「『【〔“〝", nt = "─‥…", rt = Z, kt = new RegExp(`[${Z}]`), Wt = new RegExp(`[${it}]`), Ht = new RegExp(`[${nt}]`), zt = kt;
class Jt {
  #i = Z;
  #e = it;
  #n = nt;
  #l = rt;
  get 行頭禁則() {
    return this.#i;
  }
  get 行末禁則() {
    return this.#e;
  }
  get 分割禁止() {
    return this.#n;
  }
  get ぶら下げ() {
    return this.#l;
  }
  #t = kt;
  #c = Wt;
  #p = Ht;
  #m = zt;
  break_fixed = !1;
  break_fixed_left = 0;
  break_fixed_top = 0;
  bura = !1;
  lay(t) {
    t.kinsoku_sol && (this.#i = t.kinsoku_sol, this.#t = new RegExp(`[${this.#i}]`)), t.kinsoku_eol && (this.#e = t.kinsoku_eol, this.#r(), this.#c = new RegExp(`[${this.#e}]`)), t.kinsoku_dns && (this.#n = t.kinsoku_dns, this.#_(), this.#p = new RegExp(`[${this.#n}]`)), t.kinsoku_bura && (this.#l = t.kinsoku_bura, this.#r(), this.#_(), this.#m = new RegExp(`[${this.#l}]`)), "bura" in t && (this.bura = S(t, "bura", !1)), this.break_fixed = S(t, "break_fixed", this.break_fixed), this.break_fixed_left = x(t, "break_fixed_left", this.break_fixed_left), this.break_fixed_top = x(t, "break_fixed_top", this.break_fixed_top);
  }
  // 禁則の競合（ぶら下げ と 行末禁則 の両方に含まれる文字があってはならない）
  #r() {
    const t = this.#e.length, e = this.#l.length;
    if (t < e)
      for (let s = 0; s < t; ++s) {
        const i = this.#e[s];
        if (this.#l.includes(i)) throw `禁則の競合があります。文字 ${i} がぶら下げ と 行末禁則 の両方に含まれます`;
      }
    else
      for (let s = 0; s < e; ++s) {
        const i = this.#l[s];
        if (this.#e.includes(i)) throw `禁則の競合があります。文字 ${i} がぶら下げ と 行末禁則 の両方に含まれます`;
      }
  }
  // 禁則の競合（ぶら下げ と 分割禁止 の両方に含まれる文字があってはならない）
  #_() {
    const t = this.#n.length, e = this.#l.length;
    if (t < e)
      for (let s = 0; s < t; ++s) {
        const i = this.#n[s];
        if (this.#l.includes(i)) throw `禁則の競合があります。文字 ${i} がぶら下げ と 分割禁止 の両方に含まれます`;
      }
    else
      for (let s = 0; s < e; ++s) {
        const i = this.#l[s];
        if (this.#n.includes(i)) throw `禁則の競合があります。文字 ${i} がぶら下げ と 分割禁止 の両方に含まれます`;
      }
  }
  reNew(t) {
    t.#s(this.#i, this.#e, this.#n, this.#l), t.break_fixed = this.break_fixed, t.break_fixed_left = this.break_fixed_left, t.break_fixed_top = this.break_fixed_top, t.bura = this.bura;
  }
  #s(t, e, s, i) {
    this.#i != t && (this.#i = t, this.#t = new RegExp(`[${t}]`)), this.#e != e && (this.#e = e, this.#c = new RegExp(`[${e}]`)), this.#n != s && (this.#n = s, this.#p = new RegExp(`[${s}]`)), this.#l != i && (this.#l = i, this.#m = new RegExp(`[${i}]`));
  }
  record() {
    const t = {
      break_fixed: this.break_fixed,
      break_fixed_left: this.break_fixed_left,
      break_fixed_top: this.break_fixed_top,
      bura: this.bura
    };
    return this.#i === Z && (t.行頭禁則 = this.#i), this.#e === it && (t.行末禁則 = this.#e), this.#n === nt && (t.分割禁止 = this.#n), this.#l === rt && (t.ぶら下げ = this.#l), t;
  }
  playback(t) {
    t && (this.#s(
      t.行頭禁則 ?? Z,
      t.行末禁則 ?? it,
      t.分割禁止 ?? nt,
      t.ぶら下げ ?? rt
    ), this.break_fixed = t.break_fixed, this.break_fixed_left = t.break_fixed_left, this.break_fixed_top = t.break_fixed_top, this.bura = t.bura);
  }
  hyph(t, e, s, i, n) {
    let o, a = 0, l = 2, d = (p) => (d = () => !1, i === p ? (i > 0 && (t.innerHTML = n.replaceAll('class="sn_ch"', 'class="sn_ch sn_ch_in_default"')), !0) : p < 2);
    do {
      if (o = this.#u(t, e), a = o.length, d(a)) break;
      let p = -1 / 0;
      for (; l < a; ++l) {
        const { elm: c, rect: m, ch: u } = o[l];
        if (c.tagName === "RT") continue;
        const r = s ? m.y : m.x;
        if (p <= r || c.previousElementSibling?.tagName === "SPAN" && c.previousElementSibling?.innerHTML.includes("<br>") || c.parentElement?.previousElementSibling?.tagName === "SPAN" && c.parentElement?.previousElementSibling?.innerHTML.includes("<br>")) {
          p = r, this.break_fixed || (this.break_fixed_left = m.x, this.break_fixed_top = m.y);
          continue;
        }
        const h = this.#d(o, l), { elm: f, rect: b, ch: v } = o[h];
        if (!this.break_fixed) {
          this.break_fixed_left = b.x, this.break_fixed_top = b.y;
          const T = globalThis.getComputedStyle(f), B = parseFloat(T.fontSize);
          s ? this.break_fixed_top += B : this.break_fixed_left += B;
        }
        p = -1 / 0;
        const N = l, { cont: C, ins: _ } = this.bura ? this.hyph_alg_bura(o, h, v, l) : this.hyph_alg(o, h, v, l, u);
        if (l = _, C) continue;
        const $ = o[l].elm, E = $.parentElement, P = document.createElement("br");
        if (E.classList.contains("sn_tx")) E.insertBefore(P, $);
        else {
          const T = E.parentElement;
          T.classList.contains("sn_ch") ? T.parentElement.insertBefore(P, T) : T.insertBefore(P, E);
        }
        l += 2, l < N && (l = N), a = -1;
        break;
      }
    } while (a < 0);
    return [o, a];
  }
  // 一つ前の要素を探す（ルビ対応）
  #d(t, e) {
    const s = e - 1, { elm: i } = t[s];
    return i.tagName !== "RT" ? s - (i.style.textCombineUpright === "all" ? Array.from(i.textContent ?? "").length - 1 : 0) : s - Array.from(i.textContent ?? "").length;
  }
  #u(t, e) {
    const s = [];
    if (t.nodeType !== t.TEXT_NODE) return Array.from(t.childNodes).map((a) => this.#u(a, e)).flat();
    const i = t.ownerDocument.createRange();
    i.selectNodeContents(t);
    let n = 0;
    const o = i.endOffset;
    for (; n < o; ) {
      i.setStart(t, n), i.setEnd(t, ++n);
      const a = i.toString();
      s.push({
        ch: a,
        rect: e(i, a),
        elm: i.startContainer.parentElement
      });
    }
    return i.detach(), s;
  }
  /**
   * 抽象化した禁則処理アルゴリズム
   * @method hyph_alg
   * @param {IChRect[]} a - 文章の抽象化配列
   * @param {number} p_i - 処理要素の一つ前の添字
   * @param {string} p_ch - 処理要素の一つ前の文字
   * @param {number} i - 処理要素の添字
   * @param {string} ch - 処理要素の文字
   * @return {Object} result 戻り値
   * @return {boolean} result.cont - true: 呼び元で改行挿入せず continue
   * @return {number} result.ins - 手前に改行を挿入すべき要素の添字
   */
  hyph_alg(t, e, s, i, n) {
    if (!this.#c.test(s)) {
      if (this.#t.test(n))
        for (; (i = this.#d(t, i)) >= 0 && this.#t.test(t[i].ch); )
          ;
      else if (!(s === n && this.#p.test(s))) return { cont: !0, ins: i + 1 };
    }
    for (i = e; (i = this.#d(t, i)) >= 0 && this.#c.test(t[i].ch); )
      ;
    return { cont: !1, ins: i + 1 };
  }
  /**
   * 抽象化した禁則処理アルゴリズム
   * @method hyph_alg
   * @param {IChRect[]} a - 文章の抽象化配列
   * @param {number} p_i - 処理要素の一つ前の添字
   * @param {string} p_ch - 処理要素の一つ前の文字
   * @param {number} i - 処理要素の添字
   * @return {Object} result 戻り値
   * @return {boolean} result.cont - true: 呼び元で改行挿入せず continue
   * @return {number} result.ins - 手前に改行を挿入すべき要素の添字
   */
  hyph_alg_bura(t, e, s, i) {
    const n = this.#d(t, e), { ch: o } = t[n];
    if (this.#m.test(o) || this.#t.test(o)) {
      let l = e;
      (this.#m.test(s) || this.#t.test(s)) && ++l;
      const d = this.#d(t, l), { ch: p } = t[d], { ch: c } = t[l];
      if (p === c && this.#p.test(c)) return { cont: !1, ins: d };
      if (!this.#c.test(p)) return { cont: !1, ins: l };
      l = d;
      do
        if (!this.#c.test(t[l].ch)) break;
      while ((l = this.#d(t, l)) >= 0);
      return { cont: !1, ins: l + 1 };
    }
    const a = this.#d(t, n);
    if (i >= 3) {
      const { ch: l } = t[a];
      if (this.#p.test(o) && l === o)
        return { cont: !1, ins: a };
      if (this.#c.test(l)) {
        let d = a;
        for (; (d = this.#d(t, d)) >= 0 && this.#c.test(t[d].ch); )
          ;
        return { cont: !1, ins: d + 1 };
      }
    }
    return { cont: !1, ins: n };
  }
}
class g extends D {
  constructor(t, e, s) {
    super(), this.ctn = t, this.canFocus = e, this.sys = s, this.#t.classList.add("sn_tx"), this.#t.style.position = "absolute", g.#e.view.parentElement.appendChild(this.#t), this.addChild(this.#c), this.addChild(this.#p), this.#p.name = "grpDbgMasume";
    const i = R.debugLog ? ({ ch: n, rect: { x: o, y: a, width: l, height: d } }) => console.log(`🍌 masume ch:${n} x:${o} y:${a} w:${l} h:${d}`) : () => {
    };
    this.#_ = g.#i.oCfg.debug.masume ? (n) => {
      i(n);
      const { x: o, y: a, width: l, height: d } = n.rect;
      this.#p.beginFill(6737151, 0.5).lineStyle(2, 16724736, 1).drawRect(o, a, l, d).endFill();
    } : () => {
    }, this.noticeCompTxt = s.isApp && g.#i.oCfg.debug.dumpHtm ? () => {
      F.notifyEndProc(bt);
      const n = this.#t.innerHTML;
      if (n === "") return;
      const { fn: o, ln: a } = g.#l.nowScrFnLn(), l = `dumpHtm ${t.name.slice(0, -7).replaceAll(":", "=")}(fn=${o} line=${a})`;
      s.outputFile(
        s.path_downloads + l + ".htm",
        `<!doctype html><html><head><meta charset=utf-8><title>${l}</title>
<h1>${l}</h1>${n.replaceAll(/ class="sn_ch"|animation-delay: \d+ms; ?| data-add="{&quot;ch_in_style&quot;:&quot;default&quot;, &quot;ch_out_style&quot;:&quot;default&quot;}"/g, "").replaceAll(' style=""', "").replaceAll(/(<\/?ruby>)/g, `
$1
`).replaceAll(/<(br|\/span)>/g, `<$1>
`)}`
      );
    } : () => F.notifyEndProc(bt);
  }
  static #i;
  static #e;
  static init(t, e) {
    g.#i = t, g.#e = e;
  }
  static #n;
  static #l;
  static setEvtMng(t, e) {
    g.#n = t, g.#l = e;
  }
  static destroy() {
    g.#j = /* @__PURE__ */ Object.create(null), g.#P = /* @__PURE__ */ Object.create(null), g.delBreak();
  }
  #t = document.createElement("span");
  // サンプリング元
  #c = new D();
  // サンプリング先
  #p = new J();
  static #m = {
    "background-color": 0,
    "border-bottom-width": 0,
    "border-left-width": 0,
    "border-right-width": 0,
    "border-top-width": 0,
    "margin-bottom": 0,
    "margin-left": 0,
    "margin-right": 0,
    "margin-top": 0
  };
  #r = new Jt();
  noticeCompTxt = () => {
  };
  #_;
  //	readonly	#idc	:TxtLayDesignCast;
  //	readonly	#idcCh	= new TxtLayPadDesignCast(this);
  #s = {
    fontsize: 24,
    $width: 0,
    // レイヤサイズであり、背景色（画像）サイズ
    $height: 0,
    pad_left: 0,
    // paddingLeft（レイヤサイズの内側のスペーサー）
    pad_right: 0,
    // paddingRight
    pad_top: 0,
    // paddingTop
    pad_bottom: 0
    // paddingBottom
  };
  lay(t) {
    const e = this.#t.style;
    if ("style" in t)
      if (t.style) {
        const s = document.createElement("span");
        s.style.cssText = t.style;
        const i = s.style.length;
        for (let n = 0; n < i; ++n) {
          const o = s.style[n];
          if (o in g.#m) {
            M.myTrace(`${o}は指定できません`, "W");
            continue;
          }
          e[o] = s.style[o];
        }
        !s.style.opacity && "alpha" in t && (e.opacity = String(this.ctn.alpha));
      } else this.#t.style.cssText = "";
    else "alpha" in t && (e.opacity = String(this.ctn.alpha));
    if ("width" in t && (e.width = (t.width ?? "0") + "px"), "height" in t && (e.height = (t.height ?? "0") + "px"), "pl" in t && (e.paddingLeft = (t.pl ?? "0") + "px"), "pr" in t && (e.paddingRight = (t.pr ?? "0") + "px"), "pt" in t && (e.paddingTop = (t.pt ?? "0") + "px"), "pb" in t && (e.paddingBottom = (t.pb ?? "0") + "px"), this.#r.lay(t), this.#u(), this.#f = this.ctn.position.x, e.transformOrigin = `${this.ctn.pivot.x}px ${this.ctn.pivot.y}px`, this.cvsResize(), e.display = this.ctn.visible ? "inline" : "none", ":redraw" in t && this.#a > 0) {
      const s = [
        this.#t.innerHTML.replaceAll(/(animation-delay: )\d+ms/g, "$10ms"),
        `<span class='sn_ch' data-add='{"ch_in_style":"default"}'>&emsp;</span>`
      ];
      this.#$(), this.goTxt(s, !0);
    }
  }
  #d = 0;
  // 「g」などで下が欠ける問題対策
  #u() {
    const t = this.#t.style, e = parseFloat(t.fontSize || "0");
    this.#s.fontsize = e, this.#s.pad_left = parseFloat(t.paddingLeft || "0"), this.#s.pad_right = parseFloat(t.paddingRight || "0"), this.#s.pad_top = parseFloat(t.paddingTop || "0"), this.#s.pad_bottom = parseFloat(t.paddingBottom || "0"), this.#s.$width = parseFloat(t.width || "0"), this.#s.$height = parseFloat(t.height || "0"), this.position.set(this.#s.pad_left, this.#s.pad_top), this.#h = t.writingMode === "vertical-rl", this.#g = 0, this.#o = 0;
    const s = t.lineHeight ?? "0";
    this.#d = this.#h ? 0 : (s.endsWith("px") ? parseFloat(s) : e * parseFloat(s) - e) / 2;
  }
  cvsResize() {
    const t = this.#t.style, e = this.sys.cvsScale;
    t.left = `${this.sys.ofsLeft4elm + this.#f * e}px`, t.top = `${this.sys.ofsTop4elm + this.ctn.position.y * e}px`, t.transform = `rotate(${this.ctn.angle}deg) scale(${this.ctn.scale.x * e}, ${this.ctn.scale.y * e})`;
  }
  #f = 0;
  #h = !1;
  get tategaki() {
    return this.#h;
  }
  #g = 0;
  #o = 0;
  get infTL() {
    return this.#s;
  }
  get getWidth() {
    return this.#s.$width;
  }
  get getHeight() {
    return this.#s.$height;
  }
  setMySize(t, e) {
    this.#s.$width = t, this.#s.$height = e, this.#t.style.width = this.#s.$width + "px", this.#t.style.height = this.#s.$height + "px";
  }
  #U(t, e = !0) {
    const s = {
      escape: (h) => h.replaceAll(/([.*+?^${}()|\[\]\/\\])/g, "\\$1"),
      mimeType: (h) => {
        const f = l(h).toLowerCase();
        return i()[f] || "";
      },
      dataAsUrl: m,
      isDataUrl: d,
      resolveUrl: p,
      getAndEncode: c,
      asArray: (h) => {
        const f = [], b = h.length;
        for (let v = 0; v < b; ++v) f.push(h[v]);
        return f;
      }
    };
    function i() {
      const h = "application/font-woff", f = "image/jpeg";
      return {
        woff: h,
        woff2: h,
        ttf: "application/font-truetype",
        eot: "application/vnd.ms-fontobject",
        png: "image/png",
        jpg: f,
        jpeg: f,
        gif: "image/gif",
        tiff: "image/tiff",
        svg: "image/svg+xml"
      };
    }
    const n = u(), o = r();
    function a(h) {
      return o.resolveAll().then((f) => {
        const b = document.createElement("style");
        return h.appendChild(b), b.appendChild(document.createTextNode(f)), h;
      });
    }
    function l(h) {
      return /\.([^\.\/]*?)$/g.exec(h)?.[1] ?? "";
    }
    function d(h) {
      return h.search(/^(data:)/) !== -1;
    }
    function p(h, f) {
      const b = document.implementation.createHTMLDocument(), v = b.createElement("base");
      b.head.appendChild(v);
      const N = b.createElement("a");
      return b.body.appendChild(N), v.href = f, N.href = h, N.href;
    }
    function c(h) {
      let f = 3e4;
      return new Promise(function(b) {
        const v = new XMLHttpRequest();
        v.onreadystatechange = N, v.ontimeout = C, v.responseType = "blob", v.timeout = f, v.open("GET", h, !0), v.send();
        function N() {
          if (v.readyState !== 4) return;
          if (v.status !== 200) {
            _("cannot fetch resource: " + h + ", status: " + v.status);
            return;
          }
          const $ = new FileReader();
          $.onloadend = function() {
            const E = $.result.toString().split(/,/)[1];
            b(E);
          }, $.readAsDataURL(v.response);
        }
        function C() {
          _("timeout of " + f + "ms occured while fetching resource: " + h);
        }
        function _($) {
          console.error($), b("");
        }
      });
    }
    function m(h, f) {
      return "data:" + f + ";base64," + h;
    }
    function u() {
      const h = /url\(['"]?([^'"]+?)['"]?\)/g;
      return {
        inlineAll: N,
        shouldProcess: f
      };
      function f(C) {
        return C.search(h) !== -1;
      }
      function b(C) {
        const _ = [];
        let $;
        for (; $ = h.exec(C); )
          _.push($[1]);
        return _.filter(function(E) {
          return !s.isDataUrl(E);
        });
      }
      function v(C, _, $, E) {
        return Promise.resolve(_).then((T) => $ ? s.resolveUrl(T, $) : T).then(E || s.getAndEncode).then((T) => s.dataAsUrl(T, s.mimeType(_))).then((T) => C.replace(P(_), "$1" + T + "$3"));
        function P(T) {
          return new RegExp(`(url\\(['"]?)(` + s.escape(T) + `)(['"]?\\))`, "g");
        }
      }
      function N(C, _, $) {
        if (E()) return Promise.resolve(C);
        return Promise.resolve(C).then(b).then((P) => {
          let T = Promise.resolve(C);
          for (const B of P) T = T.then((at) => v(at, B, _, $));
          return T;
        });
        function E() {
          return !f(C);
        }
      }
    }
    function r() {
      return {
        resolveAll: h,
        impl: { readAll: f }
      };
      function h() {
        return f().then((b) => Promise.allSettled(
          b.map((v) => v.resolve())
        )).then((b) => b.join(`
`));
      }
      function f() {
        return Promise.resolve(s.asArray(document.styleSheets)).then(v).then(b).then((C) => C.map(N));
        function b(C) {
          return C.filter((_) => _.type === CSSRule.FONT_FACE_RULE).filter((_) => n.shouldProcess(_.style.getPropertyValue("src")));
        }
        function v(C) {
          const _ = [];
          for (const $ of C)
            try {
              if ($.href) continue;
              s.asArray($.cssRules || []).forEach(_.push.bind(_));
            } catch (E) {
              console.error("Error while reading CSS rules from " + $.href, String(E));
            }
          return _;
        }
        function N(C) {
          return {
            resolve: function() {
              const $ = (C.parentStyleSheet || {}).href;
              return n.inlineAll(C.cssText, $);
            },
            src: function() {
              return C.style.getPropertyValue("src");
            }
          };
        }
      }
    }
    Promise.resolve(this.#t).then((h) => {
      const f = h.cloneNode(!0);
      return f.style.padding = "0px", f.style.paddingRight = this.#g + "px", f.style.paddingTop = this.#o + "px", f.style.left = "0px", f.style.top = "0px", f.style.width = this.#s.$width - this.#s.pad_left - this.#s.pad_right + "px", f.style.height = this.#s.$height - this.#s.pad_top - this.#s.pad_bottom + "px", this.#t.hidden = e, f;
    }).then(a).then((h) => {
      h.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
      const f = new Image();
      return f.src = `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="${this.#s.$width}px" height="${this.#s.$height}px"><foreignObject x="0" y="0" width="100%" height="100%">${new XMLSerializer().serializeToString(h).replaceAll("#", "%23").replaceAll(`
`, "%0A")}</foreignObject></svg>`, new Promise((b) => f.onload = () => b(f));
    }).then((h) => new Promise((f) => setTimeout(() => f(h), 100))).then((h) => {
      const f = document.createElement("canvas");
      f.width = this.#s.$width, f.height = this.#s.$height, f.getContext("2d").drawImage(h, 0, 0), t(z.from(f));
    }).catch((h) => M.myTrace(`goTxt() = ${h}`));
  }
  #v = [];
  // FIFO実行バッファ
  goTxt(t, e) {
    const s = () => this.#E(t, e);
    this.#v.push(s) === 1 && s();
  }
  #x = [];
  #a = 0;
  static #b = "<span class='sn_ch sn_ch_last'>&emsp;</span>";
  #E(t, e) {
    g.#N.visible = !1;
    let s = this.#x.length, i = "";
    if (s === 0) {
      if (g.#i.oCfg.debug.masume && (R.debugLog && console.log(`🍌 masume ${this.name} v:${this.visible} l:${this.x} t:${this.y} a:${this.alpha} pl:${this.#s.pad_left} pr:${this.#s.pad_right} pt:${this.#s.pad_top} pb:${this.#s.pad_bottom} w:${this.#s.$width} h:${this.#s.$height}`), this.#p.clear().beginFill(3407616, 0.2).lineStyle(1, 3407616, 1).drawRect(-this.#s.pad_left, -this.#s.pad_top, this.#s.$width, this.#s.$height).endFill().beginFill(13311, 0.2).lineStyle(2, 13311, 1).drawRect(
        0,
        0,
        this.#s.$width - this.#s.pad_left - this.#s.pad_right,
        this.#s.$height - this.#s.pad_top - this.#s.pad_bottom
      ).endFill()), this.#t.innerHTML = [...t].join("").replaceAll(/[\n\t]/g, "") + g.#b, !this.#r.break_fixed) {
        const h = globalThis.getComputedStyle(this.#t), f = parseFloat(h.fontSize);
        this.#h ? (this.#r.break_fixed_left = (this.#s.$width - this.#s.pad_left - this.#s.pad_right - f * 1.5) * this.sys.cvsScale, this.#r.break_fixed_top = 0) : (this.#r.break_fixed_left = 0, this.#r.break_fixed_top = f / 2 * this.sys.cvsScale);
      }
    } else
      i = this.#t.innerHTML, --s, this.#t.getElementsByClassName("sn_ch_last").item(0)?.remove(), this.#t.querySelectorAll(":scope > br").forEach((h) => h.remove()), this.#t.insertAdjacentHTML(
        "beforeend",
        t.slice(this.#a).join("").replaceAll(/[\n\t]/g, "") + g.#b
        // 末尾改行削除挙動対策
      );
    this.#t.querySelectorAll(".sn_ch:has(> ruby)").forEach((h) => h.style.background = ""), this.#a = t.length;
    const n = this.sys.cvsScale, o = this.#t.getBoundingClientRect(), a = o.left + this.#s.pad_left, l = o.top + this.#s.pad_top;
    let d;
    if (n === 1) d = (h, f) => {
      const b = h.getBoundingClientRect();
      return new L(
        b.left - a,
        b.top - l,
        b.width,
        b.height + ("gjqy".includes(f) ? this.#d : 0)
      );
    };
    else {
      const h = this.sys.ofsPadLeft_Dom2PIXI + o.left * (1 - n), f = this.sys.ofsPadTop_Dom2PIXI + o.top * (1 - n);
      d = (b, v) => {
        const N = b.getBoundingClientRect();
        return new L(
          (N.left - h) / n - a,
          (N.top - f) / n - l,
          N.width / n,
          (N.height + ("gjqy".includes(v) ? this.#d : 0)) / n
        );
      };
    }
    const [p, c] = this.#r.hyph(this.#t, d, this.#h, s, i);
    this.#x = p;
    const m = O.ease(this.#y);
    for (let h = s; h < c; ++h) {
      const f = this.#x[h], { elm: { dataset: b, parentElement: v }, rect: N } = f, C = JSON.parse(b.arg ?? '{"delay": 0}'), _ = JSON.parse(b.add ?? "{}"), $ = g.#j[_.ch_in_style];
      if (this.#_(f), b.cmd === "grp") {
        const E = new D();
        this.#c.addChild(E), new y(C.pic, E, (P) => {
          this.#H(E, C, _, N, m, $ ?? {}), E.parent || E.removeChild(P);
        });
      }
      if (b.lnk) {
        const E = v.closest("[data-arg]"), P = JSON.parse(E.dataset.arg ?? "{}");
        P.key = `lnk=[${h}] ` + this.name;
        const T = new I();
        this.#H(T, P, _, N, m, $ ?? {});
        const B = P.style ?? "", at = B + (P.style_hover ?? ""), vt = B + (P.style_clicked ?? ""), A = P.r_style ?? "", $t = A + (P.r_style_hover ?? ""), Ct = A + (P.r_style_clicked ?? ""), ft = Array.from(E.getElementsByTagName("rt"));
        for (const et of ft) et.dataset.st_r_bk = et.style.cssText;
        const Et = E.style.cssText, tt = (et, Nt) => {
          E.style.cssText = Et + et;
          for (const pt of ft) pt.style.cssText = pt.dataset.st_r_bk + Nt;
        };
        S(P, "enabled", !0) ? g.#n.button(
          P,
          T,
          () => tt(B, A),
          () => this.canFocus() ? (tt(at, $t), !0) : !1,
          () => tt(vt, Ct)
        ) : tt(
          B + (P.style_disable ?? "color: gray;"),
          A + (P.r_style_disable ?? "color: gray;")
        ), this.#c.addChild(T);
      }
    }
    const u = Array.from(this.#t.getElementsByClassName("sn_ch_yet"));
    this.#B = () => {
      this.#B = () => !1;
      for (const f of u) f.className = "sn_ch";
      g.#N.position.set(
        this.#r.break_fixed_left,
        this.#r.break_fixed_top
      ), g.#N.visible = !0, this.noticeCompTxt();
      const h = this.#v.shift();
      return this.#v.length > 0 && h(), !0;
    };
    for (const h of u) h.className = h.className.replace("sn_ch_yet sn", "go");
    s > 0 && ++s;
    let r;
    for (let h = c - 2; h >= 0; --h) {
      const { elm: f } = this.#x[h];
      if (f.tagName === "SPAN") {
        r = f.parentElement?.tagName === "RUBY" ? f.parentElement.parentElement ?? f : f;
        break;
      }
    }
    if (!r || e || s === c) {
      this.#B();
      return;
    }
    r.addEventListener("animationend", () => this.#B(), { once: !0 });
  }
  #B = () => !1;
  #H(t, e, s, i, n, o) {
    t.alpha = 0, e.x && (i.x = e.x.startsWith("=") ? i.x + parseInt(e.x.slice(1)) : parseInt(e.x)), e.y && (i.y = e.y.startsWith("=") ? i.y + parseInt(e.y.slice(1)) : parseInt(e.y)), e.width && (i.width = parseInt(e.width)), e.height && (i.height = parseInt(e.height)), e.wait && (o.wait = parseInt(e.wait)), t.width = i.width, t.height = i.height, o.x ? t.position.set(
      o.x.startsWith("=") ? i.x + t.width * o.nx : o.nx,
      o.y.startsWith("=") ? i.y + t.height * o.ny : o.ny
    ) : t.position.set(i.x, i.y);
    const a = {
      sp: t,
      tw: new jt(t).to({ alpha: 1, x: i.x, y: i.y, width: i.width, height: i.height, angle: 0 }, o.wait ?? 0).easing(n).delay((s.wait ?? 0) + (e.delay ?? 0)).onComplete(() => {
        a.tw = void 0;
      }).start()
    };
    this.#V.push(a);
  }
  #V = [];
  skipChIn() {
    let t = this.#B();
    for (const e of this.#V)
      e.tw && (e.tw.stop().end(), t = !0);
    return this.#V = [], t;
  }
  static #j = /* @__PURE__ */ Object.create(null);
  static #Y = /[{\s\.,*\{]/;
  // https://regex101.com/r/APC91I/1
  static initChStyle() {
    g.#j = /* @__PURE__ */ Object.create(null), g.#P = /* @__PURE__ */ Object.create(null);
  }
  static getChInStyle(t) {
    return g.#j[t];
  }
  static ch_in_style(t) {
    const { name: e } = t;
    if (!e) throw "nameは必須です";
    if (g.#Y.test(e)) throw `name【${e}】に使えない文字が含まれます`;
    if (e in g.#j) throw `name【${e}】はすでにあります`;
    const s = String(t.x ?? "=0"), i = String(t.y ?? "=0");
    return g.#j[e] = {
      wait: x(t, "wait", 500),
      // アニメ・FI時間
      alpha: x(t, "alpha", 0),
      x: s,
      // 初期x値
      y: i,
      // [tsy]と同様に絶対・相対指定可能
      // {x:500}			X位置を500に
      // {x:'=500'}		現在のX位置に+500加算した位置
      // {x:'=-500'}		現在のX位置に-500加算した位置
      // {x:'250,500'}	+250から＋500までの間でランダムな値をX位置に
      // {x:'=250,500'}	+250から＋500までの間でランダムな値を現在のX位置に加算
      nx: parseFloat(s.at(0) === "=" ? s.slice(1) : s),
      ny: parseFloat(i.at(0) === "=" ? i.slice(1) : i),
      scale_x: x(t, "scale_x", 1),
      scale_y: x(t, "scale_y", 1),
      rotate: x(t, "rotate", 0),
      join: S(t, "join", !0),
      // 文字を順番に出すか（true）同時か（false）
      ease: t.ease ?? "ease-out"
    };
  }
  static #P = /* @__PURE__ */ Object.create(null);
  static getChOutStyle(t) {
    return g.#P[t];
  }
  static ch_out_style(t) {
    const { name: e } = t;
    if (!e) throw "nameは必須です";
    if (g.#Y.test(e)) throw `name【${e}】に使えない文字が含まれます`;
    if (e in g.#P) throw `name【${e}】はすでにあります`;
    const s = String(t.x ?? "=0"), i = String(t.y ?? "=0");
    return g.#P[e] = {
      wait: x(t, "wait", 500),
      // アニメ・FI時間
      alpha: x(t, "alpha", 0),
      x: s,
      // 初期x値
      y: i,
      // [tsy]と同様に絶対・相対指定可能
      // {x:500}			X位置を500に
      // {x:'=500'}		現在のX位置に+500加算した位置
      // {x:'=-500'}		現在のX位置に-500加算した位置
      // {x:'250,500'}	+250から＋500までの間でランダムな値をX位置に
      // {x:'=250,500'}	+250から＋500までの間でランダムな値を現在のX位置に加算
      nx: parseFloat(s.at(0) === "=" ? s.slice(1) : s),
      ny: parseFloat(i.at(0) === "=" ? i.slice(1) : i),
      scale_x: x(t, "scale_x", 1),
      scale_y: x(t, "scale_y", 1),
      rotate: x(t, "rotate", 0),
      join: S(t, "join", !1),
      // 文字を順番に出すか（true）同時か（false）
      ease: t.ease ?? "ease-out"
    };
  }
  static #N = new D();
  static #S = new y();
  dispBreak(t) {
    g.delBreak();
    const e = g.#N;
    e.visible = !1, this.addChild(e), g.#S.destroy(), g.#S = new y(t.pic, e, (s) => {
      e.parent ? (s.x = x(t, "x", 0), s.y = x(t, "y", 0), s.width = x(t, "width", this.#s.fontsize), s.height = x(t, "height", this.#s.fontsize)) : e.removeChild(s);
    });
  }
  static delBreak() {
    const t = g.#N;
    t.parent?.removeChild(t), g.#S.destroy();
  }
  #y = "Quadratic.Out";
  #z = "Quadratic.Out";
  #$() {
    this.#p.clear(), this.#x = [], this.#a = 0, this.#v = [], this.skipChIn();
    const t = this.#t.cloneNode(!0);
    t.textContent = "";
    const e = this.#t, s = Array.from(e.getElementsByClassName("sn_ch"));
    e.parentElement.insertBefore(t, e);
    let i = 0;
    s.forEach((o) => {
      const a = JSON.parse(
        o.dataset.add ?? // 通常文字
        o.children[0]?.getAttribute("data-add") ?? // ルビ
        o.children[0]?.children[0]?.getAttribute("data-add") ?? "{}"
        // 縦中横
      );
      if (!a.ch_out_style) return;
      const l = g.#P[a.ch_out_style];
      if (l) {
        if (l.wait === 0) {
          o.style.display = "none";
          return;
        }
        i += l.wait, l.join || (o.style.animationDelay = "0ms"), o.classList.add(`go_ch_out_${a.ch_out_style}`);
      }
    });
    const n = () => {
      e.parentElement.removeChild(e);
      for (const o of this.#c.removeChildren())
        o instanceof D && g.#n.unButton(o), o.destroy();
    };
    i === 0 ? (this.#t.textContent = "", n()) : e.lastElementChild?.addEventListener("animationend", n, { once: !0 }), this.#t = t;
  }
  reNew() {
    this.#$();
    const t = new g(this.ctn, () => this.canFocus(), this.sys);
    return t.#s = this.#s, t.#t.style.cssText = this.#t.style.cssText, t.#f = this.#f, t.name = this.name, t.#u(), t.#C = this.#C, t.#y = this.#y, t.#z = this.#z, this.#r.reNew(t.#r), this.destroy(), t;
  }
  #C = void 0;
  // 文字にかけるフィルター
  record() {
    return {
      infTL: this.#s,
      cssText: this.#t.style.cssText,
      left: this.#f,
      //		idc_hArg	: this.#idc.gethArg(),
      ch_filter: this.#C,
      fi_easing: this.#y,
      fo_easing: this.#z,
      hyph: this.#r.record()
    };
  }
  playback(t) {
    this.#s = t.infTL, this.position.set(this.#s.pad_left, this.#s.pad_top), this.#t.style.cssText = t.cssText, this.#f = t.left, this.#u(), this.#C = t.ch_filter, this.#y = t.fi_easing, this.#z = t.fo_easing, this.#r.playback(t.hyph);
  }
  get cssText() {
    return this.#t.style.cssText;
  }
  set cssText(t) {
    this.#t.style.cssText = t;
  }
  #k = void 0;
  snapshot(t, e) {
    this.#U((s) => {
      this.#k = I.from(s), this.#h && (this.#k.x += R.stageW - (this.#f + this.#s.$width)), this.#k.y -= this.#o, this.#k.texture.frame = new L(
        0,
        0,
        Math.min(this.#k.width, this.#s.$width - this.#f),
        Math.min(this.#k.height, this.#s.$height)
      ), this.#c.addChild(this.#k), t.render(this.#k, { clear: !1 }), e();
    }, !1);
  }
  snapshot_end() {
    this.#k && (this.#c.removeChild(this.#k), this.#k = void 0);
  }
  makeDesignCast(t) {
  }
  showDesignCast() {
  }
  //	showDesignCast() {this.#idc.visible = true; this.#idcCh.visible = true}
  dump() {
    const t = [], e = this.#t.style, s = e.length;
    for (let i = 0; i < s; ++i) {
      const n = e[i];
      t.push(`"${n}":"${e[n].replaceAll(/(["\\])/g, "\\$1")}"`);
    }
    return `"txt":"${this.#t.textContent.replaceAll(/(["\\])/g, "\\$1")}", "style":{${t.join(",")}}`;
  }
  destroy() {
    g.delBreak(), this.#t.parentElement.removeChild(this.#t), this.removeChild(this.#c), this.removeChild(this.#p), super.destroy();
  }
}
class W extends D {
  constructor(t, e, s, i) {
    if (super(), this.hArg = t, this.evtMng = e, this.resolve = s, this.canFocus = i, this.#t = {
      type: "pic",
      enabled: S(t, "enabled", !0),
      x: this.x = G(t.left ?? 0),
      y: this.y = G(t.top ?? 0),
      rotation: this.angle = x(t, "rotation", this.angle),
      // flash : rotation is in degrees.
      // pixijs: rotation is in radians, angle is in degrees.
      pivot_x: this.pivot.x = x(t, "pivot_x", this.pivot.x),
      pivot_y: this.pivot.y = x(t, "pivot_y", this.pivot.y),
      scale_x: this.scale.x = x(t, "scale_x", this.scale.x),
      scale_y: this.scale.y = x(t, "scale_y", this.scale.y),
      alpha: 1,
      text: "",
      b_pic: "",
      width: 0,
      height: 0
    }, this.getBtnBounds = () => (this.#n.x = this.#t.x, this.#n.y = this.#t.y, this.#n), this.#t.enabled && e.button(t, this, () => this.normal(), () => this.#p(), () => this.#m()), t.pic) {
      this.#t.type = "pic", this.#l = new y(
        t.pic,
        this,
        (c) => {
          this.#r(c), this.#n.width = c.width * this.#t.scale_x, this.#n.height = c.height * this.#t.scale_y;
        },
        (c) => s
      );
      return;
    }
    if (!t.text) throw "textまたはpic属性は必須です";
    const n = x(t, "height", 30), o = new St({
      align: "center",
      dropShadow: !0,
      dropShadowAlpha: 0.7,
      dropShadowColor: "white",
      dropShadowBlur: 7,
      dropShadowDistance: 0,
      fill: this.#t.enabled ? "black" : "gray",
      fontFamily: W.fontFamily,
      fontSize: n,
      padding: 5
    });
    if (t.style) try {
      const c = JSON.parse(t.style);
      for (const [m, u] of Object.entries(c)) o[m] = u;
      this.#t = { ...this.#t, ...c };
    } catch (c) {
      throw c instanceof SyntaxError ? new Error(lt(t, "style", c.message)) : "fn:Button.ts style";
    }
    const a = new Tt(t.text ?? "", o);
    a.alpha = x(t, "alpha", a.alpha), a.width = x(t, "width", 100), a.height = t.height = n, this.setText = (c) => a.text = c, this.#t = {
      ...this.#t,
      type: "text",
      // dump用
      alpha: a.alpha,
      text: a.text,
      width: a.width,
      height: a.height
    };
    let l = !1;
    if (this.#t.width = this.width, this.#t.height = this.height, t.b_pic && (this.#t.b_pic = t.b_pic, this.#l = new y(
      t.b_pic,
      this,
      (c) => {
        this.#c(c, a), this.#t.width = this.width, this.#t.height = this.height, a.name = JSON.stringify(this.#t);
      },
      (c) => {
        j.setBlendmode(this, t), c && s();
      }
    ), l = this.#l.ret), a.name = JSON.stringify(this.#t), this.addChild(a), this.#n.width = a.width, this.#n.height = a.height, t.b_pic || j.setBlendmode(this, t), W.#i(this, a), !this.#t.enabled) {
      l || s();
      return;
    }
    const d = o.clone();
    if (t.style_hover) try {
      const c = JSON.parse(t.style_hover);
      for (const [m, u] of Object.entries(c)) d[m] = u;
    } catch (c) {
      throw c instanceof SyntaxError ? new Error(lt(t, "style_hover", c.message)) : "fn:Button.ts style_hover";
    }
    else d.fill = "white";
    const p = d.clone();
    if (t.style_clicked) try {
      const c = JSON.parse(t.style_clicked);
      for (const [m, u] of Object.entries(c)) p[m] = u;
    } catch (c) {
      throw c instanceof SyntaxError ? new Error(lt(t, "style_clicked", c.message)) : "fn:Button.ts style_clicked";
    }
    else p.dropShadow = !1;
    this.normal = () => a.style = o, this.#p = () => i() ? (a.style = d, !0) : !1, this.#m = () => a.style = p, l || s();
  }
  static fontFamily = "'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif";
  static #i = (t, e) => {
  };
  static #e = (t, e, s, i) => {
  };
  static init(t) {
    t.oCfg.debug.masume && (W.#i = (e, s) => e.addChild(
      new J().beginFill(8926088, 0.2).lineStyle(1, 8926088, 1).drawRect(s.x, s.y, s.width, s.height).endFill()
    ), W.#e = (e, s, i, n) => e.addChild(
      new J().beginFill(8926088, 0.2).lineStyle(1, 8926088, 1).drawRect(s.x, s.y, i, n).endFill()
    ));
  }
  setText(t) {
  }
  getBtnBounds = () => this.#n;
  // 文字ボタンは背景画像を含まない位置指定なので、その当たり判定用
  #n = new L();
  #l = new y();
  //	#idc		: DesignCast;
  #t;
  destroy() {
    this.evtMng.unButton(this), this.#l.destroy(), super.destroy();
  }
  makeDesignCast(t) {
  }
  showDesignCast() {
  }
  //	showDesignCast() {this.#idc.visible = true}
  cvsResize() {
  }
  #c(t, e) {
    this.setChildIndex(t, 0), t.alpha = e.alpha, t.setTransform(
      e.x,
      e.y,
      1,
      1,
      e.rotation,
      0,
      0,
      (t.width - e.width) / 2,
      (t.height - e.height) / 2
    ), t.name = e.name;
  }
  normal = () => {
  };
  #p = () => !1;
  #m = () => {
  };
  #r(t) {
    this.#t.alpha = t.alpha = x(this.hArg, "alpha", t.alpha);
    const e = t.width / 3, s = this.#t.enabled ? e : t.width, i = t.height, n = t.texture.baseTexture, o = new z(n, new L(0, 0, e, i)), a = new z(n, new L(e, 0, e, i)), l = new z(n, new L(e * 2, 0, e, i)), d = () => t.texture = o;
    this.#t.enabled && d(), this.normal = d, this.#p = () => this.canFocus() ? (t.texture = l, !0) : !1, this.#m = () => t.texture = a, "width" in this.hArg ? (this.#t.width = G(this.hArg.width), this.scale.x *= this.#t.width / s) : this.#t.width = s, "height" in this.hArg ? (this.#t.height = G(this.hArg.height), this.scale.y *= this.#t.height / i) : this.#t.height = i, t.name = JSON.stringify(this.#t), W.#e(this, t, s, i);
  }
}
class w extends j {
  static #i;
  static #e;
  static #n;
  static #l;
  static init(t, e, s, i, n, o) {
    w.#i = t, g.init(t, o), w.#e = s, w.#l = i, w.#n = n, s.setDoRecProc(w.chgDoRec), e.autowc = (a) => w.#s(a), e.autowc({ enabled: !1, text: "", time: 0 }), e.ch_in_style = (a) => w.#t(a), e.ch_out_style = (a) => w.#c(a), g.initChStyle(), Ft(), st(
      t.matchPath(".+", q.FONT).flatMap((a) => Object.values(a).map((l) => `
@font-face {
	font-family: '${l}';
	src: url('${this.#i.searchPath(l, q.FONT)}');
}
`)).join("") + `
.sn_tx {
	pointer-events: none;
	user-select: none;
	-webkit-touch-callout: none;
	box-sizing: border-box;
}
.sn_ch {
	position: relative;
	display: inline-block;
}
`
      // 「sn_ch」と「sn_ch_in_〜」の中身が重複しているが、これは必須
    ), w.#t({
      name: "default",
      wait: 500,
      alpha: 0,
      x: "=0.3",
      y: "=0",
      scale_x: 1,
      scale_y: 1,
      rotate: 0,
      join: !0,
      ease: "ease-out"
    }), w.#c({
      name: "default",
      wait: 0,
      alpha: 0,
      x: "=0",
      y: "=0",
      scale_x: 1,
      scale_y: 1,
      rotate: 0,
      join: !1,
      ease: "ease-out"
    });
  }
  // 文字出現演出
  static #t(t) {
    const e = g.ch_in_style(t), s = e.x.startsWith("=") ? `${e.nx * 100}%` : `${e.nx}px`, i = e.y.startsWith("=") ? `${e.ny * 100}%` : `${e.ny}px`, { name: n } = t;
    return st(`
.sn_ch_in_${n} {
	position: relative;
	display: inline-block;
}
.go_ch_in_${n} {
	opacity: ${e.alpha};
	position: relative;
	display: inline-block;
	animation: sn_ch_in_${n} ${e.wait}ms ${e.ease} 0s both;
}
@keyframes sn_ch_in_${n} {
	from {transform: rotate(${e.rotate}deg) scale(${e.scale_x}, ${e.scale_y}) translate(${s}, ${i})}
	to {opacity: 1; transform: none;}
}
`), !1;
  }
  // 文字消去演出
  static #c(t) {
    const e = g.ch_out_style(t), s = e.x.startsWith("=") ? `${e.nx * 100}%` : `${e.nx}px`, i = e.y.startsWith("=") ? `${e.ny * 100}%` : `${e.ny}px`, { name: n } = t;
    return st(`
.go_ch_out_${n} {
	position: relative;
	display: inline-block;
	animation: go_ch_out_${n} ${e.wait}ms ${e.ease} 0s both;
}
@keyframes go_ch_out_${n} {
	to {
		opacity: ${e.alpha};
		transform: rotate(${e.rotate}deg) scale(${e.scale_x}, ${e.scale_y}) translate(${s}, ${i});
	}
`), !1;
  }
  static #p;
  static #m;
  static setEvtMng(t, e, s) {
    w.#p = t, w.#m = e, g.setEvtMng(t, s);
  }
  // 文字ごとのウェイト
  static #r = !1;
  static #_ = {};
  static #s(t) {
    w.#r = S(t, "enabled", w.#r), w.#e.setVal_Nochk("save", "const.sn.autowc.enabled", w.#r);
    const { text: e } = t;
    if ("text" in t != "time" in t) throw "[autowc] textとtimeは同時指定必須です";
    if (w.#e.setVal_Nochk("save", "const.sn.autowc.text", e), !e)
      return w.#e.setVal_Nochk("save", "const.sn.autowc.time", ""), !1;
    const s = e.length;
    if (w.#r && s === 0) throw '[autowc] enabled === false かつ text === "" は許されません';
    const i = String(t.time).split(",");
    if (i.length !== s) throw "[autowc] text文字数とtimeに記述された待ち時間（コンマ区切り）は同数にして下さい";
    w.#_ = {};
    for (let n = 0; n < s; ++n) w.#_[e[n]] = G(i[n]);
    return w.#e.setVal_Nochk("save", "const.sn.autowc.time", t.time), !1;
  }
  // バック
  #d = 0;
  #u = 0;
  #f = !1;
  #h = void 0;
  #g = "";
  // 背景画像無し（＝単色塗り）
  // 文字表示
  #o = new g(this.ctn, () => this.canFocus(), w.#m);
  #U = new ct();
  #v = document.createElement("span");
  // cssチェック・保存用
  static #x = {
    "text-align": 0,
    "text-align-last": 0,
    height: 0,
    width: 0,
    "padding-left": 0,
    "padding-right": 0,
    "padding-top": 0,
    "padding-bottom": 0
  };
  #a = new D();
  constructor() {
    super(), this.ctn.addChild(this.#o), this.#U.init(this.#X), this.ctn.addChild(this.#a), this.#a.name = "cntBtn", this.lay({ style: `width: ${R.stageW}px; height: ${R.stageH}px; font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif; color: white; font-size: 24px; line-height: 1.5; padding: 16px;`, in_style: "default", out_style: "default", back_clear: "true" });
  }
  destroy() {
    this.#h && (this.ctn.removeChild(this.#h).destroy(), this.#h = void 0), w.#l.recPagebreak(), this.#o.destroy();
  }
  static destroy() {
    w.#r = !1, w.#_ = {}, w.#$ = (t) => t;
  }
  set name(t) {
    this.name_ = t, this.#o.name = t;
  }
  get name() {
    return this.name_;
  }
  // getは継承しないらしい
  cvsResize() {
    this.#o.cvsResize();
  }
  cvsResizeChildren() {
    for (const t of this.#a.children) t.cvsResize();
  }
  procSetX(t) {
    this.#o.lay({ x: t });
  }
  procSetY(t) {
    this.#o.lay({ y: t });
  }
  lay(t) {
    if (super.lay(t), j.setXY(this.ctn, t, this.ctn), t[":id_tag"] = this.name_.slice(0, -7), ct.setting(t), this.#P(t), this.#o.lay(t), "r_align" in t && (this.#T = t.r_align ?? ""), this.#C = R.isSafari ? this.#o.tategaki ? (i, n) => `text-align: start; height: ${n}em; padding-top: ${i}; padding-bottom: ${i};` : (i, n) => `text-align: start; width: ${n}em; padding-left: ${i}; padding-right: ${i};` : this.#o.tategaki ? (i) => `text-align: justify; text-align-last: justify; padding-top: ${i}; padding-bottom: ${i};` : (i) => `text-align: justify; text-align-last: justify; padding-left: ${i}; padding-right: ${i};`, R.isFirefox && (this.#k = this.#A), "r_style" in t)
      if (t.r_style) {
        const i = document.createElement("span");
        i.style.cssText = t.r_style;
        const n = i.style.length, o = this.#v.style;
        for (let a = 0; a < n; ++a) {
          const l = i.style[a];
          if (l in w.#x) {
            M.myTrace(`${l}は指定できません`, "W");
            continue;
          }
          const d = i.style[l];
          d && (o[l] = d);
        }
      } else this.#v.style.cssText = "";
    if ("alpha" in t) for (const i of this.#a.children) i.alpha = this.ctn.alpha;
    this.#b(t), this.#H(t);
    const e = F.procID + `TxtLayer lay name:${this.name_}`, s = this.#Y(t, (i) => {
      i && F.endProc(e);
    });
    return s && F.beginProc(e), s;
  }
  #b(t) {
    const { in_style: e } = t;
    if (!e) return;
    const s = g.getChInStyle(e);
    if (!s) throw `存在しないin_style【${e}】です`;
    this.#E = e, this.#B = s.join;
  }
  #E = "";
  #B = !0;
  get width() {
    return this.#o.getWidth;
  }
  get height() {
    return this.#o.getHeight;
  }
  #H(t) {
    const { out_style: e } = t;
    if (!e) return;
    if (!g.getChOutStyle(e)) throw `存在しないout_style【${e}】です`;
    this.#V = e;
  }
  #V = "";
  #j = new y();
  #Y(t, e) {
    if ("back_clear" in t)
      return S(t, "back_clear", !1) && (this.#d = 0, this.#u = 0, this.#f = !1, this.#g = ""), e(!1), !1;
    this.#u = x(t, "b_alpha", this.#u), this.#f = S(t, "b_alpha_isfixed", this.#f);
    const s = (this.#f ? 1 : Number(w.#e.getVal("sys:TextLayer.Back.Alpha"))) * this.#u;
    if (t.b_pic) {
      if (this.#g !== t.b_pic)
        return this.#g = t.b_pic, this.#h && (this.ctn.removeChild(this.#h), this.#h.destroy()), this.#j = new y(this.#g, this.ctn, (i) => {
          this.#h = i, i.name = "back(pic)", i.visible = s > 0, i.alpha = s, this.#o.setMySize(i.width, i.height), this.ctn.setChildIndex(i, 0), e(!0);
        }), this.#j.ret;
    } else "b_color" in t && (this.#d = xt(t, "b_color", 0), this.#h && (this.ctn.removeChild(this.#h), this.#h.destroy()), this.#g = "", this.ctn.addChildAt(
      (this.#h = new J()).beginFill(this.#d, s).lineStyle(void 0).drawRect(0, 0, this.#o.getWidth, this.#o.getHeight).endFill(),
      0
    ), this.#h.name = "back(color)");
    return this.#h && (this.#h.visible = s > 0, this.#h.alpha = s), e(!1), !1;
  }
  chgBackAlpha(t) {
    const e = this.#f ? this.#u : t * this.#u;
    this.#h instanceof J && (this.#h && (this.ctn.removeChild(this.#h), this.#h.destroy()), this.ctn.addChildAt(
      (this.#h = new J()).beginFill(this.#d, e).lineStyle(void 0).drawRect(0, 0, this.#o.getWidth, this.#o.getHeight).endFill(),
      0
    ), this.#h.name = "back(color)"), this.#h && (this.#h.visible = e > 0, this.#h.alpha = e);
  }
  #P(t) {
    "noffs" in t && (this.#y = t.noffs ?? "", this.#z = new RegExp(`[　${this.#y}]`)), "ffs" in t && (this.#N ??= "", this.#S = this.#N === "" ? () => "" : (e) => this.#z.test(e) ? "" : ` font-feature-settings: ${this.#N};`);
  }
  #N = "";
  #S = (t) => "";
  #y = "";
  #z = /[　]/;
  // Safariが全体に「font-feature-settings」した後、特定文字の「font-feature-settings: initial;」を受け付けてくれないのでわざわざ一つずつ指定
  static chgDoRec(t) {
    w.#$ = t ? (e) => e : (e) => `<span class='offrec'>${e}</span>`;
  }
  static #$ = (t) => t;
  isCur = !1;
  #C = () => "";
  #k = (t, e, s, i = "") => {
    if (!s) return ` style='${i}'`;
    const n = t.length * 2;
    if (n - e.length < 0) return ` style='text-align: ${s}; ${i}'`;
    let o = "";
    switch (s) {
      case "justify":
        o = this.#C("0", n);
        break;
      case "121":
        o = this.#C(`calc(${(n - e.length) / (e.length * 2)}em)`, n);
        break;
      case "even":
        o = this.#C(`calc(${(n - e.length) / (e.length + 1)}em)`, n);
        break;
      case "1ruby":
        o = this.#C("1em", n);
        break;
      default:
        o = `text-align: ${s};`;
    }
    return ` style='${o} ${i}'`;
  };
  #T = "";
  #A(t, e, s, i = "") {
    if (!s) return ` style='${i}'`;
    const n = t.length * 2;
    if (n - e.length < 0) return ` style='text-align: ${s}; ${i}'`;
    let o = "";
    switch (s) {
      case "left":
        o = "ruby-align: start;";
        break;
      case "center":
        o = "ruby-align: center;";
        break;
      case "right":
        o = "ruby-align: start;";
        break;
      case "justify":
        o = "ruby-align: space-between;";
        break;
      case "121":
        o = "ruby-align: space-around;";
        break;
      case "even":
        const a = (n - e.length) / (e.length + 1);
        o = "ruby-align: space-between; " + (this.#o.tategaki ? `padding-top: ${a}em; padding-bottom: ${a}em;` : `padding-left: ${a}em; padding-right: ${a}em;`);
        break;
      case "1ruby":
        o = "ruby-align: space-between; " + (this.#o.tategaki ? "padding-top: 1em; padding-bottom: 1em;" : "padding-left: 1em; padding-right: 1em;");
        break;
      default:
        o = `text-align: ${s};`;
    }
    return ` style='${o} ${i}'`;
  }
  tagCh(t) {
    this.#U.putTxt(t);
  }
  #F = !1;
  get needGoTxt() {
    return this.#F;
  }
  #X = (t, e) => {
    w.#i.oCfg.debug.putCh && console.log(`🖊 文字表示 text:\`${t}\`(${t.charCodeAt(0).toString(16)}) ruby:\`${e}\` name:\`${this.name_}\``);
    const s = e.split("｜");
    let i = "";
    const [n, ...o] = s, a = o.join("｜");
    switch (s.length) {
      case 1:
        if (this.#F = !0, t === `
`) {
          this.#O ? (this.#O = !1, i = "<ruby>&emsp;<rt>&emsp;</rt></ruby><br/>") : i = "<br/>";
          break;
        }
        this.#O && (this.#O = !1, e === "" && (e = "&emsp;")), i = this.#Q(t, e, this.#T);
        break;
      default:
        switch (n) {
          // ルビ揃え指定と同時シリーズ
          case "start":
          // 初期値
          case "left":
          //（肩付き）先頭親文字から、ルビ間は密着
          case "center":
          //（中付き）センター合わせ、〃
          case "right":
          //（右／下揃え）末尾親文字から、〃
          case "justify":
          //（両端揃え）先頭から末尾親文字間に、ルビ間は均等にあける
          case "121":
          //（1-2-1(JIS)）ルビの前後を比率1、ルビ間を比率2であける
          case "even":
          //（均等アキ）ルビの前後、ルビ間も均等にあける
          case "1ruby":
            this.#O = !1, this.#F = !0, i = this.#Q(t, a, n);
            break;
          case "gotxt":
            this.#K(), this.#F ? (this.isCur && w.#l.recText(
              this.#R.join("").replace(/^<ruby>&emsp;<rt>&emsp;<\/rt><\/ruby>(<br\/>)+/, "").replaceAll(/style='(anim\S+ [^;]+;\s*)+/g, "style='").replaceAll(/( style=''| data-(add|arg|cmd)='[^']+'|\n+|\t+)/g, "").replaceAll(/class='sn_ch[^']+/g, "class='sn_ch").replaceAll("display: none;", "").replaceAll("class='offrec'", "style='display: none;'")
              // 囲んだ領域は履歴で非表示
            ), this.#o.goTxt(this.#R, this.#D === 0), this.#F = !1, this.#D = 0) : this.isCur && this.#o.noticeCompTxt();
            return;
          // breakではない
          case "add":
            {
              const l = JSON.parse(a), { style: d = "", wait: p = null } = l, { cl: c, sty: m } = this.#L(!0, p);
              this.#R.push(`<span${c} style='${m} display: inline; ${d}'>`), delete l.style, this.#Z(l);
            }
            return;
          // breakではない
          case "add_close":
            this.#R.push("</span>"), this.#K();
            return;
          // breakではない
          case "grp":
            this.#F = !0;
            {
              const l = JSON.parse(a);
              if (l.id ??= this.#R.length, l.id === "break") {
                this.#o.dispBreak(l);
                return;
              }
              this.#O = !1, l.delay = this.#D, l.r ??= "", l.style ??= "", l.r_style ??= "";
              const { cl: d, sty: p, lnk: c } = this.#L(!0, l.wait);
              i = `<span${d} style='${p} ${l.style}'><ruby><span data-cmd='grp' data-arg='${JSON.stringify(l)}'${c} style='${p} display: inline;'>&emsp;</span><rt${c}${this.#k(
                "　",
                l.r,
                this.#T,
                this.#v.style.cssText + (this.#w.at(-1)?.o.r_style ?? "") + l.r_style
              )}>${l.r}</rt></ruby></span>`;
            }
            break;
          case "tcy":
            this.#O = !1, this.#F = !0;
            {
              const { t: l, r: d = "", wait: p = null, style: c = "", r_style: m = "" } = JSON.parse(a);
              w.#e.doRecLog() && (this.#W += t + (e ? `《${e}》` : ""), this.#J += l);
              const u = R.isSafari ? d.replaceAll(/[A-Za-z0-9]/g, (b) => String.fromCharCode(b.charCodeAt(0) + 65248)) : d, { cl: r, sty: h, lnk: f } = this.#L(!0, p);
              i = `<span${r} style='${h}${this.#S(l)} ${c}'><ruby><span${f} style='${h} display: inline; text-combine-upright: all;'>${l}</span><rt${f}${this.#k(
                l,
                u,
                this.#T,
                this.#v.style.cssText + (this.#w.at(-1)?.o.r_style ?? "") + m
              )}>${u}</rt></ruby></span>`;
            }
            break;
          case "del":
            g.delBreak();
            return;
          // breakではない
          case "span":
            this.#F = !0, this.#M(JSON.parse(a));
            return;
          // breakではない
          case "link":
            this.#F = !0;
            {
              const l = JSON.parse(a);
              l[":link"] = " data-lnk='@'";
              const { cl: d, sty: p, curpos: c } = this.#L(!1, l.wait);
              this.#R.push(`<span${d} style='${p} display: inline; ${l.style ?? ""}' ${c} data-arg='${a}'>`), delete l.style, this.#M(l);
            }
            return;
          // breakではない
          case "endlink":
            this.#F = !0, this.#R.push("</span>"), this.#K();
            return;
          // breakではない
          default:
            this.#F = !0, i = this.#Q(t, e, this.#T);
        }
        break;
    }
    this.#R.push(w.#$(i));
  };
  #Q(t, e, s) {
    const i = t === " " ? "&nbsp;" : t === "　" ? "&emsp;" : t;
    w.#e.doRecLog() && (this.#W += i + (e ? `《${e}》` : ""), t !== " " && (this.#J += t));
    const { cl: n, sty: o, lnk: a } = this.#L(!0, null, t);
    return e ? `<span${n} style='${o} ${this.#S(t)}'><ruby>${// 文字個別に出現させるため以下にも ${cl} が必要
    Array.from(t).map((l, d) => `<span${n}${a} style='${d > 0 ? this.#L(!0, null, t).sty : o} display: inline;'>${l === " " ? "&nbsp;" : l === "　" ? "&emsp;" : l}</span>`).join("")}<rt${a}${this.#k(
      t,
      e,
      s,
      this.#v.style.cssText + (this.#w.at(-1)?.o.r_style ?? "")
    )}>${e}</rt></ruby></span>` : `<span${n} style='${o} ${this.#S(t)}'${a}>${i}</span>`;
  }
  #L(t, e, s = `
`) {
    const i = this.#B ? e ?? this.#w.at(0)?.o.wait ?? (w.#r ? w.#_[s.at(0) ?? ""] ?? 0 : U.msecChWait) : 0;
    w.#p.isSkipping ? this.#D = 0 : t && this.#B && (this.#D += Number(i));
    const n = `data-add='{"ch_in_style":"${this.#E}", "ch_out_style":"${this.#V}"}'`;
    return {
      cl: ` class='sn_ch sn_ch_yet sn_ch_in_${this.#E}'`,
      // TxtStage.goTxt()はこれ単位で文字出現させる
      sty: `animation-delay: ${this.#D}ms;${this.#w.at(-1)?.o.style ?? ""}`,
      // TxtStage.goTxt()はこれ単位で文字出現させる
      lnk: (this.#w.at(0)?.o[":link"] ?? "") + " " + n,
      curpos: n
    };
  }
  #D = 0;
  #O = !0;
  #R = [];
  #w = [];
  #Z(t) {
    this.#w.push({
      o: t,
      r_align: this.#T,
      ch_in_style: this.#E,
      ch_out_style: this.#V
    }), "r_align" in t && (this.#T = t.r_align), this.#b(t), this.#H(t);
  }
  #K() {
    const t = this.#w.pop();
    t && (this.#T = t.r_align, this.#b({ in_style: t.ch_in_style }), this.#H({ out_style: t.ch_out_style }));
  }
  #M(t) {
    const e = this.#w.at(-1);
    if (!e) {
      this.#Z(t);
      return;
    }
    e.o = { ...e.o, ...t }, !t.style && !t.r_style && (e.o.style = "", e.o.r_style = ""), "r_align" in t && (this.#T = t.r_align), this.#b(t), this.#H(t);
  }
  click = () => !this.ctn.interactiveChildren || !this.ctn.visible ? !1 : this.#o.skipChIn();
  clearText() {
    this.ctn.addChild(this.#o = this.#o.reNew()), this.#D = 0, this.#O = !0, this.#R = [], this.#W = "", this.#J = "", w.#l.recPagebreak();
  }
  #W = "";
  #J = "";
  get pageText() {
    return this.#W.replace("《&emsp;》", "");
  }
  get pagePlainText() {
    return this.#J;
  }
  get enabled() {
    return this.ctn.interactiveChildren;
  }
  set enabled(t) {
    this.ctn.interactiveChildren = t;
  }
  addButton = (t) => new Promise((e) => {
    t.key = `btn=[${this.#a.children.length}] ` + this.name_, t[":id_tag"] = t.key.slice(0, -7), S(t, "hint_tate", this.#o.tategaki);
    const s = new W(t, w.#p, () => e(), () => this.canFocus());
    s.name = JSON.stringify(t).replaceAll('"', "'"), this.#a.addChild(s);
  });
  canFocus() {
    return (this.ctn.interactiveChildren ?? !1) && this.ctn.visible && w.#n(this);
  }
  clearLay(t) {
    super.clearLay(t), this.clearText();
    for (const e of this.#a.removeChildren()) e.destroy();
  }
  record = () => ({
    ...super.record(),
    enabled: this.enabled,
    r_cssText: this.#v.style.cssText,
    r_align: this.#T,
    // バック
    b_do: this.#h === void 0 ? void 0 : this.#h instanceof I ? "Sprite" : "Graphics",
    b_pic: this.#g,
    b_color: this.#d,
    b_alpha: this.#u,
    b_alpha_isfixed: this.#f,
    ffs: this.#N,
    txs: this.#o.record(),
    strNoFFS: this.#y,
    btns: this.#a.children.map((t) => t.name)
  });
  playback(t, e) {
    super.playback(t, e), this.enabled = t.enabled, this.#v.style.cssText = t.r_cssText, this.#T = t.r_align, this.cvsResize(), this.#P(t), this.#o.playback(t.txs), this.#u = t.b_alpha, this.#f = t.b_alpha_isfixed, e = [
      e,
      new Promise((s) => {
        const i = t.b_do ? t.b_do === "Sprite" ? { b_pic: t.b_pic } : { b_color: t.b_color } : { b_pic: "" };
        i.b_alpha = t.b_alpha, i.b_alpha_isfixed = t.b_alpha_isfixed, this.#Y(i, (n) => {
          n && s();
        }) || s();
      }),
      t.btns.map((s) => new Promise((i) => {
        this.addButton(JSON.parse(s.replaceAll("'", '"'))), i();
      }))
    ].flat();
  }
  get cssText() {
    return this.#o.cssText;
  }
  set cssText(t) {
    this.#o.cssText = t;
  }
  snapshot(t, e) {
    t.render(this.ctn, { clear: !1 }), this.#o.snapshot(t, e);
  }
  snapshot_end() {
    this.#o.snapshot_end();
  }
  makeDesignCast(t) {
    this.ctn.visible && this.#o.makeDesignCast(t);
  }
  makeDesignCastChildren(t) {
    if (this.ctn.visible)
      for (const e of this.#a.children) e.makeDesignCast(t);
  }
  showDesignCast() {
    this.#o.showDesignCast();
  }
  showDesignCastChildren() {
    for (const t of this.#a.children) t.showDesignCast();
  }
  dump() {
    return this.#X("", "gotxt｜"), super.dump() + `, "enabled":"${this.enabled}", ${this.#o.dump()}, "b_pic":"${this.#g}", "b_color":"${this.#d}", "b_alpha":${this.#u}, "b_alpha_isfixed":"${this.#f}", "width":${this.#o.getWidth}, "height":${this.#o.getHeight}, "pixi_obj":[${this.ctn.children.map((t) => `{"class":"${t instanceof I ? "Sprite" : t instanceof J ? "Graphics" : t instanceof D ? "Container" : "?"}", "name":"${t.name}", "alpha":${t.alpha}, "x":${t.x}, "y":${t.y}, "visible":"${t.visible}"}`).join(",")}], "button":[${this.#a.children.map((t) => t.children[0]?.name ?? "{}").join(",")}]`;
  }
}
class k {
  constructor(t, e, s) {
    this.appPixi = e, this.val = s, t.add_frame = (i) => this.#p(i), t.let_frame = (i) => this.#u(i), t.set_frame = (i) => this.#f(i), t.frame = (i) => this.#g(i), t.tsy_frame = (i) => this.#o(i);
  }
  static #i;
  static #e;
  static #n;
  static init(t, e, s) {
    k.#i = t, k.#e = e, k.#n = s;
    const i = e;
    i && (k.use4ViteElectron = (n, o) => {
      o.use(async (a, l) => {
        try {
          const d = await i.readFileSync(n, "base64"), p = new Image();
          p.src = `data:image/${n.endsWith(".png") ? "png" : "jpeg"};base64,${d}`, a.data = p;
        } catch (d) {
          k.#n.errScript(`FrameMng use ロード失敗です fn:${a.name} ${d}`, !1);
        }
        l();
      });
    });
  }
  #l;
  setEvtMng(t) {
    this.#l = t;
  }
  #t = /* @__PURE__ */ Object.create(null);
  destroy() {
    for (const t of Object.values(this.#t)) t.parentElement.removeChild(t);
    this.#t = /* @__PURE__ */ Object.create(null);
  }
  hideAllFrame() {
    for (const [t, { style: e }] of Object.entries(this.#t))
      this.#c[t] = e.display !== "none", e.display = "none";
  }
  #c = /* @__PURE__ */ Object.create(null);
  restoreAllFrame() {
    for (const [t, e] of Object.entries(this.#c)) {
      const s = this.#t[t];
      s && (s.style.display = e ? "inline" : "none");
    }
    this.#c = /* @__PURE__ */ Object.create(null);
  }
  //	HTMLフレーム
  // フレーム追加
  #p(t) {
    const { id: e, src: s, alpha: i = 1, scale_x: n = 1, scale_y: o = 1, rotate: a = 0 } = t;
    if (!e) throw "idは必須です";
    if (!s) throw "srcは必須です";
    const l = "const.sn.frm." + e;
    if (this.val.getVal(`tmp:${l}`)) throw `frame【${e}】はすでにあります`;
    const d = S(t, "visible", !0), p = t.b_color ? ` background-color: ${t.b_color};` : "", c = this.#r(t);
    k.#n.cvs.insertAdjacentHTML("beforebegin", `<iframe id="${e}" style="opacity: ${i}; ${p} position: absolute; left:${k.#e.ofsLeft4elm + c.x * k.#e.cvsScale}px; top: ${k.#e.ofsTop4elm + c.y * k.#e.cvsScale}px; z-index: 1; border: 0px; overflow: hidden; display: ${d ? "inline" : "none"}; transform: scale(${n}, ${o}) rotate(${a}deg);" width="${c.width * k.#e.cvsScale}" height="${c.height * k.#e.cvsScale}"></iframe>`);
    const m = F.procID + `add_frame id:${e}`;
    F.beginProc(m);
    const u = k.#i.searchPath(s, q.HTML), r = new Y().add({ name: s, url: u, xhrType: V.XHR_RESPONSE_TYPE.TEXT });
    return k.#e.arg.crypto && r.use(async (h, f) => {
      try {
        h.data = await k.#e.dec(h.extension, h.data);
      } catch (b) {
        k.#n.errScript(`[add_frame]Html ロード失敗です src:${h.name} ${b}`, !1);
      }
      f();
    }), r.load((h, f) => {
      const b = document.getElementById(e);
      this.#t[e] = b, this.#m[e] = !1;
      const v = u.lastIndexOf("/") + 1, N = u.slice(0, v), C = N.slice(0, v);
      b.srcdoc = String(f[s]?.data).replace("sn_repRes();", "").replaceAll(
        /\s(?:src|href)=(["'])(\S+?)\1/g,
        // 【\s】が大事、data-src弾く
        (_, $, E) => E.startsWith("../") ? C + _.slice(3) : _.replace("./", "").replace($, $ + N)
      ), b.srcdoc.includes("true/*WEBP*/;") && (b.srcdoc = b.srcdoc.replaceAll(
        /data-src="(.+?\.)(?:jpe?g|png)/g,
        (_, $) => `data-src="${$}webp`
      )), b.onload = () => {
        F.endProc(m), this.val.setVal_Nochk("tmp", l, !0), this.val.setVal_Nochk("tmp", l + ".alpha", i), this.val.setVal_Nochk("tmp", l + ".x", c.x), this.val.setVal_Nochk("tmp", l + ".y", c.y), this.val.setVal_Nochk("tmp", l + ".scale_x", n), this.val.setVal_Nochk("tmp", l + ".scale_y", o), this.val.setVal_Nochk("tmp", l + ".rotate", a), this.val.setVal_Nochk("tmp", l + ".width", c.width), this.val.setVal_Nochk("tmp", l + ".height", c.height), this.val.setVal_Nochk("tmp", l + ".visible", d);
        const _ = b.contentWindow;
        this.#l.resvFlameEvent(_.document.body), _.sn_repRes?.(($) => k.#_($.dataset.src ?? "", $));
      };
    }), !0;
  }
  #m = {};
  getFrmDisabled(t) {
    return this.#m[t];
  }
  #r(t) {
    const e = { ...t }, s = k.#e.resolution;
    return new DOMRect(
      x(e, "x", 0) * s,
      x(e, "y", 0) * s,
      x(e, "width", R.stageW) * s,
      x(e, "height", R.stageH) * s
    );
  }
  static #_(t, e, s) {
    const i = this.#d[t];
    if (i) {
      e.src = i, s && (e.onload = () => s(e));
      return;
    }
    const n = this.#s[t];
    if (n) {
      n.push(e);
      return;
    }
    this.#s[t] = [e];
    const [o = "", a = ""] = t.split("?"), l = k.#i.searchPath(o, q.SP_GSM), d = new Y().add({ name: t, url: l, xhrType: V.XHR_RESPONSE_TYPE.BUFFER });
    t.startsWith(gt) ? k.use4ViteElectron(l, d) : k.#e.arg.crypto && l.endsWith(".bin") && d.use(async (p, c) => {
      try {
        const m = await k.#e.decAB(p.data);
        if (p.extension !== "bin") {
          c();
          return;
        }
        p.data = m, m instanceof HTMLImageElement && (p.type = V.TYPE.IMAGE);
      } catch (m) {
        k.#n.errScript(`FrameMng loadPic ロード失敗です fn:${p.name} ${m}`, !1);
      }
      c();
    }), d.load((p, c) => {
      for (const [m, { data: { src: u } }] of Object.entries(c)) {
        const r = this.#d[m] = u + (u.startsWith("blob:") || u.startsWith("data:") ? "" : a ? "?" + a : ""), h = this.#s[m];
        if (h) for (const f of h)
          f.src = r, s && (f.onload = () => s(f));
        delete this.#s[m];
      }
    });
  }
  static #s = {};
  static #d = {};
  // === vite-electron 用コード ===
  static use4ViteElectron(t, e) {
  }
  cvsResize() {
    for (const [t, e] of Object.entries(this.#t)) {
      const s = "const.sn.frm." + t, i = Number(this.val.getVal(s + ".x")), n = Number(this.val.getVal(s + ".y")), o = Number(this.val.getVal(s + ".width")), a = Number(this.val.getVal(s + ".height"));
      e.style.left = `${k.#e.ofsLeft4elm + i * k.#e.cvsScale}px`, e.style.top = `${k.#e.ofsTop4elm + n * k.#e.cvsScale}px`, e.width = String(o * k.#e.cvsScale), e.height = String(a * k.#e.cvsScale);
    }
  }
  // フレーム変数を取得
  #u(t) {
    const { id: e, var_name: s } = t;
    if (!e) throw "idは必須です";
    const i = document.getElementById(e);
    if (!i) throw `id【${e}】はフレームではありません`;
    const n = "const.sn.frm." + e;
    if (!this.val.getVal(`tmp:${n}`)) throw `frame【${e}】が読み込まれていません`;
    if (!s) throw "var_nameは必須です";
    const o = i.contentWindow;
    if (!Object.hasOwn(o, s)) throw `frame【${e}】に変数/関数【${s}】がありません。変数は var付きにして下さい`;
    const a = o[s];
    return this.val.setVal_Nochk(
      "tmp",
      n + "." + s,
      S(t, "function", !1) ? a() : a
    ), !1;
  }
  // フレーム変数に設定
  #f(t) {
    const { id: e, var_name: s, text: i } = t;
    if (!e) throw "idは必須です";
    const n = document.getElementById(e);
    if (!n) throw `id【${e}】はフレームではありません`;
    const o = "const.sn.frm." + e;
    if (!this.val.getVal(`tmp:${o}`)) throw `frame【${e}】が読み込まれていません`;
    if (!s) throw "var_nameは必須です";
    if (!i) throw "textは必須です";
    this.val.setVal_Nochk("tmp", o + "." + s, i);
    const a = n.contentWindow;
    return a[s] = i, !1;
  }
  // フレームに設定
  #h = 1;
  #g(t) {
    const { id: e } = t;
    if (!e) throw "idは必須です";
    const s = document.getElementById(e);
    if (!s) throw `id【${e}】はフレームではありません`;
    const i = "const.sn.frm." + e;
    if (!this.val.getVal("tmp:" + i)) throw `frame【${e}】が読み込まれていません`;
    const n = s.style;
    if (S(t, "float", !1) ? n.zIndex = `${++this.#h}` : "index" in t ? n.zIndex = `${x(t, "index", 0)}` : t.dive && (n.zIndex = `-${++this.#h}`), "alpha" in t) {
      const a = n.opacity = String(t.alpha);
      this.val.setVal_Nochk("tmp", i + ".alpha", a);
    }
    const o = this.#r(t);
    if (("x" in t || "y" in t) && (n.left = `${k.#e.ofsLeft4elm + o.x * k.#e.cvsScale}px`, n.top = `${k.#e.ofsTop4elm + o.y * k.#e.cvsScale}px`, this.val.setVal_Nochk("tmp", i + ".x", o.x), this.val.setVal_Nochk("tmp", i + ".y", o.y)), "scale_x" in t || "scale_y" in t || "rotate" in t) {
      const a = x(t, "scale_x", 1), l = x(t, "scale_y", 1), d = x(t, "rotate", 0);
      n.transform = `scale(${a}, ${l}) rotate(${d}deg)`, this.val.setVal_Nochk("tmp", i + ".scale_x", a), this.val.setVal_Nochk("tmp", i + ".scale_y", l), this.val.setVal_Nochk("tmp", i + ".rotate", d);
    }
    if ("width" in t && (s.width = String(o.width * k.#e.cvsScale), this.val.setVal_Nochk("tmp", i + ".width", o.width)), "height" in t && (s.height = String(o.height * k.#e.cvsScale), this.val.setVal_Nochk("tmp", i + ".height", o.height)), "visible" in t) {
      const a = S(t, "visible", !0);
      n.display = a ? "inline" : "none", this.val.setVal_Nochk("tmp", i + ".visible", a);
    }
    if ("b_color" in t && (n.backgroundColor = t.b_color), "disabled" in t) {
      const a = this.#m[e] = S(t, "disabled", !0), l = s.contentDocument.body;
      for (const d of [
        ...Array.from(l.getElementsByTagName("input")),
        ...Array.from(l.getElementsByTagName("select"))
      ]) d.disabled = a;
    }
    return !1;
  }
  // フレームをトゥイーン開始
  #o(t) {
    const { id: e, alpha: s, x: i, y: n, scale_x: o, scale_y: a, rotate: l, width: d, height: p } = t;
    if (!e) throw "idは必須です";
    const c = document.getElementById(e);
    if (!c) throw `id【${e}】はフレームではありません`;
    const m = "const.sn.frm." + e;
    if (!this.val.getVal(`tmp:${m}`, 0)) throw `frame【${e}】が読み込まれていません`;
    const u = {};
    s && (u.a = c.style.opacity), (i || n || o || a || l) && (u.x = Number(this.val.getVal(`tmp:${m}.x`)), u.y = Number(this.val.getVal(`tmp:${m}.y`)), u.sx = Number(this.val.getVal(`tmp:${m}.scale_x`)), u.sy = Number(this.val.getVal(`tmp:${m}.scale_y`)), u.r = Number(this.val.getVal(`tmp:${m}.rotate`))), d && (u.w = this.val.getVal(`tmp:${m}.width`)), p && (u.h = this.val.getVal(`tmp:${m}.height`));
    const r = O.cnvTweenArg(t, u);
    let h = () => {
    };
    s && (x(r, "alpha", 0), h = () => {
      c.style.opacity = u.a, this.val.setVal_Nochk("tmp", "alpha", u.a);
    });
    let f = () => {
    };
    const b = this.#r(r);
    (i || n || o || a || l) && (b.x, b.y, x(r, "scale_x", 1), x(r, "scale_y", 1), x(r, "rotate", 0), f = () => {
      c.style.left = k.#e.ofsLeft4elm + u.x * k.#e.cvsScale + "px", c.style.top = k.#e.ofsTop4elm + u.y * k.#e.cvsScale + "px", c.style.transform = `scale(${u.sx}, ${u.sy}) rotate(${u.r}deg)`, this.val.setVal_Nochk("tmp", m + ".x", u.x), this.val.setVal_Nochk("tmp", m + ".y", u.y), this.val.setVal_Nochk("tmp", m + ".scale_x", u.sx), this.val.setVal_Nochk("tmp", m + ".scale_y", u.sy), this.val.setVal_Nochk("tmp", m + ".rotate", u.r);
    });
    let v = () => {
    };
    d && (b.width, v = () => {
      c.width = u.w * k.#e.cvsScale + "px", this.val.setVal_Nochk("tmp", m + ".width", u.w);
    });
    let N = () => {
    };
    return p && (b.height, N = () => {
      c.height = u.h * k.#e.cvsScale + "px", this.val.setVal_Nochk("tmp", m + ".height", u.h);
    }), this.appPixi.stage.interactive = !1, O.tween(`frm
${e}`, t, u, O.cnvTweenArg(t, u), () => {
      h(), f(), v(), N();
    }, () => this.appPixi.stage.interactive = !0, () => {
    }), !1;
  }
}
class U {
  //MARK: コンストラクタ
  constructor(t, e, s, i, n, o, a, l, d) {
    this.cfg = t, this.hTag = e, this.appPixi = s, this.val = i, this.main = n, this.scrItr = o, this.sys = a, this.sndMng = l, this.prpPrs = d;
    const p = () => {
      if (a.cvsResize(), this.cvsResizeDesign(), this.#r) for (const r of this.#b)
        this.#a[r].fore.cvsResizeChildren();
      else for (const r of this.#b)
        this.#a[r].fore.cvsResize();
      this.#l.cvsResize(), this.#d.cvsResize();
    };
    if (R.isMobile)
      this.#c.add(globalThis, "orientationchange", p, { passive: !0 });
    else {
      let r;
      this.#c.add(globalThis, "resize", () => {
        r || (r = setTimeout(() => {
          r = void 0, p();
        }, 1e3 / 60 * 10));
      }, { passive: !0 });
    }
    a.cvsResize(), w.init(t, e, i, this, (r) => this.#a[r.layname].fore === r, s), H.init(n, t, s, a, l, i), k.init(t, a, n), W.init(t), this.#l = new k(e, s, i), a.hFactoryCls.grp = () => new H(), a.hFactoryCls.txt = () => new w(), e.loadplugin = (r) => this.#v(r), e.snapshot = (r) => this.#h(r), this.#g = this.sys.isApp ? this.#o : this.#U, e.add_lay = (r) => this.#x(r), e.clear_lay = (r) => this.#j(r), e.finish_trans = () => !1, e.lay = (r) => this.#H(r), e.trans = (r) => this.#z(r), e.wt = (r) => O.wt(r), e.quake = (r) => this.#T(r), e.stop_quake = e.finish_trans, e.wq = e.wt, e.pause_tsy = (r) => O.pause_tsy(r), e.resume_tsy = (r) => O.resume_tsy(r), e.stop_tsy = (r) => O.stop_tsy(r), e.tsy = (r) => this.#A(r), e.wait_tsy = (r) => O.wait_tsy(r), e.add_filter = (r) => this.#F(r), e.clear_filter = (r) => this.#Q(r), e.enable_filter = (r) => this.#L(r), e.ch = (r) => this.#R(r), e.clear_text = (r) => this.#et(r), e.current = (r) => this.#K(r), e.endlink = (r) => this.#st(r), e.er = (r) => this.#it(r), e.graph = (r) => this.#nt(r), e.link = (r) => this.#at(r), e.r = (r) => this.#ot(r), e.rec_ch = (r) => this.#tt(r), e.rec_r = (r) => this.#lt(r), e.reset_rec = (r) => this.#rt(r), e.ruby2 = (r) => this.#ct(r), e.span = (r) => this.#ht(r), e.tcy = (r) => this.#dt(r), e.add_face = (r) => y.add_face(r), e.wv = (r) => y.wv(r), e.dump_lay = (r) => this.#ft(r), e.enable_event = (r) => this.#pt(r), e.button = (r) => this.#ut(r), t.existsBreakline && (this.breakLine = (r) => {
      delete r.visible, r.id = "break", r.pic = "breakline";
      const h = encodeURIComponent(JSON.stringify(r));
      this.#f("grp｜" + h);
    }), t.existsBreakpage && (this.breakPage = (r) => {
      delete r.visible, r.id = "break", r.pic = "breakpage";
      const h = encodeURIComponent(JSON.stringify(r));
      this.#f("grp｜" + h);
    }), this.#t = Ot(String(t.oCfg.init.bg_color));
    const c = new J();
    c.beginFill(this.#t).lineStyle(0, this.#t).drawRect(0, 0, R.stageW, R.stageH).endFill(), this.#e.addChild(c.clone()), this.#n.addChild(c), this.#n.visible = !1, this.#e.name = "page:A", this.#n.name = "page:B", this.#i = s.stage, this.#i.addChild(this.#n), this.#i.addChild(this.#e), this.#i.addChild(this.#N), this.#i.addChild(this.#y), this.#i.name = "stage";
    const m = (r, h) => {
      this.#u(Number(h));
    };
    m("", i.getVal("sys:TextLayer.Back.Alpha", 1)), i.defValTrg("sys:TextLayer.Back.Alpha", m);
    const u = (r, h) => W.fontFamily = h;
    u("", i.getVal("tmp:sn.button.fontFamily", W.fontFamily)), i.defValTrg("tmp:sn.button.fontFamily", u), i.defTmp("const.sn.log.json", () => JSON.stringify(
      (this.#I.text = this.#I.text?.replaceAll("</span><span class='sn_ch'>", "") ?? "") ? [...this.#q, this.#I] : this.#q
    )), i.defTmp("const.sn.last_page_text", () => this.currentTxtlayFore?.pageText ?? ""), i.defTmp("const.sn.last_page_plain_text", () => this.currentTxtlayFore?.pagePlainText ?? ""), R.isDbg && (ht.init(s, a, o, d, t, this.#a), this.cvsResizeDesign = () => ht.cvsResizeDesign(), a.addHook((r, h) => {
      this.#p[r]?.(r, h) && delete this.#p[r];
    }));
  }
  #i;
  #e = new D();
  #n = new D();
  #l;
  #t;
  #c = new wt();
  cvsResizeDesign() {
  }
  #p = {
    attach: (t) => !1,
    continue: (t) => !1,
    disconnect: (t) => !1,
    _enterDesign: (t) => {
      for (const e of this.#b) {
        const s = this.#a[e].fore;
        s.makeDesignCastChildren((i) => i.make()), s.makeDesignCast((i) => i.make());
      }
      return this.#_(this.#E), !1;
    },
    _replaceToken: (t, e) => !1,
    _selectNode: (t, e) => (this.#_(e.node), !1)
  };
  #m = "";
  #r = "";
  #_(t) {
    [this.#m = "", this.#r = ""] = t.split("/");
    const e = this.#a[this.#m];
    e && (this.#r ? e.fore.showDesignCastChildren() : e.fore.showDesignCast());
  }
  getFrmDisabled = (t) => this.#l.getFrmDisabled(t);
  #s = void 0;
  cover(t, e = 0) {
    this.#s && (this.#i.removeChild(this.#s), this.#s.destroy(), this.#s = void 0), t && this.#i.addChild(
      (this.#s = new J()).beginFill(e).lineStyle(0, e).drawRect(0, 0, R.stageW, R.stageH).endFill()
    );
  }
  #d;
  setEvtMng(t) {
    this.#d = t, this.#l.setEvtMng(t), y.setEvtMng(t), O.init(t, this.appPixi);
  }
  destroy() {
    for (const t of Object.values(this.#a)) t.destroy();
    this.#c.clear(), H.destroy(), ct.destroy(), g.destroy(), w.destroy(), this.#l.destroy(), O.destroy(), U.#O = 10;
  }
  // 既存の全文字レイヤの実際のバック不透明度、を再計算
  #u(t) {
    for (const e of this.#b) {
      const { fore: s, back: i } = this.#a[e];
      s instanceof w && (s.chgBackAlpha(t), i.chgBackAlpha(t));
    }
  }
  #f = (t, e = this.currentTxtlayForeNeedErr, s = !0) => e.tagCh("｜&emsp;《" + t + "》");
  goTxt = () => {
  };
  get needGoTxt() {
    return this.currentTxtlayFore?.needGoTxt ?? !1;
  }
  breakLine = (t) => {
  };
  breakPage = (t) => {
  };
  clearBreak() {
    this.currentTxtlayFore && (this.clearBreak = () => this.#f("del｜break"), this.clearBreak());
  }
  clickTxtLay() {
    return this.currentTxtlayFore ? this.#b.map((t) => this.#a[t].fore).some((t) => t instanceof w && t.click()) : !1;
  }
  //	//	システム
  //MARK: スナップショット
  #h(t) {
    const e = It("-", "_", "", "_"), s = t.fn ? t.fn.startsWith(gt) ? t.fn : `${mt + t.fn + e}.png` : `${mt}snapshot${e}.png`, i = this.cfg.searchPath(s), n = x(t, "width", R.stageW), o = x(t, "height", R.stageH);
    return this.#g(t, i, n, o, `snapshot dt:${e}`);
  }
  #g = () => !1;
  #o({ layer: t }, e, s, i, n) {
    if (this.#l.hideAllFrame(), F.beginProc(n), !t)
      return this.sys.capturePage(e, s, i, () => {
        this.#l.restoreAllFrame(), F.endProc(n);
      }), !0;
    const o = this.#b.map((a) => {
      const { ctn: l } = this.#a[a].fore, d = [l, l.visible];
      return l.visible = !1, d;
    });
    for (const a of this.#$(t)) this.#a[a].fore.ctn.visible = !0;
    return this.sys.capturePage(e, s, i, () => {
      for (const [a, l] of o) a.visible = l;
      this.#l.restoreAllFrame(), F.endProc(n);
    }), !0;
  }
  #U(t, e, s, i, n) {
    F.beginProc(n);
    const o = xt(t, "b_color", this.#t), a = Bt({
      width: s,
      height: i,
      backgroundAlpha: o > 16777216 && e.endsWith(".png") ? 0 : 1,
      antialias: S(t, "smoothing", !1),
      preserveDrawingBuffer: !0,
      backgroundColor: o & 16777215,
      autoDensity: !0
    }), l = t.page !== "back" ? "fore" : "back", { layer: d } = t;
    return Promise.allSettled(
      this.#$(d).map((p) => new Promise(
        (c) => this.#a[p][l].snapshot(a, c)
      ))
    ).then(async () => {
      const p = K.create({ width: a.width, height: a.height });
      a.render(this.#i, { renderTexture: p }), await this.sys.savePic(
        e,
        a.plugins.extract.base64(p)
      ), p.destroy();
      for (const c of this.#$(d)) this.#a[c][l].snapshot_end();
      a.destroy(!0), F.endProc(n);
    }), !0;
  }
  //MARK: プラグインの読み込み
  #v(t) {
    const { fn: e } = t;
    if (!e) throw "fnは必須です";
    if (!e.endsWith(".css")) throw "サポートされない拡張子です";
    const s = S(t, "join", !0), i = F.procID + `loadplugin fn:${e}`;
    return s && F.beginProc(i), (async () => {
      const n = await fetch(e);
      if (!n.ok) throw new Error("Network response was not ok.");
      st(await n.text()), s && F.endProc(i);
    })(), s;
  }
  //	//	レイヤ共通
  //MARK: レイヤを追加する
  #x(t) {
    const { layer: e, class: s } = t;
    if (!e) throw "layerは必須です";
    if (e.includes(",")) throw "layer名に「,」は使えません";
    if (e in this.#a) throw `layer【${e}】はすでにあります`;
    if (!s) throw "clsは必須です";
    const i = { isWait: !1 };
    switch (this.#a[e] = new Q(e, s, this.#e, this.#n, t, this.sys, this.val, i), this.#b.push(e), s) {
      case "txt":
        this.#E || (this.#J = () => {
        }, this.#w = this.#Z, this.#K = this.#M, this.hTag.current({ layer: e }), this.goTxt = () => {
          this.#d.isSkipping ? U.#O = 0 : this.setNormalChWait();
          for (const n of this.#b) {
            const o = this.#a[n].fore;
            o instanceof w && this.#f("gotxt｜", o, !1);
          }
        }), this.val.setVal_Nochk(
          "save",
          "const.sn.layer." + (e ?? this.#E) + ".enabled",
          !0
        );
        break;
      case "grp":
        if (this.#B) break;
        this.#B = e;
        break;
    }
    return this.scrItr.recodeDesign(t), i.isWait;
  }
  #a = {};
  // しおりLoad時再読込
  #b = [];
  // 最適化用・重なり順つき全レイヤ名
  #E = "";
  #B = "";
  #H(t) {
    const e = this.#G(t), s = this.#a[e], i = s.back.ctn, n = s.fore.ctn;
    if (S(t, "float", !1))
      this.#n.setChildIndex(i, this.#n.children.length - 1), this.#e.setChildIndex(n, this.#e.children.length - 1), this.#V();
    else if (t.index)
      x(t, "index", 0) && (this.#n.setChildIndex(i, t.index), this.#e.setChildIndex(n, t.index), this.#V());
    else if (t.dive) {
      const { dive: o } = t;
      let a = 0;
      if (e === o) throw "[lay] 属性 layerとdiveが同じ【" + o + "】です";
      const l = this.#a[o];
      if (!l) throw "[lay] 属性 dive【" + o + "】が不正です。レイヤーがありません";
      const d = l.back, p = l.fore, c = this.#n.getChildIndex(d.ctn), m = this.#e.getChildIndex(p.ctn);
      a = c < m ? c : m, a > this.#n.getChildIndex(i) && --a, this.#e.setChildIndex(n, a), this.#n.setChildIndex(i, a), this.#V();
    }
    return t[":id_tag"] = s.fore.name.slice(0, -7), this.scrItr.recodeDesign(t), s.lay(t);
  }
  #V() {
    this.#b = this.#k();
  }
  //MARK: レイヤ設定の消去
  #j(t) {
    return this.#C(t, (e) => {
      const s = this.#a[this.#G({ layer: e })];
      if (t.page === "both") {
        s.fore.clearLay(t), s.back.clearLay(t);
        return;
      }
      s.getPage(t).clearLay(t);
    }), !1;
  }
  //===================================================
  //MARK: WebGL フラグメントシェーダー GLSL
  static #Y = (
    /* glsl */
    `
precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform sampler2D rule;
uniform float vague;
uniform float tick;

uniform vec4 inputPixel;
uniform highp vec4 outputFrame;
vec2 getUV(vec2 coord) {
	return coord * inputPixel.xy / outputFrame.zw;
}

void main() {
	vec4 fg = texture2D(uSampler, vTextureCoord);
	vec4 ru = texture2D(rule, getUV(vTextureCoord));

	float v = ru.r - tick;
	gl_FragColor = abs(v) < vague
		? vec4(fg.rgb, 1) *fg.a *(0.5 +v /vague *0.5)
		: 0.0 <= v ? fg : vec4(0);
}`
  );
  /*
  	末尾が読みづらいが、以下のif文を消して三項演算子にしている。
  
  	if (abs(v) < vague) {
  		float f_a = fg.a *(0.5 +v /vague *0.5);
  		gl_FragColor.rgb = fg.rgb *f_a;
  		gl_FragColor.a = f_a;
  		return;
  	}
  	gl_FragColor = v >= 0.0 ? fg : vec4(0);
  
  		★GLSL : don't use "if"｜Nobu note.com/nobuhirosaijo/n/n606a3f5d8e89
  			> if文はあまり使わない方がいいらしい (処理負荷が高い)
  */
  #P = K.create({
    width: R.stageW,
    height: R.stageH
  });
  #N = new I(this.#P);
  #S = K.create({
    width: R.stageW,
    height: R.stageH
  });
  #y = new I(this.#S);
  //MARK: ページ裏表を交換
  #z(t) {
    const { layer: e } = t, s = /* @__PURE__ */ new Set(), i = this.#$(e).map((_) => (s.add(_), this.#a[_].fore)), n = async () => {
      [this.#e, this.#n] = [this.#n, this.#e];
      const _ = [];
      for (const [$, E] of Object.entries(this.#a)) {
        if (s.has($)) {
          E.transPage(_);
          continue;
        }
        const { fore: { ctn: P }, back: { ctn: T } } = E, B = this.#e.getChildIndex(T);
        this.#e.removeChild(T), this.#n.removeChild(P), this.#e.addChildAt(P, B), this.#n.addChildAt(T, B);
      }
      await Promise.allSettled(_), this.#e.visible = !0, this.#n.visible = !1, this.#N.visible = !1, this.#y.visible = !1, F.notifyEndProc(yt + X);
    };
    if (this.#y.filters = [], this.#y.alpha = 1, x(t, "time", 0) === 0 || this.#d.isSkipping)
      return F.beginProc(yt + X, () => {
      }), queueMicrotask(() => n()), !0;
    const a = [], l = this.#b.map((_) => {
      const { fore: $, back: E } = this.#a[_], P = s.has(_) ? E : $;
      return P.ctn.visible && a.push(P.ctn), P;
    }), { ticker: d, renderer: p } = this.appPixi;
    p.render(this.#n, { renderTexture: this.#P });
    let c = () => {
      for (const _ of a) p.render(
        _,
        { renderTexture: this.#P, clear: !1 }
      );
    };
    if (!l.some((_) => _.containMovement)) {
      const _ = c;
      c = () => {
        c = () => {
        }, _();
      };
    }
    const m = () => p.render(this.#e, { renderTexture: this.#S });
    m();
    let u = () => {
      this.#e.visible = !0, m(), this.#e.visible = !1;
    };
    if (!i.some((_) => _.containMovement)) {
      const _ = u;
      u = () => {
        u = () => {
        }, _();
      };
    }
    const r = () => {
      c(), this.#N.visible = !0, u(), this.#y.visible = !0;
    }, { glsl: h, rule: f } = t, b = async () => {
      d.remove(r), await n();
    };
    if (!h && !f)
      return O.tween(X, t, this.#y, { alpha: 0 }, () => {
      }, b, () => {
      }), d.add(r), !1;
    const v = {
      rule: z.EMPTY,
      vague: x(t, "vague", 0.04),
      tick: 0
    };
    this.#y.filters = [new Vt(
      void 0,
      h ?? U.#Y,
      v
    )];
    const N = O.tween(X, t, v, { tick: 1 }, () => {
    }, b, () => {
    }, !f);
    return f ? new y(f, void 0, (_) => {
      v.rule = _.texture, _.destroy(), N.start(), d.add(r);
    }, (_) => {
      _ && this.main.resume();
    }).ret : (d.add(r), !1);
  }
  #$(t = "") {
    return t ? t.split(",") : this.#b;
  }
  #C(t, e) {
    const s = this.#$(t.layer);
    for (const i of s) {
      const n = this.#a[i];
      if (!n) throw `存在しないlayer【${i}】です`;
      e(i, n);
    }
    return s;
  }
  #k(t = "") {
    return this.#$(t).sort((e, s) => {
      const i = this.#e.getChildIndex(this.#a[e].fore.ctn), n = this.#e.getChildIndex(this.#a[s].fore.ctn);
      return i < n ? -1 : i > n ? 1 : 0;
    });
  }
  setAllStyle2TxtLay(t) {
    for (const e of this.#b) {
      const s = this.#a[e].fore;
      s instanceof w && s.lay({ style: t });
    }
  }
  //MARK: 画面を揺らす
  #T(t) {
    if (x(t, "time", NaN) === 0) return !1;
    const e = this.#$(t.layer).map((p) => this.#a[p].fore.ctn), { renderer: s, ticker: i } = this.appPixi;
    this.#S.resize(R.stageW, R.stageH);
    const n = () => {
      this.#e.visible = !0;
      for (const p of e) s.render(
        p,
        { renderTexture: this.#S, clear: !1 }
      );
      this.#e.visible = !1;
    };
    this.#y.visible = !0, this.#y.alpha = 1;
    const o = G(x(t, "hmax", 10)), a = G(x(t, "vmax", 10)), l = o === 0 ? () => {
    } : () => this.#y.x = Math.round(Math.random() * o * 2) - o, d = a === 0 ? () => {
    } : () => this.#y.y = Math.round(Math.random() * a * 2) - a;
    return this.#y.filters = [], O.tween(X, t, this.#y, { x: 0, y: 0 }, () => {
      l(), d();
    }, () => {
      i.remove(n), this.#e.visible = !0, this.#y.visible = !1, this.#y.x = 0, this.#y.y = 0;
    }, () => {
    }), i.add(n), !1;
  }
  //MARK: トゥイーン開始
  #A(t) {
    const { layer: e, render: s, name: i } = t;
    if (!e) throw "layerは必須です";
    const n = this.#a[this.#G(t)], o = n.fore;
    let a = () => {
    };
    s && !this.#d.isSkipping && (o.renderStart(), a = () => o.renderEnd());
    const l = O.cnvTweenArg(t, o), d = S(t, "arrive", !1), p = S(t, "backlay", !1), c = n.back.ctn;
    return O.tween(i ?? e, t, o, O.cnvTweenArg(t, o), () => {
    }, a, () => {
      if (d && Object.assign(o, l), p) for (const m of Object.keys(O.hMemberCnt)) c[m] = o[m];
    }), "filter" in t && (o.ctn.filters = [j.bldFilters(t)], o.aFltHArg = [t]), !1;
  }
  //MARK: フィルター追加
  #F(t) {
    return this.#C(t, (e) => {
      const s = this.#a[this.#G({ layer: e })];
      if (t.page === "both") {
        this.#X(s.fore, t), this.#X(s.back, t);
        return;
      }
      const i = s.getPage(t);
      this.#X(i, t);
    }), !1;
  }
  #X(t, e) {
    const s = t.ctn;
    s.filters ??= [], s.filters = [...s.filters, j.bldFilters(e)], t.aFltHArg.push(e);
  }
  //MARK: フィルター全削除
  #Q(t) {
    return this.#C(t, (e) => {
      const s = this.#a[this.#G({ layer: e })];
      if (t.page === "both") {
        const n = s.fore, o = s.back;
        n.ctn.filters = null, o.ctn.filters = null, n.aFltHArg = [], o.aFltHArg = [];
        return;
      }
      const i = s.getPage(t);
      i.ctn.filters = null, i.aFltHArg = [];
    }), !1;
  }
  //MARK: フィルター個別切替
  #L(t) {
    return this.#C(t, (e) => {
      const s = this.#a[this.#G({ layer: e })];
      if (t.page === "both") {
        this.#D(s.fore, t), this.#D(s.back, t);
        return;
      }
      const i = s.getPage(t);
      this.#D(i, t);
    }), !1;
  }
  #D(t, e) {
    const s = t.ctn;
    if (!s.filters) throw "フィルターがありません";
    const i = G(x(e, "index", 0)), n = s.filters.length;
    if (n <= i) throw `フィルターの個数（${n}）を越えています`;
    t.aFltHArg[i].enabled = s.filters[i].enabled = S(e, "enabled", !0);
  }
  //	// 文字・文字レイヤ
  static #O = 10;
  static get msecChWait() {
    return U.#O;
  }
  //MARK: 文字を追加する
  #R(t) {
    const { text: e } = t;
    if (!e) throw "textは必須です";
    const s = this.#w(t);
    delete t.text, this.setNormalChWait(), this.#d.isSkipping ? t.wait = 0 : "wait" in t && x(t, "wait", NaN);
    const i = encodeURIComponent(JSON.stringify(t));
    this.#f("add｜" + i, s);
    const n = S(t, "record", !0), o = this.val.doRecLog();
    return n || this.val.setVal_Nochk("save", "sn.doRecLog", n), s.tagCh(e.replaceAll("[r]", `
`)), this.val.setVal_Nochk("save", "sn.doRecLog", o), this.#f("add_close｜", s), !1;
  }
  #w = (t) => {
    throw this.#J(), 0;
  };
  #Z(t) {
    const e = this.#G(t, this.#E), i = this.#a[e].getPage(t);
    if (!(i instanceof w)) throw e + "はTxtLayerではありません";
    return i;
  }
  setNormalChWait() {
    U.#O = this.scrItr.normalWait;
  }
  //MARK: 操作対象のメッセージレイヤの指定
  #K = (t) => {
    throw this.#J(), 0;
  };
  #M(t) {
    const { layer: e } = t;
    if (!e) throw "[current] layerは必須です";
    const s = this.#a[e];
    if (!s || !(s.getPage(t) instanceof w)) throw `${e}はTxtLayerではありません`;
    this.#W = s, this.recPagebreak(), this.#E = e, this.val.setVal_Nochk("save", "const.sn.mesLayer", e);
    for (const i of this.#b) {
      const { fore: n, back: o } = this.#a[i];
      n instanceof w && (n.isCur = o.isCur = i === e);
    }
    return !1;
  }
  get currentTxtlayForeNeedErr() {
    return this.#J(), this.currentTxtlayFore;
  }
  get currentTxtlayFore() {
    return this.#W ? this.#W.fore : null;
  }
  #W;
  // カレントテキストレイヤ
  #J = () => {
    throw "文字レイヤーがありません。文字表示や操作する前に、[add_lay layer=（レイヤ名） class=txt]で文字レイヤを追加して下さい";
  };
  #G(t, e = "") {
    const s = t.layer ?? e;
    if (s.includes(",")) throw "layer名に「,」は使えません";
    if (!(s in this.#a)) throw "属性 layer【" + s + "】が不正です。レイヤーがありません";
    return t.layer = s;
  }
  #I = { text: "" };
  #q = [];
  recText(t) {
    this.#I = { text: t }, this.val.setVal_Nochk(
      "save",
      "const.sn.sLog",
      String(this.val.getVal("const.sn.log.json"))
      // これを起動したい
    );
  }
  recPagebreak() {
    this.#I.text && (this.#I.text = this.#I.text.replaceAll("</span><span class='sn_ch'>", ""), this.#q.push(this.#I) > this.cfg.oCfg.log.max_len && (this.#q = this.#q.slice(-this.cfg.oCfg.log.max_len)), this.#I = { text: "" });
  }
  //MARK: 文字消去
  #et(t) {
    const e = this.#w(t);
    return t.layer === this.#E && t.page === "fore" && this.recPagebreak(), e.clearText(), !1;
  }
  //MARK: ハイパーリンクの終了
  #st(t) {
    return this.#f("endlink｜", this.#w(t)), !1;
  }
  //MARK: ページ両面の文字消去
  #it(t) {
    return S(t, "rec_page_break", !0) && this.recPagebreak(), this.#W && (this.#W.fore.clearLay(t), this.#W.back.clearLay(t)), !1;
  }
  //MARK: インライン画像表示
  #nt(t) {
    if (!t.pic) throw "[graph] picは必須です";
    const e = encodeURIComponent(JSON.stringify(t));
    return this.#f("grp｜" + e, this.#w(t)), !1;
  }
  //MARK: ハイパーリンク
  #at(t) {
    if (!t.fn && !t.label && !t.url) throw "fn,label,url いずれかは必須です";
    t.fn ??= this.scrItr.scriptFn, t.style ??= "background-color: rgba(255,0,0,0.5);", t.style_hover ??= "background-color: rgba(255,0,0,0.9);", t.style_clicked ??= t.style;
    const e = encodeURIComponent(JSON.stringify(t));
    return this.#f("link｜" + e, this.#w(t)), !1;
  }
  //MARK: 改行
  #ot(t) {
    return t.text = `
`, this.#R(t);
  }
  //MARK: 履歴改行
  #lt(t) {
    return this.#tt({ ...t, text: "[r]" });
  }
  //MARK: 履歴書き込み
  #tt(t) {
    return this.#I = { ...t, text: this.#I.text }, t.text ? (t.record = !0, t.style ??= "", t.style += "display: none;", t.wait = 0, this.#R(t)) : !1;
  }
  //MARK: 履歴リセット
  #rt(t) {
    return this.#q = [], this.#I = { text: t.text ?? "" }, this.val.setVal_Nochk(
      "save",
      "const.sn.sLog",
      t.text ? `[{text:"${t.text}"}]` : "[]"
    ), !1;
  }
  //MARK: 文字列と複数ルビの追加
  #ct(t) {
    const { t: e, r: s } = t;
    if (!e) throw "[ruby2] tは必須です";
    if (!s) throw "[ruby2] rは必須です";
    return t.text = "｜" + encodeURIComponent(e) + "《" + encodeURIComponent(s) + "》", delete t.t, delete t.r, this.#R(t);
  }
  //MARK: インラインスタイル設定
  #ht(t) {
    const e = encodeURIComponent(JSON.stringify(t));
    return this.#f("span｜" + e, this.#w(t)), !1;
  }
  //MARK: tcy縦中横を表示する
  #dt(t) {
    if (!t.t) throw "[tcy] tは必須です";
    const e = encodeURIComponent(JSON.stringify(t));
    return this.#f("tcy｜" + e, this.#w(t)), !1;
  }
  //MARK: レイヤのダンプ
  #ft({ layer: t }) {
    console.group("🥟 [dump_lay]");
    for (const e of this.#$(t)) {
      const { fore: s, back: i } = this.#a[e];
      try {
        console.info(
          `%c${s.name.slice(0, -7)} %o`,
          `color:#${R.isDarkMode ? "49F" : "05A"};`,
          JSON.parse(`{"back":{${i.dump()}}, "fore":{${s.dump()}}}`)
        );
      } catch (n) {
        console.error("dump_lay err:%o", n), console.error(`   back:${i.dump()}`), console.error(`   fore:${s.dump()}`);
      }
    }
    return console.groupEnd(), !1;
  }
  //MARK: イベント有無の切替
  #pt(t) {
    const e = this.#G(t, this.#E), s = S(t, "enabled", !0);
    return this.#w(t).enabled = s, this.val.setVal_Nochk("save", "const.sn.layer." + e + ".enabled", s), !1;
  }
  //MARK: ボタンを表示
  #ut(t) {
    return Q.argChk_page(t, "back"), t.fn ??= this.scrItr.scriptFn, this.#w(t).addButton(t), this.scrItr.recodeDesign(t), !1;
  }
  record() {
    const t = {};
    for (const e of this.#b) {
      const s = this.#a[e];
      t[e] = {
        cls: s.cls,
        fore: s.fore.record(),
        back: s.back.record()
      };
    }
    return t;
  }
  playback(t) {
    this.#q = JSON.parse(String(this.val.getVal("save:const.sn.sLog"))), this.#I = { text: "" };
    const e = [], s = [];
    for (const [n, { fore: o, fore: { idx: a }, back: l, cls: d }] of Object.entries(t)) {
      s.push({ ln: n, idx: a });
      const p = this.#a[n] ??= new Q(n, d, this.#e, this.#n, {}, this.sys, this.val, { isWait: !1 });
      p.fore.playback(o, e), p.back.playback(l, e);
    }
    const i = this.#e.children.length;
    return e.push(new Promise((n) => {
      for (const { ln: o, idx: a } of s.sort(({ idx: l }, { idx: d }) => l === d ? 0 : l < d ? -1 : 1)) {
        const { fore: l, back: d } = this.#a[o];
        if (!l) continue;
        const p = i > a ? a : i - 1;
        this.#e.setChildIndex(l.ctn, p), this.#n.setChildIndex(d.ctn, p);
      }
      n();
    })), e;
  }
}
const Xt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LayerMng: U
}, Symbol.toStringTag, { value: "Module" }));
export {
  W as B,
  Xt as L,
  w as T
};
//# sourceMappingURL=LayerMng.js.map
