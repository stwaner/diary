import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import login from './modules/login'
import location from './modules/location'
export default new Vuex.Store({
  modules: {
    login,
    location
  }
})
