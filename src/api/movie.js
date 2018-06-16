import request from '@/utils/request'

export function fetchMovies (query) {
  return request({
    url: '/movies',
    method: 'get',
    params: query
  })
}
