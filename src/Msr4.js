/**
 * Msr4 2018年7月6日 星期五
 * Joshua Conero
**/

const path = require('path')
const Util = require('./Util')
var vdata = require('./CliData')

/**
 * 系统管理类
 * @export
 * @class Msr4
 */
class Msr4 {
    /**
     *Creates an instance of Msr4.
     * @param {object} config
     * @memberof Msr4
     */
    constructor(config){
        this.config = config || {}
        this.config.options = config.options? Object.assign({}, config.options) : {}
        // output
        let output = this.config.options.output || {}
        if(!output.filename){
            output.filename = '[name].js'
        }
        this.config.options.output = output

        this.Options = {}
    }
    /**
     * js 文件添加
     * @param {*} key
     * @param {*} value
     * @returns
     * @memberof Msr4
     */
    js(key, value){
        let {config} = this,
            entry = config.options.entry

        if(!entry){
            entry = {}
        }
        if(key && 'string' == typeof key && !value){
            key = [key]
        }
        if(Util.isArray(key)){  // array
            Util.each(key, (v, i) => {
                entry[v] = v
            })
        }
        else if(Util.isObject(key)){    // object
            entry = Object.assign(entry, key)
        }else if(key && value){         // object
            entry[key] = value
        }
        this.config.options.entry = entry
        return this
    }
    /**
     * enter 文件检测
     * @private
     * @memberof Msr4
     */
    _enterCheck(){
        let {config} = this,
            source_dir = config.source_dir || './',
            entry = config.options.entry
        Util.each(entry, (v, k) => {
            if(v.indexOf('./') > -1){
                return false
            }else{
                entry[k] = source_dir + v
            }
        })
    }
    /**
     * 获取配置文件
     * @readonly
     * @memberof Msr4
     */
    get data(){
        this._enterCheck()
        let {config} = this,
            on = config.on || {},
            crtOptBefore = on.crtOptBefore,
            data = Object.assign({}, this.Options)
        data = Object.assign(data, config.options)

        if(crtOptBefore){
            data = crtOptBefore(Object.assign({}, data))
        }
        // 默认为开发模式
        if(!data.mode){
            data.mode = 'development'
        }
        if(!data.target){
            data.target = 'web'
        }
        // 目标地址
        if(config.target_dir){
            data.output.path = path.resolve(process.cwd(), config.target_dir)
        }
        
        return data
    }
}

exports.Msr4 = Msr4