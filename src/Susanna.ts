/**
 * Susanna 类
 * 2017年11月8日 星期三
 * 从 center.vue.js 中独立
 */
class Susanna{
    constructor(){}
    static base64_decode(encodeStr){
        return new Buffer(encodeStr, 'base64').toString('base64')
    }
    static base64_encode(Str){
        return new Buffer(Str).toString('base64')
    }
    /**
     * @param {object|Array} json 
     * @return {bool}
     */
    static EmptyJson(json){
        var isEmpty = true
        if('object' == typeof json){
            if(json instanceof Array){
                if(json.length > 0) isEmpty = false
            }
            else{
                for(var k in json){
                    isEmpty = false
                    break
                }
            }
        }
        return isEmpty
    }
    /**
     * 字符串渲染
     * @static
     * @param {string} str  字符串
     * @param {fucntion} callback 
     * @returns {string}
     * @memberof Susanna
     */
    static render(str, callback){
        var reg = /\{[^\}]+\}/g
        var matchList = str.match(reg)
        if(matchList){
            callback = 'function' == typeof callback? callback: null
            for(var i=0; i<matchList.length; i++){
                var key = matchList[i]
                if(callback){
                    var value = callback(key.replace(/\{|\}/g, ''))
                    value = value || ''
                    str  = str.replace(new RegExp(key, 'g'), value)
                }
            }
        }
        return str
    }
}

export default Susanna