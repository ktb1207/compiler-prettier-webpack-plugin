# compiler-prettier-webpack-plugin
在webpack编译时，依据本地prettier配置文件统一格式化指定扩展文件


- npm包在package.json中指定来type:module的情况下，使用npm包的消费方，只能使用import引入，不能使用require引入
- rollup配置文件，如果采用esm导出，则package.json需要指定type:module;采用commonjs则不需要。
- rollup打包的源文件必须是esm模块。可以按需构建esm,comminjs,umd等。

