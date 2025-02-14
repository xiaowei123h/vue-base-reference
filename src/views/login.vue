<script lang="ts" setup>
import { Key, Lock, User } from "@element-plus/icons-vue"
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useUserStore } from '@/store/modules/user'

interface loginFormType {
  username: 'admin' | 'editor',
  password: string,
  code: string
}

const loginForm: Ref<loginFormType> = ref({
  username: 'admin',
  password: '123456',
  code: '7364'
})

const loginRules: FormRules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" }
  ],
  code: [
    { required: true, message: "请输入验证码", trigger: "blur" }
  ]
}

const loading = ref(false)
const router = useRouter()
const loginRef = ref<FormInstance | null>(null)

function handleLogin() {
  loading.value = true
  loginRef.value?.validate((valid) => {
    if (valid) {
      loading.value = false
      useUserStore().login(loginForm.value).then(() => {
        router.push('/')
      })
    } else {
      loading.value = false
      ElMessage.error("请将信息填写完整再登录！")
    }
  })
}

// vite使用本地图片方法
const url: string = new URL('@/assets/images/code.jpg', import.meta.url).href
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-title">
        后台管理系统
      </div>
      <div class="login-form">
        <el-form ref="loginRef" :model="loginForm" :rules="loginRules">
          <el-form-item prop="username">
            <el-input
              size="large"
              :prefix-icon="User"
              placeholder="用户名"
              v-model="loginForm.username" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              size="large"
              placeholder="密码"
              :prefix-icon="Lock"
              show-password
              v-model="loginForm.password" />
          </el-form-item>
          <el-form-item prop="code" class="code-content">
            <el-input
              size="large"
              placeholder="验证码"
              :prefix-icon="Key"
              style="width: 63%"
              v-model="loginForm.code" />
            <el-image :src="url" class="code-image"></el-image>
          </el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            size="large"
            style="width: 100%;"
            @click.prevent="handleLogin">
            登 录
          </el-button>
        </el-form>
      </div>

      <div class="astronaut-content">
        <img src="@/assets/images/astronaut.png" alt="astronaut" class="astronaut-img">
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
}
.login-card {
  position: relative;
  width: 480px;
  max-width: 90%;
  height: 410px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px #dcdfe6;
}
.login-title {
  text-align: center;
  font-size: 30px;
  font-weight: 500;
  letter-spacing: 3px;
  padding: 30px;
  font-family: '楷体';
}
.login-form {
  padding: 20px 40px;
}
.code-image {
  width: 35%;
  height: 40px;
}
.el-form-item.code-content >:last-child {
  justify-content: space-between !important;
}
.astronaut-content {
  position: absolute;
  bottom: 372px;
  right: -10%;
  width: 50%;
}
.astronaut-img {
  width: 100%;
}
</style>