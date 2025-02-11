<script setup>
import { Expand, Fold } from "@element-plus/icons-vue"

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggleClick'])

function toggleClick() {
  emit("toggleClick")
}
</script>

<template>
  <!-- 控制侧边栏菜单展开收起的图标 -->
  <div @click="toggleClick">
    <el-icon :size="20" class="icon">
      <Fold v-if="props.isActive" />
      <Expand v-else />
    </el-icon>
  </div>
</template>

<style scoped>
.icon {
  vertical-align: middle;
  color: var(--v3-hamburger-text-color);
}
</style>