import Bc, { ipcMain as at, dialog as Hc, shell as Wc, BrowserWindow as Kc, app as ct, screen as Ui } from "electron";
import Ge from "fs";
import Xc from "constants";
import Zc from "stream";
import Ii from "util";
import wc from "assert";
import ce from "path";
import $c from "crypto";
import Jc from "events";
import Yc from "os";
import bc from "zlib";
var rt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Rc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var et = { exports: {} };
/*!
 * Platform.js v1.3.6
 * Copyright 2014-2020 Benjamin Tan
 * Copyright 2011-2013 John-David Dalton
 * Available under MIT license
 */
var Qc = et.exports, zi;
function eu() {
  return zi || (zi = 1, function(e, t) {
    (function() {
      var o = {
        function: !0,
        object: !0
      }, n = o[typeof window] && window || this, u = t, a = e && !e.nodeType && e, r = u && a && typeof rt == "object" && rt;
      r && (r.global === r || r.window === r || r.self === r) && (n = r);
      var f = Math.pow(2, 53) - 1, i = /\bOpera/, s = Object.prototype, d = s.hasOwnProperty, E = s.toString;
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
        if (typeof k == "number" && k > -1 && k <= f)
          for (; ++T < k; )
            O($[T], T, $);
        else
          l($, O);
      }
      function b($) {
        return $ = v($), /^(?:webOS|i(?:OS|P))/.test($) ? $ : g($);
      }
      function l($, O) {
        for (var T in $)
          d.call($, T) && O($[T], T, $);
      }
      function h($) {
        return $ == null ? g($) : E.call($).slice(8, -1);
      }
      function c($, O) {
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
        var U = T ? !!k.likeChrome : /\bChrome\b/.test($) && !/internal|\n/i.test(E.toString()), z = "Object", V = T ? z : "ScriptBridgingProxyObject", Z = T ? z : "Environment", B = T && O.java ? "JavaPackage" : h(O.java), A = T ? z : "RuntimeObject", x = /\bJava/.test(B) && O.java, D = x && h(O.environment) == Z, C = x ? "a" : "α", j = x ? "b" : "β", L = O.document || {}, R = O.operamini || O.opera, N = i.test(N = T && R ? R["[[Class]]"] : h(R)) ? N : R = null, I, K = $, W = [], Q = null, J = $ == H, P = J && R && typeof R.version == "function" && R.version(), q, M = _e([
          { label: "EdgeHTML", pattern: "Edge" },
          "Trident",
          { label: "WebKit", pattern: "AppleWebKit" },
          "iCab",
          "Presto",
          "NetFront",
          "Tasman",
          "KHTML",
          "Gecko"
        ]), F = me([
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
        ]), G = Pe([
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
        ]), Y = he({
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
        }), X = ue([
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
        function _e(ae) {
          return y(ae, function(se, re) {
            return se || RegExp("\\b" + (re.pattern || m(re)) + "\\b", "i").exec($) && (re.label || re);
          });
        }
        function he(ae) {
          return y(ae, function(se, re, Ee) {
            return se || (re[G] || re[/^[a-z]+(?: +[a-z]+\b)*/i.exec(G)] || RegExp("\\b" + m(Ee) + "(?:\\b|\\w*\\d)", "i").exec($)) && Ee;
          });
        }
        function me(ae) {
          return y(ae, function(se, re) {
            return se || RegExp("\\b" + (re.pattern || m(re)) + "\\b", "i").exec($) && (re.label || re);
          });
        }
        function ue(ae) {
          return y(ae, function(se, re) {
            var Ee = re.pattern || m(re);
            return !se && (se = RegExp("\\b" + Ee + "(?:/[\\d.]+|[ \\w.]*)", "i").exec($)) && (se = p(se, Ee, re.label || re)), se;
          });
        }
        function Pe(ae) {
          return y(ae, function(se, re) {
            var Ee = re.pattern || m(re);
            return !se && (se = RegExp("\\b" + Ee + " *\\d+[.\\w_]*", "i").exec($) || RegExp("\\b" + Ee + " *\\w+-[\\w]*", "i").exec($) || RegExp("\\b" + Ee + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec($)) && ((se = String(re.label && !RegExp(Ee, "i").test(re.label) ? re.label : se).split("/"))[1] && !/[\d.]+/.test(se[0]) && (se[0] += " " + se[1]), re = re.label || re, se = b(se[0].replace(RegExp(Ee, "i"), re).replace(RegExp("; *(?:" + re + "[_-])?", "i"), " ").replace(RegExp("(" + re + ")[-_.]?(\\w)", "i"), "$1 $2"))), se;
          });
        }
        function pe(ae) {
          return y(ae, function(se, re) {
            return se || (RegExp(re + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec($) || 0)[1] || null;
          });
        }
        function We() {
          return this.description || "";
        }
        if (M && (M = [M]), /\bAndroid\b/.test(X) && !G && (I = /\bAndroid[^;]*;(.*?)(?:Build|\) AppleWebKit)\b/i.exec($)) && (G = v(I[1]).replace(/^[a-z]{2}-[a-z]{2};\s*/i, "") || null), Y && !G ? G = Pe([Y]) : Y && G && (G = G.replace(RegExp("^(" + m(Y) + ")[-_.\\s]", "i"), Y + " ").replace(RegExp("^(" + m(Y) + ")[-_.]?(\\w)", "i"), Y + " $2")), (I = /\bGoogle TV\b/.exec(G)) && (G = I[0]), /\bSimulator\b/i.test($) && (G = (G ? G + " " : "") + "Simulator"), F == "Opera Mini" && /\bOPiOS\b/.test($) && W.push("running in Turbo/Uncompressed mode"), F == "IE" && /\blike iPhone OS\b/.test($) ? (I = _($.replace(/like iPhone OS/, "")), Y = I.manufacturer, G = I.product) : /^iP/.test(G) ? (F || (F = "Safari"), X = "iOS" + ((I = / OS ([\d_]+)/i.exec($)) ? " " + I[1].replace(/_/g, ".") : "")) : F == "Konqueror" && /^Linux\b/i.test(X) ? X = "Kubuntu" : Y && Y != "Google" && (/Chrome/.test(F) && !/\bMobile Safari\b/i.test($) || /\bVita\b/.test(G)) || /\bAndroid\b/.test(X) && /^Chrome/.test(F) && /\bVersion\//i.test($) ? (F = "Android Browser", X = /\bAndroid\b/.test(X) ? X : "Android") : F == "Silk" ? (/\bMobi/i.test($) || (X = "Android", W.unshift("desktop mode")), /Accelerated *= *true/i.test($) && W.unshift("accelerated")) : F == "UC Browser" && /\bUCWEB\b/.test($) ? W.push("speed mode") : F == "PaleMoon" && (I = /\bFirefox\/([\d.]+)\b/.exec($)) ? W.push("identifying as Firefox " + I[1]) : F == "Firefox" && (I = /\b(Mobile|Tablet|TV)\b/i.exec($)) ? (X || (X = "Firefox OS"), G || (G = I[1])) : !F || (I = !/\bMinefield\b/i.test($) && /\b(?:Firefox|Safari)\b/.exec(F)) ? (F && !G && /[\/,]|^[^(]+?\)/.test($.slice($.indexOf(I + "/") + 8)) && (F = null), (I = G || Y || X) && (G || Y || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(X)) && (F = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(X) ? X : I) + " Browser")) : F == "Electron" && (I = (/\bChrome\/([\d.]+)\b/.exec($) || 0)[1]) && W.push("Chromium " + I), P || (P = pe([
          "(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|HeadlessChrome|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$)|UCBrowser|YaBrowser)",
          "Version",
          m(F),
          "(?:Firefox|Minefield|NetFront)"
        ])), (I = M == "iCab" && parseFloat(P) > 3 && "WebKit" || /\bOpera\b/.test(F) && (/\bOPR\b/.test($) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test($) && !/^(?:Trident|EdgeHTML)$/.test(M) && "WebKit" || !M && /\bMSIE\b/i.test($) && (X == "Mac OS" ? "Tasman" : "Trident") || M == "WebKit" && /\bPlayStation\b(?! Vita\b)/i.test(F) && "NetFront") && (M = [I]), F == "IE" && (I = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec($) || 0)[1]) ? (F += " Mobile", X = "Windows Phone " + (/\+$/.test(I) ? I : I + ".x"), W.unshift("desktop mode")) : /\bWPDesktop\b/i.test($) ? (F = "IE Mobile", X = "Windows Phone 8.x", W.unshift("desktop mode"), P || (P = (/\brv:([\d.]+)/.exec($) || 0)[1])) : F != "IE" && M == "Trident" && (I = /\brv:([\d.]+)/.exec($)) && (F && W.push("identifying as " + F + (P ? " " + P : "")), F = "IE", P = I[1]), J) {
          if (c(O, "global"))
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
        else (/\bBlackBerry\b/.test(G) || /\bBB10\b/.test($)) && (I = (RegExp(G.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec($) || 0)[1] || P) ? (I = [I, /BB10/.test($)], X = (I[1] ? (G = null, Y = "BlackBerry") : "Device Software") + " " + I[0], P = null) : this != l && G != "Wii" && (J && R || /Opera/.test(F) && /\b(?:MSIE|Firefox)\b/i.test($) || F == "Firefox" && /\bOS X (?:\d+\.){2,}/.test(X) || F == "IE" && (X && !/^Win/.test(X) && P > 5.5 || /\bWindows XP\b/.test(X) && P > 8 || P == 8 && !/\bTrident\b/.test($))) && !i.test(I = _.call(l, $.replace(i, "") + ";")) && I.name && (I = "ing as " + I.name + ((I = I.version) ? " " + I : ""), i.test(F) ? (/\bIE\b/.test(I) && X == "Mac OS" && (X = null), I = "identify" + I) : (I = "mask" + I, N ? F = b(N.replace(/([a-z])([A-Z])/g, "$1 $2")) : F = "Opera", /\bIE\b/.test(I) && (X = null), J || (P = null)), M = ["Presto"], W.push(I));
        (I = (/\bAppleWebKit\/([\d.]+\+?)/i.exec($) || 0)[1]) && (I = [parseFloat(I.replace(/\.(\d)$/, ".0$1")), I], F == "Safari" && I[1].slice(-1) == "+" ? (F = "WebKit Nightly", Q = "alpha", P = I[1].slice(0, -1)) : (P == I[1] || P == (I[2] = (/\bSafari\/([\d.]+\+?)/i.exec($) || 0)[1])) && (P = null), I[1] = (/\b(?:Headless)?Chrome\/([\d.]+)/i.exec($) || 0)[1], I[0] == 537.36 && I[2] == 537.36 && parseFloat(I[1]) >= 28 && M == "WebKit" && (M = ["Blink"]), !J || !U && !I[1] ? (M && (M[1] = "like Safari"), I = (I = I[0], I < 400 ? 1 : I < 500 ? 2 : I < 526 ? 3 : I < 533 ? 4 : I < 534 ? "4+" : I < 535 ? 5 : I < 537 ? 6 : I < 538 ? 7 : I < 601 ? 8 : I < 602 ? 9 : I < 604 ? 10 : I < 606 ? 11 : I < 608 ? 12 : "12")) : (M && (M[1] = "like Chrome"), I = I[1] || (I = I[0], I < 530 ? 1 : I < 532 ? 2 : I < 532.05 ? 3 : I < 533 ? 4 : I < 534.03 ? 5 : I < 534.07 ? 6 : I < 534.1 ? 7 : I < 534.13 ? 8 : I < 534.16 ? 9 : I < 534.24 ? 10 : I < 534.3 ? 11 : I < 535.01 ? 12 : I < 535.02 ? "13+" : I < 535.07 ? 15 : I < 535.11 ? 16 : I < 535.19 ? 17 : I < 536.05 ? 18 : I < 536.1 ? 19 : I < 537.01 ? 20 : I < 537.11 ? "21+" : I < 537.13 ? 23 : I < 537.18 ? 24 : I < 537.24 ? 25 : I < 537.36 ? 26 : M != "Blink" ? "27" : "28")), M && (M[1] += " " + (I += typeof I == "number" ? ".x" : /[.+]/.test(I) ? "" : "+")), F == "Safari" && (!P || parseInt(P) > 45) ? P = I : F == "Chrome" && /\bHeadlessChrome/i.test($) && W.unshift("headless")), F == "Opera" && (I = /\bzbov|zvav$/.exec(X)) ? (F += " ", W.unshift("desktop mode"), I == "zvav" ? (F += "Mini", P = null) : F += "Mobile", X = X.replace(RegExp(" *" + I + "$"), "")) : F == "Safari" && /\bChrome\b/.exec(M && M[1]) ? (W.unshift("desktop mode"), F = "Chrome Mobile", P = null, /\bOS X\b/.test(X) ? (Y = "Apple", X = "iOS 4.3+") : X = null) : /\bSRWare Iron\b/.test(F) && !P && (P = pe("Chrome")), P && P.indexOf(I = /[\d.]+$/.exec(X)) == 0 && $.indexOf("/" + I + "-") > -1 && (X = v(X.replace(I, ""))), X && X.indexOf(F) != -1 && !RegExp(F + " OS").test(X) && (X = X.replace(RegExp(" *" + m(F) + " *"), "")), M && !/\b(?:Avant|Nook)\b/.test(F) && (/Browser|Lunascape|Maxthon/.test(F) || F != "Safari" && /^iOS/.test(X) && /\bSafari\b/.test(M[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|SRWare Iron|Vivaldi|Web)/.test(F) && M[1]) && (I = M[M.length - 1]) && W.push(I), W.length && (W = ["(" + W.join("; ") + ")"]), Y && G && G.indexOf(Y) < 0 && W.push("on " + Y), G && W.push((/^on /.test(W[W.length - 1]) ? "" : "on ") + G), X && (I = / ([\d.+]+)$/.exec(X), q = I && X.charAt(X.length - I[0].length - 1) == "/", X = {
          architecture: 32,
          family: I && !q ? X.replace(I[0], "") : X,
          version: I ? I[1] : null,
          toString: function() {
            var ae = this.version;
            return this.family + (ae && !q ? " " + ae : "") + (this.architecture == 64 ? " 64-bit" : "");
          }
        }), (I = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(K)) && !/\bi686\b/i.test(K) ? (X && (X.architecture = 64, X.family = X.family.replace(RegExp(" *" + I), "")), F && (/\bWOW64\b/i.test($) || J && /\w(?:86|32)$/.test(k.cpuClass || k.platform) && !/\bWin64; x64\b/i.test($)) && W.unshift("32-bit")) : X && /^OS X/.test(X.family) && F == "Chrome" && parseFloat(P) >= 39 && (X.architecture = 64), $ || ($ = null);
        var fe = {};
        return fe.description = $, fe.layout = M && M[0], fe.manufacturer = Y, fe.name = F, fe.prerelease = Q, fe.product = G, fe.ua = $, fe.version = F && P, fe.os = X || {
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
        }, fe.parse = _, fe.toString = We, fe.version && W.unshift(P), fe.name && W.unshift(F), X && F && !(X == String(X).split(" ")[0] && (X == F.split(" ")[0] || G)) && W.push(G ? "(" + X + ")" : "on " + X), W.length && (fe.description = W.join(" ")), fe;
      }
      var S = _();
      u && a ? l(S, function($, O) {
        u[O] = $;
      }) : n.platform = S;
    }).call(Qc);
  }(et, et.exports)), et.exports;
}
var Ke = eu();
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
  static isSafari = Ke.name === "Safari";
  static isFirefox = Ke.name === "Firefox";
  static isMac = /OS X/.test(Ke.os?.family ?? "");
  static isWin = /Windows/.test(Ke.os?.family ?? "");
  static isMobile = !/(Windows|OS X)/.test(Ke.os?.family ?? "");
  static hDip = {};
  static isDbg = !1;
  static isPackaged = !1;
  static isDarkMode = !1;
  static cc4ColorName;
}
var Ir = {}, ut = {}, Vi;
function de() {
  return Vi || (Vi = 1, ut.fromCallback = function(e) {
    return Object.defineProperty(function(...t) {
      if (typeof t[t.length - 1] == "function") e.apply(this, t);
      else
        return new Promise((o, n) => {
          t.push((u, a) => u != null ? n(u) : o(a)), e.apply(this, t);
        });
    }, "name", { value: e.name });
  }, ut.fromPromise = function(e) {
    return Object.defineProperty(function(...t) {
      const o = t[t.length - 1];
      if (typeof o != "function") return e.apply(this, t);
      t.pop(), e.apply(this, t).then((n) => o(null, n), o);
    }, "name", { value: e.name });
  }), ut;
}
var Nr, Gi;
function tu() {
  if (Gi) return Nr;
  Gi = 1;
  var e = Xc, t = process.cwd, o = null, n = process.env.GRACEFUL_FS_PLATFORM || process.platform;
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
  Nr = a;
  function a(r) {
    e.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && f(r), r.lutimes || i(r), r.chown = E(r.chown), r.fchown = E(r.fchown), r.lchown = E(r.lchown), r.chmod = s(r.chmod), r.fchmod = s(r.fchmod), r.lchmod = s(r.lchmod), r.chownSync = g(r.chownSync), r.fchownSync = g(r.fchownSync), r.lchownSync = g(r.lchownSync), r.chmodSync = d(r.chmodSync), r.fchmodSync = d(r.fchmodSync), r.lchmodSync = d(r.lchmodSync), r.stat = p(r.stat), r.fstat = p(r.fstat), r.lstat = p(r.lstat), r.statSync = w(r.statSync), r.fstatSync = w(r.fstatSync), r.lstatSync = w(r.lstatSync), r.chmod && !r.lchmod && (r.lchmod = function(l, h, c) {
      c && process.nextTick(c);
    }, r.lchmodSync = function() {
    }), r.chown && !r.lchown && (r.lchown = function(l, h, c, m) {
      m && process.nextTick(m);
    }, r.lchownSync = function() {
    }), n === "win32" && (r.rename = typeof r.rename != "function" ? r.rename : function(l) {
      function h(c, m, y) {
        var v = Date.now(), _ = 0;
        l(c, m, function S($) {
          if ($ && ($.code === "EACCES" || $.code === "EPERM" || $.code === "EBUSY") && Date.now() - v < 6e4) {
            setTimeout(function() {
              r.stat(m, function(O, T) {
                O && O.code === "ENOENT" ? l(c, m, S) : y($);
              });
            }, _), _ < 100 && (_ += 10);
            return;
          }
          y && y($);
        });
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(h, l), h;
    }(r.rename)), r.read = typeof r.read != "function" ? r.read : function(l) {
      function h(c, m, y, v, _, S) {
        var $;
        if (S && typeof S == "function") {
          var O = 0;
          $ = function(T, k, H) {
            if (T && T.code === "EAGAIN" && O < 10)
              return O++, l.call(r, c, m, y, v, _, $);
            S.apply(this, arguments);
          };
        }
        return l.call(r, c, m, y, v, _, $);
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
    function f(l) {
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
            l.close(_, function($) {
              y && y(S || $);
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
          b(y) && (y = null), m && m.apply(this, arguments);
        });
      };
    }
    function d(l) {
      return l && function(h, c) {
        try {
          return l.call(r, h, c);
        } catch (m) {
          if (!b(m)) throw m;
        }
      };
    }
    function E(l) {
      return l && function(h, c, m, y) {
        return l.call(r, h, c, m, function(v) {
          b(v) && (v = null), y && y.apply(this, arguments);
        });
      };
    }
    function g(l) {
      return l && function(h, c, m) {
        try {
          return l.call(r, h, c, m);
        } catch (y) {
          if (!b(y)) throw y;
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
    function b(l) {
      if (!l || l.code === "ENOSYS")
        return !0;
      var h = !process.getuid || process.getuid() !== 0;
      return !!(h && (l.code === "EINVAL" || l.code === "EPERM"));
    }
  }
  return Nr;
}
var Pr, Bi;
function ru() {
  if (Bi) return Pr;
  Bi = 1;
  var e = Zc.Stream;
  Pr = t;
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
          f._read();
        });
        return;
      }
      o.open(this.path, this.flags, this.mode, function(g, p) {
        if (g) {
          f.emit("error", g), f.readable = !1;
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
  return Pr;
}
var Tr, Hi;
function nu() {
  if (Hi) return Tr;
  Hi = 1, Tr = t;
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
  return Tr;
}
var ft, Wi;
function nt() {
  if (Wi) return ft;
  Wi = 1;
  var e = Ge, t = tu(), o = ru(), n = nu(), u = Ii, a, r;
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
    var d = rt[a] || [];
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
      s(e[a]), wc.equal(e[a].length, 0);
    });
  }
  rt[a] || i(rt, e[a]), ft = E(n(e)), process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !e.__patched && (ft = E(e), e.__patched = !0);
  function E(l) {
    t(l), l.gracefulify = E, l.createReadStream = C, l.createWriteStream = j;
    var h = l.readFile;
    l.readFile = c;
    function c(N, I, K) {
      return typeof I == "function" && (K = I, I = null), W(N, I, K);
      function W(Q, J, P, q) {
        return h(Q, J, function(M) {
          M && (M.code === "EMFILE" || M.code === "ENFILE") ? g([W, [Q, J, P], M, q || Date.now(), Date.now()]) : typeof P == "function" && P.apply(this, arguments);
        });
      }
    }
    var m = l.writeFile;
    l.writeFile = y;
    function y(N, I, K, W) {
      return typeof K == "function" && (W = K, K = null), Q(N, I, K, W);
      function Q(J, P, q, M, F) {
        return m(J, P, q, function(G) {
          G && (G.code === "EMFILE" || G.code === "ENFILE") ? g([Q, [J, P, q, M], G, F || Date.now(), Date.now()]) : typeof M == "function" && M.apply(this, arguments);
        });
      }
    }
    var v = l.appendFile;
    v && (l.appendFile = _);
    function _(N, I, K, W) {
      return typeof K == "function" && (W = K, K = null), Q(N, I, K, W);
      function Q(J, P, q, M, F) {
        return v(J, P, q, function(G) {
          G && (G.code === "EMFILE" || G.code === "ENFILE") ? g([Q, [J, P, q, M], G, F || Date.now(), Date.now()]) : typeof M == "function" && M.apply(this, arguments);
        });
      }
    }
    var S = l.copyFile;
    S && (l.copyFile = $);
    function $(N, I, K, W) {
      return typeof K == "function" && (W = K, K = 0), Q(N, I, K, W);
      function Q(J, P, q, M, F) {
        return S(J, P, q, function(G) {
          G && (G.code === "EMFILE" || G.code === "ENFILE") ? g([Q, [J, P, q, M], G, F || Date.now(), Date.now()]) : typeof M == "function" && M.apply(this, arguments);
        });
      }
    }
    var O = l.readdir;
    l.readdir = k;
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
      var H = o(l);
      B = H.ReadStream, x = H.WriteStream;
    }
    var U = l.ReadStream;
    U && (B.prototype = Object.create(U.prototype), B.prototype.open = A);
    var z = l.WriteStream;
    z && (x.prototype = Object.create(z.prototype), x.prototype.open = D), Object.defineProperty(l, "ReadStream", {
      get: function() {
        return B;
      },
      set: function(N) {
        B = N;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(l, "WriteStream", {
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
    Object.defineProperty(l, "FileReadStream", {
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
    Object.defineProperty(l, "FileWriteStream", {
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
      return new l.ReadStream(N, I);
    }
    function j(N, I) {
      return new l.WriteStream(N, I);
    }
    var L = l.open;
    l.open = R;
    function R(N, I, K, W) {
      return typeof K == "function" && (W = K, K = null), Q(N, I, K, W);
      function Q(J, P, q, M, F) {
        return L(J, P, q, function(G, Y) {
          G && (G.code === "EMFILE" || G.code === "ENFILE") ? g([Q, [J, P, q, M], G, F || Date.now(), Date.now()]) : typeof M == "function" && M.apply(this, arguments);
        });
      }
    }
    return l;
  }
  function g(l) {
    s("ENQUEUE", l[0].name, l[1]), e[a].push(l), b();
  }
  var p;
  function w() {
    for (var l = Date.now(), h = 0; h < e[a].length; ++h)
      e[a][h].length > 2 && (e[a][h][3] = l, e[a][h][4] = l);
    b();
  }
  function b() {
    if (clearTimeout(p), p = void 0, e[a].length !== 0) {
      var l = e[a].shift(), h = l[0], c = l[1], m = l[2], y = l[3], v = l[4];
      if (y === void 0)
        s("RETRY", h.name, c), h.apply(null, c);
      else if (Date.now() - y >= 6e4) {
        s("TIMEOUT", h.name, c);
        var _ = c.pop();
        typeof _ == "function" && _.call(null, m);
      } else {
        var S = Date.now() - v, $ = Math.max(v - y, 1), O = Math.min($ * 1.2, 100);
        S >= O ? (s("RETRY", h.name, c), h.apply(null, c.concat([y]))) : e[a].push(l);
      }
      p === void 0 && (p = setTimeout(b, 0));
    }
  }
  return ft;
}
var Ki;
function ge() {
  return Ki || (Ki = 1, function(e) {
    const t = de().fromCallback, o = nt(), n = [
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
    ].filter((u) => typeof o[u] == "function");
    Object.assign(e, o), n.forEach((u) => {
      e[u] = t(o[u]);
    }), e.exists = function(u, a) {
      return typeof a == "function" ? o.exists(u, a) : new Promise((r) => o.exists(u, r));
    }, e.read = function(u, a, r, f, i, s) {
      return typeof s == "function" ? o.read(u, a, r, f, i, s) : new Promise((d, E) => {
        o.read(u, a, r, f, i, (g, p, w) => {
          if (g) return E(g);
          d({ bytesRead: p, buffer: w });
        });
      });
    }, e.write = function(u, a, ...r) {
      return typeof r[r.length - 1] == "function" ? o.write(u, a, ...r) : new Promise((f, i) => {
        o.write(u, a, ...r, (s, d, E) => {
          if (s) return i(s);
          f({ bytesWritten: d, buffer: E });
        });
      });
    }, e.readv = function(u, a, ...r) {
      return typeof r[r.length - 1] == "function" ? o.readv(u, a, ...r) : new Promise((f, i) => {
        o.readv(u, a, ...r, (s, d, E) => {
          if (s) return i(s);
          f({ bytesRead: d, buffers: E });
        });
      });
    }, e.writev = function(u, a, ...r) {
      return typeof r[r.length - 1] == "function" ? o.writev(u, a, ...r) : new Promise((f, i) => {
        o.writev(u, a, ...r, (s, d, E) => {
          if (s) return i(s);
          f({ bytesWritten: d, buffers: E });
        });
      });
    }, typeof o.realpath.native == "function" ? e.realpath.native = t(o.realpath.native) : process.emitWarning(
      "fs.realpath.native is not a function. Is fs being monkey-patched?",
      "Warning",
      "fs-extra-WARN0003"
    );
  }(Ir)), Ir;
}
var lt = {}, Cr = {}, Xi;
function iu() {
  if (Xi) return Cr;
  Xi = 1;
  const e = ce;
  return Cr.checkPath = function(o) {
    if (process.platform === "win32" && /[<>:"|?*]/.test(o.replace(e.parse(o).root, ""))) {
      const u = new Error(`Path contains invalid characters: ${o}`);
      throw u.code = "EINVAL", u;
    }
  }, Cr;
}
var Zi;
function su() {
  if (Zi) return lt;
  Zi = 1;
  const e = /* @__PURE__ */ ge(), { checkPath: t } = /* @__PURE__ */ iu(), o = (n) => {
    const u = { mode: 511 };
    return typeof n == "number" ? n : { ...u, ...n }.mode;
  };
  return lt.makeDir = async (n, u) => (t(n), e.mkdir(n, {
    mode: o(u),
    recursive: !0
  })), lt.makeDirSync = (n, u) => (t(n), e.mkdirSync(n, {
    mode: o(u),
    recursive: !0
  })), lt;
}
var Dr, Ji;
function Ne() {
  if (Ji) return Dr;
  Ji = 1;
  const e = de().fromPromise, { makeDir: t, makeDirSync: o } = /* @__PURE__ */ su(), n = e(t);
  return Dr = {
    mkdirs: n,
    mkdirsSync: o,
    // alias
    mkdirp: n,
    mkdirpSync: o,
    ensureDir: n,
    ensureDirSync: o
  }, Dr;
}
var Lr, Yi;
function Ue() {
  if (Yi) return Lr;
  Yi = 1;
  const e = de().fromPromise, t = /* @__PURE__ */ ge();
  function o(n) {
    return t.access(n).then(() => !0).catch(() => !1);
  }
  return Lr = {
    pathExists: e(o),
    pathExistsSync: t.existsSync
  }, Lr;
}
var Ar, Qi;
function Ic() {
  if (Qi) return Ar;
  Qi = 1;
  const e = /* @__PURE__ */ ge(), t = de().fromPromise;
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
  return Ar = {
    utimesMillis: t(o),
    utimesMillisSync: n
  }, Ar;
}
var Fr, es;
function Be() {
  if (es) return Fr;
  es = 1;
  const e = /* @__PURE__ */ ge(), t = ce, o = de().fromPromise;
  function n(g, p, w) {
    const b = w.dereference ? (l) => e.stat(l, { bigint: !0 }) : (l) => e.lstat(l, { bigint: !0 });
    return Promise.all([
      b(g),
      b(p).catch((l) => {
        if (l.code === "ENOENT") return null;
        throw l;
      })
    ]).then(([l, h]) => ({ srcStat: l, destStat: h }));
  }
  function u(g, p, w) {
    let b;
    const l = w.dereference ? (c) => e.statSync(c, { bigint: !0 }) : (c) => e.lstatSync(c, { bigint: !0 }), h = l(g);
    try {
      b = l(p);
    } catch (c) {
      if (c.code === "ENOENT") return { srcStat: h, destStat: null };
      throw c;
    }
    return { srcStat: h, destStat: b };
  }
  async function a(g, p, w, b) {
    const { srcStat: l, destStat: h } = await n(g, p, b);
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
  function r(g, p, w, b) {
    const { srcStat: l, destStat: h } = u(g, p, b);
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
  async function f(g, p, w, b) {
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
      throw new Error(E(g, w, b));
    return f(g, p, h, b);
  }
  function i(g, p, w, b) {
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
      throw new Error(E(g, w, b));
    return i(g, p, h, b);
  }
  function s(g, p) {
    return p.ino && p.dev && p.ino === g.ino && p.dev === g.dev;
  }
  function d(g, p) {
    const w = t.resolve(g).split(t.sep).filter((l) => l), b = t.resolve(p).split(t.sep).filter((l) => l);
    return w.every((l, h) => b[h] === l);
  }
  function E(g, p, w) {
    return `Cannot ${w} '${g}' to a subdirectory of itself, '${p}'.`;
  }
  return Fr = {
    // checkPaths
    checkPaths: o(a),
    checkPathsSync: r,
    // checkParent
    checkParentPaths: o(f),
    checkParentPathsSync: i,
    // Misc
    isSrcSubdir: d,
    areIdentical: s
  }, Fr;
}
var qr, ts;
function ou() {
  if (ts) return qr;
  ts = 1;
  const e = /* @__PURE__ */ ge(), t = ce, { mkdirs: o } = /* @__PURE__ */ Ne(), { pathExists: n } = /* @__PURE__ */ Ue(), { utimesMillis: u } = /* @__PURE__ */ Ic(), a = /* @__PURE__ */ Be();
  async function r(b, l, h = {}) {
    typeof h == "function" && (h = { filter: h }), h.clobber = "clobber" in h ? !!h.clobber : !0, h.overwrite = "overwrite" in h ? !!h.overwrite : h.clobber, h.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0001"
    );
    const { srcStat: c, destStat: m } = await a.checkPaths(b, l, "copy", h);
    if (await a.checkParentPaths(b, c, l, "copy"), !await f(b, l, h)) return;
    const v = t.dirname(l);
    await n(v) || await o(v), await i(m, b, l, h);
  }
  async function f(b, l, h) {
    return h.filter ? h.filter(b, l) : !0;
  }
  async function i(b, l, h, c) {
    const y = await (c.dereference ? e.stat : e.lstat)(l);
    if (y.isDirectory()) return p(y, b, l, h, c);
    if (y.isFile() || y.isCharacterDevice() || y.isBlockDevice()) return s(y, b, l, h, c);
    if (y.isSymbolicLink()) return w(b, l, h, c);
    throw y.isSocket() ? new Error(`Cannot copy a socket file: ${l}`) : y.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${l}`) : new Error(`Unknown file: ${l}`);
  }
  async function s(b, l, h, c, m) {
    if (!l) return d(b, h, c, m);
    if (m.overwrite)
      return await e.unlink(c), d(b, h, c, m);
    if (m.errorOnExist)
      throw new Error(`'${c}' already exists`);
  }
  async function d(b, l, h, c) {
    if (await e.copyFile(l, h), c.preserveTimestamps) {
      E(b.mode) && await g(h, b.mode);
      const m = await e.stat(l);
      await u(h, m.atime, m.mtime);
    }
    return e.chmod(h, b.mode);
  }
  function E(b) {
    return (b & 128) === 0;
  }
  function g(b, l) {
    return e.chmod(b, l | 128);
  }
  async function p(b, l, h, c, m) {
    l || await e.mkdir(c);
    const y = await e.readdir(h);
    await Promise.all(y.map(async (v) => {
      const _ = t.join(h, v), S = t.join(c, v);
      if (!await f(_, S, m)) return;
      const { destStat: O } = await a.checkPaths(_, S, "copy", m);
      return i(O, _, S, m);
    })), l || await e.chmod(c, b.mode);
  }
  async function w(b, l, h, c) {
    let m = await e.readlink(l);
    if (c.dereference && (m = t.resolve(process.cwd(), m)), !b)
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
  return qr = r, qr;
}
var kr, rs;
function au() {
  if (rs) return kr;
  rs = 1;
  const e = nt(), t = ce, o = Ne().mkdirsSync, n = Ic().utimesMillisSync, u = /* @__PURE__ */ Be();
  function a(v, _, S) {
    typeof S == "function" && (S = { filter: S }), S = S || {}, S.clobber = "clobber" in S ? !!S.clobber : !0, S.overwrite = "overwrite" in S ? !!S.overwrite : S.clobber, S.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0002"
    );
    const { srcStat: $, destStat: O } = u.checkPathsSync(v, _, "copy", S);
    if (u.checkParentPathsSync(v, $, _, "copy"), S.filter && !S.filter(v, _)) return;
    const T = t.dirname(_);
    return e.existsSync(T) || o(T), r(O, v, _, S);
  }
  function r(v, _, S, $) {
    const T = ($.dereference ? e.statSync : e.lstatSync)(_);
    if (T.isDirectory()) return b(T, v, _, S, $);
    if (T.isFile() || T.isCharacterDevice() || T.isBlockDevice()) return f(T, v, _, S, $);
    if (T.isSymbolicLink()) return m(v, _, S, $);
    throw T.isSocket() ? new Error(`Cannot copy a socket file: ${_}`) : T.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${_}`) : new Error(`Unknown file: ${_}`);
  }
  function f(v, _, S, $, O) {
    return _ ? i(v, S, $, O) : s(v, S, $, O);
  }
  function i(v, _, S, $) {
    if ($.overwrite)
      return e.unlinkSync(S), s(v, _, S, $);
    if ($.errorOnExist)
      throw new Error(`'${S}' already exists`);
  }
  function s(v, _, S, $) {
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
    return _ ? h(S, $, O) : l(v.mode, S, $, O);
  }
  function l(v, _, S, $) {
    return e.mkdirSync(S), h(_, S, $), p(S, v);
  }
  function h(v, _, S) {
    e.readdirSync(v).forEach(($) => c($, v, _, S));
  }
  function c(v, _, S, $) {
    const O = t.join(_, v), T = t.join(S, v);
    if ($.filter && !$.filter(O, T)) return;
    const { destStat: k } = u.checkPathsSync(O, T, "copy", $);
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
      if ($.dereference && (T = t.resolve(process.cwd(), T)), u.isSrcSubdir(O, T))
        throw new Error(`Cannot copy '${O}' to a subdirectory of itself, '${T}'.`);
      if (u.isSrcSubdir(T, O))
        throw new Error(`Cannot overwrite '${T}' with '${O}'.`);
      return y(O, S);
    } else
      return e.symlinkSync(O, S);
  }
  function y(v, _) {
    return e.unlinkSync(_), e.symlinkSync(v, _);
  }
  return kr = a, kr;
}
var jr, ns;
function Ni() {
  if (ns) return jr;
  ns = 1;
  const e = de().fromPromise;
  return jr = {
    copy: e(/* @__PURE__ */ ou()),
    copySync: /* @__PURE__ */ au()
  }, jr;
}
var Mr, is;
function yr() {
  if (is) return Mr;
  is = 1;
  const e = nt(), t = de().fromCallback;
  function o(u, a) {
    e.rm(u, { recursive: !0, force: !0 }, a);
  }
  function n(u) {
    e.rmSync(u, { recursive: !0, force: !0 });
  }
  return Mr = {
    remove: t(o),
    removeSync: n
  }, Mr;
}
var xr, ss;
function cu() {
  if (ss) return xr;
  ss = 1;
  const e = de().fromPromise, t = /* @__PURE__ */ ge(), o = ce, n = /* @__PURE__ */ Ne(), u = /* @__PURE__ */ yr(), a = e(async function(i) {
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
  return xr = {
    emptyDirSync: r,
    emptydirSync: r,
    emptyDir: a,
    emptydir: a
  }, xr;
}
var Ur, os;
function uu() {
  if (os) return Ur;
  os = 1;
  const e = de().fromPromise, t = ce, o = /* @__PURE__ */ ge(), n = /* @__PURE__ */ Ne();
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
  return Ur = {
    createFile: e(u),
    createFileSync: a
  }, Ur;
}
var zr, as;
function fu() {
  if (as) return zr;
  as = 1;
  const e = de().fromPromise, t = ce, o = /* @__PURE__ */ ge(), n = /* @__PURE__ */ Ne(), { pathExists: u } = /* @__PURE__ */ Ue(), { areIdentical: a } = /* @__PURE__ */ Be();
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
    await u(g) || await n.mkdirs(g), await o.link(i, s);
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
    const E = t.dirname(s);
    return o.existsSync(E) || n.mkdirsSync(E), o.linkSync(i, s);
  }
  return zr = {
    createLink: e(r),
    createLinkSync: f
  }, zr;
}
var Vr, cs;
function lu() {
  if (cs) return Vr;
  cs = 1;
  const e = ce, t = /* @__PURE__ */ ge(), { pathExists: o } = /* @__PURE__ */ Ue(), n = de().fromPromise;
  async function u(r, f) {
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
    const i = e.dirname(f), s = e.join(i, r);
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
  return Vr = {
    symlinkPaths: n(u),
    symlinkPathsSync: a
  }, Vr;
}
var Gr, us;
function du() {
  if (us) return Gr;
  us = 1;
  const e = /* @__PURE__ */ ge(), t = de().fromPromise;
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
  return Gr = {
    symlinkType: t(o),
    symlinkTypeSync: n
  }, Gr;
}
var Br, fs;
function hu() {
  if (fs) return Br;
  fs = 1;
  const e = de().fromPromise, t = ce, o = /* @__PURE__ */ ge(), { mkdirs: n, mkdirsSync: u } = /* @__PURE__ */ Ne(), { symlinkPaths: a, symlinkPathsSync: r } = /* @__PURE__ */ lu(), { symlinkType: f, symlinkTypeSync: i } = /* @__PURE__ */ du(), { pathExists: s } = /* @__PURE__ */ Ue(), { areIdentical: d } = /* @__PURE__ */ Be();
  async function E(p, w, b) {
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
    const c = await f(h.toCwd, b), m = t.dirname(w);
    return await s(m) || await n(m), o.symlink(p, w, c);
  }
  function g(p, w, b) {
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
    p = h.toDst, b = i(h.toCwd, b);
    const c = t.dirname(w);
    return o.existsSync(c) || u(c), o.symlinkSync(p, w, b);
  }
  return Br = {
    createSymlink: e(E),
    createSymlinkSync: g
  }, Br;
}
var Hr, ls;
function mu() {
  if (ls) return Hr;
  ls = 1;
  const { createFile: e, createFileSync: t } = /* @__PURE__ */ uu(), { createLink: o, createLinkSync: n } = /* @__PURE__ */ fu(), { createSymlink: u, createSymlinkSync: a } = /* @__PURE__ */ hu();
  return Hr = {
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
  }, Hr;
}
var Wr, ds;
function Pi() {
  if (ds) return Wr;
  ds = 1;
  function e(o, { EOL: n = `
`, finalEOL: u = !0, replacer: a = null, spaces: r } = {}) {
    const f = u ? n : "";
    return JSON.stringify(o, a, r).replace(/\n/g, n) + f;
  }
  function t(o) {
    return Buffer.isBuffer(o) && (o = o.toString("utf8")), o.replace(/^\uFEFF/, "");
  }
  return Wr = { stringify: e, stripBom: t }, Wr;
}
var Kr, hs;
function pu() {
  if (hs) return Kr;
  hs = 1;
  let e;
  try {
    e = nt();
  } catch {
    e = Ge;
  }
  const t = de(), { stringify: o, stripBom: n } = Pi();
  async function u(E, g = {}) {
    typeof g == "string" && (g = { encoding: g });
    const p = g.fs || e, w = "throws" in g ? g.throws : !0;
    let b = await t.fromCallback(p.readFile)(E, g);
    b = n(b);
    let l;
    try {
      l = JSON.parse(b, g ? g.reviver : null);
    } catch (h) {
      if (w)
        throw h.message = `${E}: ${h.message}`, h;
      return null;
    }
    return l;
  }
  const a = t.fromPromise(u);
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
  async function f(E, g, p = {}) {
    const w = p.fs || e, b = o(g, p);
    await t.fromCallback(w.writeFile)(E, b, p);
  }
  const i = t.fromPromise(f);
  function s(E, g, p = {}) {
    const w = p.fs || e, b = o(g, p);
    return w.writeFileSync(E, b, p);
  }
  return Kr = {
    readFile: a,
    readFileSync: r,
    writeFile: i,
    writeFileSync: s
  }, Kr;
}
var Xr, ms;
function yu() {
  if (ms) return Xr;
  ms = 1;
  const e = pu();
  return Xr = {
    // jsonfile exports
    readJson: e.readFile,
    readJsonSync: e.readFileSync,
    writeJson: e.writeFile,
    writeJsonSync: e.writeFileSync
  }, Xr;
}
var Zr, ps;
function Ti() {
  if (ps) return Zr;
  ps = 1;
  const e = de().fromPromise, t = /* @__PURE__ */ ge(), o = ce, n = /* @__PURE__ */ Ne(), u = Ue().pathExists;
  async function a(f, i, s = "utf-8") {
    const d = o.dirname(f);
    return await u(d) || await n.mkdirs(d), t.writeFile(f, i, s);
  }
  function r(f, ...i) {
    const s = o.dirname(f);
    t.existsSync(s) || n.mkdirsSync(s), t.writeFileSync(f, ...i);
  }
  return Zr = {
    outputFile: e(a),
    outputFileSync: r
  }, Zr;
}
var Jr, ys;
function vu() {
  if (ys) return Jr;
  ys = 1;
  const { stringify: e } = Pi(), { outputFile: t } = /* @__PURE__ */ Ti();
  async function o(n, u, a = {}) {
    const r = e(u, a);
    await t(n, r, a);
  }
  return Jr = o, Jr;
}
var Yr, vs;
function Eu() {
  if (vs) return Yr;
  vs = 1;
  const { stringify: e } = Pi(), { outputFileSync: t } = /* @__PURE__ */ Ti();
  function o(n, u, a) {
    const r = e(u, a);
    t(n, r, a);
  }
  return Yr = o, Yr;
}
var Qr, Es;
function gu() {
  if (Es) return Qr;
  Es = 1;
  const e = de().fromPromise, t = /* @__PURE__ */ yu();
  return t.outputJson = e(/* @__PURE__ */ vu()), t.outputJsonSync = /* @__PURE__ */ Eu(), t.outputJSON = t.outputJson, t.outputJSONSync = t.outputJsonSync, t.writeJSON = t.writeJson, t.writeJSONSync = t.writeJsonSync, t.readJSON = t.readJson, t.readJSONSync = t.readJsonSync, Qr = t, Qr;
}
var en, gs;
function _u() {
  if (gs) return en;
  gs = 1;
  const e = /* @__PURE__ */ ge(), t = ce, { copy: o } = /* @__PURE__ */ Ni(), { remove: n } = /* @__PURE__ */ yr(), { mkdirp: u } = /* @__PURE__ */ Ne(), { pathExists: a } = /* @__PURE__ */ Ue(), r = /* @__PURE__ */ Be();
  async function f(d, E, g = {}) {
    const p = g.overwrite || g.clobber || !1, { srcStat: w, isChangingCase: b = !1 } = await r.checkPaths(d, E, "move", g);
    await r.checkParentPaths(d, w, E, "move");
    const l = t.dirname(E);
    return t.parse(l).root !== l && await u(l), i(d, E, p, b);
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
  return en = f, en;
}
var tn, _s;
function Su() {
  if (_s) return tn;
  _s = 1;
  const e = nt(), t = ce, o = Ni().copySync, n = yr().removeSync, u = Ne().mkdirpSync, a = /* @__PURE__ */ Be();
  function r(E, g, p) {
    p = p || {};
    const w = p.overwrite || p.clobber || !1, { srcStat: b, isChangingCase: l = !1 } = a.checkPathsSync(E, g, "move", p);
    return a.checkParentPathsSync(E, b, g, "move"), f(g) || u(t.dirname(g)), i(E, g, w, l);
  }
  function f(E) {
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
  return tn = r, tn;
}
var rn, Ss;
function wu() {
  if (Ss) return rn;
  Ss = 1;
  const e = de().fromPromise;
  return rn = {
    move: e(/* @__PURE__ */ _u()),
    moveSync: /* @__PURE__ */ Su()
  }, rn;
}
var nn, ws;
function $u() {
  return ws || (ws = 1, nn = {
    // Export promiseified graceful-fs:
    .../* @__PURE__ */ ge(),
    // Export extra methods:
    .../* @__PURE__ */ Ni(),
    .../* @__PURE__ */ cu(),
    .../* @__PURE__ */ mu(),
    .../* @__PURE__ */ gu(),
    .../* @__PURE__ */ Ne(),
    .../* @__PURE__ */ wu(),
    .../* @__PURE__ */ Ti(),
    .../* @__PURE__ */ Ue(),
    .../* @__PURE__ */ yr()
  }), nn;
}
var we = /* @__PURE__ */ $u();
class bu {
  constructor() {
    this.listeners = [], this.handlers = [];
  }
  /**
   * Listen to `channel`.
   */
  on(t, o) {
    this.listeners.push(t), at.on(t, o);
  }
  /**
   * Handle a renderer invoke request.
   */
  handle(t, o) {
    this.handlers.push(t), at.handle(t, o);
  }
  /**
   * Dispose all listeners and handlers.
   */
  dispose() {
    this.listeners.forEach((t) => at.removeAllListeners(t)), this.listeners = [], this.handlers.forEach((t) => at.removeHandler(t)), this.handlers = [];
  }
}
class Ru {
  /**
   * Send an asynchronous message to the renderer process.
   */
  send(t, o, ...n) {
    t.send(o, ...n);
  }
}
var tt = { exports: {} }, sn, $s;
function Ou() {
  return $s || ($s = 1, sn = (e) => {
    const t = typeof e;
    return e !== null && (t === "object" || t === "function");
  }), sn;
}
var on, bs;
function Iu() {
  if (bs) return on;
  bs = 1;
  const e = Ou(), t = /* @__PURE__ */ new Set([
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
  return on = {
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
  }, on;
}
var dt = { exports: {} }, ht = { exports: {} }, mt = { exports: {} }, pt = { exports: {} }, Rs;
function Nu() {
  if (Rs) return pt.exports;
  Rs = 1;
  const e = Ge;
  return pt.exports = (t) => new Promise((o) => {
    e.access(t, (n) => {
      o(!n);
    });
  }), pt.exports.sync = (t) => {
    try {
      return e.accessSync(t), !0;
    } catch {
      return !1;
    }
  }, pt.exports;
}
var yt = { exports: {} }, vt = { exports: {} }, Os;
function Pu() {
  if (Os) return vt.exports;
  Os = 1;
  const e = (t, ...o) => new Promise((n) => {
    n(t(...o));
  });
  return vt.exports = e, vt.exports.default = e, vt.exports;
}
var Is;
function Tu() {
  if (Is) return yt.exports;
  Is = 1;
  const e = Pu(), t = (o) => {
    if (!((Number.isInteger(o) || o === 1 / 0) && o > 0))
      return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
    const n = [];
    let u = 0;
    const a = () => {
      u--, n.length > 0 && n.shift()();
    }, r = (s, d, ...E) => {
      u++;
      const g = e(s, ...E);
      d(g), g.then(a, a);
    }, f = (s, d, ...E) => {
      u < o ? r(s, d, ...E) : n.push(r.bind(null, s, d, ...E));
    }, i = (s, ...d) => new Promise((E) => f(s, E, ...d));
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
  return yt.exports = t, yt.exports.default = t, yt.exports;
}
var an, Ns;
function Cu() {
  if (Ns) return an;
  Ns = 1;
  const e = Tu();
  class t extends Error {
    constructor(a) {
      super(), this.value = a;
    }
  }
  const o = (u, a) => Promise.resolve(u).then(a), n = (u) => Promise.all(u).then((a) => a[1] === !0 && Promise.reject(new t(a[0])));
  return an = (u, a, r) => {
    r = Object.assign({
      concurrency: 1 / 0,
      preserveOrder: !0
    }, r);
    const f = e(r.concurrency), i = [...u].map((d) => [d, f(o, d, a)]), s = e(r.preserveOrder ? 1 : 1 / 0);
    return Promise.all(i.map((d) => s(n, d))).then(() => {
    }).catch((d) => d instanceof t ? d.value : Promise.reject(d));
  }, an;
}
var Ps;
function Du() {
  if (Ps) return mt.exports;
  Ps = 1;
  const e = ce, t = Nu(), o = Cu();
  return mt.exports = (n, u) => (u = Object.assign({
    cwd: process.cwd()
  }, u), o(n, (a) => t(e.resolve(u.cwd, a)), u)), mt.exports.sync = (n, u) => {
    u = Object.assign({
      cwd: process.cwd()
    }, u);
    for (const a of n)
      if (t.sync(e.resolve(u.cwd, a)))
        return a;
  }, mt.exports;
}
var Ts;
function Lu() {
  if (Ts) return ht.exports;
  Ts = 1;
  const e = ce, t = Du();
  return ht.exports = (o, n = {}) => {
    const u = e.resolve(n.cwd || ""), { root: a } = e.parse(u), r = [].concat(o);
    return new Promise((f) => {
      (function i(s) {
        t(r, { cwd: s }).then((d) => {
          d ? f(e.join(s, d)) : s === a ? f(null) : i(e.dirname(s));
        });
      })(u);
    });
  }, ht.exports.sync = (o, n = {}) => {
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
  }, ht.exports;
}
var Cs;
function Au() {
  if (Cs) return dt.exports;
  Cs = 1;
  const e = Lu();
  return dt.exports = async ({ cwd: t } = {}) => e("package.json", { cwd: t }), dt.exports.sync = ({ cwd: t } = {}) => e.sync("package.json", { cwd: t }), dt.exports;
}
var Et = { exports: {} }, Ds;
function Fu() {
  if (Ds) return Et.exports;
  Ds = 1;
  const e = ce, t = Yc, o = t.homedir(), n = t.tmpdir(), { env: u } = process, a = (s) => {
    const d = e.join(o, "Library");
    return {
      data: e.join(d, "Application Support", s),
      config: e.join(d, "Preferences", s),
      cache: e.join(d, "Caches", s),
      log: e.join(d, "Logs", s),
      temp: e.join(n, s)
    };
  }, r = (s) => {
    const d = u.APPDATA || e.join(o, "AppData", "Roaming"), E = u.LOCALAPPDATA || e.join(o, "AppData", "Local");
    return {
      // Data/config/cache/log are invented by me as Windows isn't opinionated about this
      data: e.join(E, s, "Data"),
      config: e.join(d, s, "Config"),
      cache: e.join(E, s, "Cache"),
      log: e.join(E, s, "Log"),
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
  return Et.exports = i, Et.exports.default = i, Et.exports;
}
var $e = {}, oe = {}, Ls;
function it() {
  if (Ls) return oe;
  Ls = 1, Object.defineProperty(oe, "__esModule", { value: !0 }), oe.NOOP = oe.LIMIT_FILES_DESCRIPTORS = oe.LIMIT_BASENAME_LENGTH = oe.IS_USER_ROOT = oe.IS_POSIX = oe.DEFAULT_TIMEOUT_SYNC = oe.DEFAULT_TIMEOUT_ASYNC = oe.DEFAULT_WRITE_OPTIONS = oe.DEFAULT_READ_OPTIONS = oe.DEFAULT_FOLDER_MODE = oe.DEFAULT_FILE_MODE = oe.DEFAULT_ENCODING = void 0;
  const e = "utf8";
  oe.DEFAULT_ENCODING = e;
  const t = 438;
  oe.DEFAULT_FILE_MODE = t;
  const o = 511;
  oe.DEFAULT_FOLDER_MODE = o;
  const n = {};
  oe.DEFAULT_READ_OPTIONS = n;
  const u = {};
  oe.DEFAULT_WRITE_OPTIONS = u;
  const a = 5e3;
  oe.DEFAULT_TIMEOUT_ASYNC = a;
  const r = 100;
  oe.DEFAULT_TIMEOUT_SYNC = r;
  const f = !!process.getuid;
  oe.IS_POSIX = f;
  const i = process.getuid ? !process.getuid() : !1;
  oe.IS_USER_ROOT = i;
  const s = 128;
  oe.LIMIT_BASENAME_LENGTH = s;
  const d = 1e4;
  oe.LIMIT_FILES_DESCRIPTORS = d;
  const E = () => {
  };
  return oe.NOOP = E, oe;
}
var gt = {}, Fe = {}, As;
function qu() {
  if (As) return Fe;
  As = 1, Object.defineProperty(Fe, "__esModule", { value: !0 }), Fe.attemptifySync = Fe.attemptifyAsync = void 0;
  const e = it(), t = (n, u = e.NOOP) => function() {
    return n.apply(void 0, arguments).catch(u);
  };
  Fe.attemptifyAsync = t;
  const o = (n, u = e.NOOP) => function() {
    try {
      return n.apply(void 0, arguments);
    } catch (a) {
      return u(a);
    }
  };
  return Fe.attemptifySync = o, Fe;
}
var _t = {}, Fs;
function ku() {
  if (Fs) return _t;
  Fs = 1, Object.defineProperty(_t, "__esModule", { value: !0 });
  const e = it(), t = {
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
  return _t.default = t, _t;
}
var qe = {}, St = {}, qs;
function ju() {
  if (qs) return St;
  qs = 1, Object.defineProperty(St, "__esModule", { value: !0 });
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
  return St.default = t, St;
}
var ks;
function Mu() {
  if (ks) return qe;
  ks = 1, Object.defineProperty(qe, "__esModule", { value: !0 }), qe.retryifySync = qe.retryifyAsync = void 0;
  const e = ju(), t = (n, u) => function(a) {
    return function r() {
      return e.default.schedule().then((f) => n.apply(void 0, arguments).then((i) => (f(), i), (i) => {
        if (f(), Date.now() >= a)
          throw i;
        if (u(i)) {
          const s = Math.round(100 + 400 * Math.random());
          return new Promise((E) => setTimeout(E, s)).then(() => r.apply(void 0, arguments));
        }
        throw i;
      }));
    };
  };
  qe.retryifyAsync = t;
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
  return qe.retryifySync = o, qe;
}
var js;
function Nc() {
  if (js) return gt;
  js = 1, Object.defineProperty(gt, "__esModule", { value: !0 });
  const e = Ge, t = Ii, o = qu(), n = ku(), u = Mu(), a = {
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
  return gt.default = a, gt;
}
var wt = {}, Ms;
function xu() {
  if (Ms) return wt;
  Ms = 1, Object.defineProperty(wt, "__esModule", { value: !0 });
  const e = {
    isFunction: (t) => typeof t == "function",
    isString: (t) => typeof t == "string",
    isUndefined: (t) => typeof t > "u"
  };
  return wt.default = e, wt;
}
var $t = {}, xs;
function Uu() {
  if (xs) return $t;
  xs = 1, Object.defineProperty($t, "__esModule", { value: !0 });
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
  return $t.default = t, $t;
}
var bt = {}, Us;
function zu() {
  if (Us) return bt;
  Us = 1, Object.defineProperty(bt, "__esModule", { value: !0 });
  const e = ce, t = it(), o = Nc(), n = {
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
  return process.on("exit", n.purgeSyncAll), bt.default = n, bt;
}
var zs;
function Vu() {
  if (zs) return $e;
  zs = 1, Object.defineProperty($e, "__esModule", { value: !0 }), $e.writeFileSync = $e.writeFile = $e.readFileSync = $e.readFile = void 0;
  const e = ce, t = it(), o = Nc(), n = xu(), u = Uu(), a = zu();
  function r(E, g = t.DEFAULT_READ_OPTIONS) {
    var p;
    if (n.default.isString(g))
      return r(E, { encoding: g });
    const w = Date.now() + ((p = g.timeout) !== null && p !== void 0 ? p : t.DEFAULT_TIMEOUT_ASYNC);
    return o.default.readFileRetry(w)(E, g);
  }
  $e.readFile = r;
  function f(E, g = t.DEFAULT_READ_OPTIONS) {
    var p;
    if (n.default.isString(g))
      return f(E, { encoding: g });
    const w = Date.now() + ((p = g.timeout) !== null && p !== void 0 ? p : t.DEFAULT_TIMEOUT_SYNC);
    return o.default.readFileSyncRetry(w)(E, g);
  }
  $e.readFileSync = f;
  const i = (E, g, p, w) => {
    if (n.default.isFunction(p))
      return i(E, g, t.DEFAULT_WRITE_OPTIONS, p);
    const b = s(E, g, p);
    return w && b.then(w, w), b;
  };
  $e.writeFile = i;
  const s = async (E, g, p = t.DEFAULT_WRITE_OPTIONS) => {
    var w;
    if (n.default.isString(p))
      return s(E, g, { encoding: p });
    const b = Date.now() + ((w = p.timeout) !== null && w !== void 0 ? w : t.DEFAULT_TIMEOUT_ASYNC);
    let l = null, h = null, c = null, m = null, y = null;
    try {
      p.schedule && (l = await p.schedule(E)), h = await u.default.schedule(E), E = await o.default.realpathAttempt(E) || E, [m, c] = a.default.get(E, p.tmpCreate || a.default.create, p.tmpPurge !== !1);
      const v = t.IS_POSIX && n.default.isUndefined(p.chown), _ = n.default.isUndefined(p.mode);
      if (v || _) {
        const $ = await o.default.statAttempt(E);
        $ && (p = { ...p }, v && (p.chown = { uid: $.uid, gid: $.gid }), _ && (p.mode = $.mode));
      }
      const S = e.dirname(E);
      await o.default.mkdirAttempt(S, {
        mode: t.DEFAULT_FOLDER_MODE,
        recursive: !0
      }), y = await o.default.openRetry(b)(m, "w", p.mode || t.DEFAULT_FILE_MODE), p.tmpCreated && p.tmpCreated(m), n.default.isString(g) ? await o.default.writeRetry(b)(y, g, 0, p.encoding || t.DEFAULT_ENCODING) : n.default.isUndefined(g) || await o.default.writeRetry(b)(y, g, 0, g.length, 0), p.fsync !== !1 && (p.fsyncWait !== !1 ? await o.default.fsyncRetry(b)(y) : o.default.fsyncAttempt(y)), await o.default.closeRetry(b)(y), y = null, p.chown && await o.default.chownAttempt(m, p.chown.uid, p.chown.gid), p.mode && await o.default.chmodAttempt(m, p.mode);
      try {
        await o.default.renameRetry(b)(m, E);
      } catch ($) {
        if ($.code !== "ENAMETOOLONG")
          throw $;
        await o.default.renameRetry(b)(m, a.default.truncate(E));
      }
      c(), m = null;
    } finally {
      y && await o.default.closeAttempt(y), m && a.default.purge(m), l && l(), h && h();
    }
  }, d = (E, g, p = t.DEFAULT_WRITE_OPTIONS) => {
    var w;
    if (n.default.isString(p))
      return d(E, g, { encoding: p });
    const b = Date.now() + ((w = p.timeout) !== null && w !== void 0 ? w : t.DEFAULT_TIMEOUT_SYNC);
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
      }), c = o.default.openSyncRetry(b)(h, "w", p.mode || t.DEFAULT_FILE_MODE), p.tmpCreated && p.tmpCreated(h), n.default.isString(g) ? o.default.writeSyncRetry(b)(c, g, 0, p.encoding || t.DEFAULT_ENCODING) : n.default.isUndefined(g) || o.default.writeSyncRetry(b)(c, g, 0, g.length, 0), p.fsync !== !1 && (p.fsyncWait !== !1 ? o.default.fsyncSyncRetry(b)(c) : o.default.fsyncAttempt(c)), o.default.closeSyncRetry(b)(c), c = null, p.chown && o.default.chownSyncAttempt(h, p.chown.uid, p.chown.gid), p.mode && o.default.chmodSyncAttempt(h, p.mode);
      try {
        o.default.renameSyncRetry(b)(h, E);
      } catch (_) {
        if (_.code !== "ENAMETOOLONG")
          throw _;
        o.default.renameSyncRetry(b)(h, a.default.truncate(E));
      }
      l(), h = null;
    } finally {
      c && o.default.closeSyncAttempt(c), h && a.default.purge(h);
    }
  };
  return $e.writeFileSync = d, $e;
}
var Rt = { exports: {} }, cn = {}, Te = {}, ke = {}, un = {}, fn = {}, ln = {}, Vs;
function mr() {
  return Vs || (Vs = 1, function(e) {
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
    function u(h, ...c) {
      const m = [h[0]];
      let y = 0;
      for (; y < c.length; )
        f(m, c[y]), m.push(h[++y]);
      return new n(m);
    }
    e._ = u;
    const a = new n("+");
    function r(h, ...c) {
      const m = [p(h[0])];
      let y = 0;
      for (; y < c.length; )
        m.push(a), f(m, c[y]), m.push(a, p(h[++y]));
      return i(m), new n(m);
    }
    e.str = r;
    function f(h, c) {
      c instanceof n ? h.push(...c._items) : c instanceof o ? h.push(c) : h.push(E(c));
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
      return typeof h == "string" && e.IDENTIFIER.test(h) ? new n(`.${h}`) : u`[${h}]`;
    }
    e.getProperty = w;
    function b(h) {
      if (typeof h == "string" && e.IDENTIFIER.test(h))
        return new n(`${h}`);
      throw new Error(`CodeGen: invalid export name: ${h}, use explicit $id name mapping`);
    }
    e.getEsmExportName = b;
    function l(h) {
      return new n(h.toString());
    }
    e.regexpCode = l;
  }(ln)), ln;
}
var dn = {}, Gs;
function Bs() {
  return Gs || (Gs = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
    const t = mr();
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
        var d, E;
        if (!((E = (d = this._parent) === null || d === void 0 ? void 0 : d._prefixes) === null || E === void 0) && E.has(s) || this._prefixes && !this._prefixes.has(s))
          throw new Error(`CodeGen: prefix "${s}" is not allowed in this scope`);
        return this._names[s] = { prefix: s, index: 0 };
      }
    }
    e.Scope = u;
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
        var E;
        if (d.ref === void 0)
          throw new Error("CodeGen: ref must be passed in value");
        const g = this.toName(s), { prefix: p } = g, w = (E = d.key) !== null && E !== void 0 ? E : d.ref;
        let b = this._values[p];
        if (b) {
          const c = b.get(w);
          if (c)
            return c;
        } else
          b = this._values[p] = /* @__PURE__ */ new Map();
        b.set(w, g);
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
          const b = s[w];
          if (!b)
            continue;
          const l = E[w] = E[w] || /* @__PURE__ */ new Map();
          b.forEach((h) => {
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
    e.ValueScope = f;
  }(dn)), dn;
}
var Hs;
function te() {
  return Hs || (Hs = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
    const t = mr(), o = Bs();
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
    var u = Bs();
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
      optimizeNames(R, N) {
        return this;
      }
    }
    class r extends a {
      constructor(R, N, I) {
        super(), this.varKind = R, this.name = N, this.rhs = I;
      }
      render({ es5: R, _n: N }) {
        const I = R ? o.varKinds.var : this.varKind, K = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
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
    class f extends a {
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
    class i extends f {
      constructor(R, N, I, K) {
        super(R, I, K), this.op = N;
      }
      render({ _n: R }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + R;
      }
    }
    class s extends a {
      constructor(R) {
        super(), this.label = R, this.names = {};
      }
      render({ _n: R }) {
        return `${this.label}:` + R;
      }
    }
    class d extends a {
      constructor(R) {
        super(), this.label = R, this.names = {};
      }
      render({ _n: R }) {
        return `break${this.label ? ` ${this.label}` : ""};` + R;
      }
    }
    class E extends a {
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
    class g extends a {
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
    class p extends a {
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
    class l extends w {
    }
    l.kind = "else";
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
          N = this.else = Array.isArray(I) ? new l(I) : I;
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
    class c extends w {
    }
    c.kind = "for";
    class m extends c {
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
    class y extends c {
      constructor(R, N, I, K) {
        super(), this.varKind = R, this.name = N, this.from = I, this.to = K;
      }
      render(R) {
        const N = R.es5 ? o.varKinds.var : this.varKind, { name: I, from: K, to: W } = this;
        return `for(${N} ${I}=${K}; ${I}<${W}; ${I}++)` + super.render(R);
      }
      get names() {
        const R = U(super.names, this.from);
        return U(R, this.to);
      }
    }
    class v extends c {
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
` : "" }, this._extScope = R, this._scope = new o.Scope({ parent: R }), this._nodes = [new b()];
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
        return this._def(o.varKinds.const, R, N, I);
      }
      // `let` declaration with optional assignment (`var` in es5 mode)
      let(R, N, I) {
        return this._def(o.varKinds.let, R, N, I);
      }
      // `var` declaration with optional assignment
      var(R, N, I) {
        return this._def(o.varKinds.var, R, N, I);
      }
      // assignment code
      assign(R, N, I) {
        return this._leafNode(new f(R, N, I));
      }
      // `+=` code
      add(R, N) {
        return this._leafNode(new i(R, e.operators.ADD, N));
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
        return this._elseNode(new l());
      }
      // end `if` statement (needed if gen.if was used only with condition)
      endIf() {
        return this._endBlockNode(h, l);
      }
      _for(R, N) {
        return this._blockNode(R), N && this.code(N).endFor(), this;
      }
      // a generic `for` clause (or statement if `forBody` is passed)
      for(R, N) {
        return this._for(new m(R), N);
      }
      // `for` statement for a range of values
      forRange(R, N, I, K, W = this.opts.es5 ? o.varKinds.var : o.varKinds.let) {
        const Q = this._scope.toName(R);
        return this._for(new y(W, Q, N, I), () => K(Q));
      }
      // `for-of` statement (in es5 mode replace with a normal for loop)
      forOf(R, N, I, K = o.varKinds.const) {
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
      forIn(R, N, I, K = this.opts.es5 ? o.varKinds.var : o.varKinds.const) {
        if (this.opts.ownProperties)
          return this.forOf(R, (0, t._)`Object.keys(${N})`, I);
        const W = this._scope.toName(R);
        return this._for(new v("in", K, W, N), () => I(W));
      }
      // end `for` loop
      endFor() {
        return this._endBlockNode(c);
      }
      // `label` statement
      label(R) {
        return this._leafNode(new s(R));
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
  }(fn)), fn;
}
var ee = {}, Ws;
function ne() {
  if (Ws) return ee;
  Ws = 1, Object.defineProperty(ee, "__esModule", { value: !0 }), ee.checkStrictMode = ee.getErrorPath = ee.Type = ee.useFunc = ee.setEvaluated = ee.evaluatedPropsToName = ee.mergeEvaluated = ee.eachItem = ee.unescapeJsonPointer = ee.escapeJsonPointer = ee.escapeFragment = ee.unescapeFragment = ee.schemaRefOrVal = ee.schemaHasRulesButRef = ee.schemaHasRules = ee.checkUnknownRules = ee.alwaysValidSchema = ee.toHash = void 0;
  const e = te(), t = mr();
  function o(v) {
    const _ = {};
    for (const S of v)
      _[S] = !0;
    return _;
  }
  ee.toHash = o;
  function n(v, _) {
    return typeof _ == "boolean" ? _ : Object.keys(_).length === 0 ? !0 : (u(v, _), !a(_, v.self.RULES.all));
  }
  ee.alwaysValidSchema = n;
  function u(v, _ = v.schema) {
    const { opts: S, self: $ } = v;
    if (!S.strictSchema || typeof _ == "boolean")
      return;
    const O = $.RULES.keywords;
    for (const T in _)
      O[T] || y(v, `unknown keyword: "${T}"`);
  }
  ee.checkUnknownRules = u;
  function a(v, _) {
    if (typeof v == "boolean")
      return !v;
    for (const S in v)
      if (_[S])
        return !0;
    return !1;
  }
  ee.schemaHasRules = a;
  function r(v, _) {
    if (typeof v == "boolean")
      return !v;
    for (const S in v)
      if (S !== "$ref" && _.all[S])
        return !0;
    return !1;
  }
  ee.schemaHasRulesButRef = r;
  function f({ topSchemaRef: v, schemaPath: _ }, S, $, O) {
    if (!O) {
      if (typeof S == "number" || typeof S == "boolean")
        return S;
      if (typeof S == "string")
        return (0, e._)`${S}`;
    }
    return (0, e._)`${v}${_}${(0, e.getProperty)($)}`;
  }
  ee.schemaRefOrVal = f;
  function i(v) {
    return E(decodeURIComponent(v));
  }
  ee.unescapeFragment = i;
  function s(v) {
    return encodeURIComponent(d(v));
  }
  ee.escapeFragment = s;
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
  const l = {};
  function h(v, _) {
    return v.scopeValue("func", {
      ref: _,
      code: l[_.code] || (l[_.code] = new t._Code(_.code))
    });
  }
  ee.useFunc = h;
  var c;
  (function(v) {
    v[v.Num = 0] = "Num", v[v.Str = 1] = "Str";
  })(c || (ee.Type = c = {}));
  function m(v, _, S) {
    if (v instanceof e.Name) {
      const $ = _ === c.Num;
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
var Ot = {}, Ks;
function Ae() {
  if (Ks) return Ot;
  Ks = 1, Object.defineProperty(Ot, "__esModule", { value: !0 });
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
  return Ot.default = t, Ot;
}
var Xs;
function vr() {
  return Xs || (Xs = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
    const t = te(), o = ne(), n = Ae();
    e.keywordError = {
      message: ({ keyword: l }) => (0, t.str)`must pass "${l}" keyword validation`
    }, e.keyword$DataError = {
      message: ({ keyword: l, schemaType: h }) => h ? (0, t.str)`"${l}" keyword must be ${h} ($data)` : (0, t.str)`"${l}" keyword is invalid ($data)`
    };
    function u(l, h = e.keywordError, c, m) {
      const { it: y } = l, { gen: v, compositeRule: _, allErrors: S } = y, $ = E(l, h, c);
      m ?? (_ || S) ? i(v, $) : s(y, (0, t._)`[${$}]`);
    }
    e.reportError = u;
    function a(l, h = e.keywordError, c) {
      const { it: m } = l, { gen: y, compositeRule: v, allErrors: _ } = m, S = E(l, h, c);
      i(y, S), v || _ || s(m, n.default.vErrors);
    }
    e.reportExtraError = a;
    function r(l, h) {
      l.assign(n.default.errors, h), l.if((0, t._)`${n.default.vErrors} !== null`, () => l.if(h, () => l.assign((0, t._)`${n.default.vErrors}.length`, h), () => l.assign(n.default.vErrors, null)));
    }
    e.resetErrorsCount = r;
    function f({ gen: l, keyword: h, schemaValue: c, data: m, errsCount: y, it: v }) {
      if (y === void 0)
        throw new Error("ajv implementation error");
      const _ = l.name("err");
      l.forRange("i", y, n.default.errors, (S) => {
        l.const(_, (0, t._)`${n.default.vErrors}[${S}]`), l.if((0, t._)`${_}.instancePath === undefined`, () => l.assign((0, t._)`${_}.instancePath`, (0, t.strConcat)(n.default.instancePath, v.errorPath))), l.assign((0, t._)`${_}.schemaPath`, (0, t.str)`${v.errSchemaPath}/${h}`), v.opts.verbose && (l.assign((0, t._)`${_}.schema`, c), l.assign((0, t._)`${_}.data`, m));
      });
    }
    e.extendErrors = f;
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
      return b(l, h, v), m.object(...v);
    }
    function p({ errorPath: l }, { instancePath: h }) {
      const c = h ? (0, t.str)`${l}${(0, o.getErrorPath)(h, o.Type.Str)}` : l;
      return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, c)];
    }
    function w({ keyword: l, it: { errSchemaPath: h } }, { schemaPath: c, parentSchema: m }) {
      let y = m ? h : (0, t.str)`${h}/${l}`;
      return c && (y = (0, t.str)`${y}${(0, o.getErrorPath)(c, o.Type.Str)}`), [d.schemaPath, y];
    }
    function b(l, { params: h, message: c }, m) {
      const { keyword: y, data: v, schemaValue: _, it: S } = l, { opts: $, propertyName: O, topSchemaRef: T, schemaPath: k } = S;
      m.push([d.keyword, y], [d.params, typeof h == "function" ? h(l) : h || (0, t._)`{}`]), $.messages && m.push([d.message, typeof c == "function" ? c(l) : c]), $.verbose && m.push([d.schema, _], [d.parentSchema, (0, t._)`${T}${k}`], [n.default.data, v]), O && m.push([d.propertyName, O]);
    }
  }(un)), un;
}
var Zs;
function Gu() {
  if (Zs) return ke;
  Zs = 1, Object.defineProperty(ke, "__esModule", { value: !0 }), ke.boolOrEmptySchema = ke.topBoolOrEmptySchema = void 0;
  const e = vr(), t = te(), o = Ae(), n = {
    message: "boolean schema is false"
  };
  function u(f) {
    const { gen: i, schema: s, validateName: d } = f;
    s === !1 ? r(f, !1) : typeof s == "object" && s.$async === !0 ? i.return(o.default.data) : (i.assign((0, t._)`${d}.errors`, null), i.return(!0));
  }
  ke.topBoolOrEmptySchema = u;
  function a(f, i) {
    const { gen: s, schema: d } = f;
    d === !1 ? (s.var(i, !1), r(f)) : s.var(i, !0);
  }
  ke.boolOrEmptySchema = a;
  function r(f, i) {
    const { gen: s, data: d } = f, E = {
      gen: s,
      keyword: "false schema",
      data: d,
      schema: !1,
      schemaCode: !1,
      schemaValue: !1,
      params: {},
      it: f
    };
    (0, e.reportError)(E, n, void 0, i);
  }
  return ke;
}
var le = {}, je = {}, Js;
function Pc() {
  if (Js) return je;
  Js = 1, Object.defineProperty(je, "__esModule", { value: !0 }), je.getRules = je.isJSONType = void 0;
  const e = ["string", "number", "integer", "boolean", "null", "object", "array"], t = new Set(e);
  function o(u) {
    return typeof u == "string" && t.has(u);
  }
  je.isJSONType = o;
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
  return je.getRules = n, je;
}
var Ce = {}, Ys;
function Tc() {
  if (Ys) return Ce;
  Ys = 1, Object.defineProperty(Ce, "__esModule", { value: !0 }), Ce.shouldUseRule = Ce.shouldUseGroup = Ce.schemaHasRulesForType = void 0;
  function e({ schema: n, self: u }, a) {
    const r = u.RULES.types[a];
    return r && r !== !0 && t(n, r);
  }
  Ce.schemaHasRulesForType = e;
  function t(n, u) {
    return u.rules.some((a) => o(n, a));
  }
  Ce.shouldUseGroup = t;
  function o(n, u) {
    var a;
    return n[u.keyword] !== void 0 || ((a = u.definition.implements) === null || a === void 0 ? void 0 : a.some((r) => n[r] !== void 0));
  }
  return Ce.shouldUseRule = o, Ce;
}
var Qs;
function pr() {
  if (Qs) return le;
  Qs = 1, Object.defineProperty(le, "__esModule", { value: !0 }), le.reportTypeError = le.checkDataTypes = le.checkDataType = le.coerceAndCheckDataType = le.getJSONTypes = le.getSchemaTypes = le.DataType = void 0;
  const e = Pc(), t = Tc(), o = vr(), n = te(), u = ne();
  var a;
  (function(c) {
    c[c.Correct = 0] = "Correct", c[c.Wrong = 1] = "Wrong";
  })(a || (le.DataType = a = {}));
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
  le.getSchemaTypes = r;
  function f(c) {
    const m = Array.isArray(c) ? c : c ? [c] : [];
    if (m.every(e.isJSONType))
      return m;
    throw new Error("type must be JSONType or JSONType[]: " + m.join(","));
  }
  le.getJSONTypes = f;
  function i(c, m) {
    const { gen: y, data: v, opts: _ } = c, S = d(m, _.coerceTypes), $ = m.length > 0 && !(S.length === 0 && m.length === 1 && (0, t.schemaHasRulesForType)(c, m[0]));
    if ($) {
      const O = w(m, v, _.strictNumbers, a.Wrong);
      y.if(O, () => {
        S.length ? E(c, m, S) : l(c);
      });
    }
    return $;
  }
  le.coerceAndCheckDataType = i;
  const s = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
  function d(c, m) {
    return m ? c.filter((y) => s.has(y) || m === "array" && y === "array") : [];
  }
  function E(c, m, y) {
    const { gen: v, data: _, opts: S } = c, $ = v.let("dataType", (0, n._)`typeof ${_}`), O = v.let("coerced", (0, n._)`undefined`);
    S.coerceTypes === "array" && v.if((0, n._)`${$} == 'object' && Array.isArray(${_}) && ${_}.length == 1`, () => v.assign(_, (0, n._)`${_}[0]`).assign($, (0, n._)`typeof ${_}`).if(w(m, _, S.strictNumbers), () => v.assign(O, _))), v.if((0, n._)`${O} !== undefined`);
    for (const k of y)
      (s.has(k) || k === "array" && S.coerceTypes === "array") && T(k);
    v.else(), l(c), v.endIf(), v.if((0, n._)`${O} !== undefined`, () => {
      v.assign(_, O), g(c, O);
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
        S = $((0, n._)`!(${m} % 1) && !isNaN(${m})`);
        break;
      case "number":
        S = $();
        break;
      default:
        return (0, n._)`typeof ${m} ${_} ${c}`;
    }
    return v === a.Correct ? S : (0, n.not)(S);
    function $(O = n.nil) {
      return (0, n.and)((0, n._)`typeof ${m} == "number"`, O, y ? (0, n._)`isFinite(${m})` : n.nil);
    }
  }
  le.checkDataType = p;
  function w(c, m, y, v) {
    if (c.length === 1)
      return p(c[0], m, y, v);
    let _;
    const S = (0, u.toHash)(c);
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
  le.checkDataTypes = w;
  const b = {
    message: ({ schema: c }) => `must be ${c}`,
    params: ({ schema: c, schemaValue: m }) => typeof c == "string" ? (0, n._)`{type: ${c}}` : (0, n._)`{type: ${m}}`
  };
  function l(c) {
    const m = h(c);
    (0, o.reportError)(m, b);
  }
  le.reportTypeError = l;
  function h(c) {
    const { gen: m, data: y, schema: v } = c, _ = (0, u.schemaRefOrVal)(c, v, "type");
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
  return le;
}
var Xe = {}, eo;
function Bu() {
  if (eo) return Xe;
  eo = 1, Object.defineProperty(Xe, "__esModule", { value: !0 }), Xe.assignDefaults = void 0;
  const e = te(), t = ne();
  function o(u, a) {
    const { properties: r, items: f } = u.schema;
    if (a === "object" && r)
      for (const i in r)
        n(u, i, r[i].default);
    else a === "array" && Array.isArray(f) && f.forEach((i, s) => n(u, s, i.default));
  }
  Xe.assignDefaults = o;
  function n(u, a, r) {
    const { gen: f, compositeRule: i, data: s, opts: d } = u;
    if (r === void 0)
      return;
    const E = (0, e._)`${s}${(0, e.getProperty)(a)}`;
    if (i) {
      (0, t.checkStrictMode)(u, `default is ignored for: ${E}`);
      return;
    }
    let g = (0, e._)`${E} === undefined`;
    d.useDefaults === "empty" && (g = (0, e._)`${g} || ${E} === null || ${E} === ""`), f.if(g, (0, e._)`${E} = ${(0, e.stringify)(r)}`);
  }
  return Xe;
}
var be = {}, ie = {}, to;
function Re() {
  if (to) return ie;
  to = 1, Object.defineProperty(ie, "__esModule", { value: !0 }), ie.validateUnion = ie.validateArray = ie.usePattern = ie.callValidateCode = ie.schemaProperties = ie.allSchemaProperties = ie.noPropertyInData = ie.propertyInData = ie.isOwnProperty = ie.hasPropFunc = ie.reportMissingProp = ie.checkMissingProp = ie.checkReportMissingProp = void 0;
  const e = te(), t = ne(), o = Ae(), n = ne();
  function u(c, m) {
    const { gen: y, data: v, it: _ } = c;
    y.if(d(y, v, m, _.opts.ownProperties), () => {
      c.setParams({ missingProperty: (0, e._)`${m}` }, !0), c.error();
    });
  }
  ie.checkReportMissingProp = u;
  function a({ gen: c, data: m, it: { opts: y } }, v, _) {
    return (0, e.or)(...v.map((S) => (0, e.and)(d(c, m, S, y.ownProperties), (0, e._)`${_} = ${S}`)));
  }
  ie.checkMissingProp = a;
  function r(c, m) {
    c.setParams({ missingProperty: m }, !0), c.error();
  }
  ie.reportMissingProp = r;
  function f(c) {
    return c.scopeValue("func", {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      ref: Object.prototype.hasOwnProperty,
      code: (0, e._)`Object.prototype.hasOwnProperty`
    });
  }
  ie.hasPropFunc = f;
  function i(c, m, y) {
    return (0, e._)`${f(c)}.call(${m}, ${y})`;
  }
  ie.isOwnProperty = i;
  function s(c, m, y, v) {
    const _ = (0, e._)`${m}${(0, e.getProperty)(y)} !== undefined`;
    return v ? (0, e._)`${_} && ${i(c, m, y)}` : _;
  }
  ie.propertyInData = s;
  function d(c, m, y, v) {
    const _ = (0, e._)`${m}${(0, e.getProperty)(y)} === undefined`;
    return v ? (0, e.or)(_, (0, e.not)(i(c, m, y))) : _;
  }
  ie.noPropertyInData = d;
  function E(c) {
    return c ? Object.keys(c).filter((m) => m !== "__proto__") : [];
  }
  ie.allSchemaProperties = E;
  function g(c, m) {
    return E(m).filter((y) => !(0, t.alwaysValidSchema)(c, m[y]));
  }
  ie.schemaProperties = g;
  function p({ schemaCode: c, data: m, it: { gen: y, topSchemaRef: v, schemaPath: _, errorPath: S }, it: $ }, O, T, k) {
    const H = k ? (0, e._)`${c}, ${m}, ${v}${_}` : m, U = [
      [o.default.instancePath, (0, e.strConcat)(o.default.instancePath, S)],
      [o.default.parentData, $.parentData],
      [o.default.parentDataProperty, $.parentDataProperty],
      [o.default.rootData, o.default.rootData]
    ];
    $.opts.dynamicRef && U.push([o.default.dynamicAnchors, o.default.dynamicAnchors]);
    const z = (0, e._)`${H}, ${y.object(...U)}`;
    return T !== e.nil ? (0, e._)`${O}.call(${T}, ${z})` : (0, e._)`${O}(${z})`;
  }
  ie.callValidateCode = p;
  const w = (0, e._)`new RegExp`;
  function b({ gen: c, it: { opts: m } }, y) {
    const v = m.unicodeRegExp ? "u" : "", { regExp: _ } = m.code, S = _(y, v);
    return c.scopeValue("pattern", {
      key: S.toString(),
      ref: S,
      code: (0, e._)`${_.code === "new RegExp" ? w : (0, n.useFunc)(c, _)}(${y}, ${v})`
    });
  }
  ie.usePattern = b;
  function l(c) {
    const { gen: m, data: y, keyword: v, it: _ } = c, S = m.name("valid");
    if (_.allErrors) {
      const O = m.let("valid", !0);
      return $(() => m.assign(O, !1)), O;
    }
    return m.var(S, !0), $(() => m.break()), S;
    function $(O) {
      const T = m.const("len", (0, e._)`${y}.length`);
      m.forRange("i", 0, T, (k) => {
        c.subschema({
          keyword: v,
          dataProp: k,
          dataPropType: t.Type.Num
        }, S), m.if((0, e.not)(S), O);
      });
    }
  }
  ie.validateArray = l;
  function h(c) {
    const { gen: m, schema: y, keyword: v, it: _ } = c;
    if (!Array.isArray(y))
      throw new Error("ajv implementation error");
    if (y.some((T) => (0, t.alwaysValidSchema)(_, T)) && !_.opts.unevaluated)
      return;
    const $ = m.let("valid", !1), O = m.name("_valid");
    m.block(() => y.forEach((T, k) => {
      const H = c.subschema({
        keyword: v,
        schemaProp: k,
        compositeRule: !0
      }, O);
      m.assign($, (0, e._)`${$} || ${O}`), c.mergeValidEvaluated(H, O) || m.if((0, e.not)($));
    })), c.result($, () => c.reset(), () => c.error(!0));
  }
  return ie.validateUnion = h, ie;
}
var ro;
function Hu() {
  if (ro) return be;
  ro = 1, Object.defineProperty(be, "__esModule", { value: !0 }), be.validateKeywordUsage = be.validSchemaType = be.funcKeywordCode = be.macroKeywordCode = void 0;
  const e = te(), t = Ae(), o = Re(), n = vr();
  function u(g, p) {
    const { gen: w, keyword: b, schema: l, parentSchema: h, it: c } = g, m = p.macro.call(c.self, l, h, c), y = s(w, b, m);
    c.opts.validateSchema !== !1 && c.self.validateSchema(m, !0);
    const v = w.name("valid");
    g.subschema({
      schema: m,
      schemaPath: e.nil,
      errSchemaPath: `${c.errSchemaPath}/${b}`,
      topSchemaRef: y,
      compositeRule: !0
    }, v), g.pass(v, () => g.error(!0));
  }
  be.macroKeywordCode = u;
  function a(g, p) {
    var w;
    const { gen: b, keyword: l, schema: h, parentSchema: c, $data: m, it: y } = g;
    i(y, p);
    const v = !m && p.compile ? p.compile.call(y.self, h, c, y) : p.validate, _ = s(b, l, v), S = b.let("valid");
    g.block$data(S, $), g.ok((w = p.valid) !== null && w !== void 0 ? w : S);
    function $() {
      if (p.errors === !1)
        k(), p.modifying && r(g), H(() => g.error());
      else {
        const U = p.async ? O() : T();
        p.modifying && r(g), H(() => f(g, U));
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
      b.assign(S, (0, e._)`${U}${(0, o.callValidateCode)(g, _, z, V)}`, p.modifying);
    }
    function H(U) {
      var z;
      b.if((0, e.not)((z = p.valid) !== null && z !== void 0 ? z : S), U);
    }
  }
  be.funcKeywordCode = a;
  function r(g) {
    const { gen: p, data: w, it: b } = g;
    p.if(b.parentData, () => p.assign(w, (0, e._)`${b.parentData}[${b.parentDataProperty}]`));
  }
  function f(g, p) {
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
    return !p.length || p.some((b) => b === "array" ? Array.isArray(g) : b === "object" ? g && typeof g == "object" && !Array.isArray(g) : typeof g == b || w && typeof g > "u");
  }
  be.validSchemaType = d;
  function E({ schema: g, opts: p, self: w, errSchemaPath: b }, l, h) {
    if (Array.isArray(l.keyword) ? !l.keyword.includes(h) : l.keyword !== h)
      throw new Error("ajv implementation error");
    const c = l.dependencies;
    if (c?.some((m) => !Object.prototype.hasOwnProperty.call(g, m)))
      throw new Error(`parent schema must have dependencies of ${h}: ${c.join(",")}`);
    if (l.validateSchema && !l.validateSchema(g[h])) {
      const y = `keyword "${h}" value is invalid at path "${b}": ` + w.errorsText(l.validateSchema.errors);
      if (p.validateSchema === "log")
        w.logger.error(y);
      else
        throw new Error(y);
    }
  }
  return be.validateKeywordUsage = E, be;
}
var De = {}, no;
function Wu() {
  if (no) return De;
  no = 1, Object.defineProperty(De, "__esModule", { value: !0 }), De.extendSubschemaMode = De.extendSubschemaData = De.getSubschema = void 0;
  const e = te(), t = ne();
  function o(a, { keyword: r, schemaProp: f, schema: i, schemaPath: s, errSchemaPath: d, topSchemaRef: E }) {
    if (r !== void 0 && i !== void 0)
      throw new Error('both "keyword" and "schema" passed, only one allowed');
    if (r !== void 0) {
      const g = a.schema[r];
      return f === void 0 ? {
        schema: g,
        schemaPath: (0, e._)`${a.schemaPath}${(0, e.getProperty)(r)}`,
        errSchemaPath: `${a.errSchemaPath}/${r}`
      } : {
        schema: g[f],
        schemaPath: (0, e._)`${a.schemaPath}${(0, e.getProperty)(r)}${(0, e.getProperty)(f)}`,
        errSchemaPath: `${a.errSchemaPath}/${r}/${(0, t.escapeFragment)(f)}`
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
  De.getSubschema = o;
  function n(a, r, { dataProp: f, dataPropType: i, data: s, dataTypes: d, propertyName: E }) {
    if (s !== void 0 && f !== void 0)
      throw new Error('both "data" and "dataProp" passed, only one allowed');
    const { gen: g } = r;
    if (f !== void 0) {
      const { errorPath: w, dataPathArr: b, opts: l } = r, h = g.let("data", (0, e._)`${r.data}${(0, e.getProperty)(f)}`, !0);
      p(h), a.errorPath = (0, e.str)`${w}${(0, t.getErrorPath)(f, i, l.jsPropertySyntax)}`, a.parentDataProperty = (0, e._)`${f}`, a.dataPathArr = [...b, a.parentDataProperty];
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
  De.extendSubschemaData = n;
  function u(a, { jtdDiscriminator: r, jtdMetadata: f, compositeRule: i, createErrors: s, allErrors: d }) {
    i !== void 0 && (a.compositeRule = i), s !== void 0 && (a.createErrors = s), d !== void 0 && (a.allErrors = d), a.jtdDiscriminator = r, a.jtdMetadata = f;
  }
  return De.extendSubschemaMode = u, De;
}
var ye = {}, hn, io;
function Cc() {
  return io || (io = 1, hn = function e(t, o) {
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
  }), hn;
}
var mn = { exports: {} }, so;
function Ku() {
  if (so) return mn.exports;
  so = 1;
  var e = mn.exports = function(n, u, a) {
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
  function t(n, u, a, r, f, i, s, d, E, g) {
    if (r && typeof r == "object" && !Array.isArray(r)) {
      u(r, f, i, s, d, E, g);
      for (var p in r) {
        var w = r[p];
        if (Array.isArray(w)) {
          if (p in e.arrayKeywords)
            for (var b = 0; b < w.length; b++)
              t(n, u, a, w[b], f + "/" + p + "/" + b, i, f, p, r, b);
        } else if (p in e.propsKeywords) {
          if (w && typeof w == "object")
            for (var l in w)
              t(n, u, a, w[l], f + "/" + p + "/" + o(l), i, f, p, r, l);
        } else (p in e.keywords || n.allKeys && !(p in e.skipKeywords)) && t(n, u, a, w, f + "/" + p, i, f, p, r);
      }
      a(r, f, i, s, d, E, g);
    }
  }
  function o(n) {
    return n.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  return mn.exports;
}
var oo;
function Er() {
  if (oo) return ye;
  oo = 1, Object.defineProperty(ye, "__esModule", { value: !0 }), ye.getSchemaRefs = ye.resolveUrl = ye.normalizeId = ye._getFullPath = ye.getFullPath = ye.inlineRef = void 0;
  const e = ne(), t = Cc(), o = Ku(), n = /* @__PURE__ */ new Set([
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
  function u(b, l = !0) {
    return typeof b == "boolean" ? !0 : l === !0 ? !r(b) : l ? f(b) <= l : !1;
  }
  ye.inlineRef = u;
  const a = /* @__PURE__ */ new Set([
    "$ref",
    "$recursiveRef",
    "$recursiveAnchor",
    "$dynamicRef",
    "$dynamicAnchor"
  ]);
  function r(b) {
    for (const l in b) {
      if (a.has(l))
        return !0;
      const h = b[l];
      if (Array.isArray(h) && h.some(r) || typeof h == "object" && r(h))
        return !0;
    }
    return !1;
  }
  function f(b) {
    let l = 0;
    for (const h in b) {
      if (h === "$ref")
        return 1 / 0;
      if (l++, !n.has(h) && (typeof b[h] == "object" && (0, e.eachItem)(b[h], (c) => l += f(c)), l === 1 / 0))
        return 1 / 0;
    }
    return l;
  }
  function i(b, l = "", h) {
    h !== !1 && (l = E(l));
    const c = b.parse(l);
    return s(b, c);
  }
  ye.getFullPath = i;
  function s(b, l) {
    return b.serialize(l).split("#")[0] + "#";
  }
  ye._getFullPath = s;
  const d = /#\/?$/;
  function E(b) {
    return b ? b.replace(d, "") : "";
  }
  ye.normalizeId = E;
  function g(b, l, h) {
    return h = E(h), b.resolve(l, h);
  }
  ye.resolveUrl = g;
  const p = /^[a-z_][-a-z0-9._]*$/i;
  function w(b, l) {
    if (typeof b == "boolean")
      return {};
    const { schemaId: h, uriResolver: c } = this.opts, m = E(b[h] || l), y = { "": m }, v = i(c, m, !1), _ = {}, S = /* @__PURE__ */ new Set();
    return o(b, { allKeys: !0 }, (T, k, H, U) => {
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
  return ye.getSchemaRefs = w, ye;
}
var ao;
function gr() {
  if (ao) return Te;
  ao = 1, Object.defineProperty(Te, "__esModule", { value: !0 }), Te.getData = Te.KeywordCxt = Te.validateFunctionCode = void 0;
  const e = Gu(), t = pr(), o = Tc(), n = pr(), u = Bu(), a = Hu(), r = Wu(), f = te(), i = Ae(), s = Er(), d = ne(), E = vr();
  function g(P) {
    if (v(P) && (S(P), y(P))) {
      l(P);
      return;
    }
    p(P, () => (0, e.topBoolOrEmptySchema)(P));
  }
  Te.validateFunctionCode = g;
  function p({ gen: P, validateName: q, schema: M, schemaEnv: F, opts: G }, Y) {
    G.code.es5 ? P.func(q, (0, f._)`${i.default.data}, ${i.default.valCxt}`, F.$async, () => {
      P.code((0, f._)`"use strict"; ${c(M, G)}`), b(P, G), P.code(Y);
    }) : P.func(q, (0, f._)`${i.default.data}, ${w(G)}`, F.$async, () => P.code(c(M, G)).code(Y));
  }
  function w(P) {
    return (0, f._)`{${i.default.instancePath}="", ${i.default.parentData}, ${i.default.parentDataProperty}, ${i.default.rootData}=${i.default.data}${P.dynamicRef ? (0, f._)`, ${i.default.dynamicAnchors}={}` : f.nil}}={}`;
  }
  function b(P, q) {
    P.if(i.default.valCxt, () => {
      P.var(i.default.instancePath, (0, f._)`${i.default.valCxt}.${i.default.instancePath}`), P.var(i.default.parentData, (0, f._)`${i.default.valCxt}.${i.default.parentData}`), P.var(i.default.parentDataProperty, (0, f._)`${i.default.valCxt}.${i.default.parentDataProperty}`), P.var(i.default.rootData, (0, f._)`${i.default.valCxt}.${i.default.rootData}`), q.dynamicRef && P.var(i.default.dynamicAnchors, (0, f._)`${i.default.valCxt}.${i.default.dynamicAnchors}`);
    }, () => {
      P.var(i.default.instancePath, (0, f._)`""`), P.var(i.default.parentData, (0, f._)`undefined`), P.var(i.default.parentDataProperty, (0, f._)`undefined`), P.var(i.default.rootData, i.default.data), q.dynamicRef && P.var(i.default.dynamicAnchors, (0, f._)`{}`);
    });
  }
  function l(P) {
    const { schema: q, opts: M, gen: F } = P;
    p(P, () => {
      M.$comment && q.$comment && U(P), T(P), F.let(i.default.vErrors, null), F.let(i.default.errors, 0), M.unevaluated && h(P), $(P), z(P);
    });
  }
  function h(P) {
    const { gen: q, validateName: M } = P;
    P.evaluated = q.const("evaluated", (0, f._)`${M}.evaluated`), q.if((0, f._)`${P.evaluated}.dynamicProps`, () => q.assign((0, f._)`${P.evaluated}.props`, (0, f._)`undefined`)), q.if((0, f._)`${P.evaluated}.dynamicItems`, () => q.assign((0, f._)`${P.evaluated}.items`, (0, f._)`undefined`));
  }
  function c(P, q) {
    const M = typeof P == "object" && P[q.schemaId];
    return M && (q.code.source || q.code.process) ? (0, f._)`/*# sourceURL=${M} */` : f.nil;
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
    const Y = F.const("_errs", i.default.errors);
    $(P, Y), F.var(q, (0, f._)`${Y} === ${i.default.errors}`);
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
    q && (P.baseId = (0, s.resolveUrl)(P.opts.uriResolver, P.baseId, q));
  }
  function H(P) {
    if (P.schema.$async && !P.schemaEnv.$async)
      throw new Error("async schema in sync schema");
  }
  function U({ gen: P, schemaEnv: q, schema: M, errSchemaPath: F, opts: G }) {
    const Y = M.$comment;
    if (G.$comment === !0)
      P.code((0, f._)`${i.default.self}.logger.log(${Y})`);
    else if (typeof G.$comment == "function") {
      const X = (0, f.str)`${F}/$comment`, _e = P.scopeValue("root", { ref: q.root });
      P.code((0, f._)`${i.default.self}.opts.$comment(${Y}, ${X}, ${_e}.schema)`);
    }
  }
  function z(P) {
    const { gen: q, schemaEnv: M, validateName: F, ValidationError: G, opts: Y } = P;
    M.$async ? q.if((0, f._)`${i.default.errors} === 0`, () => q.return(i.default.data), () => q.throw((0, f._)`new ${G}(${i.default.vErrors})`)) : (q.assign((0, f._)`${F}.errors`, i.default.vErrors), Y.unevaluated && V(P), q.return((0, f._)`${i.default.errors} === 0`));
  }
  function V({ gen: P, evaluated: q, props: M, items: F }) {
    M instanceof f.Name && P.assign((0, f._)`${q}.props`, M), F instanceof f.Name && P.assign((0, f._)`${q}.items`, F);
  }
  function Z(P, q, M, F) {
    const { gen: G, schema: Y, data: X, allErrors: _e, opts: he, self: me } = P, { RULES: ue } = me;
    if (Y.$ref && (he.ignoreKeywordsWithRef || !(0, d.schemaHasRulesButRef)(Y, ue))) {
      G.block(() => K(P, "$ref", ue.all.$ref.definition));
      return;
    }
    he.jtd || A(P, q), G.block(() => {
      for (const pe of ue.rules)
        Pe(pe);
      Pe(ue.post);
    });
    function Pe(pe) {
      (0, o.shouldUseGroup)(Y, pe) && (pe.type ? (G.if((0, n.checkDataType)(pe.type, X, he.strictNumbers)), B(P, pe), q.length === 1 && q[0] === pe.type && M && (G.else(), (0, n.reportTypeError)(P)), G.endIf()) : B(P, pe), _e || G.if((0, f._)`${i.default.errors} === ${F || 0}`));
    }
  }
  function B(P, q) {
    const { gen: M, schema: F, opts: { useDefaults: G } } = P;
    G && (0, u.assignDefaults)(P, q.type), M.block(() => {
      for (const Y of q.rules)
        (0, o.shouldUseRule)(F, Y) && K(P, Y.keyword, Y.definition, q.type);
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
      if (typeof G == "object" && (0, o.shouldUseRule)(P.schema, G)) {
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
      if ((0, a.validateKeywordUsage)(q, M, F), this.gen = q.gen, this.allErrors = q.allErrors, this.keyword = F, this.data = q.data, this.schema = q.schema[F], this.$data = M.$data && q.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, d.schemaRefOrVal)(q, this.schema, F, this.$data), this.schemaType = M.schemaType, this.parentSchema = q.schema, this.params = {}, this.it = q, this.def = M, this.$data)
        this.schemaCode = q.gen.const("vSchema", J(this.$data, q));
      else if (this.schemaCode = this.schemaValue, !(0, a.validSchemaType)(this.schema, M.schemaType, M.allowUndefined))
        throw new Error(`${F} value must be ${JSON.stringify(M.schemaType)}`);
      ("code" in M ? M.trackErrors : M.errors !== !1) && (this.errsCount = q.gen.const("_errs", i.default.errors));
    }
    result(q, M, F) {
      this.failResult((0, f.not)(q), M, F);
    }
    failResult(q, M, F) {
      this.gen.if(q), F ? F() : this.error(), M ? (this.gen.else(), M(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    pass(q, M) {
      this.failResult((0, f.not)(q), void 0, M);
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
      this.fail((0, f._)`${M} !== undefined && (${(0, f.or)(this.invalid$data(), q)})`);
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
    block$data(q, M, F = f.nil) {
      this.gen.block(() => {
        this.check$data(q, F), M();
      });
    }
    check$data(q = f.nil, M = f.nil) {
      if (!this.$data)
        return;
      const { gen: F, schemaCode: G, schemaType: Y, def: X } = this;
      F.if((0, f.or)((0, f._)`${G} === undefined`, M)), q !== f.nil && F.assign(q, !0), (Y.length || X.validateSchema) && (F.elseIf(this.invalid$data()), this.$dataError(), q !== f.nil && F.assign(q, !1)), F.else();
    }
    invalid$data() {
      const { gen: q, schemaCode: M, schemaType: F, def: G, it: Y } = this;
      return (0, f.or)(X(), _e());
      function X() {
        if (F.length) {
          if (!(M instanceof f.Name))
            throw new Error("ajv implementation error");
          const he = Array.isArray(F) ? F : [F];
          return (0, f._)`${(0, n.checkDataTypes)(he, M, Y.opts.strictNumbers, n.DataType.Wrong)}`;
        }
        return f.nil;
      }
      function _e() {
        if (G.validateSchema) {
          const he = q.scopeValue("validate$data", { ref: G.validateSchema });
          return (0, f._)`!${he}(${M})`;
        }
        return f.nil;
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
        return G.if(M, () => this.mergeEvaluated(q, f.Name)), !0;
    }
  }
  Te.KeywordCxt = I;
  function K(P, q, M, F) {
    const G = new I(P, M, q);
    "code" in M ? M.code(G, F) : G.$data && M.validate ? (0, a.funcKeywordCode)(G, M) : "macro" in M ? (0, a.macroKeywordCode)(G, M) : (M.compile || M.validate) && (0, a.funcKeywordCode)(G, M);
  }
  const W = /^\/(?:[^~]|~0|~1)*$/, Q = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
  function J(P, { dataLevel: q, dataNames: M, dataPathArr: F }) {
    let G, Y;
    if (P === "")
      return i.default.rootData;
    if (P[0] === "/") {
      if (!W.test(P))
        throw new Error(`Invalid JSON-pointer: ${P}`);
      G = P, Y = i.default.rootData;
    } else {
      const me = Q.exec(P);
      if (!me)
        throw new Error(`Invalid JSON-pointer: ${P}`);
      const ue = +me[1];
      if (G = me[2], G === "#") {
        if (ue >= q)
          throw new Error(he("property/index", ue));
        return F[q - ue];
      }
      if (ue > q)
        throw new Error(he("data", ue));
      if (Y = M[q - ue], !G)
        return Y;
    }
    let X = Y;
    const _e = G.split("/");
    for (const me of _e)
      me && (Y = (0, f._)`${Y}${(0, f.getProperty)((0, d.unescapeJsonPointer)(me))}`, X = (0, f._)`${X} && ${Y}`);
    return X;
    function he(me, ue) {
      return `Cannot access ${me} ${ue} levels up, current level is ${q}`;
    }
  }
  return Te.getData = J, Te;
}
var It = {}, co;
function Ci() {
  if (co) return It;
  co = 1, Object.defineProperty(It, "__esModule", { value: !0 });
  class e extends Error {
    constructor(o) {
      super("validation failed"), this.errors = o, this.ajv = this.validation = !0;
    }
  }
  return It.default = e, It;
}
var Nt = {}, uo;
function _r() {
  if (uo) return Nt;
  uo = 1, Object.defineProperty(Nt, "__esModule", { value: !0 });
  const e = Er();
  class t extends Error {
    constructor(n, u, a, r) {
      super(r || `can't resolve reference ${a} from id ${u}`), this.missingRef = (0, e.resolveUrl)(n, u, a), this.missingSchema = (0, e.normalizeId)((0, e.getFullPath)(n, this.missingRef));
    }
  }
  return Nt.default = t, Nt;
}
var Se = {}, fo;
function Di() {
  if (fo) return Se;
  fo = 1, Object.defineProperty(Se, "__esModule", { value: !0 }), Se.resolveSchema = Se.getCompilingSchema = Se.resolveRef = Se.compileSchema = Se.SchemaEnv = void 0;
  const e = te(), t = Ci(), o = Ae(), n = Er(), u = ne(), a = gr();
  class r {
    constructor(h) {
      var c;
      this.refs = {}, this.dynamicAnchors = {};
      let m;
      typeof h.schema == "object" && (m = h.schema), this.schema = h.schema, this.schemaId = h.schemaId, this.root = h.root || this, this.baseId = (c = h.baseId) !== null && c !== void 0 ? c : (0, n.normalizeId)(m?.[h.schemaId || "$id"]), this.schemaPath = h.schemaPath, this.localRefs = h.localRefs, this.meta = h.meta, this.$async = m?.$async, this.refs = {};
    }
  }
  Se.SchemaEnv = r;
  function f(l) {
    const h = d.call(this, l);
    if (h)
      return h;
    const c = (0, n.getFullPath)(this.opts.uriResolver, l.root.baseId), { es5: m, lines: y } = this.opts.code, { ownProperties: v } = this.opts, _ = new e.CodeGen(this.scope, { es5: m, lines: y, ownProperties: v });
    let S;
    l.$async && (S = _.scopeValue("Error", {
      ref: t.default,
      code: (0, e._)`require("ajv/dist/runtime/validation_error").default`
    }));
    const $ = _.scopeName("validate");
    l.validateName = $;
    const O = {
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
      validateName: $,
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
    let T;
    try {
      this._compilations.add(l), (0, a.validateFunctionCode)(O), _.optimize(this.opts.code.optimize);
      const k = _.toString();
      T = `${_.scopeRefs(o.default.scope)}return ${k}`, this.opts.code.process && (T = this.opts.code.process(T, l));
      const U = new Function(`${o.default.self}`, `${o.default.scope}`, T)(this, this.scope.get());
      if (this.scope.value($, { ref: U }), U.errors = null, U.schema = l.schema, U.schemaEnv = l, l.$async && (U.$async = !0), this.opts.code.source === !0 && (U.source = { validateName: $, validateCode: k, scopeValues: _._values }), this.opts.unevaluated) {
        const { props: z, items: V } = O;
        U.evaluated = {
          props: z instanceof e.Name ? void 0 : z,
          items: V instanceof e.Name ? void 0 : V,
          dynamicProps: z instanceof e.Name,
          dynamicItems: V instanceof e.Name
        }, U.source && (U.source.evaluated = (0, e.stringify)(U.evaluated));
      }
      return l.validate = U, l;
    } catch (k) {
      throw delete l.validate, delete l.validateName, T && this.logger.error("Error compiling schema, function code:", T), k;
    } finally {
      this._compilations.delete(l);
    }
  }
  Se.compileSchema = f;
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
  Se.resolveRef = i;
  function s(l) {
    return (0, n.inlineRef)(l.schema, this.opts.inlineRefs) ? l.schema : l.validate ? l : f.call(this, l);
  }
  function d(l) {
    for (const h of this._compilations)
      if (E(h, l))
        return h;
  }
  Se.getCompilingSchema = d;
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
      return b.call(this, c, l);
    const v = (0, n.normalizeId)(m), _ = this.refs[v] || this.schemas[v];
    if (typeof _ == "string") {
      const S = p.call(this, l, _);
      return typeof S?.schema != "object" ? void 0 : b.call(this, c, S);
    }
    if (typeof _?.schema == "object") {
      if (_.validate || f.call(this, _), v === (0, n.normalizeId)(h)) {
        const { schema: S } = _, { schemaId: $ } = this.opts, O = S[$];
        return O && (y = (0, n.resolveUrl)(this.opts.uriResolver, y, O)), new r({ schema: S, schemaId: $, root: l, baseId: y });
      }
      return b.call(this, c, _);
    }
  }
  Se.resolveSchema = p;
  const w = /* @__PURE__ */ new Set([
    "properties",
    "patternProperties",
    "enum",
    "dependencies",
    "definitions"
  ]);
  function b(l, { baseId: h, schema: c, root: m }) {
    var y;
    if (((y = l.fragment) === null || y === void 0 ? void 0 : y[0]) !== "/")
      return;
    for (const S of l.fragment.slice(1).split("/")) {
      if (typeof c == "boolean")
        return;
      const $ = c[(0, u.unescapeFragment)(S)];
      if ($ === void 0)
        return;
      c = $;
      const O = typeof c == "object" && c[this.opts.schemaId];
      !w.has(S) && O && (h = (0, n.resolveUrl)(this.opts.uriResolver, h, O));
    }
    let v;
    if (typeof c != "boolean" && c.$ref && !(0, u.schemaHasRulesButRef)(c, this.RULES)) {
      const S = (0, n.resolveUrl)(this.opts.uriResolver, h, c.$ref);
      v = p.call(this, m, S);
    }
    const { schemaId: _ } = this.opts;
    if (v = v || new r({ schema: c, schemaId: _, root: m, baseId: h }), v.schema !== v.root.schema)
      return v;
  }
  return Se;
}
const Xu = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", Zu = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Ju = "object", Yu = ["$data"], Qu = { $data: { type: "string", anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }] } }, ef = !1, tf = {
  $id: Xu,
  description: Zu,
  type: Ju,
  required: Yu,
  properties: Qu,
  additionalProperties: ef
};
var Pt = {}, Ze = { exports: {} }, pn, lo;
function rf() {
  return lo || (lo = 1, pn = {
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
  }), pn;
}
var yn, ho;
function nf() {
  if (ho) return yn;
  ho = 1;
  const { HEX: e } = rf();
  function t(w) {
    if (r(w, ".") < 3)
      return { host: w, isIPV4: !1 };
    const b = w.match(/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/u) || [], [l] = b;
    return l ? { host: a(l, "."), isIPV4: !0 } : { host: w, isIPV4: !1 };
  }
  function o(w, b = !1) {
    let l = "", h = !0;
    for (const c of w) {
      if (e[c] === void 0) return;
      c !== "0" && h === !0 && (h = !1), h || (l += c);
    }
    return b && l.length === 0 && (l = "0"), l;
  }
  function n(w) {
    let b = 0;
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
      const $ = w[S];
      if (!($ === "[" || $ === "]"))
        if ($ === ":") {
          if (y === !0 && (v = !0), !_())
            break;
          if (b++, h.push(":"), b > 7) {
            l.error = !0;
            break;
          }
          S - 1 >= 0 && w[S - 1] === ":" && (y = !0);
          continue;
        } else if ($ === "%") {
          if (!_())
            break;
          m = !0;
        } else {
          c.push($);
          continue;
        }
    }
    return c.length && (m ? l.zone = c.join("") : v ? h.push(c.join("")) : h.push(o(c))), l.address = h.join(""), l;
  }
  function u(w, b = {}) {
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
  function a(w, b) {
    let l = "", h = !0;
    const c = w.length;
    for (let m = 0; m < c; m++) {
      const y = w[m];
      y === "0" && h ? (m + 1 <= c && w[m + 1] === b || m + 1 === c) && (l += y, h = !1) : (y === b ? h = !0 : h = !1, l += y);
    }
    return l;
  }
  function r(w, b) {
    let l = 0;
    for (let h = 0; h < w.length; h++)
      w[h] === b && l++;
    return l;
  }
  const f = /^\.\.?\//u, i = /^\/\.(?:\/|$)/u, s = /^\/\.\.(?:\/|$)/u, d = /^\/?(?:.|\n)*?(?=\/|$)/u;
  function E(w) {
    const b = [];
    for (; w.length; )
      if (w.match(f))
        w = w.replace(f, "");
      else if (w.match(i))
        w = w.replace(i, "/");
      else if (w.match(s))
        w = w.replace(s, "/"), b.pop();
      else if (w === "." || w === "..")
        w = "";
      else {
        const l = w.match(d);
        if (l) {
          const h = l[0];
          w = w.slice(h.length), b.push(h);
        } else
          throw new Error("Unexpected dot segment condition");
      }
    return b.join("");
  }
  function g(w, b) {
    const l = b !== !0 ? escape : unescape;
    return w.scheme !== void 0 && (w.scheme = l(w.scheme)), w.userinfo !== void 0 && (w.userinfo = l(w.userinfo)), w.host !== void 0 && (w.host = l(w.host)), w.path !== void 0 && (w.path = l(w.path)), w.query !== void 0 && (w.query = l(w.query)), w.fragment !== void 0 && (w.fragment = l(w.fragment)), w;
  }
  function p(w, b) {
    const l = [];
    if (w.userinfo !== void 0 && (l.push(w.userinfo), l.push("@")), w.host !== void 0) {
      let h = unescape(w.host);
      const c = t(h);
      if (c.isIPV4)
        h = c.host;
      else {
        const m = u(c.host, { isIPV4: !1 });
        m.isIPV6 === !0 ? h = `[${m.escapedHost}]` : h = w.host;
      }
      l.push(h);
    }
    return (typeof w.port == "number" || typeof w.port == "string") && (l.push(":"), l.push(String(w.port))), l.length ? l.join("") : void 0;
  }
  return yn = {
    recomposeAuthority: p,
    normalizeComponentEncoding: g,
    removeDotSegments: E,
    normalizeIPv4: t,
    normalizeIPv6: u,
    stringArrayToHexStripped: o
  }, yn;
}
var vn, mo;
function sf() {
  if (mo) return vn;
  mo = 1;
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
      const [m, y] = c.resourceName.split("?");
      c.path = m && m !== "/" ? m : void 0, c.query = y, c.resourceName = void 0;
    }
    return c.fragment = void 0, c;
  }
  function f(c, m) {
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
    const $ = c, O = c.nss;
    return $.path = `${v || m.nid}:${O}`, m.skipEscape = !0, $;
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
    serialize: u
  }, g = {
    scheme: "https",
    domainHost: E.domainHost,
    parse: n,
    serialize: u
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
  return vn = h, vn;
}
var po;
function of() {
  if (po) return Ze.exports;
  po = 1;
  const { normalizeIPv6: e, normalizeIPv4: t, removeDotSegments: o, recomposeAuthority: n, normalizeComponentEncoding: u } = nf(), a = sf();
  function r(l, h) {
    return typeof l == "string" ? l = d(w(l, h), h) : typeof l == "object" && (l = w(d(l, h), h)), l;
  }
  function f(l, h, c) {
    const m = Object.assign({ scheme: "null" }, c), y = i(w(l, m), w(h, m), m, !0);
    return d(y, { ...m, skipEscape: !0 });
  }
  function i(l, h, c, m) {
    const y = {};
    return m || (l = w(d(l, c), c), h = w(d(h, c), c)), c = c || {}, !c.tolerant && h.scheme ? (y.scheme = h.scheme, y.userinfo = h.userinfo, y.host = h.host, y.port = h.port, y.path = o(h.path || ""), y.query = h.query) : (h.userinfo !== void 0 || h.host !== void 0 || h.port !== void 0 ? (y.userinfo = h.userinfo, y.host = h.host, y.port = h.port, y.path = o(h.path || ""), y.query = h.query) : (h.path ? (h.path.charAt(0) === "/" ? y.path = o(h.path) : ((l.userinfo !== void 0 || l.host !== void 0 || l.port !== void 0) && !l.path ? y.path = "/" + h.path : l.path ? y.path = l.path.slice(0, l.path.lastIndexOf("/") + 1) + h.path : y.path = h.path, y.path = o(y.path)), y.query = h.query) : (y.path = l.path, h.query !== void 0 ? y.query = h.query : y.query = l.query), y.userinfo = l.userinfo, y.host = l.host, y.port = l.port), y.scheme = l.scheme), y.fragment = h.fragment, y;
  }
  function s(l, h, c) {
    return typeof l == "string" ? (l = unescape(l), l = d(u(w(l, c), !0), { ...c, skipEscape: !0 })) : typeof l == "object" && (l = d(u(l, !0), { ...c, skipEscape: !0 })), typeof h == "string" ? (h = unescape(h), h = d(u(w(h, c), !0), { ...c, skipEscape: !0 })) : typeof h == "object" && (h = d(u(h, !0), { ...c, skipEscape: !0 })), l.toLowerCase() === h.toLowerCase();
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
        const $ = t(m.host);
        if ($.isIPV4 === !1) {
          const O = e($.host, { isIPV4: !1 });
          m.host = O.host.toLowerCase(), v = O.isIPV6;
        } else
          m.host = $.host, v = !0;
      }
      m.scheme === void 0 && m.userinfo === void 0 && m.host === void 0 && m.port === void 0 && !m.path && m.query === void 0 ? m.reference = "same-document" : m.scheme === void 0 ? m.reference = "relative" : m.fragment === void 0 ? m.reference = "absolute" : m.reference = "uri", c.reference && c.reference !== "suffix" && c.reference !== m.reference && (m.error = m.error || "URI is not a " + c.reference + " reference.");
      const S = a[(c.scheme || m.scheme || "").toLowerCase()];
      if (!c.unicodeSupport && (!S || !S.unicodeSupport) && m.host && (c.domainHost || S && S.domainHost) && v === !1 && g(m.host))
        try {
          m.host = URL.domainToASCII(m.host.toLowerCase());
        } catch ($) {
          m.error = m.error || "Host's domain name can not be converted to ASCII: " + $;
        }
      (!S || S && !S.skipNormalize) && (y && m.scheme !== void 0 && (m.scheme = unescape(m.scheme)), y && m.host !== void 0 && (m.host = unescape(m.host)), m.path !== void 0 && m.path.length && (m.path = escape(unescape(m.path))), m.fragment !== void 0 && m.fragment.length && (m.fragment = encodeURI(decodeURIComponent(m.fragment)))), S && S.parse && S.parse(m, c);
    } else
      m.error = m.error || "URI can not be parsed.";
    return m;
  }
  const b = {
    SCHEMES: a,
    normalize: r,
    resolve: f,
    resolveComponents: i,
    equal: s,
    serialize: d,
    parse: w
  };
  return Ze.exports = b, Ze.exports.default = b, Ze.exports.fastUri = b, Ze.exports;
}
var yo;
function af() {
  if (yo) return Pt;
  yo = 1, Object.defineProperty(Pt, "__esModule", { value: !0 });
  const e = of();
  return e.code = 'require("ajv/dist/runtime/uri").default', Pt.default = e, Pt;
}
var vo;
function cf() {
  return vo || (vo = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
    var t = gr();
    Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
      return t.KeywordCxt;
    } });
    var o = te();
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
    const n = Ci(), u = _r(), a = Pc(), r = Di(), f = te(), i = Er(), s = pr(), d = ne(), E = tf, g = af(), p = (D, C) => new RegExp(D, C);
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
    function m(D) {
      var C, j, L, R, N, I, K, W, Q, J, P, q, M, F, G, Y, X, _e, he, me, ue, Pe, pe, We, fe;
      const ae = D.strict, se = (C = D.code) === null || C === void 0 ? void 0 : C.optimize, re = se === !0 || se === void 0 ? 1 : se || 0, Ee = (L = (j = D.code) === null || j === void 0 ? void 0 : j.regExp) !== null && L !== void 0 ? L : p, Gc = (R = D.uriResolver) !== null && R !== void 0 ? R : g.default;
      return {
        strictSchema: (I = (N = D.strictSchema) !== null && N !== void 0 ? N : ae) !== null && I !== void 0 ? I : !0,
        strictNumbers: (W = (K = D.strictNumbers) !== null && K !== void 0 ? K : ae) !== null && W !== void 0 ? W : !0,
        strictTypes: (J = (Q = D.strictTypes) !== null && Q !== void 0 ? Q : ae) !== null && J !== void 0 ? J : "log",
        strictTuples: (q = (P = D.strictTuples) !== null && P !== void 0 ? P : ae) !== null && q !== void 0 ? q : "log",
        strictRequired: (F = (M = D.strictRequired) !== null && M !== void 0 ? M : ae) !== null && F !== void 0 ? F : !1,
        code: D.code ? { ...D.code, optimize: re, regExp: Ee } : { optimize: re, regExp: Ee },
        loopRequired: (G = D.loopRequired) !== null && G !== void 0 ? G : c,
        loopEnum: (Y = D.loopEnum) !== null && Y !== void 0 ? Y : c,
        meta: (X = D.meta) !== null && X !== void 0 ? X : !0,
        messages: (_e = D.messages) !== null && _e !== void 0 ? _e : !0,
        inlineRefs: (he = D.inlineRefs) !== null && he !== void 0 ? he : !0,
        schemaId: (me = D.schemaId) !== null && me !== void 0 ? me : "$id",
        addUsedSchema: (ue = D.addUsedSchema) !== null && ue !== void 0 ? ue : !0,
        validateSchema: (Pe = D.validateSchema) !== null && Pe !== void 0 ? Pe : !0,
        validateFormats: (pe = D.validateFormats) !== null && pe !== void 0 ? pe : !0,
        unicodeRegExp: (We = D.unicodeRegExp) !== null && We !== void 0 ? We : !0,
        int32range: (fe = D.int32range) !== null && fe !== void 0 ? fe : !0,
        uriResolver: Gc
      };
    }
    class y {
      constructor(C = {}) {
        this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), C = this.opts = { ...C, ...m(C) };
        const { es5: j, lines: L } = this.opts.code;
        this.scope = new f.ValueScope({ scope: {}, prefixes: b, es5: j, lines: L }), this.logger = H(C.logger);
        const R = C.validateFormats;
        C.validateFormats = !1, this.RULES = (0, a.getRules)(), v.call(this, l, C, "NOT SUPPORTED"), v.call(this, h, C, "DEPRECATED", "warn"), this._metaOpts = T.call(this), C.formats && $.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), C.keywords && O.call(this, C.keywords), typeof C.meta == "object" && this.addMetaSchema(C.meta), S.call(this), C.validateFormats = R;
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
            if (!(P instanceof u.default))
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
        return j = (0, i.normalizeId)(j || N), this._checkUnique(j), this.schemas[j] = this._addSchema(C, L, j, R, !0), this;
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
            return L && (L = (0, i.normalizeId)(L), delete this.schemas[L], delete this.refs[L]), this;
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
          type: (0, s.getJSONTypes)(j.type),
          schemaType: (0, s.getJSONTypes)(j.schemaType)
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
        L = (0, i.normalizeId)(I || L);
        const Q = i.getSchemaRefs.call(this, C, L);
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
    y.ValidationError = n.default, y.MissingRefError = u.default, e.default = y;
    function v(D, C, j, L = "error") {
      for (const R in D) {
        const N = R;
        N in C && this.logger[L](`${j}: option ${R}. ${D[N]}`);
      }
    }
    function _(D) {
      return D = (0, i.normalizeId)(D), this.schemas[D] || this.refs[D];
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
          type: (0, s.getJSONTypes)(C.type),
          schemaType: (0, s.getJSONTypes)(C.schemaType)
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
  }(cn)), cn;
}
var Tt = {}, Ct = {}, Dt = {}, Eo;
function uf() {
  if (Eo) return Dt;
  Eo = 1, Object.defineProperty(Dt, "__esModule", { value: !0 });
  const e = {
    keyword: "id",
    code() {
      throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
    }
  };
  return Dt.default = e, Dt;
}
var Le = {}, go;
function ff() {
  if (go) return Le;
  go = 1, Object.defineProperty(Le, "__esModule", { value: !0 }), Le.callRef = Le.getValidate = void 0;
  const e = _r(), t = Re(), o = te(), n = Ae(), u = Di(), a = ne(), r = {
    keyword: "$ref",
    schemaType: "string",
    code(s) {
      const { gen: d, schema: E, it: g } = s, { baseId: p, schemaEnv: w, validateName: b, opts: l, self: h } = g, { root: c } = w;
      if ((E === "#" || E === "#/") && p === c.baseId)
        return y();
      const m = u.resolveRef.call(h, c, p, E);
      if (m === void 0)
        throw new e.default(g.opts.uriResolver, p, E);
      if (m instanceof u.SchemaEnv)
        return v(m);
      return _(m);
      function y() {
        if (w === c)
          return i(s, b, w, w.$async);
        const S = d.scopeValue("root", { ref: c });
        return i(s, (0, o._)`${S}.validate`, c, c.$async);
      }
      function v(S) {
        const $ = f(s, S);
        i(s, $, S, S.$async);
      }
      function _(S) {
        const $ = d.scopeValue("schema", l.code.source === !0 ? { ref: S, code: (0, o.stringify)(S) } : { ref: S }), O = d.name("valid"), T = s.subschema({
          schema: S,
          dataTypes: [],
          schemaPath: o.nil,
          topSchemaRef: $,
          errSchemaPath: E
        }, O);
        s.mergeEvaluated(T), s.ok(O);
      }
    }
  };
  function f(s, d) {
    const { gen: E } = s;
    return d.validate ? E.scopeValue("validate", { ref: d.validate }) : (0, o._)`${E.scopeValue("wrapper", { ref: d })}.validate`;
  }
  Le.getValidate = f;
  function i(s, d, E, g) {
    const { gen: p, it: w } = s, { allErrors: b, schemaEnv: l, opts: h } = w, c = h.passContext ? n.default.this : o.nil;
    g ? m() : y();
    function m() {
      if (!l.$async)
        throw new Error("async schema referenced by sync schema");
      const S = p.let("valid");
      p.try(() => {
        p.code((0, o._)`await ${(0, t.callValidateCode)(s, d, c)}`), _(d), b || p.assign(S, !0);
      }, ($) => {
        p.if((0, o._)`!(${$} instanceof ${w.ValidationError})`, () => p.throw($)), v($), b || p.assign(S, !1);
      }), s.ok(S);
    }
    function y() {
      s.result((0, t.callValidateCode)(s, d, c), () => _(d), () => v(d));
    }
    function v(S) {
      const $ = (0, o._)`${S}.errors`;
      p.assign(n.default.vErrors, (0, o._)`${n.default.vErrors} === null ? ${$} : ${n.default.vErrors}.concat(${$})`), p.assign(n.default.errors, (0, o._)`${n.default.vErrors}.length`);
    }
    function _(S) {
      var $;
      if (!w.opts.unevaluated)
        return;
      const O = ($ = E?.validate) === null || $ === void 0 ? void 0 : $.evaluated;
      if (w.props !== !0)
        if (O && !O.dynamicProps)
          O.props !== void 0 && (w.props = a.mergeEvaluated.props(p, O.props, w.props));
        else {
          const T = p.var("props", (0, o._)`${S}.evaluated.props`);
          w.props = a.mergeEvaluated.props(p, T, w.props, o.Name);
        }
      if (w.items !== !0)
        if (O && !O.dynamicItems)
          O.items !== void 0 && (w.items = a.mergeEvaluated.items(p, O.items, w.items));
        else {
          const T = p.var("items", (0, o._)`${S}.evaluated.items`);
          w.items = a.mergeEvaluated.items(p, T, w.items, o.Name);
        }
    }
  }
  return Le.callRef = i, Le.default = r, Le;
}
var _o;
function lf() {
  if (_o) return Ct;
  _o = 1, Object.defineProperty(Ct, "__esModule", { value: !0 });
  const e = uf(), t = ff(), o = [
    "$schema",
    "$id",
    "$defs",
    "$vocabulary",
    { keyword: "$comment" },
    "definitions",
    e.default,
    t.default
  ];
  return Ct.default = o, Ct;
}
var Lt = {}, At = {}, So;
function df() {
  if (So) return At;
  So = 1, Object.defineProperty(At, "__esModule", { value: !0 });
  const e = te(), t = e.operators, o = {
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
  return At.default = u, At;
}
var Ft = {}, wo;
function hf() {
  if (wo) return Ft;
  wo = 1, Object.defineProperty(Ft, "__esModule", { value: !0 });
  const e = te(), o = {
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
  return Ft.default = o, Ft;
}
var qt = {}, kt = {}, $o;
function mf() {
  if ($o) return kt;
  $o = 1, Object.defineProperty(kt, "__esModule", { value: !0 });
  function e(t) {
    const o = t.length;
    let n = 0, u = 0, a;
    for (; u < o; )
      n++, a = t.charCodeAt(u++), a >= 55296 && a <= 56319 && u < o && (a = t.charCodeAt(u), (a & 64512) === 56320 && u++);
    return n;
  }
  return kt.default = e, e.code = 'require("ajv/dist/runtime/ucs2length").default', kt;
}
var bo;
function pf() {
  if (bo) return qt;
  bo = 1, Object.defineProperty(qt, "__esModule", { value: !0 });
  const e = te(), t = ne(), o = mf(), u = {
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
      const { keyword: r, data: f, schemaCode: i, it: s } = a, d = r === "maxLength" ? e.operators.GT : e.operators.LT, E = s.opts.unicode === !1 ? (0, e._)`${f}.length` : (0, e._)`${(0, t.useFunc)(a.gen, o.default)}(${f})`;
      a.fail$data((0, e._)`${E} ${d} ${i}`);
    }
  };
  return qt.default = u, qt;
}
var jt = {}, Ro;
function yf() {
  if (Ro) return jt;
  Ro = 1, Object.defineProperty(jt, "__esModule", { value: !0 });
  const e = Re(), t = te(), n = {
    keyword: "pattern",
    type: "string",
    schemaType: "string",
    $data: !0,
    error: {
      message: ({ schemaCode: u }) => (0, t.str)`must match pattern "${u}"`,
      params: ({ schemaCode: u }) => (0, t._)`{pattern: ${u}}`
    },
    code(u) {
      const { data: a, $data: r, schema: f, schemaCode: i, it: s } = u, d = s.opts.unicodeRegExp ? "u" : "", E = r ? (0, t._)`(new RegExp(${i}, ${d}))` : (0, e.usePattern)(u, f);
      u.fail$data((0, t._)`!${E}.test(${a})`);
    }
  };
  return jt.default = n, jt;
}
var Mt = {}, Oo;
function vf() {
  if (Oo) return Mt;
  Oo = 1, Object.defineProperty(Mt, "__esModule", { value: !0 });
  const e = te(), o = {
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
  return Mt.default = o, Mt;
}
var xt = {}, Io;
function Ef() {
  if (Io) return xt;
  Io = 1, Object.defineProperty(xt, "__esModule", { value: !0 });
  const e = Re(), t = te(), o = ne(), u = {
    keyword: "required",
    type: "object",
    schemaType: "array",
    $data: !0,
    error: {
      message: ({ params: { missingProperty: a } }) => (0, t.str)`must have required property '${a}'`,
      params: ({ params: { missingProperty: a } }) => (0, t._)`{missingProperty: ${a}}`
    },
    code(a) {
      const { gen: r, schema: f, schemaCode: i, data: s, $data: d, it: E } = a, { opts: g } = E;
      if (!d && f.length === 0)
        return;
      const p = f.length >= g.loopRequired;
      if (E.allErrors ? w() : b(), g.strictRequired) {
        const c = a.parentSchema.properties, { definedProperties: m } = a.it;
        for (const y of f)
          if (c?.[y] === void 0 && !m.has(y)) {
            const v = E.schemaEnv.baseId + E.errSchemaPath, _ = `required property "${y}" is not defined at "${v}" (strictRequired)`;
            (0, o.checkStrictMode)(E, _, E.opts.strictRequired);
          }
      }
      function w() {
        if (p || d)
          a.block$data(t.nil, l);
        else
          for (const c of f)
            (0, e.checkReportMissingProp)(a, c);
      }
      function b() {
        const c = r.let("missing");
        if (p || d) {
          const m = r.let("valid", !0);
          a.block$data(m, () => h(c, m)), a.ok(m);
        } else
          r.if((0, e.checkMissingProp)(a, f, c)), (0, e.reportMissingProp)(a, c), r.else();
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
  return xt.default = u, xt;
}
var Ut = {}, No;
function gf() {
  if (No) return Ut;
  No = 1, Object.defineProperty(Ut, "__esModule", { value: !0 });
  const e = te(), o = {
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
  return Ut.default = o, Ut;
}
var zt = {}, Vt = {}, Po;
function Li() {
  if (Po) return Vt;
  Po = 1, Object.defineProperty(Vt, "__esModule", { value: !0 });
  const e = Cc();
  return e.code = 'require("ajv/dist/runtime/equal").default', Vt.default = e, Vt;
}
var To;
function _f() {
  if (To) return zt;
  To = 1, Object.defineProperty(zt, "__esModule", { value: !0 });
  const e = pr(), t = te(), o = ne(), n = Li(), a = {
    keyword: "uniqueItems",
    type: "array",
    schemaType: "boolean",
    $data: !0,
    error: {
      message: ({ params: { i: r, j: f } }) => (0, t.str)`must NOT have duplicate items (items ## ${f} and ${r} are identical)`,
      params: ({ params: { i: r, j: f } }) => (0, t._)`{i: ${r}, j: ${f}}`
    },
    code(r) {
      const { gen: f, data: i, $data: s, schema: d, parentSchema: E, schemaCode: g, it: p } = r;
      if (!s && !d)
        return;
      const w = f.let("valid"), b = E.items ? (0, e.getSchemaTypes)(E.items) : [];
      r.block$data(w, l, (0, t._)`${g} === false`), r.ok(w);
      function l() {
        const y = f.let("i", (0, t._)`${i}.length`), v = f.let("j");
        r.setParams({ i: y, j: v }), f.assign(w, !0), f.if((0, t._)`${y} > 1`, () => (h() ? c : m)(y, v));
      }
      function h() {
        return b.length > 0 && !b.some((y) => y === "object" || y === "array");
      }
      function c(y, v) {
        const _ = f.name("item"), S = (0, e.checkDataTypes)(b, _, p.opts.strictNumbers, e.DataType.Wrong), $ = f.const("indices", (0, t._)`{}`);
        f.for((0, t._)`;${y}--;`, () => {
          f.let(_, (0, t._)`${i}[${y}]`), f.if(S, (0, t._)`continue`), b.length > 1 && f.if((0, t._)`typeof ${_} == "string"`, (0, t._)`${_} += "_"`), f.if((0, t._)`typeof ${$}[${_}] == "number"`, () => {
            f.assign(v, (0, t._)`${$}[${_}]`), r.error(), f.assign(w, !1).break();
          }).code((0, t._)`${$}[${_}] = ${y}`);
        });
      }
      function m(y, v) {
        const _ = (0, o.useFunc)(f, n.default), S = f.name("outer");
        f.label(S).for((0, t._)`;${y}--;`, () => f.for((0, t._)`${v} = ${y}; ${v}--;`, () => f.if((0, t._)`${_}(${i}[${y}], ${i}[${v}])`, () => {
          r.error(), f.assign(w, !1).break(S);
        })));
      }
    }
  };
  return zt.default = a, zt;
}
var Gt = {}, Co;
function Sf() {
  if (Co) return Gt;
  Co = 1, Object.defineProperty(Gt, "__esModule", { value: !0 });
  const e = te(), t = ne(), o = Li(), u = {
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
  return Gt.default = u, Gt;
}
var Bt = {}, Do;
function wf() {
  if (Do) return Bt;
  Do = 1, Object.defineProperty(Bt, "__esModule", { value: !0 });
  const e = te(), t = ne(), o = Li(), u = {
    keyword: "enum",
    schemaType: "array",
    $data: !0,
    error: {
      message: "must be equal to one of the allowed values",
      params: ({ schemaCode: a }) => (0, e._)`{allowedValues: ${a}}`
    },
    code(a) {
      const { gen: r, data: f, $data: i, schema: s, schemaCode: d, it: E } = a;
      if (!i && s.length === 0)
        throw new Error("enum must have non-empty array");
      const g = s.length >= E.opts.loopEnum;
      let p;
      const w = () => p ?? (p = (0, t.useFunc)(r, o.default));
      let b;
      if (g || i)
        b = r.let("valid"), a.block$data(b, l);
      else {
        if (!Array.isArray(s))
          throw new Error("ajv implementation error");
        const c = r.const("vSchema", d);
        b = (0, e.or)(...s.map((m, y) => h(c, y)));
      }
      a.pass(b);
      function l() {
        r.assign(b, !1), r.forOf("v", d, (c) => r.if((0, e._)`${w()}(${f}, ${c})`, () => r.assign(b, !0).break()));
      }
      function h(c, m) {
        const y = s[m];
        return typeof y == "object" && y !== null ? (0, e._)`${w()}(${f}, ${c}[${m}])` : (0, e._)`${f} === ${y}`;
      }
    }
  };
  return Bt.default = u, Bt;
}
var Lo;
function $f() {
  if (Lo) return Lt;
  Lo = 1, Object.defineProperty(Lt, "__esModule", { value: !0 });
  const e = df(), t = hf(), o = pf(), n = yf(), u = vf(), a = Ef(), r = gf(), f = _f(), i = Sf(), s = wf(), d = [
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
  return Lt.default = d, Lt;
}
var Ht = {}, ze = {}, Ao;
function Dc() {
  if (Ao) return ze;
  Ao = 1, Object.defineProperty(ze, "__esModule", { value: !0 }), ze.validateAdditionalItems = void 0;
  const e = te(), t = ne(), n = {
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
    const { gen: f, schema: i, data: s, keyword: d, it: E } = a;
    E.items = !0;
    const g = f.const("len", (0, e._)`${s}.length`);
    if (i === !1)
      a.setParams({ len: r.length }), a.pass((0, e._)`${g} <= ${r.length}`);
    else if (typeof i == "object" && !(0, t.alwaysValidSchema)(E, i)) {
      const w = f.var("valid", (0, e._)`${g} <= ${r.length}`);
      f.if((0, e.not)(w), () => p(w)), a.ok(w);
    }
    function p(w) {
      f.forRange("i", r.length, g, (b) => {
        a.subschema({ keyword: d, dataProp: b, dataPropType: t.Type.Num }, w), E.allErrors || f.if((0, e.not)(w), () => f.break());
      });
    }
  }
  return ze.validateAdditionalItems = u, ze.default = n, ze;
}
var Wt = {}, Ve = {}, Fo;
function Lc() {
  if (Fo) return Ve;
  Fo = 1, Object.defineProperty(Ve, "__esModule", { value: !0 }), Ve.validateTuple = void 0;
  const e = te(), t = ne(), o = Re(), n = {
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
    const { gen: i, parentSchema: s, data: d, keyword: E, it: g } = a;
    b(s), g.opts.unevaluated && f.length && g.items !== !0 && (g.items = t.mergeEvaluated.items(i, f.length, g.items));
    const p = i.name("valid"), w = i.const("len", (0, e._)`${d}.length`);
    f.forEach((l, h) => {
      (0, t.alwaysValidSchema)(g, l) || (i.if((0, e._)`${w} > ${h}`, () => a.subschema({
        keyword: E,
        schemaProp: h,
        dataProp: h
      }, p)), a.ok(p));
    });
    function b(l) {
      const { opts: h, errSchemaPath: c } = g, m = f.length, y = m === l.minItems && (m === l.maxItems || l[r] === !1);
      if (h.strictTuples && !y) {
        const v = `"${E}" is ${m}-tuple, but minItems or maxItems/${r} are not specified or different at path "${c}"`;
        (0, t.checkStrictMode)(g, v, h.strictTuples);
      }
    }
  }
  return Ve.validateTuple = u, Ve.default = n, Ve;
}
var qo;
function bf() {
  if (qo) return Wt;
  qo = 1, Object.defineProperty(Wt, "__esModule", { value: !0 });
  const e = Lc(), t = {
    keyword: "prefixItems",
    type: "array",
    schemaType: ["array"],
    before: "uniqueItems",
    code: (o) => (0, e.validateTuple)(o, "items")
  };
  return Wt.default = t, Wt;
}
var Kt = {}, ko;
function Rf() {
  if (ko) return Kt;
  ko = 1, Object.defineProperty(Kt, "__esModule", { value: !0 });
  const e = te(), t = ne(), o = Re(), n = Dc(), a = {
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
  return Kt.default = a, Kt;
}
var Xt = {}, jo;
function Of() {
  if (jo) return Xt;
  jo = 1, Object.defineProperty(Xt, "__esModule", { value: !0 });
  const e = te(), t = ne(), n = {
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
      let d, E;
      const { minContains: g, maxContains: p } = f;
      s.opts.next ? (d = g === void 0 ? 1 : g, E = p) : d = 1;
      const w = a.const("len", (0, e._)`${i}.length`);
      if (u.setParams({ min: d, max: E }), E === void 0 && d === 0) {
        (0, t.checkStrictMode)(s, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
        return;
      }
      if (E !== void 0 && d > E) {
        (0, t.checkStrictMode)(s, '"minContains" > "maxContains" is always invalid'), u.fail();
        return;
      }
      if ((0, t.alwaysValidSchema)(s, r)) {
        let m = (0, e._)`${w} >= ${d}`;
        E !== void 0 && (m = (0, e._)`${m} && ${w} <= ${E}`), u.pass(m);
        return;
      }
      s.items = !0;
      const b = a.name("valid");
      E === void 0 && d === 1 ? h(b, () => a.if(b, () => a.break())) : d === 0 ? (a.let(b, !0), E !== void 0 && a.if((0, e._)`${i}.length > 0`, l)) : (a.let(b, !1), l()), u.result(b, () => u.reset());
      function l() {
        const m = a.name("_valid"), y = a.let("count", 0);
        h(m, () => a.if(m, () => c(y)));
      }
      function h(m, y) {
        a.forRange("i", 0, w, (v) => {
          u.subschema({
            keyword: "contains",
            dataProp: v,
            dataPropType: t.Type.Num,
            compositeRule: !0
          }, m), y();
        });
      }
      function c(m) {
        a.code((0, e._)`${m}++`), E === void 0 ? a.if((0, e._)`${m} >= ${d}`, () => a.assign(b, !0).break()) : (a.if((0, e._)`${m} > ${E}`, () => a.assign(b, !1).break()), d === 1 ? a.assign(b, !0) : a.if((0, e._)`${m} >= ${d}`, () => a.assign(b, !0)));
      }
    }
  };
  return Xt.default = n, Xt;
}
var En = {}, Mo;
function If() {
  return Mo || (Mo = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
    const t = te(), o = ne(), n = Re();
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
        const b = s[w];
        if (b.length === 0)
          continue;
        const l = (0, n.propertyInData)(d, E, w, g.opts.ownProperties);
        i.setParams({
          property: w,
          depsCount: b.length,
          deps: b.join(", ")
        }), g.allErrors ? d.if(l, () => {
          for (const h of b)
            (0, n.checkReportMissingProp)(i, h);
        }) : (d.if((0, t._)`${l} && (${(0, n.checkMissingProp)(i, b, p)})`), (0, n.reportMissingProp)(i, p), d.else());
      }
    }
    e.validatePropertyDeps = r;
    function f(i, s = i.schema) {
      const { gen: d, data: E, keyword: g, it: p } = i, w = d.name("valid");
      for (const b in s)
        (0, o.alwaysValidSchema)(p, s[b]) || (d.if(
          (0, n.propertyInData)(d, E, b, p.opts.ownProperties),
          () => {
            const l = i.subschema({ keyword: g, schemaProp: b }, w);
            i.mergeValidEvaluated(l, w);
          },
          () => d.var(w, !0)
          // TODO var
        ), i.ok(w));
    }
    e.validateSchemaDeps = f, e.default = u;
  }(En)), En;
}
var Zt = {}, xo;
function Nf() {
  if (xo) return Zt;
  xo = 1, Object.defineProperty(Zt, "__esModule", { value: !0 });
  const e = te(), t = ne(), n = {
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
  return Zt.default = n, Zt;
}
var Jt = {}, Uo;
function Ac() {
  if (Uo) return Jt;
  Uo = 1, Object.defineProperty(Jt, "__esModule", { value: !0 });
  const e = Re(), t = te(), o = Ae(), n = ne(), a = {
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
      const { gen: f, schema: i, parentSchema: s, data: d, errsCount: E, it: g } = r;
      if (!E)
        throw new Error("ajv implementation error");
      const { allErrors: p, opts: w } = g;
      if (g.props = !0, w.removeAdditional !== "all" && (0, n.alwaysValidSchema)(g, i))
        return;
      const b = (0, e.allSchemaProperties)(s.properties), l = (0, e.allSchemaProperties)(s.patternProperties);
      h(), r.ok((0, t._)`${E} === ${o.default.errors}`);
      function h() {
        f.forIn("key", d, (_) => {
          !b.length && !l.length ? y(_) : f.if(c(_), () => y(_));
        });
      }
      function c(_) {
        let S;
        if (b.length > 8) {
          const $ = (0, n.schemaRefOrVal)(g, s.properties, "properties");
          S = (0, e.isOwnProperty)(f, $, _);
        } else b.length ? S = (0, t.or)(...b.map(($) => (0, t._)`${_} === ${$}`)) : S = t.nil;
        return l.length && (S = (0, t.or)(S, ...l.map(($) => (0, t._)`${(0, e.usePattern)(r, $)}.test(${_})`))), (0, t.not)(S);
      }
      function m(_) {
        f.code((0, t._)`delete ${d}[${_}]`);
      }
      function y(_) {
        if (w.removeAdditional === "all" || w.removeAdditional && i === !1) {
          m(_);
          return;
        }
        if (i === !1) {
          r.setParams({ additionalProperty: _ }), r.error(), p || f.break();
          return;
        }
        if (typeof i == "object" && !(0, n.alwaysValidSchema)(g, i)) {
          const S = f.name("valid");
          w.removeAdditional === "failing" ? (v(_, S, !1), f.if((0, t.not)(S), () => {
            r.reset(), m(_);
          })) : (v(_, S), p || f.if((0, t.not)(S), () => f.break()));
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
  return Jt.default = a, Jt;
}
var Yt = {}, zo;
function Pf() {
  if (zo) return Yt;
  zo = 1, Object.defineProperty(Yt, "__esModule", { value: !0 });
  const e = gr(), t = Re(), o = ne(), n = Ac(), u = {
    keyword: "properties",
    type: "object",
    schemaType: "object",
    code(a) {
      const { gen: r, schema: f, parentSchema: i, data: s, it: d } = a;
      d.opts.removeAdditional === "all" && i.additionalProperties === void 0 && n.default.code(new e.KeywordCxt(d, n.default, "additionalProperties"));
      const E = (0, t.allSchemaProperties)(f);
      for (const l of E)
        d.definedProperties.add(l);
      d.opts.unevaluated && E.length && d.props !== !0 && (d.props = o.mergeEvaluated.props(r, (0, o.toHash)(E), d.props));
      const g = E.filter((l) => !(0, o.alwaysValidSchema)(d, f[l]));
      if (g.length === 0)
        return;
      const p = r.name("valid");
      for (const l of g)
        w(l) ? b(l) : (r.if((0, t.propertyInData)(r, s, l, d.opts.ownProperties)), b(l), d.allErrors || r.else().var(p, !0), r.endIf()), a.it.definedProperties.add(l), a.ok(p);
      function w(l) {
        return d.opts.useDefaults && !d.compositeRule && f[l].default !== void 0;
      }
      function b(l) {
        a.subschema({
          keyword: "properties",
          schemaProp: l,
          dataProp: l
        }, p);
      }
    }
  };
  return Yt.default = u, Yt;
}
var Qt = {}, Vo;
function Tf() {
  if (Vo) return Qt;
  Vo = 1, Object.defineProperty(Qt, "__esModule", { value: !0 });
  const e = Re(), t = te(), o = ne(), n = ne(), u = {
    keyword: "patternProperties",
    type: "object",
    schemaType: "object",
    code(a) {
      const { gen: r, schema: f, data: i, parentSchema: s, it: d } = a, { opts: E } = d, g = (0, e.allSchemaProperties)(f), p = g.filter((y) => (0, o.alwaysValidSchema)(d, f[y]));
      if (g.length === 0 || p.length === g.length && (!d.opts.unevaluated || d.props === !0))
        return;
      const w = E.strictSchema && !E.allowMatchingProperties && s.properties, b = r.name("valid");
      d.props !== !0 && !(d.props instanceof t.Name) && (d.props = (0, n.evaluatedPropsToName)(r, d.props));
      const { props: l } = d;
      h();
      function h() {
        for (const y of g)
          w && c(y), d.allErrors ? m(y) : (r.var(b, !0), m(y), r.if(b));
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
            }, b), d.opts.unevaluated && l !== !0 ? r.assign((0, t._)`${l}[${v}]`, !0) : !_ && !d.allErrors && r.if((0, t.not)(b), () => r.break());
          });
        });
      }
    }
  };
  return Qt.default = u, Qt;
}
var er = {}, Go;
function Cf() {
  if (Go) return er;
  Go = 1, Object.defineProperty(er, "__esModule", { value: !0 });
  const e = ne(), t = {
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
  return er.default = t, er;
}
var tr = {}, Bo;
function Df() {
  if (Bo) return tr;
  Bo = 1, Object.defineProperty(tr, "__esModule", { value: !0 });
  const t = {
    keyword: "anyOf",
    schemaType: "array",
    trackErrors: !0,
    code: Re().validateUnion,
    error: { message: "must match a schema in anyOf" }
  };
  return tr.default = t, tr;
}
var rr = {}, Ho;
function Lf() {
  if (Ho) return rr;
  Ho = 1, Object.defineProperty(rr, "__esModule", { value: !0 });
  const e = te(), t = ne(), n = {
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
      const s = r, d = a.let("valid", !1), E = a.let("passing", null), g = a.name("_valid");
      u.setParams({ passing: E }), a.block(p), u.result(d, () => u.reset(), () => u.error(!0));
      function p() {
        s.forEach((w, b) => {
          let l;
          (0, t.alwaysValidSchema)(i, w) ? a.var(g, !0) : l = u.subschema({
            keyword: "oneOf",
            schemaProp: b,
            compositeRule: !0
          }, g), b > 0 && a.if((0, e._)`${g} && ${d}`).assign(d, !1).assign(E, (0, e._)`[${E}, ${b}]`).else(), a.if(g, () => {
            a.assign(d, !0), a.assign(E, b), l && u.mergeEvaluated(l, e.Name);
          });
        });
      }
    }
  };
  return rr.default = n, rr;
}
var nr = {}, Wo;
function Af() {
  if (Wo) return nr;
  Wo = 1, Object.defineProperty(nr, "__esModule", { value: !0 });
  const e = ne(), t = {
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
  return nr.default = t, nr;
}
var ir = {}, Ko;
function Ff() {
  if (Ko) return ir;
  Ko = 1, Object.defineProperty(ir, "__esModule", { value: !0 });
  const e = te(), t = ne(), n = {
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
      const E = r.let("valid", !0), g = r.name("_valid");
      if (p(), a.reset(), s && d) {
        const b = r.let("ifClause");
        a.setParams({ ifClause: b }), r.if(g, w("then", b), w("else", b));
      } else s ? r.if(g, w("then")) : r.if((0, e.not)(g), w("else"));
      a.pass(E, () => a.error(!0));
      function p() {
        const b = a.subschema({
          keyword: "if",
          compositeRule: !0,
          createErrors: !1,
          allErrors: !1
        }, g);
        a.mergeEvaluated(b);
      }
      function w(b, l) {
        return () => {
          const h = a.subschema({ keyword: b }, g);
          r.assign(E, g), a.mergeValidEvaluated(h, E), l ? r.assign(l, (0, e._)`${b}`) : a.setParams({ ifClause: b });
        };
      }
    }
  };
  function u(a, r) {
    const f = a.schema[r];
    return f !== void 0 && !(0, t.alwaysValidSchema)(a, f);
  }
  return ir.default = n, ir;
}
var sr = {}, Xo;
function qf() {
  if (Xo) return sr;
  Xo = 1, Object.defineProperty(sr, "__esModule", { value: !0 });
  const e = ne(), t = {
    keyword: ["then", "else"],
    schemaType: ["object", "boolean"],
    code({ keyword: o, parentSchema: n, it: u }) {
      n.if === void 0 && (0, e.checkStrictMode)(u, `"${o}" without "if" is ignored`);
    }
  };
  return sr.default = t, sr;
}
var Zo;
function kf() {
  if (Zo) return Ht;
  Zo = 1, Object.defineProperty(Ht, "__esModule", { value: !0 });
  const e = Dc(), t = bf(), o = Lc(), n = Rf(), u = Of(), a = If(), r = Nf(), f = Ac(), i = Pf(), s = Tf(), d = Cf(), E = Df(), g = Lf(), p = Af(), w = Ff(), b = qf();
  function l(h = !1) {
    const c = [
      // any
      d.default,
      E.default,
      g.default,
      p.default,
      w.default,
      b.default,
      // object
      r.default,
      f.default,
      a.default,
      i.default,
      s.default
    ];
    return h ? c.push(t.default, n.default) : c.push(e.default, o.default), c.push(u.default), c;
  }
  return Ht.default = l, Ht;
}
var or = {}, ar = {}, Jo;
function jf() {
  if (Jo) return ar;
  Jo = 1, Object.defineProperty(ar, "__esModule", { value: !0 });
  const e = te(), o = {
    keyword: "format",
    type: ["number", "string"],
    schemaType: "string",
    $data: !0,
    error: {
      message: ({ schemaCode: n }) => (0, e.str)`must match format "${n}"`,
      params: ({ schemaCode: n }) => (0, e._)`{format: ${n}}`
    },
    code(n, u) {
      const { gen: a, data: r, $data: f, schema: i, schemaCode: s, it: d } = n, { opts: E, errSchemaPath: g, schemaEnv: p, self: w } = d;
      if (!E.validateFormats)
        return;
      f ? b() : l();
      function b() {
        const h = a.scopeValue("formats", {
          ref: w.formats,
          code: E.code.formats
        }), c = a.const("fDef", (0, e._)`${h}[${s}]`), m = a.let("fType"), y = a.let("format");
        a.if((0, e._)`typeof ${c} == "object" && !(${c} instanceof RegExp)`, () => a.assign(m, (0, e._)`${c}.type || "string"`).assign(y, (0, e._)`${c}.validate`), () => a.assign(m, (0, e._)`"string"`).assign(y, c)), n.fail$data((0, e.or)(v(), _()));
        function v() {
          return E.strictSchema === !1 ? e.nil : (0, e._)`${s} && !${y}`;
        }
        function _() {
          const S = p.$async ? (0, e._)`(${c}.async ? await ${y}(${r}) : ${y}(${r}))` : (0, e._)`${y}(${r})`, $ = (0, e._)`(typeof ${y} == "function" ? ${S} : ${y}.test(${r}))`;
          return (0, e._)`${y} && ${y} !== true && ${m} === ${u} && !${$}`;
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
        c === u && n.pass(S());
        function v() {
          if (E.strictSchema === !1) {
            w.logger.warn($());
            return;
          }
          throw new Error($());
          function $() {
            return `unknown format "${i}" ignored in schema at path "${g}"`;
          }
        }
        function _($) {
          const O = $ instanceof RegExp ? (0, e.regexpCode)($) : E.code.formats ? (0, e._)`${E.code.formats}${(0, e.getProperty)(i)}` : void 0, T = a.scopeValue("formats", { key: i, ref: $, code: O });
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
  return ar.default = o, ar;
}
var Yo;
function Mf() {
  if (Yo) return or;
  Yo = 1, Object.defineProperty(or, "__esModule", { value: !0 });
  const t = [jf().default];
  return or.default = t, or;
}
var Me = {}, Qo;
function xf() {
  return Qo || (Qo = 1, Object.defineProperty(Me, "__esModule", { value: !0 }), Me.contentVocabulary = Me.metadataVocabulary = void 0, Me.metadataVocabulary = [
    "title",
    "description",
    "default",
    "deprecated",
    "readOnly",
    "writeOnly",
    "examples"
  ], Me.contentVocabulary = [
    "contentMediaType",
    "contentEncoding",
    "contentSchema"
  ]), Me;
}
var ea;
function Uf() {
  if (ea) return Tt;
  ea = 1, Object.defineProperty(Tt, "__esModule", { value: !0 });
  const e = lf(), t = $f(), o = kf(), n = Mf(), u = xf(), a = [
    e.default,
    t.default,
    (0, o.default)(),
    n.default,
    u.metadataVocabulary,
    u.contentVocabulary
  ];
  return Tt.default = a, Tt;
}
var cr = {}, Je = {}, ta;
function zf() {
  if (ta) return Je;
  ta = 1, Object.defineProperty(Je, "__esModule", { value: !0 }), Je.DiscrError = void 0;
  var e;
  return function(t) {
    t.Tag = "tag", t.Mapping = "mapping";
  }(e || (Je.DiscrError = e = {})), Je;
}
var ra;
function Vf() {
  if (ra) return cr;
  ra = 1, Object.defineProperty(cr, "__esModule", { value: !0 });
  const e = te(), t = zf(), o = Di(), n = _r(), u = ne(), r = {
    keyword: "discriminator",
    type: "object",
    schemaType: "object",
    error: {
      message: ({ params: { discrError: f, tagName: i } }) => f === t.DiscrError.Tag ? `tag "${i}" must be string` : `value of tag "${i}" must be in oneOf`,
      params: ({ params: { discrError: f, tag: i, tagName: s } }) => (0, e._)`{error: ${f}, tag: ${s}, tagValue: ${i}}`
    },
    code(f) {
      const { gen: i, data: s, schema: d, parentSchema: E, it: g } = f, { oneOf: p } = E;
      if (!g.opts.discriminator)
        throw new Error("discriminator: requires discriminator option");
      const w = d.propertyName;
      if (typeof w != "string")
        throw new Error("discriminator: requires propertyName");
      if (d.mapping)
        throw new Error("discriminator: mapping is not supported");
      if (!p)
        throw new Error("discriminator: requires oneOf keyword");
      const b = i.let("valid", !1), l = i.const("tag", (0, e._)`${s}${(0, e.getProperty)(w)}`);
      i.if((0, e._)`typeof ${l} == "string"`, () => h(), () => f.error(!1, { discrError: t.DiscrError.Tag, tag: l, tagName: w })), f.ok(b);
      function h() {
        const y = m();
        i.if(!1);
        for (const v in y)
          i.elseIf((0, e._)`${l} === ${v}`), i.assign(b, c(y[v]));
        i.else(), f.error(!1, { discrError: t.DiscrError.Mapping, tag: l, tagName: w }), i.endIf();
      }
      function c(y) {
        const v = i.name("valid"), _ = f.subschema({ keyword: "oneOf", schemaProp: y }, v);
        return f.mergeEvaluated(_, e.Name), v;
      }
      function m() {
        var y;
        const v = {}, _ = $(E);
        let S = !0;
        for (let k = 0; k < p.length; k++) {
          let H = p[k];
          if (H?.$ref && !(0, u.schemaHasRulesButRef)(H, g.self.RULES)) {
            const z = H.$ref;
            if (H = o.resolveRef.call(g.self, g.schemaEnv.root, g.baseId, z), H instanceof o.SchemaEnv && (H = H.schema), H === void 0)
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
  return cr.default = r, cr;
}
const Gf = "http://json-schema.org/draft-07/schema#", Bf = "http://json-schema.org/draft-07/schema#", Hf = "Core schema meta-schema", Wf = { schemaArray: { type: "array", minItems: 1, items: { $ref: "#" } }, nonNegativeInteger: { type: "integer", minimum: 0 }, nonNegativeIntegerDefault0: { allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }] }, simpleTypes: { enum: ["array", "boolean", "integer", "null", "number", "object", "string"] }, stringArray: { type: "array", items: { type: "string" }, uniqueItems: !0, default: [] } }, Kf = ["object", "boolean"], Xf = { $id: { type: "string", format: "uri-reference" }, $schema: { type: "string", format: "uri" }, $ref: { type: "string", format: "uri-reference" }, $comment: { type: "string" }, title: { type: "string" }, description: { type: "string" }, default: !0, readOnly: { type: "boolean", default: !1 }, examples: { type: "array", items: !0 }, multipleOf: { type: "number", exclusiveMinimum: 0 }, maximum: { type: "number" }, exclusiveMaximum: { type: "number" }, minimum: { type: "number" }, exclusiveMinimum: { type: "number" }, maxLength: { $ref: "#/definitions/nonNegativeInteger" }, minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, pattern: { type: "string", format: "regex" }, additionalItems: { $ref: "#" }, items: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }], default: !0 }, maxItems: { $ref: "#/definitions/nonNegativeInteger" }, minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, uniqueItems: { type: "boolean", default: !1 }, contains: { $ref: "#" }, maxProperties: { $ref: "#/definitions/nonNegativeInteger" }, minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, required: { $ref: "#/definitions/stringArray" }, additionalProperties: { $ref: "#" }, definitions: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, properties: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, patternProperties: { type: "object", additionalProperties: { $ref: "#" }, propertyNames: { format: "regex" }, default: {} }, dependencies: { type: "object", additionalProperties: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }] } }, propertyNames: { $ref: "#" }, const: !0, enum: { type: "array", items: !0, minItems: 1, uniqueItems: !0 }, type: { anyOf: [{ $ref: "#/definitions/simpleTypes" }, { type: "array", items: { $ref: "#/definitions/simpleTypes" }, minItems: 1, uniqueItems: !0 }] }, format: { type: "string" }, contentMediaType: { type: "string" }, contentEncoding: { type: "string" }, if: { $ref: "#" }, then: { $ref: "#" }, else: { $ref: "#" }, allOf: { $ref: "#/definitions/schemaArray" }, anyOf: { $ref: "#/definitions/schemaArray" }, oneOf: { $ref: "#/definitions/schemaArray" }, not: { $ref: "#" } }, Zf = {
  $schema: Gf,
  $id: Bf,
  title: Hf,
  definitions: Wf,
  type: Kf,
  properties: Xf,
  default: !0
};
var na;
function Fc() {
  return na || (na = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
    const o = cf(), n = Uf(), u = Vf(), a = Zf, r = ["/properties"], f = "http://json-schema.org/draft-07/schema";
    class i extends o.default {
      _addVocabularies() {
        super._addVocabularies(), n.default.forEach((w) => this.addVocabulary(w)), this.opts.discriminator && this.addKeyword(u.default);
      }
      _addDefaultMetaSchema() {
        if (super._addDefaultMetaSchema(), !this.opts.meta)
          return;
        const w = this.opts.$data ? this.$dataMetaSchema(a, r) : a;
        this.addMetaSchema(w, f, !1), this.refs["http://json-schema.org/schema"] = f;
      }
      defaultMeta() {
        return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(f) ? f : void 0);
      }
    }
    t.Ajv = i, e.exports = t = i, e.exports.Ajv = i, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = i;
    var s = gr();
    Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
      return s.KeywordCxt;
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
    var E = Ci();
    Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
      return E.default;
    } });
    var g = _r();
    Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
      return g.default;
    } });
  }(Rt, Rt.exports)), Rt.exports;
}
var ur = { exports: {} }, gn = {}, ia;
function Jf() {
  return ia || (ia = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
    function t(O, T) {
      return { validate: O, compare: T };
    }
    e.fullFormats = {
      // date: http://tools.ietf.org/html/rfc3339#section-5.6
      date: t(a, r),
      // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
      time: t(i, s),
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
    function o(O) {
      return O % 4 === 0 && (O % 100 !== 0 || O % 400 === 0);
    }
    const n = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, u = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function a(O) {
      const T = n.exec(O);
      if (!T)
        return !1;
      const k = +T[1], H = +T[2], U = +T[3];
      return H >= 1 && H <= 12 && U >= 1 && U <= (H === 2 && o(k) ? 29 : u[H]);
    }
    function r(O, T) {
      if (O && T)
        return O > T ? 1 : O < T ? -1 : 0;
    }
    const f = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
    function i(O, T) {
      const k = f.exec(O);
      if (!k)
        return !1;
      const H = +k[1], U = +k[2], z = +k[3], V = k[5];
      return (H <= 23 && U <= 59 && z <= 59 || H === 23 && U === 59 && z === 60) && (!T || V !== "");
    }
    function s(O, T) {
      if (!(O && T))
        return;
      const k = f.exec(O), H = f.exec(T);
      if (k && H)
        return O = k[1] + k[2] + k[3] + (k[4] || ""), T = H[1] + H[2] + H[3] + (H[4] || ""), O > T ? 1 : O < T ? -1 : 0;
    }
    const d = /t|\s/i;
    function E(O) {
      const T = O.split(d);
      return T.length === 2 && a(T[0]) && i(T[1], !0);
    }
    function g(O, T) {
      if (!(O && T))
        return;
      const [k, H] = O.split(d), [U, z] = T.split(d), V = r(k, U);
      if (V !== void 0)
        return V || s(H, z);
    }
    const p = /\/|:/, w = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
    function b(O) {
      return p.test(O) && w.test(O);
    }
    const l = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
    function h(O) {
      return l.lastIndex = 0, l.test(O);
    }
    const c = -(2 ** 31), m = 2 ** 31 - 1;
    function y(O) {
      return Number.isInteger(O) && O <= m && O >= c;
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
  }(gn)), gn;
}
var _n = {}, sa;
function Yf() {
  return sa || (sa = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
    const t = Fc(), o = te(), n = o.operators, u = {
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
        const { gen: i, data: s, schemaCode: d, keyword: E, it: g } = f, { opts: p, self: w } = g;
        if (!p.validateFormats)
          return;
        const b = new t.KeywordCxt(g, w.RULES.all.format.definition, "format");
        b.$data ? l() : h();
        function l() {
          const m = i.scopeValue("formats", {
            ref: w.formats,
            code: p.code.formats
          }), y = i.const("fmt", o._`${m}[${b.schemaCode}]`);
          f.fail$data(o.or(o._`typeof ${y} != "object"`, o._`${y} instanceof RegExp`, o._`typeof ${y}.compare != "function"`, c(y)));
        }
        function h() {
          const m = b.schema, y = w.formats[m];
          if (!y || y === !0)
            return;
          if (typeof y != "object" || y instanceof RegExp || typeof y.compare != "function")
            throw new Error(`"${E}": format "${m}" does not define "compare" function`);
          const v = i.scopeValue("formats", {
            key: m,
            ref: y,
            code: p.code.formats ? o._`${p.code.formats}${o.getProperty(m)}` : void 0
          });
          f.fail$data(c(v));
        }
        function c(m) {
          return o._`${m}.compare(${s}, ${d}) ${u[E].fail} 0`;
        }
      },
      dependencies: ["format"]
    };
    const r = (f) => (f.addKeyword(e.formatLimitDefinition), f);
    e.default = r;
  }(_n)), _n;
}
var oa;
function Qf() {
  return oa || (oa = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 });
    const o = Jf(), n = Yf(), u = te(), a = new u.Name("fullFormats"), r = new u.Name("fastFormats"), f = (s, d = { keywords: !0 }) => {
      if (Array.isArray(d))
        return i(s, d, o.fullFormats, a), s;
      const [E, g] = d.mode === "fast" ? [o.fastFormats, r] : [o.fullFormats, a], p = d.formats || o.formatNames;
      return i(s, p, E, g), d.keywords && n.default(s), s;
    };
    f.get = (s, d = "full") => {
      const g = (d === "fast" ? o.fastFormats : o.fullFormats)[s];
      if (!g)
        throw new Error(`Unknown format "${s}"`);
      return g;
    };
    function i(s, d, E, g) {
      var p, w;
      (p = (w = s.opts.code).formats) !== null && p !== void 0 || (w.formats = u._`require("ajv-formats/dist/formats").${g}`);
      for (const b of d)
        s.addFormat(b, E[b]);
    }
    e.exports = t = f, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = f;
  }(ur, ur.exports)), ur.exports;
}
var Sn, aa;
function el() {
  if (aa) return Sn;
  aa = 1;
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
${s}`, u = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), a = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), r = (i, s, d) => {
    const E = d === "" ? "" : `with ${d.trim()}() `, g = n.bind(null, E, s.toString());
    Object.defineProperty(g, "name", a), Object.defineProperty(i, "toString", { ...u, value: g });
  };
  return Sn = (i, s, { ignoreNonConfigurable: d = !1 } = {}) => {
    const { name: E } = i;
    for (const g of Reflect.ownKeys(s))
      e(i, s, g, d);
    return o(i, s), r(i, s, E), i;
  }, Sn;
}
var wn, ca;
function tl() {
  if (ca) return wn;
  ca = 1;
  const e = el();
  return wn = (t, o = {}) => {
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
      const d = this, E = () => {
        r = void 0, a && (f = t.apply(d, s));
      }, g = u && !r;
      return clearTimeout(r), r = setTimeout(E, n), g && (f = t.apply(d, s)), f;
    };
    return e(i, t), i.cancel = () => {
      r && (clearTimeout(r), r = void 0);
    }, i;
  }, wn;
}
var fr = { exports: {} }, $n, ua;
function Sr() {
  if (ua) return $n;
  ua = 1;
  const e = "2.0.0", t = 256, o = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991, n = 16, u = t - 6;
  return $n = {
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
  }, $n;
}
var bn, fa;
function wr() {
  return fa || (fa = 1, bn = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...t) => console.error("SEMVER", ...t) : () => {
  }), bn;
}
var la;
function st() {
  return la || (la = 1, function(e, t) {
    const {
      MAX_SAFE_COMPONENT_LENGTH: o,
      MAX_SAFE_BUILD_LENGTH: n,
      MAX_LENGTH: u
    } = Sr(), a = wr();
    t = e.exports = {};
    const r = t.re = [], f = t.safeRe = [], i = t.src = [], s = t.t = {};
    let d = 0;
    const E = "[a-zA-Z0-9-]", g = [
      ["\\s", 1],
      ["\\d", u],
      [E, n]
    ], p = (b) => {
      for (const [l, h] of g)
        b = b.split(`${l}*`).join(`${l}{0,${h}}`).split(`${l}+`).join(`${l}{1,${h}}`);
      return b;
    }, w = (b, l, h) => {
      const c = p(l), m = d++;
      a(b, m, l), s[b] = m, i[m] = l, r[m] = new RegExp(l, h ? "g" : void 0), f[m] = new RegExp(c, h ? "g" : void 0);
    };
    w("NUMERICIDENTIFIER", "0|[1-9]\\d*"), w("NUMERICIDENTIFIERLOOSE", "\\d+"), w("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${E}*`), w("MAINVERSION", `(${i[s.NUMERICIDENTIFIER]})\\.(${i[s.NUMERICIDENTIFIER]})\\.(${i[s.NUMERICIDENTIFIER]})`), w("MAINVERSIONLOOSE", `(${i[s.NUMERICIDENTIFIERLOOSE]})\\.(${i[s.NUMERICIDENTIFIERLOOSE]})\\.(${i[s.NUMERICIDENTIFIERLOOSE]})`), w("PRERELEASEIDENTIFIER", `(?:${i[s.NUMERICIDENTIFIER]}|${i[s.NONNUMERICIDENTIFIER]})`), w("PRERELEASEIDENTIFIERLOOSE", `(?:${i[s.NUMERICIDENTIFIERLOOSE]}|${i[s.NONNUMERICIDENTIFIER]})`), w("PRERELEASE", `(?:-(${i[s.PRERELEASEIDENTIFIER]}(?:\\.${i[s.PRERELEASEIDENTIFIER]})*))`), w("PRERELEASELOOSE", `(?:-?(${i[s.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${i[s.PRERELEASEIDENTIFIERLOOSE]})*))`), w("BUILDIDENTIFIER", `${E}+`), w("BUILD", `(?:\\+(${i[s.BUILDIDENTIFIER]}(?:\\.${i[s.BUILDIDENTIFIER]})*))`), w("FULLPLAIN", `v?${i[s.MAINVERSION]}${i[s.PRERELEASE]}?${i[s.BUILD]}?`), w("FULL", `^${i[s.FULLPLAIN]}$`), w("LOOSEPLAIN", `[v=\\s]*${i[s.MAINVERSIONLOOSE]}${i[s.PRERELEASELOOSE]}?${i[s.BUILD]}?`), w("LOOSE", `^${i[s.LOOSEPLAIN]}$`), w("GTLT", "((?:<|>)?=?)"), w("XRANGEIDENTIFIERLOOSE", `${i[s.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), w("XRANGEIDENTIFIER", `${i[s.NUMERICIDENTIFIER]}|x|X|\\*`), w("XRANGEPLAIN", `[v=\\s]*(${i[s.XRANGEIDENTIFIER]})(?:\\.(${i[s.XRANGEIDENTIFIER]})(?:\\.(${i[s.XRANGEIDENTIFIER]})(?:${i[s.PRERELEASE]})?${i[s.BUILD]}?)?)?`), w("XRANGEPLAINLOOSE", `[v=\\s]*(${i[s.XRANGEIDENTIFIERLOOSE]})(?:\\.(${i[s.XRANGEIDENTIFIERLOOSE]})(?:\\.(${i[s.XRANGEIDENTIFIERLOOSE]})(?:${i[s.PRERELEASELOOSE]})?${i[s.BUILD]}?)?)?`), w("XRANGE", `^${i[s.GTLT]}\\s*${i[s.XRANGEPLAIN]}$`), w("XRANGELOOSE", `^${i[s.GTLT]}\\s*${i[s.XRANGEPLAINLOOSE]}$`), w("COERCEPLAIN", `(^|[^\\d])(\\d{1,${o}})(?:\\.(\\d{1,${o}}))?(?:\\.(\\d{1,${o}}))?`), w("COERCE", `${i[s.COERCEPLAIN]}(?:$|[^\\d])`), w("COERCEFULL", i[s.COERCEPLAIN] + `(?:${i[s.PRERELEASE]})?(?:${i[s.BUILD]})?(?:$|[^\\d])`), w("COERCERTL", i[s.COERCE], !0), w("COERCERTLFULL", i[s.COERCEFULL], !0), w("LONETILDE", "(?:~>?)"), w("TILDETRIM", `(\\s*)${i[s.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", w("TILDE", `^${i[s.LONETILDE]}${i[s.XRANGEPLAIN]}$`), w("TILDELOOSE", `^${i[s.LONETILDE]}${i[s.XRANGEPLAINLOOSE]}$`), w("LONECARET", "(?:\\^)"), w("CARETTRIM", `(\\s*)${i[s.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", w("CARET", `^${i[s.LONECARET]}${i[s.XRANGEPLAIN]}$`), w("CARETLOOSE", `^${i[s.LONECARET]}${i[s.XRANGEPLAINLOOSE]}$`), w("COMPARATORLOOSE", `^${i[s.GTLT]}\\s*(${i[s.LOOSEPLAIN]})$|^$`), w("COMPARATOR", `^${i[s.GTLT]}\\s*(${i[s.FULLPLAIN]})$|^$`), w("COMPARATORTRIM", `(\\s*)${i[s.GTLT]}\\s*(${i[s.LOOSEPLAIN]}|${i[s.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", w("HYPHENRANGE", `^\\s*(${i[s.XRANGEPLAIN]})\\s+-\\s+(${i[s.XRANGEPLAIN]})\\s*$`), w("HYPHENRANGELOOSE", `^\\s*(${i[s.XRANGEPLAINLOOSE]})\\s+-\\s+(${i[s.XRANGEPLAINLOOSE]})\\s*$`), w("STAR", "(<|>)?=?\\s*\\*"), w("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), w("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }(fr, fr.exports)), fr.exports;
}
var Rn, da;
function Ai() {
  if (da) return Rn;
  da = 1;
  const e = Object.freeze({ loose: !0 }), t = Object.freeze({});
  return Rn = (n) => n ? typeof n != "object" ? e : n : t, Rn;
}
var On, ha;
function qc() {
  if (ha) return On;
  ha = 1;
  const e = /^[0-9]+$/, t = (n, u) => {
    const a = e.test(n), r = e.test(u);
    return a && r && (n = +n, u = +u), n === u ? 0 : a && !r ? -1 : r && !a ? 1 : n < u ? -1 : 1;
  };
  return On = {
    compareIdentifiers: t,
    rcompareIdentifiers: (n, u) => t(u, n)
  }, On;
}
var In, ma;
function ve() {
  if (ma) return In;
  ma = 1;
  const e = wr(), { MAX_LENGTH: t, MAX_SAFE_INTEGER: o } = Sr(), { safeRe: n, t: u } = st(), a = Ai(), { compareIdentifiers: r } = qc();
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
      const E = s.trim().match(d.loose ? n[u.LOOSE] : n[u.FULL]);
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
      s instanceof f || (s = new f(s, this.options));
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
  return In = f, In;
}
var Nn, pa;
function He() {
  if (pa) return Nn;
  pa = 1;
  const e = ve();
  return Nn = (o, n, u = !1) => {
    if (o instanceof e)
      return o;
    try {
      return new e(o, n);
    } catch (a) {
      if (!u)
        return null;
      throw a;
    }
  }, Nn;
}
var Pn, ya;
function rl() {
  if (ya) return Pn;
  ya = 1;
  const e = He();
  return Pn = (o, n) => {
    const u = e(o, n);
    return u ? u.version : null;
  }, Pn;
}
var Tn, va;
function nl() {
  if (va) return Tn;
  va = 1;
  const e = He();
  return Tn = (o, n) => {
    const u = e(o.trim().replace(/^[=v]+/, ""), n);
    return u ? u.version : null;
  }, Tn;
}
var Cn, Ea;
function il() {
  if (Ea) return Cn;
  Ea = 1;
  const e = ve();
  return Cn = (o, n, u, a, r) => {
    typeof u == "string" && (r = a, a = u, u = void 0);
    try {
      return new e(
        o instanceof e ? o.version : o,
        u
      ).inc(n, a, r).version;
    } catch {
      return null;
    }
  }, Cn;
}
var Dn, ga;
function sl() {
  if (ga) return Dn;
  ga = 1;
  const e = He();
  return Dn = (o, n) => {
    const u = e(o, null, !0), a = e(n, null, !0), r = u.compare(a);
    if (r === 0)
      return null;
    const f = r > 0, i = f ? u : a, s = f ? a : u, d = !!i.prerelease.length;
    if (!!s.prerelease.length && !d)
      return !s.patch && !s.minor ? "major" : i.patch ? "patch" : i.minor ? "minor" : "major";
    const g = d ? "pre" : "";
    return u.major !== a.major ? g + "major" : u.minor !== a.minor ? g + "minor" : u.patch !== a.patch ? g + "patch" : "prerelease";
  }, Dn;
}
var Ln, _a;
function ol() {
  if (_a) return Ln;
  _a = 1;
  const e = ve();
  return Ln = (o, n) => new e(o, n).major, Ln;
}
var An, Sa;
function al() {
  if (Sa) return An;
  Sa = 1;
  const e = ve();
  return An = (o, n) => new e(o, n).minor, An;
}
var Fn, wa;
function cl() {
  if (wa) return Fn;
  wa = 1;
  const e = ve();
  return Fn = (o, n) => new e(o, n).patch, Fn;
}
var qn, $a;
function ul() {
  if ($a) return qn;
  $a = 1;
  const e = He();
  return qn = (o, n) => {
    const u = e(o, n);
    return u && u.prerelease.length ? u.prerelease : null;
  }, qn;
}
var kn, ba;
function Oe() {
  if (ba) return kn;
  ba = 1;
  const e = ve();
  return kn = (o, n, u) => new e(o, u).compare(new e(n, u)), kn;
}
var jn, Ra;
function fl() {
  if (Ra) return jn;
  Ra = 1;
  const e = Oe();
  return jn = (o, n, u) => e(n, o, u), jn;
}
var Mn, Oa;
function ll() {
  if (Oa) return Mn;
  Oa = 1;
  const e = Oe();
  return Mn = (o, n) => e(o, n, !0), Mn;
}
var xn, Ia;
function Fi() {
  if (Ia) return xn;
  Ia = 1;
  const e = ve();
  return xn = (o, n, u) => {
    const a = new e(o, u), r = new e(n, u);
    return a.compare(r) || a.compareBuild(r);
  }, xn;
}
var Un, Na;
function dl() {
  if (Na) return Un;
  Na = 1;
  const e = Fi();
  return Un = (o, n) => o.sort((u, a) => e(u, a, n)), Un;
}
var zn, Pa;
function hl() {
  if (Pa) return zn;
  Pa = 1;
  const e = Fi();
  return zn = (o, n) => o.sort((u, a) => e(a, u, n)), zn;
}
var Vn, Ta;
function $r() {
  if (Ta) return Vn;
  Ta = 1;
  const e = Oe();
  return Vn = (o, n, u) => e(o, n, u) > 0, Vn;
}
var Gn, Ca;
function qi() {
  if (Ca) return Gn;
  Ca = 1;
  const e = Oe();
  return Gn = (o, n, u) => e(o, n, u) < 0, Gn;
}
var Bn, Da;
function kc() {
  if (Da) return Bn;
  Da = 1;
  const e = Oe();
  return Bn = (o, n, u) => e(o, n, u) === 0, Bn;
}
var Hn, La;
function jc() {
  if (La) return Hn;
  La = 1;
  const e = Oe();
  return Hn = (o, n, u) => e(o, n, u) !== 0, Hn;
}
var Wn, Aa;
function ki() {
  if (Aa) return Wn;
  Aa = 1;
  const e = Oe();
  return Wn = (o, n, u) => e(o, n, u) >= 0, Wn;
}
var Kn, Fa;
function ji() {
  if (Fa) return Kn;
  Fa = 1;
  const e = Oe();
  return Kn = (o, n, u) => e(o, n, u) <= 0, Kn;
}
var Xn, qa;
function Mc() {
  if (qa) return Xn;
  qa = 1;
  const e = kc(), t = jc(), o = $r(), n = ki(), u = qi(), a = ji();
  return Xn = (f, i, s, d) => {
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
  }, Xn;
}
var Zn, ka;
function ml() {
  if (ka) return Zn;
  ka = 1;
  const e = ve(), t = He(), { safeRe: o, t: n } = st();
  return Zn = (a, r) => {
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
      let w;
      for (; (w = p.exec(a)) && (!f || f.index + f[0].length !== a.length); )
        (!f || w.index + w[0].length !== f.index + f[0].length) && (f = w), p.lastIndex = w.index + w[1].length + w[2].length;
      p.lastIndex = -1;
    }
    if (f === null)
      return null;
    const i = f[2], s = f[3] || "0", d = f[4] || "0", E = r.includePrerelease && f[5] ? `-${f[5]}` : "", g = r.includePrerelease && f[6] ? `+${f[6]}` : "";
    return t(`${i}.${s}.${d}${E}${g}`, r);
  }, Zn;
}
var Jn, ja;
function pl() {
  if (ja) return Jn;
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
  return Jn = e, Jn;
}
var Yn, Ma;
function Ie() {
  if (Ma) return Yn;
  Ma = 1;
  const e = /\s+/g;
  class t {
    constructor(V, Z) {
      if (Z = u(Z), V instanceof t)
        return V.loose === !!Z.loose && V.includePrerelease === !!Z.includePrerelease ? V : new t(V.raw, Z);
      if (V instanceof a)
        return this.raw = V.value, this.set = [[V]], this.formatted = void 0, this;
      if (this.options = Z, this.loose = !!Z.loose, this.includePrerelease = !!Z.includePrerelease, this.raw = V.trim().replace(e, " "), this.set = this.raw.split("||").map((B) => this.parseRange(B.trim())).filter((B) => B.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const B = this.set[0];
        if (this.set = this.set.filter((A) => !b(A[0])), this.set.length === 0)
          this.set = [B];
        else if (this.set.length > 1) {
          for (const A of this.set)
            if (A.length === 1 && l(A[0])) {
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
      const x = this.options.loose, D = x ? i[s.HYPHENRANGELOOSE] : i[s.HYPHENRANGE];
      V = V.replace(D, H(this.options.includePrerelease)), r("hyphen replace", V), V = V.replace(i[s.COMPARATORTRIM], d), r("comparator trim", V), V = V.replace(i[s.TILDETRIM], E), r("tilde trim", V), V = V.replace(i[s.CARETTRIM], g), r("caret trim", V);
      let C = V.split(" ").map((N) => c(N, this.options)).join(" ").split(/\s+/).map((N) => k(N, this.options));
      x && (C = C.filter((N) => (r("loose invalid filter", N, this.options), !!N.match(i[s.COMPARATORLOOSE])))), r("range list", C);
      const j = /* @__PURE__ */ new Map(), L = C.map((N) => new a(N, this.options));
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
          V = new f(V, this.options);
        } catch {
          return !1;
        }
      for (let Z = 0; Z < this.set.length; Z++)
        if (U(this.set[Z], V, this.options))
          return !0;
      return !1;
    }
  }
  Yn = t;
  const o = pl(), n = new o(), u = Ai(), a = br(), r = wr(), f = ve(), {
    safeRe: i,
    t: s,
    comparatorTrimReplace: d,
    tildeTrimReplace: E,
    caretTrimReplace: g
  } = st(), { FLAG_INCLUDE_PRERELEASE: p, FLAG_LOOSE: w } = Sr(), b = (z) => z.value === "<0.0.0-0", l = (z) => z.value === "", h = (z, V) => {
    let Z = !0;
    const B = z.slice();
    let A = B.pop();
    for (; Z && B.length; )
      Z = B.every((x) => A.intersects(x, V)), A = B.pop();
    return Z;
  }, c = (z, V) => (r("comp", z, V), z = _(z, V), r("caret", z), z = y(z, V), r("tildes", z), z = $(z, V), r("xrange", z), z = T(z, V), r("stars", z), z), m = (z) => !z || z.toLowerCase() === "x" || z === "*", y = (z, V) => z.trim().split(/\s+/).map((Z) => v(Z, V)).join(" "), v = (z, V) => {
    const Z = V.loose ? i[s.TILDELOOSE] : i[s.TILDE];
    return z.replace(Z, (B, A, x, D, C) => {
      r("tilde", z, B, A, x, D, C);
      let j;
      return m(A) ? j = "" : m(x) ? j = `>=${A}.0.0 <${+A + 1}.0.0-0` : m(D) ? j = `>=${A}.${x}.0 <${A}.${+x + 1}.0-0` : C ? (r("replaceTilde pr", C), j = `>=${A}.${x}.${D}-${C} <${A}.${+x + 1}.0-0`) : j = `>=${A}.${x}.${D} <${A}.${+x + 1}.0-0`, r("tilde return", j), j;
    });
  }, _ = (z, V) => z.trim().split(/\s+/).map((Z) => S(Z, V)).join(" "), S = (z, V) => {
    r("caret", z, V);
    const Z = V.loose ? i[s.CARETLOOSE] : i[s.CARET], B = V.includePrerelease ? "-0" : "";
    return z.replace(Z, (A, x, D, C, j) => {
      r("caret", z, A, x, D, C, j);
      let L;
      return m(x) ? L = "" : m(D) ? L = `>=${x}.0.0${B} <${+x + 1}.0.0-0` : m(C) ? x === "0" ? L = `>=${x}.${D}.0${B} <${x}.${+D + 1}.0-0` : L = `>=${x}.${D}.0${B} <${+x + 1}.0.0-0` : j ? (r("replaceCaret pr", j), x === "0" ? D === "0" ? L = `>=${x}.${D}.${C}-${j} <${x}.${D}.${+C + 1}-0` : L = `>=${x}.${D}.${C}-${j} <${x}.${+D + 1}.0-0` : L = `>=${x}.${D}.${C}-${j} <${+x + 1}.0.0-0`) : (r("no pr"), x === "0" ? D === "0" ? L = `>=${x}.${D}.${C}${B} <${x}.${D}.${+C + 1}-0` : L = `>=${x}.${D}.${C}${B} <${x}.${+D + 1}.0-0` : L = `>=${x}.${D}.${C} <${+x + 1}.0.0-0`), r("caret return", L), L;
    });
  }, $ = (z, V) => (r("replaceXRanges", z, V), z.split(/\s+/).map((Z) => O(Z, V)).join(" ")), O = (z, V) => {
    z = z.trim();
    const Z = V.loose ? i[s.XRANGELOOSE] : i[s.XRANGE];
    return z.replace(Z, (B, A, x, D, C, j) => {
      r("xRange", z, B, A, x, D, C, j);
      const L = m(x), R = L || m(D), N = R || m(C), I = N;
      return A === "=" && I && (A = ""), j = V.includePrerelease ? "-0" : "", L ? A === ">" || A === "<" ? B = "<0.0.0-0" : B = "*" : A && I ? (R && (D = 0), C = 0, A === ">" ? (A = ">=", R ? (x = +x + 1, D = 0, C = 0) : (D = +D + 1, C = 0)) : A === "<=" && (A = "<", R ? x = +x + 1 : D = +D + 1), A === "<" && (j = "-0"), B = `${A + x}.${D}.${C}${j}`) : R ? B = `>=${x}.0.0${j} <${+x + 1}.0.0-0` : N && (B = `>=${x}.${D}.0${j} <${x}.${+D + 1}.0-0`), r("xRange return", B), B;
    });
  }, T = (z, V) => (r("replaceStars", z, V), z.trim().replace(i[s.STAR], "")), k = (z, V) => (r("replaceGTE0", z, V), z.trim().replace(i[V.includePrerelease ? s.GTE0PRE : s.GTE0], "")), H = (z) => (V, Z, B, A, x, D, C, j, L, R, N, I) => (m(B) ? Z = "" : m(A) ? Z = `>=${B}.0.0${z ? "-0" : ""}` : m(x) ? Z = `>=${B}.${A}.0${z ? "-0" : ""}` : D ? Z = `>=${Z}` : Z = `>=${Z}${z ? "-0" : ""}`, m(L) ? j = "" : m(R) ? j = `<${+L + 1}.0.0-0` : m(N) ? j = `<${L}.${+R + 1}.0-0` : I ? j = `<=${L}.${R}.${N}-${I}` : z ? j = `<${L}.${R}.${+N + 1}-0` : j = `<=${j}`, `${Z} ${j}`.trim()), U = (z, V, Z) => {
    for (let B = 0; B < z.length; B++)
      if (!z[B].test(V))
        return !1;
    if (V.prerelease.length && !Z.includePrerelease) {
      for (let B = 0; B < z.length; B++)
        if (r(z[B].semver), z[B].semver !== a.ANY && z[B].semver.prerelease.length > 0) {
          const A = z[B].semver;
          if (A.major === V.major && A.minor === V.minor && A.patch === V.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Yn;
}
var Qn, xa;
function br() {
  if (xa) return Qn;
  xa = 1;
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
      const E = this.options.loose ? n[u.COMPARATORLOOSE] : n[u.COMPARATOR], g = d.match(E);
      if (!g)
        throw new TypeError(`Invalid comparator: ${d}`);
      this.operator = g[1] !== void 0 ? g[1] : "", this.operator === "=" && (this.operator = ""), g[2] ? this.semver = new f(g[2], this.options.loose) : this.semver = e;
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
    intersects(d, E) {
      if (!(d instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new i(d.value, E).test(this.value) : d.operator === "" ? d.value === "" ? !0 : new i(this.value, E).test(d.semver) : (E = o(E), E.includePrerelease && (this.value === "<0.0.0-0" || d.value === "<0.0.0-0") || !E.includePrerelease && (this.value.startsWith("<0.0.0") || d.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && d.operator.startsWith(">") || this.operator.startsWith("<") && d.operator.startsWith("<") || this.semver.version === d.semver.version && this.operator.includes("=") && d.operator.includes("=") || a(this.semver, "<", d.semver, E) && this.operator.startsWith(">") && d.operator.startsWith("<") || a(this.semver, ">", d.semver, E) && this.operator.startsWith("<") && d.operator.startsWith(">")));
    }
  }
  Qn = t;
  const o = Ai(), { safeRe: n, t: u } = st(), a = Mc(), r = wr(), f = ve(), i = Ie();
  return Qn;
}
var ei, Ua;
function Rr() {
  if (Ua) return ei;
  Ua = 1;
  const e = Ie();
  return ei = (o, n, u) => {
    try {
      n = new e(n, u);
    } catch {
      return !1;
    }
    return n.test(o);
  }, ei;
}
var ti, za;
function yl() {
  if (za) return ti;
  za = 1;
  const e = Ie();
  return ti = (o, n) => new e(o, n).set.map((u) => u.map((a) => a.value).join(" ").trim().split(" ")), ti;
}
var ri, Va;
function vl() {
  if (Va) return ri;
  Va = 1;
  const e = ve(), t = Ie();
  return ri = (n, u, a) => {
    let r = null, f = null, i = null;
    try {
      i = new t(u, a);
    } catch {
      return null;
    }
    return n.forEach((s) => {
      i.test(s) && (!r || f.compare(s) === -1) && (r = s, f = new e(r, a));
    }), r;
  }, ri;
}
var ni, Ga;
function El() {
  if (Ga) return ni;
  Ga = 1;
  const e = ve(), t = Ie();
  return ni = (n, u, a) => {
    let r = null, f = null, i = null;
    try {
      i = new t(u, a);
    } catch {
      return null;
    }
    return n.forEach((s) => {
      i.test(s) && (!r || f.compare(s) === 1) && (r = s, f = new e(r, a));
    }), r;
  }, ni;
}
var ii, Ba;
function gl() {
  if (Ba) return ii;
  Ba = 1;
  const e = ve(), t = Ie(), o = $r();
  return ii = (u, a) => {
    u = new t(u, a);
    let r = new e("0.0.0");
    if (u.test(r) || (r = new e("0.0.0-0"), u.test(r)))
      return r;
    r = null;
    for (let f = 0; f < u.set.length; ++f) {
      const i = u.set[f];
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
    return r && u.test(r) ? r : null;
  }, ii;
}
var si, Ha;
function _l() {
  if (Ha) return si;
  Ha = 1;
  const e = Ie();
  return si = (o, n) => {
    try {
      return new e(o, n).range || "*";
    } catch {
      return null;
    }
  }, si;
}
var oi, Wa;
function Mi() {
  if (Wa) return oi;
  Wa = 1;
  const e = ve(), t = br(), { ANY: o } = t, n = Ie(), u = Rr(), a = $r(), r = qi(), f = ji(), i = ki();
  return oi = (d, E, g, p) => {
    d = new e(d, p), E = new n(E, p);
    let w, b, l, h, c;
    switch (g) {
      case ">":
        w = a, b = f, l = r, h = ">", c = ">=";
        break;
      case "<":
        w = r, b = i, l = a, h = "<", c = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (u(d, E, p))
      return !1;
    for (let m = 0; m < E.set.length; ++m) {
      const y = E.set[m];
      let v = null, _ = null;
      if (y.forEach((S) => {
        S.semver === o && (S = new t(">=0.0.0")), v = v || S, _ = _ || S, w(S.semver, v.semver, p) ? v = S : l(S.semver, _.semver, p) && (_ = S);
      }), v.operator === h || v.operator === c || (!_.operator || _.operator === h) && b(d, _.semver))
        return !1;
      if (_.operator === c && l(d, _.semver))
        return !1;
    }
    return !0;
  }, oi;
}
var ai, Ka;
function Sl() {
  if (Ka) return ai;
  Ka = 1;
  const e = Mi();
  return ai = (o, n, u) => e(o, n, ">", u), ai;
}
var ci, Xa;
function wl() {
  if (Xa) return ci;
  Xa = 1;
  const e = Mi();
  return ci = (o, n, u) => e(o, n, "<", u), ci;
}
var ui, Za;
function $l() {
  if (Za) return ui;
  Za = 1;
  const e = Ie();
  return ui = (o, n, u) => (o = new e(o, u), n = new e(n, u), o.intersects(n, u)), ui;
}
var fi, Ja;
function bl() {
  if (Ja) return fi;
  Ja = 1;
  const e = Rr(), t = Oe();
  return fi = (o, n, u) => {
    const a = [];
    let r = null, f = null;
    const i = o.sort((g, p) => t(g, p, u));
    for (const g of i)
      e(g, n, u) ? (f = g, r || (r = g)) : (f && a.push([r, f]), f = null, r = null);
    r && a.push([r, null]);
    const s = [];
    for (const [g, p] of a)
      g === p ? s.push(g) : !p && g === i[0] ? s.push("*") : p ? g === i[0] ? s.push(`<=${p}`) : s.push(`${g} - ${p}`) : s.push(`>=${g}`);
    const d = s.join(" || "), E = typeof n.raw == "string" ? n.raw : String(n);
    return d.length < E.length ? d : n;
  }, fi;
}
var li, Ya;
function Rl() {
  if (Ya) return li;
  Ya = 1;
  const e = Ie(), t = br(), { ANY: o } = t, n = Rr(), u = Oe(), a = (E, g, p = {}) => {
    if (E === g)
      return !0;
    E = new e(E, p), g = new e(g, p);
    let w = !1;
    e: for (const b of E.set) {
      for (const l of g.set) {
        const h = i(b, l, p);
        if (w = w || h !== null, h)
          continue e;
      }
      if (w)
        return !1;
    }
    return !0;
  }, r = [new t(">=0.0.0-0")], f = [new t(">=0.0.0")], i = (E, g, p) => {
    if (E === g)
      return !0;
    if (E.length === 1 && E[0].semver === o) {
      if (g.length === 1 && g[0].semver === o)
        return !0;
      p.includePrerelease ? E = r : E = f;
    }
    if (g.length === 1 && g[0].semver === o) {
      if (p.includePrerelease)
        return !0;
      g = f;
    }
    const w = /* @__PURE__ */ new Set();
    let b, l;
    for (const $ of E)
      $.operator === ">" || $.operator === ">=" ? b = s(b, $, p) : $.operator === "<" || $.operator === "<=" ? l = d(l, $, p) : w.add($.semver);
    if (w.size > 1)
      return null;
    let h;
    if (b && l) {
      if (h = u(b.semver, l.semver, p), h > 0)
        return null;
      if (h === 0 && (b.operator !== ">=" || l.operator !== "<="))
        return null;
    }
    for (const $ of w) {
      if (b && !n($, String(b), p) || l && !n($, String(l), p))
        return null;
      for (const O of g)
        if (!n($, String(O), p))
          return !1;
      return !0;
    }
    let c, m, y, v, _ = l && !p.includePrerelease && l.semver.prerelease.length ? l.semver : !1, S = b && !p.includePrerelease && b.semver.prerelease.length ? b.semver : !1;
    _ && _.prerelease.length === 1 && l.operator === "<" && _.prerelease[0] === 0 && (_ = !1);
    for (const $ of g) {
      if (v = v || $.operator === ">" || $.operator === ">=", y = y || $.operator === "<" || $.operator === "<=", b) {
        if (S && $.semver.prerelease && $.semver.prerelease.length && $.semver.major === S.major && $.semver.minor === S.minor && $.semver.patch === S.patch && (S = !1), $.operator === ">" || $.operator === ">=") {
          if (c = s(b, $, p), c === $ && c !== b)
            return !1;
        } else if (b.operator === ">=" && !n(b.semver, String($), p))
          return !1;
      }
      if (l) {
        if (_ && $.semver.prerelease && $.semver.prerelease.length && $.semver.major === _.major && $.semver.minor === _.minor && $.semver.patch === _.patch && (_ = !1), $.operator === "<" || $.operator === "<=") {
          if (m = d(l, $, p), m === $ && m !== l)
            return !1;
        } else if (l.operator === "<=" && !n(l.semver, String($), p))
          return !1;
      }
      if (!$.operator && (l || b) && h !== 0)
        return !1;
    }
    return !(b && y && !l && h !== 0 || l && v && !b && h !== 0 || S || _);
  }, s = (E, g, p) => {
    if (!E)
      return g;
    const w = u(E.semver, g.semver, p);
    return w > 0 ? E : w < 0 || g.operator === ">" && E.operator === ">=" ? g : E;
  }, d = (E, g, p) => {
    if (!E)
      return g;
    const w = u(E.semver, g.semver, p);
    return w < 0 ? E : w > 0 || g.operator === "<" && E.operator === "<=" ? g : E;
  };
  return li = a, li;
}
var di, Qa;
function Ol() {
  if (Qa) return di;
  Qa = 1;
  const e = st(), t = Sr(), o = ve(), n = qc(), u = He(), a = rl(), r = nl(), f = il(), i = sl(), s = ol(), d = al(), E = cl(), g = ul(), p = Oe(), w = fl(), b = ll(), l = Fi(), h = dl(), c = hl(), m = $r(), y = qi(), v = kc(), _ = jc(), S = ki(), $ = ji(), O = Mc(), T = ml(), k = br(), H = Ie(), U = Rr(), z = yl(), V = vl(), Z = El(), B = gl(), A = _l(), x = Mi(), D = Sl(), C = wl(), j = $l(), L = bl(), R = Rl();
  return di = {
    parse: u,
    valid: a,
    clean: r,
    inc: f,
    diff: i,
    major: s,
    minor: d,
    patch: E,
    prerelease: g,
    compare: p,
    rcompare: w,
    compareLoose: b,
    compareBuild: l,
    sort: h,
    rsort: c,
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
    SemVer: o,
    re: e.re,
    src: e.src,
    tokens: e.t,
    SEMVER_SPEC_VERSION: t.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: t.RELEASE_TYPES,
    compareIdentifiers: n.compareIdentifiers,
    rcompareIdentifiers: n.rcompareIdentifiers
  }, di;
}
var Ye = { exports: {} }, lr = { exports: {} }, ec;
function Il() {
  if (ec) return lr.exports;
  ec = 1;
  const e = (t, o) => {
    for (const n of Reflect.ownKeys(o))
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
    return t;
  };
  return lr.exports = e, lr.exports.default = e, lr.exports;
}
var tc;
function Nl() {
  if (tc) return Ye.exports;
  tc = 1;
  const e = Il(), t = /* @__PURE__ */ new WeakMap(), o = (n, u = {}) => {
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
  return Ye.exports = o, Ye.exports.default = o, Ye.exports.callCount = (n) => {
    if (!t.has(n))
      throw new Error(`The given function \`${n.name}\` is not wrapped by the \`onetime\` package`);
    return t.get(n);
  }, Ye.exports;
}
var dr = tt.exports, rc;
function Pl() {
  return rc || (rc = 1, function(e, t) {
    var o = dr && dr.__classPrivateFieldSet || function(B, A, x, D, C) {
      if (D === "m") throw new TypeError("Private method is not writable");
      if (D === "a" && !C) throw new TypeError("Private accessor was defined without a setter");
      if (typeof A == "function" ? B !== A || !C : !A.has(B)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return D === "a" ? C.call(B, x) : C ? C.value = x : A.set(B, x), x;
    }, n = dr && dr.__classPrivateFieldGet || function(B, A, x, D) {
      if (x === "a" && !D) throw new TypeError("Private accessor was defined without a getter");
      if (typeof A == "function" ? B !== A || !D : !A.has(B)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return x === "m" ? D : x === "a" ? D.call(B) : D ? D.value : A.get(B);
    }, u, a, r, f, i, s;
    Object.defineProperty(t, "__esModule", { value: !0 });
    const d = Ii, E = Ge, g = ce, p = $c, w = wc, b = Jc, l = Iu(), h = Au(), c = Fu(), m = Vu(), y = Fc(), v = Qf(), _ = tl(), S = Ol(), $ = Nl(), O = "aes-256-cbc", T = () => /* @__PURE__ */ Object.create(null), k = (B) => B != null;
    let H = "";
    try {
      delete require.cache[__filename], H = g.dirname((a = (u = e.parent) === null || u === void 0 ? void 0 : u.filename) !== null && a !== void 0 ? a : ".");
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
        r.set(this, void 0), f.set(this, void 0), i.set(this, void 0), s.set(this, {}), this._deserialize = (N) => JSON.parse(N), this._serialize = (N) => JSON.stringify(N, void 0, "	");
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
          D.cwd = c(D.projectName, { suffix: D.projectSuffix }).config;
        }
        if (o(this, i, D, "f"), D.schema) {
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
          o(this, r, N.compile(I), "f");
          for (const [K, W] of Object.entries(D.schema))
            W?.default && (n(this, s, "f")[K] = W.default);
        }
        D.defaults && o(this, s, {
          ...n(this, s, "f"),
          ...D.defaults
        }, "f"), D.serialize && (this._serialize = D.serialize), D.deserialize && (this._deserialize = D.deserialize), this.events = new b.EventEmitter(), o(this, f, D.encryptionKey, "f");
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
        if (n(this, i, "f").accessPropertiesByDotNotation)
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
          U(j, L), n(this, i, "f").accessPropertiesByDotNotation ? l.set(D, j, L) : D[j] = L;
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
        return n(this, i, "f").accessPropertiesByDotNotation ? l.has(this.store, A) : A in this.store;
      }
      /**
      		    Reset items to their default values, as defined by the `defaults` or `schema` option.
      
      		    @see `clear()` to reset all items.
      
      		    @param keys - The keys of the items to reset.
      		    */
      reset(...A) {
        for (const x of A)
          k(n(this, s, "f")[x]) && this.set(x, n(this, s, "f")[x]);
      }
      /**
      		    Delete an item.
      
      		    @param key - The key of the item to delete.
      		    */
      delete(A) {
        const { store: x } = this;
        n(this, i, "f").accessPropertiesByDotNotation ? l.delete(x, A) : delete x[A], this.store = x;
      }
      /**
      		    Delete all items.
      
      		    This resets known items to their default values, if defined by the `defaults` or `schema` option.
      		    */
      clear() {
        this.store = T();
        for (const A of Object.keys(n(this, s, "f")))
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
          const A = E.readFileSync(this.path, n(this, f, "f") ? null : "utf8"), x = this._encryptData(A), D = this._deserialize(x);
          return this._validate(D), Object.assign(T(), D);
        } catch (A) {
          if (A?.code === "ENOENT")
            return this._ensureDirectory(), T();
          if (n(this, i, "f").clearInvalidConfig && A.name === "SyntaxError")
            return T();
          throw A;
        }
      }
      set store(A) {
        this._ensureDirectory(), this._validate(A), this._write(A), this.events.emit("change");
      }
      *[(r = /* @__PURE__ */ new WeakMap(), f = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap(), s = /* @__PURE__ */ new WeakMap(), Symbol.iterator)]() {
        for (const [A, x] of Object.entries(this.store))
          yield [A, x];
      }
      _encryptData(A) {
        if (!n(this, f, "f"))
          return A.toString();
        try {
          if (n(this, f, "f"))
            try {
              if (A.slice(16, 17).toString() === ":") {
                const x = A.slice(0, 16), D = p.pbkdf2Sync(n(this, f, "f"), x.toString(), 1e4, 32, "sha512"), C = p.createDecipheriv(O, D, x);
                A = Buffer.concat([C.update(Buffer.from(A.slice(17))), C.final()]).toString("utf8");
              } else {
                const x = p.createDecipher(O, n(this, f, "f"));
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
        if (n(this, f, "f")) {
          const D = p.randomBytes(16), C = p.pbkdf2Sync(n(this, f, "f"), D.toString(), 1e4, 32, "sha512"), j = p.createCipheriv(O, C, D);
          x = Buffer.concat([D, Buffer.from(":"), j.update(Buffer.from(x)), j.final()]);
        }
        if (process.env.SNAP)
          E.writeFileSync(this.path, x, { mode: n(this, i, "f").configFileMode });
        else
          try {
            m.writeFileSync(this.path, x, { mode: n(this, i, "f").configFileMode });
          } catch (D) {
            if (D?.code === "EXDEV") {
              E.writeFileSync(this.path, x, { mode: n(this, i, "f").configFileMode });
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
        return typeof A == "object" && Object.keys(A)[0] === z ? !0 : typeof A != "string" ? !1 : n(this, i, "f").accessPropertiesByDotNotation ? !!A.startsWith(`${z}.`) : !1;
      }
      _isVersionInRangeFormat(A) {
        return S.clean(A) === null;
      }
      _shouldPerformMigration(A, x, D) {
        return this._isVersionInRangeFormat(A) ? x !== "0.0.0" && S.satisfies(x, A) ? !1 : S.satisfies(D, A) : !(S.lte(A, x) || S.gt(A, D));
      }
      _get(A, x) {
        return l.get(this.store, A, x);
      }
      _set(A, x) {
        const { store: D } = this;
        l.set(D, A, x), this.store = D;
      }
    }
    t.default = Z, e.exports = Z, e.exports.default = Z;
  }(tt, tt.exports)), tt.exports;
}
var hi, nc;
function Tl() {
  if (nc) return hi;
  nc = 1;
  const e = ce, { app: t, ipcMain: o, ipcRenderer: n, shell: u } = Bc, a = Pl();
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
      let E, g;
      if (n) {
        const p = n.sendSync("electron-store-get-data");
        if (!p)
          throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
        ({ defaultCwd: E, appVersion: g } = p);
      } else o && t && ({ defaultCwd: E, appVersion: g } = f());
      d = {
        name: "config",
        ...d
      }, d.projectVersion || (d.projectVersion = g), d.cwd ? d.cwd = e.isAbsolute(d.cwd) ? d.cwd : e.join(E, d.cwd) : d.cwd = E, d.configName = d.name, delete d.name, super(d);
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
  return hi = i, hi;
}
var Cl = /* @__PURE__ */ Tl();
const ic = /* @__PURE__ */ Rc(Cl);
var xe = { exports: {} }, mi, sc;
function xc() {
  return sc || (sc = 1, mi = {
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
  }), mi;
}
var pi = {}, oc;
function xi() {
  return oc || (oc = 1, function(e) {
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
  }(pi)), pi;
}
var yi, ac;
function Dl() {
  if (ac) return yi;
  ac = 1;
  const e = Ge, t = ce, o = xc(), n = xi(), u = typeof process == "object" && process.platform === "win32", a = (i) => typeof i == "object" && i !== null, r = new Uint32Array(256).map((i, s) => {
    for (let d = 0; d < 8; d++)
      s & 1 ? s = 3988292384 ^ s >>> 1 : s >>>= 1;
    return s >>> 0;
  });
  function f(i) {
    this.sep = t.sep, this.fs = e, a(i) && a(i.fs) && typeof i.fs.statSync == "function" && (this.fs = i.fs);
  }
  return yi = f, f.prototype.makeDir = function(i) {
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
  }, f.prototype.writeFileTo = function(i, s, d, E) {
    const g = this;
    if (g.fs.existsSync(i)) {
      if (!d) return !1;
      var p = g.fs.statSync(i);
      if (p.isDirectory())
        return !1;
    }
    var w = t.dirname(i);
    g.fs.existsSync(w) || g.makeDir(w);
    var b;
    try {
      b = g.fs.openSync(i, "w", 438);
    } catch {
      g.fs.chmodSync(i, 438), b = g.fs.openSync(i, "w", 438);
    }
    if (b)
      try {
        g.fs.writeSync(b, s, 0, s.length, 0);
      } finally {
        g.fs.closeSync(b);
      }
    return g.fs.chmodSync(i, E || 438), !0;
  }, f.prototype.writeFileToAsync = function(i, s, d, E, g) {
    typeof E == "function" && (g = E, E = void 0);
    const p = this;
    p.fs.exists(i, function(w) {
      if (w && !d) return g(!1);
      p.fs.stat(i, function(b, l) {
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
  }, f.prototype.findFiles = function(i) {
    const s = this;
    function d(E, g, p) {
      let w = [];
      return s.fs.readdirSync(E).forEach(function(b) {
        const l = t.join(E, b), h = s.fs.statSync(l);
        w.push(t.normalize(l) + (h.isDirectory() ? s.sep : "")), h.isDirectory() && p && (w = w.concat(d(l, g, p)));
      }), w;
    }
    return d(i, void 0, !0);
  }, f.prototype.findFilesAsync = function(i, s) {
    const d = this;
    let E = [];
    d.fs.readdir(i, function(g, p) {
      if (g) return s(g);
      let w = p.length;
      if (!w) return s(null, E);
      p.forEach(function(b) {
        b = t.join(i, b), d.fs.stat(b, function(l, h) {
          if (l) return s(l);
          h && (E.push(t.normalize(b) + (h.isDirectory() ? d.sep : "")), h.isDirectory() ? d.findFilesAsync(b, function(c, m) {
            if (c) return s(c);
            E = E.concat(m), --w || s(null, E);
          }) : --w || s(null, E));
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
    for (let E = 0; E < s; ) d = f.crc32update(d, i[E++]);
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
    for (let E = d - 1; E >= 0; E--)
      if (s(i[E], E, i))
        return i[E];
  }, f.sanitize = function(i, s) {
    i = t.resolve(t.normalize(i));
    for (var d = s.split("/"), E = 0, g = d.length; E < g; E++) {
      var p = t.normalize(t.join(i, d.slice(E, g).join(t.sep)));
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
  }, f.isWin = u, f.crcTable = r, yi;
}
var vi, cc;
function Ll() {
  if (cc) return vi;
  cc = 1;
  const e = ce;
  return vi = function(t, { fs: o }) {
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
  }, vi;
}
var Ei, uc;
function Al() {
  return uc || (uc = 1, Ei = {
    efs: !0,
    encode: (e) => Buffer.from(e, "utf8"),
    decode: (e) => e.toString("utf8")
  }), Ei;
}
var fc;
function ot() {
  return fc || (fc = 1, xe.exports = Dl(), xe.exports.Constants = xc(), xe.exports.Errors = xi(), xe.exports.FileAttr = Ll(), xe.exports.decoder = Al()), xe.exports;
}
var hr = {}, gi, lc;
function Fl() {
  if (lc) return gi;
  lc = 1;
  var e = ot(), t = e.Constants;
  return gi = function() {
    var o = 20, n = 10, u = 0, a = 0, r = 0, f = 0, i = 0, s = 0, d = 0, E = 0, g = 0, p = 0, w = 0, b = 0, l = 0;
    o |= e.isWin ? 2560 : 768, u |= t.FLG_EFS;
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
        return u;
      },
      set flags(y) {
        u = y;
      },
      get flags_efs() {
        return (u & t.FLG_EFS) > 0;
      },
      set flags_efs(y) {
        y ? u |= t.FLG_EFS : u &= ~t.FLG_EFS;
      },
      get flags_desc() {
        return (u & t.FLG_DESC) > 0;
      },
      set flags_desc(y) {
        y ? u |= t.FLG_DESC : u &= ~t.FLG_DESC;
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
        return f;
      },
      set crc(y) {
        f = c(y);
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
        return b;
      },
      set attr(y) {
        b = c(y);
      },
      // get Unix file permissions
      get fileAttr() {
        return (b || 0) >> 16 & 4095;
      },
      get offset() {
        return l;
      },
      set offset(y) {
        l = c(y);
      },
      get encrypted() {
        return (u & t.FLG_ENC) === t.FLG_ENC;
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
        o = y.readUInt16LE(t.CENVEM), n = y.readUInt16LE(t.CENVER), u = y.readUInt16LE(t.CENFLG), a = y.readUInt16LE(t.CENHOW), r = y.readUInt32LE(t.CENTIM), f = y.readUInt32LE(t.CENCRC), i = y.readUInt32LE(t.CENSIZ), s = y.readUInt32LE(t.CENLEN), d = y.readUInt16LE(t.CENNAM), E = y.readUInt16LE(t.CENEXT), g = y.readUInt16LE(t.CENCOM), p = y.readUInt16LE(t.CENDSK), w = y.readUInt16LE(t.CENATT), b = y.readUInt32LE(t.CENATX), l = y.readUInt32LE(t.CENOFF);
      },
      localHeaderToBinary: function() {
        var y = Buffer.alloc(t.LOCHDR);
        return y.writeUInt32LE(t.LOCSIG, 0), y.writeUInt16LE(n, t.LOCVER), y.writeUInt16LE(u, t.LOCFLG), y.writeUInt16LE(a, t.LOCHOW), y.writeUInt32LE(r, t.LOCTIM), y.writeUInt32LE(f, t.LOCCRC), y.writeUInt32LE(i, t.LOCSIZ), y.writeUInt32LE(s, t.LOCLEN), y.writeUInt16LE(d, t.LOCNAM), y.writeUInt16LE(h.extraLen, t.LOCEXT), y;
      },
      centralHeaderToBinary: function() {
        var y = Buffer.alloc(t.CENHDR + d + E + g);
        return y.writeUInt32LE(t.CENSIG, 0), y.writeUInt16LE(o, t.CENVEM), y.writeUInt16LE(n, t.CENVER), y.writeUInt16LE(u, t.CENFLG), y.writeUInt16LE(a, t.CENHOW), y.writeUInt32LE(r, t.CENTIM), y.writeUInt32LE(f, t.CENCRC), y.writeUInt32LE(i, t.CENSIZ), y.writeUInt32LE(s, t.CENLEN), y.writeUInt16LE(d, t.CENNAM), y.writeUInt16LE(E, t.CENEXT), y.writeUInt16LE(g, t.CENCOM), y.writeUInt16LE(p, t.CENDSK), y.writeUInt16LE(w, t.CENATT), y.writeUInt32LE(b, t.CENATX), y.writeUInt32LE(l, t.CENOFF), y;
      },
      toJSON: function() {
        const y = function(v) {
          return v + " bytes";
        };
        return {
          made: o,
          version: n,
          flags: u,
          method: e.methodToString(a),
          time: this.time,
          crc: "0x" + f.toString(16).toUpperCase(),
          compressedSize: y(i),
          size: y(s),
          fileNameLength: y(d),
          extraLength: y(E),
          commentLength: y(g),
          diskNumStart: p,
          inAttr: w,
          attr: b,
          offset: l,
          centralHeaderSize: y(t.CENHDR + d + E + g)
        };
      },
      toString: function() {
        return JSON.stringify(this.toJSON(), null, "	");
      }
    };
  }, gi;
}
var _i, dc;
function ql() {
  if (dc) return _i;
  dc = 1;
  var e = ot(), t = e.Constants;
  return _i = function() {
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
  }, _i;
}
var hc;
function Uc() {
  return hc || (hc = 1, hr.EntryHeader = Fl(), hr.MainHeader = ql()), hr;
}
var Qe = {}, Si, mc;
function kl() {
  return mc || (mc = 1, Si = function(e) {
    var t = bc, o = { chunkSize: (parseInt(e.length / 1024) + 1) * 1024 };
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
  }), Si;
}
var wi, pc;
function jl() {
  if (pc) return wi;
  pc = 1;
  const e = +(process.versions ? process.versions.node : "").split(".")[0] || 0;
  return wi = function(t, o) {
    var n = bc;
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
          for (var E = 0; E < f.length; E++) {
            var g = f[E];
            g.copy(s, d), d += g.length;
          }
          a && a(s);
        }), r.end(t);
      }
    };
  }, wi;
}
var $i, yc;
function Ml() {
  if (yc) return $i;
  yc = 1;
  const { randomFillSync: e } = $c, t = xi(), o = new Uint32Array(256).map((p, w) => {
    for (let b = 0; b < 8; b++)
      w & 1 ? w = w >>> 1 ^ 3988292384 : w >>>= 1;
    return w >>> 0;
  }), n = (p, w) => Math.imul(p, w) >>> 0, u = (p, w) => o[(p ^ w) & 255] ^ p >>> 8, a = () => typeof e == "function" ? e(Buffer.alloc(12)) : a.node();
  a.node = () => {
    const p = Buffer.alloc(12), w = p.length;
    for (let b = 0; b < w; b++) p[b] = Math.random() * 256 & 255;
    return p;
  };
  const r = {
    genSalt: a
  };
  function f(p) {
    const w = Buffer.isBuffer(p) ? p : Buffer.from(p);
    this.keys = new Uint32Array([305419896, 591751049, 878082192]);
    for (let b = 0; b < w.length; b++)
      this.updateKeys(w[b]);
  }
  f.prototype.updateKeys = function(p) {
    const w = this.keys;
    return w[0] = u(w[0], p), w[1] += w[0] & 255, w[1] = n(w[1], 134775813) + 1, w[2] = u(w[2], w[1] >>> 24), p;
  }, f.prototype.next = function() {
    const p = (this.keys[2] | 2) >>> 0;
    return n(p, p ^ 1) >> 8 & 255;
  };
  function i(p) {
    const w = new f(p);
    return function(b) {
      const l = Buffer.alloc(b.length);
      let h = 0;
      for (let c of b)
        l[h++] = w.updateKeys(c ^ w.next());
      return l;
    };
  }
  function s(p) {
    const w = new f(p);
    return function(b, l, h = 0) {
      l || (l = Buffer.alloc(b.length));
      for (let c of b) {
        const m = w.next();
        l[h++] = c ^ m, w.updateKeys(c);
      }
      return l;
    };
  }
  function d(p, w, b) {
    if (!p || !Buffer.isBuffer(p) || p.length < 12)
      return Buffer.alloc(0);
    const l = i(b), h = l(p.slice(0, 12)), c = (w.flags & 8) === 8 ? w.timeHighByte : w.crc >>> 24;
    if (h[11] !== c)
      throw t.WRONG_PASSWORD();
    return l(p.slice(12));
  }
  function E(p) {
    Buffer.isBuffer(p) && p.length >= 12 ? r.genSalt = function() {
      return p.slice(0, 12);
    } : p === "node" ? r.genSalt = a.node : r.genSalt = a;
  }
  function g(p, w, b, l = !1) {
    p == null && (p = Buffer.alloc(0)), Buffer.isBuffer(p) || (p = Buffer.from(p.toString()));
    const h = s(b), c = r.genSalt();
    c[11] = w.crc >>> 24 & 255, l && (c[10] = w.crc >>> 16 & 255);
    const m = Buffer.alloc(p.length + 12);
    return h(c, m), h(p, m, 12);
  }
  return $i = { decrypt: d, encrypt: g, _salter: E }, $i;
}
var vc;
function xl() {
  return vc || (vc = 1, Qe.Deflater = kl(), Qe.Inflater = jl(), Qe.ZipCrypto = Ml()), Qe;
}
var bi, Ec;
function zc() {
  if (Ec) return bi;
  Ec = 1;
  var e = ot(), t = Uc(), o = e.Constants, n = xl();
  return bi = function(u, a) {
    var r = new t.EntryHeader(), f = Buffer.alloc(0), i = Buffer.alloc(0), s = !1, d = null, E = Buffer.alloc(0), g = Buffer.alloc(0), p = !0;
    const w = u, b = typeof w.decoder == "object" ? w.decoder : e.decoder;
    p = b.hasOwnProperty("efs") ? b.efs : !1;
    function l() {
      return !a || !(a instanceof Uint8Array) ? Buffer.alloc(0) : (g = r.loadLocalHeaderFromBinary(a), a.slice(r.realDataOffset, r.realDataOffset + r.compressedSize));
    }
    function h(S) {
      if (r.flags_desc) {
        const $ = {}, O = r.realDataOffset + r.compressedSize;
        if (a.readUInt32LE(O) == o.LOCSIG || a.readUInt32LE(O) == o.CENSIG)
          throw e.Errors.DESCRIPTOR_NOT_EXIST();
        if (a.readUInt32LE(O) == o.EXTSIG)
          $.crc = a.readUInt32LE(O + o.EXTCRC), $.compressedSize = a.readUInt32LE(O + o.EXTSIZ), $.size = a.readUInt32LE(O + o.EXTLEN);
        else if (a.readUInt16LE(O + 12) === 19280)
          $.crc = a.readUInt32LE(O + o.EXTCRC - 4), $.compressedSize = a.readUInt32LE(O + o.EXTSIZ - 4), $.size = a.readUInt32LE(O + o.EXTLEN - 4);
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
    function c(S, $, O) {
      if (typeof $ > "u" && typeof S == "string" && (O = S, S = void 0), s)
        return S && $ && $(Buffer.alloc(0), e.Errors.DIRECTORY_CONTENT_ERROR()), Buffer.alloc(0);
      var T = l();
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
              throw e.Errors.BAD_CRC(`"${b.decode(f)}"`);
            return k;
          }
          break;
        default:
          throw S && $ && $(Buffer.alloc(0), e.Errors.UNKNOWN_METHOD()), e.Errors.UNKNOWN_METHOD();
      }
    }
    function m(S, $) {
      if ((!d || !d.length) && Buffer.isBuffer(a))
        return S && $ && $(l()), l();
      if (d.length && !s) {
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
          O = S.readUInt16LE($), $ += 2, T = S.readUInt16LE($), $ += 2, k = S.slice($, $ + T), $ += T, o.ID_ZIP64 === O && _(k);
      } catch {
        throw e.Errors.EXTRA_FIELD_PARSE_ERROR();
      }
    }
    function _(S) {
      var $, O, T, k;
      S.length >= o.EF_ZIP64_SCOMP && ($ = y(S, o.EF_ZIP64_SUNCOMP), r.size === o.EF_ZIP64_OR_32 && (r.size = $)), S.length >= o.EF_ZIP64_RHO && (O = y(S, o.EF_ZIP64_SCOMP), r.compressedSize === o.EF_ZIP64_OR_32 && (r.compressedSize = O)), S.length >= o.EF_ZIP64_DSN && (T = y(S, o.EF_ZIP64_RHO), r.offset === o.EF_ZIP64_OR_32 && (r.offset = T)), S.length >= o.EF_ZIP64_DSN + 4 && (k = S.readUInt32LE(o.EF_ZIP64_DSN), r.diskNumStart === o.EF_ZIP64_OR_16 && (r.diskNumStart = k));
    }
    return {
      get entryName() {
        return b.decode(f);
      },
      get rawEntryName() {
        return f;
      },
      set entryName(S) {
        f = e.toBuffer(S, b.encode);
        var $ = f[f.length - 1];
        s = $ === 47 || $ === 92, r.fileNameLength = f.length;
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
        return b.decode(i);
      },
      set comment(S) {
        if (i = e.toBuffer(S, b.encode), r.commentLength = i.length, i.length > 65535) throw e.Errors.COMMENT_TOO_LONG();
      },
      get name() {
        var S = b.decode(f);
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
      getDataAsync: function(S, $) {
        r.changed ? S(d) : c(!0, S, $);
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
        return f.copy(S, $), $ += f.length, E.copy(S, $), $ += r.extraLength, i.copy(S, $), S;
      },
      packLocalHeader: function() {
        let S = 0;
        r.flags_efs = this.efs, r.extraLocalLength = g.length;
        const $ = r.localHeaderToBinary(), O = Buffer.alloc($.length + f.length + r.extraLocalLength);
        return $.copy(O, S), S += $.length, f.copy(O, S), S += f.length, g.copy(O, S), S += g.length, O;
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
          compressedData: S(a),
          data: S(d)
        };
      },
      toString: function() {
        return JSON.stringify(this.toJSON(), null, "	");
      }
    };
  }, bi;
}
var Ri, gc;
function Ul() {
  if (gc) return Ri;
  gc = 1;
  const e = zc(), t = Uc(), o = ot();
  return Ri = function(n, u) {
    var a = [], r = {}, f = Buffer.alloc(0), i = new t.MainHeader(), s = !1;
    const d = /* @__PURE__ */ new Set(), E = u, { noSort: g, decoder: p } = E;
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
    function b() {
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
      var m = n.length - o.Constants.ENDHDR, y = Math.max(0, m - 65535), v = y, _ = n.length, S = -1, $ = 0;
      for ((typeof E.trailingSpace == "boolean" ? E.trailingSpace : !1) && (y = 0), m; m >= v; m--)
        if (n[m] === 80) {
          if (n.readUInt32LE(m) === o.Constants.ENDSIG) {
            S = m, $ = m, _ = m + o.Constants.ENDHDR, v = m - o.Constants.END64HDR;
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
      i.loadFromBinary(n.slice(S, _)), i.commentLength && (f = n.slice($ + o.Constants.ENDHDR)), c && b();
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
        return s || b(), a.filter((c) => !d.has(c));
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
        return s || b(), r[c] || null;
      },
      /**
       * Adds the given entry to the entry list
       *
       * @param entry
       */
      setEntry: function(c) {
        s || b(), a.push(c), r[c.entryName] = c, i.totalEntries = a.length;
      },
      /**
       * Removes the file with the given name from the entry list.
       *
       * If the entry is a directory, then all nested files and directories will be removed
       * @param entryName
       * @returns {void}
       */
      deleteFile: function(c, m = !0) {
        s || b();
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
        s || b();
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
        if (s || b(), typeof c == "object")
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
        s || b(), h();
        const c = [], m = [];
        let y = 0, v = 0;
        i.size = 0, i.offset = 0;
        let _ = 0;
        for (const O of this.entries) {
          const T = O.getCompressedData();
          O.header.offset = v;
          const k = O.packLocalHeader(), H = k.length + T.length;
          v += H, c.push(k), c.push(T);
          const U = O.packCentralHeader();
          m.push(U), i.size += U.length, y += H + U.length, _++;
        }
        y += i.mainHeaderSize, i.offset = v, i.totalEntries = _, v = 0;
        const S = Buffer.alloc(y);
        for (const O of c)
          O.copy(S, v), v += O.length;
        for (const O of m)
          O.copy(S, v), v += O.length;
        const $ = i.toBinary();
        return f && f.copy($, o.Constants.ENDHDR), $.copy(S, v), n = S, s = !1, S;
      },
      toAsyncBuffer: function(c, m, y, v) {
        try {
          s || b(), h();
          const _ = [], S = [];
          let $ = 0, O = 0, T = 0;
          i.size = 0, i.offset = 0;
          const k = function(H) {
            if (H.length > 0) {
              const U = H.shift(), z = U.entryName + U.extra.toString();
              y && y(z), U.getCompressedDataAsync(function(V) {
                v && v(z), U.header.offset = O;
                const Z = U.packLocalHeader(), B = Z.length + V.length;
                O += B, _.push(Z), _.push(V);
                const A = U.packCentralHeader();
                S.push(A), i.size += A.length, $ += B + A.length, T++, k(H);
              });
            } else {
              $ += i.mainHeaderSize, i.offset = O, i.totalEntries = T, O = 0;
              const U = Buffer.alloc($);
              _.forEach(function(V) {
                V.copy(U, O), O += V.length;
              }), S.forEach(function(V) {
                V.copy(U, O), O += V.length;
              });
              const z = i.toBinary();
              f && f.copy(z, o.Constants.ENDHDR), z.copy(U, O), n = U, s = !1, c(U);
            }
          };
          k(Array.from(this.entries));
        } catch (_) {
          m(_);
        }
      }
    };
  }, Ri;
}
var Oi, _c;
function zl() {
  if (_c) return Oi;
  _c = 1;
  const e = ot(), t = ce, o = zc(), n = Ul(), u = (...i) => e.findLast(i, (s) => typeof s == "boolean"), a = (...i) => e.findLast(i, (s) => typeof s == "string"), r = (...i) => e.findLast(i, (s) => typeof s == "function"), f = {
    // option "noSort" : if true it disables files sorting
    noSort: !1,
    // read entries during load (initial loading may be slower)
    readEntries: !1,
    // default method is none
    method: e.Constants.NONE,
    // file system
    fs: null
  };
  return Oi = function(i, s) {
    let d = null;
    const E = Object.assign(/* @__PURE__ */ Object.create(null), f);
    i && typeof i == "object" && (i instanceof Uint8Array || (Object.assign(E, i), i = E.input ? E.input : void 0, E.input && delete E.input), Buffer.isBuffer(i) && (d = i, E.method = e.Constants.BUFFER, i = void 0)), Object.assign(E, s);
    const g = new e(E);
    if ((typeof E.decoder != "object" || typeof E.decoder.encode != "function" || typeof E.decoder.decode != "function") && (E.decoder = e.decoder), i && typeof i == "string")
      if (g.fs.existsSync(i))
        E.method = e.Constants.FILE, E.filename = i, d = g.fs.readFileSync(i);
      else
        throw e.Errors.INVALID_FILENAME();
    const p = new n(d, E), { canonical: w, sanitize: b, zipnamefix: l } = e;
    function h(v) {
      if (v && p) {
        var _;
        if (typeof v == "string" && (_ = p.getEntry(t.posix.normalize(v))), typeof v == "object" && typeof v.entryName < "u" && typeof v.header < "u" && (_ = p.getEntry(v.entryName)), _)
          return _;
      }
      return null;
    }
    function c(v) {
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
          _ = _ ? c(_) : "";
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
          O = O ? c(O) : "";
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
        if (S = m(S), _ = _ ? c(_) : "", v = t.normalize(v), g.fs.existsSync(v)) {
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
        $ = m($), S = S ? c(S) : "", v = t.normalize(v);
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
        v = typeof v == "object" ? v : { localPath: v }, localPath = t.resolve(c(v.localPath));
        let { zipPath: $, filter: O, namefix: T } = v;
        O instanceof RegExp ? O = /* @__PURE__ */ function(U) {
          return function(z) {
            return U.test(z);
          };
        }(O) : typeof O != "function" && (O = function() {
          return !0;
        }), $ = $ ? c($) : "", T == "latin1" && (T = (U) => U.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, "")), typeof T != "function" && (T = (U) => U);
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
        v = l(v);
        let O = h(v);
        const T = O != null;
        T || (O = new o(E), O.entryName = v), O.comment = S || "";
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
        $ = u(!1, $), O = u(!1, O), S = u(!0, S), T = a(O, T);
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
        if (S = u(!1, S), $ = a(S, $), _ = u(!1, _), !p) throw e.Errors.NO_ZIP();
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
        if ($ = r(_, S, $), S = u(!1, S), _ = u(!1, _), !$)
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
  }, Oi;
}
var Vl = zl();
const Sc = /* @__PURE__ */ Rc(Vl);
class Vc {
  constructor(t, o) {
    this.bw = t, this.version = o, t.webContents.on("devtools-opened", () => this.#c());
    const n = new bu();
    n.handle("openDevTools", () => t.webContents.openDevTools()), this.#l.getVersion = o, n.handle("getInfo", () => this.#l), n.handle("inited", (a, r, f) => this.#p(r, f)), n.handle("existsSync", (a, r) => we.existsSync(r)), n.handle("copySync", (a, r, f) => we.copySync(r, f)), n.handle("removeSync", (a, r) => we.removeSync(r)), n.handle("ensureFileSync", (a, r) => we.ensureFileSync(r)), n.handle("readFileSync", (a, r) => we.readFileSync(r, { encoding: "utf8" })), n.handle("writeFileSync", (a, r, f, i) => we.writeFileSync(r, f, i)), n.handle("appendFile", (a, r, f) => we.appendFile(r, f).catch((i) => console.log(i))), n.handle("outputFile", (a, r, f) => we.outputFile(r, f).catch((i) => console.log(i))), n.handle("win_close", () => t.close()), n.handle("win_setTitle", (a, r) => t.setTitle(r)), n.handle("showMessageBox", (a, r) => Hc.showMessageBox(r)), n.handle("capturePage", (a, r, f, i) => t.webContents.capturePage().then((s) => {
      we.ensureFileSync(r);
      const d = s.resize({ width: f, height: i, quality: "best" }), E = r.endsWith(".png") ? d.toPNG() : d.toJPEG(80);
      we.writeFileSync(r, E);
    })), n.handle("navigate_to", (a, r) => Wc.openExternal(r));
    let u;
    n.handle("Store", (a, r) => {
      u = new ic(r);
    }), n.handle("flush", (a, r) => {
      u.store = r;
    }), n.handle("Store_isEmpty", () => u.size === 0), n.handle("Store_get", () => u.store), n.handle("zip", (a, r, f) => {
      const i = new Sc();
      i.addLocalFolder(r), i.writeZip(f);
    }), n.handle("unzip", (a, r, f) => {
      we.removeSync(f), we.ensureDirSync(f), new Sc(r).extractAllTo(f, !0);
    }), n.handle("isSimpleFullScreen", () => t.simpleFullScreen), Or.isWin ? (n.handle("setSimpleFullScreen", (a, r) => {
      this.#e = !0, t.setSimpleFullScreen(r), r || (t.setPosition(this.#o, this.#a), t.setContentSize(this.#r, this.#n)), this.#e = !1;
    }), t.on("enter-full-screen", () => {
      t.setContentSize(this.#t.width, this.#t.height);
    }), t.on("leave-full-screen", () => {
      this.#s(!1, this.#o, this.#a, this.#r, this.#n);
    })) : n.handle("setSimpleFullScreen", (a, r) => {
      t.setSimpleFullScreen(r), !r && t.setContentSize(this.#r, this.#n);
    }), n.handle("window", (a, r, f, i, s, d) => this.#s(r, f, i, s, d)), t.on("move", () => this.#f()), t.on("resize", () => this.#f()), this.#h();
  }
  static initRenderer(t, o) {
    let n, u = () => {
    };
    try {
      ic.initRenderer(), n = new Kc({
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
      const a = new Vc(n, o);
      u = () => a.openDevTools();
    } catch (a) {
      throw console.error(`early err:${a}`), u(), "initRenderer error";
    }
    return n;
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
  #d = new Ru();
  #i = 0;
  openDevTools = () => {
  };
  #c = () => {
  };
  //TODO: #evDevtoolsOpened = ()=> this.bw.webContents.closeDevTools();	// 開こうとしたら閉じる
  #p(t, o) {
    const { c: n, x: u, y: a, w: r, h: f } = o;
    if (this.#i = r / f, Or.isWin || this.bw.setAspectRatio(this.#i), this.#s(n, u, a, r, f), this.bw.show(), t.debug.devtool) {
      this.#c = () => {
      }, this.openDevTools = () => this.bw.webContents.openDevTools({
        mode: "detach"
        // 別ウィンドウに切り離すが画面内に戻せない
        //	activate: false,	// 他のウインドウの後ろに回って見失いがち
      }), this.openDevTools();
      return;
    }
    this.#c = () => {
      this.bw.webContents.closeDevTools(), this.bw.setTitle("DevToolは禁止されています。許可する場合は【プロジェクト設定】の【devtool】をONに。"), this.#d.send(this.bw.webContents, "shutdown");
    };
  }
  #t;
  #h() {
    const t = Ui.getCursorScreenPoint(), o = Ui.getDisplayNearestPoint(t);
    this.#t = o.workAreaSize;
  }
  #u = void 0;
  #m = !1;
  #e = !1;
  #f() {
    if (this.#u || this.#e) return;
    this.#e = !0;
    const [t, o] = this.bw.getPosition(), [n, u] = this.bw.getContentSize();
    this.#u = setTimeout(() => {
      if (this.#u = void 0, this.#m) {
        this.#m = !1;
        return;
      }
      this.#e = !1;
      const [a = 0, r = 0] = this.bw.getPosition(), [f = 0, i = 0] = this.bw.getContentSize();
      if (t !== a || o !== r || n !== f || u !== i) {
        this.#f();
        return;
      }
      this.#s(!1, a, r, f, i);
    }, 1e3 / 60 * 10);
  }
  #s(t, o, n, u, a) {
    this.#e || (this.#e = !0, !this.bw.simpleFullScreen && (t && (this.#h(), o = (this.#t.width - u) * 0.5, n = (this.#t.height - a) * 0.5), this.#o = o = Math.round(o), this.#a = n = Math.round(n), this.bw.setPosition(o, n), Or.isWin && (this.#r !== u ? a = u / this.#i : u = a * this.#i), this.#r = u = Math.round(u), this.#n = a = Math.round(a), this.bw.setContentSize(u, a), this.#d.send(this.bw.webContents, "save_win_inf", { c: t, x: o, y: n, w: u, h: a, scrw: this.#t.width, scrh: this.#t.height }), this.#e = !1));
  }
}
export {
  Vc as appMain
};
//# sourceMappingURL=appMain.js.map
