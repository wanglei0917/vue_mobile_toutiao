import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入Vant
import './plugins/vant.js'

// 引入全局样式表
import './styles/index.less'

// 引入 amfe-flexible 设置rem 基准值
import 'amfe-flexible'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
