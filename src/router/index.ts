import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from "vue-router"

const Layout = () => import('@/layout/index.vue')

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard.vue"),
        name: "Dashboard",
        meta: {
          title: "首页",
          svgIcon: "dashboard",
          affix: true
        }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login.vue'),
    name: 'Login',
    meta: {
      hidden: true
    }
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/views/error/404.vue'),
    meta: {
      hidden: true
    }
  }
]

// 动态路由
export const dynamicRoutes: RouteRecordRaw[] = [
  {
    path: '/permission',
    component: Layout,
    redirect: "/permission/permission-first",
    name: 'permission',
    meta: {
      title: '权限',
      elIcon: "DataBoard",
      alwaysShow: true,
      roles: ['admin', 'some']
    },
    children: [
      {
        path: 'permission-first',
        component: () => import('@/views/permissionFirst.vue'),
        name: 'permissionFirst',
        meta: {
          title: '权限子菜单一',
          roles: ['admin']
        }
      },
      {
        path: 'permission-second',
        component: () => import('@/views/permissionSecond.vue'),
        name: 'permissionSecond',
        meta: {
          title: '权限子菜单二',
          roles: ['admin']
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  // 页面滚动行为
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

export default router

