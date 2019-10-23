// CommonJs 语法
const procRoute = require('./procRoute.js')
const Mock = require('mockjs')

const mocks = [
  ...procRoute
]

// for mock server
const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`/mock${url}`),
    type: type || 'get',
    response(req, res) {
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
    }
  }
}
module.exports = mocks.map(route => {
  return responseFake(route.url, route.type, route.response)
})

// ES6 语法
// import Mock from 'mockjs'

// import procRoute from './procRoute'

// const mocks = [
//   ...procRoute
// ]

// // for mock server
// const responseFake = (url, type, respond) => {
//   return {
//     url: new RegExp(`/mock${url}`),
//     type: type || 'get',
//     response(req, res) {
//       res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
//     }
//   }
// }

// export default mocks.map(route => {
//   return responseFake(route.url, route.type, route.response)
// })
