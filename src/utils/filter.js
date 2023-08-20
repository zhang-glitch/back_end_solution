import dayjs from 'dayjs'
import rt from 'dayjs/plugin/relativeTime'
import store from '@/store'
// 语言包
import 'dayjs/locale/zh-cn'

/**
 * 格式化时间
 */

export const $timeFormat = (val, format = 'YYYY-MM-DD') => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }

  return dayjs(val).format(format)
}

// 加载相对时间插件
dayjs.extend(rt)

function $relativeTime(val) {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs()
    .locale(store.getters.language === 'zh' ? 'zh-cn' : 'en')
    .to(dayjs(val))
}

export default function (app) {
  app.config.globalProperties = {
    $timeFormat,
    $relativeTime
  }
}
