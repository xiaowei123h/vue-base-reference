<script lang="ts" setup>
import { useAppStore } from "@/store/modules/app.ts"
import { useSettingsStore } from "@/store/modules/settings.ts"
import { useUserStore } from "@/store/modules/user.ts"
import { useDevice } from "@/layout/composables/useDevice.ts"
import { useLayoutMode } from "@/layout/composables/useLayoutMode.ts"
import { UserFilled } from "@element-plus/icons-vue"
import Screenfull from "@/components/Screenfull/index.vue"
import SearchMenu from "@/components/SearchMenu/index.vue"
import { Breadcrumb, Hamburger, Sidebar } from "../index.ts"

const { isMobile } = useDevice()
const { isTop } = useLayoutMode()
const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()
const settingsStore = useSettingsStore()
const { showScreenfull, showSearchMenu } = storeToRefs(settingsStore)

// 切换侧边栏
function toggleSidebar() {
  appStore.toggleSidebar(false)
}

// 登出
function logout() {
  userStore.logout().then(() => {
    router.push('/login')
  })
}
</script>

<template>
  <!-- 顶部导航 -->
  <div class="navigation-bar">
    <Hamburger
      v-if="!isTop || isMobile"
      :is-active="appStore.sidebar.opened"
      class="hamburger"
      @toggle-click="toggleSidebar"
    />
    <Breadcrumb v-if="!isTop || isMobile" class="breadcrumb" />
    <Sidebar v-if="isTop && !isMobile" class="sidebar" />
    <div class="right-menu">
      <SearchMenu v-if="showSearchMenu" class="right-menu-item" />
      <Screenfull v-if="showScreenfull" class="right-menu-item" />
      <el-dropdown>
        <div class="right-menu-item user">
          <el-avatar :icon="UserFilled" :src="userStore.avatar" :size="30" />
          <span>{{ userStore.name }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <a target="_blank" href="https://github.com/xiaowei123h/vue-base-reference.git">
              <el-dropdown-item>GitHub</el-dropdown-item>
            </a>
            <!-- <a target="_blank" href="">
              <el-dropdown-item>Gitee</el-dropdown-item>
            </a> -->
            <el-dropdown-item divided @click="logout">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped>
.navigation-bar {
  height: var(--v3-navigationbar-height);
  overflow: hidden;
  color: var(--v3-navigationbar-text-color);
  display: flex;
  justify-content: space-between;
}
.hamburger {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 15px;
  cursor: pointer;
}
.breadcrumb {
  flex: 1;
}
/* 参考 Bootstrap 的响应式设计将宽度设置为 576 */
@media screen and (max-width: 576px) {
  .breadcrumb {
    display: none;
  }
}
.sidebar {
  flex: 1;
  /* 设置 min-width 是为了让 Sidebar 里的 el-menu 宽度自适应 */
  min-width: 0px;
}
.sidebar :deep(.el-menu) {
  background-color: transparent;
}
.sidebar :deep(.el-sub-menu).is-active .el-sub-menu__title {
  color: var(--el-color-primary);
}
.right-menu {
  margin-right: 10px;
  height: 100%;
  display: flex;
  align-items: center;
}
.right-menu-item {
  margin: 0 10px;
  cursor: pointer;
}
.right-menu-item:last-child {
  margin-left: 20px;
}
.right-menu .user {
  display: flex;
  align-items: center;
}
.right-menu .user .el-avatar {
  margin-right: 10px;
}
.right-menu .user span {
  font-size: 16px;
}
</style>