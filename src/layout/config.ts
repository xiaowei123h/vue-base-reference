import { LayoutMode } from "./composables/app-key.ts"
import { getLayoutsConfig } from "./composables/local-storage.ts"

/** 项目配置类型 */
export interface LayoutsConfig {
  /** 是否显示设置按钮和面板 */
  showSettings: boolean
  /** 布局模式 */
  layoutMode: LayoutMode
  /** 是否显示标签栏 */
  showTagsView: boolean
  /** 是否显示 Logo */
  showLogo: boolean
  /** 是否固定 Header */
  fixedHeader: boolean
  /** 是否显示页脚 */
  showFooter: boolean
  /** 是否显示全屏按钮 */
  showScreenfull: boolean
  /** 是否显示搜索按钮 */
  showSearchMenu: boolean
  /** 是否缓存标签栏 */
  cacheTagsView: boolean
}

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

export const layoutsConfig: LayoutsConfig = { ...DEFAULT_CONFIG, ...getLayoutsConfig() }