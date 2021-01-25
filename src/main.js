import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import axios from 'axios'
import VueRouter from 'vue-router'
import router from './router/index.js'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
// import $ from 'jquery'
import './assets/fonts/style.css'
import './assets/css/base.css'
// import echarts from 'echarts'
// import element from './element/index'
// Vue.use(element)

// 按需引入 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts')
Vue.prototype.$echarts = echarts
// 引入柱状图
require('echarts/lib/chart/bar')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

// 引入公共js
import common from './utils/common.js'
Vue.prototype.common = common

Vue.config.productionTip = false
Vue.prototype.$axios = axios

common.getProvinceCode()
common.getCityCode()

// console.log(process.env.VUE_APP_BASE_URL)
Vue.use(VueRouter)
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
