<script setup>
import { useDevice } from "@/layout/composables/useDevice"

const props = defineProps(['total'])

const { isMobile } = useDevice()
</script>

<template>
  <div class="search-footer">
    <template v-if="!isMobile">
      <span class="search-footer-item">
        <SvgIcon name="keyboard-enter" class="svg-icon" />
        <span>确认</span>
      </span>
      <span class="search-footer-item">
        <SvgIcon name="keyboard-up" class="svg-icon" />
        <SvgIcon name="keyboard-down" class="svg-icon" />
        <span>切换</span>
      </span>
      <span class="search-footer-item">
        <SvgIcon name="keyboard-esc" class="svg-icon" />
        <span>关闭</span>
      </span>
    </template>
    <span class="search-footer-total">共 {{ props.total }} 项</span>
  </div>
</template>

<style scoped>
.search-footer {
  display: flex;
  color: var(--el-text-color-secondary);
  font-size: 14px;
}
.search-footer-item {
  display: flex;
  align-items: center;
  margin-right: 12px;
}
.search-footer-item .svg-icon {
  margin-right: 5px;
  padding: 2px;
  font-size: 20px;
  background-color: var(--el-fill-color);
}
.search-footer-total {
  margin: 0 0 0 auto;
}
</style>