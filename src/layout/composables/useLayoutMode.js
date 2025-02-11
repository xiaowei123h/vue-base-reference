import { computed } from "vue"
import { useSettingsStore } from "@/store/modules/settings"
import { LayoutMode } from "./app-key"

const settingsStore = useSettingsStore()

const isLeft = computed(() => settingsStore.layoutMode === LayoutMode.Left)
const isTop = computed(() => settingsStore.layoutMode === LayoutMode.Top)
const isLeftTop = computed(() => settingsStore.layoutMode === LayoutMode.LeftTop)

function setLayoutMode(mode) {
  settingsStore.layoutMode = mode
}

// 布局模式
export function useLayoutMode() {
  return { isLeft, isTop, isLeftTop, setLayoutMode }
}