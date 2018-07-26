/**
 * 2018年7月26日 星期四
 * 适配器
 */

export default class Adapter{
    engine: string;
    storage: Storage;
    constructor(engine?: string){
        this.engine = engine || 'session';
        this.engine = this.engine.toLowerCase();
        // 获取引擎
        switch(engine){
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
    get(key: string): string|null{
        return this.storage.getItem(key)
    }

    /**
     * 设置值
     * @param {string} key
     * @param {*} value
     * @return Ja.storeAdapter
     */
    set(key: string, value: any): Ja.storeAdapter{
        if('object' == typeof value){
            value = JSON.stringify(value)
        }
        this.storage.setItem(key, value);
        return this
    }

    /**
     * 删除值
     * @param {string} key
     * @returns {Ja.storeAdapter}
     */
    del(key: string): Ja.storeAdapter{
        this.storage.removeItem(key);
        return this
    }
}