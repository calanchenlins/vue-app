/**
 * Oidc 授权码模式登陆接口
 */
import Oidc from 'oidc-client'
const config = {
  userStore: new Oidc.WebStorageStateStore(),
  authority: 'http://localhost:6102',
  client_id: 'Swagger_UI',
  redirect_uri: window.location.origin + '/Callback', // VueRouter设置为history模式,或者提供单独的redirect_uri静态页面进行
  // history模式下 host/x*/y*路由到host/x*/y*
  // hash模式下 host/x*/y*永远路由到host/x/y/#/
  response_type: 'code',
  scope: 'openid profile orders offline_access', // 默认为openid
  post_logout_redirect_uri: window.location.origin + '/index.html',
  silent_redirect_uri: window.location.origin + '/SilentCallback', // offline_access优先级高于silent_redirect_uri
  accessTokenExpiringNotificationTime: 1, // 令牌过期前多久触发静默刷新
  automaticSilentRenew: true, // 启用静默刷新
  filterProtocolClaims: true,
  loadUserInfo: true
}
var mgr = new Oidc.UserManager(config)
// 配置日志输出
Oidc.Log.logger = console
Oidc.Log.level = Oidc.Log.INFO

// 静默刷新失败时重新登陆
mgr.events.addSilentRenewError(function() {
  mgr.signinRedirect().catch(function(err) {
    debugger
    console.log(err)
  })
})

export default class SecurityService {
  // 重定向到授权终结点
  signIn() {
    debugger
    mgr.signinRedirect().catch(function(err) {
      debugger
      console.log(err)
    })
  }

  signinSilent() {
    mgr.signinSilent()
  }
  SilentRenew() {
    debugger
    mgr.signinSilentCallback().catch(function(err) {
      debugger
      console.log(err)
    })
  }

  // 登陆成功后跳转原页面
  signinRedirect() {
    debugger
    mgr.signinRedirectCallback({ response_mode: 'query' }).then(function(user) { //
      debugger
      // window.location = "#/";
      window.location.href = '/eshop/account/login'
    }).catch(function(e) {
      console.error(e)
    })
  }

  // 判断用户是否登陆
  getSignedIn() {
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function(user) {
        if (user == null) {
          return resolve(false)
        } else {
          return resolve(true)
        }
      }).catch(function(err) {
        console.log(err)
        return reject(err)
      })
    })
  }

  // 获取用户信息
  getUser() {
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function(user) {
        if (user == null) {
          return resolve(null)
        } else {
          return resolve(user)
        }
      }).catch(function(err) {
        console.log(err)
        return reject(err)
      })
    })
  }

  // 获取已登陆用户的access_token
  getAcessToken() {
    const self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function(user) {
        if (user == null) {
          self.signIn()
          return resolve(null)
        } else {
          return resolve(user.access_token)
        }
      }).catch(function(err) {
        console.log(err)
        return reject(err)
      })
    })
  }
}
