import dayjs from 'dayjs'

/**
 * 格式化时间
 */

export const $timeFormat = (val, format = 'YYYY-MM-DD') => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }

  return dayjs(val).format(format)
}

export default function (app) {
  app.config.globalProperties = {
    $timeFormat
  }
}
