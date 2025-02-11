// 统一处理 localStorage

import { CacheKey } from "./cache-key"

// 系统布局配置
export function getLayoutsConfig() {
  const json = localStorage.getItem(CacheKey.CONFIG_LAYOUT)
  return json ? (JSON.parse(json)) : null
}
export function setLayoutsConfig(settings) {
  localStorage.setItem(CacheKey.CONFIG_LAYOUT, JSON.stringify(settings))
}
export function removeLayoutsConfig() {
  localStorage.removeItem(CacheKey.CONFIG_LAYOUT)
}

// 侧边栏状态
export function getSidebarStatus() {
  return localStorage.getItem(CacheKey.SIDEBAR_STATUS)
}
export function setSidebarStatus(sidebarStatus) {
  localStorage.setItem(CacheKey.SIDEBAR_STATUS, sidebarStatus)
}

// 正在应用的主题名称
export function getActiveThemeName() {
  return localStorage.getItem(CacheKey.ACTIVE_THEME_NAME)
}
export function setActiveThemeName(themeName) {
  localStorage.setItem(CacheKey.ACTIVE_THEME_NAME, themeName)
}

// 标签栏
export function getVisitedViews() {
  const json = localStorage.getItem(CacheKey.VISITED_VIEWS)
  return JSON.parse(json ?? "[]")
}
export function setVisitedViews(views) {
  views.forEach((view) => {
    // 删除不必要的属性，防止 JSON.stringify 处理到循环引用
    delete view.matched
    delete view.redirectedFrom
  })
  localStorage.setItem(CacheKey.VISITED_VIEWS, JSON.stringify(views))
}
export function getCachedViews() {
  const json = localStorage.getItem(CacheKey.CACHED_VIEWS)
  return JSON.parse(json ?? "[]")
}
export function setCachedViews(views) {
  localStorage.setItem(CacheKey.CACHED_VIEWS, JSON.stringify(views))
}