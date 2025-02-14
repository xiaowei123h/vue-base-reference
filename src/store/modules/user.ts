import { getToken, setToken, removeToken } from '@/utils/auth.ts'
import { logoutApi, loginApi, getInfoApi } from '@/api/login.ts'
import { useSettingsStore } from "./settings.ts"
import { useTagsViewStore } from "./tags-view.ts"

export const useUserStore = defineStore('user', () => {
  const token = ref<string>(getToken() || '')
  const id = ref<string>('')
  const name = ref<string>('')
  const avatar = ref<string>('')
  const roles = ref<string[]>([])
  const permission = ref<string[]>([])

  // 登录
  const login = (userInfo: any) => {
    return new Promise<void>((resolve, reject) => {
      loginApi(userInfo).then(res => {
        setToken(res.data.token)
        token.value = res.data.token
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }

  // 获取用户信息
  const getInfo = () => {
    return new Promise((resolve, reject) => {
      getInfoApi().then(res => {
        roles.value = res.data.roles.length > 0 ? res.data.roles : 'defaultRoles'
        name.value = res.data.name
        avatar.value = res.data.avatar
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }

  // 登出
  const logout = () => {
    return new Promise<void>((resolve, reject) => {
      logoutApi({token: getToken()}).then(() => {
        resetToken()
        resetTagsView()
        permission.value = []
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }

  const resetToken = () => {
    removeToken()
    token.value = ''
    roles.value = []
  }

  const resetTagsView = () => {
    const useSettings = useSettingsStore()
    const useTagsView = useTagsViewStore()
    if (!useSettings.cacheTagsView) {
      useTagsView.delAllVisitedViews()
      useTagsView.delAllCachedViews()
    }
  }

  return { token, id, roles, name, avatar, permission, login, getInfo, logout, resetToken, resetTagsView }
})