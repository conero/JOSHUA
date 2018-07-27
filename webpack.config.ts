/**
 * webpack 打包项目配置
 * 2017年11月8日 星期三
 */

import * as webpack from 'webpack';
import * as path from 'path';

const config: webpack.Configuration = {
  // 源文件
  entry: './src/index.ts',
  // 编译文键
  output: {
      filename: 'Surong.ts.js',
      path: __dirname + "/dist"
  },
  resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".js", ".json"]
  }
};

export default config;


