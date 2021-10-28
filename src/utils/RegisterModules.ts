import { Router } from 'vue-router'
import router from '../router'
// import store from '../store'

interface ModuleRouter {
    addModuleRoutes : (router: Router) => void
}

interface Module {
    router: ModuleRouter
}

interface registeredModules {
    [x: string]: Module
}

const registerModule = (module: Module) => {
  if (module.router) {
    module.router.addModuleRoutes(router)
  }
}

export const registerModules = (modules: registeredModules) => {
  Object.keys(modules).forEach((moduleKey: string) => {
    const module = modules[moduleKey]
    registerModule(module)
  })
}
