<template>
  <div
    class="app-wrapper"
    :class="[$store.getters.sideBarOpen ? 'openSidebar' : 'hideSidebar']"
  >
    <!-- 左侧菜单 -->
    <side-bar
      id="guide-sideber"
      class="sidebar-container"
      :style="{ backgroundColor: $store.getters.cssVar.menuBg }"
    ></side-bar>
    <div class="main-container">
      <!-- 顶部bar -->
      <div class="fixed-header">
        <nav-bar></nav-bar>
      </div>
      <!-- 内容区  二级路由内容。如果不想做处理，可以直接在这里写router-view-->
      <app-main></app-main>
    </div>
  </div>
</template>

<script setup>
import AppMain from './components/AppMain.vue'
import NavBar from './components/NavBar.vue'
import SideBar from './components/SideBar.vue'
</script>

<script>
export default {
  name: 'layout-vue'
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.module.scss';
@import '@/styles/mixin.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.main-container {
  /* fixed布局不被flex管理了 */
  /* display: flex;
  flex-direction: column; */
  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    /* 测试子绝父相，偏移是从margin的位置开始？ */
    /* left: 0; */
    width: calc(100% - #{$sideBarWidth});
    transition: width #{$sideBarDuration};
    z-index: 9;
  }
}

/* 折叠菜单栏 */
.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth}) !important;
}
</style>
