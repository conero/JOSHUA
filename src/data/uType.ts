/**
 * 2018年7月26日 星期四
 * 数据类型判断
 */

export default {
    /**
     * 空对象
     * @param {*} obj 
     */
    noEmptyObj(obj: any): boolean{
        let noEmp = false;
        if(this.isObject(obj)){
            for(let k in obj){
                noEmp = true;
                break
            }
        }      
        return noEmp
    },
    /**
     * 否是为object类型，不包括 array
     * @param value 
     */
    isObject(value: any): boolean{
        if('object' == typeof value){
            return !(value instanceof Array)
        }
        return false
    },
    /**
     * 是否为数组
     * @param value 
     */
    isArray(value: any): boolean{
        if(this.isObject(value)){
            return value instanceof Array
        }
        return false
    }
} 