import Vue from 'vue'

const mutations = {
}
const actions = {
  async refreshToken ({ commit }) {
    try {
      if (localStorage.token) {
        const data = {
          token: localStorage.token
        }
        const response = await Vue.axios.post('/users/refresh_token/', data)
        localStorage.token = response.data.token
        Vue.axios.defaults.headers.common.Authorization = 'JWT ' + localStorage.token
      } else {
        this.$router.replace({ name: 'login' })
      }
    } catch (e) {
      commit('error/setError', JSON.stringify(e.response.data), { root: true })
    }
  },
  async login ({ commit }, { username, password }) {
    try {
      const data = {
        username,
        password
      }
      const response = await Vue.axios.post('users/login/', data)
      localStorage.token = response.data.token
      commit('error/setError', '', { root: true })
      Vue.axios.defaults.headers.common.Authorization = 'JWT ' + localStorage.token
    } catch (e) {
      commit('error/setError', JSON.stringify(e.response.data), { root: true })
    }
  },
  async register ({ commit }, payload) {
    try {
      const response = await Vue.axios.post('users/create/', payload)
      localStorage.token = response.data.token
      commit('error/setError', '', { root: true })
      Vue.axios.defaults.headers.common.Authorization = 'JWT ' + localStorage.token
    } catch (e) {
      commit('error/setError', JSON.stringify(e.response.data), { root: true })
    }
  },
  logout () {
    localStorage.token = ''
  }
}

const getters = {
  authenticated () {
    return !!localStorage.token
  },
  token () {
    return localStorage.token
  }
}

export default {
  namespaced: true,
  mutations,
  getters,
  actions
}
