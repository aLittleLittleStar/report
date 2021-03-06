import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import moment from 'moment'
import './plugins/element.js'
import 'normalize.css' // a modern alternative to CSS resets
import './plugins/axios' // axios
import * as filters from './filter/filter.js'
import {downFlie, FromDates, isMobile, showMessage} from './utils/tools.js'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.prototype.$moment = moment;

Vue.prototype.$FromDates = FromDates
Vue.prototype.$downFlie = downFlie
Vue.prototype.$isMobile = isMobile
Vue.prototype.$showMessage = showMessage

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
