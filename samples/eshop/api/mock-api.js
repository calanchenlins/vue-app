import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    name: '@sentence(10, 20)',
    pictureFileName: '@domain',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    display_time: '@datetime',
    price: '@integer(300, 5000)'
  }]
})

export default [
  {
    url: '/eshop/Catalog/items',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        Code: 2000,
        Data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
