module.exports = {
    /**
     * 是否为对象
     * @param {*} value
     * @returns
     */
    isObject(value){
        if('object' == typeof value){
            return value instanceof Object
        }
        return false
    },
    /**
     * 是否为数组
     * @param {*} value
     * @returns
     */
    isArray(value){
        if('object' == typeof value){
            return value instanceof Array
        }
        return false
    },
    /**
     * object/array 循环
     * @param {*} value
     * @param {*} callback (v, k)
     */
    each(value, callback){
        let isArray = this.isArray(value)
        if('object' == typeof value){
            if(isArray){
                for(let i=0; i<value.length; i++){
                    let breakStr = callback(value[i], i)
                    if(breakStr === false){
                        break
                    }
                }
            }else{
                for(let k in value){
                    let breakStr = callback(value[k], k)
                    if(breakStr === false){
                        break
                    }
                }
            }
        }
    }
}