import { S as T, a as A, C as S, p as M, A as R, b as L, d as x, D as $, e as G, s as P } from "./app2.js";
function k(c, t, e = 0, s = 0, n = 0) {
  const o = c.slice(0, t).split(`
`), r = o.length;
  return {
    ln: s + r - 1,
    ch: r < 2 ? n + 1 + e + t : o.at(-1)?.length ?? 0
  };
}
class B {
  // 87 match 2725 step(0.5ms) PCRE2 https://regex101.com/r/aeN57J/1
  /*
  ;[^\n]*
  |	(?<key>[^\s="'#|;]+)
  	(?: \s | ;[^\n]*\n)*
  	=
  	(?: \s | ;[^\n]*\n)*
  	(?:	(?<val> [^\s"'#|;]+)
  	|	(["'#]) (?<val2>.*?) \3 )
  	(?: \|
  		(?: (?<def> [^\s"'#;]+)
  	|	(["'#]) (?<def2>.*?) \6 ) )?
  |	(?<literal>[^\s;]+)
  	*/
  #e = /;[^\n]*|(?<key>[^\s="'#|;]+)(?:\s|;[^\n]*\n)*=(?:\s|;[^\n]*\n)*(?:(?<val>[^\s"'#|;]+)|(["'#])(?<val2>.*?)\3)(?:\|(?:(?<def>[^\s"'#;]+)|(["'#])(?<def2>.*?)\6))?|(?<literal>[^\s;]+)/g;
  // 【属性 = 値 | 省略値】の分析
  parse(t) {
    this.#t = {}, this.#n = !1;
    for (const { groups: e } of t.matchAll(this.#e)) {
      const { key: s, val: n, val2: i, def: o, def2: r, literal: a } = e;
      s ? this.#t[s] = {
        val: n ?? i ?? "",
        def: o ?? r
      } : a && (a === "*" ? this.#n = !0 : this.#t[a] = { val: "1" });
    }
  }
  // 属性と値の位置をまとめて返す
  parseinDetail(t, e, s, n) {
    const i = {}, o = t.slice(1 + e, -1);
    for (const { groups: r, index: a, 0: f } of o.matchAll(this.#e)) {
      if (!a) continue;
      const { key: m, val: p, val2: w = "", literal: l } = r;
      if (l) {
        if (l.endsWith("=")) {
          const u = l.length - 1, { ch: _ } = k(o, a + u, e, s, n);
          i[l.slice(0, -1)] = {
            k_ln: s,
            k_ch: _ - u,
            v_ln: s,
            v_ch: _ + 1,
            //	v_ch: ch +1+lenNm +literal.length +1,
            v_len: 0
          };
        }
        continue;
      }
      if (!m) continue;
      const { ln: g, ch: d } = k(o, a, e, s, n), { ln: y, ch: h } = k(o, a + f.lastIndexOf(p ?? w) - (p ? 0 : 1), e, s, n);
      i[m] = { k_ln: g, k_ch: d, v_ln: y, v_ch: h, v_len: p ? p.length : w.length + 2 };
    }
    return i;
  }
  #t = {};
  get hPrm() {
    return this.#t;
  }
  #n = !1;
  get isKomeParam() {
    return this.#n;
  }
}
const b = /(?<name>[^\s;\]]+)/;
function E(c) {
  const e = b.exec(c.slice(1, -1))?.groups;
  if (!e) throw `タグ記述【${c}】異常です(タグ解析)`;
  const s = e.name;
  return [s, c.slice(1 + s.length, -1)];
}
function W(c) {
  const e = b.exec(c.slice(1))?.groups;
  if (!e) throw `タグ記述【${c}】異常です(タグ解析)`;
  return e.name;
}
function D(c) {
  const t = c.replaceAll("==", "＝").replaceAll("!=", "≠").split("="), e = t.length;
  if (e < 2 || e > 3) throw "「&計算」書式では「=」指定が一つか二つ必要です";
  const [s, n, i] = t;
  if (n.startsWith("&")) throw "「&計算」書式では「&」指定が不要です";
  return {
    name: s.replaceAll("＝", "==").replaceAll("≠", "!="),
    text: n.replaceAll("＝", "==").replaceAll("≠", "!="),
    cast: e === 3 ? i.trim() : void 0
  };
}
class O {
  constructor(t) {
    this.cfg = t, this.setEscape("");
  }
  #e;
  setEscape(t) {
    if (this.#s && t in this.#s) throw "[エスケープ文字] char【" + t + "】が登録済みの括弧マクロまたは一文字マクロです";
    this.#e = new RegExp(
      (t ? `\\${t}\\S|` : "") + // エスケープシーケンス
      `\\n+|\\t+|\\[let_ml\\s+[^\\]]+\\].+?(?=\\[endlet_ml[\\]\\s])|\\[(?:[^"'#;\\]]+|(["'#]).*?\\1|;[^\\n]*)*?]|;[^\\n]*|&[^&\\n]+&|&&?(?:[^"'#;\\n&]+|(["'#]).*?\\2)+|^\\*[^\\s\\[&;\\\\]+|[^\\n\\t\\[;${t ? `\\${t}` : ""}]+`,
      // 本文
      "gs"
    ), this.#t = new RegExp(`[\\w\\s;[\\]*=&｜《》${t ? `\\${t}` : ""}]`), this.#r = new RegExp(`[\\n\\t;\\[*&${t ? `\\${t}` : ""}]`);
  }
  // 括弧マクロの定義
  bracket2macro(t, e, s, n) {
    const { name: i, text: o } = t;
    if (!i) throw "[bracket2macro] nameは必須です";
    if (!o) throw "[bracket2macro] textは必須です";
    const r = o.at(0);
    if (!r) throw "[bracket2macro] textは必須です";
    if (o.length !== 2) throw "[bracket2macro] textは括弧の前後を示す二文字を指定してください";
    if (!(i in e)) throw `[bracket2macro] 未定義のタグ又はマクロ[${i}]です`;
    this.#s ??= {};
    const a = o.charAt(1);
    if (r in this.#s) throw "[bracket2macro] text【" + r + "】が登録済みの括弧マクロまたは一文字マクロです";
    if (a in this.#s) throw "[bracket2macro] text【" + a + "】が登録済みの括弧マクロまたは一文字マクロです";
    if (this.#t.test(r)) throw "[bracket2macro] text【" + r + "】は括弧マクロに使用できない文字です";
    if (this.#t.test(a)) throw "[bracket2macro] text【" + a + "】は括弧マクロに使用できない文字です";
    this.#s[a] = "0", this.#s[r] = `[${i} text=`, this.addC2M(`\\${r}[^\\${a}]*\\${a}`, `\\${r}\\${a}`), this.#f(s, n);
  }
  // 一文字マクロの定義
  char2macro(t, e, s, n) {
    const { char: i, name: o } = t;
    if (!i) throw "[char2macro] charは必須です";
    if (this.#s ??= {}, i in this.#s) throw "[char2macro] char【" + i + "】が登録済みの括弧マクロまたは一文字マクロです";
    if (this.#t.test(i)) throw "[char2macro] char【" + i + "】は一文字マクロに使用できない文字です";
    if (!o) throw "[char2macro] nameは必須です";
    if (!(o in e)) throw `[char2macro] 未定義のタグ又はマクロ[${o}]です`;
    this.#s[i] = `[${o}]`, this.addC2M(`\\${i}`, `\\${i}`), this.#f(s, n);
  }
  #t;
  #n = new RegExp("");
  #o = "";
  #i = "";
  addC2M(t, e) {
    this.#o += `${t}|`, this.#i += e, this.#n = new RegExp(
      `(${this.#o}[^${this.#i}]+)`,
      "g"
    );
  }
  resolveScript(t) {
    const e = t.replaceAll(/\r\n?/g, `
`).match(this.#e)?.flatMap((n) => {
      if (!this.testTagLetml(n)) return n;
      const i = /^([^\]]+?])(.*)$/s.exec(n);
      if (!i) return n;
      const [, o, r] = i;
      return [o, r];
    }) ?? [], s = { aToken: e, len: e.length, aLNum: [] };
    return this.#f(s), this.#h(s), s;
  }
  #l = /^\[(call|loadplugin)\s/;
  #a = /\bfn\s*=\s*[^\s\]]+/;
  #h(t) {
    for (let e = t.len - 1; e >= 0; --e) {
      const s = t.aToken[e];
      if (!this.#l.test(s)) continue;
      const [n, i] = E(s);
      this.#c.parse(i);
      const o = this.#c.hPrm.fn;
      if (!o) continue;
      const { val: r } = o;
      if (!r.endsWith("*")) continue;
      t.aToken.splice(e, 1, "	", "; " + s), t.aLNum.splice(e, 1, NaN, NaN);
      const a = n === "loadplugin" ? T.CSS : T.SN, f = this.cfg.matchPath("^" + r.slice(0, -1) + ".*", a);
      for (const m of f) {
        const p = s.replace(
          this.#a,
          "fn=" + decodeURIComponent(A(m[a]))
        );
        t.aToken.splice(e, 0, p), t.aLNum.splice(e, 0, NaN);
      }
    }
    t.len = t.aToken.length;
  }
  #c = new B();
  testTagLetml(t) {
    return /^\[let_ml\s/.test(t);
  }
  testTagEndLetml(t) {
    return /^\[endlet_ml\s*]/.test(t);
  }
  #s = void 0;
  #r;
  #f(t, e = 0) {
    if (this.#s) {
      for (let s = t.len - 1; s >= e; --s) {
        const n = t.aToken[s];
        if (this.testNoTxt(n.at(0) ?? `
`)) continue;
        const i = t.aLNum[s], o = n.match(this.#n);
        if (!o) continue;
        let r = 1;
        for (let a = o.length - 1; a >= 0; --a) {
          let f = o[a];
          const m = this.#s[f.at(0) ?? " "];
          m && (f = m + (m.endsWith("]") ? "" : `'${f.slice(1, -1)}']`)), t.aToken.splice(s, r, f), t.aLNum.splice(s, r, i), r = 0;
        }
      }
      t.len = t.aToken.length;
    }
  }
  testNoTxt(t) {
    return this.#r.test(t);
  }
  //4tst
}
const v = "skynovel";
class C {
  constructor(t) {
    this.sys = t;
  }
  static async generate(t) {
    P();
    const e = new C(t);
    return await e.#l().catch((s) => console.error("Main.generate err e:%o", s)), e;
  }
  cvs;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  #e = /* @__PURE__ */ Object.create(null);
  // タグ処理辞書
  #t;
  #n;
  #o;
  #i = [];
  async #l() {
    const t = await S.generate(this.sys);
    this.sys.setMain(this, t);
    const e = {
      width: t.oCfg.window.width,
      height: t.oCfg.window.height,
      backgroundColor: M(String(t.oCfg.init.bg_color)),
      // このString()は後方互換性のため必須
      resolution: globalThis.devicePixelRatio
    }, s = document.getElementById(v);
    if (s) {
      const h = s.cloneNode(!0);
      h.id = v, e.view = s;
      const u = s.parentNode;
      this.#i.unshift(() => u.appendChild(h));
    } else {
      const h = document.createElement("canvas");
      h.id = v, e.view = h, document.body.appendChild(h), this.#i.unshift(() => document.body.removeChild(h));
    }
    const n = new R(e);
    this.#i.unshift(() => {
      L(), this.sys.destroy(), n.destroy(!1);
    }), this.cvs = n.view, this.cvs.id = v + "_act", s || document.body.appendChild(this.cvs);
    const i = document.createElement("canvas").getContext("2d");
    if (!i) throw "#init cc err";
    x.cc4ColorName = i;
    const [{ Variable: o }, { PropParser: r }, { SoundMng: a }, { ScriptIterator: f }, { LayerMng: m }, { EventMng: p }, { Button: w }] = await Promise.all([
      import("./Variable.js"),
      import("./PropParser.js"),
      import("./SoundMng.js"),
      import("./ScriptIterator.js"),
      import("./LayerMng.js"),
      import("./EventMng.js"),
      import("./Button.js")
    ]);
    w.init(t);
    const l = new o(this.sys, t, this.#e), g = new r(l, t.oCfg.init.escape);
    this.#a = (h, u, _, N) => l.setVal_Nochk(h, u, _, N), this.#s = (h) => g.getValAmpersand(h), this.#r = (h) => g.parse(h), await Promise.allSettled(this.sys.init(this.#e, n, l));
    const d = new a(t, this.#e, l, this, this.sys);
    this.#i.unshift(() => d.destroy()), this.#t = new f(t, this.#e, this, l, g, d, this.sys), this.#i.unshift(() => this.#t.destroy());
    const y = new $(this.sys, this.#e, this.#t);
    this.#i.unshift(() => y.destroy()), this.errScript = (h, u = !0) => {
      if (this.stop(), $.myTrace(h), x.debugLog && console.log("🍜 SKYNovel err!"), u) throw h;
    }, this.#n = new m(t, this.#e, n, l, this, this.#t, this.sys, d, g), this.#i.unshift(() => this.#n.destroy()), this.#o = new p(t, this.#e, n, this, this.#n, l, d, this.#t, this.sys), this.#i.unshift(() => this.#o.destroy()), this.#i.unshift(() => {
      this.stop(), this.#h = !1;
      const h = () => !0;
      for (const u in this.#e) this.#e[u] = h;
    });
  }
  destroy() {
    this.resume = this.destroy = () => {
    }, this.cvs.parentElement?.removeChild(this.cvs);
    for (const t of this.#i) t();
    this.#i = [];
  }
  errScript = (t, e = !0) => {
  };
  resumeByJumpOrCall(t) {
    if (t.url) {
      this.#e.navigate_to(t), this.#t.jumpJustBefore();
      return;
    }
    if (this.#a("tmp", "sn.eventArg", String(t.arg ?? "")), this.#a("tmp", "sn.eventLabel", t.label ?? ""), G(t, "call", !1)) {
      if (this.#t.subIdxToken(), this.#e.call(t)) return;
    } else if (this.#e.clear_event({}), this.#e.jump(t)) return;
    this.resume();
  }
  #a = (t, e, s, n = !1) => {
  };
  resume() {
    this.#n.clearBreak(), this.#t.noticeBreak(!1), this.#o.hideHint(), queueMicrotask(() => {
      this.#c();
    });
  }
  stop = () => {
    this.#t.noticeBreak(!0);
  };
  setLoop(t, e = "") {
    (this.#h = t) ? this.resume() : this.stop(), this.sys.setTitleInfo(e ? ` -- ${e}中` : "");
  }
  // oxlint-disable-next-line no-unused-private-class-members
  #h = !0;
  //MARK: メイン処理（シナリオ解析）
  async #c() {
    let t = "";
    try {
      for (; this.#h; ) {
        let e = this.#t.nextToken();
        if (!e) return;
        const s = e.charCodeAt(0);
        if (s === 9) continue;
        if (s === 10) {
          this.#t.addLineNum(e.length);
          continue;
        }
        if (s === 91) {
          if (t = "タグ開始", this.#t.isBreak(e)) return;
          const [i, o] = E(e);
          t = `[${i}]例外`;
          const r = (e.match(/\n/g) ?? []).length;
          if (r > 0 && this.#t.addLineNum(r), await this.#t.タグ解析(
            i,
            o
          )) {
            this.stop();
            return;
          }
          continue;
        }
        if (s === 38) {
          if (!e.endsWith("&")) {
            if (t = "変数計算", this.#t.isBreak(e)) return;
            const i = D(e.slice(1));
            i.name = this.#s(i.name), i.text = String(this.#r(i.text)), this.#e.let(i);
            continue;
          }
          if (t = "変数操作", e.charAt(1) === "&") throw new Error("「&表示&」書式では「&」指定が不要です");
          e = String(this.#r(e.slice(1, -1)));
        } else {
          if (s === 59) continue;
          if (s === 42 && e.length > 1) continue;
        }
        t = "文字表示", this.#n.setNormalChWait(), this.#n.currentTxtlayForeNeedErr.tagCh(e);
      }
    } catch (e) {
      this.errScript(`${t} ${e instanceof Error ? `mes=${e.message}(${e.name})` : String(e)}`, !1);
    }
  }
  #s = (t) => "";
  #r;
}
const j = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Main: C
}, Symbol.toStringTag, { value: "Module" }));
export {
  B as A,
  O as G,
  j as M,
  E as a,
  W as t
};
//# sourceMappingURL=Main.js.map
