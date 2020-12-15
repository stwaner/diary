import Vue from 'vue'
import ElementUI from 'element-ui'
import VueAMap from 'vue-amap'
import App from './App.vue'
import axios from 'axios'
import VueRouter from 'vue-router'
import router from './router/index.js'
import store from './store'
// import './assets/fonts/style.css'
// import './assets/css/base.css'
// import './assets/css/layout.css'
// import './assets/css/default.css' // 为何不生效
// import 'element-ui/lib/theme-chalk/index.css'
// import element from './element/index'
// Vue.use(element)

Vue.config.productionTip = false
Vue.prototype.$axios = axios

// console.log(process.env.VUE_APP_BASE_URL)
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(VueAMap)

VueAMap.initAMapApiLoader({
  key: '8d168cf9262841cf32d4e72fbfd49c49',
  // plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.Geolocation', 'AMap.Geocoder', 'AMap.AMapManager', 'AMap.Marker'],
  plugin: ['AMap.Geolocation', 'AMap.ContextMenu', 'AMap.ToolBar', 'AMap.Scale', 'AMap.MapType', 'AMap.Circle'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
