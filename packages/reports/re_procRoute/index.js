/*
 * Vue 插件入口文件，使用通过vue-cli-service lib模式构建插件
 * CMD 打包命令: ./node_modules/.bin/vue-cli-service build --target lib --name re_procRoute  './packages/reports/re_procRoute/index.js'
 */
import ElementUI from 'element-ui'// 注册组件中依赖的 element-ui ，也可以在浏览器中直接引入
import 'element-ui/lib/theme-chalk/index.css'
import WorkFlowMgr from './WorkFlowMgr'

const install = function(Vue, opts = {}) {
  Vue.use(ElementUI)
  Vue.component('work-flow-mgr', WorkFlowMgr)
}
/* 对于浏览器，直接安装插件 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default { install }
