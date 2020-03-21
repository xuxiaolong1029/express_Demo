// The Vue build version to load with the `import` command
import "babel-polyfill"; //解决ie浏览器不支持promise
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuex from "vuex";
import store from "./store/store";
import axios from "axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// import locale_EN from "element-ui/lib/locale/lang/en";
import locale_zhCN from "element-ui/lib/locale/lang/zh-CN";
import i18n from "./lang/lang.config";
import "./base/base.css";
import VueClipboard from "vue-clipboard2";
import axiosConfig from "./utils/axios.config";
import Mixin from './mixin/index'
Vue.mixin(Mixin);
import CITEX from './plugin/index'
Vue.use(CITEX);
import Toast  from './plugin/toast/index'
Vue.use(Toast);
import  MessageBox from './plugin/messageBox/index'
Vue.use(MessageBox);
Vue.prototype.axios = axios;
Vue.use(ElementUI, { locale_zhCN });
Vue.use(Vuex);
// 正整数指令
import checkInt from './utils/justInt'
Vue.use(checkInt)

Vue.use(VueClipboard);
Vue.config.productionTip = false;
axiosConfig.axiosConfig();
if (process.env.NODE_ENV === 'production') {
  //禁用f12
  window.onkeydown = window.onkeyup = window.onkeypress = function (event) {
    if (event.keyCode === 123) {
      event.preventDefault();
      window.event.returnValue = false;
    }
  };
// 禁用右键
  window.oncontextmenu = function() {
    event.preventDefault();
    return false;
  };
}
if (
  '-ms-scroll-limit' in document.documentElement.style &&
  '-ms-ime-align' in document.documentElement.style
) { // detect it's IE11
  window.addEventListener("hashchange", function(event) {
    var currentPath = window.location.hash.slice(1);
    if (store.state.route.path !== currentPath) {
      router.push(currentPath)
    }
  }, false)
}
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  i18n,
  store,
  components: { App },
  template: "<App/>"
});
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});
