const {Msr4} = require('../src/Msr4')



let config = {
    source_dir: './test/base/',
    target_dir: '../test/dist/base'
}
module.exports = (new Msr4(config))
    .js([
        'index',
        'child/index'
    ])
    .data