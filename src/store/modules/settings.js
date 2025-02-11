import { setLayoutsConfig } from '@/layout/composables/local-storage'
import { layoutsConfig } from "@/layout/config"

export const useSettingsStore = defineStore('settings', () => {
  const state = {}
  // 将state下的每个键值对应的值都设为响应式
  for (const [key, value] of Object.entries(layoutsConfig)) {
    const refValue = ref(value)
    state[key] = refValue
    // 监听到值变化了就把处理后不响应的普通对象再存在本地存储中
    watch(refValue, () => {
      const settings = getCacheData()
      setLayoutsConfig(settings)
    })
  }

  // 将state下的键值对处理为不响应的对象返回
  const getCacheData = () => {
    const settings = {}
    for (const [key, value] of Object.entries(state)) {
      settings[key] = value.value
    }
    return settings
  }

  // 返回组件配置直接暴露配置对象
  return state
})