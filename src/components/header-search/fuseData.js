import i18n from '@/i18n'

export function getFuseData(originData) {
  // 处理孩子到第一层
  function expendData(originData) {
    const result = []
    for (const item of originData) {
      if (item?.children?.length > 0) {
        result.push(...expendData(item.children))
        result.push({ title: item?.meta?.title, path: item.path })
      } else {
        result.push(item)
      }
    }
    return result
  }
  const expendArr = expendData(originData)
  // 处理数据
  // 我们需要将数据处理成fuse可以识别的数据。就是将搜索的字段，放在第一层级中。
  const data = []
  // 获取user的一级title
  const userRoute = expendArr.find((item) => item.path === '/user')
  // 获取article的一级title
  const articleRoute = expendArr.find((item) => item.path === '/article')
  for (const item of expendArr) {
    // 处理title
    if (item.path.includes('/user/')) {
      data.push({
        title: `${i18n.global.t(
          `msg.route.${userRoute?.title}`
        )} > ${i18n.global.t(`msg.route.${item.meta.title}`)}`,
        path: item.path
      })
    } else if (item.path.includes('/article/')) {
      data.push({
        title: `${i18n.global.t(
          `msg.route.${articleRoute?.title}`
        )} > ${i18n.global.t(`msg.route.${item.meta.title}`)}`,
        path: item.path
      })
    } else {
      data.push({
        title:
          (item?.meta?.title &&
            i18n.global.t(`msg.route.${item?.meta?.title}`)) ||
          i18n.global.t(`msg.route.${item.title}`),
        path: item.path
      })
    }
  }
  return data
}

// /**
//  * 筛选出可供搜索的路由对象
//  * @param routes 路由表
//  * @param basePath 基础路径，默认为 /
//  * @param prefixTitle
//  */
// export const getFuseData = (routes, basePath = '/', prefixTitle = []) => {
//   // 创建 result 数据
//   let res = []
//   // 循环 routes 路由
//   for (const route of routes) {
//     // 创建包含 path 和 title 的 item
//     const data = {
//       path: route.path,
//       title: [...prefixTitle]
//     }
//     // 当前存在 meta 时，使用 i18n 解析国际化数据，组合成新的 title 内容
//     // 动态路由不允许被搜索
//     // 匹配动态路由的正则
//     const re = /.*\/:.*/
//     if (route.meta && route.meta.title && !re.exec(route.path)) {
//       const i18ntitle = i18n.global.t(`msg.route.${route.meta.title}`)
//       data.title = [...data.title, i18ntitle]
//       res.push(data)
//     }

//     // 存在 children 时，迭代调用
//     if (route.children) {
//       const tempRoutes = getFuseData(route.children, data.path, data.title)
//       if (tempRoutes.length >= 1) {
//         res = [...res, ...tempRoutes]
//       }
//     }
//   }
//   return res
// }
