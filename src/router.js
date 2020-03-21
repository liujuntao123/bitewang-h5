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
import PostDetails from './views/postDetails'

Vue.use(Router)

console.log('router do')

export default new Router({
  routes: [
    {
      path: '/balist',
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
      path:'/user',
      name:'user',
      component:Mine
    },
    {
      path:'/userInfo',
      name:'userInfo',
      component:MineInfo
    },
    {
      path:'/userTheme',
      name:'userTheme',
      component:MyTheme
    },
    {
      path:'/userComment',
      name:'userComment',
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
    },
    {
      path: '/postdetails',
      name: 'postdetails',
      component: PostDetails
    }
  ]
})
