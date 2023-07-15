<template>
  <div class="language-select">
    <el-dropdown @command="handleLanguageSelect" trigger="click">
      <!-- 这里需要包裹一层，不然会报错 -->
      <div>
        <el-tooltip :effect="effect" :content="$t('msg.navBar.lang')">
          <svg-icon icon="language" class="language-icon"></svg-icon>
        </el-tooltip>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :disabled="language === 'zh'" command="zh">
            中文
          </el-dropdown-item>
          <el-dropdown-item :disabled="language === 'en'" command="en">
            English
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

defineProps({
  effect: {
    type: String,
    default: 'light',
    validator(value) {
      return ['dark', 'light'].includes(value)
    }
  }
})

const store = useStore()
const language = computed(() => store.getters.language)

// 处理语言选择
const i18n = useI18n()
const handleLanguageSelect = (lang) => {
  i18n.locale.value = lang
  store.commit('app/setLanguage', lang)
  ElMessage.success(i18n.t('msg.toast.switchLangSuccess'))
  console.log('lang', lang)
}
</script>

<style scoped lang="scss">
.language-select {
  .language-icon {
    font-size: 24px;
  }
  &:hover {
    cursor: pointer;
  }
}
</style>
