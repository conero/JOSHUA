# Version 更新版本说明



## 0.0.2/20180709
- (+) 添加对 webpack-cli 部分参数的解析
  - 解析格式: --key=value
  - 用 *CliParse* 类处理，以及 *CliData* 生成全局的数据对象
- Msr4
  - (优化) 目标地址 *output.path*  采用基于命令行目标基础目录
  - (+) 添加 *config* 中的配置项 hasMinScr 使用自动生成 带.min.js 文件的编辑文件

## 0.0.1/20180706
- 项目搭建
  - document 文档
  - src 项目包
  - test 测试文件
- 实现基本的项目打包功能
  - 使其达到可用状态

