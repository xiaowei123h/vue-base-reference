import { getCachedViews, getVisitedViews, setCachedViews, setVisitedViews } from "@/common/local-storage.ts"
import { useSettingsStore } from "./settings.ts"
import type { RouteLocationNormalized } from "vue-router"

export type TagView = Partial<RouteLocationNormalized>

export const useTagsViewStore = defineStore("tags-view", () => {
  const { cacheTagsView } = useSettingsStore()
  const visitedViews = ref<TagView[]>(cacheTagsView ? getVisitedViews() : [])
  const cachedViews = ref<string[]>(cacheTagsView ? getCachedViews() : [])
  // 不需要缓存的页面
  const notCache = ['/login', '/test']

  // add
  const addVisitedView = (view: TagView) => {
    // 检查是否已经存在相同的 visitedView
    const index = visitedViews.value.findIndex(v => v.path === view.path)
    if (index !== -1) {
      // 防止 query 参数丢失
      visitedViews.value[index].fullPath !== view.fullPath && (visitedViews.value[index] = { ...view })
    } else if (!notCache.includes(view.path as string)) {
      // 添加新的 visitedView
      visitedViews.value.push({ ...view })
      setVisitedViews(visitedViews.value)
    }
  }

  const addCachedView = (view: TagView) => {
    if (typeof view.name !== "string") return
    if (cachedViews.value.includes(view.name)) return
    if (view.meta?.keepAlive) {
      cachedViews.value.push(view.name)
      setCachedViews(cachedViews.value)
    }
  }

  // del
  const delVisitedView = (view: TagView) => {
    const index = visitedViews.value.findIndex(v => v.path === view.path)
    if (index !== -1) {
      visitedViews.value.splice(index, 1)
      setVisitedViews(visitedViews.value)
    }
  }

  const delCachedView = (view: TagView) => {
    if (typeof view.name !== "string") return
    const index = cachedViews.value.indexOf(view.name)
    if (index !== -1) {
      cachedViews.value.splice(index, 1)
      setCachedViews(cachedViews.value)
    }
  }

  // delOthers
  const delOthersVisitedViews = (view: TagView) => {
    visitedViews.value = visitedViews.value.filter((v) => {
      return v.meta?.affix || v.path === view.path
    })
    setVisitedViews(visitedViews.value)
  }

  const delOthersCachedViews = (view: TagView) => {
    if (typeof view.name !== "string") return
    const index = cachedViews.value.indexOf(view.name)
    if (index !== -1) {
      cachedViews.value = cachedViews.value.slice(index, index + 1)
    } else {
      // 如果 index = -1, 没有缓存的 tags
      cachedViews.value = []
    }
    setCachedViews(cachedViews.value)
  }

  // delAll
  const delAllVisitedViews = () => {
    // 保留固定的 tags
    visitedViews.value = visitedViews.value.filter(tag => tag.meta?.affix)
    setVisitedViews(visitedViews.value)
  }

  const delAllCachedViews = () => {
    cachedViews.value = []
    setCachedViews(cachedViews.value)
  }

  return {
    visitedViews,
    cachedViews,
    addVisitedView,
    addCachedView,
    delVisitedView,
    delCachedView,
    delOthersVisitedViews,
    delOthersCachedViews,
    delAllVisitedViews,
    delAllCachedViews
  }
})