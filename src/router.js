import Vue from 'vue'
import Router from 'vue-router'

import { checkLogin } from './common/userservice'
import { hasOwn } from './util'

Vue.use(Router);

const router = new Router({
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
          path: '/',
          component: resolve => require(['./userview/index.vue'], resolve),
          beforeEnter(to, from, next) {
            if (checkLogin()) {
              next();
            } else {
              next('/');
            }
          },
          children: [
            {
              path: '/',
              redirect: 'edit'
            },
            {
              path: 'edit',
              component: resolve => require(['./userview/forms/useredit.vue'], resolve)
            },
            {
              path: 'orders',
              component: resolve => require(['./userview/orders/index.vue'], resolve)
            },
            {
              path: 'billings',
              component: resolve => require(['./userview/billings/index.vue'], resolve),
            },
            {
              path: 'shipping',
              component: resolve => require(['./userview/shipping/index.vue'], resolve)
            }
          ]
        },
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
        },
        {
          path: 'bookInfo',
          component: resolve => require(['./bookview/bookinfo.vue'], resolve),
          beforeEnter: (to, from, next) => {
            if (hasOwn(to.query, 'id')) {
              next();
            } else {
              next('/book');
            }
          }
        }
      ]
    },
    {
      path: '/shoppingcart',
      component: resolve => require(['./userview/cart/shoppingcart.vue'], resolve),
      beforeEnter: (to, from, next) => {
        if (checkLogin()) {
          next();
        } else {
          next('/');
        }
      }
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: resolve => require(['./userview/cart/checkout.vue'], resolve),
      beforeEnter: (to, from, next) => {
        if (checkLogin() && hasOwn(to.params, 'items')) {
          next();
        } else {
          next('/');
        }
      }
    }
  ]
});

export default router;