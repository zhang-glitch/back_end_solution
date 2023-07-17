<template>
  <div class="header-search">
    <svg-icon
      icon="search"
      @click.stop="handleClickSearch"
      class="search-icon"
    ></svg-icon>
    <!-- 输入框 -->
    <el-select
      class="input-search"
      :class="[isVisibleSearch ? 'show' : '']"
      filterable
      default-first-option
      remote
      :remote-method="handleSearch"
      v-model="searchValue"
      @change="handleChange"
      placeholder="search"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.title"
        :label="option.item.title"
        :value="option.item.path"
      />
    </el-select>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { generateMenus } from '@/utils/route'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'
import { getFuseData } from './fuseData'
import { watchSwitchLang } from '@/utils/i18n'

const isVisibleSearch = ref(false)

const handleClickSearch = () => {
  isVisibleSearch.value = true
}

// 隐藏输入框
onMounted(() => {
  const inputSearchDom = document.getElementsByClassName('input-search')[0]
  document.body.onclick = function (e) {
    if (inputSearchDom.contains(e.target)) {
      isVisibleSearch.value = true
    } else {
      isVisibleSearch.value = false
    }
  }
})

// 处理输入
const searchValue = ref('')
const router = useRouter()
// 处理数据
const generateStandardData = computed(() => {
  // 获取搜索数据源
  const originData = generateMenus(router.getRoutes())
  console.log('getFuseData(originData)', getFuseData(originData))
  return getFuseData(originData)
})

/**
 * 初始化fuse
 */
/**
 * 搜索库相关
 */
let fuse
const initFuse = (searchPool) => {
  fuse = new Fuse(searchPool, {
    // 是否按优先级进行排序
    shouldSort: true,
    // 匹配长度超过这个值的才会被认为是匹配的
    minMatchCharLength: 1,
    // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
    // name：搜索的键
    // weight：对应的权重
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}
initFuse(generateStandardData.value)
/**
 * 处理搜索
 */
// 搜索结果
const searchOptions = ref([])
const handleSearch = (value) => {
  if (value !== '') {
    searchOptions.value = fuse.search(value)
  } else {
    searchOptions.value = []
  }
}

/**
 * 选中搜索结果
 */
const handleChange = (value) => {
  router.push(value)
}

/**
 * 监听输入框的关闭，然后清空数据
 */
watch(isVisibleSearch, (value) => {
  if (!value) {
    searchValue.value = ''
  }
})

/**
 * 国际化做到响应式
 *这是因为我们已经将搜索到的内容通过i18n已经转化了。已经是固定的值了。并不是通过`i18n.t()`去取出的，所以并不具备国际化了。我们可以直接在页面中处理可以查看这个区别。
 */
watchSwitchLang(() => {
  // 处理数据
  const generateStandardData = computed(() => {
    // 获取搜索数据源
    const originData = generateMenus(router.getRoutes())
    return getFuseData(originData)
  })
  initFuse(generateStandardData.value)
})
</script>

<style scoped lang="scss">
.header-search {
  display: flex;
  align-items: center;

  .search-icon {
    font-size: 18px;
  }
  .input-search {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;
  }
  .show.input-search {
    width: 210px;
    margin-left: 10px;
  }

  :deep(.el-select-dropdown__item) {
    font-weight: 800;
  }
}
</style>
