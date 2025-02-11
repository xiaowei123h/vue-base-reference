import { CacheKey } from "@/common/cache-key"

// 系统布局配置
export function getLayoutsConfig() {
  const json = localStorage.getItem(CacheKey.CONFIG_LAYOUT)
  return json ? JSON.parse(json) : null
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