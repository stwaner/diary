import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import axios from 'axios'
import VueRouter from 'vue-router'
import router from './router/index.js'
import store from './store'
import CKEditor from '@ckeditor/ckeditor5-vue'
// import './assets/css/base.css'
// import './assets/css/layout.css'
// import './assets/css/default.css' // 为何不生效
// import 'element-ui/lib/theme-chalk/index.css'
// import element from './element/index'
// Vue.use(element)

Vue.config.productionTip = false
Vue.prototype.$axios = axios

console.log(process.env.VUE_APP_BASE_URL)
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use( CKEditor )

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
