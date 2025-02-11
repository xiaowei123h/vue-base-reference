import { LayoutMode } from "./composables/app-key"
import { getLayoutsConfig } from "./composables/local-storage"

const DEFAULT_CONFIG = {
  // 布局模式
  layoutMode: LayoutMode.Left,
  // 是否显示设置按钮和面板
  showSettings: true,
  // 是否显示标签栏
  showTagsView: true,
  // 是否固定Header
  fixedHeader: true,
  // 是否显示页脚
  showFooter: true,
  // 是否显示logo
  showLogo: true,
  // 是否显示全屏按钮
  showScreenfull: true,
  // 是否显示搜索按钮
  showSearchMenu: true,
  // 是否缓存标签栏
  cacheTagsView: false
}

export const layoutsConfig = { ...DEFAULT_CONFIG, ...getLayoutsConfig() }