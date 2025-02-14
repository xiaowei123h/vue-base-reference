import axios from "axios"
import type { AxiosInstance, AxiosRequestConfig } from "axios"
import { getToken } from "@/utils/auth"
import { getMessage } from "@/utils/requestMessage"
import { ElMessage } from "element-plus"
import { useUserStore } from '@/store/modules/user'

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

// request拦截器
service.interceptors.request.use(config => {
  if (getToken()) {
    config.headers['Authorization'] = 'Bearer ' + getToken()
  }
  return config
}, error => Promise.reject(error))

// 响应拦截器
service.interceptors.response.use(res => {
  // 获取请求code和信息
  const code = res.data.code || '200'
  const message = res.data.msg || ''
  const { type, msg } = getMessage(code, message)
  if (msg) ElMessage({ message: msg, type: type })
  if (code == '401') {
    // 登出
    return useUserStore().logout()
  } else if (code != '200') {
    return Promise.reject(new Error(msg))
  } else {
    return Promise.resolve(res.data)
  }
},
  error => {
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service