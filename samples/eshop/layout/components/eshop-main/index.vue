<template>
  <section>
    <!-- 用于实现组件的动画 -->
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>
<script>
export default {
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>
