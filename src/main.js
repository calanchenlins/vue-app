import Vue from 'vue'
import App from './App.vue'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import { Container,
  Header,
  Aside,
  Main,
  Footer, input, Switch, tree, divider, tooltip, button, Collapse, CollapseItem, card, table, TableColumn, Col, Row } from 'element-ui'

// Vue.use(ElementUI)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(input)
Vue.use(Switch)
Vue.use(tree)
Vue.use(divider)
Vue.use(tooltip)
Vue.use(button)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(card)
Vue.use(table)
Vue.use(Row)
Vue.use(TableColumn)
Vue.use(Col)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
