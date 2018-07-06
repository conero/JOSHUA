# (wp4-msr) Webpack 4 manager .SuRonnnng
> Joshua Conero
> 2018年7月6日 星期五





| 说明项         | 项值                               | 其他 |
| -------------- | ---------------------------------- | ---- |
| webpack 版本   | webpack                            |      |
|                | webpack-cli                        |      |
| options 默认值 | data.target = 'web'                |      |
|                | data.mode = 'development'          |      |
|                | data.output.filename = '[name].js' |      |



## 起始

> 系统主要用于多文件编译，webpack4 处理包

- npm 依赖安装
  - npm i --save-dev webpack webpack-cli
- package-script
  - watch 开发模式
    - webpack --watch --config test/webpack.base.js 
  - prod 发布模式
    - webpack --mode=production --config test/webpack.base.js 



> 系统编译脚本

```js
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
```



