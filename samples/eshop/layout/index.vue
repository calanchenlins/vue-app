<template>
  <div>
    <eshop-header>header</eshop-header>
    <eshop-main>main</eshop-main>
    <eshop-footer>footer</eshop-footer>
  </div>
</template>
<script>
// 引入需要使用的组件
import eshopHeader from './components/eshop-header'
import eshopMain from './components/eshop-main'
import eshopFooter from './components/eshop-footer'
export default {
  // 在本组件中局部注册引入的组件
  components: {
    eshopHeader,
    eshopMain,
    eshopFooter
  }
}
</script>

