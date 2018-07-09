# Msr 包API

> Joshua Conero
>
> 2018年7月6日 星期五



## class Msr

### constructor(config) 

参数格式

```js
config = {
    // 原始配置
    options: {}
    // 事件集
    on: {
    	// 生成属性以前时间处理
    	crtOptBefore: function(option){}
	}
    source_dir: './'			// 源代码目录
	target_dir: ''				// 系统输出目录
	hasMinScr: 'false'			// 是否有min结尾的名称， 如 [name].js -> [name].min.js  根据 NODE_ENV
}
```

