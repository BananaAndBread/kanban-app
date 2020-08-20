import Vuex from 'vuex'
import Vue from 'vue'
import cards from './modules/cards'
import persistent from './modules/persistent'
import VuexPersistence from 'vuex-persist'
import auth from './modules/auth'
import error from './modules/error'

Vue.use(Vuex)
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['persistent']
})

export default new Vuex.Store({
  modules: {
    cards,
    persistent,
    auth,
    error
  },
  plugins: [vuexLocal.plugin]
})
