<template>
  <div class="nav-bar">
    <div class="left-wrapper">
      <!-- 折叠按钮 -->
      <hamburger></hamburger>
      <!-- 面包屑 -->
      <bread-crumb id="guide-breadcrumb"></bread-crumb>
    </div>
    <div class="right-wrapper">
      <!-- 指导 -->
      <guide class="right-wrapper-item"></guide>
      <!-- 搜索 -->
      <header-search class="right-wrapper-item"></header-search>
      <!-- 全屏展示 -->
      <screen-full class="right-wrapper-item"></screen-full>
      <!-- 主题更换 -->
      <theme-select class="right-wrapper-item"></theme-select>
      <!-- 国际化 -->
      <language-select
        effect="dark"
        class="right-wrapper-item"
      ></language-select>
      <!-- 头像菜单 -->
      <div class="avatar-menu">
        <el-dropdown trigger="click">
          <!-- 头像 -->
          <el-avatar :size="35" :src="userInfo.avatar" class="avatar" />
          <!-- 菜单内容 -->
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <router-link to="/">{{ $t('msg.navBar.home') }}</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <a
                  href="https://juejin.cn/user/2225067267204935"
                  target="__blank"
                >
                  {{ $t('msg.navBar.course') }}
                </a>
              </el-dropdown-item>
              <el-dropdown-item divided @click="handleLogout">
                {{ $t('msg.navBar.logout') }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
  <view-tags></view-tags>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Hamburger from '@/components/hamburger/index.vue'
import BreadCrumb from '@/components/bread-crumb/index.vue'
import LanguageSelect from '@/components/language-select/index.vue'
import ThemeSelect from '@/components/theme-select/index.vue'
import ScreenFull from '@/components/screen-full/index.vue'
import HeaderSearch from '@/components/header-search/index.vue'
import ViewTags from '@/components/view-tags/index.vue'
import guide from '@/components/guide/index.vue'

const store = useStore()
const userInfo = computed(() => store.getters.userInfo)

// 退出登录
const handleLogout = () => {
  store.dispatch('user/logout')
}
</script>

<script>
export default {
  name: 'nav-bar'
}
</script>

<style scoped lang="scss">
.nav-bar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .right-wrapper {
    display: flex;
    align-items: center;

    :deep(.right-wrapper-item) {
      font-size: 24px;
      padding-right: 20px;
      &:hover {
        cursor: pointer;
      }
    }
    .avatar-menu {
      .avatar {
        cursor: pointer;
      }
    }
  }
}
</style>
