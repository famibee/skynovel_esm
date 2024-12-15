import { a as b, d as wt, C as ut, b as bt, E as yt, j as kt } from "./web2.js";
var j = Object.freeze({
  Linear: Object.freeze({
    None: function(e) {
      return e;
    },
    In: function(e) {
      return e;
    },
    Out: function(e) {
      return e;
    },
    InOut: function(e) {
      return e;
    }
  }),
  Quadratic: Object.freeze({
    In: function(e) {
      return e * e;
    },
    Out: function(e) {
      return e * (2 - e);
    },
    InOut: function(e) {
      return (e *= 2) < 1 ? 0.5 * e * e : -0.5 * (--e * (e - 2) - 1);
    }
  }),
  Cubic: Object.freeze({
    In: function(e) {
      return e * e * e;
    },
    Out: function(e) {
      return --e * e * e + 1;
    },
    InOut: function(e) {
      return (e *= 2) < 1 ? 0.5 * e * e * e : 0.5 * ((e -= 2) * e * e + 2);
    }
  }),
  Quartic: Object.freeze({
    In: function(e) {
      return e * e * e * e;
    },
    Out: function(e) {
      return 1 - --e * e * e * e;
    },
    InOut: function(e) {
      return (e *= 2) < 1 ? 0.5 * e * e * e * e : -0.5 * ((e -= 2) * e * e * e - 2);
    }
  }),
  Quintic: Object.freeze({
    In: function(e) {
      return e * e * e * e * e;
    },
    Out: function(e) {
      return --e * e * e * e * e + 1;
    },
    InOut: function(e) {
      return (e *= 2) < 1 ? 0.5 * e * e * e * e * e : 0.5 * ((e -= 2) * e * e * e * e + 2);
    }
  }),
  Sinusoidal: Object.freeze({
    In: function(e) {
      return 1 - Math.sin((1 - e) * Math.PI / 2);
    },
    Out: function(e) {
      return Math.sin(e * Math.PI / 2);
    },
    InOut: function(e) {
      return 0.5 * (1 - Math.sin(Math.PI * (0.5 - e)));
    }
  }),
  Exponential: Object.freeze({
    In: function(e) {
      return e === 0 ? 0 : Math.pow(1024, e - 1);
    },
    Out: function(e) {
      return e === 1 ? 1 : 1 - Math.pow(2, -10 * e);
    },
    InOut: function(e) {
      return e === 0 ? 0 : e === 1 ? 1 : (e *= 2) < 1 ? 0.5 * Math.pow(1024, e - 1) : 0.5 * (-Math.pow(2, -10 * (e - 1)) + 2);
    }
  }),
  Circular: Object.freeze({
    In: function(e) {
      return 1 - Math.sqrt(1 - e * e);
    },
    Out: function(e) {
      return Math.sqrt(1 - --e * e);
    },
    InOut: function(e) {
      return (e *= 2) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
    }
  }),
  Elastic: Object.freeze({
    In: function(e) {
      return e === 0 ? 0 : e === 1 ? 1 : -Math.pow(2, 10 * (e - 1)) * Math.sin((e - 1.1) * 5 * Math.PI);
    },
    Out: function(e) {
      return e === 0 ? 0 : e === 1 ? 1 : Math.pow(2, -10 * e) * Math.sin((e - 0.1) * 5 * Math.PI) + 1;
    },
    InOut: function(e) {
      return e === 0 ? 0 : e === 1 ? 1 : (e *= 2, e < 1 ? -0.5 * Math.pow(2, 10 * (e - 1)) * Math.sin((e - 1.1) * 5 * Math.PI) : 0.5 * Math.pow(2, -10 * (e - 1)) * Math.sin((e - 1.1) * 5 * Math.PI) + 1);
    }
  }),
  Back: Object.freeze({
    In: function(e) {
      var t = 1.70158;
      return e === 1 ? 1 : e * e * ((t + 1) * e - t);
    },
    Out: function(e) {
      var t = 1.70158;
      return e === 0 ? 0 : --e * e * ((t + 1) * e + t) + 1;
    },
    InOut: function(e) {
      var t = 2.5949095;
      return (e *= 2) < 1 ? 0.5 * (e * e * ((t + 1) * e - t)) : 0.5 * ((e -= 2) * e * ((t + 1) * e + t) + 2);
    }
  }),
  Bounce: Object.freeze({
    In: function(e) {
      return 1 - j.Bounce.Out(1 - e);
    },
    Out: function(e) {
      return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
    },
    InOut: function(e) {
      return e < 0.5 ? j.Bounce.In(e * 2) * 0.5 : j.Bounce.Out(e * 2 - 1) * 0.5 + 0.5;
    }
  }),
  generatePow: function(e) {
    return e === void 0 && (e = 4), e = e < Number.EPSILON ? Number.EPSILON : e, e = e > 1e4 ? 1e4 : e, {
      In: function(t) {
        return Math.pow(t, e);
      },
      Out: function(t) {
        return 1 - Math.pow(1 - t, e);
      },
      InOut: function(t) {
        return t < 0.5 ? Math.pow(t * 2, e) / 2 : (1 - Math.pow(2 - t * 2, e)) / 2 + 0.5;
      }
    };
  }
}), R = function() {
  return performance.now();
}, Et = (
  /** @class */
  function() {
    function e() {
      for (var t = [], i = 0; i < arguments.length; i++)
        t[i] = arguments[i];
      this._tweens = {}, this._tweensAddedDuringUpdate = {}, this.add.apply(this, t);
    }
    return e.prototype.getAll = function() {
      var t = this;
      return Object.keys(this._tweens).map(function(i) {
        return t._tweens[i];
      });
    }, e.prototype.removeAll = function() {
      this._tweens = {};
    }, e.prototype.add = function() {
      for (var t, i = [], n = 0; n < arguments.length; n++)
        i[n] = arguments[n];
      for (var s = 0, r = i; s < r.length; s++) {
        var a = r[s];
        (t = a._group) === null || t === void 0 || t.remove(a), a._group = this, this._tweens[a.getId()] = a, this._tweensAddedDuringUpdate[a.getId()] = a;
      }
    }, e.prototype.remove = function() {
      for (var t = [], i = 0; i < arguments.length; i++)
        t[i] = arguments[i];
      for (var n = 0, s = t; n < s.length; n++) {
        var r = s[n];
        r._group = void 0, delete this._tweens[r.getId()], delete this._tweensAddedDuringUpdate[r.getId()];
      }
    }, e.prototype.allStopped = function() {
      return this.getAll().every(function(t) {
        return !t.isPlaying();
      });
    }, e.prototype.update = function(t, i) {
      t === void 0 && (t = R()), i === void 0 && (i = !0);
      var n = Object.keys(this._tweens);
      if (n.length !== 0)
        for (; n.length > 0; ) {
          this._tweensAddedDuringUpdate = {};
          for (var s = 0; s < n.length; s++) {
            var r = this._tweens[n[s]], a = !i;
            r && r.update(t, a) === !1 && !i && this.remove(r);
          }
          n = Object.keys(this._tweensAddedDuringUpdate);
        }
    }, e;
  }()
), I = {
  Linear: function(e, t) {
    var i = e.length - 1, n = i * t, s = Math.floor(n), r = I.Utils.Linear;
    return t < 0 ? r(e[0], e[1], n) : t > 1 ? r(e[i], e[i - 1], i - n) : r(e[s], e[s + 1 > i ? i : s + 1], n - s);
  },
  Bezier: function(e, t) {
    for (var i = 0, n = e.length - 1, s = Math.pow, r = I.Utils.Bernstein, a = 0; a <= n; a++)
      i += s(1 - t, n - a) * s(t, a) * e[a] * r(n, a);
    return i;
  },
  CatmullRom: function(e, t) {
    var i = e.length - 1, n = i * t, s = Math.floor(n), r = I.Utils.CatmullRom;
    return e[0] === e[i] ? (t < 0 && (s = Math.floor(n = i * (1 + t))), r(e[(s - 1 + i) % i], e[s], e[(s + 1) % i], e[(s + 2) % i], n - s)) : t < 0 ? e[0] - (r(e[0], e[0], e[1], e[1], -n) - e[0]) : t > 1 ? e[i] - (r(e[i], e[i], e[i - 1], e[i - 1], n - i) - e[i]) : r(e[s ? s - 1 : 0], e[s], e[i < s + 1 ? i : s + 1], e[i < s + 2 ? i : s + 2], n - s);
  },
  Utils: {
    Linear: function(e, t, i) {
      return (t - e) * i + e;
    },
    Bernstein: function(e, t) {
      var i = I.Utils.Factorial;
      return i(e) / i(t) / i(e - t);
    },
    Factorial: /* @__PURE__ */ function() {
      var e = [1];
      return function(t) {
        var i = 1;
        if (e[t])
          return e[t];
        for (var n = t; n > 1; n--)
          i *= n;
        return e[t] = i, i;
      };
    }(),
    CatmullRom: function(e, t, i, n, s) {
      var r = (i - e) * 0.5, a = (n - t) * 0.5, o = s * s, h = s * o;
      return (2 * t - 2 * i + r + a) * h + (-3 * t + 3 * i - 2 * r - a) * o + r * s + t;
    }
  }
}, Tt = (
  /** @class */
  function() {
    function e() {
    }
    return e.nextId = function() {
      return e._nextId++;
    }, e._nextId = 0, e;
  }()
), X = new Et(), xt = (
  /** @class */
  function() {
    function e(t, i) {
      this._isPaused = !1, this._pauseStart = 0, this._valuesStart = {}, this._valuesEnd = {}, this._valuesStartRepeat = {}, this._duration = 1e3, this._isDynamic = !1, this._initialRepeat = 0, this._repeat = 0, this._yoyo = !1, this._isPlaying = !1, this._reversed = !1, this._delayTime = 0, this._startTime = 0, this._easingFunction = j.Linear.None, this._interpolationFunction = I.Linear, this._chainedTweens = [], this._onStartCallbackFired = !1, this._onEveryStartCallbackFired = !1, this._id = Tt.nextId(), this._isChainStopped = !1, this._propertiesAreSetUp = !1, this._goToEnd = !1, this._object = t, typeof i == "object" ? (this._group = i, i.add(this)) : i === !0 && (this._group = X, X.add(this));
    }
    return e.prototype.getId = function() {
      return this._id;
    }, e.prototype.isPlaying = function() {
      return this._isPlaying;
    }, e.prototype.isPaused = function() {
      return this._isPaused;
    }, e.prototype.getDuration = function() {
      return this._duration;
    }, e.prototype.to = function(t, i) {
      if (i === void 0 && (i = 1e3), this._isPlaying)
        throw new Error("Can not call Tween.to() while Tween is already started or paused. Stop the Tween first.");
      return this._valuesEnd = t, this._propertiesAreSetUp = !1, this._duration = i < 0 ? 0 : i, this;
    }, e.prototype.duration = function(t) {
      return t === void 0 && (t = 1e3), this._duration = t < 0 ? 0 : t, this;
    }, e.prototype.dynamic = function(t) {
      return t === void 0 && (t = !1), this._isDynamic = t, this;
    }, e.prototype.start = function(t, i) {
      if (t === void 0 && (t = R()), i === void 0 && (i = !1), this._isPlaying)
        return this;
      if (this._repeat = this._initialRepeat, this._reversed) {
        this._reversed = !1;
        for (var n in this._valuesStartRepeat)
          this._swapEndStartRepeatValues(n), this._valuesStart[n] = this._valuesStartRepeat[n];
      }
      if (this._isPlaying = !0, this._isPaused = !1, this._onStartCallbackFired = !1, this._onEveryStartCallbackFired = !1, this._isChainStopped = !1, this._startTime = t, this._startTime += this._delayTime, !this._propertiesAreSetUp || i) {
        if (this._propertiesAreSetUp = !0, !this._isDynamic) {
          var s = {};
          for (var r in this._valuesEnd)
            s[r] = this._valuesEnd[r];
          this._valuesEnd = s;
        }
        this._setupProperties(this._object, this._valuesStart, this._valuesEnd, this._valuesStartRepeat, i);
      }
      return this;
    }, e.prototype.startFromCurrentValues = function(t) {
      return this.start(t, !0);
    }, e.prototype._setupProperties = function(t, i, n, s, r) {
      for (var a in n) {
        var o = t[a], h = Array.isArray(o), T = h ? "array" : typeof o, _ = !h && Array.isArray(n[a]);
        if (!(T === "undefined" || T === "function")) {
          if (_) {
            var g = n[a];
            if (g.length === 0)
              continue;
            for (var x = [o], p = 0, J = g.length; p < J; p += 1) {
              var V = this._handleRelativeValue(o, g[p]);
              if (isNaN(V)) {
                _ = !1, console.warn("Found invalid interpolation list. Skipping.");
                break;
              }
              x.push(V);
            }
            _ && (n[a] = x);
          }
          if ((T === "object" || h) && o && !_) {
            i[a] = h ? [] : {};
            var m = o;
            for (var S in m)
              i[a][S] = m[S];
            s[a] = h ? [] : {};
            var g = n[a];
            if (!this._isDynamic) {
              var ot = {};
              for (var S in g)
                ot[S] = g[S];
              n[a] = g = ot;
            }
            this._setupProperties(m, i[a], g, s[a], r);
          } else
            (typeof i[a] > "u" || r) && (i[a] = o), h || (i[a] *= 1), _ ? s[a] = n[a].slice().reverse() : s[a] = i[a] || 0;
        }
      }
    }, e.prototype.stop = function() {
      return this._isChainStopped || (this._isChainStopped = !0, this.stopChainedTweens()), this._isPlaying ? (this._isPlaying = !1, this._isPaused = !1, this._onStopCallback && this._onStopCallback(this._object), this) : this;
    }, e.prototype.end = function() {
      return this._goToEnd = !0, this.update(this._startTime + this._duration), this;
    }, e.prototype.pause = function(t) {
      return t === void 0 && (t = R()), this._isPaused || !this._isPlaying ? this : (this._isPaused = !0, this._pauseStart = t, this);
    }, e.prototype.resume = function(t) {
      return t === void 0 && (t = R()), !this._isPaused || !this._isPlaying ? this : (this._isPaused = !1, this._startTime += t - this._pauseStart, this._pauseStart = 0, this);
    }, e.prototype.stopChainedTweens = function() {
      for (var t = 0, i = this._chainedTweens.length; t < i; t++)
        this._chainedTweens[t].stop();
      return this;
    }, e.prototype.group = function(t) {
      return t ? (t.add(this), this) : (console.warn("tween.group() without args has been removed, use group.add(tween) instead."), this);
    }, e.prototype.remove = function() {
      var t;
      return (t = this._group) === null || t === void 0 || t.remove(this), this;
    }, e.prototype.delay = function(t) {
      return t === void 0 && (t = 0), this._delayTime = t, this;
    }, e.prototype.repeat = function(t) {
      return t === void 0 && (t = 0), this._initialRepeat = t, this._repeat = t, this;
    }, e.prototype.repeatDelay = function(t) {
      return this._repeatDelayTime = t, this;
    }, e.prototype.yoyo = function(t) {
      return t === void 0 && (t = !1), this._yoyo = t, this;
    }, e.prototype.easing = function(t) {
      return t === void 0 && (t = j.Linear.None), this._easingFunction = t, this;
    }, e.prototype.interpolation = function(t) {
      return t === void 0 && (t = I.Linear), this._interpolationFunction = t, this;
    }, e.prototype.chain = function() {
      for (var t = [], i = 0; i < arguments.length; i++)
        t[i] = arguments[i];
      return this._chainedTweens = t, this;
    }, e.prototype.onStart = function(t) {
      return this._onStartCallback = t, this;
    }, e.prototype.onEveryStart = function(t) {
      return this._onEveryStartCallback = t, this;
    }, e.prototype.onUpdate = function(t) {
      return this._onUpdateCallback = t, this;
    }, e.prototype.onRepeat = function(t) {
      return this._onRepeatCallback = t, this;
    }, e.prototype.onComplete = function(t) {
      return this._onCompleteCallback = t, this;
    }, e.prototype.onStop = function(t) {
      return this._onStopCallback = t, this;
    }, e.prototype.update = function(t, i) {
      var n = this, s;
      if (t === void 0 && (t = R()), i === void 0 && (i = e.autoStartOnUpdate), this._isPaused)
        return !0;
      var r;
      if (!this._goToEnd && !this._isPlaying)
        if (i)
          this.start(t, !0);
        else
          return !1;
      if (this._goToEnd = !1, t < this._startTime)
        return !0;
      this._onStartCallbackFired === !1 && (this._onStartCallback && this._onStartCallback(this._object), this._onStartCallbackFired = !0), this._onEveryStartCallbackFired === !1 && (this._onEveryStartCallback && this._onEveryStartCallback(this._object), this._onEveryStartCallbackFired = !0);
      var a = t - this._startTime, o = this._duration + ((s = this._repeatDelayTime) !== null && s !== void 0 ? s : this._delayTime), h = this._duration + this._repeat * o, T = function() {
        if (n._duration === 0 || a > h)
          return 1;
        var V = Math.trunc(a / o), m = a - V * o, S = Math.min(m / n._duration, 1);
        return S === 0 && a === n._duration ? 1 : S;
      }, _ = T(), g = this._easingFunction(_);
      if (this._updateProperties(this._object, this._valuesStart, this._valuesEnd, g), this._onUpdateCallback && this._onUpdateCallback(this._object, _), this._duration === 0 || a >= this._duration)
        if (this._repeat > 0) {
          var x = Math.min(Math.trunc((a - this._duration) / o) + 1, this._repeat);
          isFinite(this._repeat) && (this._repeat -= x);
          for (r in this._valuesStartRepeat)
            !this._yoyo && typeof this._valuesEnd[r] == "string" && (this._valuesStartRepeat[r] = // eslint-disable-next-line
            // @ts-ignore FIXME?
            this._valuesStartRepeat[r] + parseFloat(this._valuesEnd[r])), this._yoyo && this._swapEndStartRepeatValues(r), this._valuesStart[r] = this._valuesStartRepeat[r];
          return this._yoyo && (this._reversed = !this._reversed), this._startTime += o * x, this._onRepeatCallback && this._onRepeatCallback(this._object), this._onEveryStartCallbackFired = !1, !0;
        } else {
          this._onCompleteCallback && this._onCompleteCallback(this._object);
          for (var p = 0, J = this._chainedTweens.length; p < J; p++)
            this._chainedTweens[p].start(this._startTime + this._duration, !1);
          return this._isPlaying = !1, !1;
        }
      return !0;
    }, e.prototype._updateProperties = function(t, i, n, s) {
      for (var r in n)
        if (i[r] !== void 0) {
          var a = i[r] || 0, o = n[r], h = Array.isArray(t[r]), T = Array.isArray(o), _ = !h && T;
          _ ? t[r] = this._interpolationFunction(o, s) : typeof o == "object" && o ? this._updateProperties(t[r], a, o, s) : (o = this._handleRelativeValue(a, o), typeof o == "number" && (t[r] = a + (o - a) * s));
        }
    }, e.prototype._handleRelativeValue = function(t, i) {
      return typeof i != "string" ? i : i.charAt(0) === "+" || i.charAt(0) === "-" ? t + parseFloat(i) : parseFloat(i);
    }, e.prototype._swapEndStartRepeatValues = function(t) {
      var i = this._valuesStartRepeat[t], n = this._valuesEnd[t];
      typeof n == "string" ? this._valuesStartRepeat[t] = this._valuesStartRepeat[t] + parseFloat(n) : this._valuesStartRepeat[t] = this._valuesEnd[t], this._valuesEnd[t] = i;
    }, e.autoStartOnUpdate = !1, e;
  }()
), E = X;
E.getAll.bind(E);
var Ft = E.removeAll.bind(E);
E.add.bind(E);
var lt = E.remove.bind(E), Ot = E.update.bind(E);
let ft, Z, l, P, w, dt, pt, vt, L, _t = () => {
}, tt, ct, D = !0, F = !1, k = !1, M = !1, c = {}, y = {}, d, v = 0, u = 0, K;
const Pt = "color: yellow; text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;";
let Y = [];
function W() {
  D || (D = !0, l.setVal_Nochk("tmp", "sn.tagL.enabled", !0)), k && (k = !1, l.setVal_Nochk("tmp", "sn.skip.enabled", !1)), M && (M = !1, l.setVal_Nochk("tmp", "sn.auto.enabled", !1));
}
function C() {
  O();
}
function It() {
  B();
}
let O = () => new $(), B = () => new gt();
function Mt(e, t) {
  d = JSON.parse(e), v = d.length, u >= v && (u = v - 1), K = t;
}
class ht {
  #t = new yt();
  constructor(t, i) {
    if (k && !F && !w.isNextKidoku && W(), b(t, "canskip", !0)) {
      const n = () => {
        this.destroy(), W(), i();
      };
      this.#t.add(window, "pointerdown", (s) => {
        s.stopPropagation(), n();
      }), this.#t.add(window, "keydown", (s) => {
        s.isComposing || (s.stopPropagation(), n());
      }), _t(this.#t, n);
    }
  }
  destroy() {
    this.#t.clear();
  }
}
class f {
  constructor(t) {
    this.hArg = t, O = () => new $(), B = () => new gt(), ft(this);
  }
  static init(t, i, n, s, r, a, o, h, T, _, g) {
    ft = t, Z = i, l = n, P = s, w = r, dt = a, pt = o, vt = h, L = () => P.goTxt(), _t = T, tt = _, ct = g, new $(), l.defTmp("sn.tagL.enabled", () => D), l.defValTrg("tmp:sn.tagL.enabled", (x, p) => D = String(p) !== "false"), l.defTmp("sn.skip.all", () => F), l.defValTrg("tmp:sn.skip.all", (x, p) => F = String(p) !== "false"), l.defTmp("sn.skip.enabled", () => k), l.defValTrg("tmp:sn.skip.enabled", (x, p) => k = String(p) !== "false"), l.defTmp("sn.auto.enabled", () => M), l.defValTrg("tmp:sn.auto.enabled", (x, p) => M = String(p) !== "false"), c = {}, y = {};
  }
  destroy() {
    this.onFinish = () => {
    }, this.onUserAct = () => {
    }, this.#i.destroy();
  }
  get isSkipping() {
    return k;
  }
  static getHtmlElmList(t) {
    const i = t.indexOf(":");
    let n = "";
    if (i >= 0) {
      const s = t.slice(4, i), r = `const.sn.frm.${s}`;
      if (!l.getVal(`tmp:${r}`, 0)) throw `HTML【${s}】が読み込まれていません`;
      const o = document.getElementById(s).contentWindow;
      return n = t.slice(i + 1), { el: o.document.querySelectorAll(n), id: s, sel: n };
    }
    return n = t.slice(4), { el: document.querySelectorAll(n), id: "", sel: n };
  }
  static setEvt2Fnc(t, i, n) {
    t ? y[i] = n : c[i] = n;
  }
  static getEvt2Fnc = (t) => c[t] ?? y[t];
  static clear_eventer(t, i, n) {
    if (!t.startsWith("dom=")) return;
    const s = i ? y[n] : c[n];
    s && f.getHtmlElmList(t).el.forEach((r) => r.removeEventListener("click", s)), i ? delete y[n] : delete c[n];
  }
  static clear_event(t) {
    const i = b(t, "global", !1), n = i ? y : c;
    for (const [s, r] of Object.entries(n))
      s.startsWith("dom=") && f.getHtmlElmList(s).el.forEach((a) => a.removeEventListener("click", r));
    return i ? y = {} : c = {}, !1;
  }
  s(t) {
    return this.#n(), z.go(t);
  }
  wait = (t) => k ? (!F && !w.isNextKidoku && W(), !1) : it.go(t);
  waitclick = (t) => rt.go(t);
  waitTxtAndTimer(t, i) {
    return f.#t.once(f.#e, () => {
      if (this.#i.destroy(), t === 0) {
        this.onFinish();
        return;
      }
      const n = new xt({}).to({}, t).onComplete(() => {
        this.#i.destroy(), lt(n), this.onFinish();
      }).start();
      this.waitLimitedEvent(i, () => {
        n.stop(), lt(n), this.onUserAct();
      });
    }), L(), l.saveKidoku(), this.waitLimitedEvent(i, () => {
      f.#t.removeAllListeners(), this.onUserAct();
    });
  }
  static noticeCompTxt() {
    f.#t.emit(f.#e);
  }
  static #t = new wt();
  // static必須
  static #e = "sn:notice_comp_txt";
  static popLocalEvts() {
    const t = c;
    return c = {}, t;
  }
  static pushLocalEvts(t) {
    c = t;
  }
  // 予約イベントの発生待ち
  waitRsvEvent(t, i) {
    if (l.saveKidoku(), t ? c.click = //this.hTag.event({key:'enter', breakout: fnc});
    //hTag.event({key:'down', breakout: fnc});
    //	hTag.event()は内部で使わず、こうする
    c.enter = c.arrowdown = // hTag.event({key:'downwheel', breakout: fnc});
    //	hTag.event()は内部で使わず、こうする
    c["wheel.y>0"] = () => this.onUserAct() : (delete c.click, delete c.enter, delete c.arrowdown, delete c["wheel.y>0"]), f.getEvt2Fnc = i ? (n) => c[n] ?? y[n] : (n) => c[n], w.noticeWait(), ut.debugLog) {
      const n = /* @__PURE__ */ Object.create(null);
      n.local = Object.keys(c), n.global = Object.keys(y), console.log("🎍 wait event... %o", n);
    }
  }
  l(t) {
    if (!D) return !1;
    if (this.#n(!0), M) {
      const i = Number(l.getVal(`sys:sn.auto.msecLineWait${w.isKidoku ? "_Kidoku" : ""}`));
      return q.go(i, t);
    }
    if (k) {
      if (!F && !w.isNextKidoku) return N.go(t);
      if ("ps".includes(l.getVal("sys:sn.skip.mode"))) return q.go(50, t);
    }
    return nt.go(t);
  }
  p(t) {
    if (this.#n(), M) {
      const i = Number(l.getVal(`sys:sn.auto.msecPageWait${w.isKidoku ? "_Kidoku" : ""}`));
      return G.go(i, t);
    }
    if (k) {
      if (!F && !w.isNextKidoku) return A.go(t);
      if (l.getVal("sys:sn.skip.mode") == "s")
        return G.go(50, t);
    }
    return st.go(t);
  }
  // 予約イベントの発生待ちしない waitRsvEvent()
  // 使う場合、外部要因でキャンセルした際は breakLimitedEvent() で後始末を忘れないこと
  waitLimitedEvent(t, i) {
    return this.#i.destroy(), this.#i = new ht(t, i), !0;
  }
  breakEvent(t) {
    f.evnm === t && (f.evnm = "", this.#i.destroy(), C());
  }
  #i = new ht({}, () => {
  });
  // ':タグ名' は未定義、デバッグ時に無視を
  static evnm = "";
  // 状態保存する変数はすべて static に
  waitEvent(t, i, n) {
    return f.evnm = t, k && !F && !w.isNextKidoku ? H.go(i, n) : at.go(i, n);
  }
  onFinish() {
  }
  onUserAct() {
  }
  isWait = !1;
  // 予約イベントの発生待ち中か
  fire(t, i) {
  }
  page(t) {
    if (!("clear" in t || "to" in t || "style" in t)) throw "clear,style,to いずれかは必須です";
    const { style: i } = t;
    if (i)
      return K = i, l.setVal_Nochk("save", "const.sn.styPaging", i), !1;
    if (b(t, "clear", !1))
      return d = [], v = 0, u = 0, l.setVal_Nochk("sys", "const.sn.aPageLog", "[]"), l.setVal_Nochk("save", "const.sn.styPaging", Pt), !1;
    const { to: n, key: s } = t;
    switch (s && (Y = s.split(",")), n) {
      case "prev":
        if (u = v - 1, v < 2) return !1;
        break;
    }
    return Q.go(t);
  }
  #n(t = !1) {
    if (!l.getVal("save:sn.doRecLog")) return;
    const { fn: i, idx: n } = w.nowScrIdx(), s = `${n - 1}:` + i;
    if (d.findIndex((a) => a.key === s) > -1) return;
    d.at(-1)?.week && d.pop();
    const { max_len: r } = ct.oCfg.log;
    d.push({
      key: s,
      week: t,
      fn: l.getVal("save:const.sn.scriptFn", i),
      index: l.getVal("save:const.sn.scriptIdx", 0),
      mark: w.nowMark()
    }) > r && (d = d.slice(-r)), v = d.length, l.setVal_Nochk("sys", "const.sn.aPageLog", JSON.stringify(d));
  }
}
class $ extends f {
  constructor() {
    super({}), Z.resume(), tt.hidden = !0;
  }
  breakEvent() {
  }
}
class U extends f {
  isWait = !0;
  // 予約イベントの発生待ち中か
  fire(t, i) {
    const n = t.toLowerCase();
    if (ut.debugLog && console.log(`👺 fire<(key:\`${n}\` type:${i.type} e:%o)`, { ...i }), n === "enter") {
      const r = vt.getFocus();
      if (r instanceof kt) {
        r.emit("pointerdown", new Event("pointerdown"));
        return;
      }
    }
    const s = f.getEvt2Fnc(n);
    if (!s) {
      n.startsWith("swipe") && globalThis.scrollBy(
        -i.deltaX || 0,
        // NaN なので ?? ではダメ
        -i.deltaY || 0
      );
      return;
    }
    n.endsWith("wheel") || i.preventDefault?.(), i.stopPropagation(), !(!n.startsWith("dom=") && P.clickTxtLay()) && s(i);
  }
}
class z extends U {
  static go = (t) => (new z(t).waitTxtAndTimer(0, {}), O = () => {
  }, !0);
  breakEvent() {
  }
  onFinish() {
    et.go(this.hArg);
  }
  onUserAct() {
    this.onFinish();
  }
}
class et extends U {
  static go = (t) => {
    W();
    const i = b(t, "global", !0);
    return new et(t).waitRsvEvent(!1, i), O = () => {
    }, !0;
  };
  breakEvent() {
  }
  onFinish() {
  }
  onUserAct() {
  }
}
class it extends f {
  // 文字表示終了待ち→[wait]
  static go = (t) => {
    const i = bt(t, "time", NaN);
    return new it(t).waitTxtAndTimer(i, t);
  };
  onFinish() {
    C();
  }
  onUserAct() {
    this.onFinish();
  }
}
class nt extends f {
  // 文字表示終了待ち（そして[l]）
  static go = (t) => new nt(t).waitTxtAndTimer(0, t);
  breakEvent() {
  }
  onFinish() {
    N.go(this.hArg);
  }
  onUserAct() {
    this.onFinish();
  }
}
class q extends f {
  // 文字表示終了待ち（そして[l]auto/skipウェイト待ち）
  static go = (t, i) => new q(i).waitTxtAndTimer(t, i);
  breakEvent() {
  }
  onFinish() {
    C();
  }
  onUserAct() {
    N.go(this.hArg);
  }
}
class N extends U {
  // [l] クリック待ち
  static go = (t) => {
    b(t, "visible", !0) && P.breakLine(t), L();
    const i = b(t, "global", !0);
    return new N(t).waitRsvEvent(!0, i), !0;
  };
  onFinish() {
    C();
  }
  onUserAct() {
    C();
  }
}
class st extends f {
  // 文字表示終了待ち（そして[p]）
  static go = (t) => new st(t).waitTxtAndTimer(0, t);
  breakEvent() {
  }
  onFinish() {
    A.go(this.hArg);
  }
  onUserAct() {
    this.onFinish();
  }
}
class G extends f {
  // 文字表示終了待ち（そして[p]auto/skipウェイト待ち）
  static go = (t, i) => new G(i).waitTxtAndTimer(t, i);
  breakEvent() {
  }
  onFinish() {
    C();
  }
  onUserAct() {
    A.go(this.hArg);
  }
}
class A extends U {
  // [p] クリック待ち
  static go = (t) => {
    b(t, "visible", !0) && P.breakPage(t), L();
    const i = b(t, "global", !0);
    return new A(t).waitRsvEvent(!0, i), !0;
  };
  onFinish() {
    b(this.hArg, "er", !1) && pt.er(this.hArg), dt.clearCache(), C();
  }
  onUserAct() {
    this.onFinish();
  }
}
class rt extends U {
  static go = (t) => new rt(t).waitTxtAndTimer(0, t);
  onFinish() {
    W();
    const t = b(this.hArg, "global", !0);
    this.waitRsvEvent(!0, t);
  }
  onUserAct() {
    C();
  }
}
class at extends f {
  constructor(t, i) {
    super(t), this.onIntr = i;
  }
  // 文字表示終了待ち（そして[*]）
  static go = (t, i) => new at(t, i).waitTxtAndTimer(0, t);
  onFinish() {
    H.go(this.hArg, this.onIntr);
  }
  onUserAct() {
    this.onFinish();
  }
}
class H extends U {
  constructor(t, i) {
    super(t), this.onIntr = i;
  }
  // fireがある → イベント受付する
  //class Rs_Any_Wait extends ReadState {	// fireがない → イベント受付しない
  static go = (t, i) => new H(t, i).waitLimitedEvent(t, i);
  onFinish() {
    C();
  }
  onUserAct() {
    this.onIntr(), this.onFinish();
  }
}
class gt extends f {
  // fireがない → イベント受付しない
  constructor() {
    super({}), O = () => new $(), B = () => {
    };
  }
  breakEvent() {
  }
}
class Q extends z {
  constructor(t) {
    super(t), O = () => {
    }, B = () => new Ct();
  }
  get isSkipping() {
    return !d[u]?.week;
  }
  // return true で良いのだが、[l]でページ移動モードになったあと、[l]に戻ってモード終了してから、[p]に至る文字表示が瞬時表示になる対策
  s = (t) => z.go(t);
  wait = () => !1;
  waitclick = () => !1;
  waitTxtAndTimer = () => !1;
  l(t) {
    return u === v - 1 ? (this.#e(), N.go(t)) : (P.setAllStyle2TxtLay(K), L(), d[u]?.week ? (b(t, "visible", !0) && P.breakLine(t), this.#t(), !0) : !1);
  }
  #t() {
    this.waitRsvEvent(!1, !0);
    let t = {};
    if (Y.length === 0) t = y;
    else for (const i of Y) {
      const n = y[i];
      n && (t[i] = n);
    }
    f.getEvt2Fnc = (i) => c[i] ?? t[i];
  }
  p(t) {
    return u === v - 1 ? (this.#e(), A.go(t)) : (P.setAllStyle2TxtLay(K), L(), b(t, "visible", !0) && P.breakPage(t), this.#t(), !0);
  }
  static go = (t) => (l.setVal_Nochk("tmp", "const.sn.isPaging", !0), new Q(t).page(t));
  page(t) {
    const { to: i, style: n, clear: s } = t;
    if (n || s) return !1;
    switch (i) {
      case "prev":
        if (u === 0) return !1;
        --u;
        break;
      case "next":
        if (u === v - 1) return !1;
        ++u;
        break;
      case "exit":
        u = v - 1, this.#e();
        break;
      case "load":
        v = u + 1, d = d.slice(0, v);
        break;
      default:
        throw `属性to「${i}」は異常です`;
    }
    const r = d[u];
    if (!r) throw `[page] posPage異常:${u}`;
    const { fn: a, index: o, mark: h } = r;
    return w.loadFromMark({ fn: a, index: o }, h);
  }
  #e() {
    l.setVal_Nochk("tmp", "const.sn.isPaging", !1);
  }
  onFinish() {
  }
  onUserAct() {
  }
}
class Ct extends f {
  // fireがない → イベント受付しない
  constructor() {
    super({}), O = () => {
      new Q({}), Z.resume(), tt.hidden = !0;
    }, B = () => {
    };
  }
  breakEvent() {
  }
}
export {
  j as E,
  Pt as I,
  f as R,
  xt as T,
  Ft as a,
  It as d,
  C as e,
  Mt as p,
  lt as r,
  Ot as u
};
//# sourceMappingURL=ReadState.js.map
