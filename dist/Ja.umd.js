(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Joshua.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Joshua.ts":
/*!***********************!*\
  !*** ./src/Joshua.ts ***!
  \***********************/
/*! exports provided: Ja, store, url, time */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ja", function() { return Ja; });
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../version */ "./version.ts");
/* harmony import */ var _browser_storage_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./browser/storage/store */ "./src/browser/storage/store.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "store", function() { return _browser_storage_store__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _browser_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./browser/url */ "./src/browser/url.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "url", function() { return _browser_url__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _time__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./time */ "./src/time.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "time", function() { return _time__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/**
 * 2018年7月26日 星期四
 * Joshua 总类型
 */




var Ja = /** @class */ (function () {
    function Ja() {
    }
    Ja.version = _version__WEBPACK_IMPORTED_MODULE_0__["LibVersion"].version;
    Ja.author = _version__WEBPACK_IMPORTED_MODULE_0__["LibVersion"].author;
    return Ja;
}());






/***/ }),

/***/ "./src/browser/storage/adapter.ts":
/*!****************************************!*\
  !*** ./src/browser/storage/adapter.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * 2018年7月26日 星期四
 * 适配器
 */
var Adapter = /** @class */ (function () {
    function Adapter(engine) {
        this.engine = engine || 'session';
        this.engine = this.engine.toLowerCase();
        // 获取引擎
        switch (engine) {
            case 'session':
                this.storage = window.sessionStorage;
                break;
            case 'local':
                this.storage = window.localStorage;
                break;
        }
    }
    /**
     * 参数获取
     * @param {string} key
     * @returns {string | null}
     */
    Adapter.prototype.get = function (key) {
        return this.storage.getItem(key);
    };
    /**
     * 设置值
     * @param {string} key
     * @param {*} value
     * @return Ja.storeAdapter
     */
    Adapter.prototype.set = function (key, value) {
        if ('object' == typeof value) {
            value = JSON.stringify(value);
        }
        this.storage.setItem(key, value);
        return this;
    };
    /**
     * 删除值
     * @param {string} key
     * @returns {Ja.storeAdapter}
     */
    Adapter.prototype.del = function (key) {
        this.storage.removeItem(key);
        return this;
    };
    return Adapter;
}());
/* harmony default export */ __webpack_exports__["default"] = (Adapter);


/***/ }),

/***/ "./src/browser/storage/store.ts":
/*!**************************************!*\
  !*** ./src/browser/storage/store.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./adapter */ "./src/browser/storage/adapter.ts");
/* harmony import */ var _data_uType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../data/uType */ "./src/data/uType.ts");
/**
 * 2018年7月26日 星期四
 * 浏览器存储系统
 */
///<reference path="../../index.d.ts"/>


var store = /** @class */ (function () {
    function store(options) {
        this.options = options || {};
        this.engine = this.options.engin || 'session';
        this.adapter = new _adapter__WEBPACK_IMPORTED_MODULE_0__["default"](this.engine);
        if (this.options.bKey) {
            this.bKey = this.options.bKey;
        }
        this._init();
    }
    /**
     * 项目初始化
     */
    store.prototype._init = function () {
        this.data = {};
        if (this.bKey) {
            var sedt = this.raw(this.bKey);
            if (sedt) {
                try {
                    this.data = JSON.parse(sedt);
                }
                catch (error) {
                    this.data = {};
                }
            }
        }
    };
    /**
     * @param {string} key
     * @returns {string|null}
     */
    store.prototype.raw = function (key) {
        return this.adapter.get(key);
    };
    /**
     * 设置原始值
     * @param {string} key
     * @param value
     * @returns {Ja.store}
     */
    store.prototype.setRaw = function (key, value) {
        this.adapter.set(key, value);
        return this;
    };
    /**
     * 删除所有数据
     */
    store.prototype.clearAll = function () {
        var bKey = this.bKey;
        if (bKey) {
            this.adapter.del(bKey);
            this.data = {};
        }
    };
    /**
     * 数据更新
     * @returns {Ja.store}
     */
    store.prototype.update = function () {
        var _a = this, bKey = _a.bKey, data = _a.data;
        if (bKey) {
            this.adapter.set(bKey, data);
        }
        return this;
    };
    /**
     * 值设置
     * @param {string} key
     * @param value
     * @returns {Ja.store}
     */
    store.prototype.set = function (key, value) {
        var data = this.data;
        this.data = _data_uType__WEBPACK_IMPORTED_MODULE_1__["default"].isObject(data) ? data : {};
        this.data[key] = value;
        return this;
    };
    /**
     * 删除数据
     * @param {string} key
     * @returns {Ja.store}
     */
    store.prototype.del = function (key) {
        delete this.data[key];
        return this;
    };
    /**
     * 获取配置数据
     * @param {string} key
     * @param def
     * @returns {*}
     */
    store.prototype.get = function (key, def) {
        return this.data[key] || def;
    };
    return store;
}());
/* harmony default export */ __webpack_exports__["default"] = (store);


/***/ }),

/***/ "./src/browser/url.ts":
/*!****************************!*\
  !*** ./src/browser/url.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _urlParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./urlParser */ "./src/browser/urlParser.ts");
/* harmony import */ var _data_operation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data/operation */ "./src/data/operation.ts");
/* harmony import */ var _data_uType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../data/uType */ "./src/data/uType.ts");
/**
 * 2018年7月27日 星期五
 * url 地址处理
 */



/**
 * 通过 local 解析自身
 * @returns {Sr.parseUrlData}
 */
function dataFromLocation() {
    var data = { hash: location.hash, search: location.search,
        url: location.href, querys: {}, qHash: {}, sData: {} };
    var purl = data.url;
    // 锚点
    if (data.hash) {
        purl = purl.replace(data.hash, '');
        data.hash = data.hash.substr(1);
        var hIdx = data.hash.indexOf('?');
        if (hIdx > -1) {
            data.qHash = _urlParser__WEBPACK_IMPORTED_MODULE_0__["default"].str2data(data.hash.substr(hIdx + 1));
            data.hash = data.hash.substr(0, hIdx);
        }
    }
    // search
    if (data.search) {
        purl = purl.replace(data.search, '');
        data.search = data.search.substr(1);
        data.sData = _urlParser__WEBPACK_IMPORTED_MODULE_0__["default"].str2data(data.search);
    }
    // querys
    data.querys = _data_operation__WEBPACK_IMPORTED_MODULE_1__["default"].objectMerge(data.qHash, data.sData);
    data.purl = purl;
    return data;
}
var Url = /** @class */ (function () {
    function Url(url) {
        if (url) {
            var rs = new _urlParser__WEBPACK_IMPORTED_MODULE_0__["default"](url);
            this.hash = rs.hash;
            this.querys = rs.querys;
            this.url = url;
            this.purl = rs.purl;
            this.search = rs.search;
        }
        else {
            var rs = dataFromLocation();
            this.hash = rs.hash;
            this.querys = rs.querys;
            this.url = rs.url;
            this.purl = rs.purl;
            this.search = rs.search;
        }
    }
    /**
     * 参数获取
     * @param {string} key
     * @param def
     * @returns {*}
     */
    Url.prototype.get = function (key, def) {
        return this.querys[key] || def;
    };
    /**
     * 设置query 参数值
     * @param {string | Sr.map} key
     * @param value
     * @returns {Ja.url}
     */
    Url.prototype.set = function (key, value) {
        if ('object' == typeof key) {
            this.querys = _data_operation__WEBPACK_IMPORTED_MODULE_1__["default"].objectMerge(this.querys, key);
        }
        else if (key) {
            this.querys[key] = value;
        }
        return this;
    };
    /**
     * @param {string} key
     * @returns {Ja.url}
     */
    Url.prototype.del = function (key) {
        delete this.querys[key];
        return this;
    };
    Object.defineProperty(Url.prototype, "newUrl", {
        /**
         * @returns {string}
         */
        get: function () {
            var nUrl = "" + this.purl;
            // 字符串
            if (_data_uType__WEBPACK_IMPORTED_MODULE_2__["default"].noEmptyObj(this.querys)) {
                nUrl += "?" + _urlParser__WEBPACK_IMPORTED_MODULE_0__["default"].data2str(this.querys);
            }
            // 描点
            if (this.hash) {
                nUrl += "#" + this.hash;
            }
            return nUrl;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 更新数据
     * @param {Sr.map} data
     * @param {boolean} returnMk
     * @returns {string | void}
     */
    Url.prototype.updateByData = function (data, returnMk) {
        data = _data_uType__WEBPACK_IMPORTED_MODULE_2__["default"].noEmptyObj(data) ? data : {};
        this.set(data);
        if (returnMk) {
            return this.newUrl;
        }
        location.href = this.newUrl;
    };
    return Url;
}());
/* harmony default export */ __webpack_exports__["default"] = (Url);


/***/ }),

/***/ "./src/browser/urlParser.ts":
/*!**********************************!*\
  !*** ./src/browser/urlParser.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _data_operation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/operation */ "./src/data/operation.ts");
/* harmony import */ var _data_uType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data/uType */ "./src/data/uType.ts");


/**
 * 字符转为data, tets=ddd&c2=dkdk
 * @param {string} str
 * @returns {Sr.map}
 */
function str2data(str) {
    var data = {}, strQue = str.split('&');
    strQue.forEach(function (vs, vi) {
        var idx = vs.indexOf('='), key = vs.substr(0, idx);
        data[key] = vs.substr(idx + 1);
    });
    return data;
}
/**
 * map 数组转 str
 * @param {Sr.map} data
 * @returns {string}
 */
function data2str(data) {
    var str = '';
    if (_data_uType__WEBPACK_IMPORTED_MODULE_1__["default"].noEmptyObj(data)) {
        var quque = [];
        for (var k in data) {
            quque.push(k + "=" + data[k]);
        }
        str = quque.join('&');
    }
    return str;
}
/**
 * url 地址解析
 * @param {string} url
 * @returns {parseUrlData}
 */
function parseUrl(url) {
    var data = { hash: '', search: '', qHash: {}, sData: {}, querys: {} };
    var hashIdx, seaIdx;
    var tmpUrl = url, purl = url;
    // 描点
    if ((hashIdx = tmpUrl.indexOf('#')) > -1) {
        purl = purl.substr(0, hashIdx);
        data.hash = tmpUrl.substr(hashIdx).substr(1);
        tmpUrl = tmpUrl.substr(0, hashIdx);
        var idx = void 0;
        if ((idx = data.hash.indexOf('?'))) {
            data.hash = data.hash.substr(idx + 1);
            data.qHash = str2data(data.hash);
        }
    }
    // search
    if ((seaIdx = tmpUrl.indexOf('?')) > -1) {
        //data.search = tmpUrl.substr(hashIdx).replace('?', '');
        purl = purl.substr(0, seaIdx);
        data.search = tmpUrl.substr(hashIdx).substr(1);
        data.sData = str2data(data.search);
    }
    data.querys = _data_operation__WEBPACK_IMPORTED_MODULE_0__["default"].objectMerge(data.qHash, data.sData);
    data.purl = purl;
    return data;
}
/**
 * url 解析器
 */
var urlParser = /** @class */ (function () {
    function urlParser(url) {
        var data = parseUrl(url);
        this.hash = data.hash;
        this.search = data.search;
        this.qHash = data.qHash;
        this.sData = data.sData;
        this.querys = data.querys;
        this.purl = data.purl;
        this.url = data.url;
    }
    /**
     * url 地址解析
     * @param {string} url
     * @returns {parseUrlData}
     */
    urlParser.parse = function (url) {
        return parseUrl(url);
    };
    /**
     * @param {string} str
     * @returns {Sr.map}
     */
    urlParser.str2data = function (str) {
        return str2data(str);
    };
    /**
     * @param {Sr.map} data
     * @returns {string}
     */
    urlParser.data2str = function (data) {
        return data2str(data);
    };
    return urlParser;
}());
/* harmony default export */ __webpack_exports__["default"] = (urlParser);


/***/ }),

/***/ "./src/data/operation.ts":
/*!*******************************!*\
  !*** ./src/data/operation.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
    /**
     * 简单object合并
     * @param {Sr.map} objs
     * @returns {Sr.map}
     */
    objectMerge: function () {
        var objs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            objs[_i] = arguments[_i];
        }
        var newMap = objs.length > 0 ? objs[0] : {};
        objs.forEach(function (m, i) {
            if (i > 0) {
                for (var k in m) {
                    newMap[k] = m[k];
                }
            }
        });
        return newMap;
    },
    /**
     * 数组是否存在
     * @param value
     * @param {array} queue
     * @returns {number}
     */
    inArray: function (value, queue) {
        var index = -1;
        for (var i = 0; i < queue.length; i++) {
            if (value == queue[i]) {
                index = i;
                break;
            }
        }
        return index;
    },
    /**
     * 正在字符串转替换，弥补 string.replace 字符串查询
     * @param {string} s
     * @param {string} r
     * @param {string} str
     * @returns {string}
     */
    strReplace: function (s, r, str) {
        var reg = new RegExp(s, 'a');
        str.replace(reg, r);
        return str;
    }
});


/***/ }),

/***/ "./src/data/uType.ts":
/*!***************************!*\
  !*** ./src/data/uType.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * 2018年7月26日 星期四
 * 数据类型判断
 */
/* harmony default export */ __webpack_exports__["default"] = ({
    /**
     * 空对象
     * @param {*} obj
     */
    noEmptyObj: function (obj) {
        var noEmp = false;
        if (this.isObject(obj)) {
            for (var k in obj) {
                noEmp = true;
                break;
            }
        }
        return noEmp;
    },
    /**
     * 否是为object类型，不包括 array
     * @param value
     */
    isObject: function (value) {
        if ('object' == typeof value) {
            return !(value instanceof Array);
        }
        return false;
    },
    /**
     * 是否为数组
     * @param value
     */
    isArray: function (value) {
        if (this.isObject(value)) {
            return value instanceof Array;
        }
        return false;
    }
});


/***/ }),

/***/ "./src/time.ts":
/*!*********************!*\
  !*** ./src/time.ts ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _data_operation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data/operation */ "./src/data/operation.ts");
/**
 * 2018年7月28日 星期六
 * Joshua Conero
 * 时间处理包
 **/

var Time = /** @class */ (function () {
    function Time() {
    }
    /**
     * 数据解析，格式语法同PHP: 2018-07-28 22:19:30
     * @param {string} format
     * @returns {string}
     */
    Time.date = function (format) {
        format = format || 'y-m-d h:i:s';
        var value = format;
        var dt = new Date(), year = dt.getFullYear(), month = dt.getMonth() + 1, date = dt.getDate(), hour = dt.getHours(), min = dt.getMinutes(), sec = dt.getSeconds();
        var quque = [
            'Y', 'y', 'm', 'n', 'd', 'j',
            'H', 'G', 'h', 'g', 'i', 's',
            'w'
        ];
        quque.forEach((function (v) {
            if (!v) {
                return;
            }
            if (value.indexOf(v) > -1) {
                var r = '';
                switch (v) {
                    case 'Y':
                        r = year + '';
                        break; // 2018
                    case 'y': // 18
                        r = year + '';
                        r = r.substr(2);
                        break;
                    case 'm':
                        r = (month < 10 ? '0' : '') + month;
                        break; // 07
                    case 'n':
                        r = month + '';
                        break; // 7
                    case 'd':
                        r = (date < 10 ? '0' : '') + date;
                        break; // 03 日
                    case 'j':
                        r = date + '';
                        break; // 3 日
                    case 'H':
                        r = (hour < 10 ? '0' : '') + hour;
                        break; // 02 点
                    case 'G':
                        r = hour + '';
                        break; // 2 点
                    case 'h':
                        var h12 = (hour > 12 ? hour - 12 : hour);
                        r = (h12 < 10 ? '0' : '') + h12;
                        break;
                    case 'g':
                        r = (hour > 12 ? hour - 12 : hour) + '';
                        break;
                    case 'i':
                        r = (min < 10 ? '0' : '') + min + '';
                        break;
                    case 's':
                        r = (sec < 10 ? '0' : '') + sec + '';
                        break;
                    case 'w':
                        r = dt.getDay() + '';
                        break;
                }
                if (r) {
                    value = _data_operation__WEBPACK_IMPORTED_MODULE_0__["default"].strReplace(v, r, value);
                }
            }
        }));
        return value;
    };
    /**
     *  2017-07-28 23:07:33 => 2017年07月28日
     * @param {string} timeStr 日志字符串
     * @param {*} def
     * @return {string|null}
     */
    Time.time2ZhFmt = function (timeStr, def) {
        var reg = /^[\d]{4}-[\d]{2}-[\d]{2}/;
        def = def || '';
        var fmt = def;
        if (timeStr) {
            var matchArr = timeStr.match(reg);
            fmt = ('object' == typeof matchArr && matchArr.length > 0) ? matchArr[0] : def;
            if (fmt) {
                var queue = fmt.split('-');
                fmt = queue[0] + "\u5E74" + queue[1] + "\u6708" + queue[2] + "\u65E5";
            }
        }
        return fmt;
    };
    return Time;
}());
/* harmony default export */ __webpack_exports__["default"] = (Time);


/***/ }),

/***/ "./version.ts":
/*!********************!*\
  !*** ./version.ts ***!
  \********************/
/*! exports provided: LibVersion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LibVersion", function() { return LibVersion; });
var LibVersion = { "version": "1.0.2", "release": "20180728", "author": "Joshua Conero", "name": "joshua" };


/***/ })

/******/ });
});
//# sourceMappingURL=Ja.umd.js.map