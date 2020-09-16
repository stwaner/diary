import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import './assets/css/base.css'
import 'element-ui/lib/theme-chalk/index.css'
// import element from './element/index'
// Vue.use(element)

Vue.config.productionTip = false
Vue.prototype.$axios = axios

console.log(process.env.VUE_APP_BASE_URL)
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
