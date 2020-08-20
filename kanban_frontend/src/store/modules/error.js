const state = {
  error: ''
}

const mutations = {
  setError (state, errorMessage) {
    state.error = errorMessage
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
