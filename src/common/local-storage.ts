// 统一处理 localStorage

import { CacheKey } from "./cache-key.ts"
import type { LayoutsConfig } from "@/layout/config.ts"
import type { TagView } from "@/store/modules/tags-view.ts"
import type { SidebarClosed, SidebarOpened } from "@/layout/composables/app-key.ts"

// 系统布局配置
export function getLayoutsConfig() {
  const json = localStorage.getItem(CacheKey.CONFIG_LAYOUT)
  return json ? (JSON.parse(json)) : null
}
export function setLayoutsConfig(settings: LayoutsConfig) {
  localStorage.setItem(CacheKey.CONFIG_LAYOUT, JSON.stringify(settings))
}
export function removeLayoutsConfig() {
  localStorage.removeItem(CacheKey.CONFIG_LAYOUT)
}

// 侧边栏状态
export function getSidebarStatus() {
  return localStorage.getItem(CacheKey.SIDEBAR_STATUS)
}
export function setSidebarStatus(sidebarStatus: SidebarOpened | SidebarClosed) {
  localStorage.setItem(CacheKey.SIDEBAR_STATUS, sidebarStatus)
}

// 标签栏
export function getVisitedViews() {
  const json = localStorage.getItem(CacheKey.VISITED_VIEWS)
  return JSON.parse(json ?? "[]") as TagView[]
}
export function setVisitedViews(views: TagView[]) {
  views.forEach((view) => {
    // 删除不必要的属性，防止 JSON.stringify 处理到循环引用
    delete view.matched
    delete view.redirectedFrom
  })
  localStorage.setItem(CacheKey.VISITED_VIEWS, JSON.stringify(views))
}
export function getCachedViews() {
  const json = localStorage.getItem(CacheKey.CACHED_VIEWS)
  return JSON.parse(json ?? "[]") as string[]
}
export function setCachedViews(views: string[]) {
  localStorage.setItem(CacheKey.CACHED_VIEWS, JSON.stringify(views))
}