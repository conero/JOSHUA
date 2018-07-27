/**
 * 2018年7月27日 星期五
 * url 解析器
 */
import map = Sr.map;
import parseUrlData = Sr.parseUrlData;
import operation from "../data/operation";
import uType from '../data/uType';

/**
 * 字符转为data, tets=ddd&c2=dkdk
 * @param {string} str
 * @returns {Sr.map}
 */
function str2data(str: string): map {
    let data: map = {},
        strQue: string[] = str.split('&');
    strQue.forEach((vs: string, vi: number) => {
        let idx = vs.indexOf('='),
            key = vs.substr(0, idx)
        ;
        data[key] = vs.substr(idx + 1);
    });
    return data;
}

/**
 * map 数组转 str
 * @param {Sr.map} data
 * @returns {string}
 */
function data2str(data: map) {
    let str = '';
    if(uType.noEmptyObj(data)){
        let quque: string[] = [];
        for(let k in data){
            quque.push(`${k}=${data[k]}`)
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
function parseUrl(url: string): parseUrlData {
    let data: parseUrlData = {hash: '', search: '', qHash: {}, sData: {}, querys: {}};
    let hashIdx: number, seaIdx: number;
    let tmpUrl = url,
        purl = url
    ;
    // 描点
    if((hashIdx = tmpUrl.indexOf('#'))> -1){
        purl = purl.substr(0, hashIdx);
        data.hash = tmpUrl.substr(hashIdx).substr(1);
        tmpUrl = tmpUrl.substr(0, hashIdx);
        let idx: number;
        if((idx = data.hash.indexOf('?'))){
            data.hash = data.hash.substr(idx+1);
            data.qHash = str2data(data.hash);
        }
    }

    // search
    if((seaIdx = tmpUrl.indexOf('?')) > -1){
        //data.search = tmpUrl.substr(hashIdx).replace('?', '');
        purl = purl.substr(0, seaIdx);
        data.search = tmpUrl.substr(hashIdx).substr(1);
        data.sData = str2data(data.search);
    }

    data.querys = operation.objectMerge(data.qHash, data.sData);
    data.purl = purl;
    return data;
}

/**
 * url 解析器
 */
export default class urlParser{
    hash?: string;
    search?: string;
    purl?: string;
    url?: string;
    qHash: map;          // hash 后面的参数
    sData: map;          // search 后面的参数
    querys: map;         // 解析很的参数， qHash 与 sData 合并
    constructor(url: string){
        let data = parseUrl(url);
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
    static parse(url: string): parseUrlData{
        return parseUrl(url);
    }

    /**
     * @param {string} str
     * @returns {Sr.map}
     */
    static str2data(str: string): map{
        return str2data(str);
    }

    /**
     * @param {Sr.map} data
     * @returns {string}
     */
    static data2str(data: map): string{
        return data2str(data);
    }
}