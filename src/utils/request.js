/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'
// 基准地址
const request = axios.create({
  // 基准路径
  baseURL: 'http://ttapi.research.itcast.cn/',
  // 自定义返回的数据
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (error) {
      return data
    }
  }]
})

// 请求拦截器
request.interceptors.request.use(req => {
  const { user } = store.state
  if (user && user.token) {
    req.headers.Authorization = `Bearer ${user.token}`
  }
  return req
})

// 响应拦截器

export default request
