<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path"></component>
        </keep-alive>
      </transition>
    </router-view>
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

/* 处理动效 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>
