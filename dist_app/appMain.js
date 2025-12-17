import electron, { BrowserWindow, app, dialog, ipcMain, screen, shell } from "electron";
import process$1 from "node:process";
import path from "node:path";
import { isDeepStrictEqual, promisify } from "node:util";
import fs from "node:fs";
import crypto from "node:crypto";
import assert from "node:assert";
import os from "node:os";
import "node:events";
import "node:stream";
var __create = Object.create, __defProp = Object.defineProperty, __getOwnPropDesc = Object.getOwnPropertyDescriptor, __getOwnPropNames = Object.getOwnPropertyNames, __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty, __esmMin = (r, s) => () => (r && (s = r(r = 0)), s), __commonJSMin = (r, s) => () => (s || r((s = { exports: {} }).exports, s), s.exports), __export = (r, s) => {
	let c = {};
	for (var l in r) __defProp(c, l, {
		get: r[l],
		enumerable: !0
	});
	return s && __defProp(c, Symbol.toStringTag, { value: "Module" }), c;
}, __copyProps = (r, s, c, l) => {
	if (s && typeof s == "object" || typeof s == "function") for (var u = __getOwnPropNames(s), d = 0, f = u.length, p; d < f; d++) p = u[d], !__hasOwnProp.call(r, p) && p !== c && __defProp(r, p, {
		get: ((r) => s[r]).bind(null, p),
		enumerable: !(l = __getOwnPropDesc(s, p)) || l.enumerable
	});
	return r;
}, __toESM = (r, s, c) => (c = r == null ? {} : __create(__getProtoOf(r)), __copyProps(s || !r || !r.__esModule ? __defProp(c, "default", {
	value: r,
	enumerable: !0
}) : c, r)), __toCommonJS = (r) => __hasOwnProp.call(r, "module.exports") ? r["module.exports"] : __copyProps(__defProp({}, "__esModule", { value: !0 }), r), __require = /* @__PURE__ */ ((r) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(r, { get: (r, s) => (typeof require < "u" ? require : r)[s] }) : r)(function(r) {
	if (typeof require < "u") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + r + "\" in an environment that doesn't expose the `require` function.");
}), require_universalify = /* @__PURE__ */ __commonJSMin(((r) => {
	r.fromCallback = function(r) {
		return Object.defineProperty(function(...s) {
			if (typeof s[s.length - 1] == "function") r.apply(this, s);
			else return new Promise((c, l) => {
				s.push((r, s) => r == null ? c(s) : l(r)), r.apply(this, s);
			});
		}, "name", { value: r.name });
	}, r.fromPromise = function(r) {
		return Object.defineProperty(function(...s) {
			let c = s[s.length - 1];
			if (typeof c != "function") return r.apply(this, s);
			s.pop(), r.apply(this, s).then((r) => c(null, r), c);
		}, "name", { value: r.name });
	};
})), require_polyfills = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = __require("constants"), l = process.cwd, u = null, d = process.env.GRACEFUL_FS_PLATFORM || process.platform;
	process.cwd = function() {
		return u ||= l.call(process), u;
	};
	try {
		process.cwd();
	} catch {}
	if (typeof process.chdir == "function") {
		var f = process.chdir;
		process.chdir = function(r) {
			u = null, f.call(process, r);
		}, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, f);
	}
	s.exports = p;
	function p(r) {
		c.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && s(r), r.lutimes || l(r), r.chown = p(r.chown), r.fchown = p(r.fchown), r.lchown = p(r.lchown), r.chmod = u(r.chmod), r.fchmod = u(r.fchmod), r.lchmod = u(r.lchmod), r.chownSync = m(r.chownSync), r.fchownSync = m(r.fchownSync), r.lchownSync = m(r.lchownSync), r.chmodSync = f(r.chmodSync), r.fchmodSync = f(r.fchmodSync), r.lchmodSync = f(r.lchmodSync), r.stat = h(r.stat), r.fstat = h(r.fstat), r.lstat = h(r.lstat), r.statSync = g(r.statSync), r.fstatSync = g(r.fstatSync), r.lstatSync = g(r.lstatSync), r.chmod && !r.lchmod && (r.lchmod = function(r, s, c) {
			c && process.nextTick(c);
		}, r.lchmodSync = function() {}), r.chown && !r.lchown && (r.lchown = function(r, s, c, l) {
			l && process.nextTick(l);
		}, r.lchownSync = function() {}), d === "win32" && (r.rename = typeof r.rename == "function" ? (function(s) {
			function c(c, l, u) {
				var d = Date.now(), f = 0;
				s(c, l, function p(m) {
					if (m && (m.code === "EACCES" || m.code === "EPERM" || m.code === "EBUSY") && Date.now() - d < 6e4) {
						setTimeout(function() {
							r.stat(l, function(r, d) {
								r && r.code === "ENOENT" ? s(c, l, p) : u(m);
							});
						}, f), f < 100 && (f += 10);
						return;
					}
					u && u(m);
				});
			}
			return Object.setPrototypeOf && Object.setPrototypeOf(c, s), c;
		})(r.rename) : r.rename), r.read = typeof r.read == "function" ? (function(s) {
			function c(c, l, u, d, f, p) {
				var m;
				if (p && typeof p == "function") {
					var h = 0;
					m = function(g, _, v) {
						if (g && g.code === "EAGAIN" && h < 10) return h++, s.call(r, c, l, u, d, f, m);
						p.apply(this, arguments);
					};
				}
				return s.call(r, c, l, u, d, f, m);
			}
			return Object.setPrototypeOf && Object.setPrototypeOf(c, s), c;
		})(r.read) : r.read, r.readSync = typeof r.readSync == "function" ? (function(s) {
			return function(c, l, u, d, f) {
				for (var p = 0;;) try {
					return s.call(r, c, l, u, d, f);
				} catch (r) {
					if (r.code === "EAGAIN" && p < 10) {
						p++;
						continue;
					}
					throw r;
				}
			};
		})(r.readSync) : r.readSync;
		function s(r) {
			r.lchmod = function(s, l, u) {
				r.open(s, c.O_WRONLY | c.O_SYMLINK, l, function(s, c) {
					if (s) {
						u && u(s);
						return;
					}
					r.fchmod(c, l, function(s) {
						r.close(c, function(r) {
							u && u(s || r);
						});
					});
				});
			}, r.lchmodSync = function(s, l) {
				var u = r.openSync(s, c.O_WRONLY | c.O_SYMLINK, l), d = !0, f;
				try {
					f = r.fchmodSync(u, l), d = !1;
				} finally {
					if (d) try {
						r.closeSync(u);
					} catch {}
					else r.closeSync(u);
				}
				return f;
			};
		}
		function l(r) {
			c.hasOwnProperty("O_SYMLINK") && r.futimes ? (r.lutimes = function(s, l, u, d) {
				r.open(s, c.O_SYMLINK, function(s, c) {
					if (s) {
						d && d(s);
						return;
					}
					r.futimes(c, l, u, function(s) {
						r.close(c, function(r) {
							d && d(s || r);
						});
					});
				});
			}, r.lutimesSync = function(s, l, u) {
				var d = r.openSync(s, c.O_SYMLINK), f, p = !0;
				try {
					f = r.futimesSync(d, l, u), p = !1;
				} finally {
					if (p) try {
						r.closeSync(d);
					} catch {}
					else r.closeSync(d);
				}
				return f;
			}) : r.futimes && (r.lutimes = function(r, s, c, l) {
				l && process.nextTick(l);
			}, r.lutimesSync = function() {});
		}
		function u(s) {
			return s && function(c, l, u) {
				return s.call(r, c, l, function(r) {
					_(r) && (r = null), u && u.apply(this, arguments);
				});
			};
		}
		function f(s) {
			return s && function(c, l) {
				try {
					return s.call(r, c, l);
				} catch (r) {
					if (!_(r)) throw r;
				}
			};
		}
		function p(s) {
			return s && function(c, l, u, d) {
				return s.call(r, c, l, u, function(r) {
					_(r) && (r = null), d && d.apply(this, arguments);
				});
			};
		}
		function m(s) {
			return s && function(c, l, u) {
				try {
					return s.call(r, c, l, u);
				} catch (r) {
					if (!_(r)) throw r;
				}
			};
		}
		function h(s) {
			return s && function(c, l, u) {
				typeof l == "function" && (u = l, l = null);
				function d(r, s) {
					s && (s.uid < 0 && (s.uid += 4294967296), s.gid < 0 && (s.gid += 4294967296)), u && u.apply(this, arguments);
				}
				return l ? s.call(r, c, l, d) : s.call(r, c, d);
			};
		}
		function g(s) {
			return s && function(c, l) {
				var u = l ? s.call(r, c, l) : s.call(r, c);
				return u && (u.uid < 0 && (u.uid += 4294967296), u.gid < 0 && (u.gid += 4294967296)), u;
			};
		}
		function _(r) {
			return !r || r.code === "ENOSYS" || (!process.getuid || process.getuid() !== 0) && (r.code === "EINVAL" || r.code === "EPERM");
		}
	}
})), require_legacy_streams = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = __require("stream").Stream;
	s.exports = l;
	function l(r) {
		return {
			ReadStream: s,
			WriteStream: l
		};
		function s(l, u) {
			if (!(this instanceof s)) return new s(l, u);
			c.call(this);
			var d = this;
			this.path = l, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, u ||= {};
			for (var f = Object.keys(u), p = 0, m = f.length; p < m; p++) {
				var h = f[p];
				this[h] = u[h];
			}
			if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
				if (typeof this.start != "number") throw TypeError("start must be a Number");
				if (this.end === void 0) this.end = Infinity;
				else if (typeof this.end != "number") throw TypeError("end must be a Number");
				if (this.start > this.end) throw Error("start must be <= end");
				this.pos = this.start;
			}
			if (this.fd !== null) {
				process.nextTick(function() {
					d._read();
				});
				return;
			}
			r.open(this.path, this.flags, this.mode, function(r, s) {
				if (r) {
					d.emit("error", r), d.readable = !1;
					return;
				}
				d.fd = s, d.emit("open", s), d._read();
			});
		}
		function l(s, u) {
			if (!(this instanceof l)) return new l(s, u);
			c.call(this), this.path = s, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, u ||= {};
			for (var d = Object.keys(u), f = 0, p = d.length; f < p; f++) {
				var m = d[f];
				this[m] = u[m];
			}
			if (this.start !== void 0) {
				if (typeof this.start != "number") throw TypeError("start must be a Number");
				if (this.start < 0) throw Error("start must be >= zero");
				this.pos = this.start;
			}
			this.busy = !1, this._queue = [], this.fd === null && (this._open = r.open, this._queue.push([
				this._open,
				this.path,
				this.flags,
				this.mode,
				void 0
			]), this.flush());
		}
	}
})), require_clone = /* @__PURE__ */ __commonJSMin(((r, s) => {
	s.exports = l;
	var c = Object.getPrototypeOf || function(r) {
		return r.__proto__;
	};
	function l(r) {
		if (typeof r != "object" || !r) return r;
		if (r instanceof Object) var s = { __proto__: c(r) };
		else var s = Object.create(null);
		return Object.getOwnPropertyNames(r).forEach(function(c) {
			Object.defineProperty(s, c, Object.getOwnPropertyDescriptor(r, c));
		}), s;
	}
})), require_graceful_fs = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = __require("fs"), l = require_polyfills(), u = require_legacy_streams(), d = require_clone(), f = __require("util"), p, m;
	/* istanbul ignore else - node 0.x polyfill */
	typeof Symbol == "function" && typeof Symbol.for == "function" ? (p = Symbol.for("graceful-fs.queue"), m = Symbol.for("graceful-fs.previous")) : (p = "___graceful-fs.queue", m = "___graceful-fs.previous");
	function h() {}
	function g(r, s) {
		Object.defineProperty(r, p, { get: function() {
			return s;
		} });
	}
	var _ = h;
	f.debuglog ? _ = f.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (_ = function() {
		var r = f.format.apply(f, arguments);
		r = "GFS4: " + r.split(/\n/).join("\nGFS4: "), console.error(r);
	}), c[p] || (g(c, global[p] || []), c.close = (function(r) {
		function s(s, l) {
			return r.call(c, s, function(r) {
				r || x(), typeof l == "function" && l.apply(this, arguments);
			});
		}
		return Object.defineProperty(s, m, { value: r }), s;
	})(c.close), c.closeSync = (function(r) {
		function s(s) {
			r.apply(c, arguments), x();
		}
		return Object.defineProperty(s, m, { value: r }), s;
	})(c.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
		_(c[p]), __require("assert").equal(c[p].length, 0);
	})), global[p] || g(global, c[p]), s.exports = v(d(c)), process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !c.__patched && (s.exports = v(c), c.__patched = !0);
	function v(r) {
		l(r), r.gracefulify = v, r.createReadStream = j, r.createWriteStream = M;
		var s = r.readFile;
		r.readFile = c;
		function c(r, c, l) {
			return typeof c == "function" && (l = c, c = null), u(r, c, l);
			function u(r, c, l, d) {
				return s(r, c, function(s) {
					s && (s.code === "EMFILE" || s.code === "ENFILE") ? y([
						u,
						[
							r,
							c,
							l
						],
						s,
						d || Date.now(),
						Date.now()
					]) : typeof l == "function" && l.apply(this, arguments);
				});
			}
		}
		var d = r.writeFile;
		r.writeFile = f;
		function f(r, s, c, l) {
			return typeof c == "function" && (l = c, c = null), u(r, s, c, l);
			function u(r, s, c, l, f) {
				return d(r, s, c, function(d) {
					d && (d.code === "EMFILE" || d.code === "ENFILE") ? y([
						u,
						[
							r,
							s,
							c,
							l
						],
						d,
						f || Date.now(),
						Date.now()
					]) : typeof l == "function" && l.apply(this, arguments);
				});
			}
		}
		var p = r.appendFile;
		p && (r.appendFile = m);
		function m(r, s, c, l) {
			return typeof c == "function" && (l = c, c = null), u(r, s, c, l);
			function u(r, s, c, l, d) {
				return p(r, s, c, function(f) {
					f && (f.code === "EMFILE" || f.code === "ENFILE") ? y([
						u,
						[
							r,
							s,
							c,
							l
						],
						f,
						d || Date.now(),
						Date.now()
					]) : typeof l == "function" && l.apply(this, arguments);
				});
			}
		}
		var h = r.copyFile;
		h && (r.copyFile = g);
		function g(r, s, c, l) {
			return typeof c == "function" && (l = c, c = 0), u(r, s, c, l);
			function u(r, s, c, l, d) {
				return h(r, s, c, function(f) {
					f && (f.code === "EMFILE" || f.code === "ENFILE") ? y([
						u,
						[
							r,
							s,
							c,
							l
						],
						f,
						d || Date.now(),
						Date.now()
					]) : typeof l == "function" && l.apply(this, arguments);
				});
			}
		}
		var _ = r.readdir;
		r.readdir = x;
		var b = /^v[0-5]\./;
		function x(r, s, c) {
			typeof s == "function" && (c = s, s = null);
			var l = b.test(process.version) ? function(r, s, c, l) {
				return _(r, u(r, s, c, l));
			} : function(r, s, c, l) {
				return _(r, s, u(r, s, c, l));
			};
			return l(r, s, c);
			function u(r, s, c, u) {
				return function(d, f) {
					d && (d.code === "EMFILE" || d.code === "ENFILE") ? y([
						l,
						[
							r,
							s,
							c
						],
						d,
						u || Date.now(),
						Date.now()
					]) : (f && f.sort && f.sort(), typeof c == "function" && c.call(this, d, f));
				};
			}
		}
		if (process.version.substr(0, 4) === "v0.8") {
			var S = u(r);
			D = S.ReadStream, k = S.WriteStream;
		}
		var C = r.ReadStream;
		C && (D.prototype = Object.create(C.prototype), D.prototype.open = O);
		var w = r.WriteStream;
		w && (k.prototype = Object.create(w.prototype), k.prototype.open = A), Object.defineProperty(r, "ReadStream", {
			get: function() {
				return D;
			},
			set: function(r) {
				D = r;
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(r, "WriteStream", {
			get: function() {
				return k;
			},
			set: function(r) {
				k = r;
			},
			enumerable: !0,
			configurable: !0
		});
		var T = D;
		Object.defineProperty(r, "FileReadStream", {
			get: function() {
				return T;
			},
			set: function(r) {
				T = r;
			},
			enumerable: !0,
			configurable: !0
		});
		var E = k;
		Object.defineProperty(r, "FileWriteStream", {
			get: function() {
				return E;
			},
			set: function(r) {
				E = r;
			},
			enumerable: !0,
			configurable: !0
		});
		function D(r, s) {
			return this instanceof D ? (C.apply(this, arguments), this) : D.apply(Object.create(D.prototype), arguments);
		}
		function O() {
			var r = this;
			P(r.path, r.flags, r.mode, function(s, c) {
				s ? (r.autoClose && r.destroy(), r.emit("error", s)) : (r.fd = c, r.emit("open", c), r.read());
			});
		}
		function k(r, s) {
			return this instanceof k ? (w.apply(this, arguments), this) : k.apply(Object.create(k.prototype), arguments);
		}
		function A() {
			var r = this;
			P(r.path, r.flags, r.mode, function(s, c) {
				s ? (r.destroy(), r.emit("error", s)) : (r.fd = c, r.emit("open", c));
			});
		}
		function j(s, c) {
			return new r.ReadStream(s, c);
		}
		function M(s, c) {
			return new r.WriteStream(s, c);
		}
		var N = r.open;
		r.open = P;
		function P(r, s, c, l) {
			return typeof c == "function" && (l = c, c = null), u(r, s, c, l);
			function u(r, s, c, l, d) {
				return N(r, s, c, function(f, p) {
					f && (f.code === "EMFILE" || f.code === "ENFILE") ? y([
						u,
						[
							r,
							s,
							c,
							l
						],
						f,
						d || Date.now(),
						Date.now()
					]) : typeof l == "function" && l.apply(this, arguments);
				});
			}
		}
		return r;
	}
	function y(r) {
		_("ENQUEUE", r[0].name, r[1]), c[p].push(r), S();
	}
	var b;
	function x() {
		for (var r = Date.now(), s = 0; s < c[p].length; ++s) c[p][s].length > 2 && (c[p][s][3] = r, c[p][s][4] = r);
		S();
	}
	function S() {
		if (clearTimeout(b), b = void 0, c[p].length !== 0) {
			var r = c[p].shift(), s = r[0], l = r[1], u = r[2], d = r[3], f = r[4];
			if (d === void 0) _("RETRY", s.name, l), s.apply(null, l);
			else if (Date.now() - d >= 6e4) {
				_("TIMEOUT", s.name, l);
				var m = l.pop();
				typeof m == "function" && m.call(null, u);
			} else {
				var h = Date.now() - f, g = Math.max(f - d, 1);
				h >= Math.min(g * 1.2, 100) ? (_("RETRY", s.name, l), s.apply(null, l.concat([d]))) : c[p].push(r);
			}
			b === void 0 && (b = setTimeout(S, 0));
		}
	}
})), require_fs = /* @__PURE__ */ __commonJSMin(((r) => {
	var s = require_universalify().fromCallback, c = require_graceful_fs(), l = (/* @__PURE__ */ "access.appendFile.chmod.chown.close.copyFile.cp.fchmod.fchown.fdatasync.fstat.fsync.ftruncate.futimes.glob.lchmod.lchown.lutimes.link.lstat.mkdir.mkdtemp.open.opendir.readdir.readFile.readlink.realpath.rename.rm.rmdir.stat.statfs.symlink.truncate.unlink.utimes.writeFile".split(".")).filter((r) => typeof c[r] == "function");
	Object.assign(r, c), l.forEach((l) => {
		r[l] = s(c[l]);
	}), r.exists = function(r, s) {
		return typeof s == "function" ? c.exists(r, s) : new Promise((s) => c.exists(r, s));
	}, r.read = function(r, s, l, u, d, f) {
		return typeof f == "function" ? c.read(r, s, l, u, d, f) : new Promise((f, p) => {
			c.read(r, s, l, u, d, (r, s, c) => {
				if (r) return p(r);
				f({
					bytesRead: s,
					buffer: c
				});
			});
		});
	}, r.write = function(r, s, ...l) {
		return typeof l[l.length - 1] == "function" ? c.write(r, s, ...l) : new Promise((u, d) => {
			c.write(r, s, ...l, (r, s, c) => {
				if (r) return d(r);
				u({
					bytesWritten: s,
					buffer: c
				});
			});
		});
	}, r.readv = function(r, s, ...l) {
		return typeof l[l.length - 1] == "function" ? c.readv(r, s, ...l) : new Promise((u, d) => {
			c.readv(r, s, ...l, (r, s, c) => {
				if (r) return d(r);
				u({
					bytesRead: s,
					buffers: c
				});
			});
		});
	}, r.writev = function(r, s, ...l) {
		return typeof l[l.length - 1] == "function" ? c.writev(r, s, ...l) : new Promise((u, d) => {
			c.writev(r, s, ...l, (r, s, c) => {
				if (r) return d(r);
				u({
					bytesWritten: s,
					buffers: c
				});
			});
		});
	}, typeof c.realpath.native == "function" ? r.realpath.native = s(c.realpath.native) : process.emitWarning("fs.realpath.native is not a function. Is fs being monkey-patched?", "Warning", "fs-extra-WARN0003");
})), require_utils$3 = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = __require("path");
	s.exports.checkPath = function(r) {
		if (process.platform === "win32" && /[<>:"|?*]/.test(r.replace(c.parse(r).root, ""))) {
			let s = /* @__PURE__ */ Error(`Path contains invalid characters: ${r}`);
			throw s.code = "EINVAL", s;
		}
	};
})), require_make_dir = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_fs(), { checkPath: l } = require_utils$3(), u = (r) => typeof r == "number" ? r : {
		mode: 511,
		...r
	}.mode;
	s.exports.makeDir = async (r, s) => (l(r), c.mkdir(r, {
		mode: u(s),
		recursive: !0
	})), s.exports.makeDirSync = (r, s) => (l(r), c.mkdirSync(r, {
		mode: u(s),
		recursive: !0
	}));
})), require_mkdirs = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_universalify().fromPromise, { makeDir: l, makeDirSync: u } = require_make_dir(), d = c(l);
	s.exports = {
		mkdirs: d,
		mkdirsSync: u,
		mkdirp: d,
		mkdirpSync: u,
		ensureDir: d,
		ensureDirSync: u
	};
})), require_path_exists = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_universalify().fromPromise, l = require_fs();
	function u(r) {
		return l.access(r).then(() => !0).catch(() => !1);
	}
	s.exports = {
		pathExists: c(u),
		pathExistsSync: l.existsSync
	};
})), require_utimes = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_fs(), l = require_universalify().fromPromise;
	async function u(r, s, l) {
		let u = await c.open(r, "r+"), d = null;
		try {
			await c.futimes(u, s, l);
		} finally {
			try {
				await c.close(u);
			} catch (r) {
				d = r;
			}
		}
		if (d) throw d;
	}
	function d(r, s, l) {
		let u = c.openSync(r, "r+");
		return c.futimesSync(u, s, l), c.closeSync(u);
	}
	s.exports = {
		utimesMillis: l(u),
		utimesMillisSync: d
	};
})), require_stat = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_fs(), l = __require("path"), u = require_universalify().fromPromise;
	function d(r, s, l) {
		let u = l.dereference ? (r) => c.stat(r, { bigint: !0 }) : (r) => c.lstat(r, { bigint: !0 });
		return Promise.all([u(r), u(s).catch((r) => {
			if (r.code === "ENOENT") return null;
			throw r;
		})]).then(([r, s]) => ({
			srcStat: r,
			destStat: s
		}));
	}
	function f(r, s, l) {
		let u, d = l.dereference ? (r) => c.statSync(r, { bigint: !0 }) : (r) => c.lstatSync(r, { bigint: !0 }), f = d(r);
		try {
			u = d(s);
		} catch (r) {
			if (r.code === "ENOENT") return {
				srcStat: f,
				destStat: null
			};
			throw r;
		}
		return {
			srcStat: f,
			destStat: u
		};
	}
	async function p(r, s, c, u) {
		let { srcStat: f, destStat: p } = await d(r, s, u);
		if (p) {
			if (_(f, p)) {
				let u = l.basename(r), d = l.basename(s);
				if (c === "move" && u !== d && u.toLowerCase() === d.toLowerCase()) return {
					srcStat: f,
					destStat: p,
					isChangingCase: !0
				};
				throw Error("Source and destination must not be the same.");
			}
			if (f.isDirectory() && !p.isDirectory()) throw Error(`Cannot overwrite non-directory '${s}' with directory '${r}'.`);
			if (!f.isDirectory() && p.isDirectory()) throw Error(`Cannot overwrite directory '${s}' with non-directory '${r}'.`);
		}
		if (f.isDirectory() && v(r, s)) throw Error(y(r, s, c));
		return {
			srcStat: f,
			destStat: p
		};
	}
	function m(r, s, c, u) {
		let { srcStat: d, destStat: p } = f(r, s, u);
		if (p) {
			if (_(d, p)) {
				let u = l.basename(r), f = l.basename(s);
				if (c === "move" && u !== f && u.toLowerCase() === f.toLowerCase()) return {
					srcStat: d,
					destStat: p,
					isChangingCase: !0
				};
				throw Error("Source and destination must not be the same.");
			}
			if (d.isDirectory() && !p.isDirectory()) throw Error(`Cannot overwrite non-directory '${s}' with directory '${r}'.`);
			if (!d.isDirectory() && p.isDirectory()) throw Error(`Cannot overwrite directory '${s}' with non-directory '${r}'.`);
		}
		if (d.isDirectory() && v(r, s)) throw Error(y(r, s, c));
		return {
			srcStat: d,
			destStat: p
		};
	}
	async function h(r, s, u, d) {
		let f = l.resolve(l.dirname(r)), p = l.resolve(l.dirname(u));
		if (p === f || p === l.parse(p).root) return;
		let m;
		try {
			m = await c.stat(p, { bigint: !0 });
		} catch (r) {
			if (r.code === "ENOENT") return;
			throw r;
		}
		if (_(s, m)) throw Error(y(r, u, d));
		return h(r, s, p, d);
	}
	function g(r, s, u, d) {
		let f = l.resolve(l.dirname(r)), p = l.resolve(l.dirname(u));
		if (p === f || p === l.parse(p).root) return;
		let m;
		try {
			m = c.statSync(p, { bigint: !0 });
		} catch (r) {
			if (r.code === "ENOENT") return;
			throw r;
		}
		if (_(s, m)) throw Error(y(r, u, d));
		return g(r, s, p, d);
	}
	function _(r, s) {
		return s.ino !== void 0 && s.dev !== void 0 && s.ino === r.ino && s.dev === r.dev;
	}
	function v(r, s) {
		let c = l.resolve(r).split(l.sep).filter((r) => r), u = l.resolve(s).split(l.sep).filter((r) => r);
		return c.every((r, s) => u[s] === r);
	}
	function y(r, s, c) {
		return `Cannot ${c} '${r}' to a subdirectory of itself, '${s}'.`;
	}
	s.exports = {
		checkPaths: u(p),
		checkPathsSync: m,
		checkParentPaths: u(h),
		checkParentPathsSync: g,
		isSrcSubdir: v,
		areIdentical: _
	};
})), require_async = /* @__PURE__ */ __commonJSMin(((r, s) => {
	async function c(r, s) {
		let c = [];
		for await (let l of r) c.push(s(l).then(() => null, (r) => r ?? /* @__PURE__ */ Error("unknown error")));
		await Promise.all(c.map((r) => r.then((r) => {
			if (r !== null) throw r;
		})));
	}
	s.exports = { asyncIteratorConcurrentProcess: c };
})), require_copy$1 = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_fs(), l = __require("path"), { mkdirs: u } = require_mkdirs(), { pathExists: d } = require_path_exists(), { utimesMillis: f } = require_utimes(), p = require_stat(), { asyncIteratorConcurrentProcess: m } = require_async();
	async function h(r, s, c = {}) {
		typeof c == "function" && (c = { filter: c }), c.clobber = "clobber" in c ? !!c.clobber : !0, c.overwrite = "overwrite" in c ? !!c.overwrite : c.clobber, c.preserveTimestamps && process.arch === "ia32" && process.emitWarning("Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269", "Warning", "fs-extra-WARN0001");
		let { srcStat: f, destStat: m } = await p.checkPaths(r, s, "copy", c);
		if (await p.checkParentPaths(r, f, s, "copy"), !await g(r, s, c)) return;
		let h = l.dirname(s);
		await d(h) || await u(h), await _(m, r, s, c);
	}
	async function g(r, s, c) {
		return c.filter ? c.filter(r, s) : !0;
	}
	async function _(r, s, l, u) {
		let d = await (u.dereference ? c.stat : c.lstat)(s);
		if (d.isDirectory()) return S(d, r, s, l, u);
		if (d.isFile() || d.isCharacterDevice() || d.isBlockDevice()) return v(d, r, s, l, u);
		if (d.isSymbolicLink()) return C(r, s, l, u);
		throw d.isSocket() ? Error(`Cannot copy a socket file: ${s}`) : d.isFIFO() ? Error(`Cannot copy a FIFO pipe: ${s}`) : Error(`Unknown file: ${s}`);
	}
	async function v(r, s, l, u, d) {
		if (!s) return y(r, l, u, d);
		if (d.overwrite) return await c.unlink(u), y(r, l, u, d);
		if (d.errorOnExist) throw Error(`'${u}' already exists`);
	}
	async function y(r, s, l, u) {
		if (await c.copyFile(s, l), u.preserveTimestamps) {
			b(r.mode) && await x(l, r.mode);
			let u = await c.stat(s);
			await f(l, u.atime, u.mtime);
		}
		return c.chmod(l, r.mode);
	}
	function b(r) {
		return (r & 128) == 0;
	}
	function x(r, s) {
		return c.chmod(r, s | 128);
	}
	async function S(r, s, u, d, f) {
		s || await c.mkdir(d), await m(await c.opendir(u), async (r) => {
			let s = l.join(u, r.name), c = l.join(d, r.name);
			if (await g(s, c, f)) {
				let { destStat: r } = await p.checkPaths(s, c, "copy", f);
				await _(r, s, c, f);
			}
		}), s || await c.chmod(d, r.mode);
	}
	async function C(r, s, u, d) {
		let f = await c.readlink(s);
		if (d.dereference && (f = l.resolve(process.cwd(), f)), !r) return c.symlink(f, u);
		let m = null;
		try {
			m = await c.readlink(u);
		} catch (r) {
			if (r.code === "EINVAL" || r.code === "UNKNOWN") return c.symlink(f, u);
			throw r;
		}
		if (d.dereference && (m = l.resolve(process.cwd(), m)), p.isSrcSubdir(f, m)) throw Error(`Cannot copy '${f}' to a subdirectory of itself, '${m}'.`);
		if (p.isSrcSubdir(m, f)) throw Error(`Cannot overwrite '${m}' with '${f}'.`);
		return await c.unlink(u), c.symlink(f, u);
	}
	s.exports = h;
})), require_copy_sync = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_graceful_fs(), l = __require("path"), u = require_mkdirs().mkdirsSync, d = require_utimes().utimesMillisSync, f = require_stat();
	function p(r, s, d) {
		typeof d == "function" && (d = { filter: d }), d ||= {}, d.clobber = "clobber" in d ? !!d.clobber : !0, d.overwrite = "overwrite" in d ? !!d.overwrite : d.clobber, d.preserveTimestamps && process.arch === "ia32" && process.emitWarning("Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269", "Warning", "fs-extra-WARN0002");
		let { srcStat: p, destStat: h } = f.checkPathsSync(r, s, "copy", d);
		if (f.checkParentPathsSync(r, p, s, "copy"), d.filter && !d.filter(r, s)) return;
		let g = l.dirname(s);
		return c.existsSync(g) || u(g), m(h, r, s, d);
	}
	function m(r, s, l, u) {
		let d = (u.dereference ? c.statSync : c.lstatSync)(s);
		if (d.isDirectory()) return C(d, r, s, l, u);
		if (d.isFile() || d.isCharacterDevice() || d.isBlockDevice()) return h(d, r, s, l, u);
		if (d.isSymbolicLink()) return D(r, s, l, u);
		throw d.isSocket() ? Error(`Cannot copy a socket file: ${s}`) : d.isFIFO() ? Error(`Cannot copy a FIFO pipe: ${s}`) : Error(`Unknown file: ${s}`);
	}
	function h(r, s, c, l, u) {
		return s ? g(r, c, l, u) : _(r, c, l, u);
	}
	function g(r, s, l, u) {
		if (u.overwrite) return c.unlinkSync(l), _(r, s, l, u);
		if (u.errorOnExist) throw Error(`'${l}' already exists`);
	}
	function _(r, s, l, u) {
		return c.copyFileSync(s, l), u.preserveTimestamps && v(r.mode, s, l), x(l, r.mode);
	}
	function v(r, s, c) {
		return y(r) && b(c, r), S(s, c);
	}
	function y(r) {
		return (r & 128) == 0;
	}
	function b(r, s) {
		return x(r, s | 128);
	}
	function x(r, s) {
		return c.chmodSync(r, s);
	}
	function S(r, s) {
		let l = c.statSync(r);
		return d(s, l.atime, l.mtime);
	}
	function C(r, s, c, l, u) {
		return s ? T(c, l, u) : w(r.mode, c, l, u);
	}
	function w(r, s, l, u) {
		return c.mkdirSync(l), T(s, l, u), x(l, r);
	}
	function T(r, s, l) {
		let u = c.opendirSync(r);
		try {
			let c;
			for (; (c = u.readSync()) !== null;) E(c.name, r, s, l);
		} finally {
			u.closeSync();
		}
	}
	function E(r, s, c, u) {
		let d = l.join(s, r), p = l.join(c, r);
		if (u.filter && !u.filter(d, p)) return;
		let { destStat: h } = f.checkPathsSync(d, p, "copy", u);
		return m(h, d, p, u);
	}
	function D(r, s, u, d) {
		let p = c.readlinkSync(s);
		if (d.dereference && (p = l.resolve(process.cwd(), p)), r) {
			let r;
			try {
				r = c.readlinkSync(u);
			} catch (r) {
				if (r.code === "EINVAL" || r.code === "UNKNOWN") return c.symlinkSync(p, u);
				throw r;
			}
			if (d.dereference && (r = l.resolve(process.cwd(), r)), f.isSrcSubdir(p, r)) throw Error(`Cannot copy '${p}' to a subdirectory of itself, '${r}'.`);
			if (f.isSrcSubdir(r, p)) throw Error(`Cannot overwrite '${r}' with '${p}'.`);
			return O(p, u);
		} else return c.symlinkSync(p, u);
	}
	function O(r, s) {
		return c.unlinkSync(s), c.symlinkSync(r, s);
	}
	s.exports = p;
})), require_copy = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_universalify().fromPromise;
	s.exports = {
		copy: c(require_copy$1()),
		copySync: require_copy_sync()
	};
})), require_remove = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_graceful_fs(), l = require_universalify().fromCallback;
	function u(r, s) {
		c.rm(r, {
			recursive: !0,
			force: !0
		}, s);
	}
	function d(r) {
		c.rmSync(r, {
			recursive: !0,
			force: !0
		});
	}
	s.exports = {
		remove: l(u),
		removeSync: d
	};
})), require_empty = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_universalify().fromPromise, l = require_fs(), u = __require("path"), d = require_mkdirs(), f = require_remove(), p = c(async function(r) {
		let s;
		try {
			s = await l.readdir(r);
		} catch {
			return d.mkdirs(r);
		}
		return Promise.all(s.map((s) => f.remove(u.join(r, s))));
	});
	function m(r) {
		let s;
		try {
			s = l.readdirSync(r);
		} catch {
			return d.mkdirsSync(r);
		}
		s.forEach((s) => {
			s = u.join(r, s), f.removeSync(s);
		});
	}
	s.exports = {
		emptyDirSync: m,
		emptydirSync: m,
		emptyDir: p,
		emptydir: p
	};
})), require_file = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_universalify().fromPromise, l = __require("path"), u = require_fs(), d = require_mkdirs();
	async function f(r) {
		let s;
		try {
			s = await u.stat(r);
		} catch {}
		if (s && s.isFile()) return;
		let c = l.dirname(r), f = null;
		try {
			f = await u.stat(c);
		} catch (s) {
			if (s.code === "ENOENT") {
				await d.mkdirs(c), await u.writeFile(r, "");
				return;
			} else throw s;
		}
		f.isDirectory() ? await u.writeFile(r, "") : await u.readdir(c);
	}
	function p(r) {
		let s;
		try {
			s = u.statSync(r);
		} catch {}
		if (s && s.isFile()) return;
		let c = l.dirname(r);
		try {
			u.statSync(c).isDirectory() || u.readdirSync(c);
		} catch (r) {
			if (r && r.code === "ENOENT") d.mkdirsSync(c);
			else throw r;
		}
		u.writeFileSync(r, "");
	}
	s.exports = {
		createFile: c(f),
		createFileSync: p
	};
})), require_link = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_universalify().fromPromise, l = __require("path"), u = require_fs(), d = require_mkdirs(), { pathExists: f } = require_path_exists(), { areIdentical: p } = require_stat();
	async function m(r, s) {
		let c;
		try {
			c = await u.lstat(s);
		} catch {}
		let m;
		try {
			m = await u.lstat(r);
		} catch (r) {
			throw r.message = r.message.replace("lstat", "ensureLink"), r;
		}
		if (c && p(m, c)) return;
		let h = l.dirname(s);
		await f(h) || await d.mkdirs(h), await u.link(r, s);
	}
	function h(r, s) {
		let c;
		try {
			c = u.lstatSync(s);
		} catch {}
		try {
			let s = u.lstatSync(r);
			if (c && p(s, c)) return;
		} catch (r) {
			throw r.message = r.message.replace("lstat", "ensureLink"), r;
		}
		let f = l.dirname(s);
		return u.existsSync(f) || d.mkdirsSync(f), u.linkSync(r, s);
	}
	s.exports = {
		createLink: c(m),
		createLinkSync: h
	};
})), require_symlink_paths = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = __require("path"), l = require_fs(), { pathExists: u } = require_path_exists(), d = require_universalify().fromPromise;
	async function f(r, s) {
		if (c.isAbsolute(r)) {
			try {
				await l.lstat(r);
			} catch (r) {
				throw r.message = r.message.replace("lstat", "ensureSymlink"), r;
			}
			return {
				toCwd: r,
				toDst: r
			};
		}
		let d = c.dirname(s), f = c.join(d, r);
		if (await u(f)) return {
			toCwd: f,
			toDst: r
		};
		try {
			await l.lstat(r);
		} catch (r) {
			throw r.message = r.message.replace("lstat", "ensureSymlink"), r;
		}
		return {
			toCwd: r,
			toDst: c.relative(d, r)
		};
	}
	function p(r, s) {
		if (c.isAbsolute(r)) {
			if (!l.existsSync(r)) throw Error("absolute srcpath does not exist");
			return {
				toCwd: r,
				toDst: r
			};
		}
		let u = c.dirname(s), d = c.join(u, r);
		if (l.existsSync(d)) return {
			toCwd: d,
			toDst: r
		};
		if (!l.existsSync(r)) throw Error("relative srcpath does not exist");
		return {
			toCwd: r,
			toDst: c.relative(u, r)
		};
	}
	s.exports = {
		symlinkPaths: d(f),
		symlinkPathsSync: p
	};
})), require_symlink_type = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_fs(), l = require_universalify().fromPromise;
	async function u(r, s) {
		if (s) return s;
		let l;
		try {
			l = await c.lstat(r);
		} catch {
			return "file";
		}
		return l && l.isDirectory() ? "dir" : "file";
	}
	function d(r, s) {
		if (s) return s;
		let l;
		try {
			l = c.lstatSync(r);
		} catch {
			return "file";
		}
		return l && l.isDirectory() ? "dir" : "file";
	}
	s.exports = {
		symlinkType: l(u),
		symlinkTypeSync: d
	};
})), require_symlink = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_universalify().fromPromise, l = __require("path"), u = require_fs(), { mkdirs: d, mkdirsSync: f } = require_mkdirs(), { symlinkPaths: p, symlinkPathsSync: m } = require_symlink_paths(), { symlinkType: h, symlinkTypeSync: g } = require_symlink_type(), { pathExists: _ } = require_path_exists(), { areIdentical: v } = require_stat();
	async function y(r, s, c) {
		let f;
		try {
			f = await u.lstat(s);
		} catch {}
		if (f && f.isSymbolicLink()) {
			let [c, l] = await Promise.all([u.stat(r), u.stat(s)]);
			if (v(c, l)) return;
		}
		let m = await p(r, s);
		r = m.toDst;
		let g = await h(m.toCwd, c), y = l.dirname(s);
		return await _(y) || await d(y), u.symlink(r, s, g);
	}
	function b(r, s, c) {
		let d;
		try {
			d = u.lstatSync(s);
		} catch {}
		if (d && d.isSymbolicLink() && v(u.statSync(r), u.statSync(s))) return;
		let p = m(r, s);
		r = p.toDst, c = g(p.toCwd, c);
		let h = l.dirname(s);
		return u.existsSync(h) || f(h), u.symlinkSync(r, s, c);
	}
	s.exports = {
		createSymlink: c(y),
		createSymlinkSync: b
	};
})), require_ensure = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var { createFile: c, createFileSync: l } = require_file(), { createLink: u, createLinkSync: d } = require_link(), { createSymlink: f, createSymlinkSync: p } = require_symlink();
	s.exports = {
		createFile: c,
		createFileSync: l,
		ensureFile: c,
		ensureFileSync: l,
		createLink: u,
		createLinkSync: d,
		ensureLink: u,
		ensureLinkSync: d,
		createSymlink: f,
		createSymlinkSync: p,
		ensureSymlink: f,
		ensureSymlinkSync: p
	};
})), require_utils$2 = /* @__PURE__ */ __commonJSMin(((r, s) => {
	function c(r, { EOL: s = "\n", finalEOL: c = !0, replacer: l = null, spaces: u } = {}) {
		let d = c ? s : "";
		return JSON.stringify(r, l, u).replace(/\n/g, s) + d;
	}
	function l(r) {
		return Buffer.isBuffer(r) && (r = r.toString("utf8")), r.replace(/^\uFEFF/, "");
	}
	s.exports = {
		stringify: c,
		stripBom: l
	};
})), require_jsonfile$1 = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c;
	try {
		c = require_graceful_fs();
	} catch {
		c = __require("fs");
	}
	var l = require_universalify(), { stringify: u, stripBom: d } = require_utils$2();
	async function f(r, s = {}) {
		typeof s == "string" && (s = { encoding: s });
		let u = s.fs || c, f = "throws" in s ? s.throws : !0, p = await l.fromCallback(u.readFile)(r, s);
		p = d(p);
		let m;
		try {
			m = JSON.parse(p, s ? s.reviver : null);
		} catch (s) {
			if (f) throw s.message = `${r}: ${s.message}`, s;
			return null;
		}
		return m;
	}
	var p = l.fromPromise(f);
	function m(r, s = {}) {
		typeof s == "string" && (s = { encoding: s });
		let l = s.fs || c, u = "throws" in s ? s.throws : !0;
		try {
			let c = l.readFileSync(r, s);
			return c = d(c), JSON.parse(c, s.reviver);
		} catch (s) {
			if (u) throw s.message = `${r}: ${s.message}`, s;
			return null;
		}
	}
	async function h(r, s, d = {}) {
		let f = d.fs || c, p = u(s, d);
		await l.fromCallback(f.writeFile)(r, p, d);
	}
	var g = l.fromPromise(h);
	function _(r, s, l = {}) {
		let d = l.fs || c, f = u(s, l);
		return d.writeFileSync(r, f, l);
	}
	s.exports = {
		readFile: p,
		readFileSync: m,
		writeFile: g,
		writeFileSync: _
	};
})), require_jsonfile = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_jsonfile$1();
	s.exports = {
		readJson: c.readFile,
		readJsonSync: c.readFileSync,
		writeJson: c.writeFile,
		writeJsonSync: c.writeFileSync
	};
})), require_output_file = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_universalify().fromPromise, l = require_fs(), u = __require("path"), d = require_mkdirs(), f = require_path_exists().pathExists;
	async function p(r, s, c = "utf-8") {
		let p = u.dirname(r);
		return await f(p) || await d.mkdirs(p), l.writeFile(r, s, c);
	}
	function m(r, ...s) {
		let c = u.dirname(r);
		l.existsSync(c) || d.mkdirsSync(c), l.writeFileSync(r, ...s);
	}
	s.exports = {
		outputFile: c(p),
		outputFileSync: m
	};
})), require_output_json = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var { stringify: c } = require_utils$2(), { outputFile: l } = require_output_file();
	async function u(r, s, u = {}) {
		await l(r, c(s, u), u);
	}
	s.exports = u;
})), require_output_json_sync = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var { stringify: c } = require_utils$2(), { outputFileSync: l } = require_output_file();
	function u(r, s, u) {
		l(r, c(s, u), u);
	}
	s.exports = u;
})), require_json = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_universalify().fromPromise, l = require_jsonfile();
	l.outputJson = c(require_output_json()), l.outputJsonSync = require_output_json_sync(), l.outputJSON = l.outputJson, l.outputJSONSync = l.outputJsonSync, l.writeJSON = l.writeJson, l.writeJSONSync = l.writeJsonSync, l.readJSON = l.readJson, l.readJSONSync = l.readJsonSync, s.exports = l;
})), require_move$1 = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_fs(), l = __require("path"), { copy: u } = require_copy(), { remove: d } = require_remove(), { mkdirp: f } = require_mkdirs(), { pathExists: p } = require_path_exists(), m = require_stat();
	async function h(r, s, c = {}) {
		let u = c.overwrite || c.clobber || !1, { srcStat: d, isChangingCase: p = !1 } = await m.checkPaths(r, s, "move", c);
		await m.checkParentPaths(r, d, s, "move");
		let h = l.dirname(s);
		return l.parse(h).root !== h && await f(h), g(r, s, u, p);
	}
	async function g(r, s, l, u) {
		if (!u) {
			if (l) await d(s);
			else if (await p(s)) throw Error("dest already exists.");
		}
		try {
			await c.rename(r, s);
		} catch (c) {
			if (c.code !== "EXDEV") throw c;
			await _(r, s, l);
		}
	}
	async function _(r, s, c) {
		return await u(r, s, {
			overwrite: c,
			errorOnExist: !0,
			preserveTimestamps: !0
		}), d(r);
	}
	s.exports = h;
})), require_move_sync = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_graceful_fs(), l = __require("path"), u = require_copy().copySync, d = require_remove().removeSync, f = require_mkdirs().mkdirpSync, p = require_stat();
	function m(r, s, c) {
		c ||= {};
		let u = c.overwrite || c.clobber || !1, { srcStat: d, isChangingCase: m = !1 } = p.checkPathsSync(r, s, "move", c);
		return p.checkParentPathsSync(r, d, s, "move"), h(s) || f(l.dirname(s)), g(r, s, u, m);
	}
	function h(r) {
		let s = l.dirname(r);
		return l.parse(s).root === s;
	}
	function g(r, s, l, u) {
		if (u) return _(r, s, l);
		if (l) return d(s), _(r, s, l);
		if (c.existsSync(s)) throw Error("dest already exists.");
		return _(r, s, l);
	}
	function _(r, s, l) {
		try {
			c.renameSync(r, s);
		} catch (c) {
			if (c.code !== "EXDEV") throw c;
			return v(r, s, l);
		}
	}
	function v(r, s, c) {
		return u(r, s, {
			overwrite: c,
			errorOnExist: !0,
			preserveTimestamps: !0
		}), d(r);
	}
	s.exports = m;
})), require_move = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_universalify().fromPromise;
	s.exports = {
		move: c(require_move$1()),
		moveSync: require_move_sync()
	};
})), import_lib = (/* @__PURE__ */ __commonJSMin(((r, s) => {
	s.exports = {
		...require_fs(),
		...require_copy(),
		...require_empty(),
		...require_ensure(),
		...require_json(),
		...require_mkdirs(),
		...require_move(),
		...require_output_file(),
		...require_path_exists(),
		...require_remove()
	};
})))(), isObject = (r) => {
	let s = typeof r;
	return r !== null && (s === "object" || s === "function");
}, disallowedKeys = new Set([
	"__proto__",
	"prototype",
	"constructor"
]), MAX_ARRAY_INDEX = 1e6, isDigit = (r) => r >= "0" && r <= "9";
function shouldCoerceToNumber(r) {
	if (r === "0") return !0;
	if (/^[1-9]\d*$/.test(r)) {
		let s = Number.parseInt(r, 10);
		return s <= 2 ** 53 - 1 && s <= MAX_ARRAY_INDEX;
	}
	return !1;
}
function processSegment(r, s) {
	return disallowedKeys.has(r) ? !1 : (r && shouldCoerceToNumber(r) ? s.push(Number.parseInt(r, 10)) : s.push(r), !0);
}
function parsePath(r) {
	if (typeof r != "string") throw TypeError(`Expected a string, got ${typeof r}`);
	let s = [], c = "", l = "start", u = !1, d = 0;
	for (let f of r) {
		if (d++, u) {
			c += f, u = !1;
			continue;
		}
		if (f === "\\") {
			if (l === "index") throw Error(`Invalid character '${f}' in an index at position ${d}`);
			if (l === "indexEnd") throw Error(`Invalid character '${f}' after an index at position ${d}`);
			u = !0, l = l === "start" ? "property" : l;
			continue;
		}
		switch (f) {
			case ".":
				if (l === "index") throw Error(`Invalid character '${f}' in an index at position ${d}`);
				if (l === "indexEnd") {
					l = "property";
					break;
				}
				if (!processSegment(c, s)) return [];
				c = "", l = "property";
				break;
			case "[":
				if (l === "index") throw Error(`Invalid character '${f}' in an index at position ${d}`);
				if (l === "indexEnd") {
					l = "index";
					break;
				}
				if (l === "property" || l === "start") {
					if ((c || l === "property") && !processSegment(c, s)) return [];
					c = "";
				}
				l = "index";
				break;
			case "]":
				if (l === "index") {
					if (c === "") c = (s.pop() || "") + "[]", l = "property";
					else {
						let r = Number.parseInt(c, 10);
						!Number.isNaN(r) && Number.isFinite(r) && r >= 0 && r <= 2 ** 53 - 1 && r <= MAX_ARRAY_INDEX && c === String(r) ? s.push(r) : s.push(c), c = "", l = "indexEnd";
					}
					break;
				}
				if (l === "indexEnd") throw Error(`Invalid character '${f}' after an index at position ${d}`);
				c += f;
				break;
			default:
				if (l === "index" && !isDigit(f)) throw Error(`Invalid character '${f}' in an index at position ${d}`);
				if (l === "indexEnd") throw Error(`Invalid character '${f}' after an index at position ${d}`);
				l === "start" && (l = "property"), c += f;
		}
	}
	switch (u && (c += "\\"), l) {
		case "property":
			if (!processSegment(c, s)) return [];
			break;
		case "index": throw Error("Index was not closed");
		case "start":
			s.push("");
			break;
	}
	return s;
}
function normalizePath(r) {
	if (typeof r == "string") return parsePath(r);
	if (Array.isArray(r)) {
		let s = [];
		for (let [c, l] of r.entries()) {
			if (typeof l != "string" && typeof l != "number") throw TypeError(`Expected a string or number for path segment at index ${c}, got ${typeof l}`);
			if (typeof l == "number" && !Number.isFinite(l)) throw TypeError(`Path segment at index ${c} must be a finite number, got ${l}`);
			if (disallowedKeys.has(l)) return [];
			typeof l == "string" && shouldCoerceToNumber(l) ? s.push(Number.parseInt(l, 10)) : s.push(l);
		}
		return s;
	}
	return [];
}
function getProperty(r, s, c) {
	if (!isObject(r) || typeof s != "string" && !Array.isArray(s)) return c === void 0 ? r : c;
	let l = normalizePath(s);
	if (l.length === 0) return c;
	for (let s = 0; s < l.length; s++) {
		let u = l[s];
		if (r = r[u], r == null) {
			if (s !== l.length - 1) return c;
			break;
		}
	}
	return r === void 0 ? c : r;
}
function setProperty(r, s, c) {
	if (!isObject(r) || typeof s != "string" && !Array.isArray(s)) return r;
	let l = r, u = normalizePath(s);
	if (u.length === 0) return r;
	for (let s = 0; s < u.length; s++) {
		let l = u[s];
		if (s === u.length - 1) r[l] = c;
		else if (!isObject(r[l])) {
			let c = typeof u[s + 1] == "number";
			r[l] = c ? [] : {};
		}
		r = r[l];
	}
	return l;
}
function deleteProperty(r, s) {
	if (!isObject(r) || typeof s != "string" && !Array.isArray(s)) return !1;
	let c = normalizePath(s);
	if (c.length === 0) return !1;
	for (let s = 0; s < c.length; s++) {
		let l = c[s];
		if (s === c.length - 1) return Object.hasOwn(r, l) ? (delete r[l], !0) : !1;
		if (r = r[l], !isObject(r)) return !1;
	}
}
function hasProperty(r, s) {
	if (!isObject(r) || typeof s != "string" && !Array.isArray(s)) return !1;
	let c = normalizePath(s);
	if (c.length === 0) return !1;
	for (let s of c) {
		if (!isObject(r) || !(s in r)) return !1;
		r = r[s];
	}
	return !0;
}
var homedir = os.homedir(), tmpdir = os.tmpdir(), { env } = process$1, macos = (r) => {
	let s = path.join(homedir, "Library");
	return {
		data: path.join(s, "Application Support", r),
		config: path.join(s, "Preferences", r),
		cache: path.join(s, "Caches", r),
		log: path.join(s, "Logs", r),
		temp: path.join(tmpdir, r)
	};
}, windows = (r) => {
	let s = env.APPDATA || path.join(homedir, "AppData", "Roaming"), c = env.LOCALAPPDATA || path.join(homedir, "AppData", "Local");
	return {
		data: path.join(c, r, "Data"),
		config: path.join(s, r, "Config"),
		cache: path.join(c, r, "Cache"),
		log: path.join(c, r, "Log"),
		temp: path.join(tmpdir, r)
	};
}, linux = (r) => {
	let s = path.basename(homedir);
	return {
		data: path.join(env.XDG_DATA_HOME || path.join(homedir, ".local", "share"), r),
		config: path.join(env.XDG_CONFIG_HOME || path.join(homedir, ".config"), r),
		cache: path.join(env.XDG_CACHE_HOME || path.join(homedir, ".cache"), r),
		log: path.join(env.XDG_STATE_HOME || path.join(homedir, ".local", "state"), r),
		temp: path.join(tmpdir, s, r)
	};
};
function envPaths(r, { suffix: s = "nodejs" } = {}) {
	if (typeof r != "string") throw TypeError(`Expected a string, got ${typeof r}`);
	return s && (r += `-${s}`), process$1.platform === "darwin" ? macos(r) : process$1.platform === "win32" ? windows(r) : linux(r);
}
var attemptify_async_default = (r, s) => {
	let { onError: c } = s;
	return function(...s) {
		return r.apply(void 0, s).catch(c);
	};
}, attemptify_sync_default = (r, s) => {
	let { onError: c } = s;
	return function(...s) {
		try {
			return r.apply(void 0, s);
		} catch (r) {
			return c(r);
		}
	};
}, retryify_async_default = (r, s) => {
	let { isRetriable: c } = s;
	return function(s) {
		let { timeout: l } = s, u = s.interval ?? 250, d = Date.now() + l;
		return function s(...l) {
			return r.apply(void 0, l).catch((r) => {
				if (!c(r) || Date.now() >= d) throw r;
				let f = Math.round(u * Math.random());
				return f > 0 ? new Promise((r) => setTimeout(r, f)).then(() => s.apply(void 0, l)) : s.apply(void 0, l);
			});
		};
	};
}, retryify_sync_default = (r, s) => {
	let { isRetriable: c } = s;
	return function(s) {
		let { timeout: l } = s, u = Date.now() + l;
		return function(...s) {
			for (;;) try {
				return r.apply(void 0, s);
			} catch (r) {
				if (!c(r) || Date.now() >= u) throw r;
				continue;
			}
		};
	};
}, Handlers = {
	isChangeErrorOk: (r) => {
		if (!Handlers.isNodeError(r)) return !1;
		let { code: s } = r;
		return s === "ENOSYS" || !IS_USER_ROOT$1 && (s === "EINVAL" || s === "EPERM");
	},
	isNodeError: (r) => r instanceof Error,
	isRetriableError: (r) => {
		if (!Handlers.isNodeError(r)) return !1;
		let { code: s } = r;
		return s === "EMFILE" || s === "ENFILE" || s === "EAGAIN" || s === "EBUSY" || s === "EACCESS" || s === "EACCES" || s === "EACCS" || s === "EPERM";
	},
	onChangeError: (r) => {
		if (!Handlers.isNodeError(r) || !Handlers.isChangeErrorOk(r)) throw r;
	}
}, handlers_default = Handlers, ATTEMPTIFY_CHANGE_ERROR_OPTIONS = { onError: handlers_default.onChangeError }, ATTEMPTIFY_NOOP_OPTIONS = { onError: () => void 0 }, IS_USER_ROOT$1 = process$1.getuid ? !process$1.getuid() : !1, RETRYIFY_OPTIONS = { isRetriable: handlers_default.isRetriableError }, dist_default = {
	attempt: {
		chmod: attemptify_async_default(promisify(fs.chmod), ATTEMPTIFY_CHANGE_ERROR_OPTIONS),
		chown: attemptify_async_default(promisify(fs.chown), ATTEMPTIFY_CHANGE_ERROR_OPTIONS),
		close: attemptify_async_default(promisify(fs.close), ATTEMPTIFY_NOOP_OPTIONS),
		fsync: attemptify_async_default(promisify(fs.fsync), ATTEMPTIFY_NOOP_OPTIONS),
		mkdir: attemptify_async_default(promisify(fs.mkdir), ATTEMPTIFY_NOOP_OPTIONS),
		realpath: attemptify_async_default(promisify(fs.realpath), ATTEMPTIFY_NOOP_OPTIONS),
		stat: attemptify_async_default(promisify(fs.stat), ATTEMPTIFY_NOOP_OPTIONS),
		unlink: attemptify_async_default(promisify(fs.unlink), ATTEMPTIFY_NOOP_OPTIONS),
		chmodSync: attemptify_sync_default(fs.chmodSync, ATTEMPTIFY_CHANGE_ERROR_OPTIONS),
		chownSync: attemptify_sync_default(fs.chownSync, ATTEMPTIFY_CHANGE_ERROR_OPTIONS),
		closeSync: attemptify_sync_default(fs.closeSync, ATTEMPTIFY_NOOP_OPTIONS),
		existsSync: attemptify_sync_default(fs.existsSync, ATTEMPTIFY_NOOP_OPTIONS),
		fsyncSync: attemptify_sync_default(fs.fsync, ATTEMPTIFY_NOOP_OPTIONS),
		mkdirSync: attemptify_sync_default(fs.mkdirSync, ATTEMPTIFY_NOOP_OPTIONS),
		realpathSync: attemptify_sync_default(fs.realpathSync, ATTEMPTIFY_NOOP_OPTIONS),
		statSync: attemptify_sync_default(fs.statSync, ATTEMPTIFY_NOOP_OPTIONS),
		unlinkSync: attemptify_sync_default(fs.unlinkSync, ATTEMPTIFY_NOOP_OPTIONS)
	},
	retry: {
		close: retryify_async_default(promisify(fs.close), RETRYIFY_OPTIONS),
		fsync: retryify_async_default(promisify(fs.fsync), RETRYIFY_OPTIONS),
		open: retryify_async_default(promisify(fs.open), RETRYIFY_OPTIONS),
		readFile: retryify_async_default(promisify(fs.readFile), RETRYIFY_OPTIONS),
		rename: retryify_async_default(promisify(fs.rename), RETRYIFY_OPTIONS),
		stat: retryify_async_default(promisify(fs.stat), RETRYIFY_OPTIONS),
		write: retryify_async_default(promisify(fs.write), RETRYIFY_OPTIONS),
		writeFile: retryify_async_default(promisify(fs.writeFile), RETRYIFY_OPTIONS),
		closeSync: retryify_sync_default(fs.closeSync, RETRYIFY_OPTIONS),
		fsyncSync: retryify_sync_default(fs.fsyncSync, RETRYIFY_OPTIONS),
		openSync: retryify_sync_default(fs.openSync, RETRYIFY_OPTIONS),
		readFileSync: retryify_sync_default(fs.readFileSync, RETRYIFY_OPTIONS),
		renameSync: retryify_sync_default(fs.renameSync, RETRYIFY_OPTIONS),
		statSync: retryify_sync_default(fs.statSync, RETRYIFY_OPTIONS),
		writeSync: retryify_sync_default(fs.writeSync, RETRYIFY_OPTIONS),
		writeFileSync: retryify_sync_default(fs.writeFileSync, RETRYIFY_OPTIONS)
	}
}, DEFAULT_WRITE_OPTIONS = {}, DEFAULT_USER_UID = process$1.geteuid ? process$1.geteuid() : -1, DEFAULT_USER_GID = process$1.getegid ? process$1.getegid() : -1, IS_POSIX = !!process$1.getuid;
process$1.getuid && process$1.getuid();
var isException = (r) => r instanceof Error && "code" in r, isString = (r) => typeof r == "string", isUndefined = (r) => r === void 0, browser_default = new class {
	constructor() {
		this.callbacks = /* @__PURE__ */ new Set(), this.exit = () => {
			for (let r of this.callbacks) r();
		}, this.hook = () => {
			window.addEventListener("beforeunload", this.exit);
		}, this.register = (r) => (this.callbacks.add(r), () => {
			this.callbacks.delete(r);
		}), this.hook();
	}
}().register, Temp = {
	store: {},
	create: (r) => {
		let s = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6);
		return `${r}${`.tmp-${Date.now().toString().slice(-10)}${s}`}`;
	},
	get: (r, s, c = !0) => {
		let l = Temp.truncate(s(r));
		return l in Temp.store ? Temp.get(r, s, c) : (Temp.store[l] = c, [l, () => delete Temp.store[l]]);
	},
	purge: (r) => {
		Temp.store[r] && (delete Temp.store[r], dist_default.attempt.unlink(r));
	},
	purgeSync: (r) => {
		Temp.store[r] && (delete Temp.store[r], dist_default.attempt.unlinkSync(r));
	},
	purgeSyncAll: () => {
		for (let r in Temp.store) Temp.purgeSync(r);
	},
	truncate: (r) => {
		let s = path.basename(r);
		if (s.length <= 128) return r;
		let c = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(s);
		if (!c) return r;
		let l = s.length - 128;
		return `${r.slice(0, -s.length)}${c[1]}${c[2].slice(0, -l)}${c[3]}`;
	}
};
browser_default(Temp.purgeSyncAll);
var temp_default = Temp;
function writeFileSync(r, s, c = DEFAULT_WRITE_OPTIONS) {
	if (isString(c)) return writeFileSync(r, s, { encoding: c });
	let l = { timeout: c.timeout ?? 1e3 }, u = null, d = null, f = null;
	try {
		let p = dist_default.attempt.realpathSync(r), h = !!p;
		r = p || r, [d, u] = temp_default.get(r, c.tmpCreate || temp_default.create, c.tmpPurge !== !1);
		let g = IS_POSIX && isUndefined(c.chown), _ = isUndefined(c.mode);
		if (h && (g || _)) {
			let s = dist_default.attempt.statSync(r);
			s && (c = { ...c }, g && (c.chown = {
				uid: s.uid,
				gid: s.gid
			}), _ && (c.mode = s.mode));
		}
		if (!h) {
			let s = path.dirname(r);
			dist_default.attempt.mkdirSync(s, {
				mode: 511,
				recursive: !0
			});
		}
		f = dist_default.retry.openSync(l)(d, "w", c.mode || 438), c.tmpCreated && c.tmpCreated(d), isString(s) ? dist_default.retry.writeSync(l)(f, s, 0, c.encoding || "utf8") : isUndefined(s) || dist_default.retry.writeSync(l)(f, s, 0, s.length, 0), c.fsync !== !1 && (c.fsyncWait === !1 ? dist_default.attempt.fsync(f) : dist_default.retry.fsyncSync(l)(f)), dist_default.retry.closeSync(l)(f), f = null, c.chown && (c.chown.uid !== DEFAULT_USER_UID || c.chown.gid !== DEFAULT_USER_GID) && dist_default.attempt.chownSync(d, c.chown.uid, c.chown.gid), c.mode && c.mode !== 438 && dist_default.attempt.chmodSync(d, c.mode);
		try {
			dist_default.retry.renameSync(l)(d, r);
		} catch (s) {
			if (!isException(s) || s.code !== "ENAMETOOLONG") throw s;
			dist_default.retry.renameSync(l)(d, temp_default.truncate(r));
		}
		u(), d = null;
	} finally {
		f && dist_default.attempt.closeSync(f), d && temp_default.purge(d);
	}
}
var require_code$3 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.regexpCode = r.getEsmExportName = r.getProperty = r.safeStringify = r.stringify = r.strConcat = r.addCodeArg = r.str = r._ = r.nil = r._Code = r.Name = r.IDENTIFIER = r._CodeOrName = void 0;
	var s = class {};
	r._CodeOrName = s, r.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
	var c = class extends s {
		constructor(s) {
			if (super(), !r.IDENTIFIER.test(s)) throw Error("CodeGen: name must be a valid identifier");
			this.str = s;
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
	};
	r.Name = c;
	var l = class extends s {
		constructor(r) {
			super(), this._items = typeof r == "string" ? [r] : r;
		}
		toString() {
			return this.str;
		}
		emptyStr() {
			if (this._items.length > 1) return !1;
			let r = this._items[0];
			return r === "" || r === "\"\"";
		}
		get str() {
			return this._str ??= this._items.reduce((r, s) => `${r}${s}`, "");
		}
		get names() {
			return this._names ??= this._items.reduce((r, s) => (s instanceof c && (r[s.str] = (r[s.str] || 0) + 1), r), {});
		}
	};
	r._Code = l, r.nil = new l("");
	function u(r, ...s) {
		let c = [r[0]], u = 0;
		for (; u < s.length;) p(c, s[u]), c.push(r[++u]);
		return new l(c);
	}
	r._ = u;
	var d = new l("+");
	function f(r, ...s) {
		let c = [y(r[0])], u = 0;
		for (; u < s.length;) c.push(d), p(c, s[u]), c.push(d, y(r[++u]));
		return m(c), new l(c);
	}
	r.str = f;
	function p(r, s) {
		s instanceof l ? r.push(...s._items) : s instanceof c ? r.push(s) : r.push(_(s));
	}
	r.addCodeArg = p;
	function m(r) {
		let s = 1;
		for (; s < r.length - 1;) {
			if (r[s] === d) {
				let c = h(r[s - 1], r[s + 1]);
				if (c !== void 0) {
					r.splice(s - 1, 3, c);
					continue;
				}
				r[s++] = "+";
			}
			s++;
		}
	}
	function h(r, s) {
		if (s === "\"\"") return r;
		if (r === "\"\"") return s;
		if (typeof r == "string") return s instanceof c || r[r.length - 1] !== "\"" ? void 0 : typeof s == "string" ? s[0] === "\"" ? r.slice(0, -1) + s.slice(1) : void 0 : `${r.slice(0, -1)}${s}"`;
		if (typeof s == "string" && s[0] === "\"" && !(r instanceof c)) return `"${r}${s.slice(1)}`;
	}
	function g(r, s) {
		return s.emptyStr() ? r : r.emptyStr() ? s : f`${r}${s}`;
	}
	r.strConcat = g;
	function _(r) {
		return typeof r == "number" || typeof r == "boolean" || r === null ? r : y(Array.isArray(r) ? r.join(",") : r);
	}
	function v(r) {
		return new l(y(r));
	}
	r.stringify = v;
	function y(r) {
		return JSON.stringify(r).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
	}
	r.safeStringify = y;
	function b(s) {
		return typeof s == "string" && r.IDENTIFIER.test(s) ? new l(`.${s}`) : u`[${s}]`;
	}
	r.getProperty = b;
	function x(s) {
		if (typeof s == "string" && r.IDENTIFIER.test(s)) return new l(`${s}`);
		throw Error(`CodeGen: invalid export name: ${s}, use explicit $id name mapping`);
	}
	r.getEsmExportName = x;
	function S(r) {
		return new l(r.toString());
	}
	r.regexpCode = S;
})), require_scope$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.ValueScope = r.ValueScopeName = r.Scope = r.varKinds = r.UsedValueState = void 0;
	var s = require_code$3(), c = class extends Error {
		constructor(r) {
			super(`CodeGen: "code" for ${r} not defined`), this.value = r.value;
		}
	}, l;
	(function(r) {
		r[r.Started = 0] = "Started", r[r.Completed = 1] = "Completed";
	})(l || (r.UsedValueState = l = {})), r.varKinds = {
		const: new s.Name("const"),
		let: new s.Name("let"),
		var: new s.Name("var")
	};
	var u = class {
		constructor({ prefixes: r, parent: s } = {}) {
			this._names = {}, this._prefixes = r, this._parent = s;
		}
		toName(r) {
			return r instanceof s.Name ? r : this.name(r);
		}
		name(r) {
			return new s.Name(this._newName(r));
		}
		_newName(r) {
			let s = this._names[r] || this._nameGroup(r);
			return `${r}${s.index++}`;
		}
		_nameGroup(r) {
			if ((this._parent?._prefixes)?.has(r) || this._prefixes && !this._prefixes.has(r)) throw Error(`CodeGen: prefix "${r}" is not allowed in this scope`);
			return this._names[r] = {
				prefix: r,
				index: 0
			};
		}
	};
	r.Scope = u;
	var d = class extends s.Name {
		constructor(r, s) {
			super(s), this.prefix = r;
		}
		setValue(r, { property: c, itemIndex: l }) {
			this.value = r, this.scopePath = (0, s._)`.${new s.Name(c)}[${l}]`;
		}
	};
	r.ValueScopeName = d;
	var f = (0, s._)`\n`;
	r.ValueScope = class extends u {
		constructor(r) {
			super(r), this._values = {}, this._scope = r.scope, this.opts = {
				...r,
				_n: r.lines ? f : s.nil
			};
		}
		get() {
			return this._scope;
		}
		name(r) {
			return new d(r, this._newName(r));
		}
		value(r, s) {
			if (s.ref === void 0) throw Error("CodeGen: ref must be passed in value");
			let c = this.toName(r), { prefix: l } = c, u = s.key ?? s.ref, d = this._values[l];
			if (d) {
				let r = d.get(u);
				if (r) return r;
			} else d = this._values[l] = /* @__PURE__ */ new Map();
			d.set(u, c);
			let f = this._scope[l] || (this._scope[l] = []), p = f.length;
			return f[p] = s.ref, c.setValue(s, {
				property: l,
				itemIndex: p
			}), c;
		}
		getValue(r, s) {
			let c = this._values[r];
			if (c) return c.get(s);
		}
		scopeRefs(r, c = this._values) {
			return this._reduceValues(c, (c) => {
				if (c.scopePath === void 0) throw Error(`CodeGen: name "${c}" has no value`);
				return (0, s._)`${r}${c.scopePath}`;
			});
		}
		scopeCode(r = this._values, s, c) {
			return this._reduceValues(r, (r) => {
				if (r.value === void 0) throw Error(`CodeGen: name "${r}" has no value`);
				return r.value.code;
			}, s, c);
		}
		_reduceValues(u, d, f = {}, p) {
			let m = s.nil;
			for (let h in u) {
				let g = u[h];
				if (!g) continue;
				let _ = f[h] = f[h] || /* @__PURE__ */ new Map();
				g.forEach((u) => {
					if (_.has(u)) return;
					_.set(u, l.Started);
					let f = d(u);
					if (f) {
						let c = this.opts.es5 ? r.varKinds.var : r.varKinds.const;
						m = (0, s._)`${m}${c} ${u} = ${f};${this.opts._n}`;
					} else if (f = p?.(u)) m = (0, s._)`${m}${f}${this.opts._n}`;
					else throw new c(u);
					_.set(u, l.Completed);
				});
			}
			return m;
		}
	};
})), require_codegen$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.or = r.and = r.not = r.CodeGen = r.operators = r.varKinds = r.ValueScopeName = r.ValueScope = r.Scope = r.Name = r.regexpCode = r.stringify = r.getProperty = r.nil = r.strConcat = r.str = r._ = void 0;
	var s = require_code$3(), c = require_scope$1(), l = require_code$3();
	Object.defineProperty(r, "_", {
		enumerable: !0,
		get: function() {
			return l._;
		}
	}), Object.defineProperty(r, "str", {
		enumerable: !0,
		get: function() {
			return l.str;
		}
	}), Object.defineProperty(r, "strConcat", {
		enumerable: !0,
		get: function() {
			return l.strConcat;
		}
	}), Object.defineProperty(r, "nil", {
		enumerable: !0,
		get: function() {
			return l.nil;
		}
	}), Object.defineProperty(r, "getProperty", {
		enumerable: !0,
		get: function() {
			return l.getProperty;
		}
	}), Object.defineProperty(r, "stringify", {
		enumerable: !0,
		get: function() {
			return l.stringify;
		}
	}), Object.defineProperty(r, "regexpCode", {
		enumerable: !0,
		get: function() {
			return l.regexpCode;
		}
	}), Object.defineProperty(r, "Name", {
		enumerable: !0,
		get: function() {
			return l.Name;
		}
	});
	var u = require_scope$1();
	Object.defineProperty(r, "Scope", {
		enumerable: !0,
		get: function() {
			return u.Scope;
		}
	}), Object.defineProperty(r, "ValueScope", {
		enumerable: !0,
		get: function() {
			return u.ValueScope;
		}
	}), Object.defineProperty(r, "ValueScopeName", {
		enumerable: !0,
		get: function() {
			return u.ValueScopeName;
		}
	}), Object.defineProperty(r, "varKinds", {
		enumerable: !0,
		get: function() {
			return u.varKinds;
		}
	}), r.operators = {
		GT: new s._Code(">"),
		GTE: new s._Code(">="),
		LT: new s._Code("<"),
		LTE: new s._Code("<="),
		EQ: new s._Code("==="),
		NEQ: new s._Code("!=="),
		NOT: new s._Code("!"),
		OR: new s._Code("||"),
		AND: new s._Code("&&"),
		ADD: new s._Code("+")
	};
	var d = class {
		optimizeNodes() {
			return this;
		}
		optimizeNames(r, s) {
			return this;
		}
	}, f = class extends d {
		constructor(r, s, c) {
			super(), this.varKind = r, this.name = s, this.rhs = c;
		}
		render({ es5: r, _n: s }) {
			let l = r ? c.varKinds.var : this.varKind, u = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
			return `${l} ${this.name}${u};` + s;
		}
		optimizeNames(r, s) {
			if (r[this.name.str]) return this.rhs &&= F(this.rhs, r, s), this;
		}
		get names() {
			return this.rhs instanceof s._CodeOrName ? this.rhs.names : {};
		}
	}, p = class extends d {
		constructor(r, s, c) {
			super(), this.lhs = r, this.rhs = s, this.sideEffects = c;
		}
		render({ _n: r }) {
			return `${this.lhs} = ${this.rhs};` + r;
		}
		optimizeNames(r, c) {
			if (!(this.lhs instanceof s.Name && !r[this.lhs.str] && !this.sideEffects)) return this.rhs = F(this.rhs, r, c), this;
		}
		get names() {
			return P(this.lhs instanceof s.Name ? {} : { ...this.lhs.names }, this.rhs);
		}
	}, m = class extends p {
		constructor(r, s, c, l) {
			super(r, c, l), this.op = s;
		}
		render({ _n: r }) {
			return `${this.lhs} ${this.op}= ${this.rhs};` + r;
		}
	}, h = class extends d {
		constructor(r) {
			super(), this.label = r, this.names = {};
		}
		render({ _n: r }) {
			return `${this.label}:` + r;
		}
	}, g = class extends d {
		constructor(r) {
			super(), this.label = r, this.names = {};
		}
		render({ _n: r }) {
			return `break${this.label ? ` ${this.label}` : ""};` + r;
		}
	}, _ = class extends d {
		constructor(r) {
			super(), this.error = r;
		}
		render({ _n: r }) {
			return `throw ${this.error};` + r;
		}
		get names() {
			return this.error.names;
		}
	}, v = class extends d {
		constructor(r) {
			super(), this.code = r;
		}
		render({ _n: r }) {
			return `${this.code};` + r;
		}
		optimizeNodes() {
			return `${this.code}` ? this : void 0;
		}
		optimizeNames(r, s) {
			return this.code = F(this.code, r, s), this;
		}
		get names() {
			return this.code instanceof s._CodeOrName ? this.code.names : {};
		}
	}, y = class extends d {
		constructor(r = []) {
			super(), this.nodes = r;
		}
		render(r) {
			return this.nodes.reduce((s, c) => s + c.render(r), "");
		}
		optimizeNodes() {
			let { nodes: r } = this, s = r.length;
			for (; s--;) {
				let c = r[s].optimizeNodes();
				Array.isArray(c) ? r.splice(s, 1, ...c) : c ? r[s] = c : r.splice(s, 1);
			}
			return r.length > 0 ? this : void 0;
		}
		optimizeNames(r, s) {
			let { nodes: c } = this, l = c.length;
			for (; l--;) {
				let u = c[l];
				u.optimizeNames(r, s) || (I(r, u.names), c.splice(l, 1));
			}
			return c.length > 0 ? this : void 0;
		}
		get names() {
			return this.nodes.reduce((r, s) => N(r, s.names), {});
		}
	}, b = class extends y {
		render(r) {
			return "{" + r._n + super.render(r) + "}" + r._n;
		}
	}, x = class extends y {}, S = class extends b {};
	S.kind = "else";
	var C = class r extends b {
		constructor(r, s) {
			super(s), this.condition = r;
		}
		render(r) {
			let s = `if(${this.condition})` + super.render(r);
			return this.else && (s += "else " + this.else.render(r)), s;
		}
		optimizeNodes() {
			super.optimizeNodes();
			let s = this.condition;
			if (s === !0) return this.nodes;
			let c = this.else;
			if (c) {
				let r = c.optimizeNodes();
				c = this.else = Array.isArray(r) ? new S(r) : r;
			}
			if (c) return s === !1 ? c instanceof r ? c : c.nodes : this.nodes.length ? this : new r(L(s), c instanceof r ? [c] : c.nodes);
			if (!(s === !1 || !this.nodes.length)) return this;
		}
		optimizeNames(r, s) {
			if (this.else = this.else?.optimizeNames(r, s), super.optimizeNames(r, s) || this.else) return this.condition = F(this.condition, r, s), this;
		}
		get names() {
			let r = super.names;
			return P(r, this.condition), this.else && N(r, this.else.names), r;
		}
	};
	C.kind = "if";
	var w = class extends b {};
	w.kind = "for";
	var T = class extends w {
		constructor(r) {
			super(), this.iteration = r;
		}
		render(r) {
			return `for(${this.iteration})` + super.render(r);
		}
		optimizeNames(r, s) {
			if (super.optimizeNames(r, s)) return this.iteration = F(this.iteration, r, s), this;
		}
		get names() {
			return N(super.names, this.iteration.names);
		}
	}, E = class extends w {
		constructor(r, s, c, l) {
			super(), this.varKind = r, this.name = s, this.from = c, this.to = l;
		}
		render(r) {
			let s = r.es5 ? c.varKinds.var : this.varKind, { name: l, from: u, to: d } = this;
			return `for(${s} ${l}=${u}; ${l}<${d}; ${l}++)` + super.render(r);
		}
		get names() {
			return P(P(super.names, this.from), this.to);
		}
	}, D = class extends w {
		constructor(r, s, c, l) {
			super(), this.loop = r, this.varKind = s, this.name = c, this.iterable = l;
		}
		render(r) {
			return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(r);
		}
		optimizeNames(r, s) {
			if (super.optimizeNames(r, s)) return this.iterable = F(this.iterable, r, s), this;
		}
		get names() {
			return N(super.names, this.iterable.names);
		}
	}, O = class extends b {
		constructor(r, s, c) {
			super(), this.name = r, this.args = s, this.async = c;
		}
		render(r) {
			return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(r);
		}
	};
	O.kind = "func";
	var k = class extends y {
		render(r) {
			return "return " + super.render(r);
		}
	};
	k.kind = "return";
	var A = class extends b {
		render(r) {
			let s = "try" + super.render(r);
			return this.catch && (s += this.catch.render(r)), this.finally && (s += this.finally.render(r)), s;
		}
		optimizeNodes() {
			var r, s;
			return super.optimizeNodes(), (r = this.catch) == null || r.optimizeNodes(), (s = this.finally) == null || s.optimizeNodes(), this;
		}
		optimizeNames(r, s) {
			var c, l;
			return super.optimizeNames(r, s), (c = this.catch) == null || c.optimizeNames(r, s), (l = this.finally) == null || l.optimizeNames(r, s), this;
		}
		get names() {
			let r = super.names;
			return this.catch && N(r, this.catch.names), this.finally && N(r, this.finally.names), r;
		}
	}, j = class extends b {
		constructor(r) {
			super(), this.error = r;
		}
		render(r) {
			return `catch(${this.error})` + super.render(r);
		}
	};
	j.kind = "catch";
	var M = class extends b {
		render(r) {
			return "finally" + super.render(r);
		}
	};
	M.kind = "finally", r.CodeGen = class {
		constructor(r, s = {}) {
			this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = {
				...s,
				_n: s.lines ? "\n" : ""
			}, this._extScope = r, this._scope = new c.Scope({ parent: r }), this._nodes = [new x()];
		}
		toString() {
			return this._root.render(this.opts);
		}
		name(r) {
			return this._scope.name(r);
		}
		scopeName(r) {
			return this._extScope.name(r);
		}
		scopeValue(r, s) {
			let c = this._extScope.value(r, s);
			return (this._values[c.prefix] || (this._values[c.prefix] = /* @__PURE__ */ new Set())).add(c), c;
		}
		getScopeValue(r, s) {
			return this._extScope.getValue(r, s);
		}
		scopeRefs(r) {
			return this._extScope.scopeRefs(r, this._values);
		}
		scopeCode() {
			return this._extScope.scopeCode(this._values);
		}
		_def(r, s, c, l) {
			let u = this._scope.toName(s);
			return c !== void 0 && l && (this._constants[u.str] = c), this._leafNode(new f(r, u, c)), u;
		}
		const(r, s, l) {
			return this._def(c.varKinds.const, r, s, l);
		}
		let(r, s, l) {
			return this._def(c.varKinds.let, r, s, l);
		}
		var(r, s, l) {
			return this._def(c.varKinds.var, r, s, l);
		}
		assign(r, s, c) {
			return this._leafNode(new p(r, s, c));
		}
		add(s, c) {
			return this._leafNode(new m(s, r.operators.ADD, c));
		}
		code(r) {
			return typeof r == "function" ? r() : r !== s.nil && this._leafNode(new v(r)), this;
		}
		object(...r) {
			let c = ["{"];
			for (let [l, u] of r) c.length > 1 && c.push(","), c.push(l), (l !== u || this.opts.es5) && (c.push(":"), (0, s.addCodeArg)(c, u));
			return c.push("}"), new s._Code(c);
		}
		if(r, s, c) {
			if (this._blockNode(new C(r)), s && c) this.code(s).else().code(c).endIf();
			else if (s) this.code(s).endIf();
			else if (c) throw Error("CodeGen: \"else\" body without \"then\" body");
			return this;
		}
		elseIf(r) {
			return this._elseNode(new C(r));
		}
		else() {
			return this._elseNode(new S());
		}
		endIf() {
			return this._endBlockNode(C, S);
		}
		_for(r, s) {
			return this._blockNode(r), s && this.code(s).endFor(), this;
		}
		for(r, s) {
			return this._for(new T(r), s);
		}
		forRange(r, s, l, u, d = this.opts.es5 ? c.varKinds.var : c.varKinds.let) {
			let f = this._scope.toName(r);
			return this._for(new E(d, f, s, l), () => u(f));
		}
		forOf(r, l, u, d = c.varKinds.const) {
			let f = this._scope.toName(r);
			if (this.opts.es5) {
				let r = l instanceof s.Name ? l : this.var("_arr", l);
				return this.forRange("_i", 0, (0, s._)`${r}.length`, (c) => {
					this.var(f, (0, s._)`${r}[${c}]`), u(f);
				});
			}
			return this._for(new D("of", d, f, l), () => u(f));
		}
		forIn(r, l, u, d = this.opts.es5 ? c.varKinds.var : c.varKinds.const) {
			if (this.opts.ownProperties) return this.forOf(r, (0, s._)`Object.keys(${l})`, u);
			let f = this._scope.toName(r);
			return this._for(new D("in", d, f, l), () => u(f));
		}
		endFor() {
			return this._endBlockNode(w);
		}
		label(r) {
			return this._leafNode(new h(r));
		}
		break(r) {
			return this._leafNode(new g(r));
		}
		return(r) {
			let s = new k();
			if (this._blockNode(s), this.code(r), s.nodes.length !== 1) throw Error("CodeGen: \"return\" should have one node");
			return this._endBlockNode(k);
		}
		try(r, s, c) {
			if (!s && !c) throw Error("CodeGen: \"try\" without \"catch\" and \"finally\"");
			let l = new A();
			if (this._blockNode(l), this.code(r), s) {
				let r = this.name("e");
				this._currNode = l.catch = new j(r), s(r);
			}
			return c && (this._currNode = l.finally = new M(), this.code(c)), this._endBlockNode(j, M);
		}
		throw(r) {
			return this._leafNode(new _(r));
		}
		block(r, s) {
			return this._blockStarts.push(this._nodes.length), r && this.code(r).endBlock(s), this;
		}
		endBlock(r) {
			let s = this._blockStarts.pop();
			if (s === void 0) throw Error("CodeGen: not in self-balancing block");
			let c = this._nodes.length - s;
			if (c < 0 || r !== void 0 && c !== r) throw Error(`CodeGen: wrong number of nodes: ${c} vs ${r} expected`);
			return this._nodes.length = s, this;
		}
		func(r, c = s.nil, l, u) {
			return this._blockNode(new O(r, c, l)), u && this.code(u).endFunc(), this;
		}
		endFunc() {
			return this._endBlockNode(O);
		}
		optimize(r = 1) {
			for (; r-- > 0;) this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
		}
		_leafNode(r) {
			return this._currNode.nodes.push(r), this;
		}
		_blockNode(r) {
			this._currNode.nodes.push(r), this._nodes.push(r);
		}
		_endBlockNode(r, s) {
			let c = this._currNode;
			if (c instanceof r || s && c instanceof s) return this._nodes.pop(), this;
			throw Error(`CodeGen: not in block "${s ? `${r.kind}/${s.kind}` : r.kind}"`);
		}
		_elseNode(r) {
			let s = this._currNode;
			if (!(s instanceof C)) throw Error("CodeGen: \"else\" without \"if\"");
			return this._currNode = s.else = r, this;
		}
		get _root() {
			return this._nodes[0];
		}
		get _currNode() {
			let r = this._nodes;
			return r[r.length - 1];
		}
		set _currNode(r) {
			let s = this._nodes;
			s[s.length - 1] = r;
		}
	};
	function N(r, s) {
		for (let c in s) r[c] = (r[c] || 0) + (s[c] || 0);
		return r;
	}
	function P(r, c) {
		return c instanceof s._CodeOrName ? N(r, c.names) : r;
	}
	function F(r, c, l) {
		if (r instanceof s.Name) return u(r);
		if (!d(r)) return r;
		return new s._Code(r._items.reduce((r, c) => (c instanceof s.Name && (c = u(c)), c instanceof s._Code ? r.push(...c._items) : r.push(c), r), []));
		function u(r) {
			let s = l[r.str];
			return s === void 0 || c[r.str] !== 1 ? r : (delete c[r.str], s);
		}
		function d(r) {
			return r instanceof s._Code && r._items.some((r) => r instanceof s.Name && c[r.str] === 1 && l[r.str] !== void 0);
		}
	}
	function I(r, s) {
		for (let c in s) r[c] = (r[c] || 0) - (s[c] || 0);
	}
	function L(r) {
		return typeof r == "boolean" || typeof r == "number" || r === null ? !r : (0, s._)`!${U(r)}`;
	}
	r.not = L;
	var R = H(r.operators.AND);
	function z(...r) {
		return r.reduce(R);
	}
	r.and = z;
	var B = H(r.operators.OR);
	function V(...r) {
		return r.reduce(B);
	}
	r.or = V;
	function H(r) {
		return (c, l) => c === s.nil ? l : l === s.nil ? c : (0, s._)`${U(c)} ${r} ${U(l)}`;
	}
	function U(r) {
		return r instanceof s.Name ? r : (0, s._)`(${r})`;
	}
})), require_util$2 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.checkStrictMode = r.getErrorPath = r.Type = r.useFunc = r.setEvaluated = r.evaluatedPropsToName = r.mergeEvaluated = r.eachItem = r.unescapeJsonPointer = r.escapeJsonPointer = r.escapeFragment = r.unescapeFragment = r.schemaRefOrVal = r.schemaHasRulesButRef = r.schemaHasRules = r.checkUnknownRules = r.alwaysValidSchema = r.toHash = void 0;
	var s = require_codegen$1(), c = require_code$3();
	function l(r) {
		let s = {};
		for (let c of r) s[c] = !0;
		return s;
	}
	r.toHash = l;
	function u(r, s) {
		return typeof s == "boolean" ? s : Object.keys(s).length === 0 ? !0 : (d(r, s), !f(s, r.self.RULES.all));
	}
	r.alwaysValidSchema = u;
	function d(r, s = r.schema) {
		let { opts: c, self: l } = r;
		if (!c.strictSchema || typeof s == "boolean") return;
		let u = l.RULES.keywords;
		for (let c in s) u[c] || D(r, `unknown keyword: "${c}"`);
	}
	r.checkUnknownRules = d;
	function f(r, s) {
		if (typeof r == "boolean") return !r;
		for (let c in r) if (s[c]) return !0;
		return !1;
	}
	r.schemaHasRules = f;
	function p(r, s) {
		if (typeof r == "boolean") return !r;
		for (let c in r) if (c !== "$ref" && s.all[c]) return !0;
		return !1;
	}
	r.schemaHasRulesButRef = p;
	function m({ topSchemaRef: r, schemaPath: c }, l, u, d) {
		if (!d) {
			if (typeof l == "number" || typeof l == "boolean") return l;
			if (typeof l == "string") return (0, s._)`${l}`;
		}
		return (0, s._)`${r}${c}${(0, s.getProperty)(u)}`;
	}
	r.schemaRefOrVal = m;
	function h(r) {
		return v(decodeURIComponent(r));
	}
	r.unescapeFragment = h;
	function g(r) {
		return encodeURIComponent(_(r));
	}
	r.escapeFragment = g;
	function _(r) {
		return typeof r == "number" ? `${r}` : r.replace(/~/g, "~0").replace(/\//g, "~1");
	}
	r.escapeJsonPointer = _;
	function v(r) {
		return r.replace(/~1/g, "/").replace(/~0/g, "~");
	}
	r.unescapeJsonPointer = v;
	function y(r, s) {
		if (Array.isArray(r)) for (let c of r) s(c);
		else s(r);
	}
	r.eachItem = y;
	function b({ mergeNames: r, mergeToName: c, mergeValues: l, resultToName: u }) {
		return (d, f, p, m) => {
			let h = p === void 0 ? f : p instanceof s.Name ? (f instanceof s.Name ? r(d, f, p) : c(d, f, p), p) : f instanceof s.Name ? (c(d, p, f), f) : l(f, p);
			return m === s.Name && !(h instanceof s.Name) ? u(d, h) : h;
		};
	}
	r.mergeEvaluated = {
		props: b({
			mergeNames: (r, c, l) => r.if((0, s._)`${l} !== true && ${c} !== undefined`, () => {
				r.if((0, s._)`${c} === true`, () => r.assign(l, !0), () => r.assign(l, (0, s._)`${l} || {}`).code((0, s._)`Object.assign(${l}, ${c})`));
			}),
			mergeToName: (r, c, l) => r.if((0, s._)`${l} !== true`, () => {
				c === !0 ? r.assign(l, !0) : (r.assign(l, (0, s._)`${l} || {}`), S(r, l, c));
			}),
			mergeValues: (r, s) => r === !0 ? !0 : {
				...r,
				...s
			},
			resultToName: x
		}),
		items: b({
			mergeNames: (r, c, l) => r.if((0, s._)`${l} !== true && ${c} !== undefined`, () => r.assign(l, (0, s._)`${c} === true ? true : ${l} > ${c} ? ${l} : ${c}`)),
			mergeToName: (r, c, l) => r.if((0, s._)`${l} !== true`, () => r.assign(l, c === !0 ? !0 : (0, s._)`${l} > ${c} ? ${l} : ${c}`)),
			mergeValues: (r, s) => r === !0 ? !0 : Math.max(r, s),
			resultToName: (r, s) => r.var("items", s)
		})
	};
	function x(r, c) {
		if (c === !0) return r.var("props", !0);
		let l = r.var("props", (0, s._)`{}`);
		return c !== void 0 && S(r, l, c), l;
	}
	r.evaluatedPropsToName = x;
	function S(r, c, l) {
		Object.keys(l).forEach((l) => r.assign((0, s._)`${c}${(0, s.getProperty)(l)}`, !0));
	}
	r.setEvaluated = S;
	var C = {};
	function w(r, s) {
		return r.scopeValue("func", {
			ref: s,
			code: C[s.code] || (C[s.code] = new c._Code(s.code))
		});
	}
	r.useFunc = w;
	var T;
	(function(r) {
		r[r.Num = 0] = "Num", r[r.Str = 1] = "Str";
	})(T || (r.Type = T = {}));
	function E(r, c, l) {
		if (r instanceof s.Name) {
			let u = c === T.Num;
			return l ? u ? (0, s._)`"[" + ${r} + "]"` : (0, s._)`"['" + ${r} + "']"` : u ? (0, s._)`"/" + ${r}` : (0, s._)`"/" + ${r}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
		}
		return l ? (0, s.getProperty)(r).toString() : "/" + _(r);
	}
	r.getErrorPath = E;
	function D(r, s, c = r.opts.strictSchema) {
		if (c) {
			if (s = `strict mode: ${s}`, c === !0) throw Error(s);
			r.self.logger.warn(s);
		}
	}
	r.checkStrictMode = D;
})), require_names$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_codegen$1();
	r.default = {
		data: new s.Name("data"),
		valCxt: new s.Name("valCxt"),
		instancePath: new s.Name("instancePath"),
		parentData: new s.Name("parentData"),
		parentDataProperty: new s.Name("parentDataProperty"),
		rootData: new s.Name("rootData"),
		dynamicAnchors: new s.Name("dynamicAnchors"),
		vErrors: new s.Name("vErrors"),
		errors: new s.Name("errors"),
		this: new s.Name("this"),
		self: new s.Name("self"),
		scope: new s.Name("scope"),
		json: new s.Name("json"),
		jsonPos: new s.Name("jsonPos"),
		jsonLen: new s.Name("jsonLen"),
		jsonPart: new s.Name("jsonPart")
	};
})), require_errors$2 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.extendErrors = r.resetErrorsCount = r.reportExtraError = r.reportError = r.keyword$DataError = r.keywordError = void 0;
	var s = require_codegen$1(), c = require_util$2(), l = require_names$1();
	r.keywordError = { message: ({ keyword: r }) => (0, s.str)`must pass "${r}" keyword validation` }, r.keyword$DataError = { message: ({ keyword: r, schemaType: c }) => c ? (0, s.str)`"${r}" keyword must be ${c} ($data)` : (0, s.str)`"${r}" keyword is invalid ($data)` };
	function u(c, l = r.keywordError, u, d) {
		let { it: f } = c, { gen: p, compositeRule: g, allErrors: v } = f, y = _(c, l, u);
		d ?? (g || v) ? m(p, y) : h(f, (0, s._)`[${y}]`);
	}
	r.reportError = u;
	function d(s, c = r.keywordError, u) {
		let { it: d } = s, { gen: f, compositeRule: p, allErrors: g } = d;
		m(f, _(s, c, u)), p || g || h(d, l.default.vErrors);
	}
	r.reportExtraError = d;
	function f(r, c) {
		r.assign(l.default.errors, c), r.if((0, s._)`${l.default.vErrors} !== null`, () => r.if(c, () => r.assign((0, s._)`${l.default.vErrors}.length`, c), () => r.assign(l.default.vErrors, null)));
	}
	r.resetErrorsCount = f;
	function p({ gen: r, keyword: c, schemaValue: u, data: d, errsCount: f, it: p }) {
		/* istanbul ignore if */
		if (f === void 0) throw Error("ajv implementation error");
		let m = r.name("err");
		r.forRange("i", f, l.default.errors, (f) => {
			r.const(m, (0, s._)`${l.default.vErrors}[${f}]`), r.if((0, s._)`${m}.instancePath === undefined`, () => r.assign((0, s._)`${m}.instancePath`, (0, s.strConcat)(l.default.instancePath, p.errorPath))), r.assign((0, s._)`${m}.schemaPath`, (0, s.str)`${p.errSchemaPath}/${c}`), p.opts.verbose && (r.assign((0, s._)`${m}.schema`, u), r.assign((0, s._)`${m}.data`, d));
		});
	}
	r.extendErrors = p;
	function m(r, c) {
		let u = r.const("err", c);
		r.if((0, s._)`${l.default.vErrors} === null`, () => r.assign(l.default.vErrors, (0, s._)`[${u}]`), (0, s._)`${l.default.vErrors}.push(${u})`), r.code((0, s._)`${l.default.errors}++`);
	}
	function h(r, c) {
		let { gen: l, validateName: u, schemaEnv: d } = r;
		d.$async ? l.throw((0, s._)`new ${r.ValidationError}(${c})`) : (l.assign((0, s._)`${u}.errors`, c), l.return(!1));
	}
	var g = {
		keyword: new s.Name("keyword"),
		schemaPath: new s.Name("schemaPath"),
		params: new s.Name("params"),
		propertyName: new s.Name("propertyName"),
		message: new s.Name("message"),
		schema: new s.Name("schema"),
		parentSchema: new s.Name("parentSchema")
	};
	function _(r, c, l) {
		let { createErrors: u } = r.it;
		return u === !1 ? (0, s._)`{}` : v(r, c, l);
	}
	function v(r, s, c = {}) {
		let { gen: l, it: u } = r, d = [y(u, c), b(r, c)];
		return x(r, s, d), l.object(...d);
	}
	function y({ errorPath: r }, { instancePath: u }) {
		let d = u ? (0, s.str)`${r}${(0, c.getErrorPath)(u, c.Type.Str)}` : r;
		return [l.default.instancePath, (0, s.strConcat)(l.default.instancePath, d)];
	}
	function b({ keyword: r, it: { errSchemaPath: l } }, { schemaPath: u, parentSchema: d }) {
		let f = d ? l : (0, s.str)`${l}/${r}`;
		return u && (f = (0, s.str)`${f}${(0, c.getErrorPath)(u, c.Type.Str)}`), [g.schemaPath, f];
	}
	function x(r, { params: c, message: u }, d) {
		let { keyword: f, data: p, schemaValue: m, it: h } = r, { opts: _, propertyName: v, topSchemaRef: y, schemaPath: b } = h;
		d.push([g.keyword, f], [g.params, typeof c == "function" ? c(r) : c || (0, s._)`{}`]), _.messages && d.push([g.message, typeof u == "function" ? u(r) : u]), _.verbose && d.push([g.schema, m], [g.parentSchema, (0, s._)`${y}${b}`], [l.default.data, p]), v && d.push([g.propertyName, v]);
	}
})), require_boolSchema$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.boolOrEmptySchema = r.topBoolOrEmptySchema = void 0;
	var s = require_errors$2(), c = require_codegen$1(), l = require_names$1(), u = { message: "boolean schema is false" };
	function d(r) {
		let { gen: s, schema: u, validateName: d } = r;
		u === !1 ? p(r, !1) : typeof u == "object" && u.$async === !0 ? s.return(l.default.data) : (s.assign((0, c._)`${d}.errors`, null), s.return(!0));
	}
	r.topBoolOrEmptySchema = d;
	function f(r, s) {
		let { gen: c, schema: l } = r;
		l === !1 ? (c.var(s, !1), p(r)) : c.var(s, !0);
	}
	r.boolOrEmptySchema = f;
	function p(r, c) {
		let { gen: l, data: d } = r, f = {
			gen: l,
			keyword: "false schema",
			data: d,
			schema: !1,
			schemaCode: !1,
			schemaValue: !1,
			params: {},
			it: r
		};
		(0, s.reportError)(f, u, void 0, c);
	}
})), require_rules$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.getRules = r.isJSONType = void 0;
	var s = new Set([
		"string",
		"number",
		"integer",
		"boolean",
		"null",
		"object",
		"array"
	]);
	function c(r) {
		return typeof r == "string" && s.has(r);
	}
	r.isJSONType = c;
	function l() {
		let r = {
			number: {
				type: "number",
				rules: []
			},
			string: {
				type: "string",
				rules: []
			},
			array: {
				type: "array",
				rules: []
			},
			object: {
				type: "object",
				rules: []
			}
		};
		return {
			types: {
				...r,
				integer: !0,
				boolean: !0,
				null: !0
			},
			rules: [
				{ rules: [] },
				r.number,
				r.string,
				r.array,
				r.object
			],
			post: { rules: [] },
			all: {},
			keywords: {}
		};
	}
	r.getRules = l;
})), require_applicability$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.shouldUseRule = r.shouldUseGroup = r.schemaHasRulesForType = void 0;
	function s({ schema: r, self: s }, l) {
		let u = s.RULES.types[l];
		return u && u !== !0 && c(r, u);
	}
	r.schemaHasRulesForType = s;
	function c(r, s) {
		return s.rules.some((s) => l(r, s));
	}
	r.shouldUseGroup = c;
	function l(r, s) {
		return r[s.keyword] !== void 0 || s.definition.implements?.some((s) => r[s] !== void 0);
	}
	r.shouldUseRule = l;
})), require_dataType$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.reportTypeError = r.checkDataTypes = r.checkDataType = r.coerceAndCheckDataType = r.getJSONTypes = r.getSchemaTypes = r.DataType = void 0;
	var s = require_rules$1(), c = require_applicability$1(), l = require_errors$2(), u = require_codegen$1(), d = require_util$2(), f;
	(function(r) {
		r[r.Correct = 0] = "Correct", r[r.Wrong = 1] = "Wrong";
	})(f || (r.DataType = f = {}));
	function p(r) {
		let s = m(r.type);
		if (s.includes("null")) {
			if (r.nullable === !1) throw Error("type: null contradicts nullable: false");
		} else {
			if (!s.length && r.nullable !== void 0) throw Error("\"nullable\" cannot be used without \"type\"");
			r.nullable === !0 && s.push("null");
		}
		return s;
	}
	r.getSchemaTypes = p;
	function m(r) {
		let c = Array.isArray(r) ? r : r ? [r] : [];
		if (c.every(s.isJSONType)) return c;
		throw Error("type must be JSONType or JSONType[]: " + c.join(","));
	}
	r.getJSONTypes = m;
	function h(r, s) {
		let { gen: l, data: u, opts: d } = r, p = _(s, d.coerceTypes), m = s.length > 0 && !(p.length === 0 && s.length === 1 && (0, c.schemaHasRulesForType)(r, s[0]));
		if (m) {
			let c = x(s, u, d.strictNumbers, f.Wrong);
			l.if(c, () => {
				p.length ? v(r, s, p) : C(r);
			});
		}
		return m;
	}
	r.coerceAndCheckDataType = h;
	var g = new Set([
		"string",
		"number",
		"integer",
		"boolean",
		"null"
	]);
	function _(r, s) {
		return s ? r.filter((r) => g.has(r) || s === "array" && r === "array") : [];
	}
	function v(r, s, c) {
		let { gen: l, data: d, opts: f } = r, p = l.let("dataType", (0, u._)`typeof ${d}`), m = l.let("coerced", (0, u._)`undefined`);
		f.coerceTypes === "array" && l.if((0, u._)`${p} == 'object' && Array.isArray(${d}) && ${d}.length == 1`, () => l.assign(d, (0, u._)`${d}[0]`).assign(p, (0, u._)`typeof ${d}`).if(x(s, d, f.strictNumbers), () => l.assign(m, d))), l.if((0, u._)`${m} !== undefined`);
		for (let r of c) (g.has(r) || r === "array" && f.coerceTypes === "array") && h(r);
		l.else(), C(r), l.endIf(), l.if((0, u._)`${m} !== undefined`, () => {
			l.assign(d, m), y(r, m);
		});
		function h(r) {
			switch (r) {
				case "string":
					l.elseIf((0, u._)`${p} == "number" || ${p} == "boolean"`).assign(m, (0, u._)`"" + ${d}`).elseIf((0, u._)`${d} === null`).assign(m, (0, u._)`""`);
					return;
				case "number":
					l.elseIf((0, u._)`${p} == "boolean" || ${d} === null
              || (${p} == "string" && ${d} && ${d} == +${d})`).assign(m, (0, u._)`+${d}`);
					return;
				case "integer":
					l.elseIf((0, u._)`${p} === "boolean" || ${d} === null
              || (${p} === "string" && ${d} && ${d} == +${d} && !(${d} % 1))`).assign(m, (0, u._)`+${d}`);
					return;
				case "boolean":
					l.elseIf((0, u._)`${d} === "false" || ${d} === 0 || ${d} === null`).assign(m, !1).elseIf((0, u._)`${d} === "true" || ${d} === 1`).assign(m, !0);
					return;
				case "null":
					l.elseIf((0, u._)`${d} === "" || ${d} === 0 || ${d} === false`), l.assign(m, null);
					return;
				case "array": l.elseIf((0, u._)`${p} === "string" || ${p} === "number"
              || ${p} === "boolean" || ${d} === null`).assign(m, (0, u._)`[${d}]`);
			}
		}
	}
	function y({ gen: r, parentData: s, parentDataProperty: c }, l) {
		r.if((0, u._)`${s} !== undefined`, () => r.assign((0, u._)`${s}[${c}]`, l));
	}
	function b(r, s, c, l = f.Correct) {
		let d = l === f.Correct ? u.operators.EQ : u.operators.NEQ, p;
		switch (r) {
			case "null": return (0, u._)`${s} ${d} null`;
			case "array":
				p = (0, u._)`Array.isArray(${s})`;
				break;
			case "object":
				p = (0, u._)`${s} && typeof ${s} == "object" && !Array.isArray(${s})`;
				break;
			case "integer":
				p = m((0, u._)`!(${s} % 1) && !isNaN(${s})`);
				break;
			case "number":
				p = m();
				break;
			default: return (0, u._)`typeof ${s} ${d} ${r}`;
		}
		return l === f.Correct ? p : (0, u.not)(p);
		function m(r = u.nil) {
			return (0, u.and)((0, u._)`typeof ${s} == "number"`, r, c ? (0, u._)`isFinite(${s})` : u.nil);
		}
	}
	r.checkDataType = b;
	function x(r, s, c, l) {
		if (r.length === 1) return b(r[0], s, c, l);
		let f, p = (0, d.toHash)(r);
		if (p.array && p.object) {
			let r = (0, u._)`typeof ${s} != "object"`;
			f = p.null ? r : (0, u._)`!${s} || ${r}`, delete p.null, delete p.array, delete p.object;
		} else f = u.nil;
		for (let r in p.number && delete p.integer, p) f = (0, u.and)(f, b(r, s, c, l));
		return f;
	}
	r.checkDataTypes = x;
	var S = {
		message: ({ schema: r }) => `must be ${r}`,
		params: ({ schema: r, schemaValue: s }) => typeof r == "string" ? (0, u._)`{type: ${r}}` : (0, u._)`{type: ${s}}`
	};
	function C(r) {
		let s = w(r);
		(0, l.reportError)(s, S);
	}
	r.reportTypeError = C;
	function w(r) {
		let { gen: s, data: c, schema: l } = r, u = (0, d.schemaRefOrVal)(r, l, "type");
		return {
			gen: s,
			keyword: "type",
			data: c,
			schema: l.type,
			schemaCode: u,
			schemaValue: u,
			parentSchema: l,
			params: {},
			it: r
		};
	}
})), require_defaults$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.assignDefaults = void 0;
	var s = require_codegen$1(), c = require_util$2();
	function l(r, s) {
		let { properties: c, items: l } = r.schema;
		if (s === "object" && c) for (let s in c) u(r, s, c[s].default);
		else s === "array" && Array.isArray(l) && l.forEach((s, c) => u(r, c, s.default));
	}
	r.assignDefaults = l;
	function u(r, l, u) {
		let { gen: d, compositeRule: f, data: p, opts: m } = r;
		if (u === void 0) return;
		let h = (0, s._)`${p}${(0, s.getProperty)(l)}`;
		if (f) {
			(0, c.checkStrictMode)(r, `default is ignored for: ${h}`);
			return;
		}
		let g = (0, s._)`${h} === undefined`;
		m.useDefaults === "empty" && (g = (0, s._)`${g} || ${h} === null || ${h} === ""`), d.if(g, (0, s._)`${h} = ${(0, s.stringify)(u)}`);
	}
})), require_code$2 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.validateUnion = r.validateArray = r.usePattern = r.callValidateCode = r.schemaProperties = r.allSchemaProperties = r.noPropertyInData = r.propertyInData = r.isOwnProperty = r.hasPropFunc = r.reportMissingProp = r.checkMissingProp = r.checkReportMissingProp = void 0;
	var s = require_codegen$1(), c = require_util$2(), l = require_names$1(), u = require_util$2();
	function d(r, c) {
		let { gen: l, data: u, it: d } = r;
		l.if(_(l, u, c, d.opts.ownProperties), () => {
			r.setParams({ missingProperty: (0, s._)`${c}` }, !0), r.error();
		});
	}
	r.checkReportMissingProp = d;
	function f({ gen: r, data: c, it: { opts: l } }, u, d) {
		return (0, s.or)(...u.map((u) => (0, s.and)(_(r, c, u, l.ownProperties), (0, s._)`${d} = ${u}`)));
	}
	r.checkMissingProp = f;
	function p(r, s) {
		r.setParams({ missingProperty: s }, !0), r.error();
	}
	r.reportMissingProp = p;
	function m(r) {
		return r.scopeValue("func", {
			ref: Object.prototype.hasOwnProperty,
			code: (0, s._)`Object.prototype.hasOwnProperty`
		});
	}
	r.hasPropFunc = m;
	function h(r, c, l) {
		return (0, s._)`${m(r)}.call(${c}, ${l})`;
	}
	r.isOwnProperty = h;
	function g(r, c, l, u) {
		let d = (0, s._)`${c}${(0, s.getProperty)(l)} !== undefined`;
		return u ? (0, s._)`${d} && ${h(r, c, l)}` : d;
	}
	r.propertyInData = g;
	function _(r, c, l, u) {
		let d = (0, s._)`${c}${(0, s.getProperty)(l)} === undefined`;
		return u ? (0, s.or)(d, (0, s.not)(h(r, c, l))) : d;
	}
	r.noPropertyInData = _;
	function v(r) {
		return r ? Object.keys(r).filter((r) => r !== "__proto__") : [];
	}
	r.allSchemaProperties = v;
	function y(r, s) {
		return v(s).filter((l) => !(0, c.alwaysValidSchema)(r, s[l]));
	}
	r.schemaProperties = y;
	function b({ schemaCode: r, data: c, it: { gen: u, topSchemaRef: d, schemaPath: f, errorPath: p }, it: m }, h, g, _) {
		let v = _ ? (0, s._)`${r}, ${c}, ${d}${f}` : c, y = [
			[l.default.instancePath, (0, s.strConcat)(l.default.instancePath, p)],
			[l.default.parentData, m.parentData],
			[l.default.parentDataProperty, m.parentDataProperty],
			[l.default.rootData, l.default.rootData]
		];
		m.opts.dynamicRef && y.push([l.default.dynamicAnchors, l.default.dynamicAnchors]);
		let b = (0, s._)`${v}, ${u.object(...y)}`;
		return g === s.nil ? (0, s._)`${h}(${b})` : (0, s._)`${h}.call(${g}, ${b})`;
	}
	r.callValidateCode = b;
	var x = (0, s._)`new RegExp`;
	function S({ gen: r, it: { opts: c } }, l) {
		let d = c.unicodeRegExp ? "u" : "", { regExp: f } = c.code, p = f(l, d);
		return r.scopeValue("pattern", {
			key: p.toString(),
			ref: p,
			code: (0, s._)`${f.code === "new RegExp" ? x : (0, u.useFunc)(r, f)}(${l}, ${d})`
		});
	}
	r.usePattern = S;
	function C(r) {
		let { gen: l, data: u, keyword: d, it: f } = r, p = l.name("valid");
		if (f.allErrors) {
			let r = l.let("valid", !0);
			return m(() => l.assign(r, !1)), r;
		}
		return l.var(p, !0), m(() => l.break()), p;
		function m(f) {
			let m = l.const("len", (0, s._)`${u}.length`);
			l.forRange("i", 0, m, (u) => {
				r.subschema({
					keyword: d,
					dataProp: u,
					dataPropType: c.Type.Num
				}, p), l.if((0, s.not)(p), f);
			});
		}
	}
	r.validateArray = C;
	function w(r) {
		let { gen: l, schema: u, keyword: d, it: f } = r;
		/* istanbul ignore if */
		if (!Array.isArray(u)) throw Error("ajv implementation error");
		if (u.some((r) => (0, c.alwaysValidSchema)(f, r)) && !f.opts.unevaluated) return;
		let p = l.let("valid", !1), m = l.name("_valid");
		l.block(() => u.forEach((c, u) => {
			let f = r.subschema({
				keyword: d,
				schemaProp: u,
				compositeRule: !0
			}, m);
			l.assign(p, (0, s._)`${p} || ${m}`), r.mergeValidEvaluated(f, m) || l.if((0, s.not)(p));
		})), r.result(p, () => r.reset(), () => r.error(!0));
	}
	r.validateUnion = w;
})), require_keyword$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.validateKeywordUsage = r.validSchemaType = r.funcKeywordCode = r.macroKeywordCode = void 0;
	var s = require_codegen$1(), c = require_names$1(), l = require_code$2(), u = require_errors$2();
	function d(r, c) {
		let { gen: l, keyword: u, schema: d, parentSchema: f, it: p } = r, m = c.macro.call(p.self, d, f, p), h = g(l, u, m);
		p.opts.validateSchema !== !1 && p.self.validateSchema(m, !0);
		let _ = l.name("valid");
		r.subschema({
			schema: m,
			schemaPath: s.nil,
			errSchemaPath: `${p.errSchemaPath}/${u}`,
			topSchemaRef: h,
			compositeRule: !0
		}, _), r.pass(_, () => r.error(!0));
	}
	r.macroKeywordCode = d;
	function f(r, u) {
		let { gen: d, keyword: f, schema: _, parentSchema: v, $data: y, it: b } = r;
		h(b, u);
		let x = g(d, f, !y && u.compile ? u.compile.call(b.self, _, v, b) : u.validate), S = d.let("valid");
		r.block$data(S, C), r.ok(u.valid ?? S);
		function C() {
			if (u.errors === !1) E(), u.modifying && p(r), D(() => r.error());
			else {
				let s = u.async ? w() : T();
				u.modifying && p(r), D(() => m(r, s));
			}
		}
		function w() {
			let r = d.let("ruleErrs", null);
			return d.try(() => E((0, s._)`await `), (c) => d.assign(S, !1).if((0, s._)`${c} instanceof ${b.ValidationError}`, () => d.assign(r, (0, s._)`${c}.errors`), () => d.throw(c))), r;
		}
		function T() {
			let r = (0, s._)`${x}.errors`;
			return d.assign(r, null), E(s.nil), r;
		}
		function E(f = u.async ? (0, s._)`await ` : s.nil) {
			let p = b.opts.passContext ? c.default.this : c.default.self, m = !("compile" in u && !y || u.schema === !1);
			d.assign(S, (0, s._)`${f}${(0, l.callValidateCode)(r, x, p, m)}`, u.modifying);
		}
		function D(r) {
			d.if((0, s.not)(u.valid ?? S), r);
		}
	}
	r.funcKeywordCode = f;
	function p(r) {
		let { gen: c, data: l, it: u } = r;
		c.if(u.parentData, () => c.assign(l, (0, s._)`${u.parentData}[${u.parentDataProperty}]`));
	}
	function m(r, l) {
		let { gen: d } = r;
		d.if((0, s._)`Array.isArray(${l})`, () => {
			d.assign(c.default.vErrors, (0, s._)`${c.default.vErrors} === null ? ${l} : ${c.default.vErrors}.concat(${l})`).assign(c.default.errors, (0, s._)`${c.default.vErrors}.length`), (0, u.extendErrors)(r);
		}, () => r.error());
	}
	function h({ schemaEnv: r }, s) {
		if (s.async && !r.$async) throw Error("async keyword in sync schema");
	}
	function g(r, c, l) {
		if (l === void 0) throw Error(`keyword "${c}" failed to compile`);
		return r.scopeValue("keyword", typeof l == "function" ? { ref: l } : {
			ref: l,
			code: (0, s.stringify)(l)
		});
	}
	function _(r, s, c = !1) {
		return !s.length || s.some((s) => s === "array" ? Array.isArray(r) : s === "object" ? r && typeof r == "object" && !Array.isArray(r) : typeof r == s || c && r === void 0);
	}
	r.validSchemaType = _;
	function v({ schema: r, opts: s, self: c, errSchemaPath: l }, u, d) {
		/* istanbul ignore if */
		if (Array.isArray(u.keyword) ? !u.keyword.includes(d) : u.keyword !== d) throw Error("ajv implementation error");
		let f = u.dependencies;
		if (f?.some((s) => !Object.prototype.hasOwnProperty.call(r, s))) throw Error(`parent schema must have dependencies of ${d}: ${f.join(",")}`);
		if (u.validateSchema && !u.validateSchema(r[d])) {
			let r = `keyword "${d}" value is invalid at path "${l}": ` + c.errorsText(u.validateSchema.errors);
			if (s.validateSchema === "log") c.logger.error(r);
			else throw Error(r);
		}
	}
	r.validateKeywordUsage = v;
})), require_subschema$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.extendSubschemaMode = r.extendSubschemaData = r.getSubschema = void 0;
	var s = require_codegen$1(), c = require_util$2();
	function l(r, { keyword: l, schemaProp: u, schema: d, schemaPath: f, errSchemaPath: p, topSchemaRef: m }) {
		if (l !== void 0 && d !== void 0) throw Error("both \"keyword\" and \"schema\" passed, only one allowed");
		if (l !== void 0) {
			let d = r.schema[l];
			return u === void 0 ? {
				schema: d,
				schemaPath: (0, s._)`${r.schemaPath}${(0, s.getProperty)(l)}`,
				errSchemaPath: `${r.errSchemaPath}/${l}`
			} : {
				schema: d[u],
				schemaPath: (0, s._)`${r.schemaPath}${(0, s.getProperty)(l)}${(0, s.getProperty)(u)}`,
				errSchemaPath: `${r.errSchemaPath}/${l}/${(0, c.escapeFragment)(u)}`
			};
		}
		if (d !== void 0) {
			if (f === void 0 || p === void 0 || m === void 0) throw Error("\"schemaPath\", \"errSchemaPath\" and \"topSchemaRef\" are required with \"schema\"");
			return {
				schema: d,
				schemaPath: f,
				topSchemaRef: m,
				errSchemaPath: p
			};
		}
		throw Error("either \"keyword\" or \"schema\" must be passed");
	}
	r.getSubschema = l;
	function u(r, l, { dataProp: u, dataPropType: d, data: f, dataTypes: p, propertyName: m }) {
		if (f !== void 0 && u !== void 0) throw Error("both \"data\" and \"dataProp\" passed, only one allowed");
		let { gen: h } = l;
		if (u !== void 0) {
			let { errorPath: f, dataPathArr: p, opts: m } = l;
			g(h.let("data", (0, s._)`${l.data}${(0, s.getProperty)(u)}`, !0)), r.errorPath = (0, s.str)`${f}${(0, c.getErrorPath)(u, d, m.jsPropertySyntax)}`, r.parentDataProperty = (0, s._)`${u}`, r.dataPathArr = [...p, r.parentDataProperty];
		}
		f !== void 0 && (g(f instanceof s.Name ? f : h.let("data", f, !0)), m !== void 0 && (r.propertyName = m)), p && (r.dataTypes = p);
		function g(s) {
			r.data = s, r.dataLevel = l.dataLevel + 1, r.dataTypes = [], l.definedProperties = /* @__PURE__ */ new Set(), r.parentData = l.data, r.dataNames = [...l.dataNames, s];
		}
	}
	r.extendSubschemaData = u;
	function d(r, { jtdDiscriminator: s, jtdMetadata: c, compositeRule: l, createErrors: u, allErrors: d }) {
		l !== void 0 && (r.compositeRule = l), u !== void 0 && (r.createErrors = u), d !== void 0 && (r.allErrors = d), r.jtdDiscriminator = s, r.jtdMetadata = c;
	}
	r.extendSubschemaMode = d;
})), require_fast_deep_equal = /* @__PURE__ */ __commonJSMin(((r, s) => {
	s.exports = function r(s, c) {
		if (s === c) return !0;
		if (s && c && typeof s == "object" && typeof c == "object") {
			if (s.constructor !== c.constructor) return !1;
			var l, u, d;
			if (Array.isArray(s)) {
				if (l = s.length, l != c.length) return !1;
				for (u = l; u-- !== 0;) if (!r(s[u], c[u])) return !1;
				return !0;
			}
			if (s.constructor === RegExp) return s.source === c.source && s.flags === c.flags;
			if (s.valueOf !== Object.prototype.valueOf) return s.valueOf() === c.valueOf();
			if (s.toString !== Object.prototype.toString) return s.toString() === c.toString();
			if (d = Object.keys(s), l = d.length, l !== Object.keys(c).length) return !1;
			for (u = l; u-- !== 0;) if (!Object.prototype.hasOwnProperty.call(c, d[u])) return !1;
			for (u = l; u-- !== 0;) {
				var f = d[u];
				if (!r(s[f], c[f])) return !1;
			}
			return !0;
		}
		return s !== s && c !== c;
	};
})), require_json_schema_traverse$1 = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = s.exports = function(r, s, c) {
		typeof s == "function" && (c = s, s = {}), c = s.cb || c;
		var u = typeof c == "function" ? c : c.pre || function() {}, d = c.post || function() {};
		l(s, u, d, r, "", r);
	};
	c.keywords = {
		additionalItems: !0,
		items: !0,
		contains: !0,
		additionalProperties: !0,
		propertyNames: !0,
		not: !0,
		if: !0,
		then: !0,
		else: !0
	}, c.arrayKeywords = {
		items: !0,
		allOf: !0,
		anyOf: !0,
		oneOf: !0
	}, c.propsKeywords = {
		$defs: !0,
		definitions: !0,
		properties: !0,
		patternProperties: !0,
		dependencies: !0
	}, c.skipKeywords = {
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
	function l(r, s, d, f, p, m, h, g, _, v) {
		if (f && typeof f == "object" && !Array.isArray(f)) {
			for (var y in s(f, p, m, h, g, _, v), f) {
				var b = f[y];
				if (Array.isArray(b)) {
					if (y in c.arrayKeywords) for (var x = 0; x < b.length; x++) l(r, s, d, b[x], p + "/" + y + "/" + x, m, p, y, f, x);
				} else if (y in c.propsKeywords) {
					if (b && typeof b == "object") for (var S in b) l(r, s, d, b[S], p + "/" + y + "/" + u(S), m, p, y, f, S);
				} else (y in c.keywords || r.allKeys && !(y in c.skipKeywords)) && l(r, s, d, b, p + "/" + y, m, p, y, f);
			}
			d(f, p, m, h, g, _, v);
		}
	}
	function u(r) {
		return r.replace(/~/g, "~0").replace(/\//g, "~1");
	}
})), require_resolve$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.getSchemaRefs = r.resolveUrl = r.normalizeId = r._getFullPath = r.getFullPath = r.inlineRef = void 0;
	var s = require_util$2(), c = require_fast_deep_equal(), l = require_json_schema_traverse$1(), u = new Set([
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
	function d(r, s = !0) {
		return typeof r == "boolean" ? !0 : s === !0 ? !p(r) : s ? m(r) <= s : !1;
	}
	r.inlineRef = d;
	var f = new Set([
		"$ref",
		"$recursiveRef",
		"$recursiveAnchor",
		"$dynamicRef",
		"$dynamicAnchor"
	]);
	function p(r) {
		for (let s in r) {
			if (f.has(s)) return !0;
			let c = r[s];
			if (Array.isArray(c) && c.some(p) || typeof c == "object" && p(c)) return !0;
		}
		return !1;
	}
	function m(r) {
		let c = 0;
		for (let l in r) if (l === "$ref" || (c++, !u.has(l) && (typeof r[l] == "object" && (0, s.eachItem)(r[l], (r) => c += m(r)), c === Infinity))) return Infinity;
		return c;
	}
	function h(r, s = "", c) {
		return c !== !1 && (s = v(s)), g(r, r.parse(s));
	}
	r.getFullPath = h;
	function g(r, s) {
		return r.serialize(s).split("#")[0] + "#";
	}
	r._getFullPath = g;
	var _ = /#\/?$/;
	function v(r) {
		return r ? r.replace(_, "") : "";
	}
	r.normalizeId = v;
	function y(r, s, c) {
		return c = v(c), r.resolve(s, c);
	}
	r.resolveUrl = y;
	var b = /^[a-z_][-a-z0-9._]*$/i;
	function x(r, s) {
		if (typeof r == "boolean") return {};
		let { schemaId: u, uriResolver: d } = this.opts, f = v(r[u] || s), p = { "": f }, m = h(d, f, !1), g = {}, _ = /* @__PURE__ */ new Set();
		return l(r, { allKeys: !0 }, (r, s, c, l) => {
			if (l === void 0) return;
			let d = m + s, f = p[l];
			typeof r[u] == "string" && (f = h.call(this, r[u])), S.call(this, r.$anchor), S.call(this, r.$dynamicAnchor), p[s] = f;
			function h(s) {
				let c = this.opts.uriResolver.resolve;
				if (s = v(f ? c(f, s) : s), _.has(s)) throw x(s);
				_.add(s);
				let l = this.refs[s];
				return typeof l == "string" && (l = this.refs[l]), typeof l == "object" ? y(r, l.schema, s) : s !== v(d) && (s[0] === "#" ? (y(r, g[s], s), g[s] = r) : this.refs[s] = d), s;
			}
			function S(r) {
				if (typeof r == "string") {
					if (!b.test(r)) throw Error(`invalid anchor "${r}"`);
					h.call(this, `#${r}`);
				}
			}
		}), g;
		function y(r, s, l) {
			if (s !== void 0 && !c(r, s)) throw x(l);
		}
		function x(r) {
			return /* @__PURE__ */ Error(`reference "${r}" resolves to more than one schema`);
		}
	}
	r.getSchemaRefs = x;
})), require_validate$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.getData = r.KeywordCxt = r.validateFunctionCode = void 0;
	var s = require_boolSchema$1(), c = require_dataType$1(), l = require_applicability$1(), u = require_dataType$1(), d = require_defaults$1(), f = require_keyword$1(), p = require_subschema$1(), m = require_codegen$1(), h = require_names$1(), g = require_resolve$1(), _ = require_util$2(), v = require_errors$2();
	function y(r) {
		if (O(r) && (A(r), D(r))) {
			C(r);
			return;
		}
		b(r, () => (0, s.topBoolOrEmptySchema)(r));
	}
	r.validateFunctionCode = y;
	function b({ gen: r, validateName: s, schema: c, schemaEnv: l, opts: u }, d) {
		u.code.es5 ? r.func(s, (0, m._)`${h.default.data}, ${h.default.valCxt}`, l.$async, () => {
			r.code((0, m._)`"use strict"; ${T(c, u)}`), S(r, u), r.code(d);
		}) : r.func(s, (0, m._)`${h.default.data}, ${x(u)}`, l.$async, () => r.code(T(c, u)).code(d));
	}
	function x(r) {
		return (0, m._)`{${h.default.instancePath}="", ${h.default.parentData}, ${h.default.parentDataProperty}, ${h.default.rootData}=${h.default.data}${r.dynamicRef ? (0, m._)`, ${h.default.dynamicAnchors}={}` : m.nil}}={}`;
	}
	function S(r, s) {
		r.if(h.default.valCxt, () => {
			r.var(h.default.instancePath, (0, m._)`${h.default.valCxt}.${h.default.instancePath}`), r.var(h.default.parentData, (0, m._)`${h.default.valCxt}.${h.default.parentData}`), r.var(h.default.parentDataProperty, (0, m._)`${h.default.valCxt}.${h.default.parentDataProperty}`), r.var(h.default.rootData, (0, m._)`${h.default.valCxt}.${h.default.rootData}`), s.dynamicRef && r.var(h.default.dynamicAnchors, (0, m._)`${h.default.valCxt}.${h.default.dynamicAnchors}`);
		}, () => {
			r.var(h.default.instancePath, (0, m._)`""`), r.var(h.default.parentData, (0, m._)`undefined`), r.var(h.default.parentDataProperty, (0, m._)`undefined`), r.var(h.default.rootData, h.default.data), s.dynamicRef && r.var(h.default.dynamicAnchors, (0, m._)`{}`);
		});
	}
	function C(r) {
		let { schema: s, opts: c, gen: l } = r;
		b(r, () => {
			c.$comment && s.$comment && I(r), N(r), l.let(h.default.vErrors, null), l.let(h.default.errors, 0), c.unevaluated && w(r), j(r), L(r);
		});
	}
	function w(r) {
		let { gen: s, validateName: c } = r;
		r.evaluated = s.const("evaluated", (0, m._)`${c}.evaluated`), s.if((0, m._)`${r.evaluated}.dynamicProps`, () => s.assign((0, m._)`${r.evaluated}.props`, (0, m._)`undefined`)), s.if((0, m._)`${r.evaluated}.dynamicItems`, () => s.assign((0, m._)`${r.evaluated}.items`, (0, m._)`undefined`));
	}
	function T(r, s) {
		let c = typeof r == "object" && r[s.schemaId];
		return c && (s.code.source || s.code.process) ? (0, m._)`/*# sourceURL=${c} */` : m.nil;
	}
	function E(r, c) {
		if (O(r) && (A(r), D(r))) {
			k(r, c);
			return;
		}
		(0, s.boolOrEmptySchema)(r, c);
	}
	function D({ schema: r, self: s }) {
		if (typeof r == "boolean") return !r;
		for (let c in r) if (s.RULES.all[c]) return !0;
		return !1;
	}
	function O(r) {
		return typeof r.schema != "boolean";
	}
	function k(r, s) {
		let { schema: c, gen: l, opts: u } = r;
		u.$comment && c.$comment && I(r), P(r), F(r);
		let d = l.const("_errs", h.default.errors);
		j(r, d), l.var(s, (0, m._)`${d} === ${h.default.errors}`);
	}
	function A(r) {
		(0, _.checkUnknownRules)(r), M(r);
	}
	function j(r, s) {
		if (r.opts.jtd) return z(r, [], !1, s);
		let l = (0, c.getSchemaTypes)(r.schema);
		z(r, l, !(0, c.coerceAndCheckDataType)(r, l), s);
	}
	function M(r) {
		let { schema: s, errSchemaPath: c, opts: l, self: u } = r;
		s.$ref && l.ignoreKeywordsWithRef && (0, _.schemaHasRulesButRef)(s, u.RULES) && u.logger.warn(`$ref: keywords ignored in schema at path "${c}"`);
	}
	function N(r) {
		let { schema: s, opts: c } = r;
		s.default !== void 0 && c.useDefaults && c.strictSchema && (0, _.checkStrictMode)(r, "default is ignored in the schema root");
	}
	function P(r) {
		let s = r.schema[r.opts.schemaId];
		s && (r.baseId = (0, g.resolveUrl)(r.opts.uriResolver, r.baseId, s));
	}
	function F(r) {
		if (r.schema.$async && !r.schemaEnv.$async) throw Error("async schema in sync schema");
	}
	function I({ gen: r, schemaEnv: s, schema: c, errSchemaPath: l, opts: u }) {
		let d = c.$comment;
		if (u.$comment === !0) r.code((0, m._)`${h.default.self}.logger.log(${d})`);
		else if (typeof u.$comment == "function") {
			let c = (0, m.str)`${l}/$comment`, u = r.scopeValue("root", { ref: s.root });
			r.code((0, m._)`${h.default.self}.opts.$comment(${d}, ${c}, ${u}.schema)`);
		}
	}
	function L(r) {
		let { gen: s, schemaEnv: c, validateName: l, ValidationError: u, opts: d } = r;
		c.$async ? s.if((0, m._)`${h.default.errors} === 0`, () => s.return(h.default.data), () => s.throw((0, m._)`new ${u}(${h.default.vErrors})`)) : (s.assign((0, m._)`${l}.errors`, h.default.vErrors), d.unevaluated && R(r), s.return((0, m._)`${h.default.errors} === 0`));
	}
	function R({ gen: r, evaluated: s, props: c, items: l }) {
		c instanceof m.Name && r.assign((0, m._)`${s}.props`, c), l instanceof m.Name && r.assign((0, m._)`${s}.items`, l);
	}
	function z(r, s, c, d) {
		let { gen: f, schema: p, data: g, allErrors: v, opts: y, self: b } = r, { RULES: x } = b;
		if (p.$ref && (y.ignoreKeywordsWithRef || !(0, _.schemaHasRulesButRef)(p, x))) {
			f.block(() => X(r, "$ref", x.all.$ref.definition));
			return;
		}
		y.jtd || V(r, s), f.block(() => {
			for (let r of x.rules) S(r);
			S(x.post);
		});
		function S(_) {
			(0, l.shouldUseGroup)(p, _) && (_.type ? (f.if((0, u.checkDataType)(_.type, g, y.strictNumbers)), B(r, _), s.length === 1 && s[0] === _.type && c && (f.else(), (0, u.reportTypeError)(r)), f.endIf()) : B(r, _), v || f.if((0, m._)`${h.default.errors} === ${d || 0}`));
		}
	}
	function B(r, s) {
		let { gen: c, schema: u, opts: { useDefaults: f } } = r;
		f && (0, d.assignDefaults)(r, s.type), c.block(() => {
			for (let c of s.rules) (0, l.shouldUseRule)(u, c) && X(r, c.keyword, c.definition, s.type);
		});
	}
	function V(r, s) {
		r.schemaEnv.meta || !r.opts.strictTypes || (H(r, s), r.opts.allowUnionTypes || U(r, s), W(r, r.dataTypes));
	}
	function H(r, s) {
		if (s.length) {
			if (!r.dataTypes.length) {
				r.dataTypes = s;
				return;
			}
			s.forEach((s) => {
				K(r.dataTypes, s) || J(r, `type "${s}" not allowed by context "${r.dataTypes.join(",")}"`);
			}), q(r, s);
		}
	}
	function U(r, s) {
		s.length > 1 && !(s.length === 2 && s.includes("null")) && J(r, "use allowUnionTypes to allow union type keyword");
	}
	function W(r, s) {
		let c = r.self.RULES.all;
		for (let u in c) {
			let d = c[u];
			if (typeof d == "object" && (0, l.shouldUseRule)(r.schema, d)) {
				let { type: c } = d.definition;
				c.length && !c.some((r) => G(s, r)) && J(r, `missing type "${c.join(",")}" for keyword "${u}"`);
			}
		}
	}
	function G(r, s) {
		return r.includes(s) || s === "number" && r.includes("integer");
	}
	function K(r, s) {
		return r.includes(s) || s === "integer" && r.includes("number");
	}
	function q(r, s) {
		let c = [];
		for (let l of r.dataTypes) K(s, l) ? c.push(l) : s.includes("integer") && l === "number" && c.push("integer");
		r.dataTypes = c;
	}
	function J(r, s) {
		let c = r.schemaEnv.baseId + r.errSchemaPath;
		s += ` at "${c}" (strictTypes)`, (0, _.checkStrictMode)(r, s, r.opts.strictTypes);
	}
	var Y = class {
		constructor(r, s, c) {
			if ((0, f.validateKeywordUsage)(r, s, c), this.gen = r.gen, this.allErrors = r.allErrors, this.keyword = c, this.data = r.data, this.schema = r.schema[c], this.$data = s.$data && r.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, _.schemaRefOrVal)(r, this.schema, c, this.$data), this.schemaType = s.schemaType, this.parentSchema = r.schema, this.params = {}, this.it = r, this.def = s, this.$data) this.schemaCode = r.gen.const("vSchema", $(this.$data, r));
			else if (this.schemaCode = this.schemaValue, !(0, f.validSchemaType)(this.schema, s.schemaType, s.allowUndefined)) throw Error(`${c} value must be ${JSON.stringify(s.schemaType)}`);
			("code" in s ? s.trackErrors : s.errors !== !1) && (this.errsCount = r.gen.const("_errs", h.default.errors));
		}
		result(r, s, c) {
			this.failResult((0, m.not)(r), s, c);
		}
		failResult(r, s, c) {
			this.gen.if(r), c ? c() : this.error(), s ? (this.gen.else(), s(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
		}
		pass(r, s) {
			this.failResult((0, m.not)(r), void 0, s);
		}
		fail(r) {
			if (r === void 0) {
				this.error(), this.allErrors || this.gen.if(!1);
				return;
			}
			this.gen.if(r), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
		}
		fail$data(r) {
			if (!this.$data) return this.fail(r);
			let { schemaCode: s } = this;
			this.fail((0, m._)`${s} !== undefined && (${(0, m.or)(this.invalid$data(), r)})`);
		}
		error(r, s, c) {
			if (s) {
				this.setParams(s), this._error(r, c), this.setParams({});
				return;
			}
			this._error(r, c);
		}
		_error(r, s) {
			(r ? v.reportExtraError : v.reportError)(this, this.def.error, s);
		}
		$dataError() {
			(0, v.reportError)(this, this.def.$dataError || v.keyword$DataError);
		}
		reset() {
			if (this.errsCount === void 0) throw Error("add \"trackErrors\" to keyword definition");
			(0, v.resetErrorsCount)(this.gen, this.errsCount);
		}
		ok(r) {
			this.allErrors || this.gen.if(r);
		}
		setParams(r, s) {
			s ? Object.assign(this.params, r) : this.params = r;
		}
		block$data(r, s, c = m.nil) {
			this.gen.block(() => {
				this.check$data(r, c), s();
			});
		}
		check$data(r = m.nil, s = m.nil) {
			if (!this.$data) return;
			let { gen: c, schemaCode: l, schemaType: u, def: d } = this;
			c.if((0, m.or)((0, m._)`${l} === undefined`, s)), r !== m.nil && c.assign(r, !0), (u.length || d.validateSchema) && (c.elseIf(this.invalid$data()), this.$dataError(), r !== m.nil && c.assign(r, !1)), c.else();
		}
		invalid$data() {
			let { gen: r, schemaCode: s, schemaType: c, def: l, it: d } = this;
			return (0, m.or)(f(), p());
			function f() {
				if (c.length) {
					/* istanbul ignore if */
					if (!(s instanceof m.Name)) throw Error("ajv implementation error");
					let r = Array.isArray(c) ? c : [c];
					return (0, m._)`${(0, u.checkDataTypes)(r, s, d.opts.strictNumbers, u.DataType.Wrong)}`;
				}
				return m.nil;
			}
			function p() {
				if (l.validateSchema) {
					let c = r.scopeValue("validate$data", { ref: l.validateSchema });
					return (0, m._)`!${c}(${s})`;
				}
				return m.nil;
			}
		}
		subschema(r, s) {
			let c = (0, p.getSubschema)(this.it, r);
			(0, p.extendSubschemaData)(c, this.it, r), (0, p.extendSubschemaMode)(c, r);
			let l = {
				...this.it,
				...c,
				items: void 0,
				props: void 0
			};
			return E(l, s), l;
		}
		mergeEvaluated(r, s) {
			let { it: c, gen: l } = this;
			c.opts.unevaluated && (c.props !== !0 && r.props !== void 0 && (c.props = _.mergeEvaluated.props(l, r.props, c.props, s)), c.items !== !0 && r.items !== void 0 && (c.items = _.mergeEvaluated.items(l, r.items, c.items, s)));
		}
		mergeValidEvaluated(r, s) {
			let { it: c, gen: l } = this;
			if (c.opts.unevaluated && (c.props !== !0 || c.items !== !0)) return l.if(s, () => this.mergeEvaluated(r, m.Name)), !0;
		}
	};
	r.KeywordCxt = Y;
	function X(r, s, c, l) {
		let u = new Y(r, c, s);
		"code" in c ? c.code(u, l) : u.$data && c.validate ? (0, f.funcKeywordCode)(u, c) : "macro" in c ? (0, f.macroKeywordCode)(u, c) : (c.compile || c.validate) && (0, f.funcKeywordCode)(u, c);
	}
	var Z = /^\/(?:[^~]|~0|~1)*$/, Q = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
	function $(r, { dataLevel: s, dataNames: c, dataPathArr: l }) {
		let u, d;
		if (r === "") return h.default.rootData;
		if (r[0] === "/") {
			if (!Z.test(r)) throw Error(`Invalid JSON-pointer: ${r}`);
			u = r, d = h.default.rootData;
		} else {
			let f = Q.exec(r);
			if (!f) throw Error(`Invalid JSON-pointer: ${r}`);
			let p = +f[1];
			if (u = f[2], u === "#") {
				if (p >= s) throw Error(g("property/index", p));
				return l[s - p];
			}
			if (p > s) throw Error(g("data", p));
			if (d = c[s - p], !u) return d;
		}
		let f = d, p = u.split("/");
		for (let r of p) r && (d = (0, m._)`${d}${(0, m.getProperty)((0, _.unescapeJsonPointer)(r))}`, f = (0, m._)`${f} && ${d}`);
		return f;
		function g(r, c) {
			return `Cannot access ${r} ${c} levels up, current level is ${s}`;
		}
	}
	r.getData = $;
})), require_validation_error$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.default = class extends Error {
		constructor(r) {
			super("validation failed"), this.errors = r, this.ajv = this.validation = !0;
		}
	};
})), require_ref_error$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_resolve$1();
	r.default = class extends Error {
		constructor(r, c, l, u) {
			super(u || `can't resolve reference ${l} from id ${c}`), this.missingRef = (0, s.resolveUrl)(r, c, l), this.missingSchema = (0, s.normalizeId)((0, s.getFullPath)(r, this.missingRef));
		}
	};
})), require_compile$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.resolveSchema = r.getCompilingSchema = r.resolveRef = r.compileSchema = r.SchemaEnv = void 0;
	var s = require_codegen$1(), c = require_validation_error$1(), l = require_names$1(), u = require_resolve$1(), d = require_util$2(), f = require_validate$1(), p = class {
		constructor(r) {
			this.refs = {}, this.dynamicAnchors = {};
			let s;
			typeof r.schema == "object" && (s = r.schema), this.schema = r.schema, this.schemaId = r.schemaId, this.root = r.root || this, this.baseId = r.baseId ?? (0, u.normalizeId)(s?.[r.schemaId || "$id"]), this.schemaPath = r.schemaPath, this.localRefs = r.localRefs, this.meta = r.meta, this.$async = s?.$async, this.refs = {};
		}
	};
	r.SchemaEnv = p;
	function m(r) {
		let d = _.call(this, r);
		if (d) return d;
		let p = (0, u.getFullPath)(this.opts.uriResolver, r.root.baseId), { es5: m, lines: h } = this.opts.code, { ownProperties: g } = this.opts, v = new s.CodeGen(this.scope, {
			es5: m,
			lines: h,
			ownProperties: g
		}), y;
		r.$async && (y = v.scopeValue("Error", {
			ref: c.default,
			code: (0, s._)`require("ajv/dist/runtime/validation_error").default`
		}));
		let b = v.scopeName("validate");
		r.validateName = b;
		let x = {
			gen: v,
			allErrors: this.opts.allErrors,
			data: l.default.data,
			parentData: l.default.parentData,
			parentDataProperty: l.default.parentDataProperty,
			dataNames: [l.default.data],
			dataPathArr: [s.nil],
			dataLevel: 0,
			dataTypes: [],
			definedProperties: /* @__PURE__ */ new Set(),
			topSchemaRef: v.scopeValue("schema", this.opts.code.source === !0 ? {
				ref: r.schema,
				code: (0, s.stringify)(r.schema)
			} : { ref: r.schema }),
			validateName: b,
			ValidationError: y,
			schema: r.schema,
			schemaEnv: r,
			rootId: p,
			baseId: r.baseId || p,
			schemaPath: s.nil,
			errSchemaPath: r.schemaPath || (this.opts.jtd ? "" : "#"),
			errorPath: (0, s._)`""`,
			opts: this.opts,
			self: this
		}, S;
		try {
			this._compilations.add(r), (0, f.validateFunctionCode)(x), v.optimize(this.opts.code.optimize);
			let c = v.toString();
			S = `${v.scopeRefs(l.default.scope)}return ${c}`, this.opts.code.process && (S = this.opts.code.process(S, r));
			let u = Function(`${l.default.self}`, `${l.default.scope}`, S)(this, this.scope.get());
			if (this.scope.value(b, { ref: u }), u.errors = null, u.schema = r.schema, u.schemaEnv = r, r.$async && (u.$async = !0), this.opts.code.source === !0 && (u.source = {
				validateName: b,
				validateCode: c,
				scopeValues: v._values
			}), this.opts.unevaluated) {
				let { props: r, items: c } = x;
				u.evaluated = {
					props: r instanceof s.Name ? void 0 : r,
					items: c instanceof s.Name ? void 0 : c,
					dynamicProps: r instanceof s.Name,
					dynamicItems: c instanceof s.Name
				}, u.source && (u.source.evaluated = (0, s.stringify)(u.evaluated));
			}
			return r.validate = u, r;
		} catch (s) {
			throw delete r.validate, delete r.validateName, S && this.logger.error("Error compiling schema, function code:", S), s;
		} finally {
			this._compilations.delete(r);
		}
	}
	r.compileSchema = m;
	function h(r, s, c) {
		c = (0, u.resolveUrl)(this.opts.uriResolver, s, c);
		let l = r.refs[c];
		if (l) return l;
		let d = y.call(this, r, c);
		if (d === void 0) {
			let l = r.localRefs?.[c], { schemaId: u } = this.opts;
			l && (d = new p({
				schema: l,
				schemaId: u,
				root: r,
				baseId: s
			}));
		}
		if (d !== void 0) return r.refs[c] = g.call(this, d);
	}
	r.resolveRef = h;
	function g(r) {
		return (0, u.inlineRef)(r.schema, this.opts.inlineRefs) ? r.schema : r.validate ? r : m.call(this, r);
	}
	function _(r) {
		for (let s of this._compilations) if (v(s, r)) return s;
	}
	r.getCompilingSchema = _;
	function v(r, s) {
		return r.schema === s.schema && r.root === s.root && r.baseId === s.baseId;
	}
	function y(r, s) {
		let c;
		for (; typeof (c = this.refs[s]) == "string";) s = c;
		return c || this.schemas[s] || b.call(this, r, s);
	}
	function b(r, s) {
		let c = this.opts.uriResolver.parse(s), l = (0, u._getFullPath)(this.opts.uriResolver, c), d = (0, u.getFullPath)(this.opts.uriResolver, r.baseId, void 0);
		if (Object.keys(r.schema).length > 0 && l === d) return S.call(this, c, r);
		let f = (0, u.normalizeId)(l), h = this.refs[f] || this.schemas[f];
		if (typeof h == "string") {
			let s = b.call(this, r, h);
			return typeof s?.schema == "object" ? S.call(this, c, s) : void 0;
		}
		if (typeof h?.schema == "object") {
			if (h.validate || m.call(this, h), f === (0, u.normalizeId)(s)) {
				let { schema: s } = h, { schemaId: c } = this.opts, l = s[c];
				return l && (d = (0, u.resolveUrl)(this.opts.uriResolver, d, l)), new p({
					schema: s,
					schemaId: c,
					root: r,
					baseId: d
				});
			}
			return S.call(this, c, h);
		}
	}
	r.resolveSchema = b;
	var x = new Set([
		"properties",
		"patternProperties",
		"enum",
		"dependencies",
		"definitions"
	]);
	function S(r, { baseId: s, schema: c, root: l }) {
		if (r.fragment?.[0] !== "/") return;
		for (let l of r.fragment.slice(1).split("/")) {
			if (typeof c == "boolean") return;
			let r = c[(0, d.unescapeFragment)(l)];
			if (r === void 0) return;
			c = r;
			let f = typeof c == "object" && c[this.opts.schemaId];
			!x.has(l) && f && (s = (0, u.resolveUrl)(this.opts.uriResolver, s, f));
		}
		let f;
		if (typeof c != "boolean" && c.$ref && !(0, d.schemaHasRulesButRef)(c, this.RULES)) {
			let r = (0, u.resolveUrl)(this.opts.uriResolver, s, c.$ref);
			f = b.call(this, l, r);
		}
		let { schemaId: m } = this.opts;
		if (f ||= new p({
			schema: c,
			schemaId: m,
			root: l,
			baseId: s
		}), f.schema !== f.root.schema) return f;
	}
})), data_exports$1 = /* @__PURE__ */ __export({
	$id: () => $id$10,
	additionalProperties: () => !1,
	default: () => data_default$1,
	description: () => description$1,
	properties: () => properties$10,
	required: () => required$1,
	type: () => type$10
}, 1), $id$10, description$1, type$10, required$1, properties$10, data_default$1, init_data$1 = __esmMin((() => {
	$id$10 = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", description$1 = "Meta-schema for $data reference (JSON AnySchema extension proposal)", type$10 = "object", required$1 = ["$data"], properties$10 = { $data: {
		type: "string",
		anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }]
	} }, data_default$1 = {
		$id: $id$10,
		description: description$1,
		type: type$10,
		required: required$1,
		properties: properties$10,
		additionalProperties: !1
	};
})), require_scopedChars = /* @__PURE__ */ __commonJSMin(((r, s) => {
	s.exports = { HEX: {
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
	} };
})), require_utils$1 = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var { HEX: c } = require_scopedChars();
	function l(r) {
		if (m(r, ".") < 3) return {
			host: r,
			isIPV4: !1
		};
		let [s] = r.match(/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/u) || [];
		return s ? {
			host: p(s, "."),
			isIPV4: !0
		} : {
			host: r,
			isIPV4: !1
		};
	}
	function u(r, s = !1) {
		let l = "", u = !0;
		for (let s of r) {
			if (c[s] === void 0) return;
			s !== "0" && u === !0 && (u = !1), u || (l += s);
		}
		return s && l.length === 0 && (l = "0"), l;
	}
	function d(r) {
		let s = 0, c = {
			error: !1,
			address: "",
			zone: ""
		}, l = [], d = [], f = !1, p = !1, m = !1;
		function h() {
			if (d.length) {
				if (f === !1) {
					let r = u(d);
					if (r !== void 0) l.push(r);
					else return c.error = !0, !1;
				}
				d.length = 0;
			}
			return !0;
		}
		for (let u = 0; u < r.length; u++) {
			let g = r[u];
			if (!(g === "[" || g === "]")) if (g === ":") {
				if (p === !0 && (m = !0), !h()) break;
				if (s++, l.push(":"), s > 7) {
					c.error = !0;
					break;
				}
				u - 1 >= 0 && r[u - 1] === ":" && (p = !0);
				continue;
			} else if (g === "%") {
				if (!h()) break;
				f = !0;
			} else {
				d.push(g);
				continue;
			}
		}
		return d.length && (f ? c.zone = d.join("") : m ? l.push(d.join("")) : l.push(u(d))), c.address = l.join(""), c;
	}
	function f(r, s = {}) {
		if (m(r, ":") < 2) return {
			host: r,
			isIPV6: !1
		};
		let c = d(r);
		if (c.error) return {
			host: r,
			isIPV6: !1
		};
		{
			let r = c.address, s = c.address;
			return c.zone && (r += "%" + c.zone, s += "%25" + c.zone), {
				host: r,
				escapedHost: s,
				isIPV6: !0
			};
		}
	}
	function p(r, s) {
		let c = "", l = !0, u = r.length;
		for (let d = 0; d < u; d++) {
			let f = r[d];
			f === "0" && l ? (d + 1 <= u && r[d + 1] === s || d + 1 === u) && (c += f, l = !1) : (l = f === s, c += f);
		}
		return c;
	}
	function m(r, s) {
		let c = 0;
		for (let l = 0; l < r.length; l++) r[l] === s && c++;
		return c;
	}
	var h = /^\.\.?\//u, g = /^\/\.(?:\/|$)/u, _ = /^\/\.\.(?:\/|$)/u, v = /^\/?(?:.|\n)*?(?=\/|$)/u;
	function y(r) {
		let s = [];
		for (; r.length;) if (r.match(h)) r = r.replace(h, "");
		else if (r.match(g)) r = r.replace(g, "/");
		else if (r.match(_)) r = r.replace(_, "/"), s.pop();
		else if (r === "." || r === "..") r = "";
		else {
			let c = r.match(v);
			if (c) {
				let l = c[0];
				r = r.slice(l.length), s.push(l);
			} else throw Error("Unexpected dot segment condition");
		}
		return s.join("");
	}
	function b(r, s) {
		let c = s === !0 ? unescape : escape;
		return r.scheme !== void 0 && (r.scheme = c(r.scheme)), r.userinfo !== void 0 && (r.userinfo = c(r.userinfo)), r.host !== void 0 && (r.host = c(r.host)), r.path !== void 0 && (r.path = c(r.path)), r.query !== void 0 && (r.query = c(r.query)), r.fragment !== void 0 && (r.fragment = c(r.fragment)), r;
	}
	function x(r, s) {
		let c = [];
		if (r.userinfo !== void 0 && (c.push(r.userinfo), c.push("@")), r.host !== void 0) {
			let s = unescape(r.host), u = l(s);
			if (u.isIPV4) s = u.host;
			else {
				let c = f(u.host, { isIPV4: !1 });
				s = c.isIPV6 === !0 ? `[${c.escapedHost}]` : r.host;
			}
			c.push(s);
		}
		return (typeof r.port == "number" || typeof r.port == "string") && (c.push(":"), c.push(String(r.port))), c.length ? c.join("") : void 0;
	}
	s.exports = {
		recomposeAuthority: x,
		normalizeComponentEncoding: b,
		removeDotSegments: y,
		normalizeIPv4: l,
		normalizeIPv6: f,
		stringArrayToHexStripped: u
	};
})), require_schemes = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = /^[\da-f]{8}\b-[\da-f]{4}\b-[\da-f]{4}\b-[\da-f]{4}\b-[\da-f]{12}$/iu, l = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
	function u(r) {
		return typeof r.secure == "boolean" ? r.secure : String(r.scheme).toLowerCase() === "wss";
	}
	function d(r) {
		return r.host || (r.error = r.error || "HTTP URIs must have a host."), r;
	}
	function f(r) {
		let s = String(r.scheme).toLowerCase() === "https";
		return (r.port === (s ? 443 : 80) || r.port === "") && (r.port = void 0), r.path ||= "/", r;
	}
	function p(r) {
		return r.secure = u(r), r.resourceName = (r.path || "/") + (r.query ? "?" + r.query : ""), r.path = void 0, r.query = void 0, r;
	}
	function m(r) {
		if ((r.port === (u(r) ? 443 : 80) || r.port === "") && (r.port = void 0), typeof r.secure == "boolean" && (r.scheme = r.secure ? "wss" : "ws", r.secure = void 0), r.resourceName) {
			let [s, c] = r.resourceName.split("?");
			r.path = s && s !== "/" ? s : void 0, r.query = c, r.resourceName = void 0;
		}
		return r.fragment = void 0, r;
	}
	function h(r, s) {
		if (!r.path) return r.error = "URN can not be parsed", r;
		let c = r.path.match(l);
		if (c) {
			let l = s.scheme || r.scheme || "urn";
			r.nid = c[1].toLowerCase(), r.nss = c[2];
			let u = T[`${l}:${s.nid || r.nid}`];
			r.path = void 0, u && (r = u.parse(r, s));
		} else r.error = r.error || "URN can not be parsed.";
		return r;
	}
	function g(r, s) {
		let c = s.scheme || r.scheme || "urn", l = r.nid.toLowerCase(), u = T[`${c}:${s.nid || l}`];
		u && (r = u.serialize(r, s));
		let d = r, f = r.nss;
		return d.path = `${l || s.nid}:${f}`, s.skipEscape = !0, d;
	}
	function _(r, s) {
		let l = r;
		return l.uuid = l.nss, l.nss = void 0, !s.tolerant && (!l.uuid || !c.test(l.uuid)) && (l.error = l.error || "UUID is not valid."), l;
	}
	function v(r) {
		let s = r;
		return s.nss = (r.uuid || "").toLowerCase(), s;
	}
	var y = {
		scheme: "http",
		domainHost: !0,
		parse: d,
		serialize: f
	}, b = {
		scheme: "https",
		domainHost: y.domainHost,
		parse: d,
		serialize: f
	}, x = {
		scheme: "ws",
		domainHost: !0,
		parse: p,
		serialize: m
	}, S = {
		scheme: "wss",
		domainHost: x.domainHost,
		parse: x.parse,
		serialize: x.serialize
	}, C = {
		scheme: "urn",
		parse: h,
		serialize: g,
		skipNormalize: !0
	}, w = {
		scheme: "urn:uuid",
		parse: _,
		serialize: v,
		skipNormalize: !0
	}, T = {
		http: y,
		https: b,
		ws: x,
		wss: S,
		urn: C,
		"urn:uuid": w
	};
	s.exports = T;
})), require_fast_uri = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var { normalizeIPv6: c, normalizeIPv4: l, removeDotSegments: u, recomposeAuthority: d, normalizeComponentEncoding: f } = require_utils$1(), p = require_schemes();
	function m(r, s) {
		return typeof r == "string" ? r = v(S(r, s), s) : typeof r == "object" && (r = S(v(r, s), s)), r;
	}
	function h(r, s, c) {
		let l = Object.assign({ scheme: "null" }, c);
		return v(g(S(r, l), S(s, l), l, !0), {
			...l,
			skipEscape: !0
		});
	}
	function g(r, s, c, l) {
		let d = {};
		return l || (r = S(v(r, c), c), s = S(v(s, c), c)), c ||= {}, !c.tolerant && s.scheme ? (d.scheme = s.scheme, d.userinfo = s.userinfo, d.host = s.host, d.port = s.port, d.path = u(s.path || ""), d.query = s.query) : (s.userinfo !== void 0 || s.host !== void 0 || s.port !== void 0 ? (d.userinfo = s.userinfo, d.host = s.host, d.port = s.port, d.path = u(s.path || ""), d.query = s.query) : (s.path ? (s.path.charAt(0) === "/" ? d.path = u(s.path) : ((r.userinfo !== void 0 || r.host !== void 0 || r.port !== void 0) && !r.path ? d.path = "/" + s.path : r.path ? d.path = r.path.slice(0, r.path.lastIndexOf("/") + 1) + s.path : d.path = s.path, d.path = u(d.path)), d.query = s.query) : (d.path = r.path, s.query === void 0 ? d.query = r.query : d.query = s.query), d.userinfo = r.userinfo, d.host = r.host, d.port = r.port), d.scheme = r.scheme), d.fragment = s.fragment, d;
	}
	function _(r, s, c) {
		return typeof r == "string" ? (r = unescape(r), r = v(f(S(r, c), !0), {
			...c,
			skipEscape: !0
		})) : typeof r == "object" && (r = v(f(r, !0), {
			...c,
			skipEscape: !0
		})), typeof s == "string" ? (s = unescape(s), s = v(f(S(s, c), !0), {
			...c,
			skipEscape: !0
		})) : typeof s == "object" && (s = v(f(s, !0), {
			...c,
			skipEscape: !0
		})), r.toLowerCase() === s.toLowerCase();
	}
	function v(r, s) {
		let c = {
			host: r.host,
			scheme: r.scheme,
			userinfo: r.userinfo,
			port: r.port,
			path: r.path,
			query: r.query,
			nid: r.nid,
			nss: r.nss,
			uuid: r.uuid,
			fragment: r.fragment,
			reference: r.reference,
			resourceName: r.resourceName,
			secure: r.secure,
			error: ""
		}, l = Object.assign({}, s), f = [], m = p[(l.scheme || c.scheme || "").toLowerCase()];
		m && m.serialize && m.serialize(c, l), c.path !== void 0 && (l.skipEscape ? c.path = unescape(c.path) : (c.path = escape(c.path), c.scheme !== void 0 && (c.path = c.path.split("%3A").join(":")))), l.reference !== "suffix" && c.scheme && f.push(c.scheme, ":");
		let h = d(c, l);
		if (h !== void 0 && (l.reference !== "suffix" && f.push("//"), f.push(h), c.path && c.path.charAt(0) !== "/" && f.push("/")), c.path !== void 0) {
			let r = c.path;
			!l.absolutePath && (!m || !m.absolutePath) && (r = u(r)), h === void 0 && (r = r.replace(/^\/\//u, "/%2F")), f.push(r);
		}
		return c.query !== void 0 && f.push("?", c.query), c.fragment !== void 0 && f.push("#", c.fragment), f.join("");
	}
	var y = Array.from({ length: 127 }, (r, s) => /[^!"$&'()*+,\-.;=_`a-z{}~]/u.test(String.fromCharCode(s)));
	function b(r) {
		let s = 0;
		for (let c = 0, l = r.length; c < l; ++c) if (s = r.charCodeAt(c), s > 126 || y[s]) return !0;
		return !1;
	}
	var x = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
	function S(r, s) {
		let u = Object.assign({}, s), d = {
			scheme: void 0,
			userinfo: void 0,
			host: "",
			port: void 0,
			path: "",
			query: void 0,
			fragment: void 0
		}, f = r.indexOf("%") !== -1, m = !1;
		u.reference === "suffix" && (r = (u.scheme ? u.scheme + ":" : "") + "//" + r);
		let h = r.match(x);
		if (h) {
			if (d.scheme = h[1], d.userinfo = h[3], d.host = h[4], d.port = parseInt(h[5], 10), d.path = h[6] || "", d.query = h[7], d.fragment = h[8], isNaN(d.port) && (d.port = h[5]), d.host) {
				let r = l(d.host);
				if (r.isIPV4 === !1) {
					let s = c(r.host, { isIPV4: !1 });
					d.host = s.host.toLowerCase(), m = s.isIPV6;
				} else d.host = r.host, m = !0;
			}
			d.scheme === void 0 && d.userinfo === void 0 && d.host === void 0 && d.port === void 0 && !d.path && d.query === void 0 ? d.reference = "same-document" : d.scheme === void 0 ? d.reference = "relative" : d.fragment === void 0 ? d.reference = "absolute" : d.reference = "uri", u.reference && u.reference !== "suffix" && u.reference !== d.reference && (d.error = d.error || "URI is not a " + u.reference + " reference.");
			let r = p[(u.scheme || d.scheme || "").toLowerCase()];
			if (!u.unicodeSupport && (!r || !r.unicodeSupport) && d.host && (u.domainHost || r && r.domainHost) && m === !1 && b(d.host)) try {
				d.host = URL.domainToASCII(d.host.toLowerCase());
			} catch (r) {
				d.error = d.error || "Host's domain name can not be converted to ASCII: " + r;
			}
			(!r || r && !r.skipNormalize) && (f && d.scheme !== void 0 && (d.scheme = unescape(d.scheme)), f && d.host !== void 0 && (d.host = unescape(d.host)), d.path !== void 0 && d.path.length && (d.path = escape(unescape(d.path))), d.fragment !== void 0 && d.fragment.length && (d.fragment = encodeURI(decodeURIComponent(d.fragment)))), r && r.parse && r.parse(d, u);
		} else d.error = d.error || "URI can not be parsed.";
		return d;
	}
	var C = {
		SCHEMES: p,
		normalize: m,
		resolve: h,
		resolveComponents: g,
		equal: _,
		serialize: v,
		parse: S
	};
	s.exports = C, s.exports.default = C, s.exports.fastUri = C;
})), require_uri$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_fast_uri();
	s.code = "require(\"ajv/dist/runtime/uri\").default", r.default = s;
})), require_core$3 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.CodeGen = r.Name = r.nil = r.stringify = r.str = r._ = r.KeywordCxt = void 0;
	var s = require_validate$1();
	Object.defineProperty(r, "KeywordCxt", {
		enumerable: !0,
		get: function() {
			return s.KeywordCxt;
		}
	});
	var c = require_codegen$1();
	Object.defineProperty(r, "_", {
		enumerable: !0,
		get: function() {
			return c._;
		}
	}), Object.defineProperty(r, "str", {
		enumerable: !0,
		get: function() {
			return c.str;
		}
	}), Object.defineProperty(r, "stringify", {
		enumerable: !0,
		get: function() {
			return c.stringify;
		}
	}), Object.defineProperty(r, "nil", {
		enumerable: !0,
		get: function() {
			return c.nil;
		}
	}), Object.defineProperty(r, "Name", {
		enumerable: !0,
		get: function() {
			return c.Name;
		}
	}), Object.defineProperty(r, "CodeGen", {
		enumerable: !0,
		get: function() {
			return c.CodeGen;
		}
	});
	var l = require_validation_error$1(), u = require_ref_error$1(), d = require_rules$1(), f = require_compile$1(), p = require_codegen$1(), m = require_resolve$1(), h = require_dataType$1(), g = require_util$2(), _ = (init_data$1(), __toCommonJS(data_exports$1).default), v = require_uri$1(), y = (r, s) => new RegExp(r, s);
	y.code = "new RegExp";
	var b = [
		"removeAdditional",
		"useDefaults",
		"coerceTypes"
	], x = new Set([
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
	]), S = {
		errorDataPath: "",
		format: "`validateFormats: false` can be used instead.",
		nullable: "\"nullable\" keyword is supported by default.",
		jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
		extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
		missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
		processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
		sourceCode: "Use option `code: {source: true}`",
		strictDefaults: "It is default now, see option `strict`.",
		strictKeywords: "It is default now, see option `strict`.",
		uniqueItems: "\"uniqueItems\" keyword is always validated.",
		unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
		cache: "Map is used as cache, schema object as key.",
		serialize: "Map is used as cache, schema object as key.",
		ajvErrors: "It is default now."
	}, C = {
		ignoreKeywordsWithRef: "",
		jsPropertySyntax: "",
		unicode: "\"minLength\"/\"maxLength\" account for unicode characters by default."
	}, w = 200;
	function T(r) {
		let s = r.strict, c = r.code?.optimize, l = c === !0 || c === void 0 ? 1 : c || 0, u = r.code?.regExp ?? y, d = r.uriResolver ?? v.default;
		return {
			strictSchema: r.strictSchema ?? s ?? !0,
			strictNumbers: r.strictNumbers ?? s ?? !0,
			strictTypes: r.strictTypes ?? s ?? "log",
			strictTuples: r.strictTuples ?? s ?? "log",
			strictRequired: r.strictRequired ?? s ?? !1,
			code: r.code ? {
				...r.code,
				optimize: l,
				regExp: u
			} : {
				optimize: l,
				regExp: u
			},
			loopRequired: r.loopRequired ?? w,
			loopEnum: r.loopEnum ?? w,
			meta: r.meta ?? !0,
			messages: r.messages ?? !0,
			inlineRefs: r.inlineRefs ?? !0,
			schemaId: r.schemaId ?? "$id",
			addUsedSchema: r.addUsedSchema ?? !0,
			validateSchema: r.validateSchema ?? !0,
			validateFormats: r.validateFormats ?? !0,
			unicodeRegExp: r.unicodeRegExp ?? !0,
			int32range: r.int32range ?? !0,
			uriResolver: d
		};
	}
	var E = class {
		constructor(r = {}) {
			this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), r = this.opts = {
				...r,
				...T(r)
			};
			let { es5: s, lines: c } = this.opts.code;
			this.scope = new p.ValueScope({
				scope: {},
				prefixes: x,
				es5: s,
				lines: c
			}), this.logger = F(r.logger);
			let l = r.validateFormats;
			r.validateFormats = !1, this.RULES = (0, d.getRules)(), D.call(this, S, r, "NOT SUPPORTED"), D.call(this, C, r, "DEPRECATED", "warn"), this._metaOpts = N.call(this), r.formats && A.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), r.keywords && j.call(this, r.keywords), typeof r.meta == "object" && this.addMetaSchema(r.meta), k.call(this), r.validateFormats = l;
		}
		_addVocabularies() {
			this.addKeyword("$async");
		}
		_addDefaultMetaSchema() {
			let { $data: r, meta: s, schemaId: c } = this.opts, l = _;
			c === "id" && (l = { ..._ }, l.id = l.$id, delete l.$id), s && r && this.addMetaSchema(l, l[c], !1);
		}
		defaultMeta() {
			let { meta: r, schemaId: s } = this.opts;
			return this.opts.defaultMeta = typeof r == "object" ? r[s] || r : void 0;
		}
		validate(r, s) {
			let c;
			if (typeof r == "string") {
				if (c = this.getSchema(r), !c) throw Error(`no schema with key or ref "${r}"`);
			} else c = this.compile(r);
			let l = c(s);
			return "$async" in c || (this.errors = c.errors), l;
		}
		compile(r, s) {
			let c = this._addSchema(r, s);
			return c.validate || this._compileSchemaEnv(c);
		}
		compileAsync(r, s) {
			if (typeof this.opts.loadSchema != "function") throw Error("options.loadSchema should be a function");
			let { loadSchema: c } = this.opts;
			return l.call(this, r, s);
			async function l(r, s) {
				await d.call(this, r.$schema);
				let c = this._addSchema(r, s);
				return c.validate || f.call(this, c);
			}
			async function d(r) {
				r && !this.getSchema(r) && await l.call(this, { $ref: r }, !0);
			}
			async function f(r) {
				try {
					return this._compileSchemaEnv(r);
				} catch (s) {
					if (!(s instanceof u.default)) throw s;
					return p.call(this, s), await m.call(this, s.missingSchema), f.call(this, r);
				}
			}
			function p({ missingSchema: r, missingRef: s }) {
				if (this.refs[r]) throw Error(`AnySchema ${r} is loaded but ${s} cannot be resolved`);
			}
			async function m(r) {
				let c = await h.call(this, r);
				this.refs[r] || await d.call(this, c.$schema), this.refs[r] || this.addSchema(c, r, s);
			}
			async function h(r) {
				let s = this._loading[r];
				if (s) return s;
				try {
					return await (this._loading[r] = c(r));
				} finally {
					delete this._loading[r];
				}
			}
		}
		addSchema(r, s, c, l = this.opts.validateSchema) {
			if (Array.isArray(r)) {
				for (let s of r) this.addSchema(s, void 0, c, l);
				return this;
			}
			let u;
			if (typeof r == "object") {
				let { schemaId: s } = this.opts;
				if (u = r[s], u !== void 0 && typeof u != "string") throw Error(`schema ${s} must be string`);
			}
			return s = (0, m.normalizeId)(s || u), this._checkUnique(s), this.schemas[s] = this._addSchema(r, c, s, l, !0), this;
		}
		addMetaSchema(r, s, c = this.opts.validateSchema) {
			return this.addSchema(r, s, !0, c), this;
		}
		validateSchema(r, s) {
			if (typeof r == "boolean") return !0;
			let c;
			if (c = r.$schema, c !== void 0 && typeof c != "string") throw Error("$schema must be a string");
			if (c = c || this.opts.defaultMeta || this.defaultMeta(), !c) return this.logger.warn("meta-schema not available"), this.errors = null, !0;
			let l = this.validate(c, r);
			if (!l && s) {
				let r = "schema is invalid: " + this.errorsText();
				if (this.opts.validateSchema === "log") this.logger.error(r);
				else throw Error(r);
			}
			return l;
		}
		getSchema(r) {
			let s;
			for (; typeof (s = O.call(this, r)) == "string";) r = s;
			if (s === void 0) {
				let { schemaId: c } = this.opts, l = new f.SchemaEnv({
					schema: {},
					schemaId: c
				});
				if (s = f.resolveSchema.call(this, l, r), !s) return;
				this.refs[r] = s;
			}
			return s.validate || this._compileSchemaEnv(s);
		}
		removeSchema(r) {
			if (r instanceof RegExp) return this._removeAllSchemas(this.schemas, r), this._removeAllSchemas(this.refs, r), this;
			switch (typeof r) {
				case "undefined": return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
				case "string": {
					let s = O.call(this, r);
					return typeof s == "object" && this._cache.delete(s.schema), delete this.schemas[r], delete this.refs[r], this;
				}
				case "object": {
					let s = r;
					this._cache.delete(s);
					let c = r[this.opts.schemaId];
					return c && (c = (0, m.normalizeId)(c), delete this.schemas[c], delete this.refs[c]), this;
				}
				default: throw Error("ajv.removeSchema: invalid parameter");
			}
		}
		addVocabulary(r) {
			for (let s of r) this.addKeyword(s);
			return this;
		}
		addKeyword(r, s) {
			let c;
			if (typeof r == "string") c = r, typeof s == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), s.keyword = c);
			else if (typeof r == "object" && s === void 0) {
				if (s = r, c = s.keyword, Array.isArray(c) && !c.length) throw Error("addKeywords: keyword must be string or non-empty array");
			} else throw Error("invalid addKeywords parameters");
			if (L.call(this, c, s), !s) return (0, g.eachItem)(c, (r) => R.call(this, r)), this;
			B.call(this, s);
			let l = {
				...s,
				type: (0, h.getJSONTypes)(s.type),
				schemaType: (0, h.getJSONTypes)(s.schemaType)
			};
			return (0, g.eachItem)(c, l.type.length === 0 ? (r) => R.call(this, r, l) : (r) => l.type.forEach((s) => R.call(this, r, l, s))), this;
		}
		getKeyword(r) {
			let s = this.RULES.all[r];
			return typeof s == "object" ? s.definition : !!s;
		}
		removeKeyword(r) {
			let { RULES: s } = this;
			delete s.keywords[r], delete s.all[r];
			for (let c of s.rules) {
				let s = c.rules.findIndex((s) => s.keyword === r);
				s >= 0 && c.rules.splice(s, 1);
			}
			return this;
		}
		addFormat(r, s) {
			return typeof s == "string" && (s = new RegExp(s)), this.formats[r] = s, this;
		}
		errorsText(r = this.errors, { separator: s = ", ", dataVar: c = "data" } = {}) {
			return !r || r.length === 0 ? "No errors" : r.map((r) => `${c}${r.instancePath} ${r.message}`).reduce((r, c) => r + s + c);
		}
		$dataMetaSchema(r, s) {
			let c = this.RULES.all;
			r = JSON.parse(JSON.stringify(r));
			for (let l of s) {
				let s = l.split("/").slice(1), u = r;
				for (let r of s) u = u[r];
				for (let r in c) {
					let s = c[r];
					if (typeof s != "object") continue;
					let { $data: l } = s.definition, d = u[r];
					l && d && (u[r] = H(d));
				}
			}
			return r;
		}
		_removeAllSchemas(r, s) {
			for (let c in r) {
				let l = r[c];
				(!s || s.test(c)) && (typeof l == "string" ? delete r[c] : l && !l.meta && (this._cache.delete(l.schema), delete r[c]));
			}
		}
		_addSchema(r, s, c, l = this.opts.validateSchema, u = this.opts.addUsedSchema) {
			let d, { schemaId: p } = this.opts;
			if (typeof r == "object") d = r[p];
			else if (this.opts.jtd) throw Error("schema must be object");
			else if (typeof r != "boolean") throw Error("schema must be object or boolean");
			let h = this._cache.get(r);
			if (h !== void 0) return h;
			c = (0, m.normalizeId)(d || c);
			let g = m.getSchemaRefs.call(this, r, c);
			return h = new f.SchemaEnv({
				schema: r,
				schemaId: p,
				meta: s,
				baseId: c,
				localRefs: g
			}), this._cache.set(h.schema, h), u && !c.startsWith("#") && (c && this._checkUnique(c), this.refs[c] = h), l && this.validateSchema(r, !0), h;
		}
		_checkUnique(r) {
			if (this.schemas[r] || this.refs[r]) throw Error(`schema with key or id "${r}" already exists`);
		}
		_compileSchemaEnv(r) {
			/* istanbul ignore if */
			if (r.meta ? this._compileMetaSchema(r) : f.compileSchema.call(this, r), !r.validate) throw Error("ajv implementation error");
			return r.validate;
		}
		_compileMetaSchema(r) {
			let s = this.opts;
			this.opts = this._metaOpts;
			try {
				f.compileSchema.call(this, r);
			} finally {
				this.opts = s;
			}
		}
	};
	E.ValidationError = l.default, E.MissingRefError = u.default, r.default = E;
	function D(r, s, c, l = "error") {
		for (let u in r) {
			let d = u;
			d in s && this.logger[l](`${c}: option ${u}. ${r[d]}`);
		}
	}
	function O(r) {
		return r = (0, m.normalizeId)(r), this.schemas[r] || this.refs[r];
	}
	function k() {
		let r = this.opts.schemas;
		if (r) if (Array.isArray(r)) this.addSchema(r);
		else for (let s in r) this.addSchema(r[s], s);
	}
	function A() {
		for (let r in this.opts.formats) {
			let s = this.opts.formats[r];
			s && this.addFormat(r, s);
		}
	}
	function j(r) {
		if (Array.isArray(r)) {
			this.addVocabulary(r);
			return;
		}
		for (let s in this.logger.warn("keywords option as map is deprecated, pass array"), r) {
			let c = r[s];
			c.keyword ||= s, this.addKeyword(c);
		}
	}
	function N() {
		let r = { ...this.opts };
		for (let s of b) delete r[s];
		return r;
	}
	var P = {
		log() {},
		warn() {},
		error() {}
	};
	function F(r) {
		if (r === !1) return P;
		if (r === void 0) return console;
		if (r.log && r.warn && r.error) return r;
		throw Error("logger must implement log, warn and error methods");
	}
	var I = /^[a-z_$][a-z0-9_$:-]*$/i;
	function L(r, s) {
		let { RULES: c } = this;
		if ((0, g.eachItem)(r, (r) => {
			if (c.keywords[r]) throw Error(`Keyword ${r} is already defined`);
			if (!I.test(r)) throw Error(`Keyword ${r} has invalid name`);
		}), s && s.$data && !("code" in s || "validate" in s)) throw Error("$data keyword must have \"code\" or \"validate\" function");
	}
	function R(r, s, c) {
		var l;
		let u = s?.post;
		if (c && u) throw Error("keyword with \"post\" flag cannot have \"type\"");
		let { RULES: d } = this, f = u ? d.post : d.rules.find(({ type: r }) => r === c);
		if (f || (f = {
			type: c,
			rules: []
		}, d.rules.push(f)), d.keywords[r] = !0, !s) return;
		let p = {
			keyword: r,
			definition: {
				...s,
				type: (0, h.getJSONTypes)(s.type),
				schemaType: (0, h.getJSONTypes)(s.schemaType)
			}
		};
		s.before ? z.call(this, f, p, s.before) : f.rules.push(p), d.all[r] = p, (l = s.implements) == null || l.forEach((r) => this.addKeyword(r));
	}
	function z(r, s, c) {
		let l = r.rules.findIndex((r) => r.keyword === c);
		l >= 0 ? r.rules.splice(l, 0, s) : (r.rules.push(s), this.logger.warn(`rule ${c} is not defined`));
	}
	function B(r) {
		let { metaSchema: s } = r;
		s !== void 0 && (r.$data && this.opts.$data && (s = H(s)), r.validateSchema = this.compile(s, !0));
	}
	var V = { $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#" };
	function H(r) {
		return { anyOf: [r, V] };
	}
})), require_id$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.default = {
		keyword: "id",
		code() {
			throw Error("NOT SUPPORTED: keyword \"id\", use \"$id\" for schema ID");
		}
	};
})), require_ref$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.callRef = r.getValidate = void 0;
	var s = require_ref_error$1(), c = require_code$2(), l = require_codegen$1(), u = require_names$1(), d = require_compile$1(), f = require_util$2(), p = {
		keyword: "$ref",
		schemaType: "string",
		code(r) {
			let { gen: c, schema: u, it: f } = r, { baseId: p, schemaEnv: g, validateName: _, opts: v, self: y } = f, { root: b } = g;
			if ((u === "#" || u === "#/") && p === b.baseId) return S();
			let x = d.resolveRef.call(y, b, p, u);
			if (x === void 0) throw new s.default(f.opts.uriResolver, p, u);
			if (x instanceof d.SchemaEnv) return C(x);
			return w(x);
			function S() {
				if (g === b) return h(r, _, g, g.$async);
				let s = c.scopeValue("root", { ref: b });
				return h(r, (0, l._)`${s}.validate`, b, b.$async);
			}
			function C(s) {
				h(r, m(r, s), s, s.$async);
			}
			function w(s) {
				let d = c.scopeValue("schema", v.code.source === !0 ? {
					ref: s,
					code: (0, l.stringify)(s)
				} : { ref: s }), f = c.name("valid"), p = r.subschema({
					schema: s,
					dataTypes: [],
					schemaPath: l.nil,
					topSchemaRef: d,
					errSchemaPath: u
				}, f);
				r.mergeEvaluated(p), r.ok(f);
			}
		}
	};
	function m(r, s) {
		let { gen: c } = r;
		return s.validate ? c.scopeValue("validate", { ref: s.validate }) : (0, l._)`${c.scopeValue("wrapper", { ref: s })}.validate`;
	}
	r.getValidate = m;
	function h(r, s, d, p) {
		let { gen: m, it: h } = r, { allErrors: g, schemaEnv: _, opts: v } = h, y = v.passContext ? u.default.this : l.nil;
		p ? b() : x();
		function b() {
			if (!_.$async) throw Error("async schema referenced by sync schema");
			let u = m.let("valid");
			m.try(() => {
				m.code((0, l._)`await ${(0, c.callValidateCode)(r, s, y)}`), C(s), g || m.assign(u, !0);
			}, (r) => {
				m.if((0, l._)`!(${r} instanceof ${h.ValidationError})`, () => m.throw(r)), S(r), g || m.assign(u, !1);
			}), r.ok(u);
		}
		function x() {
			r.result((0, c.callValidateCode)(r, s, y), () => C(s), () => S(s));
		}
		function S(r) {
			let s = (0, l._)`${r}.errors`;
			m.assign(u.default.vErrors, (0, l._)`${u.default.vErrors} === null ? ${s} : ${u.default.vErrors}.concat(${s})`), m.assign(u.default.errors, (0, l._)`${u.default.vErrors}.length`);
		}
		function C(r) {
			if (!h.opts.unevaluated) return;
			let s = d?.validate?.evaluated;
			if (h.props !== !0) if (s && !s.dynamicProps) s.props !== void 0 && (h.props = f.mergeEvaluated.props(m, s.props, h.props));
			else {
				let s = m.var("props", (0, l._)`${r}.evaluated.props`);
				h.props = f.mergeEvaluated.props(m, s, h.props, l.Name);
			}
			if (h.items !== !0) if (s && !s.dynamicItems) s.items !== void 0 && (h.items = f.mergeEvaluated.items(m, s.items, h.items));
			else {
				let s = m.var("items", (0, l._)`${r}.evaluated.items`);
				h.items = f.mergeEvaluated.items(m, s, h.items, l.Name);
			}
		}
	}
	r.callRef = h, r.default = p;
})), require_core$2 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_id$1(), c = require_ref$1();
	r.default = [
		"$schema",
		"$id",
		"$defs",
		"$vocabulary",
		{ keyword: "$comment" },
		"definitions",
		s.default,
		c.default
	];
})), require_limitNumber$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_codegen$1(), c = s.operators, l = {
		maximum: {
			okStr: "<=",
			ok: c.LTE,
			fail: c.GT
		},
		minimum: {
			okStr: ">=",
			ok: c.GTE,
			fail: c.LT
		},
		exclusiveMaximum: {
			okStr: "<",
			ok: c.LT,
			fail: c.GTE
		},
		exclusiveMinimum: {
			okStr: ">",
			ok: c.GT,
			fail: c.LTE
		}
	};
	r.default = {
		keyword: Object.keys(l),
		type: "number",
		schemaType: "number",
		$data: !0,
		error: {
			message: ({ keyword: r, schemaCode: c }) => (0, s.str)`must be ${l[r].okStr} ${c}`,
			params: ({ keyword: r, schemaCode: c }) => (0, s._)`{comparison: ${l[r].okStr}, limit: ${c}}`
		},
		code(r) {
			let { keyword: c, data: u, schemaCode: d } = r;
			r.fail$data((0, s._)`${u} ${l[c].fail} ${d} || isNaN(${u})`);
		}
	};
})), require_multipleOf$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_codegen$1();
	r.default = {
		keyword: "multipleOf",
		type: "number",
		schemaType: "number",
		$data: !0,
		error: {
			message: ({ schemaCode: r }) => (0, s.str)`must be multiple of ${r}`,
			params: ({ schemaCode: r }) => (0, s._)`{multipleOf: ${r}}`
		},
		code(r) {
			let { gen: c, data: l, schemaCode: u, it: d } = r, f = d.opts.multipleOfPrecision, p = c.let("res"), m = f ? (0, s._)`Math.abs(Math.round(${p}) - ${p}) > 1e-${f}` : (0, s._)`${p} !== parseInt(${p})`;
			r.fail$data((0, s._)`(${u} === 0 || (${p} = ${l}/${u}, ${m}))`);
		}
	};
})), require_ucs2length$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	function s(r) {
		let s = r.length, c = 0, l = 0, u;
		for (; l < s;) c++, u = r.charCodeAt(l++), u >= 55296 && u <= 56319 && l < s && (u = r.charCodeAt(l), (u & 64512) == 56320 && l++);
		return c;
	}
	r.default = s, s.code = "require(\"ajv/dist/runtime/ucs2length\").default";
})), require_limitLength$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_codegen$1(), c = require_util$2(), l = require_ucs2length$1();
	r.default = {
		keyword: ["maxLength", "minLength"],
		type: "string",
		schemaType: "number",
		$data: !0,
		error: {
			message({ keyword: r, schemaCode: c }) {
				let l = r === "maxLength" ? "more" : "fewer";
				return (0, s.str)`must NOT have ${l} than ${c} characters`;
			},
			params: ({ schemaCode: r }) => (0, s._)`{limit: ${r}}`
		},
		code(r) {
			let { keyword: u, data: d, schemaCode: f, it: p } = r, m = u === "maxLength" ? s.operators.GT : s.operators.LT, h = p.opts.unicode === !1 ? (0, s._)`${d}.length` : (0, s._)`${(0, c.useFunc)(r.gen, l.default)}(${d})`;
			r.fail$data((0, s._)`${h} ${m} ${f}`);
		}
	};
})), require_pattern$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_code$2(), c = require_codegen$1();
	r.default = {
		keyword: "pattern",
		type: "string",
		schemaType: "string",
		$data: !0,
		error: {
			message: ({ schemaCode: r }) => (0, c.str)`must match pattern "${r}"`,
			params: ({ schemaCode: r }) => (0, c._)`{pattern: ${r}}`
		},
		code(r) {
			let { data: l, $data: u, schema: d, schemaCode: f, it: p } = r, m = p.opts.unicodeRegExp ? "u" : "", h = u ? (0, c._)`(new RegExp(${f}, ${m}))` : (0, s.usePattern)(r, d);
			r.fail$data((0, c._)`!${h}.test(${l})`);
		}
	};
})), require_limitProperties$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_codegen$1();
	r.default = {
		keyword: ["maxProperties", "minProperties"],
		type: "object",
		schemaType: "number",
		$data: !0,
		error: {
			message({ keyword: r, schemaCode: c }) {
				let l = r === "maxProperties" ? "more" : "fewer";
				return (0, s.str)`must NOT have ${l} than ${c} properties`;
			},
			params: ({ schemaCode: r }) => (0, s._)`{limit: ${r}}`
		},
		code(r) {
			let { keyword: c, data: l, schemaCode: u } = r, d = c === "maxProperties" ? s.operators.GT : s.operators.LT;
			r.fail$data((0, s._)`Object.keys(${l}).length ${d} ${u}`);
		}
	};
})), require_required$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_code$2(), c = require_codegen$1(), l = require_util$2();
	r.default = {
		keyword: "required",
		type: "object",
		schemaType: "array",
		$data: !0,
		error: {
			message: ({ params: { missingProperty: r } }) => (0, c.str)`must have required property '${r}'`,
			params: ({ params: { missingProperty: r } }) => (0, c._)`{missingProperty: ${r}}`
		},
		code(r) {
			let { gen: u, schema: d, schemaCode: f, data: p, $data: m, it: h } = r, { opts: g } = h;
			if (!m && d.length === 0) return;
			let _ = d.length >= g.loopRequired;
			if (h.allErrors ? v() : y(), g.strictRequired) {
				let s = r.parentSchema.properties, { definedProperties: c } = r.it;
				for (let r of d) if (s?.[r] === void 0 && !c.has(r)) {
					let s = `required property "${r}" is not defined at "${h.schemaEnv.baseId + h.errSchemaPath}" (strictRequired)`;
					(0, l.checkStrictMode)(h, s, h.opts.strictRequired);
				}
			}
			function v() {
				if (_ || m) r.block$data(c.nil, b);
				else for (let c of d) (0, s.checkReportMissingProp)(r, c);
			}
			function y() {
				let c = u.let("missing");
				if (_ || m) {
					let s = u.let("valid", !0);
					r.block$data(s, () => x(c, s)), r.ok(s);
				} else u.if((0, s.checkMissingProp)(r, d, c)), (0, s.reportMissingProp)(r, c), u.else();
			}
			function b() {
				u.forOf("prop", f, (c) => {
					r.setParams({ missingProperty: c }), u.if((0, s.noPropertyInData)(u, p, c, g.ownProperties), () => r.error());
				});
			}
			function x(l, d) {
				r.setParams({ missingProperty: l }), u.forOf(l, f, () => {
					u.assign(d, (0, s.propertyInData)(u, p, l, g.ownProperties)), u.if((0, c.not)(d), () => {
						r.error(), u.break();
					});
				}, c.nil);
			}
		}
	};
})), require_limitItems$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_codegen$1();
	r.default = {
		keyword: ["maxItems", "minItems"],
		type: "array",
		schemaType: "number",
		$data: !0,
		error: {
			message({ keyword: r, schemaCode: c }) {
				let l = r === "maxItems" ? "more" : "fewer";
				return (0, s.str)`must NOT have ${l} than ${c} items`;
			},
			params: ({ schemaCode: r }) => (0, s._)`{limit: ${r}}`
		},
		code(r) {
			let { keyword: c, data: l, schemaCode: u } = r, d = c === "maxItems" ? s.operators.GT : s.operators.LT;
			r.fail$data((0, s._)`${l}.length ${d} ${u}`);
		}
	};
})), require_equal$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_fast_deep_equal();
	s.code = "require(\"ajv/dist/runtime/equal\").default", r.default = s;
})), require_uniqueItems$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_dataType$1(), c = require_codegen$1(), l = require_util$2(), u = require_equal$1();
	r.default = {
		keyword: "uniqueItems",
		type: "array",
		schemaType: "boolean",
		$data: !0,
		error: {
			message: ({ params: { i: r, j: s } }) => (0, c.str)`must NOT have duplicate items (items ## ${s} and ${r} are identical)`,
			params: ({ params: { i: r, j: s } }) => (0, c._)`{i: ${r}, j: ${s}}`
		},
		code(r) {
			let { gen: d, data: f, $data: p, schema: m, parentSchema: h, schemaCode: g, it: _ } = r;
			if (!p && !m) return;
			let v = d.let("valid"), y = h.items ? (0, s.getSchemaTypes)(h.items) : [];
			r.block$data(v, b, (0, c._)`${g} === false`), r.ok(v);
			function b() {
				let s = d.let("i", (0, c._)`${f}.length`), l = d.let("j");
				r.setParams({
					i: s,
					j: l
				}), d.assign(v, !0), d.if((0, c._)`${s} > 1`, () => (x() ? S : C)(s, l));
			}
			function x() {
				return y.length > 0 && !y.some((r) => r === "object" || r === "array");
			}
			function S(l, u) {
				let p = d.name("item"), m = (0, s.checkDataTypes)(y, p, _.opts.strictNumbers, s.DataType.Wrong), h = d.const("indices", (0, c._)`{}`);
				d.for((0, c._)`;${l}--;`, () => {
					d.let(p, (0, c._)`${f}[${l}]`), d.if(m, (0, c._)`continue`), y.length > 1 && d.if((0, c._)`typeof ${p} == "string"`, (0, c._)`${p} += "_"`), d.if((0, c._)`typeof ${h}[${p}] == "number"`, () => {
						d.assign(u, (0, c._)`${h}[${p}]`), r.error(), d.assign(v, !1).break();
					}).code((0, c._)`${h}[${p}] = ${l}`);
				});
			}
			function C(s, p) {
				let m = (0, l.useFunc)(d, u.default), h = d.name("outer");
				d.label(h).for((0, c._)`;${s}--;`, () => d.for((0, c._)`${p} = ${s}; ${p}--;`, () => d.if((0, c._)`${m}(${f}[${s}], ${f}[${p}])`, () => {
					r.error(), d.assign(v, !1).break(h);
				})));
			}
		}
	};
})), require_const$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_codegen$1(), c = require_util$2(), l = require_equal$1();
	r.default = {
		keyword: "const",
		$data: !0,
		error: {
			message: "must be equal to constant",
			params: ({ schemaCode: r }) => (0, s._)`{allowedValue: ${r}}`
		},
		code(r) {
			let { gen: u, data: d, $data: f, schemaCode: p, schema: m } = r;
			f || m && typeof m == "object" ? r.fail$data((0, s._)`!${(0, c.useFunc)(u, l.default)}(${d}, ${p})`) : r.fail((0, s._)`${m} !== ${d}`);
		}
	};
})), require_enum$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_codegen$1(), c = require_util$2(), l = require_equal$1();
	r.default = {
		keyword: "enum",
		schemaType: "array",
		$data: !0,
		error: {
			message: "must be equal to one of the allowed values",
			params: ({ schemaCode: r }) => (0, s._)`{allowedValues: ${r}}`
		},
		code(r) {
			let { gen: u, data: d, $data: f, schema: p, schemaCode: m, it: h } = r;
			if (!f && p.length === 0) throw Error("enum must have non-empty array");
			let g = p.length >= h.opts.loopEnum, _, v = () => _ ??= (0, c.useFunc)(u, l.default), y;
			if (g || f) y = u.let("valid"), r.block$data(y, b);
			else {
				/* istanbul ignore if */
				if (!Array.isArray(p)) throw Error("ajv implementation error");
				let r = u.const("vSchema", m);
				y = (0, s.or)(...p.map((s, c) => x(r, c)));
			}
			r.pass(y);
			function b() {
				u.assign(y, !1), u.forOf("v", m, (r) => u.if((0, s._)`${v()}(${d}, ${r})`, () => u.assign(y, !0).break()));
			}
			function x(r, c) {
				let l = p[c];
				return typeof l == "object" && l ? (0, s._)`${v()}(${d}, ${r}[${c}])` : (0, s._)`${d} === ${l}`;
			}
		}
	};
})), require_validation$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_limitNumber$1(), c = require_multipleOf$1(), l = require_limitLength$1(), u = require_pattern$1(), d = require_limitProperties$1(), f = require_required$1(), p = require_limitItems$1(), m = require_uniqueItems$1(), h = require_const$1(), g = require_enum$1();
	r.default = [
		s.default,
		c.default,
		l.default,
		u.default,
		d.default,
		f.default,
		p.default,
		m.default,
		{
			keyword: "type",
			schemaType: ["string", "array"]
		},
		{
			keyword: "nullable",
			schemaType: "boolean"
		},
		h.default,
		g.default
	];
})), require_additionalItems$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.validateAdditionalItems = void 0;
	var s = require_codegen$1(), c = require_util$2(), l = {
		keyword: "additionalItems",
		type: "array",
		schemaType: ["boolean", "object"],
		before: "uniqueItems",
		error: {
			message: ({ params: { len: r } }) => (0, s.str)`must NOT have more than ${r} items`,
			params: ({ params: { len: r } }) => (0, s._)`{limit: ${r}}`
		},
		code(r) {
			let { parentSchema: s, it: l } = r, { items: d } = s;
			if (!Array.isArray(d)) {
				(0, c.checkStrictMode)(l, "\"additionalItems\" is ignored when \"items\" is not an array of schemas");
				return;
			}
			u(r, d);
		}
	};
	function u(r, l) {
		let { gen: u, schema: d, data: f, keyword: p, it: m } = r;
		m.items = !0;
		let h = u.const("len", (0, s._)`${f}.length`);
		if (d === !1) r.setParams({ len: l.length }), r.pass((0, s._)`${h} <= ${l.length}`);
		else if (typeof d == "object" && !(0, c.alwaysValidSchema)(m, d)) {
			let c = u.var("valid", (0, s._)`${h} <= ${l.length}`);
			u.if((0, s.not)(c), () => g(c)), r.ok(c);
		}
		function g(d) {
			u.forRange("i", l.length, h, (l) => {
				r.subschema({
					keyword: p,
					dataProp: l,
					dataPropType: c.Type.Num
				}, d), m.allErrors || u.if((0, s.not)(d), () => u.break());
			});
		}
	}
	r.validateAdditionalItems = u, r.default = l;
})), require_items$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.validateTuple = void 0;
	var s = require_codegen$1(), c = require_util$2(), l = require_code$2(), u = {
		keyword: "items",
		type: "array",
		schemaType: [
			"object",
			"array",
			"boolean"
		],
		before: "uniqueItems",
		code(r) {
			let { schema: s, it: u } = r;
			if (Array.isArray(s)) return d(r, "additionalItems", s);
			u.items = !0, !(0, c.alwaysValidSchema)(u, s) && r.ok((0, l.validateArray)(r));
		}
	};
	function d(r, l, u = r.schema) {
		let { gen: d, parentSchema: f, data: p, keyword: m, it: h } = r;
		v(f), h.opts.unevaluated && u.length && h.items !== !0 && (h.items = c.mergeEvaluated.items(d, u.length, h.items));
		let g = d.name("valid"), _ = d.const("len", (0, s._)`${p}.length`);
		u.forEach((l, u) => {
			(0, c.alwaysValidSchema)(h, l) || (d.if((0, s._)`${_} > ${u}`, () => r.subschema({
				keyword: m,
				schemaProp: u,
				dataProp: u
			}, g)), r.ok(g));
		});
		function v(r) {
			let { opts: s, errSchemaPath: d } = h, f = u.length, p = f === r.minItems && (f === r.maxItems || r[l] === !1);
			if (s.strictTuples && !p) {
				let r = `"${m}" is ${f}-tuple, but minItems or maxItems/${l} are not specified or different at path "${d}"`;
				(0, c.checkStrictMode)(h, r, s.strictTuples);
			}
		}
	}
	r.validateTuple = d, r.default = u;
})), require_prefixItems$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_items$1();
	r.default = {
		keyword: "prefixItems",
		type: "array",
		schemaType: ["array"],
		before: "uniqueItems",
		code: (r) => (0, s.validateTuple)(r, "items")
	};
})), require_items2020$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_codegen$1(), c = require_util$2(), l = require_code$2(), u = require_additionalItems$1();
	r.default = {
		keyword: "items",
		type: "array",
		schemaType: ["object", "boolean"],
		before: "uniqueItems",
		error: {
			message: ({ params: { len: r } }) => (0, s.str)`must NOT have more than ${r} items`,
			params: ({ params: { len: r } }) => (0, s._)`{limit: ${r}}`
		},
		code(r) {
			let { schema: s, parentSchema: d, it: f } = r, { prefixItems: p } = d;
			f.items = !0, !(0, c.alwaysValidSchema)(f, s) && (p ? (0, u.validateAdditionalItems)(r, p) : r.ok((0, l.validateArray)(r)));
		}
	};
})), require_contains$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_codegen$1(), c = require_util$2();
	r.default = {
		keyword: "contains",
		type: "array",
		schemaType: ["object", "boolean"],
		before: "uniqueItems",
		trackErrors: !0,
		error: {
			message: ({ params: { min: r, max: c } }) => c === void 0 ? (0, s.str)`must contain at least ${r} valid item(s)` : (0, s.str)`must contain at least ${r} and no more than ${c} valid item(s)`,
			params: ({ params: { min: r, max: c } }) => c === void 0 ? (0, s._)`{minContains: ${r}}` : (0, s._)`{minContains: ${r}, maxContains: ${c}}`
		},
		code(r) {
			let { gen: l, schema: u, parentSchema: d, data: f, it: p } = r, m, h, { minContains: g, maxContains: _ } = d;
			p.opts.next ? (m = g === void 0 ? 1 : g, h = _) : m = 1;
			let v = l.const("len", (0, s._)`${f}.length`);
			if (r.setParams({
				min: m,
				max: h
			}), h === void 0 && m === 0) {
				(0, c.checkStrictMode)(p, "\"minContains\" == 0 without \"maxContains\": \"contains\" keyword ignored");
				return;
			}
			if (h !== void 0 && m > h) {
				(0, c.checkStrictMode)(p, "\"minContains\" > \"maxContains\" is always invalid"), r.fail();
				return;
			}
			if ((0, c.alwaysValidSchema)(p, u)) {
				let c = (0, s._)`${v} >= ${m}`;
				h !== void 0 && (c = (0, s._)`${c} && ${v} <= ${h}`), r.pass(c);
				return;
			}
			p.items = !0;
			let y = l.name("valid");
			h === void 0 && m === 1 ? x(y, () => l.if(y, () => l.break())) : m === 0 ? (l.let(y, !0), h !== void 0 && l.if((0, s._)`${f}.length > 0`, b)) : (l.let(y, !1), b()), r.result(y, () => r.reset());
			function b() {
				let r = l.name("_valid"), s = l.let("count", 0);
				x(r, () => l.if(r, () => S(s)));
			}
			function x(s, u) {
				l.forRange("i", 0, v, (l) => {
					r.subschema({
						keyword: "contains",
						dataProp: l,
						dataPropType: c.Type.Num,
						compositeRule: !0
					}, s), u();
				});
			}
			function S(r) {
				l.code((0, s._)`${r}++`), h === void 0 ? l.if((0, s._)`${r} >= ${m}`, () => l.assign(y, !0).break()) : (l.if((0, s._)`${r} > ${h}`, () => l.assign(y, !1).break()), m === 1 ? l.assign(y, !0) : l.if((0, s._)`${r} >= ${m}`, () => l.assign(y, !0)));
			}
		}
	};
})), require_dependencies$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.validateSchemaDeps = r.validatePropertyDeps = r.error = void 0;
	var s = require_codegen$1(), c = require_util$2(), l = require_code$2();
	r.error = {
		message: ({ params: { property: r, depsCount: c, deps: l } }) => {
			let u = c === 1 ? "property" : "properties";
			return (0, s.str)`must have ${u} ${l} when property ${r} is present`;
		},
		params: ({ params: { property: r, depsCount: c, deps: l, missingProperty: u } }) => (0, s._)`{property: ${r},
    missingProperty: ${u},
    depsCount: ${c},
    deps: ${l}}`
	};
	var u = {
		keyword: "dependencies",
		type: "object",
		schemaType: "object",
		error: r.error,
		code(r) {
			let [s, c] = d(r);
			f(r, s), p(r, c);
		}
	};
	function d({ schema: r }) {
		let s = {}, c = {};
		for (let l in r) {
			if (l === "__proto__") continue;
			let u = Array.isArray(r[l]) ? s : c;
			u[l] = r[l];
		}
		return [s, c];
	}
	function f(r, c = r.schema) {
		let { gen: u, data: d, it: f } = r;
		if (Object.keys(c).length === 0) return;
		let p = u.let("missing");
		for (let m in c) {
			let h = c[m];
			if (h.length === 0) continue;
			let g = (0, l.propertyInData)(u, d, m, f.opts.ownProperties);
			r.setParams({
				property: m,
				depsCount: h.length,
				deps: h.join(", ")
			}), f.allErrors ? u.if(g, () => {
				for (let s of h) (0, l.checkReportMissingProp)(r, s);
			}) : (u.if((0, s._)`${g} && (${(0, l.checkMissingProp)(r, h, p)})`), (0, l.reportMissingProp)(r, p), u.else());
		}
	}
	r.validatePropertyDeps = f;
	function p(r, s = r.schema) {
		let { gen: u, data: d, keyword: f, it: p } = r, m = u.name("valid");
		for (let h in s) (0, c.alwaysValidSchema)(p, s[h]) || (u.if((0, l.propertyInData)(u, d, h, p.opts.ownProperties), () => {
			let s = r.subschema({
				keyword: f,
				schemaProp: h
			}, m);
			r.mergeValidEvaluated(s, m);
		}, () => u.var(m, !0)), r.ok(m));
	}
	r.validateSchemaDeps = p, r.default = u;
})), require_propertyNames$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_codegen$1(), c = require_util$2();
	r.default = {
		keyword: "propertyNames",
		type: "object",
		schemaType: ["object", "boolean"],
		error: {
			message: "property name must be valid",
			params: ({ params: r }) => (0, s._)`{propertyName: ${r.propertyName}}`
		},
		code(r) {
			let { gen: l, schema: u, data: d, it: f } = r;
			if ((0, c.alwaysValidSchema)(f, u)) return;
			let p = l.name("valid");
			l.forIn("key", d, (c) => {
				r.setParams({ propertyName: c }), r.subschema({
					keyword: "propertyNames",
					data: c,
					dataTypes: ["string"],
					propertyName: c,
					compositeRule: !0
				}, p), l.if((0, s.not)(p), () => {
					r.error(!0), f.allErrors || l.break();
				});
			}), r.ok(p);
		}
	};
})), require_additionalProperties$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_code$2(), c = require_codegen$1(), l = require_names$1(), u = require_util$2();
	r.default = {
		keyword: "additionalProperties",
		type: ["object"],
		schemaType: ["boolean", "object"],
		allowUndefined: !0,
		trackErrors: !0,
		error: {
			message: "must NOT have additional properties",
			params: ({ params: r }) => (0, c._)`{additionalProperty: ${r.additionalProperty}}`
		},
		code(r) {
			let { gen: d, schema: f, parentSchema: p, data: m, errsCount: h, it: g } = r;
			/* istanbul ignore if */
			if (!h) throw Error("ajv implementation error");
			let { allErrors: _, opts: v } = g;
			if (g.props = !0, v.removeAdditional !== "all" && (0, u.alwaysValidSchema)(g, f)) return;
			let y = (0, s.allSchemaProperties)(p.properties), b = (0, s.allSchemaProperties)(p.patternProperties);
			x(), r.ok((0, c._)`${h} === ${l.default.errors}`);
			function x() {
				d.forIn("key", m, (r) => {
					!y.length && !b.length ? w(r) : d.if(S(r), () => w(r));
				});
			}
			function S(l) {
				let f;
				if (y.length > 8) {
					let r = (0, u.schemaRefOrVal)(g, p.properties, "properties");
					f = (0, s.isOwnProperty)(d, r, l);
				} else f = y.length ? (0, c.or)(...y.map((r) => (0, c._)`${l} === ${r}`)) : c.nil;
				return b.length && (f = (0, c.or)(f, ...b.map((u) => (0, c._)`${(0, s.usePattern)(r, u)}.test(${l})`))), (0, c.not)(f);
			}
			function C(r) {
				d.code((0, c._)`delete ${m}[${r}]`);
			}
			function w(s) {
				if (v.removeAdditional === "all" || v.removeAdditional && f === !1) {
					C(s);
					return;
				}
				if (f === !1) {
					r.setParams({ additionalProperty: s }), r.error(), _ || d.break();
					return;
				}
				if (typeof f == "object" && !(0, u.alwaysValidSchema)(g, f)) {
					let l = d.name("valid");
					v.removeAdditional === "failing" ? (T(s, l, !1), d.if((0, c.not)(l), () => {
						r.reset(), C(s);
					})) : (T(s, l), _ || d.if((0, c.not)(l), () => d.break()));
				}
			}
			function T(s, c, l) {
				let d = {
					keyword: "additionalProperties",
					dataProp: s,
					dataPropType: u.Type.Str
				};
				l === !1 && Object.assign(d, {
					compositeRule: !0,
					createErrors: !1,
					allErrors: !1
				}), r.subschema(d, c);
			}
		}
	};
})), require_properties$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_validate$1(), c = require_code$2(), l = require_util$2(), u = require_additionalProperties$1();
	r.default = {
		keyword: "properties",
		type: "object",
		schemaType: "object",
		code(r) {
			let { gen: d, schema: f, parentSchema: p, data: m, it: h } = r;
			h.opts.removeAdditional === "all" && p.additionalProperties === void 0 && u.default.code(new s.KeywordCxt(h, u.default, "additionalProperties"));
			let g = (0, c.allSchemaProperties)(f);
			for (let r of g) h.definedProperties.add(r);
			h.opts.unevaluated && g.length && h.props !== !0 && (h.props = l.mergeEvaluated.props(d, (0, l.toHash)(g), h.props));
			let _ = g.filter((r) => !(0, l.alwaysValidSchema)(h, f[r]));
			if (_.length === 0) return;
			let v = d.name("valid");
			for (let s of _) y(s) ? b(s) : (d.if((0, c.propertyInData)(d, m, s, h.opts.ownProperties)), b(s), h.allErrors || d.else().var(v, !0), d.endIf()), r.it.definedProperties.add(s), r.ok(v);
			function y(r) {
				return h.opts.useDefaults && !h.compositeRule && f[r].default !== void 0;
			}
			function b(s) {
				r.subschema({
					keyword: "properties",
					schemaProp: s,
					dataProp: s
				}, v);
			}
		}
	};
})), require_patternProperties$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_code$2(), c = require_codegen$1(), l = require_util$2(), u = require_util$2();
	r.default = {
		keyword: "patternProperties",
		type: "object",
		schemaType: "object",
		code(r) {
			let { gen: d, schema: f, data: p, parentSchema: m, it: h } = r, { opts: g } = h, _ = (0, s.allSchemaProperties)(f), v = _.filter((r) => (0, l.alwaysValidSchema)(h, f[r]));
			if (_.length === 0 || v.length === _.length && (!h.opts.unevaluated || h.props === !0)) return;
			let y = g.strictSchema && !g.allowMatchingProperties && m.properties, b = d.name("valid");
			h.props !== !0 && !(h.props instanceof c.Name) && (h.props = (0, u.evaluatedPropsToName)(d, h.props));
			let { props: x } = h;
			S();
			function S() {
				for (let r of _) y && C(r), h.allErrors ? w(r) : (d.var(b, !0), w(r), d.if(b));
			}
			function C(r) {
				for (let s in y) new RegExp(r).test(s) && (0, l.checkStrictMode)(h, `property ${s} matches pattern ${r} (use allowMatchingProperties)`);
			}
			function w(l) {
				d.forIn("key", p, (f) => {
					d.if((0, c._)`${(0, s.usePattern)(r, l)}.test(${f})`, () => {
						let s = v.includes(l);
						s || r.subschema({
							keyword: "patternProperties",
							schemaProp: l,
							dataProp: f,
							dataPropType: u.Type.Str
						}, b), h.opts.unevaluated && x !== !0 ? d.assign((0, c._)`${x}[${f}]`, !0) : !s && !h.allErrors && d.if((0, c.not)(b), () => d.break());
					});
				});
			}
		}
	};
})), require_not$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_util$2();
	r.default = {
		keyword: "not",
		schemaType: ["object", "boolean"],
		trackErrors: !0,
		code(r) {
			let { gen: c, schema: l, it: u } = r;
			if ((0, s.alwaysValidSchema)(u, l)) {
				r.fail();
				return;
			}
			let d = c.name("valid");
			r.subschema({
				keyword: "not",
				compositeRule: !0,
				createErrors: !1,
				allErrors: !1
			}, d), r.failResult(d, () => r.reset(), () => r.error());
		},
		error: { message: "must NOT be valid" }
	};
})), require_anyOf$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.default = {
		keyword: "anyOf",
		schemaType: "array",
		trackErrors: !0,
		code: require_code$2().validateUnion,
		error: { message: "must match a schema in anyOf" }
	};
})), require_oneOf$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_codegen$1(), c = require_util$2();
	r.default = {
		keyword: "oneOf",
		schemaType: "array",
		trackErrors: !0,
		error: {
			message: "must match exactly one schema in oneOf",
			params: ({ params: r }) => (0, s._)`{passingSchemas: ${r.passing}}`
		},
		code(r) {
			let { gen: l, schema: u, parentSchema: d, it: f } = r;
			/* istanbul ignore if */
			if (!Array.isArray(u)) throw Error("ajv implementation error");
			if (f.opts.discriminator && d.discriminator) return;
			let p = u, m = l.let("valid", !1), h = l.let("passing", null), g = l.name("_valid");
			r.setParams({ passing: h }), l.block(_), r.result(m, () => r.reset(), () => r.error(!0));
			function _() {
				p.forEach((u, d) => {
					let p;
					(0, c.alwaysValidSchema)(f, u) ? l.var(g, !0) : p = r.subschema({
						keyword: "oneOf",
						schemaProp: d,
						compositeRule: !0
					}, g), d > 0 && l.if((0, s._)`${g} && ${m}`).assign(m, !1).assign(h, (0, s._)`[${h}, ${d}]`).else(), l.if(g, () => {
						l.assign(m, !0), l.assign(h, d), p && r.mergeEvaluated(p, s.Name);
					});
				});
			}
		}
	};
})), require_allOf$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_util$2();
	r.default = {
		keyword: "allOf",
		schemaType: "array",
		code(r) {
			let { gen: c, schema: l, it: u } = r;
			/* istanbul ignore if */
			if (!Array.isArray(l)) throw Error("ajv implementation error");
			let d = c.name("valid");
			l.forEach((c, l) => {
				if ((0, s.alwaysValidSchema)(u, c)) return;
				let f = r.subschema({
					keyword: "allOf",
					schemaProp: l
				}, d);
				r.ok(d), r.mergeEvaluated(f);
			});
		}
	};
})), require_if$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_codegen$1(), c = require_util$2(), l = {
		keyword: "if",
		schemaType: ["object", "boolean"],
		trackErrors: !0,
		error: {
			message: ({ params: r }) => (0, s.str)`must match "${r.ifClause}" schema`,
			params: ({ params: r }) => (0, s._)`{failingKeyword: ${r.ifClause}}`
		},
		code(r) {
			let { gen: l, parentSchema: d, it: f } = r;
			d.then === void 0 && d.else === void 0 && (0, c.checkStrictMode)(f, "\"if\" without \"then\" and \"else\" is ignored");
			let p = u(f, "then"), m = u(f, "else");
			if (!p && !m) return;
			let h = l.let("valid", !0), g = l.name("_valid");
			if (_(), r.reset(), p && m) {
				let s = l.let("ifClause");
				r.setParams({ ifClause: s }), l.if(g, v("then", s), v("else", s));
			} else p ? l.if(g, v("then")) : l.if((0, s.not)(g), v("else"));
			r.pass(h, () => r.error(!0));
			function _() {
				let s = r.subschema({
					keyword: "if",
					compositeRule: !0,
					createErrors: !1,
					allErrors: !1
				}, g);
				r.mergeEvaluated(s);
			}
			function v(c, u) {
				return () => {
					let d = r.subschema({ keyword: c }, g);
					l.assign(h, g), r.mergeValidEvaluated(d, h), u ? l.assign(u, (0, s._)`${c}`) : r.setParams({ ifClause: c });
				};
			}
		}
	};
	function u(r, s) {
		let l = r.schema[s];
		return l !== void 0 && !(0, c.alwaysValidSchema)(r, l);
	}
	r.default = l;
})), require_thenElse$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_util$2();
	r.default = {
		keyword: ["then", "else"],
		schemaType: ["object", "boolean"],
		code({ keyword: r, parentSchema: c, it: l }) {
			c.if === void 0 && (0, s.checkStrictMode)(l, `"${r}" without "if" is ignored`);
		}
	};
})), require_applicator$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_additionalItems$1(), c = require_prefixItems$1(), l = require_items$1(), u = require_items2020$1(), d = require_contains$1(), f = require_dependencies$1(), p = require_propertyNames$1(), m = require_additionalProperties$1(), h = require_properties$1(), g = require_patternProperties$1(), _ = require_not$1(), v = require_anyOf$1(), y = require_oneOf$1(), b = require_allOf$1(), x = require_if$1(), S = require_thenElse$1();
	function C(r = !1) {
		let C = [
			_.default,
			v.default,
			y.default,
			b.default,
			x.default,
			S.default,
			p.default,
			m.default,
			f.default,
			h.default,
			g.default
		];
		return r ? C.push(c.default, u.default) : C.push(s.default, l.default), C.push(d.default), C;
	}
	r.default = C;
})), require_dynamicAnchor = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.dynamicAnchor = void 0;
	var s = require_codegen$1(), c = require_names$1(), l = require_compile$1(), u = require_ref$1(), d = {
		keyword: "$dynamicAnchor",
		schemaType: "string",
		code: (r) => f(r, r.schema)
	};
	function f(r, l) {
		let { gen: u, it: d } = r;
		d.schemaEnv.root.dynamicAnchors[l] = !0;
		let f = (0, s._)`${c.default.dynamicAnchors}${(0, s.getProperty)(l)}`, m = d.errSchemaPath === "#" ? d.validateName : p(r);
		u.if((0, s._)`!${f}`, () => u.assign(f, m));
	}
	r.dynamicAnchor = f;
	function p(r) {
		let { schemaEnv: s, schema: c, self: d } = r.it, { root: f, baseId: p, localRefs: m, meta: h } = s.root, { schemaId: g } = d.opts, _ = new l.SchemaEnv({
			schema: c,
			schemaId: g,
			root: f,
			baseId: p,
			localRefs: m,
			meta: h
		});
		return l.compileSchema.call(d, _), (0, u.getValidate)(r, _);
	}
	r.default = d;
})), require_dynamicRef = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.dynamicRef = void 0;
	var s = require_codegen$1(), c = require_names$1(), l = require_ref$1(), u = {
		keyword: "$dynamicRef",
		schemaType: "string",
		code: (r) => d(r, r.schema)
	};
	function d(r, u) {
		let { gen: d, keyword: f, it: p } = r;
		if (u[0] !== "#") throw Error(`"${f}" only supports hash fragment reference`);
		let m = u.slice(1);
		if (p.allErrors) h();
		else {
			let s = d.let("valid", !1);
			h(s), r.ok(s);
		}
		function h(r) {
			if (p.schemaEnv.root.dynamicAnchors[m]) {
				let l = d.let("_v", (0, s._)`${c.default.dynamicAnchors}${(0, s.getProperty)(m)}`);
				d.if(l, g(l, r), g(p.validateName, r));
			} else g(p.validateName, r)();
		}
		function g(s, c) {
			return c ? () => d.block(() => {
				(0, l.callRef)(r, s), d.let(c, !0);
			}) : () => (0, l.callRef)(r, s);
		}
	}
	r.dynamicRef = d, r.default = u;
})), require_recursiveAnchor = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_dynamicAnchor(), c = require_util$2();
	r.default = {
		keyword: "$recursiveAnchor",
		schemaType: "boolean",
		code(r) {
			r.schema ? (0, s.dynamicAnchor)(r, "") : (0, c.checkStrictMode)(r.it, "$recursiveAnchor: false is ignored");
		}
	};
})), require_recursiveRef = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_dynamicRef();
	r.default = {
		keyword: "$recursiveRef",
		schemaType: "string",
		code: (r) => (0, s.dynamicRef)(r, r.schema)
	};
})), require_dynamic = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_dynamicAnchor(), c = require_dynamicRef(), l = require_recursiveAnchor(), u = require_recursiveRef();
	r.default = [
		s.default,
		c.default,
		l.default,
		u.default
	];
})), require_dependentRequired = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_dependencies$1();
	r.default = {
		keyword: "dependentRequired",
		type: "object",
		schemaType: "object",
		error: s.error,
		code: (r) => (0, s.validatePropertyDeps)(r)
	};
})), require_dependentSchemas = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_dependencies$1();
	r.default = {
		keyword: "dependentSchemas",
		type: "object",
		schemaType: "object",
		code: (r) => (0, s.validateSchemaDeps)(r)
	};
})), require_limitContains = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_util$2();
	r.default = {
		keyword: ["maxContains", "minContains"],
		type: "array",
		schemaType: "number",
		code({ keyword: r, parentSchema: c, it: l }) {
			c.contains === void 0 && (0, s.checkStrictMode)(l, `"${r}" without "contains" is ignored`);
		}
	};
})), require_next = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_dependentRequired(), c = require_dependentSchemas(), l = require_limitContains();
	r.default = [
		s.default,
		c.default,
		l.default
	];
})), require_unevaluatedProperties = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_codegen$1(), c = require_util$2(), l = require_names$1();
	r.default = {
		keyword: "unevaluatedProperties",
		type: "object",
		schemaType: ["boolean", "object"],
		trackErrors: !0,
		error: {
			message: "must NOT have unevaluated properties",
			params: ({ params: r }) => (0, s._)`{unevaluatedProperty: ${r.unevaluatedProperty}}`
		},
		code(r) {
			let { gen: u, schema: d, data: f, errsCount: p, it: m } = r;
			/* istanbul ignore if */
			if (!p) throw Error("ajv implementation error");
			let { allErrors: h, props: g } = m;
			g instanceof s.Name ? u.if((0, s._)`${g} !== true`, () => u.forIn("key", f, (r) => u.if(v(g, r), () => _(r)))) : g !== !0 && u.forIn("key", f, (r) => g === void 0 ? _(r) : u.if(y(g, r), () => _(r))), m.props = !0, r.ok((0, s._)`${p} === ${l.default.errors}`);
			function _(l) {
				if (d === !1) {
					r.setParams({ unevaluatedProperty: l }), r.error(), h || u.break();
					return;
				}
				if (!(0, c.alwaysValidSchema)(m, d)) {
					let d = u.name("valid");
					r.subschema({
						keyword: "unevaluatedProperties",
						dataProp: l,
						dataPropType: c.Type.Str
					}, d), h || u.if((0, s.not)(d), () => u.break());
				}
			}
			function v(r, c) {
				return (0, s._)`!${r} || !${r}[${c}]`;
			}
			function y(r, c) {
				let l = [];
				for (let u in r) r[u] === !0 && l.push((0, s._)`${c} !== ${u}`);
				return (0, s.and)(...l);
			}
		}
	};
})), require_unevaluatedItems = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_codegen$1(), c = require_util$2();
	r.default = {
		keyword: "unevaluatedItems",
		type: "array",
		schemaType: ["boolean", "object"],
		error: {
			message: ({ params: { len: r } }) => (0, s.str)`must NOT have more than ${r} items`,
			params: ({ params: { len: r } }) => (0, s._)`{limit: ${r}}`
		},
		code(r) {
			let { gen: l, schema: u, data: d, it: f } = r, p = f.items || 0;
			if (p === !0) return;
			let m = l.const("len", (0, s._)`${d}.length`);
			if (u === !1) r.setParams({ len: p }), r.fail((0, s._)`${m} > ${p}`);
			else if (typeof u == "object" && !(0, c.alwaysValidSchema)(f, u)) {
				let c = l.var("valid", (0, s._)`${m} <= ${p}`);
				l.if((0, s.not)(c), () => h(c, p)), r.ok(c);
			}
			f.items = !0;
			function h(u, d) {
				l.forRange("i", d, m, (d) => {
					r.subschema({
						keyword: "unevaluatedItems",
						dataProp: d,
						dataPropType: c.Type.Num
					}, u), f.allErrors || l.if((0, s.not)(u), () => l.break());
				});
			}
		}
	};
})), require_unevaluated = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_unevaluatedProperties(), c = require_unevaluatedItems();
	r.default = [s.default, c.default];
})), require_format$3 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_codegen$1();
	r.default = {
		keyword: "format",
		type: ["number", "string"],
		schemaType: "string",
		$data: !0,
		error: {
			message: ({ schemaCode: r }) => (0, s.str)`must match format "${r}"`,
			params: ({ schemaCode: r }) => (0, s._)`{format: ${r}}`
		},
		code(r, c) {
			let { gen: l, data: u, $data: d, schema: f, schemaCode: p, it: m } = r, { opts: h, errSchemaPath: g, schemaEnv: _, self: v } = m;
			if (!h.validateFormats) return;
			d ? y() : b();
			function y() {
				let d = l.scopeValue("formats", {
					ref: v.formats,
					code: h.code.formats
				}), f = l.const("fDef", (0, s._)`${d}[${p}]`), m = l.let("fType"), g = l.let("format");
				l.if((0, s._)`typeof ${f} == "object" && !(${f} instanceof RegExp)`, () => l.assign(m, (0, s._)`${f}.type || "string"`).assign(g, (0, s._)`${f}.validate`), () => l.assign(m, (0, s._)`"string"`).assign(g, f)), r.fail$data((0, s.or)(y(), b()));
				function y() {
					return h.strictSchema === !1 ? s.nil : (0, s._)`${p} && !${g}`;
				}
				function b() {
					let r = _.$async ? (0, s._)`(${f}.async ? await ${g}(${u}) : ${g}(${u}))` : (0, s._)`${g}(${u})`, l = (0, s._)`(typeof ${g} == "function" ? ${r} : ${g}.test(${u}))`;
					return (0, s._)`${g} && ${g} !== true && ${m} === ${c} && !${l}`;
				}
			}
			function b() {
				let d = v.formats[f];
				if (!d) {
					b();
					return;
				}
				if (d === !0) return;
				let [p, m, y] = x(d);
				p === c && r.pass(S());
				function b() {
					if (h.strictSchema === !1) {
						v.logger.warn(r());
						return;
					}
					throw Error(r());
					function r() {
						return `unknown format "${f}" ignored in schema at path "${g}"`;
					}
				}
				function x(r) {
					let c = r instanceof RegExp ? (0, s.regexpCode)(r) : h.code.formats ? (0, s._)`${h.code.formats}${(0, s.getProperty)(f)}` : void 0, u = l.scopeValue("formats", {
						key: f,
						ref: r,
						code: c
					});
					return typeof r == "object" && !(r instanceof RegExp) ? [
						r.type || "string",
						r.validate,
						(0, s._)`${u}.validate`
					] : [
						"string",
						r,
						u
					];
				}
				function S() {
					if (typeof d == "object" && !(d instanceof RegExp) && d.async) {
						if (!_.$async) throw Error("async format in sync schema");
						return (0, s._)`await ${y}(${u})`;
					}
					return typeof m == "function" ? (0, s._)`${y}(${u})` : (0, s._)`${y}.test(${u})`;
				}
			}
		}
	};
})), require_format$2 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.default = [require_format$3().default];
})), require_metadata$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.contentVocabulary = r.metadataVocabulary = void 0, r.metadataVocabulary = [
		"title",
		"description",
		"default",
		"deprecated",
		"readOnly",
		"writeOnly",
		"examples"
	], r.contentVocabulary = [
		"contentMediaType",
		"contentEncoding",
		"contentSchema"
	];
})), require_draft2020 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_core$2(), c = require_validation$1(), l = require_applicator$1(), u = require_dynamic(), d = require_next(), f = require_unevaluated(), p = require_format$2(), m = require_metadata$1();
	r.default = [
		u.default,
		s.default,
		c.default,
		(0, l.default)(!0),
		p.default,
		m.metadataVocabulary,
		m.contentVocabulary,
		d.default,
		f.default
	];
})), require_types$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.DiscrError = void 0;
	var s;
	(function(r) {
		r.Tag = "tag", r.Mapping = "mapping";
	})(s || (r.DiscrError = s = {}));
})), require_discriminator$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_codegen$1(), c = require_types$1(), l = require_compile$1(), u = require_ref_error$1(), d = require_util$2();
	r.default = {
		keyword: "discriminator",
		type: "object",
		schemaType: "object",
		error: {
			message: ({ params: { discrError: r, tagName: s } }) => r === c.DiscrError.Tag ? `tag "${s}" must be string` : `value of tag "${s}" must be in oneOf`,
			params: ({ params: { discrError: r, tag: c, tagName: l } }) => (0, s._)`{error: ${r}, tag: ${l}, tagValue: ${c}}`
		},
		code(r) {
			let { gen: f, data: p, schema: m, parentSchema: h, it: g } = r, { oneOf: _ } = h;
			if (!g.opts.discriminator) throw Error("discriminator: requires discriminator option");
			let v = m.propertyName;
			if (typeof v != "string") throw Error("discriminator: requires propertyName");
			if (m.mapping) throw Error("discriminator: mapping is not supported");
			if (!_) throw Error("discriminator: requires oneOf keyword");
			let y = f.let("valid", !1), b = f.const("tag", (0, s._)`${p}${(0, s.getProperty)(v)}`);
			f.if((0, s._)`typeof ${b} == "string"`, () => x(), () => r.error(!1, {
				discrError: c.DiscrError.Tag,
				tag: b,
				tagName: v
			})), r.ok(y);
			function x() {
				let l = C();
				for (let r in f.if(!1), l) f.elseIf((0, s._)`${b} === ${r}`), f.assign(y, S(l[r]));
				f.else(), r.error(!1, {
					discrError: c.DiscrError.Mapping,
					tag: b,
					tagName: v
				}), f.endIf();
			}
			function S(c) {
				let l = f.name("valid"), u = r.subschema({
					keyword: "oneOf",
					schemaProp: c
				}, l);
				return r.mergeEvaluated(u, s.Name), l;
			}
			function C() {
				let r = {}, s = f(h), c = !0;
				for (let r = 0; r < _.length; r++) {
					let m = _[r];
					if (m?.$ref && !(0, d.schemaHasRulesButRef)(m, g.self.RULES)) {
						let r = m.$ref;
						if (m = l.resolveRef.call(g.self, g.schemaEnv.root, g.baseId, r), m instanceof l.SchemaEnv && (m = m.schema), m === void 0) throw new u.default(g.opts.uriResolver, g.baseId, r);
					}
					let h = m?.properties?.[v];
					if (typeof h != "object") throw Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${v}"`);
					c &&= s || f(m), p(h, r);
				}
				if (!c) throw Error(`discriminator: "${v}" must be required`);
				return r;
				function f({ required: r }) {
					return Array.isArray(r) && r.includes(v);
				}
				function p(r, s) {
					if (r.const) m(r.const, s);
					else if (r.enum) for (let c of r.enum) m(c, s);
					else throw Error(`discriminator: "properties/${v}" must have "const" or "enum"`);
				}
				function m(s, c) {
					if (typeof s != "string" || s in r) throw Error(`discriminator: "${v}" values must be unique strings`);
					r[s] = c;
				}
			}
		}
	};
})), schema_exports = /* @__PURE__ */ __export({
	$comment: () => $comment,
	$dynamicAnchor: () => $dynamicAnchor$7,
	$id: () => $id$9,
	$schema: () => $schema$8,
	$vocabulary: () => $vocabulary$7,
	allOf: () => allOf,
	default: () => schema_default,
	properties: () => properties$9,
	title: () => title$8,
	type: () => type$9
}, 1), $schema$8, $id$9, $vocabulary$7, $dynamicAnchor$7, title$8, allOf, type$9, $comment, properties$9, schema_default, init_schema = __esmMin((() => {
	$schema$8 = "https://json-schema.org/draft/2020-12/schema", $id$9 = "https://json-schema.org/draft/2020-12/schema", $vocabulary$7 = {
		"https://json-schema.org/draft/2020-12/vocab/core": !0,
		"https://json-schema.org/draft/2020-12/vocab/applicator": !0,
		"https://json-schema.org/draft/2020-12/vocab/unevaluated": !0,
		"https://json-schema.org/draft/2020-12/vocab/validation": !0,
		"https://json-schema.org/draft/2020-12/vocab/meta-data": !0,
		"https://json-schema.org/draft/2020-12/vocab/format-annotation": !0,
		"https://json-schema.org/draft/2020-12/vocab/content": !0
	}, $dynamicAnchor$7 = "meta", title$8 = "Core and Validation specifications meta-schema", allOf = [
		{ $ref: "meta/core" },
		{ $ref: "meta/applicator" },
		{ $ref: "meta/unevaluated" },
		{ $ref: "meta/validation" },
		{ $ref: "meta/meta-data" },
		{ $ref: "meta/format-annotation" },
		{ $ref: "meta/content" }
	], type$9 = ["object", "boolean"], $comment = "This meta-schema also defines keywords that have appeared in previous drafts in order to prevent incompatible extensions as they remain in common use.", properties$9 = {
		definitions: {
			$comment: "\"definitions\" has been replaced by \"$defs\".",
			type: "object",
			additionalProperties: { $dynamicRef: "#meta" },
			deprecated: !0,
			default: {}
		},
		dependencies: {
			$comment: "\"dependencies\" has been split and replaced by \"dependentSchemas\" and \"dependentRequired\" in order to serve their differing semantics.",
			type: "object",
			additionalProperties: { anyOf: [{ $dynamicRef: "#meta" }, { $ref: "meta/validation#/$defs/stringArray" }] },
			deprecated: !0,
			default: {}
		},
		$recursiveAnchor: {
			$comment: "\"$recursiveAnchor\" has been replaced by \"$dynamicAnchor\".",
			$ref: "meta/core#/$defs/anchorString",
			deprecated: !0
		},
		$recursiveRef: {
			$comment: "\"$recursiveRef\" has been replaced by \"$dynamicRef\".",
			$ref: "meta/core#/$defs/uriReferenceString",
			deprecated: !0
		}
	}, schema_default = {
		$schema: $schema$8,
		$id: $id$9,
		$vocabulary: $vocabulary$7,
		$dynamicAnchor: $dynamicAnchor$7,
		title: title$8,
		allOf,
		type: type$9,
		$comment,
		properties: properties$9
	};
})), applicator_exports = /* @__PURE__ */ __export({
	$defs: () => $defs$2,
	$dynamicAnchor: () => $dynamicAnchor$6,
	$id: () => $id$8,
	$schema: () => $schema$7,
	$vocabulary: () => $vocabulary$6,
	default: () => applicator_default,
	properties: () => properties$8,
	title: () => title$7,
	type: () => type$8
}, 1), $schema$7, $id$8, $vocabulary$6, $dynamicAnchor$6, title$7, type$8, properties$8, $defs$2, applicator_default, init_applicator = __esmMin((() => {
	$schema$7 = "https://json-schema.org/draft/2020-12/schema", $id$8 = "https://json-schema.org/draft/2020-12/meta/applicator", $vocabulary$6 = { "https://json-schema.org/draft/2020-12/vocab/applicator": !0 }, $dynamicAnchor$6 = "meta", title$7 = "Applicator vocabulary meta-schema", type$8 = ["object", "boolean"], properties$8 = {
		prefixItems: { $ref: "#/$defs/schemaArray" },
		items: { $dynamicRef: "#meta" },
		contains: { $dynamicRef: "#meta" },
		additionalProperties: { $dynamicRef: "#meta" },
		properties: {
			type: "object",
			additionalProperties: { $dynamicRef: "#meta" },
			default: {}
		},
		patternProperties: {
			type: "object",
			additionalProperties: { $dynamicRef: "#meta" },
			propertyNames: { format: "regex" },
			default: {}
		},
		dependentSchemas: {
			type: "object",
			additionalProperties: { $dynamicRef: "#meta" },
			default: {}
		},
		propertyNames: { $dynamicRef: "#meta" },
		if: { $dynamicRef: "#meta" },
		then: { $dynamicRef: "#meta" },
		else: { $dynamicRef: "#meta" },
		allOf: { $ref: "#/$defs/schemaArray" },
		anyOf: { $ref: "#/$defs/schemaArray" },
		oneOf: { $ref: "#/$defs/schemaArray" },
		not: { $dynamicRef: "#meta" }
	}, $defs$2 = { schemaArray: {
		type: "array",
		minItems: 1,
		items: { $dynamicRef: "#meta" }
	} }, applicator_default = {
		$schema: $schema$7,
		$id: $id$8,
		$vocabulary: $vocabulary$6,
		$dynamicAnchor: $dynamicAnchor$6,
		title: title$7,
		type: type$8,
		properties: properties$8,
		$defs: $defs$2
	};
})), unevaluated_exports = /* @__PURE__ */ __export({
	$dynamicAnchor: () => $dynamicAnchor$5,
	$id: () => $id$7,
	$schema: () => $schema$6,
	$vocabulary: () => $vocabulary$5,
	default: () => unevaluated_default,
	properties: () => properties$7,
	title: () => title$6,
	type: () => type$7
}, 1), $schema$6, $id$7, $vocabulary$5, $dynamicAnchor$5, title$6, type$7, properties$7, unevaluated_default, init_unevaluated = __esmMin((() => {
	$schema$6 = "https://json-schema.org/draft/2020-12/schema", $id$7 = "https://json-schema.org/draft/2020-12/meta/unevaluated", $vocabulary$5 = { "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0 }, $dynamicAnchor$5 = "meta", title$6 = "Unevaluated applicator vocabulary meta-schema", type$7 = ["object", "boolean"], properties$7 = {
		unevaluatedItems: { $dynamicRef: "#meta" },
		unevaluatedProperties: { $dynamicRef: "#meta" }
	}, unevaluated_default = {
		$schema: $schema$6,
		$id: $id$7,
		$vocabulary: $vocabulary$5,
		$dynamicAnchor: $dynamicAnchor$5,
		title: title$6,
		type: type$7,
		properties: properties$7
	};
})), content_exports = /* @__PURE__ */ __export({
	$dynamicAnchor: () => $dynamicAnchor$4,
	$id: () => $id$6,
	$schema: () => $schema$5,
	$vocabulary: () => $vocabulary$4,
	default: () => content_default,
	properties: () => properties$6,
	title: () => title$5,
	type: () => type$6
}, 1), $schema$5, $id$6, $vocabulary$4, $dynamicAnchor$4, title$5, type$6, properties$6, content_default, init_content = __esmMin((() => {
	$schema$5 = "https://json-schema.org/draft/2020-12/schema", $id$6 = "https://json-schema.org/draft/2020-12/meta/content", $vocabulary$4 = { "https://json-schema.org/draft/2020-12/vocab/content": !0 }, $dynamicAnchor$4 = "meta", title$5 = "Content vocabulary meta-schema", type$6 = ["object", "boolean"], properties$6 = {
		contentEncoding: { type: "string" },
		contentMediaType: { type: "string" },
		contentSchema: { $dynamicRef: "#meta" }
	}, content_default = {
		$schema: $schema$5,
		$id: $id$6,
		$vocabulary: $vocabulary$4,
		$dynamicAnchor: $dynamicAnchor$4,
		title: title$5,
		type: type$6,
		properties: properties$6
	};
})), core_exports = /* @__PURE__ */ __export({
	$defs: () => $defs$1,
	$dynamicAnchor: () => $dynamicAnchor$3,
	$id: () => $id$5,
	$schema: () => $schema$4,
	$vocabulary: () => $vocabulary$3,
	default: () => core_default,
	properties: () => properties$5,
	title: () => title$4,
	type: () => type$5
}, 1), $schema$4, $id$5, $vocabulary$3, $dynamicAnchor$3, title$4, type$5, properties$5, $defs$1, core_default, init_core = __esmMin((() => {
	$schema$4 = "https://json-schema.org/draft/2020-12/schema", $id$5 = "https://json-schema.org/draft/2020-12/meta/core", $vocabulary$3 = { "https://json-schema.org/draft/2020-12/vocab/core": !0 }, $dynamicAnchor$3 = "meta", title$4 = "Core vocabulary meta-schema", type$5 = ["object", "boolean"], properties$5 = {
		$id: {
			$ref: "#/$defs/uriReferenceString",
			$comment: "Non-empty fragments not allowed.",
			pattern: "^[^#]*#?$"
		},
		$schema: { $ref: "#/$defs/uriString" },
		$ref: { $ref: "#/$defs/uriReferenceString" },
		$anchor: { $ref: "#/$defs/anchorString" },
		$dynamicRef: { $ref: "#/$defs/uriReferenceString" },
		$dynamicAnchor: { $ref: "#/$defs/anchorString" },
		$vocabulary: {
			type: "object",
			propertyNames: { $ref: "#/$defs/uriString" },
			additionalProperties: { type: "boolean" }
		},
		$comment: { type: "string" },
		$defs: {
			type: "object",
			additionalProperties: { $dynamicRef: "#meta" }
		}
	}, $defs$1 = {
		anchorString: {
			type: "string",
			pattern: "^[A-Za-z_][-A-Za-z0-9._]*$"
		},
		uriString: {
			type: "string",
			format: "uri"
		},
		uriReferenceString: {
			type: "string",
			format: "uri-reference"
		}
	}, core_default = {
		$schema: $schema$4,
		$id: $id$5,
		$vocabulary: $vocabulary$3,
		$dynamicAnchor: $dynamicAnchor$3,
		title: title$4,
		type: type$5,
		properties: properties$5,
		$defs: $defs$1
	};
})), format_annotation_exports = /* @__PURE__ */ __export({
	$dynamicAnchor: () => $dynamicAnchor$2,
	$id: () => $id$4,
	$schema: () => $schema$3,
	$vocabulary: () => $vocabulary$2,
	default: () => format_annotation_default,
	properties: () => properties$4,
	title: () => title$3,
	type: () => type$4
}, 1), $schema$3, $id$4, $vocabulary$2, $dynamicAnchor$2, title$3, type$4, properties$4, format_annotation_default, init_format_annotation = __esmMin((() => {
	$schema$3 = "https://json-schema.org/draft/2020-12/schema", $id$4 = "https://json-schema.org/draft/2020-12/meta/format-annotation", $vocabulary$2 = { "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0 }, $dynamicAnchor$2 = "meta", title$3 = "Format vocabulary meta-schema for annotation results", type$4 = ["object", "boolean"], properties$4 = { format: { type: "string" } }, format_annotation_default = {
		$schema: $schema$3,
		$id: $id$4,
		$vocabulary: $vocabulary$2,
		$dynamicAnchor: $dynamicAnchor$2,
		title: title$3,
		type: type$4,
		properties: properties$4
	};
})), meta_data_exports = /* @__PURE__ */ __export({
	$dynamicAnchor: () => $dynamicAnchor$1,
	$id: () => $id$3,
	$schema: () => $schema$2,
	$vocabulary: () => $vocabulary$1,
	default: () => meta_data_default,
	properties: () => properties$3,
	title: () => title$2,
	type: () => type$3
}, 1), $schema$2, $id$3, $vocabulary$1, $dynamicAnchor$1, title$2, type$3, properties$3, meta_data_default, init_meta_data = __esmMin((() => {
	$schema$2 = "https://json-schema.org/draft/2020-12/schema", $id$3 = "https://json-schema.org/draft/2020-12/meta/meta-data", $vocabulary$1 = { "https://json-schema.org/draft/2020-12/vocab/meta-data": !0 }, $dynamicAnchor$1 = "meta", title$2 = "Meta-data vocabulary meta-schema", type$3 = ["object", "boolean"], properties$3 = {
		title: { type: "string" },
		description: { type: "string" },
		default: !0,
		deprecated: {
			type: "boolean",
			default: !1
		},
		readOnly: {
			type: "boolean",
			default: !1
		},
		writeOnly: {
			type: "boolean",
			default: !1
		},
		examples: {
			type: "array",
			items: !0
		}
	}, meta_data_default = {
		$schema: $schema$2,
		$id: $id$3,
		$vocabulary: $vocabulary$1,
		$dynamicAnchor: $dynamicAnchor$1,
		title: title$2,
		type: type$3,
		properties: properties$3
	};
})), validation_exports = /* @__PURE__ */ __export({
	$defs: () => $defs,
	$dynamicAnchor: () => $dynamicAnchor,
	$id: () => $id$2,
	$schema: () => $schema$1,
	$vocabulary: () => $vocabulary,
	default: () => validation_default,
	properties: () => properties$2,
	title: () => title$1,
	type: () => type$2
}, 1), $schema$1, $id$2, $vocabulary, $dynamicAnchor, title$1, type$2, properties$2, $defs, validation_default, init_validation = __esmMin((() => {
	$schema$1 = "https://json-schema.org/draft/2020-12/schema", $id$2 = "https://json-schema.org/draft/2020-12/meta/validation", $vocabulary = { "https://json-schema.org/draft/2020-12/vocab/validation": !0 }, $dynamicAnchor = "meta", title$1 = "Validation vocabulary meta-schema", type$2 = ["object", "boolean"], properties$2 = {
		type: { anyOf: [{ $ref: "#/$defs/simpleTypes" }, {
			type: "array",
			items: { $ref: "#/$defs/simpleTypes" },
			minItems: 1,
			uniqueItems: !0
		}] },
		const: !0,
		enum: {
			type: "array",
			items: !0
		},
		multipleOf: {
			type: "number",
			exclusiveMinimum: 0
		},
		maximum: { type: "number" },
		exclusiveMaximum: { type: "number" },
		minimum: { type: "number" },
		exclusiveMinimum: { type: "number" },
		maxLength: { $ref: "#/$defs/nonNegativeInteger" },
		minLength: { $ref: "#/$defs/nonNegativeIntegerDefault0" },
		pattern: {
			type: "string",
			format: "regex"
		},
		maxItems: { $ref: "#/$defs/nonNegativeInteger" },
		minItems: { $ref: "#/$defs/nonNegativeIntegerDefault0" },
		uniqueItems: {
			type: "boolean",
			default: !1
		},
		maxContains: { $ref: "#/$defs/nonNegativeInteger" },
		minContains: {
			$ref: "#/$defs/nonNegativeInteger",
			default: 1
		},
		maxProperties: { $ref: "#/$defs/nonNegativeInteger" },
		minProperties: { $ref: "#/$defs/nonNegativeIntegerDefault0" },
		required: { $ref: "#/$defs/stringArray" },
		dependentRequired: {
			type: "object",
			additionalProperties: { $ref: "#/$defs/stringArray" }
		}
	}, $defs = {
		nonNegativeInteger: {
			type: "integer",
			minimum: 0
		},
		nonNegativeIntegerDefault0: {
			$ref: "#/$defs/nonNegativeInteger",
			default: 0
		},
		simpleTypes: { enum: [
			"array",
			"boolean",
			"integer",
			"null",
			"number",
			"object",
			"string"
		] },
		stringArray: {
			type: "array",
			items: { type: "string" },
			uniqueItems: !0,
			default: []
		}
	}, validation_default = {
		$schema: $schema$1,
		$id: $id$2,
		$vocabulary,
		$dynamicAnchor,
		title: title$1,
		type: type$2,
		properties: properties$2,
		$defs
	};
})), require_json_schema_2020_12 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = (init_schema(), __toCommonJS(schema_exports).default), c = (init_applicator(), __toCommonJS(applicator_exports).default), l = (init_unevaluated(), __toCommonJS(unevaluated_exports).default), u = (init_content(), __toCommonJS(content_exports).default), d = (init_core(), __toCommonJS(core_exports).default), f = (init_format_annotation(), __toCommonJS(format_annotation_exports).default), p = (init_meta_data(), __toCommonJS(meta_data_exports).default), m = (init_validation(), __toCommonJS(validation_exports).default), h = ["/properties"];
	function g(r) {
		return [
			s,
			c,
			l,
			u,
			d,
			g(this, f),
			p,
			g(this, m)
		].forEach((r) => this.addMetaSchema(r, void 0, !1)), this;
		function g(s, c) {
			return r ? s.$dataMetaSchema(c, h) : c;
		}
	}
	r.default = g;
})), require__2020 = /* @__PURE__ */ __commonJSMin(((r, s) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.MissingRefError = r.ValidationError = r.CodeGen = r.Name = r.nil = r.stringify = r.str = r._ = r.KeywordCxt = r.Ajv2020 = void 0;
	var c = require_core$3(), l = require_draft2020(), u = require_discriminator$1(), d = require_json_schema_2020_12(), f = "https://json-schema.org/draft/2020-12/schema", p = class extends c.default {
		constructor(r = {}) {
			super({
				...r,
				dynamicRef: !0,
				next: !0,
				unevaluated: !0
			});
		}
		_addVocabularies() {
			super._addVocabularies(), l.default.forEach((r) => this.addVocabulary(r)), this.opts.discriminator && this.addKeyword(u.default);
		}
		_addDefaultMetaSchema() {
			super._addDefaultMetaSchema();
			let { $data: r, meta: s } = this.opts;
			s && (d.default.call(this, r), this.refs["http://json-schema.org/schema"] = f);
		}
		defaultMeta() {
			return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(f) ? f : void 0);
		}
	};
	r.Ajv2020 = p, s.exports = r = p, s.exports.Ajv2020 = p, Object.defineProperty(r, "__esModule", { value: !0 }), r.default = p;
	var m = require_validate$1();
	Object.defineProperty(r, "KeywordCxt", {
		enumerable: !0,
		get: function() {
			return m.KeywordCxt;
		}
	});
	var h = require_codegen$1();
	Object.defineProperty(r, "_", {
		enumerable: !0,
		get: function() {
			return h._;
		}
	}), Object.defineProperty(r, "str", {
		enumerable: !0,
		get: function() {
			return h.str;
		}
	}), Object.defineProperty(r, "stringify", {
		enumerable: !0,
		get: function() {
			return h.stringify;
		}
	}), Object.defineProperty(r, "nil", {
		enumerable: !0,
		get: function() {
			return h.nil;
		}
	}), Object.defineProperty(r, "Name", {
		enumerable: !0,
		get: function() {
			return h.Name;
		}
	}), Object.defineProperty(r, "CodeGen", {
		enumerable: !0,
		get: function() {
			return h.CodeGen;
		}
	});
	var g = require_validation_error$1();
	Object.defineProperty(r, "ValidationError", {
		enumerable: !0,
		get: function() {
			return g.default;
		}
	});
	var _ = require_ref_error$1();
	Object.defineProperty(r, "MissingRefError", {
		enumerable: !0,
		get: function() {
			return _.default;
		}
	});
})), require_formats = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.formatNames = r.fastFormats = r.fullFormats = void 0;
	function s(r, s) {
		return {
			validate: r,
			compare: s
		};
	}
	r.fullFormats = {
		date: s(d, f),
		time: s(m(!0), h),
		"date-time": s(v(!0), y),
		"iso-time": s(m(), g),
		"iso-date-time": s(v(), b),
		duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
		uri: C,
		"uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
		"uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
		url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
		email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
		hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
		ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
		ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
		regex: M,
		uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
		"json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
		"json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
		"relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
		byte: T,
		int32: {
			type: "number",
			validate: O
		},
		int64: {
			type: "number",
			validate: k
		},
		float: {
			type: "number",
			validate: A
		},
		double: {
			type: "number",
			validate: A
		},
		password: !0,
		binary: !0
	}, r.fastFormats = {
		...r.fullFormats,
		date: s(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, f),
		time: s(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, h),
		"date-time": s(/^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, y),
		"iso-time": s(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, g),
		"iso-date-time": s(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, b),
		uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
		"uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
		email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
	}, r.formatNames = Object.keys(r.fullFormats);
	function c(r) {
		return r % 4 == 0 && (r % 100 != 0 || r % 400 == 0);
	}
	var l = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, u = [
		0,
		31,
		28,
		31,
		30,
		31,
		30,
		31,
		31,
		30,
		31,
		30,
		31
	];
	function d(r) {
		let s = l.exec(r);
		if (!s) return !1;
		let d = +s[1], f = +s[2], p = +s[3];
		return f >= 1 && f <= 12 && p >= 1 && p <= (f === 2 && c(d) ? 29 : u[f]);
	}
	function f(r, s) {
		if (r && s) return r > s ? 1 : r < s ? -1 : 0;
	}
	var p = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
	function m(r) {
		return function(s) {
			let c = p.exec(s);
			if (!c) return !1;
			let l = +c[1], u = +c[2], d = +c[3], f = c[4], m = c[5] === "-" ? -1 : 1, h = +(c[6] || 0), g = +(c[7] || 0);
			if (h > 23 || g > 59 || r && !f) return !1;
			if (l <= 23 && u <= 59 && d < 60) return !0;
			let _ = u - g * m, v = l - h * m - (_ < 0 ? 1 : 0);
			return (v === 23 || v === -1) && (_ === 59 || _ === -1) && d < 61;
		};
	}
	function h(r, s) {
		if (!(r && s)) return;
		let c = (/* @__PURE__ */ new Date("2020-01-01T" + r)).valueOf(), l = (/* @__PURE__ */ new Date("2020-01-01T" + s)).valueOf();
		if (c && l) return c - l;
	}
	function g(r, s) {
		if (!(r && s)) return;
		let c = p.exec(r), l = p.exec(s);
		if (c && l) return r = c[1] + c[2] + c[3], s = l[1] + l[2] + l[3], r > s ? 1 : r < s ? -1 : 0;
	}
	var _ = /t|\s/i;
	function v(r) {
		let s = m(r);
		return function(r) {
			let c = r.split(_);
			return c.length === 2 && d(c[0]) && s(c[1]);
		};
	}
	function y(r, s) {
		if (!(r && s)) return;
		let c = new Date(r).valueOf(), l = new Date(s).valueOf();
		if (c && l) return c - l;
	}
	function b(r, s) {
		if (!(r && s)) return;
		let [c, l] = r.split(_), [u, d] = s.split(_), p = f(c, u);
		if (p !== void 0) return p || h(l, d);
	}
	var x = /\/|:/, S = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
	function C(r) {
		return x.test(r) && S.test(r);
	}
	var w = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
	function T(r) {
		return w.lastIndex = 0, w.test(r);
	}
	var E = -(2 ** 31), D = 2 ** 31 - 1;
	function O(r) {
		return Number.isInteger(r) && r <= D && r >= E;
	}
	function k(r) {
		return Number.isInteger(r);
	}
	function A() {
		return !0;
	}
	var j = /[^\\]\\Z/;
	function M(r) {
		if (j.test(r)) return !1;
		try {
			return new RegExp(r), !0;
		} catch {
			return !1;
		}
	}
})), require_code$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.regexpCode = r.getEsmExportName = r.getProperty = r.safeStringify = r.stringify = r.strConcat = r.addCodeArg = r.str = r._ = r.nil = r._Code = r.Name = r.IDENTIFIER = r._CodeOrName = void 0;
	var s = class {};
	r._CodeOrName = s, r.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
	var c = class extends s {
		constructor(s) {
			if (super(), !r.IDENTIFIER.test(s)) throw Error("CodeGen: name must be a valid identifier");
			this.str = s;
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
	};
	r.Name = c;
	var l = class extends s {
		constructor(r) {
			super(), this._items = typeof r == "string" ? [r] : r;
		}
		toString() {
			return this.str;
		}
		emptyStr() {
			if (this._items.length > 1) return !1;
			let r = this._items[0];
			return r === "" || r === "\"\"";
		}
		get str() {
			return this._str ??= this._items.reduce((r, s) => `${r}${s}`, "");
		}
		get names() {
			return this._names ??= this._items.reduce((r, s) => (s instanceof c && (r[s.str] = (r[s.str] || 0) + 1), r), {});
		}
	};
	r._Code = l, r.nil = new l("");
	function u(r, ...s) {
		let c = [r[0]], u = 0;
		for (; u < s.length;) p(c, s[u]), c.push(r[++u]);
		return new l(c);
	}
	r._ = u;
	var d = new l("+");
	function f(r, ...s) {
		let c = [y(r[0])], u = 0;
		for (; u < s.length;) c.push(d), p(c, s[u]), c.push(d, y(r[++u]));
		return m(c), new l(c);
	}
	r.str = f;
	function p(r, s) {
		s instanceof l ? r.push(...s._items) : s instanceof c ? r.push(s) : r.push(_(s));
	}
	r.addCodeArg = p;
	function m(r) {
		let s = 1;
		for (; s < r.length - 1;) {
			if (r[s] === d) {
				let c = h(r[s - 1], r[s + 1]);
				if (c !== void 0) {
					r.splice(s - 1, 3, c);
					continue;
				}
				r[s++] = "+";
			}
			s++;
		}
	}
	function h(r, s) {
		if (s === "\"\"") return r;
		if (r === "\"\"") return s;
		if (typeof r == "string") return s instanceof c || r[r.length - 1] !== "\"" ? void 0 : typeof s == "string" ? s[0] === "\"" ? r.slice(0, -1) + s.slice(1) : void 0 : `${r.slice(0, -1)}${s}"`;
		if (typeof s == "string" && s[0] === "\"" && !(r instanceof c)) return `"${r}${s.slice(1)}`;
	}
	function g(r, s) {
		return s.emptyStr() ? r : r.emptyStr() ? s : f`${r}${s}`;
	}
	r.strConcat = g;
	function _(r) {
		return typeof r == "number" || typeof r == "boolean" || r === null ? r : y(Array.isArray(r) ? r.join(",") : r);
	}
	function v(r) {
		return new l(y(r));
	}
	r.stringify = v;
	function y(r) {
		return JSON.stringify(r).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
	}
	r.safeStringify = y;
	function b(s) {
		return typeof s == "string" && r.IDENTIFIER.test(s) ? new l(`.${s}`) : u`[${s}]`;
	}
	r.getProperty = b;
	function x(s) {
		if (typeof s == "string" && r.IDENTIFIER.test(s)) return new l(`${s}`);
		throw Error(`CodeGen: invalid export name: ${s}, use explicit $id name mapping`);
	}
	r.getEsmExportName = x;
	function S(r) {
		return new l(r.toString());
	}
	r.regexpCode = S;
})), require_scope = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.ValueScope = r.ValueScopeName = r.Scope = r.varKinds = r.UsedValueState = void 0;
	var s = require_code$1(), c = class extends Error {
		constructor(r) {
			super(`CodeGen: "code" for ${r} not defined`), this.value = r.value;
		}
	}, l;
	(function(r) {
		r[r.Started = 0] = "Started", r[r.Completed = 1] = "Completed";
	})(l || (r.UsedValueState = l = {})), r.varKinds = {
		const: new s.Name("const"),
		let: new s.Name("let"),
		var: new s.Name("var")
	};
	var u = class {
		constructor({ prefixes: r, parent: s } = {}) {
			this._names = {}, this._prefixes = r, this._parent = s;
		}
		toName(r) {
			return r instanceof s.Name ? r : this.name(r);
		}
		name(r) {
			return new s.Name(this._newName(r));
		}
		_newName(r) {
			let s = this._names[r] || this._nameGroup(r);
			return `${r}${s.index++}`;
		}
		_nameGroup(r) {
			if ((this._parent?._prefixes)?.has(r) || this._prefixes && !this._prefixes.has(r)) throw Error(`CodeGen: prefix "${r}" is not allowed in this scope`);
			return this._names[r] = {
				prefix: r,
				index: 0
			};
		}
	};
	r.Scope = u;
	var d = class extends s.Name {
		constructor(r, s) {
			super(s), this.prefix = r;
		}
		setValue(r, { property: c, itemIndex: l }) {
			this.value = r, this.scopePath = (0, s._)`.${new s.Name(c)}[${l}]`;
		}
	};
	r.ValueScopeName = d;
	var f = (0, s._)`\n`;
	r.ValueScope = class extends u {
		constructor(r) {
			super(r), this._values = {}, this._scope = r.scope, this.opts = {
				...r,
				_n: r.lines ? f : s.nil
			};
		}
		get() {
			return this._scope;
		}
		name(r) {
			return new d(r, this._newName(r));
		}
		value(r, s) {
			if (s.ref === void 0) throw Error("CodeGen: ref must be passed in value");
			let c = this.toName(r), { prefix: l } = c, u = s.key ?? s.ref, d = this._values[l];
			if (d) {
				let r = d.get(u);
				if (r) return r;
			} else d = this._values[l] = /* @__PURE__ */ new Map();
			d.set(u, c);
			let f = this._scope[l] || (this._scope[l] = []), p = f.length;
			return f[p] = s.ref, c.setValue(s, {
				property: l,
				itemIndex: p
			}), c;
		}
		getValue(r, s) {
			let c = this._values[r];
			if (c) return c.get(s);
		}
		scopeRefs(r, c = this._values) {
			return this._reduceValues(c, (c) => {
				if (c.scopePath === void 0) throw Error(`CodeGen: name "${c}" has no value`);
				return (0, s._)`${r}${c.scopePath}`;
			});
		}
		scopeCode(r = this._values, s, c) {
			return this._reduceValues(r, (r) => {
				if (r.value === void 0) throw Error(`CodeGen: name "${r}" has no value`);
				return r.value.code;
			}, s, c);
		}
		_reduceValues(u, d, f = {}, p) {
			let m = s.nil;
			for (let h in u) {
				let g = u[h];
				if (!g) continue;
				let _ = f[h] = f[h] || /* @__PURE__ */ new Map();
				g.forEach((u) => {
					if (_.has(u)) return;
					_.set(u, l.Started);
					let f = d(u);
					if (f) {
						let c = this.opts.es5 ? r.varKinds.var : r.varKinds.const;
						m = (0, s._)`${m}${c} ${u} = ${f};${this.opts._n}`;
					} else if (f = p?.(u)) m = (0, s._)`${m}${f}${this.opts._n}`;
					else throw new c(u);
					_.set(u, l.Completed);
				});
			}
			return m;
		}
	};
})), require_codegen = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.or = r.and = r.not = r.CodeGen = r.operators = r.varKinds = r.ValueScopeName = r.ValueScope = r.Scope = r.Name = r.regexpCode = r.stringify = r.getProperty = r.nil = r.strConcat = r.str = r._ = void 0;
	var s = require_code$1(), c = require_scope(), l = require_code$1();
	Object.defineProperty(r, "_", {
		enumerable: !0,
		get: function() {
			return l._;
		}
	}), Object.defineProperty(r, "str", {
		enumerable: !0,
		get: function() {
			return l.str;
		}
	}), Object.defineProperty(r, "strConcat", {
		enumerable: !0,
		get: function() {
			return l.strConcat;
		}
	}), Object.defineProperty(r, "nil", {
		enumerable: !0,
		get: function() {
			return l.nil;
		}
	}), Object.defineProperty(r, "getProperty", {
		enumerable: !0,
		get: function() {
			return l.getProperty;
		}
	}), Object.defineProperty(r, "stringify", {
		enumerable: !0,
		get: function() {
			return l.stringify;
		}
	}), Object.defineProperty(r, "regexpCode", {
		enumerable: !0,
		get: function() {
			return l.regexpCode;
		}
	}), Object.defineProperty(r, "Name", {
		enumerable: !0,
		get: function() {
			return l.Name;
		}
	});
	var u = require_scope();
	Object.defineProperty(r, "Scope", {
		enumerable: !0,
		get: function() {
			return u.Scope;
		}
	}), Object.defineProperty(r, "ValueScope", {
		enumerable: !0,
		get: function() {
			return u.ValueScope;
		}
	}), Object.defineProperty(r, "ValueScopeName", {
		enumerable: !0,
		get: function() {
			return u.ValueScopeName;
		}
	}), Object.defineProperty(r, "varKinds", {
		enumerable: !0,
		get: function() {
			return u.varKinds;
		}
	}), r.operators = {
		GT: new s._Code(">"),
		GTE: new s._Code(">="),
		LT: new s._Code("<"),
		LTE: new s._Code("<="),
		EQ: new s._Code("==="),
		NEQ: new s._Code("!=="),
		NOT: new s._Code("!"),
		OR: new s._Code("||"),
		AND: new s._Code("&&"),
		ADD: new s._Code("+")
	};
	var d = class {
		optimizeNodes() {
			return this;
		}
		optimizeNames(r, s) {
			return this;
		}
	}, f = class extends d {
		constructor(r, s, c) {
			super(), this.varKind = r, this.name = s, this.rhs = c;
		}
		render({ es5: r, _n: s }) {
			let l = r ? c.varKinds.var : this.varKind, u = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
			return `${l} ${this.name}${u};` + s;
		}
		optimizeNames(r, s) {
			if (r[this.name.str]) return this.rhs &&= F(this.rhs, r, s), this;
		}
		get names() {
			return this.rhs instanceof s._CodeOrName ? this.rhs.names : {};
		}
	}, p = class extends d {
		constructor(r, s, c) {
			super(), this.lhs = r, this.rhs = s, this.sideEffects = c;
		}
		render({ _n: r }) {
			return `${this.lhs} = ${this.rhs};` + r;
		}
		optimizeNames(r, c) {
			if (!(this.lhs instanceof s.Name && !r[this.lhs.str] && !this.sideEffects)) return this.rhs = F(this.rhs, r, c), this;
		}
		get names() {
			return P(this.lhs instanceof s.Name ? {} : { ...this.lhs.names }, this.rhs);
		}
	}, m = class extends p {
		constructor(r, s, c, l) {
			super(r, c, l), this.op = s;
		}
		render({ _n: r }) {
			return `${this.lhs} ${this.op}= ${this.rhs};` + r;
		}
	}, h = class extends d {
		constructor(r) {
			super(), this.label = r, this.names = {};
		}
		render({ _n: r }) {
			return `${this.label}:` + r;
		}
	}, g = class extends d {
		constructor(r) {
			super(), this.label = r, this.names = {};
		}
		render({ _n: r }) {
			return `break${this.label ? ` ${this.label}` : ""};` + r;
		}
	}, _ = class extends d {
		constructor(r) {
			super(), this.error = r;
		}
		render({ _n: r }) {
			return `throw ${this.error};` + r;
		}
		get names() {
			return this.error.names;
		}
	}, v = class extends d {
		constructor(r) {
			super(), this.code = r;
		}
		render({ _n: r }) {
			return `${this.code};` + r;
		}
		optimizeNodes() {
			return `${this.code}` ? this : void 0;
		}
		optimizeNames(r, s) {
			return this.code = F(this.code, r, s), this;
		}
		get names() {
			return this.code instanceof s._CodeOrName ? this.code.names : {};
		}
	}, y = class extends d {
		constructor(r = []) {
			super(), this.nodes = r;
		}
		render(r) {
			return this.nodes.reduce((s, c) => s + c.render(r), "");
		}
		optimizeNodes() {
			let { nodes: r } = this, s = r.length;
			for (; s--;) {
				let c = r[s].optimizeNodes();
				Array.isArray(c) ? r.splice(s, 1, ...c) : c ? r[s] = c : r.splice(s, 1);
			}
			return r.length > 0 ? this : void 0;
		}
		optimizeNames(r, s) {
			let { nodes: c } = this, l = c.length;
			for (; l--;) {
				let u = c[l];
				u.optimizeNames(r, s) || (I(r, u.names), c.splice(l, 1));
			}
			return c.length > 0 ? this : void 0;
		}
		get names() {
			return this.nodes.reduce((r, s) => N(r, s.names), {});
		}
	}, b = class extends y {
		render(r) {
			return "{" + r._n + super.render(r) + "}" + r._n;
		}
	}, x = class extends y {}, S = class extends b {};
	S.kind = "else";
	var C = class r extends b {
		constructor(r, s) {
			super(s), this.condition = r;
		}
		render(r) {
			let s = `if(${this.condition})` + super.render(r);
			return this.else && (s += "else " + this.else.render(r)), s;
		}
		optimizeNodes() {
			super.optimizeNodes();
			let s = this.condition;
			if (s === !0) return this.nodes;
			let c = this.else;
			if (c) {
				let r = c.optimizeNodes();
				c = this.else = Array.isArray(r) ? new S(r) : r;
			}
			if (c) return s === !1 ? c instanceof r ? c : c.nodes : this.nodes.length ? this : new r(L(s), c instanceof r ? [c] : c.nodes);
			if (!(s === !1 || !this.nodes.length)) return this;
		}
		optimizeNames(r, s) {
			if (this.else = this.else?.optimizeNames(r, s), super.optimizeNames(r, s) || this.else) return this.condition = F(this.condition, r, s), this;
		}
		get names() {
			let r = super.names;
			return P(r, this.condition), this.else && N(r, this.else.names), r;
		}
	};
	C.kind = "if";
	var w = class extends b {};
	w.kind = "for";
	var T = class extends w {
		constructor(r) {
			super(), this.iteration = r;
		}
		render(r) {
			return `for(${this.iteration})` + super.render(r);
		}
		optimizeNames(r, s) {
			if (super.optimizeNames(r, s)) return this.iteration = F(this.iteration, r, s), this;
		}
		get names() {
			return N(super.names, this.iteration.names);
		}
	}, E = class extends w {
		constructor(r, s, c, l) {
			super(), this.varKind = r, this.name = s, this.from = c, this.to = l;
		}
		render(r) {
			let s = r.es5 ? c.varKinds.var : this.varKind, { name: l, from: u, to: d } = this;
			return `for(${s} ${l}=${u}; ${l}<${d}; ${l}++)` + super.render(r);
		}
		get names() {
			return P(P(super.names, this.from), this.to);
		}
	}, D = class extends w {
		constructor(r, s, c, l) {
			super(), this.loop = r, this.varKind = s, this.name = c, this.iterable = l;
		}
		render(r) {
			return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(r);
		}
		optimizeNames(r, s) {
			if (super.optimizeNames(r, s)) return this.iterable = F(this.iterable, r, s), this;
		}
		get names() {
			return N(super.names, this.iterable.names);
		}
	}, O = class extends b {
		constructor(r, s, c) {
			super(), this.name = r, this.args = s, this.async = c;
		}
		render(r) {
			return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(r);
		}
	};
	O.kind = "func";
	var k = class extends y {
		render(r) {
			return "return " + super.render(r);
		}
	};
	k.kind = "return";
	var A = class extends b {
		render(r) {
			let s = "try" + super.render(r);
			return this.catch && (s += this.catch.render(r)), this.finally && (s += this.finally.render(r)), s;
		}
		optimizeNodes() {
			var r, s;
			return super.optimizeNodes(), (r = this.catch) == null || r.optimizeNodes(), (s = this.finally) == null || s.optimizeNodes(), this;
		}
		optimizeNames(r, s) {
			var c, l;
			return super.optimizeNames(r, s), (c = this.catch) == null || c.optimizeNames(r, s), (l = this.finally) == null || l.optimizeNames(r, s), this;
		}
		get names() {
			let r = super.names;
			return this.catch && N(r, this.catch.names), this.finally && N(r, this.finally.names), r;
		}
	}, j = class extends b {
		constructor(r) {
			super(), this.error = r;
		}
		render(r) {
			return `catch(${this.error})` + super.render(r);
		}
	};
	j.kind = "catch";
	var M = class extends b {
		render(r) {
			return "finally" + super.render(r);
		}
	};
	M.kind = "finally", r.CodeGen = class {
		constructor(r, s = {}) {
			this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = {
				...s,
				_n: s.lines ? "\n" : ""
			}, this._extScope = r, this._scope = new c.Scope({ parent: r }), this._nodes = [new x()];
		}
		toString() {
			return this._root.render(this.opts);
		}
		name(r) {
			return this._scope.name(r);
		}
		scopeName(r) {
			return this._extScope.name(r);
		}
		scopeValue(r, s) {
			let c = this._extScope.value(r, s);
			return (this._values[c.prefix] || (this._values[c.prefix] = /* @__PURE__ */ new Set())).add(c), c;
		}
		getScopeValue(r, s) {
			return this._extScope.getValue(r, s);
		}
		scopeRefs(r) {
			return this._extScope.scopeRefs(r, this._values);
		}
		scopeCode() {
			return this._extScope.scopeCode(this._values);
		}
		_def(r, s, c, l) {
			let u = this._scope.toName(s);
			return c !== void 0 && l && (this._constants[u.str] = c), this._leafNode(new f(r, u, c)), u;
		}
		const(r, s, l) {
			return this._def(c.varKinds.const, r, s, l);
		}
		let(r, s, l) {
			return this._def(c.varKinds.let, r, s, l);
		}
		var(r, s, l) {
			return this._def(c.varKinds.var, r, s, l);
		}
		assign(r, s, c) {
			return this._leafNode(new p(r, s, c));
		}
		add(s, c) {
			return this._leafNode(new m(s, r.operators.ADD, c));
		}
		code(r) {
			return typeof r == "function" ? r() : r !== s.nil && this._leafNode(new v(r)), this;
		}
		object(...r) {
			let c = ["{"];
			for (let [l, u] of r) c.length > 1 && c.push(","), c.push(l), (l !== u || this.opts.es5) && (c.push(":"), (0, s.addCodeArg)(c, u));
			return c.push("}"), new s._Code(c);
		}
		if(r, s, c) {
			if (this._blockNode(new C(r)), s && c) this.code(s).else().code(c).endIf();
			else if (s) this.code(s).endIf();
			else if (c) throw Error("CodeGen: \"else\" body without \"then\" body");
			return this;
		}
		elseIf(r) {
			return this._elseNode(new C(r));
		}
		else() {
			return this._elseNode(new S());
		}
		endIf() {
			return this._endBlockNode(C, S);
		}
		_for(r, s) {
			return this._blockNode(r), s && this.code(s).endFor(), this;
		}
		for(r, s) {
			return this._for(new T(r), s);
		}
		forRange(r, s, l, u, d = this.opts.es5 ? c.varKinds.var : c.varKinds.let) {
			let f = this._scope.toName(r);
			return this._for(new E(d, f, s, l), () => u(f));
		}
		forOf(r, l, u, d = c.varKinds.const) {
			let f = this._scope.toName(r);
			if (this.opts.es5) {
				let r = l instanceof s.Name ? l : this.var("_arr", l);
				return this.forRange("_i", 0, (0, s._)`${r}.length`, (c) => {
					this.var(f, (0, s._)`${r}[${c}]`), u(f);
				});
			}
			return this._for(new D("of", d, f, l), () => u(f));
		}
		forIn(r, l, u, d = this.opts.es5 ? c.varKinds.var : c.varKinds.const) {
			if (this.opts.ownProperties) return this.forOf(r, (0, s._)`Object.keys(${l})`, u);
			let f = this._scope.toName(r);
			return this._for(new D("in", d, f, l), () => u(f));
		}
		endFor() {
			return this._endBlockNode(w);
		}
		label(r) {
			return this._leafNode(new h(r));
		}
		break(r) {
			return this._leafNode(new g(r));
		}
		return(r) {
			let s = new k();
			if (this._blockNode(s), this.code(r), s.nodes.length !== 1) throw Error("CodeGen: \"return\" should have one node");
			return this._endBlockNode(k);
		}
		try(r, s, c) {
			if (!s && !c) throw Error("CodeGen: \"try\" without \"catch\" and \"finally\"");
			let l = new A();
			if (this._blockNode(l), this.code(r), s) {
				let r = this.name("e");
				this._currNode = l.catch = new j(r), s(r);
			}
			return c && (this._currNode = l.finally = new M(), this.code(c)), this._endBlockNode(j, M);
		}
		throw(r) {
			return this._leafNode(new _(r));
		}
		block(r, s) {
			return this._blockStarts.push(this._nodes.length), r && this.code(r).endBlock(s), this;
		}
		endBlock(r) {
			let s = this._blockStarts.pop();
			if (s === void 0) throw Error("CodeGen: not in self-balancing block");
			let c = this._nodes.length - s;
			if (c < 0 || r !== void 0 && c !== r) throw Error(`CodeGen: wrong number of nodes: ${c} vs ${r} expected`);
			return this._nodes.length = s, this;
		}
		func(r, c = s.nil, l, u) {
			return this._blockNode(new O(r, c, l)), u && this.code(u).endFunc(), this;
		}
		endFunc() {
			return this._endBlockNode(O);
		}
		optimize(r = 1) {
			for (; r-- > 0;) this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
		}
		_leafNode(r) {
			return this._currNode.nodes.push(r), this;
		}
		_blockNode(r) {
			this._currNode.nodes.push(r), this._nodes.push(r);
		}
		_endBlockNode(r, s) {
			let c = this._currNode;
			if (c instanceof r || s && c instanceof s) return this._nodes.pop(), this;
			throw Error(`CodeGen: not in block "${s ? `${r.kind}/${s.kind}` : r.kind}"`);
		}
		_elseNode(r) {
			let s = this._currNode;
			if (!(s instanceof C)) throw Error("CodeGen: \"else\" without \"if\"");
			return this._currNode = s.else = r, this;
		}
		get _root() {
			return this._nodes[0];
		}
		get _currNode() {
			let r = this._nodes;
			return r[r.length - 1];
		}
		set _currNode(r) {
			let s = this._nodes;
			s[s.length - 1] = r;
		}
	};
	function N(r, s) {
		for (let c in s) r[c] = (r[c] || 0) + (s[c] || 0);
		return r;
	}
	function P(r, c) {
		return c instanceof s._CodeOrName ? N(r, c.names) : r;
	}
	function F(r, c, l) {
		if (r instanceof s.Name) return u(r);
		if (!d(r)) return r;
		return new s._Code(r._items.reduce((r, c) => (c instanceof s.Name && (c = u(c)), c instanceof s._Code ? r.push(...c._items) : r.push(c), r), []));
		function u(r) {
			let s = l[r.str];
			return s === void 0 || c[r.str] !== 1 ? r : (delete c[r.str], s);
		}
		function d(r) {
			return r instanceof s._Code && r._items.some((r) => r instanceof s.Name && c[r.str] === 1 && l[r.str] !== void 0);
		}
	}
	function I(r, s) {
		for (let c in s) r[c] = (r[c] || 0) - (s[c] || 0);
	}
	function L(r) {
		return typeof r == "boolean" || typeof r == "number" || r === null ? !r : (0, s._)`!${U(r)}`;
	}
	r.not = L;
	var R = H(r.operators.AND);
	function z(...r) {
		return r.reduce(R);
	}
	r.and = z;
	var B = H(r.operators.OR);
	function V(...r) {
		return r.reduce(B);
	}
	r.or = V;
	function H(r) {
		return (c, l) => c === s.nil ? l : l === s.nil ? c : (0, s._)`${U(c)} ${r} ${U(l)}`;
	}
	function U(r) {
		return r instanceof s.Name ? r : (0, s._)`(${r})`;
	}
})), require_util$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.checkStrictMode = r.getErrorPath = r.Type = r.useFunc = r.setEvaluated = r.evaluatedPropsToName = r.mergeEvaluated = r.eachItem = r.unescapeJsonPointer = r.escapeJsonPointer = r.escapeFragment = r.unescapeFragment = r.schemaRefOrVal = r.schemaHasRulesButRef = r.schemaHasRules = r.checkUnknownRules = r.alwaysValidSchema = r.toHash = void 0;
	var s = require_codegen(), c = require_code$1();
	function l(r) {
		let s = {};
		for (let c of r) s[c] = !0;
		return s;
	}
	r.toHash = l;
	function u(r, s) {
		return typeof s == "boolean" ? s : Object.keys(s).length === 0 ? !0 : (d(r, s), !f(s, r.self.RULES.all));
	}
	r.alwaysValidSchema = u;
	function d(r, s = r.schema) {
		let { opts: c, self: l } = r;
		if (!c.strictSchema || typeof s == "boolean") return;
		let u = l.RULES.keywords;
		for (let c in s) u[c] || D(r, `unknown keyword: "${c}"`);
	}
	r.checkUnknownRules = d;
	function f(r, s) {
		if (typeof r == "boolean") return !r;
		for (let c in r) if (s[c]) return !0;
		return !1;
	}
	r.schemaHasRules = f;
	function p(r, s) {
		if (typeof r == "boolean") return !r;
		for (let c in r) if (c !== "$ref" && s.all[c]) return !0;
		return !1;
	}
	r.schemaHasRulesButRef = p;
	function m({ topSchemaRef: r, schemaPath: c }, l, u, d) {
		if (!d) {
			if (typeof l == "number" || typeof l == "boolean") return l;
			if (typeof l == "string") return (0, s._)`${l}`;
		}
		return (0, s._)`${r}${c}${(0, s.getProperty)(u)}`;
	}
	r.schemaRefOrVal = m;
	function h(r) {
		return v(decodeURIComponent(r));
	}
	r.unescapeFragment = h;
	function g(r) {
		return encodeURIComponent(_(r));
	}
	r.escapeFragment = g;
	function _(r) {
		return typeof r == "number" ? `${r}` : r.replace(/~/g, "~0").replace(/\//g, "~1");
	}
	r.escapeJsonPointer = _;
	function v(r) {
		return r.replace(/~1/g, "/").replace(/~0/g, "~");
	}
	r.unescapeJsonPointer = v;
	function y(r, s) {
		if (Array.isArray(r)) for (let c of r) s(c);
		else s(r);
	}
	r.eachItem = y;
	function b({ mergeNames: r, mergeToName: c, mergeValues: l, resultToName: u }) {
		return (d, f, p, m) => {
			let h = p === void 0 ? f : p instanceof s.Name ? (f instanceof s.Name ? r(d, f, p) : c(d, f, p), p) : f instanceof s.Name ? (c(d, p, f), f) : l(f, p);
			return m === s.Name && !(h instanceof s.Name) ? u(d, h) : h;
		};
	}
	r.mergeEvaluated = {
		props: b({
			mergeNames: (r, c, l) => r.if((0, s._)`${l} !== true && ${c} !== undefined`, () => {
				r.if((0, s._)`${c} === true`, () => r.assign(l, !0), () => r.assign(l, (0, s._)`${l} || {}`).code((0, s._)`Object.assign(${l}, ${c})`));
			}),
			mergeToName: (r, c, l) => r.if((0, s._)`${l} !== true`, () => {
				c === !0 ? r.assign(l, !0) : (r.assign(l, (0, s._)`${l} || {}`), S(r, l, c));
			}),
			mergeValues: (r, s) => r === !0 ? !0 : {
				...r,
				...s
			},
			resultToName: x
		}),
		items: b({
			mergeNames: (r, c, l) => r.if((0, s._)`${l} !== true && ${c} !== undefined`, () => r.assign(l, (0, s._)`${c} === true ? true : ${l} > ${c} ? ${l} : ${c}`)),
			mergeToName: (r, c, l) => r.if((0, s._)`${l} !== true`, () => r.assign(l, c === !0 ? !0 : (0, s._)`${l} > ${c} ? ${l} : ${c}`)),
			mergeValues: (r, s) => r === !0 ? !0 : Math.max(r, s),
			resultToName: (r, s) => r.var("items", s)
		})
	};
	function x(r, c) {
		if (c === !0) return r.var("props", !0);
		let l = r.var("props", (0, s._)`{}`);
		return c !== void 0 && S(r, l, c), l;
	}
	r.evaluatedPropsToName = x;
	function S(r, c, l) {
		Object.keys(l).forEach((l) => r.assign((0, s._)`${c}${(0, s.getProperty)(l)}`, !0));
	}
	r.setEvaluated = S;
	var C = {};
	function w(r, s) {
		return r.scopeValue("func", {
			ref: s,
			code: C[s.code] || (C[s.code] = new c._Code(s.code))
		});
	}
	r.useFunc = w;
	var T;
	(function(r) {
		r[r.Num = 0] = "Num", r[r.Str = 1] = "Str";
	})(T || (r.Type = T = {}));
	function E(r, c, l) {
		if (r instanceof s.Name) {
			let u = c === T.Num;
			return l ? u ? (0, s._)`"[" + ${r} + "]"` : (0, s._)`"['" + ${r} + "']"` : u ? (0, s._)`"/" + ${r}` : (0, s._)`"/" + ${r}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
		}
		return l ? (0, s.getProperty)(r).toString() : "/" + _(r);
	}
	r.getErrorPath = E;
	function D(r, s, c = r.opts.strictSchema) {
		if (c) {
			if (s = `strict mode: ${s}`, c === !0) throw Error(s);
			r.self.logger.warn(s);
		}
	}
	r.checkStrictMode = D;
})), require_names = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_codegen();
	r.default = {
		data: new s.Name("data"),
		valCxt: new s.Name("valCxt"),
		instancePath: new s.Name("instancePath"),
		parentData: new s.Name("parentData"),
		parentDataProperty: new s.Name("parentDataProperty"),
		rootData: new s.Name("rootData"),
		dynamicAnchors: new s.Name("dynamicAnchors"),
		vErrors: new s.Name("vErrors"),
		errors: new s.Name("errors"),
		this: new s.Name("this"),
		self: new s.Name("self"),
		scope: new s.Name("scope"),
		json: new s.Name("json"),
		jsonPos: new s.Name("jsonPos"),
		jsonLen: new s.Name("jsonLen"),
		jsonPart: new s.Name("jsonPart")
	};
})), require_errors$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.extendErrors = r.resetErrorsCount = r.reportExtraError = r.reportError = r.keyword$DataError = r.keywordError = void 0;
	var s = require_codegen(), c = require_util$1(), l = require_names();
	r.keywordError = { message: ({ keyword: r }) => (0, s.str)`must pass "${r}" keyword validation` }, r.keyword$DataError = { message: ({ keyword: r, schemaType: c }) => c ? (0, s.str)`"${r}" keyword must be ${c} ($data)` : (0, s.str)`"${r}" keyword is invalid ($data)` };
	function u(c, l = r.keywordError, u, d) {
		let { it: f } = c, { gen: p, compositeRule: g, allErrors: v } = f, y = _(c, l, u);
		d ?? (g || v) ? m(p, y) : h(f, (0, s._)`[${y}]`);
	}
	r.reportError = u;
	function d(s, c = r.keywordError, u) {
		let { it: d } = s, { gen: f, compositeRule: p, allErrors: g } = d;
		m(f, _(s, c, u)), p || g || h(d, l.default.vErrors);
	}
	r.reportExtraError = d;
	function f(r, c) {
		r.assign(l.default.errors, c), r.if((0, s._)`${l.default.vErrors} !== null`, () => r.if(c, () => r.assign((0, s._)`${l.default.vErrors}.length`, c), () => r.assign(l.default.vErrors, null)));
	}
	r.resetErrorsCount = f;
	function p({ gen: r, keyword: c, schemaValue: u, data: d, errsCount: f, it: p }) {
		/* istanbul ignore if */
		if (f === void 0) throw Error("ajv implementation error");
		let m = r.name("err");
		r.forRange("i", f, l.default.errors, (f) => {
			r.const(m, (0, s._)`${l.default.vErrors}[${f}]`), r.if((0, s._)`${m}.instancePath === undefined`, () => r.assign((0, s._)`${m}.instancePath`, (0, s.strConcat)(l.default.instancePath, p.errorPath))), r.assign((0, s._)`${m}.schemaPath`, (0, s.str)`${p.errSchemaPath}/${c}`), p.opts.verbose && (r.assign((0, s._)`${m}.schema`, u), r.assign((0, s._)`${m}.data`, d));
		});
	}
	r.extendErrors = p;
	function m(r, c) {
		let u = r.const("err", c);
		r.if((0, s._)`${l.default.vErrors} === null`, () => r.assign(l.default.vErrors, (0, s._)`[${u}]`), (0, s._)`${l.default.vErrors}.push(${u})`), r.code((0, s._)`${l.default.errors}++`);
	}
	function h(r, c) {
		let { gen: l, validateName: u, schemaEnv: d } = r;
		d.$async ? l.throw((0, s._)`new ${r.ValidationError}(${c})`) : (l.assign((0, s._)`${u}.errors`, c), l.return(!1));
	}
	var g = {
		keyword: new s.Name("keyword"),
		schemaPath: new s.Name("schemaPath"),
		params: new s.Name("params"),
		propertyName: new s.Name("propertyName"),
		message: new s.Name("message"),
		schema: new s.Name("schema"),
		parentSchema: new s.Name("parentSchema")
	};
	function _(r, c, l) {
		let { createErrors: u } = r.it;
		return u === !1 ? (0, s._)`{}` : v(r, c, l);
	}
	function v(r, s, c = {}) {
		let { gen: l, it: u } = r, d = [y(u, c), b(r, c)];
		return x(r, s, d), l.object(...d);
	}
	function y({ errorPath: r }, { instancePath: u }) {
		let d = u ? (0, s.str)`${r}${(0, c.getErrorPath)(u, c.Type.Str)}` : r;
		return [l.default.instancePath, (0, s.strConcat)(l.default.instancePath, d)];
	}
	function b({ keyword: r, it: { errSchemaPath: l } }, { schemaPath: u, parentSchema: d }) {
		let f = d ? l : (0, s.str)`${l}/${r}`;
		return u && (f = (0, s.str)`${f}${(0, c.getErrorPath)(u, c.Type.Str)}`), [g.schemaPath, f];
	}
	function x(r, { params: c, message: u }, d) {
		let { keyword: f, data: p, schemaValue: m, it: h } = r, { opts: _, propertyName: v, topSchemaRef: y, schemaPath: b } = h;
		d.push([g.keyword, f], [g.params, typeof c == "function" ? c(r) : c || (0, s._)`{}`]), _.messages && d.push([g.message, typeof u == "function" ? u(r) : u]), _.verbose && d.push([g.schema, m], [g.parentSchema, (0, s._)`${y}${b}`], [l.default.data, p]), v && d.push([g.propertyName, v]);
	}
})), require_boolSchema = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.boolOrEmptySchema = r.topBoolOrEmptySchema = void 0;
	var s = require_errors$1(), c = require_codegen(), l = require_names(), u = { message: "boolean schema is false" };
	function d(r) {
		let { gen: s, schema: u, validateName: d } = r;
		u === !1 ? p(r, !1) : typeof u == "object" && u.$async === !0 ? s.return(l.default.data) : (s.assign((0, c._)`${d}.errors`, null), s.return(!0));
	}
	r.topBoolOrEmptySchema = d;
	function f(r, s) {
		let { gen: c, schema: l } = r;
		l === !1 ? (c.var(s, !1), p(r)) : c.var(s, !0);
	}
	r.boolOrEmptySchema = f;
	function p(r, c) {
		let { gen: l, data: d } = r, f = {
			gen: l,
			keyword: "false schema",
			data: d,
			schema: !1,
			schemaCode: !1,
			schemaValue: !1,
			params: {},
			it: r
		};
		(0, s.reportError)(f, u, void 0, c);
	}
})), require_rules = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.getRules = r.isJSONType = void 0;
	var s = new Set([
		"string",
		"number",
		"integer",
		"boolean",
		"null",
		"object",
		"array"
	]);
	function c(r) {
		return typeof r == "string" && s.has(r);
	}
	r.isJSONType = c;
	function l() {
		let r = {
			number: {
				type: "number",
				rules: []
			},
			string: {
				type: "string",
				rules: []
			},
			array: {
				type: "array",
				rules: []
			},
			object: {
				type: "object",
				rules: []
			}
		};
		return {
			types: {
				...r,
				integer: !0,
				boolean: !0,
				null: !0
			},
			rules: [
				{ rules: [] },
				r.number,
				r.string,
				r.array,
				r.object
			],
			post: { rules: [] },
			all: {},
			keywords: {}
		};
	}
	r.getRules = l;
})), require_applicability = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.shouldUseRule = r.shouldUseGroup = r.schemaHasRulesForType = void 0;
	function s({ schema: r, self: s }, l) {
		let u = s.RULES.types[l];
		return u && u !== !0 && c(r, u);
	}
	r.schemaHasRulesForType = s;
	function c(r, s) {
		return s.rules.some((s) => l(r, s));
	}
	r.shouldUseGroup = c;
	function l(r, s) {
		return r[s.keyword] !== void 0 || s.definition.implements?.some((s) => r[s] !== void 0);
	}
	r.shouldUseRule = l;
})), require_dataType = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.reportTypeError = r.checkDataTypes = r.checkDataType = r.coerceAndCheckDataType = r.getJSONTypes = r.getSchemaTypes = r.DataType = void 0;
	var s = require_rules(), c = require_applicability(), l = require_errors$1(), u = require_codegen(), d = require_util$1(), f;
	(function(r) {
		r[r.Correct = 0] = "Correct", r[r.Wrong = 1] = "Wrong";
	})(f || (r.DataType = f = {}));
	function p(r) {
		let s = m(r.type);
		if (s.includes("null")) {
			if (r.nullable === !1) throw Error("type: null contradicts nullable: false");
		} else {
			if (!s.length && r.nullable !== void 0) throw Error("\"nullable\" cannot be used without \"type\"");
			r.nullable === !0 && s.push("null");
		}
		return s;
	}
	r.getSchemaTypes = p;
	function m(r) {
		let c = Array.isArray(r) ? r : r ? [r] : [];
		if (c.every(s.isJSONType)) return c;
		throw Error("type must be JSONType or JSONType[]: " + c.join(","));
	}
	r.getJSONTypes = m;
	function h(r, s) {
		let { gen: l, data: u, opts: d } = r, p = _(s, d.coerceTypes), m = s.length > 0 && !(p.length === 0 && s.length === 1 && (0, c.schemaHasRulesForType)(r, s[0]));
		if (m) {
			let c = x(s, u, d.strictNumbers, f.Wrong);
			l.if(c, () => {
				p.length ? v(r, s, p) : C(r);
			});
		}
		return m;
	}
	r.coerceAndCheckDataType = h;
	var g = new Set([
		"string",
		"number",
		"integer",
		"boolean",
		"null"
	]);
	function _(r, s) {
		return s ? r.filter((r) => g.has(r) || s === "array" && r === "array") : [];
	}
	function v(r, s, c) {
		let { gen: l, data: d, opts: f } = r, p = l.let("dataType", (0, u._)`typeof ${d}`), m = l.let("coerced", (0, u._)`undefined`);
		f.coerceTypes === "array" && l.if((0, u._)`${p} == 'object' && Array.isArray(${d}) && ${d}.length == 1`, () => l.assign(d, (0, u._)`${d}[0]`).assign(p, (0, u._)`typeof ${d}`).if(x(s, d, f.strictNumbers), () => l.assign(m, d))), l.if((0, u._)`${m} !== undefined`);
		for (let r of c) (g.has(r) || r === "array" && f.coerceTypes === "array") && h(r);
		l.else(), C(r), l.endIf(), l.if((0, u._)`${m} !== undefined`, () => {
			l.assign(d, m), y(r, m);
		});
		function h(r) {
			switch (r) {
				case "string":
					l.elseIf((0, u._)`${p} == "number" || ${p} == "boolean"`).assign(m, (0, u._)`"" + ${d}`).elseIf((0, u._)`${d} === null`).assign(m, (0, u._)`""`);
					return;
				case "number":
					l.elseIf((0, u._)`${p} == "boolean" || ${d} === null
              || (${p} == "string" && ${d} && ${d} == +${d})`).assign(m, (0, u._)`+${d}`);
					return;
				case "integer":
					l.elseIf((0, u._)`${p} === "boolean" || ${d} === null
              || (${p} === "string" && ${d} && ${d} == +${d} && !(${d} % 1))`).assign(m, (0, u._)`+${d}`);
					return;
				case "boolean":
					l.elseIf((0, u._)`${d} === "false" || ${d} === 0 || ${d} === null`).assign(m, !1).elseIf((0, u._)`${d} === "true" || ${d} === 1`).assign(m, !0);
					return;
				case "null":
					l.elseIf((0, u._)`${d} === "" || ${d} === 0 || ${d} === false`), l.assign(m, null);
					return;
				case "array": l.elseIf((0, u._)`${p} === "string" || ${p} === "number"
              || ${p} === "boolean" || ${d} === null`).assign(m, (0, u._)`[${d}]`);
			}
		}
	}
	function y({ gen: r, parentData: s, parentDataProperty: c }, l) {
		r.if((0, u._)`${s} !== undefined`, () => r.assign((0, u._)`${s}[${c}]`, l));
	}
	function b(r, s, c, l = f.Correct) {
		let d = l === f.Correct ? u.operators.EQ : u.operators.NEQ, p;
		switch (r) {
			case "null": return (0, u._)`${s} ${d} null`;
			case "array":
				p = (0, u._)`Array.isArray(${s})`;
				break;
			case "object":
				p = (0, u._)`${s} && typeof ${s} == "object" && !Array.isArray(${s})`;
				break;
			case "integer":
				p = m((0, u._)`!(${s} % 1) && !isNaN(${s})`);
				break;
			case "number":
				p = m();
				break;
			default: return (0, u._)`typeof ${s} ${d} ${r}`;
		}
		return l === f.Correct ? p : (0, u.not)(p);
		function m(r = u.nil) {
			return (0, u.and)((0, u._)`typeof ${s} == "number"`, r, c ? (0, u._)`isFinite(${s})` : u.nil);
		}
	}
	r.checkDataType = b;
	function x(r, s, c, l) {
		if (r.length === 1) return b(r[0], s, c, l);
		let f, p = (0, d.toHash)(r);
		if (p.array && p.object) {
			let r = (0, u._)`typeof ${s} != "object"`;
			f = p.null ? r : (0, u._)`!${s} || ${r}`, delete p.null, delete p.array, delete p.object;
		} else f = u.nil;
		for (let r in p.number && delete p.integer, p) f = (0, u.and)(f, b(r, s, c, l));
		return f;
	}
	r.checkDataTypes = x;
	var S = {
		message: ({ schema: r }) => `must be ${r}`,
		params: ({ schema: r, schemaValue: s }) => typeof r == "string" ? (0, u._)`{type: ${r}}` : (0, u._)`{type: ${s}}`
	};
	function C(r) {
		let s = w(r);
		(0, l.reportError)(s, S);
	}
	r.reportTypeError = C;
	function w(r) {
		let { gen: s, data: c, schema: l } = r, u = (0, d.schemaRefOrVal)(r, l, "type");
		return {
			gen: s,
			keyword: "type",
			data: c,
			schema: l.type,
			schemaCode: u,
			schemaValue: u,
			parentSchema: l,
			params: {},
			it: r
		};
	}
})), require_defaults = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.assignDefaults = void 0;
	var s = require_codegen(), c = require_util$1();
	function l(r, s) {
		let { properties: c, items: l } = r.schema;
		if (s === "object" && c) for (let s in c) u(r, s, c[s].default);
		else s === "array" && Array.isArray(l) && l.forEach((s, c) => u(r, c, s.default));
	}
	r.assignDefaults = l;
	function u(r, l, u) {
		let { gen: d, compositeRule: f, data: p, opts: m } = r;
		if (u === void 0) return;
		let h = (0, s._)`${p}${(0, s.getProperty)(l)}`;
		if (f) {
			(0, c.checkStrictMode)(r, `default is ignored for: ${h}`);
			return;
		}
		let g = (0, s._)`${h} === undefined`;
		m.useDefaults === "empty" && (g = (0, s._)`${g} || ${h} === null || ${h} === ""`), d.if(g, (0, s._)`${h} = ${(0, s.stringify)(u)}`);
	}
})), require_code = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.validateUnion = r.validateArray = r.usePattern = r.callValidateCode = r.schemaProperties = r.allSchemaProperties = r.noPropertyInData = r.propertyInData = r.isOwnProperty = r.hasPropFunc = r.reportMissingProp = r.checkMissingProp = r.checkReportMissingProp = void 0;
	var s = require_codegen(), c = require_util$1(), l = require_names(), u = require_util$1();
	function d(r, c) {
		let { gen: l, data: u, it: d } = r;
		l.if(_(l, u, c, d.opts.ownProperties), () => {
			r.setParams({ missingProperty: (0, s._)`${c}` }, !0), r.error();
		});
	}
	r.checkReportMissingProp = d;
	function f({ gen: r, data: c, it: { opts: l } }, u, d) {
		return (0, s.or)(...u.map((u) => (0, s.and)(_(r, c, u, l.ownProperties), (0, s._)`${d} = ${u}`)));
	}
	r.checkMissingProp = f;
	function p(r, s) {
		r.setParams({ missingProperty: s }, !0), r.error();
	}
	r.reportMissingProp = p;
	function m(r) {
		return r.scopeValue("func", {
			ref: Object.prototype.hasOwnProperty,
			code: (0, s._)`Object.prototype.hasOwnProperty`
		});
	}
	r.hasPropFunc = m;
	function h(r, c, l) {
		return (0, s._)`${m(r)}.call(${c}, ${l})`;
	}
	r.isOwnProperty = h;
	function g(r, c, l, u) {
		let d = (0, s._)`${c}${(0, s.getProperty)(l)} !== undefined`;
		return u ? (0, s._)`${d} && ${h(r, c, l)}` : d;
	}
	r.propertyInData = g;
	function _(r, c, l, u) {
		let d = (0, s._)`${c}${(0, s.getProperty)(l)} === undefined`;
		return u ? (0, s.or)(d, (0, s.not)(h(r, c, l))) : d;
	}
	r.noPropertyInData = _;
	function v(r) {
		return r ? Object.keys(r).filter((r) => r !== "__proto__") : [];
	}
	r.allSchemaProperties = v;
	function y(r, s) {
		return v(s).filter((l) => !(0, c.alwaysValidSchema)(r, s[l]));
	}
	r.schemaProperties = y;
	function b({ schemaCode: r, data: c, it: { gen: u, topSchemaRef: d, schemaPath: f, errorPath: p }, it: m }, h, g, _) {
		let v = _ ? (0, s._)`${r}, ${c}, ${d}${f}` : c, y = [
			[l.default.instancePath, (0, s.strConcat)(l.default.instancePath, p)],
			[l.default.parentData, m.parentData],
			[l.default.parentDataProperty, m.parentDataProperty],
			[l.default.rootData, l.default.rootData]
		];
		m.opts.dynamicRef && y.push([l.default.dynamicAnchors, l.default.dynamicAnchors]);
		let b = (0, s._)`${v}, ${u.object(...y)}`;
		return g === s.nil ? (0, s._)`${h}(${b})` : (0, s._)`${h}.call(${g}, ${b})`;
	}
	r.callValidateCode = b;
	var x = (0, s._)`new RegExp`;
	function S({ gen: r, it: { opts: c } }, l) {
		let d = c.unicodeRegExp ? "u" : "", { regExp: f } = c.code, p = f(l, d);
		return r.scopeValue("pattern", {
			key: p.toString(),
			ref: p,
			code: (0, s._)`${f.code === "new RegExp" ? x : (0, u.useFunc)(r, f)}(${l}, ${d})`
		});
	}
	r.usePattern = S;
	function C(r) {
		let { gen: l, data: u, keyword: d, it: f } = r, p = l.name("valid");
		if (f.allErrors) {
			let r = l.let("valid", !0);
			return m(() => l.assign(r, !1)), r;
		}
		return l.var(p, !0), m(() => l.break()), p;
		function m(f) {
			let m = l.const("len", (0, s._)`${u}.length`);
			l.forRange("i", 0, m, (u) => {
				r.subschema({
					keyword: d,
					dataProp: u,
					dataPropType: c.Type.Num
				}, p), l.if((0, s.not)(p), f);
			});
		}
	}
	r.validateArray = C;
	function w(r) {
		let { gen: l, schema: u, keyword: d, it: f } = r;
		/* istanbul ignore if */
		if (!Array.isArray(u)) throw Error("ajv implementation error");
		if (u.some((r) => (0, c.alwaysValidSchema)(f, r)) && !f.opts.unevaluated) return;
		let p = l.let("valid", !1), m = l.name("_valid");
		l.block(() => u.forEach((c, u) => {
			let f = r.subschema({
				keyword: d,
				schemaProp: u,
				compositeRule: !0
			}, m);
			l.assign(p, (0, s._)`${p} || ${m}`), r.mergeValidEvaluated(f, m) || l.if((0, s.not)(p));
		})), r.result(p, () => r.reset(), () => r.error(!0));
	}
	r.validateUnion = w;
})), require_keyword = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.validateKeywordUsage = r.validSchemaType = r.funcKeywordCode = r.macroKeywordCode = void 0;
	var s = require_codegen(), c = require_names(), l = require_code(), u = require_errors$1();
	function d(r, c) {
		let { gen: l, keyword: u, schema: d, parentSchema: f, it: p } = r, m = c.macro.call(p.self, d, f, p), h = g(l, u, m);
		p.opts.validateSchema !== !1 && p.self.validateSchema(m, !0);
		let _ = l.name("valid");
		r.subschema({
			schema: m,
			schemaPath: s.nil,
			errSchemaPath: `${p.errSchemaPath}/${u}`,
			topSchemaRef: h,
			compositeRule: !0
		}, _), r.pass(_, () => r.error(!0));
	}
	r.macroKeywordCode = d;
	function f(r, u) {
		let { gen: d, keyword: f, schema: _, parentSchema: v, $data: y, it: b } = r;
		h(b, u);
		let x = g(d, f, !y && u.compile ? u.compile.call(b.self, _, v, b) : u.validate), S = d.let("valid");
		r.block$data(S, C), r.ok(u.valid ?? S);
		function C() {
			if (u.errors === !1) E(), u.modifying && p(r), D(() => r.error());
			else {
				let s = u.async ? w() : T();
				u.modifying && p(r), D(() => m(r, s));
			}
		}
		function w() {
			let r = d.let("ruleErrs", null);
			return d.try(() => E((0, s._)`await `), (c) => d.assign(S, !1).if((0, s._)`${c} instanceof ${b.ValidationError}`, () => d.assign(r, (0, s._)`${c}.errors`), () => d.throw(c))), r;
		}
		function T() {
			let r = (0, s._)`${x}.errors`;
			return d.assign(r, null), E(s.nil), r;
		}
		function E(f = u.async ? (0, s._)`await ` : s.nil) {
			let p = b.opts.passContext ? c.default.this : c.default.self, m = !("compile" in u && !y || u.schema === !1);
			d.assign(S, (0, s._)`${f}${(0, l.callValidateCode)(r, x, p, m)}`, u.modifying);
		}
		function D(r) {
			d.if((0, s.not)(u.valid ?? S), r);
		}
	}
	r.funcKeywordCode = f;
	function p(r) {
		let { gen: c, data: l, it: u } = r;
		c.if(u.parentData, () => c.assign(l, (0, s._)`${u.parentData}[${u.parentDataProperty}]`));
	}
	function m(r, l) {
		let { gen: d } = r;
		d.if((0, s._)`Array.isArray(${l})`, () => {
			d.assign(c.default.vErrors, (0, s._)`${c.default.vErrors} === null ? ${l} : ${c.default.vErrors}.concat(${l})`).assign(c.default.errors, (0, s._)`${c.default.vErrors}.length`), (0, u.extendErrors)(r);
		}, () => r.error());
	}
	function h({ schemaEnv: r }, s) {
		if (s.async && !r.$async) throw Error("async keyword in sync schema");
	}
	function g(r, c, l) {
		if (l === void 0) throw Error(`keyword "${c}" failed to compile`);
		return r.scopeValue("keyword", typeof l == "function" ? { ref: l } : {
			ref: l,
			code: (0, s.stringify)(l)
		});
	}
	function _(r, s, c = !1) {
		return !s.length || s.some((s) => s === "array" ? Array.isArray(r) : s === "object" ? r && typeof r == "object" && !Array.isArray(r) : typeof r == s || c && r === void 0);
	}
	r.validSchemaType = _;
	function v({ schema: r, opts: s, self: c, errSchemaPath: l }, u, d) {
		/* istanbul ignore if */
		if (Array.isArray(u.keyword) ? !u.keyword.includes(d) : u.keyword !== d) throw Error("ajv implementation error");
		let f = u.dependencies;
		if (f?.some((s) => !Object.prototype.hasOwnProperty.call(r, s))) throw Error(`parent schema must have dependencies of ${d}: ${f.join(",")}`);
		if (u.validateSchema && !u.validateSchema(r[d])) {
			let r = `keyword "${d}" value is invalid at path "${l}": ` + c.errorsText(u.validateSchema.errors);
			if (s.validateSchema === "log") c.logger.error(r);
			else throw Error(r);
		}
	}
	r.validateKeywordUsage = v;
})), require_subschema = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.extendSubschemaMode = r.extendSubschemaData = r.getSubschema = void 0;
	var s = require_codegen(), c = require_util$1();
	function l(r, { keyword: l, schemaProp: u, schema: d, schemaPath: f, errSchemaPath: p, topSchemaRef: m }) {
		if (l !== void 0 && d !== void 0) throw Error("both \"keyword\" and \"schema\" passed, only one allowed");
		if (l !== void 0) {
			let d = r.schema[l];
			return u === void 0 ? {
				schema: d,
				schemaPath: (0, s._)`${r.schemaPath}${(0, s.getProperty)(l)}`,
				errSchemaPath: `${r.errSchemaPath}/${l}`
			} : {
				schema: d[u],
				schemaPath: (0, s._)`${r.schemaPath}${(0, s.getProperty)(l)}${(0, s.getProperty)(u)}`,
				errSchemaPath: `${r.errSchemaPath}/${l}/${(0, c.escapeFragment)(u)}`
			};
		}
		if (d !== void 0) {
			if (f === void 0 || p === void 0 || m === void 0) throw Error("\"schemaPath\", \"errSchemaPath\" and \"topSchemaRef\" are required with \"schema\"");
			return {
				schema: d,
				schemaPath: f,
				topSchemaRef: m,
				errSchemaPath: p
			};
		}
		throw Error("either \"keyword\" or \"schema\" must be passed");
	}
	r.getSubschema = l;
	function u(r, l, { dataProp: u, dataPropType: d, data: f, dataTypes: p, propertyName: m }) {
		if (f !== void 0 && u !== void 0) throw Error("both \"data\" and \"dataProp\" passed, only one allowed");
		let { gen: h } = l;
		if (u !== void 0) {
			let { errorPath: f, dataPathArr: p, opts: m } = l;
			g(h.let("data", (0, s._)`${l.data}${(0, s.getProperty)(u)}`, !0)), r.errorPath = (0, s.str)`${f}${(0, c.getErrorPath)(u, d, m.jsPropertySyntax)}`, r.parentDataProperty = (0, s._)`${u}`, r.dataPathArr = [...p, r.parentDataProperty];
		}
		f !== void 0 && (g(f instanceof s.Name ? f : h.let("data", f, !0)), m !== void 0 && (r.propertyName = m)), p && (r.dataTypes = p);
		function g(s) {
			r.data = s, r.dataLevel = l.dataLevel + 1, r.dataTypes = [], l.definedProperties = /* @__PURE__ */ new Set(), r.parentData = l.data, r.dataNames = [...l.dataNames, s];
		}
	}
	r.extendSubschemaData = u;
	function d(r, { jtdDiscriminator: s, jtdMetadata: c, compositeRule: l, createErrors: u, allErrors: d }) {
		l !== void 0 && (r.compositeRule = l), u !== void 0 && (r.createErrors = u), d !== void 0 && (r.allErrors = d), r.jtdDiscriminator = s, r.jtdMetadata = c;
	}
	r.extendSubschemaMode = d;
})), require_json_schema_traverse = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = s.exports = function(r, s, c) {
		typeof s == "function" && (c = s, s = {}), c = s.cb || c;
		var u = typeof c == "function" ? c : c.pre || function() {}, d = c.post || function() {};
		l(s, u, d, r, "", r);
	};
	c.keywords = {
		additionalItems: !0,
		items: !0,
		contains: !0,
		additionalProperties: !0,
		propertyNames: !0,
		not: !0,
		if: !0,
		then: !0,
		else: !0
	}, c.arrayKeywords = {
		items: !0,
		allOf: !0,
		anyOf: !0,
		oneOf: !0
	}, c.propsKeywords = {
		$defs: !0,
		definitions: !0,
		properties: !0,
		patternProperties: !0,
		dependencies: !0
	}, c.skipKeywords = {
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
	function l(r, s, d, f, p, m, h, g, _, v) {
		if (f && typeof f == "object" && !Array.isArray(f)) {
			for (var y in s(f, p, m, h, g, _, v), f) {
				var b = f[y];
				if (Array.isArray(b)) {
					if (y in c.arrayKeywords) for (var x = 0; x < b.length; x++) l(r, s, d, b[x], p + "/" + y + "/" + x, m, p, y, f, x);
				} else if (y in c.propsKeywords) {
					if (b && typeof b == "object") for (var S in b) l(r, s, d, b[S], p + "/" + y + "/" + u(S), m, p, y, f, S);
				} else (y in c.keywords || r.allKeys && !(y in c.skipKeywords)) && l(r, s, d, b, p + "/" + y, m, p, y, f);
			}
			d(f, p, m, h, g, _, v);
		}
	}
	function u(r) {
		return r.replace(/~/g, "~0").replace(/\//g, "~1");
	}
})), require_resolve = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.getSchemaRefs = r.resolveUrl = r.normalizeId = r._getFullPath = r.getFullPath = r.inlineRef = void 0;
	var s = require_util$1(), c = require_fast_deep_equal(), l = require_json_schema_traverse(), u = new Set([
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
	function d(r, s = !0) {
		return typeof r == "boolean" ? !0 : s === !0 ? !p(r) : s ? m(r) <= s : !1;
	}
	r.inlineRef = d;
	var f = new Set([
		"$ref",
		"$recursiveRef",
		"$recursiveAnchor",
		"$dynamicRef",
		"$dynamicAnchor"
	]);
	function p(r) {
		for (let s in r) {
			if (f.has(s)) return !0;
			let c = r[s];
			if (Array.isArray(c) && c.some(p) || typeof c == "object" && p(c)) return !0;
		}
		return !1;
	}
	function m(r) {
		let c = 0;
		for (let l in r) if (l === "$ref" || (c++, !u.has(l) && (typeof r[l] == "object" && (0, s.eachItem)(r[l], (r) => c += m(r)), c === Infinity))) return Infinity;
		return c;
	}
	function h(r, s = "", c) {
		return c !== !1 && (s = v(s)), g(r, r.parse(s));
	}
	r.getFullPath = h;
	function g(r, s) {
		return r.serialize(s).split("#")[0] + "#";
	}
	r._getFullPath = g;
	var _ = /#\/?$/;
	function v(r) {
		return r ? r.replace(_, "") : "";
	}
	r.normalizeId = v;
	function y(r, s, c) {
		return c = v(c), r.resolve(s, c);
	}
	r.resolveUrl = y;
	var b = /^[a-z_][-a-z0-9._]*$/i;
	function x(r, s) {
		if (typeof r == "boolean") return {};
		let { schemaId: u, uriResolver: d } = this.opts, f = v(r[u] || s), p = { "": f }, m = h(d, f, !1), g = {}, _ = /* @__PURE__ */ new Set();
		return l(r, { allKeys: !0 }, (r, s, c, l) => {
			if (l === void 0) return;
			let d = m + s, f = p[l];
			typeof r[u] == "string" && (f = h.call(this, r[u])), S.call(this, r.$anchor), S.call(this, r.$dynamicAnchor), p[s] = f;
			function h(s) {
				let c = this.opts.uriResolver.resolve;
				if (s = v(f ? c(f, s) : s), _.has(s)) throw x(s);
				_.add(s);
				let l = this.refs[s];
				return typeof l == "string" && (l = this.refs[l]), typeof l == "object" ? y(r, l.schema, s) : s !== v(d) && (s[0] === "#" ? (y(r, g[s], s), g[s] = r) : this.refs[s] = d), s;
			}
			function S(r) {
				if (typeof r == "string") {
					if (!b.test(r)) throw Error(`invalid anchor "${r}"`);
					h.call(this, `#${r}`);
				}
			}
		}), g;
		function y(r, s, l) {
			if (s !== void 0 && !c(r, s)) throw x(l);
		}
		function x(r) {
			return /* @__PURE__ */ Error(`reference "${r}" resolves to more than one schema`);
		}
	}
	r.getSchemaRefs = x;
})), require_validate = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.getData = r.KeywordCxt = r.validateFunctionCode = void 0;
	var s = require_boolSchema(), c = require_dataType(), l = require_applicability(), u = require_dataType(), d = require_defaults(), f = require_keyword(), p = require_subschema(), m = require_codegen(), h = require_names(), g = require_resolve(), _ = require_util$1(), v = require_errors$1();
	function y(r) {
		if (O(r) && (A(r), D(r))) {
			C(r);
			return;
		}
		b(r, () => (0, s.topBoolOrEmptySchema)(r));
	}
	r.validateFunctionCode = y;
	function b({ gen: r, validateName: s, schema: c, schemaEnv: l, opts: u }, d) {
		u.code.es5 ? r.func(s, (0, m._)`${h.default.data}, ${h.default.valCxt}`, l.$async, () => {
			r.code((0, m._)`"use strict"; ${T(c, u)}`), S(r, u), r.code(d);
		}) : r.func(s, (0, m._)`${h.default.data}, ${x(u)}`, l.$async, () => r.code(T(c, u)).code(d));
	}
	function x(r) {
		return (0, m._)`{${h.default.instancePath}="", ${h.default.parentData}, ${h.default.parentDataProperty}, ${h.default.rootData}=${h.default.data}${r.dynamicRef ? (0, m._)`, ${h.default.dynamicAnchors}={}` : m.nil}}={}`;
	}
	function S(r, s) {
		r.if(h.default.valCxt, () => {
			r.var(h.default.instancePath, (0, m._)`${h.default.valCxt}.${h.default.instancePath}`), r.var(h.default.parentData, (0, m._)`${h.default.valCxt}.${h.default.parentData}`), r.var(h.default.parentDataProperty, (0, m._)`${h.default.valCxt}.${h.default.parentDataProperty}`), r.var(h.default.rootData, (0, m._)`${h.default.valCxt}.${h.default.rootData}`), s.dynamicRef && r.var(h.default.dynamicAnchors, (0, m._)`${h.default.valCxt}.${h.default.dynamicAnchors}`);
		}, () => {
			r.var(h.default.instancePath, (0, m._)`""`), r.var(h.default.parentData, (0, m._)`undefined`), r.var(h.default.parentDataProperty, (0, m._)`undefined`), r.var(h.default.rootData, h.default.data), s.dynamicRef && r.var(h.default.dynamicAnchors, (0, m._)`{}`);
		});
	}
	function C(r) {
		let { schema: s, opts: c, gen: l } = r;
		b(r, () => {
			c.$comment && s.$comment && I(r), N(r), l.let(h.default.vErrors, null), l.let(h.default.errors, 0), c.unevaluated && w(r), j(r), L(r);
		});
	}
	function w(r) {
		let { gen: s, validateName: c } = r;
		r.evaluated = s.const("evaluated", (0, m._)`${c}.evaluated`), s.if((0, m._)`${r.evaluated}.dynamicProps`, () => s.assign((0, m._)`${r.evaluated}.props`, (0, m._)`undefined`)), s.if((0, m._)`${r.evaluated}.dynamicItems`, () => s.assign((0, m._)`${r.evaluated}.items`, (0, m._)`undefined`));
	}
	function T(r, s) {
		let c = typeof r == "object" && r[s.schemaId];
		return c && (s.code.source || s.code.process) ? (0, m._)`/*# sourceURL=${c} */` : m.nil;
	}
	function E(r, c) {
		if (O(r) && (A(r), D(r))) {
			k(r, c);
			return;
		}
		(0, s.boolOrEmptySchema)(r, c);
	}
	function D({ schema: r, self: s }) {
		if (typeof r == "boolean") return !r;
		for (let c in r) if (s.RULES.all[c]) return !0;
		return !1;
	}
	function O(r) {
		return typeof r.schema != "boolean";
	}
	function k(r, s) {
		let { schema: c, gen: l, opts: u } = r;
		u.$comment && c.$comment && I(r), P(r), F(r);
		let d = l.const("_errs", h.default.errors);
		j(r, d), l.var(s, (0, m._)`${d} === ${h.default.errors}`);
	}
	function A(r) {
		(0, _.checkUnknownRules)(r), M(r);
	}
	function j(r, s) {
		if (r.opts.jtd) return z(r, [], !1, s);
		let l = (0, c.getSchemaTypes)(r.schema);
		z(r, l, !(0, c.coerceAndCheckDataType)(r, l), s);
	}
	function M(r) {
		let { schema: s, errSchemaPath: c, opts: l, self: u } = r;
		s.$ref && l.ignoreKeywordsWithRef && (0, _.schemaHasRulesButRef)(s, u.RULES) && u.logger.warn(`$ref: keywords ignored in schema at path "${c}"`);
	}
	function N(r) {
		let { schema: s, opts: c } = r;
		s.default !== void 0 && c.useDefaults && c.strictSchema && (0, _.checkStrictMode)(r, "default is ignored in the schema root");
	}
	function P(r) {
		let s = r.schema[r.opts.schemaId];
		s && (r.baseId = (0, g.resolveUrl)(r.opts.uriResolver, r.baseId, s));
	}
	function F(r) {
		if (r.schema.$async && !r.schemaEnv.$async) throw Error("async schema in sync schema");
	}
	function I({ gen: r, schemaEnv: s, schema: c, errSchemaPath: l, opts: u }) {
		let d = c.$comment;
		if (u.$comment === !0) r.code((0, m._)`${h.default.self}.logger.log(${d})`);
		else if (typeof u.$comment == "function") {
			let c = (0, m.str)`${l}/$comment`, u = r.scopeValue("root", { ref: s.root });
			r.code((0, m._)`${h.default.self}.opts.$comment(${d}, ${c}, ${u}.schema)`);
		}
	}
	function L(r) {
		let { gen: s, schemaEnv: c, validateName: l, ValidationError: u, opts: d } = r;
		c.$async ? s.if((0, m._)`${h.default.errors} === 0`, () => s.return(h.default.data), () => s.throw((0, m._)`new ${u}(${h.default.vErrors})`)) : (s.assign((0, m._)`${l}.errors`, h.default.vErrors), d.unevaluated && R(r), s.return((0, m._)`${h.default.errors} === 0`));
	}
	function R({ gen: r, evaluated: s, props: c, items: l }) {
		c instanceof m.Name && r.assign((0, m._)`${s}.props`, c), l instanceof m.Name && r.assign((0, m._)`${s}.items`, l);
	}
	function z(r, s, c, d) {
		let { gen: f, schema: p, data: g, allErrors: v, opts: y, self: b } = r, { RULES: x } = b;
		if (p.$ref && (y.ignoreKeywordsWithRef || !(0, _.schemaHasRulesButRef)(p, x))) {
			f.block(() => X(r, "$ref", x.all.$ref.definition));
			return;
		}
		y.jtd || V(r, s), f.block(() => {
			for (let r of x.rules) S(r);
			S(x.post);
		});
		function S(_) {
			(0, l.shouldUseGroup)(p, _) && (_.type ? (f.if((0, u.checkDataType)(_.type, g, y.strictNumbers)), B(r, _), s.length === 1 && s[0] === _.type && c && (f.else(), (0, u.reportTypeError)(r)), f.endIf()) : B(r, _), v || f.if((0, m._)`${h.default.errors} === ${d || 0}`));
		}
	}
	function B(r, s) {
		let { gen: c, schema: u, opts: { useDefaults: f } } = r;
		f && (0, d.assignDefaults)(r, s.type), c.block(() => {
			for (let c of s.rules) (0, l.shouldUseRule)(u, c) && X(r, c.keyword, c.definition, s.type);
		});
	}
	function V(r, s) {
		r.schemaEnv.meta || !r.opts.strictTypes || (H(r, s), r.opts.allowUnionTypes || U(r, s), W(r, r.dataTypes));
	}
	function H(r, s) {
		if (s.length) {
			if (!r.dataTypes.length) {
				r.dataTypes = s;
				return;
			}
			s.forEach((s) => {
				K(r.dataTypes, s) || J(r, `type "${s}" not allowed by context "${r.dataTypes.join(",")}"`);
			}), q(r, s);
		}
	}
	function U(r, s) {
		s.length > 1 && !(s.length === 2 && s.includes("null")) && J(r, "use allowUnionTypes to allow union type keyword");
	}
	function W(r, s) {
		let c = r.self.RULES.all;
		for (let u in c) {
			let d = c[u];
			if (typeof d == "object" && (0, l.shouldUseRule)(r.schema, d)) {
				let { type: c } = d.definition;
				c.length && !c.some((r) => G(s, r)) && J(r, `missing type "${c.join(",")}" for keyword "${u}"`);
			}
		}
	}
	function G(r, s) {
		return r.includes(s) || s === "number" && r.includes("integer");
	}
	function K(r, s) {
		return r.includes(s) || s === "integer" && r.includes("number");
	}
	function q(r, s) {
		let c = [];
		for (let l of r.dataTypes) K(s, l) ? c.push(l) : s.includes("integer") && l === "number" && c.push("integer");
		r.dataTypes = c;
	}
	function J(r, s) {
		let c = r.schemaEnv.baseId + r.errSchemaPath;
		s += ` at "${c}" (strictTypes)`, (0, _.checkStrictMode)(r, s, r.opts.strictTypes);
	}
	var Y = class {
		constructor(r, s, c) {
			if ((0, f.validateKeywordUsage)(r, s, c), this.gen = r.gen, this.allErrors = r.allErrors, this.keyword = c, this.data = r.data, this.schema = r.schema[c], this.$data = s.$data && r.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, _.schemaRefOrVal)(r, this.schema, c, this.$data), this.schemaType = s.schemaType, this.parentSchema = r.schema, this.params = {}, this.it = r, this.def = s, this.$data) this.schemaCode = r.gen.const("vSchema", $(this.$data, r));
			else if (this.schemaCode = this.schemaValue, !(0, f.validSchemaType)(this.schema, s.schemaType, s.allowUndefined)) throw Error(`${c} value must be ${JSON.stringify(s.schemaType)}`);
			("code" in s ? s.trackErrors : s.errors !== !1) && (this.errsCount = r.gen.const("_errs", h.default.errors));
		}
		result(r, s, c) {
			this.failResult((0, m.not)(r), s, c);
		}
		failResult(r, s, c) {
			this.gen.if(r), c ? c() : this.error(), s ? (this.gen.else(), s(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
		}
		pass(r, s) {
			this.failResult((0, m.not)(r), void 0, s);
		}
		fail(r) {
			if (r === void 0) {
				this.error(), this.allErrors || this.gen.if(!1);
				return;
			}
			this.gen.if(r), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
		}
		fail$data(r) {
			if (!this.$data) return this.fail(r);
			let { schemaCode: s } = this;
			this.fail((0, m._)`${s} !== undefined && (${(0, m.or)(this.invalid$data(), r)})`);
		}
		error(r, s, c) {
			if (s) {
				this.setParams(s), this._error(r, c), this.setParams({});
				return;
			}
			this._error(r, c);
		}
		_error(r, s) {
			(r ? v.reportExtraError : v.reportError)(this, this.def.error, s);
		}
		$dataError() {
			(0, v.reportError)(this, this.def.$dataError || v.keyword$DataError);
		}
		reset() {
			if (this.errsCount === void 0) throw Error("add \"trackErrors\" to keyword definition");
			(0, v.resetErrorsCount)(this.gen, this.errsCount);
		}
		ok(r) {
			this.allErrors || this.gen.if(r);
		}
		setParams(r, s) {
			s ? Object.assign(this.params, r) : this.params = r;
		}
		block$data(r, s, c = m.nil) {
			this.gen.block(() => {
				this.check$data(r, c), s();
			});
		}
		check$data(r = m.nil, s = m.nil) {
			if (!this.$data) return;
			let { gen: c, schemaCode: l, schemaType: u, def: d } = this;
			c.if((0, m.or)((0, m._)`${l} === undefined`, s)), r !== m.nil && c.assign(r, !0), (u.length || d.validateSchema) && (c.elseIf(this.invalid$data()), this.$dataError(), r !== m.nil && c.assign(r, !1)), c.else();
		}
		invalid$data() {
			let { gen: r, schemaCode: s, schemaType: c, def: l, it: d } = this;
			return (0, m.or)(f(), p());
			function f() {
				if (c.length) {
					/* istanbul ignore if */
					if (!(s instanceof m.Name)) throw Error("ajv implementation error");
					let r = Array.isArray(c) ? c : [c];
					return (0, m._)`${(0, u.checkDataTypes)(r, s, d.opts.strictNumbers, u.DataType.Wrong)}`;
				}
				return m.nil;
			}
			function p() {
				if (l.validateSchema) {
					let c = r.scopeValue("validate$data", { ref: l.validateSchema });
					return (0, m._)`!${c}(${s})`;
				}
				return m.nil;
			}
		}
		subschema(r, s) {
			let c = (0, p.getSubschema)(this.it, r);
			(0, p.extendSubschemaData)(c, this.it, r), (0, p.extendSubschemaMode)(c, r);
			let l = {
				...this.it,
				...c,
				items: void 0,
				props: void 0
			};
			return E(l, s), l;
		}
		mergeEvaluated(r, s) {
			let { it: c, gen: l } = this;
			c.opts.unevaluated && (c.props !== !0 && r.props !== void 0 && (c.props = _.mergeEvaluated.props(l, r.props, c.props, s)), c.items !== !0 && r.items !== void 0 && (c.items = _.mergeEvaluated.items(l, r.items, c.items, s)));
		}
		mergeValidEvaluated(r, s) {
			let { it: c, gen: l } = this;
			if (c.opts.unevaluated && (c.props !== !0 || c.items !== !0)) return l.if(s, () => this.mergeEvaluated(r, m.Name)), !0;
		}
	};
	r.KeywordCxt = Y;
	function X(r, s, c, l) {
		let u = new Y(r, c, s);
		"code" in c ? c.code(u, l) : u.$data && c.validate ? (0, f.funcKeywordCode)(u, c) : "macro" in c ? (0, f.macroKeywordCode)(u, c) : (c.compile || c.validate) && (0, f.funcKeywordCode)(u, c);
	}
	var Z = /^\/(?:[^~]|~0|~1)*$/, Q = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
	function $(r, { dataLevel: s, dataNames: c, dataPathArr: l }) {
		let u, d;
		if (r === "") return h.default.rootData;
		if (r[0] === "/") {
			if (!Z.test(r)) throw Error(`Invalid JSON-pointer: ${r}`);
			u = r, d = h.default.rootData;
		} else {
			let f = Q.exec(r);
			if (!f) throw Error(`Invalid JSON-pointer: ${r}`);
			let p = +f[1];
			if (u = f[2], u === "#") {
				if (p >= s) throw Error(g("property/index", p));
				return l[s - p];
			}
			if (p > s) throw Error(g("data", p));
			if (d = c[s - p], !u) return d;
		}
		let f = d, p = u.split("/");
		for (let r of p) r && (d = (0, m._)`${d}${(0, m.getProperty)((0, _.unescapeJsonPointer)(r))}`, f = (0, m._)`${f} && ${d}`);
		return f;
		function g(r, c) {
			return `Cannot access ${r} ${c} levels up, current level is ${s}`;
		}
	}
	r.getData = $;
})), require_validation_error = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.default = class extends Error {
		constructor(r) {
			super("validation failed"), this.errors = r, this.ajv = this.validation = !0;
		}
	};
})), require_ref_error = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_resolve();
	r.default = class extends Error {
		constructor(r, c, l, u) {
			super(u || `can't resolve reference ${l} from id ${c}`), this.missingRef = (0, s.resolveUrl)(r, c, l), this.missingSchema = (0, s.normalizeId)((0, s.getFullPath)(r, this.missingRef));
		}
	};
})), require_compile = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.resolveSchema = r.getCompilingSchema = r.resolveRef = r.compileSchema = r.SchemaEnv = void 0;
	var s = require_codegen(), c = require_validation_error(), l = require_names(), u = require_resolve(), d = require_util$1(), f = require_validate(), p = class {
		constructor(r) {
			this.refs = {}, this.dynamicAnchors = {};
			let s;
			typeof r.schema == "object" && (s = r.schema), this.schema = r.schema, this.schemaId = r.schemaId, this.root = r.root || this, this.baseId = r.baseId ?? (0, u.normalizeId)(s?.[r.schemaId || "$id"]), this.schemaPath = r.schemaPath, this.localRefs = r.localRefs, this.meta = r.meta, this.$async = s?.$async, this.refs = {};
		}
	};
	r.SchemaEnv = p;
	function m(r) {
		let d = _.call(this, r);
		if (d) return d;
		let p = (0, u.getFullPath)(this.opts.uriResolver, r.root.baseId), { es5: m, lines: h } = this.opts.code, { ownProperties: g } = this.opts, v = new s.CodeGen(this.scope, {
			es5: m,
			lines: h,
			ownProperties: g
		}), y;
		r.$async && (y = v.scopeValue("Error", {
			ref: c.default,
			code: (0, s._)`require("ajv/dist/runtime/validation_error").default`
		}));
		let b = v.scopeName("validate");
		r.validateName = b;
		let x = {
			gen: v,
			allErrors: this.opts.allErrors,
			data: l.default.data,
			parentData: l.default.parentData,
			parentDataProperty: l.default.parentDataProperty,
			dataNames: [l.default.data],
			dataPathArr: [s.nil],
			dataLevel: 0,
			dataTypes: [],
			definedProperties: /* @__PURE__ */ new Set(),
			topSchemaRef: v.scopeValue("schema", this.opts.code.source === !0 ? {
				ref: r.schema,
				code: (0, s.stringify)(r.schema)
			} : { ref: r.schema }),
			validateName: b,
			ValidationError: y,
			schema: r.schema,
			schemaEnv: r,
			rootId: p,
			baseId: r.baseId || p,
			schemaPath: s.nil,
			errSchemaPath: r.schemaPath || (this.opts.jtd ? "" : "#"),
			errorPath: (0, s._)`""`,
			opts: this.opts,
			self: this
		}, S;
		try {
			this._compilations.add(r), (0, f.validateFunctionCode)(x), v.optimize(this.opts.code.optimize);
			let c = v.toString();
			S = `${v.scopeRefs(l.default.scope)}return ${c}`, this.opts.code.process && (S = this.opts.code.process(S, r));
			let u = Function(`${l.default.self}`, `${l.default.scope}`, S)(this, this.scope.get());
			if (this.scope.value(b, { ref: u }), u.errors = null, u.schema = r.schema, u.schemaEnv = r, r.$async && (u.$async = !0), this.opts.code.source === !0 && (u.source = {
				validateName: b,
				validateCode: c,
				scopeValues: v._values
			}), this.opts.unevaluated) {
				let { props: r, items: c } = x;
				u.evaluated = {
					props: r instanceof s.Name ? void 0 : r,
					items: c instanceof s.Name ? void 0 : c,
					dynamicProps: r instanceof s.Name,
					dynamicItems: c instanceof s.Name
				}, u.source && (u.source.evaluated = (0, s.stringify)(u.evaluated));
			}
			return r.validate = u, r;
		} catch (s) {
			throw delete r.validate, delete r.validateName, S && this.logger.error("Error compiling schema, function code:", S), s;
		} finally {
			this._compilations.delete(r);
		}
	}
	r.compileSchema = m;
	function h(r, s, c) {
		c = (0, u.resolveUrl)(this.opts.uriResolver, s, c);
		let l = r.refs[c];
		if (l) return l;
		let d = y.call(this, r, c);
		if (d === void 0) {
			let l = r.localRefs?.[c], { schemaId: u } = this.opts;
			l && (d = new p({
				schema: l,
				schemaId: u,
				root: r,
				baseId: s
			}));
		}
		if (d !== void 0) return r.refs[c] = g.call(this, d);
	}
	r.resolveRef = h;
	function g(r) {
		return (0, u.inlineRef)(r.schema, this.opts.inlineRefs) ? r.schema : r.validate ? r : m.call(this, r);
	}
	function _(r) {
		for (let s of this._compilations) if (v(s, r)) return s;
	}
	r.getCompilingSchema = _;
	function v(r, s) {
		return r.schema === s.schema && r.root === s.root && r.baseId === s.baseId;
	}
	function y(r, s) {
		let c;
		for (; typeof (c = this.refs[s]) == "string";) s = c;
		return c || this.schemas[s] || b.call(this, r, s);
	}
	function b(r, s) {
		let c = this.opts.uriResolver.parse(s), l = (0, u._getFullPath)(this.opts.uriResolver, c), d = (0, u.getFullPath)(this.opts.uriResolver, r.baseId, void 0);
		if (Object.keys(r.schema).length > 0 && l === d) return S.call(this, c, r);
		let f = (0, u.normalizeId)(l), h = this.refs[f] || this.schemas[f];
		if (typeof h == "string") {
			let s = b.call(this, r, h);
			return typeof s?.schema == "object" ? S.call(this, c, s) : void 0;
		}
		if (typeof h?.schema == "object") {
			if (h.validate || m.call(this, h), f === (0, u.normalizeId)(s)) {
				let { schema: s } = h, { schemaId: c } = this.opts, l = s[c];
				return l && (d = (0, u.resolveUrl)(this.opts.uriResolver, d, l)), new p({
					schema: s,
					schemaId: c,
					root: r,
					baseId: d
				});
			}
			return S.call(this, c, h);
		}
	}
	r.resolveSchema = b;
	var x = new Set([
		"properties",
		"patternProperties",
		"enum",
		"dependencies",
		"definitions"
	]);
	function S(r, { baseId: s, schema: c, root: l }) {
		if (r.fragment?.[0] !== "/") return;
		for (let l of r.fragment.slice(1).split("/")) {
			if (typeof c == "boolean") return;
			let r = c[(0, d.unescapeFragment)(l)];
			if (r === void 0) return;
			c = r;
			let f = typeof c == "object" && c[this.opts.schemaId];
			!x.has(l) && f && (s = (0, u.resolveUrl)(this.opts.uriResolver, s, f));
		}
		let f;
		if (typeof c != "boolean" && c.$ref && !(0, d.schemaHasRulesButRef)(c, this.RULES)) {
			let r = (0, u.resolveUrl)(this.opts.uriResolver, s, c.$ref);
			f = b.call(this, l, r);
		}
		let { schemaId: m } = this.opts;
		if (f ||= new p({
			schema: c,
			schemaId: m,
			root: l,
			baseId: s
		}), f.schema !== f.root.schema) return f;
	}
})), data_exports = /* @__PURE__ */ __export({
	$id: () => $id$1,
	additionalProperties: () => !1,
	default: () => data_default,
	description: () => description,
	properties: () => properties$1,
	required: () => required,
	type: () => type$1
}, 1), $id$1, description, type$1, required, properties$1, data_default, init_data = __esmMin((() => {
	$id$1 = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", description = "Meta-schema for $data reference (JSON AnySchema extension proposal)", type$1 = "object", required = ["$data"], properties$1 = { $data: {
		type: "string",
		anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }]
	} }, data_default = {
		$id: $id$1,
		description,
		type: type$1,
		required,
		properties: properties$1,
		additionalProperties: !1
	};
})), require_uri = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_fast_uri();
	s.code = "require(\"ajv/dist/runtime/uri\").default", r.default = s;
})), require_core$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.CodeGen = r.Name = r.nil = r.stringify = r.str = r._ = r.KeywordCxt = void 0;
	var s = require_validate();
	Object.defineProperty(r, "KeywordCxt", {
		enumerable: !0,
		get: function() {
			return s.KeywordCxt;
		}
	});
	var c = require_codegen();
	Object.defineProperty(r, "_", {
		enumerable: !0,
		get: function() {
			return c._;
		}
	}), Object.defineProperty(r, "str", {
		enumerable: !0,
		get: function() {
			return c.str;
		}
	}), Object.defineProperty(r, "stringify", {
		enumerable: !0,
		get: function() {
			return c.stringify;
		}
	}), Object.defineProperty(r, "nil", {
		enumerable: !0,
		get: function() {
			return c.nil;
		}
	}), Object.defineProperty(r, "Name", {
		enumerable: !0,
		get: function() {
			return c.Name;
		}
	}), Object.defineProperty(r, "CodeGen", {
		enumerable: !0,
		get: function() {
			return c.CodeGen;
		}
	});
	var l = require_validation_error(), u = require_ref_error(), d = require_rules(), f = require_compile(), p = require_codegen(), m = require_resolve(), h = require_dataType(), g = require_util$1(), _ = (init_data(), __toCommonJS(data_exports).default), v = require_uri(), y = (r, s) => new RegExp(r, s);
	y.code = "new RegExp";
	var b = [
		"removeAdditional",
		"useDefaults",
		"coerceTypes"
	], x = new Set([
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
	]), S = {
		errorDataPath: "",
		format: "`validateFormats: false` can be used instead.",
		nullable: "\"nullable\" keyword is supported by default.",
		jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
		extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
		missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
		processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
		sourceCode: "Use option `code: {source: true}`",
		strictDefaults: "It is default now, see option `strict`.",
		strictKeywords: "It is default now, see option `strict`.",
		uniqueItems: "\"uniqueItems\" keyword is always validated.",
		unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
		cache: "Map is used as cache, schema object as key.",
		serialize: "Map is used as cache, schema object as key.",
		ajvErrors: "It is default now."
	}, C = {
		ignoreKeywordsWithRef: "",
		jsPropertySyntax: "",
		unicode: "\"minLength\"/\"maxLength\" account for unicode characters by default."
	}, w = 200;
	function T(r) {
		let s = r.strict, c = r.code?.optimize, l = c === !0 || c === void 0 ? 1 : c || 0, u = r.code?.regExp ?? y, d = r.uriResolver ?? v.default;
		return {
			strictSchema: r.strictSchema ?? s ?? !0,
			strictNumbers: r.strictNumbers ?? s ?? !0,
			strictTypes: r.strictTypes ?? s ?? "log",
			strictTuples: r.strictTuples ?? s ?? "log",
			strictRequired: r.strictRequired ?? s ?? !1,
			code: r.code ? {
				...r.code,
				optimize: l,
				regExp: u
			} : {
				optimize: l,
				regExp: u
			},
			loopRequired: r.loopRequired ?? w,
			loopEnum: r.loopEnum ?? w,
			meta: r.meta ?? !0,
			messages: r.messages ?? !0,
			inlineRefs: r.inlineRefs ?? !0,
			schemaId: r.schemaId ?? "$id",
			addUsedSchema: r.addUsedSchema ?? !0,
			validateSchema: r.validateSchema ?? !0,
			validateFormats: r.validateFormats ?? !0,
			unicodeRegExp: r.unicodeRegExp ?? !0,
			int32range: r.int32range ?? !0,
			uriResolver: d
		};
	}
	var E = class {
		constructor(r = {}) {
			this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), r = this.opts = {
				...r,
				...T(r)
			};
			let { es5: s, lines: c } = this.opts.code;
			this.scope = new p.ValueScope({
				scope: {},
				prefixes: x,
				es5: s,
				lines: c
			}), this.logger = F(r.logger);
			let l = r.validateFormats;
			r.validateFormats = !1, this.RULES = (0, d.getRules)(), D.call(this, S, r, "NOT SUPPORTED"), D.call(this, C, r, "DEPRECATED", "warn"), this._metaOpts = N.call(this), r.formats && A.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), r.keywords && j.call(this, r.keywords), typeof r.meta == "object" && this.addMetaSchema(r.meta), k.call(this), r.validateFormats = l;
		}
		_addVocabularies() {
			this.addKeyword("$async");
		}
		_addDefaultMetaSchema() {
			let { $data: r, meta: s, schemaId: c } = this.opts, l = _;
			c === "id" && (l = { ..._ }, l.id = l.$id, delete l.$id), s && r && this.addMetaSchema(l, l[c], !1);
		}
		defaultMeta() {
			let { meta: r, schemaId: s } = this.opts;
			return this.opts.defaultMeta = typeof r == "object" ? r[s] || r : void 0;
		}
		validate(r, s) {
			let c;
			if (typeof r == "string") {
				if (c = this.getSchema(r), !c) throw Error(`no schema with key or ref "${r}"`);
			} else c = this.compile(r);
			let l = c(s);
			return "$async" in c || (this.errors = c.errors), l;
		}
		compile(r, s) {
			let c = this._addSchema(r, s);
			return c.validate || this._compileSchemaEnv(c);
		}
		compileAsync(r, s) {
			if (typeof this.opts.loadSchema != "function") throw Error("options.loadSchema should be a function");
			let { loadSchema: c } = this.opts;
			return l.call(this, r, s);
			async function l(r, s) {
				await d.call(this, r.$schema);
				let c = this._addSchema(r, s);
				return c.validate || f.call(this, c);
			}
			async function d(r) {
				r && !this.getSchema(r) && await l.call(this, { $ref: r }, !0);
			}
			async function f(r) {
				try {
					return this._compileSchemaEnv(r);
				} catch (s) {
					if (!(s instanceof u.default)) throw s;
					return p.call(this, s), await m.call(this, s.missingSchema), f.call(this, r);
				}
			}
			function p({ missingSchema: r, missingRef: s }) {
				if (this.refs[r]) throw Error(`AnySchema ${r} is loaded but ${s} cannot be resolved`);
			}
			async function m(r) {
				let c = await h.call(this, r);
				this.refs[r] || await d.call(this, c.$schema), this.refs[r] || this.addSchema(c, r, s);
			}
			async function h(r) {
				let s = this._loading[r];
				if (s) return s;
				try {
					return await (this._loading[r] = c(r));
				} finally {
					delete this._loading[r];
				}
			}
		}
		addSchema(r, s, c, l = this.opts.validateSchema) {
			if (Array.isArray(r)) {
				for (let s of r) this.addSchema(s, void 0, c, l);
				return this;
			}
			let u;
			if (typeof r == "object") {
				let { schemaId: s } = this.opts;
				if (u = r[s], u !== void 0 && typeof u != "string") throw Error(`schema ${s} must be string`);
			}
			return s = (0, m.normalizeId)(s || u), this._checkUnique(s), this.schemas[s] = this._addSchema(r, c, s, l, !0), this;
		}
		addMetaSchema(r, s, c = this.opts.validateSchema) {
			return this.addSchema(r, s, !0, c), this;
		}
		validateSchema(r, s) {
			if (typeof r == "boolean") return !0;
			let c;
			if (c = r.$schema, c !== void 0 && typeof c != "string") throw Error("$schema must be a string");
			if (c = c || this.opts.defaultMeta || this.defaultMeta(), !c) return this.logger.warn("meta-schema not available"), this.errors = null, !0;
			let l = this.validate(c, r);
			if (!l && s) {
				let r = "schema is invalid: " + this.errorsText();
				if (this.opts.validateSchema === "log") this.logger.error(r);
				else throw Error(r);
			}
			return l;
		}
		getSchema(r) {
			let s;
			for (; typeof (s = O.call(this, r)) == "string";) r = s;
			if (s === void 0) {
				let { schemaId: c } = this.opts, l = new f.SchemaEnv({
					schema: {},
					schemaId: c
				});
				if (s = f.resolveSchema.call(this, l, r), !s) return;
				this.refs[r] = s;
			}
			return s.validate || this._compileSchemaEnv(s);
		}
		removeSchema(r) {
			if (r instanceof RegExp) return this._removeAllSchemas(this.schemas, r), this._removeAllSchemas(this.refs, r), this;
			switch (typeof r) {
				case "undefined": return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
				case "string": {
					let s = O.call(this, r);
					return typeof s == "object" && this._cache.delete(s.schema), delete this.schemas[r], delete this.refs[r], this;
				}
				case "object": {
					let s = r;
					this._cache.delete(s);
					let c = r[this.opts.schemaId];
					return c && (c = (0, m.normalizeId)(c), delete this.schemas[c], delete this.refs[c]), this;
				}
				default: throw Error("ajv.removeSchema: invalid parameter");
			}
		}
		addVocabulary(r) {
			for (let s of r) this.addKeyword(s);
			return this;
		}
		addKeyword(r, s) {
			let c;
			if (typeof r == "string") c = r, typeof s == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), s.keyword = c);
			else if (typeof r == "object" && s === void 0) {
				if (s = r, c = s.keyword, Array.isArray(c) && !c.length) throw Error("addKeywords: keyword must be string or non-empty array");
			} else throw Error("invalid addKeywords parameters");
			if (L.call(this, c, s), !s) return (0, g.eachItem)(c, (r) => R.call(this, r)), this;
			B.call(this, s);
			let l = {
				...s,
				type: (0, h.getJSONTypes)(s.type),
				schemaType: (0, h.getJSONTypes)(s.schemaType)
			};
			return (0, g.eachItem)(c, l.type.length === 0 ? (r) => R.call(this, r, l) : (r) => l.type.forEach((s) => R.call(this, r, l, s))), this;
		}
		getKeyword(r) {
			let s = this.RULES.all[r];
			return typeof s == "object" ? s.definition : !!s;
		}
		removeKeyword(r) {
			let { RULES: s } = this;
			delete s.keywords[r], delete s.all[r];
			for (let c of s.rules) {
				let s = c.rules.findIndex((s) => s.keyword === r);
				s >= 0 && c.rules.splice(s, 1);
			}
			return this;
		}
		addFormat(r, s) {
			return typeof s == "string" && (s = new RegExp(s)), this.formats[r] = s, this;
		}
		errorsText(r = this.errors, { separator: s = ", ", dataVar: c = "data" } = {}) {
			return !r || r.length === 0 ? "No errors" : r.map((r) => `${c}${r.instancePath} ${r.message}`).reduce((r, c) => r + s + c);
		}
		$dataMetaSchema(r, s) {
			let c = this.RULES.all;
			r = JSON.parse(JSON.stringify(r));
			for (let l of s) {
				let s = l.split("/").slice(1), u = r;
				for (let r of s) u = u[r];
				for (let r in c) {
					let s = c[r];
					if (typeof s != "object") continue;
					let { $data: l } = s.definition, d = u[r];
					l && d && (u[r] = H(d));
				}
			}
			return r;
		}
		_removeAllSchemas(r, s) {
			for (let c in r) {
				let l = r[c];
				(!s || s.test(c)) && (typeof l == "string" ? delete r[c] : l && !l.meta && (this._cache.delete(l.schema), delete r[c]));
			}
		}
		_addSchema(r, s, c, l = this.opts.validateSchema, u = this.opts.addUsedSchema) {
			let d, { schemaId: p } = this.opts;
			if (typeof r == "object") d = r[p];
			else if (this.opts.jtd) throw Error("schema must be object");
			else if (typeof r != "boolean") throw Error("schema must be object or boolean");
			let h = this._cache.get(r);
			if (h !== void 0) return h;
			c = (0, m.normalizeId)(d || c);
			let g = m.getSchemaRefs.call(this, r, c);
			return h = new f.SchemaEnv({
				schema: r,
				schemaId: p,
				meta: s,
				baseId: c,
				localRefs: g
			}), this._cache.set(h.schema, h), u && !c.startsWith("#") && (c && this._checkUnique(c), this.refs[c] = h), l && this.validateSchema(r, !0), h;
		}
		_checkUnique(r) {
			if (this.schemas[r] || this.refs[r]) throw Error(`schema with key or id "${r}" already exists`);
		}
		_compileSchemaEnv(r) {
			/* istanbul ignore if */
			if (r.meta ? this._compileMetaSchema(r) : f.compileSchema.call(this, r), !r.validate) throw Error("ajv implementation error");
			return r.validate;
		}
		_compileMetaSchema(r) {
			let s = this.opts;
			this.opts = this._metaOpts;
			try {
				f.compileSchema.call(this, r);
			} finally {
				this.opts = s;
			}
		}
	};
	E.ValidationError = l.default, E.MissingRefError = u.default, r.default = E;
	function D(r, s, c, l = "error") {
		for (let u in r) {
			let d = u;
			d in s && this.logger[l](`${c}: option ${u}. ${r[d]}`);
		}
	}
	function O(r) {
		return r = (0, m.normalizeId)(r), this.schemas[r] || this.refs[r];
	}
	function k() {
		let r = this.opts.schemas;
		if (r) if (Array.isArray(r)) this.addSchema(r);
		else for (let s in r) this.addSchema(r[s], s);
	}
	function A() {
		for (let r in this.opts.formats) {
			let s = this.opts.formats[r];
			s && this.addFormat(r, s);
		}
	}
	function j(r) {
		if (Array.isArray(r)) {
			this.addVocabulary(r);
			return;
		}
		for (let s in this.logger.warn("keywords option as map is deprecated, pass array"), r) {
			let c = r[s];
			c.keyword ||= s, this.addKeyword(c);
		}
	}
	function N() {
		let r = { ...this.opts };
		for (let s of b) delete r[s];
		return r;
	}
	var P = {
		log() {},
		warn() {},
		error() {}
	};
	function F(r) {
		if (r === !1) return P;
		if (r === void 0) return console;
		if (r.log && r.warn && r.error) return r;
		throw Error("logger must implement log, warn and error methods");
	}
	var I = /^[a-z_$][a-z0-9_$:-]*$/i;
	function L(r, s) {
		let { RULES: c } = this;
		if ((0, g.eachItem)(r, (r) => {
			if (c.keywords[r]) throw Error(`Keyword ${r} is already defined`);
			if (!I.test(r)) throw Error(`Keyword ${r} has invalid name`);
		}), s && s.$data && !("code" in s || "validate" in s)) throw Error("$data keyword must have \"code\" or \"validate\" function");
	}
	function R(r, s, c) {
		var l;
		let u = s?.post;
		if (c && u) throw Error("keyword with \"post\" flag cannot have \"type\"");
		let { RULES: d } = this, f = u ? d.post : d.rules.find(({ type: r }) => r === c);
		if (f || (f = {
			type: c,
			rules: []
		}, d.rules.push(f)), d.keywords[r] = !0, !s) return;
		let p = {
			keyword: r,
			definition: {
				...s,
				type: (0, h.getJSONTypes)(s.type),
				schemaType: (0, h.getJSONTypes)(s.schemaType)
			}
		};
		s.before ? z.call(this, f, p, s.before) : f.rules.push(p), d.all[r] = p, (l = s.implements) == null || l.forEach((r) => this.addKeyword(r));
	}
	function z(r, s, c) {
		let l = r.rules.findIndex((r) => r.keyword === c);
		l >= 0 ? r.rules.splice(l, 0, s) : (r.rules.push(s), this.logger.warn(`rule ${c} is not defined`));
	}
	function B(r) {
		let { metaSchema: s } = r;
		s !== void 0 && (r.$data && this.opts.$data && (s = H(s)), r.validateSchema = this.compile(s, !0));
	}
	var V = { $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#" };
	function H(r) {
		return { anyOf: [r, V] };
	}
})), require_id = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.default = {
		keyword: "id",
		code() {
			throw Error("NOT SUPPORTED: keyword \"id\", use \"$id\" for schema ID");
		}
	};
})), require_ref = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.callRef = r.getValidate = void 0;
	var s = require_ref_error(), c = require_code(), l = require_codegen(), u = require_names(), d = require_compile(), f = require_util$1(), p = {
		keyword: "$ref",
		schemaType: "string",
		code(r) {
			let { gen: c, schema: u, it: f } = r, { baseId: p, schemaEnv: g, validateName: _, opts: v, self: y } = f, { root: b } = g;
			if ((u === "#" || u === "#/") && p === b.baseId) return S();
			let x = d.resolveRef.call(y, b, p, u);
			if (x === void 0) throw new s.default(f.opts.uriResolver, p, u);
			if (x instanceof d.SchemaEnv) return C(x);
			return w(x);
			function S() {
				if (g === b) return h(r, _, g, g.$async);
				let s = c.scopeValue("root", { ref: b });
				return h(r, (0, l._)`${s}.validate`, b, b.$async);
			}
			function C(s) {
				h(r, m(r, s), s, s.$async);
			}
			function w(s) {
				let d = c.scopeValue("schema", v.code.source === !0 ? {
					ref: s,
					code: (0, l.stringify)(s)
				} : { ref: s }), f = c.name("valid"), p = r.subschema({
					schema: s,
					dataTypes: [],
					schemaPath: l.nil,
					topSchemaRef: d,
					errSchemaPath: u
				}, f);
				r.mergeEvaluated(p), r.ok(f);
			}
		}
	};
	function m(r, s) {
		let { gen: c } = r;
		return s.validate ? c.scopeValue("validate", { ref: s.validate }) : (0, l._)`${c.scopeValue("wrapper", { ref: s })}.validate`;
	}
	r.getValidate = m;
	function h(r, s, d, p) {
		let { gen: m, it: h } = r, { allErrors: g, schemaEnv: _, opts: v } = h, y = v.passContext ? u.default.this : l.nil;
		p ? b() : x();
		function b() {
			if (!_.$async) throw Error("async schema referenced by sync schema");
			let u = m.let("valid");
			m.try(() => {
				m.code((0, l._)`await ${(0, c.callValidateCode)(r, s, y)}`), C(s), g || m.assign(u, !0);
			}, (r) => {
				m.if((0, l._)`!(${r} instanceof ${h.ValidationError})`, () => m.throw(r)), S(r), g || m.assign(u, !1);
			}), r.ok(u);
		}
		function x() {
			r.result((0, c.callValidateCode)(r, s, y), () => C(s), () => S(s));
		}
		function S(r) {
			let s = (0, l._)`${r}.errors`;
			m.assign(u.default.vErrors, (0, l._)`${u.default.vErrors} === null ? ${s} : ${u.default.vErrors}.concat(${s})`), m.assign(u.default.errors, (0, l._)`${u.default.vErrors}.length`);
		}
		function C(r) {
			if (!h.opts.unevaluated) return;
			let s = d?.validate?.evaluated;
			if (h.props !== !0) if (s && !s.dynamicProps) s.props !== void 0 && (h.props = f.mergeEvaluated.props(m, s.props, h.props));
			else {
				let s = m.var("props", (0, l._)`${r}.evaluated.props`);
				h.props = f.mergeEvaluated.props(m, s, h.props, l.Name);
			}
			if (h.items !== !0) if (s && !s.dynamicItems) s.items !== void 0 && (h.items = f.mergeEvaluated.items(m, s.items, h.items));
			else {
				let s = m.var("items", (0, l._)`${r}.evaluated.items`);
				h.items = f.mergeEvaluated.items(m, s, h.items, l.Name);
			}
		}
	}
	r.callRef = h, r.default = p;
})), require_core = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_id(), c = require_ref();
	r.default = [
		"$schema",
		"$id",
		"$defs",
		"$vocabulary",
		{ keyword: "$comment" },
		"definitions",
		s.default,
		c.default
	];
})), require_limitNumber = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_codegen(), c = s.operators, l = {
		maximum: {
			okStr: "<=",
			ok: c.LTE,
			fail: c.GT
		},
		minimum: {
			okStr: ">=",
			ok: c.GTE,
			fail: c.LT
		},
		exclusiveMaximum: {
			okStr: "<",
			ok: c.LT,
			fail: c.GTE
		},
		exclusiveMinimum: {
			okStr: ">",
			ok: c.GT,
			fail: c.LTE
		}
	};
	r.default = {
		keyword: Object.keys(l),
		type: "number",
		schemaType: "number",
		$data: !0,
		error: {
			message: ({ keyword: r, schemaCode: c }) => (0, s.str)`must be ${l[r].okStr} ${c}`,
			params: ({ keyword: r, schemaCode: c }) => (0, s._)`{comparison: ${l[r].okStr}, limit: ${c}}`
		},
		code(r) {
			let { keyword: c, data: u, schemaCode: d } = r;
			r.fail$data((0, s._)`${u} ${l[c].fail} ${d} || isNaN(${u})`);
		}
	};
})), require_multipleOf = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_codegen();
	r.default = {
		keyword: "multipleOf",
		type: "number",
		schemaType: "number",
		$data: !0,
		error: {
			message: ({ schemaCode: r }) => (0, s.str)`must be multiple of ${r}`,
			params: ({ schemaCode: r }) => (0, s._)`{multipleOf: ${r}}`
		},
		code(r) {
			let { gen: c, data: l, schemaCode: u, it: d } = r, f = d.opts.multipleOfPrecision, p = c.let("res"), m = f ? (0, s._)`Math.abs(Math.round(${p}) - ${p}) > 1e-${f}` : (0, s._)`${p} !== parseInt(${p})`;
			r.fail$data((0, s._)`(${u} === 0 || (${p} = ${l}/${u}, ${m}))`);
		}
	};
})), require_ucs2length = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	function s(r) {
		let s = r.length, c = 0, l = 0, u;
		for (; l < s;) c++, u = r.charCodeAt(l++), u >= 55296 && u <= 56319 && l < s && (u = r.charCodeAt(l), (u & 64512) == 56320 && l++);
		return c;
	}
	r.default = s, s.code = "require(\"ajv/dist/runtime/ucs2length\").default";
})), require_limitLength = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_codegen(), c = require_util$1(), l = require_ucs2length();
	r.default = {
		keyword: ["maxLength", "minLength"],
		type: "string",
		schemaType: "number",
		$data: !0,
		error: {
			message({ keyword: r, schemaCode: c }) {
				let l = r === "maxLength" ? "more" : "fewer";
				return (0, s.str)`must NOT have ${l} than ${c} characters`;
			},
			params: ({ schemaCode: r }) => (0, s._)`{limit: ${r}}`
		},
		code(r) {
			let { keyword: u, data: d, schemaCode: f, it: p } = r, m = u === "maxLength" ? s.operators.GT : s.operators.LT, h = p.opts.unicode === !1 ? (0, s._)`${d}.length` : (0, s._)`${(0, c.useFunc)(r.gen, l.default)}(${d})`;
			r.fail$data((0, s._)`${h} ${m} ${f}`);
		}
	};
})), require_pattern = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_code(), c = require_codegen();
	r.default = {
		keyword: "pattern",
		type: "string",
		schemaType: "string",
		$data: !0,
		error: {
			message: ({ schemaCode: r }) => (0, c.str)`must match pattern "${r}"`,
			params: ({ schemaCode: r }) => (0, c._)`{pattern: ${r}}`
		},
		code(r) {
			let { data: l, $data: u, schema: d, schemaCode: f, it: p } = r, m = p.opts.unicodeRegExp ? "u" : "", h = u ? (0, c._)`(new RegExp(${f}, ${m}))` : (0, s.usePattern)(r, d);
			r.fail$data((0, c._)`!${h}.test(${l})`);
		}
	};
})), require_limitProperties = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_codegen();
	r.default = {
		keyword: ["maxProperties", "minProperties"],
		type: "object",
		schemaType: "number",
		$data: !0,
		error: {
			message({ keyword: r, schemaCode: c }) {
				let l = r === "maxProperties" ? "more" : "fewer";
				return (0, s.str)`must NOT have ${l} than ${c} properties`;
			},
			params: ({ schemaCode: r }) => (0, s._)`{limit: ${r}}`
		},
		code(r) {
			let { keyword: c, data: l, schemaCode: u } = r, d = c === "maxProperties" ? s.operators.GT : s.operators.LT;
			r.fail$data((0, s._)`Object.keys(${l}).length ${d} ${u}`);
		}
	};
})), require_required = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_code(), c = require_codegen(), l = require_util$1();
	r.default = {
		keyword: "required",
		type: "object",
		schemaType: "array",
		$data: !0,
		error: {
			message: ({ params: { missingProperty: r } }) => (0, c.str)`must have required property '${r}'`,
			params: ({ params: { missingProperty: r } }) => (0, c._)`{missingProperty: ${r}}`
		},
		code(r) {
			let { gen: u, schema: d, schemaCode: f, data: p, $data: m, it: h } = r, { opts: g } = h;
			if (!m && d.length === 0) return;
			let _ = d.length >= g.loopRequired;
			if (h.allErrors ? v() : y(), g.strictRequired) {
				let s = r.parentSchema.properties, { definedProperties: c } = r.it;
				for (let r of d) if (s?.[r] === void 0 && !c.has(r)) {
					let s = `required property "${r}" is not defined at "${h.schemaEnv.baseId + h.errSchemaPath}" (strictRequired)`;
					(0, l.checkStrictMode)(h, s, h.opts.strictRequired);
				}
			}
			function v() {
				if (_ || m) r.block$data(c.nil, b);
				else for (let c of d) (0, s.checkReportMissingProp)(r, c);
			}
			function y() {
				let c = u.let("missing");
				if (_ || m) {
					let s = u.let("valid", !0);
					r.block$data(s, () => x(c, s)), r.ok(s);
				} else u.if((0, s.checkMissingProp)(r, d, c)), (0, s.reportMissingProp)(r, c), u.else();
			}
			function b() {
				u.forOf("prop", f, (c) => {
					r.setParams({ missingProperty: c }), u.if((0, s.noPropertyInData)(u, p, c, g.ownProperties), () => r.error());
				});
			}
			function x(l, d) {
				r.setParams({ missingProperty: l }), u.forOf(l, f, () => {
					u.assign(d, (0, s.propertyInData)(u, p, l, g.ownProperties)), u.if((0, c.not)(d), () => {
						r.error(), u.break();
					});
				}, c.nil);
			}
		}
	};
})), require_limitItems = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_codegen();
	r.default = {
		keyword: ["maxItems", "minItems"],
		type: "array",
		schemaType: "number",
		$data: !0,
		error: {
			message({ keyword: r, schemaCode: c }) {
				let l = r === "maxItems" ? "more" : "fewer";
				return (0, s.str)`must NOT have ${l} than ${c} items`;
			},
			params: ({ schemaCode: r }) => (0, s._)`{limit: ${r}}`
		},
		code(r) {
			let { keyword: c, data: l, schemaCode: u } = r, d = c === "maxItems" ? s.operators.GT : s.operators.LT;
			r.fail$data((0, s._)`${l}.length ${d} ${u}`);
		}
	};
})), require_equal = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_fast_deep_equal();
	s.code = "require(\"ajv/dist/runtime/equal\").default", r.default = s;
})), require_uniqueItems = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_dataType(), c = require_codegen(), l = require_util$1(), u = require_equal();
	r.default = {
		keyword: "uniqueItems",
		type: "array",
		schemaType: "boolean",
		$data: !0,
		error: {
			message: ({ params: { i: r, j: s } }) => (0, c.str)`must NOT have duplicate items (items ## ${s} and ${r} are identical)`,
			params: ({ params: { i: r, j: s } }) => (0, c._)`{i: ${r}, j: ${s}}`
		},
		code(r) {
			let { gen: d, data: f, $data: p, schema: m, parentSchema: h, schemaCode: g, it: _ } = r;
			if (!p && !m) return;
			let v = d.let("valid"), y = h.items ? (0, s.getSchemaTypes)(h.items) : [];
			r.block$data(v, b, (0, c._)`${g} === false`), r.ok(v);
			function b() {
				let s = d.let("i", (0, c._)`${f}.length`), l = d.let("j");
				r.setParams({
					i: s,
					j: l
				}), d.assign(v, !0), d.if((0, c._)`${s} > 1`, () => (x() ? S : C)(s, l));
			}
			function x() {
				return y.length > 0 && !y.some((r) => r === "object" || r === "array");
			}
			function S(l, u) {
				let p = d.name("item"), m = (0, s.checkDataTypes)(y, p, _.opts.strictNumbers, s.DataType.Wrong), h = d.const("indices", (0, c._)`{}`);
				d.for((0, c._)`;${l}--;`, () => {
					d.let(p, (0, c._)`${f}[${l}]`), d.if(m, (0, c._)`continue`), y.length > 1 && d.if((0, c._)`typeof ${p} == "string"`, (0, c._)`${p} += "_"`), d.if((0, c._)`typeof ${h}[${p}] == "number"`, () => {
						d.assign(u, (0, c._)`${h}[${p}]`), r.error(), d.assign(v, !1).break();
					}).code((0, c._)`${h}[${p}] = ${l}`);
				});
			}
			function C(s, p) {
				let m = (0, l.useFunc)(d, u.default), h = d.name("outer");
				d.label(h).for((0, c._)`;${s}--;`, () => d.for((0, c._)`${p} = ${s}; ${p}--;`, () => d.if((0, c._)`${m}(${f}[${s}], ${f}[${p}])`, () => {
					r.error(), d.assign(v, !1).break(h);
				})));
			}
		}
	};
})), require_const = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_codegen(), c = require_util$1(), l = require_equal();
	r.default = {
		keyword: "const",
		$data: !0,
		error: {
			message: "must be equal to constant",
			params: ({ schemaCode: r }) => (0, s._)`{allowedValue: ${r}}`
		},
		code(r) {
			let { gen: u, data: d, $data: f, schemaCode: p, schema: m } = r;
			f || m && typeof m == "object" ? r.fail$data((0, s._)`!${(0, c.useFunc)(u, l.default)}(${d}, ${p})`) : r.fail((0, s._)`${m} !== ${d}`);
		}
	};
})), require_enum = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_codegen(), c = require_util$1(), l = require_equal();
	r.default = {
		keyword: "enum",
		schemaType: "array",
		$data: !0,
		error: {
			message: "must be equal to one of the allowed values",
			params: ({ schemaCode: r }) => (0, s._)`{allowedValues: ${r}}`
		},
		code(r) {
			let { gen: u, data: d, $data: f, schema: p, schemaCode: m, it: h } = r;
			if (!f && p.length === 0) throw Error("enum must have non-empty array");
			let g = p.length >= h.opts.loopEnum, _, v = () => _ ??= (0, c.useFunc)(u, l.default), y;
			if (g || f) y = u.let("valid"), r.block$data(y, b);
			else {
				/* istanbul ignore if */
				if (!Array.isArray(p)) throw Error("ajv implementation error");
				let r = u.const("vSchema", m);
				y = (0, s.or)(...p.map((s, c) => x(r, c)));
			}
			r.pass(y);
			function b() {
				u.assign(y, !1), u.forOf("v", m, (r) => u.if((0, s._)`${v()}(${d}, ${r})`, () => u.assign(y, !0).break()));
			}
			function x(r, c) {
				let l = p[c];
				return typeof l == "object" && l ? (0, s._)`${v()}(${d}, ${r}[${c}])` : (0, s._)`${d} === ${l}`;
			}
		}
	};
})), require_validation = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_limitNumber(), c = require_multipleOf(), l = require_limitLength(), u = require_pattern(), d = require_limitProperties(), f = require_required(), p = require_limitItems(), m = require_uniqueItems(), h = require_const(), g = require_enum();
	r.default = [
		s.default,
		c.default,
		l.default,
		u.default,
		d.default,
		f.default,
		p.default,
		m.default,
		{
			keyword: "type",
			schemaType: ["string", "array"]
		},
		{
			keyword: "nullable",
			schemaType: "boolean"
		},
		h.default,
		g.default
	];
})), require_additionalItems = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.validateAdditionalItems = void 0;
	var s = require_codegen(), c = require_util$1(), l = {
		keyword: "additionalItems",
		type: "array",
		schemaType: ["boolean", "object"],
		before: "uniqueItems",
		error: {
			message: ({ params: { len: r } }) => (0, s.str)`must NOT have more than ${r} items`,
			params: ({ params: { len: r } }) => (0, s._)`{limit: ${r}}`
		},
		code(r) {
			let { parentSchema: s, it: l } = r, { items: d } = s;
			if (!Array.isArray(d)) {
				(0, c.checkStrictMode)(l, "\"additionalItems\" is ignored when \"items\" is not an array of schemas");
				return;
			}
			u(r, d);
		}
	};
	function u(r, l) {
		let { gen: u, schema: d, data: f, keyword: p, it: m } = r;
		m.items = !0;
		let h = u.const("len", (0, s._)`${f}.length`);
		if (d === !1) r.setParams({ len: l.length }), r.pass((0, s._)`${h} <= ${l.length}`);
		else if (typeof d == "object" && !(0, c.alwaysValidSchema)(m, d)) {
			let c = u.var("valid", (0, s._)`${h} <= ${l.length}`);
			u.if((0, s.not)(c), () => g(c)), r.ok(c);
		}
		function g(d) {
			u.forRange("i", l.length, h, (l) => {
				r.subschema({
					keyword: p,
					dataProp: l,
					dataPropType: c.Type.Num
				}, d), m.allErrors || u.if((0, s.not)(d), () => u.break());
			});
		}
	}
	r.validateAdditionalItems = u, r.default = l;
})), require_items = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.validateTuple = void 0;
	var s = require_codegen(), c = require_util$1(), l = require_code(), u = {
		keyword: "items",
		type: "array",
		schemaType: [
			"object",
			"array",
			"boolean"
		],
		before: "uniqueItems",
		code(r) {
			let { schema: s, it: u } = r;
			if (Array.isArray(s)) return d(r, "additionalItems", s);
			u.items = !0, !(0, c.alwaysValidSchema)(u, s) && r.ok((0, l.validateArray)(r));
		}
	};
	function d(r, l, u = r.schema) {
		let { gen: d, parentSchema: f, data: p, keyword: m, it: h } = r;
		v(f), h.opts.unevaluated && u.length && h.items !== !0 && (h.items = c.mergeEvaluated.items(d, u.length, h.items));
		let g = d.name("valid"), _ = d.const("len", (0, s._)`${p}.length`);
		u.forEach((l, u) => {
			(0, c.alwaysValidSchema)(h, l) || (d.if((0, s._)`${_} > ${u}`, () => r.subschema({
				keyword: m,
				schemaProp: u,
				dataProp: u
			}, g)), r.ok(g));
		});
		function v(r) {
			let { opts: s, errSchemaPath: d } = h, f = u.length, p = f === r.minItems && (f === r.maxItems || r[l] === !1);
			if (s.strictTuples && !p) {
				let r = `"${m}" is ${f}-tuple, but minItems or maxItems/${l} are not specified or different at path "${d}"`;
				(0, c.checkStrictMode)(h, r, s.strictTuples);
			}
		}
	}
	r.validateTuple = d, r.default = u;
})), require_prefixItems = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_items();
	r.default = {
		keyword: "prefixItems",
		type: "array",
		schemaType: ["array"],
		before: "uniqueItems",
		code: (r) => (0, s.validateTuple)(r, "items")
	};
})), require_items2020 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_codegen(), c = require_util$1(), l = require_code(), u = require_additionalItems();
	r.default = {
		keyword: "items",
		type: "array",
		schemaType: ["object", "boolean"],
		before: "uniqueItems",
		error: {
			message: ({ params: { len: r } }) => (0, s.str)`must NOT have more than ${r} items`,
			params: ({ params: { len: r } }) => (0, s._)`{limit: ${r}}`
		},
		code(r) {
			let { schema: s, parentSchema: d, it: f } = r, { prefixItems: p } = d;
			f.items = !0, !(0, c.alwaysValidSchema)(f, s) && (p ? (0, u.validateAdditionalItems)(r, p) : r.ok((0, l.validateArray)(r)));
		}
	};
})), require_contains = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_codegen(), c = require_util$1();
	r.default = {
		keyword: "contains",
		type: "array",
		schemaType: ["object", "boolean"],
		before: "uniqueItems",
		trackErrors: !0,
		error: {
			message: ({ params: { min: r, max: c } }) => c === void 0 ? (0, s.str)`must contain at least ${r} valid item(s)` : (0, s.str)`must contain at least ${r} and no more than ${c} valid item(s)`,
			params: ({ params: { min: r, max: c } }) => c === void 0 ? (0, s._)`{minContains: ${r}}` : (0, s._)`{minContains: ${r}, maxContains: ${c}}`
		},
		code(r) {
			let { gen: l, schema: u, parentSchema: d, data: f, it: p } = r, m, h, { minContains: g, maxContains: _ } = d;
			p.opts.next ? (m = g === void 0 ? 1 : g, h = _) : m = 1;
			let v = l.const("len", (0, s._)`${f}.length`);
			if (r.setParams({
				min: m,
				max: h
			}), h === void 0 && m === 0) {
				(0, c.checkStrictMode)(p, "\"minContains\" == 0 without \"maxContains\": \"contains\" keyword ignored");
				return;
			}
			if (h !== void 0 && m > h) {
				(0, c.checkStrictMode)(p, "\"minContains\" > \"maxContains\" is always invalid"), r.fail();
				return;
			}
			if ((0, c.alwaysValidSchema)(p, u)) {
				let c = (0, s._)`${v} >= ${m}`;
				h !== void 0 && (c = (0, s._)`${c} && ${v} <= ${h}`), r.pass(c);
				return;
			}
			p.items = !0;
			let y = l.name("valid");
			h === void 0 && m === 1 ? x(y, () => l.if(y, () => l.break())) : m === 0 ? (l.let(y, !0), h !== void 0 && l.if((0, s._)`${f}.length > 0`, b)) : (l.let(y, !1), b()), r.result(y, () => r.reset());
			function b() {
				let r = l.name("_valid"), s = l.let("count", 0);
				x(r, () => l.if(r, () => S(s)));
			}
			function x(s, u) {
				l.forRange("i", 0, v, (l) => {
					r.subschema({
						keyword: "contains",
						dataProp: l,
						dataPropType: c.Type.Num,
						compositeRule: !0
					}, s), u();
				});
			}
			function S(r) {
				l.code((0, s._)`${r}++`), h === void 0 ? l.if((0, s._)`${r} >= ${m}`, () => l.assign(y, !0).break()) : (l.if((0, s._)`${r} > ${h}`, () => l.assign(y, !1).break()), m === 1 ? l.assign(y, !0) : l.if((0, s._)`${r} >= ${m}`, () => l.assign(y, !0)));
			}
		}
	};
})), require_dependencies = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.validateSchemaDeps = r.validatePropertyDeps = r.error = void 0;
	var s = require_codegen(), c = require_util$1(), l = require_code();
	r.error = {
		message: ({ params: { property: r, depsCount: c, deps: l } }) => {
			let u = c === 1 ? "property" : "properties";
			return (0, s.str)`must have ${u} ${l} when property ${r} is present`;
		},
		params: ({ params: { property: r, depsCount: c, deps: l, missingProperty: u } }) => (0, s._)`{property: ${r},
    missingProperty: ${u},
    depsCount: ${c},
    deps: ${l}}`
	};
	var u = {
		keyword: "dependencies",
		type: "object",
		schemaType: "object",
		error: r.error,
		code(r) {
			let [s, c] = d(r);
			f(r, s), p(r, c);
		}
	};
	function d({ schema: r }) {
		let s = {}, c = {};
		for (let l in r) {
			if (l === "__proto__") continue;
			let u = Array.isArray(r[l]) ? s : c;
			u[l] = r[l];
		}
		return [s, c];
	}
	function f(r, c = r.schema) {
		let { gen: u, data: d, it: f } = r;
		if (Object.keys(c).length === 0) return;
		let p = u.let("missing");
		for (let m in c) {
			let h = c[m];
			if (h.length === 0) continue;
			let g = (0, l.propertyInData)(u, d, m, f.opts.ownProperties);
			r.setParams({
				property: m,
				depsCount: h.length,
				deps: h.join(", ")
			}), f.allErrors ? u.if(g, () => {
				for (let s of h) (0, l.checkReportMissingProp)(r, s);
			}) : (u.if((0, s._)`${g} && (${(0, l.checkMissingProp)(r, h, p)})`), (0, l.reportMissingProp)(r, p), u.else());
		}
	}
	r.validatePropertyDeps = f;
	function p(r, s = r.schema) {
		let { gen: u, data: d, keyword: f, it: p } = r, m = u.name("valid");
		for (let h in s) (0, c.alwaysValidSchema)(p, s[h]) || (u.if((0, l.propertyInData)(u, d, h, p.opts.ownProperties), () => {
			let s = r.subschema({
				keyword: f,
				schemaProp: h
			}, m);
			r.mergeValidEvaluated(s, m);
		}, () => u.var(m, !0)), r.ok(m));
	}
	r.validateSchemaDeps = p, r.default = u;
})), require_propertyNames = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_codegen(), c = require_util$1();
	r.default = {
		keyword: "propertyNames",
		type: "object",
		schemaType: ["object", "boolean"],
		error: {
			message: "property name must be valid",
			params: ({ params: r }) => (0, s._)`{propertyName: ${r.propertyName}}`
		},
		code(r) {
			let { gen: l, schema: u, data: d, it: f } = r;
			if ((0, c.alwaysValidSchema)(f, u)) return;
			let p = l.name("valid");
			l.forIn("key", d, (c) => {
				r.setParams({ propertyName: c }), r.subschema({
					keyword: "propertyNames",
					data: c,
					dataTypes: ["string"],
					propertyName: c,
					compositeRule: !0
				}, p), l.if((0, s.not)(p), () => {
					r.error(!0), f.allErrors || l.break();
				});
			}), r.ok(p);
		}
	};
})), require_additionalProperties = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_code(), c = require_codegen(), l = require_names(), u = require_util$1();
	r.default = {
		keyword: "additionalProperties",
		type: ["object"],
		schemaType: ["boolean", "object"],
		allowUndefined: !0,
		trackErrors: !0,
		error: {
			message: "must NOT have additional properties",
			params: ({ params: r }) => (0, c._)`{additionalProperty: ${r.additionalProperty}}`
		},
		code(r) {
			let { gen: d, schema: f, parentSchema: p, data: m, errsCount: h, it: g } = r;
			/* istanbul ignore if */
			if (!h) throw Error("ajv implementation error");
			let { allErrors: _, opts: v } = g;
			if (g.props = !0, v.removeAdditional !== "all" && (0, u.alwaysValidSchema)(g, f)) return;
			let y = (0, s.allSchemaProperties)(p.properties), b = (0, s.allSchemaProperties)(p.patternProperties);
			x(), r.ok((0, c._)`${h} === ${l.default.errors}`);
			function x() {
				d.forIn("key", m, (r) => {
					!y.length && !b.length ? w(r) : d.if(S(r), () => w(r));
				});
			}
			function S(l) {
				let f;
				if (y.length > 8) {
					let r = (0, u.schemaRefOrVal)(g, p.properties, "properties");
					f = (0, s.isOwnProperty)(d, r, l);
				} else f = y.length ? (0, c.or)(...y.map((r) => (0, c._)`${l} === ${r}`)) : c.nil;
				return b.length && (f = (0, c.or)(f, ...b.map((u) => (0, c._)`${(0, s.usePattern)(r, u)}.test(${l})`))), (0, c.not)(f);
			}
			function C(r) {
				d.code((0, c._)`delete ${m}[${r}]`);
			}
			function w(s) {
				if (v.removeAdditional === "all" || v.removeAdditional && f === !1) {
					C(s);
					return;
				}
				if (f === !1) {
					r.setParams({ additionalProperty: s }), r.error(), _ || d.break();
					return;
				}
				if (typeof f == "object" && !(0, u.alwaysValidSchema)(g, f)) {
					let l = d.name("valid");
					v.removeAdditional === "failing" ? (T(s, l, !1), d.if((0, c.not)(l), () => {
						r.reset(), C(s);
					})) : (T(s, l), _ || d.if((0, c.not)(l), () => d.break()));
				}
			}
			function T(s, c, l) {
				let d = {
					keyword: "additionalProperties",
					dataProp: s,
					dataPropType: u.Type.Str
				};
				l === !1 && Object.assign(d, {
					compositeRule: !0,
					createErrors: !1,
					allErrors: !1
				}), r.subschema(d, c);
			}
		}
	};
})), require_properties = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_validate(), c = require_code(), l = require_util$1(), u = require_additionalProperties();
	r.default = {
		keyword: "properties",
		type: "object",
		schemaType: "object",
		code(r) {
			let { gen: d, schema: f, parentSchema: p, data: m, it: h } = r;
			h.opts.removeAdditional === "all" && p.additionalProperties === void 0 && u.default.code(new s.KeywordCxt(h, u.default, "additionalProperties"));
			let g = (0, c.allSchemaProperties)(f);
			for (let r of g) h.definedProperties.add(r);
			h.opts.unevaluated && g.length && h.props !== !0 && (h.props = l.mergeEvaluated.props(d, (0, l.toHash)(g), h.props));
			let _ = g.filter((r) => !(0, l.alwaysValidSchema)(h, f[r]));
			if (_.length === 0) return;
			let v = d.name("valid");
			for (let s of _) y(s) ? b(s) : (d.if((0, c.propertyInData)(d, m, s, h.opts.ownProperties)), b(s), h.allErrors || d.else().var(v, !0), d.endIf()), r.it.definedProperties.add(s), r.ok(v);
			function y(r) {
				return h.opts.useDefaults && !h.compositeRule && f[r].default !== void 0;
			}
			function b(s) {
				r.subschema({
					keyword: "properties",
					schemaProp: s,
					dataProp: s
				}, v);
			}
		}
	};
})), require_patternProperties = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_code(), c = require_codegen(), l = require_util$1(), u = require_util$1();
	r.default = {
		keyword: "patternProperties",
		type: "object",
		schemaType: "object",
		code(r) {
			let { gen: d, schema: f, data: p, parentSchema: m, it: h } = r, { opts: g } = h, _ = (0, s.allSchemaProperties)(f), v = _.filter((r) => (0, l.alwaysValidSchema)(h, f[r]));
			if (_.length === 0 || v.length === _.length && (!h.opts.unevaluated || h.props === !0)) return;
			let y = g.strictSchema && !g.allowMatchingProperties && m.properties, b = d.name("valid");
			h.props !== !0 && !(h.props instanceof c.Name) && (h.props = (0, u.evaluatedPropsToName)(d, h.props));
			let { props: x } = h;
			S();
			function S() {
				for (let r of _) y && C(r), h.allErrors ? w(r) : (d.var(b, !0), w(r), d.if(b));
			}
			function C(r) {
				for (let s in y) new RegExp(r).test(s) && (0, l.checkStrictMode)(h, `property ${s} matches pattern ${r} (use allowMatchingProperties)`);
			}
			function w(l) {
				d.forIn("key", p, (f) => {
					d.if((0, c._)`${(0, s.usePattern)(r, l)}.test(${f})`, () => {
						let s = v.includes(l);
						s || r.subschema({
							keyword: "patternProperties",
							schemaProp: l,
							dataProp: f,
							dataPropType: u.Type.Str
						}, b), h.opts.unevaluated && x !== !0 ? d.assign((0, c._)`${x}[${f}]`, !0) : !s && !h.allErrors && d.if((0, c.not)(b), () => d.break());
					});
				});
			}
		}
	};
})), require_not = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_util$1();
	r.default = {
		keyword: "not",
		schemaType: ["object", "boolean"],
		trackErrors: !0,
		code(r) {
			let { gen: c, schema: l, it: u } = r;
			if ((0, s.alwaysValidSchema)(u, l)) {
				r.fail();
				return;
			}
			let d = c.name("valid");
			r.subschema({
				keyword: "not",
				compositeRule: !0,
				createErrors: !1,
				allErrors: !1
			}, d), r.failResult(d, () => r.reset(), () => r.error());
		},
		error: { message: "must NOT be valid" }
	};
})), require_anyOf = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.default = {
		keyword: "anyOf",
		schemaType: "array",
		trackErrors: !0,
		code: require_code().validateUnion,
		error: { message: "must match a schema in anyOf" }
	};
})), require_oneOf = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_codegen(), c = require_util$1();
	r.default = {
		keyword: "oneOf",
		schemaType: "array",
		trackErrors: !0,
		error: {
			message: "must match exactly one schema in oneOf",
			params: ({ params: r }) => (0, s._)`{passingSchemas: ${r.passing}}`
		},
		code(r) {
			let { gen: l, schema: u, parentSchema: d, it: f } = r;
			/* istanbul ignore if */
			if (!Array.isArray(u)) throw Error("ajv implementation error");
			if (f.opts.discriminator && d.discriminator) return;
			let p = u, m = l.let("valid", !1), h = l.let("passing", null), g = l.name("_valid");
			r.setParams({ passing: h }), l.block(_), r.result(m, () => r.reset(), () => r.error(!0));
			function _() {
				p.forEach((u, d) => {
					let p;
					(0, c.alwaysValidSchema)(f, u) ? l.var(g, !0) : p = r.subschema({
						keyword: "oneOf",
						schemaProp: d,
						compositeRule: !0
					}, g), d > 0 && l.if((0, s._)`${g} && ${m}`).assign(m, !1).assign(h, (0, s._)`[${h}, ${d}]`).else(), l.if(g, () => {
						l.assign(m, !0), l.assign(h, d), p && r.mergeEvaluated(p, s.Name);
					});
				});
			}
		}
	};
})), require_allOf = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_util$1();
	r.default = {
		keyword: "allOf",
		schemaType: "array",
		code(r) {
			let { gen: c, schema: l, it: u } = r;
			/* istanbul ignore if */
			if (!Array.isArray(l)) throw Error("ajv implementation error");
			let d = c.name("valid");
			l.forEach((c, l) => {
				if ((0, s.alwaysValidSchema)(u, c)) return;
				let f = r.subschema({
					keyword: "allOf",
					schemaProp: l
				}, d);
				r.ok(d), r.mergeEvaluated(f);
			});
		}
	};
})), require_if = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_codegen(), c = require_util$1(), l = {
		keyword: "if",
		schemaType: ["object", "boolean"],
		trackErrors: !0,
		error: {
			message: ({ params: r }) => (0, s.str)`must match "${r.ifClause}" schema`,
			params: ({ params: r }) => (0, s._)`{failingKeyword: ${r.ifClause}}`
		},
		code(r) {
			let { gen: l, parentSchema: d, it: f } = r;
			d.then === void 0 && d.else === void 0 && (0, c.checkStrictMode)(f, "\"if\" without \"then\" and \"else\" is ignored");
			let p = u(f, "then"), m = u(f, "else");
			if (!p && !m) return;
			let h = l.let("valid", !0), g = l.name("_valid");
			if (_(), r.reset(), p && m) {
				let s = l.let("ifClause");
				r.setParams({ ifClause: s }), l.if(g, v("then", s), v("else", s));
			} else p ? l.if(g, v("then")) : l.if((0, s.not)(g), v("else"));
			r.pass(h, () => r.error(!0));
			function _() {
				let s = r.subschema({
					keyword: "if",
					compositeRule: !0,
					createErrors: !1,
					allErrors: !1
				}, g);
				r.mergeEvaluated(s);
			}
			function v(c, u) {
				return () => {
					let d = r.subschema({ keyword: c }, g);
					l.assign(h, g), r.mergeValidEvaluated(d, h), u ? l.assign(u, (0, s._)`${c}`) : r.setParams({ ifClause: c });
				};
			}
		}
	};
	function u(r, s) {
		let l = r.schema[s];
		return l !== void 0 && !(0, c.alwaysValidSchema)(r, l);
	}
	r.default = l;
})), require_thenElse = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_util$1();
	r.default = {
		keyword: ["then", "else"],
		schemaType: ["object", "boolean"],
		code({ keyword: r, parentSchema: c, it: l }) {
			c.if === void 0 && (0, s.checkStrictMode)(l, `"${r}" without "if" is ignored`);
		}
	};
})), require_applicator = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_additionalItems(), c = require_prefixItems(), l = require_items(), u = require_items2020(), d = require_contains(), f = require_dependencies(), p = require_propertyNames(), m = require_additionalProperties(), h = require_properties(), g = require_patternProperties(), _ = require_not(), v = require_anyOf(), y = require_oneOf(), b = require_allOf(), x = require_if(), S = require_thenElse();
	function C(r = !1) {
		let C = [
			_.default,
			v.default,
			y.default,
			b.default,
			x.default,
			S.default,
			p.default,
			m.default,
			f.default,
			h.default,
			g.default
		];
		return r ? C.push(c.default, u.default) : C.push(s.default, l.default), C.push(d.default), C;
	}
	r.default = C;
})), require_format$1 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_codegen();
	r.default = {
		keyword: "format",
		type: ["number", "string"],
		schemaType: "string",
		$data: !0,
		error: {
			message: ({ schemaCode: r }) => (0, s.str)`must match format "${r}"`,
			params: ({ schemaCode: r }) => (0, s._)`{format: ${r}}`
		},
		code(r, c) {
			let { gen: l, data: u, $data: d, schema: f, schemaCode: p, it: m } = r, { opts: h, errSchemaPath: g, schemaEnv: _, self: v } = m;
			if (!h.validateFormats) return;
			d ? y() : b();
			function y() {
				let d = l.scopeValue("formats", {
					ref: v.formats,
					code: h.code.formats
				}), f = l.const("fDef", (0, s._)`${d}[${p}]`), m = l.let("fType"), g = l.let("format");
				l.if((0, s._)`typeof ${f} == "object" && !(${f} instanceof RegExp)`, () => l.assign(m, (0, s._)`${f}.type || "string"`).assign(g, (0, s._)`${f}.validate`), () => l.assign(m, (0, s._)`"string"`).assign(g, f)), r.fail$data((0, s.or)(y(), b()));
				function y() {
					return h.strictSchema === !1 ? s.nil : (0, s._)`${p} && !${g}`;
				}
				function b() {
					let r = _.$async ? (0, s._)`(${f}.async ? await ${g}(${u}) : ${g}(${u}))` : (0, s._)`${g}(${u})`, l = (0, s._)`(typeof ${g} == "function" ? ${r} : ${g}.test(${u}))`;
					return (0, s._)`${g} && ${g} !== true && ${m} === ${c} && !${l}`;
				}
			}
			function b() {
				let d = v.formats[f];
				if (!d) {
					b();
					return;
				}
				if (d === !0) return;
				let [p, m, y] = x(d);
				p === c && r.pass(S());
				function b() {
					if (h.strictSchema === !1) {
						v.logger.warn(r());
						return;
					}
					throw Error(r());
					function r() {
						return `unknown format "${f}" ignored in schema at path "${g}"`;
					}
				}
				function x(r) {
					let c = r instanceof RegExp ? (0, s.regexpCode)(r) : h.code.formats ? (0, s._)`${h.code.formats}${(0, s.getProperty)(f)}` : void 0, u = l.scopeValue("formats", {
						key: f,
						ref: r,
						code: c
					});
					return typeof r == "object" && !(r instanceof RegExp) ? [
						r.type || "string",
						r.validate,
						(0, s._)`${u}.validate`
					] : [
						"string",
						r,
						u
					];
				}
				function S() {
					if (typeof d == "object" && !(d instanceof RegExp) && d.async) {
						if (!_.$async) throw Error("async format in sync schema");
						return (0, s._)`await ${y}(${u})`;
					}
					return typeof m == "function" ? (0, s._)`${y}(${u})` : (0, s._)`${y}.test(${u})`;
				}
			}
		}
	};
})), require_format = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.default = [require_format$1().default];
})), require_metadata = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.contentVocabulary = r.metadataVocabulary = void 0, r.metadataVocabulary = [
		"title",
		"description",
		"default",
		"deprecated",
		"readOnly",
		"writeOnly",
		"examples"
	], r.contentVocabulary = [
		"contentMediaType",
		"contentEncoding",
		"contentSchema"
	];
})), require_draft7 = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_core(), c = require_validation(), l = require_applicator(), u = require_format(), d = require_metadata();
	r.default = [
		s.default,
		c.default,
		(0, l.default)(),
		u.default,
		d.metadataVocabulary,
		d.contentVocabulary
	];
})), require_types = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.DiscrError = void 0;
	var s;
	(function(r) {
		r.Tag = "tag", r.Mapping = "mapping";
	})(s || (r.DiscrError = s = {}));
})), require_discriminator = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var s = require_codegen(), c = require_types(), l = require_compile(), u = require_ref_error(), d = require_util$1();
	r.default = {
		keyword: "discriminator",
		type: "object",
		schemaType: "object",
		error: {
			message: ({ params: { discrError: r, tagName: s } }) => r === c.DiscrError.Tag ? `tag "${s}" must be string` : `value of tag "${s}" must be in oneOf`,
			params: ({ params: { discrError: r, tag: c, tagName: l } }) => (0, s._)`{error: ${r}, tag: ${l}, tagValue: ${c}}`
		},
		code(r) {
			let { gen: f, data: p, schema: m, parentSchema: h, it: g } = r, { oneOf: _ } = h;
			if (!g.opts.discriminator) throw Error("discriminator: requires discriminator option");
			let v = m.propertyName;
			if (typeof v != "string") throw Error("discriminator: requires propertyName");
			if (m.mapping) throw Error("discriminator: mapping is not supported");
			if (!_) throw Error("discriminator: requires oneOf keyword");
			let y = f.let("valid", !1), b = f.const("tag", (0, s._)`${p}${(0, s.getProperty)(v)}`);
			f.if((0, s._)`typeof ${b} == "string"`, () => x(), () => r.error(!1, {
				discrError: c.DiscrError.Tag,
				tag: b,
				tagName: v
			})), r.ok(y);
			function x() {
				let l = C();
				for (let r in f.if(!1), l) f.elseIf((0, s._)`${b} === ${r}`), f.assign(y, S(l[r]));
				f.else(), r.error(!1, {
					discrError: c.DiscrError.Mapping,
					tag: b,
					tagName: v
				}), f.endIf();
			}
			function S(c) {
				let l = f.name("valid"), u = r.subschema({
					keyword: "oneOf",
					schemaProp: c
				}, l);
				return r.mergeEvaluated(u, s.Name), l;
			}
			function C() {
				let r = {}, s = f(h), c = !0;
				for (let r = 0; r < _.length; r++) {
					let m = _[r];
					if (m?.$ref && !(0, d.schemaHasRulesButRef)(m, g.self.RULES)) {
						let r = m.$ref;
						if (m = l.resolveRef.call(g.self, g.schemaEnv.root, g.baseId, r), m instanceof l.SchemaEnv && (m = m.schema), m === void 0) throw new u.default(g.opts.uriResolver, g.baseId, r);
					}
					let h = m?.properties?.[v];
					if (typeof h != "object") throw Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${v}"`);
					c &&= s || f(m), p(h, r);
				}
				if (!c) throw Error(`discriminator: "${v}" must be required`);
				return r;
				function f({ required: r }) {
					return Array.isArray(r) && r.includes(v);
				}
				function p(r, s) {
					if (r.const) m(r.const, s);
					else if (r.enum) for (let c of r.enum) m(c, s);
					else throw Error(`discriminator: "properties/${v}" must have "const" or "enum"`);
				}
				function m(s, c) {
					if (typeof s != "string" || s in r) throw Error(`discriminator: "${v}" values must be unique strings`);
					r[s] = c;
				}
			}
		}
	};
})), json_schema_draft_07_exports = /* @__PURE__ */ __export({
	$id: () => $id,
	$schema: () => $schema,
	default: () => json_schema_draft_07_default,
	definitions: () => definitions,
	properties: () => properties,
	title: () => title,
	type: () => type
}, 1), $schema, $id, title, definitions, type, properties, json_schema_draft_07_default, init_json_schema_draft_07 = __esmMin((() => {
	$schema = "http://json-schema.org/draft-07/schema#", $id = "http://json-schema.org/draft-07/schema#", title = "Core schema meta-schema", definitions = {
		schemaArray: {
			type: "array",
			minItems: 1,
			items: { $ref: "#" }
		},
		nonNegativeInteger: {
			type: "integer",
			minimum: 0
		},
		nonNegativeIntegerDefault0: { allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }] },
		simpleTypes: { enum: [
			"array",
			"boolean",
			"integer",
			"null",
			"number",
			"object",
			"string"
		] },
		stringArray: {
			type: "array",
			items: { type: "string" },
			uniqueItems: !0,
			default: []
		}
	}, type = ["object", "boolean"], properties = {
		$id: {
			type: "string",
			format: "uri-reference"
		},
		$schema: {
			type: "string",
			format: "uri"
		},
		$ref: {
			type: "string",
			format: "uri-reference"
		},
		$comment: { type: "string" },
		title: { type: "string" },
		description: { type: "string" },
		default: !0,
		readOnly: {
			type: "boolean",
			default: !1
		},
		examples: {
			type: "array",
			items: !0
		},
		multipleOf: {
			type: "number",
			exclusiveMinimum: 0
		},
		maximum: { type: "number" },
		exclusiveMaximum: { type: "number" },
		minimum: { type: "number" },
		exclusiveMinimum: { type: "number" },
		maxLength: { $ref: "#/definitions/nonNegativeInteger" },
		minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
		pattern: {
			type: "string",
			format: "regex"
		},
		additionalItems: { $ref: "#" },
		items: {
			anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }],
			default: !0
		},
		maxItems: { $ref: "#/definitions/nonNegativeInteger" },
		minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
		uniqueItems: {
			type: "boolean",
			default: !1
		},
		contains: { $ref: "#" },
		maxProperties: { $ref: "#/definitions/nonNegativeInteger" },
		minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
		required: { $ref: "#/definitions/stringArray" },
		additionalProperties: { $ref: "#" },
		definitions: {
			type: "object",
			additionalProperties: { $ref: "#" },
			default: {}
		},
		properties: {
			type: "object",
			additionalProperties: { $ref: "#" },
			default: {}
		},
		patternProperties: {
			type: "object",
			additionalProperties: { $ref: "#" },
			propertyNames: { format: "regex" },
			default: {}
		},
		dependencies: {
			type: "object",
			additionalProperties: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }] }
		},
		propertyNames: { $ref: "#" },
		const: !0,
		enum: {
			type: "array",
			items: !0,
			minItems: 1,
			uniqueItems: !0
		},
		type: { anyOf: [{ $ref: "#/definitions/simpleTypes" }, {
			type: "array",
			items: { $ref: "#/definitions/simpleTypes" },
			minItems: 1,
			uniqueItems: !0
		}] },
		format: { type: "string" },
		contentMediaType: { type: "string" },
		contentEncoding: { type: "string" },
		if: { $ref: "#" },
		then: { $ref: "#" },
		else: { $ref: "#" },
		allOf: { $ref: "#/definitions/schemaArray" },
		anyOf: { $ref: "#/definitions/schemaArray" },
		oneOf: { $ref: "#/definitions/schemaArray" },
		not: { $ref: "#" }
	}, json_schema_draft_07_default = {
		$schema,
		$id,
		title,
		definitions,
		type,
		properties,
		default: !0
	};
})), require_ajv = /* @__PURE__ */ __commonJSMin(((r, s) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.MissingRefError = r.ValidationError = r.CodeGen = r.Name = r.nil = r.stringify = r.str = r._ = r.KeywordCxt = r.Ajv = void 0;
	var c = require_core$1(), l = require_draft7(), u = require_discriminator(), d = (init_json_schema_draft_07(), __toCommonJS(json_schema_draft_07_exports).default), f = ["/properties"], p = "http://json-schema.org/draft-07/schema", m = class extends c.default {
		_addVocabularies() {
			super._addVocabularies(), l.default.forEach((r) => this.addVocabulary(r)), this.opts.discriminator && this.addKeyword(u.default);
		}
		_addDefaultMetaSchema() {
			if (super._addDefaultMetaSchema(), !this.opts.meta) return;
			let r = this.opts.$data ? this.$dataMetaSchema(d, f) : d;
			this.addMetaSchema(r, p, !1), this.refs["http://json-schema.org/schema"] = p;
		}
		defaultMeta() {
			return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(p) ? p : void 0);
		}
	};
	r.Ajv = m, s.exports = r = m, s.exports.Ajv = m, Object.defineProperty(r, "__esModule", { value: !0 }), r.default = m;
	var h = require_validate();
	Object.defineProperty(r, "KeywordCxt", {
		enumerable: !0,
		get: function() {
			return h.KeywordCxt;
		}
	});
	var g = require_codegen();
	Object.defineProperty(r, "_", {
		enumerable: !0,
		get: function() {
			return g._;
		}
	}), Object.defineProperty(r, "str", {
		enumerable: !0,
		get: function() {
			return g.str;
		}
	}), Object.defineProperty(r, "stringify", {
		enumerable: !0,
		get: function() {
			return g.stringify;
		}
	}), Object.defineProperty(r, "nil", {
		enumerable: !0,
		get: function() {
			return g.nil;
		}
	}), Object.defineProperty(r, "Name", {
		enumerable: !0,
		get: function() {
			return g.Name;
		}
	}), Object.defineProperty(r, "CodeGen", {
		enumerable: !0,
		get: function() {
			return g.CodeGen;
		}
	});
	var _ = require_validation_error();
	Object.defineProperty(r, "ValidationError", {
		enumerable: !0,
		get: function() {
			return _.default;
		}
	});
	var v = require_ref_error();
	Object.defineProperty(r, "MissingRefError", {
		enumerable: !0,
		get: function() {
			return v.default;
		}
	});
})), require_limit = /* @__PURE__ */ __commonJSMin(((r) => {
	Object.defineProperty(r, "__esModule", { value: !0 }), r.formatLimitDefinition = void 0;
	var s = require_ajv(), c = require_codegen(), l = c.operators, u = {
		formatMaximum: {
			okStr: "<=",
			ok: l.LTE,
			fail: l.GT
		},
		formatMinimum: {
			okStr: ">=",
			ok: l.GTE,
			fail: l.LT
		},
		formatExclusiveMaximum: {
			okStr: "<",
			ok: l.LT,
			fail: l.GTE
		},
		formatExclusiveMinimum: {
			okStr: ">",
			ok: l.GT,
			fail: l.LTE
		}
	};
	r.formatLimitDefinition = {
		keyword: Object.keys(u),
		type: "string",
		schemaType: "string",
		$data: !0,
		error: {
			message: ({ keyword: r, schemaCode: s }) => (0, c.str)`should be ${u[r].okStr} ${s}`,
			params: ({ keyword: r, schemaCode: s }) => (0, c._)`{comparison: ${u[r].okStr}, limit: ${s}}`
		},
		code(r) {
			let { gen: l, data: d, schemaCode: f, keyword: p, it: m } = r, { opts: h, self: g } = m;
			if (!h.validateFormats) return;
			let _ = new s.KeywordCxt(m, g.RULES.all.format.definition, "format");
			_.$data ? v() : y();
			function v() {
				let s = l.scopeValue("formats", {
					ref: g.formats,
					code: h.code.formats
				}), u = l.const("fmt", (0, c._)`${s}[${_.schemaCode}]`);
				r.fail$data((0, c.or)((0, c._)`typeof ${u} != "object"`, (0, c._)`${u} instanceof RegExp`, (0, c._)`typeof ${u}.compare != "function"`, b(u)));
			}
			function y() {
				let s = _.schema, u = g.formats[s];
				if (!u || u === !0) return;
				if (typeof u != "object" || u instanceof RegExp || typeof u.compare != "function") throw Error(`"${p}": format "${s}" does not define "compare" function`);
				let d = l.scopeValue("formats", {
					key: s,
					ref: u,
					code: h.code.formats ? (0, c._)`${h.code.formats}${(0, c.getProperty)(s)}` : void 0
				});
				r.fail$data(b(d));
			}
			function b(r) {
				return (0, c._)`${r}.compare(${d}, ${f}) ${u[p].fail} 0`;
			}
		},
		dependencies: ["format"]
	}, r.default = (s) => (s.addKeyword(r.formatLimitDefinition), s);
})), import_dist = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((r, s) => {
	Object.defineProperty(r, "__esModule", { value: !0 });
	var c = require_formats(), l = require_limit(), u = require_codegen(), d = new u.Name("fullFormats"), f = new u.Name("fastFormats"), p = (r, s = { keywords: !0 }) => {
		if (Array.isArray(s)) return m(r, s, c.fullFormats, d), r;
		let [u, p] = s.mode === "fast" ? [c.fastFormats, f] : [c.fullFormats, d];
		return m(r, s.formats || c.formatNames, u, p), s.keywords && (0, l.default)(r), r;
	};
	p.get = (r, s = "full") => {
		let l = (s === "fast" ? c.fastFormats : c.fullFormats)[r];
		if (!l) throw Error(`Unknown format "${r}"`);
		return l;
	};
	function m(r, s, c, l) {
		var d;
		(d = r.opts.code).formats ?? (d.formats = (0, u._)`require("ajv-formats/dist/formats").${l}`);
		for (let l of s) r.addFormat(l, c[l]);
	}
	s.exports = r = p, Object.defineProperty(r, "__esModule", { value: !0 }), r.default = p;
})))(), 1), import__2020 = require__2020(), copyProperty = (r, s, c, l) => {
	if (c === "length" || c === "prototype" || c === "arguments" || c === "caller") return;
	let u = Object.getOwnPropertyDescriptor(r, c), d = Object.getOwnPropertyDescriptor(s, c);
	!canCopyProperty(u, d) && l || Object.defineProperty(r, c, d);
}, canCopyProperty = function(r, s) {
	return r === void 0 || r.configurable || r.writable === s.writable && r.enumerable === s.enumerable && r.configurable === s.configurable && (r.writable || r.value === s.value);
}, changePrototype = (r, s) => {
	let c = Object.getPrototypeOf(s);
	c !== Object.getPrototypeOf(r) && Object.setPrototypeOf(r, c);
}, wrappedToString = (r, s) => `/* Wrapped ${r}*/\n${s}`, toStringDescriptor = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), toStringName = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), changeToString = (r, s, c) => {
	let l = c === "" ? "" : `with ${c.trim()}() `, u = wrappedToString.bind(null, l, s.toString());
	Object.defineProperty(u, "name", toStringName);
	let { writable: d, enumerable: f, configurable: p } = toStringDescriptor;
	Object.defineProperty(r, "toString", {
		value: u,
		writable: d,
		enumerable: f,
		configurable: p
	});
};
function mimicFunction(r, s, { ignoreNonConfigurable: c = !1 } = {}) {
	let { name: l } = r;
	for (let l of Reflect.ownKeys(s)) copyProperty(r, s, l, c);
	return changePrototype(r, s), changeToString(r, s, l), r;
}
var debounce_fn_default = (r, s = {}) => {
	if (typeof r != "function") throw TypeError(`Expected the first argument to be a function, got \`${typeof r}\``);
	let { wait: c = 0, maxWait: l = Infinity, before: u = !1, after: d = !0 } = s;
	if (c < 0 || l < 0) throw RangeError("`wait` and `maxWait` must not be negative.");
	if (!u && !d) throw Error("Both `before` and `after` are false, function wouldn't be called.");
	let f, p, m, h = function(...s) {
		let h = this, g = () => {
			f = void 0, p &&= (clearTimeout(p), void 0), d && (m = r.apply(h, s));
		}, _ = () => {
			p = void 0, f &&= (clearTimeout(f), void 0), d && (m = r.apply(h, s));
		}, v = u && !f;
		return clearTimeout(f), f = setTimeout(g, c), l > 0 && l !== Infinity && !p && (p = setTimeout(_, l)), v && (m = r.apply(h, s)), m;
	};
	return mimicFunction(h, r), h.cancel = () => {
		f &&= (clearTimeout(f), void 0), p &&= (clearTimeout(p), void 0);
	}, h;
}, require_constants$1 = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = "2.0.0", l = 256;
	s.exports = {
		MAX_LENGTH: l,
		MAX_SAFE_COMPONENT_LENGTH: 16,
		MAX_SAFE_BUILD_LENGTH: l - 6,
		MAX_SAFE_INTEGER: 2 ** 53 - 1 || 9007199254740991,
		RELEASE_TYPES: [
			"major",
			"premajor",
			"minor",
			"preminor",
			"patch",
			"prepatch",
			"prerelease"
		],
		SEMVER_SPEC_VERSION: c,
		FLAG_INCLUDE_PRERELEASE: 1,
		FLAG_LOOSE: 2
	};
})), require_debug = /* @__PURE__ */ __commonJSMin(((r, s) => {
	s.exports = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...r) => console.error("SEMVER", ...r) : () => {};
})), require_re = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var { MAX_SAFE_COMPONENT_LENGTH: c, MAX_SAFE_BUILD_LENGTH: l, MAX_LENGTH: u } = require_constants$1(), d = require_debug();
	r = s.exports = {};
	var f = r.re = [], p = r.safeRe = [], m = r.src = [], h = r.safeSrc = [], g = r.t = {}, _ = 0, v = "[a-zA-Z0-9-]", y = [
		["\\s", 1],
		["\\d", u],
		[v, l]
	], b = (r) => {
		for (let [s, c] of y) r = r.split(`${s}*`).join(`${s}{0,${c}}`).split(`${s}+`).join(`${s}{1,${c}}`);
		return r;
	}, x = (r, s, c) => {
		let l = b(s), u = _++;
		d(r, u, s), g[r] = u, m[u] = s, h[u] = l, f[u] = new RegExp(s, c ? "g" : void 0), p[u] = new RegExp(l, c ? "g" : void 0);
	};
	x("NUMERICIDENTIFIER", "0|[1-9]\\d*"), x("NUMERICIDENTIFIERLOOSE", "\\d+"), x("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${v}*`), x("MAINVERSION", `(${m[g.NUMERICIDENTIFIER]})\\.(${m[g.NUMERICIDENTIFIER]})\\.(${m[g.NUMERICIDENTIFIER]})`), x("MAINVERSIONLOOSE", `(${m[g.NUMERICIDENTIFIERLOOSE]})\\.(${m[g.NUMERICIDENTIFIERLOOSE]})\\.(${m[g.NUMERICIDENTIFIERLOOSE]})`), x("PRERELEASEIDENTIFIER", `(?:${m[g.NONNUMERICIDENTIFIER]}|${m[g.NUMERICIDENTIFIER]})`), x("PRERELEASEIDENTIFIERLOOSE", `(?:${m[g.NONNUMERICIDENTIFIER]}|${m[g.NUMERICIDENTIFIERLOOSE]})`), x("PRERELEASE", `(?:-(${m[g.PRERELEASEIDENTIFIER]}(?:\\.${m[g.PRERELEASEIDENTIFIER]})*))`), x("PRERELEASELOOSE", `(?:-?(${m[g.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${m[g.PRERELEASEIDENTIFIERLOOSE]})*))`), x("BUILDIDENTIFIER", `${v}+`), x("BUILD", `(?:\\+(${m[g.BUILDIDENTIFIER]}(?:\\.${m[g.BUILDIDENTIFIER]})*))`), x("FULLPLAIN", `v?${m[g.MAINVERSION]}${m[g.PRERELEASE]}?${m[g.BUILD]}?`), x("FULL", `^${m[g.FULLPLAIN]}$`), x("LOOSEPLAIN", `[v=\\s]*${m[g.MAINVERSIONLOOSE]}${m[g.PRERELEASELOOSE]}?${m[g.BUILD]}?`), x("LOOSE", `^${m[g.LOOSEPLAIN]}$`), x("GTLT", "((?:<|>)?=?)"), x("XRANGEIDENTIFIERLOOSE", `${m[g.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), x("XRANGEIDENTIFIER", `${m[g.NUMERICIDENTIFIER]}|x|X|\\*`), x("XRANGEPLAIN", `[v=\\s]*(${m[g.XRANGEIDENTIFIER]})(?:\\.(${m[g.XRANGEIDENTIFIER]})(?:\\.(${m[g.XRANGEIDENTIFIER]})(?:${m[g.PRERELEASE]})?${m[g.BUILD]}?)?)?`), x("XRANGEPLAINLOOSE", `[v=\\s]*(${m[g.XRANGEIDENTIFIERLOOSE]})(?:\\.(${m[g.XRANGEIDENTIFIERLOOSE]})(?:\\.(${m[g.XRANGEIDENTIFIERLOOSE]})(?:${m[g.PRERELEASELOOSE]})?${m[g.BUILD]}?)?)?`), x("XRANGE", `^${m[g.GTLT]}\\s*${m[g.XRANGEPLAIN]}$`), x("XRANGELOOSE", `^${m[g.GTLT]}\\s*${m[g.XRANGEPLAINLOOSE]}$`), x("COERCEPLAIN", `(^|[^\\d])(\\d{1,${c}})(?:\\.(\\d{1,${c}}))?(?:\\.(\\d{1,${c}}))?`), x("COERCE", `${m[g.COERCEPLAIN]}(?:$|[^\\d])`), x("COERCEFULL", m[g.COERCEPLAIN] + `(?:${m[g.PRERELEASE]})?(?:${m[g.BUILD]})?(?:$|[^\\d])`), x("COERCERTL", m[g.COERCE], !0), x("COERCERTLFULL", m[g.COERCEFULL], !0), x("LONETILDE", "(?:~>?)"), x("TILDETRIM", `(\\s*)${m[g.LONETILDE]}\\s+`, !0), r.tildeTrimReplace = "$1~", x("TILDE", `^${m[g.LONETILDE]}${m[g.XRANGEPLAIN]}$`), x("TILDELOOSE", `^${m[g.LONETILDE]}${m[g.XRANGEPLAINLOOSE]}$`), x("LONECARET", "(?:\\^)"), x("CARETTRIM", `(\\s*)${m[g.LONECARET]}\\s+`, !0), r.caretTrimReplace = "$1^", x("CARET", `^${m[g.LONECARET]}${m[g.XRANGEPLAIN]}$`), x("CARETLOOSE", `^${m[g.LONECARET]}${m[g.XRANGEPLAINLOOSE]}$`), x("COMPARATORLOOSE", `^${m[g.GTLT]}\\s*(${m[g.LOOSEPLAIN]})$|^$`), x("COMPARATOR", `^${m[g.GTLT]}\\s*(${m[g.FULLPLAIN]})$|^$`), x("COMPARATORTRIM", `(\\s*)${m[g.GTLT]}\\s*(${m[g.LOOSEPLAIN]}|${m[g.XRANGEPLAIN]})`, !0), r.comparatorTrimReplace = "$1$2$3", x("HYPHENRANGE", `^\\s*(${m[g.XRANGEPLAIN]})\\s+-\\s+(${m[g.XRANGEPLAIN]})\\s*$`), x("HYPHENRANGELOOSE", `^\\s*(${m[g.XRANGEPLAINLOOSE]})\\s+-\\s+(${m[g.XRANGEPLAINLOOSE]})\\s*$`), x("STAR", "(<|>)?=?\\s*\\*"), x("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), x("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})), require_parse_options = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = Object.freeze({ loose: !0 }), l = Object.freeze({});
	s.exports = (r) => r ? typeof r == "object" ? r : c : l;
})), require_identifiers = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = /^[0-9]+$/, l = (r, s) => {
		if (typeof r == "number" && typeof s == "number") return r === s ? 0 : r < s ? -1 : 1;
		let l = c.test(r), u = c.test(s);
		return l && u && (r = +r, s = +s), r === s ? 0 : l && !u ? -1 : u && !l ? 1 : r < s ? -1 : 1;
	};
	s.exports = {
		compareIdentifiers: l,
		rcompareIdentifiers: (r, s) => l(s, r)
	};
})), require_semver$1 = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_debug(), { MAX_LENGTH: l, MAX_SAFE_INTEGER: u } = require_constants$1(), { safeRe: d, t: f } = require_re(), p = require_parse_options(), { compareIdentifiers: m } = require_identifiers();
	s.exports = class r {
		constructor(s, m) {
			if (m = p(m), s instanceof r) {
				if (s.loose === !!m.loose && s.includePrerelease === !!m.includePrerelease) return s;
				s = s.version;
			} else if (typeof s != "string") throw TypeError(`Invalid version. Must be a string. Got type "${typeof s}".`);
			if (s.length > l) throw TypeError(`version is longer than ${l} characters`);
			c("SemVer", s, m), this.options = m, this.loose = !!m.loose, this.includePrerelease = !!m.includePrerelease;
			let h = s.trim().match(m.loose ? d[f.LOOSE] : d[f.FULL]);
			if (!h) throw TypeError(`Invalid Version: ${s}`);
			if (this.raw = s, this.major = +h[1], this.minor = +h[2], this.patch = +h[3], this.major > u || this.major < 0) throw TypeError("Invalid major version");
			if (this.minor > u || this.minor < 0) throw TypeError("Invalid minor version");
			if (this.patch > u || this.patch < 0) throw TypeError("Invalid patch version");
			h[4] ? this.prerelease = h[4].split(".").map((r) => {
				if (/^[0-9]+$/.test(r)) {
					let s = +r;
					if (s >= 0 && s < u) return s;
				}
				return r;
			}) : this.prerelease = [], this.build = h[5] ? h[5].split(".") : [], this.format();
		}
		format() {
			return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
		}
		toString() {
			return this.version;
		}
		compare(s) {
			if (c("SemVer.compare", this.version, this.options, s), !(s instanceof r)) {
				if (typeof s == "string" && s === this.version) return 0;
				s = new r(s, this.options);
			}
			return s.version === this.version ? 0 : this.compareMain(s) || this.comparePre(s);
		}
		compareMain(s) {
			return s instanceof r || (s = new r(s, this.options)), this.major < s.major ? -1 : this.major > s.major ? 1 : this.minor < s.minor ? -1 : this.minor > s.minor ? 1 : this.patch < s.patch ? -1 : this.patch > s.patch ? 1 : 0;
		}
		comparePre(s) {
			if (s instanceof r || (s = new r(s, this.options)), this.prerelease.length && !s.prerelease.length) return -1;
			if (!this.prerelease.length && s.prerelease.length) return 1;
			if (!this.prerelease.length && !s.prerelease.length) return 0;
			let l = 0;
			do {
				let r = this.prerelease[l], u = s.prerelease[l];
				if (c("prerelease compare", l, r, u), r === void 0 && u === void 0) return 0;
				if (u === void 0) return 1;
				if (r === void 0) return -1;
				if (r === u) continue;
				return m(r, u);
			} while (++l);
		}
		compareBuild(s) {
			s instanceof r || (s = new r(s, this.options));
			let l = 0;
			do {
				let r = this.build[l], u = s.build[l];
				if (c("build compare", l, r, u), r === void 0 && u === void 0) return 0;
				if (u === void 0) return 1;
				if (r === void 0) return -1;
				if (r === u) continue;
				return m(r, u);
			} while (++l);
		}
		inc(r, s, c) {
			if (r.startsWith("pre")) {
				if (!s && c === !1) throw Error("invalid increment argument: identifier is empty");
				if (s) {
					let r = `-${s}`.match(this.options.loose ? d[f.PRERELEASELOOSE] : d[f.PRERELEASE]);
					if (!r || r[1] !== s) throw Error(`invalid identifier: ${s}`);
				}
			}
			switch (r) {
				case "premajor":
					this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", s, c);
					break;
				case "preminor":
					this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", s, c);
					break;
				case "prepatch":
					this.prerelease.length = 0, this.inc("patch", s, c), this.inc("pre", s, c);
					break;
				case "prerelease":
					this.prerelease.length === 0 && this.inc("patch", s, c), this.inc("pre", s, c);
					break;
				case "release":
					if (this.prerelease.length === 0) throw Error(`version ${this.raw} is not a prerelease`);
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
				case "pre": {
					let r = Number(c) ? 1 : 0;
					if (this.prerelease.length === 0) this.prerelease = [r];
					else {
						let l = this.prerelease.length;
						for (; --l >= 0;) typeof this.prerelease[l] == "number" && (this.prerelease[l]++, l = -2);
						if (l === -1) {
							if (s === this.prerelease.join(".") && c === !1) throw Error("invalid increment argument: identifier already exists");
							this.prerelease.push(r);
						}
					}
					if (s) {
						let l = [s, r];
						c === !1 && (l = [s]), m(this.prerelease[0], s) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = l) : this.prerelease = l;
					}
					break;
				}
				default: throw Error(`invalid increment argument: ${r}`);
			}
			return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
		}
	};
})), require_parse = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_semver$1();
	s.exports = (r, s, l = !1) => {
		if (r instanceof c) return r;
		try {
			return new c(r, s);
		} catch (r) {
			if (!l) return null;
			throw r;
		}
	};
})), require_valid$1 = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_parse();
	s.exports = (r, s) => {
		let l = c(r, s);
		return l ? l.version : null;
	};
})), require_clean = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_parse();
	s.exports = (r, s) => {
		let l = c(r.trim().replace(/^[=v]+/, ""), s);
		return l ? l.version : null;
	};
})), require_inc = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_semver$1();
	s.exports = (r, s, l, u, d) => {
		typeof l == "string" && (d = u, u = l, l = void 0);
		try {
			return new c(r instanceof c ? r.version : r, l).inc(s, u, d).version;
		} catch {
			return null;
		}
	};
})), require_diff = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_parse();
	s.exports = (r, s) => {
		let l = c(r, null, !0), u = c(s, null, !0), d = l.compare(u);
		if (d === 0) return null;
		let f = d > 0, p = f ? l : u, m = f ? u : l, h = !!p.prerelease.length;
		if (m.prerelease.length && !h) {
			if (!m.patch && !m.minor) return "major";
			if (m.compareMain(p) === 0) return m.minor && !m.patch ? "minor" : "patch";
		}
		let g = h ? "pre" : "";
		return l.major === u.major ? l.minor === u.minor ? l.patch === u.patch ? "prerelease" : g + "patch" : g + "minor" : g + "major";
	};
})), require_major = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_semver$1();
	s.exports = (r, s) => new c(r, s).major;
})), require_minor = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_semver$1();
	s.exports = (r, s) => new c(r, s).minor;
})), require_patch = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_semver$1();
	s.exports = (r, s) => new c(r, s).patch;
})), require_prerelease = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_parse();
	s.exports = (r, s) => {
		let l = c(r, s);
		return l && l.prerelease.length ? l.prerelease : null;
	};
})), require_compare = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_semver$1();
	s.exports = (r, s, l) => new c(r, l).compare(new c(s, l));
})), require_rcompare = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_compare();
	s.exports = (r, s, l) => c(s, r, l);
})), require_compare_loose = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_compare();
	s.exports = (r, s) => c(r, s, !0);
})), require_compare_build = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_semver$1();
	s.exports = (r, s, l) => {
		let u = new c(r, l), d = new c(s, l);
		return u.compare(d) || u.compareBuild(d);
	};
})), require_sort = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_compare_build();
	s.exports = (r, s) => r.sort((r, l) => c(r, l, s));
})), require_rsort = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_compare_build();
	s.exports = (r, s) => r.sort((r, l) => c(l, r, s));
})), require_gt = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_compare();
	s.exports = (r, s, l) => c(r, s, l) > 0;
})), require_lt = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_compare();
	s.exports = (r, s, l) => c(r, s, l) < 0;
})), require_eq = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_compare();
	s.exports = (r, s, l) => c(r, s, l) === 0;
})), require_neq = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_compare();
	s.exports = (r, s, l) => c(r, s, l) !== 0;
})), require_gte = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_compare();
	s.exports = (r, s, l) => c(r, s, l) >= 0;
})), require_lte = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_compare();
	s.exports = (r, s, l) => c(r, s, l) <= 0;
})), require_cmp = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_eq(), l = require_neq(), u = require_gt(), d = require_gte(), f = require_lt(), p = require_lte();
	s.exports = (r, s, m, h) => {
		switch (s) {
			case "===": return typeof r == "object" && (r = r.version), typeof m == "object" && (m = m.version), r === m;
			case "!==": return typeof r == "object" && (r = r.version), typeof m == "object" && (m = m.version), r !== m;
			case "":
			case "=":
			case "==": return c(r, m, h);
			case "!=": return l(r, m, h);
			case ">": return u(r, m, h);
			case ">=": return d(r, m, h);
			case "<": return f(r, m, h);
			case "<=": return p(r, m, h);
			default: throw TypeError(`Invalid operator: ${s}`);
		}
	};
})), require_coerce = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_semver$1(), l = require_parse(), { safeRe: u, t: d } = require_re();
	s.exports = (r, s) => {
		if (r instanceof c) return r;
		if (typeof r == "number" && (r = String(r)), typeof r != "string") return null;
		s ||= {};
		let f = null;
		if (!s.rtl) f = r.match(s.includePrerelease ? u[d.COERCEFULL] : u[d.COERCE]);
		else {
			let c = s.includePrerelease ? u[d.COERCERTLFULL] : u[d.COERCERTL], l;
			for (; (l = c.exec(r)) && (!f || f.index + f[0].length !== r.length);) (!f || l.index + l[0].length !== f.index + f[0].length) && (f = l), c.lastIndex = l.index + l[1].length + l[2].length;
			c.lastIndex = -1;
		}
		if (f === null) return null;
		let p = f[2];
		return l(`${p}.${f[3] || "0"}.${f[4] || "0"}${s.includePrerelease && f[5] ? `-${f[5]}` : ""}${s.includePrerelease && f[6] ? `+${f[6]}` : ""}`, s);
	};
})), require_lrucache = /* @__PURE__ */ __commonJSMin(((r, s) => {
	s.exports = class {
		constructor() {
			this.max = 1e3, this.map = /* @__PURE__ */ new Map();
		}
		get(r) {
			let s = this.map.get(r);
			if (s !== void 0) return this.map.delete(r), this.map.set(r, s), s;
		}
		delete(r) {
			return this.map.delete(r);
		}
		set(r, s) {
			if (!this.delete(r) && s !== void 0) {
				if (this.map.size >= this.max) {
					let r = this.map.keys().next().value;
					this.delete(r);
				}
				this.map.set(r, s);
			}
			return this;
		}
	};
})), require_range = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = /\s+/g;
	s.exports = class r {
		constructor(s, l) {
			if (l = u(l), s instanceof r) return s.loose === !!l.loose && s.includePrerelease === !!l.includePrerelease ? s : new r(s.raw, l);
			if (s instanceof d) return this.raw = s.value, this.set = [[s]], this.formatted = void 0, this;
			if (this.options = l, this.loose = !!l.loose, this.includePrerelease = !!l.includePrerelease, this.raw = s.trim().replace(c, " "), this.set = this.raw.split("||").map((r) => this.parseRange(r.trim())).filter((r) => r.length), !this.set.length) throw TypeError(`Invalid SemVer Range: ${this.raw}`);
			if (this.set.length > 1) {
				let r = this.set[0];
				if (this.set = this.set.filter((r) => !x(r[0])), this.set.length === 0) this.set = [r];
				else if (this.set.length > 1) {
					for (let r of this.set) if (r.length === 1 && S(r[0])) {
						this.set = [r];
						break;
					}
				}
			}
			this.formatted = void 0;
		}
		get range() {
			if (this.formatted === void 0) {
				this.formatted = "";
				for (let r = 0; r < this.set.length; r++) {
					r > 0 && (this.formatted += "||");
					let s = this.set[r];
					for (let r = 0; r < s.length; r++) r > 0 && (this.formatted += " "), this.formatted += s[r].toString().trim();
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
		parseRange(r) {
			let s = ((this.options.includePrerelease && y) | (this.options.loose && b)) + ":" + r, c = l.get(s);
			if (c) return c;
			let u = this.options.loose, p = u ? m[h.HYPHENRANGELOOSE] : m[h.HYPHENRANGE];
			r = r.replace(p, P(this.options.includePrerelease)), f("hyphen replace", r), r = r.replace(m[h.COMPARATORTRIM], g), f("comparator trim", r), r = r.replace(m[h.TILDETRIM], _), f("tilde trim", r), r = r.replace(m[h.CARETTRIM], v), f("caret trim", r);
			let S = r.split(" ").map((r) => w(r, this.options)).join(" ").split(/\s+/).map((r) => N(r, this.options));
			u && (S = S.filter((r) => (f("loose invalid filter", r, this.options), !!r.match(m[h.COMPARATORLOOSE])))), f("range list", S);
			let C = /* @__PURE__ */ new Map(), T = S.map((r) => new d(r, this.options));
			for (let r of T) {
				if (x(r)) return [r];
				C.set(r.value, r);
			}
			C.size > 1 && C.has("") && C.delete("");
			let E = [...C.values()];
			return l.set(s, E), E;
		}
		intersects(s, c) {
			if (!(s instanceof r)) throw TypeError("a Range is required");
			return this.set.some((r) => C(r, c) && s.set.some((s) => C(s, c) && r.every((r) => s.every((s) => r.intersects(s, c)))));
		}
		test(r) {
			if (!r) return !1;
			if (typeof r == "string") try {
				r = new p(r, this.options);
			} catch {
				return !1;
			}
			for (let s = 0; s < this.set.length; s++) if (F(this.set[s], r, this.options)) return !0;
			return !1;
		}
	};
	var l = new (require_lrucache())(), u = require_parse_options(), d = require_comparator(), f = require_debug(), p = require_semver$1(), { safeRe: m, t: h, comparatorTrimReplace: g, tildeTrimReplace: _, caretTrimReplace: v } = require_re(), { FLAG_INCLUDE_PRERELEASE: y, FLAG_LOOSE: b } = require_constants$1(), x = (r) => r.value === "<0.0.0-0", S = (r) => r.value === "", C = (r, s) => {
		let c = !0, l = r.slice(), u = l.pop();
		for (; c && l.length;) c = l.every((r) => u.intersects(r, s)), u = l.pop();
		return c;
	}, w = (r, s) => (r = r.replace(m[h.BUILD], ""), f("comp", r, s), r = O(r, s), f("caret", r), r = E(r, s), f("tildes", r), r = A(r, s), f("xrange", r), r = M(r, s), f("stars", r), r), T = (r) => !r || r.toLowerCase() === "x" || r === "*", E = (r, s) => r.trim().split(/\s+/).map((r) => D(r, s)).join(" "), D = (r, s) => {
		let c = s.loose ? m[h.TILDELOOSE] : m[h.TILDE];
		return r.replace(c, (s, c, l, u, d) => {
			f("tilde", r, s, c, l, u, d);
			let p;
			return T(c) ? p = "" : T(l) ? p = `>=${c}.0.0 <${+c + 1}.0.0-0` : T(u) ? p = `>=${c}.${l}.0 <${c}.${+l + 1}.0-0` : d ? (f("replaceTilde pr", d), p = `>=${c}.${l}.${u}-${d} <${c}.${+l + 1}.0-0`) : p = `>=${c}.${l}.${u} <${c}.${+l + 1}.0-0`, f("tilde return", p), p;
		});
	}, O = (r, s) => r.trim().split(/\s+/).map((r) => k(r, s)).join(" "), k = (r, s) => {
		f("caret", r, s);
		let c = s.loose ? m[h.CARETLOOSE] : m[h.CARET], l = s.includePrerelease ? "-0" : "";
		return r.replace(c, (s, c, u, d, p) => {
			f("caret", r, s, c, u, d, p);
			let m;
			return T(c) ? m = "" : T(u) ? m = `>=${c}.0.0${l} <${+c + 1}.0.0-0` : T(d) ? m = c === "0" ? `>=${c}.${u}.0${l} <${c}.${+u + 1}.0-0` : `>=${c}.${u}.0${l} <${+c + 1}.0.0-0` : p ? (f("replaceCaret pr", p), m = c === "0" ? u === "0" ? `>=${c}.${u}.${d}-${p} <${c}.${u}.${+d + 1}-0` : `>=${c}.${u}.${d}-${p} <${c}.${+u + 1}.0-0` : `>=${c}.${u}.${d}-${p} <${+c + 1}.0.0-0`) : (f("no pr"), m = c === "0" ? u === "0" ? `>=${c}.${u}.${d}${l} <${c}.${u}.${+d + 1}-0` : `>=${c}.${u}.${d}${l} <${c}.${+u + 1}.0-0` : `>=${c}.${u}.${d} <${+c + 1}.0.0-0`), f("caret return", m), m;
		});
	}, A = (r, s) => (f("replaceXRanges", r, s), r.split(/\s+/).map((r) => j(r, s)).join(" ")), j = (r, s) => {
		r = r.trim();
		let c = s.loose ? m[h.XRANGELOOSE] : m[h.XRANGE];
		return r.replace(c, (c, l, u, d, p, m) => {
			f("xRange", r, c, l, u, d, p, m);
			let h = T(u), g = h || T(d), _ = g || T(p), v = _;
			return l === "=" && v && (l = ""), m = s.includePrerelease ? "-0" : "", h ? c = l === ">" || l === "<" ? "<0.0.0-0" : "*" : l && v ? (g && (d = 0), p = 0, l === ">" ? (l = ">=", g ? (u = +u + 1, d = 0, p = 0) : (d = +d + 1, p = 0)) : l === "<=" && (l = "<", g ? u = +u + 1 : d = +d + 1), l === "<" && (m = "-0"), c = `${l + u}.${d}.${p}${m}`) : g ? c = `>=${u}.0.0${m} <${+u + 1}.0.0-0` : _ && (c = `>=${u}.${d}.0${m} <${u}.${+d + 1}.0-0`), f("xRange return", c), c;
		});
	}, M = (r, s) => (f("replaceStars", r, s), r.trim().replace(m[h.STAR], "")), N = (r, s) => (f("replaceGTE0", r, s), r.trim().replace(m[s.includePrerelease ? h.GTE0PRE : h.GTE0], "")), P = (r) => (s, c, l, u, d, f, p, m, h, g, _, v) => (c = T(l) ? "" : T(u) ? `>=${l}.0.0${r ? "-0" : ""}` : T(d) ? `>=${l}.${u}.0${r ? "-0" : ""}` : f ? `>=${c}` : `>=${c}${r ? "-0" : ""}`, m = T(h) ? "" : T(g) ? `<${+h + 1}.0.0-0` : T(_) ? `<${h}.${+g + 1}.0-0` : v ? `<=${h}.${g}.${_}-${v}` : r ? `<${h}.${g}.${+_ + 1}-0` : `<=${m}`, `${c} ${m}`.trim()), F = (r, s, c) => {
		for (let c = 0; c < r.length; c++) if (!r[c].test(s)) return !1;
		if (s.prerelease.length && !c.includePrerelease) {
			for (let c = 0; c < r.length; c++) if (f(r[c].semver), r[c].semver !== d.ANY && r[c].semver.prerelease.length > 0) {
				let l = r[c].semver;
				if (l.major === s.major && l.minor === s.minor && l.patch === s.patch) return !0;
			}
			return !1;
		}
		return !0;
	};
})), require_comparator = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = Symbol("SemVer ANY");
	s.exports = class r {
		static get ANY() {
			return c;
		}
		constructor(s, u) {
			if (u = l(u), s instanceof r) {
				if (s.loose === !!u.loose) return s;
				s = s.value;
			}
			s = s.trim().split(/\s+/).join(" "), p("comparator", s, u), this.options = u, this.loose = !!u.loose, this.parse(s), this.semver === c ? this.value = "" : this.value = this.operator + this.semver.version, p("comp", this);
		}
		parse(r) {
			let s = this.options.loose ? u[d.COMPARATORLOOSE] : u[d.COMPARATOR], l = r.match(s);
			if (!l) throw TypeError(`Invalid comparator: ${r}`);
			this.operator = l[1] === void 0 ? "" : l[1], this.operator === "=" && (this.operator = ""), l[2] ? this.semver = new m(l[2], this.options.loose) : this.semver = c;
		}
		toString() {
			return this.value;
		}
		test(r) {
			if (p("Comparator.test", r, this.options.loose), this.semver === c || r === c) return !0;
			if (typeof r == "string") try {
				r = new m(r, this.options);
			} catch {
				return !1;
			}
			return f(r, this.operator, this.semver, this.options);
		}
		intersects(s, c) {
			if (!(s instanceof r)) throw TypeError("a Comparator is required");
			return this.operator === "" ? this.value === "" ? !0 : new h(s.value, c).test(this.value) : s.operator === "" ? s.value === "" ? !0 : new h(this.value, c).test(s.semver) : (c = l(c), c.includePrerelease && (this.value === "<0.0.0-0" || s.value === "<0.0.0-0") || !c.includePrerelease && (this.value.startsWith("<0.0.0") || s.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && s.operator.startsWith(">") || this.operator.startsWith("<") && s.operator.startsWith("<") || this.semver.version === s.semver.version && this.operator.includes("=") && s.operator.includes("=") || f(this.semver, "<", s.semver, c) && this.operator.startsWith(">") && s.operator.startsWith("<") || f(this.semver, ">", s.semver, c) && this.operator.startsWith("<") && s.operator.startsWith(">")));
		}
	};
	var l = require_parse_options(), { safeRe: u, t: d } = require_re(), f = require_cmp(), p = require_debug(), m = require_semver$1(), h = require_range();
})), require_satisfies = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_range();
	s.exports = (r, s, l) => {
		try {
			s = new c(s, l);
		} catch {
			return !1;
		}
		return s.test(r);
	};
})), require_to_comparators = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_range();
	s.exports = (r, s) => new c(r, s).set.map((r) => r.map((r) => r.value).join(" ").trim().split(" "));
})), require_max_satisfying = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_semver$1(), l = require_range();
	s.exports = (r, s, u) => {
		let d = null, f = null, p = null;
		try {
			p = new l(s, u);
		} catch {
			return null;
		}
		return r.forEach((r) => {
			p.test(r) && (!d || f.compare(r) === -1) && (d = r, f = new c(d, u));
		}), d;
	};
})), require_min_satisfying = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_semver$1(), l = require_range();
	s.exports = (r, s, u) => {
		let d = null, f = null, p = null;
		try {
			p = new l(s, u);
		} catch {
			return null;
		}
		return r.forEach((r) => {
			p.test(r) && (!d || f.compare(r) === 1) && (d = r, f = new c(d, u));
		}), d;
	};
})), require_min_version = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_semver$1(), l = require_range(), u = require_gt();
	s.exports = (r, s) => {
		r = new l(r, s);
		let d = new c("0.0.0");
		if (r.test(d) || (d = new c("0.0.0-0"), r.test(d))) return d;
		d = null;
		for (let s = 0; s < r.set.length; ++s) {
			let l = r.set[s], f = null;
			l.forEach((r) => {
				let s = new c(r.semver.version);
				switch (r.operator) {
					case ">": s.prerelease.length === 0 ? s.patch++ : s.prerelease.push(0), s.raw = s.format();
					case "":
					case ">=":
						(!f || u(s, f)) && (f = s);
						break;
					case "<":
					case "<=": break;
					default: throw Error(`Unexpected operation: ${r.operator}`);
				}
			}), f && (!d || u(d, f)) && (d = f);
		}
		return d && r.test(d) ? d : null;
	};
})), require_valid = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_range();
	s.exports = (r, s) => {
		try {
			return new c(r, s).range || "*";
		} catch {
			return null;
		}
	};
})), require_outside = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_semver$1(), l = require_comparator(), { ANY: u } = l, d = require_range(), f = require_satisfies(), p = require_gt(), m = require_lt(), h = require_lte(), g = require_gte();
	s.exports = (r, s, _, v) => {
		r = new c(r, v), s = new d(s, v);
		let y, b, x, S, C;
		switch (_) {
			case ">":
				y = p, b = h, x = m, S = ">", C = ">=";
				break;
			case "<":
				y = m, b = g, x = p, S = "<", C = "<=";
				break;
			default: throw TypeError("Must provide a hilo val of \"<\" or \">\"");
		}
		if (f(r, s, v)) return !1;
		for (let c = 0; c < s.set.length; ++c) {
			let d = s.set[c], f = null, p = null;
			if (d.forEach((r) => {
				r.semver === u && (r = new l(">=0.0.0")), f ||= r, p ||= r, y(r.semver, f.semver, v) ? f = r : x(r.semver, p.semver, v) && (p = r);
			}), f.operator === S || f.operator === C || (!p.operator || p.operator === S) && b(r, p.semver) || p.operator === C && x(r, p.semver)) return !1;
		}
		return !0;
	};
})), require_gtr = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_outside();
	s.exports = (r, s, l) => c(r, s, ">", l);
})), require_ltr = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_outside();
	s.exports = (r, s, l) => c(r, s, "<", l);
})), require_intersects = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_range();
	s.exports = (r, s, l) => (r = new c(r, l), s = new c(s, l), r.intersects(s, l));
})), require_simplify = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_satisfies(), l = require_compare();
	s.exports = (r, s, u) => {
		let d = [], f = null, p = null, m = r.sort((r, s) => l(r, s, u));
		for (let r of m) c(r, s, u) ? (p = r, f ||= r) : (p && d.push([f, p]), p = null, f = null);
		f && d.push([f, null]);
		let h = [];
		for (let [r, s] of d) r === s ? h.push(r) : !s && r === m[0] ? h.push("*") : s ? r === m[0] ? h.push(`<=${s}`) : h.push(`${r} - ${s}`) : h.push(`>=${r}`);
		let g = h.join(" || "), _ = typeof s.raw == "string" ? s.raw : String(s);
		return g.length < _.length ? g : s;
	};
})), require_subset = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_range(), l = require_comparator(), { ANY: u } = l, d = require_satisfies(), f = require_compare(), p = (r, s, l = {}) => {
		if (r === s) return !0;
		r = new c(r, l), s = new c(s, l);
		let u = !1;
		OUTER: for (let c of r.set) {
			for (let r of s.set) {
				let s = g(c, r, l);
				if (u ||= s !== null, s) continue OUTER;
			}
			if (u) return !1;
		}
		return !0;
	}, m = [new l(">=0.0.0-0")], h = [new l(">=0.0.0")], g = (r, s, c) => {
		if (r === s) return !0;
		if (r.length === 1 && r[0].semver === u) {
			if (s.length === 1 && s[0].semver === u) return !0;
			r = c.includePrerelease ? m : h;
		}
		if (s.length === 1 && s[0].semver === u) {
			if (c.includePrerelease) return !0;
			s = h;
		}
		let l = /* @__PURE__ */ new Set(), p, g;
		for (let s of r) s.operator === ">" || s.operator === ">=" ? p = _(p, s, c) : s.operator === "<" || s.operator === "<=" ? g = v(g, s, c) : l.add(s.semver);
		if (l.size > 1) return null;
		let y;
		if (p && g && (y = f(p.semver, g.semver, c), y > 0 || y === 0 && (p.operator !== ">=" || g.operator !== "<="))) return null;
		for (let r of l) {
			if (p && !d(r, String(p), c) || g && !d(r, String(g), c)) return null;
			for (let l of s) if (!d(r, String(l), c)) return !1;
			return !0;
		}
		let b, x, S, C, w = g && !c.includePrerelease && g.semver.prerelease.length ? g.semver : !1, T = p && !c.includePrerelease && p.semver.prerelease.length ? p.semver : !1;
		w && w.prerelease.length === 1 && g.operator === "<" && w.prerelease[0] === 0 && (w = !1);
		for (let r of s) {
			if (C = C || r.operator === ">" || r.operator === ">=", S = S || r.operator === "<" || r.operator === "<=", p) {
				if (T && r.semver.prerelease && r.semver.prerelease.length && r.semver.major === T.major && r.semver.minor === T.minor && r.semver.patch === T.patch && (T = !1), r.operator === ">" || r.operator === ">=") {
					if (b = _(p, r, c), b === r && b !== p) return !1;
				} else if (p.operator === ">=" && !d(p.semver, String(r), c)) return !1;
			}
			if (g) {
				if (w && r.semver.prerelease && r.semver.prerelease.length && r.semver.major === w.major && r.semver.minor === w.minor && r.semver.patch === w.patch && (w = !1), r.operator === "<" || r.operator === "<=") {
					if (x = v(g, r, c), x === r && x !== g) return !1;
				} else if (g.operator === "<=" && !d(g.semver, String(r), c)) return !1;
			}
			if (!r.operator && (g || p) && y !== 0) return !1;
		}
		return !(p && S && !g && y !== 0 || g && C && !p && y !== 0 || T || w);
	}, _ = (r, s, c) => {
		if (!r) return s;
		let l = f(r.semver, s.semver, c);
		return l > 0 ? r : l < 0 || s.operator === ">" && r.operator === ">=" ? s : r;
	}, v = (r, s, c) => {
		if (!r) return s;
		let l = f(r.semver, s.semver, c);
		return l < 0 ? r : l > 0 || s.operator === "<" && r.operator === "<=" ? s : r;
	};
	s.exports = p;
})), import_semver = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_re(), l = require_constants$1(), u = require_semver$1(), d = require_identifiers();
	s.exports = {
		parse: require_parse(),
		valid: require_valid$1(),
		clean: require_clean(),
		inc: require_inc(),
		diff: require_diff(),
		major: require_major(),
		minor: require_minor(),
		patch: require_patch(),
		prerelease: require_prerelease(),
		compare: require_compare(),
		rcompare: require_rcompare(),
		compareLoose: require_compare_loose(),
		compareBuild: require_compare_build(),
		sort: require_sort(),
		rsort: require_rsort(),
		gt: require_gt(),
		lt: require_lt(),
		eq: require_eq(),
		neq: require_neq(),
		gte: require_gte(),
		lte: require_lte(),
		cmp: require_cmp(),
		coerce: require_coerce(),
		Comparator: require_comparator(),
		Range: require_range(),
		satisfies: require_satisfies(),
		toComparators: require_to_comparators(),
		maxSatisfying: require_max_satisfying(),
		minSatisfying: require_min_satisfying(),
		minVersion: require_min_version(),
		validRange: require_valid(),
		outside: require_outside(),
		gtr: require_gtr(),
		ltr: require_ltr(),
		intersects: require_intersects(),
		simplifyRange: require_simplify(),
		subset: require_subset(),
		SemVer: u,
		re: c.re,
		src: c.src,
		tokens: c.t,
		SEMVER_SPEC_VERSION: l.SEMVER_SPEC_VERSION,
		RELEASE_TYPES: l.RELEASE_TYPES,
		compareIdentifiers: d.compareIdentifiers,
		rcompareIdentifiers: d.rcompareIdentifiers
	};
})))(), 1), objectToString = Object.prototype.toString, uint8ArrayStringified = "[object Uint8Array]", arrayBufferStringified = "[object ArrayBuffer]";
function isType(r, s, c) {
	return r ? r.constructor === s ? !0 : objectToString.call(r) === c : !1;
}
function isUint8Array(r) {
	return isType(r, Uint8Array, uint8ArrayStringified);
}
function isArrayBuffer(r) {
	return isType(r, ArrayBuffer, arrayBufferStringified);
}
function isUint8ArrayOrArrayBuffer(r) {
	return isUint8Array(r) || isArrayBuffer(r);
}
function assertUint8Array(r) {
	if (!isUint8Array(r)) throw TypeError(`Expected \`Uint8Array\`, got \`${typeof r}\``);
}
function assertUint8ArrayOrArrayBuffer(r) {
	if (!isUint8ArrayOrArrayBuffer(r)) throw TypeError(`Expected \`Uint8Array\` or \`ArrayBuffer\`, got \`${typeof r}\``);
}
function concatUint8Arrays(r, s) {
	if (r.length === 0) return new Uint8Array();
	s ??= r.reduce((r, s) => r + s.length, 0);
	let c = new Uint8Array(s), l = 0;
	for (let s of r) assertUint8Array(s), c.set(s, l), l += s.length;
	return c;
}
var cachedDecoders = { utf8: new globalThis.TextDecoder("utf8") };
function uint8ArrayToString(r, s = "utf8") {
	return assertUint8ArrayOrArrayBuffer(r), cachedDecoders[s] ??= new globalThis.TextDecoder(s), cachedDecoders[s].decode(r);
}
function assertString(r) {
	if (typeof r != "string") throw TypeError(`Expected \`string\`, got \`${typeof r}\``);
}
var cachedEncoder = new globalThis.TextEncoder();
function stringToUint8Array(r) {
	return assertString(r), cachedEncoder.encode(r);
}
Array.from({ length: 256 }, (r, s) => s.toString(16).padStart(2, "0"));
var encryptionAlgorithm = "aes-256-cbc", createPlainObject = () => Object.create(null), isExist = (r) => r !== void 0, checkValueType = (r, s) => {
	let c = new Set([
		"undefined",
		"symbol",
		"function"
	]), l = typeof s;
	if (c.has(l)) throw TypeError(`Setting a value of type \`${l}\` for key \`${r}\` is not allowed as it's not supported by JSON`);
}, INTERNAL_KEY = "__internal__", MIGRATION_KEY = `${INTERNAL_KEY}.migrations.version`, Conf = class {
	path;
	events;
	#e;
	#t;
	#n;
	#r = {};
	#i = !1;
	#a;
	#o;
	#s;
	constructor(r = {}) {
		let s = this.#c(r);
		this.#n = s, this.#l(s), this.#d(s), this.#f(s), this.events = new EventTarget(), this.#t = s.encryptionKey, this.path = this.#p(s), this.#m(s), s.watch && this._watch();
	}
	get(r, s) {
		if (this.#n.accessPropertiesByDotNotation) return this._get(r, s);
		let { store: c } = this;
		return r in c ? c[r] : s;
	}
	set(r, s) {
		if (typeof r != "string" && typeof r != "object") throw TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof r}`);
		if (typeof r != "object" && s === void 0) throw TypeError("Use `delete()` to clear values");
		if (this._containsReservedKey(r)) throw TypeError(`Please don't use the ${INTERNAL_KEY} key, as it's used to manage this module internal operations.`);
		let { store: c } = this, l = (r, s) => {
			if (checkValueType(r, s), this.#n.accessPropertiesByDotNotation) setProperty(c, r, s);
			else {
				if (r === "__proto__" || r === "constructor" || r === "prototype") return;
				c[r] = s;
			}
		};
		if (typeof r == "object") {
			let s = r;
			for (let [r, c] of Object.entries(s)) l(r, c);
		} else l(r, s);
		this.store = c;
	}
	has(r) {
		return this.#n.accessPropertiesByDotNotation ? hasProperty(this.store, r) : r in this.store;
	}
	appendToArray(r, s) {
		checkValueType(r, s);
		let c = this.#n.accessPropertiesByDotNotation ? this._get(r, []) : r in this.store ? this.store[r] : [];
		if (!Array.isArray(c)) throw TypeError(`The key \`${r}\` is already set to a non-array value`);
		this.set(r, [...c, s]);
	}
	reset(...r) {
		for (let s of r) isExist(this.#r[s]) && this.set(s, this.#r[s]);
	}
	delete(r) {
		let { store: s } = this;
		this.#n.accessPropertiesByDotNotation ? deleteProperty(s, r) : delete s[r], this.store = s;
	}
	clear() {
		let r = createPlainObject();
		for (let s of Object.keys(this.#r)) isExist(this.#r[s]) && (checkValueType(s, this.#r[s]), this.#n.accessPropertiesByDotNotation ? setProperty(r, s, this.#r[s]) : r[s] = this.#r[s]);
		this.store = r;
	}
	onDidChange(r, s) {
		if (typeof r != "string") throw TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof r}`);
		if (typeof s != "function") throw TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof s}`);
		return this._handleValueChange(() => this.get(r), s);
	}
	onDidAnyChange(r) {
		if (typeof r != "function") throw TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof r}`);
		return this._handleStoreChange(r);
	}
	get size() {
		return Object.keys(this.store).filter((r) => !this._isReservedKeyPath(r)).length;
	}
	get store() {
		try {
			let r = fs.readFileSync(this.path, this.#t ? null : "utf8"), s = this._decryptData(r), c = this._deserialize(s);
			return this.#i || this._validate(c), Object.assign(createPlainObject(), c);
		} catch (r) {
			if (r?.code === "ENOENT") return this._ensureDirectory(), createPlainObject();
			if (this.#n.clearInvalidConfig) {
				let s = r;
				if (s.name === "SyntaxError" || s.message?.startsWith("Config schema violation:")) return createPlainObject();
			}
			throw r;
		}
	}
	set store(r) {
		if (this._ensureDirectory(), !hasProperty(r, INTERNAL_KEY)) try {
			let s = fs.readFileSync(this.path, this.#t ? null : "utf8"), c = this._decryptData(s), l = this._deserialize(c);
			hasProperty(l, INTERNAL_KEY) && setProperty(r, INTERNAL_KEY, getProperty(l, INTERNAL_KEY));
		} catch {}
		this.#i || this._validate(r), this._write(r), this.events.dispatchEvent(new Event("change"));
	}
	*[Symbol.iterator]() {
		for (let [r, s] of Object.entries(this.store)) this._isReservedKeyPath(r) || (yield [r, s]);
	}
	_closeWatcher() {
		this.#a &&= (this.#a.close(), void 0), this.#o &&= (fs.unwatchFile(this.path), !1), this.#s = void 0;
	}
	_decryptData(r) {
		if (!this.#t) return typeof r == "string" ? r : uint8ArrayToString(r);
		try {
			let s = r.slice(0, 16), c = crypto.pbkdf2Sync(this.#t, s, 1e4, 32, "sha512"), l = crypto.createDecipheriv(encryptionAlgorithm, c, s), u = r.slice(17), d = typeof u == "string" ? stringToUint8Array(u) : u;
			return uint8ArrayToString(concatUint8Arrays([l.update(d), l.final()]));
		} catch {
			try {
				let s = r.slice(0, 16), c = crypto.pbkdf2Sync(this.#t, s.toString(), 1e4, 32, "sha512"), l = crypto.createDecipheriv(encryptionAlgorithm, c, s), u = r.slice(17), d = typeof u == "string" ? stringToUint8Array(u) : u;
				return uint8ArrayToString(concatUint8Arrays([l.update(d), l.final()]));
			} catch {}
		}
		return typeof r == "string" ? r : uint8ArrayToString(r);
	}
	_handleStoreChange(r) {
		let s = this.store, c = () => {
			let c = s, l = this.store;
			isDeepStrictEqual(l, c) || (s = l, r.call(this, l, c));
		};
		return this.events.addEventListener("change", c), () => {
			this.events.removeEventListener("change", c);
		};
	}
	_handleValueChange(r, s) {
		let c = r(), l = () => {
			let l = c, u = r();
			isDeepStrictEqual(u, l) || (c = u, s.call(this, u, l));
		};
		return this.events.addEventListener("change", l), () => {
			this.events.removeEventListener("change", l);
		};
	}
	_deserialize = (r) => JSON.parse(r);
	_serialize = (r) => JSON.stringify(r, void 0, "	");
	_validate(r) {
		if (!this.#e || this.#e(r) || !this.#e.errors) return;
		let s = this.#e.errors.map(({ instancePath: r, message: s = "" }) => `\`${r.slice(1)}\` ${s}`);
		throw Error("Config schema violation: " + s.join("; "));
	}
	_ensureDirectory() {
		fs.mkdirSync(path.dirname(this.path), { recursive: !0 });
	}
	_write(r) {
		let s = this._serialize(r);
		if (this.#t) {
			let r = crypto.randomBytes(16), c = crypto.pbkdf2Sync(this.#t, r, 1e4, 32, "sha512"), l = crypto.createCipheriv(encryptionAlgorithm, c, r);
			s = concatUint8Arrays([
				r,
				stringToUint8Array(":"),
				l.update(stringToUint8Array(s)),
				l.final()
			]);
		}
		if (process$1.env.SNAP) fs.writeFileSync(this.path, s, { mode: this.#n.configFileMode });
		else try {
			writeFileSync(this.path, s, { mode: this.#n.configFileMode });
		} catch (r) {
			if (r?.code === "EXDEV") {
				fs.writeFileSync(this.path, s, { mode: this.#n.configFileMode });
				return;
			}
			throw r;
		}
	}
	_watch() {
		if (this._ensureDirectory(), fs.existsSync(this.path) || this._write(createPlainObject()), process$1.platform === "win32" || process$1.platform === "darwin") {
			this.#s ??= debounce_fn_default(() => {
				this.events.dispatchEvent(new Event("change"));
			}, { wait: 100 });
			let r = path.dirname(this.path), s = path.basename(this.path);
			this.#a = fs.watch(r, {
				persistent: !1,
				encoding: "utf8"
			}, (r, c) => {
				c && c !== s || typeof this.#s == "function" && this.#s();
			});
		} else this.#s ??= debounce_fn_default(() => {
			this.events.dispatchEvent(new Event("change"));
		}, { wait: 1e3 }), fs.watchFile(this.path, { persistent: !1 }, (r, s) => {
			typeof this.#s == "function" && this.#s();
		}), this.#o = !0;
	}
	_migrate(r, s, c) {
		let l = this._get(MIGRATION_KEY, "0.0.0"), u = Object.keys(r).filter((r) => this._shouldPerformMigration(r, l, s)), d = structuredClone(this.store);
		for (let f of u) try {
			c && c(this, {
				fromVersion: l,
				toVersion: f,
				finalVersion: s,
				versions: u
			});
			let p = r[f];
			p?.(this), this._set(MIGRATION_KEY, f), l = f, d = structuredClone(this.store);
		} catch (r) {
			this.store = d;
			try {
				this._write(d);
			} catch {}
			let s = r instanceof Error ? r.message : String(r);
			throw Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${s}`);
		}
		(this._isVersionInRangeFormat(l) || !import_semver.default.eq(l, s)) && this._set(MIGRATION_KEY, s);
	}
	_containsReservedKey(r) {
		return typeof r == "string" ? this._isReservedKeyPath(r) : !r || typeof r != "object" ? !1 : this._objectContainsReservedKey(r);
	}
	_objectContainsReservedKey(r) {
		if (!r || typeof r != "object") return !1;
		for (let [s, c] of Object.entries(r)) if (this._isReservedKeyPath(s) || this._objectContainsReservedKey(c)) return !0;
		return !1;
	}
	_isReservedKeyPath(r) {
		return r === INTERNAL_KEY || r.startsWith(`${INTERNAL_KEY}.`);
	}
	_isVersionInRangeFormat(r) {
		return import_semver.default.clean(r) === null;
	}
	_shouldPerformMigration(r, s, c) {
		return this._isVersionInRangeFormat(r) ? s !== "0.0.0" && import_semver.default.satisfies(s, r) ? !1 : import_semver.default.satisfies(c, r) : !(import_semver.default.lte(r, s) || import_semver.default.gt(r, c));
	}
	_get(r, s) {
		return getProperty(this.store, r, s);
	}
	_set(r, s) {
		let { store: c } = this;
		setProperty(c, r, s), this.store = c;
	}
	#c(r) {
		let s = {
			configName: "config",
			fileExtension: "json",
			projectSuffix: "nodejs",
			clearInvalidConfig: !1,
			accessPropertiesByDotNotation: !0,
			configFileMode: 438,
			...r
		};
		if (!s.cwd) {
			if (!s.projectName) throw Error("Please specify the `projectName` option.");
			s.cwd = envPaths(s.projectName, { suffix: s.projectSuffix }).config;
		}
		return typeof s.fileExtension == "string" && (s.fileExtension = s.fileExtension.replace(/^\.+/, "")), s;
	}
	#l(r) {
		if (!(r.schema ?? r.ajvOptions ?? r.rootSchema)) return;
		if (r.schema && typeof r.schema != "object") throw TypeError("The `schema` option must be an object.");
		let s = import_dist.default.default, c = new import__2020.Ajv2020({
			allErrors: !0,
			useDefaults: !0,
			...r.ajvOptions
		});
		s(c);
		let l = {
			...r.rootSchema,
			type: "object",
			properties: r.schema
		};
		this.#e = c.compile(l), this.#u(r.schema);
	}
	#u(r) {
		let s = Object.entries(r ?? {});
		for (let [r, c] of s) {
			if (!c || typeof c != "object" || !Object.hasOwn(c, "default")) continue;
			let { default: s } = c;
			s !== void 0 && (this.#r[r] = s);
		}
	}
	#d(r) {
		r.defaults && Object.assign(this.#r, r.defaults);
	}
	#f(r) {
		r.serialize && (this._serialize = r.serialize), r.deserialize && (this._deserialize = r.deserialize);
	}
	#p(r) {
		let s = typeof r.fileExtension == "string" ? r.fileExtension : void 0, c = s ? `.${s}` : "";
		return path.resolve(r.cwd, `${r.configName ?? "config"}${c}`);
	}
	#m(r) {
		if (r.migrations) {
			this.#h(r), this._validate(this.store);
			return;
		}
		let s = this.store, c = Object.assign(createPlainObject(), r.defaults ?? {}, s);
		this._validate(c);
		try {
			assert.deepEqual(s, c);
		} catch {
			this.store = c;
		}
	}
	#h(r) {
		let { migrations: s, projectVersion: c } = r;
		if (s) {
			if (!c) throw Error("Please specify the `projectVersion` option.");
			this.#i = !0;
			try {
				let l = this.store, u = Object.assign(createPlainObject(), r.defaults ?? {}, l);
				try {
					assert.deepEqual(l, u);
				} catch {
					this._write(u);
				}
				this._migrate(s, c, r.beforeEachMigration);
			} finally {
				this.#i = !1;
			}
		}
	}
}, { app: app$1, ipcMain: ipcMain$1, shell: shell$1 } = electron, isInitialized = !1, initDataListener = () => {
	if (!ipcMain$1 || !app$1) throw Error("Electron Store: You need to call `.initRenderer()` from the main process.");
	let r = {
		defaultCwd: app$1.getPath("userData"),
		appVersion: app$1.getVersion()
	};
	return isInitialized ? r : (ipcMain$1.on("electron-store-get-data", (s) => {
		s.returnValue = r;
	}), isInitialized = !0, r);
}, ElectronStore = class extends Conf {
	constructor(s) {
		let c, l;
		if (process$1.type === "renderer") {
			let s = electron.ipcRenderer.sendSync("electron-store-get-data");
			if (!s) throw Error("Electron Store: You need to call `.initRenderer()` from the main process.");
			({defaultCwd: c, appVersion: l} = s);
		} else ipcMain$1 && app$1 && ({defaultCwd: c, appVersion: l} = initDataListener());
		s = {
			name: "config",
			...s
		}, s.projectVersion ||= l, s.cwd ? s.cwd = path.isAbsolute(s.cwd) ? s.cwd : path.join(c, s.cwd) : s.cwd = c, s.configName = s.name, delete s.name, super(s);
	}
	static initRenderer() {
		initDataListener();
	}
	async openInEditor() {
		let r = await shell$1.openPath(this.path);
		if (r) throw Error(r);
	}
}, require_constants = /* @__PURE__ */ __commonJSMin(((r, s) => {
	s.exports = {
		LOCHDR: 30,
		LOCSIG: 67324752,
		LOCVER: 4,
		LOCFLG: 6,
		LOCHOW: 8,
		LOCTIM: 10,
		LOCCRC: 14,
		LOCSIZ: 18,
		LOCLEN: 22,
		LOCNAM: 26,
		LOCEXT: 28,
		EXTSIG: 134695760,
		EXTHDR: 16,
		EXTCRC: 4,
		EXTSIZ: 8,
		EXTLEN: 12,
		CENHDR: 46,
		CENSIG: 33639248,
		CENVEM: 4,
		CENVER: 6,
		CENFLG: 8,
		CENHOW: 10,
		CENTIM: 12,
		CENCRC: 16,
		CENSIZ: 20,
		CENLEN: 24,
		CENNAM: 28,
		CENEXT: 30,
		CENCOM: 32,
		CENDSK: 34,
		CENATT: 36,
		CENATX: 38,
		CENOFF: 42,
		ENDHDR: 22,
		ENDSIG: 101010256,
		ENDSUB: 8,
		ENDTOT: 10,
		ENDSIZ: 12,
		ENDOFF: 16,
		ENDCOM: 20,
		END64HDR: 20,
		END64SIG: 117853008,
		END64START: 4,
		END64OFF: 8,
		END64NUMDISKS: 16,
		ZIP64SIG: 101075792,
		ZIP64HDR: 56,
		ZIP64LEAD: 12,
		ZIP64SIZE: 4,
		ZIP64VEM: 12,
		ZIP64VER: 14,
		ZIP64DSK: 16,
		ZIP64DSKDIR: 20,
		ZIP64SUB: 24,
		ZIP64TOT: 32,
		ZIP64SIZB: 40,
		ZIP64OFF: 48,
		ZIP64EXTRA: 56,
		STORED: 0,
		SHRUNK: 1,
		REDUCED1: 2,
		REDUCED2: 3,
		REDUCED3: 4,
		REDUCED4: 5,
		IMPLODED: 6,
		DEFLATED: 8,
		ENHANCED_DEFLATED: 9,
		PKWARE: 10,
		BZIP2: 12,
		LZMA: 14,
		IBM_TERSE: 18,
		IBM_LZ77: 19,
		AES_ENCRYPT: 99,
		FLG_ENC: 1,
		FLG_COMP1: 2,
		FLG_COMP2: 4,
		FLG_DESC: 8,
		FLG_ENH: 16,
		FLG_PATCH: 32,
		FLG_STR: 64,
		FLG_EFS: 2048,
		FLG_MSK: 4096,
		FILE: 2,
		BUFFER: 1,
		NONE: 0,
		EF_ID: 0,
		EF_SIZE: 2,
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
	};
})), require_errors = /* @__PURE__ */ __commonJSMin(((r) => {
	var s = {
		INVALID_LOC: "Invalid LOC header (bad signature)",
		INVALID_CEN: "Invalid CEN header (bad signature)",
		INVALID_END: "Invalid END header (bad signature)",
		DESCRIPTOR_NOT_EXIST: "No descriptor present",
		DESCRIPTOR_UNKNOWN: "Unknown descriptor format",
		DESCRIPTOR_FAULTY: "Descriptor data is malformed",
		NO_DATA: "Nothing to decompress",
		BAD_CRC: "CRC32 checksum failed {0}",
		FILE_IN_THE_WAY: "There is a file in the way: {0}",
		UNKNOWN_METHOD: "Invalid/unsupported compression method",
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
		CANT_EXTRACT_FILE: "Could not extract the file",
		CANT_OVERRIDE: "Target file already exists",
		DISK_ENTRY_TOO_LARGE: "Number of disk entries is too large",
		NO_ZIP: "No zip file was loaded",
		NO_ENTRY: "Entry doesn't exist",
		DIRECTORY_CONTENT_ERROR: "A directory cannot have content",
		FILE_NOT_FOUND: "File not found: \"{0}\"",
		NOT_IMPLEMENTED: "Not implemented",
		INVALID_FILENAME: "Invalid filename",
		INVALID_FORMAT: "Invalid or unsupported zip format. No END header found",
		INVALID_PASS_PARAM: "Incompatible password parameter",
		WRONG_PASSWORD: "Wrong Password",
		COMMENT_TOO_LONG: "Comment is too long",
		EXTRA_FIELD_PARSE_ERROR: "Extra field parsing error"
	};
	function c(r) {
		return function(...s) {
			return s.length && (r = r.replace(/\{(\d)\}/g, (r, c) => s[c] || "")), /* @__PURE__ */ Error("ADM-ZIP: " + r);
		};
	}
	for (let l of Object.keys(s)) r[l] = c(s[l]);
})), require_utils = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = __require("fs"), l = __require("path"), u = require_constants(), d = require_errors(), f = typeof process == "object" && process.platform === "win32", p = (r) => typeof r == "object" && !!r, m = new Uint32Array(256).map((r, s) => {
		for (let r = 0; r < 8; r++) s & 1 ? s = 3988292384 ^ s >>> 1 : s >>>= 1;
		return s >>> 0;
	});
	function h(r) {
		this.sep = l.sep, this.fs = c, p(r) && p(r.fs) && typeof r.fs.statSync == "function" && (this.fs = r.fs);
	}
	s.exports = h, h.prototype.makeDir = function(r) {
		let s = this;
		function c(r) {
			let c = r.split(s.sep)[0];
			r.split(s.sep).forEach(function(r) {
				if (!(!r || r.substr(-1, 1) === ":")) {
					c += s.sep + r;
					var l;
					try {
						l = s.fs.statSync(c);
					} catch {
						s.fs.mkdirSync(c);
					}
					if (l && l.isFile()) throw d.FILE_IN_THE_WAY(`"${c}"`);
				}
			});
		}
		c(r);
	}, h.prototype.writeFileTo = function(r, s, c, u) {
		let d = this;
		if (d.fs.existsSync(r) && (!c || d.fs.statSync(r).isDirectory())) return !1;
		var f = l.dirname(r);
		d.fs.existsSync(f) || d.makeDir(f);
		var p;
		try {
			p = d.fs.openSync(r, "w", 438);
		} catch {
			d.fs.chmodSync(r, 438), p = d.fs.openSync(r, "w", 438);
		}
		if (p) try {
			d.fs.writeSync(p, s, 0, s.length, 0);
		} finally {
			d.fs.closeSync(p);
		}
		return d.fs.chmodSync(r, u || 438), !0;
	}, h.prototype.writeFileToAsync = function(r, s, c, u, d) {
		typeof u == "function" && (d = u, u = void 0);
		let f = this;
		f.fs.exists(r, function(p) {
			if (p && !c) return d(!1);
			f.fs.stat(r, function(c, m) {
				if (p && m.isDirectory()) return d(!1);
				var h = l.dirname(r);
				f.fs.exists(h, function(c) {
					c || f.makeDir(h), f.fs.open(r, "w", 438, function(c, l) {
						c ? f.fs.chmod(r, 438, function() {
							f.fs.open(r, "w", 438, function(c, l) {
								f.fs.write(l, s, 0, s.length, 0, function() {
									f.fs.close(l, function() {
										f.fs.chmod(r, u || 438, function() {
											d(!0);
										});
									});
								});
							});
						}) : l ? f.fs.write(l, s, 0, s.length, 0, function() {
							f.fs.close(l, function() {
								f.fs.chmod(r, u || 438, function() {
									d(!0);
								});
							});
						}) : f.fs.chmod(r, u || 438, function() {
							d(!0);
						});
					});
				});
			});
		});
	}, h.prototype.findFiles = function(r) {
		let s = this;
		function c(r, u, d) {
			typeof u == "boolean" && (d = u, u = void 0);
			let f = [];
			return s.fs.readdirSync(r).forEach(function(p) {
				let m = l.join(r, p), h = s.fs.statSync(m);
				(!u || u.test(m)) && f.push(l.normalize(m) + (h.isDirectory() ? s.sep : "")), h.isDirectory() && d && (f = f.concat(c(m, u, d)));
			}), f;
		}
		return c(r, void 0, !0);
	}, h.prototype.findFilesAsync = function(r, s) {
		let c = this, u = [];
		c.fs.readdir(r, function(d, f) {
			if (d) return s(d);
			let p = f.length;
			if (!p) return s(null, u);
			f.forEach(function(d) {
				d = l.join(r, d), c.fs.stat(d, function(r, f) {
					if (r) return s(r);
					f && (u.push(l.normalize(d) + (f.isDirectory() ? c.sep : "")), f.isDirectory() ? c.findFilesAsync(d, function(r, c) {
						if (r) return s(r);
						u = u.concat(c), --p || s(null, u);
					}) : --p || s(null, u));
				});
			});
		});
	}, h.prototype.getAttributes = function() {}, h.prototype.setAttributes = function() {}, h.crc32update = function(r, s) {
		return m[(r ^ s) & 255] ^ r >>> 8;
	}, h.crc32 = function(r) {
		typeof r == "string" && (r = Buffer.from(r, "utf8"));
		let s = r.length, c = -1;
		for (let l = 0; l < s;) c = h.crc32update(c, r[l++]);
		return ~c >>> 0;
	}, h.methodToString = function(r) {
		switch (r) {
			case u.STORED: return "STORED (" + r + ")";
			case u.DEFLATED: return "DEFLATED (" + r + ")";
			default: return "UNSUPPORTED (" + r + ")";
		}
	}, h.canonical = function(r) {
		if (!r) return "";
		let s = l.posix.normalize("/" + r.split("\\").join("/"));
		return l.join(".", s);
	}, h.zipnamefix = function(r) {
		if (!r) return "";
		let s = l.posix.normalize("/" + r.split("\\").join("/"));
		return l.posix.join(".", s);
	}, h.findLast = function(r, s) {
		if (!Array.isArray(r)) throw TypeError("arr is not array");
		let c = r.length >>> 0;
		for (let l = c - 1; l >= 0; l--) if (s(r[l], l, r)) return r[l];
	}, h.sanitize = function(r, s) {
		r = l.resolve(l.normalize(r));
		for (var c = s.split("/"), u = 0, d = c.length; u < d; u++) {
			var f = l.normalize(l.join(r, c.slice(u, d).join(l.sep)));
			if (f.indexOf(r) === 0) return f;
		}
		return l.normalize(l.join(r, l.basename(s)));
	}, h.toBuffer = function(r, s) {
		return Buffer.isBuffer(r) ? r : r instanceof Uint8Array ? Buffer.from(r) : typeof r == "string" ? s(r) : Buffer.alloc(0);
	}, h.readBigUInt64LE = function(r, s) {
		var c = Buffer.from(r.slice(s, s + 8));
		return c.swap64(), parseInt(`0x${c.toString("hex")}`);
	}, h.fromDOS2Date = function(r) {
		return new Date((r >> 25 & 127) + 1980, Math.max((r >> 21 & 15) - 1, 0), Math.max(r >> 16 & 31, 1), r >> 11 & 31, r >> 5 & 63, (r & 31) << 1);
	}, h.fromDate2DOS = function(r) {
		let s = 0, c = 0;
		return r.getFullYear() > 1979 && (s = (r.getFullYear() - 1980 & 127) << 9 | r.getMonth() + 1 << 5 | r.getDate(), c = r.getHours() << 11 | r.getMinutes() << 5 | r.getSeconds() >> 1), s << 16 | c;
	}, h.isWin = f, h.crcTable = m;
})), require_fattr = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = __require("path");
	s.exports = function(r, { fs: s }) {
		var l = r || "", u = f(), d = null;
		function f() {
			return {
				directory: !1,
				readonly: !1,
				hidden: !1,
				executable: !1,
				mtime: 0,
				atime: 0
			};
		}
		return l && s.existsSync(l) ? (d = s.statSync(l), u.directory = d.isDirectory(), u.mtime = d.mtime, u.atime = d.atime, u.executable = (73 & d.mode) != 0, u.readonly = (128 & d.mode) == 0, u.hidden = c.basename(l)[0] === ".") : console.warn("Invalid path: " + l), {
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
			decodeAttributes: function() {},
			encodeAttributes: function() {},
			toJSON: function() {
				return {
					path: l,
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
	};
})), require_decoder = /* @__PURE__ */ __commonJSMin(((r, s) => {
	s.exports = {
		efs: !0,
		encode: (r) => Buffer.from(r, "utf8"),
		decode: (r) => r.toString("utf8")
	};
})), require_util = /* @__PURE__ */ __commonJSMin(((r, s) => {
	s.exports = require_utils(), s.exports.Constants = require_constants(), s.exports.Errors = require_errors(), s.exports.FileAttr = require_fattr(), s.exports.decoder = require_decoder();
})), require_entryHeader = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_util(), l = c.Constants;
	s.exports = function() {
		var r = 20, s = 10, u = 0, d = 0, f = 0, p = 0, m = 0, h = 0, g = 0, _ = 0, v = 0, y = 0, b = 0, x = 0, S = 0;
		r |= c.isWin ? 2560 : 768, u |= l.FLG_EFS;
		let C = { extraLen: 0 }, w = (r) => Math.max(0, r) >>> 0, T = (r) => Math.max(0, r) & 255;
		return f = c.fromDate2DOS(/* @__PURE__ */ new Date()), {
			get made() {
				return r;
			},
			set made(s) {
				r = s;
			},
			get version() {
				return s;
			},
			set version(r) {
				s = r;
			},
			get flags() {
				return u;
			},
			set flags(r) {
				u = r;
			},
			get flags_efs() {
				return (u & l.FLG_EFS) > 0;
			},
			set flags_efs(r) {
				r ? u |= l.FLG_EFS : u &= ~l.FLG_EFS;
			},
			get flags_desc() {
				return (u & l.FLG_DESC) > 0;
			},
			set flags_desc(r) {
				r ? u |= l.FLG_DESC : u &= ~l.FLG_DESC;
			},
			get method() {
				return d;
			},
			set method(r) {
				switch (r) {
					case l.STORED: this.version = 10;
					case l.DEFLATED:
					default: this.version = 20;
				}
				d = r;
			},
			get time() {
				return c.fromDOS2Date(this.timeval);
			},
			set time(r) {
				this.timeval = c.fromDate2DOS(r);
			},
			get timeval() {
				return f;
			},
			set timeval(r) {
				f = w(r);
			},
			get timeHighByte() {
				return T(f >>> 8);
			},
			get crc() {
				return p;
			},
			set crc(r) {
				p = w(r);
			},
			get compressedSize() {
				return m;
			},
			set compressedSize(r) {
				m = w(r);
			},
			get size() {
				return h;
			},
			set size(r) {
				h = w(r);
			},
			get fileNameLength() {
				return g;
			},
			set fileNameLength(r) {
				g = r;
			},
			get extraLength() {
				return _;
			},
			set extraLength(r) {
				_ = r;
			},
			get extraLocalLength() {
				return C.extraLen;
			},
			set extraLocalLength(r) {
				C.extraLen = r;
			},
			get commentLength() {
				return v;
			},
			set commentLength(r) {
				v = r;
			},
			get diskNumStart() {
				return y;
			},
			set diskNumStart(r) {
				y = w(r);
			},
			get inAttr() {
				return b;
			},
			set inAttr(r) {
				b = w(r);
			},
			get attr() {
				return x;
			},
			set attr(r) {
				x = w(r);
			},
			get fileAttr() {
				return (x || 0) >> 16 & 4095;
			},
			get offset() {
				return S;
			},
			set offset(r) {
				S = w(r);
			},
			get encrypted() {
				return (u & l.FLG_ENC) === l.FLG_ENC;
			},
			get centralHeaderSize() {
				return l.CENHDR + g + _ + v;
			},
			get realDataOffset() {
				return S + l.LOCHDR + C.fnameLen + C.extraLen;
			},
			get localHeader() {
				return C;
			},
			loadLocalHeaderFromBinary: function(r) {
				var s = r.slice(S, S + l.LOCHDR);
				if (s.readUInt32LE(0) !== l.LOCSIG) throw c.Errors.INVALID_LOC();
				C.version = s.readUInt16LE(l.LOCVER), C.flags = s.readUInt16LE(l.LOCFLG), C.method = s.readUInt16LE(l.LOCHOW), C.time = s.readUInt32LE(l.LOCTIM), C.crc = s.readUInt32LE(l.LOCCRC), C.compressedSize = s.readUInt32LE(l.LOCSIZ), C.size = s.readUInt32LE(l.LOCLEN), C.fnameLen = s.readUInt16LE(l.LOCNAM), C.extraLen = s.readUInt16LE(l.LOCEXT);
				let u = S + l.LOCHDR + C.fnameLen, d = u + C.extraLen;
				return r.slice(u, d);
			},
			loadFromBinary: function(C) {
				if (C.length !== l.CENHDR || C.readUInt32LE(0) !== l.CENSIG) throw c.Errors.INVALID_CEN();
				r = C.readUInt16LE(l.CENVEM), s = C.readUInt16LE(l.CENVER), u = C.readUInt16LE(l.CENFLG), d = C.readUInt16LE(l.CENHOW), f = C.readUInt32LE(l.CENTIM), p = C.readUInt32LE(l.CENCRC), m = C.readUInt32LE(l.CENSIZ), h = C.readUInt32LE(l.CENLEN), g = C.readUInt16LE(l.CENNAM), _ = C.readUInt16LE(l.CENEXT), v = C.readUInt16LE(l.CENCOM), y = C.readUInt16LE(l.CENDSK), b = C.readUInt16LE(l.CENATT), x = C.readUInt32LE(l.CENATX), S = C.readUInt32LE(l.CENOFF);
			},
			localHeaderToBinary: function() {
				var r = Buffer.alloc(l.LOCHDR);
				return r.writeUInt32LE(l.LOCSIG, 0), r.writeUInt16LE(s, l.LOCVER), r.writeUInt16LE(u, l.LOCFLG), r.writeUInt16LE(d, l.LOCHOW), r.writeUInt32LE(f, l.LOCTIM), r.writeUInt32LE(p, l.LOCCRC), r.writeUInt32LE(m, l.LOCSIZ), r.writeUInt32LE(h, l.LOCLEN), r.writeUInt16LE(g, l.LOCNAM), r.writeUInt16LE(C.extraLen, l.LOCEXT), r;
			},
			centralHeaderToBinary: function() {
				var c = Buffer.alloc(l.CENHDR + g + _ + v);
				return c.writeUInt32LE(l.CENSIG, 0), c.writeUInt16LE(r, l.CENVEM), c.writeUInt16LE(s, l.CENVER), c.writeUInt16LE(u, l.CENFLG), c.writeUInt16LE(d, l.CENHOW), c.writeUInt32LE(f, l.CENTIM), c.writeUInt32LE(p, l.CENCRC), c.writeUInt32LE(m, l.CENSIZ), c.writeUInt32LE(h, l.CENLEN), c.writeUInt16LE(g, l.CENNAM), c.writeUInt16LE(_, l.CENEXT), c.writeUInt16LE(v, l.CENCOM), c.writeUInt16LE(y, l.CENDSK), c.writeUInt16LE(b, l.CENATT), c.writeUInt32LE(x, l.CENATX), c.writeUInt32LE(S, l.CENOFF), c;
			},
			toJSON: function() {
				let f = function(r) {
					return r + " bytes";
				};
				return {
					made: r,
					version: s,
					flags: u,
					method: c.methodToString(d),
					time: this.time,
					crc: "0x" + p.toString(16).toUpperCase(),
					compressedSize: f(m),
					size: f(h),
					fileNameLength: f(g),
					extraLength: f(_),
					commentLength: f(v),
					diskNumStart: y,
					inAttr: b,
					attr: x,
					offset: S,
					centralHeaderSize: f(l.CENHDR + g + _ + v)
				};
			},
			toString: function() {
				return JSON.stringify(this.toJSON(), null, "	");
			}
		};
	};
})), require_mainHeader = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_util(), l = c.Constants;
	s.exports = function() {
		var r = 0, s = 0, u = 0, d = 0, f = 0;
		return {
			get diskEntries() {
				return r;
			},
			set diskEntries(c) {
				r = s = c;
			},
			get totalEntries() {
				return s;
			},
			set totalEntries(c) {
				s = r = c;
			},
			get size() {
				return u;
			},
			set size(r) {
				u = r;
			},
			get offset() {
				return d;
			},
			set offset(r) {
				d = r;
			},
			get commentLength() {
				return f;
			},
			set commentLength(r) {
				f = r;
			},
			get mainHeaderSize() {
				return l.ENDHDR + f;
			},
			loadFromBinary: function(p) {
				if ((p.length !== l.ENDHDR || p.readUInt32LE(0) !== l.ENDSIG) && (p.length < l.ZIP64HDR || p.readUInt32LE(0) !== l.ZIP64SIG)) throw c.Errors.INVALID_END();
				p.readUInt32LE(0) === l.ENDSIG ? (r = p.readUInt16LE(l.ENDSUB), s = p.readUInt16LE(l.ENDTOT), u = p.readUInt32LE(l.ENDSIZ), d = p.readUInt32LE(l.ENDOFF), f = p.readUInt16LE(l.ENDCOM)) : (r = c.readBigUInt64LE(p, l.ZIP64SUB), s = c.readBigUInt64LE(p, l.ZIP64TOT), u = c.readBigUInt64LE(p, l.ZIP64SIZE), d = c.readBigUInt64LE(p, l.ZIP64OFF), f = 0);
			},
			toBinary: function() {
				var c = Buffer.alloc(l.ENDHDR + f);
				return c.writeUInt32LE(l.ENDSIG, 0), c.writeUInt32LE(0, 4), c.writeUInt16LE(r, l.ENDSUB), c.writeUInt16LE(s, l.ENDTOT), c.writeUInt32LE(u, l.ENDSIZ), c.writeUInt32LE(d, l.ENDOFF), c.writeUInt16LE(f, l.ENDCOM), c.fill(" ", l.ENDHDR), c;
			},
			toJSON: function() {
				return {
					diskEntries: r,
					totalEntries: s,
					size: u + " bytes",
					offset: function(r, s) {
						let c = r.toString(16).toUpperCase();
						for (; c.length < s;) c = "0" + c;
						return "0x" + c;
					}(d, 4),
					commentLength: f
				};
			},
			toString: function() {
				return JSON.stringify(this.toJSON(), null, "	");
			}
		};
	};
})), require_headers = /* @__PURE__ */ __commonJSMin(((r) => {
	r.EntryHeader = require_entryHeader(), r.MainHeader = require_mainHeader();
})), require_deflater = /* @__PURE__ */ __commonJSMin(((r, s) => {
	s.exports = function(r) {
		var s = __require("zlib"), c = { chunkSize: (parseInt(r.length / 1024) + 1) * 1024 };
		return {
			deflate: function() {
				return s.deflateRawSync(r, c);
			},
			deflateAsync: function(l) {
				var u = s.createDeflateRaw(c), d = [], f = 0;
				u.on("data", function(r) {
					d.push(r), f += r.length;
				}), u.on("end", function() {
					var r = Buffer.alloc(f), s = 0;
					r.fill(0);
					for (var c = 0; c < d.length; c++) {
						var u = d[c];
						u.copy(r, s), s += u.length;
					}
					l && l(r);
				}), u.end(r);
			}
		};
	};
})), require_inflater = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = +(process.versions ? process.versions.node : "").split(".")[0] || 0;
	s.exports = function(r, s) {
		var l = __require("zlib");
		let u = c >= 15 && s > 0 ? { maxOutputLength: s } : {};
		return {
			inflate: function() {
				return l.inflateRawSync(r, u);
			},
			inflateAsync: function(s) {
				var c = l.createInflateRaw(u), d = [], f = 0;
				c.on("data", function(r) {
					d.push(r), f += r.length;
				}), c.on("end", function() {
					var r = Buffer.alloc(f), c = 0;
					r.fill(0);
					for (var l = 0; l < d.length; l++) {
						var u = d[l];
						u.copy(r, c), c += u.length;
					}
					s && s(r);
				}), c.end(r);
			}
		};
	};
})), require_zipcrypto = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var { randomFillSync: c } = __require("crypto"), l = require_errors(), u = new Uint32Array(256).map((r, s) => {
		for (let r = 0; r < 8; r++) s & 1 ? s = s >>> 1 ^ 3988292384 : s >>>= 1;
		return s >>> 0;
	}), d = (r, s) => Math.imul(r, s) >>> 0, f = (r, s) => u[(r ^ s) & 255] ^ r >>> 8, p = () => typeof c == "function" ? c(Buffer.alloc(12)) : p.node();
	p.node = () => {
		let r = Buffer.alloc(12), s = r.length;
		for (let c = 0; c < s; c++) r[c] = Math.random() * 256 & 255;
		return r;
	};
	var m = { genSalt: p };
	function h(r) {
		let s = Buffer.isBuffer(r) ? r : Buffer.from(r);
		this.keys = new Uint32Array([
			305419896,
			591751049,
			878082192
		]);
		for (let r = 0; r < s.length; r++) this.updateKeys(s[r]);
	}
	h.prototype.updateKeys = function(r) {
		let s = this.keys;
		return s[0] = f(s[0], r), s[1] += s[0] & 255, s[1] = d(s[1], 134775813) + 1, s[2] = f(s[2], s[1] >>> 24), r;
	}, h.prototype.next = function() {
		let r = (this.keys[2] | 2) >>> 0;
		return d(r, r ^ 1) >> 8 & 255;
	};
	function g(r) {
		let s = new h(r);
		return function(r) {
			let c = Buffer.alloc(r.length), l = 0;
			for (let u of r) c[l++] = s.updateKeys(u ^ s.next());
			return c;
		};
	}
	function _(r) {
		let s = new h(r);
		return function(r, c, l = 0) {
			c ||= Buffer.alloc(r.length);
			for (let u of r) {
				let r = s.next();
				c[l++] = u ^ r, s.updateKeys(u);
			}
			return c;
		};
	}
	function v(r, s, c) {
		if (!r || !Buffer.isBuffer(r) || r.length < 12) return Buffer.alloc(0);
		let u = g(c), d = u(r.slice(0, 12)), f = (s.flags & 8) == 8 ? s.timeHighByte : s.crc >>> 24;
		if (d[11] !== f) throw l.WRONG_PASSWORD();
		return u(r.slice(12));
	}
	function y(r) {
		Buffer.isBuffer(r) && r.length >= 12 ? m.genSalt = function() {
			return r.slice(0, 12);
		} : r === "node" ? m.genSalt = p.node : m.genSalt = p;
	}
	function b(r, s, c, l = !1) {
		r ??= Buffer.alloc(0), Buffer.isBuffer(r) || (r = Buffer.from(r.toString()));
		let u = _(c), d = m.genSalt();
		d[11] = s.crc >>> 24 & 255, l && (d[10] = s.crc >>> 16 & 255);
		let f = Buffer.alloc(r.length + 12);
		return u(d, f), u(r, f, 12);
	}
	s.exports = {
		decrypt: v,
		encrypt: b,
		_salter: y
	};
})), require_methods = /* @__PURE__ */ __commonJSMin(((r) => {
	r.Deflater = require_deflater(), r.Inflater = require_inflater(), r.ZipCrypto = require_zipcrypto();
})), require_zipEntry = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_util(), l = require_headers(), u = c.Constants, d = require_methods();
	s.exports = function(r, s) {
		var f = new l.EntryHeader(), p = Buffer.alloc(0), m = Buffer.alloc(0), h = !1, g = null, _ = Buffer.alloc(0), v = Buffer.alloc(0), y = !0;
		let b = r, x = typeof b.decoder == "object" ? b.decoder : c.decoder;
		y = x.hasOwnProperty("efs") ? x.efs : !1;
		function S() {
			return !s || !(s instanceof Uint8Array) ? Buffer.alloc(0) : (v = f.loadLocalHeaderFromBinary(s), s.slice(f.realDataOffset, f.realDataOffset + f.compressedSize));
		}
		function C(r) {
			if (f.flags_desc) {
				let l = {}, d = f.realDataOffset + f.compressedSize;
				if (s.readUInt32LE(d) == u.LOCSIG || s.readUInt32LE(d) == u.CENSIG) throw c.Errors.DESCRIPTOR_NOT_EXIST();
				if (s.readUInt32LE(d) == u.EXTSIG) l.crc = s.readUInt32LE(d + u.EXTCRC), l.compressedSize = s.readUInt32LE(d + u.EXTSIZ), l.size = s.readUInt32LE(d + u.EXTLEN);
				else if (s.readUInt16LE(d + 12) === 19280) l.crc = s.readUInt32LE(d + u.EXTCRC - 4), l.compressedSize = s.readUInt32LE(d + u.EXTSIZ - 4), l.size = s.readUInt32LE(d + u.EXTLEN - 4);
				else throw c.Errors.DESCRIPTOR_UNKNOWN();
				if (l.compressedSize !== f.compressedSize || l.size !== f.size || l.crc !== f.crc) throw c.Errors.DESCRIPTOR_FAULTY();
				if (c.crc32(r) !== l.crc) return !1;
			} else if (c.crc32(r) !== f.localHeader.crc) return !1;
			return !0;
		}
		function w(r, s, l) {
			if (s === void 0 && typeof r == "string" && (l = r, r = void 0), h) return r && s && s(Buffer.alloc(0), c.Errors.DIRECTORY_CONTENT_ERROR()), Buffer.alloc(0);
			var u = S();
			if (u.length === 0) return r && s && s(u), u;
			if (f.encrypted) {
				if (typeof l != "string" && !Buffer.isBuffer(l)) throw c.Errors.INVALID_PASS_PARAM();
				u = d.ZipCrypto.decrypt(u, f, l);
			}
			var m = Buffer.alloc(f.size);
			switch (f.method) {
				case c.Constants.STORED:
					if (u.copy(m), C(m)) return r && s && s(m), m;
					throw r && s && s(m, c.Errors.BAD_CRC()), c.Errors.BAD_CRC();
				case c.Constants.DEFLATED:
					var g = new d.Inflater(u, f.size);
					if (r) g.inflateAsync(function(r) {
						r.copy(r, 0), s && (C(r) ? s(r) : s(r, c.Errors.BAD_CRC()));
					});
					else {
						if (g.inflate(m).copy(m, 0), !C(m)) throw c.Errors.BAD_CRC(`"${x.decode(p)}"`);
						return m;
					}
					break;
				default: throw r && s && s(Buffer.alloc(0), c.Errors.UNKNOWN_METHOD()), c.Errors.UNKNOWN_METHOD();
			}
		}
		function T(r, l) {
			if ((!g || !g.length) && Buffer.isBuffer(s)) return r && l && l(S()), S();
			if (g.length && !h) {
				var u;
				switch (f.method) {
					case c.Constants.STORED: return f.compressedSize = f.size, u = Buffer.alloc(g.length), g.copy(u), r && l && l(u), u;
					default:
					case c.Constants.DEFLATED:
						var p = new d.Deflater(g);
						if (r) p.deflateAsync(function(r) {
							u = Buffer.alloc(r.length), f.compressedSize = r.length, r.copy(u), l && l(u);
						});
						else {
							var m = p.deflate();
							return f.compressedSize = m.length, m;
						}
						p = null;
						break;
				}
			} else if (r && l) l(Buffer.alloc(0));
			else return Buffer.alloc(0);
		}
		function E(r, s) {
			return (r.readUInt32LE(s + 4) << 4) + r.readUInt32LE(s);
		}
		function D(r) {
			try {
				for (var s = 0, l, d, f; s + 4 < r.length;) l = r.readUInt16LE(s), s += 2, d = r.readUInt16LE(s), s += 2, f = r.slice(s, s + d), s += d, u.ID_ZIP64 === l && O(f);
			} catch {
				throw c.Errors.EXTRA_FIELD_PARSE_ERROR();
			}
		}
		function O(r) {
			var s, c, l, d;
			r.length >= u.EF_ZIP64_SCOMP && (s = E(r, u.EF_ZIP64_SUNCOMP), f.size === u.EF_ZIP64_OR_32 && (f.size = s)), r.length >= u.EF_ZIP64_RHO && (c = E(r, u.EF_ZIP64_SCOMP), f.compressedSize === u.EF_ZIP64_OR_32 && (f.compressedSize = c)), r.length >= u.EF_ZIP64_DSN && (l = E(r, u.EF_ZIP64_RHO), f.offset === u.EF_ZIP64_OR_32 && (f.offset = l)), r.length >= u.EF_ZIP64_DSN + 4 && (d = r.readUInt32LE(u.EF_ZIP64_DSN), f.diskNumStart === u.EF_ZIP64_OR_16 && (f.diskNumStart = d));
		}
		return {
			get entryName() {
				return x.decode(p);
			},
			get rawEntryName() {
				return p;
			},
			set entryName(r) {
				p = c.toBuffer(r, x.encode);
				var s = p[p.length - 1];
				h = s === 47 || s === 92, f.fileNameLength = p.length;
			},
			get efs() {
				return typeof y == "function" ? y(this.entryName) : y;
			},
			get extra() {
				return _;
			},
			set extra(r) {
				_ = r, f.extraLength = r.length, D(r);
			},
			get comment() {
				return x.decode(m);
			},
			set comment(r) {
				if (m = c.toBuffer(r, x.encode), f.commentLength = m.length, m.length > 65535) throw c.Errors.COMMENT_TOO_LONG();
			},
			get name() {
				var r = x.decode(p);
				return h ? r.substr(r.length - 1).split("/").pop() : r.split("/").pop();
			},
			get isDirectory() {
				return h;
			},
			getCompressedData: function() {
				return T(!1, null);
			},
			getCompressedDataAsync: function(r) {
				T(!0, r);
			},
			setData: function(r) {
				g = c.toBuffer(r, c.decoder.encode), !h && g.length ? (f.size = g.length, f.method = c.Constants.DEFLATED, f.crc = c.crc32(r), f.changed = !0) : f.method = c.Constants.STORED;
			},
			getData: function(r) {
				return f.changed ? g : w(!1, null, r);
			},
			getDataAsync: function(r, s) {
				f.changed ? r(g) : w(!0, r, s);
			},
			set attr(r) {
				f.attr = r;
			},
			get attr() {
				return f.attr;
			},
			set header(r) {
				f.loadFromBinary(r);
			},
			get header() {
				return f;
			},
			packCentralHeader: function() {
				f.flags_efs = this.efs, f.extraLength = _.length;
				var r = f.centralHeaderToBinary(), s = c.Constants.CENHDR;
				return p.copy(r, s), s += p.length, _.copy(r, s), s += f.extraLength, m.copy(r, s), r;
			},
			packLocalHeader: function() {
				let r = 0;
				f.flags_efs = this.efs, f.extraLocalLength = v.length;
				let s = f.localHeaderToBinary(), c = Buffer.alloc(s.length + p.length + f.extraLocalLength);
				return s.copy(c, r), r += s.length, p.copy(c, r), r += p.length, v.copy(c, r), r += v.length, c;
			},
			toJSON: function() {
				let r = function(r) {
					return "<" + (r && r.length + " bytes buffer" || "null") + ">";
				};
				return {
					entryName: this.entryName,
					name: this.name,
					comment: this.comment,
					isDirectory: this.isDirectory,
					header: f.toJSON(),
					compressedData: r(s),
					data: r(g)
				};
			},
			toString: function() {
				return JSON.stringify(this.toJSON(), null, "	");
			}
		};
	};
})), require_zipFile = /* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_zipEntry(), l = require_headers(), u = require_util();
	s.exports = function(r, s) {
		var d = [], f = {}, p = Buffer.alloc(0), m = new l.MainHeader(), h = !1;
		let g = /* @__PURE__ */ new Set(), _ = s, { noSort: v, decoder: y } = _;
		r ? S(_.readEntries) : h = !0;
		function b() {
			let r = /* @__PURE__ */ new Set();
			for (let s of Object.keys(f)) {
				let c = s.split("/");
				if (c.pop(), c.length) for (let s = 0; s < c.length; s++) {
					let l = c.slice(0, s + 1).join("/") + "/";
					r.add(l);
				}
			}
			for (let s of r) if (!(s in f)) {
				let r = new c(_);
				r.entryName = s, r.attr = 16, r.temporary = !0, d.push(r), f[r.entryName] = r, g.add(r);
			}
		}
		function x() {
			if (h = !0, f = {}, m.diskEntries > (r.length - m.offset) / u.Constants.CENHDR) throw u.Errors.DISK_ENTRY_TOO_LARGE();
			d = Array(m.diskEntries);
			for (var s = m.offset, l = 0; l < d.length; l++) {
				var p = s, v = new c(_, r);
				v.header = r.slice(p, p += u.Constants.CENHDR), v.entryName = r.slice(p, p += v.header.fileNameLength), v.header.extraLength && (v.extra = r.slice(p, p += v.header.extraLength)), v.header.commentLength && (v.comment = r.slice(p, p + v.header.commentLength)), s += v.header.centralHeaderSize, d[l] = v, f[v.entryName] = v;
			}
			g.clear(), b();
		}
		function S(s) {
			var c = r.length - u.Constants.ENDHDR, l = Math.max(0, c - 65535), d = l, f = r.length, h = -1, g = 0;
			for (typeof _.trailingSpace == "boolean" && _.trailingSpace && (l = 0); c >= d; c--) if (r[c] === 80) {
				if (r.readUInt32LE(c) === u.Constants.ENDSIG) {
					h = c, g = c, f = c + u.Constants.ENDHDR, d = c - u.Constants.END64HDR;
					continue;
				}
				if (r.readUInt32LE(c) === u.Constants.END64SIG) {
					d = l;
					continue;
				}
				if (r.readUInt32LE(c) === u.Constants.ZIP64SIG) {
					h = c, f = c + u.readBigUInt64LE(r, c + u.Constants.ZIP64SIZE) + u.Constants.ZIP64LEAD;
					break;
				}
			}
			if (h == -1) throw u.Errors.INVALID_FORMAT();
			m.loadFromBinary(r.slice(h, f)), m.commentLength && (p = r.slice(g + u.Constants.ENDHDR)), s && x();
		}
		function C() {
			d.length > 1 && !v && d.sort((r, s) => r.entryName.toLowerCase().localeCompare(s.entryName.toLowerCase()));
		}
		return {
			get entries() {
				return h || x(), d.filter((r) => !g.has(r));
			},
			get comment() {
				return y.decode(p);
			},
			set comment(r) {
				p = u.toBuffer(r, y.encode), m.commentLength = p.length;
			},
			getEntryCount: function() {
				return h ? d.length : m.diskEntries;
			},
			forEach: function(r) {
				this.entries.forEach(r);
			},
			getEntry: function(r) {
				return h || x(), f[r] || null;
			},
			setEntry: function(r) {
				h || x(), d.push(r), f[r.entryName] = r, m.totalEntries = d.length;
			},
			deleteFile: function(r, s = !0) {
				h || x();
				let c = f[r];
				this.getEntryChildren(c, s).map((r) => r.entryName).forEach(this.deleteEntry);
			},
			deleteEntry: function(r) {
				h || x();
				let s = f[r], c = d.indexOf(s);
				c >= 0 && (d.splice(c, 1), delete f[r], m.totalEntries = d.length);
			},
			getEntryChildren: function(r, s = !0) {
				if (h || x(), typeof r == "object") if (r.isDirectory && s) {
					let s = [], c = r.entryName;
					for (let r of d) r.entryName.startsWith(c) && s.push(r);
					return s;
				} else return [r];
				return [];
			},
			getChildCount: function(r) {
				if (r && r.isDirectory) {
					let s = this.getEntryChildren(r);
					return s.includes(r) ? s.length - 1 : s.length;
				}
				return 0;
			},
			compressToBuffer: function() {
				h || x(), C();
				let s = [], c = [], l = 0, d = 0;
				m.size = 0, m.offset = 0;
				let f = 0;
				for (let r of this.entries) {
					let u = r.getCompressedData();
					r.header.offset = d;
					let p = r.packLocalHeader(), h = p.length + u.length;
					d += h, s.push(p), s.push(u);
					let g = r.packCentralHeader();
					c.push(g), m.size += g.length, l += h + g.length, f++;
				}
				l += m.mainHeaderSize, m.offset = d, m.totalEntries = f, d = 0;
				let g = Buffer.alloc(l);
				for (let r of s) r.copy(g, d), d += r.length;
				for (let r of c) r.copy(g, d), d += r.length;
				let _ = m.toBinary();
				return p && p.copy(_, u.Constants.ENDHDR), _.copy(g, d), r = g, h = !1, g;
			},
			toAsyncBuffer: function(s, c, l, d) {
				try {
					h || x(), C();
					let c = [], f = [], g = 0, _ = 0, v = 0;
					m.size = 0, m.offset = 0;
					let y = function(b) {
						if (b.length > 0) {
							let r = b.shift(), s = r.entryName + r.extra.toString();
							l && l(s), r.getCompressedDataAsync(function(l) {
								d && d(s), r.header.offset = _;
								let u = r.packLocalHeader(), p = u.length + l.length;
								_ += p, c.push(u), c.push(l);
								let h = r.packCentralHeader();
								f.push(h), m.size += h.length, g += p + h.length, v++, y(b);
							});
						} else {
							g += m.mainHeaderSize, m.offset = _, m.totalEntries = v, _ = 0;
							let l = Buffer.alloc(g);
							c.forEach(function(r) {
								r.copy(l, _), _ += r.length;
							}), f.forEach(function(r) {
								r.copy(l, _), _ += r.length;
							});
							let d = m.toBinary();
							p && p.copy(d, u.Constants.ENDHDR), d.copy(l, _), r = l, h = !1, s(l);
						}
					};
					y(Array.from(this.entries));
				} catch (r) {
					c(r);
				}
			}
		};
	};
})), import_adm_zip = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((r, s) => {
	var c = require_util(), l = __require("path"), u = require_zipEntry(), d = require_zipFile(), f = (...r) => c.findLast(r, (r) => typeof r == "boolean"), p = (...r) => c.findLast(r, (r) => typeof r == "string"), m = (...r) => c.findLast(r, (r) => typeof r == "function"), h = {
		noSort: !1,
		readEntries: !1,
		method: c.Constants.NONE,
		fs: null
	};
	s.exports = function(r, s) {
		let g = null, _ = Object.assign(Object.create(null), h);
		r && typeof r == "object" && (r instanceof Uint8Array || (Object.assign(_, r), r = _.input ? _.input : void 0, _.input && delete _.input), Buffer.isBuffer(r) && (g = r, _.method = c.Constants.BUFFER, r = void 0)), Object.assign(_, s);
		let v = new c(_);
		if ((typeof _.decoder != "object" || typeof _.decoder.encode != "function" || typeof _.decoder.decode != "function") && (_.decoder = c.decoder), r && typeof r == "string") if (v.fs.existsSync(r)) _.method = c.Constants.FILE, _.filename = r, g = v.fs.readFileSync(r);
		else throw c.Errors.INVALID_FILENAME();
		let y = new d(g, _), { canonical: b, sanitize: x, zipnamefix: S } = c;
		function C(r) {
			if (r && y) {
				var s;
				if (typeof r == "string" && (s = y.getEntry(l.posix.normalize(r))), typeof r == "object" && r.entryName !== void 0 && r.header !== void 0 && (s = y.getEntry(r.entryName)), s) return s;
			}
			return null;
		}
		function w(r) {
			let { join: s, normalize: c, sep: u } = l.posix;
			return s(".", c(u + r.split("\\").join(u) + u));
		}
		function T(r) {
			return r instanceof RegExp ? (function(r) {
				return function(s) {
					return r.test(s);
				};
			})(r) : typeof r == "function" ? r : () => !0;
		}
		let E = (r, s) => {
			let c = s.slice(-1);
			return c = c === v.sep ? v.sep : "", l.relative(r, s) + c;
		};
		return {
			readFile: function(r, s) {
				var c = C(r);
				return c && c.getData(s) || null;
			},
			childCount: function(r) {
				let s = C(r);
				if (s) return y.getChildCount(s);
			},
			readFileAsync: function(r, s) {
				var c = C(r);
				c ? c.getDataAsync(s) : s(null, "getEntry failed for:" + r);
			},
			readAsText: function(r, s) {
				var c = C(r);
				if (c) {
					var l = c.getData();
					if (l && l.length) return l.toString(s || "utf8");
				}
				return "";
			},
			readAsTextAsync: function(r, s, c) {
				var l = C(r);
				l ? l.getDataAsync(function(r, l) {
					if (l) {
						s(r, l);
						return;
					}
					r && r.length ? s(r.toString(c || "utf8")) : s("");
				}) : s("");
			},
			deleteFile: function(r, s = !0) {
				var c = C(r);
				c && y.deleteFile(c.entryName, s);
			},
			deleteEntry: function(r) {
				var s = C(r);
				s && y.deleteEntry(s.entryName);
			},
			addZipComment: function(r) {
				y.comment = r;
			},
			getZipComment: function() {
				return y.comment || "";
			},
			addZipEntryComment: function(r, s) {
				var c = C(r);
				c && (c.comment = s);
			},
			getZipEntryComment: function(r) {
				var s = C(r);
				return s && s.comment || "";
			},
			updateFile: function(r, s) {
				var c = C(r);
				c && c.setData(s);
			},
			addLocalFile: function(r, s, u, d) {
				if (v.fs.existsSync(r)) {
					s = s ? w(s) : "";
					let c = l.win32.basename(l.win32.normalize(r));
					s += u || c;
					let f = v.fs.statSync(r), p = f.isFile() ? v.fs.readFileSync(r) : Buffer.alloc(0);
					f.isDirectory() && (s += v.sep), this.addFile(s, p, d, f);
				} else throw c.Errors.FILE_NOT_FOUND(r);
			},
			addLocalFileAsync: function(r, s) {
				r = typeof r == "object" ? r : { localPath: r };
				let c = l.resolve(r.localPath), { comment: u } = r, { zipPath: d, zipName: f } = r, p = this;
				v.fs.stat(c, function(r, m) {
					if (r) return s(r, !1);
					d = d ? w(d) : "";
					let h = l.win32.basename(l.win32.normalize(c));
					if (d += f || h, m.isFile()) v.fs.readFile(c, function(r, c) {
						return r ? s(r, !1) : (p.addFile(d, c, u, m), setImmediate(s, void 0, !0));
					});
					else if (m.isDirectory()) return d += v.sep, p.addFile(d, Buffer.alloc(0), u, m), setImmediate(s, void 0, !0);
				});
			},
			addLocalFolder: function(r, s, u) {
				if (u = T(u), s = s ? w(s) : "", r = l.normalize(r), v.fs.existsSync(r)) {
					let c = v.findFiles(r), d = this;
					if (c.length) for (let f of c) {
						let c = l.join(s, E(r, f));
						u(c) && d.addLocalFile(f, l.dirname(c));
					}
				} else throw c.Errors.FILE_NOT_FOUND(r);
			},
			addLocalFolderAsync: function(r, s, u, d) {
				d = T(d), u = u ? w(u) : "", r = l.normalize(r);
				var f = this;
				v.fs.open(r, "r", function(l) {
					if (l && l.code === "ENOENT") s(void 0, c.Errors.FILE_NOT_FOUND(r));
					else if (l) s(void 0, l);
					else {
						var p = v.findFiles(r), m = -1, h = function() {
							if (m += 1, m < p.length) {
								var c = p[m], l = E(r, c).split("\\").join("/");
								l = l.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, ""), d(l) ? v.fs.stat(c, function(r, d) {
									r && s(void 0, r), d.isFile() ? v.fs.readFile(c, function(r, c) {
										r ? s(void 0, r) : (f.addFile(u + l, c, "", d), h());
									}) : (f.addFile(u + l + "/", Buffer.alloc(0), "", d), h());
								}) : process.nextTick(() => {
									h();
								});
							} else s(!0, void 0);
						};
						h();
					}
				});
			},
			addLocalFolderAsync2: function(r, s) {
				let u = this;
				r = typeof r == "object" ? r : { localPath: r }, localPath = l.resolve(w(r.localPath));
				let { zipPath: d, filter: f, namefix: p } = r;
				f instanceof RegExp ? f = (function(r) {
					return function(s) {
						return r.test(s);
					};
				})(f) : typeof f != "function" && (f = function() {
					return !0;
				}), d = d ? w(d) : "", p == "latin1" && (p = (r) => r.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, "")), typeof p != "function" && (p = (r) => r);
				let m = (r) => l.join(d, p(E(localPath, r))), h = (r) => l.win32.basename(l.win32.normalize(p(r)));
				v.fs.open(localPath, "r", function(r) {
					r && r.code === "ENOENT" ? s(void 0, c.Errors.FILE_NOT_FOUND(localPath)) : r ? s(void 0, r) : v.findFilesAsync(localPath, function(r, c) {
						if (r) return s(r);
						c = c.filter((r) => f(m(r))), c.length || s(void 0, !1), setImmediate(c.reverse().reduce(function(r, s) {
							return function(c, d) {
								if (c || d === !1) return setImmediate(r, c, !1);
								u.addLocalFileAsync({
									localPath: s,
									zipPath: l.dirname(m(s)),
									zipName: h(s)
								}, r);
							};
						}, s));
					});
				});
			},
			addLocalFolderPromise: function(r, s) {
				return new Promise((c, l) => {
					this.addLocalFolderAsync2(Object.assign({ localPath: r }, s), (r, s) => {
						r && l(r), s && c(this);
					});
				});
			},
			addFile: function(r, s, c, l) {
				r = S(r);
				let d = C(r), f = d != null;
				f || (d = new u(_), d.entryName = r), d.comment = c || "";
				let p = typeof l == "object" && l instanceof v.fs.Stats;
				p && (d.header.time = l.mtime);
				var m = d.isDirectory ? 16 : 0;
				let h = d.isDirectory ? 16384 : 32768;
				return p ? h |= 4095 & l.mode : typeof l == "number" ? h |= 4095 & l : h |= d.isDirectory ? 493 : 420, m = (m | h << 16) >>> 0, d.attr = m, d.setData(s), f || y.setEntry(d), d;
			},
			getEntries: function(r) {
				return y.password = r, y ? y.entries : [];
			},
			getEntry: function(r) {
				return C(r);
			},
			getEntryCount: function() {
				return y.getEntryCount();
			},
			forEach: function(r) {
				return y.forEach(r);
			},
			extractEntryTo: function(r, s, u, d, m, h) {
				d = f(!1, d), m = f(!1, m), u = f(!0, u), h = p(m, h);
				var g = C(r);
				if (!g) throw c.Errors.NO_ENTRY();
				var _ = b(g.entryName), S = x(s, h && !g.isDirectory ? h : u ? _ : l.basename(_));
				if (g.isDirectory) return y.getEntryChildren(g).forEach(function(r) {
					if (r.isDirectory) return;
					var f = r.getData();
					if (!f) throw c.Errors.CANT_EXTRACT_FILE();
					var p = b(r.entryName), h = x(s, u ? p : l.basename(p));
					let g = m ? r.header.fileAttr : void 0;
					v.writeFileTo(h, f, d, g);
				}), !0;
				var w = g.getData(y.password);
				if (!w) throw c.Errors.CANT_EXTRACT_FILE();
				if (v.fs.existsSync(S) && !d) throw c.Errors.CANT_OVERRIDE();
				let T = m ? r.header.fileAttr : void 0;
				return v.writeFileTo(S, w, d, T), !0;
			},
			test: function(r) {
				if (!y) return !1;
				for (var s in y.entries) try {
					if (s.isDirectory) continue;
					if (!y.entries[s].getData(r)) return !1;
				} catch {
					return !1;
				}
				return !0;
			},
			extractAllTo: function(r, s, l, u) {
				if (l = f(!1, l), u = p(l, u), s = f(!1, s), !y) throw c.Errors.NO_ZIP();
				y.entries.forEach(function(d) {
					var f = x(r, b(d.entryName));
					if (d.isDirectory) {
						v.makeDir(f);
						return;
					}
					var p = d.getData(u);
					if (!p) throw c.Errors.CANT_EXTRACT_FILE();
					let m = l ? d.header.fileAttr : void 0;
					v.writeFileTo(f, p, s, m);
					try {
						v.fs.utimesSync(f, d.header.time, d.header.time);
					} catch {
						throw c.Errors.CANT_EXTRACT_FILE();
					}
				});
			},
			extractAllToAsync: function(r, s, u, d) {
				if (d = m(s, u, d), u = f(!1, u), s = f(!1, s), !d) return new Promise((c, l) => {
					this.extractAllToAsync(r, s, u, function(r) {
						r ? l(r) : c(this);
					});
				});
				if (!y) {
					d(c.Errors.NO_ZIP());
					return;
				}
				r = l.resolve(r);
				let p = (s) => x(r, l.normalize(b(s.entryName))), h = (r, s) => /* @__PURE__ */ Error(r + ": \"" + s + "\""), g = [], _ = [];
				y.entries.forEach((r) => {
					r.isDirectory ? g.push(r) : _.push(r);
				});
				for (let r of g) {
					let s = p(r), c = u ? r.header.fileAttr : void 0;
					try {
						v.makeDir(s), c && v.fs.chmodSync(s, c), v.fs.utimesSync(s, r.header.time, r.header.time);
					} catch {
						d(h("Unable to create folder", s));
					}
				}
				_.reverse().reduce(function(d, f) {
					return function(p) {
						if (p) d(p);
						else {
							let p = l.normalize(b(f.entryName)), m = x(r, p);
							f.getDataAsync(function(r, l) {
								if (l) d(l);
								else if (!r) d(c.Errors.CANT_EXTRACT_FILE());
								else {
									let c = u ? f.header.fileAttr : void 0;
									v.writeFileToAsync(m, r, s, c, function(r) {
										r || d(h("Unable to write file", m)), v.fs.utimes(m, f.header.time, f.header.time, function(r) {
											r ? d(h("Unable to set times", m)) : d();
										});
									});
								}
							});
						}
					};
				}, d)();
			},
			writeZip: function(r, s) {
				if (arguments.length === 1 && typeof r == "function" && (s = r, r = ""), !r && _.filename && (r = _.filename), r) {
					var c = y.compressToBuffer();
					if (c) {
						var l = v.writeFileTo(r, c, !0);
						typeof s == "function" && s(l ? null : /* @__PURE__ */ Error("failed"), "");
					}
				}
			},
			writeZipPromise: function(r, s) {
				let { overwrite: c, perm: l } = Object.assign({ overwrite: !0 }, s);
				return new Promise((s, u) => {
					!r && _.filename && (r = _.filename), r || u("ADM-ZIP: ZIP File Name Missing"), this.toBufferPromise().then((d) => {
						v.writeFileToAsync(r, d, c, l, (r) => r ? s(r) : u("ADM-ZIP: Wasn't able to write zip file"));
					}, u);
				});
			},
			toBufferPromise: function() {
				return new Promise((r, s) => {
					y.toAsyncBuffer(r, s);
				});
			},
			toBuffer: function(r, s, c, l) {
				return typeof r == "function" ? (y.toAsyncBuffer(r, s, c, l), null) : y.compressToBuffer();
			}
		};
	};
})))(), 1), appMain_cmn = class r {
	static init(s) {
		r.#e = s, ElectronStore.initRenderer();
	}
	static #e;
	#t;
	#n = {
		getAppPath: app.getAppPath(),
		isPackaged: app.isPackaged,
		downloads: app.getPath("downloads"),
		userData: app.getPath("userData"),
		getVersion: "",
		env: { ...process.env },
		platform: process.platform,
		arch: process.arch
	};
	#r = 0;
	#i = 0;
	#a = 0;
	#o = 0;
	constructor(s, c) {
		this.bw = s, this.version = c;
		let u = r.#e;
		this.#t = process.platform === "win32", s.webContents.on("devtools-opened", () => this.#l()), u.handle("openDevTools", () => s.webContents.openDevTools()), this.#n.getVersion = c, u.handle("getInfo", () => this.#n), u.handle("inited", (r, s, c) => this.#s(s, c)), u.handle("fetch", async (r, s) => {
			let c = await fetch(s, { cache: "no-store" });
			return {
				ok: c.ok,
				txt: await c.text()
			};
		}), u.handle("fetchAb", async (r, s) => {
			let c = await fetch(s, { cache: "no-store" });
			return {
				ok: c.ok,
				ab: await c.arrayBuffer()
			};
		}), u.handle("existsSync", (r, s) => (0, import_lib.existsSync)(s)), u.handle("copy", (r, s, c) => (0, import_lib.copy)(s, c)), u.handle("remove", (r, s) => (0, import_lib.remove)(s)), u.handle("ensureFile", (r, s) => (0, import_lib.ensureFile)(s)), u.handle("readFile", (r, s, c) => (0, import_lib.readFile)(s, c)), u.handle("writeFile", (r, s, c, l) => (0, import_lib.writeFile)(s, c, l)), u.handle("appendFile", (r, s, c) => (0, import_lib.appendFile)(s, c).catch((r) => console.error(r))), u.handle("outputFile", (r, s, c) => (0, import_lib.outputFile)(s, c).catch((r) => console.error(r))), u.handle("win_close", () => s.close()), u.handle("win_setTitle", (r, c) => s.setTitle(c)), u.handle("showMessageBox", (r, c) => dialog.showMessageBox(s, c)), u.handle("showOpenDialog", (r, c) => dialog.showOpenDialog(s, c)), u.handle("capturePage", (r, c, l, u) => s.webContents.capturePage().then(async (r) => {
			await (0, import_lib.ensureFile)(c);
			let s = r.resize({
				width: l,
				height: u,
				quality: "best"
			});
			await (0, import_lib.writeFile)(c, c.endsWith(".png") ? s.toPNG() : s.toJPEG(80));
		})), u.handle("navigate_to", (r, s) => shell.openExternal(s));
		let d;
		u.handle("Store", (r, s) => {
			d = new ElectronStore(s);
		}), u.handle("flush", (r, s) => {
			d.store = s;
		}), u.handle("Store_isEmpty", () => d.size === 0), u.handle("Store_get", () => d.store), u.handle("zip", async (r, s, c) => {
			let l = new import_adm_zip.default();
			l.addLocalFolder(s), await l.writeZipPromise(c);
		}), u.handle("unzip", async (r, s, c) => {
			await (0, import_lib.remove)(c), await (0, import_lib.ensureDir)(c), new import_adm_zip.default(s).extractAllTo(c, !0);
		}), u.handle("isSimpleFullScreen", () => s.simpleFullScreen), this.#t ? (u.handle("setSimpleFullScreen", (r, c) => {
			this.#f = () => {}, s.setSimpleFullScreen(c), c || (s.setPosition(this.#r, this.#i), s.setContentSize(this.#a, this.#o)), this.#f = () => this.#p();
		}), s.on("enter-full-screen", () => {
			this.#f = () => {}, s.setContentSize(this.#d.width, this.#d.height), this.#f = () => this.#p();
		}), s.on("leave-full-screen", () => {
			this.#h(!1, this.#r, this.#i, this.#a, this.#o);
		})) : u.handle("setSimpleFullScreen", (r, c) => {
			s.setSimpleFullScreen(c), !c && s.setContentSize(this.#a, this.#o);
		}), u.handle("window", (r, s, c, l, u, d) => this.#h(s, c, l, u, d)), s.on("move", () => this.#f()), s.on("resize", () => this.#f()), this.#u();
	}
	#s(r, s) {
		let { width: c, height: l } = r.window, { c: u, x: d, y: f, w: p } = s;
		this.#c = c / l;
		let m = p === c ? l : p / this.#c;
		if (this.#t || this.bw.setAspectRatio(this.#c), this.#h(u, d, f, p, m), this.bw.show(), this.#f = () => this.#p(), r.debug.devtool) {
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
		let r = screen.getCursorScreenPoint();
		this.#d = screen.getDisplayNearestPoint(r).workAreaSize;
	}
	#d;
	#f = () => {};
	#p() {
		if (this.#m) return;
		this.#f = () => {};
		let [r, s] = this.bw.getPosition(), [c, l] = this.bw.getContentSize();
		this.#m = setTimeout(() => {
			this.#m = void 0;
			let [u = 0, d = 0] = this.bw.getPosition(), [f = 0, p = 0] = this.bw.getContentSize();
			if (r !== u || s !== d || c !== f || l !== p) {
				this.#p();
				return;
			}
			this.#f = () => this.#p();
			let m = f, h = p;
			this.#t && (c === f ? h = f / this.#c : m = p * this.#c), this.#h(!1, u, d, m, h);
		}, 1e3 / 60 * 10);
	}
	#m = void 0;
	#h(r, s, c, l, u) {
		if (this.bw.simpleFullScreen) return;
		console.log(`fn:appMain.ts window c:${String(r)} (${String(s)},${String(c)},${String(l)},${String(u)}) scr(${String(this.#d.width)},${String(this.#d.height)})`), this.#f = () => {};
		let d = this.#r = Math.round(r ? (this.#d.width - l) * .5 : s), f = this.#i = Math.round(r ? (this.#d.height - u) * .5 : c);
		this.bw.setPosition(d, f);
		let p = this.#a = Math.round(l), m = this.#o = Math.round(u);
		this.bw.setContentSize(p, m), r || this.#u(), this.sendSaveWinInf({
			x: d,
			y: f,
			w: p,
			h: m
		}), this.#f = () => this.#p();
	}
	sendShutdown() {}
	sendSaveWinInf(r) {}
	openDevTools = () => {};
}, IpcListener = class {
	constructor() {
		this.listeners = [], this.handlers = [];
	}
	on(r, s) {
		this.listeners.push(r), ipcMain.on(r, s);
	}
	handle(r, s) {
		this.handlers.push(r), ipcMain.handle(r, s);
	}
	dispose() {
		this.listeners.forEach((r) => ipcMain.removeAllListeners(r)), this.listeners = [], this.handlers.forEach((r) => ipcMain.removeHandler(r)), this.handlers = [];
	}
}, IpcEmitter = class {
	send(r, s, ...c) {
		r.send(s, ...c);
	}
}, appMain = class r extends appMain_cmn {
	static initRenderer(c, l) {
		let u, d = () => {};
		try {
			appMain_cmn.init(new IpcListener()), u = new BrowserWindow({
				show: !1,
				minWidth: 300,
				minHeight: 300,
				acceptFirstMouse: !0,
				maximizable: !1,
				webPreferences: {
					preload: c,
					sandbox: !1
				}
			});
			let f = new r(u, l);
			d = () => f.openDevTools();
		} catch (r) {
			throw console.error(`early err:${String(r)}`), d(), "initRenderer error";
		}
		return u;
	}
	#e = new IpcEmitter();
	sendShutdown() {
		this.#e.send(this.bw.webContents, "shutdown");
	}
	sendSaveWinInf(r) {
		this.#e.send(this.bw.webContents, "save_win_inf", r);
	}
};
export { appMain };

//# sourceMappingURL=appMain.js.map