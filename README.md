# compiler-prettier-webpack-plugin
在webpack编译时，依据本地prettier配置文件统一格式化指定**扩展**文件

# 背景

在我们本地IDE如vscode没有安装prettier或者有安装prettier扩展但是IDE没有开启保存自动修复的情况下，在我们使用webpack作为构建工具，集成eslint自动修复代码的情况下

eslint只会处理js,ts文件，并不会自动按照prettier修复如css,less,scss文件。使用改插件，可基于webpack编译时，自动结合本地prettier配置文件，格式化处理匹配的扩展文件。


# 使用

## 安装

```js
npm install compiler-prettier-webpack-plugin --dev
```

## 配置

```js
const {CompilerPrettierWebpackPlugin} = require('compiler-prettier-webpack-plugin');

  plugins: [
    new CompilerPrettierWebpackPlugin(options)
    ...
  ]
```

## options参数说明

- configFile: prettier 配置文件, 默认 'prettier.config.js'
- extensions: 默认处理匹配扩展文件，默认 ['.css', '.less', '.scss', '.md']
- folder: 默认源文件文件目录位置，默认 src
- ecoding: 默认编码，默认：utf-8

