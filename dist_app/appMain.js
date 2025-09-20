import Vc, { ipcMain as Qe, dialog as Mi, shell as Gc, BrowserWindow as Hc, app as et, screen as Ui } from "electron";
import Me from "fs";
import Bc from "constants";
import Kc from "stream";
import $i from "util";
import wc from "assert";
import ie from "path";
import Sc from "crypto";
import Wc from "events";
import Zc from "os";
import $c from "zlib";
var wr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Rc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Sr = {}, tt = {}, xi;
function ce() {
  return xi || (xi = 1, tt.fromCallback = function(e) {
    return Object.defineProperty(function(...t) {
      if (typeof t[t.length - 1] == "function") e.apply(this, t);
      else
        return new Promise((o, n) => {
          t.push((u, a) => u != null ? n(u) : o(a)), e.apply(this, t);
        });
    }, "name", { value: e.name });
  }, tt.fromPromise = function(e) {
    return Object.defineProperty(function(...t) {
      const o = t[t.length - 1];
      if (typeof o != "function") return e.apply(this, t);
      t.pop(), e.apply(this, t).then((n) => o(null, n), o);
    }, "name", { value: e.name });
  }), tt;
}
var $r, zi;
function Xc() {
  if (zi) return $r;
  zi = 1;
  var e = Bc, t = process.cwd, o = null, n = process.env.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function() {
    return o || (o = t.call(process)), o;
  };
  try {
    process.cwd();
  } catch {
  }
  if (typeof process.chdir == "function") {
    var u = process.chdir;
    process.chdir = function(r) {
      o = null, u.call(process, r);
    }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, u);
  }
  $r = a;
  function a(r) {
    e.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && f(r), r.lutimes || i(r), r.chown = v(r.chown), r.fchown = v(r.fchown), r.lchown = v(r.lchown), r.chmod = s(r.chmod), r.fchmod = s(r.fchmod), r.lchmod = s(r.lchmod), r.chownSync = _(r.chownSync), r.fchownSync = _(r.fchownSync), r.lchownSync = _(r.lchownSync), r.chmodSync = d(r.chmodSync), r.fchmodSync = d(r.fchmodSync), r.lchmodSync = d(r.lchmodSync), r.stat = p(r.stat), r.fstat = p(r.fstat), r.lstat = p(r.lstat), r.statSync = S(r.statSync), r.fstatSync = S(r.fstatSync), r.lstatSync = S(r.lstatSync), r.chmod && !r.lchmod && (r.lchmod = function(l, h, c) {
      c && process.nextTick(c);
    }, r.lchmodSync = function() {
    }), r.chown && !r.lchown && (r.lchown = function(l, h, c, m) {
      m && process.nextTick(m);
    }, r.lchownSync = function() {
    }), n === "win32" && (r.rename = typeof r.rename != "function" ? r.rename : function(l) {
      function h(c, m, E) {
        var y = Date.now(), g = 0;
        l(c, m, function w(R) {
          if (R && (R.code === "EACCES" || R.code === "EPERM" || R.code === "EBUSY") && Date.now() - y < 6e4) {
            setTimeout(function() {
              r.stat(m, function(N, b) {
                N && N.code === "ENOENT" ? l(c, m, w) : E(R);
              });
            }, g), g < 100 && (g += 10);
            return;
          }
          E && E(R);
        });
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(h, l), h;
    }(r.rename)), r.read = typeof r.read != "function" ? r.read : function(l) {
      function h(c, m, E, y, g, w) {
        var R;
        if (w && typeof w == "function") {
          var N = 0;
          R = function(b, M, G) {
            if (b && b.code === "EAGAIN" && N < 10)
              return N++, l.call(r, c, m, E, y, g, R);
            w.apply(this, arguments);
          };
        }
        return l.call(r, c, m, E, y, g, R);
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(h, l), h;
    }(r.read), r.readSync = typeof r.readSync != "function" ? r.readSync : /* @__PURE__ */ function(l) {
      return function(h, c, m, E, y) {
        for (var g = 0; ; )
          try {
            return l.call(r, h, c, m, E, y);
          } catch (w) {
            if (w.code === "EAGAIN" && g < 10) {
              g++;
              continue;
            }
            throw w;
          }
      };
    }(r.readSync);
    function f(l) {
      l.lchmod = function(h, c, m) {
        l.open(
          h,
          e.O_WRONLY | e.O_SYMLINK,
          c,
          function(E, y) {
            if (E) {
              m && m(E);
              return;
            }
            l.fchmod(y, c, function(g) {
              l.close(y, function(w) {
                m && m(g || w);
              });
            });
          }
        );
      }, l.lchmodSync = function(h, c) {
        var m = l.openSync(h, e.O_WRONLY | e.O_SYMLINK, c), E = !0, y;
        try {
          y = l.fchmodSync(m, c), E = !1;
        } finally {
          if (E)
            try {
              l.closeSync(m);
            } catch {
            }
          else
            l.closeSync(m);
        }
        return y;
      };
    }
    function i(l) {
      e.hasOwnProperty("O_SYMLINK") && l.futimes ? (l.lutimes = function(h, c, m, E) {
        l.open(h, e.O_SYMLINK, function(y, g) {
          if (y) {
            E && E(y);
            return;
          }
          l.futimes(g, c, m, function(w) {
            l.close(g, function(R) {
              E && E(w || R);
            });
          });
        });
      }, l.lutimesSync = function(h, c, m) {
        var E = l.openSync(h, e.O_SYMLINK), y, g = !0;
        try {
          y = l.futimesSync(E, c, m), g = !1;
        } finally {
          if (g)
            try {
              l.closeSync(E);
            } catch {
            }
          else
            l.closeSync(E);
        }
        return y;
      }) : l.futimes && (l.lutimes = function(h, c, m, E) {
        E && process.nextTick(E);
      }, l.lutimesSync = function() {
      });
    }
    function s(l) {
      return l && function(h, c, m) {
        return l.call(r, h, c, function(E) {
          $(E) && (E = null), m && m.apply(this, arguments);
        });
      };
    }
    function d(l) {
      return l && function(h, c) {
        try {
          return l.call(r, h, c);
        } catch (m) {
          if (!$(m)) throw m;
        }
      };
    }
    function v(l) {
      return l && function(h, c, m, E) {
        return l.call(r, h, c, m, function(y) {
          $(y) && (y = null), E && E.apply(this, arguments);
        });
      };
    }
    function _(l) {
      return l && function(h, c, m) {
        try {
          return l.call(r, h, c, m);
        } catch (E) {
          if (!$(E)) throw E;
        }
      };
    }
    function p(l) {
      return l && function(h, c, m) {
        typeof c == "function" && (m = c, c = null);
        function E(y, g) {
          g && (g.uid < 0 && (g.uid += 4294967296), g.gid < 0 && (g.gid += 4294967296)), m && m.apply(this, arguments);
        }
        return c ? l.call(r, h, c, E) : l.call(r, h, E);
      };
    }
    function S(l) {
      return l && function(h, c) {
        var m = c ? l.call(r, h, c) : l.call(r, h);
        return m && (m.uid < 0 && (m.uid += 4294967296), m.gid < 0 && (m.gid += 4294967296)), m;
      };
    }
    function $(l) {
      if (!l || l.code === "ENOSYS")
        return !0;
      var h = !process.getuid || process.getuid() !== 0;
      return !!(h && (l.code === "EINVAL" || l.code === "EPERM"));
    }
  }
  return $r;
}
var Rr, Vi;
function Jc() {
  if (Vi) return Rr;
  Vi = 1;
  var e = Kc.Stream;
  Rr = t;
  function t(o) {
    return {
      ReadStream: n,
      WriteStream: u
    };
    function n(a, r) {
      if (!(this instanceof n)) return new n(a, r);
      e.call(this);
      var f = this;
      this.path = a, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, r = r || {};
      for (var i = Object.keys(r), s = 0, d = i.length; s < d; s++) {
        var v = i[s];
        this[v] = r[v];
      }
      if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.end === void 0)
          this.end = 1 / 0;
        else if (typeof this.end != "number")
          throw TypeError("end must be a Number");
        if (this.start > this.end)
          throw new Error("start must be <= end");
        this.pos = this.start;
      }
      if (this.fd !== null) {
        process.nextTick(function() {
          f._read();
        });
        return;
      }
      o.open(this.path, this.flags, this.mode, function(_, p) {
        if (_) {
          f.emit("error", _), f.readable = !1;
          return;
        }
        f.fd = p, f.emit("open", p), f._read();
      });
    }
    function u(a, r) {
      if (!(this instanceof u)) return new u(a, r);
      e.call(this), this.path = a, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, r = r || {};
      for (var f = Object.keys(r), i = 0, s = f.length; i < s; i++) {
        var d = f[i];
        this[d] = r[d];
      }
      if (this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.start < 0)
          throw new Error("start must be >= zero");
        this.pos = this.start;
      }
      this.busy = !1, this._queue = [], this.fd === null && (this._open = o.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
    }
  }
  return Rr;
}
var Ir, Gi;
function Yc() {
  if (Gi) return Ir;
  Gi = 1, Ir = t;
  var e = Object.getPrototypeOf || function(o) {
    return o.__proto__;
  };
  function t(o) {
    if (o === null || typeof o != "object")
      return o;
    if (o instanceof Object)
      var n = { __proto__: e(o) };
    else
      var n = /* @__PURE__ */ Object.create(null);
    return Object.getOwnPropertyNames(o).forEach(function(u) {
      Object.defineProperty(n, u, Object.getOwnPropertyDescriptor(o, u));
    }), n;
  }
  return Ir;
}
var rt, Hi;
function Ze() {
  if (Hi) return rt;
  Hi = 1;
  var e = Me, t = Xc(), o = Jc(), n = Yc(), u = $i, a, r;
  typeof Symbol == "function" && typeof Symbol.for == "function" ? (a = Symbol.for("graceful-fs.queue"), r = Symbol.for("graceful-fs.previous")) : (a = "___graceful-fs.queue", r = "___graceful-fs.previous");
  function f() {
  }
  function i(l, h) {
    Object.defineProperty(l, a, {
      get: function() {
        return h;
      }
    });
  }
  var s = f;
  if (u.debuglog ? s = u.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (s = function() {
    var l = u.format.apply(u, arguments);
    l = "GFS4: " + l.split(/\n/).join(`
GFS4: `), console.error(l);
  }), !e[a]) {
    var d = wr[a] || [];
    i(e, d), e.close = function(l) {
      function h(c, m) {
        return l.call(e, c, function(E) {
          E || S(), typeof m == "function" && m.apply(this, arguments);
        });
      }
      return Object.defineProperty(h, r, {
        value: l
      }), h;
    }(e.close), e.closeSync = function(l) {
      function h(c) {
        l.apply(e, arguments), S();
      }
      return Object.defineProperty(h, r, {
        value: l
      }), h;
    }(e.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
      s(e[a]), wc.equal(e[a].length, 0);
    });
  }
  wr[a] || i(wr, e[a]), rt = v(n(e)), process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !e.__patched && (rt = v(e), e.__patched = !0);
  function v(l) {
    t(l), l.gracefulify = v, l.createReadStream = P, l.createWriteStream = q;
    var h = l.readFile;
    l.readFile = c;
    function c(O, F, B) {
      return typeof F == "function" && (B = F, F = null), Z(O, F, B);
      function Z(J, X, D, A) {
        return h(J, X, function(z) {
          z && (z.code === "EMFILE" || z.code === "ENFILE") ? _([Z, [J, X, D], z, A || Date.now(), Date.now()]) : typeof D == "function" && D.apply(this, arguments);
        });
      }
    }
    var m = l.writeFile;
    l.writeFile = E;
    function E(O, F, B, Z) {
      return typeof B == "function" && (Z = B, B = null), J(O, F, B, Z);
      function J(X, D, A, z, H) {
        return m(X, D, A, function(W) {
          W && (W.code === "EMFILE" || W.code === "ENFILE") ? _([J, [X, D, A, z], W, H || Date.now(), Date.now()]) : typeof z == "function" && z.apply(this, arguments);
        });
      }
    }
    var y = l.appendFile;
    y && (l.appendFile = g);
    function g(O, F, B, Z) {
      return typeof B == "function" && (Z = B, B = null), J(O, F, B, Z);
      function J(X, D, A, z, H) {
        return y(X, D, A, function(W) {
          W && (W.code === "EMFILE" || W.code === "ENFILE") ? _([J, [X, D, A, z], W, H || Date.now(), Date.now()]) : typeof z == "function" && z.apply(this, arguments);
        });
      }
    }
    var w = l.copyFile;
    w && (l.copyFile = R);
    function R(O, F, B, Z) {
      return typeof B == "function" && (Z = B, B = 0), J(O, F, B, Z);
      function J(X, D, A, z, H) {
        return w(X, D, A, function(W) {
          W && (W.code === "EMFILE" || W.code === "ENFILE") ? _([J, [X, D, A, z], W, H || Date.now(), Date.now()]) : typeof z == "function" && z.apply(this, arguments);
        });
      }
    }
    var N = l.readdir;
    l.readdir = M;
    var b = /^v[0-5]\./;
    function M(O, F, B) {
      typeof F == "function" && (B = F, F = null);
      var Z = b.test(process.version) ? function(D, A, z, H) {
        return N(D, J(
          D,
          A,
          z,
          H
        ));
      } : function(D, A, z, H) {
        return N(D, A, J(
          D,
          A,
          z,
          H
        ));
      };
      return Z(O, F, B);
      function J(X, D, A, z) {
        return function(H, W) {
          H && (H.code === "EMFILE" || H.code === "ENFILE") ? _([
            Z,
            [X, D, A],
            H,
            z || Date.now(),
            Date.now()
          ]) : (W && W.sort && W.sort(), typeof A == "function" && A.call(this, H, W));
        };
      }
    }
    if (process.version.substr(0, 4) === "v0.8") {
      var G = o(l);
      V = G.ReadStream, j = G.WriteStream;
    }
    var k = l.ReadStream;
    k && (V.prototype = Object.create(k.prototype), V.prototype.open = C);
    var U = l.WriteStream;
    U && (j.prototype = Object.create(U.prototype), j.prototype.open = T), Object.defineProperty(l, "ReadStream", {
      get: function() {
        return V;
      },
      set: function(O) {
        V = O;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(l, "WriteStream", {
      get: function() {
        return j;
      },
      set: function(O) {
        j = O;
      },
      enumerable: !0,
      configurable: !0
    });
    var x = V;
    Object.defineProperty(l, "FileReadStream", {
      get: function() {
        return x;
      },
      set: function(O) {
        x = O;
      },
      enumerable: !0,
      configurable: !0
    });
    var K = j;
    Object.defineProperty(l, "FileWriteStream", {
      get: function() {
        return K;
      },
      set: function(O) {
        K = O;
      },
      enumerable: !0,
      configurable: !0
    });
    function V(O, F) {
      return this instanceof V ? (k.apply(this, arguments), this) : V.apply(Object.create(V.prototype), arguments);
    }
    function C() {
      var O = this;
      I(O.path, O.flags, O.mode, function(F, B) {
        F ? (O.autoClose && O.destroy(), O.emit("error", F)) : (O.fd = B, O.emit("open", B), O.read());
      });
    }
    function j(O, F) {
      return this instanceof j ? (U.apply(this, arguments), this) : j.apply(Object.create(j.prototype), arguments);
    }
    function T() {
      var O = this;
      I(O.path, O.flags, O.mode, function(F, B) {
        F ? (O.destroy(), O.emit("error", F)) : (O.fd = B, O.emit("open", B));
      });
    }
    function P(O, F) {
      return new l.ReadStream(O, F);
    }
    function q(O, F) {
      return new l.WriteStream(O, F);
    }
    var L = l.open;
    l.open = I;
    function I(O, F, B, Z) {
      return typeof B == "function" && (Z = B, B = null), J(O, F, B, Z);
      function J(X, D, A, z, H) {
        return L(X, D, A, function(W, Y) {
          W && (W.code === "EMFILE" || W.code === "ENFILE") ? _([J, [X, D, A, z], W, H || Date.now(), Date.now()]) : typeof z == "function" && z.apply(this, arguments);
        });
      }
    }
    return l;
  }
  function _(l) {
    s("ENQUEUE", l[0].name, l[1]), e[a].push(l), $();
  }
  var p;
  function S() {
    for (var l = Date.now(), h = 0; h < e[a].length; ++h)
      e[a][h].length > 2 && (e[a][h][3] = l, e[a][h][4] = l);
    $();
  }
  function $() {
    if (clearTimeout(p), p = void 0, e[a].length !== 0) {
      var l = e[a].shift(), h = l[0], c = l[1], m = l[2], E = l[3], y = l[4];
      if (E === void 0)
        s("RETRY", h.name, c), h.apply(null, c);
      else if (Date.now() - E >= 6e4) {
        s("TIMEOUT", h.name, c);
        var g = c.pop();
        typeof g == "function" && g.call(null, m);
      } else {
        var w = Date.now() - y, R = Math.max(y - E, 1), N = Math.min(R * 1.2, 100);
        w >= N ? (s("RETRY", h.name, c), h.apply(null, c.concat([E]))) : e[a].push(l);
      }
      p === void 0 && (p = setTimeout($, 0));
    }
  }
  return rt;
}
var Bi;
function he() {
  return Bi || (Bi = 1, function(e) {
    const t = ce().fromCallback, o = Ze(), n = [
      "access",
      "appendFile",
      "chmod",
      "chown",
      "close",
      "copyFile",
      "cp",
      "fchmod",
      "fchown",
      "fdatasync",
      "fstat",
      "fsync",
      "ftruncate",
      "futimes",
      "glob",
      "lchmod",
      "lchown",
      "lutimes",
      "link",
      "lstat",
      "mkdir",
      "mkdtemp",
      "open",
      "opendir",
      "readdir",
      "readFile",
      "readlink",
      "realpath",
      "rename",
      "rm",
      "rmdir",
      "stat",
      "statfs",
      "symlink",
      "truncate",
      "unlink",
      "utimes",
      "writeFile"
    ].filter((u) => typeof o[u] == "function");
    Object.assign(e, o), n.forEach((u) => {
      e[u] = t(o[u]);
    }), e.exists = function(u, a) {
      return typeof a == "function" ? o.exists(u, a) : new Promise((r) => o.exists(u, r));
    }, e.read = function(u, a, r, f, i, s) {
      return typeof s == "function" ? o.read(u, a, r, f, i, s) : new Promise((d, v) => {
        o.read(u, a, r, f, i, (_, p, S) => {
          if (_) return v(_);
          d({ bytesRead: p, buffer: S });
        });
      });
    }, e.write = function(u, a, ...r) {
      return typeof r[r.length - 1] == "function" ? o.write(u, a, ...r) : new Promise((f, i) => {
        o.write(u, a, ...r, (s, d, v) => {
          if (s) return i(s);
          f({ bytesWritten: d, buffer: v });
        });
      });
    }, e.readv = function(u, a, ...r) {
      return typeof r[r.length - 1] == "function" ? o.readv(u, a, ...r) : new Promise((f, i) => {
        o.readv(u, a, ...r, (s, d, v) => {
          if (s) return i(s);
          f({ bytesRead: d, buffers: v });
        });
      });
    }, e.writev = function(u, a, ...r) {
      return typeof r[r.length - 1] == "function" ? o.writev(u, a, ...r) : new Promise((f, i) => {
        o.writev(u, a, ...r, (s, d, v) => {
          if (s) return i(s);
          f({ bytesWritten: d, buffers: v });
        });
      });
    }, typeof o.realpath.native == "function" ? e.realpath.native = t(o.realpath.native) : process.emitWarning(
      "fs.realpath.native is not a function. Is fs being monkey-patched?",
      "Warning",
      "fs-extra-WARN0003"
    );
  }(Sr)), Sr;
}
var nt = {}, Nr = {}, Ki;
function Qc() {
  if (Ki) return Nr;
  Ki = 1;
  const e = ie;
  return Nr.checkPath = function(o) {
    if (process.platform === "win32" && /[<>:"|?*]/.test(o.replace(e.parse(o).root, ""))) {
      const u = new Error(`Path contains invalid characters: ${o}`);
      throw u.code = "EINVAL", u;
    }
  }, Nr;
}
var Wi;
function eu() {
  if (Wi) return nt;
  Wi = 1;
  const e = /* @__PURE__ */ he(), { checkPath: t } = /* @__PURE__ */ Qc(), o = (n) => {
    const u = { mode: 511 };
    return typeof n == "number" ? n : { ...u, ...n }.mode;
  };
  return nt.makeDir = async (n, u) => (t(n), e.mkdir(n, {
    mode: o(u),
    recursive: !0
  })), nt.makeDirSync = (n, u) => (t(n), e.mkdirSync(n, {
    mode: o(u),
    recursive: !0
  })), nt;
}
var Or, Zi;
function $e() {
  if (Zi) return Or;
  Zi = 1;
  const e = ce().fromPromise, { makeDir: t, makeDirSync: o } = /* @__PURE__ */ eu(), n = e(t);
  return Or = {
    mkdirs: n,
    mkdirsSync: o,
    // alias
    mkdirp: n,
    mkdirpSync: o,
    ensureDir: n,
    ensureDirSync: o
  }, Or;
}
var Pr, Xi;
function Fe() {
  if (Xi) return Pr;
  Xi = 1;
  const e = ce().fromPromise, t = /* @__PURE__ */ he();
  function o(n) {
    return t.access(n).then(() => !0).catch(() => !1);
  }
  return Pr = {
    pathExists: e(o),
    pathExistsSync: t.existsSync
  }, Pr;
}
var Tr, Ji;
function Ic() {
  if (Ji) return Tr;
  Ji = 1;
  const e = /* @__PURE__ */ he(), t = ce().fromPromise;
  async function o(u, a, r) {
    const f = await e.open(u, "r+");
    let i = null;
    try {
      await e.futimes(f, a, r);
    } finally {
      try {
        await e.close(f);
      } catch (s) {
        i = s;
      }
    }
    if (i)
      throw i;
  }
  function n(u, a, r) {
    const f = e.openSync(u, "r+");
    return e.futimesSync(f, a, r), e.closeSync(f);
  }
  return Tr = {
    utimesMillis: t(o),
    utimesMillisSync: n
  }, Tr;
}
var br, Yi;
function Ue() {
  if (Yi) return br;
  Yi = 1;
  const e = /* @__PURE__ */ he(), t = ie, o = ce().fromPromise;
  function n(_, p, S) {
    const $ = S.dereference ? (l) => e.stat(l, { bigint: !0 }) : (l) => e.lstat(l, { bigint: !0 });
    return Promise.all([
      $(_),
      $(p).catch((l) => {
        if (l.code === "ENOENT") return null;
        throw l;
      })
    ]).then(([l, h]) => ({ srcStat: l, destStat: h }));
  }
  function u(_, p, S) {
    let $;
    const l = S.dereference ? (c) => e.statSync(c, { bigint: !0 }) : (c) => e.lstatSync(c, { bigint: !0 }), h = l(_);
    try {
      $ = l(p);
    } catch (c) {
      if (c.code === "ENOENT") return { srcStat: h, destStat: null };
      throw c;
    }
    return { srcStat: h, destStat: $ };
  }
  async function a(_, p, S, $) {
    const { srcStat: l, destStat: h } = await n(_, p, $);
    if (h) {
      if (s(l, h)) {
        const c = t.basename(_), m = t.basename(p);
        if (S === "move" && c !== m && c.toLowerCase() === m.toLowerCase())
          return { srcStat: l, destStat: h, isChangingCase: !0 };
        throw new Error("Source and destination must not be the same.");
      }
      if (l.isDirectory() && !h.isDirectory())
        throw new Error(`Cannot overwrite non-directory '${p}' with directory '${_}'.`);
      if (!l.isDirectory() && h.isDirectory())
        throw new Error(`Cannot overwrite directory '${p}' with non-directory '${_}'.`);
    }
    if (l.isDirectory() && d(_, p))
      throw new Error(v(_, p, S));
    return { srcStat: l, destStat: h };
  }
  function r(_, p, S, $) {
    const { srcStat: l, destStat: h } = u(_, p, $);
    if (h) {
      if (s(l, h)) {
        const c = t.basename(_), m = t.basename(p);
        if (S === "move" && c !== m && c.toLowerCase() === m.toLowerCase())
          return { srcStat: l, destStat: h, isChangingCase: !0 };
        throw new Error("Source and destination must not be the same.");
      }
      if (l.isDirectory() && !h.isDirectory())
        throw new Error(`Cannot overwrite non-directory '${p}' with directory '${_}'.`);
      if (!l.isDirectory() && h.isDirectory())
        throw new Error(`Cannot overwrite directory '${p}' with non-directory '${_}'.`);
    }
    if (l.isDirectory() && d(_, p))
      throw new Error(v(_, p, S));
    return { srcStat: l, destStat: h };
  }
  async function f(_, p, S, $) {
    const l = t.resolve(t.dirname(_)), h = t.resolve(t.dirname(S));
    if (h === l || h === t.parse(h).root) return;
    let c;
    try {
      c = await e.stat(h, { bigint: !0 });
    } catch (m) {
      if (m.code === "ENOENT") return;
      throw m;
    }
    if (s(p, c))
      throw new Error(v(_, S, $));
    return f(_, p, h, $);
  }
  function i(_, p, S, $) {
    const l = t.resolve(t.dirname(_)), h = t.resolve(t.dirname(S));
    if (h === l || h === t.parse(h).root) return;
    let c;
    try {
      c = e.statSync(h, { bigint: !0 });
    } catch (m) {
      if (m.code === "ENOENT") return;
      throw m;
    }
    if (s(p, c))
      throw new Error(v(_, S, $));
    return i(_, p, h, $);
  }
  function s(_, p) {
    return p.ino !== void 0 && p.dev !== void 0 && p.ino === _.ino && p.dev === _.dev;
  }
  function d(_, p) {
    const S = t.resolve(_).split(t.sep).filter((l) => l), $ = t.resolve(p).split(t.sep).filter((l) => l);
    return S.every((l, h) => $[h] === l);
  }
  function v(_, p, S) {
    return `Cannot ${S} '${_}' to a subdirectory of itself, '${p}'.`;
  }
  return br = {
    // checkPaths
    checkPaths: o(a),
    checkPathsSync: r,
    // checkParent
    checkParentPaths: o(f),
    checkParentPathsSync: i,
    // Misc
    isSrcSubdir: d,
    areIdentical: s
  }, br;
}
var Dr, Qi;
function tu() {
  if (Qi) return Dr;
  Qi = 1;
  async function e(t, o) {
    const n = [];
    for await (const u of t)
      n.push(
        o(u).then(
          () => null,
          (a) => a ?? new Error("unknown error")
        )
      );
    await Promise.all(
      n.map(
        (u) => u.then((a) => {
          if (a !== null) throw a;
        })
      )
    );
  }
  return Dr = {
    asyncIteratorConcurrentProcess: e
  }, Dr;
}
var Cr, es;
function ru() {
  if (es) return Cr;
  es = 1;
  const e = /* @__PURE__ */ he(), t = ie, { mkdirs: o } = /* @__PURE__ */ $e(), { pathExists: n } = /* @__PURE__ */ Fe(), { utimesMillis: u } = /* @__PURE__ */ Ic(), a = /* @__PURE__ */ Ue(), { asyncIteratorConcurrentProcess: r } = /* @__PURE__ */ tu();
  async function f(l, h, c = {}) {
    typeof c == "function" && (c = { filter: c }), c.clobber = "clobber" in c ? !!c.clobber : !0, c.overwrite = "overwrite" in c ? !!c.overwrite : c.clobber, c.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0001"
    );
    const { srcStat: m, destStat: E } = await a.checkPaths(l, h, "copy", c);
    if (await a.checkParentPaths(l, m, h, "copy"), !await i(l, h, c)) return;
    const g = t.dirname(h);
    await n(g) || await o(g), await s(E, l, h, c);
  }
  async function i(l, h, c) {
    return c.filter ? c.filter(l, h) : !0;
  }
  async function s(l, h, c, m) {
    const y = await (m.dereference ? e.stat : e.lstat)(h);
    if (y.isDirectory()) return S(y, l, h, c, m);
    if (y.isFile() || y.isCharacterDevice() || y.isBlockDevice()) return d(y, l, h, c, m);
    if (y.isSymbolicLink()) return $(l, h, c, m);
    throw y.isSocket() ? new Error(`Cannot copy a socket file: ${h}`) : y.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${h}`) : new Error(`Unknown file: ${h}`);
  }
  async function d(l, h, c, m, E) {
    if (!h) return v(l, c, m, E);
    if (E.overwrite)
      return await e.unlink(m), v(l, c, m, E);
    if (E.errorOnExist)
      throw new Error(`'${m}' already exists`);
  }
  async function v(l, h, c, m) {
    if (await e.copyFile(h, c), m.preserveTimestamps) {
      _(l.mode) && await p(c, l.mode);
      const E = await e.stat(h);
      await u(c, E.atime, E.mtime);
    }
    return e.chmod(c, l.mode);
  }
  function _(l) {
    return (l & 128) === 0;
  }
  function p(l, h) {
    return e.chmod(l, h | 128);
  }
  async function S(l, h, c, m, E) {
    h || await e.mkdir(m), await r(await e.opendir(c), async (y) => {
      const g = t.join(c, y.name), w = t.join(m, y.name);
      if (await i(g, w, E)) {
        const { destStat: N } = await a.checkPaths(g, w, "copy", E);
        await s(N, g, w, E);
      }
    }), h || await e.chmod(m, l.mode);
  }
  async function $(l, h, c, m) {
    let E = await e.readlink(h);
    if (m.dereference && (E = t.resolve(process.cwd(), E)), !l)
      return e.symlink(E, c);
    let y = null;
    try {
      y = await e.readlink(c);
    } catch (g) {
      if (g.code === "EINVAL" || g.code === "UNKNOWN") return e.symlink(E, c);
      throw g;
    }
    if (m.dereference && (y = t.resolve(process.cwd(), y)), a.isSrcSubdir(E, y))
      throw new Error(`Cannot copy '${E}' to a subdirectory of itself, '${y}'.`);
    if (a.isSrcSubdir(y, E))
      throw new Error(`Cannot overwrite '${y}' with '${E}'.`);
    return await e.unlink(c), e.symlink(E, c);
  }
  return Cr = f, Cr;
}
var Lr, ts;
function nu() {
  if (ts) return Lr;
  ts = 1;
  const e = Ze(), t = ie, o = $e().mkdirsSync, n = Ic().utimesMillisSync, u = /* @__PURE__ */ Ue();
  function a(y, g, w) {
    typeof w == "function" && (w = { filter: w }), w = w || {}, w.clobber = "clobber" in w ? !!w.clobber : !0, w.overwrite = "overwrite" in w ? !!w.overwrite : w.clobber, w.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0002"
    );
    const { srcStat: R, destStat: N } = u.checkPathsSync(y, g, "copy", w);
    if (u.checkParentPathsSync(y, R, g, "copy"), w.filter && !w.filter(y, g)) return;
    const b = t.dirname(g);
    return e.existsSync(b) || o(b), r(N, y, g, w);
  }
  function r(y, g, w, R) {
    const b = (R.dereference ? e.statSync : e.lstatSync)(g);
    if (b.isDirectory()) return $(b, y, g, w, R);
    if (b.isFile() || b.isCharacterDevice() || b.isBlockDevice()) return f(b, y, g, w, R);
    if (b.isSymbolicLink()) return m(y, g, w, R);
    throw b.isSocket() ? new Error(`Cannot copy a socket file: ${g}`) : b.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${g}`) : new Error(`Unknown file: ${g}`);
  }
  function f(y, g, w, R, N) {
    return g ? i(y, w, R, N) : s(y, w, R, N);
  }
  function i(y, g, w, R) {
    if (R.overwrite)
      return e.unlinkSync(w), s(y, g, w, R);
    if (R.errorOnExist)
      throw new Error(`'${w}' already exists`);
  }
  function s(y, g, w, R) {
    return e.copyFileSync(g, w), R.preserveTimestamps && d(y.mode, g, w), p(w, y.mode);
  }
  function d(y, g, w) {
    return v(y) && _(w, y), S(g, w);
  }
  function v(y) {
    return (y & 128) === 0;
  }
  function _(y, g) {
    return p(y, g | 128);
  }
  function p(y, g) {
    return e.chmodSync(y, g);
  }
  function S(y, g) {
    const w = e.statSync(y);
    return n(g, w.atime, w.mtime);
  }
  function $(y, g, w, R, N) {
    return g ? h(w, R, N) : l(y.mode, w, R, N);
  }
  function l(y, g, w, R) {
    return e.mkdirSync(w), h(g, w, R), p(w, y);
  }
  function h(y, g, w) {
    const R = e.opendirSync(y);
    try {
      let N;
      for (; (N = R.readSync()) !== null; )
        c(N.name, y, g, w);
    } finally {
      R.closeSync();
    }
  }
  function c(y, g, w, R) {
    const N = t.join(g, y), b = t.join(w, y);
    if (R.filter && !R.filter(N, b)) return;
    const { destStat: M } = u.checkPathsSync(N, b, "copy", R);
    return r(M, N, b, R);
  }
  function m(y, g, w, R) {
    let N = e.readlinkSync(g);
    if (R.dereference && (N = t.resolve(process.cwd(), N)), y) {
      let b;
      try {
        b = e.readlinkSync(w);
      } catch (M) {
        if (M.code === "EINVAL" || M.code === "UNKNOWN") return e.symlinkSync(N, w);
        throw M;
      }
      if (R.dereference && (b = t.resolve(process.cwd(), b)), u.isSrcSubdir(N, b))
        throw new Error(`Cannot copy '${N}' to a subdirectory of itself, '${b}'.`);
      if (u.isSrcSubdir(b, N))
        throw new Error(`Cannot overwrite '${b}' with '${N}'.`);
      return E(N, w);
    } else
      return e.symlinkSync(N, w);
  }
  function E(y, g) {
    return e.unlinkSync(g), e.symlinkSync(y, g);
  }
  return Lr = a, Lr;
}
var Ar, rs;
function Ri() {
  if (rs) return Ar;
  rs = 1;
  const e = ce().fromPromise;
  return Ar = {
    copy: e(/* @__PURE__ */ ru()),
    copySync: /* @__PURE__ */ nu()
  }, Ar;
}
var Fr, ns;
function cr() {
  if (ns) return Fr;
  ns = 1;
  const e = Ze(), t = ce().fromCallback;
  function o(u, a) {
    e.rm(u, { recursive: !0, force: !0 }, a);
  }
  function n(u) {
    e.rmSync(u, { recursive: !0, force: !0 });
  }
  return Fr = {
    remove: t(o),
    removeSync: n
  }, Fr;
}
var qr, is;
function iu() {
  if (is) return qr;
  is = 1;
  const e = ce().fromPromise, t = /* @__PURE__ */ he(), o = ie, n = /* @__PURE__ */ $e(), u = /* @__PURE__ */ cr(), a = e(async function(i) {
    let s;
    try {
      s = await t.readdir(i);
    } catch {
      return n.mkdirs(i);
    }
    return Promise.all(s.map((d) => u.remove(o.join(i, d))));
  });
  function r(f) {
    let i;
    try {
      i = t.readdirSync(f);
    } catch {
      return n.mkdirsSync(f);
    }
    i.forEach((s) => {
      s = o.join(f, s), u.removeSync(s);
    });
  }
  return qr = {
    emptyDirSync: r,
    emptydirSync: r,
    emptyDir: a,
    emptydir: a
  }, qr;
}
var jr, ss;
function su() {
  if (ss) return jr;
  ss = 1;
  const e = ce().fromPromise, t = ie, o = /* @__PURE__ */ he(), n = /* @__PURE__ */ $e();
  async function u(r) {
    let f;
    try {
      f = await o.stat(r);
    } catch {
    }
    if (f && f.isFile()) return;
    const i = t.dirname(r);
    let s = null;
    try {
      s = await o.stat(i);
    } catch (d) {
      if (d.code === "ENOENT") {
        await n.mkdirs(i), await o.writeFile(r, "");
        return;
      } else
        throw d;
    }
    s.isDirectory() ? await o.writeFile(r, "") : await o.readdir(i);
  }
  function a(r) {
    let f;
    try {
      f = o.statSync(r);
    } catch {
    }
    if (f && f.isFile()) return;
    const i = t.dirname(r);
    try {
      o.statSync(i).isDirectory() || o.readdirSync(i);
    } catch (s) {
      if (s && s.code === "ENOENT") n.mkdirsSync(i);
      else throw s;
    }
    o.writeFileSync(r, "");
  }
  return jr = {
    createFile: e(u),
    createFileSync: a
  }, jr;
}
var kr, os;
function ou() {
  if (os) return kr;
  os = 1;
  const e = ce().fromPromise, t = ie, o = /* @__PURE__ */ he(), n = /* @__PURE__ */ $e(), { pathExists: u } = /* @__PURE__ */ Fe(), { areIdentical: a } = /* @__PURE__ */ Ue();
  async function r(i, s) {
    let d;
    try {
      d = await o.lstat(s);
    } catch {
    }
    let v;
    try {
      v = await o.lstat(i);
    } catch (S) {
      throw S.message = S.message.replace("lstat", "ensureLink"), S;
    }
    if (d && a(v, d)) return;
    const _ = t.dirname(s);
    await u(_) || await n.mkdirs(_), await o.link(i, s);
  }
  function f(i, s) {
    let d;
    try {
      d = o.lstatSync(s);
    } catch {
    }
    try {
      const p = o.lstatSync(i);
      if (d && a(p, d)) return;
    } catch (p) {
      throw p.message = p.message.replace("lstat", "ensureLink"), p;
    }
    const v = t.dirname(s);
    return o.existsSync(v) || n.mkdirsSync(v), o.linkSync(i, s);
  }
  return kr = {
    createLink: e(r),
    createLinkSync: f
  }, kr;
}
var Mr, as;
function au() {
  if (as) return Mr;
  as = 1;
  const e = ie, t = /* @__PURE__ */ he(), { pathExists: o } = /* @__PURE__ */ Fe(), n = ce().fromPromise;
  async function u(r, f) {
    if (e.isAbsolute(r)) {
      try {
        await t.lstat(r);
      } catch (v) {
        throw v.message = v.message.replace("lstat", "ensureSymlink"), v;
      }
      return {
        toCwd: r,
        toDst: r
      };
    }
    const i = e.dirname(f), s = e.join(i, r);
    if (await o(s))
      return {
        toCwd: s,
        toDst: r
      };
    try {
      await t.lstat(r);
    } catch (v) {
      throw v.message = v.message.replace("lstat", "ensureSymlink"), v;
    }
    return {
      toCwd: r,
      toDst: e.relative(i, r)
    };
  }
  function a(r, f) {
    if (e.isAbsolute(r)) {
      if (!t.existsSync(r)) throw new Error("absolute srcpath does not exist");
      return {
        toCwd: r,
        toDst: r
      };
    }
    const i = e.dirname(f), s = e.join(i, r);
    if (t.existsSync(s))
      return {
        toCwd: s,
        toDst: r
      };
    if (!t.existsSync(r)) throw new Error("relative srcpath does not exist");
    return {
      toCwd: r,
      toDst: e.relative(i, r)
    };
  }
  return Mr = {
    symlinkPaths: n(u),
    symlinkPathsSync: a
  }, Mr;
}
var Ur, cs;
function cu() {
  if (cs) return Ur;
  cs = 1;
  const e = /* @__PURE__ */ he(), t = ce().fromPromise;
  async function o(u, a) {
    if (a) return a;
    let r;
    try {
      r = await e.lstat(u);
    } catch {
      return "file";
    }
    return r && r.isDirectory() ? "dir" : "file";
  }
  function n(u, a) {
    if (a) return a;
    let r;
    try {
      r = e.lstatSync(u);
    } catch {
      return "file";
    }
    return r && r.isDirectory() ? "dir" : "file";
  }
  return Ur = {
    symlinkType: t(o),
    symlinkTypeSync: n
  }, Ur;
}
var xr, us;
function uu() {
  if (us) return xr;
  us = 1;
  const e = ce().fromPromise, t = ie, o = /* @__PURE__ */ he(), { mkdirs: n, mkdirsSync: u } = /* @__PURE__ */ $e(), { symlinkPaths: a, symlinkPathsSync: r } = /* @__PURE__ */ au(), { symlinkType: f, symlinkTypeSync: i } = /* @__PURE__ */ cu(), { pathExists: s } = /* @__PURE__ */ Fe(), { areIdentical: d } = /* @__PURE__ */ Ue();
  async function v(p, S, $) {
    let l;
    try {
      l = await o.lstat(S);
    } catch {
    }
    if (l && l.isSymbolicLink()) {
      const [E, y] = await Promise.all([
        o.stat(p),
        o.stat(S)
      ]);
      if (d(E, y)) return;
    }
    const h = await a(p, S);
    p = h.toDst;
    const c = await f(h.toCwd, $), m = t.dirname(S);
    return await s(m) || await n(m), o.symlink(p, S, c);
  }
  function _(p, S, $) {
    let l;
    try {
      l = o.lstatSync(S);
    } catch {
    }
    if (l && l.isSymbolicLink()) {
      const E = o.statSync(p), y = o.statSync(S);
      if (d(E, y)) return;
    }
    const h = r(p, S);
    p = h.toDst, $ = i(h.toCwd, $);
    const c = t.dirname(S);
    return o.existsSync(c) || u(c), o.symlinkSync(p, S, $);
  }
  return xr = {
    createSymlink: e(v),
    createSymlinkSync: _
  }, xr;
}
var zr, fs;
function fu() {
  if (fs) return zr;
  fs = 1;
  const { createFile: e, createFileSync: t } = /* @__PURE__ */ su(), { createLink: o, createLinkSync: n } = /* @__PURE__ */ ou(), { createSymlink: u, createSymlinkSync: a } = /* @__PURE__ */ uu();
  return zr = {
    // file
    createFile: e,
    createFileSync: t,
    ensureFile: e,
    ensureFileSync: t,
    // link
    createLink: o,
    createLinkSync: n,
    ensureLink: o,
    ensureLinkSync: n,
    // symlink
    createSymlink: u,
    createSymlinkSync: a,
    ensureSymlink: u,
    ensureSymlinkSync: a
  }, zr;
}
var Vr, ls;
function Ii() {
  if (ls) return Vr;
  ls = 1;
  function e(o, { EOL: n = `
`, finalEOL: u = !0, replacer: a = null, spaces: r } = {}) {
    const f = u ? n : "";
    return JSON.stringify(o, a, r).replace(/\n/g, n) + f;
  }
  function t(o) {
    return Buffer.isBuffer(o) && (o = o.toString("utf8")), o.replace(/^\uFEFF/, "");
  }
  return Vr = { stringify: e, stripBom: t }, Vr;
}
var Gr, ds;
function lu() {
  if (ds) return Gr;
  ds = 1;
  let e;
  try {
    e = Ze();
  } catch {
    e = Me;
  }
  const t = ce(), { stringify: o, stripBom: n } = Ii();
  async function u(v, _ = {}) {
    typeof _ == "string" && (_ = { encoding: _ });
    const p = _.fs || e, S = "throws" in _ ? _.throws : !0;
    let $ = await t.fromCallback(p.readFile)(v, _);
    $ = n($);
    let l;
    try {
      l = JSON.parse($, _ ? _.reviver : null);
    } catch (h) {
      if (S)
        throw h.message = `${v}: ${h.message}`, h;
      return null;
    }
    return l;
  }
  const a = t.fromPromise(u);
  function r(v, _ = {}) {
    typeof _ == "string" && (_ = { encoding: _ });
    const p = _.fs || e, S = "throws" in _ ? _.throws : !0;
    try {
      let $ = p.readFileSync(v, _);
      return $ = n($), JSON.parse($, _.reviver);
    } catch ($) {
      if (S)
        throw $.message = `${v}: ${$.message}`, $;
      return null;
    }
  }
  async function f(v, _, p = {}) {
    const S = p.fs || e, $ = o(_, p);
    await t.fromCallback(S.writeFile)(v, $, p);
  }
  const i = t.fromPromise(f);
  function s(v, _, p = {}) {
    const S = p.fs || e, $ = o(_, p);
    return S.writeFileSync(v, $, p);
  }
  return Gr = {
    readFile: a,
    readFileSync: r,
    writeFile: i,
    writeFileSync: s
  }, Gr;
}
var Hr, hs;
function du() {
  if (hs) return Hr;
  hs = 1;
  const e = lu();
  return Hr = {
    // jsonfile exports
    readJson: e.readFile,
    readJsonSync: e.readFileSync,
    writeJson: e.writeFile,
    writeJsonSync: e.writeFileSync
  }, Hr;
}
var Br, ms;
function Ni() {
  if (ms) return Br;
  ms = 1;
  const e = ce().fromPromise, t = /* @__PURE__ */ he(), o = ie, n = /* @__PURE__ */ $e(), u = Fe().pathExists;
  async function a(f, i, s = "utf-8") {
    const d = o.dirname(f);
    return await u(d) || await n.mkdirs(d), t.writeFile(f, i, s);
  }
  function r(f, ...i) {
    const s = o.dirname(f);
    t.existsSync(s) || n.mkdirsSync(s), t.writeFileSync(f, ...i);
  }
  return Br = {
    outputFile: e(a),
    outputFileSync: r
  }, Br;
}
var Kr, ps;
function hu() {
  if (ps) return Kr;
  ps = 1;
  const { stringify: e } = Ii(), { outputFile: t } = /* @__PURE__ */ Ni();
  async function o(n, u, a = {}) {
    const r = e(u, a);
    await t(n, r, a);
  }
  return Kr = o, Kr;
}
var Wr, ys;
function mu() {
  if (ys) return Wr;
  ys = 1;
  const { stringify: e } = Ii(), { outputFileSync: t } = /* @__PURE__ */ Ni();
  function o(n, u, a) {
    const r = e(u, a);
    t(n, r, a);
  }
  return Wr = o, Wr;
}
var Zr, Es;
function pu() {
  if (Es) return Zr;
  Es = 1;
  const e = ce().fromPromise, t = /* @__PURE__ */ du();
  return t.outputJson = e(/* @__PURE__ */ hu()), t.outputJsonSync = /* @__PURE__ */ mu(), t.outputJSON = t.outputJson, t.outputJSONSync = t.outputJsonSync, t.writeJSON = t.writeJson, t.writeJSONSync = t.writeJsonSync, t.readJSON = t.readJson, t.readJSONSync = t.readJsonSync, Zr = t, Zr;
}
var Xr, vs;
function yu() {
  if (vs) return Xr;
  vs = 1;
  const e = /* @__PURE__ */ he(), t = ie, { copy: o } = /* @__PURE__ */ Ri(), { remove: n } = /* @__PURE__ */ cr(), { mkdirp: u } = /* @__PURE__ */ $e(), { pathExists: a } = /* @__PURE__ */ Fe(), r = /* @__PURE__ */ Ue();
  async function f(d, v, _ = {}) {
    const p = _.overwrite || _.clobber || !1, { srcStat: S, isChangingCase: $ = !1 } = await r.checkPaths(d, v, "move", _);
    await r.checkParentPaths(d, S, v, "move");
    const l = t.dirname(v);
    return t.parse(l).root !== l && await u(l), i(d, v, p, $);
  }
  async function i(d, v, _, p) {
    if (!p) {
      if (_)
        await n(v);
      else if (await a(v))
        throw new Error("dest already exists.");
    }
    try {
      await e.rename(d, v);
    } catch (S) {
      if (S.code !== "EXDEV")
        throw S;
      await s(d, v, _);
    }
  }
  async function s(d, v, _) {
    return await o(d, v, {
      overwrite: _,
      errorOnExist: !0,
      preserveTimestamps: !0
    }), n(d);
  }
  return Xr = f, Xr;
}
var Jr, gs;
function Eu() {
  if (gs) return Jr;
  gs = 1;
  const e = Ze(), t = ie, o = Ri().copySync, n = cr().removeSync, u = $e().mkdirpSync, a = /* @__PURE__ */ Ue();
  function r(v, _, p) {
    p = p || {};
    const S = p.overwrite || p.clobber || !1, { srcStat: $, isChangingCase: l = !1 } = a.checkPathsSync(v, _, "move", p);
    return a.checkParentPathsSync(v, $, _, "move"), f(_) || u(t.dirname(_)), i(v, _, S, l);
  }
  function f(v) {
    const _ = t.dirname(v);
    return t.parse(_).root === _;
  }
  function i(v, _, p, S) {
    if (S) return s(v, _, p);
    if (p)
      return n(_), s(v, _, p);
    if (e.existsSync(_)) throw new Error("dest already exists.");
    return s(v, _, p);
  }
  function s(v, _, p) {
    try {
      e.renameSync(v, _);
    } catch (S) {
      if (S.code !== "EXDEV") throw S;
      return d(v, _, p);
    }
  }
  function d(v, _, p) {
    return o(v, _, {
      overwrite: p,
      errorOnExist: !0,
      preserveTimestamps: !0
    }), n(v);
  }
  return Jr = r, Jr;
}
var Yr, _s;
function vu() {
  if (_s) return Yr;
  _s = 1;
  const e = ce().fromPromise;
  return Yr = {
    move: e(/* @__PURE__ */ yu()),
    moveSync: /* @__PURE__ */ Eu()
  }, Yr;
}
var Qr, ws;
function gu() {
  return ws || (ws = 1, Qr = {
    // Export promiseified graceful-fs:
    .../* @__PURE__ */ he(),
    // Export extra methods:
    .../* @__PURE__ */ Ri(),
    .../* @__PURE__ */ iu(),
    .../* @__PURE__ */ fu(),
    .../* @__PURE__ */ pu(),
    .../* @__PURE__ */ $e(),
    .../* @__PURE__ */ vu(),
    .../* @__PURE__ */ Ni(),
    .../* @__PURE__ */ Fe(),
    .../* @__PURE__ */ cr()
  }), Qr;
}
var ye = /* @__PURE__ */ gu();
class _u {
  constructor() {
    this.listeners = [], this.handlers = [];
  }
  /**
   * Listen to `channel`.
   */
  on(t, o) {
    this.listeners.push(t), Qe.on(t, o);
  }
  /**
   * Handle a renderer invoke request.
   */
  handle(t, o) {
    this.handlers.push(t), Qe.handle(t, o);
  }
  /**
   * Dispose all listeners and handlers.
   */
  dispose() {
    this.listeners.forEach((t) => Qe.removeAllListeners(t)), this.listeners = [], this.handlers.forEach((t) => Qe.removeHandler(t)), this.handlers = [];
  }
}
class wu {
  /**
   * Send an asynchronous message to the renderer process.
   */
  send(t, o, ...n) {
    t.send(o, ...n);
  }
}
var We = { exports: {} }, en, Ss;
function Su() {
  return Ss || (Ss = 1, en = (e) => {
    const t = typeof e;
    return e !== null && (t === "object" || t === "function");
  }), en;
}
var tn, $s;
function $u() {
  if ($s) return tn;
  $s = 1;
  const e = Su(), t = /* @__PURE__ */ new Set([
    "__proto__",
    "prototype",
    "constructor"
  ]), o = (u) => !u.some((a) => t.has(a));
  function n(u) {
    const a = u.split("."), r = [];
    for (let f = 0; f < a.length; f++) {
      let i = a[f];
      for (; i[i.length - 1] === "\\" && a[f + 1] !== void 0; )
        i = i.slice(0, -1) + ".", i += a[++f];
      r.push(i);
    }
    return o(r) ? r : [];
  }
  return tn = {
    get(u, a, r) {
      if (!e(u) || typeof a != "string")
        return r === void 0 ? u : r;
      const f = n(a);
      if (f.length !== 0) {
        for (let i = 0; i < f.length; i++)
          if (u = u[f[i]], u == null) {
            if (i !== f.length - 1)
              return r;
            break;
          }
        return u === void 0 ? r : u;
      }
    },
    set(u, a, r) {
      if (!e(u) || typeof a != "string")
        return u;
      const f = u, i = n(a);
      for (let s = 0; s < i.length; s++) {
        const d = i[s];
        e(u[d]) || (u[d] = {}), s === i.length - 1 && (u[d] = r), u = u[d];
      }
      return f;
    },
    delete(u, a) {
      if (!e(u) || typeof a != "string")
        return !1;
      const r = n(a);
      for (let f = 0; f < r.length; f++) {
        const i = r[f];
        if (f === r.length - 1)
          return delete u[i], !0;
        if (u = u[i], !e(u))
          return !1;
      }
    },
    has(u, a) {
      if (!e(u) || typeof a != "string")
        return !1;
      const r = n(a);
      if (r.length === 0)
        return !1;
      for (let f = 0; f < r.length; f++)
        if (e(u)) {
          if (!(r[f] in u))
            return !1;
          u = u[r[f]];
        } else
          return !1;
      return !0;
    }
  }, tn;
}
var it = { exports: {} }, st = { exports: {} }, ot = { exports: {} }, at = { exports: {} }, Rs;
function Ru() {
  if (Rs) return at.exports;
  Rs = 1;
  const e = Me;
  return at.exports = (t) => new Promise((o) => {
    e.access(t, (n) => {
      o(!n);
    });
  }), at.exports.sync = (t) => {
    try {
      return e.accessSync(t), !0;
    } catch {
      return !1;
    }
  }, at.exports;
}
var ct = { exports: {} }, ut = { exports: {} }, Is;
function Iu() {
  if (Is) return ut.exports;
  Is = 1;
  const e = (t, ...o) => new Promise((n) => {
    n(t(...o));
  });
  return ut.exports = e, ut.exports.default = e, ut.exports;
}
var Ns;
function Nu() {
  if (Ns) return ct.exports;
  Ns = 1;
  const e = Iu(), t = (o) => {
    if (!((Number.isInteger(o) || o === 1 / 0) && o > 0))
      return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
    const n = [];
    let u = 0;
    const a = () => {
      u--, n.length > 0 && n.shift()();
    }, r = (s, d, ...v) => {
      u++;
      const _ = e(s, ...v);
      d(_), _.then(a, a);
    }, f = (s, d, ...v) => {
      u < o ? r(s, d, ...v) : n.push(r.bind(null, s, d, ...v));
    }, i = (s, ...d) => new Promise((v) => f(s, v, ...d));
    return Object.defineProperties(i, {
      activeCount: {
        get: () => u
      },
      pendingCount: {
        get: () => n.length
      },
      clearQueue: {
        value: () => {
          n.length = 0;
        }
      }
    }), i;
  };
  return ct.exports = t, ct.exports.default = t, ct.exports;
}
var rn, Os;
function Ou() {
  if (Os) return rn;
  Os = 1;
  const e = Nu();
  class t extends Error {
    constructor(a) {
      super(), this.value = a;
    }
  }
  const o = (u, a) => Promise.resolve(u).then(a), n = (u) => Promise.all(u).then((a) => a[1] === !0 && Promise.reject(new t(a[0])));
  return rn = (u, a, r) => {
    r = Object.assign({
      concurrency: 1 / 0,
      preserveOrder: !0
    }, r);
    const f = e(r.concurrency), i = [...u].map((d) => [d, f(o, d, a)]), s = e(r.preserveOrder ? 1 : 1 / 0);
    return Promise.all(i.map((d) => s(n, d))).then(() => {
    }).catch((d) => d instanceof t ? d.value : Promise.reject(d));
  }, rn;
}
var Ps;
function Pu() {
  if (Ps) return ot.exports;
  Ps = 1;
  const e = ie, t = Ru(), o = Ou();
  return ot.exports = (n, u) => (u = Object.assign({
    cwd: process.cwd()
  }, u), o(n, (a) => t(e.resolve(u.cwd, a)), u)), ot.exports.sync = (n, u) => {
    u = Object.assign({
      cwd: process.cwd()
    }, u);
    for (const a of n)
      if (t.sync(e.resolve(u.cwd, a)))
        return a;
  }, ot.exports;
}
var Ts;
function Tu() {
  if (Ts) return st.exports;
  Ts = 1;
  const e = ie, t = Pu();
  return st.exports = (o, n = {}) => {
    const u = e.resolve(n.cwd || ""), { root: a } = e.parse(u), r = [].concat(o);
    return new Promise((f) => {
      (function i(s) {
        t(r, { cwd: s }).then((d) => {
          d ? f(e.join(s, d)) : s === a ? f(null) : i(e.dirname(s));
        });
      })(u);
    });
  }, st.exports.sync = (o, n = {}) => {
    let u = e.resolve(n.cwd || "");
    const { root: a } = e.parse(u), r = [].concat(o);
    for (; ; ) {
      const f = t.sync(r, { cwd: u });
      if (f)
        return e.join(u, f);
      if (u === a)
        return null;
      u = e.dirname(u);
    }
  }, st.exports;
}
var bs;
function bu() {
  if (bs) return it.exports;
  bs = 1;
  const e = Tu();
  return it.exports = async ({ cwd: t } = {}) => e("package.json", { cwd: t }), it.exports.sync = ({ cwd: t } = {}) => e.sync("package.json", { cwd: t }), it.exports;
}
var ft = { exports: {} }, Ds;
function Du() {
  if (Ds) return ft.exports;
  Ds = 1;
  const e = ie, t = Zc, o = t.homedir(), n = t.tmpdir(), { env: u } = process, a = (s) => {
    const d = e.join(o, "Library");
    return {
      data: e.join(d, "Application Support", s),
      config: e.join(d, "Preferences", s),
      cache: e.join(d, "Caches", s),
      log: e.join(d, "Logs", s),
      temp: e.join(n, s)
    };
  }, r = (s) => {
    const d = u.APPDATA || e.join(o, "AppData", "Roaming"), v = u.LOCALAPPDATA || e.join(o, "AppData", "Local");
    return {
      // Data/config/cache/log are invented by me as Windows isn't opinionated about this
      data: e.join(v, s, "Data"),
      config: e.join(d, s, "Config"),
      cache: e.join(v, s, "Cache"),
      log: e.join(v, s, "Log"),
      temp: e.join(n, s)
    };
  }, f = (s) => {
    const d = e.basename(o);
    return {
      data: e.join(u.XDG_DATA_HOME || e.join(o, ".local", "share"), s),
      config: e.join(u.XDG_CONFIG_HOME || e.join(o, ".config"), s),
      cache: e.join(u.XDG_CACHE_HOME || e.join(o, ".cache"), s),
      // https://wiki.debian.org/XDGBaseDirectorySpecification#state
      log: e.join(u.XDG_STATE_HOME || e.join(o, ".local", "state"), s),
      temp: e.join(n, d, s)
    };
  }, i = (s, d) => {
    if (typeof s != "string")
      throw new TypeError(`Expected string, got ${typeof s}`);
    return d = Object.assign({ suffix: "nodejs" }, d), d.suffix && (s += `-${d.suffix}`), process.platform === "darwin" ? a(s) : process.platform === "win32" ? r(s) : f(s);
  };
  return ft.exports = i, ft.exports.default = i, ft.exports;
}
var ve = {}, ne = {}, Cs;
function Xe() {
  if (Cs) return ne;
  Cs = 1, Object.defineProperty(ne, "__esModule", { value: !0 }), ne.NOOP = ne.LIMIT_FILES_DESCRIPTORS = ne.LIMIT_BASENAME_LENGTH = ne.IS_USER_ROOT = ne.IS_POSIX = ne.DEFAULT_TIMEOUT_SYNC = ne.DEFAULT_TIMEOUT_ASYNC = ne.DEFAULT_WRITE_OPTIONS = ne.DEFAULT_READ_OPTIONS = ne.DEFAULT_FOLDER_MODE = ne.DEFAULT_FILE_MODE = ne.DEFAULT_ENCODING = void 0;
  const e = "utf8";
  ne.DEFAULT_ENCODING = e;
  const t = 438;
  ne.DEFAULT_FILE_MODE = t;
  const o = 511;
  ne.DEFAULT_FOLDER_MODE = o;
  const n = {};
  ne.DEFAULT_READ_OPTIONS = n;
  const u = {};
  ne.DEFAULT_WRITE_OPTIONS = u;
  const a = 5e3;
  ne.DEFAULT_TIMEOUT_ASYNC = a;
  const r = 100;
  ne.DEFAULT_TIMEOUT_SYNC = r;
  const f = !!process.getuid;
  ne.IS_POSIX = f;
  const i = process.getuid ? !process.getuid() : !1;
  ne.IS_USER_ROOT = i;
  const s = 128;
  ne.LIMIT_BASENAME_LENGTH = s;
  const d = 1e4;
  ne.LIMIT_FILES_DESCRIPTORS = d;
  const v = () => {
  };
  return ne.NOOP = v, ne;
}
var lt = {}, Te = {}, Ls;
function Cu() {
  if (Ls) return Te;
  Ls = 1, Object.defineProperty(Te, "__esModule", { value: !0 }), Te.attemptifySync = Te.attemptifyAsync = void 0;
  const e = Xe(), t = (n, u = e.NOOP) => function() {
    return n.apply(void 0, arguments).catch(u);
  };
  Te.attemptifyAsync = t;
  const o = (n, u = e.NOOP) => function() {
    try {
      return n.apply(void 0, arguments);
    } catch (a) {
      return u(a);
    }
  };
  return Te.attemptifySync = o, Te;
}
var dt = {}, As;
function Lu() {
  if (As) return dt;
  As = 1, Object.defineProperty(dt, "__esModule", { value: !0 });
  const e = Xe(), t = {
    isChangeErrorOk: (o) => {
      const { code: n } = o;
      return n === "ENOSYS" || !e.IS_USER_ROOT && (n === "EINVAL" || n === "EPERM");
    },
    isRetriableError: (o) => {
      const { code: n } = o;
      return n === "EMFILE" || n === "ENFILE" || n === "EAGAIN" || n === "EBUSY" || n === "EACCESS" || n === "EACCS" || n === "EPERM";
    },
    onChangeError: (o) => {
      if (!t.isChangeErrorOk(o))
        throw o;
    }
  };
  return dt.default = t, dt;
}
var be = {}, ht = {}, Fs;
function Au() {
  if (Fs) return ht;
  Fs = 1, Object.defineProperty(ht, "__esModule", { value: !0 });
  const t = {
    interval: 25,
    intervalId: void 0,
    limit: Xe().LIMIT_FILES_DESCRIPTORS,
    queueActive: /* @__PURE__ */ new Set(),
    queueWaiting: /* @__PURE__ */ new Set(),
    init: () => {
      t.intervalId || (t.intervalId = setInterval(t.tick, t.interval));
    },
    reset: () => {
      t.intervalId && (clearInterval(t.intervalId), delete t.intervalId);
    },
    add: (o) => {
      t.queueWaiting.add(o), t.queueActive.size < t.limit / 2 ? t.tick() : t.init();
    },
    remove: (o) => {
      t.queueWaiting.delete(o), t.queueActive.delete(o);
    },
    schedule: () => new Promise((o) => {
      const n = () => t.remove(u), u = () => o(n);
      t.add(u);
    }),
    tick: () => {
      if (!(t.queueActive.size >= t.limit)) {
        if (!t.queueWaiting.size)
          return t.reset();
        for (const o of t.queueWaiting) {
          if (t.queueActive.size >= t.limit)
            break;
          t.queueWaiting.delete(o), t.queueActive.add(o), o();
        }
      }
    }
  };
  return ht.default = t, ht;
}
var qs;
function Fu() {
  if (qs) return be;
  qs = 1, Object.defineProperty(be, "__esModule", { value: !0 }), be.retryifySync = be.retryifyAsync = void 0;
  const e = Au(), t = (n, u) => function(a) {
    return function r() {
      return e.default.schedule().then((f) => n.apply(void 0, arguments).then((i) => (f(), i), (i) => {
        if (f(), Date.now() >= a)
          throw i;
        if (u(i)) {
          const s = Math.round(100 + 400 * Math.random());
          return new Promise((v) => setTimeout(v, s)).then(() => r.apply(void 0, arguments));
        }
        throw i;
      }));
    };
  };
  be.retryifyAsync = t;
  const o = (n, u) => function(a) {
    return function r() {
      try {
        return n.apply(void 0, arguments);
      } catch (f) {
        if (Date.now() > a)
          throw f;
        if (u(f))
          return r.apply(void 0, arguments);
        throw f;
      }
    };
  };
  return be.retryifySync = o, be;
}
var js;
function Nc() {
  if (js) return lt;
  js = 1, Object.defineProperty(lt, "__esModule", { value: !0 });
  const e = Me, t = $i, o = Cu(), n = Lu(), u = Fu(), a = {
    chmodAttempt: o.attemptifyAsync(t.promisify(e.chmod), n.default.onChangeError),
    chownAttempt: o.attemptifyAsync(t.promisify(e.chown), n.default.onChangeError),
    closeAttempt: o.attemptifyAsync(t.promisify(e.close)),
    fsyncAttempt: o.attemptifyAsync(t.promisify(e.fsync)),
    mkdirAttempt: o.attemptifyAsync(t.promisify(e.mkdir)),
    realpathAttempt: o.attemptifyAsync(t.promisify(e.realpath)),
    statAttempt: o.attemptifyAsync(t.promisify(e.stat)),
    unlinkAttempt: o.attemptifyAsync(t.promisify(e.unlink)),
    closeRetry: u.retryifyAsync(t.promisify(e.close), n.default.isRetriableError),
    fsyncRetry: u.retryifyAsync(t.promisify(e.fsync), n.default.isRetriableError),
    openRetry: u.retryifyAsync(t.promisify(e.open), n.default.isRetriableError),
    readFileRetry: u.retryifyAsync(t.promisify(e.readFile), n.default.isRetriableError),
    renameRetry: u.retryifyAsync(t.promisify(e.rename), n.default.isRetriableError),
    statRetry: u.retryifyAsync(t.promisify(e.stat), n.default.isRetriableError),
    writeRetry: u.retryifyAsync(t.promisify(e.write), n.default.isRetriableError),
    chmodSyncAttempt: o.attemptifySync(e.chmodSync, n.default.onChangeError),
    chownSyncAttempt: o.attemptifySync(e.chownSync, n.default.onChangeError),
    closeSyncAttempt: o.attemptifySync(e.closeSync),
    mkdirSyncAttempt: o.attemptifySync(e.mkdirSync),
    realpathSyncAttempt: o.attemptifySync(e.realpathSync),
    statSyncAttempt: o.attemptifySync(e.statSync),
    unlinkSyncAttempt: o.attemptifySync(e.unlinkSync),
    closeSyncRetry: u.retryifySync(e.closeSync, n.default.isRetriableError),
    fsyncSyncRetry: u.retryifySync(e.fsyncSync, n.default.isRetriableError),
    openSyncRetry: u.retryifySync(e.openSync, n.default.isRetriableError),
    readFileSyncRetry: u.retryifySync(e.readFileSync, n.default.isRetriableError),
    renameSyncRetry: u.retryifySync(e.renameSync, n.default.isRetriableError),
    statSyncRetry: u.retryifySync(e.statSync, n.default.isRetriableError),
    writeSyncRetry: u.retryifySync(e.writeSync, n.default.isRetriableError)
  };
  return lt.default = a, lt;
}
var mt = {}, ks;
function qu() {
  if (ks) return mt;
  ks = 1, Object.defineProperty(mt, "__esModule", { value: !0 });
  const e = {
    isFunction: (t) => typeof t == "function",
    isString: (t) => typeof t == "string",
    isUndefined: (t) => typeof t > "u"
  };
  return mt.default = e, mt;
}
var pt = {}, Ms;
function ju() {
  if (Ms) return pt;
  Ms = 1, Object.defineProperty(pt, "__esModule", { value: !0 });
  const e = {}, t = {
    next: (o) => {
      const n = e[o];
      if (!n)
        return;
      n.shift();
      const u = n[0];
      u ? u(() => t.next(o)) : delete e[o];
    },
    schedule: (o) => new Promise((n) => {
      let u = e[o];
      u || (u = e[o] = []), u.push(n), !(u.length > 1) && n(() => t.next(o));
    })
  };
  return pt.default = t, pt;
}
var yt = {}, Us;
function ku() {
  if (Us) return yt;
  Us = 1, Object.defineProperty(yt, "__esModule", { value: !0 });
  const e = ie, t = Xe(), o = Nc(), n = {
    store: {},
    create: (u) => {
      const a = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), r = Date.now().toString().slice(-10), f = "tmp-", i = `.${f}${r}${a}`;
      return `${u}${i}`;
    },
    get: (u, a, r = !0) => {
      const f = n.truncate(a(u));
      return f in n.store ? n.get(u, a, r) : (n.store[f] = r, [f, () => delete n.store[f]]);
    },
    purge: (u) => {
      n.store[u] && (delete n.store[u], o.default.unlinkAttempt(u));
    },
    purgeSync: (u) => {
      n.store[u] && (delete n.store[u], o.default.unlinkSyncAttempt(u));
    },
    purgeSyncAll: () => {
      for (const u in n.store)
        n.purgeSync(u);
    },
    truncate: (u) => {
      const a = e.basename(u);
      if (a.length <= t.LIMIT_BASENAME_LENGTH)
        return u;
      const r = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(a);
      if (!r)
        return u;
      const f = a.length - t.LIMIT_BASENAME_LENGTH;
      return `${u.slice(0, -a.length)}${r[1]}${r[2].slice(0, -f)}${r[3]}`;
    }
  };
  return process.on("exit", n.purgeSyncAll), yt.default = n, yt;
}
var xs;
function Mu() {
  if (xs) return ve;
  xs = 1, Object.defineProperty(ve, "__esModule", { value: !0 }), ve.writeFileSync = ve.writeFile = ve.readFileSync = ve.readFile = void 0;
  const e = ie, t = Xe(), o = Nc(), n = qu(), u = ju(), a = ku();
  function r(v, _ = t.DEFAULT_READ_OPTIONS) {
    var p;
    if (n.default.isString(_))
      return r(v, { encoding: _ });
    const S = Date.now() + ((p = _.timeout) !== null && p !== void 0 ? p : t.DEFAULT_TIMEOUT_ASYNC);
    return o.default.readFileRetry(S)(v, _);
  }
  ve.readFile = r;
  function f(v, _ = t.DEFAULT_READ_OPTIONS) {
    var p;
    if (n.default.isString(_))
      return f(v, { encoding: _ });
    const S = Date.now() + ((p = _.timeout) !== null && p !== void 0 ? p : t.DEFAULT_TIMEOUT_SYNC);
    return o.default.readFileSyncRetry(S)(v, _);
  }
  ve.readFileSync = f;
  const i = (v, _, p, S) => {
    if (n.default.isFunction(p))
      return i(v, _, t.DEFAULT_WRITE_OPTIONS, p);
    const $ = s(v, _, p);
    return S && $.then(S, S), $;
  };
  ve.writeFile = i;
  const s = async (v, _, p = t.DEFAULT_WRITE_OPTIONS) => {
    var S;
    if (n.default.isString(p))
      return s(v, _, { encoding: p });
    const $ = Date.now() + ((S = p.timeout) !== null && S !== void 0 ? S : t.DEFAULT_TIMEOUT_ASYNC);
    let l = null, h = null, c = null, m = null, E = null;
    try {
      p.schedule && (l = await p.schedule(v)), h = await u.default.schedule(v), v = await o.default.realpathAttempt(v) || v, [m, c] = a.default.get(v, p.tmpCreate || a.default.create, p.tmpPurge !== !1);
      const y = t.IS_POSIX && n.default.isUndefined(p.chown), g = n.default.isUndefined(p.mode);
      if (y || g) {
        const R = await o.default.statAttempt(v);
        R && (p = { ...p }, y && (p.chown = { uid: R.uid, gid: R.gid }), g && (p.mode = R.mode));
      }
      const w = e.dirname(v);
      await o.default.mkdirAttempt(w, {
        mode: t.DEFAULT_FOLDER_MODE,
        recursive: !0
      }), E = await o.default.openRetry($)(m, "w", p.mode || t.DEFAULT_FILE_MODE), p.tmpCreated && p.tmpCreated(m), n.default.isString(_) ? await o.default.writeRetry($)(E, _, 0, p.encoding || t.DEFAULT_ENCODING) : n.default.isUndefined(_) || await o.default.writeRetry($)(E, _, 0, _.length, 0), p.fsync !== !1 && (p.fsyncWait !== !1 ? await o.default.fsyncRetry($)(E) : o.default.fsyncAttempt(E)), await o.default.closeRetry($)(E), E = null, p.chown && await o.default.chownAttempt(m, p.chown.uid, p.chown.gid), p.mode && await o.default.chmodAttempt(m, p.mode);
      try {
        await o.default.renameRetry($)(m, v);
      } catch (R) {
        if (R.code !== "ENAMETOOLONG")
          throw R;
        await o.default.renameRetry($)(m, a.default.truncate(v));
      }
      c(), m = null;
    } finally {
      E && await o.default.closeAttempt(E), m && a.default.purge(m), l && l(), h && h();
    }
  }, d = (v, _, p = t.DEFAULT_WRITE_OPTIONS) => {
    var S;
    if (n.default.isString(p))
      return d(v, _, { encoding: p });
    const $ = Date.now() + ((S = p.timeout) !== null && S !== void 0 ? S : t.DEFAULT_TIMEOUT_SYNC);
    let l = null, h = null, c = null;
    try {
      v = o.default.realpathSyncAttempt(v) || v, [h, l] = a.default.get(v, p.tmpCreate || a.default.create, p.tmpPurge !== !1);
      const m = t.IS_POSIX && n.default.isUndefined(p.chown), E = n.default.isUndefined(p.mode);
      if (m || E) {
        const g = o.default.statSyncAttempt(v);
        g && (p = { ...p }, m && (p.chown = { uid: g.uid, gid: g.gid }), E && (p.mode = g.mode));
      }
      const y = e.dirname(v);
      o.default.mkdirSyncAttempt(y, {
        mode: t.DEFAULT_FOLDER_MODE,
        recursive: !0
      }), c = o.default.openSyncRetry($)(h, "w", p.mode || t.DEFAULT_FILE_MODE), p.tmpCreated && p.tmpCreated(h), n.default.isString(_) ? o.default.writeSyncRetry($)(c, _, 0, p.encoding || t.DEFAULT_ENCODING) : n.default.isUndefined(_) || o.default.writeSyncRetry($)(c, _, 0, _.length, 0), p.fsync !== !1 && (p.fsyncWait !== !1 ? o.default.fsyncSyncRetry($)(c) : o.default.fsyncAttempt(c)), o.default.closeSyncRetry($)(c), c = null, p.chown && o.default.chownSyncAttempt(h, p.chown.uid, p.chown.gid), p.mode && o.default.chmodSyncAttempt(h, p.mode);
      try {
        o.default.renameSyncRetry($)(h, v);
      } catch (g) {
        if (g.code !== "ENAMETOOLONG")
          throw g;
        o.default.renameSyncRetry($)(h, a.default.truncate(v));
      }
      l(), h = null;
    } finally {
      c && o.default.closeSyncAttempt(c), h && a.default.purge(h);
    }
  };
  return ve.writeFileSync = d, ve;
}
var Et = { exports: {} }, nn = {}, Re = {}, De = {}, sn = {}, on = {}, an = {}, zs;
function or() {
  return zs || (zs = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
    class t {
    }
    e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
    class o extends t {
      constructor(c) {
        if (super(), !e.IDENTIFIER.test(c))
          throw new Error("CodeGen: name must be a valid identifier");
        this.str = c;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        return !1;
      }
      get names() {
        return { [this.str]: 1 };
      }
    }
    e.Name = o;
    class n extends t {
      constructor(c) {
        super(), this._items = typeof c == "string" ? [c] : c;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        if (this._items.length > 1)
          return !1;
        const c = this._items[0];
        return c === "" || c === '""';
      }
      get str() {
        var c;
        return (c = this._str) !== null && c !== void 0 ? c : this._str = this._items.reduce((m, E) => `${m}${E}`, "");
      }
      get names() {
        var c;
        return (c = this._names) !== null && c !== void 0 ? c : this._names = this._items.reduce((m, E) => (E instanceof o && (m[E.str] = (m[E.str] || 0) + 1), m), {});
      }
    }
    e._Code = n, e.nil = new n("");
    function u(h, ...c) {
      const m = [h[0]];
      let E = 0;
      for (; E < c.length; )
        f(m, c[E]), m.push(h[++E]);
      return new n(m);
    }
    e._ = u;
    const a = new n("+");
    function r(h, ...c) {
      const m = [p(h[0])];
      let E = 0;
      for (; E < c.length; )
        m.push(a), f(m, c[E]), m.push(a, p(h[++E]));
      return i(m), new n(m);
    }
    e.str = r;
    function f(h, c) {
      c instanceof n ? h.push(...c._items) : c instanceof o ? h.push(c) : h.push(v(c));
    }
    e.addCodeArg = f;
    function i(h) {
      let c = 1;
      for (; c < h.length - 1; ) {
        if (h[c] === a) {
          const m = s(h[c - 1], h[c + 1]);
          if (m !== void 0) {
            h.splice(c - 1, 3, m);
            continue;
          }
          h[c++] = "+";
        }
        c++;
      }
    }
    function s(h, c) {
      if (c === '""')
        return h;
      if (h === '""')
        return c;
      if (typeof h == "string")
        return c instanceof o || h[h.length - 1] !== '"' ? void 0 : typeof c != "string" ? `${h.slice(0, -1)}${c}"` : c[0] === '"' ? h.slice(0, -1) + c.slice(1) : void 0;
      if (typeof c == "string" && c[0] === '"' && !(h instanceof o))
        return `"${h}${c.slice(1)}`;
    }
    function d(h, c) {
      return c.emptyStr() ? h : h.emptyStr() ? c : r`${h}${c}`;
    }
    e.strConcat = d;
    function v(h) {
      return typeof h == "number" || typeof h == "boolean" || h === null ? h : p(Array.isArray(h) ? h.join(",") : h);
    }
    function _(h) {
      return new n(p(h));
    }
    e.stringify = _;
    function p(h) {
      return JSON.stringify(h).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
    }
    e.safeStringify = p;
    function S(h) {
      return typeof h == "string" && e.IDENTIFIER.test(h) ? new n(`.${h}`) : u`[${h}]`;
    }
    e.getProperty = S;
    function $(h) {
      if (typeof h == "string" && e.IDENTIFIER.test(h))
        return new n(`${h}`);
      throw new Error(`CodeGen: invalid export name: ${h}, use explicit $id name mapping`);
    }
    e.getEsmExportName = $;
    function l(h) {
      return new n(h.toString());
    }
    e.regexpCode = l;
  }(an)), an;
}
var cn = {}, Vs;
function Gs() {
  return Vs || (Vs = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
    const t = or();
    class o extends Error {
      constructor(s) {
        super(`CodeGen: "code" for ${s} not defined`), this.value = s.value;
      }
    }
    var n;
    (function(i) {
      i[i.Started = 0] = "Started", i[i.Completed = 1] = "Completed";
    })(n || (e.UsedValueState = n = {})), e.varKinds = {
      const: new t.Name("const"),
      let: new t.Name("let"),
      var: new t.Name("var")
    };
    class u {
      constructor({ prefixes: s, parent: d } = {}) {
        this._names = {}, this._prefixes = s, this._parent = d;
      }
      toName(s) {
        return s instanceof t.Name ? s : this.name(s);
      }
      name(s) {
        return new t.Name(this._newName(s));
      }
      _newName(s) {
        const d = this._names[s] || this._nameGroup(s);
        return `${s}${d.index++}`;
      }
      _nameGroup(s) {
        var d, v;
        if (!((v = (d = this._parent) === null || d === void 0 ? void 0 : d._prefixes) === null || v === void 0) && v.has(s) || this._prefixes && !this._prefixes.has(s))
          throw new Error(`CodeGen: prefix "${s}" is not allowed in this scope`);
        return this._names[s] = { prefix: s, index: 0 };
      }
    }
    e.Scope = u;
    class a extends t.Name {
      constructor(s, d) {
        super(d), this.prefix = s;
      }
      setValue(s, { property: d, itemIndex: v }) {
        this.value = s, this.scopePath = (0, t._)`.${new t.Name(d)}[${v}]`;
      }
    }
    e.ValueScopeName = a;
    const r = (0, t._)`\n`;
    class f extends u {
      constructor(s) {
        super(s), this._values = {}, this._scope = s.scope, this.opts = { ...s, _n: s.lines ? r : t.nil };
      }
      get() {
        return this._scope;
      }
      name(s) {
        return new a(s, this._newName(s));
      }
      value(s, d) {
        var v;
        if (d.ref === void 0)
          throw new Error("CodeGen: ref must be passed in value");
        const _ = this.toName(s), { prefix: p } = _, S = (v = d.key) !== null && v !== void 0 ? v : d.ref;
        let $ = this._values[p];
        if ($) {
          const c = $.get(S);
          if (c)
            return c;
        } else
          $ = this._values[p] = /* @__PURE__ */ new Map();
        $.set(S, _);
        const l = this._scope[p] || (this._scope[p] = []), h = l.length;
        return l[h] = d.ref, _.setValue(d, { property: p, itemIndex: h }), _;
      }
      getValue(s, d) {
        const v = this._values[s];
        if (v)
          return v.get(d);
      }
      scopeRefs(s, d = this._values) {
        return this._reduceValues(d, (v) => {
          if (v.scopePath === void 0)
            throw new Error(`CodeGen: name "${v}" has no value`);
          return (0, t._)`${s}${v.scopePath}`;
        });
      }
      scopeCode(s = this._values, d, v) {
        return this._reduceValues(s, (_) => {
          if (_.value === void 0)
            throw new Error(`CodeGen: name "${_}" has no value`);
          return _.value.code;
        }, d, v);
      }
      _reduceValues(s, d, v = {}, _) {
        let p = t.nil;
        for (const S in s) {
          const $ = s[S];
          if (!$)
            continue;
          const l = v[S] = v[S] || /* @__PURE__ */ new Map();
          $.forEach((h) => {
            if (l.has(h))
              return;
            l.set(h, n.Started);
            let c = d(h);
            if (c) {
              const m = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
              p = (0, t._)`${p}${m} ${h} = ${c};${this.opts._n}`;
            } else if (c = _?.(h))
              p = (0, t._)`${p}${c}${this.opts._n}`;
            else
              throw new o(h);
            l.set(h, n.Completed);
          });
        }
        return p;
      }
    }
    e.ValueScope = f;
  }(cn)), cn;
}
var Hs;
function ee() {
  return Hs || (Hs = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
    const t = or(), o = Gs();
    var n = or();
    Object.defineProperty(e, "_", { enumerable: !0, get: function() {
      return n._;
    } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
      return n.str;
    } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
      return n.strConcat;
    } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
      return n.nil;
    } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
      return n.getProperty;
    } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
      return n.stringify;
    } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
      return n.regexpCode;
    } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
      return n.Name;
    } });
    var u = Gs();
    Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
      return u.Scope;
    } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
      return u.ValueScope;
    } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
      return u.ValueScopeName;
    } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
      return u.varKinds;
    } }), e.operators = {
      GT: new t._Code(">"),
      GTE: new t._Code(">="),
      LT: new t._Code("<"),
      LTE: new t._Code("<="),
      EQ: new t._Code("==="),
      NEQ: new t._Code("!=="),
      NOT: new t._Code("!"),
      OR: new t._Code("||"),
      AND: new t._Code("&&"),
      ADD: new t._Code("+")
    };
    class a {
      optimizeNodes() {
        return this;
      }
      optimizeNames(I, O) {
        return this;
      }
    }
    class r extends a {
      constructor(I, O, F) {
        super(), this.varKind = I, this.name = O, this.rhs = F;
      }
      render({ es5: I, _n: O }) {
        const F = I ? o.varKinds.var : this.varKind, B = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
        return `${F} ${this.name}${B};` + O;
      }
      optimizeNames(I, O) {
        if (I[this.name.str])
          return this.rhs && (this.rhs = U(this.rhs, I, O)), this;
      }
      get names() {
        return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
      }
    }
    class f extends a {
      constructor(I, O, F) {
        super(), this.lhs = I, this.rhs = O, this.sideEffects = F;
      }
      render({ _n: I }) {
        return `${this.lhs} = ${this.rhs};` + I;
      }
      optimizeNames(I, O) {
        if (!(this.lhs instanceof t.Name && !I[this.lhs.str] && !this.sideEffects))
          return this.rhs = U(this.rhs, I, O), this;
      }
      get names() {
        const I = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
        return k(I, this.rhs);
      }
    }
    class i extends f {
      constructor(I, O, F, B) {
        super(I, F, B), this.op = O;
      }
      render({ _n: I }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + I;
      }
    }
    class s extends a {
      constructor(I) {
        super(), this.label = I, this.names = {};
      }
      render({ _n: I }) {
        return `${this.label}:` + I;
      }
    }
    class d extends a {
      constructor(I) {
        super(), this.label = I, this.names = {};
      }
      render({ _n: I }) {
        return `break${this.label ? ` ${this.label}` : ""};` + I;
      }
    }
    class v extends a {
      constructor(I) {
        super(), this.error = I;
      }
      render({ _n: I }) {
        return `throw ${this.error};` + I;
      }
      get names() {
        return this.error.names;
      }
    }
    class _ extends a {
      constructor(I) {
        super(), this.code = I;
      }
      render({ _n: I }) {
        return `${this.code};` + I;
      }
      optimizeNodes() {
        return `${this.code}` ? this : void 0;
      }
      optimizeNames(I, O) {
        return this.code = U(this.code, I, O), this;
      }
      get names() {
        return this.code instanceof t._CodeOrName ? this.code.names : {};
      }
    }
    class p extends a {
      constructor(I = []) {
        super(), this.nodes = I;
      }
      render(I) {
        return this.nodes.reduce((O, F) => O + F.render(I), "");
      }
      optimizeNodes() {
        const { nodes: I } = this;
        let O = I.length;
        for (; O--; ) {
          const F = I[O].optimizeNodes();
          Array.isArray(F) ? I.splice(O, 1, ...F) : F ? I[O] = F : I.splice(O, 1);
        }
        return I.length > 0 ? this : void 0;
      }
      optimizeNames(I, O) {
        const { nodes: F } = this;
        let B = F.length;
        for (; B--; ) {
          const Z = F[B];
          Z.optimizeNames(I, O) || (x(I, Z.names), F.splice(B, 1));
        }
        return F.length > 0 ? this : void 0;
      }
      get names() {
        return this.nodes.reduce((I, O) => G(I, O.names), {});
      }
    }
    class S extends p {
      render(I) {
        return "{" + I._n + super.render(I) + "}" + I._n;
      }
    }
    class $ extends p {
    }
    class l extends S {
    }
    l.kind = "else";
    class h extends S {
      constructor(I, O) {
        super(O), this.condition = I;
      }
      render(I) {
        let O = `if(${this.condition})` + super.render(I);
        return this.else && (O += "else " + this.else.render(I)), O;
      }
      optimizeNodes() {
        super.optimizeNodes();
        const I = this.condition;
        if (I === !0)
          return this.nodes;
        let O = this.else;
        if (O) {
          const F = O.optimizeNodes();
          O = this.else = Array.isArray(F) ? new l(F) : F;
        }
        if (O)
          return I === !1 ? O instanceof h ? O : O.nodes : this.nodes.length ? this : new h(K(I), O instanceof h ? [O] : O.nodes);
        if (!(I === !1 || !this.nodes.length))
          return this;
      }
      optimizeNames(I, O) {
        var F;
        if (this.else = (F = this.else) === null || F === void 0 ? void 0 : F.optimizeNames(I, O), !!(super.optimizeNames(I, O) || this.else))
          return this.condition = U(this.condition, I, O), this;
      }
      get names() {
        const I = super.names;
        return k(I, this.condition), this.else && G(I, this.else.names), I;
      }
    }
    h.kind = "if";
    class c extends S {
    }
    c.kind = "for";
    class m extends c {
      constructor(I) {
        super(), this.iteration = I;
      }
      render(I) {
        return `for(${this.iteration})` + super.render(I);
      }
      optimizeNames(I, O) {
        if (super.optimizeNames(I, O))
          return this.iteration = U(this.iteration, I, O), this;
      }
      get names() {
        return G(super.names, this.iteration.names);
      }
    }
    class E extends c {
      constructor(I, O, F, B) {
        super(), this.varKind = I, this.name = O, this.from = F, this.to = B;
      }
      render(I) {
        const O = I.es5 ? o.varKinds.var : this.varKind, { name: F, from: B, to: Z } = this;
        return `for(${O} ${F}=${B}; ${F}<${Z}; ${F}++)` + super.render(I);
      }
      get names() {
        const I = k(super.names, this.from);
        return k(I, this.to);
      }
    }
    class y extends c {
      constructor(I, O, F, B) {
        super(), this.loop = I, this.varKind = O, this.name = F, this.iterable = B;
      }
      render(I) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(I);
      }
      optimizeNames(I, O) {
        if (super.optimizeNames(I, O))
          return this.iterable = U(this.iterable, I, O), this;
      }
      get names() {
        return G(super.names, this.iterable.names);
      }
    }
    class g extends S {
      constructor(I, O, F) {
        super(), this.name = I, this.args = O, this.async = F;
      }
      render(I) {
        return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(I);
      }
    }
    g.kind = "func";
    class w extends p {
      render(I) {
        return "return " + super.render(I);
      }
    }
    w.kind = "return";
    class R extends S {
      render(I) {
        let O = "try" + super.render(I);
        return this.catch && (O += this.catch.render(I)), this.finally && (O += this.finally.render(I)), O;
      }
      optimizeNodes() {
        var I, O;
        return super.optimizeNodes(), (I = this.catch) === null || I === void 0 || I.optimizeNodes(), (O = this.finally) === null || O === void 0 || O.optimizeNodes(), this;
      }
      optimizeNames(I, O) {
        var F, B;
        return super.optimizeNames(I, O), (F = this.catch) === null || F === void 0 || F.optimizeNames(I, O), (B = this.finally) === null || B === void 0 || B.optimizeNames(I, O), this;
      }
      get names() {
        const I = super.names;
        return this.catch && G(I, this.catch.names), this.finally && G(I, this.finally.names), I;
      }
    }
    class N extends S {
      constructor(I) {
        super(), this.error = I;
      }
      render(I) {
        return `catch(${this.error})` + super.render(I);
      }
    }
    N.kind = "catch";
    class b extends S {
      render(I) {
        return "finally" + super.render(I);
      }
    }
    b.kind = "finally";
    class M {
      constructor(I, O = {}) {
        this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...O, _n: O.lines ? `
` : "" }, this._extScope = I, this._scope = new o.Scope({ parent: I }), this._nodes = [new $()];
      }
      toString() {
        return this._root.render(this.opts);
      }
      // returns unique name in the internal scope
      name(I) {
        return this._scope.name(I);
      }
      // reserves unique name in the external scope
      scopeName(I) {
        return this._extScope.name(I);
      }
      // reserves unique name in the external scope and assigns value to it
      scopeValue(I, O) {
        const F = this._extScope.value(I, O);
        return (this._values[F.prefix] || (this._values[F.prefix] = /* @__PURE__ */ new Set())).add(F), F;
      }
      getScopeValue(I, O) {
        return this._extScope.getValue(I, O);
      }
      // return code that assigns values in the external scope to the names that are used internally
      // (same names that were returned by gen.scopeName or gen.scopeValue)
      scopeRefs(I) {
        return this._extScope.scopeRefs(I, this._values);
      }
      scopeCode() {
        return this._extScope.scopeCode(this._values);
      }
      _def(I, O, F, B) {
        const Z = this._scope.toName(O);
        return F !== void 0 && B && (this._constants[Z.str] = F), this._leafNode(new r(I, Z, F)), Z;
      }
      // `const` declaration (`var` in es5 mode)
      const(I, O, F) {
        return this._def(o.varKinds.const, I, O, F);
      }
      // `let` declaration with optional assignment (`var` in es5 mode)
      let(I, O, F) {
        return this._def(o.varKinds.let, I, O, F);
      }
      // `var` declaration with optional assignment
      var(I, O, F) {
        return this._def(o.varKinds.var, I, O, F);
      }
      // assignment code
      assign(I, O, F) {
        return this._leafNode(new f(I, O, F));
      }
      // `+=` code
      add(I, O) {
        return this._leafNode(new i(I, e.operators.ADD, O));
      }
      // appends passed SafeExpr to code or executes Block
      code(I) {
        return typeof I == "function" ? I() : I !== t.nil && this._leafNode(new _(I)), this;
      }
      // returns code for object literal for the passed argument list of key-value pairs
      object(...I) {
        const O = ["{"];
        for (const [F, B] of I)
          O.length > 1 && O.push(","), O.push(F), (F !== B || this.opts.es5) && (O.push(":"), (0, t.addCodeArg)(O, B));
        return O.push("}"), new t._Code(O);
      }
      // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
      if(I, O, F) {
        if (this._blockNode(new h(I)), O && F)
          this.code(O).else().code(F).endIf();
        else if (O)
          this.code(O).endIf();
        else if (F)
          throw new Error('CodeGen: "else" body without "then" body');
        return this;
      }
      // `else if` clause - invalid without `if` or after `else` clauses
      elseIf(I) {
        return this._elseNode(new h(I));
      }
      // `else` clause - only valid after `if` or `else if` clauses
      else() {
        return this._elseNode(new l());
      }
      // end `if` statement (needed if gen.if was used only with condition)
      endIf() {
        return this._endBlockNode(h, l);
      }
      _for(I, O) {
        return this._blockNode(I), O && this.code(O).endFor(), this;
      }
      // a generic `for` clause (or statement if `forBody` is passed)
      for(I, O) {
        return this._for(new m(I), O);
      }
      // `for` statement for a range of values
      forRange(I, O, F, B, Z = this.opts.es5 ? o.varKinds.var : o.varKinds.let) {
        const J = this._scope.toName(I);
        return this._for(new E(Z, J, O, F), () => B(J));
      }
      // `for-of` statement (in es5 mode replace with a normal for loop)
      forOf(I, O, F, B = o.varKinds.const) {
        const Z = this._scope.toName(I);
        if (this.opts.es5) {
          const J = O instanceof t.Name ? O : this.var("_arr", O);
          return this.forRange("_i", 0, (0, t._)`${J}.length`, (X) => {
            this.var(Z, (0, t._)`${J}[${X}]`), F(Z);
          });
        }
        return this._for(new y("of", B, Z, O), () => F(Z));
      }
      // `for-in` statement.
      // With option `ownProperties` replaced with a `for-of` loop for object keys
      forIn(I, O, F, B = this.opts.es5 ? o.varKinds.var : o.varKinds.const) {
        if (this.opts.ownProperties)
          return this.forOf(I, (0, t._)`Object.keys(${O})`, F);
        const Z = this._scope.toName(I);
        return this._for(new y("in", B, Z, O), () => F(Z));
      }
      // end `for` loop
      endFor() {
        return this._endBlockNode(c);
      }
      // `label` statement
      label(I) {
        return this._leafNode(new s(I));
      }
      // `break` statement
      break(I) {
        return this._leafNode(new d(I));
      }
      // `return` statement
      return(I) {
        const O = new w();
        if (this._blockNode(O), this.code(I), O.nodes.length !== 1)
          throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode(w);
      }
      // `try` statement
      try(I, O, F) {
        if (!O && !F)
          throw new Error('CodeGen: "try" without "catch" and "finally"');
        const B = new R();
        if (this._blockNode(B), this.code(I), O) {
          const Z = this.name("e");
          this._currNode = B.catch = new N(Z), O(Z);
        }
        return F && (this._currNode = B.finally = new b(), this.code(F)), this._endBlockNode(N, b);
      }
      // `throw` statement
      throw(I) {
        return this._leafNode(new v(I));
      }
      // start self-balancing block
      block(I, O) {
        return this._blockStarts.push(this._nodes.length), I && this.code(I).endBlock(O), this;
      }
      // end the current self-balancing block
      endBlock(I) {
        const O = this._blockStarts.pop();
        if (O === void 0)
          throw new Error("CodeGen: not in self-balancing block");
        const F = this._nodes.length - O;
        if (F < 0 || I !== void 0 && F !== I)
          throw new Error(`CodeGen: wrong number of nodes: ${F} vs ${I} expected`);
        return this._nodes.length = O, this;
      }
      // `function` heading (or definition if funcBody is passed)
      func(I, O = t.nil, F, B) {
        return this._blockNode(new g(I, O, F)), B && this.code(B).endFunc(), this;
      }
      // end function definition
      endFunc() {
        return this._endBlockNode(g);
      }
      optimize(I = 1) {
        for (; I-- > 0; )
          this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
      }
      _leafNode(I) {
        return this._currNode.nodes.push(I), this;
      }
      _blockNode(I) {
        this._currNode.nodes.push(I), this._nodes.push(I);
      }
      _endBlockNode(I, O) {
        const F = this._currNode;
        if (F instanceof I || O && F instanceof O)
          return this._nodes.pop(), this;
        throw new Error(`CodeGen: not in block "${O ? `${I.kind}/${O.kind}` : I.kind}"`);
      }
      _elseNode(I) {
        const O = this._currNode;
        if (!(O instanceof h))
          throw new Error('CodeGen: "else" without "if"');
        return this._currNode = O.else = I, this;
      }
      get _root() {
        return this._nodes[0];
      }
      get _currNode() {
        const I = this._nodes;
        return I[I.length - 1];
      }
      set _currNode(I) {
        const O = this._nodes;
        O[O.length - 1] = I;
      }
    }
    e.CodeGen = M;
    function G(L, I) {
      for (const O in I)
        L[O] = (L[O] || 0) + (I[O] || 0);
      return L;
    }
    function k(L, I) {
      return I instanceof t._CodeOrName ? G(L, I.names) : L;
    }
    function U(L, I, O) {
      if (L instanceof t.Name)
        return F(L);
      if (!B(L))
        return L;
      return new t._Code(L._items.reduce((Z, J) => (J instanceof t.Name && (J = F(J)), J instanceof t._Code ? Z.push(...J._items) : Z.push(J), Z), []));
      function F(Z) {
        const J = O[Z.str];
        return J === void 0 || I[Z.str] !== 1 ? Z : (delete I[Z.str], J);
      }
      function B(Z) {
        return Z instanceof t._Code && Z._items.some((J) => J instanceof t.Name && I[J.str] === 1 && O[J.str] !== void 0);
      }
    }
    function x(L, I) {
      for (const O in I)
        L[O] = (L[O] || 0) - (I[O] || 0);
    }
    function K(L) {
      return typeof L == "boolean" || typeof L == "number" || L === null ? !L : (0, t._)`!${q(L)}`;
    }
    e.not = K;
    const V = P(e.operators.AND);
    function C(...L) {
      return L.reduce(V);
    }
    e.and = C;
    const j = P(e.operators.OR);
    function T(...L) {
      return L.reduce(j);
    }
    e.or = T;
    function P(L) {
      return (I, O) => I === t.nil ? O : O === t.nil ? I : (0, t._)`${q(I)} ${L} ${q(O)}`;
    }
    function q(L) {
      return L instanceof t.Name ? L : (0, t._)`(${L})`;
    }
  }(on)), on;
}
var Q = {}, Bs;
function te() {
  if (Bs) return Q;
  Bs = 1, Object.defineProperty(Q, "__esModule", { value: !0 }), Q.checkStrictMode = Q.getErrorPath = Q.Type = Q.useFunc = Q.setEvaluated = Q.evaluatedPropsToName = Q.mergeEvaluated = Q.eachItem = Q.unescapeJsonPointer = Q.escapeJsonPointer = Q.escapeFragment = Q.unescapeFragment = Q.schemaRefOrVal = Q.schemaHasRulesButRef = Q.schemaHasRules = Q.checkUnknownRules = Q.alwaysValidSchema = Q.toHash = void 0;
  const e = ee(), t = or();
  function o(y) {
    const g = {};
    for (const w of y)
      g[w] = !0;
    return g;
  }
  Q.toHash = o;
  function n(y, g) {
    return typeof g == "boolean" ? g : Object.keys(g).length === 0 ? !0 : (u(y, g), !a(g, y.self.RULES.all));
  }
  Q.alwaysValidSchema = n;
  function u(y, g = y.schema) {
    const { opts: w, self: R } = y;
    if (!w.strictSchema || typeof g == "boolean")
      return;
    const N = R.RULES.keywords;
    for (const b in g)
      N[b] || E(y, `unknown keyword: "${b}"`);
  }
  Q.checkUnknownRules = u;
  function a(y, g) {
    if (typeof y == "boolean")
      return !y;
    for (const w in y)
      if (g[w])
        return !0;
    return !1;
  }
  Q.schemaHasRules = a;
  function r(y, g) {
    if (typeof y == "boolean")
      return !y;
    for (const w in y)
      if (w !== "$ref" && g.all[w])
        return !0;
    return !1;
  }
  Q.schemaHasRulesButRef = r;
  function f({ topSchemaRef: y, schemaPath: g }, w, R, N) {
    if (!N) {
      if (typeof w == "number" || typeof w == "boolean")
        return w;
      if (typeof w == "string")
        return (0, e._)`${w}`;
    }
    return (0, e._)`${y}${g}${(0, e.getProperty)(R)}`;
  }
  Q.schemaRefOrVal = f;
  function i(y) {
    return v(decodeURIComponent(y));
  }
  Q.unescapeFragment = i;
  function s(y) {
    return encodeURIComponent(d(y));
  }
  Q.escapeFragment = s;
  function d(y) {
    return typeof y == "number" ? `${y}` : y.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  Q.escapeJsonPointer = d;
  function v(y) {
    return y.replace(/~1/g, "/").replace(/~0/g, "~");
  }
  Q.unescapeJsonPointer = v;
  function _(y, g) {
    if (Array.isArray(y))
      for (const w of y)
        g(w);
    else
      g(y);
  }
  Q.eachItem = _;
  function p({ mergeNames: y, mergeToName: g, mergeValues: w, resultToName: R }) {
    return (N, b, M, G) => {
      const k = M === void 0 ? b : M instanceof e.Name ? (b instanceof e.Name ? y(N, b, M) : g(N, b, M), M) : b instanceof e.Name ? (g(N, M, b), b) : w(b, M);
      return G === e.Name && !(k instanceof e.Name) ? R(N, k) : k;
    };
  }
  Q.mergeEvaluated = {
    props: p({
      mergeNames: (y, g, w) => y.if((0, e._)`${w} !== true && ${g} !== undefined`, () => {
        y.if((0, e._)`${g} === true`, () => y.assign(w, !0), () => y.assign(w, (0, e._)`${w} || {}`).code((0, e._)`Object.assign(${w}, ${g})`));
      }),
      mergeToName: (y, g, w) => y.if((0, e._)`${w} !== true`, () => {
        g === !0 ? y.assign(w, !0) : (y.assign(w, (0, e._)`${w} || {}`), $(y, w, g));
      }),
      mergeValues: (y, g) => y === !0 ? !0 : { ...y, ...g },
      resultToName: S
    }),
    items: p({
      mergeNames: (y, g, w) => y.if((0, e._)`${w} !== true && ${g} !== undefined`, () => y.assign(w, (0, e._)`${g} === true ? true : ${w} > ${g} ? ${w} : ${g}`)),
      mergeToName: (y, g, w) => y.if((0, e._)`${w} !== true`, () => y.assign(w, g === !0 ? !0 : (0, e._)`${w} > ${g} ? ${w} : ${g}`)),
      mergeValues: (y, g) => y === !0 ? !0 : Math.max(y, g),
      resultToName: (y, g) => y.var("items", g)
    })
  };
  function S(y, g) {
    if (g === !0)
      return y.var("props", !0);
    const w = y.var("props", (0, e._)`{}`);
    return g !== void 0 && $(y, w, g), w;
  }
  Q.evaluatedPropsToName = S;
  function $(y, g, w) {
    Object.keys(w).forEach((R) => y.assign((0, e._)`${g}${(0, e.getProperty)(R)}`, !0));
  }
  Q.setEvaluated = $;
  const l = {};
  function h(y, g) {
    return y.scopeValue("func", {
      ref: g,
      code: l[g.code] || (l[g.code] = new t._Code(g.code))
    });
  }
  Q.useFunc = h;
  var c;
  (function(y) {
    y[y.Num = 0] = "Num", y[y.Str = 1] = "Str";
  })(c || (Q.Type = c = {}));
  function m(y, g, w) {
    if (y instanceof e.Name) {
      const R = g === c.Num;
      return w ? R ? (0, e._)`"[" + ${y} + "]"` : (0, e._)`"['" + ${y} + "']"` : R ? (0, e._)`"/" + ${y}` : (0, e._)`"/" + ${y}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
    }
    return w ? (0, e.getProperty)(y).toString() : "/" + d(y);
  }
  Q.getErrorPath = m;
  function E(y, g, w = y.opts.strictSchema) {
    if (w) {
      if (g = `strict mode: ${g}`, w === !0)
        throw new Error(g);
      y.self.logger.warn(g);
    }
  }
  return Q.checkStrictMode = E, Q;
}
var vt = {}, Ks;
function Pe() {
  if (Ks) return vt;
  Ks = 1, Object.defineProperty(vt, "__esModule", { value: !0 });
  const e = ee(), t = {
    // validation function arguments
    data: new e.Name("data"),
    // data passed to validation function
    // args passed from referencing schema
    valCxt: new e.Name("valCxt"),
    // validation/data context - should not be used directly, it is destructured to the names below
    instancePath: new e.Name("instancePath"),
    parentData: new e.Name("parentData"),
    parentDataProperty: new e.Name("parentDataProperty"),
    rootData: new e.Name("rootData"),
    // root data - same as the data passed to the first/top validation function
    dynamicAnchors: new e.Name("dynamicAnchors"),
    // used to support recursiveRef and dynamicRef
    // function scoped variables
    vErrors: new e.Name("vErrors"),
    // null or array of validation errors
    errors: new e.Name("errors"),
    // counter of validation errors
    this: new e.Name("this"),
    // "globals"
    self: new e.Name("self"),
    scope: new e.Name("scope"),
    // JTD serialize/parse name for JSON string and position
    json: new e.Name("json"),
    jsonPos: new e.Name("jsonPos"),
    jsonLen: new e.Name("jsonLen"),
    jsonPart: new e.Name("jsonPart")
  };
  return vt.default = t, vt;
}
var Ws;
function ur() {
  return Ws || (Ws = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
    const t = ee(), o = te(), n = Pe();
    e.keywordError = {
      message: ({ keyword: l }) => (0, t.str)`must pass "${l}" keyword validation`
    }, e.keyword$DataError = {
      message: ({ keyword: l, schemaType: h }) => h ? (0, t.str)`"${l}" keyword must be ${h} ($data)` : (0, t.str)`"${l}" keyword is invalid ($data)`
    };
    function u(l, h = e.keywordError, c, m) {
      const { it: E } = l, { gen: y, compositeRule: g, allErrors: w } = E, R = v(l, h, c);
      m ?? (g || w) ? i(y, R) : s(E, (0, t._)`[${R}]`);
    }
    e.reportError = u;
    function a(l, h = e.keywordError, c) {
      const { it: m } = l, { gen: E, compositeRule: y, allErrors: g } = m, w = v(l, h, c);
      i(E, w), y || g || s(m, n.default.vErrors);
    }
    e.reportExtraError = a;
    function r(l, h) {
      l.assign(n.default.errors, h), l.if((0, t._)`${n.default.vErrors} !== null`, () => l.if(h, () => l.assign((0, t._)`${n.default.vErrors}.length`, h), () => l.assign(n.default.vErrors, null)));
    }
    e.resetErrorsCount = r;
    function f({ gen: l, keyword: h, schemaValue: c, data: m, errsCount: E, it: y }) {
      if (E === void 0)
        throw new Error("ajv implementation error");
      const g = l.name("err");
      l.forRange("i", E, n.default.errors, (w) => {
        l.const(g, (0, t._)`${n.default.vErrors}[${w}]`), l.if((0, t._)`${g}.instancePath === undefined`, () => l.assign((0, t._)`${g}.instancePath`, (0, t.strConcat)(n.default.instancePath, y.errorPath))), l.assign((0, t._)`${g}.schemaPath`, (0, t.str)`${y.errSchemaPath}/${h}`), y.opts.verbose && (l.assign((0, t._)`${g}.schema`, c), l.assign((0, t._)`${g}.data`, m));
      });
    }
    e.extendErrors = f;
    function i(l, h) {
      const c = l.const("err", h);
      l.if((0, t._)`${n.default.vErrors} === null`, () => l.assign(n.default.vErrors, (0, t._)`[${c}]`), (0, t._)`${n.default.vErrors}.push(${c})`), l.code((0, t._)`${n.default.errors}++`);
    }
    function s(l, h) {
      const { gen: c, validateName: m, schemaEnv: E } = l;
      E.$async ? c.throw((0, t._)`new ${l.ValidationError}(${h})`) : (c.assign((0, t._)`${m}.errors`, h), c.return(!1));
    }
    const d = {
      keyword: new t.Name("keyword"),
      schemaPath: new t.Name("schemaPath"),
      // also used in JTD errors
      params: new t.Name("params"),
      propertyName: new t.Name("propertyName"),
      message: new t.Name("message"),
      schema: new t.Name("schema"),
      parentSchema: new t.Name("parentSchema")
    };
    function v(l, h, c) {
      const { createErrors: m } = l.it;
      return m === !1 ? (0, t._)`{}` : _(l, h, c);
    }
    function _(l, h, c = {}) {
      const { gen: m, it: E } = l, y = [
        p(E, c),
        S(l, c)
      ];
      return $(l, h, y), m.object(...y);
    }
    function p({ errorPath: l }, { instancePath: h }) {
      const c = h ? (0, t.str)`${l}${(0, o.getErrorPath)(h, o.Type.Str)}` : l;
      return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, c)];
    }
    function S({ keyword: l, it: { errSchemaPath: h } }, { schemaPath: c, parentSchema: m }) {
      let E = m ? h : (0, t.str)`${h}/${l}`;
      return c && (E = (0, t.str)`${E}${(0, o.getErrorPath)(c, o.Type.Str)}`), [d.schemaPath, E];
    }
    function $(l, { params: h, message: c }, m) {
      const { keyword: E, data: y, schemaValue: g, it: w } = l, { opts: R, propertyName: N, topSchemaRef: b, schemaPath: M } = w;
      m.push([d.keyword, E], [d.params, typeof h == "function" ? h(l) : h || (0, t._)`{}`]), R.messages && m.push([d.message, typeof c == "function" ? c(l) : c]), R.verbose && m.push([d.schema, g], [d.parentSchema, (0, t._)`${b}${M}`], [n.default.data, y]), N && m.push([d.propertyName, N]);
    }
  }(sn)), sn;
}
var Zs;
function Uu() {
  if (Zs) return De;
  Zs = 1, Object.defineProperty(De, "__esModule", { value: !0 }), De.boolOrEmptySchema = De.topBoolOrEmptySchema = void 0;
  const e = ur(), t = ee(), o = Pe(), n = {
    message: "boolean schema is false"
  };
  function u(f) {
    const { gen: i, schema: s, validateName: d } = f;
    s === !1 ? r(f, !1) : typeof s == "object" && s.$async === !0 ? i.return(o.default.data) : (i.assign((0, t._)`${d}.errors`, null), i.return(!0));
  }
  De.topBoolOrEmptySchema = u;
  function a(f, i) {
    const { gen: s, schema: d } = f;
    d === !1 ? (s.var(i, !1), r(f)) : s.var(i, !0);
  }
  De.boolOrEmptySchema = a;
  function r(f, i) {
    const { gen: s, data: d } = f, v = {
      gen: s,
      keyword: "false schema",
      data: d,
      schema: !1,
      schemaCode: !1,
      schemaValue: !1,
      params: {},
      it: f
    };
    (0, e.reportError)(v, n, void 0, i);
  }
  return De;
}
var ae = {}, Ce = {}, Xs;
function Oc() {
  if (Xs) return Ce;
  Xs = 1, Object.defineProperty(Ce, "__esModule", { value: !0 }), Ce.getRules = Ce.isJSONType = void 0;
  const e = ["string", "number", "integer", "boolean", "null", "object", "array"], t = new Set(e);
  function o(u) {
    return typeof u == "string" && t.has(u);
  }
  Ce.isJSONType = o;
  function n() {
    const u = {
      number: { type: "number", rules: [] },
      string: { type: "string", rules: [] },
      array: { type: "array", rules: [] },
      object: { type: "object", rules: [] }
    };
    return {
      types: { ...u, integer: !0, boolean: !0, null: !0 },
      rules: [{ rules: [] }, u.number, u.string, u.array, u.object],
      post: { rules: [] },
      all: {},
      keywords: {}
    };
  }
  return Ce.getRules = n, Ce;
}
var Ie = {}, Js;
function Pc() {
  if (Js) return Ie;
  Js = 1, Object.defineProperty(Ie, "__esModule", { value: !0 }), Ie.shouldUseRule = Ie.shouldUseGroup = Ie.schemaHasRulesForType = void 0;
  function e({ schema: n, self: u }, a) {
    const r = u.RULES.types[a];
    return r && r !== !0 && t(n, r);
  }
  Ie.schemaHasRulesForType = e;
  function t(n, u) {
    return u.rules.some((a) => o(n, a));
  }
  Ie.shouldUseGroup = t;
  function o(n, u) {
    var a;
    return n[u.keyword] !== void 0 || ((a = u.definition.implements) === null || a === void 0 ? void 0 : a.some((r) => n[r] !== void 0));
  }
  return Ie.shouldUseRule = o, Ie;
}
var Ys;
function ar() {
  if (Ys) return ae;
  Ys = 1, Object.defineProperty(ae, "__esModule", { value: !0 }), ae.reportTypeError = ae.checkDataTypes = ae.checkDataType = ae.coerceAndCheckDataType = ae.getJSONTypes = ae.getSchemaTypes = ae.DataType = void 0;
  const e = Oc(), t = Pc(), o = ur(), n = ee(), u = te();
  var a;
  (function(c) {
    c[c.Correct = 0] = "Correct", c[c.Wrong = 1] = "Wrong";
  })(a || (ae.DataType = a = {}));
  function r(c) {
    const m = f(c.type);
    if (m.includes("null")) {
      if (c.nullable === !1)
        throw new Error("type: null contradicts nullable: false");
    } else {
      if (!m.length && c.nullable !== void 0)
        throw new Error('"nullable" cannot be used without "type"');
      c.nullable === !0 && m.push("null");
    }
    return m;
  }
  ae.getSchemaTypes = r;
  function f(c) {
    const m = Array.isArray(c) ? c : c ? [c] : [];
    if (m.every(e.isJSONType))
      return m;
    throw new Error("type must be JSONType or JSONType[]: " + m.join(","));
  }
  ae.getJSONTypes = f;
  function i(c, m) {
    const { gen: E, data: y, opts: g } = c, w = d(m, g.coerceTypes), R = m.length > 0 && !(w.length === 0 && m.length === 1 && (0, t.schemaHasRulesForType)(c, m[0]));
    if (R) {
      const N = S(m, y, g.strictNumbers, a.Wrong);
      E.if(N, () => {
        w.length ? v(c, m, w) : l(c);
      });
    }
    return R;
  }
  ae.coerceAndCheckDataType = i;
  const s = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
  function d(c, m) {
    return m ? c.filter((E) => s.has(E) || m === "array" && E === "array") : [];
  }
  function v(c, m, E) {
    const { gen: y, data: g, opts: w } = c, R = y.let("dataType", (0, n._)`typeof ${g}`), N = y.let("coerced", (0, n._)`undefined`);
    w.coerceTypes === "array" && y.if((0, n._)`${R} == 'object' && Array.isArray(${g}) && ${g}.length == 1`, () => y.assign(g, (0, n._)`${g}[0]`).assign(R, (0, n._)`typeof ${g}`).if(S(m, g, w.strictNumbers), () => y.assign(N, g))), y.if((0, n._)`${N} !== undefined`);
    for (const M of E)
      (s.has(M) || M === "array" && w.coerceTypes === "array") && b(M);
    y.else(), l(c), y.endIf(), y.if((0, n._)`${N} !== undefined`, () => {
      y.assign(g, N), _(c, N);
    });
    function b(M) {
      switch (M) {
        case "string":
          y.elseIf((0, n._)`${R} == "number" || ${R} == "boolean"`).assign(N, (0, n._)`"" + ${g}`).elseIf((0, n._)`${g} === null`).assign(N, (0, n._)`""`);
          return;
        case "number":
          y.elseIf((0, n._)`${R} == "boolean" || ${g} === null
              || (${R} == "string" && ${g} && ${g} == +${g})`).assign(N, (0, n._)`+${g}`);
          return;
        case "integer":
          y.elseIf((0, n._)`${R} === "boolean" || ${g} === null
              || (${R} === "string" && ${g} && ${g} == +${g} && !(${g} % 1))`).assign(N, (0, n._)`+${g}`);
          return;
        case "boolean":
          y.elseIf((0, n._)`${g} === "false" || ${g} === 0 || ${g} === null`).assign(N, !1).elseIf((0, n._)`${g} === "true" || ${g} === 1`).assign(N, !0);
          return;
        case "null":
          y.elseIf((0, n._)`${g} === "" || ${g} === 0 || ${g} === false`), y.assign(N, null);
          return;
        case "array":
          y.elseIf((0, n._)`${R} === "string" || ${R} === "number"
              || ${R} === "boolean" || ${g} === null`).assign(N, (0, n._)`[${g}]`);
      }
    }
  }
  function _({ gen: c, parentData: m, parentDataProperty: E }, y) {
    c.if((0, n._)`${m} !== undefined`, () => c.assign((0, n._)`${m}[${E}]`, y));
  }
  function p(c, m, E, y = a.Correct) {
    const g = y === a.Correct ? n.operators.EQ : n.operators.NEQ;
    let w;
    switch (c) {
      case "null":
        return (0, n._)`${m} ${g} null`;
      case "array":
        w = (0, n._)`Array.isArray(${m})`;
        break;
      case "object":
        w = (0, n._)`${m} && typeof ${m} == "object" && !Array.isArray(${m})`;
        break;
      case "integer":
        w = R((0, n._)`!(${m} % 1) && !isNaN(${m})`);
        break;
      case "number":
        w = R();
        break;
      default:
        return (0, n._)`typeof ${m} ${g} ${c}`;
    }
    return y === a.Correct ? w : (0, n.not)(w);
    function R(N = n.nil) {
      return (0, n.and)((0, n._)`typeof ${m} == "number"`, N, E ? (0, n._)`isFinite(${m})` : n.nil);
    }
  }
  ae.checkDataType = p;
  function S(c, m, E, y) {
    if (c.length === 1)
      return p(c[0], m, E, y);
    let g;
    const w = (0, u.toHash)(c);
    if (w.array && w.object) {
      const R = (0, n._)`typeof ${m} != "object"`;
      g = w.null ? R : (0, n._)`!${m} || ${R}`, delete w.null, delete w.array, delete w.object;
    } else
      g = n.nil;
    w.number && delete w.integer;
    for (const R in w)
      g = (0, n.and)(g, p(R, m, E, y));
    return g;
  }
  ae.checkDataTypes = S;
  const $ = {
    message: ({ schema: c }) => `must be ${c}`,
    params: ({ schema: c, schemaValue: m }) => typeof c == "string" ? (0, n._)`{type: ${c}}` : (0, n._)`{type: ${m}}`
  };
  function l(c) {
    const m = h(c);
    (0, o.reportError)(m, $);
  }
  ae.reportTypeError = l;
  function h(c) {
    const { gen: m, data: E, schema: y } = c, g = (0, u.schemaRefOrVal)(c, y, "type");
    return {
      gen: m,
      keyword: "type",
      data: E,
      schema: y.type,
      schemaCode: g,
      schemaValue: g,
      parentSchema: y,
      params: {},
      it: c
    };
  }
  return ae;
}
var Ve = {}, Qs;
function xu() {
  if (Qs) return Ve;
  Qs = 1, Object.defineProperty(Ve, "__esModule", { value: !0 }), Ve.assignDefaults = void 0;
  const e = ee(), t = te();
  function o(u, a) {
    const { properties: r, items: f } = u.schema;
    if (a === "object" && r)
      for (const i in r)
        n(u, i, r[i].default);
    else a === "array" && Array.isArray(f) && f.forEach((i, s) => n(u, s, i.default));
  }
  Ve.assignDefaults = o;
  function n(u, a, r) {
    const { gen: f, compositeRule: i, data: s, opts: d } = u;
    if (r === void 0)
      return;
    const v = (0, e._)`${s}${(0, e.getProperty)(a)}`;
    if (i) {
      (0, t.checkStrictMode)(u, `default is ignored for: ${v}`);
      return;
    }
    let _ = (0, e._)`${v} === undefined`;
    d.useDefaults === "empty" && (_ = (0, e._)`${_} || ${v} === null || ${v} === ""`), f.if(_, (0, e._)`${v} = ${(0, e.stringify)(r)}`);
  }
  return Ve;
}
var ge = {}, re = {}, eo;
function _e() {
  if (eo) return re;
  eo = 1, Object.defineProperty(re, "__esModule", { value: !0 }), re.validateUnion = re.validateArray = re.usePattern = re.callValidateCode = re.schemaProperties = re.allSchemaProperties = re.noPropertyInData = re.propertyInData = re.isOwnProperty = re.hasPropFunc = re.reportMissingProp = re.checkMissingProp = re.checkReportMissingProp = void 0;
  const e = ee(), t = te(), o = Pe(), n = te();
  function u(c, m) {
    const { gen: E, data: y, it: g } = c;
    E.if(d(E, y, m, g.opts.ownProperties), () => {
      c.setParams({ missingProperty: (0, e._)`${m}` }, !0), c.error();
    });
  }
  re.checkReportMissingProp = u;
  function a({ gen: c, data: m, it: { opts: E } }, y, g) {
    return (0, e.or)(...y.map((w) => (0, e.and)(d(c, m, w, E.ownProperties), (0, e._)`${g} = ${w}`)));
  }
  re.checkMissingProp = a;
  function r(c, m) {
    c.setParams({ missingProperty: m }, !0), c.error();
  }
  re.reportMissingProp = r;
  function f(c) {
    return c.scopeValue("func", {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      ref: Object.prototype.hasOwnProperty,
      code: (0, e._)`Object.prototype.hasOwnProperty`
    });
  }
  re.hasPropFunc = f;
  function i(c, m, E) {
    return (0, e._)`${f(c)}.call(${m}, ${E})`;
  }
  re.isOwnProperty = i;
  function s(c, m, E, y) {
    const g = (0, e._)`${m}${(0, e.getProperty)(E)} !== undefined`;
    return y ? (0, e._)`${g} && ${i(c, m, E)}` : g;
  }
  re.propertyInData = s;
  function d(c, m, E, y) {
    const g = (0, e._)`${m}${(0, e.getProperty)(E)} === undefined`;
    return y ? (0, e.or)(g, (0, e.not)(i(c, m, E))) : g;
  }
  re.noPropertyInData = d;
  function v(c) {
    return c ? Object.keys(c).filter((m) => m !== "__proto__") : [];
  }
  re.allSchemaProperties = v;
  function _(c, m) {
    return v(m).filter((E) => !(0, t.alwaysValidSchema)(c, m[E]));
  }
  re.schemaProperties = _;
  function p({ schemaCode: c, data: m, it: { gen: E, topSchemaRef: y, schemaPath: g, errorPath: w }, it: R }, N, b, M) {
    const G = M ? (0, e._)`${c}, ${m}, ${y}${g}` : m, k = [
      [o.default.instancePath, (0, e.strConcat)(o.default.instancePath, w)],
      [o.default.parentData, R.parentData],
      [o.default.parentDataProperty, R.parentDataProperty],
      [o.default.rootData, o.default.rootData]
    ];
    R.opts.dynamicRef && k.push([o.default.dynamicAnchors, o.default.dynamicAnchors]);
    const U = (0, e._)`${G}, ${E.object(...k)}`;
    return b !== e.nil ? (0, e._)`${N}.call(${b}, ${U})` : (0, e._)`${N}(${U})`;
  }
  re.callValidateCode = p;
  const S = (0, e._)`new RegExp`;
  function $({ gen: c, it: { opts: m } }, E) {
    const y = m.unicodeRegExp ? "u" : "", { regExp: g } = m.code, w = g(E, y);
    return c.scopeValue("pattern", {
      key: w.toString(),
      ref: w,
      code: (0, e._)`${g.code === "new RegExp" ? S : (0, n.useFunc)(c, g)}(${E}, ${y})`
    });
  }
  re.usePattern = $;
  function l(c) {
    const { gen: m, data: E, keyword: y, it: g } = c, w = m.name("valid");
    if (g.allErrors) {
      const N = m.let("valid", !0);
      return R(() => m.assign(N, !1)), N;
    }
    return m.var(w, !0), R(() => m.break()), w;
    function R(N) {
      const b = m.const("len", (0, e._)`${E}.length`);
      m.forRange("i", 0, b, (M) => {
        c.subschema({
          keyword: y,
          dataProp: M,
          dataPropType: t.Type.Num
        }, w), m.if((0, e.not)(w), N);
      });
    }
  }
  re.validateArray = l;
  function h(c) {
    const { gen: m, schema: E, keyword: y, it: g } = c;
    if (!Array.isArray(E))
      throw new Error("ajv implementation error");
    if (E.some((b) => (0, t.alwaysValidSchema)(g, b)) && !g.opts.unevaluated)
      return;
    const R = m.let("valid", !1), N = m.name("_valid");
    m.block(() => E.forEach((b, M) => {
      const G = c.subschema({
        keyword: y,
        schemaProp: M,
        compositeRule: !0
      }, N);
      m.assign(R, (0, e._)`${R} || ${N}`), c.mergeValidEvaluated(G, N) || m.if((0, e.not)(R));
    })), c.result(R, () => c.reset(), () => c.error(!0));
  }
  return re.validateUnion = h, re;
}
var to;
function zu() {
  if (to) return ge;
  to = 1, Object.defineProperty(ge, "__esModule", { value: !0 }), ge.validateKeywordUsage = ge.validSchemaType = ge.funcKeywordCode = ge.macroKeywordCode = void 0;
  const e = ee(), t = Pe(), o = _e(), n = ur();
  function u(_, p) {
    const { gen: S, keyword: $, schema: l, parentSchema: h, it: c } = _, m = p.macro.call(c.self, l, h, c), E = s(S, $, m);
    c.opts.validateSchema !== !1 && c.self.validateSchema(m, !0);
    const y = S.name("valid");
    _.subschema({
      schema: m,
      schemaPath: e.nil,
      errSchemaPath: `${c.errSchemaPath}/${$}`,
      topSchemaRef: E,
      compositeRule: !0
    }, y), _.pass(y, () => _.error(!0));
  }
  ge.macroKeywordCode = u;
  function a(_, p) {
    var S;
    const { gen: $, keyword: l, schema: h, parentSchema: c, $data: m, it: E } = _;
    i(E, p);
    const y = !m && p.compile ? p.compile.call(E.self, h, c, E) : p.validate, g = s($, l, y), w = $.let("valid");
    _.block$data(w, R), _.ok((S = p.valid) !== null && S !== void 0 ? S : w);
    function R() {
      if (p.errors === !1)
        M(), p.modifying && r(_), G(() => _.error());
      else {
        const k = p.async ? N() : b();
        p.modifying && r(_), G(() => f(_, k));
      }
    }
    function N() {
      const k = $.let("ruleErrs", null);
      return $.try(() => M((0, e._)`await `), (U) => $.assign(w, !1).if((0, e._)`${U} instanceof ${E.ValidationError}`, () => $.assign(k, (0, e._)`${U}.errors`), () => $.throw(U))), k;
    }
    function b() {
      const k = (0, e._)`${g}.errors`;
      return $.assign(k, null), M(e.nil), k;
    }
    function M(k = p.async ? (0, e._)`await ` : e.nil) {
      const U = E.opts.passContext ? t.default.this : t.default.self, x = !("compile" in p && !m || p.schema === !1);
      $.assign(w, (0, e._)`${k}${(0, o.callValidateCode)(_, g, U, x)}`, p.modifying);
    }
    function G(k) {
      var U;
      $.if((0, e.not)((U = p.valid) !== null && U !== void 0 ? U : w), k);
    }
  }
  ge.funcKeywordCode = a;
  function r(_) {
    const { gen: p, data: S, it: $ } = _;
    p.if($.parentData, () => p.assign(S, (0, e._)`${$.parentData}[${$.parentDataProperty}]`));
  }
  function f(_, p) {
    const { gen: S } = _;
    S.if((0, e._)`Array.isArray(${p})`, () => {
      S.assign(t.default.vErrors, (0, e._)`${t.default.vErrors} === null ? ${p} : ${t.default.vErrors}.concat(${p})`).assign(t.default.errors, (0, e._)`${t.default.vErrors}.length`), (0, n.extendErrors)(_);
    }, () => _.error());
  }
  function i({ schemaEnv: _ }, p) {
    if (p.async && !_.$async)
      throw new Error("async keyword in sync schema");
  }
  function s(_, p, S) {
    if (S === void 0)
      throw new Error(`keyword "${p}" failed to compile`);
    return _.scopeValue("keyword", typeof S == "function" ? { ref: S } : { ref: S, code: (0, e.stringify)(S) });
  }
  function d(_, p, S = !1) {
    return !p.length || p.some(($) => $ === "array" ? Array.isArray(_) : $ === "object" ? _ && typeof _ == "object" && !Array.isArray(_) : typeof _ == $ || S && typeof _ > "u");
  }
  ge.validSchemaType = d;
  function v({ schema: _, opts: p, self: S, errSchemaPath: $ }, l, h) {
    if (Array.isArray(l.keyword) ? !l.keyword.includes(h) : l.keyword !== h)
      throw new Error("ajv implementation error");
    const c = l.dependencies;
    if (c?.some((m) => !Object.prototype.hasOwnProperty.call(_, m)))
      throw new Error(`parent schema must have dependencies of ${h}: ${c.join(",")}`);
    if (l.validateSchema && !l.validateSchema(_[h])) {
      const E = `keyword "${h}" value is invalid at path "${$}": ` + S.errorsText(l.validateSchema.errors);
      if (p.validateSchema === "log")
        S.logger.error(E);
      else
        throw new Error(E);
    }
  }
  return ge.validateKeywordUsage = v, ge;
}
var Ne = {}, ro;
function Vu() {
  if (ro) return Ne;
  ro = 1, Object.defineProperty(Ne, "__esModule", { value: !0 }), Ne.extendSubschemaMode = Ne.extendSubschemaData = Ne.getSubschema = void 0;
  const e = ee(), t = te();
  function o(a, { keyword: r, schemaProp: f, schema: i, schemaPath: s, errSchemaPath: d, topSchemaRef: v }) {
    if (r !== void 0 && i !== void 0)
      throw new Error('both "keyword" and "schema" passed, only one allowed');
    if (r !== void 0) {
      const _ = a.schema[r];
      return f === void 0 ? {
        schema: _,
        schemaPath: (0, e._)`${a.schemaPath}${(0, e.getProperty)(r)}`,
        errSchemaPath: `${a.errSchemaPath}/${r}`
      } : {
        schema: _[f],
        schemaPath: (0, e._)`${a.schemaPath}${(0, e.getProperty)(r)}${(0, e.getProperty)(f)}`,
        errSchemaPath: `${a.errSchemaPath}/${r}/${(0, t.escapeFragment)(f)}`
      };
    }
    if (i !== void 0) {
      if (s === void 0 || d === void 0 || v === void 0)
        throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
      return {
        schema: i,
        schemaPath: s,
        topSchemaRef: v,
        errSchemaPath: d
      };
    }
    throw new Error('either "keyword" or "schema" must be passed');
  }
  Ne.getSubschema = o;
  function n(a, r, { dataProp: f, dataPropType: i, data: s, dataTypes: d, propertyName: v }) {
    if (s !== void 0 && f !== void 0)
      throw new Error('both "data" and "dataProp" passed, only one allowed');
    const { gen: _ } = r;
    if (f !== void 0) {
      const { errorPath: S, dataPathArr: $, opts: l } = r, h = _.let("data", (0, e._)`${r.data}${(0, e.getProperty)(f)}`, !0);
      p(h), a.errorPath = (0, e.str)`${S}${(0, t.getErrorPath)(f, i, l.jsPropertySyntax)}`, a.parentDataProperty = (0, e._)`${f}`, a.dataPathArr = [...$, a.parentDataProperty];
    }
    if (s !== void 0) {
      const S = s instanceof e.Name ? s : _.let("data", s, !0);
      p(S), v !== void 0 && (a.propertyName = v);
    }
    d && (a.dataTypes = d);
    function p(S) {
      a.data = S, a.dataLevel = r.dataLevel + 1, a.dataTypes = [], r.definedProperties = /* @__PURE__ */ new Set(), a.parentData = r.data, a.dataNames = [...r.dataNames, S];
    }
  }
  Ne.extendSubschemaData = n;
  function u(a, { jtdDiscriminator: r, jtdMetadata: f, compositeRule: i, createErrors: s, allErrors: d }) {
    i !== void 0 && (a.compositeRule = i), s !== void 0 && (a.createErrors = s), d !== void 0 && (a.allErrors = d), a.jtdDiscriminator = r, a.jtdMetadata = f;
  }
  return Ne.extendSubschemaMode = u, Ne;
}
var ue = {}, un, no;
function Tc() {
  return no || (no = 1, un = function e(t, o) {
    if (t === o) return !0;
    if (t && o && typeof t == "object" && typeof o == "object") {
      if (t.constructor !== o.constructor) return !1;
      var n, u, a;
      if (Array.isArray(t)) {
        if (n = t.length, n != o.length) return !1;
        for (u = n; u-- !== 0; )
          if (!e(t[u], o[u])) return !1;
        return !0;
      }
      if (t.constructor === RegExp) return t.source === o.source && t.flags === o.flags;
      if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === o.valueOf();
      if (t.toString !== Object.prototype.toString) return t.toString() === o.toString();
      if (a = Object.keys(t), n = a.length, n !== Object.keys(o).length) return !1;
      for (u = n; u-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(o, a[u])) return !1;
      for (u = n; u-- !== 0; ) {
        var r = a[u];
        if (!e(t[r], o[r])) return !1;
      }
      return !0;
    }
    return t !== t && o !== o;
  }), un;
}
var fn = { exports: {} }, io;
function Gu() {
  if (io) return fn.exports;
  io = 1;
  var e = fn.exports = function(n, u, a) {
    typeof u == "function" && (a = u, u = {}), a = u.cb || a;
    var r = typeof a == "function" ? a : a.pre || function() {
    }, f = a.post || function() {
    };
    t(u, r, f, n, "", n);
  };
  e.keywords = {
    additionalItems: !0,
    items: !0,
    contains: !0,
    additionalProperties: !0,
    propertyNames: !0,
    not: !0,
    if: !0,
    then: !0,
    else: !0
  }, e.arrayKeywords = {
    items: !0,
    allOf: !0,
    anyOf: !0,
    oneOf: !0
  }, e.propsKeywords = {
    $defs: !0,
    definitions: !0,
    properties: !0,
    patternProperties: !0,
    dependencies: !0
  }, e.skipKeywords = {
    default: !0,
    enum: !0,
    const: !0,
    required: !0,
    maximum: !0,
    minimum: !0,
    exclusiveMaximum: !0,
    exclusiveMinimum: !0,
    multipleOf: !0,
    maxLength: !0,
    minLength: !0,
    pattern: !0,
    format: !0,
    maxItems: !0,
    minItems: !0,
    uniqueItems: !0,
    maxProperties: !0,
    minProperties: !0
  };
  function t(n, u, a, r, f, i, s, d, v, _) {
    if (r && typeof r == "object" && !Array.isArray(r)) {
      u(r, f, i, s, d, v, _);
      for (var p in r) {
        var S = r[p];
        if (Array.isArray(S)) {
          if (p in e.arrayKeywords)
            for (var $ = 0; $ < S.length; $++)
              t(n, u, a, S[$], f + "/" + p + "/" + $, i, f, p, r, $);
        } else if (p in e.propsKeywords) {
          if (S && typeof S == "object")
            for (var l in S)
              t(n, u, a, S[l], f + "/" + p + "/" + o(l), i, f, p, r, l);
        } else (p in e.keywords || n.allKeys && !(p in e.skipKeywords)) && t(n, u, a, S, f + "/" + p, i, f, p, r);
      }
      a(r, f, i, s, d, v, _);
    }
  }
  function o(n) {
    return n.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  return fn.exports;
}
var so;
function fr() {
  if (so) return ue;
  so = 1, Object.defineProperty(ue, "__esModule", { value: !0 }), ue.getSchemaRefs = ue.resolveUrl = ue.normalizeId = ue._getFullPath = ue.getFullPath = ue.inlineRef = void 0;
  const e = te(), t = Tc(), o = Gu(), n = /* @__PURE__ */ new Set([
    "type",
    "format",
    "pattern",
    "maxLength",
    "minLength",
    "maxProperties",
    "minProperties",
    "maxItems",
    "minItems",
    "maximum",
    "minimum",
    "uniqueItems",
    "multipleOf",
    "required",
    "enum",
    "const"
  ]);
  function u($, l = !0) {
    return typeof $ == "boolean" ? !0 : l === !0 ? !r($) : l ? f($) <= l : !1;
  }
  ue.inlineRef = u;
  const a = /* @__PURE__ */ new Set([
    "$ref",
    "$recursiveRef",
    "$recursiveAnchor",
    "$dynamicRef",
    "$dynamicAnchor"
  ]);
  function r($) {
    for (const l in $) {
      if (a.has(l))
        return !0;
      const h = $[l];
      if (Array.isArray(h) && h.some(r) || typeof h == "object" && r(h))
        return !0;
    }
    return !1;
  }
  function f($) {
    let l = 0;
    for (const h in $) {
      if (h === "$ref")
        return 1 / 0;
      if (l++, !n.has(h) && (typeof $[h] == "object" && (0, e.eachItem)($[h], (c) => l += f(c)), l === 1 / 0))
        return 1 / 0;
    }
    return l;
  }
  function i($, l = "", h) {
    h !== !1 && (l = v(l));
    const c = $.parse(l);
    return s($, c);
  }
  ue.getFullPath = i;
  function s($, l) {
    return $.serialize(l).split("#")[0] + "#";
  }
  ue._getFullPath = s;
  const d = /#\/?$/;
  function v($) {
    return $ ? $.replace(d, "") : "";
  }
  ue.normalizeId = v;
  function _($, l, h) {
    return h = v(h), $.resolve(l, h);
  }
  ue.resolveUrl = _;
  const p = /^[a-z_][-a-z0-9._]*$/i;
  function S($, l) {
    if (typeof $ == "boolean")
      return {};
    const { schemaId: h, uriResolver: c } = this.opts, m = v($[h] || l), E = { "": m }, y = i(c, m, !1), g = {}, w = /* @__PURE__ */ new Set();
    return o($, { allKeys: !0 }, (b, M, G, k) => {
      if (k === void 0)
        return;
      const U = y + M;
      let x = E[k];
      typeof b[h] == "string" && (x = K.call(this, b[h])), V.call(this, b.$anchor), V.call(this, b.$dynamicAnchor), E[M] = x;
      function K(C) {
        const j = this.opts.uriResolver.resolve;
        if (C = v(x ? j(x, C) : C), w.has(C))
          throw N(C);
        w.add(C);
        let T = this.refs[C];
        return typeof T == "string" && (T = this.refs[T]), typeof T == "object" ? R(b, T.schema, C) : C !== v(U) && (C[0] === "#" ? (R(b, g[C], C), g[C] = b) : this.refs[C] = U), C;
      }
      function V(C) {
        if (typeof C == "string") {
          if (!p.test(C))
            throw new Error(`invalid anchor "${C}"`);
          K.call(this, `#${C}`);
        }
      }
    }), g;
    function R(b, M, G) {
      if (M !== void 0 && !t(b, M))
        throw N(G);
    }
    function N(b) {
      return new Error(`reference "${b}" resolves to more than one schema`);
    }
  }
  return ue.getSchemaRefs = S, ue;
}
var oo;
function lr() {
  if (oo) return Re;
  oo = 1, Object.defineProperty(Re, "__esModule", { value: !0 }), Re.getData = Re.KeywordCxt = Re.validateFunctionCode = void 0;
  const e = Uu(), t = ar(), o = Pc(), n = ar(), u = xu(), a = zu(), r = Vu(), f = ee(), i = Pe(), s = fr(), d = te(), v = ur();
  function _(D) {
    if (y(D) && (w(D), E(D))) {
      l(D);
      return;
    }
    p(D, () => (0, e.topBoolOrEmptySchema)(D));
  }
  Re.validateFunctionCode = _;
  function p({ gen: D, validateName: A, schema: z, schemaEnv: H, opts: W }, Y) {
    W.code.es5 ? D.func(A, (0, f._)`${i.default.data}, ${i.default.valCxt}`, H.$async, () => {
      D.code((0, f._)`"use strict"; ${c(z, W)}`), $(D, W), D.code(Y);
    }) : D.func(A, (0, f._)`${i.default.data}, ${S(W)}`, H.$async, () => D.code(c(z, W)).code(Y));
  }
  function S(D) {
    return (0, f._)`{${i.default.instancePath}="", ${i.default.parentData}, ${i.default.parentDataProperty}, ${i.default.rootData}=${i.default.data}${D.dynamicRef ? (0, f._)`, ${i.default.dynamicAnchors}={}` : f.nil}}={}`;
  }
  function $(D, A) {
    D.if(i.default.valCxt, () => {
      D.var(i.default.instancePath, (0, f._)`${i.default.valCxt}.${i.default.instancePath}`), D.var(i.default.parentData, (0, f._)`${i.default.valCxt}.${i.default.parentData}`), D.var(i.default.parentDataProperty, (0, f._)`${i.default.valCxt}.${i.default.parentDataProperty}`), D.var(i.default.rootData, (0, f._)`${i.default.valCxt}.${i.default.rootData}`), A.dynamicRef && D.var(i.default.dynamicAnchors, (0, f._)`${i.default.valCxt}.${i.default.dynamicAnchors}`);
    }, () => {
      D.var(i.default.instancePath, (0, f._)`""`), D.var(i.default.parentData, (0, f._)`undefined`), D.var(i.default.parentDataProperty, (0, f._)`undefined`), D.var(i.default.rootData, i.default.data), A.dynamicRef && D.var(i.default.dynamicAnchors, (0, f._)`{}`);
    });
  }
  function l(D) {
    const { schema: A, opts: z, gen: H } = D;
    p(D, () => {
      z.$comment && A.$comment && k(D), b(D), H.let(i.default.vErrors, null), H.let(i.default.errors, 0), z.unevaluated && h(D), R(D), U(D);
    });
  }
  function h(D) {
    const { gen: A, validateName: z } = D;
    D.evaluated = A.const("evaluated", (0, f._)`${z}.evaluated`), A.if((0, f._)`${D.evaluated}.dynamicProps`, () => A.assign((0, f._)`${D.evaluated}.props`, (0, f._)`undefined`)), A.if((0, f._)`${D.evaluated}.dynamicItems`, () => A.assign((0, f._)`${D.evaluated}.items`, (0, f._)`undefined`));
  }
  function c(D, A) {
    const z = typeof D == "object" && D[A.schemaId];
    return z && (A.code.source || A.code.process) ? (0, f._)`/*# sourceURL=${z} */` : f.nil;
  }
  function m(D, A) {
    if (y(D) && (w(D), E(D))) {
      g(D, A);
      return;
    }
    (0, e.boolOrEmptySchema)(D, A);
  }
  function E({ schema: D, self: A }) {
    if (typeof D == "boolean")
      return !D;
    for (const z in D)
      if (A.RULES.all[z])
        return !0;
    return !1;
  }
  function y(D) {
    return typeof D.schema != "boolean";
  }
  function g(D, A) {
    const { schema: z, gen: H, opts: W } = D;
    W.$comment && z.$comment && k(D), M(D), G(D);
    const Y = H.const("_errs", i.default.errors);
    R(D, Y), H.var(A, (0, f._)`${Y} === ${i.default.errors}`);
  }
  function w(D) {
    (0, d.checkUnknownRules)(D), N(D);
  }
  function R(D, A) {
    if (D.opts.jtd)
      return K(D, [], !1, A);
    const z = (0, t.getSchemaTypes)(D.schema), H = (0, t.coerceAndCheckDataType)(D, z);
    K(D, z, !H, A);
  }
  function N(D) {
    const { schema: A, errSchemaPath: z, opts: H, self: W } = D;
    A.$ref && H.ignoreKeywordsWithRef && (0, d.schemaHasRulesButRef)(A, W.RULES) && W.logger.warn(`$ref: keywords ignored in schema at path "${z}"`);
  }
  function b(D) {
    const { schema: A, opts: z } = D;
    A.default !== void 0 && z.useDefaults && z.strictSchema && (0, d.checkStrictMode)(D, "default is ignored in the schema root");
  }
  function M(D) {
    const A = D.schema[D.opts.schemaId];
    A && (D.baseId = (0, s.resolveUrl)(D.opts.uriResolver, D.baseId, A));
  }
  function G(D) {
    if (D.schema.$async && !D.schemaEnv.$async)
      throw new Error("async schema in sync schema");
  }
  function k({ gen: D, schemaEnv: A, schema: z, errSchemaPath: H, opts: W }) {
    const Y = z.$comment;
    if (W.$comment === !0)
      D.code((0, f._)`${i.default.self}.logger.log(${Y})`);
    else if (typeof W.$comment == "function") {
      const se = (0, f.str)`${H}/$comment`, Ee = D.scopeValue("root", { ref: A.root });
      D.code((0, f._)`${i.default.self}.opts.$comment(${Y}, ${se}, ${Ee}.schema)`);
    }
  }
  function U(D) {
    const { gen: A, schemaEnv: z, validateName: H, ValidationError: W, opts: Y } = D;
    z.$async ? A.if((0, f._)`${i.default.errors} === 0`, () => A.return(i.default.data), () => A.throw((0, f._)`new ${W}(${i.default.vErrors})`)) : (A.assign((0, f._)`${H}.errors`, i.default.vErrors), Y.unevaluated && x(D), A.return((0, f._)`${i.default.errors} === 0`));
  }
  function x({ gen: D, evaluated: A, props: z, items: H }) {
    z instanceof f.Name && D.assign((0, f._)`${A}.props`, z), H instanceof f.Name && D.assign((0, f._)`${A}.items`, H);
  }
  function K(D, A, z, H) {
    const { gen: W, schema: Y, data: se, allErrors: Ee, opts: le, self: de } = D, { RULES: oe } = de;
    if (Y.$ref && (le.ignoreKeywordsWithRef || !(0, d.schemaHasRulesButRef)(Y, oe))) {
      W.block(() => B(D, "$ref", oe.all.$ref.definition));
      return;
    }
    le.jtd || C(D, A), W.block(() => {
      for (const pe of oe.rules)
        qe(pe);
      qe(oe.post);
    });
    function qe(pe) {
      (0, o.shouldUseGroup)(Y, pe) && (pe.type ? (W.if((0, n.checkDataType)(pe.type, se, le.strictNumbers)), V(D, pe), A.length === 1 && A[0] === pe.type && z && (W.else(), (0, n.reportTypeError)(D)), W.endIf()) : V(D, pe), Ee || W.if((0, f._)`${i.default.errors} === ${H || 0}`));
    }
  }
  function V(D, A) {
    const { gen: z, schema: H, opts: { useDefaults: W } } = D;
    W && (0, u.assignDefaults)(D, A.type), z.block(() => {
      for (const Y of A.rules)
        (0, o.shouldUseRule)(H, Y) && B(D, Y.keyword, Y.definition, A.type);
    });
  }
  function C(D, A) {
    D.schemaEnv.meta || !D.opts.strictTypes || (j(D, A), D.opts.allowUnionTypes || T(D, A), P(D, D.dataTypes));
  }
  function j(D, A) {
    if (A.length) {
      if (!D.dataTypes.length) {
        D.dataTypes = A;
        return;
      }
      A.forEach((z) => {
        L(D.dataTypes, z) || O(D, `type "${z}" not allowed by context "${D.dataTypes.join(",")}"`);
      }), I(D, A);
    }
  }
  function T(D, A) {
    A.length > 1 && !(A.length === 2 && A.includes("null")) && O(D, "use allowUnionTypes to allow union type keyword");
  }
  function P(D, A) {
    const z = D.self.RULES.all;
    for (const H in z) {
      const W = z[H];
      if (typeof W == "object" && (0, o.shouldUseRule)(D.schema, W)) {
        const { type: Y } = W.definition;
        Y.length && !Y.some((se) => q(A, se)) && O(D, `missing type "${Y.join(",")}" for keyword "${H}"`);
      }
    }
  }
  function q(D, A) {
    return D.includes(A) || A === "number" && D.includes("integer");
  }
  function L(D, A) {
    return D.includes(A) || A === "integer" && D.includes("number");
  }
  function I(D, A) {
    const z = [];
    for (const H of D.dataTypes)
      L(A, H) ? z.push(H) : A.includes("integer") && H === "number" && z.push("integer");
    D.dataTypes = z;
  }
  function O(D, A) {
    const z = D.schemaEnv.baseId + D.errSchemaPath;
    A += ` at "${z}" (strictTypes)`, (0, d.checkStrictMode)(D, A, D.opts.strictTypes);
  }
  class F {
    constructor(A, z, H) {
      if ((0, a.validateKeywordUsage)(A, z, H), this.gen = A.gen, this.allErrors = A.allErrors, this.keyword = H, this.data = A.data, this.schema = A.schema[H], this.$data = z.$data && A.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, d.schemaRefOrVal)(A, this.schema, H, this.$data), this.schemaType = z.schemaType, this.parentSchema = A.schema, this.params = {}, this.it = A, this.def = z, this.$data)
        this.schemaCode = A.gen.const("vSchema", X(this.$data, A));
      else if (this.schemaCode = this.schemaValue, !(0, a.validSchemaType)(this.schema, z.schemaType, z.allowUndefined))
        throw new Error(`${H} value must be ${JSON.stringify(z.schemaType)}`);
      ("code" in z ? z.trackErrors : z.errors !== !1) && (this.errsCount = A.gen.const("_errs", i.default.errors));
    }
    result(A, z, H) {
      this.failResult((0, f.not)(A), z, H);
    }
    failResult(A, z, H) {
      this.gen.if(A), H ? H() : this.error(), z ? (this.gen.else(), z(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    pass(A, z) {
      this.failResult((0, f.not)(A), void 0, z);
    }
    fail(A) {
      if (A === void 0) {
        this.error(), this.allErrors || this.gen.if(!1);
        return;
      }
      this.gen.if(A), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    fail$data(A) {
      if (!this.$data)
        return this.fail(A);
      const { schemaCode: z } = this;
      this.fail((0, f._)`${z} !== undefined && (${(0, f.or)(this.invalid$data(), A)})`);
    }
    error(A, z, H) {
      if (z) {
        this.setParams(z), this._error(A, H), this.setParams({});
        return;
      }
      this._error(A, H);
    }
    _error(A, z) {
      (A ? v.reportExtraError : v.reportError)(this, this.def.error, z);
    }
    $dataError() {
      (0, v.reportError)(this, this.def.$dataError || v.keyword$DataError);
    }
    reset() {
      if (this.errsCount === void 0)
        throw new Error('add "trackErrors" to keyword definition');
      (0, v.resetErrorsCount)(this.gen, this.errsCount);
    }
    ok(A) {
      this.allErrors || this.gen.if(A);
    }
    setParams(A, z) {
      z ? Object.assign(this.params, A) : this.params = A;
    }
    block$data(A, z, H = f.nil) {
      this.gen.block(() => {
        this.check$data(A, H), z();
      });
    }
    check$data(A = f.nil, z = f.nil) {
      if (!this.$data)
        return;
      const { gen: H, schemaCode: W, schemaType: Y, def: se } = this;
      H.if((0, f.or)((0, f._)`${W} === undefined`, z)), A !== f.nil && H.assign(A, !0), (Y.length || se.validateSchema) && (H.elseIf(this.invalid$data()), this.$dataError(), A !== f.nil && H.assign(A, !1)), H.else();
    }
    invalid$data() {
      const { gen: A, schemaCode: z, schemaType: H, def: W, it: Y } = this;
      return (0, f.or)(se(), Ee());
      function se() {
        if (H.length) {
          if (!(z instanceof f.Name))
            throw new Error("ajv implementation error");
          const le = Array.isArray(H) ? H : [H];
          return (0, f._)`${(0, n.checkDataTypes)(le, z, Y.opts.strictNumbers, n.DataType.Wrong)}`;
        }
        return f.nil;
      }
      function Ee() {
        if (W.validateSchema) {
          const le = A.scopeValue("validate$data", { ref: W.validateSchema });
          return (0, f._)`!${le}(${z})`;
        }
        return f.nil;
      }
    }
    subschema(A, z) {
      const H = (0, r.getSubschema)(this.it, A);
      (0, r.extendSubschemaData)(H, this.it, A), (0, r.extendSubschemaMode)(H, A);
      const W = { ...this.it, ...H, items: void 0, props: void 0 };
      return m(W, z), W;
    }
    mergeEvaluated(A, z) {
      const { it: H, gen: W } = this;
      H.opts.unevaluated && (H.props !== !0 && A.props !== void 0 && (H.props = d.mergeEvaluated.props(W, A.props, H.props, z)), H.items !== !0 && A.items !== void 0 && (H.items = d.mergeEvaluated.items(W, A.items, H.items, z)));
    }
    mergeValidEvaluated(A, z) {
      const { it: H, gen: W } = this;
      if (H.opts.unevaluated && (H.props !== !0 || H.items !== !0))
        return W.if(z, () => this.mergeEvaluated(A, f.Name)), !0;
    }
  }
  Re.KeywordCxt = F;
  function B(D, A, z, H) {
    const W = new F(D, z, A);
    "code" in z ? z.code(W, H) : W.$data && z.validate ? (0, a.funcKeywordCode)(W, z) : "macro" in z ? (0, a.macroKeywordCode)(W, z) : (z.compile || z.validate) && (0, a.funcKeywordCode)(W, z);
  }
  const Z = /^\/(?:[^~]|~0|~1)*$/, J = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
  function X(D, { dataLevel: A, dataNames: z, dataPathArr: H }) {
    let W, Y;
    if (D === "")
      return i.default.rootData;
    if (D[0] === "/") {
      if (!Z.test(D))
        throw new Error(`Invalid JSON-pointer: ${D}`);
      W = D, Y = i.default.rootData;
    } else {
      const de = J.exec(D);
      if (!de)
        throw new Error(`Invalid JSON-pointer: ${D}`);
      const oe = +de[1];
      if (W = de[2], W === "#") {
        if (oe >= A)
          throw new Error(le("property/index", oe));
        return H[A - oe];
      }
      if (oe > A)
        throw new Error(le("data", oe));
      if (Y = z[A - oe], !W)
        return Y;
    }
    let se = Y;
    const Ee = W.split("/");
    for (const de of Ee)
      de && (Y = (0, f._)`${Y}${(0, f.getProperty)((0, d.unescapeJsonPointer)(de))}`, se = (0, f._)`${se} && ${Y}`);
    return se;
    function le(de, oe) {
      return `Cannot access ${de} ${oe} levels up, current level is ${A}`;
    }
  }
  return Re.getData = X, Re;
}
var gt = {}, ao;
function Oi() {
  if (ao) return gt;
  ao = 1, Object.defineProperty(gt, "__esModule", { value: !0 });
  class e extends Error {
    constructor(o) {
      super("validation failed"), this.errors = o, this.ajv = this.validation = !0;
    }
  }
  return gt.default = e, gt;
}
var _t = {}, co;
function dr() {
  if (co) return _t;
  co = 1, Object.defineProperty(_t, "__esModule", { value: !0 });
  const e = fr();
  class t extends Error {
    constructor(n, u, a, r) {
      super(r || `can't resolve reference ${a} from id ${u}`), this.missingRef = (0, e.resolveUrl)(n, u, a), this.missingSchema = (0, e.normalizeId)((0, e.getFullPath)(n, this.missingRef));
    }
  }
  return _t.default = t, _t;
}
var me = {}, uo;
function Pi() {
  if (uo) return me;
  uo = 1, Object.defineProperty(me, "__esModule", { value: !0 }), me.resolveSchema = me.getCompilingSchema = me.resolveRef = me.compileSchema = me.SchemaEnv = void 0;
  const e = ee(), t = Oi(), o = Pe(), n = fr(), u = te(), a = lr();
  class r {
    constructor(h) {
      var c;
      this.refs = {}, this.dynamicAnchors = {};
      let m;
      typeof h.schema == "object" && (m = h.schema), this.schema = h.schema, this.schemaId = h.schemaId, this.root = h.root || this, this.baseId = (c = h.baseId) !== null && c !== void 0 ? c : (0, n.normalizeId)(m?.[h.schemaId || "$id"]), this.schemaPath = h.schemaPath, this.localRefs = h.localRefs, this.meta = h.meta, this.$async = m?.$async, this.refs = {};
    }
  }
  me.SchemaEnv = r;
  function f(l) {
    const h = d.call(this, l);
    if (h)
      return h;
    const c = (0, n.getFullPath)(this.opts.uriResolver, l.root.baseId), { es5: m, lines: E } = this.opts.code, { ownProperties: y } = this.opts, g = new e.CodeGen(this.scope, { es5: m, lines: E, ownProperties: y });
    let w;
    l.$async && (w = g.scopeValue("Error", {
      ref: t.default,
      code: (0, e._)`require("ajv/dist/runtime/validation_error").default`
    }));
    const R = g.scopeName("validate");
    l.validateName = R;
    const N = {
      gen: g,
      allErrors: this.opts.allErrors,
      data: o.default.data,
      parentData: o.default.parentData,
      parentDataProperty: o.default.parentDataProperty,
      dataNames: [o.default.data],
      dataPathArr: [e.nil],
      // TODO can its length be used as dataLevel if nil is removed?
      dataLevel: 0,
      dataTypes: [],
      definedProperties: /* @__PURE__ */ new Set(),
      topSchemaRef: g.scopeValue("schema", this.opts.code.source === !0 ? { ref: l.schema, code: (0, e.stringify)(l.schema) } : { ref: l.schema }),
      validateName: R,
      ValidationError: w,
      schema: l.schema,
      schemaEnv: l,
      rootId: c,
      baseId: l.baseId || c,
      schemaPath: e.nil,
      errSchemaPath: l.schemaPath || (this.opts.jtd ? "" : "#"),
      errorPath: (0, e._)`""`,
      opts: this.opts,
      self: this
    };
    let b;
    try {
      this._compilations.add(l), (0, a.validateFunctionCode)(N), g.optimize(this.opts.code.optimize);
      const M = g.toString();
      b = `${g.scopeRefs(o.default.scope)}return ${M}`, this.opts.code.process && (b = this.opts.code.process(b, l));
      const k = new Function(`${o.default.self}`, `${o.default.scope}`, b)(this, this.scope.get());
      if (this.scope.value(R, { ref: k }), k.errors = null, k.schema = l.schema, k.schemaEnv = l, l.$async && (k.$async = !0), this.opts.code.source === !0 && (k.source = { validateName: R, validateCode: M, scopeValues: g._values }), this.opts.unevaluated) {
        const { props: U, items: x } = N;
        k.evaluated = {
          props: U instanceof e.Name ? void 0 : U,
          items: x instanceof e.Name ? void 0 : x,
          dynamicProps: U instanceof e.Name,
          dynamicItems: x instanceof e.Name
        }, k.source && (k.source.evaluated = (0, e.stringify)(k.evaluated));
      }
      return l.validate = k, l;
    } catch (M) {
      throw delete l.validate, delete l.validateName, b && this.logger.error("Error compiling schema, function code:", b), M;
    } finally {
      this._compilations.delete(l);
    }
  }
  me.compileSchema = f;
  function i(l, h, c) {
    var m;
    c = (0, n.resolveUrl)(this.opts.uriResolver, h, c);
    const E = l.refs[c];
    if (E)
      return E;
    let y = _.call(this, l, c);
    if (y === void 0) {
      const g = (m = l.localRefs) === null || m === void 0 ? void 0 : m[c], { schemaId: w } = this.opts;
      g && (y = new r({ schema: g, schemaId: w, root: l, baseId: h }));
    }
    if (y !== void 0)
      return l.refs[c] = s.call(this, y);
  }
  me.resolveRef = i;
  function s(l) {
    return (0, n.inlineRef)(l.schema, this.opts.inlineRefs) ? l.schema : l.validate ? l : f.call(this, l);
  }
  function d(l) {
    for (const h of this._compilations)
      if (v(h, l))
        return h;
  }
  me.getCompilingSchema = d;
  function v(l, h) {
    return l.schema === h.schema && l.root === h.root && l.baseId === h.baseId;
  }
  function _(l, h) {
    let c;
    for (; typeof (c = this.refs[h]) == "string"; )
      h = c;
    return c || this.schemas[h] || p.call(this, l, h);
  }
  function p(l, h) {
    const c = this.opts.uriResolver.parse(h), m = (0, n._getFullPath)(this.opts.uriResolver, c);
    let E = (0, n.getFullPath)(this.opts.uriResolver, l.baseId, void 0);
    if (Object.keys(l.schema).length > 0 && m === E)
      return $.call(this, c, l);
    const y = (0, n.normalizeId)(m), g = this.refs[y] || this.schemas[y];
    if (typeof g == "string") {
      const w = p.call(this, l, g);
      return typeof w?.schema != "object" ? void 0 : $.call(this, c, w);
    }
    if (typeof g?.schema == "object") {
      if (g.validate || f.call(this, g), y === (0, n.normalizeId)(h)) {
        const { schema: w } = g, { schemaId: R } = this.opts, N = w[R];
        return N && (E = (0, n.resolveUrl)(this.opts.uriResolver, E, N)), new r({ schema: w, schemaId: R, root: l, baseId: E });
      }
      return $.call(this, c, g);
    }
  }
  me.resolveSchema = p;
  const S = /* @__PURE__ */ new Set([
    "properties",
    "patternProperties",
    "enum",
    "dependencies",
    "definitions"
  ]);
  function $(l, { baseId: h, schema: c, root: m }) {
    var E;
    if (((E = l.fragment) === null || E === void 0 ? void 0 : E[0]) !== "/")
      return;
    for (const w of l.fragment.slice(1).split("/")) {
      if (typeof c == "boolean")
        return;
      const R = c[(0, u.unescapeFragment)(w)];
      if (R === void 0)
        return;
      c = R;
      const N = typeof c == "object" && c[this.opts.schemaId];
      !S.has(w) && N && (h = (0, n.resolveUrl)(this.opts.uriResolver, h, N));
    }
    let y;
    if (typeof c != "boolean" && c.$ref && !(0, u.schemaHasRulesButRef)(c, this.RULES)) {
      const w = (0, n.resolveUrl)(this.opts.uriResolver, h, c.$ref);
      y = p.call(this, m, w);
    }
    const { schemaId: g } = this.opts;
    if (y = y || new r({ schema: c, schemaId: g, root: m, baseId: h }), y.schema !== y.root.schema)
      return y;
  }
  return me;
}
const Hu = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", Bu = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Ku = "object", Wu = ["$data"], Zu = { $data: { type: "string", anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }] } }, Xu = !1, Ju = {
  $id: Hu,
  description: Bu,
  type: Ku,
  required: Wu,
  properties: Zu,
  additionalProperties: Xu
};
var wt = {}, Ge = { exports: {} }, ln, fo;
function Yu() {
  return fo || (fo = 1, ln = {
    HEX: {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      a: 10,
      A: 10,
      b: 11,
      B: 11,
      c: 12,
      C: 12,
      d: 13,
      D: 13,
      e: 14,
      E: 14,
      f: 15,
      F: 15
    }
  }), ln;
}
var dn, lo;
function Qu() {
  if (lo) return dn;
  lo = 1;
  const { HEX: e } = Yu();
  function t(S) {
    if (r(S, ".") < 3)
      return { host: S, isIPV4: !1 };
    const $ = S.match(/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/u) || [], [l] = $;
    return l ? { host: a(l, "."), isIPV4: !0 } : { host: S, isIPV4: !1 };
  }
  function o(S, $ = !1) {
    let l = "", h = !0;
    for (const c of S) {
      if (e[c] === void 0) return;
      c !== "0" && h === !0 && (h = !1), h || (l += c);
    }
    return $ && l.length === 0 && (l = "0"), l;
  }
  function n(S) {
    let $ = 0;
    const l = { error: !1, address: "", zone: "" }, h = [], c = [];
    let m = !1, E = !1, y = !1;
    function g() {
      if (c.length) {
        if (m === !1) {
          const w = o(c);
          if (w !== void 0)
            h.push(w);
          else
            return l.error = !0, !1;
        }
        c.length = 0;
      }
      return !0;
    }
    for (let w = 0; w < S.length; w++) {
      const R = S[w];
      if (!(R === "[" || R === "]"))
        if (R === ":") {
          if (E === !0 && (y = !0), !g())
            break;
          if ($++, h.push(":"), $ > 7) {
            l.error = !0;
            break;
          }
          w - 1 >= 0 && S[w - 1] === ":" && (E = !0);
          continue;
        } else if (R === "%") {
          if (!g())
            break;
          m = !0;
        } else {
          c.push(R);
          continue;
        }
    }
    return c.length && (m ? l.zone = c.join("") : y ? h.push(c.join("")) : h.push(o(c))), l.address = h.join(""), l;
  }
  function u(S, $ = {}) {
    if (r(S, ":") < 2)
      return { host: S, isIPV6: !1 };
    const l = n(S);
    if (l.error)
      return { host: S, isIPV6: !1 };
    {
      let h = l.address, c = l.address;
      return l.zone && (h += "%" + l.zone, c += "%25" + l.zone), { host: h, escapedHost: c, isIPV6: !0 };
    }
  }
  function a(S, $) {
    let l = "", h = !0;
    const c = S.length;
    for (let m = 0; m < c; m++) {
      const E = S[m];
      E === "0" && h ? (m + 1 <= c && S[m + 1] === $ || m + 1 === c) && (l += E, h = !1) : (E === $ ? h = !0 : h = !1, l += E);
    }
    return l;
  }
  function r(S, $) {
    let l = 0;
    for (let h = 0; h < S.length; h++)
      S[h] === $ && l++;
    return l;
  }
  const f = /^\.\.?\//u, i = /^\/\.(?:\/|$)/u, s = /^\/\.\.(?:\/|$)/u, d = /^\/?(?:.|\n)*?(?=\/|$)/u;
  function v(S) {
    const $ = [];
    for (; S.length; )
      if (S.match(f))
        S = S.replace(f, "");
      else if (S.match(i))
        S = S.replace(i, "/");
      else if (S.match(s))
        S = S.replace(s, "/"), $.pop();
      else if (S === "." || S === "..")
        S = "";
      else {
        const l = S.match(d);
        if (l) {
          const h = l[0];
          S = S.slice(h.length), $.push(h);
        } else
          throw new Error("Unexpected dot segment condition");
      }
    return $.join("");
  }
  function _(S, $) {
    const l = $ !== !0 ? escape : unescape;
    return S.scheme !== void 0 && (S.scheme = l(S.scheme)), S.userinfo !== void 0 && (S.userinfo = l(S.userinfo)), S.host !== void 0 && (S.host = l(S.host)), S.path !== void 0 && (S.path = l(S.path)), S.query !== void 0 && (S.query = l(S.query)), S.fragment !== void 0 && (S.fragment = l(S.fragment)), S;
  }
  function p(S, $) {
    const l = [];
    if (S.userinfo !== void 0 && (l.push(S.userinfo), l.push("@")), S.host !== void 0) {
      let h = unescape(S.host);
      const c = t(h);
      if (c.isIPV4)
        h = c.host;
      else {
        const m = u(c.host, {});
        m.isIPV6 === !0 ? h = `[${m.escapedHost}]` : h = S.host;
      }
      l.push(h);
    }
    return (typeof S.port == "number" || typeof S.port == "string") && (l.push(":"), l.push(String(S.port))), l.length ? l.join("") : void 0;
  }
  return dn = {
    recomposeAuthority: p,
    normalizeComponentEncoding: _,
    removeDotSegments: v,
    normalizeIPv4: t,
    normalizeIPv6: u,
    stringArrayToHexStripped: o
  }, dn;
}
var hn, ho;
function ef() {
  if (ho) return hn;
  ho = 1;
  const e = /^[\da-f]{8}\b-[\da-f]{4}\b-[\da-f]{4}\b-[\da-f]{4}\b-[\da-f]{12}$/iu, t = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
  function o(c) {
    return typeof c.secure == "boolean" ? c.secure : String(c.scheme).toLowerCase() === "wss";
  }
  function n(c) {
    return c.host || (c.error = c.error || "HTTP URIs must have a host."), c;
  }
  function u(c) {
    const m = String(c.scheme).toLowerCase() === "https";
    return (c.port === (m ? 443 : 80) || c.port === "") && (c.port = void 0), c.path || (c.path = "/"), c;
  }
  function a(c) {
    return c.secure = o(c), c.resourceName = (c.path || "/") + (c.query ? "?" + c.query : ""), c.path = void 0, c.query = void 0, c;
  }
  function r(c) {
    if ((c.port === (o(c) ? 443 : 80) || c.port === "") && (c.port = void 0), typeof c.secure == "boolean" && (c.scheme = c.secure ? "wss" : "ws", c.secure = void 0), c.resourceName) {
      const [m, E] = c.resourceName.split("?");
      c.path = m && m !== "/" ? m : void 0, c.query = E, c.resourceName = void 0;
    }
    return c.fragment = void 0, c;
  }
  function f(c, m) {
    if (!c.path)
      return c.error = "URN can not be parsed", c;
    const E = c.path.match(t);
    if (E) {
      const y = m.scheme || c.scheme || "urn";
      c.nid = E[1].toLowerCase(), c.nss = E[2];
      const g = `${y}:${m.nid || c.nid}`, w = h[g];
      c.path = void 0, w && (c = w.parse(c, m));
    } else
      c.error = c.error || "URN can not be parsed.";
    return c;
  }
  function i(c, m) {
    const E = m.scheme || c.scheme || "urn", y = c.nid.toLowerCase(), g = `${E}:${m.nid || y}`, w = h[g];
    w && (c = w.serialize(c, m));
    const R = c, N = c.nss;
    return R.path = `${y || m.nid}:${N}`, m.skipEscape = !0, R;
  }
  function s(c, m) {
    const E = c;
    return E.uuid = E.nss, E.nss = void 0, !m.tolerant && (!E.uuid || !e.test(E.uuid)) && (E.error = E.error || "UUID is not valid."), E;
  }
  function d(c) {
    const m = c;
    return m.nss = (c.uuid || "").toLowerCase(), m;
  }
  const v = {
    scheme: "http",
    domainHost: !0,
    parse: n,
    serialize: u
  }, _ = {
    scheme: "https",
    domainHost: v.domainHost,
    parse: n,
    serialize: u
  }, p = {
    scheme: "ws",
    domainHost: !0,
    parse: a,
    serialize: r
  }, S = {
    scheme: "wss",
    domainHost: p.domainHost,
    parse: p.parse,
    serialize: p.serialize
  }, h = {
    http: v,
    https: _,
    ws: p,
    wss: S,
    urn: {
      scheme: "urn",
      parse: f,
      serialize: i,
      skipNormalize: !0
    },
    "urn:uuid": {
      scheme: "urn:uuid",
      parse: s,
      serialize: d,
      skipNormalize: !0
    }
  };
  return hn = h, hn;
}
var mo;
function tf() {
  if (mo) return Ge.exports;
  mo = 1;
  const { normalizeIPv6: e, normalizeIPv4: t, removeDotSegments: o, recomposeAuthority: n, normalizeComponentEncoding: u } = Qu(), a = ef();
  function r(l, h) {
    return typeof l == "string" ? l = d(S(l, h), h) : typeof l == "object" && (l = S(d(l, h), h)), l;
  }
  function f(l, h, c) {
    const m = Object.assign({ scheme: "null" }, c), E = i(S(l, m), S(h, m), m, !0);
    return d(E, { ...m, skipEscape: !0 });
  }
  function i(l, h, c, m) {
    const E = {};
    return m || (l = S(d(l, c), c), h = S(d(h, c), c)), c = c || {}, !c.tolerant && h.scheme ? (E.scheme = h.scheme, E.userinfo = h.userinfo, E.host = h.host, E.port = h.port, E.path = o(h.path || ""), E.query = h.query) : (h.userinfo !== void 0 || h.host !== void 0 || h.port !== void 0 ? (E.userinfo = h.userinfo, E.host = h.host, E.port = h.port, E.path = o(h.path || ""), E.query = h.query) : (h.path ? (h.path.charAt(0) === "/" ? E.path = o(h.path) : ((l.userinfo !== void 0 || l.host !== void 0 || l.port !== void 0) && !l.path ? E.path = "/" + h.path : l.path ? E.path = l.path.slice(0, l.path.lastIndexOf("/") + 1) + h.path : E.path = h.path, E.path = o(E.path)), E.query = h.query) : (E.path = l.path, h.query !== void 0 ? E.query = h.query : E.query = l.query), E.userinfo = l.userinfo, E.host = l.host, E.port = l.port), E.scheme = l.scheme), E.fragment = h.fragment, E;
  }
  function s(l, h, c) {
    return typeof l == "string" ? (l = unescape(l), l = d(u(S(l, c), !0), { ...c, skipEscape: !0 })) : typeof l == "object" && (l = d(u(l, !0), { ...c, skipEscape: !0 })), typeof h == "string" ? (h = unescape(h), h = d(u(S(h, c), !0), { ...c, skipEscape: !0 })) : typeof h == "object" && (h = d(u(h, !0), { ...c, skipEscape: !0 })), l.toLowerCase() === h.toLowerCase();
  }
  function d(l, h) {
    const c = {
      host: l.host,
      scheme: l.scheme,
      userinfo: l.userinfo,
      port: l.port,
      path: l.path,
      query: l.query,
      nid: l.nid,
      nss: l.nss,
      uuid: l.uuid,
      fragment: l.fragment,
      reference: l.reference,
      resourceName: l.resourceName,
      secure: l.secure,
      error: ""
    }, m = Object.assign({}, h), E = [], y = a[(m.scheme || c.scheme || "").toLowerCase()];
    y && y.serialize && y.serialize(c, m), c.path !== void 0 && (m.skipEscape ? c.path = unescape(c.path) : (c.path = escape(c.path), c.scheme !== void 0 && (c.path = c.path.split("%3A").join(":")))), m.reference !== "suffix" && c.scheme && E.push(c.scheme, ":");
    const g = n(c, m);
    if (g !== void 0 && (m.reference !== "suffix" && E.push("//"), E.push(g), c.path && c.path.charAt(0) !== "/" && E.push("/")), c.path !== void 0) {
      let w = c.path;
      !m.absolutePath && (!y || !y.absolutePath) && (w = o(w)), g === void 0 && (w = w.replace(/^\/\//u, "/%2F")), E.push(w);
    }
    return c.query !== void 0 && E.push("?", c.query), c.fragment !== void 0 && E.push("#", c.fragment), E.join("");
  }
  const v = Array.from({ length: 127 }, (l, h) => /[^!"$&'()*+,\-.;=_`a-z{}~]/u.test(String.fromCharCode(h)));
  function _(l) {
    let h = 0;
    for (let c = 0, m = l.length; c < m; ++c)
      if (h = l.charCodeAt(c), h > 126 || v[h])
        return !0;
    return !1;
  }
  const p = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
  function S(l, h) {
    const c = Object.assign({}, h), m = {
      scheme: void 0,
      userinfo: void 0,
      host: "",
      port: void 0,
      path: "",
      query: void 0,
      fragment: void 0
    }, E = l.indexOf("%") !== -1;
    let y = !1;
    c.reference === "suffix" && (l = (c.scheme ? c.scheme + ":" : "") + "//" + l);
    const g = l.match(p);
    if (g) {
      if (m.scheme = g[1], m.userinfo = g[3], m.host = g[4], m.port = parseInt(g[5], 10), m.path = g[6] || "", m.query = g[7], m.fragment = g[8], isNaN(m.port) && (m.port = g[5]), m.host) {
        const R = t(m.host);
        if (R.isIPV4 === !1) {
          const N = e(R.host, { isIPV4: !1 });
          m.host = N.host.toLowerCase(), y = N.isIPV6;
        } else
          m.host = R.host, y = !0;
      }
      m.scheme === void 0 && m.userinfo === void 0 && m.host === void 0 && m.port === void 0 && !m.path && m.query === void 0 ? m.reference = "same-document" : m.scheme === void 0 ? m.reference = "relative" : m.fragment === void 0 ? m.reference = "absolute" : m.reference = "uri", c.reference && c.reference !== "suffix" && c.reference !== m.reference && (m.error = m.error || "URI is not a " + c.reference + " reference.");
      const w = a[(c.scheme || m.scheme || "").toLowerCase()];
      if (!c.unicodeSupport && (!w || !w.unicodeSupport) && m.host && (c.domainHost || w && w.domainHost) && y === !1 && _(m.host))
        try {
          m.host = URL.domainToASCII(m.host.toLowerCase());
        } catch (R) {
          m.error = m.error || "Host's domain name can not be converted to ASCII: " + R;
        }
      (!w || w && !w.skipNormalize) && (E && m.scheme !== void 0 && (m.scheme = unescape(m.scheme)), E && m.host !== void 0 && (m.host = unescape(m.host)), m.path !== void 0 && m.path.length && (m.path = escape(unescape(m.path))), m.fragment !== void 0 && m.fragment.length && (m.fragment = encodeURI(decodeURIComponent(m.fragment)))), w && w.parse && w.parse(m, c);
    } else
      m.error = m.error || "URI can not be parsed.";
    return m;
  }
  const $ = {
    SCHEMES: a,
    normalize: r,
    resolve: f,
    resolveComponents: i,
    equal: s,
    serialize: d,
    parse: S
  };
  return Ge.exports = $, Ge.exports.default = $, Ge.exports.fastUri = $, Ge.exports;
}
var po;
function rf() {
  if (po) return wt;
  po = 1, Object.defineProperty(wt, "__esModule", { value: !0 });
  const e = tf();
  return e.code = 'require("ajv/dist/runtime/uri").default', wt.default = e, wt;
}
var yo;
function nf() {
  return yo || (yo = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
    var t = lr();
    Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
      return t.KeywordCxt;
    } });
    var o = ee();
    Object.defineProperty(e, "_", { enumerable: !0, get: function() {
      return o._;
    } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
      return o.str;
    } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
      return o.stringify;
    } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
      return o.nil;
    } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
      return o.Name;
    } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
      return o.CodeGen;
    } });
    const n = Oi(), u = dr(), a = Oc(), r = Pi(), f = ee(), i = fr(), s = ar(), d = te(), v = Ju, _ = rf(), p = (T, P) => new RegExp(T, P);
    p.code = "new RegExp";
    const S = ["removeAdditional", "useDefaults", "coerceTypes"], $ = /* @__PURE__ */ new Set([
      "validate",
      "serialize",
      "parse",
      "wrapper",
      "root",
      "schema",
      "keyword",
      "pattern",
      "formats",
      "validate$data",
      "func",
      "obj",
      "Error"
    ]), l = {
      errorDataPath: "",
      format: "`validateFormats: false` can be used instead.",
      nullable: '"nullable" keyword is supported by default.',
      jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
      extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
      missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
      processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
      sourceCode: "Use option `code: {source: true}`",
      strictDefaults: "It is default now, see option `strict`.",
      strictKeywords: "It is default now, see option `strict`.",
      uniqueItems: '"uniqueItems" keyword is always validated.',
      unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
      cache: "Map is used as cache, schema object as key.",
      serialize: "Map is used as cache, schema object as key.",
      ajvErrors: "It is default now."
    }, h = {
      ignoreKeywordsWithRef: "",
      jsPropertySyntax: "",
      unicode: '"minLength"/"maxLength" account for unicode characters by default.'
    }, c = 200;
    function m(T) {
      var P, q, L, I, O, F, B, Z, J, X, D, A, z, H, W, Y, se, Ee, le, de, oe, qe, pe, vr, gr;
      const ze = T.strict, _r = (P = T.code) === null || P === void 0 ? void 0 : P.optimize, ji = _r === !0 || _r === void 0 ? 1 : _r || 0, ki = (L = (q = T.code) === null || q === void 0 ? void 0 : q.regExp) !== null && L !== void 0 ? L : p, zc = (I = T.uriResolver) !== null && I !== void 0 ? I : _.default;
      return {
        strictSchema: (F = (O = T.strictSchema) !== null && O !== void 0 ? O : ze) !== null && F !== void 0 ? F : !0,
        strictNumbers: (Z = (B = T.strictNumbers) !== null && B !== void 0 ? B : ze) !== null && Z !== void 0 ? Z : !0,
        strictTypes: (X = (J = T.strictTypes) !== null && J !== void 0 ? J : ze) !== null && X !== void 0 ? X : "log",
        strictTuples: (A = (D = T.strictTuples) !== null && D !== void 0 ? D : ze) !== null && A !== void 0 ? A : "log",
        strictRequired: (H = (z = T.strictRequired) !== null && z !== void 0 ? z : ze) !== null && H !== void 0 ? H : !1,
        code: T.code ? { ...T.code, optimize: ji, regExp: ki } : { optimize: ji, regExp: ki },
        loopRequired: (W = T.loopRequired) !== null && W !== void 0 ? W : c,
        loopEnum: (Y = T.loopEnum) !== null && Y !== void 0 ? Y : c,
        meta: (se = T.meta) !== null && se !== void 0 ? se : !0,
        messages: (Ee = T.messages) !== null && Ee !== void 0 ? Ee : !0,
        inlineRefs: (le = T.inlineRefs) !== null && le !== void 0 ? le : !0,
        schemaId: (de = T.schemaId) !== null && de !== void 0 ? de : "$id",
        addUsedSchema: (oe = T.addUsedSchema) !== null && oe !== void 0 ? oe : !0,
        validateSchema: (qe = T.validateSchema) !== null && qe !== void 0 ? qe : !0,
        validateFormats: (pe = T.validateFormats) !== null && pe !== void 0 ? pe : !0,
        unicodeRegExp: (vr = T.unicodeRegExp) !== null && vr !== void 0 ? vr : !0,
        int32range: (gr = T.int32range) !== null && gr !== void 0 ? gr : !0,
        uriResolver: zc
      };
    }
    class E {
      constructor(P = {}) {
        this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), P = this.opts = { ...P, ...m(P) };
        const { es5: q, lines: L } = this.opts.code;
        this.scope = new f.ValueScope({ scope: {}, prefixes: $, es5: q, lines: L }), this.logger = G(P.logger);
        const I = P.validateFormats;
        P.validateFormats = !1, this.RULES = (0, a.getRules)(), y.call(this, l, P, "NOT SUPPORTED"), y.call(this, h, P, "DEPRECATED", "warn"), this._metaOpts = b.call(this), P.formats && R.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), P.keywords && N.call(this, P.keywords), typeof P.meta == "object" && this.addMetaSchema(P.meta), w.call(this), P.validateFormats = I;
      }
      _addVocabularies() {
        this.addKeyword("$async");
      }
      _addDefaultMetaSchema() {
        const { $data: P, meta: q, schemaId: L } = this.opts;
        let I = v;
        L === "id" && (I = { ...v }, I.id = I.$id, delete I.$id), q && P && this.addMetaSchema(I, I[L], !1);
      }
      defaultMeta() {
        const { meta: P, schemaId: q } = this.opts;
        return this.opts.defaultMeta = typeof P == "object" ? P[q] || P : void 0;
      }
      validate(P, q) {
        let L;
        if (typeof P == "string") {
          if (L = this.getSchema(P), !L)
            throw new Error(`no schema with key or ref "${P}"`);
        } else
          L = this.compile(P);
        const I = L(q);
        return "$async" in L || (this.errors = L.errors), I;
      }
      compile(P, q) {
        const L = this._addSchema(P, q);
        return L.validate || this._compileSchemaEnv(L);
      }
      compileAsync(P, q) {
        if (typeof this.opts.loadSchema != "function")
          throw new Error("options.loadSchema should be a function");
        const { loadSchema: L } = this.opts;
        return I.call(this, P, q);
        async function I(X, D) {
          await O.call(this, X.$schema);
          const A = this._addSchema(X, D);
          return A.validate || F.call(this, A);
        }
        async function O(X) {
          X && !this.getSchema(X) && await I.call(this, { $ref: X }, !0);
        }
        async function F(X) {
          try {
            return this._compileSchemaEnv(X);
          } catch (D) {
            if (!(D instanceof u.default))
              throw D;
            return B.call(this, D), await Z.call(this, D.missingSchema), F.call(this, X);
          }
        }
        function B({ missingSchema: X, missingRef: D }) {
          if (this.refs[X])
            throw new Error(`AnySchema ${X} is loaded but ${D} cannot be resolved`);
        }
        async function Z(X) {
          const D = await J.call(this, X);
          this.refs[X] || await O.call(this, D.$schema), this.refs[X] || this.addSchema(D, X, q);
        }
        async function J(X) {
          const D = this._loading[X];
          if (D)
            return D;
          try {
            return await (this._loading[X] = L(X));
          } finally {
            delete this._loading[X];
          }
        }
      }
      // Adds schema to the instance
      addSchema(P, q, L, I = this.opts.validateSchema) {
        if (Array.isArray(P)) {
          for (const F of P)
            this.addSchema(F, void 0, L, I);
          return this;
        }
        let O;
        if (typeof P == "object") {
          const { schemaId: F } = this.opts;
          if (O = P[F], O !== void 0 && typeof O != "string")
            throw new Error(`schema ${F} must be string`);
        }
        return q = (0, i.normalizeId)(q || O), this._checkUnique(q), this.schemas[q] = this._addSchema(P, L, q, I, !0), this;
      }
      // Add schema that will be used to validate other schemas
      // options in META_IGNORE_OPTIONS are alway set to false
      addMetaSchema(P, q, L = this.opts.validateSchema) {
        return this.addSchema(P, q, !0, L), this;
      }
      //  Validate schema against its meta-schema
      validateSchema(P, q) {
        if (typeof P == "boolean")
          return !0;
        let L;
        if (L = P.$schema, L !== void 0 && typeof L != "string")
          throw new Error("$schema must be a string");
        if (L = L || this.opts.defaultMeta || this.defaultMeta(), !L)
          return this.logger.warn("meta-schema not available"), this.errors = null, !0;
        const I = this.validate(L, P);
        if (!I && q) {
          const O = "schema is invalid: " + this.errorsText();
          if (this.opts.validateSchema === "log")
            this.logger.error(O);
          else
            throw new Error(O);
        }
        return I;
      }
      // Get compiled schema by `key` or `ref`.
      // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
      getSchema(P) {
        let q;
        for (; typeof (q = g.call(this, P)) == "string"; )
          P = q;
        if (q === void 0) {
          const { schemaId: L } = this.opts, I = new r.SchemaEnv({ schema: {}, schemaId: L });
          if (q = r.resolveSchema.call(this, I, P), !q)
            return;
          this.refs[P] = q;
        }
        return q.validate || this._compileSchemaEnv(q);
      }
      // Remove cached schema(s).
      // If no parameter is passed all schemas but meta-schemas are removed.
      // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
      // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
      removeSchema(P) {
        if (P instanceof RegExp)
          return this._removeAllSchemas(this.schemas, P), this._removeAllSchemas(this.refs, P), this;
        switch (typeof P) {
          case "undefined":
            return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
          case "string": {
            const q = g.call(this, P);
            return typeof q == "object" && this._cache.delete(q.schema), delete this.schemas[P], delete this.refs[P], this;
          }
          case "object": {
            const q = P;
            this._cache.delete(q);
            let L = P[this.opts.schemaId];
            return L && (L = (0, i.normalizeId)(L), delete this.schemas[L], delete this.refs[L]), this;
          }
          default:
            throw new Error("ajv.removeSchema: invalid parameter");
        }
      }
      // add "vocabulary" - a collection of keywords
      addVocabulary(P) {
        for (const q of P)
          this.addKeyword(q);
        return this;
      }
      addKeyword(P, q) {
        let L;
        if (typeof P == "string")
          L = P, typeof q == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), q.keyword = L);
        else if (typeof P == "object" && q === void 0) {
          if (q = P, L = q.keyword, Array.isArray(L) && !L.length)
            throw new Error("addKeywords: keyword must be string or non-empty array");
        } else
          throw new Error("invalid addKeywords parameters");
        if (U.call(this, L, q), !q)
          return (0, d.eachItem)(L, (O) => x.call(this, O)), this;
        V.call(this, q);
        const I = {
          ...q,
          type: (0, s.getJSONTypes)(q.type),
          schemaType: (0, s.getJSONTypes)(q.schemaType)
        };
        return (0, d.eachItem)(L, I.type.length === 0 ? (O) => x.call(this, O, I) : (O) => I.type.forEach((F) => x.call(this, O, I, F))), this;
      }
      getKeyword(P) {
        const q = this.RULES.all[P];
        return typeof q == "object" ? q.definition : !!q;
      }
      // Remove keyword
      removeKeyword(P) {
        const { RULES: q } = this;
        delete q.keywords[P], delete q.all[P];
        for (const L of q.rules) {
          const I = L.rules.findIndex((O) => O.keyword === P);
          I >= 0 && L.rules.splice(I, 1);
        }
        return this;
      }
      // Add format
      addFormat(P, q) {
        return typeof q == "string" && (q = new RegExp(q)), this.formats[P] = q, this;
      }
      errorsText(P = this.errors, { separator: q = ", ", dataVar: L = "data" } = {}) {
        return !P || P.length === 0 ? "No errors" : P.map((I) => `${L}${I.instancePath} ${I.message}`).reduce((I, O) => I + q + O);
      }
      $dataMetaSchema(P, q) {
        const L = this.RULES.all;
        P = JSON.parse(JSON.stringify(P));
        for (const I of q) {
          const O = I.split("/").slice(1);
          let F = P;
          for (const B of O)
            F = F[B];
          for (const B in L) {
            const Z = L[B];
            if (typeof Z != "object")
              continue;
            const { $data: J } = Z.definition, X = F[B];
            J && X && (F[B] = j(X));
          }
        }
        return P;
      }
      _removeAllSchemas(P, q) {
        for (const L in P) {
          const I = P[L];
          (!q || q.test(L)) && (typeof I == "string" ? delete P[L] : I && !I.meta && (this._cache.delete(I.schema), delete P[L]));
        }
      }
      _addSchema(P, q, L, I = this.opts.validateSchema, O = this.opts.addUsedSchema) {
        let F;
        const { schemaId: B } = this.opts;
        if (typeof P == "object")
          F = P[B];
        else {
          if (this.opts.jtd)
            throw new Error("schema must be object");
          if (typeof P != "boolean")
            throw new Error("schema must be object or boolean");
        }
        let Z = this._cache.get(P);
        if (Z !== void 0)
          return Z;
        L = (0, i.normalizeId)(F || L);
        const J = i.getSchemaRefs.call(this, P, L);
        return Z = new r.SchemaEnv({ schema: P, schemaId: B, meta: q, baseId: L, localRefs: J }), this._cache.set(Z.schema, Z), O && !L.startsWith("#") && (L && this._checkUnique(L), this.refs[L] = Z), I && this.validateSchema(P, !0), Z;
      }
      _checkUnique(P) {
        if (this.schemas[P] || this.refs[P])
          throw new Error(`schema with key or id "${P}" already exists`);
      }
      _compileSchemaEnv(P) {
        if (P.meta ? this._compileMetaSchema(P) : r.compileSchema.call(this, P), !P.validate)
          throw new Error("ajv implementation error");
        return P.validate;
      }
      _compileMetaSchema(P) {
        const q = this.opts;
        this.opts = this._metaOpts;
        try {
          r.compileSchema.call(this, P);
        } finally {
          this.opts = q;
        }
      }
    }
    E.ValidationError = n.default, E.MissingRefError = u.default, e.default = E;
    function y(T, P, q, L = "error") {
      for (const I in T) {
        const O = I;
        O in P && this.logger[L](`${q}: option ${I}. ${T[O]}`);
      }
    }
    function g(T) {
      return T = (0, i.normalizeId)(T), this.schemas[T] || this.refs[T];
    }
    function w() {
      const T = this.opts.schemas;
      if (T)
        if (Array.isArray(T))
          this.addSchema(T);
        else
          for (const P in T)
            this.addSchema(T[P], P);
    }
    function R() {
      for (const T in this.opts.formats) {
        const P = this.opts.formats[T];
        P && this.addFormat(T, P);
      }
    }
    function N(T) {
      if (Array.isArray(T)) {
        this.addVocabulary(T);
        return;
      }
      this.logger.warn("keywords option as map is deprecated, pass array");
      for (const P in T) {
        const q = T[P];
        q.keyword || (q.keyword = P), this.addKeyword(q);
      }
    }
    function b() {
      const T = { ...this.opts };
      for (const P of S)
        delete T[P];
      return T;
    }
    const M = { log() {
    }, warn() {
    }, error() {
    } };
    function G(T) {
      if (T === !1)
        return M;
      if (T === void 0)
        return console;
      if (T.log && T.warn && T.error)
        return T;
      throw new Error("logger must implement log, warn and error methods");
    }
    const k = /^[a-z_$][a-z0-9_$:-]*$/i;
    function U(T, P) {
      const { RULES: q } = this;
      if ((0, d.eachItem)(T, (L) => {
        if (q.keywords[L])
          throw new Error(`Keyword ${L} is already defined`);
        if (!k.test(L))
          throw new Error(`Keyword ${L} has invalid name`);
      }), !!P && P.$data && !("code" in P || "validate" in P))
        throw new Error('$data keyword must have "code" or "validate" function');
    }
    function x(T, P, q) {
      var L;
      const I = P?.post;
      if (q && I)
        throw new Error('keyword with "post" flag cannot have "type"');
      const { RULES: O } = this;
      let F = I ? O.post : O.rules.find(({ type: Z }) => Z === q);
      if (F || (F = { type: q, rules: [] }, O.rules.push(F)), O.keywords[T] = !0, !P)
        return;
      const B = {
        keyword: T,
        definition: {
          ...P,
          type: (0, s.getJSONTypes)(P.type),
          schemaType: (0, s.getJSONTypes)(P.schemaType)
        }
      };
      P.before ? K.call(this, F, B, P.before) : F.rules.push(B), O.all[T] = B, (L = P.implements) === null || L === void 0 || L.forEach((Z) => this.addKeyword(Z));
    }
    function K(T, P, q) {
      const L = T.rules.findIndex((I) => I.keyword === q);
      L >= 0 ? T.rules.splice(L, 0, P) : (T.rules.push(P), this.logger.warn(`rule ${q} is not defined`));
    }
    function V(T) {
      let { metaSchema: P } = T;
      P !== void 0 && (T.$data && this.opts.$data && (P = j(P)), T.validateSchema = this.compile(P, !0));
    }
    const C = {
      $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
    };
    function j(T) {
      return { anyOf: [T, C] };
    }
  }(nn)), nn;
}
var St = {}, $t = {}, Rt = {}, Eo;
function sf() {
  if (Eo) return Rt;
  Eo = 1, Object.defineProperty(Rt, "__esModule", { value: !0 });
  const e = {
    keyword: "id",
    code() {
      throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
    }
  };
  return Rt.default = e, Rt;
}
var Oe = {}, vo;
function of() {
  if (vo) return Oe;
  vo = 1, Object.defineProperty(Oe, "__esModule", { value: !0 }), Oe.callRef = Oe.getValidate = void 0;
  const e = dr(), t = _e(), o = ee(), n = Pe(), u = Pi(), a = te(), r = {
    keyword: "$ref",
    schemaType: "string",
    code(s) {
      const { gen: d, schema: v, it: _ } = s, { baseId: p, schemaEnv: S, validateName: $, opts: l, self: h } = _, { root: c } = S;
      if ((v === "#" || v === "#/") && p === c.baseId)
        return E();
      const m = u.resolveRef.call(h, c, p, v);
      if (m === void 0)
        throw new e.default(_.opts.uriResolver, p, v);
      if (m instanceof u.SchemaEnv)
        return y(m);
      return g(m);
      function E() {
        if (S === c)
          return i(s, $, S, S.$async);
        const w = d.scopeValue("root", { ref: c });
        return i(s, (0, o._)`${w}.validate`, c, c.$async);
      }
      function y(w) {
        const R = f(s, w);
        i(s, R, w, w.$async);
      }
      function g(w) {
        const R = d.scopeValue("schema", l.code.source === !0 ? { ref: w, code: (0, o.stringify)(w) } : { ref: w }), N = d.name("valid"), b = s.subschema({
          schema: w,
          dataTypes: [],
          schemaPath: o.nil,
          topSchemaRef: R,
          errSchemaPath: v
        }, N);
        s.mergeEvaluated(b), s.ok(N);
      }
    }
  };
  function f(s, d) {
    const { gen: v } = s;
    return d.validate ? v.scopeValue("validate", { ref: d.validate }) : (0, o._)`${v.scopeValue("wrapper", { ref: d })}.validate`;
  }
  Oe.getValidate = f;
  function i(s, d, v, _) {
    const { gen: p, it: S } = s, { allErrors: $, schemaEnv: l, opts: h } = S, c = h.passContext ? n.default.this : o.nil;
    _ ? m() : E();
    function m() {
      if (!l.$async)
        throw new Error("async schema referenced by sync schema");
      const w = p.let("valid");
      p.try(() => {
        p.code((0, o._)`await ${(0, t.callValidateCode)(s, d, c)}`), g(d), $ || p.assign(w, !0);
      }, (R) => {
        p.if((0, o._)`!(${R} instanceof ${S.ValidationError})`, () => p.throw(R)), y(R), $ || p.assign(w, !1);
      }), s.ok(w);
    }
    function E() {
      s.result((0, t.callValidateCode)(s, d, c), () => g(d), () => y(d));
    }
    function y(w) {
      const R = (0, o._)`${w}.errors`;
      p.assign(n.default.vErrors, (0, o._)`${n.default.vErrors} === null ? ${R} : ${n.default.vErrors}.concat(${R})`), p.assign(n.default.errors, (0, o._)`${n.default.vErrors}.length`);
    }
    function g(w) {
      var R;
      if (!S.opts.unevaluated)
        return;
      const N = (R = v?.validate) === null || R === void 0 ? void 0 : R.evaluated;
      if (S.props !== !0)
        if (N && !N.dynamicProps)
          N.props !== void 0 && (S.props = a.mergeEvaluated.props(p, N.props, S.props));
        else {
          const b = p.var("props", (0, o._)`${w}.evaluated.props`);
          S.props = a.mergeEvaluated.props(p, b, S.props, o.Name);
        }
      if (S.items !== !0)
        if (N && !N.dynamicItems)
          N.items !== void 0 && (S.items = a.mergeEvaluated.items(p, N.items, S.items));
        else {
          const b = p.var("items", (0, o._)`${w}.evaluated.items`);
          S.items = a.mergeEvaluated.items(p, b, S.items, o.Name);
        }
    }
  }
  return Oe.callRef = i, Oe.default = r, Oe;
}
var go;
function af() {
  if (go) return $t;
  go = 1, Object.defineProperty($t, "__esModule", { value: !0 });
  const e = sf(), t = of(), o = [
    "$schema",
    "$id",
    "$defs",
    "$vocabulary",
    { keyword: "$comment" },
    "definitions",
    e.default,
    t.default
  ];
  return $t.default = o, $t;
}
var It = {}, Nt = {}, _o;
function cf() {
  if (_o) return Nt;
  _o = 1, Object.defineProperty(Nt, "__esModule", { value: !0 });
  const e = ee(), t = e.operators, o = {
    maximum: { okStr: "<=", ok: t.LTE, fail: t.GT },
    minimum: { okStr: ">=", ok: t.GTE, fail: t.LT },
    exclusiveMaximum: { okStr: "<", ok: t.LT, fail: t.GTE },
    exclusiveMinimum: { okStr: ">", ok: t.GT, fail: t.LTE }
  }, n = {
    message: ({ keyword: a, schemaCode: r }) => (0, e.str)`must be ${o[a].okStr} ${r}`,
    params: ({ keyword: a, schemaCode: r }) => (0, e._)`{comparison: ${o[a].okStr}, limit: ${r}}`
  }, u = {
    keyword: Object.keys(o),
    type: "number",
    schemaType: "number",
    $data: !0,
    error: n,
    code(a) {
      const { keyword: r, data: f, schemaCode: i } = a;
      a.fail$data((0, e._)`${f} ${o[r].fail} ${i} || isNaN(${f})`);
    }
  };
  return Nt.default = u, Nt;
}
var Ot = {}, wo;
function uf() {
  if (wo) return Ot;
  wo = 1, Object.defineProperty(Ot, "__esModule", { value: !0 });
  const e = ee(), o = {
    keyword: "multipleOf",
    type: "number",
    schemaType: "number",
    $data: !0,
    error: {
      message: ({ schemaCode: n }) => (0, e.str)`must be multiple of ${n}`,
      params: ({ schemaCode: n }) => (0, e._)`{multipleOf: ${n}}`
    },
    code(n) {
      const { gen: u, data: a, schemaCode: r, it: f } = n, i = f.opts.multipleOfPrecision, s = u.let("res"), d = i ? (0, e._)`Math.abs(Math.round(${s}) - ${s}) > 1e-${i}` : (0, e._)`${s} !== parseInt(${s})`;
      n.fail$data((0, e._)`(${r} === 0 || (${s} = ${a}/${r}, ${d}))`);
    }
  };
  return Ot.default = o, Ot;
}
var Pt = {}, Tt = {}, So;
function ff() {
  if (So) return Tt;
  So = 1, Object.defineProperty(Tt, "__esModule", { value: !0 });
  function e(t) {
    const o = t.length;
    let n = 0, u = 0, a;
    for (; u < o; )
      n++, a = t.charCodeAt(u++), a >= 55296 && a <= 56319 && u < o && (a = t.charCodeAt(u), (a & 64512) === 56320 && u++);
    return n;
  }
  return Tt.default = e, e.code = 'require("ajv/dist/runtime/ucs2length").default', Tt;
}
var $o;
function lf() {
  if ($o) return Pt;
  $o = 1, Object.defineProperty(Pt, "__esModule", { value: !0 });
  const e = ee(), t = te(), o = ff(), u = {
    keyword: ["maxLength", "minLength"],
    type: "string",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: a, schemaCode: r }) {
        const f = a === "maxLength" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${f} than ${r} characters`;
      },
      params: ({ schemaCode: a }) => (0, e._)`{limit: ${a}}`
    },
    code(a) {
      const { keyword: r, data: f, schemaCode: i, it: s } = a, d = r === "maxLength" ? e.operators.GT : e.operators.LT, v = s.opts.unicode === !1 ? (0, e._)`${f}.length` : (0, e._)`${(0, t.useFunc)(a.gen, o.default)}(${f})`;
      a.fail$data((0, e._)`${v} ${d} ${i}`);
    }
  };
  return Pt.default = u, Pt;
}
var bt = {}, Ro;
function df() {
  if (Ro) return bt;
  Ro = 1, Object.defineProperty(bt, "__esModule", { value: !0 });
  const e = _e(), t = ee(), n = {
    keyword: "pattern",
    type: "string",
    schemaType: "string",
    $data: !0,
    error: {
      message: ({ schemaCode: u }) => (0, t.str)`must match pattern "${u}"`,
      params: ({ schemaCode: u }) => (0, t._)`{pattern: ${u}}`
    },
    code(u) {
      const { data: a, $data: r, schema: f, schemaCode: i, it: s } = u, d = s.opts.unicodeRegExp ? "u" : "", v = r ? (0, t._)`(new RegExp(${i}, ${d}))` : (0, e.usePattern)(u, f);
      u.fail$data((0, t._)`!${v}.test(${a})`);
    }
  };
  return bt.default = n, bt;
}
var Dt = {}, Io;
function hf() {
  if (Io) return Dt;
  Io = 1, Object.defineProperty(Dt, "__esModule", { value: !0 });
  const e = ee(), o = {
    keyword: ["maxProperties", "minProperties"],
    type: "object",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: n, schemaCode: u }) {
        const a = n === "maxProperties" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${a} than ${u} properties`;
      },
      params: ({ schemaCode: n }) => (0, e._)`{limit: ${n}}`
    },
    code(n) {
      const { keyword: u, data: a, schemaCode: r } = n, f = u === "maxProperties" ? e.operators.GT : e.operators.LT;
      n.fail$data((0, e._)`Object.keys(${a}).length ${f} ${r}`);
    }
  };
  return Dt.default = o, Dt;
}
var Ct = {}, No;
function mf() {
  if (No) return Ct;
  No = 1, Object.defineProperty(Ct, "__esModule", { value: !0 });
  const e = _e(), t = ee(), o = te(), u = {
    keyword: "required",
    type: "object",
    schemaType: "array",
    $data: !0,
    error: {
      message: ({ params: { missingProperty: a } }) => (0, t.str)`must have required property '${a}'`,
      params: ({ params: { missingProperty: a } }) => (0, t._)`{missingProperty: ${a}}`
    },
    code(a) {
      const { gen: r, schema: f, schemaCode: i, data: s, $data: d, it: v } = a, { opts: _ } = v;
      if (!d && f.length === 0)
        return;
      const p = f.length >= _.loopRequired;
      if (v.allErrors ? S() : $(), _.strictRequired) {
        const c = a.parentSchema.properties, { definedProperties: m } = a.it;
        for (const E of f)
          if (c?.[E] === void 0 && !m.has(E)) {
            const y = v.schemaEnv.baseId + v.errSchemaPath, g = `required property "${E}" is not defined at "${y}" (strictRequired)`;
            (0, o.checkStrictMode)(v, g, v.opts.strictRequired);
          }
      }
      function S() {
        if (p || d)
          a.block$data(t.nil, l);
        else
          for (const c of f)
            (0, e.checkReportMissingProp)(a, c);
      }
      function $() {
        const c = r.let("missing");
        if (p || d) {
          const m = r.let("valid", !0);
          a.block$data(m, () => h(c, m)), a.ok(m);
        } else
          r.if((0, e.checkMissingProp)(a, f, c)), (0, e.reportMissingProp)(a, c), r.else();
      }
      function l() {
        r.forOf("prop", i, (c) => {
          a.setParams({ missingProperty: c }), r.if((0, e.noPropertyInData)(r, s, c, _.ownProperties), () => a.error());
        });
      }
      function h(c, m) {
        a.setParams({ missingProperty: c }), r.forOf(c, i, () => {
          r.assign(m, (0, e.propertyInData)(r, s, c, _.ownProperties)), r.if((0, t.not)(m), () => {
            a.error(), r.break();
          });
        }, t.nil);
      }
    }
  };
  return Ct.default = u, Ct;
}
var Lt = {}, Oo;
function pf() {
  if (Oo) return Lt;
  Oo = 1, Object.defineProperty(Lt, "__esModule", { value: !0 });
  const e = ee(), o = {
    keyword: ["maxItems", "minItems"],
    type: "array",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: n, schemaCode: u }) {
        const a = n === "maxItems" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${a} than ${u} items`;
      },
      params: ({ schemaCode: n }) => (0, e._)`{limit: ${n}}`
    },
    code(n) {
      const { keyword: u, data: a, schemaCode: r } = n, f = u === "maxItems" ? e.operators.GT : e.operators.LT;
      n.fail$data((0, e._)`${a}.length ${f} ${r}`);
    }
  };
  return Lt.default = o, Lt;
}
var At = {}, Ft = {}, Po;
function Ti() {
  if (Po) return Ft;
  Po = 1, Object.defineProperty(Ft, "__esModule", { value: !0 });
  const e = Tc();
  return e.code = 'require("ajv/dist/runtime/equal").default', Ft.default = e, Ft;
}
var To;
function yf() {
  if (To) return At;
  To = 1, Object.defineProperty(At, "__esModule", { value: !0 });
  const e = ar(), t = ee(), o = te(), n = Ti(), a = {
    keyword: "uniqueItems",
    type: "array",
    schemaType: "boolean",
    $data: !0,
    error: {
      message: ({ params: { i: r, j: f } }) => (0, t.str)`must NOT have duplicate items (items ## ${f} and ${r} are identical)`,
      params: ({ params: { i: r, j: f } }) => (0, t._)`{i: ${r}, j: ${f}}`
    },
    code(r) {
      const { gen: f, data: i, $data: s, schema: d, parentSchema: v, schemaCode: _, it: p } = r;
      if (!s && !d)
        return;
      const S = f.let("valid"), $ = v.items ? (0, e.getSchemaTypes)(v.items) : [];
      r.block$data(S, l, (0, t._)`${_} === false`), r.ok(S);
      function l() {
        const E = f.let("i", (0, t._)`${i}.length`), y = f.let("j");
        r.setParams({ i: E, j: y }), f.assign(S, !0), f.if((0, t._)`${E} > 1`, () => (h() ? c : m)(E, y));
      }
      function h() {
        return $.length > 0 && !$.some((E) => E === "object" || E === "array");
      }
      function c(E, y) {
        const g = f.name("item"), w = (0, e.checkDataTypes)($, g, p.opts.strictNumbers, e.DataType.Wrong), R = f.const("indices", (0, t._)`{}`);
        f.for((0, t._)`;${E}--;`, () => {
          f.let(g, (0, t._)`${i}[${E}]`), f.if(w, (0, t._)`continue`), $.length > 1 && f.if((0, t._)`typeof ${g} == "string"`, (0, t._)`${g} += "_"`), f.if((0, t._)`typeof ${R}[${g}] == "number"`, () => {
            f.assign(y, (0, t._)`${R}[${g}]`), r.error(), f.assign(S, !1).break();
          }).code((0, t._)`${R}[${g}] = ${E}`);
        });
      }
      function m(E, y) {
        const g = (0, o.useFunc)(f, n.default), w = f.name("outer");
        f.label(w).for((0, t._)`;${E}--;`, () => f.for((0, t._)`${y} = ${E}; ${y}--;`, () => f.if((0, t._)`${g}(${i}[${E}], ${i}[${y}])`, () => {
          r.error(), f.assign(S, !1).break(w);
        })));
      }
    }
  };
  return At.default = a, At;
}
var qt = {}, bo;
function Ef() {
  if (bo) return qt;
  bo = 1, Object.defineProperty(qt, "__esModule", { value: !0 });
  const e = ee(), t = te(), o = Ti(), u = {
    keyword: "const",
    $data: !0,
    error: {
      message: "must be equal to constant",
      params: ({ schemaCode: a }) => (0, e._)`{allowedValue: ${a}}`
    },
    code(a) {
      const { gen: r, data: f, $data: i, schemaCode: s, schema: d } = a;
      i || d && typeof d == "object" ? a.fail$data((0, e._)`!${(0, t.useFunc)(r, o.default)}(${f}, ${s})`) : a.fail((0, e._)`${d} !== ${f}`);
    }
  };
  return qt.default = u, qt;
}
var jt = {}, Do;
function vf() {
  if (Do) return jt;
  Do = 1, Object.defineProperty(jt, "__esModule", { value: !0 });
  const e = ee(), t = te(), o = Ti(), u = {
    keyword: "enum",
    schemaType: "array",
    $data: !0,
    error: {
      message: "must be equal to one of the allowed values",
      params: ({ schemaCode: a }) => (0, e._)`{allowedValues: ${a}}`
    },
    code(a) {
      const { gen: r, data: f, $data: i, schema: s, schemaCode: d, it: v } = a;
      if (!i && s.length === 0)
        throw new Error("enum must have non-empty array");
      const _ = s.length >= v.opts.loopEnum;
      let p;
      const S = () => p ?? (p = (0, t.useFunc)(r, o.default));
      let $;
      if (_ || i)
        $ = r.let("valid"), a.block$data($, l);
      else {
        if (!Array.isArray(s))
          throw new Error("ajv implementation error");
        const c = r.const("vSchema", d);
        $ = (0, e.or)(...s.map((m, E) => h(c, E)));
      }
      a.pass($);
      function l() {
        r.assign($, !1), r.forOf("v", d, (c) => r.if((0, e._)`${S()}(${f}, ${c})`, () => r.assign($, !0).break()));
      }
      function h(c, m) {
        const E = s[m];
        return typeof E == "object" && E !== null ? (0, e._)`${S()}(${f}, ${c}[${m}])` : (0, e._)`${f} === ${E}`;
      }
    }
  };
  return jt.default = u, jt;
}
var Co;
function gf() {
  if (Co) return It;
  Co = 1, Object.defineProperty(It, "__esModule", { value: !0 });
  const e = cf(), t = uf(), o = lf(), n = df(), u = hf(), a = mf(), r = pf(), f = yf(), i = Ef(), s = vf(), d = [
    // number
    e.default,
    t.default,
    // string
    o.default,
    n.default,
    // object
    u.default,
    a.default,
    // array
    r.default,
    f.default,
    // any
    { keyword: "type", schemaType: ["string", "array"] },
    { keyword: "nullable", schemaType: "boolean" },
    i.default,
    s.default
  ];
  return It.default = d, It;
}
var kt = {}, je = {}, Lo;
function bc() {
  if (Lo) return je;
  Lo = 1, Object.defineProperty(je, "__esModule", { value: !0 }), je.validateAdditionalItems = void 0;
  const e = ee(), t = te(), n = {
    keyword: "additionalItems",
    type: "array",
    schemaType: ["boolean", "object"],
    before: "uniqueItems",
    error: {
      message: ({ params: { len: a } }) => (0, e.str)`must NOT have more than ${a} items`,
      params: ({ params: { len: a } }) => (0, e._)`{limit: ${a}}`
    },
    code(a) {
      const { parentSchema: r, it: f } = a, { items: i } = r;
      if (!Array.isArray(i)) {
        (0, t.checkStrictMode)(f, '"additionalItems" is ignored when "items" is not an array of schemas');
        return;
      }
      u(a, i);
    }
  };
  function u(a, r) {
    const { gen: f, schema: i, data: s, keyword: d, it: v } = a;
    v.items = !0;
    const _ = f.const("len", (0, e._)`${s}.length`);
    if (i === !1)
      a.setParams({ len: r.length }), a.pass((0, e._)`${_} <= ${r.length}`);
    else if (typeof i == "object" && !(0, t.alwaysValidSchema)(v, i)) {
      const S = f.var("valid", (0, e._)`${_} <= ${r.length}`);
      f.if((0, e.not)(S), () => p(S)), a.ok(S);
    }
    function p(S) {
      f.forRange("i", r.length, _, ($) => {
        a.subschema({ keyword: d, dataProp: $, dataPropType: t.Type.Num }, S), v.allErrors || f.if((0, e.not)(S), () => f.break());
      });
    }
  }
  return je.validateAdditionalItems = u, je.default = n, je;
}
var Mt = {}, ke = {}, Ao;
function Dc() {
  if (Ao) return ke;
  Ao = 1, Object.defineProperty(ke, "__esModule", { value: !0 }), ke.validateTuple = void 0;
  const e = ee(), t = te(), o = _e(), n = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "array", "boolean"],
    before: "uniqueItems",
    code(a) {
      const { schema: r, it: f } = a;
      if (Array.isArray(r))
        return u(a, "additionalItems", r);
      f.items = !0, !(0, t.alwaysValidSchema)(f, r) && a.ok((0, o.validateArray)(a));
    }
  };
  function u(a, r, f = a.schema) {
    const { gen: i, parentSchema: s, data: d, keyword: v, it: _ } = a;
    $(s), _.opts.unevaluated && f.length && _.items !== !0 && (_.items = t.mergeEvaluated.items(i, f.length, _.items));
    const p = i.name("valid"), S = i.const("len", (0, e._)`${d}.length`);
    f.forEach((l, h) => {
      (0, t.alwaysValidSchema)(_, l) || (i.if((0, e._)`${S} > ${h}`, () => a.subschema({
        keyword: v,
        schemaProp: h,
        dataProp: h
      }, p)), a.ok(p));
    });
    function $(l) {
      const { opts: h, errSchemaPath: c } = _, m = f.length, E = m === l.minItems && (m === l.maxItems || l[r] === !1);
      if (h.strictTuples && !E) {
        const y = `"${v}" is ${m}-tuple, but minItems or maxItems/${r} are not specified or different at path "${c}"`;
        (0, t.checkStrictMode)(_, y, h.strictTuples);
      }
    }
  }
  return ke.validateTuple = u, ke.default = n, ke;
}
var Fo;
function _f() {
  if (Fo) return Mt;
  Fo = 1, Object.defineProperty(Mt, "__esModule", { value: !0 });
  const e = Dc(), t = {
    keyword: "prefixItems",
    type: "array",
    schemaType: ["array"],
    before: "uniqueItems",
    code: (o) => (0, e.validateTuple)(o, "items")
  };
  return Mt.default = t, Mt;
}
var Ut = {}, qo;
function wf() {
  if (qo) return Ut;
  qo = 1, Object.defineProperty(Ut, "__esModule", { value: !0 });
  const e = ee(), t = te(), o = _e(), n = bc(), a = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    error: {
      message: ({ params: { len: r } }) => (0, e.str)`must NOT have more than ${r} items`,
      params: ({ params: { len: r } }) => (0, e._)`{limit: ${r}}`
    },
    code(r) {
      const { schema: f, parentSchema: i, it: s } = r, { prefixItems: d } = i;
      s.items = !0, !(0, t.alwaysValidSchema)(s, f) && (d ? (0, n.validateAdditionalItems)(r, d) : r.ok((0, o.validateArray)(r)));
    }
  };
  return Ut.default = a, Ut;
}
var xt = {}, jo;
function Sf() {
  if (jo) return xt;
  jo = 1, Object.defineProperty(xt, "__esModule", { value: !0 });
  const e = ee(), t = te(), n = {
    keyword: "contains",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    trackErrors: !0,
    error: {
      message: ({ params: { min: u, max: a } }) => a === void 0 ? (0, e.str)`must contain at least ${u} valid item(s)` : (0, e.str)`must contain at least ${u} and no more than ${a} valid item(s)`,
      params: ({ params: { min: u, max: a } }) => a === void 0 ? (0, e._)`{minContains: ${u}}` : (0, e._)`{minContains: ${u}, maxContains: ${a}}`
    },
    code(u) {
      const { gen: a, schema: r, parentSchema: f, data: i, it: s } = u;
      let d, v;
      const { minContains: _, maxContains: p } = f;
      s.opts.next ? (d = _ === void 0 ? 1 : _, v = p) : d = 1;
      const S = a.const("len", (0, e._)`${i}.length`);
      if (u.setParams({ min: d, max: v }), v === void 0 && d === 0) {
        (0, t.checkStrictMode)(s, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
        return;
      }
      if (v !== void 0 && d > v) {
        (0, t.checkStrictMode)(s, '"minContains" > "maxContains" is always invalid'), u.fail();
        return;
      }
      if ((0, t.alwaysValidSchema)(s, r)) {
        let m = (0, e._)`${S} >= ${d}`;
        v !== void 0 && (m = (0, e._)`${m} && ${S} <= ${v}`), u.pass(m);
        return;
      }
      s.items = !0;
      const $ = a.name("valid");
      v === void 0 && d === 1 ? h($, () => a.if($, () => a.break())) : d === 0 ? (a.let($, !0), v !== void 0 && a.if((0, e._)`${i}.length > 0`, l)) : (a.let($, !1), l()), u.result($, () => u.reset());
      function l() {
        const m = a.name("_valid"), E = a.let("count", 0);
        h(m, () => a.if(m, () => c(E)));
      }
      function h(m, E) {
        a.forRange("i", 0, S, (y) => {
          u.subschema({
            keyword: "contains",
            dataProp: y,
            dataPropType: t.Type.Num,
            compositeRule: !0
          }, m), E();
        });
      }
      function c(m) {
        a.code((0, e._)`${m}++`), v === void 0 ? a.if((0, e._)`${m} >= ${d}`, () => a.assign($, !0).break()) : (a.if((0, e._)`${m} > ${v}`, () => a.assign($, !1).break()), d === 1 ? a.assign($, !0) : a.if((0, e._)`${m} >= ${d}`, () => a.assign($, !0)));
      }
    }
  };
  return xt.default = n, xt;
}
var mn = {}, ko;
function $f() {
  return ko || (ko = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
    const t = ee(), o = te(), n = _e();
    e.error = {
      message: ({ params: { property: i, depsCount: s, deps: d } }) => {
        const v = s === 1 ? "property" : "properties";
        return (0, t.str)`must have ${v} ${d} when property ${i} is present`;
      },
      params: ({ params: { property: i, depsCount: s, deps: d, missingProperty: v } }) => (0, t._)`{property: ${i},
    missingProperty: ${v},
    depsCount: ${s},
    deps: ${d}}`
      // TODO change to reference
    };
    const u = {
      keyword: "dependencies",
      type: "object",
      schemaType: "object",
      error: e.error,
      code(i) {
        const [s, d] = a(i);
        r(i, s), f(i, d);
      }
    };
    function a({ schema: i }) {
      const s = {}, d = {};
      for (const v in i) {
        if (v === "__proto__")
          continue;
        const _ = Array.isArray(i[v]) ? s : d;
        _[v] = i[v];
      }
      return [s, d];
    }
    function r(i, s = i.schema) {
      const { gen: d, data: v, it: _ } = i;
      if (Object.keys(s).length === 0)
        return;
      const p = d.let("missing");
      for (const S in s) {
        const $ = s[S];
        if ($.length === 0)
          continue;
        const l = (0, n.propertyInData)(d, v, S, _.opts.ownProperties);
        i.setParams({
          property: S,
          depsCount: $.length,
          deps: $.join(", ")
        }), _.allErrors ? d.if(l, () => {
          for (const h of $)
            (0, n.checkReportMissingProp)(i, h);
        }) : (d.if((0, t._)`${l} && (${(0, n.checkMissingProp)(i, $, p)})`), (0, n.reportMissingProp)(i, p), d.else());
      }
    }
    e.validatePropertyDeps = r;
    function f(i, s = i.schema) {
      const { gen: d, data: v, keyword: _, it: p } = i, S = d.name("valid");
      for (const $ in s)
        (0, o.alwaysValidSchema)(p, s[$]) || (d.if(
          (0, n.propertyInData)(d, v, $, p.opts.ownProperties),
          () => {
            const l = i.subschema({ keyword: _, schemaProp: $ }, S);
            i.mergeValidEvaluated(l, S);
          },
          () => d.var(S, !0)
          // TODO var
        ), i.ok(S));
    }
    e.validateSchemaDeps = f, e.default = u;
  }(mn)), mn;
}
var zt = {}, Mo;
function Rf() {
  if (Mo) return zt;
  Mo = 1, Object.defineProperty(zt, "__esModule", { value: !0 });
  const e = ee(), t = te(), n = {
    keyword: "propertyNames",
    type: "object",
    schemaType: ["object", "boolean"],
    error: {
      message: "property name must be valid",
      params: ({ params: u }) => (0, e._)`{propertyName: ${u.propertyName}}`
    },
    code(u) {
      const { gen: a, schema: r, data: f, it: i } = u;
      if ((0, t.alwaysValidSchema)(i, r))
        return;
      const s = a.name("valid");
      a.forIn("key", f, (d) => {
        u.setParams({ propertyName: d }), u.subschema({
          keyword: "propertyNames",
          data: d,
          dataTypes: ["string"],
          propertyName: d,
          compositeRule: !0
        }, s), a.if((0, e.not)(s), () => {
          u.error(!0), i.allErrors || a.break();
        });
      }), u.ok(s);
    }
  };
  return zt.default = n, zt;
}
var Vt = {}, Uo;
function Cc() {
  if (Uo) return Vt;
  Uo = 1, Object.defineProperty(Vt, "__esModule", { value: !0 });
  const e = _e(), t = ee(), o = Pe(), n = te(), a = {
    keyword: "additionalProperties",
    type: ["object"],
    schemaType: ["boolean", "object"],
    allowUndefined: !0,
    trackErrors: !0,
    error: {
      message: "must NOT have additional properties",
      params: ({ params: r }) => (0, t._)`{additionalProperty: ${r.additionalProperty}}`
    },
    code(r) {
      const { gen: f, schema: i, parentSchema: s, data: d, errsCount: v, it: _ } = r;
      if (!v)
        throw new Error("ajv implementation error");
      const { allErrors: p, opts: S } = _;
      if (_.props = !0, S.removeAdditional !== "all" && (0, n.alwaysValidSchema)(_, i))
        return;
      const $ = (0, e.allSchemaProperties)(s.properties), l = (0, e.allSchemaProperties)(s.patternProperties);
      h(), r.ok((0, t._)`${v} === ${o.default.errors}`);
      function h() {
        f.forIn("key", d, (g) => {
          !$.length && !l.length ? E(g) : f.if(c(g), () => E(g));
        });
      }
      function c(g) {
        let w;
        if ($.length > 8) {
          const R = (0, n.schemaRefOrVal)(_, s.properties, "properties");
          w = (0, e.isOwnProperty)(f, R, g);
        } else $.length ? w = (0, t.or)(...$.map((R) => (0, t._)`${g} === ${R}`)) : w = t.nil;
        return l.length && (w = (0, t.or)(w, ...l.map((R) => (0, t._)`${(0, e.usePattern)(r, R)}.test(${g})`))), (0, t.not)(w);
      }
      function m(g) {
        f.code((0, t._)`delete ${d}[${g}]`);
      }
      function E(g) {
        if (S.removeAdditional === "all" || S.removeAdditional && i === !1) {
          m(g);
          return;
        }
        if (i === !1) {
          r.setParams({ additionalProperty: g }), r.error(), p || f.break();
          return;
        }
        if (typeof i == "object" && !(0, n.alwaysValidSchema)(_, i)) {
          const w = f.name("valid");
          S.removeAdditional === "failing" ? (y(g, w, !1), f.if((0, t.not)(w), () => {
            r.reset(), m(g);
          })) : (y(g, w), p || f.if((0, t.not)(w), () => f.break()));
        }
      }
      function y(g, w, R) {
        const N = {
          keyword: "additionalProperties",
          dataProp: g,
          dataPropType: n.Type.Str
        };
        R === !1 && Object.assign(N, {
          compositeRule: !0,
          createErrors: !1,
          allErrors: !1
        }), r.subschema(N, w);
      }
    }
  };
  return Vt.default = a, Vt;
}
var Gt = {}, xo;
function If() {
  if (xo) return Gt;
  xo = 1, Object.defineProperty(Gt, "__esModule", { value: !0 });
  const e = lr(), t = _e(), o = te(), n = Cc(), u = {
    keyword: "properties",
    type: "object",
    schemaType: "object",
    code(a) {
      const { gen: r, schema: f, parentSchema: i, data: s, it: d } = a;
      d.opts.removeAdditional === "all" && i.additionalProperties === void 0 && n.default.code(new e.KeywordCxt(d, n.default, "additionalProperties"));
      const v = (0, t.allSchemaProperties)(f);
      for (const l of v)
        d.definedProperties.add(l);
      d.opts.unevaluated && v.length && d.props !== !0 && (d.props = o.mergeEvaluated.props(r, (0, o.toHash)(v), d.props));
      const _ = v.filter((l) => !(0, o.alwaysValidSchema)(d, f[l]));
      if (_.length === 0)
        return;
      const p = r.name("valid");
      for (const l of _)
        S(l) ? $(l) : (r.if((0, t.propertyInData)(r, s, l, d.opts.ownProperties)), $(l), d.allErrors || r.else().var(p, !0), r.endIf()), a.it.definedProperties.add(l), a.ok(p);
      function S(l) {
        return d.opts.useDefaults && !d.compositeRule && f[l].default !== void 0;
      }
      function $(l) {
        a.subschema({
          keyword: "properties",
          schemaProp: l,
          dataProp: l
        }, p);
      }
    }
  };
  return Gt.default = u, Gt;
}
var Ht = {}, zo;
function Nf() {
  if (zo) return Ht;
  zo = 1, Object.defineProperty(Ht, "__esModule", { value: !0 });
  const e = _e(), t = ee(), o = te(), n = te(), u = {
    keyword: "patternProperties",
    type: "object",
    schemaType: "object",
    code(a) {
      const { gen: r, schema: f, data: i, parentSchema: s, it: d } = a, { opts: v } = d, _ = (0, e.allSchemaProperties)(f), p = _.filter((E) => (0, o.alwaysValidSchema)(d, f[E]));
      if (_.length === 0 || p.length === _.length && (!d.opts.unevaluated || d.props === !0))
        return;
      const S = v.strictSchema && !v.allowMatchingProperties && s.properties, $ = r.name("valid");
      d.props !== !0 && !(d.props instanceof t.Name) && (d.props = (0, n.evaluatedPropsToName)(r, d.props));
      const { props: l } = d;
      h();
      function h() {
        for (const E of _)
          S && c(E), d.allErrors ? m(E) : (r.var($, !0), m(E), r.if($));
      }
      function c(E) {
        for (const y in S)
          new RegExp(E).test(y) && (0, o.checkStrictMode)(d, `property ${y} matches pattern ${E} (use allowMatchingProperties)`);
      }
      function m(E) {
        r.forIn("key", i, (y) => {
          r.if((0, t._)`${(0, e.usePattern)(a, E)}.test(${y})`, () => {
            const g = p.includes(E);
            g || a.subschema({
              keyword: "patternProperties",
              schemaProp: E,
              dataProp: y,
              dataPropType: n.Type.Str
            }, $), d.opts.unevaluated && l !== !0 ? r.assign((0, t._)`${l}[${y}]`, !0) : !g && !d.allErrors && r.if((0, t.not)($), () => r.break());
          });
        });
      }
    }
  };
  return Ht.default = u, Ht;
}
var Bt = {}, Vo;
function Of() {
  if (Vo) return Bt;
  Vo = 1, Object.defineProperty(Bt, "__esModule", { value: !0 });
  const e = te(), t = {
    keyword: "not",
    schemaType: ["object", "boolean"],
    trackErrors: !0,
    code(o) {
      const { gen: n, schema: u, it: a } = o;
      if ((0, e.alwaysValidSchema)(a, u)) {
        o.fail();
        return;
      }
      const r = n.name("valid");
      o.subschema({
        keyword: "not",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, r), o.failResult(r, () => o.reset(), () => o.error());
    },
    error: { message: "must NOT be valid" }
  };
  return Bt.default = t, Bt;
}
var Kt = {}, Go;
function Pf() {
  if (Go) return Kt;
  Go = 1, Object.defineProperty(Kt, "__esModule", { value: !0 });
  const t = {
    keyword: "anyOf",
    schemaType: "array",
    trackErrors: !0,
    code: _e().validateUnion,
    error: { message: "must match a schema in anyOf" }
  };
  return Kt.default = t, Kt;
}
var Wt = {}, Ho;
function Tf() {
  if (Ho) return Wt;
  Ho = 1, Object.defineProperty(Wt, "__esModule", { value: !0 });
  const e = ee(), t = te(), n = {
    keyword: "oneOf",
    schemaType: "array",
    trackErrors: !0,
    error: {
      message: "must match exactly one schema in oneOf",
      params: ({ params: u }) => (0, e._)`{passingSchemas: ${u.passing}}`
    },
    code(u) {
      const { gen: a, schema: r, parentSchema: f, it: i } = u;
      if (!Array.isArray(r))
        throw new Error("ajv implementation error");
      if (i.opts.discriminator && f.discriminator)
        return;
      const s = r, d = a.let("valid", !1), v = a.let("passing", null), _ = a.name("_valid");
      u.setParams({ passing: v }), a.block(p), u.result(d, () => u.reset(), () => u.error(!0));
      function p() {
        s.forEach((S, $) => {
          let l;
          (0, t.alwaysValidSchema)(i, S) ? a.var(_, !0) : l = u.subschema({
            keyword: "oneOf",
            schemaProp: $,
            compositeRule: !0
          }, _), $ > 0 && a.if((0, e._)`${_} && ${d}`).assign(d, !1).assign(v, (0, e._)`[${v}, ${$}]`).else(), a.if(_, () => {
            a.assign(d, !0), a.assign(v, $), l && u.mergeEvaluated(l, e.Name);
          });
        });
      }
    }
  };
  return Wt.default = n, Wt;
}
var Zt = {}, Bo;
function bf() {
  if (Bo) return Zt;
  Bo = 1, Object.defineProperty(Zt, "__esModule", { value: !0 });
  const e = te(), t = {
    keyword: "allOf",
    schemaType: "array",
    code(o) {
      const { gen: n, schema: u, it: a } = o;
      if (!Array.isArray(u))
        throw new Error("ajv implementation error");
      const r = n.name("valid");
      u.forEach((f, i) => {
        if ((0, e.alwaysValidSchema)(a, f))
          return;
        const s = o.subschema({ keyword: "allOf", schemaProp: i }, r);
        o.ok(r), o.mergeEvaluated(s);
      });
    }
  };
  return Zt.default = t, Zt;
}
var Xt = {}, Ko;
function Df() {
  if (Ko) return Xt;
  Ko = 1, Object.defineProperty(Xt, "__esModule", { value: !0 });
  const e = ee(), t = te(), n = {
    keyword: "if",
    schemaType: ["object", "boolean"],
    trackErrors: !0,
    error: {
      message: ({ params: a }) => (0, e.str)`must match "${a.ifClause}" schema`,
      params: ({ params: a }) => (0, e._)`{failingKeyword: ${a.ifClause}}`
    },
    code(a) {
      const { gen: r, parentSchema: f, it: i } = a;
      f.then === void 0 && f.else === void 0 && (0, t.checkStrictMode)(i, '"if" without "then" and "else" is ignored');
      const s = u(i, "then"), d = u(i, "else");
      if (!s && !d)
        return;
      const v = r.let("valid", !0), _ = r.name("_valid");
      if (p(), a.reset(), s && d) {
        const $ = r.let("ifClause");
        a.setParams({ ifClause: $ }), r.if(_, S("then", $), S("else", $));
      } else s ? r.if(_, S("then")) : r.if((0, e.not)(_), S("else"));
      a.pass(v, () => a.error(!0));
      function p() {
        const $ = a.subschema({
          keyword: "if",
          compositeRule: !0,
          createErrors: !1,
          allErrors: !1
        }, _);
        a.mergeEvaluated($);
      }
      function S($, l) {
        return () => {
          const h = a.subschema({ keyword: $ }, _);
          r.assign(v, _), a.mergeValidEvaluated(h, v), l ? r.assign(l, (0, e._)`${$}`) : a.setParams({ ifClause: $ });
        };
      }
    }
  };
  function u(a, r) {
    const f = a.schema[r];
    return f !== void 0 && !(0, t.alwaysValidSchema)(a, f);
  }
  return Xt.default = n, Xt;
}
var Jt = {}, Wo;
function Cf() {
  if (Wo) return Jt;
  Wo = 1, Object.defineProperty(Jt, "__esModule", { value: !0 });
  const e = te(), t = {
    keyword: ["then", "else"],
    schemaType: ["object", "boolean"],
    code({ keyword: o, parentSchema: n, it: u }) {
      n.if === void 0 && (0, e.checkStrictMode)(u, `"${o}" without "if" is ignored`);
    }
  };
  return Jt.default = t, Jt;
}
var Zo;
function Lf() {
  if (Zo) return kt;
  Zo = 1, Object.defineProperty(kt, "__esModule", { value: !0 });
  const e = bc(), t = _f(), o = Dc(), n = wf(), u = Sf(), a = $f(), r = Rf(), f = Cc(), i = If(), s = Nf(), d = Of(), v = Pf(), _ = Tf(), p = bf(), S = Df(), $ = Cf();
  function l(h = !1) {
    const c = [
      // any
      d.default,
      v.default,
      _.default,
      p.default,
      S.default,
      $.default,
      // object
      r.default,
      f.default,
      a.default,
      i.default,
      s.default
    ];
    return h ? c.push(t.default, n.default) : c.push(e.default, o.default), c.push(u.default), c;
  }
  return kt.default = l, kt;
}
var Yt = {}, Qt = {}, Xo;
function Af() {
  if (Xo) return Qt;
  Xo = 1, Object.defineProperty(Qt, "__esModule", { value: !0 });
  const e = ee(), o = {
    keyword: "format",
    type: ["number", "string"],
    schemaType: "string",
    $data: !0,
    error: {
      message: ({ schemaCode: n }) => (0, e.str)`must match format "${n}"`,
      params: ({ schemaCode: n }) => (0, e._)`{format: ${n}}`
    },
    code(n, u) {
      const { gen: a, data: r, $data: f, schema: i, schemaCode: s, it: d } = n, { opts: v, errSchemaPath: _, schemaEnv: p, self: S } = d;
      if (!v.validateFormats)
        return;
      f ? $() : l();
      function $() {
        const h = a.scopeValue("formats", {
          ref: S.formats,
          code: v.code.formats
        }), c = a.const("fDef", (0, e._)`${h}[${s}]`), m = a.let("fType"), E = a.let("format");
        a.if((0, e._)`typeof ${c} == "object" && !(${c} instanceof RegExp)`, () => a.assign(m, (0, e._)`${c}.type || "string"`).assign(E, (0, e._)`${c}.validate`), () => a.assign(m, (0, e._)`"string"`).assign(E, c)), n.fail$data((0, e.or)(y(), g()));
        function y() {
          return v.strictSchema === !1 ? e.nil : (0, e._)`${s} && !${E}`;
        }
        function g() {
          const w = p.$async ? (0, e._)`(${c}.async ? await ${E}(${r}) : ${E}(${r}))` : (0, e._)`${E}(${r})`, R = (0, e._)`(typeof ${E} == "function" ? ${w} : ${E}.test(${r}))`;
          return (0, e._)`${E} && ${E} !== true && ${m} === ${u} && !${R}`;
        }
      }
      function l() {
        const h = S.formats[i];
        if (!h) {
          y();
          return;
        }
        if (h === !0)
          return;
        const [c, m, E] = g(h);
        c === u && n.pass(w());
        function y() {
          if (v.strictSchema === !1) {
            S.logger.warn(R());
            return;
          }
          throw new Error(R());
          function R() {
            return `unknown format "${i}" ignored in schema at path "${_}"`;
          }
        }
        function g(R) {
          const N = R instanceof RegExp ? (0, e.regexpCode)(R) : v.code.formats ? (0, e._)`${v.code.formats}${(0, e.getProperty)(i)}` : void 0, b = a.scopeValue("formats", { key: i, ref: R, code: N });
          return typeof R == "object" && !(R instanceof RegExp) ? [R.type || "string", R.validate, (0, e._)`${b}.validate`] : ["string", R, b];
        }
        function w() {
          if (typeof h == "object" && !(h instanceof RegExp) && h.async) {
            if (!p.$async)
              throw new Error("async format in sync schema");
            return (0, e._)`await ${E}(${r})`;
          }
          return typeof m == "function" ? (0, e._)`${E}(${r})` : (0, e._)`${E}.test(${r})`;
        }
      }
    }
  };
  return Qt.default = o, Qt;
}
var Jo;
function Ff() {
  if (Jo) return Yt;
  Jo = 1, Object.defineProperty(Yt, "__esModule", { value: !0 });
  const t = [Af().default];
  return Yt.default = t, Yt;
}
var Le = {}, Yo;
function qf() {
  return Yo || (Yo = 1, Object.defineProperty(Le, "__esModule", { value: !0 }), Le.contentVocabulary = Le.metadataVocabulary = void 0, Le.metadataVocabulary = [
    "title",
    "description",
    "default",
    "deprecated",
    "readOnly",
    "writeOnly",
    "examples"
  ], Le.contentVocabulary = [
    "contentMediaType",
    "contentEncoding",
    "contentSchema"
  ]), Le;
}
var Qo;
function jf() {
  if (Qo) return St;
  Qo = 1, Object.defineProperty(St, "__esModule", { value: !0 });
  const e = af(), t = gf(), o = Lf(), n = Ff(), u = qf(), a = [
    e.default,
    t.default,
    (0, o.default)(),
    n.default,
    u.metadataVocabulary,
    u.contentVocabulary
  ];
  return St.default = a, St;
}
var er = {}, He = {}, ea;
function kf() {
  if (ea) return He;
  ea = 1, Object.defineProperty(He, "__esModule", { value: !0 }), He.DiscrError = void 0;
  var e;
  return function(t) {
    t.Tag = "tag", t.Mapping = "mapping";
  }(e || (He.DiscrError = e = {})), He;
}
var ta;
function Mf() {
  if (ta) return er;
  ta = 1, Object.defineProperty(er, "__esModule", { value: !0 });
  const e = ee(), t = kf(), o = Pi(), n = dr(), u = te(), r = {
    keyword: "discriminator",
    type: "object",
    schemaType: "object",
    error: {
      message: ({ params: { discrError: f, tagName: i } }) => f === t.DiscrError.Tag ? `tag "${i}" must be string` : `value of tag "${i}" must be in oneOf`,
      params: ({ params: { discrError: f, tag: i, tagName: s } }) => (0, e._)`{error: ${f}, tag: ${s}, tagValue: ${i}}`
    },
    code(f) {
      const { gen: i, data: s, schema: d, parentSchema: v, it: _ } = f, { oneOf: p } = v;
      if (!_.opts.discriminator)
        throw new Error("discriminator: requires discriminator option");
      const S = d.propertyName;
      if (typeof S != "string")
        throw new Error("discriminator: requires propertyName");
      if (d.mapping)
        throw new Error("discriminator: mapping is not supported");
      if (!p)
        throw new Error("discriminator: requires oneOf keyword");
      const $ = i.let("valid", !1), l = i.const("tag", (0, e._)`${s}${(0, e.getProperty)(S)}`);
      i.if((0, e._)`typeof ${l} == "string"`, () => h(), () => f.error(!1, { discrError: t.DiscrError.Tag, tag: l, tagName: S })), f.ok($);
      function h() {
        const E = m();
        i.if(!1);
        for (const y in E)
          i.elseIf((0, e._)`${l} === ${y}`), i.assign($, c(E[y]));
        i.else(), f.error(!1, { discrError: t.DiscrError.Mapping, tag: l, tagName: S }), i.endIf();
      }
      function c(E) {
        const y = i.name("valid"), g = f.subschema({ keyword: "oneOf", schemaProp: E }, y);
        return f.mergeEvaluated(g, e.Name), y;
      }
      function m() {
        var E;
        const y = {}, g = R(v);
        let w = !0;
        for (let M = 0; M < p.length; M++) {
          let G = p[M];
          if (G?.$ref && !(0, u.schemaHasRulesButRef)(G, _.self.RULES)) {
            const U = G.$ref;
            if (G = o.resolveRef.call(_.self, _.schemaEnv.root, _.baseId, U), G instanceof o.SchemaEnv && (G = G.schema), G === void 0)
              throw new n.default(_.opts.uriResolver, _.baseId, U);
          }
          const k = (E = G?.properties) === null || E === void 0 ? void 0 : E[S];
          if (typeof k != "object")
            throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${S}"`);
          w = w && (g || R(G)), N(k, M);
        }
        if (!w)
          throw new Error(`discriminator: "${S}" must be required`);
        return y;
        function R({ required: M }) {
          return Array.isArray(M) && M.includes(S);
        }
        function N(M, G) {
          if (M.const)
            b(M.const, G);
          else if (M.enum)
            for (const k of M.enum)
              b(k, G);
          else
            throw new Error(`discriminator: "properties/${S}" must have "const" or "enum"`);
        }
        function b(M, G) {
          if (typeof M != "string" || M in y)
            throw new Error(`discriminator: "${S}" values must be unique strings`);
          y[M] = G;
        }
      }
    }
  };
  return er.default = r, er;
}
const Uf = "http://json-schema.org/draft-07/schema#", xf = "http://json-schema.org/draft-07/schema#", zf = "Core schema meta-schema", Vf = { schemaArray: { type: "array", minItems: 1, items: { $ref: "#" } }, nonNegativeInteger: { type: "integer", minimum: 0 }, nonNegativeIntegerDefault0: { allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }] }, simpleTypes: { enum: ["array", "boolean", "integer", "null", "number", "object", "string"] }, stringArray: { type: "array", items: { type: "string" }, uniqueItems: !0, default: [] } }, Gf = ["object", "boolean"], Hf = { $id: { type: "string", format: "uri-reference" }, $schema: { type: "string", format: "uri" }, $ref: { type: "string", format: "uri-reference" }, $comment: { type: "string" }, title: { type: "string" }, description: { type: "string" }, default: !0, readOnly: { type: "boolean", default: !1 }, examples: { type: "array", items: !0 }, multipleOf: { type: "number", exclusiveMinimum: 0 }, maximum: { type: "number" }, exclusiveMaximum: { type: "number" }, minimum: { type: "number" }, exclusiveMinimum: { type: "number" }, maxLength: { $ref: "#/definitions/nonNegativeInteger" }, minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, pattern: { type: "string", format: "regex" }, additionalItems: { $ref: "#" }, items: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }], default: !0 }, maxItems: { $ref: "#/definitions/nonNegativeInteger" }, minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, uniqueItems: { type: "boolean", default: !1 }, contains: { $ref: "#" }, maxProperties: { $ref: "#/definitions/nonNegativeInteger" }, minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, required: { $ref: "#/definitions/stringArray" }, additionalProperties: { $ref: "#" }, definitions: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, properties: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, patternProperties: { type: "object", additionalProperties: { $ref: "#" }, propertyNames: { format: "regex" }, default: {} }, dependencies: { type: "object", additionalProperties: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }] } }, propertyNames: { $ref: "#" }, const: !0, enum: { type: "array", items: !0, minItems: 1, uniqueItems: !0 }, type: { anyOf: [{ $ref: "#/definitions/simpleTypes" }, { type: "array", items: { $ref: "#/definitions/simpleTypes" }, minItems: 1, uniqueItems: !0 }] }, format: { type: "string" }, contentMediaType: { type: "string" }, contentEncoding: { type: "string" }, if: { $ref: "#" }, then: { $ref: "#" }, else: { $ref: "#" }, allOf: { $ref: "#/definitions/schemaArray" }, anyOf: { $ref: "#/definitions/schemaArray" }, oneOf: { $ref: "#/definitions/schemaArray" }, not: { $ref: "#" } }, Bf = {
  $schema: Uf,
  $id: xf,
  title: zf,
  definitions: Vf,
  type: Gf,
  properties: Hf,
  default: !0
};
var ra;
function Lc() {
  return ra || (ra = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
    const o = nf(), n = jf(), u = Mf(), a = Bf, r = ["/properties"], f = "http://json-schema.org/draft-07/schema";
    class i extends o.default {
      _addVocabularies() {
        super._addVocabularies(), n.default.forEach((S) => this.addVocabulary(S)), this.opts.discriminator && this.addKeyword(u.default);
      }
      _addDefaultMetaSchema() {
        if (super._addDefaultMetaSchema(), !this.opts.meta)
          return;
        const S = this.opts.$data ? this.$dataMetaSchema(a, r) : a;
        this.addMetaSchema(S, f, !1), this.refs["http://json-schema.org/schema"] = f;
      }
      defaultMeta() {
        return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(f) ? f : void 0);
      }
    }
    t.Ajv = i, e.exports = t = i, e.exports.Ajv = i, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = i;
    var s = lr();
    Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
      return s.KeywordCxt;
    } });
    var d = ee();
    Object.defineProperty(t, "_", { enumerable: !0, get: function() {
      return d._;
    } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
      return d.str;
    } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
      return d.stringify;
    } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
      return d.nil;
    } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
      return d.Name;
    } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
      return d.CodeGen;
    } });
    var v = Oi();
    Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
      return v.default;
    } });
    var _ = dr();
    Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
      return _.default;
    } });
  }(Et, Et.exports)), Et.exports;
}
var tr = { exports: {} }, pn = {}, na;
function Kf() {
  return na || (na = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
    function t(N, b) {
      return { validate: N, compare: b };
    }
    e.fullFormats = {
      // date: http://tools.ietf.org/html/rfc3339#section-5.6
      date: t(a, r),
      // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
      time: t(i, s),
      "date-time": t(v, _),
      // duration: https://tools.ietf.org/html/rfc3339#appendix-A
      duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
      uri: $,
      "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
      // uri-template: https://tools.ietf.org/html/rfc6570
      "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
      // For the source: https://gist.github.com/dperini/729294
      // For test cases: https://mathiasbynens.be/demo/url-regex
      url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
      email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
      hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
      // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
      ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
      ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
      regex: R,
      // uuid: http://tools.ietf.org/html/rfc4122
      uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
      // JSON-pointer: https://tools.ietf.org/html/rfc6901
      // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
      "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
      "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
      // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
      "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
      // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
      // byte: https://github.com/miguelmota/is-base64
      byte: h,
      // signed 32 bit integer
      int32: { type: "number", validate: E },
      // signed 64 bit integer
      int64: { type: "number", validate: y },
      // C-type float
      float: { type: "number", validate: g },
      // C-type double
      double: { type: "number", validate: g },
      // hint to the UI to hide input strings
      password: !0,
      // unchecked string payload
      binary: !0
    }, e.fastFormats = {
      ...e.fullFormats,
      date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, r),
      time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, s),
      "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, _),
      // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
      uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
      "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
      // email (sources from jsen validator):
      // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
      // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
      email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
    }, e.formatNames = Object.keys(e.fullFormats);
    function o(N) {
      return N % 4 === 0 && (N % 100 !== 0 || N % 400 === 0);
    }
    const n = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, u = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function a(N) {
      const b = n.exec(N);
      if (!b)
        return !1;
      const M = +b[1], G = +b[2], k = +b[3];
      return G >= 1 && G <= 12 && k >= 1 && k <= (G === 2 && o(M) ? 29 : u[G]);
    }
    function r(N, b) {
      if (N && b)
        return N > b ? 1 : N < b ? -1 : 0;
    }
    const f = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
    function i(N, b) {
      const M = f.exec(N);
      if (!M)
        return !1;
      const G = +M[1], k = +M[2], U = +M[3], x = M[5];
      return (G <= 23 && k <= 59 && U <= 59 || G === 23 && k === 59 && U === 60) && (!b || x !== "");
    }
    function s(N, b) {
      if (!(N && b))
        return;
      const M = f.exec(N), G = f.exec(b);
      if (M && G)
        return N = M[1] + M[2] + M[3] + (M[4] || ""), b = G[1] + G[2] + G[3] + (G[4] || ""), N > b ? 1 : N < b ? -1 : 0;
    }
    const d = /t|\s/i;
    function v(N) {
      const b = N.split(d);
      return b.length === 2 && a(b[0]) && i(b[1], !0);
    }
    function _(N, b) {
      if (!(N && b))
        return;
      const [M, G] = N.split(d), [k, U] = b.split(d), x = r(M, k);
      if (x !== void 0)
        return x || s(G, U);
    }
    const p = /\/|:/, S = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
    function $(N) {
      return p.test(N) && S.test(N);
    }
    const l = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
    function h(N) {
      return l.lastIndex = 0, l.test(N);
    }
    const c = -2147483648, m = 2 ** 31 - 1;
    function E(N) {
      return Number.isInteger(N) && N <= m && N >= c;
    }
    function y(N) {
      return Number.isInteger(N);
    }
    function g() {
      return !0;
    }
    const w = /[^\\]\\Z/;
    function R(N) {
      if (w.test(N))
        return !1;
      try {
        return new RegExp(N), !0;
      } catch {
        return !1;
      }
    }
  }(pn)), pn;
}
var yn = {}, ia;
function Wf() {
  return ia || (ia = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
    const t = Lc(), o = ee(), n = o.operators, u = {
      formatMaximum: { okStr: "<=", ok: n.LTE, fail: n.GT },
      formatMinimum: { okStr: ">=", ok: n.GTE, fail: n.LT },
      formatExclusiveMaximum: { okStr: "<", ok: n.LT, fail: n.GTE },
      formatExclusiveMinimum: { okStr: ">", ok: n.GT, fail: n.LTE }
    }, a = {
      message: ({ keyword: f, schemaCode: i }) => o.str`should be ${u[f].okStr} ${i}`,
      params: ({ keyword: f, schemaCode: i }) => o._`{comparison: ${u[f].okStr}, limit: ${i}}`
    };
    e.formatLimitDefinition = {
      keyword: Object.keys(u),
      type: "string",
      schemaType: "string",
      $data: !0,
      error: a,
      code(f) {
        const { gen: i, data: s, schemaCode: d, keyword: v, it: _ } = f, { opts: p, self: S } = _;
        if (!p.validateFormats)
          return;
        const $ = new t.KeywordCxt(_, S.RULES.all.format.definition, "format");
        $.$data ? l() : h();
        function l() {
          const m = i.scopeValue("formats", {
            ref: S.formats,
            code: p.code.formats
          }), E = i.const("fmt", o._`${m}[${$.schemaCode}]`);
          f.fail$data(o.or(o._`typeof ${E} != "object"`, o._`${E} instanceof RegExp`, o._`typeof ${E}.compare != "function"`, c(E)));
        }
        function h() {
          const m = $.schema, E = S.formats[m];
          if (!E || E === !0)
            return;
          if (typeof E != "object" || E instanceof RegExp || typeof E.compare != "function")
            throw new Error(`"${v}": format "${m}" does not define "compare" function`);
          const y = i.scopeValue("formats", {
            key: m,
            ref: E,
            code: p.code.formats ? o._`${p.code.formats}${o.getProperty(m)}` : void 0
          });
          f.fail$data(c(y));
        }
        function c(m) {
          return o._`${m}.compare(${s}, ${d}) ${u[v].fail} 0`;
        }
      },
      dependencies: ["format"]
    };
    const r = (f) => (f.addKeyword(e.formatLimitDefinition), f);
    e.default = r;
  }(yn)), yn;
}
var sa;
function Zf() {
  return sa || (sa = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 });
    const o = Kf(), n = Wf(), u = ee(), a = new u.Name("fullFormats"), r = new u.Name("fastFormats"), f = (s, d = { keywords: !0 }) => {
      if (Array.isArray(d))
        return i(s, d, o.fullFormats, a), s;
      const [v, _] = d.mode === "fast" ? [o.fastFormats, r] : [o.fullFormats, a], p = d.formats || o.formatNames;
      return i(s, p, v, _), d.keywords && n.default(s), s;
    };
    f.get = (s, d = "full") => {
      const _ = (d === "fast" ? o.fastFormats : o.fullFormats)[s];
      if (!_)
        throw new Error(`Unknown format "${s}"`);
      return _;
    };
    function i(s, d, v, _) {
      var p, S;
      (p = (S = s.opts.code).formats) !== null && p !== void 0 || (S.formats = u._`require("ajv-formats/dist/formats").${_}`);
      for (const $ of d)
        s.addFormat($, v[$]);
    }
    e.exports = t = f, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = f;
  }(tr, tr.exports)), tr.exports;
}
var En, oa;
function Xf() {
  if (oa) return En;
  oa = 1;
  const e = (i, s, d, v) => {
    if (d === "length" || d === "prototype" || d === "arguments" || d === "caller")
      return;
    const _ = Object.getOwnPropertyDescriptor(i, d), p = Object.getOwnPropertyDescriptor(s, d);
    !t(_, p) && v || Object.defineProperty(i, d, p);
  }, t = function(i, s) {
    return i === void 0 || i.configurable || i.writable === s.writable && i.enumerable === s.enumerable && i.configurable === s.configurable && (i.writable || i.value === s.value);
  }, o = (i, s) => {
    const d = Object.getPrototypeOf(s);
    d !== Object.getPrototypeOf(i) && Object.setPrototypeOf(i, d);
  }, n = (i, s) => `/* Wrapped ${i}*/
${s}`, u = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), a = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), r = (i, s, d) => {
    const v = d === "" ? "" : `with ${d.trim()}() `, _ = n.bind(null, v, s.toString());
    Object.defineProperty(_, "name", a), Object.defineProperty(i, "toString", { ...u, value: _ });
  };
  return En = (i, s, { ignoreNonConfigurable: d = !1 } = {}) => {
    const { name: v } = i;
    for (const _ of Reflect.ownKeys(s))
      e(i, s, _, d);
    return o(i, s), r(i, s, v), i;
  }, En;
}
var vn, aa;
function Jf() {
  if (aa) return vn;
  aa = 1;
  const e = Xf();
  return vn = (t, o = {}) => {
    if (typeof t != "function")
      throw new TypeError(`Expected the first argument to be a function, got \`${typeof t}\``);
    const {
      wait: n = 0,
      before: u = !1,
      after: a = !0
    } = o;
    if (!u && !a)
      throw new Error("Both `before` and `after` are false, function wouldn't be called.");
    let r, f;
    const i = function(...s) {
      const d = this, v = () => {
        r = void 0, a && (f = t.apply(d, s));
      }, _ = u && !r;
      return clearTimeout(r), r = setTimeout(v, n), _ && (f = t.apply(d, s)), f;
    };
    return e(i, t), i.cancel = () => {
      r && (clearTimeout(r), r = void 0);
    }, i;
  }, vn;
}
var rr = { exports: {} }, gn, ca;
function hr() {
  if (ca) return gn;
  ca = 1;
  const e = "2.0.0", t = 256, o = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991, n = 16, u = t - 6;
  return gn = {
    MAX_LENGTH: t,
    MAX_SAFE_COMPONENT_LENGTH: n,
    MAX_SAFE_BUILD_LENGTH: u,
    MAX_SAFE_INTEGER: o,
    RELEASE_TYPES: [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ],
    SEMVER_SPEC_VERSION: e,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
  }, gn;
}
var _n, ua;
function mr() {
  return ua || (ua = 1, _n = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...t) => console.error("SEMVER", ...t) : () => {
  }), _n;
}
var fa;
function Je() {
  return fa || (fa = 1, function(e, t) {
    const {
      MAX_SAFE_COMPONENT_LENGTH: o,
      MAX_SAFE_BUILD_LENGTH: n,
      MAX_LENGTH: u
    } = hr(), a = mr();
    t = e.exports = {};
    const r = t.re = [], f = t.safeRe = [], i = t.src = [], s = t.t = {};
    let d = 0;
    const v = "[a-zA-Z0-9-]", _ = [
      ["\\s", 1],
      ["\\d", u],
      [v, n]
    ], p = ($) => {
      for (const [l, h] of _)
        $ = $.split(`${l}*`).join(`${l}{0,${h}}`).split(`${l}+`).join(`${l}{1,${h}}`);
      return $;
    }, S = ($, l, h) => {
      const c = p(l), m = d++;
      a($, m, l), s[$] = m, i[m] = l, r[m] = new RegExp(l, h ? "g" : void 0), f[m] = new RegExp(c, h ? "g" : void 0);
    };
    S("NUMERICIDENTIFIER", "0|[1-9]\\d*"), S("NUMERICIDENTIFIERLOOSE", "\\d+"), S("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${v}*`), S("MAINVERSION", `(${i[s.NUMERICIDENTIFIER]})\\.(${i[s.NUMERICIDENTIFIER]})\\.(${i[s.NUMERICIDENTIFIER]})`), S("MAINVERSIONLOOSE", `(${i[s.NUMERICIDENTIFIERLOOSE]})\\.(${i[s.NUMERICIDENTIFIERLOOSE]})\\.(${i[s.NUMERICIDENTIFIERLOOSE]})`), S("PRERELEASEIDENTIFIER", `(?:${i[s.NUMERICIDENTIFIER]}|${i[s.NONNUMERICIDENTIFIER]})`), S("PRERELEASEIDENTIFIERLOOSE", `(?:${i[s.NUMERICIDENTIFIERLOOSE]}|${i[s.NONNUMERICIDENTIFIER]})`), S("PRERELEASE", `(?:-(${i[s.PRERELEASEIDENTIFIER]}(?:\\.${i[s.PRERELEASEIDENTIFIER]})*))`), S("PRERELEASELOOSE", `(?:-?(${i[s.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${i[s.PRERELEASEIDENTIFIERLOOSE]})*))`), S("BUILDIDENTIFIER", `${v}+`), S("BUILD", `(?:\\+(${i[s.BUILDIDENTIFIER]}(?:\\.${i[s.BUILDIDENTIFIER]})*))`), S("FULLPLAIN", `v?${i[s.MAINVERSION]}${i[s.PRERELEASE]}?${i[s.BUILD]}?`), S("FULL", `^${i[s.FULLPLAIN]}$`), S("LOOSEPLAIN", `[v=\\s]*${i[s.MAINVERSIONLOOSE]}${i[s.PRERELEASELOOSE]}?${i[s.BUILD]}?`), S("LOOSE", `^${i[s.LOOSEPLAIN]}$`), S("GTLT", "((?:<|>)?=?)"), S("XRANGEIDENTIFIERLOOSE", `${i[s.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), S("XRANGEIDENTIFIER", `${i[s.NUMERICIDENTIFIER]}|x|X|\\*`), S("XRANGEPLAIN", `[v=\\s]*(${i[s.XRANGEIDENTIFIER]})(?:\\.(${i[s.XRANGEIDENTIFIER]})(?:\\.(${i[s.XRANGEIDENTIFIER]})(?:${i[s.PRERELEASE]})?${i[s.BUILD]}?)?)?`), S("XRANGEPLAINLOOSE", `[v=\\s]*(${i[s.XRANGEIDENTIFIERLOOSE]})(?:\\.(${i[s.XRANGEIDENTIFIERLOOSE]})(?:\\.(${i[s.XRANGEIDENTIFIERLOOSE]})(?:${i[s.PRERELEASELOOSE]})?${i[s.BUILD]}?)?)?`), S("XRANGE", `^${i[s.GTLT]}\\s*${i[s.XRANGEPLAIN]}$`), S("XRANGELOOSE", `^${i[s.GTLT]}\\s*${i[s.XRANGEPLAINLOOSE]}$`), S("COERCEPLAIN", `(^|[^\\d])(\\d{1,${o}})(?:\\.(\\d{1,${o}}))?(?:\\.(\\d{1,${o}}))?`), S("COERCE", `${i[s.COERCEPLAIN]}(?:$|[^\\d])`), S("COERCEFULL", i[s.COERCEPLAIN] + `(?:${i[s.PRERELEASE]})?(?:${i[s.BUILD]})?(?:$|[^\\d])`), S("COERCERTL", i[s.COERCE], !0), S("COERCERTLFULL", i[s.COERCEFULL], !0), S("LONETILDE", "(?:~>?)"), S("TILDETRIM", `(\\s*)${i[s.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", S("TILDE", `^${i[s.LONETILDE]}${i[s.XRANGEPLAIN]}$`), S("TILDELOOSE", `^${i[s.LONETILDE]}${i[s.XRANGEPLAINLOOSE]}$`), S("LONECARET", "(?:\\^)"), S("CARETTRIM", `(\\s*)${i[s.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", S("CARET", `^${i[s.LONECARET]}${i[s.XRANGEPLAIN]}$`), S("CARETLOOSE", `^${i[s.LONECARET]}${i[s.XRANGEPLAINLOOSE]}$`), S("COMPARATORLOOSE", `^${i[s.GTLT]}\\s*(${i[s.LOOSEPLAIN]})$|^$`), S("COMPARATOR", `^${i[s.GTLT]}\\s*(${i[s.FULLPLAIN]})$|^$`), S("COMPARATORTRIM", `(\\s*)${i[s.GTLT]}\\s*(${i[s.LOOSEPLAIN]}|${i[s.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", S("HYPHENRANGE", `^\\s*(${i[s.XRANGEPLAIN]})\\s+-\\s+(${i[s.XRANGEPLAIN]})\\s*$`), S("HYPHENRANGELOOSE", `^\\s*(${i[s.XRANGEPLAINLOOSE]})\\s+-\\s+(${i[s.XRANGEPLAINLOOSE]})\\s*$`), S("STAR", "(<|>)?=?\\s*\\*"), S("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), S("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }(rr, rr.exports)), rr.exports;
}
var wn, la;
function bi() {
  if (la) return wn;
  la = 1;
  const e = Object.freeze({ loose: !0 }), t = Object.freeze({});
  return wn = (n) => n ? typeof n != "object" ? e : n : t, wn;
}
var Sn, da;
function Ac() {
  if (da) return Sn;
  da = 1;
  const e = /^[0-9]+$/, t = (n, u) => {
    const a = e.test(n), r = e.test(u);
    return a && r && (n = +n, u = +u), n === u ? 0 : a && !r ? -1 : r && !a ? 1 : n < u ? -1 : 1;
  };
  return Sn = {
    compareIdentifiers: t,
    rcompareIdentifiers: (n, u) => t(u, n)
  }, Sn;
}
var $n, ha;
function fe() {
  if (ha) return $n;
  ha = 1;
  const e = mr(), { MAX_LENGTH: t, MAX_SAFE_INTEGER: o } = hr(), { safeRe: n, t: u } = Je(), a = bi(), { compareIdentifiers: r } = Ac();
  class f {
    constructor(s, d) {
      if (d = a(d), s instanceof f) {
        if (s.loose === !!d.loose && s.includePrerelease === !!d.includePrerelease)
          return s;
        s = s.version;
      } else if (typeof s != "string")
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof s}".`);
      if (s.length > t)
        throw new TypeError(
          `version is longer than ${t} characters`
        );
      e("SemVer", s, d), this.options = d, this.loose = !!d.loose, this.includePrerelease = !!d.includePrerelease;
      const v = s.trim().match(d.loose ? n[u.LOOSE] : n[u.FULL]);
      if (!v)
        throw new TypeError(`Invalid Version: ${s}`);
      if (this.raw = s, this.major = +v[1], this.minor = +v[2], this.patch = +v[3], this.major > o || this.major < 0)
        throw new TypeError("Invalid major version");
      if (this.minor > o || this.minor < 0)
        throw new TypeError("Invalid minor version");
      if (this.patch > o || this.patch < 0)
        throw new TypeError("Invalid patch version");
      v[4] ? this.prerelease = v[4].split(".").map((_) => {
        if (/^[0-9]+$/.test(_)) {
          const p = +_;
          if (p >= 0 && p < o)
            return p;
        }
        return _;
      }) : this.prerelease = [], this.build = v[5] ? v[5].split(".") : [], this.format();
    }
    format() {
      return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
    }
    toString() {
      return this.version;
    }
    compare(s) {
      if (e("SemVer.compare", this.version, this.options, s), !(s instanceof f)) {
        if (typeof s == "string" && s === this.version)
          return 0;
        s = new f(s, this.options);
      }
      return s.version === this.version ? 0 : this.compareMain(s) || this.comparePre(s);
    }
    compareMain(s) {
      return s instanceof f || (s = new f(s, this.options)), r(this.major, s.major) || r(this.minor, s.minor) || r(this.patch, s.patch);
    }
    comparePre(s) {
      if (s instanceof f || (s = new f(s, this.options)), this.prerelease.length && !s.prerelease.length)
        return -1;
      if (!this.prerelease.length && s.prerelease.length)
        return 1;
      if (!this.prerelease.length && !s.prerelease.length)
        return 0;
      let d = 0;
      do {
        const v = this.prerelease[d], _ = s.prerelease[d];
        if (e("prerelease compare", d, v, _), v === void 0 && _ === void 0)
          return 0;
        if (_ === void 0)
          return 1;
        if (v === void 0)
          return -1;
        if (v === _)
          continue;
        return r(v, _);
      } while (++d);
    }
    compareBuild(s) {
      s instanceof f || (s = new f(s, this.options));
      let d = 0;
      do {
        const v = this.build[d], _ = s.build[d];
        if (e("build compare", d, v, _), v === void 0 && _ === void 0)
          return 0;
        if (_ === void 0)
          return 1;
        if (v === void 0)
          return -1;
        if (v === _)
          continue;
        return r(v, _);
      } while (++d);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(s, d, v) {
      switch (s) {
        case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", d, v);
          break;
        case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", d, v);
          break;
        case "prepatch":
          this.prerelease.length = 0, this.inc("patch", d, v), this.inc("pre", d, v);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          this.prerelease.length === 0 && this.inc("patch", d, v), this.inc("pre", d, v);
          break;
        case "major":
          (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
          break;
        case "minor":
          (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
          break;
        case "patch":
          this.prerelease.length === 0 && this.patch++, this.prerelease = [];
          break;
        // This probably shouldn't be used publicly.
        // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
        case "pre": {
          const _ = Number(v) ? 1 : 0;
          if (!d && v === !1)
            throw new Error("invalid increment argument: identifier is empty");
          if (this.prerelease.length === 0)
            this.prerelease = [_];
          else {
            let p = this.prerelease.length;
            for (; --p >= 0; )
              typeof this.prerelease[p] == "number" && (this.prerelease[p]++, p = -2);
            if (p === -1) {
              if (d === this.prerelease.join(".") && v === !1)
                throw new Error("invalid increment argument: identifier already exists");
              this.prerelease.push(_);
            }
          }
          if (d) {
            let p = [d, _];
            v === !1 && (p = [d]), r(this.prerelease[0], d) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = p) : this.prerelease = p;
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${s}`);
      }
      return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
    }
  }
  return $n = f, $n;
}
var Rn, ma;
function xe() {
  if (ma) return Rn;
  ma = 1;
  const e = fe();
  return Rn = (o, n, u = !1) => {
    if (o instanceof e)
      return o;
    try {
      return new e(o, n);
    } catch (a) {
      if (!u)
        return null;
      throw a;
    }
  }, Rn;
}
var In, pa;
function Yf() {
  if (pa) return In;
  pa = 1;
  const e = xe();
  return In = (o, n) => {
    const u = e(o, n);
    return u ? u.version : null;
  }, In;
}
var Nn, ya;
function Qf() {
  if (ya) return Nn;
  ya = 1;
  const e = xe();
  return Nn = (o, n) => {
    const u = e(o.trim().replace(/^[=v]+/, ""), n);
    return u ? u.version : null;
  }, Nn;
}
var On, Ea;
function el() {
  if (Ea) return On;
  Ea = 1;
  const e = fe();
  return On = (o, n, u, a, r) => {
    typeof u == "string" && (r = a, a = u, u = void 0);
    try {
      return new e(
        o instanceof e ? o.version : o,
        u
      ).inc(n, a, r).version;
    } catch {
      return null;
    }
  }, On;
}
var Pn, va;
function tl() {
  if (va) return Pn;
  va = 1;
  const e = xe();
  return Pn = (o, n) => {
    const u = e(o, null, !0), a = e(n, null, !0), r = u.compare(a);
    if (r === 0)
      return null;
    const f = r > 0, i = f ? u : a, s = f ? a : u, d = !!i.prerelease.length;
    if (!!s.prerelease.length && !d)
      return !s.patch && !s.minor ? "major" : i.patch ? "patch" : i.minor ? "minor" : "major";
    const _ = d ? "pre" : "";
    return u.major !== a.major ? _ + "major" : u.minor !== a.minor ? _ + "minor" : u.patch !== a.patch ? _ + "patch" : "prerelease";
  }, Pn;
}
var Tn, ga;
function rl() {
  if (ga) return Tn;
  ga = 1;
  const e = fe();
  return Tn = (o, n) => new e(o, n).major, Tn;
}
var bn, _a;
function nl() {
  if (_a) return bn;
  _a = 1;
  const e = fe();
  return bn = (o, n) => new e(o, n).minor, bn;
}
var Dn, wa;
function il() {
  if (wa) return Dn;
  wa = 1;
  const e = fe();
  return Dn = (o, n) => new e(o, n).patch, Dn;
}
var Cn, Sa;
function sl() {
  if (Sa) return Cn;
  Sa = 1;
  const e = xe();
  return Cn = (o, n) => {
    const u = e(o, n);
    return u && u.prerelease.length ? u.prerelease : null;
  }, Cn;
}
var Ln, $a;
function we() {
  if ($a) return Ln;
  $a = 1;
  const e = fe();
  return Ln = (o, n, u) => new e(o, u).compare(new e(n, u)), Ln;
}
var An, Ra;
function ol() {
  if (Ra) return An;
  Ra = 1;
  const e = we();
  return An = (o, n, u) => e(n, o, u), An;
}
var Fn, Ia;
function al() {
  if (Ia) return Fn;
  Ia = 1;
  const e = we();
  return Fn = (o, n) => e(o, n, !0), Fn;
}
var qn, Na;
function Di() {
  if (Na) return qn;
  Na = 1;
  const e = fe();
  return qn = (o, n, u) => {
    const a = new e(o, u), r = new e(n, u);
    return a.compare(r) || a.compareBuild(r);
  }, qn;
}
var jn, Oa;
function cl() {
  if (Oa) return jn;
  Oa = 1;
  const e = Di();
  return jn = (o, n) => o.sort((u, a) => e(u, a, n)), jn;
}
var kn, Pa;
function ul() {
  if (Pa) return kn;
  Pa = 1;
  const e = Di();
  return kn = (o, n) => o.sort((u, a) => e(a, u, n)), kn;
}
var Mn, Ta;
function pr() {
  if (Ta) return Mn;
  Ta = 1;
  const e = we();
  return Mn = (o, n, u) => e(o, n, u) > 0, Mn;
}
var Un, ba;
function Ci() {
  if (ba) return Un;
  ba = 1;
  const e = we();
  return Un = (o, n, u) => e(o, n, u) < 0, Un;
}
var xn, Da;
function Fc() {
  if (Da) return xn;
  Da = 1;
  const e = we();
  return xn = (o, n, u) => e(o, n, u) === 0, xn;
}
var zn, Ca;
function qc() {
  if (Ca) return zn;
  Ca = 1;
  const e = we();
  return zn = (o, n, u) => e(o, n, u) !== 0, zn;
}
var Vn, La;
function Li() {
  if (La) return Vn;
  La = 1;
  const e = we();
  return Vn = (o, n, u) => e(o, n, u) >= 0, Vn;
}
var Gn, Aa;
function Ai() {
  if (Aa) return Gn;
  Aa = 1;
  const e = we();
  return Gn = (o, n, u) => e(o, n, u) <= 0, Gn;
}
var Hn, Fa;
function jc() {
  if (Fa) return Hn;
  Fa = 1;
  const e = Fc(), t = qc(), o = pr(), n = Li(), u = Ci(), a = Ai();
  return Hn = (f, i, s, d) => {
    switch (i) {
      case "===":
        return typeof f == "object" && (f = f.version), typeof s == "object" && (s = s.version), f === s;
      case "!==":
        return typeof f == "object" && (f = f.version), typeof s == "object" && (s = s.version), f !== s;
      case "":
      case "=":
      case "==":
        return e(f, s, d);
      case "!=":
        return t(f, s, d);
      case ">":
        return o(f, s, d);
      case ">=":
        return n(f, s, d);
      case "<":
        return u(f, s, d);
      case "<=":
        return a(f, s, d);
      default:
        throw new TypeError(`Invalid operator: ${i}`);
    }
  }, Hn;
}
var Bn, qa;
function fl() {
  if (qa) return Bn;
  qa = 1;
  const e = fe(), t = xe(), { safeRe: o, t: n } = Je();
  return Bn = (a, r) => {
    if (a instanceof e)
      return a;
    if (typeof a == "number" && (a = String(a)), typeof a != "string")
      return null;
    r = r || {};
    let f = null;
    if (!r.rtl)
      f = a.match(r.includePrerelease ? o[n.COERCEFULL] : o[n.COERCE]);
    else {
      const p = r.includePrerelease ? o[n.COERCERTLFULL] : o[n.COERCERTL];
      let S;
      for (; (S = p.exec(a)) && (!f || f.index + f[0].length !== a.length); )
        (!f || S.index + S[0].length !== f.index + f[0].length) && (f = S), p.lastIndex = S.index + S[1].length + S[2].length;
      p.lastIndex = -1;
    }
    if (f === null)
      return null;
    const i = f[2], s = f[3] || "0", d = f[4] || "0", v = r.includePrerelease && f[5] ? `-${f[5]}` : "", _ = r.includePrerelease && f[6] ? `+${f[6]}` : "";
    return t(`${i}.${s}.${d}${v}${_}`, r);
  }, Bn;
}
var Kn, ja;
function ll() {
  if (ja) return Kn;
  ja = 1;
  class e {
    constructor() {
      this.max = 1e3, this.map = /* @__PURE__ */ new Map();
    }
    get(o) {
      const n = this.map.get(o);
      if (n !== void 0)
        return this.map.delete(o), this.map.set(o, n), n;
    }
    delete(o) {
      return this.map.delete(o);
    }
    set(o, n) {
      if (!this.delete(o) && n !== void 0) {
        if (this.map.size >= this.max) {
          const a = this.map.keys().next().value;
          this.delete(a);
        }
        this.map.set(o, n);
      }
      return this;
    }
  }
  return Kn = e, Kn;
}
var Wn, ka;
function Se() {
  if (ka) return Wn;
  ka = 1;
  const e = /\s+/g;
  class t {
    constructor(x, K) {
      if (K = u(K), x instanceof t)
        return x.loose === !!K.loose && x.includePrerelease === !!K.includePrerelease ? x : new t(x.raw, K);
      if (x instanceof a)
        return this.raw = x.value, this.set = [[x]], this.formatted = void 0, this;
      if (this.options = K, this.loose = !!K.loose, this.includePrerelease = !!K.includePrerelease, this.raw = x.trim().replace(e, " "), this.set = this.raw.split("||").map((V) => this.parseRange(V.trim())).filter((V) => V.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const V = this.set[0];
        if (this.set = this.set.filter((C) => !$(C[0])), this.set.length === 0)
          this.set = [V];
        else if (this.set.length > 1) {
          for (const C of this.set)
            if (C.length === 1 && l(C[0])) {
              this.set = [C];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let x = 0; x < this.set.length; x++) {
          x > 0 && (this.formatted += "||");
          const K = this.set[x];
          for (let V = 0; V < K.length; V++)
            V > 0 && (this.formatted += " "), this.formatted += K[V].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(x) {
      const V = ((this.options.includePrerelease && p) | (this.options.loose && S)) + ":" + x, C = n.get(V);
      if (C)
        return C;
      const j = this.options.loose, T = j ? i[s.HYPHENRANGELOOSE] : i[s.HYPHENRANGE];
      x = x.replace(T, G(this.options.includePrerelease)), r("hyphen replace", x), x = x.replace(i[s.COMPARATORTRIM], d), r("comparator trim", x), x = x.replace(i[s.TILDETRIM], v), r("tilde trim", x), x = x.replace(i[s.CARETTRIM], _), r("caret trim", x);
      let P = x.split(" ").map((O) => c(O, this.options)).join(" ").split(/\s+/).map((O) => M(O, this.options));
      j && (P = P.filter((O) => (r("loose invalid filter", O, this.options), !!O.match(i[s.COMPARATORLOOSE])))), r("range list", P);
      const q = /* @__PURE__ */ new Map(), L = P.map((O) => new a(O, this.options));
      for (const O of L) {
        if ($(O))
          return [O];
        q.set(O.value, O);
      }
      q.size > 1 && q.has("") && q.delete("");
      const I = [...q.values()];
      return n.set(V, I), I;
    }
    intersects(x, K) {
      if (!(x instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((V) => h(V, K) && x.set.some((C) => h(C, K) && V.every((j) => C.every((T) => j.intersects(T, K)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(x) {
      if (!x)
        return !1;
      if (typeof x == "string")
        try {
          x = new f(x, this.options);
        } catch {
          return !1;
        }
      for (let K = 0; K < this.set.length; K++)
        if (k(this.set[K], x, this.options))
          return !0;
      return !1;
    }
  }
  Wn = t;
  const o = ll(), n = new o(), u = bi(), a = yr(), r = mr(), f = fe(), {
    safeRe: i,
    t: s,
    comparatorTrimReplace: d,
    tildeTrimReplace: v,
    caretTrimReplace: _
  } = Je(), { FLAG_INCLUDE_PRERELEASE: p, FLAG_LOOSE: S } = hr(), $ = (U) => U.value === "<0.0.0-0", l = (U) => U.value === "", h = (U, x) => {
    let K = !0;
    const V = U.slice();
    let C = V.pop();
    for (; K && V.length; )
      K = V.every((j) => C.intersects(j, x)), C = V.pop();
    return K;
  }, c = (U, x) => (r("comp", U, x), U = g(U, x), r("caret", U), U = E(U, x), r("tildes", U), U = R(U, x), r("xrange", U), U = b(U, x), r("stars", U), U), m = (U) => !U || U.toLowerCase() === "x" || U === "*", E = (U, x) => U.trim().split(/\s+/).map((K) => y(K, x)).join(" "), y = (U, x) => {
    const K = x.loose ? i[s.TILDELOOSE] : i[s.TILDE];
    return U.replace(K, (V, C, j, T, P) => {
      r("tilde", U, V, C, j, T, P);
      let q;
      return m(C) ? q = "" : m(j) ? q = `>=${C}.0.0 <${+C + 1}.0.0-0` : m(T) ? q = `>=${C}.${j}.0 <${C}.${+j + 1}.0-0` : P ? (r("replaceTilde pr", P), q = `>=${C}.${j}.${T}-${P} <${C}.${+j + 1}.0-0`) : q = `>=${C}.${j}.${T} <${C}.${+j + 1}.0-0`, r("tilde return", q), q;
    });
  }, g = (U, x) => U.trim().split(/\s+/).map((K) => w(K, x)).join(" "), w = (U, x) => {
    r("caret", U, x);
    const K = x.loose ? i[s.CARETLOOSE] : i[s.CARET], V = x.includePrerelease ? "-0" : "";
    return U.replace(K, (C, j, T, P, q) => {
      r("caret", U, C, j, T, P, q);
      let L;
      return m(j) ? L = "" : m(T) ? L = `>=${j}.0.0${V} <${+j + 1}.0.0-0` : m(P) ? j === "0" ? L = `>=${j}.${T}.0${V} <${j}.${+T + 1}.0-0` : L = `>=${j}.${T}.0${V} <${+j + 1}.0.0-0` : q ? (r("replaceCaret pr", q), j === "0" ? T === "0" ? L = `>=${j}.${T}.${P}-${q} <${j}.${T}.${+P + 1}-0` : L = `>=${j}.${T}.${P}-${q} <${j}.${+T + 1}.0-0` : L = `>=${j}.${T}.${P}-${q} <${+j + 1}.0.0-0`) : (r("no pr"), j === "0" ? T === "0" ? L = `>=${j}.${T}.${P}${V} <${j}.${T}.${+P + 1}-0` : L = `>=${j}.${T}.${P}${V} <${j}.${+T + 1}.0-0` : L = `>=${j}.${T}.${P} <${+j + 1}.0.0-0`), r("caret return", L), L;
    });
  }, R = (U, x) => (r("replaceXRanges", U, x), U.split(/\s+/).map((K) => N(K, x)).join(" ")), N = (U, x) => {
    U = U.trim();
    const K = x.loose ? i[s.XRANGELOOSE] : i[s.XRANGE];
    return U.replace(K, (V, C, j, T, P, q) => {
      r("xRange", U, V, C, j, T, P, q);
      const L = m(j), I = L || m(T), O = I || m(P), F = O;
      return C === "=" && F && (C = ""), q = x.includePrerelease ? "-0" : "", L ? C === ">" || C === "<" ? V = "<0.0.0-0" : V = "*" : C && F ? (I && (T = 0), P = 0, C === ">" ? (C = ">=", I ? (j = +j + 1, T = 0, P = 0) : (T = +T + 1, P = 0)) : C === "<=" && (C = "<", I ? j = +j + 1 : T = +T + 1), C === "<" && (q = "-0"), V = `${C + j}.${T}.${P}${q}`) : I ? V = `>=${j}.0.0${q} <${+j + 1}.0.0-0` : O && (V = `>=${j}.${T}.0${q} <${j}.${+T + 1}.0-0`), r("xRange return", V), V;
    });
  }, b = (U, x) => (r("replaceStars", U, x), U.trim().replace(i[s.STAR], "")), M = (U, x) => (r("replaceGTE0", U, x), U.trim().replace(i[x.includePrerelease ? s.GTE0PRE : s.GTE0], "")), G = (U) => (x, K, V, C, j, T, P, q, L, I, O, F) => (m(V) ? K = "" : m(C) ? K = `>=${V}.0.0${U ? "-0" : ""}` : m(j) ? K = `>=${V}.${C}.0${U ? "-0" : ""}` : T ? K = `>=${K}` : K = `>=${K}${U ? "-0" : ""}`, m(L) ? q = "" : m(I) ? q = `<${+L + 1}.0.0-0` : m(O) ? q = `<${L}.${+I + 1}.0-0` : F ? q = `<=${L}.${I}.${O}-${F}` : U ? q = `<${L}.${I}.${+O + 1}-0` : q = `<=${q}`, `${K} ${q}`.trim()), k = (U, x, K) => {
    for (let V = 0; V < U.length; V++)
      if (!U[V].test(x))
        return !1;
    if (x.prerelease.length && !K.includePrerelease) {
      for (let V = 0; V < U.length; V++)
        if (r(U[V].semver), U[V].semver !== a.ANY && U[V].semver.prerelease.length > 0) {
          const C = U[V].semver;
          if (C.major === x.major && C.minor === x.minor && C.patch === x.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Wn;
}
var Zn, Ma;
function yr() {
  if (Ma) return Zn;
  Ma = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(d, v) {
      if (v = o(v), d instanceof t) {
        if (d.loose === !!v.loose)
          return d;
        d = d.value;
      }
      d = d.trim().split(/\s+/).join(" "), r("comparator", d, v), this.options = v, this.loose = !!v.loose, this.parse(d), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, r("comp", this);
    }
    parse(d) {
      const v = this.options.loose ? n[u.COMPARATORLOOSE] : n[u.COMPARATOR], _ = d.match(v);
      if (!_)
        throw new TypeError(`Invalid comparator: ${d}`);
      this.operator = _[1] !== void 0 ? _[1] : "", this.operator === "=" && (this.operator = ""), _[2] ? this.semver = new f(_[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(d) {
      if (r("Comparator.test", d, this.options.loose), this.semver === e || d === e)
        return !0;
      if (typeof d == "string")
        try {
          d = new f(d, this.options);
        } catch {
          return !1;
        }
      return a(d, this.operator, this.semver, this.options);
    }
    intersects(d, v) {
      if (!(d instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new i(d.value, v).test(this.value) : d.operator === "" ? d.value === "" ? !0 : new i(this.value, v).test(d.semver) : (v = o(v), v.includePrerelease && (this.value === "<0.0.0-0" || d.value === "<0.0.0-0") || !v.includePrerelease && (this.value.startsWith("<0.0.0") || d.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && d.operator.startsWith(">") || this.operator.startsWith("<") && d.operator.startsWith("<") || this.semver.version === d.semver.version && this.operator.includes("=") && d.operator.includes("=") || a(this.semver, "<", d.semver, v) && this.operator.startsWith(">") && d.operator.startsWith("<") || a(this.semver, ">", d.semver, v) && this.operator.startsWith("<") && d.operator.startsWith(">")));
    }
  }
  Zn = t;
  const o = bi(), { safeRe: n, t: u } = Je(), a = jc(), r = mr(), f = fe(), i = Se();
  return Zn;
}
var Xn, Ua;
function Er() {
  if (Ua) return Xn;
  Ua = 1;
  const e = Se();
  return Xn = (o, n, u) => {
    try {
      n = new e(n, u);
    } catch {
      return !1;
    }
    return n.test(o);
  }, Xn;
}
var Jn, xa;
function dl() {
  if (xa) return Jn;
  xa = 1;
  const e = Se();
  return Jn = (o, n) => new e(o, n).set.map((u) => u.map((a) => a.value).join(" ").trim().split(" ")), Jn;
}
var Yn, za;
function hl() {
  if (za) return Yn;
  za = 1;
  const e = fe(), t = Se();
  return Yn = (n, u, a) => {
    let r = null, f = null, i = null;
    try {
      i = new t(u, a);
    } catch {
      return null;
    }
    return n.forEach((s) => {
      i.test(s) && (!r || f.compare(s) === -1) && (r = s, f = new e(r, a));
    }), r;
  }, Yn;
}
var Qn, Va;
function ml() {
  if (Va) return Qn;
  Va = 1;
  const e = fe(), t = Se();
  return Qn = (n, u, a) => {
    let r = null, f = null, i = null;
    try {
      i = new t(u, a);
    } catch {
      return null;
    }
    return n.forEach((s) => {
      i.test(s) && (!r || f.compare(s) === 1) && (r = s, f = new e(r, a));
    }), r;
  }, Qn;
}
var ei, Ga;
function pl() {
  if (Ga) return ei;
  Ga = 1;
  const e = fe(), t = Se(), o = pr();
  return ei = (u, a) => {
    u = new t(u, a);
    let r = new e("0.0.0");
    if (u.test(r) || (r = new e("0.0.0-0"), u.test(r)))
      return r;
    r = null;
    for (let f = 0; f < u.set.length; ++f) {
      const i = u.set[f];
      let s = null;
      i.forEach((d) => {
        const v = new e(d.semver.version);
        switch (d.operator) {
          case ">":
            v.prerelease.length === 0 ? v.patch++ : v.prerelease.push(0), v.raw = v.format();
          /* fallthrough */
          case "":
          case ">=":
            (!s || o(v, s)) && (s = v);
            break;
          case "<":
          case "<=":
            break;
          /* istanbul ignore next */
          default:
            throw new Error(`Unexpected operation: ${d.operator}`);
        }
      }), s && (!r || o(r, s)) && (r = s);
    }
    return r && u.test(r) ? r : null;
  }, ei;
}
var ti, Ha;
function yl() {
  if (Ha) return ti;
  Ha = 1;
  const e = Se();
  return ti = (o, n) => {
    try {
      return new e(o, n).range || "*";
    } catch {
      return null;
    }
  }, ti;
}
var ri, Ba;
function Fi() {
  if (Ba) return ri;
  Ba = 1;
  const e = fe(), t = yr(), { ANY: o } = t, n = Se(), u = Er(), a = pr(), r = Ci(), f = Ai(), i = Li();
  return ri = (d, v, _, p) => {
    d = new e(d, p), v = new n(v, p);
    let S, $, l, h, c;
    switch (_) {
      case ">":
        S = a, $ = f, l = r, h = ">", c = ">=";
        break;
      case "<":
        S = r, $ = i, l = a, h = "<", c = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (u(d, v, p))
      return !1;
    for (let m = 0; m < v.set.length; ++m) {
      const E = v.set[m];
      let y = null, g = null;
      if (E.forEach((w) => {
        w.semver === o && (w = new t(">=0.0.0")), y = y || w, g = g || w, S(w.semver, y.semver, p) ? y = w : l(w.semver, g.semver, p) && (g = w);
      }), y.operator === h || y.operator === c || (!g.operator || g.operator === h) && $(d, g.semver))
        return !1;
      if (g.operator === c && l(d, g.semver))
        return !1;
    }
    return !0;
  }, ri;
}
var ni, Ka;
function El() {
  if (Ka) return ni;
  Ka = 1;
  const e = Fi();
  return ni = (o, n, u) => e(o, n, ">", u), ni;
}
var ii, Wa;
function vl() {
  if (Wa) return ii;
  Wa = 1;
  const e = Fi();
  return ii = (o, n, u) => e(o, n, "<", u), ii;
}
var si, Za;
function gl() {
  if (Za) return si;
  Za = 1;
  const e = Se();
  return si = (o, n, u) => (o = new e(o, u), n = new e(n, u), o.intersects(n, u)), si;
}
var oi, Xa;
function _l() {
  if (Xa) return oi;
  Xa = 1;
  const e = Er(), t = we();
  return oi = (o, n, u) => {
    const a = [];
    let r = null, f = null;
    const i = o.sort((_, p) => t(_, p, u));
    for (const _ of i)
      e(_, n, u) ? (f = _, r || (r = _)) : (f && a.push([r, f]), f = null, r = null);
    r && a.push([r, null]);
    const s = [];
    for (const [_, p] of a)
      _ === p ? s.push(_) : !p && _ === i[0] ? s.push("*") : p ? _ === i[0] ? s.push(`<=${p}`) : s.push(`${_} - ${p}`) : s.push(`>=${_}`);
    const d = s.join(" || "), v = typeof n.raw == "string" ? n.raw : String(n);
    return d.length < v.length ? d : n;
  }, oi;
}
var ai, Ja;
function wl() {
  if (Ja) return ai;
  Ja = 1;
  const e = Se(), t = yr(), { ANY: o } = t, n = Er(), u = we(), a = (v, _, p = {}) => {
    if (v === _)
      return !0;
    v = new e(v, p), _ = new e(_, p);
    let S = !1;
    e: for (const $ of v.set) {
      for (const l of _.set) {
        const h = i($, l, p);
        if (S = S || h !== null, h)
          continue e;
      }
      if (S)
        return !1;
    }
    return !0;
  }, r = [new t(">=0.0.0-0")], f = [new t(">=0.0.0")], i = (v, _, p) => {
    if (v === _)
      return !0;
    if (v.length === 1 && v[0].semver === o) {
      if (_.length === 1 && _[0].semver === o)
        return !0;
      p.includePrerelease ? v = r : v = f;
    }
    if (_.length === 1 && _[0].semver === o) {
      if (p.includePrerelease)
        return !0;
      _ = f;
    }
    const S = /* @__PURE__ */ new Set();
    let $, l;
    for (const R of v)
      R.operator === ">" || R.operator === ">=" ? $ = s($, R, p) : R.operator === "<" || R.operator === "<=" ? l = d(l, R, p) : S.add(R.semver);
    if (S.size > 1)
      return null;
    let h;
    if ($ && l) {
      if (h = u($.semver, l.semver, p), h > 0)
        return null;
      if (h === 0 && ($.operator !== ">=" || l.operator !== "<="))
        return null;
    }
    for (const R of S) {
      if ($ && !n(R, String($), p) || l && !n(R, String(l), p))
        return null;
      for (const N of _)
        if (!n(R, String(N), p))
          return !1;
      return !0;
    }
    let c, m, E, y, g = l && !p.includePrerelease && l.semver.prerelease.length ? l.semver : !1, w = $ && !p.includePrerelease && $.semver.prerelease.length ? $.semver : !1;
    g && g.prerelease.length === 1 && l.operator === "<" && g.prerelease[0] === 0 && (g = !1);
    for (const R of _) {
      if (y = y || R.operator === ">" || R.operator === ">=", E = E || R.operator === "<" || R.operator === "<=", $) {
        if (w && R.semver.prerelease && R.semver.prerelease.length && R.semver.major === w.major && R.semver.minor === w.minor && R.semver.patch === w.patch && (w = !1), R.operator === ">" || R.operator === ">=") {
          if (c = s($, R, p), c === R && c !== $)
            return !1;
        } else if ($.operator === ">=" && !n($.semver, String(R), p))
          return !1;
      }
      if (l) {
        if (g && R.semver.prerelease && R.semver.prerelease.length && R.semver.major === g.major && R.semver.minor === g.minor && R.semver.patch === g.patch && (g = !1), R.operator === "<" || R.operator === "<=") {
          if (m = d(l, R, p), m === R && m !== l)
            return !1;
        } else if (l.operator === "<=" && !n(l.semver, String(R), p))
          return !1;
      }
      if (!R.operator && (l || $) && h !== 0)
        return !1;
    }
    return !($ && E && !l && h !== 0 || l && y && !$ && h !== 0 || w || g);
  }, s = (v, _, p) => {
    if (!v)
      return _;
    const S = u(v.semver, _.semver, p);
    return S > 0 ? v : S < 0 || _.operator === ">" && v.operator === ">=" ? _ : v;
  }, d = (v, _, p) => {
    if (!v)
      return _;
    const S = u(v.semver, _.semver, p);
    return S < 0 ? v : S > 0 || _.operator === "<" && v.operator === "<=" ? _ : v;
  };
  return ai = a, ai;
}
var ci, Ya;
function Sl() {
  if (Ya) return ci;
  Ya = 1;
  const e = Je(), t = hr(), o = fe(), n = Ac(), u = xe(), a = Yf(), r = Qf(), f = el(), i = tl(), s = rl(), d = nl(), v = il(), _ = sl(), p = we(), S = ol(), $ = al(), l = Di(), h = cl(), c = ul(), m = pr(), E = Ci(), y = Fc(), g = qc(), w = Li(), R = Ai(), N = jc(), b = fl(), M = yr(), G = Se(), k = Er(), U = dl(), x = hl(), K = ml(), V = pl(), C = yl(), j = Fi(), T = El(), P = vl(), q = gl(), L = _l(), I = wl();
  return ci = {
    parse: u,
    valid: a,
    clean: r,
    inc: f,
    diff: i,
    major: s,
    minor: d,
    patch: v,
    prerelease: _,
    compare: p,
    rcompare: S,
    compareLoose: $,
    compareBuild: l,
    sort: h,
    rsort: c,
    gt: m,
    lt: E,
    eq: y,
    neq: g,
    gte: w,
    lte: R,
    cmp: N,
    coerce: b,
    Comparator: M,
    Range: G,
    satisfies: k,
    toComparators: U,
    maxSatisfying: x,
    minSatisfying: K,
    minVersion: V,
    validRange: C,
    outside: j,
    gtr: T,
    ltr: P,
    intersects: q,
    simplifyRange: L,
    subset: I,
    SemVer: o,
    re: e.re,
    src: e.src,
    tokens: e.t,
    SEMVER_SPEC_VERSION: t.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: t.RELEASE_TYPES,
    compareIdentifiers: n.compareIdentifiers,
    rcompareIdentifiers: n.rcompareIdentifiers
  }, ci;
}
var Be = { exports: {} }, nr = { exports: {} }, Qa;
function $l() {
  if (Qa) return nr.exports;
  Qa = 1;
  const e = (t, o) => {
    for (const n of Reflect.ownKeys(o))
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
    return t;
  };
  return nr.exports = e, nr.exports.default = e, nr.exports;
}
var ec;
function Rl() {
  if (ec) return Be.exports;
  ec = 1;
  const e = $l(), t = /* @__PURE__ */ new WeakMap(), o = (n, u = {}) => {
    if (typeof n != "function")
      throw new TypeError("Expected a function");
    let a, r = 0;
    const f = n.displayName || n.name || "<anonymous>", i = function(...s) {
      if (t.set(i, ++r), r === 1)
        a = n.apply(this, s), n = null;
      else if (u.throw === !0)
        throw new Error(`Function \`${f}\` can only be called once`);
      return a;
    };
    return e(i, n), t.set(i, r), i;
  };
  return Be.exports = o, Be.exports.default = o, Be.exports.callCount = (n) => {
    if (!t.has(n))
      throw new Error(`The given function \`${n.name}\` is not wrapped by the \`onetime\` package`);
    return t.get(n);
  }, Be.exports;
}
var ir = We.exports, tc;
function Il() {
  return tc || (tc = 1, function(e, t) {
    var o = ir && ir.__classPrivateFieldSet || function(V, C, j, T, P) {
      if (T === "m") throw new TypeError("Private method is not writable");
      if (T === "a" && !P) throw new TypeError("Private accessor was defined without a setter");
      if (typeof C == "function" ? V !== C || !P : !C.has(V)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return T === "a" ? P.call(V, j) : P ? P.value = j : C.set(V, j), j;
    }, n = ir && ir.__classPrivateFieldGet || function(V, C, j, T) {
      if (j === "a" && !T) throw new TypeError("Private accessor was defined without a getter");
      if (typeof C == "function" ? V !== C || !T : !C.has(V)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return j === "m" ? T : j === "a" ? T.call(V) : T ? T.value : C.get(V);
    }, u, a, r, f, i, s;
    Object.defineProperty(t, "__esModule", { value: !0 });
    const d = $i, v = Me, _ = ie, p = Sc, S = wc, $ = Wc, l = $u(), h = bu(), c = Du(), m = Mu(), E = Lc(), y = Zf(), g = Jf(), w = Sl(), R = Rl(), N = "aes-256-cbc", b = () => /* @__PURE__ */ Object.create(null), M = (V) => V != null;
    let G = "";
    try {
      delete require.cache[__filename], G = _.dirname((a = (u = e.parent) === null || u === void 0 ? void 0 : u.filename) !== null && a !== void 0 ? a : ".");
    } catch {
    }
    const k = (V, C) => {
      const j = /* @__PURE__ */ new Set([
        "undefined",
        "symbol",
        "function"
      ]), T = typeof C;
      if (j.has(T))
        throw new TypeError(`Setting a value of type \`${T}\` for key \`${V}\` is not allowed as it's not supported by JSON`);
    }, U = "__internal__", x = `${U}.migrations.version`;
    class K {
      constructor(C = {}) {
        var j;
        r.set(this, void 0), f.set(this, void 0), i.set(this, void 0), s.set(this, {}), this._deserialize = (O) => JSON.parse(O), this._serialize = (O) => JSON.stringify(O, void 0, "	");
        const T = {
          configName: "config",
          fileExtension: "json",
          projectSuffix: "nodejs",
          clearInvalidConfig: !1,
          accessPropertiesByDotNotation: !0,
          configFileMode: 438,
          ...C
        }, P = R(() => {
          const O = h.sync({ cwd: G }), F = O && JSON.parse(v.readFileSync(O, "utf8"));
          return F ?? {};
        });
        if (!T.cwd) {
          if (T.projectName || (T.projectName = P().name), !T.projectName)
            throw new Error("Project name could not be inferred. Please specify the `projectName` option.");
          T.cwd = c(T.projectName, { suffix: T.projectSuffix }).config;
        }
        if (o(this, i, T, "f"), T.schema) {
          if (typeof T.schema != "object")
            throw new TypeError("The `schema` option must be an object.");
          const O = new E.default({
            allErrors: !0,
            useDefaults: !0
          });
          (0, y.default)(O);
          const F = {
            type: "object",
            properties: T.schema
          };
          o(this, r, O.compile(F), "f");
          for (const [B, Z] of Object.entries(T.schema))
            Z?.default && (n(this, s, "f")[B] = Z.default);
        }
        T.defaults && o(this, s, {
          ...n(this, s, "f"),
          ...T.defaults
        }, "f"), T.serialize && (this._serialize = T.serialize), T.deserialize && (this._deserialize = T.deserialize), this.events = new $.EventEmitter(), o(this, f, T.encryptionKey, "f");
        const q = T.fileExtension ? `.${T.fileExtension}` : "";
        this.path = _.resolve(T.cwd, `${(j = T.configName) !== null && j !== void 0 ? j : "config"}${q}`);
        const L = this.store, I = Object.assign(b(), T.defaults, L);
        this._validate(I);
        try {
          S.deepEqual(L, I);
        } catch {
          this.store = I;
        }
        if (T.watch && this._watch(), T.migrations) {
          if (T.projectVersion || (T.projectVersion = P().version), !T.projectVersion)
            throw new Error("Project version could not be inferred. Please specify the `projectVersion` option.");
          this._migrate(T.migrations, T.projectVersion, T.beforeEachMigration);
        }
      }
      get(C, j) {
        if (n(this, i, "f").accessPropertiesByDotNotation)
          return this._get(C, j);
        const { store: T } = this;
        return C in T ? T[C] : j;
      }
      set(C, j) {
        if (typeof C != "string" && typeof C != "object")
          throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof C}`);
        if (typeof C != "object" && j === void 0)
          throw new TypeError("Use `delete()` to clear values");
        if (this._containsReservedKey(C))
          throw new TypeError(`Please don't use the ${U} key, as it's used to manage this module internal operations.`);
        const { store: T } = this, P = (q, L) => {
          k(q, L), n(this, i, "f").accessPropertiesByDotNotation ? l.set(T, q, L) : T[q] = L;
        };
        if (typeof C == "object") {
          const q = C;
          for (const [L, I] of Object.entries(q))
            P(L, I);
        } else
          P(C, j);
        this.store = T;
      }
      /**
      		    Check if an item exists.
      
      		    @param key - The key of the item to check.
      		    */
      has(C) {
        return n(this, i, "f").accessPropertiesByDotNotation ? l.has(this.store, C) : C in this.store;
      }
      /**
      		    Reset items to their default values, as defined by the `defaults` or `schema` option.
      
      		    @see `clear()` to reset all items.
      
      		    @param keys - The keys of the items to reset.
      		    */
      reset(...C) {
        for (const j of C)
          M(n(this, s, "f")[j]) && this.set(j, n(this, s, "f")[j]);
      }
      /**
      		    Delete an item.
      
      		    @param key - The key of the item to delete.
      		    */
      delete(C) {
        const { store: j } = this;
        n(this, i, "f").accessPropertiesByDotNotation ? l.delete(j, C) : delete j[C], this.store = j;
      }
      /**
      		    Delete all items.
      
      		    This resets known items to their default values, if defined by the `defaults` or `schema` option.
      		    */
      clear() {
        this.store = b();
        for (const C of Object.keys(n(this, s, "f")))
          this.reset(C);
      }
      /**
      		    Watches the given `key`, calling `callback` on any changes.
      
      		    @param key - The key wo watch.
      		    @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
      		    @returns A function, that when called, will unsubscribe.
      		    */
      onDidChange(C, j) {
        if (typeof C != "string")
          throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof C}`);
        if (typeof j != "function")
          throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof j}`);
        return this._handleChange(() => this.get(C), j);
      }
      /**
      		    Watches the whole config object, calling `callback` on any changes.
      
      		    @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
      		    @returns A function, that when called, will unsubscribe.
      		    */
      onDidAnyChange(C) {
        if (typeof C != "function")
          throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof C}`);
        return this._handleChange(() => this.store, C);
      }
      get size() {
        return Object.keys(this.store).length;
      }
      get store() {
        try {
          const C = v.readFileSync(this.path, n(this, f, "f") ? null : "utf8"), j = this._encryptData(C), T = this._deserialize(j);
          return this._validate(T), Object.assign(b(), T);
        } catch (C) {
          if (C?.code === "ENOENT")
            return this._ensureDirectory(), b();
          if (n(this, i, "f").clearInvalidConfig && C.name === "SyntaxError")
            return b();
          throw C;
        }
      }
      set store(C) {
        this._ensureDirectory(), this._validate(C), this._write(C), this.events.emit("change");
      }
      *[(r = /* @__PURE__ */ new WeakMap(), f = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap(), s = /* @__PURE__ */ new WeakMap(), Symbol.iterator)]() {
        for (const [C, j] of Object.entries(this.store))
          yield [C, j];
      }
      _encryptData(C) {
        if (!n(this, f, "f"))
          return C.toString();
        try {
          if (n(this, f, "f"))
            try {
              if (C.slice(16, 17).toString() === ":") {
                const j = C.slice(0, 16), T = p.pbkdf2Sync(n(this, f, "f"), j.toString(), 1e4, 32, "sha512"), P = p.createDecipheriv(N, T, j);
                C = Buffer.concat([P.update(Buffer.from(C.slice(17))), P.final()]).toString("utf8");
              } else {
                const j = p.createDecipher(N, n(this, f, "f"));
                C = Buffer.concat([j.update(Buffer.from(C)), j.final()]).toString("utf8");
              }
            } catch {
            }
        } catch {
        }
        return C.toString();
      }
      _handleChange(C, j) {
        let T = C();
        const P = () => {
          const q = T, L = C();
          (0, d.isDeepStrictEqual)(L, q) || (T = L, j.call(this, L, q));
        };
        return this.events.on("change", P), () => this.events.removeListener("change", P);
      }
      _validate(C) {
        if (!n(this, r, "f") || n(this, r, "f").call(this, C) || !n(this, r, "f").errors)
          return;
        const T = n(this, r, "f").errors.map(({ instancePath: P, message: q = "" }) => `\`${P.slice(1)}\` ${q}`);
        throw new Error("Config schema violation: " + T.join("; "));
      }
      _ensureDirectory() {
        v.mkdirSync(_.dirname(this.path), { recursive: !0 });
      }
      _write(C) {
        let j = this._serialize(C);
        if (n(this, f, "f")) {
          const T = p.randomBytes(16), P = p.pbkdf2Sync(n(this, f, "f"), T.toString(), 1e4, 32, "sha512"), q = p.createCipheriv(N, P, T);
          j = Buffer.concat([T, Buffer.from(":"), q.update(Buffer.from(j)), q.final()]);
        }
        if (process.env.SNAP)
          v.writeFileSync(this.path, j, { mode: n(this, i, "f").configFileMode });
        else
          try {
            m.writeFileSync(this.path, j, { mode: n(this, i, "f").configFileMode });
          } catch (T) {
            if (T?.code === "EXDEV") {
              v.writeFileSync(this.path, j, { mode: n(this, i, "f").configFileMode });
              return;
            }
            throw T;
          }
      }
      _watch() {
        this._ensureDirectory(), v.existsSync(this.path) || this._write(b()), process.platform === "win32" ? v.watch(this.path, { persistent: !1 }, g(() => {
          this.events.emit("change");
        }, { wait: 100 })) : v.watchFile(this.path, { persistent: !1 }, g(() => {
          this.events.emit("change");
        }, { wait: 5e3 }));
      }
      _migrate(C, j, T) {
        let P = this._get(x, "0.0.0");
        const q = Object.keys(C).filter((I) => this._shouldPerformMigration(I, P, j));
        let L = { ...this.store };
        for (const I of q)
          try {
            T && T(this, {
              fromVersion: P,
              toVersion: I,
              finalVersion: j,
              versions: q
            });
            const O = C[I];
            O(this), this._set(x, I), P = I, L = { ...this.store };
          } catch (O) {
            throw this.store = L, new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${O}`);
          }
        (this._isVersionInRangeFormat(P) || !w.eq(P, j)) && this._set(x, j);
      }
      _containsReservedKey(C) {
        return typeof C == "object" && Object.keys(C)[0] === U ? !0 : typeof C != "string" ? !1 : n(this, i, "f").accessPropertiesByDotNotation ? !!C.startsWith(`${U}.`) : !1;
      }
      _isVersionInRangeFormat(C) {
        return w.clean(C) === null;
      }
      _shouldPerformMigration(C, j, T) {
        return this._isVersionInRangeFormat(C) ? j !== "0.0.0" && w.satisfies(j, C) ? !1 : w.satisfies(T, C) : !(w.lte(C, j) || w.gt(C, T));
      }
      _get(C, j) {
        return l.get(this.store, C, j);
      }
      _set(C, j) {
        const { store: T } = this;
        l.set(T, C, j), this.store = T;
      }
    }
    t.default = K, e.exports = K, e.exports.default = K;
  }(We, We.exports)), We.exports;
}
var ui, rc;
function Nl() {
  if (rc) return ui;
  rc = 1;
  const e = ie, { app: t, ipcMain: o, ipcRenderer: n, shell: u } = Vc, a = Il();
  let r = !1;
  const f = () => {
    if (!o || !t)
      throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
    const s = {
      defaultCwd: t.getPath("userData"),
      appVersion: t.getVersion()
    };
    return r || (o.on("electron-store-get-data", (d) => {
      d.returnValue = s;
    }), r = !0), s;
  };
  class i extends a {
    constructor(d) {
      let v, _;
      if (n) {
        const p = n.sendSync("electron-store-get-data");
        if (!p)
          throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
        ({ defaultCwd: v, appVersion: _ } = p);
      } else o && t && ({ defaultCwd: v, appVersion: _ } = f());
      d = {
        name: "config",
        ...d
      }, d.projectVersion || (d.projectVersion = _), d.cwd ? d.cwd = e.isAbsolute(d.cwd) ? d.cwd : e.join(v, d.cwd) : d.cwd = v, d.configName = d.name, delete d.name, super(d);
    }
    static initRenderer() {
      f();
    }
    async openInEditor() {
      const d = await u.openPath(this.path);
      if (d)
        throw new Error(d);
    }
  }
  return ui = i, ui;
}
var Ol = /* @__PURE__ */ Nl();
const nc = /* @__PURE__ */ Rc(Ol);
var Ae = { exports: {} }, fi, ic;
function kc() {
  return ic || (ic = 1, fi = {
    /* The local file header */
    LOCHDR: 30,
    // LOC header size
    LOCSIG: 67324752,
    // "PK\003\004"
    LOCVER: 4,
    // version needed to extract
    LOCFLG: 6,
    // general purpose bit flag
    LOCHOW: 8,
    // compression method
    LOCTIM: 10,
    // modification time (2 bytes time, 2 bytes date)
    LOCCRC: 14,
    // uncompressed file crc-32 value
    LOCSIZ: 18,
    // compressed size
    LOCLEN: 22,
    // uncompressed size
    LOCNAM: 26,
    // filename length
    LOCEXT: 28,
    // extra field length
    /* The Data descriptor */
    EXTSIG: 134695760,
    // "PK\007\008"
    EXTHDR: 16,
    // EXT header size
    EXTCRC: 4,
    // uncompressed file crc-32 value
    EXTSIZ: 8,
    // compressed size
    EXTLEN: 12,
    // uncompressed size
    /* The central directory file header */
    CENHDR: 46,
    // CEN header size
    CENSIG: 33639248,
    // "PK\001\002"
    CENVEM: 4,
    // version made by
    CENVER: 6,
    // version needed to extract
    CENFLG: 8,
    // encrypt, decrypt flags
    CENHOW: 10,
    // compression method
    CENTIM: 12,
    // modification time (2 bytes time, 2 bytes date)
    CENCRC: 16,
    // uncompressed file crc-32 value
    CENSIZ: 20,
    // compressed size
    CENLEN: 24,
    // uncompressed size
    CENNAM: 28,
    // filename length
    CENEXT: 30,
    // extra field length
    CENCOM: 32,
    // file comment length
    CENDSK: 34,
    // volume number start
    CENATT: 36,
    // internal file attributes
    CENATX: 38,
    // external file attributes (host system dependent)
    CENOFF: 42,
    // LOC header offset
    /* The entries in the end of central directory */
    ENDHDR: 22,
    // END header size
    ENDSIG: 101010256,
    // "PK\005\006"
    ENDSUB: 8,
    // number of entries on this disk
    ENDTOT: 10,
    // total number of entries
    ENDSIZ: 12,
    // central directory size in bytes
    ENDOFF: 16,
    // offset of first CEN header
    ENDCOM: 20,
    // zip file comment length
    END64HDR: 20,
    // zip64 END header size
    END64SIG: 117853008,
    // zip64 Locator signature, "PK\006\007"
    END64START: 4,
    // number of the disk with the start of the zip64
    END64OFF: 8,
    // relative offset of the zip64 end of central directory
    END64NUMDISKS: 16,
    // total number of disks
    ZIP64SIG: 101075792,
    // zip64 signature, "PK\006\006"
    ZIP64HDR: 56,
    // zip64 record minimum size
    ZIP64LEAD: 12,
    // leading bytes at the start of the record, not counted by the value stored in ZIP64SIZE
    ZIP64SIZE: 4,
    // zip64 size of the central directory record
    ZIP64VEM: 12,
    // zip64 version made by
    ZIP64VER: 14,
    // zip64 version needed to extract
    ZIP64DSK: 16,
    // zip64 number of this disk
    ZIP64DSKDIR: 20,
    // number of the disk with the start of the record directory
    ZIP64SUB: 24,
    // number of entries on this disk
    ZIP64TOT: 32,
    // total number of entries
    ZIP64SIZB: 40,
    // zip64 central directory size in bytes
    ZIP64OFF: 48,
    // offset of start of central directory with respect to the starting disk number
    ZIP64EXTRA: 56,
    // extensible data sector
    /* Compression methods */
    STORED: 0,
    // no compression
    SHRUNK: 1,
    // shrunk
    REDUCED1: 2,
    // reduced with compression factor 1
    REDUCED2: 3,
    // reduced with compression factor 2
    REDUCED3: 4,
    // reduced with compression factor 3
    REDUCED4: 5,
    // reduced with compression factor 4
    IMPLODED: 6,
    // imploded
    // 7 reserved for Tokenizing compression algorithm
    DEFLATED: 8,
    // deflated
    ENHANCED_DEFLATED: 9,
    // enhanced deflated
    PKWARE: 10,
    // PKWare DCL imploded
    // 11 reserved by PKWARE
    BZIP2: 12,
    //  compressed using BZIP2
    // 13 reserved by PKWARE
    LZMA: 14,
    // LZMA
    // 15-17 reserved by PKWARE
    IBM_TERSE: 18,
    // compressed using IBM TERSE
    IBM_LZ77: 19,
    // IBM LZ77 z
    AES_ENCRYPT: 99,
    // WinZIP AES encryption method
    /* General purpose bit flag */
    // values can obtained with expression 2**bitnr
    FLG_ENC: 1,
    // Bit 0: encrypted file
    FLG_COMP1: 2,
    // Bit 1, compression option
    FLG_COMP2: 4,
    // Bit 2, compression option
    FLG_DESC: 8,
    // Bit 3, data descriptor
    FLG_ENH: 16,
    // Bit 4, enhanced deflating
    FLG_PATCH: 32,
    // Bit 5, indicates that the file is compressed patched data.
    FLG_STR: 64,
    // Bit 6, strong encryption (patented)
    // Bits 7-10: Currently unused.
    FLG_EFS: 2048,
    // Bit 11: Language encoding flag (EFS)
    // Bit 12: Reserved by PKWARE for enhanced compression.
    // Bit 13: encrypted the Central Directory (patented).
    // Bits 14-15: Reserved by PKWARE.
    FLG_MSK: 4096,
    // mask header values
    /* Load type */
    FILE: 2,
    BUFFER: 1,
    NONE: 0,
    /* 4.5 Extensible data fields */
    EF_ID: 0,
    EF_SIZE: 2,
    /* Header IDs */
    ID_ZIP64: 1,
    ID_AVINFO: 7,
    ID_PFS: 8,
    ID_OS2: 9,
    ID_NTFS: 10,
    ID_OPENVMS: 12,
    ID_UNIX: 13,
    ID_FORK: 14,
    ID_PATCH: 15,
    ID_X509_PKCS7: 20,
    ID_X509_CERTID_F: 21,
    ID_X509_CERTID_C: 22,
    ID_STRONGENC: 23,
    ID_RECORD_MGT: 24,
    ID_X509_PKCS7_RL: 25,
    ID_IBM1: 101,
    ID_IBM2: 102,
    ID_POSZIP: 18064,
    EF_ZIP64_OR_32: 4294967295,
    EF_ZIP64_OR_16: 65535,
    EF_ZIP64_SUNCOMP: 0,
    EF_ZIP64_SCOMP: 8,
    EF_ZIP64_RHO: 16,
    EF_ZIP64_DSN: 24
  }), fi;
}
var li = {}, sc;
function qi() {
  return sc || (sc = 1, function(e) {
    const t = {
      /* Header error messages */
      INVALID_LOC: "Invalid LOC header (bad signature)",
      INVALID_CEN: "Invalid CEN header (bad signature)",
      INVALID_END: "Invalid END header (bad signature)",
      /* Descriptor */
      DESCRIPTOR_NOT_EXIST: "No descriptor present",
      DESCRIPTOR_UNKNOWN: "Unknown descriptor format",
      DESCRIPTOR_FAULTY: "Descriptor data is malformed",
      /* ZipEntry error messages*/
      NO_DATA: "Nothing to decompress",
      BAD_CRC: "CRC32 checksum failed {0}",
      FILE_IN_THE_WAY: "There is a file in the way: {0}",
      UNKNOWN_METHOD: "Invalid/unsupported compression method",
      /* Inflater error messages */
      AVAIL_DATA: "inflate::Available inflate data did not terminate",
      INVALID_DISTANCE: "inflate::Invalid literal/length or distance code in fixed or dynamic block",
      TO_MANY_CODES: "inflate::Dynamic block code description: too many length or distance codes",
      INVALID_REPEAT_LEN: "inflate::Dynamic block code description: repeat more than specified lengths",
      INVALID_REPEAT_FIRST: "inflate::Dynamic block code description: repeat lengths with no first length",
      INCOMPLETE_CODES: "inflate::Dynamic block code description: code lengths codes incomplete",
      INVALID_DYN_DISTANCE: "inflate::Dynamic block code description: invalid distance code lengths",
      INVALID_CODES_LEN: "inflate::Dynamic block code description: invalid literal/length code lengths",
      INVALID_STORE_BLOCK: "inflate::Stored block length did not match one's complement",
      INVALID_BLOCK_TYPE: "inflate::Invalid block type (type == 3)",
      /* ADM-ZIP error messages */
      CANT_EXTRACT_FILE: "Could not extract the file",
      CANT_OVERRIDE: "Target file already exists",
      DISK_ENTRY_TOO_LARGE: "Number of disk entries is too large",
      NO_ZIP: "No zip file was loaded",
      NO_ENTRY: "Entry doesn't exist",
      DIRECTORY_CONTENT_ERROR: "A directory cannot have content",
      FILE_NOT_FOUND: 'File not found: "{0}"',
      NOT_IMPLEMENTED: "Not implemented",
      INVALID_FILENAME: "Invalid filename",
      INVALID_FORMAT: "Invalid or unsupported zip format. No END header found",
      INVALID_PASS_PARAM: "Incompatible password parameter",
      WRONG_PASSWORD: "Wrong Password",
      /* ADM-ZIP */
      COMMENT_TOO_LONG: "Comment is too long",
      // Comment can be max 65535 bytes long (NOTE: some non-US characters may take more space)
      EXTRA_FIELD_PARSE_ERROR: "Extra field parsing error"
    };
    function o(n) {
      return function(...u) {
        return u.length && (n = n.replace(/\{(\d)\}/g, (a, r) => u[r] || "")), new Error("ADM-ZIP: " + n);
      };
    }
    for (const n of Object.keys(t))
      e[n] = o(t[n]);
  }(li)), li;
}
var di, oc;
function Pl() {
  if (oc) return di;
  oc = 1;
  const e = Me, t = ie, o = kc(), n = qi(), u = typeof process == "object" && process.platform === "win32", a = (i) => typeof i == "object" && i !== null, r = new Uint32Array(256).map((i, s) => {
    for (let d = 0; d < 8; d++)
      (s & 1) !== 0 ? s = 3988292384 ^ s >>> 1 : s >>>= 1;
    return s >>> 0;
  });
  function f(i) {
    this.sep = t.sep, this.fs = e, a(i) && a(i.fs) && typeof i.fs.statSync == "function" && (this.fs = i.fs);
  }
  return di = f, f.prototype.makeDir = function(i) {
    const s = this;
    function d(v) {
      let _ = v.split(s.sep)[0];
      v.split(s.sep).forEach(function(p) {
        if (!(!p || p.substr(-1, 1) === ":")) {
          _ += s.sep + p;
          var S;
          try {
            S = s.fs.statSync(_);
          } catch {
            s.fs.mkdirSync(_);
          }
          if (S && S.isFile()) throw n.FILE_IN_THE_WAY(`"${_}"`);
        }
      });
    }
    d(i);
  }, f.prototype.writeFileTo = function(i, s, d, v) {
    const _ = this;
    if (_.fs.existsSync(i)) {
      if (!d) return !1;
      var p = _.fs.statSync(i);
      if (p.isDirectory())
        return !1;
    }
    var S = t.dirname(i);
    _.fs.existsSync(S) || _.makeDir(S);
    var $;
    try {
      $ = _.fs.openSync(i, "w", 438);
    } catch {
      _.fs.chmodSync(i, 438), $ = _.fs.openSync(i, "w", 438);
    }
    if ($)
      try {
        _.fs.writeSync($, s, 0, s.length, 0);
      } finally {
        _.fs.closeSync($);
      }
    return _.fs.chmodSync(i, v || 438), !0;
  }, f.prototype.writeFileToAsync = function(i, s, d, v, _) {
    typeof v == "function" && (_ = v, v = void 0);
    const p = this;
    p.fs.exists(i, function(S) {
      if (S && !d) return _(!1);
      p.fs.stat(i, function($, l) {
        if (S && l.isDirectory())
          return _(!1);
        var h = t.dirname(i);
        p.fs.exists(h, function(c) {
          c || p.makeDir(h), p.fs.open(i, "w", 438, function(m, E) {
            m ? p.fs.chmod(i, 438, function() {
              p.fs.open(i, "w", 438, function(y, g) {
                p.fs.write(g, s, 0, s.length, 0, function() {
                  p.fs.close(g, function() {
                    p.fs.chmod(i, v || 438, function() {
                      _(!0);
                    });
                  });
                });
              });
            }) : E ? p.fs.write(E, s, 0, s.length, 0, function() {
              p.fs.close(E, function() {
                p.fs.chmod(i, v || 438, function() {
                  _(!0);
                });
              });
            }) : p.fs.chmod(i, v || 438, function() {
              _(!0);
            });
          });
        });
      });
    });
  }, f.prototype.findFiles = function(i) {
    const s = this;
    function d(v, _, p) {
      let S = [];
      return s.fs.readdirSync(v).forEach(function($) {
        const l = t.join(v, $), h = s.fs.statSync(l);
        S.push(t.normalize(l) + (h.isDirectory() ? s.sep : "")), h.isDirectory() && p && (S = S.concat(d(l, _, p)));
      }), S;
    }
    return d(i, void 0, !0);
  }, f.prototype.findFilesAsync = function(i, s) {
    const d = this;
    let v = [];
    d.fs.readdir(i, function(_, p) {
      if (_) return s(_);
      let S = p.length;
      if (!S) return s(null, v);
      p.forEach(function($) {
        $ = t.join(i, $), d.fs.stat($, function(l, h) {
          if (l) return s(l);
          h && (v.push(t.normalize($) + (h.isDirectory() ? d.sep : "")), h.isDirectory() ? d.findFilesAsync($, function(c, m) {
            if (c) return s(c);
            v = v.concat(m), --S || s(null, v);
          }) : --S || s(null, v));
        });
      });
    });
  }, f.prototype.getAttributes = function() {
  }, f.prototype.setAttributes = function() {
  }, f.crc32update = function(i, s) {
    return r[(i ^ s) & 255] ^ i >>> 8;
  }, f.crc32 = function(i) {
    typeof i == "string" && (i = Buffer.from(i, "utf8"));
    let s = i.length, d = -1;
    for (let v = 0; v < s; ) d = f.crc32update(d, i[v++]);
    return ~d >>> 0;
  }, f.methodToString = function(i) {
    switch (i) {
      case o.STORED:
        return "STORED (" + i + ")";
      case o.DEFLATED:
        return "DEFLATED (" + i + ")";
      default:
        return "UNSUPPORTED (" + i + ")";
    }
  }, f.canonical = function(i) {
    if (!i) return "";
    const s = t.posix.normalize("/" + i.split("\\").join("/"));
    return t.join(".", s);
  }, f.zipnamefix = function(i) {
    if (!i) return "";
    const s = t.posix.normalize("/" + i.split("\\").join("/"));
    return t.posix.join(".", s);
  }, f.findLast = function(i, s) {
    if (!Array.isArray(i)) throw new TypeError("arr is not array");
    const d = i.length >>> 0;
    for (let v = d - 1; v >= 0; v--)
      if (s(i[v], v, i))
        return i[v];
  }, f.sanitize = function(i, s) {
    i = t.resolve(t.normalize(i));
    for (var d = s.split("/"), v = 0, _ = d.length; v < _; v++) {
      var p = t.normalize(t.join(i, d.slice(v, _).join(t.sep)));
      if (p.indexOf(i) === 0)
        return p;
    }
    return t.normalize(t.join(i, t.basename(s)));
  }, f.toBuffer = function(s, d) {
    return Buffer.isBuffer(s) ? s : s instanceof Uint8Array ? Buffer.from(s) : typeof s == "string" ? d(s) : Buffer.alloc(0);
  }, f.readBigUInt64LE = function(i, s) {
    var d = Buffer.from(i.slice(s, s + 8));
    return d.swap64(), parseInt(`0x${d.toString("hex")}`);
  }, f.fromDOS2Date = function(i) {
    return new Date((i >> 25 & 127) + 1980, Math.max((i >> 21 & 15) - 1, 0), Math.max(i >> 16 & 31, 1), i >> 11 & 31, i >> 5 & 63, (i & 31) << 1);
  }, f.fromDate2DOS = function(i) {
    let s = 0, d = 0;
    return i.getFullYear() > 1979 && (s = (i.getFullYear() - 1980 & 127) << 9 | i.getMonth() + 1 << 5 | i.getDate(), d = i.getHours() << 11 | i.getMinutes() << 5 | i.getSeconds() >> 1), s << 16 | d;
  }, f.isWin = u, f.crcTable = r, di;
}
var hi, ac;
function Tl() {
  if (ac) return hi;
  ac = 1;
  const e = ie;
  return hi = function(t, { fs: o }) {
    var n = t || "", u = r(), a = null;
    function r() {
      return {
        directory: !1,
        readonly: !1,
        hidden: !1,
        executable: !1,
        mtime: 0,
        atime: 0
      };
    }
    return n && o.existsSync(n) ? (a = o.statSync(n), u.directory = a.isDirectory(), u.mtime = a.mtime, u.atime = a.atime, u.executable = (73 & a.mode) !== 0, u.readonly = (128 & a.mode) === 0, u.hidden = e.basename(n)[0] === ".") : console.warn("Invalid path: " + n), {
      get directory() {
        return u.directory;
      },
      get readOnly() {
        return u.readonly;
      },
      get hidden() {
        return u.hidden;
      },
      get mtime() {
        return u.mtime;
      },
      get atime() {
        return u.atime;
      },
      get executable() {
        return u.executable;
      },
      decodeAttributes: function() {
      },
      encodeAttributes: function() {
      },
      toJSON: function() {
        return {
          path: n,
          isDirectory: u.directory,
          isReadOnly: u.readonly,
          isHidden: u.hidden,
          isExecutable: u.executable,
          mTime: u.mtime,
          aTime: u.atime
        };
      },
      toString: function() {
        return JSON.stringify(this.toJSON(), null, "	");
      }
    };
  }, hi;
}
var mi, cc;
function bl() {
  return cc || (cc = 1, mi = {
    efs: !0,
    encode: (e) => Buffer.from(e, "utf8"),
    decode: (e) => e.toString("utf8")
  }), mi;
}
var uc;
function Ye() {
  return uc || (uc = 1, Ae.exports = Pl(), Ae.exports.Constants = kc(), Ae.exports.Errors = qi(), Ae.exports.FileAttr = Tl(), Ae.exports.decoder = bl()), Ae.exports;
}
var sr = {}, pi, fc;
function Dl() {
  if (fc) return pi;
  fc = 1;
  var e = Ye(), t = e.Constants;
  return pi = function() {
    var o = 20, n = 10, u = 0, a = 0, r = 0, f = 0, i = 0, s = 0, d = 0, v = 0, _ = 0, p = 0, S = 0, $ = 0, l = 0;
    o |= e.isWin ? 2560 : 768, u |= t.FLG_EFS;
    const h = {
      extraLen: 0
    }, c = (E) => Math.max(0, E) >>> 0, m = (E) => Math.max(0, E) & 255;
    return r = e.fromDate2DOS(/* @__PURE__ */ new Date()), {
      get made() {
        return o;
      },
      set made(E) {
        o = E;
      },
      get version() {
        return n;
      },
      set version(E) {
        n = E;
      },
      get flags() {
        return u;
      },
      set flags(E) {
        u = E;
      },
      get flags_efs() {
        return (u & t.FLG_EFS) > 0;
      },
      set flags_efs(E) {
        E ? u |= t.FLG_EFS : u &= ~t.FLG_EFS;
      },
      get flags_desc() {
        return (u & t.FLG_DESC) > 0;
      },
      set flags_desc(E) {
        E ? u |= t.FLG_DESC : u &= ~t.FLG_DESC;
      },
      get method() {
        return a;
      },
      set method(E) {
        switch (E) {
          case t.STORED:
            this.version = 10;
          case t.DEFLATED:
          default:
            this.version = 20;
        }
        a = E;
      },
      get time() {
        return e.fromDOS2Date(this.timeval);
      },
      set time(E) {
        this.timeval = e.fromDate2DOS(E);
      },
      get timeval() {
        return r;
      },
      set timeval(E) {
        r = c(E);
      },
      get timeHighByte() {
        return m(r >>> 8);
      },
      get crc() {
        return f;
      },
      set crc(E) {
        f = c(E);
      },
      get compressedSize() {
        return i;
      },
      set compressedSize(E) {
        i = c(E);
      },
      get size() {
        return s;
      },
      set size(E) {
        s = c(E);
      },
      get fileNameLength() {
        return d;
      },
      set fileNameLength(E) {
        d = E;
      },
      get extraLength() {
        return v;
      },
      set extraLength(E) {
        v = E;
      },
      get extraLocalLength() {
        return h.extraLen;
      },
      set extraLocalLength(E) {
        h.extraLen = E;
      },
      get commentLength() {
        return _;
      },
      set commentLength(E) {
        _ = E;
      },
      get diskNumStart() {
        return p;
      },
      set diskNumStart(E) {
        p = c(E);
      },
      get inAttr() {
        return S;
      },
      set inAttr(E) {
        S = c(E);
      },
      get attr() {
        return $;
      },
      set attr(E) {
        $ = c(E);
      },
      // get Unix file permissions
      get fileAttr() {
        return ($ || 0) >> 16 & 4095;
      },
      get offset() {
        return l;
      },
      set offset(E) {
        l = c(E);
      },
      get encrypted() {
        return (u & t.FLG_ENC) === t.FLG_ENC;
      },
      get centralHeaderSize() {
        return t.CENHDR + d + v + _;
      },
      get realDataOffset() {
        return l + t.LOCHDR + h.fnameLen + h.extraLen;
      },
      get localHeader() {
        return h;
      },
      loadLocalHeaderFromBinary: function(E) {
        var y = E.slice(l, l + t.LOCHDR);
        if (y.readUInt32LE(0) !== t.LOCSIG)
          throw e.Errors.INVALID_LOC();
        h.version = y.readUInt16LE(t.LOCVER), h.flags = y.readUInt16LE(t.LOCFLG), h.method = y.readUInt16LE(t.LOCHOW), h.time = y.readUInt32LE(t.LOCTIM), h.crc = y.readUInt32LE(t.LOCCRC), h.compressedSize = y.readUInt32LE(t.LOCSIZ), h.size = y.readUInt32LE(t.LOCLEN), h.fnameLen = y.readUInt16LE(t.LOCNAM), h.extraLen = y.readUInt16LE(t.LOCEXT);
        const g = l + t.LOCHDR + h.fnameLen, w = g + h.extraLen;
        return E.slice(g, w);
      },
      loadFromBinary: function(E) {
        if (E.length !== t.CENHDR || E.readUInt32LE(0) !== t.CENSIG)
          throw e.Errors.INVALID_CEN();
        o = E.readUInt16LE(t.CENVEM), n = E.readUInt16LE(t.CENVER), u = E.readUInt16LE(t.CENFLG), a = E.readUInt16LE(t.CENHOW), r = E.readUInt32LE(t.CENTIM), f = E.readUInt32LE(t.CENCRC), i = E.readUInt32LE(t.CENSIZ), s = E.readUInt32LE(t.CENLEN), d = E.readUInt16LE(t.CENNAM), v = E.readUInt16LE(t.CENEXT), _ = E.readUInt16LE(t.CENCOM), p = E.readUInt16LE(t.CENDSK), S = E.readUInt16LE(t.CENATT), $ = E.readUInt32LE(t.CENATX), l = E.readUInt32LE(t.CENOFF);
      },
      localHeaderToBinary: function() {
        var E = Buffer.alloc(t.LOCHDR);
        return E.writeUInt32LE(t.LOCSIG, 0), E.writeUInt16LE(n, t.LOCVER), E.writeUInt16LE(u, t.LOCFLG), E.writeUInt16LE(a, t.LOCHOW), E.writeUInt32LE(r, t.LOCTIM), E.writeUInt32LE(f, t.LOCCRC), E.writeUInt32LE(i, t.LOCSIZ), E.writeUInt32LE(s, t.LOCLEN), E.writeUInt16LE(d, t.LOCNAM), E.writeUInt16LE(h.extraLen, t.LOCEXT), E;
      },
      centralHeaderToBinary: function() {
        var E = Buffer.alloc(t.CENHDR + d + v + _);
        return E.writeUInt32LE(t.CENSIG, 0), E.writeUInt16LE(o, t.CENVEM), E.writeUInt16LE(n, t.CENVER), E.writeUInt16LE(u, t.CENFLG), E.writeUInt16LE(a, t.CENHOW), E.writeUInt32LE(r, t.CENTIM), E.writeUInt32LE(f, t.CENCRC), E.writeUInt32LE(i, t.CENSIZ), E.writeUInt32LE(s, t.CENLEN), E.writeUInt16LE(d, t.CENNAM), E.writeUInt16LE(v, t.CENEXT), E.writeUInt16LE(_, t.CENCOM), E.writeUInt16LE(p, t.CENDSK), E.writeUInt16LE(S, t.CENATT), E.writeUInt32LE($, t.CENATX), E.writeUInt32LE(l, t.CENOFF), E;
      },
      toJSON: function() {
        const E = function(y) {
          return y + " bytes";
        };
        return {
          made: o,
          version: n,
          flags: u,
          method: e.methodToString(a),
          time: this.time,
          crc: "0x" + f.toString(16).toUpperCase(),
          compressedSize: E(i),
          size: E(s),
          fileNameLength: E(d),
          extraLength: E(v),
          commentLength: E(_),
          diskNumStart: p,
          inAttr: S,
          attr: $,
          offset: l,
          centralHeaderSize: E(t.CENHDR + d + v + _)
        };
      },
      toString: function() {
        return JSON.stringify(this.toJSON(), null, "	");
      }
    };
  }, pi;
}
var yi, lc;
function Cl() {
  if (lc) return yi;
  lc = 1;
  var e = Ye(), t = e.Constants;
  return yi = function() {
    var o = 0, n = 0, u = 0, a = 0, r = 0;
    return {
      get diskEntries() {
        return o;
      },
      set diskEntries(f) {
        o = n = f;
      },
      get totalEntries() {
        return n;
      },
      set totalEntries(f) {
        n = o = f;
      },
      get size() {
        return u;
      },
      set size(f) {
        u = f;
      },
      get offset() {
        return a;
      },
      set offset(f) {
        a = f;
      },
      get commentLength() {
        return r;
      },
      set commentLength(f) {
        r = f;
      },
      get mainHeaderSize() {
        return t.ENDHDR + r;
      },
      loadFromBinary: function(f) {
        if ((f.length !== t.ENDHDR || f.readUInt32LE(0) !== t.ENDSIG) && (f.length < t.ZIP64HDR || f.readUInt32LE(0) !== t.ZIP64SIG))
          throw e.Errors.INVALID_END();
        f.readUInt32LE(0) === t.ENDSIG ? (o = f.readUInt16LE(t.ENDSUB), n = f.readUInt16LE(t.ENDTOT), u = f.readUInt32LE(t.ENDSIZ), a = f.readUInt32LE(t.ENDOFF), r = f.readUInt16LE(t.ENDCOM)) : (o = e.readBigUInt64LE(f, t.ZIP64SUB), n = e.readBigUInt64LE(f, t.ZIP64TOT), u = e.readBigUInt64LE(f, t.ZIP64SIZE), a = e.readBigUInt64LE(f, t.ZIP64OFF), r = 0);
      },
      toBinary: function() {
        var f = Buffer.alloc(t.ENDHDR + r);
        return f.writeUInt32LE(t.ENDSIG, 0), f.writeUInt32LE(0, 4), f.writeUInt16LE(o, t.ENDSUB), f.writeUInt16LE(n, t.ENDTOT), f.writeUInt32LE(u, t.ENDSIZ), f.writeUInt32LE(a, t.ENDOFF), f.writeUInt16LE(r, t.ENDCOM), f.fill(" ", t.ENDHDR), f;
      },
      toJSON: function() {
        const f = function(i, s) {
          let d = i.toString(16).toUpperCase();
          for (; d.length < s; ) d = "0" + d;
          return "0x" + d;
        };
        return {
          diskEntries: o,
          totalEntries: n,
          size: u + " bytes",
          offset: f(a, 4),
          commentLength: r
        };
      },
      toString: function() {
        return JSON.stringify(this.toJSON(), null, "	");
      }
    };
  }, yi;
}
var dc;
function Mc() {
  return dc || (dc = 1, sr.EntryHeader = Dl(), sr.MainHeader = Cl()), sr;
}
var Ke = {}, Ei, hc;
function Ll() {
  return hc || (hc = 1, Ei = function(e) {
    var t = $c, o = { chunkSize: (parseInt(e.length / 1024) + 1) * 1024 };
    return {
      deflate: function() {
        return t.deflateRawSync(e, o);
      },
      deflateAsync: function(n) {
        var u = t.createDeflateRaw(o), a = [], r = 0;
        u.on("data", function(f) {
          a.push(f), r += f.length;
        }), u.on("end", function() {
          var f = Buffer.alloc(r), i = 0;
          f.fill(0);
          for (var s = 0; s < a.length; s++) {
            var d = a[s];
            d.copy(f, i), i += d.length;
          }
          n && n(f);
        }), u.end(e);
      }
    };
  }), Ei;
}
var vi, mc;
function Al() {
  if (mc) return vi;
  mc = 1;
  const e = +(process.versions ? process.versions.node : "").split(".")[0] || 0;
  return vi = function(t, o) {
    var n = $c;
    const u = e >= 15 && o > 0 ? { maxOutputLength: o } : {};
    return {
      inflate: function() {
        return n.inflateRawSync(t, u);
      },
      inflateAsync: function(a) {
        var r = n.createInflateRaw(u), f = [], i = 0;
        r.on("data", function(s) {
          f.push(s), i += s.length;
        }), r.on("end", function() {
          var s = Buffer.alloc(i), d = 0;
          s.fill(0);
          for (var v = 0; v < f.length; v++) {
            var _ = f[v];
            _.copy(s, d), d += _.length;
          }
          a && a(s);
        }), r.end(t);
      }
    };
  }, vi;
}
var gi, pc;
function Fl() {
  if (pc) return gi;
  pc = 1;
  const { randomFillSync: e } = Sc, t = qi(), o = new Uint32Array(256).map((p, S) => {
    for (let $ = 0; $ < 8; $++)
      (S & 1) !== 0 ? S = S >>> 1 ^ 3988292384 : S >>>= 1;
    return S >>> 0;
  }), n = (p, S) => Math.imul(p, S) >>> 0, u = (p, S) => o[(p ^ S) & 255] ^ p >>> 8, a = () => typeof e == "function" ? e(Buffer.alloc(12)) : a.node();
  a.node = () => {
    const p = Buffer.alloc(12), S = p.length;
    for (let $ = 0; $ < S; $++) p[$] = Math.random() * 256 & 255;
    return p;
  };
  const r = {
    genSalt: a
  };
  function f(p) {
    const S = Buffer.isBuffer(p) ? p : Buffer.from(p);
    this.keys = new Uint32Array([305419896, 591751049, 878082192]);
    for (let $ = 0; $ < S.length; $++)
      this.updateKeys(S[$]);
  }
  f.prototype.updateKeys = function(p) {
    const S = this.keys;
    return S[0] = u(S[0], p), S[1] += S[0] & 255, S[1] = n(S[1], 134775813) + 1, S[2] = u(S[2], S[1] >>> 24), p;
  }, f.prototype.next = function() {
    const p = (this.keys[2] | 2) >>> 0;
    return n(p, p ^ 1) >> 8 & 255;
  };
  function i(p) {
    const S = new f(p);
    return function($) {
      const l = Buffer.alloc($.length);
      let h = 0;
      for (let c of $)
        l[h++] = S.updateKeys(c ^ S.next());
      return l;
    };
  }
  function s(p) {
    const S = new f(p);
    return function($, l, h = 0) {
      l || (l = Buffer.alloc($.length));
      for (let c of $) {
        const m = S.next();
        l[h++] = c ^ m, S.updateKeys(c);
      }
      return l;
    };
  }
  function d(p, S, $) {
    if (!p || !Buffer.isBuffer(p) || p.length < 12)
      return Buffer.alloc(0);
    const l = i($), h = l(p.slice(0, 12)), c = (S.flags & 8) === 8 ? S.timeHighByte : S.crc >>> 24;
    if (h[11] !== c)
      throw t.WRONG_PASSWORD();
    return l(p.slice(12));
  }
  function v(p) {
    Buffer.isBuffer(p) && p.length >= 12 ? r.genSalt = function() {
      return p.slice(0, 12);
    } : p === "node" ? r.genSalt = a.node : r.genSalt = a;
  }
  function _(p, S, $, l = !1) {
    p == null && (p = Buffer.alloc(0)), Buffer.isBuffer(p) || (p = Buffer.from(p.toString()));
    const h = s($), c = r.genSalt();
    c[11] = S.crc >>> 24 & 255, l && (c[10] = S.crc >>> 16 & 255);
    const m = Buffer.alloc(p.length + 12);
    return h(c, m), h(p, m, 12);
  }
  return gi = { decrypt: d, encrypt: _, _salter: v }, gi;
}
var yc;
function ql() {
  return yc || (yc = 1, Ke.Deflater = Ll(), Ke.Inflater = Al(), Ke.ZipCrypto = Fl()), Ke;
}
var _i, Ec;
function Uc() {
  if (Ec) return _i;
  Ec = 1;
  var e = Ye(), t = Mc(), o = e.Constants, n = ql();
  return _i = function(u, a) {
    var r = new t.EntryHeader(), f = Buffer.alloc(0), i = Buffer.alloc(0), s = !1, d = null, v = Buffer.alloc(0), _ = Buffer.alloc(0), p = !0;
    const S = u, $ = typeof S.decoder == "object" ? S.decoder : e.decoder;
    p = $.hasOwnProperty("efs") ? $.efs : !1;
    function l() {
      return !a || !(a instanceof Uint8Array) ? Buffer.alloc(0) : (_ = r.loadLocalHeaderFromBinary(a), a.slice(r.realDataOffset, r.realDataOffset + r.compressedSize));
    }
    function h(w) {
      if (r.flags_desc) {
        const R = {}, N = r.realDataOffset + r.compressedSize;
        if (a.readUInt32LE(N) == o.LOCSIG || a.readUInt32LE(N) == o.CENSIG)
          throw e.Errors.DESCRIPTOR_NOT_EXIST();
        if (a.readUInt32LE(N) == o.EXTSIG)
          R.crc = a.readUInt32LE(N + o.EXTCRC), R.compressedSize = a.readUInt32LE(N + o.EXTSIZ), R.size = a.readUInt32LE(N + o.EXTLEN);
        else if (a.readUInt16LE(N + 12) === 19280)
          R.crc = a.readUInt32LE(N + o.EXTCRC - 4), R.compressedSize = a.readUInt32LE(N + o.EXTSIZ - 4), R.size = a.readUInt32LE(N + o.EXTLEN - 4);
        else
          throw e.Errors.DESCRIPTOR_UNKNOWN();
        if (R.compressedSize !== r.compressedSize || R.size !== r.size || R.crc !== r.crc)
          throw e.Errors.DESCRIPTOR_FAULTY();
        if (e.crc32(w) !== R.crc)
          return !1;
      } else if (e.crc32(w) !== r.localHeader.crc)
        return !1;
      return !0;
    }
    function c(w, R, N) {
      if (typeof R > "u" && typeof w == "string" && (N = w, w = void 0), s)
        return w && R && R(Buffer.alloc(0), e.Errors.DIRECTORY_CONTENT_ERROR()), Buffer.alloc(0);
      var b = l();
      if (b.length === 0)
        return w && R && R(b), b;
      if (r.encrypted) {
        if (typeof N != "string" && !Buffer.isBuffer(N))
          throw e.Errors.INVALID_PASS_PARAM();
        b = n.ZipCrypto.decrypt(b, r, N);
      }
      var M = Buffer.alloc(r.size);
      switch (r.method) {
        case e.Constants.STORED:
          if (b.copy(M), h(M))
            return w && R && R(M), M;
          throw w && R && R(M, e.Errors.BAD_CRC()), e.Errors.BAD_CRC();
        case e.Constants.DEFLATED:
          var G = new n.Inflater(b, r.size);
          if (w)
            G.inflateAsync(function(k) {
              k.copy(k, 0), R && (h(k) ? R(k) : R(k, e.Errors.BAD_CRC()));
            });
          else {
            if (G.inflate(M).copy(M, 0), !h(M))
              throw e.Errors.BAD_CRC(`"${$.decode(f)}"`);
            return M;
          }
          break;
        default:
          throw w && R && R(Buffer.alloc(0), e.Errors.UNKNOWN_METHOD()), e.Errors.UNKNOWN_METHOD();
      }
    }
    function m(w, R) {
      if ((!d || !d.length) && Buffer.isBuffer(a))
        return w && R && R(l()), l();
      if (d.length && !s) {
        var N;
        switch (r.method) {
          case e.Constants.STORED:
            return r.compressedSize = r.size, N = Buffer.alloc(d.length), d.copy(N), w && R && R(N), N;
          default:
          case e.Constants.DEFLATED:
            var b = new n.Deflater(d);
            if (w)
              b.deflateAsync(function(G) {
                N = Buffer.alloc(G.length), r.compressedSize = G.length, G.copy(N), R && R(N);
              });
            else {
              var M = b.deflate();
              return r.compressedSize = M.length, M;
            }
            b = null;
            break;
        }
      } else if (w && R)
        R(Buffer.alloc(0));
      else
        return Buffer.alloc(0);
    }
    function E(w, R) {
      return (w.readUInt32LE(R + 4) << 4) + w.readUInt32LE(R);
    }
    function y(w) {
      try {
        for (var R = 0, N, b, M; R + 4 < w.length; )
          N = w.readUInt16LE(R), R += 2, b = w.readUInt16LE(R), R += 2, M = w.slice(R, R + b), R += b, o.ID_ZIP64 === N && g(M);
      } catch {
        throw e.Errors.EXTRA_FIELD_PARSE_ERROR();
      }
    }
    function g(w) {
      var R, N, b, M;
      w.length >= o.EF_ZIP64_SCOMP && (R = E(w, o.EF_ZIP64_SUNCOMP), r.size === o.EF_ZIP64_OR_32 && (r.size = R)), w.length >= o.EF_ZIP64_RHO && (N = E(w, o.EF_ZIP64_SCOMP), r.compressedSize === o.EF_ZIP64_OR_32 && (r.compressedSize = N)), w.length >= o.EF_ZIP64_DSN && (b = E(w, o.EF_ZIP64_RHO), r.offset === o.EF_ZIP64_OR_32 && (r.offset = b)), w.length >= o.EF_ZIP64_DSN + 4 && (M = w.readUInt32LE(o.EF_ZIP64_DSN), r.diskNumStart === o.EF_ZIP64_OR_16 && (r.diskNumStart = M));
    }
    return {
      get entryName() {
        return $.decode(f);
      },
      get rawEntryName() {
        return f;
      },
      set entryName(w) {
        f = e.toBuffer(w, $.encode);
        var R = f[f.length - 1];
        s = R === 47 || R === 92, r.fileNameLength = f.length;
      },
      get efs() {
        return typeof p == "function" ? p(this.entryName) : p;
      },
      get extra() {
        return v;
      },
      set extra(w) {
        v = w, r.extraLength = w.length, y(w);
      },
      get comment() {
        return $.decode(i);
      },
      set comment(w) {
        if (i = e.toBuffer(w, $.encode), r.commentLength = i.length, i.length > 65535) throw e.Errors.COMMENT_TOO_LONG();
      },
      get name() {
        var w = $.decode(f);
        return s ? w.substr(w.length - 1).split("/").pop() : w.split("/").pop();
      },
      get isDirectory() {
        return s;
      },
      getCompressedData: function() {
        return m(!1, null);
      },
      getCompressedDataAsync: function(w) {
        m(!0, w);
      },
      setData: function(w) {
        d = e.toBuffer(w, e.decoder.encode), !s && d.length ? (r.size = d.length, r.method = e.Constants.DEFLATED, r.crc = e.crc32(w), r.changed = !0) : r.method = e.Constants.STORED;
      },
      getData: function(w) {
        return r.changed ? d : c(!1, null, w);
      },
      getDataAsync: function(w, R) {
        r.changed ? w(d) : c(!0, w, R);
      },
      set attr(w) {
        r.attr = w;
      },
      get attr() {
        return r.attr;
      },
      set header(w) {
        r.loadFromBinary(w);
      },
      get header() {
        return r;
      },
      packCentralHeader: function() {
        r.flags_efs = this.efs, r.extraLength = v.length;
        var w = r.centralHeaderToBinary(), R = e.Constants.CENHDR;
        return f.copy(w, R), R += f.length, v.copy(w, R), R += r.extraLength, i.copy(w, R), w;
      },
      packLocalHeader: function() {
        let w = 0;
        r.flags_efs = this.efs, r.extraLocalLength = _.length;
        const R = r.localHeaderToBinary(), N = Buffer.alloc(R.length + f.length + r.extraLocalLength);
        return R.copy(N, w), w += R.length, f.copy(N, w), w += f.length, _.copy(N, w), w += _.length, N;
      },
      toJSON: function() {
        const w = function(R) {
          return "<" + (R && R.length + " bytes buffer" || "null") + ">";
        };
        return {
          entryName: this.entryName,
          name: this.name,
          comment: this.comment,
          isDirectory: this.isDirectory,
          header: r.toJSON(),
          compressedData: w(a),
          data: w(d)
        };
      },
      toString: function() {
        return JSON.stringify(this.toJSON(), null, "	");
      }
    };
  }, _i;
}
var wi, vc;
function jl() {
  if (vc) return wi;
  vc = 1;
  const e = Uc(), t = Mc(), o = Ye();
  return wi = function(n, u) {
    var a = [], r = {}, f = Buffer.alloc(0), i = new t.MainHeader(), s = !1;
    const d = /* @__PURE__ */ new Set(), v = u, { noSort: _, decoder: p } = v;
    n ? l(v.readEntries) : s = !0;
    function S() {
      const c = /* @__PURE__ */ new Set();
      for (const m of Object.keys(r)) {
        const E = m.split("/");
        if (E.pop(), !!E.length)
          for (let y = 0; y < E.length; y++) {
            const g = E.slice(0, y + 1).join("/") + "/";
            c.add(g);
          }
      }
      for (const m of c)
        if (!(m in r)) {
          const E = new e(v);
          E.entryName = m, E.attr = 16, E.temporary = !0, a.push(E), r[E.entryName] = E, d.add(E);
        }
    }
    function $() {
      if (s = !0, r = {}, i.diskEntries > (n.length - i.offset) / o.Constants.CENHDR)
        throw o.Errors.DISK_ENTRY_TOO_LARGE();
      a = new Array(i.diskEntries);
      for (var c = i.offset, m = 0; m < a.length; m++) {
        var E = c, y = new e(v, n);
        y.header = n.slice(E, E += o.Constants.CENHDR), y.entryName = n.slice(E, E += y.header.fileNameLength), y.header.extraLength && (y.extra = n.slice(E, E += y.header.extraLength)), y.header.commentLength && (y.comment = n.slice(E, E + y.header.commentLength)), c += y.header.centralHeaderSize, a[m] = y, r[y.entryName] = y;
      }
      d.clear(), S();
    }
    function l(c) {
      var m = n.length - o.Constants.ENDHDR, E = Math.max(0, m - 65535), y = E, g = n.length, w = -1, R = 0;
      for ((typeof v.trailingSpace == "boolean" ? v.trailingSpace : !1) && (E = 0), m; m >= y; m--)
        if (n[m] === 80) {
          if (n.readUInt32LE(m) === o.Constants.ENDSIG) {
            w = m, R = m, g = m + o.Constants.ENDHDR, y = m - o.Constants.END64HDR;
            continue;
          }
          if (n.readUInt32LE(m) === o.Constants.END64SIG) {
            y = E;
            continue;
          }
          if (n.readUInt32LE(m) === o.Constants.ZIP64SIG) {
            w = m, g = m + o.readBigUInt64LE(n, m + o.Constants.ZIP64SIZE) + o.Constants.ZIP64LEAD;
            break;
          }
        }
      if (w == -1) throw o.Errors.INVALID_FORMAT();
      i.loadFromBinary(n.slice(w, g)), i.commentLength && (f = n.slice(R + o.Constants.ENDHDR)), c && $();
    }
    function h() {
      a.length > 1 && !_ && a.sort((c, m) => c.entryName.toLowerCase().localeCompare(m.entryName.toLowerCase()));
    }
    return {
      /**
       * Returns an array of ZipEntry objects existent in the current opened archive
       * @return Array
       */
      get entries() {
        return s || $(), a.filter((c) => !d.has(c));
      },
      /**
       * Archive comment
       * @return {String}
       */
      get comment() {
        return p.decode(f);
      },
      set comment(c) {
        f = o.toBuffer(c, p.encode), i.commentLength = f.length;
      },
      getEntryCount: function() {
        return s ? a.length : i.diskEntries;
      },
      forEach: function(c) {
        this.entries.forEach(c);
      },
      /**
       * Returns a reference to the entry with the given name or null if entry is inexistent
       *
       * @param entryName
       * @return ZipEntry
       */
      getEntry: function(c) {
        return s || $(), r[c] || null;
      },
      /**
       * Adds the given entry to the entry list
       *
       * @param entry
       */
      setEntry: function(c) {
        s || $(), a.push(c), r[c.entryName] = c, i.totalEntries = a.length;
      },
      /**
       * Removes the file with the given name from the entry list.
       *
       * If the entry is a directory, then all nested files and directories will be removed
       * @param entryName
       * @returns {void}
       */
      deleteFile: function(c, m = !0) {
        s || $();
        const E = r[c];
        this.getEntryChildren(E, m).map((g) => g.entryName).forEach(this.deleteEntry);
      },
      /**
       * Removes the entry with the given name from the entry list.
       *
       * @param {string} entryName
       * @returns {void}
       */
      deleteEntry: function(c) {
        s || $();
        const m = r[c], E = a.indexOf(m);
        E >= 0 && (a.splice(E, 1), delete r[c], i.totalEntries = a.length);
      },
      /**
       *  Iterates and returns all nested files and directories of the given entry
       *
       * @param entry
       * @return Array
       */
      getEntryChildren: function(c, m = !0) {
        if (s || $(), typeof c == "object")
          if (c.isDirectory && m) {
            const E = [], y = c.entryName;
            for (const g of a)
              g.entryName.startsWith(y) && E.push(g);
            return E;
          } else
            return [c];
        return [];
      },
      /**
       *  How many child elements entry has
       *
       * @param {ZipEntry} entry
       * @return {integer}
       */
      getChildCount: function(c) {
        if (c && c.isDirectory) {
          const m = this.getEntryChildren(c);
          return m.includes(c) ? m.length - 1 : m.length;
        }
        return 0;
      },
      /**
       * Returns the zip file
       *
       * @return Buffer
       */
      compressToBuffer: function() {
        s || $(), h();
        const c = [], m = [];
        let E = 0, y = 0;
        i.size = 0, i.offset = 0;
        let g = 0;
        for (const N of this.entries) {
          const b = N.getCompressedData();
          N.header.offset = y;
          const M = N.packLocalHeader(), G = M.length + b.length;
          y += G, c.push(M), c.push(b);
          const k = N.packCentralHeader();
          m.push(k), i.size += k.length, E += G + k.length, g++;
        }
        E += i.mainHeaderSize, i.offset = y, i.totalEntries = g, y = 0;
        const w = Buffer.alloc(E);
        for (const N of c)
          N.copy(w, y), y += N.length;
        for (const N of m)
          N.copy(w, y), y += N.length;
        const R = i.toBinary();
        return f && f.copy(R, o.Constants.ENDHDR), R.copy(w, y), n = w, s = !1, w;
      },
      toAsyncBuffer: function(c, m, E, y) {
        try {
          s || $(), h();
          const g = [], w = [];
          let R = 0, N = 0, b = 0;
          i.size = 0, i.offset = 0;
          const M = function(G) {
            if (G.length > 0) {
              const k = G.shift(), U = k.entryName + k.extra.toString();
              E && E(U), k.getCompressedDataAsync(function(x) {
                y && y(U), k.header.offset = N;
                const K = k.packLocalHeader(), V = K.length + x.length;
                N += V, g.push(K), g.push(x);
                const C = k.packCentralHeader();
                w.push(C), i.size += C.length, R += V + C.length, b++, M(G);
              });
            } else {
              R += i.mainHeaderSize, i.offset = N, i.totalEntries = b, N = 0;
              const k = Buffer.alloc(R);
              g.forEach(function(x) {
                x.copy(k, N), N += x.length;
              }), w.forEach(function(x) {
                x.copy(k, N), N += x.length;
              });
              const U = i.toBinary();
              f && f.copy(U, o.Constants.ENDHDR), U.copy(k, N), n = k, s = !1, c(k);
            }
          };
          M(Array.from(this.entries));
        } catch (g) {
          m(g);
        }
      }
    };
  }, wi;
}
var Si, gc;
function kl() {
  if (gc) return Si;
  gc = 1;
  const e = Ye(), t = ie, o = Uc(), n = jl(), u = (...i) => e.findLast(i, (s) => typeof s == "boolean"), a = (...i) => e.findLast(i, (s) => typeof s == "string"), r = (...i) => e.findLast(i, (s) => typeof s == "function"), f = {
    // option "noSort" : if true it disables files sorting
    noSort: !1,
    // read entries during load (initial loading may be slower)
    readEntries: !1,
    // default method is none
    method: e.Constants.NONE,
    // file system
    fs: null
  };
  return Si = function(i, s) {
    let d = null;
    const v = Object.assign(/* @__PURE__ */ Object.create(null), f);
    i && typeof i == "object" && (i instanceof Uint8Array || (Object.assign(v, i), i = v.input ? v.input : void 0, v.input && delete v.input), Buffer.isBuffer(i) && (d = i, v.method = e.Constants.BUFFER, i = void 0)), Object.assign(v, s);
    const _ = new e(v);
    if ((typeof v.decoder != "object" || typeof v.decoder.encode != "function" || typeof v.decoder.decode != "function") && (v.decoder = e.decoder), i && typeof i == "string")
      if (_.fs.existsSync(i))
        v.method = e.Constants.FILE, v.filename = i, d = _.fs.readFileSync(i);
      else
        throw e.Errors.INVALID_FILENAME();
    const p = new n(d, v), { canonical: S, sanitize: $, zipnamefix: l } = e;
    function h(y) {
      if (y && p) {
        var g;
        if (typeof y == "string" && (g = p.getEntry(t.posix.normalize(y))), typeof y == "object" && typeof y.entryName < "u" && typeof y.header < "u" && (g = p.getEntry(y.entryName)), g)
          return g;
      }
      return null;
    }
    function c(y) {
      const { join: g, normalize: w, sep: R } = t.posix;
      return g(".", w(R + y.split("\\").join(R) + R));
    }
    function m(y) {
      return y instanceof RegExp ? /* @__PURE__ */ function(g) {
        return function(w) {
          return g.test(w);
        };
      }(y) : typeof y != "function" ? () => !0 : y;
    }
    const E = (y, g) => {
      let w = g.slice(-1);
      return w = w === _.sep ? _.sep : "", t.relative(y, g) + w;
    };
    return {
      /**
       * Extracts the given entry from the archive and returns the content as a Buffer object
       * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
       * @param {Buffer|string} [pass] - password
       * @return Buffer or Null in case of error
       */
      readFile: function(y, g) {
        var w = h(y);
        return w && w.getData(g) || null;
      },
      /**
       * Returns how many child elements has on entry (directories) on files it is always 0
       * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
       * @returns {integer}
       */
      childCount: function(y) {
        const g = h(y);
        if (g)
          return p.getChildCount(g);
      },
      /**
       * Asynchronous readFile
       * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
       * @param {callback} callback
       *
       * @return Buffer or Null in case of error
       */
      readFileAsync: function(y, g) {
        var w = h(y);
        w ? w.getDataAsync(g) : g(null, "getEntry failed for:" + y);
      },
      /**
       * Extracts the given entry from the archive and returns the content as plain text in the given encoding
       * @param {ZipEntry|string} entry - ZipEntry object or String with the full path of the entry
       * @param {string} encoding - Optional. If no encoding is specified utf8 is used
       *
       * @return String
       */
      readAsText: function(y, g) {
        var w = h(y);
        if (w) {
          var R = w.getData();
          if (R && R.length)
            return R.toString(g || "utf8");
        }
        return "";
      },
      /**
       * Asynchronous readAsText
       * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
       * @param {callback} callback
       * @param {string} [encoding] - Optional. If no encoding is specified utf8 is used
       *
       * @return String
       */
      readAsTextAsync: function(y, g, w) {
        var R = h(y);
        R ? R.getDataAsync(function(N, b) {
          if (b) {
            g(N, b);
            return;
          }
          N && N.length ? g(N.toString(w || "utf8")) : g("");
        }) : g("");
      },
      /**
       * Remove the entry from the file or the entry and all it's nested directories and files if the given entry is a directory
       *
       * @param {ZipEntry|string} entry
       * @returns {void}
       */
      deleteFile: function(y, g = !0) {
        var w = h(y);
        w && p.deleteFile(w.entryName, g);
      },
      /**
       * Remove the entry from the file or directory without affecting any nested entries
       *
       * @param {ZipEntry|string} entry
       * @returns {void}
       */
      deleteEntry: function(y) {
        var g = h(y);
        g && p.deleteEntry(g.entryName);
      },
      /**
       * Adds a comment to the zip. The zip must be rewritten after adding the comment.
       *
       * @param {string} comment
       */
      addZipComment: function(y) {
        p.comment = y;
      },
      /**
       * Returns the zip comment
       *
       * @return String
       */
      getZipComment: function() {
        return p.comment || "";
      },
      /**
       * Adds a comment to a specified zipEntry. The zip must be rewritten after adding the comment
       * The comment cannot exceed 65535 characters in length
       *
       * @param {ZipEntry} entry
       * @param {string} comment
       */
      addZipEntryComment: function(y, g) {
        var w = h(y);
        w && (w.comment = g);
      },
      /**
       * Returns the comment of the specified entry
       *
       * @param {ZipEntry} entry
       * @return String
       */
      getZipEntryComment: function(y) {
        var g = h(y);
        return g && g.comment || "";
      },
      /**
       * Updates the content of an existing entry inside the archive. The zip must be rewritten after updating the content
       *
       * @param {ZipEntry} entry
       * @param {Buffer} content
       */
      updateFile: function(y, g) {
        var w = h(y);
        w && w.setData(g);
      },
      /**
       * Adds a file from the disk to the archive
       *
       * @param {string} localPath File to add to zip
       * @param {string} [zipPath] Optional path inside the zip
       * @param {string} [zipName] Optional name for the file
       * @param {string} [comment] Optional file comment
       */
      addLocalFile: function(y, g, w, R) {
        if (_.fs.existsSync(y)) {
          g = g ? c(g) : "";
          const N = t.win32.basename(t.win32.normalize(y));
          g += w || N;
          const b = _.fs.statSync(y), M = b.isFile() ? _.fs.readFileSync(y) : Buffer.alloc(0);
          b.isDirectory() && (g += _.sep), this.addFile(g, M, R, b);
        } else
          throw e.Errors.FILE_NOT_FOUND(y);
      },
      /**
       * Callback for showing if everything was done.
       *
       * @callback doneCallback
       * @param {Error} err - Error object
       * @param {boolean} done - was request fully completed
       */
      /**
       * Adds a file from the disk to the archive
       *
       * @param {(object|string)} options - options object, if it is string it us used as localPath.
       * @param {string} options.localPath - Local path to the file.
       * @param {string} [options.comment] - Optional file comment.
       * @param {string} [options.zipPath] - Optional path inside the zip
       * @param {string} [options.zipName] - Optional name for the file
       * @param {doneCallback} callback - The callback that handles the response.
       */
      addLocalFileAsync: function(y, g) {
        y = typeof y == "object" ? y : { localPath: y };
        const w = t.resolve(y.localPath), { comment: R } = y;
        let { zipPath: N, zipName: b } = y;
        const M = this;
        _.fs.stat(w, function(G, k) {
          if (G) return g(G, !1);
          N = N ? c(N) : "";
          const U = t.win32.basename(t.win32.normalize(w));
          if (N += b || U, k.isFile())
            _.fs.readFile(w, function(x, K) {
              return x ? g(x, !1) : (M.addFile(N, K, R, k), setImmediate(g, void 0, !0));
            });
          else if (k.isDirectory())
            return N += _.sep, M.addFile(N, Buffer.alloc(0), R, k), setImmediate(g, void 0, !0);
        });
      },
      /**
       * Adds a local directory and all its nested files and directories to the archive
       *
       * @param {string} localPath - local path to the folder
       * @param {string} [zipPath] - optional path inside zip
       * @param {(RegExp|function)} [filter] - optional RegExp or Function if files match will be included.
       */
      addLocalFolder: function(y, g, w) {
        if (w = m(w), g = g ? c(g) : "", y = t.normalize(y), _.fs.existsSync(y)) {
          const R = _.findFiles(y), N = this;
          if (R.length)
            for (const b of R) {
              const M = t.join(g, E(y, b));
              w(M) && N.addLocalFile(b, t.dirname(M));
            }
        } else
          throw e.Errors.FILE_NOT_FOUND(y);
      },
      /**
       * Asynchronous addLocalFolder
       * @param {string} localPath
       * @param {callback} callback
       * @param {string} [zipPath] optional path inside zip
       * @param {RegExp|function} [filter] optional RegExp or Function if files match will
       *               be included.
       */
      addLocalFolderAsync: function(y, g, w, R) {
        R = m(R), w = w ? c(w) : "", y = t.normalize(y);
        var N = this;
        _.fs.open(y, "r", function(b) {
          if (b && b.code === "ENOENT")
            g(void 0, e.Errors.FILE_NOT_FOUND(y));
          else if (b)
            g(void 0, b);
          else {
            var M = _.findFiles(y), G = -1, k = function() {
              if (G += 1, G < M.length) {
                var U = M[G], x = E(y, U).split("\\").join("/");
                x = x.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, ""), R(x) ? _.fs.stat(U, function(K, V) {
                  K && g(void 0, K), V.isFile() ? _.fs.readFile(U, function(C, j) {
                    C ? g(void 0, C) : (N.addFile(w + x, j, "", V), k());
                  }) : (N.addFile(w + x + "/", Buffer.alloc(0), "", V), k());
                }) : process.nextTick(() => {
                  k();
                });
              } else
                g(!0, void 0);
            };
            k();
          }
        });
      },
      /**
       * Adds a local directory and all its nested files and directories to the archive
       *
       * @param {object | string} options - options object, if it is string it us used as localPath.
       * @param {string} options.localPath - Local path to the folder.
       * @param {string} [options.zipPath] - optional path inside zip.
       * @param {RegExp|function} [options.filter] - optional RegExp or Function if files match will be included.
       * @param {function|string} [options.namefix] - optional function to help fix filename
       * @param {doneCallback} callback - The callback that handles the response.
       *
       */
      addLocalFolderAsync2: function(y, g) {
        const w = this;
        y = typeof y == "object" ? y : { localPath: y }, localPath = t.resolve(c(y.localPath));
        let { zipPath: R, filter: N, namefix: b } = y;
        N instanceof RegExp ? N = /* @__PURE__ */ function(k) {
          return function(U) {
            return k.test(U);
          };
        }(N) : typeof N != "function" && (N = function() {
          return !0;
        }), R = R ? c(R) : "", b == "latin1" && (b = (k) => k.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, "")), typeof b != "function" && (b = (k) => k);
        const M = (k) => t.join(R, b(E(localPath, k))), G = (k) => t.win32.basename(t.win32.normalize(b(k)));
        _.fs.open(localPath, "r", function(k) {
          k && k.code === "ENOENT" ? g(void 0, e.Errors.FILE_NOT_FOUND(localPath)) : k ? g(void 0, k) : _.findFilesAsync(localPath, function(U, x) {
            if (U) return g(U);
            x = x.filter((K) => N(M(K))), x.length || g(void 0, !1), setImmediate(
              x.reverse().reduce(function(K, V) {
                return function(C, j) {
                  if (C || j === !1) return setImmediate(K, C, !1);
                  w.addLocalFileAsync(
                    {
                      localPath: V,
                      zipPath: t.dirname(M(V)),
                      zipName: G(V)
                    },
                    K
                  );
                };
              }, g)
            );
          });
        });
      },
      /**
       * Adds a local directory and all its nested files and directories to the archive
       *
       * @param {string} localPath - path where files will be extracted
       * @param {object} props - optional properties
       * @param {string} [props.zipPath] - optional path inside zip
       * @param {RegExp|function} [props.filter] - optional RegExp or Function if files match will be included.
       * @param {function|string} [props.namefix] - optional function to help fix filename
       */
      addLocalFolderPromise: function(y, g) {
        return new Promise((w, R) => {
          this.addLocalFolderAsync2(Object.assign({ localPath: y }, g), (N, b) => {
            N && R(N), b && w(this);
          });
        });
      },
      /**
       * Allows you to create a entry (file or directory) in the zip file.
       * If you want to create a directory the entryName must end in / and a null buffer should be provided.
       * Comment and attributes are optional
       *
       * @param {string} entryName
       * @param {Buffer | string} content - file content as buffer or utf8 coded string
       * @param {string} [comment] - file comment
       * @param {number | object} [attr] - number as unix file permissions, object as filesystem Stats object
       */
      addFile: function(y, g, w, R) {
        y = l(y);
        let N = h(y);
        const b = N != null;
        b || (N = new o(v), N.entryName = y), N.comment = w || "";
        const M = typeof R == "object" && R instanceof _.fs.Stats;
        M && (N.header.time = R.mtime);
        var G = N.isDirectory ? 16 : 0;
        let k = N.isDirectory ? 16384 : 32768;
        return M ? k |= 4095 & R.mode : typeof R == "number" ? k |= 4095 & R : k |= N.isDirectory ? 493 : 420, G = (G | k << 16) >>> 0, N.attr = G, N.setData(g), b || p.setEntry(N), N;
      },
      /**
       * Returns an array of ZipEntry objects representing the files and folders inside the archive
       *
       * @param {string} [password]
       * @returns Array
       */
      getEntries: function(y) {
        return p.password = y, p ? p.entries : [];
      },
      /**
       * Returns a ZipEntry object representing the file or folder specified by ``name``.
       *
       * @param {string} name
       * @return ZipEntry
       */
      getEntry: function(y) {
        return h(y);
      },
      getEntryCount: function() {
        return p.getEntryCount();
      },
      forEach: function(y) {
        return p.forEach(y);
      },
      /**
       * Extracts the given entry to the given targetPath
       * If the entry is a directory inside the archive, the entire directory and it's subdirectories will be extracted
       *
       * @param {string|ZipEntry} entry - ZipEntry object or String with the full path of the entry
       * @param {string} targetPath - Target folder where to write the file
       * @param {boolean} [maintainEntryPath=true] - If maintainEntryPath is true and the entry is inside a folder, the entry folder will be created in targetPath as well. Default is TRUE
       * @param {boolean} [overwrite=false] - If the file already exists at the target path, the file will be overwriten if this is true.
       * @param {boolean} [keepOriginalPermission=false] - The file will be set as the permission from the entry if this is true.
       * @param {string} [outFileName] - String If set will override the filename of the extracted file (Only works if the entry is a file)
       *
       * @return Boolean
       */
      extractEntryTo: function(y, g, w, R, N, b) {
        R = u(!1, R), N = u(!1, N), w = u(!0, w), b = a(N, b);
        var M = h(y);
        if (!M)
          throw e.Errors.NO_ENTRY();
        var G = S(M.entryName), k = $(g, b && !M.isDirectory ? b : w ? G : t.basename(G));
        if (M.isDirectory) {
          var U = p.getEntryChildren(M);
          return U.forEach(function(V) {
            if (V.isDirectory) return;
            var C = V.getData();
            if (!C)
              throw e.Errors.CANT_EXTRACT_FILE();
            var j = S(V.entryName), T = $(g, w ? j : t.basename(j));
            const P = N ? V.header.fileAttr : void 0;
            _.writeFileTo(T, C, R, P);
          }), !0;
        }
        var x = M.getData(p.password);
        if (!x) throw e.Errors.CANT_EXTRACT_FILE();
        if (_.fs.existsSync(k) && !R)
          throw e.Errors.CANT_OVERRIDE();
        const K = N ? y.header.fileAttr : void 0;
        return _.writeFileTo(k, x, R, K), !0;
      },
      /**
       * Test the archive
       * @param {string} [pass]
       */
      test: function(y) {
        if (!p)
          return !1;
        for (var g in p.entries)
          try {
            if (g.isDirectory)
              continue;
            var w = p.entries[g].getData(y);
            if (!w)
              return !1;
          } catch {
            return !1;
          }
        return !0;
      },
      /**
       * Extracts the entire archive to the given location
       *
       * @param {string} targetPath Target location
       * @param {boolean} [overwrite=false] If the file already exists at the target path, the file will be overwriten if this is true.
       *                  Default is FALSE
       * @param {boolean} [keepOriginalPermission=false] The file will be set as the permission from the entry if this is true.
       *                  Default is FALSE
       * @param {string|Buffer} [pass] password
       */
      extractAllTo: function(y, g, w, R) {
        if (w = u(!1, w), R = a(w, R), g = u(!1, g), !p) throw e.Errors.NO_ZIP();
        p.entries.forEach(function(N) {
          var b = $(y, S(N.entryName));
          if (N.isDirectory) {
            _.makeDir(b);
            return;
          }
          var M = N.getData(R);
          if (!M)
            throw e.Errors.CANT_EXTRACT_FILE();
          const G = w ? N.header.fileAttr : void 0;
          _.writeFileTo(b, M, g, G);
          try {
            _.fs.utimesSync(b, N.header.time, N.header.time);
          } catch {
            throw e.Errors.CANT_EXTRACT_FILE();
          }
        });
      },
      /**
       * Asynchronous extractAllTo
       *
       * @param {string} targetPath Target location
       * @param {boolean} [overwrite=false] If the file already exists at the target path, the file will be overwriten if this is true.
       *                  Default is FALSE
       * @param {boolean} [keepOriginalPermission=false] The file will be set as the permission from the entry if this is true.
       *                  Default is FALSE
       * @param {function} callback The callback will be executed when all entries are extracted successfully or any error is thrown.
       */
      extractAllToAsync: function(y, g, w, R) {
        if (R = r(g, w, R), w = u(!1, w), g = u(!1, g), !R)
          return new Promise((k, U) => {
            this.extractAllToAsync(y, g, w, function(x) {
              x ? U(x) : k(this);
            });
          });
        if (!p) {
          R(e.Errors.NO_ZIP());
          return;
        }
        y = t.resolve(y);
        const N = (k) => $(y, t.normalize(S(k.entryName))), b = (k, U) => new Error(k + ': "' + U + '"'), M = [], G = [];
        p.entries.forEach((k) => {
          k.isDirectory ? M.push(k) : G.push(k);
        });
        for (const k of M) {
          const U = N(k), x = w ? k.header.fileAttr : void 0;
          try {
            _.makeDir(U), x && _.fs.chmodSync(U, x), _.fs.utimesSync(U, k.header.time, k.header.time);
          } catch {
            R(b("Unable to create folder", U));
          }
        }
        G.reverse().reduce(function(k, U) {
          return function(x) {
            if (x)
              k(x);
            else {
              const K = t.normalize(S(U.entryName)), V = $(y, K);
              U.getDataAsync(function(C, j) {
                if (j)
                  k(j);
                else if (!C)
                  k(e.Errors.CANT_EXTRACT_FILE());
                else {
                  const T = w ? U.header.fileAttr : void 0;
                  _.writeFileToAsync(V, C, g, T, function(P) {
                    P || k(b("Unable to write file", V)), _.fs.utimes(V, U.header.time, U.header.time, function(q) {
                      q ? k(b("Unable to set times", V)) : k();
                    });
                  });
                }
              });
            }
          };
        }, R)();
      },
      /**
       * Writes the newly created zip file to disk at the specified location or if a zip was opened and no ``targetFileName`` is provided, it will overwrite the opened zip
       *
       * @param {string} targetFileName
       * @param {function} callback
       */
      writeZip: function(y, g) {
        if (arguments.length === 1 && typeof y == "function" && (g = y, y = ""), !y && v.filename && (y = v.filename), !!y) {
          var w = p.compressToBuffer();
          if (w) {
            var R = _.writeFileTo(y, w, !0);
            typeof g == "function" && g(R ? null : new Error("failed"), "");
          }
        }
      },
      /**
      	         *
      	         * @param {string} targetFileName
      	         * @param {object} [props]
      	         * @param {boolean} [props.overwrite=true] If the file already exists at the target path, the file will be overwriten if this is true.
      	         * @param {boolean} [props.perm] The file will be set as the permission from the entry if this is true.
      
      	         * @returns {Promise<void>}
      	         */
      writeZipPromise: function(y, g) {
        const { overwrite: w, perm: R } = Object.assign({ overwrite: !0 }, g);
        return new Promise((N, b) => {
          !y && v.filename && (y = v.filename), y || b("ADM-ZIP: ZIP File Name Missing"), this.toBufferPromise().then((M) => {
            const G = (k) => k ? N(k) : b("ADM-ZIP: Wasn't able to write zip file");
            _.writeFileToAsync(y, M, w, R, G);
          }, b);
        });
      },
      /**
       * @returns {Promise<Buffer>} A promise to the Buffer.
       */
      toBufferPromise: function() {
        return new Promise((y, g) => {
          p.toAsyncBuffer(y, g);
        });
      },
      /**
       * Returns the content of the entire zip file as a Buffer object
       *
       * @prop {function} [onSuccess]
       * @prop {function} [onFail]
       * @prop {function} [onItemStart]
       * @prop {function} [onItemEnd]
       * @returns {Buffer}
       */
      toBuffer: function(y, g, w, R) {
        return typeof y == "function" ? (p.toAsyncBuffer(y, g, w, R), null) : p.compressToBuffer();
      }
    };
  }, Si;
}
var Ml = kl();
const _c = /* @__PURE__ */ Rc(Ml);
class xc {
  // import {os} from 'platform'; は動作しない
  constructor(t, o) {
    this.bw = t, this.version = o, this.#o = process.platform === "win32", t.webContents.on("devtools-opened", () => this.#f());
    const n = new _u();
    n.handle("openDevTools", () => t.webContents.openDevTools()), this.#d.getVersion = o, n.handle("getInfo", () => this.#d), n.handle("inited", (a, r, f) => this.#p(r, f)), n.handle("fetch", async (a, r) => {
      const f = await fetch(r, { cache: "no-store" });
      return {
        ok: f.ok,
        txt: await f.text()
      };
    }), n.handle("fetchAb", async (a, r) => {
      const f = await fetch(r, { cache: "no-store" });
      return {
        ok: f.ok,
        ab: await f.arrayBuffer()
      };
    }), n.handle("existsSync", (a, r) => ye.existsSync(r)), n.handle("copySync", (a, r, f) => ye.copySync(r, f)), n.handle("removeSync", (a, r) => ye.removeSync(r)), n.handle("ensureFileSync", (a, r) => ye.ensureFileSync(r)), n.handle("readFileSync", (a, r, f) => ye.readFileSync(r, f)), n.handle("writeFileSync", (a, r, f, i) => ye.writeFileSync(r, f, i)), n.handle("appendFile", (a, r, f) => ye.appendFile(r, f).catch((i) => console.log(i))), n.handle("outputFile", (a, r, f) => ye.outputFile(r, f).catch((i) => console.log(i))), n.handle("win_close", () => t.close()), n.handle("win_setTitle", (a, r) => t.setTitle(r)), n.handle("showMessageBox", (a, r) => Mi.showMessageBox(t, r)), n.handle("showOpenDialog", (a, r) => Mi.showOpenDialog(t, r)), n.handle("capturePage", (a, r, f, i) => t.webContents.capturePage().then((s) => {
      ye.ensureFileSync(r);
      const d = s.resize({ width: f, height: i, quality: "best" }), v = r.endsWith(".png") ? d.toPNG() : d.toJPEG(80);
      ye.writeFileSync(r, v);
    })), n.handle("navigate_to", (a, r) => Gc.openExternal(r));
    let u;
    n.handle("Store", (a, r) => {
      u = new nc(r);
    }), n.handle("flush", (a, r) => {
      u.store = r;
    }), n.handle("Store_isEmpty", () => u.size === 0), n.handle("Store_get", () => u.store), n.handle("zip", async (a, r, f) => {
      const i = new _c();
      i.addLocalFolder(r), await i.writeZipPromise(f);
    }), n.handle("unzip", async (a, r, f) => {
      await ye.remove(f), await ye.ensureDir(f), new _c(r).extractAllTo(f, !0);
    }), n.handle("isSimpleFullScreen", () => t.simpleFullScreen), this.#o ? (n.handle("setSimpleFullScreen", (a, r) => {
      this.#e = () => {
      }, t.setSimpleFullScreen(r), r || (t.setPosition(this.#c, this.#u), t.setContentSize(this.#i, this.#s)), this.#e = this.#r;
    }), t.on("enter-full-screen", () => {
      this.#e = () => {
      }, t.setContentSize(this.#t.width, this.#t.height), this.#e = this.#r;
    }), t.on("leave-full-screen", () => {
      this.#a(!1, this.#c, this.#u, this.#i, this.#s);
    })) : n.handle("setSimpleFullScreen", (a, r) => {
      t.setSimpleFullScreen(r), !r && t.setContentSize(this.#i, this.#s);
    }), n.handle("window", (a, r, f, i, s, d) => this.#a(r, f, i, s, d)), t.on("move", () => this.#e()), t.on("resize", () => this.#e()), this.#m();
  }
  static initRenderer(t, o) {
    let n, u = () => {
    };
    try {
      nc.initRenderer(), n = new Hc({
        //	...o,
        // 以下で上書き
        show: !1,
        // ウインドウ位置（とサイズ）決定時に表示
        minWidth: 300,
        minHeight: 300,
        acceptFirstMouse: !0,
        maximizable: !1,
        // Macで最大化ボタンでフルスクリーンにしない
        webPreferences: {
          // XSS対策としてnodeモジュールをレンダラープロセスで使えなくする
          // nodeIntegration		: false,
          // レンダラープロセスに公開するAPIのファイル
          // contextIsolation	: true,
          preload: t,
          sandbox: !1
        }
      });
      const a = new xc(n, o);
      u = () => a.openDevTools();
    } catch (a) {
      throw console.error(`early err:${a}`), u(), "initRenderer error";
    }
    return n;
  }
  #d = {
    getAppPath: et.getAppPath(),
    isPackaged: et.isPackaged,
    downloads: et.getPath("downloads"),
    userData: et.getPath("userData"),
    getVersion: "",
    env: { ...process.env },
    platform: process.platform,
    arch: process.arch
  };
  #c = 0;
  #u = 0;
  #i = 0;
  #s = 0;
  #h = new wu();
  #o;
  #n = 0;
  openDevTools = () => {
  };
  #f = () => this.bw.webContents.closeDevTools();
  // 開こうとしたら閉じる
  #p(t, o) {
    const { width: n, height: u } = t.window, { c: a, x: r, y: f, w: i } = o;
    this.#n = n / u;
    const s = i === n ? u : i / this.#n;
    if (this.#o || this.bw.setAspectRatio(this.#n), this.#a(a, r, f, i, s), this.bw.show(), this.#e = this.#r, t.debug.devtool) {
      this.#f = () => {
      }, this.openDevTools = () => this.bw.webContents.openDevTools({
        mode: "detach"
        // 別ウィンドウに切り離すが画面内に戻せない
        //	activate: false,	// 他のウインドウの後ろに回って見失いがち
      }), this.openDevTools();
      return;
    }
    this.#f = () => {
      this.bw.webContents.closeDevTools(), this.bw.setTitle("DevToolは禁止されています。許可する場合は【プロジェクト設定】の【devtool】をONに。"), this.#h.send(this.bw.webContents, "shutdown");
    };
  }
  #t;
  #m() {
    const t = Ui.getCursorScreenPoint(), o = Ui.getDisplayNearestPoint(t);
    this.#t = o.workAreaSize;
  }
  #l = void 0;
  #e = () => {
  };
  #r() {
    if (this.#l) return;
    this.#e = () => {
    };
    const [t, o] = this.bw.getPosition(), [n, u] = this.bw.getContentSize();
    this.#l = setTimeout(() => {
      this.#l = void 0;
      const [a = 0, r = 0] = this.bw.getPosition(), [f = 0, i = 0] = this.bw.getContentSize();
      if (t !== a || o !== r || n !== f || u !== i) {
        this.#r();
        return;
      }
      this.#e = this.#r;
      let s = f, d = i;
      this.#o && (n === f ? d = f / this.#n : s = i * this.#n), this.#a(!1, a, r, s, d);
    }, 1e3 / 60 * 10);
  }
  #a(t, o, n, u, a) {
    this.bw.simpleFullScreen || (this.#e = () => {
    }, t && (this.#m(), o = (this.#t.width - u) * 0.5, n = (this.#t.height - a) * 0.5), this.#c = o = Math.round(o), this.#u = n = Math.round(n), this.bw.setPosition(o, n), this.#i = u = Math.round(u), this.#s = a = Math.round(a), this.bw.setContentSize(u, a), this.#h.send(this.bw.webContents, "save_win_inf", { c: t, x: o, y: n, w: u, h: a, scrw: this.#t.width, scrh: this.#t.height }), this.#e = this.#r);
  }
}
export {
  xc as appMain
};
//# sourceMappingURL=appMain.js.map
