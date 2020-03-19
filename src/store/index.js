import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import userInfo from './modules/userInfo'

Vue.use(Vuex)


const store = new Vuex.Store({
  plugins: [createLogger()],
  modules: {
    userInfo,
  }
})

export default store