/**
 * 2018年7月26日 星期四
 */
const fs = require('fs')
const {Msr4} = require('./script/wp4-msr/src/Msr4')
const Pkg = require('./package.json')

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
}
// 公共配置
let publicMsr4 = {
    source_dir: './src/',
    target_dir: './dist/',
    hasMinScr: true
}
let webpackFiles = [
    // 普通应用
    new Msr4(Object.assign(publicMsr4, {
        options: Object.assign({
            // output: {
            //     libraryTarget: 'umd'
            // }
        }, publicOpt)
    }))
        .js({
            Ja: 'Joshua'
        })
        .data
    
    // umd
    , new Msr4(Object.assign(publicMsr4, {
        options: Object.assign({
            output: {
                libraryTarget: 'umd'
            },
            externals: {
                'raphael': 'raphael'
            }
        }, publicOpt)
    }))
        .js({
            'Ja.umd': 'Joshua'
        })
        .data
];

// 编译时时间运行
;(function(){
    var _json = {
        version: Pkg.version,
        release: Pkg.release,
        author: Pkg.author,
        name: Pkg.name
    }
    
    // 版本信息脚本
    var versionSrpt = `
    export interface VersionStruct {
        version?: string
        release?: string
        author?: string
        name?: string
    }
    export const LibVersion: VersionStruct = ${JSON.stringify(_json)}
    `
    fs.writeFileSync('./version.ts', versionSrpt)
})()

module.exports = webpackFiles