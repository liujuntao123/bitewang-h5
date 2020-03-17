import Vue from 'vue'
import Router from 'vue-router'
import BaInfo from './views/BaInfo.vue'
import About from './views/About'
import BaList from './views/BaList'
import PreReg from './views/PreReg'
import Reg from './views/Reg'
import Login from './views/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'balist',
      component: BaList
    },
    {
      path: '/bainfo',
      name: 'bainfo',
      component: BaInfo
    },
    {
      path:'/about',
      name:'about',
      component: About
    },
    {
      path:'/prereg',
      name:'prereg',
      component:PreReg
    },
    {
      path:'/reg',
      name:'reg',
      component:Reg
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
  ]
})
