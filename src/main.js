import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import App from './App.vue'

// samples
import workflowstudio from '@app/samples/workflowstudio/App.vue'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  render: h => h(workflowstudio)
}).$mount('#app')
