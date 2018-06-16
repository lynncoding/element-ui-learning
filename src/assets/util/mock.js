import Mock from 'mockjs'

export default Mock.mock(/\.json/, {
  'list|1-10': [{
    'id|+1': 1,
    'email': '@EMAIL'
  }]
})
