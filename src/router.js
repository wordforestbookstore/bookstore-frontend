import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: resolve => require(['./components/index.vue'], resolve)
    },
    {
      path: '/hours',
      component: resolve => require(['./components/info.vue'], resolve)
    },
    {
      path: '/faq',
      component: resolve => require(['./components/faq.vue'], resolve)
    },
    {
      path: '/user',
      component: resolve => require(['./userview/user.vue'], resolve),
      children: [
        {
          path: 'login',
          component: resolve => require(['./userview/login.vue'], resolve)
        }
      ]
    },
    {
      path: '/newUser',
      component: resolve => require(['./userview/newuser.vue'], resolve),
    },
    {
      path: '/book',
      component: resolve => require(['./bookview/book.vue'], resolve),
      children: [
        {
          path: '/',
          component: resolve => require(['./bookview/booklist.vue'], resolve)
        }
      ]
    }
  ]
});