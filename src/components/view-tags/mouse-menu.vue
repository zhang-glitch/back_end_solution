<template>
  <ul class="mouse-menu">
    <li @click="handleRefreshClick">
      {{ $t('msg.tagsView.refresh') }}
    </li>
    <li @click="handleCloseRightClick">
      {{ $t('msg.tagsView.closeRight') }}
    </li>
    <li @click="handleCloseOtherClick">
      {{ $t('msg.tagsView.closeOther') }}
    </li>
  </ul>
</template>

<script setup>
import { useStore } from 'vuex'

const props = defineProps({
  currentTagIndex: {
    type: Number,
    required: true
  }
})

const emits = defineEmits('closeMenu')

/**
 * 刷新
 */
const handleRefreshClick = () => {
  location.reload()
  emits('closeMenu')
}

/**
 * 关闭右侧
 */
const store = useStore()
const handleCloseRightClick = () => {
  store.commit('app/removeRightTags', props.currentTagIndex)
  emits('closeMenu')
}

/**
 * 关闭其他
 */
const handleCloseOtherClick = () => {
  store.commit('app/removeOtherTags', props.currentTagIndex)
  emits('closeMenu')
}
</script>

<style scoped lang="scss">
.mouse-menu {
  position: fixed;
  background: #fff;
  z-index: 3000;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
