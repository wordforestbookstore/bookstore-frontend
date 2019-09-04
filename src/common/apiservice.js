import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
import { API_URL } from '../config'

const apiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.use(VueCookies);
    Vue.axios.defaults.baseURL = API_URL;
  },

  setCookie(key, val) {
    Vue.prototype.$cookies.set(key, val, '30d');
  },
  getCookie(key) {
    return Vue.prototype.$cookies.get(key);
  },
  removeCookie(key) {
    Vue.prototype.$cookies.remove(key);
  },
  isKey(key) {
    return Vue.prototype.$cookies.isKey(key);
  },

  get(url, params = {}) {
    return Vue.axios.get(url, params);
  },

  post(url, data, params = {}) {
    return Vue.axios.post(url, data, params);
  },

  put(url, data, params = {}) {
    return Vue.axios.put(url, data, params);
  },

  delete(url, params = {}) {
    return Vue.axios.delete(url, params);
  }
};

export default apiService

const getMsg = {
  'Wrong password!': '用户名或密码错误',
  'Username not exits!': '用户名不存在',
  'Your email has been registered': '您的邮箱已经被注册',
  'Your username has been registered': '您的用户名已经被注册',
  'Wrong CurrentPassword': '原密码错误',
  'This email is not exist': '邮箱不存在',
  'This cardnumber is exist': '信用卡卡号已经存在'
};
export function getErrorResponse(res) {
  let msg = '';
  if (res === undefined || res === null) msg = '服务器连接失败';
  else {
    let { data } = res;
    if (getMsg[data]) msg = getMsg[data];
    else msg = '提交失败';
  }
  return { status: 'error', message: msg }
}