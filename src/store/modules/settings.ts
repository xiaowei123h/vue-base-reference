import { setLayoutsConfig } from '@/layout/composables/local-storage.ts'
import { layoutsConfig } from "@/layout/config.ts"
import type { LayoutsConfig } from "@/layout/config.ts"
import type { Ref } from "vue"

type SettingsStore = {
  // 使用映射类型来遍历 LayoutsConfig 对象的键
  [Key in keyof LayoutsConfig]: Ref<LayoutsConfig[Key]>
}

type SettingsStoreKey = keyof SettingsStore

export const useSettingsStore = defineStore('settings', () => {
  const state = {} as SettingsStore
  // 将state下的每个键值对应的值都设为响应式
  for (const [key, value] of Object.entries(layoutsConfig)) {
    const refValue = ref(value)
    // @ts-expect-error ignore
    state[key as SettingsStoreKey] = refValue
    // 监听到值变化了就把处理后不响应的普通对象再存在本地存储中
    watch(refValue, () => {
      const settings = getCacheData()
      setLayoutsConfig(settings)
    })
  }
 
  // 将state下的键值对处理为不响应的对象返回
  const getCacheData = () => {
    const settings = {} as LayoutsConfig
    for (const [key, value] of Object.entries(state)) {
      // @ts-expect-error ignore
      settings[key as SettingsStoreKey] = value.value
    }
    return settings
  }

  // 返回组件配置直接暴露配置对象
  return state
})