import { Router, RouteRecordRaw } from 'vue-router'
import { getters } from '../auth/Auth.hook'
import ChatBox from '../chat/components/Chatbox.vue'

const Module = () => import('./Module.vue')
const Home = () => import('./views/Home.vue')
const { isLoggedIn } = getters

const moduleRoute: RouteRecordRaw = {
  path: '/chat',
  name: 'Module',
  beforeEnter: (to, _, next) => {
    if (to.name === 'Chat' && !isLoggedIn.value) {
      next({ path: '/auth/login' })
    } else {
      next()
    }
  },
  component: Module,
  children: [
    {
      path: '',
      name: 'Chat',
      component: Home,
      children: [
        {
          path: ':userId',
          name: 'ChatBox',
          component: ChatBox
        }
      ]
    }
  ]
}

export const addModuleRoutes = (router: Router): void => {
  router.addRoute(moduleRoute)
}
