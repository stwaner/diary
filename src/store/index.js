import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import location from './modules/location'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login,
    location
  }
})
