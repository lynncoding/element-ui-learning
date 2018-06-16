import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const movies = []
const count = 100

for (let i = 0; i < count; i++) {
  movies.push(Mock.mock({
    id: '@increment',
    name: '@title',
    description: '@sentence(3, 5)',
    releaseDate: '@date',
    director: '@name',
    writer: '@name',
    'range|1-10': '★',
    'releaseCountry|1': ['CN', 'US', 'JP', 'EU'],
    'duration|10-120': 100
  }))
}

export default {
  getMovies: config => {
    const {range, type, title, page = 1, limit = 10, sort} = param2Obj(config.url)
    let mockList = movies.filter(item => {
      if (range && item.range !== +range) return false
      if (type && item.type !== type) return false
      if (title && item.title.indexOf(title) < 0) return false
      return true
    })
    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  }
}
