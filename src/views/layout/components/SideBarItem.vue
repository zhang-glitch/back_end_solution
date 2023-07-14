<template>
  <!-- 判断是否直接展示menu-item还是submenu-item -->
  <el-sub-menu v-if="menu.children.length > 0" :index="menu.path">
    <template #title>
      <menu-item :title="menu.meta.title" :icon="menu.meta.icon"></menu-item>
    </template>
    <!-- 循环渲染，多层menu -->
    <side-bar-item
      v-for="route in menu.children"
      :menu="route"
      :key="route.path"
    ></side-bar-item>
  </el-sub-menu>
  <el-menu-item v-else :index="menu.path">
    <menu-item
      :title="menu.meta.title"
      :icon="menu.meta.icon"
      :iconName="menu.meta.iconName"
    ></menu-item>
  </el-menu-item>
</template>

<script setup>
import MenuItem from './MenuItem.vue'
defineProps({
  menu: {
    type: Object,
    require: true
  }
})
</script>

<style scoped></style>
