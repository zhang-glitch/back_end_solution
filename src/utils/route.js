/**
 * 获取全部二级路由
 */

function getRouteChildren(routes) {
  const _routes = []
  for (const item of routes) {
    if (item?.children?.length > 0) {
      _routes.push(...item.children)
    }
  }
  return _routes
}

/**
 * 过滤重复路由
 */
export function filterRoutes(routes) {
  // 获取二级路由
  const routeChildren = getRouteChildren(routes)
  return routes.filter((item) => {
    return !routeChildren.find((route) => route.path === item.path)
  })
}

/**
 * 过滤掉不展示在menu上的route
 */

// const singleRoute = ['profile']
export function generateMenus(routes) {
  const _route = []
  // 获取全部的路由
  const allRoutes = filterRoutes(routes)
  for (const route of allRoutes) {
    if (route?.children?.length > 0) {
      // 过滤掉profile等二级路由，将其弄成一级菜单
      if (route.path !== '/') {
        _route.push({
          ...route,
          children: generateMenus(route.children)
        })
      } else {
        _route.push(...generateMenus(route.children))
      }
    } else {
      if (route.meta && route.meta.title && route.meta.icon) {
        _route.push({
          ...route,
          children: []
        })
      }
    }
  }
  return _route
}
