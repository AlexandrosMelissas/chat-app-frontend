import { Router } from 'vue-router'
const Module = () => import('./Module.vue')
const Login = () => import('./views/Login.vue')
const Register = () => import('./views/Register.vue')

const moduleRoute = {
  path: '/auth',
  name: 'Auth',
  component: Module,
  children: [
    {
      path: 'login',
      component: Login
    },
    {
      path: 'register',
      component: Register
    }
  ]
}

export const addModuleRoutes = (router: Router): void => {
  router.addRoute(moduleRoute)
}
