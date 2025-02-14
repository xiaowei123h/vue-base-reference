<script lang="ts" setup>
import { useAppStore } from "@/store/modules/app.ts"
import { useSettingsStore } from "@/store/modules/settings.ts"
import { useDevice } from "@/layout/composables/useDevice.ts"
import { useLayoutMode } from "@/layout/composables/useLayoutMode.ts"
import { AppMain, NavigationBar, Sidebar, TagsView } from "@/layout/components"

const { isMobile } = useDevice()
const { isLeft } = useLayoutMode()
const appStore = useAppStore()
const settingsStore = useSettingsStore()
const { showTagsView, fixedHeader } = storeToRefs(settingsStore)

// 定义计算属性 layoutClasses，用于控制布局的类名
const layoutClasses = computed(() => {
  return {
    hideSidebar: !appStore.sidebar.opened,
    openSidebar: appStore.sidebar.opened,
    withoutAnimation: appStore.sidebar.withoutAnimation,
    mobile: isMobile.value,
    noLeft: !isLeft.value
  }
})

// 用于处理点击 mobile 端侧边栏遮罩层的事件
function handleClickOutside() {
  appStore.closeSidebar(false)
}
</script>

<template>
  <div :class="layoutClasses" class="app-wrapper">
    <!-- mobile 端侧边栏遮罩层 -->
    <div v-if="layoutClasses.mobile && layoutClasses.openSidebar" class="drawer-bg" @click="handleClickOutside" />
    <!-- 左侧边栏 -->
    <Sidebar class="sidebar-container" />
    <!-- 主容器 -->
    <div :class="{ hasTagsView: showTagsView }" class="main-container">
      <!-- 头部导航栏和标签栏 -->
      <div :class="{ 'fixed-header': fixedHeader }" class="layout-header">
        <NavigationBar />
        <TagsView v-show="showTagsView" />
      </div>
      <!-- 页面主体内容 -->
      <AppMain class="app-main" />
    </div>
  </div>
</template>

<style scoped>
.app-wrapper {
  position: relative;
  width: 100%;
}
.app-wrapper::after {
  content: "";
  display: table;
  clear: both;
}
.drawer-bg {
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.sidebar-container {
  background-color: var(--v3-sidebar-menu-bg-color);
  transition: width 0.35s;
  width: var(--v3-sidebar-width);
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  border-right: var(--v3-sidebar-border-right);
}
.hideSidebar .sidebar-container {
  width: var(--v3-sidebar-hide-width);
}
.mobile .sidebar-container {
  transition: transform 0.35s;
  width: var(--v3-sidebar-width);
}
.mobile.hideSidebar .sidebar-container {
  pointer-events: none;
  transition-duration: 0.3s;
  transform: translate3d(calc(0px - var(--v3-sidebar-width)), 0, 0);
}
.mobile.noLeft .sidebar-container {
  background-color: var(--el-bg-color);
}
.withoutAnimation .sidebar-container,
.main-container {
  transition: none;
}
.hasTagsView .app-main {
  min-height: calc(100vh - var(--v3-header-height));
}
.hasTagsView .fixed-header + .app-main {
  padding-top: var(--v3-header-height);
}
.main-container {
  min-height: 100%;
  transition: margin-left 0.35s;
  margin-left: var(--v3-sidebar-width);
  position: relative;
}
.hideSidebar .main-container {
  margin-left: var(--v3-sidebar-hide-width);
}
.mobile .main-container {
  margin-left: 0px;
}
.withoutAnimation .main-container {
  transition: none;
}
.fixed-header {
  position: fixed !important;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - var(--v3-sidebar-width));
  transition: width 0.35s;
}
.fixed-header + .app-main {
  padding-top: var(--v3-navigationbar-height);
  height: 100vh;
  overflow: auto;
}
.hideSidebar .fixed-header {
  width: calc(100% - var(--v3-sidebar-hide-width));
}
.mobile .fixed-header {
  width: 100%;
}
.layout-header {
  position: relative;
  z-index: 9;
  background-color: var(--v3-header-bg-color);
  box-shadow: var(--v3-header-box-shadow);
  border-bottom: var(--v3-header-border-bottom);
}
.app-main {
  min-height: calc(100vh - var(--v3-navigationbar-height));
  position: relative;
  overflow: hidden;
}
</style>