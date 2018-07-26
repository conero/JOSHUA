/**
 * 2018年7月26日 星期四
 * 类型运算
 */
import map = Sr.map;

export default {
    /**
     * 简单object合并
     * @param {Sr.map} objs
     * @returns {Sr.map}
     */
    objectMerge(...objs: map[]): map{
        let newMap = objs.length > 0? objs[0]: {};
        objs.forEach((m: map, i: number) => {
            if(i > 0){
                for(let k in m){
                    newMap[k] = m[k]
                }
            }
        });
        return newMap
    }
}