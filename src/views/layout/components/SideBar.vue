<template>
  <div class="side-bar">
    <!-- 头部图像 -->
    <div class="side-bar-avatar">
      <el-avatar
        :size="$store.getters.sideBarOpen ? 50 : 35"
        :src="$store.getters.userInfo.avatar"
      ></el-avatar>
      <div class="avatar-title" v-if="$store.getters.sideBarOpen">昊淼</div>
    </div>
    <!-- 菜单 default-active 指定菜单的index-->
    <el-menu
      :collapse="!$store.getters.sideBarOpen"
      :default-active="activeMenu"
      :background-color="$store.getters.cssVar.menuBg"
      :text-color="$store.getters.cssVar.menuText"
      :active-text-color="$store.getters.cssVar.menuActiveText"
      :unique-opened="true"
      :collapse-transition="true"
      router
    >
      <side-bar-item
        v-for="item in menus"
        :key="item.path"
        :menu="item"
      ></side-bar-item>
    </el-menu>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { generateMenus } from '@/utils/route'
import SideBarItem from './SideBarItem.vue'

const router = useRouter()
const menus = generateMenus(router.getRoutes())

const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>

<script>
const logoHeight = 44
export default {
  name: 'side-bar'
}
</script>

<style scoped lang="scss">
.side-bar-avatar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: v-bind(logoHeight) + 'px';
  padding: 10px 0 22px 0;

  .avatar-title {
    color: #fff;
    letter-spacing: 2px;
    margin-left: -70px;
    font-size: 20px;
  }
}
</style>
