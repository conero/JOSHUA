/**
 * 2018年7月26日 星期四
 * 浏览器存储系统
 */
///<reference path="../../index.d.ts"/>
import Adapter from "./adapter";
import uType from "../../data/uType";

export default class store{
    engine: string;  // 项目类型, session/local
    bKey?: string;    // 区块主键
    options: Ja.storeOptions;
    adapter: Ja.storeAdapter;
    data: Sr.map;
    constructor(options?: Ja.storeOptions){
        this.options = options || {};
        this.engine = this.options.engin || 'session';
        this.adapter = new Adapter(this.engine);

        if(this.options.bKey){
            this.bKey = this.options.bKey
        }        

        this._init()
    }
    /**
     * 项目初始化
     */
    private _init(){
        this.data = {};
        if(this.bKey){
            let sedt = this.raw(this.bKey);
            if(sedt){
                try {
                    this.data = JSON.parse(sedt)
                } catch (error) {
                    this.data = {}
                }
            }
        }
    }
    /**
     * @param {string} key
     * @returns {string|null} 
     */
    raw(key: string): string|null{
        return this.adapter.get(key)
    }
    /**
     * 设置原始值
     * @param {string} key
     * @param value
     * @returns {Ja.store}
     */
    setRaw(key: string, value?: any): Ja.store{
        this.adapter.set(key, value);
        return this
    }
    /**
     * 删除所有数据
     */
    clearAll(){
        let {bKey} = this;
        if(bKey){
           this.adapter.del(bKey);
            this.data = {}
        }
    }

    /**
     * 数据更新
     * @returns {Ja.store}
     */
    update(): Ja.store{
        let {bKey, data} = this;
        if(bKey){
            this.adapter.set(bKey, data);
        }
        return this
    }

    /**
     * 值设置
     * @param {string} key
     * @param value
     * @returns {Ja.store}
     */
    set(key: string, value: any): Ja.store{
        let {data} = this;
        this.data = uType.isObject(data)? data : {};
        this.data[key] = value;
        return this
    }

    /**
     * 删除数据
     * @param {string} key
     * @returns {Ja.store}
     */
    del(key: string): Ja.store{
        delete this.data[key];
        return this
    }

    /**
     * 获取配置数据
     * @param {string} key
     * @param def
     * @returns {*}
     */
    get(key: string, def?: any): any{
        return this.data[key] || def
    }
}
