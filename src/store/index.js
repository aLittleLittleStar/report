import Vue from "vue";
import Vuex from "vuex";
// 持久化,刷新不消失
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    username: '',
    userid: '',
    privileges: '',
    menu: '',
    menuList:''
  },
  mutations: {
    login (state, userInfo) {
      state.isLogin = true
      state.username = userInfo.username
      state.userid = userInfo.userid
    },
    logout (state) {
      state.username = ''
      state.userid = ''
      state.isLogin = false
    },
    updateMenu (state, menu) {
      state.menu = menu
    },
    setUpdateMenu(state, value) {
      console.log(value)
      state.menuList = value
    },
    setPrivileges(state, value){
      console.log(value)
      state.privileges = value
    }
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()]
});
