import axios from 'axios'
import qs from 'qs'
import { MessageBox, Message } from 'element-ui'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30000
})
service.interceptors.request.use(
  config => {
    debugger
    // axio对于data复杂对象默认使用Content-Type: application/json;
    config.data = qs.stringify(config.data)
    config.headers['Content-type'] = 'application/x-www-form-urlencoded'
    return config
  },
  error => {
    debugger
    console.log('request err:' + error)
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    debugger
    const res = response.data
    if (res.Code !== 2000) {
      console.log('services err:' + res.Message)
      Message({
        message: res.Message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.Message || 'Error'))
    } else {
      return res.Data
    }
  },
  error => { // 请求异常处理
    debugger
    console.log('response err:' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
export default class ProcRouteService {
  constructor(bmddjURL) {
    this.bmddjURL = qs.parse(bmddjURL)
  }
  /**
   * @param {*} data 保存的表单数据
   * 在拦截器中处理异常，只返回正常响应结果
   * 如果返回 new Promise() ，那么在调用方可以使用 then catch语法
   */
  Save(data) {
    debugger
    return new Promise((resolve, reject) => {
      service({
        url: '/ProcRoute/Save',
        method: 'post',
        data: data
        // params: this.bmddjURL
      }).then(res => {
        return resolve(res)
      })
        .catch(err => {
          return reject(err)
        })
    })
  }
  Update(data) {
    return new Promise((resolve, reject) => {
      service({
        url: '/ProcessingRouteUpdate',
        method: 'post',
        data: data,
        params: this.bmddjURL
      }).then(res => {
        return resolve(res)
      })
        .catch(err => {
          return reject(err)
        })
    })
  }
  Delete(Id) {
    return new Promise((resolve, reject) => {
      debugger
      service({
        url: '/ProcessingRouteDelete',
        method: 'post',
        data: { Id: Id },
        params: this.bmddjURL
      }).then(res => {
        return resolve(res)
      })
        .catch(err => {
          return reject(err)
        })
    })
  }
  GetProcRouteDetail(Id) {
    return new Promise((resolve, reject) => {
      debugger
      this.bmddjURL.Id = Id
      service({
        url: '/ProcessingRouteDetail',
        method: 'post',
        // data: { Id: Id },
        params: this.bmddjURL
      }).then(res => {
        debugger
        const graphData = {
          id: Id,
          graphRenderData: {// G6渲染数据
            nodes: [],
            edges: []
          }
        }
        res.forEach((ele, index, array) => {
          graphData.graphRenderData.nodes.push({
            id: ele.step_id, // step_id 工步组件Id
            label: ele.step_name, // step_name 工步组件名称
            nodeObjData: {}
          },)
          if (index !== 0) {
            graphData.graphRenderData.edges.push({
              source: array[index - 1].step_id,
              target: array[index].step_id
            },)
          }
        })
        return resolve(graphData)
      })
        .catch(err => {
          return reject(err)
        })
    })
  }
}
