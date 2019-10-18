/**
 * @vue/cli-service 可选配置文件
 */
'use strict'
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // Vue Cli默认配置: '@': resolve('src')
        '@app': resolve('/'), // 解析应用根目录
        '@pack': resolve('/packages') // 解析应用根目录下文件夹 // 等同于 '@pack': resolve('packages')
      }
    }
  }
}
