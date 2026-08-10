/*!--------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

export function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

export var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

export function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

export function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

export function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

export function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};

export function __runInitializers(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};

export function __propKey(x) {
    return typeof x === "symbol" ? x : "".concat(x);
};

export function __setFunctionName(f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

export function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

export function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

export function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

export var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

export function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

export function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

export function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
export function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
export function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

export function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

export function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

export function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

export function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

export function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

export function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

var ownKeys = function(o) {
    ownKeys = Object.getOwnPropertyNames || function (o) {
        var ar = [];
        for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
        return ar;
    };
    return ownKeys(o);
};

export function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
    __setModuleDefault(result, mod);
    return result;
}

export function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

export function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

export function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

export function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}

export function __addDisposableResource(env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose, inner;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async) inner = dispose;
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
        env.stack.push({ value: value, dispose: dispose, async: async });
    }
    else if (async) {
        env.stack.push({ async: true });
    }
    return value;

}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

export function __disposeResources(env) {
    function fail(e) {
        env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
        env.hasError = true;
    }
    var r, s = 0;
    function next() {
        while (r = env.stack.pop()) {
            try {
                if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
                if (r.dispose) {
                    var result = r.dispose.call(r.value);
                    if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
                }
                else s |= 1;
            }
            catch (e) {
                fail(e);
            }
        }
        if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
        if (env.hasError) throw env.error;
    }
    return next();
}

export function __rewriteRelativeImportExtension(path, preserveJsx) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
        return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
            return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
        });
    }
    return path;
}

export default {
    __extends: __extends,
    __assign: __assign,
    __rest: __rest,
    __decorate: __decorate,
    __param: __param,
    __esDecorate: __esDecorate,
    __runInitializers: __runInitializers,
    __propKey: __propKey,
    __setFunctionName: __setFunctionName,
    __metadata: __metadata,
    __awaiter: __awaiter,
    __generator: __generator,
    __createBinding: __createBinding,
    __exportStar: __exportStar,
    __values: __values,
    __read: __read,
    __spread: __spread,
    __spreadArrays: __spreadArrays,
    __spreadArray: __spreadArray,
    __await: __await,
    __asyncGenerator: __asyncGenerator,
    __asyncDelegator: __asyncDelegator,
    __asyncValues: __asyncValues,
    __makeTemplateObject: __makeTemplateObject,
    __importStar: __importStar,
    __importDefault: __importDefault,
    __classPrivateFieldGet: __classPrivateFieldGet,
    __classPrivateFieldSet: __classPrivateFieldSet,
    __classPrivateFieldIn: __classPrivateFieldIn,
    __addDisposableResource: __addDisposableResource,
    __disposeResources: __disposeResources,
    __rewriteRelativeImportExtension: __rewriteRelativeImportExtension,
};

(async function(){performance.mark("code/didStartRenderer");let y=window.vscode,b=y.process;function x(n){performance.mark("code/willShowPartsSplash"),S(n),performance.mark("code/didShowPartsSplash")}function S(n){let r=n.partsSplash;r&&(n.autoDetectHighContrast&&n.colorScheme.highContrast?(n.colorScheme.dark&&r.baseTheme!=="hc-black"||!n.colorScheme.dark&&r.baseTheme!=="hc-light")&&(r=void 0):n.autoDetectColorScheme&&(n.colorScheme.dark&&r.baseTheme!=="vs-dark"||!n.colorScheme.dark&&r.baseTheme!=="vs")&&(r=void 0)),r&&n.extensionDevelopmentPath&&(r.layoutInfo=void 0);let s,d,l;r?(s=r.baseTheme,d=r.colorInfo.editorBackground,l=r.colorInfo.foreground):n.autoDetectHighContrast&&n.colorScheme.highContrast?n.colorScheme.dark?(s="hc-black",d="#000000",l="#FFFFFF"):(s="hc-light",d="#FFFFFF",l="#000000"):n.autoDetectColorScheme&&(n.colorScheme.dark?(s="vs-dark",d="#1E1E1E",l="#CCCCCC"):(s="vs",d="#FFFFFF",l="#000000"));let p=document.createElement("style");if(p.className="initialShellColors",window.document.head.appendChild(p),p.textContent=`body {	background-color: ${d}; color: ${l}; margin: 0; padding: 0; }`,typeof r?.zoomLevel=="number"&&typeof y?.webFrame?.setZoomLevel=="function"&&y.webFrame.setZoomLevel(r.zoomLevel),r?.layoutInfo){let{layoutInfo:t,colorInfo:i}=r,a=t.modernUI===!0,c=4,m=c*2,g=1,h=document.createElement("div");if(h.id="monaco-parts-splash",h.className=s??"vs-dark",t.windowBorder&&i.windowBorder){let e=document.createElement("div");e.style.position="absolute",e.style.width="calc(100vw - 2px)",e.style.height="calc(100vh - 2px)",e.style.zIndex="1",e.style.border="1px solid var(--window-border-color)",e.style.setProperty("--window-border-color",i.windowBorder),t.windowBorderRadius&&(e.style.borderRadius=t.windowBorderRadius),h.appendChild(e)}let w=(e,o)=>{e.style.position="absolute",e.style.top=`${o.top}px`,typeof o.bottom=="number"&&(e.style.bottom=`${o.bottom}px`),typeof o.left=="number"&&(e.style.left=`${o.left}px`),typeof o.right=="number"&&(e.style.right=`${o.right}px`),typeof o.width=="number"&&(e.style.width=`${o.width}px`),typeof o.height=="number"&&(e.style.height=`${o.height}px`)},B=(e,o)=>{e.style.position="absolute",e.style.top=`${o.top}px`,e.style.left=`${o.left}px`,e.style.width=`${o.width}px`,e.style.height=`${o.height}px`},v=(e,o)=>{e.style.boxSizing="border-box",e.style.border=`${g}px solid ${i.agentsPanelBorder??i.editorGroupBorder??"transparent"}`,e.style.borderRadius="8px",e.style.backgroundColor=o??i.editorBackground??i.background,e.style.overflow="hidden"},f=t.titleBarHeight,u=t.statusBarHeight,_=`calc(100% - ${f+u}px)`,O=a?`calc(100% - ${f+u+c}px)`:_;if(t.auxiliaryBarWidth===Number.MAX_SAFE_INTEGER?t.auxiliaryBarWidth=window.innerWidth-t.activityBarWidth:t.auxiliaryBarWidth=Math.min(t.auxiliaryBarWidth,window.innerWidth-(t.activityBarWidth+t.editorPartMinWidth+t.sideBarWidth)),t.sideBarWidth=Math.min(t.sideBarWidth,window.innerWidth-(t.activityBarWidth+t.editorPartMinWidth+t.auxiliaryBarWidth)),t.titleBarHeight>0){let e=document.createElement("div");if(e.style.position="absolute",e.style.width="100%",e.style.height=`${t.titleBarHeight}px`,e.style.left="0",e.style.top="0",e.style.backgroundColor=a?"transparent":`${i.titleBarBackground}`,e.style["-webkit-app-region"]="drag",h.appendChild(e),!a&&i.titleBarBorder){let o=document.createElement("div");o.style.position="absolute",o.style.width="100%",o.style.height="1px",o.style.left="0",o.style.bottom="0",o.style.borderBottom=`1px solid ${i.titleBarBorder}`,e.appendChild(o)}}if(t.activityBarWidth>0){let e=document.createElement("div");if(e.style.position="absolute",e.style.width=`${t.activityBarWidth}px`,e.style.height=O,e.style.top=`${f}px`,t.sideBarSide==="left"?e.style.left="0":e.style.right="0",e.style.backgroundColor=a?"transparent":`${i.activityBarBackground}`,h.appendChild(e),!a&&i.activityBarBorder){let o=document.createElement("div");o.style.position="absolute",o.style.width="1px",o.style.height="100%",o.style.top="0",t.sideBarSide==="left"?(o.style.right="0",o.style.borderRight=`1px solid ${i.activityBarBorder}`):(o.style.left="0",o.style.borderLeft=`1px solid ${i.activityBarBorder}`),e.appendChild(o)}}if(t.sideBarWidth>0){let e=document.createElement("div");if(a&&t.partBounds?.sideBar?B(e,t.partBounds.sideBar):t.sideBarSide==="left"?w(e,{top:f,bottom:a?u+c:u,left:t.activityBarWidth+(a?c:0),width:a?Math.max(0,t.sideBarWidth-m-g*2):t.sideBarWidth}):w(e,{top:f,bottom:a?u+c:u,right:t.activityBarWidth+(a?c:0),width:a?Math.max(0,t.sideBarWidth-m-g*2):t.sideBarWidth}),a?v(e,i.agentsPanelBackground??i.sideBarBackground):e.style.backgroundColor=`${i.sideBarBackground}`,h.appendChild(e),!a&&i.sideBarBorder){let o=document.createElement("div");o.style.position="absolute",o.style.width="1px",o.style.height="100%",o.style.top="0",o.style.right="0",t.sideBarSide==="left"?o.style.borderRight=`1px solid ${i.sideBarBorder}`:(o.style.left="0",o.style.borderLeft=`1px solid ${i.sideBarBorder}`),e.appendChild(o)}}if(t.auxiliaryBarWidth>0){let e=document.createElement("div");if(a&&t.partBounds?.auxiliaryBar?B(e,t.partBounds.auxiliaryBar):t.sideBarSide==="left"?w(e,{top:f,bottom:a?u+c:u,right:a?m:0,width:a?Math.max(0,t.auxiliaryBarWidth-m-c-g*2):t.auxiliaryBarWidth}):w(e,{top:f,bottom:a?u+c:u,left:a?m:0,width:a?Math.max(0,t.auxiliaryBarWidth-m-c-g*2):t.auxiliaryBarWidth}),a?v(e,i.sideBarBackground):e.style.backgroundColor=`${i.sideBarBackground}`,h.appendChild(e),!a&&i.sideBarBorder){let o=document.createElement("div");o.style.position="absolute",o.style.width="1px",o.style.height="100%",o.style.top="0",t.sideBarSide==="left"?(o.style.left="0",o.style.borderLeft=`1px solid ${i.sideBarBorder}`):(o.style.right="0",o.style.borderRight=`1px solid ${i.sideBarBorder}`),e.appendChild(o)}}if(a&&(t.partBounds?.editor||!t.partBounds)){let e=document.createElement("div");if(t.partBounds?.editor)B(e,t.partBounds.editor);else{let o=(t.sideBarSide==="left"?t.activityBarWidth+t.sideBarWidth:t.auxiliaryBarWidth)+c,R=(t.sideBarSide==="left"?t.auxiliaryBarWidth:t.activityBarWidth+t.sideBarWidth)+c;w(e,{top:f,bottom:u+c,left:o,right:R})}v(e,i.editorBackground),h.appendChild(e)}if(a&&t.partBounds?.panel){let e=document.createElement("div");B(e,t.partBounds.panel),v(e,i.panelBackground??i.editorBackground),h.appendChild(e)}if(t.statusBarHeight>0){let e=document.createElement("div");if(e.style.position="absolute",e.style.width="100%",e.style.height=`${t.statusBarHeight}px`,e.style.bottom="0",e.style.left="0",a?e.style.backgroundColor="transparent":n.workspace&&i.statusBarBackground?e.style.backgroundColor=i.statusBarBackground:!n.workspace&&i.statusBarNoFolderBackground&&(e.style.backgroundColor=i.statusBarNoFolderBackground),h.appendChild(e),!a&&i.statusBarBorder){let o=document.createElement("div");o.style.position="absolute",o.style.width="100%",o.style.height="1px",o.style.top="0",o.style.borderTop=`1px solid ${i.statusBarBorder}`,e.appendChild(o)}}window.document.body.appendChild(h)}}async function k(n){let r=await C();n?.beforeImport?.(r);let{enableDeveloperKeybindings:s,removeDeveloperKeybindingsAfterLoad:d,developerDeveloperKeybindingsDisposable:l,forceDisableShowDevtoolsOnError:p}=D(r,n);W(r);let t=new URL(`${I(r.appRoot,{isWindows:b.platform==="win32",scheme:"vscode-file",fallbackAuthority:"vscode-app"})}/out/`);globalThis._VSCODE_FILE_ROOT=t.toString(),globalThis._VSCODE_PRODUCT_JSON={...r.product},L(r,t);try{let i;b.env.VSCODE_DEV&&globalThis._VSCODE_USE_RELATIVE_IMPORTS?i="../../../workbench/workbench.desktop.main.js":i=new URL("vs/workbench/workbench.desktop.main.js",t).href;let a=await import(i);return l&&d&&l(),{result:a,configuration:r}}catch(i){throw T(i,s&&!p),i}}async function C(){let n=setTimeout(()=>{console.error("[resolve window config] Could not resolve window configuration within 10 seconds, but will continue to wait...")},1e4);performance.mark("code/willWaitForWindowConfig");let r=await y.context.resolveConfiguration();return performance.mark("code/didWaitForWindowConfig"),clearTimeout(n),r}function D(n,r){let{forceEnableDeveloperKeybindings:s,disallowReloadKeybinding:d,removeDeveloperKeybindingsAfterLoad:l,forceDisableShowDevtoolsOnError:p}=typeof r?.configureDeveloperSettings=="function"?r.configureDeveloperSettings(n):{forceEnableDeveloperKeybindings:!1,disallowReloadKeybinding:!1,removeDeveloperKeybindingsAfterLoad:!1,forceDisableShowDevtoolsOnError:!1},i=!!(!!b.env.VSCODE_DEV||s),a;return i&&(a=E(d)),{enableDeveloperKeybindings:i,removeDeveloperKeybindingsAfterLoad:l,developerDeveloperKeybindingsDisposable:a,forceDisableShowDevtoolsOnError:p}}function E(n){let r=y.ipcRenderer,s=function(i){return[i.ctrlKey?"ctrl-":"",i.metaKey?"meta-":"",i.altKey?"alt-":"",i.shiftKey?"shift-":"",i.keyCode].join("")},d=b.platform==="darwin"?"meta-alt-73":"ctrl-shift-73",l="123",p=b.platform==="darwin"?"meta-82":"ctrl-82",t=function(i){let a=s(i);a===d||a===l?r.send("vscode:toggleDevTools"):a===p&&!n&&r.send("vscode:reloadWindow")};return window.addEventListener("keydown",t),function(){t&&(window.removeEventListener("keydown",t),t=void 0)}}function W(n){globalThis._VSCODE_NLS_MESSAGES=n.nls.messages,globalThis._VSCODE_NLS_LANGUAGE=n.nls.language;let r=n.nls.language||"en";r==="zh-tw"?r="zh-Hant":r==="zh-cn"&&(r="zh-Hans"),window.document.documentElement.setAttribute("lang",r)}function T(n,r){r&&y.ipcRenderer.send("vscode:openDevTools"),console.error(`[uncaught exception]: ${n}`),n&&typeof n!="string"&&n.stack&&console.error(n.stack)}function I(n,r){let s=n.replace(/\\/g,"/");s.length>0&&s.charAt(0)!=="/"&&(s=`/${s}`);let d;return r.isWindows&&s.startsWith("//")?d=encodeURI(`${r.scheme||"file"}:${s}`):d=encodeURI(`${r.scheme||"file"}://${r.fallbackAuthority||""}${s}`),d.replace(/#/g,"%23")}function L(n,r){if(!globalThis._VSCODE_DISABLE_CSS_IMPORT_MAP&&Array.isArray(n.cssModules)&&n.cssModules.length>0){performance.mark("code/willAddCssLoader"),globalThis._VSCODE_CSS_LOAD=function(t){let i=document.createElement("link");i.setAttribute("rel","stylesheet"),i.setAttribute("type","text/css"),i.setAttribute("href",t),window.document.head.appendChild(i)};let s={imports:{}};for(let t of n.cssModules){let i=new URL(t,r).href,a=`globalThis._VSCODE_CSS_LOAD('${i}');
`,c=new Blob([a],{type:"application/javascript"});s.imports[i]=URL.createObjectURL(c)}let d=window.trustedTypes?.createPolicy("vscode-bootstrapImportMap",{createScript(t){return t}}),l=JSON.stringify(s,void 0,2),p=document.createElement("script");p.type="importmap",p.setAttribute("nonce","0c6a828f1297"),p.textContent=d?.createScript(l)??l,window.document.head.appendChild(p),performance.mark("code/didAddCssLoader")}}let{result:$,configuration:M}=await k({configureDeveloperSettings:function(n){return{forceDisableShowDevtoolsOnError:typeof n.extensionTestsPath=="string"||n["enable-smoke-test-driver"]===!0,forceEnableDeveloperKeybindings:Array.isArray(n.extensionDevelopmentPath)&&n.extensionDevelopmentPath.length>0,removeDeveloperKeybindingsAfterLoad:!0}},beforeImport:function(n){x(n),Object.defineProperty(window,"vscodeWindowId",{get:()=>n.windowId}),window.requestIdleCallback(()=>{let r=document.createElement("canvas");r.getContext("2d")?.clearRect(0,0,r.width,r.height),r.remove()},{timeout:50}),performance.mark("code/willLoadWorkbenchMain")}});performance.mark("code/didLoadWorkbenchMain"),$.main(M)})();
//# sourceMappingURL=https://main.vscode-cdn.net/sourcemaps/df53daabb18cd157bdb08c7f01c34df936cf12f4/core/vs\code\electron-browser\workbench\workbench.js.map
