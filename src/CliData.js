const CliParse = require('./CliParse')

var CliParseJsonData = new CliParse()
    .data

    
// Node 运行环境 NODE_ENV
if(CliParseJsonData.mode && !process.env.NODE_ENV){
    process.env.NODE_ENV = CliParseJsonData.mode
}
    
module.exports = CliParseJsonData