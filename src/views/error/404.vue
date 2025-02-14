<script lang="ts" setup>
const router = useRouter()
function handleBtn() {
  router.push('/')
}
</script>

<template>
  <div class="web404-container">
    <div class="web404-content">
      <img src="@/assets/images/404_img.jpg" class="web404-img" alt="404">
      <div class="web404-prompt">
        您访问的页面出错啦，请您返回首页~
      </div>
      <div class="web404-btn" @click="handleBtn">
        <el-icon class="web404-svg"><Back /></el-icon>
        返回首页
      </div>
    </div>
    
  </div>
</template>

<style scoped>
.web404-container {
  min-height: 100vh;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.web404-content {
  position: absolute;
  left: 50%;
  top: 19%;
  width: 40%;
  transform: translate(-50%, 0);
}
.web404-img {
  width: 100%;
}
.web404-prompt {
  margin: 20px 0 40px 0;
  font-size: 19px;
  text-align: center;
  font-weight: 500;
  letter-spacing: 2px;
}
.web404-btn {
  position: relative;
  left: 50%;
  margin-left: -80px;
  margin-top: 20px;
  width: 160px;
  height: 43px;
  text-align: center;
  line-height: 43px;
  background-color: #CBA453;
  font-size: 20px;
  color: #fff;
  letter-spacing: 2px;
  border-radius: 20px;
  cursor: pointer;
}
.web404-svg {
  vertical-align: middle;
}
</style>