import Vue from 'vue'
import App from './App.vue'
import router from './router'
import infiniteScroll from 'vue-infinite-scroll'
// import VueDND from 'awe-dnd'
import dragpolyfill from './lib/draggable-polyfill';
import vueFinger from './lib/vue-finger'
import {polyfill} from "mobile-drag-drop";
import 'mint-ui/lib/style.css'
import { Spinner } from 'mint-ui';

// import  { ToastPlugin } from 'vux'
// Vue.use(ToastPlugin)

// optional import of scroll behaviour
import {scrollBehaviourDragImageTranslateOverride} from "mobile-drag-drop/scroll-behaviour";


// options are optional ;)
polyfill({
    // use this to make use of the scroll behaviour
    dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride
});
// dragpolyfill()

// Vue.use(VueDND)
Vue.use(vueFinger)

Vue.use(infiniteScroll)
Vue.component(Spinner.name, Spinner);
Vue.config.productionTip = false



window.addEventListener("popstate", function(e) {
  // alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
}, false)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
