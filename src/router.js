import Vue from 'vue'
import Router from 'vue-router'
import BaInfo from './views/BaInfo.vue'
import About from './views/About'
import BaList from './views/BaList'
import PreReg from './views/PreReg'
import Reg from './views/Reg'
import Login from './views/Login'
import Search from './views/search'
import Mine from './views/mine'
import MineInfo from './views/mineInfo'
import MyTheme from './views/myTheme'
import MyComment from './views/myComment'
import PostsList from './views/PostsList'
import PageCover from './views/pageCover'
import Posting from './views/posting'

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
    {
      path:'/search',
      name:'search',
      component:Search
    },
    {
      path:'/mine',
      name:'mine',
      component:Mine
    },
    {
      path:'/mineInfo',
      name:'mineInfo',
      component:MineInfo
    },
    {
      path:'/myTheme',
      name:'myTheme',
      component:MyTheme
    },
    {
      path:'/myComment',
      name:'myComment',
      component:MyComment
    },
    {
      path: '/postslist',
      name: 'postslist',
      component: PostsList
    },
    {
      path: '/pagecover',
      name: 'pagecover',
      component: PageCover
    },
    {
      path: '/posting',
      name: 'posting',
      component: Posting
    }
  ]
})
