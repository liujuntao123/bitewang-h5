import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import userInfo from './modules/userInfo'
import baInfo from './modules/baInfo'

Vue.use(Vuex)


const store = new Vuex.Store({
  plugins: [createLogger()],
  modules: {
    userInfo,
    baInfo
  }
})

export default store