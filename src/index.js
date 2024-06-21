import * as prettier from 'prettier';
import path from 'node:path';
import fs from 'node:fs/promises';

// init value
const INIT_ENCODING = "utf-8";
const PWD = `${process.cwd()}/`;
const INIT_EXTENSIONS = ['.css', '.less', '.scss', '.md'];
const INIT_FOLDER = 'src';

// default config options
const options = {
  // prettier 配置文件
  configFile: 'prettier.config.js',
  // 默认扩展文件
  extensions: INIT_EXTENSIONS,
  //encoding
  ecoding: INIT_ENCODING,
  // folder
  folder: INIT_FOLDER
}

export class CompilerPrettierWebpackPlugin {
  constructor(option = {}){
    this.defaultOptions = {...options, ...option};
    this.configFile = PWD + this.defaultOptions.configFile;
    this.extensions = this.defaultOptions.extensions;
    this.encoding = this.defaultOptions.ecoding;
    this.folder = PWD + this.defaultOptions.folder;
    this.prettierOption = null;
    this.runMode = null;
    this.getPrettierOption()
  }

  /**
   *@description 获取prettier配置内容
   *
   */
   async getPrettierOption(){
    this.prettierOption = await prettier.resolveConfig(this.configFile)
  }

  apply(compiler){
    const compilerMode = compiler.options.mode;
    this.runMode = compilerMode || 'production';


    // tap 可以注册同步钩子和异步钩子
    // tapAsync 回调方式注册异步钩子
    // tapPromise Promise 方式注册异步钩子
    compiler.hooks.emit.tapAsync('CompilerPrettierWebpackPlugin', (compilation, callback) => {
      const promises = [];
      const _fs = fs;
      compilation.fileDependencies.forEach(filePath => {
        // 只处理配置folder文件
        if(filePath.indexOf(this.folder) === -1){
          return
        }
        
        // 只处理匹配扩展文件
        if(!this.extensions.includes(path.extname(filePath))){
          return
        }

        promises.push(new Promise(async (resolve, reject) => {

          if(this.runMode !== 'production'){
            // 检查文件修改时间
            try {
              const stats = await _fs.stat(filePath);
              const diffTime = parseInt((new Date().getTime() - new Date(stats.mtime).getTime())/1000 + '');
              if(diffTime > 10){
                return resolve();
              }
            } catch(err){
              reject(err)
            }
          }
          
          try{
            const fileSource = await _fs.readFile(filePath, this.encoding);
            const prettierSource = await prettier.format(fileSource, Object.assign({}, this.prettierOption, {filepath: filePath}));
            if(prettierSource != fileSource){
              await _fs.writeFile(filePath, prettierSource, this.encoding);
              resolve()
            }
          }catch(err){
            reject(err)
          }

        }));

      })

      Promise.all(promises).then(() => {
        callback();
      }).catch(err => {
        callback(err);
      });
    })
  }
}