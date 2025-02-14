<script lang="ts" setup>
import { useSettingsStore } from "@/store/modules/settings.ts"
import { useTagsViewStore } from "@/store/modules/tags-view.ts"
import { Footer } from "../index.ts"

const tagsViewStore = useTagsViewStore()
const settingsStore = useSettingsStore()
</script>

<template>
  <section class="app-main">
    <div class="app-scrollbar">
      <!-- key 采用 route.path 和 route.fullPath 有着不同的效果，大多数时候 path 更通用 -->
      <router-view v-slot="{ Component, route }">
        <transition name="el-fade-in" mode="out-in">
          <keep-alive :include="tagsViewStore.cachedViews">
            <component :is="Component" :key="route.path" class="app-container-grow" />
          </keep-alive>
        </transition>
      </router-view>
      <!-- 页脚 -->
      <Footer v-if="settingsStore.showFooter" />
    </div>
    <!-- 返回顶部 -->
    <el-backtop />
    <!-- 返回顶部（固定 Header 情况下） -->
    <el-backtop target=".app-scrollbar" />
  </section>
</template>

<style scoped>
.app-main {
  width: 100%;
  display: flex;
}

.app-scrollbar {
  flex-grow: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
.app-scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.app-scrollbar::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #90939955;
}
.app-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #90939977;
}
.app-scrollbar::-webkit-scrollbar-thumb:active {
  background-color: #90939999;
}
.app-scrollbar::-webkit-scrollbar-corner {
  background-color: transparent;
}
.app-container-grow {
  flex-grow: 1;
}
</style>