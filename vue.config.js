/**
 * @vue/cli-service 可选配置文件
 */
'use strict'
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    // @vue/cli webpack-dev-server Express 中默认的路由规则(优先级: 静态文件>其他)
    // 请求 GET http://localhost:8080/ HTTP/1.1
    // 映射 index.html
    // 请求 GET http://localhost:8080/anyUrl HTTP/1.1
    //      Accept: text/html
    // 映射 index.html
    proxy: {
      // 没有映射到静态文件时的代理规则
      // 代理转发之后，匹配其他路由
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {// 匹配上的地址会追加到 target 后面
        target: `http://127.0.0.1:${8080}/mock`,
        changeOrigin: true,
        pathRewrite: {// 重写转发的地址
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }

    },
    after: require('./mock/mock-server.js')
  },
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
