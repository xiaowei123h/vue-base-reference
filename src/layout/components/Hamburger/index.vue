<script lang="ts" setup>
import { Expand, Fold } from "@element-plus/icons-vue"

interface Props {
  isActive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false
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