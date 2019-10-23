/**
 * 对 axios 的基本设置
 */
import axios from 'axios'
import * as userSrv from '@/utils/auth/UserSrv'
import { MessageBox, Message } from 'element-ui'
import qs from 'qs'
import * as jwt from 'jsonwebtoken'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

/**
 * 在请求头上加入token
 */
service.interceptors.request.use(
  config => {
    // axio对于data复杂对象默认使用Content-Type: application/json;
    config.data = qs.stringify(config.data)
    config.headers['Content-type'] = 'application/x-www-form-urlencoded'

    const token = userSrv.getToken()

    if (token) {
      config.headers['Bearer'] = token
    }
    return config
  },
  error => {
    console.log('request err:' + error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    if (response.status !== 200) {
      // Http 状态码判断
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
      // 服务状态码判断
      const responseData = response.data
      if (responseData.Code !== 2000) {
        console.log('services err:' + responseData.Message)
        Message({
          message: responseData.message,
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(new Error(responseData.Message || 'Error'))
      } else {
        return responseData.Data
      }
    }
  },
  error => {
    console.log('response err:' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
