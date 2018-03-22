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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Util; });
/**
 * 2018年1月4日 星期四
 * 工具库
 */
class Util{
    /**
     * 对象复制
     * @param {object} t1 
     */
    static clone(t1){
        t1 = 'object' == typeof t1? t1:{}
        var obj = {}
        return $.extend(true, obj, t1)
    }
    /**
     * 数据合并相同的元素
     * @param {*} array 
     */
    static ArrayMergeSameValue(array){
        if('object' == typeof array && array.length && array.length > 1){
            var valueMap = {}
            var newArray = []
            for(var i=0; i<array.length; i++){
                if(valueMap[array[i]]){
                    continue
                }
                newArray.push(array[i])
                valueMap[array[i]] = true
            }
            array = newArray
        }
        return array
    }
    /**
     * @param {array|object} obj 
     * @param {function} callback (k, v)
     */
    static each(obj, callback){
        if('object' == typeof obj){
            if($.isArray(obj)){
                for(var i=0; i<obj.length; i++){
                    if(false === callback(i, obj[i])){
                        break
                    }
                }
            }else{
                for(var k in obj){
                    if(false === callback(k, obj[k])){
                        break
                    }
                }
            }
        }        
    }
}



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 2018年1月5日 星期五
 * 基础节点类
 */
class NodeBase{
    constructor(){
        // 连接线起点获取终点
        this.fromLine = []
        this.toLine = []
        this.NodeType = null            // 节点类型
    }    
    /**
     * 记录连接线
     * @param {stirng} type 连接线类型
     * @param {this}  $node 节点实例
     */
    recordLine(type, $node){
        if('from' == type){
            this.fromLine.push($node)
        }
        else if('to' == type){
            this.toLine.push($node)
        }
    }
    /**
     * 同步处理连线
     * @param {function} callback 
     */
    syncLineMove(callback){
        if('function' !== typeof callback){
            callback = (instance, type) => {}
        }
        // 直线同步移动
        var fLines = this.fromLine        
        var tLines = this.toLine
        // 起点列表处理
        for(var i=0; i<fLines.length; i++){
            var $fC = fLines[i].c
            var $fPath = $fC.attr('path')
            callback($fC, 'from', fLines[i])
        }
        // 终点列表处理
        for(var j=0; j<tLines.length; j++){
            var $tC = tLines[j].c
            callback($tC, 'to', tLines[j])
        }
    }
    /**
     * 公共接口化
     * NodeBase struct to json 对象， 用于生产节点中 “struct” 的数据结构
     * @returns {object}
     */
    toJson(){
        var _struct = {
            NodeType: this.NodeType,            // 节点类型
            opt: this.opt,                      // 数据属性
            c: {
                attr: this.c.attr()              // 容器属性值
            }            
        }
        if(this.label){                         // 节点标签
            _struct.label = {
                attr: this.label.attr()
            }
        }
        return _struct
    }
}
/* harmony default export */ __webpack_exports__["a"] = (NodeBase);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Flow; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_NodeEndpoint__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_NodeOperation__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node_NodeJudge__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_NodeLine__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__node_NodeArrow__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__node_NodeBow__ = __webpack_require__(12);
/* unused harmony reexport NodeLine */
/* unused harmony reexport NodeArrow */
/* unused harmony reexport NodeEndpoint */
/* unused harmony reexport NodeOperation */
/* unused harmony reexport NodeJudge */
/**
 * 2018年1月4日 星期四
 * 工作流引擎, 基于 raphaelJs, 只用于绘制容器以及，拖动事件的相关算法
 */








class Flow{
    /**
     * @param {Raphael} paper 
     */
    constructor(paper){        
        this.paper = paper
    }
    /**
     * 端点(圆别名) , 圆心 和 半径
     * @param {number} cx 
     * @param {number} cy 
     * @param {number} r 
     * @param {string|null} 文本框
     */
    endpoint(cx, cy, r, text){
        var nd = new __WEBPACK_IMPORTED_MODULE_1__node_NodeEndpoint__["a" /* default */](this.paper)
        nd.create(cx, cy, r, text)
        return nd
    }
    /**
     * 判断节点
     */
    judge(x, y, w, h, text){
        var nd = new __WEBPACK_IMPORTED_MODULE_3__node_NodeJudge__["a" /* default */](this.paper)
        nd.create(x, y, w, h, text)
        return nd
    }
    /**
     * 操作节点
     */
    operation(x, y, w, h, text){
        var nd = new __WEBPACK_IMPORTED_MODULE_2__node_NodeOperation__["a" /* default */](this.paper)
        nd.create(x, y, w, h, text)
        return nd
    }
    /**
     * p1 -> p2 的连线
     * @param {*} p1 {x,y} 
     * @param {*} p2 
     */
    line(p1, p2){
        var nd = new __WEBPACK_IMPORTED_MODULE_4__node_NodeLine__["a" /* default */](this.paper)
        nd.create(p1, p2)
        return nd
    }
    /**
     * p1 -> p2 直角转线算啊分
     * @param {object} opt
     */
    rightAngleLine(opt){
        var nd = new __WEBPACK_IMPORTED_MODULE_4__node_NodeLine__["a" /* default */](this.paper)
        nd.RightAngle(opt)
        return nd
    }
    /**
     * p1 -> p2 的连线
     * @param {*} p1 [x,y]
     * @param {*} p2 
     * @param {number} r
     */
    arrow(p1, p2, r){
        var nd = new __WEBPACK_IMPORTED_MODULE_5__node_NodeArrow__["a" /* default */](this.paper)
        nd.create(p1, p2, r)
        return nd
    }
    /**
     * 箭头
     * @param {object} opt 
     */
    bow(opt){
        var nd = new __WEBPACK_IMPORTED_MODULE_6__node_NodeBow__["a" /* default */](this.paper)
        nd.create(opt)
        return nd
    }
    /**
     * 获取空节点对象
     * @param {NodeBase} type 
     */
    getEmptyNode(type){
        var $node = null
        switch(type){
            case 'endpoint': 
                $node = new __WEBPACK_IMPORTED_MODULE_1__node_NodeEndpoint__["a" /* default */](this.paper)
                break
            case 'judge': 
                $node = new __WEBPACK_IMPORTED_MODULE_3__node_NodeJudge__["a" /* default */](this.paper)
                break
            case 'operation': 
                $node = new __WEBPACK_IMPORTED_MODULE_2__node_NodeOperation__["a" /* default */](this.paper)
                break
            case 'line': 
                $node = new __WEBPACK_IMPORTED_MODULE_4__node_NodeLine__["a" /* default */](this.paper)
                break
            case 'arrow': 
                $node = new __WEBPACK_IMPORTED_MODULE_5__node_NodeArrow__["a" /* default */](this.paper)
                break
        }
        return $node
    }
}










/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__NodeBase__ = __webpack_require__(1);
/**
 * 2018年1月5日 星期五
 * 判断处理节点
 */


class NodeJudge extends __WEBPACK_IMPORTED_MODULE_0__NodeBase__["a" /* default */]{
    /**
     * 
     * @param {*} instance Raphael 实例
     */
    constructor(instance){
        super()
        this.NodeType = 'judge'
        this.instance = instance
        this.opt = {}       // 配置信息数据
    }
    /**
     * 仅仅生成容器并且返回对象
     * @param {number} cx 
     * @param {number} cy 
     * @param {number} w 
     * @param {number} h 
     * @returns RaphaelElement
     */
    onlyCell(cx, cy, w, h){
        this.opt = {cx, cy, w, h}
        // 容器        
        var ap = this.getAp()
        var bp = this.getBp()
        var cp = this.getCp()
        var dp = this.getDp()
        return this.instance.path(
            'M' + ap.x + ',' + ap.y +
            'L' + bp.x + ',' + bp.y +
            'L' + cp.x + ',' + cp.y +
            'L' + dp.x + ',' + dp.y +
            'Z'
        )
    }
    /**
     * @param {object} opt / [cx, cy, w, h, text]
     */
    create(opt){
        // 解析类型
        if('object' != typeof opt){
            var param = arguments
            opt = {
                cx: param[0],
                cy: param[1],
                w: param[2],
                h: param[3],
            }
            if(param[4]){
                opt.text = param[4]
            }
        }
        this.opt = opt
        this.minWidth = opt.w
        // 容器        
        var ap = this.getAp()
        var bp = this.getBp()
        var cp = this.getCp()
        var dp = this.getDp()
        this.c = this.instance.path(
            'M' + ap.x + ',' + ap.y +
            'L' + bp.x + ',' + bp.y +
            'L' + cp.x + ',' + cp.y +
            'L' + dp.x + ',' + dp.y +
            'Z'
        )
        // 标签
        var label
        if(opt.text){
            label = this.instance.text(opt.cx, opt.cy, opt.text)
        }else{
            label = this.instance.text(opt.cx, opt.cy)
        }
        this.label = label
        this.resizeByText()
    }
    /**
     * 根据文本宽度自动适应文本的宽度
     */
    resizeByText(){
        if(this.label){
            var box = this.label.getBBox()
            var width = Math.ceil(box.width)
            var w = this.c.attr('w')
            if(width < this.minWidth && w<this.minWidth){
                return
            }
            // 保持最小宽度
            if(width < this.minWidth){
                width = this.minWidth
            }else{
                width += 25
            }            
            this.opt.w = width
            this.resizeByOpt()
        }     
    }
    /**
     * 根据 opt 值的改变重调整容器形状大小
     */
    resizeByOpt(){
        var ap = this.getAp()
        var bp = this.getBp()
        var cp = this.getCp()
        var dp = this.getDp()
        this.c.attr('path', [
            ['M', ap.x, ap.y],
            ['L', bp.x, bp.y],
            ['L', cp.x, cp.y],
            ['L', dp.x, dp.y],
            ['Z']                   
        ])
    }
    // 按照 A 点移动
    move(x, y){
        var ctP = this.getCpByAp(x, y)
        var bP = this.getBp(ctP.x, ctP.y)
        var cP = this.getCp(ctP.x, ctP.y)
        var dP = this.getDp(ctP.x, ctP.y)
        // 容器移动
        this.c.attr('path', [
            ['M', x, y],
            ['L', bP.x, bP.y],
            ['L', cP.x, cP.y],
            ['L', dP.x, dP.y],
            ['Z']
        ])
        // 数据选项值更新
        this.opt.cx = ctP.x
        this.opt.cy = ctP.y
        // 文本移动
        this.label.attr(ctP)
    }
    // 直线同步移动
    ToSyncLine(x, y){
        var ctP = this.getCpByAp(x, y)
        this.syncLineMove((lnC, type, $ln) => {
            var position = $ln.position
            var methodName
            if(type == 'from'){
                methodName = 'get' + position.from + 'p'
                var p1 = this[methodName](ctP.x, ctP.y)
                var $fPath = lnC.attr('path')
                $fPath[0] = ['M', p1.x, p1.y]
                lnC.attr('path', $fPath)
            }
            else if(type == 'to'){
                methodName = 'get' + position.to + 'p'
                var p2 = this[methodName](ctP.x, ctP.y)
                var $tPath = lnC.attr('path')
                $tPath[$tPath.length -1] = ['L', p2.x, p2.y]
                lnC.attr('path', $tPath)
            }
        })
    }
    // 箭头同步器
    ToSyncArrow(x, y){
        var ctP = this.getCpByAp(x, y)
        this.syncLineMove((lnC, type, $ln) => {
            var position = $ln.position
            var methodName
            if(type == 'from'){
                methodName = 'get' + position.from + 'p'
                var p1 = this[methodName](ctP.x, ctP.y)
                $ln.updatePath([p1.x, p1.y])
            }
            else if(type == 'to'){
                methodName = 'get' + position.to + 'p'
                var p2 = this[methodName](ctP.x, ctP.y)
                $ln.updatePath(null, [p2.x, p2.y])
            }
        })
    }
    // 获取连线的起点节点
    getStlnP(position){
        // var position = 'D'
        position = position? position:'D'
        var methodName = 'get' + position + 'p';
        // var p = this.getDp()
        var p = this[methodName]()
        // 起点重合
        if(this.isCoincidence(p, 'from')){
            p = this.getCp()
            position = 'C'
        }
        var nP = {x: p.x, y: p.y, position}
        return nP
    }
    // 获取连线的终点节点
    getEnlnP(position){
        position = position? position:'B'
        // var p = this.getBp()
        var methodName = 'get' + position + 'p'
        var p = this[methodName]()
        p.position = position
        return p
    }
    /**
     * 根据 A 点获取中心点
     */
    getCpByAp(x, y){
        var opt = this.opt
        x += opt.w/2
        return {x, y}
    }
    // A 点
    getAp(x, y){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        x -= (opt.w/2)
        return {x, y}
    }
    getBp(x, y){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        y -= (opt.h/2)
        return {x, y}
    }
    getCp(x, y){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        x += (opt.w/2)
        return {x, y}
    }
    getDp(x, y){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        y += (opt.h/2)
        return {x, y}
    }
    /**
     * 是否为重合点
     * @param {object} p {x,y}
     * @param {string} type [from/to]
     * @returns {boolean}
     */
    isCoincidence(p, type){
        var successMK = false
        if(p && 'object' == typeof p && 
            'undefined' != typeof p.x && 'undefined' != typeof p.y){
            // 起点
            if('from' == type){
                if(this.fromLine.length > 0){
                    for(var i=0; i<this.fromLine.length; i++){
                        var $line = this.fromLine[i]
                        var path = $line.c.attr('path')
                        var pathArr = path[0]
                        if(pathArr[1] == p.x && pathArr[2] == p.y){
                            successMK = true
                            break
                        }
                    }
                }
            }
            // 终点
            else if('to' == type){
                if(this.toLine.length > 0){
                    for(var j=0; j<this.toLine.length; j++){
                        var $line = this.toLine[j]
                        var path = $line.c.attr('path')
                        var pathArr = path[path.length - 1]
                        if(pathArr[1] == p.x && pathArr[2] == p.y){
                            successMK = true
                            break
                        }
                    }
                }
            }
        }
        return successMK
    }
}

/* harmony default export */ __webpack_exports__["a"] = (NodeJudge);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * 2018年1月8日 星期一
 * 内部处理类，从 worker.js/flow.js 内部分离
 */
// 实例索引序列
var instanceIndex = 0
var instanceSource = {}     // 实列资源队列

// 内部协助函数(私有)
class H{
    /**
     * 内部函数生成实例
     * @param {*} config 
     */
    static createInstance(config){
        config = 'object' == typeof config? config:{}
        if(!config.dom){
            if(process.env.NODE_ENV !== 'production'){
                console.warn('[Worker] 配置文件无效，缺少 config.dom')
            }
        }
        // 生成 HTML
        if('string' == typeof config.dom){
            config.dom = $(config.dom)
        }
        if(!config.w){
            config.w = parseInt($(window).width() * 1.1)
        }
        if(!config.h){
            config.h = parseInt($(window).height() * 1.1)
        }
        return Raphael(config.dom.get(0), config.w, config.h)
    }
    static onMoveEvt(){}
    static onStartEvt(){}
    static onEndEvt(){}
    /**
     * 内部索引序列
     */
    static getIndex(){
        instanceIndex += 1
        return instanceIndex
    }
    /**
     * 内部资源处理
     * @param {number} index 
     * @param {string|null} key 
     * @param {*} value 
     */
    static src(index, key, value){
        if(!instanceSource[index]){
            instanceSource[index] = {}
        }
        var dd = instanceSource[index]
        if('undefined' == typeof key){
            return dd
        }
        if('undefined' == typeof value){
            return dd[key] || null
        }
        dd[key] = value
    }
}

/* harmony default export */ __webpack_exports__["a"] = (H);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(2)))

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_worker__ = __webpack_require__(7);
/**
 * 2018年1月7日 星期日
 * 步骤动态配置
 */



$(function(){
    var $worker = new __WEBPACK_IMPORTED_MODULE_0__src_worker__["a" /* default */]({
        dom: '#workflow',
        h: $(window).height() * 6,
        line: 'arrow'
    }, {
        step:[
            {code: 'A', type: 1},
            {code: 'B', type: 2, prev: 'A'},
            {code: 'C', type: 2, prev: 'B'},
            {code: 'D1', type: 2, prev: 'C'},
            {code: 'D2', name: 'D2 并列', type: 2, prev: 'C'},
            {code: 'D3', name: 'D3 并列', type: 2, prev: 'C'},
            {code: 'D4', name: 'D4 并列', type: 2, prev: 'C'},
            {code: 'D5', type: 2, prev: 'C'},
            {code: 'D6', type: 2, prev: 'C'},
            // {code: 'D7', type: 2, prev: 'C,F1'},         // 流程中退回的线条算法
            {code: 'D7', type: 2, prev: 'C'},


            {code: 'E1', type: 2, prev: 'D4'},
            {code: 'E2', type: 2, prev: 'D1'},
            {code: 'E3', type: 2, prev: 'D1'},
            {code: 'E4', type: 2, prev: 'D6'},
            
            {code: 'F1', type: 3, prev: 'E1,E3'},

            {code: 'G1', type: 3, prev: 'F1'},
            {code: 'G2', type: 2, prev: 'F1'},
            {code: 'H1', type: 2, prev: 'G2'},
            
            {code: 'J1', type: 2, prev: 'H1'},
            // 自连接测试 - BUG
            {code: 'J1', type: 2, prev: 'J1'},

            {code: 'K1', type: 2, prev: 'J1'},
            {code: 'O1', type: 9, prev: 'G1,K1,E4'},


        ]
    })
})

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__flow__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helper__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__WorkerEditor__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__version__ = __webpack_require__(14);
/**
 * 2018年1月5日 星期五
 * 工作流处理包
 */






/**
 * 工作流实例类
 */
class Worker{
    /**
     * @param {object} option  工作流配置对象
     * @param {object} config  dom 等相关配置 *
     */
    constructor(config, option){
        // 开发环境检测
        if (process.env.NODE_ENV !== 'production') {
            if(!window.$){
                console.warn('jQuery 依赖为安装，运行库将无法运行')
            }
            if(!window.Raphael){
                console.warn('Raphael 依赖为安装，运行库将无法运行')
            }
        }
        this.$index = __WEBPACK_IMPORTED_MODULE_2__helper__["a" /* default */].getIndex()
        
        // 工作流实例
        this.config = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* Util */].clone(config)
        this.$raphael = __WEBPACK_IMPORTED_MODULE_2__helper__["a" /* default */].createInstance(this.config)
        this.$flow = new __WEBPACK_IMPORTED_MODULE_0__flow__["a" /* Flow */](this.$raphael)        
        this.setOption(option)

        // 数据实例处理
        this.leastLineQue = []  // 最后需要生成的连线，如用于这回的线段

        this.draw()
        // console.log(this.config)
    }
    /**
     * 代码索引 code <-> Nodes 索引字典
     * @param {*} key 
     * @param {*} value 
     */
    cNodeMap(key, value){
        var CodeNodeMaps = __WEBPACK_IMPORTED_MODULE_2__helper__["a" /* default */].src(this.$index, 'CodeNodeMaps')
        if(!CodeNodeMaps){
            CodeNodeMaps = {}
        }
        if(key){
            // 设置值
            if(value){
                CodeNodeMaps[key] = value
                __WEBPACK_IMPORTED_MODULE_2__helper__["a" /* default */].src(this.$index, 'CodeNodeMaps', CodeNodeMaps)
                return this
            }else{
                return CodeNodeMaps[key] || false
            }
        }
        return CodeNodeMaps
    }
    // 绘制工作流图
    // 旧版流程布局算法
    draw2(){
        if(this.option){            
            var steps = this.option.step
            // 生成代码索引
            this.codeIndex(steps)
            var config = this.config
            // 起点中心坐标点 (x, y)
            var x = config.x || parseInt(config.w * 0.4)
            var y = config.y || 10
            var cH = config.cH || 50    // 容器高度
            var dH = config.dH || 30    // 间距高度
            // 同级别节点字典
            var sameClsNodeMap = {}
            // 获取通节点指向的 Y 值
            var getSameClsNodeY = (_c) =>{
                var _sameClsNode = this.codeIndex(_c)
                var y = null
                if(_sameClsNode && _sameClsNode.length > 0){
                    __WEBPACK_IMPORTED_MODULE_1__util__["a" /* Util */].each(_sameClsNode, (index, value)=>{
                        if(sameClsNodeMap[value]){
                            y = sameClsNodeMap[value].y
                            return false
                        }
                    })
                }
                return y
            }
            /**
             * 获取同一级别节点差集对比数
             * @param {string} _c 
             */
            var getSameClsDiffCount = (_c) =>{
                var _sameClsNode = this.codeIndex(_c)
                var _count = _sameClsNode.length
                var hasEd = 0
                __WEBPACK_IMPORTED_MODULE_1__util__["a" /* Util */].each(_sameClsNode, (index, value)=>{
                    if(sameClsNodeMap[value]){
                        hasEd += 1
                    }
                })
                return (_count - hasEd)
            }

            // console.log(x ,y)
            for(var i=0; i<steps.length; i++){
                var step = steps[i]
                var code = step.code
                var name = step.name || code
                var nd = this.cNodeMap(code)
                var hasNode = false
                if(nd){
                    hasNode = true
                }
                if(!hasNode){
                    // 开始
                    if(1 == step.type){      
                        y += (dH + cH/2)
                        nd = this.$flow.endpoint(x, y, cH/2, name)
                        nd.c.attr('fill', 'rgb(181, 216, 126)')
                        nd.$step = step
                        this.drag(nd)
                        y += cH/2
                        // console.log(nd)
                    }
                    // 操作节点
                    else if(2 == step.type){     
                        var w = 100
                        var sameClsNode = this.codeIndex(code)
                        var x0 = x
                        // 只有一个父类
                        if(step.prev){
                            if(step.prev.indexOf(',') == -1){
                                var parentNd = this.getNodeByCode(step.prev)
                                if(parentNd && parentNd.c){
                                    // console.log(parentNd)
                                    x0 = this.getStandX(parentNd)
                                }
                            }
                        }
                        // 多个同级节点
                        if(sameClsNode && sameClsNode.length > 1){
                            var diffCtt = getSameClsDiffCount(code)      
                            var dW = 25                  
                            // 中心偏移量算法
                            var smClsD = Math.ceil(sameClsNode.length/2)
                            var x1 = x0 + (dW + w)*(smClsD - diffCtt)
                            var y1 = getSameClsNodeY(code)
                            // console.log(sameClsNode)
                            if(y1){
                                x1 = x0 + (dW + w)*(smClsD - diffCtt)
                            }else{
                                y += dH + cH/2
                            }
                            y1 = y1? y1: y
                            nd = this.$flow.operation(x1, y1, w, cH, name)
                            sameClsNodeMap[code] = {
                                y
                            }
                        }else{                        
                            y += dH + cH/2
                            nd = this.$flow.operation(x0, y, w, cH, name)
                        }         
                        nd.$step = step
                        this.drag(nd)  
                        nd.c.attr('fill', 'rgb(224, 223, 226)')
                        y += cH/2
                    }
                    // 判断节点
                    else if(3 == step.type){
                        y += dH + cH/2
                        nd = this.$flow.judge(x, y, w+60, cH, name)
                        nd.c.attr('fill', 'rgb(49, 174, 196)')
                        nd.$step = step
                        this.drag(nd)
                        // y += 80 + 20
                        y += cH/2
                        
                    }
                    // 结束
                    else if(9 == step.type){
                        y += dH + cH/2
                        nd = this.$flow.endpoint(x, y, cH/2, name)
                        nd.c.attr('fill', 'rgb(34, 185, 41)')
                        nd.$step = step
                        this.drag(nd)
                    }
                }
                

                if(nd){
                    if(!hasNode){
                        this.cNodeMap(code, nd)
                        this.line(nd)
                        this._eventBind(nd)
                    }else{
                        this.line(nd, step)
                    }
                }
            }
        }
    }
    // 自动检测高度，自适应
    checkPaperHight(y){
        var svg = this.config.dom.find('svg')
        var height = svg.height()
        if(height < y+180){
            svg.css({'height': height + 80})
        }
    }
    // 新的布局算法(优化)、20180109
    draw(){
        this.getNodeCls()
        // clsCache
        var cc = __WEBPACK_IMPORTED_MODULE_2__helper__["a" /* default */].src(this.$index, '_nodeCls') 

        var option = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* Util */].clone(this.option)
        var beta1 = 0.21        // 分栏系数

        var 
            cH = this.conf('cH', 50),   // 容器高度
            dH = this.conf('dH', 30),   // 间距高度
            cnH = this.conf('h')       // 总容器高度
            , clsCount = cc.clsValue
            , sColumnMk = this.conf('sColumnMk', true)
        if(sColumnMk){
            beta1 = 0.43
        }else{
            beta1 = (cH* (clsCount - 1))+dH*clsCount < cnH? 0.43:beta1
        }        
        var
            X = this.conf('x', parseInt(this.conf('w') * beta1)),
            bX = X,
            Y = this.conf('y', 10),
            bY = Y
            
        var bkgOperCol = this.conf('bkgOperCol', 'rgb(224, 223, 226)'),
            bkgJudgeCol = this.conf('bkgJudgeCol', 'rgb(49, 174, 196)'),            
            currentCode = this.conf('currentCode', false)
            
          
        /**
         * 是否为多级节点
         * @param {string} _c 
         */
        cc.isMuti = (_c) =>{
            var _idx = cc.map[_c]
            var _cls = cc.mapDt[_idx]
            return _cls.length > 1
        }     
        /**
         * 获取多节点的 Y 坐标轴值
         * @param {*} _c 
         */
        cc.getMutiY = (_c, def) =>{
            var _y = 0
            def = def? def: 0
            var _idx = cc.map[_c]
            var _cls = cc.mapDt[_idx]
            if(_cls.length > 1){
                __WEBPACK_IMPORTED_MODULE_1__util__["a" /* Util */].each(_cls, (k, v)=>{
                    var _nd = this.getNodeByCode(v)
                    if(_nd){
                        _y = this.getStandY(_nd)
                        return false
                    }
                })
            }
            _y = _y? _y:def
            return _y
        }
        /**
         * 获取单级多节点统计量
         * @param {string} _c 
         */
        cc.getMutiCtt = (_c) =>{
            var _idx = cc.map[_c]
            var _cls = cc.mapDt[_idx]
            var len = _cls.length
            var hasEd = 0
            if(len > 1){
                __WEBPACK_IMPORTED_MODULE_1__util__["a" /* Util */].each(_cls, (k, v)=>{
                    if(this.getNodeByCode(v)){
                        hasEd += 1
                    }
                })
            }
            return {
                len, hasEd
            }
        }

        // console.log(clsCache)
        // var clsCacheMap = {}
        // 对象遍历            
        __WEBPACK_IMPORTED_MODULE_1__util__["a" /* Util */].each(option.step, (idx, node) => {
            var type = node.type
                , $node
                , code = node.code
                , name = node.name || code
                , x
                , y
            // 单列自动增高                
            if(sColumnMk){
                this.checkPaperHight(bY)
            }
            else if((bY + 2* cH) > cnH){
                bY = Y
                bX += X
            }
            switch(type){
                case 1: //  开始
                    bY += dH
                    $node = this.$flow.endpoint(bX, bY, cH/2, name)
                    $node.c.attr('fill', this.conf('pkgStartCol', 'rgb(181, 216, 126)'))
                    break
                case 2: // 操作
                    x = bX
                    if(!cc.isMuti(code)){
                        bY += 2*dH + cH/2
                    }else{
                        var y = cc.getMutiY(code, null)
                        var cCdt = cc.getMutiCtt(code)
                        if(cCdt.len == 2){
                            if(cCdt.hasEd > 0){
                                x += 50 + cH*1.5
                            }
                        }
                        else if(cCdt.len > 2){
                            var dW = 25                  
                            // 中心偏移量算法
                            var smClsD = Math.ceil(cCdt.len/2)
                            x = x + (dW + cH*2)*(smClsD - (cCdt.len - cCdt.hasEd))
                        }
                        if(!y){
                            bY += cc.getMutiY(code, 2*dH + cH/2)
                        }else{
                            bY = y
                        }
                        // bY += cc.getMutiY(code, 2*dH + cH/2)
                    }     
                    // console.log(x, bY)
                    // bY += 2*dH + cH/2               
                    // $node = this.$flow.operation(bX, bY, 100, cH, name)
                    $node = this.$flow.operation(x, bY, 100, cH, name)
                    $node.c.attr('fill', bkgOperCol)                    
                    break
                case 3: // 判断
                    bY += 2*dH + cH/2
                    $node = this.$flow.judge(bX, bY, 100, cH, name)
                    $node.c.attr('fill', bkgJudgeCol)
                    break
                case 9: // 结束
                    bY += dH*2 + cH/2
                    $node = this.$flow.endpoint(bX, bY, cH/2, name)
                    $node.c.attr('fill', this.conf('bkgEndCol', 'rgb(34, 185, 41)'))
                    break
            }
            // 拖动
            if($node){
                $node.$step = node
                $node.c.data('_code', code) // 保存代码为属性
                $node.c.data('_type', type)
                this.cNodeMap(code, $node)
                this.line($node)          
                this._eventBind($node)      
                this.drag($node)
            }            
        })
        this.connectLeastLines()
    }
    // 节点级别
    getNodeCls(){
        var option = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* Util */].clone(this.option)
        var clsValue = 0
        var map = {}
        var mapDt = {}
        __WEBPACK_IMPORTED_MODULE_1__util__["a" /* Util */].each(option.step, (idx, node) => {
            // console.log(node)
            var prev = node.prev,
                code = node.code
            if(prev){
                if(map[prev]){
                    clsValue = map[prev]
                }
            }
            clsValue += 1
            map[code] = clsValue
            if(!mapDt[clsValue]){
                mapDt[clsValue] = [code]
            }else{
                mapDt[clsValue].push(code)
            }
        })
        // 数据缓存
        __WEBPACK_IMPORTED_MODULE_2__helper__["a" /* default */].src(this.$index, '_nodeCls', {
            map,
            mapDt,
            clsValue
        })
        // console.log(H.src(this.$index, '_nodeCls'))
    }
    // 移动处理
    drag(nd){
        // 不适用分割号时可能解析语句失败，报错
        var config = this.config;
        (function($nd, conf){
            var $c = $nd.c
            var cDragDt = {}
            $c.drag(
                // onmove
                function(dx, dy){
                    dx += cDragDt.x
                    dy += cDragDt.y
                    $nd.move(dx, dy)
                    // 直线同步移动
                    // if(conf.line && conf.line == 'arrow'){
                    if(conf.line && (conf.line == 'arrow' || conf.line == 'bow')){
                        $nd.ToSyncArrow(dx, dy)
                    }
                    /*
                    // 箭体 2 , 暂时使用， arrow 的移动方法
                    else if(conf.line && conf.line == 'bow'){
                        $nd.ToSyncBow(dx, dy)
                    }
                    */
                    else{
                        $nd.ToSyncLine(dx, dy)
                    }
                },
                // onstart
                function(){
                    var _x, _y
                    if('ellipse' == this.type){
                        _x = this.attr('cx')
                        _y = this.attr('cy')
                    }
                    else if('rect' == this.type){
                        _x = this.attr('x')
                        _y = this.attr('y')
                    }
                    else if('path' == this.type){
                        var _path = this.attr('path')
                        var sP1 = _path[0]
                        _x = sP1[1]
                        _y = sP1[2]
                    }
                    cDragDt.x = _x
                    cDragDt.y = _y
                },
                // onend
                function(){}
            )
        })(nd, config)
    }
    /**
     * 连线
     * @param {NodeBase} nd 
     * @param {*} prefStep 
     */
    line(nd, prefStep){
        var step = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* Util */].clone(nd.$step)
        if(step.prev){
            step.prev = step.prev.replace(/\s/g, '')
        }
        if(step.prev){
            var config = this.config   
            var rightAngle = 'undefined' == typeof config.rightAngle? true: config.rightAngle
            var bkgLineCol = this.conf('bkgLineCol', 'rgb(14, 10, 10)')

            var makerLine = (from, to) => {
                var $lineInstance
                var fromNd = this.getNodeByCode(from)
                var toNd = this.getNodeByCode(to)

                // console.log(from, to)
                // var t1 = false;
                // if(from == 'G1' && to == 'B'){
                //     console.log(fromNd, toNd)
                //     t1 = true;
                // }

                // 节点已经生成时，否则保存起来，最后连接直线
                if(fromNd && toNd){
                    if(config.line && 'arrow' == config.line){
                        var $p1 = fromNd.getStlnP()
                        var $p2 = toNd.getEnlnP()
                        $lineInstance = this.$flow.arrow([$p1.x, $p1.y], [$p2.x, $p2.y], 
                            (config.arrowLen? config.arrowLen: 4))
                        $lineInstance.position = {from: $p1.position, to: $p2.position}
                        $lineInstance.c.attr('fill', bkgLineCol)
                    }
                    else if(config.line && 'bow' == config.line){
                        var $p1 = fromNd.getStlnP()
                        var $p2 = toNd.getEnlnP()
                        var bowOption = {
                            queue: [
                                {x: $p1.x, y:$p1.y},
                                {x: $p2.x, y:$p2.y}
                            ]
                        }
                        $lineInstance = this.$flow.bow(bowOption)
                        $lineInstance.position = {from: $p1.position, to: $p2.position}
                        $lineInstance.arrow.attr({
                            'fill': bkgLineCol,
                            'stroke': bkgLineCol
                        })
                    }
                    else{
                        var $p1 = fromNd.getStlnP()
                        var $p2 = toNd.getEnlnP()                        
                        if(rightAngle){
                            $lineInstance = this.$flow.rightAngleLine({
                                p1: {x:$p1.x, y:$p1.y},
                                p2: {x:$p2.x, y:$p2.y}
                            })
                        }
                        else{
                            $lineInstance = this.$flow.line([$p1.x, $p1.y], [$p2.x, $p2.y])
                        }
                        $lineInstance.position = {from: $p1.position, to: $p2.position}
                    }
                    fromNd.recordLine('from', $lineInstance)
                    toNd.recordLine('to', $lineInstance)

                    var runIdx = this.nodeRunedMk(to)
                    if(runIdx && $lineInstance){
                        var bkgRunedCol = this.conf('bkgRunedCol', 'rgb(255, 0, 0)')
                        // 连线
                        $lineInstance.c.attr({
                            //'fill': bkgRunedCol,
                            'stroke': bkgRunedCol,
                        })
                        // 箭头类型
                        if($lineInstance.arrow){
                            $lineInstance.arrow.attr({
                                'fill': bkgRunedCol,
                                'stroke': bkgRunedCol,
                            })
                        }
                        // 目标节点
                        toNd.c.attr({
                            'stroke': bkgRunedCol,
                        })
                        // 不重复填充颜色
                        if(runIdx == 2){
                            // 来源节点
                            fromNd.c.attr({
                                'stroke': bkgRunedCol,
                            })
                        }
                    }
                }
                else{
                    this.leastLineQue.push({
                        from,
                        to
                    })
                }
            }
            var prev
            prefStep = prefStep? prefStep:step
            if(prefStep.prev.indexOf(',') > -1){
                prev = prefStep.prev.split(',')
            }else{
                prev = [prefStep.prev]
            }
            for(var i=0; i<prev.length; i++){
                makerLine(prev[i], prefStep.code)
            }
        }

    }
    /**
     * 连接最后生成的线段，通常用于回线/自折线
     */
    connectLeastLines(){
        // console.log(this.leastLineQue)
        var config = this.config   
        var rightAngle = 'undefined' == typeof config.rightAngle? true: config.rightAngle

        var bkgRunedCol = this.conf('bkgRunedCol', 'rgb(255, 0, 0)')
        var bkgLineCol = this.conf('bkgLineCol', 'rgb(14, 10, 10)')

        var makerLine = (from, to) => {
            var $lineInstance
            var fromNd = this.getNodeByCode(from)
            var toNd = this.getNodeByCode(to)

            // console.log(from, to)
            // var t1 = false;
            // if(from == 'G1' && to == 'B'){
            //     console.log(fromNd, toNd)
            //     t1 = true;
            // }

            // 节点已经生成时，否则保存起来，最后连接直线
            if(fromNd && toNd){
                if(config.line && 'arrow' == config.line){
                    var $p1 = fromNd.getStlnP()
                    var $p2 = toNd.getEnlnP()
                    $lineInstance = this.$flow.arrow([$p1.x, $p1.y], [$p2.x, $p2.y], 
                        (config.arrowLen? config.arrowLen: 4))
                    $lineInstance.position = {from: $p1.position, to: $p2.position}
                    $lineInstance.c.attr('fill', bkgLineCol)
                }
                else if(config.line && 'bow' == config.line){
                    var isJudge = 3 == fromNd.c.data('_type')
                    var $p1 = fromNd.getStlnP(isJudge? 'A': null)
                    var toPosi = false
                    if(isJudge){
                        toPosi = 2 == toNd.c.data('_type')? 'L':'A'
                    }
                    var $p2 = toNd.getEnlnP(toPosi)
                    var bowOption = {
                        queue: [
                            {x: $p1.x, y:$p1.y},
                            // 直接写死了， 需要用程序计算 2018年1月23日 星期二 @issue/JC
                            {x: $p1.x - 50, y:$p1.y},
                            {x: $p1.x - 50, y:$p2.y},

                            {x: $p2.x, y:$p2.y}
                        ]
                    }
                    $lineInstance = this.$flow.bow(bowOption)
                    $lineInstance.position = {from: $p1.position, to: $p2.position}
                    $lineInstance.arrow.attr({
                        'fill': bkgLineCol,
                        'stroke': bkgLineCol
                    })
                }
                else{
                    var $p1 = fromNd.getStlnP()
                    var $p2 = toNd.getEnlnP()                        
                    if(rightAngle){
                        $lineInstance = this.$flow.rightAngleLine({
                            p1: {x:$p1.x, y:$p1.y},
                            p2: {x:$p2.x, y:$p2.y}
                        })
                    }
                    else{
                        $lineInstance = this.$flow.line([$p1.x, $p1.y], [$p2.x, $p2.y])
                    }
                    $lineInstance.position = {from: $p1.position, to: $p2.position}
                }
                fromNd.recordLine('from', $lineInstance)
                toNd.recordLine('to', $lineInstance)

                var runIdx = this.nodeRunedMk(to)
                if(runIdx && $lineInstance){                    
                    // 连线
                    $lineInstance.c.attr({
                        // 'fill': bkgRunedCol,
                        'stroke': bkgRunedCol,
                    })

                    // 箭头类型
                    if($lineInstance.arrow){
                        $lineInstance.arrow.attr({
                            'fill': bkgRunedCol,
                            'stroke': bkgRunedCol,
                        })
                    }

                    // 目标节点
                    toNd.c.attr({
                        'stroke': bkgRunedCol,
                    })
                    // 不重复填充颜色
                    if(runIdx == 2){
                        // 来源节点
                        fromNd.c.attr({
                            'stroke': bkgRunedCol,
                        })
                    }
                }
            }
            // else{
            //     this.leastLineQue.push({
            //         from,
            //         to
            //     })
            // }
        }

        __WEBPACK_IMPORTED_MODULE_1__util__["a" /* Util */].each(this.leastLineQue, function(index, dd){
            //console.log(dd)
            makerLine(dd.from, dd.to)
        })
    }
    /**
     * 设置配置文件信息
     * @param {*} option 
     */
    setOption(option){
        if('object' == typeof option){
            this.option = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* Util */].clone(option)
        }
    }
    /**
     * 根据code获取节点信息
     * @param {string} code 
     */
    getNodeByCode(code){
        var node = null
        var value = this.cNodeMap(code)
        if(value){
            node = value
        }
        return node
    }    
    /**
     * 代码分级算法
     * @param {object} steps 
     */
    codeIndex(steps){
        // 生成分级字典
        if('object' == typeof steps){
            var clsMap = {}
            for(var i=0; i<steps.length; i++){
                var step = steps[i]
                var code = step.code
                // 第一级
                if(!step.prev){
                    clsMap[code] = 1
                }
                else{
                    var prev = step.prev.replace(/\s/g, '').split(',')
                    for(var j=0; j<prev.length; j++){
                        var prevCode = prev[j]
                        var cls = clsMap[prevCode] ? clsMap[prevCode]: 0
                        // console.log(cls)
                        if('object' == typeof cls && cls.length){
                            cls = cls.length == 1? cls[0]: cls
                        }
                        cls += 1
                        if(!clsMap[code]){
                            clsMap[code] = cls
                        }else{
                            if('object' != typeof clsMap[code]){
                                var cls2 = clsMap[code]
                                clsMap[code] = [cls2]
                            }
                            clsMap[code].push(cls)
                            clsMap[code] = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* Util */].ArrayMergeSameValue(clsMap[code])
                        }
                    }
                }
            }
            // console.log(clsMap)
            __WEBPACK_IMPORTED_MODULE_2__helper__["a" /* default */].src(this.$index, 'clsMap', clsMap)
        }
        else if(steps){
            var clsMap = __WEBPACK_IMPORTED_MODULE_2__helper__["a" /* default */].src(this.$index, 'clsMap')
            if(clsMap){
                var value = clsMap[steps] || null
                var List = [steps]
                for(var k in clsMap){
                    if(value == clsMap[k] && $.inArray(k, List) == -1){
                        List.push(k)
                    }
                }
                return List
            }
            
        }
    }
    /**
     * 节点表单x坐标
     * @param {NodeBase} nd 
     */
    getStandX(nd){
        var x = null
        if(nd && nd.c){
            var $c = nd.c
            switch($c.type){
                case 'circle':
                    x = $c.attr('cx')
                    break
                case 'rect':
                    x = $c.attr('x') + $c.attr('width')/2
                    break
                case 'path':
                    x = nd.opt.cx
                    break
            }
        }
        return x
    }
    /**
     * 节点表单Y坐标
     * @param {NodeBase} nd 
     */
    getStandY(nd){
        var y = null
        if(nd && nd.c){
            var $c = nd.c
            switch($c.type){
                case 'circle':
                    y = $c.attr('cy')
                    break
                case 'rect':
                    y = $c.attr('y') + $c.attr('height')/2
                    break
                case 'path':
                    y = nd.opt.cy
                    break
            }
        }
        return y
    }
    /**
     * 移除全部的边框
     */
    removeBBox(){
        var maps = this.cNodeMap()
        for(var k in maps){
            var node = maps[k]
            if(node.bBox){
                node.bBox.remove()
            }
        }
    }
    /**
     * 事件绑定处理方法
     */
    _eventBind(node){
        var $this = this
        // 点击处理
        node.c.click(function(){
            $this.removeBBox()
            if(node.bBox){
                node.bBox.remove()
            }
            var bt = this.getBBox()
            var dt = 5
            node.bBox = node.instance.rect(bt.x-dt, bt.y-dt, bt.width+dt*2, bt.height+dt*2)
            node.bBox.attr({
                'stroke': $this.conf('bkgNodeBox', 'rgb(15, 13, 105)')
            })
        })

        // 文本编辑器
        var hasTexteditor = this.conf('texteditor', false)
        var $label = node.label
        if(hasTexteditor && $label){
            // 双击事件
            var txtEditor = this.conf('texteditor')
            txtEditor = 'object' == typeof txtEditor? txtEditor: {}
            txtEditor.id = txtEditor.id? txtEditor.id:'worker-txteditor'
            txtEditor.class = txtEditor.class? txtEditor.class:'worker-txteditor-div'
            $label.dblclick(function(){
                var text = $label.attr('text')
                var $input = $('#' + txtEditor.id)
                if($input.length == 0){
                    var texteditorHtml = '<div class="'+txtEditor.class+'">' +
                        '<input type="text" id="'+txtEditor.id+'">' +
                        '</div>'    
                    $('body').append(texteditorHtml)
                    $input = $('#' + txtEditor.id)
                }
                $input.show()
                $input.val(text)
                $input.css({
                    'top': $label.attr('y'),
                    'left': $label.attr('x')
                })
                $input.focus()
                $input.off('blur').on('blur', function(){
                // $input.off('change').on('change', function(){
                    var dom = $(this)
                    var txt = dom.val()
                    if(txt){
                        $label.attr('text', txt)
                    }
                    dom.hide()

                    // 自动适应文本的宽度
                    if('function' == typeof node.resizeByText){
                        node.resizeByText()
                    }
                })
            })
        }
    }
    /**
     * 配置键获取
     * @param {string} key 
     * @param {*} def 
     */
    conf(key, def){
        def = def || null
        if('undefined' != typeof this.config[key]){
            def = this.config[key]
        }
        return def
    }
    /**
     * 是否为已经执行的节点
     * @param {string} code 
     * @returns {bool}
     */
    nodeRunedMk(code){
        var currentCode = this.conf('currentCode', false)
        if(currentCode){
            var cc = __WEBPACK_IMPORTED_MODULE_2__helper__["a" /* default */].src(this.$index, '_nodeCls') 
            var refIdx = cc.map[currentCode]
            var idx = cc.map[code]
            // console.log(refIdx, idx, code, idx <= refIdx)
            currentCode = (idx <= refIdx)? idx:false
        }
        return currentCode
    }
    /**
     * 页面编辑器
     */
    static editor(config){
        return new __WEBPACK_IMPORTED_MODULE_3__WorkerEditor__["a" /* default */](config)
    }
}

// 静态属性
Worker.Version = __WEBPACK_IMPORTED_MODULE_4__version__["a" /* default */]

/* harmony default export */ __webpack_exports__["a"] = (Worker);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(2)))

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__NodeBase__ = __webpack_require__(1);
/**
 * 2018年1月5日 星期五
 * 端点处理
 */



class NodeEndpoint extends __WEBPACK_IMPORTED_MODULE_1__NodeBase__["a" /* default */]{
    /**
     * 
     * @param {*} instance Raphael 实例
     */
    constructor(instance){
        super()
        this.NodeType = 'endpnt'
        this.instance = instance
        this.opt = {}
    }
    /**
     * @param {object} opt / [cx, cy, r, text]
     */
    create(opt){
        // 解析类型
        if('object' != typeof opt){
            var param = arguments
            opt = {
                cx: param[0],
                cy: param[1],
                r: param[2]
            }
            if(param[3]){
                opt.text = param[3]
            }
        }
        opt.h = opt.h? opt.h:opt.r
        this.minWidth = opt.r * 2
        this.opt = opt
        // 容器
        this.c = this.instance.ellipse(opt.cx, opt.cy, opt.r, opt.h)     // 椭圆
        // 标签
        var label
        if(opt.text){
            label = this.instance.text(opt.cx, opt.cy, opt.text)
        }else{
            label = this.instance.text(opt.cx, opt.cy)
        }
        this.label = label
        this.resizeByText()
    }
    /**
     * 根据文本宽度自动适应文本的宽度
     */
    resizeByText(){
        if(this.label){
            var box = this.label.getBBox()
            var width = Math.ceil(box.width)
            var w = this.c.attr('rx')
            if(width < this.minWidth && w<this.minWidth){
                return
            }
            // 保持最小宽度
            if(width < this.minWidth){
                width = this.minWidth
            }else{
                width += 2
            }            
            this.opt.r = width/2
            this.resizeByOpt()
        }     
    }
    /**
     * 根据 opt 值的改变重调整容器形状大小
     */
    resizeByOpt(){
        var opt = this.opt
        this.c.attr({
            cx: opt.cx,
            cy: opt.cy,
            rx: opt.r,
            ry: opt.h
        })
    }
    // 外部移动坐标处理， 
    move(x, y){        
        // 容器移动
        this.c.attr({
            cx: x,
            cy: y
        })
        // 文本联动
        this.label.attr({
            x,y
        })
        // 同步属性
        this.opt.cx = x
        this.opt.cy = y
        /*
        // 直线同步移动
        this.syncLineMove((lnC, type) => {
            if(type == 'from'){
                var $fPath = lnC.attr('path')
                var dP = this.getDp(x, y)
                lnC.attr('path', [
                    ['M', dP.x, dP.y],
                    $fPath[1]
                ])
            }
            else if(type == 'to'){
                var bP = this.getBp(x, y)
                var $tPath = lnC.attr('path')
                lnC.attr('path', [
                    $tPath[0],
                    ['L', bP.x, bP.y]
                ])
            }
        })
        */
    }
    // 直线同步移动
    ToSyncLine(x, y){
        this.syncLineMove((lnC, type, $ln) => {
            var position = $ln.position
            var methodName      
            if(type == 'from'){
                var $fPath = lnC.attr('path')
                methodName = 'get'+position.from+'p'
                var p1 = this[methodName](x, y)
                $fPath[0] = ['M', p1.x, p1.y],
                lnC.attr('path', $fPath)
            }
            else if(type == 'to'){
                var $tPath = lnC.attr('path')
                methodName = 'get'+position.to+'p'
                var p2 = this[methodName](x, y)
                $tPath[$tPath.length-1] = ['L', p2.x, p2.y];
                lnC.attr('path', $tPath)
            }
        })
    }
    // 箭头同步移动
    ToSyncArrow(x, y){
        this.syncLineMove((lnC, type, $ln) => {
            var position = $ln.position
            var methodName            
            if(type == 'from'){
                methodName = 'get'+position.from+'p'
                var p1 = this[methodName](x, y)
                $ln.updatePath([p1.x, p1.y])
            }
            else if(type == 'to'){
                methodName = 'get'+position.to+'p'
                var p2 = this[methodName](x, y)
                $ln.updatePath(null, [p2.x, p2.y])
            }
        })
    }
    // 获取连线的起点节点
    getStlnP(position){
        position = position? position: 'D'
        var methodName = 'get' + position + 'p'
        var p = this[methodName]()
        p.position = position
        return p
    }
    // 获取连线的终点节点
    getEnlnP(position){
        position = position? position: 'B'
        var methodName = 'get' + position + 'p'
        var p = this[methodName]()
        p.position = position
        return p
    }
    getAp(x, y){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        x -= opt.r
        return {x, y}
    }
    getBp(x, y){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        y -= opt.r
        return {x, y}
    }
    getCp(x, y){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        x += opt.r
        return {x, y}
    }
    getDp(x, y){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        y += opt.r
        return {x, y}
    }
}

/* harmony default export */ __webpack_exports__["a"] = (NodeEndpoint);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__NodeBase__ = __webpack_require__(1);
/**
 * 2018年1月5日 星期五
 * 操作处理节点
 */


class NodeOperation extends __WEBPACK_IMPORTED_MODULE_0__NodeBase__["a" /* default */]{
    /**
     * 
     * @param {*} instance Raphael 实例
     */
    constructor(instance){
        super()
        this.NodeType = 'opera'
        this.instance = instance
        this.opt = {}       // 配置信息数据
        this.bBox = null    // 边缘盒子数据示例
    }
    /**
     * @param {object} opt / [cx, cy, w, h, text]
     */
    create(opt){
        // 解析类型
        if('object' != typeof opt){
            var param = arguments
            opt = {
                cx: param[0],
                cy: param[1],
                w: param[2],
                h: param[3],
            }
            if(param[4]){
                opt.text = param[4]
            }
        }
        this.opt = opt
        this.minWidth = opt.w       // 最小宽度
        // 容器        
        var ap = this.getAp()
        this.c = this.instance.rect(ap.x, ap.y, opt.w, opt.h)
        // 标签
        var label
        if(opt.text){
            label = this.instance.text(opt.cx, opt.cy, opt.text)
        }else{
            label = this.instance.text(opt.cx, opt.cy)
        }
        this.label = label
        // 自动调整文本宽度
        this.resizeByText()
    }
    /**
     * 根据文本宽度自动适应文本的宽度
     */
    resizeByText(){
        if(this.label){
            //console.log(this.label.getBBox())
            var box = this.label.getBBox()
            var width = Math.ceil(box.width)
            var w = this.c.attr('w')
            if(width < this.minWidth && w<this.minWidth){
                return
            }
            // 保持最小宽度
            if(width < this.minWidth){
                width = this.minWidth
            }else{
                width += 10
            }
            this.opt.w = width
            var ap = this.getAp()
            this.c.attr({
                width: width,
                x: ap.x,
                y: ap.y
            })
        }
    }    

    // 外部移动坐标处理
    move(x, y){
        var ctP = this.getCtpByAp(x, y)
        this.c.attr({
            x, y
        })
        this.label.attr(ctP)
        this.opt.cx = x
        this.opt.cy = y
    }
    // 直线同步移动
    ToSyncLine(x, y){
        var ctP = this.getCtpByAp(x, y)
        // 直线同步移动
        this.syncLineMove((lnC, type, $ln) => {
            var position = $ln.position, methodName
            if(type == 'from'){
                var $fPath = lnC.attr('path')
                methodName = 'get'+position.from+'p'
                var p1 = this[methodName](ctP.x, ctP.y)
                $fPath[0] = ['M', p1.x, p1.y]
                lnC.attr('path', $fPath)
            }
            else if(type == 'to'){
                methodName = 'get'+position.to+'p'
                var p2 = this[methodName](ctP.x, ctP.y)
                var $tPath = lnC.attr('path')
                $tPath[$tPath.length -1] = ['L', p2.x, p2.y]
                lnC.attr('path', $tPath)
            }
        })
    }
    // 箭头同步移动
    ToSyncArrow(x, y){
        var ctP = this.getCtpByAp(x, y)
        this.syncLineMove((lnC, type, $ln) => {
            var position = $ln.position, methodName
            if(type == 'from'){
                methodName = 'get'+position.from+'p'
                var bP = this[methodName](ctP.x, ctP.y)         
                $ln.updatePath([bP.x, bP.y])
            }
            else if(type == 'to'){
                methodName = 'get'+position.to+'p'
                var dP = this[methodName](ctP.x, ctP.y)
                $ln.updatePath(null, [dP.x, dP.y])
            }
        })
    }
    // // 箭头v2 同步机制 移动
    // ToSyncBow(x, y){
    //     var ctP = this.getCtpByAp(x, y)
    //     this.syncLineMove((lnC, type, $ln) => {
    //         var position = $ln.position, methodName
    //         if(type == 'from'){
    //             methodName = 'get'+position.from+'p'
    //             var bP = this[methodName](ctP.x, ctP.y)         
    //             $ln.updatePath([bP.x, bP.y])
    //         }
    //         else if(type == 'to'){
    //             methodName = 'get'+position.to+'p'
    //             var dP = this[methodName](ctP.x, ctP.y)
    //             $ln.updatePath(null, [dP.x, dP.y])
    //         }
    //     })
    // }
    // 获取连线的起点节点
    getStlnP(position){
        position = position? position: 'Bt'
        var methodName = 'get' + position + 'p'
        var p = this[methodName]()
        p.position = position
        return p
    }
    // 获取连线的终点节点
    getEnlnP(position){
        position = position? position: 'T'
        var methodName = 'get' + position + 'p'
        var p = this[methodName]()
        p.position = position
        return p
    }
    // 根据 A 点获取 中心点
    getCtpByAp(x, y){
        var opt = this.opt
        x += opt.w/2
        y += opt.h/2
        return {x, y}
    }
    getAp(x, y){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        x -= opt.w/2
        y -= opt.h/2
        return {x, y}
    }
    getBp(x, y){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        x -= opt.w/2
        y += opt.h/2
        return {x, y}
    }
    getCp(x, y){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        x += opt.w/2
        y += opt.h/2
        return {x, y}
    }
    getDp(x, y){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        x -= opt.w/2
        y += opt.h/2
        return {x, y}
    }
    getTp(x, y){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        y -= opt.h/2
        return {x, y}
    }
    getRp(x, y){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        x += opt.w/2
        return {x, y}
    }
    getBtp(x, y){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        y += opt.h/2
        return {x, y}
    }
    getLp(x, y){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        x -= opt.w/2
        return {x, y}
    }
}

/* harmony default export */ __webpack_exports__["a"] = (NodeOperation);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/**
 * 2018年1月5日 星期五
 * 连接类型： 连线
 */

class NodeLine{
    /**
     * 
     * @param {*} instance Raphael 实例
     */
    constructor(instance){
        this.NodeType = 'line'
        this.instance = instance
        this.opt = {}       // 配置信息数据
        this.position = {}      // 连接点
        /*
            {from: A/B/C/D, to: A/B/C/D}
        */

        this.rightAngle = false // 直线直角连法
    }
    create(p1, p2){
        this.opt = {
            p1, p2
        }
        this.c = this.instance.path(
            'M' + p1[0] + ',' + p1[1] + 
            'L' + p2[0] + ',' + p2[1]
        )
    }
    /**
     * 直角连接法
     * @param {object} opt {p1{x,y}, p2, d}
     */
    RightAngle(opt){
        this.opt = opt
        this.rightAngle = true
        var p1 = opt.p1, 
            p2 = opt.p2,
            d0 = 20
        if(opt.d){
            d0 = opt.d
        }
        var middlePathStr = ''
        if(p1.x != p2.x && p1.y != p2.y){
            var d1 = p2.x - p1.x
            middlePathStr = 
                'L' + (p1.x+d1 + d0*(d1>0? 1:-1)) + ',' + p1.y + 
                'L' + (p1.x+d1 + d0*(d1>0? 1:-1)) + ',' + p2.y + 
                ''
        }

        this.c = this.instance.path(
            'M' + p1.x + ',' + p1.y + 
            middlePathStr + 
            'L' + p2.x + ',' + p2.y
        )
    }

    /**
     * 直接通过坐标点生成直线
     * @param {object} point 
     */
    createByPoint(point){
        this.opt = point
        var pathStr = ''
        __WEBPACK_IMPORTED_MODULE_0__util__["a" /* Util */].each(this.opt.points, (index, value) => {
            if(value){
                pathStr += (pathStr? 'L':'M') + value.x + ',' + value.y
            }
        })
        this.c = this.instance.path(pathStr)
    }
}

/* harmony default export */ __webpack_exports__["a"] = (NodeLine);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 2018年1月6日 星期六
 * 连接类型： 箭头
 */

class NodeArrow{
    /**
     * 
     * @param {*} instance Raphael 实例
     */
    constructor(instance){
        this.NodeType = 'arrow'
        this.instance = instance
        this.opt = {}           // 配置信息数据
        this.position = {}      // 连接点
        /*
            {from: A/B/C/D, to: A/B/C/D}
        */
    }
    /**
     * 画箭头，p1 开始位置,p2 结束位置, r前头的边长
     * @param {*} p1 [x,y]
     * @param {*} p2 [x,y]
     * @param {*} r  
     */
    create(p1, p2, r){
        this.opt = {
            p1, p2, r
        }
        // 非同 x 线
        var points = this.getPoints()
        this.c = this.instance.path(
            'M' + p1[0] + ',' + p1[1] + 
            'L' + p2[0] + ',' + p2[1] + 
            'L' + points.cP.x + ',' + points.cP.y + 
            'L' + points.dP.x + ',' + points.dP.y + 
            'L' + p2[0] + ',' + p2[1]
        )
    }
    // 获取点序列
    getPoints(p1, p2, r){
        var opt = this.opt
        if(!p1){
            p1 = opt.p1
        }
        if(!p2){
            p2 = opt.p2
        }
        if(!r){
            r = opt.r
        }
        var atan = Math.atan2(p1[1] - p2[1], p2[0] - p1[0]) * (180 / Math.PI);

        var centerX = p2[0] - r * Math.cos(atan * (Math.PI / 180));
        var centerY = p2[1] + r * Math.sin(atan * (Math.PI / 180));

        var x2 = centerX + r * Math.cos((atan + 120) * (Math.PI / 180));
        var y2 = centerY - r * Math.sin((atan + 120) * (Math.PI / 180));

        var x3 = centerX + r * Math.cos((atan + 240) * (Math.PI / 180));
        var y3 = centerY - r * Math.sin((atan + 240) * (Math.PI / 180));
        return {
            cP: {x:x2, y:y2},
            dP: {x:x3, y:y3}
        }
    }
    /**
     * 更细记录表
     * @param {*} p1 
     * @param {*} p2 
     * @param {*} r 
     */
    updatePath(p1, p2, r){
        var opt = this.opt
        if(!p1){
            p1 = opt.p1
        }
        if(!p2){
            p2 = opt.p2
        }
        if(!r){
            r = opt.r
        }
        var points = this.getPoints(p1, p2, r)
        this.c.attr('path', [
            ['M', p1[0], p1[1]],
            ['L', p2[0], p2[1]],
            ['L', points.cP.x, points.cP.y],
            ['L', points.dP.x,  points.dP.y],
            ['L', p2[0], p2[1]]
        ])
        // 同步更新记录
        this.opt = {
            p1, p2, r
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (NodeArrow);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 2018年1月23日 星期二
 * 弓形箭头
 */
/**
 * 
 * 
 * @class NodeBow
/**
 * 
 * 
 * @class NodeBow
 */
class NodeBow{
    /**
     * 
     * @param {*} instance Raphael 实例
     */
    constructor(instance){
        this.NodeType = 'bow'
        this.instance = instance
        this.opt = {}           // 配置信息数据
        this.position = {}      // 连接点
        /*
            {from: A/B/C/D, to: A/B/C/D}
            this.arrow = 箭头实例
            this.body = 箭体实例
        */
    }
    /**
     * 弓形箭头创建
     * @param {*} opt   {r: 直径, queue:[点队列]}
     */
    create(opt){
        this.opt = opt
        this.queueCheck()
        this.bodySharp()
        this.arrowSharp()
    }
    /**
     * 箭头
     */
    arrowSharp(){
        var opt = this.opt
        var pointQue = opt.queue
        var r = opt.r? opt.r: 5
        var len = pointQue.length
        var p2 = pointQue[len - 1]
        var p1 = pointQue[len - 2]

        // 系统
        var atan = Math.atan2(p1.y - p2.y, p2.x - p1.x) * (180 / Math.PI);
        var centerX = p2.x - r * Math.cos(atan * (Math.PI / 180));
        var centerY = p2.y + r * Math.sin(atan * (Math.PI / 180));

        var x2 = centerX + r * Math.cos((atan + 120) * (Math.PI / 180));
        var y2 = centerY - r * Math.sin((atan + 120) * (Math.PI / 180));

        var x3 = centerX + r * Math.cos((atan + 240) * (Math.PI / 180));
        var y3 = centerY - r * Math.sin((atan + 240) * (Math.PI / 180));

        if(!this.arrow){
            this.arrow = this.instance.path(
                'M' + p2.x + ',' + p2.y +
                // 箭头体
                'L' + x2 + ',' + y2 + 
                'L' + x3 + ',' + y3 + 
                'L' + p2.x + ',' + p2.y
            )
        }
        else{
            this.arrow.attr('path', [
                ['M', p2.x, p2.y],
                // 箭头体
                ['L', x2, y2],
                ['L', x3, y3],
                ['L', p2.x, p2.y]
            ])
        }
    }
    /**
     * 键体
     */
    bodySharp(){
        var queue = this.opt.queue
        var pathStr = ''
        var pathArr = []
        var hasInstance = false,
            isM = true
        hasInstance = this.c? true: false

        for(var i=0; i<queue.length; i++){
            var que = queue[i]
            if(hasInstance){
                if(isM){
                    if(pathArr.length > 0){
                        isM = false
                    }
                }
                pathArr.push([isM? 'M':'L', que.x, que.y])
            }else{
                pathStr += (pathStr? 'L':'M') + ',' + que.x + ',' + que.y
            }
        }
        if(hasInstance){
            this.c.attr('path', pathArr)
        }
        else{            
            this.c = this.instance.path(pathStr)
        }
    }
    /**
     * 点队列检测
     */
    queueCheck(){
        var queue = this.opt.queue
        // 双点检测  “ 7 形 ”
        if(queue.length == 2){
            var middlePoint = []
            var p1 = queue[0],
                p2 = queue[1]
            if(p1.x < p2.x){
                middlePoint.push({x:p2.x, y:p1.y})
            }
            else if(p1.x > p2.x){
                // 20 @issue 需要可配置接口
                middlePoint.push({x:p1.x, y:p2.y-20})
                middlePoint.push({x:p2.x, y:p2.y-20})
            }
            this.opt.queue = [p1].concat(middlePoint, p2)
        }
    }
    /**
     * 更细记录表
     * @param {*} p1 
     * @param {*} p2 
     * @param {*} r 
     */
    updatePath(p1, p2, r){
        var opt = this.opt
        if(p1){
            opt.queue[0] = {x:p1[0], y:p1[1]}
        }
        if(p2){
            var len = opt.queue.length - 1
            opt.queue[len] = {x:p2[0], y:p2[1]}
        }

        // 自适应的星形状变化
        this.queueCheck()
        this.bodySharp()
        this.arrowSharp()
    }
}

/* harmony default export */ __webpack_exports__["a"] = (NodeBow);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_NodeJudge__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__flow__ = __webpack_require__(3);
/**
 * 2018年3月1日 星期四
 * worker 工作流编辑器
 */
            // 助手方法




// 配置参数常量 , type 1801 为特殊类型
const Conf = {
    start: {
        type: 1,
        text: '开始'
    },
    opera: {
        type: 2,
        text: '任务'
    },
    judge: {
        type: 3,
        text: '判断'
    },
    end: {
        type: 9,
        text: '结束'
    },
    arrow: {
        type: 1801,
        text: '箭头'
    },
    text: {
        type: 1802,
        text: '文本框',
        size: 10,            // 默认大小
        selected:{              // 选择属性
            'font-size':20,
            'fill':'red'
        },
        // 默认属性
        defAtrr:{
            'font-size':10,
            'fill':'black'
        }
    }
}
/**
 * 工作流编辑器轻量级
 */
class WorkerEditor{
    /**
     * @param {object} config 数据配置项
     */
    constructor(config){
        this.config = config            // 系统配置参数
        this.raphael = __WEBPACK_IMPORTED_MODULE_0__helper__["a" /* default */].createInstance(config) // Raphael 对象        
        // 配置参数处理
        this._configMergeToDefule()
        this._rIdx = 0                          // 内部索引，用于生成代码
        this._code2EidDick = {}                 // 内部代码与元素id的映射字段
        this._LineDragingP = null               // RaphaelElement 直线正在拖动记录点
        this.flow = new __WEBPACK_IMPORTED_MODULE_2__flow__["a" /* Flow */](this.raphael)      // 工作流程按钮
        // 内部缓存数组件容器： 节点、连接线、独立文本
        this.nodeQueues = []                         // 运行节点数
        this.lineQueues = []                    // 连线记录器
        this.textQueues = []
        this.tempNodes = []                     // 临时节点集
        this.MagneticCore = null                // 连线磁化中心点，用于节点关联，单状态的结构 data: {type: from/to}
        // 工具栏显示控制
        if(!this.config.noToolBar){
            this._toolbar()
        }
        if(this.config.stepCfg){
            try {
                this.loadStep(this.config.stepCfg)
            } catch (error) {
                console.log(error)
            }
        }
    }
    /**
     * 配置参数与默认参数和合并处理
     */
    _configMergeToDefule(){
        // pkgClr 背景颜色
        var pkgClr = this.config.pkgClr || {}
        pkgClr.start = pkgClr.start || 'rgb(181, 216, 126)'
        pkgClr.opera = pkgClr.opera || 'rgb(224, 223, 226)'
        pkgClr.judge = pkgClr.judge || 'rgb(49, 174, 196)'
        pkgClr.end = pkgClr.end || 'rgb(34, 185, 41)'
        pkgClr.arrow = pkgClr.arrow || 'rgb(3, 84, 41)'
        pkgClr.NodeBox = pkgClr.NodeBox || 'rgb(15, 13, 105)'

        this.config.pkgClr = pkgClr
        this.config.prefCode = this.config.prefCode || 'A' // 内部代码前缀
        this.config.listener = this.config.listener || {}   // 监听事件

        this.config.noToolBar = this.config.noToolBar || false
    }
    /**
     * 工具集按钮栏
     */
    _toolbar(){
        // 工具栏参数信息
        var $tool = {}  
        var raphael = this.raphael
        var ctX = 5, 
            ctY = 5,
            ctW = 75,
            ctH = 300,
            x = ctX, y = ctY,            // 当前坐在的位置坐标
            config = this.config,
            pkgClr = config.pkgClr
        
        // 拖动处理            
        // var dragHandlerEvnt = function(){}

        // 容器集
        $tool.containerIst = raphael.rect(ctX, ctY, ctW, ctH)
        $tool.containerIst.attr('fill', '#ffffff')      // 容器底色

        // 开始
        x += 20, y += 50
        $tool.startIst = raphael.ellipse(x, y, 8, 6)
        $tool.startIst.attr('fill', pkgClr.start)
        $tool.startTxtIst = raphael.text(x+30, y, Conf.start.text)

        // 流程
        y += 20
        $tool.operaIst = raphael.rect(x-8, y, 16, 12)
        $tool.operaIst.attr('fill', pkgClr.opera)
        $tool.operaTxtIst = raphael.text(x+30, y+4, Conf.opera.text)

        // 判断
        y += 30
        $tool.judgeIst = (new __WEBPACK_IMPORTED_MODULE_1__node_NodeJudge__["a" /* default */](raphael)).onlyCell(x, y, 16, 12)
        $tool.judgeIst.attr('fill', pkgClr.judge)
        $tool.judgeTxtIst = raphael.text(x+30, y, Conf.judge.text)

        // 结束
        y += 30
        $tool.endIst = raphael.ellipse(x, y, 8, 6)
        $tool.endIst.attr('fill', pkgClr.end)
        $tool.endTxtIst = raphael.text(x+30, y, Conf.end.text)

        // 箭头
        y += 30
        $tool.arrowIst = this.flow.arrow([x-5,y], [x+10, y], 3)
        $tool.arrowIst.c.attr('fill', pkgClr.arrow)
        $tool.arrowTxtIst = raphael.text(x+30, y, Conf.arrow.text)


        // 文本框
        y += 30
        $tool.textInst = this.raphael.text(x+10, y, Conf.text.text)

        this.$tool = $tool
        this._toolbarDragEvt()
    }
    /**
     * 工具栏拖动处理
     */
    _toolbarDragEvt(){
        // console.log(this.$tool)
        var $this = this
        var pkgClr = this.config.pkgClr
        // 拖动处理    
        var dragHandlerEvnt = function(node, type){
            $this.MagneticCore = null           // 移动工具栏时磁芯消失
            var cDragDt = {}
            node.drag(
                function(dx, dy){   // moving
                    // console.log(type)
                    // console.log(dx, dy)
                    // cDragDt = {dx, dy}
                    dx += cDragDt.dx
                    dy += cDragDt.dy
                    var newElem = $this.getLastElem()
                    if(newElem){
                        newElem.move(dx, dy)
                    }
                },
                function(){         // start
                    // cDragDt = {dx: 0, dy: 0}
                    var _x, _y
                    if(2 == type){
                        _x = this.attr('x')
                        _y = this.attr('y')
                    }else if(3 == type){
                        var tpPath = this.attr('path')
                        var tpPath0 = tpPath[0]
                        _x = tpPath0[1]
                        _y = tpPath0[2]
                    }else{
                        // console.log(this)
                        _x = this.attr('cx')
                        _y = this.attr('cy')
                    }
                    
                    cDragDt.dx = _x + 5
                    cDragDt.dy = _y + 10

                    // cDragDt.x = _x
                    // cDragDt.y = _y
                    // console.log(cDragDt)
                    $this._createNode(cDragDt, type)
                },
                function(){         // end
                    // if(cDragDt.dx < 75 || cDragDt.dy < 50){
                    //     return null
                    // }
                    // $this._createNode(cDragDt, type)
                }
            )
        }
        // 开始
        dragHandlerEvnt(this.$tool.startIst, Conf.start.type)
        dragHandlerEvnt(this.$tool.startTxtIst, Conf.start.type)

        // 流程
        dragHandlerEvnt(this.$tool.operaIst, Conf.opera.type)
        dragHandlerEvnt(this.$tool.operaTxtIst, Conf.opera.type)

        // 判断
        dragHandlerEvnt(this.$tool.judgeIst, Conf.judge.type)
        dragHandlerEvnt(this.$tool.judgeTxtIst, Conf.judge.type)

        // 结束
        dragHandlerEvnt(this.$tool.endIst, Conf.end.type)
        dragHandlerEvnt(this.$tool.endTxtIst, Conf.end.type)

        // 特殊部件生成器
        // dragHandlerEvnt(this.$tool.arrowIst, Conf.arrow.type)
        // console.log(this.$tool.arrowIst)
        // this.$tool.arrowIst.c.drag()
        var arrowDragHandler = function(ist){
            var cDragDt = {x: 0, y: 0};
            var innerTmpArror = null
            ist.drag(
                function(x, y){
                    x += cDragDt.x
                    y += cDragDt.y
                    if(innerTmpArror){
                        innerTmpArror.updatePath([x, y], [x + 50, y])
                    }
                },
                function(){
                    if('text' == ist.type){
                        cDragDt.x = ist.attr('x')                        
                        cDragDt.y = ist.attr('y')                        
                    }
                    else{
                        var pathA1 = ist.attr('path')
                        pathA1 = pathA1[0]
                        cDragDt.x = pathA1[1]
                        cDragDt.y = pathA1[2]
                    }
                    // 生成连线
                    innerTmpArror = $this.flow.arrow([cDragDt.x, cDragDt.y], [cDragDt.x + 50, cDragDt.y], 5)
                    innerTmpArror.c.attr('fill', pkgClr.arrow);
                    $this._lineTragEvent(innerTmpArror)                    
                    $this.lineQueues.push(innerTmpArror)
                },
                function(){
                }
            )
            // })()
        }
        arrowDragHandler(this.$tool.arrowIst.c)
        arrowDragHandler(this.$tool.arrowTxtIst);

        // 文字拖动
        (function(){
            var _dragDt = {x: 0, y:0}
            var tmpTxtInst = null   // 临时文本
            $this.$tool.textInst.drag(
                function(x, y){
                    x += _dragDt.x
                    y += _dragDt.y
                    if(tmpTxtInst){
                        tmpTxtInst.attr({x, y})
                    }
                },
                function(){
                    _dragDt.x = this.attr('x') + 5
                    _dragDt.y = this.attr('y') + 5
                    tmpTxtInst = $this.raphael.text(_dragDt.x, _dragDt.y, '文本框')
                    $this._textBindEvent(tmpTxtInst)
                    $this.textQueues.push(tmpTxtInst)
                },
                function(){}
            )
        })()
    }
    /**
     * 获取
     */
    _getOrderCode(){
        this._rIdx += 1
        var code = this.config.prefCode + this._rIdx
        // 判断序列号是否已经存在
        if(this._code2EidDick[code]){
            code = this._getOrderCode()
        }
        return code
    }
    /**
     * 移除全部的边框
     */
    removeBBox(){
        this.MagneticCore = null
        // 系统节点
        var nodes = this.nodeQueues
        for(var i=0; i<nodes.length; i++){
            var node = nodes[i]
            if(node.bBox){
                node.bBox.remove()
                node.bBox = null    // 清空 bBox 
            }
        }
        // 临时节点
        this.removeTempNodes()
        // 直线选中删除
        var lines = this.lineQueues
        for(var k=0; k<lines.length; k++){
            var line = lines[k]
            if(lines.selectEdMk){
                line.selectEdMk = false
            }
        }
        // 移除配置属性
        this.removeIntersectMk()
        // 删除文本选中状态
        this._removeTxtSelect()
        this.tempNodes = []
    }
    /**
     * 删除临时节点
     * @returns {this}
     */
    removeTempNodes(){
        // 临时节点
        var tempNodes = this.tempNodes
        for(var j=0; j<tempNodes.length; j++){
            var tNode = tempNodes[j]
            tNode.remove()
        }
    }
    /**
     * 删除节点, 为空是删除当前选中的节点
     * @param {RaphaelElement|string|null} code 
     */
    removeNode(code){
        if(!code){
            code = this.getSelected()
        }
        if(code){
            var node = 'object' == typeof code? code : 
                (this._code2EidDick[code]? this.raphael.getById(this._code2EidDick[code]):this.raphael.getById(code))
            if('object' == typeof node){
                // 删除实体数据
                var id = node.id    // id 数据
                var isConnectMk = false // 是否为连接线
                if(node.NodeType == 'arrow'){
                    isConnectMk = true
                }
                if(node.bBox){
                    node.bBox.remove()
                    node.bBox = null
                }
                // 文本
                if(node.label){
                    node.label.remove()
                    node.label = null
                }
                // 连线选择标识
                if(node.selectEdMk){
                    node.selectEdMk = false
                }
                node.c.remove();
                node = null // 覆盖并或删除数据
                // 清除连接线中的缓存器
                if(isConnectMk){
                    var lines = this.lineQueues
                    var newLineQ = []
                    for(var x=0; x<lines.length; x++){
                        var line = lines[x]
                        if(id == line.c.id){
                            continue
                        }
                        newLineQ.push(line)
                    }
                    this.lineQueues = newLineQ
                }
                else{
                    // 删除内部对象缓存的数据
                    var nodes = this.nodeQueues
                    var nodeStack = []
                    for(var i=0; i<nodes.length; i++){
                        var $node = nodes[i]
                        // 清除已经删除节点的缓存数据
                        if(id == $node.c.id){
                            continue
                        }
                        nodeStack.push($node)
                    }
                    this.nodeQueues = nodeStack
                }
                
                // 删除边框以及选中标识
                this.removeBBox()
                return true
            }
        }
        return false
    }
    /**
     * 移除碰撞属性
     */
    removeIntersectMk(){
        var nodes = this.nodeQueues
        var IntersectEl = null
        for(var i=0; i<nodes.length; i++){
            var node = nodes[i]
            if(node._IntersectMk){
                node._IntersectMk = false       
                var _type = node.NodeType
                var pkgClr = this.config.pkgClr
                if(pkgClr[_type]){
                    node.c.attr('fill', pkgClr[_type])
                }else{
                    _type = node.c.data('type')
                    if(1 == _type){
                        node.c.attr('fill', pkgClr.start)
                    }
                    else if(9 == _type){
                        node.c.attr('fill', pkgClr.end)
                    }
                }
                IntersectEl = node         

            }
        }
        return IntersectEl
    }
    /**
     * 移除连接检测线，用于连接线与节点关联时删除就的关联
     * @param {NodeBase} lineIst 
     * @param {string} type from/to
     * @returns {bool}
     */
    removeConLine(lineIst, type){
        var isSuccess = false
        if(lineIst && type){
            var nodes = this.nodeQueues
            var refId = lineIst.c.id
            for(var i=0; i<nodes.length; i++){
                var node = nodes[i]
                var lineType = type + 'Line'
                // 只检测为数组的类型
                if(node[lineType] && node[lineType].length){
                    var lineQues = node[lineType]
                    var nLineQues = []
                    for(var j=0; j<lineQues.length; j++){
                        var lineQue = lineQues[j]
                        if(refId != lineQue.c.id){
                            nLineQues.push(lineQue)
                        }
                    }
                    node[lineType] = nLineQues
                }
            }
        }
        return isSuccess
    }
    /**
     * 删除所有对象
     * @returns {this}
     */
    removeAll(){        
        this.removeAllText()
        this.removeAllLine()
        this.removeAllNode()
        return this
    }
    /**
     * 删除所有节点
     * @returns {this}
     */
    removeAllNode(){
        this.removeBBox()
        var nodes = this.nodeQueues
        for(var i=0; i<nodes.length; i++){
            var node = nodes[i]
            if(node.label){
                node.label.remove()
            }
            node.c.remove()
        }
        this.nodeQueues = []
        return this
    }
    /**
     * 删除所有直线
     * @returns {this}
     */
    removeAllLine(){
        this.removeBBox()
        var lines = this.lineQueues
        for(var i=0; i<lines.length; i++){
            var line = lines[i]
            line.c.remove()
        }
        this.lineQueues = []
        return this
    }
    /**
     * 删除所有文本
     * @returns {this}
     */
    removeAllText(){
        this.removeBBox()
        var texts = this.textQueues
        for(var i=0; i<texts.length; i++){
            var text = texts[i]
            text.remove()
        }
        this.textQueues = []
        return this
    }
    /**
     * 通过节点代码获取节点
     * @param {string} code  NodeBase.c.data('code')
     * @returns {NodeBase|null}
     */
    getNodeByCode(code){
        var nodeIst = null
        var nodes = this.nodeQueues
        for(var i=0; i<nodes.length; i++){
            var node = nodes[i]
            if(node.c.data('code') == code){
                nodeIst = node
                break
            }
        }
        return nodeIst
    }
     /**
     * 通过节点代码获取节点
     * @param {string} code  NodeBase.c.id
     * @returns {NodeBase|null}
     */
    getNodeByEid(code){
        var nodeIst = null
        var nodes = this.nodeQueues
        for(var i=0; i<nodes.length; i++){
            var node = nodes[i]
            if(node.c.id == code){
                nodeIst = node
                break
            }
        }
        return nodeIst
    }
    /**
     * 代码与id对应，不同时传入值；设置字典
     * @param {string|null} code 
     * @param {string|null} id 
     * @returns {string|null|this}
     */
    code2Id(code, id){
        // 通过 code 获取 Id
        if(code && !id){
            return this._code2EidDick[code] || null
        }
        // 通过id 获取 code
        else if(id && !code){
            var dick = this._code2EidDick
            for(var prefCode in dick){
                if(id == dick[prefCode]){
                    return prefCode
                }
            }
            return null
        }
        else if(id && code){
            this._code2EidDick[code] = id
            return this
        }
    }
    /**
     * 设置指定/当前选择节点对象属性
     * @param {object} option {text}
     * @param {RaphaelElement|string|null} code REle.id
     * @returns {bool}
     */
    setOption(option, code){
        var isSuccess = false
        if(option){
            if('object' != typeof option){  // 默认为文本，快速设置文本
                option = {text: option}
            }
            if(!code){
                code = this.getSelected()
            }
            var node = 'object' == typeof code? code : this.getNodeByCode(code)
            // 文本属性
            if(node && option.text){
                if(node.label){
                    node.label.attr('text', option.text)
                    node.opt = node.opt || {}
                    node.opt.text = option.text     // NodeBase 的文本属性值
                    // 自动适应文本的宽度
                    if('function' == typeof node.resizeByText){
                        node.resizeByText()
                    }
                }
            }
        }
        return isSuccess
    }
    /**
     * 赋值节点，为空是复制当前选中的节点
     * @param {RaphaelElement|string|null} code 
     */
    cloneNode(code){
        if(!code){
            code = this.getSelected()
        }
        if(code){
            var node = 'object' == typeof code? code : this.raphael.getById(code)
            if('object' == typeof node){
                // 删除实体数据
                var id = node.id    // id 数据
                node.c.clone()
                node.label.clone()
                return true
            }
        }
        return false
    }
    /**
     * 获取被选中的节点，只能一个
     * @returns {NodeBase}
     */
    getSelected(){
        var nodes = this.nodeQueues
        var selectedNode = null
        // 节点扫描
        for(var i=0; i<nodes.length; i++){
            var node = nodes[i]
            if(node.bBox){
                selectedNode = node
                break
            }
        }
        //console.log(this.lineQueues, selectedNode)
        if(!selectedNode){
            // 连线扫描
            var lines = this.lineQueues
            for(var j=0; j<lines.length; j++){
                var line = lines[j]
                if(line.selectEdMk){
                    selectedNode = line
                }
            }
        }
        return selectedNode
    }
    /**
     * 获取最新生成的节点
     * @returns {NodeBase}
     */
    getLastElem(){
        var lastElem = null
        var nodes = this.nodeQueues
        if(nodes.length > 0){
            lastElem = nodes[nodes.length - 1]
        }
        return lastElem
    }
    /**
     * 获取工作流步骤,用于保存工作流的数据结构
     * @returns {array}
     */
    getFlowStep(){
        var step = []
        var nodes = this.nodeQueues
        for(var i=0; i<nodes.length; i++){
            var node = nodes[i]
            var stepAttr = this.getFlowJson(node)
            step.push(stepAttr)
        }
        return step
    }
    /**
     * 获取节点业务需求的数据结构
     * @param {NodeBase|null} node 节点实例， 为空时为当前选中的节点
     * @returns {object|null}
     */
    getFlowJson(node){
        if(!node){
            node = this.getSelected()
        }
        var fjson = {}
        if(node){
            var label = node.label || null
            var c = node.c
            fjson = {
                name: label? label.attr('text'):'',
                code: c.data('code'),
                type: c.data('type'),
                _struct: node.toJson()
            }
            // 终点
            var toLines = node.toLine
            var toLineArr = []
            for(var j=0; j<toLines.length; j++){
                var code = this.getLineCntCode('from', toLines[j].c.id, node)
                if(code){
                    toLineArr.push(code)
                }
            }
            fjson.prev = toLineArr.length > 0? toLineArr.join(',') : '' 

            // 终点
            var fromLines = node.fromLine
            var fromLineArr = []
            for(var k=0; k<fromLines.length; k++){
                var code = this.getLineCntCode('to', fromLines[k].c.id, node)
                if(code){
                    fromLineArr.push(code)
                }
            }
            fjson.next = fromLineArr.length > 0? fromLineArr.join(',') : '' 
        }
        else{
            fjson = null
        }
        return fjson
    }
    /**
     * 获取连接线端点的节点代码
     * @param {string} type from/to
     * @param {string} lineId 直线代码
     * @param {NodeBase|null|string} refIst 参照id/NodeBase attr= {code}
     * @returns {string}
     */
    getLineCntCode(type, lineId, refIst){
        var code = null
        if(type && lineId){
            var nodes = this.nodeQueues
            var refId = null
            if(refIst){
                refId = 'string' == typeof refIst? refIst : refIst.c.data('code')
            }
            var typeName = type + 'Line'
            for(var i=0; i<nodes.length; i++){
                var node = nodes[i]
                var cId = node.c.data('code')
                if(refId == cId){   // 跳过自身检测
                    continue
                }
                var typeLines = node[typeName]
                for(var j=0; j<typeLines.length; j++){
                    var typeLine = typeLines[j]
                    if(lineId == typeLine.c.id){
                        return cId
                    }
                }
            }
        }
        return code
    }
    /**
     * 获取碰撞的元素
     * @param {object} point {x, y} 坐标点
     * @returns {RapaelElement|null}
     */
    getIntersectElem(point){
        var itsctEl = null
        if('object' == typeof point){
            var nodes = this.nodeQueues
            for(var i=0; i<nodes.length; i++){
                var node = nodes[i]
                var type = node.NodeType
                if('endpnt' == type){
                    var $c = node.c
                    var cx = $c.attr('cx'),
                        cy = $c.attr('cy'),
                        rx = $c.attr('rx'),
                        ry = $c.attr('ry')
                    if(
                        // x
                        (point.x >= (cx - rx) && point.x <= (cx + rx))
                        // y
                        && 
                        (point.y >= (cy - ry) && point.y <= (cy + ry))
                    ){
                        itsctEl = node
                        break
                    }        
                }
                else if('opera' == type){
                    var $c = node.c,
                        x = $c.attr('x'),
                        y = $c.attr('y'),
                        w = $c.attr('width'),
                        h = $c.attr('height')
                    if(
                        // x
                        (point.x >= x && point.x <= (x + w))
                        // y
                        && 
                        (point.y >= y && point.y <= (y + h))
                    ){
                        itsctEl = node
                        break
                    }   
                }
                else if('judge' == type){
                    var $opt = node.opt,
                        cx = $opt.cx,
                        cy = $opt.cy,
                        h = $opt.h,
                        w = $opt.w
                    if(
                        // x
                        (point.x >= (cx - w/2) && point.x <= (cx + w/2))
                        // y
                        && 
                        (point.y >= (cy - h/2) && point.y <= (cy + h/2))
                    ){
                        itsctEl = node
                        break
                    }    
                }
                //console.log(node)
            }
        }
        return itsctEl
    }
    /**
     * 加载流程数据,用于修改时加载历史数据
     * @param {object|null} steps 
     */
    loadStep(steps){
        if('object' == typeof steps){
            // 连接性先关联信息: {id:{}}
            var lineCntMapInfo = {},
                pkgClr = this.config.pkgClr
            // 记录连线端点信息                
            var recordLMapFn = (_from, _to) =>{
                if(_from.indexOf(',') == -1){
                    var _toQus = _to.indexOf(',') == -1? [_to]: _to.split(',')
                    for(var x1=0; x1<_toQus.length; x1++){
                        var ftK = _from + '__' + _toQus[x1]
                        if(!lineCntMapInfo[ftK]){
                            lineCntMapInfo[ftK] = true
                        }
                    }
                }
                else if(_to.indexOf(',') == -1){
                    var _fromQus = _from.indexOf(',') == -1? [_from]: _from.split(',')
                    for(var x2=0; x2<_fromQus.length; x2++){
                        var ftK = _fromQus[x2] + '__' + _to
                        if(!lineCntMapInfo[ftK]){
                            lineCntMapInfo[ftK] = true
                        }
                    }
                }
            }
            // 遍历节点
            for(var i = 0;i <steps.length; i++){
                var step = steps[i]
                var _struct = step._struct,
                    opt = _struct.opt,
                    config = this.config,
                    pkgClr = config.pkgClr
                var type = step.type
                var nodeIst = null
                if(1 == type || 9 == type){
                    nodeIst = this.flow.endpoint(opt.cx, opt.cy, opt.r, opt.text)
                    if(1 == type){
                        nodeIst.c.attr('fill', pkgClr.start)
                    }else{
                        nodeIst.c.attr('fill', pkgClr.end)
                    }
                }
                else if(2 == type){
                    nodeIst = this.flow.operation(opt.cx, opt.cy, opt.w, opt.h, opt.text)
                    nodeIst.c.attr('fill', pkgClr.opera)
                }
                else if(3 == type){
                    nodeIst = this.flow.judge(opt.cx, opt.cy, opt.w, opt.h, opt.text)
                    nodeIst.c.attr('fill', pkgClr.judge)
                }
                if(nodeIst){
                    var code = step.code || nodeIst.c.data('code')
                    var instId = nodeIst.c.id
                    if(!code){
                        code = this._getOrderCode()
                    }
                    nodeIst.c.data('code', code)
                    this._code2EidDick[code] = instId
                    nodeIst.c.data('type', type)
                    this._bindEvent(nodeIst)
                    this.nodeQueues.push(nodeIst)
                    
                    // 连线缓存器
                    var prev = step.prev || null    // to
                    if(prev){
                        recordLMapFn(prev, code)
                    }
                    var next = step.next || null    // from
                    if(next){
                        recordLMapFn(code, next)
                    }

                    // lineCntMapInfo[instId] = lineCntMapInfo[instId] || {}                    
                    // var prev = step.prev || null    // to
                    // if(prev){
                    //     var prevQu = lineCntMapInfo[instId].to || []
                    //     if(prev.indexOf(',') > -1){
                    //         prevQu = [].concat(prevQu, prev.split(','))
                    //     }else{
                    //         prevQu.push(prev)
                    //     }
                    //     lineCntMapInfo[instId].to = prevQu
                    // }
                    // var next = step.next || null    // from
                    // if(next){
                    //     var nextQu = lineCntMapInfo[instId].from || []
                    //     if(next.indexOf(',') > -1){
                    //         nextQu = [].concat(nextQu, next.split(','))
                    //     }else{
                    //         nextQu.push(next)
                    //     }
                    //     lineCntMapInfo[instId].from = nextQu
                    // }
                }
            }
            // console.log(lineCntMapInfo)

            for(var lnstr in lineCntMapInfo){
                var lnstrQus = lnstr.split('__')
                var fCodeNd = this.getNodeByCode(lnstrQus[0])
                var tCodeNd = this.getNodeByCode(lnstrQus[1])
                //console.log(fCodeNd, tCodeNd)
                var p1 = fCodeNd.getStlnP()
                var p2 = tCodeNd.getEnlnP()
                // console.log(p1, p2)
                var innerTmpArror = this.flow.arrow([p1.x, p1.y], [p2.x, p2.y], 5)
                // 连线实体关联，起点
                if(!innerTmpArror.position){
                    innerTmpArror.position = {}
                }
                innerTmpArror.position['from'] = p1.position
                fCodeNd.recordLine('from', innerTmpArror)
                tCodeNd.recordLine('to', innerTmpArror)
                innerTmpArror.position['to'] = p2.position

                innerTmpArror.c.attr('fill', pkgClr.arrow)                            
                this._lineTragEvent(innerTmpArror)
                this.lineQueues.push(innerTmpArror)
            }
        }
        // console.log(this._code2EidDick)
        // console.log(steps)
        // console.log(lineCntMapInfo)
        //console.log(this.getFlowStep())
        return this
    }
    /**
     * 创建节点数
     * @param {object} cDragDt 当前节点拖动的参数
     * @param {number|string} type 节点类型
     */
    _createNode(tbDragDt, type){
        var $this = this,
            nodeIst = null,
            config = this.config,
            pkgClr = config.pkgClr
        switch(type){
            case 1:
                nodeIst = this.flow.endpoint(tbDragDt.dx, tbDragDt.dy, 10, '开始')
                nodeIst.c.attr('fill', pkgClr.start)
                break;
            case 2:
                nodeIst = this.flow.operation(tbDragDt.dx, tbDragDt.dy, 50, 40, '操作流程')
                nodeIst.c.attr('fill', pkgClr.opera)
                break;  
            case 3:
                nodeIst = this.flow.judge(tbDragDt.dx, tbDragDt.dy, 50, 40, '流程判断')
                nodeIst.c.attr('fill', pkgClr.judge)
                break;
            case 9:
                nodeIst = this.flow.endpoint(tbDragDt.dx, tbDragDt.dy, 10, '结束')
                nodeIst.c.attr('fill', pkgClr.end)
                break;                          
        }
        if(nodeIst){    // 保存节点实例
            var code = code = this._getOrderCode()
            nodeIst.c.data('code', code)
            this._code2EidDick[code] = nodeIst.c.id
            nodeIst.c.data('type', type)
            this._bindEvent(nodeIst)
            this.nodeQueues.push(nodeIst)
        }
    }
    /**
     * 节点绑定事件
     * @param {NodeBase} nodeIst 
     */
    _bindEvent(nodeIst){
        if(nodeIst){    // 保存节点实例
            var $this = this,
            config = this.config,
            pkgClr = config.pkgClr
            ;
            // 节点拖动
           (function(){
               var cDragDt = {}
               nodeIst.c.drag(
                   function(dx, dy){
                       dx += cDragDt.x
                       dy += cDragDt.y
                       nodeIst.move(dx, dy)
                       nodeIst.ToSyncArrow(dx, dy)
                   },
                   function(){
                       var _x, _y
                       if('ellipse' == this.type){
                           _x = this.attr('cx')
                           _y = this.attr('cy')
                       }
                       else if('rect' == this.type){
                           _x = this.attr('x')
                           _y = this.attr('y')
                       }
                       else if('path' == this.type){
                           var _path = this.attr('path')
                           var sP1 = _path[0]
                           _x = sP1[1]
                           _y = sP1[2]
                       }

                       cDragDt.x = _x
                       cDragDt.y = _y
                       // console.log(cDragDt)
                   },
                   function(){
                       cDragDt = {x:0, y:0}
                   }
               )
               // console.log(nodeIst)
               // console.log(nodeIst.c)
           })()

           // 节点点击处理
           nodeIst.c.click(function(){
               $this.removeBBox()
               // if(nodeIst.bBox){
               //     nodeIst.bBox.remove()
               // }
               var bt = this.getBBox()
               var dt = 5
               nodeIst.bBox = nodeIst.instance.rect(bt.x-dt, bt.y-dt, bt.width+dt*2, bt.height+dt*2)
               nodeIst.bBox.attr({
                   'stroke': pkgClr.NodeBox
               })
               $this.onNodeClick(nodeIst)
           })
       }
    }
    /**
     * 直线拖动
     * @param {RapaelElement} lineInst 
     */
    _lineTragEvent(lineInst){
        if(!lineInst || 'object' != typeof lineInst){
            return false
        }
        var $this = this;
        (function(TmpArrIst){
            TmpArrIst.c.click(function(){     
                $this.removeBBox()  // 移除当前的节点的外部边框
                // 选中标识符号
                TmpArrIst.selectEdMk = true   

                var opt = TmpArrIst.opt 
                var color = '#000000'
                var pR = 3      // 半径                        
                // console.log('*', innerTmpArror)
                // console.log(innerTmpArror.c.id, 'click')
                // 起始节点
                var arrowLineP1 = $this.raphael.circle(opt.p1[0], opt.p1[1], pR)
                arrowLineP1.attr('fill', color);                        

                // 结束节点
                var arrowLineP2 = $this.raphael.circle(opt.p2[0], opt.p2[1], pR)
                arrowLineP2.attr('fill', color)

                var lineEndPointMoveEvt = function(LIst, isEnd){
                    var aCDt = {ax: 0, ay: 0}
                    // console.log(arrowLineP1)
                    LIst.drag(
                        function(ax, ay){
                            ax += aCDt.ax
                            ay += aCDt.ay
                            var hasIntersectElem = $this.getIntersectElem({x: ax, y:ay})
                            if(hasIntersectElem){   // 碰撞时，使用连接端点
                                $this.removeIntersectMk()
                                hasIntersectElem.c.attr('fill', '#FF0000')                                            
                                hasIntersectElem._IntersectMk = true
                                var CntLinePnt
                                if(isEnd){
                                    CntLinePnt = hasIntersectElem.getEnlnP()
                                }
                                else{
                                    CntLinePnt = hasIntersectElem.getStlnP()
                                }
                                // console.log(CntLinePnt, hasIntersectElem)
                                ax = CntLinePnt.x
                                ay = CntLinePnt.y
                                // 关联
                                var position = isEnd? 'to':'from'
                                $this.removeConLine(TmpArrIst, position)
                                hasIntersectElem.recordLine(position, TmpArrIst)
                                if(!TmpArrIst.position){
                                    TmpArrIst.position = {}
                                }
                                TmpArrIst.position[position] = CntLinePnt.position
                            }
                            //console.log(hasIntersectElem)
                            var mmgntcIst = this    // 磁芯点
                            // var id = this.id
                            if(isEnd){
                                TmpArrIst.updatePath(null, [ax, ay])
                                mmgntcIst.data('type', 'to')
                                // TmpArrIst.position.to = id
                            }
                            else{
                                TmpArrIst.updatePath([ax, ay])
                                mmgntcIst.data('type', 'from')
                                // TmpArrIst.position.from = id
                            }
                            $this.MagneticCore = mmgntcIst  // 保存正在移动的磁芯点
                            this.attr({
                                cx: ax,
                                cy: ay
                            }) 
                        },
                        function(){
                            aCDt.ax = this.attr('cx')
                            aCDt.ay = this.attr('cy')
                        },
                        function(){
                            // if(aCDt.ax < 75 || aCDt.ay < 50){
                            //     return null
                            // }
                            // LIst.updatePath([aCDt.ax, aCDt.ay])
                            // arrowLineP1.attr({
                            //     x: aCDt.ax,
                            //     y: aCDt.ay
                            // })
                            $this.MagneticCore = null           // 拖动完成以后
                        }
                    )
                }

                lineEndPointMoveEvt(arrowLineP1)
                lineEndPointMoveEvt(arrowLineP2, true)
                // 临时数据节点
                $this.tempNodes.push(arrowLineP1, arrowLineP2)
            })
        })(lineInst)
        return true
    }
    /**
     * 文本拖动，独立文本
     * @param {RapaelElement} textElem 
     */
    _textBindEvent(textElem){
        var $this = this;
        // 拖动
        (function(textIst){
            var _dragDt = {x:0, y:0}
            textIst.drag(
                function(x, y){
                    x += _dragDt.x
                    y += _dragDt.y
                    textIst.attr({x, y})
                },
                function(){
                    _dragDt.x = textIst.attr('x')
                    _dragDt.y = textIst.attr('y')
                },
                function(){}
            )
        })(textElem);
        // 点击处理
        textElem.click(function(){
            // this.attr('font-size', '100rem')
            // this.attr('font-size', '1.23em')
            // $this._removeTxtSelect()
            $this.removeBBox()
            this.attr(Conf.text.selected)
            this.data('selectMk', true)
        })
    }
    /**
     * 移除文本选中状态
     */
    _removeTxtSelect(){
        var texts = this.textQueues
        for(var i=0; i<texts.length; i++){
            var text = texts[i]
            if(text.data('selectMk')){
                text.attr(Conf.text.defAtrr)
                text.data('selectMk', false)
            }
        }
    }
    /**
     * 事件处理接口
     * @param {NodeBase} nodeIst 
     */
    onNodeClick(nodeIst){}
}

/* harmony default export */ __webpack_exports__["a"] = (WorkerEditor);

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({"version":"1.1.8","release":"20180321","author":"Joshua Conero"});

/***/ })
/******/ ]);