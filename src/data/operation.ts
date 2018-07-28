/**
 * 2018年7月26日 星期四
 * 类型运算
 */
///<reference path="../index.d.ts"/>
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
    },
    /**
     * 数组是否存在
     * @param value
     * @param {array} queue
     * @returns {number}
     */
    inArray(value: any, queue: any[]): number{
        let index:number = -1;
        for(let i=0; i<queue.length; i++){
            if(value == queue[i]){
                index = i;
                break;
            }
        }
        return index;
    },
    /**
     * 正在字符串转替换，弥补 string.replace 字符串查询
     * @param {string} s
     * @param {string} r
     * @param {string} str
     * @returns {string}
     */
    strReplace(s:string, r:string, str: string): string{
        let reg = new RegExp(s, 'a');
        str.replace(reg, r);
        return str;
    }
}