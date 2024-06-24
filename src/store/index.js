import { createStore } from 'vuex'

export default createStore({
  state: {
    userData: {},
    userStatus: false,
  },
  getters: {
    getUserData: (state) => state.userData,
    getUserStatus: (state) => state.userStatus,
  },
  mutations: {
    setUserData(state, payload) {
      state.userData = payload;
    },
    setUserStatus(state, payload) {
      state.userStatus = payload;
    },
  },
  actions: {
    fillUserData({ commit }, userData) {
      commit('setUserData', userData);
    },
    fillUserStatus({ commit }, userStatus) {
      commit('setUserStatus', userStatus);
    },
  },
  modules: {
  }
})