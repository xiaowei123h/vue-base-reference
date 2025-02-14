import { useAppStore } from "@/store/modules/app.ts"
import { Device } from "@/layout/composables/app-key.ts"
import { computed } from "vue"

const appStore = useAppStore()

const isMobile = computed(() => appStore.device === Device.Mobile)
const isDesktop = computed(() => appStore.device === Device.Desktop)

// 设备类型 Composable
export function useDevice() {
  return { isMobile, isDesktop }
}