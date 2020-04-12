import Vue from 'vue'
import App from './App.vue'
import router from './router'
import infiniteScroll from 'vue-infinite-scroll'
// import VueDND from 'awe-dnd'
// import dragpolyfill from './lib/draggable-polyfill';
// import vueFinger from './lib/vue-finger'
import {polyfill} from "mobile-drag-drop";
import Mint from 'mint-ui'

import 'mint-ui/lib/style.css'


// import  { ToastPlugin } from 'vux'
// Vue.use(ToastPlugin)
// import Vuex from 'vuex'
// Vue.use(Vuex)
import store from './store'
import './beforeEach'

// optional import of scroll behaviour
import {scrollBehaviourDragImageTranslateOverride} from "mobile-drag-drop/scroll-behaviour";


// options are optional ;)
polyfill({
    // use this to make use of the scroll behaviour
    dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride
});
// dragpolyfill()

// Vue.use(VueDND)
// Vue.use(vueFinger)

Vue.use(infiniteScroll)
Vue.use(Mint)
Vue.config.productionTip = false




window.addEventListener("popstate", function(e) {
  // alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
}, false)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
