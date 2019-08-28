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