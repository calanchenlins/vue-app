/**
 * 对 axios 的基本设置
 */
import axios from 'axios'
import * as userSrv from '@/utils/auth/UserSrv'
import { MessageBox, Message } from 'element-ui'
import * as jwt from 'jsonwebtoken'

const service = axios.create({
  timeout: 5000
})

/**
 * 在请求头上加入token
 */
service.interceptors.request.use(
  config => {
    const token = userSrv.getToken()

    if (token) {
      config.headers['Bearer'] = token
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    if (response.status !== 200) {
      if (response.status === 401 || response.status === 403) {
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          userSrv.refreshToken()
          location.reload()
        })
      }
      return Promise.reject(new Error(response.message || 'Error'))
    } else {
      return response.data
    }
  },
  error => {
    console.log('err:' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
