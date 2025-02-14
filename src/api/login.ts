import request from '@/utils/request.ts'

export function logoutApi(data: { token: string | undefined }) {
  return request({
    url: '/logout',
    method: 'post',
    data: data
  })
}

export function loginApi(data: any) {
  return request({
    url: '/login',
    method: 'post',
    data: data
  })
}

export function getInfoApi() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}