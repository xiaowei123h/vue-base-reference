<script lang="ts" setup>
import { useSettingsStore } from "@/store/modules/settings.ts"
import { AppMain, Logo, NavigationBar, TagsView } from "../components"

const settingsStore = useSettingsStore()
const { showTagsView, showLogo } = storeToRefs(settingsStore)
</script>

<template>
  <div class="app-wrapper">
    <!-- 头部导航栏和标签栏 -->
    <div class="fixed-header layout-header">
      <div class="content">
        <Logo v-if="showLogo" :collapse="false" class="logo" />
        <NavigationBar class="navigation-bar" />
      </div>
      <TagsView v-show="showTagsView" />
    </div>
    <!-- 主容器 -->
    <div :class="{ hasTagsView: showTagsView }" class="main-container">
      <!-- 页面主体内容 -->
      <AppMain class="app-main" />
    </div>
  </div>
</template>

<style scoped>
.app-wrapper {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  z-index: 1002;
  width: 100%;
}
.fixed-header .logo {
  width: var(--v3-sidebar-width);
}
.fixed-header .content {
  display: flex;
}
.fixed-header .content .navigation-bar {
  flex: 1;
}
.layout-header {
  background-color: var(--v3-header-bg-color);
  box-shadow: var(--v3-header-box-shadow);
  border-bottom: var(--v3-header-border-bottom);
}
.main-container {
  min-height: 100%;
}
.app-main {
  transition: padding-left 0.35s;
  padding-top: var(--v3-navigationbar-height);
  height: 100vh;
  overflow: auto;
}
.hasTagsView .app-main {
  padding-top: var(--v3-header-height);
}
</style>