<script lang="ts" setup>
import { useRouteListener } from "@/layout/composables/useRouteListener.ts"
import { compile } from "path-to-regexp"
import { useRoute, useRouter } from "vue-router"
import { ref } from "vue"
import type { RouteLocationMatched } from "vue-router"

const route = useRoute()

const router = useRouter()

const { listenerRouteChange } = useRouteListener()

// 定义响应式数据 breadcrumbs，用于存储面包屑导航信息
const breadcrumbs = ref<RouteLocationMatched[]>([])

// 获取面包屑导航信息
function getBreadcrumb() {
  breadcrumbs.value = route.matched.filter(item => item.meta?.title && item.meta?.breadcrumb !== false)
}

// 编译路由路径
function pathCompile(path: string) {
  const toPath = compile(path)
  return toPath(route.params)
}

// 处理面包屑导航点击事件
function handleLink(item: RouteLocationMatched) {
  const { redirect, path } = item
  if (redirect) return router.push(redirect as string)
  router.push(pathCompile(path))
}

// 监听路由变化，更新面包屑导航信息
listenerRouteChange((route) => {
  if (route.path.startsWith("/redirect/")) return
  getBreadcrumb()
}, true)
</script>

<template>
  <!-- 面包屑导航 -->
  <el-breadcrumb>
    <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
      <span v-if="item.redirect === 'noRedirect' || index === breadcrumbs.length - 1" class="no-redirect">
        {{ item.meta.title }}
      </span>
      <a v-else @click.prevent="handleLink(item)">
        {{ item.meta.title }}
      </a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped>
.el-breadcrumb {
  line-height: var(--v3-navigationbar-height);
}
.el-breadcrumb .no-redirect {
  color: var(--el-text-color-placeholder);
}
.el-breadcrumb a {
  font-weight: normal;
}
</style>