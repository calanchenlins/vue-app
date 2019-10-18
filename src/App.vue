<template>
  <div id="app">
    <work-flow-mgr />
  </div>
</template>

<script>
import WorkFlowMgr from '@app/packages/reports/re_procRoute/WorkFlowMgr'
export default {
  name: 'App',
  components: {
    WorkFlowMgr
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
