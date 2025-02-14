<script lang="ts" setup>
import Modal from "./Modal.vue"
import { Search } from "@element-plus/icons-vue"

/** 控制 modal 显隐 */
const visible = ref<boolean>(false)

/** 打开 modal */
function handleOpen() {
  visible.value = true
}
</script>

<template>
  <div>
    <el-tooltip effect="dark" content="搜索菜单" placement="bottom">
      <!-- <SvgIcon name="search" @click="handleOpen" class="svg-icon" /> -->
      <el-icon class="svg-icon" @click="handleOpen">
        <Search />
      </el-icon>
    </el-tooltip>
    <Modal v-model="visible" />
  </div>
</template>

<style scoped>
.svg-icon {
  font-size: 20px;
}
.svg-icon:focus {
  outline: none;
}
</style>