<template>
  <span>授权成功后的跳转页面</span>
</template>
<script>
import UserSrv from '@/utils/auth/UserAuthSrv'
const userSrv = new UserSrv()

export default {
  mounted: function() {
    this.$nextTick(function() {
      // 整个组件渲染完成后
      userSrv.signinRedirect()
    })
  }
}
</script>

