import request from '@/utils/request'

export function logoutApi(data) {
  return request({
    url: '/logout',
    method: 'post',
    data: data
  })
}

export function loginApi(data) {
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