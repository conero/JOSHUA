/**
 * 数据集合，内存数据存储与处理
 * 2017年11月15日 星期三
 * Joshua Conero
 */

// 数据集合
let SuRongDataSets = [] 

/**
 * 数据集合接口
 */
class Dataset{
    $id: number     // 数据id
    /**
     * 初始化数据对象
     * @param {object} data 
     */
    constructor(data){        
        this.$id = SuRongDataSets.push(new Object()) - 1
        if(data){
            this.merge(data)
        }
    }
    /**
     * 设置参数值
     * @param {string} key 
     * @param {any} value 
     * @return this
     */
    setValue(key, value){
        SuRongDataSets[this.$id][key] = value
        return this
    }
    /**
     * 合并对象
     * @param {object} data 
     * @return {bool}
     */
    merge(data){
        var success = false
        if('object' == typeof data){
            SuRongDataSets[this.$id] = (<any>Object).assign(SuRongDataSets[this.$id], data)
            success = true
        }
        return success
    }
    /**
     * 获取参数值
     * @param {string} key 
     * @param {any} def 
     * @return {any}
     */
    getValue(key, def){
        def = def || null
        if('undefined' != typeof SuRongDataSets[this.$id][key]){
            def = SuRongDataSets[this.$id][key]
        }
        return def
    }
    /**
     * @param {string} key 删除减值
     * @return {bool}
     */
    deleteKey(key){
        var existKey = this.hasKey(key)
        if(existKey){
            delete SuRongDataSets[this.$id][key]
        }
        return existKey
    }
    /**
     * 是否存在键值
     * @param {string} key 
     * @return {bool}
     */
    hasKey(key){
        return 'undefined' != typeof SuRongDataSets[this.$id][key]
    }
    /**
     * jQuery 数据减值访问风格接口
     * @param {string|null} key 
     * @param {any} value 
     * @param {any} def 
     * @returns {any}
     */
    value(key, value, def){
        let rs = false
        // 获取数据
        if('undefined' == typeof value){
            if(key){            // 单键值
                def = def || null
                def = this.getValue(key, value)
            }else{              // 获取全部缓存的数据
                def = SuRongDataSets[this.$id]
            }
            rs = def
        }else if(key){
            this.setValue(key, value)
            def = false
        }
        return rs
    }
}


export default Dataset