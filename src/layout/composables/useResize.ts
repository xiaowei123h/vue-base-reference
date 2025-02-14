import { useAppStore } from "@/store/modules/app.ts"
import { Device } from "@/layout/composables/app-key.ts"
import { onBeforeMount, onMounted, onBeforeUnmount } from "vue"

/** 参考 Bootstrap 的响应式设计将最大移动端宽度设置为 992 */
const MAX_MOBILE_WIDTH = 992

// 根据浏览器宽度变化，变换layout布局
export function useResize() {
  const appStore = useAppStore()

  // 用于判断当前设备是否为移动端
  const isMobile = () => {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < MAX_MOBILE_WIDTH
  }

  // 用于处理窗口大小变化事件
  const resizeHandler = () => {
    if (!document.hidden) {
      const _isMobile = isMobile()
      appStore.toggleDevice(_isMobile ? Device.Mobile : Device.Desktop)
      _isMobile && appStore.closeSidebar(true)
    }
  }

  // 在组件挂载前添加窗口大小变化事件监听器
  onBeforeMount(() => {
    window.addEventListener("resize", resizeHandler)
  })

  // 在组件挂载后根据窗口大小判断设备类型并调整布局
  onMounted(() => {
    if (isMobile()) {
      appStore.toggleDevice(Device.Mobile)
      appStore.closeSidebar(true)
    }
  })

  // 在组件卸载前移除窗口大小变化事件监听器
  onBeforeUnmount(() => {
    window.removeEventListener("resize", resizeHandler)
  })
}