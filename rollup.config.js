module.exports = {
  input: 'src/index.js',
  output: [
    {
      format: 'cjs',
      file: 'dist/index.cjs.js'
    },
    {
      format: 'umd',
      // 全局变量命名
      name: 'CPWP',
      exports: 'named',
      file: 'dist/index.umd.js',
      globals: {}
    },
    {
      format: 'es',
      file: 'dist/index.esm.js'
    }
  ]
}