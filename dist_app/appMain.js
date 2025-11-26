import Pf, { dialog as uo, shell as Nf, app as Pt, screen as lo, ipcMain as Nt, BrowserWindow as Of } from "electron";
import ct from "fs";
import If from "constants";
import Tf from "stream";
import xi from "util";
import ef from "assert";
import me from "path";
import tf from "crypto";
import Cf from "events";
import Df from "os";
import rf from "zlib";
var Fn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function nf(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Mn = {}, Ot = {}, fo;
function ve() {
  return fo || (fo = 1, Ot.fromCallback = function(e) {
    return Object.defineProperty(function(...t) {
      if (typeof t[t.length - 1] == "function") e.apply(this, t);
      else
        return new Promise((f, s) => {
          t.push((d, i) => d != null ? s(d) : f(i)), e.apply(this, t);
        });
    }, "name", { value: e.name });
  }, Ot.fromPromise = function(e) {
    return Object.defineProperty(function(...t) {
      const f = t[t.length - 1];
      if (typeof f != "function") return e.apply(this, t);
      t.pop(), e.apply(this, t).then((s) => f(null, s), f);
    }, "name", { value: e.name });
  }), Ot;
}
var Un, ho;
function Af() {
  if (ho) return Un;
  ho = 1;
  var e = If, t = process.cwd, f = null, s = process.env.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function() {
    return f || (f = t.call(process)), f;
  };
  try {
    process.cwd();
  } catch {
  }
  if (typeof process.chdir == "function") {
    var d = process.chdir;
    process.chdir = function(r) {
      f = null, d.call(process, r);
    }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, d);
  }
  Un = i;
  function i(r) {
    e.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && a(r), r.lutimes || o(r), r.chown = g(r.chown), r.fchown = g(r.fchown), r.lchown = g(r.lchown), r.chmod = l(r.chmod), r.fchmod = l(r.fchmod), r.lchmod = l(r.lchmod), r.chownSync = E(r.chownSync), r.fchownSync = E(r.fchownSync), r.lchownSync = E(r.lchownSync), r.chmodSync = c(r.chmodSync), r.fchmodSync = c(r.fchmodSync), r.lchmodSync = c(r.lchmodSync), r.stat = _(r.stat), r.fstat = _(r.fstat), r.lstat = _(r.lstat), r.statSync = w(r.statSync), r.fstatSync = w(r.fstatSync), r.lstatSync = w(r.lstatSync), r.chmod && !r.lchmod && (r.lchmod = function(u, h, n) {
      n && process.nextTick(n);
    }, r.lchmodSync = function() {
    }), r.chown && !r.lchown && (r.lchown = function(u, h, n, m) {
      m && process.nextTick(m);
    }, r.lchownSync = function() {
    }), s === "win32" && (r.rename = typeof r.rename != "function" ? r.rename : function(u) {
      function h(n, m, v) {
        var p = Date.now(), y = 0;
        u(n, m, function $(b) {
          if (b && (b.code === "EACCES" || b.code === "EPERM" || b.code === "EBUSY") && Date.now() - p < 6e4) {
            setTimeout(function() {
              r.stat(m, function(N, L) {
                N && N.code === "ENOENT" ? u(n, m, $) : v(b);
              });
            }, y), y < 100 && (y += 10);
            return;
          }
          v && v(b);
        });
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(h, u), h;
    }(r.rename)), r.read = typeof r.read != "function" ? r.read : function(u) {
      function h(n, m, v, p, y, $) {
        var b;
        if ($ && typeof $ == "function") {
          var N = 0;
          b = function(L, F, H) {
            if (L && L.code === "EAGAIN" && N < 10)
              return N++, u.call(r, n, m, v, p, y, b);
            $.apply(this, arguments);
          };
        }
        return u.call(r, n, m, v, p, y, b);
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(h, u), h;
    }(r.read), r.readSync = typeof r.readSync != "function" ? r.readSync : /* @__PURE__ */ function(u) {
      return function(h, n, m, v, p) {
        for (var y = 0; ; )
          try {
            return u.call(r, h, n, m, v, p);
          } catch ($) {
            if ($.code === "EAGAIN" && y < 10) {
              y++;
              continue;
            }
            throw $;
          }
      };
    }(r.readSync);
    function a(u) {
      u.lchmod = function(h, n, m) {
        u.open(
          h,
          e.O_WRONLY | e.O_SYMLINK,
          n,
          function(v, p) {
            if (v) {
              m && m(v);
              return;
            }
            u.fchmod(p, n, function(y) {
              u.close(p, function($) {
                m && m(y || $);
              });
            });
          }
        );
      }, u.lchmodSync = function(h, n) {
        var m = u.openSync(h, e.O_WRONLY | e.O_SYMLINK, n), v = !0, p;
        try {
          p = u.fchmodSync(m, n), v = !1;
        } finally {
          if (v)
            try {
              u.closeSync(m);
            } catch {
            }
          else
            u.closeSync(m);
        }
        return p;
      };
    }
    function o(u) {
      e.hasOwnProperty("O_SYMLINK") && u.futimes ? (u.lutimes = function(h, n, m, v) {
        u.open(h, e.O_SYMLINK, function(p, y) {
          if (p) {
            v && v(p);
            return;
          }
          u.futimes(y, n, m, function($) {
            u.close(y, function(b) {
              v && v($ || b);
            });
          });
        });
      }, u.lutimesSync = function(h, n, m) {
        var v = u.openSync(h, e.O_SYMLINK), p, y = !0;
        try {
          p = u.futimesSync(v, n, m), y = !1;
        } finally {
          if (y)
            try {
              u.closeSync(v);
            } catch {
            }
          else
            u.closeSync(v);
        }
        return p;
      }) : u.futimes && (u.lutimes = function(h, n, m, v) {
        v && process.nextTick(v);
      }, u.lutimesSync = function() {
      });
    }
    function l(u) {
      return u && function(h, n, m) {
        return u.call(r, h, n, function(v) {
          R(v) && (v = null), m && m.apply(this, arguments);
        });
      };
    }
    function c(u) {
      return u && function(h, n) {
        try {
          return u.call(r, h, n);
        } catch (m) {
          if (!R(m)) throw m;
        }
      };
    }
    function g(u) {
      return u && function(h, n, m, v) {
        return u.call(r, h, n, m, function(p) {
          R(p) && (p = null), v && v.apply(this, arguments);
        });
      };
    }
    function E(u) {
      return u && function(h, n, m) {
        try {
          return u.call(r, h, n, m);
        } catch (v) {
          if (!R(v)) throw v;
        }
      };
    }
    function _(u) {
      return u && function(h, n, m) {
        typeof n == "function" && (m = n, n = null);
        function v(p, y) {
          y && (y.uid < 0 && (y.uid += 4294967296), y.gid < 0 && (y.gid += 4294967296)), m && m.apply(this, arguments);
        }
        return n ? u.call(r, h, n, v) : u.call(r, h, v);
      };
    }
    function w(u) {
      return u && function(h, n) {
        var m = n ? u.call(r, h, n) : u.call(r, h);
        return m && (m.uid < 0 && (m.uid += 4294967296), m.gid < 0 && (m.gid += 4294967296)), m;
      };
    }
    function R(u) {
      if (!u || u.code === "ENOSYS")
        return !0;
      var h = !process.getuid || process.getuid() !== 0;
      return !!(h && (u.code === "EINVAL" || u.code === "EPERM"));
    }
  }
  return Un;
}
var Vn, mo;
function Lf() {
  if (mo) return Vn;
  mo = 1;
  var e = Tf.Stream;
  Vn = t;
  function t(f) {
    return {
      ReadStream: s,
      WriteStream: d
    };
    function s(i, r) {
      if (!(this instanceof s)) return new s(i, r);
      e.call(this);
      var a = this;
      this.path = i, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, r = r || {};
      for (var o = Object.keys(r), l = 0, c = o.length; l < c; l++) {
        var g = o[l];
        this[g] = r[g];
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
          a._read();
        });
        return;
      }
      f.open(this.path, this.flags, this.mode, function(E, _) {
        if (E) {
          a.emit("error", E), a.readable = !1;
          return;
        }
        a.fd = _, a.emit("open", _), a._read();
      });
    }
    function d(i, r) {
      if (!(this instanceof d)) return new d(i, r);
      e.call(this), this.path = i, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, r = r || {};
      for (var a = Object.keys(r), o = 0, l = a.length; o < l; o++) {
        var c = a[o];
        this[c] = r[c];
      }
      if (this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.start < 0)
          throw new Error("start must be >= zero");
        this.pos = this.start;
      }
      this.busy = !1, this._queue = [], this.fd === null && (this._open = f.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
    }
  }
  return Vn;
}
var zn, po;
function kf() {
  if (po) return zn;
  po = 1, zn = t;
  var e = Object.getPrototypeOf || function(f) {
    return f.__proto__;
  };
  function t(f) {
    if (f === null || typeof f != "object")
      return f;
    if (f instanceof Object)
      var s = { __proto__: e(f) };
    else
      var s = /* @__PURE__ */ Object.create(null);
    return Object.getOwnPropertyNames(f).forEach(function(d) {
      Object.defineProperty(s, d, Object.getOwnPropertyDescriptor(f, d));
    }), s;
  }
  return zn;
}
var It, yo;
function wt() {
  if (yo) return It;
  yo = 1;
  var e = ct, t = Af(), f = Lf(), s = kf(), d = xi, i, r;
  typeof Symbol == "function" && typeof Symbol.for == "function" ? (i = Symbol.for("graceful-fs.queue"), r = Symbol.for("graceful-fs.previous")) : (i = "___graceful-fs.queue", r = "___graceful-fs.previous");
  function a() {
  }
  function o(u, h) {
    Object.defineProperty(u, i, {
      get: function() {
        return h;
      }
    });
  }
  var l = a;
  if (d.debuglog ? l = d.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (l = function() {
    var u = d.format.apply(d, arguments);
    u = "GFS4: " + u.split(/\n/).join(`
GFS4: `), console.error(u);
  }), !e[i]) {
    var c = Fn[i] || [];
    o(e, c), e.close = function(u) {
      function h(n, m) {
        return u.call(e, n, function(v) {
          v || w(), typeof m == "function" && m.apply(this, arguments);
        });
      }
      return Object.defineProperty(h, r, {
        value: u
      }), h;
    }(e.close), e.closeSync = function(u) {
      function h(n) {
        u.apply(e, arguments), w();
      }
      return Object.defineProperty(h, r, {
        value: u
      }), h;
    }(e.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
      l(e[i]), ef.equal(e[i].length, 0);
    });
  }
  Fn[i] || o(Fn, e[i]), It = g(s(e)), process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !e.__patched && (It = g(e), e.__patched = !0);
  function g(u) {
    t(u), u.gracefulify = g, u.createReadStream = O, u.createWriteStream = k;
    var h = u.readFile;
    u.readFile = n;
    function n(P, A, K) {
      return typeof A == "function" && (K = A, A = null), B(P, A, K);
      function B(X, Z, I, C) {
        return h(X, Z, function(q) {
          q && (q.code === "EMFILE" || q.code === "ENFILE") ? E([B, [X, Z, I], q, C || Date.now(), Date.now()]) : typeof I == "function" && I.apply(this, arguments);
        });
      }
    }
    var m = u.writeFile;
    u.writeFile = v;
    function v(P, A, K, B) {
      return typeof K == "function" && (B = K, K = null), X(P, A, K, B);
      function X(Z, I, C, q, V) {
        return m(Z, I, C, function(x) {
          x && (x.code === "EMFILE" || x.code === "ENFILE") ? E([X, [Z, I, C, q], x, V || Date.now(), Date.now()]) : typeof q == "function" && q.apply(this, arguments);
        });
      }
    }
    var p = u.appendFile;
    p && (u.appendFile = y);
    function y(P, A, K, B) {
      return typeof K == "function" && (B = K, K = null), X(P, A, K, B);
      function X(Z, I, C, q, V) {
        return p(Z, I, C, function(x) {
          x && (x.code === "EMFILE" || x.code === "ENFILE") ? E([X, [Z, I, C, q], x, V || Date.now(), Date.now()]) : typeof q == "function" && q.apply(this, arguments);
        });
      }
    }
    var $ = u.copyFile;
    $ && (u.copyFile = b);
    function b(P, A, K, B) {
      return typeof K == "function" && (B = K, K = 0), X(P, A, K, B);
      function X(Z, I, C, q, V) {
        return $(Z, I, C, function(x) {
          x && (x.code === "EMFILE" || x.code === "ENFILE") ? E([X, [Z, I, C, q], x, V || Date.now(), Date.now()]) : typeof q == "function" && q.apply(this, arguments);
        });
      }
    }
    var N = u.readdir;
    u.readdir = F;
    var L = /^v[0-5]\./;
    function F(P, A, K) {
      typeof A == "function" && (K = A, A = null);
      var B = L.test(process.version) ? function(I, C, q, V) {
        return N(I, X(
          I,
          C,
          q,
          V
        ));
      } : function(I, C, q, V) {
        return N(I, C, X(
          I,
          C,
          q,
          V
        ));
      };
      return B(P, A, K);
      function X(Z, I, C, q) {
        return function(V, x) {
          V && (V.code === "EMFILE" || V.code === "ENFILE") ? E([
            B,
            [Z, I, C],
            V,
            q || Date.now(),
            Date.now()
          ]) : (x && x.sort && x.sort(), typeof C == "function" && C.call(this, V, x));
        };
      }
    }
    if (process.version.substr(0, 4) === "v0.8") {
      var H = f(u);
      W = H.ReadStream, G = H.WriteStream;
    }
    var M = u.ReadStream;
    M && (W.prototype = Object.create(M.prototype), W.prototype.open = j);
    var U = u.WriteStream;
    U && (G.prototype = Object.create(U.prototype), G.prototype.open = D), Object.defineProperty(u, "ReadStream", {
      get: function() {
        return W;
      },
      set: function(P) {
        W = P;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(u, "WriteStream", {
      get: function() {
        return G;
      },
      set: function(P) {
        G = P;
      },
      enumerable: !0,
      configurable: !0
    });
    var z = W;
    Object.defineProperty(u, "FileReadStream", {
      get: function() {
        return z;
      },
      set: function(P) {
        z = P;
      },
      enumerable: !0,
      configurable: !0
    });
    var J = G;
    Object.defineProperty(u, "FileWriteStream", {
      get: function() {
        return J;
      },
      set: function(P) {
        J = P;
      },
      enumerable: !0,
      configurable: !0
    });
    function W(P, A) {
      return this instanceof W ? (M.apply(this, arguments), this) : W.apply(Object.create(W.prototype), arguments);
    }
    function j() {
      var P = this;
      S(P.path, P.flags, P.mode, function(A, K) {
        A ? (P.autoClose && P.destroy(), P.emit("error", A)) : (P.fd = K, P.emit("open", K), P.read());
      });
    }
    function G(P, A) {
      return this instanceof G ? (U.apply(this, arguments), this) : G.apply(Object.create(G.prototype), arguments);
    }
    function D() {
      var P = this;
      S(P.path, P.flags, P.mode, function(A, K) {
        A ? (P.destroy(), P.emit("error", A)) : (P.fd = K, P.emit("open", K));
      });
    }
    function O(P, A) {
      return new u.ReadStream(P, A);
    }
    function k(P, A) {
      return new u.WriteStream(P, A);
    }
    var T = u.open;
    u.open = S;
    function S(P, A, K, B) {
      return typeof K == "function" && (B = K, K = null), X(P, A, K, B);
      function X(Z, I, C, q, V) {
        return T(Z, I, C, function(x, Y) {
          x && (x.code === "EMFILE" || x.code === "ENFILE") ? E([X, [Z, I, C, q], x, V || Date.now(), Date.now()]) : typeof q == "function" && q.apply(this, arguments);
        });
      }
    }
    return u;
  }
  function E(u) {
    l("ENQUEUE", u[0].name, u[1]), e[i].push(u), R();
  }
  var _;
  function w() {
    for (var u = Date.now(), h = 0; h < e[i].length; ++h)
      e[i][h].length > 2 && (e[i][h][3] = u, e[i][h][4] = u);
    R();
  }
  function R() {
    if (clearTimeout(_), _ = void 0, e[i].length !== 0) {
      var u = e[i].shift(), h = u[0], n = u[1], m = u[2], v = u[3], p = u[4];
      if (v === void 0)
        l("RETRY", h.name, n), h.apply(null, n);
      else if (Date.now() - v >= 6e4) {
        l("TIMEOUT", h.name, n);
        var y = n.pop();
        typeof y == "function" && y.call(null, m);
      } else {
        var $ = Date.now() - p, b = Math.max(p - v, 1), N = Math.min(b * 1.2, 100);
        $ >= N ? (l("RETRY", h.name, n), h.apply(null, n.concat([v]))) : e[i].push(u);
      }
      _ === void 0 && (_ = setTimeout(R, 0));
    }
  }
  return It;
}
var vo;
function Ee() {
  return vo || (vo = 1, function(e) {
    const t = ve().fromCallback, f = wt(), s = [
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
    ].filter((d) => typeof f[d] == "function");
    Object.assign(e, f), s.forEach((d) => {
      e[d] = t(f[d]);
    }), e.exists = function(d, i) {
      return typeof i == "function" ? f.exists(d, i) : new Promise((r) => f.exists(d, r));
    }, e.read = function(d, i, r, a, o, l) {
      return typeof l == "function" ? f.read(d, i, r, a, o, l) : new Promise((c, g) => {
        f.read(d, i, r, a, o, (E, _, w) => {
          if (E) return g(E);
          c({ bytesRead: _, buffer: w });
        });
      });
    }, e.write = function(d, i, ...r) {
      return typeof r[r.length - 1] == "function" ? f.write(d, i, ...r) : new Promise((a, o) => {
        f.write(d, i, ...r, (l, c, g) => {
          if (l) return o(l);
          a({ bytesWritten: c, buffer: g });
        });
      });
    }, e.readv = function(d, i, ...r) {
      return typeof r[r.length - 1] == "function" ? f.readv(d, i, ...r) : new Promise((a, o) => {
        f.readv(d, i, ...r, (l, c, g) => {
          if (l) return o(l);
          a({ bytesRead: c, buffers: g });
        });
      });
    }, e.writev = function(d, i, ...r) {
      return typeof r[r.length - 1] == "function" ? f.writev(d, i, ...r) : new Promise((a, o) => {
        f.writev(d, i, ...r, (l, c, g) => {
          if (l) return o(l);
          a({ bytesWritten: c, buffers: g });
        });
      });
    }, typeof f.realpath.native == "function" ? e.realpath.native = t(f.realpath.native) : process.emitWarning(
      "fs.realpath.native is not a function. Is fs being monkey-patched?",
      "Warning",
      "fs-extra-WARN0003"
    );
  }(Mn)), Mn;
}
var Tt = {}, Gn = {}, _o;
function qf() {
  if (_o) return Gn;
  _o = 1;
  const e = me;
  return Gn.checkPath = function(f) {
    if (process.platform === "win32" && /[<>:"|?*]/.test(f.replace(e.parse(f).root, ""))) {
      const d = new Error(`Path contains invalid characters: ${f}`);
      throw d.code = "EINVAL", d;
    }
  }, Gn;
}
var go;
function jf() {
  if (go) return Tt;
  go = 1;
  const e = /* @__PURE__ */ Ee(), { checkPath: t } = /* @__PURE__ */ qf(), f = (s) => {
    const d = { mode: 511 };
    return typeof s == "number" ? s : { ...d, ...s }.mode;
  };
  return Tt.makeDir = async (s, d) => (t(s), e.mkdir(s, {
    mode: f(d),
    recursive: !0
  })), Tt.makeDirSync = (s, d) => (t(s), e.mkdirSync(s, {
    mode: f(d),
    recursive: !0
  })), Tt;
}
var Kn, $o;
function Le() {
  if ($o) return Kn;
  $o = 1;
  const e = ve().fromPromise, { makeDir: t, makeDirSync: f } = /* @__PURE__ */ jf(), s = e(t);
  return Kn = {
    mkdirs: s,
    mkdirsSync: f,
    // alias
    mkdirp: s,
    mkdirpSync: f,
    ensureDir: s,
    ensureDirSync: f
  }, Kn;
}
var Hn, Eo;
function nt() {
  if (Eo) return Hn;
  Eo = 1;
  const e = ve().fromPromise, t = /* @__PURE__ */ Ee();
  function f(s) {
    return t.access(s).then(() => !0).catch(() => !1);
  }
  return Hn = {
    pathExists: e(f),
    pathExistsSync: t.existsSync
  }, Hn;
}
var xn, wo;
function sf() {
  if (wo) return xn;
  wo = 1;
  const e = /* @__PURE__ */ Ee(), t = ve().fromPromise;
  async function f(d, i, r) {
    const a = await e.open(d, "r+");
    let o = null;
    try {
      await e.futimes(a, i, r);
    } finally {
      try {
        await e.close(a);
      } catch (l) {
        o = l;
      }
    }
    if (o)
      throw o;
  }
  function s(d, i, r) {
    const a = e.openSync(d, "r+");
    return e.futimesSync(a, i, r), e.closeSync(a);
  }
  return xn = {
    utimesMillis: t(f),
    utimesMillisSync: s
  }, xn;
}
var Bn, So;
function ut() {
  if (So) return Bn;
  So = 1;
  const e = /* @__PURE__ */ Ee(), t = me, f = ve().fromPromise;
  function s(E, _, w) {
    const R = w.dereference ? (u) => e.stat(u, { bigint: !0 }) : (u) => e.lstat(u, { bigint: !0 });
    return Promise.all([
      R(E),
      R(_).catch((u) => {
        if (u.code === "ENOENT") return null;
        throw u;
      })
    ]).then(([u, h]) => ({ srcStat: u, destStat: h }));
  }
  function d(E, _, w) {
    let R;
    const u = w.dereference ? (n) => e.statSync(n, { bigint: !0 }) : (n) => e.lstatSync(n, { bigint: !0 }), h = u(E);
    try {
      R = u(_);
    } catch (n) {
      if (n.code === "ENOENT") return { srcStat: h, destStat: null };
      throw n;
    }
    return { srcStat: h, destStat: R };
  }
  async function i(E, _, w, R) {
    const { srcStat: u, destStat: h } = await s(E, _, R);
    if (h) {
      if (l(u, h)) {
        const n = t.basename(E), m = t.basename(_);
        if (w === "move" && n !== m && n.toLowerCase() === m.toLowerCase())
          return { srcStat: u, destStat: h, isChangingCase: !0 };
        throw new Error("Source and destination must not be the same.");
      }
      if (u.isDirectory() && !h.isDirectory())
        throw new Error(`Cannot overwrite non-directory '${_}' with directory '${E}'.`);
      if (!u.isDirectory() && h.isDirectory())
        throw new Error(`Cannot overwrite directory '${_}' with non-directory '${E}'.`);
    }
    if (u.isDirectory() && c(E, _))
      throw new Error(g(E, _, w));
    return { srcStat: u, destStat: h };
  }
  function r(E, _, w, R) {
    const { srcStat: u, destStat: h } = d(E, _, R);
    if (h) {
      if (l(u, h)) {
        const n = t.basename(E), m = t.basename(_);
        if (w === "move" && n !== m && n.toLowerCase() === m.toLowerCase())
          return { srcStat: u, destStat: h, isChangingCase: !0 };
        throw new Error("Source and destination must not be the same.");
      }
      if (u.isDirectory() && !h.isDirectory())
        throw new Error(`Cannot overwrite non-directory '${_}' with directory '${E}'.`);
      if (!u.isDirectory() && h.isDirectory())
        throw new Error(`Cannot overwrite directory '${_}' with non-directory '${E}'.`);
    }
    if (u.isDirectory() && c(E, _))
      throw new Error(g(E, _, w));
    return { srcStat: u, destStat: h };
  }
  async function a(E, _, w, R) {
    const u = t.resolve(t.dirname(E)), h = t.resolve(t.dirname(w));
    if (h === u || h === t.parse(h).root) return;
    let n;
    try {
      n = await e.stat(h, { bigint: !0 });
    } catch (m) {
      if (m.code === "ENOENT") return;
      throw m;
    }
    if (l(_, n))
      throw new Error(g(E, w, R));
    return a(E, _, h, R);
  }
  function o(E, _, w, R) {
    const u = t.resolve(t.dirname(E)), h = t.resolve(t.dirname(w));
    if (h === u || h === t.parse(h).root) return;
    let n;
    try {
      n = e.statSync(h, { bigint: !0 });
    } catch (m) {
      if (m.code === "ENOENT") return;
      throw m;
    }
    if (l(_, n))
      throw new Error(g(E, w, R));
    return o(E, _, h, R);
  }
  function l(E, _) {
    return _.ino !== void 0 && _.dev !== void 0 && _.ino === E.ino && _.dev === E.dev;
  }
  function c(E, _) {
    const w = t.resolve(E).split(t.sep).filter((u) => u), R = t.resolve(_).split(t.sep).filter((u) => u);
    return w.every((u, h) => R[h] === u);
  }
  function g(E, _, w) {
    return `Cannot ${w} '${E}' to a subdirectory of itself, '${_}'.`;
  }
  return Bn = {
    // checkPaths
    checkPaths: f(i),
    checkPathsSync: r,
    // checkParent
    checkParentPaths: f(a),
    checkParentPathsSync: o,
    // Misc
    isSrcSubdir: c,
    areIdentical: l
  }, Bn;
}
var Wn, Ro;
function Ff() {
  if (Ro) return Wn;
  Ro = 1;
  async function e(t, f) {
    const s = [];
    for await (const d of t)
      s.push(
        f(d).then(
          () => null,
          (i) => i ?? new Error("unknown error")
        )
      );
    await Promise.all(
      s.map(
        (d) => d.then((i) => {
          if (i !== null) throw i;
        })
      )
    );
  }
  return Wn = {
    asyncIteratorConcurrentProcess: e
  }, Wn;
}
var Jn, bo;
function Mf() {
  if (bo) return Jn;
  bo = 1;
  const e = /* @__PURE__ */ Ee(), t = me, { mkdirs: f } = /* @__PURE__ */ Le(), { pathExists: s } = /* @__PURE__ */ nt(), { utimesMillis: d } = /* @__PURE__ */ sf(), i = /* @__PURE__ */ ut(), { asyncIteratorConcurrentProcess: r } = /* @__PURE__ */ Ff();
  async function a(u, h, n = {}) {
    typeof n == "function" && (n = { filter: n }), n.clobber = "clobber" in n ? !!n.clobber : !0, n.overwrite = "overwrite" in n ? !!n.overwrite : n.clobber, n.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0001"
    );
    const { srcStat: m, destStat: v } = await i.checkPaths(u, h, "copy", n);
    if (await i.checkParentPaths(u, m, h, "copy"), !await o(u, h, n)) return;
    const y = t.dirname(h);
    await s(y) || await f(y), await l(v, u, h, n);
  }
  async function o(u, h, n) {
    return n.filter ? n.filter(u, h) : !0;
  }
  async function l(u, h, n, m) {
    const p = await (m.dereference ? e.stat : e.lstat)(h);
    if (p.isDirectory()) return w(p, u, h, n, m);
    if (p.isFile() || p.isCharacterDevice() || p.isBlockDevice()) return c(p, u, h, n, m);
    if (p.isSymbolicLink()) return R(u, h, n, m);
    throw p.isSocket() ? new Error(`Cannot copy a socket file: ${h}`) : p.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${h}`) : new Error(`Unknown file: ${h}`);
  }
  async function c(u, h, n, m, v) {
    if (!h) return g(u, n, m, v);
    if (v.overwrite)
      return await e.unlink(m), g(u, n, m, v);
    if (v.errorOnExist)
      throw new Error(`'${m}' already exists`);
  }
  async function g(u, h, n, m) {
    if (await e.copyFile(h, n), m.preserveTimestamps) {
      E(u.mode) && await _(n, u.mode);
      const v = await e.stat(h);
      await d(n, v.atime, v.mtime);
    }
    return e.chmod(n, u.mode);
  }
  function E(u) {
    return (u & 128) === 0;
  }
  function _(u, h) {
    return e.chmod(u, h | 128);
  }
  async function w(u, h, n, m, v) {
    h || await e.mkdir(m), await r(await e.opendir(n), async (p) => {
      const y = t.join(n, p.name), $ = t.join(m, p.name);
      if (await o(y, $, v)) {
        const { destStat: N } = await i.checkPaths(y, $, "copy", v);
        await l(N, y, $, v);
      }
    }), h || await e.chmod(m, u.mode);
  }
  async function R(u, h, n, m) {
    let v = await e.readlink(h);
    if (m.dereference && (v = t.resolve(process.cwd(), v)), !u)
      return e.symlink(v, n);
    let p = null;
    try {
      p = await e.readlink(n);
    } catch (y) {
      if (y.code === "EINVAL" || y.code === "UNKNOWN") return e.symlink(v, n);
      throw y;
    }
    if (m.dereference && (p = t.resolve(process.cwd(), p)), i.isSrcSubdir(v, p))
      throw new Error(`Cannot copy '${v}' to a subdirectory of itself, '${p}'.`);
    if (i.isSrcSubdir(p, v))
      throw new Error(`Cannot overwrite '${p}' with '${v}'.`);
    return await e.unlink(n), e.symlink(v, n);
  }
  return Jn = a, Jn;
}
var Zn, Po;
function Uf() {
  if (Po) return Zn;
  Po = 1;
  const e = wt(), t = me, f = Le().mkdirsSync, s = sf().utimesMillisSync, d = /* @__PURE__ */ ut();
  function i(p, y, $) {
    typeof $ == "function" && ($ = { filter: $ }), $ = $ || {}, $.clobber = "clobber" in $ ? !!$.clobber : !0, $.overwrite = "overwrite" in $ ? !!$.overwrite : $.clobber, $.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0002"
    );
    const { srcStat: b, destStat: N } = d.checkPathsSync(p, y, "copy", $);
    if (d.checkParentPathsSync(p, b, y, "copy"), $.filter && !$.filter(p, y)) return;
    const L = t.dirname(y);
    return e.existsSync(L) || f(L), r(N, p, y, $);
  }
  function r(p, y, $, b) {
    const L = (b.dereference ? e.statSync : e.lstatSync)(y);
    if (L.isDirectory()) return R(L, p, y, $, b);
    if (L.isFile() || L.isCharacterDevice() || L.isBlockDevice()) return a(L, p, y, $, b);
    if (L.isSymbolicLink()) return m(p, y, $, b);
    throw L.isSocket() ? new Error(`Cannot copy a socket file: ${y}`) : L.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${y}`) : new Error(`Unknown file: ${y}`);
  }
  function a(p, y, $, b, N) {
    return y ? o(p, $, b, N) : l(p, $, b, N);
  }
  function o(p, y, $, b) {
    if (b.overwrite)
      return e.unlinkSync($), l(p, y, $, b);
    if (b.errorOnExist)
      throw new Error(`'${$}' already exists`);
  }
  function l(p, y, $, b) {
    return e.copyFileSync(y, $), b.preserveTimestamps && c(p.mode, y, $), _($, p.mode);
  }
  function c(p, y, $) {
    return g(p) && E($, p), w(y, $);
  }
  function g(p) {
    return (p & 128) === 0;
  }
  function E(p, y) {
    return _(p, y | 128);
  }
  function _(p, y) {
    return e.chmodSync(p, y);
  }
  function w(p, y) {
    const $ = e.statSync(p);
    return s(y, $.atime, $.mtime);
  }
  function R(p, y, $, b, N) {
    return y ? h($, b, N) : u(p.mode, $, b, N);
  }
  function u(p, y, $, b) {
    return e.mkdirSync($), h(y, $, b), _($, p);
  }
  function h(p, y, $) {
    const b = e.opendirSync(p);
    try {
      let N;
      for (; (N = b.readSync()) !== null; )
        n(N.name, p, y, $);
    } finally {
      b.closeSync();
    }
  }
  function n(p, y, $, b) {
    const N = t.join(y, p), L = t.join($, p);
    if (b.filter && !b.filter(N, L)) return;
    const { destStat: F } = d.checkPathsSync(N, L, "copy", b);
    return r(F, N, L, b);
  }
  function m(p, y, $, b) {
    let N = e.readlinkSync(y);
    if (b.dereference && (N = t.resolve(process.cwd(), N)), p) {
      let L;
      try {
        L = e.readlinkSync($);
      } catch (F) {
        if (F.code === "EINVAL" || F.code === "UNKNOWN") return e.symlinkSync(N, $);
        throw F;
      }
      if (b.dereference && (L = t.resolve(process.cwd(), L)), d.isSrcSubdir(N, L))
        throw new Error(`Cannot copy '${N}' to a subdirectory of itself, '${L}'.`);
      if (d.isSrcSubdir(L, N))
        throw new Error(`Cannot overwrite '${L}' with '${N}'.`);
      return v(N, $);
    } else
      return e.symlinkSync(N, $);
  }
  function v(p, y) {
    return e.unlinkSync(y), e.symlinkSync(p, y);
  }
  return Zn = i, Zn;
}
var Xn, No;
function Bi() {
  if (No) return Xn;
  No = 1;
  const e = ve().fromPromise;
  return Xn = {
    copy: e(/* @__PURE__ */ Mf()),
    copySync: /* @__PURE__ */ Uf()
  }, Xn;
}
var Yn, Oo;
function wn() {
  if (Oo) return Yn;
  Oo = 1;
  const e = wt(), t = ve().fromCallback;
  function f(d, i) {
    e.rm(d, { recursive: !0, force: !0 }, i);
  }
  function s(d) {
    e.rmSync(d, { recursive: !0, force: !0 });
  }
  return Yn = {
    remove: t(f),
    removeSync: s
  }, Yn;
}
var Qn, Io;
function Vf() {
  if (Io) return Qn;
  Io = 1;
  const e = ve().fromPromise, t = /* @__PURE__ */ Ee(), f = me, s = /* @__PURE__ */ Le(), d = /* @__PURE__ */ wn(), i = e(async function(o) {
    let l;
    try {
      l = await t.readdir(o);
    } catch {
      return s.mkdirs(o);
    }
    return Promise.all(l.map((c) => d.remove(f.join(o, c))));
  });
  function r(a) {
    let o;
    try {
      o = t.readdirSync(a);
    } catch {
      return s.mkdirsSync(a);
    }
    o.forEach((l) => {
      l = f.join(a, l), d.removeSync(l);
    });
  }
  return Qn = {
    emptyDirSync: r,
    emptydirSync: r,
    emptyDir: i,
    emptydir: i
  }, Qn;
}
var es, To;
function zf() {
  if (To) return es;
  To = 1;
  const e = ve().fromPromise, t = me, f = /* @__PURE__ */ Ee(), s = /* @__PURE__ */ Le();
  async function d(r) {
    let a;
    try {
      a = await f.stat(r);
    } catch {
    }
    if (a && a.isFile()) return;
    const o = t.dirname(r);
    let l = null;
    try {
      l = await f.stat(o);
    } catch (c) {
      if (c.code === "ENOENT") {
        await s.mkdirs(o), await f.writeFile(r, "");
        return;
      } else
        throw c;
    }
    l.isDirectory() ? await f.writeFile(r, "") : await f.readdir(o);
  }
  function i(r) {
    let a;
    try {
      a = f.statSync(r);
    } catch {
    }
    if (a && a.isFile()) return;
    const o = t.dirname(r);
    try {
      f.statSync(o).isDirectory() || f.readdirSync(o);
    } catch (l) {
      if (l && l.code === "ENOENT") s.mkdirsSync(o);
      else throw l;
    }
    f.writeFileSync(r, "");
  }
  return es = {
    createFile: e(d),
    createFileSync: i
  }, es;
}
var ts, Co;
function Gf() {
  if (Co) return ts;
  Co = 1;
  const e = ve().fromPromise, t = me, f = /* @__PURE__ */ Ee(), s = /* @__PURE__ */ Le(), { pathExists: d } = /* @__PURE__ */ nt(), { areIdentical: i } = /* @__PURE__ */ ut();
  async function r(o, l) {
    let c;
    try {
      c = await f.lstat(l);
    } catch {
    }
    let g;
    try {
      g = await f.lstat(o);
    } catch (w) {
      throw w.message = w.message.replace("lstat", "ensureLink"), w;
    }
    if (c && i(g, c)) return;
    const E = t.dirname(l);
    await d(E) || await s.mkdirs(E), await f.link(o, l);
  }
  function a(o, l) {
    let c;
    try {
      c = f.lstatSync(l);
    } catch {
    }
    try {
      const _ = f.lstatSync(o);
      if (c && i(_, c)) return;
    } catch (_) {
      throw _.message = _.message.replace("lstat", "ensureLink"), _;
    }
    const g = t.dirname(l);
    return f.existsSync(g) || s.mkdirsSync(g), f.linkSync(o, l);
  }
  return ts = {
    createLink: e(r),
    createLinkSync: a
  }, ts;
}
var rs, Do;
function Kf() {
  if (Do) return rs;
  Do = 1;
  const e = me, t = /* @__PURE__ */ Ee(), { pathExists: f } = /* @__PURE__ */ nt(), s = ve().fromPromise;
  async function d(r, a) {
    if (e.isAbsolute(r)) {
      try {
        await t.lstat(r);
      } catch (g) {
        throw g.message = g.message.replace("lstat", "ensureSymlink"), g;
      }
      return {
        toCwd: r,
        toDst: r
      };
    }
    const o = e.dirname(a), l = e.join(o, r);
    if (await f(l))
      return {
        toCwd: l,
        toDst: r
      };
    try {
      await t.lstat(r);
    } catch (g) {
      throw g.message = g.message.replace("lstat", "ensureSymlink"), g;
    }
    return {
      toCwd: r,
      toDst: e.relative(o, r)
    };
  }
  function i(r, a) {
    if (e.isAbsolute(r)) {
      if (!t.existsSync(r)) throw new Error("absolute srcpath does not exist");
      return {
        toCwd: r,
        toDst: r
      };
    }
    const o = e.dirname(a), l = e.join(o, r);
    if (t.existsSync(l))
      return {
        toCwd: l,
        toDst: r
      };
    if (!t.existsSync(r)) throw new Error("relative srcpath does not exist");
    return {
      toCwd: r,
      toDst: e.relative(o, r)
    };
  }
  return rs = {
    symlinkPaths: s(d),
    symlinkPathsSync: i
  }, rs;
}
var ns, Ao;
function Hf() {
  if (Ao) return ns;
  Ao = 1;
  const e = /* @__PURE__ */ Ee(), t = ve().fromPromise;
  async function f(d, i) {
    if (i) return i;
    let r;
    try {
      r = await e.lstat(d);
    } catch {
      return "file";
    }
    return r && r.isDirectory() ? "dir" : "file";
  }
  function s(d, i) {
    if (i) return i;
    let r;
    try {
      r = e.lstatSync(d);
    } catch {
      return "file";
    }
    return r && r.isDirectory() ? "dir" : "file";
  }
  return ns = {
    symlinkType: t(f),
    symlinkTypeSync: s
  }, ns;
}
var ss, Lo;
function xf() {
  if (Lo) return ss;
  Lo = 1;
  const e = ve().fromPromise, t = me, f = /* @__PURE__ */ Ee(), { mkdirs: s, mkdirsSync: d } = /* @__PURE__ */ Le(), { symlinkPaths: i, symlinkPathsSync: r } = /* @__PURE__ */ Kf(), { symlinkType: a, symlinkTypeSync: o } = /* @__PURE__ */ Hf(), { pathExists: l } = /* @__PURE__ */ nt(), { areIdentical: c } = /* @__PURE__ */ ut();
  async function g(_, w, R) {
    let u;
    try {
      u = await f.lstat(w);
    } catch {
    }
    if (u && u.isSymbolicLink()) {
      const [v, p] = await Promise.all([
        f.stat(_),
        f.stat(w)
      ]);
      if (c(v, p)) return;
    }
    const h = await i(_, w);
    _ = h.toDst;
    const n = await a(h.toCwd, R), m = t.dirname(w);
    return await l(m) || await s(m), f.symlink(_, w, n);
  }
  function E(_, w, R) {
    let u;
    try {
      u = f.lstatSync(w);
    } catch {
    }
    if (u && u.isSymbolicLink()) {
      const v = f.statSync(_), p = f.statSync(w);
      if (c(v, p)) return;
    }
    const h = r(_, w);
    _ = h.toDst, R = o(h.toCwd, R);
    const n = t.dirname(w);
    return f.existsSync(n) || d(n), f.symlinkSync(_, w, R);
  }
  return ss = {
    createSymlink: e(g),
    createSymlinkSync: E
  }, ss;
}
var is, ko;
function Bf() {
  if (ko) return is;
  ko = 1;
  const { createFile: e, createFileSync: t } = /* @__PURE__ */ zf(), { createLink: f, createLinkSync: s } = /* @__PURE__ */ Gf(), { createSymlink: d, createSymlinkSync: i } = /* @__PURE__ */ xf();
  return is = {
    // file
    createFile: e,
    createFileSync: t,
    ensureFile: e,
    ensureFileSync: t,
    // link
    createLink: f,
    createLinkSync: s,
    ensureLink: f,
    ensureLinkSync: s,
    // symlink
    createSymlink: d,
    createSymlinkSync: i,
    ensureSymlink: d,
    ensureSymlinkSync: i
  }, is;
}
var os, qo;
function Wi() {
  if (qo) return os;
  qo = 1;
  function e(f, { EOL: s = `
`, finalEOL: d = !0, replacer: i = null, spaces: r } = {}) {
    const a = d ? s : "";
    return JSON.stringify(f, i, r).replace(/\n/g, s) + a;
  }
  function t(f) {
    return Buffer.isBuffer(f) && (f = f.toString("utf8")), f.replace(/^\uFEFF/, "");
  }
  return os = { stringify: e, stripBom: t }, os;
}
var as, jo;
function Wf() {
  if (jo) return as;
  jo = 1;
  let e;
  try {
    e = wt();
  } catch {
    e = ct;
  }
  const t = ve(), { stringify: f, stripBom: s } = Wi();
  async function d(g, E = {}) {
    typeof E == "string" && (E = { encoding: E });
    const _ = E.fs || e, w = "throws" in E ? E.throws : !0;
    let R = await t.fromCallback(_.readFile)(g, E);
    R = s(R);
    let u;
    try {
      u = JSON.parse(R, E ? E.reviver : null);
    } catch (h) {
      if (w)
        throw h.message = `${g}: ${h.message}`, h;
      return null;
    }
    return u;
  }
  const i = t.fromPromise(d);
  function r(g, E = {}) {
    typeof E == "string" && (E = { encoding: E });
    const _ = E.fs || e, w = "throws" in E ? E.throws : !0;
    try {
      let R = _.readFileSync(g, E);
      return R = s(R), JSON.parse(R, E.reviver);
    } catch (R) {
      if (w)
        throw R.message = `${g}: ${R.message}`, R;
      return null;
    }
  }
  async function a(g, E, _ = {}) {
    const w = _.fs || e, R = f(E, _);
    await t.fromCallback(w.writeFile)(g, R, _);
  }
  const o = t.fromPromise(a);
  function l(g, E, _ = {}) {
    const w = _.fs || e, R = f(E, _);
    return w.writeFileSync(g, R, _);
  }
  return as = {
    readFile: i,
    readFileSync: r,
    writeFile: o,
    writeFileSync: l
  }, as;
}
var cs, Fo;
function Jf() {
  if (Fo) return cs;
  Fo = 1;
  const e = Wf();
  return cs = {
    // jsonfile exports
    readJson: e.readFile,
    readJsonSync: e.readFileSync,
    writeJson: e.writeFile,
    writeJsonSync: e.writeFileSync
  }, cs;
}
var us, Mo;
function Ji() {
  if (Mo) return us;
  Mo = 1;
  const e = ve().fromPromise, t = /* @__PURE__ */ Ee(), f = me, s = /* @__PURE__ */ Le(), d = nt().pathExists;
  async function i(a, o, l = "utf-8") {
    const c = f.dirname(a);
    return await d(c) || await s.mkdirs(c), t.writeFile(a, o, l);
  }
  function r(a, ...o) {
    const l = f.dirname(a);
    t.existsSync(l) || s.mkdirsSync(l), t.writeFileSync(a, ...o);
  }
  return us = {
    outputFile: e(i),
    outputFileSync: r
  }, us;
}
var ls, Uo;
function Zf() {
  if (Uo) return ls;
  Uo = 1;
  const { stringify: e } = Wi(), { outputFile: t } = /* @__PURE__ */ Ji();
  async function f(s, d, i = {}) {
    const r = e(d, i);
    await t(s, r, i);
  }
  return ls = f, ls;
}
var fs, Vo;
function Xf() {
  if (Vo) return fs;
  Vo = 1;
  const { stringify: e } = Wi(), { outputFileSync: t } = /* @__PURE__ */ Ji();
  function f(s, d, i) {
    const r = e(d, i);
    t(s, r, i);
  }
  return fs = f, fs;
}
var ds, zo;
function Yf() {
  if (zo) return ds;
  zo = 1;
  const e = ve().fromPromise, t = /* @__PURE__ */ Jf();
  return t.outputJson = e(/* @__PURE__ */ Zf()), t.outputJsonSync = /* @__PURE__ */ Xf(), t.outputJSON = t.outputJson, t.outputJSONSync = t.outputJsonSync, t.writeJSON = t.writeJson, t.writeJSONSync = t.writeJsonSync, t.readJSON = t.readJson, t.readJSONSync = t.readJsonSync, ds = t, ds;
}
var hs, Go;
function Qf() {
  if (Go) return hs;
  Go = 1;
  const e = /* @__PURE__ */ Ee(), t = me, { copy: f } = /* @__PURE__ */ Bi(), { remove: s } = /* @__PURE__ */ wn(), { mkdirp: d } = /* @__PURE__ */ Le(), { pathExists: i } = /* @__PURE__ */ nt(), r = /* @__PURE__ */ ut();
  async function a(c, g, E = {}) {
    const _ = E.overwrite || E.clobber || !1, { srcStat: w, isChangingCase: R = !1 } = await r.checkPaths(c, g, "move", E);
    await r.checkParentPaths(c, w, g, "move");
    const u = t.dirname(g);
    return t.parse(u).root !== u && await d(u), o(c, g, _, R);
  }
  async function o(c, g, E, _) {
    if (!_) {
      if (E)
        await s(g);
      else if (await i(g))
        throw new Error("dest already exists.");
    }
    try {
      await e.rename(c, g);
    } catch (w) {
      if (w.code !== "EXDEV")
        throw w;
      await l(c, g, E);
    }
  }
  async function l(c, g, E) {
    return await f(c, g, {
      overwrite: E,
      errorOnExist: !0,
      preserveTimestamps: !0
    }), s(c);
  }
  return hs = a, hs;
}
var ms, Ko;
function ed() {
  if (Ko) return ms;
  Ko = 1;
  const e = wt(), t = me, f = Bi().copySync, s = wn().removeSync, d = Le().mkdirpSync, i = /* @__PURE__ */ ut();
  function r(g, E, _) {
    _ = _ || {};
    const w = _.overwrite || _.clobber || !1, { srcStat: R, isChangingCase: u = !1 } = i.checkPathsSync(g, E, "move", _);
    return i.checkParentPathsSync(g, R, E, "move"), a(E) || d(t.dirname(E)), o(g, E, w, u);
  }
  function a(g) {
    const E = t.dirname(g);
    return t.parse(E).root === E;
  }
  function o(g, E, _, w) {
    if (w) return l(g, E, _);
    if (_)
      return s(E), l(g, E, _);
    if (e.existsSync(E)) throw new Error("dest already exists.");
    return l(g, E, _);
  }
  function l(g, E, _) {
    try {
      e.renameSync(g, E);
    } catch (w) {
      if (w.code !== "EXDEV") throw w;
      return c(g, E, _);
    }
  }
  function c(g, E, _) {
    return f(g, E, {
      overwrite: _,
      errorOnExist: !0,
      preserveTimestamps: !0
    }), s(g);
  }
  return ms = r, ms;
}
var ps, Ho;
function td() {
  if (Ho) return ps;
  Ho = 1;
  const e = ve().fromPromise;
  return ps = {
    move: e(/* @__PURE__ */ Qf()),
    moveSync: /* @__PURE__ */ ed()
  }, ps;
}
var ys, xo;
function rd() {
  return xo || (xo = 1, ys = {
    // Export promiseified graceful-fs:
    .../* @__PURE__ */ Ee(),
    // Export extra methods:
    .../* @__PURE__ */ Bi(),
    .../* @__PURE__ */ Vf(),
    .../* @__PURE__ */ Bf(),
    .../* @__PURE__ */ Yf(),
    .../* @__PURE__ */ Le(),
    .../* @__PURE__ */ td(),
    .../* @__PURE__ */ Ji(),
    .../* @__PURE__ */ nt(),
    .../* @__PURE__ */ wn()
  }), ys;
}
var be = /* @__PURE__ */ rd(), $t = { exports: {} }, vs, Bo;
function nd() {
  return Bo || (Bo = 1, vs = (e) => {
    const t = typeof e;
    return e !== null && (t === "object" || t === "function");
  }), vs;
}
var _s, Wo;
function sd() {
  if (Wo) return _s;
  Wo = 1;
  const e = nd(), t = /* @__PURE__ */ new Set([
    "__proto__",
    "prototype",
    "constructor"
  ]), f = (d) => !d.some((i) => t.has(i));
  function s(d) {
    const i = d.split("."), r = [];
    for (let a = 0; a < i.length; a++) {
      let o = i[a];
      for (; o[o.length - 1] === "\\" && i[a + 1] !== void 0; )
        o = o.slice(0, -1) + ".", o += i[++a];
      r.push(o);
    }
    return f(r) ? r : [];
  }
  return _s = {
    get(d, i, r) {
      if (!e(d) || typeof i != "string")
        return r === void 0 ? d : r;
      const a = s(i);
      if (a.length !== 0) {
        for (let o = 0; o < a.length; o++)
          if (d = d[a[o]], d == null) {
            if (o !== a.length - 1)
              return r;
            break;
          }
        return d === void 0 ? r : d;
      }
    },
    set(d, i, r) {
      if (!e(d) || typeof i != "string")
        return d;
      const a = d, o = s(i);
      for (let l = 0; l < o.length; l++) {
        const c = o[l];
        e(d[c]) || (d[c] = {}), l === o.length - 1 && (d[c] = r), d = d[c];
      }
      return a;
    },
    delete(d, i) {
      if (!e(d) || typeof i != "string")
        return !1;
      const r = s(i);
      for (let a = 0; a < r.length; a++) {
        const o = r[a];
        if (a === r.length - 1)
          return delete d[o], !0;
        if (d = d[o], !e(d))
          return !1;
      }
    },
    has(d, i) {
      if (!e(d) || typeof i != "string")
        return !1;
      const r = s(i);
      if (r.length === 0)
        return !1;
      for (let a = 0; a < r.length; a++)
        if (e(d)) {
          if (!(r[a] in d))
            return !1;
          d = d[r[a]];
        } else
          return !1;
      return !0;
    }
  }, _s;
}
var Ct = { exports: {} }, Dt = { exports: {} }, At = { exports: {} }, Lt = { exports: {} }, Jo;
function id() {
  if (Jo) return Lt.exports;
  Jo = 1;
  const e = ct;
  return Lt.exports = (t) => new Promise((f) => {
    e.access(t, (s) => {
      f(!s);
    });
  }), Lt.exports.sync = (t) => {
    try {
      return e.accessSync(t), !0;
    } catch {
      return !1;
    }
  }, Lt.exports;
}
var kt = { exports: {} }, qt = { exports: {} }, Zo;
function od() {
  if (Zo) return qt.exports;
  Zo = 1;
  const e = (t, ...f) => new Promise((s) => {
    s(t(...f));
  });
  return qt.exports = e, qt.exports.default = e, qt.exports;
}
var Xo;
function ad() {
  if (Xo) return kt.exports;
  Xo = 1;
  const e = od(), t = (f) => {
    if (!((Number.isInteger(f) || f === 1 / 0) && f > 0))
      return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
    const s = [];
    let d = 0;
    const i = () => {
      d--, s.length > 0 && s.shift()();
    }, r = (l, c, ...g) => {
      d++;
      const E = e(l, ...g);
      c(E), E.then(i, i);
    }, a = (l, c, ...g) => {
      d < f ? r(l, c, ...g) : s.push(r.bind(null, l, c, ...g));
    }, o = (l, ...c) => new Promise((g) => a(l, g, ...c));
    return Object.defineProperties(o, {
      activeCount: {
        get: () => d
      },
      pendingCount: {
        get: () => s.length
      },
      clearQueue: {
        value: () => {
          s.length = 0;
        }
      }
    }), o;
  };
  return kt.exports = t, kt.exports.default = t, kt.exports;
}
var gs, Yo;
function cd() {
  if (Yo) return gs;
  Yo = 1;
  const e = ad();
  class t extends Error {
    constructor(i) {
      super(), this.value = i;
    }
  }
  const f = (d, i) => Promise.resolve(d).then(i), s = (d) => Promise.all(d).then((i) => i[1] === !0 && Promise.reject(new t(i[0])));
  return gs = (d, i, r) => {
    r = Object.assign({
      concurrency: 1 / 0,
      preserveOrder: !0
    }, r);
    const a = e(r.concurrency), o = [...d].map((c) => [c, a(f, c, i)]), l = e(r.preserveOrder ? 1 : 1 / 0);
    return Promise.all(o.map((c) => l(s, c))).then(() => {
    }).catch((c) => c instanceof t ? c.value : Promise.reject(c));
  }, gs;
}
var Qo;
function ud() {
  if (Qo) return At.exports;
  Qo = 1;
  const e = me, t = id(), f = cd();
  return At.exports = (s, d) => (d = Object.assign({
    cwd: process.cwd()
  }, d), f(s, (i) => t(e.resolve(d.cwd, i)), d)), At.exports.sync = (s, d) => {
    d = Object.assign({
      cwd: process.cwd()
    }, d);
    for (const i of s)
      if (t.sync(e.resolve(d.cwd, i)))
        return i;
  }, At.exports;
}
var ea;
function ld() {
  if (ea) return Dt.exports;
  ea = 1;
  const e = me, t = ud();
  return Dt.exports = (f, s = {}) => {
    const d = e.resolve(s.cwd || ""), { root: i } = e.parse(d), r = [].concat(f);
    return new Promise((a) => {
      (function o(l) {
        t(r, { cwd: l }).then((c) => {
          c ? a(e.join(l, c)) : l === i ? a(null) : o(e.dirname(l));
        });
      })(d);
    });
  }, Dt.exports.sync = (f, s = {}) => {
    let d = e.resolve(s.cwd || "");
    const { root: i } = e.parse(d), r = [].concat(f);
    for (; ; ) {
      const a = t.sync(r, { cwd: d });
      if (a)
        return e.join(d, a);
      if (d === i)
        return null;
      d = e.dirname(d);
    }
  }, Dt.exports;
}
var ta;
function fd() {
  if (ta) return Ct.exports;
  ta = 1;
  const e = ld();
  return Ct.exports = async ({ cwd: t } = {}) => e("package.json", { cwd: t }), Ct.exports.sync = ({ cwd: t } = {}) => e.sync("package.json", { cwd: t }), Ct.exports;
}
var jt = { exports: {} }, ra;
function dd() {
  if (ra) return jt.exports;
  ra = 1;
  const e = me, t = Df, f = t.homedir(), s = t.tmpdir(), { env: d } = process, i = (l) => {
    const c = e.join(f, "Library");
    return {
      data: e.join(c, "Application Support", l),
      config: e.join(c, "Preferences", l),
      cache: e.join(c, "Caches", l),
      log: e.join(c, "Logs", l),
      temp: e.join(s, l)
    };
  }, r = (l) => {
    const c = d.APPDATA || e.join(f, "AppData", "Roaming"), g = d.LOCALAPPDATA || e.join(f, "AppData", "Local");
    return {
      // Data/config/cache/log are invented by me as Windows isn't opinionated about this
      data: e.join(g, l, "Data"),
      config: e.join(c, l, "Config"),
      cache: e.join(g, l, "Cache"),
      log: e.join(g, l, "Log"),
      temp: e.join(s, l)
    };
  }, a = (l) => {
    const c = e.basename(f);
    return {
      data: e.join(d.XDG_DATA_HOME || e.join(f, ".local", "share"), l),
      config: e.join(d.XDG_CONFIG_HOME || e.join(f, ".config"), l),
      cache: e.join(d.XDG_CACHE_HOME || e.join(f, ".cache"), l),
      // https://wiki.debian.org/XDGBaseDirectorySpecification#state
      log: e.join(d.XDG_STATE_HOME || e.join(f, ".local", "state"), l),
      temp: e.join(s, c, l)
    };
  }, o = (l, c) => {
    if (typeof l != "string")
      throw new TypeError(`Expected string, got ${typeof l}`);
    return c = Object.assign({ suffix: "nodejs" }, c), c.suffix && (l += `-${c.suffix}`), process.platform === "darwin" ? i(l) : process.platform === "win32" ? r(l) : a(l);
  };
  return jt.exports = o, jt.exports.default = o, jt.exports;
}
var Ne = {}, fe = {}, na;
function St() {
  if (na) return fe;
  na = 1, Object.defineProperty(fe, "__esModule", { value: !0 }), fe.NOOP = fe.LIMIT_FILES_DESCRIPTORS = fe.LIMIT_BASENAME_LENGTH = fe.IS_USER_ROOT = fe.IS_POSIX = fe.DEFAULT_TIMEOUT_SYNC = fe.DEFAULT_TIMEOUT_ASYNC = fe.DEFAULT_WRITE_OPTIONS = fe.DEFAULT_READ_OPTIONS = fe.DEFAULT_FOLDER_MODE = fe.DEFAULT_FILE_MODE = fe.DEFAULT_ENCODING = void 0;
  const e = "utf8";
  fe.DEFAULT_ENCODING = e;
  const t = 438;
  fe.DEFAULT_FILE_MODE = t;
  const f = 511;
  fe.DEFAULT_FOLDER_MODE = f;
  const s = {};
  fe.DEFAULT_READ_OPTIONS = s;
  const d = {};
  fe.DEFAULT_WRITE_OPTIONS = d;
  const i = 5e3;
  fe.DEFAULT_TIMEOUT_ASYNC = i;
  const r = 100;
  fe.DEFAULT_TIMEOUT_SYNC = r;
  const a = !!process.getuid;
  fe.IS_POSIX = a;
  const o = process.getuid ? !process.getuid() : !1;
  fe.IS_USER_ROOT = o;
  const l = 128;
  fe.LIMIT_BASENAME_LENGTH = l;
  const c = 1e4;
  fe.LIMIT_FILES_DESCRIPTORS = c;
  const g = () => {
  };
  return fe.NOOP = g, fe;
}
var Ft = {}, We = {}, sa;
function hd() {
  if (sa) return We;
  sa = 1, Object.defineProperty(We, "__esModule", { value: !0 }), We.attemptifySync = We.attemptifyAsync = void 0;
  const e = St(), t = (s, d = e.NOOP) => function() {
    return s.apply(void 0, arguments).catch(d);
  };
  We.attemptifyAsync = t;
  const f = (s, d = e.NOOP) => function() {
    try {
      return s.apply(void 0, arguments);
    } catch (i) {
      return d(i);
    }
  };
  return We.attemptifySync = f, We;
}
var Mt = {}, ia;
function md() {
  if (ia) return Mt;
  ia = 1, Object.defineProperty(Mt, "__esModule", { value: !0 });
  const e = St(), t = {
    isChangeErrorOk: (f) => {
      const { code: s } = f;
      return s === "ENOSYS" || !e.IS_USER_ROOT && (s === "EINVAL" || s === "EPERM");
    },
    isRetriableError: (f) => {
      const { code: s } = f;
      return s === "EMFILE" || s === "ENFILE" || s === "EAGAIN" || s === "EBUSY" || s === "EACCESS" || s === "EACCS" || s === "EPERM";
    },
    onChangeError: (f) => {
      if (!t.isChangeErrorOk(f))
        throw f;
    }
  };
  return Mt.default = t, Mt;
}
var Je = {}, Ut = {}, oa;
function pd() {
  if (oa) return Ut;
  oa = 1, Object.defineProperty(Ut, "__esModule", { value: !0 });
  const t = {
    interval: 25,
    intervalId: void 0,
    limit: St().LIMIT_FILES_DESCRIPTORS,
    queueActive: /* @__PURE__ */ new Set(),
    queueWaiting: /* @__PURE__ */ new Set(),
    init: () => {
      t.intervalId || (t.intervalId = setInterval(t.tick, t.interval));
    },
    reset: () => {
      t.intervalId && (clearInterval(t.intervalId), delete t.intervalId);
    },
    add: (f) => {
      t.queueWaiting.add(f), t.queueActive.size < t.limit / 2 ? t.tick() : t.init();
    },
    remove: (f) => {
      t.queueWaiting.delete(f), t.queueActive.delete(f);
    },
    schedule: () => new Promise((f) => {
      const s = () => t.remove(d), d = () => f(s);
      t.add(d);
    }),
    tick: () => {
      if (!(t.queueActive.size >= t.limit)) {
        if (!t.queueWaiting.size)
          return t.reset();
        for (const f of t.queueWaiting) {
          if (t.queueActive.size >= t.limit)
            break;
          t.queueWaiting.delete(f), t.queueActive.add(f), f();
        }
      }
    }
  };
  return Ut.default = t, Ut;
}
var aa;
function yd() {
  if (aa) return Je;
  aa = 1, Object.defineProperty(Je, "__esModule", { value: !0 }), Je.retryifySync = Je.retryifyAsync = void 0;
  const e = pd(), t = (s, d) => function(i) {
    return function r() {
      return e.default.schedule().then((a) => s.apply(void 0, arguments).then((o) => (a(), o), (o) => {
        if (a(), Date.now() >= i)
          throw o;
        if (d(o)) {
          const l = Math.round(100 + 400 * Math.random());
          return new Promise((g) => setTimeout(g, l)).then(() => r.apply(void 0, arguments));
        }
        throw o;
      }));
    };
  };
  Je.retryifyAsync = t;
  const f = (s, d) => function(i) {
    return function r() {
      try {
        return s.apply(void 0, arguments);
      } catch (a) {
        if (Date.now() > i)
          throw a;
        if (d(a))
          return r.apply(void 0, arguments);
        throw a;
      }
    };
  };
  return Je.retryifySync = f, Je;
}
var ca;
function of() {
  if (ca) return Ft;
  ca = 1, Object.defineProperty(Ft, "__esModule", { value: !0 });
  const e = ct, t = xi, f = hd(), s = md(), d = yd(), i = {
    chmodAttempt: f.attemptifyAsync(t.promisify(e.chmod), s.default.onChangeError),
    chownAttempt: f.attemptifyAsync(t.promisify(e.chown), s.default.onChangeError),
    closeAttempt: f.attemptifyAsync(t.promisify(e.close)),
    fsyncAttempt: f.attemptifyAsync(t.promisify(e.fsync)),
    mkdirAttempt: f.attemptifyAsync(t.promisify(e.mkdir)),
    realpathAttempt: f.attemptifyAsync(t.promisify(e.realpath)),
    statAttempt: f.attemptifyAsync(t.promisify(e.stat)),
    unlinkAttempt: f.attemptifyAsync(t.promisify(e.unlink)),
    closeRetry: d.retryifyAsync(t.promisify(e.close), s.default.isRetriableError),
    fsyncRetry: d.retryifyAsync(t.promisify(e.fsync), s.default.isRetriableError),
    openRetry: d.retryifyAsync(t.promisify(e.open), s.default.isRetriableError),
    readFileRetry: d.retryifyAsync(t.promisify(e.readFile), s.default.isRetriableError),
    renameRetry: d.retryifyAsync(t.promisify(e.rename), s.default.isRetriableError),
    statRetry: d.retryifyAsync(t.promisify(e.stat), s.default.isRetriableError),
    writeRetry: d.retryifyAsync(t.promisify(e.write), s.default.isRetriableError),
    chmodSyncAttempt: f.attemptifySync(e.chmodSync, s.default.onChangeError),
    chownSyncAttempt: f.attemptifySync(e.chownSync, s.default.onChangeError),
    closeSyncAttempt: f.attemptifySync(e.closeSync),
    mkdirSyncAttempt: f.attemptifySync(e.mkdirSync),
    realpathSyncAttempt: f.attemptifySync(e.realpathSync),
    statSyncAttempt: f.attemptifySync(e.statSync),
    unlinkSyncAttempt: f.attemptifySync(e.unlinkSync),
    closeSyncRetry: d.retryifySync(e.closeSync, s.default.isRetriableError),
    fsyncSyncRetry: d.retryifySync(e.fsyncSync, s.default.isRetriableError),
    openSyncRetry: d.retryifySync(e.openSync, s.default.isRetriableError),
    readFileSyncRetry: d.retryifySync(e.readFileSync, s.default.isRetriableError),
    renameSyncRetry: d.retryifySync(e.renameSync, s.default.isRetriableError),
    statSyncRetry: d.retryifySync(e.statSync, s.default.isRetriableError),
    writeSyncRetry: d.retryifySync(e.writeSync, s.default.isRetriableError)
  };
  return Ft.default = i, Ft;
}
var Vt = {}, ua;
function vd() {
  if (ua) return Vt;
  ua = 1, Object.defineProperty(Vt, "__esModule", { value: !0 });
  const e = {
    isFunction: (t) => typeof t == "function",
    isString: (t) => typeof t == "string",
    isUndefined: (t) => typeof t > "u"
  };
  return Vt.default = e, Vt;
}
var zt = {}, la;
function _d() {
  if (la) return zt;
  la = 1, Object.defineProperty(zt, "__esModule", { value: !0 });
  const e = {}, t = {
    next: (f) => {
      const s = e[f];
      if (!s)
        return;
      s.shift();
      const d = s[0];
      d ? d(() => t.next(f)) : delete e[f];
    },
    schedule: (f) => new Promise((s) => {
      let d = e[f];
      d || (d = e[f] = []), d.push(s), !(d.length > 1) && s(() => t.next(f));
    })
  };
  return zt.default = t, zt;
}
var Gt = {}, fa;
function gd() {
  if (fa) return Gt;
  fa = 1, Object.defineProperty(Gt, "__esModule", { value: !0 });
  const e = me, t = St(), f = of(), s = {
    store: {},
    create: (d) => {
      const i = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), r = Date.now().toString().slice(-10), a = "tmp-", o = `.${a}${r}${i}`;
      return `${d}${o}`;
    },
    get: (d, i, r = !0) => {
      const a = s.truncate(i(d));
      return a in s.store ? s.get(d, i, r) : (s.store[a] = r, [a, () => delete s.store[a]]);
    },
    purge: (d) => {
      s.store[d] && (delete s.store[d], f.default.unlinkAttempt(d));
    },
    purgeSync: (d) => {
      s.store[d] && (delete s.store[d], f.default.unlinkSyncAttempt(d));
    },
    purgeSyncAll: () => {
      for (const d in s.store)
        s.purgeSync(d);
    },
    truncate: (d) => {
      const i = e.basename(d);
      if (i.length <= t.LIMIT_BASENAME_LENGTH)
        return d;
      const r = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(i);
      if (!r)
        return d;
      const a = i.length - t.LIMIT_BASENAME_LENGTH;
      return `${d.slice(0, -i.length)}${r[1]}${r[2].slice(0, -a)}${r[3]}`;
    }
  };
  return process.on("exit", s.purgeSyncAll), Gt.default = s, Gt;
}
var da;
function $d() {
  if (da) return Ne;
  da = 1, Object.defineProperty(Ne, "__esModule", { value: !0 }), Ne.writeFileSync = Ne.writeFile = Ne.readFileSync = Ne.readFile = void 0;
  const e = me, t = St(), f = of(), s = vd(), d = _d(), i = gd();
  function r(g, E = t.DEFAULT_READ_OPTIONS) {
    var _;
    if (s.default.isString(E))
      return r(g, { encoding: E });
    const w = Date.now() + ((_ = E.timeout) !== null && _ !== void 0 ? _ : t.DEFAULT_TIMEOUT_ASYNC);
    return f.default.readFileRetry(w)(g, E);
  }
  Ne.readFile = r;
  function a(g, E = t.DEFAULT_READ_OPTIONS) {
    var _;
    if (s.default.isString(E))
      return a(g, { encoding: E });
    const w = Date.now() + ((_ = E.timeout) !== null && _ !== void 0 ? _ : t.DEFAULT_TIMEOUT_SYNC);
    return f.default.readFileSyncRetry(w)(g, E);
  }
  Ne.readFileSync = a;
  const o = (g, E, _, w) => {
    if (s.default.isFunction(_))
      return o(g, E, t.DEFAULT_WRITE_OPTIONS, _);
    const R = l(g, E, _);
    return w && R.then(w, w), R;
  };
  Ne.writeFile = o;
  const l = async (g, E, _ = t.DEFAULT_WRITE_OPTIONS) => {
    var w;
    if (s.default.isString(_))
      return l(g, E, { encoding: _ });
    const R = Date.now() + ((w = _.timeout) !== null && w !== void 0 ? w : t.DEFAULT_TIMEOUT_ASYNC);
    let u = null, h = null, n = null, m = null, v = null;
    try {
      _.schedule && (u = await _.schedule(g)), h = await d.default.schedule(g), g = await f.default.realpathAttempt(g) || g, [m, n] = i.default.get(g, _.tmpCreate || i.default.create, _.tmpPurge !== !1);
      const p = t.IS_POSIX && s.default.isUndefined(_.chown), y = s.default.isUndefined(_.mode);
      if (p || y) {
        const b = await f.default.statAttempt(g);
        b && (_ = { ..._ }, p && (_.chown = { uid: b.uid, gid: b.gid }), y && (_.mode = b.mode));
      }
      const $ = e.dirname(g);
      await f.default.mkdirAttempt($, {
        mode: t.DEFAULT_FOLDER_MODE,
        recursive: !0
      }), v = await f.default.openRetry(R)(m, "w", _.mode || t.DEFAULT_FILE_MODE), _.tmpCreated && _.tmpCreated(m), s.default.isString(E) ? await f.default.writeRetry(R)(v, E, 0, _.encoding || t.DEFAULT_ENCODING) : s.default.isUndefined(E) || await f.default.writeRetry(R)(v, E, 0, E.length, 0), _.fsync !== !1 && (_.fsyncWait !== !1 ? await f.default.fsyncRetry(R)(v) : f.default.fsyncAttempt(v)), await f.default.closeRetry(R)(v), v = null, _.chown && await f.default.chownAttempt(m, _.chown.uid, _.chown.gid), _.mode && await f.default.chmodAttempt(m, _.mode);
      try {
        await f.default.renameRetry(R)(m, g);
      } catch (b) {
        if (b.code !== "ENAMETOOLONG")
          throw b;
        await f.default.renameRetry(R)(m, i.default.truncate(g));
      }
      n(), m = null;
    } finally {
      v && await f.default.closeAttempt(v), m && i.default.purge(m), u && u(), h && h();
    }
  }, c = (g, E, _ = t.DEFAULT_WRITE_OPTIONS) => {
    var w;
    if (s.default.isString(_))
      return c(g, E, { encoding: _ });
    const R = Date.now() + ((w = _.timeout) !== null && w !== void 0 ? w : t.DEFAULT_TIMEOUT_SYNC);
    let u = null, h = null, n = null;
    try {
      g = f.default.realpathSyncAttempt(g) || g, [h, u] = i.default.get(g, _.tmpCreate || i.default.create, _.tmpPurge !== !1);
      const m = t.IS_POSIX && s.default.isUndefined(_.chown), v = s.default.isUndefined(_.mode);
      if (m || v) {
        const y = f.default.statSyncAttempt(g);
        y && (_ = { ..._ }, m && (_.chown = { uid: y.uid, gid: y.gid }), v && (_.mode = y.mode));
      }
      const p = e.dirname(g);
      f.default.mkdirSyncAttempt(p, {
        mode: t.DEFAULT_FOLDER_MODE,
        recursive: !0
      }), n = f.default.openSyncRetry(R)(h, "w", _.mode || t.DEFAULT_FILE_MODE), _.tmpCreated && _.tmpCreated(h), s.default.isString(E) ? f.default.writeSyncRetry(R)(n, E, 0, _.encoding || t.DEFAULT_ENCODING) : s.default.isUndefined(E) || f.default.writeSyncRetry(R)(n, E, 0, E.length, 0), _.fsync !== !1 && (_.fsyncWait !== !1 ? f.default.fsyncSyncRetry(R)(n) : f.default.fsyncAttempt(n)), f.default.closeSyncRetry(R)(n), n = null, _.chown && f.default.chownSyncAttempt(h, _.chown.uid, _.chown.gid), _.mode && f.default.chmodSyncAttempt(h, _.mode);
      try {
        f.default.renameSyncRetry(R)(h, g);
      } catch (y) {
        if (y.code !== "ENAMETOOLONG")
          throw y;
        f.default.renameSyncRetry(R)(h, i.default.truncate(g));
      }
      u(), h = null;
    } finally {
      n && f.default.closeSyncAttempt(n), h && i.default.purge(h);
    }
  };
  return Ne.writeFileSync = c, Ne;
}
var Kt = { exports: {} }, $s = {}, ke = {}, Ze = {}, Es = {}, ws = {}, Ss = {}, ha;
function _n() {
  return ha || (ha = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
    class t {
    }
    e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
    class f extends t {
      constructor(n) {
        if (super(), !e.IDENTIFIER.test(n))
          throw new Error("CodeGen: name must be a valid identifier");
        this.str = n;
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
    e.Name = f;
    class s extends t {
      constructor(n) {
        super(), this._items = typeof n == "string" ? [n] : n;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        if (this._items.length > 1)
          return !1;
        const n = this._items[0];
        return n === "" || n === '""';
      }
      get str() {
        var n;
        return (n = this._str) !== null && n !== void 0 ? n : this._str = this._items.reduce((m, v) => `${m}${v}`, "");
      }
      get names() {
        var n;
        return (n = this._names) !== null && n !== void 0 ? n : this._names = this._items.reduce((m, v) => (v instanceof f && (m[v.str] = (m[v.str] || 0) + 1), m), {});
      }
    }
    e._Code = s, e.nil = new s("");
    function d(h, ...n) {
      const m = [h[0]];
      let v = 0;
      for (; v < n.length; )
        a(m, n[v]), m.push(h[++v]);
      return new s(m);
    }
    e._ = d;
    const i = new s("+");
    function r(h, ...n) {
      const m = [_(h[0])];
      let v = 0;
      for (; v < n.length; )
        m.push(i), a(m, n[v]), m.push(i, _(h[++v]));
      return o(m), new s(m);
    }
    e.str = r;
    function a(h, n) {
      n instanceof s ? h.push(...n._items) : n instanceof f ? h.push(n) : h.push(g(n));
    }
    e.addCodeArg = a;
    function o(h) {
      let n = 1;
      for (; n < h.length - 1; ) {
        if (h[n] === i) {
          const m = l(h[n - 1], h[n + 1]);
          if (m !== void 0) {
            h.splice(n - 1, 3, m);
            continue;
          }
          h[n++] = "+";
        }
        n++;
      }
    }
    function l(h, n) {
      if (n === '""')
        return h;
      if (h === '""')
        return n;
      if (typeof h == "string")
        return n instanceof f || h[h.length - 1] !== '"' ? void 0 : typeof n != "string" ? `${h.slice(0, -1)}${n}"` : n[0] === '"' ? h.slice(0, -1) + n.slice(1) : void 0;
      if (typeof n == "string" && n[0] === '"' && !(h instanceof f))
        return `"${h}${n.slice(1)}`;
    }
    function c(h, n) {
      return n.emptyStr() ? h : h.emptyStr() ? n : r`${h}${n}`;
    }
    e.strConcat = c;
    function g(h) {
      return typeof h == "number" || typeof h == "boolean" || h === null ? h : _(Array.isArray(h) ? h.join(",") : h);
    }
    function E(h) {
      return new s(_(h));
    }
    e.stringify = E;
    function _(h) {
      return JSON.stringify(h).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
    }
    e.safeStringify = _;
    function w(h) {
      return typeof h == "string" && e.IDENTIFIER.test(h) ? new s(`.${h}`) : d`[${h}]`;
    }
    e.getProperty = w;
    function R(h) {
      if (typeof h == "string" && e.IDENTIFIER.test(h))
        return new s(`${h}`);
      throw new Error(`CodeGen: invalid export name: ${h}, use explicit $id name mapping`);
    }
    e.getEsmExportName = R;
    function u(h) {
      return new s(h.toString());
    }
    e.regexpCode = u;
  }(Ss)), Ss;
}
var Rs = {}, ma;
function pa() {
  return ma || (ma = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
    const t = _n();
    class f extends Error {
      constructor(l) {
        super(`CodeGen: "code" for ${l} not defined`), this.value = l.value;
      }
    }
    var s;
    (function(o) {
      o[o.Started = 0] = "Started", o[o.Completed = 1] = "Completed";
    })(s || (e.UsedValueState = s = {})), e.varKinds = {
      const: new t.Name("const"),
      let: new t.Name("let"),
      var: new t.Name("var")
    };
    class d {
      constructor({ prefixes: l, parent: c } = {}) {
        this._names = {}, this._prefixes = l, this._parent = c;
      }
      toName(l) {
        return l instanceof t.Name ? l : this.name(l);
      }
      name(l) {
        return new t.Name(this._newName(l));
      }
      _newName(l) {
        const c = this._names[l] || this._nameGroup(l);
        return `${l}${c.index++}`;
      }
      _nameGroup(l) {
        var c, g;
        if (!((g = (c = this._parent) === null || c === void 0 ? void 0 : c._prefixes) === null || g === void 0) && g.has(l) || this._prefixes && !this._prefixes.has(l))
          throw new Error(`CodeGen: prefix "${l}" is not allowed in this scope`);
        return this._names[l] = { prefix: l, index: 0 };
      }
    }
    e.Scope = d;
    class i extends t.Name {
      constructor(l, c) {
        super(c), this.prefix = l;
      }
      setValue(l, { property: c, itemIndex: g }) {
        this.value = l, this.scopePath = (0, t._)`.${new t.Name(c)}[${g}]`;
      }
    }
    e.ValueScopeName = i;
    const r = (0, t._)`\n`;
    class a extends d {
      constructor(l) {
        super(l), this._values = {}, this._scope = l.scope, this.opts = { ...l, _n: l.lines ? r : t.nil };
      }
      get() {
        return this._scope;
      }
      name(l) {
        return new i(l, this._newName(l));
      }
      value(l, c) {
        var g;
        if (c.ref === void 0)
          throw new Error("CodeGen: ref must be passed in value");
        const E = this.toName(l), { prefix: _ } = E, w = (g = c.key) !== null && g !== void 0 ? g : c.ref;
        let R = this._values[_];
        if (R) {
          const n = R.get(w);
          if (n)
            return n;
        } else
          R = this._values[_] = /* @__PURE__ */ new Map();
        R.set(w, E);
        const u = this._scope[_] || (this._scope[_] = []), h = u.length;
        return u[h] = c.ref, E.setValue(c, { property: _, itemIndex: h }), E;
      }
      getValue(l, c) {
        const g = this._values[l];
        if (g)
          return g.get(c);
      }
      scopeRefs(l, c = this._values) {
        return this._reduceValues(c, (g) => {
          if (g.scopePath === void 0)
            throw new Error(`CodeGen: name "${g}" has no value`);
          return (0, t._)`${l}${g.scopePath}`;
        });
      }
      scopeCode(l = this._values, c, g) {
        return this._reduceValues(l, (E) => {
          if (E.value === void 0)
            throw new Error(`CodeGen: name "${E}" has no value`);
          return E.value.code;
        }, c, g);
      }
      _reduceValues(l, c, g = {}, E) {
        let _ = t.nil;
        for (const w in l) {
          const R = l[w];
          if (!R)
            continue;
          const u = g[w] = g[w] || /* @__PURE__ */ new Map();
          R.forEach((h) => {
            if (u.has(h))
              return;
            u.set(h, s.Started);
            let n = c(h);
            if (n) {
              const m = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
              _ = (0, t._)`${_}${m} ${h} = ${n};${this.opts._n}`;
            } else if (n = E?.(h))
              _ = (0, t._)`${_}${n}${this.opts._n}`;
            else
              throw new f(h);
            u.set(h, s.Completed);
          });
        }
        return _;
      }
    }
    e.ValueScope = a;
  }(Rs)), Rs;
}
var ya;
function re() {
  return ya || (ya = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
    const t = _n(), f = pa();
    var s = _n();
    Object.defineProperty(e, "_", { enumerable: !0, get: function() {
      return s._;
    } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
      return s.str;
    } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
      return s.strConcat;
    } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
      return s.nil;
    } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
      return s.getProperty;
    } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
      return s.stringify;
    } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
      return s.regexpCode;
    } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
      return s.Name;
    } });
    var d = pa();
    Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
      return d.Scope;
    } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
      return d.ValueScope;
    } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
      return d.ValueScopeName;
    } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
      return d.varKinds;
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
    class i {
      optimizeNodes() {
        return this;
      }
      optimizeNames(S, P) {
        return this;
      }
    }
    class r extends i {
      constructor(S, P, A) {
        super(), this.varKind = S, this.name = P, this.rhs = A;
      }
      render({ es5: S, _n: P }) {
        const A = S ? f.varKinds.var : this.varKind, K = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
        return `${A} ${this.name}${K};` + P;
      }
      optimizeNames(S, P) {
        if (S[this.name.str])
          return this.rhs && (this.rhs = U(this.rhs, S, P)), this;
      }
      get names() {
        return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
      }
    }
    class a extends i {
      constructor(S, P, A) {
        super(), this.lhs = S, this.rhs = P, this.sideEffects = A;
      }
      render({ _n: S }) {
        return `${this.lhs} = ${this.rhs};` + S;
      }
      optimizeNames(S, P) {
        if (!(this.lhs instanceof t.Name && !S[this.lhs.str] && !this.sideEffects))
          return this.rhs = U(this.rhs, S, P), this;
      }
      get names() {
        const S = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
        return M(S, this.rhs);
      }
    }
    class o extends a {
      constructor(S, P, A, K) {
        super(S, A, K), this.op = P;
      }
      render({ _n: S }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + S;
      }
    }
    class l extends i {
      constructor(S) {
        super(), this.label = S, this.names = {};
      }
      render({ _n: S }) {
        return `${this.label}:` + S;
      }
    }
    class c extends i {
      constructor(S) {
        super(), this.label = S, this.names = {};
      }
      render({ _n: S }) {
        return `break${this.label ? ` ${this.label}` : ""};` + S;
      }
    }
    class g extends i {
      constructor(S) {
        super(), this.error = S;
      }
      render({ _n: S }) {
        return `throw ${this.error};` + S;
      }
      get names() {
        return this.error.names;
      }
    }
    class E extends i {
      constructor(S) {
        super(), this.code = S;
      }
      render({ _n: S }) {
        return `${this.code};` + S;
      }
      optimizeNodes() {
        return `${this.code}` ? this : void 0;
      }
      optimizeNames(S, P) {
        return this.code = U(this.code, S, P), this;
      }
      get names() {
        return this.code instanceof t._CodeOrName ? this.code.names : {};
      }
    }
    class _ extends i {
      constructor(S = []) {
        super(), this.nodes = S;
      }
      render(S) {
        return this.nodes.reduce((P, A) => P + A.render(S), "");
      }
      optimizeNodes() {
        const { nodes: S } = this;
        let P = S.length;
        for (; P--; ) {
          const A = S[P].optimizeNodes();
          Array.isArray(A) ? S.splice(P, 1, ...A) : A ? S[P] = A : S.splice(P, 1);
        }
        return S.length > 0 ? this : void 0;
      }
      optimizeNames(S, P) {
        const { nodes: A } = this;
        let K = A.length;
        for (; K--; ) {
          const B = A[K];
          B.optimizeNames(S, P) || (z(S, B.names), A.splice(K, 1));
        }
        return A.length > 0 ? this : void 0;
      }
      get names() {
        return this.nodes.reduce((S, P) => H(S, P.names), {});
      }
    }
    class w extends _ {
      render(S) {
        return "{" + S._n + super.render(S) + "}" + S._n;
      }
    }
    class R extends _ {
    }
    class u extends w {
    }
    u.kind = "else";
    class h extends w {
      constructor(S, P) {
        super(P), this.condition = S;
      }
      render(S) {
        let P = `if(${this.condition})` + super.render(S);
        return this.else && (P += "else " + this.else.render(S)), P;
      }
      optimizeNodes() {
        super.optimizeNodes();
        const S = this.condition;
        if (S === !0)
          return this.nodes;
        let P = this.else;
        if (P) {
          const A = P.optimizeNodes();
          P = this.else = Array.isArray(A) ? new u(A) : A;
        }
        if (P)
          return S === !1 ? P instanceof h ? P : P.nodes : this.nodes.length ? this : new h(J(S), P instanceof h ? [P] : P.nodes);
        if (!(S === !1 || !this.nodes.length))
          return this;
      }
      optimizeNames(S, P) {
        var A;
        if (this.else = (A = this.else) === null || A === void 0 ? void 0 : A.optimizeNames(S, P), !!(super.optimizeNames(S, P) || this.else))
          return this.condition = U(this.condition, S, P), this;
      }
      get names() {
        const S = super.names;
        return M(S, this.condition), this.else && H(S, this.else.names), S;
      }
    }
    h.kind = "if";
    class n extends w {
    }
    n.kind = "for";
    class m extends n {
      constructor(S) {
        super(), this.iteration = S;
      }
      render(S) {
        return `for(${this.iteration})` + super.render(S);
      }
      optimizeNames(S, P) {
        if (super.optimizeNames(S, P))
          return this.iteration = U(this.iteration, S, P), this;
      }
      get names() {
        return H(super.names, this.iteration.names);
      }
    }
    class v extends n {
      constructor(S, P, A, K) {
        super(), this.varKind = S, this.name = P, this.from = A, this.to = K;
      }
      render(S) {
        const P = S.es5 ? f.varKinds.var : this.varKind, { name: A, from: K, to: B } = this;
        return `for(${P} ${A}=${K}; ${A}<${B}; ${A}++)` + super.render(S);
      }
      get names() {
        const S = M(super.names, this.from);
        return M(S, this.to);
      }
    }
    class p extends n {
      constructor(S, P, A, K) {
        super(), this.loop = S, this.varKind = P, this.name = A, this.iterable = K;
      }
      render(S) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(S);
      }
      optimizeNames(S, P) {
        if (super.optimizeNames(S, P))
          return this.iterable = U(this.iterable, S, P), this;
      }
      get names() {
        return H(super.names, this.iterable.names);
      }
    }
    class y extends w {
      constructor(S, P, A) {
        super(), this.name = S, this.args = P, this.async = A;
      }
      render(S) {
        return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(S);
      }
    }
    y.kind = "func";
    class $ extends _ {
      render(S) {
        return "return " + super.render(S);
      }
    }
    $.kind = "return";
    class b extends w {
      render(S) {
        let P = "try" + super.render(S);
        return this.catch && (P += this.catch.render(S)), this.finally && (P += this.finally.render(S)), P;
      }
      optimizeNodes() {
        var S, P;
        return super.optimizeNodes(), (S = this.catch) === null || S === void 0 || S.optimizeNodes(), (P = this.finally) === null || P === void 0 || P.optimizeNodes(), this;
      }
      optimizeNames(S, P) {
        var A, K;
        return super.optimizeNames(S, P), (A = this.catch) === null || A === void 0 || A.optimizeNames(S, P), (K = this.finally) === null || K === void 0 || K.optimizeNames(S, P), this;
      }
      get names() {
        const S = super.names;
        return this.catch && H(S, this.catch.names), this.finally && H(S, this.finally.names), S;
      }
    }
    class N extends w {
      constructor(S) {
        super(), this.error = S;
      }
      render(S) {
        return `catch(${this.error})` + super.render(S);
      }
    }
    N.kind = "catch";
    class L extends w {
      render(S) {
        return "finally" + super.render(S);
      }
    }
    L.kind = "finally";
    class F {
      constructor(S, P = {}) {
        this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...P, _n: P.lines ? `
` : "" }, this._extScope = S, this._scope = new f.Scope({ parent: S }), this._nodes = [new R()];
      }
      toString() {
        return this._root.render(this.opts);
      }
      // returns unique name in the internal scope
      name(S) {
        return this._scope.name(S);
      }
      // reserves unique name in the external scope
      scopeName(S) {
        return this._extScope.name(S);
      }
      // reserves unique name in the external scope and assigns value to it
      scopeValue(S, P) {
        const A = this._extScope.value(S, P);
        return (this._values[A.prefix] || (this._values[A.prefix] = /* @__PURE__ */ new Set())).add(A), A;
      }
      getScopeValue(S, P) {
        return this._extScope.getValue(S, P);
      }
      // return code that assigns values in the external scope to the names that are used internally
      // (same names that were returned by gen.scopeName or gen.scopeValue)
      scopeRefs(S) {
        return this._extScope.scopeRefs(S, this._values);
      }
      scopeCode() {
        return this._extScope.scopeCode(this._values);
      }
      _def(S, P, A, K) {
        const B = this._scope.toName(P);
        return A !== void 0 && K && (this._constants[B.str] = A), this._leafNode(new r(S, B, A)), B;
      }
      // `const` declaration (`var` in es5 mode)
      const(S, P, A) {
        return this._def(f.varKinds.const, S, P, A);
      }
      // `let` declaration with optional assignment (`var` in es5 mode)
      let(S, P, A) {
        return this._def(f.varKinds.let, S, P, A);
      }
      // `var` declaration with optional assignment
      var(S, P, A) {
        return this._def(f.varKinds.var, S, P, A);
      }
      // assignment code
      assign(S, P, A) {
        return this._leafNode(new a(S, P, A));
      }
      // `+=` code
      add(S, P) {
        return this._leafNode(new o(S, e.operators.ADD, P));
      }
      // appends passed SafeExpr to code or executes Block
      code(S) {
        return typeof S == "function" ? S() : S !== t.nil && this._leafNode(new E(S)), this;
      }
      // returns code for object literal for the passed argument list of key-value pairs
      object(...S) {
        const P = ["{"];
        for (const [A, K] of S)
          P.length > 1 && P.push(","), P.push(A), (A !== K || this.opts.es5) && (P.push(":"), (0, t.addCodeArg)(P, K));
        return P.push("}"), new t._Code(P);
      }
      // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
      if(S, P, A) {
        if (this._blockNode(new h(S)), P && A)
          this.code(P).else().code(A).endIf();
        else if (P)
          this.code(P).endIf();
        else if (A)
          throw new Error('CodeGen: "else" body without "then" body');
        return this;
      }
      // `else if` clause - invalid without `if` or after `else` clauses
      elseIf(S) {
        return this._elseNode(new h(S));
      }
      // `else` clause - only valid after `if` or `else if` clauses
      else() {
        return this._elseNode(new u());
      }
      // end `if` statement (needed if gen.if was used only with condition)
      endIf() {
        return this._endBlockNode(h, u);
      }
      _for(S, P) {
        return this._blockNode(S), P && this.code(P).endFor(), this;
      }
      // a generic `for` clause (or statement if `forBody` is passed)
      for(S, P) {
        return this._for(new m(S), P);
      }
      // `for` statement for a range of values
      forRange(S, P, A, K, B = this.opts.es5 ? f.varKinds.var : f.varKinds.let) {
        const X = this._scope.toName(S);
        return this._for(new v(B, X, P, A), () => K(X));
      }
      // `for-of` statement (in es5 mode replace with a normal for loop)
      forOf(S, P, A, K = f.varKinds.const) {
        const B = this._scope.toName(S);
        if (this.opts.es5) {
          const X = P instanceof t.Name ? P : this.var("_arr", P);
          return this.forRange("_i", 0, (0, t._)`${X}.length`, (Z) => {
            this.var(B, (0, t._)`${X}[${Z}]`), A(B);
          });
        }
        return this._for(new p("of", K, B, P), () => A(B));
      }
      // `for-in` statement.
      // With option `ownProperties` replaced with a `for-of` loop for object keys
      forIn(S, P, A, K = this.opts.es5 ? f.varKinds.var : f.varKinds.const) {
        if (this.opts.ownProperties)
          return this.forOf(S, (0, t._)`Object.keys(${P})`, A);
        const B = this._scope.toName(S);
        return this._for(new p("in", K, B, P), () => A(B));
      }
      // end `for` loop
      endFor() {
        return this._endBlockNode(n);
      }
      // `label` statement
      label(S) {
        return this._leafNode(new l(S));
      }
      // `break` statement
      break(S) {
        return this._leafNode(new c(S));
      }
      // `return` statement
      return(S) {
        const P = new $();
        if (this._blockNode(P), this.code(S), P.nodes.length !== 1)
          throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode($);
      }
      // `try` statement
      try(S, P, A) {
        if (!P && !A)
          throw new Error('CodeGen: "try" without "catch" and "finally"');
        const K = new b();
        if (this._blockNode(K), this.code(S), P) {
          const B = this.name("e");
          this._currNode = K.catch = new N(B), P(B);
        }
        return A && (this._currNode = K.finally = new L(), this.code(A)), this._endBlockNode(N, L);
      }
      // `throw` statement
      throw(S) {
        return this._leafNode(new g(S));
      }
      // start self-balancing block
      block(S, P) {
        return this._blockStarts.push(this._nodes.length), S && this.code(S).endBlock(P), this;
      }
      // end the current self-balancing block
      endBlock(S) {
        const P = this._blockStarts.pop();
        if (P === void 0)
          throw new Error("CodeGen: not in self-balancing block");
        const A = this._nodes.length - P;
        if (A < 0 || S !== void 0 && A !== S)
          throw new Error(`CodeGen: wrong number of nodes: ${A} vs ${S} expected`);
        return this._nodes.length = P, this;
      }
      // `function` heading (or definition if funcBody is passed)
      func(S, P = t.nil, A, K) {
        return this._blockNode(new y(S, P, A)), K && this.code(K).endFunc(), this;
      }
      // end function definition
      endFunc() {
        return this._endBlockNode(y);
      }
      optimize(S = 1) {
        for (; S-- > 0; )
          this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
      }
      _leafNode(S) {
        return this._currNode.nodes.push(S), this;
      }
      _blockNode(S) {
        this._currNode.nodes.push(S), this._nodes.push(S);
      }
      _endBlockNode(S, P) {
        const A = this._currNode;
        if (A instanceof S || P && A instanceof P)
          return this._nodes.pop(), this;
        throw new Error(`CodeGen: not in block "${P ? `${S.kind}/${P.kind}` : S.kind}"`);
      }
      _elseNode(S) {
        const P = this._currNode;
        if (!(P instanceof h))
          throw new Error('CodeGen: "else" without "if"');
        return this._currNode = P.else = S, this;
      }
      get _root() {
        return this._nodes[0];
      }
      get _currNode() {
        const S = this._nodes;
        return S[S.length - 1];
      }
      set _currNode(S) {
        const P = this._nodes;
        P[P.length - 1] = S;
      }
    }
    e.CodeGen = F;
    function H(T, S) {
      for (const P in S)
        T[P] = (T[P] || 0) + (S[P] || 0);
      return T;
    }
    function M(T, S) {
      return S instanceof t._CodeOrName ? H(T, S.names) : T;
    }
    function U(T, S, P) {
      if (T instanceof t.Name)
        return A(T);
      if (!K(T))
        return T;
      return new t._Code(T._items.reduce((B, X) => (X instanceof t.Name && (X = A(X)), X instanceof t._Code ? B.push(...X._items) : B.push(X), B), []));
      function A(B) {
        const X = P[B.str];
        return X === void 0 || S[B.str] !== 1 ? B : (delete S[B.str], X);
      }
      function K(B) {
        return B instanceof t._Code && B._items.some((X) => X instanceof t.Name && S[X.str] === 1 && P[X.str] !== void 0);
      }
    }
    function z(T, S) {
      for (const P in S)
        T[P] = (T[P] || 0) - (S[P] || 0);
    }
    function J(T) {
      return typeof T == "boolean" || typeof T == "number" || T === null ? !T : (0, t._)`!${k(T)}`;
    }
    e.not = J;
    const W = O(e.operators.AND);
    function j(...T) {
      return T.reduce(W);
    }
    e.and = j;
    const G = O(e.operators.OR);
    function D(...T) {
      return T.reduce(G);
    }
    e.or = D;
    function O(T) {
      return (S, P) => S === t.nil ? P : P === t.nil ? S : (0, t._)`${k(S)} ${T} ${k(P)}`;
    }
    function k(T) {
      return T instanceof t.Name ? T : (0, t._)`(${T})`;
    }
  }(ws)), ws;
}
var Q = {}, va;
function ie() {
  if (va) return Q;
  va = 1, Object.defineProperty(Q, "__esModule", { value: !0 }), Q.checkStrictMode = Q.getErrorPath = Q.Type = Q.useFunc = Q.setEvaluated = Q.evaluatedPropsToName = Q.mergeEvaluated = Q.eachItem = Q.unescapeJsonPointer = Q.escapeJsonPointer = Q.escapeFragment = Q.unescapeFragment = Q.schemaRefOrVal = Q.schemaHasRulesButRef = Q.schemaHasRules = Q.checkUnknownRules = Q.alwaysValidSchema = Q.toHash = void 0;
  const e = re(), t = _n();
  function f(p) {
    const y = {};
    for (const $ of p)
      y[$] = !0;
    return y;
  }
  Q.toHash = f;
  function s(p, y) {
    return typeof y == "boolean" ? y : Object.keys(y).length === 0 ? !0 : (d(p, y), !i(y, p.self.RULES.all));
  }
  Q.alwaysValidSchema = s;
  function d(p, y = p.schema) {
    const { opts: $, self: b } = p;
    if (!$.strictSchema || typeof y == "boolean")
      return;
    const N = b.RULES.keywords;
    for (const L in y)
      N[L] || v(p, `unknown keyword: "${L}"`);
  }
  Q.checkUnknownRules = d;
  function i(p, y) {
    if (typeof p == "boolean")
      return !p;
    for (const $ in p)
      if (y[$])
        return !0;
    return !1;
  }
  Q.schemaHasRules = i;
  function r(p, y) {
    if (typeof p == "boolean")
      return !p;
    for (const $ in p)
      if ($ !== "$ref" && y.all[$])
        return !0;
    return !1;
  }
  Q.schemaHasRulesButRef = r;
  function a({ topSchemaRef: p, schemaPath: y }, $, b, N) {
    if (!N) {
      if (typeof $ == "number" || typeof $ == "boolean")
        return $;
      if (typeof $ == "string")
        return (0, e._)`${$}`;
    }
    return (0, e._)`${p}${y}${(0, e.getProperty)(b)}`;
  }
  Q.schemaRefOrVal = a;
  function o(p) {
    return g(decodeURIComponent(p));
  }
  Q.unescapeFragment = o;
  function l(p) {
    return encodeURIComponent(c(p));
  }
  Q.escapeFragment = l;
  function c(p) {
    return typeof p == "number" ? `${p}` : p.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  Q.escapeJsonPointer = c;
  function g(p) {
    return p.replace(/~1/g, "/").replace(/~0/g, "~");
  }
  Q.unescapeJsonPointer = g;
  function E(p, y) {
    if (Array.isArray(p))
      for (const $ of p)
        y($);
    else
      y(p);
  }
  Q.eachItem = E;
  function _({ mergeNames: p, mergeToName: y, mergeValues: $, resultToName: b }) {
    return (N, L, F, H) => {
      const M = F === void 0 ? L : F instanceof e.Name ? (L instanceof e.Name ? p(N, L, F) : y(N, L, F), F) : L instanceof e.Name ? (y(N, F, L), L) : $(L, F);
      return H === e.Name && !(M instanceof e.Name) ? b(N, M) : M;
    };
  }
  Q.mergeEvaluated = {
    props: _({
      mergeNames: (p, y, $) => p.if((0, e._)`${$} !== true && ${y} !== undefined`, () => {
        p.if((0, e._)`${y} === true`, () => p.assign($, !0), () => p.assign($, (0, e._)`${$} || {}`).code((0, e._)`Object.assign(${$}, ${y})`));
      }),
      mergeToName: (p, y, $) => p.if((0, e._)`${$} !== true`, () => {
        y === !0 ? p.assign($, !0) : (p.assign($, (0, e._)`${$} || {}`), R(p, $, y));
      }),
      mergeValues: (p, y) => p === !0 ? !0 : { ...p, ...y },
      resultToName: w
    }),
    items: _({
      mergeNames: (p, y, $) => p.if((0, e._)`${$} !== true && ${y} !== undefined`, () => p.assign($, (0, e._)`${y} === true ? true : ${$} > ${y} ? ${$} : ${y}`)),
      mergeToName: (p, y, $) => p.if((0, e._)`${$} !== true`, () => p.assign($, y === !0 ? !0 : (0, e._)`${$} > ${y} ? ${$} : ${y}`)),
      mergeValues: (p, y) => p === !0 ? !0 : Math.max(p, y),
      resultToName: (p, y) => p.var("items", y)
    })
  };
  function w(p, y) {
    if (y === !0)
      return p.var("props", !0);
    const $ = p.var("props", (0, e._)`{}`);
    return y !== void 0 && R(p, $, y), $;
  }
  Q.evaluatedPropsToName = w;
  function R(p, y, $) {
    Object.keys($).forEach((b) => p.assign((0, e._)`${y}${(0, e.getProperty)(b)}`, !0));
  }
  Q.setEvaluated = R;
  const u = {};
  function h(p, y) {
    return p.scopeValue("func", {
      ref: y,
      code: u[y.code] || (u[y.code] = new t._Code(y.code))
    });
  }
  Q.useFunc = h;
  var n;
  (function(p) {
    p[p.Num = 0] = "Num", p[p.Str = 1] = "Str";
  })(n || (Q.Type = n = {}));
  function m(p, y, $) {
    if (p instanceof e.Name) {
      const b = y === n.Num;
      return $ ? b ? (0, e._)`"[" + ${p} + "]"` : (0, e._)`"['" + ${p} + "']"` : b ? (0, e._)`"/" + ${p}` : (0, e._)`"/" + ${p}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
    }
    return $ ? (0, e.getProperty)(p).toString() : "/" + c(p);
  }
  Q.getErrorPath = m;
  function v(p, y, $ = p.opts.strictSchema) {
    if ($) {
      if (y = `strict mode: ${y}`, $ === !0)
        throw new Error(y);
      p.self.logger.warn(y);
    }
  }
  return Q.checkStrictMode = v, Q;
}
var Ht = {}, _a;
function Ge() {
  if (_a) return Ht;
  _a = 1, Object.defineProperty(Ht, "__esModule", { value: !0 });
  const e = re(), t = {
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
  return Ht.default = t, Ht;
}
var ga;
function Sn() {
  return ga || (ga = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
    const t = re(), f = ie(), s = Ge();
    e.keywordError = {
      message: ({ keyword: u }) => (0, t.str)`must pass "${u}" keyword validation`
    }, e.keyword$DataError = {
      message: ({ keyword: u, schemaType: h }) => h ? (0, t.str)`"${u}" keyword must be ${h} ($data)` : (0, t.str)`"${u}" keyword is invalid ($data)`
    };
    function d(u, h = e.keywordError, n, m) {
      const { it: v } = u, { gen: p, compositeRule: y, allErrors: $ } = v, b = g(u, h, n);
      m ?? (y || $) ? o(p, b) : l(v, (0, t._)`[${b}]`);
    }
    e.reportError = d;
    function i(u, h = e.keywordError, n) {
      const { it: m } = u, { gen: v, compositeRule: p, allErrors: y } = m, $ = g(u, h, n);
      o(v, $), p || y || l(m, s.default.vErrors);
    }
    e.reportExtraError = i;
    function r(u, h) {
      u.assign(s.default.errors, h), u.if((0, t._)`${s.default.vErrors} !== null`, () => u.if(h, () => u.assign((0, t._)`${s.default.vErrors}.length`, h), () => u.assign(s.default.vErrors, null)));
    }
    e.resetErrorsCount = r;
    function a({ gen: u, keyword: h, schemaValue: n, data: m, errsCount: v, it: p }) {
      if (v === void 0)
        throw new Error("ajv implementation error");
      const y = u.name("err");
      u.forRange("i", v, s.default.errors, ($) => {
        u.const(y, (0, t._)`${s.default.vErrors}[${$}]`), u.if((0, t._)`${y}.instancePath === undefined`, () => u.assign((0, t._)`${y}.instancePath`, (0, t.strConcat)(s.default.instancePath, p.errorPath))), u.assign((0, t._)`${y}.schemaPath`, (0, t.str)`${p.errSchemaPath}/${h}`), p.opts.verbose && (u.assign((0, t._)`${y}.schema`, n), u.assign((0, t._)`${y}.data`, m));
      });
    }
    e.extendErrors = a;
    function o(u, h) {
      const n = u.const("err", h);
      u.if((0, t._)`${s.default.vErrors} === null`, () => u.assign(s.default.vErrors, (0, t._)`[${n}]`), (0, t._)`${s.default.vErrors}.push(${n})`), u.code((0, t._)`${s.default.errors}++`);
    }
    function l(u, h) {
      const { gen: n, validateName: m, schemaEnv: v } = u;
      v.$async ? n.throw((0, t._)`new ${u.ValidationError}(${h})`) : (n.assign((0, t._)`${m}.errors`, h), n.return(!1));
    }
    const c = {
      keyword: new t.Name("keyword"),
      schemaPath: new t.Name("schemaPath"),
      // also used in JTD errors
      params: new t.Name("params"),
      propertyName: new t.Name("propertyName"),
      message: new t.Name("message"),
      schema: new t.Name("schema"),
      parentSchema: new t.Name("parentSchema")
    };
    function g(u, h, n) {
      const { createErrors: m } = u.it;
      return m === !1 ? (0, t._)`{}` : E(u, h, n);
    }
    function E(u, h, n = {}) {
      const { gen: m, it: v } = u, p = [
        _(v, n),
        w(u, n)
      ];
      return R(u, h, p), m.object(...p);
    }
    function _({ errorPath: u }, { instancePath: h }) {
      const n = h ? (0, t.str)`${u}${(0, f.getErrorPath)(h, f.Type.Str)}` : u;
      return [s.default.instancePath, (0, t.strConcat)(s.default.instancePath, n)];
    }
    function w({ keyword: u, it: { errSchemaPath: h } }, { schemaPath: n, parentSchema: m }) {
      let v = m ? h : (0, t.str)`${h}/${u}`;
      return n && (v = (0, t.str)`${v}${(0, f.getErrorPath)(n, f.Type.Str)}`), [c.schemaPath, v];
    }
    function R(u, { params: h, message: n }, m) {
      const { keyword: v, data: p, schemaValue: y, it: $ } = u, { opts: b, propertyName: N, topSchemaRef: L, schemaPath: F } = $;
      m.push([c.keyword, v], [c.params, typeof h == "function" ? h(u) : h || (0, t._)`{}`]), b.messages && m.push([c.message, typeof n == "function" ? n(u) : n]), b.verbose && m.push([c.schema, y], [c.parentSchema, (0, t._)`${L}${F}`], [s.default.data, p]), N && m.push([c.propertyName, N]);
    }
  }(Es)), Es;
}
var $a;
function Ed() {
  if ($a) return Ze;
  $a = 1, Object.defineProperty(Ze, "__esModule", { value: !0 }), Ze.boolOrEmptySchema = Ze.topBoolOrEmptySchema = void 0;
  const e = Sn(), t = re(), f = Ge(), s = {
    message: "boolean schema is false"
  };
  function d(a) {
    const { gen: o, schema: l, validateName: c } = a;
    l === !1 ? r(a, !1) : typeof l == "object" && l.$async === !0 ? o.return(f.default.data) : (o.assign((0, t._)`${c}.errors`, null), o.return(!0));
  }
  Ze.topBoolOrEmptySchema = d;
  function i(a, o) {
    const { gen: l, schema: c } = a;
    c === !1 ? (l.var(o, !1), r(a)) : l.var(o, !0);
  }
  Ze.boolOrEmptySchema = i;
  function r(a, o) {
    const { gen: l, data: c } = a, g = {
      gen: l,
      keyword: "false schema",
      data: c,
      schema: !1,
      schemaCode: !1,
      schemaValue: !1,
      params: {},
      it: a
    };
    (0, e.reportError)(g, s, void 0, o);
  }
  return Ze;
}
var pe = {}, Xe = {}, Ea;
function af() {
  if (Ea) return Xe;
  Ea = 1, Object.defineProperty(Xe, "__esModule", { value: !0 }), Xe.getRules = Xe.isJSONType = void 0;
  const e = ["string", "number", "integer", "boolean", "null", "object", "array"], t = new Set(e);
  function f(d) {
    return typeof d == "string" && t.has(d);
  }
  Xe.isJSONType = f;
  function s() {
    const d = {
      number: { type: "number", rules: [] },
      string: { type: "string", rules: [] },
      array: { type: "array", rules: [] },
      object: { type: "object", rules: [] }
    };
    return {
      types: { ...d, integer: !0, boolean: !0, null: !0 },
      rules: [{ rules: [] }, d.number, d.string, d.array, d.object],
      post: { rules: [] },
      all: {},
      keywords: {}
    };
  }
  return Xe.getRules = s, Xe;
}
var qe = {}, wa;
function cf() {
  if (wa) return qe;
  wa = 1, Object.defineProperty(qe, "__esModule", { value: !0 }), qe.shouldUseRule = qe.shouldUseGroup = qe.schemaHasRulesForType = void 0;
  function e({ schema: s, self: d }, i) {
    const r = d.RULES.types[i];
    return r && r !== !0 && t(s, r);
  }
  qe.schemaHasRulesForType = e;
  function t(s, d) {
    return d.rules.some((i) => f(s, i));
  }
  qe.shouldUseGroup = t;
  function f(s, d) {
    var i;
    return s[d.keyword] !== void 0 || ((i = d.definition.implements) === null || i === void 0 ? void 0 : i.some((r) => s[r] !== void 0));
  }
  return qe.shouldUseRule = f, qe;
}
var Sa;
function gn() {
  if (Sa) return pe;
  Sa = 1, Object.defineProperty(pe, "__esModule", { value: !0 }), pe.reportTypeError = pe.checkDataTypes = pe.checkDataType = pe.coerceAndCheckDataType = pe.getJSONTypes = pe.getSchemaTypes = pe.DataType = void 0;
  const e = af(), t = cf(), f = Sn(), s = re(), d = ie();
  var i;
  (function(n) {
    n[n.Correct = 0] = "Correct", n[n.Wrong = 1] = "Wrong";
  })(i || (pe.DataType = i = {}));
  function r(n) {
    const m = a(n.type);
    if (m.includes("null")) {
      if (n.nullable === !1)
        throw new Error("type: null contradicts nullable: false");
    } else {
      if (!m.length && n.nullable !== void 0)
        throw new Error('"nullable" cannot be used without "type"');
      n.nullable === !0 && m.push("null");
    }
    return m;
  }
  pe.getSchemaTypes = r;
  function a(n) {
    const m = Array.isArray(n) ? n : n ? [n] : [];
    if (m.every(e.isJSONType))
      return m;
    throw new Error("type must be JSONType or JSONType[]: " + m.join(","));
  }
  pe.getJSONTypes = a;
  function o(n, m) {
    const { gen: v, data: p, opts: y } = n, $ = c(m, y.coerceTypes), b = m.length > 0 && !($.length === 0 && m.length === 1 && (0, t.schemaHasRulesForType)(n, m[0]));
    if (b) {
      const N = w(m, p, y.strictNumbers, i.Wrong);
      v.if(N, () => {
        $.length ? g(n, m, $) : u(n);
      });
    }
    return b;
  }
  pe.coerceAndCheckDataType = o;
  const l = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
  function c(n, m) {
    return m ? n.filter((v) => l.has(v) || m === "array" && v === "array") : [];
  }
  function g(n, m, v) {
    const { gen: p, data: y, opts: $ } = n, b = p.let("dataType", (0, s._)`typeof ${y}`), N = p.let("coerced", (0, s._)`undefined`);
    $.coerceTypes === "array" && p.if((0, s._)`${b} == 'object' && Array.isArray(${y}) && ${y}.length == 1`, () => p.assign(y, (0, s._)`${y}[0]`).assign(b, (0, s._)`typeof ${y}`).if(w(m, y, $.strictNumbers), () => p.assign(N, y))), p.if((0, s._)`${N} !== undefined`);
    for (const F of v)
      (l.has(F) || F === "array" && $.coerceTypes === "array") && L(F);
    p.else(), u(n), p.endIf(), p.if((0, s._)`${N} !== undefined`, () => {
      p.assign(y, N), E(n, N);
    });
    function L(F) {
      switch (F) {
        case "string":
          p.elseIf((0, s._)`${b} == "number" || ${b} == "boolean"`).assign(N, (0, s._)`"" + ${y}`).elseIf((0, s._)`${y} === null`).assign(N, (0, s._)`""`);
          return;
        case "number":
          p.elseIf((0, s._)`${b} == "boolean" || ${y} === null
              || (${b} == "string" && ${y} && ${y} == +${y})`).assign(N, (0, s._)`+${y}`);
          return;
        case "integer":
          p.elseIf((0, s._)`${b} === "boolean" || ${y} === null
              || (${b} === "string" && ${y} && ${y} == +${y} && !(${y} % 1))`).assign(N, (0, s._)`+${y}`);
          return;
        case "boolean":
          p.elseIf((0, s._)`${y} === "false" || ${y} === 0 || ${y} === null`).assign(N, !1).elseIf((0, s._)`${y} === "true" || ${y} === 1`).assign(N, !0);
          return;
        case "null":
          p.elseIf((0, s._)`${y} === "" || ${y} === 0 || ${y} === false`), p.assign(N, null);
          return;
        case "array":
          p.elseIf((0, s._)`${b} === "string" || ${b} === "number"
              || ${b} === "boolean" || ${y} === null`).assign(N, (0, s._)`[${y}]`);
      }
    }
  }
  function E({ gen: n, parentData: m, parentDataProperty: v }, p) {
    n.if((0, s._)`${m} !== undefined`, () => n.assign((0, s._)`${m}[${v}]`, p));
  }
  function _(n, m, v, p = i.Correct) {
    const y = p === i.Correct ? s.operators.EQ : s.operators.NEQ;
    let $;
    switch (n) {
      case "null":
        return (0, s._)`${m} ${y} null`;
      case "array":
        $ = (0, s._)`Array.isArray(${m})`;
        break;
      case "object":
        $ = (0, s._)`${m} && typeof ${m} == "object" && !Array.isArray(${m})`;
        break;
      case "integer":
        $ = b((0, s._)`!(${m} % 1) && !isNaN(${m})`);
        break;
      case "number":
        $ = b();
        break;
      default:
        return (0, s._)`typeof ${m} ${y} ${n}`;
    }
    return p === i.Correct ? $ : (0, s.not)($);
    function b(N = s.nil) {
      return (0, s.and)((0, s._)`typeof ${m} == "number"`, N, v ? (0, s._)`isFinite(${m})` : s.nil);
    }
  }
  pe.checkDataType = _;
  function w(n, m, v, p) {
    if (n.length === 1)
      return _(n[0], m, v, p);
    let y;
    const $ = (0, d.toHash)(n);
    if ($.array && $.object) {
      const b = (0, s._)`typeof ${m} != "object"`;
      y = $.null ? b : (0, s._)`!${m} || ${b}`, delete $.null, delete $.array, delete $.object;
    } else
      y = s.nil;
    $.number && delete $.integer;
    for (const b in $)
      y = (0, s.and)(y, _(b, m, v, p));
    return y;
  }
  pe.checkDataTypes = w;
  const R = {
    message: ({ schema: n }) => `must be ${n}`,
    params: ({ schema: n, schemaValue: m }) => typeof n == "string" ? (0, s._)`{type: ${n}}` : (0, s._)`{type: ${m}}`
  };
  function u(n) {
    const m = h(n);
    (0, f.reportError)(m, R);
  }
  pe.reportTypeError = u;
  function h(n) {
    const { gen: m, data: v, schema: p } = n, y = (0, d.schemaRefOrVal)(n, p, "type");
    return {
      gen: m,
      keyword: "type",
      data: v,
      schema: p.type,
      schemaCode: y,
      schemaValue: y,
      parentSchema: p,
      params: {},
      it: n
    };
  }
  return pe;
}
var ht = {}, Ra;
function wd() {
  if (Ra) return ht;
  Ra = 1, Object.defineProperty(ht, "__esModule", { value: !0 }), ht.assignDefaults = void 0;
  const e = re(), t = ie();
  function f(d, i) {
    const { properties: r, items: a } = d.schema;
    if (i === "object" && r)
      for (const o in r)
        s(d, o, r[o].default);
    else i === "array" && Array.isArray(a) && a.forEach((o, l) => s(d, l, o.default));
  }
  ht.assignDefaults = f;
  function s(d, i, r) {
    const { gen: a, compositeRule: o, data: l, opts: c } = d;
    if (r === void 0)
      return;
    const g = (0, e._)`${l}${(0, e.getProperty)(i)}`;
    if (o) {
      (0, t.checkStrictMode)(d, `default is ignored for: ${g}`);
      return;
    }
    let E = (0, e._)`${g} === undefined`;
    c.useDefaults === "empty" && (E = (0, e._)`${E} || ${g} === null || ${g} === ""`), a.if(E, (0, e._)`${g} = ${(0, e.stringify)(r)}`);
  }
  return ht;
}
var Oe = {}, ue = {}, ba;
function Te() {
  if (ba) return ue;
  ba = 1, Object.defineProperty(ue, "__esModule", { value: !0 }), ue.validateUnion = ue.validateArray = ue.usePattern = ue.callValidateCode = ue.schemaProperties = ue.allSchemaProperties = ue.noPropertyInData = ue.propertyInData = ue.isOwnProperty = ue.hasPropFunc = ue.reportMissingProp = ue.checkMissingProp = ue.checkReportMissingProp = void 0;
  const e = re(), t = ie(), f = Ge(), s = ie();
  function d(n, m) {
    const { gen: v, data: p, it: y } = n;
    v.if(c(v, p, m, y.opts.ownProperties), () => {
      n.setParams({ missingProperty: (0, e._)`${m}` }, !0), n.error();
    });
  }
  ue.checkReportMissingProp = d;
  function i({ gen: n, data: m, it: { opts: v } }, p, y) {
    return (0, e.or)(...p.map(($) => (0, e.and)(c(n, m, $, v.ownProperties), (0, e._)`${y} = ${$}`)));
  }
  ue.checkMissingProp = i;
  function r(n, m) {
    n.setParams({ missingProperty: m }, !0), n.error();
  }
  ue.reportMissingProp = r;
  function a(n) {
    return n.scopeValue("func", {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      ref: Object.prototype.hasOwnProperty,
      code: (0, e._)`Object.prototype.hasOwnProperty`
    });
  }
  ue.hasPropFunc = a;
  function o(n, m, v) {
    return (0, e._)`${a(n)}.call(${m}, ${v})`;
  }
  ue.isOwnProperty = o;
  function l(n, m, v, p) {
    const y = (0, e._)`${m}${(0, e.getProperty)(v)} !== undefined`;
    return p ? (0, e._)`${y} && ${o(n, m, v)}` : y;
  }
  ue.propertyInData = l;
  function c(n, m, v, p) {
    const y = (0, e._)`${m}${(0, e.getProperty)(v)} === undefined`;
    return p ? (0, e.or)(y, (0, e.not)(o(n, m, v))) : y;
  }
  ue.noPropertyInData = c;
  function g(n) {
    return n ? Object.keys(n).filter((m) => m !== "__proto__") : [];
  }
  ue.allSchemaProperties = g;
  function E(n, m) {
    return g(m).filter((v) => !(0, t.alwaysValidSchema)(n, m[v]));
  }
  ue.schemaProperties = E;
  function _({ schemaCode: n, data: m, it: { gen: v, topSchemaRef: p, schemaPath: y, errorPath: $ }, it: b }, N, L, F) {
    const H = F ? (0, e._)`${n}, ${m}, ${p}${y}` : m, M = [
      [f.default.instancePath, (0, e.strConcat)(f.default.instancePath, $)],
      [f.default.parentData, b.parentData],
      [f.default.parentDataProperty, b.parentDataProperty],
      [f.default.rootData, f.default.rootData]
    ];
    b.opts.dynamicRef && M.push([f.default.dynamicAnchors, f.default.dynamicAnchors]);
    const U = (0, e._)`${H}, ${v.object(...M)}`;
    return L !== e.nil ? (0, e._)`${N}.call(${L}, ${U})` : (0, e._)`${N}(${U})`;
  }
  ue.callValidateCode = _;
  const w = (0, e._)`new RegExp`;
  function R({ gen: n, it: { opts: m } }, v) {
    const p = m.unicodeRegExp ? "u" : "", { regExp: y } = m.code, $ = y(v, p);
    return n.scopeValue("pattern", {
      key: $.toString(),
      ref: $,
      code: (0, e._)`${y.code === "new RegExp" ? w : (0, s.useFunc)(n, y)}(${v}, ${p})`
    });
  }
  ue.usePattern = R;
  function u(n) {
    const { gen: m, data: v, keyword: p, it: y } = n, $ = m.name("valid");
    if (y.allErrors) {
      const N = m.let("valid", !0);
      return b(() => m.assign(N, !1)), N;
    }
    return m.var($, !0), b(() => m.break()), $;
    function b(N) {
      const L = m.const("len", (0, e._)`${v}.length`);
      m.forRange("i", 0, L, (F) => {
        n.subschema({
          keyword: p,
          dataProp: F,
          dataPropType: t.Type.Num
        }, $), m.if((0, e.not)($), N);
      });
    }
  }
  ue.validateArray = u;
  function h(n) {
    const { gen: m, schema: v, keyword: p, it: y } = n;
    if (!Array.isArray(v))
      throw new Error("ajv implementation error");
    if (v.some((L) => (0, t.alwaysValidSchema)(y, L)) && !y.opts.unevaluated)
      return;
    const b = m.let("valid", !1), N = m.name("_valid");
    m.block(() => v.forEach((L, F) => {
      const H = n.subschema({
        keyword: p,
        schemaProp: F,
        compositeRule: !0
      }, N);
      m.assign(b, (0, e._)`${b} || ${N}`), n.mergeValidEvaluated(H, N) || m.if((0, e.not)(b));
    })), n.result(b, () => n.reset(), () => n.error(!0));
  }
  return ue.validateUnion = h, ue;
}
var Pa;
function Sd() {
  if (Pa) return Oe;
  Pa = 1, Object.defineProperty(Oe, "__esModule", { value: !0 }), Oe.validateKeywordUsage = Oe.validSchemaType = Oe.funcKeywordCode = Oe.macroKeywordCode = void 0;
  const e = re(), t = Ge(), f = Te(), s = Sn();
  function d(E, _) {
    const { gen: w, keyword: R, schema: u, parentSchema: h, it: n } = E, m = _.macro.call(n.self, u, h, n), v = l(w, R, m);
    n.opts.validateSchema !== !1 && n.self.validateSchema(m, !0);
    const p = w.name("valid");
    E.subschema({
      schema: m,
      schemaPath: e.nil,
      errSchemaPath: `${n.errSchemaPath}/${R}`,
      topSchemaRef: v,
      compositeRule: !0
    }, p), E.pass(p, () => E.error(!0));
  }
  Oe.macroKeywordCode = d;
  function i(E, _) {
    var w;
    const { gen: R, keyword: u, schema: h, parentSchema: n, $data: m, it: v } = E;
    o(v, _);
    const p = !m && _.compile ? _.compile.call(v.self, h, n, v) : _.validate, y = l(R, u, p), $ = R.let("valid");
    E.block$data($, b), E.ok((w = _.valid) !== null && w !== void 0 ? w : $);
    function b() {
      if (_.errors === !1)
        F(), _.modifying && r(E), H(() => E.error());
      else {
        const M = _.async ? N() : L();
        _.modifying && r(E), H(() => a(E, M));
      }
    }
    function N() {
      const M = R.let("ruleErrs", null);
      return R.try(() => F((0, e._)`await `), (U) => R.assign($, !1).if((0, e._)`${U} instanceof ${v.ValidationError}`, () => R.assign(M, (0, e._)`${U}.errors`), () => R.throw(U))), M;
    }
    function L() {
      const M = (0, e._)`${y}.errors`;
      return R.assign(M, null), F(e.nil), M;
    }
    function F(M = _.async ? (0, e._)`await ` : e.nil) {
      const U = v.opts.passContext ? t.default.this : t.default.self, z = !("compile" in _ && !m || _.schema === !1);
      R.assign($, (0, e._)`${M}${(0, f.callValidateCode)(E, y, U, z)}`, _.modifying);
    }
    function H(M) {
      var U;
      R.if((0, e.not)((U = _.valid) !== null && U !== void 0 ? U : $), M);
    }
  }
  Oe.funcKeywordCode = i;
  function r(E) {
    const { gen: _, data: w, it: R } = E;
    _.if(R.parentData, () => _.assign(w, (0, e._)`${R.parentData}[${R.parentDataProperty}]`));
  }
  function a(E, _) {
    const { gen: w } = E;
    w.if((0, e._)`Array.isArray(${_})`, () => {
      w.assign(t.default.vErrors, (0, e._)`${t.default.vErrors} === null ? ${_} : ${t.default.vErrors}.concat(${_})`).assign(t.default.errors, (0, e._)`${t.default.vErrors}.length`), (0, s.extendErrors)(E);
    }, () => E.error());
  }
  function o({ schemaEnv: E }, _) {
    if (_.async && !E.$async)
      throw new Error("async keyword in sync schema");
  }
  function l(E, _, w) {
    if (w === void 0)
      throw new Error(`keyword "${_}" failed to compile`);
    return E.scopeValue("keyword", typeof w == "function" ? { ref: w } : { ref: w, code: (0, e.stringify)(w) });
  }
  function c(E, _, w = !1) {
    return !_.length || _.some((R) => R === "array" ? Array.isArray(E) : R === "object" ? E && typeof E == "object" && !Array.isArray(E) : typeof E == R || w && typeof E > "u");
  }
  Oe.validSchemaType = c;
  function g({ schema: E, opts: _, self: w, errSchemaPath: R }, u, h) {
    if (Array.isArray(u.keyword) ? !u.keyword.includes(h) : u.keyword !== h)
      throw new Error("ajv implementation error");
    const n = u.dependencies;
    if (n?.some((m) => !Object.prototype.hasOwnProperty.call(E, m)))
      throw new Error(`parent schema must have dependencies of ${h}: ${n.join(",")}`);
    if (u.validateSchema && !u.validateSchema(E[h])) {
      const v = `keyword "${h}" value is invalid at path "${R}": ` + w.errorsText(u.validateSchema.errors);
      if (_.validateSchema === "log")
        w.logger.error(v);
      else
        throw new Error(v);
    }
  }
  return Oe.validateKeywordUsage = g, Oe;
}
var je = {}, Na;
function Rd() {
  if (Na) return je;
  Na = 1, Object.defineProperty(je, "__esModule", { value: !0 }), je.extendSubschemaMode = je.extendSubschemaData = je.getSubschema = void 0;
  const e = re(), t = ie();
  function f(i, { keyword: r, schemaProp: a, schema: o, schemaPath: l, errSchemaPath: c, topSchemaRef: g }) {
    if (r !== void 0 && o !== void 0)
      throw new Error('both "keyword" and "schema" passed, only one allowed');
    if (r !== void 0) {
      const E = i.schema[r];
      return a === void 0 ? {
        schema: E,
        schemaPath: (0, e._)`${i.schemaPath}${(0, e.getProperty)(r)}`,
        errSchemaPath: `${i.errSchemaPath}/${r}`
      } : {
        schema: E[a],
        schemaPath: (0, e._)`${i.schemaPath}${(0, e.getProperty)(r)}${(0, e.getProperty)(a)}`,
        errSchemaPath: `${i.errSchemaPath}/${r}/${(0, t.escapeFragment)(a)}`
      };
    }
    if (o !== void 0) {
      if (l === void 0 || c === void 0 || g === void 0)
        throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
      return {
        schema: o,
        schemaPath: l,
        topSchemaRef: g,
        errSchemaPath: c
      };
    }
    throw new Error('either "keyword" or "schema" must be passed');
  }
  je.getSubschema = f;
  function s(i, r, { dataProp: a, dataPropType: o, data: l, dataTypes: c, propertyName: g }) {
    if (l !== void 0 && a !== void 0)
      throw new Error('both "data" and "dataProp" passed, only one allowed');
    const { gen: E } = r;
    if (a !== void 0) {
      const { errorPath: w, dataPathArr: R, opts: u } = r, h = E.let("data", (0, e._)`${r.data}${(0, e.getProperty)(a)}`, !0);
      _(h), i.errorPath = (0, e.str)`${w}${(0, t.getErrorPath)(a, o, u.jsPropertySyntax)}`, i.parentDataProperty = (0, e._)`${a}`, i.dataPathArr = [...R, i.parentDataProperty];
    }
    if (l !== void 0) {
      const w = l instanceof e.Name ? l : E.let("data", l, !0);
      _(w), g !== void 0 && (i.propertyName = g);
    }
    c && (i.dataTypes = c);
    function _(w) {
      i.data = w, i.dataLevel = r.dataLevel + 1, i.dataTypes = [], r.definedProperties = /* @__PURE__ */ new Set(), i.parentData = r.data, i.dataNames = [...r.dataNames, w];
    }
  }
  je.extendSubschemaData = s;
  function d(i, { jtdDiscriminator: r, jtdMetadata: a, compositeRule: o, createErrors: l, allErrors: c }) {
    o !== void 0 && (i.compositeRule = o), l !== void 0 && (i.createErrors = l), c !== void 0 && (i.allErrors = c), i.jtdDiscriminator = r, i.jtdMetadata = a;
  }
  return je.extendSubschemaMode = d, je;
}
var _e = {}, bs, Oa;
function Rn() {
  return Oa || (Oa = 1, bs = function e(t, f) {
    if (t === f) return !0;
    if (t && f && typeof t == "object" && typeof f == "object") {
      if (t.constructor !== f.constructor) return !1;
      var s, d, i;
      if (Array.isArray(t)) {
        if (s = t.length, s != f.length) return !1;
        for (d = s; d-- !== 0; )
          if (!e(t[d], f[d])) return !1;
        return !0;
      }
      if (t.constructor === RegExp) return t.source === f.source && t.flags === f.flags;
      if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === f.valueOf();
      if (t.toString !== Object.prototype.toString) return t.toString() === f.toString();
      if (i = Object.keys(t), s = i.length, s !== Object.keys(f).length) return !1;
      for (d = s; d-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(f, i[d])) return !1;
      for (d = s; d-- !== 0; ) {
        var r = i[d];
        if (!e(t[r], f[r])) return !1;
      }
      return !0;
    }
    return t !== t && f !== f;
  }), bs;
}
var Ps = { exports: {} }, Ia;
function bd() {
  if (Ia) return Ps.exports;
  Ia = 1;
  var e = Ps.exports = function(s, d, i) {
    typeof d == "function" && (i = d, d = {}), i = d.cb || i;
    var r = typeof i == "function" ? i : i.pre || function() {
    }, a = i.post || function() {
    };
    t(d, r, a, s, "", s);
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
  function t(s, d, i, r, a, o, l, c, g, E) {
    if (r && typeof r == "object" && !Array.isArray(r)) {
      d(r, a, o, l, c, g, E);
      for (var _ in r) {
        var w = r[_];
        if (Array.isArray(w)) {
          if (_ in e.arrayKeywords)
            for (var R = 0; R < w.length; R++)
              t(s, d, i, w[R], a + "/" + _ + "/" + R, o, a, _, r, R);
        } else if (_ in e.propsKeywords) {
          if (w && typeof w == "object")
            for (var u in w)
              t(s, d, i, w[u], a + "/" + _ + "/" + f(u), o, a, _, r, u);
        } else (_ in e.keywords || s.allKeys && !(_ in e.skipKeywords)) && t(s, d, i, w, a + "/" + _, o, a, _, r);
      }
      i(r, a, o, l, c, g, E);
    }
  }
  function f(s) {
    return s.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  return Ps.exports;
}
var Ta;
function bn() {
  if (Ta) return _e;
  Ta = 1, Object.defineProperty(_e, "__esModule", { value: !0 }), _e.getSchemaRefs = _e.resolveUrl = _e.normalizeId = _e._getFullPath = _e.getFullPath = _e.inlineRef = void 0;
  const e = ie(), t = Rn(), f = bd(), s = /* @__PURE__ */ new Set([
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
  function d(R, u = !0) {
    return typeof R == "boolean" ? !0 : u === !0 ? !r(R) : u ? a(R) <= u : !1;
  }
  _e.inlineRef = d;
  const i = /* @__PURE__ */ new Set([
    "$ref",
    "$recursiveRef",
    "$recursiveAnchor",
    "$dynamicRef",
    "$dynamicAnchor"
  ]);
  function r(R) {
    for (const u in R) {
      if (i.has(u))
        return !0;
      const h = R[u];
      if (Array.isArray(h) && h.some(r) || typeof h == "object" && r(h))
        return !0;
    }
    return !1;
  }
  function a(R) {
    let u = 0;
    for (const h in R) {
      if (h === "$ref")
        return 1 / 0;
      if (u++, !s.has(h) && (typeof R[h] == "object" && (0, e.eachItem)(R[h], (n) => u += a(n)), u === 1 / 0))
        return 1 / 0;
    }
    return u;
  }
  function o(R, u = "", h) {
    h !== !1 && (u = g(u));
    const n = R.parse(u);
    return l(R, n);
  }
  _e.getFullPath = o;
  function l(R, u) {
    return R.serialize(u).split("#")[0] + "#";
  }
  _e._getFullPath = l;
  const c = /#\/?$/;
  function g(R) {
    return R ? R.replace(c, "") : "";
  }
  _e.normalizeId = g;
  function E(R, u, h) {
    return h = g(h), R.resolve(u, h);
  }
  _e.resolveUrl = E;
  const _ = /^[a-z_][-a-z0-9._]*$/i;
  function w(R, u) {
    if (typeof R == "boolean")
      return {};
    const { schemaId: h, uriResolver: n } = this.opts, m = g(R[h] || u), v = { "": m }, p = o(n, m, !1), y = {}, $ = /* @__PURE__ */ new Set();
    return f(R, { allKeys: !0 }, (L, F, H, M) => {
      if (M === void 0)
        return;
      const U = p + F;
      let z = v[M];
      typeof L[h] == "string" && (z = J.call(this, L[h])), W.call(this, L.$anchor), W.call(this, L.$dynamicAnchor), v[F] = z;
      function J(j) {
        const G = this.opts.uriResolver.resolve;
        if (j = g(z ? G(z, j) : j), $.has(j))
          throw N(j);
        $.add(j);
        let D = this.refs[j];
        return typeof D == "string" && (D = this.refs[D]), typeof D == "object" ? b(L, D.schema, j) : j !== g(U) && (j[0] === "#" ? (b(L, y[j], j), y[j] = L) : this.refs[j] = U), j;
      }
      function W(j) {
        if (typeof j == "string") {
          if (!_.test(j))
            throw new Error(`invalid anchor "${j}"`);
          J.call(this, `#${j}`);
        }
      }
    }), y;
    function b(L, F, H) {
      if (F !== void 0 && !t(L, F))
        throw N(H);
    }
    function N(L) {
      return new Error(`reference "${L}" resolves to more than one schema`);
    }
  }
  return _e.getSchemaRefs = w, _e;
}
var Ca;
function Pn() {
  if (Ca) return ke;
  Ca = 1, Object.defineProperty(ke, "__esModule", { value: !0 }), ke.getData = ke.KeywordCxt = ke.validateFunctionCode = void 0;
  const e = Ed(), t = gn(), f = cf(), s = gn(), d = wd(), i = Sd(), r = Rd(), a = re(), o = Ge(), l = bn(), c = ie(), g = Sn();
  function E(I) {
    if (p(I) && ($(I), v(I))) {
      u(I);
      return;
    }
    _(I, () => (0, e.topBoolOrEmptySchema)(I));
  }
  ke.validateFunctionCode = E;
  function _({ gen: I, validateName: C, schema: q, schemaEnv: V, opts: x }, Y) {
    x.code.es5 ? I.func(C, (0, a._)`${o.default.data}, ${o.default.valCxt}`, V.$async, () => {
      I.code((0, a._)`"use strict"; ${n(q, x)}`), R(I, x), I.code(Y);
    }) : I.func(C, (0, a._)`${o.default.data}, ${w(x)}`, V.$async, () => I.code(n(q, x)).code(Y));
  }
  function w(I) {
    return (0, a._)`{${o.default.instancePath}="", ${o.default.parentData}, ${o.default.parentDataProperty}, ${o.default.rootData}=${o.default.data}${I.dynamicRef ? (0, a._)`, ${o.default.dynamicAnchors}={}` : a.nil}}={}`;
  }
  function R(I, C) {
    I.if(o.default.valCxt, () => {
      I.var(o.default.instancePath, (0, a._)`${o.default.valCxt}.${o.default.instancePath}`), I.var(o.default.parentData, (0, a._)`${o.default.valCxt}.${o.default.parentData}`), I.var(o.default.parentDataProperty, (0, a._)`${o.default.valCxt}.${o.default.parentDataProperty}`), I.var(o.default.rootData, (0, a._)`${o.default.valCxt}.${o.default.rootData}`), C.dynamicRef && I.var(o.default.dynamicAnchors, (0, a._)`${o.default.valCxt}.${o.default.dynamicAnchors}`);
    }, () => {
      I.var(o.default.instancePath, (0, a._)`""`), I.var(o.default.parentData, (0, a._)`undefined`), I.var(o.default.parentDataProperty, (0, a._)`undefined`), I.var(o.default.rootData, o.default.data), C.dynamicRef && I.var(o.default.dynamicAnchors, (0, a._)`{}`);
    });
  }
  function u(I) {
    const { schema: C, opts: q, gen: V } = I;
    _(I, () => {
      q.$comment && C.$comment && M(I), L(I), V.let(o.default.vErrors, null), V.let(o.default.errors, 0), q.unevaluated && h(I), b(I), U(I);
    });
  }
  function h(I) {
    const { gen: C, validateName: q } = I;
    I.evaluated = C.const("evaluated", (0, a._)`${q}.evaluated`), C.if((0, a._)`${I.evaluated}.dynamicProps`, () => C.assign((0, a._)`${I.evaluated}.props`, (0, a._)`undefined`)), C.if((0, a._)`${I.evaluated}.dynamicItems`, () => C.assign((0, a._)`${I.evaluated}.items`, (0, a._)`undefined`));
  }
  function n(I, C) {
    const q = typeof I == "object" && I[C.schemaId];
    return q && (C.code.source || C.code.process) ? (0, a._)`/*# sourceURL=${q} */` : a.nil;
  }
  function m(I, C) {
    if (p(I) && ($(I), v(I))) {
      y(I, C);
      return;
    }
    (0, e.boolOrEmptySchema)(I, C);
  }
  function v({ schema: I, self: C }) {
    if (typeof I == "boolean")
      return !I;
    for (const q in I)
      if (C.RULES.all[q])
        return !0;
    return !1;
  }
  function p(I) {
    return typeof I.schema != "boolean";
  }
  function y(I, C) {
    const { schema: q, gen: V, opts: x } = I;
    x.$comment && q.$comment && M(I), F(I), H(I);
    const Y = V.const("_errs", o.default.errors);
    b(I, Y), V.var(C, (0, a._)`${Y} === ${o.default.errors}`);
  }
  function $(I) {
    (0, c.checkUnknownRules)(I), N(I);
  }
  function b(I, C) {
    if (I.opts.jtd)
      return J(I, [], !1, C);
    const q = (0, t.getSchemaTypes)(I.schema), V = (0, t.coerceAndCheckDataType)(I, q);
    J(I, q, !V, C);
  }
  function N(I) {
    const { schema: C, errSchemaPath: q, opts: V, self: x } = I;
    C.$ref && V.ignoreKeywordsWithRef && (0, c.schemaHasRulesButRef)(C, x.RULES) && x.logger.warn(`$ref: keywords ignored in schema at path "${q}"`);
  }
  function L(I) {
    const { schema: C, opts: q } = I;
    C.default !== void 0 && q.useDefaults && q.strictSchema && (0, c.checkStrictMode)(I, "default is ignored in the schema root");
  }
  function F(I) {
    const C = I.schema[I.opts.schemaId];
    C && (I.baseId = (0, l.resolveUrl)(I.opts.uriResolver, I.baseId, C));
  }
  function H(I) {
    if (I.schema.$async && !I.schemaEnv.$async)
      throw new Error("async schema in sync schema");
  }
  function M({ gen: I, schemaEnv: C, schema: q, errSchemaPath: V, opts: x }) {
    const Y = q.$comment;
    if (x.$comment === !0)
      I.code((0, a._)`${o.default.self}.logger.log(${Y})`);
    else if (typeof x.$comment == "function") {
      const ne = (0, a.str)`${V}/$comment`, he = I.scopeValue("root", { ref: C.root });
      I.code((0, a._)`${o.default.self}.opts.$comment(${Y}, ${ne}, ${he}.schema)`);
    }
  }
  function U(I) {
    const { gen: C, schemaEnv: q, validateName: V, ValidationError: x, opts: Y } = I;
    q.$async ? C.if((0, a._)`${o.default.errors} === 0`, () => C.return(o.default.data), () => C.throw((0, a._)`new ${x}(${o.default.vErrors})`)) : (C.assign((0, a._)`${V}.errors`, o.default.vErrors), Y.unevaluated && z(I), C.return((0, a._)`${o.default.errors} === 0`));
  }
  function z({ gen: I, evaluated: C, props: q, items: V }) {
    q instanceof a.Name && I.assign((0, a._)`${C}.props`, q), V instanceof a.Name && I.assign((0, a._)`${C}.items`, V);
  }
  function J(I, C, q, V) {
    const { gen: x, schema: Y, data: ne, allErrors: he, opts: ae, self: ce } = I, { RULES: se } = ce;
    if (Y.$ref && (ae.ignoreKeywordsWithRef || !(0, c.schemaHasRulesButRef)(Y, se))) {
      x.block(() => K(I, "$ref", se.all.$ref.definition));
      return;
    }
    ae.jtd || j(I, C), x.block(() => {
      for (const de of se.rules)
        we(de);
      we(se.post);
    });
    function we(de) {
      (0, f.shouldUseGroup)(Y, de) && (de.type ? (x.if((0, s.checkDataType)(de.type, ne, ae.strictNumbers)), W(I, de), C.length === 1 && C[0] === de.type && q && (x.else(), (0, s.reportTypeError)(I)), x.endIf()) : W(I, de), he || x.if((0, a._)`${o.default.errors} === ${V || 0}`));
    }
  }
  function W(I, C) {
    const { gen: q, schema: V, opts: { useDefaults: x } } = I;
    x && (0, d.assignDefaults)(I, C.type), q.block(() => {
      for (const Y of C.rules)
        (0, f.shouldUseRule)(V, Y) && K(I, Y.keyword, Y.definition, C.type);
    });
  }
  function j(I, C) {
    I.schemaEnv.meta || !I.opts.strictTypes || (G(I, C), I.opts.allowUnionTypes || D(I, C), O(I, I.dataTypes));
  }
  function G(I, C) {
    if (C.length) {
      if (!I.dataTypes.length) {
        I.dataTypes = C;
        return;
      }
      C.forEach((q) => {
        T(I.dataTypes, q) || P(I, `type "${q}" not allowed by context "${I.dataTypes.join(",")}"`);
      }), S(I, C);
    }
  }
  function D(I, C) {
    C.length > 1 && !(C.length === 2 && C.includes("null")) && P(I, "use allowUnionTypes to allow union type keyword");
  }
  function O(I, C) {
    const q = I.self.RULES.all;
    for (const V in q) {
      const x = q[V];
      if (typeof x == "object" && (0, f.shouldUseRule)(I.schema, x)) {
        const { type: Y } = x.definition;
        Y.length && !Y.some((ne) => k(C, ne)) && P(I, `missing type "${Y.join(",")}" for keyword "${V}"`);
      }
    }
  }
  function k(I, C) {
    return I.includes(C) || C === "number" && I.includes("integer");
  }
  function T(I, C) {
    return I.includes(C) || C === "integer" && I.includes("number");
  }
  function S(I, C) {
    const q = [];
    for (const V of I.dataTypes)
      T(C, V) ? q.push(V) : C.includes("integer") && V === "number" && q.push("integer");
    I.dataTypes = q;
  }
  function P(I, C) {
    const q = I.schemaEnv.baseId + I.errSchemaPath;
    C += ` at "${q}" (strictTypes)`, (0, c.checkStrictMode)(I, C, I.opts.strictTypes);
  }
  class A {
    constructor(C, q, V) {
      if ((0, i.validateKeywordUsage)(C, q, V), this.gen = C.gen, this.allErrors = C.allErrors, this.keyword = V, this.data = C.data, this.schema = C.schema[V], this.$data = q.$data && C.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, c.schemaRefOrVal)(C, this.schema, V, this.$data), this.schemaType = q.schemaType, this.parentSchema = C.schema, this.params = {}, this.it = C, this.def = q, this.$data)
        this.schemaCode = C.gen.const("vSchema", Z(this.$data, C));
      else if (this.schemaCode = this.schemaValue, !(0, i.validSchemaType)(this.schema, q.schemaType, q.allowUndefined))
        throw new Error(`${V} value must be ${JSON.stringify(q.schemaType)}`);
      ("code" in q ? q.trackErrors : q.errors !== !1) && (this.errsCount = C.gen.const("_errs", o.default.errors));
    }
    result(C, q, V) {
      this.failResult((0, a.not)(C), q, V);
    }
    failResult(C, q, V) {
      this.gen.if(C), V ? V() : this.error(), q ? (this.gen.else(), q(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    pass(C, q) {
      this.failResult((0, a.not)(C), void 0, q);
    }
    fail(C) {
      if (C === void 0) {
        this.error(), this.allErrors || this.gen.if(!1);
        return;
      }
      this.gen.if(C), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    fail$data(C) {
      if (!this.$data)
        return this.fail(C);
      const { schemaCode: q } = this;
      this.fail((0, a._)`${q} !== undefined && (${(0, a.or)(this.invalid$data(), C)})`);
    }
    error(C, q, V) {
      if (q) {
        this.setParams(q), this._error(C, V), this.setParams({});
        return;
      }
      this._error(C, V);
    }
    _error(C, q) {
      (C ? g.reportExtraError : g.reportError)(this, this.def.error, q);
    }
    $dataError() {
      (0, g.reportError)(this, this.def.$dataError || g.keyword$DataError);
    }
    reset() {
      if (this.errsCount === void 0)
        throw new Error('add "trackErrors" to keyword definition');
      (0, g.resetErrorsCount)(this.gen, this.errsCount);
    }
    ok(C) {
      this.allErrors || this.gen.if(C);
    }
    setParams(C, q) {
      q ? Object.assign(this.params, C) : this.params = C;
    }
    block$data(C, q, V = a.nil) {
      this.gen.block(() => {
        this.check$data(C, V), q();
      });
    }
    check$data(C = a.nil, q = a.nil) {
      if (!this.$data)
        return;
      const { gen: V, schemaCode: x, schemaType: Y, def: ne } = this;
      V.if((0, a.or)((0, a._)`${x} === undefined`, q)), C !== a.nil && V.assign(C, !0), (Y.length || ne.validateSchema) && (V.elseIf(this.invalid$data()), this.$dataError(), C !== a.nil && V.assign(C, !1)), V.else();
    }
    invalid$data() {
      const { gen: C, schemaCode: q, schemaType: V, def: x, it: Y } = this;
      return (0, a.or)(ne(), he());
      function ne() {
        if (V.length) {
          if (!(q instanceof a.Name))
            throw new Error("ajv implementation error");
          const ae = Array.isArray(V) ? V : [V];
          return (0, a._)`${(0, s.checkDataTypes)(ae, q, Y.opts.strictNumbers, s.DataType.Wrong)}`;
        }
        return a.nil;
      }
      function he() {
        if (x.validateSchema) {
          const ae = C.scopeValue("validate$data", { ref: x.validateSchema });
          return (0, a._)`!${ae}(${q})`;
        }
        return a.nil;
      }
    }
    subschema(C, q) {
      const V = (0, r.getSubschema)(this.it, C);
      (0, r.extendSubschemaData)(V, this.it, C), (0, r.extendSubschemaMode)(V, C);
      const x = { ...this.it, ...V, items: void 0, props: void 0 };
      return m(x, q), x;
    }
    mergeEvaluated(C, q) {
      const { it: V, gen: x } = this;
      V.opts.unevaluated && (V.props !== !0 && C.props !== void 0 && (V.props = c.mergeEvaluated.props(x, C.props, V.props, q)), V.items !== !0 && C.items !== void 0 && (V.items = c.mergeEvaluated.items(x, C.items, V.items, q)));
    }
    mergeValidEvaluated(C, q) {
      const { it: V, gen: x } = this;
      if (V.opts.unevaluated && (V.props !== !0 || V.items !== !0))
        return x.if(q, () => this.mergeEvaluated(C, a.Name)), !0;
    }
  }
  ke.KeywordCxt = A;
  function K(I, C, q, V) {
    const x = new A(I, q, C);
    "code" in q ? q.code(x, V) : x.$data && q.validate ? (0, i.funcKeywordCode)(x, q) : "macro" in q ? (0, i.macroKeywordCode)(x, q) : (q.compile || q.validate) && (0, i.funcKeywordCode)(x, q);
  }
  const B = /^\/(?:[^~]|~0|~1)*$/, X = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
  function Z(I, { dataLevel: C, dataNames: q, dataPathArr: V }) {
    let x, Y;
    if (I === "")
      return o.default.rootData;
    if (I[0] === "/") {
      if (!B.test(I))
        throw new Error(`Invalid JSON-pointer: ${I}`);
      x = I, Y = o.default.rootData;
    } else {
      const ce = X.exec(I);
      if (!ce)
        throw new Error(`Invalid JSON-pointer: ${I}`);
      const se = +ce[1];
      if (x = ce[2], x === "#") {
        if (se >= C)
          throw new Error(ae("property/index", se));
        return V[C - se];
      }
      if (se > C)
        throw new Error(ae("data", se));
      if (Y = q[C - se], !x)
        return Y;
    }
    let ne = Y;
    const he = x.split("/");
    for (const ce of he)
      ce && (Y = (0, a._)`${Y}${(0, a.getProperty)((0, c.unescapeJsonPointer)(ce))}`, ne = (0, a._)`${ne} && ${Y}`);
    return ne;
    function ae(ce, se) {
      return `Cannot access ${ce} ${se} levels up, current level is ${C}`;
    }
  }
  return ke.getData = Z, ke;
}
var xt = {}, Da;
function Zi() {
  if (Da) return xt;
  Da = 1, Object.defineProperty(xt, "__esModule", { value: !0 });
  class e extends Error {
    constructor(f) {
      super("validation failed"), this.errors = f, this.ajv = this.validation = !0;
    }
  }
  return xt.default = e, xt;
}
var Bt = {}, Aa;
function Nn() {
  if (Aa) return Bt;
  Aa = 1, Object.defineProperty(Bt, "__esModule", { value: !0 });
  const e = bn();
  class t extends Error {
    constructor(s, d, i, r) {
      super(r || `can't resolve reference ${i} from id ${d}`), this.missingRef = (0, e.resolveUrl)(s, d, i), this.missingSchema = (0, e.normalizeId)((0, e.getFullPath)(s, this.missingRef));
    }
  }
  return Bt.default = t, Bt;
}
var Se = {}, La;
function Xi() {
  if (La) return Se;
  La = 1, Object.defineProperty(Se, "__esModule", { value: !0 }), Se.resolveSchema = Se.getCompilingSchema = Se.resolveRef = Se.compileSchema = Se.SchemaEnv = void 0;
  const e = re(), t = Zi(), f = Ge(), s = bn(), d = ie(), i = Pn();
  class r {
    constructor(h) {
      var n;
      this.refs = {}, this.dynamicAnchors = {};
      let m;
      typeof h.schema == "object" && (m = h.schema), this.schema = h.schema, this.schemaId = h.schemaId, this.root = h.root || this, this.baseId = (n = h.baseId) !== null && n !== void 0 ? n : (0, s.normalizeId)(m?.[h.schemaId || "$id"]), this.schemaPath = h.schemaPath, this.localRefs = h.localRefs, this.meta = h.meta, this.$async = m?.$async, this.refs = {};
    }
  }
  Se.SchemaEnv = r;
  function a(u) {
    const h = c.call(this, u);
    if (h)
      return h;
    const n = (0, s.getFullPath)(this.opts.uriResolver, u.root.baseId), { es5: m, lines: v } = this.opts.code, { ownProperties: p } = this.opts, y = new e.CodeGen(this.scope, { es5: m, lines: v, ownProperties: p });
    let $;
    u.$async && ($ = y.scopeValue("Error", {
      ref: t.default,
      code: (0, e._)`require("ajv/dist/runtime/validation_error").default`
    }));
    const b = y.scopeName("validate");
    u.validateName = b;
    const N = {
      gen: y,
      allErrors: this.opts.allErrors,
      data: f.default.data,
      parentData: f.default.parentData,
      parentDataProperty: f.default.parentDataProperty,
      dataNames: [f.default.data],
      dataPathArr: [e.nil],
      // TODO can its length be used as dataLevel if nil is removed?
      dataLevel: 0,
      dataTypes: [],
      definedProperties: /* @__PURE__ */ new Set(),
      topSchemaRef: y.scopeValue("schema", this.opts.code.source === !0 ? { ref: u.schema, code: (0, e.stringify)(u.schema) } : { ref: u.schema }),
      validateName: b,
      ValidationError: $,
      schema: u.schema,
      schemaEnv: u,
      rootId: n,
      baseId: u.baseId || n,
      schemaPath: e.nil,
      errSchemaPath: u.schemaPath || (this.opts.jtd ? "" : "#"),
      errorPath: (0, e._)`""`,
      opts: this.opts,
      self: this
    };
    let L;
    try {
      this._compilations.add(u), (0, i.validateFunctionCode)(N), y.optimize(this.opts.code.optimize);
      const F = y.toString();
      L = `${y.scopeRefs(f.default.scope)}return ${F}`, this.opts.code.process && (L = this.opts.code.process(L, u));
      const M = new Function(`${f.default.self}`, `${f.default.scope}`, L)(this, this.scope.get());
      if (this.scope.value(b, { ref: M }), M.errors = null, M.schema = u.schema, M.schemaEnv = u, u.$async && (M.$async = !0), this.opts.code.source === !0 && (M.source = { validateName: b, validateCode: F, scopeValues: y._values }), this.opts.unevaluated) {
        const { props: U, items: z } = N;
        M.evaluated = {
          props: U instanceof e.Name ? void 0 : U,
          items: z instanceof e.Name ? void 0 : z,
          dynamicProps: U instanceof e.Name,
          dynamicItems: z instanceof e.Name
        }, M.source && (M.source.evaluated = (0, e.stringify)(M.evaluated));
      }
      return u.validate = M, u;
    } catch (F) {
      throw delete u.validate, delete u.validateName, L && this.logger.error("Error compiling schema, function code:", L), F;
    } finally {
      this._compilations.delete(u);
    }
  }
  Se.compileSchema = a;
  function o(u, h, n) {
    var m;
    n = (0, s.resolveUrl)(this.opts.uriResolver, h, n);
    const v = u.refs[n];
    if (v)
      return v;
    let p = E.call(this, u, n);
    if (p === void 0) {
      const y = (m = u.localRefs) === null || m === void 0 ? void 0 : m[n], { schemaId: $ } = this.opts;
      y && (p = new r({ schema: y, schemaId: $, root: u, baseId: h }));
    }
    if (p !== void 0)
      return u.refs[n] = l.call(this, p);
  }
  Se.resolveRef = o;
  function l(u) {
    return (0, s.inlineRef)(u.schema, this.opts.inlineRefs) ? u.schema : u.validate ? u : a.call(this, u);
  }
  function c(u) {
    for (const h of this._compilations)
      if (g(h, u))
        return h;
  }
  Se.getCompilingSchema = c;
  function g(u, h) {
    return u.schema === h.schema && u.root === h.root && u.baseId === h.baseId;
  }
  function E(u, h) {
    let n;
    for (; typeof (n = this.refs[h]) == "string"; )
      h = n;
    return n || this.schemas[h] || _.call(this, u, h);
  }
  function _(u, h) {
    const n = this.opts.uriResolver.parse(h), m = (0, s._getFullPath)(this.opts.uriResolver, n);
    let v = (0, s.getFullPath)(this.opts.uriResolver, u.baseId, void 0);
    if (Object.keys(u.schema).length > 0 && m === v)
      return R.call(this, n, u);
    const p = (0, s.normalizeId)(m), y = this.refs[p] || this.schemas[p];
    if (typeof y == "string") {
      const $ = _.call(this, u, y);
      return typeof $?.schema != "object" ? void 0 : R.call(this, n, $);
    }
    if (typeof y?.schema == "object") {
      if (y.validate || a.call(this, y), p === (0, s.normalizeId)(h)) {
        const { schema: $ } = y, { schemaId: b } = this.opts, N = $[b];
        return N && (v = (0, s.resolveUrl)(this.opts.uriResolver, v, N)), new r({ schema: $, schemaId: b, root: u, baseId: v });
      }
      return R.call(this, n, y);
    }
  }
  Se.resolveSchema = _;
  const w = /* @__PURE__ */ new Set([
    "properties",
    "patternProperties",
    "enum",
    "dependencies",
    "definitions"
  ]);
  function R(u, { baseId: h, schema: n, root: m }) {
    var v;
    if (((v = u.fragment) === null || v === void 0 ? void 0 : v[0]) !== "/")
      return;
    for (const $ of u.fragment.slice(1).split("/")) {
      if (typeof n == "boolean")
        return;
      const b = n[(0, d.unescapeFragment)($)];
      if (b === void 0)
        return;
      n = b;
      const N = typeof n == "object" && n[this.opts.schemaId];
      !w.has($) && N && (h = (0, s.resolveUrl)(this.opts.uriResolver, h, N));
    }
    let p;
    if (typeof n != "boolean" && n.$ref && !(0, d.schemaHasRulesButRef)(n, this.RULES)) {
      const $ = (0, s.resolveUrl)(this.opts.uriResolver, h, n.$ref);
      p = _.call(this, m, $);
    }
    const { schemaId: y } = this.opts;
    if (p = p || new r({ schema: n, schemaId: y, root: m, baseId: h }), p.schema !== p.root.schema)
      return p;
  }
  return Se;
}
const Pd = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", Nd = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Od = "object", Id = ["$data"], Td = { $data: { type: "string", anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }] } }, Cd = !1, Dd = {
  $id: Pd,
  description: Nd,
  type: Od,
  required: Id,
  properties: Td,
  additionalProperties: Cd
};
var Wt = {}, mt = { exports: {} }, Ns, ka;
function Ad() {
  return ka || (ka = 1, Ns = {
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
  }), Ns;
}
var Os, qa;
function Ld() {
  if (qa) return Os;
  qa = 1;
  const { HEX: e } = Ad();
  function t(w) {
    if (r(w, ".") < 3)
      return { host: w, isIPV4: !1 };
    const R = w.match(/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/u) || [], [u] = R;
    return u ? { host: i(u, "."), isIPV4: !0 } : { host: w, isIPV4: !1 };
  }
  function f(w, R = !1) {
    let u = "", h = !0;
    for (const n of w) {
      if (e[n] === void 0) return;
      n !== "0" && h === !0 && (h = !1), h || (u += n);
    }
    return R && u.length === 0 && (u = "0"), u;
  }
  function s(w) {
    let R = 0;
    const u = { error: !1, address: "", zone: "" }, h = [], n = [];
    let m = !1, v = !1, p = !1;
    function y() {
      if (n.length) {
        if (m === !1) {
          const $ = f(n);
          if ($ !== void 0)
            h.push($);
          else
            return u.error = !0, !1;
        }
        n.length = 0;
      }
      return !0;
    }
    for (let $ = 0; $ < w.length; $++) {
      const b = w[$];
      if (!(b === "[" || b === "]"))
        if (b === ":") {
          if (v === !0 && (p = !0), !y())
            break;
          if (R++, h.push(":"), R > 7) {
            u.error = !0;
            break;
          }
          $ - 1 >= 0 && w[$ - 1] === ":" && (v = !0);
          continue;
        } else if (b === "%") {
          if (!y())
            break;
          m = !0;
        } else {
          n.push(b);
          continue;
        }
    }
    return n.length && (m ? u.zone = n.join("") : p ? h.push(n.join("")) : h.push(f(n))), u.address = h.join(""), u;
  }
  function d(w, R = {}) {
    if (r(w, ":") < 2)
      return { host: w, isIPV6: !1 };
    const u = s(w);
    if (u.error)
      return { host: w, isIPV6: !1 };
    {
      let h = u.address, n = u.address;
      return u.zone && (h += "%" + u.zone, n += "%25" + u.zone), { host: h, escapedHost: n, isIPV6: !0 };
    }
  }
  function i(w, R) {
    let u = "", h = !0;
    const n = w.length;
    for (let m = 0; m < n; m++) {
      const v = w[m];
      v === "0" && h ? (m + 1 <= n && w[m + 1] === R || m + 1 === n) && (u += v, h = !1) : (v === R ? h = !0 : h = !1, u += v);
    }
    return u;
  }
  function r(w, R) {
    let u = 0;
    for (let h = 0; h < w.length; h++)
      w[h] === R && u++;
    return u;
  }
  const a = /^\.\.?\//u, o = /^\/\.(?:\/|$)/u, l = /^\/\.\.(?:\/|$)/u, c = /^\/?(?:.|\n)*?(?=\/|$)/u;
  function g(w) {
    const R = [];
    for (; w.length; )
      if (w.match(a))
        w = w.replace(a, "");
      else if (w.match(o))
        w = w.replace(o, "/");
      else if (w.match(l))
        w = w.replace(l, "/"), R.pop();
      else if (w === "." || w === "..")
        w = "";
      else {
        const u = w.match(c);
        if (u) {
          const h = u[0];
          w = w.slice(h.length), R.push(h);
        } else
          throw new Error("Unexpected dot segment condition");
      }
    return R.join("");
  }
  function E(w, R) {
    const u = R !== !0 ? escape : unescape;
    return w.scheme !== void 0 && (w.scheme = u(w.scheme)), w.userinfo !== void 0 && (w.userinfo = u(w.userinfo)), w.host !== void 0 && (w.host = u(w.host)), w.path !== void 0 && (w.path = u(w.path)), w.query !== void 0 && (w.query = u(w.query)), w.fragment !== void 0 && (w.fragment = u(w.fragment)), w;
  }
  function _(w, R) {
    const u = [];
    if (w.userinfo !== void 0 && (u.push(w.userinfo), u.push("@")), w.host !== void 0) {
      let h = unescape(w.host);
      const n = t(h);
      if (n.isIPV4)
        h = n.host;
      else {
        const m = d(n.host, {});
        m.isIPV6 === !0 ? h = `[${m.escapedHost}]` : h = w.host;
      }
      u.push(h);
    }
    return (typeof w.port == "number" || typeof w.port == "string") && (u.push(":"), u.push(String(w.port))), u.length ? u.join("") : void 0;
  }
  return Os = {
    recomposeAuthority: _,
    normalizeComponentEncoding: E,
    removeDotSegments: g,
    normalizeIPv4: t,
    normalizeIPv6: d,
    stringArrayToHexStripped: f
  }, Os;
}
var Is, ja;
function kd() {
  if (ja) return Is;
  ja = 1;
  const e = /^[\da-f]{8}\b-[\da-f]{4}\b-[\da-f]{4}\b-[\da-f]{4}\b-[\da-f]{12}$/iu, t = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
  function f(n) {
    return typeof n.secure == "boolean" ? n.secure : String(n.scheme).toLowerCase() === "wss";
  }
  function s(n) {
    return n.host || (n.error = n.error || "HTTP URIs must have a host."), n;
  }
  function d(n) {
    const m = String(n.scheme).toLowerCase() === "https";
    return (n.port === (m ? 443 : 80) || n.port === "") && (n.port = void 0), n.path || (n.path = "/"), n;
  }
  function i(n) {
    return n.secure = f(n), n.resourceName = (n.path || "/") + (n.query ? "?" + n.query : ""), n.path = void 0, n.query = void 0, n;
  }
  function r(n) {
    if ((n.port === (f(n) ? 443 : 80) || n.port === "") && (n.port = void 0), typeof n.secure == "boolean" && (n.scheme = n.secure ? "wss" : "ws", n.secure = void 0), n.resourceName) {
      const [m, v] = n.resourceName.split("?");
      n.path = m && m !== "/" ? m : void 0, n.query = v, n.resourceName = void 0;
    }
    return n.fragment = void 0, n;
  }
  function a(n, m) {
    if (!n.path)
      return n.error = "URN can not be parsed", n;
    const v = n.path.match(t);
    if (v) {
      const p = m.scheme || n.scheme || "urn";
      n.nid = v[1].toLowerCase(), n.nss = v[2];
      const y = `${p}:${m.nid || n.nid}`, $ = h[y];
      n.path = void 0, $ && (n = $.parse(n, m));
    } else
      n.error = n.error || "URN can not be parsed.";
    return n;
  }
  function o(n, m) {
    const v = m.scheme || n.scheme || "urn", p = n.nid.toLowerCase(), y = `${v}:${m.nid || p}`, $ = h[y];
    $ && (n = $.serialize(n, m));
    const b = n, N = n.nss;
    return b.path = `${p || m.nid}:${N}`, m.skipEscape = !0, b;
  }
  function l(n, m) {
    const v = n;
    return v.uuid = v.nss, v.nss = void 0, !m.tolerant && (!v.uuid || !e.test(v.uuid)) && (v.error = v.error || "UUID is not valid."), v;
  }
  function c(n) {
    const m = n;
    return m.nss = (n.uuid || "").toLowerCase(), m;
  }
  const g = {
    scheme: "http",
    domainHost: !0,
    parse: s,
    serialize: d
  }, E = {
    scheme: "https",
    domainHost: g.domainHost,
    parse: s,
    serialize: d
  }, _ = {
    scheme: "ws",
    domainHost: !0,
    parse: i,
    serialize: r
  }, w = {
    scheme: "wss",
    domainHost: _.domainHost,
    parse: _.parse,
    serialize: _.serialize
  }, h = {
    http: g,
    https: E,
    ws: _,
    wss: w,
    urn: {
      scheme: "urn",
      parse: a,
      serialize: o,
      skipNormalize: !0
    },
    "urn:uuid": {
      scheme: "urn:uuid",
      parse: l,
      serialize: c,
      skipNormalize: !0
    }
  };
  return Is = h, Is;
}
var Fa;
function uf() {
  if (Fa) return mt.exports;
  Fa = 1;
  const { normalizeIPv6: e, normalizeIPv4: t, removeDotSegments: f, recomposeAuthority: s, normalizeComponentEncoding: d } = Ld(), i = kd();
  function r(u, h) {
    return typeof u == "string" ? u = c(w(u, h), h) : typeof u == "object" && (u = w(c(u, h), h)), u;
  }
  function a(u, h, n) {
    const m = Object.assign({ scheme: "null" }, n), v = o(w(u, m), w(h, m), m, !0);
    return c(v, { ...m, skipEscape: !0 });
  }
  function o(u, h, n, m) {
    const v = {};
    return m || (u = w(c(u, n), n), h = w(c(h, n), n)), n = n || {}, !n.tolerant && h.scheme ? (v.scheme = h.scheme, v.userinfo = h.userinfo, v.host = h.host, v.port = h.port, v.path = f(h.path || ""), v.query = h.query) : (h.userinfo !== void 0 || h.host !== void 0 || h.port !== void 0 ? (v.userinfo = h.userinfo, v.host = h.host, v.port = h.port, v.path = f(h.path || ""), v.query = h.query) : (h.path ? (h.path.charAt(0) === "/" ? v.path = f(h.path) : ((u.userinfo !== void 0 || u.host !== void 0 || u.port !== void 0) && !u.path ? v.path = "/" + h.path : u.path ? v.path = u.path.slice(0, u.path.lastIndexOf("/") + 1) + h.path : v.path = h.path, v.path = f(v.path)), v.query = h.query) : (v.path = u.path, h.query !== void 0 ? v.query = h.query : v.query = u.query), v.userinfo = u.userinfo, v.host = u.host, v.port = u.port), v.scheme = u.scheme), v.fragment = h.fragment, v;
  }
  function l(u, h, n) {
    return typeof u == "string" ? (u = unescape(u), u = c(d(w(u, n), !0), { ...n, skipEscape: !0 })) : typeof u == "object" && (u = c(d(u, !0), { ...n, skipEscape: !0 })), typeof h == "string" ? (h = unescape(h), h = c(d(w(h, n), !0), { ...n, skipEscape: !0 })) : typeof h == "object" && (h = c(d(h, !0), { ...n, skipEscape: !0 })), u.toLowerCase() === h.toLowerCase();
  }
  function c(u, h) {
    const n = {
      host: u.host,
      scheme: u.scheme,
      userinfo: u.userinfo,
      port: u.port,
      path: u.path,
      query: u.query,
      nid: u.nid,
      nss: u.nss,
      uuid: u.uuid,
      fragment: u.fragment,
      reference: u.reference,
      resourceName: u.resourceName,
      secure: u.secure,
      error: ""
    }, m = Object.assign({}, h), v = [], p = i[(m.scheme || n.scheme || "").toLowerCase()];
    p && p.serialize && p.serialize(n, m), n.path !== void 0 && (m.skipEscape ? n.path = unescape(n.path) : (n.path = escape(n.path), n.scheme !== void 0 && (n.path = n.path.split("%3A").join(":")))), m.reference !== "suffix" && n.scheme && v.push(n.scheme, ":");
    const y = s(n, m);
    if (y !== void 0 && (m.reference !== "suffix" && v.push("//"), v.push(y), n.path && n.path.charAt(0) !== "/" && v.push("/")), n.path !== void 0) {
      let $ = n.path;
      !m.absolutePath && (!p || !p.absolutePath) && ($ = f($)), y === void 0 && ($ = $.replace(/^\/\//u, "/%2F")), v.push($);
    }
    return n.query !== void 0 && v.push("?", n.query), n.fragment !== void 0 && v.push("#", n.fragment), v.join("");
  }
  const g = Array.from({ length: 127 }, (u, h) => /[^!"$&'()*+,\-.;=_`a-z{}~]/u.test(String.fromCharCode(h)));
  function E(u) {
    let h = 0;
    for (let n = 0, m = u.length; n < m; ++n)
      if (h = u.charCodeAt(n), h > 126 || g[h])
        return !0;
    return !1;
  }
  const _ = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
  function w(u, h) {
    const n = Object.assign({}, h), m = {
      scheme: void 0,
      userinfo: void 0,
      host: "",
      port: void 0,
      path: "",
      query: void 0,
      fragment: void 0
    }, v = u.indexOf("%") !== -1;
    let p = !1;
    n.reference === "suffix" && (u = (n.scheme ? n.scheme + ":" : "") + "//" + u);
    const y = u.match(_);
    if (y) {
      if (m.scheme = y[1], m.userinfo = y[3], m.host = y[4], m.port = parseInt(y[5], 10), m.path = y[6] || "", m.query = y[7], m.fragment = y[8], isNaN(m.port) && (m.port = y[5]), m.host) {
        const b = t(m.host);
        if (b.isIPV4 === !1) {
          const N = e(b.host, { isIPV4: !1 });
          m.host = N.host.toLowerCase(), p = N.isIPV6;
        } else
          m.host = b.host, p = !0;
      }
      m.scheme === void 0 && m.userinfo === void 0 && m.host === void 0 && m.port === void 0 && !m.path && m.query === void 0 ? m.reference = "same-document" : m.scheme === void 0 ? m.reference = "relative" : m.fragment === void 0 ? m.reference = "absolute" : m.reference = "uri", n.reference && n.reference !== "suffix" && n.reference !== m.reference && (m.error = m.error || "URI is not a " + n.reference + " reference.");
      const $ = i[(n.scheme || m.scheme || "").toLowerCase()];
      if (!n.unicodeSupport && (!$ || !$.unicodeSupport) && m.host && (n.domainHost || $ && $.domainHost) && p === !1 && E(m.host))
        try {
          m.host = URL.domainToASCII(m.host.toLowerCase());
        } catch (b) {
          m.error = m.error || "Host's domain name can not be converted to ASCII: " + b;
        }
      (!$ || $ && !$.skipNormalize) && (v && m.scheme !== void 0 && (m.scheme = unescape(m.scheme)), v && m.host !== void 0 && (m.host = unescape(m.host)), m.path !== void 0 && m.path.length && (m.path = escape(unescape(m.path))), m.fragment !== void 0 && m.fragment.length && (m.fragment = encodeURI(decodeURIComponent(m.fragment)))), $ && $.parse && $.parse(m, n);
    } else
      m.error = m.error || "URI can not be parsed.";
    return m;
  }
  const R = {
    SCHEMES: i,
    normalize: r,
    resolve: a,
    resolveComponents: o,
    equal: l,
    serialize: c,
    parse: w
  };
  return mt.exports = R, mt.exports.default = R, mt.exports.fastUri = R, mt.exports;
}
var Ma;
function qd() {
  if (Ma) return Wt;
  Ma = 1, Object.defineProperty(Wt, "__esModule", { value: !0 });
  const e = uf();
  return e.code = 'require("ajv/dist/runtime/uri").default', Wt.default = e, Wt;
}
var Ua;
function jd() {
  return Ua || (Ua = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
    var t = Pn();
    Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
      return t.KeywordCxt;
    } });
    var f = re();
    Object.defineProperty(e, "_", { enumerable: !0, get: function() {
      return f._;
    } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
      return f.str;
    } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
      return f.stringify;
    } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
      return f.nil;
    } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
      return f.Name;
    } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
      return f.CodeGen;
    } });
    const s = Zi(), d = Nn(), i = af(), r = Xi(), a = re(), o = bn(), l = gn(), c = ie(), g = Dd, E = qd(), _ = (D, O) => new RegExp(D, O);
    _.code = "new RegExp";
    const w = ["removeAdditional", "useDefaults", "coerceTypes"], R = /* @__PURE__ */ new Set([
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
    ]), u = {
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
    }, n = 200;
    function m(D) {
      var O, k, T, S, P, A, K, B, X, Z, I, C, q, V, x, Y, ne, he, ae, ce, se, we, de, He, xe;
      const Pe = D.strict, Be = (O = D.code) === null || O === void 0 ? void 0 : O.optimize, ft = Be === !0 || Be === void 0 ? 1 : Be || 0, dt = (T = (k = D.code) === null || k === void 0 ? void 0 : k.regExp) !== null && T !== void 0 ? T : _, jn = (S = D.uriResolver) !== null && S !== void 0 ? S : E.default;
      return {
        strictSchema: (A = (P = D.strictSchema) !== null && P !== void 0 ? P : Pe) !== null && A !== void 0 ? A : !0,
        strictNumbers: (B = (K = D.strictNumbers) !== null && K !== void 0 ? K : Pe) !== null && B !== void 0 ? B : !0,
        strictTypes: (Z = (X = D.strictTypes) !== null && X !== void 0 ? X : Pe) !== null && Z !== void 0 ? Z : "log",
        strictTuples: (C = (I = D.strictTuples) !== null && I !== void 0 ? I : Pe) !== null && C !== void 0 ? C : "log",
        strictRequired: (V = (q = D.strictRequired) !== null && q !== void 0 ? q : Pe) !== null && V !== void 0 ? V : !1,
        code: D.code ? { ...D.code, optimize: ft, regExp: dt } : { optimize: ft, regExp: dt },
        loopRequired: (x = D.loopRequired) !== null && x !== void 0 ? x : n,
        loopEnum: (Y = D.loopEnum) !== null && Y !== void 0 ? Y : n,
        meta: (ne = D.meta) !== null && ne !== void 0 ? ne : !0,
        messages: (he = D.messages) !== null && he !== void 0 ? he : !0,
        inlineRefs: (ae = D.inlineRefs) !== null && ae !== void 0 ? ae : !0,
        schemaId: (ce = D.schemaId) !== null && ce !== void 0 ? ce : "$id",
        addUsedSchema: (se = D.addUsedSchema) !== null && se !== void 0 ? se : !0,
        validateSchema: (we = D.validateSchema) !== null && we !== void 0 ? we : !0,
        validateFormats: (de = D.validateFormats) !== null && de !== void 0 ? de : !0,
        unicodeRegExp: (He = D.unicodeRegExp) !== null && He !== void 0 ? He : !0,
        int32range: (xe = D.int32range) !== null && xe !== void 0 ? xe : !0,
        uriResolver: jn
      };
    }
    class v {
      constructor(O = {}) {
        this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), O = this.opts = { ...O, ...m(O) };
        const { es5: k, lines: T } = this.opts.code;
        this.scope = new a.ValueScope({ scope: {}, prefixes: R, es5: k, lines: T }), this.logger = H(O.logger);
        const S = O.validateFormats;
        O.validateFormats = !1, this.RULES = (0, i.getRules)(), p.call(this, u, O, "NOT SUPPORTED"), p.call(this, h, O, "DEPRECATED", "warn"), this._metaOpts = L.call(this), O.formats && b.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), O.keywords && N.call(this, O.keywords), typeof O.meta == "object" && this.addMetaSchema(O.meta), $.call(this), O.validateFormats = S;
      }
      _addVocabularies() {
        this.addKeyword("$async");
      }
      _addDefaultMetaSchema() {
        const { $data: O, meta: k, schemaId: T } = this.opts;
        let S = g;
        T === "id" && (S = { ...g }, S.id = S.$id, delete S.$id), k && O && this.addMetaSchema(S, S[T], !1);
      }
      defaultMeta() {
        const { meta: O, schemaId: k } = this.opts;
        return this.opts.defaultMeta = typeof O == "object" ? O[k] || O : void 0;
      }
      validate(O, k) {
        let T;
        if (typeof O == "string") {
          if (T = this.getSchema(O), !T)
            throw new Error(`no schema with key or ref "${O}"`);
        } else
          T = this.compile(O);
        const S = T(k);
        return "$async" in T || (this.errors = T.errors), S;
      }
      compile(O, k) {
        const T = this._addSchema(O, k);
        return T.validate || this._compileSchemaEnv(T);
      }
      compileAsync(O, k) {
        if (typeof this.opts.loadSchema != "function")
          throw new Error("options.loadSchema should be a function");
        const { loadSchema: T } = this.opts;
        return S.call(this, O, k);
        async function S(Z, I) {
          await P.call(this, Z.$schema);
          const C = this._addSchema(Z, I);
          return C.validate || A.call(this, C);
        }
        async function P(Z) {
          Z && !this.getSchema(Z) && await S.call(this, { $ref: Z }, !0);
        }
        async function A(Z) {
          try {
            return this._compileSchemaEnv(Z);
          } catch (I) {
            if (!(I instanceof d.default))
              throw I;
            return K.call(this, I), await B.call(this, I.missingSchema), A.call(this, Z);
          }
        }
        function K({ missingSchema: Z, missingRef: I }) {
          if (this.refs[Z])
            throw new Error(`AnySchema ${Z} is loaded but ${I} cannot be resolved`);
        }
        async function B(Z) {
          const I = await X.call(this, Z);
          this.refs[Z] || await P.call(this, I.$schema), this.refs[Z] || this.addSchema(I, Z, k);
        }
        async function X(Z) {
          const I = this._loading[Z];
          if (I)
            return I;
          try {
            return await (this._loading[Z] = T(Z));
          } finally {
            delete this._loading[Z];
          }
        }
      }
      // Adds schema to the instance
      addSchema(O, k, T, S = this.opts.validateSchema) {
        if (Array.isArray(O)) {
          for (const A of O)
            this.addSchema(A, void 0, T, S);
          return this;
        }
        let P;
        if (typeof O == "object") {
          const { schemaId: A } = this.opts;
          if (P = O[A], P !== void 0 && typeof P != "string")
            throw new Error(`schema ${A} must be string`);
        }
        return k = (0, o.normalizeId)(k || P), this._checkUnique(k), this.schemas[k] = this._addSchema(O, T, k, S, !0), this;
      }
      // Add schema that will be used to validate other schemas
      // options in META_IGNORE_OPTIONS are alway set to false
      addMetaSchema(O, k, T = this.opts.validateSchema) {
        return this.addSchema(O, k, !0, T), this;
      }
      //  Validate schema against its meta-schema
      validateSchema(O, k) {
        if (typeof O == "boolean")
          return !0;
        let T;
        if (T = O.$schema, T !== void 0 && typeof T != "string")
          throw new Error("$schema must be a string");
        if (T = T || this.opts.defaultMeta || this.defaultMeta(), !T)
          return this.logger.warn("meta-schema not available"), this.errors = null, !0;
        const S = this.validate(T, O);
        if (!S && k) {
          const P = "schema is invalid: " + this.errorsText();
          if (this.opts.validateSchema === "log")
            this.logger.error(P);
          else
            throw new Error(P);
        }
        return S;
      }
      // Get compiled schema by `key` or `ref`.
      // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
      getSchema(O) {
        let k;
        for (; typeof (k = y.call(this, O)) == "string"; )
          O = k;
        if (k === void 0) {
          const { schemaId: T } = this.opts, S = new r.SchemaEnv({ schema: {}, schemaId: T });
          if (k = r.resolveSchema.call(this, S, O), !k)
            return;
          this.refs[O] = k;
        }
        return k.validate || this._compileSchemaEnv(k);
      }
      // Remove cached schema(s).
      // If no parameter is passed all schemas but meta-schemas are removed.
      // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
      // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
      removeSchema(O) {
        if (O instanceof RegExp)
          return this._removeAllSchemas(this.schemas, O), this._removeAllSchemas(this.refs, O), this;
        switch (typeof O) {
          case "undefined":
            return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
          case "string": {
            const k = y.call(this, O);
            return typeof k == "object" && this._cache.delete(k.schema), delete this.schemas[O], delete this.refs[O], this;
          }
          case "object": {
            const k = O;
            this._cache.delete(k);
            let T = O[this.opts.schemaId];
            return T && (T = (0, o.normalizeId)(T), delete this.schemas[T], delete this.refs[T]), this;
          }
          default:
            throw new Error("ajv.removeSchema: invalid parameter");
        }
      }
      // add "vocabulary" - a collection of keywords
      addVocabulary(O) {
        for (const k of O)
          this.addKeyword(k);
        return this;
      }
      addKeyword(O, k) {
        let T;
        if (typeof O == "string")
          T = O, typeof k == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), k.keyword = T);
        else if (typeof O == "object" && k === void 0) {
          if (k = O, T = k.keyword, Array.isArray(T) && !T.length)
            throw new Error("addKeywords: keyword must be string or non-empty array");
        } else
          throw new Error("invalid addKeywords parameters");
        if (U.call(this, T, k), !k)
          return (0, c.eachItem)(T, (P) => z.call(this, P)), this;
        W.call(this, k);
        const S = {
          ...k,
          type: (0, l.getJSONTypes)(k.type),
          schemaType: (0, l.getJSONTypes)(k.schemaType)
        };
        return (0, c.eachItem)(T, S.type.length === 0 ? (P) => z.call(this, P, S) : (P) => S.type.forEach((A) => z.call(this, P, S, A))), this;
      }
      getKeyword(O) {
        const k = this.RULES.all[O];
        return typeof k == "object" ? k.definition : !!k;
      }
      // Remove keyword
      removeKeyword(O) {
        const { RULES: k } = this;
        delete k.keywords[O], delete k.all[O];
        for (const T of k.rules) {
          const S = T.rules.findIndex((P) => P.keyword === O);
          S >= 0 && T.rules.splice(S, 1);
        }
        return this;
      }
      // Add format
      addFormat(O, k) {
        return typeof k == "string" && (k = new RegExp(k)), this.formats[O] = k, this;
      }
      errorsText(O = this.errors, { separator: k = ", ", dataVar: T = "data" } = {}) {
        return !O || O.length === 0 ? "No errors" : O.map((S) => `${T}${S.instancePath} ${S.message}`).reduce((S, P) => S + k + P);
      }
      $dataMetaSchema(O, k) {
        const T = this.RULES.all;
        O = JSON.parse(JSON.stringify(O));
        for (const S of k) {
          const P = S.split("/").slice(1);
          let A = O;
          for (const K of P)
            A = A[K];
          for (const K in T) {
            const B = T[K];
            if (typeof B != "object")
              continue;
            const { $data: X } = B.definition, Z = A[K];
            X && Z && (A[K] = G(Z));
          }
        }
        return O;
      }
      _removeAllSchemas(O, k) {
        for (const T in O) {
          const S = O[T];
          (!k || k.test(T)) && (typeof S == "string" ? delete O[T] : S && !S.meta && (this._cache.delete(S.schema), delete O[T]));
        }
      }
      _addSchema(O, k, T, S = this.opts.validateSchema, P = this.opts.addUsedSchema) {
        let A;
        const { schemaId: K } = this.opts;
        if (typeof O == "object")
          A = O[K];
        else {
          if (this.opts.jtd)
            throw new Error("schema must be object");
          if (typeof O != "boolean")
            throw new Error("schema must be object or boolean");
        }
        let B = this._cache.get(O);
        if (B !== void 0)
          return B;
        T = (0, o.normalizeId)(A || T);
        const X = o.getSchemaRefs.call(this, O, T);
        return B = new r.SchemaEnv({ schema: O, schemaId: K, meta: k, baseId: T, localRefs: X }), this._cache.set(B.schema, B), P && !T.startsWith("#") && (T && this._checkUnique(T), this.refs[T] = B), S && this.validateSchema(O, !0), B;
      }
      _checkUnique(O) {
        if (this.schemas[O] || this.refs[O])
          throw new Error(`schema with key or id "${O}" already exists`);
      }
      _compileSchemaEnv(O) {
        if (O.meta ? this._compileMetaSchema(O) : r.compileSchema.call(this, O), !O.validate)
          throw new Error("ajv implementation error");
        return O.validate;
      }
      _compileMetaSchema(O) {
        const k = this.opts;
        this.opts = this._metaOpts;
        try {
          r.compileSchema.call(this, O);
        } finally {
          this.opts = k;
        }
      }
    }
    v.ValidationError = s.default, v.MissingRefError = d.default, e.default = v;
    function p(D, O, k, T = "error") {
      for (const S in D) {
        const P = S;
        P in O && this.logger[T](`${k}: option ${S}. ${D[P]}`);
      }
    }
    function y(D) {
      return D = (0, o.normalizeId)(D), this.schemas[D] || this.refs[D];
    }
    function $() {
      const D = this.opts.schemas;
      if (D)
        if (Array.isArray(D))
          this.addSchema(D);
        else
          for (const O in D)
            this.addSchema(D[O], O);
    }
    function b() {
      for (const D in this.opts.formats) {
        const O = this.opts.formats[D];
        O && this.addFormat(D, O);
      }
    }
    function N(D) {
      if (Array.isArray(D)) {
        this.addVocabulary(D);
        return;
      }
      this.logger.warn("keywords option as map is deprecated, pass array");
      for (const O in D) {
        const k = D[O];
        k.keyword || (k.keyword = O), this.addKeyword(k);
      }
    }
    function L() {
      const D = { ...this.opts };
      for (const O of w)
        delete D[O];
      return D;
    }
    const F = { log() {
    }, warn() {
    }, error() {
    } };
    function H(D) {
      if (D === !1)
        return F;
      if (D === void 0)
        return console;
      if (D.log && D.warn && D.error)
        return D;
      throw new Error("logger must implement log, warn and error methods");
    }
    const M = /^[a-z_$][a-z0-9_$:-]*$/i;
    function U(D, O) {
      const { RULES: k } = this;
      if ((0, c.eachItem)(D, (T) => {
        if (k.keywords[T])
          throw new Error(`Keyword ${T} is already defined`);
        if (!M.test(T))
          throw new Error(`Keyword ${T} has invalid name`);
      }), !!O && O.$data && !("code" in O || "validate" in O))
        throw new Error('$data keyword must have "code" or "validate" function');
    }
    function z(D, O, k) {
      var T;
      const S = O?.post;
      if (k && S)
        throw new Error('keyword with "post" flag cannot have "type"');
      const { RULES: P } = this;
      let A = S ? P.post : P.rules.find(({ type: B }) => B === k);
      if (A || (A = { type: k, rules: [] }, P.rules.push(A)), P.keywords[D] = !0, !O)
        return;
      const K = {
        keyword: D,
        definition: {
          ...O,
          type: (0, l.getJSONTypes)(O.type),
          schemaType: (0, l.getJSONTypes)(O.schemaType)
        }
      };
      O.before ? J.call(this, A, K, O.before) : A.rules.push(K), P.all[D] = K, (T = O.implements) === null || T === void 0 || T.forEach((B) => this.addKeyword(B));
    }
    function J(D, O, k) {
      const T = D.rules.findIndex((S) => S.keyword === k);
      T >= 0 ? D.rules.splice(T, 0, O) : (D.rules.push(O), this.logger.warn(`rule ${k} is not defined`));
    }
    function W(D) {
      let { metaSchema: O } = D;
      O !== void 0 && (D.$data && this.opts.$data && (O = G(O)), D.validateSchema = this.compile(O, !0));
    }
    const j = {
      $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
    };
    function G(D) {
      return { anyOf: [D, j] };
    }
  }($s)), $s;
}
var Jt = {}, Zt = {}, Xt = {}, Va;
function Fd() {
  if (Va) return Xt;
  Va = 1, Object.defineProperty(Xt, "__esModule", { value: !0 });
  const e = {
    keyword: "id",
    code() {
      throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
    }
  };
  return Xt.default = e, Xt;
}
var Ve = {}, za;
function Md() {
  if (za) return Ve;
  za = 1, Object.defineProperty(Ve, "__esModule", { value: !0 }), Ve.callRef = Ve.getValidate = void 0;
  const e = Nn(), t = Te(), f = re(), s = Ge(), d = Xi(), i = ie(), r = {
    keyword: "$ref",
    schemaType: "string",
    code(l) {
      const { gen: c, schema: g, it: E } = l, { baseId: _, schemaEnv: w, validateName: R, opts: u, self: h } = E, { root: n } = w;
      if ((g === "#" || g === "#/") && _ === n.baseId)
        return v();
      const m = d.resolveRef.call(h, n, _, g);
      if (m === void 0)
        throw new e.default(E.opts.uriResolver, _, g);
      if (m instanceof d.SchemaEnv)
        return p(m);
      return y(m);
      function v() {
        if (w === n)
          return o(l, R, w, w.$async);
        const $ = c.scopeValue("root", { ref: n });
        return o(l, (0, f._)`${$}.validate`, n, n.$async);
      }
      function p($) {
        const b = a(l, $);
        o(l, b, $, $.$async);
      }
      function y($) {
        const b = c.scopeValue("schema", u.code.source === !0 ? { ref: $, code: (0, f.stringify)($) } : { ref: $ }), N = c.name("valid"), L = l.subschema({
          schema: $,
          dataTypes: [],
          schemaPath: f.nil,
          topSchemaRef: b,
          errSchemaPath: g
        }, N);
        l.mergeEvaluated(L), l.ok(N);
      }
    }
  };
  function a(l, c) {
    const { gen: g } = l;
    return c.validate ? g.scopeValue("validate", { ref: c.validate }) : (0, f._)`${g.scopeValue("wrapper", { ref: c })}.validate`;
  }
  Ve.getValidate = a;
  function o(l, c, g, E) {
    const { gen: _, it: w } = l, { allErrors: R, schemaEnv: u, opts: h } = w, n = h.passContext ? s.default.this : f.nil;
    E ? m() : v();
    function m() {
      if (!u.$async)
        throw new Error("async schema referenced by sync schema");
      const $ = _.let("valid");
      _.try(() => {
        _.code((0, f._)`await ${(0, t.callValidateCode)(l, c, n)}`), y(c), R || _.assign($, !0);
      }, (b) => {
        _.if((0, f._)`!(${b} instanceof ${w.ValidationError})`, () => _.throw(b)), p(b), R || _.assign($, !1);
      }), l.ok($);
    }
    function v() {
      l.result((0, t.callValidateCode)(l, c, n), () => y(c), () => p(c));
    }
    function p($) {
      const b = (0, f._)`${$}.errors`;
      _.assign(s.default.vErrors, (0, f._)`${s.default.vErrors} === null ? ${b} : ${s.default.vErrors}.concat(${b})`), _.assign(s.default.errors, (0, f._)`${s.default.vErrors}.length`);
    }
    function y($) {
      var b;
      if (!w.opts.unevaluated)
        return;
      const N = (b = g?.validate) === null || b === void 0 ? void 0 : b.evaluated;
      if (w.props !== !0)
        if (N && !N.dynamicProps)
          N.props !== void 0 && (w.props = i.mergeEvaluated.props(_, N.props, w.props));
        else {
          const L = _.var("props", (0, f._)`${$}.evaluated.props`);
          w.props = i.mergeEvaluated.props(_, L, w.props, f.Name);
        }
      if (w.items !== !0)
        if (N && !N.dynamicItems)
          N.items !== void 0 && (w.items = i.mergeEvaluated.items(_, N.items, w.items));
        else {
          const L = _.var("items", (0, f._)`${$}.evaluated.items`);
          w.items = i.mergeEvaluated.items(_, L, w.items, f.Name);
        }
    }
  }
  return Ve.callRef = o, Ve.default = r, Ve;
}
var Ga;
function Ud() {
  if (Ga) return Zt;
  Ga = 1, Object.defineProperty(Zt, "__esModule", { value: !0 });
  const e = Fd(), t = Md(), f = [
    "$schema",
    "$id",
    "$defs",
    "$vocabulary",
    { keyword: "$comment" },
    "definitions",
    e.default,
    t.default
  ];
  return Zt.default = f, Zt;
}
var Yt = {}, Qt = {}, Ka;
function Vd() {
  if (Ka) return Qt;
  Ka = 1, Object.defineProperty(Qt, "__esModule", { value: !0 });
  const e = re(), t = e.operators, f = {
    maximum: { okStr: "<=", ok: t.LTE, fail: t.GT },
    minimum: { okStr: ">=", ok: t.GTE, fail: t.LT },
    exclusiveMaximum: { okStr: "<", ok: t.LT, fail: t.GTE },
    exclusiveMinimum: { okStr: ">", ok: t.GT, fail: t.LTE }
  }, s = {
    message: ({ keyword: i, schemaCode: r }) => (0, e.str)`must be ${f[i].okStr} ${r}`,
    params: ({ keyword: i, schemaCode: r }) => (0, e._)`{comparison: ${f[i].okStr}, limit: ${r}}`
  }, d = {
    keyword: Object.keys(f),
    type: "number",
    schemaType: "number",
    $data: !0,
    error: s,
    code(i) {
      const { keyword: r, data: a, schemaCode: o } = i;
      i.fail$data((0, e._)`${a} ${f[r].fail} ${o} || isNaN(${a})`);
    }
  };
  return Qt.default = d, Qt;
}
var er = {}, Ha;
function zd() {
  if (Ha) return er;
  Ha = 1, Object.defineProperty(er, "__esModule", { value: !0 });
  const e = re(), f = {
    keyword: "multipleOf",
    type: "number",
    schemaType: "number",
    $data: !0,
    error: {
      message: ({ schemaCode: s }) => (0, e.str)`must be multiple of ${s}`,
      params: ({ schemaCode: s }) => (0, e._)`{multipleOf: ${s}}`
    },
    code(s) {
      const { gen: d, data: i, schemaCode: r, it: a } = s, o = a.opts.multipleOfPrecision, l = d.let("res"), c = o ? (0, e._)`Math.abs(Math.round(${l}) - ${l}) > 1e-${o}` : (0, e._)`${l} !== parseInt(${l})`;
      s.fail$data((0, e._)`(${r} === 0 || (${l} = ${i}/${r}, ${c}))`);
    }
  };
  return er.default = f, er;
}
var tr = {}, rr = {}, xa;
function Gd() {
  if (xa) return rr;
  xa = 1, Object.defineProperty(rr, "__esModule", { value: !0 });
  function e(t) {
    const f = t.length;
    let s = 0, d = 0, i;
    for (; d < f; )
      s++, i = t.charCodeAt(d++), i >= 55296 && i <= 56319 && d < f && (i = t.charCodeAt(d), (i & 64512) === 56320 && d++);
    return s;
  }
  return rr.default = e, e.code = 'require("ajv/dist/runtime/ucs2length").default', rr;
}
var Ba;
function Kd() {
  if (Ba) return tr;
  Ba = 1, Object.defineProperty(tr, "__esModule", { value: !0 });
  const e = re(), t = ie(), f = Gd(), d = {
    keyword: ["maxLength", "minLength"],
    type: "string",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: i, schemaCode: r }) {
        const a = i === "maxLength" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${a} than ${r} characters`;
      },
      params: ({ schemaCode: i }) => (0, e._)`{limit: ${i}}`
    },
    code(i) {
      const { keyword: r, data: a, schemaCode: o, it: l } = i, c = r === "maxLength" ? e.operators.GT : e.operators.LT, g = l.opts.unicode === !1 ? (0, e._)`${a}.length` : (0, e._)`${(0, t.useFunc)(i.gen, f.default)}(${a})`;
      i.fail$data((0, e._)`${g} ${c} ${o}`);
    }
  };
  return tr.default = d, tr;
}
var nr = {}, Wa;
function Hd() {
  if (Wa) return nr;
  Wa = 1, Object.defineProperty(nr, "__esModule", { value: !0 });
  const e = Te(), t = re(), s = {
    keyword: "pattern",
    type: "string",
    schemaType: "string",
    $data: !0,
    error: {
      message: ({ schemaCode: d }) => (0, t.str)`must match pattern "${d}"`,
      params: ({ schemaCode: d }) => (0, t._)`{pattern: ${d}}`
    },
    code(d) {
      const { data: i, $data: r, schema: a, schemaCode: o, it: l } = d, c = l.opts.unicodeRegExp ? "u" : "", g = r ? (0, t._)`(new RegExp(${o}, ${c}))` : (0, e.usePattern)(d, a);
      d.fail$data((0, t._)`!${g}.test(${i})`);
    }
  };
  return nr.default = s, nr;
}
var sr = {}, Ja;
function xd() {
  if (Ja) return sr;
  Ja = 1, Object.defineProperty(sr, "__esModule", { value: !0 });
  const e = re(), f = {
    keyword: ["maxProperties", "minProperties"],
    type: "object",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: s, schemaCode: d }) {
        const i = s === "maxProperties" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${i} than ${d} properties`;
      },
      params: ({ schemaCode: s }) => (0, e._)`{limit: ${s}}`
    },
    code(s) {
      const { keyword: d, data: i, schemaCode: r } = s, a = d === "maxProperties" ? e.operators.GT : e.operators.LT;
      s.fail$data((0, e._)`Object.keys(${i}).length ${a} ${r}`);
    }
  };
  return sr.default = f, sr;
}
var ir = {}, Za;
function Bd() {
  if (Za) return ir;
  Za = 1, Object.defineProperty(ir, "__esModule", { value: !0 });
  const e = Te(), t = re(), f = ie(), d = {
    keyword: "required",
    type: "object",
    schemaType: "array",
    $data: !0,
    error: {
      message: ({ params: { missingProperty: i } }) => (0, t.str)`must have required property '${i}'`,
      params: ({ params: { missingProperty: i } }) => (0, t._)`{missingProperty: ${i}}`
    },
    code(i) {
      const { gen: r, schema: a, schemaCode: o, data: l, $data: c, it: g } = i, { opts: E } = g;
      if (!c && a.length === 0)
        return;
      const _ = a.length >= E.loopRequired;
      if (g.allErrors ? w() : R(), E.strictRequired) {
        const n = i.parentSchema.properties, { definedProperties: m } = i.it;
        for (const v of a)
          if (n?.[v] === void 0 && !m.has(v)) {
            const p = g.schemaEnv.baseId + g.errSchemaPath, y = `required property "${v}" is not defined at "${p}" (strictRequired)`;
            (0, f.checkStrictMode)(g, y, g.opts.strictRequired);
          }
      }
      function w() {
        if (_ || c)
          i.block$data(t.nil, u);
        else
          for (const n of a)
            (0, e.checkReportMissingProp)(i, n);
      }
      function R() {
        const n = r.let("missing");
        if (_ || c) {
          const m = r.let("valid", !0);
          i.block$data(m, () => h(n, m)), i.ok(m);
        } else
          r.if((0, e.checkMissingProp)(i, a, n)), (0, e.reportMissingProp)(i, n), r.else();
      }
      function u() {
        r.forOf("prop", o, (n) => {
          i.setParams({ missingProperty: n }), r.if((0, e.noPropertyInData)(r, l, n, E.ownProperties), () => i.error());
        });
      }
      function h(n, m) {
        i.setParams({ missingProperty: n }), r.forOf(n, o, () => {
          r.assign(m, (0, e.propertyInData)(r, l, n, E.ownProperties)), r.if((0, t.not)(m), () => {
            i.error(), r.break();
          });
        }, t.nil);
      }
    }
  };
  return ir.default = d, ir;
}
var or = {}, Xa;
function Wd() {
  if (Xa) return or;
  Xa = 1, Object.defineProperty(or, "__esModule", { value: !0 });
  const e = re(), f = {
    keyword: ["maxItems", "minItems"],
    type: "array",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: s, schemaCode: d }) {
        const i = s === "maxItems" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${i} than ${d} items`;
      },
      params: ({ schemaCode: s }) => (0, e._)`{limit: ${s}}`
    },
    code(s) {
      const { keyword: d, data: i, schemaCode: r } = s, a = d === "maxItems" ? e.operators.GT : e.operators.LT;
      s.fail$data((0, e._)`${i}.length ${a} ${r}`);
    }
  };
  return or.default = f, or;
}
var ar = {}, cr = {}, Ya;
function Yi() {
  if (Ya) return cr;
  Ya = 1, Object.defineProperty(cr, "__esModule", { value: !0 });
  const e = Rn();
  return e.code = 'require("ajv/dist/runtime/equal").default', cr.default = e, cr;
}
var Qa;
function Jd() {
  if (Qa) return ar;
  Qa = 1, Object.defineProperty(ar, "__esModule", { value: !0 });
  const e = gn(), t = re(), f = ie(), s = Yi(), i = {
    keyword: "uniqueItems",
    type: "array",
    schemaType: "boolean",
    $data: !0,
    error: {
      message: ({ params: { i: r, j: a } }) => (0, t.str)`must NOT have duplicate items (items ## ${a} and ${r} are identical)`,
      params: ({ params: { i: r, j: a } }) => (0, t._)`{i: ${r}, j: ${a}}`
    },
    code(r) {
      const { gen: a, data: o, $data: l, schema: c, parentSchema: g, schemaCode: E, it: _ } = r;
      if (!l && !c)
        return;
      const w = a.let("valid"), R = g.items ? (0, e.getSchemaTypes)(g.items) : [];
      r.block$data(w, u, (0, t._)`${E} === false`), r.ok(w);
      function u() {
        const v = a.let("i", (0, t._)`${o}.length`), p = a.let("j");
        r.setParams({ i: v, j: p }), a.assign(w, !0), a.if((0, t._)`${v} > 1`, () => (h() ? n : m)(v, p));
      }
      function h() {
        return R.length > 0 && !R.some((v) => v === "object" || v === "array");
      }
      function n(v, p) {
        const y = a.name("item"), $ = (0, e.checkDataTypes)(R, y, _.opts.strictNumbers, e.DataType.Wrong), b = a.const("indices", (0, t._)`{}`);
        a.for((0, t._)`;${v}--;`, () => {
          a.let(y, (0, t._)`${o}[${v}]`), a.if($, (0, t._)`continue`), R.length > 1 && a.if((0, t._)`typeof ${y} == "string"`, (0, t._)`${y} += "_"`), a.if((0, t._)`typeof ${b}[${y}] == "number"`, () => {
            a.assign(p, (0, t._)`${b}[${y}]`), r.error(), a.assign(w, !1).break();
          }).code((0, t._)`${b}[${y}] = ${v}`);
        });
      }
      function m(v, p) {
        const y = (0, f.useFunc)(a, s.default), $ = a.name("outer");
        a.label($).for((0, t._)`;${v}--;`, () => a.for((0, t._)`${p} = ${v}; ${p}--;`, () => a.if((0, t._)`${y}(${o}[${v}], ${o}[${p}])`, () => {
          r.error(), a.assign(w, !1).break($);
        })));
      }
    }
  };
  return ar.default = i, ar;
}
var ur = {}, ec;
function Zd() {
  if (ec) return ur;
  ec = 1, Object.defineProperty(ur, "__esModule", { value: !0 });
  const e = re(), t = ie(), f = Yi(), d = {
    keyword: "const",
    $data: !0,
    error: {
      message: "must be equal to constant",
      params: ({ schemaCode: i }) => (0, e._)`{allowedValue: ${i}}`
    },
    code(i) {
      const { gen: r, data: a, $data: o, schemaCode: l, schema: c } = i;
      o || c && typeof c == "object" ? i.fail$data((0, e._)`!${(0, t.useFunc)(r, f.default)}(${a}, ${l})`) : i.fail((0, e._)`${c} !== ${a}`);
    }
  };
  return ur.default = d, ur;
}
var lr = {}, tc;
function Xd() {
  if (tc) return lr;
  tc = 1, Object.defineProperty(lr, "__esModule", { value: !0 });
  const e = re(), t = ie(), f = Yi(), d = {
    keyword: "enum",
    schemaType: "array",
    $data: !0,
    error: {
      message: "must be equal to one of the allowed values",
      params: ({ schemaCode: i }) => (0, e._)`{allowedValues: ${i}}`
    },
    code(i) {
      const { gen: r, data: a, $data: o, schema: l, schemaCode: c, it: g } = i;
      if (!o && l.length === 0)
        throw new Error("enum must have non-empty array");
      const E = l.length >= g.opts.loopEnum;
      let _;
      const w = () => _ ?? (_ = (0, t.useFunc)(r, f.default));
      let R;
      if (E || o)
        R = r.let("valid"), i.block$data(R, u);
      else {
        if (!Array.isArray(l))
          throw new Error("ajv implementation error");
        const n = r.const("vSchema", c);
        R = (0, e.or)(...l.map((m, v) => h(n, v)));
      }
      i.pass(R);
      function u() {
        r.assign(R, !1), r.forOf("v", c, (n) => r.if((0, e._)`${w()}(${a}, ${n})`, () => r.assign(R, !0).break()));
      }
      function h(n, m) {
        const v = l[m];
        return typeof v == "object" && v !== null ? (0, e._)`${w()}(${a}, ${n}[${m}])` : (0, e._)`${a} === ${v}`;
      }
    }
  };
  return lr.default = d, lr;
}
var rc;
function Yd() {
  if (rc) return Yt;
  rc = 1, Object.defineProperty(Yt, "__esModule", { value: !0 });
  const e = Vd(), t = zd(), f = Kd(), s = Hd(), d = xd(), i = Bd(), r = Wd(), a = Jd(), o = Zd(), l = Xd(), c = [
    // number
    e.default,
    t.default,
    // string
    f.default,
    s.default,
    // object
    d.default,
    i.default,
    // array
    r.default,
    a.default,
    // any
    { keyword: "type", schemaType: ["string", "array"] },
    { keyword: "nullable", schemaType: "boolean" },
    o.default,
    l.default
  ];
  return Yt.default = c, Yt;
}
var fr = {}, st = {}, nc;
function lf() {
  if (nc) return st;
  nc = 1, Object.defineProperty(st, "__esModule", { value: !0 }), st.validateAdditionalItems = void 0;
  const e = re(), t = ie(), s = {
    keyword: "additionalItems",
    type: "array",
    schemaType: ["boolean", "object"],
    before: "uniqueItems",
    error: {
      message: ({ params: { len: i } }) => (0, e.str)`must NOT have more than ${i} items`,
      params: ({ params: { len: i } }) => (0, e._)`{limit: ${i}}`
    },
    code(i) {
      const { parentSchema: r, it: a } = i, { items: o } = r;
      if (!Array.isArray(o)) {
        (0, t.checkStrictMode)(a, '"additionalItems" is ignored when "items" is not an array of schemas');
        return;
      }
      d(i, o);
    }
  };
  function d(i, r) {
    const { gen: a, schema: o, data: l, keyword: c, it: g } = i;
    g.items = !0;
    const E = a.const("len", (0, e._)`${l}.length`);
    if (o === !1)
      i.setParams({ len: r.length }), i.pass((0, e._)`${E} <= ${r.length}`);
    else if (typeof o == "object" && !(0, t.alwaysValidSchema)(g, o)) {
      const w = a.var("valid", (0, e._)`${E} <= ${r.length}`);
      a.if((0, e.not)(w), () => _(w)), i.ok(w);
    }
    function _(w) {
      a.forRange("i", r.length, E, (R) => {
        i.subschema({ keyword: c, dataProp: R, dataPropType: t.Type.Num }, w), g.allErrors || a.if((0, e.not)(w), () => a.break());
      });
    }
  }
  return st.validateAdditionalItems = d, st.default = s, st;
}
var dr = {}, it = {}, sc;
function ff() {
  if (sc) return it;
  sc = 1, Object.defineProperty(it, "__esModule", { value: !0 }), it.validateTuple = void 0;
  const e = re(), t = ie(), f = Te(), s = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "array", "boolean"],
    before: "uniqueItems",
    code(i) {
      const { schema: r, it: a } = i;
      if (Array.isArray(r))
        return d(i, "additionalItems", r);
      a.items = !0, !(0, t.alwaysValidSchema)(a, r) && i.ok((0, f.validateArray)(i));
    }
  };
  function d(i, r, a = i.schema) {
    const { gen: o, parentSchema: l, data: c, keyword: g, it: E } = i;
    R(l), E.opts.unevaluated && a.length && E.items !== !0 && (E.items = t.mergeEvaluated.items(o, a.length, E.items));
    const _ = o.name("valid"), w = o.const("len", (0, e._)`${c}.length`);
    a.forEach((u, h) => {
      (0, t.alwaysValidSchema)(E, u) || (o.if((0, e._)`${w} > ${h}`, () => i.subschema({
        keyword: g,
        schemaProp: h,
        dataProp: h
      }, _)), i.ok(_));
    });
    function R(u) {
      const { opts: h, errSchemaPath: n } = E, m = a.length, v = m === u.minItems && (m === u.maxItems || u[r] === !1);
      if (h.strictTuples && !v) {
        const p = `"${g}" is ${m}-tuple, but minItems or maxItems/${r} are not specified or different at path "${n}"`;
        (0, t.checkStrictMode)(E, p, h.strictTuples);
      }
    }
  }
  return it.validateTuple = d, it.default = s, it;
}
var ic;
function Qd() {
  if (ic) return dr;
  ic = 1, Object.defineProperty(dr, "__esModule", { value: !0 });
  const e = ff(), t = {
    keyword: "prefixItems",
    type: "array",
    schemaType: ["array"],
    before: "uniqueItems",
    code: (f) => (0, e.validateTuple)(f, "items")
  };
  return dr.default = t, dr;
}
var hr = {}, oc;
function eh() {
  if (oc) return hr;
  oc = 1, Object.defineProperty(hr, "__esModule", { value: !0 });
  const e = re(), t = ie(), f = Te(), s = lf(), i = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    error: {
      message: ({ params: { len: r } }) => (0, e.str)`must NOT have more than ${r} items`,
      params: ({ params: { len: r } }) => (0, e._)`{limit: ${r}}`
    },
    code(r) {
      const { schema: a, parentSchema: o, it: l } = r, { prefixItems: c } = o;
      l.items = !0, !(0, t.alwaysValidSchema)(l, a) && (c ? (0, s.validateAdditionalItems)(r, c) : r.ok((0, f.validateArray)(r)));
    }
  };
  return hr.default = i, hr;
}
var mr = {}, ac;
function th() {
  if (ac) return mr;
  ac = 1, Object.defineProperty(mr, "__esModule", { value: !0 });
  const e = re(), t = ie(), s = {
    keyword: "contains",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    trackErrors: !0,
    error: {
      message: ({ params: { min: d, max: i } }) => i === void 0 ? (0, e.str)`must contain at least ${d} valid item(s)` : (0, e.str)`must contain at least ${d} and no more than ${i} valid item(s)`,
      params: ({ params: { min: d, max: i } }) => i === void 0 ? (0, e._)`{minContains: ${d}}` : (0, e._)`{minContains: ${d}, maxContains: ${i}}`
    },
    code(d) {
      const { gen: i, schema: r, parentSchema: a, data: o, it: l } = d;
      let c, g;
      const { minContains: E, maxContains: _ } = a;
      l.opts.next ? (c = E === void 0 ? 1 : E, g = _) : c = 1;
      const w = i.const("len", (0, e._)`${o}.length`);
      if (d.setParams({ min: c, max: g }), g === void 0 && c === 0) {
        (0, t.checkStrictMode)(l, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
        return;
      }
      if (g !== void 0 && c > g) {
        (0, t.checkStrictMode)(l, '"minContains" > "maxContains" is always invalid'), d.fail();
        return;
      }
      if ((0, t.alwaysValidSchema)(l, r)) {
        let m = (0, e._)`${w} >= ${c}`;
        g !== void 0 && (m = (0, e._)`${m} && ${w} <= ${g}`), d.pass(m);
        return;
      }
      l.items = !0;
      const R = i.name("valid");
      g === void 0 && c === 1 ? h(R, () => i.if(R, () => i.break())) : c === 0 ? (i.let(R, !0), g !== void 0 && i.if((0, e._)`${o}.length > 0`, u)) : (i.let(R, !1), u()), d.result(R, () => d.reset());
      function u() {
        const m = i.name("_valid"), v = i.let("count", 0);
        h(m, () => i.if(m, () => n(v)));
      }
      function h(m, v) {
        i.forRange("i", 0, w, (p) => {
          d.subschema({
            keyword: "contains",
            dataProp: p,
            dataPropType: t.Type.Num,
            compositeRule: !0
          }, m), v();
        });
      }
      function n(m) {
        i.code((0, e._)`${m}++`), g === void 0 ? i.if((0, e._)`${m} >= ${c}`, () => i.assign(R, !0).break()) : (i.if((0, e._)`${m} > ${g}`, () => i.assign(R, !1).break()), c === 1 ? i.assign(R, !0) : i.if((0, e._)`${m} >= ${c}`, () => i.assign(R, !0)));
      }
    }
  };
  return mr.default = s, mr;
}
var Ts = {}, cc;
function rh() {
  return cc || (cc = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
    const t = re(), f = ie(), s = Te();
    e.error = {
      message: ({ params: { property: o, depsCount: l, deps: c } }) => {
        const g = l === 1 ? "property" : "properties";
        return (0, t.str)`must have ${g} ${c} when property ${o} is present`;
      },
      params: ({ params: { property: o, depsCount: l, deps: c, missingProperty: g } }) => (0, t._)`{property: ${o},
    missingProperty: ${g},
    depsCount: ${l},
    deps: ${c}}`
      // TODO change to reference
    };
    const d = {
      keyword: "dependencies",
      type: "object",
      schemaType: "object",
      error: e.error,
      code(o) {
        const [l, c] = i(o);
        r(o, l), a(o, c);
      }
    };
    function i({ schema: o }) {
      const l = {}, c = {};
      for (const g in o) {
        if (g === "__proto__")
          continue;
        const E = Array.isArray(o[g]) ? l : c;
        E[g] = o[g];
      }
      return [l, c];
    }
    function r(o, l = o.schema) {
      const { gen: c, data: g, it: E } = o;
      if (Object.keys(l).length === 0)
        return;
      const _ = c.let("missing");
      for (const w in l) {
        const R = l[w];
        if (R.length === 0)
          continue;
        const u = (0, s.propertyInData)(c, g, w, E.opts.ownProperties);
        o.setParams({
          property: w,
          depsCount: R.length,
          deps: R.join(", ")
        }), E.allErrors ? c.if(u, () => {
          for (const h of R)
            (0, s.checkReportMissingProp)(o, h);
        }) : (c.if((0, t._)`${u} && (${(0, s.checkMissingProp)(o, R, _)})`), (0, s.reportMissingProp)(o, _), c.else());
      }
    }
    e.validatePropertyDeps = r;
    function a(o, l = o.schema) {
      const { gen: c, data: g, keyword: E, it: _ } = o, w = c.name("valid");
      for (const R in l)
        (0, f.alwaysValidSchema)(_, l[R]) || (c.if(
          (0, s.propertyInData)(c, g, R, _.opts.ownProperties),
          () => {
            const u = o.subschema({ keyword: E, schemaProp: R }, w);
            o.mergeValidEvaluated(u, w);
          },
          () => c.var(w, !0)
          // TODO var
        ), o.ok(w));
    }
    e.validateSchemaDeps = a, e.default = d;
  }(Ts)), Ts;
}
var pr = {}, uc;
function nh() {
  if (uc) return pr;
  uc = 1, Object.defineProperty(pr, "__esModule", { value: !0 });
  const e = re(), t = ie(), s = {
    keyword: "propertyNames",
    type: "object",
    schemaType: ["object", "boolean"],
    error: {
      message: "property name must be valid",
      params: ({ params: d }) => (0, e._)`{propertyName: ${d.propertyName}}`
    },
    code(d) {
      const { gen: i, schema: r, data: a, it: o } = d;
      if ((0, t.alwaysValidSchema)(o, r))
        return;
      const l = i.name("valid");
      i.forIn("key", a, (c) => {
        d.setParams({ propertyName: c }), d.subschema({
          keyword: "propertyNames",
          data: c,
          dataTypes: ["string"],
          propertyName: c,
          compositeRule: !0
        }, l), i.if((0, e.not)(l), () => {
          d.error(!0), o.allErrors || i.break();
        });
      }), d.ok(l);
    }
  };
  return pr.default = s, pr;
}
var yr = {}, lc;
function df() {
  if (lc) return yr;
  lc = 1, Object.defineProperty(yr, "__esModule", { value: !0 });
  const e = Te(), t = re(), f = Ge(), s = ie(), i = {
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
      const { gen: a, schema: o, parentSchema: l, data: c, errsCount: g, it: E } = r;
      if (!g)
        throw new Error("ajv implementation error");
      const { allErrors: _, opts: w } = E;
      if (E.props = !0, w.removeAdditional !== "all" && (0, s.alwaysValidSchema)(E, o))
        return;
      const R = (0, e.allSchemaProperties)(l.properties), u = (0, e.allSchemaProperties)(l.patternProperties);
      h(), r.ok((0, t._)`${g} === ${f.default.errors}`);
      function h() {
        a.forIn("key", c, (y) => {
          !R.length && !u.length ? v(y) : a.if(n(y), () => v(y));
        });
      }
      function n(y) {
        let $;
        if (R.length > 8) {
          const b = (0, s.schemaRefOrVal)(E, l.properties, "properties");
          $ = (0, e.isOwnProperty)(a, b, y);
        } else R.length ? $ = (0, t.or)(...R.map((b) => (0, t._)`${y} === ${b}`)) : $ = t.nil;
        return u.length && ($ = (0, t.or)($, ...u.map((b) => (0, t._)`${(0, e.usePattern)(r, b)}.test(${y})`))), (0, t.not)($);
      }
      function m(y) {
        a.code((0, t._)`delete ${c}[${y}]`);
      }
      function v(y) {
        if (w.removeAdditional === "all" || w.removeAdditional && o === !1) {
          m(y);
          return;
        }
        if (o === !1) {
          r.setParams({ additionalProperty: y }), r.error(), _ || a.break();
          return;
        }
        if (typeof o == "object" && !(0, s.alwaysValidSchema)(E, o)) {
          const $ = a.name("valid");
          w.removeAdditional === "failing" ? (p(y, $, !1), a.if((0, t.not)($), () => {
            r.reset(), m(y);
          })) : (p(y, $), _ || a.if((0, t.not)($), () => a.break()));
        }
      }
      function p(y, $, b) {
        const N = {
          keyword: "additionalProperties",
          dataProp: y,
          dataPropType: s.Type.Str
        };
        b === !1 && Object.assign(N, {
          compositeRule: !0,
          createErrors: !1,
          allErrors: !1
        }), r.subschema(N, $);
      }
    }
  };
  return yr.default = i, yr;
}
var vr = {}, fc;
function sh() {
  if (fc) return vr;
  fc = 1, Object.defineProperty(vr, "__esModule", { value: !0 });
  const e = Pn(), t = Te(), f = ie(), s = df(), d = {
    keyword: "properties",
    type: "object",
    schemaType: "object",
    code(i) {
      const { gen: r, schema: a, parentSchema: o, data: l, it: c } = i;
      c.opts.removeAdditional === "all" && o.additionalProperties === void 0 && s.default.code(new e.KeywordCxt(c, s.default, "additionalProperties"));
      const g = (0, t.allSchemaProperties)(a);
      for (const u of g)
        c.definedProperties.add(u);
      c.opts.unevaluated && g.length && c.props !== !0 && (c.props = f.mergeEvaluated.props(r, (0, f.toHash)(g), c.props));
      const E = g.filter((u) => !(0, f.alwaysValidSchema)(c, a[u]));
      if (E.length === 0)
        return;
      const _ = r.name("valid");
      for (const u of E)
        w(u) ? R(u) : (r.if((0, t.propertyInData)(r, l, u, c.opts.ownProperties)), R(u), c.allErrors || r.else().var(_, !0), r.endIf()), i.it.definedProperties.add(u), i.ok(_);
      function w(u) {
        return c.opts.useDefaults && !c.compositeRule && a[u].default !== void 0;
      }
      function R(u) {
        i.subschema({
          keyword: "properties",
          schemaProp: u,
          dataProp: u
        }, _);
      }
    }
  };
  return vr.default = d, vr;
}
var _r = {}, dc;
function ih() {
  if (dc) return _r;
  dc = 1, Object.defineProperty(_r, "__esModule", { value: !0 });
  const e = Te(), t = re(), f = ie(), s = ie(), d = {
    keyword: "patternProperties",
    type: "object",
    schemaType: "object",
    code(i) {
      const { gen: r, schema: a, data: o, parentSchema: l, it: c } = i, { opts: g } = c, E = (0, e.allSchemaProperties)(a), _ = E.filter((v) => (0, f.alwaysValidSchema)(c, a[v]));
      if (E.length === 0 || _.length === E.length && (!c.opts.unevaluated || c.props === !0))
        return;
      const w = g.strictSchema && !g.allowMatchingProperties && l.properties, R = r.name("valid");
      c.props !== !0 && !(c.props instanceof t.Name) && (c.props = (0, s.evaluatedPropsToName)(r, c.props));
      const { props: u } = c;
      h();
      function h() {
        for (const v of E)
          w && n(v), c.allErrors ? m(v) : (r.var(R, !0), m(v), r.if(R));
      }
      function n(v) {
        for (const p in w)
          new RegExp(v).test(p) && (0, f.checkStrictMode)(c, `property ${p} matches pattern ${v} (use allowMatchingProperties)`);
      }
      function m(v) {
        r.forIn("key", o, (p) => {
          r.if((0, t._)`${(0, e.usePattern)(i, v)}.test(${p})`, () => {
            const y = _.includes(v);
            y || i.subschema({
              keyword: "patternProperties",
              schemaProp: v,
              dataProp: p,
              dataPropType: s.Type.Str
            }, R), c.opts.unevaluated && u !== !0 ? r.assign((0, t._)`${u}[${p}]`, !0) : !y && !c.allErrors && r.if((0, t.not)(R), () => r.break());
          });
        });
      }
    }
  };
  return _r.default = d, _r;
}
var gr = {}, hc;
function oh() {
  if (hc) return gr;
  hc = 1, Object.defineProperty(gr, "__esModule", { value: !0 });
  const e = ie(), t = {
    keyword: "not",
    schemaType: ["object", "boolean"],
    trackErrors: !0,
    code(f) {
      const { gen: s, schema: d, it: i } = f;
      if ((0, e.alwaysValidSchema)(i, d)) {
        f.fail();
        return;
      }
      const r = s.name("valid");
      f.subschema({
        keyword: "not",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, r), f.failResult(r, () => f.reset(), () => f.error());
    },
    error: { message: "must NOT be valid" }
  };
  return gr.default = t, gr;
}
var $r = {}, mc;
function ah() {
  if (mc) return $r;
  mc = 1, Object.defineProperty($r, "__esModule", { value: !0 });
  const t = {
    keyword: "anyOf",
    schemaType: "array",
    trackErrors: !0,
    code: Te().validateUnion,
    error: { message: "must match a schema in anyOf" }
  };
  return $r.default = t, $r;
}
var Er = {}, pc;
function ch() {
  if (pc) return Er;
  pc = 1, Object.defineProperty(Er, "__esModule", { value: !0 });
  const e = re(), t = ie(), s = {
    keyword: "oneOf",
    schemaType: "array",
    trackErrors: !0,
    error: {
      message: "must match exactly one schema in oneOf",
      params: ({ params: d }) => (0, e._)`{passingSchemas: ${d.passing}}`
    },
    code(d) {
      const { gen: i, schema: r, parentSchema: a, it: o } = d;
      if (!Array.isArray(r))
        throw new Error("ajv implementation error");
      if (o.opts.discriminator && a.discriminator)
        return;
      const l = r, c = i.let("valid", !1), g = i.let("passing", null), E = i.name("_valid");
      d.setParams({ passing: g }), i.block(_), d.result(c, () => d.reset(), () => d.error(!0));
      function _() {
        l.forEach((w, R) => {
          let u;
          (0, t.alwaysValidSchema)(o, w) ? i.var(E, !0) : u = d.subschema({
            keyword: "oneOf",
            schemaProp: R,
            compositeRule: !0
          }, E), R > 0 && i.if((0, e._)`${E} && ${c}`).assign(c, !1).assign(g, (0, e._)`[${g}, ${R}]`).else(), i.if(E, () => {
            i.assign(c, !0), i.assign(g, R), u && d.mergeEvaluated(u, e.Name);
          });
        });
      }
    }
  };
  return Er.default = s, Er;
}
var wr = {}, yc;
function uh() {
  if (yc) return wr;
  yc = 1, Object.defineProperty(wr, "__esModule", { value: !0 });
  const e = ie(), t = {
    keyword: "allOf",
    schemaType: "array",
    code(f) {
      const { gen: s, schema: d, it: i } = f;
      if (!Array.isArray(d))
        throw new Error("ajv implementation error");
      const r = s.name("valid");
      d.forEach((a, o) => {
        if ((0, e.alwaysValidSchema)(i, a))
          return;
        const l = f.subschema({ keyword: "allOf", schemaProp: o }, r);
        f.ok(r), f.mergeEvaluated(l);
      });
    }
  };
  return wr.default = t, wr;
}
var Sr = {}, vc;
function lh() {
  if (vc) return Sr;
  vc = 1, Object.defineProperty(Sr, "__esModule", { value: !0 });
  const e = re(), t = ie(), s = {
    keyword: "if",
    schemaType: ["object", "boolean"],
    trackErrors: !0,
    error: {
      message: ({ params: i }) => (0, e.str)`must match "${i.ifClause}" schema`,
      params: ({ params: i }) => (0, e._)`{failingKeyword: ${i.ifClause}}`
    },
    code(i) {
      const { gen: r, parentSchema: a, it: o } = i;
      a.then === void 0 && a.else === void 0 && (0, t.checkStrictMode)(o, '"if" without "then" and "else" is ignored');
      const l = d(o, "then"), c = d(o, "else");
      if (!l && !c)
        return;
      const g = r.let("valid", !0), E = r.name("_valid");
      if (_(), i.reset(), l && c) {
        const R = r.let("ifClause");
        i.setParams({ ifClause: R }), r.if(E, w("then", R), w("else", R));
      } else l ? r.if(E, w("then")) : r.if((0, e.not)(E), w("else"));
      i.pass(g, () => i.error(!0));
      function _() {
        const R = i.subschema({
          keyword: "if",
          compositeRule: !0,
          createErrors: !1,
          allErrors: !1
        }, E);
        i.mergeEvaluated(R);
      }
      function w(R, u) {
        return () => {
          const h = i.subschema({ keyword: R }, E);
          r.assign(g, E), i.mergeValidEvaluated(h, g), u ? r.assign(u, (0, e._)`${R}`) : i.setParams({ ifClause: R });
        };
      }
    }
  };
  function d(i, r) {
    const a = i.schema[r];
    return a !== void 0 && !(0, t.alwaysValidSchema)(i, a);
  }
  return Sr.default = s, Sr;
}
var Rr = {}, _c;
function fh() {
  if (_c) return Rr;
  _c = 1, Object.defineProperty(Rr, "__esModule", { value: !0 });
  const e = ie(), t = {
    keyword: ["then", "else"],
    schemaType: ["object", "boolean"],
    code({ keyword: f, parentSchema: s, it: d }) {
      s.if === void 0 && (0, e.checkStrictMode)(d, `"${f}" without "if" is ignored`);
    }
  };
  return Rr.default = t, Rr;
}
var gc;
function dh() {
  if (gc) return fr;
  gc = 1, Object.defineProperty(fr, "__esModule", { value: !0 });
  const e = lf(), t = Qd(), f = ff(), s = eh(), d = th(), i = rh(), r = nh(), a = df(), o = sh(), l = ih(), c = oh(), g = ah(), E = ch(), _ = uh(), w = lh(), R = fh();
  function u(h = !1) {
    const n = [
      // any
      c.default,
      g.default,
      E.default,
      _.default,
      w.default,
      R.default,
      // object
      r.default,
      a.default,
      i.default,
      o.default,
      l.default
    ];
    return h ? n.push(t.default, s.default) : n.push(e.default, f.default), n.push(d.default), n;
  }
  return fr.default = u, fr;
}
var br = {}, Pr = {}, $c;
function hh() {
  if ($c) return Pr;
  $c = 1, Object.defineProperty(Pr, "__esModule", { value: !0 });
  const e = re(), f = {
    keyword: "format",
    type: ["number", "string"],
    schemaType: "string",
    $data: !0,
    error: {
      message: ({ schemaCode: s }) => (0, e.str)`must match format "${s}"`,
      params: ({ schemaCode: s }) => (0, e._)`{format: ${s}}`
    },
    code(s, d) {
      const { gen: i, data: r, $data: a, schema: o, schemaCode: l, it: c } = s, { opts: g, errSchemaPath: E, schemaEnv: _, self: w } = c;
      if (!g.validateFormats)
        return;
      a ? R() : u();
      function R() {
        const h = i.scopeValue("formats", {
          ref: w.formats,
          code: g.code.formats
        }), n = i.const("fDef", (0, e._)`${h}[${l}]`), m = i.let("fType"), v = i.let("format");
        i.if((0, e._)`typeof ${n} == "object" && !(${n} instanceof RegExp)`, () => i.assign(m, (0, e._)`${n}.type || "string"`).assign(v, (0, e._)`${n}.validate`), () => i.assign(m, (0, e._)`"string"`).assign(v, n)), s.fail$data((0, e.or)(p(), y()));
        function p() {
          return g.strictSchema === !1 ? e.nil : (0, e._)`${l} && !${v}`;
        }
        function y() {
          const $ = _.$async ? (0, e._)`(${n}.async ? await ${v}(${r}) : ${v}(${r}))` : (0, e._)`${v}(${r})`, b = (0, e._)`(typeof ${v} == "function" ? ${$} : ${v}.test(${r}))`;
          return (0, e._)`${v} && ${v} !== true && ${m} === ${d} && !${b}`;
        }
      }
      function u() {
        const h = w.formats[o];
        if (!h) {
          p();
          return;
        }
        if (h === !0)
          return;
        const [n, m, v] = y(h);
        n === d && s.pass($());
        function p() {
          if (g.strictSchema === !1) {
            w.logger.warn(b());
            return;
          }
          throw new Error(b());
          function b() {
            return `unknown format "${o}" ignored in schema at path "${E}"`;
          }
        }
        function y(b) {
          const N = b instanceof RegExp ? (0, e.regexpCode)(b) : g.code.formats ? (0, e._)`${g.code.formats}${(0, e.getProperty)(o)}` : void 0, L = i.scopeValue("formats", { key: o, ref: b, code: N });
          return typeof b == "object" && !(b instanceof RegExp) ? [b.type || "string", b.validate, (0, e._)`${L}.validate`] : ["string", b, L];
        }
        function $() {
          if (typeof h == "object" && !(h instanceof RegExp) && h.async) {
            if (!_.$async)
              throw new Error("async format in sync schema");
            return (0, e._)`await ${v}(${r})`;
          }
          return typeof m == "function" ? (0, e._)`${v}(${r})` : (0, e._)`${v}.test(${r})`;
        }
      }
    }
  };
  return Pr.default = f, Pr;
}
var Ec;
function mh() {
  if (Ec) return br;
  Ec = 1, Object.defineProperty(br, "__esModule", { value: !0 });
  const t = [hh().default];
  return br.default = t, br;
}
var Ye = {}, wc;
function ph() {
  return wc || (wc = 1, Object.defineProperty(Ye, "__esModule", { value: !0 }), Ye.contentVocabulary = Ye.metadataVocabulary = void 0, Ye.metadataVocabulary = [
    "title",
    "description",
    "default",
    "deprecated",
    "readOnly",
    "writeOnly",
    "examples"
  ], Ye.contentVocabulary = [
    "contentMediaType",
    "contentEncoding",
    "contentSchema"
  ]), Ye;
}
var Sc;
function yh() {
  if (Sc) return Jt;
  Sc = 1, Object.defineProperty(Jt, "__esModule", { value: !0 });
  const e = Ud(), t = Yd(), f = dh(), s = mh(), d = ph(), i = [
    e.default,
    t.default,
    (0, f.default)(),
    s.default,
    d.metadataVocabulary,
    d.contentVocabulary
  ];
  return Jt.default = i, Jt;
}
var Nr = {}, pt = {}, Rc;
function vh() {
  if (Rc) return pt;
  Rc = 1, Object.defineProperty(pt, "__esModule", { value: !0 }), pt.DiscrError = void 0;
  var e;
  return function(t) {
    t.Tag = "tag", t.Mapping = "mapping";
  }(e || (pt.DiscrError = e = {})), pt;
}
var bc;
function _h() {
  if (bc) return Nr;
  bc = 1, Object.defineProperty(Nr, "__esModule", { value: !0 });
  const e = re(), t = vh(), f = Xi(), s = Nn(), d = ie(), r = {
    keyword: "discriminator",
    type: "object",
    schemaType: "object",
    error: {
      message: ({ params: { discrError: a, tagName: o } }) => a === t.DiscrError.Tag ? `tag "${o}" must be string` : `value of tag "${o}" must be in oneOf`,
      params: ({ params: { discrError: a, tag: o, tagName: l } }) => (0, e._)`{error: ${a}, tag: ${l}, tagValue: ${o}}`
    },
    code(a) {
      const { gen: o, data: l, schema: c, parentSchema: g, it: E } = a, { oneOf: _ } = g;
      if (!E.opts.discriminator)
        throw new Error("discriminator: requires discriminator option");
      const w = c.propertyName;
      if (typeof w != "string")
        throw new Error("discriminator: requires propertyName");
      if (c.mapping)
        throw new Error("discriminator: mapping is not supported");
      if (!_)
        throw new Error("discriminator: requires oneOf keyword");
      const R = o.let("valid", !1), u = o.const("tag", (0, e._)`${l}${(0, e.getProperty)(w)}`);
      o.if((0, e._)`typeof ${u} == "string"`, () => h(), () => a.error(!1, { discrError: t.DiscrError.Tag, tag: u, tagName: w })), a.ok(R);
      function h() {
        const v = m();
        o.if(!1);
        for (const p in v)
          o.elseIf((0, e._)`${u} === ${p}`), o.assign(R, n(v[p]));
        o.else(), a.error(!1, { discrError: t.DiscrError.Mapping, tag: u, tagName: w }), o.endIf();
      }
      function n(v) {
        const p = o.name("valid"), y = a.subschema({ keyword: "oneOf", schemaProp: v }, p);
        return a.mergeEvaluated(y, e.Name), p;
      }
      function m() {
        var v;
        const p = {}, y = b(g);
        let $ = !0;
        for (let F = 0; F < _.length; F++) {
          let H = _[F];
          if (H?.$ref && !(0, d.schemaHasRulesButRef)(H, E.self.RULES)) {
            const U = H.$ref;
            if (H = f.resolveRef.call(E.self, E.schemaEnv.root, E.baseId, U), H instanceof f.SchemaEnv && (H = H.schema), H === void 0)
              throw new s.default(E.opts.uriResolver, E.baseId, U);
          }
          const M = (v = H?.properties) === null || v === void 0 ? void 0 : v[w];
          if (typeof M != "object")
            throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${w}"`);
          $ = $ && (y || b(H)), N(M, F);
        }
        if (!$)
          throw new Error(`discriminator: "${w}" must be required`);
        return p;
        function b({ required: F }) {
          return Array.isArray(F) && F.includes(w);
        }
        function N(F, H) {
          if (F.const)
            L(F.const, H);
          else if (F.enum)
            for (const M of F.enum)
              L(M, H);
          else
            throw new Error(`discriminator: "properties/${w}" must have "const" or "enum"`);
        }
        function L(F, H) {
          if (typeof F != "string" || F in p)
            throw new Error(`discriminator: "${w}" values must be unique strings`);
          p[F] = H;
        }
      }
    }
  };
  return Nr.default = r, Nr;
}
const gh = "http://json-schema.org/draft-07/schema#", $h = "http://json-schema.org/draft-07/schema#", Eh = "Core schema meta-schema", wh = { schemaArray: { type: "array", minItems: 1, items: { $ref: "#" } }, nonNegativeInteger: { type: "integer", minimum: 0 }, nonNegativeIntegerDefault0: { allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }] }, simpleTypes: { enum: ["array", "boolean", "integer", "null", "number", "object", "string"] }, stringArray: { type: "array", items: { type: "string" }, uniqueItems: !0, default: [] } }, Sh = ["object", "boolean"], Rh = { $id: { type: "string", format: "uri-reference" }, $schema: { type: "string", format: "uri" }, $ref: { type: "string", format: "uri-reference" }, $comment: { type: "string" }, title: { type: "string" }, description: { type: "string" }, default: !0, readOnly: { type: "boolean", default: !1 }, examples: { type: "array", items: !0 }, multipleOf: { type: "number", exclusiveMinimum: 0 }, maximum: { type: "number" }, exclusiveMaximum: { type: "number" }, minimum: { type: "number" }, exclusiveMinimum: { type: "number" }, maxLength: { $ref: "#/definitions/nonNegativeInteger" }, minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, pattern: { type: "string", format: "regex" }, additionalItems: { $ref: "#" }, items: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }], default: !0 }, maxItems: { $ref: "#/definitions/nonNegativeInteger" }, minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, uniqueItems: { type: "boolean", default: !1 }, contains: { $ref: "#" }, maxProperties: { $ref: "#/definitions/nonNegativeInteger" }, minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, required: { $ref: "#/definitions/stringArray" }, additionalProperties: { $ref: "#" }, definitions: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, properties: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, patternProperties: { type: "object", additionalProperties: { $ref: "#" }, propertyNames: { format: "regex" }, default: {} }, dependencies: { type: "object", additionalProperties: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }] } }, propertyNames: { $ref: "#" }, const: !0, enum: { type: "array", items: !0, minItems: 1, uniqueItems: !0 }, type: { anyOf: [{ $ref: "#/definitions/simpleTypes" }, { type: "array", items: { $ref: "#/definitions/simpleTypes" }, minItems: 1, uniqueItems: !0 }] }, format: { type: "string" }, contentMediaType: { type: "string" }, contentEncoding: { type: "string" }, if: { $ref: "#" }, then: { $ref: "#" }, else: { $ref: "#" }, allOf: { $ref: "#/definitions/schemaArray" }, anyOf: { $ref: "#/definitions/schemaArray" }, oneOf: { $ref: "#/definitions/schemaArray" }, not: { $ref: "#" } }, bh = {
  $schema: gh,
  $id: $h,
  title: Eh,
  definitions: wh,
  type: Sh,
  properties: Rh,
  default: !0
};
var Pc;
function Ph() {
  return Pc || (Pc = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
    const f = jd(), s = yh(), d = _h(), i = bh, r = ["/properties"], a = "http://json-schema.org/draft-07/schema";
    class o extends f.default {
      _addVocabularies() {
        super._addVocabularies(), s.default.forEach((w) => this.addVocabulary(w)), this.opts.discriminator && this.addKeyword(d.default);
      }
      _addDefaultMetaSchema() {
        if (super._addDefaultMetaSchema(), !this.opts.meta)
          return;
        const w = this.opts.$data ? this.$dataMetaSchema(i, r) : i;
        this.addMetaSchema(w, a, !1), this.refs["http://json-schema.org/schema"] = a;
      }
      defaultMeta() {
        return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(a) ? a : void 0);
      }
    }
    t.Ajv = o, e.exports = t = o, e.exports.Ajv = o, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = o;
    var l = Pn();
    Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
      return l.KeywordCxt;
    } });
    var c = re();
    Object.defineProperty(t, "_", { enumerable: !0, get: function() {
      return c._;
    } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
      return c.str;
    } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
      return c.stringify;
    } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
      return c.nil;
    } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
      return c.Name;
    } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
      return c.CodeGen;
    } });
    var g = Zi();
    Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
      return g.default;
    } });
    var E = Nn();
    Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
      return E.default;
    } });
  }(Kt, Kt.exports)), Kt.exports;
}
var Or = { exports: {} }, Cs = {}, Nc;
function Nh() {
  return Nc || (Nc = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
    function t(N, L) {
      return { validate: N, compare: L };
    }
    e.fullFormats = {
      // date: http://tools.ietf.org/html/rfc3339#section-5.6
      date: t(i, r),
      // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
      time: t(o, l),
      "date-time": t(g, E),
      // duration: https://tools.ietf.org/html/rfc3339#appendix-A
      duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
      uri: R,
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
      regex: b,
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
      int32: { type: "number", validate: v },
      // signed 64 bit integer
      int64: { type: "number", validate: p },
      // C-type float
      float: { type: "number", validate: y },
      // C-type double
      double: { type: "number", validate: y },
      // hint to the UI to hide input strings
      password: !0,
      // unchecked string payload
      binary: !0
    }, e.fastFormats = {
      ...e.fullFormats,
      date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, r),
      time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, l),
      "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, E),
      // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
      uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
      "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
      // email (sources from jsen validator):
      // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
      // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
      email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
    }, e.formatNames = Object.keys(e.fullFormats);
    function f(N) {
      return N % 4 === 0 && (N % 100 !== 0 || N % 400 === 0);
    }
    const s = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, d = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function i(N) {
      const L = s.exec(N);
      if (!L)
        return !1;
      const F = +L[1], H = +L[2], M = +L[3];
      return H >= 1 && H <= 12 && M >= 1 && M <= (H === 2 && f(F) ? 29 : d[H]);
    }
    function r(N, L) {
      if (N && L)
        return N > L ? 1 : N < L ? -1 : 0;
    }
    const a = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
    function o(N, L) {
      const F = a.exec(N);
      if (!F)
        return !1;
      const H = +F[1], M = +F[2], U = +F[3], z = F[5];
      return (H <= 23 && M <= 59 && U <= 59 || H === 23 && M === 59 && U === 60) && (!L || z !== "");
    }
    function l(N, L) {
      if (!(N && L))
        return;
      const F = a.exec(N), H = a.exec(L);
      if (F && H)
        return N = F[1] + F[2] + F[3] + (F[4] || ""), L = H[1] + H[2] + H[3] + (H[4] || ""), N > L ? 1 : N < L ? -1 : 0;
    }
    const c = /t|\s/i;
    function g(N) {
      const L = N.split(c);
      return L.length === 2 && i(L[0]) && o(L[1], !0);
    }
    function E(N, L) {
      if (!(N && L))
        return;
      const [F, H] = N.split(c), [M, U] = L.split(c), z = r(F, M);
      if (z !== void 0)
        return z || l(H, U);
    }
    const _ = /\/|:/, w = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
    function R(N) {
      return _.test(N) && w.test(N);
    }
    const u = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
    function h(N) {
      return u.lastIndex = 0, u.test(N);
    }
    const n = -2147483648, m = 2 ** 31 - 1;
    function v(N) {
      return Number.isInteger(N) && N <= m && N >= n;
    }
    function p(N) {
      return Number.isInteger(N);
    }
    function y() {
      return !0;
    }
    const $ = /[^\\]\\Z/;
    function b(N) {
      if ($.test(N))
        return !1;
      try {
        return new RegExp(N), !0;
      } catch {
        return !1;
      }
    }
  }(Cs)), Cs;
}
var Ds = {}, Ir = { exports: {} }, As = {}, Fe = {}, Qe = {}, Ls = {}, ks = {}, qs = {}, Oc;
function $n() {
  return Oc || (Oc = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
    class t {
    }
    e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
    class f extends t {
      constructor(n) {
        if (super(), !e.IDENTIFIER.test(n))
          throw new Error("CodeGen: name must be a valid identifier");
        this.str = n;
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
    e.Name = f;
    class s extends t {
      constructor(n) {
        super(), this._items = typeof n == "string" ? [n] : n;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        if (this._items.length > 1)
          return !1;
        const n = this._items[0];
        return n === "" || n === '""';
      }
      get str() {
        var n;
        return (n = this._str) !== null && n !== void 0 ? n : this._str = this._items.reduce((m, v) => `${m}${v}`, "");
      }
      get names() {
        var n;
        return (n = this._names) !== null && n !== void 0 ? n : this._names = this._items.reduce((m, v) => (v instanceof f && (m[v.str] = (m[v.str] || 0) + 1), m), {});
      }
    }
    e._Code = s, e.nil = new s("");
    function d(h, ...n) {
      const m = [h[0]];
      let v = 0;
      for (; v < n.length; )
        a(m, n[v]), m.push(h[++v]);
      return new s(m);
    }
    e._ = d;
    const i = new s("+");
    function r(h, ...n) {
      const m = [_(h[0])];
      let v = 0;
      for (; v < n.length; )
        m.push(i), a(m, n[v]), m.push(i, _(h[++v]));
      return o(m), new s(m);
    }
    e.str = r;
    function a(h, n) {
      n instanceof s ? h.push(...n._items) : n instanceof f ? h.push(n) : h.push(g(n));
    }
    e.addCodeArg = a;
    function o(h) {
      let n = 1;
      for (; n < h.length - 1; ) {
        if (h[n] === i) {
          const m = l(h[n - 1], h[n + 1]);
          if (m !== void 0) {
            h.splice(n - 1, 3, m);
            continue;
          }
          h[n++] = "+";
        }
        n++;
      }
    }
    function l(h, n) {
      if (n === '""')
        return h;
      if (h === '""')
        return n;
      if (typeof h == "string")
        return n instanceof f || h[h.length - 1] !== '"' ? void 0 : typeof n != "string" ? `${h.slice(0, -1)}${n}"` : n[0] === '"' ? h.slice(0, -1) + n.slice(1) : void 0;
      if (typeof n == "string" && n[0] === '"' && !(h instanceof f))
        return `"${h}${n.slice(1)}`;
    }
    function c(h, n) {
      return n.emptyStr() ? h : h.emptyStr() ? n : r`${h}${n}`;
    }
    e.strConcat = c;
    function g(h) {
      return typeof h == "number" || typeof h == "boolean" || h === null ? h : _(Array.isArray(h) ? h.join(",") : h);
    }
    function E(h) {
      return new s(_(h));
    }
    e.stringify = E;
    function _(h) {
      return JSON.stringify(h).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
    }
    e.safeStringify = _;
    function w(h) {
      return typeof h == "string" && e.IDENTIFIER.test(h) ? new s(`.${h}`) : d`[${h}]`;
    }
    e.getProperty = w;
    function R(h) {
      if (typeof h == "string" && e.IDENTIFIER.test(h))
        return new s(`${h}`);
      throw new Error(`CodeGen: invalid export name: ${h}, use explicit $id name mapping`);
    }
    e.getEsmExportName = R;
    function u(h) {
      return new s(h.toString());
    }
    e.regexpCode = u;
  }(qs)), qs;
}
var js = {}, Ic;
function Tc() {
  return Ic || (Ic = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
    const t = $n();
    class f extends Error {
      constructor(l) {
        super(`CodeGen: "code" for ${l} not defined`), this.value = l.value;
      }
    }
    var s;
    (function(o) {
      o[o.Started = 0] = "Started", o[o.Completed = 1] = "Completed";
    })(s || (e.UsedValueState = s = {})), e.varKinds = {
      const: new t.Name("const"),
      let: new t.Name("let"),
      var: new t.Name("var")
    };
    class d {
      constructor({ prefixes: l, parent: c } = {}) {
        this._names = {}, this._prefixes = l, this._parent = c;
      }
      toName(l) {
        return l instanceof t.Name ? l : this.name(l);
      }
      name(l) {
        return new t.Name(this._newName(l));
      }
      _newName(l) {
        const c = this._names[l] || this._nameGroup(l);
        return `${l}${c.index++}`;
      }
      _nameGroup(l) {
        var c, g;
        if (!((g = (c = this._parent) === null || c === void 0 ? void 0 : c._prefixes) === null || g === void 0) && g.has(l) || this._prefixes && !this._prefixes.has(l))
          throw new Error(`CodeGen: prefix "${l}" is not allowed in this scope`);
        return this._names[l] = { prefix: l, index: 0 };
      }
    }
    e.Scope = d;
    class i extends t.Name {
      constructor(l, c) {
        super(c), this.prefix = l;
      }
      setValue(l, { property: c, itemIndex: g }) {
        this.value = l, this.scopePath = (0, t._)`.${new t.Name(c)}[${g}]`;
      }
    }
    e.ValueScopeName = i;
    const r = (0, t._)`\n`;
    class a extends d {
      constructor(l) {
        super(l), this._values = {}, this._scope = l.scope, this.opts = { ...l, _n: l.lines ? r : t.nil };
      }
      get() {
        return this._scope;
      }
      name(l) {
        return new i(l, this._newName(l));
      }
      value(l, c) {
        var g;
        if (c.ref === void 0)
          throw new Error("CodeGen: ref must be passed in value");
        const E = this.toName(l), { prefix: _ } = E, w = (g = c.key) !== null && g !== void 0 ? g : c.ref;
        let R = this._values[_];
        if (R) {
          const n = R.get(w);
          if (n)
            return n;
        } else
          R = this._values[_] = /* @__PURE__ */ new Map();
        R.set(w, E);
        const u = this._scope[_] || (this._scope[_] = []), h = u.length;
        return u[h] = c.ref, E.setValue(c, { property: _, itemIndex: h }), E;
      }
      getValue(l, c) {
        const g = this._values[l];
        if (g)
          return g.get(c);
      }
      scopeRefs(l, c = this._values) {
        return this._reduceValues(c, (g) => {
          if (g.scopePath === void 0)
            throw new Error(`CodeGen: name "${g}" has no value`);
          return (0, t._)`${l}${g.scopePath}`;
        });
      }
      scopeCode(l = this._values, c, g) {
        return this._reduceValues(l, (E) => {
          if (E.value === void 0)
            throw new Error(`CodeGen: name "${E}" has no value`);
          return E.value.code;
        }, c, g);
      }
      _reduceValues(l, c, g = {}, E) {
        let _ = t.nil;
        for (const w in l) {
          const R = l[w];
          if (!R)
            continue;
          const u = g[w] = g[w] || /* @__PURE__ */ new Map();
          R.forEach((h) => {
            if (u.has(h))
              return;
            u.set(h, s.Started);
            let n = c(h);
            if (n) {
              const m = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
              _ = (0, t._)`${_}${m} ${h} = ${n};${this.opts._n}`;
            } else if (n = E?.(h))
              _ = (0, t._)`${_}${n}${this.opts._n}`;
            else
              throw new f(h);
            u.set(h, s.Completed);
          });
        }
        return _;
      }
    }
    e.ValueScope = a;
  }(js)), js;
}
var Cc;
function te() {
  return Cc || (Cc = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
    const t = $n(), f = Tc();
    var s = $n();
    Object.defineProperty(e, "_", { enumerable: !0, get: function() {
      return s._;
    } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
      return s.str;
    } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
      return s.strConcat;
    } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
      return s.nil;
    } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
      return s.getProperty;
    } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
      return s.stringify;
    } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
      return s.regexpCode;
    } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
      return s.Name;
    } });
    var d = Tc();
    Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
      return d.Scope;
    } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
      return d.ValueScope;
    } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
      return d.ValueScopeName;
    } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
      return d.varKinds;
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
    class i {
      optimizeNodes() {
        return this;
      }
      optimizeNames(S, P) {
        return this;
      }
    }
    class r extends i {
      constructor(S, P, A) {
        super(), this.varKind = S, this.name = P, this.rhs = A;
      }
      render({ es5: S, _n: P }) {
        const A = S ? f.varKinds.var : this.varKind, K = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
        return `${A} ${this.name}${K};` + P;
      }
      optimizeNames(S, P) {
        if (S[this.name.str])
          return this.rhs && (this.rhs = U(this.rhs, S, P)), this;
      }
      get names() {
        return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
      }
    }
    class a extends i {
      constructor(S, P, A) {
        super(), this.lhs = S, this.rhs = P, this.sideEffects = A;
      }
      render({ _n: S }) {
        return `${this.lhs} = ${this.rhs};` + S;
      }
      optimizeNames(S, P) {
        if (!(this.lhs instanceof t.Name && !S[this.lhs.str] && !this.sideEffects))
          return this.rhs = U(this.rhs, S, P), this;
      }
      get names() {
        const S = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
        return M(S, this.rhs);
      }
    }
    class o extends a {
      constructor(S, P, A, K) {
        super(S, A, K), this.op = P;
      }
      render({ _n: S }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + S;
      }
    }
    class l extends i {
      constructor(S) {
        super(), this.label = S, this.names = {};
      }
      render({ _n: S }) {
        return `${this.label}:` + S;
      }
    }
    class c extends i {
      constructor(S) {
        super(), this.label = S, this.names = {};
      }
      render({ _n: S }) {
        return `break${this.label ? ` ${this.label}` : ""};` + S;
      }
    }
    class g extends i {
      constructor(S) {
        super(), this.error = S;
      }
      render({ _n: S }) {
        return `throw ${this.error};` + S;
      }
      get names() {
        return this.error.names;
      }
    }
    class E extends i {
      constructor(S) {
        super(), this.code = S;
      }
      render({ _n: S }) {
        return `${this.code};` + S;
      }
      optimizeNodes() {
        return `${this.code}` ? this : void 0;
      }
      optimizeNames(S, P) {
        return this.code = U(this.code, S, P), this;
      }
      get names() {
        return this.code instanceof t._CodeOrName ? this.code.names : {};
      }
    }
    class _ extends i {
      constructor(S = []) {
        super(), this.nodes = S;
      }
      render(S) {
        return this.nodes.reduce((P, A) => P + A.render(S), "");
      }
      optimizeNodes() {
        const { nodes: S } = this;
        let P = S.length;
        for (; P--; ) {
          const A = S[P].optimizeNodes();
          Array.isArray(A) ? S.splice(P, 1, ...A) : A ? S[P] = A : S.splice(P, 1);
        }
        return S.length > 0 ? this : void 0;
      }
      optimizeNames(S, P) {
        const { nodes: A } = this;
        let K = A.length;
        for (; K--; ) {
          const B = A[K];
          B.optimizeNames(S, P) || (z(S, B.names), A.splice(K, 1));
        }
        return A.length > 0 ? this : void 0;
      }
      get names() {
        return this.nodes.reduce((S, P) => H(S, P.names), {});
      }
    }
    class w extends _ {
      render(S) {
        return "{" + S._n + super.render(S) + "}" + S._n;
      }
    }
    class R extends _ {
    }
    class u extends w {
    }
    u.kind = "else";
    class h extends w {
      constructor(S, P) {
        super(P), this.condition = S;
      }
      render(S) {
        let P = `if(${this.condition})` + super.render(S);
        return this.else && (P += "else " + this.else.render(S)), P;
      }
      optimizeNodes() {
        super.optimizeNodes();
        const S = this.condition;
        if (S === !0)
          return this.nodes;
        let P = this.else;
        if (P) {
          const A = P.optimizeNodes();
          P = this.else = Array.isArray(A) ? new u(A) : A;
        }
        if (P)
          return S === !1 ? P instanceof h ? P : P.nodes : this.nodes.length ? this : new h(J(S), P instanceof h ? [P] : P.nodes);
        if (!(S === !1 || !this.nodes.length))
          return this;
      }
      optimizeNames(S, P) {
        var A;
        if (this.else = (A = this.else) === null || A === void 0 ? void 0 : A.optimizeNames(S, P), !!(super.optimizeNames(S, P) || this.else))
          return this.condition = U(this.condition, S, P), this;
      }
      get names() {
        const S = super.names;
        return M(S, this.condition), this.else && H(S, this.else.names), S;
      }
    }
    h.kind = "if";
    class n extends w {
    }
    n.kind = "for";
    class m extends n {
      constructor(S) {
        super(), this.iteration = S;
      }
      render(S) {
        return `for(${this.iteration})` + super.render(S);
      }
      optimizeNames(S, P) {
        if (super.optimizeNames(S, P))
          return this.iteration = U(this.iteration, S, P), this;
      }
      get names() {
        return H(super.names, this.iteration.names);
      }
    }
    class v extends n {
      constructor(S, P, A, K) {
        super(), this.varKind = S, this.name = P, this.from = A, this.to = K;
      }
      render(S) {
        const P = S.es5 ? f.varKinds.var : this.varKind, { name: A, from: K, to: B } = this;
        return `for(${P} ${A}=${K}; ${A}<${B}; ${A}++)` + super.render(S);
      }
      get names() {
        const S = M(super.names, this.from);
        return M(S, this.to);
      }
    }
    class p extends n {
      constructor(S, P, A, K) {
        super(), this.loop = S, this.varKind = P, this.name = A, this.iterable = K;
      }
      render(S) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(S);
      }
      optimizeNames(S, P) {
        if (super.optimizeNames(S, P))
          return this.iterable = U(this.iterable, S, P), this;
      }
      get names() {
        return H(super.names, this.iterable.names);
      }
    }
    class y extends w {
      constructor(S, P, A) {
        super(), this.name = S, this.args = P, this.async = A;
      }
      render(S) {
        return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(S);
      }
    }
    y.kind = "func";
    class $ extends _ {
      render(S) {
        return "return " + super.render(S);
      }
    }
    $.kind = "return";
    class b extends w {
      render(S) {
        let P = "try" + super.render(S);
        return this.catch && (P += this.catch.render(S)), this.finally && (P += this.finally.render(S)), P;
      }
      optimizeNodes() {
        var S, P;
        return super.optimizeNodes(), (S = this.catch) === null || S === void 0 || S.optimizeNodes(), (P = this.finally) === null || P === void 0 || P.optimizeNodes(), this;
      }
      optimizeNames(S, P) {
        var A, K;
        return super.optimizeNames(S, P), (A = this.catch) === null || A === void 0 || A.optimizeNames(S, P), (K = this.finally) === null || K === void 0 || K.optimizeNames(S, P), this;
      }
      get names() {
        const S = super.names;
        return this.catch && H(S, this.catch.names), this.finally && H(S, this.finally.names), S;
      }
    }
    class N extends w {
      constructor(S) {
        super(), this.error = S;
      }
      render(S) {
        return `catch(${this.error})` + super.render(S);
      }
    }
    N.kind = "catch";
    class L extends w {
      render(S) {
        return "finally" + super.render(S);
      }
    }
    L.kind = "finally";
    class F {
      constructor(S, P = {}) {
        this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...P, _n: P.lines ? `
` : "" }, this._extScope = S, this._scope = new f.Scope({ parent: S }), this._nodes = [new R()];
      }
      toString() {
        return this._root.render(this.opts);
      }
      // returns unique name in the internal scope
      name(S) {
        return this._scope.name(S);
      }
      // reserves unique name in the external scope
      scopeName(S) {
        return this._extScope.name(S);
      }
      // reserves unique name in the external scope and assigns value to it
      scopeValue(S, P) {
        const A = this._extScope.value(S, P);
        return (this._values[A.prefix] || (this._values[A.prefix] = /* @__PURE__ */ new Set())).add(A), A;
      }
      getScopeValue(S, P) {
        return this._extScope.getValue(S, P);
      }
      // return code that assigns values in the external scope to the names that are used internally
      // (same names that were returned by gen.scopeName or gen.scopeValue)
      scopeRefs(S) {
        return this._extScope.scopeRefs(S, this._values);
      }
      scopeCode() {
        return this._extScope.scopeCode(this._values);
      }
      _def(S, P, A, K) {
        const B = this._scope.toName(P);
        return A !== void 0 && K && (this._constants[B.str] = A), this._leafNode(new r(S, B, A)), B;
      }
      // `const` declaration (`var` in es5 mode)
      const(S, P, A) {
        return this._def(f.varKinds.const, S, P, A);
      }
      // `let` declaration with optional assignment (`var` in es5 mode)
      let(S, P, A) {
        return this._def(f.varKinds.let, S, P, A);
      }
      // `var` declaration with optional assignment
      var(S, P, A) {
        return this._def(f.varKinds.var, S, P, A);
      }
      // assignment code
      assign(S, P, A) {
        return this._leafNode(new a(S, P, A));
      }
      // `+=` code
      add(S, P) {
        return this._leafNode(new o(S, e.operators.ADD, P));
      }
      // appends passed SafeExpr to code or executes Block
      code(S) {
        return typeof S == "function" ? S() : S !== t.nil && this._leafNode(new E(S)), this;
      }
      // returns code for object literal for the passed argument list of key-value pairs
      object(...S) {
        const P = ["{"];
        for (const [A, K] of S)
          P.length > 1 && P.push(","), P.push(A), (A !== K || this.opts.es5) && (P.push(":"), (0, t.addCodeArg)(P, K));
        return P.push("}"), new t._Code(P);
      }
      // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
      if(S, P, A) {
        if (this._blockNode(new h(S)), P && A)
          this.code(P).else().code(A).endIf();
        else if (P)
          this.code(P).endIf();
        else if (A)
          throw new Error('CodeGen: "else" body without "then" body');
        return this;
      }
      // `else if` clause - invalid without `if` or after `else` clauses
      elseIf(S) {
        return this._elseNode(new h(S));
      }
      // `else` clause - only valid after `if` or `else if` clauses
      else() {
        return this._elseNode(new u());
      }
      // end `if` statement (needed if gen.if was used only with condition)
      endIf() {
        return this._endBlockNode(h, u);
      }
      _for(S, P) {
        return this._blockNode(S), P && this.code(P).endFor(), this;
      }
      // a generic `for` clause (or statement if `forBody` is passed)
      for(S, P) {
        return this._for(new m(S), P);
      }
      // `for` statement for a range of values
      forRange(S, P, A, K, B = this.opts.es5 ? f.varKinds.var : f.varKinds.let) {
        const X = this._scope.toName(S);
        return this._for(new v(B, X, P, A), () => K(X));
      }
      // `for-of` statement (in es5 mode replace with a normal for loop)
      forOf(S, P, A, K = f.varKinds.const) {
        const B = this._scope.toName(S);
        if (this.opts.es5) {
          const X = P instanceof t.Name ? P : this.var("_arr", P);
          return this.forRange("_i", 0, (0, t._)`${X}.length`, (Z) => {
            this.var(B, (0, t._)`${X}[${Z}]`), A(B);
          });
        }
        return this._for(new p("of", K, B, P), () => A(B));
      }
      // `for-in` statement.
      // With option `ownProperties` replaced with a `for-of` loop for object keys
      forIn(S, P, A, K = this.opts.es5 ? f.varKinds.var : f.varKinds.const) {
        if (this.opts.ownProperties)
          return this.forOf(S, (0, t._)`Object.keys(${P})`, A);
        const B = this._scope.toName(S);
        return this._for(new p("in", K, B, P), () => A(B));
      }
      // end `for` loop
      endFor() {
        return this._endBlockNode(n);
      }
      // `label` statement
      label(S) {
        return this._leafNode(new l(S));
      }
      // `break` statement
      break(S) {
        return this._leafNode(new c(S));
      }
      // `return` statement
      return(S) {
        const P = new $();
        if (this._blockNode(P), this.code(S), P.nodes.length !== 1)
          throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode($);
      }
      // `try` statement
      try(S, P, A) {
        if (!P && !A)
          throw new Error('CodeGen: "try" without "catch" and "finally"');
        const K = new b();
        if (this._blockNode(K), this.code(S), P) {
          const B = this.name("e");
          this._currNode = K.catch = new N(B), P(B);
        }
        return A && (this._currNode = K.finally = new L(), this.code(A)), this._endBlockNode(N, L);
      }
      // `throw` statement
      throw(S) {
        return this._leafNode(new g(S));
      }
      // start self-balancing block
      block(S, P) {
        return this._blockStarts.push(this._nodes.length), S && this.code(S).endBlock(P), this;
      }
      // end the current self-balancing block
      endBlock(S) {
        const P = this._blockStarts.pop();
        if (P === void 0)
          throw new Error("CodeGen: not in self-balancing block");
        const A = this._nodes.length - P;
        if (A < 0 || S !== void 0 && A !== S)
          throw new Error(`CodeGen: wrong number of nodes: ${A} vs ${S} expected`);
        return this._nodes.length = P, this;
      }
      // `function` heading (or definition if funcBody is passed)
      func(S, P = t.nil, A, K) {
        return this._blockNode(new y(S, P, A)), K && this.code(K).endFunc(), this;
      }
      // end function definition
      endFunc() {
        return this._endBlockNode(y);
      }
      optimize(S = 1) {
        for (; S-- > 0; )
          this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
      }
      _leafNode(S) {
        return this._currNode.nodes.push(S), this;
      }
      _blockNode(S) {
        this._currNode.nodes.push(S), this._nodes.push(S);
      }
      _endBlockNode(S, P) {
        const A = this._currNode;
        if (A instanceof S || P && A instanceof P)
          return this._nodes.pop(), this;
        throw new Error(`CodeGen: not in block "${P ? `${S.kind}/${P.kind}` : S.kind}"`);
      }
      _elseNode(S) {
        const P = this._currNode;
        if (!(P instanceof h))
          throw new Error('CodeGen: "else" without "if"');
        return this._currNode = P.else = S, this;
      }
      get _root() {
        return this._nodes[0];
      }
      get _currNode() {
        const S = this._nodes;
        return S[S.length - 1];
      }
      set _currNode(S) {
        const P = this._nodes;
        P[P.length - 1] = S;
      }
    }
    e.CodeGen = F;
    function H(T, S) {
      for (const P in S)
        T[P] = (T[P] || 0) + (S[P] || 0);
      return T;
    }
    function M(T, S) {
      return S instanceof t._CodeOrName ? H(T, S.names) : T;
    }
    function U(T, S, P) {
      if (T instanceof t.Name)
        return A(T);
      if (!K(T))
        return T;
      return new t._Code(T._items.reduce((B, X) => (X instanceof t.Name && (X = A(X)), X instanceof t._Code ? B.push(...X._items) : B.push(X), B), []));
      function A(B) {
        const X = P[B.str];
        return X === void 0 || S[B.str] !== 1 ? B : (delete S[B.str], X);
      }
      function K(B) {
        return B instanceof t._Code && B._items.some((X) => X instanceof t.Name && S[X.str] === 1 && P[X.str] !== void 0);
      }
    }
    function z(T, S) {
      for (const P in S)
        T[P] = (T[P] || 0) - (S[P] || 0);
    }
    function J(T) {
      return typeof T == "boolean" || typeof T == "number" || T === null ? !T : (0, t._)`!${k(T)}`;
    }
    e.not = J;
    const W = O(e.operators.AND);
    function j(...T) {
      return T.reduce(W);
    }
    e.and = j;
    const G = O(e.operators.OR);
    function D(...T) {
      return T.reduce(G);
    }
    e.or = D;
    function O(T) {
      return (S, P) => S === t.nil ? P : P === t.nil ? S : (0, t._)`${k(S)} ${T} ${k(P)}`;
    }
    function k(T) {
      return T instanceof t.Name ? T : (0, t._)`(${T})`;
    }
  }(ks)), ks;
}
var ee = {}, Dc;
function oe() {
  if (Dc) return ee;
  Dc = 1, Object.defineProperty(ee, "__esModule", { value: !0 }), ee.checkStrictMode = ee.getErrorPath = ee.Type = ee.useFunc = ee.setEvaluated = ee.evaluatedPropsToName = ee.mergeEvaluated = ee.eachItem = ee.unescapeJsonPointer = ee.escapeJsonPointer = ee.escapeFragment = ee.unescapeFragment = ee.schemaRefOrVal = ee.schemaHasRulesButRef = ee.schemaHasRules = ee.checkUnknownRules = ee.alwaysValidSchema = ee.toHash = void 0;
  const e = te(), t = $n();
  function f(p) {
    const y = {};
    for (const $ of p)
      y[$] = !0;
    return y;
  }
  ee.toHash = f;
  function s(p, y) {
    return typeof y == "boolean" ? y : Object.keys(y).length === 0 ? !0 : (d(p, y), !i(y, p.self.RULES.all));
  }
  ee.alwaysValidSchema = s;
  function d(p, y = p.schema) {
    const { opts: $, self: b } = p;
    if (!$.strictSchema || typeof y == "boolean")
      return;
    const N = b.RULES.keywords;
    for (const L in y)
      N[L] || v(p, `unknown keyword: "${L}"`);
  }
  ee.checkUnknownRules = d;
  function i(p, y) {
    if (typeof p == "boolean")
      return !p;
    for (const $ in p)
      if (y[$])
        return !0;
    return !1;
  }
  ee.schemaHasRules = i;
  function r(p, y) {
    if (typeof p == "boolean")
      return !p;
    for (const $ in p)
      if ($ !== "$ref" && y.all[$])
        return !0;
    return !1;
  }
  ee.schemaHasRulesButRef = r;
  function a({ topSchemaRef: p, schemaPath: y }, $, b, N) {
    if (!N) {
      if (typeof $ == "number" || typeof $ == "boolean")
        return $;
      if (typeof $ == "string")
        return (0, e._)`${$}`;
    }
    return (0, e._)`${p}${y}${(0, e.getProperty)(b)}`;
  }
  ee.schemaRefOrVal = a;
  function o(p) {
    return g(decodeURIComponent(p));
  }
  ee.unescapeFragment = o;
  function l(p) {
    return encodeURIComponent(c(p));
  }
  ee.escapeFragment = l;
  function c(p) {
    return typeof p == "number" ? `${p}` : p.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  ee.escapeJsonPointer = c;
  function g(p) {
    return p.replace(/~1/g, "/").replace(/~0/g, "~");
  }
  ee.unescapeJsonPointer = g;
  function E(p, y) {
    if (Array.isArray(p))
      for (const $ of p)
        y($);
    else
      y(p);
  }
  ee.eachItem = E;
  function _({ mergeNames: p, mergeToName: y, mergeValues: $, resultToName: b }) {
    return (N, L, F, H) => {
      const M = F === void 0 ? L : F instanceof e.Name ? (L instanceof e.Name ? p(N, L, F) : y(N, L, F), F) : L instanceof e.Name ? (y(N, F, L), L) : $(L, F);
      return H === e.Name && !(M instanceof e.Name) ? b(N, M) : M;
    };
  }
  ee.mergeEvaluated = {
    props: _({
      mergeNames: (p, y, $) => p.if((0, e._)`${$} !== true && ${y} !== undefined`, () => {
        p.if((0, e._)`${y} === true`, () => p.assign($, !0), () => p.assign($, (0, e._)`${$} || {}`).code((0, e._)`Object.assign(${$}, ${y})`));
      }),
      mergeToName: (p, y, $) => p.if((0, e._)`${$} !== true`, () => {
        y === !0 ? p.assign($, !0) : (p.assign($, (0, e._)`${$} || {}`), R(p, $, y));
      }),
      mergeValues: (p, y) => p === !0 ? !0 : { ...p, ...y },
      resultToName: w
    }),
    items: _({
      mergeNames: (p, y, $) => p.if((0, e._)`${$} !== true && ${y} !== undefined`, () => p.assign($, (0, e._)`${y} === true ? true : ${$} > ${y} ? ${$} : ${y}`)),
      mergeToName: (p, y, $) => p.if((0, e._)`${$} !== true`, () => p.assign($, y === !0 ? !0 : (0, e._)`${$} > ${y} ? ${$} : ${y}`)),
      mergeValues: (p, y) => p === !0 ? !0 : Math.max(p, y),
      resultToName: (p, y) => p.var("items", y)
    })
  };
  function w(p, y) {
    if (y === !0)
      return p.var("props", !0);
    const $ = p.var("props", (0, e._)`{}`);
    return y !== void 0 && R(p, $, y), $;
  }
  ee.evaluatedPropsToName = w;
  function R(p, y, $) {
    Object.keys($).forEach((b) => p.assign((0, e._)`${y}${(0, e.getProperty)(b)}`, !0));
  }
  ee.setEvaluated = R;
  const u = {};
  function h(p, y) {
    return p.scopeValue("func", {
      ref: y,
      code: u[y.code] || (u[y.code] = new t._Code(y.code))
    });
  }
  ee.useFunc = h;
  var n;
  (function(p) {
    p[p.Num = 0] = "Num", p[p.Str = 1] = "Str";
  })(n || (ee.Type = n = {}));
  function m(p, y, $) {
    if (p instanceof e.Name) {
      const b = y === n.Num;
      return $ ? b ? (0, e._)`"[" + ${p} + "]"` : (0, e._)`"['" + ${p} + "']"` : b ? (0, e._)`"/" + ${p}` : (0, e._)`"/" + ${p}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
    }
    return $ ? (0, e.getProperty)(p).toString() : "/" + c(p);
  }
  ee.getErrorPath = m;
  function v(p, y, $ = p.opts.strictSchema) {
    if ($) {
      if (y = `strict mode: ${y}`, $ === !0)
        throw new Error(y);
      p.self.logger.warn(y);
    }
  }
  return ee.checkStrictMode = v, ee;
}
var Tr = {}, Ac;
function Ke() {
  if (Ac) return Tr;
  Ac = 1, Object.defineProperty(Tr, "__esModule", { value: !0 });
  const e = te(), t = {
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
  return Tr.default = t, Tr;
}
var Lc;
function On() {
  return Lc || (Lc = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
    const t = te(), f = oe(), s = Ke();
    e.keywordError = {
      message: ({ keyword: u }) => (0, t.str)`must pass "${u}" keyword validation`
    }, e.keyword$DataError = {
      message: ({ keyword: u, schemaType: h }) => h ? (0, t.str)`"${u}" keyword must be ${h} ($data)` : (0, t.str)`"${u}" keyword is invalid ($data)`
    };
    function d(u, h = e.keywordError, n, m) {
      const { it: v } = u, { gen: p, compositeRule: y, allErrors: $ } = v, b = g(u, h, n);
      m ?? (y || $) ? o(p, b) : l(v, (0, t._)`[${b}]`);
    }
    e.reportError = d;
    function i(u, h = e.keywordError, n) {
      const { it: m } = u, { gen: v, compositeRule: p, allErrors: y } = m, $ = g(u, h, n);
      o(v, $), p || y || l(m, s.default.vErrors);
    }
    e.reportExtraError = i;
    function r(u, h) {
      u.assign(s.default.errors, h), u.if((0, t._)`${s.default.vErrors} !== null`, () => u.if(h, () => u.assign((0, t._)`${s.default.vErrors}.length`, h), () => u.assign(s.default.vErrors, null)));
    }
    e.resetErrorsCount = r;
    function a({ gen: u, keyword: h, schemaValue: n, data: m, errsCount: v, it: p }) {
      if (v === void 0)
        throw new Error("ajv implementation error");
      const y = u.name("err");
      u.forRange("i", v, s.default.errors, ($) => {
        u.const(y, (0, t._)`${s.default.vErrors}[${$}]`), u.if((0, t._)`${y}.instancePath === undefined`, () => u.assign((0, t._)`${y}.instancePath`, (0, t.strConcat)(s.default.instancePath, p.errorPath))), u.assign((0, t._)`${y}.schemaPath`, (0, t.str)`${p.errSchemaPath}/${h}`), p.opts.verbose && (u.assign((0, t._)`${y}.schema`, n), u.assign((0, t._)`${y}.data`, m));
      });
    }
    e.extendErrors = a;
    function o(u, h) {
      const n = u.const("err", h);
      u.if((0, t._)`${s.default.vErrors} === null`, () => u.assign(s.default.vErrors, (0, t._)`[${n}]`), (0, t._)`${s.default.vErrors}.push(${n})`), u.code((0, t._)`${s.default.errors}++`);
    }
    function l(u, h) {
      const { gen: n, validateName: m, schemaEnv: v } = u;
      v.$async ? n.throw((0, t._)`new ${u.ValidationError}(${h})`) : (n.assign((0, t._)`${m}.errors`, h), n.return(!1));
    }
    const c = {
      keyword: new t.Name("keyword"),
      schemaPath: new t.Name("schemaPath"),
      // also used in JTD errors
      params: new t.Name("params"),
      propertyName: new t.Name("propertyName"),
      message: new t.Name("message"),
      schema: new t.Name("schema"),
      parentSchema: new t.Name("parentSchema")
    };
    function g(u, h, n) {
      const { createErrors: m } = u.it;
      return m === !1 ? (0, t._)`{}` : E(u, h, n);
    }
    function E(u, h, n = {}) {
      const { gen: m, it: v } = u, p = [
        _(v, n),
        w(u, n)
      ];
      return R(u, h, p), m.object(...p);
    }
    function _({ errorPath: u }, { instancePath: h }) {
      const n = h ? (0, t.str)`${u}${(0, f.getErrorPath)(h, f.Type.Str)}` : u;
      return [s.default.instancePath, (0, t.strConcat)(s.default.instancePath, n)];
    }
    function w({ keyword: u, it: { errSchemaPath: h } }, { schemaPath: n, parentSchema: m }) {
      let v = m ? h : (0, t.str)`${h}/${u}`;
      return n && (v = (0, t.str)`${v}${(0, f.getErrorPath)(n, f.Type.Str)}`), [c.schemaPath, v];
    }
    function R(u, { params: h, message: n }, m) {
      const { keyword: v, data: p, schemaValue: y, it: $ } = u, { opts: b, propertyName: N, topSchemaRef: L, schemaPath: F } = $;
      m.push([c.keyword, v], [c.params, typeof h == "function" ? h(u) : h || (0, t._)`{}`]), b.messages && m.push([c.message, typeof n == "function" ? n(u) : n]), b.verbose && m.push([c.schema, y], [c.parentSchema, (0, t._)`${L}${F}`], [s.default.data, p]), N && m.push([c.propertyName, N]);
    }
  }(Ls)), Ls;
}
var kc;
function Oh() {
  if (kc) return Qe;
  kc = 1, Object.defineProperty(Qe, "__esModule", { value: !0 }), Qe.boolOrEmptySchema = Qe.topBoolOrEmptySchema = void 0;
  const e = On(), t = te(), f = Ke(), s = {
    message: "boolean schema is false"
  };
  function d(a) {
    const { gen: o, schema: l, validateName: c } = a;
    l === !1 ? r(a, !1) : typeof l == "object" && l.$async === !0 ? o.return(f.default.data) : (o.assign((0, t._)`${c}.errors`, null), o.return(!0));
  }
  Qe.topBoolOrEmptySchema = d;
  function i(a, o) {
    const { gen: l, schema: c } = a;
    c === !1 ? (l.var(o, !1), r(a)) : l.var(o, !0);
  }
  Qe.boolOrEmptySchema = i;
  function r(a, o) {
    const { gen: l, data: c } = a, g = {
      gen: l,
      keyword: "false schema",
      data: c,
      schema: !1,
      schemaCode: !1,
      schemaValue: !1,
      params: {},
      it: a
    };
    (0, e.reportError)(g, s, void 0, o);
  }
  return Qe;
}
var ye = {}, et = {}, qc;
function hf() {
  if (qc) return et;
  qc = 1, Object.defineProperty(et, "__esModule", { value: !0 }), et.getRules = et.isJSONType = void 0;
  const e = ["string", "number", "integer", "boolean", "null", "object", "array"], t = new Set(e);
  function f(d) {
    return typeof d == "string" && t.has(d);
  }
  et.isJSONType = f;
  function s() {
    const d = {
      number: { type: "number", rules: [] },
      string: { type: "string", rules: [] },
      array: { type: "array", rules: [] },
      object: { type: "object", rules: [] }
    };
    return {
      types: { ...d, integer: !0, boolean: !0, null: !0 },
      rules: [{ rules: [] }, d.number, d.string, d.array, d.object],
      post: { rules: [] },
      all: {},
      keywords: {}
    };
  }
  return et.getRules = s, et;
}
var Me = {}, jc;
function mf() {
  if (jc) return Me;
  jc = 1, Object.defineProperty(Me, "__esModule", { value: !0 }), Me.shouldUseRule = Me.shouldUseGroup = Me.schemaHasRulesForType = void 0;
  function e({ schema: s, self: d }, i) {
    const r = d.RULES.types[i];
    return r && r !== !0 && t(s, r);
  }
  Me.schemaHasRulesForType = e;
  function t(s, d) {
    return d.rules.some((i) => f(s, i));
  }
  Me.shouldUseGroup = t;
  function f(s, d) {
    var i;
    return s[d.keyword] !== void 0 || ((i = d.definition.implements) === null || i === void 0 ? void 0 : i.some((r) => s[r] !== void 0));
  }
  return Me.shouldUseRule = f, Me;
}
var Fc;
function En() {
  if (Fc) return ye;
  Fc = 1, Object.defineProperty(ye, "__esModule", { value: !0 }), ye.reportTypeError = ye.checkDataTypes = ye.checkDataType = ye.coerceAndCheckDataType = ye.getJSONTypes = ye.getSchemaTypes = ye.DataType = void 0;
  const e = hf(), t = mf(), f = On(), s = te(), d = oe();
  var i;
  (function(n) {
    n[n.Correct = 0] = "Correct", n[n.Wrong = 1] = "Wrong";
  })(i || (ye.DataType = i = {}));
  function r(n) {
    const m = a(n.type);
    if (m.includes("null")) {
      if (n.nullable === !1)
        throw new Error("type: null contradicts nullable: false");
    } else {
      if (!m.length && n.nullable !== void 0)
        throw new Error('"nullable" cannot be used without "type"');
      n.nullable === !0 && m.push("null");
    }
    return m;
  }
  ye.getSchemaTypes = r;
  function a(n) {
    const m = Array.isArray(n) ? n : n ? [n] : [];
    if (m.every(e.isJSONType))
      return m;
    throw new Error("type must be JSONType or JSONType[]: " + m.join(","));
  }
  ye.getJSONTypes = a;
  function o(n, m) {
    const { gen: v, data: p, opts: y } = n, $ = c(m, y.coerceTypes), b = m.length > 0 && !($.length === 0 && m.length === 1 && (0, t.schemaHasRulesForType)(n, m[0]));
    if (b) {
      const N = w(m, p, y.strictNumbers, i.Wrong);
      v.if(N, () => {
        $.length ? g(n, m, $) : u(n);
      });
    }
    return b;
  }
  ye.coerceAndCheckDataType = o;
  const l = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
  function c(n, m) {
    return m ? n.filter((v) => l.has(v) || m === "array" && v === "array") : [];
  }
  function g(n, m, v) {
    const { gen: p, data: y, opts: $ } = n, b = p.let("dataType", (0, s._)`typeof ${y}`), N = p.let("coerced", (0, s._)`undefined`);
    $.coerceTypes === "array" && p.if((0, s._)`${b} == 'object' && Array.isArray(${y}) && ${y}.length == 1`, () => p.assign(y, (0, s._)`${y}[0]`).assign(b, (0, s._)`typeof ${y}`).if(w(m, y, $.strictNumbers), () => p.assign(N, y))), p.if((0, s._)`${N} !== undefined`);
    for (const F of v)
      (l.has(F) || F === "array" && $.coerceTypes === "array") && L(F);
    p.else(), u(n), p.endIf(), p.if((0, s._)`${N} !== undefined`, () => {
      p.assign(y, N), E(n, N);
    });
    function L(F) {
      switch (F) {
        case "string":
          p.elseIf((0, s._)`${b} == "number" || ${b} == "boolean"`).assign(N, (0, s._)`"" + ${y}`).elseIf((0, s._)`${y} === null`).assign(N, (0, s._)`""`);
          return;
        case "number":
          p.elseIf((0, s._)`${b} == "boolean" || ${y} === null
              || (${b} == "string" && ${y} && ${y} == +${y})`).assign(N, (0, s._)`+${y}`);
          return;
        case "integer":
          p.elseIf((0, s._)`${b} === "boolean" || ${y} === null
              || (${b} === "string" && ${y} && ${y} == +${y} && !(${y} % 1))`).assign(N, (0, s._)`+${y}`);
          return;
        case "boolean":
          p.elseIf((0, s._)`${y} === "false" || ${y} === 0 || ${y} === null`).assign(N, !1).elseIf((0, s._)`${y} === "true" || ${y} === 1`).assign(N, !0);
          return;
        case "null":
          p.elseIf((0, s._)`${y} === "" || ${y} === 0 || ${y} === false`), p.assign(N, null);
          return;
        case "array":
          p.elseIf((0, s._)`${b} === "string" || ${b} === "number"
              || ${b} === "boolean" || ${y} === null`).assign(N, (0, s._)`[${y}]`);
      }
    }
  }
  function E({ gen: n, parentData: m, parentDataProperty: v }, p) {
    n.if((0, s._)`${m} !== undefined`, () => n.assign((0, s._)`${m}[${v}]`, p));
  }
  function _(n, m, v, p = i.Correct) {
    const y = p === i.Correct ? s.operators.EQ : s.operators.NEQ;
    let $;
    switch (n) {
      case "null":
        return (0, s._)`${m} ${y} null`;
      case "array":
        $ = (0, s._)`Array.isArray(${m})`;
        break;
      case "object":
        $ = (0, s._)`${m} && typeof ${m} == "object" && !Array.isArray(${m})`;
        break;
      case "integer":
        $ = b((0, s._)`!(${m} % 1) && !isNaN(${m})`);
        break;
      case "number":
        $ = b();
        break;
      default:
        return (0, s._)`typeof ${m} ${y} ${n}`;
    }
    return p === i.Correct ? $ : (0, s.not)($);
    function b(N = s.nil) {
      return (0, s.and)((0, s._)`typeof ${m} == "number"`, N, v ? (0, s._)`isFinite(${m})` : s.nil);
    }
  }
  ye.checkDataType = _;
  function w(n, m, v, p) {
    if (n.length === 1)
      return _(n[0], m, v, p);
    let y;
    const $ = (0, d.toHash)(n);
    if ($.array && $.object) {
      const b = (0, s._)`typeof ${m} != "object"`;
      y = $.null ? b : (0, s._)`!${m} || ${b}`, delete $.null, delete $.array, delete $.object;
    } else
      y = s.nil;
    $.number && delete $.integer;
    for (const b in $)
      y = (0, s.and)(y, _(b, m, v, p));
    return y;
  }
  ye.checkDataTypes = w;
  const R = {
    message: ({ schema: n }) => `must be ${n}`,
    params: ({ schema: n, schemaValue: m }) => typeof n == "string" ? (0, s._)`{type: ${n}}` : (0, s._)`{type: ${m}}`
  };
  function u(n) {
    const m = h(n);
    (0, f.reportError)(m, R);
  }
  ye.reportTypeError = u;
  function h(n) {
    const { gen: m, data: v, schema: p } = n, y = (0, d.schemaRefOrVal)(n, p, "type");
    return {
      gen: m,
      keyword: "type",
      data: v,
      schema: p.type,
      schemaCode: y,
      schemaValue: y,
      parentSchema: p,
      params: {},
      it: n
    };
  }
  return ye;
}
var yt = {}, Mc;
function Ih() {
  if (Mc) return yt;
  Mc = 1, Object.defineProperty(yt, "__esModule", { value: !0 }), yt.assignDefaults = void 0;
  const e = te(), t = oe();
  function f(d, i) {
    const { properties: r, items: a } = d.schema;
    if (i === "object" && r)
      for (const o in r)
        s(d, o, r[o].default);
    else i === "array" && Array.isArray(a) && a.forEach((o, l) => s(d, l, o.default));
  }
  yt.assignDefaults = f;
  function s(d, i, r) {
    const { gen: a, compositeRule: o, data: l, opts: c } = d;
    if (r === void 0)
      return;
    const g = (0, e._)`${l}${(0, e.getProperty)(i)}`;
    if (o) {
      (0, t.checkStrictMode)(d, `default is ignored for: ${g}`);
      return;
    }
    let E = (0, e._)`${g} === undefined`;
    c.useDefaults === "empty" && (E = (0, e._)`${E} || ${g} === null || ${g} === ""`), a.if(E, (0, e._)`${g} = ${(0, e.stringify)(r)}`);
  }
  return yt;
}
var Ie = {}, le = {}, Uc;
function Ce() {
  if (Uc) return le;
  Uc = 1, Object.defineProperty(le, "__esModule", { value: !0 }), le.validateUnion = le.validateArray = le.usePattern = le.callValidateCode = le.schemaProperties = le.allSchemaProperties = le.noPropertyInData = le.propertyInData = le.isOwnProperty = le.hasPropFunc = le.reportMissingProp = le.checkMissingProp = le.checkReportMissingProp = void 0;
  const e = te(), t = oe(), f = Ke(), s = oe();
  function d(n, m) {
    const { gen: v, data: p, it: y } = n;
    v.if(c(v, p, m, y.opts.ownProperties), () => {
      n.setParams({ missingProperty: (0, e._)`${m}` }, !0), n.error();
    });
  }
  le.checkReportMissingProp = d;
  function i({ gen: n, data: m, it: { opts: v } }, p, y) {
    return (0, e.or)(...p.map(($) => (0, e.and)(c(n, m, $, v.ownProperties), (0, e._)`${y} = ${$}`)));
  }
  le.checkMissingProp = i;
  function r(n, m) {
    n.setParams({ missingProperty: m }, !0), n.error();
  }
  le.reportMissingProp = r;
  function a(n) {
    return n.scopeValue("func", {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      ref: Object.prototype.hasOwnProperty,
      code: (0, e._)`Object.prototype.hasOwnProperty`
    });
  }
  le.hasPropFunc = a;
  function o(n, m, v) {
    return (0, e._)`${a(n)}.call(${m}, ${v})`;
  }
  le.isOwnProperty = o;
  function l(n, m, v, p) {
    const y = (0, e._)`${m}${(0, e.getProperty)(v)} !== undefined`;
    return p ? (0, e._)`${y} && ${o(n, m, v)}` : y;
  }
  le.propertyInData = l;
  function c(n, m, v, p) {
    const y = (0, e._)`${m}${(0, e.getProperty)(v)} === undefined`;
    return p ? (0, e.or)(y, (0, e.not)(o(n, m, v))) : y;
  }
  le.noPropertyInData = c;
  function g(n) {
    return n ? Object.keys(n).filter((m) => m !== "__proto__") : [];
  }
  le.allSchemaProperties = g;
  function E(n, m) {
    return g(m).filter((v) => !(0, t.alwaysValidSchema)(n, m[v]));
  }
  le.schemaProperties = E;
  function _({ schemaCode: n, data: m, it: { gen: v, topSchemaRef: p, schemaPath: y, errorPath: $ }, it: b }, N, L, F) {
    const H = F ? (0, e._)`${n}, ${m}, ${p}${y}` : m, M = [
      [f.default.instancePath, (0, e.strConcat)(f.default.instancePath, $)],
      [f.default.parentData, b.parentData],
      [f.default.parentDataProperty, b.parentDataProperty],
      [f.default.rootData, f.default.rootData]
    ];
    b.opts.dynamicRef && M.push([f.default.dynamicAnchors, f.default.dynamicAnchors]);
    const U = (0, e._)`${H}, ${v.object(...M)}`;
    return L !== e.nil ? (0, e._)`${N}.call(${L}, ${U})` : (0, e._)`${N}(${U})`;
  }
  le.callValidateCode = _;
  const w = (0, e._)`new RegExp`;
  function R({ gen: n, it: { opts: m } }, v) {
    const p = m.unicodeRegExp ? "u" : "", { regExp: y } = m.code, $ = y(v, p);
    return n.scopeValue("pattern", {
      key: $.toString(),
      ref: $,
      code: (0, e._)`${y.code === "new RegExp" ? w : (0, s.useFunc)(n, y)}(${v}, ${p})`
    });
  }
  le.usePattern = R;
  function u(n) {
    const { gen: m, data: v, keyword: p, it: y } = n, $ = m.name("valid");
    if (y.allErrors) {
      const N = m.let("valid", !0);
      return b(() => m.assign(N, !1)), N;
    }
    return m.var($, !0), b(() => m.break()), $;
    function b(N) {
      const L = m.const("len", (0, e._)`${v}.length`);
      m.forRange("i", 0, L, (F) => {
        n.subschema({
          keyword: p,
          dataProp: F,
          dataPropType: t.Type.Num
        }, $), m.if((0, e.not)($), N);
      });
    }
  }
  le.validateArray = u;
  function h(n) {
    const { gen: m, schema: v, keyword: p, it: y } = n;
    if (!Array.isArray(v))
      throw new Error("ajv implementation error");
    if (v.some((L) => (0, t.alwaysValidSchema)(y, L)) && !y.opts.unevaluated)
      return;
    const b = m.let("valid", !1), N = m.name("_valid");
    m.block(() => v.forEach((L, F) => {
      const H = n.subschema({
        keyword: p,
        schemaProp: F,
        compositeRule: !0
      }, N);
      m.assign(b, (0, e._)`${b} || ${N}`), n.mergeValidEvaluated(H, N) || m.if((0, e.not)(b));
    })), n.result(b, () => n.reset(), () => n.error(!0));
  }
  return le.validateUnion = h, le;
}
var Vc;
function Th() {
  if (Vc) return Ie;
  Vc = 1, Object.defineProperty(Ie, "__esModule", { value: !0 }), Ie.validateKeywordUsage = Ie.validSchemaType = Ie.funcKeywordCode = Ie.macroKeywordCode = void 0;
  const e = te(), t = Ke(), f = Ce(), s = On();
  function d(E, _) {
    const { gen: w, keyword: R, schema: u, parentSchema: h, it: n } = E, m = _.macro.call(n.self, u, h, n), v = l(w, R, m);
    n.opts.validateSchema !== !1 && n.self.validateSchema(m, !0);
    const p = w.name("valid");
    E.subschema({
      schema: m,
      schemaPath: e.nil,
      errSchemaPath: `${n.errSchemaPath}/${R}`,
      topSchemaRef: v,
      compositeRule: !0
    }, p), E.pass(p, () => E.error(!0));
  }
  Ie.macroKeywordCode = d;
  function i(E, _) {
    var w;
    const { gen: R, keyword: u, schema: h, parentSchema: n, $data: m, it: v } = E;
    o(v, _);
    const p = !m && _.compile ? _.compile.call(v.self, h, n, v) : _.validate, y = l(R, u, p), $ = R.let("valid");
    E.block$data($, b), E.ok((w = _.valid) !== null && w !== void 0 ? w : $);
    function b() {
      if (_.errors === !1)
        F(), _.modifying && r(E), H(() => E.error());
      else {
        const M = _.async ? N() : L();
        _.modifying && r(E), H(() => a(E, M));
      }
    }
    function N() {
      const M = R.let("ruleErrs", null);
      return R.try(() => F((0, e._)`await `), (U) => R.assign($, !1).if((0, e._)`${U} instanceof ${v.ValidationError}`, () => R.assign(M, (0, e._)`${U}.errors`), () => R.throw(U))), M;
    }
    function L() {
      const M = (0, e._)`${y}.errors`;
      return R.assign(M, null), F(e.nil), M;
    }
    function F(M = _.async ? (0, e._)`await ` : e.nil) {
      const U = v.opts.passContext ? t.default.this : t.default.self, z = !("compile" in _ && !m || _.schema === !1);
      R.assign($, (0, e._)`${M}${(0, f.callValidateCode)(E, y, U, z)}`, _.modifying);
    }
    function H(M) {
      var U;
      R.if((0, e.not)((U = _.valid) !== null && U !== void 0 ? U : $), M);
    }
  }
  Ie.funcKeywordCode = i;
  function r(E) {
    const { gen: _, data: w, it: R } = E;
    _.if(R.parentData, () => _.assign(w, (0, e._)`${R.parentData}[${R.parentDataProperty}]`));
  }
  function a(E, _) {
    const { gen: w } = E;
    w.if((0, e._)`Array.isArray(${_})`, () => {
      w.assign(t.default.vErrors, (0, e._)`${t.default.vErrors} === null ? ${_} : ${t.default.vErrors}.concat(${_})`).assign(t.default.errors, (0, e._)`${t.default.vErrors}.length`), (0, s.extendErrors)(E);
    }, () => E.error());
  }
  function o({ schemaEnv: E }, _) {
    if (_.async && !E.$async)
      throw new Error("async keyword in sync schema");
  }
  function l(E, _, w) {
    if (w === void 0)
      throw new Error(`keyword "${_}" failed to compile`);
    return E.scopeValue("keyword", typeof w == "function" ? { ref: w } : { ref: w, code: (0, e.stringify)(w) });
  }
  function c(E, _, w = !1) {
    return !_.length || _.some((R) => R === "array" ? Array.isArray(E) : R === "object" ? E && typeof E == "object" && !Array.isArray(E) : typeof E == R || w && typeof E > "u");
  }
  Ie.validSchemaType = c;
  function g({ schema: E, opts: _, self: w, errSchemaPath: R }, u, h) {
    if (Array.isArray(u.keyword) ? !u.keyword.includes(h) : u.keyword !== h)
      throw new Error("ajv implementation error");
    const n = u.dependencies;
    if (n?.some((m) => !Object.prototype.hasOwnProperty.call(E, m)))
      throw new Error(`parent schema must have dependencies of ${h}: ${n.join(",")}`);
    if (u.validateSchema && !u.validateSchema(E[h])) {
      const v = `keyword "${h}" value is invalid at path "${R}": ` + w.errorsText(u.validateSchema.errors);
      if (_.validateSchema === "log")
        w.logger.error(v);
      else
        throw new Error(v);
    }
  }
  return Ie.validateKeywordUsage = g, Ie;
}
var Ue = {}, zc;
function Ch() {
  if (zc) return Ue;
  zc = 1, Object.defineProperty(Ue, "__esModule", { value: !0 }), Ue.extendSubschemaMode = Ue.extendSubschemaData = Ue.getSubschema = void 0;
  const e = te(), t = oe();
  function f(i, { keyword: r, schemaProp: a, schema: o, schemaPath: l, errSchemaPath: c, topSchemaRef: g }) {
    if (r !== void 0 && o !== void 0)
      throw new Error('both "keyword" and "schema" passed, only one allowed');
    if (r !== void 0) {
      const E = i.schema[r];
      return a === void 0 ? {
        schema: E,
        schemaPath: (0, e._)`${i.schemaPath}${(0, e.getProperty)(r)}`,
        errSchemaPath: `${i.errSchemaPath}/${r}`
      } : {
        schema: E[a],
        schemaPath: (0, e._)`${i.schemaPath}${(0, e.getProperty)(r)}${(0, e.getProperty)(a)}`,
        errSchemaPath: `${i.errSchemaPath}/${r}/${(0, t.escapeFragment)(a)}`
      };
    }
    if (o !== void 0) {
      if (l === void 0 || c === void 0 || g === void 0)
        throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
      return {
        schema: o,
        schemaPath: l,
        topSchemaRef: g,
        errSchemaPath: c
      };
    }
    throw new Error('either "keyword" or "schema" must be passed');
  }
  Ue.getSubschema = f;
  function s(i, r, { dataProp: a, dataPropType: o, data: l, dataTypes: c, propertyName: g }) {
    if (l !== void 0 && a !== void 0)
      throw new Error('both "data" and "dataProp" passed, only one allowed');
    const { gen: E } = r;
    if (a !== void 0) {
      const { errorPath: w, dataPathArr: R, opts: u } = r, h = E.let("data", (0, e._)`${r.data}${(0, e.getProperty)(a)}`, !0);
      _(h), i.errorPath = (0, e.str)`${w}${(0, t.getErrorPath)(a, o, u.jsPropertySyntax)}`, i.parentDataProperty = (0, e._)`${a}`, i.dataPathArr = [...R, i.parentDataProperty];
    }
    if (l !== void 0) {
      const w = l instanceof e.Name ? l : E.let("data", l, !0);
      _(w), g !== void 0 && (i.propertyName = g);
    }
    c && (i.dataTypes = c);
    function _(w) {
      i.data = w, i.dataLevel = r.dataLevel + 1, i.dataTypes = [], r.definedProperties = /* @__PURE__ */ new Set(), i.parentData = r.data, i.dataNames = [...r.dataNames, w];
    }
  }
  Ue.extendSubschemaData = s;
  function d(i, { jtdDiscriminator: r, jtdMetadata: a, compositeRule: o, createErrors: l, allErrors: c }) {
    o !== void 0 && (i.compositeRule = o), l !== void 0 && (i.createErrors = l), c !== void 0 && (i.allErrors = c), i.jtdDiscriminator = r, i.jtdMetadata = a;
  }
  return Ue.extendSubschemaMode = d, Ue;
}
var ge = {}, Fs = { exports: {} }, Gc;
function Dh() {
  if (Gc) return Fs.exports;
  Gc = 1;
  var e = Fs.exports = function(s, d, i) {
    typeof d == "function" && (i = d, d = {}), i = d.cb || i;
    var r = typeof i == "function" ? i : i.pre || function() {
    }, a = i.post || function() {
    };
    t(d, r, a, s, "", s);
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
  function t(s, d, i, r, a, o, l, c, g, E) {
    if (r && typeof r == "object" && !Array.isArray(r)) {
      d(r, a, o, l, c, g, E);
      for (var _ in r) {
        var w = r[_];
        if (Array.isArray(w)) {
          if (_ in e.arrayKeywords)
            for (var R = 0; R < w.length; R++)
              t(s, d, i, w[R], a + "/" + _ + "/" + R, o, a, _, r, R);
        } else if (_ in e.propsKeywords) {
          if (w && typeof w == "object")
            for (var u in w)
              t(s, d, i, w[u], a + "/" + _ + "/" + f(u), o, a, _, r, u);
        } else (_ in e.keywords || s.allKeys && !(_ in e.skipKeywords)) && t(s, d, i, w, a + "/" + _, o, a, _, r);
      }
      i(r, a, o, l, c, g, E);
    }
  }
  function f(s) {
    return s.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  return Fs.exports;
}
var Kc;
function In() {
  if (Kc) return ge;
  Kc = 1, Object.defineProperty(ge, "__esModule", { value: !0 }), ge.getSchemaRefs = ge.resolveUrl = ge.normalizeId = ge._getFullPath = ge.getFullPath = ge.inlineRef = void 0;
  const e = oe(), t = Rn(), f = Dh(), s = /* @__PURE__ */ new Set([
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
  function d(R, u = !0) {
    return typeof R == "boolean" ? !0 : u === !0 ? !r(R) : u ? a(R) <= u : !1;
  }
  ge.inlineRef = d;
  const i = /* @__PURE__ */ new Set([
    "$ref",
    "$recursiveRef",
    "$recursiveAnchor",
    "$dynamicRef",
    "$dynamicAnchor"
  ]);
  function r(R) {
    for (const u in R) {
      if (i.has(u))
        return !0;
      const h = R[u];
      if (Array.isArray(h) && h.some(r) || typeof h == "object" && r(h))
        return !0;
    }
    return !1;
  }
  function a(R) {
    let u = 0;
    for (const h in R) {
      if (h === "$ref")
        return 1 / 0;
      if (u++, !s.has(h) && (typeof R[h] == "object" && (0, e.eachItem)(R[h], (n) => u += a(n)), u === 1 / 0))
        return 1 / 0;
    }
    return u;
  }
  function o(R, u = "", h) {
    h !== !1 && (u = g(u));
    const n = R.parse(u);
    return l(R, n);
  }
  ge.getFullPath = o;
  function l(R, u) {
    return R.serialize(u).split("#")[0] + "#";
  }
  ge._getFullPath = l;
  const c = /#\/?$/;
  function g(R) {
    return R ? R.replace(c, "") : "";
  }
  ge.normalizeId = g;
  function E(R, u, h) {
    return h = g(h), R.resolve(u, h);
  }
  ge.resolveUrl = E;
  const _ = /^[a-z_][-a-z0-9._]*$/i;
  function w(R, u) {
    if (typeof R == "boolean")
      return {};
    const { schemaId: h, uriResolver: n } = this.opts, m = g(R[h] || u), v = { "": m }, p = o(n, m, !1), y = {}, $ = /* @__PURE__ */ new Set();
    return f(R, { allKeys: !0 }, (L, F, H, M) => {
      if (M === void 0)
        return;
      const U = p + F;
      let z = v[M];
      typeof L[h] == "string" && (z = J.call(this, L[h])), W.call(this, L.$anchor), W.call(this, L.$dynamicAnchor), v[F] = z;
      function J(j) {
        const G = this.opts.uriResolver.resolve;
        if (j = g(z ? G(z, j) : j), $.has(j))
          throw N(j);
        $.add(j);
        let D = this.refs[j];
        return typeof D == "string" && (D = this.refs[D]), typeof D == "object" ? b(L, D.schema, j) : j !== g(U) && (j[0] === "#" ? (b(L, y[j], j), y[j] = L) : this.refs[j] = U), j;
      }
      function W(j) {
        if (typeof j == "string") {
          if (!_.test(j))
            throw new Error(`invalid anchor "${j}"`);
          J.call(this, `#${j}`);
        }
      }
    }), y;
    function b(L, F, H) {
      if (F !== void 0 && !t(L, F))
        throw N(H);
    }
    function N(L) {
      return new Error(`reference "${L}" resolves to more than one schema`);
    }
  }
  return ge.getSchemaRefs = w, ge;
}
var Hc;
function Tn() {
  if (Hc) return Fe;
  Hc = 1, Object.defineProperty(Fe, "__esModule", { value: !0 }), Fe.getData = Fe.KeywordCxt = Fe.validateFunctionCode = void 0;
  const e = Oh(), t = En(), f = mf(), s = En(), d = Ih(), i = Th(), r = Ch(), a = te(), o = Ke(), l = In(), c = oe(), g = On();
  function E(I) {
    if (p(I) && ($(I), v(I))) {
      u(I);
      return;
    }
    _(I, () => (0, e.topBoolOrEmptySchema)(I));
  }
  Fe.validateFunctionCode = E;
  function _({ gen: I, validateName: C, schema: q, schemaEnv: V, opts: x }, Y) {
    x.code.es5 ? I.func(C, (0, a._)`${o.default.data}, ${o.default.valCxt}`, V.$async, () => {
      I.code((0, a._)`"use strict"; ${n(q, x)}`), R(I, x), I.code(Y);
    }) : I.func(C, (0, a._)`${o.default.data}, ${w(x)}`, V.$async, () => I.code(n(q, x)).code(Y));
  }
  function w(I) {
    return (0, a._)`{${o.default.instancePath}="", ${o.default.parentData}, ${o.default.parentDataProperty}, ${o.default.rootData}=${o.default.data}${I.dynamicRef ? (0, a._)`, ${o.default.dynamicAnchors}={}` : a.nil}}={}`;
  }
  function R(I, C) {
    I.if(o.default.valCxt, () => {
      I.var(o.default.instancePath, (0, a._)`${o.default.valCxt}.${o.default.instancePath}`), I.var(o.default.parentData, (0, a._)`${o.default.valCxt}.${o.default.parentData}`), I.var(o.default.parentDataProperty, (0, a._)`${o.default.valCxt}.${o.default.parentDataProperty}`), I.var(o.default.rootData, (0, a._)`${o.default.valCxt}.${o.default.rootData}`), C.dynamicRef && I.var(o.default.dynamicAnchors, (0, a._)`${o.default.valCxt}.${o.default.dynamicAnchors}`);
    }, () => {
      I.var(o.default.instancePath, (0, a._)`""`), I.var(o.default.parentData, (0, a._)`undefined`), I.var(o.default.parentDataProperty, (0, a._)`undefined`), I.var(o.default.rootData, o.default.data), C.dynamicRef && I.var(o.default.dynamicAnchors, (0, a._)`{}`);
    });
  }
  function u(I) {
    const { schema: C, opts: q, gen: V } = I;
    _(I, () => {
      q.$comment && C.$comment && M(I), L(I), V.let(o.default.vErrors, null), V.let(o.default.errors, 0), q.unevaluated && h(I), b(I), U(I);
    });
  }
  function h(I) {
    const { gen: C, validateName: q } = I;
    I.evaluated = C.const("evaluated", (0, a._)`${q}.evaluated`), C.if((0, a._)`${I.evaluated}.dynamicProps`, () => C.assign((0, a._)`${I.evaluated}.props`, (0, a._)`undefined`)), C.if((0, a._)`${I.evaluated}.dynamicItems`, () => C.assign((0, a._)`${I.evaluated}.items`, (0, a._)`undefined`));
  }
  function n(I, C) {
    const q = typeof I == "object" && I[C.schemaId];
    return q && (C.code.source || C.code.process) ? (0, a._)`/*# sourceURL=${q} */` : a.nil;
  }
  function m(I, C) {
    if (p(I) && ($(I), v(I))) {
      y(I, C);
      return;
    }
    (0, e.boolOrEmptySchema)(I, C);
  }
  function v({ schema: I, self: C }) {
    if (typeof I == "boolean")
      return !I;
    for (const q in I)
      if (C.RULES.all[q])
        return !0;
    return !1;
  }
  function p(I) {
    return typeof I.schema != "boolean";
  }
  function y(I, C) {
    const { schema: q, gen: V, opts: x } = I;
    x.$comment && q.$comment && M(I), F(I), H(I);
    const Y = V.const("_errs", o.default.errors);
    b(I, Y), V.var(C, (0, a._)`${Y} === ${o.default.errors}`);
  }
  function $(I) {
    (0, c.checkUnknownRules)(I), N(I);
  }
  function b(I, C) {
    if (I.opts.jtd)
      return J(I, [], !1, C);
    const q = (0, t.getSchemaTypes)(I.schema), V = (0, t.coerceAndCheckDataType)(I, q);
    J(I, q, !V, C);
  }
  function N(I) {
    const { schema: C, errSchemaPath: q, opts: V, self: x } = I;
    C.$ref && V.ignoreKeywordsWithRef && (0, c.schemaHasRulesButRef)(C, x.RULES) && x.logger.warn(`$ref: keywords ignored in schema at path "${q}"`);
  }
  function L(I) {
    const { schema: C, opts: q } = I;
    C.default !== void 0 && q.useDefaults && q.strictSchema && (0, c.checkStrictMode)(I, "default is ignored in the schema root");
  }
  function F(I) {
    const C = I.schema[I.opts.schemaId];
    C && (I.baseId = (0, l.resolveUrl)(I.opts.uriResolver, I.baseId, C));
  }
  function H(I) {
    if (I.schema.$async && !I.schemaEnv.$async)
      throw new Error("async schema in sync schema");
  }
  function M({ gen: I, schemaEnv: C, schema: q, errSchemaPath: V, opts: x }) {
    const Y = q.$comment;
    if (x.$comment === !0)
      I.code((0, a._)`${o.default.self}.logger.log(${Y})`);
    else if (typeof x.$comment == "function") {
      const ne = (0, a.str)`${V}/$comment`, he = I.scopeValue("root", { ref: C.root });
      I.code((0, a._)`${o.default.self}.opts.$comment(${Y}, ${ne}, ${he}.schema)`);
    }
  }
  function U(I) {
    const { gen: C, schemaEnv: q, validateName: V, ValidationError: x, opts: Y } = I;
    q.$async ? C.if((0, a._)`${o.default.errors} === 0`, () => C.return(o.default.data), () => C.throw((0, a._)`new ${x}(${o.default.vErrors})`)) : (C.assign((0, a._)`${V}.errors`, o.default.vErrors), Y.unevaluated && z(I), C.return((0, a._)`${o.default.errors} === 0`));
  }
  function z({ gen: I, evaluated: C, props: q, items: V }) {
    q instanceof a.Name && I.assign((0, a._)`${C}.props`, q), V instanceof a.Name && I.assign((0, a._)`${C}.items`, V);
  }
  function J(I, C, q, V) {
    const { gen: x, schema: Y, data: ne, allErrors: he, opts: ae, self: ce } = I, { RULES: se } = ce;
    if (Y.$ref && (ae.ignoreKeywordsWithRef || !(0, c.schemaHasRulesButRef)(Y, se))) {
      x.block(() => K(I, "$ref", se.all.$ref.definition));
      return;
    }
    ae.jtd || j(I, C), x.block(() => {
      for (const de of se.rules)
        we(de);
      we(se.post);
    });
    function we(de) {
      (0, f.shouldUseGroup)(Y, de) && (de.type ? (x.if((0, s.checkDataType)(de.type, ne, ae.strictNumbers)), W(I, de), C.length === 1 && C[0] === de.type && q && (x.else(), (0, s.reportTypeError)(I)), x.endIf()) : W(I, de), he || x.if((0, a._)`${o.default.errors} === ${V || 0}`));
    }
  }
  function W(I, C) {
    const { gen: q, schema: V, opts: { useDefaults: x } } = I;
    x && (0, d.assignDefaults)(I, C.type), q.block(() => {
      for (const Y of C.rules)
        (0, f.shouldUseRule)(V, Y) && K(I, Y.keyword, Y.definition, C.type);
    });
  }
  function j(I, C) {
    I.schemaEnv.meta || !I.opts.strictTypes || (G(I, C), I.opts.allowUnionTypes || D(I, C), O(I, I.dataTypes));
  }
  function G(I, C) {
    if (C.length) {
      if (!I.dataTypes.length) {
        I.dataTypes = C;
        return;
      }
      C.forEach((q) => {
        T(I.dataTypes, q) || P(I, `type "${q}" not allowed by context "${I.dataTypes.join(",")}"`);
      }), S(I, C);
    }
  }
  function D(I, C) {
    C.length > 1 && !(C.length === 2 && C.includes("null")) && P(I, "use allowUnionTypes to allow union type keyword");
  }
  function O(I, C) {
    const q = I.self.RULES.all;
    for (const V in q) {
      const x = q[V];
      if (typeof x == "object" && (0, f.shouldUseRule)(I.schema, x)) {
        const { type: Y } = x.definition;
        Y.length && !Y.some((ne) => k(C, ne)) && P(I, `missing type "${Y.join(",")}" for keyword "${V}"`);
      }
    }
  }
  function k(I, C) {
    return I.includes(C) || C === "number" && I.includes("integer");
  }
  function T(I, C) {
    return I.includes(C) || C === "integer" && I.includes("number");
  }
  function S(I, C) {
    const q = [];
    for (const V of I.dataTypes)
      T(C, V) ? q.push(V) : C.includes("integer") && V === "number" && q.push("integer");
    I.dataTypes = q;
  }
  function P(I, C) {
    const q = I.schemaEnv.baseId + I.errSchemaPath;
    C += ` at "${q}" (strictTypes)`, (0, c.checkStrictMode)(I, C, I.opts.strictTypes);
  }
  class A {
    constructor(C, q, V) {
      if ((0, i.validateKeywordUsage)(C, q, V), this.gen = C.gen, this.allErrors = C.allErrors, this.keyword = V, this.data = C.data, this.schema = C.schema[V], this.$data = q.$data && C.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, c.schemaRefOrVal)(C, this.schema, V, this.$data), this.schemaType = q.schemaType, this.parentSchema = C.schema, this.params = {}, this.it = C, this.def = q, this.$data)
        this.schemaCode = C.gen.const("vSchema", Z(this.$data, C));
      else if (this.schemaCode = this.schemaValue, !(0, i.validSchemaType)(this.schema, q.schemaType, q.allowUndefined))
        throw new Error(`${V} value must be ${JSON.stringify(q.schemaType)}`);
      ("code" in q ? q.trackErrors : q.errors !== !1) && (this.errsCount = C.gen.const("_errs", o.default.errors));
    }
    result(C, q, V) {
      this.failResult((0, a.not)(C), q, V);
    }
    failResult(C, q, V) {
      this.gen.if(C), V ? V() : this.error(), q ? (this.gen.else(), q(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    pass(C, q) {
      this.failResult((0, a.not)(C), void 0, q);
    }
    fail(C) {
      if (C === void 0) {
        this.error(), this.allErrors || this.gen.if(!1);
        return;
      }
      this.gen.if(C), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    fail$data(C) {
      if (!this.$data)
        return this.fail(C);
      const { schemaCode: q } = this;
      this.fail((0, a._)`${q} !== undefined && (${(0, a.or)(this.invalid$data(), C)})`);
    }
    error(C, q, V) {
      if (q) {
        this.setParams(q), this._error(C, V), this.setParams({});
        return;
      }
      this._error(C, V);
    }
    _error(C, q) {
      (C ? g.reportExtraError : g.reportError)(this, this.def.error, q);
    }
    $dataError() {
      (0, g.reportError)(this, this.def.$dataError || g.keyword$DataError);
    }
    reset() {
      if (this.errsCount === void 0)
        throw new Error('add "trackErrors" to keyword definition');
      (0, g.resetErrorsCount)(this.gen, this.errsCount);
    }
    ok(C) {
      this.allErrors || this.gen.if(C);
    }
    setParams(C, q) {
      q ? Object.assign(this.params, C) : this.params = C;
    }
    block$data(C, q, V = a.nil) {
      this.gen.block(() => {
        this.check$data(C, V), q();
      });
    }
    check$data(C = a.nil, q = a.nil) {
      if (!this.$data)
        return;
      const { gen: V, schemaCode: x, schemaType: Y, def: ne } = this;
      V.if((0, a.or)((0, a._)`${x} === undefined`, q)), C !== a.nil && V.assign(C, !0), (Y.length || ne.validateSchema) && (V.elseIf(this.invalid$data()), this.$dataError(), C !== a.nil && V.assign(C, !1)), V.else();
    }
    invalid$data() {
      const { gen: C, schemaCode: q, schemaType: V, def: x, it: Y } = this;
      return (0, a.or)(ne(), he());
      function ne() {
        if (V.length) {
          if (!(q instanceof a.Name))
            throw new Error("ajv implementation error");
          const ae = Array.isArray(V) ? V : [V];
          return (0, a._)`${(0, s.checkDataTypes)(ae, q, Y.opts.strictNumbers, s.DataType.Wrong)}`;
        }
        return a.nil;
      }
      function he() {
        if (x.validateSchema) {
          const ae = C.scopeValue("validate$data", { ref: x.validateSchema });
          return (0, a._)`!${ae}(${q})`;
        }
        return a.nil;
      }
    }
    subschema(C, q) {
      const V = (0, r.getSubschema)(this.it, C);
      (0, r.extendSubschemaData)(V, this.it, C), (0, r.extendSubschemaMode)(V, C);
      const x = { ...this.it, ...V, items: void 0, props: void 0 };
      return m(x, q), x;
    }
    mergeEvaluated(C, q) {
      const { it: V, gen: x } = this;
      V.opts.unevaluated && (V.props !== !0 && C.props !== void 0 && (V.props = c.mergeEvaluated.props(x, C.props, V.props, q)), V.items !== !0 && C.items !== void 0 && (V.items = c.mergeEvaluated.items(x, C.items, V.items, q)));
    }
    mergeValidEvaluated(C, q) {
      const { it: V, gen: x } = this;
      if (V.opts.unevaluated && (V.props !== !0 || V.items !== !0))
        return x.if(q, () => this.mergeEvaluated(C, a.Name)), !0;
    }
  }
  Fe.KeywordCxt = A;
  function K(I, C, q, V) {
    const x = new A(I, q, C);
    "code" in q ? q.code(x, V) : x.$data && q.validate ? (0, i.funcKeywordCode)(x, q) : "macro" in q ? (0, i.macroKeywordCode)(x, q) : (q.compile || q.validate) && (0, i.funcKeywordCode)(x, q);
  }
  const B = /^\/(?:[^~]|~0|~1)*$/, X = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
  function Z(I, { dataLevel: C, dataNames: q, dataPathArr: V }) {
    let x, Y;
    if (I === "")
      return o.default.rootData;
    if (I[0] === "/") {
      if (!B.test(I))
        throw new Error(`Invalid JSON-pointer: ${I}`);
      x = I, Y = o.default.rootData;
    } else {
      const ce = X.exec(I);
      if (!ce)
        throw new Error(`Invalid JSON-pointer: ${I}`);
      const se = +ce[1];
      if (x = ce[2], x === "#") {
        if (se >= C)
          throw new Error(ae("property/index", se));
        return V[C - se];
      }
      if (se > C)
        throw new Error(ae("data", se));
      if (Y = q[C - se], !x)
        return Y;
    }
    let ne = Y;
    const he = x.split("/");
    for (const ce of he)
      ce && (Y = (0, a._)`${Y}${(0, a.getProperty)((0, c.unescapeJsonPointer)(ce))}`, ne = (0, a._)`${ne} && ${Y}`);
    return ne;
    function ae(ce, se) {
      return `Cannot access ${ce} ${se} levels up, current level is ${C}`;
    }
  }
  return Fe.getData = Z, Fe;
}
var Cr = {}, xc;
function Qi() {
  if (xc) return Cr;
  xc = 1, Object.defineProperty(Cr, "__esModule", { value: !0 });
  class e extends Error {
    constructor(f) {
      super("validation failed"), this.errors = f, this.ajv = this.validation = !0;
    }
  }
  return Cr.default = e, Cr;
}
var Dr = {}, Bc;
function Cn() {
  if (Bc) return Dr;
  Bc = 1, Object.defineProperty(Dr, "__esModule", { value: !0 });
  const e = In();
  class t extends Error {
    constructor(s, d, i, r) {
      super(r || `can't resolve reference ${i} from id ${d}`), this.missingRef = (0, e.resolveUrl)(s, d, i), this.missingSchema = (0, e.normalizeId)((0, e.getFullPath)(s, this.missingRef));
    }
  }
  return Dr.default = t, Dr;
}
var Re = {}, Wc;
function eo() {
  if (Wc) return Re;
  Wc = 1, Object.defineProperty(Re, "__esModule", { value: !0 }), Re.resolveSchema = Re.getCompilingSchema = Re.resolveRef = Re.compileSchema = Re.SchemaEnv = void 0;
  const e = te(), t = Qi(), f = Ke(), s = In(), d = oe(), i = Tn();
  class r {
    constructor(h) {
      var n;
      this.refs = {}, this.dynamicAnchors = {};
      let m;
      typeof h.schema == "object" && (m = h.schema), this.schema = h.schema, this.schemaId = h.schemaId, this.root = h.root || this, this.baseId = (n = h.baseId) !== null && n !== void 0 ? n : (0, s.normalizeId)(m?.[h.schemaId || "$id"]), this.schemaPath = h.schemaPath, this.localRefs = h.localRefs, this.meta = h.meta, this.$async = m?.$async, this.refs = {};
    }
  }
  Re.SchemaEnv = r;
  function a(u) {
    const h = c.call(this, u);
    if (h)
      return h;
    const n = (0, s.getFullPath)(this.opts.uriResolver, u.root.baseId), { es5: m, lines: v } = this.opts.code, { ownProperties: p } = this.opts, y = new e.CodeGen(this.scope, { es5: m, lines: v, ownProperties: p });
    let $;
    u.$async && ($ = y.scopeValue("Error", {
      ref: t.default,
      code: (0, e._)`require("ajv/dist/runtime/validation_error").default`
    }));
    const b = y.scopeName("validate");
    u.validateName = b;
    const N = {
      gen: y,
      allErrors: this.opts.allErrors,
      data: f.default.data,
      parentData: f.default.parentData,
      parentDataProperty: f.default.parentDataProperty,
      dataNames: [f.default.data],
      dataPathArr: [e.nil],
      // TODO can its length be used as dataLevel if nil is removed?
      dataLevel: 0,
      dataTypes: [],
      definedProperties: /* @__PURE__ */ new Set(),
      topSchemaRef: y.scopeValue("schema", this.opts.code.source === !0 ? { ref: u.schema, code: (0, e.stringify)(u.schema) } : { ref: u.schema }),
      validateName: b,
      ValidationError: $,
      schema: u.schema,
      schemaEnv: u,
      rootId: n,
      baseId: u.baseId || n,
      schemaPath: e.nil,
      errSchemaPath: u.schemaPath || (this.opts.jtd ? "" : "#"),
      errorPath: (0, e._)`""`,
      opts: this.opts,
      self: this
    };
    let L;
    try {
      this._compilations.add(u), (0, i.validateFunctionCode)(N), y.optimize(this.opts.code.optimize);
      const F = y.toString();
      L = `${y.scopeRefs(f.default.scope)}return ${F}`, this.opts.code.process && (L = this.opts.code.process(L, u));
      const M = new Function(`${f.default.self}`, `${f.default.scope}`, L)(this, this.scope.get());
      if (this.scope.value(b, { ref: M }), M.errors = null, M.schema = u.schema, M.schemaEnv = u, u.$async && (M.$async = !0), this.opts.code.source === !0 && (M.source = { validateName: b, validateCode: F, scopeValues: y._values }), this.opts.unevaluated) {
        const { props: U, items: z } = N;
        M.evaluated = {
          props: U instanceof e.Name ? void 0 : U,
          items: z instanceof e.Name ? void 0 : z,
          dynamicProps: U instanceof e.Name,
          dynamicItems: z instanceof e.Name
        }, M.source && (M.source.evaluated = (0, e.stringify)(M.evaluated));
      }
      return u.validate = M, u;
    } catch (F) {
      throw delete u.validate, delete u.validateName, L && this.logger.error("Error compiling schema, function code:", L), F;
    } finally {
      this._compilations.delete(u);
    }
  }
  Re.compileSchema = a;
  function o(u, h, n) {
    var m;
    n = (0, s.resolveUrl)(this.opts.uriResolver, h, n);
    const v = u.refs[n];
    if (v)
      return v;
    let p = E.call(this, u, n);
    if (p === void 0) {
      const y = (m = u.localRefs) === null || m === void 0 ? void 0 : m[n], { schemaId: $ } = this.opts;
      y && (p = new r({ schema: y, schemaId: $, root: u, baseId: h }));
    }
    if (p !== void 0)
      return u.refs[n] = l.call(this, p);
  }
  Re.resolveRef = o;
  function l(u) {
    return (0, s.inlineRef)(u.schema, this.opts.inlineRefs) ? u.schema : u.validate ? u : a.call(this, u);
  }
  function c(u) {
    for (const h of this._compilations)
      if (g(h, u))
        return h;
  }
  Re.getCompilingSchema = c;
  function g(u, h) {
    return u.schema === h.schema && u.root === h.root && u.baseId === h.baseId;
  }
  function E(u, h) {
    let n;
    for (; typeof (n = this.refs[h]) == "string"; )
      h = n;
    return n || this.schemas[h] || _.call(this, u, h);
  }
  function _(u, h) {
    const n = this.opts.uriResolver.parse(h), m = (0, s._getFullPath)(this.opts.uriResolver, n);
    let v = (0, s.getFullPath)(this.opts.uriResolver, u.baseId, void 0);
    if (Object.keys(u.schema).length > 0 && m === v)
      return R.call(this, n, u);
    const p = (0, s.normalizeId)(m), y = this.refs[p] || this.schemas[p];
    if (typeof y == "string") {
      const $ = _.call(this, u, y);
      return typeof $?.schema != "object" ? void 0 : R.call(this, n, $);
    }
    if (typeof y?.schema == "object") {
      if (y.validate || a.call(this, y), p === (0, s.normalizeId)(h)) {
        const { schema: $ } = y, { schemaId: b } = this.opts, N = $[b];
        return N && (v = (0, s.resolveUrl)(this.opts.uriResolver, v, N)), new r({ schema: $, schemaId: b, root: u, baseId: v });
      }
      return R.call(this, n, y);
    }
  }
  Re.resolveSchema = _;
  const w = /* @__PURE__ */ new Set([
    "properties",
    "patternProperties",
    "enum",
    "dependencies",
    "definitions"
  ]);
  function R(u, { baseId: h, schema: n, root: m }) {
    var v;
    if (((v = u.fragment) === null || v === void 0 ? void 0 : v[0]) !== "/")
      return;
    for (const $ of u.fragment.slice(1).split("/")) {
      if (typeof n == "boolean")
        return;
      const b = n[(0, d.unescapeFragment)($)];
      if (b === void 0)
        return;
      n = b;
      const N = typeof n == "object" && n[this.opts.schemaId];
      !w.has($) && N && (h = (0, s.resolveUrl)(this.opts.uriResolver, h, N));
    }
    let p;
    if (typeof n != "boolean" && n.$ref && !(0, d.schemaHasRulesButRef)(n, this.RULES)) {
      const $ = (0, s.resolveUrl)(this.opts.uriResolver, h, n.$ref);
      p = _.call(this, m, $);
    }
    const { schemaId: y } = this.opts;
    if (p = p || new r({ schema: n, schemaId: y, root: m, baseId: h }), p.schema !== p.root.schema)
      return p;
  }
  return Re;
}
const Ah = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", Lh = "Meta-schema for $data reference (JSON AnySchema extension proposal)", kh = "object", qh = ["$data"], jh = { $data: { type: "string", anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }] } }, Fh = !1, Mh = {
  $id: Ah,
  description: Lh,
  type: kh,
  required: qh,
  properties: jh,
  additionalProperties: Fh
};
var Ar = {}, Jc;
function Uh() {
  if (Jc) return Ar;
  Jc = 1, Object.defineProperty(Ar, "__esModule", { value: !0 });
  const e = uf();
  return e.code = 'require("ajv/dist/runtime/uri").default', Ar.default = e, Ar;
}
var Zc;
function Vh() {
  return Zc || (Zc = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
    var t = Tn();
    Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
      return t.KeywordCxt;
    } });
    var f = te();
    Object.defineProperty(e, "_", { enumerable: !0, get: function() {
      return f._;
    } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
      return f.str;
    } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
      return f.stringify;
    } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
      return f.nil;
    } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
      return f.Name;
    } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
      return f.CodeGen;
    } });
    const s = Qi(), d = Cn(), i = hf(), r = eo(), a = te(), o = In(), l = En(), c = oe(), g = Mh, E = Uh(), _ = (D, O) => new RegExp(D, O);
    _.code = "new RegExp";
    const w = ["removeAdditional", "useDefaults", "coerceTypes"], R = /* @__PURE__ */ new Set([
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
    ]), u = {
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
    }, n = 200;
    function m(D) {
      var O, k, T, S, P, A, K, B, X, Z, I, C, q, V, x, Y, ne, he, ae, ce, se, we, de, He, xe;
      const Pe = D.strict, Be = (O = D.code) === null || O === void 0 ? void 0 : O.optimize, ft = Be === !0 || Be === void 0 ? 1 : Be || 0, dt = (T = (k = D.code) === null || k === void 0 ? void 0 : k.regExp) !== null && T !== void 0 ? T : _, jn = (S = D.uriResolver) !== null && S !== void 0 ? S : E.default;
      return {
        strictSchema: (A = (P = D.strictSchema) !== null && P !== void 0 ? P : Pe) !== null && A !== void 0 ? A : !0,
        strictNumbers: (B = (K = D.strictNumbers) !== null && K !== void 0 ? K : Pe) !== null && B !== void 0 ? B : !0,
        strictTypes: (Z = (X = D.strictTypes) !== null && X !== void 0 ? X : Pe) !== null && Z !== void 0 ? Z : "log",
        strictTuples: (C = (I = D.strictTuples) !== null && I !== void 0 ? I : Pe) !== null && C !== void 0 ? C : "log",
        strictRequired: (V = (q = D.strictRequired) !== null && q !== void 0 ? q : Pe) !== null && V !== void 0 ? V : !1,
        code: D.code ? { ...D.code, optimize: ft, regExp: dt } : { optimize: ft, regExp: dt },
        loopRequired: (x = D.loopRequired) !== null && x !== void 0 ? x : n,
        loopEnum: (Y = D.loopEnum) !== null && Y !== void 0 ? Y : n,
        meta: (ne = D.meta) !== null && ne !== void 0 ? ne : !0,
        messages: (he = D.messages) !== null && he !== void 0 ? he : !0,
        inlineRefs: (ae = D.inlineRefs) !== null && ae !== void 0 ? ae : !0,
        schemaId: (ce = D.schemaId) !== null && ce !== void 0 ? ce : "$id",
        addUsedSchema: (se = D.addUsedSchema) !== null && se !== void 0 ? se : !0,
        validateSchema: (we = D.validateSchema) !== null && we !== void 0 ? we : !0,
        validateFormats: (de = D.validateFormats) !== null && de !== void 0 ? de : !0,
        unicodeRegExp: (He = D.unicodeRegExp) !== null && He !== void 0 ? He : !0,
        int32range: (xe = D.int32range) !== null && xe !== void 0 ? xe : !0,
        uriResolver: jn
      };
    }
    class v {
      constructor(O = {}) {
        this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), O = this.opts = { ...O, ...m(O) };
        const { es5: k, lines: T } = this.opts.code;
        this.scope = new a.ValueScope({ scope: {}, prefixes: R, es5: k, lines: T }), this.logger = H(O.logger);
        const S = O.validateFormats;
        O.validateFormats = !1, this.RULES = (0, i.getRules)(), p.call(this, u, O, "NOT SUPPORTED"), p.call(this, h, O, "DEPRECATED", "warn"), this._metaOpts = L.call(this), O.formats && b.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), O.keywords && N.call(this, O.keywords), typeof O.meta == "object" && this.addMetaSchema(O.meta), $.call(this), O.validateFormats = S;
      }
      _addVocabularies() {
        this.addKeyword("$async");
      }
      _addDefaultMetaSchema() {
        const { $data: O, meta: k, schemaId: T } = this.opts;
        let S = g;
        T === "id" && (S = { ...g }, S.id = S.$id, delete S.$id), k && O && this.addMetaSchema(S, S[T], !1);
      }
      defaultMeta() {
        const { meta: O, schemaId: k } = this.opts;
        return this.opts.defaultMeta = typeof O == "object" ? O[k] || O : void 0;
      }
      validate(O, k) {
        let T;
        if (typeof O == "string") {
          if (T = this.getSchema(O), !T)
            throw new Error(`no schema with key or ref "${O}"`);
        } else
          T = this.compile(O);
        const S = T(k);
        return "$async" in T || (this.errors = T.errors), S;
      }
      compile(O, k) {
        const T = this._addSchema(O, k);
        return T.validate || this._compileSchemaEnv(T);
      }
      compileAsync(O, k) {
        if (typeof this.opts.loadSchema != "function")
          throw new Error("options.loadSchema should be a function");
        const { loadSchema: T } = this.opts;
        return S.call(this, O, k);
        async function S(Z, I) {
          await P.call(this, Z.$schema);
          const C = this._addSchema(Z, I);
          return C.validate || A.call(this, C);
        }
        async function P(Z) {
          Z && !this.getSchema(Z) && await S.call(this, { $ref: Z }, !0);
        }
        async function A(Z) {
          try {
            return this._compileSchemaEnv(Z);
          } catch (I) {
            if (!(I instanceof d.default))
              throw I;
            return K.call(this, I), await B.call(this, I.missingSchema), A.call(this, Z);
          }
        }
        function K({ missingSchema: Z, missingRef: I }) {
          if (this.refs[Z])
            throw new Error(`AnySchema ${Z} is loaded but ${I} cannot be resolved`);
        }
        async function B(Z) {
          const I = await X.call(this, Z);
          this.refs[Z] || await P.call(this, I.$schema), this.refs[Z] || this.addSchema(I, Z, k);
        }
        async function X(Z) {
          const I = this._loading[Z];
          if (I)
            return I;
          try {
            return await (this._loading[Z] = T(Z));
          } finally {
            delete this._loading[Z];
          }
        }
      }
      // Adds schema to the instance
      addSchema(O, k, T, S = this.opts.validateSchema) {
        if (Array.isArray(O)) {
          for (const A of O)
            this.addSchema(A, void 0, T, S);
          return this;
        }
        let P;
        if (typeof O == "object") {
          const { schemaId: A } = this.opts;
          if (P = O[A], P !== void 0 && typeof P != "string")
            throw new Error(`schema ${A} must be string`);
        }
        return k = (0, o.normalizeId)(k || P), this._checkUnique(k), this.schemas[k] = this._addSchema(O, T, k, S, !0), this;
      }
      // Add schema that will be used to validate other schemas
      // options in META_IGNORE_OPTIONS are alway set to false
      addMetaSchema(O, k, T = this.opts.validateSchema) {
        return this.addSchema(O, k, !0, T), this;
      }
      //  Validate schema against its meta-schema
      validateSchema(O, k) {
        if (typeof O == "boolean")
          return !0;
        let T;
        if (T = O.$schema, T !== void 0 && typeof T != "string")
          throw new Error("$schema must be a string");
        if (T = T || this.opts.defaultMeta || this.defaultMeta(), !T)
          return this.logger.warn("meta-schema not available"), this.errors = null, !0;
        const S = this.validate(T, O);
        if (!S && k) {
          const P = "schema is invalid: " + this.errorsText();
          if (this.opts.validateSchema === "log")
            this.logger.error(P);
          else
            throw new Error(P);
        }
        return S;
      }
      // Get compiled schema by `key` or `ref`.
      // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
      getSchema(O) {
        let k;
        for (; typeof (k = y.call(this, O)) == "string"; )
          O = k;
        if (k === void 0) {
          const { schemaId: T } = this.opts, S = new r.SchemaEnv({ schema: {}, schemaId: T });
          if (k = r.resolveSchema.call(this, S, O), !k)
            return;
          this.refs[O] = k;
        }
        return k.validate || this._compileSchemaEnv(k);
      }
      // Remove cached schema(s).
      // If no parameter is passed all schemas but meta-schemas are removed.
      // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
      // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
      removeSchema(O) {
        if (O instanceof RegExp)
          return this._removeAllSchemas(this.schemas, O), this._removeAllSchemas(this.refs, O), this;
        switch (typeof O) {
          case "undefined":
            return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
          case "string": {
            const k = y.call(this, O);
            return typeof k == "object" && this._cache.delete(k.schema), delete this.schemas[O], delete this.refs[O], this;
          }
          case "object": {
            const k = O;
            this._cache.delete(k);
            let T = O[this.opts.schemaId];
            return T && (T = (0, o.normalizeId)(T), delete this.schemas[T], delete this.refs[T]), this;
          }
          default:
            throw new Error("ajv.removeSchema: invalid parameter");
        }
      }
      // add "vocabulary" - a collection of keywords
      addVocabulary(O) {
        for (const k of O)
          this.addKeyword(k);
        return this;
      }
      addKeyword(O, k) {
        let T;
        if (typeof O == "string")
          T = O, typeof k == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), k.keyword = T);
        else if (typeof O == "object" && k === void 0) {
          if (k = O, T = k.keyword, Array.isArray(T) && !T.length)
            throw new Error("addKeywords: keyword must be string or non-empty array");
        } else
          throw new Error("invalid addKeywords parameters");
        if (U.call(this, T, k), !k)
          return (0, c.eachItem)(T, (P) => z.call(this, P)), this;
        W.call(this, k);
        const S = {
          ...k,
          type: (0, l.getJSONTypes)(k.type),
          schemaType: (0, l.getJSONTypes)(k.schemaType)
        };
        return (0, c.eachItem)(T, S.type.length === 0 ? (P) => z.call(this, P, S) : (P) => S.type.forEach((A) => z.call(this, P, S, A))), this;
      }
      getKeyword(O) {
        const k = this.RULES.all[O];
        return typeof k == "object" ? k.definition : !!k;
      }
      // Remove keyword
      removeKeyword(O) {
        const { RULES: k } = this;
        delete k.keywords[O], delete k.all[O];
        for (const T of k.rules) {
          const S = T.rules.findIndex((P) => P.keyword === O);
          S >= 0 && T.rules.splice(S, 1);
        }
        return this;
      }
      // Add format
      addFormat(O, k) {
        return typeof k == "string" && (k = new RegExp(k)), this.formats[O] = k, this;
      }
      errorsText(O = this.errors, { separator: k = ", ", dataVar: T = "data" } = {}) {
        return !O || O.length === 0 ? "No errors" : O.map((S) => `${T}${S.instancePath} ${S.message}`).reduce((S, P) => S + k + P);
      }
      $dataMetaSchema(O, k) {
        const T = this.RULES.all;
        O = JSON.parse(JSON.stringify(O));
        for (const S of k) {
          const P = S.split("/").slice(1);
          let A = O;
          for (const K of P)
            A = A[K];
          for (const K in T) {
            const B = T[K];
            if (typeof B != "object")
              continue;
            const { $data: X } = B.definition, Z = A[K];
            X && Z && (A[K] = G(Z));
          }
        }
        return O;
      }
      _removeAllSchemas(O, k) {
        for (const T in O) {
          const S = O[T];
          (!k || k.test(T)) && (typeof S == "string" ? delete O[T] : S && !S.meta && (this._cache.delete(S.schema), delete O[T]));
        }
      }
      _addSchema(O, k, T, S = this.opts.validateSchema, P = this.opts.addUsedSchema) {
        let A;
        const { schemaId: K } = this.opts;
        if (typeof O == "object")
          A = O[K];
        else {
          if (this.opts.jtd)
            throw new Error("schema must be object");
          if (typeof O != "boolean")
            throw new Error("schema must be object or boolean");
        }
        let B = this._cache.get(O);
        if (B !== void 0)
          return B;
        T = (0, o.normalizeId)(A || T);
        const X = o.getSchemaRefs.call(this, O, T);
        return B = new r.SchemaEnv({ schema: O, schemaId: K, meta: k, baseId: T, localRefs: X }), this._cache.set(B.schema, B), P && !T.startsWith("#") && (T && this._checkUnique(T), this.refs[T] = B), S && this.validateSchema(O, !0), B;
      }
      _checkUnique(O) {
        if (this.schemas[O] || this.refs[O])
          throw new Error(`schema with key or id "${O}" already exists`);
      }
      _compileSchemaEnv(O) {
        if (O.meta ? this._compileMetaSchema(O) : r.compileSchema.call(this, O), !O.validate)
          throw new Error("ajv implementation error");
        return O.validate;
      }
      _compileMetaSchema(O) {
        const k = this.opts;
        this.opts = this._metaOpts;
        try {
          r.compileSchema.call(this, O);
        } finally {
          this.opts = k;
        }
      }
    }
    v.ValidationError = s.default, v.MissingRefError = d.default, e.default = v;
    function p(D, O, k, T = "error") {
      for (const S in D) {
        const P = S;
        P in O && this.logger[T](`${k}: option ${S}. ${D[P]}`);
      }
    }
    function y(D) {
      return D = (0, o.normalizeId)(D), this.schemas[D] || this.refs[D];
    }
    function $() {
      const D = this.opts.schemas;
      if (D)
        if (Array.isArray(D))
          this.addSchema(D);
        else
          for (const O in D)
            this.addSchema(D[O], O);
    }
    function b() {
      for (const D in this.opts.formats) {
        const O = this.opts.formats[D];
        O && this.addFormat(D, O);
      }
    }
    function N(D) {
      if (Array.isArray(D)) {
        this.addVocabulary(D);
        return;
      }
      this.logger.warn("keywords option as map is deprecated, pass array");
      for (const O in D) {
        const k = D[O];
        k.keyword || (k.keyword = O), this.addKeyword(k);
      }
    }
    function L() {
      const D = { ...this.opts };
      for (const O of w)
        delete D[O];
      return D;
    }
    const F = { log() {
    }, warn() {
    }, error() {
    } };
    function H(D) {
      if (D === !1)
        return F;
      if (D === void 0)
        return console;
      if (D.log && D.warn && D.error)
        return D;
      throw new Error("logger must implement log, warn and error methods");
    }
    const M = /^[a-z_$][a-z0-9_$:-]*$/i;
    function U(D, O) {
      const { RULES: k } = this;
      if ((0, c.eachItem)(D, (T) => {
        if (k.keywords[T])
          throw new Error(`Keyword ${T} is already defined`);
        if (!M.test(T))
          throw new Error(`Keyword ${T} has invalid name`);
      }), !!O && O.$data && !("code" in O || "validate" in O))
        throw new Error('$data keyword must have "code" or "validate" function');
    }
    function z(D, O, k) {
      var T;
      const S = O?.post;
      if (k && S)
        throw new Error('keyword with "post" flag cannot have "type"');
      const { RULES: P } = this;
      let A = S ? P.post : P.rules.find(({ type: B }) => B === k);
      if (A || (A = { type: k, rules: [] }, P.rules.push(A)), P.keywords[D] = !0, !O)
        return;
      const K = {
        keyword: D,
        definition: {
          ...O,
          type: (0, l.getJSONTypes)(O.type),
          schemaType: (0, l.getJSONTypes)(O.schemaType)
        }
      };
      O.before ? J.call(this, A, K, O.before) : A.rules.push(K), P.all[D] = K, (T = O.implements) === null || T === void 0 || T.forEach((B) => this.addKeyword(B));
    }
    function J(D, O, k) {
      const T = D.rules.findIndex((S) => S.keyword === k);
      T >= 0 ? D.rules.splice(T, 0, O) : (D.rules.push(O), this.logger.warn(`rule ${k} is not defined`));
    }
    function W(D) {
      let { metaSchema: O } = D;
      O !== void 0 && (D.$data && this.opts.$data && (O = G(O)), D.validateSchema = this.compile(O, !0));
    }
    const j = {
      $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
    };
    function G(D) {
      return { anyOf: [D, j] };
    }
  }(As)), As;
}
var Lr = {}, kr = {}, qr = {}, Xc;
function zh() {
  if (Xc) return qr;
  Xc = 1, Object.defineProperty(qr, "__esModule", { value: !0 });
  const e = {
    keyword: "id",
    code() {
      throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
    }
  };
  return qr.default = e, qr;
}
var ze = {}, Yc;
function Gh() {
  if (Yc) return ze;
  Yc = 1, Object.defineProperty(ze, "__esModule", { value: !0 }), ze.callRef = ze.getValidate = void 0;
  const e = Cn(), t = Ce(), f = te(), s = Ke(), d = eo(), i = oe(), r = {
    keyword: "$ref",
    schemaType: "string",
    code(l) {
      const { gen: c, schema: g, it: E } = l, { baseId: _, schemaEnv: w, validateName: R, opts: u, self: h } = E, { root: n } = w;
      if ((g === "#" || g === "#/") && _ === n.baseId)
        return v();
      const m = d.resolveRef.call(h, n, _, g);
      if (m === void 0)
        throw new e.default(E.opts.uriResolver, _, g);
      if (m instanceof d.SchemaEnv)
        return p(m);
      return y(m);
      function v() {
        if (w === n)
          return o(l, R, w, w.$async);
        const $ = c.scopeValue("root", { ref: n });
        return o(l, (0, f._)`${$}.validate`, n, n.$async);
      }
      function p($) {
        const b = a(l, $);
        o(l, b, $, $.$async);
      }
      function y($) {
        const b = c.scopeValue("schema", u.code.source === !0 ? { ref: $, code: (0, f.stringify)($) } : { ref: $ }), N = c.name("valid"), L = l.subschema({
          schema: $,
          dataTypes: [],
          schemaPath: f.nil,
          topSchemaRef: b,
          errSchemaPath: g
        }, N);
        l.mergeEvaluated(L), l.ok(N);
      }
    }
  };
  function a(l, c) {
    const { gen: g } = l;
    return c.validate ? g.scopeValue("validate", { ref: c.validate }) : (0, f._)`${g.scopeValue("wrapper", { ref: c })}.validate`;
  }
  ze.getValidate = a;
  function o(l, c, g, E) {
    const { gen: _, it: w } = l, { allErrors: R, schemaEnv: u, opts: h } = w, n = h.passContext ? s.default.this : f.nil;
    E ? m() : v();
    function m() {
      if (!u.$async)
        throw new Error("async schema referenced by sync schema");
      const $ = _.let("valid");
      _.try(() => {
        _.code((0, f._)`await ${(0, t.callValidateCode)(l, c, n)}`), y(c), R || _.assign($, !0);
      }, (b) => {
        _.if((0, f._)`!(${b} instanceof ${w.ValidationError})`, () => _.throw(b)), p(b), R || _.assign($, !1);
      }), l.ok($);
    }
    function v() {
      l.result((0, t.callValidateCode)(l, c, n), () => y(c), () => p(c));
    }
    function p($) {
      const b = (0, f._)`${$}.errors`;
      _.assign(s.default.vErrors, (0, f._)`${s.default.vErrors} === null ? ${b} : ${s.default.vErrors}.concat(${b})`), _.assign(s.default.errors, (0, f._)`${s.default.vErrors}.length`);
    }
    function y($) {
      var b;
      if (!w.opts.unevaluated)
        return;
      const N = (b = g?.validate) === null || b === void 0 ? void 0 : b.evaluated;
      if (w.props !== !0)
        if (N && !N.dynamicProps)
          N.props !== void 0 && (w.props = i.mergeEvaluated.props(_, N.props, w.props));
        else {
          const L = _.var("props", (0, f._)`${$}.evaluated.props`);
          w.props = i.mergeEvaluated.props(_, L, w.props, f.Name);
        }
      if (w.items !== !0)
        if (N && !N.dynamicItems)
          N.items !== void 0 && (w.items = i.mergeEvaluated.items(_, N.items, w.items));
        else {
          const L = _.var("items", (0, f._)`${$}.evaluated.items`);
          w.items = i.mergeEvaluated.items(_, L, w.items, f.Name);
        }
    }
  }
  return ze.callRef = o, ze.default = r, ze;
}
var Qc;
function Kh() {
  if (Qc) return kr;
  Qc = 1, Object.defineProperty(kr, "__esModule", { value: !0 });
  const e = zh(), t = Gh(), f = [
    "$schema",
    "$id",
    "$defs",
    "$vocabulary",
    { keyword: "$comment" },
    "definitions",
    e.default,
    t.default
  ];
  return kr.default = f, kr;
}
var jr = {}, Fr = {}, eu;
function Hh() {
  if (eu) return Fr;
  eu = 1, Object.defineProperty(Fr, "__esModule", { value: !0 });
  const e = te(), t = e.operators, f = {
    maximum: { okStr: "<=", ok: t.LTE, fail: t.GT },
    minimum: { okStr: ">=", ok: t.GTE, fail: t.LT },
    exclusiveMaximum: { okStr: "<", ok: t.LT, fail: t.GTE },
    exclusiveMinimum: { okStr: ">", ok: t.GT, fail: t.LTE }
  }, s = {
    message: ({ keyword: i, schemaCode: r }) => (0, e.str)`must be ${f[i].okStr} ${r}`,
    params: ({ keyword: i, schemaCode: r }) => (0, e._)`{comparison: ${f[i].okStr}, limit: ${r}}`
  }, d = {
    keyword: Object.keys(f),
    type: "number",
    schemaType: "number",
    $data: !0,
    error: s,
    code(i) {
      const { keyword: r, data: a, schemaCode: o } = i;
      i.fail$data((0, e._)`${a} ${f[r].fail} ${o} || isNaN(${a})`);
    }
  };
  return Fr.default = d, Fr;
}
var Mr = {}, tu;
function xh() {
  if (tu) return Mr;
  tu = 1, Object.defineProperty(Mr, "__esModule", { value: !0 });
  const e = te(), f = {
    keyword: "multipleOf",
    type: "number",
    schemaType: "number",
    $data: !0,
    error: {
      message: ({ schemaCode: s }) => (0, e.str)`must be multiple of ${s}`,
      params: ({ schemaCode: s }) => (0, e._)`{multipleOf: ${s}}`
    },
    code(s) {
      const { gen: d, data: i, schemaCode: r, it: a } = s, o = a.opts.multipleOfPrecision, l = d.let("res"), c = o ? (0, e._)`Math.abs(Math.round(${l}) - ${l}) > 1e-${o}` : (0, e._)`${l} !== parseInt(${l})`;
      s.fail$data((0, e._)`(${r} === 0 || (${l} = ${i}/${r}, ${c}))`);
    }
  };
  return Mr.default = f, Mr;
}
var Ur = {}, Vr = {}, ru;
function Bh() {
  if (ru) return Vr;
  ru = 1, Object.defineProperty(Vr, "__esModule", { value: !0 });
  function e(t) {
    const f = t.length;
    let s = 0, d = 0, i;
    for (; d < f; )
      s++, i = t.charCodeAt(d++), i >= 55296 && i <= 56319 && d < f && (i = t.charCodeAt(d), (i & 64512) === 56320 && d++);
    return s;
  }
  return Vr.default = e, e.code = 'require("ajv/dist/runtime/ucs2length").default', Vr;
}
var nu;
function Wh() {
  if (nu) return Ur;
  nu = 1, Object.defineProperty(Ur, "__esModule", { value: !0 });
  const e = te(), t = oe(), f = Bh(), d = {
    keyword: ["maxLength", "minLength"],
    type: "string",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: i, schemaCode: r }) {
        const a = i === "maxLength" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${a} than ${r} characters`;
      },
      params: ({ schemaCode: i }) => (0, e._)`{limit: ${i}}`
    },
    code(i) {
      const { keyword: r, data: a, schemaCode: o, it: l } = i, c = r === "maxLength" ? e.operators.GT : e.operators.LT, g = l.opts.unicode === !1 ? (0, e._)`${a}.length` : (0, e._)`${(0, t.useFunc)(i.gen, f.default)}(${a})`;
      i.fail$data((0, e._)`${g} ${c} ${o}`);
    }
  };
  return Ur.default = d, Ur;
}
var zr = {}, su;
function Jh() {
  if (su) return zr;
  su = 1, Object.defineProperty(zr, "__esModule", { value: !0 });
  const e = Ce(), t = te(), s = {
    keyword: "pattern",
    type: "string",
    schemaType: "string",
    $data: !0,
    error: {
      message: ({ schemaCode: d }) => (0, t.str)`must match pattern "${d}"`,
      params: ({ schemaCode: d }) => (0, t._)`{pattern: ${d}}`
    },
    code(d) {
      const { data: i, $data: r, schema: a, schemaCode: o, it: l } = d, c = l.opts.unicodeRegExp ? "u" : "", g = r ? (0, t._)`(new RegExp(${o}, ${c}))` : (0, e.usePattern)(d, a);
      d.fail$data((0, t._)`!${g}.test(${i})`);
    }
  };
  return zr.default = s, zr;
}
var Gr = {}, iu;
function Zh() {
  if (iu) return Gr;
  iu = 1, Object.defineProperty(Gr, "__esModule", { value: !0 });
  const e = te(), f = {
    keyword: ["maxProperties", "minProperties"],
    type: "object",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: s, schemaCode: d }) {
        const i = s === "maxProperties" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${i} than ${d} properties`;
      },
      params: ({ schemaCode: s }) => (0, e._)`{limit: ${s}}`
    },
    code(s) {
      const { keyword: d, data: i, schemaCode: r } = s, a = d === "maxProperties" ? e.operators.GT : e.operators.LT;
      s.fail$data((0, e._)`Object.keys(${i}).length ${a} ${r}`);
    }
  };
  return Gr.default = f, Gr;
}
var Kr = {}, ou;
function Xh() {
  if (ou) return Kr;
  ou = 1, Object.defineProperty(Kr, "__esModule", { value: !0 });
  const e = Ce(), t = te(), f = oe(), d = {
    keyword: "required",
    type: "object",
    schemaType: "array",
    $data: !0,
    error: {
      message: ({ params: { missingProperty: i } }) => (0, t.str)`must have required property '${i}'`,
      params: ({ params: { missingProperty: i } }) => (0, t._)`{missingProperty: ${i}}`
    },
    code(i) {
      const { gen: r, schema: a, schemaCode: o, data: l, $data: c, it: g } = i, { opts: E } = g;
      if (!c && a.length === 0)
        return;
      const _ = a.length >= E.loopRequired;
      if (g.allErrors ? w() : R(), E.strictRequired) {
        const n = i.parentSchema.properties, { definedProperties: m } = i.it;
        for (const v of a)
          if (n?.[v] === void 0 && !m.has(v)) {
            const p = g.schemaEnv.baseId + g.errSchemaPath, y = `required property "${v}" is not defined at "${p}" (strictRequired)`;
            (0, f.checkStrictMode)(g, y, g.opts.strictRequired);
          }
      }
      function w() {
        if (_ || c)
          i.block$data(t.nil, u);
        else
          for (const n of a)
            (0, e.checkReportMissingProp)(i, n);
      }
      function R() {
        const n = r.let("missing");
        if (_ || c) {
          const m = r.let("valid", !0);
          i.block$data(m, () => h(n, m)), i.ok(m);
        } else
          r.if((0, e.checkMissingProp)(i, a, n)), (0, e.reportMissingProp)(i, n), r.else();
      }
      function u() {
        r.forOf("prop", o, (n) => {
          i.setParams({ missingProperty: n }), r.if((0, e.noPropertyInData)(r, l, n, E.ownProperties), () => i.error());
        });
      }
      function h(n, m) {
        i.setParams({ missingProperty: n }), r.forOf(n, o, () => {
          r.assign(m, (0, e.propertyInData)(r, l, n, E.ownProperties)), r.if((0, t.not)(m), () => {
            i.error(), r.break();
          });
        }, t.nil);
      }
    }
  };
  return Kr.default = d, Kr;
}
var Hr = {}, au;
function Yh() {
  if (au) return Hr;
  au = 1, Object.defineProperty(Hr, "__esModule", { value: !0 });
  const e = te(), f = {
    keyword: ["maxItems", "minItems"],
    type: "array",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: s, schemaCode: d }) {
        const i = s === "maxItems" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${i} than ${d} items`;
      },
      params: ({ schemaCode: s }) => (0, e._)`{limit: ${s}}`
    },
    code(s) {
      const { keyword: d, data: i, schemaCode: r } = s, a = d === "maxItems" ? e.operators.GT : e.operators.LT;
      s.fail$data((0, e._)`${i}.length ${a} ${r}`);
    }
  };
  return Hr.default = f, Hr;
}
var xr = {}, Br = {}, cu;
function to() {
  if (cu) return Br;
  cu = 1, Object.defineProperty(Br, "__esModule", { value: !0 });
  const e = Rn();
  return e.code = 'require("ajv/dist/runtime/equal").default', Br.default = e, Br;
}
var uu;
function Qh() {
  if (uu) return xr;
  uu = 1, Object.defineProperty(xr, "__esModule", { value: !0 });
  const e = En(), t = te(), f = oe(), s = to(), i = {
    keyword: "uniqueItems",
    type: "array",
    schemaType: "boolean",
    $data: !0,
    error: {
      message: ({ params: { i: r, j: a } }) => (0, t.str)`must NOT have duplicate items (items ## ${a} and ${r} are identical)`,
      params: ({ params: { i: r, j: a } }) => (0, t._)`{i: ${r}, j: ${a}}`
    },
    code(r) {
      const { gen: a, data: o, $data: l, schema: c, parentSchema: g, schemaCode: E, it: _ } = r;
      if (!l && !c)
        return;
      const w = a.let("valid"), R = g.items ? (0, e.getSchemaTypes)(g.items) : [];
      r.block$data(w, u, (0, t._)`${E} === false`), r.ok(w);
      function u() {
        const v = a.let("i", (0, t._)`${o}.length`), p = a.let("j");
        r.setParams({ i: v, j: p }), a.assign(w, !0), a.if((0, t._)`${v} > 1`, () => (h() ? n : m)(v, p));
      }
      function h() {
        return R.length > 0 && !R.some((v) => v === "object" || v === "array");
      }
      function n(v, p) {
        const y = a.name("item"), $ = (0, e.checkDataTypes)(R, y, _.opts.strictNumbers, e.DataType.Wrong), b = a.const("indices", (0, t._)`{}`);
        a.for((0, t._)`;${v}--;`, () => {
          a.let(y, (0, t._)`${o}[${v}]`), a.if($, (0, t._)`continue`), R.length > 1 && a.if((0, t._)`typeof ${y} == "string"`, (0, t._)`${y} += "_"`), a.if((0, t._)`typeof ${b}[${y}] == "number"`, () => {
            a.assign(p, (0, t._)`${b}[${y}]`), r.error(), a.assign(w, !1).break();
          }).code((0, t._)`${b}[${y}] = ${v}`);
        });
      }
      function m(v, p) {
        const y = (0, f.useFunc)(a, s.default), $ = a.name("outer");
        a.label($).for((0, t._)`;${v}--;`, () => a.for((0, t._)`${p} = ${v}; ${p}--;`, () => a.if((0, t._)`${y}(${o}[${v}], ${o}[${p}])`, () => {
          r.error(), a.assign(w, !1).break($);
        })));
      }
    }
  };
  return xr.default = i, xr;
}
var Wr = {}, lu;
function em() {
  if (lu) return Wr;
  lu = 1, Object.defineProperty(Wr, "__esModule", { value: !0 });
  const e = te(), t = oe(), f = to(), d = {
    keyword: "const",
    $data: !0,
    error: {
      message: "must be equal to constant",
      params: ({ schemaCode: i }) => (0, e._)`{allowedValue: ${i}}`
    },
    code(i) {
      const { gen: r, data: a, $data: o, schemaCode: l, schema: c } = i;
      o || c && typeof c == "object" ? i.fail$data((0, e._)`!${(0, t.useFunc)(r, f.default)}(${a}, ${l})`) : i.fail((0, e._)`${c} !== ${a}`);
    }
  };
  return Wr.default = d, Wr;
}
var Jr = {}, fu;
function tm() {
  if (fu) return Jr;
  fu = 1, Object.defineProperty(Jr, "__esModule", { value: !0 });
  const e = te(), t = oe(), f = to(), d = {
    keyword: "enum",
    schemaType: "array",
    $data: !0,
    error: {
      message: "must be equal to one of the allowed values",
      params: ({ schemaCode: i }) => (0, e._)`{allowedValues: ${i}}`
    },
    code(i) {
      const { gen: r, data: a, $data: o, schema: l, schemaCode: c, it: g } = i;
      if (!o && l.length === 0)
        throw new Error("enum must have non-empty array");
      const E = l.length >= g.opts.loopEnum;
      let _;
      const w = () => _ ?? (_ = (0, t.useFunc)(r, f.default));
      let R;
      if (E || o)
        R = r.let("valid"), i.block$data(R, u);
      else {
        if (!Array.isArray(l))
          throw new Error("ajv implementation error");
        const n = r.const("vSchema", c);
        R = (0, e.or)(...l.map((m, v) => h(n, v)));
      }
      i.pass(R);
      function u() {
        r.assign(R, !1), r.forOf("v", c, (n) => r.if((0, e._)`${w()}(${a}, ${n})`, () => r.assign(R, !0).break()));
      }
      function h(n, m) {
        const v = l[m];
        return typeof v == "object" && v !== null ? (0, e._)`${w()}(${a}, ${n}[${m}])` : (0, e._)`${a} === ${v}`;
      }
    }
  };
  return Jr.default = d, Jr;
}
var du;
function rm() {
  if (du) return jr;
  du = 1, Object.defineProperty(jr, "__esModule", { value: !0 });
  const e = Hh(), t = xh(), f = Wh(), s = Jh(), d = Zh(), i = Xh(), r = Yh(), a = Qh(), o = em(), l = tm(), c = [
    // number
    e.default,
    t.default,
    // string
    f.default,
    s.default,
    // object
    d.default,
    i.default,
    // array
    r.default,
    a.default,
    // any
    { keyword: "type", schemaType: ["string", "array"] },
    { keyword: "nullable", schemaType: "boolean" },
    o.default,
    l.default
  ];
  return jr.default = c, jr;
}
var Zr = {}, ot = {}, hu;
function pf() {
  if (hu) return ot;
  hu = 1, Object.defineProperty(ot, "__esModule", { value: !0 }), ot.validateAdditionalItems = void 0;
  const e = te(), t = oe(), s = {
    keyword: "additionalItems",
    type: "array",
    schemaType: ["boolean", "object"],
    before: "uniqueItems",
    error: {
      message: ({ params: { len: i } }) => (0, e.str)`must NOT have more than ${i} items`,
      params: ({ params: { len: i } }) => (0, e._)`{limit: ${i}}`
    },
    code(i) {
      const { parentSchema: r, it: a } = i, { items: o } = r;
      if (!Array.isArray(o)) {
        (0, t.checkStrictMode)(a, '"additionalItems" is ignored when "items" is not an array of schemas');
        return;
      }
      d(i, o);
    }
  };
  function d(i, r) {
    const { gen: a, schema: o, data: l, keyword: c, it: g } = i;
    g.items = !0;
    const E = a.const("len", (0, e._)`${l}.length`);
    if (o === !1)
      i.setParams({ len: r.length }), i.pass((0, e._)`${E} <= ${r.length}`);
    else if (typeof o == "object" && !(0, t.alwaysValidSchema)(g, o)) {
      const w = a.var("valid", (0, e._)`${E} <= ${r.length}`);
      a.if((0, e.not)(w), () => _(w)), i.ok(w);
    }
    function _(w) {
      a.forRange("i", r.length, E, (R) => {
        i.subschema({ keyword: c, dataProp: R, dataPropType: t.Type.Num }, w), g.allErrors || a.if((0, e.not)(w), () => a.break());
      });
    }
  }
  return ot.validateAdditionalItems = d, ot.default = s, ot;
}
var Xr = {}, at = {}, mu;
function yf() {
  if (mu) return at;
  mu = 1, Object.defineProperty(at, "__esModule", { value: !0 }), at.validateTuple = void 0;
  const e = te(), t = oe(), f = Ce(), s = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "array", "boolean"],
    before: "uniqueItems",
    code(i) {
      const { schema: r, it: a } = i;
      if (Array.isArray(r))
        return d(i, "additionalItems", r);
      a.items = !0, !(0, t.alwaysValidSchema)(a, r) && i.ok((0, f.validateArray)(i));
    }
  };
  function d(i, r, a = i.schema) {
    const { gen: o, parentSchema: l, data: c, keyword: g, it: E } = i;
    R(l), E.opts.unevaluated && a.length && E.items !== !0 && (E.items = t.mergeEvaluated.items(o, a.length, E.items));
    const _ = o.name("valid"), w = o.const("len", (0, e._)`${c}.length`);
    a.forEach((u, h) => {
      (0, t.alwaysValidSchema)(E, u) || (o.if((0, e._)`${w} > ${h}`, () => i.subschema({
        keyword: g,
        schemaProp: h,
        dataProp: h
      }, _)), i.ok(_));
    });
    function R(u) {
      const { opts: h, errSchemaPath: n } = E, m = a.length, v = m === u.minItems && (m === u.maxItems || u[r] === !1);
      if (h.strictTuples && !v) {
        const p = `"${g}" is ${m}-tuple, but minItems or maxItems/${r} are not specified or different at path "${n}"`;
        (0, t.checkStrictMode)(E, p, h.strictTuples);
      }
    }
  }
  return at.validateTuple = d, at.default = s, at;
}
var pu;
function nm() {
  if (pu) return Xr;
  pu = 1, Object.defineProperty(Xr, "__esModule", { value: !0 });
  const e = yf(), t = {
    keyword: "prefixItems",
    type: "array",
    schemaType: ["array"],
    before: "uniqueItems",
    code: (f) => (0, e.validateTuple)(f, "items")
  };
  return Xr.default = t, Xr;
}
var Yr = {}, yu;
function sm() {
  if (yu) return Yr;
  yu = 1, Object.defineProperty(Yr, "__esModule", { value: !0 });
  const e = te(), t = oe(), f = Ce(), s = pf(), i = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    error: {
      message: ({ params: { len: r } }) => (0, e.str)`must NOT have more than ${r} items`,
      params: ({ params: { len: r } }) => (0, e._)`{limit: ${r}}`
    },
    code(r) {
      const { schema: a, parentSchema: o, it: l } = r, { prefixItems: c } = o;
      l.items = !0, !(0, t.alwaysValidSchema)(l, a) && (c ? (0, s.validateAdditionalItems)(r, c) : r.ok((0, f.validateArray)(r)));
    }
  };
  return Yr.default = i, Yr;
}
var Qr = {}, vu;
function im() {
  if (vu) return Qr;
  vu = 1, Object.defineProperty(Qr, "__esModule", { value: !0 });
  const e = te(), t = oe(), s = {
    keyword: "contains",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    trackErrors: !0,
    error: {
      message: ({ params: { min: d, max: i } }) => i === void 0 ? (0, e.str)`must contain at least ${d} valid item(s)` : (0, e.str)`must contain at least ${d} and no more than ${i} valid item(s)`,
      params: ({ params: { min: d, max: i } }) => i === void 0 ? (0, e._)`{minContains: ${d}}` : (0, e._)`{minContains: ${d}, maxContains: ${i}}`
    },
    code(d) {
      const { gen: i, schema: r, parentSchema: a, data: o, it: l } = d;
      let c, g;
      const { minContains: E, maxContains: _ } = a;
      l.opts.next ? (c = E === void 0 ? 1 : E, g = _) : c = 1;
      const w = i.const("len", (0, e._)`${o}.length`);
      if (d.setParams({ min: c, max: g }), g === void 0 && c === 0) {
        (0, t.checkStrictMode)(l, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
        return;
      }
      if (g !== void 0 && c > g) {
        (0, t.checkStrictMode)(l, '"minContains" > "maxContains" is always invalid'), d.fail();
        return;
      }
      if ((0, t.alwaysValidSchema)(l, r)) {
        let m = (0, e._)`${w} >= ${c}`;
        g !== void 0 && (m = (0, e._)`${m} && ${w} <= ${g}`), d.pass(m);
        return;
      }
      l.items = !0;
      const R = i.name("valid");
      g === void 0 && c === 1 ? h(R, () => i.if(R, () => i.break())) : c === 0 ? (i.let(R, !0), g !== void 0 && i.if((0, e._)`${o}.length > 0`, u)) : (i.let(R, !1), u()), d.result(R, () => d.reset());
      function u() {
        const m = i.name("_valid"), v = i.let("count", 0);
        h(m, () => i.if(m, () => n(v)));
      }
      function h(m, v) {
        i.forRange("i", 0, w, (p) => {
          d.subschema({
            keyword: "contains",
            dataProp: p,
            dataPropType: t.Type.Num,
            compositeRule: !0
          }, m), v();
        });
      }
      function n(m) {
        i.code((0, e._)`${m}++`), g === void 0 ? i.if((0, e._)`${m} >= ${c}`, () => i.assign(R, !0).break()) : (i.if((0, e._)`${m} > ${g}`, () => i.assign(R, !1).break()), c === 1 ? i.assign(R, !0) : i.if((0, e._)`${m} >= ${c}`, () => i.assign(R, !0)));
      }
    }
  };
  return Qr.default = s, Qr;
}
var Ms = {}, _u;
function om() {
  return _u || (_u = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
    const t = te(), f = oe(), s = Ce();
    e.error = {
      message: ({ params: { property: o, depsCount: l, deps: c } }) => {
        const g = l === 1 ? "property" : "properties";
        return (0, t.str)`must have ${g} ${c} when property ${o} is present`;
      },
      params: ({ params: { property: o, depsCount: l, deps: c, missingProperty: g } }) => (0, t._)`{property: ${o},
    missingProperty: ${g},
    depsCount: ${l},
    deps: ${c}}`
      // TODO change to reference
    };
    const d = {
      keyword: "dependencies",
      type: "object",
      schemaType: "object",
      error: e.error,
      code(o) {
        const [l, c] = i(o);
        r(o, l), a(o, c);
      }
    };
    function i({ schema: o }) {
      const l = {}, c = {};
      for (const g in o) {
        if (g === "__proto__")
          continue;
        const E = Array.isArray(o[g]) ? l : c;
        E[g] = o[g];
      }
      return [l, c];
    }
    function r(o, l = o.schema) {
      const { gen: c, data: g, it: E } = o;
      if (Object.keys(l).length === 0)
        return;
      const _ = c.let("missing");
      for (const w in l) {
        const R = l[w];
        if (R.length === 0)
          continue;
        const u = (0, s.propertyInData)(c, g, w, E.opts.ownProperties);
        o.setParams({
          property: w,
          depsCount: R.length,
          deps: R.join(", ")
        }), E.allErrors ? c.if(u, () => {
          for (const h of R)
            (0, s.checkReportMissingProp)(o, h);
        }) : (c.if((0, t._)`${u} && (${(0, s.checkMissingProp)(o, R, _)})`), (0, s.reportMissingProp)(o, _), c.else());
      }
    }
    e.validatePropertyDeps = r;
    function a(o, l = o.schema) {
      const { gen: c, data: g, keyword: E, it: _ } = o, w = c.name("valid");
      for (const R in l)
        (0, f.alwaysValidSchema)(_, l[R]) || (c.if(
          (0, s.propertyInData)(c, g, R, _.opts.ownProperties),
          () => {
            const u = o.subschema({ keyword: E, schemaProp: R }, w);
            o.mergeValidEvaluated(u, w);
          },
          () => c.var(w, !0)
          // TODO var
        ), o.ok(w));
    }
    e.validateSchemaDeps = a, e.default = d;
  }(Ms)), Ms;
}
var en = {}, gu;
function am() {
  if (gu) return en;
  gu = 1, Object.defineProperty(en, "__esModule", { value: !0 });
  const e = te(), t = oe(), s = {
    keyword: "propertyNames",
    type: "object",
    schemaType: ["object", "boolean"],
    error: {
      message: "property name must be valid",
      params: ({ params: d }) => (0, e._)`{propertyName: ${d.propertyName}}`
    },
    code(d) {
      const { gen: i, schema: r, data: a, it: o } = d;
      if ((0, t.alwaysValidSchema)(o, r))
        return;
      const l = i.name("valid");
      i.forIn("key", a, (c) => {
        d.setParams({ propertyName: c }), d.subschema({
          keyword: "propertyNames",
          data: c,
          dataTypes: ["string"],
          propertyName: c,
          compositeRule: !0
        }, l), i.if((0, e.not)(l), () => {
          d.error(!0), o.allErrors || i.break();
        });
      }), d.ok(l);
    }
  };
  return en.default = s, en;
}
var tn = {}, $u;
function vf() {
  if ($u) return tn;
  $u = 1, Object.defineProperty(tn, "__esModule", { value: !0 });
  const e = Ce(), t = te(), f = Ke(), s = oe(), i = {
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
      const { gen: a, schema: o, parentSchema: l, data: c, errsCount: g, it: E } = r;
      if (!g)
        throw new Error("ajv implementation error");
      const { allErrors: _, opts: w } = E;
      if (E.props = !0, w.removeAdditional !== "all" && (0, s.alwaysValidSchema)(E, o))
        return;
      const R = (0, e.allSchemaProperties)(l.properties), u = (0, e.allSchemaProperties)(l.patternProperties);
      h(), r.ok((0, t._)`${g} === ${f.default.errors}`);
      function h() {
        a.forIn("key", c, (y) => {
          !R.length && !u.length ? v(y) : a.if(n(y), () => v(y));
        });
      }
      function n(y) {
        let $;
        if (R.length > 8) {
          const b = (0, s.schemaRefOrVal)(E, l.properties, "properties");
          $ = (0, e.isOwnProperty)(a, b, y);
        } else R.length ? $ = (0, t.or)(...R.map((b) => (0, t._)`${y} === ${b}`)) : $ = t.nil;
        return u.length && ($ = (0, t.or)($, ...u.map((b) => (0, t._)`${(0, e.usePattern)(r, b)}.test(${y})`))), (0, t.not)($);
      }
      function m(y) {
        a.code((0, t._)`delete ${c}[${y}]`);
      }
      function v(y) {
        if (w.removeAdditional === "all" || w.removeAdditional && o === !1) {
          m(y);
          return;
        }
        if (o === !1) {
          r.setParams({ additionalProperty: y }), r.error(), _ || a.break();
          return;
        }
        if (typeof o == "object" && !(0, s.alwaysValidSchema)(E, o)) {
          const $ = a.name("valid");
          w.removeAdditional === "failing" ? (p(y, $, !1), a.if((0, t.not)($), () => {
            r.reset(), m(y);
          })) : (p(y, $), _ || a.if((0, t.not)($), () => a.break()));
        }
      }
      function p(y, $, b) {
        const N = {
          keyword: "additionalProperties",
          dataProp: y,
          dataPropType: s.Type.Str
        };
        b === !1 && Object.assign(N, {
          compositeRule: !0,
          createErrors: !1,
          allErrors: !1
        }), r.subschema(N, $);
      }
    }
  };
  return tn.default = i, tn;
}
var rn = {}, Eu;
function cm() {
  if (Eu) return rn;
  Eu = 1, Object.defineProperty(rn, "__esModule", { value: !0 });
  const e = Tn(), t = Ce(), f = oe(), s = vf(), d = {
    keyword: "properties",
    type: "object",
    schemaType: "object",
    code(i) {
      const { gen: r, schema: a, parentSchema: o, data: l, it: c } = i;
      c.opts.removeAdditional === "all" && o.additionalProperties === void 0 && s.default.code(new e.KeywordCxt(c, s.default, "additionalProperties"));
      const g = (0, t.allSchemaProperties)(a);
      for (const u of g)
        c.definedProperties.add(u);
      c.opts.unevaluated && g.length && c.props !== !0 && (c.props = f.mergeEvaluated.props(r, (0, f.toHash)(g), c.props));
      const E = g.filter((u) => !(0, f.alwaysValidSchema)(c, a[u]));
      if (E.length === 0)
        return;
      const _ = r.name("valid");
      for (const u of E)
        w(u) ? R(u) : (r.if((0, t.propertyInData)(r, l, u, c.opts.ownProperties)), R(u), c.allErrors || r.else().var(_, !0), r.endIf()), i.it.definedProperties.add(u), i.ok(_);
      function w(u) {
        return c.opts.useDefaults && !c.compositeRule && a[u].default !== void 0;
      }
      function R(u) {
        i.subschema({
          keyword: "properties",
          schemaProp: u,
          dataProp: u
        }, _);
      }
    }
  };
  return rn.default = d, rn;
}
var nn = {}, wu;
function um() {
  if (wu) return nn;
  wu = 1, Object.defineProperty(nn, "__esModule", { value: !0 });
  const e = Ce(), t = te(), f = oe(), s = oe(), d = {
    keyword: "patternProperties",
    type: "object",
    schemaType: "object",
    code(i) {
      const { gen: r, schema: a, data: o, parentSchema: l, it: c } = i, { opts: g } = c, E = (0, e.allSchemaProperties)(a), _ = E.filter((v) => (0, f.alwaysValidSchema)(c, a[v]));
      if (E.length === 0 || _.length === E.length && (!c.opts.unevaluated || c.props === !0))
        return;
      const w = g.strictSchema && !g.allowMatchingProperties && l.properties, R = r.name("valid");
      c.props !== !0 && !(c.props instanceof t.Name) && (c.props = (0, s.evaluatedPropsToName)(r, c.props));
      const { props: u } = c;
      h();
      function h() {
        for (const v of E)
          w && n(v), c.allErrors ? m(v) : (r.var(R, !0), m(v), r.if(R));
      }
      function n(v) {
        for (const p in w)
          new RegExp(v).test(p) && (0, f.checkStrictMode)(c, `property ${p} matches pattern ${v} (use allowMatchingProperties)`);
      }
      function m(v) {
        r.forIn("key", o, (p) => {
          r.if((0, t._)`${(0, e.usePattern)(i, v)}.test(${p})`, () => {
            const y = _.includes(v);
            y || i.subschema({
              keyword: "patternProperties",
              schemaProp: v,
              dataProp: p,
              dataPropType: s.Type.Str
            }, R), c.opts.unevaluated && u !== !0 ? r.assign((0, t._)`${u}[${p}]`, !0) : !y && !c.allErrors && r.if((0, t.not)(R), () => r.break());
          });
        });
      }
    }
  };
  return nn.default = d, nn;
}
var sn = {}, Su;
function lm() {
  if (Su) return sn;
  Su = 1, Object.defineProperty(sn, "__esModule", { value: !0 });
  const e = oe(), t = {
    keyword: "not",
    schemaType: ["object", "boolean"],
    trackErrors: !0,
    code(f) {
      const { gen: s, schema: d, it: i } = f;
      if ((0, e.alwaysValidSchema)(i, d)) {
        f.fail();
        return;
      }
      const r = s.name("valid");
      f.subschema({
        keyword: "not",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, r), f.failResult(r, () => f.reset(), () => f.error());
    },
    error: { message: "must NOT be valid" }
  };
  return sn.default = t, sn;
}
var on = {}, Ru;
function fm() {
  if (Ru) return on;
  Ru = 1, Object.defineProperty(on, "__esModule", { value: !0 });
  const t = {
    keyword: "anyOf",
    schemaType: "array",
    trackErrors: !0,
    code: Ce().validateUnion,
    error: { message: "must match a schema in anyOf" }
  };
  return on.default = t, on;
}
var an = {}, bu;
function dm() {
  if (bu) return an;
  bu = 1, Object.defineProperty(an, "__esModule", { value: !0 });
  const e = te(), t = oe(), s = {
    keyword: "oneOf",
    schemaType: "array",
    trackErrors: !0,
    error: {
      message: "must match exactly one schema in oneOf",
      params: ({ params: d }) => (0, e._)`{passingSchemas: ${d.passing}}`
    },
    code(d) {
      const { gen: i, schema: r, parentSchema: a, it: o } = d;
      if (!Array.isArray(r))
        throw new Error("ajv implementation error");
      if (o.opts.discriminator && a.discriminator)
        return;
      const l = r, c = i.let("valid", !1), g = i.let("passing", null), E = i.name("_valid");
      d.setParams({ passing: g }), i.block(_), d.result(c, () => d.reset(), () => d.error(!0));
      function _() {
        l.forEach((w, R) => {
          let u;
          (0, t.alwaysValidSchema)(o, w) ? i.var(E, !0) : u = d.subschema({
            keyword: "oneOf",
            schemaProp: R,
            compositeRule: !0
          }, E), R > 0 && i.if((0, e._)`${E} && ${c}`).assign(c, !1).assign(g, (0, e._)`[${g}, ${R}]`).else(), i.if(E, () => {
            i.assign(c, !0), i.assign(g, R), u && d.mergeEvaluated(u, e.Name);
          });
        });
      }
    }
  };
  return an.default = s, an;
}
var cn = {}, Pu;
function hm() {
  if (Pu) return cn;
  Pu = 1, Object.defineProperty(cn, "__esModule", { value: !0 });
  const e = oe(), t = {
    keyword: "allOf",
    schemaType: "array",
    code(f) {
      const { gen: s, schema: d, it: i } = f;
      if (!Array.isArray(d))
        throw new Error("ajv implementation error");
      const r = s.name("valid");
      d.forEach((a, o) => {
        if ((0, e.alwaysValidSchema)(i, a))
          return;
        const l = f.subschema({ keyword: "allOf", schemaProp: o }, r);
        f.ok(r), f.mergeEvaluated(l);
      });
    }
  };
  return cn.default = t, cn;
}
var un = {}, Nu;
function mm() {
  if (Nu) return un;
  Nu = 1, Object.defineProperty(un, "__esModule", { value: !0 });
  const e = te(), t = oe(), s = {
    keyword: "if",
    schemaType: ["object", "boolean"],
    trackErrors: !0,
    error: {
      message: ({ params: i }) => (0, e.str)`must match "${i.ifClause}" schema`,
      params: ({ params: i }) => (0, e._)`{failingKeyword: ${i.ifClause}}`
    },
    code(i) {
      const { gen: r, parentSchema: a, it: o } = i;
      a.then === void 0 && a.else === void 0 && (0, t.checkStrictMode)(o, '"if" without "then" and "else" is ignored');
      const l = d(o, "then"), c = d(o, "else");
      if (!l && !c)
        return;
      const g = r.let("valid", !0), E = r.name("_valid");
      if (_(), i.reset(), l && c) {
        const R = r.let("ifClause");
        i.setParams({ ifClause: R }), r.if(E, w("then", R), w("else", R));
      } else l ? r.if(E, w("then")) : r.if((0, e.not)(E), w("else"));
      i.pass(g, () => i.error(!0));
      function _() {
        const R = i.subschema({
          keyword: "if",
          compositeRule: !0,
          createErrors: !1,
          allErrors: !1
        }, E);
        i.mergeEvaluated(R);
      }
      function w(R, u) {
        return () => {
          const h = i.subschema({ keyword: R }, E);
          r.assign(g, E), i.mergeValidEvaluated(h, g), u ? r.assign(u, (0, e._)`${R}`) : i.setParams({ ifClause: R });
        };
      }
    }
  };
  function d(i, r) {
    const a = i.schema[r];
    return a !== void 0 && !(0, t.alwaysValidSchema)(i, a);
  }
  return un.default = s, un;
}
var ln = {}, Ou;
function pm() {
  if (Ou) return ln;
  Ou = 1, Object.defineProperty(ln, "__esModule", { value: !0 });
  const e = oe(), t = {
    keyword: ["then", "else"],
    schemaType: ["object", "boolean"],
    code({ keyword: f, parentSchema: s, it: d }) {
      s.if === void 0 && (0, e.checkStrictMode)(d, `"${f}" without "if" is ignored`);
    }
  };
  return ln.default = t, ln;
}
var Iu;
function ym() {
  if (Iu) return Zr;
  Iu = 1, Object.defineProperty(Zr, "__esModule", { value: !0 });
  const e = pf(), t = nm(), f = yf(), s = sm(), d = im(), i = om(), r = am(), a = vf(), o = cm(), l = um(), c = lm(), g = fm(), E = dm(), _ = hm(), w = mm(), R = pm();
  function u(h = !1) {
    const n = [
      // any
      c.default,
      g.default,
      E.default,
      _.default,
      w.default,
      R.default,
      // object
      r.default,
      a.default,
      i.default,
      o.default,
      l.default
    ];
    return h ? n.push(t.default, s.default) : n.push(e.default, f.default), n.push(d.default), n;
  }
  return Zr.default = u, Zr;
}
var fn = {}, dn = {}, Tu;
function vm() {
  if (Tu) return dn;
  Tu = 1, Object.defineProperty(dn, "__esModule", { value: !0 });
  const e = te(), f = {
    keyword: "format",
    type: ["number", "string"],
    schemaType: "string",
    $data: !0,
    error: {
      message: ({ schemaCode: s }) => (0, e.str)`must match format "${s}"`,
      params: ({ schemaCode: s }) => (0, e._)`{format: ${s}}`
    },
    code(s, d) {
      const { gen: i, data: r, $data: a, schema: o, schemaCode: l, it: c } = s, { opts: g, errSchemaPath: E, schemaEnv: _, self: w } = c;
      if (!g.validateFormats)
        return;
      a ? R() : u();
      function R() {
        const h = i.scopeValue("formats", {
          ref: w.formats,
          code: g.code.formats
        }), n = i.const("fDef", (0, e._)`${h}[${l}]`), m = i.let("fType"), v = i.let("format");
        i.if((0, e._)`typeof ${n} == "object" && !(${n} instanceof RegExp)`, () => i.assign(m, (0, e._)`${n}.type || "string"`).assign(v, (0, e._)`${n}.validate`), () => i.assign(m, (0, e._)`"string"`).assign(v, n)), s.fail$data((0, e.or)(p(), y()));
        function p() {
          return g.strictSchema === !1 ? e.nil : (0, e._)`${l} && !${v}`;
        }
        function y() {
          const $ = _.$async ? (0, e._)`(${n}.async ? await ${v}(${r}) : ${v}(${r}))` : (0, e._)`${v}(${r})`, b = (0, e._)`(typeof ${v} == "function" ? ${$} : ${v}.test(${r}))`;
          return (0, e._)`${v} && ${v} !== true && ${m} === ${d} && !${b}`;
        }
      }
      function u() {
        const h = w.formats[o];
        if (!h) {
          p();
          return;
        }
        if (h === !0)
          return;
        const [n, m, v] = y(h);
        n === d && s.pass($());
        function p() {
          if (g.strictSchema === !1) {
            w.logger.warn(b());
            return;
          }
          throw new Error(b());
          function b() {
            return `unknown format "${o}" ignored in schema at path "${E}"`;
          }
        }
        function y(b) {
          const N = b instanceof RegExp ? (0, e.regexpCode)(b) : g.code.formats ? (0, e._)`${g.code.formats}${(0, e.getProperty)(o)}` : void 0, L = i.scopeValue("formats", { key: o, ref: b, code: N });
          return typeof b == "object" && !(b instanceof RegExp) ? [b.type || "string", b.validate, (0, e._)`${L}.validate`] : ["string", b, L];
        }
        function $() {
          if (typeof h == "object" && !(h instanceof RegExp) && h.async) {
            if (!_.$async)
              throw new Error("async format in sync schema");
            return (0, e._)`await ${v}(${r})`;
          }
          return typeof m == "function" ? (0, e._)`${v}(${r})` : (0, e._)`${v}.test(${r})`;
        }
      }
    }
  };
  return dn.default = f, dn;
}
var Cu;
function _m() {
  if (Cu) return fn;
  Cu = 1, Object.defineProperty(fn, "__esModule", { value: !0 });
  const t = [vm().default];
  return fn.default = t, fn;
}
var tt = {}, Du;
function gm() {
  return Du || (Du = 1, Object.defineProperty(tt, "__esModule", { value: !0 }), tt.contentVocabulary = tt.metadataVocabulary = void 0, tt.metadataVocabulary = [
    "title",
    "description",
    "default",
    "deprecated",
    "readOnly",
    "writeOnly",
    "examples"
  ], tt.contentVocabulary = [
    "contentMediaType",
    "contentEncoding",
    "contentSchema"
  ]), tt;
}
var Au;
function $m() {
  if (Au) return Lr;
  Au = 1, Object.defineProperty(Lr, "__esModule", { value: !0 });
  const e = Kh(), t = rm(), f = ym(), s = _m(), d = gm(), i = [
    e.default,
    t.default,
    (0, f.default)(),
    s.default,
    d.metadataVocabulary,
    d.contentVocabulary
  ];
  return Lr.default = i, Lr;
}
var hn = {}, vt = {}, Lu;
function Em() {
  if (Lu) return vt;
  Lu = 1, Object.defineProperty(vt, "__esModule", { value: !0 }), vt.DiscrError = void 0;
  var e;
  return function(t) {
    t.Tag = "tag", t.Mapping = "mapping";
  }(e || (vt.DiscrError = e = {})), vt;
}
var ku;
function wm() {
  if (ku) return hn;
  ku = 1, Object.defineProperty(hn, "__esModule", { value: !0 });
  const e = te(), t = Em(), f = eo(), s = Cn(), d = oe(), r = {
    keyword: "discriminator",
    type: "object",
    schemaType: "object",
    error: {
      message: ({ params: { discrError: a, tagName: o } }) => a === t.DiscrError.Tag ? `tag "${o}" must be string` : `value of tag "${o}" must be in oneOf`,
      params: ({ params: { discrError: a, tag: o, tagName: l } }) => (0, e._)`{error: ${a}, tag: ${l}, tagValue: ${o}}`
    },
    code(a) {
      const { gen: o, data: l, schema: c, parentSchema: g, it: E } = a, { oneOf: _ } = g;
      if (!E.opts.discriminator)
        throw new Error("discriminator: requires discriminator option");
      const w = c.propertyName;
      if (typeof w != "string")
        throw new Error("discriminator: requires propertyName");
      if (c.mapping)
        throw new Error("discriminator: mapping is not supported");
      if (!_)
        throw new Error("discriminator: requires oneOf keyword");
      const R = o.let("valid", !1), u = o.const("tag", (0, e._)`${l}${(0, e.getProperty)(w)}`);
      o.if((0, e._)`typeof ${u} == "string"`, () => h(), () => a.error(!1, { discrError: t.DiscrError.Tag, tag: u, tagName: w })), a.ok(R);
      function h() {
        const v = m();
        o.if(!1);
        for (const p in v)
          o.elseIf((0, e._)`${u} === ${p}`), o.assign(R, n(v[p]));
        o.else(), a.error(!1, { discrError: t.DiscrError.Mapping, tag: u, tagName: w }), o.endIf();
      }
      function n(v) {
        const p = o.name("valid"), y = a.subschema({ keyword: "oneOf", schemaProp: v }, p);
        return a.mergeEvaluated(y, e.Name), p;
      }
      function m() {
        var v;
        const p = {}, y = b(g);
        let $ = !0;
        for (let F = 0; F < _.length; F++) {
          let H = _[F];
          if (H?.$ref && !(0, d.schemaHasRulesButRef)(H, E.self.RULES)) {
            const U = H.$ref;
            if (H = f.resolveRef.call(E.self, E.schemaEnv.root, E.baseId, U), H instanceof f.SchemaEnv && (H = H.schema), H === void 0)
              throw new s.default(E.opts.uriResolver, E.baseId, U);
          }
          const M = (v = H?.properties) === null || v === void 0 ? void 0 : v[w];
          if (typeof M != "object")
            throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${w}"`);
          $ = $ && (y || b(H)), N(M, F);
        }
        if (!$)
          throw new Error(`discriminator: "${w}" must be required`);
        return p;
        function b({ required: F }) {
          return Array.isArray(F) && F.includes(w);
        }
        function N(F, H) {
          if (F.const)
            L(F.const, H);
          else if (F.enum)
            for (const M of F.enum)
              L(M, H);
          else
            throw new Error(`discriminator: "properties/${w}" must have "const" or "enum"`);
        }
        function L(F, H) {
          if (typeof F != "string" || F in p)
            throw new Error(`discriminator: "${w}" values must be unique strings`);
          p[F] = H;
        }
      }
    }
  };
  return hn.default = r, hn;
}
const Sm = "http://json-schema.org/draft-07/schema#", Rm = "http://json-schema.org/draft-07/schema#", bm = "Core schema meta-schema", Pm = { schemaArray: { type: "array", minItems: 1, items: { $ref: "#" } }, nonNegativeInteger: { type: "integer", minimum: 0 }, nonNegativeIntegerDefault0: { allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }] }, simpleTypes: { enum: ["array", "boolean", "integer", "null", "number", "object", "string"] }, stringArray: { type: "array", items: { type: "string" }, uniqueItems: !0, default: [] } }, Nm = ["object", "boolean"], Om = { $id: { type: "string", format: "uri-reference" }, $schema: { type: "string", format: "uri" }, $ref: { type: "string", format: "uri-reference" }, $comment: { type: "string" }, title: { type: "string" }, description: { type: "string" }, default: !0, readOnly: { type: "boolean", default: !1 }, examples: { type: "array", items: !0 }, multipleOf: { type: "number", exclusiveMinimum: 0 }, maximum: { type: "number" }, exclusiveMaximum: { type: "number" }, minimum: { type: "number" }, exclusiveMinimum: { type: "number" }, maxLength: { $ref: "#/definitions/nonNegativeInteger" }, minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, pattern: { type: "string", format: "regex" }, additionalItems: { $ref: "#" }, items: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }], default: !0 }, maxItems: { $ref: "#/definitions/nonNegativeInteger" }, minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, uniqueItems: { type: "boolean", default: !1 }, contains: { $ref: "#" }, maxProperties: { $ref: "#/definitions/nonNegativeInteger" }, minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, required: { $ref: "#/definitions/stringArray" }, additionalProperties: { $ref: "#" }, definitions: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, properties: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, patternProperties: { type: "object", additionalProperties: { $ref: "#" }, propertyNames: { format: "regex" }, default: {} }, dependencies: { type: "object", additionalProperties: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }] } }, propertyNames: { $ref: "#" }, const: !0, enum: { type: "array", items: !0, minItems: 1, uniqueItems: !0 }, type: { anyOf: [{ $ref: "#/definitions/simpleTypes" }, { type: "array", items: { $ref: "#/definitions/simpleTypes" }, minItems: 1, uniqueItems: !0 }] }, format: { type: "string" }, contentMediaType: { type: "string" }, contentEncoding: { type: "string" }, if: { $ref: "#" }, then: { $ref: "#" }, else: { $ref: "#" }, allOf: { $ref: "#/definitions/schemaArray" }, anyOf: { $ref: "#/definitions/schemaArray" }, oneOf: { $ref: "#/definitions/schemaArray" }, not: { $ref: "#" } }, Im = {
  $schema: Sm,
  $id: Rm,
  title: bm,
  definitions: Pm,
  type: Nm,
  properties: Om,
  default: !0
};
var qu;
function Tm() {
  return qu || (qu = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
    const f = Vh(), s = $m(), d = wm(), i = Im, r = ["/properties"], a = "http://json-schema.org/draft-07/schema";
    class o extends f.default {
      _addVocabularies() {
        super._addVocabularies(), s.default.forEach((w) => this.addVocabulary(w)), this.opts.discriminator && this.addKeyword(d.default);
      }
      _addDefaultMetaSchema() {
        if (super._addDefaultMetaSchema(), !this.opts.meta)
          return;
        const w = this.opts.$data ? this.$dataMetaSchema(i, r) : i;
        this.addMetaSchema(w, a, !1), this.refs["http://json-schema.org/schema"] = a;
      }
      defaultMeta() {
        return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(a) ? a : void 0);
      }
    }
    t.Ajv = o, e.exports = t = o, e.exports.Ajv = o, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = o;
    var l = Tn();
    Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
      return l.KeywordCxt;
    } });
    var c = te();
    Object.defineProperty(t, "_", { enumerable: !0, get: function() {
      return c._;
    } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
      return c.str;
    } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
      return c.stringify;
    } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
      return c.nil;
    } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
      return c.Name;
    } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
      return c.CodeGen;
    } });
    var g = Qi();
    Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
      return g.default;
    } });
    var E = Cn();
    Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
      return E.default;
    } });
  }(Ir, Ir.exports)), Ir.exports;
}
var ju;
function Cm() {
  return ju || (ju = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
    const t = Tm(), f = te(), s = f.operators, d = {
      formatMaximum: { okStr: "<=", ok: s.LTE, fail: s.GT },
      formatMinimum: { okStr: ">=", ok: s.GTE, fail: s.LT },
      formatExclusiveMaximum: { okStr: "<", ok: s.LT, fail: s.GTE },
      formatExclusiveMinimum: { okStr: ">", ok: s.GT, fail: s.LTE }
    }, i = {
      message: ({ keyword: a, schemaCode: o }) => f.str`should be ${d[a].okStr} ${o}`,
      params: ({ keyword: a, schemaCode: o }) => f._`{comparison: ${d[a].okStr}, limit: ${o}}`
    };
    e.formatLimitDefinition = {
      keyword: Object.keys(d),
      type: "string",
      schemaType: "string",
      $data: !0,
      error: i,
      code(a) {
        const { gen: o, data: l, schemaCode: c, keyword: g, it: E } = a, { opts: _, self: w } = E;
        if (!_.validateFormats)
          return;
        const R = new t.KeywordCxt(E, w.RULES.all.format.definition, "format");
        R.$data ? u() : h();
        function u() {
          const m = o.scopeValue("formats", {
            ref: w.formats,
            code: _.code.formats
          }), v = o.const("fmt", f._`${m}[${R.schemaCode}]`);
          a.fail$data(f.or(f._`typeof ${v} != "object"`, f._`${v} instanceof RegExp`, f._`typeof ${v}.compare != "function"`, n(v)));
        }
        function h() {
          const m = R.schema, v = w.formats[m];
          if (!v || v === !0)
            return;
          if (typeof v != "object" || v instanceof RegExp || typeof v.compare != "function")
            throw new Error(`"${g}": format "${m}" does not define "compare" function`);
          const p = o.scopeValue("formats", {
            key: m,
            ref: v,
            code: _.code.formats ? f._`${_.code.formats}${f.getProperty(m)}` : void 0
          });
          a.fail$data(n(p));
        }
        function n(m) {
          return f._`${m}.compare(${l}, ${c}) ${d[g].fail} 0`;
        }
      },
      dependencies: ["format"]
    };
    const r = (a) => (a.addKeyword(e.formatLimitDefinition), a);
    e.default = r;
  }(Ds)), Ds;
}
var Fu;
function Dm() {
  return Fu || (Fu = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 });
    const f = Nh(), s = Cm(), d = te(), i = new d.Name("fullFormats"), r = new d.Name("fastFormats"), a = (l, c = { keywords: !0 }) => {
      if (Array.isArray(c))
        return o(l, c, f.fullFormats, i), l;
      const [g, E] = c.mode === "fast" ? [f.fastFormats, r] : [f.fullFormats, i], _ = c.formats || f.formatNames;
      return o(l, _, g, E), c.keywords && s.default(l), l;
    };
    a.get = (l, c = "full") => {
      const E = (c === "fast" ? f.fastFormats : f.fullFormats)[l];
      if (!E)
        throw new Error(`Unknown format "${l}"`);
      return E;
    };
    function o(l, c, g, E) {
      var _, w;
      (_ = (w = l.opts.code).formats) !== null && _ !== void 0 || (w.formats = d._`require("ajv-formats/dist/formats").${E}`);
      for (const R of c)
        l.addFormat(R, g[R]);
    }
    e.exports = t = a, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = a;
  }(Or, Or.exports)), Or.exports;
}
var Us, Mu;
function Am() {
  if (Mu) return Us;
  Mu = 1;
  const e = (o, l, c, g) => {
    if (c === "length" || c === "prototype" || c === "arguments" || c === "caller")
      return;
    const E = Object.getOwnPropertyDescriptor(o, c), _ = Object.getOwnPropertyDescriptor(l, c);
    !t(E, _) && g || Object.defineProperty(o, c, _);
  }, t = function(o, l) {
    return o === void 0 || o.configurable || o.writable === l.writable && o.enumerable === l.enumerable && o.configurable === l.configurable && (o.writable || o.value === l.value);
  }, f = (o, l) => {
    const c = Object.getPrototypeOf(l);
    c !== Object.getPrototypeOf(o) && Object.setPrototypeOf(o, c);
  }, s = (o, l) => `/* Wrapped ${o}*/
${l}`, d = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), i = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), r = (o, l, c) => {
    const g = c === "" ? "" : `with ${c.trim()}() `, E = s.bind(null, g, l.toString());
    Object.defineProperty(E, "name", i), Object.defineProperty(o, "toString", { ...d, value: E });
  };
  return Us = (o, l, { ignoreNonConfigurable: c = !1 } = {}) => {
    const { name: g } = o;
    for (const E of Reflect.ownKeys(l))
      e(o, l, E, c);
    return f(o, l), r(o, l, g), o;
  }, Us;
}
var Vs, Uu;
function Lm() {
  if (Uu) return Vs;
  Uu = 1;
  const e = Am();
  return Vs = (t, f = {}) => {
    if (typeof t != "function")
      throw new TypeError(`Expected the first argument to be a function, got \`${typeof t}\``);
    const {
      wait: s = 0,
      before: d = !1,
      after: i = !0
    } = f;
    if (!d && !i)
      throw new Error("Both `before` and `after` are false, function wouldn't be called.");
    let r, a;
    const o = function(...l) {
      const c = this, g = () => {
        r = void 0, i && (a = t.apply(c, l));
      }, E = d && !r;
      return clearTimeout(r), r = setTimeout(g, s), E && (a = t.apply(c, l)), a;
    };
    return e(o, t), o.cancel = () => {
      r && (clearTimeout(r), r = void 0);
    }, o;
  }, Vs;
}
var mn = { exports: {} }, zs, Vu;
function Dn() {
  if (Vu) return zs;
  Vu = 1;
  const e = "2.0.0", t = 256, f = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991, s = 16, d = t - 6;
  return zs = {
    MAX_LENGTH: t,
    MAX_SAFE_COMPONENT_LENGTH: s,
    MAX_SAFE_BUILD_LENGTH: d,
    MAX_SAFE_INTEGER: f,
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
  }, zs;
}
var Gs, zu;
function An() {
  return zu || (zu = 1, Gs = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...t) => console.error("SEMVER", ...t) : () => {
  }), Gs;
}
var Gu;
function Rt() {
  return Gu || (Gu = 1, function(e, t) {
    const {
      MAX_SAFE_COMPONENT_LENGTH: f,
      MAX_SAFE_BUILD_LENGTH: s,
      MAX_LENGTH: d
    } = Dn(), i = An();
    t = e.exports = {};
    const r = t.re = [], a = t.safeRe = [], o = t.src = [], l = t.safeSrc = [], c = t.t = {};
    let g = 0;
    const E = "[a-zA-Z0-9-]", _ = [
      ["\\s", 1],
      ["\\d", d],
      [E, s]
    ], w = (u) => {
      for (const [h, n] of _)
        u = u.split(`${h}*`).join(`${h}{0,${n}}`).split(`${h}+`).join(`${h}{1,${n}}`);
      return u;
    }, R = (u, h, n) => {
      const m = w(h), v = g++;
      i(u, v, h), c[u] = v, o[v] = h, l[v] = m, r[v] = new RegExp(h, n ? "g" : void 0), a[v] = new RegExp(m, n ? "g" : void 0);
    };
    R("NUMERICIDENTIFIER", "0|[1-9]\\d*"), R("NUMERICIDENTIFIERLOOSE", "\\d+"), R("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${E}*`), R("MAINVERSION", `(${o[c.NUMERICIDENTIFIER]})\\.(${o[c.NUMERICIDENTIFIER]})\\.(${o[c.NUMERICIDENTIFIER]})`), R("MAINVERSIONLOOSE", `(${o[c.NUMERICIDENTIFIERLOOSE]})\\.(${o[c.NUMERICIDENTIFIERLOOSE]})\\.(${o[c.NUMERICIDENTIFIERLOOSE]})`), R("PRERELEASEIDENTIFIER", `(?:${o[c.NONNUMERICIDENTIFIER]}|${o[c.NUMERICIDENTIFIER]})`), R("PRERELEASEIDENTIFIERLOOSE", `(?:${o[c.NONNUMERICIDENTIFIER]}|${o[c.NUMERICIDENTIFIERLOOSE]})`), R("PRERELEASE", `(?:-(${o[c.PRERELEASEIDENTIFIER]}(?:\\.${o[c.PRERELEASEIDENTIFIER]})*))`), R("PRERELEASELOOSE", `(?:-?(${o[c.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${o[c.PRERELEASEIDENTIFIERLOOSE]})*))`), R("BUILDIDENTIFIER", `${E}+`), R("BUILD", `(?:\\+(${o[c.BUILDIDENTIFIER]}(?:\\.${o[c.BUILDIDENTIFIER]})*))`), R("FULLPLAIN", `v?${o[c.MAINVERSION]}${o[c.PRERELEASE]}?${o[c.BUILD]}?`), R("FULL", `^${o[c.FULLPLAIN]}$`), R("LOOSEPLAIN", `[v=\\s]*${o[c.MAINVERSIONLOOSE]}${o[c.PRERELEASELOOSE]}?${o[c.BUILD]}?`), R("LOOSE", `^${o[c.LOOSEPLAIN]}$`), R("GTLT", "((?:<|>)?=?)"), R("XRANGEIDENTIFIERLOOSE", `${o[c.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), R("XRANGEIDENTIFIER", `${o[c.NUMERICIDENTIFIER]}|x|X|\\*`), R("XRANGEPLAIN", `[v=\\s]*(${o[c.XRANGEIDENTIFIER]})(?:\\.(${o[c.XRANGEIDENTIFIER]})(?:\\.(${o[c.XRANGEIDENTIFIER]})(?:${o[c.PRERELEASE]})?${o[c.BUILD]}?)?)?`), R("XRANGEPLAINLOOSE", `[v=\\s]*(${o[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${o[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${o[c.XRANGEIDENTIFIERLOOSE]})(?:${o[c.PRERELEASELOOSE]})?${o[c.BUILD]}?)?)?`), R("XRANGE", `^${o[c.GTLT]}\\s*${o[c.XRANGEPLAIN]}$`), R("XRANGELOOSE", `^${o[c.GTLT]}\\s*${o[c.XRANGEPLAINLOOSE]}$`), R("COERCEPLAIN", `(^|[^\\d])(\\d{1,${f}})(?:\\.(\\d{1,${f}}))?(?:\\.(\\d{1,${f}}))?`), R("COERCE", `${o[c.COERCEPLAIN]}(?:$|[^\\d])`), R("COERCEFULL", o[c.COERCEPLAIN] + `(?:${o[c.PRERELEASE]})?(?:${o[c.BUILD]})?(?:$|[^\\d])`), R("COERCERTL", o[c.COERCE], !0), R("COERCERTLFULL", o[c.COERCEFULL], !0), R("LONETILDE", "(?:~>?)"), R("TILDETRIM", `(\\s*)${o[c.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", R("TILDE", `^${o[c.LONETILDE]}${o[c.XRANGEPLAIN]}$`), R("TILDELOOSE", `^${o[c.LONETILDE]}${o[c.XRANGEPLAINLOOSE]}$`), R("LONECARET", "(?:\\^)"), R("CARETTRIM", `(\\s*)${o[c.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", R("CARET", `^${o[c.LONECARET]}${o[c.XRANGEPLAIN]}$`), R("CARETLOOSE", `^${o[c.LONECARET]}${o[c.XRANGEPLAINLOOSE]}$`), R("COMPARATORLOOSE", `^${o[c.GTLT]}\\s*(${o[c.LOOSEPLAIN]})$|^$`), R("COMPARATOR", `^${o[c.GTLT]}\\s*(${o[c.FULLPLAIN]})$|^$`), R("COMPARATORTRIM", `(\\s*)${o[c.GTLT]}\\s*(${o[c.LOOSEPLAIN]}|${o[c.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", R("HYPHENRANGE", `^\\s*(${o[c.XRANGEPLAIN]})\\s+-\\s+(${o[c.XRANGEPLAIN]})\\s*$`), R("HYPHENRANGELOOSE", `^\\s*(${o[c.XRANGEPLAINLOOSE]})\\s+-\\s+(${o[c.XRANGEPLAINLOOSE]})\\s*$`), R("STAR", "(<|>)?=?\\s*\\*"), R("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), R("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }(mn, mn.exports)), mn.exports;
}
var Ks, Ku;
function ro() {
  if (Ku) return Ks;
  Ku = 1;
  const e = Object.freeze({ loose: !0 }), t = Object.freeze({});
  return Ks = (s) => s ? typeof s != "object" ? e : s : t, Ks;
}
var Hs, Hu;
function _f() {
  if (Hu) return Hs;
  Hu = 1;
  const e = /^[0-9]+$/, t = (s, d) => {
    if (typeof s == "number" && typeof d == "number")
      return s === d ? 0 : s < d ? -1 : 1;
    const i = e.test(s), r = e.test(d);
    return i && r && (s = +s, d = +d), s === d ? 0 : i && !r ? -1 : r && !i ? 1 : s < d ? -1 : 1;
  };
  return Hs = {
    compareIdentifiers: t,
    rcompareIdentifiers: (s, d) => t(d, s)
  }, Hs;
}
var xs, xu;
function $e() {
  if (xu) return xs;
  xu = 1;
  const e = An(), { MAX_LENGTH: t, MAX_SAFE_INTEGER: f } = Dn(), { safeRe: s, t: d } = Rt(), i = ro(), { compareIdentifiers: r } = _f();
  class a {
    constructor(l, c) {
      if (c = i(c), l instanceof a) {
        if (l.loose === !!c.loose && l.includePrerelease === !!c.includePrerelease)
          return l;
        l = l.version;
      } else if (typeof l != "string")
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof l}".`);
      if (l.length > t)
        throw new TypeError(
          `version is longer than ${t} characters`
        );
      e("SemVer", l, c), this.options = c, this.loose = !!c.loose, this.includePrerelease = !!c.includePrerelease;
      const g = l.trim().match(c.loose ? s[d.LOOSE] : s[d.FULL]);
      if (!g)
        throw new TypeError(`Invalid Version: ${l}`);
      if (this.raw = l, this.major = +g[1], this.minor = +g[2], this.patch = +g[3], this.major > f || this.major < 0)
        throw new TypeError("Invalid major version");
      if (this.minor > f || this.minor < 0)
        throw new TypeError("Invalid minor version");
      if (this.patch > f || this.patch < 0)
        throw new TypeError("Invalid patch version");
      g[4] ? this.prerelease = g[4].split(".").map((E) => {
        if (/^[0-9]+$/.test(E)) {
          const _ = +E;
          if (_ >= 0 && _ < f)
            return _;
        }
        return E;
      }) : this.prerelease = [], this.build = g[5] ? g[5].split(".") : [], this.format();
    }
    format() {
      return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
    }
    toString() {
      return this.version;
    }
    compare(l) {
      if (e("SemVer.compare", this.version, this.options, l), !(l instanceof a)) {
        if (typeof l == "string" && l === this.version)
          return 0;
        l = new a(l, this.options);
      }
      return l.version === this.version ? 0 : this.compareMain(l) || this.comparePre(l);
    }
    compareMain(l) {
      return l instanceof a || (l = new a(l, this.options)), this.major < l.major ? -1 : this.major > l.major ? 1 : this.minor < l.minor ? -1 : this.minor > l.minor ? 1 : this.patch < l.patch ? -1 : this.patch > l.patch ? 1 : 0;
    }
    comparePre(l) {
      if (l instanceof a || (l = new a(l, this.options)), this.prerelease.length && !l.prerelease.length)
        return -1;
      if (!this.prerelease.length && l.prerelease.length)
        return 1;
      if (!this.prerelease.length && !l.prerelease.length)
        return 0;
      let c = 0;
      do {
        const g = this.prerelease[c], E = l.prerelease[c];
        if (e("prerelease compare", c, g, E), g === void 0 && E === void 0)
          return 0;
        if (E === void 0)
          return 1;
        if (g === void 0)
          return -1;
        if (g === E)
          continue;
        return r(g, E);
      } while (++c);
    }
    compareBuild(l) {
      l instanceof a || (l = new a(l, this.options));
      let c = 0;
      do {
        const g = this.build[c], E = l.build[c];
        if (e("build compare", c, g, E), g === void 0 && E === void 0)
          return 0;
        if (E === void 0)
          return 1;
        if (g === void 0)
          return -1;
        if (g === E)
          continue;
        return r(g, E);
      } while (++c);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(l, c, g) {
      if (l.startsWith("pre")) {
        if (!c && g === !1)
          throw new Error("invalid increment argument: identifier is empty");
        if (c) {
          const E = `-${c}`.match(this.options.loose ? s[d.PRERELEASELOOSE] : s[d.PRERELEASE]);
          if (!E || E[1] !== c)
            throw new Error(`invalid identifier: ${c}`);
        }
      }
      switch (l) {
        case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", c, g);
          break;
        case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", c, g);
          break;
        case "prepatch":
          this.prerelease.length = 0, this.inc("patch", c, g), this.inc("pre", c, g);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          this.prerelease.length === 0 && this.inc("patch", c, g), this.inc("pre", c, g);
          break;
        case "release":
          if (this.prerelease.length === 0)
            throw new Error(`version ${this.raw} is not a prerelease`);
          this.prerelease.length = 0;
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
          const E = Number(g) ? 1 : 0;
          if (this.prerelease.length === 0)
            this.prerelease = [E];
          else {
            let _ = this.prerelease.length;
            for (; --_ >= 0; )
              typeof this.prerelease[_] == "number" && (this.prerelease[_]++, _ = -2);
            if (_ === -1) {
              if (c === this.prerelease.join(".") && g === !1)
                throw new Error("invalid increment argument: identifier already exists");
              this.prerelease.push(E);
            }
          }
          if (c) {
            let _ = [c, E];
            g === !1 && (_ = [c]), r(this.prerelease[0], c) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = _) : this.prerelease = _;
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${l}`);
      }
      return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
    }
  }
  return xs = a, xs;
}
var Bs, Bu;
function lt() {
  if (Bu) return Bs;
  Bu = 1;
  const e = $e();
  return Bs = (f, s, d = !1) => {
    if (f instanceof e)
      return f;
    try {
      return new e(f, s);
    } catch (i) {
      if (!d)
        return null;
      throw i;
    }
  }, Bs;
}
var Ws, Wu;
function km() {
  if (Wu) return Ws;
  Wu = 1;
  const e = lt();
  return Ws = (f, s) => {
    const d = e(f, s);
    return d ? d.version : null;
  }, Ws;
}
var Js, Ju;
function qm() {
  if (Ju) return Js;
  Ju = 1;
  const e = lt();
  return Js = (f, s) => {
    const d = e(f.trim().replace(/^[=v]+/, ""), s);
    return d ? d.version : null;
  }, Js;
}
var Zs, Zu;
function jm() {
  if (Zu) return Zs;
  Zu = 1;
  const e = $e();
  return Zs = (f, s, d, i, r) => {
    typeof d == "string" && (r = i, i = d, d = void 0);
    try {
      return new e(
        f instanceof e ? f.version : f,
        d
      ).inc(s, i, r).version;
    } catch {
      return null;
    }
  }, Zs;
}
var Xs, Xu;
function Fm() {
  if (Xu) return Xs;
  Xu = 1;
  const e = lt();
  return Xs = (f, s) => {
    const d = e(f, null, !0), i = e(s, null, !0), r = d.compare(i);
    if (r === 0)
      return null;
    const a = r > 0, o = a ? d : i, l = a ? i : d, c = !!o.prerelease.length;
    if (!!l.prerelease.length && !c) {
      if (!l.patch && !l.minor)
        return "major";
      if (l.compareMain(o) === 0)
        return l.minor && !l.patch ? "minor" : "patch";
    }
    const E = c ? "pre" : "";
    return d.major !== i.major ? E + "major" : d.minor !== i.minor ? E + "minor" : d.patch !== i.patch ? E + "patch" : "prerelease";
  }, Xs;
}
var Ys, Yu;
function Mm() {
  if (Yu) return Ys;
  Yu = 1;
  const e = $e();
  return Ys = (f, s) => new e(f, s).major, Ys;
}
var Qs, Qu;
function Um() {
  if (Qu) return Qs;
  Qu = 1;
  const e = $e();
  return Qs = (f, s) => new e(f, s).minor, Qs;
}
var ei, el;
function Vm() {
  if (el) return ei;
  el = 1;
  const e = $e();
  return ei = (f, s) => new e(f, s).patch, ei;
}
var ti, tl;
function zm() {
  if (tl) return ti;
  tl = 1;
  const e = lt();
  return ti = (f, s) => {
    const d = e(f, s);
    return d && d.prerelease.length ? d.prerelease : null;
  }, ti;
}
var ri, rl;
function De() {
  if (rl) return ri;
  rl = 1;
  const e = $e();
  return ri = (f, s, d) => new e(f, d).compare(new e(s, d)), ri;
}
var ni, nl;
function Gm() {
  if (nl) return ni;
  nl = 1;
  const e = De();
  return ni = (f, s, d) => e(s, f, d), ni;
}
var si, sl;
function Km() {
  if (sl) return si;
  sl = 1;
  const e = De();
  return si = (f, s) => e(f, s, !0), si;
}
var ii, il;
function no() {
  if (il) return ii;
  il = 1;
  const e = $e();
  return ii = (f, s, d) => {
    const i = new e(f, d), r = new e(s, d);
    return i.compare(r) || i.compareBuild(r);
  }, ii;
}
var oi, ol;
function Hm() {
  if (ol) return oi;
  ol = 1;
  const e = no();
  return oi = (f, s) => f.sort((d, i) => e(d, i, s)), oi;
}
var ai, al;
function xm() {
  if (al) return ai;
  al = 1;
  const e = no();
  return ai = (f, s) => f.sort((d, i) => e(i, d, s)), ai;
}
var ci, cl;
function Ln() {
  if (cl) return ci;
  cl = 1;
  const e = De();
  return ci = (f, s, d) => e(f, s, d) > 0, ci;
}
var ui, ul;
function so() {
  if (ul) return ui;
  ul = 1;
  const e = De();
  return ui = (f, s, d) => e(f, s, d) < 0, ui;
}
var li, ll;
function gf() {
  if (ll) return li;
  ll = 1;
  const e = De();
  return li = (f, s, d) => e(f, s, d) === 0, li;
}
var fi, fl;
function $f() {
  if (fl) return fi;
  fl = 1;
  const e = De();
  return fi = (f, s, d) => e(f, s, d) !== 0, fi;
}
var di, dl;
function io() {
  if (dl) return di;
  dl = 1;
  const e = De();
  return di = (f, s, d) => e(f, s, d) >= 0, di;
}
var hi, hl;
function oo() {
  if (hl) return hi;
  hl = 1;
  const e = De();
  return hi = (f, s, d) => e(f, s, d) <= 0, hi;
}
var mi, ml;
function Ef() {
  if (ml) return mi;
  ml = 1;
  const e = gf(), t = $f(), f = Ln(), s = io(), d = so(), i = oo();
  return mi = (a, o, l, c) => {
    switch (o) {
      case "===":
        return typeof a == "object" && (a = a.version), typeof l == "object" && (l = l.version), a === l;
      case "!==":
        return typeof a == "object" && (a = a.version), typeof l == "object" && (l = l.version), a !== l;
      case "":
      case "=":
      case "==":
        return e(a, l, c);
      case "!=":
        return t(a, l, c);
      case ">":
        return f(a, l, c);
      case ">=":
        return s(a, l, c);
      case "<":
        return d(a, l, c);
      case "<=":
        return i(a, l, c);
      default:
        throw new TypeError(`Invalid operator: ${o}`);
    }
  }, mi;
}
var pi, pl;
function Bm() {
  if (pl) return pi;
  pl = 1;
  const e = $e(), t = lt(), { safeRe: f, t: s } = Rt();
  return pi = (i, r) => {
    if (i instanceof e)
      return i;
    if (typeof i == "number" && (i = String(i)), typeof i != "string")
      return null;
    r = r || {};
    let a = null;
    if (!r.rtl)
      a = i.match(r.includePrerelease ? f[s.COERCEFULL] : f[s.COERCE]);
    else {
      const _ = r.includePrerelease ? f[s.COERCERTLFULL] : f[s.COERCERTL];
      let w;
      for (; (w = _.exec(i)) && (!a || a.index + a[0].length !== i.length); )
        (!a || w.index + w[0].length !== a.index + a[0].length) && (a = w), _.lastIndex = w.index + w[1].length + w[2].length;
      _.lastIndex = -1;
    }
    if (a === null)
      return null;
    const o = a[2], l = a[3] || "0", c = a[4] || "0", g = r.includePrerelease && a[5] ? `-${a[5]}` : "", E = r.includePrerelease && a[6] ? `+${a[6]}` : "";
    return t(`${o}.${l}.${c}${g}${E}`, r);
  }, pi;
}
var yi, yl;
function Wm() {
  if (yl) return yi;
  yl = 1;
  class e {
    constructor() {
      this.max = 1e3, this.map = /* @__PURE__ */ new Map();
    }
    get(f) {
      const s = this.map.get(f);
      if (s !== void 0)
        return this.map.delete(f), this.map.set(f, s), s;
    }
    delete(f) {
      return this.map.delete(f);
    }
    set(f, s) {
      if (!this.delete(f) && s !== void 0) {
        if (this.map.size >= this.max) {
          const i = this.map.keys().next().value;
          this.delete(i);
        }
        this.map.set(f, s);
      }
      return this;
    }
  }
  return yi = e, yi;
}
var vi, vl;
function Ae() {
  if (vl) return vi;
  vl = 1;
  const e = /\s+/g;
  class t {
    constructor(z, J) {
      if (J = d(J), z instanceof t)
        return z.loose === !!J.loose && z.includePrerelease === !!J.includePrerelease ? z : new t(z.raw, J);
      if (z instanceof i)
        return this.raw = z.value, this.set = [[z]], this.formatted = void 0, this;
      if (this.options = J, this.loose = !!J.loose, this.includePrerelease = !!J.includePrerelease, this.raw = z.trim().replace(e, " "), this.set = this.raw.split("||").map((W) => this.parseRange(W.trim())).filter((W) => W.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const W = this.set[0];
        if (this.set = this.set.filter((j) => !R(j[0])), this.set.length === 0)
          this.set = [W];
        else if (this.set.length > 1) {
          for (const j of this.set)
            if (j.length === 1 && u(j[0])) {
              this.set = [j];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let z = 0; z < this.set.length; z++) {
          z > 0 && (this.formatted += "||");
          const J = this.set[z];
          for (let W = 0; W < J.length; W++)
            W > 0 && (this.formatted += " "), this.formatted += J[W].toString().trim();
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
    parseRange(z) {
      const W = ((this.options.includePrerelease && _) | (this.options.loose && w)) + ":" + z, j = s.get(W);
      if (j)
        return j;
      const G = this.options.loose, D = G ? o[l.HYPHENRANGELOOSE] : o[l.HYPHENRANGE];
      z = z.replace(D, H(this.options.includePrerelease)), r("hyphen replace", z), z = z.replace(o[l.COMPARATORTRIM], c), r("comparator trim", z), z = z.replace(o[l.TILDETRIM], g), r("tilde trim", z), z = z.replace(o[l.CARETTRIM], E), r("caret trim", z);
      let O = z.split(" ").map((P) => n(P, this.options)).join(" ").split(/\s+/).map((P) => F(P, this.options));
      G && (O = O.filter((P) => (r("loose invalid filter", P, this.options), !!P.match(o[l.COMPARATORLOOSE])))), r("range list", O);
      const k = /* @__PURE__ */ new Map(), T = O.map((P) => new i(P, this.options));
      for (const P of T) {
        if (R(P))
          return [P];
        k.set(P.value, P);
      }
      k.size > 1 && k.has("") && k.delete("");
      const S = [...k.values()];
      return s.set(W, S), S;
    }
    intersects(z, J) {
      if (!(z instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((W) => h(W, J) && z.set.some((j) => h(j, J) && W.every((G) => j.every((D) => G.intersects(D, J)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(z) {
      if (!z)
        return !1;
      if (typeof z == "string")
        try {
          z = new a(z, this.options);
        } catch {
          return !1;
        }
      for (let J = 0; J < this.set.length; J++)
        if (M(this.set[J], z, this.options))
          return !0;
      return !1;
    }
  }
  vi = t;
  const f = Wm(), s = new f(), d = ro(), i = kn(), r = An(), a = $e(), {
    safeRe: o,
    t: l,
    comparatorTrimReplace: c,
    tildeTrimReplace: g,
    caretTrimReplace: E
  } = Rt(), { FLAG_INCLUDE_PRERELEASE: _, FLAG_LOOSE: w } = Dn(), R = (U) => U.value === "<0.0.0-0", u = (U) => U.value === "", h = (U, z) => {
    let J = !0;
    const W = U.slice();
    let j = W.pop();
    for (; J && W.length; )
      J = W.every((G) => j.intersects(G, z)), j = W.pop();
    return J;
  }, n = (U, z) => (U = U.replace(o[l.BUILD], ""), r("comp", U, z), U = y(U, z), r("caret", U), U = v(U, z), r("tildes", U), U = b(U, z), r("xrange", U), U = L(U, z), r("stars", U), U), m = (U) => !U || U.toLowerCase() === "x" || U === "*", v = (U, z) => U.trim().split(/\s+/).map((J) => p(J, z)).join(" "), p = (U, z) => {
    const J = z.loose ? o[l.TILDELOOSE] : o[l.TILDE];
    return U.replace(J, (W, j, G, D, O) => {
      r("tilde", U, W, j, G, D, O);
      let k;
      return m(j) ? k = "" : m(G) ? k = `>=${j}.0.0 <${+j + 1}.0.0-0` : m(D) ? k = `>=${j}.${G}.0 <${j}.${+G + 1}.0-0` : O ? (r("replaceTilde pr", O), k = `>=${j}.${G}.${D}-${O} <${j}.${+G + 1}.0-0`) : k = `>=${j}.${G}.${D} <${j}.${+G + 1}.0-0`, r("tilde return", k), k;
    });
  }, y = (U, z) => U.trim().split(/\s+/).map((J) => $(J, z)).join(" "), $ = (U, z) => {
    r("caret", U, z);
    const J = z.loose ? o[l.CARETLOOSE] : o[l.CARET], W = z.includePrerelease ? "-0" : "";
    return U.replace(J, (j, G, D, O, k) => {
      r("caret", U, j, G, D, O, k);
      let T;
      return m(G) ? T = "" : m(D) ? T = `>=${G}.0.0${W} <${+G + 1}.0.0-0` : m(O) ? G === "0" ? T = `>=${G}.${D}.0${W} <${G}.${+D + 1}.0-0` : T = `>=${G}.${D}.0${W} <${+G + 1}.0.0-0` : k ? (r("replaceCaret pr", k), G === "0" ? D === "0" ? T = `>=${G}.${D}.${O}-${k} <${G}.${D}.${+O + 1}-0` : T = `>=${G}.${D}.${O}-${k} <${G}.${+D + 1}.0-0` : T = `>=${G}.${D}.${O}-${k} <${+G + 1}.0.0-0`) : (r("no pr"), G === "0" ? D === "0" ? T = `>=${G}.${D}.${O}${W} <${G}.${D}.${+O + 1}-0` : T = `>=${G}.${D}.${O}${W} <${G}.${+D + 1}.0-0` : T = `>=${G}.${D}.${O} <${+G + 1}.0.0-0`), r("caret return", T), T;
    });
  }, b = (U, z) => (r("replaceXRanges", U, z), U.split(/\s+/).map((J) => N(J, z)).join(" ")), N = (U, z) => {
    U = U.trim();
    const J = z.loose ? o[l.XRANGELOOSE] : o[l.XRANGE];
    return U.replace(J, (W, j, G, D, O, k) => {
      r("xRange", U, W, j, G, D, O, k);
      const T = m(G), S = T || m(D), P = S || m(O), A = P;
      return j === "=" && A && (j = ""), k = z.includePrerelease ? "-0" : "", T ? j === ">" || j === "<" ? W = "<0.0.0-0" : W = "*" : j && A ? (S && (D = 0), O = 0, j === ">" ? (j = ">=", S ? (G = +G + 1, D = 0, O = 0) : (D = +D + 1, O = 0)) : j === "<=" && (j = "<", S ? G = +G + 1 : D = +D + 1), j === "<" && (k = "-0"), W = `${j + G}.${D}.${O}${k}`) : S ? W = `>=${G}.0.0${k} <${+G + 1}.0.0-0` : P && (W = `>=${G}.${D}.0${k} <${G}.${+D + 1}.0-0`), r("xRange return", W), W;
    });
  }, L = (U, z) => (r("replaceStars", U, z), U.trim().replace(o[l.STAR], "")), F = (U, z) => (r("replaceGTE0", U, z), U.trim().replace(o[z.includePrerelease ? l.GTE0PRE : l.GTE0], "")), H = (U) => (z, J, W, j, G, D, O, k, T, S, P, A) => (m(W) ? J = "" : m(j) ? J = `>=${W}.0.0${U ? "-0" : ""}` : m(G) ? J = `>=${W}.${j}.0${U ? "-0" : ""}` : D ? J = `>=${J}` : J = `>=${J}${U ? "-0" : ""}`, m(T) ? k = "" : m(S) ? k = `<${+T + 1}.0.0-0` : m(P) ? k = `<${T}.${+S + 1}.0-0` : A ? k = `<=${T}.${S}.${P}-${A}` : U ? k = `<${T}.${S}.${+P + 1}-0` : k = `<=${k}`, `${J} ${k}`.trim()), M = (U, z, J) => {
    for (let W = 0; W < U.length; W++)
      if (!U[W].test(z))
        return !1;
    if (z.prerelease.length && !J.includePrerelease) {
      for (let W = 0; W < U.length; W++)
        if (r(U[W].semver), U[W].semver !== i.ANY && U[W].semver.prerelease.length > 0) {
          const j = U[W].semver;
          if (j.major === z.major && j.minor === z.minor && j.patch === z.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return vi;
}
var _i, _l;
function kn() {
  if (_l) return _i;
  _l = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(c, g) {
      if (g = f(g), c instanceof t) {
        if (c.loose === !!g.loose)
          return c;
        c = c.value;
      }
      c = c.trim().split(/\s+/).join(" "), r("comparator", c, g), this.options = g, this.loose = !!g.loose, this.parse(c), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, r("comp", this);
    }
    parse(c) {
      const g = this.options.loose ? s[d.COMPARATORLOOSE] : s[d.COMPARATOR], E = c.match(g);
      if (!E)
        throw new TypeError(`Invalid comparator: ${c}`);
      this.operator = E[1] !== void 0 ? E[1] : "", this.operator === "=" && (this.operator = ""), E[2] ? this.semver = new a(E[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(c) {
      if (r("Comparator.test", c, this.options.loose), this.semver === e || c === e)
        return !0;
      if (typeof c == "string")
        try {
          c = new a(c, this.options);
        } catch {
          return !1;
        }
      return i(c, this.operator, this.semver, this.options);
    }
    intersects(c, g) {
      if (!(c instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new o(c.value, g).test(this.value) : c.operator === "" ? c.value === "" ? !0 : new o(this.value, g).test(c.semver) : (g = f(g), g.includePrerelease && (this.value === "<0.0.0-0" || c.value === "<0.0.0-0") || !g.includePrerelease && (this.value.startsWith("<0.0.0") || c.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && c.operator.startsWith(">") || this.operator.startsWith("<") && c.operator.startsWith("<") || this.semver.version === c.semver.version && this.operator.includes("=") && c.operator.includes("=") || i(this.semver, "<", c.semver, g) && this.operator.startsWith(">") && c.operator.startsWith("<") || i(this.semver, ">", c.semver, g) && this.operator.startsWith("<") && c.operator.startsWith(">")));
    }
  }
  _i = t;
  const f = ro(), { safeRe: s, t: d } = Rt(), i = Ef(), r = An(), a = $e(), o = Ae();
  return _i;
}
var gi, gl;
function qn() {
  if (gl) return gi;
  gl = 1;
  const e = Ae();
  return gi = (f, s, d) => {
    try {
      s = new e(s, d);
    } catch {
      return !1;
    }
    return s.test(f);
  }, gi;
}
var $i, $l;
function Jm() {
  if ($l) return $i;
  $l = 1;
  const e = Ae();
  return $i = (f, s) => new e(f, s).set.map((d) => d.map((i) => i.value).join(" ").trim().split(" ")), $i;
}
var Ei, El;
function Zm() {
  if (El) return Ei;
  El = 1;
  const e = $e(), t = Ae();
  return Ei = (s, d, i) => {
    let r = null, a = null, o = null;
    try {
      o = new t(d, i);
    } catch {
      return null;
    }
    return s.forEach((l) => {
      o.test(l) && (!r || a.compare(l) === -1) && (r = l, a = new e(r, i));
    }), r;
  }, Ei;
}
var wi, wl;
function Xm() {
  if (wl) return wi;
  wl = 1;
  const e = $e(), t = Ae();
  return wi = (s, d, i) => {
    let r = null, a = null, o = null;
    try {
      o = new t(d, i);
    } catch {
      return null;
    }
    return s.forEach((l) => {
      o.test(l) && (!r || a.compare(l) === 1) && (r = l, a = new e(r, i));
    }), r;
  }, wi;
}
var Si, Sl;
function Ym() {
  if (Sl) return Si;
  Sl = 1;
  const e = $e(), t = Ae(), f = Ln();
  return Si = (d, i) => {
    d = new t(d, i);
    let r = new e("0.0.0");
    if (d.test(r) || (r = new e("0.0.0-0"), d.test(r)))
      return r;
    r = null;
    for (let a = 0; a < d.set.length; ++a) {
      const o = d.set[a];
      let l = null;
      o.forEach((c) => {
        const g = new e(c.semver.version);
        switch (c.operator) {
          case ">":
            g.prerelease.length === 0 ? g.patch++ : g.prerelease.push(0), g.raw = g.format();
          /* fallthrough */
          case "":
          case ">=":
            (!l || f(g, l)) && (l = g);
            break;
          case "<":
          case "<=":
            break;
          /* istanbul ignore next */
          default:
            throw new Error(`Unexpected operation: ${c.operator}`);
        }
      }), l && (!r || f(r, l)) && (r = l);
    }
    return r && d.test(r) ? r : null;
  }, Si;
}
var Ri, Rl;
function Qm() {
  if (Rl) return Ri;
  Rl = 1;
  const e = Ae();
  return Ri = (f, s) => {
    try {
      return new e(f, s).range || "*";
    } catch {
      return null;
    }
  }, Ri;
}
var bi, bl;
function ao() {
  if (bl) return bi;
  bl = 1;
  const e = $e(), t = kn(), { ANY: f } = t, s = Ae(), d = qn(), i = Ln(), r = so(), a = oo(), o = io();
  return bi = (c, g, E, _) => {
    c = new e(c, _), g = new s(g, _);
    let w, R, u, h, n;
    switch (E) {
      case ">":
        w = i, R = a, u = r, h = ">", n = ">=";
        break;
      case "<":
        w = r, R = o, u = i, h = "<", n = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (d(c, g, _))
      return !1;
    for (let m = 0; m < g.set.length; ++m) {
      const v = g.set[m];
      let p = null, y = null;
      if (v.forEach(($) => {
        $.semver === f && ($ = new t(">=0.0.0")), p = p || $, y = y || $, w($.semver, p.semver, _) ? p = $ : u($.semver, y.semver, _) && (y = $);
      }), p.operator === h || p.operator === n || (!y.operator || y.operator === h) && R(c, y.semver))
        return !1;
      if (y.operator === n && u(c, y.semver))
        return !1;
    }
    return !0;
  }, bi;
}
var Pi, Pl;
function ep() {
  if (Pl) return Pi;
  Pl = 1;
  const e = ao();
  return Pi = (f, s, d) => e(f, s, ">", d), Pi;
}
var Ni, Nl;
function tp() {
  if (Nl) return Ni;
  Nl = 1;
  const e = ao();
  return Ni = (f, s, d) => e(f, s, "<", d), Ni;
}
var Oi, Ol;
function rp() {
  if (Ol) return Oi;
  Ol = 1;
  const e = Ae();
  return Oi = (f, s, d) => (f = new e(f, d), s = new e(s, d), f.intersects(s, d)), Oi;
}
var Ii, Il;
function np() {
  if (Il) return Ii;
  Il = 1;
  const e = qn(), t = De();
  return Ii = (f, s, d) => {
    const i = [];
    let r = null, a = null;
    const o = f.sort((E, _) => t(E, _, d));
    for (const E of o)
      e(E, s, d) ? (a = E, r || (r = E)) : (a && i.push([r, a]), a = null, r = null);
    r && i.push([r, null]);
    const l = [];
    for (const [E, _] of i)
      E === _ ? l.push(E) : !_ && E === o[0] ? l.push("*") : _ ? E === o[0] ? l.push(`<=${_}`) : l.push(`${E} - ${_}`) : l.push(`>=${E}`);
    const c = l.join(" || "), g = typeof s.raw == "string" ? s.raw : String(s);
    return c.length < g.length ? c : s;
  }, Ii;
}
var Ti, Tl;
function sp() {
  if (Tl) return Ti;
  Tl = 1;
  const e = Ae(), t = kn(), { ANY: f } = t, s = qn(), d = De(), i = (g, E, _ = {}) => {
    if (g === E)
      return !0;
    g = new e(g, _), E = new e(E, _);
    let w = !1;
    e: for (const R of g.set) {
      for (const u of E.set) {
        const h = o(R, u, _);
        if (w = w || h !== null, h)
          continue e;
      }
      if (w)
        return !1;
    }
    return !0;
  }, r = [new t(">=0.0.0-0")], a = [new t(">=0.0.0")], o = (g, E, _) => {
    if (g === E)
      return !0;
    if (g.length === 1 && g[0].semver === f) {
      if (E.length === 1 && E[0].semver === f)
        return !0;
      _.includePrerelease ? g = r : g = a;
    }
    if (E.length === 1 && E[0].semver === f) {
      if (_.includePrerelease)
        return !0;
      E = a;
    }
    const w = /* @__PURE__ */ new Set();
    let R, u;
    for (const b of g)
      b.operator === ">" || b.operator === ">=" ? R = l(R, b, _) : b.operator === "<" || b.operator === "<=" ? u = c(u, b, _) : w.add(b.semver);
    if (w.size > 1)
      return null;
    let h;
    if (R && u) {
      if (h = d(R.semver, u.semver, _), h > 0)
        return null;
      if (h === 0 && (R.operator !== ">=" || u.operator !== "<="))
        return null;
    }
    for (const b of w) {
      if (R && !s(b, String(R), _) || u && !s(b, String(u), _))
        return null;
      for (const N of E)
        if (!s(b, String(N), _))
          return !1;
      return !0;
    }
    let n, m, v, p, y = u && !_.includePrerelease && u.semver.prerelease.length ? u.semver : !1, $ = R && !_.includePrerelease && R.semver.prerelease.length ? R.semver : !1;
    y && y.prerelease.length === 1 && u.operator === "<" && y.prerelease[0] === 0 && (y = !1);
    for (const b of E) {
      if (p = p || b.operator === ">" || b.operator === ">=", v = v || b.operator === "<" || b.operator === "<=", R) {
        if ($ && b.semver.prerelease && b.semver.prerelease.length && b.semver.major === $.major && b.semver.minor === $.minor && b.semver.patch === $.patch && ($ = !1), b.operator === ">" || b.operator === ">=") {
          if (n = l(R, b, _), n === b && n !== R)
            return !1;
        } else if (R.operator === ">=" && !s(R.semver, String(b), _))
          return !1;
      }
      if (u) {
        if (y && b.semver.prerelease && b.semver.prerelease.length && b.semver.major === y.major && b.semver.minor === y.minor && b.semver.patch === y.patch && (y = !1), b.operator === "<" || b.operator === "<=") {
          if (m = c(u, b, _), m === b && m !== u)
            return !1;
        } else if (u.operator === "<=" && !s(u.semver, String(b), _))
          return !1;
      }
      if (!b.operator && (u || R) && h !== 0)
        return !1;
    }
    return !(R && v && !u && h !== 0 || u && p && !R && h !== 0 || $ || y);
  }, l = (g, E, _) => {
    if (!g)
      return E;
    const w = d(g.semver, E.semver, _);
    return w > 0 ? g : w < 0 || E.operator === ">" && g.operator === ">=" ? E : g;
  }, c = (g, E, _) => {
    if (!g)
      return E;
    const w = d(g.semver, E.semver, _);
    return w < 0 ? g : w > 0 || E.operator === "<" && g.operator === "<=" ? E : g;
  };
  return Ti = i, Ti;
}
var Ci, Cl;
function ip() {
  if (Cl) return Ci;
  Cl = 1;
  const e = Rt(), t = Dn(), f = $e(), s = _f(), d = lt(), i = km(), r = qm(), a = jm(), o = Fm(), l = Mm(), c = Um(), g = Vm(), E = zm(), _ = De(), w = Gm(), R = Km(), u = no(), h = Hm(), n = xm(), m = Ln(), v = so(), p = gf(), y = $f(), $ = io(), b = oo(), N = Ef(), L = Bm(), F = kn(), H = Ae(), M = qn(), U = Jm(), z = Zm(), J = Xm(), W = Ym(), j = Qm(), G = ao(), D = ep(), O = tp(), k = rp(), T = np(), S = sp();
  return Ci = {
    parse: d,
    valid: i,
    clean: r,
    inc: a,
    diff: o,
    major: l,
    minor: c,
    patch: g,
    prerelease: E,
    compare: _,
    rcompare: w,
    compareLoose: R,
    compareBuild: u,
    sort: h,
    rsort: n,
    gt: m,
    lt: v,
    eq: p,
    neq: y,
    gte: $,
    lte: b,
    cmp: N,
    coerce: L,
    Comparator: F,
    Range: H,
    satisfies: M,
    toComparators: U,
    maxSatisfying: z,
    minSatisfying: J,
    minVersion: W,
    validRange: j,
    outside: G,
    gtr: D,
    ltr: O,
    intersects: k,
    simplifyRange: T,
    subset: S,
    SemVer: f,
    re: e.re,
    src: e.src,
    tokens: e.t,
    SEMVER_SPEC_VERSION: t.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: t.RELEASE_TYPES,
    compareIdentifiers: s.compareIdentifiers,
    rcompareIdentifiers: s.rcompareIdentifiers
  }, Ci;
}
var _t = { exports: {} }, pn = { exports: {} }, Dl;
function op() {
  if (Dl) return pn.exports;
  Dl = 1;
  const e = (t, f) => {
    for (const s of Reflect.ownKeys(f))
      Object.defineProperty(t, s, Object.getOwnPropertyDescriptor(f, s));
    return t;
  };
  return pn.exports = e, pn.exports.default = e, pn.exports;
}
var Al;
function ap() {
  if (Al) return _t.exports;
  Al = 1;
  const e = op(), t = /* @__PURE__ */ new WeakMap(), f = (s, d = {}) => {
    if (typeof s != "function")
      throw new TypeError("Expected a function");
    let i, r = 0;
    const a = s.displayName || s.name || "<anonymous>", o = function(...l) {
      if (t.set(o, ++r), r === 1)
        i = s.apply(this, l), s = null;
      else if (d.throw === !0)
        throw new Error(`Function \`${a}\` can only be called once`);
      return i;
    };
    return e(o, s), t.set(o, r), o;
  };
  return _t.exports = f, _t.exports.default = f, _t.exports.callCount = (s) => {
    if (!t.has(s))
      throw new Error(`The given function \`${s.name}\` is not wrapped by the \`onetime\` package`);
    return t.get(s);
  }, _t.exports;
}
var yn = $t.exports, Ll;
function cp() {
  return Ll || (Ll = 1, function(e, t) {
    var f = yn && yn.__classPrivateFieldSet || function(W, j, G, D, O) {
      if (D === "m") throw new TypeError("Private method is not writable");
      if (D === "a" && !O) throw new TypeError("Private accessor was defined without a setter");
      if (typeof j == "function" ? W !== j || !O : !j.has(W)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return D === "a" ? O.call(W, G) : O ? O.value = G : j.set(W, G), G;
    }, s = yn && yn.__classPrivateFieldGet || function(W, j, G, D) {
      if (G === "a" && !D) throw new TypeError("Private accessor was defined without a getter");
      if (typeof j == "function" ? W !== j || !D : !j.has(W)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return G === "m" ? D : G === "a" ? D.call(W) : D ? D.value : j.get(W);
    }, d, i, r, a, o, l;
    Object.defineProperty(t, "__esModule", { value: !0 });
    const c = xi, g = ct, E = me, _ = tf, w = ef, R = Cf, u = sd(), h = fd(), n = dd(), m = $d(), v = Ph(), p = Dm(), y = Lm(), $ = ip(), b = ap(), N = "aes-256-cbc", L = () => /* @__PURE__ */ Object.create(null), F = (W) => W != null;
    let H = "";
    try {
      delete require.cache[__filename], H = E.dirname((i = (d = e.parent) === null || d === void 0 ? void 0 : d.filename) !== null && i !== void 0 ? i : ".");
    } catch {
    }
    const M = (W, j) => {
      const G = /* @__PURE__ */ new Set([
        "undefined",
        "symbol",
        "function"
      ]), D = typeof j;
      if (G.has(D))
        throw new TypeError(`Setting a value of type \`${D}\` for key \`${W}\` is not allowed as it's not supported by JSON`);
    }, U = "__internal__", z = `${U}.migrations.version`;
    class J {
      constructor(j = {}) {
        var G;
        r.set(this, void 0), a.set(this, void 0), o.set(this, void 0), l.set(this, {}), this._deserialize = (P) => JSON.parse(P), this._serialize = (P) => JSON.stringify(P, void 0, "	");
        const D = {
          configName: "config",
          fileExtension: "json",
          projectSuffix: "nodejs",
          clearInvalidConfig: !1,
          accessPropertiesByDotNotation: !0,
          configFileMode: 438,
          ...j
        }, O = b(() => {
          const P = h.sync({ cwd: H }), A = P && JSON.parse(g.readFileSync(P, "utf8"));
          return A ?? {};
        });
        if (!D.cwd) {
          if (D.projectName || (D.projectName = O().name), !D.projectName)
            throw new Error("Project name could not be inferred. Please specify the `projectName` option.");
          D.cwd = n(D.projectName, { suffix: D.projectSuffix }).config;
        }
        if (f(this, o, D, "f"), D.schema) {
          if (typeof D.schema != "object")
            throw new TypeError("The `schema` option must be an object.");
          const P = new v.default({
            allErrors: !0,
            useDefaults: !0
          });
          (0, p.default)(P);
          const A = {
            type: "object",
            properties: D.schema
          };
          f(this, r, P.compile(A), "f");
          for (const [K, B] of Object.entries(D.schema))
            B?.default && (s(this, l, "f")[K] = B.default);
        }
        D.defaults && f(this, l, {
          ...s(this, l, "f"),
          ...D.defaults
        }, "f"), D.serialize && (this._serialize = D.serialize), D.deserialize && (this._deserialize = D.deserialize), this.events = new R.EventEmitter(), f(this, a, D.encryptionKey, "f");
        const k = D.fileExtension ? `.${D.fileExtension}` : "";
        this.path = E.resolve(D.cwd, `${(G = D.configName) !== null && G !== void 0 ? G : "config"}${k}`);
        const T = this.store, S = Object.assign(L(), D.defaults, T);
        this._validate(S);
        try {
          w.deepEqual(T, S);
        } catch {
          this.store = S;
        }
        if (D.watch && this._watch(), D.migrations) {
          if (D.projectVersion || (D.projectVersion = O().version), !D.projectVersion)
            throw new Error("Project version could not be inferred. Please specify the `projectVersion` option.");
          this._migrate(D.migrations, D.projectVersion, D.beforeEachMigration);
        }
      }
      get(j, G) {
        if (s(this, o, "f").accessPropertiesByDotNotation)
          return this._get(j, G);
        const { store: D } = this;
        return j in D ? D[j] : G;
      }
      set(j, G) {
        if (typeof j != "string" && typeof j != "object")
          throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof j}`);
        if (typeof j != "object" && G === void 0)
          throw new TypeError("Use `delete()` to clear values");
        if (this._containsReservedKey(j))
          throw new TypeError(`Please don't use the ${U} key, as it's used to manage this module internal operations.`);
        const { store: D } = this, O = (k, T) => {
          M(k, T), s(this, o, "f").accessPropertiesByDotNotation ? u.set(D, k, T) : D[k] = T;
        };
        if (typeof j == "object") {
          const k = j;
          for (const [T, S] of Object.entries(k))
            O(T, S);
        } else
          O(j, G);
        this.store = D;
      }
      /**
      		    Check if an item exists.
      
      		    @param key - The key of the item to check.
      		    */
      has(j) {
        return s(this, o, "f").accessPropertiesByDotNotation ? u.has(this.store, j) : j in this.store;
      }
      /**
      		    Reset items to their default values, as defined by the `defaults` or `schema` option.
      
      		    @see `clear()` to reset all items.
      
      		    @param keys - The keys of the items to reset.
      		    */
      reset(...j) {
        for (const G of j)
          F(s(this, l, "f")[G]) && this.set(G, s(this, l, "f")[G]);
      }
      /**
      		    Delete an item.
      
      		    @param key - The key of the item to delete.
      		    */
      delete(j) {
        const { store: G } = this;
        s(this, o, "f").accessPropertiesByDotNotation ? u.delete(G, j) : delete G[j], this.store = G;
      }
      /**
      		    Delete all items.
      
      		    This resets known items to their default values, if defined by the `defaults` or `schema` option.
      		    */
      clear() {
        this.store = L();
        for (const j of Object.keys(s(this, l, "f")))
          this.reset(j);
      }
      /**
      		    Watches the given `key`, calling `callback` on any changes.
      
      		    @param key - The key wo watch.
      		    @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
      		    @returns A function, that when called, will unsubscribe.
      		    */
      onDidChange(j, G) {
        if (typeof j != "string")
          throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof j}`);
        if (typeof G != "function")
          throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof G}`);
        return this._handleChange(() => this.get(j), G);
      }
      /**
      		    Watches the whole config object, calling `callback` on any changes.
      
      		    @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
      		    @returns A function, that when called, will unsubscribe.
      		    */
      onDidAnyChange(j) {
        if (typeof j != "function")
          throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof j}`);
        return this._handleChange(() => this.store, j);
      }
      get size() {
        return Object.keys(this.store).length;
      }
      get store() {
        try {
          const j = g.readFileSync(this.path, s(this, a, "f") ? null : "utf8"), G = this._encryptData(j), D = this._deserialize(G);
          return this._validate(D), Object.assign(L(), D);
        } catch (j) {
          if (j?.code === "ENOENT")
            return this._ensureDirectory(), L();
          if (s(this, o, "f").clearInvalidConfig && j.name === "SyntaxError")
            return L();
          throw j;
        }
      }
      set store(j) {
        this._ensureDirectory(), this._validate(j), this._write(j), this.events.emit("change");
      }
      *[(r = /* @__PURE__ */ new WeakMap(), a = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), Symbol.iterator)]() {
        for (const [j, G] of Object.entries(this.store))
          yield [j, G];
      }
      _encryptData(j) {
        if (!s(this, a, "f"))
          return j.toString();
        try {
          if (s(this, a, "f"))
            try {
              if (j.slice(16, 17).toString() === ":") {
                const G = j.slice(0, 16), D = _.pbkdf2Sync(s(this, a, "f"), G.toString(), 1e4, 32, "sha512"), O = _.createDecipheriv(N, D, G);
                j = Buffer.concat([O.update(Buffer.from(j.slice(17))), O.final()]).toString("utf8");
              } else {
                const G = _.createDecipher(N, s(this, a, "f"));
                j = Buffer.concat([G.update(Buffer.from(j)), G.final()]).toString("utf8");
              }
            } catch {
            }
        } catch {
        }
        return j.toString();
      }
      _handleChange(j, G) {
        let D = j();
        const O = () => {
          const k = D, T = j();
          (0, c.isDeepStrictEqual)(T, k) || (D = T, G.call(this, T, k));
        };
        return this.events.on("change", O), () => this.events.removeListener("change", O);
      }
      _validate(j) {
        if (!s(this, r, "f") || s(this, r, "f").call(this, j) || !s(this, r, "f").errors)
          return;
        const D = s(this, r, "f").errors.map(({ instancePath: O, message: k = "" }) => `\`${O.slice(1)}\` ${k}`);
        throw new Error("Config schema violation: " + D.join("; "));
      }
      _ensureDirectory() {
        g.mkdirSync(E.dirname(this.path), { recursive: !0 });
      }
      _write(j) {
        let G = this._serialize(j);
        if (s(this, a, "f")) {
          const D = _.randomBytes(16), O = _.pbkdf2Sync(s(this, a, "f"), D.toString(), 1e4, 32, "sha512"), k = _.createCipheriv(N, O, D);
          G = Buffer.concat([D, Buffer.from(":"), k.update(Buffer.from(G)), k.final()]);
        }
        if (process.env.SNAP)
          g.writeFileSync(this.path, G, { mode: s(this, o, "f").configFileMode });
        else
          try {
            m.writeFileSync(this.path, G, { mode: s(this, o, "f").configFileMode });
          } catch (D) {
            if (D?.code === "EXDEV") {
              g.writeFileSync(this.path, G, { mode: s(this, o, "f").configFileMode });
              return;
            }
            throw D;
          }
      }
      _watch() {
        this._ensureDirectory(), g.existsSync(this.path) || this._write(L()), process.platform === "win32" ? g.watch(this.path, { persistent: !1 }, y(() => {
          this.events.emit("change");
        }, { wait: 100 })) : g.watchFile(this.path, { persistent: !1 }, y(() => {
          this.events.emit("change");
        }, { wait: 5e3 }));
      }
      _migrate(j, G, D) {
        let O = this._get(z, "0.0.0");
        const k = Object.keys(j).filter((S) => this._shouldPerformMigration(S, O, G));
        let T = { ...this.store };
        for (const S of k)
          try {
            D && D(this, {
              fromVersion: O,
              toVersion: S,
              finalVersion: G,
              versions: k
            });
            const P = j[S];
            P(this), this._set(z, S), O = S, T = { ...this.store };
          } catch (P) {
            throw this.store = T, new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${P}`);
          }
        (this._isVersionInRangeFormat(O) || !$.eq(O, G)) && this._set(z, G);
      }
      _containsReservedKey(j) {
        return typeof j == "object" && Object.keys(j)[0] === U ? !0 : typeof j != "string" ? !1 : s(this, o, "f").accessPropertiesByDotNotation ? !!j.startsWith(`${U}.`) : !1;
      }
      _isVersionInRangeFormat(j) {
        return $.clean(j) === null;
      }
      _shouldPerformMigration(j, G, D) {
        return this._isVersionInRangeFormat(j) ? G !== "0.0.0" && $.satisfies(G, j) ? !1 : $.satisfies(D, j) : !($.lte(j, G) || $.gt(j, D));
      }
      _get(j, G) {
        return u.get(this.store, j, G);
      }
      _set(j, G) {
        const { store: D } = this;
        u.set(D, j, G), this.store = D;
      }
    }
    t.default = J, e.exports = J, e.exports.default = J;
  }($t, $t.exports)), $t.exports;
}
var Di, kl;
function up() {
  if (kl) return Di;
  kl = 1;
  const e = me, { app: t, ipcMain: f, ipcRenderer: s, shell: d } = Pf, i = cp();
  let r = !1;
  const a = () => {
    if (!f || !t)
      throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
    const l = {
      defaultCwd: t.getPath("userData"),
      appVersion: t.getVersion()
    };
    return r || (f.on("electron-store-get-data", (c) => {
      c.returnValue = l;
    }), r = !0), l;
  };
  class o extends i {
    constructor(c) {
      let g, E;
      if (s) {
        const _ = s.sendSync("electron-store-get-data");
        if (!_)
          throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
        ({ defaultCwd: g, appVersion: E } = _);
      } else f && t && ({ defaultCwd: g, appVersion: E } = a());
      c = {
        name: "config",
        ...c
      }, c.projectVersion || (c.projectVersion = E), c.cwd ? c.cwd = e.isAbsolute(c.cwd) ? c.cwd : e.join(g, c.cwd) : c.cwd = g, c.configName = c.name, delete c.name, super(c);
    }
    static initRenderer() {
      a();
    }
    async openInEditor() {
      const c = await d.openPath(this.path);
      if (c)
        throw new Error(c);
    }
  }
  return Di = o, Di;
}
var lp = /* @__PURE__ */ up();
const ql = /* @__PURE__ */ nf(lp);
var rt = { exports: {} }, Ai, jl;
function wf() {
  return jl || (jl = 1, Ai = {
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
  }), Ai;
}
var Li = {}, Fl;
function co() {
  return Fl || (Fl = 1, function(e) {
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
    function f(s) {
      return function(...d) {
        return d.length && (s = s.replace(/\{(\d)\}/g, (i, r) => d[r] || "")), new Error("ADM-ZIP: " + s);
      };
    }
    for (const s of Object.keys(t))
      e[s] = f(t[s]);
  }(Li)), Li;
}
var ki, Ml;
function fp() {
  if (Ml) return ki;
  Ml = 1;
  const e = ct, t = me, f = wf(), s = co(), d = typeof process == "object" && process.platform === "win32", i = (o) => typeof o == "object" && o !== null, r = new Uint32Array(256).map((o, l) => {
    for (let c = 0; c < 8; c++)
      (l & 1) !== 0 ? l = 3988292384 ^ l >>> 1 : l >>>= 1;
    return l >>> 0;
  });
  function a(o) {
    this.sep = t.sep, this.fs = e, i(o) && i(o.fs) && typeof o.fs.statSync == "function" && (this.fs = o.fs);
  }
  return ki = a, a.prototype.makeDir = function(o) {
    const l = this;
    function c(g) {
      let E = g.split(l.sep)[0];
      g.split(l.sep).forEach(function(_) {
        if (!(!_ || _.substr(-1, 1) === ":")) {
          E += l.sep + _;
          var w;
          try {
            w = l.fs.statSync(E);
          } catch {
            l.fs.mkdirSync(E);
          }
          if (w && w.isFile()) throw s.FILE_IN_THE_WAY(`"${E}"`);
        }
      });
    }
    c(o);
  }, a.prototype.writeFileTo = function(o, l, c, g) {
    const E = this;
    if (E.fs.existsSync(o)) {
      if (!c) return !1;
      var _ = E.fs.statSync(o);
      if (_.isDirectory())
        return !1;
    }
    var w = t.dirname(o);
    E.fs.existsSync(w) || E.makeDir(w);
    var R;
    try {
      R = E.fs.openSync(o, "w", 438);
    } catch {
      E.fs.chmodSync(o, 438), R = E.fs.openSync(o, "w", 438);
    }
    if (R)
      try {
        E.fs.writeSync(R, l, 0, l.length, 0);
      } finally {
        E.fs.closeSync(R);
      }
    return E.fs.chmodSync(o, g || 438), !0;
  }, a.prototype.writeFileToAsync = function(o, l, c, g, E) {
    typeof g == "function" && (E = g, g = void 0);
    const _ = this;
    _.fs.exists(o, function(w) {
      if (w && !c) return E(!1);
      _.fs.stat(o, function(R, u) {
        if (w && u.isDirectory())
          return E(!1);
        var h = t.dirname(o);
        _.fs.exists(h, function(n) {
          n || _.makeDir(h), _.fs.open(o, "w", 438, function(m, v) {
            m ? _.fs.chmod(o, 438, function() {
              _.fs.open(o, "w", 438, function(p, y) {
                _.fs.write(y, l, 0, l.length, 0, function() {
                  _.fs.close(y, function() {
                    _.fs.chmod(o, g || 438, function() {
                      E(!0);
                    });
                  });
                });
              });
            }) : v ? _.fs.write(v, l, 0, l.length, 0, function() {
              _.fs.close(v, function() {
                _.fs.chmod(o, g || 438, function() {
                  E(!0);
                });
              });
            }) : _.fs.chmod(o, g || 438, function() {
              E(!0);
            });
          });
        });
      });
    });
  }, a.prototype.findFiles = function(o) {
    const l = this;
    function c(g, E, _) {
      let w = [];
      return l.fs.readdirSync(g).forEach(function(R) {
        const u = t.join(g, R), h = l.fs.statSync(u);
        w.push(t.normalize(u) + (h.isDirectory() ? l.sep : "")), h.isDirectory() && _ && (w = w.concat(c(u, E, _)));
      }), w;
    }
    return c(o, void 0, !0);
  }, a.prototype.findFilesAsync = function(o, l) {
    const c = this;
    let g = [];
    c.fs.readdir(o, function(E, _) {
      if (E) return l(E);
      let w = _.length;
      if (!w) return l(null, g);
      _.forEach(function(R) {
        R = t.join(o, R), c.fs.stat(R, function(u, h) {
          if (u) return l(u);
          h && (g.push(t.normalize(R) + (h.isDirectory() ? c.sep : "")), h.isDirectory() ? c.findFilesAsync(R, function(n, m) {
            if (n) return l(n);
            g = g.concat(m), --w || l(null, g);
          }) : --w || l(null, g));
        });
      });
    });
  }, a.prototype.getAttributes = function() {
  }, a.prototype.setAttributes = function() {
  }, a.crc32update = function(o, l) {
    return r[(o ^ l) & 255] ^ o >>> 8;
  }, a.crc32 = function(o) {
    typeof o == "string" && (o = Buffer.from(o, "utf8"));
    let l = o.length, c = -1;
    for (let g = 0; g < l; ) c = a.crc32update(c, o[g++]);
    return ~c >>> 0;
  }, a.methodToString = function(o) {
    switch (o) {
      case f.STORED:
        return "STORED (" + o + ")";
      case f.DEFLATED:
        return "DEFLATED (" + o + ")";
      default:
        return "UNSUPPORTED (" + o + ")";
    }
  }, a.canonical = function(o) {
    if (!o) return "";
    const l = t.posix.normalize("/" + o.split("\\").join("/"));
    return t.join(".", l);
  }, a.zipnamefix = function(o) {
    if (!o) return "";
    const l = t.posix.normalize("/" + o.split("\\").join("/"));
    return t.posix.join(".", l);
  }, a.findLast = function(o, l) {
    if (!Array.isArray(o)) throw new TypeError("arr is not array");
    const c = o.length >>> 0;
    for (let g = c - 1; g >= 0; g--)
      if (l(o[g], g, o))
        return o[g];
  }, a.sanitize = function(o, l) {
    o = t.resolve(t.normalize(o));
    for (var c = l.split("/"), g = 0, E = c.length; g < E; g++) {
      var _ = t.normalize(t.join(o, c.slice(g, E).join(t.sep)));
      if (_.indexOf(o) === 0)
        return _;
    }
    return t.normalize(t.join(o, t.basename(l)));
  }, a.toBuffer = function(l, c) {
    return Buffer.isBuffer(l) ? l : l instanceof Uint8Array ? Buffer.from(l) : typeof l == "string" ? c(l) : Buffer.alloc(0);
  }, a.readBigUInt64LE = function(o, l) {
    var c = Buffer.from(o.slice(l, l + 8));
    return c.swap64(), parseInt(`0x${c.toString("hex")}`);
  }, a.fromDOS2Date = function(o) {
    return new Date((o >> 25 & 127) + 1980, Math.max((o >> 21 & 15) - 1, 0), Math.max(o >> 16 & 31, 1), o >> 11 & 31, o >> 5 & 63, (o & 31) << 1);
  }, a.fromDate2DOS = function(o) {
    let l = 0, c = 0;
    return o.getFullYear() > 1979 && (l = (o.getFullYear() - 1980 & 127) << 9 | o.getMonth() + 1 << 5 | o.getDate(), c = o.getHours() << 11 | o.getMinutes() << 5 | o.getSeconds() >> 1), l << 16 | c;
  }, a.isWin = d, a.crcTable = r, ki;
}
var qi, Ul;
function dp() {
  if (Ul) return qi;
  Ul = 1;
  const e = me;
  return qi = function(t, { fs: f }) {
    var s = t || "", d = r(), i = null;
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
    return s && f.existsSync(s) ? (i = f.statSync(s), d.directory = i.isDirectory(), d.mtime = i.mtime, d.atime = i.atime, d.executable = (73 & i.mode) !== 0, d.readonly = (128 & i.mode) === 0, d.hidden = e.basename(s)[0] === ".") : console.warn("Invalid path: " + s), {
      get directory() {
        return d.directory;
      },
      get readOnly() {
        return d.readonly;
      },
      get hidden() {
        return d.hidden;
      },
      get mtime() {
        return d.mtime;
      },
      get atime() {
        return d.atime;
      },
      get executable() {
        return d.executable;
      },
      decodeAttributes: function() {
      },
      encodeAttributes: function() {
      },
      toJSON: function() {
        return {
          path: s,
          isDirectory: d.directory,
          isReadOnly: d.readonly,
          isHidden: d.hidden,
          isExecutable: d.executable,
          mTime: d.mtime,
          aTime: d.atime
        };
      },
      toString: function() {
        return JSON.stringify(this.toJSON(), null, "	");
      }
    };
  }, qi;
}
var ji, Vl;
function hp() {
  return Vl || (Vl = 1, ji = {
    efs: !0,
    encode: (e) => Buffer.from(e, "utf8"),
    decode: (e) => e.toString("utf8")
  }), ji;
}
var zl;
function bt() {
  return zl || (zl = 1, rt.exports = fp(), rt.exports.Constants = wf(), rt.exports.Errors = co(), rt.exports.FileAttr = dp(), rt.exports.decoder = hp()), rt.exports;
}
var vn = {}, Fi, Gl;
function mp() {
  if (Gl) return Fi;
  Gl = 1;
  var e = bt(), t = e.Constants;
  return Fi = function() {
    var f = 20, s = 10, d = 0, i = 0, r = 0, a = 0, o = 0, l = 0, c = 0, g = 0, E = 0, _ = 0, w = 0, R = 0, u = 0;
    f |= e.isWin ? 2560 : 768, d |= t.FLG_EFS;
    const h = {
      extraLen: 0
    }, n = (v) => Math.max(0, v) >>> 0, m = (v) => Math.max(0, v) & 255;
    return r = e.fromDate2DOS(/* @__PURE__ */ new Date()), {
      get made() {
        return f;
      },
      set made(v) {
        f = v;
      },
      get version() {
        return s;
      },
      set version(v) {
        s = v;
      },
      get flags() {
        return d;
      },
      set flags(v) {
        d = v;
      },
      get flags_efs() {
        return (d & t.FLG_EFS) > 0;
      },
      set flags_efs(v) {
        v ? d |= t.FLG_EFS : d &= ~t.FLG_EFS;
      },
      get flags_desc() {
        return (d & t.FLG_DESC) > 0;
      },
      set flags_desc(v) {
        v ? d |= t.FLG_DESC : d &= ~t.FLG_DESC;
      },
      get method() {
        return i;
      },
      set method(v) {
        switch (v) {
          case t.STORED:
            this.version = 10;
          case t.DEFLATED:
          default:
            this.version = 20;
        }
        i = v;
      },
      get time() {
        return e.fromDOS2Date(this.timeval);
      },
      set time(v) {
        this.timeval = e.fromDate2DOS(v);
      },
      get timeval() {
        return r;
      },
      set timeval(v) {
        r = n(v);
      },
      get timeHighByte() {
        return m(r >>> 8);
      },
      get crc() {
        return a;
      },
      set crc(v) {
        a = n(v);
      },
      get compressedSize() {
        return o;
      },
      set compressedSize(v) {
        o = n(v);
      },
      get size() {
        return l;
      },
      set size(v) {
        l = n(v);
      },
      get fileNameLength() {
        return c;
      },
      set fileNameLength(v) {
        c = v;
      },
      get extraLength() {
        return g;
      },
      set extraLength(v) {
        g = v;
      },
      get extraLocalLength() {
        return h.extraLen;
      },
      set extraLocalLength(v) {
        h.extraLen = v;
      },
      get commentLength() {
        return E;
      },
      set commentLength(v) {
        E = v;
      },
      get diskNumStart() {
        return _;
      },
      set diskNumStart(v) {
        _ = n(v);
      },
      get inAttr() {
        return w;
      },
      set inAttr(v) {
        w = n(v);
      },
      get attr() {
        return R;
      },
      set attr(v) {
        R = n(v);
      },
      // get Unix file permissions
      get fileAttr() {
        return (R || 0) >> 16 & 4095;
      },
      get offset() {
        return u;
      },
      set offset(v) {
        u = n(v);
      },
      get encrypted() {
        return (d & t.FLG_ENC) === t.FLG_ENC;
      },
      get centralHeaderSize() {
        return t.CENHDR + c + g + E;
      },
      get realDataOffset() {
        return u + t.LOCHDR + h.fnameLen + h.extraLen;
      },
      get localHeader() {
        return h;
      },
      loadLocalHeaderFromBinary: function(v) {
        var p = v.slice(u, u + t.LOCHDR);
        if (p.readUInt32LE(0) !== t.LOCSIG)
          throw e.Errors.INVALID_LOC();
        h.version = p.readUInt16LE(t.LOCVER), h.flags = p.readUInt16LE(t.LOCFLG), h.method = p.readUInt16LE(t.LOCHOW), h.time = p.readUInt32LE(t.LOCTIM), h.crc = p.readUInt32LE(t.LOCCRC), h.compressedSize = p.readUInt32LE(t.LOCSIZ), h.size = p.readUInt32LE(t.LOCLEN), h.fnameLen = p.readUInt16LE(t.LOCNAM), h.extraLen = p.readUInt16LE(t.LOCEXT);
        const y = u + t.LOCHDR + h.fnameLen, $ = y + h.extraLen;
        return v.slice(y, $);
      },
      loadFromBinary: function(v) {
        if (v.length !== t.CENHDR || v.readUInt32LE(0) !== t.CENSIG)
          throw e.Errors.INVALID_CEN();
        f = v.readUInt16LE(t.CENVEM), s = v.readUInt16LE(t.CENVER), d = v.readUInt16LE(t.CENFLG), i = v.readUInt16LE(t.CENHOW), r = v.readUInt32LE(t.CENTIM), a = v.readUInt32LE(t.CENCRC), o = v.readUInt32LE(t.CENSIZ), l = v.readUInt32LE(t.CENLEN), c = v.readUInt16LE(t.CENNAM), g = v.readUInt16LE(t.CENEXT), E = v.readUInt16LE(t.CENCOM), _ = v.readUInt16LE(t.CENDSK), w = v.readUInt16LE(t.CENATT), R = v.readUInt32LE(t.CENATX), u = v.readUInt32LE(t.CENOFF);
      },
      localHeaderToBinary: function() {
        var v = Buffer.alloc(t.LOCHDR);
        return v.writeUInt32LE(t.LOCSIG, 0), v.writeUInt16LE(s, t.LOCVER), v.writeUInt16LE(d, t.LOCFLG), v.writeUInt16LE(i, t.LOCHOW), v.writeUInt32LE(r, t.LOCTIM), v.writeUInt32LE(a, t.LOCCRC), v.writeUInt32LE(o, t.LOCSIZ), v.writeUInt32LE(l, t.LOCLEN), v.writeUInt16LE(c, t.LOCNAM), v.writeUInt16LE(h.extraLen, t.LOCEXT), v;
      },
      centralHeaderToBinary: function() {
        var v = Buffer.alloc(t.CENHDR + c + g + E);
        return v.writeUInt32LE(t.CENSIG, 0), v.writeUInt16LE(f, t.CENVEM), v.writeUInt16LE(s, t.CENVER), v.writeUInt16LE(d, t.CENFLG), v.writeUInt16LE(i, t.CENHOW), v.writeUInt32LE(r, t.CENTIM), v.writeUInt32LE(a, t.CENCRC), v.writeUInt32LE(o, t.CENSIZ), v.writeUInt32LE(l, t.CENLEN), v.writeUInt16LE(c, t.CENNAM), v.writeUInt16LE(g, t.CENEXT), v.writeUInt16LE(E, t.CENCOM), v.writeUInt16LE(_, t.CENDSK), v.writeUInt16LE(w, t.CENATT), v.writeUInt32LE(R, t.CENATX), v.writeUInt32LE(u, t.CENOFF), v;
      },
      toJSON: function() {
        const v = function(p) {
          return p + " bytes";
        };
        return {
          made: f,
          version: s,
          flags: d,
          method: e.methodToString(i),
          time: this.time,
          crc: "0x" + a.toString(16).toUpperCase(),
          compressedSize: v(o),
          size: v(l),
          fileNameLength: v(c),
          extraLength: v(g),
          commentLength: v(E),
          diskNumStart: _,
          inAttr: w,
          attr: R,
          offset: u,
          centralHeaderSize: v(t.CENHDR + c + g + E)
        };
      },
      toString: function() {
        return JSON.stringify(this.toJSON(), null, "	");
      }
    };
  }, Fi;
}
var Mi, Kl;
function pp() {
  if (Kl) return Mi;
  Kl = 1;
  var e = bt(), t = e.Constants;
  return Mi = function() {
    var f = 0, s = 0, d = 0, i = 0, r = 0;
    return {
      get diskEntries() {
        return f;
      },
      set diskEntries(a) {
        f = s = a;
      },
      get totalEntries() {
        return s;
      },
      set totalEntries(a) {
        s = f = a;
      },
      get size() {
        return d;
      },
      set size(a) {
        d = a;
      },
      get offset() {
        return i;
      },
      set offset(a) {
        i = a;
      },
      get commentLength() {
        return r;
      },
      set commentLength(a) {
        r = a;
      },
      get mainHeaderSize() {
        return t.ENDHDR + r;
      },
      loadFromBinary: function(a) {
        if ((a.length !== t.ENDHDR || a.readUInt32LE(0) !== t.ENDSIG) && (a.length < t.ZIP64HDR || a.readUInt32LE(0) !== t.ZIP64SIG))
          throw e.Errors.INVALID_END();
        a.readUInt32LE(0) === t.ENDSIG ? (f = a.readUInt16LE(t.ENDSUB), s = a.readUInt16LE(t.ENDTOT), d = a.readUInt32LE(t.ENDSIZ), i = a.readUInt32LE(t.ENDOFF), r = a.readUInt16LE(t.ENDCOM)) : (f = e.readBigUInt64LE(a, t.ZIP64SUB), s = e.readBigUInt64LE(a, t.ZIP64TOT), d = e.readBigUInt64LE(a, t.ZIP64SIZE), i = e.readBigUInt64LE(a, t.ZIP64OFF), r = 0);
      },
      toBinary: function() {
        var a = Buffer.alloc(t.ENDHDR + r);
        return a.writeUInt32LE(t.ENDSIG, 0), a.writeUInt32LE(0, 4), a.writeUInt16LE(f, t.ENDSUB), a.writeUInt16LE(s, t.ENDTOT), a.writeUInt32LE(d, t.ENDSIZ), a.writeUInt32LE(i, t.ENDOFF), a.writeUInt16LE(r, t.ENDCOM), a.fill(" ", t.ENDHDR), a;
      },
      toJSON: function() {
        const a = function(o, l) {
          let c = o.toString(16).toUpperCase();
          for (; c.length < l; ) c = "0" + c;
          return "0x" + c;
        };
        return {
          diskEntries: f,
          totalEntries: s,
          size: d + " bytes",
          offset: a(i, 4),
          commentLength: r
        };
      },
      toString: function() {
        return JSON.stringify(this.toJSON(), null, "	");
      }
    };
  }, Mi;
}
var Hl;
function Sf() {
  return Hl || (Hl = 1, vn.EntryHeader = mp(), vn.MainHeader = pp()), vn;
}
var gt = {}, Ui, xl;
function yp() {
  return xl || (xl = 1, Ui = function(e) {
    var t = rf, f = { chunkSize: (parseInt(e.length / 1024) + 1) * 1024 };
    return {
      deflate: function() {
        return t.deflateRawSync(e, f);
      },
      deflateAsync: function(s) {
        var d = t.createDeflateRaw(f), i = [], r = 0;
        d.on("data", function(a) {
          i.push(a), r += a.length;
        }), d.on("end", function() {
          var a = Buffer.alloc(r), o = 0;
          a.fill(0);
          for (var l = 0; l < i.length; l++) {
            var c = i[l];
            c.copy(a, o), o += c.length;
          }
          s && s(a);
        }), d.end(e);
      }
    };
  }), Ui;
}
var Vi, Bl;
function vp() {
  if (Bl) return Vi;
  Bl = 1;
  const e = +(process.versions ? process.versions.node : "").split(".")[0] || 0;
  return Vi = function(t, f) {
    var s = rf;
    const d = e >= 15 && f > 0 ? { maxOutputLength: f } : {};
    return {
      inflate: function() {
        return s.inflateRawSync(t, d);
      },
      inflateAsync: function(i) {
        var r = s.createInflateRaw(d), a = [], o = 0;
        r.on("data", function(l) {
          a.push(l), o += l.length;
        }), r.on("end", function() {
          var l = Buffer.alloc(o), c = 0;
          l.fill(0);
          for (var g = 0; g < a.length; g++) {
            var E = a[g];
            E.copy(l, c), c += E.length;
          }
          i && i(l);
        }), r.end(t);
      }
    };
  }, Vi;
}
var zi, Wl;
function _p() {
  if (Wl) return zi;
  Wl = 1;
  const { randomFillSync: e } = tf, t = co(), f = new Uint32Array(256).map((_, w) => {
    for (let R = 0; R < 8; R++)
      (w & 1) !== 0 ? w = w >>> 1 ^ 3988292384 : w >>>= 1;
    return w >>> 0;
  }), s = (_, w) => Math.imul(_, w) >>> 0, d = (_, w) => f[(_ ^ w) & 255] ^ _ >>> 8, i = () => typeof e == "function" ? e(Buffer.alloc(12)) : i.node();
  i.node = () => {
    const _ = Buffer.alloc(12), w = _.length;
    for (let R = 0; R < w; R++) _[R] = Math.random() * 256 & 255;
    return _;
  };
  const r = {
    genSalt: i
  };
  function a(_) {
    const w = Buffer.isBuffer(_) ? _ : Buffer.from(_);
    this.keys = new Uint32Array([305419896, 591751049, 878082192]);
    for (let R = 0; R < w.length; R++)
      this.updateKeys(w[R]);
  }
  a.prototype.updateKeys = function(_) {
    const w = this.keys;
    return w[0] = d(w[0], _), w[1] += w[0] & 255, w[1] = s(w[1], 134775813) + 1, w[2] = d(w[2], w[1] >>> 24), _;
  }, a.prototype.next = function() {
    const _ = (this.keys[2] | 2) >>> 0;
    return s(_, _ ^ 1) >> 8 & 255;
  };
  function o(_) {
    const w = new a(_);
    return function(R) {
      const u = Buffer.alloc(R.length);
      let h = 0;
      for (let n of R)
        u[h++] = w.updateKeys(n ^ w.next());
      return u;
    };
  }
  function l(_) {
    const w = new a(_);
    return function(R, u, h = 0) {
      u || (u = Buffer.alloc(R.length));
      for (let n of R) {
        const m = w.next();
        u[h++] = n ^ m, w.updateKeys(n);
      }
      return u;
    };
  }
  function c(_, w, R) {
    if (!_ || !Buffer.isBuffer(_) || _.length < 12)
      return Buffer.alloc(0);
    const u = o(R), h = u(_.slice(0, 12)), n = (w.flags & 8) === 8 ? w.timeHighByte : w.crc >>> 24;
    if (h[11] !== n)
      throw t.WRONG_PASSWORD();
    return u(_.slice(12));
  }
  function g(_) {
    Buffer.isBuffer(_) && _.length >= 12 ? r.genSalt = function() {
      return _.slice(0, 12);
    } : _ === "node" ? r.genSalt = i.node : r.genSalt = i;
  }
  function E(_, w, R, u = !1) {
    _ == null && (_ = Buffer.alloc(0)), Buffer.isBuffer(_) || (_ = Buffer.from(_.toString()));
    const h = l(R), n = r.genSalt();
    n[11] = w.crc >>> 24 & 255, u && (n[10] = w.crc >>> 16 & 255);
    const m = Buffer.alloc(_.length + 12);
    return h(n, m), h(_, m, 12);
  }
  return zi = { decrypt: c, encrypt: E, _salter: g }, zi;
}
var Jl;
function gp() {
  return Jl || (Jl = 1, gt.Deflater = yp(), gt.Inflater = vp(), gt.ZipCrypto = _p()), gt;
}
var Gi, Zl;
function Rf() {
  if (Zl) return Gi;
  Zl = 1;
  var e = bt(), t = Sf(), f = e.Constants, s = gp();
  return Gi = function(d, i) {
    var r = new t.EntryHeader(), a = Buffer.alloc(0), o = Buffer.alloc(0), l = !1, c = null, g = Buffer.alloc(0), E = Buffer.alloc(0), _ = !0;
    const w = d, R = typeof w.decoder == "object" ? w.decoder : e.decoder;
    _ = R.hasOwnProperty("efs") ? R.efs : !1;
    function u() {
      return !i || !(i instanceof Uint8Array) ? Buffer.alloc(0) : (E = r.loadLocalHeaderFromBinary(i), i.slice(r.realDataOffset, r.realDataOffset + r.compressedSize));
    }
    function h($) {
      if (r.flags_desc) {
        const b = {}, N = r.realDataOffset + r.compressedSize;
        if (i.readUInt32LE(N) == f.LOCSIG || i.readUInt32LE(N) == f.CENSIG)
          throw e.Errors.DESCRIPTOR_NOT_EXIST();
        if (i.readUInt32LE(N) == f.EXTSIG)
          b.crc = i.readUInt32LE(N + f.EXTCRC), b.compressedSize = i.readUInt32LE(N + f.EXTSIZ), b.size = i.readUInt32LE(N + f.EXTLEN);
        else if (i.readUInt16LE(N + 12) === 19280)
          b.crc = i.readUInt32LE(N + f.EXTCRC - 4), b.compressedSize = i.readUInt32LE(N + f.EXTSIZ - 4), b.size = i.readUInt32LE(N + f.EXTLEN - 4);
        else
          throw e.Errors.DESCRIPTOR_UNKNOWN();
        if (b.compressedSize !== r.compressedSize || b.size !== r.size || b.crc !== r.crc)
          throw e.Errors.DESCRIPTOR_FAULTY();
        if (e.crc32($) !== b.crc)
          return !1;
      } else if (e.crc32($) !== r.localHeader.crc)
        return !1;
      return !0;
    }
    function n($, b, N) {
      if (typeof b > "u" && typeof $ == "string" && (N = $, $ = void 0), l)
        return $ && b && b(Buffer.alloc(0), e.Errors.DIRECTORY_CONTENT_ERROR()), Buffer.alloc(0);
      var L = u();
      if (L.length === 0)
        return $ && b && b(L), L;
      if (r.encrypted) {
        if (typeof N != "string" && !Buffer.isBuffer(N))
          throw e.Errors.INVALID_PASS_PARAM();
        L = s.ZipCrypto.decrypt(L, r, N);
      }
      var F = Buffer.alloc(r.size);
      switch (r.method) {
        case e.Constants.STORED:
          if (L.copy(F), h(F))
            return $ && b && b(F), F;
          throw $ && b && b(F, e.Errors.BAD_CRC()), e.Errors.BAD_CRC();
        case e.Constants.DEFLATED:
          var H = new s.Inflater(L, r.size);
          if ($)
            H.inflateAsync(function(M) {
              M.copy(M, 0), b && (h(M) ? b(M) : b(M, e.Errors.BAD_CRC()));
            });
          else {
            if (H.inflate(F).copy(F, 0), !h(F))
              throw e.Errors.BAD_CRC(`"${R.decode(a)}"`);
            return F;
          }
          break;
        default:
          throw $ && b && b(Buffer.alloc(0), e.Errors.UNKNOWN_METHOD()), e.Errors.UNKNOWN_METHOD();
      }
    }
    function m($, b) {
      if ((!c || !c.length) && Buffer.isBuffer(i))
        return $ && b && b(u()), u();
      if (c.length && !l) {
        var N;
        switch (r.method) {
          case e.Constants.STORED:
            return r.compressedSize = r.size, N = Buffer.alloc(c.length), c.copy(N), $ && b && b(N), N;
          default:
          case e.Constants.DEFLATED:
            var L = new s.Deflater(c);
            if ($)
              L.deflateAsync(function(H) {
                N = Buffer.alloc(H.length), r.compressedSize = H.length, H.copy(N), b && b(N);
              });
            else {
              var F = L.deflate();
              return r.compressedSize = F.length, F;
            }
            L = null;
            break;
        }
      } else if ($ && b)
        b(Buffer.alloc(0));
      else
        return Buffer.alloc(0);
    }
    function v($, b) {
      return ($.readUInt32LE(b + 4) << 4) + $.readUInt32LE(b);
    }
    function p($) {
      try {
        for (var b = 0, N, L, F; b + 4 < $.length; )
          N = $.readUInt16LE(b), b += 2, L = $.readUInt16LE(b), b += 2, F = $.slice(b, b + L), b += L, f.ID_ZIP64 === N && y(F);
      } catch {
        throw e.Errors.EXTRA_FIELD_PARSE_ERROR();
      }
    }
    function y($) {
      var b, N, L, F;
      $.length >= f.EF_ZIP64_SCOMP && (b = v($, f.EF_ZIP64_SUNCOMP), r.size === f.EF_ZIP64_OR_32 && (r.size = b)), $.length >= f.EF_ZIP64_RHO && (N = v($, f.EF_ZIP64_SCOMP), r.compressedSize === f.EF_ZIP64_OR_32 && (r.compressedSize = N)), $.length >= f.EF_ZIP64_DSN && (L = v($, f.EF_ZIP64_RHO), r.offset === f.EF_ZIP64_OR_32 && (r.offset = L)), $.length >= f.EF_ZIP64_DSN + 4 && (F = $.readUInt32LE(f.EF_ZIP64_DSN), r.diskNumStart === f.EF_ZIP64_OR_16 && (r.diskNumStart = F));
    }
    return {
      get entryName() {
        return R.decode(a);
      },
      get rawEntryName() {
        return a;
      },
      set entryName($) {
        a = e.toBuffer($, R.encode);
        var b = a[a.length - 1];
        l = b === 47 || b === 92, r.fileNameLength = a.length;
      },
      get efs() {
        return typeof _ == "function" ? _(this.entryName) : _;
      },
      get extra() {
        return g;
      },
      set extra($) {
        g = $, r.extraLength = $.length, p($);
      },
      get comment() {
        return R.decode(o);
      },
      set comment($) {
        if (o = e.toBuffer($, R.encode), r.commentLength = o.length, o.length > 65535) throw e.Errors.COMMENT_TOO_LONG();
      },
      get name() {
        var $ = R.decode(a);
        return l ? $.substr($.length - 1).split("/").pop() : $.split("/").pop();
      },
      get isDirectory() {
        return l;
      },
      getCompressedData: function() {
        return m(!1, null);
      },
      getCompressedDataAsync: function($) {
        m(!0, $);
      },
      setData: function($) {
        c = e.toBuffer($, e.decoder.encode), !l && c.length ? (r.size = c.length, r.method = e.Constants.DEFLATED, r.crc = e.crc32($), r.changed = !0) : r.method = e.Constants.STORED;
      },
      getData: function($) {
        return r.changed ? c : n(!1, null, $);
      },
      getDataAsync: function($, b) {
        r.changed ? $(c) : n(!0, $, b);
      },
      set attr($) {
        r.attr = $;
      },
      get attr() {
        return r.attr;
      },
      set header($) {
        r.loadFromBinary($);
      },
      get header() {
        return r;
      },
      packCentralHeader: function() {
        r.flags_efs = this.efs, r.extraLength = g.length;
        var $ = r.centralHeaderToBinary(), b = e.Constants.CENHDR;
        return a.copy($, b), b += a.length, g.copy($, b), b += r.extraLength, o.copy($, b), $;
      },
      packLocalHeader: function() {
        let $ = 0;
        r.flags_efs = this.efs, r.extraLocalLength = E.length;
        const b = r.localHeaderToBinary(), N = Buffer.alloc(b.length + a.length + r.extraLocalLength);
        return b.copy(N, $), $ += b.length, a.copy(N, $), $ += a.length, E.copy(N, $), $ += E.length, N;
      },
      toJSON: function() {
        const $ = function(b) {
          return "<" + (b && b.length + " bytes buffer" || "null") + ">";
        };
        return {
          entryName: this.entryName,
          name: this.name,
          comment: this.comment,
          isDirectory: this.isDirectory,
          header: r.toJSON(),
          compressedData: $(i),
          data: $(c)
        };
      },
      toString: function() {
        return JSON.stringify(this.toJSON(), null, "	");
      }
    };
  }, Gi;
}
var Ki, Xl;
function $p() {
  if (Xl) return Ki;
  Xl = 1;
  const e = Rf(), t = Sf(), f = bt();
  return Ki = function(s, d) {
    var i = [], r = {}, a = Buffer.alloc(0), o = new t.MainHeader(), l = !1;
    const c = /* @__PURE__ */ new Set(), g = d, { noSort: E, decoder: _ } = g;
    s ? u(g.readEntries) : l = !0;
    function w() {
      const n = /* @__PURE__ */ new Set();
      for (const m of Object.keys(r)) {
        const v = m.split("/");
        if (v.pop(), !!v.length)
          for (let p = 0; p < v.length; p++) {
            const y = v.slice(0, p + 1).join("/") + "/";
            n.add(y);
          }
      }
      for (const m of n)
        if (!(m in r)) {
          const v = new e(g);
          v.entryName = m, v.attr = 16, v.temporary = !0, i.push(v), r[v.entryName] = v, c.add(v);
        }
    }
    function R() {
      if (l = !0, r = {}, o.diskEntries > (s.length - o.offset) / f.Constants.CENHDR)
        throw f.Errors.DISK_ENTRY_TOO_LARGE();
      i = new Array(o.diskEntries);
      for (var n = o.offset, m = 0; m < i.length; m++) {
        var v = n, p = new e(g, s);
        p.header = s.slice(v, v += f.Constants.CENHDR), p.entryName = s.slice(v, v += p.header.fileNameLength), p.header.extraLength && (p.extra = s.slice(v, v += p.header.extraLength)), p.header.commentLength && (p.comment = s.slice(v, v + p.header.commentLength)), n += p.header.centralHeaderSize, i[m] = p, r[p.entryName] = p;
      }
      c.clear(), w();
    }
    function u(n) {
      var m = s.length - f.Constants.ENDHDR, v = Math.max(0, m - 65535), p = v, y = s.length, $ = -1, b = 0;
      for ((typeof g.trailingSpace == "boolean" ? g.trailingSpace : !1) && (v = 0), m; m >= p; m--)
        if (s[m] === 80) {
          if (s.readUInt32LE(m) === f.Constants.ENDSIG) {
            $ = m, b = m, y = m + f.Constants.ENDHDR, p = m - f.Constants.END64HDR;
            continue;
          }
          if (s.readUInt32LE(m) === f.Constants.END64SIG) {
            p = v;
            continue;
          }
          if (s.readUInt32LE(m) === f.Constants.ZIP64SIG) {
            $ = m, y = m + f.readBigUInt64LE(s, m + f.Constants.ZIP64SIZE) + f.Constants.ZIP64LEAD;
            break;
          }
        }
      if ($ == -1) throw f.Errors.INVALID_FORMAT();
      o.loadFromBinary(s.slice($, y)), o.commentLength && (a = s.slice(b + f.Constants.ENDHDR)), n && R();
    }
    function h() {
      i.length > 1 && !E && i.sort((n, m) => n.entryName.toLowerCase().localeCompare(m.entryName.toLowerCase()));
    }
    return {
      /**
       * Returns an array of ZipEntry objects existent in the current opened archive
       * @return Array
       */
      get entries() {
        return l || R(), i.filter((n) => !c.has(n));
      },
      /**
       * Archive comment
       * @return {String}
       */
      get comment() {
        return _.decode(a);
      },
      set comment(n) {
        a = f.toBuffer(n, _.encode), o.commentLength = a.length;
      },
      getEntryCount: function() {
        return l ? i.length : o.diskEntries;
      },
      forEach: function(n) {
        this.entries.forEach(n);
      },
      /**
       * Returns a reference to the entry with the given name or null if entry is inexistent
       *
       * @param entryName
       * @return ZipEntry
       */
      getEntry: function(n) {
        return l || R(), r[n] || null;
      },
      /**
       * Adds the given entry to the entry list
       *
       * @param entry
       */
      setEntry: function(n) {
        l || R(), i.push(n), r[n.entryName] = n, o.totalEntries = i.length;
      },
      /**
       * Removes the file with the given name from the entry list.
       *
       * If the entry is a directory, then all nested files and directories will be removed
       * @param entryName
       * @returns {void}
       */
      deleteFile: function(n, m = !0) {
        l || R();
        const v = r[n];
        this.getEntryChildren(v, m).map((y) => y.entryName).forEach(this.deleteEntry);
      },
      /**
       * Removes the entry with the given name from the entry list.
       *
       * @param {string} entryName
       * @returns {void}
       */
      deleteEntry: function(n) {
        l || R();
        const m = r[n], v = i.indexOf(m);
        v >= 0 && (i.splice(v, 1), delete r[n], o.totalEntries = i.length);
      },
      /**
       *  Iterates and returns all nested files and directories of the given entry
       *
       * @param entry
       * @return Array
       */
      getEntryChildren: function(n, m = !0) {
        if (l || R(), typeof n == "object")
          if (n.isDirectory && m) {
            const v = [], p = n.entryName;
            for (const y of i)
              y.entryName.startsWith(p) && v.push(y);
            return v;
          } else
            return [n];
        return [];
      },
      /**
       *  How many child elements entry has
       *
       * @param {ZipEntry} entry
       * @return {integer}
       */
      getChildCount: function(n) {
        if (n && n.isDirectory) {
          const m = this.getEntryChildren(n);
          return m.includes(n) ? m.length - 1 : m.length;
        }
        return 0;
      },
      /**
       * Returns the zip file
       *
       * @return Buffer
       */
      compressToBuffer: function() {
        l || R(), h();
        const n = [], m = [];
        let v = 0, p = 0;
        o.size = 0, o.offset = 0;
        let y = 0;
        for (const N of this.entries) {
          const L = N.getCompressedData();
          N.header.offset = p;
          const F = N.packLocalHeader(), H = F.length + L.length;
          p += H, n.push(F), n.push(L);
          const M = N.packCentralHeader();
          m.push(M), o.size += M.length, v += H + M.length, y++;
        }
        v += o.mainHeaderSize, o.offset = p, o.totalEntries = y, p = 0;
        const $ = Buffer.alloc(v);
        for (const N of n)
          N.copy($, p), p += N.length;
        for (const N of m)
          N.copy($, p), p += N.length;
        const b = o.toBinary();
        return a && a.copy(b, f.Constants.ENDHDR), b.copy($, p), s = $, l = !1, $;
      },
      toAsyncBuffer: function(n, m, v, p) {
        try {
          l || R(), h();
          const y = [], $ = [];
          let b = 0, N = 0, L = 0;
          o.size = 0, o.offset = 0;
          const F = function(H) {
            if (H.length > 0) {
              const M = H.shift(), U = M.entryName + M.extra.toString();
              v && v(U), M.getCompressedDataAsync(function(z) {
                p && p(U), M.header.offset = N;
                const J = M.packLocalHeader(), W = J.length + z.length;
                N += W, y.push(J), y.push(z);
                const j = M.packCentralHeader();
                $.push(j), o.size += j.length, b += W + j.length, L++, F(H);
              });
            } else {
              b += o.mainHeaderSize, o.offset = N, o.totalEntries = L, N = 0;
              const M = Buffer.alloc(b);
              y.forEach(function(z) {
                z.copy(M, N), N += z.length;
              }), $.forEach(function(z) {
                z.copy(M, N), N += z.length;
              });
              const U = o.toBinary();
              a && a.copy(U, f.Constants.ENDHDR), U.copy(M, N), s = M, l = !1, n(M);
            }
          };
          F(Array.from(this.entries));
        } catch (y) {
          m(y);
        }
      }
    };
  }, Ki;
}
var Hi, Yl;
function Ep() {
  if (Yl) return Hi;
  Yl = 1;
  const e = bt(), t = me, f = Rf(), s = $p(), d = (...o) => e.findLast(o, (l) => typeof l == "boolean"), i = (...o) => e.findLast(o, (l) => typeof l == "string"), r = (...o) => e.findLast(o, (l) => typeof l == "function"), a = {
    // option "noSort" : if true it disables files sorting
    noSort: !1,
    // read entries during load (initial loading may be slower)
    readEntries: !1,
    // default method is none
    method: e.Constants.NONE,
    // file system
    fs: null
  };
  return Hi = function(o, l) {
    let c = null;
    const g = Object.assign(/* @__PURE__ */ Object.create(null), a);
    o && typeof o == "object" && (o instanceof Uint8Array || (Object.assign(g, o), o = g.input ? g.input : void 0, g.input && delete g.input), Buffer.isBuffer(o) && (c = o, g.method = e.Constants.BUFFER, o = void 0)), Object.assign(g, l);
    const E = new e(g);
    if ((typeof g.decoder != "object" || typeof g.decoder.encode != "function" || typeof g.decoder.decode != "function") && (g.decoder = e.decoder), o && typeof o == "string")
      if (E.fs.existsSync(o))
        g.method = e.Constants.FILE, g.filename = o, c = E.fs.readFileSync(o);
      else
        throw e.Errors.INVALID_FILENAME();
    const _ = new s(c, g), { canonical: w, sanitize: R, zipnamefix: u } = e;
    function h(p) {
      if (p && _) {
        var y;
        if (typeof p == "string" && (y = _.getEntry(t.posix.normalize(p))), typeof p == "object" && typeof p.entryName < "u" && typeof p.header < "u" && (y = _.getEntry(p.entryName)), y)
          return y;
      }
      return null;
    }
    function n(p) {
      const { join: y, normalize: $, sep: b } = t.posix;
      return y(".", $(b + p.split("\\").join(b) + b));
    }
    function m(p) {
      return p instanceof RegExp ? /* @__PURE__ */ function(y) {
        return function($) {
          return y.test($);
        };
      }(p) : typeof p != "function" ? () => !0 : p;
    }
    const v = (p, y) => {
      let $ = y.slice(-1);
      return $ = $ === E.sep ? E.sep : "", t.relative(p, y) + $;
    };
    return {
      /**
       * Extracts the given entry from the archive and returns the content as a Buffer object
       * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
       * @param {Buffer|string} [pass] - password
       * @return Buffer or Null in case of error
       */
      readFile: function(p, y) {
        var $ = h(p);
        return $ && $.getData(y) || null;
      },
      /**
       * Returns how many child elements has on entry (directories) on files it is always 0
       * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
       * @returns {integer}
       */
      childCount: function(p) {
        const y = h(p);
        if (y)
          return _.getChildCount(y);
      },
      /**
       * Asynchronous readFile
       * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
       * @param {callback} callback
       *
       * @return Buffer or Null in case of error
       */
      readFileAsync: function(p, y) {
        var $ = h(p);
        $ ? $.getDataAsync(y) : y(null, "getEntry failed for:" + p);
      },
      /**
       * Extracts the given entry from the archive and returns the content as plain text in the given encoding
       * @param {ZipEntry|string} entry - ZipEntry object or String with the full path of the entry
       * @param {string} encoding - Optional. If no encoding is specified utf8 is used
       *
       * @return String
       */
      readAsText: function(p, y) {
        var $ = h(p);
        if ($) {
          var b = $.getData();
          if (b && b.length)
            return b.toString(y || "utf8");
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
      readAsTextAsync: function(p, y, $) {
        var b = h(p);
        b ? b.getDataAsync(function(N, L) {
          if (L) {
            y(N, L);
            return;
          }
          N && N.length ? y(N.toString($ || "utf8")) : y("");
        }) : y("");
      },
      /**
       * Remove the entry from the file or the entry and all it's nested directories and files if the given entry is a directory
       *
       * @param {ZipEntry|string} entry
       * @returns {void}
       */
      deleteFile: function(p, y = !0) {
        var $ = h(p);
        $ && _.deleteFile($.entryName, y);
      },
      /**
       * Remove the entry from the file or directory without affecting any nested entries
       *
       * @param {ZipEntry|string} entry
       * @returns {void}
       */
      deleteEntry: function(p) {
        var y = h(p);
        y && _.deleteEntry(y.entryName);
      },
      /**
       * Adds a comment to the zip. The zip must be rewritten after adding the comment.
       *
       * @param {string} comment
       */
      addZipComment: function(p) {
        _.comment = p;
      },
      /**
       * Returns the zip comment
       *
       * @return String
       */
      getZipComment: function() {
        return _.comment || "";
      },
      /**
       * Adds a comment to a specified zipEntry. The zip must be rewritten after adding the comment
       * The comment cannot exceed 65535 characters in length
       *
       * @param {ZipEntry} entry
       * @param {string} comment
       */
      addZipEntryComment: function(p, y) {
        var $ = h(p);
        $ && ($.comment = y);
      },
      /**
       * Returns the comment of the specified entry
       *
       * @param {ZipEntry} entry
       * @return String
       */
      getZipEntryComment: function(p) {
        var y = h(p);
        return y && y.comment || "";
      },
      /**
       * Updates the content of an existing entry inside the archive. The zip must be rewritten after updating the content
       *
       * @param {ZipEntry} entry
       * @param {Buffer} content
       */
      updateFile: function(p, y) {
        var $ = h(p);
        $ && $.setData(y);
      },
      /**
       * Adds a file from the disk to the archive
       *
       * @param {string} localPath File to add to zip
       * @param {string} [zipPath] Optional path inside the zip
       * @param {string} [zipName] Optional name for the file
       * @param {string} [comment] Optional file comment
       */
      addLocalFile: function(p, y, $, b) {
        if (E.fs.existsSync(p)) {
          y = y ? n(y) : "";
          const N = t.win32.basename(t.win32.normalize(p));
          y += $ || N;
          const L = E.fs.statSync(p), F = L.isFile() ? E.fs.readFileSync(p) : Buffer.alloc(0);
          L.isDirectory() && (y += E.sep), this.addFile(y, F, b, L);
        } else
          throw e.Errors.FILE_NOT_FOUND(p);
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
      addLocalFileAsync: function(p, y) {
        p = typeof p == "object" ? p : { localPath: p };
        const $ = t.resolve(p.localPath), { comment: b } = p;
        let { zipPath: N, zipName: L } = p;
        const F = this;
        E.fs.stat($, function(H, M) {
          if (H) return y(H, !1);
          N = N ? n(N) : "";
          const U = t.win32.basename(t.win32.normalize($));
          if (N += L || U, M.isFile())
            E.fs.readFile($, function(z, J) {
              return z ? y(z, !1) : (F.addFile(N, J, b, M), setImmediate(y, void 0, !0));
            });
          else if (M.isDirectory())
            return N += E.sep, F.addFile(N, Buffer.alloc(0), b, M), setImmediate(y, void 0, !0);
        });
      },
      /**
       * Adds a local directory and all its nested files and directories to the archive
       *
       * @param {string} localPath - local path to the folder
       * @param {string} [zipPath] - optional path inside zip
       * @param {(RegExp|function)} [filter] - optional RegExp or Function if files match will be included.
       */
      addLocalFolder: function(p, y, $) {
        if ($ = m($), y = y ? n(y) : "", p = t.normalize(p), E.fs.existsSync(p)) {
          const b = E.findFiles(p), N = this;
          if (b.length)
            for (const L of b) {
              const F = t.join(y, v(p, L));
              $(F) && N.addLocalFile(L, t.dirname(F));
            }
        } else
          throw e.Errors.FILE_NOT_FOUND(p);
      },
      /**
       * Asynchronous addLocalFolder
       * @param {string} localPath
       * @param {callback} callback
       * @param {string} [zipPath] optional path inside zip
       * @param {RegExp|function} [filter] optional RegExp or Function if files match will
       *               be included.
       */
      addLocalFolderAsync: function(p, y, $, b) {
        b = m(b), $ = $ ? n($) : "", p = t.normalize(p);
        var N = this;
        E.fs.open(p, "r", function(L) {
          if (L && L.code === "ENOENT")
            y(void 0, e.Errors.FILE_NOT_FOUND(p));
          else if (L)
            y(void 0, L);
          else {
            var F = E.findFiles(p), H = -1, M = function() {
              if (H += 1, H < F.length) {
                var U = F[H], z = v(p, U).split("\\").join("/");
                z = z.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, ""), b(z) ? E.fs.stat(U, function(J, W) {
                  J && y(void 0, J), W.isFile() ? E.fs.readFile(U, function(j, G) {
                    j ? y(void 0, j) : (N.addFile($ + z, G, "", W), M());
                  }) : (N.addFile($ + z + "/", Buffer.alloc(0), "", W), M());
                }) : process.nextTick(() => {
                  M();
                });
              } else
                y(!0, void 0);
            };
            M();
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
      addLocalFolderAsync2: function(p, y) {
        const $ = this;
        p = typeof p == "object" ? p : { localPath: p }, localPath = t.resolve(n(p.localPath));
        let { zipPath: b, filter: N, namefix: L } = p;
        N instanceof RegExp ? N = /* @__PURE__ */ function(M) {
          return function(U) {
            return M.test(U);
          };
        }(N) : typeof N != "function" && (N = function() {
          return !0;
        }), b = b ? n(b) : "", L == "latin1" && (L = (M) => M.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, "")), typeof L != "function" && (L = (M) => M);
        const F = (M) => t.join(b, L(v(localPath, M))), H = (M) => t.win32.basename(t.win32.normalize(L(M)));
        E.fs.open(localPath, "r", function(M) {
          M && M.code === "ENOENT" ? y(void 0, e.Errors.FILE_NOT_FOUND(localPath)) : M ? y(void 0, M) : E.findFilesAsync(localPath, function(U, z) {
            if (U) return y(U);
            z = z.filter((J) => N(F(J))), z.length || y(void 0, !1), setImmediate(
              z.reverse().reduce(function(J, W) {
                return function(j, G) {
                  if (j || G === !1) return setImmediate(J, j, !1);
                  $.addLocalFileAsync(
                    {
                      localPath: W,
                      zipPath: t.dirname(F(W)),
                      zipName: H(W)
                    },
                    J
                  );
                };
              }, y)
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
      addLocalFolderPromise: function(p, y) {
        return new Promise(($, b) => {
          this.addLocalFolderAsync2(Object.assign({ localPath: p }, y), (N, L) => {
            N && b(N), L && $(this);
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
      addFile: function(p, y, $, b) {
        p = u(p);
        let N = h(p);
        const L = N != null;
        L || (N = new f(g), N.entryName = p), N.comment = $ || "";
        const F = typeof b == "object" && b instanceof E.fs.Stats;
        F && (N.header.time = b.mtime);
        var H = N.isDirectory ? 16 : 0;
        let M = N.isDirectory ? 16384 : 32768;
        return F ? M |= 4095 & b.mode : typeof b == "number" ? M |= 4095 & b : M |= N.isDirectory ? 493 : 420, H = (H | M << 16) >>> 0, N.attr = H, N.setData(y), L || _.setEntry(N), N;
      },
      /**
       * Returns an array of ZipEntry objects representing the files and folders inside the archive
       *
       * @param {string} [password]
       * @returns Array
       */
      getEntries: function(p) {
        return _.password = p, _ ? _.entries : [];
      },
      /**
       * Returns a ZipEntry object representing the file or folder specified by ``name``.
       *
       * @param {string} name
       * @return ZipEntry
       */
      getEntry: function(p) {
        return h(p);
      },
      getEntryCount: function() {
        return _.getEntryCount();
      },
      forEach: function(p) {
        return _.forEach(p);
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
      extractEntryTo: function(p, y, $, b, N, L) {
        b = d(!1, b), N = d(!1, N), $ = d(!0, $), L = i(N, L);
        var F = h(p);
        if (!F)
          throw e.Errors.NO_ENTRY();
        var H = w(F.entryName), M = R(y, L && !F.isDirectory ? L : $ ? H : t.basename(H));
        if (F.isDirectory) {
          var U = _.getEntryChildren(F);
          return U.forEach(function(W) {
            if (W.isDirectory) return;
            var j = W.getData();
            if (!j)
              throw e.Errors.CANT_EXTRACT_FILE();
            var G = w(W.entryName), D = R(y, $ ? G : t.basename(G));
            const O = N ? W.header.fileAttr : void 0;
            E.writeFileTo(D, j, b, O);
          }), !0;
        }
        var z = F.getData(_.password);
        if (!z) throw e.Errors.CANT_EXTRACT_FILE();
        if (E.fs.existsSync(M) && !b)
          throw e.Errors.CANT_OVERRIDE();
        const J = N ? p.header.fileAttr : void 0;
        return E.writeFileTo(M, z, b, J), !0;
      },
      /**
       * Test the archive
       * @param {string} [pass]
       */
      test: function(p) {
        if (!_)
          return !1;
        for (var y in _.entries)
          try {
            if (y.isDirectory)
              continue;
            var $ = _.entries[y].getData(p);
            if (!$)
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
      extractAllTo: function(p, y, $, b) {
        if ($ = d(!1, $), b = i($, b), y = d(!1, y), !_) throw e.Errors.NO_ZIP();
        _.entries.forEach(function(N) {
          var L = R(p, w(N.entryName));
          if (N.isDirectory) {
            E.makeDir(L);
            return;
          }
          var F = N.getData(b);
          if (!F)
            throw e.Errors.CANT_EXTRACT_FILE();
          const H = $ ? N.header.fileAttr : void 0;
          E.writeFileTo(L, F, y, H);
          try {
            E.fs.utimesSync(L, N.header.time, N.header.time);
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
      extractAllToAsync: function(p, y, $, b) {
        if (b = r(y, $, b), $ = d(!1, $), y = d(!1, y), !b)
          return new Promise((M, U) => {
            this.extractAllToAsync(p, y, $, function(z) {
              z ? U(z) : M(this);
            });
          });
        if (!_) {
          b(e.Errors.NO_ZIP());
          return;
        }
        p = t.resolve(p);
        const N = (M) => R(p, t.normalize(w(M.entryName))), L = (M, U) => new Error(M + ': "' + U + '"'), F = [], H = [];
        _.entries.forEach((M) => {
          M.isDirectory ? F.push(M) : H.push(M);
        });
        for (const M of F) {
          const U = N(M), z = $ ? M.header.fileAttr : void 0;
          try {
            E.makeDir(U), z && E.fs.chmodSync(U, z), E.fs.utimesSync(U, M.header.time, M.header.time);
          } catch {
            b(L("Unable to create folder", U));
          }
        }
        H.reverse().reduce(function(M, U) {
          return function(z) {
            if (z)
              M(z);
            else {
              const J = t.normalize(w(U.entryName)), W = R(p, J);
              U.getDataAsync(function(j, G) {
                if (G)
                  M(G);
                else if (!j)
                  M(e.Errors.CANT_EXTRACT_FILE());
                else {
                  const D = $ ? U.header.fileAttr : void 0;
                  E.writeFileToAsync(W, j, y, D, function(O) {
                    O || M(L("Unable to write file", W)), E.fs.utimes(W, U.header.time, U.header.time, function(k) {
                      k ? M(L("Unable to set times", W)) : M();
                    });
                  });
                }
              });
            }
          };
        }, b)();
      },
      /**
       * Writes the newly created zip file to disk at the specified location or if a zip was opened and no ``targetFileName`` is provided, it will overwrite the opened zip
       *
       * @param {string} targetFileName
       * @param {function} callback
       */
      writeZip: function(p, y) {
        if (arguments.length === 1 && typeof p == "function" && (y = p, p = ""), !p && g.filename && (p = g.filename), !!p) {
          var $ = _.compressToBuffer();
          if ($) {
            var b = E.writeFileTo(p, $, !0);
            typeof y == "function" && y(b ? null : new Error("failed"), "");
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
      writeZipPromise: function(p, y) {
        const { overwrite: $, perm: b } = Object.assign({ overwrite: !0 }, y);
        return new Promise((N, L) => {
          !p && g.filename && (p = g.filename), p || L("ADM-ZIP: ZIP File Name Missing"), this.toBufferPromise().then((F) => {
            const H = (M) => M ? N(M) : L("ADM-ZIP: Wasn't able to write zip file");
            E.writeFileToAsync(p, F, $, b, H);
          }, L);
        });
      },
      /**
       * @returns {Promise<Buffer>} A promise to the Buffer.
       */
      toBufferPromise: function() {
        return new Promise((p, y) => {
          _.toAsyncBuffer(p, y);
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
      toBuffer: function(p, y, $, b) {
        return typeof p == "function" ? (_.toAsyncBuffer(p, y, $, b), null) : _.compressToBuffer();
      }
    };
  }, Hi;
}
var wp = Ep();
const Ql = /* @__PURE__ */ nf(wp);
class Et {
  constructor(t, f) {
    this.bw = t, this.version = f;
    const s = Et.#n;
    this.#i = process.platform === "win32", t.webContents.on("devtools-opened", () => this.#f()), s.handle("openDevTools", () => t.webContents.openDevTools()), this.#h.getVersion = f, s.handle("getInfo", () => this.#h), s.handle("inited", (i, r, a) => this.#p(r, a)), s.handle("fetch", async (i, r) => {
      const a = await fetch(r, { cache: "no-store" });
      return {
        ok: a.ok,
        txt: await a.text()
      };
    }), s.handle("fetchAb", async (i, r) => {
      const a = await fetch(r, { cache: "no-store" });
      return {
        ok: a.ok,
        ab: await a.arrayBuffer()
      };
    }), s.handle("existsSync", (i, r) => be.existsSync(r)), s.handle("copy", (i, r, a) => be.copy(r, a)), s.handle("remove", (i, r) => be.remove(r)), s.handle("ensureFile", (i, r) => be.ensureFile(r)), s.handle("readFile", (i, r, a) => be.readFile(r, a)), s.handle("writeFile", (i, r, a, o) => be.writeFile(r, a, o)), s.handle("appendFile", (i, r, a) => be.appendFile(r, a).catch((o) => console.error(o))), s.handle("outputFile", (i, r, a) => be.outputFile(r, a).catch((o) => console.error(o))), s.handle("win_close", () => t.close()), s.handle("win_setTitle", (i, r) => t.setTitle(r)), s.handle("showMessageBox", (i, r) => uo.showMessageBox(t, r)), s.handle("showOpenDialog", (i, r) => uo.showOpenDialog(t, r)), s.handle("capturePage", (i, r, a, o) => t.webContents.capturePage().then(async (l) => {
      await be.ensureFile(r);
      const c = l.resize({ width: a, height: o, quality: "best" }), g = r.endsWith(".png") ? c.toPNG() : c.toJPEG(80);
      await be.writeFile(r, g);
    })), s.handle("navigate_to", (i, r) => Nf.openExternal(r));
    let d;
    s.handle("Store", (i, r) => {
      d = new ql(r);
    }), s.handle("flush", (i, r) => {
      d.store = r;
    }), s.handle("Store_isEmpty", () => d.size === 0), s.handle("Store_get", () => d.store), s.handle("zip", async (i, r, a) => {
      const o = new Ql();
      o.addLocalFolder(r), await o.writeZipPromise(a);
    }), s.handle("unzip", async (i, r, a) => {
      await be.remove(a), await be.ensureDir(a), new Ql(r).extractAllTo(a, !0);
    }), s.handle("isSimpleFullScreen", () => t.simpleFullScreen), this.#i ? (s.handle("setSimpleFullScreen", (i, r) => {
      this.#e = () => {
      }, t.setSimpleFullScreen(r), r || (t.setPosition(this.#u, this.#l), t.setContentSize(this.#o, this.#a)), this.#e = () => this.#r();
    }), t.on("enter-full-screen", () => {
      this.#e = () => {
      }, t.setContentSize(this.#t.width, this.#t.height), this.#e = () => this.#r();
    }), t.on("leave-full-screen", () => {
      this.#c(!1, this.#u, this.#l, this.#o, this.#a);
    })) : s.handle("setSimpleFullScreen", (i, r) => {
      t.setSimpleFullScreen(r), !r && t.setContentSize(this.#o, this.#a);
    }), s.handle("window", (i, r, a, o, l, c) => this.#c(r, a, o, l, c)), t.on("move", () => this.#e()), t.on("resize", () => this.#e()), this.#m();
  }
  static init(t) {
    Et.#n = t, ql.initRenderer();
  }
  static #n;
  #i;
  // import {os} from 'platform'; は動作しない
  #h = {
    getAppPath: Pt.getAppPath(),
    isPackaged: Pt.isPackaged,
    downloads: Pt.getPath("downloads"),
    userData: Pt.getPath("userData"),
    getVersion: "",
    // constructor で
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any, no-process-env
    env: { ...process.env },
    platform: process.platform,
    arch: process.arch
  };
  #u = 0;
  #l = 0;
  #o = 0;
  #a = 0;
  //MARK: Renderer からの初期化通知を受けて
  #p(t, f) {
    const { width: s, height: d } = t.window, { c: i, x: r, y: a, w: o } = f;
    this.#s = s / d;
    const l = o === s ? d : o / this.#s;
    if (this.#i || this.bw.setAspectRatio(this.#s), this.#c(i, r, a, o, l), this.bw.show(), this.#e = () => this.#r(), t.debug.devtool) {
      this.#f = () => {
      }, this.openDevTools = () => this.bw.webContents.openDevTools({
        mode: "detach"
        // 別ウィンドウに切り離すが画面内に戻せない
        //	activate: false,	// 他のウインドウの後ろに回って見失いがち
      }), this.openDevTools();
      return;
    }
    this.#f = () => {
      this.bw.webContents.closeDevTools(), this.bw.setTitle("DevToolは禁止されています。許可する場合は【プロジェクト設定】の【devtool】をONに。"), this.sendShutdown();
    };
  }
  #s = 0;
  #f = () => this.bw.webContents.closeDevTools();
  // 開こうとしたら閉じる
  //MARK: 現時点でウインドウが存在するデスクトップでの情報取得
  #m() {
    const t = lo.getCursorScreenPoint(), f = lo.getDisplayNearestPoint(t);
    this.#t = f.workAreaSize;
  }
  #t;
  #e = () => {
  };
  #r() {
    if (this.#d) return;
    this.#e = () => {
    };
    const [t, f] = this.bw.getPosition(), [s, d] = this.bw.getContentSize();
    this.#d = setTimeout(() => {
      this.#d = void 0;
      const [i = 0, r = 0] = this.bw.getPosition(), [a = 0, o = 0] = this.bw.getContentSize();
      if (t !== i || f !== r || s !== a || d !== o) {
        this.#r();
        return;
      }
      this.#e = () => this.#r();
      let l = a, c = o;
      this.#i && (s === a ? c = a / this.#s : l = o * this.#s), this.#c(!1, i, r, l, c);
    }, 1e3 / 60 * 10);
  }
  #d = void 0;
  #c(t, f, s, d, i) {
    if (this.bw.simpleFullScreen) return;
    console.log(`fn:appMain.ts window c:${String(t)} (${String(f)},${String(s)},${String(d)},${String(i)}) scr(${String(this.#t.width)},${String(this.#t.height)})`), this.#e = () => {
    };
    const r = this.#u = Math.round(t ? (this.#t.width - d) * 0.5 : f), a = this.#l = Math.round(t ? (this.#t.height - i) * 0.5 : s);
    this.bw.setPosition(r, a);
    const o = this.#o = Math.round(d), l = this.#a = Math.round(i);
    this.bw.setContentSize(o, l), t || this.#m(), this.sendSaveWinInf({ x: r, y: a, w: o, h: l }), this.#e = () => this.#r();
  }
  sendShutdown() {
  }
  sendSaveWinInf(t) {
  }
  // doc/app.js 等から呼ぶので public
  openDevTools = () => {
  };
}
class Sp {
  constructor() {
    this.listeners = [], this.handlers = [];
  }
  /**
   * Listen to `channel`.
   */
  on(t, f) {
    this.listeners.push(t), Nt.on(t, f);
  }
  /**
   * Handle a renderer invoke request.
   */
  handle(t, f) {
    this.handlers.push(t), Nt.handle(t, f);
  }
  /**
   * Dispose all listeners and handlers.
   */
  dispose() {
    this.listeners.forEach((t) => Nt.removeAllListeners(t)), this.listeners = [], this.handlers.forEach((t) => Nt.removeHandler(t)), this.handlers = [];
  }
}
class Rp {
  /**
   * Send an asynchronous message to the renderer process.
   */
  send(t, f, ...s) {
    t.send(f, ...s);
  }
}
class bf extends Et {
  static initRenderer(t, f) {
    let s, d = () => {
    };
    try {
      Et.init(new Sp()), s = new Of({
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
      const i = new bf(s, f);
      d = () => i.openDevTools();
    } catch (i) {
      throw console.error(`early err:${String(i)}`), d(), "initRenderer error";
    }
    return s;
  }
  #n = new Rp();
  sendShutdown() {
    this.#n.send(this.bw.webContents, "shutdown");
  }
  sendSaveWinInf(t) {
    this.#n.send(this.bw.webContents, "save_win_inf", t);
  }
}
export {
  bf as appMain
};
//# sourceMappingURL=appMain.js.map
