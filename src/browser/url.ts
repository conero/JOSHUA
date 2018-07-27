/**
 * 2018年7月27日 星期五
 * url 地址处理
 */
import urlParser from './urlParser'
import parseUrlData = Sr.parseUrlData;
import operation from "../data/operation";
import uType from "../data/uType";
import url = Ja.url;
import map = Sr.map;

/**
 * 通过 local 解析自身
 * @returns {Sr.parseUrlData}
 */
function dataFromLocation(): parseUrlData {
    let data: parseUrlData = {hash: location.hash, search: location.search,
        url: location.href, querys: {}, qHash: {}, sData: {}};
    let purl: string = data.url;
    // 锚点
    if(data.hash){
        purl = purl.replace(data.hash, '');
        data.hash = data.hash.substr(1);
        let hIdx: number = data.hash.indexOf('?');
        if(hIdx > -1){
            data.qHash = urlParser.str2data(data.hash.substr(hIdx + 1));
            data.hash = data.hash.substr(0, hIdx)
        }
    }
    // search
    if(data.search){
        purl = purl.replace(data.search, '');
        data.search = data.search.substr(1);
        data.sData = urlParser.str2data(data.search);
    }
    // querys
    data.querys = operation.objectMerge(data.qHash, data.sData);
    data.purl = purl;
    return data;
}

export default class Url{
    querys: Sr.map;     // ?query 参数
    hash: string;       // 锚点
    url: string;
    purl: string;
    search: string;
    constructor(url?: string){
        if(url){
            let rs = new urlParser(url);
            this.hash = rs.hash;
            this.querys = rs.querys;
            this.url = url;
            this.purl = rs.purl;
            this.search = rs.search;
        }else {
            let rs = dataFromLocation();
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
    get(key: string, def?: any): any{
        return this.querys[key] || def;
    }

    /**
     * 设置query 参数值
     * @param {string | Sr.map} key
     * @param value
     * @returns {Ja.url}
     */
    set(key: string|map, value?: any): url{
        if('object' == typeof key){
            this.querys = operation.objectMerge(this.querys, key);
        }else if(key){
            this.querys[key] = value;
        }
        return this;
    }

    /**
     * @param {string} key
     * @returns {Ja.url}
     */
    del(key: string): url{
        delete this.querys[key];
        return this
    }
    /**
     * @returns {string}
     */
    get newUrl(){
        let nUrl: string = `${this.purl}`;
        // 字符串
        if(uType.noEmptyObj(this.querys)){
            nUrl += `?${urlParser.data2str(this.querys)}`
        }
        // 描点
        if(this.hash){
            nUrl += `#${this.hash}`;
        }
        return nUrl
    }

    /**
     * 更新数据
     * @param {Sr.map} data
     * @param {boolean} returnMk
     * @returns {string | void}
     */
    updateByData(data: Sr.map, returnMk?: boolean): string | void{
        data = uType.noEmptyObj(data)? data : {};
        this.set(data);
        if(returnMk){
            return this.newUrl;
        }
        location.href = this.newUrl;
    }
} 