/**
 * 2018年7月26日 星期四
 * 类型定义
 */


declare namespace  Ja{
    // 浏览器存在器
    import map = Sr.map;
    import parseUrlData = Sr.parseUrlData;

    export interface storeOptions{
        engin?: string
        bKey?: string           // 区块键值
    }
    // 存储器
    export interface store{
        engine: string;  // 项目类型, session/local
        bKey?: string;    // 区块主键
        options?: storeOptions
        adapter: Ja.storeAdapter;
        data: Sr.map;

        raw(key: string): string|null
        setRaw(key: string, value?: any): Ja.store
        clearAll(): void
        update(): Ja.store

        set(key: string, value: any): Ja.store
        del(key: string): Ja.store
        get(key: string, def?: any): any
    }
    // 存储适配器
    export interface storeAdapter{
        engine: string
        storage: Storage
        get(key: string): string|null
        set(key: string, value: any): Ja.storeAdapter
        del(key: string): Ja.storeAdapter
    }
    
    // 数据类型
    export interface uType {
        noEmptyObj(obj: any): boolean
        isObject(value: any): boolean
        isArray(value: any): boolean
    }
    // 数据运算
    export interface opera {
        objectMerge(...objs: map[]): map
    }
    // 地址处理, get 数据请求等
    export interface url {
        querys: Sr.map;     // ?query 参数
        hash: string;       // 锚点
        url: string;
        purl: string;
        search: string;
        readonly newUrl: string;

        get(key: string, def?: any): any
        set(key: string|map, value?: any): url
        del(key: string): url
        updateByData(data: Sr.map, returnMk?: boolean): string | void
    }
    // url 解析地址
    export interface urlParser {
        hash?: string;
        search?: string;
        purl?: string;
        url?: string;
        qHash: map;          // hash 后面的参数
        sData: map;          // search 后面的参数
        querys: map;         // 解析很的参数， qHash 与 sData 合并

        parse(url: string): parseUrlData        // static
        str2data(str: string): map              // static
        data2str(data: map): string             // static
    }
}

declare namespace Sr{
    // 抽象字典
    export interface map{
        [key: string]: any
        [number: number]: any
    }
    // url 数据解析
    interface parseUrlData {
        hash: string;
        search: string;
        qHash: map;          // hash 后面的参数
        sData: map;          // search 后面的参数
        querys: map;         // 解析很的参数， qHash 与 sData 合并

        url?: string
        purl?: string
    }
}
interface Ja{
    version: string
}

