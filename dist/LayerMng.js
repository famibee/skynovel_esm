import { a as q, q as lt, L as D, r as Vt, S as Y, c as B, i as yt, s as Q, D as _, f as jt, R as W, v as bt, w as J, b as S, x as I, E as wt, C as V, y as M, j as Z, z as P, u as v, F as qt, o as ct, H as xt, I as gt, k as st, J as Kt, K as Nt, M as Jt, P as Rt, N as ft, g as kt, O as Bt, Q as It } from "./web2.js";
import { C as N } from "./CmnTween.js";
import { e as G, d as L, R as mt, T as Zt } from "./ReadState.js";
import { R as ht } from "./RubySpliter.js";
class z {
  constructor(t, e, s, i, n, l, a, c) {
    this.cls = e, this.hArg = n, this.sys = l, this.val = a, this.ret = c;
    const p = l.hFactoryCls[e];
    if (!p) throw `属性 class【${e}】が不正です`;
    const f = p(), h = p();
    f.layname = h.layname = t;
    const y = n[":id_tag"] = `layer:${t} cls:${e} page:`;
    f.ctn.name = f.name = y + "A", h.ctn.name = h.name = y + "B", s.addChild(f.ctn), i.addChild(h.ctn), q(n, "visible", !0), q(n, "visible", !0), c.isWait = f.lay(n) || h.lay(n), this.#i = { fore: f, back: h };
    const d = `const.sn.lay.${t}`;
    a.setVal_Nochk("tmp", d, !0), a.defTmp(d + ".fore.alpha", () => this.#i.fore.alpha), a.defTmp(d + ".back.alpha", () => this.#i.back.alpha), a.defTmp(d + ".fore.height", () => this.#i.fore.height), a.defTmp(d + ".back.height", () => this.#i.back.height), a.defTmp(d + ".fore.visible", () => this.#i.fore.ctn.visible), a.defTmp(d + ".back.visible", () => this.#i.back.ctn.visible), a.defTmp(d + ".fore.width", () => this.#i.fore.width), a.defTmp(d + ".back.width", () => this.#i.back.width), a.defTmp(d + ".fore.x", () => this.#i.fore.x), a.defTmp(d + ".back.x", () => this.#i.back.x), a.defTmp(d + ".fore.y", () => this.#i.fore.y), a.defTmp(d + ".back.y", () => this.#i.back.y);
  }
  #i;
  destroy() {
    this.#i.fore.destroy(), this.#i.back.destroy();
  }
  lay = (t) => this.getPage(t).lay(t);
  getPage = (t) => z.argChk_page(t, "fore") !== "back" ? this.#i.fore : this.#i.back;
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
class rt {
  //	static	readonly	#alzTagArg	= new AnalyzeTagArg;
  constructor(t, e = !1) {
    this.bg_col = t, this.isLay = e;
  }
  static init(t, e, s, i, n, l) {
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
class Ht extends rt {
  constructor(t, e) {
    super("#29e", !0);
  }
  setSp(t) {
  }
}
class b {
  constructor(t = "", e, s = () => {
  }, i = () => {
  }) {
    this.csvFn = t, this.ctn = e, this.fncFirstComp = s, this.fncAllComp = i, t && (this.#f = e ? (n) => {
      e.addChild(n), this.#h.push(n);
    } : () => {
    }, this.ret = b.#s(
      t,
      (n) => this.fncFirstComp(n),
      // 差し替え考慮
      (n) => this.fncAllComp(n),
      // 差し替え考慮
      (n) => this.#f(n)
      // 差し替え考慮
    ));
  }
  static #i;
  static #e;
  static #n;
  static #l;
  static init(t, e, s, i, n) {
    b.#i = t, b.#e = e, b.#n = s, b.#l = i, s.arg.crypto && (b.#p = b.#y, b.#c = b.#q);
    const l = () => {
      const a = b.#r * b.#t;
      for (const c of Object.values(b.#K)) c.volume = a;
    };
    n.setNoticeChgVolume(
      (a) => {
        b.#r = a, l();
      },
      (a) => {
        b.#t = a, l();
      }
    );
  }
  static #t = 1;
  static #r = 1;
  static #d;
  static setEvtMng(t) {
    b.#d = t;
  }
  ret = !1;
  #f;
  #h = [];
  destroy() {
    this.fncFirstComp = () => {
    }, this.fncAllComp = () => {
    }, this.#f = (t) => t.destroy();
    for (const t of this.#h)
      b.stopVideo(t.name), t.parent?.removeChild(t), t.destroy();
    this.#h = [];
  }
  static destroy() {
    b.#k = {}, b.#o = {}, b.#K = {};
  }
  //static #ldrHFn: {[fn: string]: 1} = {};
  static #s(t, e, s, i) {
    if (!t) return !1;
    let n = !1;
    if (t.startsWith("data:")) {
      const h = () => {
        const y = J.from(t);
        i(y), e(y), s(n);
      };
      return t in lt ? h() : (n = !0, new D().add(t, t).load(h)), n;
    }
    const l = [], a = new D(), c = t.split(","), p = c.length;
    for (let h = 0; h < p; ++h) {
      const y = c[h];
      if (!y) throw "face属性に空要素が含まれます";
      const { dx: d, dy: o, blendmode: u, fn: r } = b.#k[y] || {
        fn: y,
        dx: 0,
        dy: 0,
        blendmode: Vt.NORMAL
      }, k = h === 0 ? e : (A) => {
        A.x = d, A.y = o, A.blendMode = u;
      };
      if (l.push({ fn: r, fnc: k }), r in b.#o || r in lt || r in D.shared.resources) break;
      n = !0;
      const m = b.#i.searchPath(r, Y.SP_GSM), C = this.#n.arg.crypto ? { xhrType: m.slice(-5) === ".json" ? B.XHR_RESPONSE_TYPE.TEXT : B.XHR_RESPONSE_TYPE.BUFFER } : {};
      a.add({ ...C, name: r, url: m });
    }
    const f = (h, y) => {
      for (const { fn: d, fnc: o } of l) {
        const u = b.#O(d, y);
        u.name = d, i(u), o(u);
      }
      s(n);
    };
    return n ? a.use(async (h, y) => {
      try {
        if (h.extension === "json") {
          const o = await this.#n.dec("json", h.data);
          b.#c(o, h, y);
          return;
        }
        const d = await this.#n.decAB(h.data);
        b.#p(d, h, y);
      } catch (d) {
        const o = `画像/動画ロード失敗です fn:${h.name} ${d}`;
        b.#d.isSkipping ? console.warn(o) : console.error("%c" + o, "color:#FF3300;");
      }
    }).load(f) : queueMicrotask(() => f(0, {})), n;
  }
  static #k = {};
  static #o = {};
  static #p = (t, { type: e, name: s, data: i }, n) => {
    switch (e) {
      case B.TYPE.VIDEO:
        const l = i;
        l.volume = b.#r, b.#K[s] = b.#b(l);
    }
    n();
  };
  static #u(t) {
    const e = /([^\d]+)\d+\.(\w+)/.exec(t[0] ?? "");
    if (!e) return [];
    const s = e[1].length, i = -e[2].length - 1;
    return t.sort((n, l) => yt(n.slice(s, i)) > yt(l.slice(s, i)) ? 1 : -1);
  }
  static async #y(t, e, s) {
    e.data = t, e.extension !== "bin" && s(), t instanceof HTMLImageElement ? (e.texture = await Q.fromLoader(t, e.url, e.name), e.type = B.TYPE.IMAGE) : t instanceof HTMLVideoElement && (t.volume = b.#r, b.#K[e.name] = b.#b(t), e.type = B.TYPE.VIDEO), s();
  }
  static #b(t) {
    return b.#e.getVal("const.sn.needClick2Play") && (_.trace_beforeNew(`[lay系] ${_.strPos()}未クリック状態で動画を自動再生します。音声はミュートされます`, "W"), t.muted = !0), t.setAttribute("playsinline", ""), t;
  }
  static #c = (t, { type: e, spritesheet: s, name: i, data: n }, l) => {
    switch (e) {
      case B.TYPE.JSON:
        const a = s._frameKeys;
        b.#u(a), b.#o[i] = {
          aTex: a.map((c) => Q.from(c)),
          meta: n.meta
        };
    }
    l();
  };
  static #q(t, e, s) {
    const { meta: i, frames: n } = e.data = JSON.parse(t);
    if (e.type = B.TYPE.JSON, !i?.image) {
      s();
      return;
    }
    const l = jt(i.image), a = b.#i.searchPath(l, Y.SP_GSM);
    new D().use((c, p) => {
      this.#n.decAB(c.data).then((f) => {
        c.data = f, f instanceof HTMLImageElement && (c.type = B.TYPE.IMAGE, URL.revokeObjectURL(f.src)), p();
      }).catch((f) => this.#l.errScript(`画像/動画ロード失敗です dec2res4Cripto fn:${c.name} ${f}`, !1));
    }).add({ name: l, url: a, xhrType: B.XHR_RESPONSE_TYPE.BUFFER }).load((c, p) => {
      for (const { data: f } of Object.values(c.resources)) {
        const { baseTexture: h } = Q.from(f), y = Object.values(n);
        b.#o[e.name] = {
          aTex: y.map(({ frame: { x: d, y: o, w: u, h: r } }) => new Q(
            h,
            new W(d, o, u, r)
          )),
          meta: i
        };
      }
      s();
    });
  }
  static #O(t, e) {
    const s = b.#o[t];
    if (s) {
      const l = new bt(s.aTex);
      return l.animationSpeed = s.meta.animationSpeed ?? 1, l.play(), l;
    }
    if (t in lt) return J.from(t);
    const i = b.#K[t];
    if (i) return J.from(i);
    const n = e[t];
    return n ? new J(n.texture) : new J();
  }
  static #K = {};
  static getHFn2VElm(t) {
    return b.#K[t];
  }
  static wv(t) {
    const { fn: e } = t;
    if (!e) throw "fnは必須です";
    const s = b.#K[e];
    if (!s || s.loop) return !1;
    if (b.#d.isSkipping || s.ended)
      return b.stopVideo(e), !1;
    const i = () => b.#d.breakEvent("wv fn:" + e);
    s.addEventListener("ended", i, { once: !0, passive: !0 });
    const n = q(t, "stop", !0);
    return b.#d.waitEvent("wv fn:" + e, t, () => {
      s.removeEventListener("ended", i), n && b.stopVideo(e), i();
    });
  }
  static stopVideo(t) {
    const e = b.#K[t];
    e && (delete b.#K[t], e.pause(), e.currentTime = e.duration);
  }
  static add_face(t) {
    const { name: e } = t;
    if (!e) throw "nameは必須です";
    if (e in b.#k) throw "一つのname（" + e + "）に対して同じ画像を複数割り当てられません";
    const { fn: s = e } = t;
    return b.#k[e] = {
      fn: s,
      dx: S(t, "dx", 0),
      dy: S(t, "dy", 0),
      blendmode: I.getBlendmodeNum(t.blendmode || "")
    }, !1;
  }
  //	static	clearFace2Name(): void {SpritesMng.hFace = {}}
}
class F extends I {
  static #i = new wt();
  static #e;
  static init(t, e, s, i, n, l) {
    F.#e = s, b.init(e, l, i, t, n);
  }
  static destroy() {
    F.#i.clear(), b.destroy();
  }
  #n = new Ht(this.ctn, this);
  constructor() {
    super(), V.isDbg && (this.#l = (t) => this.#n.setSp(t), this.cvsResize = () => {
      super.cvsResize(), this.#n.cvsResize();
    });
  }
  #l = () => {
  };
  #t = "";
  #r = "";
  #d = "";
  lay = (t) => {
    const e = this.#f(t, (s) => {
      s && G();
    });
    return e && L(), e;
  };
  #f(t, e) {
    const { fn: s, face: i = "" } = t;
    if (this.#n.sethArg(t), !s)
      return super.lay(t), this.ctn.children.length > 0 && this.setPos(t), this.#r = "", this.#t = this.#d = i, e(!1), !1;
    const n = "fn" in t, l = "face" in t;
    return this.clearLay({ clear_filter: q(t, "clear_filter", !0) }), n && (this.#r = s), l && (this.#d = i), super.lay(t), t.dx = 0, t.dy = 0, this.#h.destroy(), this.#h = new b(
      this.#t = s + (i ? "," + i : ""),
      this.ctn,
      (a) => {
        ("width" in t || "height" in t) && (a.width = S(t, "width", 0), a.height = S(t, "height", 0)), this.#s = a.width, this.#k = a.height, I.setXY(a, t, this.ctn, !0), I.setBlendmode(this.ctn, t), this.#l(a);
      },
      (a) => e(a)
    ), this.#h.ret;
  }
  #h = new b();
  #s = 0;
  #k = 0;
  get width() {
    return this.#s;
  }
  get height() {
    return this.#k;
  }
  renderStart() {
    this.#p = new J(this.#o), this.#p.visible = !1, this.ctn.addChildAt(this.#p, 0), this.#p.position.set(-this.ctn.x, -this.ctn.y);
    let t = () => {
      const e = this.ctn.alpha;
      this.ctn.alpha = 1;
      for (const s of this.ctn.children) s.visible = !0;
      this.#p.visible = !1, F.#e.renderer.render(this.ctn, { renderTexture: this.#o }), this.ctn.alpha = e;
      for (const s of this.ctn.children) s.visible = !1;
    };
    if (!this.containMovement) {
      let e = t;
      t = () => {
        t = () => {
        }, e();
      };
    }
    this.#u = () => {
      t(), this.#p.visible = !0;
    }, F.#e.ticker.add(this.#u);
  }
  #o = M.create({
    width: V.stageW,
    height: V.stageH
  });
  #p = new J();
  #u = () => {
  };
  renderEnd() {
    F.#e.ticker.remove(this.#u), this.ctn.removeChild(this.#p);
    for (const t of this.ctn.children) t.visible = !0;
    this.#p.destroy(!0), this.#o = M.create({
      width: V.stageW,
      height: V.stageH
    });
  }
  setPos(t) {
    I.setXY(
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
      (e, s) => t[s] instanceof bt || b.getHFn2VElm(e)
    );
  }
  clearLay(t) {
    super.clearLay(t), this.#h.destroy(), this.#r = "", this.#d = "", this.#t = "";
  }
  record = () => ({
    ...super.record(),
    sBkFn: this.#r,
    sBkFace: this.#d
    //		idc_hArg	: this.#idc.gethArg(),
  });
  playback(t, e) {
    if (super.playback(t, e), t.sBkFn === "" && t.sBkFace === "") {
      this.#r = "", this.#d = "";
      return;
    }
    e.push(new Promise((s) => this.#f(
      { fn: t.sBkFn, face: t.sBkFace, left: t.x, top: t.y, alpha: t.alpha, blendmode: I.getNum2Blendmode(t.blendMode), rotation: t.rotation, scale_x: t.scale_x, scale_y: t.scale_y },
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
const X = "、。，．）］｝〉」』】〕”〟ぁぃぅぇぉっゃゅょゎァィゥェォッャュョヮヵヶ！？!?‼⁉・ーゝゞヽヾ々", it = "［（｛〈「『【〔“〝", nt = "─‥…", ot = X, St = new RegExp(`[${X}]`), Ft = new RegExp(`[${it}]`), Qt = new RegExp(`[${nt}]`), Pt = St;
class Et {
  #i = X;
  #e = it;
  #n = nt;
  #l = ot;
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
  #t = St;
  #r = Ft;
  #d = Qt;
  #f = Pt;
  break_fixed = !1;
  break_fixed_left = 0;
  break_fixed_top = 0;
  bura = !1;
  lay(t) {
    t.kinsoku_sol && (this.#i = t.kinsoku_sol, this.#t = new RegExp(`[${this.#i}]`)), t.kinsoku_eol && (this.#e = t.kinsoku_eol, this.#h(), this.#r = new RegExp(`[${this.#e}]`)), t.kinsoku_dns && (this.#n = t.kinsoku_dns, this.#s(), this.#d = new RegExp(`[${this.#n}]`)), t.kinsoku_bura && (this.#l = t.kinsoku_bura, this.#h(), this.#s(), this.#f = new RegExp(`[${this.#l}]`)), "bura" in t && (this.bura = q(t, "bura", !1)), this.break_fixed = q(t, "break_fixed", this.break_fixed), this.break_fixed_left = S(t, "break_fixed_left", this.break_fixed_left), this.break_fixed_top = S(t, "break_fixed_top", this.break_fixed_top);
  }
  // 禁則の競合（ぶら下げ と 行末禁則 の両方に含まれる文字があってはならない）
  #h() {
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
  #s() {
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
    t.#k(this.#i, this.#e, this.#n, this.#l), t.break_fixed = this.break_fixed, t.break_fixed_left = this.break_fixed_left, t.break_fixed_top = this.break_fixed_top, t.bura = this.bura;
  }
  #k(t, e, s, i) {
    this.#i != t && (this.#i = t, this.#t = new RegExp(`[${t}]`)), this.#e != e && (this.#e = e, this.#r = new RegExp(`[${e}]`)), this.#n != s && (this.#n = s, this.#d = new RegExp(`[${s}]`)), this.#l != i && (this.#l = i, this.#f = new RegExp(`[${i}]`));
  }
  record() {
    const t = {
      break_fixed: this.break_fixed,
      break_fixed_left: this.break_fixed_left,
      break_fixed_top: this.break_fixed_top,
      bura: this.bura
    };
    return this.#i === X && (t.行頭禁則 = this.#i), this.#e === it && (t.行末禁則 = this.#e), this.#n === nt && (t.分割禁止 = this.#n), this.#l === ot && (t.ぶら下げ = this.#l), t;
  }
  playback(t) {
    t && (this.#k(
      t.行頭禁則 ?? X,
      t.行末禁則 ?? it,
      t.分割禁止 ?? nt,
      t.ぶら下げ ?? ot
    ), this.break_fixed = t.break_fixed, this.break_fixed_left = t.break_fixed_left, this.break_fixed_top = t.break_fixed_top, this.bura = t.bura);
  }
  hyph(t, e, s, i, n) {
    let l, a = 0, c = 2, p = (f) => (p = () => !1, i === f ? (i > 0 && (t.innerHTML = n.replaceAll('class="sn_ch"', 'class="sn_ch sn_ch_in_default"')), !0) : f < 2);
    do {
      if (l = this.#p(t, e), a = l.length, p(a)) break;
      let f = -1 / 0;
      for (; c < a; ++c) {
        const { elm: h, rect: y, ch: d } = l[c];
        if (h.tagName === "RT") continue;
        const o = s ? y.y : y.x;
        if (f <= o || h.previousElementSibling?.tagName === "SPAN" && h.previousElementSibling?.innerHTML.includes("<br>") || h.parentElement?.previousElementSibling?.tagName === "SPAN" && h.parentElement?.previousElementSibling?.innerHTML.includes("<br>")) {
          f = o, this.break_fixed || (this.break_fixed_left = y.x, this.break_fixed_top = y.y);
          continue;
        }
        const u = this.#o(l, c), { elm: r, rect: k, ch: m } = l[u];
        if (!this.break_fixed) {
          this.break_fixed_left = k.x, this.break_fixed_top = k.y;
          const x = globalThis.getComputedStyle(r), R = parseFloat(x.fontSize);
          s ? this.break_fixed_top += R : this.break_fixed_left += R;
        }
        f = -1 / 0;
        const C = c, { cont: A, ins: w } = this.bura ? this.hyph_alg_bura(l, u, m, c) : this.hyph_alg(l, u, m, c, d);
        if (c = w, A) continue;
        const T = l[c].elm, j = T.parentElement, g = document.createElement("br");
        if (j.classList.contains("sn_tx")) j.insertBefore(g, T);
        else {
          const x = j.parentElement;
          x.classList.contains("sn_ch") ? x.parentElement.insertBefore(g, x) : x.insertBefore(g, j);
        }
        c += 2, c < C && (c = C), a = -1;
        break;
      }
    } while (a < 0);
    return [l, a];
  }
  // 一つ前の要素を探す（ルビ対応）
  #o(t, e) {
    const s = e - 1, { elm: i } = t[s];
    return i.tagName !== "RT" ? s - (i.style.textCombineUpright === "all" ? Array.from(i.textContent ?? "").length - 1 : 0) : s - Array.from(i.textContent ?? "").length;
  }
  #p(t, e) {
    const s = [];
    if (t.nodeType !== t.TEXT_NODE) return Array.from(t.childNodes).map((a) => this.#p(a, e)).flat();
    const i = t.ownerDocument.createRange();
    i.selectNodeContents(t);
    let n = 0;
    const l = i.endOffset;
    for (; n < l; ) {
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
    if (!this.#r.test(s)) {
      if (this.#t.test(n))
        for (; (i = this.#o(t, i)) >= 0 && this.#t.test(t[i].ch); )
          ;
      else if (!(s === n && this.#d.test(s))) return { cont: !0, ins: i + 1 };
    }
    for (i = e; (i = this.#o(t, i)) >= 0 && this.#r.test(t[i].ch); )
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
    const n = this.#o(t, e), { ch: l } = t[n];
    if (this.#f.test(l) || this.#t.test(l)) {
      let c = e;
      (this.#f.test(s) || this.#t.test(s)) && ++c;
      const p = this.#o(t, c), { ch: f } = t[p], { ch: h } = t[c];
      if (f === h && this.#d.test(h)) return { cont: !1, ins: p };
      if (!this.#r.test(f)) return { cont: !1, ins: c };
      c = p;
      do
        if (!this.#r.test(t[c].ch)) break;
      while ((c = this.#o(t, c)) >= 0);
      return { cont: !1, ins: c + 1 };
    }
    const a = this.#o(t, n);
    if (i >= 3) {
      const { ch: c } = t[a];
      if (this.#d.test(l) && c === l)
        return { cont: !1, ins: a };
      if (this.#r.test(c)) {
        let p = a;
        for (; (p = this.#o(t, p)) >= 0 && this.#r.test(t[p].ch); )
          ;
        return { cont: !1, ins: p + 1 };
      }
    }
    return { cont: !1, ins: n };
  }
}
class U extends Z {
  constructor(t, e, s) {
    super(), this.ctn = t, this.canFocus = e, this.sys = s, this.#t.classList.add("sn_tx"), this.#t.style.position = "absolute", U.#e.view.parentElement.appendChild(this.#t), this.addChild(this.#r), this.addChild(this.#d), this.#d.name = "grpDbgMasume", this.noticeCompTxt = s.isApp && U.#i.oCfg.debug.dumpHtm ? () => {
      mt.noticeCompTxt();
      const i = this.#t.innerHTML;
      if (i === "") return;
      const { fn: n, ln: l } = U.#l.nowScrFnLn(), a = `dumpHtm ${t.name.slice(0, -7).replaceAll(":", "=")}(fn=${n} line=${l})`;
      s.outputFile(
        s.path_downloads + a + ".htm",
        `<!doctype html><html><head><meta charset=utf-8><title>${a}</title>
<h1>${a}</h1>${i.replaceAll(/ class="sn_ch"|animation-delay: \d+ms; ?| data-add="{&quot;ch_in_style&quot;:&quot;default&quot;, &quot;ch_out_style&quot;:&quot;default&quot;}"/g, "").replaceAll(' style=""', "").replaceAll(/(<\/?ruby>)/g, `
$1
`).replaceAll(/<(br|\/span)>/g, `<$1>
`)}`
      );
    } : () => mt.noticeCompTxt();
  }
  static #i;
  static #e;
  static init(t, e) {
    U.#i = t, U.#e = e;
  }
  static #n;
  static #l;
  static setEvtMng(t, e) {
    U.#n = t, U.#l = e;
  }
  static destroy() {
    U.#x = /* @__PURE__ */ Object.create(null), U.#B = /* @__PURE__ */ Object.create(null), U.delBreak();
  }
  #t = document.createElement("span");
  // サンプリング元
  #r = new Z();
  // サンプリング先
  #d = new P();
  static #f = {
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
  #h = new Et();
  noticeCompTxt = () => {
  };
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
          const l = s.style[n];
          if (l in U.#f) {
            _.myTrace(`${l}は指定できません`, "W");
            continue;
          }
          e[l] = s.style[l];
        }
        !s.style.opacity && "alpha" in t && (e.opacity = String(this.ctn.alpha));
      } else this.#t.style.cssText = "";
    else "alpha" in t && (e.opacity = String(this.ctn.alpha));
    if ("width" in t && (e.width = (t.width ?? "0") + "px"), "height" in t && (e.height = (t.height ?? "0") + "px"), "pl" in t && (e.paddingLeft = (t.pl ?? "0") + "px"), "pr" in t && (e.paddingRight = (t.pr ?? "0") + "px"), "pt" in t && (e.paddingTop = (t.pt ?? "0") + "px"), "pb" in t && (e.paddingBottom = (t.pb ?? "0") + "px"), this.#h.lay(t), this.#o(), this.#p = this.ctn.position.x, e.transformOrigin = `${this.ctn.pivot.x}px ${this.ctn.pivot.y}px`, this.cvsResize(), e.display = this.ctn.visible ? "inline" : "none", ":redraw" in t && this.#a > 0) {
      const s = [
        this.#t.innerHTML.replaceAll(/(animation-delay: )\d+ms/g, "$10ms"),
        `<span class='sn_ch' data-add='{"ch_in_style":"default"}'>&emsp;</span>`
      ];
      this.#m(), this.goTxt(s, !0);
    }
  }
  #k = 0;
  // 「g」などで下が欠ける問題対策
  #o() {
    const t = this.#t.style, e = parseFloat(t.fontSize || "0");
    this.#s.fontsize = e, this.#s.pad_left = parseFloat(t.paddingLeft || "0"), this.#s.pad_right = parseFloat(t.paddingRight || "0"), this.#s.pad_top = parseFloat(t.paddingTop || "0"), this.#s.pad_bottom = parseFloat(t.paddingBottom || "0"), this.#s.$width = parseFloat(t.width || "0"), this.#s.$height = parseFloat(t.height || "0"), this.position.set(this.#s.pad_left, this.#s.pad_top), this.#u = t.writingMode === "vertical-rl", this.#y = 0, this.#b = 0;
    const s = t.lineHeight ?? "0";
    this.#k = this.#u ? 0 : (s.endsWith("px") ? parseFloat(s) : e * parseFloat(s) - e) / 2;
  }
  cvsResize() {
    const t = this.#t.style, e = this.sys.cvsScale;
    t.left = `${this.sys.ofsLeft4elm + this.#p * e}px`, t.top = `${this.sys.ofsTop4elm + this.ctn.position.y * e}px`, t.transform = `rotate(${this.ctn.angle}deg) scale(${this.ctn.scale.x * e}, ${this.ctn.scale.y * e})`;
  }
  #p = 0;
  #u = !1;
  get tategaki() {
    return this.#u;
  }
  #y = 0;
  #b = 0;
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
  #c(t, e = !0) {
    const s = {
      escape: (u) => u.replaceAll(/([.*+?^${}()|\[\]\/\\])/g, "\\$1"),
      mimeType: (u) => {
        const r = c(u).toLowerCase();
        return i()[r] || "";
      },
      dataAsUrl: y,
      isDataUrl: p,
      resolveUrl: f,
      getAndEncode: h,
      asArray: (u) => {
        const r = [], k = u.length;
        for (let m = 0; m < k; ++m) r.push(u[m]);
        return r;
      }
    };
    function i() {
      const u = "application/font-woff", r = "image/jpeg";
      return {
        woff: u,
        woff2: u,
        ttf: "application/font-truetype",
        eot: "application/vnd.ms-fontobject",
        png: "image/png",
        jpg: r,
        jpeg: r,
        gif: "image/gif",
        tiff: "image/tiff",
        svg: "image/svg+xml"
      };
    }
    const n = d(), l = o();
    function a(u) {
      return l.resolveAll().then((r) => {
        const k = document.createElement("style");
        return u.appendChild(k), k.appendChild(document.createTextNode(r)), u;
      });
    }
    function c(u) {
      return /\.([^\.\/]*?)$/g.exec(u)?.[1] ?? "";
    }
    function p(u) {
      return u.search(/^(data:)/) !== -1;
    }
    function f(u, r) {
      const k = document.implementation.createHTMLDocument(), m = k.createElement("base");
      k.head.appendChild(m);
      const C = k.createElement("a");
      return k.body.appendChild(C), m.href = r, C.href = u, C.href;
    }
    function h(u) {
      let r = 3e4;
      return new Promise(function(k) {
        const m = new XMLHttpRequest();
        m.onreadystatechange = C, m.ontimeout = A, m.responseType = "blob", m.timeout = r, m.open("GET", u, !0), m.send();
        function C() {
          if (m.readyState !== 4) return;
          if (m.status !== 200) {
            w("cannot fetch resource: " + u + ", status: " + m.status);
            return;
          }
          const T = new FileReader();
          T.onloadend = function() {
            const j = T.result.toString().split(/,/)[1];
            k(j);
          }, T.readAsDataURL(m.response);
        }
        function A() {
          w("timeout of " + r + "ms occured while fetching resource: " + u);
        }
        function w(T) {
          console.error(T), k("");
        }
      });
    }
    function y(u, r) {
      return "data:" + r + ";base64," + u;
    }
    function d() {
      const u = /url\(['"]?([^'"]+?)['"]?\)/g;
      return {
        inlineAll: C,
        shouldProcess: r
      };
      function r(A) {
        return A.search(u) !== -1;
      }
      function k(A) {
        const w = [];
        let T;
        for (; T = u.exec(A); )
          w.push(T[1]);
        return w.filter(function(j) {
          return !s.isDataUrl(j);
        });
      }
      function m(A, w, T, j) {
        return Promise.resolve(w).then((x) => T ? s.resolveUrl(x, T) : x).then(j || s.getAndEncode).then((x) => s.dataAsUrl(x, s.mimeType(w))).then((x) => A.replace(g(w), "$1" + x + "$3"));
        function g(x) {
          return new RegExp(`(url\\(['"]?)(` + s.escape(x) + `)(['"]?\\))`, "g");
        }
      }
      function C(A, w, T) {
        if (j()) return Promise.resolve(A);
        return Promise.resolve(A).then(k).then((g) => {
          let x = Promise.resolve(A);
          for (const R of g) x = x.then((at) => m(at, R, w, T));
          return x;
        });
        function j() {
          return !r(A);
        }
      }
    }
    function o() {
      return {
        resolveAll: u,
        impl: { readAll: r }
      };
      function u() {
        return r().then((k) => Promise.allSettled(
          k.map((m) => m.resolve())
        )).then((k) => k.join(`
`));
      }
      function r() {
        return Promise.resolve(s.asArray(document.styleSheets)).then(m).then(k).then((A) => A.map(C));
        function k(A) {
          return A.filter((w) => w.type === CSSRule.FONT_FACE_RULE).filter((w) => n.shouldProcess(w.style.getPropertyValue("src")));
        }
        function m(A) {
          const w = [];
          for (const T of A)
            try {
              if (T.href) continue;
              s.asArray(T.cssRules || []).forEach(w.push.bind(w));
            } catch (j) {
              console.error("Error while reading CSS rules from " + T.href, String(j));
            }
          return w;
        }
        function C(A) {
          return {
            resolve: function() {
              const T = (A.parentStyleSheet || {}).href;
              return n.inlineAll(A.cssText, T);
            },
            src: function() {
              return A.style.getPropertyValue("src");
            }
          };
        }
      }
    }
    Promise.resolve(this.#t).then((u) => {
      const r = u.cloneNode(!0);
      return r.style.padding = "0px", r.style.paddingRight = this.#y + "px", r.style.paddingTop = this.#b + "px", r.style.left = "0px", r.style.top = "0px", r.style.width = this.#s.$width - this.#s.pad_left - this.#s.pad_right + "px", r.style.height = this.#s.$height - this.#s.pad_top - this.#s.pad_bottom + "px", this.#t.hidden = e, r;
    }).then(a).then((u) => {
      u.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
      const r = new Image();
      return r.src = `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="${this.#s.$width}px" height="${this.#s.$height}px"><foreignObject x="0" y="0" width="100%" height="100%">${new XMLSerializer().serializeToString(u).replaceAll("#", "%23").replaceAll(`
`, "%0A")}</foreignObject></svg>`, new Promise((k) => r.onload = () => k(r));
    }).then((u) => new Promise((r) => setTimeout(() => r(u), 100))).then((u) => {
      const r = document.createElement("canvas");
      r.width = this.#s.$width, r.height = this.#s.$height, r.getContext("2d").drawImage(u, 0, 0), t(Q.from(r));
    }).catch((u) => _.myTrace(`goTxt() = ${u}`));
  }
  #q = void 0;
  // 文字にかけるフィルター
  #O = [];
  #K = [];
  #a = 0;
  static #C = "<span class='sn_ch sn_ch_last'>&emsp;</span>";
  goTxt(t, e) {
    U.#F.visible = !1;
    let s = this.#K.length, i = "";
    if (s === 0) {
      if (U.#i.oCfg.debug.masume && (V.debugLog && console.log(`🍌 masume ${this.name} v:${this.visible} l:${this.x} t:${this.y} a:${this.alpha} pl:${this.#s.pad_left} pr:${this.#s.pad_right} pt:${this.#s.pad_top} pb:${this.#s.pad_bottom} w:${this.#s.$width} h:${this.#s.$height}`), this.#d.clear().beginFill(3407616, 0.2).lineStyle(1, 3407616, 1).drawRect(-this.#s.pad_left, -this.#s.pad_top, this.#s.$width, this.#s.$height).endFill().beginFill(13311, 0.2).lineStyle(2, 13311, 1).drawRect(
        0,
        0,
        this.#s.$width - this.#s.pad_left - this.#s.pad_right,
        this.#s.$height - this.#s.pad_top - this.#s.pad_bottom
      ).endFill()), this.#t.innerHTML = [...t].join("").replaceAll(/[\n\t]/g, "") + U.#C, !this.#h.break_fixed) {
        const k = globalThis.getComputedStyle(this.#t), m = parseFloat(k.fontSize);
        this.#u ? (this.#h.break_fixed_left = (this.#s.$width - this.#s.pad_left - this.#s.pad_right - m * 1.5) * this.sys.cvsScale, this.#h.break_fixed_top = 0) : (this.#h.break_fixed_left = 0, this.#h.break_fixed_top = m / 2 * this.sys.cvsScale);
      }
    } else
      i = this.#t.innerHTML, --s, this.#t.querySelector(".sn_ch_last")?.remove(), this.#t.querySelectorAll(":scope > br").forEach((k) => k.remove()), this.#t.insertAdjacentHTML(
        "beforeend",
        t.slice(this.#a).join("").replaceAll(/[\n\t]/g, "") + U.#C
        // 末尾改行削除挙動対策
      );
    this.#t.querySelectorAll(".sn_ch:has(> ruby)").forEach((k) => k.style.background = ""), this.#a = t.length;
    const n = this.sys.cvsScale, l = this.#t.getBoundingClientRect(), a = l.left + this.#s.pad_left, c = l.top + this.#s.pad_top;
    let p;
    if (n === 1) p = (k, m) => {
      const C = k.getBoundingClientRect();
      return new W(
        C.left - a,
        C.top - c,
        C.width,
        C.height + ("gjqy".includes(m) ? this.#k : 0)
      );
    };
    else {
      const k = this.sys.ofsPadLeft_Dom2PIXI + l.left * (1 - n), m = this.sys.ofsPadTop_Dom2PIXI + l.top * (1 - n);
      p = (C, A) => {
        const w = C.getBoundingClientRect();
        return new W(
          (w.left - k) / n - a,
          (w.top - m) / n - c,
          w.width / n,
          (w.height + ("gjqy".includes(A) ? this.#k : 0)) / n
        );
      };
    }
    const [f, h] = this.#h.hyph(this.#t, p, this.#u, s, i);
    this.#K = f;
    const y = V.debugLog ? ({ ch: k }, { x: m, y: C, width: A, height: w }) => console.log(`🍌 masume ch:${k} x:${m} y:${C} w:${A} h:${w}`) : () => {
    }, d = U.#i.oCfg.debug.masume ? (k, m) => {
      y(k, m), this.#d.beginFill(6737151, 0.5).lineStyle(2, 16724736, 1).drawRect(m.x, m.y, m.width, m.height).endFill();
    } : () => {
    }, o = N.ease(this.#T);
    for (let k = s; k < h; ++k) {
      const m = this.#K[k], C = m.rect, A = JSON.parse(m.elm.dataset.arg ?? '{"delay": 0}'), w = JSON.parse(m.elm.dataset.add ?? "{}"), T = U.#x[w.ch_in_style];
      if (d(m, C), m.elm.dataset.cmd === "grp") {
        const j = new Z();
        this.#r.addChild(j), new b(A.pic, j, (g) => {
          this.#E(j, A, w, C, o, T ?? {}), j.parent || j.removeChild(g);
        });
      }
      if (m.elm.dataset.lnk) {
        const j = m.elm.parentElement.closest("[data-arg]"), g = JSON.parse(j.dataset.arg ?? "{}");
        g.key = `lnk=[${k}] ` + this.name;
        const x = new J();
        this.#E(x, g, w, C, o, T ?? {});
        const R = g.style ?? "", at = R + (g.style_hover ?? ""), Ut = R + (g.style_clicked ?? ""), $ = g.r_style ?? "", At = $ + (g.r_style_hover ?? ""), Ot = $ + (g.r_style_clicked ?? ""), dt = Array.from(j.getElementsByTagName("rt"));
        for (const et of dt) et.dataset.st_r_bk = et.style.cssText;
        const Ct = j.style.cssText, tt = (et, Tt) => {
          j.style.cssText = Ct + et;
          for (const ut of dt) ut.style.cssText = ut.dataset.st_r_bk + Tt;
        };
        q(g, "enabled", !0) ? U.#n.button(
          g,
          x,
          () => tt(R, $),
          () => this.canFocus() ? (tt(at, At), !0) : !1,
          () => tt(Ut, Ot)
        ) : tt(
          R + (g.style_disable ?? "color: gray;"),
          $ + (g.r_style_disable ?? "color: gray;")
        ), this.#r.addChild(x);
      }
    }
    const u = Array.from(this.#t.getElementsByClassName("sn_ch"));
    this.#U = () => {
      this.#U = () => !1;
      for (const k of u) k.className = k.className.replaceAll(/ go_ch_in_[^\s"]+/g, "");
      return U.#F.position.set(
        this.#h.break_fixed_left,
        this.#h.break_fixed_top
      ), U.#F.visible = !0, this.noticeCompTxt(), !0;
    };
    for (const k of u) k.className = k.className.replaceAll(/sn_ch_in_([^\s"]+)/g, "go_ch_in_$1");
    s > 0 && ++s;
    let r;
    for (let k = h - 2; k >= 0; --k) {
      const { elm: m } = this.#K[k];
      if (m.tagName === "SPAN") {
        r = m.parentElement?.tagName === "RUBY" ? m.parentElement.parentElement ?? m : m;
        break;
      }
    }
    if (!r || e || s === h) {
      this.#U();
      return;
    }
    r.addEventListener("animationend", () => this.#U(), { once: !0, passive: !0 });
  }
  #U = () => !1;
  #E(t, e, s, i, n, l) {
    t.alpha = 0, e.x && (i.x = e.x.startsWith("=") ? i.x + parseInt(e.x.slice(1)) : parseInt(e.x)), e.y && (i.y = e.y.startsWith("=") ? i.y + parseInt(e.y.slice(1)) : parseInt(e.y)), e.width && (i.width = parseInt(e.width)), e.height && (i.height = parseInt(e.height)), e.wait && (l.wait = parseInt(e.wait)), t.width = i.width, t.height = i.height, l.x ? t.position.set(
      l.x.startsWith("=") ? i.x + t.width * l.nx : l.nx,
      l.y.startsWith("=") ? i.y + t.height * l.ny : l.ny
    ) : t.position.set(i.x, i.y);
    const a = {
      sp: t,
      tw: new Zt(t).to({ alpha: 1, x: i.x, y: i.y, width: i.width, height: i.height, angle: 0 }, l.wait ?? 0).easing(n).delay((s.wait ?? 0) + (e.delay ?? 0)).onComplete(() => {
        a.tw = void 0;
      }).start()
    };
    this.#O.push(a);
  }
  skipChIn() {
    let t = this.#U();
    for (const e of this.#O)
      e.tw && (e.tw.stop().end(), t = !0);
    return this.#O = [], t;
  }
  static #x = /* @__PURE__ */ Object.create(null);
  static #H = /[\s\.,]/;
  static initChStyle() {
    U.#x = /* @__PURE__ */ Object.create(null), U.#B = /* @__PURE__ */ Object.create(null);
  }
  static getChInStyle(t) {
    return U.#x[t];
  }
  static ch_in_style(t) {
    const { name: e } = t;
    if (!e) throw "nameは必須です";
    if (U.#H.test(e)) throw `name【${e}】に使えない文字が含まれます`;
    if (e in U.#x) throw `name【${e}】はすでにあります`;
    const s = String(t.x ?? "=0"), i = String(t.y ?? "=0");
    return U.#x[e] = {
      wait: S(t, "wait", 500),
      // アニメ・FI時間
      alpha: S(t, "alpha", 0),
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
      scale_x: S(t, "scale_x", 1),
      scale_y: S(t, "scale_y", 1),
      rotate: S(t, "rotate", 0),
      join: q(t, "join", !0),
      // 文字を順番に出すか（true）同時か（false）
      ease: t.ease ?? "ease-out"
    };
  }
  static #B = /* @__PURE__ */ Object.create(null);
  static getChOutStyle(t) {
    return U.#B[t];
  }
  static ch_out_style(t) {
    const { name: e } = t;
    if (!e) throw "nameは必須です";
    if (U.#H.test(e)) throw `name【${e}】に使えない文字が含まれます`;
    if (e in U.#B) throw `name【${e}】はすでにあります`;
    const s = String(t.x ?? "=0"), i = String(t.y ?? "=0");
    return U.#B[e] = {
      wait: S(t, "wait", 500),
      // アニメ・FI時間
      alpha: S(t, "alpha", 0),
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
      scale_x: S(t, "scale_x", 1),
      scale_y: S(t, "scale_y", 1),
      rotate: S(t, "rotate", 0),
      join: q(t, "join", !1),
      // 文字を順番に出すか（true）同時か（false）
      ease: t.ease ?? "ease-out"
    };
  }
  static #F = new Z();
  static #Q = new b();
  dispBreak(t) {
    U.delBreak();
    const e = U.#F;
    e.visible = !1, this.addChild(e), U.#Q.destroy(), U.#Q = new b(t.pic, e, (s) => {
      e.parent ? (s.x = S(t, "x", 0), s.y = S(t, "y", 0), s.width = S(t, "width", this.#s.fontsize), s.height = S(t, "height", this.#s.fontsize)) : e.removeChild(s);
    });
  }
  static delBreak() {
    const t = U.#F;
    t.parent?.removeChild(t), U.#Q.destroy();
  }
  #T = "Quadratic.Out";
  #V = "Quadratic.Out";
  #m() {
    this.#d.clear(), this.#K = [], this.#a = 0, this.skipChIn();
    const t = this.#t.cloneNode(!0);
    t.textContent = "";
    const e = this.#t;
    e.parentElement.insertBefore(t, e);
    let s = 0;
    e.querySelectorAll("span.sn_ch").forEach((n) => {
      const l = JSON.parse(
        n?.dataset.add ?? // 通常文字
        n?.children[0]?.getAttribute("data-add") ?? // ルビ
        n?.children[0]?.children[0]?.getAttribute("data-add") ?? "{}"
        // 縦中横
      );
      if (!l.ch_out_style) return;
      const a = U.#B[l.ch_out_style];
      if (a) {
        if (a.wait === 0) {
          n.style.display = "none";
          return;
        }
        s += a.wait, a.join || (n.style.animationDelay = "0ms"), n.classList.add(`go_ch_out_${l.ch_out_style}`);
      }
    });
    const i = () => {
      e.parentElement.removeChild(e);
      for (const n of this.#r.removeChildren())
        n instanceof Z && U.#n.unButton(n), n.destroy();
    };
    s === 0 ? (this.#t.textContent = "", i()) : e.lastElementChild?.addEventListener("animationend", i, { once: !0, passive: !0 }), this.#t = t;
  }
  reNew() {
    this.#m();
    const t = new U(this.ctn, () => this.canFocus(), this.sys);
    return t.#s = this.#s, t.#t.style.cssText = this.#t.style.cssText, t.#p = this.#p, t.name = this.name, t.#o(), t.#q = this.#q, t.#T = this.#T, t.#V = this.#V, this.#h.reNew(t.#h), this.destroy(), t;
  }
  record() {
    return {
      infTL: this.#s,
      cssText: this.#t.style.cssText,
      left: this.#p,
      //		idc_hArg	: this.#idc.gethArg(),
      ch_filter: this.#q,
      fi_easing: this.#T,
      fo_easing: this.#V,
      hyph: this.#h.record()
    };
  }
  playback(t) {
    this.#s = t.infTL, this.position.set(this.#s.pad_left, this.#s.pad_top), this.#t.style.cssText = t.cssText, this.#p = t.left, this.#o(), this.#q = t.ch_filter, this.#T = t.fi_easing, this.#V = t.fo_easing, this.#h.playback(t.hyph);
  }
  get cssText() {
    return this.#t.style.cssText;
  }
  set cssText(t) {
    this.#t.style.cssText = t;
  }
  #A = void 0;
  snapshot(t, e) {
    this.#c((s) => {
      this.#A = J.from(s), this.#u && (this.#A.x += V.stageW - (this.#p + this.#s.$width)), this.#A.y -= this.#b, this.#A.texture.frame = new W(
        0,
        0,
        Math.min(this.#A.width, this.#s.$width - this.#p),
        Math.min(this.#A.height, this.#s.$height)
      ), this.#r.addChild(this.#A), t.render(this.#A, { clear: !1 }), e();
    }, !1);
  }
  snapshot_end() {
    this.#A && (this.#r.removeChild(this.#A), this.#A = void 0);
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
    U.delBreak(), this.#t.parentElement.removeChild(this.#t), this.removeChild(this.#r), this.removeChild(this.#d), super.destroy();
  }
}
class H extends Z {
  constructor(t, e, s, i) {
    if (super(), this.hArg = t, this.evtMng = e, this.resolve = s, this.canFocus = i, this.#t = {
      type: "pic",
      enabled: q(t, "enabled", !0),
      x: this.x = v(t.left ?? 0),
      y: this.y = v(t.top ?? 0),
      rotation: this.angle = S(t, "rotation", this.angle),
      // flash : rotation is in degrees.
      // pixijs: rotation is in radians, angle is in degrees.
      pivot_x: this.pivot.x = S(t, "pivot_x", this.pivot.x),
      pivot_y: this.pivot.y = S(t, "pivot_y", this.pivot.y),
      scale_x: this.scale.x = S(t, "scale_x", this.scale.x),
      scale_y: this.scale.y = S(t, "scale_y", this.scale.y),
      alpha: 1,
      text: "",
      b_pic: "",
      width: 0,
      height: 0
    }, this.getBtnBounds = () => (this.#n.x = this.#t.x, this.#n.y = this.#t.y, this.#n), this.#t.enabled && e.button(t, this, () => this.normal(), () => this.#d(), () => this.#f()), t.pic) {
      this.#t.type = "pic", this.#l = new b(
        t.pic,
        this,
        (h) => {
          this.#h(h), this.#n.width = h.width * this.#t.scale_x, this.#n.height = h.height * this.#t.scale_y;
        },
        (h) => s
      );
      return;
    }
    if (!t.text) throw "textまたはpic属性は必須です";
    const n = S(t, "height", 30), l = new qt({
      align: "center",
      dropShadow: !0,
      dropShadowAlpha: 0.7,
      dropShadowColor: "white",
      dropShadowBlur: 7,
      dropShadowDistance: 0,
      fill: this.#t.enabled ? "black" : "gray",
      fontFamily: H.fontFamily,
      fontSize: n,
      padding: 5
    });
    if (t.style) try {
      const h = JSON.parse(t.style);
      for (const [y, d] of Object.entries(h)) l[y] = d;
      this.#t = { ...this.#t, ...h };
    } catch (h) {
      throw h instanceof SyntaxError ? new Error(ct(t, "style", h.message)) : "fn:Button.ts style";
    }
    const a = new xt(t.text ?? "", l);
    a.alpha = S(t, "alpha", a.alpha), a.width = S(t, "width", 100), a.height = t.height = n, this.setText = (h) => a.text = h, this.#t = {
      ...this.#t,
      type: "text",
      // dump用
      alpha: a.alpha,
      text: a.text,
      width: a.width,
      height: a.height
    };
    let c = !1;
    if (this.#t.width = this.width, this.#t.height = this.height, t.b_pic && (this.#t.b_pic = t.b_pic, this.#l = new b(
      t.b_pic,
      this,
      (h) => {
        this.#r(h, a), this.#t.width = this.width, this.#t.height = this.height, a.name = JSON.stringify(this.#t);
      },
      (h) => {
        I.setBlendmode(this, t), h && s();
      }
    ), c = this.#l.ret), a.name = JSON.stringify(this.#t), this.addChild(a), this.#n.width = a.width, this.#n.height = a.height, t.b_pic || I.setBlendmode(this, t), H.#i(this, a), !this.#t.enabled) {
      c || s();
      return;
    }
    const p = l.clone();
    if (t.style_hover) try {
      const h = JSON.parse(t.style_hover);
      for (const [y, d] of Object.entries(h)) p[y] = d;
    } catch (h) {
      throw h instanceof SyntaxError ? new Error(ct(t, "style_hover", h.message)) : "fn:Button.ts style_hover";
    }
    else p.fill = "white";
    const f = p.clone();
    if (t.style_clicked) try {
      const h = JSON.parse(t.style_clicked);
      for (const [y, d] of Object.entries(h)) f[y] = d;
    } catch (h) {
      throw h instanceof SyntaxError ? new Error(ct(t, "style_clicked", h.message)) : "fn:Button.ts style_clicked";
    }
    else f.dropShadow = !1;
    this.normal = () => a.style = l, this.#d = () => i() ? (a.style = p, !0) : !1, this.#f = () => a.style = f, c || s();
  }
  static fontFamily = "'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif";
  static #i = (t, e) => {
  };
  static #e = (t, e, s, i) => {
  };
  static init(t) {
    t.oCfg.debug.masume && (H.#i = (e, s) => e.addChild(
      new P().beginFill(8926088, 0.2).lineStyle(1, 8926088, 1).drawRect(s.x, s.y, s.width, s.height).endFill()
    ), H.#e = (e, s, i, n) => e.addChild(
      new P().beginFill(8926088, 0.2).lineStyle(1, 8926088, 1).drawRect(s.x, s.y, i, n).endFill()
    ));
  }
  setText(t) {
  }
  getBtnBounds = () => this.#n;
  // 文字ボタンは背景画像を含まない位置指定なので、その当たり判定用
  #n = new W();
  #l = new b();
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
  #r(t, e) {
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
  #d = () => !1;
  #f = () => {
  };
  #h(t) {
    this.#t.alpha = t.alpha = S(this.hArg, "alpha", t.alpha);
    const e = t.width / 3, s = this.#t.enabled ? e : t.width, i = t.height, n = t.texture.baseTexture, l = new Q(n, new W(0, 0, e, i)), a = new Q(n, new W(e, 0, e, i)), c = new Q(n, new W(e * 2, 0, e, i)), p = () => t.texture = l;
    this.#t.enabled && p(), this.normal = p, this.#d = () => this.canFocus() ? (t.texture = c, !0) : !1, this.#f = () => t.texture = a, "width" in this.hArg ? (this.#t.width = v(this.hArg.width), this.scale.x *= this.#t.width / s) : this.#t.width = s, "height" in this.hArg ? (this.#t.height = v(this.hArg.height), this.scale.y *= this.#t.height / i) : this.#t.height = i, t.name = JSON.stringify(this.#t), H.#e(this, t, s, i);
  }
}
class K extends I {
  static #i;
  static #e;
  static #n;
  static #l;
  static init(t, e, s, i, n, l) {
    K.#i = t, U.init(t, l), K.#e = s, K.#l = i, K.#n = n, s.setDoRecProc(K.chgDoRec), e.autowc = (a) => K.#k(a), e.autowc({ enabled: !1, text: "", time: 0 }), e.ch_in_style = (a) => K.#t(a), e.ch_out_style = (a) => K.#r(a), U.initChStyle(), gt(), st(
      t.matchPath(".+", Y.FONT).flatMap((a) => Object.values(a).map((c) => `
@font-face {
	font-family: '${c}';
	src: url('${this.#i.searchPath(c, Y.FONT)}');
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
    ), K.#t({
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
    }), K.#r({
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
    const e = U.ch_in_style(t), s = e.x.startsWith("=") ? `${e.nx * 100}%` : `${e.nx}px`, i = e.y.startsWith("=") ? `${e.ny * 100}%` : `${e.ny}px`, { name: n } = t;
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
  static #r(t) {
    const e = U.ch_out_style(t), s = e.x.startsWith("=") ? `${e.nx * 100}%` : `${e.nx}px`, i = e.y.startsWith("=") ? `${e.ny * 100}%` : `${e.ny}px`, { name: n } = t;
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
  static #d;
  static #f;
  static setEvtMng(t, e, s) {
    K.#d = t, K.#f = e, U.setEvtMng(t, s);
  }
  // 文字ごとのウェイト
  static #h = !1;
  static #s = {};
  static #k(t) {
    K.#h = q(t, "enabled", K.#h), K.#e.setVal_Nochk("save", "const.sn.autowc.enabled", K.#h);
    const { text: e } = t;
    if ("text" in t != "time" in t) throw "[autowc] textとtimeは同時指定必須です";
    if (K.#e.setVal_Nochk("save", "const.sn.autowc.text", e), !e)
      return K.#e.setVal_Nochk("save", "const.sn.autowc.time", ""), !1;
    const s = e.length;
    if (K.#h && s === 0) throw '[autowc] enabled === false かつ text === "" は許されません';
    const i = String(t.time).split(",");
    if (i.length !== s) throw "[autowc] text文字数とtimeに記述された待ち時間（コンマ区切り）は同数にして下さい";
    K.#s = {};
    for (let n = 0; n < s; ++n) K.#s[e[n]] = v(i[n]);
    return K.#e.setVal_Nochk("save", "const.sn.autowc.time", t.time), !1;
  }
  // バック
  #o = 0;
  #p = 0;
  #u = !1;
  #y = void 0;
  #b = "";
  // 背景画像無し（＝単色塗り）
  // 文字表示
  #c = new U(this.ctn, () => this.canFocus(), K.#f);
  #q = new ht();
  #O = document.createElement("span");
  // cssチェック・保存用
  static #K = {
    "text-align": 0,
    "text-align-last": 0,
    height: 0,
    width: 0,
    "padding-left": 0,
    "padding-right": 0,
    "padding-top": 0,
    "padding-bottom": 0
  };
  #a = new Z();
  constructor() {
    super(), this.ctn.addChild(this.#c), this.#q.init(this.#Y), this.ctn.addChild(this.#a), this.#a.name = "cntBtn", this.lay({ style: `width: ${V.stageW}px; height: ${V.stageH}px; font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif; color: white; font-size: 24px; line-height: 1.5; padding: 16px;`, in_style: "default", out_style: "default", back_clear: "true" });
  }
  destroy() {
    this.#y && (this.ctn.removeChild(this.#y).destroy(), this.#y = void 0), K.#l.recPagebreak(), this.#c.destroy();
  }
  static destroy() {
    K.#h = !1, K.#s = {}, K.#S = (t) => t;
  }
  set name(t) {
    this.name_ = t, this.#c.name = t;
  }
  get name() {
    return this.name_;
  }
  // getは継承しないらしい
  cvsResize() {
    this.#c.cvsResize();
  }
  cvsResizeChildren() {
    for (const t of this.#a.children) t.cvsResize();
  }
  procSetX(t) {
    this.#c.lay({ x: t });
  }
  procSetY(t) {
    this.#c.lay({ y: t });
  }
  lay(t) {
    if (super.lay(t), I.setXY(this.ctn, t, this.ctn), t[":id_tag"] = this.name_.slice(0, -7), ht.setting(t), this.#Q(t), this.#c.lay(t), "r_align" in t && (this.#g = t.r_align ?? ""), this.#P = V.isSafari ? this.#c.tategaki ? (s, i) => `text-align: start; height: ${i}em; padding-top: ${s}; padding-bottom: ${s};` : (s, i) => `text-align: start; width: ${i}em; padding-left: ${s}; padding-right: ${s};` : this.#c.tategaki ? (s) => `text-align: justify; text-align-last: justify; padding-top: ${s}; padding-bottom: ${s};` : (s) => `text-align: justify; text-align-last: justify; padding-left: ${s}; padding-right: ${s};`, V.isFirefox && (this.#L = this.#$), "r_style" in t)
      if (t.r_style) {
        const s = document.createElement("span");
        s.style.cssText = t.r_style;
        const i = s.style.length, n = this.#O.style;
        for (let l = 0; l < i; ++l) {
          const a = s.style[l];
          if (a in K.#K) {
            _.myTrace(`${a}は指定できません`, "W");
            continue;
          }
          const c = s.style[a];
          c && (n[a] = c);
        }
      } else this.#O.style.cssText = "";
    if ("alpha" in t) for (const s of this.#a.children) s.alpha = this.ctn.alpha;
    this.#C(t), this.#x(t);
    const e = this.#F(t, (s) => {
      s && G();
    });
    return e && L(), e;
  }
  #C(t) {
    const { in_style: e } = t;
    if (!e) return;
    const s = U.getChInStyle(e);
    if (!s) throw `存在しないin_style【${e}】です`;
    this.#U = e, this.#E = s.join;
  }
  #U = "";
  #E = !0;
  get width() {
    return this.#c.getWidth;
  }
  get height() {
    return this.#c.getHeight;
  }
  #x(t) {
    const { out_style: e } = t;
    if (!e) return;
    if (!U.getChOutStyle(e)) throw `存在しないout_style【${e}】です`;
    this.#H = e;
  }
  #H = "";
  #B = new b();
  #F(t, e) {
    if ("back_clear" in t)
      return q(t, "back_clear", !1) && (this.#o = 0, this.#p = 0, this.#u = !1, this.#b = ""), e(!1), !1;
    this.#p = S(t, "b_alpha", this.#p), this.#u = q(t, "b_alpha_isfixed", this.#u);
    const s = (this.#u ? 1 : Number(K.#e.getVal("sys:TextLayer.Back.Alpha"))) * this.#p;
    if (t.b_pic) {
      if (this.#b !== t.b_pic)
        return this.#b = t.b_pic, this.#y && (this.ctn.removeChild(this.#y), this.#y.destroy()), this.#B = new b(this.#b, this.ctn, (i) => {
          this.#y = i, i.name = "back(pic)", i.visible = s > 0, i.alpha = s, this.#c.setMySize(i.width, i.height), this.ctn.setChildIndex(i, 0), e(!0);
        }), this.#B.ret;
    } else "b_color" in t && (this.#o = Kt(t, "b_color", 0), this.#y && (this.ctn.removeChild(this.#y), this.#y.destroy()), this.#b = "", this.ctn.addChildAt(
      (this.#y = new P()).beginFill(this.#o).lineStyle(void 0).drawRect(0, 0, this.#c.getWidth, this.#c.getHeight).endFill(),
      0
    ), this.#y.name = "back(color)");
    return this.#y && (this.#y.visible = s > 0, this.#y.alpha = s), e(!1), !1;
  }
  chgBackAlpha(t) {
    const e = this.#u ? this.#p : t * this.#p;
    this.#y instanceof P && (this.#y && (this.ctn.removeChild(this.#y), this.#y.destroy()), this.ctn.addChildAt(
      (this.#y = new P()).beginFill(this.#o).lineStyle(void 0).drawRect(0, 0, this.#c.getWidth, this.#c.getHeight).endFill(),
      0
    ), this.#y.name = "back(color)"), this.#y && (this.#y.visible = e > 0, this.#y.alpha = e);
  }
  #Q(t) {
    "noffs" in t && (this.#m = t.noffs ?? "", this.#A = new RegExp(`[　${this.#m}]`)), "ffs" in t && (this.#T ??= "", this.#V = this.#T === "" ? () => "" : (e) => this.#A.test(e) ? "" : ` font-feature-settings: ${this.#T};`);
  }
  #T = "";
  #V = (t) => "";
  #m = "";
  #A = /[　]/;
  // Safariが全体に「font-feature-settings」した後、特定文字の「font-feature-settings: initial;」を受け付けてくれないのでわざわざ一つずつ指定
  static chgDoRec(t) {
    K.#S = t ? (e) => e : (e) => `<span class='offrec'>${e}</span>`;
  }
  static #S = (t) => t;
  isCur = !1;
  #P = () => "";
  #L = (t, e, s, i = "") => {
    if (!s) return ` style='${i}'`;
    const n = t.length * 2;
    if (n - e.length < 0) return ` style='text-align: ${s}; ${i}'`;
    let l = "";
    switch (s) {
      case "justify":
        l = this.#P("0", n);
        break;
      case "121":
        l = this.#P(`calc(${(n - e.length) / (e.length * 2)}em)`, n);
        break;
      case "even":
        l = this.#P(`calc(${(n - e.length) / (e.length + 1)}em)`, n);
        break;
      case "1ruby":
        l = this.#P("1em", n);
        break;
      default:
        l = `text-align: ${s};`;
    }
    return ` style='${l} ${i}'`;
  };
  #g = "";
  #$(t, e, s, i = "") {
    if (!s) return ` style='${i}'`;
    const n = t.length * 2;
    if (n - e.length < 0) return ` style='text-align: ${s}; ${i}'`;
    let l = "";
    switch (s) {
      case "left":
        l = "ruby-align: start;";
        break;
      case "center":
        l = "ruby-align: center;";
        break;
      case "right":
        l = "ruby-align: start;";
        break;
      case "justify":
        l = "ruby-align: space-between;";
        break;
      case "121":
        l = "ruby-align: space-around;";
        break;
      case "even":
        const a = (n - e.length) / (e.length + 1);
        l = "ruby-align: space-between; " + (this.#c.tategaki ? `padding-top: ${a}em; padding-bottom: ${a}em;` : `padding-left: ${a}em; padding-right: ${a}em;`);
        break;
      case "1ruby":
        l = "ruby-align: space-between; " + (this.#c.tategaki ? "padding-top: 1em; padding-bottom: 1em;" : "padding-left: 1em; padding-right: 1em;");
        break;
      default:
        l = `text-align: ${s};`;
    }
    return ` style='${l} ${i}'`;
  }
  tagCh(t) {
    this.#q.putTxt(t);
  }
  #R = !1;
  #Y = (t, e) => {
    K.#i.oCfg.debug.putCh && console.log(`🖊 文字表示 text:\`${t}\`(${t.charCodeAt(0).toString(16)}) ruby:\`${e}\` name:\`${this.name_}\``);
    const s = e.split("｜");
    let i = "";
    const [n, ...l] = s, a = l.join("｜");
    switch (s.length) {
      case 1:
        if (this.#R = !0, t === `
`) {
          this.#N ? (this.#N = !1, i = "<ruby>&emsp;<rt>&emsp;</rt></ruby><br/>") : i = "<br/>";
          break;
        }
        this.#N && (this.#N = !1, e === "" && (e = "&emsp;")), i = this.#z(t, e, this.#g);
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
            this.#N = !1, this.#R = !0, i = this.#z(t, a, n);
            break;
          case "gotxt":
            this.#M(), this.#R ? (this.isCur && K.#l.recText(
              this.#j.join("").replace(/^<ruby>&emsp;<rt>&emsp;<\/rt><\/ruby>(<br\/>)+/, "").replaceAll(/style='(anim\S+ \S+?;\s*)+/g, "style='").replaceAll(/( style=''| data-(add|arg|cmd)='.+?'|\n+|\t+)/g, "").replaceAll(/class='sn_ch .+?'/g, "class='sn_ch'").replaceAll("display: none;", "").replaceAll("class='offrec'", "style='display: none;'")
              // 囲んだ領域は履歴で非表示
            ), this.#c.goTxt(this.#j, this.#I === 0), this.#R = !1, this.#I = 0) : this.isCur && this.#c.noticeCompTxt();
            return;
          // breakではない
          case "add":
            {
              const c = JSON.parse(a), { style: p = "", wait: f = null } = c, { cl: h, sty: y } = this.#v(!0, f);
              this.#j.push(`<span${h} style='${y} display: inline; ${p}'>`), delete c.style, this.#X(c);
            }
            return;
          // breakではない
          case "add_close":
            this.#j.push("</span>"), this.#M();
            return;
          // breakではない
          case "grp":
            this.#R = !0;
            {
              const c = JSON.parse(a);
              if (c.id ??= this.#j.length, c.id === "break") {
                this.#c.dispBreak(c);
                return;
              }
              this.#N = !1, c.delay = this.#I, c.r ??= "", c.style ??= "", c.r_style ??= "";
              const { cl: p, sty: f, lnk: h } = this.#v(!0, c.wait);
              i = `<span${p} style='${f} ${c.style}'><ruby><span data-cmd='grp' data-arg='${JSON.stringify(c)}'${h} style='${f} display: inline;'>&emsp;</span><rt${h}${this.#L(
                "　",
                c.r,
                this.#g,
                this.#O.style.cssText + (this.#w.at(-1)?.o.r_style ?? "") + c.r_style
              )}>${c.r}</rt></ruby></span>`;
            }
            break;
          case "tcy":
            this.#N = !1, this.#R = !0;
            {
              const { t: c, r: p = "", wait: f = null, style: h = "", r_style: y = "" } = JSON.parse(a);
              K.#e.doRecLog() && (this.#Z += t + (e ? `《${e}》` : ""), this.#W += c);
              const d = V.isSafari ? p.replaceAll(/[A-Za-z0-9]/g, (k) => String.fromCharCode(k.charCodeAt(0) + 65248)) : p, { cl: o, sty: u, lnk: r } = this.#v(!0, f);
              i = `<span${o} style='${u}${this.#V(c)} ${h}'><ruby><span${r} style='${u} display: inline; text-combine-upright: all;'>${c}</span><rt${r}${this.#L(
                c,
                d,
                this.#g,
                this.#O.style.cssText + (this.#w.at(-1)?.o.r_style ?? "") + y
              )}>${d}</rt></ruby></span>`;
            }
            break;
          case "del":
            U.delBreak();
            return;
          // breakではない
          case "span":
            this.#R = !0, this.#_(JSON.parse(a));
            return;
          // breakではない
          case "link":
            this.#R = !0;
            {
              const c = JSON.parse(a);
              c[":link"] = " data-lnk='@'";
              const { cl: p, sty: f, curpos: h } = this.#v(!1, c.wait);
              this.#j.push(`<span${p} style='${f} display: inline; ${c.style ?? ""}' ${h} data-arg='${a}'>`), delete c.style, this.#_(c);
            }
            return;
          // breakではない
          case "endlink":
            this.#R = !0, this.#j.push("</span>"), this.#M();
            return;
          // breakではない
          default:
            this.#R = !0, i = this.#z(t, e, this.#g);
        }
        break;
    }
    this.#j.push(K.#S(i));
  };
  #z(t, e, s) {
    const i = t === " " ? "&nbsp;" : t === "　" ? "&emsp;" : t;
    K.#e.doRecLog() && (this.#Z += i + (e ? `《${e}》` : ""), t !== " " && (this.#W += t));
    const { cl: n, sty: l, lnk: a } = this.#v(!0, null, t);
    return e ? `<span${n} style='${l} ${this.#V(t)}'><ruby>${// 文字個別に出現させるため以下にも ${cl} が必要
    Array.from(t).map((c, p) => `<span${n}${a} style='${p > 0 ? this.#v(!0, null, t).sty : l} display: inline;'>${c === " " ? "&nbsp;" : c === "　" ? "&emsp;" : c}</span>`).join("")}<rt${a}${this.#L(
      t,
      e,
      s,
      this.#O.style.cssText + (this.#w.at(-1)?.o.r_style ?? "")
    )}>${e}</rt></ruby></span>` : `<span${n} style='${l} ${this.#V(t)}'${a}>${i}</span>`;
  }
  #v(t, e, s = `
`) {
    const i = this.#E ? e ?? this.#w.at(0)?.o.wait ?? (K.#h ? K.#s[s.at(0) ?? ""] ?? 0 : E.msecChWait) : 0;
    K.#d.isSkipping ? this.#I = 0 : t && this.#E && (this.#I += Number(i));
    const n = `data-add='{"ch_in_style":"${this.#U}", "ch_out_style":"${this.#H}"}'`;
    return {
      cl: ` class='sn_ch sn_ch_in_${this.#U}'`,
      // TxtStage.goTxt()はこれ単位で文字出現させる
      sty: `animation-delay: ${this.#I}ms;${this.#w.at(-1)?.o.style ?? ""}`,
      // TxtStage.goTxt()はこれ単位で文字出現させる
      lnk: (this.#w.at(0)?.o[":link"] ?? "") + " " + n,
      curpos: n
    };
  }
  #I = 0;
  #N = !0;
  #j = [];
  #w = [];
  #X(t) {
    this.#w.push({
      o: t,
      r_align: this.#g,
      ch_in_style: this.#U,
      ch_out_style: this.#H
    }), "r_align" in t && (this.#g = t.r_align), this.#C(t), this.#x(t);
  }
  #M() {
    const t = this.#w.pop();
    t && (this.#g = t.r_align, this.#C({ in_style: t.ch_in_style }), this.#x({ out_style: t.ch_out_style }));
  }
  #_(t) {
    const e = this.#w.at(-1);
    if (!e) {
      this.#X(t);
      return;
    }
    e.o = { ...e.o, ...t }, !t.style && !t.r_style && (e.o.style = "", e.o.r_style = ""), "r_align" in t && (this.#g = t.r_align), this.#C(t), this.#x(t);
  }
  click = () => !this.ctn.interactiveChildren || !this.ctn.visible ? !1 : this.#c.skipChIn();
  clearText() {
    this.ctn.addChild(this.#c = this.#c.reNew()), this.#I = 0, this.#N = !0, this.#j = [], this.#Z = "", this.#W = "", K.#l.recPagebreak();
  }
  #Z = "";
  #W = "";
  get pageText() {
    return this.#Z.replace("《&emsp;》", "");
  }
  get pagePlainText() {
    return this.#W;
  }
  get enabled() {
    return this.ctn.interactiveChildren;
  }
  set enabled(t) {
    this.ctn.interactiveChildren = t;
  }
  addButton = (t) => new Promise((e) => {
    t.key = `btn=[${this.#a.children.length}] ` + this.name_, t[":id_tag"] = t.key.slice(0, -7), q(t, "hint_tate", this.#c.tategaki);
    const s = new H(t, K.#d, () => e(), () => this.canFocus());
    s.name = JSON.stringify(t).replaceAll('"', "'"), this.#a.addChild(s);
  });
  canFocus() {
    return (this.ctn.interactiveChildren ?? !1) && this.ctn.visible && K.#n(this);
  }
  clearLay(t) {
    super.clearLay(t), this.clearText();
    for (const e of this.#a.removeChildren()) e.destroy();
  }
  record = () => ({
    ...super.record(),
    enabled: this.enabled,
    r_cssText: this.#O.style.cssText,
    r_align: this.#g,
    // バック
    b_do: this.#y === void 0 ? void 0 : this.#y instanceof J ? "Sprite" : "Graphics",
    b_pic: this.#b,
    b_color: this.#o,
    b_alpha: this.#p,
    b_alpha_isfixed: this.#u,
    ffs: this.#T,
    txs: this.#c.record(),
    strNoFFS: this.#m,
    btns: this.#a.children.map((t) => t.name)
  });
  playback(t, e) {
    super.playback(t, e), this.enabled = t.enabled, this.#O.style.cssText = t.r_cssText, this.#g = t.r_align, this.cvsResize(), this.#Q(t), this.#c.playback(t.txs), this.#p = t.b_alpha, this.#u = t.b_alpha_isfixed, e = [
      e,
      new Promise((s) => {
        const i = t.b_do ? t.b_do === "Sprite" ? { b_pic: t.b_pic } : { b_color: t.b_color } : { b_pic: "" };
        i.b_alpha = t.b_alpha, i.b_alpha_isfixed = t.b_alpha_isfixed, this.#F(i, (n) => {
          n && s();
        }) || s();
      }),
      t.btns.map((s) => new Promise((i) => {
        this.addButton(JSON.parse(s.replaceAll("'", '"'))), i();
      }))
    ].flat();
  }
  get cssText() {
    return this.#c.cssText;
  }
  set cssText(t) {
    this.#c.cssText = t;
  }
  snapshot(t, e) {
    t.render(this.ctn, { clear: !1 }), this.#c.snapshot(t, e);
  }
  snapshot_end() {
    this.#c.snapshot_end();
  }
  makeDesignCast(t) {
    this.ctn.visible && this.#c.makeDesignCast(t);
  }
  makeDesignCastChildren(t) {
    if (this.ctn.visible)
      for (const e of this.#a.children) e.makeDesignCast(t);
  }
  showDesignCast() {
    this.#c.showDesignCast();
  }
  showDesignCastChildren() {
    for (const t of this.#a.children) t.showDesignCast();
  }
  dump() {
    return this.#Y("", "gotxt｜"), super.dump() + `, "enabled":"${this.enabled}", ${this.#c.dump()}, "b_pic":"${this.#b}", "b_color":"${this.#o}", "b_alpha":${this.#p}, "b_alpha_isfixed":"${this.#u}", "width":${this.#c.getWidth}, "height":${this.#c.getHeight}, "pixi_obj":[${this.ctn.children.map((t) => `{"class":"${t instanceof J ? "Sprite" : t instanceof P ? "Graphics" : t instanceof Z ? "Container" : "?"}", "name":"${t.name}", "alpha":${t.alpha}, "x":${t.x}, "y":${t.y}, "visible":"${t.visible}"}`).join(",")}], "button":[${this.#a.children.map((t) => t.children[0]?.name ?? "{}").join(",")}]`;
  }
}
class O {
  constructor(t, e, s) {
    this.appPixi = e, this.val = s, t.add_frame = (i) => this.#d(i), t.let_frame = (i) => this.#u(i), t.set_frame = (i) => this.#y(i), t.frame = (i) => this.#c(i), t.tsy_frame = (i) => this.#q(i);
  }
  static #i;
  static #e;
  static #n;
  static init(t, e, s) {
    O.#i = t, O.#e = e, O.#n = s;
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
      this.#r[t] = e.display !== "none", e.display = "none";
  }
  #r = /* @__PURE__ */ Object.create(null);
  restoreAllFrame() {
    for (const [t, e] of Object.entries(this.#r)) {
      const s = this.#t[t];
      s && (s.style.display = e ? "inline" : "none");
    }
    this.#r = /* @__PURE__ */ Object.create(null);
  }
  //	HTMLフレーム
  // フレーム追加
  #d(t) {
    const { id: e, src: s, alpha: i = 1, scale_x: n = 1, scale_y: l = 1, rotate: a = 0 } = t;
    if (!e) throw "idは必須です";
    if (!s) throw "srcは必須です";
    const c = "const.sn.frm." + e;
    if (this.val.getVal(`tmp:${c}`)) throw `frame【${e}】はすでにあります`;
    const p = q(t, "visible", !0), f = t.b_color ? ` background-color: ${t.b_color};` : "", h = this.#h(t);
    O.#n.cvs.insertAdjacentHTML("beforebegin", `<iframe id="${e}" style="opacity: ${i}; ${f} position: absolute; left:${O.#e.ofsLeft4elm + h.x * O.#e.cvsScale}px; top: ${O.#e.ofsTop4elm + h.y * O.#e.cvsScale}px; z-index: 1; border: 0px; overflow: hidden; display: ${p ? "inline" : "none"}; transform: scale(${n}, ${l}) rotate(${a}deg);" width="${h.width * O.#e.cvsScale}" height="${h.height * O.#e.cvsScale}"></iframe>`), L();
    const y = O.#i.searchPath(s, Y.HTML), d = new D().add({ name: s, url: y, xhrType: B.XHR_RESPONSE_TYPE.TEXT });
    return O.#e.arg.crypto && d.use(async (o, u) => {
      try {
        o.data = await O.#e.dec(o.extension, o.data);
      } catch (r) {
        O.#n.errScript(`[add_frame]Html ロード失敗です src:${o.name} ${r}`, !1);
      }
      u();
    }), d.load((o, u) => {
      const r = document.getElementById(e);
      this.#t[e] = r, this.#f[e] = !1;
      const k = y.lastIndexOf("/") + 1, m = y.slice(0, k), C = m.slice(0, k);
      r.srcdoc = String(u[s]?.data).replace("sn_repRes();", "").replaceAll(
        /\s(?:src|href)=(["'])(\S+?)\1/g,
        // 【\s】が大事、data-src弾く
        (A, w, T) => T.startsWith("../") ? A.replace("../", C) : A.replace("./", "").replace(w, w + m)
      ), r.srcdoc.includes("true/*WEBP*/;") && (r.srcdoc = r.srcdoc.replaceAll(
        /data-src="(.+?\.)(?:jpe?g|png)/g,
        (A, w) => `data-src="${w}webp`
      )), r.onload = () => {
        this.val.setVal_Nochk("tmp", c, !0), this.val.setVal_Nochk("tmp", c + ".alpha", i), this.val.setVal_Nochk("tmp", c + ".x", h.x), this.val.setVal_Nochk("tmp", c + ".y", h.y), this.val.setVal_Nochk("tmp", c + ".scale_x", n), this.val.setVal_Nochk("tmp", c + ".scale_y", l), this.val.setVal_Nochk("tmp", c + ".rotate", a), this.val.setVal_Nochk("tmp", c + ".width", h.width), this.val.setVal_Nochk("tmp", c + ".height", h.height), this.val.setVal_Nochk("tmp", c + ".visible", p);
        const A = r.contentWindow;
        this.#l.resvFlameEvent(A), A.sn_repRes?.((w) => O.#k(w.dataset.src ?? "", w)), G();
      };
    }), !0;
  }
  #f = {};
  getFrmDisabled(t) {
    return this.#f[t];
  }
  #h(t) {
    const e = { ...t }, s = O.#e.resolution;
    return new DOMRect(
      S(e, "x", 0) * s,
      S(e, "y", 0) * s,
      S(e, "width", V.stageW) * s,
      S(e, "height", V.stageH) * s
    );
  }
  static #s = "data:image/jpeg;base64,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";
  static #k(t, e, s) {
    const i = this.#p[t];
    if (i) {
      e.src = i, s && (e.onload = () => s(e));
      return;
    }
    const n = this.#o[t];
    if (n) {
      n.push(e);
      return;
    }
    this.#o[t] = [e];
    const [l = "", a = ""] = t.split("?"), c = O.#i.searchPath(l, Y.SP_GSM), p = new D().add({ name: t, url: c, xhrType: B.XHR_RESPONSE_TYPE.BUFFER });
    t.startsWith("userdata:") ? p.use(async (f, h) => {
      try {
        console.log(`fn:FrameMng.ts line:184 path=${c}=`);
        const y = await O.#e.fetch(c);
        console.log(`fn:FrameMng.ts line:187 ok:${y.ok}`), console.log(`fn:FrameMng.ts line:192 TEXT:${await y.text()}`);
        const d = O.#e;
        if (!d) return;
        const o = await d.readFileSync(c, "base64");
        console.log(`fn:FrameMng.ts line:199 len:${o.length} txt:${o.slice(0, 64)}`);
        const u = `data:image/jpeg;base64,${o}`, r = new Image();
        r.src = u, f.data = r, console.log("fn:FrameMng.ts line:221 ret:%o", u.slice(0, 64));
      } catch (y) {
        O.#n.errScript(`FrameMng use ロード失敗です fn:${f.name} ${y}`, !1);
      }
      h();
    }) : O.#e.arg.crypto && Nt(c) === "bin" && p.use(async (f, h) => {
      try {
        const y = await O.#e.decAB(f.data);
        if (f.extension !== "bin") {
          h();
          return;
        }
        f.data = y, y instanceof HTMLImageElement && (f.type = B.TYPE.IMAGE);
      } catch (y) {
        O.#n.errScript(`FrameMng loadPic ロード失敗です fn:${f.name} ${y}`, !1);
      }
      h();
    }), p.load((f, h) => {
      for (const [y, { data: { src: d } }] of Object.entries(h)) {
        const o = this.#p[y] = d + (d.startsWith("blob:") || d.startsWith("data:") ? "" : a ? "?" + a : ""), u = this.#o[y];
        if (u) for (const r of u)
          r.src = o, s && (r.onload = () => s(r));
        delete this.#o[y];
      }
    });
  }
  static #o = {};
  static #p = {};
  cvsResize() {
    for (const [t, e] of Object.entries(this.#t)) {
      const s = "const.sn.frm." + t, i = Number(this.val.getVal(s + ".x")), n = Number(this.val.getVal(s + ".y")), l = Number(this.val.getVal(s + ".width")), a = Number(this.val.getVal(s + ".height"));
      e.style.left = `${O.#e.ofsLeft4elm + i * O.#e.cvsScale}px`, e.style.top = `${O.#e.ofsTop4elm + n * O.#e.cvsScale}px`, e.width = String(l * O.#e.cvsScale), e.height = String(a * O.#e.cvsScale);
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
    const l = i.contentWindow;
    if (!l.hasOwnProperty(s)) throw `frame【${e}】に変数/関数【${s}】がありません。変数は var付きにして下さい`;
    const a = l[s];
    return this.val.setVal_Nochk(
      "tmp",
      n + "." + s,
      q(t, "function", !1) ? a() : a
    ), !1;
  }
  // フレーム変数に設定
  #y(t) {
    const { id: e, var_name: s, text: i } = t;
    if (!e) throw "idは必須です";
    const n = document.getElementById(e);
    if (!n) throw `id【${e}】はフレームではありません`;
    const l = "const.sn.frm." + e;
    if (!this.val.getVal(`tmp:${l}`)) throw `frame【${e}】が読み込まれていません`;
    if (!s) throw "var_nameは必須です";
    if (!i) throw "textは必須です";
    this.val.setVal_Nochk("tmp", l + "." + s, i);
    const a = n.contentWindow;
    return a[s] = i, !1;
  }
  // フレームに設定
  #b = 1;
  #c(t) {
    const { id: e } = t;
    if (!e) throw "idは必須です";
    const s = document.getElementById(e);
    if (!s) throw `id【${e}】はフレームではありません`;
    const i = "const.sn.frm." + e;
    if (!this.val.getVal("tmp:" + i)) throw `frame【${e}】が読み込まれていません`;
    const n = s.style;
    if (q(t, "float", !1) ? n.zIndex = `${++this.#b}` : "index" in t ? n.zIndex = `${S(t, "index", 0)}` : t.dive && (n.zIndex = `-${++this.#b}`), "alpha" in t) {
      const a = n.opacity = String(t.alpha);
      this.val.setVal_Nochk("tmp", i + ".alpha", a);
    }
    const l = this.#h(t);
    if (("x" in t || "y" in t) && (n.left = `${O.#e.ofsLeft4elm + l.x * O.#e.cvsScale}px`, n.top = `${O.#e.ofsTop4elm + l.y * O.#e.cvsScale}px`, this.val.setVal_Nochk("tmp", i + ".x", l.x), this.val.setVal_Nochk("tmp", i + ".y", l.y)), "scale_x" in t || "scale_y" in t || "rotate" in t) {
      const a = S(t, "scale_x", 1), c = S(t, "scale_y", 1), p = S(t, "rotate", 0);
      n.transform = `scale(${a}, ${c}) rotate(${p}deg)`, this.val.setVal_Nochk("tmp", i + ".scale_x", a), this.val.setVal_Nochk("tmp", i + ".scale_y", c), this.val.setVal_Nochk("tmp", i + ".rotate", p);
    }
    if ("width" in t && (s.width = String(l.width * O.#e.cvsScale), this.val.setVal_Nochk("tmp", i + ".width", l.width)), "height" in t && (s.height = String(l.height * O.#e.cvsScale), this.val.setVal_Nochk("tmp", i + ".height", l.height)), "visible" in t) {
      const a = q(t, "visible", !0);
      n.display = a ? "inline" : "none", this.val.setVal_Nochk("tmp", i + ".visible", a);
    }
    if ("b_color" in t && (n.backgroundColor = t.b_color), "disabled" in t) {
      const a = this.#f[e] = q(t, "disabled", !0), c = s.contentDocument.body;
      for (const p of [
        ...Array.from(c.getElementsByTagName("input")),
        ...Array.from(c.getElementsByTagName("select"))
      ]) p.disabled = a;
    }
    return !1;
  }
  // フレームをトゥイーン開始
  #q(t) {
    const { id: e, alpha: s, x: i, y: n, scale_x: l, scale_y: a, rotate: c, width: p, height: f } = t;
    if (!e) throw "idは必須です";
    const h = document.getElementById(e);
    if (!h) throw `id【${e}】はフレームではありません`;
    const y = "const.sn.frm." + e;
    if (!this.val.getVal(`tmp:${y}`, 0)) throw `frame【${e}】が読み込まれていません`;
    const d = {};
    s && (d.a = h.style.opacity), (i || n || l || a || c) && (d.x = Number(this.val.getVal(`tmp:${y}.x`)), d.y = Number(this.val.getVal(`tmp:${y}.y`)), d.sx = Number(this.val.getVal(`tmp:${y}.scale_x`)), d.sy = Number(this.val.getVal(`tmp:${y}.scale_y`)), d.r = Number(this.val.getVal(`tmp:${y}.rotate`))), p && (d.w = this.val.getVal(`tmp:${y}.width`)), f && (d.h = this.val.getVal(`tmp:${y}.height`));
    const o = N.cnvTweenArg(t, d);
    let u = () => {
    };
    s && (S(o, "alpha", 0), u = () => {
      h.style.opacity = d.a, this.val.setVal_Nochk("tmp", "alpha", d.a);
    });
    let r = () => {
    };
    const k = this.#h(o);
    (i || n || l || a || c) && (k.x, k.y, S(o, "scale_x", 1), S(o, "scale_y", 1), S(o, "rotate", 0), r = () => {
      h.style.left = O.#e.ofsLeft4elm + d.x * O.#e.cvsScale + "px", h.style.top = O.#e.ofsTop4elm + d.y * O.#e.cvsScale + "px", h.style.transform = `scale(${d.sx}, ${d.sy}) rotate(${d.r}deg)`, this.val.setVal_Nochk("tmp", y + ".x", d.x), this.val.setVal_Nochk("tmp", y + ".y", d.y), this.val.setVal_Nochk("tmp", y + ".scale_x", d.sx), this.val.setVal_Nochk("tmp", y + ".scale_y", d.sy), this.val.setVal_Nochk("tmp", y + ".rotate", d.r);
    });
    let m = () => {
    };
    p && (k.width, m = () => {
      h.width = d.w * O.#e.cvsScale + "px", this.val.setVal_Nochk("tmp", y + ".width", d.w);
    });
    let C = () => {
    };
    return f && (k.height, C = () => {
      h.height = d.h * O.#e.cvsScale + "px", this.val.setVal_Nochk("tmp", y + ".height", d.h);
    }), this.appPixi.stage.interactive = !1, N.tween(`frm
${e}`, t, d, N.cnvTweenArg(t, d), () => {
      u(), r(), m(), C();
    }, () => this.appPixi.stage.interactive = !0, () => {
    }), !1;
  }
}
class E {
  //MARK: コンストラクタ
  constructor(t, e, s, i, n, l, a, c, p) {
    this.cfg = t, this.hTag = e, this.appPixi = s, this.val = i, this.main = n, this.scrItr = l, this.sys = a, this.sndMng = c, this.prpPrs = p;
    const f = () => {
      if (a.cvsResize(), this.cvsResizeDesign(), this.#h) for (const o of this.#C)
        this.#a[o].fore.cvsResizeChildren();
      else for (const o of this.#C)
        this.#a[o].fore.cvsResize();
      this.#l.cvsResize(), this.#o.cvsResize();
    };
    if (V.isMobile)
      this.#r.add(globalThis, "orientationchange", f, { passive: !0 });
    else {
      let o;
      this.#r.add(globalThis, "resize", () => {
        o || (o = setTimeout(() => {
          o = void 0, f();
        }, 1e3 / 60 * 10));
      }, { passive: !0 });
    }
    a.cvsResize(), K.init(t, e, i, this, (o) => this.#a[o.layname].fore === o, s), F.init(n, t, s, a, c, i), O.init(t, a, n), H.init(t), this.#l = new O(e, s, i), a.hFactoryCls.grp = () => new F(), a.hFactoryCls.txt = () => new K(), e.loadplugin = (o) => this.#O(o), e.snapshot = (o) => this.#y(o), this.#b = this.sys.isApp ? this.#c : this.#q, e.add_lay = (o) => this.#K(o), e.clear_lay = (o) => this.#B(o), e.finish_trans = () => N.finish_trans(), e.lay = (o) => this.#x(o), e.trans = (o) => this.#A(o), e.wt = (o) => N.wt(o), e.quake = (o) => this.#g(o), e.stop_quake = e.finish_trans, e.wq = (o) => e.wt(o), e.pause_tsy = (o) => N.pause_tsy(o), e.resume_tsy = (o) => N.resume_tsy(o), e.stop_tsy = (o) => N.stop_tsy(o), e.tsy = (o) => this.#$(o), e.wait_tsy = (o) => N.wait_tsy(o), e.add_filter = (o) => this.#R(o), e.clear_filter = (o) => this.#z(o), e.enable_filter = (o) => this.#v(o), e.ch = (o) => this.#j(o), e.clear_text = (o) => this.#et(o), e.current = (o) => this.#M(o), e.endlink = (o) => this.#st(o), e.er = (o) => this.#it(o), e.graph = (o) => this.#nt(o), e.link = (o) => this.#at(o), e.r = (o) => this.#lt(o), e.rec_ch = (o) => this.#tt(o), e.rec_r = (o) => this.#ct(o), e.reset_rec = (o) => this.#ot(o), e.ruby2 = (o) => this.#ht(o), e.span = (o) => this.#rt(o), e.tcy = (o) => this.#pt(o), e.add_face = (o) => b.add_face(o), e.wv = (o) => b.wv(o), e.dump_lay = (o) => this.#dt(o), e.enable_event = (o) => this.#ut(o), e.button = (o) => this.#yt(o), t.existsBreakline && (this.breakLine = (o) => {
      delete o.visible, o.id = "break", o.pic = "breakline";
      const u = encodeURIComponent(JSON.stringify(o));
      this.#u("grp｜" + u);
    }), t.existsBreakpage && (this.breakPage = (o) => {
      delete o.visible, o.id = "break", o.pic = "breakpage";
      const u = encodeURIComponent(JSON.stringify(o));
      this.#u("grp｜" + u);
    }), this.#t = Jt(String(t.oCfg.init.bg_color));
    const h = new P();
    h.beginFill(this.#t, 1).lineStyle(0, this.#t).drawRect(0, 0, V.stageW, V.stageH).endFill(), this.#e.addChild(h.clone()), this.#n.addChild(h), this.#n.visible = !1, this.#e.name = "page:A", this.#n.name = "page:B", this.#i = s.stage, this.#i.addChild(this.#n), this.#i.addChild(this.#e), this.#i.addChild(this.#T), this.#i.addChild(this.#m), this.#i.name = "stage";
    const y = (o, u) => {
      this.#p(Number(u));
    };
    y("", i.getVal("sys:TextLayer.Back.Alpha", 1)), i.defValTrg("sys:TextLayer.Back.Alpha", y);
    const d = (o, u) => H.fontFamily = u;
    d("", i.getVal("tmp:sn.button.fontFamily", H.fontFamily)), i.defValTrg("tmp:sn.button.fontFamily", d), i.defTmp("const.sn.log.json", () => JSON.stringify(
      (this.#J.text = this.#J.text?.replaceAll("</span><span class='sn_ch'>", "") ?? "") ? [...this.#D, this.#J] : this.#D
    )), i.defTmp("const.sn.last_page_text", () => this.currentTxtlayFore?.pageText ?? ""), i.defTmp("const.sn.last_page_plain_text", () => this.currentTxtlayFore?.pagePlainText ?? ""), V.isDbg && (rt.init(s, a, l, p, t, this.#a), this.cvsResizeDesign = () => rt.cvsResizeDesign(), a.addHook((o, u) => {
      this.#d[o]?.(o, u) && delete this.#d[o];
    }));
  }
  #i;
  #e = new Z();
  #n = new Z();
  #l;
  #t;
  #r = new wt();
  cvsResizeDesign() {
  }
  #d = {
    attach: (t) => !1,
    continue: (t) => !1,
    disconnect: (t) => !1,
    _enterDesign: (t) => {
      for (const e of this.#C) {
        const s = this.#a[e].fore;
        s.makeDesignCastChildren((i) => i.make()), s.makeDesignCast((i) => i.make());
      }
      return this.#s(this.#U), !1;
    },
    _replaceToken: (t, e) => !1,
    _selectNode: (t, e) => (this.#s(e.node), !1)
  };
  #f = "";
  #h = "";
  #s(t) {
    [this.#f = "", this.#h = ""] = t.split("/");
    const e = this.#a[this.#f];
    e && (this.#h ? e.fore.showDesignCastChildren() : e.fore.showDesignCast());
  }
  getFrmDisabled = (t) => this.#l.getFrmDisabled(t);
  #k = void 0;
  cover(t, e = 0) {
    this.#k && (this.#i.removeChild(this.#k), this.#k.destroy(), this.#k = void 0), t && this.#i.addChild(
      (this.#k = new P()).beginFill(e).lineStyle(0, e).drawRect(0, 0, V.stageW, V.stageH).endFill()
    );
  }
  #o;
  setEvtMng(t) {
    this.#o = t, this.#l.setEvtMng(t), b.setEvtMng(t), N.init(t, this.appPixi);
  }
  destroy() {
    for (const t of Object.values(this.#a)) t.destroy();
    this.#r.clear(), F.destroy(), ht.destroy(), U.destroy(), K.destroy(), this.#l.destroy(), N.destroy(), E.#N = 10;
  }
  // 既存の全文字レイヤの実際のバック不透明度、を再計算
  #p(t) {
    for (const e of this.#S()) {
      const s = this.#a[e];
      s.fore instanceof K && (s.fore.chgBackAlpha(t), s.back.chgBackAlpha(t));
    }
  }
  #u = (t, e = this.currentTxtlayForeNeedErr, s = !0) => e.tagCh("｜&emsp;《" + t + "》");
  goTxt = () => {
  };
  breakLine = (t) => {
  };
  breakPage = (t) => {
  };
  clearBreak() {
    this.currentTxtlayFore && (this.clearBreak = () => this.#u("del｜break"), this.clearBreak());
  }
  clickTxtLay() {
    return this.currentTxtlayFore ? this.#S().some((t) => {
      const e = this.#a[t].fore;
      return e instanceof K && e.click();
    }) : !1;
  }
  //	//	システム
  //MARK: スナップショット
  #y(t) {
    const e = t.fn ? t.fn.startsWith(Rt) ? t.fn : `${ft + t.fn + kt("-", "_", "", "_")}.png` : `${ft}snapshot${kt("-", "_", "", "_")}.png`, s = this.cfg.searchPath(e), i = S(t, "width", V.stageW), n = S(t, "height", V.stageH);
    return this.#b(t, s, i, n);
  }
  #b = () => !1;
  #c(t, e, s, i) {
    if (this.#l.hideAllFrame(), L(), !("layer" in t))
      return this.sys.capturePage(e, s, i, () => {
        this.#l.restoreAllFrame(), G();
      }), !0;
    const n = {};
    for (const l of this.#S()) {
      const a = this.#a[l].fore.ctn;
      n[l] = a.visible, a.visible = !1;
    }
    for (const l of this.#S(t.layer)) this.#a[l].fore.ctn.visible = !0;
    return this.sys.capturePage(e, s, i, () => {
      for (const [l, a] of Object.entries(n))
        this.#a[l].fore.ctn.visible = a;
      this.#l.restoreAllFrame(), G();
    }), !0;
  }
  #q(t, e, s, i) {
    L();
    const n = Kt(t, "b_color", this.#t), l = Bt({
      width: s,
      height: i,
      backgroundAlpha: n > 16777216 && e.endsWith(".png") ? 0 : 1,
      antialias: q(t, "smoothing", !1),
      preserveDrawingBuffer: !0,
      backgroundColor: n & 16777215,
      autoDensity: !0
    }), a = t.page !== "back" ? "fore" : "back";
    return Promise.allSettled(
      this.#S(t.layer).map((c) => new Promise(
        (p) => this.#a[c][a].snapshot(l, p)
      ))
    ).then(async () => {
      const c = M.create({ width: l.width, height: l.height });
      l.render(this.#i, { renderTexture: c }), await this.sys.savePic(
        e,
        l.plugins.extract.base64(c)
      ), c.destroy();
      for (const p of this.#S(t.layer)) this.#a[p][a].snapshot_end();
      l.destroy(!0), G();
    }), !0;
  }
  //MARK: プラグインの読み込み
  #O(t) {
    const { fn: e } = t;
    if (!e) throw "fnは必須です";
    const s = q(t, "join", !0);
    if (s && L(), e.endsWith(".css"))
      (async () => {
        const i = await fetch(e);
        if (!i.ok) throw new Error("Network response was not ok.");
        st(await i.text()), s && G();
      })();
    else throw "サポートされない拡張子です";
    return s;
  }
  //	//	レイヤ共通
  //MARK: レイヤを追加する
  #K(t) {
    const { layer: e, class: s } = t;
    if (!e) throw "layerは必須です";
    if (e.includes(",")) throw "layer名に「,」は使えません";
    if (e in this.#a) throw `layer【${e}】はすでにあります`;
    if (!s) throw "clsは必須です";
    const i = { isWait: !1 };
    switch (this.#a[e] = new z(e, s, this.#e, this.#n, t, this.sys, this.val, i), this.#C.push(e), s) {
      case "txt":
        this.#U || (this.#W = () => {
        }, this.#w = this.#X, this.#M = this.#_, this.hTag.current({ layer: e }), this.goTxt = () => {
          this.#o.isSkipping ? E.#N = 0 : this.setNormalChWait();
          for (const n of this.#S()) {
            const l = this.#a[n].fore;
            l instanceof K && this.#u("gotxt｜", l, !1);
          }
        }), this.val.setVal_Nochk(
          "save",
          "const.sn.layer." + (e ?? this.#U) + ".enabled",
          !0
        );
        break;
      case "grp":
        if (this.#E) break;
        this.#E = e;
        break;
    }
    return this.scrItr.recodeDesign(t), i.isWait;
  }
  #a = {};
  // しおりLoad時再読込
  #C = [];
  // 最適化用
  #U = "";
  #E = "";
  #x(t) {
    const e = this.#G(t), s = this.#a[e], i = s.back.ctn, n = s.fore.ctn;
    if (q(t, "float", !1))
      this.#n.setChildIndex(i, this.#n.children.length - 1), this.#e.setChildIndex(n, this.#e.children.length - 1), this.#H();
    else if (t.index)
      S(t, "index", 0) && (this.#n.setChildIndex(i, t.index), this.#e.setChildIndex(n, t.index), this.#H());
    else if (t.dive) {
      const { dive: l } = t;
      let a = 0;
      if (e === l) throw "[lay] 属性 layerとdiveが同じ【" + l + "】です";
      const c = this.#a[l];
      if (!c) throw "[lay] 属性 dive【" + l + "】が不正です。レイヤーがありません";
      const p = c.back, f = c.fore, h = this.#n.getChildIndex(p.ctn), y = this.#e.getChildIndex(f.ctn);
      a = h < y ? h : y, a > this.#n.getChildIndex(i) && --a, this.#e.setChildIndex(n, a), this.#n.setChildIndex(i, a), this.#H();
    }
    return t[":id_tag"] = s.fore.name.slice(0, -7), this.scrItr.recodeDesign(t), s.lay(t);
  }
  #H() {
    this.#C = this.#L();
  }
  //MARK: レイヤ設定の消去
  #B(t) {
    return this.#P(t, (e) => {
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
  static #F = (
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
  #Q = M.create({
    width: V.stageW,
    height: V.stageH
  });
  #T = new J(this.#Q);
  #V = M.create({
    width: V.stageW,
    height: V.stageH
  });
  #m = new J(this.#V);
  //MARK: ページ裏表を交換
  #A(t) {
    N.finish_trans(), this.#o.hideHint();
    const { layer: e } = t, s = /* @__PURE__ */ new Set(), i = [];
    for (const w of this.#S(e))
      s.add(w), i.push(this.#a[w].fore);
    const n = async () => {
      [this.#e, this.#n] = [this.#n, this.#e];
      const w = [];
      for (const [T, j] of Object.entries(this.#a)) {
        if (s.has(T)) {
          j.transPage(w);
          continue;
        }
        const { fore: { ctn: g }, back: { ctn: x } } = j, R = this.#e.getChildIndex(x);
        this.#e.removeChild(x), this.#n.removeChild(g), this.#e.addChildAt(g, R), this.#n.addChildAt(x, R);
      }
      await Promise.allSettled(w), this.#e.visible = !0, this.#n.visible = !1, this.#T.visible = !1, this.#m.visible = !1;
    };
    if (this.#m.filters = [], this.#m.alpha = 1, S(t, "time", 0) === 0 || this.#o.isSkipping)
      return n(), !1;
    let a = [];
    const c = [];
    for (const w of this.#S()) {
      const T = this.#a[w][s.has(w) ? "back" : "fore"];
      T.ctn.visible && a.push(T.ctn), c.push(T);
    }
    const { ticker: p, renderer: f } = this.appPixi;
    f.render(this.#n, { renderTexture: this.#Q });
    let h = () => {
      for (const w of a) f.render(
        w,
        { renderTexture: this.#Q, clear: !1 }
      );
    };
    if (!c.some((w) => w.containMovement)) {
      const w = h;
      h = () => {
        h = () => {
        }, w();
      };
    }
    const y = () => f.render(this.#e, { renderTexture: this.#V });
    y();
    let d = () => {
      this.#e.visible = !0, y(), this.#e.visible = !1;
    };
    if (!i.some((w) => w.containMovement)) {
      const w = d;
      d = () => {
        d = () => {
        }, w();
      };
    }
    const o = () => {
      h(), this.#T.visible = !0, d(), this.#m.visible = !0;
    }, { glsl: u, rule: r } = t, k = () => {
      p.remove(o), n();
    };
    if (!u && !r)
      return N.tween(N.TW_INT_TRANS, t, this.#m, { alpha: 0 }, () => {
      }, k, () => {
      }), p.add(o), !1;
    const m = {
      rule: Q.EMPTY,
      vague: S(t, "vague", 0.04),
      tick: 0
    };
    this.#m.filters = [new It(
      void 0,
      u ?? E.#F,
      m
    )];
    const C = N.tween(N.TW_INT_TRANS, t, m, { tick: 1 }, () => {
    }, k, () => {
    }, !r);
    if (!r)
      return p.add(o), !1;
    const A = new b(r, void 0, (w) => {
      m.rule = w.texture, w.destroy(), A.destroy(), C.start(), p.add(o);
    });
    return !1;
  }
  #S(t = "") {
    return t ? t.split(",") : this.#C;
  }
  #P(t, e) {
    const s = this.#S(t.layer);
    for (const i of s) {
      const n = this.#a[i];
      if (!n) throw "存在しないlayer【" + i + "】です";
      e(i, n);
    }
    return s;
  }
  #L(t = "") {
    return this.#S(t).sort((e, s) => {
      const i = this.#e.getChildIndex(this.#a[e].fore.ctn), n = this.#e.getChildIndex(this.#a[s].fore.ctn);
      return i < n ? -1 : i > n ? 1 : 0;
    });
  }
  setAllStyle2TxtLay(t) {
    const e = this.#S();
    for (const s of e) {
      const i = this.#a[s].fore;
      i instanceof K && i.lay({ style: t });
    }
  }
  //MARK: 画面を揺らす
  #g(t) {
    if (N.finish_trans(), S(t, "time", NaN) === 0 || this.#o.isSkipping) return !1;
    const { layer: s } = t, i = [];
    for (const f of this.#S(s))
      i.push(this.#a[f].fore.ctn);
    this.#V.resize(V.stageW, V.stageH);
    const n = () => {
      this.#e.visible = !0;
      const { renderer: f } = this.appPixi;
      for (const h of i) f.render(
        h,
        { renderTexture: this.#V, clear: !1 }
      );
      this.#e.visible = !1;
    };
    this.#m.visible = !0, this.#m.alpha = 1;
    const l = v(S(t, "hmax", 10)), a = v(S(t, "vmax", 10)), c = l === 0 ? () => {
    } : () => this.#m.x = Math.round(Math.random() * l * 2) - l, p = a === 0 ? () => {
    } : () => this.#m.y = Math.round(Math.random() * a * 2) - a;
    return this.#m.filters = [], N.tween(N.TW_INT_TRANS, t, this.#m, { x: 0, y: 0 }, () => {
      c(), p();
    }, () => {
      this.appPixi.ticker.remove(n), this.#e.visible = !0, this.#m.visible = !1, this.#m.x = 0, this.#m.y = 0;
    }, () => {
    }), this.appPixi.ticker.add(n), !1;
  }
  //MARK: トゥイーン開始
  #$(t) {
    const { layer: e, render: s, name: i } = t;
    if (!e) throw "layerは必須です";
    const n = this.#a[this.#G(t)], l = n.fore;
    let a = () => {
    };
    s && !this.#o.isSkipping && (l.renderStart(), a = () => l.renderEnd());
    const c = N.cnvTweenArg(t, l), p = q(t, "arrive", !1), f = q(t, "backlay", !1), h = n.back.ctn;
    return N.tween(i ?? e, t, l, N.cnvTweenArg(t, l), () => {
    }, a, () => {
      if (p && Object.assign(l, c), f) for (const y of Object.keys(N.hMemberCnt)) h[y] = l[y];
    }), "filter" in t && (l.ctn.filters = [I.bldFilters(t)], l.aFltHArg = [t]), !1;
  }
  //MARK: フィルター追加
  #R(t) {
    return N.finish_trans(), this.#P(t, (e) => {
      const s = this.#a[this.#G({ layer: e })];
      if (t.page === "both") {
        this.#Y(s.fore, t), this.#Y(s.back, t);
        return;
      }
      const i = s.getPage(t);
      this.#Y(i, t);
    }), !1;
  }
  #Y(t, e) {
    const s = t.ctn;
    s.filters ??= [], s.filters = [...s.filters, I.bldFilters(e)], t.aFltHArg.push(e);
  }
  //MARK: フィルター全削除
  #z(t) {
    return this.#P(t, (e) => {
      const s = this.#a[this.#G({ layer: e })];
      if (t.page === "both") {
        const n = s.fore, l = s.back;
        n.ctn.filters = null, l.ctn.filters = null, n.aFltHArg = [], l.aFltHArg = [];
        return;
      }
      const i = s.getPage(t);
      i.ctn.filters = null, i.aFltHArg = [];
    }), !1;
  }
  //MARK: フィルター個別切替
  #v(t) {
    return this.#P(t, (e) => {
      const s = this.#a[this.#G({ layer: e })];
      if (t.page === "both") {
        this.#I(s.fore, t), this.#I(s.back, t);
        return;
      }
      const i = s.getPage(t);
      this.#I(i, t);
    }), !1;
  }
  #I(t, e) {
    const s = t.ctn;
    if (!s.filters) throw "フィルターがありません";
    const i = v(S(e, "index", 0)), n = s.filters.length;
    if (n <= i) throw `フィルターの個数（${n}）を越えています`;
    t.aFltHArg[i].enabled = s.filters[i].enabled = q(e, "enabled", !0);
  }
  //	// 文字・文字レイヤ
  static #N = 10;
  static get msecChWait() {
    return E.#N;
  }
  //MARK: 文字を追加する
  #j(t) {
    const { text: e } = t;
    if (!e) throw "textは必須です";
    const s = this.#w(t);
    delete t.text, this.setNormalChWait(), this.#o.isSkipping ? t.wait = 0 : "wait" in t && S(t, "wait", NaN);
    const i = encodeURIComponent(JSON.stringify(t));
    this.#u("add｜" + i, s);
    const n = q(t, "record", !0), l = this.val.doRecLog();
    return n || this.val.setVal_Nochk("save", "sn.doRecLog", n), s.tagCh(e.replaceAll("[r]", `
`)), this.val.setVal_Nochk("save", "sn.doRecLog", l), this.#u("add_close｜", s), !1;
  }
  #w = (t) => {
    throw this.#W(), 0;
  };
  #X(t) {
    const e = this.#G(t, this.#U), i = this.#a[e].getPage(t);
    if (!(i instanceof K)) throw e + "はTxtLayerではありません";
    return i;
  }
  setNormalChWait() {
    E.#N = this.scrItr.normalWait;
  }
  //MARK: 操作対象のメッセージレイヤの指定
  #M = (t) => {
    throw this.#W(), 0;
  };
  #_(t) {
    const { layer: e } = t;
    if (!e) throw "[current] layerは必須です";
    const s = this.#a[e];
    if (!s || !(s.getPage(t) instanceof K)) throw `${e}はTxtLayerではありません`;
    this.#Z = s, this.recPagebreak(), this.#U = e, this.val.setVal_Nochk("save", "const.sn.mesLayer", e);
    for (const i of this.#S()) {
      const n = this.#a[i];
      n.fore instanceof K && (n.fore.isCur = n.back.isCur = i === e);
    }
    return !1;
  }
  get currentTxtlayForeNeedErr() {
    return this.#W(), this.currentTxtlayFore;
  }
  get currentTxtlayFore() {
    return this.#Z ? this.#Z.fore : null;
  }
  #Z;
  // カレントテキストレイヤ
  #W = () => {
    throw "文字レイヤーがありません。文字表示や操作する前に、[add_lay layer=（レイヤ名） class=txt]で文字レイヤを追加して下さい";
  };
  #G(t, e = "") {
    const s = t.layer ?? e;
    if (s.includes(",")) throw "layer名に「,」は使えません";
    if (!(s in this.#a)) throw "属性 layer【" + s + "】が不正です。レイヤーがありません";
    return t.layer = s;
  }
  #J = { text: "" };
  #D = [];
  recText(t) {
    this.#J = { text: t }, this.val.setVal_Nochk(
      "save",
      "const.sn.sLog",
      String(this.val.getVal("const.sn.log.json"))
      // これを起動したい
    );
  }
  recPagebreak() {
    this.#J.text && (this.#J.text = this.#J.text.replaceAll("</span><span class='sn_ch'>", ""), this.#D.push(this.#J) > this.cfg.oCfg.log.max_len && (this.#D = this.#D.slice(-this.cfg.oCfg.log.max_len)), this.#J = { text: "" });
  }
  //MARK: 文字消去
  #et(t) {
    const e = this.#w(t);
    return t.layer === this.#U && t.page === "fore" && this.recPagebreak(), e.clearText(), !1;
  }
  //MARK: ハイパーリンクの終了
  #st(t) {
    return this.#u("endlink｜", this.#w(t)), !1;
  }
  //MARK: ページ両面の文字消去
  #it(t) {
    return q(t, "rec_page_break", !0) && this.recPagebreak(), this.#Z && (this.#Z.fore.clearLay(t), this.#Z.back.clearLay(t)), !1;
  }
  //MARK: インライン画像表示
  #nt(t) {
    if (!t.pic) throw "[graph] picは必須です";
    const e = encodeURIComponent(JSON.stringify(t));
    return this.#u("grp｜" + e, this.#w(t)), !1;
  }
  //MARK: ハイパーリンク
  #at(t) {
    if (!t.fn && !t.label && !t.url) throw "fn,label,url いずれかは必須です";
    t.fn ??= this.scrItr.scriptFn, t.style ??= "background-color: rgba(255,0,0,0.5);", t.style_hover ??= "background-color: rgba(255,0,0,0.9);", t.style_clicked ??= t.style;
    const e = encodeURIComponent(JSON.stringify(t));
    return this.#u("link｜" + e, this.#w(t)), !1;
  }
  //MARK: 改行
  #lt(t) {
    return t.text = `
`, this.#j(t);
  }
  //MARK: 履歴改行
  #ct(t) {
    return this.#tt({ ...t, text: "[r]" });
  }
  //MARK: 履歴書き込み
  #tt(t) {
    return this.#J = { ...t, text: this.#J.text }, t.text ? (t.record = !0, t.style ??= "", t.style += "display: none;", t.wait = 0, this.#j(t)) : !1;
  }
  //MARK: 履歴リセット
  #ot(t) {
    return this.#D = [], this.#J = { text: t.text ?? "" }, this.val.setVal_Nochk(
      "save",
      "const.sn.sLog",
      t.text ? `[{text:"${t.text}"}]` : "[]"
    ), !1;
  }
  //MARK: 文字列と複数ルビの追加
  #ht(t) {
    const { t: e, r: s } = t;
    if (!e) throw "[ruby2] tは必須です";
    if (!s) throw "[ruby2] rは必須です";
    return t.text = "｜" + encodeURIComponent(e) + "《" + encodeURIComponent(s) + "》", delete t.t, delete t.r, this.#j(t);
  }
  //MARK: インラインスタイル設定
  #rt(t) {
    const e = encodeURIComponent(JSON.stringify(t));
    return this.#u("span｜" + e, this.#w(t)), !1;
  }
  //MARK: tcy縦中横を表示する
  #pt(t) {
    if (!t.t) throw "[tcy] tは必須です";
    const e = encodeURIComponent(JSON.stringify(t));
    return this.#u("tcy｜" + e, this.#w(t)), !1;
  }
  //MARK: レイヤのダンプ
  #dt(t) {
    console.group("🥟 [dump_lay]");
    for (const e of this.#S(t.layer)) {
      const s = this.#a[e];
      try {
        console.info(
          `%c${s.fore.name.slice(0, -7)} %o`,
          `color:#${V.isDarkMode ? "49F" : "05A"};`,
          JSON.parse(`{"back":{${s.back.dump()}}, "fore":{${s.fore.dump()}}}`)
        );
      } catch (i) {
        console.error("dump_lay err:%o", i), console.error(`   back:${s.back.dump()}`), console.error(`   fore:${s.fore.dump()}`);
      }
    }
    return console.groupEnd(), !1;
  }
  //MARK: イベント有無の切替
  #ut(t) {
    const e = this.#G(t, this.#U), s = q(t, "enabled", !0);
    return this.#w(t).enabled = s, this.val.setVal_Nochk("save", "const.sn.layer." + e + ".enabled", s), !1;
  }
  //MARK: ボタンを表示
  #yt(t) {
    return z.argChk_page(t, "back"), t.fn ??= this.scrItr.scriptFn, this.#w(t).addButton(t), this.scrItr.recodeDesign(t), !1;
  }
  record() {
    const t = {};
    for (const e of this.#C) {
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
    this.#D = JSON.parse(String(this.val.getVal("save:const.sn.sLog"))), this.#J = { text: "" };
    const e = [], s = [];
    for (const [n, { fore: l, fore: { idx: a }, back: c, cls: p }] of Object.entries(t)) {
      s.push({ ln: n, idx: a });
      const f = this.#a[n] ??= new z(n, p, this.#e, this.#n, {}, this.sys, this.val, { isWait: !1 });
      f.fore.playback(l, e), f.back.playback(c, e);
    }
    const i = this.#e.children.length;
    return e.push(new Promise((n) => {
      for (const { ln: l, idx: a } of s.sort(({ idx: c }, { idx: p }) => c === p ? 0 : c < p ? -1 : 1)) {
        const { fore: c, back: p } = this.#a[l];
        if (!c) continue;
        const f = i > a ? a : i - 1;
        this.#e.setChildIndex(c.ctn, f), this.#n.setChildIndex(p.ctn, f);
      }
      n();
    })), e;
  }
}
const Yt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LayerMng: E
}, Symbol.toStringTag, { value: "Module" }));
export {
  H as B,
  Yt as L,
  K as T
};
//# sourceMappingURL=LayerMng.js.map
