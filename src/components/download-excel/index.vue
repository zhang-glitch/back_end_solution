<template>
  <div class="download-excel">
    <el-row justify="center">
      <el-col :span="5"> 导出模板名称: </el-col>
      <el-col :span="17">
        <el-input
          v-model="value"
          @input="handleInput"
          placeholder="请输入导出模板名称"
        ></el-input>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import i18n from '@/i18n'
import { ref } from 'vue'
import { watchSwitchLang } from '../../utils/i18n'
const { t } = i18n.global
</script>

<script setup>
const props = defineProps({
  templateValue: {
    type: String,
    default: t('msg.excel.defaultName')
  }
})

const emits = defineEmits(['update:templateValue'])
const value = ref(props.templateValue)

const handleInput = (value) => {
  emits('update:templateValue', value)
}
/**
 * 我们在vuex中定义语言变量是为了告诉I18n当前是啥语言，让其当前上下问处于当前语言环境中，并不会让我们在代码中使用到的内容做到响应式。但是模板中是可以的。
 */
watchSwitchLang(() => {
  value.value = t('msg.excel.defaultName')
})
</script>

<style scoped></style>
