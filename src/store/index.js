import Vue from 'vue'
import Vuex from 'vuex'
import { getInfo } from '@/api/login'
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
      window.localStorage.setItem('token', data)
    },
    SET_USER: (state, data) => {
      state.userInfo = data
      window.localStorage.setItem('userInfo', JSON.stringify(data))
    },
    SET_ISLOGIN: (state, data) => {
      state.isLogin = data
    },
    SET_INFO: (state, user) => {
      if (user) {
        state.userInfo = user
        state.isLogin = true
        localStorage.setItem('userInfo', JSON.stringify(user))
      } else {
        localStorage.setItem('userInfo', null)
        localStorage.setItem('token', null)
        state.userInfo = null
        state.isLogin = false
        state.token = ''
      }
    }
  },
  // actions,可以来做异步操作，然后提交给mutations，而后再对state(数据)进行操作
  actions: {
    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          if (response.data && response.data.userId) {
            commit('SET_INFO', response.data)
            resolve(response.data)
          } else {
            alert('登录超时，请重新登录')
            commit('SET_INFO', null)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    setUser (context, data) {
      context.commit('SET_USER', data)
    },
    setIsLogin (context, data) {
      context.commit('SET_ISLOGIN', data)
    },
    setToken (context, data) {
      context.commit('SET_TOKEN', data)
    },
    setUserStatus (context, data) {
      context.commit('SET_INFO', data)
    }
  }
})
