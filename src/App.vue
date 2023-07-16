<script setup>
import { insertStyleToPage } from '@/utils/theme'
import { useStore } from 'vuex'

const store = useStore()
// 修改主题
insertStyleToPage(store.getters.themeColor)
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
