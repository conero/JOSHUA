// 2018年7月9日 星期一
// Joshua Conero
/**
 * 命令行解析
 * @class CliParse
 */
class CliParse{
    constructor(){
        this.json = {}
        this.processArg()
    }
    processArg(){
        let reg1 = /^--[^=]*=.*/                   // --key=value
        process.argv.forEach((v, i) => {
            if(reg1.test(v)){
                let idx = v.indexOf('='),
                    key = v.substr(2, idx-2),
                    value = v.substr(idx+1)
                this.json[key] = value
            }
        })
    }
    get data(){
        let vdata = Object.assign({}, this.json)
        return vdata
    }
}

module.exports = CliParse