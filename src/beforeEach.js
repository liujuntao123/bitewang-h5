import router from './router'
import store from '@/store'

const noLoginRouters=['/login','/reg','/prereg','/pagecover']

// 在进入页面的时候判断登录态
router.beforeEach((to, from, next) => {
  // console.log(store.getters['userInfo/getLogin']())
  console.log(store.getters['userInfo/getIsLogin'])
  console.log('to',to)
  const isLogin=store.getters['userInfo/getIsLogin']
  // 用户注册页面或者是登录页面
  if(noLoginRouters.indexOf(to.path)>-1){console.log('islogin',isLogin)
    if(isLogin){
      router.push('balist')
      // window.location.href ='/web#/balist'
    }else {
      next()
    }
  }else {
    if(!isLogin){
      // window.location.href ='/web#/login'
      router.push('pagecover')
    }else {console.log('>>>>,islogin')
      next()
    }
  }
})