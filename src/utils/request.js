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
request.interceptors.response.use(res => {
  return res
}, async err => {
  console.dir(err)
  if (err.response && err.response.status === 401) {
    const { user } = store.state
    if (user && user.refresh_token) {
      const { data } = await axios({
        method: 'PUT',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorization: 'Bearer ' + user.refresh_token
        }
      })
      store.commit('setUser', {
        token: data.data.token,
        refresh_token: user.refresh_token
      })
      return request(err.config)
    }
  }
})
export default request
