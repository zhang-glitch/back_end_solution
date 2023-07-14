<template>
  <div class="app-main">
    <router-view></router-view>
  </div>
</template>

<script setup></script>

<script>
export default {
  name: 'app-main'
}
</script>

<style scoped>
.app-main {
  min-height: calc(100vh - 50px - 43px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 0px 20px 20px 20px;
  margin-top: 104px;
  box-sizing: border-box;
}
</style>
