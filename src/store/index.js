import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    isLogin: false,
    token: ''
  },
  getters: {
    getuserInfo (state) {
      return state.userInfo
    },
    getIsLogin (state) {
      return state.isLogin
    },
    getToken (state) {
      return state.token
    }
  },
  mutations: {
    SET_TOKEN: (state, data) => {
      state.token = data
      window.sessionStorage.setItem('token', data)
    },
    SET_USER: (state, data) => {
      console.log(data)
      state.userInfo = data
      window.sessionStorage.setItem('userInfo', data)
    },
    SET_ISLOGIN: (state, data) => {
      state.isLogin = data
      window.sessionStorage.setItem('isLogin', data)
    },
    SET_USERSTATUS: (state, user) => {
      if (user) {
        state.userInfo = user
        state.isLogin = true
      } else if (user === null) {
        console.log('用户登出')
        sessionStorage.setItem('userInfo', null)
        sessionStorage.setItem('token', null)
        state.userInfo = null
        state.isLogin = false
        state.token = ''
      }
    }
  },
  // actions,可以来做异步操作，然后提交给mutations，而后再对state(数据)进行操作
  actions: {
    setUser ({ commit, data }) {
      commit('SET_USER', data)
    },
    setIsLogin ({ commit, data }) {
      commit('SET_ISLOGIN', data)
    },
    setToken ({ commit, data }) {
      commit('SET_TOKEN', data)
    },
    setUserStatus ({ commit, data }) {
      commit('SET_USERSTATUS', data)
    }
  }
})
