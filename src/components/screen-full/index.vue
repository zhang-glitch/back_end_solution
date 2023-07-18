<template>
  <div class="screen-full">
    <el-tooltip :content="$t('msg.navBar.screenfull')">
      <svg-icon
        id="guide-full"
        :icon="iconName"
        @click="handleClick"
      ></svg-icon>
    </el-tooltip>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import screenfull from 'screenfull'

const isFull = ref(false)
const iconName = computed(() =>
  isFull.value ? 'exit-fullscreen' : 'fullscreen'
)

// 监听变化
const change = () => {
  isFull.value = screenfull.isFullscreen
}

// 切换事件
const handleClick = () => {
  screenfull.toggle()
}

// 设置侦听器
onMounted(() => {
  screenfull.on('change', change)
})

// 删除侦听器
onUnmounted(() => {
  screenfull.off('change', change)
})
</script>

<style scoped></style>
