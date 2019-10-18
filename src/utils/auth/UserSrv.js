/**
 * OAuth 2.0 资源所有者密码模式登陆接口
 */
import axios from 'axios'
import { Message } from 'element-ui'
import Cookies from 'js-cookie'
import qs from 'qs'
import * as jsonwebtoken from 'jsonwebtoken'
const jwksClient = require('jwks-rsa')
const AccessKey = 'vue_ehop_token'
const RefreshKey = 'vue_ehop_refresh_token'
const storage_CachePublickey = 'PublicKey'
const service = axios.create({
  // token终结点:请求方式post
  // 参数类型 body
  baseURL: 'http://localhost:6102',
  timeout: 5000
})
debugger
service.interceptors.request.use(
  config => {
    // axio对于data对象默认使用Content-Type: application/json;
    // 在axio中会根据data的编码自动设置Content-Type
    config.headers['Content-type'] = 'application/x-www-form-urlencoded'
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    return response
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

/**
 * 从终结点获取JWKS
 */
const GetJWKS = function() {
  return new Promise((resolve, reject) => {
    service({
      url: '/.well-known/openid-configuration/jwks',
      method: 'get'
    }).then((response) => {
      return resolve(response.data.keys[0])
    }).catch((err) => {
      console.log(err)
      return reject(err)
    })
  })
}

const client = jwksClient({
  cache: true,
  cacheMaxEntries: 5, // Default value
  // cacheMaxAge: ms('10h'), // Default value
  jwksUri: service.defaults.baseURL + '/.well-known/openid-configuration/jwks'
})
/**
 * 获取JWKS公匙
 */
const GetPublicKey = function() {
  return new Promise((resolve, reject) => {
    const publicKey = localStorage.getItem(storage_CachePublickey)
    if (publicKey) {
      return resolve(publicKey)
    } else {
      GetJWKS().then((jwks) => {
        client.getSigningKey(jwks.kid, (err, key) => {
          if (!err) {
            localStorage.setItem(storage_CachePublickey, key.rsaPublicKey)
            return resolve(key.rsaPublicKey)
            // Now I can use this to configure my Express or Hapi middleware
          } else {
            return reject(err)
          }
        })
      }).catch((err) => {
        return reject(err)
      })
    }
  })
}

/**
 * 解码token
 * @param {*} token
 */
const GetDecodeJWT = function(token) {
  return new Promise((resolve, reject) => {
    GetPublicKey().then((key) => {
      jsonwebtoken.verify(token, key, function(err, decoded) {
        if (err) {
          return reject(err)
        }
        return resolve(decoded)
      })
    }).catch((err) => {
      return reject(err)
    })
  })
}

/**
 * 用户登陆
 * @param {*} userInfo
 */
export function login(userInfo) {
  const { username, password } = userInfo
  const data = {
    grant_type: 'password',
    client_id: 'eshopOnVue',
    username,
    password
  }
  //  首先进行url编码
  var dataUrlCode = qs.stringify(data)
  return new Promise((resolve, reject) => {
    service({
      url: '/connect/token',
      method: 'post',
      data: dataUrlCode
    }).then((response) => {
      Cookies.set(AccessKey, response.data.access_token)
      Cookies.set(RefreshKey, response.data.refresh_token)
      return resolve(true)// 在调用处通过then接收resolve参数
    }).catch((error) => {
      return reject(error)// 在调用处通过catch接收reject参数
    })
  })
}
/**
 * 静默刷新令牌
 */
export function refreshToken() {
  const refreshToken = Cookies.get(RefreshKey)
  const params = {
    grant_type: 'refresh_token',
    client_id: 'eshopOnVue',
    refresh_token: refreshToken
  }
  return new Promise((resolve, reject) => {
    service({
      url: '/connect/token',
      method: 'post',
      params
    }).then((response) => {
      Cookies.set(AccessKey, response.data.access_token)
      Cookies.set(RefreshKey, response.data.refresh_token)
    }).catch((error) => {
      console.log(error)
    })
  })
}
/**
 * 获取解码后JWT格式token
 */
export function GetJWT() {
  const token = getToken()
  return new Promise((resolve, reject) => {
    GetDecodeJWT(token).then((jwt) => {
      return resolve(jwt)
    }).catch((err) => reject(err))
  })
}

/**
 * 获取原始token
 */
export function getToken() {
  return Cookies.get(AccessKey)
}

