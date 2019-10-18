<template>
  <div>跳转登录组件</div>
</template>

<script>
import UserSrv from '@/utils/auth/UserAuthSrv'
const userSrv = new UserSrv()
/*
在组件创建之前跳转登录页面
*/
export default {
  beforeCreate() {
    debugger
    userSrv.signIn()
  }
}
</script>

