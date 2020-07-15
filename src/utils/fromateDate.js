import Vue from 'vue'
import moment from 'moment'

// 加载中文语言
moment.locale('zh-cn')
// console.log(moment().format())
// console.log(moment([2020, 5, 28]).fromNow())
// console.log(moment().format().to(moment([2018, 8, 8])))

// 全局过滤器
Vue.filter('formateDate', val => {
  return moment(val).fromNow()
})
