<template>
  <div class="theme-select">
    <el-tooltip :content="$t('msg.navBar.themeChange')">
      <svg-icon
        icon="change-theme"
        class="theme-change-icon"
        @click="handleClick"
      ></svg-icon>
    </el-tooltip>
    <el-dialog
      v-model="dialogVisible"
      :title="$t('msg.theme.themeColorChange')"
      width="33%"
    >
      <div class="content">
        <el-color-picker v-model="currentColor" />
      </div>
      <template #footer>
        <el-button @click="handleCancel">
          {{ $t('msg.universal.cancel') }}
        </el-button>
        <el-button type="primary" @click="handleConfirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { THEME_COLOR } from '@/constants'
import { getItem } from '@/utils/storage'
import { insertStyleToPage } from '@/utils/theme'

const dialogVisible = ref(false)
/**
 * 点击展示dialog
 */
const handleClick = () => {
  dialogVisible.value = true
}

const store = useStore()
const currentColor = ref(store.getters.themeColor)

/**
 * 确认时
 */
const handleConfirm = () => {
  dialogVisible.value = false
  // 修改主题
  insertStyleToPage(currentColor.value)
  store.commit('app/setThemeColor', currentColor.value)
}

/**
 * 取消时，修改color为原来的值
 */
const handleCancel = () => {
  dialogVisible.value = false
  currentColor.value = store.getters.themeColor
  store.commit('app/setThemeColor', getItem(THEME_COLOR))
}
</script>

<style scoped lang="scss">
.theme-select {
  .content {
    width: 40px;
    margin: auto;
  }
}
</style>
