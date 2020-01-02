import request from '@/utils/request'

export function getProducts(params) {
  return request({
    url: '/eshop/Catalog/items',
    method: 'get',
    params
  })
}
