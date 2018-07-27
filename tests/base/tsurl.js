/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./tests/base/url.ts");
/******/ })
/************************************************************************/
/******/ ({

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

/***/ "./tests/base/url.ts":
/*!***************************!*\
  !*** ./tests/base/url.ts ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_browser_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/browser/url */ "./src/browser/url.ts");
/* harmony import */ var _src_data_operation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../src/data/operation */ "./src/data/operation.ts");
/**
 * 项目测试
 * url
 */


var main = document.querySelector('#main');
// 项目测试如可
var App = /** @class */ (function () {
    function App() {
        main.innerHTML = '';
        this.topComp();
    }
    App.prototype.topComp = function () {
        var uSelf = new _src_browser_url__WEBPACK_IMPORTED_MODULE_0__["default"]();
        var div = document.createElement('div');
        div.innerHTML = "\n            <h4>\u5F53\u524DURL\u5730\u5740\u89E3\u6790</h4>\n            <table border=\"1\">\n                <tr><th>\u540D\u79F0</th><th>\u63CF\u8FF0</th><th>\u503C</th></tr>            \n                <tr><td>url</td><td>\u5730\u5740</td><td><div>" + uSelf.url + "</div></td></tr>            \n                <tr><td>purl</td><td>\u5730\u5740</td><td><div>" + uSelf.purl + "</div></td></tr>            \n                <tr><td>hash</td><td>\u951A\u70B9</td><td><div>" + uSelf.hash + "</div></td></tr>            \n                <tr><td>search</td><td>\u67E5\u8BE2\u503C</td><td><div>" + uSelf.search + "</div></td></tr>            \n                <tr><td colspan=\"3\">querys/\u89E3\u6790\u503C</td></tr>            \n                <tr><td colspan=\"3\"><div>" + JSON.stringify(uSelf.querys) + "</div></td></tr>    \n                <tr><td><input class=\"get\"></td><td>\u67E5\u8BE2\u503C</td><td><div class=\"get\">\u8F93\u5165\u503C\u6309\u201Center\u201D\u67E5\u8BE2\uFF0C\u201Cdelete\u201D \u5220\u9664</div></td></tr>           \n                <tr><td><input class=\"del\"></td><td>\u5220\u9664\u503C</td><td><div class=\"del\">\u8F93\u5165 \u201Ck\u201D \u5220\u9664 url\uFF0C \u201C~\u201D \u7B49\u8868\u8DF3\u8F6C<</div></td></tr>           \n                <tr><td><input class=\"add\"></td><td>\u6DFB\u52A0k-v</td><td><div class=\"add\">\u8F93\u5165 \u201Ck=v\u201D \u66F4\u65B0 url\uFF0C \u201C~\u201D \u7B49\u8868\u8DF3\u8F6C</div></td></tr>           \n            </table>\n        ";
        // 查询值
        div.querySelector('input.get').addEventListener('keydown', function (evt) {
            //console.log(evt);
            // enter
            if (evt.keyCode == 13) {
                var value = this.value.trim();
                var sv = uSelf.get(value);
                div.querySelector('div.get').innerHTML = (sv ? sv + ",  " + value + "=" + sv : value + " \u53C2\u6570\u4E0D\u5B58");
            }
            else if (46 == evt.keyCode) { // delete
                this.value = '';
            }
        });
        // 更新值
        div.querySelector('input.add').addEventListener('keydown', function (evt) {
            //console.log(evt);
            // enter
            if (evt.keyCode == 13) {
                var value = this.value;
                var idx = value.indexOf('=');
                var isGoto = false;
                if (idx > -1) {
                    var key = value.substr(0, idx), v = value.substr(idx).trim();
                    if (_src_data_operation__WEBPACK_IMPORTED_MODULE_1__["default"].inArray(key.substr(0, 1), ['~']) > -1) {
                        key = key.substr(1);
                        isGoto = true;
                    }
                    var data = {};
                    data[key] = v;
                    uSelf.updateByData(data, !isGoto);
                    div.querySelector('div.add').innerHTML = uSelf.newUrl;
                }
                else {
                    div.querySelector('div.add').innerHTML = '输入值格式有误，使用 “k=v”类型。首字母 ~ 表示跳转.';
                }
            }
            else if (46 == evt.keyCode) { // delete
                this.value = '';
            }
        });
        // 删除值
        div.querySelector('input.del').addEventListener('keydown', function (evt) {
            //console.log(evt);
            // enter
            if (evt.keyCode == 13) {
                var value = this.value;
                var isGoto = false;
                var hasKey = uSelf.get(value);
                if (hasKey) {
                    var key = value;
                    if (_src_data_operation__WEBPACK_IMPORTED_MODULE_1__["default"].inArray(key.substr(0, 1), ['~']) > -1) {
                        key = key.substr(1);
                        isGoto = true;
                    }
                    uSelf.del(key);
                    uSelf.updateByData({}, !isGoto);
                    div.querySelector('div.del').innerHTML = uSelf.newUrl;
                }
                else {
                    div.querySelector('div.del').innerHTML = '输入值格式有误， 数据有误。首字母 ~ 表示跳转.';
                }
            }
            else if (46 == evt.keyCode) { // delete
                this.value = '';
            }
        });
        main.appendChild(div);
    };
    return App;
}());
new App();


/***/ })

/******/ });
//# sourceMappingURL=tsurl.js.map