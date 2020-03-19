import storage from '@/utils/storage'

const state = {
  userInfo: null,
  isLogin:false,
  sid:null
}

const getters = {
  getUserInfo(state) {
    let userInfo = state.userInfo
    if (userInfo) {
      return userInfo
    }
    userInfo = storage.getFromLocalStorage('userInfo')
    if (userInfo) {
      state.userinfo = userInfo
      state.sid=userInfo.sid
      return userInfo
    }
    console.log('no userinfo')
  },
  getSid(state,getters){
    let sid=state.sid
    if(sid){
      return sid
    }
    sid=getters.getUserInfo.sid
    if(sid){
      state.sid=sid
    }
    return sid
  },
  getIsLogin(state,getters) {
    // 如果既不能从store里拿到，也不能从storage里拿到，说明目前没有登录态，则需要重新登录或注册
    if (getters.getUserInfo){
      state.isLogin=true
      return true
    }
    state.isLogin=false
    return false
  },
}

const actions = {
  setUserInfo(context, data) {
    context.commit('setUserInfo', data)
  },
}

const mutations = {
  setUserInfo(state, data) {console.log('mutation',data)
    state.userInfo=data
    const expire_time=20000
    storage.setToLocalStorage(data, 'userInfo', expire_time)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
