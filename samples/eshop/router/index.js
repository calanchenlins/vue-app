import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import eshopLayout from '@app/samples/eshop/layout/index'

export const constantRoutes = [
  {
    path: '/',
    redirect: '/eshop'
  },
  {
    path: '/eshop',
    name: 'eshop',
    component: eshopLayout,
    redirect: '/eshop/catalog',
    children: [{
      path: 'catalog',
      component: () => import('@app/samples/eshop/Catalog'),
      meta: { title: 'catalogs', icon: 'dashboard' }
    }]
  }
]

const createRouter = () => new Router({
  // history模式下 host/x*/y*路由到host/x*/y*
  // hash模式下 host/x*/y*永远路由到host/x/y/#/
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
