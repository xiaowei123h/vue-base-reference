export function getMessage(code: string, msg: string) {
  let message: string = ''
  let type: 'success' | 'error' | 'warning' | 'info' = 'info'
  switch (code) {
    case '200':
      message = msg
      type = 'success'
      break
    case '401':
      message = msg || '认证失败，无法访问系统资源'
      type = 'error'
      break
    case '403':
      message = msg || '当前操作没有权限'
      type = 'warning'
      break
    case '404':
      message = msg || '访问资源不存在'
      type = 'error'
      break
    case '500':
      message = msg || '访问出错，请联系管理员'
      type = 'error'
      break
    default:
      message = msg || '系统未知错误，请反馈给管理员'
      type = 'error'
  }
  return { msg: message, type: type }
}