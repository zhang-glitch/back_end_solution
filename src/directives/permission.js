import store from '@/store'

export default function () {
  return {
    mounted(el, bindings) {
      // 取出指令值
      const { value } = bindings
      // 获取按钮权限列表
      const actionPermissions = store.getters.userInfo.permission.points || []
      // 一个值 || 一个数组
      if (
        (value &&
          ['number', 'string'].includes(typeof value) &&
          actionPermissions.includes(value)) ||
        (value &&
          Array.isArray(value) &&
          value.filter((item) => actionPermissions.includes(item)).length ===
            value.length)
      ) {
        // eslint-disable-next-line no-useless-return
        return
      } else {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  }
}
