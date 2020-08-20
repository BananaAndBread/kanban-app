import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '@/pages/login.vue'
import KanbanPage from '@/pages/kanban.vue'
import RegistrationPage from '@/pages/registration.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'login'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/kanban',
      name: 'kanban',
      component: KanbanPage
    },
    {
      path: '/registration',
      name: 'registration',
      component: RegistrationPage
    },
  ]
})
export default router
