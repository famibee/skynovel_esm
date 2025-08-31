import xc, { ipcMain as Qe, dialog as ki, shell as zc, BrowserWindow as Vc, app as et, screen as Mi } from "electron";
import Me from "fs";
import Gc from "constants";
import Hc from "stream";
import Si from "util";
import gc from "assert";
import ie from "path";
import _c from "crypto";
import Bc from "events";
import Kc from "os";
import wc from "zlib";
var wr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Sc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Sr = {}, tt = {}, Ui;
function ce() {
  return Ui || (Ui = 1, tt.fromCallback = function(e) {
    return Object.defineProperty(function(...t) {
      if (typeof t[t.length - 1] == "function") e.apply(this, t);
      else
        return new Promise((o, n) => {
          t.push((f, a) => f != null ? n(f) : o(a)), e.apply(this, t);
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
var $r, xi;
function Wc() {
  if (xi) return $r;
  xi = 1;
  var e = Gc, t = process.cwd, o = null, n = process.env.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function() {
    return o || (o = t.call(process)), o;
  };
  try {
    process.cwd();
  } catch {
  }
  if (typeof process.chdir == "function") {
    var f = process.chdir;
    process.chdir = function(r) {
      o = null, f.call(process, r);
    }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, f);
  }
  $r = a;
  function a(r) {
    e.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && u(r), r.lutimes || i(r), r.chown = E(r.chown), r.fchown = E(r.fchown), r.lchown = E(r.lchown), r.chmod = s(r.chmod), r.fchmod = s(r.fchmod), r.lchmod = s(r.lchmod), r.chownSync = g(r.chownSync), r.fchownSync = g(r.fchownSync), r.lchownSync = g(r.lchownSync), r.chmodSync = d(r.chmodSync), r.fchmodSync = d(r.fchmodSync), r.lchmodSync = d(r.lchmodSync), r.stat = p(r.stat), r.fstat = p(r.fstat), r.lstat = p(r.lstat), r.statSync = w(r.statSync), r.fstatSync = w(r.fstatSync), r.lstatSync = w(r.lstatSync), r.chmod && !r.lchmod && (r.lchmod = function(l, h, c) {
      c && process.nextTick(c);
    }, r.lchmodSync = function() {
    }), r.chown && !r.lchown && (r.lchown = function(l, h, c, m) {
      m && process.nextTick(m);
    }, r.lchownSync = function() {
    }), n === "win32" && (r.rename = typeof r.rename != "function" ? r.rename : function(l) {
      function h(c, m, y) {
        var v = Date.now(), _ = 0;
        l(c, m, function S(R) {
          if (R && (R.code === "EACCES" || R.code === "EPERM" || R.code === "EBUSY") && Date.now() - v < 6e4) {
            setTimeout(function() {
              r.stat(m, function(N, b) {
                N && N.code === "ENOENT" ? l(c, m, S) : y(R);
              });
            }, _), _ < 100 && (_ += 10);
            return;
          }
          y && y(R);
        });
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(h, l), h;
    }(r.rename)), r.read = typeof r.read != "function" ? r.read : function(l) {
      function h(c, m, y, v, _, S) {
        var R;
        if (S && typeof S == "function") {
          var N = 0;
          R = function(b, M, G) {
            if (b && b.code === "EAGAIN" && N < 10)
              return N++, l.call(r, c, m, y, v, _, R);
            S.apply(this, arguments);
          };
        }
        return l.call(r, c, m, y, v, _, R);
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(h, l), h;
    }(r.read), r.readSync = typeof r.readSync != "function" ? r.readSync : /* @__PURE__ */ function(l) {
      return function(h, c, m, y, v) {
        for (var _ = 0; ; )
          try {
            return l.call(r, h, c, m, y, v);
          } catch (S) {
            if (S.code === "EAGAIN" && _ < 10) {
              _++;
              continue;
            }
            throw S;
          }
      };
    }(r.readSync);
    function u(l) {
      l.lchmod = function(h, c, m) {
        l.open(
          h,
          e.O_WRONLY | e.O_SYMLINK,
          c,
          function(y, v) {
            if (y) {
              m && m(y);
              return;
            }
            l.fchmod(v, c, function(_) {
              l.close(v, function(S) {
                m && m(_ || S);
              });
            });
          }
        );
      }, l.lchmodSync = function(h, c) {
        var m = l.openSync(h, e.O_WRONLY | e.O_SYMLINK, c), y = !0, v;
        try {
          v = l.fchmodSync(m, c), y = !1;
        } finally {
          if (y)
            try {
              l.closeSync(m);
            } catch {
            }
          else
            l.closeSync(m);
        }
        return v;
      };
    }
    function i(l) {
      e.hasOwnProperty("O_SYMLINK") && l.futimes ? (l.lutimes = function(h, c, m, y) {
        l.open(h, e.O_SYMLINK, function(v, _) {
          if (v) {
            y && y(v);
            return;
          }
          l.futimes(_, c, m, function(S) {
            l.close(_, function(R) {
              y && y(S || R);
            });
          });
        });
      }, l.lutimesSync = function(h, c, m) {
        var y = l.openSync(h, e.O_SYMLINK), v, _ = !0;
        try {
          v = l.futimesSync(y, c, m), _ = !1;
        } finally {
          if (_)
            try {
              l.closeSync(y);
            } catch {
            }
          else
            l.closeSync(y);
        }
        return v;
      }) : l.futimes && (l.lutimes = function(h, c, m, y) {
        y && process.nextTick(y);
      }, l.lutimesSync = function() {
      });
    }
    function s(l) {
      return l && function(h, c, m) {
        return l.call(r, h, c, function(y) {
          $(y) && (y = null), m && m.apply(this, arguments);
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
    function E(l) {
      return l && function(h, c, m, y) {
        return l.call(r, h, c, m, function(v) {
          $(v) && (v = null), y && y.apply(this, arguments);
        });
      };
    }
    function g(l) {
      return l && function(h, c, m) {
        try {
          return l.call(r, h, c, m);
        } catch (y) {
          if (!$(y)) throw y;
        }
      };
    }
    function p(l) {
      return l && function(h, c, m) {
        typeof c == "function" && (m = c, c = null);
        function y(v, _) {
          _ && (_.uid < 0 && (_.uid += 4294967296), _.gid < 0 && (_.gid += 4294967296)), m && m.apply(this, arguments);
        }
        return c ? l.call(r, h, c, y) : l.call(r, h, y);
      };
    }
    function w(l) {
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
var Rr, zi;
function Zc() {
  if (zi) return Rr;
  zi = 1;
  var e = Hc.Stream;
  Rr = t;
  function t(o) {
    return {
      ReadStream: n,
      WriteStream: f
    };
    function n(a, r) {
      if (!(this instanceof n)) return new n(a, r);
      e.call(this);
      var u = this;
      this.path = a, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, r = r || {};
      for (var i = Object.keys(r), s = 0, d = i.length; s < d; s++) {
        var E = i[s];
        this[E] = r[E];
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
          u._read();
        });
        return;
      }
      o.open(this.path, this.flags, this.mode, function(g, p) {
        if (g) {
          u.emit("error", g), u.readable = !1;
          return;
        }
        u.fd = p, u.emit("open", p), u._read();
      });
    }
    function f(a, r) {
      if (!(this instanceof f)) return new f(a, r);
      e.call(this), this.path = a, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, r = r || {};
      for (var u = Object.keys(r), i = 0, s = u.length; i < s; i++) {
        var d = u[i];
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
var Ir, Vi;
function Xc() {
  if (Vi) return Ir;
  Vi = 1, Ir = t;
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
    return Object.getOwnPropertyNames(o).forEach(function(f) {
      Object.defineProperty(n, f, Object.getOwnPropertyDescriptor(o, f));
    }), n;
  }
  return Ir;
}
var rt, Gi;
function Ze() {
  if (Gi) return rt;
  Gi = 1;
  var e = Me, t = Wc(), o = Zc(), n = Xc(), f = Si, a, r;
  typeof Symbol == "function" && typeof Symbol.for == "function" ? (a = Symbol.for("graceful-fs.queue"), r = Symbol.for("graceful-fs.previous")) : (a = "___graceful-fs.queue", r = "___graceful-fs.previous");
  function u() {
  }
  function i(l, h) {
    Object.defineProperty(l, a, {
      get: function() {
        return h;
      }
    });
  }
  var s = u;
  if (f.debuglog ? s = f.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (s = function() {
    var l = f.format.apply(f, arguments);
    l = "GFS4: " + l.split(/\n/).join(`
GFS4: `), console.error(l);
  }), !e[a]) {
    var d = wr[a] || [];
    i(e, d), e.close = function(l) {
      function h(c, m) {
        return l.call(e, c, function(y) {
          y || w(), typeof m == "function" && m.apply(this, arguments);
        });
      }
      return Object.defineProperty(h, r, {
        value: l
      }), h;
    }(e.close), e.closeSync = function(l) {
      function h(c) {
        l.apply(e, arguments), w();
      }
      return Object.defineProperty(h, r, {
        value: l
      }), h;
    }(e.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
      s(e[a]), gc.equal(e[a].length, 0);
    });
  }
  wr[a] || i(wr, e[a]), rt = E(n(e)), process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !e.__patched && (rt = E(e), e.__patched = !0);
  function E(l) {
    t(l), l.gracefulify = E, l.createReadStream = P, l.createWriteStream = q;
    var h = l.readFile;
    l.readFile = c;
    function c(O, F, B) {
      return typeof F == "function" && (B = F, F = null), Z(O, F, B);
      function Z(J, X, D, A) {
        return h(J, X, function(z) {
          z && (z.code === "EMFILE" || z.code === "ENFILE") ? g([Z, [J, X, D], z, A || Date.now(), Date.now()]) : typeof D == "function" && D.apply(this, arguments);
        });
      }
    }
    var m = l.writeFile;
    l.writeFile = y;
    function y(O, F, B, Z) {
      return typeof B == "function" && (Z = B, B = null), J(O, F, B, Z);
      function J(X, D, A, z, H) {
        return m(X, D, A, function(W) {
          W && (W.code === "EMFILE" || W.code === "ENFILE") ? g([J, [X, D, A, z], W, H || Date.now(), Date.now()]) : typeof z == "function" && z.apply(this, arguments);
        });
      }
    }
    var v = l.appendFile;
    v && (l.appendFile = _);
    function _(O, F, B, Z) {
      return typeof B == "function" && (Z = B, B = null), J(O, F, B, Z);
      function J(X, D, A, z, H) {
        return v(X, D, A, function(W) {
          W && (W.code === "EMFILE" || W.code === "ENFILE") ? g([J, [X, D, A, z], W, H || Date.now(), Date.now()]) : typeof z == "function" && z.apply(this, arguments);
        });
      }
    }
    var S = l.copyFile;
    S && (l.copyFile = R);
    function R(O, F, B, Z) {
      return typeof B == "function" && (Z = B, B = 0), J(O, F, B, Z);
      function J(X, D, A, z, H) {
        return S(X, D, A, function(W) {
          W && (W.code === "EMFILE" || W.code === "ENFILE") ? g([J, [X, D, A, z], W, H || Date.now(), Date.now()]) : typeof z == "function" && z.apply(this, arguments);
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
          H && (H.code === "EMFILE" || H.code === "ENFILE") ? g([
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
          W && (W.code === "EMFILE" || W.code === "ENFILE") ? g([J, [X, D, A, z], W, H || Date.now(), Date.now()]) : typeof z == "function" && z.apply(this, arguments);
        });
      }
    }
    return l;
  }
  function g(l) {
    s("ENQUEUE", l[0].name, l[1]), e[a].push(l), $();
  }
  var p;
  function w() {
    for (var l = Date.now(), h = 0; h < e[a].length; ++h)
      e[a][h].length > 2 && (e[a][h][3] = l, e[a][h][4] = l);
    $();
  }
  function $() {
    if (clearTimeout(p), p = void 0, e[a].length !== 0) {
      var l = e[a].shift(), h = l[0], c = l[1], m = l[2], y = l[3], v = l[4];
      if (y === void 0)
        s("RETRY", h.name, c), h.apply(null, c);
      else if (Date.now() - y >= 6e4) {
        s("TIMEOUT", h.name, c);
        var _ = c.pop();
        typeof _ == "function" && _.call(null, m);
      } else {
        var S = Date.now() - v, R = Math.max(v - y, 1), N = Math.min(R * 1.2, 100);
        S >= N ? (s("RETRY", h.name, c), h.apply(null, c.concat([y]))) : e[a].push(l);
      }
      p === void 0 && (p = setTimeout($, 0));
    }
  }
  return rt;
}
var Hi;
function he() {
  return Hi || (Hi = 1, function(e) {
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
    ].filter((f) => typeof o[f] == "function");
    Object.assign(e, o), n.forEach((f) => {
      e[f] = t(o[f]);
    }), e.exists = function(f, a) {
      return typeof a == "function" ? o.exists(f, a) : new Promise((r) => o.exists(f, r));
    }, e.read = function(f, a, r, u, i, s) {
      return typeof s == "function" ? o.read(f, a, r, u, i, s) : new Promise((d, E) => {
        o.read(f, a, r, u, i, (g, p, w) => {
          if (g) return E(g);
          d({ bytesRead: p, buffer: w });
        });
      });
    }, e.write = function(f, a, ...r) {
      return typeof r[r.length - 1] == "function" ? o.write(f, a, ...r) : new Promise((u, i) => {
        o.write(f, a, ...r, (s, d, E) => {
          if (s) return i(s);
          u({ bytesWritten: d, buffer: E });
        });
      });
    }, e.readv = function(f, a, ...r) {
      return typeof r[r.length - 1] == "function" ? o.readv(f, a, ...r) : new Promise((u, i) => {
        o.readv(f, a, ...r, (s, d, E) => {
          if (s) return i(s);
          u({ bytesRead: d, buffers: E });
        });
      });
    }, e.writev = function(f, a, ...r) {
      return typeof r[r.length - 1] == "function" ? o.writev(f, a, ...r) : new Promise((u, i) => {
        o.writev(f, a, ...r, (s, d, E) => {
          if (s) return i(s);
          u({ bytesWritten: d, buffers: E });
        });
      });
    }, typeof o.realpath.native == "function" ? e.realpath.native = t(o.realpath.native) : process.emitWarning(
      "fs.realpath.native is not a function. Is fs being monkey-patched?",
      "Warning",
      "fs-extra-WARN0003"
    );
  }(Sr)), Sr;
}
var nt = {}, Nr = {}, Bi;
function Jc() {
  if (Bi) return Nr;
  Bi = 1;
  const e = ie;
  return Nr.checkPath = function(o) {
    if (process.platform === "win32" && /[<>:"|?*]/.test(o.replace(e.parse(o).root, ""))) {
      const f = new Error(`Path contains invalid characters: ${o}`);
      throw f.code = "EINVAL", f;
    }
  }, Nr;
}
var Ki;
function Yc() {
  if (Ki) return nt;
  Ki = 1;
  const e = /* @__PURE__ */ he(), { checkPath: t } = /* @__PURE__ */ Jc(), o = (n) => {
    const f = { mode: 511 };
    return typeof n == "number" ? n : { ...f, ...n }.mode;
  };
  return nt.makeDir = async (n, f) => (t(n), e.mkdir(n, {
    mode: o(f),
    recursive: !0
  })), nt.makeDirSync = (n, f) => (t(n), e.mkdirSync(n, {
    mode: o(f),
    recursive: !0
  })), nt;
}
var Or, Wi;
function $e() {
  if (Wi) return Or;
  Wi = 1;
  const e = ce().fromPromise, { makeDir: t, makeDirSync: o } = /* @__PURE__ */ Yc(), n = e(t);
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
var Pr, Zi;
function Fe() {
  if (Zi) return Pr;
  Zi = 1;
  const e = ce().fromPromise, t = /* @__PURE__ */ he();
  function o(n) {
    return t.access(n).then(() => !0).catch(() => !1);
  }
  return Pr = {
    pathExists: e(o),
    pathExistsSync: t.existsSync
  }, Pr;
}
var Tr, Xi;
function $c() {
  if (Xi) return Tr;
  Xi = 1;
  const e = /* @__PURE__ */ he(), t = ce().fromPromise;
  async function o(f, a, r) {
    const u = await e.open(f, "r+");
    let i = null;
    try {
      await e.futimes(u, a, r);
    } finally {
      try {
        await e.close(u);
      } catch (s) {
        i = s;
      }
    }
    if (i)
      throw i;
  }
  function n(f, a, r) {
    const u = e.openSync(f, "r+");
    return e.futimesSync(u, a, r), e.closeSync(u);
  }
  return Tr = {
    utimesMillis: t(o),
    utimesMillisSync: n
  }, Tr;
}
var br, Ji;
function Ue() {
  if (Ji) return br;
  Ji = 1;
  const e = /* @__PURE__ */ he(), t = ie, o = ce().fromPromise;
  function n(g, p, w) {
    const $ = w.dereference ? (l) => e.stat(l, { bigint: !0 }) : (l) => e.lstat(l, { bigint: !0 });
    return Promise.all([
      $(g),
      $(p).catch((l) => {
        if (l.code === "ENOENT") return null;
        throw l;
      })
    ]).then(([l, h]) => ({ srcStat: l, destStat: h }));
  }
  function f(g, p, w) {
    let $;
    const l = w.dereference ? (c) => e.statSync(c, { bigint: !0 }) : (c) => e.lstatSync(c, { bigint: !0 }), h = l(g);
    try {
      $ = l(p);
    } catch (c) {
      if (c.code === "ENOENT") return { srcStat: h, destStat: null };
      throw c;
    }
    return { srcStat: h, destStat: $ };
  }
  async function a(g, p, w, $) {
    const { srcStat: l, destStat: h } = await n(g, p, $);
    if (h) {
      if (s(l, h)) {
        const c = t.basename(g), m = t.basename(p);
        if (w === "move" && c !== m && c.toLowerCase() === m.toLowerCase())
          return { srcStat: l, destStat: h, isChangingCase: !0 };
        throw new Error("Source and destination must not be the same.");
      }
      if (l.isDirectory() && !h.isDirectory())
        throw new Error(`Cannot overwrite non-directory '${p}' with directory '${g}'.`);
      if (!l.isDirectory() && h.isDirectory())
        throw new Error(`Cannot overwrite directory '${p}' with non-directory '${g}'.`);
    }
    if (l.isDirectory() && d(g, p))
      throw new Error(E(g, p, w));
    return { srcStat: l, destStat: h };
  }
  function r(g, p, w, $) {
    const { srcStat: l, destStat: h } = f(g, p, $);
    if (h) {
      if (s(l, h)) {
        const c = t.basename(g), m = t.basename(p);
        if (w === "move" && c !== m && c.toLowerCase() === m.toLowerCase())
          return { srcStat: l, destStat: h, isChangingCase: !0 };
        throw new Error("Source and destination must not be the same.");
      }
      if (l.isDirectory() && !h.isDirectory())
        throw new Error(`Cannot overwrite non-directory '${p}' with directory '${g}'.`);
      if (!l.isDirectory() && h.isDirectory())
        throw new Error(`Cannot overwrite directory '${p}' with non-directory '${g}'.`);
    }
    if (l.isDirectory() && d(g, p))
      throw new Error(E(g, p, w));
    return { srcStat: l, destStat: h };
  }
  async function u(g, p, w, $) {
    const l = t.resolve(t.dirname(g)), h = t.resolve(t.dirname(w));
    if (h === l || h === t.parse(h).root) return;
    let c;
    try {
      c = await e.stat(h, { bigint: !0 });
    } catch (m) {
      if (m.code === "ENOENT") return;
      throw m;
    }
    if (s(p, c))
      throw new Error(E(g, w, $));
    return u(g, p, h, $);
  }
  function i(g, p, w, $) {
    const l = t.resolve(t.dirname(g)), h = t.resolve(t.dirname(w));
    if (h === l || h === t.parse(h).root) return;
    let c;
    try {
      c = e.statSync(h, { bigint: !0 });
    } catch (m) {
      if (m.code === "ENOENT") return;
      throw m;
    }
    if (s(p, c))
      throw new Error(E(g, w, $));
    return i(g, p, h, $);
  }
  function s(g, p) {
    return p.ino !== void 0 && p.dev !== void 0 && p.ino === g.ino && p.dev === g.dev;
  }
  function d(g, p) {
    const w = t.resolve(g).split(t.sep).filter((l) => l), $ = t.resolve(p).split(t.sep).filter((l) => l);
    return w.every((l, h) => $[h] === l);
  }
  function E(g, p, w) {
    return `Cannot ${w} '${g}' to a subdirectory of itself, '${p}'.`;
  }
  return br = {
    // checkPaths
    checkPaths: o(a),
    checkPathsSync: r,
    // checkParent
    checkParentPaths: o(u),
    checkParentPathsSync: i,
    // Misc
    isSrcSubdir: d,
    areIdentical: s
  }, br;
}
var Dr, Yi;
function Qc() {
  if (Yi) return Dr;
  Yi = 1;
  const e = /* @__PURE__ */ he(), t = ie, { mkdirs: o } = /* @__PURE__ */ $e(), { pathExists: n } = /* @__PURE__ */ Fe(), { utimesMillis: f } = /* @__PURE__ */ $c(), a = /* @__PURE__ */ Ue();
  async function r($, l, h = {}) {
    typeof h == "function" && (h = { filter: h }), h.clobber = "clobber" in h ? !!h.clobber : !0, h.overwrite = "overwrite" in h ? !!h.overwrite : h.clobber, h.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0001"
    );
    const { srcStat: c, destStat: m } = await a.checkPaths($, l, "copy", h);
    if (await a.checkParentPaths($, c, l, "copy"), !await u($, l, h)) return;
    const v = t.dirname(l);
    await n(v) || await o(v), await i(m, $, l, h);
  }
  async function u($, l, h) {
    return h.filter ? h.filter($, l) : !0;
  }
  async function i($, l, h, c) {
    const y = await (c.dereference ? e.stat : e.lstat)(l);
    if (y.isDirectory()) return p(y, $, l, h, c);
    if (y.isFile() || y.isCharacterDevice() || y.isBlockDevice()) return s(y, $, l, h, c);
    if (y.isSymbolicLink()) return w($, l, h, c);
    throw y.isSocket() ? new Error(`Cannot copy a socket file: ${l}`) : y.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${l}`) : new Error(`Unknown file: ${l}`);
  }
  async function s($, l, h, c, m) {
    if (!l) return d($, h, c, m);
    if (m.overwrite)
      return await e.unlink(c), d($, h, c, m);
    if (m.errorOnExist)
      throw new Error(`'${c}' already exists`);
  }
  async function d($, l, h, c) {
    if (await e.copyFile(l, h), c.preserveTimestamps) {
      E($.mode) && await g(h, $.mode);
      const m = await e.stat(l);
      await f(h, m.atime, m.mtime);
    }
    return e.chmod(h, $.mode);
  }
  function E($) {
    return ($ & 128) === 0;
  }
  function g($, l) {
    return e.chmod($, l | 128);
  }
  async function p($, l, h, c, m) {
    l || await e.mkdir(c);
    const y = [];
    for await (const v of await e.opendir(h)) {
      const _ = t.join(h, v.name), S = t.join(c, v.name);
      y.push(
        u(_, S, m).then((R) => {
          if (R)
            return a.checkPaths(_, S, "copy", m).then(({ destStat: N }) => i(N, _, S, m));
        })
      );
    }
    await Promise.all(y), l || await e.chmod(c, $.mode);
  }
  async function w($, l, h, c) {
    let m = await e.readlink(l);
    if (c.dereference && (m = t.resolve(process.cwd(), m)), !$)
      return e.symlink(m, h);
    let y = null;
    try {
      y = await e.readlink(h);
    } catch (v) {
      if (v.code === "EINVAL" || v.code === "UNKNOWN") return e.symlink(m, h);
      throw v;
    }
    if (c.dereference && (y = t.resolve(process.cwd(), y)), a.isSrcSubdir(m, y))
      throw new Error(`Cannot copy '${m}' to a subdirectory of itself, '${y}'.`);
    if (a.isSrcSubdir(y, m))
      throw new Error(`Cannot overwrite '${y}' with '${m}'.`);
    return await e.unlink(h), e.symlink(m, h);
  }
  return Dr = r, Dr;
}
var Cr, Qi;
function eu() {
  if (Qi) return Cr;
  Qi = 1;
  const e = Ze(), t = ie, o = $e().mkdirsSync, n = $c().utimesMillisSync, f = /* @__PURE__ */ Ue();
  function a(v, _, S) {
    typeof S == "function" && (S = { filter: S }), S = S || {}, S.clobber = "clobber" in S ? !!S.clobber : !0, S.overwrite = "overwrite" in S ? !!S.overwrite : S.clobber, S.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0002"
    );
    const { srcStat: R, destStat: N } = f.checkPathsSync(v, _, "copy", S);
    if (f.checkParentPathsSync(v, R, _, "copy"), S.filter && !S.filter(v, _)) return;
    const b = t.dirname(_);
    return e.existsSync(b) || o(b), r(N, v, _, S);
  }
  function r(v, _, S, R) {
    const b = (R.dereference ? e.statSync : e.lstatSync)(_);
    if (b.isDirectory()) return $(b, v, _, S, R);
    if (b.isFile() || b.isCharacterDevice() || b.isBlockDevice()) return u(b, v, _, S, R);
    if (b.isSymbolicLink()) return m(v, _, S, R);
    throw b.isSocket() ? new Error(`Cannot copy a socket file: ${_}`) : b.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${_}`) : new Error(`Unknown file: ${_}`);
  }
  function u(v, _, S, R, N) {
    return _ ? i(v, S, R, N) : s(v, S, R, N);
  }
  function i(v, _, S, R) {
    if (R.overwrite)
      return e.unlinkSync(S), s(v, _, S, R);
    if (R.errorOnExist)
      throw new Error(`'${S}' already exists`);
  }
  function s(v, _, S, R) {
    return e.copyFileSync(_, S), R.preserveTimestamps && d(v.mode, _, S), p(S, v.mode);
  }
  function d(v, _, S) {
    return E(v) && g(S, v), w(_, S);
  }
  function E(v) {
    return (v & 128) === 0;
  }
  function g(v, _) {
    return p(v, _ | 128);
  }
  function p(v, _) {
    return e.chmodSync(v, _);
  }
  function w(v, _) {
    const S = e.statSync(v);
    return n(_, S.atime, S.mtime);
  }
  function $(v, _, S, R, N) {
    return _ ? h(S, R, N) : l(v.mode, S, R, N);
  }
  function l(v, _, S, R) {
    return e.mkdirSync(S), h(_, S, R), p(S, v);
  }
  function h(v, _, S) {
    const R = e.opendirSync(v);
    try {
      let N;
      for (; (N = R.readSync()) !== null; )
        c(N.name, v, _, S);
    } finally {
      R.closeSync();
    }
  }
  function c(v, _, S, R) {
    const N = t.join(_, v), b = t.join(S, v);
    if (R.filter && !R.filter(N, b)) return;
    const { destStat: M } = f.checkPathsSync(N, b, "copy", R);
    return r(M, N, b, R);
  }
  function m(v, _, S, R) {
    let N = e.readlinkSync(_);
    if (R.dereference && (N = t.resolve(process.cwd(), N)), v) {
      let b;
      try {
        b = e.readlinkSync(S);
      } catch (M) {
        if (M.code === "EINVAL" || M.code === "UNKNOWN") return e.symlinkSync(N, S);
        throw M;
      }
      if (R.dereference && (b = t.resolve(process.cwd(), b)), f.isSrcSubdir(N, b))
        throw new Error(`Cannot copy '${N}' to a subdirectory of itself, '${b}'.`);
      if (f.isSrcSubdir(b, N))
        throw new Error(`Cannot overwrite '${b}' with '${N}'.`);
      return y(N, S);
    } else
      return e.symlinkSync(N, S);
  }
  function y(v, _) {
    return e.unlinkSync(_), e.symlinkSync(v, _);
  }
  return Cr = a, Cr;
}
var Lr, es;
function $i() {
  if (es) return Lr;
  es = 1;
  const e = ce().fromPromise;
  return Lr = {
    copy: e(/* @__PURE__ */ Qc()),
    copySync: /* @__PURE__ */ eu()
  }, Lr;
}
var Ar, ts;
function cr() {
  if (ts) return Ar;
  ts = 1;
  const e = Ze(), t = ce().fromCallback;
  function o(f, a) {
    e.rm(f, { recursive: !0, force: !0 }, a);
  }
  function n(f) {
    e.rmSync(f, { recursive: !0, force: !0 });
  }
  return Ar = {
    remove: t(o),
    removeSync: n
  }, Ar;
}
var Fr, rs;
function tu() {
  if (rs) return Fr;
  rs = 1;
  const e = ce().fromPromise, t = /* @__PURE__ */ he(), o = ie, n = /* @__PURE__ */ $e(), f = /* @__PURE__ */ cr(), a = e(async function(i) {
    let s;
    try {
      s = await t.readdir(i);
    } catch {
      return n.mkdirs(i);
    }
    return Promise.all(s.map((d) => f.remove(o.join(i, d))));
  });
  function r(u) {
    let i;
    try {
      i = t.readdirSync(u);
    } catch {
      return n.mkdirsSync(u);
    }
    i.forEach((s) => {
      s = o.join(u, s), f.removeSync(s);
    });
  }
  return Fr = {
    emptyDirSync: r,
    emptydirSync: r,
    emptyDir: a,
    emptydir: a
  }, Fr;
}
var qr, ns;
function ru() {
  if (ns) return qr;
  ns = 1;
  const e = ce().fromPromise, t = ie, o = /* @__PURE__ */ he(), n = /* @__PURE__ */ $e();
  async function f(r) {
    let u;
    try {
      u = await o.stat(r);
    } catch {
    }
    if (u && u.isFile()) return;
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
    let u;
    try {
      u = o.statSync(r);
    } catch {
    }
    if (u && u.isFile()) return;
    const i = t.dirname(r);
    try {
      o.statSync(i).isDirectory() || o.readdirSync(i);
    } catch (s) {
      if (s && s.code === "ENOENT") n.mkdirsSync(i);
      else throw s;
    }
    o.writeFileSync(r, "");
  }
  return qr = {
    createFile: e(f),
    createFileSync: a
  }, qr;
}
var jr, is;
function nu() {
  if (is) return jr;
  is = 1;
  const e = ce().fromPromise, t = ie, o = /* @__PURE__ */ he(), n = /* @__PURE__ */ $e(), { pathExists: f } = /* @__PURE__ */ Fe(), { areIdentical: a } = /* @__PURE__ */ Ue();
  async function r(i, s) {
    let d;
    try {
      d = await o.lstat(s);
    } catch {
    }
    let E;
    try {
      E = await o.lstat(i);
    } catch (w) {
      throw w.message = w.message.replace("lstat", "ensureLink"), w;
    }
    if (d && a(E, d)) return;
    const g = t.dirname(s);
    await f(g) || await n.mkdirs(g), await o.link(i, s);
  }
  function u(i, s) {
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
    const E = t.dirname(s);
    return o.existsSync(E) || n.mkdirsSync(E), o.linkSync(i, s);
  }
  return jr = {
    createLink: e(r),
    createLinkSync: u
  }, jr;
}
var kr, ss;
function iu() {
  if (ss) return kr;
  ss = 1;
  const e = ie, t = /* @__PURE__ */ he(), { pathExists: o } = /* @__PURE__ */ Fe(), n = ce().fromPromise;
  async function f(r, u) {
    if (e.isAbsolute(r)) {
      try {
        await t.lstat(r);
      } catch (E) {
        throw E.message = E.message.replace("lstat", "ensureSymlink"), E;
      }
      return {
        toCwd: r,
        toDst: r
      };
    }
    const i = e.dirname(u), s = e.join(i, r);
    if (await o(s))
      return {
        toCwd: s,
        toDst: r
      };
    try {
      await t.lstat(r);
    } catch (E) {
      throw E.message = E.message.replace("lstat", "ensureSymlink"), E;
    }
    return {
      toCwd: r,
      toDst: e.relative(i, r)
    };
  }
  function a(r, u) {
    if (e.isAbsolute(r)) {
      if (!t.existsSync(r)) throw new Error("absolute srcpath does not exist");
      return {
        toCwd: r,
        toDst: r
      };
    }
    const i = e.dirname(u), s = e.join(i, r);
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
  return kr = {
    symlinkPaths: n(f),
    symlinkPathsSync: a
  }, kr;
}
var Mr, os;
function su() {
  if (os) return Mr;
  os = 1;
  const e = /* @__PURE__ */ he(), t = ce().fromPromise;
  async function o(f, a) {
    if (a) return a;
    let r;
    try {
      r = await e.lstat(f);
    } catch {
      return "file";
    }
    return r && r.isDirectory() ? "dir" : "file";
  }
  function n(f, a) {
    if (a) return a;
    let r;
    try {
      r = e.lstatSync(f);
    } catch {
      return "file";
    }
    return r && r.isDirectory() ? "dir" : "file";
  }
  return Mr = {
    symlinkType: t(o),
    symlinkTypeSync: n
  }, Mr;
}
var Ur, as;
function ou() {
  if (as) return Ur;
  as = 1;
  const e = ce().fromPromise, t = ie, o = /* @__PURE__ */ he(), { mkdirs: n, mkdirsSync: f } = /* @__PURE__ */ $e(), { symlinkPaths: a, symlinkPathsSync: r } = /* @__PURE__ */ iu(), { symlinkType: u, symlinkTypeSync: i } = /* @__PURE__ */ su(), { pathExists: s } = /* @__PURE__ */ Fe(), { areIdentical: d } = /* @__PURE__ */ Ue();
  async function E(p, w, $) {
    let l;
    try {
      l = await o.lstat(w);
    } catch {
    }
    if (l && l.isSymbolicLink()) {
      const [y, v] = await Promise.all([
        o.stat(p),
        o.stat(w)
      ]);
      if (d(y, v)) return;
    }
    const h = await a(p, w);
    p = h.toDst;
    const c = await u(h.toCwd, $), m = t.dirname(w);
    return await s(m) || await n(m), o.symlink(p, w, c);
  }
  function g(p, w, $) {
    let l;
    try {
      l = o.lstatSync(w);
    } catch {
    }
    if (l && l.isSymbolicLink()) {
      const y = o.statSync(p), v = o.statSync(w);
      if (d(y, v)) return;
    }
    const h = r(p, w);
    p = h.toDst, $ = i(h.toCwd, $);
    const c = t.dirname(w);
    return o.existsSync(c) || f(c), o.symlinkSync(p, w, $);
  }
  return Ur = {
    createSymlink: e(E),
    createSymlinkSync: g
  }, Ur;
}
var xr, cs;
function au() {
  if (cs) return xr;
  cs = 1;
  const { createFile: e, createFileSync: t } = /* @__PURE__ */ ru(), { createLink: o, createLinkSync: n } = /* @__PURE__ */ nu(), { createSymlink: f, createSymlinkSync: a } = /* @__PURE__ */ ou();
  return xr = {
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
    createSymlink: f,
    createSymlinkSync: a,
    ensureSymlink: f,
    ensureSymlinkSync: a
  }, xr;
}
var zr, us;
function Ri() {
  if (us) return zr;
  us = 1;
  function e(o, { EOL: n = `
`, finalEOL: f = !0, replacer: a = null, spaces: r } = {}) {
    const u = f ? n : "";
    return JSON.stringify(o, a, r).replace(/\n/g, n) + u;
  }
  function t(o) {
    return Buffer.isBuffer(o) && (o = o.toString("utf8")), o.replace(/^\uFEFF/, "");
  }
  return zr = { stringify: e, stripBom: t }, zr;
}
var Vr, fs;
function cu() {
  if (fs) return Vr;
  fs = 1;
  let e;
  try {
    e = Ze();
  } catch {
    e = Me;
  }
  const t = ce(), { stringify: o, stripBom: n } = Ri();
  async function f(E, g = {}) {
    typeof g == "string" && (g = { encoding: g });
    const p = g.fs || e, w = "throws" in g ? g.throws : !0;
    let $ = await t.fromCallback(p.readFile)(E, g);
    $ = n($);
    let l;
    try {
      l = JSON.parse($, g ? g.reviver : null);
    } catch (h) {
      if (w)
        throw h.message = `${E}: ${h.message}`, h;
      return null;
    }
    return l;
  }
  const a = t.fromPromise(f);
  function r(E, g = {}) {
    typeof g == "string" && (g = { encoding: g });
    const p = g.fs || e, w = "throws" in g ? g.throws : !0;
    try {
      let $ = p.readFileSync(E, g);
      return $ = n($), JSON.parse($, g.reviver);
    } catch ($) {
      if (w)
        throw $.message = `${E}: ${$.message}`, $;
      return null;
    }
  }
  async function u(E, g, p = {}) {
    const w = p.fs || e, $ = o(g, p);
    await t.fromCallback(w.writeFile)(E, $, p);
  }
  const i = t.fromPromise(u);
  function s(E, g, p = {}) {
    const w = p.fs || e, $ = o(g, p);
    return w.writeFileSync(E, $, p);
  }
  return Vr = {
    readFile: a,
    readFileSync: r,
    writeFile: i,
    writeFileSync: s
  }, Vr;
}
var Gr, ls;
function uu() {
  if (ls) return Gr;
  ls = 1;
  const e = cu();
  return Gr = {
    // jsonfile exports
    readJson: e.readFile,
    readJsonSync: e.readFileSync,
    writeJson: e.writeFile,
    writeJsonSync: e.writeFileSync
  }, Gr;
}
var Hr, ds;
function Ii() {
  if (ds) return Hr;
  ds = 1;
  const e = ce().fromPromise, t = /* @__PURE__ */ he(), o = ie, n = /* @__PURE__ */ $e(), f = Fe().pathExists;
  async function a(u, i, s = "utf-8") {
    const d = o.dirname(u);
    return await f(d) || await n.mkdirs(d), t.writeFile(u, i, s);
  }
  function r(u, ...i) {
    const s = o.dirname(u);
    t.existsSync(s) || n.mkdirsSync(s), t.writeFileSync(u, ...i);
  }
  return Hr = {
    outputFile: e(a),
    outputFileSync: r
  }, Hr;
}
var Br, hs;
function fu() {
  if (hs) return Br;
  hs = 1;
  const { stringify: e } = Ri(), { outputFile: t } = /* @__PURE__ */ Ii();
  async function o(n, f, a = {}) {
    const r = e(f, a);
    await t(n, r, a);
  }
  return Br = o, Br;
}
var Kr, ms;
function lu() {
  if (ms) return Kr;
  ms = 1;
  const { stringify: e } = Ri(), { outputFileSync: t } = /* @__PURE__ */ Ii();
  function o(n, f, a) {
    const r = e(f, a);
    t(n, r, a);
  }
  return Kr = o, Kr;
}
var Wr, ps;
function du() {
  if (ps) return Wr;
  ps = 1;
  const e = ce().fromPromise, t = /* @__PURE__ */ uu();
  return t.outputJson = e(/* @__PURE__ */ fu()), t.outputJsonSync = /* @__PURE__ */ lu(), t.outputJSON = t.outputJson, t.outputJSONSync = t.outputJsonSync, t.writeJSON = t.writeJson, t.writeJSONSync = t.writeJsonSync, t.readJSON = t.readJson, t.readJSONSync = t.readJsonSync, Wr = t, Wr;
}
var Zr, ys;
function hu() {
  if (ys) return Zr;
  ys = 1;
  const e = /* @__PURE__ */ he(), t = ie, { copy: o } = /* @__PURE__ */ $i(), { remove: n } = /* @__PURE__ */ cr(), { mkdirp: f } = /* @__PURE__ */ $e(), { pathExists: a } = /* @__PURE__ */ Fe(), r = /* @__PURE__ */ Ue();
  async function u(d, E, g = {}) {
    const p = g.overwrite || g.clobber || !1, { srcStat: w, isChangingCase: $ = !1 } = await r.checkPaths(d, E, "move", g);
    await r.checkParentPaths(d, w, E, "move");
    const l = t.dirname(E);
    return t.parse(l).root !== l && await f(l), i(d, E, p, $);
  }
  async function i(d, E, g, p) {
    if (!p) {
      if (g)
        await n(E);
      else if (await a(E))
        throw new Error("dest already exists.");
    }
    try {
      await e.rename(d, E);
    } catch (w) {
      if (w.code !== "EXDEV")
        throw w;
      await s(d, E, g);
    }
  }
  async function s(d, E, g) {
    return await o(d, E, {
      overwrite: g,
      errorOnExist: !0,
      preserveTimestamps: !0
    }), n(d);
  }
  return Zr = u, Zr;
}
var Xr, Es;
function mu() {
  if (Es) return Xr;
  Es = 1;
  const e = Ze(), t = ie, o = $i().copySync, n = cr().removeSync, f = $e().mkdirpSync, a = /* @__PURE__ */ Ue();
  function r(E, g, p) {
    p = p || {};
    const w = p.overwrite || p.clobber || !1, { srcStat: $, isChangingCase: l = !1 } = a.checkPathsSync(E, g, "move", p);
    return a.checkParentPathsSync(E, $, g, "move"), u(g) || f(t.dirname(g)), i(E, g, w, l);
  }
  function u(E) {
    const g = t.dirname(E);
    return t.parse(g).root === g;
  }
  function i(E, g, p, w) {
    if (w) return s(E, g, p);
    if (p)
      return n(g), s(E, g, p);
    if (e.existsSync(g)) throw new Error("dest already exists.");
    return s(E, g, p);
  }
  function s(E, g, p) {
    try {
      e.renameSync(E, g);
    } catch (w) {
      if (w.code !== "EXDEV") throw w;
      return d(E, g, p);
    }
  }
  function d(E, g, p) {
    return o(E, g, {
      overwrite: p,
      errorOnExist: !0,
      preserveTimestamps: !0
    }), n(E);
  }
  return Xr = r, Xr;
}
var Jr, vs;
function pu() {
  if (vs) return Jr;
  vs = 1;
  const e = ce().fromPromise;
  return Jr = {
    move: e(/* @__PURE__ */ hu()),
    moveSync: /* @__PURE__ */ mu()
  }, Jr;
}
var Yr, gs;
function yu() {
  return gs || (gs = 1, Yr = {
    // Export promiseified graceful-fs:
    .../* @__PURE__ */ he(),
    // Export extra methods:
    .../* @__PURE__ */ $i(),
    .../* @__PURE__ */ tu(),
    .../* @__PURE__ */ au(),
    .../* @__PURE__ */ du(),
    .../* @__PURE__ */ $e(),
    .../* @__PURE__ */ pu(),
    .../* @__PURE__ */ Ii(),
    .../* @__PURE__ */ Fe(),
    .../* @__PURE__ */ cr()
  }), Yr;
}
var ye = /* @__PURE__ */ yu();
class Eu {
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
class vu {
  /**
   * Send an asynchronous message to the renderer process.
   */
  send(t, o, ...n) {
    t.send(o, ...n);
  }
}
var We = { exports: {} }, Qr, _s;
function gu() {
  return _s || (_s = 1, Qr = (e) => {
    const t = typeof e;
    return e !== null && (t === "object" || t === "function");
  }), Qr;
}
var en, ws;
function _u() {
  if (ws) return en;
  ws = 1;
  const e = gu(), t = /* @__PURE__ */ new Set([
    "__proto__",
    "prototype",
    "constructor"
  ]), o = (f) => !f.some((a) => t.has(a));
  function n(f) {
    const a = f.split("."), r = [];
    for (let u = 0; u < a.length; u++) {
      let i = a[u];
      for (; i[i.length - 1] === "\\" && a[u + 1] !== void 0; )
        i = i.slice(0, -1) + ".", i += a[++u];
      r.push(i);
    }
    return o(r) ? r : [];
  }
  return en = {
    get(f, a, r) {
      if (!e(f) || typeof a != "string")
        return r === void 0 ? f : r;
      const u = n(a);
      if (u.length !== 0) {
        for (let i = 0; i < u.length; i++)
          if (f = f[u[i]], f == null) {
            if (i !== u.length - 1)
              return r;
            break;
          }
        return f === void 0 ? r : f;
      }
    },
    set(f, a, r) {
      if (!e(f) || typeof a != "string")
        return f;
      const u = f, i = n(a);
      for (let s = 0; s < i.length; s++) {
        const d = i[s];
        e(f[d]) || (f[d] = {}), s === i.length - 1 && (f[d] = r), f = f[d];
      }
      return u;
    },
    delete(f, a) {
      if (!e(f) || typeof a != "string")
        return !1;
      const r = n(a);
      for (let u = 0; u < r.length; u++) {
        const i = r[u];
        if (u === r.length - 1)
          return delete f[i], !0;
        if (f = f[i], !e(f))
          return !1;
      }
    },
    has(f, a) {
      if (!e(f) || typeof a != "string")
        return !1;
      const r = n(a);
      if (r.length === 0)
        return !1;
      for (let u = 0; u < r.length; u++)
        if (e(f)) {
          if (!(r[u] in f))
            return !1;
          f = f[r[u]];
        } else
          return !1;
      return !0;
    }
  }, en;
}
var it = { exports: {} }, st = { exports: {} }, ot = { exports: {} }, at = { exports: {} }, Ss;
function wu() {
  if (Ss) return at.exports;
  Ss = 1;
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
var ct = { exports: {} }, ut = { exports: {} }, $s;
function Su() {
  if ($s) return ut.exports;
  $s = 1;
  const e = (t, ...o) => new Promise((n) => {
    n(t(...o));
  });
  return ut.exports = e, ut.exports.default = e, ut.exports;
}
var Rs;
function $u() {
  if (Rs) return ct.exports;
  Rs = 1;
  const e = Su(), t = (o) => {
    if (!((Number.isInteger(o) || o === 1 / 0) && o > 0))
      return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
    const n = [];
    let f = 0;
    const a = () => {
      f--, n.length > 0 && n.shift()();
    }, r = (s, d, ...E) => {
      f++;
      const g = e(s, ...E);
      d(g), g.then(a, a);
    }, u = (s, d, ...E) => {
      f < o ? r(s, d, ...E) : n.push(r.bind(null, s, d, ...E));
    }, i = (s, ...d) => new Promise((E) => u(s, E, ...d));
    return Object.defineProperties(i, {
      activeCount: {
        get: () => f
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
var tn, Is;
function Ru() {
  if (Is) return tn;
  Is = 1;
  const e = $u();
  class t extends Error {
    constructor(a) {
      super(), this.value = a;
    }
  }
  const o = (f, a) => Promise.resolve(f).then(a), n = (f) => Promise.all(f).then((a) => a[1] === !0 && Promise.reject(new t(a[0])));
  return tn = (f, a, r) => {
    r = Object.assign({
      concurrency: 1 / 0,
      preserveOrder: !0
    }, r);
    const u = e(r.concurrency), i = [...f].map((d) => [d, u(o, d, a)]), s = e(r.preserveOrder ? 1 : 1 / 0);
    return Promise.all(i.map((d) => s(n, d))).then(() => {
    }).catch((d) => d instanceof t ? d.value : Promise.reject(d));
  }, tn;
}
var Ns;
function Iu() {
  if (Ns) return ot.exports;
  Ns = 1;
  const e = ie, t = wu(), o = Ru();
  return ot.exports = (n, f) => (f = Object.assign({
    cwd: process.cwd()
  }, f), o(n, (a) => t(e.resolve(f.cwd, a)), f)), ot.exports.sync = (n, f) => {
    f = Object.assign({
      cwd: process.cwd()
    }, f);
    for (const a of n)
      if (t.sync(e.resolve(f.cwd, a)))
        return a;
  }, ot.exports;
}
var Os;
function Nu() {
  if (Os) return st.exports;
  Os = 1;
  const e = ie, t = Iu();
  return st.exports = (o, n = {}) => {
    const f = e.resolve(n.cwd || ""), { root: a } = e.parse(f), r = [].concat(o);
    return new Promise((u) => {
      (function i(s) {
        t(r, { cwd: s }).then((d) => {
          d ? u(e.join(s, d)) : s === a ? u(null) : i(e.dirname(s));
        });
      })(f);
    });
  }, st.exports.sync = (o, n = {}) => {
    let f = e.resolve(n.cwd || "");
    const { root: a } = e.parse(f), r = [].concat(o);
    for (; ; ) {
      const u = t.sync(r, { cwd: f });
      if (u)
        return e.join(f, u);
      if (f === a)
        return null;
      f = e.dirname(f);
    }
  }, st.exports;
}
var Ps;
function Ou() {
  if (Ps) return it.exports;
  Ps = 1;
  const e = Nu();
  return it.exports = async ({ cwd: t } = {}) => e("package.json", { cwd: t }), it.exports.sync = ({ cwd: t } = {}) => e.sync("package.json", { cwd: t }), it.exports;
}
var ft = { exports: {} }, Ts;
function Pu() {
  if (Ts) return ft.exports;
  Ts = 1;
  const e = ie, t = Kc, o = t.homedir(), n = t.tmpdir(), { env: f } = process, a = (s) => {
    const d = e.join(o, "Library");
    return {
      data: e.join(d, "Application Support", s),
      config: e.join(d, "Preferences", s),
      cache: e.join(d, "Caches", s),
      log: e.join(d, "Logs", s),
      temp: e.join(n, s)
    };
  }, r = (s) => {
    const d = f.APPDATA || e.join(o, "AppData", "Roaming"), E = f.LOCALAPPDATA || e.join(o, "AppData", "Local");
    return {
      // Data/config/cache/log are invented by me as Windows isn't opinionated about this
      data: e.join(E, s, "Data"),
      config: e.join(d, s, "Config"),
      cache: e.join(E, s, "Cache"),
      log: e.join(E, s, "Log"),
      temp: e.join(n, s)
    };
  }, u = (s) => {
    const d = e.basename(o);
    return {
      data: e.join(f.XDG_DATA_HOME || e.join(o, ".local", "share"), s),
      config: e.join(f.XDG_CONFIG_HOME || e.join(o, ".config"), s),
      cache: e.join(f.XDG_CACHE_HOME || e.join(o, ".cache"), s),
      // https://wiki.debian.org/XDGBaseDirectorySpecification#state
      log: e.join(f.XDG_STATE_HOME || e.join(o, ".local", "state"), s),
      temp: e.join(n, d, s)
    };
  }, i = (s, d) => {
    if (typeof s != "string")
      throw new TypeError(`Expected string, got ${typeof s}`);
    return d = Object.assign({ suffix: "nodejs" }, d), d.suffix && (s += `-${d.suffix}`), process.platform === "darwin" ? a(s) : process.platform === "win32" ? r(s) : u(s);
  };
  return ft.exports = i, ft.exports.default = i, ft.exports;
}
var ve = {}, ne = {}, bs;
function Xe() {
  if (bs) return ne;
  bs = 1, Object.defineProperty(ne, "__esModule", { value: !0 }), ne.NOOP = ne.LIMIT_FILES_DESCRIPTORS = ne.LIMIT_BASENAME_LENGTH = ne.IS_USER_ROOT = ne.IS_POSIX = ne.DEFAULT_TIMEOUT_SYNC = ne.DEFAULT_TIMEOUT_ASYNC = ne.DEFAULT_WRITE_OPTIONS = ne.DEFAULT_READ_OPTIONS = ne.DEFAULT_FOLDER_MODE = ne.DEFAULT_FILE_MODE = ne.DEFAULT_ENCODING = void 0;
  const e = "utf8";
  ne.DEFAULT_ENCODING = e;
  const t = 438;
  ne.DEFAULT_FILE_MODE = t;
  const o = 511;
  ne.DEFAULT_FOLDER_MODE = o;
  const n = {};
  ne.DEFAULT_READ_OPTIONS = n;
  const f = {};
  ne.DEFAULT_WRITE_OPTIONS = f;
  const a = 5e3;
  ne.DEFAULT_TIMEOUT_ASYNC = a;
  const r = 100;
  ne.DEFAULT_TIMEOUT_SYNC = r;
  const u = !!process.getuid;
  ne.IS_POSIX = u;
  const i = process.getuid ? !process.getuid() : !1;
  ne.IS_USER_ROOT = i;
  const s = 128;
  ne.LIMIT_BASENAME_LENGTH = s;
  const d = 1e4;
  ne.LIMIT_FILES_DESCRIPTORS = d;
  const E = () => {
  };
  return ne.NOOP = E, ne;
}
var lt = {}, Te = {}, Ds;
function Tu() {
  if (Ds) return Te;
  Ds = 1, Object.defineProperty(Te, "__esModule", { value: !0 }), Te.attemptifySync = Te.attemptifyAsync = void 0;
  const e = Xe(), t = (n, f = e.NOOP) => function() {
    return n.apply(void 0, arguments).catch(f);
  };
  Te.attemptifyAsync = t;
  const o = (n, f = e.NOOP) => function() {
    try {
      return n.apply(void 0, arguments);
    } catch (a) {
      return f(a);
    }
  };
  return Te.attemptifySync = o, Te;
}
var dt = {}, Cs;
function bu() {
  if (Cs) return dt;
  Cs = 1, Object.defineProperty(dt, "__esModule", { value: !0 });
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
var be = {}, ht = {}, Ls;
function Du() {
  if (Ls) return ht;
  Ls = 1, Object.defineProperty(ht, "__esModule", { value: !0 });
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
      const n = () => t.remove(f), f = () => o(n);
      t.add(f);
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
var As;
function Cu() {
  if (As) return be;
  As = 1, Object.defineProperty(be, "__esModule", { value: !0 }), be.retryifySync = be.retryifyAsync = void 0;
  const e = Du(), t = (n, f) => function(a) {
    return function r() {
      return e.default.schedule().then((u) => n.apply(void 0, arguments).then((i) => (u(), i), (i) => {
        if (u(), Date.now() >= a)
          throw i;
        if (f(i)) {
          const s = Math.round(100 + 400 * Math.random());
          return new Promise((E) => setTimeout(E, s)).then(() => r.apply(void 0, arguments));
        }
        throw i;
      }));
    };
  };
  be.retryifyAsync = t;
  const o = (n, f) => function(a) {
    return function r() {
      try {
        return n.apply(void 0, arguments);
      } catch (u) {
        if (Date.now() > a)
          throw u;
        if (f(u))
          return r.apply(void 0, arguments);
        throw u;
      }
    };
  };
  return be.retryifySync = o, be;
}
var Fs;
function Rc() {
  if (Fs) return lt;
  Fs = 1, Object.defineProperty(lt, "__esModule", { value: !0 });
  const e = Me, t = Si, o = Tu(), n = bu(), f = Cu(), a = {
    chmodAttempt: o.attemptifyAsync(t.promisify(e.chmod), n.default.onChangeError),
    chownAttempt: o.attemptifyAsync(t.promisify(e.chown), n.default.onChangeError),
    closeAttempt: o.attemptifyAsync(t.promisify(e.close)),
    fsyncAttempt: o.attemptifyAsync(t.promisify(e.fsync)),
    mkdirAttempt: o.attemptifyAsync(t.promisify(e.mkdir)),
    realpathAttempt: o.attemptifyAsync(t.promisify(e.realpath)),
    statAttempt: o.attemptifyAsync(t.promisify(e.stat)),
    unlinkAttempt: o.attemptifyAsync(t.promisify(e.unlink)),
    closeRetry: f.retryifyAsync(t.promisify(e.close), n.default.isRetriableError),
    fsyncRetry: f.retryifyAsync(t.promisify(e.fsync), n.default.isRetriableError),
    openRetry: f.retryifyAsync(t.promisify(e.open), n.default.isRetriableError),
    readFileRetry: f.retryifyAsync(t.promisify(e.readFile), n.default.isRetriableError),
    renameRetry: f.retryifyAsync(t.promisify(e.rename), n.default.isRetriableError),
    statRetry: f.retryifyAsync(t.promisify(e.stat), n.default.isRetriableError),
    writeRetry: f.retryifyAsync(t.promisify(e.write), n.default.isRetriableError),
    chmodSyncAttempt: o.attemptifySync(e.chmodSync, n.default.onChangeError),
    chownSyncAttempt: o.attemptifySync(e.chownSync, n.default.onChangeError),
    closeSyncAttempt: o.attemptifySync(e.closeSync),
    mkdirSyncAttempt: o.attemptifySync(e.mkdirSync),
    realpathSyncAttempt: o.attemptifySync(e.realpathSync),
    statSyncAttempt: o.attemptifySync(e.statSync),
    unlinkSyncAttempt: o.attemptifySync(e.unlinkSync),
    closeSyncRetry: f.retryifySync(e.closeSync, n.default.isRetriableError),
    fsyncSyncRetry: f.retryifySync(e.fsyncSync, n.default.isRetriableError),
    openSyncRetry: f.retryifySync(e.openSync, n.default.isRetriableError),
    readFileSyncRetry: f.retryifySync(e.readFileSync, n.default.isRetriableError),
    renameSyncRetry: f.retryifySync(e.renameSync, n.default.isRetriableError),
    statSyncRetry: f.retryifySync(e.statSync, n.default.isRetriableError),
    writeSyncRetry: f.retryifySync(e.writeSync, n.default.isRetriableError)
  };
  return lt.default = a, lt;
}
var mt = {}, qs;
function Lu() {
  if (qs) return mt;
  qs = 1, Object.defineProperty(mt, "__esModule", { value: !0 });
  const e = {
    isFunction: (t) => typeof t == "function",
    isString: (t) => typeof t == "string",
    isUndefined: (t) => typeof t > "u"
  };
  return mt.default = e, mt;
}
var pt = {}, js;
function Au() {
  if (js) return pt;
  js = 1, Object.defineProperty(pt, "__esModule", { value: !0 });
  const e = {}, t = {
    next: (o) => {
      const n = e[o];
      if (!n)
        return;
      n.shift();
      const f = n[0];
      f ? f(() => t.next(o)) : delete e[o];
    },
    schedule: (o) => new Promise((n) => {
      let f = e[o];
      f || (f = e[o] = []), f.push(n), !(f.length > 1) && n(() => t.next(o));
    })
  };
  return pt.default = t, pt;
}
var yt = {}, ks;
function Fu() {
  if (ks) return yt;
  ks = 1, Object.defineProperty(yt, "__esModule", { value: !0 });
  const e = ie, t = Xe(), o = Rc(), n = {
    store: {},
    create: (f) => {
      const a = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), r = Date.now().toString().slice(-10), u = "tmp-", i = `.${u}${r}${a}`;
      return `${f}${i}`;
    },
    get: (f, a, r = !0) => {
      const u = n.truncate(a(f));
      return u in n.store ? n.get(f, a, r) : (n.store[u] = r, [u, () => delete n.store[u]]);
    },
    purge: (f) => {
      n.store[f] && (delete n.store[f], o.default.unlinkAttempt(f));
    },
    purgeSync: (f) => {
      n.store[f] && (delete n.store[f], o.default.unlinkSyncAttempt(f));
    },
    purgeSyncAll: () => {
      for (const f in n.store)
        n.purgeSync(f);
    },
    truncate: (f) => {
      const a = e.basename(f);
      if (a.length <= t.LIMIT_BASENAME_LENGTH)
        return f;
      const r = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(a);
      if (!r)
        return f;
      const u = a.length - t.LIMIT_BASENAME_LENGTH;
      return `${f.slice(0, -a.length)}${r[1]}${r[2].slice(0, -u)}${r[3]}`;
    }
  };
  return process.on("exit", n.purgeSyncAll), yt.default = n, yt;
}
var Ms;
function qu() {
  if (Ms) return ve;
  Ms = 1, Object.defineProperty(ve, "__esModule", { value: !0 }), ve.writeFileSync = ve.writeFile = ve.readFileSync = ve.readFile = void 0;
  const e = ie, t = Xe(), o = Rc(), n = Lu(), f = Au(), a = Fu();
  function r(E, g = t.DEFAULT_READ_OPTIONS) {
    var p;
    if (n.default.isString(g))
      return r(E, { encoding: g });
    const w = Date.now() + ((p = g.timeout) !== null && p !== void 0 ? p : t.DEFAULT_TIMEOUT_ASYNC);
    return o.default.readFileRetry(w)(E, g);
  }
  ve.readFile = r;
  function u(E, g = t.DEFAULT_READ_OPTIONS) {
    var p;
    if (n.default.isString(g))
      return u(E, { encoding: g });
    const w = Date.now() + ((p = g.timeout) !== null && p !== void 0 ? p : t.DEFAULT_TIMEOUT_SYNC);
    return o.default.readFileSyncRetry(w)(E, g);
  }
  ve.readFileSync = u;
  const i = (E, g, p, w) => {
    if (n.default.isFunction(p))
      return i(E, g, t.DEFAULT_WRITE_OPTIONS, p);
    const $ = s(E, g, p);
    return w && $.then(w, w), $;
  };
  ve.writeFile = i;
  const s = async (E, g, p = t.DEFAULT_WRITE_OPTIONS) => {
    var w;
    if (n.default.isString(p))
      return s(E, g, { encoding: p });
    const $ = Date.now() + ((w = p.timeout) !== null && w !== void 0 ? w : t.DEFAULT_TIMEOUT_ASYNC);
    let l = null, h = null, c = null, m = null, y = null;
    try {
      p.schedule && (l = await p.schedule(E)), h = await f.default.schedule(E), E = await o.default.realpathAttempt(E) || E, [m, c] = a.default.get(E, p.tmpCreate || a.default.create, p.tmpPurge !== !1);
      const v = t.IS_POSIX && n.default.isUndefined(p.chown), _ = n.default.isUndefined(p.mode);
      if (v || _) {
        const R = await o.default.statAttempt(E);
        R && (p = { ...p }, v && (p.chown = { uid: R.uid, gid: R.gid }), _ && (p.mode = R.mode));
      }
      const S = e.dirname(E);
      await o.default.mkdirAttempt(S, {
        mode: t.DEFAULT_FOLDER_MODE,
        recursive: !0
      }), y = await o.default.openRetry($)(m, "w", p.mode || t.DEFAULT_FILE_MODE), p.tmpCreated && p.tmpCreated(m), n.default.isString(g) ? await o.default.writeRetry($)(y, g, 0, p.encoding || t.DEFAULT_ENCODING) : n.default.isUndefined(g) || await o.default.writeRetry($)(y, g, 0, g.length, 0), p.fsync !== !1 && (p.fsyncWait !== !1 ? await o.default.fsyncRetry($)(y) : o.default.fsyncAttempt(y)), await o.default.closeRetry($)(y), y = null, p.chown && await o.default.chownAttempt(m, p.chown.uid, p.chown.gid), p.mode && await o.default.chmodAttempt(m, p.mode);
      try {
        await o.default.renameRetry($)(m, E);
      } catch (R) {
        if (R.code !== "ENAMETOOLONG")
          throw R;
        await o.default.renameRetry($)(m, a.default.truncate(E));
      }
      c(), m = null;
    } finally {
      y && await o.default.closeAttempt(y), m && a.default.purge(m), l && l(), h && h();
    }
  }, d = (E, g, p = t.DEFAULT_WRITE_OPTIONS) => {
    var w;
    if (n.default.isString(p))
      return d(E, g, { encoding: p });
    const $ = Date.now() + ((w = p.timeout) !== null && w !== void 0 ? w : t.DEFAULT_TIMEOUT_SYNC);
    let l = null, h = null, c = null;
    try {
      E = o.default.realpathSyncAttempt(E) || E, [h, l] = a.default.get(E, p.tmpCreate || a.default.create, p.tmpPurge !== !1);
      const m = t.IS_POSIX && n.default.isUndefined(p.chown), y = n.default.isUndefined(p.mode);
      if (m || y) {
        const _ = o.default.statSyncAttempt(E);
        _ && (p = { ...p }, m && (p.chown = { uid: _.uid, gid: _.gid }), y && (p.mode = _.mode));
      }
      const v = e.dirname(E);
      o.default.mkdirSyncAttempt(v, {
        mode: t.DEFAULT_FOLDER_MODE,
        recursive: !0
      }), c = o.default.openSyncRetry($)(h, "w", p.mode || t.DEFAULT_FILE_MODE), p.tmpCreated && p.tmpCreated(h), n.default.isString(g) ? o.default.writeSyncRetry($)(c, g, 0, p.encoding || t.DEFAULT_ENCODING) : n.default.isUndefined(g) || o.default.writeSyncRetry($)(c, g, 0, g.length, 0), p.fsync !== !1 && (p.fsyncWait !== !1 ? o.default.fsyncSyncRetry($)(c) : o.default.fsyncAttempt(c)), o.default.closeSyncRetry($)(c), c = null, p.chown && o.default.chownSyncAttempt(h, p.chown.uid, p.chown.gid), p.mode && o.default.chmodSyncAttempt(h, p.mode);
      try {
        o.default.renameSyncRetry($)(h, E);
      } catch (_) {
        if (_.code !== "ENAMETOOLONG")
          throw _;
        o.default.renameSyncRetry($)(h, a.default.truncate(E));
      }
      l(), h = null;
    } finally {
      c && o.default.closeSyncAttempt(c), h && a.default.purge(h);
    }
  };
  return ve.writeFileSync = d, ve;
}
var Et = { exports: {} }, rn = {}, Re = {}, De = {}, nn = {}, sn = {}, on = {}, Us;
function or() {
  return Us || (Us = 1, function(e) {
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
        return (c = this._str) !== null && c !== void 0 ? c : this._str = this._items.reduce((m, y) => `${m}${y}`, "");
      }
      get names() {
        var c;
        return (c = this._names) !== null && c !== void 0 ? c : this._names = this._items.reduce((m, y) => (y instanceof o && (m[y.str] = (m[y.str] || 0) + 1), m), {});
      }
    }
    e._Code = n, e.nil = new n("");
    function f(h, ...c) {
      const m = [h[0]];
      let y = 0;
      for (; y < c.length; )
        u(m, c[y]), m.push(h[++y]);
      return new n(m);
    }
    e._ = f;
    const a = new n("+");
    function r(h, ...c) {
      const m = [p(h[0])];
      let y = 0;
      for (; y < c.length; )
        m.push(a), u(m, c[y]), m.push(a, p(h[++y]));
      return i(m), new n(m);
    }
    e.str = r;
    function u(h, c) {
      c instanceof n ? h.push(...c._items) : c instanceof o ? h.push(c) : h.push(E(c));
    }
    e.addCodeArg = u;
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
    function E(h) {
      return typeof h == "number" || typeof h == "boolean" || h === null ? h : p(Array.isArray(h) ? h.join(",") : h);
    }
    function g(h) {
      return new n(p(h));
    }
    e.stringify = g;
    function p(h) {
      return JSON.stringify(h).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
    }
    e.safeStringify = p;
    function w(h) {
      return typeof h == "string" && e.IDENTIFIER.test(h) ? new n(`.${h}`) : f`[${h}]`;
    }
    e.getProperty = w;
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
  }(on)), on;
}
var an = {}, xs;
function zs() {
  return xs || (xs = 1, function(e) {
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
    class f {
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
        var d, E;
        if (!((E = (d = this._parent) === null || d === void 0 ? void 0 : d._prefixes) === null || E === void 0) && E.has(s) || this._prefixes && !this._prefixes.has(s))
          throw new Error(`CodeGen: prefix "${s}" is not allowed in this scope`);
        return this._names[s] = { prefix: s, index: 0 };
      }
    }
    e.Scope = f;
    class a extends t.Name {
      constructor(s, d) {
        super(d), this.prefix = s;
      }
      setValue(s, { property: d, itemIndex: E }) {
        this.value = s, this.scopePath = (0, t._)`.${new t.Name(d)}[${E}]`;
      }
    }
    e.ValueScopeName = a;
    const r = (0, t._)`\n`;
    class u extends f {
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
        var E;
        if (d.ref === void 0)
          throw new Error("CodeGen: ref must be passed in value");
        const g = this.toName(s), { prefix: p } = g, w = (E = d.key) !== null && E !== void 0 ? E : d.ref;
        let $ = this._values[p];
        if ($) {
          const c = $.get(w);
          if (c)
            return c;
        } else
          $ = this._values[p] = /* @__PURE__ */ new Map();
        $.set(w, g);
        const l = this._scope[p] || (this._scope[p] = []), h = l.length;
        return l[h] = d.ref, g.setValue(d, { property: p, itemIndex: h }), g;
      }
      getValue(s, d) {
        const E = this._values[s];
        if (E)
          return E.get(d);
      }
      scopeRefs(s, d = this._values) {
        return this._reduceValues(d, (E) => {
          if (E.scopePath === void 0)
            throw new Error(`CodeGen: name "${E}" has no value`);
          return (0, t._)`${s}${E.scopePath}`;
        });
      }
      scopeCode(s = this._values, d, E) {
        return this._reduceValues(s, (g) => {
          if (g.value === void 0)
            throw new Error(`CodeGen: name "${g}" has no value`);
          return g.value.code;
        }, d, E);
      }
      _reduceValues(s, d, E = {}, g) {
        let p = t.nil;
        for (const w in s) {
          const $ = s[w];
          if (!$)
            continue;
          const l = E[w] = E[w] || /* @__PURE__ */ new Map();
          $.forEach((h) => {
            if (l.has(h))
              return;
            l.set(h, n.Started);
            let c = d(h);
            if (c) {
              const m = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
              p = (0, t._)`${p}${m} ${h} = ${c};${this.opts._n}`;
            } else if (c = g?.(h))
              p = (0, t._)`${p}${c}${this.opts._n}`;
            else
              throw new o(h);
            l.set(h, n.Completed);
          });
        }
        return p;
      }
    }
    e.ValueScope = u;
  }(an)), an;
}
var Vs;
function ee() {
  return Vs || (Vs = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
    const t = or(), o = zs();
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
    var f = zs();
    Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
      return f.Scope;
    } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
      return f.ValueScope;
    } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
      return f.ValueScopeName;
    } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
      return f.varKinds;
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
    class u extends a {
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
    class i extends u {
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
    class E extends a {
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
    class g extends a {
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
    class w extends p {
      render(I) {
        return "{" + I._n + super.render(I) + "}" + I._n;
      }
    }
    class $ extends p {
    }
    class l extends w {
    }
    l.kind = "else";
    class h extends w {
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
    class c extends w {
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
    class y extends c {
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
    class v extends c {
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
    class _ extends w {
      constructor(I, O, F) {
        super(), this.name = I, this.args = O, this.async = F;
      }
      render(I) {
        return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(I);
      }
    }
    _.kind = "func";
    class S extends p {
      render(I) {
        return "return " + super.render(I);
      }
    }
    S.kind = "return";
    class R extends w {
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
    class N extends w {
      constructor(I) {
        super(), this.error = I;
      }
      render(I) {
        return `catch(${this.error})` + super.render(I);
      }
    }
    N.kind = "catch";
    class b extends w {
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
        return this._leafNode(new u(I, O, F));
      }
      // `+=` code
      add(I, O) {
        return this._leafNode(new i(I, e.operators.ADD, O));
      }
      // appends passed SafeExpr to code or executes Block
      code(I) {
        return typeof I == "function" ? I() : I !== t.nil && this._leafNode(new g(I)), this;
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
        return this._for(new y(Z, J, O, F), () => B(J));
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
        return this._for(new v("of", B, Z, O), () => F(Z));
      }
      // `for-in` statement.
      // With option `ownProperties` replaced with a `for-of` loop for object keys
      forIn(I, O, F, B = this.opts.es5 ? o.varKinds.var : o.varKinds.const) {
        if (this.opts.ownProperties)
          return this.forOf(I, (0, t._)`Object.keys(${O})`, F);
        const Z = this._scope.toName(I);
        return this._for(new v("in", B, Z, O), () => F(Z));
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
        const O = new S();
        if (this._blockNode(O), this.code(I), O.nodes.length !== 1)
          throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode(S);
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
        return this._leafNode(new E(I));
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
        return this._blockNode(new _(I, O, F)), B && this.code(B).endFunc(), this;
      }
      // end function definition
      endFunc() {
        return this._endBlockNode(_);
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
  }(sn)), sn;
}
var Q = {}, Gs;
function te() {
  if (Gs) return Q;
  Gs = 1, Object.defineProperty(Q, "__esModule", { value: !0 }), Q.checkStrictMode = Q.getErrorPath = Q.Type = Q.useFunc = Q.setEvaluated = Q.evaluatedPropsToName = Q.mergeEvaluated = Q.eachItem = Q.unescapeJsonPointer = Q.escapeJsonPointer = Q.escapeFragment = Q.unescapeFragment = Q.schemaRefOrVal = Q.schemaHasRulesButRef = Q.schemaHasRules = Q.checkUnknownRules = Q.alwaysValidSchema = Q.toHash = void 0;
  const e = ee(), t = or();
  function o(v) {
    const _ = {};
    for (const S of v)
      _[S] = !0;
    return _;
  }
  Q.toHash = o;
  function n(v, _) {
    return typeof _ == "boolean" ? _ : Object.keys(_).length === 0 ? !0 : (f(v, _), !a(_, v.self.RULES.all));
  }
  Q.alwaysValidSchema = n;
  function f(v, _ = v.schema) {
    const { opts: S, self: R } = v;
    if (!S.strictSchema || typeof _ == "boolean")
      return;
    const N = R.RULES.keywords;
    for (const b in _)
      N[b] || y(v, `unknown keyword: "${b}"`);
  }
  Q.checkUnknownRules = f;
  function a(v, _) {
    if (typeof v == "boolean")
      return !v;
    for (const S in v)
      if (_[S])
        return !0;
    return !1;
  }
  Q.schemaHasRules = a;
  function r(v, _) {
    if (typeof v == "boolean")
      return !v;
    for (const S in v)
      if (S !== "$ref" && _.all[S])
        return !0;
    return !1;
  }
  Q.schemaHasRulesButRef = r;
  function u({ topSchemaRef: v, schemaPath: _ }, S, R, N) {
    if (!N) {
      if (typeof S == "number" || typeof S == "boolean")
        return S;
      if (typeof S == "string")
        return (0, e._)`${S}`;
    }
    return (0, e._)`${v}${_}${(0, e.getProperty)(R)}`;
  }
  Q.schemaRefOrVal = u;
  function i(v) {
    return E(decodeURIComponent(v));
  }
  Q.unescapeFragment = i;
  function s(v) {
    return encodeURIComponent(d(v));
  }
  Q.escapeFragment = s;
  function d(v) {
    return typeof v == "number" ? `${v}` : v.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  Q.escapeJsonPointer = d;
  function E(v) {
    return v.replace(/~1/g, "/").replace(/~0/g, "~");
  }
  Q.unescapeJsonPointer = E;
  function g(v, _) {
    if (Array.isArray(v))
      for (const S of v)
        _(S);
    else
      _(v);
  }
  Q.eachItem = g;
  function p({ mergeNames: v, mergeToName: _, mergeValues: S, resultToName: R }) {
    return (N, b, M, G) => {
      const k = M === void 0 ? b : M instanceof e.Name ? (b instanceof e.Name ? v(N, b, M) : _(N, b, M), M) : b instanceof e.Name ? (_(N, M, b), b) : S(b, M);
      return G === e.Name && !(k instanceof e.Name) ? R(N, k) : k;
    };
  }
  Q.mergeEvaluated = {
    props: p({
      mergeNames: (v, _, S) => v.if((0, e._)`${S} !== true && ${_} !== undefined`, () => {
        v.if((0, e._)`${_} === true`, () => v.assign(S, !0), () => v.assign(S, (0, e._)`${S} || {}`).code((0, e._)`Object.assign(${S}, ${_})`));
      }),
      mergeToName: (v, _, S) => v.if((0, e._)`${S} !== true`, () => {
        _ === !0 ? v.assign(S, !0) : (v.assign(S, (0, e._)`${S} || {}`), $(v, S, _));
      }),
      mergeValues: (v, _) => v === !0 ? !0 : { ...v, ..._ },
      resultToName: w
    }),
    items: p({
      mergeNames: (v, _, S) => v.if((0, e._)`${S} !== true && ${_} !== undefined`, () => v.assign(S, (0, e._)`${_} === true ? true : ${S} > ${_} ? ${S} : ${_}`)),
      mergeToName: (v, _, S) => v.if((0, e._)`${S} !== true`, () => v.assign(S, _ === !0 ? !0 : (0, e._)`${S} > ${_} ? ${S} : ${_}`)),
      mergeValues: (v, _) => v === !0 ? !0 : Math.max(v, _),
      resultToName: (v, _) => v.var("items", _)
    })
  };
  function w(v, _) {
    if (_ === !0)
      return v.var("props", !0);
    const S = v.var("props", (0, e._)`{}`);
    return _ !== void 0 && $(v, S, _), S;
  }
  Q.evaluatedPropsToName = w;
  function $(v, _, S) {
    Object.keys(S).forEach((R) => v.assign((0, e._)`${_}${(0, e.getProperty)(R)}`, !0));
  }
  Q.setEvaluated = $;
  const l = {};
  function h(v, _) {
    return v.scopeValue("func", {
      ref: _,
      code: l[_.code] || (l[_.code] = new t._Code(_.code))
    });
  }
  Q.useFunc = h;
  var c;
  (function(v) {
    v[v.Num = 0] = "Num", v[v.Str = 1] = "Str";
  })(c || (Q.Type = c = {}));
  function m(v, _, S) {
    if (v instanceof e.Name) {
      const R = _ === c.Num;
      return S ? R ? (0, e._)`"[" + ${v} + "]"` : (0, e._)`"['" + ${v} + "']"` : R ? (0, e._)`"/" + ${v}` : (0, e._)`"/" + ${v}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
    }
    return S ? (0, e.getProperty)(v).toString() : "/" + d(v);
  }
  Q.getErrorPath = m;
  function y(v, _, S = v.opts.strictSchema) {
    if (S) {
      if (_ = `strict mode: ${_}`, S === !0)
        throw new Error(_);
      v.self.logger.warn(_);
    }
  }
  return Q.checkStrictMode = y, Q;
}
var vt = {}, Hs;
function Pe() {
  if (Hs) return vt;
  Hs = 1, Object.defineProperty(vt, "__esModule", { value: !0 });
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
var Bs;
function ur() {
  return Bs || (Bs = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
    const t = ee(), o = te(), n = Pe();
    e.keywordError = {
      message: ({ keyword: l }) => (0, t.str)`must pass "${l}" keyword validation`
    }, e.keyword$DataError = {
      message: ({ keyword: l, schemaType: h }) => h ? (0, t.str)`"${l}" keyword must be ${h} ($data)` : (0, t.str)`"${l}" keyword is invalid ($data)`
    };
    function f(l, h = e.keywordError, c, m) {
      const { it: y } = l, { gen: v, compositeRule: _, allErrors: S } = y, R = E(l, h, c);
      m ?? (_ || S) ? i(v, R) : s(y, (0, t._)`[${R}]`);
    }
    e.reportError = f;
    function a(l, h = e.keywordError, c) {
      const { it: m } = l, { gen: y, compositeRule: v, allErrors: _ } = m, S = E(l, h, c);
      i(y, S), v || _ || s(m, n.default.vErrors);
    }
    e.reportExtraError = a;
    function r(l, h) {
      l.assign(n.default.errors, h), l.if((0, t._)`${n.default.vErrors} !== null`, () => l.if(h, () => l.assign((0, t._)`${n.default.vErrors}.length`, h), () => l.assign(n.default.vErrors, null)));
    }
    e.resetErrorsCount = r;
    function u({ gen: l, keyword: h, schemaValue: c, data: m, errsCount: y, it: v }) {
      if (y === void 0)
        throw new Error("ajv implementation error");
      const _ = l.name("err");
      l.forRange("i", y, n.default.errors, (S) => {
        l.const(_, (0, t._)`${n.default.vErrors}[${S}]`), l.if((0, t._)`${_}.instancePath === undefined`, () => l.assign((0, t._)`${_}.instancePath`, (0, t.strConcat)(n.default.instancePath, v.errorPath))), l.assign((0, t._)`${_}.schemaPath`, (0, t.str)`${v.errSchemaPath}/${h}`), v.opts.verbose && (l.assign((0, t._)`${_}.schema`, c), l.assign((0, t._)`${_}.data`, m));
      });
    }
    e.extendErrors = u;
    function i(l, h) {
      const c = l.const("err", h);
      l.if((0, t._)`${n.default.vErrors} === null`, () => l.assign(n.default.vErrors, (0, t._)`[${c}]`), (0, t._)`${n.default.vErrors}.push(${c})`), l.code((0, t._)`${n.default.errors}++`);
    }
    function s(l, h) {
      const { gen: c, validateName: m, schemaEnv: y } = l;
      y.$async ? c.throw((0, t._)`new ${l.ValidationError}(${h})`) : (c.assign((0, t._)`${m}.errors`, h), c.return(!1));
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
    function E(l, h, c) {
      const { createErrors: m } = l.it;
      return m === !1 ? (0, t._)`{}` : g(l, h, c);
    }
    function g(l, h, c = {}) {
      const { gen: m, it: y } = l, v = [
        p(y, c),
        w(l, c)
      ];
      return $(l, h, v), m.object(...v);
    }
    function p({ errorPath: l }, { instancePath: h }) {
      const c = h ? (0, t.str)`${l}${(0, o.getErrorPath)(h, o.Type.Str)}` : l;
      return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, c)];
    }
    function w({ keyword: l, it: { errSchemaPath: h } }, { schemaPath: c, parentSchema: m }) {
      let y = m ? h : (0, t.str)`${h}/${l}`;
      return c && (y = (0, t.str)`${y}${(0, o.getErrorPath)(c, o.Type.Str)}`), [d.schemaPath, y];
    }
    function $(l, { params: h, message: c }, m) {
      const { keyword: y, data: v, schemaValue: _, it: S } = l, { opts: R, propertyName: N, topSchemaRef: b, schemaPath: M } = S;
      m.push([d.keyword, y], [d.params, typeof h == "function" ? h(l) : h || (0, t._)`{}`]), R.messages && m.push([d.message, typeof c == "function" ? c(l) : c]), R.verbose && m.push([d.schema, _], [d.parentSchema, (0, t._)`${b}${M}`], [n.default.data, v]), N && m.push([d.propertyName, N]);
    }
  }(nn)), nn;
}
var Ks;
function ju() {
  if (Ks) return De;
  Ks = 1, Object.defineProperty(De, "__esModule", { value: !0 }), De.boolOrEmptySchema = De.topBoolOrEmptySchema = void 0;
  const e = ur(), t = ee(), o = Pe(), n = {
    message: "boolean schema is false"
  };
  function f(u) {
    const { gen: i, schema: s, validateName: d } = u;
    s === !1 ? r(u, !1) : typeof s == "object" && s.$async === !0 ? i.return(o.default.data) : (i.assign((0, t._)`${d}.errors`, null), i.return(!0));
  }
  De.topBoolOrEmptySchema = f;
  function a(u, i) {
    const { gen: s, schema: d } = u;
    d === !1 ? (s.var(i, !1), r(u)) : s.var(i, !0);
  }
  De.boolOrEmptySchema = a;
  function r(u, i) {
    const { gen: s, data: d } = u, E = {
      gen: s,
      keyword: "false schema",
      data: d,
      schema: !1,
      schemaCode: !1,
      schemaValue: !1,
      params: {},
      it: u
    };
    (0, e.reportError)(E, n, void 0, i);
  }
  return De;
}
var ae = {}, Ce = {}, Ws;
function Ic() {
  if (Ws) return Ce;
  Ws = 1, Object.defineProperty(Ce, "__esModule", { value: !0 }), Ce.getRules = Ce.isJSONType = void 0;
  const e = ["string", "number", "integer", "boolean", "null", "object", "array"], t = new Set(e);
  function o(f) {
    return typeof f == "string" && t.has(f);
  }
  Ce.isJSONType = o;
  function n() {
    const f = {
      number: { type: "number", rules: [] },
      string: { type: "string", rules: [] },
      array: { type: "array", rules: [] },
      object: { type: "object", rules: [] }
    };
    return {
      types: { ...f, integer: !0, boolean: !0, null: !0 },
      rules: [{ rules: [] }, f.number, f.string, f.array, f.object],
      post: { rules: [] },
      all: {},
      keywords: {}
    };
  }
  return Ce.getRules = n, Ce;
}
var Ie = {}, Zs;
function Nc() {
  if (Zs) return Ie;
  Zs = 1, Object.defineProperty(Ie, "__esModule", { value: !0 }), Ie.shouldUseRule = Ie.shouldUseGroup = Ie.schemaHasRulesForType = void 0;
  function e({ schema: n, self: f }, a) {
    const r = f.RULES.types[a];
    return r && r !== !0 && t(n, r);
  }
  Ie.schemaHasRulesForType = e;
  function t(n, f) {
    return f.rules.some((a) => o(n, a));
  }
  Ie.shouldUseGroup = t;
  function o(n, f) {
    var a;
    return n[f.keyword] !== void 0 || ((a = f.definition.implements) === null || a === void 0 ? void 0 : a.some((r) => n[r] !== void 0));
  }
  return Ie.shouldUseRule = o, Ie;
}
var Xs;
function ar() {
  if (Xs) return ae;
  Xs = 1, Object.defineProperty(ae, "__esModule", { value: !0 }), ae.reportTypeError = ae.checkDataTypes = ae.checkDataType = ae.coerceAndCheckDataType = ae.getJSONTypes = ae.getSchemaTypes = ae.DataType = void 0;
  const e = Ic(), t = Nc(), o = ur(), n = ee(), f = te();
  var a;
  (function(c) {
    c[c.Correct = 0] = "Correct", c[c.Wrong = 1] = "Wrong";
  })(a || (ae.DataType = a = {}));
  function r(c) {
    const m = u(c.type);
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
  function u(c) {
    const m = Array.isArray(c) ? c : c ? [c] : [];
    if (m.every(e.isJSONType))
      return m;
    throw new Error("type must be JSONType or JSONType[]: " + m.join(","));
  }
  ae.getJSONTypes = u;
  function i(c, m) {
    const { gen: y, data: v, opts: _ } = c, S = d(m, _.coerceTypes), R = m.length > 0 && !(S.length === 0 && m.length === 1 && (0, t.schemaHasRulesForType)(c, m[0]));
    if (R) {
      const N = w(m, v, _.strictNumbers, a.Wrong);
      y.if(N, () => {
        S.length ? E(c, m, S) : l(c);
      });
    }
    return R;
  }
  ae.coerceAndCheckDataType = i;
  const s = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
  function d(c, m) {
    return m ? c.filter((y) => s.has(y) || m === "array" && y === "array") : [];
  }
  function E(c, m, y) {
    const { gen: v, data: _, opts: S } = c, R = v.let("dataType", (0, n._)`typeof ${_}`), N = v.let("coerced", (0, n._)`undefined`);
    S.coerceTypes === "array" && v.if((0, n._)`${R} == 'object' && Array.isArray(${_}) && ${_}.length == 1`, () => v.assign(_, (0, n._)`${_}[0]`).assign(R, (0, n._)`typeof ${_}`).if(w(m, _, S.strictNumbers), () => v.assign(N, _))), v.if((0, n._)`${N} !== undefined`);
    for (const M of y)
      (s.has(M) || M === "array" && S.coerceTypes === "array") && b(M);
    v.else(), l(c), v.endIf(), v.if((0, n._)`${N} !== undefined`, () => {
      v.assign(_, N), g(c, N);
    });
    function b(M) {
      switch (M) {
        case "string":
          v.elseIf((0, n._)`${R} == "number" || ${R} == "boolean"`).assign(N, (0, n._)`"" + ${_}`).elseIf((0, n._)`${_} === null`).assign(N, (0, n._)`""`);
          return;
        case "number":
          v.elseIf((0, n._)`${R} == "boolean" || ${_} === null
              || (${R} == "string" && ${_} && ${_} == +${_})`).assign(N, (0, n._)`+${_}`);
          return;
        case "integer":
          v.elseIf((0, n._)`${R} === "boolean" || ${_} === null
              || (${R} === "string" && ${_} && ${_} == +${_} && !(${_} % 1))`).assign(N, (0, n._)`+${_}`);
          return;
        case "boolean":
          v.elseIf((0, n._)`${_} === "false" || ${_} === 0 || ${_} === null`).assign(N, !1).elseIf((0, n._)`${_} === "true" || ${_} === 1`).assign(N, !0);
          return;
        case "null":
          v.elseIf((0, n._)`${_} === "" || ${_} === 0 || ${_} === false`), v.assign(N, null);
          return;
        case "array":
          v.elseIf((0, n._)`${R} === "string" || ${R} === "number"
              || ${R} === "boolean" || ${_} === null`).assign(N, (0, n._)`[${_}]`);
      }
    }
  }
  function g({ gen: c, parentData: m, parentDataProperty: y }, v) {
    c.if((0, n._)`${m} !== undefined`, () => c.assign((0, n._)`${m}[${y}]`, v));
  }
  function p(c, m, y, v = a.Correct) {
    const _ = v === a.Correct ? n.operators.EQ : n.operators.NEQ;
    let S;
    switch (c) {
      case "null":
        return (0, n._)`${m} ${_} null`;
      case "array":
        S = (0, n._)`Array.isArray(${m})`;
        break;
      case "object":
        S = (0, n._)`${m} && typeof ${m} == "object" && !Array.isArray(${m})`;
        break;
      case "integer":
        S = R((0, n._)`!(${m} % 1) && !isNaN(${m})`);
        break;
      case "number":
        S = R();
        break;
      default:
        return (0, n._)`typeof ${m} ${_} ${c}`;
    }
    return v === a.Correct ? S : (0, n.not)(S);
    function R(N = n.nil) {
      return (0, n.and)((0, n._)`typeof ${m} == "number"`, N, y ? (0, n._)`isFinite(${m})` : n.nil);
    }
  }
  ae.checkDataType = p;
  function w(c, m, y, v) {
    if (c.length === 1)
      return p(c[0], m, y, v);
    let _;
    const S = (0, f.toHash)(c);
    if (S.array && S.object) {
      const R = (0, n._)`typeof ${m} != "object"`;
      _ = S.null ? R : (0, n._)`!${m} || ${R}`, delete S.null, delete S.array, delete S.object;
    } else
      _ = n.nil;
    S.number && delete S.integer;
    for (const R in S)
      _ = (0, n.and)(_, p(R, m, y, v));
    return _;
  }
  ae.checkDataTypes = w;
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
    const { gen: m, data: y, schema: v } = c, _ = (0, f.schemaRefOrVal)(c, v, "type");
    return {
      gen: m,
      keyword: "type",
      data: y,
      schema: v.type,
      schemaCode: _,
      schemaValue: _,
      parentSchema: v,
      params: {},
      it: c
    };
  }
  return ae;
}
var Ve = {}, Js;
function ku() {
  if (Js) return Ve;
  Js = 1, Object.defineProperty(Ve, "__esModule", { value: !0 }), Ve.assignDefaults = void 0;
  const e = ee(), t = te();
  function o(f, a) {
    const { properties: r, items: u } = f.schema;
    if (a === "object" && r)
      for (const i in r)
        n(f, i, r[i].default);
    else a === "array" && Array.isArray(u) && u.forEach((i, s) => n(f, s, i.default));
  }
  Ve.assignDefaults = o;
  function n(f, a, r) {
    const { gen: u, compositeRule: i, data: s, opts: d } = f;
    if (r === void 0)
      return;
    const E = (0, e._)`${s}${(0, e.getProperty)(a)}`;
    if (i) {
      (0, t.checkStrictMode)(f, `default is ignored for: ${E}`);
      return;
    }
    let g = (0, e._)`${E} === undefined`;
    d.useDefaults === "empty" && (g = (0, e._)`${g} || ${E} === null || ${E} === ""`), u.if(g, (0, e._)`${E} = ${(0, e.stringify)(r)}`);
  }
  return Ve;
}
var ge = {}, re = {}, Ys;
function _e() {
  if (Ys) return re;
  Ys = 1, Object.defineProperty(re, "__esModule", { value: !0 }), re.validateUnion = re.validateArray = re.usePattern = re.callValidateCode = re.schemaProperties = re.allSchemaProperties = re.noPropertyInData = re.propertyInData = re.isOwnProperty = re.hasPropFunc = re.reportMissingProp = re.checkMissingProp = re.checkReportMissingProp = void 0;
  const e = ee(), t = te(), o = Pe(), n = te();
  function f(c, m) {
    const { gen: y, data: v, it: _ } = c;
    y.if(d(y, v, m, _.opts.ownProperties), () => {
      c.setParams({ missingProperty: (0, e._)`${m}` }, !0), c.error();
    });
  }
  re.checkReportMissingProp = f;
  function a({ gen: c, data: m, it: { opts: y } }, v, _) {
    return (0, e.or)(...v.map((S) => (0, e.and)(d(c, m, S, y.ownProperties), (0, e._)`${_} = ${S}`)));
  }
  re.checkMissingProp = a;
  function r(c, m) {
    c.setParams({ missingProperty: m }, !0), c.error();
  }
  re.reportMissingProp = r;
  function u(c) {
    return c.scopeValue("func", {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      ref: Object.prototype.hasOwnProperty,
      code: (0, e._)`Object.prototype.hasOwnProperty`
    });
  }
  re.hasPropFunc = u;
  function i(c, m, y) {
    return (0, e._)`${u(c)}.call(${m}, ${y})`;
  }
  re.isOwnProperty = i;
  function s(c, m, y, v) {
    const _ = (0, e._)`${m}${(0, e.getProperty)(y)} !== undefined`;
    return v ? (0, e._)`${_} && ${i(c, m, y)}` : _;
  }
  re.propertyInData = s;
  function d(c, m, y, v) {
    const _ = (0, e._)`${m}${(0, e.getProperty)(y)} === undefined`;
    return v ? (0, e.or)(_, (0, e.not)(i(c, m, y))) : _;
  }
  re.noPropertyInData = d;
  function E(c) {
    return c ? Object.keys(c).filter((m) => m !== "__proto__") : [];
  }
  re.allSchemaProperties = E;
  function g(c, m) {
    return E(m).filter((y) => !(0, t.alwaysValidSchema)(c, m[y]));
  }
  re.schemaProperties = g;
  function p({ schemaCode: c, data: m, it: { gen: y, topSchemaRef: v, schemaPath: _, errorPath: S }, it: R }, N, b, M) {
    const G = M ? (0, e._)`${c}, ${m}, ${v}${_}` : m, k = [
      [o.default.instancePath, (0, e.strConcat)(o.default.instancePath, S)],
      [o.default.parentData, R.parentData],
      [o.default.parentDataProperty, R.parentDataProperty],
      [o.default.rootData, o.default.rootData]
    ];
    R.opts.dynamicRef && k.push([o.default.dynamicAnchors, o.default.dynamicAnchors]);
    const U = (0, e._)`${G}, ${y.object(...k)}`;
    return b !== e.nil ? (0, e._)`${N}.call(${b}, ${U})` : (0, e._)`${N}(${U})`;
  }
  re.callValidateCode = p;
  const w = (0, e._)`new RegExp`;
  function $({ gen: c, it: { opts: m } }, y) {
    const v = m.unicodeRegExp ? "u" : "", { regExp: _ } = m.code, S = _(y, v);
    return c.scopeValue("pattern", {
      key: S.toString(),
      ref: S,
      code: (0, e._)`${_.code === "new RegExp" ? w : (0, n.useFunc)(c, _)}(${y}, ${v})`
    });
  }
  re.usePattern = $;
  function l(c) {
    const { gen: m, data: y, keyword: v, it: _ } = c, S = m.name("valid");
    if (_.allErrors) {
      const N = m.let("valid", !0);
      return R(() => m.assign(N, !1)), N;
    }
    return m.var(S, !0), R(() => m.break()), S;
    function R(N) {
      const b = m.const("len", (0, e._)`${y}.length`);
      m.forRange("i", 0, b, (M) => {
        c.subschema({
          keyword: v,
          dataProp: M,
          dataPropType: t.Type.Num
        }, S), m.if((0, e.not)(S), N);
      });
    }
  }
  re.validateArray = l;
  function h(c) {
    const { gen: m, schema: y, keyword: v, it: _ } = c;
    if (!Array.isArray(y))
      throw new Error("ajv implementation error");
    if (y.some((b) => (0, t.alwaysValidSchema)(_, b)) && !_.opts.unevaluated)
      return;
    const R = m.let("valid", !1), N = m.name("_valid");
    m.block(() => y.forEach((b, M) => {
      const G = c.subschema({
        keyword: v,
        schemaProp: M,
        compositeRule: !0
      }, N);
      m.assign(R, (0, e._)`${R} || ${N}`), c.mergeValidEvaluated(G, N) || m.if((0, e.not)(R));
    })), c.result(R, () => c.reset(), () => c.error(!0));
  }
  return re.validateUnion = h, re;
}
var Qs;
function Mu() {
  if (Qs) return ge;
  Qs = 1, Object.defineProperty(ge, "__esModule", { value: !0 }), ge.validateKeywordUsage = ge.validSchemaType = ge.funcKeywordCode = ge.macroKeywordCode = void 0;
  const e = ee(), t = Pe(), o = _e(), n = ur();
  function f(g, p) {
    const { gen: w, keyword: $, schema: l, parentSchema: h, it: c } = g, m = p.macro.call(c.self, l, h, c), y = s(w, $, m);
    c.opts.validateSchema !== !1 && c.self.validateSchema(m, !0);
    const v = w.name("valid");
    g.subschema({
      schema: m,
      schemaPath: e.nil,
      errSchemaPath: `${c.errSchemaPath}/${$}`,
      topSchemaRef: y,
      compositeRule: !0
    }, v), g.pass(v, () => g.error(!0));
  }
  ge.macroKeywordCode = f;
  function a(g, p) {
    var w;
    const { gen: $, keyword: l, schema: h, parentSchema: c, $data: m, it: y } = g;
    i(y, p);
    const v = !m && p.compile ? p.compile.call(y.self, h, c, y) : p.validate, _ = s($, l, v), S = $.let("valid");
    g.block$data(S, R), g.ok((w = p.valid) !== null && w !== void 0 ? w : S);
    function R() {
      if (p.errors === !1)
        M(), p.modifying && r(g), G(() => g.error());
      else {
        const k = p.async ? N() : b();
        p.modifying && r(g), G(() => u(g, k));
      }
    }
    function N() {
      const k = $.let("ruleErrs", null);
      return $.try(() => M((0, e._)`await `), (U) => $.assign(S, !1).if((0, e._)`${U} instanceof ${y.ValidationError}`, () => $.assign(k, (0, e._)`${U}.errors`), () => $.throw(U))), k;
    }
    function b() {
      const k = (0, e._)`${_}.errors`;
      return $.assign(k, null), M(e.nil), k;
    }
    function M(k = p.async ? (0, e._)`await ` : e.nil) {
      const U = y.opts.passContext ? t.default.this : t.default.self, x = !("compile" in p && !m || p.schema === !1);
      $.assign(S, (0, e._)`${k}${(0, o.callValidateCode)(g, _, U, x)}`, p.modifying);
    }
    function G(k) {
      var U;
      $.if((0, e.not)((U = p.valid) !== null && U !== void 0 ? U : S), k);
    }
  }
  ge.funcKeywordCode = a;
  function r(g) {
    const { gen: p, data: w, it: $ } = g;
    p.if($.parentData, () => p.assign(w, (0, e._)`${$.parentData}[${$.parentDataProperty}]`));
  }
  function u(g, p) {
    const { gen: w } = g;
    w.if((0, e._)`Array.isArray(${p})`, () => {
      w.assign(t.default.vErrors, (0, e._)`${t.default.vErrors} === null ? ${p} : ${t.default.vErrors}.concat(${p})`).assign(t.default.errors, (0, e._)`${t.default.vErrors}.length`), (0, n.extendErrors)(g);
    }, () => g.error());
  }
  function i({ schemaEnv: g }, p) {
    if (p.async && !g.$async)
      throw new Error("async keyword in sync schema");
  }
  function s(g, p, w) {
    if (w === void 0)
      throw new Error(`keyword "${p}" failed to compile`);
    return g.scopeValue("keyword", typeof w == "function" ? { ref: w } : { ref: w, code: (0, e.stringify)(w) });
  }
  function d(g, p, w = !1) {
    return !p.length || p.some(($) => $ === "array" ? Array.isArray(g) : $ === "object" ? g && typeof g == "object" && !Array.isArray(g) : typeof g == $ || w && typeof g > "u");
  }
  ge.validSchemaType = d;
  function E({ schema: g, opts: p, self: w, errSchemaPath: $ }, l, h) {
    if (Array.isArray(l.keyword) ? !l.keyword.includes(h) : l.keyword !== h)
      throw new Error("ajv implementation error");
    const c = l.dependencies;
    if (c?.some((m) => !Object.prototype.hasOwnProperty.call(g, m)))
      throw new Error(`parent schema must have dependencies of ${h}: ${c.join(",")}`);
    if (l.validateSchema && !l.validateSchema(g[h])) {
      const y = `keyword "${h}" value is invalid at path "${$}": ` + w.errorsText(l.validateSchema.errors);
      if (p.validateSchema === "log")
        w.logger.error(y);
      else
        throw new Error(y);
    }
  }
  return ge.validateKeywordUsage = E, ge;
}
var Ne = {}, eo;
function Uu() {
  if (eo) return Ne;
  eo = 1, Object.defineProperty(Ne, "__esModule", { value: !0 }), Ne.extendSubschemaMode = Ne.extendSubschemaData = Ne.getSubschema = void 0;
  const e = ee(), t = te();
  function o(a, { keyword: r, schemaProp: u, schema: i, schemaPath: s, errSchemaPath: d, topSchemaRef: E }) {
    if (r !== void 0 && i !== void 0)
      throw new Error('both "keyword" and "schema" passed, only one allowed');
    if (r !== void 0) {
      const g = a.schema[r];
      return u === void 0 ? {
        schema: g,
        schemaPath: (0, e._)`${a.schemaPath}${(0, e.getProperty)(r)}`,
        errSchemaPath: `${a.errSchemaPath}/${r}`
      } : {
        schema: g[u],
        schemaPath: (0, e._)`${a.schemaPath}${(0, e.getProperty)(r)}${(0, e.getProperty)(u)}`,
        errSchemaPath: `${a.errSchemaPath}/${r}/${(0, t.escapeFragment)(u)}`
      };
    }
    if (i !== void 0) {
      if (s === void 0 || d === void 0 || E === void 0)
        throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
      return {
        schema: i,
        schemaPath: s,
        topSchemaRef: E,
        errSchemaPath: d
      };
    }
    throw new Error('either "keyword" or "schema" must be passed');
  }
  Ne.getSubschema = o;
  function n(a, r, { dataProp: u, dataPropType: i, data: s, dataTypes: d, propertyName: E }) {
    if (s !== void 0 && u !== void 0)
      throw new Error('both "data" and "dataProp" passed, only one allowed');
    const { gen: g } = r;
    if (u !== void 0) {
      const { errorPath: w, dataPathArr: $, opts: l } = r, h = g.let("data", (0, e._)`${r.data}${(0, e.getProperty)(u)}`, !0);
      p(h), a.errorPath = (0, e.str)`${w}${(0, t.getErrorPath)(u, i, l.jsPropertySyntax)}`, a.parentDataProperty = (0, e._)`${u}`, a.dataPathArr = [...$, a.parentDataProperty];
    }
    if (s !== void 0) {
      const w = s instanceof e.Name ? s : g.let("data", s, !0);
      p(w), E !== void 0 && (a.propertyName = E);
    }
    d && (a.dataTypes = d);
    function p(w) {
      a.data = w, a.dataLevel = r.dataLevel + 1, a.dataTypes = [], r.definedProperties = /* @__PURE__ */ new Set(), a.parentData = r.data, a.dataNames = [...r.dataNames, w];
    }
  }
  Ne.extendSubschemaData = n;
  function f(a, { jtdDiscriminator: r, jtdMetadata: u, compositeRule: i, createErrors: s, allErrors: d }) {
    i !== void 0 && (a.compositeRule = i), s !== void 0 && (a.createErrors = s), d !== void 0 && (a.allErrors = d), a.jtdDiscriminator = r, a.jtdMetadata = u;
  }
  return Ne.extendSubschemaMode = f, Ne;
}
var ue = {}, cn, to;
function Oc() {
  return to || (to = 1, cn = function e(t, o) {
    if (t === o) return !0;
    if (t && o && typeof t == "object" && typeof o == "object") {
      if (t.constructor !== o.constructor) return !1;
      var n, f, a;
      if (Array.isArray(t)) {
        if (n = t.length, n != o.length) return !1;
        for (f = n; f-- !== 0; )
          if (!e(t[f], o[f])) return !1;
        return !0;
      }
      if (t.constructor === RegExp) return t.source === o.source && t.flags === o.flags;
      if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === o.valueOf();
      if (t.toString !== Object.prototype.toString) return t.toString() === o.toString();
      if (a = Object.keys(t), n = a.length, n !== Object.keys(o).length) return !1;
      for (f = n; f-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(o, a[f])) return !1;
      for (f = n; f-- !== 0; ) {
        var r = a[f];
        if (!e(t[r], o[r])) return !1;
      }
      return !0;
    }
    return t !== t && o !== o;
  }), cn;
}
var un = { exports: {} }, ro;
function xu() {
  if (ro) return un.exports;
  ro = 1;
  var e = un.exports = function(n, f, a) {
    typeof f == "function" && (a = f, f = {}), a = f.cb || a;
    var r = typeof a == "function" ? a : a.pre || function() {
    }, u = a.post || function() {
    };
    t(f, r, u, n, "", n);
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
  function t(n, f, a, r, u, i, s, d, E, g) {
    if (r && typeof r == "object" && !Array.isArray(r)) {
      f(r, u, i, s, d, E, g);
      for (var p in r) {
        var w = r[p];
        if (Array.isArray(w)) {
          if (p in e.arrayKeywords)
            for (var $ = 0; $ < w.length; $++)
              t(n, f, a, w[$], u + "/" + p + "/" + $, i, u, p, r, $);
        } else if (p in e.propsKeywords) {
          if (w && typeof w == "object")
            for (var l in w)
              t(n, f, a, w[l], u + "/" + p + "/" + o(l), i, u, p, r, l);
        } else (p in e.keywords || n.allKeys && !(p in e.skipKeywords)) && t(n, f, a, w, u + "/" + p, i, u, p, r);
      }
      a(r, u, i, s, d, E, g);
    }
  }
  function o(n) {
    return n.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  return un.exports;
}
var no;
function fr() {
  if (no) return ue;
  no = 1, Object.defineProperty(ue, "__esModule", { value: !0 }), ue.getSchemaRefs = ue.resolveUrl = ue.normalizeId = ue._getFullPath = ue.getFullPath = ue.inlineRef = void 0;
  const e = te(), t = Oc(), o = xu(), n = /* @__PURE__ */ new Set([
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
  function f($, l = !0) {
    return typeof $ == "boolean" ? !0 : l === !0 ? !r($) : l ? u($) <= l : !1;
  }
  ue.inlineRef = f;
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
  function u($) {
    let l = 0;
    for (const h in $) {
      if (h === "$ref")
        return 1 / 0;
      if (l++, !n.has(h) && (typeof $[h] == "object" && (0, e.eachItem)($[h], (c) => l += u(c)), l === 1 / 0))
        return 1 / 0;
    }
    return l;
  }
  function i($, l = "", h) {
    h !== !1 && (l = E(l));
    const c = $.parse(l);
    return s($, c);
  }
  ue.getFullPath = i;
  function s($, l) {
    return $.serialize(l).split("#")[0] + "#";
  }
  ue._getFullPath = s;
  const d = /#\/?$/;
  function E($) {
    return $ ? $.replace(d, "") : "";
  }
  ue.normalizeId = E;
  function g($, l, h) {
    return h = E(h), $.resolve(l, h);
  }
  ue.resolveUrl = g;
  const p = /^[a-z_][-a-z0-9._]*$/i;
  function w($, l) {
    if (typeof $ == "boolean")
      return {};
    const { schemaId: h, uriResolver: c } = this.opts, m = E($[h] || l), y = { "": m }, v = i(c, m, !1), _ = {}, S = /* @__PURE__ */ new Set();
    return o($, { allKeys: !0 }, (b, M, G, k) => {
      if (k === void 0)
        return;
      const U = v + M;
      let x = y[k];
      typeof b[h] == "string" && (x = K.call(this, b[h])), V.call(this, b.$anchor), V.call(this, b.$dynamicAnchor), y[M] = x;
      function K(C) {
        const j = this.opts.uriResolver.resolve;
        if (C = E(x ? j(x, C) : C), S.has(C))
          throw N(C);
        S.add(C);
        let T = this.refs[C];
        return typeof T == "string" && (T = this.refs[T]), typeof T == "object" ? R(b, T.schema, C) : C !== E(U) && (C[0] === "#" ? (R(b, _[C], C), _[C] = b) : this.refs[C] = U), C;
      }
      function V(C) {
        if (typeof C == "string") {
          if (!p.test(C))
            throw new Error(`invalid anchor "${C}"`);
          K.call(this, `#${C}`);
        }
      }
    }), _;
    function R(b, M, G) {
      if (M !== void 0 && !t(b, M))
        throw N(G);
    }
    function N(b) {
      return new Error(`reference "${b}" resolves to more than one schema`);
    }
  }
  return ue.getSchemaRefs = w, ue;
}
var io;
function lr() {
  if (io) return Re;
  io = 1, Object.defineProperty(Re, "__esModule", { value: !0 }), Re.getData = Re.KeywordCxt = Re.validateFunctionCode = void 0;
  const e = ju(), t = ar(), o = Nc(), n = ar(), f = ku(), a = Mu(), r = Uu(), u = ee(), i = Pe(), s = fr(), d = te(), E = ur();
  function g(D) {
    if (v(D) && (S(D), y(D))) {
      l(D);
      return;
    }
    p(D, () => (0, e.topBoolOrEmptySchema)(D));
  }
  Re.validateFunctionCode = g;
  function p({ gen: D, validateName: A, schema: z, schemaEnv: H, opts: W }, Y) {
    W.code.es5 ? D.func(A, (0, u._)`${i.default.data}, ${i.default.valCxt}`, H.$async, () => {
      D.code((0, u._)`"use strict"; ${c(z, W)}`), $(D, W), D.code(Y);
    }) : D.func(A, (0, u._)`${i.default.data}, ${w(W)}`, H.$async, () => D.code(c(z, W)).code(Y));
  }
  function w(D) {
    return (0, u._)`{${i.default.instancePath}="", ${i.default.parentData}, ${i.default.parentDataProperty}, ${i.default.rootData}=${i.default.data}${D.dynamicRef ? (0, u._)`, ${i.default.dynamicAnchors}={}` : u.nil}}={}`;
  }
  function $(D, A) {
    D.if(i.default.valCxt, () => {
      D.var(i.default.instancePath, (0, u._)`${i.default.valCxt}.${i.default.instancePath}`), D.var(i.default.parentData, (0, u._)`${i.default.valCxt}.${i.default.parentData}`), D.var(i.default.parentDataProperty, (0, u._)`${i.default.valCxt}.${i.default.parentDataProperty}`), D.var(i.default.rootData, (0, u._)`${i.default.valCxt}.${i.default.rootData}`), A.dynamicRef && D.var(i.default.dynamicAnchors, (0, u._)`${i.default.valCxt}.${i.default.dynamicAnchors}`);
    }, () => {
      D.var(i.default.instancePath, (0, u._)`""`), D.var(i.default.parentData, (0, u._)`undefined`), D.var(i.default.parentDataProperty, (0, u._)`undefined`), D.var(i.default.rootData, i.default.data), A.dynamicRef && D.var(i.default.dynamicAnchors, (0, u._)`{}`);
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
    D.evaluated = A.const("evaluated", (0, u._)`${z}.evaluated`), A.if((0, u._)`${D.evaluated}.dynamicProps`, () => A.assign((0, u._)`${D.evaluated}.props`, (0, u._)`undefined`)), A.if((0, u._)`${D.evaluated}.dynamicItems`, () => A.assign((0, u._)`${D.evaluated}.items`, (0, u._)`undefined`));
  }
  function c(D, A) {
    const z = typeof D == "object" && D[A.schemaId];
    return z && (A.code.source || A.code.process) ? (0, u._)`/*# sourceURL=${z} */` : u.nil;
  }
  function m(D, A) {
    if (v(D) && (S(D), y(D))) {
      _(D, A);
      return;
    }
    (0, e.boolOrEmptySchema)(D, A);
  }
  function y({ schema: D, self: A }) {
    if (typeof D == "boolean")
      return !D;
    for (const z in D)
      if (A.RULES.all[z])
        return !0;
    return !1;
  }
  function v(D) {
    return typeof D.schema != "boolean";
  }
  function _(D, A) {
    const { schema: z, gen: H, opts: W } = D;
    W.$comment && z.$comment && k(D), M(D), G(D);
    const Y = H.const("_errs", i.default.errors);
    R(D, Y), H.var(A, (0, u._)`${Y} === ${i.default.errors}`);
  }
  function S(D) {
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
      D.code((0, u._)`${i.default.self}.logger.log(${Y})`);
    else if (typeof W.$comment == "function") {
      const se = (0, u.str)`${H}/$comment`, Ee = D.scopeValue("root", { ref: A.root });
      D.code((0, u._)`${i.default.self}.opts.$comment(${Y}, ${se}, ${Ee}.schema)`);
    }
  }
  function U(D) {
    const { gen: A, schemaEnv: z, validateName: H, ValidationError: W, opts: Y } = D;
    z.$async ? A.if((0, u._)`${i.default.errors} === 0`, () => A.return(i.default.data), () => A.throw((0, u._)`new ${W}(${i.default.vErrors})`)) : (A.assign((0, u._)`${H}.errors`, i.default.vErrors), Y.unevaluated && x(D), A.return((0, u._)`${i.default.errors} === 0`));
  }
  function x({ gen: D, evaluated: A, props: z, items: H }) {
    z instanceof u.Name && D.assign((0, u._)`${A}.props`, z), H instanceof u.Name && D.assign((0, u._)`${A}.items`, H);
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
      (0, o.shouldUseGroup)(Y, pe) && (pe.type ? (W.if((0, n.checkDataType)(pe.type, se, le.strictNumbers)), V(D, pe), A.length === 1 && A[0] === pe.type && z && (W.else(), (0, n.reportTypeError)(D)), W.endIf()) : V(D, pe), Ee || W.if((0, u._)`${i.default.errors} === ${H || 0}`));
    }
  }
  function V(D, A) {
    const { gen: z, schema: H, opts: { useDefaults: W } } = D;
    W && (0, f.assignDefaults)(D, A.type), z.block(() => {
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
      this.failResult((0, u.not)(A), z, H);
    }
    failResult(A, z, H) {
      this.gen.if(A), H ? H() : this.error(), z ? (this.gen.else(), z(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    pass(A, z) {
      this.failResult((0, u.not)(A), void 0, z);
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
      this.fail((0, u._)`${z} !== undefined && (${(0, u.or)(this.invalid$data(), A)})`);
    }
    error(A, z, H) {
      if (z) {
        this.setParams(z), this._error(A, H), this.setParams({});
        return;
      }
      this._error(A, H);
    }
    _error(A, z) {
      (A ? E.reportExtraError : E.reportError)(this, this.def.error, z);
    }
    $dataError() {
      (0, E.reportError)(this, this.def.$dataError || E.keyword$DataError);
    }
    reset() {
      if (this.errsCount === void 0)
        throw new Error('add "trackErrors" to keyword definition');
      (0, E.resetErrorsCount)(this.gen, this.errsCount);
    }
    ok(A) {
      this.allErrors || this.gen.if(A);
    }
    setParams(A, z) {
      z ? Object.assign(this.params, A) : this.params = A;
    }
    block$data(A, z, H = u.nil) {
      this.gen.block(() => {
        this.check$data(A, H), z();
      });
    }
    check$data(A = u.nil, z = u.nil) {
      if (!this.$data)
        return;
      const { gen: H, schemaCode: W, schemaType: Y, def: se } = this;
      H.if((0, u.or)((0, u._)`${W} === undefined`, z)), A !== u.nil && H.assign(A, !0), (Y.length || se.validateSchema) && (H.elseIf(this.invalid$data()), this.$dataError(), A !== u.nil && H.assign(A, !1)), H.else();
    }
    invalid$data() {
      const { gen: A, schemaCode: z, schemaType: H, def: W, it: Y } = this;
      return (0, u.or)(se(), Ee());
      function se() {
        if (H.length) {
          if (!(z instanceof u.Name))
            throw new Error("ajv implementation error");
          const le = Array.isArray(H) ? H : [H];
          return (0, u._)`${(0, n.checkDataTypes)(le, z, Y.opts.strictNumbers, n.DataType.Wrong)}`;
        }
        return u.nil;
      }
      function Ee() {
        if (W.validateSchema) {
          const le = A.scopeValue("validate$data", { ref: W.validateSchema });
          return (0, u._)`!${le}(${z})`;
        }
        return u.nil;
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
        return W.if(z, () => this.mergeEvaluated(A, u.Name)), !0;
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
      de && (Y = (0, u._)`${Y}${(0, u.getProperty)((0, d.unescapeJsonPointer)(de))}`, se = (0, u._)`${se} && ${Y}`);
    return se;
    function le(de, oe) {
      return `Cannot access ${de} ${oe} levels up, current level is ${A}`;
    }
  }
  return Re.getData = X, Re;
}
var gt = {}, so;
function Ni() {
  if (so) return gt;
  so = 1, Object.defineProperty(gt, "__esModule", { value: !0 });
  class e extends Error {
    constructor(o) {
      super("validation failed"), this.errors = o, this.ajv = this.validation = !0;
    }
  }
  return gt.default = e, gt;
}
var _t = {}, oo;
function dr() {
  if (oo) return _t;
  oo = 1, Object.defineProperty(_t, "__esModule", { value: !0 });
  const e = fr();
  class t extends Error {
    constructor(n, f, a, r) {
      super(r || `can't resolve reference ${a} from id ${f}`), this.missingRef = (0, e.resolveUrl)(n, f, a), this.missingSchema = (0, e.normalizeId)((0, e.getFullPath)(n, this.missingRef));
    }
  }
  return _t.default = t, _t;
}
var me = {}, ao;
function Oi() {
  if (ao) return me;
  ao = 1, Object.defineProperty(me, "__esModule", { value: !0 }), me.resolveSchema = me.getCompilingSchema = me.resolveRef = me.compileSchema = me.SchemaEnv = void 0;
  const e = ee(), t = Ni(), o = Pe(), n = fr(), f = te(), a = lr();
  class r {
    constructor(h) {
      var c;
      this.refs = {}, this.dynamicAnchors = {};
      let m;
      typeof h.schema == "object" && (m = h.schema), this.schema = h.schema, this.schemaId = h.schemaId, this.root = h.root || this, this.baseId = (c = h.baseId) !== null && c !== void 0 ? c : (0, n.normalizeId)(m?.[h.schemaId || "$id"]), this.schemaPath = h.schemaPath, this.localRefs = h.localRefs, this.meta = h.meta, this.$async = m?.$async, this.refs = {};
    }
  }
  me.SchemaEnv = r;
  function u(l) {
    const h = d.call(this, l);
    if (h)
      return h;
    const c = (0, n.getFullPath)(this.opts.uriResolver, l.root.baseId), { es5: m, lines: y } = this.opts.code, { ownProperties: v } = this.opts, _ = new e.CodeGen(this.scope, { es5: m, lines: y, ownProperties: v });
    let S;
    l.$async && (S = _.scopeValue("Error", {
      ref: t.default,
      code: (0, e._)`require("ajv/dist/runtime/validation_error").default`
    }));
    const R = _.scopeName("validate");
    l.validateName = R;
    const N = {
      gen: _,
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
      topSchemaRef: _.scopeValue("schema", this.opts.code.source === !0 ? { ref: l.schema, code: (0, e.stringify)(l.schema) } : { ref: l.schema }),
      validateName: R,
      ValidationError: S,
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
      this._compilations.add(l), (0, a.validateFunctionCode)(N), _.optimize(this.opts.code.optimize);
      const M = _.toString();
      b = `${_.scopeRefs(o.default.scope)}return ${M}`, this.opts.code.process && (b = this.opts.code.process(b, l));
      const k = new Function(`${o.default.self}`, `${o.default.scope}`, b)(this, this.scope.get());
      if (this.scope.value(R, { ref: k }), k.errors = null, k.schema = l.schema, k.schemaEnv = l, l.$async && (k.$async = !0), this.opts.code.source === !0 && (k.source = { validateName: R, validateCode: M, scopeValues: _._values }), this.opts.unevaluated) {
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
  me.compileSchema = u;
  function i(l, h, c) {
    var m;
    c = (0, n.resolveUrl)(this.opts.uriResolver, h, c);
    const y = l.refs[c];
    if (y)
      return y;
    let v = g.call(this, l, c);
    if (v === void 0) {
      const _ = (m = l.localRefs) === null || m === void 0 ? void 0 : m[c], { schemaId: S } = this.opts;
      _ && (v = new r({ schema: _, schemaId: S, root: l, baseId: h }));
    }
    if (v !== void 0)
      return l.refs[c] = s.call(this, v);
  }
  me.resolveRef = i;
  function s(l) {
    return (0, n.inlineRef)(l.schema, this.opts.inlineRefs) ? l.schema : l.validate ? l : u.call(this, l);
  }
  function d(l) {
    for (const h of this._compilations)
      if (E(h, l))
        return h;
  }
  me.getCompilingSchema = d;
  function E(l, h) {
    return l.schema === h.schema && l.root === h.root && l.baseId === h.baseId;
  }
  function g(l, h) {
    let c;
    for (; typeof (c = this.refs[h]) == "string"; )
      h = c;
    return c || this.schemas[h] || p.call(this, l, h);
  }
  function p(l, h) {
    const c = this.opts.uriResolver.parse(h), m = (0, n._getFullPath)(this.opts.uriResolver, c);
    let y = (0, n.getFullPath)(this.opts.uriResolver, l.baseId, void 0);
    if (Object.keys(l.schema).length > 0 && m === y)
      return $.call(this, c, l);
    const v = (0, n.normalizeId)(m), _ = this.refs[v] || this.schemas[v];
    if (typeof _ == "string") {
      const S = p.call(this, l, _);
      return typeof S?.schema != "object" ? void 0 : $.call(this, c, S);
    }
    if (typeof _?.schema == "object") {
      if (_.validate || u.call(this, _), v === (0, n.normalizeId)(h)) {
        const { schema: S } = _, { schemaId: R } = this.opts, N = S[R];
        return N && (y = (0, n.resolveUrl)(this.opts.uriResolver, y, N)), new r({ schema: S, schemaId: R, root: l, baseId: y });
      }
      return $.call(this, c, _);
    }
  }
  me.resolveSchema = p;
  const w = /* @__PURE__ */ new Set([
    "properties",
    "patternProperties",
    "enum",
    "dependencies",
    "definitions"
  ]);
  function $(l, { baseId: h, schema: c, root: m }) {
    var y;
    if (((y = l.fragment) === null || y === void 0 ? void 0 : y[0]) !== "/")
      return;
    for (const S of l.fragment.slice(1).split("/")) {
      if (typeof c == "boolean")
        return;
      const R = c[(0, f.unescapeFragment)(S)];
      if (R === void 0)
        return;
      c = R;
      const N = typeof c == "object" && c[this.opts.schemaId];
      !w.has(S) && N && (h = (0, n.resolveUrl)(this.opts.uriResolver, h, N));
    }
    let v;
    if (typeof c != "boolean" && c.$ref && !(0, f.schemaHasRulesButRef)(c, this.RULES)) {
      const S = (0, n.resolveUrl)(this.opts.uriResolver, h, c.$ref);
      v = p.call(this, m, S);
    }
    const { schemaId: _ } = this.opts;
    if (v = v || new r({ schema: c, schemaId: _, root: m, baseId: h }), v.schema !== v.root.schema)
      return v;
  }
  return me;
}
const zu = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", Vu = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Gu = "object", Hu = ["$data"], Bu = { $data: { type: "string", anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }] } }, Ku = !1, Wu = {
  $id: zu,
  description: Vu,
  type: Gu,
  required: Hu,
  properties: Bu,
  additionalProperties: Ku
};
var wt = {}, Ge = { exports: {} }, fn, co;
function Zu() {
  return co || (co = 1, fn = {
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
  }), fn;
}
var ln, uo;
function Xu() {
  if (uo) return ln;
  uo = 1;
  const { HEX: e } = Zu();
  function t(w) {
    if (r(w, ".") < 3)
      return { host: w, isIPV4: !1 };
    const $ = w.match(/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/u) || [], [l] = $;
    return l ? { host: a(l, "."), isIPV4: !0 } : { host: w, isIPV4: !1 };
  }
  function o(w, $ = !1) {
    let l = "", h = !0;
    for (const c of w) {
      if (e[c] === void 0) return;
      c !== "0" && h === !0 && (h = !1), h || (l += c);
    }
    return $ && l.length === 0 && (l = "0"), l;
  }
  function n(w) {
    let $ = 0;
    const l = { error: !1, address: "", zone: "" }, h = [], c = [];
    let m = !1, y = !1, v = !1;
    function _() {
      if (c.length) {
        if (m === !1) {
          const S = o(c);
          if (S !== void 0)
            h.push(S);
          else
            return l.error = !0, !1;
        }
        c.length = 0;
      }
      return !0;
    }
    for (let S = 0; S < w.length; S++) {
      const R = w[S];
      if (!(R === "[" || R === "]"))
        if (R === ":") {
          if (y === !0 && (v = !0), !_())
            break;
          if ($++, h.push(":"), $ > 7) {
            l.error = !0;
            break;
          }
          S - 1 >= 0 && w[S - 1] === ":" && (y = !0);
          continue;
        } else if (R === "%") {
          if (!_())
            break;
          m = !0;
        } else {
          c.push(R);
          continue;
        }
    }
    return c.length && (m ? l.zone = c.join("") : v ? h.push(c.join("")) : h.push(o(c))), l.address = h.join(""), l;
  }
  function f(w, $ = {}) {
    if (r(w, ":") < 2)
      return { host: w, isIPV6: !1 };
    const l = n(w);
    if (l.error)
      return { host: w, isIPV6: !1 };
    {
      let h = l.address, c = l.address;
      return l.zone && (h += "%" + l.zone, c += "%25" + l.zone), { host: h, escapedHost: c, isIPV6: !0 };
    }
  }
  function a(w, $) {
    let l = "", h = !0;
    const c = w.length;
    for (let m = 0; m < c; m++) {
      const y = w[m];
      y === "0" && h ? (m + 1 <= c && w[m + 1] === $ || m + 1 === c) && (l += y, h = !1) : (y === $ ? h = !0 : h = !1, l += y);
    }
    return l;
  }
  function r(w, $) {
    let l = 0;
    for (let h = 0; h < w.length; h++)
      w[h] === $ && l++;
    return l;
  }
  const u = /^\.\.?\//u, i = /^\/\.(?:\/|$)/u, s = /^\/\.\.(?:\/|$)/u, d = /^\/?(?:.|\n)*?(?=\/|$)/u;
  function E(w) {
    const $ = [];
    for (; w.length; )
      if (w.match(u))
        w = w.replace(u, "");
      else if (w.match(i))
        w = w.replace(i, "/");
      else if (w.match(s))
        w = w.replace(s, "/"), $.pop();
      else if (w === "." || w === "..")
        w = "";
      else {
        const l = w.match(d);
        if (l) {
          const h = l[0];
          w = w.slice(h.length), $.push(h);
        } else
          throw new Error("Unexpected dot segment condition");
      }
    return $.join("");
  }
  function g(w, $) {
    const l = $ !== !0 ? escape : unescape;
    return w.scheme !== void 0 && (w.scheme = l(w.scheme)), w.userinfo !== void 0 && (w.userinfo = l(w.userinfo)), w.host !== void 0 && (w.host = l(w.host)), w.path !== void 0 && (w.path = l(w.path)), w.query !== void 0 && (w.query = l(w.query)), w.fragment !== void 0 && (w.fragment = l(w.fragment)), w;
  }
  function p(w, $) {
    const l = [];
    if (w.userinfo !== void 0 && (l.push(w.userinfo), l.push("@")), w.host !== void 0) {
      let h = unescape(w.host);
      const c = t(h);
      if (c.isIPV4)
        h = c.host;
      else {
        const m = f(c.host, {});
        m.isIPV6 === !0 ? h = `[${m.escapedHost}]` : h = w.host;
      }
      l.push(h);
    }
    return (typeof w.port == "number" || typeof w.port == "string") && (l.push(":"), l.push(String(w.port))), l.length ? l.join("") : void 0;
  }
  return ln = {
    recomposeAuthority: p,
    normalizeComponentEncoding: g,
    removeDotSegments: E,
    normalizeIPv4: t,
    normalizeIPv6: f,
    stringArrayToHexStripped: o
  }, ln;
}
var dn, fo;
function Ju() {
  if (fo) return dn;
  fo = 1;
  const e = /^[\da-f]{8}\b-[\da-f]{4}\b-[\da-f]{4}\b-[\da-f]{4}\b-[\da-f]{12}$/iu, t = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
  function o(c) {
    return typeof c.secure == "boolean" ? c.secure : String(c.scheme).toLowerCase() === "wss";
  }
  function n(c) {
    return c.host || (c.error = c.error || "HTTP URIs must have a host."), c;
  }
  function f(c) {
    const m = String(c.scheme).toLowerCase() === "https";
    return (c.port === (m ? 443 : 80) || c.port === "") && (c.port = void 0), c.path || (c.path = "/"), c;
  }
  function a(c) {
    return c.secure = o(c), c.resourceName = (c.path || "/") + (c.query ? "?" + c.query : ""), c.path = void 0, c.query = void 0, c;
  }
  function r(c) {
    if ((c.port === (o(c) ? 443 : 80) || c.port === "") && (c.port = void 0), typeof c.secure == "boolean" && (c.scheme = c.secure ? "wss" : "ws", c.secure = void 0), c.resourceName) {
      const [m, y] = c.resourceName.split("?");
      c.path = m && m !== "/" ? m : void 0, c.query = y, c.resourceName = void 0;
    }
    return c.fragment = void 0, c;
  }
  function u(c, m) {
    if (!c.path)
      return c.error = "URN can not be parsed", c;
    const y = c.path.match(t);
    if (y) {
      const v = m.scheme || c.scheme || "urn";
      c.nid = y[1].toLowerCase(), c.nss = y[2];
      const _ = `${v}:${m.nid || c.nid}`, S = h[_];
      c.path = void 0, S && (c = S.parse(c, m));
    } else
      c.error = c.error || "URN can not be parsed.";
    return c;
  }
  function i(c, m) {
    const y = m.scheme || c.scheme || "urn", v = c.nid.toLowerCase(), _ = `${y}:${m.nid || v}`, S = h[_];
    S && (c = S.serialize(c, m));
    const R = c, N = c.nss;
    return R.path = `${v || m.nid}:${N}`, m.skipEscape = !0, R;
  }
  function s(c, m) {
    const y = c;
    return y.uuid = y.nss, y.nss = void 0, !m.tolerant && (!y.uuid || !e.test(y.uuid)) && (y.error = y.error || "UUID is not valid."), y;
  }
  function d(c) {
    const m = c;
    return m.nss = (c.uuid || "").toLowerCase(), m;
  }
  const E = {
    scheme: "http",
    domainHost: !0,
    parse: n,
    serialize: f
  }, g = {
    scheme: "https",
    domainHost: E.domainHost,
    parse: n,
    serialize: f
  }, p = {
    scheme: "ws",
    domainHost: !0,
    parse: a,
    serialize: r
  }, w = {
    scheme: "wss",
    domainHost: p.domainHost,
    parse: p.parse,
    serialize: p.serialize
  }, h = {
    http: E,
    https: g,
    ws: p,
    wss: w,
    urn: {
      scheme: "urn",
      parse: u,
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
  return dn = h, dn;
}
var lo;
function Yu() {
  if (lo) return Ge.exports;
  lo = 1;
  const { normalizeIPv6: e, normalizeIPv4: t, removeDotSegments: o, recomposeAuthority: n, normalizeComponentEncoding: f } = Xu(), a = Ju();
  function r(l, h) {
    return typeof l == "string" ? l = d(w(l, h), h) : typeof l == "object" && (l = w(d(l, h), h)), l;
  }
  function u(l, h, c) {
    const m = Object.assign({ scheme: "null" }, c), y = i(w(l, m), w(h, m), m, !0);
    return d(y, { ...m, skipEscape: !0 });
  }
  function i(l, h, c, m) {
    const y = {};
    return m || (l = w(d(l, c), c), h = w(d(h, c), c)), c = c || {}, !c.tolerant && h.scheme ? (y.scheme = h.scheme, y.userinfo = h.userinfo, y.host = h.host, y.port = h.port, y.path = o(h.path || ""), y.query = h.query) : (h.userinfo !== void 0 || h.host !== void 0 || h.port !== void 0 ? (y.userinfo = h.userinfo, y.host = h.host, y.port = h.port, y.path = o(h.path || ""), y.query = h.query) : (h.path ? (h.path.charAt(0) === "/" ? y.path = o(h.path) : ((l.userinfo !== void 0 || l.host !== void 0 || l.port !== void 0) && !l.path ? y.path = "/" + h.path : l.path ? y.path = l.path.slice(0, l.path.lastIndexOf("/") + 1) + h.path : y.path = h.path, y.path = o(y.path)), y.query = h.query) : (y.path = l.path, h.query !== void 0 ? y.query = h.query : y.query = l.query), y.userinfo = l.userinfo, y.host = l.host, y.port = l.port), y.scheme = l.scheme), y.fragment = h.fragment, y;
  }
  function s(l, h, c) {
    return typeof l == "string" ? (l = unescape(l), l = d(f(w(l, c), !0), { ...c, skipEscape: !0 })) : typeof l == "object" && (l = d(f(l, !0), { ...c, skipEscape: !0 })), typeof h == "string" ? (h = unescape(h), h = d(f(w(h, c), !0), { ...c, skipEscape: !0 })) : typeof h == "object" && (h = d(f(h, !0), { ...c, skipEscape: !0 })), l.toLowerCase() === h.toLowerCase();
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
    }, m = Object.assign({}, h), y = [], v = a[(m.scheme || c.scheme || "").toLowerCase()];
    v && v.serialize && v.serialize(c, m), c.path !== void 0 && (m.skipEscape ? c.path = unescape(c.path) : (c.path = escape(c.path), c.scheme !== void 0 && (c.path = c.path.split("%3A").join(":")))), m.reference !== "suffix" && c.scheme && y.push(c.scheme, ":");
    const _ = n(c, m);
    if (_ !== void 0 && (m.reference !== "suffix" && y.push("//"), y.push(_), c.path && c.path.charAt(0) !== "/" && y.push("/")), c.path !== void 0) {
      let S = c.path;
      !m.absolutePath && (!v || !v.absolutePath) && (S = o(S)), _ === void 0 && (S = S.replace(/^\/\//u, "/%2F")), y.push(S);
    }
    return c.query !== void 0 && y.push("?", c.query), c.fragment !== void 0 && y.push("#", c.fragment), y.join("");
  }
  const E = Array.from({ length: 127 }, (l, h) => /[^!"$&'()*+,\-.;=_`a-z{}~]/u.test(String.fromCharCode(h)));
  function g(l) {
    let h = 0;
    for (let c = 0, m = l.length; c < m; ++c)
      if (h = l.charCodeAt(c), h > 126 || E[h])
        return !0;
    return !1;
  }
  const p = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
  function w(l, h) {
    const c = Object.assign({}, h), m = {
      scheme: void 0,
      userinfo: void 0,
      host: "",
      port: void 0,
      path: "",
      query: void 0,
      fragment: void 0
    }, y = l.indexOf("%") !== -1;
    let v = !1;
    c.reference === "suffix" && (l = (c.scheme ? c.scheme + ":" : "") + "//" + l);
    const _ = l.match(p);
    if (_) {
      if (m.scheme = _[1], m.userinfo = _[3], m.host = _[4], m.port = parseInt(_[5], 10), m.path = _[6] || "", m.query = _[7], m.fragment = _[8], isNaN(m.port) && (m.port = _[5]), m.host) {
        const R = t(m.host);
        if (R.isIPV4 === !1) {
          const N = e(R.host, { isIPV4: !1 });
          m.host = N.host.toLowerCase(), v = N.isIPV6;
        } else
          m.host = R.host, v = !0;
      }
      m.scheme === void 0 && m.userinfo === void 0 && m.host === void 0 && m.port === void 0 && !m.path && m.query === void 0 ? m.reference = "same-document" : m.scheme === void 0 ? m.reference = "relative" : m.fragment === void 0 ? m.reference = "absolute" : m.reference = "uri", c.reference && c.reference !== "suffix" && c.reference !== m.reference && (m.error = m.error || "URI is not a " + c.reference + " reference.");
      const S = a[(c.scheme || m.scheme || "").toLowerCase()];
      if (!c.unicodeSupport && (!S || !S.unicodeSupport) && m.host && (c.domainHost || S && S.domainHost) && v === !1 && g(m.host))
        try {
          m.host = URL.domainToASCII(m.host.toLowerCase());
        } catch (R) {
          m.error = m.error || "Host's domain name can not be converted to ASCII: " + R;
        }
      (!S || S && !S.skipNormalize) && (y && m.scheme !== void 0 && (m.scheme = unescape(m.scheme)), y && m.host !== void 0 && (m.host = unescape(m.host)), m.path !== void 0 && m.path.length && (m.path = escape(unescape(m.path))), m.fragment !== void 0 && m.fragment.length && (m.fragment = encodeURI(decodeURIComponent(m.fragment)))), S && S.parse && S.parse(m, c);
    } else
      m.error = m.error || "URI can not be parsed.";
    return m;
  }
  const $ = {
    SCHEMES: a,
    normalize: r,
    resolve: u,
    resolveComponents: i,
    equal: s,
    serialize: d,
    parse: w
  };
  return Ge.exports = $, Ge.exports.default = $, Ge.exports.fastUri = $, Ge.exports;
}
var ho;
function Qu() {
  if (ho) return wt;
  ho = 1, Object.defineProperty(wt, "__esModule", { value: !0 });
  const e = Yu();
  return e.code = 'require("ajv/dist/runtime/uri").default', wt.default = e, wt;
}
var mo;
function ef() {
  return mo || (mo = 1, function(e) {
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
    const n = Ni(), f = dr(), a = Ic(), r = Oi(), u = ee(), i = fr(), s = ar(), d = te(), E = Wu, g = Qu(), p = (T, P) => new RegExp(T, P);
    p.code = "new RegExp";
    const w = ["removeAdditional", "useDefaults", "coerceTypes"], $ = /* @__PURE__ */ new Set([
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
      const ze = T.strict, _r = (P = T.code) === null || P === void 0 ? void 0 : P.optimize, qi = _r === !0 || _r === void 0 ? 1 : _r || 0, ji = (L = (q = T.code) === null || q === void 0 ? void 0 : q.regExp) !== null && L !== void 0 ? L : p, Uc = (I = T.uriResolver) !== null && I !== void 0 ? I : g.default;
      return {
        strictSchema: (F = (O = T.strictSchema) !== null && O !== void 0 ? O : ze) !== null && F !== void 0 ? F : !0,
        strictNumbers: (Z = (B = T.strictNumbers) !== null && B !== void 0 ? B : ze) !== null && Z !== void 0 ? Z : !0,
        strictTypes: (X = (J = T.strictTypes) !== null && J !== void 0 ? J : ze) !== null && X !== void 0 ? X : "log",
        strictTuples: (A = (D = T.strictTuples) !== null && D !== void 0 ? D : ze) !== null && A !== void 0 ? A : "log",
        strictRequired: (H = (z = T.strictRequired) !== null && z !== void 0 ? z : ze) !== null && H !== void 0 ? H : !1,
        code: T.code ? { ...T.code, optimize: qi, regExp: ji } : { optimize: qi, regExp: ji },
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
        uriResolver: Uc
      };
    }
    class y {
      constructor(P = {}) {
        this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), P = this.opts = { ...P, ...m(P) };
        const { es5: q, lines: L } = this.opts.code;
        this.scope = new u.ValueScope({ scope: {}, prefixes: $, es5: q, lines: L }), this.logger = G(P.logger);
        const I = P.validateFormats;
        P.validateFormats = !1, this.RULES = (0, a.getRules)(), v.call(this, l, P, "NOT SUPPORTED"), v.call(this, h, P, "DEPRECATED", "warn"), this._metaOpts = b.call(this), P.formats && R.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), P.keywords && N.call(this, P.keywords), typeof P.meta == "object" && this.addMetaSchema(P.meta), S.call(this), P.validateFormats = I;
      }
      _addVocabularies() {
        this.addKeyword("$async");
      }
      _addDefaultMetaSchema() {
        const { $data: P, meta: q, schemaId: L } = this.opts;
        let I = E;
        L === "id" && (I = { ...E }, I.id = I.$id, delete I.$id), q && P && this.addMetaSchema(I, I[L], !1);
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
            if (!(D instanceof f.default))
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
        for (; typeof (q = _.call(this, P)) == "string"; )
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
            const q = _.call(this, P);
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
    y.ValidationError = n.default, y.MissingRefError = f.default, e.default = y;
    function v(T, P, q, L = "error") {
      for (const I in T) {
        const O = I;
        O in P && this.logger[L](`${q}: option ${I}. ${T[O]}`);
      }
    }
    function _(T) {
      return T = (0, i.normalizeId)(T), this.schemas[T] || this.refs[T];
    }
    function S() {
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
      for (const P of w)
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
  }(rn)), rn;
}
var St = {}, $t = {}, Rt = {}, po;
function tf() {
  if (po) return Rt;
  po = 1, Object.defineProperty(Rt, "__esModule", { value: !0 });
  const e = {
    keyword: "id",
    code() {
      throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
    }
  };
  return Rt.default = e, Rt;
}
var Oe = {}, yo;
function rf() {
  if (yo) return Oe;
  yo = 1, Object.defineProperty(Oe, "__esModule", { value: !0 }), Oe.callRef = Oe.getValidate = void 0;
  const e = dr(), t = _e(), o = ee(), n = Pe(), f = Oi(), a = te(), r = {
    keyword: "$ref",
    schemaType: "string",
    code(s) {
      const { gen: d, schema: E, it: g } = s, { baseId: p, schemaEnv: w, validateName: $, opts: l, self: h } = g, { root: c } = w;
      if ((E === "#" || E === "#/") && p === c.baseId)
        return y();
      const m = f.resolveRef.call(h, c, p, E);
      if (m === void 0)
        throw new e.default(g.opts.uriResolver, p, E);
      if (m instanceof f.SchemaEnv)
        return v(m);
      return _(m);
      function y() {
        if (w === c)
          return i(s, $, w, w.$async);
        const S = d.scopeValue("root", { ref: c });
        return i(s, (0, o._)`${S}.validate`, c, c.$async);
      }
      function v(S) {
        const R = u(s, S);
        i(s, R, S, S.$async);
      }
      function _(S) {
        const R = d.scopeValue("schema", l.code.source === !0 ? { ref: S, code: (0, o.stringify)(S) } : { ref: S }), N = d.name("valid"), b = s.subschema({
          schema: S,
          dataTypes: [],
          schemaPath: o.nil,
          topSchemaRef: R,
          errSchemaPath: E
        }, N);
        s.mergeEvaluated(b), s.ok(N);
      }
    }
  };
  function u(s, d) {
    const { gen: E } = s;
    return d.validate ? E.scopeValue("validate", { ref: d.validate }) : (0, o._)`${E.scopeValue("wrapper", { ref: d })}.validate`;
  }
  Oe.getValidate = u;
  function i(s, d, E, g) {
    const { gen: p, it: w } = s, { allErrors: $, schemaEnv: l, opts: h } = w, c = h.passContext ? n.default.this : o.nil;
    g ? m() : y();
    function m() {
      if (!l.$async)
        throw new Error("async schema referenced by sync schema");
      const S = p.let("valid");
      p.try(() => {
        p.code((0, o._)`await ${(0, t.callValidateCode)(s, d, c)}`), _(d), $ || p.assign(S, !0);
      }, (R) => {
        p.if((0, o._)`!(${R} instanceof ${w.ValidationError})`, () => p.throw(R)), v(R), $ || p.assign(S, !1);
      }), s.ok(S);
    }
    function y() {
      s.result((0, t.callValidateCode)(s, d, c), () => _(d), () => v(d));
    }
    function v(S) {
      const R = (0, o._)`${S}.errors`;
      p.assign(n.default.vErrors, (0, o._)`${n.default.vErrors} === null ? ${R} : ${n.default.vErrors}.concat(${R})`), p.assign(n.default.errors, (0, o._)`${n.default.vErrors}.length`);
    }
    function _(S) {
      var R;
      if (!w.opts.unevaluated)
        return;
      const N = (R = E?.validate) === null || R === void 0 ? void 0 : R.evaluated;
      if (w.props !== !0)
        if (N && !N.dynamicProps)
          N.props !== void 0 && (w.props = a.mergeEvaluated.props(p, N.props, w.props));
        else {
          const b = p.var("props", (0, o._)`${S}.evaluated.props`);
          w.props = a.mergeEvaluated.props(p, b, w.props, o.Name);
        }
      if (w.items !== !0)
        if (N && !N.dynamicItems)
          N.items !== void 0 && (w.items = a.mergeEvaluated.items(p, N.items, w.items));
        else {
          const b = p.var("items", (0, o._)`${S}.evaluated.items`);
          w.items = a.mergeEvaluated.items(p, b, w.items, o.Name);
        }
    }
  }
  return Oe.callRef = i, Oe.default = r, Oe;
}
var Eo;
function nf() {
  if (Eo) return $t;
  Eo = 1, Object.defineProperty($t, "__esModule", { value: !0 });
  const e = tf(), t = rf(), o = [
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
var It = {}, Nt = {}, vo;
function sf() {
  if (vo) return Nt;
  vo = 1, Object.defineProperty(Nt, "__esModule", { value: !0 });
  const e = ee(), t = e.operators, o = {
    maximum: { okStr: "<=", ok: t.LTE, fail: t.GT },
    minimum: { okStr: ">=", ok: t.GTE, fail: t.LT },
    exclusiveMaximum: { okStr: "<", ok: t.LT, fail: t.GTE },
    exclusiveMinimum: { okStr: ">", ok: t.GT, fail: t.LTE }
  }, n = {
    message: ({ keyword: a, schemaCode: r }) => (0, e.str)`must be ${o[a].okStr} ${r}`,
    params: ({ keyword: a, schemaCode: r }) => (0, e._)`{comparison: ${o[a].okStr}, limit: ${r}}`
  }, f = {
    keyword: Object.keys(o),
    type: "number",
    schemaType: "number",
    $data: !0,
    error: n,
    code(a) {
      const { keyword: r, data: u, schemaCode: i } = a;
      a.fail$data((0, e._)`${u} ${o[r].fail} ${i} || isNaN(${u})`);
    }
  };
  return Nt.default = f, Nt;
}
var Ot = {}, go;
function of() {
  if (go) return Ot;
  go = 1, Object.defineProperty(Ot, "__esModule", { value: !0 });
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
      const { gen: f, data: a, schemaCode: r, it: u } = n, i = u.opts.multipleOfPrecision, s = f.let("res"), d = i ? (0, e._)`Math.abs(Math.round(${s}) - ${s}) > 1e-${i}` : (0, e._)`${s} !== parseInt(${s})`;
      n.fail$data((0, e._)`(${r} === 0 || (${s} = ${a}/${r}, ${d}))`);
    }
  };
  return Ot.default = o, Ot;
}
var Pt = {}, Tt = {}, _o;
function af() {
  if (_o) return Tt;
  _o = 1, Object.defineProperty(Tt, "__esModule", { value: !0 });
  function e(t) {
    const o = t.length;
    let n = 0, f = 0, a;
    for (; f < o; )
      n++, a = t.charCodeAt(f++), a >= 55296 && a <= 56319 && f < o && (a = t.charCodeAt(f), (a & 64512) === 56320 && f++);
    return n;
  }
  return Tt.default = e, e.code = 'require("ajv/dist/runtime/ucs2length").default', Tt;
}
var wo;
function cf() {
  if (wo) return Pt;
  wo = 1, Object.defineProperty(Pt, "__esModule", { value: !0 });
  const e = ee(), t = te(), o = af(), f = {
    keyword: ["maxLength", "minLength"],
    type: "string",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: a, schemaCode: r }) {
        const u = a === "maxLength" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${u} than ${r} characters`;
      },
      params: ({ schemaCode: a }) => (0, e._)`{limit: ${a}}`
    },
    code(a) {
      const { keyword: r, data: u, schemaCode: i, it: s } = a, d = r === "maxLength" ? e.operators.GT : e.operators.LT, E = s.opts.unicode === !1 ? (0, e._)`${u}.length` : (0, e._)`${(0, t.useFunc)(a.gen, o.default)}(${u})`;
      a.fail$data((0, e._)`${E} ${d} ${i}`);
    }
  };
  return Pt.default = f, Pt;
}
var bt = {}, So;
function uf() {
  if (So) return bt;
  So = 1, Object.defineProperty(bt, "__esModule", { value: !0 });
  const e = _e(), t = ee(), n = {
    keyword: "pattern",
    type: "string",
    schemaType: "string",
    $data: !0,
    error: {
      message: ({ schemaCode: f }) => (0, t.str)`must match pattern "${f}"`,
      params: ({ schemaCode: f }) => (0, t._)`{pattern: ${f}}`
    },
    code(f) {
      const { data: a, $data: r, schema: u, schemaCode: i, it: s } = f, d = s.opts.unicodeRegExp ? "u" : "", E = r ? (0, t._)`(new RegExp(${i}, ${d}))` : (0, e.usePattern)(f, u);
      f.fail$data((0, t._)`!${E}.test(${a})`);
    }
  };
  return bt.default = n, bt;
}
var Dt = {}, $o;
function ff() {
  if ($o) return Dt;
  $o = 1, Object.defineProperty(Dt, "__esModule", { value: !0 });
  const e = ee(), o = {
    keyword: ["maxProperties", "minProperties"],
    type: "object",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: n, schemaCode: f }) {
        const a = n === "maxProperties" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${a} than ${f} properties`;
      },
      params: ({ schemaCode: n }) => (0, e._)`{limit: ${n}}`
    },
    code(n) {
      const { keyword: f, data: a, schemaCode: r } = n, u = f === "maxProperties" ? e.operators.GT : e.operators.LT;
      n.fail$data((0, e._)`Object.keys(${a}).length ${u} ${r}`);
    }
  };
  return Dt.default = o, Dt;
}
var Ct = {}, Ro;
function lf() {
  if (Ro) return Ct;
  Ro = 1, Object.defineProperty(Ct, "__esModule", { value: !0 });
  const e = _e(), t = ee(), o = te(), f = {
    keyword: "required",
    type: "object",
    schemaType: "array",
    $data: !0,
    error: {
      message: ({ params: { missingProperty: a } }) => (0, t.str)`must have required property '${a}'`,
      params: ({ params: { missingProperty: a } }) => (0, t._)`{missingProperty: ${a}}`
    },
    code(a) {
      const { gen: r, schema: u, schemaCode: i, data: s, $data: d, it: E } = a, { opts: g } = E;
      if (!d && u.length === 0)
        return;
      const p = u.length >= g.loopRequired;
      if (E.allErrors ? w() : $(), g.strictRequired) {
        const c = a.parentSchema.properties, { definedProperties: m } = a.it;
        for (const y of u)
          if (c?.[y] === void 0 && !m.has(y)) {
            const v = E.schemaEnv.baseId + E.errSchemaPath, _ = `required property "${y}" is not defined at "${v}" (strictRequired)`;
            (0, o.checkStrictMode)(E, _, E.opts.strictRequired);
          }
      }
      function w() {
        if (p || d)
          a.block$data(t.nil, l);
        else
          for (const c of u)
            (0, e.checkReportMissingProp)(a, c);
      }
      function $() {
        const c = r.let("missing");
        if (p || d) {
          const m = r.let("valid", !0);
          a.block$data(m, () => h(c, m)), a.ok(m);
        } else
          r.if((0, e.checkMissingProp)(a, u, c)), (0, e.reportMissingProp)(a, c), r.else();
      }
      function l() {
        r.forOf("prop", i, (c) => {
          a.setParams({ missingProperty: c }), r.if((0, e.noPropertyInData)(r, s, c, g.ownProperties), () => a.error());
        });
      }
      function h(c, m) {
        a.setParams({ missingProperty: c }), r.forOf(c, i, () => {
          r.assign(m, (0, e.propertyInData)(r, s, c, g.ownProperties)), r.if((0, t.not)(m), () => {
            a.error(), r.break();
          });
        }, t.nil);
      }
    }
  };
  return Ct.default = f, Ct;
}
var Lt = {}, Io;
function df() {
  if (Io) return Lt;
  Io = 1, Object.defineProperty(Lt, "__esModule", { value: !0 });
  const e = ee(), o = {
    keyword: ["maxItems", "minItems"],
    type: "array",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: n, schemaCode: f }) {
        const a = n === "maxItems" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${a} than ${f} items`;
      },
      params: ({ schemaCode: n }) => (0, e._)`{limit: ${n}}`
    },
    code(n) {
      const { keyword: f, data: a, schemaCode: r } = n, u = f === "maxItems" ? e.operators.GT : e.operators.LT;
      n.fail$data((0, e._)`${a}.length ${u} ${r}`);
    }
  };
  return Lt.default = o, Lt;
}
var At = {}, Ft = {}, No;
function Pi() {
  if (No) return Ft;
  No = 1, Object.defineProperty(Ft, "__esModule", { value: !0 });
  const e = Oc();
  return e.code = 'require("ajv/dist/runtime/equal").default', Ft.default = e, Ft;
}
var Oo;
function hf() {
  if (Oo) return At;
  Oo = 1, Object.defineProperty(At, "__esModule", { value: !0 });
  const e = ar(), t = ee(), o = te(), n = Pi(), a = {
    keyword: "uniqueItems",
    type: "array",
    schemaType: "boolean",
    $data: !0,
    error: {
      message: ({ params: { i: r, j: u } }) => (0, t.str)`must NOT have duplicate items (items ## ${u} and ${r} are identical)`,
      params: ({ params: { i: r, j: u } }) => (0, t._)`{i: ${r}, j: ${u}}`
    },
    code(r) {
      const { gen: u, data: i, $data: s, schema: d, parentSchema: E, schemaCode: g, it: p } = r;
      if (!s && !d)
        return;
      const w = u.let("valid"), $ = E.items ? (0, e.getSchemaTypes)(E.items) : [];
      r.block$data(w, l, (0, t._)`${g} === false`), r.ok(w);
      function l() {
        const y = u.let("i", (0, t._)`${i}.length`), v = u.let("j");
        r.setParams({ i: y, j: v }), u.assign(w, !0), u.if((0, t._)`${y} > 1`, () => (h() ? c : m)(y, v));
      }
      function h() {
        return $.length > 0 && !$.some((y) => y === "object" || y === "array");
      }
      function c(y, v) {
        const _ = u.name("item"), S = (0, e.checkDataTypes)($, _, p.opts.strictNumbers, e.DataType.Wrong), R = u.const("indices", (0, t._)`{}`);
        u.for((0, t._)`;${y}--;`, () => {
          u.let(_, (0, t._)`${i}[${y}]`), u.if(S, (0, t._)`continue`), $.length > 1 && u.if((0, t._)`typeof ${_} == "string"`, (0, t._)`${_} += "_"`), u.if((0, t._)`typeof ${R}[${_}] == "number"`, () => {
            u.assign(v, (0, t._)`${R}[${_}]`), r.error(), u.assign(w, !1).break();
          }).code((0, t._)`${R}[${_}] = ${y}`);
        });
      }
      function m(y, v) {
        const _ = (0, o.useFunc)(u, n.default), S = u.name("outer");
        u.label(S).for((0, t._)`;${y}--;`, () => u.for((0, t._)`${v} = ${y}; ${v}--;`, () => u.if((0, t._)`${_}(${i}[${y}], ${i}[${v}])`, () => {
          r.error(), u.assign(w, !1).break(S);
        })));
      }
    }
  };
  return At.default = a, At;
}
var qt = {}, Po;
function mf() {
  if (Po) return qt;
  Po = 1, Object.defineProperty(qt, "__esModule", { value: !0 });
  const e = ee(), t = te(), o = Pi(), f = {
    keyword: "const",
    $data: !0,
    error: {
      message: "must be equal to constant",
      params: ({ schemaCode: a }) => (0, e._)`{allowedValue: ${a}}`
    },
    code(a) {
      const { gen: r, data: u, $data: i, schemaCode: s, schema: d } = a;
      i || d && typeof d == "object" ? a.fail$data((0, e._)`!${(0, t.useFunc)(r, o.default)}(${u}, ${s})`) : a.fail((0, e._)`${d} !== ${u}`);
    }
  };
  return qt.default = f, qt;
}
var jt = {}, To;
function pf() {
  if (To) return jt;
  To = 1, Object.defineProperty(jt, "__esModule", { value: !0 });
  const e = ee(), t = te(), o = Pi(), f = {
    keyword: "enum",
    schemaType: "array",
    $data: !0,
    error: {
      message: "must be equal to one of the allowed values",
      params: ({ schemaCode: a }) => (0, e._)`{allowedValues: ${a}}`
    },
    code(a) {
      const { gen: r, data: u, $data: i, schema: s, schemaCode: d, it: E } = a;
      if (!i && s.length === 0)
        throw new Error("enum must have non-empty array");
      const g = s.length >= E.opts.loopEnum;
      let p;
      const w = () => p ?? (p = (0, t.useFunc)(r, o.default));
      let $;
      if (g || i)
        $ = r.let("valid"), a.block$data($, l);
      else {
        if (!Array.isArray(s))
          throw new Error("ajv implementation error");
        const c = r.const("vSchema", d);
        $ = (0, e.or)(...s.map((m, y) => h(c, y)));
      }
      a.pass($);
      function l() {
        r.assign($, !1), r.forOf("v", d, (c) => r.if((0, e._)`${w()}(${u}, ${c})`, () => r.assign($, !0).break()));
      }
      function h(c, m) {
        const y = s[m];
        return typeof y == "object" && y !== null ? (0, e._)`${w()}(${u}, ${c}[${m}])` : (0, e._)`${u} === ${y}`;
      }
    }
  };
  return jt.default = f, jt;
}
var bo;
function yf() {
  if (bo) return It;
  bo = 1, Object.defineProperty(It, "__esModule", { value: !0 });
  const e = sf(), t = of(), o = cf(), n = uf(), f = ff(), a = lf(), r = df(), u = hf(), i = mf(), s = pf(), d = [
    // number
    e.default,
    t.default,
    // string
    o.default,
    n.default,
    // object
    f.default,
    a.default,
    // array
    r.default,
    u.default,
    // any
    { keyword: "type", schemaType: ["string", "array"] },
    { keyword: "nullable", schemaType: "boolean" },
    i.default,
    s.default
  ];
  return It.default = d, It;
}
var kt = {}, je = {}, Do;
function Pc() {
  if (Do) return je;
  Do = 1, Object.defineProperty(je, "__esModule", { value: !0 }), je.validateAdditionalItems = void 0;
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
      const { parentSchema: r, it: u } = a, { items: i } = r;
      if (!Array.isArray(i)) {
        (0, t.checkStrictMode)(u, '"additionalItems" is ignored when "items" is not an array of schemas');
        return;
      }
      f(a, i);
    }
  };
  function f(a, r) {
    const { gen: u, schema: i, data: s, keyword: d, it: E } = a;
    E.items = !0;
    const g = u.const("len", (0, e._)`${s}.length`);
    if (i === !1)
      a.setParams({ len: r.length }), a.pass((0, e._)`${g} <= ${r.length}`);
    else if (typeof i == "object" && !(0, t.alwaysValidSchema)(E, i)) {
      const w = u.var("valid", (0, e._)`${g} <= ${r.length}`);
      u.if((0, e.not)(w), () => p(w)), a.ok(w);
    }
    function p(w) {
      u.forRange("i", r.length, g, ($) => {
        a.subschema({ keyword: d, dataProp: $, dataPropType: t.Type.Num }, w), E.allErrors || u.if((0, e.not)(w), () => u.break());
      });
    }
  }
  return je.validateAdditionalItems = f, je.default = n, je;
}
var Mt = {}, ke = {}, Co;
function Tc() {
  if (Co) return ke;
  Co = 1, Object.defineProperty(ke, "__esModule", { value: !0 }), ke.validateTuple = void 0;
  const e = ee(), t = te(), o = _e(), n = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "array", "boolean"],
    before: "uniqueItems",
    code(a) {
      const { schema: r, it: u } = a;
      if (Array.isArray(r))
        return f(a, "additionalItems", r);
      u.items = !0, !(0, t.alwaysValidSchema)(u, r) && a.ok((0, o.validateArray)(a));
    }
  };
  function f(a, r, u = a.schema) {
    const { gen: i, parentSchema: s, data: d, keyword: E, it: g } = a;
    $(s), g.opts.unevaluated && u.length && g.items !== !0 && (g.items = t.mergeEvaluated.items(i, u.length, g.items));
    const p = i.name("valid"), w = i.const("len", (0, e._)`${d}.length`);
    u.forEach((l, h) => {
      (0, t.alwaysValidSchema)(g, l) || (i.if((0, e._)`${w} > ${h}`, () => a.subschema({
        keyword: E,
        schemaProp: h,
        dataProp: h
      }, p)), a.ok(p));
    });
    function $(l) {
      const { opts: h, errSchemaPath: c } = g, m = u.length, y = m === l.minItems && (m === l.maxItems || l[r] === !1);
      if (h.strictTuples && !y) {
        const v = `"${E}" is ${m}-tuple, but minItems or maxItems/${r} are not specified or different at path "${c}"`;
        (0, t.checkStrictMode)(g, v, h.strictTuples);
      }
    }
  }
  return ke.validateTuple = f, ke.default = n, ke;
}
var Lo;
function Ef() {
  if (Lo) return Mt;
  Lo = 1, Object.defineProperty(Mt, "__esModule", { value: !0 });
  const e = Tc(), t = {
    keyword: "prefixItems",
    type: "array",
    schemaType: ["array"],
    before: "uniqueItems",
    code: (o) => (0, e.validateTuple)(o, "items")
  };
  return Mt.default = t, Mt;
}
var Ut = {}, Ao;
function vf() {
  if (Ao) return Ut;
  Ao = 1, Object.defineProperty(Ut, "__esModule", { value: !0 });
  const e = ee(), t = te(), o = _e(), n = Pc(), a = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    error: {
      message: ({ params: { len: r } }) => (0, e.str)`must NOT have more than ${r} items`,
      params: ({ params: { len: r } }) => (0, e._)`{limit: ${r}}`
    },
    code(r) {
      const { schema: u, parentSchema: i, it: s } = r, { prefixItems: d } = i;
      s.items = !0, !(0, t.alwaysValidSchema)(s, u) && (d ? (0, n.validateAdditionalItems)(r, d) : r.ok((0, o.validateArray)(r)));
    }
  };
  return Ut.default = a, Ut;
}
var xt = {}, Fo;
function gf() {
  if (Fo) return xt;
  Fo = 1, Object.defineProperty(xt, "__esModule", { value: !0 });
  const e = ee(), t = te(), n = {
    keyword: "contains",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    trackErrors: !0,
    error: {
      message: ({ params: { min: f, max: a } }) => a === void 0 ? (0, e.str)`must contain at least ${f} valid item(s)` : (0, e.str)`must contain at least ${f} and no more than ${a} valid item(s)`,
      params: ({ params: { min: f, max: a } }) => a === void 0 ? (0, e._)`{minContains: ${f}}` : (0, e._)`{minContains: ${f}, maxContains: ${a}}`
    },
    code(f) {
      const { gen: a, schema: r, parentSchema: u, data: i, it: s } = f;
      let d, E;
      const { minContains: g, maxContains: p } = u;
      s.opts.next ? (d = g === void 0 ? 1 : g, E = p) : d = 1;
      const w = a.const("len", (0, e._)`${i}.length`);
      if (f.setParams({ min: d, max: E }), E === void 0 && d === 0) {
        (0, t.checkStrictMode)(s, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
        return;
      }
      if (E !== void 0 && d > E) {
        (0, t.checkStrictMode)(s, '"minContains" > "maxContains" is always invalid'), f.fail();
        return;
      }
      if ((0, t.alwaysValidSchema)(s, r)) {
        let m = (0, e._)`${w} >= ${d}`;
        E !== void 0 && (m = (0, e._)`${m} && ${w} <= ${E}`), f.pass(m);
        return;
      }
      s.items = !0;
      const $ = a.name("valid");
      E === void 0 && d === 1 ? h($, () => a.if($, () => a.break())) : d === 0 ? (a.let($, !0), E !== void 0 && a.if((0, e._)`${i}.length > 0`, l)) : (a.let($, !1), l()), f.result($, () => f.reset());
      function l() {
        const m = a.name("_valid"), y = a.let("count", 0);
        h(m, () => a.if(m, () => c(y)));
      }
      function h(m, y) {
        a.forRange("i", 0, w, (v) => {
          f.subschema({
            keyword: "contains",
            dataProp: v,
            dataPropType: t.Type.Num,
            compositeRule: !0
          }, m), y();
        });
      }
      function c(m) {
        a.code((0, e._)`${m}++`), E === void 0 ? a.if((0, e._)`${m} >= ${d}`, () => a.assign($, !0).break()) : (a.if((0, e._)`${m} > ${E}`, () => a.assign($, !1).break()), d === 1 ? a.assign($, !0) : a.if((0, e._)`${m} >= ${d}`, () => a.assign($, !0)));
      }
    }
  };
  return xt.default = n, xt;
}
var hn = {}, qo;
function _f() {
  return qo || (qo = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
    const t = ee(), o = te(), n = _e();
    e.error = {
      message: ({ params: { property: i, depsCount: s, deps: d } }) => {
        const E = s === 1 ? "property" : "properties";
        return (0, t.str)`must have ${E} ${d} when property ${i} is present`;
      },
      params: ({ params: { property: i, depsCount: s, deps: d, missingProperty: E } }) => (0, t._)`{property: ${i},
    missingProperty: ${E},
    depsCount: ${s},
    deps: ${d}}`
      // TODO change to reference
    };
    const f = {
      keyword: "dependencies",
      type: "object",
      schemaType: "object",
      error: e.error,
      code(i) {
        const [s, d] = a(i);
        r(i, s), u(i, d);
      }
    };
    function a({ schema: i }) {
      const s = {}, d = {};
      for (const E in i) {
        if (E === "__proto__")
          continue;
        const g = Array.isArray(i[E]) ? s : d;
        g[E] = i[E];
      }
      return [s, d];
    }
    function r(i, s = i.schema) {
      const { gen: d, data: E, it: g } = i;
      if (Object.keys(s).length === 0)
        return;
      const p = d.let("missing");
      for (const w in s) {
        const $ = s[w];
        if ($.length === 0)
          continue;
        const l = (0, n.propertyInData)(d, E, w, g.opts.ownProperties);
        i.setParams({
          property: w,
          depsCount: $.length,
          deps: $.join(", ")
        }), g.allErrors ? d.if(l, () => {
          for (const h of $)
            (0, n.checkReportMissingProp)(i, h);
        }) : (d.if((0, t._)`${l} && (${(0, n.checkMissingProp)(i, $, p)})`), (0, n.reportMissingProp)(i, p), d.else());
      }
    }
    e.validatePropertyDeps = r;
    function u(i, s = i.schema) {
      const { gen: d, data: E, keyword: g, it: p } = i, w = d.name("valid");
      for (const $ in s)
        (0, o.alwaysValidSchema)(p, s[$]) || (d.if(
          (0, n.propertyInData)(d, E, $, p.opts.ownProperties),
          () => {
            const l = i.subschema({ keyword: g, schemaProp: $ }, w);
            i.mergeValidEvaluated(l, w);
          },
          () => d.var(w, !0)
          // TODO var
        ), i.ok(w));
    }
    e.validateSchemaDeps = u, e.default = f;
  }(hn)), hn;
}
var zt = {}, jo;
function wf() {
  if (jo) return zt;
  jo = 1, Object.defineProperty(zt, "__esModule", { value: !0 });
  const e = ee(), t = te(), n = {
    keyword: "propertyNames",
    type: "object",
    schemaType: ["object", "boolean"],
    error: {
      message: "property name must be valid",
      params: ({ params: f }) => (0, e._)`{propertyName: ${f.propertyName}}`
    },
    code(f) {
      const { gen: a, schema: r, data: u, it: i } = f;
      if ((0, t.alwaysValidSchema)(i, r))
        return;
      const s = a.name("valid");
      a.forIn("key", u, (d) => {
        f.setParams({ propertyName: d }), f.subschema({
          keyword: "propertyNames",
          data: d,
          dataTypes: ["string"],
          propertyName: d,
          compositeRule: !0
        }, s), a.if((0, e.not)(s), () => {
          f.error(!0), i.allErrors || a.break();
        });
      }), f.ok(s);
    }
  };
  return zt.default = n, zt;
}
var Vt = {}, ko;
function bc() {
  if (ko) return Vt;
  ko = 1, Object.defineProperty(Vt, "__esModule", { value: !0 });
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
      const { gen: u, schema: i, parentSchema: s, data: d, errsCount: E, it: g } = r;
      if (!E)
        throw new Error("ajv implementation error");
      const { allErrors: p, opts: w } = g;
      if (g.props = !0, w.removeAdditional !== "all" && (0, n.alwaysValidSchema)(g, i))
        return;
      const $ = (0, e.allSchemaProperties)(s.properties), l = (0, e.allSchemaProperties)(s.patternProperties);
      h(), r.ok((0, t._)`${E} === ${o.default.errors}`);
      function h() {
        u.forIn("key", d, (_) => {
          !$.length && !l.length ? y(_) : u.if(c(_), () => y(_));
        });
      }
      function c(_) {
        let S;
        if ($.length > 8) {
          const R = (0, n.schemaRefOrVal)(g, s.properties, "properties");
          S = (0, e.isOwnProperty)(u, R, _);
        } else $.length ? S = (0, t.or)(...$.map((R) => (0, t._)`${_} === ${R}`)) : S = t.nil;
        return l.length && (S = (0, t.or)(S, ...l.map((R) => (0, t._)`${(0, e.usePattern)(r, R)}.test(${_})`))), (0, t.not)(S);
      }
      function m(_) {
        u.code((0, t._)`delete ${d}[${_}]`);
      }
      function y(_) {
        if (w.removeAdditional === "all" || w.removeAdditional && i === !1) {
          m(_);
          return;
        }
        if (i === !1) {
          r.setParams({ additionalProperty: _ }), r.error(), p || u.break();
          return;
        }
        if (typeof i == "object" && !(0, n.alwaysValidSchema)(g, i)) {
          const S = u.name("valid");
          w.removeAdditional === "failing" ? (v(_, S, !1), u.if((0, t.not)(S), () => {
            r.reset(), m(_);
          })) : (v(_, S), p || u.if((0, t.not)(S), () => u.break()));
        }
      }
      function v(_, S, R) {
        const N = {
          keyword: "additionalProperties",
          dataProp: _,
          dataPropType: n.Type.Str
        };
        R === !1 && Object.assign(N, {
          compositeRule: !0,
          createErrors: !1,
          allErrors: !1
        }), r.subschema(N, S);
      }
    }
  };
  return Vt.default = a, Vt;
}
var Gt = {}, Mo;
function Sf() {
  if (Mo) return Gt;
  Mo = 1, Object.defineProperty(Gt, "__esModule", { value: !0 });
  const e = lr(), t = _e(), o = te(), n = bc(), f = {
    keyword: "properties",
    type: "object",
    schemaType: "object",
    code(a) {
      const { gen: r, schema: u, parentSchema: i, data: s, it: d } = a;
      d.opts.removeAdditional === "all" && i.additionalProperties === void 0 && n.default.code(new e.KeywordCxt(d, n.default, "additionalProperties"));
      const E = (0, t.allSchemaProperties)(u);
      for (const l of E)
        d.definedProperties.add(l);
      d.opts.unevaluated && E.length && d.props !== !0 && (d.props = o.mergeEvaluated.props(r, (0, o.toHash)(E), d.props));
      const g = E.filter((l) => !(0, o.alwaysValidSchema)(d, u[l]));
      if (g.length === 0)
        return;
      const p = r.name("valid");
      for (const l of g)
        w(l) ? $(l) : (r.if((0, t.propertyInData)(r, s, l, d.opts.ownProperties)), $(l), d.allErrors || r.else().var(p, !0), r.endIf()), a.it.definedProperties.add(l), a.ok(p);
      function w(l) {
        return d.opts.useDefaults && !d.compositeRule && u[l].default !== void 0;
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
  return Gt.default = f, Gt;
}
var Ht = {}, Uo;
function $f() {
  if (Uo) return Ht;
  Uo = 1, Object.defineProperty(Ht, "__esModule", { value: !0 });
  const e = _e(), t = ee(), o = te(), n = te(), f = {
    keyword: "patternProperties",
    type: "object",
    schemaType: "object",
    code(a) {
      const { gen: r, schema: u, data: i, parentSchema: s, it: d } = a, { opts: E } = d, g = (0, e.allSchemaProperties)(u), p = g.filter((y) => (0, o.alwaysValidSchema)(d, u[y]));
      if (g.length === 0 || p.length === g.length && (!d.opts.unevaluated || d.props === !0))
        return;
      const w = E.strictSchema && !E.allowMatchingProperties && s.properties, $ = r.name("valid");
      d.props !== !0 && !(d.props instanceof t.Name) && (d.props = (0, n.evaluatedPropsToName)(r, d.props));
      const { props: l } = d;
      h();
      function h() {
        for (const y of g)
          w && c(y), d.allErrors ? m(y) : (r.var($, !0), m(y), r.if($));
      }
      function c(y) {
        for (const v in w)
          new RegExp(y).test(v) && (0, o.checkStrictMode)(d, `property ${v} matches pattern ${y} (use allowMatchingProperties)`);
      }
      function m(y) {
        r.forIn("key", i, (v) => {
          r.if((0, t._)`${(0, e.usePattern)(a, y)}.test(${v})`, () => {
            const _ = p.includes(y);
            _ || a.subschema({
              keyword: "patternProperties",
              schemaProp: y,
              dataProp: v,
              dataPropType: n.Type.Str
            }, $), d.opts.unevaluated && l !== !0 ? r.assign((0, t._)`${l}[${v}]`, !0) : !_ && !d.allErrors && r.if((0, t.not)($), () => r.break());
          });
        });
      }
    }
  };
  return Ht.default = f, Ht;
}
var Bt = {}, xo;
function Rf() {
  if (xo) return Bt;
  xo = 1, Object.defineProperty(Bt, "__esModule", { value: !0 });
  const e = te(), t = {
    keyword: "not",
    schemaType: ["object", "boolean"],
    trackErrors: !0,
    code(o) {
      const { gen: n, schema: f, it: a } = o;
      if ((0, e.alwaysValidSchema)(a, f)) {
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
var Kt = {}, zo;
function If() {
  if (zo) return Kt;
  zo = 1, Object.defineProperty(Kt, "__esModule", { value: !0 });
  const t = {
    keyword: "anyOf",
    schemaType: "array",
    trackErrors: !0,
    code: _e().validateUnion,
    error: { message: "must match a schema in anyOf" }
  };
  return Kt.default = t, Kt;
}
var Wt = {}, Vo;
function Nf() {
  if (Vo) return Wt;
  Vo = 1, Object.defineProperty(Wt, "__esModule", { value: !0 });
  const e = ee(), t = te(), n = {
    keyword: "oneOf",
    schemaType: "array",
    trackErrors: !0,
    error: {
      message: "must match exactly one schema in oneOf",
      params: ({ params: f }) => (0, e._)`{passingSchemas: ${f.passing}}`
    },
    code(f) {
      const { gen: a, schema: r, parentSchema: u, it: i } = f;
      if (!Array.isArray(r))
        throw new Error("ajv implementation error");
      if (i.opts.discriminator && u.discriminator)
        return;
      const s = r, d = a.let("valid", !1), E = a.let("passing", null), g = a.name("_valid");
      f.setParams({ passing: E }), a.block(p), f.result(d, () => f.reset(), () => f.error(!0));
      function p() {
        s.forEach((w, $) => {
          let l;
          (0, t.alwaysValidSchema)(i, w) ? a.var(g, !0) : l = f.subschema({
            keyword: "oneOf",
            schemaProp: $,
            compositeRule: !0
          }, g), $ > 0 && a.if((0, e._)`${g} && ${d}`).assign(d, !1).assign(E, (0, e._)`[${E}, ${$}]`).else(), a.if(g, () => {
            a.assign(d, !0), a.assign(E, $), l && f.mergeEvaluated(l, e.Name);
          });
        });
      }
    }
  };
  return Wt.default = n, Wt;
}
var Zt = {}, Go;
function Of() {
  if (Go) return Zt;
  Go = 1, Object.defineProperty(Zt, "__esModule", { value: !0 });
  const e = te(), t = {
    keyword: "allOf",
    schemaType: "array",
    code(o) {
      const { gen: n, schema: f, it: a } = o;
      if (!Array.isArray(f))
        throw new Error("ajv implementation error");
      const r = n.name("valid");
      f.forEach((u, i) => {
        if ((0, e.alwaysValidSchema)(a, u))
          return;
        const s = o.subschema({ keyword: "allOf", schemaProp: i }, r);
        o.ok(r), o.mergeEvaluated(s);
      });
    }
  };
  return Zt.default = t, Zt;
}
var Xt = {}, Ho;
function Pf() {
  if (Ho) return Xt;
  Ho = 1, Object.defineProperty(Xt, "__esModule", { value: !0 });
  const e = ee(), t = te(), n = {
    keyword: "if",
    schemaType: ["object", "boolean"],
    trackErrors: !0,
    error: {
      message: ({ params: a }) => (0, e.str)`must match "${a.ifClause}" schema`,
      params: ({ params: a }) => (0, e._)`{failingKeyword: ${a.ifClause}}`
    },
    code(a) {
      const { gen: r, parentSchema: u, it: i } = a;
      u.then === void 0 && u.else === void 0 && (0, t.checkStrictMode)(i, '"if" without "then" and "else" is ignored');
      const s = f(i, "then"), d = f(i, "else");
      if (!s && !d)
        return;
      const E = r.let("valid", !0), g = r.name("_valid");
      if (p(), a.reset(), s && d) {
        const $ = r.let("ifClause");
        a.setParams({ ifClause: $ }), r.if(g, w("then", $), w("else", $));
      } else s ? r.if(g, w("then")) : r.if((0, e.not)(g), w("else"));
      a.pass(E, () => a.error(!0));
      function p() {
        const $ = a.subschema({
          keyword: "if",
          compositeRule: !0,
          createErrors: !1,
          allErrors: !1
        }, g);
        a.mergeEvaluated($);
      }
      function w($, l) {
        return () => {
          const h = a.subschema({ keyword: $ }, g);
          r.assign(E, g), a.mergeValidEvaluated(h, E), l ? r.assign(l, (0, e._)`${$}`) : a.setParams({ ifClause: $ });
        };
      }
    }
  };
  function f(a, r) {
    const u = a.schema[r];
    return u !== void 0 && !(0, t.alwaysValidSchema)(a, u);
  }
  return Xt.default = n, Xt;
}
var Jt = {}, Bo;
function Tf() {
  if (Bo) return Jt;
  Bo = 1, Object.defineProperty(Jt, "__esModule", { value: !0 });
  const e = te(), t = {
    keyword: ["then", "else"],
    schemaType: ["object", "boolean"],
    code({ keyword: o, parentSchema: n, it: f }) {
      n.if === void 0 && (0, e.checkStrictMode)(f, `"${o}" without "if" is ignored`);
    }
  };
  return Jt.default = t, Jt;
}
var Ko;
function bf() {
  if (Ko) return kt;
  Ko = 1, Object.defineProperty(kt, "__esModule", { value: !0 });
  const e = Pc(), t = Ef(), o = Tc(), n = vf(), f = gf(), a = _f(), r = wf(), u = bc(), i = Sf(), s = $f(), d = Rf(), E = If(), g = Nf(), p = Of(), w = Pf(), $ = Tf();
  function l(h = !1) {
    const c = [
      // any
      d.default,
      E.default,
      g.default,
      p.default,
      w.default,
      $.default,
      // object
      r.default,
      u.default,
      a.default,
      i.default,
      s.default
    ];
    return h ? c.push(t.default, n.default) : c.push(e.default, o.default), c.push(f.default), c;
  }
  return kt.default = l, kt;
}
var Yt = {}, Qt = {}, Wo;
function Df() {
  if (Wo) return Qt;
  Wo = 1, Object.defineProperty(Qt, "__esModule", { value: !0 });
  const e = ee(), o = {
    keyword: "format",
    type: ["number", "string"],
    schemaType: "string",
    $data: !0,
    error: {
      message: ({ schemaCode: n }) => (0, e.str)`must match format "${n}"`,
      params: ({ schemaCode: n }) => (0, e._)`{format: ${n}}`
    },
    code(n, f) {
      const { gen: a, data: r, $data: u, schema: i, schemaCode: s, it: d } = n, { opts: E, errSchemaPath: g, schemaEnv: p, self: w } = d;
      if (!E.validateFormats)
        return;
      u ? $() : l();
      function $() {
        const h = a.scopeValue("formats", {
          ref: w.formats,
          code: E.code.formats
        }), c = a.const("fDef", (0, e._)`${h}[${s}]`), m = a.let("fType"), y = a.let("format");
        a.if((0, e._)`typeof ${c} == "object" && !(${c} instanceof RegExp)`, () => a.assign(m, (0, e._)`${c}.type || "string"`).assign(y, (0, e._)`${c}.validate`), () => a.assign(m, (0, e._)`"string"`).assign(y, c)), n.fail$data((0, e.or)(v(), _()));
        function v() {
          return E.strictSchema === !1 ? e.nil : (0, e._)`${s} && !${y}`;
        }
        function _() {
          const S = p.$async ? (0, e._)`(${c}.async ? await ${y}(${r}) : ${y}(${r}))` : (0, e._)`${y}(${r})`, R = (0, e._)`(typeof ${y} == "function" ? ${S} : ${y}.test(${r}))`;
          return (0, e._)`${y} && ${y} !== true && ${m} === ${f} && !${R}`;
        }
      }
      function l() {
        const h = w.formats[i];
        if (!h) {
          v();
          return;
        }
        if (h === !0)
          return;
        const [c, m, y] = _(h);
        c === f && n.pass(S());
        function v() {
          if (E.strictSchema === !1) {
            w.logger.warn(R());
            return;
          }
          throw new Error(R());
          function R() {
            return `unknown format "${i}" ignored in schema at path "${g}"`;
          }
        }
        function _(R) {
          const N = R instanceof RegExp ? (0, e.regexpCode)(R) : E.code.formats ? (0, e._)`${E.code.formats}${(0, e.getProperty)(i)}` : void 0, b = a.scopeValue("formats", { key: i, ref: R, code: N });
          return typeof R == "object" && !(R instanceof RegExp) ? [R.type || "string", R.validate, (0, e._)`${b}.validate`] : ["string", R, b];
        }
        function S() {
          if (typeof h == "object" && !(h instanceof RegExp) && h.async) {
            if (!p.$async)
              throw new Error("async format in sync schema");
            return (0, e._)`await ${y}(${r})`;
          }
          return typeof m == "function" ? (0, e._)`${y}(${r})` : (0, e._)`${y}.test(${r})`;
        }
      }
    }
  };
  return Qt.default = o, Qt;
}
var Zo;
function Cf() {
  if (Zo) return Yt;
  Zo = 1, Object.defineProperty(Yt, "__esModule", { value: !0 });
  const t = [Df().default];
  return Yt.default = t, Yt;
}
var Le = {}, Xo;
function Lf() {
  return Xo || (Xo = 1, Object.defineProperty(Le, "__esModule", { value: !0 }), Le.contentVocabulary = Le.metadataVocabulary = void 0, Le.metadataVocabulary = [
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
var Jo;
function Af() {
  if (Jo) return St;
  Jo = 1, Object.defineProperty(St, "__esModule", { value: !0 });
  const e = nf(), t = yf(), o = bf(), n = Cf(), f = Lf(), a = [
    e.default,
    t.default,
    (0, o.default)(),
    n.default,
    f.metadataVocabulary,
    f.contentVocabulary
  ];
  return St.default = a, St;
}
var er = {}, He = {}, Yo;
function Ff() {
  if (Yo) return He;
  Yo = 1, Object.defineProperty(He, "__esModule", { value: !0 }), He.DiscrError = void 0;
  var e;
  return function(t) {
    t.Tag = "tag", t.Mapping = "mapping";
  }(e || (He.DiscrError = e = {})), He;
}
var Qo;
function qf() {
  if (Qo) return er;
  Qo = 1, Object.defineProperty(er, "__esModule", { value: !0 });
  const e = ee(), t = Ff(), o = Oi(), n = dr(), f = te(), r = {
    keyword: "discriminator",
    type: "object",
    schemaType: "object",
    error: {
      message: ({ params: { discrError: u, tagName: i } }) => u === t.DiscrError.Tag ? `tag "${i}" must be string` : `value of tag "${i}" must be in oneOf`,
      params: ({ params: { discrError: u, tag: i, tagName: s } }) => (0, e._)`{error: ${u}, tag: ${s}, tagValue: ${i}}`
    },
    code(u) {
      const { gen: i, data: s, schema: d, parentSchema: E, it: g } = u, { oneOf: p } = E;
      if (!g.opts.discriminator)
        throw new Error("discriminator: requires discriminator option");
      const w = d.propertyName;
      if (typeof w != "string")
        throw new Error("discriminator: requires propertyName");
      if (d.mapping)
        throw new Error("discriminator: mapping is not supported");
      if (!p)
        throw new Error("discriminator: requires oneOf keyword");
      const $ = i.let("valid", !1), l = i.const("tag", (0, e._)`${s}${(0, e.getProperty)(w)}`);
      i.if((0, e._)`typeof ${l} == "string"`, () => h(), () => u.error(!1, { discrError: t.DiscrError.Tag, tag: l, tagName: w })), u.ok($);
      function h() {
        const y = m();
        i.if(!1);
        for (const v in y)
          i.elseIf((0, e._)`${l} === ${v}`), i.assign($, c(y[v]));
        i.else(), u.error(!1, { discrError: t.DiscrError.Mapping, tag: l, tagName: w }), i.endIf();
      }
      function c(y) {
        const v = i.name("valid"), _ = u.subschema({ keyword: "oneOf", schemaProp: y }, v);
        return u.mergeEvaluated(_, e.Name), v;
      }
      function m() {
        var y;
        const v = {}, _ = R(E);
        let S = !0;
        for (let M = 0; M < p.length; M++) {
          let G = p[M];
          if (G?.$ref && !(0, f.schemaHasRulesButRef)(G, g.self.RULES)) {
            const U = G.$ref;
            if (G = o.resolveRef.call(g.self, g.schemaEnv.root, g.baseId, U), G instanceof o.SchemaEnv && (G = G.schema), G === void 0)
              throw new n.default(g.opts.uriResolver, g.baseId, U);
          }
          const k = (y = G?.properties) === null || y === void 0 ? void 0 : y[w];
          if (typeof k != "object")
            throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${w}"`);
          S = S && (_ || R(G)), N(k, M);
        }
        if (!S)
          throw new Error(`discriminator: "${w}" must be required`);
        return v;
        function R({ required: M }) {
          return Array.isArray(M) && M.includes(w);
        }
        function N(M, G) {
          if (M.const)
            b(M.const, G);
          else if (M.enum)
            for (const k of M.enum)
              b(k, G);
          else
            throw new Error(`discriminator: "properties/${w}" must have "const" or "enum"`);
        }
        function b(M, G) {
          if (typeof M != "string" || M in v)
            throw new Error(`discriminator: "${w}" values must be unique strings`);
          v[M] = G;
        }
      }
    }
  };
  return er.default = r, er;
}
const jf = "http://json-schema.org/draft-07/schema#", kf = "http://json-schema.org/draft-07/schema#", Mf = "Core schema meta-schema", Uf = { schemaArray: { type: "array", minItems: 1, items: { $ref: "#" } }, nonNegativeInteger: { type: "integer", minimum: 0 }, nonNegativeIntegerDefault0: { allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }] }, simpleTypes: { enum: ["array", "boolean", "integer", "null", "number", "object", "string"] }, stringArray: { type: "array", items: { type: "string" }, uniqueItems: !0, default: [] } }, xf = ["object", "boolean"], zf = { $id: { type: "string", format: "uri-reference" }, $schema: { type: "string", format: "uri" }, $ref: { type: "string", format: "uri-reference" }, $comment: { type: "string" }, title: { type: "string" }, description: { type: "string" }, default: !0, readOnly: { type: "boolean", default: !1 }, examples: { type: "array", items: !0 }, multipleOf: { type: "number", exclusiveMinimum: 0 }, maximum: { type: "number" }, exclusiveMaximum: { type: "number" }, minimum: { type: "number" }, exclusiveMinimum: { type: "number" }, maxLength: { $ref: "#/definitions/nonNegativeInteger" }, minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, pattern: { type: "string", format: "regex" }, additionalItems: { $ref: "#" }, items: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }], default: !0 }, maxItems: { $ref: "#/definitions/nonNegativeInteger" }, minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, uniqueItems: { type: "boolean", default: !1 }, contains: { $ref: "#" }, maxProperties: { $ref: "#/definitions/nonNegativeInteger" }, minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, required: { $ref: "#/definitions/stringArray" }, additionalProperties: { $ref: "#" }, definitions: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, properties: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, patternProperties: { type: "object", additionalProperties: { $ref: "#" }, propertyNames: { format: "regex" }, default: {} }, dependencies: { type: "object", additionalProperties: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }] } }, propertyNames: { $ref: "#" }, const: !0, enum: { type: "array", items: !0, minItems: 1, uniqueItems: !0 }, type: { anyOf: [{ $ref: "#/definitions/simpleTypes" }, { type: "array", items: { $ref: "#/definitions/simpleTypes" }, minItems: 1, uniqueItems: !0 }] }, format: { type: "string" }, contentMediaType: { type: "string" }, contentEncoding: { type: "string" }, if: { $ref: "#" }, then: { $ref: "#" }, else: { $ref: "#" }, allOf: { $ref: "#/definitions/schemaArray" }, anyOf: { $ref: "#/definitions/schemaArray" }, oneOf: { $ref: "#/definitions/schemaArray" }, not: { $ref: "#" } }, Vf = {
  $schema: jf,
  $id: kf,
  title: Mf,
  definitions: Uf,
  type: xf,
  properties: zf,
  default: !0
};
var ea;
function Dc() {
  return ea || (ea = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
    const o = ef(), n = Af(), f = qf(), a = Vf, r = ["/properties"], u = "http://json-schema.org/draft-07/schema";
    class i extends o.default {
      _addVocabularies() {
        super._addVocabularies(), n.default.forEach((w) => this.addVocabulary(w)), this.opts.discriminator && this.addKeyword(f.default);
      }
      _addDefaultMetaSchema() {
        if (super._addDefaultMetaSchema(), !this.opts.meta)
          return;
        const w = this.opts.$data ? this.$dataMetaSchema(a, r) : a;
        this.addMetaSchema(w, u, !1), this.refs["http://json-schema.org/schema"] = u;
      }
      defaultMeta() {
        return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(u) ? u : void 0);
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
    var E = Ni();
    Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
      return E.default;
    } });
    var g = dr();
    Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
      return g.default;
    } });
  }(Et, Et.exports)), Et.exports;
}
var tr = { exports: {} }, mn = {}, ta;
function Gf() {
  return ta || (ta = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
    function t(N, b) {
      return { validate: N, compare: b };
    }
    e.fullFormats = {
      // date: http://tools.ietf.org/html/rfc3339#section-5.6
      date: t(a, r),
      // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
      time: t(i, s),
      "date-time": t(E, g),
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
      int32: { type: "number", validate: y },
      // signed 64 bit integer
      int64: { type: "number", validate: v },
      // C-type float
      float: { type: "number", validate: _ },
      // C-type double
      double: { type: "number", validate: _ },
      // hint to the UI to hide input strings
      password: !0,
      // unchecked string payload
      binary: !0
    }, e.fastFormats = {
      ...e.fullFormats,
      date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, r),
      time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, s),
      "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, g),
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
    const n = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, f = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function a(N) {
      const b = n.exec(N);
      if (!b)
        return !1;
      const M = +b[1], G = +b[2], k = +b[3];
      return G >= 1 && G <= 12 && k >= 1 && k <= (G === 2 && o(M) ? 29 : f[G]);
    }
    function r(N, b) {
      if (N && b)
        return N > b ? 1 : N < b ? -1 : 0;
    }
    const u = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
    function i(N, b) {
      const M = u.exec(N);
      if (!M)
        return !1;
      const G = +M[1], k = +M[2], U = +M[3], x = M[5];
      return (G <= 23 && k <= 59 && U <= 59 || G === 23 && k === 59 && U === 60) && (!b || x !== "");
    }
    function s(N, b) {
      if (!(N && b))
        return;
      const M = u.exec(N), G = u.exec(b);
      if (M && G)
        return N = M[1] + M[2] + M[3] + (M[4] || ""), b = G[1] + G[2] + G[3] + (G[4] || ""), N > b ? 1 : N < b ? -1 : 0;
    }
    const d = /t|\s/i;
    function E(N) {
      const b = N.split(d);
      return b.length === 2 && a(b[0]) && i(b[1], !0);
    }
    function g(N, b) {
      if (!(N && b))
        return;
      const [M, G] = N.split(d), [k, U] = b.split(d), x = r(M, k);
      if (x !== void 0)
        return x || s(G, U);
    }
    const p = /\/|:/, w = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
    function $(N) {
      return p.test(N) && w.test(N);
    }
    const l = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
    function h(N) {
      return l.lastIndex = 0, l.test(N);
    }
    const c = -2147483648, m = 2 ** 31 - 1;
    function y(N) {
      return Number.isInteger(N) && N <= m && N >= c;
    }
    function v(N) {
      return Number.isInteger(N);
    }
    function _() {
      return !0;
    }
    const S = /[^\\]\\Z/;
    function R(N) {
      if (S.test(N))
        return !1;
      try {
        return new RegExp(N), !0;
      } catch {
        return !1;
      }
    }
  }(mn)), mn;
}
var pn = {}, ra;
function Hf() {
  return ra || (ra = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
    const t = Dc(), o = ee(), n = o.operators, f = {
      formatMaximum: { okStr: "<=", ok: n.LTE, fail: n.GT },
      formatMinimum: { okStr: ">=", ok: n.GTE, fail: n.LT },
      formatExclusiveMaximum: { okStr: "<", ok: n.LT, fail: n.GTE },
      formatExclusiveMinimum: { okStr: ">", ok: n.GT, fail: n.LTE }
    }, a = {
      message: ({ keyword: u, schemaCode: i }) => o.str`should be ${f[u].okStr} ${i}`,
      params: ({ keyword: u, schemaCode: i }) => o._`{comparison: ${f[u].okStr}, limit: ${i}}`
    };
    e.formatLimitDefinition = {
      keyword: Object.keys(f),
      type: "string",
      schemaType: "string",
      $data: !0,
      error: a,
      code(u) {
        const { gen: i, data: s, schemaCode: d, keyword: E, it: g } = u, { opts: p, self: w } = g;
        if (!p.validateFormats)
          return;
        const $ = new t.KeywordCxt(g, w.RULES.all.format.definition, "format");
        $.$data ? l() : h();
        function l() {
          const m = i.scopeValue("formats", {
            ref: w.formats,
            code: p.code.formats
          }), y = i.const("fmt", o._`${m}[${$.schemaCode}]`);
          u.fail$data(o.or(o._`typeof ${y} != "object"`, o._`${y} instanceof RegExp`, o._`typeof ${y}.compare != "function"`, c(y)));
        }
        function h() {
          const m = $.schema, y = w.formats[m];
          if (!y || y === !0)
            return;
          if (typeof y != "object" || y instanceof RegExp || typeof y.compare != "function")
            throw new Error(`"${E}": format "${m}" does not define "compare" function`);
          const v = i.scopeValue("formats", {
            key: m,
            ref: y,
            code: p.code.formats ? o._`${p.code.formats}${o.getProperty(m)}` : void 0
          });
          u.fail$data(c(v));
        }
        function c(m) {
          return o._`${m}.compare(${s}, ${d}) ${f[E].fail} 0`;
        }
      },
      dependencies: ["format"]
    };
    const r = (u) => (u.addKeyword(e.formatLimitDefinition), u);
    e.default = r;
  }(pn)), pn;
}
var na;
function Bf() {
  return na || (na = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 });
    const o = Gf(), n = Hf(), f = ee(), a = new f.Name("fullFormats"), r = new f.Name("fastFormats"), u = (s, d = { keywords: !0 }) => {
      if (Array.isArray(d))
        return i(s, d, o.fullFormats, a), s;
      const [E, g] = d.mode === "fast" ? [o.fastFormats, r] : [o.fullFormats, a], p = d.formats || o.formatNames;
      return i(s, p, E, g), d.keywords && n.default(s), s;
    };
    u.get = (s, d = "full") => {
      const g = (d === "fast" ? o.fastFormats : o.fullFormats)[s];
      if (!g)
        throw new Error(`Unknown format "${s}"`);
      return g;
    };
    function i(s, d, E, g) {
      var p, w;
      (p = (w = s.opts.code).formats) !== null && p !== void 0 || (w.formats = f._`require("ajv-formats/dist/formats").${g}`);
      for (const $ of d)
        s.addFormat($, E[$]);
    }
    e.exports = t = u, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = u;
  }(tr, tr.exports)), tr.exports;
}
var yn, ia;
function Kf() {
  if (ia) return yn;
  ia = 1;
  const e = (i, s, d, E) => {
    if (d === "length" || d === "prototype" || d === "arguments" || d === "caller")
      return;
    const g = Object.getOwnPropertyDescriptor(i, d), p = Object.getOwnPropertyDescriptor(s, d);
    !t(g, p) && E || Object.defineProperty(i, d, p);
  }, t = function(i, s) {
    return i === void 0 || i.configurable || i.writable === s.writable && i.enumerable === s.enumerable && i.configurable === s.configurable && (i.writable || i.value === s.value);
  }, o = (i, s) => {
    const d = Object.getPrototypeOf(s);
    d !== Object.getPrototypeOf(i) && Object.setPrototypeOf(i, d);
  }, n = (i, s) => `/* Wrapped ${i}*/
${s}`, f = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), a = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), r = (i, s, d) => {
    const E = d === "" ? "" : `with ${d.trim()}() `, g = n.bind(null, E, s.toString());
    Object.defineProperty(g, "name", a), Object.defineProperty(i, "toString", { ...f, value: g });
  };
  return yn = (i, s, { ignoreNonConfigurable: d = !1 } = {}) => {
    const { name: E } = i;
    for (const g of Reflect.ownKeys(s))
      e(i, s, g, d);
    return o(i, s), r(i, s, E), i;
  }, yn;
}
var En, sa;
function Wf() {
  if (sa) return En;
  sa = 1;
  const e = Kf();
  return En = (t, o = {}) => {
    if (typeof t != "function")
      throw new TypeError(`Expected the first argument to be a function, got \`${typeof t}\``);
    const {
      wait: n = 0,
      before: f = !1,
      after: a = !0
    } = o;
    if (!f && !a)
      throw new Error("Both `before` and `after` are false, function wouldn't be called.");
    let r, u;
    const i = function(...s) {
      const d = this, E = () => {
        r = void 0, a && (u = t.apply(d, s));
      }, g = f && !r;
      return clearTimeout(r), r = setTimeout(E, n), g && (u = t.apply(d, s)), u;
    };
    return e(i, t), i.cancel = () => {
      r && (clearTimeout(r), r = void 0);
    }, i;
  }, En;
}
var rr = { exports: {} }, vn, oa;
function hr() {
  if (oa) return vn;
  oa = 1;
  const e = "2.0.0", t = 256, o = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991, n = 16, f = t - 6;
  return vn = {
    MAX_LENGTH: t,
    MAX_SAFE_COMPONENT_LENGTH: n,
    MAX_SAFE_BUILD_LENGTH: f,
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
  }, vn;
}
var gn, aa;
function mr() {
  return aa || (aa = 1, gn = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...t) => console.error("SEMVER", ...t) : () => {
  }), gn;
}
var ca;
function Je() {
  return ca || (ca = 1, function(e, t) {
    const {
      MAX_SAFE_COMPONENT_LENGTH: o,
      MAX_SAFE_BUILD_LENGTH: n,
      MAX_LENGTH: f
    } = hr(), a = mr();
    t = e.exports = {};
    const r = t.re = [], u = t.safeRe = [], i = t.src = [], s = t.t = {};
    let d = 0;
    const E = "[a-zA-Z0-9-]", g = [
      ["\\s", 1],
      ["\\d", f],
      [E, n]
    ], p = ($) => {
      for (const [l, h] of g)
        $ = $.split(`${l}*`).join(`${l}{0,${h}}`).split(`${l}+`).join(`${l}{1,${h}}`);
      return $;
    }, w = ($, l, h) => {
      const c = p(l), m = d++;
      a($, m, l), s[$] = m, i[m] = l, r[m] = new RegExp(l, h ? "g" : void 0), u[m] = new RegExp(c, h ? "g" : void 0);
    };
    w("NUMERICIDENTIFIER", "0|[1-9]\\d*"), w("NUMERICIDENTIFIERLOOSE", "\\d+"), w("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${E}*`), w("MAINVERSION", `(${i[s.NUMERICIDENTIFIER]})\\.(${i[s.NUMERICIDENTIFIER]})\\.(${i[s.NUMERICIDENTIFIER]})`), w("MAINVERSIONLOOSE", `(${i[s.NUMERICIDENTIFIERLOOSE]})\\.(${i[s.NUMERICIDENTIFIERLOOSE]})\\.(${i[s.NUMERICIDENTIFIERLOOSE]})`), w("PRERELEASEIDENTIFIER", `(?:${i[s.NUMERICIDENTIFIER]}|${i[s.NONNUMERICIDENTIFIER]})`), w("PRERELEASEIDENTIFIERLOOSE", `(?:${i[s.NUMERICIDENTIFIERLOOSE]}|${i[s.NONNUMERICIDENTIFIER]})`), w("PRERELEASE", `(?:-(${i[s.PRERELEASEIDENTIFIER]}(?:\\.${i[s.PRERELEASEIDENTIFIER]})*))`), w("PRERELEASELOOSE", `(?:-?(${i[s.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${i[s.PRERELEASEIDENTIFIERLOOSE]})*))`), w("BUILDIDENTIFIER", `${E}+`), w("BUILD", `(?:\\+(${i[s.BUILDIDENTIFIER]}(?:\\.${i[s.BUILDIDENTIFIER]})*))`), w("FULLPLAIN", `v?${i[s.MAINVERSION]}${i[s.PRERELEASE]}?${i[s.BUILD]}?`), w("FULL", `^${i[s.FULLPLAIN]}$`), w("LOOSEPLAIN", `[v=\\s]*${i[s.MAINVERSIONLOOSE]}${i[s.PRERELEASELOOSE]}?${i[s.BUILD]}?`), w("LOOSE", `^${i[s.LOOSEPLAIN]}$`), w("GTLT", "((?:<|>)?=?)"), w("XRANGEIDENTIFIERLOOSE", `${i[s.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), w("XRANGEIDENTIFIER", `${i[s.NUMERICIDENTIFIER]}|x|X|\\*`), w("XRANGEPLAIN", `[v=\\s]*(${i[s.XRANGEIDENTIFIER]})(?:\\.(${i[s.XRANGEIDENTIFIER]})(?:\\.(${i[s.XRANGEIDENTIFIER]})(?:${i[s.PRERELEASE]})?${i[s.BUILD]}?)?)?`), w("XRANGEPLAINLOOSE", `[v=\\s]*(${i[s.XRANGEIDENTIFIERLOOSE]})(?:\\.(${i[s.XRANGEIDENTIFIERLOOSE]})(?:\\.(${i[s.XRANGEIDENTIFIERLOOSE]})(?:${i[s.PRERELEASELOOSE]})?${i[s.BUILD]}?)?)?`), w("XRANGE", `^${i[s.GTLT]}\\s*${i[s.XRANGEPLAIN]}$`), w("XRANGELOOSE", `^${i[s.GTLT]}\\s*${i[s.XRANGEPLAINLOOSE]}$`), w("COERCEPLAIN", `(^|[^\\d])(\\d{1,${o}})(?:\\.(\\d{1,${o}}))?(?:\\.(\\d{1,${o}}))?`), w("COERCE", `${i[s.COERCEPLAIN]}(?:$|[^\\d])`), w("COERCEFULL", i[s.COERCEPLAIN] + `(?:${i[s.PRERELEASE]})?(?:${i[s.BUILD]})?(?:$|[^\\d])`), w("COERCERTL", i[s.COERCE], !0), w("COERCERTLFULL", i[s.COERCEFULL], !0), w("LONETILDE", "(?:~>?)"), w("TILDETRIM", `(\\s*)${i[s.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", w("TILDE", `^${i[s.LONETILDE]}${i[s.XRANGEPLAIN]}$`), w("TILDELOOSE", `^${i[s.LONETILDE]}${i[s.XRANGEPLAINLOOSE]}$`), w("LONECARET", "(?:\\^)"), w("CARETTRIM", `(\\s*)${i[s.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", w("CARET", `^${i[s.LONECARET]}${i[s.XRANGEPLAIN]}$`), w("CARETLOOSE", `^${i[s.LONECARET]}${i[s.XRANGEPLAINLOOSE]}$`), w("COMPARATORLOOSE", `^${i[s.GTLT]}\\s*(${i[s.LOOSEPLAIN]})$|^$`), w("COMPARATOR", `^${i[s.GTLT]}\\s*(${i[s.FULLPLAIN]})$|^$`), w("COMPARATORTRIM", `(\\s*)${i[s.GTLT]}\\s*(${i[s.LOOSEPLAIN]}|${i[s.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", w("HYPHENRANGE", `^\\s*(${i[s.XRANGEPLAIN]})\\s+-\\s+(${i[s.XRANGEPLAIN]})\\s*$`), w("HYPHENRANGELOOSE", `^\\s*(${i[s.XRANGEPLAINLOOSE]})\\s+-\\s+(${i[s.XRANGEPLAINLOOSE]})\\s*$`), w("STAR", "(<|>)?=?\\s*\\*"), w("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), w("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }(rr, rr.exports)), rr.exports;
}
var _n, ua;
function Ti() {
  if (ua) return _n;
  ua = 1;
  const e = Object.freeze({ loose: !0 }), t = Object.freeze({});
  return _n = (n) => n ? typeof n != "object" ? e : n : t, _n;
}
var wn, fa;
function Cc() {
  if (fa) return wn;
  fa = 1;
  const e = /^[0-9]+$/, t = (n, f) => {
    const a = e.test(n), r = e.test(f);
    return a && r && (n = +n, f = +f), n === f ? 0 : a && !r ? -1 : r && !a ? 1 : n < f ? -1 : 1;
  };
  return wn = {
    compareIdentifiers: t,
    rcompareIdentifiers: (n, f) => t(f, n)
  }, wn;
}
var Sn, la;
function fe() {
  if (la) return Sn;
  la = 1;
  const e = mr(), { MAX_LENGTH: t, MAX_SAFE_INTEGER: o } = hr(), { safeRe: n, t: f } = Je(), a = Ti(), { compareIdentifiers: r } = Cc();
  class u {
    constructor(s, d) {
      if (d = a(d), s instanceof u) {
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
      const E = s.trim().match(d.loose ? n[f.LOOSE] : n[f.FULL]);
      if (!E)
        throw new TypeError(`Invalid Version: ${s}`);
      if (this.raw = s, this.major = +E[1], this.minor = +E[2], this.patch = +E[3], this.major > o || this.major < 0)
        throw new TypeError("Invalid major version");
      if (this.minor > o || this.minor < 0)
        throw new TypeError("Invalid minor version");
      if (this.patch > o || this.patch < 0)
        throw new TypeError("Invalid patch version");
      E[4] ? this.prerelease = E[4].split(".").map((g) => {
        if (/^[0-9]+$/.test(g)) {
          const p = +g;
          if (p >= 0 && p < o)
            return p;
        }
        return g;
      }) : this.prerelease = [], this.build = E[5] ? E[5].split(".") : [], this.format();
    }
    format() {
      return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
    }
    toString() {
      return this.version;
    }
    compare(s) {
      if (e("SemVer.compare", this.version, this.options, s), !(s instanceof u)) {
        if (typeof s == "string" && s === this.version)
          return 0;
        s = new u(s, this.options);
      }
      return s.version === this.version ? 0 : this.compareMain(s) || this.comparePre(s);
    }
    compareMain(s) {
      return s instanceof u || (s = new u(s, this.options)), r(this.major, s.major) || r(this.minor, s.minor) || r(this.patch, s.patch);
    }
    comparePre(s) {
      if (s instanceof u || (s = new u(s, this.options)), this.prerelease.length && !s.prerelease.length)
        return -1;
      if (!this.prerelease.length && s.prerelease.length)
        return 1;
      if (!this.prerelease.length && !s.prerelease.length)
        return 0;
      let d = 0;
      do {
        const E = this.prerelease[d], g = s.prerelease[d];
        if (e("prerelease compare", d, E, g), E === void 0 && g === void 0)
          return 0;
        if (g === void 0)
          return 1;
        if (E === void 0)
          return -1;
        if (E === g)
          continue;
        return r(E, g);
      } while (++d);
    }
    compareBuild(s) {
      s instanceof u || (s = new u(s, this.options));
      let d = 0;
      do {
        const E = this.build[d], g = s.build[d];
        if (e("build compare", d, E, g), E === void 0 && g === void 0)
          return 0;
        if (g === void 0)
          return 1;
        if (E === void 0)
          return -1;
        if (E === g)
          continue;
        return r(E, g);
      } while (++d);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(s, d, E) {
      switch (s) {
        case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", d, E);
          break;
        case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", d, E);
          break;
        case "prepatch":
          this.prerelease.length = 0, this.inc("patch", d, E), this.inc("pre", d, E);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          this.prerelease.length === 0 && this.inc("patch", d, E), this.inc("pre", d, E);
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
          const g = Number(E) ? 1 : 0;
          if (!d && E === !1)
            throw new Error("invalid increment argument: identifier is empty");
          if (this.prerelease.length === 0)
            this.prerelease = [g];
          else {
            let p = this.prerelease.length;
            for (; --p >= 0; )
              typeof this.prerelease[p] == "number" && (this.prerelease[p]++, p = -2);
            if (p === -1) {
              if (d === this.prerelease.join(".") && E === !1)
                throw new Error("invalid increment argument: identifier already exists");
              this.prerelease.push(g);
            }
          }
          if (d) {
            let p = [d, g];
            E === !1 && (p = [d]), r(this.prerelease[0], d) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = p) : this.prerelease = p;
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${s}`);
      }
      return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
    }
  }
  return Sn = u, Sn;
}
var $n, da;
function xe() {
  if (da) return $n;
  da = 1;
  const e = fe();
  return $n = (o, n, f = !1) => {
    if (o instanceof e)
      return o;
    try {
      return new e(o, n);
    } catch (a) {
      if (!f)
        return null;
      throw a;
    }
  }, $n;
}
var Rn, ha;
function Zf() {
  if (ha) return Rn;
  ha = 1;
  const e = xe();
  return Rn = (o, n) => {
    const f = e(o, n);
    return f ? f.version : null;
  }, Rn;
}
var In, ma;
function Xf() {
  if (ma) return In;
  ma = 1;
  const e = xe();
  return In = (o, n) => {
    const f = e(o.trim().replace(/^[=v]+/, ""), n);
    return f ? f.version : null;
  }, In;
}
var Nn, pa;
function Jf() {
  if (pa) return Nn;
  pa = 1;
  const e = fe();
  return Nn = (o, n, f, a, r) => {
    typeof f == "string" && (r = a, a = f, f = void 0);
    try {
      return new e(
        o instanceof e ? o.version : o,
        f
      ).inc(n, a, r).version;
    } catch {
      return null;
    }
  }, Nn;
}
var On, ya;
function Yf() {
  if (ya) return On;
  ya = 1;
  const e = xe();
  return On = (o, n) => {
    const f = e(o, null, !0), a = e(n, null, !0), r = f.compare(a);
    if (r === 0)
      return null;
    const u = r > 0, i = u ? f : a, s = u ? a : f, d = !!i.prerelease.length;
    if (!!s.prerelease.length && !d)
      return !s.patch && !s.minor ? "major" : i.patch ? "patch" : i.minor ? "minor" : "major";
    const g = d ? "pre" : "";
    return f.major !== a.major ? g + "major" : f.minor !== a.minor ? g + "minor" : f.patch !== a.patch ? g + "patch" : "prerelease";
  }, On;
}
var Pn, Ea;
function Qf() {
  if (Ea) return Pn;
  Ea = 1;
  const e = fe();
  return Pn = (o, n) => new e(o, n).major, Pn;
}
var Tn, va;
function el() {
  if (va) return Tn;
  va = 1;
  const e = fe();
  return Tn = (o, n) => new e(o, n).minor, Tn;
}
var bn, ga;
function tl() {
  if (ga) return bn;
  ga = 1;
  const e = fe();
  return bn = (o, n) => new e(o, n).patch, bn;
}
var Dn, _a;
function rl() {
  if (_a) return Dn;
  _a = 1;
  const e = xe();
  return Dn = (o, n) => {
    const f = e(o, n);
    return f && f.prerelease.length ? f.prerelease : null;
  }, Dn;
}
var Cn, wa;
function we() {
  if (wa) return Cn;
  wa = 1;
  const e = fe();
  return Cn = (o, n, f) => new e(o, f).compare(new e(n, f)), Cn;
}
var Ln, Sa;
function nl() {
  if (Sa) return Ln;
  Sa = 1;
  const e = we();
  return Ln = (o, n, f) => e(n, o, f), Ln;
}
var An, $a;
function il() {
  if ($a) return An;
  $a = 1;
  const e = we();
  return An = (o, n) => e(o, n, !0), An;
}
var Fn, Ra;
function bi() {
  if (Ra) return Fn;
  Ra = 1;
  const e = fe();
  return Fn = (o, n, f) => {
    const a = new e(o, f), r = new e(n, f);
    return a.compare(r) || a.compareBuild(r);
  }, Fn;
}
var qn, Ia;
function sl() {
  if (Ia) return qn;
  Ia = 1;
  const e = bi();
  return qn = (o, n) => o.sort((f, a) => e(f, a, n)), qn;
}
var jn, Na;
function ol() {
  if (Na) return jn;
  Na = 1;
  const e = bi();
  return jn = (o, n) => o.sort((f, a) => e(a, f, n)), jn;
}
var kn, Oa;
function pr() {
  if (Oa) return kn;
  Oa = 1;
  const e = we();
  return kn = (o, n, f) => e(o, n, f) > 0, kn;
}
var Mn, Pa;
function Di() {
  if (Pa) return Mn;
  Pa = 1;
  const e = we();
  return Mn = (o, n, f) => e(o, n, f) < 0, Mn;
}
var Un, Ta;
function Lc() {
  if (Ta) return Un;
  Ta = 1;
  const e = we();
  return Un = (o, n, f) => e(o, n, f) === 0, Un;
}
var xn, ba;
function Ac() {
  if (ba) return xn;
  ba = 1;
  const e = we();
  return xn = (o, n, f) => e(o, n, f) !== 0, xn;
}
var zn, Da;
function Ci() {
  if (Da) return zn;
  Da = 1;
  const e = we();
  return zn = (o, n, f) => e(o, n, f) >= 0, zn;
}
var Vn, Ca;
function Li() {
  if (Ca) return Vn;
  Ca = 1;
  const e = we();
  return Vn = (o, n, f) => e(o, n, f) <= 0, Vn;
}
var Gn, La;
function Fc() {
  if (La) return Gn;
  La = 1;
  const e = Lc(), t = Ac(), o = pr(), n = Ci(), f = Di(), a = Li();
  return Gn = (u, i, s, d) => {
    switch (i) {
      case "===":
        return typeof u == "object" && (u = u.version), typeof s == "object" && (s = s.version), u === s;
      case "!==":
        return typeof u == "object" && (u = u.version), typeof s == "object" && (s = s.version), u !== s;
      case "":
      case "=":
      case "==":
        return e(u, s, d);
      case "!=":
        return t(u, s, d);
      case ">":
        return o(u, s, d);
      case ">=":
        return n(u, s, d);
      case "<":
        return f(u, s, d);
      case "<=":
        return a(u, s, d);
      default:
        throw new TypeError(`Invalid operator: ${i}`);
    }
  }, Gn;
}
var Hn, Aa;
function al() {
  if (Aa) return Hn;
  Aa = 1;
  const e = fe(), t = xe(), { safeRe: o, t: n } = Je();
  return Hn = (a, r) => {
    if (a instanceof e)
      return a;
    if (typeof a == "number" && (a = String(a)), typeof a != "string")
      return null;
    r = r || {};
    let u = null;
    if (!r.rtl)
      u = a.match(r.includePrerelease ? o[n.COERCEFULL] : o[n.COERCE]);
    else {
      const p = r.includePrerelease ? o[n.COERCERTLFULL] : o[n.COERCERTL];
      let w;
      for (; (w = p.exec(a)) && (!u || u.index + u[0].length !== a.length); )
        (!u || w.index + w[0].length !== u.index + u[0].length) && (u = w), p.lastIndex = w.index + w[1].length + w[2].length;
      p.lastIndex = -1;
    }
    if (u === null)
      return null;
    const i = u[2], s = u[3] || "0", d = u[4] || "0", E = r.includePrerelease && u[5] ? `-${u[5]}` : "", g = r.includePrerelease && u[6] ? `+${u[6]}` : "";
    return t(`${i}.${s}.${d}${E}${g}`, r);
  }, Hn;
}
var Bn, Fa;
function cl() {
  if (Fa) return Bn;
  Fa = 1;
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
  return Bn = e, Bn;
}
var Kn, qa;
function Se() {
  if (qa) return Kn;
  qa = 1;
  const e = /\s+/g;
  class t {
    constructor(x, K) {
      if (K = f(K), x instanceof t)
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
      const V = ((this.options.includePrerelease && p) | (this.options.loose && w)) + ":" + x, C = n.get(V);
      if (C)
        return C;
      const j = this.options.loose, T = j ? i[s.HYPHENRANGELOOSE] : i[s.HYPHENRANGE];
      x = x.replace(T, G(this.options.includePrerelease)), r("hyphen replace", x), x = x.replace(i[s.COMPARATORTRIM], d), r("comparator trim", x), x = x.replace(i[s.TILDETRIM], E), r("tilde trim", x), x = x.replace(i[s.CARETTRIM], g), r("caret trim", x);
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
          x = new u(x, this.options);
        } catch {
          return !1;
        }
      for (let K = 0; K < this.set.length; K++)
        if (k(this.set[K], x, this.options))
          return !0;
      return !1;
    }
  }
  Kn = t;
  const o = cl(), n = new o(), f = Ti(), a = yr(), r = mr(), u = fe(), {
    safeRe: i,
    t: s,
    comparatorTrimReplace: d,
    tildeTrimReplace: E,
    caretTrimReplace: g
  } = Je(), { FLAG_INCLUDE_PRERELEASE: p, FLAG_LOOSE: w } = hr(), $ = (U) => U.value === "<0.0.0-0", l = (U) => U.value === "", h = (U, x) => {
    let K = !0;
    const V = U.slice();
    let C = V.pop();
    for (; K && V.length; )
      K = V.every((j) => C.intersects(j, x)), C = V.pop();
    return K;
  }, c = (U, x) => (r("comp", U, x), U = _(U, x), r("caret", U), U = y(U, x), r("tildes", U), U = R(U, x), r("xrange", U), U = b(U, x), r("stars", U), U), m = (U) => !U || U.toLowerCase() === "x" || U === "*", y = (U, x) => U.trim().split(/\s+/).map((K) => v(K, x)).join(" "), v = (U, x) => {
    const K = x.loose ? i[s.TILDELOOSE] : i[s.TILDE];
    return U.replace(K, (V, C, j, T, P) => {
      r("tilde", U, V, C, j, T, P);
      let q;
      return m(C) ? q = "" : m(j) ? q = `>=${C}.0.0 <${+C + 1}.0.0-0` : m(T) ? q = `>=${C}.${j}.0 <${C}.${+j + 1}.0-0` : P ? (r("replaceTilde pr", P), q = `>=${C}.${j}.${T}-${P} <${C}.${+j + 1}.0-0`) : q = `>=${C}.${j}.${T} <${C}.${+j + 1}.0-0`, r("tilde return", q), q;
    });
  }, _ = (U, x) => U.trim().split(/\s+/).map((K) => S(K, x)).join(" "), S = (U, x) => {
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
  return Kn;
}
var Wn, ja;
function yr() {
  if (ja) return Wn;
  ja = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(d, E) {
      if (E = o(E), d instanceof t) {
        if (d.loose === !!E.loose)
          return d;
        d = d.value;
      }
      d = d.trim().split(/\s+/).join(" "), r("comparator", d, E), this.options = E, this.loose = !!E.loose, this.parse(d), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, r("comp", this);
    }
    parse(d) {
      const E = this.options.loose ? n[f.COMPARATORLOOSE] : n[f.COMPARATOR], g = d.match(E);
      if (!g)
        throw new TypeError(`Invalid comparator: ${d}`);
      this.operator = g[1] !== void 0 ? g[1] : "", this.operator === "=" && (this.operator = ""), g[2] ? this.semver = new u(g[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(d) {
      if (r("Comparator.test", d, this.options.loose), this.semver === e || d === e)
        return !0;
      if (typeof d == "string")
        try {
          d = new u(d, this.options);
        } catch {
          return !1;
        }
      return a(d, this.operator, this.semver, this.options);
    }
    intersects(d, E) {
      if (!(d instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new i(d.value, E).test(this.value) : d.operator === "" ? d.value === "" ? !0 : new i(this.value, E).test(d.semver) : (E = o(E), E.includePrerelease && (this.value === "<0.0.0-0" || d.value === "<0.0.0-0") || !E.includePrerelease && (this.value.startsWith("<0.0.0") || d.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && d.operator.startsWith(">") || this.operator.startsWith("<") && d.operator.startsWith("<") || this.semver.version === d.semver.version && this.operator.includes("=") && d.operator.includes("=") || a(this.semver, "<", d.semver, E) && this.operator.startsWith(">") && d.operator.startsWith("<") || a(this.semver, ">", d.semver, E) && this.operator.startsWith("<") && d.operator.startsWith(">")));
    }
  }
  Wn = t;
  const o = Ti(), { safeRe: n, t: f } = Je(), a = Fc(), r = mr(), u = fe(), i = Se();
  return Wn;
}
var Zn, ka;
function Er() {
  if (ka) return Zn;
  ka = 1;
  const e = Se();
  return Zn = (o, n, f) => {
    try {
      n = new e(n, f);
    } catch {
      return !1;
    }
    return n.test(o);
  }, Zn;
}
var Xn, Ma;
function ul() {
  if (Ma) return Xn;
  Ma = 1;
  const e = Se();
  return Xn = (o, n) => new e(o, n).set.map((f) => f.map((a) => a.value).join(" ").trim().split(" ")), Xn;
}
var Jn, Ua;
function fl() {
  if (Ua) return Jn;
  Ua = 1;
  const e = fe(), t = Se();
  return Jn = (n, f, a) => {
    let r = null, u = null, i = null;
    try {
      i = new t(f, a);
    } catch {
      return null;
    }
    return n.forEach((s) => {
      i.test(s) && (!r || u.compare(s) === -1) && (r = s, u = new e(r, a));
    }), r;
  }, Jn;
}
var Yn, xa;
function ll() {
  if (xa) return Yn;
  xa = 1;
  const e = fe(), t = Se();
  return Yn = (n, f, a) => {
    let r = null, u = null, i = null;
    try {
      i = new t(f, a);
    } catch {
      return null;
    }
    return n.forEach((s) => {
      i.test(s) && (!r || u.compare(s) === 1) && (r = s, u = new e(r, a));
    }), r;
  }, Yn;
}
var Qn, za;
function dl() {
  if (za) return Qn;
  za = 1;
  const e = fe(), t = Se(), o = pr();
  return Qn = (f, a) => {
    f = new t(f, a);
    let r = new e("0.0.0");
    if (f.test(r) || (r = new e("0.0.0-0"), f.test(r)))
      return r;
    r = null;
    for (let u = 0; u < f.set.length; ++u) {
      const i = f.set[u];
      let s = null;
      i.forEach((d) => {
        const E = new e(d.semver.version);
        switch (d.operator) {
          case ">":
            E.prerelease.length === 0 ? E.patch++ : E.prerelease.push(0), E.raw = E.format();
          /* fallthrough */
          case "":
          case ">=":
            (!s || o(E, s)) && (s = E);
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
    return r && f.test(r) ? r : null;
  }, Qn;
}
var ei, Va;
function hl() {
  if (Va) return ei;
  Va = 1;
  const e = Se();
  return ei = (o, n) => {
    try {
      return new e(o, n).range || "*";
    } catch {
      return null;
    }
  }, ei;
}
var ti, Ga;
function Ai() {
  if (Ga) return ti;
  Ga = 1;
  const e = fe(), t = yr(), { ANY: o } = t, n = Se(), f = Er(), a = pr(), r = Di(), u = Li(), i = Ci();
  return ti = (d, E, g, p) => {
    d = new e(d, p), E = new n(E, p);
    let w, $, l, h, c;
    switch (g) {
      case ">":
        w = a, $ = u, l = r, h = ">", c = ">=";
        break;
      case "<":
        w = r, $ = i, l = a, h = "<", c = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (f(d, E, p))
      return !1;
    for (let m = 0; m < E.set.length; ++m) {
      const y = E.set[m];
      let v = null, _ = null;
      if (y.forEach((S) => {
        S.semver === o && (S = new t(">=0.0.0")), v = v || S, _ = _ || S, w(S.semver, v.semver, p) ? v = S : l(S.semver, _.semver, p) && (_ = S);
      }), v.operator === h || v.operator === c || (!_.operator || _.operator === h) && $(d, _.semver))
        return !1;
      if (_.operator === c && l(d, _.semver))
        return !1;
    }
    return !0;
  }, ti;
}
var ri, Ha;
function ml() {
  if (Ha) return ri;
  Ha = 1;
  const e = Ai();
  return ri = (o, n, f) => e(o, n, ">", f), ri;
}
var ni, Ba;
function pl() {
  if (Ba) return ni;
  Ba = 1;
  const e = Ai();
  return ni = (o, n, f) => e(o, n, "<", f), ni;
}
var ii, Ka;
function yl() {
  if (Ka) return ii;
  Ka = 1;
  const e = Se();
  return ii = (o, n, f) => (o = new e(o, f), n = new e(n, f), o.intersects(n, f)), ii;
}
var si, Wa;
function El() {
  if (Wa) return si;
  Wa = 1;
  const e = Er(), t = we();
  return si = (o, n, f) => {
    const a = [];
    let r = null, u = null;
    const i = o.sort((g, p) => t(g, p, f));
    for (const g of i)
      e(g, n, f) ? (u = g, r || (r = g)) : (u && a.push([r, u]), u = null, r = null);
    r && a.push([r, null]);
    const s = [];
    for (const [g, p] of a)
      g === p ? s.push(g) : !p && g === i[0] ? s.push("*") : p ? g === i[0] ? s.push(`<=${p}`) : s.push(`${g} - ${p}`) : s.push(`>=${g}`);
    const d = s.join(" || "), E = typeof n.raw == "string" ? n.raw : String(n);
    return d.length < E.length ? d : n;
  }, si;
}
var oi, Za;
function vl() {
  if (Za) return oi;
  Za = 1;
  const e = Se(), t = yr(), { ANY: o } = t, n = Er(), f = we(), a = (E, g, p = {}) => {
    if (E === g)
      return !0;
    E = new e(E, p), g = new e(g, p);
    let w = !1;
    e: for (const $ of E.set) {
      for (const l of g.set) {
        const h = i($, l, p);
        if (w = w || h !== null, h)
          continue e;
      }
      if (w)
        return !1;
    }
    return !0;
  }, r = [new t(">=0.0.0-0")], u = [new t(">=0.0.0")], i = (E, g, p) => {
    if (E === g)
      return !0;
    if (E.length === 1 && E[0].semver === o) {
      if (g.length === 1 && g[0].semver === o)
        return !0;
      p.includePrerelease ? E = r : E = u;
    }
    if (g.length === 1 && g[0].semver === o) {
      if (p.includePrerelease)
        return !0;
      g = u;
    }
    const w = /* @__PURE__ */ new Set();
    let $, l;
    for (const R of E)
      R.operator === ">" || R.operator === ">=" ? $ = s($, R, p) : R.operator === "<" || R.operator === "<=" ? l = d(l, R, p) : w.add(R.semver);
    if (w.size > 1)
      return null;
    let h;
    if ($ && l) {
      if (h = f($.semver, l.semver, p), h > 0)
        return null;
      if (h === 0 && ($.operator !== ">=" || l.operator !== "<="))
        return null;
    }
    for (const R of w) {
      if ($ && !n(R, String($), p) || l && !n(R, String(l), p))
        return null;
      for (const N of g)
        if (!n(R, String(N), p))
          return !1;
      return !0;
    }
    let c, m, y, v, _ = l && !p.includePrerelease && l.semver.prerelease.length ? l.semver : !1, S = $ && !p.includePrerelease && $.semver.prerelease.length ? $.semver : !1;
    _ && _.prerelease.length === 1 && l.operator === "<" && _.prerelease[0] === 0 && (_ = !1);
    for (const R of g) {
      if (v = v || R.operator === ">" || R.operator === ">=", y = y || R.operator === "<" || R.operator === "<=", $) {
        if (S && R.semver.prerelease && R.semver.prerelease.length && R.semver.major === S.major && R.semver.minor === S.minor && R.semver.patch === S.patch && (S = !1), R.operator === ">" || R.operator === ">=") {
          if (c = s($, R, p), c === R && c !== $)
            return !1;
        } else if ($.operator === ">=" && !n($.semver, String(R), p))
          return !1;
      }
      if (l) {
        if (_ && R.semver.prerelease && R.semver.prerelease.length && R.semver.major === _.major && R.semver.minor === _.minor && R.semver.patch === _.patch && (_ = !1), R.operator === "<" || R.operator === "<=") {
          if (m = d(l, R, p), m === R && m !== l)
            return !1;
        } else if (l.operator === "<=" && !n(l.semver, String(R), p))
          return !1;
      }
      if (!R.operator && (l || $) && h !== 0)
        return !1;
    }
    return !($ && y && !l && h !== 0 || l && v && !$ && h !== 0 || S || _);
  }, s = (E, g, p) => {
    if (!E)
      return g;
    const w = f(E.semver, g.semver, p);
    return w > 0 ? E : w < 0 || g.operator === ">" && E.operator === ">=" ? g : E;
  }, d = (E, g, p) => {
    if (!E)
      return g;
    const w = f(E.semver, g.semver, p);
    return w < 0 ? E : w > 0 || g.operator === "<" && E.operator === "<=" ? g : E;
  };
  return oi = a, oi;
}
var ai, Xa;
function gl() {
  if (Xa) return ai;
  Xa = 1;
  const e = Je(), t = hr(), o = fe(), n = Cc(), f = xe(), a = Zf(), r = Xf(), u = Jf(), i = Yf(), s = Qf(), d = el(), E = tl(), g = rl(), p = we(), w = nl(), $ = il(), l = bi(), h = sl(), c = ol(), m = pr(), y = Di(), v = Lc(), _ = Ac(), S = Ci(), R = Li(), N = Fc(), b = al(), M = yr(), G = Se(), k = Er(), U = ul(), x = fl(), K = ll(), V = dl(), C = hl(), j = Ai(), T = ml(), P = pl(), q = yl(), L = El(), I = vl();
  return ai = {
    parse: f,
    valid: a,
    clean: r,
    inc: u,
    diff: i,
    major: s,
    minor: d,
    patch: E,
    prerelease: g,
    compare: p,
    rcompare: w,
    compareLoose: $,
    compareBuild: l,
    sort: h,
    rsort: c,
    gt: m,
    lt: y,
    eq: v,
    neq: _,
    gte: S,
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
  }, ai;
}
var Be = { exports: {} }, nr = { exports: {} }, Ja;
function _l() {
  if (Ja) return nr.exports;
  Ja = 1;
  const e = (t, o) => {
    for (const n of Reflect.ownKeys(o))
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
    return t;
  };
  return nr.exports = e, nr.exports.default = e, nr.exports;
}
var Ya;
function wl() {
  if (Ya) return Be.exports;
  Ya = 1;
  const e = _l(), t = /* @__PURE__ */ new WeakMap(), o = (n, f = {}) => {
    if (typeof n != "function")
      throw new TypeError("Expected a function");
    let a, r = 0;
    const u = n.displayName || n.name || "<anonymous>", i = function(...s) {
      if (t.set(i, ++r), r === 1)
        a = n.apply(this, s), n = null;
      else if (f.throw === !0)
        throw new Error(`Function \`${u}\` can only be called once`);
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
var ir = We.exports, Qa;
function Sl() {
  return Qa || (Qa = 1, function(e, t) {
    var o = ir && ir.__classPrivateFieldSet || function(V, C, j, T, P) {
      if (T === "m") throw new TypeError("Private method is not writable");
      if (T === "a" && !P) throw new TypeError("Private accessor was defined without a setter");
      if (typeof C == "function" ? V !== C || !P : !C.has(V)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return T === "a" ? P.call(V, j) : P ? P.value = j : C.set(V, j), j;
    }, n = ir && ir.__classPrivateFieldGet || function(V, C, j, T) {
      if (j === "a" && !T) throw new TypeError("Private accessor was defined without a getter");
      if (typeof C == "function" ? V !== C || !T : !C.has(V)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return j === "m" ? T : j === "a" ? T.call(V) : T ? T.value : C.get(V);
    }, f, a, r, u, i, s;
    Object.defineProperty(t, "__esModule", { value: !0 });
    const d = Si, E = Me, g = ie, p = _c, w = gc, $ = Bc, l = _u(), h = Ou(), c = Pu(), m = qu(), y = Dc(), v = Bf(), _ = Wf(), S = gl(), R = wl(), N = "aes-256-cbc", b = () => /* @__PURE__ */ Object.create(null), M = (V) => V != null;
    let G = "";
    try {
      delete require.cache[__filename], G = g.dirname((a = (f = e.parent) === null || f === void 0 ? void 0 : f.filename) !== null && a !== void 0 ? a : ".");
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
        r.set(this, void 0), u.set(this, void 0), i.set(this, void 0), s.set(this, {}), this._deserialize = (O) => JSON.parse(O), this._serialize = (O) => JSON.stringify(O, void 0, "	");
        const T = {
          configName: "config",
          fileExtension: "json",
          projectSuffix: "nodejs",
          clearInvalidConfig: !1,
          accessPropertiesByDotNotation: !0,
          configFileMode: 438,
          ...C
        }, P = R(() => {
          const O = h.sync({ cwd: G }), F = O && JSON.parse(E.readFileSync(O, "utf8"));
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
          const O = new y.default({
            allErrors: !0,
            useDefaults: !0
          });
          (0, v.default)(O);
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
        }, "f"), T.serialize && (this._serialize = T.serialize), T.deserialize && (this._deserialize = T.deserialize), this.events = new $.EventEmitter(), o(this, u, T.encryptionKey, "f");
        const q = T.fileExtension ? `.${T.fileExtension}` : "";
        this.path = g.resolve(T.cwd, `${(j = T.configName) !== null && j !== void 0 ? j : "config"}${q}`);
        const L = this.store, I = Object.assign(b(), T.defaults, L);
        this._validate(I);
        try {
          w.deepEqual(L, I);
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
          const C = E.readFileSync(this.path, n(this, u, "f") ? null : "utf8"), j = this._encryptData(C), T = this._deserialize(j);
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
      *[(r = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap(), s = /* @__PURE__ */ new WeakMap(), Symbol.iterator)]() {
        for (const [C, j] of Object.entries(this.store))
          yield [C, j];
      }
      _encryptData(C) {
        if (!n(this, u, "f"))
          return C.toString();
        try {
          if (n(this, u, "f"))
            try {
              if (C.slice(16, 17).toString() === ":") {
                const j = C.slice(0, 16), T = p.pbkdf2Sync(n(this, u, "f"), j.toString(), 1e4, 32, "sha512"), P = p.createDecipheriv(N, T, j);
                C = Buffer.concat([P.update(Buffer.from(C.slice(17))), P.final()]).toString("utf8");
              } else {
                const j = p.createDecipher(N, n(this, u, "f"));
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
        E.mkdirSync(g.dirname(this.path), { recursive: !0 });
      }
      _write(C) {
        let j = this._serialize(C);
        if (n(this, u, "f")) {
          const T = p.randomBytes(16), P = p.pbkdf2Sync(n(this, u, "f"), T.toString(), 1e4, 32, "sha512"), q = p.createCipheriv(N, P, T);
          j = Buffer.concat([T, Buffer.from(":"), q.update(Buffer.from(j)), q.final()]);
        }
        if (process.env.SNAP)
          E.writeFileSync(this.path, j, { mode: n(this, i, "f").configFileMode });
        else
          try {
            m.writeFileSync(this.path, j, { mode: n(this, i, "f").configFileMode });
          } catch (T) {
            if (T?.code === "EXDEV") {
              E.writeFileSync(this.path, j, { mode: n(this, i, "f").configFileMode });
              return;
            }
            throw T;
          }
      }
      _watch() {
        this._ensureDirectory(), E.existsSync(this.path) || this._write(b()), process.platform === "win32" ? E.watch(this.path, { persistent: !1 }, _(() => {
          this.events.emit("change");
        }, { wait: 100 })) : E.watchFile(this.path, { persistent: !1 }, _(() => {
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
        (this._isVersionInRangeFormat(P) || !S.eq(P, j)) && this._set(x, j);
      }
      _containsReservedKey(C) {
        return typeof C == "object" && Object.keys(C)[0] === U ? !0 : typeof C != "string" ? !1 : n(this, i, "f").accessPropertiesByDotNotation ? !!C.startsWith(`${U}.`) : !1;
      }
      _isVersionInRangeFormat(C) {
        return S.clean(C) === null;
      }
      _shouldPerformMigration(C, j, T) {
        return this._isVersionInRangeFormat(C) ? j !== "0.0.0" && S.satisfies(j, C) ? !1 : S.satisfies(T, C) : !(S.lte(C, j) || S.gt(C, T));
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
var ci, ec;
function $l() {
  if (ec) return ci;
  ec = 1;
  const e = ie, { app: t, ipcMain: o, ipcRenderer: n, shell: f } = xc, a = Sl();
  let r = !1;
  const u = () => {
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
      let E, g;
      if (n) {
        const p = n.sendSync("electron-store-get-data");
        if (!p)
          throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
        ({ defaultCwd: E, appVersion: g } = p);
      } else o && t && ({ defaultCwd: E, appVersion: g } = u());
      d = {
        name: "config",
        ...d
      }, d.projectVersion || (d.projectVersion = g), d.cwd ? d.cwd = e.isAbsolute(d.cwd) ? d.cwd : e.join(E, d.cwd) : d.cwd = E, d.configName = d.name, delete d.name, super(d);
    }
    static initRenderer() {
      u();
    }
    async openInEditor() {
      const d = await f.openPath(this.path);
      if (d)
        throw new Error(d);
    }
  }
  return ci = i, ci;
}
var Rl = /* @__PURE__ */ $l();
const tc = /* @__PURE__ */ Sc(Rl);
var Ae = { exports: {} }, ui, rc;
function qc() {
  return rc || (rc = 1, ui = {
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
  }), ui;
}
var fi = {}, nc;
function Fi() {
  return nc || (nc = 1, function(e) {
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
      return function(...f) {
        return f.length && (n = n.replace(/\{(\d)\}/g, (a, r) => f[r] || "")), new Error("ADM-ZIP: " + n);
      };
    }
    for (const n of Object.keys(t))
      e[n] = o(t[n]);
  }(fi)), fi;
}
var li, ic;
function Il() {
  if (ic) return li;
  ic = 1;
  const e = Me, t = ie, o = qc(), n = Fi(), f = typeof process == "object" && process.platform === "win32", a = (i) => typeof i == "object" && i !== null, r = new Uint32Array(256).map((i, s) => {
    for (let d = 0; d < 8; d++)
      (s & 1) !== 0 ? s = 3988292384 ^ s >>> 1 : s >>>= 1;
    return s >>> 0;
  });
  function u(i) {
    this.sep = t.sep, this.fs = e, a(i) && a(i.fs) && typeof i.fs.statSync == "function" && (this.fs = i.fs);
  }
  return li = u, u.prototype.makeDir = function(i) {
    const s = this;
    function d(E) {
      let g = E.split(s.sep)[0];
      E.split(s.sep).forEach(function(p) {
        if (!(!p || p.substr(-1, 1) === ":")) {
          g += s.sep + p;
          var w;
          try {
            w = s.fs.statSync(g);
          } catch {
            s.fs.mkdirSync(g);
          }
          if (w && w.isFile()) throw n.FILE_IN_THE_WAY(`"${g}"`);
        }
      });
    }
    d(i);
  }, u.prototype.writeFileTo = function(i, s, d, E) {
    const g = this;
    if (g.fs.existsSync(i)) {
      if (!d) return !1;
      var p = g.fs.statSync(i);
      if (p.isDirectory())
        return !1;
    }
    var w = t.dirname(i);
    g.fs.existsSync(w) || g.makeDir(w);
    var $;
    try {
      $ = g.fs.openSync(i, "w", 438);
    } catch {
      g.fs.chmodSync(i, 438), $ = g.fs.openSync(i, "w", 438);
    }
    if ($)
      try {
        g.fs.writeSync($, s, 0, s.length, 0);
      } finally {
        g.fs.closeSync($);
      }
    return g.fs.chmodSync(i, E || 438), !0;
  }, u.prototype.writeFileToAsync = function(i, s, d, E, g) {
    typeof E == "function" && (g = E, E = void 0);
    const p = this;
    p.fs.exists(i, function(w) {
      if (w && !d) return g(!1);
      p.fs.stat(i, function($, l) {
        if (w && l.isDirectory())
          return g(!1);
        var h = t.dirname(i);
        p.fs.exists(h, function(c) {
          c || p.makeDir(h), p.fs.open(i, "w", 438, function(m, y) {
            m ? p.fs.chmod(i, 438, function() {
              p.fs.open(i, "w", 438, function(v, _) {
                p.fs.write(_, s, 0, s.length, 0, function() {
                  p.fs.close(_, function() {
                    p.fs.chmod(i, E || 438, function() {
                      g(!0);
                    });
                  });
                });
              });
            }) : y ? p.fs.write(y, s, 0, s.length, 0, function() {
              p.fs.close(y, function() {
                p.fs.chmod(i, E || 438, function() {
                  g(!0);
                });
              });
            }) : p.fs.chmod(i, E || 438, function() {
              g(!0);
            });
          });
        });
      });
    });
  }, u.prototype.findFiles = function(i) {
    const s = this;
    function d(E, g, p) {
      let w = [];
      return s.fs.readdirSync(E).forEach(function($) {
        const l = t.join(E, $), h = s.fs.statSync(l);
        w.push(t.normalize(l) + (h.isDirectory() ? s.sep : "")), h.isDirectory() && p && (w = w.concat(d(l, g, p)));
      }), w;
    }
    return d(i, void 0, !0);
  }, u.prototype.findFilesAsync = function(i, s) {
    const d = this;
    let E = [];
    d.fs.readdir(i, function(g, p) {
      if (g) return s(g);
      let w = p.length;
      if (!w) return s(null, E);
      p.forEach(function($) {
        $ = t.join(i, $), d.fs.stat($, function(l, h) {
          if (l) return s(l);
          h && (E.push(t.normalize($) + (h.isDirectory() ? d.sep : "")), h.isDirectory() ? d.findFilesAsync($, function(c, m) {
            if (c) return s(c);
            E = E.concat(m), --w || s(null, E);
          }) : --w || s(null, E));
        });
      });
    });
  }, u.prototype.getAttributes = function() {
  }, u.prototype.setAttributes = function() {
  }, u.crc32update = function(i, s) {
    return r[(i ^ s) & 255] ^ i >>> 8;
  }, u.crc32 = function(i) {
    typeof i == "string" && (i = Buffer.from(i, "utf8"));
    let s = i.length, d = -1;
    for (let E = 0; E < s; ) d = u.crc32update(d, i[E++]);
    return ~d >>> 0;
  }, u.methodToString = function(i) {
    switch (i) {
      case o.STORED:
        return "STORED (" + i + ")";
      case o.DEFLATED:
        return "DEFLATED (" + i + ")";
      default:
        return "UNSUPPORTED (" + i + ")";
    }
  }, u.canonical = function(i) {
    if (!i) return "";
    const s = t.posix.normalize("/" + i.split("\\").join("/"));
    return t.join(".", s);
  }, u.zipnamefix = function(i) {
    if (!i) return "";
    const s = t.posix.normalize("/" + i.split("\\").join("/"));
    return t.posix.join(".", s);
  }, u.findLast = function(i, s) {
    if (!Array.isArray(i)) throw new TypeError("arr is not array");
    const d = i.length >>> 0;
    for (let E = d - 1; E >= 0; E--)
      if (s(i[E], E, i))
        return i[E];
  }, u.sanitize = function(i, s) {
    i = t.resolve(t.normalize(i));
    for (var d = s.split("/"), E = 0, g = d.length; E < g; E++) {
      var p = t.normalize(t.join(i, d.slice(E, g).join(t.sep)));
      if (p.indexOf(i) === 0)
        return p;
    }
    return t.normalize(t.join(i, t.basename(s)));
  }, u.toBuffer = function(s, d) {
    return Buffer.isBuffer(s) ? s : s instanceof Uint8Array ? Buffer.from(s) : typeof s == "string" ? d(s) : Buffer.alloc(0);
  }, u.readBigUInt64LE = function(i, s) {
    var d = Buffer.from(i.slice(s, s + 8));
    return d.swap64(), parseInt(`0x${d.toString("hex")}`);
  }, u.fromDOS2Date = function(i) {
    return new Date((i >> 25 & 127) + 1980, Math.max((i >> 21 & 15) - 1, 0), Math.max(i >> 16 & 31, 1), i >> 11 & 31, i >> 5 & 63, (i & 31) << 1);
  }, u.fromDate2DOS = function(i) {
    let s = 0, d = 0;
    return i.getFullYear() > 1979 && (s = (i.getFullYear() - 1980 & 127) << 9 | i.getMonth() + 1 << 5 | i.getDate(), d = i.getHours() << 11 | i.getMinutes() << 5 | i.getSeconds() >> 1), s << 16 | d;
  }, u.isWin = f, u.crcTable = r, li;
}
var di, sc;
function Nl() {
  if (sc) return di;
  sc = 1;
  const e = ie;
  return di = function(t, { fs: o }) {
    var n = t || "", f = r(), a = null;
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
    return n && o.existsSync(n) ? (a = o.statSync(n), f.directory = a.isDirectory(), f.mtime = a.mtime, f.atime = a.atime, f.executable = (73 & a.mode) !== 0, f.readonly = (128 & a.mode) === 0, f.hidden = e.basename(n)[0] === ".") : console.warn("Invalid path: " + n), {
      get directory() {
        return f.directory;
      },
      get readOnly() {
        return f.readonly;
      },
      get hidden() {
        return f.hidden;
      },
      get mtime() {
        return f.mtime;
      },
      get atime() {
        return f.atime;
      },
      get executable() {
        return f.executable;
      },
      decodeAttributes: function() {
      },
      encodeAttributes: function() {
      },
      toJSON: function() {
        return {
          path: n,
          isDirectory: f.directory,
          isReadOnly: f.readonly,
          isHidden: f.hidden,
          isExecutable: f.executable,
          mTime: f.mtime,
          aTime: f.atime
        };
      },
      toString: function() {
        return JSON.stringify(this.toJSON(), null, "	");
      }
    };
  }, di;
}
var hi, oc;
function Ol() {
  return oc || (oc = 1, hi = {
    efs: !0,
    encode: (e) => Buffer.from(e, "utf8"),
    decode: (e) => e.toString("utf8")
  }), hi;
}
var ac;
function Ye() {
  return ac || (ac = 1, Ae.exports = Il(), Ae.exports.Constants = qc(), Ae.exports.Errors = Fi(), Ae.exports.FileAttr = Nl(), Ae.exports.decoder = Ol()), Ae.exports;
}
var sr = {}, mi, cc;
function Pl() {
  if (cc) return mi;
  cc = 1;
  var e = Ye(), t = e.Constants;
  return mi = function() {
    var o = 20, n = 10, f = 0, a = 0, r = 0, u = 0, i = 0, s = 0, d = 0, E = 0, g = 0, p = 0, w = 0, $ = 0, l = 0;
    o |= e.isWin ? 2560 : 768, f |= t.FLG_EFS;
    const h = {
      extraLen: 0
    }, c = (y) => Math.max(0, y) >>> 0, m = (y) => Math.max(0, y) & 255;
    return r = e.fromDate2DOS(/* @__PURE__ */ new Date()), {
      get made() {
        return o;
      },
      set made(y) {
        o = y;
      },
      get version() {
        return n;
      },
      set version(y) {
        n = y;
      },
      get flags() {
        return f;
      },
      set flags(y) {
        f = y;
      },
      get flags_efs() {
        return (f & t.FLG_EFS) > 0;
      },
      set flags_efs(y) {
        y ? f |= t.FLG_EFS : f &= ~t.FLG_EFS;
      },
      get flags_desc() {
        return (f & t.FLG_DESC) > 0;
      },
      set flags_desc(y) {
        y ? f |= t.FLG_DESC : f &= ~t.FLG_DESC;
      },
      get method() {
        return a;
      },
      set method(y) {
        switch (y) {
          case t.STORED:
            this.version = 10;
          case t.DEFLATED:
          default:
            this.version = 20;
        }
        a = y;
      },
      get time() {
        return e.fromDOS2Date(this.timeval);
      },
      set time(y) {
        this.timeval = e.fromDate2DOS(y);
      },
      get timeval() {
        return r;
      },
      set timeval(y) {
        r = c(y);
      },
      get timeHighByte() {
        return m(r >>> 8);
      },
      get crc() {
        return u;
      },
      set crc(y) {
        u = c(y);
      },
      get compressedSize() {
        return i;
      },
      set compressedSize(y) {
        i = c(y);
      },
      get size() {
        return s;
      },
      set size(y) {
        s = c(y);
      },
      get fileNameLength() {
        return d;
      },
      set fileNameLength(y) {
        d = y;
      },
      get extraLength() {
        return E;
      },
      set extraLength(y) {
        E = y;
      },
      get extraLocalLength() {
        return h.extraLen;
      },
      set extraLocalLength(y) {
        h.extraLen = y;
      },
      get commentLength() {
        return g;
      },
      set commentLength(y) {
        g = y;
      },
      get diskNumStart() {
        return p;
      },
      set diskNumStart(y) {
        p = c(y);
      },
      get inAttr() {
        return w;
      },
      set inAttr(y) {
        w = c(y);
      },
      get attr() {
        return $;
      },
      set attr(y) {
        $ = c(y);
      },
      // get Unix file permissions
      get fileAttr() {
        return ($ || 0) >> 16 & 4095;
      },
      get offset() {
        return l;
      },
      set offset(y) {
        l = c(y);
      },
      get encrypted() {
        return (f & t.FLG_ENC) === t.FLG_ENC;
      },
      get centralHeaderSize() {
        return t.CENHDR + d + E + g;
      },
      get realDataOffset() {
        return l + t.LOCHDR + h.fnameLen + h.extraLen;
      },
      get localHeader() {
        return h;
      },
      loadLocalHeaderFromBinary: function(y) {
        var v = y.slice(l, l + t.LOCHDR);
        if (v.readUInt32LE(0) !== t.LOCSIG)
          throw e.Errors.INVALID_LOC();
        h.version = v.readUInt16LE(t.LOCVER), h.flags = v.readUInt16LE(t.LOCFLG), h.method = v.readUInt16LE(t.LOCHOW), h.time = v.readUInt32LE(t.LOCTIM), h.crc = v.readUInt32LE(t.LOCCRC), h.compressedSize = v.readUInt32LE(t.LOCSIZ), h.size = v.readUInt32LE(t.LOCLEN), h.fnameLen = v.readUInt16LE(t.LOCNAM), h.extraLen = v.readUInt16LE(t.LOCEXT);
        const _ = l + t.LOCHDR + h.fnameLen, S = _ + h.extraLen;
        return y.slice(_, S);
      },
      loadFromBinary: function(y) {
        if (y.length !== t.CENHDR || y.readUInt32LE(0) !== t.CENSIG)
          throw e.Errors.INVALID_CEN();
        o = y.readUInt16LE(t.CENVEM), n = y.readUInt16LE(t.CENVER), f = y.readUInt16LE(t.CENFLG), a = y.readUInt16LE(t.CENHOW), r = y.readUInt32LE(t.CENTIM), u = y.readUInt32LE(t.CENCRC), i = y.readUInt32LE(t.CENSIZ), s = y.readUInt32LE(t.CENLEN), d = y.readUInt16LE(t.CENNAM), E = y.readUInt16LE(t.CENEXT), g = y.readUInt16LE(t.CENCOM), p = y.readUInt16LE(t.CENDSK), w = y.readUInt16LE(t.CENATT), $ = y.readUInt32LE(t.CENATX), l = y.readUInt32LE(t.CENOFF);
      },
      localHeaderToBinary: function() {
        var y = Buffer.alloc(t.LOCHDR);
        return y.writeUInt32LE(t.LOCSIG, 0), y.writeUInt16LE(n, t.LOCVER), y.writeUInt16LE(f, t.LOCFLG), y.writeUInt16LE(a, t.LOCHOW), y.writeUInt32LE(r, t.LOCTIM), y.writeUInt32LE(u, t.LOCCRC), y.writeUInt32LE(i, t.LOCSIZ), y.writeUInt32LE(s, t.LOCLEN), y.writeUInt16LE(d, t.LOCNAM), y.writeUInt16LE(h.extraLen, t.LOCEXT), y;
      },
      centralHeaderToBinary: function() {
        var y = Buffer.alloc(t.CENHDR + d + E + g);
        return y.writeUInt32LE(t.CENSIG, 0), y.writeUInt16LE(o, t.CENVEM), y.writeUInt16LE(n, t.CENVER), y.writeUInt16LE(f, t.CENFLG), y.writeUInt16LE(a, t.CENHOW), y.writeUInt32LE(r, t.CENTIM), y.writeUInt32LE(u, t.CENCRC), y.writeUInt32LE(i, t.CENSIZ), y.writeUInt32LE(s, t.CENLEN), y.writeUInt16LE(d, t.CENNAM), y.writeUInt16LE(E, t.CENEXT), y.writeUInt16LE(g, t.CENCOM), y.writeUInt16LE(p, t.CENDSK), y.writeUInt16LE(w, t.CENATT), y.writeUInt32LE($, t.CENATX), y.writeUInt32LE(l, t.CENOFF), y;
      },
      toJSON: function() {
        const y = function(v) {
          return v + " bytes";
        };
        return {
          made: o,
          version: n,
          flags: f,
          method: e.methodToString(a),
          time: this.time,
          crc: "0x" + u.toString(16).toUpperCase(),
          compressedSize: y(i),
          size: y(s),
          fileNameLength: y(d),
          extraLength: y(E),
          commentLength: y(g),
          diskNumStart: p,
          inAttr: w,
          attr: $,
          offset: l,
          centralHeaderSize: y(t.CENHDR + d + E + g)
        };
      },
      toString: function() {
        return JSON.stringify(this.toJSON(), null, "	");
      }
    };
  }, mi;
}
var pi, uc;
function Tl() {
  if (uc) return pi;
  uc = 1;
  var e = Ye(), t = e.Constants;
  return pi = function() {
    var o = 0, n = 0, f = 0, a = 0, r = 0;
    return {
      get diskEntries() {
        return o;
      },
      set diskEntries(u) {
        o = n = u;
      },
      get totalEntries() {
        return n;
      },
      set totalEntries(u) {
        n = o = u;
      },
      get size() {
        return f;
      },
      set size(u) {
        f = u;
      },
      get offset() {
        return a;
      },
      set offset(u) {
        a = u;
      },
      get commentLength() {
        return r;
      },
      set commentLength(u) {
        r = u;
      },
      get mainHeaderSize() {
        return t.ENDHDR + r;
      },
      loadFromBinary: function(u) {
        if ((u.length !== t.ENDHDR || u.readUInt32LE(0) !== t.ENDSIG) && (u.length < t.ZIP64HDR || u.readUInt32LE(0) !== t.ZIP64SIG))
          throw e.Errors.INVALID_END();
        u.readUInt32LE(0) === t.ENDSIG ? (o = u.readUInt16LE(t.ENDSUB), n = u.readUInt16LE(t.ENDTOT), f = u.readUInt32LE(t.ENDSIZ), a = u.readUInt32LE(t.ENDOFF), r = u.readUInt16LE(t.ENDCOM)) : (o = e.readBigUInt64LE(u, t.ZIP64SUB), n = e.readBigUInt64LE(u, t.ZIP64TOT), f = e.readBigUInt64LE(u, t.ZIP64SIZE), a = e.readBigUInt64LE(u, t.ZIP64OFF), r = 0);
      },
      toBinary: function() {
        var u = Buffer.alloc(t.ENDHDR + r);
        return u.writeUInt32LE(t.ENDSIG, 0), u.writeUInt32LE(0, 4), u.writeUInt16LE(o, t.ENDSUB), u.writeUInt16LE(n, t.ENDTOT), u.writeUInt32LE(f, t.ENDSIZ), u.writeUInt32LE(a, t.ENDOFF), u.writeUInt16LE(r, t.ENDCOM), u.fill(" ", t.ENDHDR), u;
      },
      toJSON: function() {
        const u = function(i, s) {
          let d = i.toString(16).toUpperCase();
          for (; d.length < s; ) d = "0" + d;
          return "0x" + d;
        };
        return {
          diskEntries: o,
          totalEntries: n,
          size: f + " bytes",
          offset: u(a, 4),
          commentLength: r
        };
      },
      toString: function() {
        return JSON.stringify(this.toJSON(), null, "	");
      }
    };
  }, pi;
}
var fc;
function jc() {
  return fc || (fc = 1, sr.EntryHeader = Pl(), sr.MainHeader = Tl()), sr;
}
var Ke = {}, yi, lc;
function bl() {
  return lc || (lc = 1, yi = function(e) {
    var t = wc, o = { chunkSize: (parseInt(e.length / 1024) + 1) * 1024 };
    return {
      deflate: function() {
        return t.deflateRawSync(e, o);
      },
      deflateAsync: function(n) {
        var f = t.createDeflateRaw(o), a = [], r = 0;
        f.on("data", function(u) {
          a.push(u), r += u.length;
        }), f.on("end", function() {
          var u = Buffer.alloc(r), i = 0;
          u.fill(0);
          for (var s = 0; s < a.length; s++) {
            var d = a[s];
            d.copy(u, i), i += d.length;
          }
          n && n(u);
        }), f.end(e);
      }
    };
  }), yi;
}
var Ei, dc;
function Dl() {
  if (dc) return Ei;
  dc = 1;
  const e = +(process.versions ? process.versions.node : "").split(".")[0] || 0;
  return Ei = function(t, o) {
    var n = wc;
    const f = e >= 15 && o > 0 ? { maxOutputLength: o } : {};
    return {
      inflate: function() {
        return n.inflateRawSync(t, f);
      },
      inflateAsync: function(a) {
        var r = n.createInflateRaw(f), u = [], i = 0;
        r.on("data", function(s) {
          u.push(s), i += s.length;
        }), r.on("end", function() {
          var s = Buffer.alloc(i), d = 0;
          s.fill(0);
          for (var E = 0; E < u.length; E++) {
            var g = u[E];
            g.copy(s, d), d += g.length;
          }
          a && a(s);
        }), r.end(t);
      }
    };
  }, Ei;
}
var vi, hc;
function Cl() {
  if (hc) return vi;
  hc = 1;
  const { randomFillSync: e } = _c, t = Fi(), o = new Uint32Array(256).map((p, w) => {
    for (let $ = 0; $ < 8; $++)
      (w & 1) !== 0 ? w = w >>> 1 ^ 3988292384 : w >>>= 1;
    return w >>> 0;
  }), n = (p, w) => Math.imul(p, w) >>> 0, f = (p, w) => o[(p ^ w) & 255] ^ p >>> 8, a = () => typeof e == "function" ? e(Buffer.alloc(12)) : a.node();
  a.node = () => {
    const p = Buffer.alloc(12), w = p.length;
    for (let $ = 0; $ < w; $++) p[$] = Math.random() * 256 & 255;
    return p;
  };
  const r = {
    genSalt: a
  };
  function u(p) {
    const w = Buffer.isBuffer(p) ? p : Buffer.from(p);
    this.keys = new Uint32Array([305419896, 591751049, 878082192]);
    for (let $ = 0; $ < w.length; $++)
      this.updateKeys(w[$]);
  }
  u.prototype.updateKeys = function(p) {
    const w = this.keys;
    return w[0] = f(w[0], p), w[1] += w[0] & 255, w[1] = n(w[1], 134775813) + 1, w[2] = f(w[2], w[1] >>> 24), p;
  }, u.prototype.next = function() {
    const p = (this.keys[2] | 2) >>> 0;
    return n(p, p ^ 1) >> 8 & 255;
  };
  function i(p) {
    const w = new u(p);
    return function($) {
      const l = Buffer.alloc($.length);
      let h = 0;
      for (let c of $)
        l[h++] = w.updateKeys(c ^ w.next());
      return l;
    };
  }
  function s(p) {
    const w = new u(p);
    return function($, l, h = 0) {
      l || (l = Buffer.alloc($.length));
      for (let c of $) {
        const m = w.next();
        l[h++] = c ^ m, w.updateKeys(c);
      }
      return l;
    };
  }
  function d(p, w, $) {
    if (!p || !Buffer.isBuffer(p) || p.length < 12)
      return Buffer.alloc(0);
    const l = i($), h = l(p.slice(0, 12)), c = (w.flags & 8) === 8 ? w.timeHighByte : w.crc >>> 24;
    if (h[11] !== c)
      throw t.WRONG_PASSWORD();
    return l(p.slice(12));
  }
  function E(p) {
    Buffer.isBuffer(p) && p.length >= 12 ? r.genSalt = function() {
      return p.slice(0, 12);
    } : p === "node" ? r.genSalt = a.node : r.genSalt = a;
  }
  function g(p, w, $, l = !1) {
    p == null && (p = Buffer.alloc(0)), Buffer.isBuffer(p) || (p = Buffer.from(p.toString()));
    const h = s($), c = r.genSalt();
    c[11] = w.crc >>> 24 & 255, l && (c[10] = w.crc >>> 16 & 255);
    const m = Buffer.alloc(p.length + 12);
    return h(c, m), h(p, m, 12);
  }
  return vi = { decrypt: d, encrypt: g, _salter: E }, vi;
}
var mc;
function Ll() {
  return mc || (mc = 1, Ke.Deflater = bl(), Ke.Inflater = Dl(), Ke.ZipCrypto = Cl()), Ke;
}
var gi, pc;
function kc() {
  if (pc) return gi;
  pc = 1;
  var e = Ye(), t = jc(), o = e.Constants, n = Ll();
  return gi = function(f, a) {
    var r = new t.EntryHeader(), u = Buffer.alloc(0), i = Buffer.alloc(0), s = !1, d = null, E = Buffer.alloc(0), g = Buffer.alloc(0), p = !0;
    const w = f, $ = typeof w.decoder == "object" ? w.decoder : e.decoder;
    p = $.hasOwnProperty("efs") ? $.efs : !1;
    function l() {
      return !a || !(a instanceof Uint8Array) ? Buffer.alloc(0) : (g = r.loadLocalHeaderFromBinary(a), a.slice(r.realDataOffset, r.realDataOffset + r.compressedSize));
    }
    function h(S) {
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
        if (e.crc32(S) !== R.crc)
          return !1;
      } else if (e.crc32(S) !== r.localHeader.crc)
        return !1;
      return !0;
    }
    function c(S, R, N) {
      if (typeof R > "u" && typeof S == "string" && (N = S, S = void 0), s)
        return S && R && R(Buffer.alloc(0), e.Errors.DIRECTORY_CONTENT_ERROR()), Buffer.alloc(0);
      var b = l();
      if (b.length === 0)
        return S && R && R(b), b;
      if (r.encrypted) {
        if (typeof N != "string" && !Buffer.isBuffer(N))
          throw e.Errors.INVALID_PASS_PARAM();
        b = n.ZipCrypto.decrypt(b, r, N);
      }
      var M = Buffer.alloc(r.size);
      switch (r.method) {
        case e.Constants.STORED:
          if (b.copy(M), h(M))
            return S && R && R(M), M;
          throw S && R && R(M, e.Errors.BAD_CRC()), e.Errors.BAD_CRC();
        case e.Constants.DEFLATED:
          var G = new n.Inflater(b, r.size);
          if (S)
            G.inflateAsync(function(k) {
              k.copy(k, 0), R && (h(k) ? R(k) : R(k, e.Errors.BAD_CRC()));
            });
          else {
            if (G.inflate(M).copy(M, 0), !h(M))
              throw e.Errors.BAD_CRC(`"${$.decode(u)}"`);
            return M;
          }
          break;
        default:
          throw S && R && R(Buffer.alloc(0), e.Errors.UNKNOWN_METHOD()), e.Errors.UNKNOWN_METHOD();
      }
    }
    function m(S, R) {
      if ((!d || !d.length) && Buffer.isBuffer(a))
        return S && R && R(l()), l();
      if (d.length && !s) {
        var N;
        switch (r.method) {
          case e.Constants.STORED:
            return r.compressedSize = r.size, N = Buffer.alloc(d.length), d.copy(N), S && R && R(N), N;
          default:
          case e.Constants.DEFLATED:
            var b = new n.Deflater(d);
            if (S)
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
      } else if (S && R)
        R(Buffer.alloc(0));
      else
        return Buffer.alloc(0);
    }
    function y(S, R) {
      return (S.readUInt32LE(R + 4) << 4) + S.readUInt32LE(R);
    }
    function v(S) {
      try {
        for (var R = 0, N, b, M; R + 4 < S.length; )
          N = S.readUInt16LE(R), R += 2, b = S.readUInt16LE(R), R += 2, M = S.slice(R, R + b), R += b, o.ID_ZIP64 === N && _(M);
      } catch {
        throw e.Errors.EXTRA_FIELD_PARSE_ERROR();
      }
    }
    function _(S) {
      var R, N, b, M;
      S.length >= o.EF_ZIP64_SCOMP && (R = y(S, o.EF_ZIP64_SUNCOMP), r.size === o.EF_ZIP64_OR_32 && (r.size = R)), S.length >= o.EF_ZIP64_RHO && (N = y(S, o.EF_ZIP64_SCOMP), r.compressedSize === o.EF_ZIP64_OR_32 && (r.compressedSize = N)), S.length >= o.EF_ZIP64_DSN && (b = y(S, o.EF_ZIP64_RHO), r.offset === o.EF_ZIP64_OR_32 && (r.offset = b)), S.length >= o.EF_ZIP64_DSN + 4 && (M = S.readUInt32LE(o.EF_ZIP64_DSN), r.diskNumStart === o.EF_ZIP64_OR_16 && (r.diskNumStart = M));
    }
    return {
      get entryName() {
        return $.decode(u);
      },
      get rawEntryName() {
        return u;
      },
      set entryName(S) {
        u = e.toBuffer(S, $.encode);
        var R = u[u.length - 1];
        s = R === 47 || R === 92, r.fileNameLength = u.length;
      },
      get efs() {
        return typeof p == "function" ? p(this.entryName) : p;
      },
      get extra() {
        return E;
      },
      set extra(S) {
        E = S, r.extraLength = S.length, v(S);
      },
      get comment() {
        return $.decode(i);
      },
      set comment(S) {
        if (i = e.toBuffer(S, $.encode), r.commentLength = i.length, i.length > 65535) throw e.Errors.COMMENT_TOO_LONG();
      },
      get name() {
        var S = $.decode(u);
        return s ? S.substr(S.length - 1).split("/").pop() : S.split("/").pop();
      },
      get isDirectory() {
        return s;
      },
      getCompressedData: function() {
        return m(!1, null);
      },
      getCompressedDataAsync: function(S) {
        m(!0, S);
      },
      setData: function(S) {
        d = e.toBuffer(S, e.decoder.encode), !s && d.length ? (r.size = d.length, r.method = e.Constants.DEFLATED, r.crc = e.crc32(S), r.changed = !0) : r.method = e.Constants.STORED;
      },
      getData: function(S) {
        return r.changed ? d : c(!1, null, S);
      },
      getDataAsync: function(S, R) {
        r.changed ? S(d) : c(!0, S, R);
      },
      set attr(S) {
        r.attr = S;
      },
      get attr() {
        return r.attr;
      },
      set header(S) {
        r.loadFromBinary(S);
      },
      get header() {
        return r;
      },
      packCentralHeader: function() {
        r.flags_efs = this.efs, r.extraLength = E.length;
        var S = r.centralHeaderToBinary(), R = e.Constants.CENHDR;
        return u.copy(S, R), R += u.length, E.copy(S, R), R += r.extraLength, i.copy(S, R), S;
      },
      packLocalHeader: function() {
        let S = 0;
        r.flags_efs = this.efs, r.extraLocalLength = g.length;
        const R = r.localHeaderToBinary(), N = Buffer.alloc(R.length + u.length + r.extraLocalLength);
        return R.copy(N, S), S += R.length, u.copy(N, S), S += u.length, g.copy(N, S), S += g.length, N;
      },
      toJSON: function() {
        const S = function(R) {
          return "<" + (R && R.length + " bytes buffer" || "null") + ">";
        };
        return {
          entryName: this.entryName,
          name: this.name,
          comment: this.comment,
          isDirectory: this.isDirectory,
          header: r.toJSON(),
          compressedData: S(a),
          data: S(d)
        };
      },
      toString: function() {
        return JSON.stringify(this.toJSON(), null, "	");
      }
    };
  }, gi;
}
var _i, yc;
function Al() {
  if (yc) return _i;
  yc = 1;
  const e = kc(), t = jc(), o = Ye();
  return _i = function(n, f) {
    var a = [], r = {}, u = Buffer.alloc(0), i = new t.MainHeader(), s = !1;
    const d = /* @__PURE__ */ new Set(), E = f, { noSort: g, decoder: p } = E;
    n ? l(E.readEntries) : s = !0;
    function w() {
      const c = /* @__PURE__ */ new Set();
      for (const m of Object.keys(r)) {
        const y = m.split("/");
        if (y.pop(), !!y.length)
          for (let v = 0; v < y.length; v++) {
            const _ = y.slice(0, v + 1).join("/") + "/";
            c.add(_);
          }
      }
      for (const m of c)
        if (!(m in r)) {
          const y = new e(E);
          y.entryName = m, y.attr = 16, y.temporary = !0, a.push(y), r[y.entryName] = y, d.add(y);
        }
    }
    function $() {
      if (s = !0, r = {}, i.diskEntries > (n.length - i.offset) / o.Constants.CENHDR)
        throw o.Errors.DISK_ENTRY_TOO_LARGE();
      a = new Array(i.diskEntries);
      for (var c = i.offset, m = 0; m < a.length; m++) {
        var y = c, v = new e(E, n);
        v.header = n.slice(y, y += o.Constants.CENHDR), v.entryName = n.slice(y, y += v.header.fileNameLength), v.header.extraLength && (v.extra = n.slice(y, y += v.header.extraLength)), v.header.commentLength && (v.comment = n.slice(y, y + v.header.commentLength)), c += v.header.centralHeaderSize, a[m] = v, r[v.entryName] = v;
      }
      d.clear(), w();
    }
    function l(c) {
      var m = n.length - o.Constants.ENDHDR, y = Math.max(0, m - 65535), v = y, _ = n.length, S = -1, R = 0;
      for ((typeof E.trailingSpace == "boolean" ? E.trailingSpace : !1) && (y = 0), m; m >= v; m--)
        if (n[m] === 80) {
          if (n.readUInt32LE(m) === o.Constants.ENDSIG) {
            S = m, R = m, _ = m + o.Constants.ENDHDR, v = m - o.Constants.END64HDR;
            continue;
          }
          if (n.readUInt32LE(m) === o.Constants.END64SIG) {
            v = y;
            continue;
          }
          if (n.readUInt32LE(m) === o.Constants.ZIP64SIG) {
            S = m, _ = m + o.readBigUInt64LE(n, m + o.Constants.ZIP64SIZE) + o.Constants.ZIP64LEAD;
            break;
          }
        }
      if (S == -1) throw o.Errors.INVALID_FORMAT();
      i.loadFromBinary(n.slice(S, _)), i.commentLength && (u = n.slice(R + o.Constants.ENDHDR)), c && $();
    }
    function h() {
      a.length > 1 && !g && a.sort((c, m) => c.entryName.toLowerCase().localeCompare(m.entryName.toLowerCase()));
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
        return p.decode(u);
      },
      set comment(c) {
        u = o.toBuffer(c, p.encode), i.commentLength = u.length;
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
        const y = r[c];
        this.getEntryChildren(y, m).map((_) => _.entryName).forEach(this.deleteEntry);
      },
      /**
       * Removes the entry with the given name from the entry list.
       *
       * @param {string} entryName
       * @returns {void}
       */
      deleteEntry: function(c) {
        s || $();
        const m = r[c], y = a.indexOf(m);
        y >= 0 && (a.splice(y, 1), delete r[c], i.totalEntries = a.length);
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
            const y = [], v = c.entryName;
            for (const _ of a)
              _.entryName.startsWith(v) && y.push(_);
            return y;
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
        let y = 0, v = 0;
        i.size = 0, i.offset = 0;
        let _ = 0;
        for (const N of this.entries) {
          const b = N.getCompressedData();
          N.header.offset = v;
          const M = N.packLocalHeader(), G = M.length + b.length;
          v += G, c.push(M), c.push(b);
          const k = N.packCentralHeader();
          m.push(k), i.size += k.length, y += G + k.length, _++;
        }
        y += i.mainHeaderSize, i.offset = v, i.totalEntries = _, v = 0;
        const S = Buffer.alloc(y);
        for (const N of c)
          N.copy(S, v), v += N.length;
        for (const N of m)
          N.copy(S, v), v += N.length;
        const R = i.toBinary();
        return u && u.copy(R, o.Constants.ENDHDR), R.copy(S, v), n = S, s = !1, S;
      },
      toAsyncBuffer: function(c, m, y, v) {
        try {
          s || $(), h();
          const _ = [], S = [];
          let R = 0, N = 0, b = 0;
          i.size = 0, i.offset = 0;
          const M = function(G) {
            if (G.length > 0) {
              const k = G.shift(), U = k.entryName + k.extra.toString();
              y && y(U), k.getCompressedDataAsync(function(x) {
                v && v(U), k.header.offset = N;
                const K = k.packLocalHeader(), V = K.length + x.length;
                N += V, _.push(K), _.push(x);
                const C = k.packCentralHeader();
                S.push(C), i.size += C.length, R += V + C.length, b++, M(G);
              });
            } else {
              R += i.mainHeaderSize, i.offset = N, i.totalEntries = b, N = 0;
              const k = Buffer.alloc(R);
              _.forEach(function(x) {
                x.copy(k, N), N += x.length;
              }), S.forEach(function(x) {
                x.copy(k, N), N += x.length;
              });
              const U = i.toBinary();
              u && u.copy(U, o.Constants.ENDHDR), U.copy(k, N), n = k, s = !1, c(k);
            }
          };
          M(Array.from(this.entries));
        } catch (_) {
          m(_);
        }
      }
    };
  }, _i;
}
var wi, Ec;
function Fl() {
  if (Ec) return wi;
  Ec = 1;
  const e = Ye(), t = ie, o = kc(), n = Al(), f = (...i) => e.findLast(i, (s) => typeof s == "boolean"), a = (...i) => e.findLast(i, (s) => typeof s == "string"), r = (...i) => e.findLast(i, (s) => typeof s == "function"), u = {
    // option "noSort" : if true it disables files sorting
    noSort: !1,
    // read entries during load (initial loading may be slower)
    readEntries: !1,
    // default method is none
    method: e.Constants.NONE,
    // file system
    fs: null
  };
  return wi = function(i, s) {
    let d = null;
    const E = Object.assign(/* @__PURE__ */ Object.create(null), u);
    i && typeof i == "object" && (i instanceof Uint8Array || (Object.assign(E, i), i = E.input ? E.input : void 0, E.input && delete E.input), Buffer.isBuffer(i) && (d = i, E.method = e.Constants.BUFFER, i = void 0)), Object.assign(E, s);
    const g = new e(E);
    if ((typeof E.decoder != "object" || typeof E.decoder.encode != "function" || typeof E.decoder.decode != "function") && (E.decoder = e.decoder), i && typeof i == "string")
      if (g.fs.existsSync(i))
        E.method = e.Constants.FILE, E.filename = i, d = g.fs.readFileSync(i);
      else
        throw e.Errors.INVALID_FILENAME();
    const p = new n(d, E), { canonical: w, sanitize: $, zipnamefix: l } = e;
    function h(v) {
      if (v && p) {
        var _;
        if (typeof v == "string" && (_ = p.getEntry(t.posix.normalize(v))), typeof v == "object" && typeof v.entryName < "u" && typeof v.header < "u" && (_ = p.getEntry(v.entryName)), _)
          return _;
      }
      return null;
    }
    function c(v) {
      const { join: _, normalize: S, sep: R } = t.posix;
      return _(".", S(R + v.split("\\").join(R) + R));
    }
    function m(v) {
      return v instanceof RegExp ? /* @__PURE__ */ function(_) {
        return function(S) {
          return _.test(S);
        };
      }(v) : typeof v != "function" ? () => !0 : v;
    }
    const y = (v, _) => {
      let S = _.slice(-1);
      return S = S === g.sep ? g.sep : "", t.relative(v, _) + S;
    };
    return {
      /**
       * Extracts the given entry from the archive and returns the content as a Buffer object
       * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
       * @param {Buffer|string} [pass] - password
       * @return Buffer or Null in case of error
       */
      readFile: function(v, _) {
        var S = h(v);
        return S && S.getData(_) || null;
      },
      /**
       * Returns how many child elements has on entry (directories) on files it is always 0
       * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
       * @returns {integer}
       */
      childCount: function(v) {
        const _ = h(v);
        if (_)
          return p.getChildCount(_);
      },
      /**
       * Asynchronous readFile
       * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
       * @param {callback} callback
       *
       * @return Buffer or Null in case of error
       */
      readFileAsync: function(v, _) {
        var S = h(v);
        S ? S.getDataAsync(_) : _(null, "getEntry failed for:" + v);
      },
      /**
       * Extracts the given entry from the archive and returns the content as plain text in the given encoding
       * @param {ZipEntry|string} entry - ZipEntry object or String with the full path of the entry
       * @param {string} encoding - Optional. If no encoding is specified utf8 is used
       *
       * @return String
       */
      readAsText: function(v, _) {
        var S = h(v);
        if (S) {
          var R = S.getData();
          if (R && R.length)
            return R.toString(_ || "utf8");
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
      readAsTextAsync: function(v, _, S) {
        var R = h(v);
        R ? R.getDataAsync(function(N, b) {
          if (b) {
            _(N, b);
            return;
          }
          N && N.length ? _(N.toString(S || "utf8")) : _("");
        }) : _("");
      },
      /**
       * Remove the entry from the file or the entry and all it's nested directories and files if the given entry is a directory
       *
       * @param {ZipEntry|string} entry
       * @returns {void}
       */
      deleteFile: function(v, _ = !0) {
        var S = h(v);
        S && p.deleteFile(S.entryName, _);
      },
      /**
       * Remove the entry from the file or directory without affecting any nested entries
       *
       * @param {ZipEntry|string} entry
       * @returns {void}
       */
      deleteEntry: function(v) {
        var _ = h(v);
        _ && p.deleteEntry(_.entryName);
      },
      /**
       * Adds a comment to the zip. The zip must be rewritten after adding the comment.
       *
       * @param {string} comment
       */
      addZipComment: function(v) {
        p.comment = v;
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
      addZipEntryComment: function(v, _) {
        var S = h(v);
        S && (S.comment = _);
      },
      /**
       * Returns the comment of the specified entry
       *
       * @param {ZipEntry} entry
       * @return String
       */
      getZipEntryComment: function(v) {
        var _ = h(v);
        return _ && _.comment || "";
      },
      /**
       * Updates the content of an existing entry inside the archive. The zip must be rewritten after updating the content
       *
       * @param {ZipEntry} entry
       * @param {Buffer} content
       */
      updateFile: function(v, _) {
        var S = h(v);
        S && S.setData(_);
      },
      /**
       * Adds a file from the disk to the archive
       *
       * @param {string} localPath File to add to zip
       * @param {string} [zipPath] Optional path inside the zip
       * @param {string} [zipName] Optional name for the file
       * @param {string} [comment] Optional file comment
       */
      addLocalFile: function(v, _, S, R) {
        if (g.fs.existsSync(v)) {
          _ = _ ? c(_) : "";
          const N = t.win32.basename(t.win32.normalize(v));
          _ += S || N;
          const b = g.fs.statSync(v), M = b.isFile() ? g.fs.readFileSync(v) : Buffer.alloc(0);
          b.isDirectory() && (_ += g.sep), this.addFile(_, M, R, b);
        } else
          throw e.Errors.FILE_NOT_FOUND(v);
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
      addLocalFileAsync: function(v, _) {
        v = typeof v == "object" ? v : { localPath: v };
        const S = t.resolve(v.localPath), { comment: R } = v;
        let { zipPath: N, zipName: b } = v;
        const M = this;
        g.fs.stat(S, function(G, k) {
          if (G) return _(G, !1);
          N = N ? c(N) : "";
          const U = t.win32.basename(t.win32.normalize(S));
          if (N += b || U, k.isFile())
            g.fs.readFile(S, function(x, K) {
              return x ? _(x, !1) : (M.addFile(N, K, R, k), setImmediate(_, void 0, !0));
            });
          else if (k.isDirectory())
            return N += g.sep, M.addFile(N, Buffer.alloc(0), R, k), setImmediate(_, void 0, !0);
        });
      },
      /**
       * Adds a local directory and all its nested files and directories to the archive
       *
       * @param {string} localPath - local path to the folder
       * @param {string} [zipPath] - optional path inside zip
       * @param {(RegExp|function)} [filter] - optional RegExp or Function if files match will be included.
       */
      addLocalFolder: function(v, _, S) {
        if (S = m(S), _ = _ ? c(_) : "", v = t.normalize(v), g.fs.existsSync(v)) {
          const R = g.findFiles(v), N = this;
          if (R.length)
            for (const b of R) {
              const M = t.join(_, y(v, b));
              S(M) && N.addLocalFile(b, t.dirname(M));
            }
        } else
          throw e.Errors.FILE_NOT_FOUND(v);
      },
      /**
       * Asynchronous addLocalFolder
       * @param {string} localPath
       * @param {callback} callback
       * @param {string} [zipPath] optional path inside zip
       * @param {RegExp|function} [filter] optional RegExp or Function if files match will
       *               be included.
       */
      addLocalFolderAsync: function(v, _, S, R) {
        R = m(R), S = S ? c(S) : "", v = t.normalize(v);
        var N = this;
        g.fs.open(v, "r", function(b) {
          if (b && b.code === "ENOENT")
            _(void 0, e.Errors.FILE_NOT_FOUND(v));
          else if (b)
            _(void 0, b);
          else {
            var M = g.findFiles(v), G = -1, k = function() {
              if (G += 1, G < M.length) {
                var U = M[G], x = y(v, U).split("\\").join("/");
                x = x.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, ""), R(x) ? g.fs.stat(U, function(K, V) {
                  K && _(void 0, K), V.isFile() ? g.fs.readFile(U, function(C, j) {
                    C ? _(void 0, C) : (N.addFile(S + x, j, "", V), k());
                  }) : (N.addFile(S + x + "/", Buffer.alloc(0), "", V), k());
                }) : process.nextTick(() => {
                  k();
                });
              } else
                _(!0, void 0);
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
      addLocalFolderAsync2: function(v, _) {
        const S = this;
        v = typeof v == "object" ? v : { localPath: v }, localPath = t.resolve(c(v.localPath));
        let { zipPath: R, filter: N, namefix: b } = v;
        N instanceof RegExp ? N = /* @__PURE__ */ function(k) {
          return function(U) {
            return k.test(U);
          };
        }(N) : typeof N != "function" && (N = function() {
          return !0;
        }), R = R ? c(R) : "", b == "latin1" && (b = (k) => k.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, "")), typeof b != "function" && (b = (k) => k);
        const M = (k) => t.join(R, b(y(localPath, k))), G = (k) => t.win32.basename(t.win32.normalize(b(k)));
        g.fs.open(localPath, "r", function(k) {
          k && k.code === "ENOENT" ? _(void 0, e.Errors.FILE_NOT_FOUND(localPath)) : k ? _(void 0, k) : g.findFilesAsync(localPath, function(U, x) {
            if (U) return _(U);
            x = x.filter((K) => N(M(K))), x.length || _(void 0, !1), setImmediate(
              x.reverse().reduce(function(K, V) {
                return function(C, j) {
                  if (C || j === !1) return setImmediate(K, C, !1);
                  S.addLocalFileAsync(
                    {
                      localPath: V,
                      zipPath: t.dirname(M(V)),
                      zipName: G(V)
                    },
                    K
                  );
                };
              }, _)
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
      addLocalFolderPromise: function(v, _) {
        return new Promise((S, R) => {
          this.addLocalFolderAsync2(Object.assign({ localPath: v }, _), (N, b) => {
            N && R(N), b && S(this);
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
      addFile: function(v, _, S, R) {
        v = l(v);
        let N = h(v);
        const b = N != null;
        b || (N = new o(E), N.entryName = v), N.comment = S || "";
        const M = typeof R == "object" && R instanceof g.fs.Stats;
        M && (N.header.time = R.mtime);
        var G = N.isDirectory ? 16 : 0;
        let k = N.isDirectory ? 16384 : 32768;
        return M ? k |= 4095 & R.mode : typeof R == "number" ? k |= 4095 & R : k |= N.isDirectory ? 493 : 420, G = (G | k << 16) >>> 0, N.attr = G, N.setData(_), b || p.setEntry(N), N;
      },
      /**
       * Returns an array of ZipEntry objects representing the files and folders inside the archive
       *
       * @param {string} [password]
       * @returns Array
       */
      getEntries: function(v) {
        return p.password = v, p ? p.entries : [];
      },
      /**
       * Returns a ZipEntry object representing the file or folder specified by ``name``.
       *
       * @param {string} name
       * @return ZipEntry
       */
      getEntry: function(v) {
        return h(v);
      },
      getEntryCount: function() {
        return p.getEntryCount();
      },
      forEach: function(v) {
        return p.forEach(v);
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
      extractEntryTo: function(v, _, S, R, N, b) {
        R = f(!1, R), N = f(!1, N), S = f(!0, S), b = a(N, b);
        var M = h(v);
        if (!M)
          throw e.Errors.NO_ENTRY();
        var G = w(M.entryName), k = $(_, b && !M.isDirectory ? b : S ? G : t.basename(G));
        if (M.isDirectory) {
          var U = p.getEntryChildren(M);
          return U.forEach(function(V) {
            if (V.isDirectory) return;
            var C = V.getData();
            if (!C)
              throw e.Errors.CANT_EXTRACT_FILE();
            var j = w(V.entryName), T = $(_, S ? j : t.basename(j));
            const P = N ? V.header.fileAttr : void 0;
            g.writeFileTo(T, C, R, P);
          }), !0;
        }
        var x = M.getData(p.password);
        if (!x) throw e.Errors.CANT_EXTRACT_FILE();
        if (g.fs.existsSync(k) && !R)
          throw e.Errors.CANT_OVERRIDE();
        const K = N ? v.header.fileAttr : void 0;
        return g.writeFileTo(k, x, R, K), !0;
      },
      /**
       * Test the archive
       * @param {string} [pass]
       */
      test: function(v) {
        if (!p)
          return !1;
        for (var _ in p.entries)
          try {
            if (_.isDirectory)
              continue;
            var S = p.entries[_].getData(v);
            if (!S)
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
      extractAllTo: function(v, _, S, R) {
        if (S = f(!1, S), R = a(S, R), _ = f(!1, _), !p) throw e.Errors.NO_ZIP();
        p.entries.forEach(function(N) {
          var b = $(v, w(N.entryName));
          if (N.isDirectory) {
            g.makeDir(b);
            return;
          }
          var M = N.getData(R);
          if (!M)
            throw e.Errors.CANT_EXTRACT_FILE();
          const G = S ? N.header.fileAttr : void 0;
          g.writeFileTo(b, M, _, G);
          try {
            g.fs.utimesSync(b, N.header.time, N.header.time);
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
      extractAllToAsync: function(v, _, S, R) {
        if (R = r(_, S, R), S = f(!1, S), _ = f(!1, _), !R)
          return new Promise((k, U) => {
            this.extractAllToAsync(v, _, S, function(x) {
              x ? U(x) : k(this);
            });
          });
        if (!p) {
          R(e.Errors.NO_ZIP());
          return;
        }
        v = t.resolve(v);
        const N = (k) => $(v, t.normalize(w(k.entryName))), b = (k, U) => new Error(k + ': "' + U + '"'), M = [], G = [];
        p.entries.forEach((k) => {
          k.isDirectory ? M.push(k) : G.push(k);
        });
        for (const k of M) {
          const U = N(k), x = S ? k.header.fileAttr : void 0;
          try {
            g.makeDir(U), x && g.fs.chmodSync(U, x), g.fs.utimesSync(U, k.header.time, k.header.time);
          } catch {
            R(b("Unable to create folder", U));
          }
        }
        G.reverse().reduce(function(k, U) {
          return function(x) {
            if (x)
              k(x);
            else {
              const K = t.normalize(w(U.entryName)), V = $(v, K);
              U.getDataAsync(function(C, j) {
                if (j)
                  k(j);
                else if (!C)
                  k(e.Errors.CANT_EXTRACT_FILE());
                else {
                  const T = S ? U.header.fileAttr : void 0;
                  g.writeFileToAsync(V, C, _, T, function(P) {
                    P || k(b("Unable to write file", V)), g.fs.utimes(V, U.header.time, U.header.time, function(q) {
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
      writeZip: function(v, _) {
        if (arguments.length === 1 && typeof v == "function" && (_ = v, v = ""), !v && E.filename && (v = E.filename), !!v) {
          var S = p.compressToBuffer();
          if (S) {
            var R = g.writeFileTo(v, S, !0);
            typeof _ == "function" && _(R ? null : new Error("failed"), "");
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
      writeZipPromise: function(v, _) {
        const { overwrite: S, perm: R } = Object.assign({ overwrite: !0 }, _);
        return new Promise((N, b) => {
          !v && E.filename && (v = E.filename), v || b("ADM-ZIP: ZIP File Name Missing"), this.toBufferPromise().then((M) => {
            const G = (k) => k ? N(k) : b("ADM-ZIP: Wasn't able to write zip file");
            g.writeFileToAsync(v, M, S, R, G);
          }, b);
        });
      },
      /**
       * @returns {Promise<Buffer>} A promise to the Buffer.
       */
      toBufferPromise: function() {
        return new Promise((v, _) => {
          p.toAsyncBuffer(v, _);
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
      toBuffer: function(v, _, S, R) {
        return typeof v == "function" ? (p.toAsyncBuffer(v, _, S, R), null) : p.compressToBuffer();
      }
    };
  }, wi;
}
var ql = Fl();
const vc = /* @__PURE__ */ Sc(ql);
class Mc {
  // import {os} from 'platform'; は動作しない
  constructor(t, o) {
    this.bw = t, this.version = o, this.#o = process.platform === "win32", t.webContents.on("devtools-opened", () => this.#f());
    const n = new Eu();
    n.handle("openDevTools", () => t.webContents.openDevTools()), this.#d.getVersion = o, n.handle("getInfo", () => this.#d), n.handle("inited", (a, r, u) => this.#p(r, u)), n.handle("fetch", async (a, r) => {
      const u = await fetch(r, { cache: "no-store" });
      return {
        ok: u.ok,
        txt: await u.text()
      };
    }), n.handle("fetchAb", async (a, r) => {
      const u = await fetch(r, { cache: "no-store" });
      return {
        ok: u.ok,
        ab: await u.arrayBuffer()
      };
    }), n.handle("existsSync", (a, r) => ye.existsSync(r)), n.handle("copySync", (a, r, u) => ye.copySync(r, u)), n.handle("removeSync", (a, r) => ye.removeSync(r)), n.handle("ensureFileSync", (a, r) => ye.ensureFileSync(r)), n.handle("readFileSync", (a, r, u) => ye.readFileSync(r, u)), n.handle("writeFileSync", (a, r, u, i) => ye.writeFileSync(r, u, i)), n.handle("appendFile", (a, r, u) => ye.appendFile(r, u).catch((i) => console.log(i))), n.handle("outputFile", (a, r, u) => ye.outputFile(r, u).catch((i) => console.log(i))), n.handle("win_close", () => t.close()), n.handle("win_setTitle", (a, r) => t.setTitle(r)), n.handle("showMessageBox", (a, r) => ki.showMessageBox(t, r)), n.handle("showOpenDialog", (a, r) => ki.showOpenDialog(t, r)), n.handle("capturePage", (a, r, u, i) => t.webContents.capturePage().then((s) => {
      ye.ensureFileSync(r);
      const d = s.resize({ width: u, height: i, quality: "best" }), E = r.endsWith(".png") ? d.toPNG() : d.toJPEG(80);
      ye.writeFileSync(r, E);
    })), n.handle("navigate_to", (a, r) => zc.openExternal(r));
    let f;
    n.handle("Store", (a, r) => {
      f = new tc(r);
    }), n.handle("flush", (a, r) => {
      f.store = r;
    }), n.handle("Store_isEmpty", () => f.size === 0), n.handle("Store_get", () => f.store), n.handle("zip", async (a, r, u) => {
      const i = new vc();
      i.addLocalFolder(r), await i.writeZipPromise(u);
    }), n.handle("unzip", async (a, r, u) => {
      await ye.remove(u), await ye.ensureDir(u), new vc(r).extractAllTo(u, !0);
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
    }), n.handle("window", (a, r, u, i, s, d) => this.#a(r, u, i, s, d)), t.on("move", () => this.#e()), t.on("resize", () => this.#e()), this.#m();
  }
  static initRenderer(t, o) {
    let n, f = () => {
    };
    try {
      tc.initRenderer(), n = new Vc({
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
      const a = new Mc(n, o);
      f = () => a.openDevTools();
    } catch (a) {
      throw console.error(`early err:${a}`), f(), "initRenderer error";
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
  #h = new vu();
  #o;
  #n = 0;
  openDevTools = () => {
  };
  #f = () => this.bw.webContents.closeDevTools();
  // 開こうとしたら閉じる
  #p(t, o) {
    const { width: n, height: f } = t.window, { c: a, x: r, y: u, w: i } = o;
    this.#n = n / f;
    const s = i === n ? f : i / this.#n;
    if (this.#o || this.bw.setAspectRatio(this.#n), this.#a(a, r, u, i, s), this.bw.show(), this.#e = this.#r, t.debug.devtool) {
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
    const t = Mi.getCursorScreenPoint(), o = Mi.getDisplayNearestPoint(t);
    this.#t = o.workAreaSize;
  }
  #l = void 0;
  #e = () => {
  };
  #r() {
    if (this.#l) return;
    this.#e = () => {
    };
    const [t, o] = this.bw.getPosition(), [n, f] = this.bw.getContentSize();
    this.#l = setTimeout(() => {
      this.#l = void 0;
      const [a = 0, r = 0] = this.bw.getPosition(), [u = 0, i = 0] = this.bw.getContentSize();
      if (t !== a || o !== r || n !== u || f !== i) {
        this.#r();
        return;
      }
      this.#e = this.#r;
      let s = u, d = i;
      this.#o && (n === u ? d = u / this.#n : s = i * this.#n), this.#a(!1, a, r, s, d);
    }, 1e3 / 60 * 10);
  }
  #a(t, o, n, f, a) {
    this.bw.simpleFullScreen || (this.#e = () => {
    }, t && (this.#m(), o = (this.#t.width - f) * 0.5, n = (this.#t.height - a) * 0.5), this.#c = o = Math.round(o), this.#u = n = Math.round(n), this.bw.setPosition(o, n), this.#i = f = Math.round(f), this.#s = a = Math.round(a), this.bw.setContentSize(f, a), this.#h.send(this.bw.webContents, "save_win_inf", { c: t, x: o, y: n, w: f, h: a, scrw: this.#t.width, scrh: this.#t.height }), this.#e = this.#r);
  }
}
export {
  Mc as appMain
};
//# sourceMappingURL=appMain.js.map
