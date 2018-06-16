import Mock from 'mockjs'
import movie from './movie' // mock movie 数据模版定义

Mock.mock(/\/movies/, 'get', movie.getMovies) // Get the movie list

export default Mock
