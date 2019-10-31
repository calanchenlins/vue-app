import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    name: '@sentence(10, 20)',
    url: '@domain',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    display_time: '@datetime',
    price: '@integer(300, 5000)'
  }]
})

export default [
  {
    url: '/api/Catalog/items',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
