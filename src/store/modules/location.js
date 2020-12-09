const state = {
  selfLocation: true
}
const getters = {
  getuserInfo (state) {
    return state.selfLocation
  }
}
const mutations = {
  SELF_LOCATION: (state) => {
    console.log('commit selflocation')
    state.selfLocation = !state.selfLocation
  }
}
const actions = {
  setSelfLocation (context, data) {
    context.commit('SELF_LOCATION', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
