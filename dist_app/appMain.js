import Ef, { dialog as Do, shell as Yf, app as Ut, screen as Ao, ipcMain as Vt, BrowserWindow as Qf } from "electron";
import fo from "fs";
import ed from "constants";
import td from "stream";
import rd from "util";
import nd from "assert";
import Re from "path";
import we from "node:process";
import ce from "node:path";
import { promisify as $e, isDeepStrictEqual as jo } from "node:util";
import Q from "node:fs";
import at from "node:crypto";
import ko from "node:assert";
import wf from "node:os";
import "node:events";
import "node:stream";
import Sf from "zlib";
import sd from "crypto";
var ts = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ho(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var rs = {}, zt = {}, Lo;
function ve() {
  return Lo || (Lo = 1, zt.fromCallback = function(e) {
    return Object.defineProperty(function(...t) {
      if (typeof t[t.length - 1] == "function") e.apply(this, t);
      else
        return new Promise((o, s) => {
          t.push((l, n) => l != null ? s(l) : o(n)), e.apply(this, t);
        });
    }, "name", { value: e.name });
  }, zt.fromPromise = function(e) {
    return Object.defineProperty(function(...t) {
      const o = t[t.length - 1];
      if (typeof o != "function") return e.apply(this, t);
      t.pop(), e.apply(this, t).then((s) => o(null, s), o);
    }, "name", { value: e.name });
  }), zt;
}
var ns, qo;
function id() {
  if (qo) return ns;
  qo = 1;
  var e = ed, t = process.cwd, o = null, s = process.env.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function() {
    return o || (o = t.call(process)), o;
  };
  try {
    process.cwd();
  } catch {
  }
  if (typeof process.chdir == "function") {
    var l = process.chdir;
    process.chdir = function(r) {
      o = null, l.call(process, r);
    }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, l);
  }
  ns = n;
  function n(r) {
    e.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && a(r), r.lutimes || c(r), r.chown = E(r.chown), r.fchown = E(r.fchown), r.lchown = E(r.lchown), r.chmod = d(r.chmod), r.fchmod = d(r.fchmod), r.lchmod = d(r.lchmod), r.chownSync = _(r.chownSync), r.fchownSync = _(r.fchownSync), r.lchownSync = _(r.lchownSync), r.chmodSync = f(r.chmodSync), r.fchmodSync = f(r.fchmodSync), r.lchmodSync = f(r.lchmodSync), r.stat = g(r.stat), r.fstat = g(r.fstat), r.lstat = g(r.lstat), r.statSync = w(r.statSync), r.fstatSync = w(r.fstatSync), r.lstatSync = w(r.lstatSync), r.chmod && !r.lchmod && (r.lchmod = function(u, h, i) {
      i && process.nextTick(i);
    }, r.lchmodSync = function() {
    }), r.chown && !r.lchown && (r.lchown = function(u, h, i, p) {
      p && process.nextTick(p);
    }, r.lchownSync = function() {
    }), s === "win32" && (r.rename = typeof r.rename != "function" ? r.rename : function(u) {
      function h(i, p, v) {
        var m = Date.now(), y = 0;
        u(i, p, function $(R) {
          if (R && (R.code === "EACCES" || R.code === "EPERM" || R.code === "EBUSY") && Date.now() - m < 6e4) {
            setTimeout(function() {
              r.stat(p, function(O, j) {
                O && O.code === "ENOENT" ? u(i, p, $) : v(R);
              });
            }, y), y < 100 && (y += 10);
            return;
          }
          v && v(R);
        });
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(h, u), h;
    }(r.rename)), r.read = typeof r.read != "function" ? r.read : function(u) {
      function h(i, p, v, m, y, $) {
        var R;
        if ($ && typeof $ == "function") {
          var O = 0;
          R = function(j, L, V) {
            if (j && j.code === "EAGAIN" && O < 10)
              return O++, u.call(r, i, p, v, m, y, R);
            $.apply(this, arguments);
          };
        }
        return u.call(r, i, p, v, m, y, R);
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(h, u), h;
    }(r.read), r.readSync = typeof r.readSync != "function" ? r.readSync : /* @__PURE__ */ function(u) {
      return function(h, i, p, v, m) {
        for (var y = 0; ; )
          try {
            return u.call(r, h, i, p, v, m);
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
      u.lchmod = function(h, i, p) {
        u.open(
          h,
          e.O_WRONLY | e.O_SYMLINK,
          i,
          function(v, m) {
            if (v) {
              p && p(v);
              return;
            }
            u.fchmod(m, i, function(y) {
              u.close(m, function($) {
                p && p(y || $);
              });
            });
          }
        );
      }, u.lchmodSync = function(h, i) {
        var p = u.openSync(h, e.O_WRONLY | e.O_SYMLINK, i), v = !0, m;
        try {
          m = u.fchmodSync(p, i), v = !1;
        } finally {
          if (v)
            try {
              u.closeSync(p);
            } catch {
            }
          else
            u.closeSync(p);
        }
        return m;
      };
    }
    function c(u) {
      e.hasOwnProperty("O_SYMLINK") && u.futimes ? (u.lutimes = function(h, i, p, v) {
        u.open(h, e.O_SYMLINK, function(m, y) {
          if (m) {
            v && v(m);
            return;
          }
          u.futimes(y, i, p, function($) {
            u.close(y, function(R) {
              v && v($ || R);
            });
          });
        });
      }, u.lutimesSync = function(h, i, p) {
        var v = u.openSync(h, e.O_SYMLINK), m, y = !0;
        try {
          m = u.futimesSync(v, i, p), y = !1;
        } finally {
          if (y)
            try {
              u.closeSync(v);
            } catch {
            }
          else
            u.closeSync(v);
        }
        return m;
      }) : u.futimes && (u.lutimes = function(h, i, p, v) {
        v && process.nextTick(v);
      }, u.lutimesSync = function() {
      });
    }
    function d(u) {
      return u && function(h, i, p) {
        return u.call(r, h, i, function(v) {
          b(v) && (v = null), p && p.apply(this, arguments);
        });
      };
    }
    function f(u) {
      return u && function(h, i) {
        try {
          return u.call(r, h, i);
        } catch (p) {
          if (!b(p)) throw p;
        }
      };
    }
    function E(u) {
      return u && function(h, i, p, v) {
        return u.call(r, h, i, p, function(m) {
          b(m) && (m = null), v && v.apply(this, arguments);
        });
      };
    }
    function _(u) {
      return u && function(h, i, p) {
        try {
          return u.call(r, h, i, p);
        } catch (v) {
          if (!b(v)) throw v;
        }
      };
    }
    function g(u) {
      return u && function(h, i, p) {
        typeof i == "function" && (p = i, i = null);
        function v(m, y) {
          y && (y.uid < 0 && (y.uid += 4294967296), y.gid < 0 && (y.gid += 4294967296)), p && p.apply(this, arguments);
        }
        return i ? u.call(r, h, i, v) : u.call(r, h, v);
      };
    }
    function w(u) {
      return u && function(h, i) {
        var p = i ? u.call(r, h, i) : u.call(r, h);
        return p && (p.uid < 0 && (p.uid += 4294967296), p.gid < 0 && (p.gid += 4294967296)), p;
      };
    }
    function b(u) {
      if (!u || u.code === "ENOSYS")
        return !0;
      var h = !process.getuid || process.getuid() !== 0;
      return !!(h && (u.code === "EINVAL" || u.code === "EPERM"));
    }
  }
  return ns;
}
var ss, Fo;
function od() {
  if (Fo) return ss;
  Fo = 1;
  var e = td.Stream;
  ss = t;
  function t(o) {
    return {
      ReadStream: s,
      WriteStream: l
    };
    function s(n, r) {
      if (!(this instanceof s)) return new s(n, r);
      e.call(this);
      var a = this;
      this.path = n, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, r = r || {};
      for (var c = Object.keys(r), d = 0, f = c.length; d < f; d++) {
        var E = c[d];
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
          a._read();
        });
        return;
      }
      o.open(this.path, this.flags, this.mode, function(_, g) {
        if (_) {
          a.emit("error", _), a.readable = !1;
          return;
        }
        a.fd = g, a.emit("open", g), a._read();
      });
    }
    function l(n, r) {
      if (!(this instanceof l)) return new l(n, r);
      e.call(this), this.path = n, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, r = r || {};
      for (var a = Object.keys(r), c = 0, d = a.length; c < d; c++) {
        var f = a[c];
        this[f] = r[f];
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
  return ss;
}
var is, Mo;
function ad() {
  if (Mo) return is;
  Mo = 1, is = t;
  var e = Object.getPrototypeOf || function(o) {
    return o.__proto__;
  };
  function t(o) {
    if (o === null || typeof o != "object")
      return o;
    if (o instanceof Object)
      var s = { __proto__: e(o) };
    else
      var s = /* @__PURE__ */ Object.create(null);
    return Object.getOwnPropertyNames(o).forEach(function(l) {
      Object.defineProperty(s, l, Object.getOwnPropertyDescriptor(o, l));
    }), s;
  }
  return is;
}
var Gt, Uo;
function qt() {
  if (Uo) return Gt;
  Uo = 1;
  var e = fo, t = id(), o = od(), s = ad(), l = rd, n, r;
  typeof Symbol == "function" && typeof Symbol.for == "function" ? (n = Symbol.for("graceful-fs.queue"), r = Symbol.for("graceful-fs.previous")) : (n = "___graceful-fs.queue", r = "___graceful-fs.previous");
  function a() {
  }
  function c(u, h) {
    Object.defineProperty(u, n, {
      get: function() {
        return h;
      }
    });
  }
  var d = a;
  if (l.debuglog ? d = l.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (d = function() {
    var u = l.format.apply(l, arguments);
    u = "GFS4: " + u.split(/\n/).join(`
GFS4: `), console.error(u);
  }), !e[n]) {
    var f = ts[n] || [];
    c(e, f), e.close = function(u) {
      function h(i, p) {
        return u.call(e, i, function(v) {
          v || w(), typeof p == "function" && p.apply(this, arguments);
        });
      }
      return Object.defineProperty(h, r, {
        value: u
      }), h;
    }(e.close), e.closeSync = function(u) {
      function h(i) {
        u.apply(e, arguments), w();
      }
      return Object.defineProperty(h, r, {
        value: u
      }), h;
    }(e.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
      d(e[n]), nd.equal(e[n].length, 0);
    });
  }
  ts[n] || c(ts, e[n]), Gt = E(s(e)), process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !e.__patched && (Gt = E(e), e.__patched = !0);
  function E(u) {
    t(u), u.gracefulify = E, u.createReadStream = I, u.createWriteStream = A;
    var h = u.readFile;
    u.readFile = i;
    function i(N, D, G) {
      return typeof D == "function" && (G = D, D = null), H(N, D, G);
      function H(X, Z, P, T) {
        return h(X, Z, function(k) {
          k && (k.code === "EMFILE" || k.code === "ENFILE") ? _([H, [X, Z, P], k, T || Date.now(), Date.now()]) : typeof P == "function" && P.apply(this, arguments);
        });
      }
    }
    var p = u.writeFile;
    u.writeFile = v;
    function v(N, D, G, H) {
      return typeof G == "function" && (H = G, G = null), X(N, D, G, H);
      function X(Z, P, T, k, U) {
        return p(Z, P, T, function(K) {
          K && (K.code === "EMFILE" || K.code === "ENFILE") ? _([X, [Z, P, T, k], K, U || Date.now(), Date.now()]) : typeof k == "function" && k.apply(this, arguments);
        });
      }
    }
    var m = u.appendFile;
    m && (u.appendFile = y);
    function y(N, D, G, H) {
      return typeof G == "function" && (H = G, G = null), X(N, D, G, H);
      function X(Z, P, T, k, U) {
        return m(Z, P, T, function(K) {
          K && (K.code === "EMFILE" || K.code === "ENFILE") ? _([X, [Z, P, T, k], K, U || Date.now(), Date.now()]) : typeof k == "function" && k.apply(this, arguments);
        });
      }
    }
    var $ = u.copyFile;
    $ && (u.copyFile = R);
    function R(N, D, G, H) {
      return typeof G == "function" && (H = G, G = 0), X(N, D, G, H);
      function X(Z, P, T, k, U) {
        return $(Z, P, T, function(K) {
          K && (K.code === "EMFILE" || K.code === "ENFILE") ? _([X, [Z, P, T, k], K, U || Date.now(), Date.now()]) : typeof k == "function" && k.apply(this, arguments);
        });
      }
    }
    var O = u.readdir;
    u.readdir = L;
    var j = /^v[0-5]\./;
    function L(N, D, G) {
      typeof D == "function" && (G = D, D = null);
      var H = j.test(process.version) ? function(P, T, k, U) {
        return O(P, X(
          P,
          T,
          k,
          U
        ));
      } : function(P, T, k, U) {
        return O(P, T, X(
          P,
          T,
          k,
          U
        ));
      };
      return H(N, D, G);
      function X(Z, P, T, k) {
        return function(U, K) {
          U && (U.code === "EMFILE" || U.code === "ENFILE") ? _([
            H,
            [Z, P, T],
            U,
            k || Date.now(),
            Date.now()
          ]) : (K && K.sort && K.sort(), typeof T == "function" && T.call(this, U, K));
        };
      }
    }
    if (process.version.substr(0, 4) === "v0.8") {
      var V = o(u);
      x = V.ReadStream, W = V.WriteStream;
    }
    var F = u.ReadStream;
    F && (x.prototype = Object.create(F.prototype), x.prototype.open = B);
    var M = u.WriteStream;
    M && (W.prototype = Object.create(M.prototype), W.prototype.open = q), Object.defineProperty(u, "ReadStream", {
      get: function() {
        return x;
      },
      set: function(N) {
        x = N;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(u, "WriteStream", {
      get: function() {
        return W;
      },
      set: function(N) {
        W = N;
      },
      enumerable: !0,
      configurable: !0
    });
    var z = x;
    Object.defineProperty(u, "FileReadStream", {
      get: function() {
        return z;
      },
      set: function(N) {
        z = N;
      },
      enumerable: !0,
      configurable: !0
    });
    var J = W;
    Object.defineProperty(u, "FileWriteStream", {
      get: function() {
        return J;
      },
      set: function(N) {
        J = N;
      },
      enumerable: !0,
      configurable: !0
    });
    function x(N, D) {
      return this instanceof x ? (F.apply(this, arguments), this) : x.apply(Object.create(x.prototype), arguments);
    }
    function B() {
      var N = this;
      S(N.path, N.flags, N.mode, function(D, G) {
        D ? (N.autoClose && N.destroy(), N.emit("error", D)) : (N.fd = G, N.emit("open", G), N.read());
      });
    }
    function W(N, D) {
      return this instanceof W ? (M.apply(this, arguments), this) : W.apply(Object.create(W.prototype), arguments);
    }
    function q() {
      var N = this;
      S(N.path, N.flags, N.mode, function(D, G) {
        D ? (N.destroy(), N.emit("error", D)) : (N.fd = G, N.emit("open", G));
      });
    }
    function I(N, D) {
      return new u.ReadStream(N, D);
    }
    function A(N, D) {
      return new u.WriteStream(N, D);
    }
    var C = u.open;
    u.open = S;
    function S(N, D, G, H) {
      return typeof G == "function" && (H = G, G = null), X(N, D, G, H);
      function X(Z, P, T, k, U) {
        return C(Z, P, T, function(K, Y) {
          K && (K.code === "EMFILE" || K.code === "ENFILE") ? _([X, [Z, P, T, k], K, U || Date.now(), Date.now()]) : typeof k == "function" && k.apply(this, arguments);
        });
      }
    }
    return u;
  }
  function _(u) {
    d("ENQUEUE", u[0].name, u[1]), e[n].push(u), b();
  }
  var g;
  function w() {
    for (var u = Date.now(), h = 0; h < e[n].length; ++h)
      e[n][h].length > 2 && (e[n][h][3] = u, e[n][h][4] = u);
    b();
  }
  function b() {
    if (clearTimeout(g), g = void 0, e[n].length !== 0) {
      var u = e[n].shift(), h = u[0], i = u[1], p = u[2], v = u[3], m = u[4];
      if (v === void 0)
        d("RETRY", h.name, i), h.apply(null, i);
      else if (Date.now() - v >= 6e4) {
        d("TIMEOUT", h.name, i);
        var y = i.pop();
        typeof y == "function" && y.call(null, p);
      } else {
        var $ = Date.now() - m, R = Math.max(m - v, 1), O = Math.min(R * 1.2, 100);
        $ >= O ? (d("RETRY", h.name, i), h.apply(null, i.concat([v]))) : e[n].push(u);
      }
      g === void 0 && (g = setTimeout(b, 0));
    }
  }
  return Gt;
}
var Vo;
function Pe() {
  return Vo || (Vo = 1, function(e) {
    const t = ve().fromCallback, o = qt(), s = [
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
    ].filter((l) => typeof o[l] == "function");
    Object.assign(e, o), s.forEach((l) => {
      e[l] = t(o[l]);
    }), e.exists = function(l, n) {
      return typeof n == "function" ? o.exists(l, n) : new Promise((r) => o.exists(l, r));
    }, e.read = function(l, n, r, a, c, d) {
      return typeof d == "function" ? o.read(l, n, r, a, c, d) : new Promise((f, E) => {
        o.read(l, n, r, a, c, (_, g, w) => {
          if (_) return E(_);
          f({ bytesRead: g, buffer: w });
        });
      });
    }, e.write = function(l, n, ...r) {
      return typeof r[r.length - 1] == "function" ? o.write(l, n, ...r) : new Promise((a, c) => {
        o.write(l, n, ...r, (d, f, E) => {
          if (d) return c(d);
          a({ bytesWritten: f, buffer: E });
        });
      });
    }, e.readv = function(l, n, ...r) {
      return typeof r[r.length - 1] == "function" ? o.readv(l, n, ...r) : new Promise((a, c) => {
        o.readv(l, n, ...r, (d, f, E) => {
          if (d) return c(d);
          a({ bytesRead: f, buffers: E });
        });
      });
    }, e.writev = function(l, n, ...r) {
      return typeof r[r.length - 1] == "function" ? o.writev(l, n, ...r) : new Promise((a, c) => {
        o.writev(l, n, ...r, (d, f, E) => {
          if (d) return c(d);
          a({ bytesWritten: f, buffers: E });
        });
      });
    }, typeof o.realpath.native == "function" ? e.realpath.native = t(o.realpath.native) : process.emitWarning(
      "fs.realpath.native is not a function. Is fs being monkey-patched?",
      "Warning",
      "fs-extra-WARN0003"
    );
  }(rs)), rs;
}
var Kt = {}, os = {}, zo;
function cd() {
  if (zo) return os;
  zo = 1;
  const e = Re;
  return os.checkPath = function(o) {
    if (process.platform === "win32" && /[<>:"|?*]/.test(o.replace(e.parse(o).root, ""))) {
      const l = new Error(`Path contains invalid characters: ${o}`);
      throw l.code = "EINVAL", l;
    }
  }, os;
}
var Go;
function ud() {
  if (Go) return Kt;
  Go = 1;
  const e = /* @__PURE__ */ Pe(), { checkPath: t } = /* @__PURE__ */ cd(), o = (s) => {
    const l = { mode: 511 };
    return typeof s == "number" ? s : { ...l, ...s }.mode;
  };
  return Kt.makeDir = async (s, l) => (t(s), e.mkdir(s, {
    mode: o(l),
    recursive: !0
  })), Kt.makeDirSync = (s, l) => (t(s), e.mkdirSync(s, {
    mode: o(l),
    recursive: !0
  })), Kt;
}
var as, Ko;
function Ve() {
  if (Ko) return as;
  Ko = 1;
  const e = ve().fromPromise, { makeDir: t, makeDirSync: o } = /* @__PURE__ */ ud(), s = e(t);
  return as = {
    mkdirs: s,
    mkdirsSync: o,
    // alias
    mkdirp: s,
    mkdirpSync: o,
    ensureDir: s,
    ensureDirSync: o
  }, as;
}
var cs, Ho;
function yt() {
  if (Ho) return cs;
  Ho = 1;
  const e = ve().fromPromise, t = /* @__PURE__ */ Pe();
  function o(s) {
    return t.access(s).then(() => !0).catch(() => !1);
  }
  return cs = {
    pathExists: e(o),
    pathExistsSync: t.existsSync
  }, cs;
}
var us, Bo;
function bf() {
  if (Bo) return us;
  Bo = 1;
  const e = /* @__PURE__ */ Pe(), t = ve().fromPromise;
  async function o(l, n, r) {
    const a = await e.open(l, "r+");
    let c = null;
    try {
      await e.futimes(a, n, r);
    } finally {
      try {
        await e.close(a);
      } catch (d) {
        c = d;
      }
    }
    if (c)
      throw c;
  }
  function s(l, n, r) {
    const a = e.openSync(l, "r+");
    return e.futimesSync(a, n, r), e.closeSync(a);
  }
  return us = {
    utimesMillis: t(o),
    utimesMillisSync: s
  }, us;
}
var ls, xo;
function Nt() {
  if (xo) return ls;
  xo = 1;
  const e = /* @__PURE__ */ Pe(), t = Re, o = ve().fromPromise;
  function s(_, g, w) {
    const b = w.dereference ? (u) => e.stat(u, { bigint: !0 }) : (u) => e.lstat(u, { bigint: !0 });
    return Promise.all([
      b(_),
      b(g).catch((u) => {
        if (u.code === "ENOENT") return null;
        throw u;
      })
    ]).then(([u, h]) => ({ srcStat: u, destStat: h }));
  }
  function l(_, g, w) {
    let b;
    const u = w.dereference ? (i) => e.statSync(i, { bigint: !0 }) : (i) => e.lstatSync(i, { bigint: !0 }), h = u(_);
    try {
      b = u(g);
    } catch (i) {
      if (i.code === "ENOENT") return { srcStat: h, destStat: null };
      throw i;
    }
    return { srcStat: h, destStat: b };
  }
  async function n(_, g, w, b) {
    const { srcStat: u, destStat: h } = await s(_, g, b);
    if (h) {
      if (d(u, h)) {
        const i = t.basename(_), p = t.basename(g);
        if (w === "move" && i !== p && i.toLowerCase() === p.toLowerCase())
          return { srcStat: u, destStat: h, isChangingCase: !0 };
        throw new Error("Source and destination must not be the same.");
      }
      if (u.isDirectory() && !h.isDirectory())
        throw new Error(`Cannot overwrite non-directory '${g}' with directory '${_}'.`);
      if (!u.isDirectory() && h.isDirectory())
        throw new Error(`Cannot overwrite directory '${g}' with non-directory '${_}'.`);
    }
    if (u.isDirectory() && f(_, g))
      throw new Error(E(_, g, w));
    return { srcStat: u, destStat: h };
  }
  function r(_, g, w, b) {
    const { srcStat: u, destStat: h } = l(_, g, b);
    if (h) {
      if (d(u, h)) {
        const i = t.basename(_), p = t.basename(g);
        if (w === "move" && i !== p && i.toLowerCase() === p.toLowerCase())
          return { srcStat: u, destStat: h, isChangingCase: !0 };
        throw new Error("Source and destination must not be the same.");
      }
      if (u.isDirectory() && !h.isDirectory())
        throw new Error(`Cannot overwrite non-directory '${g}' with directory '${_}'.`);
      if (!u.isDirectory() && h.isDirectory())
        throw new Error(`Cannot overwrite directory '${g}' with non-directory '${_}'.`);
    }
    if (u.isDirectory() && f(_, g))
      throw new Error(E(_, g, w));
    return { srcStat: u, destStat: h };
  }
  async function a(_, g, w, b) {
    const u = t.resolve(t.dirname(_)), h = t.resolve(t.dirname(w));
    if (h === u || h === t.parse(h).root) return;
    let i;
    try {
      i = await e.stat(h, { bigint: !0 });
    } catch (p) {
      if (p.code === "ENOENT") return;
      throw p;
    }
    if (d(g, i))
      throw new Error(E(_, w, b));
    return a(_, g, h, b);
  }
  function c(_, g, w, b) {
    const u = t.resolve(t.dirname(_)), h = t.resolve(t.dirname(w));
    if (h === u || h === t.parse(h).root) return;
    let i;
    try {
      i = e.statSync(h, { bigint: !0 });
    } catch (p) {
      if (p.code === "ENOENT") return;
      throw p;
    }
    if (d(g, i))
      throw new Error(E(_, w, b));
    return c(_, g, h, b);
  }
  function d(_, g) {
    return g.ino !== void 0 && g.dev !== void 0 && g.ino === _.ino && g.dev === _.dev;
  }
  function f(_, g) {
    const w = t.resolve(_).split(t.sep).filter((u) => u), b = t.resolve(g).split(t.sep).filter((u) => u);
    return w.every((u, h) => b[h] === u);
  }
  function E(_, g, w) {
    return `Cannot ${w} '${_}' to a subdirectory of itself, '${g}'.`;
  }
  return ls = {
    // checkPaths
    checkPaths: o(n),
    checkPathsSync: r,
    // checkParent
    checkParentPaths: o(a),
    checkParentPathsSync: c,
    // Misc
    isSrcSubdir: f,
    areIdentical: d
  }, ls;
}
var fs, Jo;
function ld() {
  if (Jo) return fs;
  Jo = 1;
  async function e(t, o) {
    const s = [];
    for await (const l of t)
      s.push(
        o(l).then(
          () => null,
          (n) => n ?? new Error("unknown error")
        )
      );
    await Promise.all(
      s.map(
        (l) => l.then((n) => {
          if (n !== null) throw n;
        })
      )
    );
  }
  return fs = {
    asyncIteratorConcurrentProcess: e
  }, fs;
}
var ds, Wo;
function fd() {
  if (Wo) return ds;
  Wo = 1;
  const e = /* @__PURE__ */ Pe(), t = Re, { mkdirs: o } = /* @__PURE__ */ Ve(), { pathExists: s } = /* @__PURE__ */ yt(), { utimesMillis: l } = /* @__PURE__ */ bf(), n = /* @__PURE__ */ Nt(), { asyncIteratorConcurrentProcess: r } = /* @__PURE__ */ ld();
  async function a(u, h, i = {}) {
    typeof i == "function" && (i = { filter: i }), i.clobber = "clobber" in i ? !!i.clobber : !0, i.overwrite = "overwrite" in i ? !!i.overwrite : i.clobber, i.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0001"
    );
    const { srcStat: p, destStat: v } = await n.checkPaths(u, h, "copy", i);
    if (await n.checkParentPaths(u, p, h, "copy"), !await c(u, h, i)) return;
    const y = t.dirname(h);
    await s(y) || await o(y), await d(v, u, h, i);
  }
  async function c(u, h, i) {
    return i.filter ? i.filter(u, h) : !0;
  }
  async function d(u, h, i, p) {
    const m = await (p.dereference ? e.stat : e.lstat)(h);
    if (m.isDirectory()) return w(m, u, h, i, p);
    if (m.isFile() || m.isCharacterDevice() || m.isBlockDevice()) return f(m, u, h, i, p);
    if (m.isSymbolicLink()) return b(u, h, i, p);
    throw m.isSocket() ? new Error(`Cannot copy a socket file: ${h}`) : m.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${h}`) : new Error(`Unknown file: ${h}`);
  }
  async function f(u, h, i, p, v) {
    if (!h) return E(u, i, p, v);
    if (v.overwrite)
      return await e.unlink(p), E(u, i, p, v);
    if (v.errorOnExist)
      throw new Error(`'${p}' already exists`);
  }
  async function E(u, h, i, p) {
    if (await e.copyFile(h, i), p.preserveTimestamps) {
      _(u.mode) && await g(i, u.mode);
      const v = await e.stat(h);
      await l(i, v.atime, v.mtime);
    }
    return e.chmod(i, u.mode);
  }
  function _(u) {
    return (u & 128) === 0;
  }
  function g(u, h) {
    return e.chmod(u, h | 128);
  }
  async function w(u, h, i, p, v) {
    h || await e.mkdir(p), await r(await e.opendir(i), async (m) => {
      const y = t.join(i, m.name), $ = t.join(p, m.name);
      if (await c(y, $, v)) {
        const { destStat: O } = await n.checkPaths(y, $, "copy", v);
        await d(O, y, $, v);
      }
    }), h || await e.chmod(p, u.mode);
  }
  async function b(u, h, i, p) {
    let v = await e.readlink(h);
    if (p.dereference && (v = t.resolve(process.cwd(), v)), !u)
      return e.symlink(v, i);
    let m = null;
    try {
      m = await e.readlink(i);
    } catch (y) {
      if (y.code === "EINVAL" || y.code === "UNKNOWN") return e.symlink(v, i);
      throw y;
    }
    if (p.dereference && (m = t.resolve(process.cwd(), m)), n.isSrcSubdir(v, m))
      throw new Error(`Cannot copy '${v}' to a subdirectory of itself, '${m}'.`);
    if (n.isSrcSubdir(m, v))
      throw new Error(`Cannot overwrite '${m}' with '${v}'.`);
    return await e.unlink(i), e.symlink(v, i);
  }
  return ds = a, ds;
}
var hs, Zo;
function dd() {
  if (Zo) return hs;
  Zo = 1;
  const e = qt(), t = Re, o = Ve().mkdirsSync, s = bf().utimesMillisSync, l = /* @__PURE__ */ Nt();
  function n(m, y, $) {
    typeof $ == "function" && ($ = { filter: $ }), $ = $ || {}, $.clobber = "clobber" in $ ? !!$.clobber : !0, $.overwrite = "overwrite" in $ ? !!$.overwrite : $.clobber, $.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0002"
    );
    const { srcStat: R, destStat: O } = l.checkPathsSync(m, y, "copy", $);
    if (l.checkParentPathsSync(m, R, y, "copy"), $.filter && !$.filter(m, y)) return;
    const j = t.dirname(y);
    return e.existsSync(j) || o(j), r(O, m, y, $);
  }
  function r(m, y, $, R) {
    const j = (R.dereference ? e.statSync : e.lstatSync)(y);
    if (j.isDirectory()) return b(j, m, y, $, R);
    if (j.isFile() || j.isCharacterDevice() || j.isBlockDevice()) return a(j, m, y, $, R);
    if (j.isSymbolicLink()) return p(m, y, $, R);
    throw j.isSocket() ? new Error(`Cannot copy a socket file: ${y}`) : j.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${y}`) : new Error(`Unknown file: ${y}`);
  }
  function a(m, y, $, R, O) {
    return y ? c(m, $, R, O) : d(m, $, R, O);
  }
  function c(m, y, $, R) {
    if (R.overwrite)
      return e.unlinkSync($), d(m, y, $, R);
    if (R.errorOnExist)
      throw new Error(`'${$}' already exists`);
  }
  function d(m, y, $, R) {
    return e.copyFileSync(y, $), R.preserveTimestamps && f(m.mode, y, $), g($, m.mode);
  }
  function f(m, y, $) {
    return E(m) && _($, m), w(y, $);
  }
  function E(m) {
    return (m & 128) === 0;
  }
  function _(m, y) {
    return g(m, y | 128);
  }
  function g(m, y) {
    return e.chmodSync(m, y);
  }
  function w(m, y) {
    const $ = e.statSync(m);
    return s(y, $.atime, $.mtime);
  }
  function b(m, y, $, R, O) {
    return y ? h($, R, O) : u(m.mode, $, R, O);
  }
  function u(m, y, $, R) {
    return e.mkdirSync($), h(y, $, R), g($, m);
  }
  function h(m, y, $) {
    const R = e.opendirSync(m);
    try {
      let O;
      for (; (O = R.readSync()) !== null; )
        i(O.name, m, y, $);
    } finally {
      R.closeSync();
    }
  }
  function i(m, y, $, R) {
    const O = t.join(y, m), j = t.join($, m);
    if (R.filter && !R.filter(O, j)) return;
    const { destStat: L } = l.checkPathsSync(O, j, "copy", R);
    return r(L, O, j, R);
  }
  function p(m, y, $, R) {
    let O = e.readlinkSync(y);
    if (R.dereference && (O = t.resolve(process.cwd(), O)), m) {
      let j;
      try {
        j = e.readlinkSync($);
      } catch (L) {
        if (L.code === "EINVAL" || L.code === "UNKNOWN") return e.symlinkSync(O, $);
        throw L;
      }
      if (R.dereference && (j = t.resolve(process.cwd(), j)), l.isSrcSubdir(O, j))
        throw new Error(`Cannot copy '${O}' to a subdirectory of itself, '${j}'.`);
      if (l.isSrcSubdir(j, O))
        throw new Error(`Cannot overwrite '${j}' with '${O}'.`);
      return v(O, $);
    } else
      return e.symlinkSync(O, $);
  }
  function v(m, y) {
    return e.unlinkSync(y), e.symlinkSync(m, y);
  }
  return hs = n, hs;
}
var ms, Xo;
function mo() {
  if (Xo) return ms;
  Xo = 1;
  const e = ve().fromPromise;
  return ms = {
    copy: e(/* @__PURE__ */ fd()),
    copySync: /* @__PURE__ */ dd()
  }, ms;
}
var ps, Yo;
function qn() {
  if (Yo) return ps;
  Yo = 1;
  const e = qt(), t = ve().fromCallback;
  function o(l, n) {
    e.rm(l, { recursive: !0, force: !0 }, n);
  }
  function s(l) {
    e.rmSync(l, { recursive: !0, force: !0 });
  }
  return ps = {
    remove: t(o),
    removeSync: s
  }, ps;
}
var ys, Qo;
function hd() {
  if (Qo) return ys;
  Qo = 1;
  const e = ve().fromPromise, t = /* @__PURE__ */ Pe(), o = Re, s = /* @__PURE__ */ Ve(), l = /* @__PURE__ */ qn(), n = e(async function(c) {
    let d;
    try {
      d = await t.readdir(c);
    } catch {
      return s.mkdirs(c);
    }
    return Promise.all(d.map((f) => l.remove(o.join(c, f))));
  });
  function r(a) {
    let c;
    try {
      c = t.readdirSync(a);
    } catch {
      return s.mkdirsSync(a);
    }
    c.forEach((d) => {
      d = o.join(a, d), l.removeSync(d);
    });
  }
  return ys = {
    emptyDirSync: r,
    emptydirSync: r,
    emptyDir: n,
    emptydir: n
  }, ys;
}
var vs, ea;
function md() {
  if (ea) return vs;
  ea = 1;
  const e = ve().fromPromise, t = Re, o = /* @__PURE__ */ Pe(), s = /* @__PURE__ */ Ve();
  async function l(r) {
    let a;
    try {
      a = await o.stat(r);
    } catch {
    }
    if (a && a.isFile()) return;
    const c = t.dirname(r);
    let d = null;
    try {
      d = await o.stat(c);
    } catch (f) {
      if (f.code === "ENOENT") {
        await s.mkdirs(c), await o.writeFile(r, "");
        return;
      } else
        throw f;
    }
    d.isDirectory() ? await o.writeFile(r, "") : await o.readdir(c);
  }
  function n(r) {
    let a;
    try {
      a = o.statSync(r);
    } catch {
    }
    if (a && a.isFile()) return;
    const c = t.dirname(r);
    try {
      o.statSync(c).isDirectory() || o.readdirSync(c);
    } catch (d) {
      if (d && d.code === "ENOENT") s.mkdirsSync(c);
      else throw d;
    }
    o.writeFileSync(r, "");
  }
  return vs = {
    createFile: e(l),
    createFileSync: n
  }, vs;
}
var $s, ta;
function pd() {
  if (ta) return $s;
  ta = 1;
  const e = ve().fromPromise, t = Re, o = /* @__PURE__ */ Pe(), s = /* @__PURE__ */ Ve(), { pathExists: l } = /* @__PURE__ */ yt(), { areIdentical: n } = /* @__PURE__ */ Nt();
  async function r(c, d) {
    let f;
    try {
      f = await o.lstat(d);
    } catch {
    }
    let E;
    try {
      E = await o.lstat(c);
    } catch (w) {
      throw w.message = w.message.replace("lstat", "ensureLink"), w;
    }
    if (f && n(E, f)) return;
    const _ = t.dirname(d);
    await l(_) || await s.mkdirs(_), await o.link(c, d);
  }
  function a(c, d) {
    let f;
    try {
      f = o.lstatSync(d);
    } catch {
    }
    try {
      const g = o.lstatSync(c);
      if (f && n(g, f)) return;
    } catch (g) {
      throw g.message = g.message.replace("lstat", "ensureLink"), g;
    }
    const E = t.dirname(d);
    return o.existsSync(E) || s.mkdirsSync(E), o.linkSync(c, d);
  }
  return $s = {
    createLink: e(r),
    createLinkSync: a
  }, $s;
}
var gs, ra;
function yd() {
  if (ra) return gs;
  ra = 1;
  const e = Re, t = /* @__PURE__ */ Pe(), { pathExists: o } = /* @__PURE__ */ yt(), s = ve().fromPromise;
  async function l(r, a) {
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
    const c = e.dirname(a), d = e.join(c, r);
    if (await o(d))
      return {
        toCwd: d,
        toDst: r
      };
    try {
      await t.lstat(r);
    } catch (E) {
      throw E.message = E.message.replace("lstat", "ensureSymlink"), E;
    }
    return {
      toCwd: r,
      toDst: e.relative(c, r)
    };
  }
  function n(r, a) {
    if (e.isAbsolute(r)) {
      if (!t.existsSync(r)) throw new Error("absolute srcpath does not exist");
      return {
        toCwd: r,
        toDst: r
      };
    }
    const c = e.dirname(a), d = e.join(c, r);
    if (t.existsSync(d))
      return {
        toCwd: d,
        toDst: r
      };
    if (!t.existsSync(r)) throw new Error("relative srcpath does not exist");
    return {
      toCwd: r,
      toDst: e.relative(c, r)
    };
  }
  return gs = {
    symlinkPaths: s(l),
    symlinkPathsSync: n
  }, gs;
}
var _s, na;
function vd() {
  if (na) return _s;
  na = 1;
  const e = /* @__PURE__ */ Pe(), t = ve().fromPromise;
  async function o(l, n) {
    if (n) return n;
    let r;
    try {
      r = await e.lstat(l);
    } catch {
      return "file";
    }
    return r && r.isDirectory() ? "dir" : "file";
  }
  function s(l, n) {
    if (n) return n;
    let r;
    try {
      r = e.lstatSync(l);
    } catch {
      return "file";
    }
    return r && r.isDirectory() ? "dir" : "file";
  }
  return _s = {
    symlinkType: t(o),
    symlinkTypeSync: s
  }, _s;
}
var Es, sa;
function $d() {
  if (sa) return Es;
  sa = 1;
  const e = ve().fromPromise, t = Re, o = /* @__PURE__ */ Pe(), { mkdirs: s, mkdirsSync: l } = /* @__PURE__ */ Ve(), { symlinkPaths: n, symlinkPathsSync: r } = /* @__PURE__ */ yd(), { symlinkType: a, symlinkTypeSync: c } = /* @__PURE__ */ vd(), { pathExists: d } = /* @__PURE__ */ yt(), { areIdentical: f } = /* @__PURE__ */ Nt();
  async function E(g, w, b) {
    let u;
    try {
      u = await o.lstat(w);
    } catch {
    }
    if (u && u.isSymbolicLink()) {
      const [v, m] = await Promise.all([
        o.stat(g),
        o.stat(w)
      ]);
      if (f(v, m)) return;
    }
    const h = await n(g, w);
    g = h.toDst;
    const i = await a(h.toCwd, b), p = t.dirname(w);
    return await d(p) || await s(p), o.symlink(g, w, i);
  }
  function _(g, w, b) {
    let u;
    try {
      u = o.lstatSync(w);
    } catch {
    }
    if (u && u.isSymbolicLink()) {
      const v = o.statSync(g), m = o.statSync(w);
      if (f(v, m)) return;
    }
    const h = r(g, w);
    g = h.toDst, b = c(h.toCwd, b);
    const i = t.dirname(w);
    return o.existsSync(i) || l(i), o.symlinkSync(g, w, b);
  }
  return Es = {
    createSymlink: e(E),
    createSymlinkSync: _
  }, Es;
}
var ws, ia;
function gd() {
  if (ia) return ws;
  ia = 1;
  const { createFile: e, createFileSync: t } = /* @__PURE__ */ md(), { createLink: o, createLinkSync: s } = /* @__PURE__ */ pd(), { createSymlink: l, createSymlinkSync: n } = /* @__PURE__ */ $d();
  return ws = {
    // file
    createFile: e,
    createFileSync: t,
    ensureFile: e,
    ensureFileSync: t,
    // link
    createLink: o,
    createLinkSync: s,
    ensureLink: o,
    ensureLinkSync: s,
    // symlink
    createSymlink: l,
    createSymlinkSync: n,
    ensureSymlink: l,
    ensureSymlinkSync: n
  }, ws;
}
var Ss, oa;
function po() {
  if (oa) return Ss;
  oa = 1;
  function e(o, { EOL: s = `
`, finalEOL: l = !0, replacer: n = null, spaces: r } = {}) {
    const a = l ? s : "";
    return JSON.stringify(o, n, r).replace(/\n/g, s) + a;
  }
  function t(o) {
    return Buffer.isBuffer(o) && (o = o.toString("utf8")), o.replace(/^\uFEFF/, "");
  }
  return Ss = { stringify: e, stripBom: t }, Ss;
}
var bs, aa;
function _d() {
  if (aa) return bs;
  aa = 1;
  let e;
  try {
    e = qt();
  } catch {
    e = fo;
  }
  const t = ve(), { stringify: o, stripBom: s } = po();
  async function l(E, _ = {}) {
    typeof _ == "string" && (_ = { encoding: _ });
    const g = _.fs || e, w = "throws" in _ ? _.throws : !0;
    let b = await t.fromCallback(g.readFile)(E, _);
    b = s(b);
    let u;
    try {
      u = JSON.parse(b, _ ? _.reviver : null);
    } catch (h) {
      if (w)
        throw h.message = `${E}: ${h.message}`, h;
      return null;
    }
    return u;
  }
  const n = t.fromPromise(l);
  function r(E, _ = {}) {
    typeof _ == "string" && (_ = { encoding: _ });
    const g = _.fs || e, w = "throws" in _ ? _.throws : !0;
    try {
      let b = g.readFileSync(E, _);
      return b = s(b), JSON.parse(b, _.reviver);
    } catch (b) {
      if (w)
        throw b.message = `${E}: ${b.message}`, b;
      return null;
    }
  }
  async function a(E, _, g = {}) {
    const w = g.fs || e, b = o(_, g);
    await t.fromCallback(w.writeFile)(E, b, g);
  }
  const c = t.fromPromise(a);
  function d(E, _, g = {}) {
    const w = g.fs || e, b = o(_, g);
    return w.writeFileSync(E, b, g);
  }
  return bs = {
    readFile: n,
    readFileSync: r,
    writeFile: c,
    writeFileSync: d
  }, bs;
}
var Rs, ca;
function Ed() {
  if (ca) return Rs;
  ca = 1;
  const e = _d();
  return Rs = {
    // jsonfile exports
    readJson: e.readFile,
    readJsonSync: e.readFileSync,
    writeJson: e.writeFile,
    writeJsonSync: e.writeFileSync
  }, Rs;
}
var Ns, ua;
function yo() {
  if (ua) return Ns;
  ua = 1;
  const e = ve().fromPromise, t = /* @__PURE__ */ Pe(), o = Re, s = /* @__PURE__ */ Ve(), l = yt().pathExists;
  async function n(a, c, d = "utf-8") {
    const f = o.dirname(a);
    return await l(f) || await s.mkdirs(f), t.writeFile(a, c, d);
  }
  function r(a, ...c) {
    const d = o.dirname(a);
    t.existsSync(d) || s.mkdirsSync(d), t.writeFileSync(a, ...c);
  }
  return Ns = {
    outputFile: e(n),
    outputFileSync: r
  }, Ns;
}
var Ps, la;
function wd() {
  if (la) return Ps;
  la = 1;
  const { stringify: e } = po(), { outputFile: t } = /* @__PURE__ */ yo();
  async function o(s, l, n = {}) {
    const r = e(l, n);
    await t(s, r, n);
  }
  return Ps = o, Ps;
}
var Is, fa;
function Sd() {
  if (fa) return Is;
  fa = 1;
  const { stringify: e } = po(), { outputFileSync: t } = /* @__PURE__ */ yo();
  function o(s, l, n) {
    const r = e(l, n);
    t(s, r, n);
  }
  return Is = o, Is;
}
var Os, da;
function bd() {
  if (da) return Os;
  da = 1;
  const e = ve().fromPromise, t = /* @__PURE__ */ Ed();
  return t.outputJson = e(/* @__PURE__ */ wd()), t.outputJsonSync = /* @__PURE__ */ Sd(), t.outputJSON = t.outputJson, t.outputJSONSync = t.outputJsonSync, t.writeJSON = t.writeJson, t.writeJSONSync = t.writeJsonSync, t.readJSON = t.readJson, t.readJSONSync = t.readJsonSync, Os = t, Os;
}
var Ts, ha;
function Rd() {
  if (ha) return Ts;
  ha = 1;
  const e = /* @__PURE__ */ Pe(), t = Re, { copy: o } = /* @__PURE__ */ mo(), { remove: s } = /* @__PURE__ */ qn(), { mkdirp: l } = /* @__PURE__ */ Ve(), { pathExists: n } = /* @__PURE__ */ yt(), r = /* @__PURE__ */ Nt();
  async function a(f, E, _ = {}) {
    const g = _.overwrite || _.clobber || !1, { srcStat: w, isChangingCase: b = !1 } = await r.checkPaths(f, E, "move", _);
    await r.checkParentPaths(f, w, E, "move");
    const u = t.dirname(E);
    return t.parse(u).root !== u && await l(u), c(f, E, g, b);
  }
  async function c(f, E, _, g) {
    if (!g) {
      if (_)
        await s(E);
      else if (await n(E))
        throw new Error("dest already exists.");
    }
    try {
      await e.rename(f, E);
    } catch (w) {
      if (w.code !== "EXDEV")
        throw w;
      await d(f, E, _);
    }
  }
  async function d(f, E, _) {
    return await o(f, E, {
      overwrite: _,
      errorOnExist: !0,
      preserveTimestamps: !0
    }), s(f);
  }
  return Ts = a, Ts;
}
var Cs, ma;
function Nd() {
  if (ma) return Cs;
  ma = 1;
  const e = qt(), t = Re, o = mo().copySync, s = qn().removeSync, l = Ve().mkdirpSync, n = /* @__PURE__ */ Nt();
  function r(E, _, g) {
    g = g || {};
    const w = g.overwrite || g.clobber || !1, { srcStat: b, isChangingCase: u = !1 } = n.checkPathsSync(E, _, "move", g);
    return n.checkParentPathsSync(E, b, _, "move"), a(_) || l(t.dirname(_)), c(E, _, w, u);
  }
  function a(E) {
    const _ = t.dirname(E);
    return t.parse(_).root === _;
  }
  function c(E, _, g, w) {
    if (w) return d(E, _, g);
    if (g)
      return s(_), d(E, _, g);
    if (e.existsSync(_)) throw new Error("dest already exists.");
    return d(E, _, g);
  }
  function d(E, _, g) {
    try {
      e.renameSync(E, _);
    } catch (w) {
      if (w.code !== "EXDEV") throw w;
      return f(E, _, g);
    }
  }
  function f(E, _, g) {
    return o(E, _, {
      overwrite: g,
      errorOnExist: !0,
      preserveTimestamps: !0
    }), s(E);
  }
  return Cs = r, Cs;
}
var Ds, pa;
function Pd() {
  if (pa) return Ds;
  pa = 1;
  const e = ve().fromPromise;
  return Ds = {
    move: e(/* @__PURE__ */ Rd()),
    moveSync: /* @__PURE__ */ Nd()
  }, Ds;
}
var As, ya;
function Id() {
  return ya || (ya = 1, As = {
    // Export promiseified graceful-fs:
    .../* @__PURE__ */ Pe(),
    // Export extra methods:
    .../* @__PURE__ */ mo(),
    .../* @__PURE__ */ hd(),
    .../* @__PURE__ */ gd(),
    .../* @__PURE__ */ bd(),
    .../* @__PURE__ */ Ve(),
    .../* @__PURE__ */ Pd(),
    .../* @__PURE__ */ yo(),
    .../* @__PURE__ */ yt(),
    .../* @__PURE__ */ qn()
  }), As;
}
var De = /* @__PURE__ */ Id();
const pt = (e) => {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
}, Rf = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), Nf = 1e6, Od = (e) => e >= "0" && e <= "9";
function Pf(e) {
  if (e === "0")
    return !0;
  if (/^[1-9]\d*$/.test(e)) {
    const t = Number.parseInt(e, 10);
    return t <= Number.MAX_SAFE_INTEGER && t <= Nf;
  }
  return !1;
}
function js(e, t) {
  return Rf.has(e) ? !1 : (e && Pf(e) ? t.push(Number.parseInt(e, 10)) : t.push(e), !0);
}
function Td(e) {
  if (typeof e != "string")
    throw new TypeError(`Expected a string, got ${typeof e}`);
  const t = [];
  let o = "", s = "start", l = !1, n = 0;
  for (const r of e) {
    if (n++, l) {
      o += r, l = !1;
      continue;
    }
    if (r === "\\") {
      if (s === "index")
        throw new Error(`Invalid character '${r}' in an index at position ${n}`);
      if (s === "indexEnd")
        throw new Error(`Invalid character '${r}' after an index at position ${n}`);
      l = !0, s = s === "start" ? "property" : s;
      continue;
    }
    switch (r) {
      case ".": {
        if (s === "index")
          throw new Error(`Invalid character '${r}' in an index at position ${n}`);
        if (s === "indexEnd") {
          s = "property";
          break;
        }
        if (!js(o, t))
          return [];
        o = "", s = "property";
        break;
      }
      case "[": {
        if (s === "index")
          throw new Error(`Invalid character '${r}' in an index at position ${n}`);
        if (s === "indexEnd") {
          s = "index";
          break;
        }
        if (s === "property" || s === "start") {
          if ((o || s === "property") && !js(o, t))
            return [];
          o = "";
        }
        s = "index";
        break;
      }
      case "]": {
        if (s === "index") {
          if (o === "")
            o = (t.pop() || "") + "[]", s = "property";
          else {
            const a = Number.parseInt(o, 10);
            !Number.isNaN(a) && Number.isFinite(a) && a >= 0 && a <= Number.MAX_SAFE_INTEGER && a <= Nf && o === String(a) ? t.push(a) : t.push(o), o = "", s = "indexEnd";
          }
          break;
        }
        if (s === "indexEnd")
          throw new Error(`Invalid character '${r}' after an index at position ${n}`);
        o += r;
        break;
      }
      default: {
        if (s === "index" && !Od(r))
          throw new Error(`Invalid character '${r}' in an index at position ${n}`);
        if (s === "indexEnd")
          throw new Error(`Invalid character '${r}' after an index at position ${n}`);
        s === "start" && (s = "property"), o += r;
      }
    }
  }
  switch (l && (o += "\\"), s) {
    case "property": {
      if (!js(o, t))
        return [];
      break;
    }
    case "index":
      throw new Error("Index was not closed");
    case "start": {
      t.push("");
      break;
    }
  }
  return t;
}
function Fn(e) {
  if (typeof e == "string")
    return Td(e);
  if (Array.isArray(e)) {
    const t = [];
    for (const [o, s] of e.entries()) {
      if (typeof s != "string" && typeof s != "number")
        throw new TypeError(`Expected a string or number for path segment at index ${o}, got ${typeof s}`);
      if (typeof s == "number" && !Number.isFinite(s))
        throw new TypeError(`Path segment at index ${o} must be a finite number, got ${s}`);
      if (Rf.has(s))
        return [];
      typeof s == "string" && Pf(s) ? t.push(Number.parseInt(s, 10)) : t.push(s);
    }
    return t;
  }
  return [];
}
function va(e, t, o) {
  if (!pt(e) || typeof t != "string" && !Array.isArray(t))
    return o === void 0 ? e : o;
  const s = Fn(t);
  if (s.length === 0)
    return o;
  for (let l = 0; l < s.length; l++) {
    const n = s[l];
    if (e = e[n], e == null) {
      if (l !== s.length - 1)
        return o;
      break;
    }
  }
  return e === void 0 ? o : e;
}
function Ht(e, t, o) {
  if (!pt(e) || typeof t != "string" && !Array.isArray(t))
    return e;
  const s = e, l = Fn(t);
  if (l.length === 0)
    return e;
  for (let n = 0; n < l.length; n++) {
    const r = l[n];
    if (n === l.length - 1)
      e[r] = o;
    else if (!pt(e[r])) {
      const c = typeof l[n + 1] == "number";
      e[r] = c ? [] : {};
    }
    e = e[r];
  }
  return s;
}
function Cd(e, t) {
  if (!pt(e) || typeof t != "string" && !Array.isArray(t))
    return !1;
  const o = Fn(t);
  if (o.length === 0)
    return !1;
  for (let s = 0; s < o.length; s++) {
    const l = o[s];
    if (s === o.length - 1)
      return Object.hasOwn(e, l) ? (delete e[l], !0) : !1;
    if (e = e[l], !pt(e))
      return !1;
  }
}
function ks(e, t) {
  if (!pt(e) || typeof t != "string" && !Array.isArray(t))
    return !1;
  const o = Fn(t);
  if (o.length === 0)
    return !1;
  for (const s of o) {
    if (!pt(e) || !(s in e))
      return !1;
    e = e[s];
  }
  return !0;
}
const rt = wf.homedir(), vo = wf.tmpdir(), { env: bt } = we, Dd = (e) => {
  const t = ce.join(rt, "Library");
  return {
    data: ce.join(t, "Application Support", e),
    config: ce.join(t, "Preferences", e),
    cache: ce.join(t, "Caches", e),
    log: ce.join(t, "Logs", e),
    temp: ce.join(vo, e)
  };
}, Ad = (e) => {
  const t = bt.APPDATA || ce.join(rt, "AppData", "Roaming"), o = bt.LOCALAPPDATA || ce.join(rt, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: ce.join(o, e, "Data"),
    config: ce.join(t, e, "Config"),
    cache: ce.join(o, e, "Cache"),
    log: ce.join(o, e, "Log"),
    temp: ce.join(vo, e)
  };
}, jd = (e) => {
  const t = ce.basename(rt);
  return {
    data: ce.join(bt.XDG_DATA_HOME || ce.join(rt, ".local", "share"), e),
    config: ce.join(bt.XDG_CONFIG_HOME || ce.join(rt, ".config"), e),
    cache: ce.join(bt.XDG_CACHE_HOME || ce.join(rt, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: ce.join(bt.XDG_STATE_HOME || ce.join(rt, ".local", "state"), e),
    temp: ce.join(vo, t, e)
  };
};
function kd(e, { suffix: t = "nodejs" } = {}) {
  if (typeof e != "string")
    throw new TypeError(`Expected a string, got ${typeof e}`);
  return t && (e += `-${t}`), we.platform === "darwin" ? Dd(e) : we.platform === "win32" ? Ad(e) : jd(e);
}
const We = (e, t) => {
  const { onError: o } = t;
  return function(...l) {
    return e.apply(void 0, l).catch(o);
  };
}, ze = (e, t) => {
  const { onError: o } = t;
  return function(...l) {
    try {
      return e.apply(void 0, l);
    } catch (n) {
      return o(n);
    }
  };
}, Ld = 250, Ze = (e, t) => {
  const { isRetriable: o } = t;
  return function(l) {
    const { timeout: n } = l, r = l.interval ?? Ld, a = Date.now() + n;
    return function c(...d) {
      return e.apply(void 0, d).catch((f) => {
        if (!o(f) || Date.now() >= a)
          throw f;
        const E = Math.round(r * Math.random());
        return E > 0 ? new Promise((g) => setTimeout(g, E)).then(() => c.apply(void 0, d)) : c.apply(void 0, d);
      });
    };
  };
}, Xe = (e, t) => {
  const { isRetriable: o } = t;
  return function(l) {
    const { timeout: n } = l, r = Date.now() + n;
    return function(...c) {
      for (; ; )
        try {
          return e.apply(void 0, c);
        } catch (d) {
          if (!o(d) || Date.now() >= r)
            throw d;
          continue;
        }
    };
  };
}, Rt = {
  /* API */
  isChangeErrorOk: (e) => {
    if (!Rt.isNodeError(e))
      return !1;
    const { code: t } = e;
    return t === "ENOSYS" || !qd && (t === "EINVAL" || t === "EPERM");
  },
  isNodeError: (e) => e instanceof Error,
  isRetriableError: (e) => {
    if (!Rt.isNodeError(e))
      return !1;
    const { code: t } = e;
    return t === "EMFILE" || t === "ENFILE" || t === "EAGAIN" || t === "EBUSY" || t === "EACCESS" || t === "EACCES" || t === "EACCS" || t === "EPERM";
  },
  onChangeError: (e) => {
    if (!Rt.isNodeError(e))
      throw e;
    if (!Rt.isChangeErrorOk(e))
      throw e;
  }
}, Bt = {
  onError: Rt.onChangeError
}, Oe = {
  onError: () => {
  }
}, qd = we.getuid ? !we.getuid() : !1, ge = {
  isRetriable: Rt.isRetriableError
}, _e = {
  attempt: {
    /* ASYNC */
    chmod: We($e(Q.chmod), Bt),
    chown: We($e(Q.chown), Bt),
    close: We($e(Q.close), Oe),
    fsync: We($e(Q.fsync), Oe),
    mkdir: We($e(Q.mkdir), Oe),
    realpath: We($e(Q.realpath), Oe),
    stat: We($e(Q.stat), Oe),
    unlink: We($e(Q.unlink), Oe),
    /* SYNC */
    chmodSync: ze(Q.chmodSync, Bt),
    chownSync: ze(Q.chownSync, Bt),
    closeSync: ze(Q.closeSync, Oe),
    existsSync: ze(Q.existsSync, Oe),
    fsyncSync: ze(Q.fsync, Oe),
    mkdirSync: ze(Q.mkdirSync, Oe),
    realpathSync: ze(Q.realpathSync, Oe),
    statSync: ze(Q.statSync, Oe),
    unlinkSync: ze(Q.unlinkSync, Oe)
  },
  retry: {
    /* ASYNC */
    close: Ze($e(Q.close), ge),
    fsync: Ze($e(Q.fsync), ge),
    open: Ze($e(Q.open), ge),
    readFile: Ze($e(Q.readFile), ge),
    rename: Ze($e(Q.rename), ge),
    stat: Ze($e(Q.stat), ge),
    write: Ze($e(Q.write), ge),
    writeFile: Ze($e(Q.writeFile), ge),
    /* SYNC */
    closeSync: Xe(Q.closeSync, ge),
    fsyncSync: Xe(Q.fsyncSync, ge),
    openSync: Xe(Q.openSync, ge),
    readFileSync: Xe(Q.readFileSync, ge),
    renameSync: Xe(Q.renameSync, ge),
    statSync: Xe(Q.statSync, ge),
    writeSync: Xe(Q.writeSync, ge),
    writeFileSync: Xe(Q.writeFileSync, ge)
  }
}, Fd = "utf8", $a = 438, Md = 511, Ud = {}, Vd = we.geteuid ? we.geteuid() : -1, zd = we.getegid ? we.getegid() : -1, Gd = 1e3, Kd = !!we.getuid;
we.getuid && we.getuid();
const ga = 128, Hd = (e) => e instanceof Error && "code" in e, _a = (e) => typeof e == "string", Ls = (e) => e === void 0;
class Bd {
  /* CONSTRUCTOR */
  constructor() {
    this.callbacks = /* @__PURE__ */ new Set(), this.exit = () => {
      for (const t of this.callbacks)
        t();
    }, this.hook = () => {
      window.addEventListener("beforeunload", this.exit);
    }, this.register = (t) => (this.callbacks.add(t), () => {
      this.callbacks.delete(t);
    }), this.hook();
  }
}
const xd = new Bd(), Jd = xd.register, Ee = {
  /* VARIABLES */
  store: {},
  // filePath => purge
  /* API */
  create: (e) => {
    const t = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), l = `.tmp-${Date.now().toString().slice(-10)}${t}`;
    return `${e}${l}`;
  },
  get: (e, t, o = !0) => {
    const s = Ee.truncate(t(e));
    return s in Ee.store ? Ee.get(e, t, o) : (Ee.store[s] = o, [s, () => delete Ee.store[s]]);
  },
  purge: (e) => {
    Ee.store[e] && (delete Ee.store[e], _e.attempt.unlink(e));
  },
  purgeSync: (e) => {
    Ee.store[e] && (delete Ee.store[e], _e.attempt.unlinkSync(e));
  },
  purgeSyncAll: () => {
    for (const e in Ee.store)
      Ee.purgeSync(e);
  },
  truncate: (e) => {
    const t = ce.basename(e);
    if (t.length <= ga)
      return e;
    const o = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(t);
    if (!o)
      return e;
    const s = t.length - ga;
    return `${e.slice(0, -t.length)}${o[1]}${o[2].slice(0, -s)}${o[3]}`;
  }
};
Jd(Ee.purgeSyncAll);
function If(e, t, o = Ud) {
  if (_a(o))
    return If(e, t, { encoding: o });
  const l = { timeout: o.timeout ?? Gd };
  let n = null, r = null, a = null;
  try {
    const c = _e.attempt.realpathSync(e), d = !!c;
    e = c || e, [r, n] = Ee.get(e, o.tmpCreate || Ee.create, o.tmpPurge !== !1);
    const f = Kd && Ls(o.chown), E = Ls(o.mode);
    if (d && (f || E)) {
      const _ = _e.attempt.statSync(e);
      _ && (o = { ...o }, f && (o.chown = { uid: _.uid, gid: _.gid }), E && (o.mode = _.mode));
    }
    if (!d) {
      const _ = ce.dirname(e);
      _e.attempt.mkdirSync(_, {
        mode: Md,
        recursive: !0
      });
    }
    a = _e.retry.openSync(l)(r, "w", o.mode || $a), o.tmpCreated && o.tmpCreated(r), _a(t) ? _e.retry.writeSync(l)(a, t, 0, o.encoding || Fd) : Ls(t) || _e.retry.writeSync(l)(a, t, 0, t.length, 0), o.fsync !== !1 && (o.fsyncWait !== !1 ? _e.retry.fsyncSync(l)(a) : _e.attempt.fsync(a)), _e.retry.closeSync(l)(a), a = null, o.chown && (o.chown.uid !== Vd || o.chown.gid !== zd) && _e.attempt.chownSync(r, o.chown.uid, o.chown.gid), o.mode && o.mode !== $a && _e.attempt.chmodSync(r, o.mode);
    try {
      _e.retry.renameSync(l)(r, e);
    } catch (_) {
      if (!Hd(_) || _.code !== "ENAMETOOLONG")
        throw _;
      _e.retry.renameSync(l)(r, Ee.truncate(e));
    }
    n(), r = null;
  } finally {
    a && _e.attempt.closeSync(a), r && Ee.purge(r);
  }
}
var xt = { exports: {} }, qs = {}, Ge = {}, ct = {}, Fs = {}, Ms = {}, Us = {}, Ea;
function An() {
  return Ea || (Ea = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
    class t {
    }
    e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
    class o extends t {
      constructor(i) {
        if (super(), !e.IDENTIFIER.test(i))
          throw new Error("CodeGen: name must be a valid identifier");
        this.str = i;
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
    class s extends t {
      constructor(i) {
        super(), this._items = typeof i == "string" ? [i] : i;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        if (this._items.length > 1)
          return !1;
        const i = this._items[0];
        return i === "" || i === '""';
      }
      get str() {
        var i;
        return (i = this._str) !== null && i !== void 0 ? i : this._str = this._items.reduce((p, v) => `${p}${v}`, "");
      }
      get names() {
        var i;
        return (i = this._names) !== null && i !== void 0 ? i : this._names = this._items.reduce((p, v) => (v instanceof o && (p[v.str] = (p[v.str] || 0) + 1), p), {});
      }
    }
    e._Code = s, e.nil = new s("");
    function l(h, ...i) {
      const p = [h[0]];
      let v = 0;
      for (; v < i.length; )
        a(p, i[v]), p.push(h[++v]);
      return new s(p);
    }
    e._ = l;
    const n = new s("+");
    function r(h, ...i) {
      const p = [g(h[0])];
      let v = 0;
      for (; v < i.length; )
        p.push(n), a(p, i[v]), p.push(n, g(h[++v]));
      return c(p), new s(p);
    }
    e.str = r;
    function a(h, i) {
      i instanceof s ? h.push(...i._items) : i instanceof o ? h.push(i) : h.push(E(i));
    }
    e.addCodeArg = a;
    function c(h) {
      let i = 1;
      for (; i < h.length - 1; ) {
        if (h[i] === n) {
          const p = d(h[i - 1], h[i + 1]);
          if (p !== void 0) {
            h.splice(i - 1, 3, p);
            continue;
          }
          h[i++] = "+";
        }
        i++;
      }
    }
    function d(h, i) {
      if (i === '""')
        return h;
      if (h === '""')
        return i;
      if (typeof h == "string")
        return i instanceof o || h[h.length - 1] !== '"' ? void 0 : typeof i != "string" ? `${h.slice(0, -1)}${i}"` : i[0] === '"' ? h.slice(0, -1) + i.slice(1) : void 0;
      if (typeof i == "string" && i[0] === '"' && !(h instanceof o))
        return `"${h}${i.slice(1)}`;
    }
    function f(h, i) {
      return i.emptyStr() ? h : h.emptyStr() ? i : r`${h}${i}`;
    }
    e.strConcat = f;
    function E(h) {
      return typeof h == "number" || typeof h == "boolean" || h === null ? h : g(Array.isArray(h) ? h.join(",") : h);
    }
    function _(h) {
      return new s(g(h));
    }
    e.stringify = _;
    function g(h) {
      return JSON.stringify(h).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
    }
    e.safeStringify = g;
    function w(h) {
      return typeof h == "string" && e.IDENTIFIER.test(h) ? new s(`.${h}`) : l`[${h}]`;
    }
    e.getProperty = w;
    function b(h) {
      if (typeof h == "string" && e.IDENTIFIER.test(h))
        return new s(`${h}`);
      throw new Error(`CodeGen: invalid export name: ${h}, use explicit $id name mapping`);
    }
    e.getEsmExportName = b;
    function u(h) {
      return new s(h.toString());
    }
    e.regexpCode = u;
  }(Us)), Us;
}
var Vs = {}, wa;
function Sa() {
  return wa || (wa = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
    const t = An();
    class o extends Error {
      constructor(d) {
        super(`CodeGen: "code" for ${d} not defined`), this.value = d.value;
      }
    }
    var s;
    (function(c) {
      c[c.Started = 0] = "Started", c[c.Completed = 1] = "Completed";
    })(s || (e.UsedValueState = s = {})), e.varKinds = {
      const: new t.Name("const"),
      let: new t.Name("let"),
      var: new t.Name("var")
    };
    class l {
      constructor({ prefixes: d, parent: f } = {}) {
        this._names = {}, this._prefixes = d, this._parent = f;
      }
      toName(d) {
        return d instanceof t.Name ? d : this.name(d);
      }
      name(d) {
        return new t.Name(this._newName(d));
      }
      _newName(d) {
        const f = this._names[d] || this._nameGroup(d);
        return `${d}${f.index++}`;
      }
      _nameGroup(d) {
        var f, E;
        if (!((E = (f = this._parent) === null || f === void 0 ? void 0 : f._prefixes) === null || E === void 0) && E.has(d) || this._prefixes && !this._prefixes.has(d))
          throw new Error(`CodeGen: prefix "${d}" is not allowed in this scope`);
        return this._names[d] = { prefix: d, index: 0 };
      }
    }
    e.Scope = l;
    class n extends t.Name {
      constructor(d, f) {
        super(f), this.prefix = d;
      }
      setValue(d, { property: f, itemIndex: E }) {
        this.value = d, this.scopePath = (0, t._)`.${new t.Name(f)}[${E}]`;
      }
    }
    e.ValueScopeName = n;
    const r = (0, t._)`\n`;
    class a extends l {
      constructor(d) {
        super(d), this._values = {}, this._scope = d.scope, this.opts = { ...d, _n: d.lines ? r : t.nil };
      }
      get() {
        return this._scope;
      }
      name(d) {
        return new n(d, this._newName(d));
      }
      value(d, f) {
        var E;
        if (f.ref === void 0)
          throw new Error("CodeGen: ref must be passed in value");
        const _ = this.toName(d), { prefix: g } = _, w = (E = f.key) !== null && E !== void 0 ? E : f.ref;
        let b = this._values[g];
        if (b) {
          const i = b.get(w);
          if (i)
            return i;
        } else
          b = this._values[g] = /* @__PURE__ */ new Map();
        b.set(w, _);
        const u = this._scope[g] || (this._scope[g] = []), h = u.length;
        return u[h] = f.ref, _.setValue(f, { property: g, itemIndex: h }), _;
      }
      getValue(d, f) {
        const E = this._values[d];
        if (E)
          return E.get(f);
      }
      scopeRefs(d, f = this._values) {
        return this._reduceValues(f, (E) => {
          if (E.scopePath === void 0)
            throw new Error(`CodeGen: name "${E}" has no value`);
          return (0, t._)`${d}${E.scopePath}`;
        });
      }
      scopeCode(d = this._values, f, E) {
        return this._reduceValues(d, (_) => {
          if (_.value === void 0)
            throw new Error(`CodeGen: name "${_}" has no value`);
          return _.value.code;
        }, f, E);
      }
      _reduceValues(d, f, E = {}, _) {
        let g = t.nil;
        for (const w in d) {
          const b = d[w];
          if (!b)
            continue;
          const u = E[w] = E[w] || /* @__PURE__ */ new Map();
          b.forEach((h) => {
            if (u.has(h))
              return;
            u.set(h, s.Started);
            let i = f(h);
            if (i) {
              const p = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
              g = (0, t._)`${g}${p} ${h} = ${i};${this.opts._n}`;
            } else if (i = _?.(h))
              g = (0, t._)`${g}${i}${this.opts._n}`;
            else
              throw new o(h);
            u.set(h, s.Completed);
          });
        }
        return g;
      }
    }
    e.ValueScope = a;
  }(Vs)), Vs;
}
var ba;
function ee() {
  return ba || (ba = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
    const t = An(), o = Sa();
    var s = An();
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
    var l = Sa();
    Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
      return l.Scope;
    } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
      return l.ValueScope;
    } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
      return l.ValueScopeName;
    } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
      return l.varKinds;
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
    class n {
      optimizeNodes() {
        return this;
      }
      optimizeNames(S, N) {
        return this;
      }
    }
    class r extends n {
      constructor(S, N, D) {
        super(), this.varKind = S, this.name = N, this.rhs = D;
      }
      render({ es5: S, _n: N }) {
        const D = S ? o.varKinds.var : this.varKind, G = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
        return `${D} ${this.name}${G};` + N;
      }
      optimizeNames(S, N) {
        if (S[this.name.str])
          return this.rhs && (this.rhs = M(this.rhs, S, N)), this;
      }
      get names() {
        return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
      }
    }
    class a extends n {
      constructor(S, N, D) {
        super(), this.lhs = S, this.rhs = N, this.sideEffects = D;
      }
      render({ _n: S }) {
        return `${this.lhs} = ${this.rhs};` + S;
      }
      optimizeNames(S, N) {
        if (!(this.lhs instanceof t.Name && !S[this.lhs.str] && !this.sideEffects))
          return this.rhs = M(this.rhs, S, N), this;
      }
      get names() {
        const S = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
        return F(S, this.rhs);
      }
    }
    class c extends a {
      constructor(S, N, D, G) {
        super(S, D, G), this.op = N;
      }
      render({ _n: S }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + S;
      }
    }
    class d extends n {
      constructor(S) {
        super(), this.label = S, this.names = {};
      }
      render({ _n: S }) {
        return `${this.label}:` + S;
      }
    }
    class f extends n {
      constructor(S) {
        super(), this.label = S, this.names = {};
      }
      render({ _n: S }) {
        return `break${this.label ? ` ${this.label}` : ""};` + S;
      }
    }
    class E extends n {
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
    class _ extends n {
      constructor(S) {
        super(), this.code = S;
      }
      render({ _n: S }) {
        return `${this.code};` + S;
      }
      optimizeNodes() {
        return `${this.code}` ? this : void 0;
      }
      optimizeNames(S, N) {
        return this.code = M(this.code, S, N), this;
      }
      get names() {
        return this.code instanceof t._CodeOrName ? this.code.names : {};
      }
    }
    class g extends n {
      constructor(S = []) {
        super(), this.nodes = S;
      }
      render(S) {
        return this.nodes.reduce((N, D) => N + D.render(S), "");
      }
      optimizeNodes() {
        const { nodes: S } = this;
        let N = S.length;
        for (; N--; ) {
          const D = S[N].optimizeNodes();
          Array.isArray(D) ? S.splice(N, 1, ...D) : D ? S[N] = D : S.splice(N, 1);
        }
        return S.length > 0 ? this : void 0;
      }
      optimizeNames(S, N) {
        const { nodes: D } = this;
        let G = D.length;
        for (; G--; ) {
          const H = D[G];
          H.optimizeNames(S, N) || (z(S, H.names), D.splice(G, 1));
        }
        return D.length > 0 ? this : void 0;
      }
      get names() {
        return this.nodes.reduce((S, N) => V(S, N.names), {});
      }
    }
    class w extends g {
      render(S) {
        return "{" + S._n + super.render(S) + "}" + S._n;
      }
    }
    class b extends g {
    }
    class u extends w {
    }
    u.kind = "else";
    class h extends w {
      constructor(S, N) {
        super(N), this.condition = S;
      }
      render(S) {
        let N = `if(${this.condition})` + super.render(S);
        return this.else && (N += "else " + this.else.render(S)), N;
      }
      optimizeNodes() {
        super.optimizeNodes();
        const S = this.condition;
        if (S === !0)
          return this.nodes;
        let N = this.else;
        if (N) {
          const D = N.optimizeNodes();
          N = this.else = Array.isArray(D) ? new u(D) : D;
        }
        if (N)
          return S === !1 ? N instanceof h ? N : N.nodes : this.nodes.length ? this : new h(J(S), N instanceof h ? [N] : N.nodes);
        if (!(S === !1 || !this.nodes.length))
          return this;
      }
      optimizeNames(S, N) {
        var D;
        if (this.else = (D = this.else) === null || D === void 0 ? void 0 : D.optimizeNames(S, N), !!(super.optimizeNames(S, N) || this.else))
          return this.condition = M(this.condition, S, N), this;
      }
      get names() {
        const S = super.names;
        return F(S, this.condition), this.else && V(S, this.else.names), S;
      }
    }
    h.kind = "if";
    class i extends w {
    }
    i.kind = "for";
    class p extends i {
      constructor(S) {
        super(), this.iteration = S;
      }
      render(S) {
        return `for(${this.iteration})` + super.render(S);
      }
      optimizeNames(S, N) {
        if (super.optimizeNames(S, N))
          return this.iteration = M(this.iteration, S, N), this;
      }
      get names() {
        return V(super.names, this.iteration.names);
      }
    }
    class v extends i {
      constructor(S, N, D, G) {
        super(), this.varKind = S, this.name = N, this.from = D, this.to = G;
      }
      render(S) {
        const N = S.es5 ? o.varKinds.var : this.varKind, { name: D, from: G, to: H } = this;
        return `for(${N} ${D}=${G}; ${D}<${H}; ${D}++)` + super.render(S);
      }
      get names() {
        const S = F(super.names, this.from);
        return F(S, this.to);
      }
    }
    class m extends i {
      constructor(S, N, D, G) {
        super(), this.loop = S, this.varKind = N, this.name = D, this.iterable = G;
      }
      render(S) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(S);
      }
      optimizeNames(S, N) {
        if (super.optimizeNames(S, N))
          return this.iterable = M(this.iterable, S, N), this;
      }
      get names() {
        return V(super.names, this.iterable.names);
      }
    }
    class y extends w {
      constructor(S, N, D) {
        super(), this.name = S, this.args = N, this.async = D;
      }
      render(S) {
        return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(S);
      }
    }
    y.kind = "func";
    class $ extends g {
      render(S) {
        return "return " + super.render(S);
      }
    }
    $.kind = "return";
    class R extends w {
      render(S) {
        let N = "try" + super.render(S);
        return this.catch && (N += this.catch.render(S)), this.finally && (N += this.finally.render(S)), N;
      }
      optimizeNodes() {
        var S, N;
        return super.optimizeNodes(), (S = this.catch) === null || S === void 0 || S.optimizeNodes(), (N = this.finally) === null || N === void 0 || N.optimizeNodes(), this;
      }
      optimizeNames(S, N) {
        var D, G;
        return super.optimizeNames(S, N), (D = this.catch) === null || D === void 0 || D.optimizeNames(S, N), (G = this.finally) === null || G === void 0 || G.optimizeNames(S, N), this;
      }
      get names() {
        const S = super.names;
        return this.catch && V(S, this.catch.names), this.finally && V(S, this.finally.names), S;
      }
    }
    class O extends w {
      constructor(S) {
        super(), this.error = S;
      }
      render(S) {
        return `catch(${this.error})` + super.render(S);
      }
    }
    O.kind = "catch";
    class j extends w {
      render(S) {
        return "finally" + super.render(S);
      }
    }
    j.kind = "finally";
    class L {
      constructor(S, N = {}) {
        this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...N, _n: N.lines ? `
` : "" }, this._extScope = S, this._scope = new o.Scope({ parent: S }), this._nodes = [new b()];
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
      scopeValue(S, N) {
        const D = this._extScope.value(S, N);
        return (this._values[D.prefix] || (this._values[D.prefix] = /* @__PURE__ */ new Set())).add(D), D;
      }
      getScopeValue(S, N) {
        return this._extScope.getValue(S, N);
      }
      // return code that assigns values in the external scope to the names that are used internally
      // (same names that were returned by gen.scopeName or gen.scopeValue)
      scopeRefs(S) {
        return this._extScope.scopeRefs(S, this._values);
      }
      scopeCode() {
        return this._extScope.scopeCode(this._values);
      }
      _def(S, N, D, G) {
        const H = this._scope.toName(N);
        return D !== void 0 && G && (this._constants[H.str] = D), this._leafNode(new r(S, H, D)), H;
      }
      // `const` declaration (`var` in es5 mode)
      const(S, N, D) {
        return this._def(o.varKinds.const, S, N, D);
      }
      // `let` declaration with optional assignment (`var` in es5 mode)
      let(S, N, D) {
        return this._def(o.varKinds.let, S, N, D);
      }
      // `var` declaration with optional assignment
      var(S, N, D) {
        return this._def(o.varKinds.var, S, N, D);
      }
      // assignment code
      assign(S, N, D) {
        return this._leafNode(new a(S, N, D));
      }
      // `+=` code
      add(S, N) {
        return this._leafNode(new c(S, e.operators.ADD, N));
      }
      // appends passed SafeExpr to code or executes Block
      code(S) {
        return typeof S == "function" ? S() : S !== t.nil && this._leafNode(new _(S)), this;
      }
      // returns code for object literal for the passed argument list of key-value pairs
      object(...S) {
        const N = ["{"];
        for (const [D, G] of S)
          N.length > 1 && N.push(","), N.push(D), (D !== G || this.opts.es5) && (N.push(":"), (0, t.addCodeArg)(N, G));
        return N.push("}"), new t._Code(N);
      }
      // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
      if(S, N, D) {
        if (this._blockNode(new h(S)), N && D)
          this.code(N).else().code(D).endIf();
        else if (N)
          this.code(N).endIf();
        else if (D)
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
      _for(S, N) {
        return this._blockNode(S), N && this.code(N).endFor(), this;
      }
      // a generic `for` clause (or statement if `forBody` is passed)
      for(S, N) {
        return this._for(new p(S), N);
      }
      // `for` statement for a range of values
      forRange(S, N, D, G, H = this.opts.es5 ? o.varKinds.var : o.varKinds.let) {
        const X = this._scope.toName(S);
        return this._for(new v(H, X, N, D), () => G(X));
      }
      // `for-of` statement (in es5 mode replace with a normal for loop)
      forOf(S, N, D, G = o.varKinds.const) {
        const H = this._scope.toName(S);
        if (this.opts.es5) {
          const X = N instanceof t.Name ? N : this.var("_arr", N);
          return this.forRange("_i", 0, (0, t._)`${X}.length`, (Z) => {
            this.var(H, (0, t._)`${X}[${Z}]`), D(H);
          });
        }
        return this._for(new m("of", G, H, N), () => D(H));
      }
      // `for-in` statement.
      // With option `ownProperties` replaced with a `for-of` loop for object keys
      forIn(S, N, D, G = this.opts.es5 ? o.varKinds.var : o.varKinds.const) {
        if (this.opts.ownProperties)
          return this.forOf(S, (0, t._)`Object.keys(${N})`, D);
        const H = this._scope.toName(S);
        return this._for(new m("in", G, H, N), () => D(H));
      }
      // end `for` loop
      endFor() {
        return this._endBlockNode(i);
      }
      // `label` statement
      label(S) {
        return this._leafNode(new d(S));
      }
      // `break` statement
      break(S) {
        return this._leafNode(new f(S));
      }
      // `return` statement
      return(S) {
        const N = new $();
        if (this._blockNode(N), this.code(S), N.nodes.length !== 1)
          throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode($);
      }
      // `try` statement
      try(S, N, D) {
        if (!N && !D)
          throw new Error('CodeGen: "try" without "catch" and "finally"');
        const G = new R();
        if (this._blockNode(G), this.code(S), N) {
          const H = this.name("e");
          this._currNode = G.catch = new O(H), N(H);
        }
        return D && (this._currNode = G.finally = new j(), this.code(D)), this._endBlockNode(O, j);
      }
      // `throw` statement
      throw(S) {
        return this._leafNode(new E(S));
      }
      // start self-balancing block
      block(S, N) {
        return this._blockStarts.push(this._nodes.length), S && this.code(S).endBlock(N), this;
      }
      // end the current self-balancing block
      endBlock(S) {
        const N = this._blockStarts.pop();
        if (N === void 0)
          throw new Error("CodeGen: not in self-balancing block");
        const D = this._nodes.length - N;
        if (D < 0 || S !== void 0 && D !== S)
          throw new Error(`CodeGen: wrong number of nodes: ${D} vs ${S} expected`);
        return this._nodes.length = N, this;
      }
      // `function` heading (or definition if funcBody is passed)
      func(S, N = t.nil, D, G) {
        return this._blockNode(new y(S, N, D)), G && this.code(G).endFunc(), this;
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
      _endBlockNode(S, N) {
        const D = this._currNode;
        if (D instanceof S || N && D instanceof N)
          return this._nodes.pop(), this;
        throw new Error(`CodeGen: not in block "${N ? `${S.kind}/${N.kind}` : S.kind}"`);
      }
      _elseNode(S) {
        const N = this._currNode;
        if (!(N instanceof h))
          throw new Error('CodeGen: "else" without "if"');
        return this._currNode = N.else = S, this;
      }
      get _root() {
        return this._nodes[0];
      }
      get _currNode() {
        const S = this._nodes;
        return S[S.length - 1];
      }
      set _currNode(S) {
        const N = this._nodes;
        N[N.length - 1] = S;
      }
    }
    e.CodeGen = L;
    function V(C, S) {
      for (const N in S)
        C[N] = (C[N] || 0) + (S[N] || 0);
      return C;
    }
    function F(C, S) {
      return S instanceof t._CodeOrName ? V(C, S.names) : C;
    }
    function M(C, S, N) {
      if (C instanceof t.Name)
        return D(C);
      if (!G(C))
        return C;
      return new t._Code(C._items.reduce((H, X) => (X instanceof t.Name && (X = D(X)), X instanceof t._Code ? H.push(...X._items) : H.push(X), H), []));
      function D(H) {
        const X = N[H.str];
        return X === void 0 || S[H.str] !== 1 ? H : (delete S[H.str], X);
      }
      function G(H) {
        return H instanceof t._Code && H._items.some((X) => X instanceof t.Name && S[X.str] === 1 && N[X.str] !== void 0);
      }
    }
    function z(C, S) {
      for (const N in S)
        C[N] = (C[N] || 0) - (S[N] || 0);
    }
    function J(C) {
      return typeof C == "boolean" || typeof C == "number" || C === null ? !C : (0, t._)`!${A(C)}`;
    }
    e.not = J;
    const x = I(e.operators.AND);
    function B(...C) {
      return C.reduce(x);
    }
    e.and = B;
    const W = I(e.operators.OR);
    function q(...C) {
      return C.reduce(W);
    }
    e.or = q;
    function I(C) {
      return (S, N) => S === t.nil ? N : N === t.nil ? S : (0, t._)`${A(S)} ${C} ${A(N)}`;
    }
    function A(C) {
      return C instanceof t.Name ? C : (0, t._)`(${C})`;
    }
  }(Ms)), Ms;
}
var te = {}, Ra;
function se() {
  if (Ra) return te;
  Ra = 1, Object.defineProperty(te, "__esModule", { value: !0 }), te.checkStrictMode = te.getErrorPath = te.Type = te.useFunc = te.setEvaluated = te.evaluatedPropsToName = te.mergeEvaluated = te.eachItem = te.unescapeJsonPointer = te.escapeJsonPointer = te.escapeFragment = te.unescapeFragment = te.schemaRefOrVal = te.schemaHasRulesButRef = te.schemaHasRules = te.checkUnknownRules = te.alwaysValidSchema = te.toHash = void 0;
  const e = ee(), t = An();
  function o(m) {
    const y = {};
    for (const $ of m)
      y[$] = !0;
    return y;
  }
  te.toHash = o;
  function s(m, y) {
    return typeof y == "boolean" ? y : Object.keys(y).length === 0 ? !0 : (l(m, y), !n(y, m.self.RULES.all));
  }
  te.alwaysValidSchema = s;
  function l(m, y = m.schema) {
    const { opts: $, self: R } = m;
    if (!$.strictSchema || typeof y == "boolean")
      return;
    const O = R.RULES.keywords;
    for (const j in y)
      O[j] || v(m, `unknown keyword: "${j}"`);
  }
  te.checkUnknownRules = l;
  function n(m, y) {
    if (typeof m == "boolean")
      return !m;
    for (const $ in m)
      if (y[$])
        return !0;
    return !1;
  }
  te.schemaHasRules = n;
  function r(m, y) {
    if (typeof m == "boolean")
      return !m;
    for (const $ in m)
      if ($ !== "$ref" && y.all[$])
        return !0;
    return !1;
  }
  te.schemaHasRulesButRef = r;
  function a({ topSchemaRef: m, schemaPath: y }, $, R, O) {
    if (!O) {
      if (typeof $ == "number" || typeof $ == "boolean")
        return $;
      if (typeof $ == "string")
        return (0, e._)`${$}`;
    }
    return (0, e._)`${m}${y}${(0, e.getProperty)(R)}`;
  }
  te.schemaRefOrVal = a;
  function c(m) {
    return E(decodeURIComponent(m));
  }
  te.unescapeFragment = c;
  function d(m) {
    return encodeURIComponent(f(m));
  }
  te.escapeFragment = d;
  function f(m) {
    return typeof m == "number" ? `${m}` : m.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  te.escapeJsonPointer = f;
  function E(m) {
    return m.replace(/~1/g, "/").replace(/~0/g, "~");
  }
  te.unescapeJsonPointer = E;
  function _(m, y) {
    if (Array.isArray(m))
      for (const $ of m)
        y($);
    else
      y(m);
  }
  te.eachItem = _;
  function g({ mergeNames: m, mergeToName: y, mergeValues: $, resultToName: R }) {
    return (O, j, L, V) => {
      const F = L === void 0 ? j : L instanceof e.Name ? (j instanceof e.Name ? m(O, j, L) : y(O, j, L), L) : j instanceof e.Name ? (y(O, L, j), j) : $(j, L);
      return V === e.Name && !(F instanceof e.Name) ? R(O, F) : F;
    };
  }
  te.mergeEvaluated = {
    props: g({
      mergeNames: (m, y, $) => m.if((0, e._)`${$} !== true && ${y} !== undefined`, () => {
        m.if((0, e._)`${y} === true`, () => m.assign($, !0), () => m.assign($, (0, e._)`${$} || {}`).code((0, e._)`Object.assign(${$}, ${y})`));
      }),
      mergeToName: (m, y, $) => m.if((0, e._)`${$} !== true`, () => {
        y === !0 ? m.assign($, !0) : (m.assign($, (0, e._)`${$} || {}`), b(m, $, y));
      }),
      mergeValues: (m, y) => m === !0 ? !0 : { ...m, ...y },
      resultToName: w
    }),
    items: g({
      mergeNames: (m, y, $) => m.if((0, e._)`${$} !== true && ${y} !== undefined`, () => m.assign($, (0, e._)`${y} === true ? true : ${$} > ${y} ? ${$} : ${y}`)),
      mergeToName: (m, y, $) => m.if((0, e._)`${$} !== true`, () => m.assign($, y === !0 ? !0 : (0, e._)`${$} > ${y} ? ${$} : ${y}`)),
      mergeValues: (m, y) => m === !0 ? !0 : Math.max(m, y),
      resultToName: (m, y) => m.var("items", y)
    })
  };
  function w(m, y) {
    if (y === !0)
      return m.var("props", !0);
    const $ = m.var("props", (0, e._)`{}`);
    return y !== void 0 && b(m, $, y), $;
  }
  te.evaluatedPropsToName = w;
  function b(m, y, $) {
    Object.keys($).forEach((R) => m.assign((0, e._)`${y}${(0, e.getProperty)(R)}`, !0));
  }
  te.setEvaluated = b;
  const u = {};
  function h(m, y) {
    return m.scopeValue("func", {
      ref: y,
      code: u[y.code] || (u[y.code] = new t._Code(y.code))
    });
  }
  te.useFunc = h;
  var i;
  (function(m) {
    m[m.Num = 0] = "Num", m[m.Str = 1] = "Str";
  })(i || (te.Type = i = {}));
  function p(m, y, $) {
    if (m instanceof e.Name) {
      const R = y === i.Num;
      return $ ? R ? (0, e._)`"[" + ${m} + "]"` : (0, e._)`"['" + ${m} + "']"` : R ? (0, e._)`"/" + ${m}` : (0, e._)`"/" + ${m}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
    }
    return $ ? (0, e.getProperty)(m).toString() : "/" + f(m);
  }
  te.getErrorPath = p;
  function v(m, y, $ = m.opts.strictSchema) {
    if ($) {
      if (y = `strict mode: ${y}`, $ === !0)
        throw new Error(y);
      m.self.logger.warn(y);
    }
  }
  return te.checkStrictMode = v, te;
}
var Jt = {}, Na;
function Le() {
  if (Na) return Jt;
  Na = 1, Object.defineProperty(Jt, "__esModule", { value: !0 });
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
  return Jt.default = t, Jt;
}
var Pa;
function Mn() {
  return Pa || (Pa = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
    const t = ee(), o = se(), s = Le();
    e.keywordError = {
      message: ({ keyword: u }) => (0, t.str)`must pass "${u}" keyword validation`
    }, e.keyword$DataError = {
      message: ({ keyword: u, schemaType: h }) => h ? (0, t.str)`"${u}" keyword must be ${h} ($data)` : (0, t.str)`"${u}" keyword is invalid ($data)`
    };
    function l(u, h = e.keywordError, i, p) {
      const { it: v } = u, { gen: m, compositeRule: y, allErrors: $ } = v, R = E(u, h, i);
      p ?? (y || $) ? c(m, R) : d(v, (0, t._)`[${R}]`);
    }
    e.reportError = l;
    function n(u, h = e.keywordError, i) {
      const { it: p } = u, { gen: v, compositeRule: m, allErrors: y } = p, $ = E(u, h, i);
      c(v, $), m || y || d(p, s.default.vErrors);
    }
    e.reportExtraError = n;
    function r(u, h) {
      u.assign(s.default.errors, h), u.if((0, t._)`${s.default.vErrors} !== null`, () => u.if(h, () => u.assign((0, t._)`${s.default.vErrors}.length`, h), () => u.assign(s.default.vErrors, null)));
    }
    e.resetErrorsCount = r;
    function a({ gen: u, keyword: h, schemaValue: i, data: p, errsCount: v, it: m }) {
      if (v === void 0)
        throw new Error("ajv implementation error");
      const y = u.name("err");
      u.forRange("i", v, s.default.errors, ($) => {
        u.const(y, (0, t._)`${s.default.vErrors}[${$}]`), u.if((0, t._)`${y}.instancePath === undefined`, () => u.assign((0, t._)`${y}.instancePath`, (0, t.strConcat)(s.default.instancePath, m.errorPath))), u.assign((0, t._)`${y}.schemaPath`, (0, t.str)`${m.errSchemaPath}/${h}`), m.opts.verbose && (u.assign((0, t._)`${y}.schema`, i), u.assign((0, t._)`${y}.data`, p));
      });
    }
    e.extendErrors = a;
    function c(u, h) {
      const i = u.const("err", h);
      u.if((0, t._)`${s.default.vErrors} === null`, () => u.assign(s.default.vErrors, (0, t._)`[${i}]`), (0, t._)`${s.default.vErrors}.push(${i})`), u.code((0, t._)`${s.default.errors}++`);
    }
    function d(u, h) {
      const { gen: i, validateName: p, schemaEnv: v } = u;
      v.$async ? i.throw((0, t._)`new ${u.ValidationError}(${h})`) : (i.assign((0, t._)`${p}.errors`, h), i.return(!1));
    }
    const f = {
      keyword: new t.Name("keyword"),
      schemaPath: new t.Name("schemaPath"),
      // also used in JTD errors
      params: new t.Name("params"),
      propertyName: new t.Name("propertyName"),
      message: new t.Name("message"),
      schema: new t.Name("schema"),
      parentSchema: new t.Name("parentSchema")
    };
    function E(u, h, i) {
      const { createErrors: p } = u.it;
      return p === !1 ? (0, t._)`{}` : _(u, h, i);
    }
    function _(u, h, i = {}) {
      const { gen: p, it: v } = u, m = [
        g(v, i),
        w(u, i)
      ];
      return b(u, h, m), p.object(...m);
    }
    function g({ errorPath: u }, { instancePath: h }) {
      const i = h ? (0, t.str)`${u}${(0, o.getErrorPath)(h, o.Type.Str)}` : u;
      return [s.default.instancePath, (0, t.strConcat)(s.default.instancePath, i)];
    }
    function w({ keyword: u, it: { errSchemaPath: h } }, { schemaPath: i, parentSchema: p }) {
      let v = p ? h : (0, t.str)`${h}/${u}`;
      return i && (v = (0, t.str)`${v}${(0, o.getErrorPath)(i, o.Type.Str)}`), [f.schemaPath, v];
    }
    function b(u, { params: h, message: i }, p) {
      const { keyword: v, data: m, schemaValue: y, it: $ } = u, { opts: R, propertyName: O, topSchemaRef: j, schemaPath: L } = $;
      p.push([f.keyword, v], [f.params, typeof h == "function" ? h(u) : h || (0, t._)`{}`]), R.messages && p.push([f.message, typeof i == "function" ? i(u) : i]), R.verbose && p.push([f.schema, y], [f.parentSchema, (0, t._)`${j}${L}`], [s.default.data, m]), O && p.push([f.propertyName, O]);
    }
  }(Fs)), Fs;
}
var Ia;
function Wd() {
  if (Ia) return ct;
  Ia = 1, Object.defineProperty(ct, "__esModule", { value: !0 }), ct.boolOrEmptySchema = ct.topBoolOrEmptySchema = void 0;
  const e = Mn(), t = ee(), o = Le(), s = {
    message: "boolean schema is false"
  };
  function l(a) {
    const { gen: c, schema: d, validateName: f } = a;
    d === !1 ? r(a, !1) : typeof d == "object" && d.$async === !0 ? c.return(o.default.data) : (c.assign((0, t._)`${f}.errors`, null), c.return(!0));
  }
  ct.topBoolOrEmptySchema = l;
  function n(a, c) {
    const { gen: d, schema: f } = a;
    f === !1 ? (d.var(c, !1), r(a)) : d.var(c, !0);
  }
  ct.boolOrEmptySchema = n;
  function r(a, c) {
    const { gen: d, data: f } = a, E = {
      gen: d,
      keyword: "false schema",
      data: f,
      schema: !1,
      schemaCode: !1,
      schemaValue: !1,
      params: {},
      it: a
    };
    (0, e.reportError)(E, s, void 0, c);
  }
  return ct;
}
var pe = {}, ut = {}, Oa;
function Of() {
  if (Oa) return ut;
  Oa = 1, Object.defineProperty(ut, "__esModule", { value: !0 }), ut.getRules = ut.isJSONType = void 0;
  const e = ["string", "number", "integer", "boolean", "null", "object", "array"], t = new Set(e);
  function o(l) {
    return typeof l == "string" && t.has(l);
  }
  ut.isJSONType = o;
  function s() {
    const l = {
      number: { type: "number", rules: [] },
      string: { type: "string", rules: [] },
      array: { type: "array", rules: [] },
      object: { type: "object", rules: [] }
    };
    return {
      types: { ...l, integer: !0, boolean: !0, null: !0 },
      rules: [{ rules: [] }, l.number, l.string, l.array, l.object],
      post: { rules: [] },
      all: {},
      keywords: {}
    };
  }
  return ut.getRules = s, ut;
}
var Ke = {}, Ta;
function Tf() {
  if (Ta) return Ke;
  Ta = 1, Object.defineProperty(Ke, "__esModule", { value: !0 }), Ke.shouldUseRule = Ke.shouldUseGroup = Ke.schemaHasRulesForType = void 0;
  function e({ schema: s, self: l }, n) {
    const r = l.RULES.types[n];
    return r && r !== !0 && t(s, r);
  }
  Ke.schemaHasRulesForType = e;
  function t(s, l) {
    return l.rules.some((n) => o(s, n));
  }
  Ke.shouldUseGroup = t;
  function o(s, l) {
    var n;
    return s[l.keyword] !== void 0 || ((n = l.definition.implements) === null || n === void 0 ? void 0 : n.some((r) => s[r] !== void 0));
  }
  return Ke.shouldUseRule = o, Ke;
}
var Ca;
function jn() {
  if (Ca) return pe;
  Ca = 1, Object.defineProperty(pe, "__esModule", { value: !0 }), pe.reportTypeError = pe.checkDataTypes = pe.checkDataType = pe.coerceAndCheckDataType = pe.getJSONTypes = pe.getSchemaTypes = pe.DataType = void 0;
  const e = Of(), t = Tf(), o = Mn(), s = ee(), l = se();
  var n;
  (function(i) {
    i[i.Correct = 0] = "Correct", i[i.Wrong = 1] = "Wrong";
  })(n || (pe.DataType = n = {}));
  function r(i) {
    const p = a(i.type);
    if (p.includes("null")) {
      if (i.nullable === !1)
        throw new Error("type: null contradicts nullable: false");
    } else {
      if (!p.length && i.nullable !== void 0)
        throw new Error('"nullable" cannot be used without "type"');
      i.nullable === !0 && p.push("null");
    }
    return p;
  }
  pe.getSchemaTypes = r;
  function a(i) {
    const p = Array.isArray(i) ? i : i ? [i] : [];
    if (p.every(e.isJSONType))
      return p;
    throw new Error("type must be JSONType or JSONType[]: " + p.join(","));
  }
  pe.getJSONTypes = a;
  function c(i, p) {
    const { gen: v, data: m, opts: y } = i, $ = f(p, y.coerceTypes), R = p.length > 0 && !($.length === 0 && p.length === 1 && (0, t.schemaHasRulesForType)(i, p[0]));
    if (R) {
      const O = w(p, m, y.strictNumbers, n.Wrong);
      v.if(O, () => {
        $.length ? E(i, p, $) : u(i);
      });
    }
    return R;
  }
  pe.coerceAndCheckDataType = c;
  const d = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
  function f(i, p) {
    return p ? i.filter((v) => d.has(v) || p === "array" && v === "array") : [];
  }
  function E(i, p, v) {
    const { gen: m, data: y, opts: $ } = i, R = m.let("dataType", (0, s._)`typeof ${y}`), O = m.let("coerced", (0, s._)`undefined`);
    $.coerceTypes === "array" && m.if((0, s._)`${R} == 'object' && Array.isArray(${y}) && ${y}.length == 1`, () => m.assign(y, (0, s._)`${y}[0]`).assign(R, (0, s._)`typeof ${y}`).if(w(p, y, $.strictNumbers), () => m.assign(O, y))), m.if((0, s._)`${O} !== undefined`);
    for (const L of v)
      (d.has(L) || L === "array" && $.coerceTypes === "array") && j(L);
    m.else(), u(i), m.endIf(), m.if((0, s._)`${O} !== undefined`, () => {
      m.assign(y, O), _(i, O);
    });
    function j(L) {
      switch (L) {
        case "string":
          m.elseIf((0, s._)`${R} == "number" || ${R} == "boolean"`).assign(O, (0, s._)`"" + ${y}`).elseIf((0, s._)`${y} === null`).assign(O, (0, s._)`""`);
          return;
        case "number":
          m.elseIf((0, s._)`${R} == "boolean" || ${y} === null
              || (${R} == "string" && ${y} && ${y} == +${y})`).assign(O, (0, s._)`+${y}`);
          return;
        case "integer":
          m.elseIf((0, s._)`${R} === "boolean" || ${y} === null
              || (${R} === "string" && ${y} && ${y} == +${y} && !(${y} % 1))`).assign(O, (0, s._)`+${y}`);
          return;
        case "boolean":
          m.elseIf((0, s._)`${y} === "false" || ${y} === 0 || ${y} === null`).assign(O, !1).elseIf((0, s._)`${y} === "true" || ${y} === 1`).assign(O, !0);
          return;
        case "null":
          m.elseIf((0, s._)`${y} === "" || ${y} === 0 || ${y} === false`), m.assign(O, null);
          return;
        case "array":
          m.elseIf((0, s._)`${R} === "string" || ${R} === "number"
              || ${R} === "boolean" || ${y} === null`).assign(O, (0, s._)`[${y}]`);
      }
    }
  }
  function _({ gen: i, parentData: p, parentDataProperty: v }, m) {
    i.if((0, s._)`${p} !== undefined`, () => i.assign((0, s._)`${p}[${v}]`, m));
  }
  function g(i, p, v, m = n.Correct) {
    const y = m === n.Correct ? s.operators.EQ : s.operators.NEQ;
    let $;
    switch (i) {
      case "null":
        return (0, s._)`${p} ${y} null`;
      case "array":
        $ = (0, s._)`Array.isArray(${p})`;
        break;
      case "object":
        $ = (0, s._)`${p} && typeof ${p} == "object" && !Array.isArray(${p})`;
        break;
      case "integer":
        $ = R((0, s._)`!(${p} % 1) && !isNaN(${p})`);
        break;
      case "number":
        $ = R();
        break;
      default:
        return (0, s._)`typeof ${p} ${y} ${i}`;
    }
    return m === n.Correct ? $ : (0, s.not)($);
    function R(O = s.nil) {
      return (0, s.and)((0, s._)`typeof ${p} == "number"`, O, v ? (0, s._)`isFinite(${p})` : s.nil);
    }
  }
  pe.checkDataType = g;
  function w(i, p, v, m) {
    if (i.length === 1)
      return g(i[0], p, v, m);
    let y;
    const $ = (0, l.toHash)(i);
    if ($.array && $.object) {
      const R = (0, s._)`typeof ${p} != "object"`;
      y = $.null ? R : (0, s._)`!${p} || ${R}`, delete $.null, delete $.array, delete $.object;
    } else
      y = s.nil;
    $.number && delete $.integer;
    for (const R in $)
      y = (0, s.and)(y, g(R, p, v, m));
    return y;
  }
  pe.checkDataTypes = w;
  const b = {
    message: ({ schema: i }) => `must be ${i}`,
    params: ({ schema: i, schemaValue: p }) => typeof i == "string" ? (0, s._)`{type: ${i}}` : (0, s._)`{type: ${p}}`
  };
  function u(i) {
    const p = h(i);
    (0, o.reportError)(p, b);
  }
  pe.reportTypeError = u;
  function h(i) {
    const { gen: p, data: v, schema: m } = i, y = (0, l.schemaRefOrVal)(i, m, "type");
    return {
      gen: p,
      keyword: "type",
      data: v,
      schema: m.type,
      schemaCode: y,
      schemaValue: y,
      parentSchema: m,
      params: {},
      it: i
    };
  }
  return pe;
}
var Tt = {}, Da;
function Zd() {
  if (Da) return Tt;
  Da = 1, Object.defineProperty(Tt, "__esModule", { value: !0 }), Tt.assignDefaults = void 0;
  const e = ee(), t = se();
  function o(l, n) {
    const { properties: r, items: a } = l.schema;
    if (n === "object" && r)
      for (const c in r)
        s(l, c, r[c].default);
    else n === "array" && Array.isArray(a) && a.forEach((c, d) => s(l, d, c.default));
  }
  Tt.assignDefaults = o;
  function s(l, n, r) {
    const { gen: a, compositeRule: c, data: d, opts: f } = l;
    if (r === void 0)
      return;
    const E = (0, e._)`${d}${(0, e.getProperty)(n)}`;
    if (c) {
      (0, t.checkStrictMode)(l, `default is ignored for: ${E}`);
      return;
    }
    let _ = (0, e._)`${E} === undefined`;
    f.useDefaults === "empty" && (_ = (0, e._)`${_} || ${E} === null || ${E} === ""`), a.if(_, (0, e._)`${E} = ${(0, e.stringify)(r)}`);
  }
  return Tt;
}
var je = {}, fe = {}, Aa;
function qe() {
  if (Aa) return fe;
  Aa = 1, Object.defineProperty(fe, "__esModule", { value: !0 }), fe.validateUnion = fe.validateArray = fe.usePattern = fe.callValidateCode = fe.schemaProperties = fe.allSchemaProperties = fe.noPropertyInData = fe.propertyInData = fe.isOwnProperty = fe.hasPropFunc = fe.reportMissingProp = fe.checkMissingProp = fe.checkReportMissingProp = void 0;
  const e = ee(), t = se(), o = Le(), s = se();
  function l(i, p) {
    const { gen: v, data: m, it: y } = i;
    v.if(f(v, m, p, y.opts.ownProperties), () => {
      i.setParams({ missingProperty: (0, e._)`${p}` }, !0), i.error();
    });
  }
  fe.checkReportMissingProp = l;
  function n({ gen: i, data: p, it: { opts: v } }, m, y) {
    return (0, e.or)(...m.map(($) => (0, e.and)(f(i, p, $, v.ownProperties), (0, e._)`${y} = ${$}`)));
  }
  fe.checkMissingProp = n;
  function r(i, p) {
    i.setParams({ missingProperty: p }, !0), i.error();
  }
  fe.reportMissingProp = r;
  function a(i) {
    return i.scopeValue("func", {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      ref: Object.prototype.hasOwnProperty,
      code: (0, e._)`Object.prototype.hasOwnProperty`
    });
  }
  fe.hasPropFunc = a;
  function c(i, p, v) {
    return (0, e._)`${a(i)}.call(${p}, ${v})`;
  }
  fe.isOwnProperty = c;
  function d(i, p, v, m) {
    const y = (0, e._)`${p}${(0, e.getProperty)(v)} !== undefined`;
    return m ? (0, e._)`${y} && ${c(i, p, v)}` : y;
  }
  fe.propertyInData = d;
  function f(i, p, v, m) {
    const y = (0, e._)`${p}${(0, e.getProperty)(v)} === undefined`;
    return m ? (0, e.or)(y, (0, e.not)(c(i, p, v))) : y;
  }
  fe.noPropertyInData = f;
  function E(i) {
    return i ? Object.keys(i).filter((p) => p !== "__proto__") : [];
  }
  fe.allSchemaProperties = E;
  function _(i, p) {
    return E(p).filter((v) => !(0, t.alwaysValidSchema)(i, p[v]));
  }
  fe.schemaProperties = _;
  function g({ schemaCode: i, data: p, it: { gen: v, topSchemaRef: m, schemaPath: y, errorPath: $ }, it: R }, O, j, L) {
    const V = L ? (0, e._)`${i}, ${p}, ${m}${y}` : p, F = [
      [o.default.instancePath, (0, e.strConcat)(o.default.instancePath, $)],
      [o.default.parentData, R.parentData],
      [o.default.parentDataProperty, R.parentDataProperty],
      [o.default.rootData, o.default.rootData]
    ];
    R.opts.dynamicRef && F.push([o.default.dynamicAnchors, o.default.dynamicAnchors]);
    const M = (0, e._)`${V}, ${v.object(...F)}`;
    return j !== e.nil ? (0, e._)`${O}.call(${j}, ${M})` : (0, e._)`${O}(${M})`;
  }
  fe.callValidateCode = g;
  const w = (0, e._)`new RegExp`;
  function b({ gen: i, it: { opts: p } }, v) {
    const m = p.unicodeRegExp ? "u" : "", { regExp: y } = p.code, $ = y(v, m);
    return i.scopeValue("pattern", {
      key: $.toString(),
      ref: $,
      code: (0, e._)`${y.code === "new RegExp" ? w : (0, s.useFunc)(i, y)}(${v}, ${m})`
    });
  }
  fe.usePattern = b;
  function u(i) {
    const { gen: p, data: v, keyword: m, it: y } = i, $ = p.name("valid");
    if (y.allErrors) {
      const O = p.let("valid", !0);
      return R(() => p.assign(O, !1)), O;
    }
    return p.var($, !0), R(() => p.break()), $;
    function R(O) {
      const j = p.const("len", (0, e._)`${v}.length`);
      p.forRange("i", 0, j, (L) => {
        i.subschema({
          keyword: m,
          dataProp: L,
          dataPropType: t.Type.Num
        }, $), p.if((0, e.not)($), O);
      });
    }
  }
  fe.validateArray = u;
  function h(i) {
    const { gen: p, schema: v, keyword: m, it: y } = i;
    if (!Array.isArray(v))
      throw new Error("ajv implementation error");
    if (v.some((j) => (0, t.alwaysValidSchema)(y, j)) && !y.opts.unevaluated)
      return;
    const R = p.let("valid", !1), O = p.name("_valid");
    p.block(() => v.forEach((j, L) => {
      const V = i.subschema({
        keyword: m,
        schemaProp: L,
        compositeRule: !0
      }, O);
      p.assign(R, (0, e._)`${R} || ${O}`), i.mergeValidEvaluated(V, O) || p.if((0, e.not)(R));
    })), i.result(R, () => i.reset(), () => i.error(!0));
  }
  return fe.validateUnion = h, fe;
}
var ja;
function Xd() {
  if (ja) return je;
  ja = 1, Object.defineProperty(je, "__esModule", { value: !0 }), je.validateKeywordUsage = je.validSchemaType = je.funcKeywordCode = je.macroKeywordCode = void 0;
  const e = ee(), t = Le(), o = qe(), s = Mn();
  function l(_, g) {
    const { gen: w, keyword: b, schema: u, parentSchema: h, it: i } = _, p = g.macro.call(i.self, u, h, i), v = d(w, b, p);
    i.opts.validateSchema !== !1 && i.self.validateSchema(p, !0);
    const m = w.name("valid");
    _.subschema({
      schema: p,
      schemaPath: e.nil,
      errSchemaPath: `${i.errSchemaPath}/${b}`,
      topSchemaRef: v,
      compositeRule: !0
    }, m), _.pass(m, () => _.error(!0));
  }
  je.macroKeywordCode = l;
  function n(_, g) {
    var w;
    const { gen: b, keyword: u, schema: h, parentSchema: i, $data: p, it: v } = _;
    c(v, g);
    const m = !p && g.compile ? g.compile.call(v.self, h, i, v) : g.validate, y = d(b, u, m), $ = b.let("valid");
    _.block$data($, R), _.ok((w = g.valid) !== null && w !== void 0 ? w : $);
    function R() {
      if (g.errors === !1)
        L(), g.modifying && r(_), V(() => _.error());
      else {
        const F = g.async ? O() : j();
        g.modifying && r(_), V(() => a(_, F));
      }
    }
    function O() {
      const F = b.let("ruleErrs", null);
      return b.try(() => L((0, e._)`await `), (M) => b.assign($, !1).if((0, e._)`${M} instanceof ${v.ValidationError}`, () => b.assign(F, (0, e._)`${M}.errors`), () => b.throw(M))), F;
    }
    function j() {
      const F = (0, e._)`${y}.errors`;
      return b.assign(F, null), L(e.nil), F;
    }
    function L(F = g.async ? (0, e._)`await ` : e.nil) {
      const M = v.opts.passContext ? t.default.this : t.default.self, z = !("compile" in g && !p || g.schema === !1);
      b.assign($, (0, e._)`${F}${(0, o.callValidateCode)(_, y, M, z)}`, g.modifying);
    }
    function V(F) {
      var M;
      b.if((0, e.not)((M = g.valid) !== null && M !== void 0 ? M : $), F);
    }
  }
  je.funcKeywordCode = n;
  function r(_) {
    const { gen: g, data: w, it: b } = _;
    g.if(b.parentData, () => g.assign(w, (0, e._)`${b.parentData}[${b.parentDataProperty}]`));
  }
  function a(_, g) {
    const { gen: w } = _;
    w.if((0, e._)`Array.isArray(${g})`, () => {
      w.assign(t.default.vErrors, (0, e._)`${t.default.vErrors} === null ? ${g} : ${t.default.vErrors}.concat(${g})`).assign(t.default.errors, (0, e._)`${t.default.vErrors}.length`), (0, s.extendErrors)(_);
    }, () => _.error());
  }
  function c({ schemaEnv: _ }, g) {
    if (g.async && !_.$async)
      throw new Error("async keyword in sync schema");
  }
  function d(_, g, w) {
    if (w === void 0)
      throw new Error(`keyword "${g}" failed to compile`);
    return _.scopeValue("keyword", typeof w == "function" ? { ref: w } : { ref: w, code: (0, e.stringify)(w) });
  }
  function f(_, g, w = !1) {
    return !g.length || g.some((b) => b === "array" ? Array.isArray(_) : b === "object" ? _ && typeof _ == "object" && !Array.isArray(_) : typeof _ == b || w && typeof _ > "u");
  }
  je.validSchemaType = f;
  function E({ schema: _, opts: g, self: w, errSchemaPath: b }, u, h) {
    if (Array.isArray(u.keyword) ? !u.keyword.includes(h) : u.keyword !== h)
      throw new Error("ajv implementation error");
    const i = u.dependencies;
    if (i?.some((p) => !Object.prototype.hasOwnProperty.call(_, p)))
      throw new Error(`parent schema must have dependencies of ${h}: ${i.join(",")}`);
    if (u.validateSchema && !u.validateSchema(_[h])) {
      const v = `keyword "${h}" value is invalid at path "${b}": ` + w.errorsText(u.validateSchema.errors);
      if (g.validateSchema === "log")
        w.logger.error(v);
      else
        throw new Error(v);
    }
  }
  return je.validateKeywordUsage = E, je;
}
var He = {}, ka;
function Yd() {
  if (ka) return He;
  ka = 1, Object.defineProperty(He, "__esModule", { value: !0 }), He.extendSubschemaMode = He.extendSubschemaData = He.getSubschema = void 0;
  const e = ee(), t = se();
  function o(n, { keyword: r, schemaProp: a, schema: c, schemaPath: d, errSchemaPath: f, topSchemaRef: E }) {
    if (r !== void 0 && c !== void 0)
      throw new Error('both "keyword" and "schema" passed, only one allowed');
    if (r !== void 0) {
      const _ = n.schema[r];
      return a === void 0 ? {
        schema: _,
        schemaPath: (0, e._)`${n.schemaPath}${(0, e.getProperty)(r)}`,
        errSchemaPath: `${n.errSchemaPath}/${r}`
      } : {
        schema: _[a],
        schemaPath: (0, e._)`${n.schemaPath}${(0, e.getProperty)(r)}${(0, e.getProperty)(a)}`,
        errSchemaPath: `${n.errSchemaPath}/${r}/${(0, t.escapeFragment)(a)}`
      };
    }
    if (c !== void 0) {
      if (d === void 0 || f === void 0 || E === void 0)
        throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
      return {
        schema: c,
        schemaPath: d,
        topSchemaRef: E,
        errSchemaPath: f
      };
    }
    throw new Error('either "keyword" or "schema" must be passed');
  }
  He.getSubschema = o;
  function s(n, r, { dataProp: a, dataPropType: c, data: d, dataTypes: f, propertyName: E }) {
    if (d !== void 0 && a !== void 0)
      throw new Error('both "data" and "dataProp" passed, only one allowed');
    const { gen: _ } = r;
    if (a !== void 0) {
      const { errorPath: w, dataPathArr: b, opts: u } = r, h = _.let("data", (0, e._)`${r.data}${(0, e.getProperty)(a)}`, !0);
      g(h), n.errorPath = (0, e.str)`${w}${(0, t.getErrorPath)(a, c, u.jsPropertySyntax)}`, n.parentDataProperty = (0, e._)`${a}`, n.dataPathArr = [...b, n.parentDataProperty];
    }
    if (d !== void 0) {
      const w = d instanceof e.Name ? d : _.let("data", d, !0);
      g(w), E !== void 0 && (n.propertyName = E);
    }
    f && (n.dataTypes = f);
    function g(w) {
      n.data = w, n.dataLevel = r.dataLevel + 1, n.dataTypes = [], r.definedProperties = /* @__PURE__ */ new Set(), n.parentData = r.data, n.dataNames = [...r.dataNames, w];
    }
  }
  He.extendSubschemaData = s;
  function l(n, { jtdDiscriminator: r, jtdMetadata: a, compositeRule: c, createErrors: d, allErrors: f }) {
    c !== void 0 && (n.compositeRule = c), d !== void 0 && (n.createErrors = d), f !== void 0 && (n.allErrors = f), n.jtdDiscriminator = r, n.jtdMetadata = a;
  }
  return He.extendSubschemaMode = l, He;
}
var Se = {}, zs, La;
function Un() {
  return La || (La = 1, zs = function e(t, o) {
    if (t === o) return !0;
    if (t && o && typeof t == "object" && typeof o == "object") {
      if (t.constructor !== o.constructor) return !1;
      var s, l, n;
      if (Array.isArray(t)) {
        if (s = t.length, s != o.length) return !1;
        for (l = s; l-- !== 0; )
          if (!e(t[l], o[l])) return !1;
        return !0;
      }
      if (t.constructor === RegExp) return t.source === o.source && t.flags === o.flags;
      if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === o.valueOf();
      if (t.toString !== Object.prototype.toString) return t.toString() === o.toString();
      if (n = Object.keys(t), s = n.length, s !== Object.keys(o).length) return !1;
      for (l = s; l-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(o, n[l])) return !1;
      for (l = s; l-- !== 0; ) {
        var r = n[l];
        if (!e(t[r], o[r])) return !1;
      }
      return !0;
    }
    return t !== t && o !== o;
  }), zs;
}
var Gs = { exports: {} }, qa;
function Qd() {
  if (qa) return Gs.exports;
  qa = 1;
  var e = Gs.exports = function(s, l, n) {
    typeof l == "function" && (n = l, l = {}), n = l.cb || n;
    var r = typeof n == "function" ? n : n.pre || function() {
    }, a = n.post || function() {
    };
    t(l, r, a, s, "", s);
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
  function t(s, l, n, r, a, c, d, f, E, _) {
    if (r && typeof r == "object" && !Array.isArray(r)) {
      l(r, a, c, d, f, E, _);
      for (var g in r) {
        var w = r[g];
        if (Array.isArray(w)) {
          if (g in e.arrayKeywords)
            for (var b = 0; b < w.length; b++)
              t(s, l, n, w[b], a + "/" + g + "/" + b, c, a, g, r, b);
        } else if (g in e.propsKeywords) {
          if (w && typeof w == "object")
            for (var u in w)
              t(s, l, n, w[u], a + "/" + g + "/" + o(u), c, a, g, r, u);
        } else (g in e.keywords || s.allKeys && !(g in e.skipKeywords)) && t(s, l, n, w, a + "/" + g, c, a, g, r);
      }
      n(r, a, c, d, f, E, _);
    }
  }
  function o(s) {
    return s.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  return Gs.exports;
}
var Fa;
function Vn() {
  if (Fa) return Se;
  Fa = 1, Object.defineProperty(Se, "__esModule", { value: !0 }), Se.getSchemaRefs = Se.resolveUrl = Se.normalizeId = Se._getFullPath = Se.getFullPath = Se.inlineRef = void 0;
  const e = se(), t = Un(), o = Qd(), s = /* @__PURE__ */ new Set([
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
  function l(b, u = !0) {
    return typeof b == "boolean" ? !0 : u === !0 ? !r(b) : u ? a(b) <= u : !1;
  }
  Se.inlineRef = l;
  const n = /* @__PURE__ */ new Set([
    "$ref",
    "$recursiveRef",
    "$recursiveAnchor",
    "$dynamicRef",
    "$dynamicAnchor"
  ]);
  function r(b) {
    for (const u in b) {
      if (n.has(u))
        return !0;
      const h = b[u];
      if (Array.isArray(h) && h.some(r) || typeof h == "object" && r(h))
        return !0;
    }
    return !1;
  }
  function a(b) {
    let u = 0;
    for (const h in b) {
      if (h === "$ref")
        return 1 / 0;
      if (u++, !s.has(h) && (typeof b[h] == "object" && (0, e.eachItem)(b[h], (i) => u += a(i)), u === 1 / 0))
        return 1 / 0;
    }
    return u;
  }
  function c(b, u = "", h) {
    h !== !1 && (u = E(u));
    const i = b.parse(u);
    return d(b, i);
  }
  Se.getFullPath = c;
  function d(b, u) {
    return b.serialize(u).split("#")[0] + "#";
  }
  Se._getFullPath = d;
  const f = /#\/?$/;
  function E(b) {
    return b ? b.replace(f, "") : "";
  }
  Se.normalizeId = E;
  function _(b, u, h) {
    return h = E(h), b.resolve(u, h);
  }
  Se.resolveUrl = _;
  const g = /^[a-z_][-a-z0-9._]*$/i;
  function w(b, u) {
    if (typeof b == "boolean")
      return {};
    const { schemaId: h, uriResolver: i } = this.opts, p = E(b[h] || u), v = { "": p }, m = c(i, p, !1), y = {}, $ = /* @__PURE__ */ new Set();
    return o(b, { allKeys: !0 }, (j, L, V, F) => {
      if (F === void 0)
        return;
      const M = m + L;
      let z = v[F];
      typeof j[h] == "string" && (z = J.call(this, j[h])), x.call(this, j.$anchor), x.call(this, j.$dynamicAnchor), v[L] = z;
      function J(B) {
        const W = this.opts.uriResolver.resolve;
        if (B = E(z ? W(z, B) : B), $.has(B))
          throw O(B);
        $.add(B);
        let q = this.refs[B];
        return typeof q == "string" && (q = this.refs[q]), typeof q == "object" ? R(j, q.schema, B) : B !== E(M) && (B[0] === "#" ? (R(j, y[B], B), y[B] = j) : this.refs[B] = M), B;
      }
      function x(B) {
        if (typeof B == "string") {
          if (!g.test(B))
            throw new Error(`invalid anchor "${B}"`);
          J.call(this, `#${B}`);
        }
      }
    }), y;
    function R(j, L, V) {
      if (L !== void 0 && !t(j, L))
        throw O(V);
    }
    function O(j) {
      return new Error(`reference "${j}" resolves to more than one schema`);
    }
  }
  return Se.getSchemaRefs = w, Se;
}
var Ma;
function zn() {
  if (Ma) return Ge;
  Ma = 1, Object.defineProperty(Ge, "__esModule", { value: !0 }), Ge.getData = Ge.KeywordCxt = Ge.validateFunctionCode = void 0;
  const e = Wd(), t = jn(), o = Tf(), s = jn(), l = Zd(), n = Xd(), r = Yd(), a = ee(), c = Le(), d = Vn(), f = se(), E = Mn();
  function _(P) {
    if (m(P) && ($(P), v(P))) {
      u(P);
      return;
    }
    g(P, () => (0, e.topBoolOrEmptySchema)(P));
  }
  Ge.validateFunctionCode = _;
  function g({ gen: P, validateName: T, schema: k, schemaEnv: U, opts: K }, Y) {
    K.code.es5 ? P.func(T, (0, a._)`${c.default.data}, ${c.default.valCxt}`, U.$async, () => {
      P.code((0, a._)`"use strict"; ${i(k, K)}`), b(P, K), P.code(Y);
    }) : P.func(T, (0, a._)`${c.default.data}, ${w(K)}`, U.$async, () => P.code(i(k, K)).code(Y));
  }
  function w(P) {
    return (0, a._)`{${c.default.instancePath}="", ${c.default.parentData}, ${c.default.parentDataProperty}, ${c.default.rootData}=${c.default.data}${P.dynamicRef ? (0, a._)`, ${c.default.dynamicAnchors}={}` : a.nil}}={}`;
  }
  function b(P, T) {
    P.if(c.default.valCxt, () => {
      P.var(c.default.instancePath, (0, a._)`${c.default.valCxt}.${c.default.instancePath}`), P.var(c.default.parentData, (0, a._)`${c.default.valCxt}.${c.default.parentData}`), P.var(c.default.parentDataProperty, (0, a._)`${c.default.valCxt}.${c.default.parentDataProperty}`), P.var(c.default.rootData, (0, a._)`${c.default.valCxt}.${c.default.rootData}`), T.dynamicRef && P.var(c.default.dynamicAnchors, (0, a._)`${c.default.valCxt}.${c.default.dynamicAnchors}`);
    }, () => {
      P.var(c.default.instancePath, (0, a._)`""`), P.var(c.default.parentData, (0, a._)`undefined`), P.var(c.default.parentDataProperty, (0, a._)`undefined`), P.var(c.default.rootData, c.default.data), T.dynamicRef && P.var(c.default.dynamicAnchors, (0, a._)`{}`);
    });
  }
  function u(P) {
    const { schema: T, opts: k, gen: U } = P;
    g(P, () => {
      k.$comment && T.$comment && F(P), j(P), U.let(c.default.vErrors, null), U.let(c.default.errors, 0), k.unevaluated && h(P), R(P), M(P);
    });
  }
  function h(P) {
    const { gen: T, validateName: k } = P;
    P.evaluated = T.const("evaluated", (0, a._)`${k}.evaluated`), T.if((0, a._)`${P.evaluated}.dynamicProps`, () => T.assign((0, a._)`${P.evaluated}.props`, (0, a._)`undefined`)), T.if((0, a._)`${P.evaluated}.dynamicItems`, () => T.assign((0, a._)`${P.evaluated}.items`, (0, a._)`undefined`));
  }
  function i(P, T) {
    const k = typeof P == "object" && P[T.schemaId];
    return k && (T.code.source || T.code.process) ? (0, a._)`/*# sourceURL=${k} */` : a.nil;
  }
  function p(P, T) {
    if (m(P) && ($(P), v(P))) {
      y(P, T);
      return;
    }
    (0, e.boolOrEmptySchema)(P, T);
  }
  function v({ schema: P, self: T }) {
    if (typeof P == "boolean")
      return !P;
    for (const k in P)
      if (T.RULES.all[k])
        return !0;
    return !1;
  }
  function m(P) {
    return typeof P.schema != "boolean";
  }
  function y(P, T) {
    const { schema: k, gen: U, opts: K } = P;
    K.$comment && k.$comment && F(P), L(P), V(P);
    const Y = U.const("_errs", c.default.errors);
    R(P, Y), U.var(T, (0, a._)`${Y} === ${c.default.errors}`);
  }
  function $(P) {
    (0, f.checkUnknownRules)(P), O(P);
  }
  function R(P, T) {
    if (P.opts.jtd)
      return J(P, [], !1, T);
    const k = (0, t.getSchemaTypes)(P.schema), U = (0, t.coerceAndCheckDataType)(P, k);
    J(P, k, !U, T);
  }
  function O(P) {
    const { schema: T, errSchemaPath: k, opts: U, self: K } = P;
    T.$ref && U.ignoreKeywordsWithRef && (0, f.schemaHasRulesButRef)(T, K.RULES) && K.logger.warn(`$ref: keywords ignored in schema at path "${k}"`);
  }
  function j(P) {
    const { schema: T, opts: k } = P;
    T.default !== void 0 && k.useDefaults && k.strictSchema && (0, f.checkStrictMode)(P, "default is ignored in the schema root");
  }
  function L(P) {
    const T = P.schema[P.opts.schemaId];
    T && (P.baseId = (0, d.resolveUrl)(P.opts.uriResolver, P.baseId, T));
  }
  function V(P) {
    if (P.schema.$async && !P.schemaEnv.$async)
      throw new Error("async schema in sync schema");
  }
  function F({ gen: P, schemaEnv: T, schema: k, errSchemaPath: U, opts: K }) {
    const Y = k.$comment;
    if (K.$comment === !0)
      P.code((0, a._)`${c.default.self}.logger.log(${Y})`);
    else if (typeof K.$comment == "function") {
      const ie = (0, a.str)`${U}/$comment`, me = P.scopeValue("root", { ref: T.root });
      P.code((0, a._)`${c.default.self}.opts.$comment(${Y}, ${ie}, ${me}.schema)`);
    }
  }
  function M(P) {
    const { gen: T, schemaEnv: k, validateName: U, ValidationError: K, opts: Y } = P;
    k.$async ? T.if((0, a._)`${c.default.errors} === 0`, () => T.return(c.default.data), () => T.throw((0, a._)`new ${K}(${c.default.vErrors})`)) : (T.assign((0, a._)`${U}.errors`, c.default.vErrors), Y.unevaluated && z(P), T.return((0, a._)`${c.default.errors} === 0`));
  }
  function z({ gen: P, evaluated: T, props: k, items: U }) {
    k instanceof a.Name && P.assign((0, a._)`${T}.props`, k), U instanceof a.Name && P.assign((0, a._)`${T}.items`, U);
  }
  function J(P, T, k, U) {
    const { gen: K, schema: Y, data: ie, allErrors: me, opts: ue, self: le } = P, { RULES: oe } = le;
    if (Y.$ref && (ue.ignoreKeywordsWithRef || !(0, f.schemaHasRulesButRef)(Y, oe))) {
      K.block(() => G(P, "$ref", oe.all.$ref.definition));
      return;
    }
    ue.jtd || B(P, T), K.block(() => {
      for (const he of oe.rules)
        Ie(he);
      Ie(oe.post);
    });
    function Ie(he) {
      (0, o.shouldUseGroup)(Y, he) && (he.type ? (K.if((0, s.checkDataType)(he.type, ie, ue.strictNumbers)), x(P, he), T.length === 1 && T[0] === he.type && k && (K.else(), (0, s.reportTypeError)(P)), K.endIf()) : x(P, he), me || K.if((0, a._)`${c.default.errors} === ${U || 0}`));
    }
  }
  function x(P, T) {
    const { gen: k, schema: U, opts: { useDefaults: K } } = P;
    K && (0, l.assignDefaults)(P, T.type), k.block(() => {
      for (const Y of T.rules)
        (0, o.shouldUseRule)(U, Y) && G(P, Y.keyword, Y.definition, T.type);
    });
  }
  function B(P, T) {
    P.schemaEnv.meta || !P.opts.strictTypes || (W(P, T), P.opts.allowUnionTypes || q(P, T), I(P, P.dataTypes));
  }
  function W(P, T) {
    if (T.length) {
      if (!P.dataTypes.length) {
        P.dataTypes = T;
        return;
      }
      T.forEach((k) => {
        C(P.dataTypes, k) || N(P, `type "${k}" not allowed by context "${P.dataTypes.join(",")}"`);
      }), S(P, T);
    }
  }
  function q(P, T) {
    T.length > 1 && !(T.length === 2 && T.includes("null")) && N(P, "use allowUnionTypes to allow union type keyword");
  }
  function I(P, T) {
    const k = P.self.RULES.all;
    for (const U in k) {
      const K = k[U];
      if (typeof K == "object" && (0, o.shouldUseRule)(P.schema, K)) {
        const { type: Y } = K.definition;
        Y.length && !Y.some((ie) => A(T, ie)) && N(P, `missing type "${Y.join(",")}" for keyword "${U}"`);
      }
    }
  }
  function A(P, T) {
    return P.includes(T) || T === "number" && P.includes("integer");
  }
  function C(P, T) {
    return P.includes(T) || T === "integer" && P.includes("number");
  }
  function S(P, T) {
    const k = [];
    for (const U of P.dataTypes)
      C(T, U) ? k.push(U) : T.includes("integer") && U === "number" && k.push("integer");
    P.dataTypes = k;
  }
  function N(P, T) {
    const k = P.schemaEnv.baseId + P.errSchemaPath;
    T += ` at "${k}" (strictTypes)`, (0, f.checkStrictMode)(P, T, P.opts.strictTypes);
  }
  class D {
    constructor(T, k, U) {
      if ((0, n.validateKeywordUsage)(T, k, U), this.gen = T.gen, this.allErrors = T.allErrors, this.keyword = U, this.data = T.data, this.schema = T.schema[U], this.$data = k.$data && T.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, f.schemaRefOrVal)(T, this.schema, U, this.$data), this.schemaType = k.schemaType, this.parentSchema = T.schema, this.params = {}, this.it = T, this.def = k, this.$data)
        this.schemaCode = T.gen.const("vSchema", Z(this.$data, T));
      else if (this.schemaCode = this.schemaValue, !(0, n.validSchemaType)(this.schema, k.schemaType, k.allowUndefined))
        throw new Error(`${U} value must be ${JSON.stringify(k.schemaType)}`);
      ("code" in k ? k.trackErrors : k.errors !== !1) && (this.errsCount = T.gen.const("_errs", c.default.errors));
    }
    result(T, k, U) {
      this.failResult((0, a.not)(T), k, U);
    }
    failResult(T, k, U) {
      this.gen.if(T), U ? U() : this.error(), k ? (this.gen.else(), k(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    pass(T, k) {
      this.failResult((0, a.not)(T), void 0, k);
    }
    fail(T) {
      if (T === void 0) {
        this.error(), this.allErrors || this.gen.if(!1);
        return;
      }
      this.gen.if(T), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    fail$data(T) {
      if (!this.$data)
        return this.fail(T);
      const { schemaCode: k } = this;
      this.fail((0, a._)`${k} !== undefined && (${(0, a.or)(this.invalid$data(), T)})`);
    }
    error(T, k, U) {
      if (k) {
        this.setParams(k), this._error(T, U), this.setParams({});
        return;
      }
      this._error(T, U);
    }
    _error(T, k) {
      (T ? E.reportExtraError : E.reportError)(this, this.def.error, k);
    }
    $dataError() {
      (0, E.reportError)(this, this.def.$dataError || E.keyword$DataError);
    }
    reset() {
      if (this.errsCount === void 0)
        throw new Error('add "trackErrors" to keyword definition');
      (0, E.resetErrorsCount)(this.gen, this.errsCount);
    }
    ok(T) {
      this.allErrors || this.gen.if(T);
    }
    setParams(T, k) {
      k ? Object.assign(this.params, T) : this.params = T;
    }
    block$data(T, k, U = a.nil) {
      this.gen.block(() => {
        this.check$data(T, U), k();
      });
    }
    check$data(T = a.nil, k = a.nil) {
      if (!this.$data)
        return;
      const { gen: U, schemaCode: K, schemaType: Y, def: ie } = this;
      U.if((0, a.or)((0, a._)`${K} === undefined`, k)), T !== a.nil && U.assign(T, !0), (Y.length || ie.validateSchema) && (U.elseIf(this.invalid$data()), this.$dataError(), T !== a.nil && U.assign(T, !1)), U.else();
    }
    invalid$data() {
      const { gen: T, schemaCode: k, schemaType: U, def: K, it: Y } = this;
      return (0, a.or)(ie(), me());
      function ie() {
        if (U.length) {
          if (!(k instanceof a.Name))
            throw new Error("ajv implementation error");
          const ue = Array.isArray(U) ? U : [U];
          return (0, a._)`${(0, s.checkDataTypes)(ue, k, Y.opts.strictNumbers, s.DataType.Wrong)}`;
        }
        return a.nil;
      }
      function me() {
        if (K.validateSchema) {
          const ue = T.scopeValue("validate$data", { ref: K.validateSchema });
          return (0, a._)`!${ue}(${k})`;
        }
        return a.nil;
      }
    }
    subschema(T, k) {
      const U = (0, r.getSubschema)(this.it, T);
      (0, r.extendSubschemaData)(U, this.it, T), (0, r.extendSubschemaMode)(U, T);
      const K = { ...this.it, ...U, items: void 0, props: void 0 };
      return p(K, k), K;
    }
    mergeEvaluated(T, k) {
      const { it: U, gen: K } = this;
      U.opts.unevaluated && (U.props !== !0 && T.props !== void 0 && (U.props = f.mergeEvaluated.props(K, T.props, U.props, k)), U.items !== !0 && T.items !== void 0 && (U.items = f.mergeEvaluated.items(K, T.items, U.items, k)));
    }
    mergeValidEvaluated(T, k) {
      const { it: U, gen: K } = this;
      if (U.opts.unevaluated && (U.props !== !0 || U.items !== !0))
        return K.if(k, () => this.mergeEvaluated(T, a.Name)), !0;
    }
  }
  Ge.KeywordCxt = D;
  function G(P, T, k, U) {
    const K = new D(P, k, T);
    "code" in k ? k.code(K, U) : K.$data && k.validate ? (0, n.funcKeywordCode)(K, k) : "macro" in k ? (0, n.macroKeywordCode)(K, k) : (k.compile || k.validate) && (0, n.funcKeywordCode)(K, k);
  }
  const H = /^\/(?:[^~]|~0|~1)*$/, X = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
  function Z(P, { dataLevel: T, dataNames: k, dataPathArr: U }) {
    let K, Y;
    if (P === "")
      return c.default.rootData;
    if (P[0] === "/") {
      if (!H.test(P))
        throw new Error(`Invalid JSON-pointer: ${P}`);
      K = P, Y = c.default.rootData;
    } else {
      const le = X.exec(P);
      if (!le)
        throw new Error(`Invalid JSON-pointer: ${P}`);
      const oe = +le[1];
      if (K = le[2], K === "#") {
        if (oe >= T)
          throw new Error(ue("property/index", oe));
        return U[T - oe];
      }
      if (oe > T)
        throw new Error(ue("data", oe));
      if (Y = k[T - oe], !K)
        return Y;
    }
    let ie = Y;
    const me = K.split("/");
    for (const le of me)
      le && (Y = (0, a._)`${Y}${(0, a.getProperty)((0, f.unescapeJsonPointer)(le))}`, ie = (0, a._)`${ie} && ${Y}`);
    return ie;
    function ue(le, oe) {
      return `Cannot access ${le} ${oe} levels up, current level is ${T}`;
    }
  }
  return Ge.getData = Z, Ge;
}
var Wt = {}, Ua;
function $o() {
  if (Ua) return Wt;
  Ua = 1, Object.defineProperty(Wt, "__esModule", { value: !0 });
  class e extends Error {
    constructor(o) {
      super("validation failed"), this.errors = o, this.ajv = this.validation = !0;
    }
  }
  return Wt.default = e, Wt;
}
var Zt = {}, Va;
function Gn() {
  if (Va) return Zt;
  Va = 1, Object.defineProperty(Zt, "__esModule", { value: !0 });
  const e = Vn();
  class t extends Error {
    constructor(s, l, n, r) {
      super(r || `can't resolve reference ${n} from id ${l}`), this.missingRef = (0, e.resolveUrl)(s, l, n), this.missingSchema = (0, e.normalizeId)((0, e.getFullPath)(s, this.missingRef));
    }
  }
  return Zt.default = t, Zt;
}
var Te = {}, za;
function Kn() {
  if (za) return Te;
  za = 1, Object.defineProperty(Te, "__esModule", { value: !0 }), Te.resolveSchema = Te.getCompilingSchema = Te.resolveRef = Te.compileSchema = Te.SchemaEnv = void 0;
  const e = ee(), t = $o(), o = Le(), s = Vn(), l = se(), n = zn();
  class r {
    constructor(h) {
      var i;
      this.refs = {}, this.dynamicAnchors = {};
      let p;
      typeof h.schema == "object" && (p = h.schema), this.schema = h.schema, this.schemaId = h.schemaId, this.root = h.root || this, this.baseId = (i = h.baseId) !== null && i !== void 0 ? i : (0, s.normalizeId)(p?.[h.schemaId || "$id"]), this.schemaPath = h.schemaPath, this.localRefs = h.localRefs, this.meta = h.meta, this.$async = p?.$async, this.refs = {};
    }
  }
  Te.SchemaEnv = r;
  function a(u) {
    const h = f.call(this, u);
    if (h)
      return h;
    const i = (0, s.getFullPath)(this.opts.uriResolver, u.root.baseId), { es5: p, lines: v } = this.opts.code, { ownProperties: m } = this.opts, y = new e.CodeGen(this.scope, { es5: p, lines: v, ownProperties: m });
    let $;
    u.$async && ($ = y.scopeValue("Error", {
      ref: t.default,
      code: (0, e._)`require("ajv/dist/runtime/validation_error").default`
    }));
    const R = y.scopeName("validate");
    u.validateName = R;
    const O = {
      gen: y,
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
      topSchemaRef: y.scopeValue("schema", this.opts.code.source === !0 ? { ref: u.schema, code: (0, e.stringify)(u.schema) } : { ref: u.schema }),
      validateName: R,
      ValidationError: $,
      schema: u.schema,
      schemaEnv: u,
      rootId: i,
      baseId: u.baseId || i,
      schemaPath: e.nil,
      errSchemaPath: u.schemaPath || (this.opts.jtd ? "" : "#"),
      errorPath: (0, e._)`""`,
      opts: this.opts,
      self: this
    };
    let j;
    try {
      this._compilations.add(u), (0, n.validateFunctionCode)(O), y.optimize(this.opts.code.optimize);
      const L = y.toString();
      j = `${y.scopeRefs(o.default.scope)}return ${L}`, this.opts.code.process && (j = this.opts.code.process(j, u));
      const F = new Function(`${o.default.self}`, `${o.default.scope}`, j)(this, this.scope.get());
      if (this.scope.value(R, { ref: F }), F.errors = null, F.schema = u.schema, F.schemaEnv = u, u.$async && (F.$async = !0), this.opts.code.source === !0 && (F.source = { validateName: R, validateCode: L, scopeValues: y._values }), this.opts.unevaluated) {
        const { props: M, items: z } = O;
        F.evaluated = {
          props: M instanceof e.Name ? void 0 : M,
          items: z instanceof e.Name ? void 0 : z,
          dynamicProps: M instanceof e.Name,
          dynamicItems: z instanceof e.Name
        }, F.source && (F.source.evaluated = (0, e.stringify)(F.evaluated));
      }
      return u.validate = F, u;
    } catch (L) {
      throw delete u.validate, delete u.validateName, j && this.logger.error("Error compiling schema, function code:", j), L;
    } finally {
      this._compilations.delete(u);
    }
  }
  Te.compileSchema = a;
  function c(u, h, i) {
    var p;
    i = (0, s.resolveUrl)(this.opts.uriResolver, h, i);
    const v = u.refs[i];
    if (v)
      return v;
    let m = _.call(this, u, i);
    if (m === void 0) {
      const y = (p = u.localRefs) === null || p === void 0 ? void 0 : p[i], { schemaId: $ } = this.opts;
      y && (m = new r({ schema: y, schemaId: $, root: u, baseId: h }));
    }
    if (m !== void 0)
      return u.refs[i] = d.call(this, m);
  }
  Te.resolveRef = c;
  function d(u) {
    return (0, s.inlineRef)(u.schema, this.opts.inlineRefs) ? u.schema : u.validate ? u : a.call(this, u);
  }
  function f(u) {
    for (const h of this._compilations)
      if (E(h, u))
        return h;
  }
  Te.getCompilingSchema = f;
  function E(u, h) {
    return u.schema === h.schema && u.root === h.root && u.baseId === h.baseId;
  }
  function _(u, h) {
    let i;
    for (; typeof (i = this.refs[h]) == "string"; )
      h = i;
    return i || this.schemas[h] || g.call(this, u, h);
  }
  function g(u, h) {
    const i = this.opts.uriResolver.parse(h), p = (0, s._getFullPath)(this.opts.uriResolver, i);
    let v = (0, s.getFullPath)(this.opts.uriResolver, u.baseId, void 0);
    if (Object.keys(u.schema).length > 0 && p === v)
      return b.call(this, i, u);
    const m = (0, s.normalizeId)(p), y = this.refs[m] || this.schemas[m];
    if (typeof y == "string") {
      const $ = g.call(this, u, y);
      return typeof $?.schema != "object" ? void 0 : b.call(this, i, $);
    }
    if (typeof y?.schema == "object") {
      if (y.validate || a.call(this, y), m === (0, s.normalizeId)(h)) {
        const { schema: $ } = y, { schemaId: R } = this.opts, O = $[R];
        return O && (v = (0, s.resolveUrl)(this.opts.uriResolver, v, O)), new r({ schema: $, schemaId: R, root: u, baseId: v });
      }
      return b.call(this, i, y);
    }
  }
  Te.resolveSchema = g;
  const w = /* @__PURE__ */ new Set([
    "properties",
    "patternProperties",
    "enum",
    "dependencies",
    "definitions"
  ]);
  function b(u, { baseId: h, schema: i, root: p }) {
    var v;
    if (((v = u.fragment) === null || v === void 0 ? void 0 : v[0]) !== "/")
      return;
    for (const $ of u.fragment.slice(1).split("/")) {
      if (typeof i == "boolean")
        return;
      const R = i[(0, l.unescapeFragment)($)];
      if (R === void 0)
        return;
      i = R;
      const O = typeof i == "object" && i[this.opts.schemaId];
      !w.has($) && O && (h = (0, s.resolveUrl)(this.opts.uriResolver, h, O));
    }
    let m;
    if (typeof i != "boolean" && i.$ref && !(0, l.schemaHasRulesButRef)(i, this.RULES)) {
      const $ = (0, s.resolveUrl)(this.opts.uriResolver, h, i.$ref);
      m = g.call(this, p, $);
    }
    const { schemaId: y } = this.opts;
    if (m = m || new r({ schema: i, schemaId: y, root: p, baseId: h }), m.schema !== m.root.schema)
      return m;
  }
  return Te;
}
const eh = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", th = "Meta-schema for $data reference (JSON AnySchema extension proposal)", rh = "object", nh = ["$data"], sh = { $data: { type: "string", anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }] } }, ih = !1, oh = {
  $id: eh,
  description: th,
  type: rh,
  required: nh,
  properties: sh,
  additionalProperties: ih
};
var Xt = {}, Ct = { exports: {} }, Ks, Ga;
function ah() {
  return Ga || (Ga = 1, Ks = {
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
  }), Ks;
}
var Hs, Ka;
function ch() {
  if (Ka) return Hs;
  Ka = 1;
  const { HEX: e } = ah();
  function t(w) {
    if (r(w, ".") < 3)
      return { host: w, isIPV4: !1 };
    const b = w.match(/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/u) || [], [u] = b;
    return u ? { host: n(u, "."), isIPV4: !0 } : { host: w, isIPV4: !1 };
  }
  function o(w, b = !1) {
    let u = "", h = !0;
    for (const i of w) {
      if (e[i] === void 0) return;
      i !== "0" && h === !0 && (h = !1), h || (u += i);
    }
    return b && u.length === 0 && (u = "0"), u;
  }
  function s(w) {
    let b = 0;
    const u = { error: !1, address: "", zone: "" }, h = [], i = [];
    let p = !1, v = !1, m = !1;
    function y() {
      if (i.length) {
        if (p === !1) {
          const $ = o(i);
          if ($ !== void 0)
            h.push($);
          else
            return u.error = !0, !1;
        }
        i.length = 0;
      }
      return !0;
    }
    for (let $ = 0; $ < w.length; $++) {
      const R = w[$];
      if (!(R === "[" || R === "]"))
        if (R === ":") {
          if (v === !0 && (m = !0), !y())
            break;
          if (b++, h.push(":"), b > 7) {
            u.error = !0;
            break;
          }
          $ - 1 >= 0 && w[$ - 1] === ":" && (v = !0);
          continue;
        } else if (R === "%") {
          if (!y())
            break;
          p = !0;
        } else {
          i.push(R);
          continue;
        }
    }
    return i.length && (p ? u.zone = i.join("") : m ? h.push(i.join("")) : h.push(o(i))), u.address = h.join(""), u;
  }
  function l(w, b = {}) {
    if (r(w, ":") < 2)
      return { host: w, isIPV6: !1 };
    const u = s(w);
    if (u.error)
      return { host: w, isIPV6: !1 };
    {
      let h = u.address, i = u.address;
      return u.zone && (h += "%" + u.zone, i += "%25" + u.zone), { host: h, escapedHost: i, isIPV6: !0 };
    }
  }
  function n(w, b) {
    let u = "", h = !0;
    const i = w.length;
    for (let p = 0; p < i; p++) {
      const v = w[p];
      v === "0" && h ? (p + 1 <= i && w[p + 1] === b || p + 1 === i) && (u += v, h = !1) : (v === b ? h = !0 : h = !1, u += v);
    }
    return u;
  }
  function r(w, b) {
    let u = 0;
    for (let h = 0; h < w.length; h++)
      w[h] === b && u++;
    return u;
  }
  const a = /^\.\.?\//u, c = /^\/\.(?:\/|$)/u, d = /^\/\.\.(?:\/|$)/u, f = /^\/?(?:.|\n)*?(?=\/|$)/u;
  function E(w) {
    const b = [];
    for (; w.length; )
      if (w.match(a))
        w = w.replace(a, "");
      else if (w.match(c))
        w = w.replace(c, "/");
      else if (w.match(d))
        w = w.replace(d, "/"), b.pop();
      else if (w === "." || w === "..")
        w = "";
      else {
        const u = w.match(f);
        if (u) {
          const h = u[0];
          w = w.slice(h.length), b.push(h);
        } else
          throw new Error("Unexpected dot segment condition");
      }
    return b.join("");
  }
  function _(w, b) {
    const u = b !== !0 ? escape : unescape;
    return w.scheme !== void 0 && (w.scheme = u(w.scheme)), w.userinfo !== void 0 && (w.userinfo = u(w.userinfo)), w.host !== void 0 && (w.host = u(w.host)), w.path !== void 0 && (w.path = u(w.path)), w.query !== void 0 && (w.query = u(w.query)), w.fragment !== void 0 && (w.fragment = u(w.fragment)), w;
  }
  function g(w, b) {
    const u = [];
    if (w.userinfo !== void 0 && (u.push(w.userinfo), u.push("@")), w.host !== void 0) {
      let h = unescape(w.host);
      const i = t(h);
      if (i.isIPV4)
        h = i.host;
      else {
        const p = l(i.host, {});
        p.isIPV6 === !0 ? h = `[${p.escapedHost}]` : h = w.host;
      }
      u.push(h);
    }
    return (typeof w.port == "number" || typeof w.port == "string") && (u.push(":"), u.push(String(w.port))), u.length ? u.join("") : void 0;
  }
  return Hs = {
    recomposeAuthority: g,
    normalizeComponentEncoding: _,
    removeDotSegments: E,
    normalizeIPv4: t,
    normalizeIPv6: l,
    stringArrayToHexStripped: o
  }, Hs;
}
var Bs, Ha;
function uh() {
  if (Ha) return Bs;
  Ha = 1;
  const e = /^[\da-f]{8}\b-[\da-f]{4}\b-[\da-f]{4}\b-[\da-f]{4}\b-[\da-f]{12}$/iu, t = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
  function o(i) {
    return typeof i.secure == "boolean" ? i.secure : String(i.scheme).toLowerCase() === "wss";
  }
  function s(i) {
    return i.host || (i.error = i.error || "HTTP URIs must have a host."), i;
  }
  function l(i) {
    const p = String(i.scheme).toLowerCase() === "https";
    return (i.port === (p ? 443 : 80) || i.port === "") && (i.port = void 0), i.path || (i.path = "/"), i;
  }
  function n(i) {
    return i.secure = o(i), i.resourceName = (i.path || "/") + (i.query ? "?" + i.query : ""), i.path = void 0, i.query = void 0, i;
  }
  function r(i) {
    if ((i.port === (o(i) ? 443 : 80) || i.port === "") && (i.port = void 0), typeof i.secure == "boolean" && (i.scheme = i.secure ? "wss" : "ws", i.secure = void 0), i.resourceName) {
      const [p, v] = i.resourceName.split("?");
      i.path = p && p !== "/" ? p : void 0, i.query = v, i.resourceName = void 0;
    }
    return i.fragment = void 0, i;
  }
  function a(i, p) {
    if (!i.path)
      return i.error = "URN can not be parsed", i;
    const v = i.path.match(t);
    if (v) {
      const m = p.scheme || i.scheme || "urn";
      i.nid = v[1].toLowerCase(), i.nss = v[2];
      const y = `${m}:${p.nid || i.nid}`, $ = h[y];
      i.path = void 0, $ && (i = $.parse(i, p));
    } else
      i.error = i.error || "URN can not be parsed.";
    return i;
  }
  function c(i, p) {
    const v = p.scheme || i.scheme || "urn", m = i.nid.toLowerCase(), y = `${v}:${p.nid || m}`, $ = h[y];
    $ && (i = $.serialize(i, p));
    const R = i, O = i.nss;
    return R.path = `${m || p.nid}:${O}`, p.skipEscape = !0, R;
  }
  function d(i, p) {
    const v = i;
    return v.uuid = v.nss, v.nss = void 0, !p.tolerant && (!v.uuid || !e.test(v.uuid)) && (v.error = v.error || "UUID is not valid."), v;
  }
  function f(i) {
    const p = i;
    return p.nss = (i.uuid || "").toLowerCase(), p;
  }
  const E = {
    scheme: "http",
    domainHost: !0,
    parse: s,
    serialize: l
  }, _ = {
    scheme: "https",
    domainHost: E.domainHost,
    parse: s,
    serialize: l
  }, g = {
    scheme: "ws",
    domainHost: !0,
    parse: n,
    serialize: r
  }, w = {
    scheme: "wss",
    domainHost: g.domainHost,
    parse: g.parse,
    serialize: g.serialize
  }, h = {
    http: E,
    https: _,
    ws: g,
    wss: w,
    urn: {
      scheme: "urn",
      parse: a,
      serialize: c,
      skipNormalize: !0
    },
    "urn:uuid": {
      scheme: "urn:uuid",
      parse: d,
      serialize: f,
      skipNormalize: !0
    }
  };
  return Bs = h, Bs;
}
var Ba;
function Cf() {
  if (Ba) return Ct.exports;
  Ba = 1;
  const { normalizeIPv6: e, normalizeIPv4: t, removeDotSegments: o, recomposeAuthority: s, normalizeComponentEncoding: l } = ch(), n = uh();
  function r(u, h) {
    return typeof u == "string" ? u = f(w(u, h), h) : typeof u == "object" && (u = w(f(u, h), h)), u;
  }
  function a(u, h, i) {
    const p = Object.assign({ scheme: "null" }, i), v = c(w(u, p), w(h, p), p, !0);
    return f(v, { ...p, skipEscape: !0 });
  }
  function c(u, h, i, p) {
    const v = {};
    return p || (u = w(f(u, i), i), h = w(f(h, i), i)), i = i || {}, !i.tolerant && h.scheme ? (v.scheme = h.scheme, v.userinfo = h.userinfo, v.host = h.host, v.port = h.port, v.path = o(h.path || ""), v.query = h.query) : (h.userinfo !== void 0 || h.host !== void 0 || h.port !== void 0 ? (v.userinfo = h.userinfo, v.host = h.host, v.port = h.port, v.path = o(h.path || ""), v.query = h.query) : (h.path ? (h.path.charAt(0) === "/" ? v.path = o(h.path) : ((u.userinfo !== void 0 || u.host !== void 0 || u.port !== void 0) && !u.path ? v.path = "/" + h.path : u.path ? v.path = u.path.slice(0, u.path.lastIndexOf("/") + 1) + h.path : v.path = h.path, v.path = o(v.path)), v.query = h.query) : (v.path = u.path, h.query !== void 0 ? v.query = h.query : v.query = u.query), v.userinfo = u.userinfo, v.host = u.host, v.port = u.port), v.scheme = u.scheme), v.fragment = h.fragment, v;
  }
  function d(u, h, i) {
    return typeof u == "string" ? (u = unescape(u), u = f(l(w(u, i), !0), { ...i, skipEscape: !0 })) : typeof u == "object" && (u = f(l(u, !0), { ...i, skipEscape: !0 })), typeof h == "string" ? (h = unescape(h), h = f(l(w(h, i), !0), { ...i, skipEscape: !0 })) : typeof h == "object" && (h = f(l(h, !0), { ...i, skipEscape: !0 })), u.toLowerCase() === h.toLowerCase();
  }
  function f(u, h) {
    const i = {
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
    }, p = Object.assign({}, h), v = [], m = n[(p.scheme || i.scheme || "").toLowerCase()];
    m && m.serialize && m.serialize(i, p), i.path !== void 0 && (p.skipEscape ? i.path = unescape(i.path) : (i.path = escape(i.path), i.scheme !== void 0 && (i.path = i.path.split("%3A").join(":")))), p.reference !== "suffix" && i.scheme && v.push(i.scheme, ":");
    const y = s(i, p);
    if (y !== void 0 && (p.reference !== "suffix" && v.push("//"), v.push(y), i.path && i.path.charAt(0) !== "/" && v.push("/")), i.path !== void 0) {
      let $ = i.path;
      !p.absolutePath && (!m || !m.absolutePath) && ($ = o($)), y === void 0 && ($ = $.replace(/^\/\//u, "/%2F")), v.push($);
    }
    return i.query !== void 0 && v.push("?", i.query), i.fragment !== void 0 && v.push("#", i.fragment), v.join("");
  }
  const E = Array.from({ length: 127 }, (u, h) => /[^!"$&'()*+,\-.;=_`a-z{}~]/u.test(String.fromCharCode(h)));
  function _(u) {
    let h = 0;
    for (let i = 0, p = u.length; i < p; ++i)
      if (h = u.charCodeAt(i), h > 126 || E[h])
        return !0;
    return !1;
  }
  const g = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
  function w(u, h) {
    const i = Object.assign({}, h), p = {
      scheme: void 0,
      userinfo: void 0,
      host: "",
      port: void 0,
      path: "",
      query: void 0,
      fragment: void 0
    }, v = u.indexOf("%") !== -1;
    let m = !1;
    i.reference === "suffix" && (u = (i.scheme ? i.scheme + ":" : "") + "//" + u);
    const y = u.match(g);
    if (y) {
      if (p.scheme = y[1], p.userinfo = y[3], p.host = y[4], p.port = parseInt(y[5], 10), p.path = y[6] || "", p.query = y[7], p.fragment = y[8], isNaN(p.port) && (p.port = y[5]), p.host) {
        const R = t(p.host);
        if (R.isIPV4 === !1) {
          const O = e(R.host, { isIPV4: !1 });
          p.host = O.host.toLowerCase(), m = O.isIPV6;
        } else
          p.host = R.host, m = !0;
      }
      p.scheme === void 0 && p.userinfo === void 0 && p.host === void 0 && p.port === void 0 && !p.path && p.query === void 0 ? p.reference = "same-document" : p.scheme === void 0 ? p.reference = "relative" : p.fragment === void 0 ? p.reference = "absolute" : p.reference = "uri", i.reference && i.reference !== "suffix" && i.reference !== p.reference && (p.error = p.error || "URI is not a " + i.reference + " reference.");
      const $ = n[(i.scheme || p.scheme || "").toLowerCase()];
      if (!i.unicodeSupport && (!$ || !$.unicodeSupport) && p.host && (i.domainHost || $ && $.domainHost) && m === !1 && _(p.host))
        try {
          p.host = URL.domainToASCII(p.host.toLowerCase());
        } catch (R) {
          p.error = p.error || "Host's domain name can not be converted to ASCII: " + R;
        }
      (!$ || $ && !$.skipNormalize) && (v && p.scheme !== void 0 && (p.scheme = unescape(p.scheme)), v && p.host !== void 0 && (p.host = unescape(p.host)), p.path !== void 0 && p.path.length && (p.path = escape(unescape(p.path))), p.fragment !== void 0 && p.fragment.length && (p.fragment = encodeURI(decodeURIComponent(p.fragment)))), $ && $.parse && $.parse(p, i);
    } else
      p.error = p.error || "URI can not be parsed.";
    return p;
  }
  const b = {
    SCHEMES: n,
    normalize: r,
    resolve: a,
    resolveComponents: c,
    equal: d,
    serialize: f,
    parse: w
  };
  return Ct.exports = b, Ct.exports.default = b, Ct.exports.fastUri = b, Ct.exports;
}
var xa;
function lh() {
  if (xa) return Xt;
  xa = 1, Object.defineProperty(Xt, "__esModule", { value: !0 });
  const e = Cf();
  return e.code = 'require("ajv/dist/runtime/uri").default', Xt.default = e, Xt;
}
var Ja;
function fh() {
  return Ja || (Ja = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
    var t = zn();
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
    const s = $o(), l = Gn(), n = Of(), r = Kn(), a = ee(), c = Vn(), d = jn(), f = se(), E = oh, _ = lh(), g = (q, I) => new RegExp(q, I);
    g.code = "new RegExp";
    const w = ["removeAdditional", "useDefaults", "coerceTypes"], b = /* @__PURE__ */ new Set([
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
    }, i = 200;
    function p(q) {
      var I, A, C, S, N, D, G, H, X, Z, P, T, k, U, K, Y, ie, me, ue, le, oe, Ie, he, st, it;
      const Ae = q.strict, ot = (I = q.code) === null || I === void 0 ? void 0 : I.optimize, It = ot === !0 || ot === void 0 ? 1 : ot || 0, Ot = (C = (A = q.code) === null || A === void 0 ? void 0 : A.regExp) !== null && C !== void 0 ? C : g, es = (S = q.uriResolver) !== null && S !== void 0 ? S : _.default;
      return {
        strictSchema: (D = (N = q.strictSchema) !== null && N !== void 0 ? N : Ae) !== null && D !== void 0 ? D : !0,
        strictNumbers: (H = (G = q.strictNumbers) !== null && G !== void 0 ? G : Ae) !== null && H !== void 0 ? H : !0,
        strictTypes: (Z = (X = q.strictTypes) !== null && X !== void 0 ? X : Ae) !== null && Z !== void 0 ? Z : "log",
        strictTuples: (T = (P = q.strictTuples) !== null && P !== void 0 ? P : Ae) !== null && T !== void 0 ? T : "log",
        strictRequired: (U = (k = q.strictRequired) !== null && k !== void 0 ? k : Ae) !== null && U !== void 0 ? U : !1,
        code: q.code ? { ...q.code, optimize: It, regExp: Ot } : { optimize: It, regExp: Ot },
        loopRequired: (K = q.loopRequired) !== null && K !== void 0 ? K : i,
        loopEnum: (Y = q.loopEnum) !== null && Y !== void 0 ? Y : i,
        meta: (ie = q.meta) !== null && ie !== void 0 ? ie : !0,
        messages: (me = q.messages) !== null && me !== void 0 ? me : !0,
        inlineRefs: (ue = q.inlineRefs) !== null && ue !== void 0 ? ue : !0,
        schemaId: (le = q.schemaId) !== null && le !== void 0 ? le : "$id",
        addUsedSchema: (oe = q.addUsedSchema) !== null && oe !== void 0 ? oe : !0,
        validateSchema: (Ie = q.validateSchema) !== null && Ie !== void 0 ? Ie : !0,
        validateFormats: (he = q.validateFormats) !== null && he !== void 0 ? he : !0,
        unicodeRegExp: (st = q.unicodeRegExp) !== null && st !== void 0 ? st : !0,
        int32range: (it = q.int32range) !== null && it !== void 0 ? it : !0,
        uriResolver: es
      };
    }
    class v {
      constructor(I = {}) {
        this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), I = this.opts = { ...I, ...p(I) };
        const { es5: A, lines: C } = this.opts.code;
        this.scope = new a.ValueScope({ scope: {}, prefixes: b, es5: A, lines: C }), this.logger = V(I.logger);
        const S = I.validateFormats;
        I.validateFormats = !1, this.RULES = (0, n.getRules)(), m.call(this, u, I, "NOT SUPPORTED"), m.call(this, h, I, "DEPRECATED", "warn"), this._metaOpts = j.call(this), I.formats && R.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), I.keywords && O.call(this, I.keywords), typeof I.meta == "object" && this.addMetaSchema(I.meta), $.call(this), I.validateFormats = S;
      }
      _addVocabularies() {
        this.addKeyword("$async");
      }
      _addDefaultMetaSchema() {
        const { $data: I, meta: A, schemaId: C } = this.opts;
        let S = E;
        C === "id" && (S = { ...E }, S.id = S.$id, delete S.$id), A && I && this.addMetaSchema(S, S[C], !1);
      }
      defaultMeta() {
        const { meta: I, schemaId: A } = this.opts;
        return this.opts.defaultMeta = typeof I == "object" ? I[A] || I : void 0;
      }
      validate(I, A) {
        let C;
        if (typeof I == "string") {
          if (C = this.getSchema(I), !C)
            throw new Error(`no schema with key or ref "${I}"`);
        } else
          C = this.compile(I);
        const S = C(A);
        return "$async" in C || (this.errors = C.errors), S;
      }
      compile(I, A) {
        const C = this._addSchema(I, A);
        return C.validate || this._compileSchemaEnv(C);
      }
      compileAsync(I, A) {
        if (typeof this.opts.loadSchema != "function")
          throw new Error("options.loadSchema should be a function");
        const { loadSchema: C } = this.opts;
        return S.call(this, I, A);
        async function S(Z, P) {
          await N.call(this, Z.$schema);
          const T = this._addSchema(Z, P);
          return T.validate || D.call(this, T);
        }
        async function N(Z) {
          Z && !this.getSchema(Z) && await S.call(this, { $ref: Z }, !0);
        }
        async function D(Z) {
          try {
            return this._compileSchemaEnv(Z);
          } catch (P) {
            if (!(P instanceof l.default))
              throw P;
            return G.call(this, P), await H.call(this, P.missingSchema), D.call(this, Z);
          }
        }
        function G({ missingSchema: Z, missingRef: P }) {
          if (this.refs[Z])
            throw new Error(`AnySchema ${Z} is loaded but ${P} cannot be resolved`);
        }
        async function H(Z) {
          const P = await X.call(this, Z);
          this.refs[Z] || await N.call(this, P.$schema), this.refs[Z] || this.addSchema(P, Z, A);
        }
        async function X(Z) {
          const P = this._loading[Z];
          if (P)
            return P;
          try {
            return await (this._loading[Z] = C(Z));
          } finally {
            delete this._loading[Z];
          }
        }
      }
      // Adds schema to the instance
      addSchema(I, A, C, S = this.opts.validateSchema) {
        if (Array.isArray(I)) {
          for (const D of I)
            this.addSchema(D, void 0, C, S);
          return this;
        }
        let N;
        if (typeof I == "object") {
          const { schemaId: D } = this.opts;
          if (N = I[D], N !== void 0 && typeof N != "string")
            throw new Error(`schema ${D} must be string`);
        }
        return A = (0, c.normalizeId)(A || N), this._checkUnique(A), this.schemas[A] = this._addSchema(I, C, A, S, !0), this;
      }
      // Add schema that will be used to validate other schemas
      // options in META_IGNORE_OPTIONS are alway set to false
      addMetaSchema(I, A, C = this.opts.validateSchema) {
        return this.addSchema(I, A, !0, C), this;
      }
      //  Validate schema against its meta-schema
      validateSchema(I, A) {
        if (typeof I == "boolean")
          return !0;
        let C;
        if (C = I.$schema, C !== void 0 && typeof C != "string")
          throw new Error("$schema must be a string");
        if (C = C || this.opts.defaultMeta || this.defaultMeta(), !C)
          return this.logger.warn("meta-schema not available"), this.errors = null, !0;
        const S = this.validate(C, I);
        if (!S && A) {
          const N = "schema is invalid: " + this.errorsText();
          if (this.opts.validateSchema === "log")
            this.logger.error(N);
          else
            throw new Error(N);
        }
        return S;
      }
      // Get compiled schema by `key` or `ref`.
      // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
      getSchema(I) {
        let A;
        for (; typeof (A = y.call(this, I)) == "string"; )
          I = A;
        if (A === void 0) {
          const { schemaId: C } = this.opts, S = new r.SchemaEnv({ schema: {}, schemaId: C });
          if (A = r.resolveSchema.call(this, S, I), !A)
            return;
          this.refs[I] = A;
        }
        return A.validate || this._compileSchemaEnv(A);
      }
      // Remove cached schema(s).
      // If no parameter is passed all schemas but meta-schemas are removed.
      // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
      // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
      removeSchema(I) {
        if (I instanceof RegExp)
          return this._removeAllSchemas(this.schemas, I), this._removeAllSchemas(this.refs, I), this;
        switch (typeof I) {
          case "undefined":
            return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
          case "string": {
            const A = y.call(this, I);
            return typeof A == "object" && this._cache.delete(A.schema), delete this.schemas[I], delete this.refs[I], this;
          }
          case "object": {
            const A = I;
            this._cache.delete(A);
            let C = I[this.opts.schemaId];
            return C && (C = (0, c.normalizeId)(C), delete this.schemas[C], delete this.refs[C]), this;
          }
          default:
            throw new Error("ajv.removeSchema: invalid parameter");
        }
      }
      // add "vocabulary" - a collection of keywords
      addVocabulary(I) {
        for (const A of I)
          this.addKeyword(A);
        return this;
      }
      addKeyword(I, A) {
        let C;
        if (typeof I == "string")
          C = I, typeof A == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), A.keyword = C);
        else if (typeof I == "object" && A === void 0) {
          if (A = I, C = A.keyword, Array.isArray(C) && !C.length)
            throw new Error("addKeywords: keyword must be string or non-empty array");
        } else
          throw new Error("invalid addKeywords parameters");
        if (M.call(this, C, A), !A)
          return (0, f.eachItem)(C, (N) => z.call(this, N)), this;
        x.call(this, A);
        const S = {
          ...A,
          type: (0, d.getJSONTypes)(A.type),
          schemaType: (0, d.getJSONTypes)(A.schemaType)
        };
        return (0, f.eachItem)(C, S.type.length === 0 ? (N) => z.call(this, N, S) : (N) => S.type.forEach((D) => z.call(this, N, S, D))), this;
      }
      getKeyword(I) {
        const A = this.RULES.all[I];
        return typeof A == "object" ? A.definition : !!A;
      }
      // Remove keyword
      removeKeyword(I) {
        const { RULES: A } = this;
        delete A.keywords[I], delete A.all[I];
        for (const C of A.rules) {
          const S = C.rules.findIndex((N) => N.keyword === I);
          S >= 0 && C.rules.splice(S, 1);
        }
        return this;
      }
      // Add format
      addFormat(I, A) {
        return typeof A == "string" && (A = new RegExp(A)), this.formats[I] = A, this;
      }
      errorsText(I = this.errors, { separator: A = ", ", dataVar: C = "data" } = {}) {
        return !I || I.length === 0 ? "No errors" : I.map((S) => `${C}${S.instancePath} ${S.message}`).reduce((S, N) => S + A + N);
      }
      $dataMetaSchema(I, A) {
        const C = this.RULES.all;
        I = JSON.parse(JSON.stringify(I));
        for (const S of A) {
          const N = S.split("/").slice(1);
          let D = I;
          for (const G of N)
            D = D[G];
          for (const G in C) {
            const H = C[G];
            if (typeof H != "object")
              continue;
            const { $data: X } = H.definition, Z = D[G];
            X && Z && (D[G] = W(Z));
          }
        }
        return I;
      }
      _removeAllSchemas(I, A) {
        for (const C in I) {
          const S = I[C];
          (!A || A.test(C)) && (typeof S == "string" ? delete I[C] : S && !S.meta && (this._cache.delete(S.schema), delete I[C]));
        }
      }
      _addSchema(I, A, C, S = this.opts.validateSchema, N = this.opts.addUsedSchema) {
        let D;
        const { schemaId: G } = this.opts;
        if (typeof I == "object")
          D = I[G];
        else {
          if (this.opts.jtd)
            throw new Error("schema must be object");
          if (typeof I != "boolean")
            throw new Error("schema must be object or boolean");
        }
        let H = this._cache.get(I);
        if (H !== void 0)
          return H;
        C = (0, c.normalizeId)(D || C);
        const X = c.getSchemaRefs.call(this, I, C);
        return H = new r.SchemaEnv({ schema: I, schemaId: G, meta: A, baseId: C, localRefs: X }), this._cache.set(H.schema, H), N && !C.startsWith("#") && (C && this._checkUnique(C), this.refs[C] = H), S && this.validateSchema(I, !0), H;
      }
      _checkUnique(I) {
        if (this.schemas[I] || this.refs[I])
          throw new Error(`schema with key or id "${I}" already exists`);
      }
      _compileSchemaEnv(I) {
        if (I.meta ? this._compileMetaSchema(I) : r.compileSchema.call(this, I), !I.validate)
          throw new Error("ajv implementation error");
        return I.validate;
      }
      _compileMetaSchema(I) {
        const A = this.opts;
        this.opts = this._metaOpts;
        try {
          r.compileSchema.call(this, I);
        } finally {
          this.opts = A;
        }
      }
    }
    v.ValidationError = s.default, v.MissingRefError = l.default, e.default = v;
    function m(q, I, A, C = "error") {
      for (const S in q) {
        const N = S;
        N in I && this.logger[C](`${A}: option ${S}. ${q[N]}`);
      }
    }
    function y(q) {
      return q = (0, c.normalizeId)(q), this.schemas[q] || this.refs[q];
    }
    function $() {
      const q = this.opts.schemas;
      if (q)
        if (Array.isArray(q))
          this.addSchema(q);
        else
          for (const I in q)
            this.addSchema(q[I], I);
    }
    function R() {
      for (const q in this.opts.formats) {
        const I = this.opts.formats[q];
        I && this.addFormat(q, I);
      }
    }
    function O(q) {
      if (Array.isArray(q)) {
        this.addVocabulary(q);
        return;
      }
      this.logger.warn("keywords option as map is deprecated, pass array");
      for (const I in q) {
        const A = q[I];
        A.keyword || (A.keyword = I), this.addKeyword(A);
      }
    }
    function j() {
      const q = { ...this.opts };
      for (const I of w)
        delete q[I];
      return q;
    }
    const L = { log() {
    }, warn() {
    }, error() {
    } };
    function V(q) {
      if (q === !1)
        return L;
      if (q === void 0)
        return console;
      if (q.log && q.warn && q.error)
        return q;
      throw new Error("logger must implement log, warn and error methods");
    }
    const F = /^[a-z_$][a-z0-9_$:-]*$/i;
    function M(q, I) {
      const { RULES: A } = this;
      if ((0, f.eachItem)(q, (C) => {
        if (A.keywords[C])
          throw new Error(`Keyword ${C} is already defined`);
        if (!F.test(C))
          throw new Error(`Keyword ${C} has invalid name`);
      }), !!I && I.$data && !("code" in I || "validate" in I))
        throw new Error('$data keyword must have "code" or "validate" function');
    }
    function z(q, I, A) {
      var C;
      const S = I?.post;
      if (A && S)
        throw new Error('keyword with "post" flag cannot have "type"');
      const { RULES: N } = this;
      let D = S ? N.post : N.rules.find(({ type: H }) => H === A);
      if (D || (D = { type: A, rules: [] }, N.rules.push(D)), N.keywords[q] = !0, !I)
        return;
      const G = {
        keyword: q,
        definition: {
          ...I,
          type: (0, d.getJSONTypes)(I.type),
          schemaType: (0, d.getJSONTypes)(I.schemaType)
        }
      };
      I.before ? J.call(this, D, G, I.before) : D.rules.push(G), N.all[q] = G, (C = I.implements) === null || C === void 0 || C.forEach((H) => this.addKeyword(H));
    }
    function J(q, I, A) {
      const C = q.rules.findIndex((S) => S.keyword === A);
      C >= 0 ? q.rules.splice(C, 0, I) : (q.rules.push(I), this.logger.warn(`rule ${A} is not defined`));
    }
    function x(q) {
      let { metaSchema: I } = q;
      I !== void 0 && (q.$data && this.opts.$data && (I = W(I)), q.validateSchema = this.compile(I, !0));
    }
    const B = {
      $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
    };
    function W(q) {
      return { anyOf: [q, B] };
    }
  }(qs)), qs;
}
var Yt = {}, Qt = {}, er = {}, Wa;
function dh() {
  if (Wa) return er;
  Wa = 1, Object.defineProperty(er, "__esModule", { value: !0 });
  const e = {
    keyword: "id",
    code() {
      throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
    }
  };
  return er.default = e, er;
}
var Ye = {}, Za;
function go() {
  if (Za) return Ye;
  Za = 1, Object.defineProperty(Ye, "__esModule", { value: !0 }), Ye.callRef = Ye.getValidate = void 0;
  const e = Gn(), t = qe(), o = ee(), s = Le(), l = Kn(), n = se(), r = {
    keyword: "$ref",
    schemaType: "string",
    code(d) {
      const { gen: f, schema: E, it: _ } = d, { baseId: g, schemaEnv: w, validateName: b, opts: u, self: h } = _, { root: i } = w;
      if ((E === "#" || E === "#/") && g === i.baseId)
        return v();
      const p = l.resolveRef.call(h, i, g, E);
      if (p === void 0)
        throw new e.default(_.opts.uriResolver, g, E);
      if (p instanceof l.SchemaEnv)
        return m(p);
      return y(p);
      function v() {
        if (w === i)
          return c(d, b, w, w.$async);
        const $ = f.scopeValue("root", { ref: i });
        return c(d, (0, o._)`${$}.validate`, i, i.$async);
      }
      function m($) {
        const R = a(d, $);
        c(d, R, $, $.$async);
      }
      function y($) {
        const R = f.scopeValue("schema", u.code.source === !0 ? { ref: $, code: (0, o.stringify)($) } : { ref: $ }), O = f.name("valid"), j = d.subschema({
          schema: $,
          dataTypes: [],
          schemaPath: o.nil,
          topSchemaRef: R,
          errSchemaPath: E
        }, O);
        d.mergeEvaluated(j), d.ok(O);
      }
    }
  };
  function a(d, f) {
    const { gen: E } = d;
    return f.validate ? E.scopeValue("validate", { ref: f.validate }) : (0, o._)`${E.scopeValue("wrapper", { ref: f })}.validate`;
  }
  Ye.getValidate = a;
  function c(d, f, E, _) {
    const { gen: g, it: w } = d, { allErrors: b, schemaEnv: u, opts: h } = w, i = h.passContext ? s.default.this : o.nil;
    _ ? p() : v();
    function p() {
      if (!u.$async)
        throw new Error("async schema referenced by sync schema");
      const $ = g.let("valid");
      g.try(() => {
        g.code((0, o._)`await ${(0, t.callValidateCode)(d, f, i)}`), y(f), b || g.assign($, !0);
      }, (R) => {
        g.if((0, o._)`!(${R} instanceof ${w.ValidationError})`, () => g.throw(R)), m(R), b || g.assign($, !1);
      }), d.ok($);
    }
    function v() {
      d.result((0, t.callValidateCode)(d, f, i), () => y(f), () => m(f));
    }
    function m($) {
      const R = (0, o._)`${$}.errors`;
      g.assign(s.default.vErrors, (0, o._)`${s.default.vErrors} === null ? ${R} : ${s.default.vErrors}.concat(${R})`), g.assign(s.default.errors, (0, o._)`${s.default.vErrors}.length`);
    }
    function y($) {
      var R;
      if (!w.opts.unevaluated)
        return;
      const O = (R = E?.validate) === null || R === void 0 ? void 0 : R.evaluated;
      if (w.props !== !0)
        if (O && !O.dynamicProps)
          O.props !== void 0 && (w.props = n.mergeEvaluated.props(g, O.props, w.props));
        else {
          const j = g.var("props", (0, o._)`${$}.evaluated.props`);
          w.props = n.mergeEvaluated.props(g, j, w.props, o.Name);
        }
      if (w.items !== !0)
        if (O && !O.dynamicItems)
          O.items !== void 0 && (w.items = n.mergeEvaluated.items(g, O.items, w.items));
        else {
          const j = g.var("items", (0, o._)`${$}.evaluated.items`);
          w.items = n.mergeEvaluated.items(g, j, w.items, o.Name);
        }
    }
  }
  return Ye.callRef = c, Ye.default = r, Ye;
}
var Xa;
function hh() {
  if (Xa) return Qt;
  Xa = 1, Object.defineProperty(Qt, "__esModule", { value: !0 });
  const e = dh(), t = go(), o = [
    "$schema",
    "$id",
    "$defs",
    "$vocabulary",
    { keyword: "$comment" },
    "definitions",
    e.default,
    t.default
  ];
  return Qt.default = o, Qt;
}
var tr = {}, rr = {}, Ya;
function mh() {
  if (Ya) return rr;
  Ya = 1, Object.defineProperty(rr, "__esModule", { value: !0 });
  const e = ee(), t = e.operators, o = {
    maximum: { okStr: "<=", ok: t.LTE, fail: t.GT },
    minimum: { okStr: ">=", ok: t.GTE, fail: t.LT },
    exclusiveMaximum: { okStr: "<", ok: t.LT, fail: t.GTE },
    exclusiveMinimum: { okStr: ">", ok: t.GT, fail: t.LTE }
  }, s = {
    message: ({ keyword: n, schemaCode: r }) => (0, e.str)`must be ${o[n].okStr} ${r}`,
    params: ({ keyword: n, schemaCode: r }) => (0, e._)`{comparison: ${o[n].okStr}, limit: ${r}}`
  }, l = {
    keyword: Object.keys(o),
    type: "number",
    schemaType: "number",
    $data: !0,
    error: s,
    code(n) {
      const { keyword: r, data: a, schemaCode: c } = n;
      n.fail$data((0, e._)`${a} ${o[r].fail} ${c} || isNaN(${a})`);
    }
  };
  return rr.default = l, rr;
}
var nr = {}, Qa;
function ph() {
  if (Qa) return nr;
  Qa = 1, Object.defineProperty(nr, "__esModule", { value: !0 });
  const e = ee(), o = {
    keyword: "multipleOf",
    type: "number",
    schemaType: "number",
    $data: !0,
    error: {
      message: ({ schemaCode: s }) => (0, e.str)`must be multiple of ${s}`,
      params: ({ schemaCode: s }) => (0, e._)`{multipleOf: ${s}}`
    },
    code(s) {
      const { gen: l, data: n, schemaCode: r, it: a } = s, c = a.opts.multipleOfPrecision, d = l.let("res"), f = c ? (0, e._)`Math.abs(Math.round(${d}) - ${d}) > 1e-${c}` : (0, e._)`${d} !== parseInt(${d})`;
      s.fail$data((0, e._)`(${r} === 0 || (${d} = ${n}/${r}, ${f}))`);
    }
  };
  return nr.default = o, nr;
}
var sr = {}, ir = {}, ec;
function yh() {
  if (ec) return ir;
  ec = 1, Object.defineProperty(ir, "__esModule", { value: !0 });
  function e(t) {
    const o = t.length;
    let s = 0, l = 0, n;
    for (; l < o; )
      s++, n = t.charCodeAt(l++), n >= 55296 && n <= 56319 && l < o && (n = t.charCodeAt(l), (n & 64512) === 56320 && l++);
    return s;
  }
  return ir.default = e, e.code = 'require("ajv/dist/runtime/ucs2length").default', ir;
}
var tc;
function vh() {
  if (tc) return sr;
  tc = 1, Object.defineProperty(sr, "__esModule", { value: !0 });
  const e = ee(), t = se(), o = yh(), l = {
    keyword: ["maxLength", "minLength"],
    type: "string",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: n, schemaCode: r }) {
        const a = n === "maxLength" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${a} than ${r} characters`;
      },
      params: ({ schemaCode: n }) => (0, e._)`{limit: ${n}}`
    },
    code(n) {
      const { keyword: r, data: a, schemaCode: c, it: d } = n, f = r === "maxLength" ? e.operators.GT : e.operators.LT, E = d.opts.unicode === !1 ? (0, e._)`${a}.length` : (0, e._)`${(0, t.useFunc)(n.gen, o.default)}(${a})`;
      n.fail$data((0, e._)`${E} ${f} ${c}`);
    }
  };
  return sr.default = l, sr;
}
var or = {}, rc;
function $h() {
  if (rc) return or;
  rc = 1, Object.defineProperty(or, "__esModule", { value: !0 });
  const e = qe(), t = ee(), s = {
    keyword: "pattern",
    type: "string",
    schemaType: "string",
    $data: !0,
    error: {
      message: ({ schemaCode: l }) => (0, t.str)`must match pattern "${l}"`,
      params: ({ schemaCode: l }) => (0, t._)`{pattern: ${l}}`
    },
    code(l) {
      const { data: n, $data: r, schema: a, schemaCode: c, it: d } = l, f = d.opts.unicodeRegExp ? "u" : "", E = r ? (0, t._)`(new RegExp(${c}, ${f}))` : (0, e.usePattern)(l, a);
      l.fail$data((0, t._)`!${E}.test(${n})`);
    }
  };
  return or.default = s, or;
}
var ar = {}, nc;
function gh() {
  if (nc) return ar;
  nc = 1, Object.defineProperty(ar, "__esModule", { value: !0 });
  const e = ee(), o = {
    keyword: ["maxProperties", "minProperties"],
    type: "object",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: s, schemaCode: l }) {
        const n = s === "maxProperties" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${n} than ${l} properties`;
      },
      params: ({ schemaCode: s }) => (0, e._)`{limit: ${s}}`
    },
    code(s) {
      const { keyword: l, data: n, schemaCode: r } = s, a = l === "maxProperties" ? e.operators.GT : e.operators.LT;
      s.fail$data((0, e._)`Object.keys(${n}).length ${a} ${r}`);
    }
  };
  return ar.default = o, ar;
}
var cr = {}, sc;
function _h() {
  if (sc) return cr;
  sc = 1, Object.defineProperty(cr, "__esModule", { value: !0 });
  const e = qe(), t = ee(), o = se(), l = {
    keyword: "required",
    type: "object",
    schemaType: "array",
    $data: !0,
    error: {
      message: ({ params: { missingProperty: n } }) => (0, t.str)`must have required property '${n}'`,
      params: ({ params: { missingProperty: n } }) => (0, t._)`{missingProperty: ${n}}`
    },
    code(n) {
      const { gen: r, schema: a, schemaCode: c, data: d, $data: f, it: E } = n, { opts: _ } = E;
      if (!f && a.length === 0)
        return;
      const g = a.length >= _.loopRequired;
      if (E.allErrors ? w() : b(), _.strictRequired) {
        const i = n.parentSchema.properties, { definedProperties: p } = n.it;
        for (const v of a)
          if (i?.[v] === void 0 && !p.has(v)) {
            const m = E.schemaEnv.baseId + E.errSchemaPath, y = `required property "${v}" is not defined at "${m}" (strictRequired)`;
            (0, o.checkStrictMode)(E, y, E.opts.strictRequired);
          }
      }
      function w() {
        if (g || f)
          n.block$data(t.nil, u);
        else
          for (const i of a)
            (0, e.checkReportMissingProp)(n, i);
      }
      function b() {
        const i = r.let("missing");
        if (g || f) {
          const p = r.let("valid", !0);
          n.block$data(p, () => h(i, p)), n.ok(p);
        } else
          r.if((0, e.checkMissingProp)(n, a, i)), (0, e.reportMissingProp)(n, i), r.else();
      }
      function u() {
        r.forOf("prop", c, (i) => {
          n.setParams({ missingProperty: i }), r.if((0, e.noPropertyInData)(r, d, i, _.ownProperties), () => n.error());
        });
      }
      function h(i, p) {
        n.setParams({ missingProperty: i }), r.forOf(i, c, () => {
          r.assign(p, (0, e.propertyInData)(r, d, i, _.ownProperties)), r.if((0, t.not)(p), () => {
            n.error(), r.break();
          });
        }, t.nil);
      }
    }
  };
  return cr.default = l, cr;
}
var ur = {}, ic;
function Eh() {
  if (ic) return ur;
  ic = 1, Object.defineProperty(ur, "__esModule", { value: !0 });
  const e = ee(), o = {
    keyword: ["maxItems", "minItems"],
    type: "array",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: s, schemaCode: l }) {
        const n = s === "maxItems" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${n} than ${l} items`;
      },
      params: ({ schemaCode: s }) => (0, e._)`{limit: ${s}}`
    },
    code(s) {
      const { keyword: l, data: n, schemaCode: r } = s, a = l === "maxItems" ? e.operators.GT : e.operators.LT;
      s.fail$data((0, e._)`${n}.length ${a} ${r}`);
    }
  };
  return ur.default = o, ur;
}
var lr = {}, fr = {}, oc;
function _o() {
  if (oc) return fr;
  oc = 1, Object.defineProperty(fr, "__esModule", { value: !0 });
  const e = Un();
  return e.code = 'require("ajv/dist/runtime/equal").default', fr.default = e, fr;
}
var ac;
function wh() {
  if (ac) return lr;
  ac = 1, Object.defineProperty(lr, "__esModule", { value: !0 });
  const e = jn(), t = ee(), o = se(), s = _o(), n = {
    keyword: "uniqueItems",
    type: "array",
    schemaType: "boolean",
    $data: !0,
    error: {
      message: ({ params: { i: r, j: a } }) => (0, t.str)`must NOT have duplicate items (items ## ${a} and ${r} are identical)`,
      params: ({ params: { i: r, j: a } }) => (0, t._)`{i: ${r}, j: ${a}}`
    },
    code(r) {
      const { gen: a, data: c, $data: d, schema: f, parentSchema: E, schemaCode: _, it: g } = r;
      if (!d && !f)
        return;
      const w = a.let("valid"), b = E.items ? (0, e.getSchemaTypes)(E.items) : [];
      r.block$data(w, u, (0, t._)`${_} === false`), r.ok(w);
      function u() {
        const v = a.let("i", (0, t._)`${c}.length`), m = a.let("j");
        r.setParams({ i: v, j: m }), a.assign(w, !0), a.if((0, t._)`${v} > 1`, () => (h() ? i : p)(v, m));
      }
      function h() {
        return b.length > 0 && !b.some((v) => v === "object" || v === "array");
      }
      function i(v, m) {
        const y = a.name("item"), $ = (0, e.checkDataTypes)(b, y, g.opts.strictNumbers, e.DataType.Wrong), R = a.const("indices", (0, t._)`{}`);
        a.for((0, t._)`;${v}--;`, () => {
          a.let(y, (0, t._)`${c}[${v}]`), a.if($, (0, t._)`continue`), b.length > 1 && a.if((0, t._)`typeof ${y} == "string"`, (0, t._)`${y} += "_"`), a.if((0, t._)`typeof ${R}[${y}] == "number"`, () => {
            a.assign(m, (0, t._)`${R}[${y}]`), r.error(), a.assign(w, !1).break();
          }).code((0, t._)`${R}[${y}] = ${v}`);
        });
      }
      function p(v, m) {
        const y = (0, o.useFunc)(a, s.default), $ = a.name("outer");
        a.label($).for((0, t._)`;${v}--;`, () => a.for((0, t._)`${m} = ${v}; ${m}--;`, () => a.if((0, t._)`${y}(${c}[${v}], ${c}[${m}])`, () => {
          r.error(), a.assign(w, !1).break($);
        })));
      }
    }
  };
  return lr.default = n, lr;
}
var dr = {}, cc;
function Sh() {
  if (cc) return dr;
  cc = 1, Object.defineProperty(dr, "__esModule", { value: !0 });
  const e = ee(), t = se(), o = _o(), l = {
    keyword: "const",
    $data: !0,
    error: {
      message: "must be equal to constant",
      params: ({ schemaCode: n }) => (0, e._)`{allowedValue: ${n}}`
    },
    code(n) {
      const { gen: r, data: a, $data: c, schemaCode: d, schema: f } = n;
      c || f && typeof f == "object" ? n.fail$data((0, e._)`!${(0, t.useFunc)(r, o.default)}(${a}, ${d})`) : n.fail((0, e._)`${f} !== ${a}`);
    }
  };
  return dr.default = l, dr;
}
var hr = {}, uc;
function bh() {
  if (uc) return hr;
  uc = 1, Object.defineProperty(hr, "__esModule", { value: !0 });
  const e = ee(), t = se(), o = _o(), l = {
    keyword: "enum",
    schemaType: "array",
    $data: !0,
    error: {
      message: "must be equal to one of the allowed values",
      params: ({ schemaCode: n }) => (0, e._)`{allowedValues: ${n}}`
    },
    code(n) {
      const { gen: r, data: a, $data: c, schema: d, schemaCode: f, it: E } = n;
      if (!c && d.length === 0)
        throw new Error("enum must have non-empty array");
      const _ = d.length >= E.opts.loopEnum;
      let g;
      const w = () => g ?? (g = (0, t.useFunc)(r, o.default));
      let b;
      if (_ || c)
        b = r.let("valid"), n.block$data(b, u);
      else {
        if (!Array.isArray(d))
          throw new Error("ajv implementation error");
        const i = r.const("vSchema", f);
        b = (0, e.or)(...d.map((p, v) => h(i, v)));
      }
      n.pass(b);
      function u() {
        r.assign(b, !1), r.forOf("v", f, (i) => r.if((0, e._)`${w()}(${a}, ${i})`, () => r.assign(b, !0).break()));
      }
      function h(i, p) {
        const v = d[p];
        return typeof v == "object" && v !== null ? (0, e._)`${w()}(${a}, ${i}[${p}])` : (0, e._)`${a} === ${v}`;
      }
    }
  };
  return hr.default = l, hr;
}
var lc;
function Rh() {
  if (lc) return tr;
  lc = 1, Object.defineProperty(tr, "__esModule", { value: !0 });
  const e = mh(), t = ph(), o = vh(), s = $h(), l = gh(), n = _h(), r = Eh(), a = wh(), c = Sh(), d = bh(), f = [
    // number
    e.default,
    t.default,
    // string
    o.default,
    s.default,
    // object
    l.default,
    n.default,
    // array
    r.default,
    a.default,
    // any
    { keyword: "type", schemaType: ["string", "array"] },
    { keyword: "nullable", schemaType: "boolean" },
    c.default,
    d.default
  ];
  return tr.default = f, tr;
}
var mr = {}, vt = {}, fc;
function Df() {
  if (fc) return vt;
  fc = 1, Object.defineProperty(vt, "__esModule", { value: !0 }), vt.validateAdditionalItems = void 0;
  const e = ee(), t = se(), s = {
    keyword: "additionalItems",
    type: "array",
    schemaType: ["boolean", "object"],
    before: "uniqueItems",
    error: {
      message: ({ params: { len: n } }) => (0, e.str)`must NOT have more than ${n} items`,
      params: ({ params: { len: n } }) => (0, e._)`{limit: ${n}}`
    },
    code(n) {
      const { parentSchema: r, it: a } = n, { items: c } = r;
      if (!Array.isArray(c)) {
        (0, t.checkStrictMode)(a, '"additionalItems" is ignored when "items" is not an array of schemas');
        return;
      }
      l(n, c);
    }
  };
  function l(n, r) {
    const { gen: a, schema: c, data: d, keyword: f, it: E } = n;
    E.items = !0;
    const _ = a.const("len", (0, e._)`${d}.length`);
    if (c === !1)
      n.setParams({ len: r.length }), n.pass((0, e._)`${_} <= ${r.length}`);
    else if (typeof c == "object" && !(0, t.alwaysValidSchema)(E, c)) {
      const w = a.var("valid", (0, e._)`${_} <= ${r.length}`);
      a.if((0, e.not)(w), () => g(w)), n.ok(w);
    }
    function g(w) {
      a.forRange("i", r.length, _, (b) => {
        n.subschema({ keyword: f, dataProp: b, dataPropType: t.Type.Num }, w), E.allErrors || a.if((0, e.not)(w), () => a.break());
      });
    }
  }
  return vt.validateAdditionalItems = l, vt.default = s, vt;
}
var pr = {}, $t = {}, dc;
function Af() {
  if (dc) return $t;
  dc = 1, Object.defineProperty($t, "__esModule", { value: !0 }), $t.validateTuple = void 0;
  const e = ee(), t = se(), o = qe(), s = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "array", "boolean"],
    before: "uniqueItems",
    code(n) {
      const { schema: r, it: a } = n;
      if (Array.isArray(r))
        return l(n, "additionalItems", r);
      a.items = !0, !(0, t.alwaysValidSchema)(a, r) && n.ok((0, o.validateArray)(n));
    }
  };
  function l(n, r, a = n.schema) {
    const { gen: c, parentSchema: d, data: f, keyword: E, it: _ } = n;
    b(d), _.opts.unevaluated && a.length && _.items !== !0 && (_.items = t.mergeEvaluated.items(c, a.length, _.items));
    const g = c.name("valid"), w = c.const("len", (0, e._)`${f}.length`);
    a.forEach((u, h) => {
      (0, t.alwaysValidSchema)(_, u) || (c.if((0, e._)`${w} > ${h}`, () => n.subschema({
        keyword: E,
        schemaProp: h,
        dataProp: h
      }, g)), n.ok(g));
    });
    function b(u) {
      const { opts: h, errSchemaPath: i } = _, p = a.length, v = p === u.minItems && (p === u.maxItems || u[r] === !1);
      if (h.strictTuples && !v) {
        const m = `"${E}" is ${p}-tuple, but minItems or maxItems/${r} are not specified or different at path "${i}"`;
        (0, t.checkStrictMode)(_, m, h.strictTuples);
      }
    }
  }
  return $t.validateTuple = l, $t.default = s, $t;
}
var hc;
function Nh() {
  if (hc) return pr;
  hc = 1, Object.defineProperty(pr, "__esModule", { value: !0 });
  const e = Af(), t = {
    keyword: "prefixItems",
    type: "array",
    schemaType: ["array"],
    before: "uniqueItems",
    code: (o) => (0, e.validateTuple)(o, "items")
  };
  return pr.default = t, pr;
}
var yr = {}, mc;
function Ph() {
  if (mc) return yr;
  mc = 1, Object.defineProperty(yr, "__esModule", { value: !0 });
  const e = ee(), t = se(), o = qe(), s = Df(), n = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    error: {
      message: ({ params: { len: r } }) => (0, e.str)`must NOT have more than ${r} items`,
      params: ({ params: { len: r } }) => (0, e._)`{limit: ${r}}`
    },
    code(r) {
      const { schema: a, parentSchema: c, it: d } = r, { prefixItems: f } = c;
      d.items = !0, !(0, t.alwaysValidSchema)(d, a) && (f ? (0, s.validateAdditionalItems)(r, f) : r.ok((0, o.validateArray)(r)));
    }
  };
  return yr.default = n, yr;
}
var vr = {}, pc;
function Ih() {
  if (pc) return vr;
  pc = 1, Object.defineProperty(vr, "__esModule", { value: !0 });
  const e = ee(), t = se(), s = {
    keyword: "contains",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    trackErrors: !0,
    error: {
      message: ({ params: { min: l, max: n } }) => n === void 0 ? (0, e.str)`must contain at least ${l} valid item(s)` : (0, e.str)`must contain at least ${l} and no more than ${n} valid item(s)`,
      params: ({ params: { min: l, max: n } }) => n === void 0 ? (0, e._)`{minContains: ${l}}` : (0, e._)`{minContains: ${l}, maxContains: ${n}}`
    },
    code(l) {
      const { gen: n, schema: r, parentSchema: a, data: c, it: d } = l;
      let f, E;
      const { minContains: _, maxContains: g } = a;
      d.opts.next ? (f = _ === void 0 ? 1 : _, E = g) : f = 1;
      const w = n.const("len", (0, e._)`${c}.length`);
      if (l.setParams({ min: f, max: E }), E === void 0 && f === 0) {
        (0, t.checkStrictMode)(d, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
        return;
      }
      if (E !== void 0 && f > E) {
        (0, t.checkStrictMode)(d, '"minContains" > "maxContains" is always invalid'), l.fail();
        return;
      }
      if ((0, t.alwaysValidSchema)(d, r)) {
        let p = (0, e._)`${w} >= ${f}`;
        E !== void 0 && (p = (0, e._)`${p} && ${w} <= ${E}`), l.pass(p);
        return;
      }
      d.items = !0;
      const b = n.name("valid");
      E === void 0 && f === 1 ? h(b, () => n.if(b, () => n.break())) : f === 0 ? (n.let(b, !0), E !== void 0 && n.if((0, e._)`${c}.length > 0`, u)) : (n.let(b, !1), u()), l.result(b, () => l.reset());
      function u() {
        const p = n.name("_valid"), v = n.let("count", 0);
        h(p, () => n.if(p, () => i(v)));
      }
      function h(p, v) {
        n.forRange("i", 0, w, (m) => {
          l.subschema({
            keyword: "contains",
            dataProp: m,
            dataPropType: t.Type.Num,
            compositeRule: !0
          }, p), v();
        });
      }
      function i(p) {
        n.code((0, e._)`${p}++`), E === void 0 ? n.if((0, e._)`${p} >= ${f}`, () => n.assign(b, !0).break()) : (n.if((0, e._)`${p} > ${E}`, () => n.assign(b, !1).break()), f === 1 ? n.assign(b, !0) : n.if((0, e._)`${p} >= ${f}`, () => n.assign(b, !0)));
      }
    }
  };
  return vr.default = s, vr;
}
var xs = {}, yc;
function Eo() {
  return yc || (yc = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
    const t = ee(), o = se(), s = qe();
    e.error = {
      message: ({ params: { property: c, depsCount: d, deps: f } }) => {
        const E = d === 1 ? "property" : "properties";
        return (0, t.str)`must have ${E} ${f} when property ${c} is present`;
      },
      params: ({ params: { property: c, depsCount: d, deps: f, missingProperty: E } }) => (0, t._)`{property: ${c},
    missingProperty: ${E},
    depsCount: ${d},
    deps: ${f}}`
      // TODO change to reference
    };
    const l = {
      keyword: "dependencies",
      type: "object",
      schemaType: "object",
      error: e.error,
      code(c) {
        const [d, f] = n(c);
        r(c, d), a(c, f);
      }
    };
    function n({ schema: c }) {
      const d = {}, f = {};
      for (const E in c) {
        if (E === "__proto__")
          continue;
        const _ = Array.isArray(c[E]) ? d : f;
        _[E] = c[E];
      }
      return [d, f];
    }
    function r(c, d = c.schema) {
      const { gen: f, data: E, it: _ } = c;
      if (Object.keys(d).length === 0)
        return;
      const g = f.let("missing");
      for (const w in d) {
        const b = d[w];
        if (b.length === 0)
          continue;
        const u = (0, s.propertyInData)(f, E, w, _.opts.ownProperties);
        c.setParams({
          property: w,
          depsCount: b.length,
          deps: b.join(", ")
        }), _.allErrors ? f.if(u, () => {
          for (const h of b)
            (0, s.checkReportMissingProp)(c, h);
        }) : (f.if((0, t._)`${u} && (${(0, s.checkMissingProp)(c, b, g)})`), (0, s.reportMissingProp)(c, g), f.else());
      }
    }
    e.validatePropertyDeps = r;
    function a(c, d = c.schema) {
      const { gen: f, data: E, keyword: _, it: g } = c, w = f.name("valid");
      for (const b in d)
        (0, o.alwaysValidSchema)(g, d[b]) || (f.if(
          (0, s.propertyInData)(f, E, b, g.opts.ownProperties),
          () => {
            const u = c.subschema({ keyword: _, schemaProp: b }, w);
            c.mergeValidEvaluated(u, w);
          },
          () => f.var(w, !0)
          // TODO var
        ), c.ok(w));
    }
    e.validateSchemaDeps = a, e.default = l;
  }(xs)), xs;
}
var $r = {}, vc;
function Oh() {
  if (vc) return $r;
  vc = 1, Object.defineProperty($r, "__esModule", { value: !0 });
  const e = ee(), t = se(), s = {
    keyword: "propertyNames",
    type: "object",
    schemaType: ["object", "boolean"],
    error: {
      message: "property name must be valid",
      params: ({ params: l }) => (0, e._)`{propertyName: ${l.propertyName}}`
    },
    code(l) {
      const { gen: n, schema: r, data: a, it: c } = l;
      if ((0, t.alwaysValidSchema)(c, r))
        return;
      const d = n.name("valid");
      n.forIn("key", a, (f) => {
        l.setParams({ propertyName: f }), l.subschema({
          keyword: "propertyNames",
          data: f,
          dataTypes: ["string"],
          propertyName: f,
          compositeRule: !0
        }, d), n.if((0, e.not)(d), () => {
          l.error(!0), c.allErrors || n.break();
        });
      }), l.ok(d);
    }
  };
  return $r.default = s, $r;
}
var gr = {}, $c;
function jf() {
  if ($c) return gr;
  $c = 1, Object.defineProperty(gr, "__esModule", { value: !0 });
  const e = qe(), t = ee(), o = Le(), s = se(), n = {
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
      const { gen: a, schema: c, parentSchema: d, data: f, errsCount: E, it: _ } = r;
      if (!E)
        throw new Error("ajv implementation error");
      const { allErrors: g, opts: w } = _;
      if (_.props = !0, w.removeAdditional !== "all" && (0, s.alwaysValidSchema)(_, c))
        return;
      const b = (0, e.allSchemaProperties)(d.properties), u = (0, e.allSchemaProperties)(d.patternProperties);
      h(), r.ok((0, t._)`${E} === ${o.default.errors}`);
      function h() {
        a.forIn("key", f, (y) => {
          !b.length && !u.length ? v(y) : a.if(i(y), () => v(y));
        });
      }
      function i(y) {
        let $;
        if (b.length > 8) {
          const R = (0, s.schemaRefOrVal)(_, d.properties, "properties");
          $ = (0, e.isOwnProperty)(a, R, y);
        } else b.length ? $ = (0, t.or)(...b.map((R) => (0, t._)`${y} === ${R}`)) : $ = t.nil;
        return u.length && ($ = (0, t.or)($, ...u.map((R) => (0, t._)`${(0, e.usePattern)(r, R)}.test(${y})`))), (0, t.not)($);
      }
      function p(y) {
        a.code((0, t._)`delete ${f}[${y}]`);
      }
      function v(y) {
        if (w.removeAdditional === "all" || w.removeAdditional && c === !1) {
          p(y);
          return;
        }
        if (c === !1) {
          r.setParams({ additionalProperty: y }), r.error(), g || a.break();
          return;
        }
        if (typeof c == "object" && !(0, s.alwaysValidSchema)(_, c)) {
          const $ = a.name("valid");
          w.removeAdditional === "failing" ? (m(y, $, !1), a.if((0, t.not)($), () => {
            r.reset(), p(y);
          })) : (m(y, $), g || a.if((0, t.not)($), () => a.break()));
        }
      }
      function m(y, $, R) {
        const O = {
          keyword: "additionalProperties",
          dataProp: y,
          dataPropType: s.Type.Str
        };
        R === !1 && Object.assign(O, {
          compositeRule: !0,
          createErrors: !1,
          allErrors: !1
        }), r.subschema(O, $);
      }
    }
  };
  return gr.default = n, gr;
}
var _r = {}, gc;
function Th() {
  if (gc) return _r;
  gc = 1, Object.defineProperty(_r, "__esModule", { value: !0 });
  const e = zn(), t = qe(), o = se(), s = jf(), l = {
    keyword: "properties",
    type: "object",
    schemaType: "object",
    code(n) {
      const { gen: r, schema: a, parentSchema: c, data: d, it: f } = n;
      f.opts.removeAdditional === "all" && c.additionalProperties === void 0 && s.default.code(new e.KeywordCxt(f, s.default, "additionalProperties"));
      const E = (0, t.allSchemaProperties)(a);
      for (const u of E)
        f.definedProperties.add(u);
      f.opts.unevaluated && E.length && f.props !== !0 && (f.props = o.mergeEvaluated.props(r, (0, o.toHash)(E), f.props));
      const _ = E.filter((u) => !(0, o.alwaysValidSchema)(f, a[u]));
      if (_.length === 0)
        return;
      const g = r.name("valid");
      for (const u of _)
        w(u) ? b(u) : (r.if((0, t.propertyInData)(r, d, u, f.opts.ownProperties)), b(u), f.allErrors || r.else().var(g, !0), r.endIf()), n.it.definedProperties.add(u), n.ok(g);
      function w(u) {
        return f.opts.useDefaults && !f.compositeRule && a[u].default !== void 0;
      }
      function b(u) {
        n.subschema({
          keyword: "properties",
          schemaProp: u,
          dataProp: u
        }, g);
      }
    }
  };
  return _r.default = l, _r;
}
var Er = {}, _c;
function Ch() {
  if (_c) return Er;
  _c = 1, Object.defineProperty(Er, "__esModule", { value: !0 });
  const e = qe(), t = ee(), o = se(), s = se(), l = {
    keyword: "patternProperties",
    type: "object",
    schemaType: "object",
    code(n) {
      const { gen: r, schema: a, data: c, parentSchema: d, it: f } = n, { opts: E } = f, _ = (0, e.allSchemaProperties)(a), g = _.filter((v) => (0, o.alwaysValidSchema)(f, a[v]));
      if (_.length === 0 || g.length === _.length && (!f.opts.unevaluated || f.props === !0))
        return;
      const w = E.strictSchema && !E.allowMatchingProperties && d.properties, b = r.name("valid");
      f.props !== !0 && !(f.props instanceof t.Name) && (f.props = (0, s.evaluatedPropsToName)(r, f.props));
      const { props: u } = f;
      h();
      function h() {
        for (const v of _)
          w && i(v), f.allErrors ? p(v) : (r.var(b, !0), p(v), r.if(b));
      }
      function i(v) {
        for (const m in w)
          new RegExp(v).test(m) && (0, o.checkStrictMode)(f, `property ${m} matches pattern ${v} (use allowMatchingProperties)`);
      }
      function p(v) {
        r.forIn("key", c, (m) => {
          r.if((0, t._)`${(0, e.usePattern)(n, v)}.test(${m})`, () => {
            const y = g.includes(v);
            y || n.subschema({
              keyword: "patternProperties",
              schemaProp: v,
              dataProp: m,
              dataPropType: s.Type.Str
            }, b), f.opts.unevaluated && u !== !0 ? r.assign((0, t._)`${u}[${m}]`, !0) : !y && !f.allErrors && r.if((0, t.not)(b), () => r.break());
          });
        });
      }
    }
  };
  return Er.default = l, Er;
}
var wr = {}, Ec;
function Dh() {
  if (Ec) return wr;
  Ec = 1, Object.defineProperty(wr, "__esModule", { value: !0 });
  const e = se(), t = {
    keyword: "not",
    schemaType: ["object", "boolean"],
    trackErrors: !0,
    code(o) {
      const { gen: s, schema: l, it: n } = o;
      if ((0, e.alwaysValidSchema)(n, l)) {
        o.fail();
        return;
      }
      const r = s.name("valid");
      o.subschema({
        keyword: "not",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, r), o.failResult(r, () => o.reset(), () => o.error());
    },
    error: { message: "must NOT be valid" }
  };
  return wr.default = t, wr;
}
var Sr = {}, wc;
function Ah() {
  if (wc) return Sr;
  wc = 1, Object.defineProperty(Sr, "__esModule", { value: !0 });
  const t = {
    keyword: "anyOf",
    schemaType: "array",
    trackErrors: !0,
    code: qe().validateUnion,
    error: { message: "must match a schema in anyOf" }
  };
  return Sr.default = t, Sr;
}
var br = {}, Sc;
function jh() {
  if (Sc) return br;
  Sc = 1, Object.defineProperty(br, "__esModule", { value: !0 });
  const e = ee(), t = se(), s = {
    keyword: "oneOf",
    schemaType: "array",
    trackErrors: !0,
    error: {
      message: "must match exactly one schema in oneOf",
      params: ({ params: l }) => (0, e._)`{passingSchemas: ${l.passing}}`
    },
    code(l) {
      const { gen: n, schema: r, parentSchema: a, it: c } = l;
      if (!Array.isArray(r))
        throw new Error("ajv implementation error");
      if (c.opts.discriminator && a.discriminator)
        return;
      const d = r, f = n.let("valid", !1), E = n.let("passing", null), _ = n.name("_valid");
      l.setParams({ passing: E }), n.block(g), l.result(f, () => l.reset(), () => l.error(!0));
      function g() {
        d.forEach((w, b) => {
          let u;
          (0, t.alwaysValidSchema)(c, w) ? n.var(_, !0) : u = l.subschema({
            keyword: "oneOf",
            schemaProp: b,
            compositeRule: !0
          }, _), b > 0 && n.if((0, e._)`${_} && ${f}`).assign(f, !1).assign(E, (0, e._)`[${E}, ${b}]`).else(), n.if(_, () => {
            n.assign(f, !0), n.assign(E, b), u && l.mergeEvaluated(u, e.Name);
          });
        });
      }
    }
  };
  return br.default = s, br;
}
var Rr = {}, bc;
function kh() {
  if (bc) return Rr;
  bc = 1, Object.defineProperty(Rr, "__esModule", { value: !0 });
  const e = se(), t = {
    keyword: "allOf",
    schemaType: "array",
    code(o) {
      const { gen: s, schema: l, it: n } = o;
      if (!Array.isArray(l))
        throw new Error("ajv implementation error");
      const r = s.name("valid");
      l.forEach((a, c) => {
        if ((0, e.alwaysValidSchema)(n, a))
          return;
        const d = o.subschema({ keyword: "allOf", schemaProp: c }, r);
        o.ok(r), o.mergeEvaluated(d);
      });
    }
  };
  return Rr.default = t, Rr;
}
var Nr = {}, Rc;
function Lh() {
  if (Rc) return Nr;
  Rc = 1, Object.defineProperty(Nr, "__esModule", { value: !0 });
  const e = ee(), t = se(), s = {
    keyword: "if",
    schemaType: ["object", "boolean"],
    trackErrors: !0,
    error: {
      message: ({ params: n }) => (0, e.str)`must match "${n.ifClause}" schema`,
      params: ({ params: n }) => (0, e._)`{failingKeyword: ${n.ifClause}}`
    },
    code(n) {
      const { gen: r, parentSchema: a, it: c } = n;
      a.then === void 0 && a.else === void 0 && (0, t.checkStrictMode)(c, '"if" without "then" and "else" is ignored');
      const d = l(c, "then"), f = l(c, "else");
      if (!d && !f)
        return;
      const E = r.let("valid", !0), _ = r.name("_valid");
      if (g(), n.reset(), d && f) {
        const b = r.let("ifClause");
        n.setParams({ ifClause: b }), r.if(_, w("then", b), w("else", b));
      } else d ? r.if(_, w("then")) : r.if((0, e.not)(_), w("else"));
      n.pass(E, () => n.error(!0));
      function g() {
        const b = n.subschema({
          keyword: "if",
          compositeRule: !0,
          createErrors: !1,
          allErrors: !1
        }, _);
        n.mergeEvaluated(b);
      }
      function w(b, u) {
        return () => {
          const h = n.subschema({ keyword: b }, _);
          r.assign(E, _), n.mergeValidEvaluated(h, E), u ? r.assign(u, (0, e._)`${b}`) : n.setParams({ ifClause: b });
        };
      }
    }
  };
  function l(n, r) {
    const a = n.schema[r];
    return a !== void 0 && !(0, t.alwaysValidSchema)(n, a);
  }
  return Nr.default = s, Nr;
}
var Pr = {}, Nc;
function qh() {
  if (Nc) return Pr;
  Nc = 1, Object.defineProperty(Pr, "__esModule", { value: !0 });
  const e = se(), t = {
    keyword: ["then", "else"],
    schemaType: ["object", "boolean"],
    code({ keyword: o, parentSchema: s, it: l }) {
      s.if === void 0 && (0, e.checkStrictMode)(l, `"${o}" without "if" is ignored`);
    }
  };
  return Pr.default = t, Pr;
}
var Pc;
function Fh() {
  if (Pc) return mr;
  Pc = 1, Object.defineProperty(mr, "__esModule", { value: !0 });
  const e = Df(), t = Nh(), o = Af(), s = Ph(), l = Ih(), n = Eo(), r = Oh(), a = jf(), c = Th(), d = Ch(), f = Dh(), E = Ah(), _ = jh(), g = kh(), w = Lh(), b = qh();
  function u(h = !1) {
    const i = [
      // any
      f.default,
      E.default,
      _.default,
      g.default,
      w.default,
      b.default,
      // object
      r.default,
      a.default,
      n.default,
      c.default,
      d.default
    ];
    return h ? i.push(t.default, s.default) : i.push(e.default, o.default), i.push(l.default), i;
  }
  return mr.default = u, mr;
}
var Ir = {}, gt = {}, Ic;
function kf() {
  if (Ic) return gt;
  Ic = 1, Object.defineProperty(gt, "__esModule", { value: !0 }), gt.dynamicAnchor = void 0;
  const e = ee(), t = Le(), o = Kn(), s = go(), l = {
    keyword: "$dynamicAnchor",
    schemaType: "string",
    code: (a) => n(a, a.schema)
  };
  function n(a, c) {
    const { gen: d, it: f } = a;
    f.schemaEnv.root.dynamicAnchors[c] = !0;
    const E = (0, e._)`${t.default.dynamicAnchors}${(0, e.getProperty)(c)}`, _ = f.errSchemaPath === "#" ? f.validateName : r(a);
    d.if((0, e._)`!${E}`, () => d.assign(E, _));
  }
  gt.dynamicAnchor = n;
  function r(a) {
    const { schemaEnv: c, schema: d, self: f } = a.it, { root: E, baseId: _, localRefs: g, meta: w } = c.root, { schemaId: b } = f.opts, u = new o.SchemaEnv({ schema: d, schemaId: b, root: E, baseId: _, localRefs: g, meta: w });
    return o.compileSchema.call(f, u), (0, s.getValidate)(a, u);
  }
  return gt.default = l, gt;
}
var _t = {}, Oc;
function Lf() {
  if (Oc) return _t;
  Oc = 1, Object.defineProperty(_t, "__esModule", { value: !0 }), _t.dynamicRef = void 0;
  const e = ee(), t = Le(), o = go(), s = {
    keyword: "$dynamicRef",
    schemaType: "string",
    code: (n) => l(n, n.schema)
  };
  function l(n, r) {
    const { gen: a, keyword: c, it: d } = n;
    if (r[0] !== "#")
      throw new Error(`"${c}" only supports hash fragment reference`);
    const f = r.slice(1);
    if (d.allErrors)
      E();
    else {
      const g = a.let("valid", !1);
      E(g), n.ok(g);
    }
    function E(g) {
      if (d.schemaEnv.root.dynamicAnchors[f]) {
        const w = a.let("_v", (0, e._)`${t.default.dynamicAnchors}${(0, e.getProperty)(f)}`);
        a.if(w, _(w, g), _(d.validateName, g));
      } else
        _(d.validateName, g)();
    }
    function _(g, w) {
      return w ? () => a.block(() => {
        (0, o.callRef)(n, g), a.let(w, !0);
      }) : () => (0, o.callRef)(n, g);
    }
  }
  return _t.dynamicRef = l, _t.default = s, _t;
}
var Or = {}, Tc;
function Mh() {
  if (Tc) return Or;
  Tc = 1, Object.defineProperty(Or, "__esModule", { value: !0 });
  const e = kf(), t = se(), o = {
    keyword: "$recursiveAnchor",
    schemaType: "boolean",
    code(s) {
      s.schema ? (0, e.dynamicAnchor)(s, "") : (0, t.checkStrictMode)(s.it, "$recursiveAnchor: false is ignored");
    }
  };
  return Or.default = o, Or;
}
var Tr = {}, Cc;
function Uh() {
  if (Cc) return Tr;
  Cc = 1, Object.defineProperty(Tr, "__esModule", { value: !0 });
  const e = Lf(), t = {
    keyword: "$recursiveRef",
    schemaType: "string",
    code: (o) => (0, e.dynamicRef)(o, o.schema)
  };
  return Tr.default = t, Tr;
}
var Dc;
function Vh() {
  if (Dc) return Ir;
  Dc = 1, Object.defineProperty(Ir, "__esModule", { value: !0 });
  const e = kf(), t = Lf(), o = Mh(), s = Uh(), l = [e.default, t.default, o.default, s.default];
  return Ir.default = l, Ir;
}
var Cr = {}, Dr = {}, Ac;
function zh() {
  if (Ac) return Dr;
  Ac = 1, Object.defineProperty(Dr, "__esModule", { value: !0 });
  const e = Eo(), t = {
    keyword: "dependentRequired",
    type: "object",
    schemaType: "object",
    error: e.error,
    code: (o) => (0, e.validatePropertyDeps)(o)
  };
  return Dr.default = t, Dr;
}
var Ar = {}, jc;
function Gh() {
  if (jc) return Ar;
  jc = 1, Object.defineProperty(Ar, "__esModule", { value: !0 });
  const e = Eo(), t = {
    keyword: "dependentSchemas",
    type: "object",
    schemaType: "object",
    code: (o) => (0, e.validateSchemaDeps)(o)
  };
  return Ar.default = t, Ar;
}
var jr = {}, kc;
function Kh() {
  if (kc) return jr;
  kc = 1, Object.defineProperty(jr, "__esModule", { value: !0 });
  const e = se(), t = {
    keyword: ["maxContains", "minContains"],
    type: "array",
    schemaType: "number",
    code({ keyword: o, parentSchema: s, it: l }) {
      s.contains === void 0 && (0, e.checkStrictMode)(l, `"${o}" without "contains" is ignored`);
    }
  };
  return jr.default = t, jr;
}
var Lc;
function Hh() {
  if (Lc) return Cr;
  Lc = 1, Object.defineProperty(Cr, "__esModule", { value: !0 });
  const e = zh(), t = Gh(), o = Kh(), s = [e.default, t.default, o.default];
  return Cr.default = s, Cr;
}
var kr = {}, Lr = {}, qc;
function Bh() {
  if (qc) return Lr;
  qc = 1, Object.defineProperty(Lr, "__esModule", { value: !0 });
  const e = ee(), t = se(), o = Le(), l = {
    keyword: "unevaluatedProperties",
    type: "object",
    schemaType: ["boolean", "object"],
    trackErrors: !0,
    error: {
      message: "must NOT have unevaluated properties",
      params: ({ params: n }) => (0, e._)`{unevaluatedProperty: ${n.unevaluatedProperty}}`
    },
    code(n) {
      const { gen: r, schema: a, data: c, errsCount: d, it: f } = n;
      if (!d)
        throw new Error("ajv implementation error");
      const { allErrors: E, props: _ } = f;
      _ instanceof e.Name ? r.if((0, e._)`${_} !== true`, () => r.forIn("key", c, (u) => r.if(w(_, u), () => g(u)))) : _ !== !0 && r.forIn("key", c, (u) => _ === void 0 ? g(u) : r.if(b(_, u), () => g(u))), f.props = !0, n.ok((0, e._)`${d} === ${o.default.errors}`);
      function g(u) {
        if (a === !1) {
          n.setParams({ unevaluatedProperty: u }), n.error(), E || r.break();
          return;
        }
        if (!(0, t.alwaysValidSchema)(f, a)) {
          const h = r.name("valid");
          n.subschema({
            keyword: "unevaluatedProperties",
            dataProp: u,
            dataPropType: t.Type.Str
          }, h), E || r.if((0, e.not)(h), () => r.break());
        }
      }
      function w(u, h) {
        return (0, e._)`!${u} || !${u}[${h}]`;
      }
      function b(u, h) {
        const i = [];
        for (const p in u)
          u[p] === !0 && i.push((0, e._)`${h} !== ${p}`);
        return (0, e.and)(...i);
      }
    }
  };
  return Lr.default = l, Lr;
}
var qr = {}, Fc;
function xh() {
  if (Fc) return qr;
  Fc = 1, Object.defineProperty(qr, "__esModule", { value: !0 });
  const e = ee(), t = se(), s = {
    keyword: "unevaluatedItems",
    type: "array",
    schemaType: ["boolean", "object"],
    error: {
      message: ({ params: { len: l } }) => (0, e.str)`must NOT have more than ${l} items`,
      params: ({ params: { len: l } }) => (0, e._)`{limit: ${l}}`
    },
    code(l) {
      const { gen: n, schema: r, data: a, it: c } = l, d = c.items || 0;
      if (d === !0)
        return;
      const f = n.const("len", (0, e._)`${a}.length`);
      if (r === !1)
        l.setParams({ len: d }), l.fail((0, e._)`${f} > ${d}`);
      else if (typeof r == "object" && !(0, t.alwaysValidSchema)(c, r)) {
        const _ = n.var("valid", (0, e._)`${f} <= ${d}`);
        n.if((0, e.not)(_), () => E(_, d)), l.ok(_);
      }
      c.items = !0;
      function E(_, g) {
        n.forRange("i", g, f, (w) => {
          l.subschema({ keyword: "unevaluatedItems", dataProp: w, dataPropType: t.Type.Num }, _), c.allErrors || n.if((0, e.not)(_), () => n.break());
        });
      }
    }
  };
  return qr.default = s, qr;
}
var Mc;
function Jh() {
  if (Mc) return kr;
  Mc = 1, Object.defineProperty(kr, "__esModule", { value: !0 });
  const e = Bh(), t = xh(), o = [e.default, t.default];
  return kr.default = o, kr;
}
var Fr = {}, Mr = {}, Uc;
function Wh() {
  if (Uc) return Mr;
  Uc = 1, Object.defineProperty(Mr, "__esModule", { value: !0 });
  const e = ee(), o = {
    keyword: "format",
    type: ["number", "string"],
    schemaType: "string",
    $data: !0,
    error: {
      message: ({ schemaCode: s }) => (0, e.str)`must match format "${s}"`,
      params: ({ schemaCode: s }) => (0, e._)`{format: ${s}}`
    },
    code(s, l) {
      const { gen: n, data: r, $data: a, schema: c, schemaCode: d, it: f } = s, { opts: E, errSchemaPath: _, schemaEnv: g, self: w } = f;
      if (!E.validateFormats)
        return;
      a ? b() : u();
      function b() {
        const h = n.scopeValue("formats", {
          ref: w.formats,
          code: E.code.formats
        }), i = n.const("fDef", (0, e._)`${h}[${d}]`), p = n.let("fType"), v = n.let("format");
        n.if((0, e._)`typeof ${i} == "object" && !(${i} instanceof RegExp)`, () => n.assign(p, (0, e._)`${i}.type || "string"`).assign(v, (0, e._)`${i}.validate`), () => n.assign(p, (0, e._)`"string"`).assign(v, i)), s.fail$data((0, e.or)(m(), y()));
        function m() {
          return E.strictSchema === !1 ? e.nil : (0, e._)`${d} && !${v}`;
        }
        function y() {
          const $ = g.$async ? (0, e._)`(${i}.async ? await ${v}(${r}) : ${v}(${r}))` : (0, e._)`${v}(${r})`, R = (0, e._)`(typeof ${v} == "function" ? ${$} : ${v}.test(${r}))`;
          return (0, e._)`${v} && ${v} !== true && ${p} === ${l} && !${R}`;
        }
      }
      function u() {
        const h = w.formats[c];
        if (!h) {
          m();
          return;
        }
        if (h === !0)
          return;
        const [i, p, v] = y(h);
        i === l && s.pass($());
        function m() {
          if (E.strictSchema === !1) {
            w.logger.warn(R());
            return;
          }
          throw new Error(R());
          function R() {
            return `unknown format "${c}" ignored in schema at path "${_}"`;
          }
        }
        function y(R) {
          const O = R instanceof RegExp ? (0, e.regexpCode)(R) : E.code.formats ? (0, e._)`${E.code.formats}${(0, e.getProperty)(c)}` : void 0, j = n.scopeValue("formats", { key: c, ref: R, code: O });
          return typeof R == "object" && !(R instanceof RegExp) ? [R.type || "string", R.validate, (0, e._)`${j}.validate`] : ["string", R, j];
        }
        function $() {
          if (typeof h == "object" && !(h instanceof RegExp) && h.async) {
            if (!g.$async)
              throw new Error("async format in sync schema");
            return (0, e._)`await ${v}(${r})`;
          }
          return typeof p == "function" ? (0, e._)`${v}(${r})` : (0, e._)`${v}.test(${r})`;
        }
      }
    }
  };
  return Mr.default = o, Mr;
}
var Vc;
function Zh() {
  if (Vc) return Fr;
  Vc = 1, Object.defineProperty(Fr, "__esModule", { value: !0 });
  const t = [Wh().default];
  return Fr.default = t, Fr;
}
var lt = {}, zc;
function Xh() {
  return zc || (zc = 1, Object.defineProperty(lt, "__esModule", { value: !0 }), lt.contentVocabulary = lt.metadataVocabulary = void 0, lt.metadataVocabulary = [
    "title",
    "description",
    "default",
    "deprecated",
    "readOnly",
    "writeOnly",
    "examples"
  ], lt.contentVocabulary = [
    "contentMediaType",
    "contentEncoding",
    "contentSchema"
  ]), lt;
}
var Gc;
function Yh() {
  if (Gc) return Yt;
  Gc = 1, Object.defineProperty(Yt, "__esModule", { value: !0 });
  const e = hh(), t = Rh(), o = Fh(), s = Vh(), l = Hh(), n = Jh(), r = Zh(), a = Xh(), c = [
    s.default,
    e.default,
    t.default,
    (0, o.default)(!0),
    r.default,
    a.metadataVocabulary,
    a.contentVocabulary,
    l.default,
    n.default
  ];
  return Yt.default = c, Yt;
}
var Ur = {}, Dt = {}, Kc;
function Qh() {
  if (Kc) return Dt;
  Kc = 1, Object.defineProperty(Dt, "__esModule", { value: !0 }), Dt.DiscrError = void 0;
  var e;
  return function(t) {
    t.Tag = "tag", t.Mapping = "mapping";
  }(e || (Dt.DiscrError = e = {})), Dt;
}
var Hc;
function em() {
  if (Hc) return Ur;
  Hc = 1, Object.defineProperty(Ur, "__esModule", { value: !0 });
  const e = ee(), t = Qh(), o = Kn(), s = Gn(), l = se(), r = {
    keyword: "discriminator",
    type: "object",
    schemaType: "object",
    error: {
      message: ({ params: { discrError: a, tagName: c } }) => a === t.DiscrError.Tag ? `tag "${c}" must be string` : `value of tag "${c}" must be in oneOf`,
      params: ({ params: { discrError: a, tag: c, tagName: d } }) => (0, e._)`{error: ${a}, tag: ${d}, tagValue: ${c}}`
    },
    code(a) {
      const { gen: c, data: d, schema: f, parentSchema: E, it: _ } = a, { oneOf: g } = E;
      if (!_.opts.discriminator)
        throw new Error("discriminator: requires discriminator option");
      const w = f.propertyName;
      if (typeof w != "string")
        throw new Error("discriminator: requires propertyName");
      if (f.mapping)
        throw new Error("discriminator: mapping is not supported");
      if (!g)
        throw new Error("discriminator: requires oneOf keyword");
      const b = c.let("valid", !1), u = c.const("tag", (0, e._)`${d}${(0, e.getProperty)(w)}`);
      c.if((0, e._)`typeof ${u} == "string"`, () => h(), () => a.error(!1, { discrError: t.DiscrError.Tag, tag: u, tagName: w })), a.ok(b);
      function h() {
        const v = p();
        c.if(!1);
        for (const m in v)
          c.elseIf((0, e._)`${u} === ${m}`), c.assign(b, i(v[m]));
        c.else(), a.error(!1, { discrError: t.DiscrError.Mapping, tag: u, tagName: w }), c.endIf();
      }
      function i(v) {
        const m = c.name("valid"), y = a.subschema({ keyword: "oneOf", schemaProp: v }, m);
        return a.mergeEvaluated(y, e.Name), m;
      }
      function p() {
        var v;
        const m = {}, y = R(E);
        let $ = !0;
        for (let L = 0; L < g.length; L++) {
          let V = g[L];
          if (V?.$ref && !(0, l.schemaHasRulesButRef)(V, _.self.RULES)) {
            const M = V.$ref;
            if (V = o.resolveRef.call(_.self, _.schemaEnv.root, _.baseId, M), V instanceof o.SchemaEnv && (V = V.schema), V === void 0)
              throw new s.default(_.opts.uriResolver, _.baseId, M);
          }
          const F = (v = V?.properties) === null || v === void 0 ? void 0 : v[w];
          if (typeof F != "object")
            throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${w}"`);
          $ = $ && (y || R(V)), O(F, L);
        }
        if (!$)
          throw new Error(`discriminator: "${w}" must be required`);
        return m;
        function R({ required: L }) {
          return Array.isArray(L) && L.includes(w);
        }
        function O(L, V) {
          if (L.const)
            j(L.const, V);
          else if (L.enum)
            for (const F of L.enum)
              j(F, V);
          else
            throw new Error(`discriminator: "properties/${w}" must have "const" or "enum"`);
        }
        function j(L, V) {
          if (typeof L != "string" || L in m)
            throw new Error(`discriminator: "${w}" values must be unique strings`);
          m[L] = V;
        }
      }
    }
  };
  return Ur.default = r, Ur;
}
var Vr = {};
const tm = "https://json-schema.org/draft/2020-12/schema", rm = "https://json-schema.org/draft/2020-12/schema", nm = { "https://json-schema.org/draft/2020-12/vocab/core": !0, "https://json-schema.org/draft/2020-12/vocab/applicator": !0, "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0, "https://json-schema.org/draft/2020-12/vocab/validation": !0, "https://json-schema.org/draft/2020-12/vocab/meta-data": !0, "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0, "https://json-schema.org/draft/2020-12/vocab/content": !0 }, sm = "meta", im = "Core and Validation specifications meta-schema", om = [{ $ref: "meta/core" }, { $ref: "meta/applicator" }, { $ref: "meta/unevaluated" }, { $ref: "meta/validation" }, { $ref: "meta/meta-data" }, { $ref: "meta/format-annotation" }, { $ref: "meta/content" }], am = ["object", "boolean"], cm = "This meta-schema also defines keywords that have appeared in previous drafts in order to prevent incompatible extensions as they remain in common use.", um = { definitions: { $comment: '"definitions" has been replaced by "$defs".', type: "object", additionalProperties: { $dynamicRef: "#meta" }, deprecated: !0, default: {} }, dependencies: { $comment: '"dependencies" has been split and replaced by "dependentSchemas" and "dependentRequired" in order to serve their differing semantics.', type: "object", additionalProperties: { anyOf: [{ $dynamicRef: "#meta" }, { $ref: "meta/validation#/$defs/stringArray" }] }, deprecated: !0, default: {} }, $recursiveAnchor: { $comment: '"$recursiveAnchor" has been replaced by "$dynamicAnchor".', $ref: "meta/core#/$defs/anchorString", deprecated: !0 }, $recursiveRef: { $comment: '"$recursiveRef" has been replaced by "$dynamicRef".', $ref: "meta/core#/$defs/uriReferenceString", deprecated: !0 } }, lm = {
  $schema: tm,
  $id: rm,
  $vocabulary: nm,
  $dynamicAnchor: sm,
  title: im,
  allOf: om,
  type: am,
  $comment: cm,
  properties: um
}, fm = "https://json-schema.org/draft/2020-12/schema", dm = "https://json-schema.org/draft/2020-12/meta/applicator", hm = { "https://json-schema.org/draft/2020-12/vocab/applicator": !0 }, mm = "meta", pm = "Applicator vocabulary meta-schema", ym = ["object", "boolean"], vm = { prefixItems: { $ref: "#/$defs/schemaArray" }, items: { $dynamicRef: "#meta" }, contains: { $dynamicRef: "#meta" }, additionalProperties: { $dynamicRef: "#meta" }, properties: { type: "object", additionalProperties: { $dynamicRef: "#meta" }, default: {} }, patternProperties: { type: "object", additionalProperties: { $dynamicRef: "#meta" }, propertyNames: { format: "regex" }, default: {} }, dependentSchemas: { type: "object", additionalProperties: { $dynamicRef: "#meta" }, default: {} }, propertyNames: { $dynamicRef: "#meta" }, if: { $dynamicRef: "#meta" }, then: { $dynamicRef: "#meta" }, else: { $dynamicRef: "#meta" }, allOf: { $ref: "#/$defs/schemaArray" }, anyOf: { $ref: "#/$defs/schemaArray" }, oneOf: { $ref: "#/$defs/schemaArray" }, not: { $dynamicRef: "#meta" } }, $m = { schemaArray: { type: "array", minItems: 1, items: { $dynamicRef: "#meta" } } }, gm = {
  $schema: fm,
  $id: dm,
  $vocabulary: hm,
  $dynamicAnchor: mm,
  title: pm,
  type: ym,
  properties: vm,
  $defs: $m
}, _m = "https://json-schema.org/draft/2020-12/schema", Em = "https://json-schema.org/draft/2020-12/meta/unevaluated", wm = { "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0 }, Sm = "meta", bm = "Unevaluated applicator vocabulary meta-schema", Rm = ["object", "boolean"], Nm = { unevaluatedItems: { $dynamicRef: "#meta" }, unevaluatedProperties: { $dynamicRef: "#meta" } }, Pm = {
  $schema: _m,
  $id: Em,
  $vocabulary: wm,
  $dynamicAnchor: Sm,
  title: bm,
  type: Rm,
  properties: Nm
}, Im = "https://json-schema.org/draft/2020-12/schema", Om = "https://json-schema.org/draft/2020-12/meta/content", Tm = { "https://json-schema.org/draft/2020-12/vocab/content": !0 }, Cm = "meta", Dm = "Content vocabulary meta-schema", Am = ["object", "boolean"], jm = { contentEncoding: { type: "string" }, contentMediaType: { type: "string" }, contentSchema: { $dynamicRef: "#meta" } }, km = {
  $schema: Im,
  $id: Om,
  $vocabulary: Tm,
  $dynamicAnchor: Cm,
  title: Dm,
  type: Am,
  properties: jm
}, Lm = "https://json-schema.org/draft/2020-12/schema", qm = "https://json-schema.org/draft/2020-12/meta/core", Fm = { "https://json-schema.org/draft/2020-12/vocab/core": !0 }, Mm = "meta", Um = "Core vocabulary meta-schema", Vm = ["object", "boolean"], zm = { $id: { $ref: "#/$defs/uriReferenceString", $comment: "Non-empty fragments not allowed.", pattern: "^[^#]*#?$" }, $schema: { $ref: "#/$defs/uriString" }, $ref: { $ref: "#/$defs/uriReferenceString" }, $anchor: { $ref: "#/$defs/anchorString" }, $dynamicRef: { $ref: "#/$defs/uriReferenceString" }, $dynamicAnchor: { $ref: "#/$defs/anchorString" }, $vocabulary: { type: "object", propertyNames: { $ref: "#/$defs/uriString" }, additionalProperties: { type: "boolean" } }, $comment: { type: "string" }, $defs: { type: "object", additionalProperties: { $dynamicRef: "#meta" } } }, Gm = { anchorString: { type: "string", pattern: "^[A-Za-z_][-A-Za-z0-9._]*$" }, uriString: { type: "string", format: "uri" }, uriReferenceString: { type: "string", format: "uri-reference" } }, Km = {
  $schema: Lm,
  $id: qm,
  $vocabulary: Fm,
  $dynamicAnchor: Mm,
  title: Um,
  type: Vm,
  properties: zm,
  $defs: Gm
}, Hm = "https://json-schema.org/draft/2020-12/schema", Bm = "https://json-schema.org/draft/2020-12/meta/format-annotation", xm = { "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0 }, Jm = "meta", Wm = "Format vocabulary meta-schema for annotation results", Zm = ["object", "boolean"], Xm = { format: { type: "string" } }, Ym = {
  $schema: Hm,
  $id: Bm,
  $vocabulary: xm,
  $dynamicAnchor: Jm,
  title: Wm,
  type: Zm,
  properties: Xm
}, Qm = "https://json-schema.org/draft/2020-12/schema", ep = "https://json-schema.org/draft/2020-12/meta/meta-data", tp = { "https://json-schema.org/draft/2020-12/vocab/meta-data": !0 }, rp = "meta", np = "Meta-data vocabulary meta-schema", sp = ["object", "boolean"], ip = { title: { type: "string" }, description: { type: "string" }, default: !0, deprecated: { type: "boolean", default: !1 }, readOnly: { type: "boolean", default: !1 }, writeOnly: { type: "boolean", default: !1 }, examples: { type: "array", items: !0 } }, op = {
  $schema: Qm,
  $id: ep,
  $vocabulary: tp,
  $dynamicAnchor: rp,
  title: np,
  type: sp,
  properties: ip
}, ap = "https://json-schema.org/draft/2020-12/schema", cp = "https://json-schema.org/draft/2020-12/meta/validation", up = { "https://json-schema.org/draft/2020-12/vocab/validation": !0 }, lp = "meta", fp = "Validation vocabulary meta-schema", dp = ["object", "boolean"], hp = { type: { anyOf: [{ $ref: "#/$defs/simpleTypes" }, { type: "array", items: { $ref: "#/$defs/simpleTypes" }, minItems: 1, uniqueItems: !0 }] }, const: !0, enum: { type: "array", items: !0 }, multipleOf: { type: "number", exclusiveMinimum: 0 }, maximum: { type: "number" }, exclusiveMaximum: { type: "number" }, minimum: { type: "number" }, exclusiveMinimum: { type: "number" }, maxLength: { $ref: "#/$defs/nonNegativeInteger" }, minLength: { $ref: "#/$defs/nonNegativeIntegerDefault0" }, pattern: { type: "string", format: "regex" }, maxItems: { $ref: "#/$defs/nonNegativeInteger" }, minItems: { $ref: "#/$defs/nonNegativeIntegerDefault0" }, uniqueItems: { type: "boolean", default: !1 }, maxContains: { $ref: "#/$defs/nonNegativeInteger" }, minContains: { $ref: "#/$defs/nonNegativeInteger", default: 1 }, maxProperties: { $ref: "#/$defs/nonNegativeInteger" }, minProperties: { $ref: "#/$defs/nonNegativeIntegerDefault0" }, required: { $ref: "#/$defs/stringArray" }, dependentRequired: { type: "object", additionalProperties: { $ref: "#/$defs/stringArray" } } }, mp = { nonNegativeInteger: { type: "integer", minimum: 0 }, nonNegativeIntegerDefault0: { $ref: "#/$defs/nonNegativeInteger", default: 0 }, simpleTypes: { enum: ["array", "boolean", "integer", "null", "number", "object", "string"] }, stringArray: { type: "array", items: { type: "string" }, uniqueItems: !0, default: [] } }, pp = {
  $schema: ap,
  $id: cp,
  $vocabulary: up,
  $dynamicAnchor: lp,
  title: fp,
  type: dp,
  properties: hp,
  $defs: mp
};
var Bc;
function yp() {
  if (Bc) return Vr;
  Bc = 1, Object.defineProperty(Vr, "__esModule", { value: !0 });
  const e = lm, t = gm, o = Pm, s = km, l = Km, n = Ym, r = op, a = pp, c = ["/properties"];
  function d(f) {
    return [
      e,
      t,
      o,
      s,
      l,
      E(this, n),
      r,
      E(this, a)
    ].forEach((_) => this.addMetaSchema(_, void 0, !1)), this;
    function E(_, g) {
      return f ? _.$dataMetaSchema(g, c) : g;
    }
  }
  return Vr.default = d, Vr;
}
var xc;
function vp() {
  return xc || (xc = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv2020 = void 0;
    const o = fh(), s = Yh(), l = em(), n = yp(), r = "https://json-schema.org/draft/2020-12/schema";
    class a extends o.default {
      constructor(g = {}) {
        super({
          ...g,
          dynamicRef: !0,
          next: !0,
          unevaluated: !0
        });
      }
      _addVocabularies() {
        super._addVocabularies(), s.default.forEach((g) => this.addVocabulary(g)), this.opts.discriminator && this.addKeyword(l.default);
      }
      _addDefaultMetaSchema() {
        super._addDefaultMetaSchema();
        const { $data: g, meta: w } = this.opts;
        w && (n.default.call(this, g), this.refs["http://json-schema.org/schema"] = r);
      }
      defaultMeta() {
        return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(r) ? r : void 0);
      }
    }
    t.Ajv2020 = a, e.exports = t = a, e.exports.Ajv2020 = a, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = a;
    var c = zn();
    Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
      return c.KeywordCxt;
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
    var f = $o();
    Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
      return f.default;
    } });
    var E = Gn();
    Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
      return E.default;
    } });
  }(xt, xt.exports)), xt.exports;
}
var $p = vp(), zr = { exports: {} }, Js = {}, Jc;
function gp() {
  return Jc || (Jc = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
    function t(L, V) {
      return { validate: L, compare: V };
    }
    e.fullFormats = {
      // date: http://tools.ietf.org/html/rfc3339#section-5.6
      date: t(n, r),
      // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
      time: t(c(!0), d),
      "date-time": t(_(!0), g),
      "iso-time": t(c(), f),
      "iso-date-time": t(_(), w),
      // duration: https://tools.ietf.org/html/rfc3339#appendix-A
      duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
      uri: h,
      "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
      // uri-template: https://tools.ietf.org/html/rfc6570
      "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
      // For the source: https://gist.github.com/dperini/729294
      // For test cases: https://mathiasbynens.be/demo/url-regex
      url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
      email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
      hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
      // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
      ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
      ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
      regex: j,
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
      byte: p,
      // signed 32 bit integer
      int32: { type: "number", validate: y },
      // signed 64 bit integer
      int64: { type: "number", validate: $ },
      // C-type float
      float: { type: "number", validate: R },
      // C-type double
      double: { type: "number", validate: R },
      // hint to the UI to hide input strings
      password: !0,
      // unchecked string payload
      binary: !0
    }, e.fastFormats = {
      ...e.fullFormats,
      date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, r),
      time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, d),
      "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, g),
      "iso-time": t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, f),
      "iso-date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, w),
      // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
      uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
      "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
      // email (sources from jsen validator):
      // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
      // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
      email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
    }, e.formatNames = Object.keys(e.fullFormats);
    function o(L) {
      return L % 4 === 0 && (L % 100 !== 0 || L % 400 === 0);
    }
    const s = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, l = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function n(L) {
      const V = s.exec(L);
      if (!V)
        return !1;
      const F = +V[1], M = +V[2], z = +V[3];
      return M >= 1 && M <= 12 && z >= 1 && z <= (M === 2 && o(F) ? 29 : l[M]);
    }
    function r(L, V) {
      if (L && V)
        return L > V ? 1 : L < V ? -1 : 0;
    }
    const a = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
    function c(L) {
      return function(F) {
        const M = a.exec(F);
        if (!M)
          return !1;
        const z = +M[1], J = +M[2], x = +M[3], B = M[4], W = M[5] === "-" ? -1 : 1, q = +(M[6] || 0), I = +(M[7] || 0);
        if (q > 23 || I > 59 || L && !B)
          return !1;
        if (z <= 23 && J <= 59 && x < 60)
          return !0;
        const A = J - I * W, C = z - q * W - (A < 0 ? 1 : 0);
        return (C === 23 || C === -1) && (A === 59 || A === -1) && x < 61;
      };
    }
    function d(L, V) {
      if (!(L && V))
        return;
      const F = (/* @__PURE__ */ new Date("2020-01-01T" + L)).valueOf(), M = (/* @__PURE__ */ new Date("2020-01-01T" + V)).valueOf();
      if (F && M)
        return F - M;
    }
    function f(L, V) {
      if (!(L && V))
        return;
      const F = a.exec(L), M = a.exec(V);
      if (F && M)
        return L = F[1] + F[2] + F[3], V = M[1] + M[2] + M[3], L > V ? 1 : L < V ? -1 : 0;
    }
    const E = /t|\s/i;
    function _(L) {
      const V = c(L);
      return function(M) {
        const z = M.split(E);
        return z.length === 2 && n(z[0]) && V(z[1]);
      };
    }
    function g(L, V) {
      if (!(L && V))
        return;
      const F = new Date(L).valueOf(), M = new Date(V).valueOf();
      if (F && M)
        return F - M;
    }
    function w(L, V) {
      if (!(L && V))
        return;
      const [F, M] = L.split(E), [z, J] = V.split(E), x = r(F, z);
      if (x !== void 0)
        return x || d(M, J);
    }
    const b = /\/|:/, u = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
    function h(L) {
      return b.test(L) && u.test(L);
    }
    const i = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
    function p(L) {
      return i.lastIndex = 0, i.test(L);
    }
    const v = -2147483648, m = 2 ** 31 - 1;
    function y(L) {
      return Number.isInteger(L) && L <= m && L >= v;
    }
    function $(L) {
      return Number.isInteger(L);
    }
    function R() {
      return !0;
    }
    const O = /[^\\]\\Z/;
    function j(L) {
      if (O.test(L))
        return !1;
      try {
        return new RegExp(L), !0;
      } catch {
        return !1;
      }
    }
  }(Js)), Js;
}
var Ws = {}, Gr = { exports: {} }, Zs = {}, Be = {}, ft = {}, Xs = {}, Ys = {}, Qs = {}, Wc;
function kn() {
  return Wc || (Wc = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
    class t {
    }
    e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
    class o extends t {
      constructor(i) {
        if (super(), !e.IDENTIFIER.test(i))
          throw new Error("CodeGen: name must be a valid identifier");
        this.str = i;
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
    class s extends t {
      constructor(i) {
        super(), this._items = typeof i == "string" ? [i] : i;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        if (this._items.length > 1)
          return !1;
        const i = this._items[0];
        return i === "" || i === '""';
      }
      get str() {
        var i;
        return (i = this._str) !== null && i !== void 0 ? i : this._str = this._items.reduce((p, v) => `${p}${v}`, "");
      }
      get names() {
        var i;
        return (i = this._names) !== null && i !== void 0 ? i : this._names = this._items.reduce((p, v) => (v instanceof o && (p[v.str] = (p[v.str] || 0) + 1), p), {});
      }
    }
    e._Code = s, e.nil = new s("");
    function l(h, ...i) {
      const p = [h[0]];
      let v = 0;
      for (; v < i.length; )
        a(p, i[v]), p.push(h[++v]);
      return new s(p);
    }
    e._ = l;
    const n = new s("+");
    function r(h, ...i) {
      const p = [g(h[0])];
      let v = 0;
      for (; v < i.length; )
        p.push(n), a(p, i[v]), p.push(n, g(h[++v]));
      return c(p), new s(p);
    }
    e.str = r;
    function a(h, i) {
      i instanceof s ? h.push(...i._items) : i instanceof o ? h.push(i) : h.push(E(i));
    }
    e.addCodeArg = a;
    function c(h) {
      let i = 1;
      for (; i < h.length - 1; ) {
        if (h[i] === n) {
          const p = d(h[i - 1], h[i + 1]);
          if (p !== void 0) {
            h.splice(i - 1, 3, p);
            continue;
          }
          h[i++] = "+";
        }
        i++;
      }
    }
    function d(h, i) {
      if (i === '""')
        return h;
      if (h === '""')
        return i;
      if (typeof h == "string")
        return i instanceof o || h[h.length - 1] !== '"' ? void 0 : typeof i != "string" ? `${h.slice(0, -1)}${i}"` : i[0] === '"' ? h.slice(0, -1) + i.slice(1) : void 0;
      if (typeof i == "string" && i[0] === '"' && !(h instanceof o))
        return `"${h}${i.slice(1)}`;
    }
    function f(h, i) {
      return i.emptyStr() ? h : h.emptyStr() ? i : r`${h}${i}`;
    }
    e.strConcat = f;
    function E(h) {
      return typeof h == "number" || typeof h == "boolean" || h === null ? h : g(Array.isArray(h) ? h.join(",") : h);
    }
    function _(h) {
      return new s(g(h));
    }
    e.stringify = _;
    function g(h) {
      return JSON.stringify(h).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
    }
    e.safeStringify = g;
    function w(h) {
      return typeof h == "string" && e.IDENTIFIER.test(h) ? new s(`.${h}`) : l`[${h}]`;
    }
    e.getProperty = w;
    function b(h) {
      if (typeof h == "string" && e.IDENTIFIER.test(h))
        return new s(`${h}`);
      throw new Error(`CodeGen: invalid export name: ${h}, use explicit $id name mapping`);
    }
    e.getEsmExportName = b;
    function u(h) {
      return new s(h.toString());
    }
    e.regexpCode = u;
  }(Qs)), Qs;
}
var ei = {}, Zc;
function Xc() {
  return Zc || (Zc = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
    const t = kn();
    class o extends Error {
      constructor(d) {
        super(`CodeGen: "code" for ${d} not defined`), this.value = d.value;
      }
    }
    var s;
    (function(c) {
      c[c.Started = 0] = "Started", c[c.Completed = 1] = "Completed";
    })(s || (e.UsedValueState = s = {})), e.varKinds = {
      const: new t.Name("const"),
      let: new t.Name("let"),
      var: new t.Name("var")
    };
    class l {
      constructor({ prefixes: d, parent: f } = {}) {
        this._names = {}, this._prefixes = d, this._parent = f;
      }
      toName(d) {
        return d instanceof t.Name ? d : this.name(d);
      }
      name(d) {
        return new t.Name(this._newName(d));
      }
      _newName(d) {
        const f = this._names[d] || this._nameGroup(d);
        return `${d}${f.index++}`;
      }
      _nameGroup(d) {
        var f, E;
        if (!((E = (f = this._parent) === null || f === void 0 ? void 0 : f._prefixes) === null || E === void 0) && E.has(d) || this._prefixes && !this._prefixes.has(d))
          throw new Error(`CodeGen: prefix "${d}" is not allowed in this scope`);
        return this._names[d] = { prefix: d, index: 0 };
      }
    }
    e.Scope = l;
    class n extends t.Name {
      constructor(d, f) {
        super(f), this.prefix = d;
      }
      setValue(d, { property: f, itemIndex: E }) {
        this.value = d, this.scopePath = (0, t._)`.${new t.Name(f)}[${E}]`;
      }
    }
    e.ValueScopeName = n;
    const r = (0, t._)`\n`;
    class a extends l {
      constructor(d) {
        super(d), this._values = {}, this._scope = d.scope, this.opts = { ...d, _n: d.lines ? r : t.nil };
      }
      get() {
        return this._scope;
      }
      name(d) {
        return new n(d, this._newName(d));
      }
      value(d, f) {
        var E;
        if (f.ref === void 0)
          throw new Error("CodeGen: ref must be passed in value");
        const _ = this.toName(d), { prefix: g } = _, w = (E = f.key) !== null && E !== void 0 ? E : f.ref;
        let b = this._values[g];
        if (b) {
          const i = b.get(w);
          if (i)
            return i;
        } else
          b = this._values[g] = /* @__PURE__ */ new Map();
        b.set(w, _);
        const u = this._scope[g] || (this._scope[g] = []), h = u.length;
        return u[h] = f.ref, _.setValue(f, { property: g, itemIndex: h }), _;
      }
      getValue(d, f) {
        const E = this._values[d];
        if (E)
          return E.get(f);
      }
      scopeRefs(d, f = this._values) {
        return this._reduceValues(f, (E) => {
          if (E.scopePath === void 0)
            throw new Error(`CodeGen: name "${E}" has no value`);
          return (0, t._)`${d}${E.scopePath}`;
        });
      }
      scopeCode(d = this._values, f, E) {
        return this._reduceValues(d, (_) => {
          if (_.value === void 0)
            throw new Error(`CodeGen: name "${_}" has no value`);
          return _.value.code;
        }, f, E);
      }
      _reduceValues(d, f, E = {}, _) {
        let g = t.nil;
        for (const w in d) {
          const b = d[w];
          if (!b)
            continue;
          const u = E[w] = E[w] || /* @__PURE__ */ new Map();
          b.forEach((h) => {
            if (u.has(h))
              return;
            u.set(h, s.Started);
            let i = f(h);
            if (i) {
              const p = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
              g = (0, t._)`${g}${p} ${h} = ${i};${this.opts._n}`;
            } else if (i = _?.(h))
              g = (0, t._)`${g}${i}${this.opts._n}`;
            else
              throw new o(h);
            u.set(h, s.Completed);
          });
        }
        return g;
      }
    }
    e.ValueScope = a;
  }(ei)), ei;
}
var Yc;
function ne() {
  return Yc || (Yc = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
    const t = kn(), o = Xc();
    var s = kn();
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
    var l = Xc();
    Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
      return l.Scope;
    } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
      return l.ValueScope;
    } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
      return l.ValueScopeName;
    } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
      return l.varKinds;
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
    class n {
      optimizeNodes() {
        return this;
      }
      optimizeNames(S, N) {
        return this;
      }
    }
    class r extends n {
      constructor(S, N, D) {
        super(), this.varKind = S, this.name = N, this.rhs = D;
      }
      render({ es5: S, _n: N }) {
        const D = S ? o.varKinds.var : this.varKind, G = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
        return `${D} ${this.name}${G};` + N;
      }
      optimizeNames(S, N) {
        if (S[this.name.str])
          return this.rhs && (this.rhs = M(this.rhs, S, N)), this;
      }
      get names() {
        return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
      }
    }
    class a extends n {
      constructor(S, N, D) {
        super(), this.lhs = S, this.rhs = N, this.sideEffects = D;
      }
      render({ _n: S }) {
        return `${this.lhs} = ${this.rhs};` + S;
      }
      optimizeNames(S, N) {
        if (!(this.lhs instanceof t.Name && !S[this.lhs.str] && !this.sideEffects))
          return this.rhs = M(this.rhs, S, N), this;
      }
      get names() {
        const S = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
        return F(S, this.rhs);
      }
    }
    class c extends a {
      constructor(S, N, D, G) {
        super(S, D, G), this.op = N;
      }
      render({ _n: S }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + S;
      }
    }
    class d extends n {
      constructor(S) {
        super(), this.label = S, this.names = {};
      }
      render({ _n: S }) {
        return `${this.label}:` + S;
      }
    }
    class f extends n {
      constructor(S) {
        super(), this.label = S, this.names = {};
      }
      render({ _n: S }) {
        return `break${this.label ? ` ${this.label}` : ""};` + S;
      }
    }
    class E extends n {
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
    class _ extends n {
      constructor(S) {
        super(), this.code = S;
      }
      render({ _n: S }) {
        return `${this.code};` + S;
      }
      optimizeNodes() {
        return `${this.code}` ? this : void 0;
      }
      optimizeNames(S, N) {
        return this.code = M(this.code, S, N), this;
      }
      get names() {
        return this.code instanceof t._CodeOrName ? this.code.names : {};
      }
    }
    class g extends n {
      constructor(S = []) {
        super(), this.nodes = S;
      }
      render(S) {
        return this.nodes.reduce((N, D) => N + D.render(S), "");
      }
      optimizeNodes() {
        const { nodes: S } = this;
        let N = S.length;
        for (; N--; ) {
          const D = S[N].optimizeNodes();
          Array.isArray(D) ? S.splice(N, 1, ...D) : D ? S[N] = D : S.splice(N, 1);
        }
        return S.length > 0 ? this : void 0;
      }
      optimizeNames(S, N) {
        const { nodes: D } = this;
        let G = D.length;
        for (; G--; ) {
          const H = D[G];
          H.optimizeNames(S, N) || (z(S, H.names), D.splice(G, 1));
        }
        return D.length > 0 ? this : void 0;
      }
      get names() {
        return this.nodes.reduce((S, N) => V(S, N.names), {});
      }
    }
    class w extends g {
      render(S) {
        return "{" + S._n + super.render(S) + "}" + S._n;
      }
    }
    class b extends g {
    }
    class u extends w {
    }
    u.kind = "else";
    class h extends w {
      constructor(S, N) {
        super(N), this.condition = S;
      }
      render(S) {
        let N = `if(${this.condition})` + super.render(S);
        return this.else && (N += "else " + this.else.render(S)), N;
      }
      optimizeNodes() {
        super.optimizeNodes();
        const S = this.condition;
        if (S === !0)
          return this.nodes;
        let N = this.else;
        if (N) {
          const D = N.optimizeNodes();
          N = this.else = Array.isArray(D) ? new u(D) : D;
        }
        if (N)
          return S === !1 ? N instanceof h ? N : N.nodes : this.nodes.length ? this : new h(J(S), N instanceof h ? [N] : N.nodes);
        if (!(S === !1 || !this.nodes.length))
          return this;
      }
      optimizeNames(S, N) {
        var D;
        if (this.else = (D = this.else) === null || D === void 0 ? void 0 : D.optimizeNames(S, N), !!(super.optimizeNames(S, N) || this.else))
          return this.condition = M(this.condition, S, N), this;
      }
      get names() {
        const S = super.names;
        return F(S, this.condition), this.else && V(S, this.else.names), S;
      }
    }
    h.kind = "if";
    class i extends w {
    }
    i.kind = "for";
    class p extends i {
      constructor(S) {
        super(), this.iteration = S;
      }
      render(S) {
        return `for(${this.iteration})` + super.render(S);
      }
      optimizeNames(S, N) {
        if (super.optimizeNames(S, N))
          return this.iteration = M(this.iteration, S, N), this;
      }
      get names() {
        return V(super.names, this.iteration.names);
      }
    }
    class v extends i {
      constructor(S, N, D, G) {
        super(), this.varKind = S, this.name = N, this.from = D, this.to = G;
      }
      render(S) {
        const N = S.es5 ? o.varKinds.var : this.varKind, { name: D, from: G, to: H } = this;
        return `for(${N} ${D}=${G}; ${D}<${H}; ${D}++)` + super.render(S);
      }
      get names() {
        const S = F(super.names, this.from);
        return F(S, this.to);
      }
    }
    class m extends i {
      constructor(S, N, D, G) {
        super(), this.loop = S, this.varKind = N, this.name = D, this.iterable = G;
      }
      render(S) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(S);
      }
      optimizeNames(S, N) {
        if (super.optimizeNames(S, N))
          return this.iterable = M(this.iterable, S, N), this;
      }
      get names() {
        return V(super.names, this.iterable.names);
      }
    }
    class y extends w {
      constructor(S, N, D) {
        super(), this.name = S, this.args = N, this.async = D;
      }
      render(S) {
        return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(S);
      }
    }
    y.kind = "func";
    class $ extends g {
      render(S) {
        return "return " + super.render(S);
      }
    }
    $.kind = "return";
    class R extends w {
      render(S) {
        let N = "try" + super.render(S);
        return this.catch && (N += this.catch.render(S)), this.finally && (N += this.finally.render(S)), N;
      }
      optimizeNodes() {
        var S, N;
        return super.optimizeNodes(), (S = this.catch) === null || S === void 0 || S.optimizeNodes(), (N = this.finally) === null || N === void 0 || N.optimizeNodes(), this;
      }
      optimizeNames(S, N) {
        var D, G;
        return super.optimizeNames(S, N), (D = this.catch) === null || D === void 0 || D.optimizeNames(S, N), (G = this.finally) === null || G === void 0 || G.optimizeNames(S, N), this;
      }
      get names() {
        const S = super.names;
        return this.catch && V(S, this.catch.names), this.finally && V(S, this.finally.names), S;
      }
    }
    class O extends w {
      constructor(S) {
        super(), this.error = S;
      }
      render(S) {
        return `catch(${this.error})` + super.render(S);
      }
    }
    O.kind = "catch";
    class j extends w {
      render(S) {
        return "finally" + super.render(S);
      }
    }
    j.kind = "finally";
    class L {
      constructor(S, N = {}) {
        this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...N, _n: N.lines ? `
` : "" }, this._extScope = S, this._scope = new o.Scope({ parent: S }), this._nodes = [new b()];
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
      scopeValue(S, N) {
        const D = this._extScope.value(S, N);
        return (this._values[D.prefix] || (this._values[D.prefix] = /* @__PURE__ */ new Set())).add(D), D;
      }
      getScopeValue(S, N) {
        return this._extScope.getValue(S, N);
      }
      // return code that assigns values in the external scope to the names that are used internally
      // (same names that were returned by gen.scopeName or gen.scopeValue)
      scopeRefs(S) {
        return this._extScope.scopeRefs(S, this._values);
      }
      scopeCode() {
        return this._extScope.scopeCode(this._values);
      }
      _def(S, N, D, G) {
        const H = this._scope.toName(N);
        return D !== void 0 && G && (this._constants[H.str] = D), this._leafNode(new r(S, H, D)), H;
      }
      // `const` declaration (`var` in es5 mode)
      const(S, N, D) {
        return this._def(o.varKinds.const, S, N, D);
      }
      // `let` declaration with optional assignment (`var` in es5 mode)
      let(S, N, D) {
        return this._def(o.varKinds.let, S, N, D);
      }
      // `var` declaration with optional assignment
      var(S, N, D) {
        return this._def(o.varKinds.var, S, N, D);
      }
      // assignment code
      assign(S, N, D) {
        return this._leafNode(new a(S, N, D));
      }
      // `+=` code
      add(S, N) {
        return this._leafNode(new c(S, e.operators.ADD, N));
      }
      // appends passed SafeExpr to code or executes Block
      code(S) {
        return typeof S == "function" ? S() : S !== t.nil && this._leafNode(new _(S)), this;
      }
      // returns code for object literal for the passed argument list of key-value pairs
      object(...S) {
        const N = ["{"];
        for (const [D, G] of S)
          N.length > 1 && N.push(","), N.push(D), (D !== G || this.opts.es5) && (N.push(":"), (0, t.addCodeArg)(N, G));
        return N.push("}"), new t._Code(N);
      }
      // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
      if(S, N, D) {
        if (this._blockNode(new h(S)), N && D)
          this.code(N).else().code(D).endIf();
        else if (N)
          this.code(N).endIf();
        else if (D)
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
      _for(S, N) {
        return this._blockNode(S), N && this.code(N).endFor(), this;
      }
      // a generic `for` clause (or statement if `forBody` is passed)
      for(S, N) {
        return this._for(new p(S), N);
      }
      // `for` statement for a range of values
      forRange(S, N, D, G, H = this.opts.es5 ? o.varKinds.var : o.varKinds.let) {
        const X = this._scope.toName(S);
        return this._for(new v(H, X, N, D), () => G(X));
      }
      // `for-of` statement (in es5 mode replace with a normal for loop)
      forOf(S, N, D, G = o.varKinds.const) {
        const H = this._scope.toName(S);
        if (this.opts.es5) {
          const X = N instanceof t.Name ? N : this.var("_arr", N);
          return this.forRange("_i", 0, (0, t._)`${X}.length`, (Z) => {
            this.var(H, (0, t._)`${X}[${Z}]`), D(H);
          });
        }
        return this._for(new m("of", G, H, N), () => D(H));
      }
      // `for-in` statement.
      // With option `ownProperties` replaced with a `for-of` loop for object keys
      forIn(S, N, D, G = this.opts.es5 ? o.varKinds.var : o.varKinds.const) {
        if (this.opts.ownProperties)
          return this.forOf(S, (0, t._)`Object.keys(${N})`, D);
        const H = this._scope.toName(S);
        return this._for(new m("in", G, H, N), () => D(H));
      }
      // end `for` loop
      endFor() {
        return this._endBlockNode(i);
      }
      // `label` statement
      label(S) {
        return this._leafNode(new d(S));
      }
      // `break` statement
      break(S) {
        return this._leafNode(new f(S));
      }
      // `return` statement
      return(S) {
        const N = new $();
        if (this._blockNode(N), this.code(S), N.nodes.length !== 1)
          throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode($);
      }
      // `try` statement
      try(S, N, D) {
        if (!N && !D)
          throw new Error('CodeGen: "try" without "catch" and "finally"');
        const G = new R();
        if (this._blockNode(G), this.code(S), N) {
          const H = this.name("e");
          this._currNode = G.catch = new O(H), N(H);
        }
        return D && (this._currNode = G.finally = new j(), this.code(D)), this._endBlockNode(O, j);
      }
      // `throw` statement
      throw(S) {
        return this._leafNode(new E(S));
      }
      // start self-balancing block
      block(S, N) {
        return this._blockStarts.push(this._nodes.length), S && this.code(S).endBlock(N), this;
      }
      // end the current self-balancing block
      endBlock(S) {
        const N = this._blockStarts.pop();
        if (N === void 0)
          throw new Error("CodeGen: not in self-balancing block");
        const D = this._nodes.length - N;
        if (D < 0 || S !== void 0 && D !== S)
          throw new Error(`CodeGen: wrong number of nodes: ${D} vs ${S} expected`);
        return this._nodes.length = N, this;
      }
      // `function` heading (or definition if funcBody is passed)
      func(S, N = t.nil, D, G) {
        return this._blockNode(new y(S, N, D)), G && this.code(G).endFunc(), this;
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
      _endBlockNode(S, N) {
        const D = this._currNode;
        if (D instanceof S || N && D instanceof N)
          return this._nodes.pop(), this;
        throw new Error(`CodeGen: not in block "${N ? `${S.kind}/${N.kind}` : S.kind}"`);
      }
      _elseNode(S) {
        const N = this._currNode;
        if (!(N instanceof h))
          throw new Error('CodeGen: "else" without "if"');
        return this._currNode = N.else = S, this;
      }
      get _root() {
        return this._nodes[0];
      }
      get _currNode() {
        const S = this._nodes;
        return S[S.length - 1];
      }
      set _currNode(S) {
        const N = this._nodes;
        N[N.length - 1] = S;
      }
    }
    e.CodeGen = L;
    function V(C, S) {
      for (const N in S)
        C[N] = (C[N] || 0) + (S[N] || 0);
      return C;
    }
    function F(C, S) {
      return S instanceof t._CodeOrName ? V(C, S.names) : C;
    }
    function M(C, S, N) {
      if (C instanceof t.Name)
        return D(C);
      if (!G(C))
        return C;
      return new t._Code(C._items.reduce((H, X) => (X instanceof t.Name && (X = D(X)), X instanceof t._Code ? H.push(...X._items) : H.push(X), H), []));
      function D(H) {
        const X = N[H.str];
        return X === void 0 || S[H.str] !== 1 ? H : (delete S[H.str], X);
      }
      function G(H) {
        return H instanceof t._Code && H._items.some((X) => X instanceof t.Name && S[X.str] === 1 && N[X.str] !== void 0);
      }
    }
    function z(C, S) {
      for (const N in S)
        C[N] = (C[N] || 0) - (S[N] || 0);
    }
    function J(C) {
      return typeof C == "boolean" || typeof C == "number" || C === null ? !C : (0, t._)`!${A(C)}`;
    }
    e.not = J;
    const x = I(e.operators.AND);
    function B(...C) {
      return C.reduce(x);
    }
    e.and = B;
    const W = I(e.operators.OR);
    function q(...C) {
      return C.reduce(W);
    }
    e.or = q;
    function I(C) {
      return (S, N) => S === t.nil ? N : N === t.nil ? S : (0, t._)`${A(S)} ${C} ${A(N)}`;
    }
    function A(C) {
      return C instanceof t.Name ? C : (0, t._)`(${C})`;
    }
  }(Ys)), Ys;
}
var re = {}, Qc;
function ae() {
  if (Qc) return re;
  Qc = 1, Object.defineProperty(re, "__esModule", { value: !0 }), re.checkStrictMode = re.getErrorPath = re.Type = re.useFunc = re.setEvaluated = re.evaluatedPropsToName = re.mergeEvaluated = re.eachItem = re.unescapeJsonPointer = re.escapeJsonPointer = re.escapeFragment = re.unescapeFragment = re.schemaRefOrVal = re.schemaHasRulesButRef = re.schemaHasRules = re.checkUnknownRules = re.alwaysValidSchema = re.toHash = void 0;
  const e = ne(), t = kn();
  function o(m) {
    const y = {};
    for (const $ of m)
      y[$] = !0;
    return y;
  }
  re.toHash = o;
  function s(m, y) {
    return typeof y == "boolean" ? y : Object.keys(y).length === 0 ? !0 : (l(m, y), !n(y, m.self.RULES.all));
  }
  re.alwaysValidSchema = s;
  function l(m, y = m.schema) {
    const { opts: $, self: R } = m;
    if (!$.strictSchema || typeof y == "boolean")
      return;
    const O = R.RULES.keywords;
    for (const j in y)
      O[j] || v(m, `unknown keyword: "${j}"`);
  }
  re.checkUnknownRules = l;
  function n(m, y) {
    if (typeof m == "boolean")
      return !m;
    for (const $ in m)
      if (y[$])
        return !0;
    return !1;
  }
  re.schemaHasRules = n;
  function r(m, y) {
    if (typeof m == "boolean")
      return !m;
    for (const $ in m)
      if ($ !== "$ref" && y.all[$])
        return !0;
    return !1;
  }
  re.schemaHasRulesButRef = r;
  function a({ topSchemaRef: m, schemaPath: y }, $, R, O) {
    if (!O) {
      if (typeof $ == "number" || typeof $ == "boolean")
        return $;
      if (typeof $ == "string")
        return (0, e._)`${$}`;
    }
    return (0, e._)`${m}${y}${(0, e.getProperty)(R)}`;
  }
  re.schemaRefOrVal = a;
  function c(m) {
    return E(decodeURIComponent(m));
  }
  re.unescapeFragment = c;
  function d(m) {
    return encodeURIComponent(f(m));
  }
  re.escapeFragment = d;
  function f(m) {
    return typeof m == "number" ? `${m}` : m.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  re.escapeJsonPointer = f;
  function E(m) {
    return m.replace(/~1/g, "/").replace(/~0/g, "~");
  }
  re.unescapeJsonPointer = E;
  function _(m, y) {
    if (Array.isArray(m))
      for (const $ of m)
        y($);
    else
      y(m);
  }
  re.eachItem = _;
  function g({ mergeNames: m, mergeToName: y, mergeValues: $, resultToName: R }) {
    return (O, j, L, V) => {
      const F = L === void 0 ? j : L instanceof e.Name ? (j instanceof e.Name ? m(O, j, L) : y(O, j, L), L) : j instanceof e.Name ? (y(O, L, j), j) : $(j, L);
      return V === e.Name && !(F instanceof e.Name) ? R(O, F) : F;
    };
  }
  re.mergeEvaluated = {
    props: g({
      mergeNames: (m, y, $) => m.if((0, e._)`${$} !== true && ${y} !== undefined`, () => {
        m.if((0, e._)`${y} === true`, () => m.assign($, !0), () => m.assign($, (0, e._)`${$} || {}`).code((0, e._)`Object.assign(${$}, ${y})`));
      }),
      mergeToName: (m, y, $) => m.if((0, e._)`${$} !== true`, () => {
        y === !0 ? m.assign($, !0) : (m.assign($, (0, e._)`${$} || {}`), b(m, $, y));
      }),
      mergeValues: (m, y) => m === !0 ? !0 : { ...m, ...y },
      resultToName: w
    }),
    items: g({
      mergeNames: (m, y, $) => m.if((0, e._)`${$} !== true && ${y} !== undefined`, () => m.assign($, (0, e._)`${y} === true ? true : ${$} > ${y} ? ${$} : ${y}`)),
      mergeToName: (m, y, $) => m.if((0, e._)`${$} !== true`, () => m.assign($, y === !0 ? !0 : (0, e._)`${$} > ${y} ? ${$} : ${y}`)),
      mergeValues: (m, y) => m === !0 ? !0 : Math.max(m, y),
      resultToName: (m, y) => m.var("items", y)
    })
  };
  function w(m, y) {
    if (y === !0)
      return m.var("props", !0);
    const $ = m.var("props", (0, e._)`{}`);
    return y !== void 0 && b(m, $, y), $;
  }
  re.evaluatedPropsToName = w;
  function b(m, y, $) {
    Object.keys($).forEach((R) => m.assign((0, e._)`${y}${(0, e.getProperty)(R)}`, !0));
  }
  re.setEvaluated = b;
  const u = {};
  function h(m, y) {
    return m.scopeValue("func", {
      ref: y,
      code: u[y.code] || (u[y.code] = new t._Code(y.code))
    });
  }
  re.useFunc = h;
  var i;
  (function(m) {
    m[m.Num = 0] = "Num", m[m.Str = 1] = "Str";
  })(i || (re.Type = i = {}));
  function p(m, y, $) {
    if (m instanceof e.Name) {
      const R = y === i.Num;
      return $ ? R ? (0, e._)`"[" + ${m} + "]"` : (0, e._)`"['" + ${m} + "']"` : R ? (0, e._)`"/" + ${m}` : (0, e._)`"/" + ${m}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
    }
    return $ ? (0, e.getProperty)(m).toString() : "/" + f(m);
  }
  re.getErrorPath = p;
  function v(m, y, $ = m.opts.strictSchema) {
    if ($) {
      if (y = `strict mode: ${y}`, $ === !0)
        throw new Error(y);
      m.self.logger.warn(y);
    }
  }
  return re.checkStrictMode = v, re;
}
var Kr = {}, eu;
function nt() {
  if (eu) return Kr;
  eu = 1, Object.defineProperty(Kr, "__esModule", { value: !0 });
  const e = ne(), t = {
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
  return Kr.default = t, Kr;
}
var tu;
function Hn() {
  return tu || (tu = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
    const t = ne(), o = ae(), s = nt();
    e.keywordError = {
      message: ({ keyword: u }) => (0, t.str)`must pass "${u}" keyword validation`
    }, e.keyword$DataError = {
      message: ({ keyword: u, schemaType: h }) => h ? (0, t.str)`"${u}" keyword must be ${h} ($data)` : (0, t.str)`"${u}" keyword is invalid ($data)`
    };
    function l(u, h = e.keywordError, i, p) {
      const { it: v } = u, { gen: m, compositeRule: y, allErrors: $ } = v, R = E(u, h, i);
      p ?? (y || $) ? c(m, R) : d(v, (0, t._)`[${R}]`);
    }
    e.reportError = l;
    function n(u, h = e.keywordError, i) {
      const { it: p } = u, { gen: v, compositeRule: m, allErrors: y } = p, $ = E(u, h, i);
      c(v, $), m || y || d(p, s.default.vErrors);
    }
    e.reportExtraError = n;
    function r(u, h) {
      u.assign(s.default.errors, h), u.if((0, t._)`${s.default.vErrors} !== null`, () => u.if(h, () => u.assign((0, t._)`${s.default.vErrors}.length`, h), () => u.assign(s.default.vErrors, null)));
    }
    e.resetErrorsCount = r;
    function a({ gen: u, keyword: h, schemaValue: i, data: p, errsCount: v, it: m }) {
      if (v === void 0)
        throw new Error("ajv implementation error");
      const y = u.name("err");
      u.forRange("i", v, s.default.errors, ($) => {
        u.const(y, (0, t._)`${s.default.vErrors}[${$}]`), u.if((0, t._)`${y}.instancePath === undefined`, () => u.assign((0, t._)`${y}.instancePath`, (0, t.strConcat)(s.default.instancePath, m.errorPath))), u.assign((0, t._)`${y}.schemaPath`, (0, t.str)`${m.errSchemaPath}/${h}`), m.opts.verbose && (u.assign((0, t._)`${y}.schema`, i), u.assign((0, t._)`${y}.data`, p));
      });
    }
    e.extendErrors = a;
    function c(u, h) {
      const i = u.const("err", h);
      u.if((0, t._)`${s.default.vErrors} === null`, () => u.assign(s.default.vErrors, (0, t._)`[${i}]`), (0, t._)`${s.default.vErrors}.push(${i})`), u.code((0, t._)`${s.default.errors}++`);
    }
    function d(u, h) {
      const { gen: i, validateName: p, schemaEnv: v } = u;
      v.$async ? i.throw((0, t._)`new ${u.ValidationError}(${h})`) : (i.assign((0, t._)`${p}.errors`, h), i.return(!1));
    }
    const f = {
      keyword: new t.Name("keyword"),
      schemaPath: new t.Name("schemaPath"),
      // also used in JTD errors
      params: new t.Name("params"),
      propertyName: new t.Name("propertyName"),
      message: new t.Name("message"),
      schema: new t.Name("schema"),
      parentSchema: new t.Name("parentSchema")
    };
    function E(u, h, i) {
      const { createErrors: p } = u.it;
      return p === !1 ? (0, t._)`{}` : _(u, h, i);
    }
    function _(u, h, i = {}) {
      const { gen: p, it: v } = u, m = [
        g(v, i),
        w(u, i)
      ];
      return b(u, h, m), p.object(...m);
    }
    function g({ errorPath: u }, { instancePath: h }) {
      const i = h ? (0, t.str)`${u}${(0, o.getErrorPath)(h, o.Type.Str)}` : u;
      return [s.default.instancePath, (0, t.strConcat)(s.default.instancePath, i)];
    }
    function w({ keyword: u, it: { errSchemaPath: h } }, { schemaPath: i, parentSchema: p }) {
      let v = p ? h : (0, t.str)`${h}/${u}`;
      return i && (v = (0, t.str)`${v}${(0, o.getErrorPath)(i, o.Type.Str)}`), [f.schemaPath, v];
    }
    function b(u, { params: h, message: i }, p) {
      const { keyword: v, data: m, schemaValue: y, it: $ } = u, { opts: R, propertyName: O, topSchemaRef: j, schemaPath: L } = $;
      p.push([f.keyword, v], [f.params, typeof h == "function" ? h(u) : h || (0, t._)`{}`]), R.messages && p.push([f.message, typeof i == "function" ? i(u) : i]), R.verbose && p.push([f.schema, y], [f.parentSchema, (0, t._)`${j}${L}`], [s.default.data, m]), O && p.push([f.propertyName, O]);
    }
  }(Xs)), Xs;
}
var ru;
function _p() {
  if (ru) return ft;
  ru = 1, Object.defineProperty(ft, "__esModule", { value: !0 }), ft.boolOrEmptySchema = ft.topBoolOrEmptySchema = void 0;
  const e = Hn(), t = ne(), o = nt(), s = {
    message: "boolean schema is false"
  };
  function l(a) {
    const { gen: c, schema: d, validateName: f } = a;
    d === !1 ? r(a, !1) : typeof d == "object" && d.$async === !0 ? c.return(o.default.data) : (c.assign((0, t._)`${f}.errors`, null), c.return(!0));
  }
  ft.topBoolOrEmptySchema = l;
  function n(a, c) {
    const { gen: d, schema: f } = a;
    f === !1 ? (d.var(c, !1), r(a)) : d.var(c, !0);
  }
  ft.boolOrEmptySchema = n;
  function r(a, c) {
    const { gen: d, data: f } = a, E = {
      gen: d,
      keyword: "false schema",
      data: f,
      schema: !1,
      schemaCode: !1,
      schemaValue: !1,
      params: {},
      it: a
    };
    (0, e.reportError)(E, s, void 0, c);
  }
  return ft;
}
var ye = {}, dt = {}, nu;
function qf() {
  if (nu) return dt;
  nu = 1, Object.defineProperty(dt, "__esModule", { value: !0 }), dt.getRules = dt.isJSONType = void 0;
  const e = ["string", "number", "integer", "boolean", "null", "object", "array"], t = new Set(e);
  function o(l) {
    return typeof l == "string" && t.has(l);
  }
  dt.isJSONType = o;
  function s() {
    const l = {
      number: { type: "number", rules: [] },
      string: { type: "string", rules: [] },
      array: { type: "array", rules: [] },
      object: { type: "object", rules: [] }
    };
    return {
      types: { ...l, integer: !0, boolean: !0, null: !0 },
      rules: [{ rules: [] }, l.number, l.string, l.array, l.object],
      post: { rules: [] },
      all: {},
      keywords: {}
    };
  }
  return dt.getRules = s, dt;
}
var xe = {}, su;
function Ff() {
  if (su) return xe;
  su = 1, Object.defineProperty(xe, "__esModule", { value: !0 }), xe.shouldUseRule = xe.shouldUseGroup = xe.schemaHasRulesForType = void 0;
  function e({ schema: s, self: l }, n) {
    const r = l.RULES.types[n];
    return r && r !== !0 && t(s, r);
  }
  xe.schemaHasRulesForType = e;
  function t(s, l) {
    return l.rules.some((n) => o(s, n));
  }
  xe.shouldUseGroup = t;
  function o(s, l) {
    var n;
    return s[l.keyword] !== void 0 || ((n = l.definition.implements) === null || n === void 0 ? void 0 : n.some((r) => s[r] !== void 0));
  }
  return xe.shouldUseRule = o, xe;
}
var iu;
function Ln() {
  if (iu) return ye;
  iu = 1, Object.defineProperty(ye, "__esModule", { value: !0 }), ye.reportTypeError = ye.checkDataTypes = ye.checkDataType = ye.coerceAndCheckDataType = ye.getJSONTypes = ye.getSchemaTypes = ye.DataType = void 0;
  const e = qf(), t = Ff(), o = Hn(), s = ne(), l = ae();
  var n;
  (function(i) {
    i[i.Correct = 0] = "Correct", i[i.Wrong = 1] = "Wrong";
  })(n || (ye.DataType = n = {}));
  function r(i) {
    const p = a(i.type);
    if (p.includes("null")) {
      if (i.nullable === !1)
        throw new Error("type: null contradicts nullable: false");
    } else {
      if (!p.length && i.nullable !== void 0)
        throw new Error('"nullable" cannot be used without "type"');
      i.nullable === !0 && p.push("null");
    }
    return p;
  }
  ye.getSchemaTypes = r;
  function a(i) {
    const p = Array.isArray(i) ? i : i ? [i] : [];
    if (p.every(e.isJSONType))
      return p;
    throw new Error("type must be JSONType or JSONType[]: " + p.join(","));
  }
  ye.getJSONTypes = a;
  function c(i, p) {
    const { gen: v, data: m, opts: y } = i, $ = f(p, y.coerceTypes), R = p.length > 0 && !($.length === 0 && p.length === 1 && (0, t.schemaHasRulesForType)(i, p[0]));
    if (R) {
      const O = w(p, m, y.strictNumbers, n.Wrong);
      v.if(O, () => {
        $.length ? E(i, p, $) : u(i);
      });
    }
    return R;
  }
  ye.coerceAndCheckDataType = c;
  const d = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
  function f(i, p) {
    return p ? i.filter((v) => d.has(v) || p === "array" && v === "array") : [];
  }
  function E(i, p, v) {
    const { gen: m, data: y, opts: $ } = i, R = m.let("dataType", (0, s._)`typeof ${y}`), O = m.let("coerced", (0, s._)`undefined`);
    $.coerceTypes === "array" && m.if((0, s._)`${R} == 'object' && Array.isArray(${y}) && ${y}.length == 1`, () => m.assign(y, (0, s._)`${y}[0]`).assign(R, (0, s._)`typeof ${y}`).if(w(p, y, $.strictNumbers), () => m.assign(O, y))), m.if((0, s._)`${O} !== undefined`);
    for (const L of v)
      (d.has(L) || L === "array" && $.coerceTypes === "array") && j(L);
    m.else(), u(i), m.endIf(), m.if((0, s._)`${O} !== undefined`, () => {
      m.assign(y, O), _(i, O);
    });
    function j(L) {
      switch (L) {
        case "string":
          m.elseIf((0, s._)`${R} == "number" || ${R} == "boolean"`).assign(O, (0, s._)`"" + ${y}`).elseIf((0, s._)`${y} === null`).assign(O, (0, s._)`""`);
          return;
        case "number":
          m.elseIf((0, s._)`${R} == "boolean" || ${y} === null
              || (${R} == "string" && ${y} && ${y} == +${y})`).assign(O, (0, s._)`+${y}`);
          return;
        case "integer":
          m.elseIf((0, s._)`${R} === "boolean" || ${y} === null
              || (${R} === "string" && ${y} && ${y} == +${y} && !(${y} % 1))`).assign(O, (0, s._)`+${y}`);
          return;
        case "boolean":
          m.elseIf((0, s._)`${y} === "false" || ${y} === 0 || ${y} === null`).assign(O, !1).elseIf((0, s._)`${y} === "true" || ${y} === 1`).assign(O, !0);
          return;
        case "null":
          m.elseIf((0, s._)`${y} === "" || ${y} === 0 || ${y} === false`), m.assign(O, null);
          return;
        case "array":
          m.elseIf((0, s._)`${R} === "string" || ${R} === "number"
              || ${R} === "boolean" || ${y} === null`).assign(O, (0, s._)`[${y}]`);
      }
    }
  }
  function _({ gen: i, parentData: p, parentDataProperty: v }, m) {
    i.if((0, s._)`${p} !== undefined`, () => i.assign((0, s._)`${p}[${v}]`, m));
  }
  function g(i, p, v, m = n.Correct) {
    const y = m === n.Correct ? s.operators.EQ : s.operators.NEQ;
    let $;
    switch (i) {
      case "null":
        return (0, s._)`${p} ${y} null`;
      case "array":
        $ = (0, s._)`Array.isArray(${p})`;
        break;
      case "object":
        $ = (0, s._)`${p} && typeof ${p} == "object" && !Array.isArray(${p})`;
        break;
      case "integer":
        $ = R((0, s._)`!(${p} % 1) && !isNaN(${p})`);
        break;
      case "number":
        $ = R();
        break;
      default:
        return (0, s._)`typeof ${p} ${y} ${i}`;
    }
    return m === n.Correct ? $ : (0, s.not)($);
    function R(O = s.nil) {
      return (0, s.and)((0, s._)`typeof ${p} == "number"`, O, v ? (0, s._)`isFinite(${p})` : s.nil);
    }
  }
  ye.checkDataType = g;
  function w(i, p, v, m) {
    if (i.length === 1)
      return g(i[0], p, v, m);
    let y;
    const $ = (0, l.toHash)(i);
    if ($.array && $.object) {
      const R = (0, s._)`typeof ${p} != "object"`;
      y = $.null ? R : (0, s._)`!${p} || ${R}`, delete $.null, delete $.array, delete $.object;
    } else
      y = s.nil;
    $.number && delete $.integer;
    for (const R in $)
      y = (0, s.and)(y, g(R, p, v, m));
    return y;
  }
  ye.checkDataTypes = w;
  const b = {
    message: ({ schema: i }) => `must be ${i}`,
    params: ({ schema: i, schemaValue: p }) => typeof i == "string" ? (0, s._)`{type: ${i}}` : (0, s._)`{type: ${p}}`
  };
  function u(i) {
    const p = h(i);
    (0, o.reportError)(p, b);
  }
  ye.reportTypeError = u;
  function h(i) {
    const { gen: p, data: v, schema: m } = i, y = (0, l.schemaRefOrVal)(i, m, "type");
    return {
      gen: p,
      keyword: "type",
      data: v,
      schema: m.type,
      schemaCode: y,
      schemaValue: y,
      parentSchema: m,
      params: {},
      it: i
    };
  }
  return ye;
}
var At = {}, ou;
function Ep() {
  if (ou) return At;
  ou = 1, Object.defineProperty(At, "__esModule", { value: !0 }), At.assignDefaults = void 0;
  const e = ne(), t = ae();
  function o(l, n) {
    const { properties: r, items: a } = l.schema;
    if (n === "object" && r)
      for (const c in r)
        s(l, c, r[c].default);
    else n === "array" && Array.isArray(a) && a.forEach((c, d) => s(l, d, c.default));
  }
  At.assignDefaults = o;
  function s(l, n, r) {
    const { gen: a, compositeRule: c, data: d, opts: f } = l;
    if (r === void 0)
      return;
    const E = (0, e._)`${d}${(0, e.getProperty)(n)}`;
    if (c) {
      (0, t.checkStrictMode)(l, `default is ignored for: ${E}`);
      return;
    }
    let _ = (0, e._)`${E} === undefined`;
    f.useDefaults === "empty" && (_ = (0, e._)`${_} || ${E} === null || ${E} === ""`), a.if(_, (0, e._)`${E} = ${(0, e.stringify)(r)}`);
  }
  return At;
}
var ke = {}, de = {}, au;
function Fe() {
  if (au) return de;
  au = 1, Object.defineProperty(de, "__esModule", { value: !0 }), de.validateUnion = de.validateArray = de.usePattern = de.callValidateCode = de.schemaProperties = de.allSchemaProperties = de.noPropertyInData = de.propertyInData = de.isOwnProperty = de.hasPropFunc = de.reportMissingProp = de.checkMissingProp = de.checkReportMissingProp = void 0;
  const e = ne(), t = ae(), o = nt(), s = ae();
  function l(i, p) {
    const { gen: v, data: m, it: y } = i;
    v.if(f(v, m, p, y.opts.ownProperties), () => {
      i.setParams({ missingProperty: (0, e._)`${p}` }, !0), i.error();
    });
  }
  de.checkReportMissingProp = l;
  function n({ gen: i, data: p, it: { opts: v } }, m, y) {
    return (0, e.or)(...m.map(($) => (0, e.and)(f(i, p, $, v.ownProperties), (0, e._)`${y} = ${$}`)));
  }
  de.checkMissingProp = n;
  function r(i, p) {
    i.setParams({ missingProperty: p }, !0), i.error();
  }
  de.reportMissingProp = r;
  function a(i) {
    return i.scopeValue("func", {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      ref: Object.prototype.hasOwnProperty,
      code: (0, e._)`Object.prototype.hasOwnProperty`
    });
  }
  de.hasPropFunc = a;
  function c(i, p, v) {
    return (0, e._)`${a(i)}.call(${p}, ${v})`;
  }
  de.isOwnProperty = c;
  function d(i, p, v, m) {
    const y = (0, e._)`${p}${(0, e.getProperty)(v)} !== undefined`;
    return m ? (0, e._)`${y} && ${c(i, p, v)}` : y;
  }
  de.propertyInData = d;
  function f(i, p, v, m) {
    const y = (0, e._)`${p}${(0, e.getProperty)(v)} === undefined`;
    return m ? (0, e.or)(y, (0, e.not)(c(i, p, v))) : y;
  }
  de.noPropertyInData = f;
  function E(i) {
    return i ? Object.keys(i).filter((p) => p !== "__proto__") : [];
  }
  de.allSchemaProperties = E;
  function _(i, p) {
    return E(p).filter((v) => !(0, t.alwaysValidSchema)(i, p[v]));
  }
  de.schemaProperties = _;
  function g({ schemaCode: i, data: p, it: { gen: v, topSchemaRef: m, schemaPath: y, errorPath: $ }, it: R }, O, j, L) {
    const V = L ? (0, e._)`${i}, ${p}, ${m}${y}` : p, F = [
      [o.default.instancePath, (0, e.strConcat)(o.default.instancePath, $)],
      [o.default.parentData, R.parentData],
      [o.default.parentDataProperty, R.parentDataProperty],
      [o.default.rootData, o.default.rootData]
    ];
    R.opts.dynamicRef && F.push([o.default.dynamicAnchors, o.default.dynamicAnchors]);
    const M = (0, e._)`${V}, ${v.object(...F)}`;
    return j !== e.nil ? (0, e._)`${O}.call(${j}, ${M})` : (0, e._)`${O}(${M})`;
  }
  de.callValidateCode = g;
  const w = (0, e._)`new RegExp`;
  function b({ gen: i, it: { opts: p } }, v) {
    const m = p.unicodeRegExp ? "u" : "", { regExp: y } = p.code, $ = y(v, m);
    return i.scopeValue("pattern", {
      key: $.toString(),
      ref: $,
      code: (0, e._)`${y.code === "new RegExp" ? w : (0, s.useFunc)(i, y)}(${v}, ${m})`
    });
  }
  de.usePattern = b;
  function u(i) {
    const { gen: p, data: v, keyword: m, it: y } = i, $ = p.name("valid");
    if (y.allErrors) {
      const O = p.let("valid", !0);
      return R(() => p.assign(O, !1)), O;
    }
    return p.var($, !0), R(() => p.break()), $;
    function R(O) {
      const j = p.const("len", (0, e._)`${v}.length`);
      p.forRange("i", 0, j, (L) => {
        i.subschema({
          keyword: m,
          dataProp: L,
          dataPropType: t.Type.Num
        }, $), p.if((0, e.not)($), O);
      });
    }
  }
  de.validateArray = u;
  function h(i) {
    const { gen: p, schema: v, keyword: m, it: y } = i;
    if (!Array.isArray(v))
      throw new Error("ajv implementation error");
    if (v.some((j) => (0, t.alwaysValidSchema)(y, j)) && !y.opts.unevaluated)
      return;
    const R = p.let("valid", !1), O = p.name("_valid");
    p.block(() => v.forEach((j, L) => {
      const V = i.subschema({
        keyword: m,
        schemaProp: L,
        compositeRule: !0
      }, O);
      p.assign(R, (0, e._)`${R} || ${O}`), i.mergeValidEvaluated(V, O) || p.if((0, e.not)(R));
    })), i.result(R, () => i.reset(), () => i.error(!0));
  }
  return de.validateUnion = h, de;
}
var cu;
function wp() {
  if (cu) return ke;
  cu = 1, Object.defineProperty(ke, "__esModule", { value: !0 }), ke.validateKeywordUsage = ke.validSchemaType = ke.funcKeywordCode = ke.macroKeywordCode = void 0;
  const e = ne(), t = nt(), o = Fe(), s = Hn();
  function l(_, g) {
    const { gen: w, keyword: b, schema: u, parentSchema: h, it: i } = _, p = g.macro.call(i.self, u, h, i), v = d(w, b, p);
    i.opts.validateSchema !== !1 && i.self.validateSchema(p, !0);
    const m = w.name("valid");
    _.subschema({
      schema: p,
      schemaPath: e.nil,
      errSchemaPath: `${i.errSchemaPath}/${b}`,
      topSchemaRef: v,
      compositeRule: !0
    }, m), _.pass(m, () => _.error(!0));
  }
  ke.macroKeywordCode = l;
  function n(_, g) {
    var w;
    const { gen: b, keyword: u, schema: h, parentSchema: i, $data: p, it: v } = _;
    c(v, g);
    const m = !p && g.compile ? g.compile.call(v.self, h, i, v) : g.validate, y = d(b, u, m), $ = b.let("valid");
    _.block$data($, R), _.ok((w = g.valid) !== null && w !== void 0 ? w : $);
    function R() {
      if (g.errors === !1)
        L(), g.modifying && r(_), V(() => _.error());
      else {
        const F = g.async ? O() : j();
        g.modifying && r(_), V(() => a(_, F));
      }
    }
    function O() {
      const F = b.let("ruleErrs", null);
      return b.try(() => L((0, e._)`await `), (M) => b.assign($, !1).if((0, e._)`${M} instanceof ${v.ValidationError}`, () => b.assign(F, (0, e._)`${M}.errors`), () => b.throw(M))), F;
    }
    function j() {
      const F = (0, e._)`${y}.errors`;
      return b.assign(F, null), L(e.nil), F;
    }
    function L(F = g.async ? (0, e._)`await ` : e.nil) {
      const M = v.opts.passContext ? t.default.this : t.default.self, z = !("compile" in g && !p || g.schema === !1);
      b.assign($, (0, e._)`${F}${(0, o.callValidateCode)(_, y, M, z)}`, g.modifying);
    }
    function V(F) {
      var M;
      b.if((0, e.not)((M = g.valid) !== null && M !== void 0 ? M : $), F);
    }
  }
  ke.funcKeywordCode = n;
  function r(_) {
    const { gen: g, data: w, it: b } = _;
    g.if(b.parentData, () => g.assign(w, (0, e._)`${b.parentData}[${b.parentDataProperty}]`));
  }
  function a(_, g) {
    const { gen: w } = _;
    w.if((0, e._)`Array.isArray(${g})`, () => {
      w.assign(t.default.vErrors, (0, e._)`${t.default.vErrors} === null ? ${g} : ${t.default.vErrors}.concat(${g})`).assign(t.default.errors, (0, e._)`${t.default.vErrors}.length`), (0, s.extendErrors)(_);
    }, () => _.error());
  }
  function c({ schemaEnv: _ }, g) {
    if (g.async && !_.$async)
      throw new Error("async keyword in sync schema");
  }
  function d(_, g, w) {
    if (w === void 0)
      throw new Error(`keyword "${g}" failed to compile`);
    return _.scopeValue("keyword", typeof w == "function" ? { ref: w } : { ref: w, code: (0, e.stringify)(w) });
  }
  function f(_, g, w = !1) {
    return !g.length || g.some((b) => b === "array" ? Array.isArray(_) : b === "object" ? _ && typeof _ == "object" && !Array.isArray(_) : typeof _ == b || w && typeof _ > "u");
  }
  ke.validSchemaType = f;
  function E({ schema: _, opts: g, self: w, errSchemaPath: b }, u, h) {
    if (Array.isArray(u.keyword) ? !u.keyword.includes(h) : u.keyword !== h)
      throw new Error("ajv implementation error");
    const i = u.dependencies;
    if (i?.some((p) => !Object.prototype.hasOwnProperty.call(_, p)))
      throw new Error(`parent schema must have dependencies of ${h}: ${i.join(",")}`);
    if (u.validateSchema && !u.validateSchema(_[h])) {
      const v = `keyword "${h}" value is invalid at path "${b}": ` + w.errorsText(u.validateSchema.errors);
      if (g.validateSchema === "log")
        w.logger.error(v);
      else
        throw new Error(v);
    }
  }
  return ke.validateKeywordUsage = E, ke;
}
var Je = {}, uu;
function Sp() {
  if (uu) return Je;
  uu = 1, Object.defineProperty(Je, "__esModule", { value: !0 }), Je.extendSubschemaMode = Je.extendSubschemaData = Je.getSubschema = void 0;
  const e = ne(), t = ae();
  function o(n, { keyword: r, schemaProp: a, schema: c, schemaPath: d, errSchemaPath: f, topSchemaRef: E }) {
    if (r !== void 0 && c !== void 0)
      throw new Error('both "keyword" and "schema" passed, only one allowed');
    if (r !== void 0) {
      const _ = n.schema[r];
      return a === void 0 ? {
        schema: _,
        schemaPath: (0, e._)`${n.schemaPath}${(0, e.getProperty)(r)}`,
        errSchemaPath: `${n.errSchemaPath}/${r}`
      } : {
        schema: _[a],
        schemaPath: (0, e._)`${n.schemaPath}${(0, e.getProperty)(r)}${(0, e.getProperty)(a)}`,
        errSchemaPath: `${n.errSchemaPath}/${r}/${(0, t.escapeFragment)(a)}`
      };
    }
    if (c !== void 0) {
      if (d === void 0 || f === void 0 || E === void 0)
        throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
      return {
        schema: c,
        schemaPath: d,
        topSchemaRef: E,
        errSchemaPath: f
      };
    }
    throw new Error('either "keyword" or "schema" must be passed');
  }
  Je.getSubschema = o;
  function s(n, r, { dataProp: a, dataPropType: c, data: d, dataTypes: f, propertyName: E }) {
    if (d !== void 0 && a !== void 0)
      throw new Error('both "data" and "dataProp" passed, only one allowed');
    const { gen: _ } = r;
    if (a !== void 0) {
      const { errorPath: w, dataPathArr: b, opts: u } = r, h = _.let("data", (0, e._)`${r.data}${(0, e.getProperty)(a)}`, !0);
      g(h), n.errorPath = (0, e.str)`${w}${(0, t.getErrorPath)(a, c, u.jsPropertySyntax)}`, n.parentDataProperty = (0, e._)`${a}`, n.dataPathArr = [...b, n.parentDataProperty];
    }
    if (d !== void 0) {
      const w = d instanceof e.Name ? d : _.let("data", d, !0);
      g(w), E !== void 0 && (n.propertyName = E);
    }
    f && (n.dataTypes = f);
    function g(w) {
      n.data = w, n.dataLevel = r.dataLevel + 1, n.dataTypes = [], r.definedProperties = /* @__PURE__ */ new Set(), n.parentData = r.data, n.dataNames = [...r.dataNames, w];
    }
  }
  Je.extendSubschemaData = s;
  function l(n, { jtdDiscriminator: r, jtdMetadata: a, compositeRule: c, createErrors: d, allErrors: f }) {
    c !== void 0 && (n.compositeRule = c), d !== void 0 && (n.createErrors = d), f !== void 0 && (n.allErrors = f), n.jtdDiscriminator = r, n.jtdMetadata = a;
  }
  return Je.extendSubschemaMode = l, Je;
}
var be = {}, ti = { exports: {} }, lu;
function bp() {
  if (lu) return ti.exports;
  lu = 1;
  var e = ti.exports = function(s, l, n) {
    typeof l == "function" && (n = l, l = {}), n = l.cb || n;
    var r = typeof n == "function" ? n : n.pre || function() {
    }, a = n.post || function() {
    };
    t(l, r, a, s, "", s);
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
  function t(s, l, n, r, a, c, d, f, E, _) {
    if (r && typeof r == "object" && !Array.isArray(r)) {
      l(r, a, c, d, f, E, _);
      for (var g in r) {
        var w = r[g];
        if (Array.isArray(w)) {
          if (g in e.arrayKeywords)
            for (var b = 0; b < w.length; b++)
              t(s, l, n, w[b], a + "/" + g + "/" + b, c, a, g, r, b);
        } else if (g in e.propsKeywords) {
          if (w && typeof w == "object")
            for (var u in w)
              t(s, l, n, w[u], a + "/" + g + "/" + o(u), c, a, g, r, u);
        } else (g in e.keywords || s.allKeys && !(g in e.skipKeywords)) && t(s, l, n, w, a + "/" + g, c, a, g, r);
      }
      n(r, a, c, d, f, E, _);
    }
  }
  function o(s) {
    return s.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  return ti.exports;
}
var fu;
function Bn() {
  if (fu) return be;
  fu = 1, Object.defineProperty(be, "__esModule", { value: !0 }), be.getSchemaRefs = be.resolveUrl = be.normalizeId = be._getFullPath = be.getFullPath = be.inlineRef = void 0;
  const e = ae(), t = Un(), o = bp(), s = /* @__PURE__ */ new Set([
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
  function l(b, u = !0) {
    return typeof b == "boolean" ? !0 : u === !0 ? !r(b) : u ? a(b) <= u : !1;
  }
  be.inlineRef = l;
  const n = /* @__PURE__ */ new Set([
    "$ref",
    "$recursiveRef",
    "$recursiveAnchor",
    "$dynamicRef",
    "$dynamicAnchor"
  ]);
  function r(b) {
    for (const u in b) {
      if (n.has(u))
        return !0;
      const h = b[u];
      if (Array.isArray(h) && h.some(r) || typeof h == "object" && r(h))
        return !0;
    }
    return !1;
  }
  function a(b) {
    let u = 0;
    for (const h in b) {
      if (h === "$ref")
        return 1 / 0;
      if (u++, !s.has(h) && (typeof b[h] == "object" && (0, e.eachItem)(b[h], (i) => u += a(i)), u === 1 / 0))
        return 1 / 0;
    }
    return u;
  }
  function c(b, u = "", h) {
    h !== !1 && (u = E(u));
    const i = b.parse(u);
    return d(b, i);
  }
  be.getFullPath = c;
  function d(b, u) {
    return b.serialize(u).split("#")[0] + "#";
  }
  be._getFullPath = d;
  const f = /#\/?$/;
  function E(b) {
    return b ? b.replace(f, "") : "";
  }
  be.normalizeId = E;
  function _(b, u, h) {
    return h = E(h), b.resolve(u, h);
  }
  be.resolveUrl = _;
  const g = /^[a-z_][-a-z0-9._]*$/i;
  function w(b, u) {
    if (typeof b == "boolean")
      return {};
    const { schemaId: h, uriResolver: i } = this.opts, p = E(b[h] || u), v = { "": p }, m = c(i, p, !1), y = {}, $ = /* @__PURE__ */ new Set();
    return o(b, { allKeys: !0 }, (j, L, V, F) => {
      if (F === void 0)
        return;
      const M = m + L;
      let z = v[F];
      typeof j[h] == "string" && (z = J.call(this, j[h])), x.call(this, j.$anchor), x.call(this, j.$dynamicAnchor), v[L] = z;
      function J(B) {
        const W = this.opts.uriResolver.resolve;
        if (B = E(z ? W(z, B) : B), $.has(B))
          throw O(B);
        $.add(B);
        let q = this.refs[B];
        return typeof q == "string" && (q = this.refs[q]), typeof q == "object" ? R(j, q.schema, B) : B !== E(M) && (B[0] === "#" ? (R(j, y[B], B), y[B] = j) : this.refs[B] = M), B;
      }
      function x(B) {
        if (typeof B == "string") {
          if (!g.test(B))
            throw new Error(`invalid anchor "${B}"`);
          J.call(this, `#${B}`);
        }
      }
    }), y;
    function R(j, L, V) {
      if (L !== void 0 && !t(j, L))
        throw O(V);
    }
    function O(j) {
      return new Error(`reference "${j}" resolves to more than one schema`);
    }
  }
  return be.getSchemaRefs = w, be;
}
var du;
function xn() {
  if (du) return Be;
  du = 1, Object.defineProperty(Be, "__esModule", { value: !0 }), Be.getData = Be.KeywordCxt = Be.validateFunctionCode = void 0;
  const e = _p(), t = Ln(), o = Ff(), s = Ln(), l = Ep(), n = wp(), r = Sp(), a = ne(), c = nt(), d = Bn(), f = ae(), E = Hn();
  function _(P) {
    if (m(P) && ($(P), v(P))) {
      u(P);
      return;
    }
    g(P, () => (0, e.topBoolOrEmptySchema)(P));
  }
  Be.validateFunctionCode = _;
  function g({ gen: P, validateName: T, schema: k, schemaEnv: U, opts: K }, Y) {
    K.code.es5 ? P.func(T, (0, a._)`${c.default.data}, ${c.default.valCxt}`, U.$async, () => {
      P.code((0, a._)`"use strict"; ${i(k, K)}`), b(P, K), P.code(Y);
    }) : P.func(T, (0, a._)`${c.default.data}, ${w(K)}`, U.$async, () => P.code(i(k, K)).code(Y));
  }
  function w(P) {
    return (0, a._)`{${c.default.instancePath}="", ${c.default.parentData}, ${c.default.parentDataProperty}, ${c.default.rootData}=${c.default.data}${P.dynamicRef ? (0, a._)`, ${c.default.dynamicAnchors}={}` : a.nil}}={}`;
  }
  function b(P, T) {
    P.if(c.default.valCxt, () => {
      P.var(c.default.instancePath, (0, a._)`${c.default.valCxt}.${c.default.instancePath}`), P.var(c.default.parentData, (0, a._)`${c.default.valCxt}.${c.default.parentData}`), P.var(c.default.parentDataProperty, (0, a._)`${c.default.valCxt}.${c.default.parentDataProperty}`), P.var(c.default.rootData, (0, a._)`${c.default.valCxt}.${c.default.rootData}`), T.dynamicRef && P.var(c.default.dynamicAnchors, (0, a._)`${c.default.valCxt}.${c.default.dynamicAnchors}`);
    }, () => {
      P.var(c.default.instancePath, (0, a._)`""`), P.var(c.default.parentData, (0, a._)`undefined`), P.var(c.default.parentDataProperty, (0, a._)`undefined`), P.var(c.default.rootData, c.default.data), T.dynamicRef && P.var(c.default.dynamicAnchors, (0, a._)`{}`);
    });
  }
  function u(P) {
    const { schema: T, opts: k, gen: U } = P;
    g(P, () => {
      k.$comment && T.$comment && F(P), j(P), U.let(c.default.vErrors, null), U.let(c.default.errors, 0), k.unevaluated && h(P), R(P), M(P);
    });
  }
  function h(P) {
    const { gen: T, validateName: k } = P;
    P.evaluated = T.const("evaluated", (0, a._)`${k}.evaluated`), T.if((0, a._)`${P.evaluated}.dynamicProps`, () => T.assign((0, a._)`${P.evaluated}.props`, (0, a._)`undefined`)), T.if((0, a._)`${P.evaluated}.dynamicItems`, () => T.assign((0, a._)`${P.evaluated}.items`, (0, a._)`undefined`));
  }
  function i(P, T) {
    const k = typeof P == "object" && P[T.schemaId];
    return k && (T.code.source || T.code.process) ? (0, a._)`/*# sourceURL=${k} */` : a.nil;
  }
  function p(P, T) {
    if (m(P) && ($(P), v(P))) {
      y(P, T);
      return;
    }
    (0, e.boolOrEmptySchema)(P, T);
  }
  function v({ schema: P, self: T }) {
    if (typeof P == "boolean")
      return !P;
    for (const k in P)
      if (T.RULES.all[k])
        return !0;
    return !1;
  }
  function m(P) {
    return typeof P.schema != "boolean";
  }
  function y(P, T) {
    const { schema: k, gen: U, opts: K } = P;
    K.$comment && k.$comment && F(P), L(P), V(P);
    const Y = U.const("_errs", c.default.errors);
    R(P, Y), U.var(T, (0, a._)`${Y} === ${c.default.errors}`);
  }
  function $(P) {
    (0, f.checkUnknownRules)(P), O(P);
  }
  function R(P, T) {
    if (P.opts.jtd)
      return J(P, [], !1, T);
    const k = (0, t.getSchemaTypes)(P.schema), U = (0, t.coerceAndCheckDataType)(P, k);
    J(P, k, !U, T);
  }
  function O(P) {
    const { schema: T, errSchemaPath: k, opts: U, self: K } = P;
    T.$ref && U.ignoreKeywordsWithRef && (0, f.schemaHasRulesButRef)(T, K.RULES) && K.logger.warn(`$ref: keywords ignored in schema at path "${k}"`);
  }
  function j(P) {
    const { schema: T, opts: k } = P;
    T.default !== void 0 && k.useDefaults && k.strictSchema && (0, f.checkStrictMode)(P, "default is ignored in the schema root");
  }
  function L(P) {
    const T = P.schema[P.opts.schemaId];
    T && (P.baseId = (0, d.resolveUrl)(P.opts.uriResolver, P.baseId, T));
  }
  function V(P) {
    if (P.schema.$async && !P.schemaEnv.$async)
      throw new Error("async schema in sync schema");
  }
  function F({ gen: P, schemaEnv: T, schema: k, errSchemaPath: U, opts: K }) {
    const Y = k.$comment;
    if (K.$comment === !0)
      P.code((0, a._)`${c.default.self}.logger.log(${Y})`);
    else if (typeof K.$comment == "function") {
      const ie = (0, a.str)`${U}/$comment`, me = P.scopeValue("root", { ref: T.root });
      P.code((0, a._)`${c.default.self}.opts.$comment(${Y}, ${ie}, ${me}.schema)`);
    }
  }
  function M(P) {
    const { gen: T, schemaEnv: k, validateName: U, ValidationError: K, opts: Y } = P;
    k.$async ? T.if((0, a._)`${c.default.errors} === 0`, () => T.return(c.default.data), () => T.throw((0, a._)`new ${K}(${c.default.vErrors})`)) : (T.assign((0, a._)`${U}.errors`, c.default.vErrors), Y.unevaluated && z(P), T.return((0, a._)`${c.default.errors} === 0`));
  }
  function z({ gen: P, evaluated: T, props: k, items: U }) {
    k instanceof a.Name && P.assign((0, a._)`${T}.props`, k), U instanceof a.Name && P.assign((0, a._)`${T}.items`, U);
  }
  function J(P, T, k, U) {
    const { gen: K, schema: Y, data: ie, allErrors: me, opts: ue, self: le } = P, { RULES: oe } = le;
    if (Y.$ref && (ue.ignoreKeywordsWithRef || !(0, f.schemaHasRulesButRef)(Y, oe))) {
      K.block(() => G(P, "$ref", oe.all.$ref.definition));
      return;
    }
    ue.jtd || B(P, T), K.block(() => {
      for (const he of oe.rules)
        Ie(he);
      Ie(oe.post);
    });
    function Ie(he) {
      (0, o.shouldUseGroup)(Y, he) && (he.type ? (K.if((0, s.checkDataType)(he.type, ie, ue.strictNumbers)), x(P, he), T.length === 1 && T[0] === he.type && k && (K.else(), (0, s.reportTypeError)(P)), K.endIf()) : x(P, he), me || K.if((0, a._)`${c.default.errors} === ${U || 0}`));
    }
  }
  function x(P, T) {
    const { gen: k, schema: U, opts: { useDefaults: K } } = P;
    K && (0, l.assignDefaults)(P, T.type), k.block(() => {
      for (const Y of T.rules)
        (0, o.shouldUseRule)(U, Y) && G(P, Y.keyword, Y.definition, T.type);
    });
  }
  function B(P, T) {
    P.schemaEnv.meta || !P.opts.strictTypes || (W(P, T), P.opts.allowUnionTypes || q(P, T), I(P, P.dataTypes));
  }
  function W(P, T) {
    if (T.length) {
      if (!P.dataTypes.length) {
        P.dataTypes = T;
        return;
      }
      T.forEach((k) => {
        C(P.dataTypes, k) || N(P, `type "${k}" not allowed by context "${P.dataTypes.join(",")}"`);
      }), S(P, T);
    }
  }
  function q(P, T) {
    T.length > 1 && !(T.length === 2 && T.includes("null")) && N(P, "use allowUnionTypes to allow union type keyword");
  }
  function I(P, T) {
    const k = P.self.RULES.all;
    for (const U in k) {
      const K = k[U];
      if (typeof K == "object" && (0, o.shouldUseRule)(P.schema, K)) {
        const { type: Y } = K.definition;
        Y.length && !Y.some((ie) => A(T, ie)) && N(P, `missing type "${Y.join(",")}" for keyword "${U}"`);
      }
    }
  }
  function A(P, T) {
    return P.includes(T) || T === "number" && P.includes("integer");
  }
  function C(P, T) {
    return P.includes(T) || T === "integer" && P.includes("number");
  }
  function S(P, T) {
    const k = [];
    for (const U of P.dataTypes)
      C(T, U) ? k.push(U) : T.includes("integer") && U === "number" && k.push("integer");
    P.dataTypes = k;
  }
  function N(P, T) {
    const k = P.schemaEnv.baseId + P.errSchemaPath;
    T += ` at "${k}" (strictTypes)`, (0, f.checkStrictMode)(P, T, P.opts.strictTypes);
  }
  class D {
    constructor(T, k, U) {
      if ((0, n.validateKeywordUsage)(T, k, U), this.gen = T.gen, this.allErrors = T.allErrors, this.keyword = U, this.data = T.data, this.schema = T.schema[U], this.$data = k.$data && T.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, f.schemaRefOrVal)(T, this.schema, U, this.$data), this.schemaType = k.schemaType, this.parentSchema = T.schema, this.params = {}, this.it = T, this.def = k, this.$data)
        this.schemaCode = T.gen.const("vSchema", Z(this.$data, T));
      else if (this.schemaCode = this.schemaValue, !(0, n.validSchemaType)(this.schema, k.schemaType, k.allowUndefined))
        throw new Error(`${U} value must be ${JSON.stringify(k.schemaType)}`);
      ("code" in k ? k.trackErrors : k.errors !== !1) && (this.errsCount = T.gen.const("_errs", c.default.errors));
    }
    result(T, k, U) {
      this.failResult((0, a.not)(T), k, U);
    }
    failResult(T, k, U) {
      this.gen.if(T), U ? U() : this.error(), k ? (this.gen.else(), k(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    pass(T, k) {
      this.failResult((0, a.not)(T), void 0, k);
    }
    fail(T) {
      if (T === void 0) {
        this.error(), this.allErrors || this.gen.if(!1);
        return;
      }
      this.gen.if(T), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    fail$data(T) {
      if (!this.$data)
        return this.fail(T);
      const { schemaCode: k } = this;
      this.fail((0, a._)`${k} !== undefined && (${(0, a.or)(this.invalid$data(), T)})`);
    }
    error(T, k, U) {
      if (k) {
        this.setParams(k), this._error(T, U), this.setParams({});
        return;
      }
      this._error(T, U);
    }
    _error(T, k) {
      (T ? E.reportExtraError : E.reportError)(this, this.def.error, k);
    }
    $dataError() {
      (0, E.reportError)(this, this.def.$dataError || E.keyword$DataError);
    }
    reset() {
      if (this.errsCount === void 0)
        throw new Error('add "trackErrors" to keyword definition');
      (0, E.resetErrorsCount)(this.gen, this.errsCount);
    }
    ok(T) {
      this.allErrors || this.gen.if(T);
    }
    setParams(T, k) {
      k ? Object.assign(this.params, T) : this.params = T;
    }
    block$data(T, k, U = a.nil) {
      this.gen.block(() => {
        this.check$data(T, U), k();
      });
    }
    check$data(T = a.nil, k = a.nil) {
      if (!this.$data)
        return;
      const { gen: U, schemaCode: K, schemaType: Y, def: ie } = this;
      U.if((0, a.or)((0, a._)`${K} === undefined`, k)), T !== a.nil && U.assign(T, !0), (Y.length || ie.validateSchema) && (U.elseIf(this.invalid$data()), this.$dataError(), T !== a.nil && U.assign(T, !1)), U.else();
    }
    invalid$data() {
      const { gen: T, schemaCode: k, schemaType: U, def: K, it: Y } = this;
      return (0, a.or)(ie(), me());
      function ie() {
        if (U.length) {
          if (!(k instanceof a.Name))
            throw new Error("ajv implementation error");
          const ue = Array.isArray(U) ? U : [U];
          return (0, a._)`${(0, s.checkDataTypes)(ue, k, Y.opts.strictNumbers, s.DataType.Wrong)}`;
        }
        return a.nil;
      }
      function me() {
        if (K.validateSchema) {
          const ue = T.scopeValue("validate$data", { ref: K.validateSchema });
          return (0, a._)`!${ue}(${k})`;
        }
        return a.nil;
      }
    }
    subschema(T, k) {
      const U = (0, r.getSubschema)(this.it, T);
      (0, r.extendSubschemaData)(U, this.it, T), (0, r.extendSubschemaMode)(U, T);
      const K = { ...this.it, ...U, items: void 0, props: void 0 };
      return p(K, k), K;
    }
    mergeEvaluated(T, k) {
      const { it: U, gen: K } = this;
      U.opts.unevaluated && (U.props !== !0 && T.props !== void 0 && (U.props = f.mergeEvaluated.props(K, T.props, U.props, k)), U.items !== !0 && T.items !== void 0 && (U.items = f.mergeEvaluated.items(K, T.items, U.items, k)));
    }
    mergeValidEvaluated(T, k) {
      const { it: U, gen: K } = this;
      if (U.opts.unevaluated && (U.props !== !0 || U.items !== !0))
        return K.if(k, () => this.mergeEvaluated(T, a.Name)), !0;
    }
  }
  Be.KeywordCxt = D;
  function G(P, T, k, U) {
    const K = new D(P, k, T);
    "code" in k ? k.code(K, U) : K.$data && k.validate ? (0, n.funcKeywordCode)(K, k) : "macro" in k ? (0, n.macroKeywordCode)(K, k) : (k.compile || k.validate) && (0, n.funcKeywordCode)(K, k);
  }
  const H = /^\/(?:[^~]|~0|~1)*$/, X = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
  function Z(P, { dataLevel: T, dataNames: k, dataPathArr: U }) {
    let K, Y;
    if (P === "")
      return c.default.rootData;
    if (P[0] === "/") {
      if (!H.test(P))
        throw new Error(`Invalid JSON-pointer: ${P}`);
      K = P, Y = c.default.rootData;
    } else {
      const le = X.exec(P);
      if (!le)
        throw new Error(`Invalid JSON-pointer: ${P}`);
      const oe = +le[1];
      if (K = le[2], K === "#") {
        if (oe >= T)
          throw new Error(ue("property/index", oe));
        return U[T - oe];
      }
      if (oe > T)
        throw new Error(ue("data", oe));
      if (Y = k[T - oe], !K)
        return Y;
    }
    let ie = Y;
    const me = K.split("/");
    for (const le of me)
      le && (Y = (0, a._)`${Y}${(0, a.getProperty)((0, f.unescapeJsonPointer)(le))}`, ie = (0, a._)`${ie} && ${Y}`);
    return ie;
    function ue(le, oe) {
      return `Cannot access ${le} ${oe} levels up, current level is ${T}`;
    }
  }
  return Be.getData = Z, Be;
}
var Hr = {}, hu;
function wo() {
  if (hu) return Hr;
  hu = 1, Object.defineProperty(Hr, "__esModule", { value: !0 });
  class e extends Error {
    constructor(o) {
      super("validation failed"), this.errors = o, this.ajv = this.validation = !0;
    }
  }
  return Hr.default = e, Hr;
}
var Br = {}, mu;
function Jn() {
  if (mu) return Br;
  mu = 1, Object.defineProperty(Br, "__esModule", { value: !0 });
  const e = Bn();
  class t extends Error {
    constructor(s, l, n, r) {
      super(r || `can't resolve reference ${n} from id ${l}`), this.missingRef = (0, e.resolveUrl)(s, l, n), this.missingSchema = (0, e.normalizeId)((0, e.getFullPath)(s, this.missingRef));
    }
  }
  return Br.default = t, Br;
}
var Ce = {}, pu;
function So() {
  if (pu) return Ce;
  pu = 1, Object.defineProperty(Ce, "__esModule", { value: !0 }), Ce.resolveSchema = Ce.getCompilingSchema = Ce.resolveRef = Ce.compileSchema = Ce.SchemaEnv = void 0;
  const e = ne(), t = wo(), o = nt(), s = Bn(), l = ae(), n = xn();
  class r {
    constructor(h) {
      var i;
      this.refs = {}, this.dynamicAnchors = {};
      let p;
      typeof h.schema == "object" && (p = h.schema), this.schema = h.schema, this.schemaId = h.schemaId, this.root = h.root || this, this.baseId = (i = h.baseId) !== null && i !== void 0 ? i : (0, s.normalizeId)(p?.[h.schemaId || "$id"]), this.schemaPath = h.schemaPath, this.localRefs = h.localRefs, this.meta = h.meta, this.$async = p?.$async, this.refs = {};
    }
  }
  Ce.SchemaEnv = r;
  function a(u) {
    const h = f.call(this, u);
    if (h)
      return h;
    const i = (0, s.getFullPath)(this.opts.uriResolver, u.root.baseId), { es5: p, lines: v } = this.opts.code, { ownProperties: m } = this.opts, y = new e.CodeGen(this.scope, { es5: p, lines: v, ownProperties: m });
    let $;
    u.$async && ($ = y.scopeValue("Error", {
      ref: t.default,
      code: (0, e._)`require("ajv/dist/runtime/validation_error").default`
    }));
    const R = y.scopeName("validate");
    u.validateName = R;
    const O = {
      gen: y,
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
      topSchemaRef: y.scopeValue("schema", this.opts.code.source === !0 ? { ref: u.schema, code: (0, e.stringify)(u.schema) } : { ref: u.schema }),
      validateName: R,
      ValidationError: $,
      schema: u.schema,
      schemaEnv: u,
      rootId: i,
      baseId: u.baseId || i,
      schemaPath: e.nil,
      errSchemaPath: u.schemaPath || (this.opts.jtd ? "" : "#"),
      errorPath: (0, e._)`""`,
      opts: this.opts,
      self: this
    };
    let j;
    try {
      this._compilations.add(u), (0, n.validateFunctionCode)(O), y.optimize(this.opts.code.optimize);
      const L = y.toString();
      j = `${y.scopeRefs(o.default.scope)}return ${L}`, this.opts.code.process && (j = this.opts.code.process(j, u));
      const F = new Function(`${o.default.self}`, `${o.default.scope}`, j)(this, this.scope.get());
      if (this.scope.value(R, { ref: F }), F.errors = null, F.schema = u.schema, F.schemaEnv = u, u.$async && (F.$async = !0), this.opts.code.source === !0 && (F.source = { validateName: R, validateCode: L, scopeValues: y._values }), this.opts.unevaluated) {
        const { props: M, items: z } = O;
        F.evaluated = {
          props: M instanceof e.Name ? void 0 : M,
          items: z instanceof e.Name ? void 0 : z,
          dynamicProps: M instanceof e.Name,
          dynamicItems: z instanceof e.Name
        }, F.source && (F.source.evaluated = (0, e.stringify)(F.evaluated));
      }
      return u.validate = F, u;
    } catch (L) {
      throw delete u.validate, delete u.validateName, j && this.logger.error("Error compiling schema, function code:", j), L;
    } finally {
      this._compilations.delete(u);
    }
  }
  Ce.compileSchema = a;
  function c(u, h, i) {
    var p;
    i = (0, s.resolveUrl)(this.opts.uriResolver, h, i);
    const v = u.refs[i];
    if (v)
      return v;
    let m = _.call(this, u, i);
    if (m === void 0) {
      const y = (p = u.localRefs) === null || p === void 0 ? void 0 : p[i], { schemaId: $ } = this.opts;
      y && (m = new r({ schema: y, schemaId: $, root: u, baseId: h }));
    }
    if (m !== void 0)
      return u.refs[i] = d.call(this, m);
  }
  Ce.resolveRef = c;
  function d(u) {
    return (0, s.inlineRef)(u.schema, this.opts.inlineRefs) ? u.schema : u.validate ? u : a.call(this, u);
  }
  function f(u) {
    for (const h of this._compilations)
      if (E(h, u))
        return h;
  }
  Ce.getCompilingSchema = f;
  function E(u, h) {
    return u.schema === h.schema && u.root === h.root && u.baseId === h.baseId;
  }
  function _(u, h) {
    let i;
    for (; typeof (i = this.refs[h]) == "string"; )
      h = i;
    return i || this.schemas[h] || g.call(this, u, h);
  }
  function g(u, h) {
    const i = this.opts.uriResolver.parse(h), p = (0, s._getFullPath)(this.opts.uriResolver, i);
    let v = (0, s.getFullPath)(this.opts.uriResolver, u.baseId, void 0);
    if (Object.keys(u.schema).length > 0 && p === v)
      return b.call(this, i, u);
    const m = (0, s.normalizeId)(p), y = this.refs[m] || this.schemas[m];
    if (typeof y == "string") {
      const $ = g.call(this, u, y);
      return typeof $?.schema != "object" ? void 0 : b.call(this, i, $);
    }
    if (typeof y?.schema == "object") {
      if (y.validate || a.call(this, y), m === (0, s.normalizeId)(h)) {
        const { schema: $ } = y, { schemaId: R } = this.opts, O = $[R];
        return O && (v = (0, s.resolveUrl)(this.opts.uriResolver, v, O)), new r({ schema: $, schemaId: R, root: u, baseId: v });
      }
      return b.call(this, i, y);
    }
  }
  Ce.resolveSchema = g;
  const w = /* @__PURE__ */ new Set([
    "properties",
    "patternProperties",
    "enum",
    "dependencies",
    "definitions"
  ]);
  function b(u, { baseId: h, schema: i, root: p }) {
    var v;
    if (((v = u.fragment) === null || v === void 0 ? void 0 : v[0]) !== "/")
      return;
    for (const $ of u.fragment.slice(1).split("/")) {
      if (typeof i == "boolean")
        return;
      const R = i[(0, l.unescapeFragment)($)];
      if (R === void 0)
        return;
      i = R;
      const O = typeof i == "object" && i[this.opts.schemaId];
      !w.has($) && O && (h = (0, s.resolveUrl)(this.opts.uriResolver, h, O));
    }
    let m;
    if (typeof i != "boolean" && i.$ref && !(0, l.schemaHasRulesButRef)(i, this.RULES)) {
      const $ = (0, s.resolveUrl)(this.opts.uriResolver, h, i.$ref);
      m = g.call(this, p, $);
    }
    const { schemaId: y } = this.opts;
    if (m = m || new r({ schema: i, schemaId: y, root: p, baseId: h }), m.schema !== m.root.schema)
      return m;
  }
  return Ce;
}
const Rp = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", Np = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Pp = "object", Ip = ["$data"], Op = { $data: { type: "string", anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }] } }, Tp = !1, Cp = {
  $id: Rp,
  description: Np,
  type: Pp,
  required: Ip,
  properties: Op,
  additionalProperties: Tp
};
var xr = {}, yu;
function Dp() {
  if (yu) return xr;
  yu = 1, Object.defineProperty(xr, "__esModule", { value: !0 });
  const e = Cf();
  return e.code = 'require("ajv/dist/runtime/uri").default', xr.default = e, xr;
}
var vu;
function Ap() {
  return vu || (vu = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
    var t = xn();
    Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
      return t.KeywordCxt;
    } });
    var o = ne();
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
    const s = wo(), l = Jn(), n = qf(), r = So(), a = ne(), c = Bn(), d = Ln(), f = ae(), E = Cp, _ = Dp(), g = (q, I) => new RegExp(q, I);
    g.code = "new RegExp";
    const w = ["removeAdditional", "useDefaults", "coerceTypes"], b = /* @__PURE__ */ new Set([
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
    }, i = 200;
    function p(q) {
      var I, A, C, S, N, D, G, H, X, Z, P, T, k, U, K, Y, ie, me, ue, le, oe, Ie, he, st, it;
      const Ae = q.strict, ot = (I = q.code) === null || I === void 0 ? void 0 : I.optimize, It = ot === !0 || ot === void 0 ? 1 : ot || 0, Ot = (C = (A = q.code) === null || A === void 0 ? void 0 : A.regExp) !== null && C !== void 0 ? C : g, es = (S = q.uriResolver) !== null && S !== void 0 ? S : _.default;
      return {
        strictSchema: (D = (N = q.strictSchema) !== null && N !== void 0 ? N : Ae) !== null && D !== void 0 ? D : !0,
        strictNumbers: (H = (G = q.strictNumbers) !== null && G !== void 0 ? G : Ae) !== null && H !== void 0 ? H : !0,
        strictTypes: (Z = (X = q.strictTypes) !== null && X !== void 0 ? X : Ae) !== null && Z !== void 0 ? Z : "log",
        strictTuples: (T = (P = q.strictTuples) !== null && P !== void 0 ? P : Ae) !== null && T !== void 0 ? T : "log",
        strictRequired: (U = (k = q.strictRequired) !== null && k !== void 0 ? k : Ae) !== null && U !== void 0 ? U : !1,
        code: q.code ? { ...q.code, optimize: It, regExp: Ot } : { optimize: It, regExp: Ot },
        loopRequired: (K = q.loopRequired) !== null && K !== void 0 ? K : i,
        loopEnum: (Y = q.loopEnum) !== null && Y !== void 0 ? Y : i,
        meta: (ie = q.meta) !== null && ie !== void 0 ? ie : !0,
        messages: (me = q.messages) !== null && me !== void 0 ? me : !0,
        inlineRefs: (ue = q.inlineRefs) !== null && ue !== void 0 ? ue : !0,
        schemaId: (le = q.schemaId) !== null && le !== void 0 ? le : "$id",
        addUsedSchema: (oe = q.addUsedSchema) !== null && oe !== void 0 ? oe : !0,
        validateSchema: (Ie = q.validateSchema) !== null && Ie !== void 0 ? Ie : !0,
        validateFormats: (he = q.validateFormats) !== null && he !== void 0 ? he : !0,
        unicodeRegExp: (st = q.unicodeRegExp) !== null && st !== void 0 ? st : !0,
        int32range: (it = q.int32range) !== null && it !== void 0 ? it : !0,
        uriResolver: es
      };
    }
    class v {
      constructor(I = {}) {
        this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), I = this.opts = { ...I, ...p(I) };
        const { es5: A, lines: C } = this.opts.code;
        this.scope = new a.ValueScope({ scope: {}, prefixes: b, es5: A, lines: C }), this.logger = V(I.logger);
        const S = I.validateFormats;
        I.validateFormats = !1, this.RULES = (0, n.getRules)(), m.call(this, u, I, "NOT SUPPORTED"), m.call(this, h, I, "DEPRECATED", "warn"), this._metaOpts = j.call(this), I.formats && R.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), I.keywords && O.call(this, I.keywords), typeof I.meta == "object" && this.addMetaSchema(I.meta), $.call(this), I.validateFormats = S;
      }
      _addVocabularies() {
        this.addKeyword("$async");
      }
      _addDefaultMetaSchema() {
        const { $data: I, meta: A, schemaId: C } = this.opts;
        let S = E;
        C === "id" && (S = { ...E }, S.id = S.$id, delete S.$id), A && I && this.addMetaSchema(S, S[C], !1);
      }
      defaultMeta() {
        const { meta: I, schemaId: A } = this.opts;
        return this.opts.defaultMeta = typeof I == "object" ? I[A] || I : void 0;
      }
      validate(I, A) {
        let C;
        if (typeof I == "string") {
          if (C = this.getSchema(I), !C)
            throw new Error(`no schema with key or ref "${I}"`);
        } else
          C = this.compile(I);
        const S = C(A);
        return "$async" in C || (this.errors = C.errors), S;
      }
      compile(I, A) {
        const C = this._addSchema(I, A);
        return C.validate || this._compileSchemaEnv(C);
      }
      compileAsync(I, A) {
        if (typeof this.opts.loadSchema != "function")
          throw new Error("options.loadSchema should be a function");
        const { loadSchema: C } = this.opts;
        return S.call(this, I, A);
        async function S(Z, P) {
          await N.call(this, Z.$schema);
          const T = this._addSchema(Z, P);
          return T.validate || D.call(this, T);
        }
        async function N(Z) {
          Z && !this.getSchema(Z) && await S.call(this, { $ref: Z }, !0);
        }
        async function D(Z) {
          try {
            return this._compileSchemaEnv(Z);
          } catch (P) {
            if (!(P instanceof l.default))
              throw P;
            return G.call(this, P), await H.call(this, P.missingSchema), D.call(this, Z);
          }
        }
        function G({ missingSchema: Z, missingRef: P }) {
          if (this.refs[Z])
            throw new Error(`AnySchema ${Z} is loaded but ${P} cannot be resolved`);
        }
        async function H(Z) {
          const P = await X.call(this, Z);
          this.refs[Z] || await N.call(this, P.$schema), this.refs[Z] || this.addSchema(P, Z, A);
        }
        async function X(Z) {
          const P = this._loading[Z];
          if (P)
            return P;
          try {
            return await (this._loading[Z] = C(Z));
          } finally {
            delete this._loading[Z];
          }
        }
      }
      // Adds schema to the instance
      addSchema(I, A, C, S = this.opts.validateSchema) {
        if (Array.isArray(I)) {
          for (const D of I)
            this.addSchema(D, void 0, C, S);
          return this;
        }
        let N;
        if (typeof I == "object") {
          const { schemaId: D } = this.opts;
          if (N = I[D], N !== void 0 && typeof N != "string")
            throw new Error(`schema ${D} must be string`);
        }
        return A = (0, c.normalizeId)(A || N), this._checkUnique(A), this.schemas[A] = this._addSchema(I, C, A, S, !0), this;
      }
      // Add schema that will be used to validate other schemas
      // options in META_IGNORE_OPTIONS are alway set to false
      addMetaSchema(I, A, C = this.opts.validateSchema) {
        return this.addSchema(I, A, !0, C), this;
      }
      //  Validate schema against its meta-schema
      validateSchema(I, A) {
        if (typeof I == "boolean")
          return !0;
        let C;
        if (C = I.$schema, C !== void 0 && typeof C != "string")
          throw new Error("$schema must be a string");
        if (C = C || this.opts.defaultMeta || this.defaultMeta(), !C)
          return this.logger.warn("meta-schema not available"), this.errors = null, !0;
        const S = this.validate(C, I);
        if (!S && A) {
          const N = "schema is invalid: " + this.errorsText();
          if (this.opts.validateSchema === "log")
            this.logger.error(N);
          else
            throw new Error(N);
        }
        return S;
      }
      // Get compiled schema by `key` or `ref`.
      // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
      getSchema(I) {
        let A;
        for (; typeof (A = y.call(this, I)) == "string"; )
          I = A;
        if (A === void 0) {
          const { schemaId: C } = this.opts, S = new r.SchemaEnv({ schema: {}, schemaId: C });
          if (A = r.resolveSchema.call(this, S, I), !A)
            return;
          this.refs[I] = A;
        }
        return A.validate || this._compileSchemaEnv(A);
      }
      // Remove cached schema(s).
      // If no parameter is passed all schemas but meta-schemas are removed.
      // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
      // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
      removeSchema(I) {
        if (I instanceof RegExp)
          return this._removeAllSchemas(this.schemas, I), this._removeAllSchemas(this.refs, I), this;
        switch (typeof I) {
          case "undefined":
            return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
          case "string": {
            const A = y.call(this, I);
            return typeof A == "object" && this._cache.delete(A.schema), delete this.schemas[I], delete this.refs[I], this;
          }
          case "object": {
            const A = I;
            this._cache.delete(A);
            let C = I[this.opts.schemaId];
            return C && (C = (0, c.normalizeId)(C), delete this.schemas[C], delete this.refs[C]), this;
          }
          default:
            throw new Error("ajv.removeSchema: invalid parameter");
        }
      }
      // add "vocabulary" - a collection of keywords
      addVocabulary(I) {
        for (const A of I)
          this.addKeyword(A);
        return this;
      }
      addKeyword(I, A) {
        let C;
        if (typeof I == "string")
          C = I, typeof A == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), A.keyword = C);
        else if (typeof I == "object" && A === void 0) {
          if (A = I, C = A.keyword, Array.isArray(C) && !C.length)
            throw new Error("addKeywords: keyword must be string or non-empty array");
        } else
          throw new Error("invalid addKeywords parameters");
        if (M.call(this, C, A), !A)
          return (0, f.eachItem)(C, (N) => z.call(this, N)), this;
        x.call(this, A);
        const S = {
          ...A,
          type: (0, d.getJSONTypes)(A.type),
          schemaType: (0, d.getJSONTypes)(A.schemaType)
        };
        return (0, f.eachItem)(C, S.type.length === 0 ? (N) => z.call(this, N, S) : (N) => S.type.forEach((D) => z.call(this, N, S, D))), this;
      }
      getKeyword(I) {
        const A = this.RULES.all[I];
        return typeof A == "object" ? A.definition : !!A;
      }
      // Remove keyword
      removeKeyword(I) {
        const { RULES: A } = this;
        delete A.keywords[I], delete A.all[I];
        for (const C of A.rules) {
          const S = C.rules.findIndex((N) => N.keyword === I);
          S >= 0 && C.rules.splice(S, 1);
        }
        return this;
      }
      // Add format
      addFormat(I, A) {
        return typeof A == "string" && (A = new RegExp(A)), this.formats[I] = A, this;
      }
      errorsText(I = this.errors, { separator: A = ", ", dataVar: C = "data" } = {}) {
        return !I || I.length === 0 ? "No errors" : I.map((S) => `${C}${S.instancePath} ${S.message}`).reduce((S, N) => S + A + N);
      }
      $dataMetaSchema(I, A) {
        const C = this.RULES.all;
        I = JSON.parse(JSON.stringify(I));
        for (const S of A) {
          const N = S.split("/").slice(1);
          let D = I;
          for (const G of N)
            D = D[G];
          for (const G in C) {
            const H = C[G];
            if (typeof H != "object")
              continue;
            const { $data: X } = H.definition, Z = D[G];
            X && Z && (D[G] = W(Z));
          }
        }
        return I;
      }
      _removeAllSchemas(I, A) {
        for (const C in I) {
          const S = I[C];
          (!A || A.test(C)) && (typeof S == "string" ? delete I[C] : S && !S.meta && (this._cache.delete(S.schema), delete I[C]));
        }
      }
      _addSchema(I, A, C, S = this.opts.validateSchema, N = this.opts.addUsedSchema) {
        let D;
        const { schemaId: G } = this.opts;
        if (typeof I == "object")
          D = I[G];
        else {
          if (this.opts.jtd)
            throw new Error("schema must be object");
          if (typeof I != "boolean")
            throw new Error("schema must be object or boolean");
        }
        let H = this._cache.get(I);
        if (H !== void 0)
          return H;
        C = (0, c.normalizeId)(D || C);
        const X = c.getSchemaRefs.call(this, I, C);
        return H = new r.SchemaEnv({ schema: I, schemaId: G, meta: A, baseId: C, localRefs: X }), this._cache.set(H.schema, H), N && !C.startsWith("#") && (C && this._checkUnique(C), this.refs[C] = H), S && this.validateSchema(I, !0), H;
      }
      _checkUnique(I) {
        if (this.schemas[I] || this.refs[I])
          throw new Error(`schema with key or id "${I}" already exists`);
      }
      _compileSchemaEnv(I) {
        if (I.meta ? this._compileMetaSchema(I) : r.compileSchema.call(this, I), !I.validate)
          throw new Error("ajv implementation error");
        return I.validate;
      }
      _compileMetaSchema(I) {
        const A = this.opts;
        this.opts = this._metaOpts;
        try {
          r.compileSchema.call(this, I);
        } finally {
          this.opts = A;
        }
      }
    }
    v.ValidationError = s.default, v.MissingRefError = l.default, e.default = v;
    function m(q, I, A, C = "error") {
      for (const S in q) {
        const N = S;
        N in I && this.logger[C](`${A}: option ${S}. ${q[N]}`);
      }
    }
    function y(q) {
      return q = (0, c.normalizeId)(q), this.schemas[q] || this.refs[q];
    }
    function $() {
      const q = this.opts.schemas;
      if (q)
        if (Array.isArray(q))
          this.addSchema(q);
        else
          for (const I in q)
            this.addSchema(q[I], I);
    }
    function R() {
      for (const q in this.opts.formats) {
        const I = this.opts.formats[q];
        I && this.addFormat(q, I);
      }
    }
    function O(q) {
      if (Array.isArray(q)) {
        this.addVocabulary(q);
        return;
      }
      this.logger.warn("keywords option as map is deprecated, pass array");
      for (const I in q) {
        const A = q[I];
        A.keyword || (A.keyword = I), this.addKeyword(A);
      }
    }
    function j() {
      const q = { ...this.opts };
      for (const I of w)
        delete q[I];
      return q;
    }
    const L = { log() {
    }, warn() {
    }, error() {
    } };
    function V(q) {
      if (q === !1)
        return L;
      if (q === void 0)
        return console;
      if (q.log && q.warn && q.error)
        return q;
      throw new Error("logger must implement log, warn and error methods");
    }
    const F = /^[a-z_$][a-z0-9_$:-]*$/i;
    function M(q, I) {
      const { RULES: A } = this;
      if ((0, f.eachItem)(q, (C) => {
        if (A.keywords[C])
          throw new Error(`Keyword ${C} is already defined`);
        if (!F.test(C))
          throw new Error(`Keyword ${C} has invalid name`);
      }), !!I && I.$data && !("code" in I || "validate" in I))
        throw new Error('$data keyword must have "code" or "validate" function');
    }
    function z(q, I, A) {
      var C;
      const S = I?.post;
      if (A && S)
        throw new Error('keyword with "post" flag cannot have "type"');
      const { RULES: N } = this;
      let D = S ? N.post : N.rules.find(({ type: H }) => H === A);
      if (D || (D = { type: A, rules: [] }, N.rules.push(D)), N.keywords[q] = !0, !I)
        return;
      const G = {
        keyword: q,
        definition: {
          ...I,
          type: (0, d.getJSONTypes)(I.type),
          schemaType: (0, d.getJSONTypes)(I.schemaType)
        }
      };
      I.before ? J.call(this, D, G, I.before) : D.rules.push(G), N.all[q] = G, (C = I.implements) === null || C === void 0 || C.forEach((H) => this.addKeyword(H));
    }
    function J(q, I, A) {
      const C = q.rules.findIndex((S) => S.keyword === A);
      C >= 0 ? q.rules.splice(C, 0, I) : (q.rules.push(I), this.logger.warn(`rule ${A} is not defined`));
    }
    function x(q) {
      let { metaSchema: I } = q;
      I !== void 0 && (q.$data && this.opts.$data && (I = W(I)), q.validateSchema = this.compile(I, !0));
    }
    const B = {
      $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
    };
    function W(q) {
      return { anyOf: [q, B] };
    }
  }(Zs)), Zs;
}
var Jr = {}, Wr = {}, Zr = {}, $u;
function jp() {
  if ($u) return Zr;
  $u = 1, Object.defineProperty(Zr, "__esModule", { value: !0 });
  const e = {
    keyword: "id",
    code() {
      throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
    }
  };
  return Zr.default = e, Zr;
}
var Qe = {}, gu;
function kp() {
  if (gu) return Qe;
  gu = 1, Object.defineProperty(Qe, "__esModule", { value: !0 }), Qe.callRef = Qe.getValidate = void 0;
  const e = Jn(), t = Fe(), o = ne(), s = nt(), l = So(), n = ae(), r = {
    keyword: "$ref",
    schemaType: "string",
    code(d) {
      const { gen: f, schema: E, it: _ } = d, { baseId: g, schemaEnv: w, validateName: b, opts: u, self: h } = _, { root: i } = w;
      if ((E === "#" || E === "#/") && g === i.baseId)
        return v();
      const p = l.resolveRef.call(h, i, g, E);
      if (p === void 0)
        throw new e.default(_.opts.uriResolver, g, E);
      if (p instanceof l.SchemaEnv)
        return m(p);
      return y(p);
      function v() {
        if (w === i)
          return c(d, b, w, w.$async);
        const $ = f.scopeValue("root", { ref: i });
        return c(d, (0, o._)`${$}.validate`, i, i.$async);
      }
      function m($) {
        const R = a(d, $);
        c(d, R, $, $.$async);
      }
      function y($) {
        const R = f.scopeValue("schema", u.code.source === !0 ? { ref: $, code: (0, o.stringify)($) } : { ref: $ }), O = f.name("valid"), j = d.subschema({
          schema: $,
          dataTypes: [],
          schemaPath: o.nil,
          topSchemaRef: R,
          errSchemaPath: E
        }, O);
        d.mergeEvaluated(j), d.ok(O);
      }
    }
  };
  function a(d, f) {
    const { gen: E } = d;
    return f.validate ? E.scopeValue("validate", { ref: f.validate }) : (0, o._)`${E.scopeValue("wrapper", { ref: f })}.validate`;
  }
  Qe.getValidate = a;
  function c(d, f, E, _) {
    const { gen: g, it: w } = d, { allErrors: b, schemaEnv: u, opts: h } = w, i = h.passContext ? s.default.this : o.nil;
    _ ? p() : v();
    function p() {
      if (!u.$async)
        throw new Error("async schema referenced by sync schema");
      const $ = g.let("valid");
      g.try(() => {
        g.code((0, o._)`await ${(0, t.callValidateCode)(d, f, i)}`), y(f), b || g.assign($, !0);
      }, (R) => {
        g.if((0, o._)`!(${R} instanceof ${w.ValidationError})`, () => g.throw(R)), m(R), b || g.assign($, !1);
      }), d.ok($);
    }
    function v() {
      d.result((0, t.callValidateCode)(d, f, i), () => y(f), () => m(f));
    }
    function m($) {
      const R = (0, o._)`${$}.errors`;
      g.assign(s.default.vErrors, (0, o._)`${s.default.vErrors} === null ? ${R} : ${s.default.vErrors}.concat(${R})`), g.assign(s.default.errors, (0, o._)`${s.default.vErrors}.length`);
    }
    function y($) {
      var R;
      if (!w.opts.unevaluated)
        return;
      const O = (R = E?.validate) === null || R === void 0 ? void 0 : R.evaluated;
      if (w.props !== !0)
        if (O && !O.dynamicProps)
          O.props !== void 0 && (w.props = n.mergeEvaluated.props(g, O.props, w.props));
        else {
          const j = g.var("props", (0, o._)`${$}.evaluated.props`);
          w.props = n.mergeEvaluated.props(g, j, w.props, o.Name);
        }
      if (w.items !== !0)
        if (O && !O.dynamicItems)
          O.items !== void 0 && (w.items = n.mergeEvaluated.items(g, O.items, w.items));
        else {
          const j = g.var("items", (0, o._)`${$}.evaluated.items`);
          w.items = n.mergeEvaluated.items(g, j, w.items, o.Name);
        }
    }
  }
  return Qe.callRef = c, Qe.default = r, Qe;
}
var _u;
function Lp() {
  if (_u) return Wr;
  _u = 1, Object.defineProperty(Wr, "__esModule", { value: !0 });
  const e = jp(), t = kp(), o = [
    "$schema",
    "$id",
    "$defs",
    "$vocabulary",
    { keyword: "$comment" },
    "definitions",
    e.default,
    t.default
  ];
  return Wr.default = o, Wr;
}
var Xr = {}, Yr = {}, Eu;
function qp() {
  if (Eu) return Yr;
  Eu = 1, Object.defineProperty(Yr, "__esModule", { value: !0 });
  const e = ne(), t = e.operators, o = {
    maximum: { okStr: "<=", ok: t.LTE, fail: t.GT },
    minimum: { okStr: ">=", ok: t.GTE, fail: t.LT },
    exclusiveMaximum: { okStr: "<", ok: t.LT, fail: t.GTE },
    exclusiveMinimum: { okStr: ">", ok: t.GT, fail: t.LTE }
  }, s = {
    message: ({ keyword: n, schemaCode: r }) => (0, e.str)`must be ${o[n].okStr} ${r}`,
    params: ({ keyword: n, schemaCode: r }) => (0, e._)`{comparison: ${o[n].okStr}, limit: ${r}}`
  }, l = {
    keyword: Object.keys(o),
    type: "number",
    schemaType: "number",
    $data: !0,
    error: s,
    code(n) {
      const { keyword: r, data: a, schemaCode: c } = n;
      n.fail$data((0, e._)`${a} ${o[r].fail} ${c} || isNaN(${a})`);
    }
  };
  return Yr.default = l, Yr;
}
var Qr = {}, wu;
function Fp() {
  if (wu) return Qr;
  wu = 1, Object.defineProperty(Qr, "__esModule", { value: !0 });
  const e = ne(), o = {
    keyword: "multipleOf",
    type: "number",
    schemaType: "number",
    $data: !0,
    error: {
      message: ({ schemaCode: s }) => (0, e.str)`must be multiple of ${s}`,
      params: ({ schemaCode: s }) => (0, e._)`{multipleOf: ${s}}`
    },
    code(s) {
      const { gen: l, data: n, schemaCode: r, it: a } = s, c = a.opts.multipleOfPrecision, d = l.let("res"), f = c ? (0, e._)`Math.abs(Math.round(${d}) - ${d}) > 1e-${c}` : (0, e._)`${d} !== parseInt(${d})`;
      s.fail$data((0, e._)`(${r} === 0 || (${d} = ${n}/${r}, ${f}))`);
    }
  };
  return Qr.default = o, Qr;
}
var en = {}, tn = {}, Su;
function Mp() {
  if (Su) return tn;
  Su = 1, Object.defineProperty(tn, "__esModule", { value: !0 });
  function e(t) {
    const o = t.length;
    let s = 0, l = 0, n;
    for (; l < o; )
      s++, n = t.charCodeAt(l++), n >= 55296 && n <= 56319 && l < o && (n = t.charCodeAt(l), (n & 64512) === 56320 && l++);
    return s;
  }
  return tn.default = e, e.code = 'require("ajv/dist/runtime/ucs2length").default', tn;
}
var bu;
function Up() {
  if (bu) return en;
  bu = 1, Object.defineProperty(en, "__esModule", { value: !0 });
  const e = ne(), t = ae(), o = Mp(), l = {
    keyword: ["maxLength", "minLength"],
    type: "string",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: n, schemaCode: r }) {
        const a = n === "maxLength" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${a} than ${r} characters`;
      },
      params: ({ schemaCode: n }) => (0, e._)`{limit: ${n}}`
    },
    code(n) {
      const { keyword: r, data: a, schemaCode: c, it: d } = n, f = r === "maxLength" ? e.operators.GT : e.operators.LT, E = d.opts.unicode === !1 ? (0, e._)`${a}.length` : (0, e._)`${(0, t.useFunc)(n.gen, o.default)}(${a})`;
      n.fail$data((0, e._)`${E} ${f} ${c}`);
    }
  };
  return en.default = l, en;
}
var rn = {}, Ru;
function Vp() {
  if (Ru) return rn;
  Ru = 1, Object.defineProperty(rn, "__esModule", { value: !0 });
  const e = Fe(), t = ne(), s = {
    keyword: "pattern",
    type: "string",
    schemaType: "string",
    $data: !0,
    error: {
      message: ({ schemaCode: l }) => (0, t.str)`must match pattern "${l}"`,
      params: ({ schemaCode: l }) => (0, t._)`{pattern: ${l}}`
    },
    code(l) {
      const { data: n, $data: r, schema: a, schemaCode: c, it: d } = l, f = d.opts.unicodeRegExp ? "u" : "", E = r ? (0, t._)`(new RegExp(${c}, ${f}))` : (0, e.usePattern)(l, a);
      l.fail$data((0, t._)`!${E}.test(${n})`);
    }
  };
  return rn.default = s, rn;
}
var nn = {}, Nu;
function zp() {
  if (Nu) return nn;
  Nu = 1, Object.defineProperty(nn, "__esModule", { value: !0 });
  const e = ne(), o = {
    keyword: ["maxProperties", "minProperties"],
    type: "object",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: s, schemaCode: l }) {
        const n = s === "maxProperties" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${n} than ${l} properties`;
      },
      params: ({ schemaCode: s }) => (0, e._)`{limit: ${s}}`
    },
    code(s) {
      const { keyword: l, data: n, schemaCode: r } = s, a = l === "maxProperties" ? e.operators.GT : e.operators.LT;
      s.fail$data((0, e._)`Object.keys(${n}).length ${a} ${r}`);
    }
  };
  return nn.default = o, nn;
}
var sn = {}, Pu;
function Gp() {
  if (Pu) return sn;
  Pu = 1, Object.defineProperty(sn, "__esModule", { value: !0 });
  const e = Fe(), t = ne(), o = ae(), l = {
    keyword: "required",
    type: "object",
    schemaType: "array",
    $data: !0,
    error: {
      message: ({ params: { missingProperty: n } }) => (0, t.str)`must have required property '${n}'`,
      params: ({ params: { missingProperty: n } }) => (0, t._)`{missingProperty: ${n}}`
    },
    code(n) {
      const { gen: r, schema: a, schemaCode: c, data: d, $data: f, it: E } = n, { opts: _ } = E;
      if (!f && a.length === 0)
        return;
      const g = a.length >= _.loopRequired;
      if (E.allErrors ? w() : b(), _.strictRequired) {
        const i = n.parentSchema.properties, { definedProperties: p } = n.it;
        for (const v of a)
          if (i?.[v] === void 0 && !p.has(v)) {
            const m = E.schemaEnv.baseId + E.errSchemaPath, y = `required property "${v}" is not defined at "${m}" (strictRequired)`;
            (0, o.checkStrictMode)(E, y, E.opts.strictRequired);
          }
      }
      function w() {
        if (g || f)
          n.block$data(t.nil, u);
        else
          for (const i of a)
            (0, e.checkReportMissingProp)(n, i);
      }
      function b() {
        const i = r.let("missing");
        if (g || f) {
          const p = r.let("valid", !0);
          n.block$data(p, () => h(i, p)), n.ok(p);
        } else
          r.if((0, e.checkMissingProp)(n, a, i)), (0, e.reportMissingProp)(n, i), r.else();
      }
      function u() {
        r.forOf("prop", c, (i) => {
          n.setParams({ missingProperty: i }), r.if((0, e.noPropertyInData)(r, d, i, _.ownProperties), () => n.error());
        });
      }
      function h(i, p) {
        n.setParams({ missingProperty: i }), r.forOf(i, c, () => {
          r.assign(p, (0, e.propertyInData)(r, d, i, _.ownProperties)), r.if((0, t.not)(p), () => {
            n.error(), r.break();
          });
        }, t.nil);
      }
    }
  };
  return sn.default = l, sn;
}
var on = {}, Iu;
function Kp() {
  if (Iu) return on;
  Iu = 1, Object.defineProperty(on, "__esModule", { value: !0 });
  const e = ne(), o = {
    keyword: ["maxItems", "minItems"],
    type: "array",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: s, schemaCode: l }) {
        const n = s === "maxItems" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${n} than ${l} items`;
      },
      params: ({ schemaCode: s }) => (0, e._)`{limit: ${s}}`
    },
    code(s) {
      const { keyword: l, data: n, schemaCode: r } = s, a = l === "maxItems" ? e.operators.GT : e.operators.LT;
      s.fail$data((0, e._)`${n}.length ${a} ${r}`);
    }
  };
  return on.default = o, on;
}
var an = {}, cn = {}, Ou;
function bo() {
  if (Ou) return cn;
  Ou = 1, Object.defineProperty(cn, "__esModule", { value: !0 });
  const e = Un();
  return e.code = 'require("ajv/dist/runtime/equal").default', cn.default = e, cn;
}
var Tu;
function Hp() {
  if (Tu) return an;
  Tu = 1, Object.defineProperty(an, "__esModule", { value: !0 });
  const e = Ln(), t = ne(), o = ae(), s = bo(), n = {
    keyword: "uniqueItems",
    type: "array",
    schemaType: "boolean",
    $data: !0,
    error: {
      message: ({ params: { i: r, j: a } }) => (0, t.str)`must NOT have duplicate items (items ## ${a} and ${r} are identical)`,
      params: ({ params: { i: r, j: a } }) => (0, t._)`{i: ${r}, j: ${a}}`
    },
    code(r) {
      const { gen: a, data: c, $data: d, schema: f, parentSchema: E, schemaCode: _, it: g } = r;
      if (!d && !f)
        return;
      const w = a.let("valid"), b = E.items ? (0, e.getSchemaTypes)(E.items) : [];
      r.block$data(w, u, (0, t._)`${_} === false`), r.ok(w);
      function u() {
        const v = a.let("i", (0, t._)`${c}.length`), m = a.let("j");
        r.setParams({ i: v, j: m }), a.assign(w, !0), a.if((0, t._)`${v} > 1`, () => (h() ? i : p)(v, m));
      }
      function h() {
        return b.length > 0 && !b.some((v) => v === "object" || v === "array");
      }
      function i(v, m) {
        const y = a.name("item"), $ = (0, e.checkDataTypes)(b, y, g.opts.strictNumbers, e.DataType.Wrong), R = a.const("indices", (0, t._)`{}`);
        a.for((0, t._)`;${v}--;`, () => {
          a.let(y, (0, t._)`${c}[${v}]`), a.if($, (0, t._)`continue`), b.length > 1 && a.if((0, t._)`typeof ${y} == "string"`, (0, t._)`${y} += "_"`), a.if((0, t._)`typeof ${R}[${y}] == "number"`, () => {
            a.assign(m, (0, t._)`${R}[${y}]`), r.error(), a.assign(w, !1).break();
          }).code((0, t._)`${R}[${y}] = ${v}`);
        });
      }
      function p(v, m) {
        const y = (0, o.useFunc)(a, s.default), $ = a.name("outer");
        a.label($).for((0, t._)`;${v}--;`, () => a.for((0, t._)`${m} = ${v}; ${m}--;`, () => a.if((0, t._)`${y}(${c}[${v}], ${c}[${m}])`, () => {
          r.error(), a.assign(w, !1).break($);
        })));
      }
    }
  };
  return an.default = n, an;
}
var un = {}, Cu;
function Bp() {
  if (Cu) return un;
  Cu = 1, Object.defineProperty(un, "__esModule", { value: !0 });
  const e = ne(), t = ae(), o = bo(), l = {
    keyword: "const",
    $data: !0,
    error: {
      message: "must be equal to constant",
      params: ({ schemaCode: n }) => (0, e._)`{allowedValue: ${n}}`
    },
    code(n) {
      const { gen: r, data: a, $data: c, schemaCode: d, schema: f } = n;
      c || f && typeof f == "object" ? n.fail$data((0, e._)`!${(0, t.useFunc)(r, o.default)}(${a}, ${d})`) : n.fail((0, e._)`${f} !== ${a}`);
    }
  };
  return un.default = l, un;
}
var ln = {}, Du;
function xp() {
  if (Du) return ln;
  Du = 1, Object.defineProperty(ln, "__esModule", { value: !0 });
  const e = ne(), t = ae(), o = bo(), l = {
    keyword: "enum",
    schemaType: "array",
    $data: !0,
    error: {
      message: "must be equal to one of the allowed values",
      params: ({ schemaCode: n }) => (0, e._)`{allowedValues: ${n}}`
    },
    code(n) {
      const { gen: r, data: a, $data: c, schema: d, schemaCode: f, it: E } = n;
      if (!c && d.length === 0)
        throw new Error("enum must have non-empty array");
      const _ = d.length >= E.opts.loopEnum;
      let g;
      const w = () => g ?? (g = (0, t.useFunc)(r, o.default));
      let b;
      if (_ || c)
        b = r.let("valid"), n.block$data(b, u);
      else {
        if (!Array.isArray(d))
          throw new Error("ajv implementation error");
        const i = r.const("vSchema", f);
        b = (0, e.or)(...d.map((p, v) => h(i, v)));
      }
      n.pass(b);
      function u() {
        r.assign(b, !1), r.forOf("v", f, (i) => r.if((0, e._)`${w()}(${a}, ${i})`, () => r.assign(b, !0).break()));
      }
      function h(i, p) {
        const v = d[p];
        return typeof v == "object" && v !== null ? (0, e._)`${w()}(${a}, ${i}[${p}])` : (0, e._)`${a} === ${v}`;
      }
    }
  };
  return ln.default = l, ln;
}
var Au;
function Jp() {
  if (Au) return Xr;
  Au = 1, Object.defineProperty(Xr, "__esModule", { value: !0 });
  const e = qp(), t = Fp(), o = Up(), s = Vp(), l = zp(), n = Gp(), r = Kp(), a = Hp(), c = Bp(), d = xp(), f = [
    // number
    e.default,
    t.default,
    // string
    o.default,
    s.default,
    // object
    l.default,
    n.default,
    // array
    r.default,
    a.default,
    // any
    { keyword: "type", schemaType: ["string", "array"] },
    { keyword: "nullable", schemaType: "boolean" },
    c.default,
    d.default
  ];
  return Xr.default = f, Xr;
}
var fn = {}, Et = {}, ju;
function Mf() {
  if (ju) return Et;
  ju = 1, Object.defineProperty(Et, "__esModule", { value: !0 }), Et.validateAdditionalItems = void 0;
  const e = ne(), t = ae(), s = {
    keyword: "additionalItems",
    type: "array",
    schemaType: ["boolean", "object"],
    before: "uniqueItems",
    error: {
      message: ({ params: { len: n } }) => (0, e.str)`must NOT have more than ${n} items`,
      params: ({ params: { len: n } }) => (0, e._)`{limit: ${n}}`
    },
    code(n) {
      const { parentSchema: r, it: a } = n, { items: c } = r;
      if (!Array.isArray(c)) {
        (0, t.checkStrictMode)(a, '"additionalItems" is ignored when "items" is not an array of schemas');
        return;
      }
      l(n, c);
    }
  };
  function l(n, r) {
    const { gen: a, schema: c, data: d, keyword: f, it: E } = n;
    E.items = !0;
    const _ = a.const("len", (0, e._)`${d}.length`);
    if (c === !1)
      n.setParams({ len: r.length }), n.pass((0, e._)`${_} <= ${r.length}`);
    else if (typeof c == "object" && !(0, t.alwaysValidSchema)(E, c)) {
      const w = a.var("valid", (0, e._)`${_} <= ${r.length}`);
      a.if((0, e.not)(w), () => g(w)), n.ok(w);
    }
    function g(w) {
      a.forRange("i", r.length, _, (b) => {
        n.subschema({ keyword: f, dataProp: b, dataPropType: t.Type.Num }, w), E.allErrors || a.if((0, e.not)(w), () => a.break());
      });
    }
  }
  return Et.validateAdditionalItems = l, Et.default = s, Et;
}
var dn = {}, wt = {}, ku;
function Uf() {
  if (ku) return wt;
  ku = 1, Object.defineProperty(wt, "__esModule", { value: !0 }), wt.validateTuple = void 0;
  const e = ne(), t = ae(), o = Fe(), s = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "array", "boolean"],
    before: "uniqueItems",
    code(n) {
      const { schema: r, it: a } = n;
      if (Array.isArray(r))
        return l(n, "additionalItems", r);
      a.items = !0, !(0, t.alwaysValidSchema)(a, r) && n.ok((0, o.validateArray)(n));
    }
  };
  function l(n, r, a = n.schema) {
    const { gen: c, parentSchema: d, data: f, keyword: E, it: _ } = n;
    b(d), _.opts.unevaluated && a.length && _.items !== !0 && (_.items = t.mergeEvaluated.items(c, a.length, _.items));
    const g = c.name("valid"), w = c.const("len", (0, e._)`${f}.length`);
    a.forEach((u, h) => {
      (0, t.alwaysValidSchema)(_, u) || (c.if((0, e._)`${w} > ${h}`, () => n.subschema({
        keyword: E,
        schemaProp: h,
        dataProp: h
      }, g)), n.ok(g));
    });
    function b(u) {
      const { opts: h, errSchemaPath: i } = _, p = a.length, v = p === u.minItems && (p === u.maxItems || u[r] === !1);
      if (h.strictTuples && !v) {
        const m = `"${E}" is ${p}-tuple, but minItems or maxItems/${r} are not specified or different at path "${i}"`;
        (0, t.checkStrictMode)(_, m, h.strictTuples);
      }
    }
  }
  return wt.validateTuple = l, wt.default = s, wt;
}
var Lu;
function Wp() {
  if (Lu) return dn;
  Lu = 1, Object.defineProperty(dn, "__esModule", { value: !0 });
  const e = Uf(), t = {
    keyword: "prefixItems",
    type: "array",
    schemaType: ["array"],
    before: "uniqueItems",
    code: (o) => (0, e.validateTuple)(o, "items")
  };
  return dn.default = t, dn;
}
var hn = {}, qu;
function Zp() {
  if (qu) return hn;
  qu = 1, Object.defineProperty(hn, "__esModule", { value: !0 });
  const e = ne(), t = ae(), o = Fe(), s = Mf(), n = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    error: {
      message: ({ params: { len: r } }) => (0, e.str)`must NOT have more than ${r} items`,
      params: ({ params: { len: r } }) => (0, e._)`{limit: ${r}}`
    },
    code(r) {
      const { schema: a, parentSchema: c, it: d } = r, { prefixItems: f } = c;
      d.items = !0, !(0, t.alwaysValidSchema)(d, a) && (f ? (0, s.validateAdditionalItems)(r, f) : r.ok((0, o.validateArray)(r)));
    }
  };
  return hn.default = n, hn;
}
var mn = {}, Fu;
function Xp() {
  if (Fu) return mn;
  Fu = 1, Object.defineProperty(mn, "__esModule", { value: !0 });
  const e = ne(), t = ae(), s = {
    keyword: "contains",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    trackErrors: !0,
    error: {
      message: ({ params: { min: l, max: n } }) => n === void 0 ? (0, e.str)`must contain at least ${l} valid item(s)` : (0, e.str)`must contain at least ${l} and no more than ${n} valid item(s)`,
      params: ({ params: { min: l, max: n } }) => n === void 0 ? (0, e._)`{minContains: ${l}}` : (0, e._)`{minContains: ${l}, maxContains: ${n}}`
    },
    code(l) {
      const { gen: n, schema: r, parentSchema: a, data: c, it: d } = l;
      let f, E;
      const { minContains: _, maxContains: g } = a;
      d.opts.next ? (f = _ === void 0 ? 1 : _, E = g) : f = 1;
      const w = n.const("len", (0, e._)`${c}.length`);
      if (l.setParams({ min: f, max: E }), E === void 0 && f === 0) {
        (0, t.checkStrictMode)(d, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
        return;
      }
      if (E !== void 0 && f > E) {
        (0, t.checkStrictMode)(d, '"minContains" > "maxContains" is always invalid'), l.fail();
        return;
      }
      if ((0, t.alwaysValidSchema)(d, r)) {
        let p = (0, e._)`${w} >= ${f}`;
        E !== void 0 && (p = (0, e._)`${p} && ${w} <= ${E}`), l.pass(p);
        return;
      }
      d.items = !0;
      const b = n.name("valid");
      E === void 0 && f === 1 ? h(b, () => n.if(b, () => n.break())) : f === 0 ? (n.let(b, !0), E !== void 0 && n.if((0, e._)`${c}.length > 0`, u)) : (n.let(b, !1), u()), l.result(b, () => l.reset());
      function u() {
        const p = n.name("_valid"), v = n.let("count", 0);
        h(p, () => n.if(p, () => i(v)));
      }
      function h(p, v) {
        n.forRange("i", 0, w, (m) => {
          l.subschema({
            keyword: "contains",
            dataProp: m,
            dataPropType: t.Type.Num,
            compositeRule: !0
          }, p), v();
        });
      }
      function i(p) {
        n.code((0, e._)`${p}++`), E === void 0 ? n.if((0, e._)`${p} >= ${f}`, () => n.assign(b, !0).break()) : (n.if((0, e._)`${p} > ${E}`, () => n.assign(b, !1).break()), f === 1 ? n.assign(b, !0) : n.if((0, e._)`${p} >= ${f}`, () => n.assign(b, !0)));
      }
    }
  };
  return mn.default = s, mn;
}
var ri = {}, Mu;
function Yp() {
  return Mu || (Mu = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
    const t = ne(), o = ae(), s = Fe();
    e.error = {
      message: ({ params: { property: c, depsCount: d, deps: f } }) => {
        const E = d === 1 ? "property" : "properties";
        return (0, t.str)`must have ${E} ${f} when property ${c} is present`;
      },
      params: ({ params: { property: c, depsCount: d, deps: f, missingProperty: E } }) => (0, t._)`{property: ${c},
    missingProperty: ${E},
    depsCount: ${d},
    deps: ${f}}`
      // TODO change to reference
    };
    const l = {
      keyword: "dependencies",
      type: "object",
      schemaType: "object",
      error: e.error,
      code(c) {
        const [d, f] = n(c);
        r(c, d), a(c, f);
      }
    };
    function n({ schema: c }) {
      const d = {}, f = {};
      for (const E in c) {
        if (E === "__proto__")
          continue;
        const _ = Array.isArray(c[E]) ? d : f;
        _[E] = c[E];
      }
      return [d, f];
    }
    function r(c, d = c.schema) {
      const { gen: f, data: E, it: _ } = c;
      if (Object.keys(d).length === 0)
        return;
      const g = f.let("missing");
      for (const w in d) {
        const b = d[w];
        if (b.length === 0)
          continue;
        const u = (0, s.propertyInData)(f, E, w, _.opts.ownProperties);
        c.setParams({
          property: w,
          depsCount: b.length,
          deps: b.join(", ")
        }), _.allErrors ? f.if(u, () => {
          for (const h of b)
            (0, s.checkReportMissingProp)(c, h);
        }) : (f.if((0, t._)`${u} && (${(0, s.checkMissingProp)(c, b, g)})`), (0, s.reportMissingProp)(c, g), f.else());
      }
    }
    e.validatePropertyDeps = r;
    function a(c, d = c.schema) {
      const { gen: f, data: E, keyword: _, it: g } = c, w = f.name("valid");
      for (const b in d)
        (0, o.alwaysValidSchema)(g, d[b]) || (f.if(
          (0, s.propertyInData)(f, E, b, g.opts.ownProperties),
          () => {
            const u = c.subschema({ keyword: _, schemaProp: b }, w);
            c.mergeValidEvaluated(u, w);
          },
          () => f.var(w, !0)
          // TODO var
        ), c.ok(w));
    }
    e.validateSchemaDeps = a, e.default = l;
  }(ri)), ri;
}
var pn = {}, Uu;
function Qp() {
  if (Uu) return pn;
  Uu = 1, Object.defineProperty(pn, "__esModule", { value: !0 });
  const e = ne(), t = ae(), s = {
    keyword: "propertyNames",
    type: "object",
    schemaType: ["object", "boolean"],
    error: {
      message: "property name must be valid",
      params: ({ params: l }) => (0, e._)`{propertyName: ${l.propertyName}}`
    },
    code(l) {
      const { gen: n, schema: r, data: a, it: c } = l;
      if ((0, t.alwaysValidSchema)(c, r))
        return;
      const d = n.name("valid");
      n.forIn("key", a, (f) => {
        l.setParams({ propertyName: f }), l.subschema({
          keyword: "propertyNames",
          data: f,
          dataTypes: ["string"],
          propertyName: f,
          compositeRule: !0
        }, d), n.if((0, e.not)(d), () => {
          l.error(!0), c.allErrors || n.break();
        });
      }), l.ok(d);
    }
  };
  return pn.default = s, pn;
}
var yn = {}, Vu;
function Vf() {
  if (Vu) return yn;
  Vu = 1, Object.defineProperty(yn, "__esModule", { value: !0 });
  const e = Fe(), t = ne(), o = nt(), s = ae(), n = {
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
      const { gen: a, schema: c, parentSchema: d, data: f, errsCount: E, it: _ } = r;
      if (!E)
        throw new Error("ajv implementation error");
      const { allErrors: g, opts: w } = _;
      if (_.props = !0, w.removeAdditional !== "all" && (0, s.alwaysValidSchema)(_, c))
        return;
      const b = (0, e.allSchemaProperties)(d.properties), u = (0, e.allSchemaProperties)(d.patternProperties);
      h(), r.ok((0, t._)`${E} === ${o.default.errors}`);
      function h() {
        a.forIn("key", f, (y) => {
          !b.length && !u.length ? v(y) : a.if(i(y), () => v(y));
        });
      }
      function i(y) {
        let $;
        if (b.length > 8) {
          const R = (0, s.schemaRefOrVal)(_, d.properties, "properties");
          $ = (0, e.isOwnProperty)(a, R, y);
        } else b.length ? $ = (0, t.or)(...b.map((R) => (0, t._)`${y} === ${R}`)) : $ = t.nil;
        return u.length && ($ = (0, t.or)($, ...u.map((R) => (0, t._)`${(0, e.usePattern)(r, R)}.test(${y})`))), (0, t.not)($);
      }
      function p(y) {
        a.code((0, t._)`delete ${f}[${y}]`);
      }
      function v(y) {
        if (w.removeAdditional === "all" || w.removeAdditional && c === !1) {
          p(y);
          return;
        }
        if (c === !1) {
          r.setParams({ additionalProperty: y }), r.error(), g || a.break();
          return;
        }
        if (typeof c == "object" && !(0, s.alwaysValidSchema)(_, c)) {
          const $ = a.name("valid");
          w.removeAdditional === "failing" ? (m(y, $, !1), a.if((0, t.not)($), () => {
            r.reset(), p(y);
          })) : (m(y, $), g || a.if((0, t.not)($), () => a.break()));
        }
      }
      function m(y, $, R) {
        const O = {
          keyword: "additionalProperties",
          dataProp: y,
          dataPropType: s.Type.Str
        };
        R === !1 && Object.assign(O, {
          compositeRule: !0,
          createErrors: !1,
          allErrors: !1
        }), r.subschema(O, $);
      }
    }
  };
  return yn.default = n, yn;
}
var vn = {}, zu;
function ey() {
  if (zu) return vn;
  zu = 1, Object.defineProperty(vn, "__esModule", { value: !0 });
  const e = xn(), t = Fe(), o = ae(), s = Vf(), l = {
    keyword: "properties",
    type: "object",
    schemaType: "object",
    code(n) {
      const { gen: r, schema: a, parentSchema: c, data: d, it: f } = n;
      f.opts.removeAdditional === "all" && c.additionalProperties === void 0 && s.default.code(new e.KeywordCxt(f, s.default, "additionalProperties"));
      const E = (0, t.allSchemaProperties)(a);
      for (const u of E)
        f.definedProperties.add(u);
      f.opts.unevaluated && E.length && f.props !== !0 && (f.props = o.mergeEvaluated.props(r, (0, o.toHash)(E), f.props));
      const _ = E.filter((u) => !(0, o.alwaysValidSchema)(f, a[u]));
      if (_.length === 0)
        return;
      const g = r.name("valid");
      for (const u of _)
        w(u) ? b(u) : (r.if((0, t.propertyInData)(r, d, u, f.opts.ownProperties)), b(u), f.allErrors || r.else().var(g, !0), r.endIf()), n.it.definedProperties.add(u), n.ok(g);
      function w(u) {
        return f.opts.useDefaults && !f.compositeRule && a[u].default !== void 0;
      }
      function b(u) {
        n.subschema({
          keyword: "properties",
          schemaProp: u,
          dataProp: u
        }, g);
      }
    }
  };
  return vn.default = l, vn;
}
var $n = {}, Gu;
function ty() {
  if (Gu) return $n;
  Gu = 1, Object.defineProperty($n, "__esModule", { value: !0 });
  const e = Fe(), t = ne(), o = ae(), s = ae(), l = {
    keyword: "patternProperties",
    type: "object",
    schemaType: "object",
    code(n) {
      const { gen: r, schema: a, data: c, parentSchema: d, it: f } = n, { opts: E } = f, _ = (0, e.allSchemaProperties)(a), g = _.filter((v) => (0, o.alwaysValidSchema)(f, a[v]));
      if (_.length === 0 || g.length === _.length && (!f.opts.unevaluated || f.props === !0))
        return;
      const w = E.strictSchema && !E.allowMatchingProperties && d.properties, b = r.name("valid");
      f.props !== !0 && !(f.props instanceof t.Name) && (f.props = (0, s.evaluatedPropsToName)(r, f.props));
      const { props: u } = f;
      h();
      function h() {
        for (const v of _)
          w && i(v), f.allErrors ? p(v) : (r.var(b, !0), p(v), r.if(b));
      }
      function i(v) {
        for (const m in w)
          new RegExp(v).test(m) && (0, o.checkStrictMode)(f, `property ${m} matches pattern ${v} (use allowMatchingProperties)`);
      }
      function p(v) {
        r.forIn("key", c, (m) => {
          r.if((0, t._)`${(0, e.usePattern)(n, v)}.test(${m})`, () => {
            const y = g.includes(v);
            y || n.subschema({
              keyword: "patternProperties",
              schemaProp: v,
              dataProp: m,
              dataPropType: s.Type.Str
            }, b), f.opts.unevaluated && u !== !0 ? r.assign((0, t._)`${u}[${m}]`, !0) : !y && !f.allErrors && r.if((0, t.not)(b), () => r.break());
          });
        });
      }
    }
  };
  return $n.default = l, $n;
}
var gn = {}, Ku;
function ry() {
  if (Ku) return gn;
  Ku = 1, Object.defineProperty(gn, "__esModule", { value: !0 });
  const e = ae(), t = {
    keyword: "not",
    schemaType: ["object", "boolean"],
    trackErrors: !0,
    code(o) {
      const { gen: s, schema: l, it: n } = o;
      if ((0, e.alwaysValidSchema)(n, l)) {
        o.fail();
        return;
      }
      const r = s.name("valid");
      o.subschema({
        keyword: "not",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, r), o.failResult(r, () => o.reset(), () => o.error());
    },
    error: { message: "must NOT be valid" }
  };
  return gn.default = t, gn;
}
var _n = {}, Hu;
function ny() {
  if (Hu) return _n;
  Hu = 1, Object.defineProperty(_n, "__esModule", { value: !0 });
  const t = {
    keyword: "anyOf",
    schemaType: "array",
    trackErrors: !0,
    code: Fe().validateUnion,
    error: { message: "must match a schema in anyOf" }
  };
  return _n.default = t, _n;
}
var En = {}, Bu;
function sy() {
  if (Bu) return En;
  Bu = 1, Object.defineProperty(En, "__esModule", { value: !0 });
  const e = ne(), t = ae(), s = {
    keyword: "oneOf",
    schemaType: "array",
    trackErrors: !0,
    error: {
      message: "must match exactly one schema in oneOf",
      params: ({ params: l }) => (0, e._)`{passingSchemas: ${l.passing}}`
    },
    code(l) {
      const { gen: n, schema: r, parentSchema: a, it: c } = l;
      if (!Array.isArray(r))
        throw new Error("ajv implementation error");
      if (c.opts.discriminator && a.discriminator)
        return;
      const d = r, f = n.let("valid", !1), E = n.let("passing", null), _ = n.name("_valid");
      l.setParams({ passing: E }), n.block(g), l.result(f, () => l.reset(), () => l.error(!0));
      function g() {
        d.forEach((w, b) => {
          let u;
          (0, t.alwaysValidSchema)(c, w) ? n.var(_, !0) : u = l.subschema({
            keyword: "oneOf",
            schemaProp: b,
            compositeRule: !0
          }, _), b > 0 && n.if((0, e._)`${_} && ${f}`).assign(f, !1).assign(E, (0, e._)`[${E}, ${b}]`).else(), n.if(_, () => {
            n.assign(f, !0), n.assign(E, b), u && l.mergeEvaluated(u, e.Name);
          });
        });
      }
    }
  };
  return En.default = s, En;
}
var wn = {}, xu;
function iy() {
  if (xu) return wn;
  xu = 1, Object.defineProperty(wn, "__esModule", { value: !0 });
  const e = ae(), t = {
    keyword: "allOf",
    schemaType: "array",
    code(o) {
      const { gen: s, schema: l, it: n } = o;
      if (!Array.isArray(l))
        throw new Error("ajv implementation error");
      const r = s.name("valid");
      l.forEach((a, c) => {
        if ((0, e.alwaysValidSchema)(n, a))
          return;
        const d = o.subschema({ keyword: "allOf", schemaProp: c }, r);
        o.ok(r), o.mergeEvaluated(d);
      });
    }
  };
  return wn.default = t, wn;
}
var Sn = {}, Ju;
function oy() {
  if (Ju) return Sn;
  Ju = 1, Object.defineProperty(Sn, "__esModule", { value: !0 });
  const e = ne(), t = ae(), s = {
    keyword: "if",
    schemaType: ["object", "boolean"],
    trackErrors: !0,
    error: {
      message: ({ params: n }) => (0, e.str)`must match "${n.ifClause}" schema`,
      params: ({ params: n }) => (0, e._)`{failingKeyword: ${n.ifClause}}`
    },
    code(n) {
      const { gen: r, parentSchema: a, it: c } = n;
      a.then === void 0 && a.else === void 0 && (0, t.checkStrictMode)(c, '"if" without "then" and "else" is ignored');
      const d = l(c, "then"), f = l(c, "else");
      if (!d && !f)
        return;
      const E = r.let("valid", !0), _ = r.name("_valid");
      if (g(), n.reset(), d && f) {
        const b = r.let("ifClause");
        n.setParams({ ifClause: b }), r.if(_, w("then", b), w("else", b));
      } else d ? r.if(_, w("then")) : r.if((0, e.not)(_), w("else"));
      n.pass(E, () => n.error(!0));
      function g() {
        const b = n.subschema({
          keyword: "if",
          compositeRule: !0,
          createErrors: !1,
          allErrors: !1
        }, _);
        n.mergeEvaluated(b);
      }
      function w(b, u) {
        return () => {
          const h = n.subschema({ keyword: b }, _);
          r.assign(E, _), n.mergeValidEvaluated(h, E), u ? r.assign(u, (0, e._)`${b}`) : n.setParams({ ifClause: b });
        };
      }
    }
  };
  function l(n, r) {
    const a = n.schema[r];
    return a !== void 0 && !(0, t.alwaysValidSchema)(n, a);
  }
  return Sn.default = s, Sn;
}
var bn = {}, Wu;
function ay() {
  if (Wu) return bn;
  Wu = 1, Object.defineProperty(bn, "__esModule", { value: !0 });
  const e = ae(), t = {
    keyword: ["then", "else"],
    schemaType: ["object", "boolean"],
    code({ keyword: o, parentSchema: s, it: l }) {
      s.if === void 0 && (0, e.checkStrictMode)(l, `"${o}" without "if" is ignored`);
    }
  };
  return bn.default = t, bn;
}
var Zu;
function cy() {
  if (Zu) return fn;
  Zu = 1, Object.defineProperty(fn, "__esModule", { value: !0 });
  const e = Mf(), t = Wp(), o = Uf(), s = Zp(), l = Xp(), n = Yp(), r = Qp(), a = Vf(), c = ey(), d = ty(), f = ry(), E = ny(), _ = sy(), g = iy(), w = oy(), b = ay();
  function u(h = !1) {
    const i = [
      // any
      f.default,
      E.default,
      _.default,
      g.default,
      w.default,
      b.default,
      // object
      r.default,
      a.default,
      n.default,
      c.default,
      d.default
    ];
    return h ? i.push(t.default, s.default) : i.push(e.default, o.default), i.push(l.default), i;
  }
  return fn.default = u, fn;
}
var Rn = {}, Nn = {}, Xu;
function uy() {
  if (Xu) return Nn;
  Xu = 1, Object.defineProperty(Nn, "__esModule", { value: !0 });
  const e = ne(), o = {
    keyword: "format",
    type: ["number", "string"],
    schemaType: "string",
    $data: !0,
    error: {
      message: ({ schemaCode: s }) => (0, e.str)`must match format "${s}"`,
      params: ({ schemaCode: s }) => (0, e._)`{format: ${s}}`
    },
    code(s, l) {
      const { gen: n, data: r, $data: a, schema: c, schemaCode: d, it: f } = s, { opts: E, errSchemaPath: _, schemaEnv: g, self: w } = f;
      if (!E.validateFormats)
        return;
      a ? b() : u();
      function b() {
        const h = n.scopeValue("formats", {
          ref: w.formats,
          code: E.code.formats
        }), i = n.const("fDef", (0, e._)`${h}[${d}]`), p = n.let("fType"), v = n.let("format");
        n.if((0, e._)`typeof ${i} == "object" && !(${i} instanceof RegExp)`, () => n.assign(p, (0, e._)`${i}.type || "string"`).assign(v, (0, e._)`${i}.validate`), () => n.assign(p, (0, e._)`"string"`).assign(v, i)), s.fail$data((0, e.or)(m(), y()));
        function m() {
          return E.strictSchema === !1 ? e.nil : (0, e._)`${d} && !${v}`;
        }
        function y() {
          const $ = g.$async ? (0, e._)`(${i}.async ? await ${v}(${r}) : ${v}(${r}))` : (0, e._)`${v}(${r})`, R = (0, e._)`(typeof ${v} == "function" ? ${$} : ${v}.test(${r}))`;
          return (0, e._)`${v} && ${v} !== true && ${p} === ${l} && !${R}`;
        }
      }
      function u() {
        const h = w.formats[c];
        if (!h) {
          m();
          return;
        }
        if (h === !0)
          return;
        const [i, p, v] = y(h);
        i === l && s.pass($());
        function m() {
          if (E.strictSchema === !1) {
            w.logger.warn(R());
            return;
          }
          throw new Error(R());
          function R() {
            return `unknown format "${c}" ignored in schema at path "${_}"`;
          }
        }
        function y(R) {
          const O = R instanceof RegExp ? (0, e.regexpCode)(R) : E.code.formats ? (0, e._)`${E.code.formats}${(0, e.getProperty)(c)}` : void 0, j = n.scopeValue("formats", { key: c, ref: R, code: O });
          return typeof R == "object" && !(R instanceof RegExp) ? [R.type || "string", R.validate, (0, e._)`${j}.validate`] : ["string", R, j];
        }
        function $() {
          if (typeof h == "object" && !(h instanceof RegExp) && h.async) {
            if (!g.$async)
              throw new Error("async format in sync schema");
            return (0, e._)`await ${v}(${r})`;
          }
          return typeof p == "function" ? (0, e._)`${v}(${r})` : (0, e._)`${v}.test(${r})`;
        }
      }
    }
  };
  return Nn.default = o, Nn;
}
var Yu;
function ly() {
  if (Yu) return Rn;
  Yu = 1, Object.defineProperty(Rn, "__esModule", { value: !0 });
  const t = [uy().default];
  return Rn.default = t, Rn;
}
var ht = {}, Qu;
function fy() {
  return Qu || (Qu = 1, Object.defineProperty(ht, "__esModule", { value: !0 }), ht.contentVocabulary = ht.metadataVocabulary = void 0, ht.metadataVocabulary = [
    "title",
    "description",
    "default",
    "deprecated",
    "readOnly",
    "writeOnly",
    "examples"
  ], ht.contentVocabulary = [
    "contentMediaType",
    "contentEncoding",
    "contentSchema"
  ]), ht;
}
var el;
function dy() {
  if (el) return Jr;
  el = 1, Object.defineProperty(Jr, "__esModule", { value: !0 });
  const e = Lp(), t = Jp(), o = cy(), s = ly(), l = fy(), n = [
    e.default,
    t.default,
    (0, o.default)(),
    s.default,
    l.metadataVocabulary,
    l.contentVocabulary
  ];
  return Jr.default = n, Jr;
}
var Pn = {}, jt = {}, tl;
function hy() {
  if (tl) return jt;
  tl = 1, Object.defineProperty(jt, "__esModule", { value: !0 }), jt.DiscrError = void 0;
  var e;
  return function(t) {
    t.Tag = "tag", t.Mapping = "mapping";
  }(e || (jt.DiscrError = e = {})), jt;
}
var rl;
function my() {
  if (rl) return Pn;
  rl = 1, Object.defineProperty(Pn, "__esModule", { value: !0 });
  const e = ne(), t = hy(), o = So(), s = Jn(), l = ae(), r = {
    keyword: "discriminator",
    type: "object",
    schemaType: "object",
    error: {
      message: ({ params: { discrError: a, tagName: c } }) => a === t.DiscrError.Tag ? `tag "${c}" must be string` : `value of tag "${c}" must be in oneOf`,
      params: ({ params: { discrError: a, tag: c, tagName: d } }) => (0, e._)`{error: ${a}, tag: ${d}, tagValue: ${c}}`
    },
    code(a) {
      const { gen: c, data: d, schema: f, parentSchema: E, it: _ } = a, { oneOf: g } = E;
      if (!_.opts.discriminator)
        throw new Error("discriminator: requires discriminator option");
      const w = f.propertyName;
      if (typeof w != "string")
        throw new Error("discriminator: requires propertyName");
      if (f.mapping)
        throw new Error("discriminator: mapping is not supported");
      if (!g)
        throw new Error("discriminator: requires oneOf keyword");
      const b = c.let("valid", !1), u = c.const("tag", (0, e._)`${d}${(0, e.getProperty)(w)}`);
      c.if((0, e._)`typeof ${u} == "string"`, () => h(), () => a.error(!1, { discrError: t.DiscrError.Tag, tag: u, tagName: w })), a.ok(b);
      function h() {
        const v = p();
        c.if(!1);
        for (const m in v)
          c.elseIf((0, e._)`${u} === ${m}`), c.assign(b, i(v[m]));
        c.else(), a.error(!1, { discrError: t.DiscrError.Mapping, tag: u, tagName: w }), c.endIf();
      }
      function i(v) {
        const m = c.name("valid"), y = a.subschema({ keyword: "oneOf", schemaProp: v }, m);
        return a.mergeEvaluated(y, e.Name), m;
      }
      function p() {
        var v;
        const m = {}, y = R(E);
        let $ = !0;
        for (let L = 0; L < g.length; L++) {
          let V = g[L];
          if (V?.$ref && !(0, l.schemaHasRulesButRef)(V, _.self.RULES)) {
            const M = V.$ref;
            if (V = o.resolveRef.call(_.self, _.schemaEnv.root, _.baseId, M), V instanceof o.SchemaEnv && (V = V.schema), V === void 0)
              throw new s.default(_.opts.uriResolver, _.baseId, M);
          }
          const F = (v = V?.properties) === null || v === void 0 ? void 0 : v[w];
          if (typeof F != "object")
            throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${w}"`);
          $ = $ && (y || R(V)), O(F, L);
        }
        if (!$)
          throw new Error(`discriminator: "${w}" must be required`);
        return m;
        function R({ required: L }) {
          return Array.isArray(L) && L.includes(w);
        }
        function O(L, V) {
          if (L.const)
            j(L.const, V);
          else if (L.enum)
            for (const F of L.enum)
              j(F, V);
          else
            throw new Error(`discriminator: "properties/${w}" must have "const" or "enum"`);
        }
        function j(L, V) {
          if (typeof L != "string" || L in m)
            throw new Error(`discriminator: "${w}" values must be unique strings`);
          m[L] = V;
        }
      }
    }
  };
  return Pn.default = r, Pn;
}
const py = "http://json-schema.org/draft-07/schema#", yy = "http://json-schema.org/draft-07/schema#", vy = "Core schema meta-schema", $y = { schemaArray: { type: "array", minItems: 1, items: { $ref: "#" } }, nonNegativeInteger: { type: "integer", minimum: 0 }, nonNegativeIntegerDefault0: { allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }] }, simpleTypes: { enum: ["array", "boolean", "integer", "null", "number", "object", "string"] }, stringArray: { type: "array", items: { type: "string" }, uniqueItems: !0, default: [] } }, gy = ["object", "boolean"], _y = { $id: { type: "string", format: "uri-reference" }, $schema: { type: "string", format: "uri" }, $ref: { type: "string", format: "uri-reference" }, $comment: { type: "string" }, title: { type: "string" }, description: { type: "string" }, default: !0, readOnly: { type: "boolean", default: !1 }, examples: { type: "array", items: !0 }, multipleOf: { type: "number", exclusiveMinimum: 0 }, maximum: { type: "number" }, exclusiveMaximum: { type: "number" }, minimum: { type: "number" }, exclusiveMinimum: { type: "number" }, maxLength: { $ref: "#/definitions/nonNegativeInteger" }, minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, pattern: { type: "string", format: "regex" }, additionalItems: { $ref: "#" }, items: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }], default: !0 }, maxItems: { $ref: "#/definitions/nonNegativeInteger" }, minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, uniqueItems: { type: "boolean", default: !1 }, contains: { $ref: "#" }, maxProperties: { $ref: "#/definitions/nonNegativeInteger" }, minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, required: { $ref: "#/definitions/stringArray" }, additionalProperties: { $ref: "#" }, definitions: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, properties: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, patternProperties: { type: "object", additionalProperties: { $ref: "#" }, propertyNames: { format: "regex" }, default: {} }, dependencies: { type: "object", additionalProperties: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }] } }, propertyNames: { $ref: "#" }, const: !0, enum: { type: "array", items: !0, minItems: 1, uniqueItems: !0 }, type: { anyOf: [{ $ref: "#/definitions/simpleTypes" }, { type: "array", items: { $ref: "#/definitions/simpleTypes" }, minItems: 1, uniqueItems: !0 }] }, format: { type: "string" }, contentMediaType: { type: "string" }, contentEncoding: { type: "string" }, if: { $ref: "#" }, then: { $ref: "#" }, else: { $ref: "#" }, allOf: { $ref: "#/definitions/schemaArray" }, anyOf: { $ref: "#/definitions/schemaArray" }, oneOf: { $ref: "#/definitions/schemaArray" }, not: { $ref: "#" } }, Ey = {
  $schema: py,
  $id: yy,
  title: vy,
  definitions: $y,
  type: gy,
  properties: _y,
  default: !0
};
var nl;
function wy() {
  return nl || (nl = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
    const o = Ap(), s = dy(), l = my(), n = Ey, r = ["/properties"], a = "http://json-schema.org/draft-07/schema";
    class c extends o.default {
      _addVocabularies() {
        super._addVocabularies(), s.default.forEach((w) => this.addVocabulary(w)), this.opts.discriminator && this.addKeyword(l.default);
      }
      _addDefaultMetaSchema() {
        if (super._addDefaultMetaSchema(), !this.opts.meta)
          return;
        const w = this.opts.$data ? this.$dataMetaSchema(n, r) : n;
        this.addMetaSchema(w, a, !1), this.refs["http://json-schema.org/schema"] = a;
      }
      defaultMeta() {
        return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(a) ? a : void 0);
      }
    }
    t.Ajv = c, e.exports = t = c, e.exports.Ajv = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
    var d = xn();
    Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
      return d.KeywordCxt;
    } });
    var f = ne();
    Object.defineProperty(t, "_", { enumerable: !0, get: function() {
      return f._;
    } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
      return f.str;
    } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
      return f.stringify;
    } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
      return f.nil;
    } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
      return f.Name;
    } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
      return f.CodeGen;
    } });
    var E = wo();
    Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
      return E.default;
    } });
    var _ = Jn();
    Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
      return _.default;
    } });
  }(Gr, Gr.exports)), Gr.exports;
}
var sl;
function Sy() {
  return sl || (sl = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
    const t = wy(), o = ne(), s = o.operators, l = {
      formatMaximum: { okStr: "<=", ok: s.LTE, fail: s.GT },
      formatMinimum: { okStr: ">=", ok: s.GTE, fail: s.LT },
      formatExclusiveMaximum: { okStr: "<", ok: s.LT, fail: s.GTE },
      formatExclusiveMinimum: { okStr: ">", ok: s.GT, fail: s.LTE }
    }, n = {
      message: ({ keyword: a, schemaCode: c }) => (0, o.str)`should be ${l[a].okStr} ${c}`,
      params: ({ keyword: a, schemaCode: c }) => (0, o._)`{comparison: ${l[a].okStr}, limit: ${c}}`
    };
    e.formatLimitDefinition = {
      keyword: Object.keys(l),
      type: "string",
      schemaType: "string",
      $data: !0,
      error: n,
      code(a) {
        const { gen: c, data: d, schemaCode: f, keyword: E, it: _ } = a, { opts: g, self: w } = _;
        if (!g.validateFormats)
          return;
        const b = new t.KeywordCxt(_, w.RULES.all.format.definition, "format");
        b.$data ? u() : h();
        function u() {
          const p = c.scopeValue("formats", {
            ref: w.formats,
            code: g.code.formats
          }), v = c.const("fmt", (0, o._)`${p}[${b.schemaCode}]`);
          a.fail$data((0, o.or)((0, o._)`typeof ${v} != "object"`, (0, o._)`${v} instanceof RegExp`, (0, o._)`typeof ${v}.compare != "function"`, i(v)));
        }
        function h() {
          const p = b.schema, v = w.formats[p];
          if (!v || v === !0)
            return;
          if (typeof v != "object" || v instanceof RegExp || typeof v.compare != "function")
            throw new Error(`"${E}": format "${p}" does not define "compare" function`);
          const m = c.scopeValue("formats", {
            key: p,
            ref: v,
            code: g.code.formats ? (0, o._)`${g.code.formats}${(0, o.getProperty)(p)}` : void 0
          });
          a.fail$data(i(m));
        }
        function i(p) {
          return (0, o._)`${p}.compare(${d}, ${f}) ${l[E].fail} 0`;
        }
      },
      dependencies: ["format"]
    };
    const r = (a) => (a.addKeyword(e.formatLimitDefinition), a);
    e.default = r;
  }(Ws)), Ws;
}
var il;
function by() {
  return il || (il = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 });
    const o = gp(), s = Sy(), l = ne(), n = new l.Name("fullFormats"), r = new l.Name("fastFormats"), a = (d, f = { keywords: !0 }) => {
      if (Array.isArray(f))
        return c(d, f, o.fullFormats, n), d;
      const [E, _] = f.mode === "fast" ? [o.fastFormats, r] : [o.fullFormats, n], g = f.formats || o.formatNames;
      return c(d, g, E, _), f.keywords && (0, s.default)(d), d;
    };
    a.get = (d, f = "full") => {
      const _ = (f === "fast" ? o.fastFormats : o.fullFormats)[d];
      if (!_)
        throw new Error(`Unknown format "${d}"`);
      return _;
    };
    function c(d, f, E, _) {
      var g, w;
      (g = (w = d.opts.code).formats) !== null && g !== void 0 || (w.formats = (0, l._)`require("ajv-formats/dist/formats").${_}`);
      for (const b of f)
        d.addFormat(b, E[b]);
    }
    e.exports = t = a, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = a;
  }(zr, zr.exports)), zr.exports;
}
var Ry = by();
const Ny = /* @__PURE__ */ ho(Ry), Py = (e, t, o, s) => {
  if (o === "length" || o === "prototype" || o === "arguments" || o === "caller")
    return;
  const l = Object.getOwnPropertyDescriptor(e, o), n = Object.getOwnPropertyDescriptor(t, o);
  !Iy(l, n) && s || Object.defineProperty(e, o, n);
}, Iy = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, Oy = (e, t) => {
  const o = Object.getPrototypeOf(t);
  o !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, o);
}, Ty = (e, t) => `/* Wrapped ${e}*/
${t}`, Cy = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), Dy = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), Ay = (e, t, o) => {
  const s = o === "" ? "" : `with ${o.trim()}() `, l = Ty.bind(null, s, t.toString());
  Object.defineProperty(l, "name", Dy);
  const { writable: n, enumerable: r, configurable: a } = Cy;
  Object.defineProperty(e, "toString", { value: l, writable: n, enumerable: r, configurable: a });
};
function jy(e, t, { ignoreNonConfigurable: o = !1 } = {}) {
  const { name: s } = e;
  for (const l of Reflect.ownKeys(t))
    Py(e, t, l, o);
  return Oy(e, t), Ay(e, t, s), e;
}
const ol = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError(`Expected the first argument to be a function, got \`${typeof e}\``);
  const {
    wait: o = 0,
    maxWait: s = Number.POSITIVE_INFINITY,
    before: l = !1,
    after: n = !0
  } = t;
  if (o < 0 || s < 0)
    throw new RangeError("`wait` and `maxWait` must not be negative.");
  if (!l && !n)
    throw new Error("Both `before` and `after` are false, function wouldn't be called.");
  let r, a, c;
  const d = function(...f) {
    const E = this, _ = () => {
      r = void 0, a && (clearTimeout(a), a = void 0), n && (c = e.apply(E, f));
    }, g = () => {
      a = void 0, r && (clearTimeout(r), r = void 0), n && (c = e.apply(E, f));
    }, w = l && !r;
    return clearTimeout(r), r = setTimeout(_, o), s > 0 && s !== Number.POSITIVE_INFINITY && !a && (a = setTimeout(g, s)), w && (c = e.apply(E, f)), c;
  };
  return jy(d, e), d.cancel = () => {
    r && (clearTimeout(r), r = void 0), a && (clearTimeout(a), a = void 0);
  }, d;
};
var In = { exports: {} }, ni, al;
function Wn() {
  if (al) return ni;
  al = 1;
  const e = "2.0.0", t = 256, o = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991, s = 16, l = t - 6;
  return ni = {
    MAX_LENGTH: t,
    MAX_SAFE_COMPONENT_LENGTH: s,
    MAX_SAFE_BUILD_LENGTH: l,
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
  }, ni;
}
var si, cl;
function Zn() {
  return cl || (cl = 1, si = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...t) => console.error("SEMVER", ...t) : () => {
  }), si;
}
var ul;
function Ft() {
  return ul || (ul = 1, function(e, t) {
    const {
      MAX_SAFE_COMPONENT_LENGTH: o,
      MAX_SAFE_BUILD_LENGTH: s,
      MAX_LENGTH: l
    } = Wn(), n = Zn();
    t = e.exports = {};
    const r = t.re = [], a = t.safeRe = [], c = t.src = [], d = t.safeSrc = [], f = t.t = {};
    let E = 0;
    const _ = "[a-zA-Z0-9-]", g = [
      ["\\s", 1],
      ["\\d", l],
      [_, s]
    ], w = (u) => {
      for (const [h, i] of g)
        u = u.split(`${h}*`).join(`${h}{0,${i}}`).split(`${h}+`).join(`${h}{1,${i}}`);
      return u;
    }, b = (u, h, i) => {
      const p = w(h), v = E++;
      n(u, v, h), f[u] = v, c[v] = h, d[v] = p, r[v] = new RegExp(h, i ? "g" : void 0), a[v] = new RegExp(p, i ? "g" : void 0);
    };
    b("NUMERICIDENTIFIER", "0|[1-9]\\d*"), b("NUMERICIDENTIFIERLOOSE", "\\d+"), b("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${_}*`), b("MAINVERSION", `(${c[f.NUMERICIDENTIFIER]})\\.(${c[f.NUMERICIDENTIFIER]})\\.(${c[f.NUMERICIDENTIFIER]})`), b("MAINVERSIONLOOSE", `(${c[f.NUMERICIDENTIFIERLOOSE]})\\.(${c[f.NUMERICIDENTIFIERLOOSE]})\\.(${c[f.NUMERICIDENTIFIERLOOSE]})`), b("PRERELEASEIDENTIFIER", `(?:${c[f.NONNUMERICIDENTIFIER]}|${c[f.NUMERICIDENTIFIER]})`), b("PRERELEASEIDENTIFIERLOOSE", `(?:${c[f.NONNUMERICIDENTIFIER]}|${c[f.NUMERICIDENTIFIERLOOSE]})`), b("PRERELEASE", `(?:-(${c[f.PRERELEASEIDENTIFIER]}(?:\\.${c[f.PRERELEASEIDENTIFIER]})*))`), b("PRERELEASELOOSE", `(?:-?(${c[f.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[f.PRERELEASEIDENTIFIERLOOSE]})*))`), b("BUILDIDENTIFIER", `${_}+`), b("BUILD", `(?:\\+(${c[f.BUILDIDENTIFIER]}(?:\\.${c[f.BUILDIDENTIFIER]})*))`), b("FULLPLAIN", `v?${c[f.MAINVERSION]}${c[f.PRERELEASE]}?${c[f.BUILD]}?`), b("FULL", `^${c[f.FULLPLAIN]}$`), b("LOOSEPLAIN", `[v=\\s]*${c[f.MAINVERSIONLOOSE]}${c[f.PRERELEASELOOSE]}?${c[f.BUILD]}?`), b("LOOSE", `^${c[f.LOOSEPLAIN]}$`), b("GTLT", "((?:<|>)?=?)"), b("XRANGEIDENTIFIERLOOSE", `${c[f.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), b("XRANGEIDENTIFIER", `${c[f.NUMERICIDENTIFIER]}|x|X|\\*`), b("XRANGEPLAIN", `[v=\\s]*(${c[f.XRANGEIDENTIFIER]})(?:\\.(${c[f.XRANGEIDENTIFIER]})(?:\\.(${c[f.XRANGEIDENTIFIER]})(?:${c[f.PRERELEASE]})?${c[f.BUILD]}?)?)?`), b("XRANGEPLAINLOOSE", `[v=\\s]*(${c[f.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[f.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[f.XRANGEIDENTIFIERLOOSE]})(?:${c[f.PRERELEASELOOSE]})?${c[f.BUILD]}?)?)?`), b("XRANGE", `^${c[f.GTLT]}\\s*${c[f.XRANGEPLAIN]}$`), b("XRANGELOOSE", `^${c[f.GTLT]}\\s*${c[f.XRANGEPLAINLOOSE]}$`), b("COERCEPLAIN", `(^|[^\\d])(\\d{1,${o}})(?:\\.(\\d{1,${o}}))?(?:\\.(\\d{1,${o}}))?`), b("COERCE", `${c[f.COERCEPLAIN]}(?:$|[^\\d])`), b("COERCEFULL", c[f.COERCEPLAIN] + `(?:${c[f.PRERELEASE]})?(?:${c[f.BUILD]})?(?:$|[^\\d])`), b("COERCERTL", c[f.COERCE], !0), b("COERCERTLFULL", c[f.COERCEFULL], !0), b("LONETILDE", "(?:~>?)"), b("TILDETRIM", `(\\s*)${c[f.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", b("TILDE", `^${c[f.LONETILDE]}${c[f.XRANGEPLAIN]}$`), b("TILDELOOSE", `^${c[f.LONETILDE]}${c[f.XRANGEPLAINLOOSE]}$`), b("LONECARET", "(?:\\^)"), b("CARETTRIM", `(\\s*)${c[f.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", b("CARET", `^${c[f.LONECARET]}${c[f.XRANGEPLAIN]}$`), b("CARETLOOSE", `^${c[f.LONECARET]}${c[f.XRANGEPLAINLOOSE]}$`), b("COMPARATORLOOSE", `^${c[f.GTLT]}\\s*(${c[f.LOOSEPLAIN]})$|^$`), b("COMPARATOR", `^${c[f.GTLT]}\\s*(${c[f.FULLPLAIN]})$|^$`), b("COMPARATORTRIM", `(\\s*)${c[f.GTLT]}\\s*(${c[f.LOOSEPLAIN]}|${c[f.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", b("HYPHENRANGE", `^\\s*(${c[f.XRANGEPLAIN]})\\s+-\\s+(${c[f.XRANGEPLAIN]})\\s*$`), b("HYPHENRANGELOOSE", `^\\s*(${c[f.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[f.XRANGEPLAINLOOSE]})\\s*$`), b("STAR", "(<|>)?=?\\s*\\*"), b("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), b("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }(In, In.exports)), In.exports;
}
var ii, ll;
function Ro() {
  if (ll) return ii;
  ll = 1;
  const e = Object.freeze({ loose: !0 }), t = Object.freeze({});
  return ii = (s) => s ? typeof s != "object" ? e : s : t, ii;
}
var oi, fl;
function zf() {
  if (fl) return oi;
  fl = 1;
  const e = /^[0-9]+$/, t = (s, l) => {
    if (typeof s == "number" && typeof l == "number")
      return s === l ? 0 : s < l ? -1 : 1;
    const n = e.test(s), r = e.test(l);
    return n && r && (s = +s, l = +l), s === l ? 0 : n && !r ? -1 : r && !n ? 1 : s < l ? -1 : 1;
  };
  return oi = {
    compareIdentifiers: t,
    rcompareIdentifiers: (s, l) => t(l, s)
  }, oi;
}
var ai, dl;
function Ne() {
  if (dl) return ai;
  dl = 1;
  const e = Zn(), { MAX_LENGTH: t, MAX_SAFE_INTEGER: o } = Wn(), { safeRe: s, t: l } = Ft(), n = Ro(), { compareIdentifiers: r } = zf();
  class a {
    constructor(d, f) {
      if (f = n(f), d instanceof a) {
        if (d.loose === !!f.loose && d.includePrerelease === !!f.includePrerelease)
          return d;
        d = d.version;
      } else if (typeof d != "string")
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof d}".`);
      if (d.length > t)
        throw new TypeError(
          `version is longer than ${t} characters`
        );
      e("SemVer", d, f), this.options = f, this.loose = !!f.loose, this.includePrerelease = !!f.includePrerelease;
      const E = d.trim().match(f.loose ? s[l.LOOSE] : s[l.FULL]);
      if (!E)
        throw new TypeError(`Invalid Version: ${d}`);
      if (this.raw = d, this.major = +E[1], this.minor = +E[2], this.patch = +E[3], this.major > o || this.major < 0)
        throw new TypeError("Invalid major version");
      if (this.minor > o || this.minor < 0)
        throw new TypeError("Invalid minor version");
      if (this.patch > o || this.patch < 0)
        throw new TypeError("Invalid patch version");
      E[4] ? this.prerelease = E[4].split(".").map((_) => {
        if (/^[0-9]+$/.test(_)) {
          const g = +_;
          if (g >= 0 && g < o)
            return g;
        }
        return _;
      }) : this.prerelease = [], this.build = E[5] ? E[5].split(".") : [], this.format();
    }
    format() {
      return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
    }
    toString() {
      return this.version;
    }
    compare(d) {
      if (e("SemVer.compare", this.version, this.options, d), !(d instanceof a)) {
        if (typeof d == "string" && d === this.version)
          return 0;
        d = new a(d, this.options);
      }
      return d.version === this.version ? 0 : this.compareMain(d) || this.comparePre(d);
    }
    compareMain(d) {
      return d instanceof a || (d = new a(d, this.options)), this.major < d.major ? -1 : this.major > d.major ? 1 : this.minor < d.minor ? -1 : this.minor > d.minor ? 1 : this.patch < d.patch ? -1 : this.patch > d.patch ? 1 : 0;
    }
    comparePre(d) {
      if (d instanceof a || (d = new a(d, this.options)), this.prerelease.length && !d.prerelease.length)
        return -1;
      if (!this.prerelease.length && d.prerelease.length)
        return 1;
      if (!this.prerelease.length && !d.prerelease.length)
        return 0;
      let f = 0;
      do {
        const E = this.prerelease[f], _ = d.prerelease[f];
        if (e("prerelease compare", f, E, _), E === void 0 && _ === void 0)
          return 0;
        if (_ === void 0)
          return 1;
        if (E === void 0)
          return -1;
        if (E === _)
          continue;
        return r(E, _);
      } while (++f);
    }
    compareBuild(d) {
      d instanceof a || (d = new a(d, this.options));
      let f = 0;
      do {
        const E = this.build[f], _ = d.build[f];
        if (e("build compare", f, E, _), E === void 0 && _ === void 0)
          return 0;
        if (_ === void 0)
          return 1;
        if (E === void 0)
          return -1;
        if (E === _)
          continue;
        return r(E, _);
      } while (++f);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(d, f, E) {
      if (d.startsWith("pre")) {
        if (!f && E === !1)
          throw new Error("invalid increment argument: identifier is empty");
        if (f) {
          const _ = `-${f}`.match(this.options.loose ? s[l.PRERELEASELOOSE] : s[l.PRERELEASE]);
          if (!_ || _[1] !== f)
            throw new Error(`invalid identifier: ${f}`);
        }
      }
      switch (d) {
        case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", f, E);
          break;
        case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", f, E);
          break;
        case "prepatch":
          this.prerelease.length = 0, this.inc("patch", f, E), this.inc("pre", f, E);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          this.prerelease.length === 0 && this.inc("patch", f, E), this.inc("pre", f, E);
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
          const _ = Number(E) ? 1 : 0;
          if (this.prerelease.length === 0)
            this.prerelease = [_];
          else {
            let g = this.prerelease.length;
            for (; --g >= 0; )
              typeof this.prerelease[g] == "number" && (this.prerelease[g]++, g = -2);
            if (g === -1) {
              if (f === this.prerelease.join(".") && E === !1)
                throw new Error("invalid increment argument: identifier already exists");
              this.prerelease.push(_);
            }
          }
          if (f) {
            let g = [f, _];
            E === !1 && (g = [f]), r(this.prerelease[0], f) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = g) : this.prerelease = g;
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${d}`);
      }
      return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
    }
  }
  return ai = a, ai;
}
var ci, hl;
function Pt() {
  if (hl) return ci;
  hl = 1;
  const e = Ne();
  return ci = (o, s, l = !1) => {
    if (o instanceof e)
      return o;
    try {
      return new e(o, s);
    } catch (n) {
      if (!l)
        return null;
      throw n;
    }
  }, ci;
}
var ui, ml;
function ky() {
  if (ml) return ui;
  ml = 1;
  const e = Pt();
  return ui = (o, s) => {
    const l = e(o, s);
    return l ? l.version : null;
  }, ui;
}
var li, pl;
function Ly() {
  if (pl) return li;
  pl = 1;
  const e = Pt();
  return li = (o, s) => {
    const l = e(o.trim().replace(/^[=v]+/, ""), s);
    return l ? l.version : null;
  }, li;
}
var fi, yl;
function qy() {
  if (yl) return fi;
  yl = 1;
  const e = Ne();
  return fi = (o, s, l, n, r) => {
    typeof l == "string" && (r = n, n = l, l = void 0);
    try {
      return new e(
        o instanceof e ? o.version : o,
        l
      ).inc(s, n, r).version;
    } catch {
      return null;
    }
  }, fi;
}
var di, vl;
function Fy() {
  if (vl) return di;
  vl = 1;
  const e = Pt();
  return di = (o, s) => {
    const l = e(o, null, !0), n = e(s, null, !0), r = l.compare(n);
    if (r === 0)
      return null;
    const a = r > 0, c = a ? l : n, d = a ? n : l, f = !!c.prerelease.length;
    if (!!d.prerelease.length && !f) {
      if (!d.patch && !d.minor)
        return "major";
      if (d.compareMain(c) === 0)
        return d.minor && !d.patch ? "minor" : "patch";
    }
    const _ = f ? "pre" : "";
    return l.major !== n.major ? _ + "major" : l.minor !== n.minor ? _ + "minor" : l.patch !== n.patch ? _ + "patch" : "prerelease";
  }, di;
}
var hi, $l;
function My() {
  if ($l) return hi;
  $l = 1;
  const e = Ne();
  return hi = (o, s) => new e(o, s).major, hi;
}
var mi, gl;
function Uy() {
  if (gl) return mi;
  gl = 1;
  const e = Ne();
  return mi = (o, s) => new e(o, s).minor, mi;
}
var pi, _l;
function Vy() {
  if (_l) return pi;
  _l = 1;
  const e = Ne();
  return pi = (o, s) => new e(o, s).patch, pi;
}
var yi, El;
function zy() {
  if (El) return yi;
  El = 1;
  const e = Pt();
  return yi = (o, s) => {
    const l = e(o, s);
    return l && l.prerelease.length ? l.prerelease : null;
  }, yi;
}
var vi, wl;
function Me() {
  if (wl) return vi;
  wl = 1;
  const e = Ne();
  return vi = (o, s, l) => new e(o, l).compare(new e(s, l)), vi;
}
var $i, Sl;
function Gy() {
  if (Sl) return $i;
  Sl = 1;
  const e = Me();
  return $i = (o, s, l) => e(s, o, l), $i;
}
var gi, bl;
function Ky() {
  if (bl) return gi;
  bl = 1;
  const e = Me();
  return gi = (o, s) => e(o, s, !0), gi;
}
var _i, Rl;
function No() {
  if (Rl) return _i;
  Rl = 1;
  const e = Ne();
  return _i = (o, s, l) => {
    const n = new e(o, l), r = new e(s, l);
    return n.compare(r) || n.compareBuild(r);
  }, _i;
}
var Ei, Nl;
function Hy() {
  if (Nl) return Ei;
  Nl = 1;
  const e = No();
  return Ei = (o, s) => o.sort((l, n) => e(l, n, s)), Ei;
}
var wi, Pl;
function By() {
  if (Pl) return wi;
  Pl = 1;
  const e = No();
  return wi = (o, s) => o.sort((l, n) => e(n, l, s)), wi;
}
var Si, Il;
function Xn() {
  if (Il) return Si;
  Il = 1;
  const e = Me();
  return Si = (o, s, l) => e(o, s, l) > 0, Si;
}
var bi, Ol;
function Po() {
  if (Ol) return bi;
  Ol = 1;
  const e = Me();
  return bi = (o, s, l) => e(o, s, l) < 0, bi;
}
var Ri, Tl;
function Gf() {
  if (Tl) return Ri;
  Tl = 1;
  const e = Me();
  return Ri = (o, s, l) => e(o, s, l) === 0, Ri;
}
var Ni, Cl;
function Kf() {
  if (Cl) return Ni;
  Cl = 1;
  const e = Me();
  return Ni = (o, s, l) => e(o, s, l) !== 0, Ni;
}
var Pi, Dl;
function Io() {
  if (Dl) return Pi;
  Dl = 1;
  const e = Me();
  return Pi = (o, s, l) => e(o, s, l) >= 0, Pi;
}
var Ii, Al;
function Oo() {
  if (Al) return Ii;
  Al = 1;
  const e = Me();
  return Ii = (o, s, l) => e(o, s, l) <= 0, Ii;
}
var Oi, jl;
function Hf() {
  if (jl) return Oi;
  jl = 1;
  const e = Gf(), t = Kf(), o = Xn(), s = Io(), l = Po(), n = Oo();
  return Oi = (a, c, d, f) => {
    switch (c) {
      case "===":
        return typeof a == "object" && (a = a.version), typeof d == "object" && (d = d.version), a === d;
      case "!==":
        return typeof a == "object" && (a = a.version), typeof d == "object" && (d = d.version), a !== d;
      case "":
      case "=":
      case "==":
        return e(a, d, f);
      case "!=":
        return t(a, d, f);
      case ">":
        return o(a, d, f);
      case ">=":
        return s(a, d, f);
      case "<":
        return l(a, d, f);
      case "<=":
        return n(a, d, f);
      default:
        throw new TypeError(`Invalid operator: ${c}`);
    }
  }, Oi;
}
var Ti, kl;
function xy() {
  if (kl) return Ti;
  kl = 1;
  const e = Ne(), t = Pt(), { safeRe: o, t: s } = Ft();
  return Ti = (n, r) => {
    if (n instanceof e)
      return n;
    if (typeof n == "number" && (n = String(n)), typeof n != "string")
      return null;
    r = r || {};
    let a = null;
    if (!r.rtl)
      a = n.match(r.includePrerelease ? o[s.COERCEFULL] : o[s.COERCE]);
    else {
      const g = r.includePrerelease ? o[s.COERCERTLFULL] : o[s.COERCERTL];
      let w;
      for (; (w = g.exec(n)) && (!a || a.index + a[0].length !== n.length); )
        (!a || w.index + w[0].length !== a.index + a[0].length) && (a = w), g.lastIndex = w.index + w[1].length + w[2].length;
      g.lastIndex = -1;
    }
    if (a === null)
      return null;
    const c = a[2], d = a[3] || "0", f = a[4] || "0", E = r.includePrerelease && a[5] ? `-${a[5]}` : "", _ = r.includePrerelease && a[6] ? `+${a[6]}` : "";
    return t(`${c}.${d}.${f}${E}${_}`, r);
  }, Ti;
}
var Ci, Ll;
function Jy() {
  if (Ll) return Ci;
  Ll = 1;
  class e {
    constructor() {
      this.max = 1e3, this.map = /* @__PURE__ */ new Map();
    }
    get(o) {
      const s = this.map.get(o);
      if (s !== void 0)
        return this.map.delete(o), this.map.set(o, s), s;
    }
    delete(o) {
      return this.map.delete(o);
    }
    set(o, s) {
      if (!this.delete(o) && s !== void 0) {
        if (this.map.size >= this.max) {
          const n = this.map.keys().next().value;
          this.delete(n);
        }
        this.map.set(o, s);
      }
      return this;
    }
  }
  return Ci = e, Ci;
}
var Di, ql;
function Ue() {
  if (ql) return Di;
  ql = 1;
  const e = /\s+/g;
  class t {
    constructor(z, J) {
      if (J = l(J), z instanceof t)
        return z.loose === !!J.loose && z.includePrerelease === !!J.includePrerelease ? z : new t(z.raw, J);
      if (z instanceof n)
        return this.raw = z.value, this.set = [[z]], this.formatted = void 0, this;
      if (this.options = J, this.loose = !!J.loose, this.includePrerelease = !!J.includePrerelease, this.raw = z.trim().replace(e, " "), this.set = this.raw.split("||").map((x) => this.parseRange(x.trim())).filter((x) => x.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const x = this.set[0];
        if (this.set = this.set.filter((B) => !b(B[0])), this.set.length === 0)
          this.set = [x];
        else if (this.set.length > 1) {
          for (const B of this.set)
            if (B.length === 1 && u(B[0])) {
              this.set = [B];
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
          for (let x = 0; x < J.length; x++)
            x > 0 && (this.formatted += " "), this.formatted += J[x].toString().trim();
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
      const x = ((this.options.includePrerelease && g) | (this.options.loose && w)) + ":" + z, B = s.get(x);
      if (B)
        return B;
      const W = this.options.loose, q = W ? c[d.HYPHENRANGELOOSE] : c[d.HYPHENRANGE];
      z = z.replace(q, V(this.options.includePrerelease)), r("hyphen replace", z), z = z.replace(c[d.COMPARATORTRIM], f), r("comparator trim", z), z = z.replace(c[d.TILDETRIM], E), r("tilde trim", z), z = z.replace(c[d.CARETTRIM], _), r("caret trim", z);
      let I = z.split(" ").map((N) => i(N, this.options)).join(" ").split(/\s+/).map((N) => L(N, this.options));
      W && (I = I.filter((N) => (r("loose invalid filter", N, this.options), !!N.match(c[d.COMPARATORLOOSE])))), r("range list", I);
      const A = /* @__PURE__ */ new Map(), C = I.map((N) => new n(N, this.options));
      for (const N of C) {
        if (b(N))
          return [N];
        A.set(N.value, N);
      }
      A.size > 1 && A.has("") && A.delete("");
      const S = [...A.values()];
      return s.set(x, S), S;
    }
    intersects(z, J) {
      if (!(z instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((x) => h(x, J) && z.set.some((B) => h(B, J) && x.every((W) => B.every((q) => W.intersects(q, J)))));
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
        if (F(this.set[J], z, this.options))
          return !0;
      return !1;
    }
  }
  Di = t;
  const o = Jy(), s = new o(), l = Ro(), n = Yn(), r = Zn(), a = Ne(), {
    safeRe: c,
    t: d,
    comparatorTrimReplace: f,
    tildeTrimReplace: E,
    caretTrimReplace: _
  } = Ft(), { FLAG_INCLUDE_PRERELEASE: g, FLAG_LOOSE: w } = Wn(), b = (M) => M.value === "<0.0.0-0", u = (M) => M.value === "", h = (M, z) => {
    let J = !0;
    const x = M.slice();
    let B = x.pop();
    for (; J && x.length; )
      J = x.every((W) => B.intersects(W, z)), B = x.pop();
    return J;
  }, i = (M, z) => (M = M.replace(c[d.BUILD], ""), r("comp", M, z), M = y(M, z), r("caret", M), M = v(M, z), r("tildes", M), M = R(M, z), r("xrange", M), M = j(M, z), r("stars", M), M), p = (M) => !M || M.toLowerCase() === "x" || M === "*", v = (M, z) => M.trim().split(/\s+/).map((J) => m(J, z)).join(" "), m = (M, z) => {
    const J = z.loose ? c[d.TILDELOOSE] : c[d.TILDE];
    return M.replace(J, (x, B, W, q, I) => {
      r("tilde", M, x, B, W, q, I);
      let A;
      return p(B) ? A = "" : p(W) ? A = `>=${B}.0.0 <${+B + 1}.0.0-0` : p(q) ? A = `>=${B}.${W}.0 <${B}.${+W + 1}.0-0` : I ? (r("replaceTilde pr", I), A = `>=${B}.${W}.${q}-${I} <${B}.${+W + 1}.0-0`) : A = `>=${B}.${W}.${q} <${B}.${+W + 1}.0-0`, r("tilde return", A), A;
    });
  }, y = (M, z) => M.trim().split(/\s+/).map((J) => $(J, z)).join(" "), $ = (M, z) => {
    r("caret", M, z);
    const J = z.loose ? c[d.CARETLOOSE] : c[d.CARET], x = z.includePrerelease ? "-0" : "";
    return M.replace(J, (B, W, q, I, A) => {
      r("caret", M, B, W, q, I, A);
      let C;
      return p(W) ? C = "" : p(q) ? C = `>=${W}.0.0${x} <${+W + 1}.0.0-0` : p(I) ? W === "0" ? C = `>=${W}.${q}.0${x} <${W}.${+q + 1}.0-0` : C = `>=${W}.${q}.0${x} <${+W + 1}.0.0-0` : A ? (r("replaceCaret pr", A), W === "0" ? q === "0" ? C = `>=${W}.${q}.${I}-${A} <${W}.${q}.${+I + 1}-0` : C = `>=${W}.${q}.${I}-${A} <${W}.${+q + 1}.0-0` : C = `>=${W}.${q}.${I}-${A} <${+W + 1}.0.0-0`) : (r("no pr"), W === "0" ? q === "0" ? C = `>=${W}.${q}.${I}${x} <${W}.${q}.${+I + 1}-0` : C = `>=${W}.${q}.${I}${x} <${W}.${+q + 1}.0-0` : C = `>=${W}.${q}.${I} <${+W + 1}.0.0-0`), r("caret return", C), C;
    });
  }, R = (M, z) => (r("replaceXRanges", M, z), M.split(/\s+/).map((J) => O(J, z)).join(" ")), O = (M, z) => {
    M = M.trim();
    const J = z.loose ? c[d.XRANGELOOSE] : c[d.XRANGE];
    return M.replace(J, (x, B, W, q, I, A) => {
      r("xRange", M, x, B, W, q, I, A);
      const C = p(W), S = C || p(q), N = S || p(I), D = N;
      return B === "=" && D && (B = ""), A = z.includePrerelease ? "-0" : "", C ? B === ">" || B === "<" ? x = "<0.0.0-0" : x = "*" : B && D ? (S && (q = 0), I = 0, B === ">" ? (B = ">=", S ? (W = +W + 1, q = 0, I = 0) : (q = +q + 1, I = 0)) : B === "<=" && (B = "<", S ? W = +W + 1 : q = +q + 1), B === "<" && (A = "-0"), x = `${B + W}.${q}.${I}${A}`) : S ? x = `>=${W}.0.0${A} <${+W + 1}.0.0-0` : N && (x = `>=${W}.${q}.0${A} <${W}.${+q + 1}.0-0`), r("xRange return", x), x;
    });
  }, j = (M, z) => (r("replaceStars", M, z), M.trim().replace(c[d.STAR], "")), L = (M, z) => (r("replaceGTE0", M, z), M.trim().replace(c[z.includePrerelease ? d.GTE0PRE : d.GTE0], "")), V = (M) => (z, J, x, B, W, q, I, A, C, S, N, D) => (p(x) ? J = "" : p(B) ? J = `>=${x}.0.0${M ? "-0" : ""}` : p(W) ? J = `>=${x}.${B}.0${M ? "-0" : ""}` : q ? J = `>=${J}` : J = `>=${J}${M ? "-0" : ""}`, p(C) ? A = "" : p(S) ? A = `<${+C + 1}.0.0-0` : p(N) ? A = `<${C}.${+S + 1}.0-0` : D ? A = `<=${C}.${S}.${N}-${D}` : M ? A = `<${C}.${S}.${+N + 1}-0` : A = `<=${A}`, `${J} ${A}`.trim()), F = (M, z, J) => {
    for (let x = 0; x < M.length; x++)
      if (!M[x].test(z))
        return !1;
    if (z.prerelease.length && !J.includePrerelease) {
      for (let x = 0; x < M.length; x++)
        if (r(M[x].semver), M[x].semver !== n.ANY && M[x].semver.prerelease.length > 0) {
          const B = M[x].semver;
          if (B.major === z.major && B.minor === z.minor && B.patch === z.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Di;
}
var Ai, Fl;
function Yn() {
  if (Fl) return Ai;
  Fl = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(f, E) {
      if (E = o(E), f instanceof t) {
        if (f.loose === !!E.loose)
          return f;
        f = f.value;
      }
      f = f.trim().split(/\s+/).join(" "), r("comparator", f, E), this.options = E, this.loose = !!E.loose, this.parse(f), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, r("comp", this);
    }
    parse(f) {
      const E = this.options.loose ? s[l.COMPARATORLOOSE] : s[l.COMPARATOR], _ = f.match(E);
      if (!_)
        throw new TypeError(`Invalid comparator: ${f}`);
      this.operator = _[1] !== void 0 ? _[1] : "", this.operator === "=" && (this.operator = ""), _[2] ? this.semver = new a(_[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(f) {
      if (r("Comparator.test", f, this.options.loose), this.semver === e || f === e)
        return !0;
      if (typeof f == "string")
        try {
          f = new a(f, this.options);
        } catch {
          return !1;
        }
      return n(f, this.operator, this.semver, this.options);
    }
    intersects(f, E) {
      if (!(f instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new c(f.value, E).test(this.value) : f.operator === "" ? f.value === "" ? !0 : new c(this.value, E).test(f.semver) : (E = o(E), E.includePrerelease && (this.value === "<0.0.0-0" || f.value === "<0.0.0-0") || !E.includePrerelease && (this.value.startsWith("<0.0.0") || f.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && f.operator.startsWith(">") || this.operator.startsWith("<") && f.operator.startsWith("<") || this.semver.version === f.semver.version && this.operator.includes("=") && f.operator.includes("=") || n(this.semver, "<", f.semver, E) && this.operator.startsWith(">") && f.operator.startsWith("<") || n(this.semver, ">", f.semver, E) && this.operator.startsWith("<") && f.operator.startsWith(">")));
    }
  }
  Ai = t;
  const o = Ro(), { safeRe: s, t: l } = Ft(), n = Hf(), r = Zn(), a = Ne(), c = Ue();
  return Ai;
}
var ji, Ml;
function Qn() {
  if (Ml) return ji;
  Ml = 1;
  const e = Ue();
  return ji = (o, s, l) => {
    try {
      s = new e(s, l);
    } catch {
      return !1;
    }
    return s.test(o);
  }, ji;
}
var ki, Ul;
function Wy() {
  if (Ul) return ki;
  Ul = 1;
  const e = Ue();
  return ki = (o, s) => new e(o, s).set.map((l) => l.map((n) => n.value).join(" ").trim().split(" ")), ki;
}
var Li, Vl;
function Zy() {
  if (Vl) return Li;
  Vl = 1;
  const e = Ne(), t = Ue();
  return Li = (s, l, n) => {
    let r = null, a = null, c = null;
    try {
      c = new t(l, n);
    } catch {
      return null;
    }
    return s.forEach((d) => {
      c.test(d) && (!r || a.compare(d) === -1) && (r = d, a = new e(r, n));
    }), r;
  }, Li;
}
var qi, zl;
function Xy() {
  if (zl) return qi;
  zl = 1;
  const e = Ne(), t = Ue();
  return qi = (s, l, n) => {
    let r = null, a = null, c = null;
    try {
      c = new t(l, n);
    } catch {
      return null;
    }
    return s.forEach((d) => {
      c.test(d) && (!r || a.compare(d) === 1) && (r = d, a = new e(r, n));
    }), r;
  }, qi;
}
var Fi, Gl;
function Yy() {
  if (Gl) return Fi;
  Gl = 1;
  const e = Ne(), t = Ue(), o = Xn();
  return Fi = (l, n) => {
    l = new t(l, n);
    let r = new e("0.0.0");
    if (l.test(r) || (r = new e("0.0.0-0"), l.test(r)))
      return r;
    r = null;
    for (let a = 0; a < l.set.length; ++a) {
      const c = l.set[a];
      let d = null;
      c.forEach((f) => {
        const E = new e(f.semver.version);
        switch (f.operator) {
          case ">":
            E.prerelease.length === 0 ? E.patch++ : E.prerelease.push(0), E.raw = E.format();
          /* fallthrough */
          case "":
          case ">=":
            (!d || o(E, d)) && (d = E);
            break;
          case "<":
          case "<=":
            break;
          /* istanbul ignore next */
          default:
            throw new Error(`Unexpected operation: ${f.operator}`);
        }
      }), d && (!r || o(r, d)) && (r = d);
    }
    return r && l.test(r) ? r : null;
  }, Fi;
}
var Mi, Kl;
function Qy() {
  if (Kl) return Mi;
  Kl = 1;
  const e = Ue();
  return Mi = (o, s) => {
    try {
      return new e(o, s).range || "*";
    } catch {
      return null;
    }
  }, Mi;
}
var Ui, Hl;
function To() {
  if (Hl) return Ui;
  Hl = 1;
  const e = Ne(), t = Yn(), { ANY: o } = t, s = Ue(), l = Qn(), n = Xn(), r = Po(), a = Oo(), c = Io();
  return Ui = (f, E, _, g) => {
    f = new e(f, g), E = new s(E, g);
    let w, b, u, h, i;
    switch (_) {
      case ">":
        w = n, b = a, u = r, h = ">", i = ">=";
        break;
      case "<":
        w = r, b = c, u = n, h = "<", i = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (l(f, E, g))
      return !1;
    for (let p = 0; p < E.set.length; ++p) {
      const v = E.set[p];
      let m = null, y = null;
      if (v.forEach(($) => {
        $.semver === o && ($ = new t(">=0.0.0")), m = m || $, y = y || $, w($.semver, m.semver, g) ? m = $ : u($.semver, y.semver, g) && (y = $);
      }), m.operator === h || m.operator === i || (!y.operator || y.operator === h) && b(f, y.semver))
        return !1;
      if (y.operator === i && u(f, y.semver))
        return !1;
    }
    return !0;
  }, Ui;
}
var Vi, Bl;
function ev() {
  if (Bl) return Vi;
  Bl = 1;
  const e = To();
  return Vi = (o, s, l) => e(o, s, ">", l), Vi;
}
var zi, xl;
function tv() {
  if (xl) return zi;
  xl = 1;
  const e = To();
  return zi = (o, s, l) => e(o, s, "<", l), zi;
}
var Gi, Jl;
function rv() {
  if (Jl) return Gi;
  Jl = 1;
  const e = Ue();
  return Gi = (o, s, l) => (o = new e(o, l), s = new e(s, l), o.intersects(s, l)), Gi;
}
var Ki, Wl;
function nv() {
  if (Wl) return Ki;
  Wl = 1;
  const e = Qn(), t = Me();
  return Ki = (o, s, l) => {
    const n = [];
    let r = null, a = null;
    const c = o.sort((_, g) => t(_, g, l));
    for (const _ of c)
      e(_, s, l) ? (a = _, r || (r = _)) : (a && n.push([r, a]), a = null, r = null);
    r && n.push([r, null]);
    const d = [];
    for (const [_, g] of n)
      _ === g ? d.push(_) : !g && _ === c[0] ? d.push("*") : g ? _ === c[0] ? d.push(`<=${g}`) : d.push(`${_} - ${g}`) : d.push(`>=${_}`);
    const f = d.join(" || "), E = typeof s.raw == "string" ? s.raw : String(s);
    return f.length < E.length ? f : s;
  }, Ki;
}
var Hi, Zl;
function sv() {
  if (Zl) return Hi;
  Zl = 1;
  const e = Ue(), t = Yn(), { ANY: o } = t, s = Qn(), l = Me(), n = (E, _, g = {}) => {
    if (E === _)
      return !0;
    E = new e(E, g), _ = new e(_, g);
    let w = !1;
    e: for (const b of E.set) {
      for (const u of _.set) {
        const h = c(b, u, g);
        if (w = w || h !== null, h)
          continue e;
      }
      if (w)
        return !1;
    }
    return !0;
  }, r = [new t(">=0.0.0-0")], a = [new t(">=0.0.0")], c = (E, _, g) => {
    if (E === _)
      return !0;
    if (E.length === 1 && E[0].semver === o) {
      if (_.length === 1 && _[0].semver === o)
        return !0;
      g.includePrerelease ? E = r : E = a;
    }
    if (_.length === 1 && _[0].semver === o) {
      if (g.includePrerelease)
        return !0;
      _ = a;
    }
    const w = /* @__PURE__ */ new Set();
    let b, u;
    for (const R of E)
      R.operator === ">" || R.operator === ">=" ? b = d(b, R, g) : R.operator === "<" || R.operator === "<=" ? u = f(u, R, g) : w.add(R.semver);
    if (w.size > 1)
      return null;
    let h;
    if (b && u) {
      if (h = l(b.semver, u.semver, g), h > 0)
        return null;
      if (h === 0 && (b.operator !== ">=" || u.operator !== "<="))
        return null;
    }
    for (const R of w) {
      if (b && !s(R, String(b), g) || u && !s(R, String(u), g))
        return null;
      for (const O of _)
        if (!s(R, String(O), g))
          return !1;
      return !0;
    }
    let i, p, v, m, y = u && !g.includePrerelease && u.semver.prerelease.length ? u.semver : !1, $ = b && !g.includePrerelease && b.semver.prerelease.length ? b.semver : !1;
    y && y.prerelease.length === 1 && u.operator === "<" && y.prerelease[0] === 0 && (y = !1);
    for (const R of _) {
      if (m = m || R.operator === ">" || R.operator === ">=", v = v || R.operator === "<" || R.operator === "<=", b) {
        if ($ && R.semver.prerelease && R.semver.prerelease.length && R.semver.major === $.major && R.semver.minor === $.minor && R.semver.patch === $.patch && ($ = !1), R.operator === ">" || R.operator === ">=") {
          if (i = d(b, R, g), i === R && i !== b)
            return !1;
        } else if (b.operator === ">=" && !s(b.semver, String(R), g))
          return !1;
      }
      if (u) {
        if (y && R.semver.prerelease && R.semver.prerelease.length && R.semver.major === y.major && R.semver.minor === y.minor && R.semver.patch === y.patch && (y = !1), R.operator === "<" || R.operator === "<=") {
          if (p = f(u, R, g), p === R && p !== u)
            return !1;
        } else if (u.operator === "<=" && !s(u.semver, String(R), g))
          return !1;
      }
      if (!R.operator && (u || b) && h !== 0)
        return !1;
    }
    return !(b && v && !u && h !== 0 || u && m && !b && h !== 0 || $ || y);
  }, d = (E, _, g) => {
    if (!E)
      return _;
    const w = l(E.semver, _.semver, g);
    return w > 0 ? E : w < 0 || _.operator === ">" && E.operator === ">=" ? _ : E;
  }, f = (E, _, g) => {
    if (!E)
      return _;
    const w = l(E.semver, _.semver, g);
    return w < 0 ? E : w > 0 || _.operator === "<" && E.operator === "<=" ? _ : E;
  };
  return Hi = n, Hi;
}
var Bi, Xl;
function iv() {
  if (Xl) return Bi;
  Xl = 1;
  const e = Ft(), t = Wn(), o = Ne(), s = zf(), l = Pt(), n = ky(), r = Ly(), a = qy(), c = Fy(), d = My(), f = Uy(), E = Vy(), _ = zy(), g = Me(), w = Gy(), b = Ky(), u = No(), h = Hy(), i = By(), p = Xn(), v = Po(), m = Gf(), y = Kf(), $ = Io(), R = Oo(), O = Hf(), j = xy(), L = Yn(), V = Ue(), F = Qn(), M = Wy(), z = Zy(), J = Xy(), x = Yy(), B = Qy(), W = To(), q = ev(), I = tv(), A = rv(), C = nv(), S = sv();
  return Bi = {
    parse: l,
    valid: n,
    clean: r,
    inc: a,
    diff: c,
    major: d,
    minor: f,
    patch: E,
    prerelease: _,
    compare: g,
    rcompare: w,
    compareLoose: b,
    compareBuild: u,
    sort: h,
    rsort: i,
    gt: p,
    lt: v,
    eq: m,
    neq: y,
    gte: $,
    lte: R,
    cmp: O,
    coerce: j,
    Comparator: L,
    Range: V,
    satisfies: F,
    toComparators: M,
    maxSatisfying: z,
    minSatisfying: J,
    minVersion: x,
    validRange: B,
    outside: W,
    gtr: q,
    ltr: I,
    intersects: A,
    simplifyRange: C,
    subset: S,
    SemVer: o,
    re: e.re,
    src: e.src,
    tokens: e.t,
    SEMVER_SPEC_VERSION: t.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: t.RELEASE_TYPES,
    compareIdentifiers: s.compareIdentifiers,
    rcompareIdentifiers: s.rcompareIdentifiers
  }, Bi;
}
var ov = iv();
const St = /* @__PURE__ */ ho(ov), av = Object.prototype.toString, cv = "[object Uint8Array]", uv = "[object ArrayBuffer]";
function Bf(e, t, o) {
  return e ? e.constructor === t ? !0 : av.call(e) === o : !1;
}
function xf(e) {
  return Bf(e, Uint8Array, cv);
}
function lv(e) {
  return Bf(e, ArrayBuffer, uv);
}
function fv(e) {
  return xf(e) || lv(e);
}
function dv(e) {
  if (!xf(e))
    throw new TypeError(`Expected \`Uint8Array\`, got \`${typeof e}\``);
}
function hv(e) {
  if (!fv(e))
    throw new TypeError(`Expected \`Uint8Array\` or \`ArrayBuffer\`, got \`${typeof e}\``);
}
function xi(e, t) {
  if (e.length === 0)
    return new Uint8Array(0);
  t ??= e.reduce((l, n) => l + n.length, 0);
  const o = new Uint8Array(t);
  let s = 0;
  for (const l of e)
    dv(l), o.set(l, s), s += l.length;
  return o;
}
const Yl = {
  utf8: new globalThis.TextDecoder("utf8")
};
function On(e, t = "utf8") {
  return hv(e), Yl[t] ??= new globalThis.TextDecoder(t), Yl[t].decode(e);
}
function mv(e) {
  if (typeof e != "string")
    throw new TypeError(`Expected \`string\`, got \`${typeof e}\``);
}
const pv = new globalThis.TextEncoder();
function Tn(e) {
  return mv(e), pv.encode(e);
}
Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
const Ji = "aes-256-cbc", et = () => /* @__PURE__ */ Object.create(null), Ql = (e) => e !== void 0, Wi = (e, t) => {
  const o = /* @__PURE__ */ new Set([
    "undefined",
    "symbol",
    "function"
  ]), s = typeof t;
  if (o.has(s))
    throw new TypeError(`Setting a value of type \`${s}\` for key \`${e}\` is not allowed as it's not supported by JSON`);
}, tt = "__internal__", Zi = `${tt}.migrations.version`;
class yv {
  path;
  events;
  #s;
  #t;
  #e;
  #r = {};
  #c = !1;
  #i;
  #u;
  #o;
  constructor(t = {}) {
    const o = this.#f(t);
    this.#e = o, this.#h(o), this.#a(o), this.#n(o), this.events = new EventTarget(), this.#t = o.encryptionKey, this.path = this.#l(o), this.#m(o), o.watch && this._watch();
  }
  get(t, o) {
    if (this.#e.accessPropertiesByDotNotation)
      return this._get(t, o);
    const { store: s } = this;
    return t in s ? s[t] : o;
  }
  set(t, o) {
    if (typeof t != "string" && typeof t != "object")
      throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof t}`);
    if (typeof t != "object" && o === void 0)
      throw new TypeError("Use `delete()` to clear values");
    if (this._containsReservedKey(t))
      throw new TypeError(`Please don't use the ${tt} key, as it's used to manage this module internal operations.`);
    const { store: s } = this, l = (n, r) => {
      if (Wi(n, r), this.#e.accessPropertiesByDotNotation)
        Ht(s, n, r);
      else {
        if (n === "__proto__" || n === "constructor" || n === "prototype")
          return;
        s[n] = r;
      }
    };
    if (typeof t == "object") {
      const n = t;
      for (const [r, a] of Object.entries(n))
        l(r, a);
    } else
      l(t, o);
    this.store = s;
  }
  has(t) {
    return this.#e.accessPropertiesByDotNotation ? ks(this.store, t) : t in this.store;
  }
  appendToArray(t, o) {
    Wi(t, o);
    const s = this.#e.accessPropertiesByDotNotation ? this._get(t, []) : t in this.store ? this.store[t] : [];
    if (!Array.isArray(s))
      throw new TypeError(`The key \`${t}\` is already set to a non-array value`);
    this.set(t, [...s, o]);
  }
  /**
      Reset items to their default values, as defined by the `defaults` or `schema` option.
  
      @see `clear()` to reset all items.
  
      @param keys - The keys of the items to reset.
      */
  reset(...t) {
    for (const o of t)
      Ql(this.#r[o]) && this.set(o, this.#r[o]);
  }
  delete(t) {
    const { store: o } = this;
    this.#e.accessPropertiesByDotNotation ? Cd(o, t) : delete o[t], this.store = o;
  }
  /**
      Delete all items.
  
      This resets known items to their default values, if defined by the `defaults` or `schema` option.
      */
  clear() {
    const t = et();
    for (const o of Object.keys(this.#r))
      Ql(this.#r[o]) && (Wi(o, this.#r[o]), this.#e.accessPropertiesByDotNotation ? Ht(t, o, this.#r[o]) : t[o] = this.#r[o]);
    this.store = t;
  }
  onDidChange(t, o) {
    if (typeof t != "string")
      throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof t}`);
    if (typeof o != "function")
      throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof o}`);
    return this._handleValueChange(() => this.get(t), o);
  }
  /**
      Watches the whole config object, calling `callback` on any changes.
  
      @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
      @returns A function, that when called, will unsubscribe.
      */
  onDidAnyChange(t) {
    if (typeof t != "function")
      throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof t}`);
    return this._handleStoreChange(t);
  }
  get size() {
    return Object.keys(this.store).filter((o) => !this._isReservedKeyPath(o)).length;
  }
  /**
      Get all the config as an object or replace the current config with an object.
  
      @example
      ```
      console.log(config.store);
      //=> {name: 'John', age: 30}
      ```
  
      @example
      ```
      config.store = {
          hello: 'world'
      };
      ```
      */
  get store() {
    try {
      const t = Q.readFileSync(this.path, this.#t ? null : "utf8"), o = this._decryptData(t), s = this._deserialize(o);
      return this.#c || this._validate(s), Object.assign(et(), s);
    } catch (t) {
      if (t?.code === "ENOENT")
        return this._ensureDirectory(), et();
      if (this.#e.clearInvalidConfig) {
        const o = t;
        if (o.name === "SyntaxError" || o.message?.startsWith("Config schema violation:"))
          return et();
      }
      throw t;
    }
  }
  set store(t) {
    if (this._ensureDirectory(), !ks(t, tt))
      try {
        const o = Q.readFileSync(this.path, this.#t ? null : "utf8"), s = this._decryptData(o), l = this._deserialize(s);
        ks(l, tt) && Ht(t, tt, va(l, tt));
      } catch {
      }
    this.#c || this._validate(t), this._write(t), this.events.dispatchEvent(new Event("change"));
  }
  *[Symbol.iterator]() {
    for (const [t, o] of Object.entries(this.store))
      this._isReservedKeyPath(t) || (yield [t, o]);
  }
  /**
  Close the file watcher if one exists. This is useful in tests to prevent the process from hanging.
  */
  _closeWatcher() {
    this.#i && (this.#i.close(), this.#i = void 0), this.#u && (Q.unwatchFile(this.path), this.#u = !1), this.#o = void 0;
  }
  _decryptData(t) {
    if (!this.#t)
      return typeof t == "string" ? t : On(t);
    try {
      const o = t.slice(0, 16), s = at.pbkdf2Sync(this.#t, o, 1e4, 32, "sha512"), l = at.createDecipheriv(Ji, s, o), n = t.slice(17), r = typeof n == "string" ? Tn(n) : n;
      return On(xi([l.update(r), l.final()]));
    } catch {
      try {
        const o = t.slice(0, 16), s = at.pbkdf2Sync(this.#t, o.toString(), 1e4, 32, "sha512"), l = at.createDecipheriv(Ji, s, o), n = t.slice(17), r = typeof n == "string" ? Tn(n) : n;
        return On(xi([l.update(r), l.final()]));
      } catch {
      }
    }
    return typeof t == "string" ? t : On(t);
  }
  _handleStoreChange(t) {
    let o = this.store;
    const s = () => {
      const l = o, n = this.store;
      jo(n, l) || (o = n, t.call(this, n, l));
    };
    return this.events.addEventListener("change", s), () => {
      this.events.removeEventListener("change", s);
    };
  }
  _handleValueChange(t, o) {
    let s = t();
    const l = () => {
      const n = s, r = t();
      jo(r, n) || (s = r, o.call(this, r, n));
    };
    return this.events.addEventListener("change", l), () => {
      this.events.removeEventListener("change", l);
    };
  }
  _deserialize = (t) => JSON.parse(t);
  _serialize = (t) => JSON.stringify(t, void 0, "	");
  _validate(t) {
    if (!this.#s || this.#s(t) || !this.#s.errors)
      return;
    const s = this.#s.errors.map(({ instancePath: l, message: n = "" }) => `\`${l.slice(1)}\` ${n}`);
    throw new Error("Config schema violation: " + s.join("; "));
  }
  _ensureDirectory() {
    Q.mkdirSync(ce.dirname(this.path), { recursive: !0 });
  }
  _write(t) {
    let o = this._serialize(t);
    if (this.#t) {
      const s = at.randomBytes(16), l = at.pbkdf2Sync(this.#t, s, 1e4, 32, "sha512"), n = at.createCipheriv(Ji, l, s);
      o = xi([s, Tn(":"), n.update(Tn(o)), n.final()]);
    }
    if (we.env.SNAP)
      Q.writeFileSync(this.path, o, { mode: this.#e.configFileMode });
    else
      try {
        If(this.path, o, { mode: this.#e.configFileMode });
      } catch (s) {
        if (s?.code === "EXDEV") {
          Q.writeFileSync(this.path, o, { mode: this.#e.configFileMode });
          return;
        }
        throw s;
      }
  }
  _watch() {
    if (this._ensureDirectory(), Q.existsSync(this.path) || this._write(et()), we.platform === "win32" || we.platform === "darwin") {
      this.#o ??= ol(() => {
        this.events.dispatchEvent(new Event("change"));
      }, { wait: 100 });
      const t = ce.dirname(this.path), o = ce.basename(this.path);
      this.#i = Q.watch(t, { persistent: !1, encoding: "utf8" }, (s, l) => {
        l && l !== o || typeof this.#o == "function" && this.#o();
      });
    } else
      this.#o ??= ol(() => {
        this.events.dispatchEvent(new Event("change"));
      }, { wait: 1e3 }), Q.watchFile(this.path, { persistent: !1 }, (t, o) => {
        typeof this.#o == "function" && this.#o();
      }), this.#u = !0;
  }
  _migrate(t, o, s) {
    let l = this._get(Zi, "0.0.0");
    const n = Object.keys(t).filter((a) => this._shouldPerformMigration(a, l, o));
    let r = structuredClone(this.store);
    for (const a of n)
      try {
        s && s(this, {
          fromVersion: l,
          toVersion: a,
          finalVersion: o,
          versions: n
        });
        const c = t[a];
        c?.(this), this._set(Zi, a), l = a, r = structuredClone(this.store);
      } catch (c) {
        this.store = r;
        try {
          this._write(r);
        } catch {
        }
        const d = c instanceof Error ? c.message : String(c);
        throw new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${d}`);
      }
    (this._isVersionInRangeFormat(l) || !St.eq(l, o)) && this._set(Zi, o);
  }
  _containsReservedKey(t) {
    return typeof t == "string" ? this._isReservedKeyPath(t) : !t || typeof t != "object" ? !1 : this._objectContainsReservedKey(t);
  }
  _objectContainsReservedKey(t) {
    if (!t || typeof t != "object")
      return !1;
    for (const [o, s] of Object.entries(t))
      if (this._isReservedKeyPath(o) || this._objectContainsReservedKey(s))
        return !0;
    return !1;
  }
  _isReservedKeyPath(t) {
    return t === tt || t.startsWith(`${tt}.`);
  }
  _isVersionInRangeFormat(t) {
    return St.clean(t) === null;
  }
  _shouldPerformMigration(t, o, s) {
    return this._isVersionInRangeFormat(t) ? o !== "0.0.0" && St.satisfies(o, t) ? !1 : St.satisfies(s, t) : !(St.lte(t, o) || St.gt(t, s));
  }
  _get(t, o) {
    return va(this.store, t, o);
  }
  _set(t, o) {
    const { store: s } = this;
    Ht(s, t, o), this.store = s;
  }
  #f(t) {
    const o = {
      configName: "config",
      fileExtension: "json",
      projectSuffix: "nodejs",
      clearInvalidConfig: !1,
      accessPropertiesByDotNotation: !0,
      configFileMode: 438,
      ...t
    };
    if (!o.cwd) {
      if (!o.projectName)
        throw new Error("Please specify the `projectName` option.");
      o.cwd = kd(o.projectName, { suffix: o.projectSuffix }).config;
    }
    return typeof o.fileExtension == "string" && (o.fileExtension = o.fileExtension.replace(/^\.+/, "")), o;
  }
  #h(t) {
    if (!(t.schema ?? t.ajvOptions ?? t.rootSchema))
      return;
    if (t.schema && typeof t.schema != "object")
      throw new TypeError("The `schema` option must be an object.");
    const o = Ny.default, s = new $p.Ajv2020({
      allErrors: !0,
      useDefaults: !0,
      ...t.ajvOptions
    });
    o(s);
    const l = {
      ...t.rootSchema,
      type: "object",
      properties: t.schema
    };
    this.#s = s.compile(l), this.#p(t.schema);
  }
  #p(t) {
    const o = Object.entries(t ?? {});
    for (const [s, l] of o) {
      if (!l || typeof l != "object" || !Object.hasOwn(l, "default"))
        continue;
      const { default: n } = l;
      n !== void 0 && (this.#r[s] = n);
    }
  }
  #a(t) {
    t.defaults && Object.assign(this.#r, t.defaults);
  }
  #n(t) {
    t.serialize && (this._serialize = t.serialize), t.deserialize && (this._deserialize = t.deserialize);
  }
  #l(t) {
    const o = typeof t.fileExtension == "string" ? t.fileExtension : void 0, s = o ? `.${o}` : "";
    return ce.resolve(t.cwd, `${t.configName ?? "config"}${s}`);
  }
  #m(t) {
    if (t.migrations) {
      this.#d(t), this._validate(this.store);
      return;
    }
    const o = this.store, s = Object.assign(et(), t.defaults ?? {}, o);
    this._validate(s);
    try {
      ko.deepEqual(o, s);
    } catch {
      this.store = s;
    }
  }
  #d(t) {
    const { migrations: o, projectVersion: s } = t;
    if (o) {
      if (!s)
        throw new Error("Please specify the `projectVersion` option.");
      this.#c = !0;
      try {
        const l = this.store, n = Object.assign(et(), t.defaults ?? {}, l);
        try {
          ko.deepEqual(l, n);
        } catch {
          this._write(n);
        }
        this._migrate(o, s, t.beforeEachMigration);
      } finally {
        this.#c = !1;
      }
    }
  }
}
const { app: Dn, ipcMain: lo, shell: vv } = Ef;
let ef = !1;
const tf = () => {
  if (!lo || !Dn)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: Dn.getPath("userData"),
    appVersion: Dn.getVersion()
  };
  return ef || (lo.on("electron-store-get-data", (t) => {
    t.returnValue = e;
  }), ef = !0), e;
};
class rf extends yv {
  constructor(t) {
    let o, s;
    if (we.type === "renderer") {
      const l = Ef.ipcRenderer.sendSync("electron-store-get-data");
      if (!l)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: o, appVersion: s } = l);
    } else lo && Dn && ({ defaultCwd: o, appVersion: s } = tf());
    t = {
      name: "config",
      ...t
    }, t.projectVersion ||= s, t.cwd ? t.cwd = ce.isAbsolute(t.cwd) ? t.cwd : ce.join(o, t.cwd) : t.cwd = o, t.configName = t.name, delete t.name, super(t);
  }
  static initRenderer() {
    tf();
  }
  async openInEditor() {
    const t = await vv.openPath(this.path);
    if (t)
      throw new Error(t);
  }
}
var mt = { exports: {} }, Xi, nf;
function Jf() {
  return nf || (nf = 1, Xi = {
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
  }), Xi;
}
var Yi = {}, sf;
function Co() {
  return sf || (sf = 1, function(e) {
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
    function o(s) {
      return function(...l) {
        return l.length && (s = s.replace(/\{(\d)\}/g, (n, r) => l[r] || "")), new Error("ADM-ZIP: " + s);
      };
    }
    for (const s of Object.keys(t))
      e[s] = o(t[s]);
  }(Yi)), Yi;
}
var Qi, of;
function $v() {
  if (of) return Qi;
  of = 1;
  const e = fo, t = Re, o = Jf(), s = Co(), l = typeof process == "object" && process.platform === "win32", n = (c) => typeof c == "object" && c !== null, r = new Uint32Array(256).map((c, d) => {
    for (let f = 0; f < 8; f++)
      (d & 1) !== 0 ? d = 3988292384 ^ d >>> 1 : d >>>= 1;
    return d >>> 0;
  });
  function a(c) {
    this.sep = t.sep, this.fs = e, n(c) && n(c.fs) && typeof c.fs.statSync == "function" && (this.fs = c.fs);
  }
  return Qi = a, a.prototype.makeDir = function(c) {
    const d = this;
    function f(E) {
      let _ = E.split(d.sep)[0];
      E.split(d.sep).forEach(function(g) {
        if (!(!g || g.substr(-1, 1) === ":")) {
          _ += d.sep + g;
          var w;
          try {
            w = d.fs.statSync(_);
          } catch {
            d.fs.mkdirSync(_);
          }
          if (w && w.isFile()) throw s.FILE_IN_THE_WAY(`"${_}"`);
        }
      });
    }
    f(c);
  }, a.prototype.writeFileTo = function(c, d, f, E) {
    const _ = this;
    if (_.fs.existsSync(c)) {
      if (!f) return !1;
      var g = _.fs.statSync(c);
      if (g.isDirectory())
        return !1;
    }
    var w = t.dirname(c);
    _.fs.existsSync(w) || _.makeDir(w);
    var b;
    try {
      b = _.fs.openSync(c, "w", 438);
    } catch {
      _.fs.chmodSync(c, 438), b = _.fs.openSync(c, "w", 438);
    }
    if (b)
      try {
        _.fs.writeSync(b, d, 0, d.length, 0);
      } finally {
        _.fs.closeSync(b);
      }
    return _.fs.chmodSync(c, E || 438), !0;
  }, a.prototype.writeFileToAsync = function(c, d, f, E, _) {
    typeof E == "function" && (_ = E, E = void 0);
    const g = this;
    g.fs.exists(c, function(w) {
      if (w && !f) return _(!1);
      g.fs.stat(c, function(b, u) {
        if (w && u.isDirectory())
          return _(!1);
        var h = t.dirname(c);
        g.fs.exists(h, function(i) {
          i || g.makeDir(h), g.fs.open(c, "w", 438, function(p, v) {
            p ? g.fs.chmod(c, 438, function() {
              g.fs.open(c, "w", 438, function(m, y) {
                g.fs.write(y, d, 0, d.length, 0, function() {
                  g.fs.close(y, function() {
                    g.fs.chmod(c, E || 438, function() {
                      _(!0);
                    });
                  });
                });
              });
            }) : v ? g.fs.write(v, d, 0, d.length, 0, function() {
              g.fs.close(v, function() {
                g.fs.chmod(c, E || 438, function() {
                  _(!0);
                });
              });
            }) : g.fs.chmod(c, E || 438, function() {
              _(!0);
            });
          });
        });
      });
    });
  }, a.prototype.findFiles = function(c) {
    const d = this;
    function f(E, _, g) {
      let w = [];
      return d.fs.readdirSync(E).forEach(function(b) {
        const u = t.join(E, b), h = d.fs.statSync(u);
        w.push(t.normalize(u) + (h.isDirectory() ? d.sep : "")), h.isDirectory() && g && (w = w.concat(f(u, _, g)));
      }), w;
    }
    return f(c, void 0, !0);
  }, a.prototype.findFilesAsync = function(c, d) {
    const f = this;
    let E = [];
    f.fs.readdir(c, function(_, g) {
      if (_) return d(_);
      let w = g.length;
      if (!w) return d(null, E);
      g.forEach(function(b) {
        b = t.join(c, b), f.fs.stat(b, function(u, h) {
          if (u) return d(u);
          h && (E.push(t.normalize(b) + (h.isDirectory() ? f.sep : "")), h.isDirectory() ? f.findFilesAsync(b, function(i, p) {
            if (i) return d(i);
            E = E.concat(p), --w || d(null, E);
          }) : --w || d(null, E));
        });
      });
    });
  }, a.prototype.getAttributes = function() {
  }, a.prototype.setAttributes = function() {
  }, a.crc32update = function(c, d) {
    return r[(c ^ d) & 255] ^ c >>> 8;
  }, a.crc32 = function(c) {
    typeof c == "string" && (c = Buffer.from(c, "utf8"));
    let d = c.length, f = -1;
    for (let E = 0; E < d; ) f = a.crc32update(f, c[E++]);
    return ~f >>> 0;
  }, a.methodToString = function(c) {
    switch (c) {
      case o.STORED:
        return "STORED (" + c + ")";
      case o.DEFLATED:
        return "DEFLATED (" + c + ")";
      default:
        return "UNSUPPORTED (" + c + ")";
    }
  }, a.canonical = function(c) {
    if (!c) return "";
    const d = t.posix.normalize("/" + c.split("\\").join("/"));
    return t.join(".", d);
  }, a.zipnamefix = function(c) {
    if (!c) return "";
    const d = t.posix.normalize("/" + c.split("\\").join("/"));
    return t.posix.join(".", d);
  }, a.findLast = function(c, d) {
    if (!Array.isArray(c)) throw new TypeError("arr is not array");
    const f = c.length >>> 0;
    for (let E = f - 1; E >= 0; E--)
      if (d(c[E], E, c))
        return c[E];
  }, a.sanitize = function(c, d) {
    c = t.resolve(t.normalize(c));
    for (var f = d.split("/"), E = 0, _ = f.length; E < _; E++) {
      var g = t.normalize(t.join(c, f.slice(E, _).join(t.sep)));
      if (g.indexOf(c) === 0)
        return g;
    }
    return t.normalize(t.join(c, t.basename(d)));
  }, a.toBuffer = function(d, f) {
    return Buffer.isBuffer(d) ? d : d instanceof Uint8Array ? Buffer.from(d) : typeof d == "string" ? f(d) : Buffer.alloc(0);
  }, a.readBigUInt64LE = function(c, d) {
    var f = Buffer.from(c.slice(d, d + 8));
    return f.swap64(), parseInt(`0x${f.toString("hex")}`);
  }, a.fromDOS2Date = function(c) {
    return new Date((c >> 25 & 127) + 1980, Math.max((c >> 21 & 15) - 1, 0), Math.max(c >> 16 & 31, 1), c >> 11 & 31, c >> 5 & 63, (c & 31) << 1);
  }, a.fromDate2DOS = function(c) {
    let d = 0, f = 0;
    return c.getFullYear() > 1979 && (d = (c.getFullYear() - 1980 & 127) << 9 | c.getMonth() + 1 << 5 | c.getDate(), f = c.getHours() << 11 | c.getMinutes() << 5 | c.getSeconds() >> 1), d << 16 | f;
  }, a.isWin = l, a.crcTable = r, Qi;
}
var eo, af;
function gv() {
  if (af) return eo;
  af = 1;
  const e = Re;
  return eo = function(t, { fs: o }) {
    var s = t || "", l = r(), n = null;
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
    return s && o.existsSync(s) ? (n = o.statSync(s), l.directory = n.isDirectory(), l.mtime = n.mtime, l.atime = n.atime, l.executable = (73 & n.mode) !== 0, l.readonly = (128 & n.mode) === 0, l.hidden = e.basename(s)[0] === ".") : console.warn("Invalid path: " + s), {
      get directory() {
        return l.directory;
      },
      get readOnly() {
        return l.readonly;
      },
      get hidden() {
        return l.hidden;
      },
      get mtime() {
        return l.mtime;
      },
      get atime() {
        return l.atime;
      },
      get executable() {
        return l.executable;
      },
      decodeAttributes: function() {
      },
      encodeAttributes: function() {
      },
      toJSON: function() {
        return {
          path: s,
          isDirectory: l.directory,
          isReadOnly: l.readonly,
          isHidden: l.hidden,
          isExecutable: l.executable,
          mTime: l.mtime,
          aTime: l.atime
        };
      },
      toString: function() {
        return JSON.stringify(this.toJSON(), null, "	");
      }
    };
  }, eo;
}
var to, cf;
function _v() {
  return cf || (cf = 1, to = {
    efs: !0,
    encode: (e) => Buffer.from(e, "utf8"),
    decode: (e) => e.toString("utf8")
  }), to;
}
var uf;
function Mt() {
  return uf || (uf = 1, mt.exports = $v(), mt.exports.Constants = Jf(), mt.exports.Errors = Co(), mt.exports.FileAttr = gv(), mt.exports.decoder = _v()), mt.exports;
}
var Cn = {}, ro, lf;
function Ev() {
  if (lf) return ro;
  lf = 1;
  var e = Mt(), t = e.Constants;
  return ro = function() {
    var o = 20, s = 10, l = 0, n = 0, r = 0, a = 0, c = 0, d = 0, f = 0, E = 0, _ = 0, g = 0, w = 0, b = 0, u = 0;
    o |= e.isWin ? 2560 : 768, l |= t.FLG_EFS;
    const h = {
      extraLen: 0
    }, i = (v) => Math.max(0, v) >>> 0, p = (v) => Math.max(0, v) & 255;
    return r = e.fromDate2DOS(/* @__PURE__ */ new Date()), {
      get made() {
        return o;
      },
      set made(v) {
        o = v;
      },
      get version() {
        return s;
      },
      set version(v) {
        s = v;
      },
      get flags() {
        return l;
      },
      set flags(v) {
        l = v;
      },
      get flags_efs() {
        return (l & t.FLG_EFS) > 0;
      },
      set flags_efs(v) {
        v ? l |= t.FLG_EFS : l &= ~t.FLG_EFS;
      },
      get flags_desc() {
        return (l & t.FLG_DESC) > 0;
      },
      set flags_desc(v) {
        v ? l |= t.FLG_DESC : l &= ~t.FLG_DESC;
      },
      get method() {
        return n;
      },
      set method(v) {
        switch (v) {
          case t.STORED:
            this.version = 10;
          case t.DEFLATED:
          default:
            this.version = 20;
        }
        n = v;
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
        r = i(v);
      },
      get timeHighByte() {
        return p(r >>> 8);
      },
      get crc() {
        return a;
      },
      set crc(v) {
        a = i(v);
      },
      get compressedSize() {
        return c;
      },
      set compressedSize(v) {
        c = i(v);
      },
      get size() {
        return d;
      },
      set size(v) {
        d = i(v);
      },
      get fileNameLength() {
        return f;
      },
      set fileNameLength(v) {
        f = v;
      },
      get extraLength() {
        return E;
      },
      set extraLength(v) {
        E = v;
      },
      get extraLocalLength() {
        return h.extraLen;
      },
      set extraLocalLength(v) {
        h.extraLen = v;
      },
      get commentLength() {
        return _;
      },
      set commentLength(v) {
        _ = v;
      },
      get diskNumStart() {
        return g;
      },
      set diskNumStart(v) {
        g = i(v);
      },
      get inAttr() {
        return w;
      },
      set inAttr(v) {
        w = i(v);
      },
      get attr() {
        return b;
      },
      set attr(v) {
        b = i(v);
      },
      // get Unix file permissions
      get fileAttr() {
        return (b || 0) >> 16 & 4095;
      },
      get offset() {
        return u;
      },
      set offset(v) {
        u = i(v);
      },
      get encrypted() {
        return (l & t.FLG_ENC) === t.FLG_ENC;
      },
      get centralHeaderSize() {
        return t.CENHDR + f + E + _;
      },
      get realDataOffset() {
        return u + t.LOCHDR + h.fnameLen + h.extraLen;
      },
      get localHeader() {
        return h;
      },
      loadLocalHeaderFromBinary: function(v) {
        var m = v.slice(u, u + t.LOCHDR);
        if (m.readUInt32LE(0) !== t.LOCSIG)
          throw e.Errors.INVALID_LOC();
        h.version = m.readUInt16LE(t.LOCVER), h.flags = m.readUInt16LE(t.LOCFLG), h.method = m.readUInt16LE(t.LOCHOW), h.time = m.readUInt32LE(t.LOCTIM), h.crc = m.readUInt32LE(t.LOCCRC), h.compressedSize = m.readUInt32LE(t.LOCSIZ), h.size = m.readUInt32LE(t.LOCLEN), h.fnameLen = m.readUInt16LE(t.LOCNAM), h.extraLen = m.readUInt16LE(t.LOCEXT);
        const y = u + t.LOCHDR + h.fnameLen, $ = y + h.extraLen;
        return v.slice(y, $);
      },
      loadFromBinary: function(v) {
        if (v.length !== t.CENHDR || v.readUInt32LE(0) !== t.CENSIG)
          throw e.Errors.INVALID_CEN();
        o = v.readUInt16LE(t.CENVEM), s = v.readUInt16LE(t.CENVER), l = v.readUInt16LE(t.CENFLG), n = v.readUInt16LE(t.CENHOW), r = v.readUInt32LE(t.CENTIM), a = v.readUInt32LE(t.CENCRC), c = v.readUInt32LE(t.CENSIZ), d = v.readUInt32LE(t.CENLEN), f = v.readUInt16LE(t.CENNAM), E = v.readUInt16LE(t.CENEXT), _ = v.readUInt16LE(t.CENCOM), g = v.readUInt16LE(t.CENDSK), w = v.readUInt16LE(t.CENATT), b = v.readUInt32LE(t.CENATX), u = v.readUInt32LE(t.CENOFF);
      },
      localHeaderToBinary: function() {
        var v = Buffer.alloc(t.LOCHDR);
        return v.writeUInt32LE(t.LOCSIG, 0), v.writeUInt16LE(s, t.LOCVER), v.writeUInt16LE(l, t.LOCFLG), v.writeUInt16LE(n, t.LOCHOW), v.writeUInt32LE(r, t.LOCTIM), v.writeUInt32LE(a, t.LOCCRC), v.writeUInt32LE(c, t.LOCSIZ), v.writeUInt32LE(d, t.LOCLEN), v.writeUInt16LE(f, t.LOCNAM), v.writeUInt16LE(h.extraLen, t.LOCEXT), v;
      },
      centralHeaderToBinary: function() {
        var v = Buffer.alloc(t.CENHDR + f + E + _);
        return v.writeUInt32LE(t.CENSIG, 0), v.writeUInt16LE(o, t.CENVEM), v.writeUInt16LE(s, t.CENVER), v.writeUInt16LE(l, t.CENFLG), v.writeUInt16LE(n, t.CENHOW), v.writeUInt32LE(r, t.CENTIM), v.writeUInt32LE(a, t.CENCRC), v.writeUInt32LE(c, t.CENSIZ), v.writeUInt32LE(d, t.CENLEN), v.writeUInt16LE(f, t.CENNAM), v.writeUInt16LE(E, t.CENEXT), v.writeUInt16LE(_, t.CENCOM), v.writeUInt16LE(g, t.CENDSK), v.writeUInt16LE(w, t.CENATT), v.writeUInt32LE(b, t.CENATX), v.writeUInt32LE(u, t.CENOFF), v;
      },
      toJSON: function() {
        const v = function(m) {
          return m + " bytes";
        };
        return {
          made: o,
          version: s,
          flags: l,
          method: e.methodToString(n),
          time: this.time,
          crc: "0x" + a.toString(16).toUpperCase(),
          compressedSize: v(c),
          size: v(d),
          fileNameLength: v(f),
          extraLength: v(E),
          commentLength: v(_),
          diskNumStart: g,
          inAttr: w,
          attr: b,
          offset: u,
          centralHeaderSize: v(t.CENHDR + f + E + _)
        };
      },
      toString: function() {
        return JSON.stringify(this.toJSON(), null, "	");
      }
    };
  }, ro;
}
var no, ff;
function wv() {
  if (ff) return no;
  ff = 1;
  var e = Mt(), t = e.Constants;
  return no = function() {
    var o = 0, s = 0, l = 0, n = 0, r = 0;
    return {
      get diskEntries() {
        return o;
      },
      set diskEntries(a) {
        o = s = a;
      },
      get totalEntries() {
        return s;
      },
      set totalEntries(a) {
        s = o = a;
      },
      get size() {
        return l;
      },
      set size(a) {
        l = a;
      },
      get offset() {
        return n;
      },
      set offset(a) {
        n = a;
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
        a.readUInt32LE(0) === t.ENDSIG ? (o = a.readUInt16LE(t.ENDSUB), s = a.readUInt16LE(t.ENDTOT), l = a.readUInt32LE(t.ENDSIZ), n = a.readUInt32LE(t.ENDOFF), r = a.readUInt16LE(t.ENDCOM)) : (o = e.readBigUInt64LE(a, t.ZIP64SUB), s = e.readBigUInt64LE(a, t.ZIP64TOT), l = e.readBigUInt64LE(a, t.ZIP64SIZE), n = e.readBigUInt64LE(a, t.ZIP64OFF), r = 0);
      },
      toBinary: function() {
        var a = Buffer.alloc(t.ENDHDR + r);
        return a.writeUInt32LE(t.ENDSIG, 0), a.writeUInt32LE(0, 4), a.writeUInt16LE(o, t.ENDSUB), a.writeUInt16LE(s, t.ENDTOT), a.writeUInt32LE(l, t.ENDSIZ), a.writeUInt32LE(n, t.ENDOFF), a.writeUInt16LE(r, t.ENDCOM), a.fill(" ", t.ENDHDR), a;
      },
      toJSON: function() {
        const a = function(c, d) {
          let f = c.toString(16).toUpperCase();
          for (; f.length < d; ) f = "0" + f;
          return "0x" + f;
        };
        return {
          diskEntries: o,
          totalEntries: s,
          size: l + " bytes",
          offset: a(n, 4),
          commentLength: r
        };
      },
      toString: function() {
        return JSON.stringify(this.toJSON(), null, "	");
      }
    };
  }, no;
}
var df;
function Wf() {
  return df || (df = 1, Cn.EntryHeader = Ev(), Cn.MainHeader = wv()), Cn;
}
var kt = {}, so, hf;
function Sv() {
  return hf || (hf = 1, so = function(e) {
    var t = Sf, o = { chunkSize: (parseInt(e.length / 1024) + 1) * 1024 };
    return {
      deflate: function() {
        return t.deflateRawSync(e, o);
      },
      deflateAsync: function(s) {
        var l = t.createDeflateRaw(o), n = [], r = 0;
        l.on("data", function(a) {
          n.push(a), r += a.length;
        }), l.on("end", function() {
          var a = Buffer.alloc(r), c = 0;
          a.fill(0);
          for (var d = 0; d < n.length; d++) {
            var f = n[d];
            f.copy(a, c), c += f.length;
          }
          s && s(a);
        }), l.end(e);
      }
    };
  }), so;
}
var io, mf;
function bv() {
  if (mf) return io;
  mf = 1;
  const e = +(process.versions ? process.versions.node : "").split(".")[0] || 0;
  return io = function(t, o) {
    var s = Sf;
    const l = e >= 15 && o > 0 ? { maxOutputLength: o } : {};
    return {
      inflate: function() {
        return s.inflateRawSync(t, l);
      },
      inflateAsync: function(n) {
        var r = s.createInflateRaw(l), a = [], c = 0;
        r.on("data", function(d) {
          a.push(d), c += d.length;
        }), r.on("end", function() {
          var d = Buffer.alloc(c), f = 0;
          d.fill(0);
          for (var E = 0; E < a.length; E++) {
            var _ = a[E];
            _.copy(d, f), f += _.length;
          }
          n && n(d);
        }), r.end(t);
      }
    };
  }, io;
}
var oo, pf;
function Rv() {
  if (pf) return oo;
  pf = 1;
  const { randomFillSync: e } = sd, t = Co(), o = new Uint32Array(256).map((g, w) => {
    for (let b = 0; b < 8; b++)
      (w & 1) !== 0 ? w = w >>> 1 ^ 3988292384 : w >>>= 1;
    return w >>> 0;
  }), s = (g, w) => Math.imul(g, w) >>> 0, l = (g, w) => o[(g ^ w) & 255] ^ g >>> 8, n = () => typeof e == "function" ? e(Buffer.alloc(12)) : n.node();
  n.node = () => {
    const g = Buffer.alloc(12), w = g.length;
    for (let b = 0; b < w; b++) g[b] = Math.random() * 256 & 255;
    return g;
  };
  const r = {
    genSalt: n
  };
  function a(g) {
    const w = Buffer.isBuffer(g) ? g : Buffer.from(g);
    this.keys = new Uint32Array([305419896, 591751049, 878082192]);
    for (let b = 0; b < w.length; b++)
      this.updateKeys(w[b]);
  }
  a.prototype.updateKeys = function(g) {
    const w = this.keys;
    return w[0] = l(w[0], g), w[1] += w[0] & 255, w[1] = s(w[1], 134775813) + 1, w[2] = l(w[2], w[1] >>> 24), g;
  }, a.prototype.next = function() {
    const g = (this.keys[2] | 2) >>> 0;
    return s(g, g ^ 1) >> 8 & 255;
  };
  function c(g) {
    const w = new a(g);
    return function(b) {
      const u = Buffer.alloc(b.length);
      let h = 0;
      for (let i of b)
        u[h++] = w.updateKeys(i ^ w.next());
      return u;
    };
  }
  function d(g) {
    const w = new a(g);
    return function(b, u, h = 0) {
      u || (u = Buffer.alloc(b.length));
      for (let i of b) {
        const p = w.next();
        u[h++] = i ^ p, w.updateKeys(i);
      }
      return u;
    };
  }
  function f(g, w, b) {
    if (!g || !Buffer.isBuffer(g) || g.length < 12)
      return Buffer.alloc(0);
    const u = c(b), h = u(g.slice(0, 12)), i = (w.flags & 8) === 8 ? w.timeHighByte : w.crc >>> 24;
    if (h[11] !== i)
      throw t.WRONG_PASSWORD();
    return u(g.slice(12));
  }
  function E(g) {
    Buffer.isBuffer(g) && g.length >= 12 ? r.genSalt = function() {
      return g.slice(0, 12);
    } : g === "node" ? r.genSalt = n.node : r.genSalt = n;
  }
  function _(g, w, b, u = !1) {
    g == null && (g = Buffer.alloc(0)), Buffer.isBuffer(g) || (g = Buffer.from(g.toString()));
    const h = d(b), i = r.genSalt();
    i[11] = w.crc >>> 24 & 255, u && (i[10] = w.crc >>> 16 & 255);
    const p = Buffer.alloc(g.length + 12);
    return h(i, p), h(g, p, 12);
  }
  return oo = { decrypt: f, encrypt: _, _salter: E }, oo;
}
var yf;
function Nv() {
  return yf || (yf = 1, kt.Deflater = Sv(), kt.Inflater = bv(), kt.ZipCrypto = Rv()), kt;
}
var ao, vf;
function Zf() {
  if (vf) return ao;
  vf = 1;
  var e = Mt(), t = Wf(), o = e.Constants, s = Nv();
  return ao = function(l, n) {
    var r = new t.EntryHeader(), a = Buffer.alloc(0), c = Buffer.alloc(0), d = !1, f = null, E = Buffer.alloc(0), _ = Buffer.alloc(0), g = !0;
    const w = l, b = typeof w.decoder == "object" ? w.decoder : e.decoder;
    g = b.hasOwnProperty("efs") ? b.efs : !1;
    function u() {
      return !n || !(n instanceof Uint8Array) ? Buffer.alloc(0) : (_ = r.loadLocalHeaderFromBinary(n), n.slice(r.realDataOffset, r.realDataOffset + r.compressedSize));
    }
    function h($) {
      if (r.flags_desc) {
        const R = {}, O = r.realDataOffset + r.compressedSize;
        if (n.readUInt32LE(O) == o.LOCSIG || n.readUInt32LE(O) == o.CENSIG)
          throw e.Errors.DESCRIPTOR_NOT_EXIST();
        if (n.readUInt32LE(O) == o.EXTSIG)
          R.crc = n.readUInt32LE(O + o.EXTCRC), R.compressedSize = n.readUInt32LE(O + o.EXTSIZ), R.size = n.readUInt32LE(O + o.EXTLEN);
        else if (n.readUInt16LE(O + 12) === 19280)
          R.crc = n.readUInt32LE(O + o.EXTCRC - 4), R.compressedSize = n.readUInt32LE(O + o.EXTSIZ - 4), R.size = n.readUInt32LE(O + o.EXTLEN - 4);
        else
          throw e.Errors.DESCRIPTOR_UNKNOWN();
        if (R.compressedSize !== r.compressedSize || R.size !== r.size || R.crc !== r.crc)
          throw e.Errors.DESCRIPTOR_FAULTY();
        if (e.crc32($) !== R.crc)
          return !1;
      } else if (e.crc32($) !== r.localHeader.crc)
        return !1;
      return !0;
    }
    function i($, R, O) {
      if (typeof R > "u" && typeof $ == "string" && (O = $, $ = void 0), d)
        return $ && R && R(Buffer.alloc(0), e.Errors.DIRECTORY_CONTENT_ERROR()), Buffer.alloc(0);
      var j = u();
      if (j.length === 0)
        return $ && R && R(j), j;
      if (r.encrypted) {
        if (typeof O != "string" && !Buffer.isBuffer(O))
          throw e.Errors.INVALID_PASS_PARAM();
        j = s.ZipCrypto.decrypt(j, r, O);
      }
      var L = Buffer.alloc(r.size);
      switch (r.method) {
        case e.Constants.STORED:
          if (j.copy(L), h(L))
            return $ && R && R(L), L;
          throw $ && R && R(L, e.Errors.BAD_CRC()), e.Errors.BAD_CRC();
        case e.Constants.DEFLATED:
          var V = new s.Inflater(j, r.size);
          if ($)
            V.inflateAsync(function(F) {
              F.copy(F, 0), R && (h(F) ? R(F) : R(F, e.Errors.BAD_CRC()));
            });
          else {
            if (V.inflate(L).copy(L, 0), !h(L))
              throw e.Errors.BAD_CRC(`"${b.decode(a)}"`);
            return L;
          }
          break;
        default:
          throw $ && R && R(Buffer.alloc(0), e.Errors.UNKNOWN_METHOD()), e.Errors.UNKNOWN_METHOD();
      }
    }
    function p($, R) {
      if ((!f || !f.length) && Buffer.isBuffer(n))
        return $ && R && R(u()), u();
      if (f.length && !d) {
        var O;
        switch (r.method) {
          case e.Constants.STORED:
            return r.compressedSize = r.size, O = Buffer.alloc(f.length), f.copy(O), $ && R && R(O), O;
          default:
          case e.Constants.DEFLATED:
            var j = new s.Deflater(f);
            if ($)
              j.deflateAsync(function(V) {
                O = Buffer.alloc(V.length), r.compressedSize = V.length, V.copy(O), R && R(O);
              });
            else {
              var L = j.deflate();
              return r.compressedSize = L.length, L;
            }
            j = null;
            break;
        }
      } else if ($ && R)
        R(Buffer.alloc(0));
      else
        return Buffer.alloc(0);
    }
    function v($, R) {
      return ($.readUInt32LE(R + 4) << 4) + $.readUInt32LE(R);
    }
    function m($) {
      try {
        for (var R = 0, O, j, L; R + 4 < $.length; )
          O = $.readUInt16LE(R), R += 2, j = $.readUInt16LE(R), R += 2, L = $.slice(R, R + j), R += j, o.ID_ZIP64 === O && y(L);
      } catch {
        throw e.Errors.EXTRA_FIELD_PARSE_ERROR();
      }
    }
    function y($) {
      var R, O, j, L;
      $.length >= o.EF_ZIP64_SCOMP && (R = v($, o.EF_ZIP64_SUNCOMP), r.size === o.EF_ZIP64_OR_32 && (r.size = R)), $.length >= o.EF_ZIP64_RHO && (O = v($, o.EF_ZIP64_SCOMP), r.compressedSize === o.EF_ZIP64_OR_32 && (r.compressedSize = O)), $.length >= o.EF_ZIP64_DSN && (j = v($, o.EF_ZIP64_RHO), r.offset === o.EF_ZIP64_OR_32 && (r.offset = j)), $.length >= o.EF_ZIP64_DSN + 4 && (L = $.readUInt32LE(o.EF_ZIP64_DSN), r.diskNumStart === o.EF_ZIP64_OR_16 && (r.diskNumStart = L));
    }
    return {
      get entryName() {
        return b.decode(a);
      },
      get rawEntryName() {
        return a;
      },
      set entryName($) {
        a = e.toBuffer($, b.encode);
        var R = a[a.length - 1];
        d = R === 47 || R === 92, r.fileNameLength = a.length;
      },
      get efs() {
        return typeof g == "function" ? g(this.entryName) : g;
      },
      get extra() {
        return E;
      },
      set extra($) {
        E = $, r.extraLength = $.length, m($);
      },
      get comment() {
        return b.decode(c);
      },
      set comment($) {
        if (c = e.toBuffer($, b.encode), r.commentLength = c.length, c.length > 65535) throw e.Errors.COMMENT_TOO_LONG();
      },
      get name() {
        var $ = b.decode(a);
        return d ? $.substr($.length - 1).split("/").pop() : $.split("/").pop();
      },
      get isDirectory() {
        return d;
      },
      getCompressedData: function() {
        return p(!1, null);
      },
      getCompressedDataAsync: function($) {
        p(!0, $);
      },
      setData: function($) {
        f = e.toBuffer($, e.decoder.encode), !d && f.length ? (r.size = f.length, r.method = e.Constants.DEFLATED, r.crc = e.crc32($), r.changed = !0) : r.method = e.Constants.STORED;
      },
      getData: function($) {
        return r.changed ? f : i(!1, null, $);
      },
      getDataAsync: function($, R) {
        r.changed ? $(f) : i(!0, $, R);
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
        r.flags_efs = this.efs, r.extraLength = E.length;
        var $ = r.centralHeaderToBinary(), R = e.Constants.CENHDR;
        return a.copy($, R), R += a.length, E.copy($, R), R += r.extraLength, c.copy($, R), $;
      },
      packLocalHeader: function() {
        let $ = 0;
        r.flags_efs = this.efs, r.extraLocalLength = _.length;
        const R = r.localHeaderToBinary(), O = Buffer.alloc(R.length + a.length + r.extraLocalLength);
        return R.copy(O, $), $ += R.length, a.copy(O, $), $ += a.length, _.copy(O, $), $ += _.length, O;
      },
      toJSON: function() {
        const $ = function(R) {
          return "<" + (R && R.length + " bytes buffer" || "null") + ">";
        };
        return {
          entryName: this.entryName,
          name: this.name,
          comment: this.comment,
          isDirectory: this.isDirectory,
          header: r.toJSON(),
          compressedData: $(n),
          data: $(f)
        };
      },
      toString: function() {
        return JSON.stringify(this.toJSON(), null, "	");
      }
    };
  }, ao;
}
var co, $f;
function Pv() {
  if ($f) return co;
  $f = 1;
  const e = Zf(), t = Wf(), o = Mt();
  return co = function(s, l) {
    var n = [], r = {}, a = Buffer.alloc(0), c = new t.MainHeader(), d = !1;
    const f = /* @__PURE__ */ new Set(), E = l, { noSort: _, decoder: g } = E;
    s ? u(E.readEntries) : d = !0;
    function w() {
      const i = /* @__PURE__ */ new Set();
      for (const p of Object.keys(r)) {
        const v = p.split("/");
        if (v.pop(), !!v.length)
          for (let m = 0; m < v.length; m++) {
            const y = v.slice(0, m + 1).join("/") + "/";
            i.add(y);
          }
      }
      for (const p of i)
        if (!(p in r)) {
          const v = new e(E);
          v.entryName = p, v.attr = 16, v.temporary = !0, n.push(v), r[v.entryName] = v, f.add(v);
        }
    }
    function b() {
      if (d = !0, r = {}, c.diskEntries > (s.length - c.offset) / o.Constants.CENHDR)
        throw o.Errors.DISK_ENTRY_TOO_LARGE();
      n = new Array(c.diskEntries);
      for (var i = c.offset, p = 0; p < n.length; p++) {
        var v = i, m = new e(E, s);
        m.header = s.slice(v, v += o.Constants.CENHDR), m.entryName = s.slice(v, v += m.header.fileNameLength), m.header.extraLength && (m.extra = s.slice(v, v += m.header.extraLength)), m.header.commentLength && (m.comment = s.slice(v, v + m.header.commentLength)), i += m.header.centralHeaderSize, n[p] = m, r[m.entryName] = m;
      }
      f.clear(), w();
    }
    function u(i) {
      var p = s.length - o.Constants.ENDHDR, v = Math.max(0, p - 65535), m = v, y = s.length, $ = -1, R = 0;
      for ((typeof E.trailingSpace == "boolean" ? E.trailingSpace : !1) && (v = 0), p; p >= m; p--)
        if (s[p] === 80) {
          if (s.readUInt32LE(p) === o.Constants.ENDSIG) {
            $ = p, R = p, y = p + o.Constants.ENDHDR, m = p - o.Constants.END64HDR;
            continue;
          }
          if (s.readUInt32LE(p) === o.Constants.END64SIG) {
            m = v;
            continue;
          }
          if (s.readUInt32LE(p) === o.Constants.ZIP64SIG) {
            $ = p, y = p + o.readBigUInt64LE(s, p + o.Constants.ZIP64SIZE) + o.Constants.ZIP64LEAD;
            break;
          }
        }
      if ($ == -1) throw o.Errors.INVALID_FORMAT();
      c.loadFromBinary(s.slice($, y)), c.commentLength && (a = s.slice(R + o.Constants.ENDHDR)), i && b();
    }
    function h() {
      n.length > 1 && !_ && n.sort((i, p) => i.entryName.toLowerCase().localeCompare(p.entryName.toLowerCase()));
    }
    return {
      /**
       * Returns an array of ZipEntry objects existent in the current opened archive
       * @return Array
       */
      get entries() {
        return d || b(), n.filter((i) => !f.has(i));
      },
      /**
       * Archive comment
       * @return {String}
       */
      get comment() {
        return g.decode(a);
      },
      set comment(i) {
        a = o.toBuffer(i, g.encode), c.commentLength = a.length;
      },
      getEntryCount: function() {
        return d ? n.length : c.diskEntries;
      },
      forEach: function(i) {
        this.entries.forEach(i);
      },
      /**
       * Returns a reference to the entry with the given name or null if entry is inexistent
       *
       * @param entryName
       * @return ZipEntry
       */
      getEntry: function(i) {
        return d || b(), r[i] || null;
      },
      /**
       * Adds the given entry to the entry list
       *
       * @param entry
       */
      setEntry: function(i) {
        d || b(), n.push(i), r[i.entryName] = i, c.totalEntries = n.length;
      },
      /**
       * Removes the file with the given name from the entry list.
       *
       * If the entry is a directory, then all nested files and directories will be removed
       * @param entryName
       * @returns {void}
       */
      deleteFile: function(i, p = !0) {
        d || b();
        const v = r[i];
        this.getEntryChildren(v, p).map((y) => y.entryName).forEach(this.deleteEntry);
      },
      /**
       * Removes the entry with the given name from the entry list.
       *
       * @param {string} entryName
       * @returns {void}
       */
      deleteEntry: function(i) {
        d || b();
        const p = r[i], v = n.indexOf(p);
        v >= 0 && (n.splice(v, 1), delete r[i], c.totalEntries = n.length);
      },
      /**
       *  Iterates and returns all nested files and directories of the given entry
       *
       * @param entry
       * @return Array
       */
      getEntryChildren: function(i, p = !0) {
        if (d || b(), typeof i == "object")
          if (i.isDirectory && p) {
            const v = [], m = i.entryName;
            for (const y of n)
              y.entryName.startsWith(m) && v.push(y);
            return v;
          } else
            return [i];
        return [];
      },
      /**
       *  How many child elements entry has
       *
       * @param {ZipEntry} entry
       * @return {integer}
       */
      getChildCount: function(i) {
        if (i && i.isDirectory) {
          const p = this.getEntryChildren(i);
          return p.includes(i) ? p.length - 1 : p.length;
        }
        return 0;
      },
      /**
       * Returns the zip file
       *
       * @return Buffer
       */
      compressToBuffer: function() {
        d || b(), h();
        const i = [], p = [];
        let v = 0, m = 0;
        c.size = 0, c.offset = 0;
        let y = 0;
        for (const O of this.entries) {
          const j = O.getCompressedData();
          O.header.offset = m;
          const L = O.packLocalHeader(), V = L.length + j.length;
          m += V, i.push(L), i.push(j);
          const F = O.packCentralHeader();
          p.push(F), c.size += F.length, v += V + F.length, y++;
        }
        v += c.mainHeaderSize, c.offset = m, c.totalEntries = y, m = 0;
        const $ = Buffer.alloc(v);
        for (const O of i)
          O.copy($, m), m += O.length;
        for (const O of p)
          O.copy($, m), m += O.length;
        const R = c.toBinary();
        return a && a.copy(R, o.Constants.ENDHDR), R.copy($, m), s = $, d = !1, $;
      },
      toAsyncBuffer: function(i, p, v, m) {
        try {
          d || b(), h();
          const y = [], $ = [];
          let R = 0, O = 0, j = 0;
          c.size = 0, c.offset = 0;
          const L = function(V) {
            if (V.length > 0) {
              const F = V.shift(), M = F.entryName + F.extra.toString();
              v && v(M), F.getCompressedDataAsync(function(z) {
                m && m(M), F.header.offset = O;
                const J = F.packLocalHeader(), x = J.length + z.length;
                O += x, y.push(J), y.push(z);
                const B = F.packCentralHeader();
                $.push(B), c.size += B.length, R += x + B.length, j++, L(V);
              });
            } else {
              R += c.mainHeaderSize, c.offset = O, c.totalEntries = j, O = 0;
              const F = Buffer.alloc(R);
              y.forEach(function(z) {
                z.copy(F, O), O += z.length;
              }), $.forEach(function(z) {
                z.copy(F, O), O += z.length;
              });
              const M = c.toBinary();
              a && a.copy(M, o.Constants.ENDHDR), M.copy(F, O), s = F, d = !1, i(F);
            }
          };
          L(Array.from(this.entries));
        } catch (y) {
          p(y);
        }
      }
    };
  }, co;
}
var uo, gf;
function Iv() {
  if (gf) return uo;
  gf = 1;
  const e = Mt(), t = Re, o = Zf(), s = Pv(), l = (...c) => e.findLast(c, (d) => typeof d == "boolean"), n = (...c) => e.findLast(c, (d) => typeof d == "string"), r = (...c) => e.findLast(c, (d) => typeof d == "function"), a = {
    // option "noSort" : if true it disables files sorting
    noSort: !1,
    // read entries during load (initial loading may be slower)
    readEntries: !1,
    // default method is none
    method: e.Constants.NONE,
    // file system
    fs: null
  };
  return uo = function(c, d) {
    let f = null;
    const E = Object.assign(/* @__PURE__ */ Object.create(null), a);
    c && typeof c == "object" && (c instanceof Uint8Array || (Object.assign(E, c), c = E.input ? E.input : void 0, E.input && delete E.input), Buffer.isBuffer(c) && (f = c, E.method = e.Constants.BUFFER, c = void 0)), Object.assign(E, d);
    const _ = new e(E);
    if ((typeof E.decoder != "object" || typeof E.decoder.encode != "function" || typeof E.decoder.decode != "function") && (E.decoder = e.decoder), c && typeof c == "string")
      if (_.fs.existsSync(c))
        E.method = e.Constants.FILE, E.filename = c, f = _.fs.readFileSync(c);
      else
        throw e.Errors.INVALID_FILENAME();
    const g = new s(f, E), { canonical: w, sanitize: b, zipnamefix: u } = e;
    function h(m) {
      if (m && g) {
        var y;
        if (typeof m == "string" && (y = g.getEntry(t.posix.normalize(m))), typeof m == "object" && typeof m.entryName < "u" && typeof m.header < "u" && (y = g.getEntry(m.entryName)), y)
          return y;
      }
      return null;
    }
    function i(m) {
      const { join: y, normalize: $, sep: R } = t.posix;
      return y(".", $(R + m.split("\\").join(R) + R));
    }
    function p(m) {
      return m instanceof RegExp ? /* @__PURE__ */ function(y) {
        return function($) {
          return y.test($);
        };
      }(m) : typeof m != "function" ? () => !0 : m;
    }
    const v = (m, y) => {
      let $ = y.slice(-1);
      return $ = $ === _.sep ? _.sep : "", t.relative(m, y) + $;
    };
    return {
      /**
       * Extracts the given entry from the archive and returns the content as a Buffer object
       * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
       * @param {Buffer|string} [pass] - password
       * @return Buffer or Null in case of error
       */
      readFile: function(m, y) {
        var $ = h(m);
        return $ && $.getData(y) || null;
      },
      /**
       * Returns how many child elements has on entry (directories) on files it is always 0
       * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
       * @returns {integer}
       */
      childCount: function(m) {
        const y = h(m);
        if (y)
          return g.getChildCount(y);
      },
      /**
       * Asynchronous readFile
       * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
       * @param {callback} callback
       *
       * @return Buffer or Null in case of error
       */
      readFileAsync: function(m, y) {
        var $ = h(m);
        $ ? $.getDataAsync(y) : y(null, "getEntry failed for:" + m);
      },
      /**
       * Extracts the given entry from the archive and returns the content as plain text in the given encoding
       * @param {ZipEntry|string} entry - ZipEntry object or String with the full path of the entry
       * @param {string} encoding - Optional. If no encoding is specified utf8 is used
       *
       * @return String
       */
      readAsText: function(m, y) {
        var $ = h(m);
        if ($) {
          var R = $.getData();
          if (R && R.length)
            return R.toString(y || "utf8");
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
      readAsTextAsync: function(m, y, $) {
        var R = h(m);
        R ? R.getDataAsync(function(O, j) {
          if (j) {
            y(O, j);
            return;
          }
          O && O.length ? y(O.toString($ || "utf8")) : y("");
        }) : y("");
      },
      /**
       * Remove the entry from the file or the entry and all it's nested directories and files if the given entry is a directory
       *
       * @param {ZipEntry|string} entry
       * @returns {void}
       */
      deleteFile: function(m, y = !0) {
        var $ = h(m);
        $ && g.deleteFile($.entryName, y);
      },
      /**
       * Remove the entry from the file or directory without affecting any nested entries
       *
       * @param {ZipEntry|string} entry
       * @returns {void}
       */
      deleteEntry: function(m) {
        var y = h(m);
        y && g.deleteEntry(y.entryName);
      },
      /**
       * Adds a comment to the zip. The zip must be rewritten after adding the comment.
       *
       * @param {string} comment
       */
      addZipComment: function(m) {
        g.comment = m;
      },
      /**
       * Returns the zip comment
       *
       * @return String
       */
      getZipComment: function() {
        return g.comment || "";
      },
      /**
       * Adds a comment to a specified zipEntry. The zip must be rewritten after adding the comment
       * The comment cannot exceed 65535 characters in length
       *
       * @param {ZipEntry} entry
       * @param {string} comment
       */
      addZipEntryComment: function(m, y) {
        var $ = h(m);
        $ && ($.comment = y);
      },
      /**
       * Returns the comment of the specified entry
       *
       * @param {ZipEntry} entry
       * @return String
       */
      getZipEntryComment: function(m) {
        var y = h(m);
        return y && y.comment || "";
      },
      /**
       * Updates the content of an existing entry inside the archive. The zip must be rewritten after updating the content
       *
       * @param {ZipEntry} entry
       * @param {Buffer} content
       */
      updateFile: function(m, y) {
        var $ = h(m);
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
      addLocalFile: function(m, y, $, R) {
        if (_.fs.existsSync(m)) {
          y = y ? i(y) : "";
          const O = t.win32.basename(t.win32.normalize(m));
          y += $ || O;
          const j = _.fs.statSync(m), L = j.isFile() ? _.fs.readFileSync(m) : Buffer.alloc(0);
          j.isDirectory() && (y += _.sep), this.addFile(y, L, R, j);
        } else
          throw e.Errors.FILE_NOT_FOUND(m);
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
      addLocalFileAsync: function(m, y) {
        m = typeof m == "object" ? m : { localPath: m };
        const $ = t.resolve(m.localPath), { comment: R } = m;
        let { zipPath: O, zipName: j } = m;
        const L = this;
        _.fs.stat($, function(V, F) {
          if (V) return y(V, !1);
          O = O ? i(O) : "";
          const M = t.win32.basename(t.win32.normalize($));
          if (O += j || M, F.isFile())
            _.fs.readFile($, function(z, J) {
              return z ? y(z, !1) : (L.addFile(O, J, R, F), setImmediate(y, void 0, !0));
            });
          else if (F.isDirectory())
            return O += _.sep, L.addFile(O, Buffer.alloc(0), R, F), setImmediate(y, void 0, !0);
        });
      },
      /**
       * Adds a local directory and all its nested files and directories to the archive
       *
       * @param {string} localPath - local path to the folder
       * @param {string} [zipPath] - optional path inside zip
       * @param {(RegExp|function)} [filter] - optional RegExp or Function if files match will be included.
       */
      addLocalFolder: function(m, y, $) {
        if ($ = p($), y = y ? i(y) : "", m = t.normalize(m), _.fs.existsSync(m)) {
          const R = _.findFiles(m), O = this;
          if (R.length)
            for (const j of R) {
              const L = t.join(y, v(m, j));
              $(L) && O.addLocalFile(j, t.dirname(L));
            }
        } else
          throw e.Errors.FILE_NOT_FOUND(m);
      },
      /**
       * Asynchronous addLocalFolder
       * @param {string} localPath
       * @param {callback} callback
       * @param {string} [zipPath] optional path inside zip
       * @param {RegExp|function} [filter] optional RegExp or Function if files match will
       *               be included.
       */
      addLocalFolderAsync: function(m, y, $, R) {
        R = p(R), $ = $ ? i($) : "", m = t.normalize(m);
        var O = this;
        _.fs.open(m, "r", function(j) {
          if (j && j.code === "ENOENT")
            y(void 0, e.Errors.FILE_NOT_FOUND(m));
          else if (j)
            y(void 0, j);
          else {
            var L = _.findFiles(m), V = -1, F = function() {
              if (V += 1, V < L.length) {
                var M = L[V], z = v(m, M).split("\\").join("/");
                z = z.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, ""), R(z) ? _.fs.stat(M, function(J, x) {
                  J && y(void 0, J), x.isFile() ? _.fs.readFile(M, function(B, W) {
                    B ? y(void 0, B) : (O.addFile($ + z, W, "", x), F());
                  }) : (O.addFile($ + z + "/", Buffer.alloc(0), "", x), F());
                }) : process.nextTick(() => {
                  F();
                });
              } else
                y(!0, void 0);
            };
            F();
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
      addLocalFolderAsync2: function(m, y) {
        const $ = this;
        m = typeof m == "object" ? m : { localPath: m }, localPath = t.resolve(i(m.localPath));
        let { zipPath: R, filter: O, namefix: j } = m;
        O instanceof RegExp ? O = /* @__PURE__ */ function(F) {
          return function(M) {
            return F.test(M);
          };
        }(O) : typeof O != "function" && (O = function() {
          return !0;
        }), R = R ? i(R) : "", j == "latin1" && (j = (F) => F.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, "")), typeof j != "function" && (j = (F) => F);
        const L = (F) => t.join(R, j(v(localPath, F))), V = (F) => t.win32.basename(t.win32.normalize(j(F)));
        _.fs.open(localPath, "r", function(F) {
          F && F.code === "ENOENT" ? y(void 0, e.Errors.FILE_NOT_FOUND(localPath)) : F ? y(void 0, F) : _.findFilesAsync(localPath, function(M, z) {
            if (M) return y(M);
            z = z.filter((J) => O(L(J))), z.length || y(void 0, !1), setImmediate(
              z.reverse().reduce(function(J, x) {
                return function(B, W) {
                  if (B || W === !1) return setImmediate(J, B, !1);
                  $.addLocalFileAsync(
                    {
                      localPath: x,
                      zipPath: t.dirname(L(x)),
                      zipName: V(x)
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
      addLocalFolderPromise: function(m, y) {
        return new Promise(($, R) => {
          this.addLocalFolderAsync2(Object.assign({ localPath: m }, y), (O, j) => {
            O && R(O), j && $(this);
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
      addFile: function(m, y, $, R) {
        m = u(m);
        let O = h(m);
        const j = O != null;
        j || (O = new o(E), O.entryName = m), O.comment = $ || "";
        const L = typeof R == "object" && R instanceof _.fs.Stats;
        L && (O.header.time = R.mtime);
        var V = O.isDirectory ? 16 : 0;
        let F = O.isDirectory ? 16384 : 32768;
        return L ? F |= 4095 & R.mode : typeof R == "number" ? F |= 4095 & R : F |= O.isDirectory ? 493 : 420, V = (V | F << 16) >>> 0, O.attr = V, O.setData(y), j || g.setEntry(O), O;
      },
      /**
       * Returns an array of ZipEntry objects representing the files and folders inside the archive
       *
       * @param {string} [password]
       * @returns Array
       */
      getEntries: function(m) {
        return g.password = m, g ? g.entries : [];
      },
      /**
       * Returns a ZipEntry object representing the file or folder specified by ``name``.
       *
       * @param {string} name
       * @return ZipEntry
       */
      getEntry: function(m) {
        return h(m);
      },
      getEntryCount: function() {
        return g.getEntryCount();
      },
      forEach: function(m) {
        return g.forEach(m);
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
      extractEntryTo: function(m, y, $, R, O, j) {
        R = l(!1, R), O = l(!1, O), $ = l(!0, $), j = n(O, j);
        var L = h(m);
        if (!L)
          throw e.Errors.NO_ENTRY();
        var V = w(L.entryName), F = b(y, j && !L.isDirectory ? j : $ ? V : t.basename(V));
        if (L.isDirectory) {
          var M = g.getEntryChildren(L);
          return M.forEach(function(x) {
            if (x.isDirectory) return;
            var B = x.getData();
            if (!B)
              throw e.Errors.CANT_EXTRACT_FILE();
            var W = w(x.entryName), q = b(y, $ ? W : t.basename(W));
            const I = O ? x.header.fileAttr : void 0;
            _.writeFileTo(q, B, R, I);
          }), !0;
        }
        var z = L.getData(g.password);
        if (!z) throw e.Errors.CANT_EXTRACT_FILE();
        if (_.fs.existsSync(F) && !R)
          throw e.Errors.CANT_OVERRIDE();
        const J = O ? m.header.fileAttr : void 0;
        return _.writeFileTo(F, z, R, J), !0;
      },
      /**
       * Test the archive
       * @param {string} [pass]
       */
      test: function(m) {
        if (!g)
          return !1;
        for (var y in g.entries)
          try {
            if (y.isDirectory)
              continue;
            var $ = g.entries[y].getData(m);
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
      extractAllTo: function(m, y, $, R) {
        if ($ = l(!1, $), R = n($, R), y = l(!1, y), !g) throw e.Errors.NO_ZIP();
        g.entries.forEach(function(O) {
          var j = b(m, w(O.entryName));
          if (O.isDirectory) {
            _.makeDir(j);
            return;
          }
          var L = O.getData(R);
          if (!L)
            throw e.Errors.CANT_EXTRACT_FILE();
          const V = $ ? O.header.fileAttr : void 0;
          _.writeFileTo(j, L, y, V);
          try {
            _.fs.utimesSync(j, O.header.time, O.header.time);
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
      extractAllToAsync: function(m, y, $, R) {
        if (R = r(y, $, R), $ = l(!1, $), y = l(!1, y), !R)
          return new Promise((F, M) => {
            this.extractAllToAsync(m, y, $, function(z) {
              z ? M(z) : F(this);
            });
          });
        if (!g) {
          R(e.Errors.NO_ZIP());
          return;
        }
        m = t.resolve(m);
        const O = (F) => b(m, t.normalize(w(F.entryName))), j = (F, M) => new Error(F + ': "' + M + '"'), L = [], V = [];
        g.entries.forEach((F) => {
          F.isDirectory ? L.push(F) : V.push(F);
        });
        for (const F of L) {
          const M = O(F), z = $ ? F.header.fileAttr : void 0;
          try {
            _.makeDir(M), z && _.fs.chmodSync(M, z), _.fs.utimesSync(M, F.header.time, F.header.time);
          } catch {
            R(j("Unable to create folder", M));
          }
        }
        V.reverse().reduce(function(F, M) {
          return function(z) {
            if (z)
              F(z);
            else {
              const J = t.normalize(w(M.entryName)), x = b(m, J);
              M.getDataAsync(function(B, W) {
                if (W)
                  F(W);
                else if (!B)
                  F(e.Errors.CANT_EXTRACT_FILE());
                else {
                  const q = $ ? M.header.fileAttr : void 0;
                  _.writeFileToAsync(x, B, y, q, function(I) {
                    I || F(j("Unable to write file", x)), _.fs.utimes(x, M.header.time, M.header.time, function(A) {
                      A ? F(j("Unable to set times", x)) : F();
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
      writeZip: function(m, y) {
        if (arguments.length === 1 && typeof m == "function" && (y = m, m = ""), !m && E.filename && (m = E.filename), !!m) {
          var $ = g.compressToBuffer();
          if ($) {
            var R = _.writeFileTo(m, $, !0);
            typeof y == "function" && y(R ? null : new Error("failed"), "");
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
      writeZipPromise: function(m, y) {
        const { overwrite: $, perm: R } = Object.assign({ overwrite: !0 }, y);
        return new Promise((O, j) => {
          !m && E.filename && (m = E.filename), m || j("ADM-ZIP: ZIP File Name Missing"), this.toBufferPromise().then((L) => {
            const V = (F) => F ? O(F) : j("ADM-ZIP: Wasn't able to write zip file");
            _.writeFileToAsync(m, L, $, R, V);
          }, j);
        });
      },
      /**
       * @returns {Promise<Buffer>} A promise to the Buffer.
       */
      toBufferPromise: function() {
        return new Promise((m, y) => {
          g.toAsyncBuffer(m, y);
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
      toBuffer: function(m, y, $, R) {
        return typeof m == "function" ? (g.toAsyncBuffer(m, y, $, R), null) : g.compressToBuffer();
      }
    };
  }, uo;
}
var Ov = Iv();
const _f = /* @__PURE__ */ ho(Ov);
class Lt {
  constructor(t, o) {
    this.bw = t, this.version = o;
    const s = Lt.#s;
    this.#t = process.platform === "win32", t.webContents.on("devtools-opened", () => this.#h()), s.handle("openDevTools", () => t.webContents.openDevTools()), this.#e.getVersion = o, s.handle("getInfo", () => this.#e), s.handle("inited", (n, r, a) => this.#o(r, a)), s.handle("fetch", async (n, r) => {
      const a = await fetch(r, { cache: "no-store" });
      return {
        ok: a.ok,
        txt: await a.text()
      };
    }), s.handle("fetchAb", async (n, r) => {
      const a = await fetch(r, { cache: "no-store" });
      return {
        ok: a.ok,
        ab: await a.arrayBuffer()
      };
    }), s.handle("existsSync", (n, r) => De.existsSync(r)), s.handle("copy", (n, r, a) => De.copy(r, a)), s.handle("remove", (n, r) => De.remove(r)), s.handle("ensureFile", (n, r) => De.ensureFile(r)), s.handle("readFile", (n, r, a) => De.readFile(r, a)), s.handle("writeFile", (n, r, a, c) => De.writeFile(r, a, c)), s.handle("appendFile", (n, r, a) => De.appendFile(r, a).catch((c) => console.error(c))), s.handle("outputFile", (n, r, a) => De.outputFile(r, a).catch((c) => console.error(c))), s.handle("win_close", () => t.close()), s.handle("win_setTitle", (n, r) => t.setTitle(r)), s.handle("showMessageBox", (n, r) => Do.showMessageBox(t, r)), s.handle("showOpenDialog", (n, r) => Do.showOpenDialog(t, r)), s.handle("capturePage", (n, r, a, c) => t.webContents.capturePage().then(async (d) => {
      await De.ensureFile(r);
      const f = d.resize({ width: a, height: c, quality: "best" }), E = r.endsWith(".png") ? f.toPNG() : f.toJPEG(80);
      await De.writeFile(r, E);
    })), s.handle("navigate_to", (n, r) => Yf.openExternal(r));
    let l;
    s.handle("Store", (n, r) => {
      l = new rf(r);
    }), s.handle("flush", (n, r) => {
      l.store = r;
    }), s.handle("Store_isEmpty", () => l.size === 0), s.handle("Store_get", () => l.store), s.handle("zip", async (n, r, a) => {
      const c = new _f();
      c.addLocalFolder(r), await c.writeZipPromise(a);
    }), s.handle("unzip", async (n, r, a) => {
      await De.remove(a), await De.ensureDir(a), new _f(r).extractAllTo(a, !0);
    }), s.handle("isSimpleFullScreen", () => t.simpleFullScreen), this.#t ? (s.handle("setSimpleFullScreen", (n, r) => {
      this.#n = () => {
      }, t.setSimpleFullScreen(r), r || (t.setPosition(this.#r, this.#c), t.setContentSize(this.#i, this.#u)), this.#n = () => this.#l();
    }), t.on("enter-full-screen", () => {
      this.#n = () => {
      }, t.setContentSize(this.#a.width, this.#a.height), this.#n = () => this.#l();
    }), t.on("leave-full-screen", () => {
      this.#d(!1, this.#r, this.#c, this.#i, this.#u);
    })) : s.handle("setSimpleFullScreen", (n, r) => {
      t.setSimpleFullScreen(r), !r && t.setContentSize(this.#i, this.#u);
    }), s.handle("window", (n, r, a, c, d, f) => this.#d(r, a, c, d, f)), t.on("move", () => this.#n()), t.on("resize", () => this.#n()), this.#p();
  }
  static init(t) {
    Lt.#s = t, rf.initRenderer();
  }
  static #s;
  #t;
  // import {os} from 'platform'; は動作しない
  #e = {
    getAppPath: Ut.getAppPath(),
    isPackaged: Ut.isPackaged,
    downloads: Ut.getPath("downloads"),
    userData: Ut.getPath("userData"),
    getVersion: "",
    // constructor で
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any, no-process-env
    env: { ...process.env },
    platform: process.platform,
    arch: process.arch
  };
  #r = 0;
  #c = 0;
  #i = 0;
  #u = 0;
  //MARK: Renderer からの初期化通知を受けて
  #o(t, o) {
    const { width: s, height: l } = t.window, { c: n, x: r, y: a, w: c } = o;
    this.#f = s / l;
    const d = c === s ? l : c / this.#f;
    if (this.#t || this.bw.setAspectRatio(this.#f), this.#d(n, r, a, c, d), this.bw.show(), this.#n = () => this.#l(), t.debug.devtool) {
      this.#h = () => {
      }, this.openDevTools = () => this.bw.webContents.openDevTools({
        mode: "detach"
        // 別ウィンドウに切り離すが画面内に戻せない
        //	activate: false,	// 他のウインドウの後ろに回って見失いがち
      }), this.openDevTools();
      return;
    }
    this.#h = () => {
      this.bw.webContents.closeDevTools(), this.bw.setTitle("DevToolは禁止されています。許可する場合は【プロジェクト設定】の【devtool】をONに。"), this.sendShutdown();
    };
  }
  #f = 0;
  #h = () => this.bw.webContents.closeDevTools();
  // 開こうとしたら閉じる
  //MARK: 現時点でウインドウが存在するデスクトップでの情報取得
  #p() {
    const t = Ao.getCursorScreenPoint(), o = Ao.getDisplayNearestPoint(t);
    this.#a = o.workAreaSize;
  }
  #a;
  #n = () => {
  };
  #l() {
    if (this.#m) return;
    this.#n = () => {
    };
    const [t, o] = this.bw.getPosition(), [s, l] = this.bw.getContentSize();
    this.#m = setTimeout(() => {
      this.#m = void 0;
      const [n = 0, r = 0] = this.bw.getPosition(), [a = 0, c = 0] = this.bw.getContentSize();
      if (t !== n || o !== r || s !== a || l !== c) {
        this.#l();
        return;
      }
      this.#n = () => this.#l();
      let d = a, f = c;
      this.#t && (s === a ? f = a / this.#f : d = c * this.#f), this.#d(!1, n, r, d, f);
    }, 1e3 / 60 * 10);
  }
  #m = void 0;
  #d(t, o, s, l, n) {
    if (this.bw.simpleFullScreen) return;
    console.log(`fn:appMain.ts window c:${String(t)} (${String(o)},${String(s)},${String(l)},${String(n)}) scr(${String(this.#a.width)},${String(this.#a.height)})`), this.#n = () => {
    };
    const r = this.#r = Math.round(t ? (this.#a.width - l) * 0.5 : o), a = this.#c = Math.round(t ? (this.#a.height - n) * 0.5 : s);
    this.bw.setPosition(r, a);
    const c = this.#i = Math.round(l), d = this.#u = Math.round(n);
    this.bw.setContentSize(c, d), t || this.#p(), this.sendSaveWinInf({ x: r, y: a, w: c, h: d }), this.#n = () => this.#l();
  }
  sendShutdown() {
  }
  sendSaveWinInf(t) {
  }
  // doc/app.js 等から呼ぶので public
  openDevTools = () => {
  };
}
class Tv {
  constructor() {
    this.listeners = [], this.handlers = [];
  }
  /**
   * Listen to `channel`.
   */
  on(t, o) {
    this.listeners.push(t), Vt.on(t, o);
  }
  /**
   * Handle a renderer invoke request.
   */
  handle(t, o) {
    this.handlers.push(t), Vt.handle(t, o);
  }
  /**
   * Dispose all listeners and handlers.
   */
  dispose() {
    this.listeners.forEach((t) => Vt.removeAllListeners(t)), this.listeners = [], this.handlers.forEach((t) => Vt.removeHandler(t)), this.handlers = [];
  }
}
class Cv {
  /**
   * Send an asynchronous message to the renderer process.
   */
  send(t, o, ...s) {
    t.send(o, ...s);
  }
}
class Xf extends Lt {
  static initRenderer(t, o) {
    let s, l = () => {
    };
    try {
      Lt.init(new Tv()), s = new Qf({
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
      const n = new Xf(s, o);
      l = () => n.openDevTools();
    } catch (n) {
      throw console.error(`early err:${String(n)}`), l(), "initRenderer error";
    }
    return s;
  }
  #s = new Cv();
  sendShutdown() {
    this.#s.send(this.bw.webContents, "shutdown");
  }
  sendSaveWinInf(t) {
    this.#s.send(this.bw.webContents, "save_win_inf", t);
  }
}
export {
  Xf as appMain
};
//# sourceMappingURL=appMain.js.map
