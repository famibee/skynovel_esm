import Bc, { ipcMain as oe, dialog as Hc, shell as Wc, BrowserWindow as Kc, app as ct, screen as Ui } from "electron";
import ue from "path";
import Ii from "util";
import Be from "fs";
import wc from "crypto";
import $c from "assert";
import Xc from "events";
import Zc from "os";
import bc from "zlib";
import Jc from "constants";
import Yc from "stream";
var nt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Rc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var tt = { exports: {} };
/*!
 * Platform.js v1.3.6
 * Copyright 2014-2020 Benjamin Tan
 * Copyright 2011-2013 John-David Dalton
 * Available under MIT license
 */
var Qc = tt.exports, zi;
function eu() {
  return zi || (zi = 1, function(e, t) {
    (function() {
      var a = {
        function: !0,
        object: !0
      }, n = a[typeof window] && window || this, c = t, s = e && !e.nodeType && e, r = c && s && typeof nt == "object" && nt;
      r && (r.global === r || r.window === r || r.self === r) && (n = r);
      var l = Math.pow(2, 53) - 1, o = /\bOpera/, i = Object.prototype, d = i.hasOwnProperty, E = i.toString;
      function g($) {
        return $ = String($), $.charAt(0).toUpperCase() + $.slice(1);
      }
      function p($, O, T) {
        var k = {
          "10.0": "10",
          "6.4": "10 Technical Preview",
          "6.3": "8.1",
          "6.2": "8",
          "6.1": "Server 2008 R2 / 7",
          "6.0": "Server 2008 / Vista",
          "5.2": "Server 2003 / XP 64-bit",
          "5.1": "XP",
          "5.01": "2000 SP1",
          "5.0": "2000",
          "4.0": "NT",
          "4.90": "ME"
        };
        return O && T && /^Win/i.test($) && !/^Windows Phone /i.test($) && (k = k[/[\d.]+$/.exec($)]) && ($ = "Windows " + k), $ = String($), O && T && ($ = $.replace(RegExp(O, "i"), T)), $ = b(
          $.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0]
        ), $;
      }
      function w($, O) {
        var T = -1, k = $ ? $.length : 0;
        if (typeof k == "number" && k > -1 && k <= l)
          for (; ++T < k; )
            O($[T], T, $);
        else
          f($, O);
      }
      function b($) {
        return $ = v($), /^(?:webOS|i(?:OS|P))/.test($) ? $ : g($);
      }
      function f($, O) {
        for (var T in $)
          d.call($, T) && O($[T], T, $);
      }
      function h($) {
        return $ == null ? g($) : E.call($).slice(8, -1);
      }
      function u($, O) {
        var T = $ != null ? typeof $[O] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(T) && (T == "object" ? !!$[O] : !0);
      }
      function m($) {
        return String($).replace(/([ -])(?!$)/g, "$1?");
      }
      function y($, O) {
        var T = null;
        return w($, function(k, H) {
          T = O(T, k, H, $);
        }), T;
      }
      function v($) {
        return String($).replace(/^ +| +$/g, "");
      }
      function _($) {
        var O = n, T = $ && typeof $ == "object" && h($) != "String";
        T && (O = $, $ = null);
        var k = O.navigator || {}, H = k.userAgent || "";
        $ || ($ = H);
        var U = T ? !!k.likeChrome : /\bChrome\b/.test($) && !/internal|\n/i.test(E.toString()), z = "Object", V = T ? z : "ScriptBridgingProxyObject", Z = T ? z : "Environment", B = T && O.java ? "JavaPackage" : h(O.java), A = T ? z : "RuntimeObject", x = /\bJava/.test(B) && O.java, D = x && h(O.environment) == Z, C = x ? "a" : "α", j = x ? "b" : "β", L = O.document || {}, R = O.operamini || O.opera, N = o.test(N = T && R ? R["[[Class]]"] : h(R)) ? N : R = null, I, K = $, W = [], Q = null, J = $ == H, P = J && R && typeof R.version == "function" && R.version(), q, M = Se([
          { label: "EdgeHTML", pattern: "Edge" },
          "Trident",
          { label: "WebKit", pattern: "AppleWebKit" },
          "iCab",
          "Presto",
          "NetFront",
          "Tasman",
          "KHTML",
          "Gecko"
        ]), F = pe([
          "Adobe AIR",
          "Arora",
          "Avant Browser",
          "Breach",
          "Camino",
          "Electron",
          "Epiphany",
          "Fennec",
          "Flock",
          "Galeon",
          "GreenBrowser",
          "iCab",
          "Iceweasel",
          "K-Meleon",
          "Konqueror",
          "Lunascape",
          "Maxthon",
          { label: "Microsoft Edge", pattern: "(?:Edge|Edg|EdgA|EdgiOS)" },
          "Midori",
          "Nook Browser",
          "PaleMoon",
          "PhantomJS",
          "Raven",
          "Rekonq",
          "RockMelt",
          { label: "Samsung Internet", pattern: "SamsungBrowser" },
          "SeaMonkey",
          { label: "Silk", pattern: "(?:Cloud9|Silk-Accelerated)" },
          "Sleipnir",
          "SlimBrowser",
          { label: "SRWare Iron", pattern: "Iron" },
          "Sunrise",
          "Swiftfox",
          "Vivaldi",
          "Waterfox",
          "WebPositive",
          { label: "Yandex Browser", pattern: "YaBrowser" },
          { label: "UC Browser", pattern: "UCBrowser" },
          "Opera Mini",
          { label: "Opera Mini", pattern: "OPiOS" },
          "Opera",
          { label: "Opera", pattern: "OPR" },
          "Chromium",
          "Chrome",
          { label: "Chrome", pattern: "(?:HeadlessChrome)" },
          { label: "Chrome Mobile", pattern: "(?:CriOS|CrMo)" },
          { label: "Firefox", pattern: "(?:Firefox|Minefield)" },
          { label: "Firefox for iOS", pattern: "FxiOS" },
          { label: "IE", pattern: "IEMobile" },
          { label: "IE", pattern: "MSIE" },
          "Safari"
        ]), G = Te([
          { label: "BlackBerry", pattern: "BB10" },
          "BlackBerry",
          { label: "Galaxy S", pattern: "GT-I9000" },
          { label: "Galaxy S2", pattern: "GT-I9100" },
          { label: "Galaxy S3", pattern: "GT-I9300" },
          { label: "Galaxy S4", pattern: "GT-I9500" },
          { label: "Galaxy S5", pattern: "SM-G900" },
          { label: "Galaxy S6", pattern: "SM-G920" },
          { label: "Galaxy S6 Edge", pattern: "SM-G925" },
          { label: "Galaxy S7", pattern: "SM-G930" },
          { label: "Galaxy S7 Edge", pattern: "SM-G935" },
          "Google TV",
          "Lumia",
          "iPad",
          "iPod",
          "iPhone",
          "Kindle",
          { label: "Kindle Fire", pattern: "(?:Cloud9|Silk-Accelerated)" },
          "Nexus",
          "Nook",
          "PlayBook",
          "PlayStation Vita",
          "PlayStation",
          "TouchPad",
          "Transformer",
          { label: "Wii U", pattern: "WiiU" },
          "Wii",
          "Xbox One",
          { label: "Xbox 360", pattern: "Xbox" },
          "Xoom"
        ]), Y = me({
          Apple: { iPad: 1, iPhone: 1, iPod: 1 },
          Alcatel: {},
          Archos: {},
          Amazon: { Kindle: 1, "Kindle Fire": 1 },
          Asus: { Transformer: 1 },
          "Barnes & Noble": { Nook: 1 },
          BlackBerry: { PlayBook: 1 },
          Google: { "Google TV": 1, Nexus: 1 },
          HP: { TouchPad: 1 },
          HTC: {},
          Huawei: {},
          Lenovo: {},
          LG: {},
          Microsoft: { Xbox: 1, "Xbox One": 1 },
          Motorola: { Xoom: 1 },
          Nintendo: { "Wii U": 1, Wii: 1 },
          Nokia: { Lumia: 1 },
          Oppo: {},
          Samsung: { "Galaxy S": 1, "Galaxy S2": 1, "Galaxy S3": 1, "Galaxy S4": 1 },
          Sony: { PlayStation: 1, "PlayStation Vita": 1 },
          Xiaomi: { Mi: 1, Redmi: 1 }
        }), X = fe([
          "Windows Phone",
          "KaiOS",
          "Android",
          "CentOS",
          { label: "Chrome OS", pattern: "CrOS" },
          "Debian",
          { label: "DragonFly BSD", pattern: "DragonFly" },
          "Fedora",
          "FreeBSD",
          "Gentoo",
          "Haiku",
          "Kubuntu",
          "Linux Mint",
          "OpenBSD",
          "Red Hat",
          "SuSE",
          "Ubuntu",
          "Xubuntu",
          "Cygwin",
          "Symbian OS",
          "hpwOS",
          "webOS ",
          "webOS",
          "Tablet OS",
          "Tizen",
          "Linux",
          "Mac OS X",
          "Macintosh",
          "Mac",
          "Windows 98;",
          "Windows "
        ]);
        function Se(ce) {
          return y(ce, function(se, re) {
            return se || RegExp("\\b" + (re.pattern || m(re)) + "\\b", "i").exec($) && (re.label || re);
          });
        }
        function me(ce) {
          return y(ce, function(se, re, ge) {
            return se || (re[G] || re[/^[a-z]+(?: +[a-z]+\b)*/i.exec(G)] || RegExp("\\b" + m(ge) + "(?:\\b|\\w*\\d)", "i").exec($)) && ge;
          });
        }
        function pe(ce) {
          return y(ce, function(se, re) {
            return se || RegExp("\\b" + (re.pattern || m(re)) + "\\b", "i").exec($) && (re.label || re);
          });
        }
        function fe(ce) {
          return y(ce, function(se, re) {
            var ge = re.pattern || m(re);
            return !se && (se = RegExp("\\b" + ge + "(?:/[\\d.]+|[ \\w.]*)", "i").exec($)) && (se = p(se, ge, re.label || re)), se;
          });
        }
        function Te(ce) {
          return y(ce, function(se, re) {
            var ge = re.pattern || m(re);
            return !se && (se = RegExp("\\b" + ge + " *\\d+[.\\w_]*", "i").exec($) || RegExp("\\b" + ge + " *\\w+-[\\w]*", "i").exec($) || RegExp("\\b" + ge + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec($)) && ((se = String(re.label && !RegExp(ge, "i").test(re.label) ? re.label : se).split("/"))[1] && !/[\d.]+/.test(se[0]) && (se[0] += " " + se[1]), re = re.label || re, se = b(se[0].replace(RegExp(ge, "i"), re).replace(RegExp("; *(?:" + re + "[_-])?", "i"), " ").replace(RegExp("(" + re + ")[-_.]?(\\w)", "i"), "$1 $2"))), se;
          });
        }
        function ye(ce) {
          return y(ce, function(se, re) {
            return se || (RegExp(re + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec($) || 0)[1] || null;
          });
        }
        function Ke() {
          return this.description || "";
        }
        if (M && (M = [M]), /\bAndroid\b/.test(X) && !G && (I = /\bAndroid[^;]*;(.*?)(?:Build|\) AppleWebKit)\b/i.exec($)) && (G = v(I[1]).replace(/^[a-z]{2}-[a-z]{2};\s*/i, "") || null), Y && !G ? G = Te([Y]) : Y && G && (G = G.replace(RegExp("^(" + m(Y) + ")[-_.\\s]", "i"), Y + " ").replace(RegExp("^(" + m(Y) + ")[-_.]?(\\w)", "i"), Y + " $2")), (I = /\bGoogle TV\b/.exec(G)) && (G = I[0]), /\bSimulator\b/i.test($) && (G = (G ? G + " " : "") + "Simulator"), F == "Opera Mini" && /\bOPiOS\b/.test($) && W.push("running in Turbo/Uncompressed mode"), F == "IE" && /\blike iPhone OS\b/.test($) ? (I = _($.replace(/like iPhone OS/, "")), Y = I.manufacturer, G = I.product) : /^iP/.test(G) ? (F || (F = "Safari"), X = "iOS" + ((I = / OS ([\d_]+)/i.exec($)) ? " " + I[1].replace(/_/g, ".") : "")) : F == "Konqueror" && /^Linux\b/i.test(X) ? X = "Kubuntu" : Y && Y != "Google" && (/Chrome/.test(F) && !/\bMobile Safari\b/i.test($) || /\bVita\b/.test(G)) || /\bAndroid\b/.test(X) && /^Chrome/.test(F) && /\bVersion\//i.test($) ? (F = "Android Browser", X = /\bAndroid\b/.test(X) ? X : "Android") : F == "Silk" ? (/\bMobi/i.test($) || (X = "Android", W.unshift("desktop mode")), /Accelerated *= *true/i.test($) && W.unshift("accelerated")) : F == "UC Browser" && /\bUCWEB\b/.test($) ? W.push("speed mode") : F == "PaleMoon" && (I = /\bFirefox\/([\d.]+)\b/.exec($)) ? W.push("identifying as Firefox " + I[1]) : F == "Firefox" && (I = /\b(Mobile|Tablet|TV)\b/i.exec($)) ? (X || (X = "Firefox OS"), G || (G = I[1])) : !F || (I = !/\bMinefield\b/i.test($) && /\b(?:Firefox|Safari)\b/.exec(F)) ? (F && !G && /[\/,]|^[^(]+?\)/.test($.slice($.indexOf(I + "/") + 8)) && (F = null), (I = G || Y || X) && (G || Y || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(X)) && (F = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(X) ? X : I) + " Browser")) : F == "Electron" && (I = (/\bChrome\/([\d.]+)\b/.exec($) || 0)[1]) && W.push("Chromium " + I), P || (P = ye([
          "(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|HeadlessChrome|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$)|UCBrowser|YaBrowser)",
          "Version",
          m(F),
          "(?:Firefox|Minefield|NetFront)"
        ])), (I = M == "iCab" && parseFloat(P) > 3 && "WebKit" || /\bOpera\b/.test(F) && (/\bOPR\b/.test($) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test($) && !/^(?:Trident|EdgeHTML)$/.test(M) && "WebKit" || !M && /\bMSIE\b/i.test($) && (X == "Mac OS" ? "Tasman" : "Trident") || M == "WebKit" && /\bPlayStation\b(?! Vita\b)/i.test(F) && "NetFront") && (M = [I]), F == "IE" && (I = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec($) || 0)[1]) ? (F += " Mobile", X = "Windows Phone " + (/\+$/.test(I) ? I : I + ".x"), W.unshift("desktop mode")) : /\bWPDesktop\b/i.test($) ? (F = "IE Mobile", X = "Windows Phone 8.x", W.unshift("desktop mode"), P || (P = (/\brv:([\d.]+)/.exec($) || 0)[1])) : F != "IE" && M == "Trident" && (I = /\brv:([\d.]+)/.exec($)) && (F && W.push("identifying as " + F + (P ? " " + P : "")), F = "IE", P = I[1]), J) {
          if (u(O, "global"))
            if (x && (I = x.lang.System, K = I.getProperty("os.arch"), X = X || I.getProperty("os.name") + " " + I.getProperty("os.version")), D) {
              try {
                P = O.require("ringo/engine").version.join("."), F = "RingoJS";
              } catch {
                (I = O.system) && I.global.system == O.system && (F = "Narwhal", X || (X = I[0].os || null));
              }
              F || (F = "Rhino");
            } else typeof O.process == "object" && !O.process.browser && (I = O.process) && (typeof I.versions == "object" && (typeof I.versions.electron == "string" ? (W.push("Node " + I.versions.node), F = "Electron", P = I.versions.electron) : typeof I.versions.nw == "string" && (W.push("Chromium " + P, "Node " + I.versions.node), F = "NW.js", P = I.versions.nw)), F || (F = "Node.js", K = I.arch, X = I.platform, P = /[\d.]+/.exec(I.version), P = P ? P[0] : null));
          else h(I = O.runtime) == V ? (F = "Adobe AIR", X = I.flash.system.Capabilities.os) : h(I = O.phantom) == A ? (F = "PhantomJS", P = (I = I.version || null) && I.major + "." + I.minor + "." + I.patch) : typeof L.documentMode == "number" && (I = /\bTrident\/(\d+)/i.exec($)) ? (P = [P, L.documentMode], (I = +I[1] + 4) != P[1] && (W.push("IE " + P[1] + " mode"), M && (M[1] = ""), P[1] = I), P = F == "IE" ? String(P[1].toFixed(1)) : P[0]) : typeof L.documentMode == "number" && /^(?:Chrome|Firefox)\b/.test(F) && (W.push("masking as " + F + " " + P), F = "IE", P = "11.0", M = ["Trident"], X = "Windows");
          X = X && b(X);
        }
        if (P && (I = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(P) || /(?:alpha|beta)(?: ?\d)?/i.exec($ + ";" + (J && k.appMinorVersion)) || /\bMinefield\b/i.test($) && "a") && (Q = /b/i.test(I) ? "beta" : "alpha", P = P.replace(RegExp(I + "\\+?$"), "") + (Q == "beta" ? j : C) + (/\d+\+?/.exec(I) || "")), F == "Fennec" || F == "Firefox" && /\b(?:Android|Firefox OS|KaiOS)\b/.test(X))
          F = "Firefox Mobile";
        else if (F == "Maxthon" && P)
          P = P.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(G))
          G == "Xbox 360" && (X = null), G == "Xbox 360" && /\bIEMobile\b/.test($) && W.unshift("mobile mode");
        else if ((/^(?:Chrome|IE|Opera)$/.test(F) || F && !G && !/Browser|Mobi/.test(F)) && (X == "Windows CE" || /Mobi/i.test($)))
          F += " Mobile";
        else if (F == "IE" && J)
          try {
            O.external === null && W.unshift("platform preview");
          } catch {
            W.unshift("embedded");
          }
        else (/\bBlackBerry\b/.test(G) || /\bBB10\b/.test($)) && (I = (RegExp(G.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec($) || 0)[1] || P) ? (I = [I, /BB10/.test($)], X = (I[1] ? (G = null, Y = "BlackBerry") : "Device Software") + " " + I[0], P = null) : this != f && G != "Wii" && (J && R || /Opera/.test(F) && /\b(?:MSIE|Firefox)\b/i.test($) || F == "Firefox" && /\bOS X (?:\d+\.){2,}/.test(X) || F == "IE" && (X && !/^Win/.test(X) && P > 5.5 || /\bWindows XP\b/.test(X) && P > 8 || P == 8 && !/\bTrident\b/.test($))) && !o.test(I = _.call(f, $.replace(o, "") + ";")) && I.name && (I = "ing as " + I.name + ((I = I.version) ? " " + I : ""), o.test(F) ? (/\bIE\b/.test(I) && X == "Mac OS" && (X = null), I = "identify" + I) : (I = "mask" + I, N ? F = b(N.replace(/([a-z])([A-Z])/g, "$1 $2")) : F = "Opera", /\bIE\b/.test(I) && (X = null), J || (P = null)), M = ["Presto"], W.push(I));
        (I = (/\bAppleWebKit\/([\d.]+\+?)/i.exec($) || 0)[1]) && (I = [parseFloat(I.replace(/\.(\d)$/, ".0$1")), I], F == "Safari" && I[1].slice(-1) == "+" ? (F = "WebKit Nightly", Q = "alpha", P = I[1].slice(0, -1)) : (P == I[1] || P == (I[2] = (/\bSafari\/([\d.]+\+?)/i.exec($) || 0)[1])) && (P = null), I[1] = (/\b(?:Headless)?Chrome\/([\d.]+)/i.exec($) || 0)[1], I[0] == 537.36 && I[2] == 537.36 && parseFloat(I[1]) >= 28 && M == "WebKit" && (M = ["Blink"]), !J || !U && !I[1] ? (M && (M[1] = "like Safari"), I = (I = I[0], I < 400 ? 1 : I < 500 ? 2 : I < 526 ? 3 : I < 533 ? 4 : I < 534 ? "4+" : I < 535 ? 5 : I < 537 ? 6 : I < 538 ? 7 : I < 601 ? 8 : I < 602 ? 9 : I < 604 ? 10 : I < 606 ? 11 : I < 608 ? 12 : "12")) : (M && (M[1] = "like Chrome"), I = I[1] || (I = I[0], I < 530 ? 1 : I < 532 ? 2 : I < 532.05 ? 3 : I < 533 ? 4 : I < 534.03 ? 5 : I < 534.07 ? 6 : I < 534.1 ? 7 : I < 534.13 ? 8 : I < 534.16 ? 9 : I < 534.24 ? 10 : I < 534.3 ? 11 : I < 535.01 ? 12 : I < 535.02 ? "13+" : I < 535.07 ? 15 : I < 535.11 ? 16 : I < 535.19 ? 17 : I < 536.05 ? 18 : I < 536.1 ? 19 : I < 537.01 ? 20 : I < 537.11 ? "21+" : I < 537.13 ? 23 : I < 537.18 ? 24 : I < 537.24 ? 25 : I < 537.36 ? 26 : M != "Blink" ? "27" : "28")), M && (M[1] += " " + (I += typeof I == "number" ? ".x" : /[.+]/.test(I) ? "" : "+")), F == "Safari" && (!P || parseInt(P) > 45) ? P = I : F == "Chrome" && /\bHeadlessChrome/i.test($) && W.unshift("headless")), F == "Opera" && (I = /\bzbov|zvav$/.exec(X)) ? (F += " ", W.unshift("desktop mode"), I == "zvav" ? (F += "Mini", P = null) : F += "Mobile", X = X.replace(RegExp(" *" + I + "$"), "")) : F == "Safari" && /\bChrome\b/.exec(M && M[1]) ? (W.unshift("desktop mode"), F = "Chrome Mobile", P = null, /\bOS X\b/.test(X) ? (Y = "Apple", X = "iOS 4.3+") : X = null) : /\bSRWare Iron\b/.test(F) && !P && (P = ye("Chrome")), P && P.indexOf(I = /[\d.]+$/.exec(X)) == 0 && $.indexOf("/" + I + "-") > -1 && (X = v(X.replace(I, ""))), X && X.indexOf(F) != -1 && !RegExp(F + " OS").test(X) && (X = X.replace(RegExp(" *" + m(F) + " *"), "")), M && !/\b(?:Avant|Nook)\b/.test(F) && (/Browser|Lunascape|Maxthon/.test(F) || F != "Safari" && /^iOS/.test(X) && /\bSafari\b/.test(M[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|SRWare Iron|Vivaldi|Web)/.test(F) && M[1]) && (I = M[M.length - 1]) && W.push(I), W.length && (W = ["(" + W.join("; ") + ")"]), Y && G && G.indexOf(Y) < 0 && W.push("on " + Y), G && W.push((/^on /.test(W[W.length - 1]) ? "" : "on ") + G), X && (I = / ([\d.+]+)$/.exec(X), q = I && X.charAt(X.length - I[0].length - 1) == "/", X = {
          architecture: 32,
          family: I && !q ? X.replace(I[0], "") : X,
          version: I ? I[1] : null,
          toString: function() {
            var ce = this.version;
            return this.family + (ce && !q ? " " + ce : "") + (this.architecture == 64 ? " 64-bit" : "");
          }
        }), (I = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(K)) && !/\bi686\b/i.test(K) ? (X && (X.architecture = 64, X.family = X.family.replace(RegExp(" *" + I), "")), F && (/\bWOW64\b/i.test($) || J && /\w(?:86|32)$/.test(k.cpuClass || k.platform) && !/\bWin64; x64\b/i.test($)) && W.unshift("32-bit")) : X && /^OS X/.test(X.family) && F == "Chrome" && parseFloat(P) >= 39 && (X.architecture = 64), $ || ($ = null);
        var le = {};
        return le.description = $, le.layout = M && M[0], le.manufacturer = Y, le.name = F, le.prerelease = Q, le.product = G, le.ua = $, le.version = F && P, le.os = X || {
          /**
           * The CPU architecture the OS is built for.
           *
           * @memberOf platform.os
           * @type number|null
           */
          architecture: null,
          /**
           * The family of the OS.
           *
           * Common values include:
           * "Windows", "Windows Server 2008 R2 / 7", "Windows Server 2008 / Vista",
           * "Windows XP", "OS X", "Linux", "Ubuntu", "Debian", "Fedora", "Red Hat",
           * "SuSE", "Android", "iOS" and "Windows Phone"
           *
           * @memberOf platform.os
           * @type string|null
           */
          family: null,
          /**
           * The version of the OS.
           *
           * @memberOf platform.os
           * @type string|null
           */
          version: null,
          /**
           * Returns the OS string.
           *
           * @memberOf platform.os
           * @returns {string} The OS string.
           */
          toString: function() {
            return "null";
          }
        }, le.parse = _, le.toString = Ke, le.version && W.unshift(P), le.name && W.unshift(F), X && F && !(X == String(X).split(" ")[0] && (X == F.split(" ")[0] || G)) && W.push(G ? "(" + X + ")" : "on " + X), W.length && (le.description = W.join(" ")), le;
      }
      var S = _();
      c && s ? f(S, function($, O) {
        c[O] = $;
      }) : n.platform = S;
    }).call(Qc);
  }(tt, tt.exports)), tt.exports;
}
var Xe = eu();
function Oc(e) {
  return parseInt(String(e), 10);
}
"toInt" in String.prototype || (String.prototype.toInt = function() {
  return Oc(this);
});
"toUint" in String.prototype || (String.prototype.toUint = function() {
  const e = Oc(this);
  return e < 0 ? -e : e;
});
class Or {
  static stageW = 0;
  static stageH = 0;
  static debugLog = !1;
  static isSafari = Xe.name === "Safari";
  static isFirefox = Xe.name === "Firefox";
  static isMac = /OS X/.test(Xe.os?.family ?? "");
  static isWin = /Windows/.test(Xe.os?.family ?? "");
  static isMobile = !/(Windows|OS X)/.test(Xe.os?.family ?? "");
  static hDip = {};
  static isDbg = !1;
  static isPackaged = !1;
  static isDarkMode = !1;
  static cc4ColorName;
}
var rt = { exports: {} }, Ir, Vi;
function tu() {
  return Vi || (Vi = 1, Ir = (e) => {
    const t = typeof e;
    return e !== null && (t === "object" || t === "function");
  }), Ir;
}
var Nr, Gi;
function ru() {
  if (Gi) return Nr;
  Gi = 1;
  const e = tu(), t = /* @__PURE__ */ new Set([
    "__proto__",
    "prototype",
    "constructor"
  ]), a = (c) => !c.some((s) => t.has(s));
  function n(c) {
    const s = c.split("."), r = [];
    for (let l = 0; l < s.length; l++) {
      let o = s[l];
      for (; o[o.length - 1] === "\\" && s[l + 1] !== void 0; )
        o = o.slice(0, -1) + ".", o += s[++l];
      r.push(o);
    }
    return a(r) ? r : [];
  }
  return Nr = {
    get(c, s, r) {
      if (!e(c) || typeof s != "string")
        return r === void 0 ? c : r;
      const l = n(s);
      if (l.length !== 0) {
        for (let o = 0; o < l.length; o++)
          if (c = c[l[o]], c == null) {
            if (o !== l.length - 1)
              return r;
            break;
          }
        return c === void 0 ? r : c;
      }
    },
    set(c, s, r) {
      if (!e(c) || typeof s != "string")
        return c;
      const l = c, o = n(s);
      for (let i = 0; i < o.length; i++) {
        const d = o[i];
        e(c[d]) || (c[d] = {}), i === o.length - 1 && (c[d] = r), c = c[d];
      }
      return l;
    },
    delete(c, s) {
      if (!e(c) || typeof s != "string")
        return !1;
      const r = n(s);
      for (let l = 0; l < r.length; l++) {
        const o = r[l];
        if (l === r.length - 1)
          return delete c[o], !0;
        if (c = c[o], !e(c))
          return !1;
      }
    },
    has(c, s) {
      if (!e(c) || typeof s != "string")
        return !1;
      const r = n(s);
      if (r.length === 0)
        return !1;
      for (let l = 0; l < r.length; l++)
        if (e(c)) {
          if (!(r[l] in c))
            return !1;
          c = c[r[l]];
        } else
          return !1;
      return !0;
    }
  }, Nr;
}
var ut = { exports: {} }, ft = { exports: {} }, lt = { exports: {} }, dt = { exports: {} }, Bi;
function nu() {
  if (Bi) return dt.exports;
  Bi = 1;
  const e = Be;
  return dt.exports = (t) => new Promise((a) => {
    e.access(t, (n) => {
      a(!n);
    });
  }), dt.exports.sync = (t) => {
    try {
      return e.accessSync(t), !0;
    } catch {
      return !1;
    }
  }, dt.exports;
}
var ht = { exports: {} }, mt = { exports: {} }, Hi;
function iu() {
  if (Hi) return mt.exports;
  Hi = 1;
  const e = (t, ...a) => new Promise((n) => {
    n(t(...a));
  });
  return mt.exports = e, mt.exports.default = e, mt.exports;
}
var Wi;
function su() {
  if (Wi) return ht.exports;
  Wi = 1;
  const e = iu(), t = (a) => {
    if (!((Number.isInteger(a) || a === 1 / 0) && a > 0))
      return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
    const n = [];
    let c = 0;
    const s = () => {
      c--, n.length > 0 && n.shift()();
    }, r = (i, d, ...E) => {
      c++;
      const g = e(i, ...E);
      d(g), g.then(s, s);
    }, l = (i, d, ...E) => {
      c < a ? r(i, d, ...E) : n.push(r.bind(null, i, d, ...E));
    }, o = (i, ...d) => new Promise((E) => l(i, E, ...d));
    return Object.defineProperties(o, {
      activeCount: {
        get: () => c
      },
      pendingCount: {
        get: () => n.length
      },
      clearQueue: {
        value: () => {
          n.length = 0;
        }
      }
    }), o;
  };
  return ht.exports = t, ht.exports.default = t, ht.exports;
}
var Pr, Ki;
function ou() {
  if (Ki) return Pr;
  Ki = 1;
  const e = su();
  class t extends Error {
    constructor(s) {
      super(), this.value = s;
    }
  }
  const a = (c, s) => Promise.resolve(c).then(s), n = (c) => Promise.all(c).then((s) => s[1] === !0 && Promise.reject(new t(s[0])));
  return Pr = (c, s, r) => {
    r = Object.assign({
      concurrency: 1 / 0,
      preserveOrder: !0
    }, r);
    const l = e(r.concurrency), o = [...c].map((d) => [d, l(a, d, s)]), i = e(r.preserveOrder ? 1 : 1 / 0);
    return Promise.all(o.map((d) => i(n, d))).then(() => {
    }).catch((d) => d instanceof t ? d.value : Promise.reject(d));
  }, Pr;
}
var Xi;
function au() {
  if (Xi) return lt.exports;
  Xi = 1;
  const e = ue, t = nu(), a = ou();
  return lt.exports = (n, c) => (c = Object.assign({
    cwd: process.cwd()
  }, c), a(n, (s) => t(e.resolve(c.cwd, s)), c)), lt.exports.sync = (n, c) => {
    c = Object.assign({
      cwd: process.cwd()
    }, c);
    for (const s of n)
      if (t.sync(e.resolve(c.cwd, s)))
        return s;
  }, lt.exports;
}
var Zi;
function cu() {
  if (Zi) return ft.exports;
  Zi = 1;
  const e = ue, t = au();
  return ft.exports = (a, n = {}) => {
    const c = e.resolve(n.cwd || ""), { root: s } = e.parse(c), r = [].concat(a);
    return new Promise((l) => {
      (function o(i) {
        t(r, { cwd: i }).then((d) => {
          d ? l(e.join(i, d)) : i === s ? l(null) : o(e.dirname(i));
        });
      })(c);
    });
  }, ft.exports.sync = (a, n = {}) => {
    let c = e.resolve(n.cwd || "");
    const { root: s } = e.parse(c), r = [].concat(a);
    for (; ; ) {
      const l = t.sync(r, { cwd: c });
      if (l)
        return e.join(c, l);
      if (c === s)
        return null;
      c = e.dirname(c);
    }
  }, ft.exports;
}
var Ji;
function uu() {
  if (Ji) return ut.exports;
  Ji = 1;
  const e = cu();
  return ut.exports = async ({ cwd: t } = {}) => e("package.json", { cwd: t }), ut.exports.sync = ({ cwd: t } = {}) => e.sync("package.json", { cwd: t }), ut.exports;
}
var pt = { exports: {} }, Yi;
function fu() {
  if (Yi) return pt.exports;
  Yi = 1;
  const e = ue, t = Zc, a = t.homedir(), n = t.tmpdir(), { env: c } = process, s = (i) => {
    const d = e.join(a, "Library");
    return {
      data: e.join(d, "Application Support", i),
      config: e.join(d, "Preferences", i),
      cache: e.join(d, "Caches", i),
      log: e.join(d, "Logs", i),
      temp: e.join(n, i)
    };
  }, r = (i) => {
    const d = c.APPDATA || e.join(a, "AppData", "Roaming"), E = c.LOCALAPPDATA || e.join(a, "AppData", "Local");
    return {
      // Data/config/cache/log are invented by me as Windows isn't opinionated about this
      data: e.join(E, i, "Data"),
      config: e.join(d, i, "Config"),
      cache: e.join(E, i, "Cache"),
      log: e.join(E, i, "Log"),
      temp: e.join(n, i)
    };
  }, l = (i) => {
    const d = e.basename(a);
    return {
      data: e.join(c.XDG_DATA_HOME || e.join(a, ".local", "share"), i),
      config: e.join(c.XDG_CONFIG_HOME || e.join(a, ".config"), i),
      cache: e.join(c.XDG_CACHE_HOME || e.join(a, ".cache"), i),
      // https://wiki.debian.org/XDGBaseDirectorySpecification#state
      log: e.join(c.XDG_STATE_HOME || e.join(a, ".local", "state"), i),
      temp: e.join(n, d, i)
    };
  }, o = (i, d) => {
    if (typeof i != "string")
      throw new TypeError(`Expected string, got ${typeof i}`);
    return d = Object.assign({ suffix: "nodejs" }, d), d.suffix && (i += `-${d.suffix}`), process.platform === "darwin" ? s(i) : process.platform === "win32" ? r(i) : l(i);
  };
  return pt.exports = o, pt.exports.default = o, pt.exports;
}
var be = {}, ae = {}, Qi;
function it() {
  if (Qi) return ae;
  Qi = 1, Object.defineProperty(ae, "__esModule", { value: !0 }), ae.NOOP = ae.LIMIT_FILES_DESCRIPTORS = ae.LIMIT_BASENAME_LENGTH = ae.IS_USER_ROOT = ae.IS_POSIX = ae.DEFAULT_TIMEOUT_SYNC = ae.DEFAULT_TIMEOUT_ASYNC = ae.DEFAULT_WRITE_OPTIONS = ae.DEFAULT_READ_OPTIONS = ae.DEFAULT_FOLDER_MODE = ae.DEFAULT_FILE_MODE = ae.DEFAULT_ENCODING = void 0;
  const e = "utf8";
  ae.DEFAULT_ENCODING = e;
  const t = 438;
  ae.DEFAULT_FILE_MODE = t;
  const a = 511;
  ae.DEFAULT_FOLDER_MODE = a;
  const n = {};
  ae.DEFAULT_READ_OPTIONS = n;
  const c = {};
  ae.DEFAULT_WRITE_OPTIONS = c;
  const s = 5e3;
  ae.DEFAULT_TIMEOUT_ASYNC = s;
  const r = 100;
  ae.DEFAULT_TIMEOUT_SYNC = r;
  const l = !!process.getuid;
  ae.IS_POSIX = l;
  const o = process.getuid ? !process.getuid() : !1;
  ae.IS_USER_ROOT = o;
  const i = 128;
  ae.LIMIT_BASENAME_LENGTH = i;
  const d = 1e4;
  ae.LIMIT_FILES_DESCRIPTORS = d;
  const E = () => {
  };
  return ae.NOOP = E, ae;
}
var yt = {}, qe = {}, es;
function lu() {
  if (es) return qe;
  es = 1, Object.defineProperty(qe, "__esModule", { value: !0 }), qe.attemptifySync = qe.attemptifyAsync = void 0;
  const e = it(), t = (n, c = e.NOOP) => function() {
    return n.apply(void 0, arguments).catch(c);
  };
  qe.attemptifyAsync = t;
  const a = (n, c = e.NOOP) => function() {
    try {
      return n.apply(void 0, arguments);
    } catch (s) {
      return c(s);
    }
  };
  return qe.attemptifySync = a, qe;
}
var vt = {}, ts;
function du() {
  if (ts) return vt;
  ts = 1, Object.defineProperty(vt, "__esModule", { value: !0 });
  const e = it(), t = {
    isChangeErrorOk: (a) => {
      const { code: n } = a;
      return n === "ENOSYS" || !e.IS_USER_ROOT && (n === "EINVAL" || n === "EPERM");
    },
    isRetriableError: (a) => {
      const { code: n } = a;
      return n === "EMFILE" || n === "ENFILE" || n === "EAGAIN" || n === "EBUSY" || n === "EACCESS" || n === "EACCS" || n === "EPERM";
    },
    onChangeError: (a) => {
      if (!t.isChangeErrorOk(a))
        throw a;
    }
  };
  return vt.default = t, vt;
}
var ke = {}, Et = {}, rs;
function hu() {
  if (rs) return Et;
  rs = 1, Object.defineProperty(Et, "__esModule", { value: !0 });
  const t = {
    interval: 25,
    intervalId: void 0,
    limit: it().LIMIT_FILES_DESCRIPTORS,
    queueActive: /* @__PURE__ */ new Set(),
    queueWaiting: /* @__PURE__ */ new Set(),
    init: () => {
      t.intervalId || (t.intervalId = setInterval(t.tick, t.interval));
    },
    reset: () => {
      t.intervalId && (clearInterval(t.intervalId), delete t.intervalId);
    },
    add: (a) => {
      t.queueWaiting.add(a), t.queueActive.size < t.limit / 2 ? t.tick() : t.init();
    },
    remove: (a) => {
      t.queueWaiting.delete(a), t.queueActive.delete(a);
    },
    schedule: () => new Promise((a) => {
      const n = () => t.remove(c), c = () => a(n);
      t.add(c);
    }),
    tick: () => {
      if (!(t.queueActive.size >= t.limit)) {
        if (!t.queueWaiting.size)
          return t.reset();
        for (const a of t.queueWaiting) {
          if (t.queueActive.size >= t.limit)
            break;
          t.queueWaiting.delete(a), t.queueActive.add(a), a();
        }
      }
    }
  };
  return Et.default = t, Et;
}
var ns;
function mu() {
  if (ns) return ke;
  ns = 1, Object.defineProperty(ke, "__esModule", { value: !0 }), ke.retryifySync = ke.retryifyAsync = void 0;
  const e = hu(), t = (n, c) => function(s) {
    return function r() {
      return e.default.schedule().then((l) => n.apply(void 0, arguments).then((o) => (l(), o), (o) => {
        if (l(), Date.now() >= s)
          throw o;
        if (c(o)) {
          const i = Math.round(100 + 400 * Math.random());
          return new Promise((E) => setTimeout(E, i)).then(() => r.apply(void 0, arguments));
        }
        throw o;
      }));
    };
  };
  ke.retryifyAsync = t;
  const a = (n, c) => function(s) {
    return function r() {
      try {
        return n.apply(void 0, arguments);
      } catch (l) {
        if (Date.now() > s)
          throw l;
        if (c(l))
          return r.apply(void 0, arguments);
        throw l;
      }
    };
  };
  return ke.retryifySync = a, ke;
}
var is;
function Ic() {
  if (is) return yt;
  is = 1, Object.defineProperty(yt, "__esModule", { value: !0 });
  const e = Be, t = Ii, a = lu(), n = du(), c = mu(), s = {
    chmodAttempt: a.attemptifyAsync(t.promisify(e.chmod), n.default.onChangeError),
    chownAttempt: a.attemptifyAsync(t.promisify(e.chown), n.default.onChangeError),
    closeAttempt: a.attemptifyAsync(t.promisify(e.close)),
    fsyncAttempt: a.attemptifyAsync(t.promisify(e.fsync)),
    mkdirAttempt: a.attemptifyAsync(t.promisify(e.mkdir)),
    realpathAttempt: a.attemptifyAsync(t.promisify(e.realpath)),
    statAttempt: a.attemptifyAsync(t.promisify(e.stat)),
    unlinkAttempt: a.attemptifyAsync(t.promisify(e.unlink)),
    closeRetry: c.retryifyAsync(t.promisify(e.close), n.default.isRetriableError),
    fsyncRetry: c.retryifyAsync(t.promisify(e.fsync), n.default.isRetriableError),
    openRetry: c.retryifyAsync(t.promisify(e.open), n.default.isRetriableError),
    readFileRetry: c.retryifyAsync(t.promisify(e.readFile), n.default.isRetriableError),
    renameRetry: c.retryifyAsync(t.promisify(e.rename), n.default.isRetriableError),
    statRetry: c.retryifyAsync(t.promisify(e.stat), n.default.isRetriableError),
    writeRetry: c.retryifyAsync(t.promisify(e.write), n.default.isRetriableError),
    chmodSyncAttempt: a.attemptifySync(e.chmodSync, n.default.onChangeError),
    chownSyncAttempt: a.attemptifySync(e.chownSync, n.default.onChangeError),
    closeSyncAttempt: a.attemptifySync(e.closeSync),
    mkdirSyncAttempt: a.attemptifySync(e.mkdirSync),
    realpathSyncAttempt: a.attemptifySync(e.realpathSync),
    statSyncAttempt: a.attemptifySync(e.statSync),
    unlinkSyncAttempt: a.attemptifySync(e.unlinkSync),
    closeSyncRetry: c.retryifySync(e.closeSync, n.default.isRetriableError),
    fsyncSyncRetry: c.retryifySync(e.fsyncSync, n.default.isRetriableError),
    openSyncRetry: c.retryifySync(e.openSync, n.default.isRetriableError),
    readFileSyncRetry: c.retryifySync(e.readFileSync, n.default.isRetriableError),
    renameSyncRetry: c.retryifySync(e.renameSync, n.default.isRetriableError),
    statSyncRetry: c.retryifySync(e.statSync, n.default.isRetriableError),
    writeSyncRetry: c.retryifySync(e.writeSync, n.default.isRetriableError)
  };
  return yt.default = s, yt;
}
var gt = {}, ss;
function pu() {
  if (ss) return gt;
  ss = 1, Object.defineProperty(gt, "__esModule", { value: !0 });
  const e = {
    isFunction: (t) => typeof t == "function",
    isString: (t) => typeof t == "string",
    isUndefined: (t) => typeof t > "u"
  };
  return gt.default = e, gt;
}
var _t = {}, os;
function yu() {
  if (os) return _t;
  os = 1, Object.defineProperty(_t, "__esModule", { value: !0 });
  const e = {}, t = {
    next: (a) => {
      const n = e[a];
      if (!n)
        return;
      n.shift();
      const c = n[0];
      c ? c(() => t.next(a)) : delete e[a];
    },
    schedule: (a) => new Promise((n) => {
      let c = e[a];
      c || (c = e[a] = []), c.push(n), !(c.length > 1) && n(() => t.next(a));
    })
  };
  return _t.default = t, _t;
}
var St = {}, as;
function vu() {
  if (as) return St;
  as = 1, Object.defineProperty(St, "__esModule", { value: !0 });
  const e = ue, t = it(), a = Ic(), n = {
    store: {},
    create: (c) => {
      const s = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), r = Date.now().toString().slice(-10), l = "tmp-", o = `.${l}${r}${s}`;
      return `${c}${o}`;
    },
    get: (c, s, r = !0) => {
      const l = n.truncate(s(c));
      return l in n.store ? n.get(c, s, r) : (n.store[l] = r, [l, () => delete n.store[l]]);
    },
    purge: (c) => {
      n.store[c] && (delete n.store[c], a.default.unlinkAttempt(c));
    },
    purgeSync: (c) => {
      n.store[c] && (delete n.store[c], a.default.unlinkSyncAttempt(c));
    },
    purgeSyncAll: () => {
      for (const c in n.store)
        n.purgeSync(c);
    },
    truncate: (c) => {
      const s = e.basename(c);
      if (s.length <= t.LIMIT_BASENAME_LENGTH)
        return c;
      const r = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(s);
      if (!r)
        return c;
      const l = s.length - t.LIMIT_BASENAME_LENGTH;
      return `${c.slice(0, -s.length)}${r[1]}${r[2].slice(0, -l)}${r[3]}`;
    }
  };
  return process.on("exit", n.purgeSyncAll), St.default = n, St;
}
var cs;
function Eu() {
  if (cs) return be;
  cs = 1, Object.defineProperty(be, "__esModule", { value: !0 }), be.writeFileSync = be.writeFile = be.readFileSync = be.readFile = void 0;
  const e = ue, t = it(), a = Ic(), n = pu(), c = yu(), s = vu();
  function r(E, g = t.DEFAULT_READ_OPTIONS) {
    var p;
    if (n.default.isString(g))
      return r(E, { encoding: g });
    const w = Date.now() + ((p = g.timeout) !== null && p !== void 0 ? p : t.DEFAULT_TIMEOUT_ASYNC);
    return a.default.readFileRetry(w)(E, g);
  }
  be.readFile = r;
  function l(E, g = t.DEFAULT_READ_OPTIONS) {
    var p;
    if (n.default.isString(g))
      return l(E, { encoding: g });
    const w = Date.now() + ((p = g.timeout) !== null && p !== void 0 ? p : t.DEFAULT_TIMEOUT_SYNC);
    return a.default.readFileSyncRetry(w)(E, g);
  }
  be.readFileSync = l;
  const o = (E, g, p, w) => {
    if (n.default.isFunction(p))
      return o(E, g, t.DEFAULT_WRITE_OPTIONS, p);
    const b = i(E, g, p);
    return w && b.then(w, w), b;
  };
  be.writeFile = o;
  const i = async (E, g, p = t.DEFAULT_WRITE_OPTIONS) => {
    var w;
    if (n.default.isString(p))
      return i(E, g, { encoding: p });
    const b = Date.now() + ((w = p.timeout) !== null && w !== void 0 ? w : t.DEFAULT_TIMEOUT_ASYNC);
    let f = null, h = null, u = null, m = null, y = null;
    try {
      p.schedule && (f = await p.schedule(E)), h = await c.default.schedule(E), E = await a.default.realpathAttempt(E) || E, [m, u] = s.default.get(E, p.tmpCreate || s.default.create, p.tmpPurge !== !1);
      const v = t.IS_POSIX && n.default.isUndefined(p.chown), _ = n.default.isUndefined(p.mode);
      if (v || _) {
        const $ = await a.default.statAttempt(E);
        $ && (p = { ...p }, v && (p.chown = { uid: $.uid, gid: $.gid }), _ && (p.mode = $.mode));
      }
      const S = e.dirname(E);
      await a.default.mkdirAttempt(S, {
        mode: t.DEFAULT_FOLDER_MODE,
        recursive: !0
      }), y = await a.default.openRetry(b)(m, "w", p.mode || t.DEFAULT_FILE_MODE), p.tmpCreated && p.tmpCreated(m), n.default.isString(g) ? await a.default.writeRetry(b)(y, g, 0, p.encoding || t.DEFAULT_ENCODING) : n.default.isUndefined(g) || await a.default.writeRetry(b)(y, g, 0, g.length, 0), p.fsync !== !1 && (p.fsyncWait !== !1 ? await a.default.fsyncRetry(b)(y) : a.default.fsyncAttempt(y)), await a.default.closeRetry(b)(y), y = null, p.chown && await a.default.chownAttempt(m, p.chown.uid, p.chown.gid), p.mode && await a.default.chmodAttempt(m, p.mode);
      try {
        await a.default.renameRetry(b)(m, E);
      } catch ($) {
        if ($.code !== "ENAMETOOLONG")
          throw $;
        await a.default.renameRetry(b)(m, s.default.truncate(E));
      }
      u(), m = null;
    } finally {
      y && await a.default.closeAttempt(y), m && s.default.purge(m), f && f(), h && h();
    }
  }, d = (E, g, p = t.DEFAULT_WRITE_OPTIONS) => {
    var w;
    if (n.default.isString(p))
      return d(E, g, { encoding: p });
    const b = Date.now() + ((w = p.timeout) !== null && w !== void 0 ? w : t.DEFAULT_TIMEOUT_SYNC);
    let f = null, h = null, u = null;
    try {
      E = a.default.realpathSyncAttempt(E) || E, [h, f] = s.default.get(E, p.tmpCreate || s.default.create, p.tmpPurge !== !1);
      const m = t.IS_POSIX && n.default.isUndefined(p.chown), y = n.default.isUndefined(p.mode);
      if (m || y) {
        const _ = a.default.statSyncAttempt(E);
        _ && (p = { ...p }, m && (p.chown = { uid: _.uid, gid: _.gid }), y && (p.mode = _.mode));
      }
      const v = e.dirname(E);
      a.default.mkdirSyncAttempt(v, {
        mode: t.DEFAULT_FOLDER_MODE,
        recursive: !0
      }), u = a.default.openSyncRetry(b)(h, "w", p.mode || t.DEFAULT_FILE_MODE), p.tmpCreated && p.tmpCreated(h), n.default.isString(g) ? a.default.writeSyncRetry(b)(u, g, 0, p.encoding || t.DEFAULT_ENCODING) : n.default.isUndefined(g) || a.default.writeSyncRetry(b)(u, g, 0, g.length, 0), p.fsync !== !1 && (p.fsyncWait !== !1 ? a.default.fsyncSyncRetry(b)(u) : a.default.fsyncAttempt(u)), a.default.closeSyncRetry(b)(u), u = null, p.chown && a.default.chownSyncAttempt(h, p.chown.uid, p.chown.gid), p.mode && a.default.chmodSyncAttempt(h, p.mode);
      try {
        a.default.renameSyncRetry(b)(h, E);
      } catch (_) {
        if (_.code !== "ENAMETOOLONG")
          throw _;
        a.default.renameSyncRetry(b)(h, s.default.truncate(E));
      }
      f(), h = null;
    } finally {
      u && a.default.closeSyncAttempt(u), h && s.default.purge(h);
    }
  };
  return be.writeFileSync = d, be;
}
var wt = { exports: {} }, Tr = {}, Ce = {}, je = {}, Cr = {}, Dr = {}, Lr = {}, us;
function mr() {
  return us || (us = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
    class t {
    }
    e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
    class a extends t {
      constructor(u) {
        if (super(), !e.IDENTIFIER.test(u))
          throw new Error("CodeGen: name must be a valid identifier");
        this.str = u;
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
    e.Name = a;
    class n extends t {
      constructor(u) {
        super(), this._items = typeof u == "string" ? [u] : u;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        if (this._items.length > 1)
          return !1;
        const u = this._items[0];
        return u === "" || u === '""';
      }
      get str() {
        var u;
        return (u = this._str) !== null && u !== void 0 ? u : this._str = this._items.reduce((m, y) => `${m}${y}`, "");
      }
      get names() {
        var u;
        return (u = this._names) !== null && u !== void 0 ? u : this._names = this._items.reduce((m, y) => (y instanceof a && (m[y.str] = (m[y.str] || 0) + 1), m), {});
      }
    }
    e._Code = n, e.nil = new n("");
    function c(h, ...u) {
      const m = [h[0]];
      let y = 0;
      for (; y < u.length; )
        l(m, u[y]), m.push(h[++y]);
      return new n(m);
    }
    e._ = c;
    const s = new n("+");
    function r(h, ...u) {
      const m = [p(h[0])];
      let y = 0;
      for (; y < u.length; )
        m.push(s), l(m, u[y]), m.push(s, p(h[++y]));
      return o(m), new n(m);
    }
    e.str = r;
    function l(h, u) {
      u instanceof n ? h.push(...u._items) : u instanceof a ? h.push(u) : h.push(E(u));
    }
    e.addCodeArg = l;
    function o(h) {
      let u = 1;
      for (; u < h.length - 1; ) {
        if (h[u] === s) {
          const m = i(h[u - 1], h[u + 1]);
          if (m !== void 0) {
            h.splice(u - 1, 3, m);
            continue;
          }
          h[u++] = "+";
        }
        u++;
      }
    }
    function i(h, u) {
      if (u === '""')
        return h;
      if (h === '""')
        return u;
      if (typeof h == "string")
        return u instanceof a || h[h.length - 1] !== '"' ? void 0 : typeof u != "string" ? `${h.slice(0, -1)}${u}"` : u[0] === '"' ? h.slice(0, -1) + u.slice(1) : void 0;
      if (typeof u == "string" && u[0] === '"' && !(h instanceof a))
        return `"${h}${u.slice(1)}`;
    }
    function d(h, u) {
      return u.emptyStr() ? h : h.emptyStr() ? u : r`${h}${u}`;
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
      return typeof h == "string" && e.IDENTIFIER.test(h) ? new n(`.${h}`) : c`[${h}]`;
    }
    e.getProperty = w;
    function b(h) {
      if (typeof h == "string" && e.IDENTIFIER.test(h))
        return new n(`${h}`);
      throw new Error(`CodeGen: invalid export name: ${h}, use explicit $id name mapping`);
    }
    e.getEsmExportName = b;
    function f(h) {
      return new n(h.toString());
    }
    e.regexpCode = f;
  }(Lr)), Lr;
}
var Ar = {}, fs;
function ls() {
  return fs || (fs = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
    const t = mr();
    class a extends Error {
      constructor(i) {
        super(`CodeGen: "code" for ${i} not defined`), this.value = i.value;
      }
    }
    var n;
    (function(o) {
      o[o.Started = 0] = "Started", o[o.Completed = 1] = "Completed";
    })(n || (e.UsedValueState = n = {})), e.varKinds = {
      const: new t.Name("const"),
      let: new t.Name("let"),
      var: new t.Name("var")
    };
    class c {
      constructor({ prefixes: i, parent: d } = {}) {
        this._names = {}, this._prefixes = i, this._parent = d;
      }
      toName(i) {
        return i instanceof t.Name ? i : this.name(i);
      }
      name(i) {
        return new t.Name(this._newName(i));
      }
      _newName(i) {
        const d = this._names[i] || this._nameGroup(i);
        return `${i}${d.index++}`;
      }
      _nameGroup(i) {
        var d, E;
        if (!((E = (d = this._parent) === null || d === void 0 ? void 0 : d._prefixes) === null || E === void 0) && E.has(i) || this._prefixes && !this._prefixes.has(i))
          throw new Error(`CodeGen: prefix "${i}" is not allowed in this scope`);
        return this._names[i] = { prefix: i, index: 0 };
      }
    }
    e.Scope = c;
    class s extends t.Name {
      constructor(i, d) {
        super(d), this.prefix = i;
      }
      setValue(i, { property: d, itemIndex: E }) {
        this.value = i, this.scopePath = (0, t._)`.${new t.Name(d)}[${E}]`;
      }
    }
    e.ValueScopeName = s;
    const r = (0, t._)`\n`;
    class l extends c {
      constructor(i) {
        super(i), this._values = {}, this._scope = i.scope, this.opts = { ...i, _n: i.lines ? r : t.nil };
      }
      get() {
        return this._scope;
      }
      name(i) {
        return new s(i, this._newName(i));
      }
      value(i, d) {
        var E;
        if (d.ref === void 0)
          throw new Error("CodeGen: ref must be passed in value");
        const g = this.toName(i), { prefix: p } = g, w = (E = d.key) !== null && E !== void 0 ? E : d.ref;
        let b = this._values[p];
        if (b) {
          const u = b.get(w);
          if (u)
            return u;
        } else
          b = this._values[p] = /* @__PURE__ */ new Map();
        b.set(w, g);
        const f = this._scope[p] || (this._scope[p] = []), h = f.length;
        return f[h] = d.ref, g.setValue(d, { property: p, itemIndex: h }), g;
      }
      getValue(i, d) {
        const E = this._values[i];
        if (E)
          return E.get(d);
      }
      scopeRefs(i, d = this._values) {
        return this._reduceValues(d, (E) => {
          if (E.scopePath === void 0)
            throw new Error(`CodeGen: name "${E}" has no value`);
          return (0, t._)`${i}${E.scopePath}`;
        });
      }
      scopeCode(i = this._values, d, E) {
        return this._reduceValues(i, (g) => {
          if (g.value === void 0)
            throw new Error(`CodeGen: name "${g}" has no value`);
          return g.value.code;
        }, d, E);
      }
      _reduceValues(i, d, E = {}, g) {
        let p = t.nil;
        for (const w in i) {
          const b = i[w];
          if (!b)
            continue;
          const f = E[w] = E[w] || /* @__PURE__ */ new Map();
          b.forEach((h) => {
            if (f.has(h))
              return;
            f.set(h, n.Started);
            let u = d(h);
            if (u) {
              const m = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
              p = (0, t._)`${p}${m} ${h} = ${u};${this.opts._n}`;
            } else if (u = g?.(h))
              p = (0, t._)`${p}${u}${this.opts._n}`;
            else
              throw new a(h);
            f.set(h, n.Completed);
          });
        }
        return p;
      }
    }
    e.ValueScope = l;
  }(Ar)), Ar;
}
var ds;
function te() {
  return ds || (ds = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
    const t = mr(), a = ls();
    var n = mr();
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
    var c = ls();
    Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
      return c.Scope;
    } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
      return c.ValueScope;
    } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
      return c.ValueScopeName;
    } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
      return c.varKinds;
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
    class s {
      optimizeNodes() {
        return this;
      }
      optimizeNames(R, N) {
        return this;
      }
    }
    class r extends s {
      constructor(R, N, I) {
        super(), this.varKind = R, this.name = N, this.rhs = I;
      }
      render({ es5: R, _n: N }) {
        const I = R ? a.varKinds.var : this.varKind, K = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
        return `${I} ${this.name}${K};` + N;
      }
      optimizeNames(R, N) {
        if (R[this.name.str])
          return this.rhs && (this.rhs = z(this.rhs, R, N)), this;
      }
      get names() {
        return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
      }
    }
    class l extends s {
      constructor(R, N, I) {
        super(), this.lhs = R, this.rhs = N, this.sideEffects = I;
      }
      render({ _n: R }) {
        return `${this.lhs} = ${this.rhs};` + R;
      }
      optimizeNames(R, N) {
        if (!(this.lhs instanceof t.Name && !R[this.lhs.str] && !this.sideEffects))
          return this.rhs = z(this.rhs, R, N), this;
      }
      get names() {
        const R = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
        return U(R, this.rhs);
      }
    }
    class o extends l {
      constructor(R, N, I, K) {
        super(R, I, K), this.op = N;
      }
      render({ _n: R }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + R;
      }
    }
    class i extends s {
      constructor(R) {
        super(), this.label = R, this.names = {};
      }
      render({ _n: R }) {
        return `${this.label}:` + R;
      }
    }
    class d extends s {
      constructor(R) {
        super(), this.label = R, this.names = {};
      }
      render({ _n: R }) {
        return `break${this.label ? ` ${this.label}` : ""};` + R;
      }
    }
    class E extends s {
      constructor(R) {
        super(), this.error = R;
      }
      render({ _n: R }) {
        return `throw ${this.error};` + R;
      }
      get names() {
        return this.error.names;
      }
    }
    class g extends s {
      constructor(R) {
        super(), this.code = R;
      }
      render({ _n: R }) {
        return `${this.code};` + R;
      }
      optimizeNodes() {
        return `${this.code}` ? this : void 0;
      }
      optimizeNames(R, N) {
        return this.code = z(this.code, R, N), this;
      }
      get names() {
        return this.code instanceof t._CodeOrName ? this.code.names : {};
      }
    }
    class p extends s {
      constructor(R = []) {
        super(), this.nodes = R;
      }
      render(R) {
        return this.nodes.reduce((N, I) => N + I.render(R), "");
      }
      optimizeNodes() {
        const { nodes: R } = this;
        let N = R.length;
        for (; N--; ) {
          const I = R[N].optimizeNodes();
          Array.isArray(I) ? R.splice(N, 1, ...I) : I ? R[N] = I : R.splice(N, 1);
        }
        return R.length > 0 ? this : void 0;
      }
      optimizeNames(R, N) {
        const { nodes: I } = this;
        let K = I.length;
        for (; K--; ) {
          const W = I[K];
          W.optimizeNames(R, N) || (V(R, W.names), I.splice(K, 1));
        }
        return I.length > 0 ? this : void 0;
      }
      get names() {
        return this.nodes.reduce((R, N) => H(R, N.names), {});
      }
    }
    class w extends p {
      render(R) {
        return "{" + R._n + super.render(R) + "}" + R._n;
      }
    }
    class b extends p {
    }
    class f extends w {
    }
    f.kind = "else";
    class h extends w {
      constructor(R, N) {
        super(N), this.condition = R;
      }
      render(R) {
        let N = `if(${this.condition})` + super.render(R);
        return this.else && (N += "else " + this.else.render(R)), N;
      }
      optimizeNodes() {
        super.optimizeNodes();
        const R = this.condition;
        if (R === !0)
          return this.nodes;
        let N = this.else;
        if (N) {
          const I = N.optimizeNodes();
          N = this.else = Array.isArray(I) ? new f(I) : I;
        }
        if (N)
          return R === !1 ? N instanceof h ? N : N.nodes : this.nodes.length ? this : new h(Z(R), N instanceof h ? [N] : N.nodes);
        if (!(R === !1 || !this.nodes.length))
          return this;
      }
      optimizeNames(R, N) {
        var I;
        if (this.else = (I = this.else) === null || I === void 0 ? void 0 : I.optimizeNames(R, N), !!(super.optimizeNames(R, N) || this.else))
          return this.condition = z(this.condition, R, N), this;
      }
      get names() {
        const R = super.names;
        return U(R, this.condition), this.else && H(R, this.else.names), R;
      }
    }
    h.kind = "if";
    class u extends w {
    }
    u.kind = "for";
    class m extends u {
      constructor(R) {
        super(), this.iteration = R;
      }
      render(R) {
        return `for(${this.iteration})` + super.render(R);
      }
      optimizeNames(R, N) {
        if (super.optimizeNames(R, N))
          return this.iteration = z(this.iteration, R, N), this;
      }
      get names() {
        return H(super.names, this.iteration.names);
      }
    }
    class y extends u {
      constructor(R, N, I, K) {
        super(), this.varKind = R, this.name = N, this.from = I, this.to = K;
      }
      render(R) {
        const N = R.es5 ? a.varKinds.var : this.varKind, { name: I, from: K, to: W } = this;
        return `for(${N} ${I}=${K}; ${I}<${W}; ${I}++)` + super.render(R);
      }
      get names() {
        const R = U(super.names, this.from);
        return U(R, this.to);
      }
    }
    class v extends u {
      constructor(R, N, I, K) {
        super(), this.loop = R, this.varKind = N, this.name = I, this.iterable = K;
      }
      render(R) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(R);
      }
      optimizeNames(R, N) {
        if (super.optimizeNames(R, N))
          return this.iterable = z(this.iterable, R, N), this;
      }
      get names() {
        return H(super.names, this.iterable.names);
      }
    }
    class _ extends w {
      constructor(R, N, I) {
        super(), this.name = R, this.args = N, this.async = I;
      }
      render(R) {
        return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(R);
      }
    }
    _.kind = "func";
    class S extends p {
      render(R) {
        return "return " + super.render(R);
      }
    }
    S.kind = "return";
    class $ extends w {
      render(R) {
        let N = "try" + super.render(R);
        return this.catch && (N += this.catch.render(R)), this.finally && (N += this.finally.render(R)), N;
      }
      optimizeNodes() {
        var R, N;
        return super.optimizeNodes(), (R = this.catch) === null || R === void 0 || R.optimizeNodes(), (N = this.finally) === null || N === void 0 || N.optimizeNodes(), this;
      }
      optimizeNames(R, N) {
        var I, K;
        return super.optimizeNames(R, N), (I = this.catch) === null || I === void 0 || I.optimizeNames(R, N), (K = this.finally) === null || K === void 0 || K.optimizeNames(R, N), this;
      }
      get names() {
        const R = super.names;
        return this.catch && H(R, this.catch.names), this.finally && H(R, this.finally.names), R;
      }
    }
    class O extends w {
      constructor(R) {
        super(), this.error = R;
      }
      render(R) {
        return `catch(${this.error})` + super.render(R);
      }
    }
    O.kind = "catch";
    class T extends w {
      render(R) {
        return "finally" + super.render(R);
      }
    }
    T.kind = "finally";
    class k {
      constructor(R, N = {}) {
        this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...N, _n: N.lines ? `
` : "" }, this._extScope = R, this._scope = new a.Scope({ parent: R }), this._nodes = [new b()];
      }
      toString() {
        return this._root.render(this.opts);
      }
      // returns unique name in the internal scope
      name(R) {
        return this._scope.name(R);
      }
      // reserves unique name in the external scope
      scopeName(R) {
        return this._extScope.name(R);
      }
      // reserves unique name in the external scope and assigns value to it
      scopeValue(R, N) {
        const I = this._extScope.value(R, N);
        return (this._values[I.prefix] || (this._values[I.prefix] = /* @__PURE__ */ new Set())).add(I), I;
      }
      getScopeValue(R, N) {
        return this._extScope.getValue(R, N);
      }
      // return code that assigns values in the external scope to the names that are used internally
      // (same names that were returned by gen.scopeName or gen.scopeValue)
      scopeRefs(R) {
        return this._extScope.scopeRefs(R, this._values);
      }
      scopeCode() {
        return this._extScope.scopeCode(this._values);
      }
      _def(R, N, I, K) {
        const W = this._scope.toName(N);
        return I !== void 0 && K && (this._constants[W.str] = I), this._leafNode(new r(R, W, I)), W;
      }
      // `const` declaration (`var` in es5 mode)
      const(R, N, I) {
        return this._def(a.varKinds.const, R, N, I);
      }
      // `let` declaration with optional assignment (`var` in es5 mode)
      let(R, N, I) {
        return this._def(a.varKinds.let, R, N, I);
      }
      // `var` declaration with optional assignment
      var(R, N, I) {
        return this._def(a.varKinds.var, R, N, I);
      }
      // assignment code
      assign(R, N, I) {
        return this._leafNode(new l(R, N, I));
      }
      // `+=` code
      add(R, N) {
        return this._leafNode(new o(R, e.operators.ADD, N));
      }
      // appends passed SafeExpr to code or executes Block
      code(R) {
        return typeof R == "function" ? R() : R !== t.nil && this._leafNode(new g(R)), this;
      }
      // returns code for object literal for the passed argument list of key-value pairs
      object(...R) {
        const N = ["{"];
        for (const [I, K] of R)
          N.length > 1 && N.push(","), N.push(I), (I !== K || this.opts.es5) && (N.push(":"), (0, t.addCodeArg)(N, K));
        return N.push("}"), new t._Code(N);
      }
      // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
      if(R, N, I) {
        if (this._blockNode(new h(R)), N && I)
          this.code(N).else().code(I).endIf();
        else if (N)
          this.code(N).endIf();
        else if (I)
          throw new Error('CodeGen: "else" body without "then" body');
        return this;
      }
      // `else if` clause - invalid without `if` or after `else` clauses
      elseIf(R) {
        return this._elseNode(new h(R));
      }
      // `else` clause - only valid after `if` or `else if` clauses
      else() {
        return this._elseNode(new f());
      }
      // end `if` statement (needed if gen.if was used only with condition)
      endIf() {
        return this._endBlockNode(h, f);
      }
      _for(R, N) {
        return this._blockNode(R), N && this.code(N).endFor(), this;
      }
      // a generic `for` clause (or statement if `forBody` is passed)
      for(R, N) {
        return this._for(new m(R), N);
      }
      // `for` statement for a range of values
      forRange(R, N, I, K, W = this.opts.es5 ? a.varKinds.var : a.varKinds.let) {
        const Q = this._scope.toName(R);
        return this._for(new y(W, Q, N, I), () => K(Q));
      }
      // `for-of` statement (in es5 mode replace with a normal for loop)
      forOf(R, N, I, K = a.varKinds.const) {
        const W = this._scope.toName(R);
        if (this.opts.es5) {
          const Q = N instanceof t.Name ? N : this.var("_arr", N);
          return this.forRange("_i", 0, (0, t._)`${Q}.length`, (J) => {
            this.var(W, (0, t._)`${Q}[${J}]`), I(W);
          });
        }
        return this._for(new v("of", K, W, N), () => I(W));
      }
      // `for-in` statement.
      // With option `ownProperties` replaced with a `for-of` loop for object keys
      forIn(R, N, I, K = this.opts.es5 ? a.varKinds.var : a.varKinds.const) {
        if (this.opts.ownProperties)
          return this.forOf(R, (0, t._)`Object.keys(${N})`, I);
        const W = this._scope.toName(R);
        return this._for(new v("in", K, W, N), () => I(W));
      }
      // end `for` loop
      endFor() {
        return this._endBlockNode(u);
      }
      // `label` statement
      label(R) {
        return this._leafNode(new i(R));
      }
      // `break` statement
      break(R) {
        return this._leafNode(new d(R));
      }
      // `return` statement
      return(R) {
        const N = new S();
        if (this._blockNode(N), this.code(R), N.nodes.length !== 1)
          throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode(S);
      }
      // `try` statement
      try(R, N, I) {
        if (!N && !I)
          throw new Error('CodeGen: "try" without "catch" and "finally"');
        const K = new $();
        if (this._blockNode(K), this.code(R), N) {
          const W = this.name("e");
          this._currNode = K.catch = new O(W), N(W);
        }
        return I && (this._currNode = K.finally = new T(), this.code(I)), this._endBlockNode(O, T);
      }
      // `throw` statement
      throw(R) {
        return this._leafNode(new E(R));
      }
      // start self-balancing block
      block(R, N) {
        return this._blockStarts.push(this._nodes.length), R && this.code(R).endBlock(N), this;
      }
      // end the current self-balancing block
      endBlock(R) {
        const N = this._blockStarts.pop();
        if (N === void 0)
          throw new Error("CodeGen: not in self-balancing block");
        const I = this._nodes.length - N;
        if (I < 0 || R !== void 0 && I !== R)
          throw new Error(`CodeGen: wrong number of nodes: ${I} vs ${R} expected`);
        return this._nodes.length = N, this;
      }
      // `function` heading (or definition if funcBody is passed)
      func(R, N = t.nil, I, K) {
        return this._blockNode(new _(R, N, I)), K && this.code(K).endFunc(), this;
      }
      // end function definition
      endFunc() {
        return this._endBlockNode(_);
      }
      optimize(R = 1) {
        for (; R-- > 0; )
          this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
      }
      _leafNode(R) {
        return this._currNode.nodes.push(R), this;
      }
      _blockNode(R) {
        this._currNode.nodes.push(R), this._nodes.push(R);
      }
      _endBlockNode(R, N) {
        const I = this._currNode;
        if (I instanceof R || N && I instanceof N)
          return this._nodes.pop(), this;
        throw new Error(`CodeGen: not in block "${N ? `${R.kind}/${N.kind}` : R.kind}"`);
      }
      _elseNode(R) {
        const N = this._currNode;
        if (!(N instanceof h))
          throw new Error('CodeGen: "else" without "if"');
        return this._currNode = N.else = R, this;
      }
      get _root() {
        return this._nodes[0];
      }
      get _currNode() {
        const R = this._nodes;
        return R[R.length - 1];
      }
      set _currNode(R) {
        const N = this._nodes;
        N[N.length - 1] = R;
      }
    }
    e.CodeGen = k;
    function H(L, R) {
      for (const N in R)
        L[N] = (L[N] || 0) + (R[N] || 0);
      return L;
    }
    function U(L, R) {
      return R instanceof t._CodeOrName ? H(L, R.names) : L;
    }
    function z(L, R, N) {
      if (L instanceof t.Name)
        return I(L);
      if (!K(L))
        return L;
      return new t._Code(L._items.reduce((W, Q) => (Q instanceof t.Name && (Q = I(Q)), Q instanceof t._Code ? W.push(...Q._items) : W.push(Q), W), []));
      function I(W) {
        const Q = N[W.str];
        return Q === void 0 || R[W.str] !== 1 ? W : (delete R[W.str], Q);
      }
      function K(W) {
        return W instanceof t._Code && W._items.some((Q) => Q instanceof t.Name && R[Q.str] === 1 && N[Q.str] !== void 0);
      }
    }
    function V(L, R) {
      for (const N in R)
        L[N] = (L[N] || 0) - (R[N] || 0);
    }
    function Z(L) {
      return typeof L == "boolean" || typeof L == "number" || L === null ? !L : (0, t._)`!${j(L)}`;
    }
    e.not = Z;
    const B = C(e.operators.AND);
    function A(...L) {
      return L.reduce(B);
    }
    e.and = A;
    const x = C(e.operators.OR);
    function D(...L) {
      return L.reduce(x);
    }
    e.or = D;
    function C(L) {
      return (R, N) => R === t.nil ? N : N === t.nil ? R : (0, t._)`${j(R)} ${L} ${j(N)}`;
    }
    function j(L) {
      return L instanceof t.Name ? L : (0, t._)`(${L})`;
    }
  }(Dr)), Dr;
}
var ee = {}, hs;
function ne() {
  if (hs) return ee;
  hs = 1, Object.defineProperty(ee, "__esModule", { value: !0 }), ee.checkStrictMode = ee.getErrorPath = ee.Type = ee.useFunc = ee.setEvaluated = ee.evaluatedPropsToName = ee.mergeEvaluated = ee.eachItem = ee.unescapeJsonPointer = ee.escapeJsonPointer = ee.escapeFragment = ee.unescapeFragment = ee.schemaRefOrVal = ee.schemaHasRulesButRef = ee.schemaHasRules = ee.checkUnknownRules = ee.alwaysValidSchema = ee.toHash = void 0;
  const e = te(), t = mr();
  function a(v) {
    const _ = {};
    for (const S of v)
      _[S] = !0;
    return _;
  }
  ee.toHash = a;
  function n(v, _) {
    return typeof _ == "boolean" ? _ : Object.keys(_).length === 0 ? !0 : (c(v, _), !s(_, v.self.RULES.all));
  }
  ee.alwaysValidSchema = n;
  function c(v, _ = v.schema) {
    const { opts: S, self: $ } = v;
    if (!S.strictSchema || typeof _ == "boolean")
      return;
    const O = $.RULES.keywords;
    for (const T in _)
      O[T] || y(v, `unknown keyword: "${T}"`);
  }
  ee.checkUnknownRules = c;
  function s(v, _) {
    if (typeof v == "boolean")
      return !v;
    for (const S in v)
      if (_[S])
        return !0;
    return !1;
  }
  ee.schemaHasRules = s;
  function r(v, _) {
    if (typeof v == "boolean")
      return !v;
    for (const S in v)
      if (S !== "$ref" && _.all[S])
        return !0;
    return !1;
  }
  ee.schemaHasRulesButRef = r;
  function l({ topSchemaRef: v, schemaPath: _ }, S, $, O) {
    if (!O) {
      if (typeof S == "number" || typeof S == "boolean")
        return S;
      if (typeof S == "string")
        return (0, e._)`${S}`;
    }
    return (0, e._)`${v}${_}${(0, e.getProperty)($)}`;
  }
  ee.schemaRefOrVal = l;
  function o(v) {
    return E(decodeURIComponent(v));
  }
  ee.unescapeFragment = o;
  function i(v) {
    return encodeURIComponent(d(v));
  }
  ee.escapeFragment = i;
  function d(v) {
    return typeof v == "number" ? `${v}` : v.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  ee.escapeJsonPointer = d;
  function E(v) {
    return v.replace(/~1/g, "/").replace(/~0/g, "~");
  }
  ee.unescapeJsonPointer = E;
  function g(v, _) {
    if (Array.isArray(v))
      for (const S of v)
        _(S);
    else
      _(v);
  }
  ee.eachItem = g;
  function p({ mergeNames: v, mergeToName: _, mergeValues: S, resultToName: $ }) {
    return (O, T, k, H) => {
      const U = k === void 0 ? T : k instanceof e.Name ? (T instanceof e.Name ? v(O, T, k) : _(O, T, k), k) : T instanceof e.Name ? (_(O, k, T), T) : S(T, k);
      return H === e.Name && !(U instanceof e.Name) ? $(O, U) : U;
    };
  }
  ee.mergeEvaluated = {
    props: p({
      mergeNames: (v, _, S) => v.if((0, e._)`${S} !== true && ${_} !== undefined`, () => {
        v.if((0, e._)`${_} === true`, () => v.assign(S, !0), () => v.assign(S, (0, e._)`${S} || {}`).code((0, e._)`Object.assign(${S}, ${_})`));
      }),
      mergeToName: (v, _, S) => v.if((0, e._)`${S} !== true`, () => {
        _ === !0 ? v.assign(S, !0) : (v.assign(S, (0, e._)`${S} || {}`), b(v, S, _));
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
    return _ !== void 0 && b(v, S, _), S;
  }
  ee.evaluatedPropsToName = w;
  function b(v, _, S) {
    Object.keys(S).forEach(($) => v.assign((0, e._)`${_}${(0, e.getProperty)($)}`, !0));
  }
  ee.setEvaluated = b;
  const f = {};
  function h(v, _) {
    return v.scopeValue("func", {
      ref: _,
      code: f[_.code] || (f[_.code] = new t._Code(_.code))
    });
  }
  ee.useFunc = h;
  var u;
  (function(v) {
    v[v.Num = 0] = "Num", v[v.Str = 1] = "Str";
  })(u || (ee.Type = u = {}));
  function m(v, _, S) {
    if (v instanceof e.Name) {
      const $ = _ === u.Num;
      return S ? $ ? (0, e._)`"[" + ${v} + "]"` : (0, e._)`"['" + ${v} + "']"` : $ ? (0, e._)`"/" + ${v}` : (0, e._)`"/" + ${v}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
    }
    return S ? (0, e.getProperty)(v).toString() : "/" + d(v);
  }
  ee.getErrorPath = m;
  function y(v, _, S = v.opts.strictSchema) {
    if (S) {
      if (_ = `strict mode: ${_}`, S === !0)
        throw new Error(_);
      v.self.logger.warn(_);
    }
  }
  return ee.checkStrictMode = y, ee;
}
var $t = {}, ms;
function Fe() {
  if (ms) return $t;
  ms = 1, Object.defineProperty($t, "__esModule", { value: !0 });
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
  return $t.default = t, $t;
}
var ps;
function yr() {
  return ps || (ps = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
    const t = te(), a = ne(), n = Fe();
    e.keywordError = {
      message: ({ keyword: f }) => (0, t.str)`must pass "${f}" keyword validation`
    }, e.keyword$DataError = {
      message: ({ keyword: f, schemaType: h }) => h ? (0, t.str)`"${f}" keyword must be ${h} ($data)` : (0, t.str)`"${f}" keyword is invalid ($data)`
    };
    function c(f, h = e.keywordError, u, m) {
      const { it: y } = f, { gen: v, compositeRule: _, allErrors: S } = y, $ = E(f, h, u);
      m ?? (_ || S) ? o(v, $) : i(y, (0, t._)`[${$}]`);
    }
    e.reportError = c;
    function s(f, h = e.keywordError, u) {
      const { it: m } = f, { gen: y, compositeRule: v, allErrors: _ } = m, S = E(f, h, u);
      o(y, S), v || _ || i(m, n.default.vErrors);
    }
    e.reportExtraError = s;
    function r(f, h) {
      f.assign(n.default.errors, h), f.if((0, t._)`${n.default.vErrors} !== null`, () => f.if(h, () => f.assign((0, t._)`${n.default.vErrors}.length`, h), () => f.assign(n.default.vErrors, null)));
    }
    e.resetErrorsCount = r;
    function l({ gen: f, keyword: h, schemaValue: u, data: m, errsCount: y, it: v }) {
      if (y === void 0)
        throw new Error("ajv implementation error");
      const _ = f.name("err");
      f.forRange("i", y, n.default.errors, (S) => {
        f.const(_, (0, t._)`${n.default.vErrors}[${S}]`), f.if((0, t._)`${_}.instancePath === undefined`, () => f.assign((0, t._)`${_}.instancePath`, (0, t.strConcat)(n.default.instancePath, v.errorPath))), f.assign((0, t._)`${_}.schemaPath`, (0, t.str)`${v.errSchemaPath}/${h}`), v.opts.verbose && (f.assign((0, t._)`${_}.schema`, u), f.assign((0, t._)`${_}.data`, m));
      });
    }
    e.extendErrors = l;
    function o(f, h) {
      const u = f.const("err", h);
      f.if((0, t._)`${n.default.vErrors} === null`, () => f.assign(n.default.vErrors, (0, t._)`[${u}]`), (0, t._)`${n.default.vErrors}.push(${u})`), f.code((0, t._)`${n.default.errors}++`);
    }
    function i(f, h) {
      const { gen: u, validateName: m, schemaEnv: y } = f;
      y.$async ? u.throw((0, t._)`new ${f.ValidationError}(${h})`) : (u.assign((0, t._)`${m}.errors`, h), u.return(!1));
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
    function E(f, h, u) {
      const { createErrors: m } = f.it;
      return m === !1 ? (0, t._)`{}` : g(f, h, u);
    }
    function g(f, h, u = {}) {
      const { gen: m, it: y } = f, v = [
        p(y, u),
        w(f, u)
      ];
      return b(f, h, v), m.object(...v);
    }
    function p({ errorPath: f }, { instancePath: h }) {
      const u = h ? (0, t.str)`${f}${(0, a.getErrorPath)(h, a.Type.Str)}` : f;
      return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, u)];
    }
    function w({ keyword: f, it: { errSchemaPath: h } }, { schemaPath: u, parentSchema: m }) {
      let y = m ? h : (0, t.str)`${h}/${f}`;
      return u && (y = (0, t.str)`${y}${(0, a.getErrorPath)(u, a.Type.Str)}`), [d.schemaPath, y];
    }
    function b(f, { params: h, message: u }, m) {
      const { keyword: y, data: v, schemaValue: _, it: S } = f, { opts: $, propertyName: O, topSchemaRef: T, schemaPath: k } = S;
      m.push([d.keyword, y], [d.params, typeof h == "function" ? h(f) : h || (0, t._)`{}`]), $.messages && m.push([d.message, typeof u == "function" ? u(f) : u]), $.verbose && m.push([d.schema, _], [d.parentSchema, (0, t._)`${T}${k}`], [n.default.data, v]), O && m.push([d.propertyName, O]);
    }
  }(Cr)), Cr;
}
var ys;
function gu() {
  if (ys) return je;
  ys = 1, Object.defineProperty(je, "__esModule", { value: !0 }), je.boolOrEmptySchema = je.topBoolOrEmptySchema = void 0;
  const e = yr(), t = te(), a = Fe(), n = {
    message: "boolean schema is false"
  };
  function c(l) {
    const { gen: o, schema: i, validateName: d } = l;
    i === !1 ? r(l, !1) : typeof i == "object" && i.$async === !0 ? o.return(a.default.data) : (o.assign((0, t._)`${d}.errors`, null), o.return(!0));
  }
  je.topBoolOrEmptySchema = c;
  function s(l, o) {
    const { gen: i, schema: d } = l;
    d === !1 ? (i.var(o, !1), r(l)) : i.var(o, !0);
  }
  je.boolOrEmptySchema = s;
  function r(l, o) {
    const { gen: i, data: d } = l, E = {
      gen: i,
      keyword: "false schema",
      data: d,
      schema: !1,
      schemaCode: !1,
      schemaValue: !1,
      params: {},
      it: l
    };
    (0, e.reportError)(E, n, void 0, o);
  }
  return je;
}
var de = {}, Me = {}, vs;
function Nc() {
  if (vs) return Me;
  vs = 1, Object.defineProperty(Me, "__esModule", { value: !0 }), Me.getRules = Me.isJSONType = void 0;
  const e = ["string", "number", "integer", "boolean", "null", "object", "array"], t = new Set(e);
  function a(c) {
    return typeof c == "string" && t.has(c);
  }
  Me.isJSONType = a;
  function n() {
    const c = {
      number: { type: "number", rules: [] },
      string: { type: "string", rules: [] },
      array: { type: "array", rules: [] },
      object: { type: "object", rules: [] }
    };
    return {
      types: { ...c, integer: !0, boolean: !0, null: !0 },
      rules: [{ rules: [] }, c.number, c.string, c.array, c.object],
      post: { rules: [] },
      all: {},
      keywords: {}
    };
  }
  return Me.getRules = n, Me;
}
var De = {}, Es;
function Pc() {
  if (Es) return De;
  Es = 1, Object.defineProperty(De, "__esModule", { value: !0 }), De.shouldUseRule = De.shouldUseGroup = De.schemaHasRulesForType = void 0;
  function e({ schema: n, self: c }, s) {
    const r = c.RULES.types[s];
    return r && r !== !0 && t(n, r);
  }
  De.schemaHasRulesForType = e;
  function t(n, c) {
    return c.rules.some((s) => a(n, s));
  }
  De.shouldUseGroup = t;
  function a(n, c) {
    var s;
    return n[c.keyword] !== void 0 || ((s = c.definition.implements) === null || s === void 0 ? void 0 : s.some((r) => n[r] !== void 0));
  }
  return De.shouldUseRule = a, De;
}
var gs;
function pr() {
  if (gs) return de;
  gs = 1, Object.defineProperty(de, "__esModule", { value: !0 }), de.reportTypeError = de.checkDataTypes = de.checkDataType = de.coerceAndCheckDataType = de.getJSONTypes = de.getSchemaTypes = de.DataType = void 0;
  const e = Nc(), t = Pc(), a = yr(), n = te(), c = ne();
  var s;
  (function(u) {
    u[u.Correct = 0] = "Correct", u[u.Wrong = 1] = "Wrong";
  })(s || (de.DataType = s = {}));
  function r(u) {
    const m = l(u.type);
    if (m.includes("null")) {
      if (u.nullable === !1)
        throw new Error("type: null contradicts nullable: false");
    } else {
      if (!m.length && u.nullable !== void 0)
        throw new Error('"nullable" cannot be used without "type"');
      u.nullable === !0 && m.push("null");
    }
    return m;
  }
  de.getSchemaTypes = r;
  function l(u) {
    const m = Array.isArray(u) ? u : u ? [u] : [];
    if (m.every(e.isJSONType))
      return m;
    throw new Error("type must be JSONType or JSONType[]: " + m.join(","));
  }
  de.getJSONTypes = l;
  function o(u, m) {
    const { gen: y, data: v, opts: _ } = u, S = d(m, _.coerceTypes), $ = m.length > 0 && !(S.length === 0 && m.length === 1 && (0, t.schemaHasRulesForType)(u, m[0]));
    if ($) {
      const O = w(m, v, _.strictNumbers, s.Wrong);
      y.if(O, () => {
        S.length ? E(u, m, S) : f(u);
      });
    }
    return $;
  }
  de.coerceAndCheckDataType = o;
  const i = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
  function d(u, m) {
    return m ? u.filter((y) => i.has(y) || m === "array" && y === "array") : [];
  }
  function E(u, m, y) {
    const { gen: v, data: _, opts: S } = u, $ = v.let("dataType", (0, n._)`typeof ${_}`), O = v.let("coerced", (0, n._)`undefined`);
    S.coerceTypes === "array" && v.if((0, n._)`${$} == 'object' && Array.isArray(${_}) && ${_}.length == 1`, () => v.assign(_, (0, n._)`${_}[0]`).assign($, (0, n._)`typeof ${_}`).if(w(m, _, S.strictNumbers), () => v.assign(O, _))), v.if((0, n._)`${O} !== undefined`);
    for (const k of y)
      (i.has(k) || k === "array" && S.coerceTypes === "array") && T(k);
    v.else(), f(u), v.endIf(), v.if((0, n._)`${O} !== undefined`, () => {
      v.assign(_, O), g(u, O);
    });
    function T(k) {
      switch (k) {
        case "string":
          v.elseIf((0, n._)`${$} == "number" || ${$} == "boolean"`).assign(O, (0, n._)`"" + ${_}`).elseIf((0, n._)`${_} === null`).assign(O, (0, n._)`""`);
          return;
        case "number":
          v.elseIf((0, n._)`${$} == "boolean" || ${_} === null
              || (${$} == "string" && ${_} && ${_} == +${_})`).assign(O, (0, n._)`+${_}`);
          return;
        case "integer":
          v.elseIf((0, n._)`${$} === "boolean" || ${_} === null
              || (${$} === "string" && ${_} && ${_} == +${_} && !(${_} % 1))`).assign(O, (0, n._)`+${_}`);
          return;
        case "boolean":
          v.elseIf((0, n._)`${_} === "false" || ${_} === 0 || ${_} === null`).assign(O, !1).elseIf((0, n._)`${_} === "true" || ${_} === 1`).assign(O, !0);
          return;
        case "null":
          v.elseIf((0, n._)`${_} === "" || ${_} === 0 || ${_} === false`), v.assign(O, null);
          return;
        case "array":
          v.elseIf((0, n._)`${$} === "string" || ${$} === "number"
              || ${$} === "boolean" || ${_} === null`).assign(O, (0, n._)`[${_}]`);
      }
    }
  }
  function g({ gen: u, parentData: m, parentDataProperty: y }, v) {
    u.if((0, n._)`${m} !== undefined`, () => u.assign((0, n._)`${m}[${y}]`, v));
  }
  function p(u, m, y, v = s.Correct) {
    const _ = v === s.Correct ? n.operators.EQ : n.operators.NEQ;
    let S;
    switch (u) {
      case "null":
        return (0, n._)`${m} ${_} null`;
      case "array":
        S = (0, n._)`Array.isArray(${m})`;
        break;
      case "object":
        S = (0, n._)`${m} && typeof ${m} == "object" && !Array.isArray(${m})`;
        break;
      case "integer":
        S = $((0, n._)`!(${m} % 1) && !isNaN(${m})`);
        break;
      case "number":
        S = $();
        break;
      default:
        return (0, n._)`typeof ${m} ${_} ${u}`;
    }
    return v === s.Correct ? S : (0, n.not)(S);
    function $(O = n.nil) {
      return (0, n.and)((0, n._)`typeof ${m} == "number"`, O, y ? (0, n._)`isFinite(${m})` : n.nil);
    }
  }
  de.checkDataType = p;
  function w(u, m, y, v) {
    if (u.length === 1)
      return p(u[0], m, y, v);
    let _;
    const S = (0, c.toHash)(u);
    if (S.array && S.object) {
      const $ = (0, n._)`typeof ${m} != "object"`;
      _ = S.null ? $ : (0, n._)`!${m} || ${$}`, delete S.null, delete S.array, delete S.object;
    } else
      _ = n.nil;
    S.number && delete S.integer;
    for (const $ in S)
      _ = (0, n.and)(_, p($, m, y, v));
    return _;
  }
  de.checkDataTypes = w;
  const b = {
    message: ({ schema: u }) => `must be ${u}`,
    params: ({ schema: u, schemaValue: m }) => typeof u == "string" ? (0, n._)`{type: ${u}}` : (0, n._)`{type: ${m}}`
  };
  function f(u) {
    const m = h(u);
    (0, a.reportError)(m, b);
  }
  de.reportTypeError = f;
  function h(u) {
    const { gen: m, data: y, schema: v } = u, _ = (0, c.schemaRefOrVal)(u, v, "type");
    return {
      gen: m,
      keyword: "type",
      data: y,
      schema: v.type,
      schemaCode: _,
      schemaValue: _,
      parentSchema: v,
      params: {},
      it: u
    };
  }
  return de;
}
var Ze = {}, _s;
function _u() {
  if (_s) return Ze;
  _s = 1, Object.defineProperty(Ze, "__esModule", { value: !0 }), Ze.assignDefaults = void 0;
  const e = te(), t = ne();
  function a(c, s) {
    const { properties: r, items: l } = c.schema;
    if (s === "object" && r)
      for (const o in r)
        n(c, o, r[o].default);
    else s === "array" && Array.isArray(l) && l.forEach((o, i) => n(c, i, o.default));
  }
  Ze.assignDefaults = a;
  function n(c, s, r) {
    const { gen: l, compositeRule: o, data: i, opts: d } = c;
    if (r === void 0)
      return;
    const E = (0, e._)`${i}${(0, e.getProperty)(s)}`;
    if (o) {
      (0, t.checkStrictMode)(c, `default is ignored for: ${E}`);
      return;
    }
    let g = (0, e._)`${E} === undefined`;
    d.useDefaults === "empty" && (g = (0, e._)`${g} || ${E} === null || ${E} === ""`), l.if(g, (0, e._)`${E} = ${(0, e.stringify)(r)}`);
  }
  return Ze;
}
var Re = {}, ie = {}, Ss;
function Oe() {
  if (Ss) return ie;
  Ss = 1, Object.defineProperty(ie, "__esModule", { value: !0 }), ie.validateUnion = ie.validateArray = ie.usePattern = ie.callValidateCode = ie.schemaProperties = ie.allSchemaProperties = ie.noPropertyInData = ie.propertyInData = ie.isOwnProperty = ie.hasPropFunc = ie.reportMissingProp = ie.checkMissingProp = ie.checkReportMissingProp = void 0;
  const e = te(), t = ne(), a = Fe(), n = ne();
  function c(u, m) {
    const { gen: y, data: v, it: _ } = u;
    y.if(d(y, v, m, _.opts.ownProperties), () => {
      u.setParams({ missingProperty: (0, e._)`${m}` }, !0), u.error();
    });
  }
  ie.checkReportMissingProp = c;
  function s({ gen: u, data: m, it: { opts: y } }, v, _) {
    return (0, e.or)(...v.map((S) => (0, e.and)(d(u, m, S, y.ownProperties), (0, e._)`${_} = ${S}`)));
  }
  ie.checkMissingProp = s;
  function r(u, m) {
    u.setParams({ missingProperty: m }, !0), u.error();
  }
  ie.reportMissingProp = r;
  function l(u) {
    return u.scopeValue("func", {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      ref: Object.prototype.hasOwnProperty,
      code: (0, e._)`Object.prototype.hasOwnProperty`
    });
  }
  ie.hasPropFunc = l;
  function o(u, m, y) {
    return (0, e._)`${l(u)}.call(${m}, ${y})`;
  }
  ie.isOwnProperty = o;
  function i(u, m, y, v) {
    const _ = (0, e._)`${m}${(0, e.getProperty)(y)} !== undefined`;
    return v ? (0, e._)`${_} && ${o(u, m, y)}` : _;
  }
  ie.propertyInData = i;
  function d(u, m, y, v) {
    const _ = (0, e._)`${m}${(0, e.getProperty)(y)} === undefined`;
    return v ? (0, e.or)(_, (0, e.not)(o(u, m, y))) : _;
  }
  ie.noPropertyInData = d;
  function E(u) {
    return u ? Object.keys(u).filter((m) => m !== "__proto__") : [];
  }
  ie.allSchemaProperties = E;
  function g(u, m) {
    return E(m).filter((y) => !(0, t.alwaysValidSchema)(u, m[y]));
  }
  ie.schemaProperties = g;
  function p({ schemaCode: u, data: m, it: { gen: y, topSchemaRef: v, schemaPath: _, errorPath: S }, it: $ }, O, T, k) {
    const H = k ? (0, e._)`${u}, ${m}, ${v}${_}` : m, U = [
      [a.default.instancePath, (0, e.strConcat)(a.default.instancePath, S)],
      [a.default.parentData, $.parentData],
      [a.default.parentDataProperty, $.parentDataProperty],
      [a.default.rootData, a.default.rootData]
    ];
    $.opts.dynamicRef && U.push([a.default.dynamicAnchors, a.default.dynamicAnchors]);
    const z = (0, e._)`${H}, ${y.object(...U)}`;
    return T !== e.nil ? (0, e._)`${O}.call(${T}, ${z})` : (0, e._)`${O}(${z})`;
  }
  ie.callValidateCode = p;
  const w = (0, e._)`new RegExp`;
  function b({ gen: u, it: { opts: m } }, y) {
    const v = m.unicodeRegExp ? "u" : "", { regExp: _ } = m.code, S = _(y, v);
    return u.scopeValue("pattern", {
      key: S.toString(),
      ref: S,
      code: (0, e._)`${_.code === "new RegExp" ? w : (0, n.useFunc)(u, _)}(${y}, ${v})`
    });
  }
  ie.usePattern = b;
  function f(u) {
    const { gen: m, data: y, keyword: v, it: _ } = u, S = m.name("valid");
    if (_.allErrors) {
      const O = m.let("valid", !0);
      return $(() => m.assign(O, !1)), O;
    }
    return m.var(S, !0), $(() => m.break()), S;
    function $(O) {
      const T = m.const("len", (0, e._)`${y}.length`);
      m.forRange("i", 0, T, (k) => {
        u.subschema({
          keyword: v,
          dataProp: k,
          dataPropType: t.Type.Num
        }, S), m.if((0, e.not)(S), O);
      });
    }
  }
  ie.validateArray = f;
  function h(u) {
    const { gen: m, schema: y, keyword: v, it: _ } = u;
    if (!Array.isArray(y))
      throw new Error("ajv implementation error");
    if (y.some((T) => (0, t.alwaysValidSchema)(_, T)) && !_.opts.unevaluated)
      return;
    const $ = m.let("valid", !1), O = m.name("_valid");
    m.block(() => y.forEach((T, k) => {
      const H = u.subschema({
        keyword: v,
        schemaProp: k,
        compositeRule: !0
      }, O);
      m.assign($, (0, e._)`${$} || ${O}`), u.mergeValidEvaluated(H, O) || m.if((0, e.not)($));
    })), u.result($, () => u.reset(), () => u.error(!0));
  }
  return ie.validateUnion = h, ie;
}
var ws;
function Su() {
  if (ws) return Re;
  ws = 1, Object.defineProperty(Re, "__esModule", { value: !0 }), Re.validateKeywordUsage = Re.validSchemaType = Re.funcKeywordCode = Re.macroKeywordCode = void 0;
  const e = te(), t = Fe(), a = Oe(), n = yr();
  function c(g, p) {
    const { gen: w, keyword: b, schema: f, parentSchema: h, it: u } = g, m = p.macro.call(u.self, f, h, u), y = i(w, b, m);
    u.opts.validateSchema !== !1 && u.self.validateSchema(m, !0);
    const v = w.name("valid");
    g.subschema({
      schema: m,
      schemaPath: e.nil,
      errSchemaPath: `${u.errSchemaPath}/${b}`,
      topSchemaRef: y,
      compositeRule: !0
    }, v), g.pass(v, () => g.error(!0));
  }
  Re.macroKeywordCode = c;
  function s(g, p) {
    var w;
    const { gen: b, keyword: f, schema: h, parentSchema: u, $data: m, it: y } = g;
    o(y, p);
    const v = !m && p.compile ? p.compile.call(y.self, h, u, y) : p.validate, _ = i(b, f, v), S = b.let("valid");
    g.block$data(S, $), g.ok((w = p.valid) !== null && w !== void 0 ? w : S);
    function $() {
      if (p.errors === !1)
        k(), p.modifying && r(g), H(() => g.error());
      else {
        const U = p.async ? O() : T();
        p.modifying && r(g), H(() => l(g, U));
      }
    }
    function O() {
      const U = b.let("ruleErrs", null);
      return b.try(() => k((0, e._)`await `), (z) => b.assign(S, !1).if((0, e._)`${z} instanceof ${y.ValidationError}`, () => b.assign(U, (0, e._)`${z}.errors`), () => b.throw(z))), U;
    }
    function T() {
      const U = (0, e._)`${_}.errors`;
      return b.assign(U, null), k(e.nil), U;
    }
    function k(U = p.async ? (0, e._)`await ` : e.nil) {
      const z = y.opts.passContext ? t.default.this : t.default.self, V = !("compile" in p && !m || p.schema === !1);
      b.assign(S, (0, e._)`${U}${(0, a.callValidateCode)(g, _, z, V)}`, p.modifying);
    }
    function H(U) {
      var z;
      b.if((0, e.not)((z = p.valid) !== null && z !== void 0 ? z : S), U);
    }
  }
  Re.funcKeywordCode = s;
  function r(g) {
    const { gen: p, data: w, it: b } = g;
    p.if(b.parentData, () => p.assign(w, (0, e._)`${b.parentData}[${b.parentDataProperty}]`));
  }
  function l(g, p) {
    const { gen: w } = g;
    w.if((0, e._)`Array.isArray(${p})`, () => {
      w.assign(t.default.vErrors, (0, e._)`${t.default.vErrors} === null ? ${p} : ${t.default.vErrors}.concat(${p})`).assign(t.default.errors, (0, e._)`${t.default.vErrors}.length`), (0, n.extendErrors)(g);
    }, () => g.error());
  }
  function o({ schemaEnv: g }, p) {
    if (p.async && !g.$async)
      throw new Error("async keyword in sync schema");
  }
  function i(g, p, w) {
    if (w === void 0)
      throw new Error(`keyword "${p}" failed to compile`);
    return g.scopeValue("keyword", typeof w == "function" ? { ref: w } : { ref: w, code: (0, e.stringify)(w) });
  }
  function d(g, p, w = !1) {
    return !p.length || p.some((b) => b === "array" ? Array.isArray(g) : b === "object" ? g && typeof g == "object" && !Array.isArray(g) : typeof g == b || w && typeof g > "u");
  }
  Re.validSchemaType = d;
  function E({ schema: g, opts: p, self: w, errSchemaPath: b }, f, h) {
    if (Array.isArray(f.keyword) ? !f.keyword.includes(h) : f.keyword !== h)
      throw new Error("ajv implementation error");
    const u = f.dependencies;
    if (u?.some((m) => !Object.prototype.hasOwnProperty.call(g, m)))
      throw new Error(`parent schema must have dependencies of ${h}: ${u.join(",")}`);
    if (f.validateSchema && !f.validateSchema(g[h])) {
      const y = `keyword "${h}" value is invalid at path "${b}": ` + w.errorsText(f.validateSchema.errors);
      if (p.validateSchema === "log")
        w.logger.error(y);
      else
        throw new Error(y);
    }
  }
  return Re.validateKeywordUsage = E, Re;
}
var Le = {}, $s;
function wu() {
  if ($s) return Le;
  $s = 1, Object.defineProperty(Le, "__esModule", { value: !0 }), Le.extendSubschemaMode = Le.extendSubschemaData = Le.getSubschema = void 0;
  const e = te(), t = ne();
  function a(s, { keyword: r, schemaProp: l, schema: o, schemaPath: i, errSchemaPath: d, topSchemaRef: E }) {
    if (r !== void 0 && o !== void 0)
      throw new Error('both "keyword" and "schema" passed, only one allowed');
    if (r !== void 0) {
      const g = s.schema[r];
      return l === void 0 ? {
        schema: g,
        schemaPath: (0, e._)`${s.schemaPath}${(0, e.getProperty)(r)}`,
        errSchemaPath: `${s.errSchemaPath}/${r}`
      } : {
        schema: g[l],
        schemaPath: (0, e._)`${s.schemaPath}${(0, e.getProperty)(r)}${(0, e.getProperty)(l)}`,
        errSchemaPath: `${s.errSchemaPath}/${r}/${(0, t.escapeFragment)(l)}`
      };
    }
    if (o !== void 0) {
      if (i === void 0 || d === void 0 || E === void 0)
        throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
      return {
        schema: o,
        schemaPath: i,
        topSchemaRef: E,
        errSchemaPath: d
      };
    }
    throw new Error('either "keyword" or "schema" must be passed');
  }
  Le.getSubschema = a;
  function n(s, r, { dataProp: l, dataPropType: o, data: i, dataTypes: d, propertyName: E }) {
    if (i !== void 0 && l !== void 0)
      throw new Error('both "data" and "dataProp" passed, only one allowed');
    const { gen: g } = r;
    if (l !== void 0) {
      const { errorPath: w, dataPathArr: b, opts: f } = r, h = g.let("data", (0, e._)`${r.data}${(0, e.getProperty)(l)}`, !0);
      p(h), s.errorPath = (0, e.str)`${w}${(0, t.getErrorPath)(l, o, f.jsPropertySyntax)}`, s.parentDataProperty = (0, e._)`${l}`, s.dataPathArr = [...b, s.parentDataProperty];
    }
    if (i !== void 0) {
      const w = i instanceof e.Name ? i : g.let("data", i, !0);
      p(w), E !== void 0 && (s.propertyName = E);
    }
    d && (s.dataTypes = d);
    function p(w) {
      s.data = w, s.dataLevel = r.dataLevel + 1, s.dataTypes = [], r.definedProperties = /* @__PURE__ */ new Set(), s.parentData = r.data, s.dataNames = [...r.dataNames, w];
    }
  }
  Le.extendSubschemaData = n;
  function c(s, { jtdDiscriminator: r, jtdMetadata: l, compositeRule: o, createErrors: i, allErrors: d }) {
    o !== void 0 && (s.compositeRule = o), i !== void 0 && (s.createErrors = i), d !== void 0 && (s.allErrors = d), s.jtdDiscriminator = r, s.jtdMetadata = l;
  }
  return Le.extendSubschemaMode = c, Le;
}
var ve = {}, Fr, bs;
function Tc() {
  return bs || (bs = 1, Fr = function e(t, a) {
    if (t === a) return !0;
    if (t && a && typeof t == "object" && typeof a == "object") {
      if (t.constructor !== a.constructor) return !1;
      var n, c, s;
      if (Array.isArray(t)) {
        if (n = t.length, n != a.length) return !1;
        for (c = n; c-- !== 0; )
          if (!e(t[c], a[c])) return !1;
        return !0;
      }
      if (t.constructor === RegExp) return t.source === a.source && t.flags === a.flags;
      if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === a.valueOf();
      if (t.toString !== Object.prototype.toString) return t.toString() === a.toString();
      if (s = Object.keys(t), n = s.length, n !== Object.keys(a).length) return !1;
      for (c = n; c-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(a, s[c])) return !1;
      for (c = n; c-- !== 0; ) {
        var r = s[c];
        if (!e(t[r], a[r])) return !1;
      }
      return !0;
    }
    return t !== t && a !== a;
  }), Fr;
}
var qr = { exports: {} }, Rs;
function $u() {
  if (Rs) return qr.exports;
  Rs = 1;
  var e = qr.exports = function(n, c, s) {
    typeof c == "function" && (s = c, c = {}), s = c.cb || s;
    var r = typeof s == "function" ? s : s.pre || function() {
    }, l = s.post || function() {
    };
    t(c, r, l, n, "", n);
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
  function t(n, c, s, r, l, o, i, d, E, g) {
    if (r && typeof r == "object" && !Array.isArray(r)) {
      c(r, l, o, i, d, E, g);
      for (var p in r) {
        var w = r[p];
        if (Array.isArray(w)) {
          if (p in e.arrayKeywords)
            for (var b = 0; b < w.length; b++)
              t(n, c, s, w[b], l + "/" + p + "/" + b, o, l, p, r, b);
        } else if (p in e.propsKeywords) {
          if (w && typeof w == "object")
            for (var f in w)
              t(n, c, s, w[f], l + "/" + p + "/" + a(f), o, l, p, r, f);
        } else (p in e.keywords || n.allKeys && !(p in e.skipKeywords)) && t(n, c, s, w, l + "/" + p, o, l, p, r);
      }
      s(r, l, o, i, d, E, g);
    }
  }
  function a(n) {
    return n.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  return qr.exports;
}
var Os;
function vr() {
  if (Os) return ve;
  Os = 1, Object.defineProperty(ve, "__esModule", { value: !0 }), ve.getSchemaRefs = ve.resolveUrl = ve.normalizeId = ve._getFullPath = ve.getFullPath = ve.inlineRef = void 0;
  const e = ne(), t = Tc(), a = $u(), n = /* @__PURE__ */ new Set([
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
  function c(b, f = !0) {
    return typeof b == "boolean" ? !0 : f === !0 ? !r(b) : f ? l(b) <= f : !1;
  }
  ve.inlineRef = c;
  const s = /* @__PURE__ */ new Set([
    "$ref",
    "$recursiveRef",
    "$recursiveAnchor",
    "$dynamicRef",
    "$dynamicAnchor"
  ]);
  function r(b) {
    for (const f in b) {
      if (s.has(f))
        return !0;
      const h = b[f];
      if (Array.isArray(h) && h.some(r) || typeof h == "object" && r(h))
        return !0;
    }
    return !1;
  }
  function l(b) {
    let f = 0;
    for (const h in b) {
      if (h === "$ref")
        return 1 / 0;
      if (f++, !n.has(h) && (typeof b[h] == "object" && (0, e.eachItem)(b[h], (u) => f += l(u)), f === 1 / 0))
        return 1 / 0;
    }
    return f;
  }
  function o(b, f = "", h) {
    h !== !1 && (f = E(f));
    const u = b.parse(f);
    return i(b, u);
  }
  ve.getFullPath = o;
  function i(b, f) {
    return b.serialize(f).split("#")[0] + "#";
  }
  ve._getFullPath = i;
  const d = /#\/?$/;
  function E(b) {
    return b ? b.replace(d, "") : "";
  }
  ve.normalizeId = E;
  function g(b, f, h) {
    return h = E(h), b.resolve(f, h);
  }
  ve.resolveUrl = g;
  const p = /^[a-z_][-a-z0-9._]*$/i;
  function w(b, f) {
    if (typeof b == "boolean")
      return {};
    const { schemaId: h, uriResolver: u } = this.opts, m = E(b[h] || f), y = { "": m }, v = o(u, m, !1), _ = {}, S = /* @__PURE__ */ new Set();
    return a(b, { allKeys: !0 }, (T, k, H, U) => {
      if (U === void 0)
        return;
      const z = v + k;
      let V = y[U];
      typeof T[h] == "string" && (V = Z.call(this, T[h])), B.call(this, T.$anchor), B.call(this, T.$dynamicAnchor), y[k] = V;
      function Z(A) {
        const x = this.opts.uriResolver.resolve;
        if (A = E(V ? x(V, A) : A), S.has(A))
          throw O(A);
        S.add(A);
        let D = this.refs[A];
        return typeof D == "string" && (D = this.refs[D]), typeof D == "object" ? $(T, D.schema, A) : A !== E(z) && (A[0] === "#" ? ($(T, _[A], A), _[A] = T) : this.refs[A] = z), A;
      }
      function B(A) {
        if (typeof A == "string") {
          if (!p.test(A))
            throw new Error(`invalid anchor "${A}"`);
          Z.call(this, `#${A}`);
        }
      }
    }), _;
    function $(T, k, H) {
      if (k !== void 0 && !t(T, k))
        throw O(H);
    }
    function O(T) {
      return new Error(`reference "${T}" resolves to more than one schema`);
    }
  }
  return ve.getSchemaRefs = w, ve;
}
var Is;
function Er() {
  if (Is) return Ce;
  Is = 1, Object.defineProperty(Ce, "__esModule", { value: !0 }), Ce.getData = Ce.KeywordCxt = Ce.validateFunctionCode = void 0;
  const e = gu(), t = pr(), a = Pc(), n = pr(), c = _u(), s = Su(), r = wu(), l = te(), o = Fe(), i = vr(), d = ne(), E = yr();
  function g(P) {
    if (v(P) && (S(P), y(P))) {
      f(P);
      return;
    }
    p(P, () => (0, e.topBoolOrEmptySchema)(P));
  }
  Ce.validateFunctionCode = g;
  function p({ gen: P, validateName: q, schema: M, schemaEnv: F, opts: G }, Y) {
    G.code.es5 ? P.func(q, (0, l._)`${o.default.data}, ${o.default.valCxt}`, F.$async, () => {
      P.code((0, l._)`"use strict"; ${u(M, G)}`), b(P, G), P.code(Y);
    }) : P.func(q, (0, l._)`${o.default.data}, ${w(G)}`, F.$async, () => P.code(u(M, G)).code(Y));
  }
  function w(P) {
    return (0, l._)`{${o.default.instancePath}="", ${o.default.parentData}, ${o.default.parentDataProperty}, ${o.default.rootData}=${o.default.data}${P.dynamicRef ? (0, l._)`, ${o.default.dynamicAnchors}={}` : l.nil}}={}`;
  }
  function b(P, q) {
    P.if(o.default.valCxt, () => {
      P.var(o.default.instancePath, (0, l._)`${o.default.valCxt}.${o.default.instancePath}`), P.var(o.default.parentData, (0, l._)`${o.default.valCxt}.${o.default.parentData}`), P.var(o.default.parentDataProperty, (0, l._)`${o.default.valCxt}.${o.default.parentDataProperty}`), P.var(o.default.rootData, (0, l._)`${o.default.valCxt}.${o.default.rootData}`), q.dynamicRef && P.var(o.default.dynamicAnchors, (0, l._)`${o.default.valCxt}.${o.default.dynamicAnchors}`);
    }, () => {
      P.var(o.default.instancePath, (0, l._)`""`), P.var(o.default.parentData, (0, l._)`undefined`), P.var(o.default.parentDataProperty, (0, l._)`undefined`), P.var(o.default.rootData, o.default.data), q.dynamicRef && P.var(o.default.dynamicAnchors, (0, l._)`{}`);
    });
  }
  function f(P) {
    const { schema: q, opts: M, gen: F } = P;
    p(P, () => {
      M.$comment && q.$comment && U(P), T(P), F.let(o.default.vErrors, null), F.let(o.default.errors, 0), M.unevaluated && h(P), $(P), z(P);
    });
  }
  function h(P) {
    const { gen: q, validateName: M } = P;
    P.evaluated = q.const("evaluated", (0, l._)`${M}.evaluated`), q.if((0, l._)`${P.evaluated}.dynamicProps`, () => q.assign((0, l._)`${P.evaluated}.props`, (0, l._)`undefined`)), q.if((0, l._)`${P.evaluated}.dynamicItems`, () => q.assign((0, l._)`${P.evaluated}.items`, (0, l._)`undefined`));
  }
  function u(P, q) {
    const M = typeof P == "object" && P[q.schemaId];
    return M && (q.code.source || q.code.process) ? (0, l._)`/*# sourceURL=${M} */` : l.nil;
  }
  function m(P, q) {
    if (v(P) && (S(P), y(P))) {
      _(P, q);
      return;
    }
    (0, e.boolOrEmptySchema)(P, q);
  }
  function y({ schema: P, self: q }) {
    if (typeof P == "boolean")
      return !P;
    for (const M in P)
      if (q.RULES.all[M])
        return !0;
    return !1;
  }
  function v(P) {
    return typeof P.schema != "boolean";
  }
  function _(P, q) {
    const { schema: M, gen: F, opts: G } = P;
    G.$comment && M.$comment && U(P), k(P), H(P);
    const Y = F.const("_errs", o.default.errors);
    $(P, Y), F.var(q, (0, l._)`${Y} === ${o.default.errors}`);
  }
  function S(P) {
    (0, d.checkUnknownRules)(P), O(P);
  }
  function $(P, q) {
    if (P.opts.jtd)
      return Z(P, [], !1, q);
    const M = (0, t.getSchemaTypes)(P.schema), F = (0, t.coerceAndCheckDataType)(P, M);
    Z(P, M, !F, q);
  }
  function O(P) {
    const { schema: q, errSchemaPath: M, opts: F, self: G } = P;
    q.$ref && F.ignoreKeywordsWithRef && (0, d.schemaHasRulesButRef)(q, G.RULES) && G.logger.warn(`$ref: keywords ignored in schema at path "${M}"`);
  }
  function T(P) {
    const { schema: q, opts: M } = P;
    q.default !== void 0 && M.useDefaults && M.strictSchema && (0, d.checkStrictMode)(P, "default is ignored in the schema root");
  }
  function k(P) {
    const q = P.schema[P.opts.schemaId];
    q && (P.baseId = (0, i.resolveUrl)(P.opts.uriResolver, P.baseId, q));
  }
  function H(P) {
    if (P.schema.$async && !P.schemaEnv.$async)
      throw new Error("async schema in sync schema");
  }
  function U({ gen: P, schemaEnv: q, schema: M, errSchemaPath: F, opts: G }) {
    const Y = M.$comment;
    if (G.$comment === !0)
      P.code((0, l._)`${o.default.self}.logger.log(${Y})`);
    else if (typeof G.$comment == "function") {
      const X = (0, l.str)`${F}/$comment`, Se = P.scopeValue("root", { ref: q.root });
      P.code((0, l._)`${o.default.self}.opts.$comment(${Y}, ${X}, ${Se}.schema)`);
    }
  }
  function z(P) {
    const { gen: q, schemaEnv: M, validateName: F, ValidationError: G, opts: Y } = P;
    M.$async ? q.if((0, l._)`${o.default.errors} === 0`, () => q.return(o.default.data), () => q.throw((0, l._)`new ${G}(${o.default.vErrors})`)) : (q.assign((0, l._)`${F}.errors`, o.default.vErrors), Y.unevaluated && V(P), q.return((0, l._)`${o.default.errors} === 0`));
  }
  function V({ gen: P, evaluated: q, props: M, items: F }) {
    M instanceof l.Name && P.assign((0, l._)`${q}.props`, M), F instanceof l.Name && P.assign((0, l._)`${q}.items`, F);
  }
  function Z(P, q, M, F) {
    const { gen: G, schema: Y, data: X, allErrors: Se, opts: me, self: pe } = P, { RULES: fe } = pe;
    if (Y.$ref && (me.ignoreKeywordsWithRef || !(0, d.schemaHasRulesButRef)(Y, fe))) {
      G.block(() => K(P, "$ref", fe.all.$ref.definition));
      return;
    }
    me.jtd || A(P, q), G.block(() => {
      for (const ye of fe.rules)
        Te(ye);
      Te(fe.post);
    });
    function Te(ye) {
      (0, a.shouldUseGroup)(Y, ye) && (ye.type ? (G.if((0, n.checkDataType)(ye.type, X, me.strictNumbers)), B(P, ye), q.length === 1 && q[0] === ye.type && M && (G.else(), (0, n.reportTypeError)(P)), G.endIf()) : B(P, ye), Se || G.if((0, l._)`${o.default.errors} === ${F || 0}`));
    }
  }
  function B(P, q) {
    const { gen: M, schema: F, opts: { useDefaults: G } } = P;
    G && (0, c.assignDefaults)(P, q.type), M.block(() => {
      for (const Y of q.rules)
        (0, a.shouldUseRule)(F, Y) && K(P, Y.keyword, Y.definition, q.type);
    });
  }
  function A(P, q) {
    P.schemaEnv.meta || !P.opts.strictTypes || (x(P, q), P.opts.allowUnionTypes || D(P, q), C(P, P.dataTypes));
  }
  function x(P, q) {
    if (q.length) {
      if (!P.dataTypes.length) {
        P.dataTypes = q;
        return;
      }
      q.forEach((M) => {
        L(P.dataTypes, M) || N(P, `type "${M}" not allowed by context "${P.dataTypes.join(",")}"`);
      }), R(P, q);
    }
  }
  function D(P, q) {
    q.length > 1 && !(q.length === 2 && q.includes("null")) && N(P, "use allowUnionTypes to allow union type keyword");
  }
  function C(P, q) {
    const M = P.self.RULES.all;
    for (const F in M) {
      const G = M[F];
      if (typeof G == "object" && (0, a.shouldUseRule)(P.schema, G)) {
        const { type: Y } = G.definition;
        Y.length && !Y.some((X) => j(q, X)) && N(P, `missing type "${Y.join(",")}" for keyword "${F}"`);
      }
    }
  }
  function j(P, q) {
    return P.includes(q) || q === "number" && P.includes("integer");
  }
  function L(P, q) {
    return P.includes(q) || q === "integer" && P.includes("number");
  }
  function R(P, q) {
    const M = [];
    for (const F of P.dataTypes)
      L(q, F) ? M.push(F) : q.includes("integer") && F === "number" && M.push("integer");
    P.dataTypes = M;
  }
  function N(P, q) {
    const M = P.schemaEnv.baseId + P.errSchemaPath;
    q += ` at "${M}" (strictTypes)`, (0, d.checkStrictMode)(P, q, P.opts.strictTypes);
  }
  class I {
    constructor(q, M, F) {
      if ((0, s.validateKeywordUsage)(q, M, F), this.gen = q.gen, this.allErrors = q.allErrors, this.keyword = F, this.data = q.data, this.schema = q.schema[F], this.$data = M.$data && q.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, d.schemaRefOrVal)(q, this.schema, F, this.$data), this.schemaType = M.schemaType, this.parentSchema = q.schema, this.params = {}, this.it = q, this.def = M, this.$data)
        this.schemaCode = q.gen.const("vSchema", J(this.$data, q));
      else if (this.schemaCode = this.schemaValue, !(0, s.validSchemaType)(this.schema, M.schemaType, M.allowUndefined))
        throw new Error(`${F} value must be ${JSON.stringify(M.schemaType)}`);
      ("code" in M ? M.trackErrors : M.errors !== !1) && (this.errsCount = q.gen.const("_errs", o.default.errors));
    }
    result(q, M, F) {
      this.failResult((0, l.not)(q), M, F);
    }
    failResult(q, M, F) {
      this.gen.if(q), F ? F() : this.error(), M ? (this.gen.else(), M(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    pass(q, M) {
      this.failResult((0, l.not)(q), void 0, M);
    }
    fail(q) {
      if (q === void 0) {
        this.error(), this.allErrors || this.gen.if(!1);
        return;
      }
      this.gen.if(q), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    fail$data(q) {
      if (!this.$data)
        return this.fail(q);
      const { schemaCode: M } = this;
      this.fail((0, l._)`${M} !== undefined && (${(0, l.or)(this.invalid$data(), q)})`);
    }
    error(q, M, F) {
      if (M) {
        this.setParams(M), this._error(q, F), this.setParams({});
        return;
      }
      this._error(q, F);
    }
    _error(q, M) {
      (q ? E.reportExtraError : E.reportError)(this, this.def.error, M);
    }
    $dataError() {
      (0, E.reportError)(this, this.def.$dataError || E.keyword$DataError);
    }
    reset() {
      if (this.errsCount === void 0)
        throw new Error('add "trackErrors" to keyword definition');
      (0, E.resetErrorsCount)(this.gen, this.errsCount);
    }
    ok(q) {
      this.allErrors || this.gen.if(q);
    }
    setParams(q, M) {
      M ? Object.assign(this.params, q) : this.params = q;
    }
    block$data(q, M, F = l.nil) {
      this.gen.block(() => {
        this.check$data(q, F), M();
      });
    }
    check$data(q = l.nil, M = l.nil) {
      if (!this.$data)
        return;
      const { gen: F, schemaCode: G, schemaType: Y, def: X } = this;
      F.if((0, l.or)((0, l._)`${G} === undefined`, M)), q !== l.nil && F.assign(q, !0), (Y.length || X.validateSchema) && (F.elseIf(this.invalid$data()), this.$dataError(), q !== l.nil && F.assign(q, !1)), F.else();
    }
    invalid$data() {
      const { gen: q, schemaCode: M, schemaType: F, def: G, it: Y } = this;
      return (0, l.or)(X(), Se());
      function X() {
        if (F.length) {
          if (!(M instanceof l.Name))
            throw new Error("ajv implementation error");
          const me = Array.isArray(F) ? F : [F];
          return (0, l._)`${(0, n.checkDataTypes)(me, M, Y.opts.strictNumbers, n.DataType.Wrong)}`;
        }
        return l.nil;
      }
      function Se() {
        if (G.validateSchema) {
          const me = q.scopeValue("validate$data", { ref: G.validateSchema });
          return (0, l._)`!${me}(${M})`;
        }
        return l.nil;
      }
    }
    subschema(q, M) {
      const F = (0, r.getSubschema)(this.it, q);
      (0, r.extendSubschemaData)(F, this.it, q), (0, r.extendSubschemaMode)(F, q);
      const G = { ...this.it, ...F, items: void 0, props: void 0 };
      return m(G, M), G;
    }
    mergeEvaluated(q, M) {
      const { it: F, gen: G } = this;
      F.opts.unevaluated && (F.props !== !0 && q.props !== void 0 && (F.props = d.mergeEvaluated.props(G, q.props, F.props, M)), F.items !== !0 && q.items !== void 0 && (F.items = d.mergeEvaluated.items(G, q.items, F.items, M)));
    }
    mergeValidEvaluated(q, M) {
      const { it: F, gen: G } = this;
      if (F.opts.unevaluated && (F.props !== !0 || F.items !== !0))
        return G.if(M, () => this.mergeEvaluated(q, l.Name)), !0;
    }
  }
  Ce.KeywordCxt = I;
  function K(P, q, M, F) {
    const G = new I(P, M, q);
    "code" in M ? M.code(G, F) : G.$data && M.validate ? (0, s.funcKeywordCode)(G, M) : "macro" in M ? (0, s.macroKeywordCode)(G, M) : (M.compile || M.validate) && (0, s.funcKeywordCode)(G, M);
  }
  const W = /^\/(?:[^~]|~0|~1)*$/, Q = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
  function J(P, { dataLevel: q, dataNames: M, dataPathArr: F }) {
    let G, Y;
    if (P === "")
      return o.default.rootData;
    if (P[0] === "/") {
      if (!W.test(P))
        throw new Error(`Invalid JSON-pointer: ${P}`);
      G = P, Y = o.default.rootData;
    } else {
      const pe = Q.exec(P);
      if (!pe)
        throw new Error(`Invalid JSON-pointer: ${P}`);
      const fe = +pe[1];
      if (G = pe[2], G === "#") {
        if (fe >= q)
          throw new Error(me("property/index", fe));
        return F[q - fe];
      }
      if (fe > q)
        throw new Error(me("data", fe));
      if (Y = M[q - fe], !G)
        return Y;
    }
    let X = Y;
    const Se = G.split("/");
    for (const pe of Se)
      pe && (Y = (0, l._)`${Y}${(0, l.getProperty)((0, d.unescapeJsonPointer)(pe))}`, X = (0, l._)`${X} && ${Y}`);
    return X;
    function me(pe, fe) {
      return `Cannot access ${pe} ${fe} levels up, current level is ${q}`;
    }
  }
  return Ce.getData = J, Ce;
}
var bt = {}, Ns;
function Ni() {
  if (Ns) return bt;
  Ns = 1, Object.defineProperty(bt, "__esModule", { value: !0 });
  class e extends Error {
    constructor(a) {
      super("validation failed"), this.errors = a, this.ajv = this.validation = !0;
    }
  }
  return bt.default = e, bt;
}
var Rt = {}, Ps;
function gr() {
  if (Ps) return Rt;
  Ps = 1, Object.defineProperty(Rt, "__esModule", { value: !0 });
  const e = vr();
  class t extends Error {
    constructor(n, c, s, r) {
      super(r || `can't resolve reference ${s} from id ${c}`), this.missingRef = (0, e.resolveUrl)(n, c, s), this.missingSchema = (0, e.normalizeId)((0, e.getFullPath)(n, this.missingRef));
    }
  }
  return Rt.default = t, Rt;
}
var we = {}, Ts;
function Pi() {
  if (Ts) return we;
  Ts = 1, Object.defineProperty(we, "__esModule", { value: !0 }), we.resolveSchema = we.getCompilingSchema = we.resolveRef = we.compileSchema = we.SchemaEnv = void 0;
  const e = te(), t = Ni(), a = Fe(), n = vr(), c = ne(), s = Er();
  class r {
    constructor(h) {
      var u;
      this.refs = {}, this.dynamicAnchors = {};
      let m;
      typeof h.schema == "object" && (m = h.schema), this.schema = h.schema, this.schemaId = h.schemaId, this.root = h.root || this, this.baseId = (u = h.baseId) !== null && u !== void 0 ? u : (0, n.normalizeId)(m?.[h.schemaId || "$id"]), this.schemaPath = h.schemaPath, this.localRefs = h.localRefs, this.meta = h.meta, this.$async = m?.$async, this.refs = {};
    }
  }
  we.SchemaEnv = r;
  function l(f) {
    const h = d.call(this, f);
    if (h)
      return h;
    const u = (0, n.getFullPath)(this.opts.uriResolver, f.root.baseId), { es5: m, lines: y } = this.opts.code, { ownProperties: v } = this.opts, _ = new e.CodeGen(this.scope, { es5: m, lines: y, ownProperties: v });
    let S;
    f.$async && (S = _.scopeValue("Error", {
      ref: t.default,
      code: (0, e._)`require("ajv/dist/runtime/validation_error").default`
    }));
    const $ = _.scopeName("validate");
    f.validateName = $;
    const O = {
      gen: _,
      allErrors: this.opts.allErrors,
      data: a.default.data,
      parentData: a.default.parentData,
      parentDataProperty: a.default.parentDataProperty,
      dataNames: [a.default.data],
      dataPathArr: [e.nil],
      // TODO can its length be used as dataLevel if nil is removed?
      dataLevel: 0,
      dataTypes: [],
      definedProperties: /* @__PURE__ */ new Set(),
      topSchemaRef: _.scopeValue("schema", this.opts.code.source === !0 ? { ref: f.schema, code: (0, e.stringify)(f.schema) } : { ref: f.schema }),
      validateName: $,
      ValidationError: S,
      schema: f.schema,
      schemaEnv: f,
      rootId: u,
      baseId: f.baseId || u,
      schemaPath: e.nil,
      errSchemaPath: f.schemaPath || (this.opts.jtd ? "" : "#"),
      errorPath: (0, e._)`""`,
      opts: this.opts,
      self: this
    };
    let T;
    try {
      this._compilations.add(f), (0, s.validateFunctionCode)(O), _.optimize(this.opts.code.optimize);
      const k = _.toString();
      T = `${_.scopeRefs(a.default.scope)}return ${k}`, this.opts.code.process && (T = this.opts.code.process(T, f));
      const U = new Function(`${a.default.self}`, `${a.default.scope}`, T)(this, this.scope.get());
      if (this.scope.value($, { ref: U }), U.errors = null, U.schema = f.schema, U.schemaEnv = f, f.$async && (U.$async = !0), this.opts.code.source === !0 && (U.source = { validateName: $, validateCode: k, scopeValues: _._values }), this.opts.unevaluated) {
        const { props: z, items: V } = O;
        U.evaluated = {
          props: z instanceof e.Name ? void 0 : z,
          items: V instanceof e.Name ? void 0 : V,
          dynamicProps: z instanceof e.Name,
          dynamicItems: V instanceof e.Name
        }, U.source && (U.source.evaluated = (0, e.stringify)(U.evaluated));
      }
      return f.validate = U, f;
    } catch (k) {
      throw delete f.validate, delete f.validateName, T && this.logger.error("Error compiling schema, function code:", T), k;
    } finally {
      this._compilations.delete(f);
    }
  }
  we.compileSchema = l;
  function o(f, h, u) {
    var m;
    u = (0, n.resolveUrl)(this.opts.uriResolver, h, u);
    const y = f.refs[u];
    if (y)
      return y;
    let v = g.call(this, f, u);
    if (v === void 0) {
      const _ = (m = f.localRefs) === null || m === void 0 ? void 0 : m[u], { schemaId: S } = this.opts;
      _ && (v = new r({ schema: _, schemaId: S, root: f, baseId: h }));
    }
    if (v !== void 0)
      return f.refs[u] = i.call(this, v);
  }
  we.resolveRef = o;
  function i(f) {
    return (0, n.inlineRef)(f.schema, this.opts.inlineRefs) ? f.schema : f.validate ? f : l.call(this, f);
  }
  function d(f) {
    for (const h of this._compilations)
      if (E(h, f))
        return h;
  }
  we.getCompilingSchema = d;
  function E(f, h) {
    return f.schema === h.schema && f.root === h.root && f.baseId === h.baseId;
  }
  function g(f, h) {
    let u;
    for (; typeof (u = this.refs[h]) == "string"; )
      h = u;
    return u || this.schemas[h] || p.call(this, f, h);
  }
  function p(f, h) {
    const u = this.opts.uriResolver.parse(h), m = (0, n._getFullPath)(this.opts.uriResolver, u);
    let y = (0, n.getFullPath)(this.opts.uriResolver, f.baseId, void 0);
    if (Object.keys(f.schema).length > 0 && m === y)
      return b.call(this, u, f);
    const v = (0, n.normalizeId)(m), _ = this.refs[v] || this.schemas[v];
    if (typeof _ == "string") {
      const S = p.call(this, f, _);
      return typeof S?.schema != "object" ? void 0 : b.call(this, u, S);
    }
    if (typeof _?.schema == "object") {
      if (_.validate || l.call(this, _), v === (0, n.normalizeId)(h)) {
        const { schema: S } = _, { schemaId: $ } = this.opts, O = S[$];
        return O && (y = (0, n.resolveUrl)(this.opts.uriResolver, y, O)), new r({ schema: S, schemaId: $, root: f, baseId: y });
      }
      return b.call(this, u, _);
    }
  }
  we.resolveSchema = p;
  const w = /* @__PURE__ */ new Set([
    "properties",
    "patternProperties",
    "enum",
    "dependencies",
    "definitions"
  ]);
  function b(f, { baseId: h, schema: u, root: m }) {
    var y;
    if (((y = f.fragment) === null || y === void 0 ? void 0 : y[0]) !== "/")
      return;
    for (const S of f.fragment.slice(1).split("/")) {
      if (typeof u == "boolean")
        return;
      const $ = u[(0, c.unescapeFragment)(S)];
      if ($ === void 0)
        return;
      u = $;
      const O = typeof u == "object" && u[this.opts.schemaId];
      !w.has(S) && O && (h = (0, n.resolveUrl)(this.opts.uriResolver, h, O));
    }
    let v;
    if (typeof u != "boolean" && u.$ref && !(0, c.schemaHasRulesButRef)(u, this.RULES)) {
      const S = (0, n.resolveUrl)(this.opts.uriResolver, h, u.$ref);
      v = p.call(this, m, S);
    }
    const { schemaId: _ } = this.opts;
    if (v = v || new r({ schema: u, schemaId: _, root: m, baseId: h }), v.schema !== v.root.schema)
      return v;
  }
  return we;
}
const bu = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", Ru = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Ou = "object", Iu = ["$data"], Nu = { $data: { type: "string", anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }] } }, Pu = !1, Tu = {
  $id: bu,
  description: Ru,
  type: Ou,
  required: Iu,
  properties: Nu,
  additionalProperties: Pu
};
var Ot = {}, Je = { exports: {} }, kr, Cs;
function Cu() {
  return Cs || (Cs = 1, kr = {
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
  }), kr;
}
var jr, Ds;
function Du() {
  if (Ds) return jr;
  Ds = 1;
  const { HEX: e } = Cu();
  function t(w) {
    if (r(w, ".") < 3)
      return { host: w, isIPV4: !1 };
    const b = w.match(/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/u) || [], [f] = b;
    return f ? { host: s(f, "."), isIPV4: !0 } : { host: w, isIPV4: !1 };
  }
  function a(w, b = !1) {
    let f = "", h = !0;
    for (const u of w) {
      if (e[u] === void 0) return;
      u !== "0" && h === !0 && (h = !1), h || (f += u);
    }
    return b && f.length === 0 && (f = "0"), f;
  }
  function n(w) {
    let b = 0;
    const f = { error: !1, address: "", zone: "" }, h = [], u = [];
    let m = !1, y = !1, v = !1;
    function _() {
      if (u.length) {
        if (m === !1) {
          const S = a(u);
          if (S !== void 0)
            h.push(S);
          else
            return f.error = !0, !1;
        }
        u.length = 0;
      }
      return !0;
    }
    for (let S = 0; S < w.length; S++) {
      const $ = w[S];
      if (!($ === "[" || $ === "]"))
        if ($ === ":") {
          if (y === !0 && (v = !0), !_())
            break;
          if (b++, h.push(":"), b > 7) {
            f.error = !0;
            break;
          }
          S - 1 >= 0 && w[S - 1] === ":" && (y = !0);
          continue;
        } else if ($ === "%") {
          if (!_())
            break;
          m = !0;
        } else {
          u.push($);
          continue;
        }
    }
    return u.length && (m ? f.zone = u.join("") : v ? h.push(u.join("")) : h.push(a(u))), f.address = h.join(""), f;
  }
  function c(w, b = {}) {
    if (r(w, ":") < 2)
      return { host: w, isIPV6: !1 };
    const f = n(w);
    if (f.error)
      return { host: w, isIPV6: !1 };
    {
      let h = f.address, u = f.address;
      return f.zone && (h += "%" + f.zone, u += "%25" + f.zone), { host: h, escapedHost: u, isIPV6: !0 };
    }
  }
  function s(w, b) {
    let f = "", h = !0;
    const u = w.length;
    for (let m = 0; m < u; m++) {
      const y = w[m];
      y === "0" && h ? (m + 1 <= u && w[m + 1] === b || m + 1 === u) && (f += y, h = !1) : (y === b ? h = !0 : h = !1, f += y);
    }
    return f;
  }
  function r(w, b) {
    let f = 0;
    for (let h = 0; h < w.length; h++)
      w[h] === b && f++;
    return f;
  }
  const l = /^\.\.?\//u, o = /^\/\.(?:\/|$)/u, i = /^\/\.\.(?:\/|$)/u, d = /^\/?(?:.|\n)*?(?=\/|$)/u;
  function E(w) {
    const b = [];
    for (; w.length; )
      if (w.match(l))
        w = w.replace(l, "");
      else if (w.match(o))
        w = w.replace(o, "/");
      else if (w.match(i))
        w = w.replace(i, "/"), b.pop();
      else if (w === "." || w === "..")
        w = "";
      else {
        const f = w.match(d);
        if (f) {
          const h = f[0];
          w = w.slice(h.length), b.push(h);
        } else
          throw new Error("Unexpected dot segment condition");
      }
    return b.join("");
  }
  function g(w, b) {
    const f = b !== !0 ? escape : unescape;
    return w.scheme !== void 0 && (w.scheme = f(w.scheme)), w.userinfo !== void 0 && (w.userinfo = f(w.userinfo)), w.host !== void 0 && (w.host = f(w.host)), w.path !== void 0 && (w.path = f(w.path)), w.query !== void 0 && (w.query = f(w.query)), w.fragment !== void 0 && (w.fragment = f(w.fragment)), w;
  }
  function p(w, b) {
    const f = [];
    if (w.userinfo !== void 0 && (f.push(w.userinfo), f.push("@")), w.host !== void 0) {
      let h = unescape(w.host);
      const u = t(h);
      if (u.isIPV4)
        h = u.host;
      else {
        const m = c(u.host, { isIPV4: !1 });
        m.isIPV6 === !0 ? h = `[${m.escapedHost}]` : h = w.host;
      }
      f.push(h);
    }
    return (typeof w.port == "number" || typeof w.port == "string") && (f.push(":"), f.push(String(w.port))), f.length ? f.join("") : void 0;
  }
  return jr = {
    recomposeAuthority: p,
    normalizeComponentEncoding: g,
    removeDotSegments: E,
    normalizeIPv4: t,
    normalizeIPv6: c,
    stringArrayToHexStripped: a
  }, jr;
}
var Mr, Ls;
function Lu() {
  if (Ls) return Mr;
  Ls = 1;
  const e = /^[\da-f]{8}\b-[\da-f]{4}\b-[\da-f]{4}\b-[\da-f]{4}\b-[\da-f]{12}$/iu, t = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
  function a(u) {
    return typeof u.secure == "boolean" ? u.secure : String(u.scheme).toLowerCase() === "wss";
  }
  function n(u) {
    return u.host || (u.error = u.error || "HTTP URIs must have a host."), u;
  }
  function c(u) {
    const m = String(u.scheme).toLowerCase() === "https";
    return (u.port === (m ? 443 : 80) || u.port === "") && (u.port = void 0), u.path || (u.path = "/"), u;
  }
  function s(u) {
    return u.secure = a(u), u.resourceName = (u.path || "/") + (u.query ? "?" + u.query : ""), u.path = void 0, u.query = void 0, u;
  }
  function r(u) {
    if ((u.port === (a(u) ? 443 : 80) || u.port === "") && (u.port = void 0), typeof u.secure == "boolean" && (u.scheme = u.secure ? "wss" : "ws", u.secure = void 0), u.resourceName) {
      const [m, y] = u.resourceName.split("?");
      u.path = m && m !== "/" ? m : void 0, u.query = y, u.resourceName = void 0;
    }
    return u.fragment = void 0, u;
  }
  function l(u, m) {
    if (!u.path)
      return u.error = "URN can not be parsed", u;
    const y = u.path.match(t);
    if (y) {
      const v = m.scheme || u.scheme || "urn";
      u.nid = y[1].toLowerCase(), u.nss = y[2];
      const _ = `${v}:${m.nid || u.nid}`, S = h[_];
      u.path = void 0, S && (u = S.parse(u, m));
    } else
      u.error = u.error || "URN can not be parsed.";
    return u;
  }
  function o(u, m) {
    const y = m.scheme || u.scheme || "urn", v = u.nid.toLowerCase(), _ = `${y}:${m.nid || v}`, S = h[_];
    S && (u = S.serialize(u, m));
    const $ = u, O = u.nss;
    return $.path = `${v || m.nid}:${O}`, m.skipEscape = !0, $;
  }
  function i(u, m) {
    const y = u;
    return y.uuid = y.nss, y.nss = void 0, !m.tolerant && (!y.uuid || !e.test(y.uuid)) && (y.error = y.error || "UUID is not valid."), y;
  }
  function d(u) {
    const m = u;
    return m.nss = (u.uuid || "").toLowerCase(), m;
  }
  const E = {
    scheme: "http",
    domainHost: !0,
    parse: n,
    serialize: c
  }, g = {
    scheme: "https",
    domainHost: E.domainHost,
    parse: n,
    serialize: c
  }, p = {
    scheme: "ws",
    domainHost: !0,
    parse: s,
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
      parse: l,
      serialize: o,
      skipNormalize: !0
    },
    "urn:uuid": {
      scheme: "urn:uuid",
      parse: i,
      serialize: d,
      skipNormalize: !0
    }
  };
  return Mr = h, Mr;
}
var As;
function Au() {
  if (As) return Je.exports;
  As = 1;
  const { normalizeIPv6: e, normalizeIPv4: t, removeDotSegments: a, recomposeAuthority: n, normalizeComponentEncoding: c } = Du(), s = Lu();
  function r(f, h) {
    return typeof f == "string" ? f = d(w(f, h), h) : typeof f == "object" && (f = w(d(f, h), h)), f;
  }
  function l(f, h, u) {
    const m = Object.assign({ scheme: "null" }, u), y = o(w(f, m), w(h, m), m, !0);
    return d(y, { ...m, skipEscape: !0 });
  }
  function o(f, h, u, m) {
    const y = {};
    return m || (f = w(d(f, u), u), h = w(d(h, u), u)), u = u || {}, !u.tolerant && h.scheme ? (y.scheme = h.scheme, y.userinfo = h.userinfo, y.host = h.host, y.port = h.port, y.path = a(h.path || ""), y.query = h.query) : (h.userinfo !== void 0 || h.host !== void 0 || h.port !== void 0 ? (y.userinfo = h.userinfo, y.host = h.host, y.port = h.port, y.path = a(h.path || ""), y.query = h.query) : (h.path ? (h.path.charAt(0) === "/" ? y.path = a(h.path) : ((f.userinfo !== void 0 || f.host !== void 0 || f.port !== void 0) && !f.path ? y.path = "/" + h.path : f.path ? y.path = f.path.slice(0, f.path.lastIndexOf("/") + 1) + h.path : y.path = h.path, y.path = a(y.path)), y.query = h.query) : (y.path = f.path, h.query !== void 0 ? y.query = h.query : y.query = f.query), y.userinfo = f.userinfo, y.host = f.host, y.port = f.port), y.scheme = f.scheme), y.fragment = h.fragment, y;
  }
  function i(f, h, u) {
    return typeof f == "string" ? (f = unescape(f), f = d(c(w(f, u), !0), { ...u, skipEscape: !0 })) : typeof f == "object" && (f = d(c(f, !0), { ...u, skipEscape: !0 })), typeof h == "string" ? (h = unescape(h), h = d(c(w(h, u), !0), { ...u, skipEscape: !0 })) : typeof h == "object" && (h = d(c(h, !0), { ...u, skipEscape: !0 })), f.toLowerCase() === h.toLowerCase();
  }
  function d(f, h) {
    const u = {
      host: f.host,
      scheme: f.scheme,
      userinfo: f.userinfo,
      port: f.port,
      path: f.path,
      query: f.query,
      nid: f.nid,
      nss: f.nss,
      uuid: f.uuid,
      fragment: f.fragment,
      reference: f.reference,
      resourceName: f.resourceName,
      secure: f.secure,
      error: ""
    }, m = Object.assign({}, h), y = [], v = s[(m.scheme || u.scheme || "").toLowerCase()];
    v && v.serialize && v.serialize(u, m), u.path !== void 0 && (m.skipEscape ? u.path = unescape(u.path) : (u.path = escape(u.path), u.scheme !== void 0 && (u.path = u.path.split("%3A").join(":")))), m.reference !== "suffix" && u.scheme && y.push(u.scheme, ":");
    const _ = n(u, m);
    if (_ !== void 0 && (m.reference !== "suffix" && y.push("//"), y.push(_), u.path && u.path.charAt(0) !== "/" && y.push("/")), u.path !== void 0) {
      let S = u.path;
      !m.absolutePath && (!v || !v.absolutePath) && (S = a(S)), _ === void 0 && (S = S.replace(/^\/\//u, "/%2F")), y.push(S);
    }
    return u.query !== void 0 && y.push("?", u.query), u.fragment !== void 0 && y.push("#", u.fragment), y.join("");
  }
  const E = Array.from({ length: 127 }, (f, h) => /[^!"$&'()*+,\-.;=_`a-z{}~]/u.test(String.fromCharCode(h)));
  function g(f) {
    let h = 0;
    for (let u = 0, m = f.length; u < m; ++u)
      if (h = f.charCodeAt(u), h > 126 || E[h])
        return !0;
    return !1;
  }
  const p = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
  function w(f, h) {
    const u = Object.assign({}, h), m = {
      scheme: void 0,
      userinfo: void 0,
      host: "",
      port: void 0,
      path: "",
      query: void 0,
      fragment: void 0
    }, y = f.indexOf("%") !== -1;
    let v = !1;
    u.reference === "suffix" && (f = (u.scheme ? u.scheme + ":" : "") + "//" + f);
    const _ = f.match(p);
    if (_) {
      if (m.scheme = _[1], m.userinfo = _[3], m.host = _[4], m.port = parseInt(_[5], 10), m.path = _[6] || "", m.query = _[7], m.fragment = _[8], isNaN(m.port) && (m.port = _[5]), m.host) {
        const $ = t(m.host);
        if ($.isIPV4 === !1) {
          const O = e($.host, { isIPV4: !1 });
          m.host = O.host.toLowerCase(), v = O.isIPV6;
        } else
          m.host = $.host, v = !0;
      }
      m.scheme === void 0 && m.userinfo === void 0 && m.host === void 0 && m.port === void 0 && !m.path && m.query === void 0 ? m.reference = "same-document" : m.scheme === void 0 ? m.reference = "relative" : m.fragment === void 0 ? m.reference = "absolute" : m.reference = "uri", u.reference && u.reference !== "suffix" && u.reference !== m.reference && (m.error = m.error || "URI is not a " + u.reference + " reference.");
      const S = s[(u.scheme || m.scheme || "").toLowerCase()];
      if (!u.unicodeSupport && (!S || !S.unicodeSupport) && m.host && (u.domainHost || S && S.domainHost) && v === !1 && g(m.host))
        try {
          m.host = URL.domainToASCII(m.host.toLowerCase());
        } catch ($) {
          m.error = m.error || "Host's domain name can not be converted to ASCII: " + $;
        }
      (!S || S && !S.skipNormalize) && (y && m.scheme !== void 0 && (m.scheme = unescape(m.scheme)), y && m.host !== void 0 && (m.host = unescape(m.host)), m.path !== void 0 && m.path.length && (m.path = escape(unescape(m.path))), m.fragment !== void 0 && m.fragment.length && (m.fragment = encodeURI(decodeURIComponent(m.fragment)))), S && S.parse && S.parse(m, u);
    } else
      m.error = m.error || "URI can not be parsed.";
    return m;
  }
  const b = {
    SCHEMES: s,
    normalize: r,
    resolve: l,
    resolveComponents: o,
    equal: i,
    serialize: d,
    parse: w
  };
  return Je.exports = b, Je.exports.default = b, Je.exports.fastUri = b, Je.exports;
}
var Fs;
function Fu() {
  if (Fs) return Ot;
  Fs = 1, Object.defineProperty(Ot, "__esModule", { value: !0 });
  const e = Au();
  return e.code = 'require("ajv/dist/runtime/uri").default', Ot.default = e, Ot;
}
var qs;
function qu() {
  return qs || (qs = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
    var t = Er();
    Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
      return t.KeywordCxt;
    } });
    var a = te();
    Object.defineProperty(e, "_", { enumerable: !0, get: function() {
      return a._;
    } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
      return a.str;
    } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
      return a.stringify;
    } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
      return a.nil;
    } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
      return a.Name;
    } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
      return a.CodeGen;
    } });
    const n = Ni(), c = gr(), s = Nc(), r = Pi(), l = te(), o = vr(), i = pr(), d = ne(), E = Tu, g = Fu(), p = (D, C) => new RegExp(D, C);
    p.code = "new RegExp";
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
    ]), f = {
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
    }, u = 200;
    function m(D) {
      var C, j, L, R, N, I, K, W, Q, J, P, q, M, F, G, Y, X, Se, me, pe, fe, Te, ye, Ke, le;
      const ce = D.strict, se = (C = D.code) === null || C === void 0 ? void 0 : C.optimize, re = se === !0 || se === void 0 ? 1 : se || 0, ge = (L = (j = D.code) === null || j === void 0 ? void 0 : j.regExp) !== null && L !== void 0 ? L : p, Gc = (R = D.uriResolver) !== null && R !== void 0 ? R : g.default;
      return {
        strictSchema: (I = (N = D.strictSchema) !== null && N !== void 0 ? N : ce) !== null && I !== void 0 ? I : !0,
        strictNumbers: (W = (K = D.strictNumbers) !== null && K !== void 0 ? K : ce) !== null && W !== void 0 ? W : !0,
        strictTypes: (J = (Q = D.strictTypes) !== null && Q !== void 0 ? Q : ce) !== null && J !== void 0 ? J : "log",
        strictTuples: (q = (P = D.strictTuples) !== null && P !== void 0 ? P : ce) !== null && q !== void 0 ? q : "log",
        strictRequired: (F = (M = D.strictRequired) !== null && M !== void 0 ? M : ce) !== null && F !== void 0 ? F : !1,
        code: D.code ? { ...D.code, optimize: re, regExp: ge } : { optimize: re, regExp: ge },
        loopRequired: (G = D.loopRequired) !== null && G !== void 0 ? G : u,
        loopEnum: (Y = D.loopEnum) !== null && Y !== void 0 ? Y : u,
        meta: (X = D.meta) !== null && X !== void 0 ? X : !0,
        messages: (Se = D.messages) !== null && Se !== void 0 ? Se : !0,
        inlineRefs: (me = D.inlineRefs) !== null && me !== void 0 ? me : !0,
        schemaId: (pe = D.schemaId) !== null && pe !== void 0 ? pe : "$id",
        addUsedSchema: (fe = D.addUsedSchema) !== null && fe !== void 0 ? fe : !0,
        validateSchema: (Te = D.validateSchema) !== null && Te !== void 0 ? Te : !0,
        validateFormats: (ye = D.validateFormats) !== null && ye !== void 0 ? ye : !0,
        unicodeRegExp: (Ke = D.unicodeRegExp) !== null && Ke !== void 0 ? Ke : !0,
        int32range: (le = D.int32range) !== null && le !== void 0 ? le : !0,
        uriResolver: Gc
      };
    }
    class y {
      constructor(C = {}) {
        this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), C = this.opts = { ...C, ...m(C) };
        const { es5: j, lines: L } = this.opts.code;
        this.scope = new l.ValueScope({ scope: {}, prefixes: b, es5: j, lines: L }), this.logger = H(C.logger);
        const R = C.validateFormats;
        C.validateFormats = !1, this.RULES = (0, s.getRules)(), v.call(this, f, C, "NOT SUPPORTED"), v.call(this, h, C, "DEPRECATED", "warn"), this._metaOpts = T.call(this), C.formats && $.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), C.keywords && O.call(this, C.keywords), typeof C.meta == "object" && this.addMetaSchema(C.meta), S.call(this), C.validateFormats = R;
      }
      _addVocabularies() {
        this.addKeyword("$async");
      }
      _addDefaultMetaSchema() {
        const { $data: C, meta: j, schemaId: L } = this.opts;
        let R = E;
        L === "id" && (R = { ...E }, R.id = R.$id, delete R.$id), j && C && this.addMetaSchema(R, R[L], !1);
      }
      defaultMeta() {
        const { meta: C, schemaId: j } = this.opts;
        return this.opts.defaultMeta = typeof C == "object" ? C[j] || C : void 0;
      }
      validate(C, j) {
        let L;
        if (typeof C == "string") {
          if (L = this.getSchema(C), !L)
            throw new Error(`no schema with key or ref "${C}"`);
        } else
          L = this.compile(C);
        const R = L(j);
        return "$async" in L || (this.errors = L.errors), R;
      }
      compile(C, j) {
        const L = this._addSchema(C, j);
        return L.validate || this._compileSchemaEnv(L);
      }
      compileAsync(C, j) {
        if (typeof this.opts.loadSchema != "function")
          throw new Error("options.loadSchema should be a function");
        const { loadSchema: L } = this.opts;
        return R.call(this, C, j);
        async function R(J, P) {
          await N.call(this, J.$schema);
          const q = this._addSchema(J, P);
          return q.validate || I.call(this, q);
        }
        async function N(J) {
          J && !this.getSchema(J) && await R.call(this, { $ref: J }, !0);
        }
        async function I(J) {
          try {
            return this._compileSchemaEnv(J);
          } catch (P) {
            if (!(P instanceof c.default))
              throw P;
            return K.call(this, P), await W.call(this, P.missingSchema), I.call(this, J);
          }
        }
        function K({ missingSchema: J, missingRef: P }) {
          if (this.refs[J])
            throw new Error(`AnySchema ${J} is loaded but ${P} cannot be resolved`);
        }
        async function W(J) {
          const P = await Q.call(this, J);
          this.refs[J] || await N.call(this, P.$schema), this.refs[J] || this.addSchema(P, J, j);
        }
        async function Q(J) {
          const P = this._loading[J];
          if (P)
            return P;
          try {
            return await (this._loading[J] = L(J));
          } finally {
            delete this._loading[J];
          }
        }
      }
      // Adds schema to the instance
      addSchema(C, j, L, R = this.opts.validateSchema) {
        if (Array.isArray(C)) {
          for (const I of C)
            this.addSchema(I, void 0, L, R);
          return this;
        }
        let N;
        if (typeof C == "object") {
          const { schemaId: I } = this.opts;
          if (N = C[I], N !== void 0 && typeof N != "string")
            throw new Error(`schema ${I} must be string`);
        }
        return j = (0, o.normalizeId)(j || N), this._checkUnique(j), this.schemas[j] = this._addSchema(C, L, j, R, !0), this;
      }
      // Add schema that will be used to validate other schemas
      // options in META_IGNORE_OPTIONS are alway set to false
      addMetaSchema(C, j, L = this.opts.validateSchema) {
        return this.addSchema(C, j, !0, L), this;
      }
      //  Validate schema against its meta-schema
      validateSchema(C, j) {
        if (typeof C == "boolean")
          return !0;
        let L;
        if (L = C.$schema, L !== void 0 && typeof L != "string")
          throw new Error("$schema must be a string");
        if (L = L || this.opts.defaultMeta || this.defaultMeta(), !L)
          return this.logger.warn("meta-schema not available"), this.errors = null, !0;
        const R = this.validate(L, C);
        if (!R && j) {
          const N = "schema is invalid: " + this.errorsText();
          if (this.opts.validateSchema === "log")
            this.logger.error(N);
          else
            throw new Error(N);
        }
        return R;
      }
      // Get compiled schema by `key` or `ref`.
      // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
      getSchema(C) {
        let j;
        for (; typeof (j = _.call(this, C)) == "string"; )
          C = j;
        if (j === void 0) {
          const { schemaId: L } = this.opts, R = new r.SchemaEnv({ schema: {}, schemaId: L });
          if (j = r.resolveSchema.call(this, R, C), !j)
            return;
          this.refs[C] = j;
        }
        return j.validate || this._compileSchemaEnv(j);
      }
      // Remove cached schema(s).
      // If no parameter is passed all schemas but meta-schemas are removed.
      // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
      // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
      removeSchema(C) {
        if (C instanceof RegExp)
          return this._removeAllSchemas(this.schemas, C), this._removeAllSchemas(this.refs, C), this;
        switch (typeof C) {
          case "undefined":
            return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
          case "string": {
            const j = _.call(this, C);
            return typeof j == "object" && this._cache.delete(j.schema), delete this.schemas[C], delete this.refs[C], this;
          }
          case "object": {
            const j = C;
            this._cache.delete(j);
            let L = C[this.opts.schemaId];
            return L && (L = (0, o.normalizeId)(L), delete this.schemas[L], delete this.refs[L]), this;
          }
          default:
            throw new Error("ajv.removeSchema: invalid parameter");
        }
      }
      // add "vocabulary" - a collection of keywords
      addVocabulary(C) {
        for (const j of C)
          this.addKeyword(j);
        return this;
      }
      addKeyword(C, j) {
        let L;
        if (typeof C == "string")
          L = C, typeof j == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), j.keyword = L);
        else if (typeof C == "object" && j === void 0) {
          if (j = C, L = j.keyword, Array.isArray(L) && !L.length)
            throw new Error("addKeywords: keyword must be string or non-empty array");
        } else
          throw new Error("invalid addKeywords parameters");
        if (z.call(this, L, j), !j)
          return (0, d.eachItem)(L, (N) => V.call(this, N)), this;
        B.call(this, j);
        const R = {
          ...j,
          type: (0, i.getJSONTypes)(j.type),
          schemaType: (0, i.getJSONTypes)(j.schemaType)
        };
        return (0, d.eachItem)(L, R.type.length === 0 ? (N) => V.call(this, N, R) : (N) => R.type.forEach((I) => V.call(this, N, R, I))), this;
      }
      getKeyword(C) {
        const j = this.RULES.all[C];
        return typeof j == "object" ? j.definition : !!j;
      }
      // Remove keyword
      removeKeyword(C) {
        const { RULES: j } = this;
        delete j.keywords[C], delete j.all[C];
        for (const L of j.rules) {
          const R = L.rules.findIndex((N) => N.keyword === C);
          R >= 0 && L.rules.splice(R, 1);
        }
        return this;
      }
      // Add format
      addFormat(C, j) {
        return typeof j == "string" && (j = new RegExp(j)), this.formats[C] = j, this;
      }
      errorsText(C = this.errors, { separator: j = ", ", dataVar: L = "data" } = {}) {
        return !C || C.length === 0 ? "No errors" : C.map((R) => `${L}${R.instancePath} ${R.message}`).reduce((R, N) => R + j + N);
      }
      $dataMetaSchema(C, j) {
        const L = this.RULES.all;
        C = JSON.parse(JSON.stringify(C));
        for (const R of j) {
          const N = R.split("/").slice(1);
          let I = C;
          for (const K of N)
            I = I[K];
          for (const K in L) {
            const W = L[K];
            if (typeof W != "object")
              continue;
            const { $data: Q } = W.definition, J = I[K];
            Q && J && (I[K] = x(J));
          }
        }
        return C;
      }
      _removeAllSchemas(C, j) {
        for (const L in C) {
          const R = C[L];
          (!j || j.test(L)) && (typeof R == "string" ? delete C[L] : R && !R.meta && (this._cache.delete(R.schema), delete C[L]));
        }
      }
      _addSchema(C, j, L, R = this.opts.validateSchema, N = this.opts.addUsedSchema) {
        let I;
        const { schemaId: K } = this.opts;
        if (typeof C == "object")
          I = C[K];
        else {
          if (this.opts.jtd)
            throw new Error("schema must be object");
          if (typeof C != "boolean")
            throw new Error("schema must be object or boolean");
        }
        let W = this._cache.get(C);
        if (W !== void 0)
          return W;
        L = (0, o.normalizeId)(I || L);
        const Q = o.getSchemaRefs.call(this, C, L);
        return W = new r.SchemaEnv({ schema: C, schemaId: K, meta: j, baseId: L, localRefs: Q }), this._cache.set(W.schema, W), N && !L.startsWith("#") && (L && this._checkUnique(L), this.refs[L] = W), R && this.validateSchema(C, !0), W;
      }
      _checkUnique(C) {
        if (this.schemas[C] || this.refs[C])
          throw new Error(`schema with key or id "${C}" already exists`);
      }
      _compileSchemaEnv(C) {
        if (C.meta ? this._compileMetaSchema(C) : r.compileSchema.call(this, C), !C.validate)
          throw new Error("ajv implementation error");
        return C.validate;
      }
      _compileMetaSchema(C) {
        const j = this.opts;
        this.opts = this._metaOpts;
        try {
          r.compileSchema.call(this, C);
        } finally {
          this.opts = j;
        }
      }
    }
    y.ValidationError = n.default, y.MissingRefError = c.default, e.default = y;
    function v(D, C, j, L = "error") {
      for (const R in D) {
        const N = R;
        N in C && this.logger[L](`${j}: option ${R}. ${D[N]}`);
      }
    }
    function _(D) {
      return D = (0, o.normalizeId)(D), this.schemas[D] || this.refs[D];
    }
    function S() {
      const D = this.opts.schemas;
      if (D)
        if (Array.isArray(D))
          this.addSchema(D);
        else
          for (const C in D)
            this.addSchema(D[C], C);
    }
    function $() {
      for (const D in this.opts.formats) {
        const C = this.opts.formats[D];
        C && this.addFormat(D, C);
      }
    }
    function O(D) {
      if (Array.isArray(D)) {
        this.addVocabulary(D);
        return;
      }
      this.logger.warn("keywords option as map is deprecated, pass array");
      for (const C in D) {
        const j = D[C];
        j.keyword || (j.keyword = C), this.addKeyword(j);
      }
    }
    function T() {
      const D = { ...this.opts };
      for (const C of w)
        delete D[C];
      return D;
    }
    const k = { log() {
    }, warn() {
    }, error() {
    } };
    function H(D) {
      if (D === !1)
        return k;
      if (D === void 0)
        return console;
      if (D.log && D.warn && D.error)
        return D;
      throw new Error("logger must implement log, warn and error methods");
    }
    const U = /^[a-z_$][a-z0-9_$:-]*$/i;
    function z(D, C) {
      const { RULES: j } = this;
      if ((0, d.eachItem)(D, (L) => {
        if (j.keywords[L])
          throw new Error(`Keyword ${L} is already defined`);
        if (!U.test(L))
          throw new Error(`Keyword ${L} has invalid name`);
      }), !!C && C.$data && !("code" in C || "validate" in C))
        throw new Error('$data keyword must have "code" or "validate" function');
    }
    function V(D, C, j) {
      var L;
      const R = C?.post;
      if (j && R)
        throw new Error('keyword with "post" flag cannot have "type"');
      const { RULES: N } = this;
      let I = R ? N.post : N.rules.find(({ type: W }) => W === j);
      if (I || (I = { type: j, rules: [] }, N.rules.push(I)), N.keywords[D] = !0, !C)
        return;
      const K = {
        keyword: D,
        definition: {
          ...C,
          type: (0, i.getJSONTypes)(C.type),
          schemaType: (0, i.getJSONTypes)(C.schemaType)
        }
      };
      C.before ? Z.call(this, I, K, C.before) : I.rules.push(K), N.all[D] = K, (L = C.implements) === null || L === void 0 || L.forEach((W) => this.addKeyword(W));
    }
    function Z(D, C, j) {
      const L = D.rules.findIndex((R) => R.keyword === j);
      L >= 0 ? D.rules.splice(L, 0, C) : (D.rules.push(C), this.logger.warn(`rule ${j} is not defined`));
    }
    function B(D) {
      let { metaSchema: C } = D;
      C !== void 0 && (D.$data && this.opts.$data && (C = x(C)), D.validateSchema = this.compile(C, !0));
    }
    const A = {
      $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
    };
    function x(D) {
      return { anyOf: [D, A] };
    }
  }(Tr)), Tr;
}
var It = {}, Nt = {}, Pt = {}, ks;
function ku() {
  if (ks) return Pt;
  ks = 1, Object.defineProperty(Pt, "__esModule", { value: !0 });
  const e = {
    keyword: "id",
    code() {
      throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
    }
  };
  return Pt.default = e, Pt;
}
var Ae = {}, js;
function ju() {
  if (js) return Ae;
  js = 1, Object.defineProperty(Ae, "__esModule", { value: !0 }), Ae.callRef = Ae.getValidate = void 0;
  const e = gr(), t = Oe(), a = te(), n = Fe(), c = Pi(), s = ne(), r = {
    keyword: "$ref",
    schemaType: "string",
    code(i) {
      const { gen: d, schema: E, it: g } = i, { baseId: p, schemaEnv: w, validateName: b, opts: f, self: h } = g, { root: u } = w;
      if ((E === "#" || E === "#/") && p === u.baseId)
        return y();
      const m = c.resolveRef.call(h, u, p, E);
      if (m === void 0)
        throw new e.default(g.opts.uriResolver, p, E);
      if (m instanceof c.SchemaEnv)
        return v(m);
      return _(m);
      function y() {
        if (w === u)
          return o(i, b, w, w.$async);
        const S = d.scopeValue("root", { ref: u });
        return o(i, (0, a._)`${S}.validate`, u, u.$async);
      }
      function v(S) {
        const $ = l(i, S);
        o(i, $, S, S.$async);
      }
      function _(S) {
        const $ = d.scopeValue("schema", f.code.source === !0 ? { ref: S, code: (0, a.stringify)(S) } : { ref: S }), O = d.name("valid"), T = i.subschema({
          schema: S,
          dataTypes: [],
          schemaPath: a.nil,
          topSchemaRef: $,
          errSchemaPath: E
        }, O);
        i.mergeEvaluated(T), i.ok(O);
      }
    }
  };
  function l(i, d) {
    const { gen: E } = i;
    return d.validate ? E.scopeValue("validate", { ref: d.validate }) : (0, a._)`${E.scopeValue("wrapper", { ref: d })}.validate`;
  }
  Ae.getValidate = l;
  function o(i, d, E, g) {
    const { gen: p, it: w } = i, { allErrors: b, schemaEnv: f, opts: h } = w, u = h.passContext ? n.default.this : a.nil;
    g ? m() : y();
    function m() {
      if (!f.$async)
        throw new Error("async schema referenced by sync schema");
      const S = p.let("valid");
      p.try(() => {
        p.code((0, a._)`await ${(0, t.callValidateCode)(i, d, u)}`), _(d), b || p.assign(S, !0);
      }, ($) => {
        p.if((0, a._)`!(${$} instanceof ${w.ValidationError})`, () => p.throw($)), v($), b || p.assign(S, !1);
      }), i.ok(S);
    }
    function y() {
      i.result((0, t.callValidateCode)(i, d, u), () => _(d), () => v(d));
    }
    function v(S) {
      const $ = (0, a._)`${S}.errors`;
      p.assign(n.default.vErrors, (0, a._)`${n.default.vErrors} === null ? ${$} : ${n.default.vErrors}.concat(${$})`), p.assign(n.default.errors, (0, a._)`${n.default.vErrors}.length`);
    }
    function _(S) {
      var $;
      if (!w.opts.unevaluated)
        return;
      const O = ($ = E?.validate) === null || $ === void 0 ? void 0 : $.evaluated;
      if (w.props !== !0)
        if (O && !O.dynamicProps)
          O.props !== void 0 && (w.props = s.mergeEvaluated.props(p, O.props, w.props));
        else {
          const T = p.var("props", (0, a._)`${S}.evaluated.props`);
          w.props = s.mergeEvaluated.props(p, T, w.props, a.Name);
        }
      if (w.items !== !0)
        if (O && !O.dynamicItems)
          O.items !== void 0 && (w.items = s.mergeEvaluated.items(p, O.items, w.items));
        else {
          const T = p.var("items", (0, a._)`${S}.evaluated.items`);
          w.items = s.mergeEvaluated.items(p, T, w.items, a.Name);
        }
    }
  }
  return Ae.callRef = o, Ae.default = r, Ae;
}
var Ms;
function Mu() {
  if (Ms) return Nt;
  Ms = 1, Object.defineProperty(Nt, "__esModule", { value: !0 });
  const e = ku(), t = ju(), a = [
    "$schema",
    "$id",
    "$defs",
    "$vocabulary",
    { keyword: "$comment" },
    "definitions",
    e.default,
    t.default
  ];
  return Nt.default = a, Nt;
}
var Tt = {}, Ct = {}, xs;
function xu() {
  if (xs) return Ct;
  xs = 1, Object.defineProperty(Ct, "__esModule", { value: !0 });
  const e = te(), t = e.operators, a = {
    maximum: { okStr: "<=", ok: t.LTE, fail: t.GT },
    minimum: { okStr: ">=", ok: t.GTE, fail: t.LT },
    exclusiveMaximum: { okStr: "<", ok: t.LT, fail: t.GTE },
    exclusiveMinimum: { okStr: ">", ok: t.GT, fail: t.LTE }
  }, n = {
    message: ({ keyword: s, schemaCode: r }) => (0, e.str)`must be ${a[s].okStr} ${r}`,
    params: ({ keyword: s, schemaCode: r }) => (0, e._)`{comparison: ${a[s].okStr}, limit: ${r}}`
  }, c = {
    keyword: Object.keys(a),
    type: "number",
    schemaType: "number",
    $data: !0,
    error: n,
    code(s) {
      const { keyword: r, data: l, schemaCode: o } = s;
      s.fail$data((0, e._)`${l} ${a[r].fail} ${o} || isNaN(${l})`);
    }
  };
  return Ct.default = c, Ct;
}
var Dt = {}, Us;
function Uu() {
  if (Us) return Dt;
  Us = 1, Object.defineProperty(Dt, "__esModule", { value: !0 });
  const e = te(), a = {
    keyword: "multipleOf",
    type: "number",
    schemaType: "number",
    $data: !0,
    error: {
      message: ({ schemaCode: n }) => (0, e.str)`must be multiple of ${n}`,
      params: ({ schemaCode: n }) => (0, e._)`{multipleOf: ${n}}`
    },
    code(n) {
      const { gen: c, data: s, schemaCode: r, it: l } = n, o = l.opts.multipleOfPrecision, i = c.let("res"), d = o ? (0, e._)`Math.abs(Math.round(${i}) - ${i}) > 1e-${o}` : (0, e._)`${i} !== parseInt(${i})`;
      n.fail$data((0, e._)`(${r} === 0 || (${i} = ${s}/${r}, ${d}))`);
    }
  };
  return Dt.default = a, Dt;
}
var Lt = {}, At = {}, zs;
function zu() {
  if (zs) return At;
  zs = 1, Object.defineProperty(At, "__esModule", { value: !0 });
  function e(t) {
    const a = t.length;
    let n = 0, c = 0, s;
    for (; c < a; )
      n++, s = t.charCodeAt(c++), s >= 55296 && s <= 56319 && c < a && (s = t.charCodeAt(c), (s & 64512) === 56320 && c++);
    return n;
  }
  return At.default = e, e.code = 'require("ajv/dist/runtime/ucs2length").default', At;
}
var Vs;
function Vu() {
  if (Vs) return Lt;
  Vs = 1, Object.defineProperty(Lt, "__esModule", { value: !0 });
  const e = te(), t = ne(), a = zu(), c = {
    keyword: ["maxLength", "minLength"],
    type: "string",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: s, schemaCode: r }) {
        const l = s === "maxLength" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${l} than ${r} characters`;
      },
      params: ({ schemaCode: s }) => (0, e._)`{limit: ${s}}`
    },
    code(s) {
      const { keyword: r, data: l, schemaCode: o, it: i } = s, d = r === "maxLength" ? e.operators.GT : e.operators.LT, E = i.opts.unicode === !1 ? (0, e._)`${l}.length` : (0, e._)`${(0, t.useFunc)(s.gen, a.default)}(${l})`;
      s.fail$data((0, e._)`${E} ${d} ${o}`);
    }
  };
  return Lt.default = c, Lt;
}
var Ft = {}, Gs;
function Gu() {
  if (Gs) return Ft;
  Gs = 1, Object.defineProperty(Ft, "__esModule", { value: !0 });
  const e = Oe(), t = te(), n = {
    keyword: "pattern",
    type: "string",
    schemaType: "string",
    $data: !0,
    error: {
      message: ({ schemaCode: c }) => (0, t.str)`must match pattern "${c}"`,
      params: ({ schemaCode: c }) => (0, t._)`{pattern: ${c}}`
    },
    code(c) {
      const { data: s, $data: r, schema: l, schemaCode: o, it: i } = c, d = i.opts.unicodeRegExp ? "u" : "", E = r ? (0, t._)`(new RegExp(${o}, ${d}))` : (0, e.usePattern)(c, l);
      c.fail$data((0, t._)`!${E}.test(${s})`);
    }
  };
  return Ft.default = n, Ft;
}
var qt = {}, Bs;
function Bu() {
  if (Bs) return qt;
  Bs = 1, Object.defineProperty(qt, "__esModule", { value: !0 });
  const e = te(), a = {
    keyword: ["maxProperties", "minProperties"],
    type: "object",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: n, schemaCode: c }) {
        const s = n === "maxProperties" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${s} than ${c} properties`;
      },
      params: ({ schemaCode: n }) => (0, e._)`{limit: ${n}}`
    },
    code(n) {
      const { keyword: c, data: s, schemaCode: r } = n, l = c === "maxProperties" ? e.operators.GT : e.operators.LT;
      n.fail$data((0, e._)`Object.keys(${s}).length ${l} ${r}`);
    }
  };
  return qt.default = a, qt;
}
var kt = {}, Hs;
function Hu() {
  if (Hs) return kt;
  Hs = 1, Object.defineProperty(kt, "__esModule", { value: !0 });
  const e = Oe(), t = te(), a = ne(), c = {
    keyword: "required",
    type: "object",
    schemaType: "array",
    $data: !0,
    error: {
      message: ({ params: { missingProperty: s } }) => (0, t.str)`must have required property '${s}'`,
      params: ({ params: { missingProperty: s } }) => (0, t._)`{missingProperty: ${s}}`
    },
    code(s) {
      const { gen: r, schema: l, schemaCode: o, data: i, $data: d, it: E } = s, { opts: g } = E;
      if (!d && l.length === 0)
        return;
      const p = l.length >= g.loopRequired;
      if (E.allErrors ? w() : b(), g.strictRequired) {
        const u = s.parentSchema.properties, { definedProperties: m } = s.it;
        for (const y of l)
          if (u?.[y] === void 0 && !m.has(y)) {
            const v = E.schemaEnv.baseId + E.errSchemaPath, _ = `required property "${y}" is not defined at "${v}" (strictRequired)`;
            (0, a.checkStrictMode)(E, _, E.opts.strictRequired);
          }
      }
      function w() {
        if (p || d)
          s.block$data(t.nil, f);
        else
          for (const u of l)
            (0, e.checkReportMissingProp)(s, u);
      }
      function b() {
        const u = r.let("missing");
        if (p || d) {
          const m = r.let("valid", !0);
          s.block$data(m, () => h(u, m)), s.ok(m);
        } else
          r.if((0, e.checkMissingProp)(s, l, u)), (0, e.reportMissingProp)(s, u), r.else();
      }
      function f() {
        r.forOf("prop", o, (u) => {
          s.setParams({ missingProperty: u }), r.if((0, e.noPropertyInData)(r, i, u, g.ownProperties), () => s.error());
        });
      }
      function h(u, m) {
        s.setParams({ missingProperty: u }), r.forOf(u, o, () => {
          r.assign(m, (0, e.propertyInData)(r, i, u, g.ownProperties)), r.if((0, t.not)(m), () => {
            s.error(), r.break();
          });
        }, t.nil);
      }
    }
  };
  return kt.default = c, kt;
}
var jt = {}, Ws;
function Wu() {
  if (Ws) return jt;
  Ws = 1, Object.defineProperty(jt, "__esModule", { value: !0 });
  const e = te(), a = {
    keyword: ["maxItems", "minItems"],
    type: "array",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: n, schemaCode: c }) {
        const s = n === "maxItems" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${s} than ${c} items`;
      },
      params: ({ schemaCode: n }) => (0, e._)`{limit: ${n}}`
    },
    code(n) {
      const { keyword: c, data: s, schemaCode: r } = n, l = c === "maxItems" ? e.operators.GT : e.operators.LT;
      n.fail$data((0, e._)`${s}.length ${l} ${r}`);
    }
  };
  return jt.default = a, jt;
}
var Mt = {}, xt = {}, Ks;
function Ti() {
  if (Ks) return xt;
  Ks = 1, Object.defineProperty(xt, "__esModule", { value: !0 });
  const e = Tc();
  return e.code = 'require("ajv/dist/runtime/equal").default', xt.default = e, xt;
}
var Xs;
function Ku() {
  if (Xs) return Mt;
  Xs = 1, Object.defineProperty(Mt, "__esModule", { value: !0 });
  const e = pr(), t = te(), a = ne(), n = Ti(), s = {
    keyword: "uniqueItems",
    type: "array",
    schemaType: "boolean",
    $data: !0,
    error: {
      message: ({ params: { i: r, j: l } }) => (0, t.str)`must NOT have duplicate items (items ## ${l} and ${r} are identical)`,
      params: ({ params: { i: r, j: l } }) => (0, t._)`{i: ${r}, j: ${l}}`
    },
    code(r) {
      const { gen: l, data: o, $data: i, schema: d, parentSchema: E, schemaCode: g, it: p } = r;
      if (!i && !d)
        return;
      const w = l.let("valid"), b = E.items ? (0, e.getSchemaTypes)(E.items) : [];
      r.block$data(w, f, (0, t._)`${g} === false`), r.ok(w);
      function f() {
        const y = l.let("i", (0, t._)`${o}.length`), v = l.let("j");
        r.setParams({ i: y, j: v }), l.assign(w, !0), l.if((0, t._)`${y} > 1`, () => (h() ? u : m)(y, v));
      }
      function h() {
        return b.length > 0 && !b.some((y) => y === "object" || y === "array");
      }
      function u(y, v) {
        const _ = l.name("item"), S = (0, e.checkDataTypes)(b, _, p.opts.strictNumbers, e.DataType.Wrong), $ = l.const("indices", (0, t._)`{}`);
        l.for((0, t._)`;${y}--;`, () => {
          l.let(_, (0, t._)`${o}[${y}]`), l.if(S, (0, t._)`continue`), b.length > 1 && l.if((0, t._)`typeof ${_} == "string"`, (0, t._)`${_} += "_"`), l.if((0, t._)`typeof ${$}[${_}] == "number"`, () => {
            l.assign(v, (0, t._)`${$}[${_}]`), r.error(), l.assign(w, !1).break();
          }).code((0, t._)`${$}[${_}] = ${y}`);
        });
      }
      function m(y, v) {
        const _ = (0, a.useFunc)(l, n.default), S = l.name("outer");
        l.label(S).for((0, t._)`;${y}--;`, () => l.for((0, t._)`${v} = ${y}; ${v}--;`, () => l.if((0, t._)`${_}(${o}[${y}], ${o}[${v}])`, () => {
          r.error(), l.assign(w, !1).break(S);
        })));
      }
    }
  };
  return Mt.default = s, Mt;
}
var Ut = {}, Zs;
function Xu() {
  if (Zs) return Ut;
  Zs = 1, Object.defineProperty(Ut, "__esModule", { value: !0 });
  const e = te(), t = ne(), a = Ti(), c = {
    keyword: "const",
    $data: !0,
    error: {
      message: "must be equal to constant",
      params: ({ schemaCode: s }) => (0, e._)`{allowedValue: ${s}}`
    },
    code(s) {
      const { gen: r, data: l, $data: o, schemaCode: i, schema: d } = s;
      o || d && typeof d == "object" ? s.fail$data((0, e._)`!${(0, t.useFunc)(r, a.default)}(${l}, ${i})`) : s.fail((0, e._)`${d} !== ${l}`);
    }
  };
  return Ut.default = c, Ut;
}
var zt = {}, Js;
function Zu() {
  if (Js) return zt;
  Js = 1, Object.defineProperty(zt, "__esModule", { value: !0 });
  const e = te(), t = ne(), a = Ti(), c = {
    keyword: "enum",
    schemaType: "array",
    $data: !0,
    error: {
      message: "must be equal to one of the allowed values",
      params: ({ schemaCode: s }) => (0, e._)`{allowedValues: ${s}}`
    },
    code(s) {
      const { gen: r, data: l, $data: o, schema: i, schemaCode: d, it: E } = s;
      if (!o && i.length === 0)
        throw new Error("enum must have non-empty array");
      const g = i.length >= E.opts.loopEnum;
      let p;
      const w = () => p ?? (p = (0, t.useFunc)(r, a.default));
      let b;
      if (g || o)
        b = r.let("valid"), s.block$data(b, f);
      else {
        if (!Array.isArray(i))
          throw new Error("ajv implementation error");
        const u = r.const("vSchema", d);
        b = (0, e.or)(...i.map((m, y) => h(u, y)));
      }
      s.pass(b);
      function f() {
        r.assign(b, !1), r.forOf("v", d, (u) => r.if((0, e._)`${w()}(${l}, ${u})`, () => r.assign(b, !0).break()));
      }
      function h(u, m) {
        const y = i[m];
        return typeof y == "object" && y !== null ? (0, e._)`${w()}(${l}, ${u}[${m}])` : (0, e._)`${l} === ${y}`;
      }
    }
  };
  return zt.default = c, zt;
}
var Ys;
function Ju() {
  if (Ys) return Tt;
  Ys = 1, Object.defineProperty(Tt, "__esModule", { value: !0 });
  const e = xu(), t = Uu(), a = Vu(), n = Gu(), c = Bu(), s = Hu(), r = Wu(), l = Ku(), o = Xu(), i = Zu(), d = [
    // number
    e.default,
    t.default,
    // string
    a.default,
    n.default,
    // object
    c.default,
    s.default,
    // array
    r.default,
    l.default,
    // any
    { keyword: "type", schemaType: ["string", "array"] },
    { keyword: "nullable", schemaType: "boolean" },
    o.default,
    i.default
  ];
  return Tt.default = d, Tt;
}
var Vt = {}, Ve = {}, Qs;
function Cc() {
  if (Qs) return Ve;
  Qs = 1, Object.defineProperty(Ve, "__esModule", { value: !0 }), Ve.validateAdditionalItems = void 0;
  const e = te(), t = ne(), n = {
    keyword: "additionalItems",
    type: "array",
    schemaType: ["boolean", "object"],
    before: "uniqueItems",
    error: {
      message: ({ params: { len: s } }) => (0, e.str)`must NOT have more than ${s} items`,
      params: ({ params: { len: s } }) => (0, e._)`{limit: ${s}}`
    },
    code(s) {
      const { parentSchema: r, it: l } = s, { items: o } = r;
      if (!Array.isArray(o)) {
        (0, t.checkStrictMode)(l, '"additionalItems" is ignored when "items" is not an array of schemas');
        return;
      }
      c(s, o);
    }
  };
  function c(s, r) {
    const { gen: l, schema: o, data: i, keyword: d, it: E } = s;
    E.items = !0;
    const g = l.const("len", (0, e._)`${i}.length`);
    if (o === !1)
      s.setParams({ len: r.length }), s.pass((0, e._)`${g} <= ${r.length}`);
    else if (typeof o == "object" && !(0, t.alwaysValidSchema)(E, o)) {
      const w = l.var("valid", (0, e._)`${g} <= ${r.length}`);
      l.if((0, e.not)(w), () => p(w)), s.ok(w);
    }
    function p(w) {
      l.forRange("i", r.length, g, (b) => {
        s.subschema({ keyword: d, dataProp: b, dataPropType: t.Type.Num }, w), E.allErrors || l.if((0, e.not)(w), () => l.break());
      });
    }
  }
  return Ve.validateAdditionalItems = c, Ve.default = n, Ve;
}
var Gt = {}, Ge = {}, eo;
function Dc() {
  if (eo) return Ge;
  eo = 1, Object.defineProperty(Ge, "__esModule", { value: !0 }), Ge.validateTuple = void 0;
  const e = te(), t = ne(), a = Oe(), n = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "array", "boolean"],
    before: "uniqueItems",
    code(s) {
      const { schema: r, it: l } = s;
      if (Array.isArray(r))
        return c(s, "additionalItems", r);
      l.items = !0, !(0, t.alwaysValidSchema)(l, r) && s.ok((0, a.validateArray)(s));
    }
  };
  function c(s, r, l = s.schema) {
    const { gen: o, parentSchema: i, data: d, keyword: E, it: g } = s;
    b(i), g.opts.unevaluated && l.length && g.items !== !0 && (g.items = t.mergeEvaluated.items(o, l.length, g.items));
    const p = o.name("valid"), w = o.const("len", (0, e._)`${d}.length`);
    l.forEach((f, h) => {
      (0, t.alwaysValidSchema)(g, f) || (o.if((0, e._)`${w} > ${h}`, () => s.subschema({
        keyword: E,
        schemaProp: h,
        dataProp: h
      }, p)), s.ok(p));
    });
    function b(f) {
      const { opts: h, errSchemaPath: u } = g, m = l.length, y = m === f.minItems && (m === f.maxItems || f[r] === !1);
      if (h.strictTuples && !y) {
        const v = `"${E}" is ${m}-tuple, but minItems or maxItems/${r} are not specified or different at path "${u}"`;
        (0, t.checkStrictMode)(g, v, h.strictTuples);
      }
    }
  }
  return Ge.validateTuple = c, Ge.default = n, Ge;
}
var to;
function Yu() {
  if (to) return Gt;
  to = 1, Object.defineProperty(Gt, "__esModule", { value: !0 });
  const e = Dc(), t = {
    keyword: "prefixItems",
    type: "array",
    schemaType: ["array"],
    before: "uniqueItems",
    code: (a) => (0, e.validateTuple)(a, "items")
  };
  return Gt.default = t, Gt;
}
var Bt = {}, ro;
function Qu() {
  if (ro) return Bt;
  ro = 1, Object.defineProperty(Bt, "__esModule", { value: !0 });
  const e = te(), t = ne(), a = Oe(), n = Cc(), s = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    error: {
      message: ({ params: { len: r } }) => (0, e.str)`must NOT have more than ${r} items`,
      params: ({ params: { len: r } }) => (0, e._)`{limit: ${r}}`
    },
    code(r) {
      const { schema: l, parentSchema: o, it: i } = r, { prefixItems: d } = o;
      i.items = !0, !(0, t.alwaysValidSchema)(i, l) && (d ? (0, n.validateAdditionalItems)(r, d) : r.ok((0, a.validateArray)(r)));
    }
  };
  return Bt.default = s, Bt;
}
var Ht = {}, no;
function ef() {
  if (no) return Ht;
  no = 1, Object.defineProperty(Ht, "__esModule", { value: !0 });
  const e = te(), t = ne(), n = {
    keyword: "contains",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    trackErrors: !0,
    error: {
      message: ({ params: { min: c, max: s } }) => s === void 0 ? (0, e.str)`must contain at least ${c} valid item(s)` : (0, e.str)`must contain at least ${c} and no more than ${s} valid item(s)`,
      params: ({ params: { min: c, max: s } }) => s === void 0 ? (0, e._)`{minContains: ${c}}` : (0, e._)`{minContains: ${c}, maxContains: ${s}}`
    },
    code(c) {
      const { gen: s, schema: r, parentSchema: l, data: o, it: i } = c;
      let d, E;
      const { minContains: g, maxContains: p } = l;
      i.opts.next ? (d = g === void 0 ? 1 : g, E = p) : d = 1;
      const w = s.const("len", (0, e._)`${o}.length`);
      if (c.setParams({ min: d, max: E }), E === void 0 && d === 0) {
        (0, t.checkStrictMode)(i, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
        return;
      }
      if (E !== void 0 && d > E) {
        (0, t.checkStrictMode)(i, '"minContains" > "maxContains" is always invalid'), c.fail();
        return;
      }
      if ((0, t.alwaysValidSchema)(i, r)) {
        let m = (0, e._)`${w} >= ${d}`;
        E !== void 0 && (m = (0, e._)`${m} && ${w} <= ${E}`), c.pass(m);
        return;
      }
      i.items = !0;
      const b = s.name("valid");
      E === void 0 && d === 1 ? h(b, () => s.if(b, () => s.break())) : d === 0 ? (s.let(b, !0), E !== void 0 && s.if((0, e._)`${o}.length > 0`, f)) : (s.let(b, !1), f()), c.result(b, () => c.reset());
      function f() {
        const m = s.name("_valid"), y = s.let("count", 0);
        h(m, () => s.if(m, () => u(y)));
      }
      function h(m, y) {
        s.forRange("i", 0, w, (v) => {
          c.subschema({
            keyword: "contains",
            dataProp: v,
            dataPropType: t.Type.Num,
            compositeRule: !0
          }, m), y();
        });
      }
      function u(m) {
        s.code((0, e._)`${m}++`), E === void 0 ? s.if((0, e._)`${m} >= ${d}`, () => s.assign(b, !0).break()) : (s.if((0, e._)`${m} > ${E}`, () => s.assign(b, !1).break()), d === 1 ? s.assign(b, !0) : s.if((0, e._)`${m} >= ${d}`, () => s.assign(b, !0)));
      }
    }
  };
  return Ht.default = n, Ht;
}
var xr = {}, io;
function tf() {
  return io || (io = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
    const t = te(), a = ne(), n = Oe();
    e.error = {
      message: ({ params: { property: o, depsCount: i, deps: d } }) => {
        const E = i === 1 ? "property" : "properties";
        return (0, t.str)`must have ${E} ${d} when property ${o} is present`;
      },
      params: ({ params: { property: o, depsCount: i, deps: d, missingProperty: E } }) => (0, t._)`{property: ${o},
    missingProperty: ${E},
    depsCount: ${i},
    deps: ${d}}`
      // TODO change to reference
    };
    const c = {
      keyword: "dependencies",
      type: "object",
      schemaType: "object",
      error: e.error,
      code(o) {
        const [i, d] = s(o);
        r(o, i), l(o, d);
      }
    };
    function s({ schema: o }) {
      const i = {}, d = {};
      for (const E in o) {
        if (E === "__proto__")
          continue;
        const g = Array.isArray(o[E]) ? i : d;
        g[E] = o[E];
      }
      return [i, d];
    }
    function r(o, i = o.schema) {
      const { gen: d, data: E, it: g } = o;
      if (Object.keys(i).length === 0)
        return;
      const p = d.let("missing");
      for (const w in i) {
        const b = i[w];
        if (b.length === 0)
          continue;
        const f = (0, n.propertyInData)(d, E, w, g.opts.ownProperties);
        o.setParams({
          property: w,
          depsCount: b.length,
          deps: b.join(", ")
        }), g.allErrors ? d.if(f, () => {
          for (const h of b)
            (0, n.checkReportMissingProp)(o, h);
        }) : (d.if((0, t._)`${f} && (${(0, n.checkMissingProp)(o, b, p)})`), (0, n.reportMissingProp)(o, p), d.else());
      }
    }
    e.validatePropertyDeps = r;
    function l(o, i = o.schema) {
      const { gen: d, data: E, keyword: g, it: p } = o, w = d.name("valid");
      for (const b in i)
        (0, a.alwaysValidSchema)(p, i[b]) || (d.if(
          (0, n.propertyInData)(d, E, b, p.opts.ownProperties),
          () => {
            const f = o.subschema({ keyword: g, schemaProp: b }, w);
            o.mergeValidEvaluated(f, w);
          },
          () => d.var(w, !0)
          // TODO var
        ), o.ok(w));
    }
    e.validateSchemaDeps = l, e.default = c;
  }(xr)), xr;
}
var Wt = {}, so;
function rf() {
  if (so) return Wt;
  so = 1, Object.defineProperty(Wt, "__esModule", { value: !0 });
  const e = te(), t = ne(), n = {
    keyword: "propertyNames",
    type: "object",
    schemaType: ["object", "boolean"],
    error: {
      message: "property name must be valid",
      params: ({ params: c }) => (0, e._)`{propertyName: ${c.propertyName}}`
    },
    code(c) {
      const { gen: s, schema: r, data: l, it: o } = c;
      if ((0, t.alwaysValidSchema)(o, r))
        return;
      const i = s.name("valid");
      s.forIn("key", l, (d) => {
        c.setParams({ propertyName: d }), c.subschema({
          keyword: "propertyNames",
          data: d,
          dataTypes: ["string"],
          propertyName: d,
          compositeRule: !0
        }, i), s.if((0, e.not)(i), () => {
          c.error(!0), o.allErrors || s.break();
        });
      }), c.ok(i);
    }
  };
  return Wt.default = n, Wt;
}
var Kt = {}, oo;
function Lc() {
  if (oo) return Kt;
  oo = 1, Object.defineProperty(Kt, "__esModule", { value: !0 });
  const e = Oe(), t = te(), a = Fe(), n = ne(), s = {
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
      const { gen: l, schema: o, parentSchema: i, data: d, errsCount: E, it: g } = r;
      if (!E)
        throw new Error("ajv implementation error");
      const { allErrors: p, opts: w } = g;
      if (g.props = !0, w.removeAdditional !== "all" && (0, n.alwaysValidSchema)(g, o))
        return;
      const b = (0, e.allSchemaProperties)(i.properties), f = (0, e.allSchemaProperties)(i.patternProperties);
      h(), r.ok((0, t._)`${E} === ${a.default.errors}`);
      function h() {
        l.forIn("key", d, (_) => {
          !b.length && !f.length ? y(_) : l.if(u(_), () => y(_));
        });
      }
      function u(_) {
        let S;
        if (b.length > 8) {
          const $ = (0, n.schemaRefOrVal)(g, i.properties, "properties");
          S = (0, e.isOwnProperty)(l, $, _);
        } else b.length ? S = (0, t.or)(...b.map(($) => (0, t._)`${_} === ${$}`)) : S = t.nil;
        return f.length && (S = (0, t.or)(S, ...f.map(($) => (0, t._)`${(0, e.usePattern)(r, $)}.test(${_})`))), (0, t.not)(S);
      }
      function m(_) {
        l.code((0, t._)`delete ${d}[${_}]`);
      }
      function y(_) {
        if (w.removeAdditional === "all" || w.removeAdditional && o === !1) {
          m(_);
          return;
        }
        if (o === !1) {
          r.setParams({ additionalProperty: _ }), r.error(), p || l.break();
          return;
        }
        if (typeof o == "object" && !(0, n.alwaysValidSchema)(g, o)) {
          const S = l.name("valid");
          w.removeAdditional === "failing" ? (v(_, S, !1), l.if((0, t.not)(S), () => {
            r.reset(), m(_);
          })) : (v(_, S), p || l.if((0, t.not)(S), () => l.break()));
        }
      }
      function v(_, S, $) {
        const O = {
          keyword: "additionalProperties",
          dataProp: _,
          dataPropType: n.Type.Str
        };
        $ === !1 && Object.assign(O, {
          compositeRule: !0,
          createErrors: !1,
          allErrors: !1
        }), r.subschema(O, S);
      }
    }
  };
  return Kt.default = s, Kt;
}
var Xt = {}, ao;
function nf() {
  if (ao) return Xt;
  ao = 1, Object.defineProperty(Xt, "__esModule", { value: !0 });
  const e = Er(), t = Oe(), a = ne(), n = Lc(), c = {
    keyword: "properties",
    type: "object",
    schemaType: "object",
    code(s) {
      const { gen: r, schema: l, parentSchema: o, data: i, it: d } = s;
      d.opts.removeAdditional === "all" && o.additionalProperties === void 0 && n.default.code(new e.KeywordCxt(d, n.default, "additionalProperties"));
      const E = (0, t.allSchemaProperties)(l);
      for (const f of E)
        d.definedProperties.add(f);
      d.opts.unevaluated && E.length && d.props !== !0 && (d.props = a.mergeEvaluated.props(r, (0, a.toHash)(E), d.props));
      const g = E.filter((f) => !(0, a.alwaysValidSchema)(d, l[f]));
      if (g.length === 0)
        return;
      const p = r.name("valid");
      for (const f of g)
        w(f) ? b(f) : (r.if((0, t.propertyInData)(r, i, f, d.opts.ownProperties)), b(f), d.allErrors || r.else().var(p, !0), r.endIf()), s.it.definedProperties.add(f), s.ok(p);
      function w(f) {
        return d.opts.useDefaults && !d.compositeRule && l[f].default !== void 0;
      }
      function b(f) {
        s.subschema({
          keyword: "properties",
          schemaProp: f,
          dataProp: f
        }, p);
      }
    }
  };
  return Xt.default = c, Xt;
}
var Zt = {}, co;
function sf() {
  if (co) return Zt;
  co = 1, Object.defineProperty(Zt, "__esModule", { value: !0 });
  const e = Oe(), t = te(), a = ne(), n = ne(), c = {
    keyword: "patternProperties",
    type: "object",
    schemaType: "object",
    code(s) {
      const { gen: r, schema: l, data: o, parentSchema: i, it: d } = s, { opts: E } = d, g = (0, e.allSchemaProperties)(l), p = g.filter((y) => (0, a.alwaysValidSchema)(d, l[y]));
      if (g.length === 0 || p.length === g.length && (!d.opts.unevaluated || d.props === !0))
        return;
      const w = E.strictSchema && !E.allowMatchingProperties && i.properties, b = r.name("valid");
      d.props !== !0 && !(d.props instanceof t.Name) && (d.props = (0, n.evaluatedPropsToName)(r, d.props));
      const { props: f } = d;
      h();
      function h() {
        for (const y of g)
          w && u(y), d.allErrors ? m(y) : (r.var(b, !0), m(y), r.if(b));
      }
      function u(y) {
        for (const v in w)
          new RegExp(y).test(v) && (0, a.checkStrictMode)(d, `property ${v} matches pattern ${y} (use allowMatchingProperties)`);
      }
      function m(y) {
        r.forIn("key", o, (v) => {
          r.if((0, t._)`${(0, e.usePattern)(s, y)}.test(${v})`, () => {
            const _ = p.includes(y);
            _ || s.subschema({
              keyword: "patternProperties",
              schemaProp: y,
              dataProp: v,
              dataPropType: n.Type.Str
            }, b), d.opts.unevaluated && f !== !0 ? r.assign((0, t._)`${f}[${v}]`, !0) : !_ && !d.allErrors && r.if((0, t.not)(b), () => r.break());
          });
        });
      }
    }
  };
  return Zt.default = c, Zt;
}
var Jt = {}, uo;
function of() {
  if (uo) return Jt;
  uo = 1, Object.defineProperty(Jt, "__esModule", { value: !0 });
  const e = ne(), t = {
    keyword: "not",
    schemaType: ["object", "boolean"],
    trackErrors: !0,
    code(a) {
      const { gen: n, schema: c, it: s } = a;
      if ((0, e.alwaysValidSchema)(s, c)) {
        a.fail();
        return;
      }
      const r = n.name("valid");
      a.subschema({
        keyword: "not",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, r), a.failResult(r, () => a.reset(), () => a.error());
    },
    error: { message: "must NOT be valid" }
  };
  return Jt.default = t, Jt;
}
var Yt = {}, fo;
function af() {
  if (fo) return Yt;
  fo = 1, Object.defineProperty(Yt, "__esModule", { value: !0 });
  const t = {
    keyword: "anyOf",
    schemaType: "array",
    trackErrors: !0,
    code: Oe().validateUnion,
    error: { message: "must match a schema in anyOf" }
  };
  return Yt.default = t, Yt;
}
var Qt = {}, lo;
function cf() {
  if (lo) return Qt;
  lo = 1, Object.defineProperty(Qt, "__esModule", { value: !0 });
  const e = te(), t = ne(), n = {
    keyword: "oneOf",
    schemaType: "array",
    trackErrors: !0,
    error: {
      message: "must match exactly one schema in oneOf",
      params: ({ params: c }) => (0, e._)`{passingSchemas: ${c.passing}}`
    },
    code(c) {
      const { gen: s, schema: r, parentSchema: l, it: o } = c;
      if (!Array.isArray(r))
        throw new Error("ajv implementation error");
      if (o.opts.discriminator && l.discriminator)
        return;
      const i = r, d = s.let("valid", !1), E = s.let("passing", null), g = s.name("_valid");
      c.setParams({ passing: E }), s.block(p), c.result(d, () => c.reset(), () => c.error(!0));
      function p() {
        i.forEach((w, b) => {
          let f;
          (0, t.alwaysValidSchema)(o, w) ? s.var(g, !0) : f = c.subschema({
            keyword: "oneOf",
            schemaProp: b,
            compositeRule: !0
          }, g), b > 0 && s.if((0, e._)`${g} && ${d}`).assign(d, !1).assign(E, (0, e._)`[${E}, ${b}]`).else(), s.if(g, () => {
            s.assign(d, !0), s.assign(E, b), f && c.mergeEvaluated(f, e.Name);
          });
        });
      }
    }
  };
  return Qt.default = n, Qt;
}
var er = {}, ho;
function uf() {
  if (ho) return er;
  ho = 1, Object.defineProperty(er, "__esModule", { value: !0 });
  const e = ne(), t = {
    keyword: "allOf",
    schemaType: "array",
    code(a) {
      const { gen: n, schema: c, it: s } = a;
      if (!Array.isArray(c))
        throw new Error("ajv implementation error");
      const r = n.name("valid");
      c.forEach((l, o) => {
        if ((0, e.alwaysValidSchema)(s, l))
          return;
        const i = a.subschema({ keyword: "allOf", schemaProp: o }, r);
        a.ok(r), a.mergeEvaluated(i);
      });
    }
  };
  return er.default = t, er;
}
var tr = {}, mo;
function ff() {
  if (mo) return tr;
  mo = 1, Object.defineProperty(tr, "__esModule", { value: !0 });
  const e = te(), t = ne(), n = {
    keyword: "if",
    schemaType: ["object", "boolean"],
    trackErrors: !0,
    error: {
      message: ({ params: s }) => (0, e.str)`must match "${s.ifClause}" schema`,
      params: ({ params: s }) => (0, e._)`{failingKeyword: ${s.ifClause}}`
    },
    code(s) {
      const { gen: r, parentSchema: l, it: o } = s;
      l.then === void 0 && l.else === void 0 && (0, t.checkStrictMode)(o, '"if" without "then" and "else" is ignored');
      const i = c(o, "then"), d = c(o, "else");
      if (!i && !d)
        return;
      const E = r.let("valid", !0), g = r.name("_valid");
      if (p(), s.reset(), i && d) {
        const b = r.let("ifClause");
        s.setParams({ ifClause: b }), r.if(g, w("then", b), w("else", b));
      } else i ? r.if(g, w("then")) : r.if((0, e.not)(g), w("else"));
      s.pass(E, () => s.error(!0));
      function p() {
        const b = s.subschema({
          keyword: "if",
          compositeRule: !0,
          createErrors: !1,
          allErrors: !1
        }, g);
        s.mergeEvaluated(b);
      }
      function w(b, f) {
        return () => {
          const h = s.subschema({ keyword: b }, g);
          r.assign(E, g), s.mergeValidEvaluated(h, E), f ? r.assign(f, (0, e._)`${b}`) : s.setParams({ ifClause: b });
        };
      }
    }
  };
  function c(s, r) {
    const l = s.schema[r];
    return l !== void 0 && !(0, t.alwaysValidSchema)(s, l);
  }
  return tr.default = n, tr;
}
var rr = {}, po;
function lf() {
  if (po) return rr;
  po = 1, Object.defineProperty(rr, "__esModule", { value: !0 });
  const e = ne(), t = {
    keyword: ["then", "else"],
    schemaType: ["object", "boolean"],
    code({ keyword: a, parentSchema: n, it: c }) {
      n.if === void 0 && (0, e.checkStrictMode)(c, `"${a}" without "if" is ignored`);
    }
  };
  return rr.default = t, rr;
}
var yo;
function df() {
  if (yo) return Vt;
  yo = 1, Object.defineProperty(Vt, "__esModule", { value: !0 });
  const e = Cc(), t = Yu(), a = Dc(), n = Qu(), c = ef(), s = tf(), r = rf(), l = Lc(), o = nf(), i = sf(), d = of(), E = af(), g = cf(), p = uf(), w = ff(), b = lf();
  function f(h = !1) {
    const u = [
      // any
      d.default,
      E.default,
      g.default,
      p.default,
      w.default,
      b.default,
      // object
      r.default,
      l.default,
      s.default,
      o.default,
      i.default
    ];
    return h ? u.push(t.default, n.default) : u.push(e.default, a.default), u.push(c.default), u;
  }
  return Vt.default = f, Vt;
}
var nr = {}, ir = {}, vo;
function hf() {
  if (vo) return ir;
  vo = 1, Object.defineProperty(ir, "__esModule", { value: !0 });
  const e = te(), a = {
    keyword: "format",
    type: ["number", "string"],
    schemaType: "string",
    $data: !0,
    error: {
      message: ({ schemaCode: n }) => (0, e.str)`must match format "${n}"`,
      params: ({ schemaCode: n }) => (0, e._)`{format: ${n}}`
    },
    code(n, c) {
      const { gen: s, data: r, $data: l, schema: o, schemaCode: i, it: d } = n, { opts: E, errSchemaPath: g, schemaEnv: p, self: w } = d;
      if (!E.validateFormats)
        return;
      l ? b() : f();
      function b() {
        const h = s.scopeValue("formats", {
          ref: w.formats,
          code: E.code.formats
        }), u = s.const("fDef", (0, e._)`${h}[${i}]`), m = s.let("fType"), y = s.let("format");
        s.if((0, e._)`typeof ${u} == "object" && !(${u} instanceof RegExp)`, () => s.assign(m, (0, e._)`${u}.type || "string"`).assign(y, (0, e._)`${u}.validate`), () => s.assign(m, (0, e._)`"string"`).assign(y, u)), n.fail$data((0, e.or)(v(), _()));
        function v() {
          return E.strictSchema === !1 ? e.nil : (0, e._)`${i} && !${y}`;
        }
        function _() {
          const S = p.$async ? (0, e._)`(${u}.async ? await ${y}(${r}) : ${y}(${r}))` : (0, e._)`${y}(${r})`, $ = (0, e._)`(typeof ${y} == "function" ? ${S} : ${y}.test(${r}))`;
          return (0, e._)`${y} && ${y} !== true && ${m} === ${c} && !${$}`;
        }
      }
      function f() {
        const h = w.formats[o];
        if (!h) {
          v();
          return;
        }
        if (h === !0)
          return;
        const [u, m, y] = _(h);
        u === c && n.pass(S());
        function v() {
          if (E.strictSchema === !1) {
            w.logger.warn($());
            return;
          }
          throw new Error($());
          function $() {
            return `unknown format "${o}" ignored in schema at path "${g}"`;
          }
        }
        function _($) {
          const O = $ instanceof RegExp ? (0, e.regexpCode)($) : E.code.formats ? (0, e._)`${E.code.formats}${(0, e.getProperty)(o)}` : void 0, T = s.scopeValue("formats", { key: o, ref: $, code: O });
          return typeof $ == "object" && !($ instanceof RegExp) ? [$.type || "string", $.validate, (0, e._)`${T}.validate`] : ["string", $, T];
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
  return ir.default = a, ir;
}
var Eo;
function mf() {
  if (Eo) return nr;
  Eo = 1, Object.defineProperty(nr, "__esModule", { value: !0 });
  const t = [hf().default];
  return nr.default = t, nr;
}
var xe = {}, go;
function pf() {
  return go || (go = 1, Object.defineProperty(xe, "__esModule", { value: !0 }), xe.contentVocabulary = xe.metadataVocabulary = void 0, xe.metadataVocabulary = [
    "title",
    "description",
    "default",
    "deprecated",
    "readOnly",
    "writeOnly",
    "examples"
  ], xe.contentVocabulary = [
    "contentMediaType",
    "contentEncoding",
    "contentSchema"
  ]), xe;
}
var _o;
function yf() {
  if (_o) return It;
  _o = 1, Object.defineProperty(It, "__esModule", { value: !0 });
  const e = Mu(), t = Ju(), a = df(), n = mf(), c = pf(), s = [
    e.default,
    t.default,
    (0, a.default)(),
    n.default,
    c.metadataVocabulary,
    c.contentVocabulary
  ];
  return It.default = s, It;
}
var sr = {}, Ye = {}, So;
function vf() {
  if (So) return Ye;
  So = 1, Object.defineProperty(Ye, "__esModule", { value: !0 }), Ye.DiscrError = void 0;
  var e;
  return function(t) {
    t.Tag = "tag", t.Mapping = "mapping";
  }(e || (Ye.DiscrError = e = {})), Ye;
}
var wo;
function Ef() {
  if (wo) return sr;
  wo = 1, Object.defineProperty(sr, "__esModule", { value: !0 });
  const e = te(), t = vf(), a = Pi(), n = gr(), c = ne(), r = {
    keyword: "discriminator",
    type: "object",
    schemaType: "object",
    error: {
      message: ({ params: { discrError: l, tagName: o } }) => l === t.DiscrError.Tag ? `tag "${o}" must be string` : `value of tag "${o}" must be in oneOf`,
      params: ({ params: { discrError: l, tag: o, tagName: i } }) => (0, e._)`{error: ${l}, tag: ${i}, tagValue: ${o}}`
    },
    code(l) {
      const { gen: o, data: i, schema: d, parentSchema: E, it: g } = l, { oneOf: p } = E;
      if (!g.opts.discriminator)
        throw new Error("discriminator: requires discriminator option");
      const w = d.propertyName;
      if (typeof w != "string")
        throw new Error("discriminator: requires propertyName");
      if (d.mapping)
        throw new Error("discriminator: mapping is not supported");
      if (!p)
        throw new Error("discriminator: requires oneOf keyword");
      const b = o.let("valid", !1), f = o.const("tag", (0, e._)`${i}${(0, e.getProperty)(w)}`);
      o.if((0, e._)`typeof ${f} == "string"`, () => h(), () => l.error(!1, { discrError: t.DiscrError.Tag, tag: f, tagName: w })), l.ok(b);
      function h() {
        const y = m();
        o.if(!1);
        for (const v in y)
          o.elseIf((0, e._)`${f} === ${v}`), o.assign(b, u(y[v]));
        o.else(), l.error(!1, { discrError: t.DiscrError.Mapping, tag: f, tagName: w }), o.endIf();
      }
      function u(y) {
        const v = o.name("valid"), _ = l.subschema({ keyword: "oneOf", schemaProp: y }, v);
        return l.mergeEvaluated(_, e.Name), v;
      }
      function m() {
        var y;
        const v = {}, _ = $(E);
        let S = !0;
        for (let k = 0; k < p.length; k++) {
          let H = p[k];
          if (H?.$ref && !(0, c.schemaHasRulesButRef)(H, g.self.RULES)) {
            const z = H.$ref;
            if (H = a.resolveRef.call(g.self, g.schemaEnv.root, g.baseId, z), H instanceof a.SchemaEnv && (H = H.schema), H === void 0)
              throw new n.default(g.opts.uriResolver, g.baseId, z);
          }
          const U = (y = H?.properties) === null || y === void 0 ? void 0 : y[w];
          if (typeof U != "object")
            throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${w}"`);
          S = S && (_ || $(H)), O(U, k);
        }
        if (!S)
          throw new Error(`discriminator: "${w}" must be required`);
        return v;
        function $({ required: k }) {
          return Array.isArray(k) && k.includes(w);
        }
        function O(k, H) {
          if (k.const)
            T(k.const, H);
          else if (k.enum)
            for (const U of k.enum)
              T(U, H);
          else
            throw new Error(`discriminator: "properties/${w}" must have "const" or "enum"`);
        }
        function T(k, H) {
          if (typeof k != "string" || k in v)
            throw new Error(`discriminator: "${w}" values must be unique strings`);
          v[k] = H;
        }
      }
    }
  };
  return sr.default = r, sr;
}
const gf = "http://json-schema.org/draft-07/schema#", _f = "http://json-schema.org/draft-07/schema#", Sf = "Core schema meta-schema", wf = { schemaArray: { type: "array", minItems: 1, items: { $ref: "#" } }, nonNegativeInteger: { type: "integer", minimum: 0 }, nonNegativeIntegerDefault0: { allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }] }, simpleTypes: { enum: ["array", "boolean", "integer", "null", "number", "object", "string"] }, stringArray: { type: "array", items: { type: "string" }, uniqueItems: !0, default: [] } }, $f = ["object", "boolean"], bf = { $id: { type: "string", format: "uri-reference" }, $schema: { type: "string", format: "uri" }, $ref: { type: "string", format: "uri-reference" }, $comment: { type: "string" }, title: { type: "string" }, description: { type: "string" }, default: !0, readOnly: { type: "boolean", default: !1 }, examples: { type: "array", items: !0 }, multipleOf: { type: "number", exclusiveMinimum: 0 }, maximum: { type: "number" }, exclusiveMaximum: { type: "number" }, minimum: { type: "number" }, exclusiveMinimum: { type: "number" }, maxLength: { $ref: "#/definitions/nonNegativeInteger" }, minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, pattern: { type: "string", format: "regex" }, additionalItems: { $ref: "#" }, items: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }], default: !0 }, maxItems: { $ref: "#/definitions/nonNegativeInteger" }, minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, uniqueItems: { type: "boolean", default: !1 }, contains: { $ref: "#" }, maxProperties: { $ref: "#/definitions/nonNegativeInteger" }, minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, required: { $ref: "#/definitions/stringArray" }, additionalProperties: { $ref: "#" }, definitions: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, properties: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, patternProperties: { type: "object", additionalProperties: { $ref: "#" }, propertyNames: { format: "regex" }, default: {} }, dependencies: { type: "object", additionalProperties: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }] } }, propertyNames: { $ref: "#" }, const: !0, enum: { type: "array", items: !0, minItems: 1, uniqueItems: !0 }, type: { anyOf: [{ $ref: "#/definitions/simpleTypes" }, { type: "array", items: { $ref: "#/definitions/simpleTypes" }, minItems: 1, uniqueItems: !0 }] }, format: { type: "string" }, contentMediaType: { type: "string" }, contentEncoding: { type: "string" }, if: { $ref: "#" }, then: { $ref: "#" }, else: { $ref: "#" }, allOf: { $ref: "#/definitions/schemaArray" }, anyOf: { $ref: "#/definitions/schemaArray" }, oneOf: { $ref: "#/definitions/schemaArray" }, not: { $ref: "#" } }, Rf = {
  $schema: gf,
  $id: _f,
  title: Sf,
  definitions: wf,
  type: $f,
  properties: bf,
  default: !0
};
var $o;
function Ac() {
  return $o || ($o = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
    const a = qu(), n = yf(), c = Ef(), s = Rf, r = ["/properties"], l = "http://json-schema.org/draft-07/schema";
    class o extends a.default {
      _addVocabularies() {
        super._addVocabularies(), n.default.forEach((w) => this.addVocabulary(w)), this.opts.discriminator && this.addKeyword(c.default);
      }
      _addDefaultMetaSchema() {
        if (super._addDefaultMetaSchema(), !this.opts.meta)
          return;
        const w = this.opts.$data ? this.$dataMetaSchema(s, r) : s;
        this.addMetaSchema(w, l, !1), this.refs["http://json-schema.org/schema"] = l;
      }
      defaultMeta() {
        return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(l) ? l : void 0);
      }
    }
    t.Ajv = o, e.exports = t = o, e.exports.Ajv = o, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = o;
    var i = Er();
    Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
      return i.KeywordCxt;
    } });
    var d = te();
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
    var g = gr();
    Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
      return g.default;
    } });
  }(wt, wt.exports)), wt.exports;
}
var or = { exports: {} }, Ur = {}, bo;
function Of() {
  return bo || (bo = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
    function t(O, T) {
      return { validate: O, compare: T };
    }
    e.fullFormats = {
      // date: http://tools.ietf.org/html/rfc3339#section-5.6
      date: t(s, r),
      // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
      time: t(o, i),
      "date-time": t(E, g),
      // duration: https://tools.ietf.org/html/rfc3339#appendix-A
      duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
      uri: b,
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
      regex: $,
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
      time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, i),
      "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, g),
      // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
      uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
      "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
      // email (sources from jsen validator):
      // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
      // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
      email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
    }, e.formatNames = Object.keys(e.fullFormats);
    function a(O) {
      return O % 4 === 0 && (O % 100 !== 0 || O % 400 === 0);
    }
    const n = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, c = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function s(O) {
      const T = n.exec(O);
      if (!T)
        return !1;
      const k = +T[1], H = +T[2], U = +T[3];
      return H >= 1 && H <= 12 && U >= 1 && U <= (H === 2 && a(k) ? 29 : c[H]);
    }
    function r(O, T) {
      if (O && T)
        return O > T ? 1 : O < T ? -1 : 0;
    }
    const l = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
    function o(O, T) {
      const k = l.exec(O);
      if (!k)
        return !1;
      const H = +k[1], U = +k[2], z = +k[3], V = k[5];
      return (H <= 23 && U <= 59 && z <= 59 || H === 23 && U === 59 && z === 60) && (!T || V !== "");
    }
    function i(O, T) {
      if (!(O && T))
        return;
      const k = l.exec(O), H = l.exec(T);
      if (k && H)
        return O = k[1] + k[2] + k[3] + (k[4] || ""), T = H[1] + H[2] + H[3] + (H[4] || ""), O > T ? 1 : O < T ? -1 : 0;
    }
    const d = /t|\s/i;
    function E(O) {
      const T = O.split(d);
      return T.length === 2 && s(T[0]) && o(T[1], !0);
    }
    function g(O, T) {
      if (!(O && T))
        return;
      const [k, H] = O.split(d), [U, z] = T.split(d), V = r(k, U);
      if (V !== void 0)
        return V || i(H, z);
    }
    const p = /\/|:/, w = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
    function b(O) {
      return p.test(O) && w.test(O);
    }
    const f = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
    function h(O) {
      return f.lastIndex = 0, f.test(O);
    }
    const u = -(2 ** 31), m = 2 ** 31 - 1;
    function y(O) {
      return Number.isInteger(O) && O <= m && O >= u;
    }
    function v(O) {
      return Number.isInteger(O);
    }
    function _() {
      return !0;
    }
    const S = /[^\\]\\Z/;
    function $(O) {
      if (S.test(O))
        return !1;
      try {
        return new RegExp(O), !0;
      } catch {
        return !1;
      }
    }
  }(Ur)), Ur;
}
var zr = {}, Ro;
function If() {
  return Ro || (Ro = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
    const t = Ac(), a = te(), n = a.operators, c = {
      formatMaximum: { okStr: "<=", ok: n.LTE, fail: n.GT },
      formatMinimum: { okStr: ">=", ok: n.GTE, fail: n.LT },
      formatExclusiveMaximum: { okStr: "<", ok: n.LT, fail: n.GTE },
      formatExclusiveMinimum: { okStr: ">", ok: n.GT, fail: n.LTE }
    }, s = {
      message: ({ keyword: l, schemaCode: o }) => a.str`should be ${c[l].okStr} ${o}`,
      params: ({ keyword: l, schemaCode: o }) => a._`{comparison: ${c[l].okStr}, limit: ${o}}`
    };
    e.formatLimitDefinition = {
      keyword: Object.keys(c),
      type: "string",
      schemaType: "string",
      $data: !0,
      error: s,
      code(l) {
        const { gen: o, data: i, schemaCode: d, keyword: E, it: g } = l, { opts: p, self: w } = g;
        if (!p.validateFormats)
          return;
        const b = new t.KeywordCxt(g, w.RULES.all.format.definition, "format");
        b.$data ? f() : h();
        function f() {
          const m = o.scopeValue("formats", {
            ref: w.formats,
            code: p.code.formats
          }), y = o.const("fmt", a._`${m}[${b.schemaCode}]`);
          l.fail$data(a.or(a._`typeof ${y} != "object"`, a._`${y} instanceof RegExp`, a._`typeof ${y}.compare != "function"`, u(y)));
        }
        function h() {
          const m = b.schema, y = w.formats[m];
          if (!y || y === !0)
            return;
          if (typeof y != "object" || y instanceof RegExp || typeof y.compare != "function")
            throw new Error(`"${E}": format "${m}" does not define "compare" function`);
          const v = o.scopeValue("formats", {
            key: m,
            ref: y,
            code: p.code.formats ? a._`${p.code.formats}${a.getProperty(m)}` : void 0
          });
          l.fail$data(u(v));
        }
        function u(m) {
          return a._`${m}.compare(${i}, ${d}) ${c[E].fail} 0`;
        }
      },
      dependencies: ["format"]
    };
    const r = (l) => (l.addKeyword(e.formatLimitDefinition), l);
    e.default = r;
  }(zr)), zr;
}
var Oo;
function Nf() {
  return Oo || (Oo = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 });
    const a = Of(), n = If(), c = te(), s = new c.Name("fullFormats"), r = new c.Name("fastFormats"), l = (i, d = { keywords: !0 }) => {
      if (Array.isArray(d))
        return o(i, d, a.fullFormats, s), i;
      const [E, g] = d.mode === "fast" ? [a.fastFormats, r] : [a.fullFormats, s], p = d.formats || a.formatNames;
      return o(i, p, E, g), d.keywords && n.default(i), i;
    };
    l.get = (i, d = "full") => {
      const g = (d === "fast" ? a.fastFormats : a.fullFormats)[i];
      if (!g)
        throw new Error(`Unknown format "${i}"`);
      return g;
    };
    function o(i, d, E, g) {
      var p, w;
      (p = (w = i.opts.code).formats) !== null && p !== void 0 || (w.formats = c._`require("ajv-formats/dist/formats").${g}`);
      for (const b of d)
        i.addFormat(b, E[b]);
    }
    e.exports = t = l, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = l;
  }(or, or.exports)), or.exports;
}
var Vr, Io;
function Pf() {
  if (Io) return Vr;
  Io = 1;
  const e = (o, i, d, E) => {
    if (d === "length" || d === "prototype" || d === "arguments" || d === "caller")
      return;
    const g = Object.getOwnPropertyDescriptor(o, d), p = Object.getOwnPropertyDescriptor(i, d);
    !t(g, p) && E || Object.defineProperty(o, d, p);
  }, t = function(o, i) {
    return o === void 0 || o.configurable || o.writable === i.writable && o.enumerable === i.enumerable && o.configurable === i.configurable && (o.writable || o.value === i.value);
  }, a = (o, i) => {
    const d = Object.getPrototypeOf(i);
    d !== Object.getPrototypeOf(o) && Object.setPrototypeOf(o, d);
  }, n = (o, i) => `/* Wrapped ${o}*/
${i}`, c = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), s = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), r = (o, i, d) => {
    const E = d === "" ? "" : `with ${d.trim()}() `, g = n.bind(null, E, i.toString());
    Object.defineProperty(g, "name", s), Object.defineProperty(o, "toString", { ...c, value: g });
  };
  return Vr = (o, i, { ignoreNonConfigurable: d = !1 } = {}) => {
    const { name: E } = o;
    for (const g of Reflect.ownKeys(i))
      e(o, i, g, d);
    return a(o, i), r(o, i, E), o;
  }, Vr;
}
var Gr, No;
function Tf() {
  if (No) return Gr;
  No = 1;
  const e = Pf();
  return Gr = (t, a = {}) => {
    if (typeof t != "function")
      throw new TypeError(`Expected the first argument to be a function, got \`${typeof t}\``);
    const {
      wait: n = 0,
      before: c = !1,
      after: s = !0
    } = a;
    if (!c && !s)
      throw new Error("Both `before` and `after` are false, function wouldn't be called.");
    let r, l;
    const o = function(...i) {
      const d = this, E = () => {
        r = void 0, s && (l = t.apply(d, i));
      }, g = c && !r;
      return clearTimeout(r), r = setTimeout(E, n), g && (l = t.apply(d, i)), l;
    };
    return e(o, t), o.cancel = () => {
      r && (clearTimeout(r), r = void 0);
    }, o;
  }, Gr;
}
var ar = { exports: {} }, Br, Po;
function _r() {
  if (Po) return Br;
  Po = 1;
  const e = "2.0.0", t = 256, a = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991, n = 16, c = t - 6;
  return Br = {
    MAX_LENGTH: t,
    MAX_SAFE_COMPONENT_LENGTH: n,
    MAX_SAFE_BUILD_LENGTH: c,
    MAX_SAFE_INTEGER: a,
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
  }, Br;
}
var Hr, To;
function Sr() {
  return To || (To = 1, Hr = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...t) => console.error("SEMVER", ...t) : () => {
  }), Hr;
}
var Co;
function st() {
  return Co || (Co = 1, function(e, t) {
    const {
      MAX_SAFE_COMPONENT_LENGTH: a,
      MAX_SAFE_BUILD_LENGTH: n,
      MAX_LENGTH: c
    } = _r(), s = Sr();
    t = e.exports = {};
    const r = t.re = [], l = t.safeRe = [], o = t.src = [], i = t.t = {};
    let d = 0;
    const E = "[a-zA-Z0-9-]", g = [
      ["\\s", 1],
      ["\\d", c],
      [E, n]
    ], p = (b) => {
      for (const [f, h] of g)
        b = b.split(`${f}*`).join(`${f}{0,${h}}`).split(`${f}+`).join(`${f}{1,${h}}`);
      return b;
    }, w = (b, f, h) => {
      const u = p(f), m = d++;
      s(b, m, f), i[b] = m, o[m] = f, r[m] = new RegExp(f, h ? "g" : void 0), l[m] = new RegExp(u, h ? "g" : void 0);
    };
    w("NUMERICIDENTIFIER", "0|[1-9]\\d*"), w("NUMERICIDENTIFIERLOOSE", "\\d+"), w("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${E}*`), w("MAINVERSION", `(${o[i.NUMERICIDENTIFIER]})\\.(${o[i.NUMERICIDENTIFIER]})\\.(${o[i.NUMERICIDENTIFIER]})`), w("MAINVERSIONLOOSE", `(${o[i.NUMERICIDENTIFIERLOOSE]})\\.(${o[i.NUMERICIDENTIFIERLOOSE]})\\.(${o[i.NUMERICIDENTIFIERLOOSE]})`), w("PRERELEASEIDENTIFIER", `(?:${o[i.NUMERICIDENTIFIER]}|${o[i.NONNUMERICIDENTIFIER]})`), w("PRERELEASEIDENTIFIERLOOSE", `(?:${o[i.NUMERICIDENTIFIERLOOSE]}|${o[i.NONNUMERICIDENTIFIER]})`), w("PRERELEASE", `(?:-(${o[i.PRERELEASEIDENTIFIER]}(?:\\.${o[i.PRERELEASEIDENTIFIER]})*))`), w("PRERELEASELOOSE", `(?:-?(${o[i.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${o[i.PRERELEASEIDENTIFIERLOOSE]})*))`), w("BUILDIDENTIFIER", `${E}+`), w("BUILD", `(?:\\+(${o[i.BUILDIDENTIFIER]}(?:\\.${o[i.BUILDIDENTIFIER]})*))`), w("FULLPLAIN", `v?${o[i.MAINVERSION]}${o[i.PRERELEASE]}?${o[i.BUILD]}?`), w("FULL", `^${o[i.FULLPLAIN]}$`), w("LOOSEPLAIN", `[v=\\s]*${o[i.MAINVERSIONLOOSE]}${o[i.PRERELEASELOOSE]}?${o[i.BUILD]}?`), w("LOOSE", `^${o[i.LOOSEPLAIN]}$`), w("GTLT", "((?:<|>)?=?)"), w("XRANGEIDENTIFIERLOOSE", `${o[i.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), w("XRANGEIDENTIFIER", `${o[i.NUMERICIDENTIFIER]}|x|X|\\*`), w("XRANGEPLAIN", `[v=\\s]*(${o[i.XRANGEIDENTIFIER]})(?:\\.(${o[i.XRANGEIDENTIFIER]})(?:\\.(${o[i.XRANGEIDENTIFIER]})(?:${o[i.PRERELEASE]})?${o[i.BUILD]}?)?)?`), w("XRANGEPLAINLOOSE", `[v=\\s]*(${o[i.XRANGEIDENTIFIERLOOSE]})(?:\\.(${o[i.XRANGEIDENTIFIERLOOSE]})(?:\\.(${o[i.XRANGEIDENTIFIERLOOSE]})(?:${o[i.PRERELEASELOOSE]})?${o[i.BUILD]}?)?)?`), w("XRANGE", `^${o[i.GTLT]}\\s*${o[i.XRANGEPLAIN]}$`), w("XRANGELOOSE", `^${o[i.GTLT]}\\s*${o[i.XRANGEPLAINLOOSE]}$`), w("COERCEPLAIN", `(^|[^\\d])(\\d{1,${a}})(?:\\.(\\d{1,${a}}))?(?:\\.(\\d{1,${a}}))?`), w("COERCE", `${o[i.COERCEPLAIN]}(?:$|[^\\d])`), w("COERCEFULL", o[i.COERCEPLAIN] + `(?:${o[i.PRERELEASE]})?(?:${o[i.BUILD]})?(?:$|[^\\d])`), w("COERCERTL", o[i.COERCE], !0), w("COERCERTLFULL", o[i.COERCEFULL], !0), w("LONETILDE", "(?:~>?)"), w("TILDETRIM", `(\\s*)${o[i.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", w("TILDE", `^${o[i.LONETILDE]}${o[i.XRANGEPLAIN]}$`), w("TILDELOOSE", `^${o[i.LONETILDE]}${o[i.XRANGEPLAINLOOSE]}$`), w("LONECARET", "(?:\\^)"), w("CARETTRIM", `(\\s*)${o[i.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", w("CARET", `^${o[i.LONECARET]}${o[i.XRANGEPLAIN]}$`), w("CARETLOOSE", `^${o[i.LONECARET]}${o[i.XRANGEPLAINLOOSE]}$`), w("COMPARATORLOOSE", `^${o[i.GTLT]}\\s*(${o[i.LOOSEPLAIN]})$|^$`), w("COMPARATOR", `^${o[i.GTLT]}\\s*(${o[i.FULLPLAIN]})$|^$`), w("COMPARATORTRIM", `(\\s*)${o[i.GTLT]}\\s*(${o[i.LOOSEPLAIN]}|${o[i.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", w("HYPHENRANGE", `^\\s*(${o[i.XRANGEPLAIN]})\\s+-\\s+(${o[i.XRANGEPLAIN]})\\s*$`), w("HYPHENRANGELOOSE", `^\\s*(${o[i.XRANGEPLAINLOOSE]})\\s+-\\s+(${o[i.XRANGEPLAINLOOSE]})\\s*$`), w("STAR", "(<|>)?=?\\s*\\*"), w("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), w("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }(ar, ar.exports)), ar.exports;
}
var Wr, Do;
function Ci() {
  if (Do) return Wr;
  Do = 1;
  const e = Object.freeze({ loose: !0 }), t = Object.freeze({});
  return Wr = (n) => n ? typeof n != "object" ? e : n : t, Wr;
}
var Kr, Lo;
function Fc() {
  if (Lo) return Kr;
  Lo = 1;
  const e = /^[0-9]+$/, t = (n, c) => {
    const s = e.test(n), r = e.test(c);
    return s && r && (n = +n, c = +c), n === c ? 0 : s && !r ? -1 : r && !s ? 1 : n < c ? -1 : 1;
  };
  return Kr = {
    compareIdentifiers: t,
    rcompareIdentifiers: (n, c) => t(c, n)
  }, Kr;
}
var Xr, Ao;
function Ee() {
  if (Ao) return Xr;
  Ao = 1;
  const e = Sr(), { MAX_LENGTH: t, MAX_SAFE_INTEGER: a } = _r(), { safeRe: n, t: c } = st(), s = Ci(), { compareIdentifiers: r } = Fc();
  class l {
    constructor(i, d) {
      if (d = s(d), i instanceof l) {
        if (i.loose === !!d.loose && i.includePrerelease === !!d.includePrerelease)
          return i;
        i = i.version;
      } else if (typeof i != "string")
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof i}".`);
      if (i.length > t)
        throw new TypeError(
          `version is longer than ${t} characters`
        );
      e("SemVer", i, d), this.options = d, this.loose = !!d.loose, this.includePrerelease = !!d.includePrerelease;
      const E = i.trim().match(d.loose ? n[c.LOOSE] : n[c.FULL]);
      if (!E)
        throw new TypeError(`Invalid Version: ${i}`);
      if (this.raw = i, this.major = +E[1], this.minor = +E[2], this.patch = +E[3], this.major > a || this.major < 0)
        throw new TypeError("Invalid major version");
      if (this.minor > a || this.minor < 0)
        throw new TypeError("Invalid minor version");
      if (this.patch > a || this.patch < 0)
        throw new TypeError("Invalid patch version");
      E[4] ? this.prerelease = E[4].split(".").map((g) => {
        if (/^[0-9]+$/.test(g)) {
          const p = +g;
          if (p >= 0 && p < a)
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
    compare(i) {
      if (e("SemVer.compare", this.version, this.options, i), !(i instanceof l)) {
        if (typeof i == "string" && i === this.version)
          return 0;
        i = new l(i, this.options);
      }
      return i.version === this.version ? 0 : this.compareMain(i) || this.comparePre(i);
    }
    compareMain(i) {
      return i instanceof l || (i = new l(i, this.options)), r(this.major, i.major) || r(this.minor, i.minor) || r(this.patch, i.patch);
    }
    comparePre(i) {
      if (i instanceof l || (i = new l(i, this.options)), this.prerelease.length && !i.prerelease.length)
        return -1;
      if (!this.prerelease.length && i.prerelease.length)
        return 1;
      if (!this.prerelease.length && !i.prerelease.length)
        return 0;
      let d = 0;
      do {
        const E = this.prerelease[d], g = i.prerelease[d];
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
    compareBuild(i) {
      i instanceof l || (i = new l(i, this.options));
      let d = 0;
      do {
        const E = this.build[d], g = i.build[d];
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
    inc(i, d, E) {
      switch (i) {
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
          throw new Error(`invalid increment argument: ${i}`);
      }
      return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
    }
  }
  return Xr = l, Xr;
}
var Zr, Fo;
function He() {
  if (Fo) return Zr;
  Fo = 1;
  const e = Ee();
  return Zr = (a, n, c = !1) => {
    if (a instanceof e)
      return a;
    try {
      return new e(a, n);
    } catch (s) {
      if (!c)
        return null;
      throw s;
    }
  }, Zr;
}
var Jr, qo;
function Cf() {
  if (qo) return Jr;
  qo = 1;
  const e = He();
  return Jr = (a, n) => {
    const c = e(a, n);
    return c ? c.version : null;
  }, Jr;
}
var Yr, ko;
function Df() {
  if (ko) return Yr;
  ko = 1;
  const e = He();
  return Yr = (a, n) => {
    const c = e(a.trim().replace(/^[=v]+/, ""), n);
    return c ? c.version : null;
  }, Yr;
}
var Qr, jo;
function Lf() {
  if (jo) return Qr;
  jo = 1;
  const e = Ee();
  return Qr = (a, n, c, s, r) => {
    typeof c == "string" && (r = s, s = c, c = void 0);
    try {
      return new e(
        a instanceof e ? a.version : a,
        c
      ).inc(n, s, r).version;
    } catch {
      return null;
    }
  }, Qr;
}
var en, Mo;
function Af() {
  if (Mo) return en;
  Mo = 1;
  const e = He();
  return en = (a, n) => {
    const c = e(a, null, !0), s = e(n, null, !0), r = c.compare(s);
    if (r === 0)
      return null;
    const l = r > 0, o = l ? c : s, i = l ? s : c, d = !!o.prerelease.length;
    if (!!i.prerelease.length && !d)
      return !i.patch && !i.minor ? "major" : o.patch ? "patch" : o.minor ? "minor" : "major";
    const g = d ? "pre" : "";
    return c.major !== s.major ? g + "major" : c.minor !== s.minor ? g + "minor" : c.patch !== s.patch ? g + "patch" : "prerelease";
  }, en;
}
var tn, xo;
function Ff() {
  if (xo) return tn;
  xo = 1;
  const e = Ee();
  return tn = (a, n) => new e(a, n).major, tn;
}
var rn, Uo;
function qf() {
  if (Uo) return rn;
  Uo = 1;
  const e = Ee();
  return rn = (a, n) => new e(a, n).minor, rn;
}
var nn, zo;
function kf() {
  if (zo) return nn;
  zo = 1;
  const e = Ee();
  return nn = (a, n) => new e(a, n).patch, nn;
}
var sn, Vo;
function jf() {
  if (Vo) return sn;
  Vo = 1;
  const e = He();
  return sn = (a, n) => {
    const c = e(a, n);
    return c && c.prerelease.length ? c.prerelease : null;
  }, sn;
}
var on, Go;
function Ie() {
  if (Go) return on;
  Go = 1;
  const e = Ee();
  return on = (a, n, c) => new e(a, c).compare(new e(n, c)), on;
}
var an, Bo;
function Mf() {
  if (Bo) return an;
  Bo = 1;
  const e = Ie();
  return an = (a, n, c) => e(n, a, c), an;
}
var cn, Ho;
function xf() {
  if (Ho) return cn;
  Ho = 1;
  const e = Ie();
  return cn = (a, n) => e(a, n, !0), cn;
}
var un, Wo;
function Di() {
  if (Wo) return un;
  Wo = 1;
  const e = Ee();
  return un = (a, n, c) => {
    const s = new e(a, c), r = new e(n, c);
    return s.compare(r) || s.compareBuild(r);
  }, un;
}
var fn, Ko;
function Uf() {
  if (Ko) return fn;
  Ko = 1;
  const e = Di();
  return fn = (a, n) => a.sort((c, s) => e(c, s, n)), fn;
}
var ln, Xo;
function zf() {
  if (Xo) return ln;
  Xo = 1;
  const e = Di();
  return ln = (a, n) => a.sort((c, s) => e(s, c, n)), ln;
}
var dn, Zo;
function wr() {
  if (Zo) return dn;
  Zo = 1;
  const e = Ie();
  return dn = (a, n, c) => e(a, n, c) > 0, dn;
}
var hn, Jo;
function Li() {
  if (Jo) return hn;
  Jo = 1;
  const e = Ie();
  return hn = (a, n, c) => e(a, n, c) < 0, hn;
}
var mn, Yo;
function qc() {
  if (Yo) return mn;
  Yo = 1;
  const e = Ie();
  return mn = (a, n, c) => e(a, n, c) === 0, mn;
}
var pn, Qo;
function kc() {
  if (Qo) return pn;
  Qo = 1;
  const e = Ie();
  return pn = (a, n, c) => e(a, n, c) !== 0, pn;
}
var yn, ea;
function Ai() {
  if (ea) return yn;
  ea = 1;
  const e = Ie();
  return yn = (a, n, c) => e(a, n, c) >= 0, yn;
}
var vn, ta;
function Fi() {
  if (ta) return vn;
  ta = 1;
  const e = Ie();
  return vn = (a, n, c) => e(a, n, c) <= 0, vn;
}
var En, ra;
function jc() {
  if (ra) return En;
  ra = 1;
  const e = qc(), t = kc(), a = wr(), n = Ai(), c = Li(), s = Fi();
  return En = (l, o, i, d) => {
    switch (o) {
      case "===":
        return typeof l == "object" && (l = l.version), typeof i == "object" && (i = i.version), l === i;
      case "!==":
        return typeof l == "object" && (l = l.version), typeof i == "object" && (i = i.version), l !== i;
      case "":
      case "=":
      case "==":
        return e(l, i, d);
      case "!=":
        return t(l, i, d);
      case ">":
        return a(l, i, d);
      case ">=":
        return n(l, i, d);
      case "<":
        return c(l, i, d);
      case "<=":
        return s(l, i, d);
      default:
        throw new TypeError(`Invalid operator: ${o}`);
    }
  }, En;
}
var gn, na;
function Vf() {
  if (na) return gn;
  na = 1;
  const e = Ee(), t = He(), { safeRe: a, t: n } = st();
  return gn = (s, r) => {
    if (s instanceof e)
      return s;
    if (typeof s == "number" && (s = String(s)), typeof s != "string")
      return null;
    r = r || {};
    let l = null;
    if (!r.rtl)
      l = s.match(r.includePrerelease ? a[n.COERCEFULL] : a[n.COERCE]);
    else {
      const p = r.includePrerelease ? a[n.COERCERTLFULL] : a[n.COERCERTL];
      let w;
      for (; (w = p.exec(s)) && (!l || l.index + l[0].length !== s.length); )
        (!l || w.index + w[0].length !== l.index + l[0].length) && (l = w), p.lastIndex = w.index + w[1].length + w[2].length;
      p.lastIndex = -1;
    }
    if (l === null)
      return null;
    const o = l[2], i = l[3] || "0", d = l[4] || "0", E = r.includePrerelease && l[5] ? `-${l[5]}` : "", g = r.includePrerelease && l[6] ? `+${l[6]}` : "";
    return t(`${o}.${i}.${d}${E}${g}`, r);
  }, gn;
}
var _n, ia;
function Gf() {
  if (ia) return _n;
  ia = 1;
  class e {
    constructor() {
      this.max = 1e3, this.map = /* @__PURE__ */ new Map();
    }
    get(a) {
      const n = this.map.get(a);
      if (n !== void 0)
        return this.map.delete(a), this.map.set(a, n), n;
    }
    delete(a) {
      return this.map.delete(a);
    }
    set(a, n) {
      if (!this.delete(a) && n !== void 0) {
        if (this.map.size >= this.max) {
          const s = this.map.keys().next().value;
          this.delete(s);
        }
        this.map.set(a, n);
      }
      return this;
    }
  }
  return _n = e, _n;
}
var Sn, sa;
function Ne() {
  if (sa) return Sn;
  sa = 1;
  const e = /\s+/g;
  class t {
    constructor(V, Z) {
      if (Z = c(Z), V instanceof t)
        return V.loose === !!Z.loose && V.includePrerelease === !!Z.includePrerelease ? V : new t(V.raw, Z);
      if (V instanceof s)
        return this.raw = V.value, this.set = [[V]], this.formatted = void 0, this;
      if (this.options = Z, this.loose = !!Z.loose, this.includePrerelease = !!Z.includePrerelease, this.raw = V.trim().replace(e, " "), this.set = this.raw.split("||").map((B) => this.parseRange(B.trim())).filter((B) => B.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const B = this.set[0];
        if (this.set = this.set.filter((A) => !b(A[0])), this.set.length === 0)
          this.set = [B];
        else if (this.set.length > 1) {
          for (const A of this.set)
            if (A.length === 1 && f(A[0])) {
              this.set = [A];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let V = 0; V < this.set.length; V++) {
          V > 0 && (this.formatted += "||");
          const Z = this.set[V];
          for (let B = 0; B < Z.length; B++)
            B > 0 && (this.formatted += " "), this.formatted += Z[B].toString().trim();
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
    parseRange(V) {
      const B = ((this.options.includePrerelease && p) | (this.options.loose && w)) + ":" + V, A = n.get(B);
      if (A)
        return A;
      const x = this.options.loose, D = x ? o[i.HYPHENRANGELOOSE] : o[i.HYPHENRANGE];
      V = V.replace(D, H(this.options.includePrerelease)), r("hyphen replace", V), V = V.replace(o[i.COMPARATORTRIM], d), r("comparator trim", V), V = V.replace(o[i.TILDETRIM], E), r("tilde trim", V), V = V.replace(o[i.CARETTRIM], g), r("caret trim", V);
      let C = V.split(" ").map((N) => u(N, this.options)).join(" ").split(/\s+/).map((N) => k(N, this.options));
      x && (C = C.filter((N) => (r("loose invalid filter", N, this.options), !!N.match(o[i.COMPARATORLOOSE])))), r("range list", C);
      const j = /* @__PURE__ */ new Map(), L = C.map((N) => new s(N, this.options));
      for (const N of L) {
        if (b(N))
          return [N];
        j.set(N.value, N);
      }
      j.size > 1 && j.has("") && j.delete("");
      const R = [...j.values()];
      return n.set(B, R), R;
    }
    intersects(V, Z) {
      if (!(V instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((B) => h(B, Z) && V.set.some((A) => h(A, Z) && B.every((x) => A.every((D) => x.intersects(D, Z)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(V) {
      if (!V)
        return !1;
      if (typeof V == "string")
        try {
          V = new l(V, this.options);
        } catch {
          return !1;
        }
      for (let Z = 0; Z < this.set.length; Z++)
        if (U(this.set[Z], V, this.options))
          return !0;
      return !1;
    }
  }
  Sn = t;
  const a = Gf(), n = new a(), c = Ci(), s = $r(), r = Sr(), l = Ee(), {
    safeRe: o,
    t: i,
    comparatorTrimReplace: d,
    tildeTrimReplace: E,
    caretTrimReplace: g
  } = st(), { FLAG_INCLUDE_PRERELEASE: p, FLAG_LOOSE: w } = _r(), b = (z) => z.value === "<0.0.0-0", f = (z) => z.value === "", h = (z, V) => {
    let Z = !0;
    const B = z.slice();
    let A = B.pop();
    for (; Z && B.length; )
      Z = B.every((x) => A.intersects(x, V)), A = B.pop();
    return Z;
  }, u = (z, V) => (r("comp", z, V), z = _(z, V), r("caret", z), z = y(z, V), r("tildes", z), z = $(z, V), r("xrange", z), z = T(z, V), r("stars", z), z), m = (z) => !z || z.toLowerCase() === "x" || z === "*", y = (z, V) => z.trim().split(/\s+/).map((Z) => v(Z, V)).join(" "), v = (z, V) => {
    const Z = V.loose ? o[i.TILDELOOSE] : o[i.TILDE];
    return z.replace(Z, (B, A, x, D, C) => {
      r("tilde", z, B, A, x, D, C);
      let j;
      return m(A) ? j = "" : m(x) ? j = `>=${A}.0.0 <${+A + 1}.0.0-0` : m(D) ? j = `>=${A}.${x}.0 <${A}.${+x + 1}.0-0` : C ? (r("replaceTilde pr", C), j = `>=${A}.${x}.${D}-${C} <${A}.${+x + 1}.0-0`) : j = `>=${A}.${x}.${D} <${A}.${+x + 1}.0-0`, r("tilde return", j), j;
    });
  }, _ = (z, V) => z.trim().split(/\s+/).map((Z) => S(Z, V)).join(" "), S = (z, V) => {
    r("caret", z, V);
    const Z = V.loose ? o[i.CARETLOOSE] : o[i.CARET], B = V.includePrerelease ? "-0" : "";
    return z.replace(Z, (A, x, D, C, j) => {
      r("caret", z, A, x, D, C, j);
      let L;
      return m(x) ? L = "" : m(D) ? L = `>=${x}.0.0${B} <${+x + 1}.0.0-0` : m(C) ? x === "0" ? L = `>=${x}.${D}.0${B} <${x}.${+D + 1}.0-0` : L = `>=${x}.${D}.0${B} <${+x + 1}.0.0-0` : j ? (r("replaceCaret pr", j), x === "0" ? D === "0" ? L = `>=${x}.${D}.${C}-${j} <${x}.${D}.${+C + 1}-0` : L = `>=${x}.${D}.${C}-${j} <${x}.${+D + 1}.0-0` : L = `>=${x}.${D}.${C}-${j} <${+x + 1}.0.0-0`) : (r("no pr"), x === "0" ? D === "0" ? L = `>=${x}.${D}.${C}${B} <${x}.${D}.${+C + 1}-0` : L = `>=${x}.${D}.${C}${B} <${x}.${+D + 1}.0-0` : L = `>=${x}.${D}.${C} <${+x + 1}.0.0-0`), r("caret return", L), L;
    });
  }, $ = (z, V) => (r("replaceXRanges", z, V), z.split(/\s+/).map((Z) => O(Z, V)).join(" ")), O = (z, V) => {
    z = z.trim();
    const Z = V.loose ? o[i.XRANGELOOSE] : o[i.XRANGE];
    return z.replace(Z, (B, A, x, D, C, j) => {
      r("xRange", z, B, A, x, D, C, j);
      const L = m(x), R = L || m(D), N = R || m(C), I = N;
      return A === "=" && I && (A = ""), j = V.includePrerelease ? "-0" : "", L ? A === ">" || A === "<" ? B = "<0.0.0-0" : B = "*" : A && I ? (R && (D = 0), C = 0, A === ">" ? (A = ">=", R ? (x = +x + 1, D = 0, C = 0) : (D = +D + 1, C = 0)) : A === "<=" && (A = "<", R ? x = +x + 1 : D = +D + 1), A === "<" && (j = "-0"), B = `${A + x}.${D}.${C}${j}`) : R ? B = `>=${x}.0.0${j} <${+x + 1}.0.0-0` : N && (B = `>=${x}.${D}.0${j} <${x}.${+D + 1}.0-0`), r("xRange return", B), B;
    });
  }, T = (z, V) => (r("replaceStars", z, V), z.trim().replace(o[i.STAR], "")), k = (z, V) => (r("replaceGTE0", z, V), z.trim().replace(o[V.includePrerelease ? i.GTE0PRE : i.GTE0], "")), H = (z) => (V, Z, B, A, x, D, C, j, L, R, N, I) => (m(B) ? Z = "" : m(A) ? Z = `>=${B}.0.0${z ? "-0" : ""}` : m(x) ? Z = `>=${B}.${A}.0${z ? "-0" : ""}` : D ? Z = `>=${Z}` : Z = `>=${Z}${z ? "-0" : ""}`, m(L) ? j = "" : m(R) ? j = `<${+L + 1}.0.0-0` : m(N) ? j = `<${L}.${+R + 1}.0-0` : I ? j = `<=${L}.${R}.${N}-${I}` : z ? j = `<${L}.${R}.${+N + 1}-0` : j = `<=${j}`, `${Z} ${j}`.trim()), U = (z, V, Z) => {
    for (let B = 0; B < z.length; B++)
      if (!z[B].test(V))
        return !1;
    if (V.prerelease.length && !Z.includePrerelease) {
      for (let B = 0; B < z.length; B++)
        if (r(z[B].semver), z[B].semver !== s.ANY && z[B].semver.prerelease.length > 0) {
          const A = z[B].semver;
          if (A.major === V.major && A.minor === V.minor && A.patch === V.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Sn;
}
var wn, oa;
function $r() {
  if (oa) return wn;
  oa = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(d, E) {
      if (E = a(E), d instanceof t) {
        if (d.loose === !!E.loose)
          return d;
        d = d.value;
      }
      d = d.trim().split(/\s+/).join(" "), r("comparator", d, E), this.options = E, this.loose = !!E.loose, this.parse(d), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, r("comp", this);
    }
    parse(d) {
      const E = this.options.loose ? n[c.COMPARATORLOOSE] : n[c.COMPARATOR], g = d.match(E);
      if (!g)
        throw new TypeError(`Invalid comparator: ${d}`);
      this.operator = g[1] !== void 0 ? g[1] : "", this.operator === "=" && (this.operator = ""), g[2] ? this.semver = new l(g[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(d) {
      if (r("Comparator.test", d, this.options.loose), this.semver === e || d === e)
        return !0;
      if (typeof d == "string")
        try {
          d = new l(d, this.options);
        } catch {
          return !1;
        }
      return s(d, this.operator, this.semver, this.options);
    }
    intersects(d, E) {
      if (!(d instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new o(d.value, E).test(this.value) : d.operator === "" ? d.value === "" ? !0 : new o(this.value, E).test(d.semver) : (E = a(E), E.includePrerelease && (this.value === "<0.0.0-0" || d.value === "<0.0.0-0") || !E.includePrerelease && (this.value.startsWith("<0.0.0") || d.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && d.operator.startsWith(">") || this.operator.startsWith("<") && d.operator.startsWith("<") || this.semver.version === d.semver.version && this.operator.includes("=") && d.operator.includes("=") || s(this.semver, "<", d.semver, E) && this.operator.startsWith(">") && d.operator.startsWith("<") || s(this.semver, ">", d.semver, E) && this.operator.startsWith("<") && d.operator.startsWith(">")));
    }
  }
  wn = t;
  const a = Ci(), { safeRe: n, t: c } = st(), s = jc(), r = Sr(), l = Ee(), o = Ne();
  return wn;
}
var $n, aa;
function br() {
  if (aa) return $n;
  aa = 1;
  const e = Ne();
  return $n = (a, n, c) => {
    try {
      n = new e(n, c);
    } catch {
      return !1;
    }
    return n.test(a);
  }, $n;
}
var bn, ca;
function Bf() {
  if (ca) return bn;
  ca = 1;
  const e = Ne();
  return bn = (a, n) => new e(a, n).set.map((c) => c.map((s) => s.value).join(" ").trim().split(" ")), bn;
}
var Rn, ua;
function Hf() {
  if (ua) return Rn;
  ua = 1;
  const e = Ee(), t = Ne();
  return Rn = (n, c, s) => {
    let r = null, l = null, o = null;
    try {
      o = new t(c, s);
    } catch {
      return null;
    }
    return n.forEach((i) => {
      o.test(i) && (!r || l.compare(i) === -1) && (r = i, l = new e(r, s));
    }), r;
  }, Rn;
}
var On, fa;
function Wf() {
  if (fa) return On;
  fa = 1;
  const e = Ee(), t = Ne();
  return On = (n, c, s) => {
    let r = null, l = null, o = null;
    try {
      o = new t(c, s);
    } catch {
      return null;
    }
    return n.forEach((i) => {
      o.test(i) && (!r || l.compare(i) === 1) && (r = i, l = new e(r, s));
    }), r;
  }, On;
}
var In, la;
function Kf() {
  if (la) return In;
  la = 1;
  const e = Ee(), t = Ne(), a = wr();
  return In = (c, s) => {
    c = new t(c, s);
    let r = new e("0.0.0");
    if (c.test(r) || (r = new e("0.0.0-0"), c.test(r)))
      return r;
    r = null;
    for (let l = 0; l < c.set.length; ++l) {
      const o = c.set[l];
      let i = null;
      o.forEach((d) => {
        const E = new e(d.semver.version);
        switch (d.operator) {
          case ">":
            E.prerelease.length === 0 ? E.patch++ : E.prerelease.push(0), E.raw = E.format();
          /* fallthrough */
          case "":
          case ">=":
            (!i || a(E, i)) && (i = E);
            break;
          case "<":
          case "<=":
            break;
          /* istanbul ignore next */
          default:
            throw new Error(`Unexpected operation: ${d.operator}`);
        }
      }), i && (!r || a(r, i)) && (r = i);
    }
    return r && c.test(r) ? r : null;
  }, In;
}
var Nn, da;
function Xf() {
  if (da) return Nn;
  da = 1;
  const e = Ne();
  return Nn = (a, n) => {
    try {
      return new e(a, n).range || "*";
    } catch {
      return null;
    }
  }, Nn;
}
var Pn, ha;
function qi() {
  if (ha) return Pn;
  ha = 1;
  const e = Ee(), t = $r(), { ANY: a } = t, n = Ne(), c = br(), s = wr(), r = Li(), l = Fi(), o = Ai();
  return Pn = (d, E, g, p) => {
    d = new e(d, p), E = new n(E, p);
    let w, b, f, h, u;
    switch (g) {
      case ">":
        w = s, b = l, f = r, h = ">", u = ">=";
        break;
      case "<":
        w = r, b = o, f = s, h = "<", u = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (c(d, E, p))
      return !1;
    for (let m = 0; m < E.set.length; ++m) {
      const y = E.set[m];
      let v = null, _ = null;
      if (y.forEach((S) => {
        S.semver === a && (S = new t(">=0.0.0")), v = v || S, _ = _ || S, w(S.semver, v.semver, p) ? v = S : f(S.semver, _.semver, p) && (_ = S);
      }), v.operator === h || v.operator === u || (!_.operator || _.operator === h) && b(d, _.semver))
        return !1;
      if (_.operator === u && f(d, _.semver))
        return !1;
    }
    return !0;
  }, Pn;
}
var Tn, ma;
function Zf() {
  if (ma) return Tn;
  ma = 1;
  const e = qi();
  return Tn = (a, n, c) => e(a, n, ">", c), Tn;
}
var Cn, pa;
function Jf() {
  if (pa) return Cn;
  pa = 1;
  const e = qi();
  return Cn = (a, n, c) => e(a, n, "<", c), Cn;
}
var Dn, ya;
function Yf() {
  if (ya) return Dn;
  ya = 1;
  const e = Ne();
  return Dn = (a, n, c) => (a = new e(a, c), n = new e(n, c), a.intersects(n, c)), Dn;
}
var Ln, va;
function Qf() {
  if (va) return Ln;
  va = 1;
  const e = br(), t = Ie();
  return Ln = (a, n, c) => {
    const s = [];
    let r = null, l = null;
    const o = a.sort((g, p) => t(g, p, c));
    for (const g of o)
      e(g, n, c) ? (l = g, r || (r = g)) : (l && s.push([r, l]), l = null, r = null);
    r && s.push([r, null]);
    const i = [];
    for (const [g, p] of s)
      g === p ? i.push(g) : !p && g === o[0] ? i.push("*") : p ? g === o[0] ? i.push(`<=${p}`) : i.push(`${g} - ${p}`) : i.push(`>=${g}`);
    const d = i.join(" || "), E = typeof n.raw == "string" ? n.raw : String(n);
    return d.length < E.length ? d : n;
  }, Ln;
}
var An, Ea;
function el() {
  if (Ea) return An;
  Ea = 1;
  const e = Ne(), t = $r(), { ANY: a } = t, n = br(), c = Ie(), s = (E, g, p = {}) => {
    if (E === g)
      return !0;
    E = new e(E, p), g = new e(g, p);
    let w = !1;
    e: for (const b of E.set) {
      for (const f of g.set) {
        const h = o(b, f, p);
        if (w = w || h !== null, h)
          continue e;
      }
      if (w)
        return !1;
    }
    return !0;
  }, r = [new t(">=0.0.0-0")], l = [new t(">=0.0.0")], o = (E, g, p) => {
    if (E === g)
      return !0;
    if (E.length === 1 && E[0].semver === a) {
      if (g.length === 1 && g[0].semver === a)
        return !0;
      p.includePrerelease ? E = r : E = l;
    }
    if (g.length === 1 && g[0].semver === a) {
      if (p.includePrerelease)
        return !0;
      g = l;
    }
    const w = /* @__PURE__ */ new Set();
    let b, f;
    for (const $ of E)
      $.operator === ">" || $.operator === ">=" ? b = i(b, $, p) : $.operator === "<" || $.operator === "<=" ? f = d(f, $, p) : w.add($.semver);
    if (w.size > 1)
      return null;
    let h;
    if (b && f) {
      if (h = c(b.semver, f.semver, p), h > 0)
        return null;
      if (h === 0 && (b.operator !== ">=" || f.operator !== "<="))
        return null;
    }
    for (const $ of w) {
      if (b && !n($, String(b), p) || f && !n($, String(f), p))
        return null;
      for (const O of g)
        if (!n($, String(O), p))
          return !1;
      return !0;
    }
    let u, m, y, v, _ = f && !p.includePrerelease && f.semver.prerelease.length ? f.semver : !1, S = b && !p.includePrerelease && b.semver.prerelease.length ? b.semver : !1;
    _ && _.prerelease.length === 1 && f.operator === "<" && _.prerelease[0] === 0 && (_ = !1);
    for (const $ of g) {
      if (v = v || $.operator === ">" || $.operator === ">=", y = y || $.operator === "<" || $.operator === "<=", b) {
        if (S && $.semver.prerelease && $.semver.prerelease.length && $.semver.major === S.major && $.semver.minor === S.minor && $.semver.patch === S.patch && (S = !1), $.operator === ">" || $.operator === ">=") {
          if (u = i(b, $, p), u === $ && u !== b)
            return !1;
        } else if (b.operator === ">=" && !n(b.semver, String($), p))
          return !1;
      }
      if (f) {
        if (_ && $.semver.prerelease && $.semver.prerelease.length && $.semver.major === _.major && $.semver.minor === _.minor && $.semver.patch === _.patch && (_ = !1), $.operator === "<" || $.operator === "<=") {
          if (m = d(f, $, p), m === $ && m !== f)
            return !1;
        } else if (f.operator === "<=" && !n(f.semver, String($), p))
          return !1;
      }
      if (!$.operator && (f || b) && h !== 0)
        return !1;
    }
    return !(b && y && !f && h !== 0 || f && v && !b && h !== 0 || S || _);
  }, i = (E, g, p) => {
    if (!E)
      return g;
    const w = c(E.semver, g.semver, p);
    return w > 0 ? E : w < 0 || g.operator === ">" && E.operator === ">=" ? g : E;
  }, d = (E, g, p) => {
    if (!E)
      return g;
    const w = c(E.semver, g.semver, p);
    return w < 0 ? E : w > 0 || g.operator === "<" && E.operator === "<=" ? g : E;
  };
  return An = s, An;
}
var Fn, ga;
function tl() {
  if (ga) return Fn;
  ga = 1;
  const e = st(), t = _r(), a = Ee(), n = Fc(), c = He(), s = Cf(), r = Df(), l = Lf(), o = Af(), i = Ff(), d = qf(), E = kf(), g = jf(), p = Ie(), w = Mf(), b = xf(), f = Di(), h = Uf(), u = zf(), m = wr(), y = Li(), v = qc(), _ = kc(), S = Ai(), $ = Fi(), O = jc(), T = Vf(), k = $r(), H = Ne(), U = br(), z = Bf(), V = Hf(), Z = Wf(), B = Kf(), A = Xf(), x = qi(), D = Zf(), C = Jf(), j = Yf(), L = Qf(), R = el();
  return Fn = {
    parse: c,
    valid: s,
    clean: r,
    inc: l,
    diff: o,
    major: i,
    minor: d,
    patch: E,
    prerelease: g,
    compare: p,
    rcompare: w,
    compareLoose: b,
    compareBuild: f,
    sort: h,
    rsort: u,
    gt: m,
    lt: y,
    eq: v,
    neq: _,
    gte: S,
    lte: $,
    cmp: O,
    coerce: T,
    Comparator: k,
    Range: H,
    satisfies: U,
    toComparators: z,
    maxSatisfying: V,
    minSatisfying: Z,
    minVersion: B,
    validRange: A,
    outside: x,
    gtr: D,
    ltr: C,
    intersects: j,
    simplifyRange: L,
    subset: R,
    SemVer: a,
    re: e.re,
    src: e.src,
    tokens: e.t,
    SEMVER_SPEC_VERSION: t.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: t.RELEASE_TYPES,
    compareIdentifiers: n.compareIdentifiers,
    rcompareIdentifiers: n.rcompareIdentifiers
  }, Fn;
}
var Qe = { exports: {} }, cr = { exports: {} }, _a;
function rl() {
  if (_a) return cr.exports;
  _a = 1;
  const e = (t, a) => {
    for (const n of Reflect.ownKeys(a))
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(a, n));
    return t;
  };
  return cr.exports = e, cr.exports.default = e, cr.exports;
}
var Sa;
function nl() {
  if (Sa) return Qe.exports;
  Sa = 1;
  const e = rl(), t = /* @__PURE__ */ new WeakMap(), a = (n, c = {}) => {
    if (typeof n != "function")
      throw new TypeError("Expected a function");
    let s, r = 0;
    const l = n.displayName || n.name || "<anonymous>", o = function(...i) {
      if (t.set(o, ++r), r === 1)
        s = n.apply(this, i), n = null;
      else if (c.throw === !0)
        throw new Error(`Function \`${l}\` can only be called once`);
      return s;
    };
    return e(o, n), t.set(o, r), o;
  };
  return Qe.exports = a, Qe.exports.default = a, Qe.exports.callCount = (n) => {
    if (!t.has(n))
      throw new Error(`The given function \`${n.name}\` is not wrapped by the \`onetime\` package`);
    return t.get(n);
  }, Qe.exports;
}
var ur = rt.exports, wa;
function il() {
  return wa || (wa = 1, function(e, t) {
    var a = ur && ur.__classPrivateFieldSet || function(B, A, x, D, C) {
      if (D === "m") throw new TypeError("Private method is not writable");
      if (D === "a" && !C) throw new TypeError("Private accessor was defined without a setter");
      if (typeof A == "function" ? B !== A || !C : !A.has(B)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return D === "a" ? C.call(B, x) : C ? C.value = x : A.set(B, x), x;
    }, n = ur && ur.__classPrivateFieldGet || function(B, A, x, D) {
      if (x === "a" && !D) throw new TypeError("Private accessor was defined without a getter");
      if (typeof A == "function" ? B !== A || !D : !A.has(B)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return x === "m" ? D : x === "a" ? D.call(B) : D ? D.value : A.get(B);
    }, c, s, r, l, o, i;
    Object.defineProperty(t, "__esModule", { value: !0 });
    const d = Ii, E = Be, g = ue, p = wc, w = $c, b = Xc, f = ru(), h = uu(), u = fu(), m = Eu(), y = Ac(), v = Nf(), _ = Tf(), S = tl(), $ = nl(), O = "aes-256-cbc", T = () => /* @__PURE__ */ Object.create(null), k = (B) => B != null;
    let H = "";
    try {
      delete require.cache[__filename], H = g.dirname((s = (c = e.parent) === null || c === void 0 ? void 0 : c.filename) !== null && s !== void 0 ? s : ".");
    } catch {
    }
    const U = (B, A) => {
      const x = /* @__PURE__ */ new Set([
        "undefined",
        "symbol",
        "function"
      ]), D = typeof A;
      if (x.has(D))
        throw new TypeError(`Setting a value of type \`${D}\` for key \`${B}\` is not allowed as it's not supported by JSON`);
    }, z = "__internal__", V = `${z}.migrations.version`;
    class Z {
      constructor(A = {}) {
        var x;
        r.set(this, void 0), l.set(this, void 0), o.set(this, void 0), i.set(this, {}), this._deserialize = (N) => JSON.parse(N), this._serialize = (N) => JSON.stringify(N, void 0, "	");
        const D = {
          configName: "config",
          fileExtension: "json",
          projectSuffix: "nodejs",
          clearInvalidConfig: !1,
          accessPropertiesByDotNotation: !0,
          configFileMode: 438,
          ...A
        }, C = $(() => {
          const N = h.sync({ cwd: H }), I = N && JSON.parse(E.readFileSync(N, "utf8"));
          return I ?? {};
        });
        if (!D.cwd) {
          if (D.projectName || (D.projectName = C().name), !D.projectName)
            throw new Error("Project name could not be inferred. Please specify the `projectName` option.");
          D.cwd = u(D.projectName, { suffix: D.projectSuffix }).config;
        }
        if (a(this, o, D, "f"), D.schema) {
          if (typeof D.schema != "object")
            throw new TypeError("The `schema` option must be an object.");
          const N = new y.default({
            allErrors: !0,
            useDefaults: !0
          });
          (0, v.default)(N);
          const I = {
            type: "object",
            properties: D.schema
          };
          a(this, r, N.compile(I), "f");
          for (const [K, W] of Object.entries(D.schema))
            W?.default && (n(this, i, "f")[K] = W.default);
        }
        D.defaults && a(this, i, {
          ...n(this, i, "f"),
          ...D.defaults
        }, "f"), D.serialize && (this._serialize = D.serialize), D.deserialize && (this._deserialize = D.deserialize), this.events = new b.EventEmitter(), a(this, l, D.encryptionKey, "f");
        const j = D.fileExtension ? `.${D.fileExtension}` : "";
        this.path = g.resolve(D.cwd, `${(x = D.configName) !== null && x !== void 0 ? x : "config"}${j}`);
        const L = this.store, R = Object.assign(T(), D.defaults, L);
        this._validate(R);
        try {
          w.deepEqual(L, R);
        } catch {
          this.store = R;
        }
        if (D.watch && this._watch(), D.migrations) {
          if (D.projectVersion || (D.projectVersion = C().version), !D.projectVersion)
            throw new Error("Project version could not be inferred. Please specify the `projectVersion` option.");
          this._migrate(D.migrations, D.projectVersion, D.beforeEachMigration);
        }
      }
      get(A, x) {
        if (n(this, o, "f").accessPropertiesByDotNotation)
          return this._get(A, x);
        const { store: D } = this;
        return A in D ? D[A] : x;
      }
      set(A, x) {
        if (typeof A != "string" && typeof A != "object")
          throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof A}`);
        if (typeof A != "object" && x === void 0)
          throw new TypeError("Use `delete()` to clear values");
        if (this._containsReservedKey(A))
          throw new TypeError(`Please don't use the ${z} key, as it's used to manage this module internal operations.`);
        const { store: D } = this, C = (j, L) => {
          U(j, L), n(this, o, "f").accessPropertiesByDotNotation ? f.set(D, j, L) : D[j] = L;
        };
        if (typeof A == "object") {
          const j = A;
          for (const [L, R] of Object.entries(j))
            C(L, R);
        } else
          C(A, x);
        this.store = D;
      }
      /**
      		    Check if an item exists.
      
      		    @param key - The key of the item to check.
      		    */
      has(A) {
        return n(this, o, "f").accessPropertiesByDotNotation ? f.has(this.store, A) : A in this.store;
      }
      /**
      		    Reset items to their default values, as defined by the `defaults` or `schema` option.
      
      		    @see `clear()` to reset all items.
      
      		    @param keys - The keys of the items to reset.
      		    */
      reset(...A) {
        for (const x of A)
          k(n(this, i, "f")[x]) && this.set(x, n(this, i, "f")[x]);
      }
      /**
      		    Delete an item.
      
      		    @param key - The key of the item to delete.
      		    */
      delete(A) {
        const { store: x } = this;
        n(this, o, "f").accessPropertiesByDotNotation ? f.delete(x, A) : delete x[A], this.store = x;
      }
      /**
      		    Delete all items.
      
      		    This resets known items to their default values, if defined by the `defaults` or `schema` option.
      		    */
      clear() {
        this.store = T();
        for (const A of Object.keys(n(this, i, "f")))
          this.reset(A);
      }
      /**
      		    Watches the given `key`, calling `callback` on any changes.
      
      		    @param key - The key wo watch.
      		    @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
      		    @returns A function, that when called, will unsubscribe.
      		    */
      onDidChange(A, x) {
        if (typeof A != "string")
          throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof A}`);
        if (typeof x != "function")
          throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof x}`);
        return this._handleChange(() => this.get(A), x);
      }
      /**
      		    Watches the whole config object, calling `callback` on any changes.
      
      		    @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
      		    @returns A function, that when called, will unsubscribe.
      		    */
      onDidAnyChange(A) {
        if (typeof A != "function")
          throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof A}`);
        return this._handleChange(() => this.store, A);
      }
      get size() {
        return Object.keys(this.store).length;
      }
      get store() {
        try {
          const A = E.readFileSync(this.path, n(this, l, "f") ? null : "utf8"), x = this._encryptData(A), D = this._deserialize(x);
          return this._validate(D), Object.assign(T(), D);
        } catch (A) {
          if (A?.code === "ENOENT")
            return this._ensureDirectory(), T();
          if (n(this, o, "f").clearInvalidConfig && A.name === "SyntaxError")
            return T();
          throw A;
        }
      }
      set store(A) {
        this._ensureDirectory(), this._validate(A), this._write(A), this.events.emit("change");
      }
      *[(r = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap(), Symbol.iterator)]() {
        for (const [A, x] of Object.entries(this.store))
          yield [A, x];
      }
      _encryptData(A) {
        if (!n(this, l, "f"))
          return A.toString();
        try {
          if (n(this, l, "f"))
            try {
              if (A.slice(16, 17).toString() === ":") {
                const x = A.slice(0, 16), D = p.pbkdf2Sync(n(this, l, "f"), x.toString(), 1e4, 32, "sha512"), C = p.createDecipheriv(O, D, x);
                A = Buffer.concat([C.update(Buffer.from(A.slice(17))), C.final()]).toString("utf8");
              } else {
                const x = p.createDecipher(O, n(this, l, "f"));
                A = Buffer.concat([x.update(Buffer.from(A)), x.final()]).toString("utf8");
              }
            } catch {
            }
        } catch {
        }
        return A.toString();
      }
      _handleChange(A, x) {
        let D = A();
        const C = () => {
          const j = D, L = A();
          (0, d.isDeepStrictEqual)(L, j) || (D = L, x.call(this, L, j));
        };
        return this.events.on("change", C), () => this.events.removeListener("change", C);
      }
      _validate(A) {
        if (!n(this, r, "f") || n(this, r, "f").call(this, A) || !n(this, r, "f").errors)
          return;
        const D = n(this, r, "f").errors.map(({ instancePath: C, message: j = "" }) => `\`${C.slice(1)}\` ${j}`);
        throw new Error("Config schema violation: " + D.join("; "));
      }
      _ensureDirectory() {
        E.mkdirSync(g.dirname(this.path), { recursive: !0 });
      }
      _write(A) {
        let x = this._serialize(A);
        if (n(this, l, "f")) {
          const D = p.randomBytes(16), C = p.pbkdf2Sync(n(this, l, "f"), D.toString(), 1e4, 32, "sha512"), j = p.createCipheriv(O, C, D);
          x = Buffer.concat([D, Buffer.from(":"), j.update(Buffer.from(x)), j.final()]);
        }
        if (process.env.SNAP)
          E.writeFileSync(this.path, x, { mode: n(this, o, "f").configFileMode });
        else
          try {
            m.writeFileSync(this.path, x, { mode: n(this, o, "f").configFileMode });
          } catch (D) {
            if (D?.code === "EXDEV") {
              E.writeFileSync(this.path, x, { mode: n(this, o, "f").configFileMode });
              return;
            }
            throw D;
          }
      }
      _watch() {
        this._ensureDirectory(), E.existsSync(this.path) || this._write(T()), process.platform === "win32" ? E.watch(this.path, { persistent: !1 }, _(() => {
          this.events.emit("change");
        }, { wait: 100 })) : E.watchFile(this.path, { persistent: !1 }, _(() => {
          this.events.emit("change");
        }, { wait: 5e3 }));
      }
      _migrate(A, x, D) {
        let C = this._get(V, "0.0.0");
        const j = Object.keys(A).filter((R) => this._shouldPerformMigration(R, C, x));
        let L = { ...this.store };
        for (const R of j)
          try {
            D && D(this, {
              fromVersion: C,
              toVersion: R,
              finalVersion: x,
              versions: j
            });
            const N = A[R];
            N(this), this._set(V, R), C = R, L = { ...this.store };
          } catch (N) {
            throw this.store = L, new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${N}`);
          }
        (this._isVersionInRangeFormat(C) || !S.eq(C, x)) && this._set(V, x);
      }
      _containsReservedKey(A) {
        return typeof A == "object" && Object.keys(A)[0] === z ? !0 : typeof A != "string" ? !1 : n(this, o, "f").accessPropertiesByDotNotation ? !!A.startsWith(`${z}.`) : !1;
      }
      _isVersionInRangeFormat(A) {
        return S.clean(A) === null;
      }
      _shouldPerformMigration(A, x, D) {
        return this._isVersionInRangeFormat(A) ? x !== "0.0.0" && S.satisfies(x, A) ? !1 : S.satisfies(D, A) : !(S.lte(A, x) || S.gt(A, D));
      }
      _get(A, x) {
        return f.get(this.store, A, x);
      }
      _set(A, x) {
        const { store: D } = this;
        f.set(D, A, x), this.store = D;
      }
    }
    t.default = Z, e.exports = Z, e.exports.default = Z;
  }(rt, rt.exports)), rt.exports;
}
var qn, $a;
function sl() {
  if ($a) return qn;
  $a = 1;
  const e = ue, { app: t, ipcMain: a, ipcRenderer: n, shell: c } = Bc, s = il();
  let r = !1;
  const l = () => {
    if (!a || !t)
      throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
    const i = {
      defaultCwd: t.getPath("userData"),
      appVersion: t.getVersion()
    };
    return r || (a.on("electron-store-get-data", (d) => {
      d.returnValue = i;
    }), r = !0), i;
  };
  class o extends s {
    constructor(d) {
      let E, g;
      if (n) {
        const p = n.sendSync("electron-store-get-data");
        if (!p)
          throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
        ({ defaultCwd: E, appVersion: g } = p);
      } else a && t && ({ defaultCwd: E, appVersion: g } = l());
      d = {
        name: "config",
        ...d
      }, d.projectVersion || (d.projectVersion = g), d.cwd ? d.cwd = e.isAbsolute(d.cwd) ? d.cwd : e.join(E, d.cwd) : d.cwd = E, d.configName = d.name, delete d.name, super(d);
    }
    static initRenderer() {
      l();
    }
    async openInEditor() {
      const d = await c.openPath(this.path);
      if (d)
        throw new Error(d);
    }
  }
  return qn = o, qn;
}
var ol = /* @__PURE__ */ sl();
const ba = /* @__PURE__ */ Rc(ol);
var Ue = { exports: {} }, kn, Ra;
function Mc() {
  return Ra || (Ra = 1, kn = {
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
  }), kn;
}
var jn = {}, Oa;
function ki() {
  return Oa || (Oa = 1, function(e) {
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
    function a(n) {
      return function(...c) {
        return c.length && (n = n.replace(/\{(\d)\}/g, (s, r) => c[r] || "")), new Error("ADM-ZIP: " + n);
      };
    }
    for (const n of Object.keys(t))
      e[n] = a(t[n]);
  }(jn)), jn;
}
var Mn, Ia;
function al() {
  if (Ia) return Mn;
  Ia = 1;
  const e = Be, t = ue, a = Mc(), n = ki(), c = typeof process == "object" && process.platform === "win32", s = (o) => typeof o == "object" && o !== null, r = new Uint32Array(256).map((o, i) => {
    for (let d = 0; d < 8; d++)
      i & 1 ? i = 3988292384 ^ i >>> 1 : i >>>= 1;
    return i >>> 0;
  });
  function l(o) {
    this.sep = t.sep, this.fs = e, s(o) && s(o.fs) && typeof o.fs.statSync == "function" && (this.fs = o.fs);
  }
  return Mn = l, l.prototype.makeDir = function(o) {
    const i = this;
    function d(E) {
      let g = E.split(i.sep)[0];
      E.split(i.sep).forEach(function(p) {
        if (!(!p || p.substr(-1, 1) === ":")) {
          g += i.sep + p;
          var w;
          try {
            w = i.fs.statSync(g);
          } catch {
            i.fs.mkdirSync(g);
          }
          if (w && w.isFile()) throw n.FILE_IN_THE_WAY(`"${g}"`);
        }
      });
    }
    d(o);
  }, l.prototype.writeFileTo = function(o, i, d, E) {
    const g = this;
    if (g.fs.existsSync(o)) {
      if (!d) return !1;
      var p = g.fs.statSync(o);
      if (p.isDirectory())
        return !1;
    }
    var w = t.dirname(o);
    g.fs.existsSync(w) || g.makeDir(w);
    var b;
    try {
      b = g.fs.openSync(o, "w", 438);
    } catch {
      g.fs.chmodSync(o, 438), b = g.fs.openSync(o, "w", 438);
    }
    if (b)
      try {
        g.fs.writeSync(b, i, 0, i.length, 0);
      } finally {
        g.fs.closeSync(b);
      }
    return g.fs.chmodSync(o, E || 438), !0;
  }, l.prototype.writeFileToAsync = function(o, i, d, E, g) {
    typeof E == "function" && (g = E, E = void 0);
    const p = this;
    p.fs.exists(o, function(w) {
      if (w && !d) return g(!1);
      p.fs.stat(o, function(b, f) {
        if (w && f.isDirectory())
          return g(!1);
        var h = t.dirname(o);
        p.fs.exists(h, function(u) {
          u || p.makeDir(h), p.fs.open(o, "w", 438, function(m, y) {
            m ? p.fs.chmod(o, 438, function() {
              p.fs.open(o, "w", 438, function(v, _) {
                p.fs.write(_, i, 0, i.length, 0, function() {
                  p.fs.close(_, function() {
                    p.fs.chmod(o, E || 438, function() {
                      g(!0);
                    });
                  });
                });
              });
            }) : y ? p.fs.write(y, i, 0, i.length, 0, function() {
              p.fs.close(y, function() {
                p.fs.chmod(o, E || 438, function() {
                  g(!0);
                });
              });
            }) : p.fs.chmod(o, E || 438, function() {
              g(!0);
            });
          });
        });
      });
    });
  }, l.prototype.findFiles = function(o) {
    const i = this;
    function d(E, g, p) {
      let w = [];
      return i.fs.readdirSync(E).forEach(function(b) {
        const f = t.join(E, b), h = i.fs.statSync(f);
        w.push(t.normalize(f) + (h.isDirectory() ? i.sep : "")), h.isDirectory() && p && (w = w.concat(d(f, g, p)));
      }), w;
    }
    return d(o, void 0, !0);
  }, l.prototype.findFilesAsync = function(o, i) {
    const d = this;
    let E = [];
    d.fs.readdir(o, function(g, p) {
      if (g) return i(g);
      let w = p.length;
      if (!w) return i(null, E);
      p.forEach(function(b) {
        b = t.join(o, b), d.fs.stat(b, function(f, h) {
          if (f) return i(f);
          h && (E.push(t.normalize(b) + (h.isDirectory() ? d.sep : "")), h.isDirectory() ? d.findFilesAsync(b, function(u, m) {
            if (u) return i(u);
            E = E.concat(m), --w || i(null, E);
          }) : --w || i(null, E));
        });
      });
    });
  }, l.prototype.getAttributes = function() {
  }, l.prototype.setAttributes = function() {
  }, l.crc32update = function(o, i) {
    return r[(o ^ i) & 255] ^ o >>> 8;
  }, l.crc32 = function(o) {
    typeof o == "string" && (o = Buffer.from(o, "utf8"));
    let i = o.length, d = -1;
    for (let E = 0; E < i; ) d = l.crc32update(d, o[E++]);
    return ~d >>> 0;
  }, l.methodToString = function(o) {
    switch (o) {
      case a.STORED:
        return "STORED (" + o + ")";
      case a.DEFLATED:
        return "DEFLATED (" + o + ")";
      default:
        return "UNSUPPORTED (" + o + ")";
    }
  }, l.canonical = function(o) {
    if (!o) return "";
    const i = t.posix.normalize("/" + o.split("\\").join("/"));
    return t.join(".", i);
  }, l.zipnamefix = function(o) {
    if (!o) return "";
    const i = t.posix.normalize("/" + o.split("\\").join("/"));
    return t.posix.join(".", i);
  }, l.findLast = function(o, i) {
    if (!Array.isArray(o)) throw new TypeError("arr is not array");
    const d = o.length >>> 0;
    for (let E = d - 1; E >= 0; E--)
      if (i(o[E], E, o))
        return o[E];
  }, l.sanitize = function(o, i) {
    o = t.resolve(t.normalize(o));
    for (var d = i.split("/"), E = 0, g = d.length; E < g; E++) {
      var p = t.normalize(t.join(o, d.slice(E, g).join(t.sep)));
      if (p.indexOf(o) === 0)
        return p;
    }
    return t.normalize(t.join(o, t.basename(i)));
  }, l.toBuffer = function(i, d) {
    return Buffer.isBuffer(i) ? i : i instanceof Uint8Array ? Buffer.from(i) : typeof i == "string" ? d(i) : Buffer.alloc(0);
  }, l.readBigUInt64LE = function(o, i) {
    var d = Buffer.from(o.slice(i, i + 8));
    return d.swap64(), parseInt(`0x${d.toString("hex")}`);
  }, l.fromDOS2Date = function(o) {
    return new Date((o >> 25 & 127) + 1980, Math.max((o >> 21 & 15) - 1, 0), Math.max(o >> 16 & 31, 1), o >> 11 & 31, o >> 5 & 63, (o & 31) << 1);
  }, l.fromDate2DOS = function(o) {
    let i = 0, d = 0;
    return o.getFullYear() > 1979 && (i = (o.getFullYear() - 1980 & 127) << 9 | o.getMonth() + 1 << 5 | o.getDate(), d = o.getHours() << 11 | o.getMinutes() << 5 | o.getSeconds() >> 1), i << 16 | d;
  }, l.isWin = c, l.crcTable = r, Mn;
}
var xn, Na;
function cl() {
  if (Na) return xn;
  Na = 1;
  const e = ue;
  return xn = function(t, { fs: a }) {
    var n = t || "", c = r(), s = null;
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
    return n && a.existsSync(n) ? (s = a.statSync(n), c.directory = s.isDirectory(), c.mtime = s.mtime, c.atime = s.atime, c.executable = (73 & s.mode) !== 0, c.readonly = (128 & s.mode) === 0, c.hidden = e.basename(n)[0] === ".") : console.warn("Invalid path: " + n), {
      get directory() {
        return c.directory;
      },
      get readOnly() {
        return c.readonly;
      },
      get hidden() {
        return c.hidden;
      },
      get mtime() {
        return c.mtime;
      },
      get atime() {
        return c.atime;
      },
      get executable() {
        return c.executable;
      },
      decodeAttributes: function() {
      },
      encodeAttributes: function() {
      },
      toJSON: function() {
        return {
          path: n,
          isDirectory: c.directory,
          isReadOnly: c.readonly,
          isHidden: c.hidden,
          isExecutable: c.executable,
          mTime: c.mtime,
          aTime: c.atime
        };
      },
      toString: function() {
        return JSON.stringify(this.toJSON(), null, "	");
      }
    };
  }, xn;
}
var Un, Pa;
function ul() {
  return Pa || (Pa = 1, Un = {
    efs: !0,
    encode: (e) => Buffer.from(e, "utf8"),
    decode: (e) => e.toString("utf8")
  }), Un;
}
var Ta;
function ot() {
  return Ta || (Ta = 1, Ue.exports = al(), Ue.exports.Constants = Mc(), Ue.exports.Errors = ki(), Ue.exports.FileAttr = cl(), Ue.exports.decoder = ul()), Ue.exports;
}
var fr = {}, zn, Ca;
function fl() {
  if (Ca) return zn;
  Ca = 1;
  var e = ot(), t = e.Constants;
  return zn = function() {
    var a = 20, n = 10, c = 0, s = 0, r = 0, l = 0, o = 0, i = 0, d = 0, E = 0, g = 0, p = 0, w = 0, b = 0, f = 0;
    a |= e.isWin ? 2560 : 768, c |= t.FLG_EFS;
    const h = {
      extraLen: 0
    }, u = (y) => Math.max(0, y) >>> 0, m = (y) => Math.max(0, y) & 255;
    return r = e.fromDate2DOS(/* @__PURE__ */ new Date()), {
      get made() {
        return a;
      },
      set made(y) {
        a = y;
      },
      get version() {
        return n;
      },
      set version(y) {
        n = y;
      },
      get flags() {
        return c;
      },
      set flags(y) {
        c = y;
      },
      get flags_efs() {
        return (c & t.FLG_EFS) > 0;
      },
      set flags_efs(y) {
        y ? c |= t.FLG_EFS : c &= ~t.FLG_EFS;
      },
      get flags_desc() {
        return (c & t.FLG_DESC) > 0;
      },
      set flags_desc(y) {
        y ? c |= t.FLG_DESC : c &= ~t.FLG_DESC;
      },
      get method() {
        return s;
      },
      set method(y) {
        switch (y) {
          case t.STORED:
            this.version = 10;
          case t.DEFLATED:
          default:
            this.version = 20;
        }
        s = y;
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
        r = u(y);
      },
      get timeHighByte() {
        return m(r >>> 8);
      },
      get crc() {
        return l;
      },
      set crc(y) {
        l = u(y);
      },
      get compressedSize() {
        return o;
      },
      set compressedSize(y) {
        o = u(y);
      },
      get size() {
        return i;
      },
      set size(y) {
        i = u(y);
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
        p = u(y);
      },
      get inAttr() {
        return w;
      },
      set inAttr(y) {
        w = u(y);
      },
      get attr() {
        return b;
      },
      set attr(y) {
        b = u(y);
      },
      // get Unix file permissions
      get fileAttr() {
        return (b || 0) >> 16 & 4095;
      },
      get offset() {
        return f;
      },
      set offset(y) {
        f = u(y);
      },
      get encrypted() {
        return (c & t.FLG_ENC) === t.FLG_ENC;
      },
      get centralHeaderSize() {
        return t.CENHDR + d + E + g;
      },
      get realDataOffset() {
        return f + t.LOCHDR + h.fnameLen + h.extraLen;
      },
      get localHeader() {
        return h;
      },
      loadLocalHeaderFromBinary: function(y) {
        var v = y.slice(f, f + t.LOCHDR);
        if (v.readUInt32LE(0) !== t.LOCSIG)
          throw e.Errors.INVALID_LOC();
        h.version = v.readUInt16LE(t.LOCVER), h.flags = v.readUInt16LE(t.LOCFLG), h.method = v.readUInt16LE(t.LOCHOW), h.time = v.readUInt32LE(t.LOCTIM), h.crc = v.readUInt32LE(t.LOCCRC), h.compressedSize = v.readUInt32LE(t.LOCSIZ), h.size = v.readUInt32LE(t.LOCLEN), h.fnameLen = v.readUInt16LE(t.LOCNAM), h.extraLen = v.readUInt16LE(t.LOCEXT);
        const _ = f + t.LOCHDR + h.fnameLen, S = _ + h.extraLen;
        return y.slice(_, S);
      },
      loadFromBinary: function(y) {
        if (y.length !== t.CENHDR || y.readUInt32LE(0) !== t.CENSIG)
          throw e.Errors.INVALID_CEN();
        a = y.readUInt16LE(t.CENVEM), n = y.readUInt16LE(t.CENVER), c = y.readUInt16LE(t.CENFLG), s = y.readUInt16LE(t.CENHOW), r = y.readUInt32LE(t.CENTIM), l = y.readUInt32LE(t.CENCRC), o = y.readUInt32LE(t.CENSIZ), i = y.readUInt32LE(t.CENLEN), d = y.readUInt16LE(t.CENNAM), E = y.readUInt16LE(t.CENEXT), g = y.readUInt16LE(t.CENCOM), p = y.readUInt16LE(t.CENDSK), w = y.readUInt16LE(t.CENATT), b = y.readUInt32LE(t.CENATX), f = y.readUInt32LE(t.CENOFF);
      },
      localHeaderToBinary: function() {
        var y = Buffer.alloc(t.LOCHDR);
        return y.writeUInt32LE(t.LOCSIG, 0), y.writeUInt16LE(n, t.LOCVER), y.writeUInt16LE(c, t.LOCFLG), y.writeUInt16LE(s, t.LOCHOW), y.writeUInt32LE(r, t.LOCTIM), y.writeUInt32LE(l, t.LOCCRC), y.writeUInt32LE(o, t.LOCSIZ), y.writeUInt32LE(i, t.LOCLEN), y.writeUInt16LE(d, t.LOCNAM), y.writeUInt16LE(h.extraLen, t.LOCEXT), y;
      },
      centralHeaderToBinary: function() {
        var y = Buffer.alloc(t.CENHDR + d + E + g);
        return y.writeUInt32LE(t.CENSIG, 0), y.writeUInt16LE(a, t.CENVEM), y.writeUInt16LE(n, t.CENVER), y.writeUInt16LE(c, t.CENFLG), y.writeUInt16LE(s, t.CENHOW), y.writeUInt32LE(r, t.CENTIM), y.writeUInt32LE(l, t.CENCRC), y.writeUInt32LE(o, t.CENSIZ), y.writeUInt32LE(i, t.CENLEN), y.writeUInt16LE(d, t.CENNAM), y.writeUInt16LE(E, t.CENEXT), y.writeUInt16LE(g, t.CENCOM), y.writeUInt16LE(p, t.CENDSK), y.writeUInt16LE(w, t.CENATT), y.writeUInt32LE(b, t.CENATX), y.writeUInt32LE(f, t.CENOFF), y;
      },
      toJSON: function() {
        const y = function(v) {
          return v + " bytes";
        };
        return {
          made: a,
          version: n,
          flags: c,
          method: e.methodToString(s),
          time: this.time,
          crc: "0x" + l.toString(16).toUpperCase(),
          compressedSize: y(o),
          size: y(i),
          fileNameLength: y(d),
          extraLength: y(E),
          commentLength: y(g),
          diskNumStart: p,
          inAttr: w,
          attr: b,
          offset: f,
          centralHeaderSize: y(t.CENHDR + d + E + g)
        };
      },
      toString: function() {
        return JSON.stringify(this.toJSON(), null, "	");
      }
    };
  }, zn;
}
var Vn, Da;
function ll() {
  if (Da) return Vn;
  Da = 1;
  var e = ot(), t = e.Constants;
  return Vn = function() {
    var a = 0, n = 0, c = 0, s = 0, r = 0;
    return {
      get diskEntries() {
        return a;
      },
      set diskEntries(l) {
        a = n = l;
      },
      get totalEntries() {
        return n;
      },
      set totalEntries(l) {
        n = a = l;
      },
      get size() {
        return c;
      },
      set size(l) {
        c = l;
      },
      get offset() {
        return s;
      },
      set offset(l) {
        s = l;
      },
      get commentLength() {
        return r;
      },
      set commentLength(l) {
        r = l;
      },
      get mainHeaderSize() {
        return t.ENDHDR + r;
      },
      loadFromBinary: function(l) {
        if ((l.length !== t.ENDHDR || l.readUInt32LE(0) !== t.ENDSIG) && (l.length < t.ZIP64HDR || l.readUInt32LE(0) !== t.ZIP64SIG))
          throw e.Errors.INVALID_END();
        l.readUInt32LE(0) === t.ENDSIG ? (a = l.readUInt16LE(t.ENDSUB), n = l.readUInt16LE(t.ENDTOT), c = l.readUInt32LE(t.ENDSIZ), s = l.readUInt32LE(t.ENDOFF), r = l.readUInt16LE(t.ENDCOM)) : (a = e.readBigUInt64LE(l, t.ZIP64SUB), n = e.readBigUInt64LE(l, t.ZIP64TOT), c = e.readBigUInt64LE(l, t.ZIP64SIZE), s = e.readBigUInt64LE(l, t.ZIP64OFF), r = 0);
      },
      toBinary: function() {
        var l = Buffer.alloc(t.ENDHDR + r);
        return l.writeUInt32LE(t.ENDSIG, 0), l.writeUInt32LE(0, 4), l.writeUInt16LE(a, t.ENDSUB), l.writeUInt16LE(n, t.ENDTOT), l.writeUInt32LE(c, t.ENDSIZ), l.writeUInt32LE(s, t.ENDOFF), l.writeUInt16LE(r, t.ENDCOM), l.fill(" ", t.ENDHDR), l;
      },
      toJSON: function() {
        const l = function(o, i) {
          let d = o.toString(16).toUpperCase();
          for (; d.length < i; ) d = "0" + d;
          return "0x" + d;
        };
        return {
          diskEntries: a,
          totalEntries: n,
          size: c + " bytes",
          offset: l(s, 4),
          commentLength: r
        };
      },
      toString: function() {
        return JSON.stringify(this.toJSON(), null, "	");
      }
    };
  }, Vn;
}
var La;
function xc() {
  return La || (La = 1, fr.EntryHeader = fl(), fr.MainHeader = ll()), fr;
}
var et = {}, Gn, Aa;
function dl() {
  return Aa || (Aa = 1, Gn = function(e) {
    var t = bc, a = { chunkSize: (parseInt(e.length / 1024) + 1) * 1024 };
    return {
      deflate: function() {
        return t.deflateRawSync(e, a);
      },
      deflateAsync: function(n) {
        var c = t.createDeflateRaw(a), s = [], r = 0;
        c.on("data", function(l) {
          s.push(l), r += l.length;
        }), c.on("end", function() {
          var l = Buffer.alloc(r), o = 0;
          l.fill(0);
          for (var i = 0; i < s.length; i++) {
            var d = s[i];
            d.copy(l, o), o += d.length;
          }
          n && n(l);
        }), c.end(e);
      }
    };
  }), Gn;
}
var Bn, Fa;
function hl() {
  if (Fa) return Bn;
  Fa = 1;
  const e = +(process.versions ? process.versions.node : "").split(".")[0] || 0;
  return Bn = function(t, a) {
    var n = bc;
    const c = e >= 15 && a > 0 ? { maxOutputLength: a } : {};
    return {
      inflate: function() {
        return n.inflateRawSync(t, c);
      },
      inflateAsync: function(s) {
        var r = n.createInflateRaw(c), l = [], o = 0;
        r.on("data", function(i) {
          l.push(i), o += i.length;
        }), r.on("end", function() {
          var i = Buffer.alloc(o), d = 0;
          i.fill(0);
          for (var E = 0; E < l.length; E++) {
            var g = l[E];
            g.copy(i, d), d += g.length;
          }
          s && s(i);
        }), r.end(t);
      }
    };
  }, Bn;
}
var Hn, qa;
function ml() {
  if (qa) return Hn;
  qa = 1;
  const { randomFillSync: e } = wc, t = ki(), a = new Uint32Array(256).map((p, w) => {
    for (let b = 0; b < 8; b++)
      w & 1 ? w = w >>> 1 ^ 3988292384 : w >>>= 1;
    return w >>> 0;
  }), n = (p, w) => Math.imul(p, w) >>> 0, c = (p, w) => a[(p ^ w) & 255] ^ p >>> 8, s = () => typeof e == "function" ? e(Buffer.alloc(12)) : s.node();
  s.node = () => {
    const p = Buffer.alloc(12), w = p.length;
    for (let b = 0; b < w; b++) p[b] = Math.random() * 256 & 255;
    return p;
  };
  const r = {
    genSalt: s
  };
  function l(p) {
    const w = Buffer.isBuffer(p) ? p : Buffer.from(p);
    this.keys = new Uint32Array([305419896, 591751049, 878082192]);
    for (let b = 0; b < w.length; b++)
      this.updateKeys(w[b]);
  }
  l.prototype.updateKeys = function(p) {
    const w = this.keys;
    return w[0] = c(w[0], p), w[1] += w[0] & 255, w[1] = n(w[1], 134775813) + 1, w[2] = c(w[2], w[1] >>> 24), p;
  }, l.prototype.next = function() {
    const p = (this.keys[2] | 2) >>> 0;
    return n(p, p ^ 1) >> 8 & 255;
  };
  function o(p) {
    const w = new l(p);
    return function(b) {
      const f = Buffer.alloc(b.length);
      let h = 0;
      for (let u of b)
        f[h++] = w.updateKeys(u ^ w.next());
      return f;
    };
  }
  function i(p) {
    const w = new l(p);
    return function(b, f, h = 0) {
      f || (f = Buffer.alloc(b.length));
      for (let u of b) {
        const m = w.next();
        f[h++] = u ^ m, w.updateKeys(u);
      }
      return f;
    };
  }
  function d(p, w, b) {
    if (!p || !Buffer.isBuffer(p) || p.length < 12)
      return Buffer.alloc(0);
    const f = o(b), h = f(p.slice(0, 12)), u = (w.flags & 8) === 8 ? w.timeHighByte : w.crc >>> 24;
    if (h[11] !== u)
      throw t.WRONG_PASSWORD();
    return f(p.slice(12));
  }
  function E(p) {
    Buffer.isBuffer(p) && p.length >= 12 ? r.genSalt = function() {
      return p.slice(0, 12);
    } : p === "node" ? r.genSalt = s.node : r.genSalt = s;
  }
  function g(p, w, b, f = !1) {
    p == null && (p = Buffer.alloc(0)), Buffer.isBuffer(p) || (p = Buffer.from(p.toString()));
    const h = i(b), u = r.genSalt();
    u[11] = w.crc >>> 24 & 255, f && (u[10] = w.crc >>> 16 & 255);
    const m = Buffer.alloc(p.length + 12);
    return h(u, m), h(p, m, 12);
  }
  return Hn = { decrypt: d, encrypt: g, _salter: E }, Hn;
}
var ka;
function pl() {
  return ka || (ka = 1, et.Deflater = dl(), et.Inflater = hl(), et.ZipCrypto = ml()), et;
}
var Wn, ja;
function Uc() {
  if (ja) return Wn;
  ja = 1;
  var e = ot(), t = xc(), a = e.Constants, n = pl();
  return Wn = function(c, s) {
    var r = new t.EntryHeader(), l = Buffer.alloc(0), o = Buffer.alloc(0), i = !1, d = null, E = Buffer.alloc(0), g = Buffer.alloc(0), p = !0;
    const w = c, b = typeof w.decoder == "object" ? w.decoder : e.decoder;
    p = b.hasOwnProperty("efs") ? b.efs : !1;
    function f() {
      return !s || !(s instanceof Uint8Array) ? Buffer.alloc(0) : (g = r.loadLocalHeaderFromBinary(s), s.slice(r.realDataOffset, r.realDataOffset + r.compressedSize));
    }
    function h(S) {
      if (r.flags_desc) {
        const $ = {}, O = r.realDataOffset + r.compressedSize;
        if (s.readUInt32LE(O) == a.LOCSIG || s.readUInt32LE(O) == a.CENSIG)
          throw e.Errors.DESCRIPTOR_NOT_EXIST();
        if (s.readUInt32LE(O) == a.EXTSIG)
          $.crc = s.readUInt32LE(O + a.EXTCRC), $.compressedSize = s.readUInt32LE(O + a.EXTSIZ), $.size = s.readUInt32LE(O + a.EXTLEN);
        else if (s.readUInt16LE(O + 12) === 19280)
          $.crc = s.readUInt32LE(O + a.EXTCRC - 4), $.compressedSize = s.readUInt32LE(O + a.EXTSIZ - 4), $.size = s.readUInt32LE(O + a.EXTLEN - 4);
        else
          throw e.Errors.DESCRIPTOR_UNKNOWN();
        if ($.compressedSize !== r.compressedSize || $.size !== r.size || $.crc !== r.crc)
          throw e.Errors.DESCRIPTOR_FAULTY();
        if (e.crc32(S) !== $.crc)
          return !1;
      } else if (e.crc32(S) !== r.localHeader.crc)
        return !1;
      return !0;
    }
    function u(S, $, O) {
      if (typeof $ > "u" && typeof S == "string" && (O = S, S = void 0), i)
        return S && $ && $(Buffer.alloc(0), e.Errors.DIRECTORY_CONTENT_ERROR()), Buffer.alloc(0);
      var T = f();
      if (T.length === 0)
        return S && $ && $(T), T;
      if (r.encrypted) {
        if (typeof O != "string" && !Buffer.isBuffer(O))
          throw e.Errors.INVALID_PASS_PARAM();
        T = n.ZipCrypto.decrypt(T, r, O);
      }
      var k = Buffer.alloc(r.size);
      switch (r.method) {
        case e.Constants.STORED:
          if (T.copy(k), h(k))
            return S && $ && $(k), k;
          throw S && $ && $(k, e.Errors.BAD_CRC()), e.Errors.BAD_CRC();
        case e.Constants.DEFLATED:
          var H = new n.Inflater(T, r.size);
          if (S)
            H.inflateAsync(function(U) {
              U.copy(U, 0), $ && (h(U) ? $(U) : $(U, e.Errors.BAD_CRC()));
            });
          else {
            if (H.inflate(k).copy(k, 0), !h(k))
              throw e.Errors.BAD_CRC(`"${b.decode(l)}"`);
            return k;
          }
          break;
        default:
          throw S && $ && $(Buffer.alloc(0), e.Errors.UNKNOWN_METHOD()), e.Errors.UNKNOWN_METHOD();
      }
    }
    function m(S, $) {
      if ((!d || !d.length) && Buffer.isBuffer(s))
        return S && $ && $(f()), f();
      if (d.length && !i) {
        var O;
        switch (r.method) {
          case e.Constants.STORED:
            return r.compressedSize = r.size, O = Buffer.alloc(d.length), d.copy(O), S && $ && $(O), O;
          default:
          case e.Constants.DEFLATED:
            var T = new n.Deflater(d);
            if (S)
              T.deflateAsync(function(H) {
                O = Buffer.alloc(H.length), r.compressedSize = H.length, H.copy(O), $ && $(O);
              });
            else {
              var k = T.deflate();
              return r.compressedSize = k.length, k;
            }
            T = null;
            break;
        }
      } else if (S && $)
        $(Buffer.alloc(0));
      else
        return Buffer.alloc(0);
    }
    function y(S, $) {
      return (S.readUInt32LE($ + 4) << 4) + S.readUInt32LE($);
    }
    function v(S) {
      try {
        for (var $ = 0, O, T, k; $ + 4 < S.length; )
          O = S.readUInt16LE($), $ += 2, T = S.readUInt16LE($), $ += 2, k = S.slice($, $ + T), $ += T, a.ID_ZIP64 === O && _(k);
      } catch {
        throw e.Errors.EXTRA_FIELD_PARSE_ERROR();
      }
    }
    function _(S) {
      var $, O, T, k;
      S.length >= a.EF_ZIP64_SCOMP && ($ = y(S, a.EF_ZIP64_SUNCOMP), r.size === a.EF_ZIP64_OR_32 && (r.size = $)), S.length >= a.EF_ZIP64_RHO && (O = y(S, a.EF_ZIP64_SCOMP), r.compressedSize === a.EF_ZIP64_OR_32 && (r.compressedSize = O)), S.length >= a.EF_ZIP64_DSN && (T = y(S, a.EF_ZIP64_RHO), r.offset === a.EF_ZIP64_OR_32 && (r.offset = T)), S.length >= a.EF_ZIP64_DSN + 4 && (k = S.readUInt32LE(a.EF_ZIP64_DSN), r.diskNumStart === a.EF_ZIP64_OR_16 && (r.diskNumStart = k));
    }
    return {
      get entryName() {
        return b.decode(l);
      },
      get rawEntryName() {
        return l;
      },
      set entryName(S) {
        l = e.toBuffer(S, b.encode);
        var $ = l[l.length - 1];
        i = $ === 47 || $ === 92, r.fileNameLength = l.length;
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
        return b.decode(o);
      },
      set comment(S) {
        if (o = e.toBuffer(S, b.encode), r.commentLength = o.length, o.length > 65535) throw e.Errors.COMMENT_TOO_LONG();
      },
      get name() {
        var S = b.decode(l);
        return i ? S.substr(S.length - 1).split("/").pop() : S.split("/").pop();
      },
      get isDirectory() {
        return i;
      },
      getCompressedData: function() {
        return m(!1, null);
      },
      getCompressedDataAsync: function(S) {
        m(!0, S);
      },
      setData: function(S) {
        d = e.toBuffer(S, e.decoder.encode), !i && d.length ? (r.size = d.length, r.method = e.Constants.DEFLATED, r.crc = e.crc32(S), r.changed = !0) : r.method = e.Constants.STORED;
      },
      getData: function(S) {
        return r.changed ? d : u(!1, null, S);
      },
      getDataAsync: function(S, $) {
        r.changed ? S(d) : u(!0, S, $);
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
        var S = r.centralHeaderToBinary(), $ = e.Constants.CENHDR;
        return l.copy(S, $), $ += l.length, E.copy(S, $), $ += r.extraLength, o.copy(S, $), S;
      },
      packLocalHeader: function() {
        let S = 0;
        r.flags_efs = this.efs, r.extraLocalLength = g.length;
        const $ = r.localHeaderToBinary(), O = Buffer.alloc($.length + l.length + r.extraLocalLength);
        return $.copy(O, S), S += $.length, l.copy(O, S), S += l.length, g.copy(O, S), S += g.length, O;
      },
      toJSON: function() {
        const S = function($) {
          return "<" + ($ && $.length + " bytes buffer" || "null") + ">";
        };
        return {
          entryName: this.entryName,
          name: this.name,
          comment: this.comment,
          isDirectory: this.isDirectory,
          header: r.toJSON(),
          compressedData: S(s),
          data: S(d)
        };
      },
      toString: function() {
        return JSON.stringify(this.toJSON(), null, "	");
      }
    };
  }, Wn;
}
var Kn, Ma;
function yl() {
  if (Ma) return Kn;
  Ma = 1;
  const e = Uc(), t = xc(), a = ot();
  return Kn = function(n, c) {
    var s = [], r = {}, l = Buffer.alloc(0), o = new t.MainHeader(), i = !1;
    const d = /* @__PURE__ */ new Set(), E = c, { noSort: g, decoder: p } = E;
    n ? f(E.readEntries) : i = !0;
    function w() {
      const u = /* @__PURE__ */ new Set();
      for (const m of Object.keys(r)) {
        const y = m.split("/");
        if (y.pop(), !!y.length)
          for (let v = 0; v < y.length; v++) {
            const _ = y.slice(0, v + 1).join("/") + "/";
            u.add(_);
          }
      }
      for (const m of u)
        if (!(m in r)) {
          const y = new e(E);
          y.entryName = m, y.attr = 16, y.temporary = !0, s.push(y), r[y.entryName] = y, d.add(y);
        }
    }
    function b() {
      if (i = !0, r = {}, o.diskEntries > (n.length - o.offset) / a.Constants.CENHDR)
        throw a.Errors.DISK_ENTRY_TOO_LARGE();
      s = new Array(o.diskEntries);
      for (var u = o.offset, m = 0; m < s.length; m++) {
        var y = u, v = new e(E, n);
        v.header = n.slice(y, y += a.Constants.CENHDR), v.entryName = n.slice(y, y += v.header.fileNameLength), v.header.extraLength && (v.extra = n.slice(y, y += v.header.extraLength)), v.header.commentLength && (v.comment = n.slice(y, y + v.header.commentLength)), u += v.header.centralHeaderSize, s[m] = v, r[v.entryName] = v;
      }
      d.clear(), w();
    }
    function f(u) {
      var m = n.length - a.Constants.ENDHDR, y = Math.max(0, m - 65535), v = y, _ = n.length, S = -1, $ = 0;
      for ((typeof E.trailingSpace == "boolean" ? E.trailingSpace : !1) && (y = 0), m; m >= v; m--)
        if (n[m] === 80) {
          if (n.readUInt32LE(m) === a.Constants.ENDSIG) {
            S = m, $ = m, _ = m + a.Constants.ENDHDR, v = m - a.Constants.END64HDR;
            continue;
          }
          if (n.readUInt32LE(m) === a.Constants.END64SIG) {
            v = y;
            continue;
          }
          if (n.readUInt32LE(m) === a.Constants.ZIP64SIG) {
            S = m, _ = m + a.readBigUInt64LE(n, m + a.Constants.ZIP64SIZE) + a.Constants.ZIP64LEAD;
            break;
          }
        }
      if (S == -1) throw a.Errors.INVALID_FORMAT();
      o.loadFromBinary(n.slice(S, _)), o.commentLength && (l = n.slice($ + a.Constants.ENDHDR)), u && b();
    }
    function h() {
      s.length > 1 && !g && s.sort((u, m) => u.entryName.toLowerCase().localeCompare(m.entryName.toLowerCase()));
    }
    return {
      /**
       * Returns an array of ZipEntry objects existent in the current opened archive
       * @return Array
       */
      get entries() {
        return i || b(), s.filter((u) => !d.has(u));
      },
      /**
       * Archive comment
       * @return {String}
       */
      get comment() {
        return p.decode(l);
      },
      set comment(u) {
        l = a.toBuffer(u, p.encode), o.commentLength = l.length;
      },
      getEntryCount: function() {
        return i ? s.length : o.diskEntries;
      },
      forEach: function(u) {
        this.entries.forEach(u);
      },
      /**
       * Returns a reference to the entry with the given name or null if entry is inexistent
       *
       * @param entryName
       * @return ZipEntry
       */
      getEntry: function(u) {
        return i || b(), r[u] || null;
      },
      /**
       * Adds the given entry to the entry list
       *
       * @param entry
       */
      setEntry: function(u) {
        i || b(), s.push(u), r[u.entryName] = u, o.totalEntries = s.length;
      },
      /**
       * Removes the file with the given name from the entry list.
       *
       * If the entry is a directory, then all nested files and directories will be removed
       * @param entryName
       * @returns {void}
       */
      deleteFile: function(u, m = !0) {
        i || b();
        const y = r[u];
        this.getEntryChildren(y, m).map((_) => _.entryName).forEach(this.deleteEntry);
      },
      /**
       * Removes the entry with the given name from the entry list.
       *
       * @param {string} entryName
       * @returns {void}
       */
      deleteEntry: function(u) {
        i || b();
        const m = r[u], y = s.indexOf(m);
        y >= 0 && (s.splice(y, 1), delete r[u], o.totalEntries = s.length);
      },
      /**
       *  Iterates and returns all nested files and directories of the given entry
       *
       * @param entry
       * @return Array
       */
      getEntryChildren: function(u, m = !0) {
        if (i || b(), typeof u == "object")
          if (u.isDirectory && m) {
            const y = [], v = u.entryName;
            for (const _ of s)
              _.entryName.startsWith(v) && y.push(_);
            return y;
          } else
            return [u];
        return [];
      },
      /**
       *  How many child elements entry has
       *
       * @param {ZipEntry} entry
       * @return {integer}
       */
      getChildCount: function(u) {
        if (u && u.isDirectory) {
          const m = this.getEntryChildren(u);
          return m.includes(u) ? m.length - 1 : m.length;
        }
        return 0;
      },
      /**
       * Returns the zip file
       *
       * @return Buffer
       */
      compressToBuffer: function() {
        i || b(), h();
        const u = [], m = [];
        let y = 0, v = 0;
        o.size = 0, o.offset = 0;
        let _ = 0;
        for (const O of this.entries) {
          const T = O.getCompressedData();
          O.header.offset = v;
          const k = O.packLocalHeader(), H = k.length + T.length;
          v += H, u.push(k), u.push(T);
          const U = O.packCentralHeader();
          m.push(U), o.size += U.length, y += H + U.length, _++;
        }
        y += o.mainHeaderSize, o.offset = v, o.totalEntries = _, v = 0;
        const S = Buffer.alloc(y);
        for (const O of u)
          O.copy(S, v), v += O.length;
        for (const O of m)
          O.copy(S, v), v += O.length;
        const $ = o.toBinary();
        return l && l.copy($, a.Constants.ENDHDR), $.copy(S, v), n = S, i = !1, S;
      },
      toAsyncBuffer: function(u, m, y, v) {
        try {
          i || b(), h();
          const _ = [], S = [];
          let $ = 0, O = 0, T = 0;
          o.size = 0, o.offset = 0;
          const k = function(H) {
            if (H.length > 0) {
              const U = H.shift(), z = U.entryName + U.extra.toString();
              y && y(z), U.getCompressedDataAsync(function(V) {
                v && v(z), U.header.offset = O;
                const Z = U.packLocalHeader(), B = Z.length + V.length;
                O += B, _.push(Z), _.push(V);
                const A = U.packCentralHeader();
                S.push(A), o.size += A.length, $ += B + A.length, T++, k(H);
              });
            } else {
              $ += o.mainHeaderSize, o.offset = O, o.totalEntries = T, O = 0;
              const U = Buffer.alloc($);
              _.forEach(function(V) {
                V.copy(U, O), O += V.length;
              }), S.forEach(function(V) {
                V.copy(U, O), O += V.length;
              });
              const z = o.toBinary();
              l && l.copy(z, a.Constants.ENDHDR), z.copy(U, O), n = U, i = !1, u(U);
            }
          };
          k(Array.from(this.entries));
        } catch (_) {
          m(_);
        }
      }
    };
  }, Kn;
}
var Xn, xa;
function vl() {
  if (xa) return Xn;
  xa = 1;
  const e = ot(), t = ue, a = Uc(), n = yl(), c = (...o) => e.findLast(o, (i) => typeof i == "boolean"), s = (...o) => e.findLast(o, (i) => typeof i == "string"), r = (...o) => e.findLast(o, (i) => typeof i == "function"), l = {
    // option "noSort" : if true it disables files sorting
    noSort: !1,
    // read entries during load (initial loading may be slower)
    readEntries: !1,
    // default method is none
    method: e.Constants.NONE,
    // file system
    fs: null
  };
  return Xn = function(o, i) {
    let d = null;
    const E = Object.assign(/* @__PURE__ */ Object.create(null), l);
    o && typeof o == "object" && (o instanceof Uint8Array || (Object.assign(E, o), o = E.input ? E.input : void 0, E.input && delete E.input), Buffer.isBuffer(o) && (d = o, E.method = e.Constants.BUFFER, o = void 0)), Object.assign(E, i);
    const g = new e(E);
    if ((typeof E.decoder != "object" || typeof E.decoder.encode != "function" || typeof E.decoder.decode != "function") && (E.decoder = e.decoder), o && typeof o == "string")
      if (g.fs.existsSync(o))
        E.method = e.Constants.FILE, E.filename = o, d = g.fs.readFileSync(o);
      else
        throw e.Errors.INVALID_FILENAME();
    const p = new n(d, E), { canonical: w, sanitize: b, zipnamefix: f } = e;
    function h(v) {
      if (v && p) {
        var _;
        if (typeof v == "string" && (_ = p.getEntry(t.posix.normalize(v))), typeof v == "object" && typeof v.entryName < "u" && typeof v.header < "u" && (_ = p.getEntry(v.entryName)), _)
          return _;
      }
      return null;
    }
    function u(v) {
      const { join: _, normalize: S, sep: $ } = t.posix;
      return _(".", S($ + v.split("\\").join($) + $));
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
          var $ = S.getData();
          if ($ && $.length)
            return $.toString(_ || "utf8");
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
        var $ = h(v);
        $ ? $.getDataAsync(function(O, T) {
          if (T) {
            _(O, T);
            return;
          }
          O && O.length ? _(O.toString(S || "utf8")) : _("");
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
      addLocalFile: function(v, _, S, $) {
        if (g.fs.existsSync(v)) {
          _ = _ ? u(_) : "";
          const O = t.win32.basename(t.win32.normalize(v));
          _ += S || O;
          const T = g.fs.statSync(v), k = T.isFile() ? g.fs.readFileSync(v) : Buffer.alloc(0);
          T.isDirectory() && (_ += g.sep), this.addFile(_, k, $, T);
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
        const S = t.resolve(v.localPath), { comment: $ } = v;
        let { zipPath: O, zipName: T } = v;
        const k = this;
        g.fs.stat(S, function(H, U) {
          if (H) return _(H, !1);
          O = O ? u(O) : "";
          const z = t.win32.basename(t.win32.normalize(S));
          if (O += T || z, U.isFile())
            g.fs.readFile(S, function(V, Z) {
              return V ? _(V, !1) : (k.addFile(O, Z, $, U), setImmediate(_, void 0, !0));
            });
          else if (U.isDirectory())
            return O += g.sep, k.addFile(O, Buffer.alloc(0), $, U), setImmediate(_, void 0, !0);
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
        if (S = m(S), _ = _ ? u(_) : "", v = t.normalize(v), g.fs.existsSync(v)) {
          const $ = g.findFiles(v), O = this;
          if ($.length)
            for (const T of $) {
              const k = t.join(_, y(v, T));
              S(k) && O.addLocalFile(T, t.dirname(k));
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
      addLocalFolderAsync: function(v, _, S, $) {
        $ = m($), S = S ? u(S) : "", v = t.normalize(v);
        var O = this;
        g.fs.open(v, "r", function(T) {
          if (T && T.code === "ENOENT")
            _(void 0, e.Errors.FILE_NOT_FOUND(v));
          else if (T)
            _(void 0, T);
          else {
            var k = g.findFiles(v), H = -1, U = function() {
              if (H += 1, H < k.length) {
                var z = k[H], V = y(v, z).split("\\").join("/");
                V = V.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, ""), $(V) ? g.fs.stat(z, function(Z, B) {
                  Z && _(void 0, Z), B.isFile() ? g.fs.readFile(z, function(A, x) {
                    A ? _(void 0, A) : (O.addFile(S + V, x, "", B), U());
                  }) : (O.addFile(S + V + "/", Buffer.alloc(0), "", B), U());
                }) : process.nextTick(() => {
                  U();
                });
              } else
                _(!0, void 0);
            };
            U();
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
        v = typeof v == "object" ? v : { localPath: v }, localPath = t.resolve(u(v.localPath));
        let { zipPath: $, filter: O, namefix: T } = v;
        O instanceof RegExp ? O = /* @__PURE__ */ function(U) {
          return function(z) {
            return U.test(z);
          };
        }(O) : typeof O != "function" && (O = function() {
          return !0;
        }), $ = $ ? u($) : "", T == "latin1" && (T = (U) => U.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, "")), typeof T != "function" && (T = (U) => U);
        const k = (U) => t.join($, T(y(localPath, U))), H = (U) => t.win32.basename(t.win32.normalize(T(U)));
        g.fs.open(localPath, "r", function(U) {
          U && U.code === "ENOENT" ? _(void 0, e.Errors.FILE_NOT_FOUND(localPath)) : U ? _(void 0, U) : g.findFilesAsync(localPath, function(z, V) {
            if (z) return _(z);
            V = V.filter((Z) => O(k(Z))), V.length || _(void 0, !1), setImmediate(
              V.reverse().reduce(function(Z, B) {
                return function(A, x) {
                  if (A || x === !1) return setImmediate(Z, A, !1);
                  S.addLocalFileAsync(
                    {
                      localPath: B,
                      zipPath: t.dirname(k(B)),
                      zipName: H(B)
                    },
                    Z
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
        return new Promise((S, $) => {
          this.addLocalFolderAsync2(Object.assign({ localPath: v }, _), (O, T) => {
            O && $(O), T && S(this);
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
      addFile: function(v, _, S, $) {
        v = f(v);
        let O = h(v);
        const T = O != null;
        T || (O = new a(E), O.entryName = v), O.comment = S || "";
        const k = typeof $ == "object" && $ instanceof g.fs.Stats;
        k && (O.header.time = $.mtime);
        var H = O.isDirectory ? 16 : 0;
        let U = O.isDirectory ? 16384 : 32768;
        return k ? U |= 4095 & $.mode : typeof $ == "number" ? U |= 4095 & $ : U |= O.isDirectory ? 493 : 420, H = (H | U << 16) >>> 0, O.attr = H, O.setData(_), T || p.setEntry(O), O;
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
      extractEntryTo: function(v, _, S, $, O, T) {
        $ = c(!1, $), O = c(!1, O), S = c(!0, S), T = s(O, T);
        var k = h(v);
        if (!k)
          throw e.Errors.NO_ENTRY();
        var H = w(k.entryName), U = b(_, T && !k.isDirectory ? T : S ? H : t.basename(H));
        if (k.isDirectory) {
          var z = p.getEntryChildren(k);
          return z.forEach(function(B) {
            if (B.isDirectory) return;
            var A = B.getData();
            if (!A)
              throw e.Errors.CANT_EXTRACT_FILE();
            var x = w(B.entryName), D = b(_, S ? x : t.basename(x));
            const C = O ? B.header.fileAttr : void 0;
            g.writeFileTo(D, A, $, C);
          }), !0;
        }
        var V = k.getData(p.password);
        if (!V) throw e.Errors.CANT_EXTRACT_FILE();
        if (g.fs.existsSync(U) && !$)
          throw e.Errors.CANT_OVERRIDE();
        const Z = O ? v.header.fileAttr : void 0;
        return g.writeFileTo(U, V, $, Z), !0;
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
      extractAllTo: function(v, _, S, $) {
        if (S = c(!1, S), $ = s(S, $), _ = c(!1, _), !p) throw e.Errors.NO_ZIP();
        p.entries.forEach(function(O) {
          var T = b(v, w(O.entryName));
          if (O.isDirectory) {
            g.makeDir(T);
            return;
          }
          var k = O.getData($);
          if (!k)
            throw e.Errors.CANT_EXTRACT_FILE();
          const H = S ? O.header.fileAttr : void 0;
          g.writeFileTo(T, k, _, H);
          try {
            g.fs.utimesSync(T, O.header.time, O.header.time);
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
      extractAllToAsync: function(v, _, S, $) {
        if ($ = r(_, S, $), S = c(!1, S), _ = c(!1, _), !$)
          return new Promise((U, z) => {
            this.extractAllToAsync(v, _, S, function(V) {
              V ? z(V) : U(this);
            });
          });
        if (!p) {
          $(e.Errors.NO_ZIP());
          return;
        }
        v = t.resolve(v);
        const O = (U) => b(v, t.normalize(w(U.entryName))), T = (U, z) => new Error(U + ': "' + z + '"'), k = [], H = [];
        p.entries.forEach((U) => {
          U.isDirectory ? k.push(U) : H.push(U);
        });
        for (const U of k) {
          const z = O(U), V = S ? U.header.fileAttr : void 0;
          try {
            g.makeDir(z), V && g.fs.chmodSync(z, V), g.fs.utimesSync(z, U.header.time, U.header.time);
          } catch {
            $(T("Unable to create folder", z));
          }
        }
        H.reverse().reduce(function(U, z) {
          return function(V) {
            if (V)
              U(V);
            else {
              const Z = t.normalize(w(z.entryName)), B = b(v, Z);
              z.getDataAsync(function(A, x) {
                if (x)
                  U(x);
                else if (!A)
                  U(e.Errors.CANT_EXTRACT_FILE());
                else {
                  const D = S ? z.header.fileAttr : void 0;
                  g.writeFileToAsync(B, A, _, D, function(C) {
                    C || U(T("Unable to write file", B)), g.fs.utimes(B, z.header.time, z.header.time, function(j) {
                      j ? U(T("Unable to set times", B)) : U();
                    });
                  });
                }
              });
            }
          };
        }, $)();
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
            var $ = g.writeFileTo(v, S, !0);
            typeof _ == "function" && _($ ? null : new Error("failed"), "");
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
        const { overwrite: S, perm: $ } = Object.assign({ overwrite: !0 }, _);
        return new Promise((O, T) => {
          !v && E.filename && (v = E.filename), v || T("ADM-ZIP: ZIP File Name Missing"), this.toBufferPromise().then((k) => {
            const H = (U) => U ? O(U) : T("ADM-ZIP: Wasn't able to write zip file");
            g.writeFileToAsync(v, k, S, $, H);
          }, T);
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
      toBuffer: function(v, _, S, $) {
        return typeof v == "function" ? (p.toAsyncBuffer(v, _, S, $), null) : p.compressToBuffer();
      }
    };
  }, Xn;
}
var El = vl();
const Ua = /* @__PURE__ */ Rc(El);
var Zn = {}, lr = {}, za;
function he() {
  return za || (za = 1, lr.fromCallback = function(e) {
    return Object.defineProperty(function(...t) {
      if (typeof t[t.length - 1] == "function") e.apply(this, t);
      else
        return new Promise((a, n) => {
          t.push((c, s) => c != null ? n(c) : a(s)), e.apply(this, t);
        });
    }, "name", { value: e.name });
  }, lr.fromPromise = function(e) {
    return Object.defineProperty(function(...t) {
      const a = t[t.length - 1];
      if (typeof a != "function") return e.apply(this, t);
      t.pop(), e.apply(this, t).then((n) => a(null, n), a);
    }, "name", { value: e.name });
  }), lr;
}
var Jn, Va;
function gl() {
  if (Va) return Jn;
  Va = 1;
  var e = Jc, t = process.cwd, a = null, n = process.env.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function() {
    return a || (a = t.call(process)), a;
  };
  try {
    process.cwd();
  } catch {
  }
  if (typeof process.chdir == "function") {
    var c = process.chdir;
    process.chdir = function(r) {
      a = null, c.call(process, r);
    }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, c);
  }
  Jn = s;
  function s(r) {
    e.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && l(r), r.lutimes || o(r), r.chown = E(r.chown), r.fchown = E(r.fchown), r.lchown = E(r.lchown), r.chmod = i(r.chmod), r.fchmod = i(r.fchmod), r.lchmod = i(r.lchmod), r.chownSync = g(r.chownSync), r.fchownSync = g(r.fchownSync), r.lchownSync = g(r.lchownSync), r.chmodSync = d(r.chmodSync), r.fchmodSync = d(r.fchmodSync), r.lchmodSync = d(r.lchmodSync), r.stat = p(r.stat), r.fstat = p(r.fstat), r.lstat = p(r.lstat), r.statSync = w(r.statSync), r.fstatSync = w(r.fstatSync), r.lstatSync = w(r.lstatSync), r.chmod && !r.lchmod && (r.lchmod = function(f, h, u) {
      u && process.nextTick(u);
    }, r.lchmodSync = function() {
    }), r.chown && !r.lchown && (r.lchown = function(f, h, u, m) {
      m && process.nextTick(m);
    }, r.lchownSync = function() {
    }), n === "win32" && (r.rename = typeof r.rename != "function" ? r.rename : function(f) {
      function h(u, m, y) {
        var v = Date.now(), _ = 0;
        f(u, m, function S($) {
          if ($ && ($.code === "EACCES" || $.code === "EPERM" || $.code === "EBUSY") && Date.now() - v < 6e4) {
            setTimeout(function() {
              r.stat(m, function(O, T) {
                O && O.code === "ENOENT" ? f(u, m, S) : y($);
              });
            }, _), _ < 100 && (_ += 10);
            return;
          }
          y && y($);
        });
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(h, f), h;
    }(r.rename)), r.read = typeof r.read != "function" ? r.read : function(f) {
      function h(u, m, y, v, _, S) {
        var $;
        if (S && typeof S == "function") {
          var O = 0;
          $ = function(T, k, H) {
            if (T && T.code === "EAGAIN" && O < 10)
              return O++, f.call(r, u, m, y, v, _, $);
            S.apply(this, arguments);
          };
        }
        return f.call(r, u, m, y, v, _, $);
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(h, f), h;
    }(r.read), r.readSync = typeof r.readSync != "function" ? r.readSync : /* @__PURE__ */ function(f) {
      return function(h, u, m, y, v) {
        for (var _ = 0; ; )
          try {
            return f.call(r, h, u, m, y, v);
          } catch (S) {
            if (S.code === "EAGAIN" && _ < 10) {
              _++;
              continue;
            }
            throw S;
          }
      };
    }(r.readSync);
    function l(f) {
      f.lchmod = function(h, u, m) {
        f.open(
          h,
          e.O_WRONLY | e.O_SYMLINK,
          u,
          function(y, v) {
            if (y) {
              m && m(y);
              return;
            }
            f.fchmod(v, u, function(_) {
              f.close(v, function(S) {
                m && m(_ || S);
              });
            });
          }
        );
      }, f.lchmodSync = function(h, u) {
        var m = f.openSync(h, e.O_WRONLY | e.O_SYMLINK, u), y = !0, v;
        try {
          v = f.fchmodSync(m, u), y = !1;
        } finally {
          if (y)
            try {
              f.closeSync(m);
            } catch {
            }
          else
            f.closeSync(m);
        }
        return v;
      };
    }
    function o(f) {
      e.hasOwnProperty("O_SYMLINK") && f.futimes ? (f.lutimes = function(h, u, m, y) {
        f.open(h, e.O_SYMLINK, function(v, _) {
          if (v) {
            y && y(v);
            return;
          }
          f.futimes(_, u, m, function(S) {
            f.close(_, function($) {
              y && y(S || $);
            });
          });
        });
      }, f.lutimesSync = function(h, u, m) {
        var y = f.openSync(h, e.O_SYMLINK), v, _ = !0;
        try {
          v = f.futimesSync(y, u, m), _ = !1;
        } finally {
          if (_)
            try {
              f.closeSync(y);
            } catch {
            }
          else
            f.closeSync(y);
        }
        return v;
      }) : f.futimes && (f.lutimes = function(h, u, m, y) {
        y && process.nextTick(y);
      }, f.lutimesSync = function() {
      });
    }
    function i(f) {
      return f && function(h, u, m) {
        return f.call(r, h, u, function(y) {
          b(y) && (y = null), m && m.apply(this, arguments);
        });
      };
    }
    function d(f) {
      return f && function(h, u) {
        try {
          return f.call(r, h, u);
        } catch (m) {
          if (!b(m)) throw m;
        }
      };
    }
    function E(f) {
      return f && function(h, u, m, y) {
        return f.call(r, h, u, m, function(v) {
          b(v) && (v = null), y && y.apply(this, arguments);
        });
      };
    }
    function g(f) {
      return f && function(h, u, m) {
        try {
          return f.call(r, h, u, m);
        } catch (y) {
          if (!b(y)) throw y;
        }
      };
    }
    function p(f) {
      return f && function(h, u, m) {
        typeof u == "function" && (m = u, u = null);
        function y(v, _) {
          _ && (_.uid < 0 && (_.uid += 4294967296), _.gid < 0 && (_.gid += 4294967296)), m && m.apply(this, arguments);
        }
        return u ? f.call(r, h, u, y) : f.call(r, h, y);
      };
    }
    function w(f) {
      return f && function(h, u) {
        var m = u ? f.call(r, h, u) : f.call(r, h);
        return m && (m.uid < 0 && (m.uid += 4294967296), m.gid < 0 && (m.gid += 4294967296)), m;
      };
    }
    function b(f) {
      if (!f || f.code === "ENOSYS")
        return !0;
      var h = !process.getuid || process.getuid() !== 0;
      return !!(h && (f.code === "EINVAL" || f.code === "EPERM"));
    }
  }
  return Jn;
}
var Yn, Ga;
function _l() {
  if (Ga) return Yn;
  Ga = 1;
  var e = Yc.Stream;
  Yn = t;
  function t(a) {
    return {
      ReadStream: n,
      WriteStream: c
    };
    function n(s, r) {
      if (!(this instanceof n)) return new n(s, r);
      e.call(this);
      var l = this;
      this.path = s, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, r = r || {};
      for (var o = Object.keys(r), i = 0, d = o.length; i < d; i++) {
        var E = o[i];
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
          l._read();
        });
        return;
      }
      a.open(this.path, this.flags, this.mode, function(g, p) {
        if (g) {
          l.emit("error", g), l.readable = !1;
          return;
        }
        l.fd = p, l.emit("open", p), l._read();
      });
    }
    function c(s, r) {
      if (!(this instanceof c)) return new c(s, r);
      e.call(this), this.path = s, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, r = r || {};
      for (var l = Object.keys(r), o = 0, i = l.length; o < i; o++) {
        var d = l[o];
        this[d] = r[d];
      }
      if (this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.start < 0)
          throw new Error("start must be >= zero");
        this.pos = this.start;
      }
      this.busy = !1, this._queue = [], this.fd === null && (this._open = a.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
    }
  }
  return Yn;
}
var Qn, Ba;
function Sl() {
  if (Ba) return Qn;
  Ba = 1, Qn = t;
  var e = Object.getPrototypeOf || function(a) {
    return a.__proto__;
  };
  function t(a) {
    if (a === null || typeof a != "object")
      return a;
    if (a instanceof Object)
      var n = { __proto__: e(a) };
    else
      var n = /* @__PURE__ */ Object.create(null);
    return Object.getOwnPropertyNames(a).forEach(function(c) {
      Object.defineProperty(n, c, Object.getOwnPropertyDescriptor(a, c));
    }), n;
  }
  return Qn;
}
var dr, Ha;
function at() {
  if (Ha) return dr;
  Ha = 1;
  var e = Be, t = gl(), a = _l(), n = Sl(), c = Ii, s, r;
  typeof Symbol == "function" && typeof Symbol.for == "function" ? (s = Symbol.for("graceful-fs.queue"), r = Symbol.for("graceful-fs.previous")) : (s = "___graceful-fs.queue", r = "___graceful-fs.previous");
  function l() {
  }
  function o(f, h) {
    Object.defineProperty(f, s, {
      get: function() {
        return h;
      }
    });
  }
  var i = l;
  if (c.debuglog ? i = c.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (i = function() {
    var f = c.format.apply(c, arguments);
    f = "GFS4: " + f.split(/\n/).join(`
GFS4: `), console.error(f);
  }), !e[s]) {
    var d = nt[s] || [];
    o(e, d), e.close = function(f) {
      function h(u, m) {
        return f.call(e, u, function(y) {
          y || w(), typeof m == "function" && m.apply(this, arguments);
        });
      }
      return Object.defineProperty(h, r, {
        value: f
      }), h;
    }(e.close), e.closeSync = function(f) {
      function h(u) {
        f.apply(e, arguments), w();
      }
      return Object.defineProperty(h, r, {
        value: f
      }), h;
    }(e.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
      i(e[s]), $c.equal(e[s].length, 0);
    });
  }
  nt[s] || o(nt, e[s]), dr = E(n(e)), process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !e.__patched && (dr = E(e), e.__patched = !0);
  function E(f) {
    t(f), f.gracefulify = E, f.createReadStream = C, f.createWriteStream = j;
    var h = f.readFile;
    f.readFile = u;
    function u(N, I, K) {
      return typeof I == "function" && (K = I, I = null), W(N, I, K);
      function W(Q, J, P, q) {
        return h(Q, J, function(M) {
          M && (M.code === "EMFILE" || M.code === "ENFILE") ? g([W, [Q, J, P], M, q || Date.now(), Date.now()]) : typeof P == "function" && P.apply(this, arguments);
        });
      }
    }
    var m = f.writeFile;
    f.writeFile = y;
    function y(N, I, K, W) {
      return typeof K == "function" && (W = K, K = null), Q(N, I, K, W);
      function Q(J, P, q, M, F) {
        return m(J, P, q, function(G) {
          G && (G.code === "EMFILE" || G.code === "ENFILE") ? g([Q, [J, P, q, M], G, F || Date.now(), Date.now()]) : typeof M == "function" && M.apply(this, arguments);
        });
      }
    }
    var v = f.appendFile;
    v && (f.appendFile = _);
    function _(N, I, K, W) {
      return typeof K == "function" && (W = K, K = null), Q(N, I, K, W);
      function Q(J, P, q, M, F) {
        return v(J, P, q, function(G) {
          G && (G.code === "EMFILE" || G.code === "ENFILE") ? g([Q, [J, P, q, M], G, F || Date.now(), Date.now()]) : typeof M == "function" && M.apply(this, arguments);
        });
      }
    }
    var S = f.copyFile;
    S && (f.copyFile = $);
    function $(N, I, K, W) {
      return typeof K == "function" && (W = K, K = 0), Q(N, I, K, W);
      function Q(J, P, q, M, F) {
        return S(J, P, q, function(G) {
          G && (G.code === "EMFILE" || G.code === "ENFILE") ? g([Q, [J, P, q, M], G, F || Date.now(), Date.now()]) : typeof M == "function" && M.apply(this, arguments);
        });
      }
    }
    var O = f.readdir;
    f.readdir = k;
    var T = /^v[0-5]\./;
    function k(N, I, K) {
      typeof I == "function" && (K = I, I = null);
      var W = T.test(process.version) ? function(P, q, M, F) {
        return O(P, Q(
          P,
          q,
          M,
          F
        ));
      } : function(P, q, M, F) {
        return O(P, q, Q(
          P,
          q,
          M,
          F
        ));
      };
      return W(N, I, K);
      function Q(J, P, q, M) {
        return function(F, G) {
          F && (F.code === "EMFILE" || F.code === "ENFILE") ? g([
            W,
            [J, P, q],
            F,
            M || Date.now(),
            Date.now()
          ]) : (G && G.sort && G.sort(), typeof q == "function" && q.call(this, F, G));
        };
      }
    }
    if (process.version.substr(0, 4) === "v0.8") {
      var H = a(f);
      B = H.ReadStream, x = H.WriteStream;
    }
    var U = f.ReadStream;
    U && (B.prototype = Object.create(U.prototype), B.prototype.open = A);
    var z = f.WriteStream;
    z && (x.prototype = Object.create(z.prototype), x.prototype.open = D), Object.defineProperty(f, "ReadStream", {
      get: function() {
        return B;
      },
      set: function(N) {
        B = N;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(f, "WriteStream", {
      get: function() {
        return x;
      },
      set: function(N) {
        x = N;
      },
      enumerable: !0,
      configurable: !0
    });
    var V = B;
    Object.defineProperty(f, "FileReadStream", {
      get: function() {
        return V;
      },
      set: function(N) {
        V = N;
      },
      enumerable: !0,
      configurable: !0
    });
    var Z = x;
    Object.defineProperty(f, "FileWriteStream", {
      get: function() {
        return Z;
      },
      set: function(N) {
        Z = N;
      },
      enumerable: !0,
      configurable: !0
    });
    function B(N, I) {
      return this instanceof B ? (U.apply(this, arguments), this) : B.apply(Object.create(B.prototype), arguments);
    }
    function A() {
      var N = this;
      R(N.path, N.flags, N.mode, function(I, K) {
        I ? (N.autoClose && N.destroy(), N.emit("error", I)) : (N.fd = K, N.emit("open", K), N.read());
      });
    }
    function x(N, I) {
      return this instanceof x ? (z.apply(this, arguments), this) : x.apply(Object.create(x.prototype), arguments);
    }
    function D() {
      var N = this;
      R(N.path, N.flags, N.mode, function(I, K) {
        I ? (N.destroy(), N.emit("error", I)) : (N.fd = K, N.emit("open", K));
      });
    }
    function C(N, I) {
      return new f.ReadStream(N, I);
    }
    function j(N, I) {
      return new f.WriteStream(N, I);
    }
    var L = f.open;
    f.open = R;
    function R(N, I, K, W) {
      return typeof K == "function" && (W = K, K = null), Q(N, I, K, W);
      function Q(J, P, q, M, F) {
        return L(J, P, q, function(G, Y) {
          G && (G.code === "EMFILE" || G.code === "ENFILE") ? g([Q, [J, P, q, M], G, F || Date.now(), Date.now()]) : typeof M == "function" && M.apply(this, arguments);
        });
      }
    }
    return f;
  }
  function g(f) {
    i("ENQUEUE", f[0].name, f[1]), e[s].push(f), b();
  }
  var p;
  function w() {
    for (var f = Date.now(), h = 0; h < e[s].length; ++h)
      e[s][h].length > 2 && (e[s][h][3] = f, e[s][h][4] = f);
    b();
  }
  function b() {
    if (clearTimeout(p), p = void 0, e[s].length !== 0) {
      var f = e[s].shift(), h = f[0], u = f[1], m = f[2], y = f[3], v = f[4];
      if (y === void 0)
        i("RETRY", h.name, u), h.apply(null, u);
      else if (Date.now() - y >= 6e4) {
        i("TIMEOUT", h.name, u);
        var _ = u.pop();
        typeof _ == "function" && _.call(null, m);
      } else {
        var S = Date.now() - v, $ = Math.max(v - y, 1), O = Math.min($ * 1.2, 100);
        S >= O ? (i("RETRY", h.name, u), h.apply(null, u.concat([y]))) : e[s].push(f);
      }
      p === void 0 && (p = setTimeout(b, 0));
    }
  }
  return dr;
}
var Wa;
function _e() {
  return Wa || (Wa = 1, function(e) {
    const t = he().fromCallback, a = at(), n = [
      "access",
      "appendFile",
      "chmod",
      "chown",
      "close",
      "copyFile",
      "fchmod",
      "fchown",
      "fdatasync",
      "fstat",
      "fsync",
      "ftruncate",
      "futimes",
      "lchmod",
      "lchown",
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
      "symlink",
      "truncate",
      "unlink",
      "utimes",
      "writeFile"
    ].filter((c) => typeof a[c] == "function");
    Object.assign(e, a), n.forEach((c) => {
      e[c] = t(a[c]);
    }), e.exists = function(c, s) {
      return typeof s == "function" ? a.exists(c, s) : new Promise((r) => a.exists(c, r));
    }, e.read = function(c, s, r, l, o, i) {
      return typeof i == "function" ? a.read(c, s, r, l, o, i) : new Promise((d, E) => {
        a.read(c, s, r, l, o, (g, p, w) => {
          if (g) return E(g);
          d({ bytesRead: p, buffer: w });
        });
      });
    }, e.write = function(c, s, ...r) {
      return typeof r[r.length - 1] == "function" ? a.write(c, s, ...r) : new Promise((l, o) => {
        a.write(c, s, ...r, (i, d, E) => {
          if (i) return o(i);
          l({ bytesWritten: d, buffer: E });
        });
      });
    }, e.readv = function(c, s, ...r) {
      return typeof r[r.length - 1] == "function" ? a.readv(c, s, ...r) : new Promise((l, o) => {
        a.readv(c, s, ...r, (i, d, E) => {
          if (i) return o(i);
          l({ bytesRead: d, buffers: E });
        });
      });
    }, e.writev = function(c, s, ...r) {
      return typeof r[r.length - 1] == "function" ? a.writev(c, s, ...r) : new Promise((l, o) => {
        a.writev(c, s, ...r, (i, d, E) => {
          if (i) return o(i);
          l({ bytesWritten: d, buffers: E });
        });
      });
    }, typeof a.realpath.native == "function" ? e.realpath.native = t(a.realpath.native) : process.emitWarning(
      "fs.realpath.native is not a function. Is fs being monkey-patched?",
      "Warning",
      "fs-extra-WARN0003"
    );
  }(Zn)), Zn;
}
var hr = {}, ei = {}, Ka;
function wl() {
  if (Ka) return ei;
  Ka = 1;
  const e = ue;
  return ei.checkPath = function(a) {
    if (process.platform === "win32" && /[<>:"|?*]/.test(a.replace(e.parse(a).root, ""))) {
      const c = new Error(`Path contains invalid characters: ${a}`);
      throw c.code = "EINVAL", c;
    }
  }, ei;
}
var Xa;
function $l() {
  if (Xa) return hr;
  Xa = 1;
  const e = /* @__PURE__ */ _e(), { checkPath: t } = /* @__PURE__ */ wl(), a = (n) => {
    const c = { mode: 511 };
    return typeof n == "number" ? n : { ...c, ...n }.mode;
  };
  return hr.makeDir = async (n, c) => (t(n), e.mkdir(n, {
    mode: a(c),
    recursive: !0
  })), hr.makeDirSync = (n, c) => (t(n), e.mkdirSync(n, {
    mode: a(c),
    recursive: !0
  })), hr;
}
var ti, Za;
function Pe() {
  if (Za) return ti;
  Za = 1;
  const e = he().fromPromise, { makeDir: t, makeDirSync: a } = /* @__PURE__ */ $l(), n = e(t);
  return ti = {
    mkdirs: n,
    mkdirsSync: a,
    // alias
    mkdirp: n,
    mkdirpSync: a,
    ensureDir: n,
    ensureDirSync: a
  }, ti;
}
var ri, Ja;
function ze() {
  if (Ja) return ri;
  Ja = 1;
  const e = he().fromPromise, t = /* @__PURE__ */ _e();
  function a(n) {
    return t.access(n).then(() => !0).catch(() => !1);
  }
  return ri = {
    pathExists: e(a),
    pathExistsSync: t.existsSync
  }, ri;
}
var ni, Ya;
function zc() {
  if (Ya) return ni;
  Ya = 1;
  const e = /* @__PURE__ */ _e(), t = he().fromPromise;
  async function a(c, s, r) {
    const l = await e.open(c, "r+");
    let o = null;
    try {
      await e.futimes(l, s, r);
    } finally {
      try {
        await e.close(l);
      } catch (i) {
        o = i;
      }
    }
    if (o)
      throw o;
  }
  function n(c, s, r) {
    const l = e.openSync(c, "r+");
    return e.futimesSync(l, s, r), e.closeSync(l);
  }
  return ni = {
    utimesMillis: t(a),
    utimesMillisSync: n
  }, ni;
}
var ii, Qa;
function We() {
  if (Qa) return ii;
  Qa = 1;
  const e = /* @__PURE__ */ _e(), t = ue, a = he().fromPromise;
  function n(g, p, w) {
    const b = w.dereference ? (f) => e.stat(f, { bigint: !0 }) : (f) => e.lstat(f, { bigint: !0 });
    return Promise.all([
      b(g),
      b(p).catch((f) => {
        if (f.code === "ENOENT") return null;
        throw f;
      })
    ]).then(([f, h]) => ({ srcStat: f, destStat: h }));
  }
  function c(g, p, w) {
    let b;
    const f = w.dereference ? (u) => e.statSync(u, { bigint: !0 }) : (u) => e.lstatSync(u, { bigint: !0 }), h = f(g);
    try {
      b = f(p);
    } catch (u) {
      if (u.code === "ENOENT") return { srcStat: h, destStat: null };
      throw u;
    }
    return { srcStat: h, destStat: b };
  }
  async function s(g, p, w, b) {
    const { srcStat: f, destStat: h } = await n(g, p, b);
    if (h) {
      if (i(f, h)) {
        const u = t.basename(g), m = t.basename(p);
        if (w === "move" && u !== m && u.toLowerCase() === m.toLowerCase())
          return { srcStat: f, destStat: h, isChangingCase: !0 };
        throw new Error("Source and destination must not be the same.");
      }
      if (f.isDirectory() && !h.isDirectory())
        throw new Error(`Cannot overwrite non-directory '${p}' with directory '${g}'.`);
      if (!f.isDirectory() && h.isDirectory())
        throw new Error(`Cannot overwrite directory '${p}' with non-directory '${g}'.`);
    }
    if (f.isDirectory() && d(g, p))
      throw new Error(E(g, p, w));
    return { srcStat: f, destStat: h };
  }
  function r(g, p, w, b) {
    const { srcStat: f, destStat: h } = c(g, p, b);
    if (h) {
      if (i(f, h)) {
        const u = t.basename(g), m = t.basename(p);
        if (w === "move" && u !== m && u.toLowerCase() === m.toLowerCase())
          return { srcStat: f, destStat: h, isChangingCase: !0 };
        throw new Error("Source and destination must not be the same.");
      }
      if (f.isDirectory() && !h.isDirectory())
        throw new Error(`Cannot overwrite non-directory '${p}' with directory '${g}'.`);
      if (!f.isDirectory() && h.isDirectory())
        throw new Error(`Cannot overwrite directory '${p}' with non-directory '${g}'.`);
    }
    if (f.isDirectory() && d(g, p))
      throw new Error(E(g, p, w));
    return { srcStat: f, destStat: h };
  }
  async function l(g, p, w, b) {
    const f = t.resolve(t.dirname(g)), h = t.resolve(t.dirname(w));
    if (h === f || h === t.parse(h).root) return;
    let u;
    try {
      u = await e.stat(h, { bigint: !0 });
    } catch (m) {
      if (m.code === "ENOENT") return;
      throw m;
    }
    if (i(p, u))
      throw new Error(E(g, w, b));
    return l(g, p, h, b);
  }
  function o(g, p, w, b) {
    const f = t.resolve(t.dirname(g)), h = t.resolve(t.dirname(w));
    if (h === f || h === t.parse(h).root) return;
    let u;
    try {
      u = e.statSync(h, { bigint: !0 });
    } catch (m) {
      if (m.code === "ENOENT") return;
      throw m;
    }
    if (i(p, u))
      throw new Error(E(g, w, b));
    return o(g, p, h, b);
  }
  function i(g, p) {
    return p.ino && p.dev && p.ino === g.ino && p.dev === g.dev;
  }
  function d(g, p) {
    const w = t.resolve(g).split(t.sep).filter((f) => f), b = t.resolve(p).split(t.sep).filter((f) => f);
    return w.every((f, h) => b[h] === f);
  }
  function E(g, p, w) {
    return `Cannot ${w} '${g}' to a subdirectory of itself, '${p}'.`;
  }
  return ii = {
    // checkPaths
    checkPaths: a(s),
    checkPathsSync: r,
    // checkParent
    checkParentPaths: a(l),
    checkParentPathsSync: o,
    // Misc
    isSrcSubdir: d,
    areIdentical: i
  }, ii;
}
var si, ec;
function bl() {
  if (ec) return si;
  ec = 1;
  const e = /* @__PURE__ */ _e(), t = ue, { mkdirs: a } = /* @__PURE__ */ Pe(), { pathExists: n } = /* @__PURE__ */ ze(), { utimesMillis: c } = /* @__PURE__ */ zc(), s = /* @__PURE__ */ We();
  async function r(b, f, h = {}) {
    typeof h == "function" && (h = { filter: h }), h.clobber = "clobber" in h ? !!h.clobber : !0, h.overwrite = "overwrite" in h ? !!h.overwrite : h.clobber, h.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0001"
    );
    const { srcStat: u, destStat: m } = await s.checkPaths(b, f, "copy", h);
    if (await s.checkParentPaths(b, u, f, "copy"), !await l(b, f, h)) return;
    const v = t.dirname(f);
    await n(v) || await a(v), await o(m, b, f, h);
  }
  async function l(b, f, h) {
    return h.filter ? h.filter(b, f) : !0;
  }
  async function o(b, f, h, u) {
    const y = await (u.dereference ? e.stat : e.lstat)(f);
    if (y.isDirectory()) return p(y, b, f, h, u);
    if (y.isFile() || y.isCharacterDevice() || y.isBlockDevice()) return i(y, b, f, h, u);
    if (y.isSymbolicLink()) return w(b, f, h, u);
    throw y.isSocket() ? new Error(`Cannot copy a socket file: ${f}`) : y.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${f}`) : new Error(`Unknown file: ${f}`);
  }
  async function i(b, f, h, u, m) {
    if (!f) return d(b, h, u, m);
    if (m.overwrite)
      return await e.unlink(u), d(b, h, u, m);
    if (m.errorOnExist)
      throw new Error(`'${u}' already exists`);
  }
  async function d(b, f, h, u) {
    if (await e.copyFile(f, h), u.preserveTimestamps) {
      E(b.mode) && await g(h, b.mode);
      const m = await e.stat(f);
      await c(h, m.atime, m.mtime);
    }
    return e.chmod(h, b.mode);
  }
  function E(b) {
    return (b & 128) === 0;
  }
  function g(b, f) {
    return e.chmod(b, f | 128);
  }
  async function p(b, f, h, u, m) {
    f || await e.mkdir(u);
    const y = await e.readdir(h);
    await Promise.all(y.map(async (v) => {
      const _ = t.join(h, v), S = t.join(u, v);
      if (!await l(_, S, m)) return;
      const { destStat: O } = await s.checkPaths(_, S, "copy", m);
      return o(O, _, S, m);
    })), f || await e.chmod(u, b.mode);
  }
  async function w(b, f, h, u) {
    let m = await e.readlink(f);
    if (u.dereference && (m = t.resolve(process.cwd(), m)), !b)
      return e.symlink(m, h);
    let y = null;
    try {
      y = await e.readlink(h);
    } catch (v) {
      if (v.code === "EINVAL" || v.code === "UNKNOWN") return e.symlink(m, h);
      throw v;
    }
    if (u.dereference && (y = t.resolve(process.cwd(), y)), s.isSrcSubdir(m, y))
      throw new Error(`Cannot copy '${m}' to a subdirectory of itself, '${y}'.`);
    if (s.isSrcSubdir(y, m))
      throw new Error(`Cannot overwrite '${y}' with '${m}'.`);
    return await e.unlink(h), e.symlink(m, h);
  }
  return si = r, si;
}
var oi, tc;
function Rl() {
  if (tc) return oi;
  tc = 1;
  const e = at(), t = ue, a = Pe().mkdirsSync, n = zc().utimesMillisSync, c = /* @__PURE__ */ We();
  function s(v, _, S) {
    typeof S == "function" && (S = { filter: S }), S = S || {}, S.clobber = "clobber" in S ? !!S.clobber : !0, S.overwrite = "overwrite" in S ? !!S.overwrite : S.clobber, S.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0002"
    );
    const { srcStat: $, destStat: O } = c.checkPathsSync(v, _, "copy", S);
    if (c.checkParentPathsSync(v, $, _, "copy"), S.filter && !S.filter(v, _)) return;
    const T = t.dirname(_);
    return e.existsSync(T) || a(T), r(O, v, _, S);
  }
  function r(v, _, S, $) {
    const T = ($.dereference ? e.statSync : e.lstatSync)(_);
    if (T.isDirectory()) return b(T, v, _, S, $);
    if (T.isFile() || T.isCharacterDevice() || T.isBlockDevice()) return l(T, v, _, S, $);
    if (T.isSymbolicLink()) return m(v, _, S, $);
    throw T.isSocket() ? new Error(`Cannot copy a socket file: ${_}`) : T.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${_}`) : new Error(`Unknown file: ${_}`);
  }
  function l(v, _, S, $, O) {
    return _ ? o(v, S, $, O) : i(v, S, $, O);
  }
  function o(v, _, S, $) {
    if ($.overwrite)
      return e.unlinkSync(S), i(v, _, S, $);
    if ($.errorOnExist)
      throw new Error(`'${S}' already exists`);
  }
  function i(v, _, S, $) {
    return e.copyFileSync(_, S), $.preserveTimestamps && d(v.mode, _, S), p(S, v.mode);
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
  function b(v, _, S, $, O) {
    return _ ? h(S, $, O) : f(v.mode, S, $, O);
  }
  function f(v, _, S, $) {
    return e.mkdirSync(S), h(_, S, $), p(S, v);
  }
  function h(v, _, S) {
    e.readdirSync(v).forEach(($) => u($, v, _, S));
  }
  function u(v, _, S, $) {
    const O = t.join(_, v), T = t.join(S, v);
    if ($.filter && !$.filter(O, T)) return;
    const { destStat: k } = c.checkPathsSync(O, T, "copy", $);
    return r(k, O, T, $);
  }
  function m(v, _, S, $) {
    let O = e.readlinkSync(_);
    if ($.dereference && (O = t.resolve(process.cwd(), O)), v) {
      let T;
      try {
        T = e.readlinkSync(S);
      } catch (k) {
        if (k.code === "EINVAL" || k.code === "UNKNOWN") return e.symlinkSync(O, S);
        throw k;
      }
      if ($.dereference && (T = t.resolve(process.cwd(), T)), c.isSrcSubdir(O, T))
        throw new Error(`Cannot copy '${O}' to a subdirectory of itself, '${T}'.`);
      if (c.isSrcSubdir(T, O))
        throw new Error(`Cannot overwrite '${T}' with '${O}'.`);
      return y(O, S);
    } else
      return e.symlinkSync(O, S);
  }
  function y(v, _) {
    return e.unlinkSync(_), e.symlinkSync(v, _);
  }
  return oi = s, oi;
}
var ai, rc;
function ji() {
  if (rc) return ai;
  rc = 1;
  const e = he().fromPromise;
  return ai = {
    copy: e(/* @__PURE__ */ bl()),
    copySync: /* @__PURE__ */ Rl()
  }, ai;
}
var ci, nc;
function Rr() {
  if (nc) return ci;
  nc = 1;
  const e = at(), t = he().fromCallback;
  function a(c, s) {
    e.rm(c, { recursive: !0, force: !0 }, s);
  }
  function n(c) {
    e.rmSync(c, { recursive: !0, force: !0 });
  }
  return ci = {
    remove: t(a),
    removeSync: n
  }, ci;
}
var ui, ic;
function Ol() {
  if (ic) return ui;
  ic = 1;
  const e = he().fromPromise, t = /* @__PURE__ */ _e(), a = ue, n = /* @__PURE__ */ Pe(), c = /* @__PURE__ */ Rr(), s = e(async function(o) {
    let i;
    try {
      i = await t.readdir(o);
    } catch {
      return n.mkdirs(o);
    }
    return Promise.all(i.map((d) => c.remove(a.join(o, d))));
  });
  function r(l) {
    let o;
    try {
      o = t.readdirSync(l);
    } catch {
      return n.mkdirsSync(l);
    }
    o.forEach((i) => {
      i = a.join(l, i), c.removeSync(i);
    });
  }
  return ui = {
    emptyDirSync: r,
    emptydirSync: r,
    emptyDir: s,
    emptydir: s
  }, ui;
}
var fi, sc;
function Il() {
  if (sc) return fi;
  sc = 1;
  const e = he().fromPromise, t = ue, a = /* @__PURE__ */ _e(), n = /* @__PURE__ */ Pe();
  async function c(r) {
    let l;
    try {
      l = await a.stat(r);
    } catch {
    }
    if (l && l.isFile()) return;
    const o = t.dirname(r);
    let i = null;
    try {
      i = await a.stat(o);
    } catch (d) {
      if (d.code === "ENOENT") {
        await n.mkdirs(o), await a.writeFile(r, "");
        return;
      } else
        throw d;
    }
    i.isDirectory() ? await a.writeFile(r, "") : await a.readdir(o);
  }
  function s(r) {
    let l;
    try {
      l = a.statSync(r);
    } catch {
    }
    if (l && l.isFile()) return;
    const o = t.dirname(r);
    try {
      a.statSync(o).isDirectory() || a.readdirSync(o);
    } catch (i) {
      if (i && i.code === "ENOENT") n.mkdirsSync(o);
      else throw i;
    }
    a.writeFileSync(r, "");
  }
  return fi = {
    createFile: e(c),
    createFileSync: s
  }, fi;
}
var li, oc;
function Nl() {
  if (oc) return li;
  oc = 1;
  const e = he().fromPromise, t = ue, a = /* @__PURE__ */ _e(), n = /* @__PURE__ */ Pe(), { pathExists: c } = /* @__PURE__ */ ze(), { areIdentical: s } = /* @__PURE__ */ We();
  async function r(o, i) {
    let d;
    try {
      d = await a.lstat(i);
    } catch {
    }
    let E;
    try {
      E = await a.lstat(o);
    } catch (w) {
      throw w.message = w.message.replace("lstat", "ensureLink"), w;
    }
    if (d && s(E, d)) return;
    const g = t.dirname(i);
    await c(g) || await n.mkdirs(g), await a.link(o, i);
  }
  function l(o, i) {
    let d;
    try {
      d = a.lstatSync(i);
    } catch {
    }
    try {
      const p = a.lstatSync(o);
      if (d && s(p, d)) return;
    } catch (p) {
      throw p.message = p.message.replace("lstat", "ensureLink"), p;
    }
    const E = t.dirname(i);
    return a.existsSync(E) || n.mkdirsSync(E), a.linkSync(o, i);
  }
  return li = {
    createLink: e(r),
    createLinkSync: l
  }, li;
}
var di, ac;
function Pl() {
  if (ac) return di;
  ac = 1;
  const e = ue, t = /* @__PURE__ */ _e(), { pathExists: a } = /* @__PURE__ */ ze(), n = he().fromPromise;
  async function c(r, l) {
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
    const o = e.dirname(l), i = e.join(o, r);
    if (await a(i))
      return {
        toCwd: i,
        toDst: r
      };
    try {
      await t.lstat(r);
    } catch (E) {
      throw E.message = E.message.replace("lstat", "ensureSymlink"), E;
    }
    return {
      toCwd: r,
      toDst: e.relative(o, r)
    };
  }
  function s(r, l) {
    if (e.isAbsolute(r)) {
      if (!t.existsSync(r)) throw new Error("absolute srcpath does not exist");
      return {
        toCwd: r,
        toDst: r
      };
    }
    const o = e.dirname(l), i = e.join(o, r);
    if (t.existsSync(i))
      return {
        toCwd: i,
        toDst: r
      };
    if (!t.existsSync(r)) throw new Error("relative srcpath does not exist");
    return {
      toCwd: r,
      toDst: e.relative(o, r)
    };
  }
  return di = {
    symlinkPaths: n(c),
    symlinkPathsSync: s
  }, di;
}
var hi, cc;
function Tl() {
  if (cc) return hi;
  cc = 1;
  const e = /* @__PURE__ */ _e(), t = he().fromPromise;
  async function a(c, s) {
    if (s) return s;
    let r;
    try {
      r = await e.lstat(c);
    } catch {
      return "file";
    }
    return r && r.isDirectory() ? "dir" : "file";
  }
  function n(c, s) {
    if (s) return s;
    let r;
    try {
      r = e.lstatSync(c);
    } catch {
      return "file";
    }
    return r && r.isDirectory() ? "dir" : "file";
  }
  return hi = {
    symlinkType: t(a),
    symlinkTypeSync: n
  }, hi;
}
var mi, uc;
function Cl() {
  if (uc) return mi;
  uc = 1;
  const e = he().fromPromise, t = ue, a = /* @__PURE__ */ _e(), { mkdirs: n, mkdirsSync: c } = /* @__PURE__ */ Pe(), { symlinkPaths: s, symlinkPathsSync: r } = /* @__PURE__ */ Pl(), { symlinkType: l, symlinkTypeSync: o } = /* @__PURE__ */ Tl(), { pathExists: i } = /* @__PURE__ */ ze(), { areIdentical: d } = /* @__PURE__ */ We();
  async function E(p, w, b) {
    let f;
    try {
      f = await a.lstat(w);
    } catch {
    }
    if (f && f.isSymbolicLink()) {
      const [y, v] = await Promise.all([
        a.stat(p),
        a.stat(w)
      ]);
      if (d(y, v)) return;
    }
    const h = await s(p, w);
    p = h.toDst;
    const u = await l(h.toCwd, b), m = t.dirname(w);
    return await i(m) || await n(m), a.symlink(p, w, u);
  }
  function g(p, w, b) {
    let f;
    try {
      f = a.lstatSync(w);
    } catch {
    }
    if (f && f.isSymbolicLink()) {
      const y = a.statSync(p), v = a.statSync(w);
      if (d(y, v)) return;
    }
    const h = r(p, w);
    p = h.toDst, b = o(h.toCwd, b);
    const u = t.dirname(w);
    return a.existsSync(u) || c(u), a.symlinkSync(p, w, b);
  }
  return mi = {
    createSymlink: e(E),
    createSymlinkSync: g
  }, mi;
}
var pi, fc;
function Dl() {
  if (fc) return pi;
  fc = 1;
  const { createFile: e, createFileSync: t } = /* @__PURE__ */ Il(), { createLink: a, createLinkSync: n } = /* @__PURE__ */ Nl(), { createSymlink: c, createSymlinkSync: s } = /* @__PURE__ */ Cl();
  return pi = {
    // file
    createFile: e,
    createFileSync: t,
    ensureFile: e,
    ensureFileSync: t,
    // link
    createLink: a,
    createLinkSync: n,
    ensureLink: a,
    ensureLinkSync: n,
    // symlink
    createSymlink: c,
    createSymlinkSync: s,
    ensureSymlink: c,
    ensureSymlinkSync: s
  }, pi;
}
var yi, lc;
function Mi() {
  if (lc) return yi;
  lc = 1;
  function e(a, { EOL: n = `
`, finalEOL: c = !0, replacer: s = null, spaces: r } = {}) {
    const l = c ? n : "";
    return JSON.stringify(a, s, r).replace(/\n/g, n) + l;
  }
  function t(a) {
    return Buffer.isBuffer(a) && (a = a.toString("utf8")), a.replace(/^\uFEFF/, "");
  }
  return yi = { stringify: e, stripBom: t }, yi;
}
var vi, dc;
function Ll() {
  if (dc) return vi;
  dc = 1;
  let e;
  try {
    e = at();
  } catch {
    e = Be;
  }
  const t = he(), { stringify: a, stripBom: n } = Mi();
  async function c(E, g = {}) {
    typeof g == "string" && (g = { encoding: g });
    const p = g.fs || e, w = "throws" in g ? g.throws : !0;
    let b = await t.fromCallback(p.readFile)(E, g);
    b = n(b);
    let f;
    try {
      f = JSON.parse(b, g ? g.reviver : null);
    } catch (h) {
      if (w)
        throw h.message = `${E}: ${h.message}`, h;
      return null;
    }
    return f;
  }
  const s = t.fromPromise(c);
  function r(E, g = {}) {
    typeof g == "string" && (g = { encoding: g });
    const p = g.fs || e, w = "throws" in g ? g.throws : !0;
    try {
      let b = p.readFileSync(E, g);
      return b = n(b), JSON.parse(b, g.reviver);
    } catch (b) {
      if (w)
        throw b.message = `${E}: ${b.message}`, b;
      return null;
    }
  }
  async function l(E, g, p = {}) {
    const w = p.fs || e, b = a(g, p);
    await t.fromCallback(w.writeFile)(E, b, p);
  }
  const o = t.fromPromise(l);
  function i(E, g, p = {}) {
    const w = p.fs || e, b = a(g, p);
    return w.writeFileSync(E, b, p);
  }
  return vi = {
    readFile: s,
    readFileSync: r,
    writeFile: o,
    writeFileSync: i
  }, vi;
}
var Ei, hc;
function Al() {
  if (hc) return Ei;
  hc = 1;
  const e = Ll();
  return Ei = {
    // jsonfile exports
    readJson: e.readFile,
    readJsonSync: e.readFileSync,
    writeJson: e.writeFile,
    writeJsonSync: e.writeFileSync
  }, Ei;
}
var gi, mc;
function xi() {
  if (mc) return gi;
  mc = 1;
  const e = he().fromPromise, t = /* @__PURE__ */ _e(), a = ue, n = /* @__PURE__ */ Pe(), c = ze().pathExists;
  async function s(l, o, i = "utf-8") {
    const d = a.dirname(l);
    return await c(d) || await n.mkdirs(d), t.writeFile(l, o, i);
  }
  function r(l, ...o) {
    const i = a.dirname(l);
    t.existsSync(i) || n.mkdirsSync(i), t.writeFileSync(l, ...o);
  }
  return gi = {
    outputFile: e(s),
    outputFileSync: r
  }, gi;
}
var _i, pc;
function Fl() {
  if (pc) return _i;
  pc = 1;
  const { stringify: e } = Mi(), { outputFile: t } = /* @__PURE__ */ xi();
  async function a(n, c, s = {}) {
    const r = e(c, s);
    await t(n, r, s);
  }
  return _i = a, _i;
}
var Si, yc;
function ql() {
  if (yc) return Si;
  yc = 1;
  const { stringify: e } = Mi(), { outputFileSync: t } = /* @__PURE__ */ xi();
  function a(n, c, s) {
    const r = e(c, s);
    t(n, r, s);
  }
  return Si = a, Si;
}
var wi, vc;
function kl() {
  if (vc) return wi;
  vc = 1;
  const e = he().fromPromise, t = /* @__PURE__ */ Al();
  return t.outputJson = e(/* @__PURE__ */ Fl()), t.outputJsonSync = /* @__PURE__ */ ql(), t.outputJSON = t.outputJson, t.outputJSONSync = t.outputJsonSync, t.writeJSON = t.writeJson, t.writeJSONSync = t.writeJsonSync, t.readJSON = t.readJson, t.readJSONSync = t.readJsonSync, wi = t, wi;
}
var $i, Ec;
function jl() {
  if (Ec) return $i;
  Ec = 1;
  const e = /* @__PURE__ */ _e(), t = ue, { copy: a } = /* @__PURE__ */ ji(), { remove: n } = /* @__PURE__ */ Rr(), { mkdirp: c } = /* @__PURE__ */ Pe(), { pathExists: s } = /* @__PURE__ */ ze(), r = /* @__PURE__ */ We();
  async function l(d, E, g = {}) {
    const p = g.overwrite || g.clobber || !1, { srcStat: w, isChangingCase: b = !1 } = await r.checkPaths(d, E, "move", g);
    await r.checkParentPaths(d, w, E, "move");
    const f = t.dirname(E);
    return t.parse(f).root !== f && await c(f), o(d, E, p, b);
  }
  async function o(d, E, g, p) {
    if (!p) {
      if (g)
        await n(E);
      else if (await s(E))
        throw new Error("dest already exists.");
    }
    try {
      await e.rename(d, E);
    } catch (w) {
      if (w.code !== "EXDEV")
        throw w;
      await i(d, E, g);
    }
  }
  async function i(d, E, g) {
    return await a(d, E, {
      overwrite: g,
      errorOnExist: !0,
      preserveTimestamps: !0
    }), n(d);
  }
  return $i = l, $i;
}
var bi, gc;
function Ml() {
  if (gc) return bi;
  gc = 1;
  const e = at(), t = ue, a = ji().copySync, n = Rr().removeSync, c = Pe().mkdirpSync, s = /* @__PURE__ */ We();
  function r(E, g, p) {
    p = p || {};
    const w = p.overwrite || p.clobber || !1, { srcStat: b, isChangingCase: f = !1 } = s.checkPathsSync(E, g, "move", p);
    return s.checkParentPathsSync(E, b, g, "move"), l(g) || c(t.dirname(g)), o(E, g, w, f);
  }
  function l(E) {
    const g = t.dirname(E);
    return t.parse(g).root === g;
  }
  function o(E, g, p, w) {
    if (w) return i(E, g, p);
    if (p)
      return n(g), i(E, g, p);
    if (e.existsSync(g)) throw new Error("dest already exists.");
    return i(E, g, p);
  }
  function i(E, g, p) {
    try {
      e.renameSync(E, g);
    } catch (w) {
      if (w.code !== "EXDEV") throw w;
      return d(E, g, p);
    }
  }
  function d(E, g, p) {
    return a(E, g, {
      overwrite: p,
      errorOnExist: !0,
      preserveTimestamps: !0
    }), n(E);
  }
  return bi = r, bi;
}
var Ri, _c;
function xl() {
  if (_c) return Ri;
  _c = 1;
  const e = he().fromPromise;
  return Ri = {
    move: e(/* @__PURE__ */ jl()),
    moveSync: /* @__PURE__ */ Ml()
  }, Ri;
}
var Oi, Sc;
function Ul() {
  return Sc || (Sc = 1, Oi = {
    // Export promiseified graceful-fs:
    .../* @__PURE__ */ _e(),
    // Export extra methods:
    .../* @__PURE__ */ ji(),
    .../* @__PURE__ */ Ol(),
    .../* @__PURE__ */ Dl(),
    .../* @__PURE__ */ kl(),
    .../* @__PURE__ */ Pe(),
    .../* @__PURE__ */ xl(),
    .../* @__PURE__ */ xi(),
    .../* @__PURE__ */ ze(),
    .../* @__PURE__ */ Rr()
  }), Oi;
}
var $e = /* @__PURE__ */ Ul();
class Vc {
  constructor(t, a) {
    this.bw = t, this.version = a, t.webContents.on("devtools-opened", () => this.#c()), oe.handle("openDevTools", () => t.webContents.openDevTools()), this.#l.getVersion = a, oe.handle("getInfo", () => this.#l), oe.handle("inited", (c, s, r) => this.#m(s, r)), oe.handle("existsSync", (c, s) => $e.existsSync(s)), oe.handle("copySync", (c, s, r) => $e.copySync(s, r)), oe.handle("removeSync", (c, s) => $e.removeSync(s)), oe.handle("ensureFileSync", (c, s) => $e.ensureFileSync(s)), oe.handle("readFileSync", (c, s) => $e.readFileSync(s, { encoding: "utf8" })), oe.handle("writeFileSync", (c, s, r, l) => $e.writeFileSync(s, r, l)), oe.handle("appendFile", (c, s, r) => $e.appendFile(s, r).catch((l) => console.log(l))), oe.handle("outputFile", (c, s, r) => $e.outputFile(s, r).catch((l) => console.log(l))), oe.handle("win_close", () => t.close()), oe.handle("win_setTitle", (c, s) => t.setTitle(s)), oe.handle("showMessageBox", (c, s) => Hc.showMessageBox(s)), oe.handle("capturePage", (c, s, r, l) => t.webContents.capturePage().then((o) => {
      $e.ensureFileSync(s);
      const i = o.resize({ width: r, height: l, quality: "best" }), d = s.endsWith(".png") ? i.toPNG() : i.toJPEG(80);
      $e.writeFileSync(s, d);
    })), oe.handle("navigate_to", (c, s) => Wc.openExternal(s));
    let n;
    oe.handle("Store", (c, s) => {
      n = new ba(s);
    }), oe.handle("flush", (c, s) => {
      n.store = s;
    }), oe.handle("Store_isEmpty", () => n.size === 0), oe.handle("Store_get", () => n.store), oe.handle("zip", (c, s, r) => {
      const l = new Ua();
      l.addLocalFolder(s), l.writeZip(r);
    }), oe.handle("unzip", (c, s, r) => {
      $e.removeSync(r), $e.ensureDirSync(r), new Ua(s).extractAllTo(r, !0);
    }), oe.handle("isSimpleFullScreen", () => t.simpleFullScreen), Or.isWin ? (oe.handle("setSimpleFullScreen", (c, s) => {
      this.#e = !0, t.setSimpleFullScreen(s), s || (t.setPosition(this.#o, this.#a), t.setContentSize(this.#r, this.#n)), this.#e = !1;
    }), t.on("enter-full-screen", () => {
      t.setContentSize(this.#t.width, this.#t.height);
    }), t.on("leave-full-screen", () => {
      this.#s(!1, this.#o, this.#a, this.#r, this.#n);
    })) : oe.handle("setSimpleFullScreen", (c, s) => {
      t.setSimpleFullScreen(s), !s && t.setContentSize(this.#r, this.#n);
    }), oe.handle("window", (c, s, r, l, o, i) => this.#s(s, r, l, o, i)), t.on("move", () => this.#f()), t.on("resize", () => this.#f()), this.#d();
  }
  static initRenderer(t, a) {
    let n, c = () => {
    };
    try {
      ba.initRenderer(), n = new Kc({
        //	...o,
        // 以下で上書き
        show: !1,
        // ウインドウ位置（とサイズ）決定時に表示
        minWidth: 300,
        minHeight: 300,
        width: 900,
        //TODO: 4test
        height: 670,
        //TODO: 4test
        acceptFirstMouse: !0,
        maximizable: !1,
        // Macで最大化ボタンでフルスクリーンにしない
        webPreferences: {
          preload: t,
          sandbox: !1
          // // XSS対策としてnodeモジュールをレンダラープロセスで使えなくする
          // nodeIntegration		: false,
          // // レンダラープロセスに公開するAPIのファイル
          // contextIsolation	: true,
        }
      });
      const s = new Vc(n, a);
      c = () => s.openDevTools();
    } catch (s) {
      throw console.error(`early err:${s}`), c(), "initRenderer error";
    }
    return n.on("ready-to-show", () => n.show()), oe.on("ping", () => console.log("pong")), n;
  }
  #l = {
    getAppPath: ct.getAppPath(),
    isPackaged: ct.isPackaged,
    downloads: ct.getPath("downloads"),
    userData: ct.getPath("userData"),
    getVersion: "",
    env: { ...process.env },
    platform: process.platform,
    arch: process.arch
  };
  #o = 0;
  #a = 0;
  #r = 0;
  #n = 0;
  #i = 0;
  openDevTools = () => {
  };
  #c = () => {
  };
  //TODO: #evDevtoolsOpened = ()=> this.bw.webContents.closeDevTools();	// 開こうとしたら閉じる
  #m(t, a) {
    const { c: n, x: c, y: s, w: r, h: l } = a;
    if (this.#i = r / l, Or.isWin || this.bw.setAspectRatio(this.#i), this.#s(n, c, s, r, l), this.bw.show(), t.debug.devtool) {
      this.#c = () => {
      }, this.openDevTools = () => this.bw.webContents.openDevTools({
        mode: "detach"
        // 別ウィンドウに切り離すが画面内に戻せない
        //	activate: false,	// 他のウインドウの後ろに回って見失いがち
      }), this.openDevTools();
      return;
    }
    this.#c = () => {
      this.bw.webContents.closeDevTools(), this.bw.setTitle("DevToolは禁止されています。許可する場合は【プロジェクト設定】の【devtool】をONに。"), this.bw.webContents.send("shutdown");
    };
  }
  #t;
  #d() {
    const t = Ui.getCursorScreenPoint(), a = Ui.getDisplayNearestPoint(t);
    this.#t = a.workAreaSize;
  }
  #u = void 0;
  #h = !1;
  #e = !1;
  #f() {
    if (this.#u || this.#e) return;
    this.#e = !0;
    const [t, a] = this.bw.getPosition(), [n, c] = this.bw.getContentSize();
    this.#u = setTimeout(() => {
      if (this.#u = void 0, this.#h) {
        this.#h = !1;
        return;
      }
      this.#e = !1;
      const [s = 0, r = 0] = this.bw.getPosition(), [l = 0, o = 0] = this.bw.getContentSize();
      if (t !== s || a !== r || n !== l || c !== o) {
        this.#f();
        return;
      }
      this.#s(!1, s, r, l, o);
    }, 1e3 / 60 * 10);
  }
  #s(t, a, n, c, s) {
    this.#e || (this.#e = !0, !this.bw.simpleFullScreen && (t && (this.#d(), a = (this.#t.width - c) * 0.5, n = (this.#t.height - s) * 0.5), this.#o = a = Math.round(a), this.#a = n = Math.round(n), this.bw.setPosition(a, n), Or.isWin && (this.#r !== c ? s = c / this.#i : c = s * this.#i), this.#r = c = Math.round(c), this.#n = s = Math.round(s), this.bw.setContentSize(c, s), this.bw.webContents.send("save_win_inf", { c: t, x: a, y: n, w: c, h: s, scrw: this.#t.width, scrh: this.#t.height }), this.#e = !1));
  }
}
export {
  Vc as appMain
};
//# sourceMappingURL=appMain.js.map
