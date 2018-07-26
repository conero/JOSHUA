/**
 * 2018年7月26日 星期四
 * 类型定义
 */


declare namespace  Ja{
    // 浏览器存在器
    import map = Sr.map;

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
}

declare namespace Sr{
    // 抽象字典
    export interface map{
        [key: string]: any
        [number: number]: any
    }
}
interface Ja{
    version: string
}

