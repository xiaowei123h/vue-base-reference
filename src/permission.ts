import router from './router'
import { useUserStore } from '@/store/modules/user'
import { usePermissionStore } from '@/store/modules/permission'
import { setRouteChange } from "@/layout/composables/useRouteListener"
import { getToken } from '@/utils/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 虚拟页面进度条
NProgress.configure({ showSpinner: false })

// 白名单
const whitList: string[] = ['/login']

// 全局前置守卫
router.beforeEach(async (to, from) => {
  // 进度条开始
  NProgress.start()
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()

  // 没登录
  if (!getToken()) {
    // 在白名单直接访问
    if (whitList.includes(to.path)) return true
    // 没登录，不在白名单，重定向到登录页
    return '/login'
  }

  // 已经登录后访问登录页，重定向到首页
  if (to.path === '/login') return '/'

  // 用户有角色权限
  if (userStore.roles.length !== 0) return true

  try {
    await userStore.getInfo()
    permissionStore.setRoutes(userStore.roles)
    permissionStore.addRoutes.forEach(route => router.addRoute(route))
    return { ...to, replace: true }
  } catch (error) {
    // 过程中发生任何错误，都直接重置 Token，并重定向到登录页面
    userStore.resetToken()
    return "/login"
  }
})

router.afterEach((to) => {
  setRouteChange(to)
  // 进度条停止
  NProgress.done()
})