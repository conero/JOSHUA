# Version 更新版本
> Joshua Conero
>
> 2018年7月26日 星期四

## v1.0.x

### 1.0.2/180728

- **src**
  - (+) **time.ts** 实现 时间处理库
    - 重写日期格式化，基本格式规则支持 *php* 格式
    - 引入 日期/时间 转文字格式的方法
  - (优化) **operation.ts**
    - (+) 添加方法 *strReplace* 用于字符串替换，弥补 *string.replace* 的缺陷

### 1.0.1/180727

- **npm**
  - (+) 新增 *tests* 目录下的测试项目，用于测试库。支持 ``ts/js``
- **src**
  - (+) **url.ts** 前端地址解析工具
    - 实现当前地址的解析，基于对象 **location** 实现
    - 实现基于传入地址参数的解析，与前端具有相同的API
    - 支持参数*获取*、*设置*、*删除* 、*值更新*等操作
  - (+) **urlParser.ts** 地址解析
    - 提供通用的地址字符串解析，字符串和object之间的转换
  - (优化) **operation.ts**
    - 实现 *inArray* 数组中值存在性判断
  - (优化) **uType.ts**  
    - 优化 *noEmptyObj*  方法，使之更加精确判断 *object* 空值
- **tests**
  - (+) 新增 *base* 测试用于，用于库的功能测试



### 1.0.0/180726

- 删除原仓库，使之转移到 **old** 分支
- 文档新增和重构
- **typescript+webpack**
  - npm 初始项目
  - 语言环境搭建，下载相关的依赖
- **store**
  - (+) 实现数据存储器，基本工具
  - (+) 添加存储器适配器，用于查询存储引擎
- **data**
  - (+) 添加类型判断助手语句
  - (+) 添加*运算* 相关的类