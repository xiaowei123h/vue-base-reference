<script lang="ts" setup>
import { useLayoutMode } from "@/layout/composables/useLayoutMode.ts"
import { useDevice } from "@/layout/composables/useDevice.ts"
import { useSettingsStore } from "@/store/modules/settings.ts"
import { useResize } from "@/layout/composables/useResize.ts"
import LeftMode from "./modes/LeftMode.vue"
import LeftTopMode from "./modes/LeftTopMode.vue"
import TopMode from "./modes/TopMode.vue"
import { RightPanel, Settings } from "@/layout/components"
import { getCssVar, setCssVar } from "@/utils/css"

// Layout 布局响应式
useResize()

const { isLeft, isTop, isLeftTop } = useLayoutMode()
const { isMobile } = useDevice()
const settingsStore = useSettingsStore()
const { showSettings, showTagsView } = storeToRefs(settingsStore)

// 隐藏标签栏时删除其高度，是为了让 Logo 组件高度和 Header 区域高度始终一致
const cssVarName = "--v3-tagsview-height"
const v3TagsviewHeight = getCssVar(cssVarName)
watchEffect(() => {
  showTagsView.value ? setCssVar(cssVarName, v3TagsviewHeight) : setCssVar(cssVarName, "0px")
})
</script>

<template>
  <div>
    <!-- 左侧模式 -->
    <LeftMode v-if="isLeft || isMobile" />
    <!-- 顶部模式 -->
    <TopMode v-else-if="isTop" />
    <!-- 混合模式 -->
    <LeftTopMode v-else-if="isLeftTop" />
    <!-- 右侧设置面板 -->
    <RightPanel v-if="showSettings">
      <Settings />
    </RightPanel>
  </div>
</template>