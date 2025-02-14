import { constantRoutes, dynamicRoutes } from '@/router'
import type { RouteRecordRaw } from "vue-router"

function hasPermission(roles: string[], route: RouteRecordRaw) {
  const routeRoles = route.meta?.roles as string[] | undefined
  return routeRoles ? roles.some(role => routeRoles.includes(role)) : true
}

function filterDynamicRoutes(routes: RouteRecordRaw[], roles: string[]) {
  const res: RouteRecordRaw[] = []
  routes.forEach((route) => {
    const tempRoute = {...route}
    if (hasPermission(roles, tempRoute)) {
      if (tempRoute.children) {
        tempRoute.children = filterDynamicRoutes(tempRoute.children, roles)
      }
      res.push(tempRoute)
    }
  })
  return res
}

export const usePermissionStore = defineStore('permission', () => {
  // 可访问的路由
  const routes = ref<RouteRecordRaw[]>([])

  // 有动态权限的路由
  const addRoutes = ref<RouteRecordRaw[]>([])

  // 根据角色生成可访问的Routes（可访问的路由 = 常驻路由 + 有权限的可动态访问的路由）
  const setRoutes = (roles: string[]) => {
    const accessedRoutes = filterDynamicRoutes(dynamicRoutes, roles)
    set(accessedRoutes)
  }

  // 所有路由 = 常驻路由 + 所有动态路由 （用于不开启权限验证使用，直接加载全部路由）
  const setALLRoutes = () => {
    set(dynamicRoutes)
  }

  // 统一设置
  const set = (accessedRoutes: RouteRecordRaw[]) => {
    routes.value = constantRoutes.concat(accessedRoutes)
    addRoutes.value = accessedRoutes
  }

  return { routes, addRoutes, setRoutes }
})