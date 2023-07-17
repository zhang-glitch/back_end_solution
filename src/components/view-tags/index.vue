<template>
  <div class="view-tags">
    <el-scrollbar>
      <a
        v-for="(tag, index) in viewTags"
        :key="tag.path"
        class="tag-item-wrapper"
        @click="handleTagItem(tag)"
        @contextmenu.prevent="handleOpenMenu($event, index)"
      >
        <el-tag
          :closable="!isActive(tag)"
          @close="handleDeleteTag(index)"
          class="tag-item"
          :class="{ 'tag-active-item': isActive(tag) }"
        >
          <!-- 活跃的时候加上图标 -->
          <span :class="{ 'dot-active-item': isActive(tag), 'dot-item': true }"
            >·</span
          >
          {{ $t(`msg.route.${tag?.meta?.title}`) }}
        </el-tag>
      </a>
    </el-scrollbar>
    <mouse-menu
      v-show="isMenu"
      :style="menuStyle"
      :currentTagIndex="currentTagIndex"
      @close-menu="handleCloseMenu"
    ></mouse-menu>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
// import { generateTitle } from '@/utils/i18n'
import MouseMenu from './mouse-menu.vue'

const store = useStore()
const viewTags = computed(() => store.getters.viewTags)

/**
 * 处理点击item
 */
const router = useRouter()
const route = useRoute()
// 是否活跃的tag
const isActive = (tag) => {
  return tag.path === route.path
}
const tagBg = computed(() => store.getters.cssVar.menuBg)
const handleTagItem = (item) => {
  router.push(item.path)
}

/**
 * 关闭标签
 */
const handleDeleteTag = (index) => {
  const _viewTags = store.getters.viewTags
  _viewTags.splice(index, 1)
  store.commit('app/setViewTags', _viewTags)
}

/**
 * 鼠标右键,菜单展示
 */
const isMenu = ref(false)
const currentTagIndex = ref(0)
const menuStyle = reactive({
  left: 0,
  top: 0
})
const handleOpenMenu = (e, index) => {
  const { x, y } = e
  menuStyle.left = x + 'px'
  menuStyle.top = y + 'px'
  isMenu.value = true
  currentTagIndex.value = index
}

/**
 * 点击后关闭菜单
 */
const handleCloseMenu = () => {
  isMenu.value = false
}

const closeMenu = () => {
  isMenu.value = false
}

/**
 * 监听变化,没点击时，关闭menu
 */
watch(isMenu, (val) => {
  if (val) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})
</script>

<style scoped lang="scss">
.view-tags {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .tag-item-wrapper {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;

    .tag-item {
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      border: 1px solid #d8dce5;
      border-radius: 0;

      /* .el-tag__close {
        color: #495060;
        &:hover {
          color: #495060;
          background: transparent;
        }
      } */

      .dot-item {
        width: 8px;
        height: 8px;
        font-weight: 800;
        display: none;
        border-radius: 50%;
        margin-right: 3px;
        background: #fff;
        vertical-align: middle;
      }
      .dot-active-item {
        display: inline-block;
        margin-top: -3px;
      }
    }

    .tag-active-item {
      color: #fff;
      background: v-bind(tagBg);
    }
  }
}
</style>
