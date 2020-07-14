/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store'

// 基准地址
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
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
