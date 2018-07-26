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
/*! exports provided: Ja, store */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ja", function() { return Ja; });
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../version */ "./version.ts");
/* harmony import */ var _browser_storage_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./browser/storage/store */ "./src/browser/storage/store.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "store", function() { return _browser_storage_store__WEBPACK_IMPORTED_MODULE_1__["default"]; });

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

/***/ "./version.ts":
/*!********************!*\
  !*** ./version.ts ***!
  \********************/
/*! exports provided: LibVersion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LibVersion", function() { return LibVersion; });
var LibVersion = { "version": "1.0.0", "release": "20180726", "author": "Joshua Conero", "name": "joshua" };


/***/ })

/******/ });
});
//# sourceMappingURL=Ja.umd.js.map