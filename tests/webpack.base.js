/**
 * 2018年7月26日 星期四
 */
const {Msr4} = require('../script/wp4-msr/src/Msr4')

// 公共数据
let publicOpt = {
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                // use: 'ts-loader',
                // exclude: /node_modules/
                loader: "ts-loader"
            }
        ]
    },
    resolve: {// 现在你require文件的时候可以直接使用require('file')，不用使用require('file.coffee')
        extensions: ['.js', '.json', '.ts']
    }
};
// 公共配置
let publicMsr4 = {
    source_dir: './tests/base/',
    target_dir: './tests/base/',
    hasMinScr: true
};

module.exports = // 普通应用
    new Msr4(Object.assign(publicMsr4, {
        options: Object.assign({
            // output: {
            //     libraryTarget: 'umd'
            // }
        }, publicOpt)
    }))
        .js({
            tsurl: 'url'
        })
        .data;