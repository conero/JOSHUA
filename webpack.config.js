/**
 * webpack 打包项目配置
 * 2017年11月8日 星期三
 */
module.exports = {
    // 源文件
    entry: './src/index.ts',
    // 编译文键
    output: {
        filename: 'Surong.js',
        path: __dirname + "/dist"
    },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            // { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
  
            // You may need an appropriate loader to handle this file type.
            { enforce: "pre", test: /\.ts$/, loader: "ts-loader" }
  
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            
            // { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".js", ".json"]
    }
}