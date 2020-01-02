import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import App from './App.vue'

// samples
import workflowstudio from '@app/samples/workflowstudio/App.vue'
import eshop from '@app/samples/eshop/App.vue'
import eshopRouter from '@app/samples/eshop/router/index.js'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router: eshopRouter,
  render: h => h(eshop)
}).$mount('#app')
