import axios from 'axios'
import router from '../router'
import {Loading,Message} from 'element-ui'
import store from '../store/index'

// 设置请求发送cookie, 默认是false, 不发送
axios.defaults.withCredentials = true
axios.defaults.timeout = 10000 // 请求超时

let loadingInstance;//定时器
// 添加请求拦截器
axios.interceptors.request.use(config => {
  loadingInstance = Loading.service({
    lock: true,
    text: '努力加载中 ~>_<~',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  return config
}, err => {
  loadingInstance.close()
  // Message.error({message:'请求失败，请稍后再试！',showClose:true})
  return Promise.reject({message:'请求失败，请稍后再试！'})
})

// 添加响应拦截器
axios.interceptors.response.use(res => {
  loadingInstance.close()
  let message = '失败';
  if(res.data.code === 0){
    return res;
  }else if (res.data.code === -10) {// 未登录的情况
    store.commit('logout');
    message = res.data.msg ? res.data.msg: '用户登录失效';
    router.push({
        path: '/login'
    })
  }
  else if(res.data.code === 1){
    message = res.data.msg ? res.data.msg: '暂无权限操作';
  }else{
    res.data.msg ? (message = res.data.msg) : '';
  }
  // Message.error({message:message,showClose:true})
  return Promise.reject({message: message});
}, err => {
  loadingInstance.close()
  if (err && err.response) {
    switch (err.response.status) {
      case 404:
        err.message = '未找到指定文件!'
        break
      case 403:
        router.push({
          path: '/login'
          // query: {redirect: router.currentRoute.fullPath}
        })
        err.message = err.response.data.msg
        break
      default:
        err.message = '服务端错误!'
    }
  }else {
    err.message = "服务端错误!"
  }
  // Message.error({message:err.message,showClose:true})
  return Promise.reject(err);
})

axios.install = (Vue) => {
  Vue.prototype.$axios = axios
}

export default axios
