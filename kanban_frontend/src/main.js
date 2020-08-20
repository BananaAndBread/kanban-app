import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VModal from 'vue-js-modal'
import router from '@/router'
import Toasted from 'vue-toasted'
Vue.use(Toasted)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VModal)
Vue.axios.defaults.baseURL = 'http://localhost:8000/'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
