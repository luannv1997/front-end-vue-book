import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'my-info',
      storage: window.localStorage,
    }),
  ],
  state: {
    user: {},
    isAuthenticated: false,
    token: '',
    snack: null,
  },
  mutations: {
    SET_USER_INFO (state, payload) {
      state.user = payload,
      state.isAuthenticated = true
      state.token = payload.accessToken
    },
    SET_NEW_TOKEN(state, payload){
      state.token = payload.accessToken
    },
    CLEAR_USER_INFO (state) {
      state.user = {},
      state.token = '',
      state.isAuthenticated = false
    },
    SHOW_TOASK (state, payload) {
      state.snack = payload
    },
  },
  actions: {
  },
  getters: {
    userToken: (state) => state.token,
    userIsAuthenticated: (state) => state.isAuthenticated,
    userFullName: (state) => `${state.user.data.firstName} ${state.user.data.lastName}`,
    userRole: (state) => state.user.data.role,
  }
})
