import { createWebHashHistory, createRouter} from 'vue-router'
import middleware from '@/service/middleware'
import Login from '@/views/Login/Login'
import Registro from '@/views/Login/Registro'
import Dashboard from '@/views/Dashboard/Dashboard'
import Layout from '@/layout/BaseLayout'
import Carro from '@/views/Carro/Carro'
import CarroHistorico from '@/views/Carro/CarroHistorico'
import Cliente from '@/views/Cliente/Cliente'


const routes = [
    { path: '/', name: 'login', component: Login, beforeEnter: middleware.redirectIfAuthenticated },
    { path: '/registro', name: 'registro', component: Registro },    
    { path: '/dashboard', name: 'dashboard', component: Dashboard, beforeEnter: middleware.redirectIfNotAuthenticated},
    { path: '/carro', name: 'carro', component: Carro, beforeEnter: middleware.redirectIfNotAuthenticated},
    { path: '/carrohistorico/', name: 'carrohistorico', component: CarroHistorico, props:true, beforeEnter: middleware.redirectIfNotAuthenticated},
    { path: '/cliente', name: 'cliente', component: Cliente, beforeEnter: middleware.redirectIfNotAuthenticated},
    { path: '/layout', name: 'layout', component: Layout, beforeEnter: middleware.redirectIfNotAuthenticated},
  ]
  
  const router = createRouter({  
    history: createWebHashHistory(),
    routes,
  })

export default router;
